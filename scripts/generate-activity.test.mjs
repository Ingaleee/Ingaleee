import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, copyFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const previousToken = process.env.GITHUB_TOKEN;
process.env.GITHUB_TOKEN = "profile-test-token";
const { collectData } = await import("./generate-activity.mjs");
if (previousToken === undefined) delete process.env.GITHUB_TOKEN;
else process.env.GITHUB_TOKEN = previousToken;

const today = new Date().toISOString().slice(0, 10);
const recentPush = `${today}T10:00:00Z`;
const repos = [
  { name: "Ingaleee", language: null, pushed_at: `${today}T12:00:00Z`, fork: false },
  { name: "copied-project", language: "C#", pushed_at: `${today}T11:00:00Z`, fork: true },
  { name: "real-project", language: "C#", pushed_at: recentPush, fork: false }
];

function apiResponse(url, calendar) {
  if (String(url).endsWith("/graphql")) {
    return calendar
      ? Response.json({ data: { user: { contributionsCollection: { contributionCalendar: calendar } } } })
      : new Response("Unavailable", { status: 503 });
  }
  if (String(url).includes("/repos?")) return Response.json(repos);
  if (String(url).includes("/events/public?")) {
    return Response.json([{ created_at: recentPush }]);
  }
  return Response.json({ public_repos: 29 });
}

test("the metric counts the displayed 34 weeks and ignores profile/fork pushes for the latest project", async (t) => {
  const calendar = {
    totalContributions: 5000,
    weeks: Array.from({ length: 52 }, (_, i) => ({
      contributionDays: [{ date: today, contributionCount: i < 18 ? 100 : 2 }]
    }))
  };
  t.mock.method(globalThis, "fetch", async (url) => apiResponse(url, calendar));
  const data = await collectData();
  assert.equal(data.contributionWeeks.length, 34);
  assert.equal(data.totalContributions, 68);
  assert.equal(data.source, "contributions");
  assert.equal(data.latestRepo, "real-project");
  assert.equal(data.publicRepos, 29);
});

test("a missing contribution calendar uses real REST activity and labels it as public signals", async (t) => {
  t.mock.method(globalThis, "fetch", async (url) => apiResponse(url, null));
  const data = await collectData();
  assert.equal(data.source, "public signals");
  assert.equal(data.totalContributions, 4);
  assert.equal(data.latestRepo, "real-project");
});

test("an API outage fails the refresh and preserves the last published SVG", async () => {
  const dir = await mkdtemp(join(tmpdir(), "profile-activity-test-"));
  try {
    await mkdir(join(dir, "scripts"));
    await mkdir(join(dir, "assets"));
    const script = join(dir, "scripts", "generate-activity.mjs");
    const preload = join(dir, "fail-api.mjs");
    const asset = join(dir, "assets", "activity-professional.svg");
    await copyFile(new URL("./generate-activity.mjs", import.meta.url), script);
    await writeFile(asset, "last successful snapshot");
    await writeFile(preload, 'globalThis.fetch = async () => new Response("Unavailable", { status: 503 });');
    const result = spawnSync(process.execPath, ["--import", pathToFileURL(preload).href, script], { encoding: "utf8" });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /GitHub API 503/);
    assert.equal(await readFile(asset, "utf8"), "last successful snapshot");
  } finally {
    assert.equal(dirname(resolve(dir)), resolve(tmpdir()));
    assert.ok(basename(dir).startsWith("profile-activity-test-"));
    await rm(dir, { recursive: true, force: true });
  }
});
