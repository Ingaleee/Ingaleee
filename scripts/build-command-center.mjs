import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../assets/panther-hero.webp", import.meta.url));
const panther = `data:image/webp;base64,${source.toString("base64")}`;

const themes = {
  dark: {
    bg: "#06080c",
    panel: "#0a0e14",
    panel2: "#0e141c",
    border: "#28313c",
    borderSoft: "#19212a",
    text: "#eef4f7",
    muted: "#82909d",
    faint: "#53616e",
    accent: "#55d9e8",
    accent2: "#22899a",
    ok: "#58e0aa",
    warning: "#f2b84b",
    grid: "#15202a",
    shadow: "#000000",
    imageOverlay: "#061017",
    terminalGlow: "#08232a",
  },
  light: {
    bg: "#eef3f6",
    panel: "#f9fbfc",
    panel2: "#ffffff",
    border: "#aebdc7",
    borderSoft: "#d4dee4",
    text: "#10202a",
    muted: "#526876",
    faint: "#78909d",
    accent: "#007f92",
    accent2: "#53bdca",
    ok: "#007d58",
    warning: "#aa6a00",
    grid: "#d7e2e7",
    shadow: "#8095a0",
    imageOverlay: "#e7f5f7",
    terminalGlow: "#dff5f7",
  },
};

const desktopLines = [
  ["cmd", "$", "dotnet run --profile ingaleee --mode production"],
  ["ok", "[ OK ]", "identity ........ EGOR SOLOVYEV"],
  ["ok", "[ OK ]", "role ............ SENIOR C#/.NET BACKEND ENGINEER"],
  ["sys", "[SYS ]", "runtime ......... .NET 6—9 / ASP.NET CORE"],
  ["sys", "[SYS ]", "architecture .... MICROSERVICES / DDD / CQRS"],
  ["sys", "[SYS ]", "transport ....... KAFKA / RABBITMQ / gRPC"],
  ["sys", "[SYS ]", "persistence ..... POSTGRESQL / SQL SERVER / REDIS"],
  ["sys", "[SYS ]", "platform ........ DOCKER / KUBERNETES / OTEL"],
  ["trace", "[TRACE]", "search.p95 ...... 150 ms"],
  ["trace", "[TRACE]", "mttr.delta ...... −70%"],
  ["trace", "[TRACE]", "catalog.scale ... 1M SKU"],
  ["trace", "[TRACE]", "rag.deploy ...... ZERO-DOWNTIME ROLLOUT"],
  ["ok", "[READY]", "domains ......... FINTECH / CYBERSECURITY / AI"],
  ["final", ">", "systems that stay calm under load_"],
];

const mobileLines = [
  ["cmd", "$", "dotnet run --profile ingaleee"],
  ["ok", "[OK]", "EGOR SOLOVYEV"],
  ["ok", "[OK]", "SENIOR C#/.NET BACKEND ENGINEER"],
  ["sys", "[SYS]", ".NET 6—9 / ASP.NET CORE"],
  ["sys", "[SYS]", "MICROSERVICES / DDD / CQRS"],
  ["sys", "[SYS]", "KAFKA / RABBITMQ / gRPC"],
  ["sys", "[SYS]", "POSTGRESQL / SQL SERVER / REDIS"],
  ["sys", "[SYS]", "DOCKER / KUBERNETES / OTEL"],
  ["trace", "[P95]", "SEARCH 150 ms"],
  ["trace", "[OPS]", "MTTR −70% / ZERO-DOWNTIME RAG"],
  ["ok", "[GO]", "FINTECH / CYBERSECURITY / AI"],
  ["final", ">", "CALM SYSTEMS UNDER LOAD_"],
];

function clips(lines, x, y, gap, width, prefix) {
  return lines
    .map((_, index) => {
      const begin = (0.55 + index * 0.14).toFixed(2);
      const lineY = y + index * gap - 19;
      return `<clipPath id="${prefix}${index}"><rect x="${x}" y="${lineY}" width="0" height="${gap + 4}"><animate attributeName="width" from="0" to="${width}" dur=".42s" begin="${begin}s" fill="freeze" calcMode="spline" keySplines=".22 .8 .24 1"/></rect></clipPath>`;
    })
    .join("");
}

function terminalLines(lines, x, y, gap, prefix, theme, mobile = false) {
  const labelX = mobile ? x + 52 : x + 78;
  const fontSize = mobile ? 13.5 : 14.5;
  return lines
    .map(([type, label, value], index) => {
      const color =
        type === "ok"
          ? theme.ok
          : type === "trace"
            ? theme.warning
            : type === "final" || type === "cmd"
              ? theme.accent
              : theme.muted;
      const valueColor = type === "final" ? theme.text : type === "cmd" ? theme.text : theme.text;
      const weight = type === "final" ? 700 : 520;
      const cursor =
        type === "final"
          ? `<rect x="${labelX + (mobile ? 231 : 301)}" y="${y + index * gap - 14}" width="8" height="18" fill="${theme.accent}"><animate attributeName="opacity" values="1;1;0;0" dur=".9s" repeatCount="indefinite"/></rect>`
          : "";
      return `<g clip-path="url(#${prefix}${index})">
        <text x="${x}" y="${y + index * gap}" class="mono" font-size="${fontSize}" font-weight="700" fill="${color}">${label}</text>
        <text x="${labelX}" y="${y + index * gap}" class="mono" font-size="${fontSize}" font-weight="${weight}" fill="${valueColor}">${value}</text>
        ${cursor}
      </g>`;
    })
    .join("");
}

function topology(theme) {
  return `<g opacity=".72">
    <path d="M454 245 C520 185 590 214 645 165 S770 122 840 174" fill="none" stroke="${theme.border}" stroke-width="1.2"/>
    <path d="M430 410 C520 348 564 420 638 354 S770 295 876 347" fill="none" stroke="${theme.border}" stroke-width="1.2"/>
    <path d="M725 107 C778 165 777 237 862 271 S1001 288 1138 232" fill="none" stroke="${theme.borderSoft}" stroke-width="1"/>
    <circle r="4" fill="${theme.accent}">
      <animateMotion path="M454 245 C520 185 590 214 645 165 S770 122 840 174" dur="4.6s" repeatCount="indefinite"/>
    </circle>
    <circle r="3.5" fill="${theme.ok}">
      <animateMotion path="M430 410 C520 348 564 420 638 354 S770 295 876 347" dur="5.8s" begin=".7s" repeatCount="indefinite"/>
    </circle>
    <circle r="3" fill="${theme.warning}">
      <animateMotion path="M725 107 C778 165 777 237 862 271 S1001 288 1138 232" dur="6.5s" begin="1.1s" repeatCount="indefinite"/>
    </circle>
  </g>`;
}

function statCard({ x, width, value, label, note, theme, delay }) {
  return `<g transform="translate(${x} 0)" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".7s" begin="${delay}s" fill="freeze"/>
    <rect width="${width}" height="112" rx="12" fill="${theme.panel2}" stroke="${theme.borderSoft}"/>
    <rect width="3" height="112" rx="1.5" fill="${theme.accent}" opacity=".8"/>
    <text x="22" y="39" class="sans" font-size="27" font-weight="780" fill="${theme.text}">${value}</text>
    <text x="22" y="64" class="mono" font-size="9.5" font-weight="700" letter-spacing="1.3" fill="${theme.accent}">${label}</text>
    <text x="22" y="88" class="sans" font-size="11.5" fill="${theme.muted}">${note}</text>
  </g>`;
}

function buildDesktop(themeName) {
  const theme = themes[themeName];
  const lineDefs = clips(desktopLines, 510, 120, 27, 630, "line");
  const terminal = terminalLines(desktopLines, 510, 120, 27, "line", theme);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc">
  <title id="title">Egor Solovyev — production backend command center</title>
  <desc id="desc">Animated engineering command center for a Senior C#/.NET Backend Engineer working on highload distributed systems, FinTech and AI/RAG.</desc>
  <defs>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="${theme.grid}" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="75%" cy="28%" r="74%">
      <stop offset="0" stop-color="${theme.terminalGlow}" stop-opacity=".82"/>
      <stop offset=".52" stop-color="${theme.bg}" stop-opacity=".18"/>
      <stop offset="1" stop-color="${theme.bg}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="imageFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.imageOverlay}" stop-opacity=".02"/>
      <stop offset=".64" stop-color="${theme.imageOverlay}" stop-opacity=".05"/>
      <stop offset="1" stop-color="${theme.imageOverlay}" stop-opacity=".88"/>
    </linearGradient>
    <linearGradient id="scan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.accent}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${theme.accent}" stop-opacity=".34"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="${theme.shadow}" flood-opacity=".34"/>
    </filter>
    <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="frame"><rect x="10" y="10" width="1180" height="700" rx="22"/></clipPath>
    <clipPath id="portrait"><rect x="34" y="76" width="426" height="420" rx="14"/></clipPath>
    <mask id="portraitReveal" x="34" y="76" width="426" height="420" maskUnits="userSpaceOnUse">
      <rect x="34" y="76" width="0" height="420" fill="#fff">
        <animate attributeName="width" from="0" to="426" dur="1.5s" begin=".15s" fill="freeze" calcMode="spline" keySplines=".22 .8 .24 1"/>
      </rect>
    </mask>
    ${lineDefs}
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .pulse { animation: pulse 2.8s ease-in-out infinite; }
      .sweep { animation: sweep 7s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: .28; } 50% { opacity: 1; } }
      @keyframes sweep { 0%, 18% { transform: translateX(-520px); opacity: 0; } 32% { opacity: .75; } 58%, 100% { transform: translateX(1240px); opacity: 0; } }
    </style>
  </defs>

  <rect x="10" y="10" width="1180" height="700" rx="22" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2" filter="url(#shadow)"/>
  <g clip-path="url(#frame)">
    <rect x="10" y="10" width="1180" height="700" fill="url(#grid)" opacity=".44"/>
    <rect x="10" y="10" width="1180" height="700" fill="url(#glow)"/>
    ${topology(theme)}
    <rect class="sweep" x="-510" y="48" width="220" height="610" fill="url(#scan)" transform="skewX(-12)"/>
  </g>

  <rect x="10" y="10" width="1180" height="42" rx="21" fill="${theme.panel}" stroke="${theme.border}"/>
  <circle cx="34" cy="31" r="4.5" fill="#ec5f67"/>
  <circle cx="51" cy="31" r="4.5" fill="#f4bf75"/>
  <circle cx="68" cy="31" r="4.5" fill="${theme.ok}"/>
  <text x="600" y="35" text-anchor="middle" class="mono" font-size="11" letter-spacing=".8" fill="${theme.muted}">ingaleee@production ~ ./bootstrap-profile --live</text>
  <circle cx="1158" cy="31" r="4" fill="${theme.ok}" class="pulse"/>
  <text x="1145" y="35" text-anchor="end" class="mono" font-size="9" letter-spacing="1" fill="${theme.faint}">ONLINE</text>

  <g mask="url(#portraitReveal)">
    <rect x="34" y="76" width="426" height="420" rx="14" fill="${theme.panel2}"/>
    <g clip-path="url(#portrait)">
      <image href="${panther}" x="-70" y="76" width="650" height="420" preserveAspectRatio="xMidYMid slice"/>
      <rect x="34" y="76" width="426" height="420" fill="url(#imageFade)"/>
      <rect x="34" y="-120" width="426" height="140" fill="url(#scan)" opacity=".8">
        <animate attributeName="y" values="-120;520" dur="5.6s" begin=".4s" repeatCount="indefinite"/>
      </rect>
      <path d="M55 463 H190 M55 451 V463 M448 90 H340 M448 90 V103" stroke="${theme.accent}" stroke-width="1.3" opacity=".8"/>
    </g>
    <rect x="34" y="76" width="426" height="420" rx="14" fill="none" stroke="${theme.border}" stroke-width="1.5"/>
    <rect x="52" y="94" width="132" height="25" rx="12.5" fill="${theme.panel}" fill-opacity=".82" stroke="${theme.accent2}"/>
    <circle cx="68" cy="106.5" r="3.5" fill="${theme.ok}" class="pulse"/>
    <text x="79" y="110" class="mono" font-size="9" font-weight="700" letter-spacing="1.1" fill="${theme.text}">SENTINEL / 01</text>
    <text x="55" y="456" class="mono" font-size="10" letter-spacing="1.25" fill="#b7cad2">BACKEND CONTROL ENTITY</text>
    <text x="55" y="478" class="mono" font-size="9" letter-spacing="1" fill="#81949d">RELIABILITY · PERFORMANCE · DELIVERY</text>
  </g>

  <rect x="484" y="76" width="682" height="420" rx="14" fill="${theme.panel}" fill-opacity=".9" stroke="${theme.border}"/>
  <text x="510" y="99" class="mono" font-size="9" font-weight="700" letter-spacing="1.5" fill="${theme.faint}">PRODUCTION DOSSIER / BOOT SEQUENCE</text>
  <text x="1139" y="99" text-anchor="end" class="mono" font-size="9" letter-spacing="1.1" fill="${theme.accent}">PID 31415</text>
  ${terminal}

  <g transform="translate(34 524)">
    ${statCard({ x: 0, width: 268, value: "150 ms", label: "SEARCH / P95", note: "PostgreSQL at catalog scale", theme, delay: "2.30" })}
    ${statCard({ x: 288, width: 268, value: "−70%", label: "MTTR", note: "Tracing, alerts and runbooks", theme, delay: "2.45" })}
    ${statCard({ x: 576, width: 268, value: "1M SKU", label: "CATALOG SCALE", note: "Search, BOM and media flows", theme, delay: "2.60" })}
    ${statCard({ x: 864, width: 268, value: "0 downtime", label: "RAG ROLLOUT", note: "Versioned knowledge bases", theme, delay: "2.75" })}
  </g>

  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".7s" begin="3s" fill="freeze"/>
    <text x="35" y="684" class="mono" font-size="10" letter-spacing="1.3" fill="${theme.muted}">HIGHLOAD / DISTRIBUTED SYSTEMS / FINTECH / AI &amp; RAG</text>
    <text x="1165" y="684" text-anchor="end" class="mono" font-size="10" letter-spacing="1.1" fill="${theme.accent}">OPEN TO INTERNATIONAL REMOTE + RELOCATION</text>
  </g>
</svg>`;
}

function mobileStatCard({ x, y, value, label, theme, delay }) {
  return `<g transform="translate(${x} ${y})" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".6s" begin="${delay}s" fill="freeze"/>
    <rect width="314" height="92" rx="12" fill="${theme.panel2}" stroke="${theme.borderSoft}"/>
    <rect width="3" height="92" rx="1.5" fill="${theme.accent}"/>
    <text x="20" y="38" class="sans" font-size="24" font-weight="780" fill="${theme.text}">${value}</text>
    <text x="20" y="64" class="mono" font-size="9.5" font-weight="700" letter-spacing="1.1" fill="${theme.accent}">${label}</text>
  </g>`;
}

function buildMobile(themeName) {
  const theme = themes[themeName];
  const lineDefs = clips(mobileLines, 55, 424, 29, 610, "mobileLine");
  const terminal = terminalLines(mobileLines, 55, 424, 29, "mobileLine", theme, true);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1090" viewBox="0 0 720 1090" role="img" aria-labelledby="title desc">
  <title id="title">Egor Solovyev — mobile production backend command center</title>
  <desc id="desc">Animated mobile engineering command center for a Senior C#/.NET Backend Engineer.</desc>
  <defs>
    <pattern id="mobileGrid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="${theme.grid}" stroke-width="1"/>
    </pattern>
    <linearGradient id="mobileFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${theme.imageOverlay}" stop-opacity=".02"/>
      <stop offset=".65" stop-color="${theme.imageOverlay}" stop-opacity=".08"/>
      <stop offset="1" stop-color="${theme.imageOverlay}" stop-opacity=".92"/>
    </linearGradient>
    <linearGradient id="mobileScan" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${theme.accent}" stop-opacity="0"/>
      <stop offset=".5" stop-color="${theme.accent}" stop-opacity=".34"/>
      <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="mobileFrame"><rect x="10" y="10" width="700" height="1070" rx="22"/></clipPath>
    <clipPath id="mobilePortrait"><rect x="28" y="66" width="664" height="300" rx="14"/></clipPath>
    <mask id="mobilePortraitReveal" x="28" y="66" width="664" height="300" maskUnits="userSpaceOnUse">
      <rect x="28" y="66" width="0" height="300" fill="#fff">
        <animate attributeName="width" from="0" to="664" dur="1.35s" begin=".12s" fill="freeze" calcMode="spline" keySplines=".22 .8 .24 1"/>
      </rect>
    </mask>
    ${lineDefs}
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .pulse { animation: pulse 2.8s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: .28; } 50% { opacity: 1; } }
    </style>
  </defs>

  <rect x="10" y="10" width="700" height="1070" rx="22" fill="${theme.bg}" stroke="${theme.border}" stroke-width="2"/>
  <g clip-path="url(#mobileFrame)">
    <rect x="10" y="10" width="700" height="1070" fill="url(#mobileGrid)" opacity=".44"/>
  </g>
  <rect x="10" y="10" width="700" height="42" rx="21" fill="${theme.panel}" stroke="${theme.border}"/>
  <circle cx="34" cy="31" r="4.5" fill="#ec5f67"/>
  <circle cx="51" cy="31" r="4.5" fill="#f4bf75"/>
  <circle cx="68" cy="31" r="4.5" fill="${theme.ok}"/>
  <text x="360" y="35" text-anchor="middle" class="mono" font-size="10.5" letter-spacing=".6" fill="${theme.muted}">ingaleee@production ~ ./profile --live</text>
  <circle cx="681" cy="31" r="3.7" fill="${theme.ok}" class="pulse"/>

  <g mask="url(#mobilePortraitReveal)">
    <g clip-path="url(#mobilePortrait)">
      <image href="${panther}" x="28" y="50" width="664" height="373.5" preserveAspectRatio="xMidYMid slice"/>
      <rect x="28" y="66" width="664" height="300" fill="url(#mobileFade)"/>
      <rect x="-80" y="66" width="150" height="300" fill="url(#mobileScan)">
        <animate attributeName="x" values="-100;760" dur="5.2s" begin=".3s" repeatCount="indefinite"/>
      </rect>
    </g>
    <rect x="28" y="66" width="664" height="300" rx="14" fill="none" stroke="${theme.border}"/>
    <rect x="46" y="84" width="139" height="25" rx="12.5" fill="${theme.panel}" fill-opacity=".84" stroke="${theme.accent2}"/>
    <circle cx="62" cy="96.5" r="3.5" fill="${theme.ok}" class="pulse"/>
    <text x="73" y="100" class="mono" font-size="9" font-weight="700" letter-spacing="1.1" fill="${theme.text}">SENTINEL / 01</text>
    <text x="50" y="330" class="mono" font-size="10" letter-spacing="1.2" fill="#b7cad2">BACKEND CONTROL ENTITY</text>
    <text x="50" y="350" class="mono" font-size="9" letter-spacing=".8" fill="#81949d">RELIABILITY · PERFORMANCE · DELIVERY</text>
  </g>

  <rect x="28" y="388" width="664" height="399" rx="14" fill="${theme.panel}" fill-opacity=".94" stroke="${theme.border}"/>
  <text x="55" y="410" class="mono" font-size="9" font-weight="700" letter-spacing="1.35" fill="${theme.faint}">PRODUCTION DOSSIER / BOOT SEQUENCE</text>
  <text x="665" y="410" text-anchor="end" class="mono" font-size="9" letter-spacing="1" fill="${theme.accent}">PID 31415</text>
  ${terminal}

  ${mobileStatCard({ x: 28, y: 811, value: "150 ms", label: "SEARCH / P95", theme, delay: "2.15" })}
  ${mobileStatCard({ x: 378, y: 811, value: "−70%", label: "MTTR", theme, delay: "2.30" })}
  ${mobileStatCard({ x: 28, y: 921, value: "1M SKU", label: "CATALOG SCALE", theme, delay: "2.45" })}
  ${mobileStatCard({ x: 378, y: 921, value: "0 downtime", label: "RAG ROLLOUT", theme, delay: "2.60" })}

  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".6s" begin="2.85s" fill="freeze"/>
    <text x="28" y="1044" class="mono" font-size="9.5" letter-spacing=".9" fill="${theme.muted}">HIGHLOAD / FINTECH / AI &amp; RAG</text>
    <text x="692" y="1044" text-anchor="end" class="mono" font-size="9.5" letter-spacing=".8" fill="${theme.accent}">GLOBAL REMOTE / RELOCATION</text>
  </g>
</svg>`;
}

await Promise.all([
  writeFile(new URL("../assets/command-center-dark.svg", import.meta.url), buildDesktop("dark"), "utf8"),
  writeFile(new URL("../assets/command-center-light.svg", import.meta.url), buildDesktop("light"), "utf8"),
  writeFile(new URL("../assets/command-center-mobile-dark.svg", import.meta.url), buildMobile("dark"), "utf8"),
  writeFile(new URL("../assets/command-center-mobile-light.svg", import.meta.url), buildMobile("light"), "utf8"),
]);

console.log("Built command center profile assets.");
