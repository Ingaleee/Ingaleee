import { writeFile } from "node:fs/promises";

const themes = {
  dark: {
    bg: "#080b10",
    panel: "#0d1219",
    panel2: "#111821",
    border: "#29333f",
    soft: "#1b242e",
    grid: "#16202a",
    text: "#eef4f7",
    muted: "#8695a3",
    faint: "#536372",
    accent: "#55d9e8",
    accent2: "#258c9c",
    ok: "#57dfa9",
    warning: "#f2b84b",
    danger: "#ef6b73",
    glow: "#092a31",
    shadow: "#000000",
  },
  light: {
    bg: "#eef3f6",
    panel: "#f9fbfc",
    panel2: "#ffffff",
    border: "#aebdc7",
    soft: "#d4dee4",
    grid: "#d7e2e7",
    text: "#10202a",
    muted: "#536976",
    faint: "#78909d",
    accent: "#007f92",
    accent2: "#53bdca",
    ok: "#007d58",
    warning: "#aa6a00",
    danger: "#bc3540",
    glow: "#dff5f7",
    shadow: "#8095a0",
  },
};

const logLines = [
  ["SEARCH", "query-engine      p95=150ms / HEALTHY", "ok"],
  ["EVENTS", "kafka-workers     heavy load isolated", "ok"],
  ["RAG", "knowledge-v42     zero-downtime rollout", "trace"],
  ["PAYMENTS", "callback-router    idempotent + reconciled", "trace"],
  ["MEDIA", "ingestion-pipeline retry-safe / distributed", "ok"],
  ["OBS", "trace-fabric      MTTR delta = −70%", "trace"],
  ["SCALE", "catalog-index     100K—1M SKU", "ok"],
  ["STATUS", "all critical paths nominal_", "final"],
];

const systems = [
  ["CATALOG + MEDIA", ".NET 9 · PostgreSQL · Kafka", "search / BOM / assets"],
  ["AI / RAG", "pgvector · HNSW · ClickHouse", "retrieval / routing / rollout"],
  ["LENDING + PAYMENTS", "C# · SQL Server · REST", "state / callbacks / reconciliation"],
  ["PLATFORM", "Kubernetes · OTel · Grafana", "delivery / tracing / operations"],
];

function lineClips(lines, x, y, gap, width, prefix) {
  return lines
    .map((_, index) => {
      const begin = (0.42 + index * 0.17).toFixed(2);
      return `<clipPath id="${prefix}${index}"><rect x="${x}" y="${y + index * gap - 20}" width="0" height="${gap + 5}"><animate attributeName="width" from="0" to="${width}" dur=".45s" begin="${begin}s" fill="freeze" calcMode="spline" keySplines=".22 .8 .24 1"/></rect></clipPath>`;
    })
    .join("");
}

function renderLog(lines, x, y, gap, prefix, theme, mobile = false) {
  const tagX = x + (mobile ? 72 : 82);
  const messageX = x + (mobile ? 150 : 174);
  const font = mobile ? 13.5 : 14.5;
  return lines
    .map(([tag, message, type], index) => {
      const color = type === "trace" ? theme.warning : type === "final" ? theme.accent : theme.ok;
      const time = `12:04:${String(17 + index).padStart(2, "0")}`;
      const cursor =
        type === "final"
          ? `<rect x="${messageX + (mobile ? 243 : 276)}" y="${y + index * gap - 15}" width="8" height="18" fill="${theme.accent}"><animate attributeName="opacity" values="1;1;0;0" dur=".88s" repeatCount="indefinite"/></rect>`
          : "";
      return `<g clip-path="url(#${prefix}${index})">
        <text x="${x}" y="${y + index * gap}" class="mono" font-size="${font - 2}" fill="${theme.faint}">${time}</text>
        <text x="${tagX}" y="${y + index * gap}" class="mono" font-size="${font - 1}" font-weight="800" fill="${color}">${tag}</text>
        <text x="${messageX}" y="${y + index * gap}" class="mono" font-size="${font}" font-weight="${type === "final" ? 760 : 520}" fill="${theme.text}">${message}</text>
        ${cursor}
      </g>`;
    })
    .join("");
}

function systemCard({ x, y, width, height, system, theme, delay, mobile = false }) {
  const [title, stack, note] = system;
  const noteLine = mobile
    ? `<text x="20" y="73" class="sans" font-size="10.5" fill="${theme.muted}">${note}</text>`
    : "";
  return `<g transform="translate(${x} ${y})" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".65s" begin="${delay}s" fill="freeze"/>
    <rect width="${width}" height="${height}" rx="12" fill="${theme.panel2}" stroke="${theme.soft}"/>
    <circle cx="20" cy="22" r="4" fill="${theme.ok}">
      <animate attributeName="opacity" values=".35;1;.35" dur="2.8s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>
    <text x="34" y="26" class="mono" font-size="${mobile ? 10 : 10.5}" font-weight="800" letter-spacing=".9" fill="${theme.accent}">${title}</text>
    <text x="20" y="${mobile ? 52 : 55}" class="sans" font-size="${mobile ? 13 : 13.5}" font-weight="650" fill="${theme.text}">${stack}</text>
    ${noteLine}
  </g>`;
}

function movingTopology(theme) {
  return `<g opacity=".7">
    <path id="routeA" d="M52 407 C220 352 305 448 450 392 S705 350 820 396 1010 418 1148 354" fill="none" stroke="${theme.border}" stroke-width="1.2"/>
    <path id="routeB" d="M238 92 C360 44 430 122 552 88 S770 62 905 109 1055 140 1150 104" fill="none" stroke="${theme.soft}" stroke-width="1"/>
    <circle r="4" fill="${theme.accent}">
      <animateMotion path="M52 407 C220 352 305 448 450 392 S705 350 820 396 1010 418 1148 354" dur="6.2s" repeatCount="indefinite"/>
    </circle>
    <circle r="3.5" fill="${theme.ok}">
      <animateMotion path="M238 92 C360 44 430 122 552 88 S770 62 905 109 1055 140 1150 104" dur="5.4s" begin=".8s" repeatCount="indefinite"/>
    </circle>
  </g>`;
}

function buildDesktop(themeName) {
  const theme = themes[themeName];
  const defs = lineClips(logLines, 58, 132, 33, 650, "log");
  const logs = renderLog(logLines, 58, 132, 33, "log", theme);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500" viewBox="0 0 1200 500" role="img" aria-labelledby="title desc">
  <title id="title">Production evidence stream</title>
  <desc id="desc">Animated evidence stream showing production systems, measurable engineering outcomes and active backend domains.</desc>
  <defs>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="${theme.grid}" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="62%" cy="32%" r="78%">
      <stop offset="0" stop-color="${theme.glow}" stop-opacity=".8"/>
      <stop offset=".56" stop-color="${theme.bg}" stop-opacity=".18"/>
      <stop offset="1" stop-color="${theme.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.accent}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${theme.accent}" stop-opacity=".25"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="${theme.shadow}" flood-opacity=".28"/>
    </filter>
    <clipPath id="frame"><rect x="10" y="10" width="1180" height="480" rx="22"/></clipPath>
    ${defs}
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .sweep { animation: sweep 7s ease-in-out infinite; }
      .pulse { animation: pulse 2.8s ease-in-out infinite; }
      @keyframes sweep { 0%, 20% { transform: translateX(-360px); opacity: 0; } 38% { opacity: .7; } 62%, 100% { transform: translateX(1230px); opacity: 0; } }
      @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
    </style>
  </defs>

  <rect x="10" y="10" width="1180" height="480" rx="22" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" filter="url(#shadow)"/>
  <g clip-path="url(#frame)">
    <rect x="10" y="10" width="1180" height="480" fill="url(#grid)" opacity=".42"/>
    <rect x="10" y="10" width="1180" height="480" fill="url(#glow)"/>
    ${movingTopology(theme)}
    <rect class="sweep" x="-360" y="48" width="180" height="420" fill="url(#scan)" transform="skewX(-12)"/>
  </g>

  <rect x="10" y="10" width="1180" height="42" rx="21" fill="${theme.panel}" stroke="${theme.border}"/>
  <circle cx="34" cy="31" r="4.5" fill="#ec5f67"/>
  <circle cx="51" cy="31" r="4.5" fill="#f4bf75"/>
  <circle cx="68" cy="31" r="4.5" fill="${theme.ok}"/>
  <text x="600" y="35" text-anchor="middle" class="mono" font-size="11" letter-spacing=".8" fill="${theme.muted}">ingaleee@production ~ tail -f evidence.stream</text>
  <circle cx="1157" cy="31" r="4" fill="${theme.ok}" class="pulse"/>
  <text x="1144" y="35" text-anchor="end" class="mono" font-size="9" letter-spacing="1" fill="${theme.faint}">LIVE</text>

  <rect x="34" y="72" width="700" height="320" rx="14" fill="${theme.panel}" fill-opacity=".92" stroke="${theme.border}"/>
  <text x="58" y="103" class="mono" font-size="10" font-weight="800" letter-spacing="1.5" fill="${theme.accent}">PRODUCTION EVIDENCE STREAM</text>
  <text x="710" y="103" text-anchor="end" class="mono" font-size="9" letter-spacing="1" fill="${theme.faint}">NO DEMOS / NO VANITY METRICS</text>
  ${logs}

  <rect x="758" y="72" width="408" height="320" rx="14" fill="${theme.panel}" fill-opacity=".92" stroke="${theme.border}"/>
  <text x="782" y="103" class="mono" font-size="10" font-weight="800" letter-spacing="1.5" fill="${theme.accent}">ACTIVE SYSTEMS</text>
  ${systemCard({ x: 782, y: 120, width: 360, height: 58, system: systems[0], theme, delay: "1.15" })}
  ${systemCard({ x: 782, y: 188, width: 360, height: 58, system: systems[1], theme, delay: "1.35" })}
  ${systemCard({ x: 782, y: 256, width: 360, height: 58, system: systems[2], theme, delay: "1.55" })}
  ${systemCard({ x: 782, y: 324, width: 360, height: 58, system: systems[3], theme, delay: "1.75" })}

  <g transform="translate(34 418)" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".7s" begin="2s" fill="freeze"/>
    <text x="0" y="0" class="mono" font-size="9" letter-spacing="1.1" fill="${theme.faint}">INDEPENDENT NODES</text>
    <g transform="translate(0 17)">
      <rect width="230" height="34" rx="17" fill="${theme.panel2}" stroke="${theme.soft}"/>
      <circle cx="18" cy="17" r="3.5" fill="${theme.ok}"/>
      <text x="31" y="21" class="mono" font-size="10.5" font-weight="700" fill="${theme.text}">TRUSTHUB / GO + TON</text>
    </g>
    <g transform="translate(245 17)">
      <rect width="230" height="34" rx="17" fill="${theme.panel2}" stroke="${theme.soft}"/>
      <circle cx="18" cy="17" r="3.5" fill="${theme.ok}"/>
      <text x="31" y="21" class="mono" font-size="10.5" font-weight="700" fill="${theme.text}">MPLX / C++20 + VM</text>
    </g>
    <g transform="translate(490 17)">
      <rect width="250" height="34" rx="17" fill="${theme.panel2}" stroke="${theme.soft}"/>
      <circle cx="18" cy="17" r="3.5" fill="${theme.ok}"/>
      <text x="31" y="21" class="mono" font-size="10.5" font-weight="700" fill="${theme.text}">VPN / VLESS + WIREGUARD</text>
    </g>
    <text x="1132" y="39" text-anchor="end" class="mono" font-size="10" letter-spacing="1.1" fill="${theme.accent}">OPEN TO INTERNATIONAL REMOTE + RELOCATION</text>
  </g>
</svg>`;
}

function buildMobile(themeName) {
  const theme = themes[themeName];
  const mobileLogs = [
    ["SEARCH", "p95=150ms / HEALTHY", "ok"],
    ["EVENTS", "Kafka load isolated", "ok"],
    ["RAG", "zero-downtime rollout", "trace"],
    ["PAYMENTS", "idempotent + reconciled", "trace"],
    ["MEDIA", "distributed / retry-safe", "ok"],
    ["OBS", "MTTR delta = −70%", "trace"],
    ["SCALE", "catalog 100K—1M SKU", "ok"],
    ["STATUS", "critical paths nominal_", "final"],
  ];
  const defs = lineClips(mobileLogs, 52, 124, 34, 610, "mobileLog");
  const logs = renderLog(mobileLogs, 52, 124, 34, "mobileLog", theme, true);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="940" viewBox="0 0 720 940" role="img" aria-labelledby="title desc">
  <title id="title">Mobile production evidence stream</title>
  <desc id="desc">Animated mobile evidence stream showing production outcomes and active backend systems.</desc>
  <defs>
    <pattern id="mobileGrid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="${theme.grid}" stroke-width="1"/>
    </pattern>
    <radialGradient id="mobileGlow" cx="60%" cy="28%" r="80%">
      <stop offset="0" stop-color="${theme.glow}" stop-opacity=".8"/>
      <stop offset=".58" stop-color="${theme.bg}" stop-opacity=".15"/>
      <stop offset="1" stop-color="${theme.bg}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="mobileFrame"><rect x="10" y="10" width="700" height="920" rx="22"/></clipPath>
    ${defs}
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .pulse { animation: pulse 2.8s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
    </style>
  </defs>

  <rect x="10" y="10" width="700" height="920" rx="22" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2"/>
  <g clip-path="url(#mobileFrame)">
    <rect x="10" y="10" width="700" height="920" fill="url(#mobileGrid)" opacity=".42"/>
    <rect x="10" y="10" width="700" height="920" fill="url(#mobileGlow)"/>
  </g>
  <rect x="10" y="10" width="700" height="42" rx="21" fill="${theme.panel}" stroke="${theme.border}"/>
  <circle cx="34" cy="31" r="4.5" fill="#ec5f67"/>
  <circle cx="51" cy="31" r="4.5" fill="#f4bf75"/>
  <circle cx="68" cy="31" r="4.5" fill="${theme.ok}"/>
  <text x="360" y="35" text-anchor="middle" class="mono" font-size="10.5" letter-spacing=".6" fill="${theme.muted}">ingaleee@production ~ evidence.stream</text>
  <circle cx="681" cy="31" r="3.7" fill="${theme.ok}" class="pulse"/>

  <rect x="28" y="70" width="664" height="350" rx="14" fill="${theme.panel}" fill-opacity=".94" stroke="${theme.border}"/>
  <text x="52" y="101" class="mono" font-size="10" font-weight="800" letter-spacing="1.4" fill="${theme.accent}">PRODUCTION EVIDENCE STREAM</text>
  <text x="668" y="101" text-anchor="end" class="mono" font-size="9" letter-spacing=".8" fill="${theme.faint}">LIVE</text>
  ${logs}

  <text x="28" y="455" class="mono" font-size="10" font-weight="800" letter-spacing="1.4" fill="${theme.accent}">ACTIVE SYSTEMS</text>
  ${systemCard({ x: 28, y: 474, width: 318, height: 112, system: systems[0], theme, delay: "1.1", mobile: true })}
  ${systemCard({ x: 374, y: 474, width: 318, height: 112, system: systems[1], theme, delay: "1.3", mobile: true })}
  ${systemCard({ x: 28, y: 606, width: 318, height: 112, system: systems[2], theme, delay: "1.5", mobile: true })}
  ${systemCard({ x: 374, y: 606, width: 318, height: 112, system: systems[3], theme, delay: "1.7", mobile: true })}

  <g transform="translate(28 760)" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".7s" begin="2s" fill="freeze"/>
    <text x="0" y="0" class="mono" font-size="9" letter-spacing="1.1" fill="${theme.faint}">INDEPENDENT NODES</text>
    <g transform="translate(0 18)">
      <rect width="202" height="38" rx="19" fill="${theme.panel2}" stroke="${theme.soft}"/>
      <circle cx="17" cy="19" r="3.5" fill="${theme.ok}"/>
      <text x="30" y="23" class="mono" font-size="10" font-weight="700" fill="${theme.text}">TRUSTHUB / GO</text>
    </g>
    <g transform="translate(218 18)">
      <rect width="202" height="38" rx="19" fill="${theme.panel2}" stroke="${theme.soft}"/>
      <circle cx="17" cy="19" r="3.5" fill="${theme.ok}"/>
      <text x="30" y="23" class="mono" font-size="10" font-weight="700" fill="${theme.text}">MPLX / C++20</text>
    </g>
    <g transform="translate(436 18)">
      <rect width="228" height="38" rx="19" fill="${theme.panel2}" stroke="${theme.soft}"/>
      <circle cx="17" cy="19" r="3.5" fill="${theme.ok}"/>
      <text x="30" y="23" class="mono" font-size="10" font-weight="700" fill="${theme.text}">VPN / WIREGUARD</text>
    </g>
  </g>

  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".7s" begin="2.2s" fill="freeze"/>
    <text x="28" y="872" class="mono" font-size="9.5" letter-spacing=".9" fill="${theme.muted}">HIGHLOAD / FINTECH / AI &amp; RAG</text>
    <text x="692" y="872" text-anchor="end" class="mono" font-size="9.5" letter-spacing=".8" fill="${theme.accent}">GLOBAL REMOTE / RELOCATION</text>
  </g>
</svg>`;
}

await Promise.all([
  writeFile(new URL("../assets/evidence-stream-dark.svg", import.meta.url), buildDesktop("dark"), "utf8"),
  writeFile(new URL("../assets/evidence-stream-light.svg", import.meta.url), buildDesktop("light"), "utf8"),
  writeFile(new URL("../assets/evidence-stream-mobile-dark.svg", import.meta.url), buildMobile("dark"), "utf8"),
  writeFile(new URL("../assets/evidence-stream-mobile-light.svg", import.meta.url), buildMobile("light"), "utf8"),
]);

console.log("Built production evidence stream assets.");
