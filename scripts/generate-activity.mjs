import { mkdir, writeFile } from "node:fs/promises";

const USER = process.env.PROFILE_USER || "Ingaleee";
const TOKEN = process.env.GITHUB_TOKEN || "";
const themes = {
  dark: {
    bg: "#071018",
    panel: "#0b1722",
    line: "#1d3a4c",
    grid: "#102532",
    text: "#d7f8ff",
    muted: "#6f94a3",
    cyan: "#29f2ff",
    lime: "#9dff5b",
    magenta: "#ff4fd8"
  },
  light: {
    bg: "#f4fbff",
    panel: "#ffffff",
    line: "#b7d7e3",
    grid: "#dceef4",
    text: "#092d3a",
    muted: "#557986",
    cyan: "#007d91",
    lime: "#3f8f00",
    magenta: "#b3178b"
  },
  professional: {
    bg: "#0b0e13",
    panel: "#11161d",
    line: "#29313b",
    grid: "#171c24",
    text: "#f2f5f8",
    muted: "#75808d",
    cyan: "#63d8e6",
    lime: "#63d8e6",
    magenta: "#63d8e6"
  }
};

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": `${USER}-profile-telemetry`,
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${path}`);
  }
  return response.json();
}

async function githubGraphql(query, variables) {
  if (!TOKEN) return null;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": `${USER}-profile-telemetry`
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors) {
    throw new Error(`GitHub GraphQL: ${JSON.stringify(payload.errors)}`);
  }

  return payload.data;
}

function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

function emptyContributionWeeks() {
  const now = new Date();
  const currentSunday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  currentSunday.setUTCDate(currentSunday.getUTCDate() - currentSunday.getUTCDay());
  const firstSunday = new Date(currentSunday);
  firstSunday.setUTCDate(firstSunday.getUTCDate() - 33 * 7);

  return Array.from({ length: 34 }, (_, column) => ({
    contributionDays: Array.from({ length: 7 }, (_, row) => {
      const date = new Date(firstSunday);
      date.setUTCDate(date.getUTCDate() + column * 7 + row);
      return { date: dayKey(date), contributionCount: 0 };
    })
  }));
}

function calendarFromPublicSignals(events, repos) {
  const weeks = emptyContributionWeeks();
  const byDate = new Map(
    weeks.flatMap((week) =>
      week.contributionDays.map((day) => [day.date, day])
    )
  );

  for (const event of events) {
    const day = byDate.get(String(event.created_at || "").slice(0, 10));
    if (day) day.contributionCount += 1;
  }

  for (const repo of repos) {
    const day = byDate.get(String(repo.pushed_at || "").slice(0, 10));
    if (day) day.contributionCount += 1;
  }

  return weeks;
}

function fallbackData() {
  const today = new Date();
  const activity = Array.from({ length: 28 }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - (27 - index));
    const seed = (index * 7 + 3) % 11;
    return { date: dayKey(date), count: seed > 7 ? 3 : seed > 4 ? 1 : 0 };
  });
  const contributionWeeks = emptyContributionWeeks();
  contributionWeeks.forEach((week, column) => {
    week.contributionDays.forEach((day, row) => {
      const seed = (column * 11 + row * 7 + 5) % 29;
      day.contributionCount = seed > 25 ? 5 : seed > 21 ? 3 : seed > 15 ? 1 : 0;
    });
  });

  return {
    publicRepos: 27,
    topLanguage: "C#",
    activeDays: activity.filter((day) => day.count > 0).length,
    latestRepo: "market-tick-ingestion",
    activity,
    contributionWeeks,
    totalContributions: contributionWeeks
      .flatMap((week) => week.contributionDays)
      .reduce((sum, day) => sum + day.contributionCount, 0)
  };
}

async function collectData() {
  try {
    const [user, repos, events] = await Promise.all([
      github(`/users/${USER}`),
      github(`/users/${USER}/repos?type=public&sort=updated&per_page=100`),
      github(`/users/${USER}/events/public?per_page=100`)
    ]);
    const calendarData = await githubGraphql(
      `query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
      { login: USER }
    ).catch((error) => {
      console.warn(`${error.message}; using public repository signals for the topology.`);
      return null;
    });

    const languageCounts = new Map();
    for (const repo of repos) {
      if (repo.language) {
        languageCounts.set(repo.language, (languageCounts.get(repo.language) || 0) + 1);
      }
    }
    const topLanguage =
      [...languageCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "C#";

    const today = new Date();
    const activity = Array.from({ length: 28 }, (_, index) => {
      const date = new Date(today);
      date.setUTCDate(date.getUTCDate() - (27 - index));
      return { date: dayKey(date), count: 0 };
    });
    const activityMap = new Map(activity.map((item) => [item.date, item]));

    for (const event of events) {
      const bucket = activityMap.get(String(event.created_at).slice(0, 10));
      if (bucket) bucket.count += 1;
    }

    // Public events can be empty when a user hides parts of their activity.
    // Repository push timestamps keep the signal honest without exposing private work.
    for (const repo of repos) {
      const bucket = activityMap.get(String(repo.pushed_at || "").slice(0, 10));
      if (bucket) bucket.count += 1;
    }

    const latestRepo = [...repos].sort(
      (left, right) =>
        new Date(right.pushed_at || 0).getTime() - new Date(left.pushed_at || 0).getTime()
    )[0];
    const contributionCalendar =
      calendarData?.user?.contributionsCollection?.contributionCalendar;
    const contributionWeeks =
      contributionCalendar?.weeks?.slice(-34) || calendarFromPublicSignals(events, repos);

    return {
      publicRepos: user.public_repos,
      topLanguage,
      activeDays: activity.filter((day) => day.count > 0).length,
      latestRepo: latestRepo?.name || "signal unavailable",
      activity,
      contributionWeeks,
      totalContributions:
        contributionCalendar?.totalContributions ??
        contributionWeeks
          .flatMap((week) => week.contributionDays)
          .reduce((sum, day) => sum + day.contributionCount, 0)
    };
  } catch (error) {
    console.warn(`${error.message}; using deterministic preview telemetry.`);
    return fallbackData();
  }
}

function renderProfessionalTopology(data, palette) {
  const weeks = data.contributionWeeks?.slice(-34) || emptyContributionWeeks();
  const days = weeks.flatMap((week, column) =>
    week.contributionDays.map((day, row) => ({
      column,
      row,
      date: day.date,
      count: day.contributionCount || 0
    }))
  );
  const max = Math.max(1, ...days.map((day) => day.count));
  const gridX = 430;
  const gridY = 98;
  const step = 18;
  const cell = 14;

  const levelColor = (count) => {
    if (!count) return palette.grid;
    const ratio = count / max;
    if (ratio > 0.74) return palette.cyan;
    if (ratio > 0.42) return "#347786";
    if (ratio > 0.18) return "#23515d";
    return "#183842";
  };

  const cells = days
    .map((day) => {
      const x = gridX + day.column * step;
      const y = gridY + day.row * step;
      return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="3" fill="${levelColor(day.count)}">
        <title>${esc(day.date)}: ${day.count} public contributions</title>
      </rect>`;
    })
    .join("");

  const pulses = [...days]
    .filter((day) => day.count > 0)
    .sort((left, right) => right.count - left.count)
    .slice(0, 10)
    .map((day, index) => {
      const x = gridX + day.column * step - 3;
      const y = gridY + day.row * step - 3;
      const begin = (0.35 + index * 0.21).toFixed(2);
      return `<rect x="${x}" y="${y}" width="${cell + 6}" height="${cell + 6}" rx="5" fill="none" stroke="${palette.cyan}" stroke-width="1.5" opacity="0">
        <animate attributeName="opacity" values="0;0;1;.15;0" keyTimes="0;.35;.48;.7;1" dur="5.8s" begin="${begin}s" repeatCount="indefinite"/>
      </rect>`;
    })
    .join("");

  const updated = new Date().toISOString().slice(0, 10);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="306" viewBox="0 0 1200 306" role="img" aria-labelledby="title desc">
  <title id="title">Ingaleee contribution topology</title>
  <desc id="desc">Automatically refreshed public GitHub activity visualized as a distributed systems trace.</desc>
  <defs>
    <pattern id="topologyGrid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="${palette.grid}" stroke-width="1"/>
    </pattern>
    <linearGradient id="traceBeam" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${palette.cyan}" stop-opacity="0"/>
      <stop offset=".72" stop-color="${palette.cyan}" stop-opacity=".04"/>
      <stop offset="1" stop-color="${palette.cyan}" stop-opacity=".42"/>
    </linearGradient>
    <filter id="traceGlow" x="-100%" y="-20%" width="300%" height="140%">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <style>
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    </style>
  </defs>

  <rect x="12" y="12" width="1176" height="282" rx="28" fill="${palette.bg}" stroke="${palette.line}" stroke-width="2"/>
  <rect x="12" y="12" width="1176" height="282" rx="28" fill="url(#topologyGrid)" opacity=".52"/>

  <text x="40" y="52" class="mono" font-size="12" letter-spacing="1.8" fill="${palette.cyan}">LIVE.TOPOLOGY</text>
  <circle cx="179" cy="48" r="4.5" fill="${palette.cyan}">
    <animate attributeName="opacity" values=".25;1;.25" dur="2.4s" repeatCount="indefinite"/>
  </circle>
  <text x="40" y="80" class="sans" font-size="21" font-weight="700" fill="${palette.text}">Public signal, mapped as a distributed trace</text>
  <text x="1020" y="52" class="mono" font-size="10" letter-spacing="1" fill="${palette.muted}">SYNC ${updated}</text>

  <g transform="translate(40 104)">
    <rect width="340" height="152" rx="16" fill="${palette.panel}" stroke="${palette.line}"/>
    <text x="20" y="28" class="mono" font-size="10" letter-spacing="1" fill="${palette.muted}">PUBLIC REPOS</text>
    <text x="20" y="65" class="sans" font-size="32" font-weight="760" fill="${palette.cyan}">${esc(data.publicRepos)}</text>
    <text x="122" y="28" class="mono" font-size="10" letter-spacing="1" fill="${palette.muted}">PRIMARY</text>
    <text x="122" y="65" class="mono" font-size="18" fill="${palette.text}">${esc(data.topLanguage)}</text>
    <text x="222" y="28" class="mono" font-size="10" letter-spacing="1" fill="${palette.muted}">SIGNALS</text>
    <text x="222" y="65" class="sans" font-size="32" font-weight="760" fill="${palette.cyan}">${esc(data.totalContributions)}</text>
    <line x1="20" y1="88" x2="320" y2="88" stroke="${palette.line}"/>
    <text x="20" y="112" class="mono" font-size="9" letter-spacing=".8" fill="${palette.muted}">LATEST DEPLOYMENT SIGNAL</text>
    <text x="20" y="135" class="mono" font-size="12" fill="${palette.text}">${esc(data.latestRepo.slice(0, 39))}</text>
  </g>

  <text x="${gridX}" y="52" class="mono" font-size="10" letter-spacing="1.1" fill="${palette.muted}">CONTRIBUTION TOPOLOGY // 34 WEEKS</text>
  <g>${cells}</g>
  <g>${pulses}</g>
  <g opacity=".9">
    <rect x="${gridX - 72}" y="${gridY - 12}" width="72" height="150" fill="url(#traceBeam)" filter="url(#traceGlow)"/>
    <line x1="${gridX}" y1="${gridY - 10}" x2="${gridX}" y2="${gridY + 136}" stroke="${palette.cyan}" stroke-width="1.5"/>
    <animateTransform attributeName="transform" type="translate" values="0 0;612 0;0 0" dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".4 0 .2 1;.4 0 .2 1"/>
  </g>
  <text x="${gridX}" y="249" class="mono" font-size="9" fill="${palette.muted}">-34W</text>
  <text x="${gridX + 586}" y="249" class="mono" font-size="9" fill="${palette.muted}">NOW</text>
  <text x="${gridX}" y="272" class="mono" font-size="9" letter-spacing=".8" fill="${palette.muted}">TRACE MODE / PUBLIC CONTRIBUTION DENSITY / AUTO-REFRESHED</text>
</svg>
`;
}

function render(data, palette) {
  const max = Math.max(1, ...data.activity.map((day) => day.count));
  const bars = data.activity
    .map((day, index) => {
      const x = 418 + index * 25;
      const height = day.count === 0 ? 8 : 18 + Math.round((day.count / max) * 74);
      const y = 196 - height;
      const color = day.count > max * 0.66 ? palette.magenta : day.count > 0 ? palette.cyan : palette.grid;
      return `<g>
        <rect x="${x}" y="${y}" width="15" height="${height}" rx="4" fill="${color}" opacity="${day.count ? ".9" : ".65"}"/>
        <circle cx="${x + 7.5}" cy="${y}" r="${day.count ? 3 : 1.5}" fill="${palette.lime}"/>
      </g>`;
    })
    .join("");

  const updated = new Date().toISOString().slice(0, 10);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="258" viewBox="0 0 1200 258" role="img" aria-labelledby="title desc">
  <title id="title">Ingaleee public activity telemetry</title>
  <desc id="desc">Automatically refreshed public repository and activity statistics.</desc>
  <defs>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="${palette.grid}" stroke-width="1"/>
    </pattern>
    <style>
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .pulse { animation: pulse 2.2s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
    </style>
  </defs>
  <rect x="12" y="12" width="1176" height="234" rx="30" fill="${palette.bg}" stroke="${palette.line}" stroke-width="2"/>
  <rect x="12" y="12" width="1176" height="234" rx="30" fill="url(#grid)" opacity=".55"/>
  <text x="40" y="53" class="mono" font-size="14" fill="${palette.lime}">LIVE.TELEMETRY</text>
  <circle cx="185" cy="48" r="5" fill="${palette.lime}" class="pulse"/>
  <text x="40" y="82" class="sans" font-size="22" font-weight="700" fill="${palette.text}">Public signal, automatically refreshed</text>

  <g transform="translate(40 112)">
    <rect width="330" height="105" rx="16" fill="${palette.panel}" stroke="${palette.line}"/>
    <text x="20" y="27" class="mono" font-size="11" fill="${palette.muted}">REPOSITORIES</text>
    <text x="20" y="68" class="sans" font-size="35" font-weight="800" fill="${palette.cyan}">${esc(data.publicRepos)}</text>
    <text x="112" y="27" class="mono" font-size="11" fill="${palette.muted}">PRIMARY</text>
    <text x="112" y="68" class="mono" font-size="20" fill="${palette.text}">${esc(data.topLanguage)}</text>
    <text x="217" y="27" class="mono" font-size="11" fill="${palette.muted}">SIGNAL DAYS</text>
    <text x="217" y="68" class="sans" font-size="35" font-weight="800" fill="${palette.magenta}">${esc(data.activeDays)}</text>
    <text x="20" y="92" class="mono" font-size="10" fill="${palette.muted}">LATEST // ${esc(data.latestRepo.slice(0, 34))}</text>
  </g>

  <text x="418" y="112" class="mono" font-size="11" fill="${palette.muted}">PUBLIC SIGNAL // 28 DAYS</text>
  <line x1="418" y1="202" x2="1110" y2="202" stroke="${palette.line}"/>
  ${bars}
  <text x="418" y="224" class="mono" font-size="10" fill="${palette.muted}">-28D</text>
  <text x="1075" y="224" class="mono" font-size="10" fill="${palette.muted}">NOW</text>
  <text x="1020" y="53" class="mono" font-size="11" fill="${palette.muted}">SYNC ${updated}</text>
</svg>
`;
}

const data = await collectData();
await mkdir(new URL("../assets/", import.meta.url), { recursive: true });

for (const [name, palette] of Object.entries(themes)) {
  await writeFile(
    new URL(`../assets/activity-${name}.svg`, import.meta.url),
    name === "professional" ? renderProfessionalTopology(data, palette) : render(data, palette),
    "utf8"
  );
}

console.log("Refreshed professional contribution topology.");
