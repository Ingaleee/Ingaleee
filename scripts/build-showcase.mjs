import { readFile, writeFile } from "node:fs/promises";

const bird = `data:image/png;base64,${(await readFile(new URL("../assets/nightingale-flight-still-v17.png", import.meta.url))).toString("base64")}`;
const colors = { bg: "#080f16", panel: "#0c1620", line: "#263947", text: "#f0f6fc", muted: "#a0b4c3", cyan: "#64dcec" };
const esc = (text) => String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const icons = {
  bolt: '<path d="m14 2-9 12h7l-2 8 9-12h-7z"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10M7 4.8l9 5"/>',
  nodes: '<circle cx="12" cy="4" r="3"/><circle cx="4" cy="19" r="3"/><circle cx="20" cy="19" r="3"/><path d="m10.5 7-5 9m8-9 5 9M7 19h10"/>',
  chart: '<path d="M4 20V12M12 20V7M20 20V2"/>',
  code: '<path d="m7 6-5 6 5 6m10-12 5 6-5 6m-3-15-4 18"/>',
  cart: '<path d="M2 3h3l3 13h12l2-9H6"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 9-9m-5 0h5v5"/>',
  gear: '<circle cx="12" cy="12" r="4"/><path d="m9 3 1-2h4l1 2 3 2 2-.5 2 3-1 2v3l1 2-2 3-2-.5-3 2-1 2h-4l-1-2-3-2-2 .5-2-3 1-2v-3l-1-2 2-3 2 .5z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m3 6 9 7 9-7"/>',
  send: '<path d="m22 2-7 20-4-9-9-4zM11 13 22 2"/>',
  git: '<path d="m12 3-9 9 9 9 9-9zM9 6l6 6v5M9 6v6"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>',
  repo: '<rect x="4" y="2" width="16" height="18" rx="2"/><path d="M4 16h16M8 6h8M8 10h6M8 20v3l3-2 3 2v-3"/>'
};
function icon(name, x, y, size = 28) {
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${colors.cyan}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</g>`;
}
function svg(width, height, title, body, extra = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(title)}</desc><defs><style>.sans{font-family:Arial,Helvetica,sans-serif}.mono{font-family:Consolas,Menlo,monospace}</style>${extra}</defs>${body}</svg>`;
}
function text(x, y, value, size = 20, color = colors.text, weight = 400, font = "sans", extra = "") {
  return `<text x="${x}" y="${y}" class="${font}" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${esc(value)}</text>`;
}
function panel(x, y, width, height, radius = 18) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${colors.bg}" stroke="${colors.line}" stroke-width="2"/>`;
}
function hero(mobile, still) {
  const width = mobile ? 720 : 1200;
  const height = mobile ? 700 : 432;
  const birdX = mobile ? 145 : 685;
  const birdY = mobile ? 365 : 94;
  const birdWidth = mobile ? 500 : 475;
  const birdHeight = mobile ? 317 : 302;
  const cx = mobile ? 395 : 925;
  const cy = mobile ? 515 : 225;
  const motion = still ? "" : '<animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="4.8s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>';
  let body = panel(2, 2, width - 4, height - 4, 24);
  body += `<rect x="3" y="3" width="${width - 6}" height="${height - 6}" rx="23" fill="url(#ambient)"/>`;
  body += `<g stroke="${colors.line}" fill="none" opacity=".7"><circle cx="${cx}" cy="${cy}" r="174"/><circle cx="${cx}" cy="${cy}" r="146"/><path d="M${cx - 194} ${cy}H${cx + 194}M${cx} ${cy - 192}V${cy + 192}" stroke-dasharray="2 11"/></g>`;
  body += `<g>${motion}<image href="${bird}" x="${birdX}" y="${birdY}" width="${birdWidth}" height="${birdHeight}" preserveAspectRatio="xMidYMid meet"/></g>`;
  body += `<circle cx="48" cy="43" r="3" fill="${colors.cyan}"/>`;
  body += text(61, 48, "INGALEEE / SYSTEMS ENGINEER", mobile ? 15 : 12, colors.muted, 600, "mono", 'letter-spacing="1.4"');
  body += text(42, mobile ? 113 : 128, "EGOR SOLOVYEV", mobile ? 57 : 61, colors.text, 800, "sans", 'letter-spacing="-1.5"');
  body += text(44, mobile ? 158 : 174, "Senior C#/.NET Backend Engineer", mobile ? 26 : 25, colors.cyan, 600);
  body += text(44, mobile ? 224 : 239, "Systems that stay fast", mobile ? 31 : 30, colors.text, 500);
  body += text(44, mobile ? 266 : 281, "when everything gets noisy.", mobile ? 31 : 30, colors.text, 500);
  body += `<path d="M44 ${mobile ? 300 : 316}H${mobile ? 668 : 647}" stroke="${colors.line}"/>`;
  if (mobile) {
    body += text(44, 332, "HIGH-LOAD / DISTRIBUTED SYSTEMS / FINTECH", 17, colors.cyan, 500, "mono");
    body += text(44, 360, "AI & RAG / PERFORMANCE / RELIABILITY", 17, colors.muted, 500, "mono");
  } else {
    body += text(44, 349, "HIGH-LOAD · DISTRIBUTED SYSTEMS · FINTECH · AI & RAG", 13, colors.cyan, 600, "mono");
    body += text(44, 389, "Architecture · performance · reliability · technical delivery", 16, colors.muted);
    body += text(1023, 65, "RELIABLE", 11, colors.cyan, 500, "mono", 'letter-spacing="1.5"');
    body += text(1023, 84, "SCALABLE", 11, colors.muted, 500, "mono", 'letter-spacing="1.5"');
    body += text(1023, 103, "OBSERVABLE", 11, colors.muted, 500, "mono", 'letter-spacing="1.5"');
  }
  return svg(width, height, "Egor Solovyev — Senior C#/.NET Backend Engineer. Systems that stay fast when everything gets noisy.", body,
    `<radialGradient id="ambient" cx="76%" cy="47%" r="58%"><stop offset="0" stop-color="#12303d" stop-opacity=".6"/><stop offset="1" stop-color="${colors.bg}" stop-opacity="0"/></radialGradient>`);
}
function metrics(mobile) {
  const entries = [
    ["bolt", "150 ms", "Search p95", "100K–1M SKU"],
    ["shield", "−70%", "MTTR", "Tracing · alerts · runbooks"],
    ["clock", "4+ years", "Production experience", "High-load · distributed systems"],
    ["layers", "0 downtime", "Knowledge base rollouts", "Versioned AI / RAG"]
  ];
  let body = "";
  const width = mobile ? 720 : 1200;
  const cardW = mobile ? 346 : 285;
  const cardH = mobile ? 214 : 168;
  entries.forEach(([i, value, label, note], index) => {
    const x = mobile ? (index % 2) * 370 : index * 305;
    const y = mobile ? Math.floor(index / 2) * 238 : 0;
    body += panel(x + 2, y + 2, cardW, cardH, 16);
    body += icon(i, x + 25, y + 21, 29);
    body += text(x + 25, y + 91, value, mobile ? 39 : 35, colors.text, 700);
    if (mobile) {
      const labels = index === 3 ? ["Knowledge base", "rollouts"] : [label];
      labels.forEach((line, row) => body += text(x + 25, y + 126 + row * 30, line, 28, colors.muted, 500));
      body += text(x + 25, y + 193, index === 2 ? "High-load · distributed" : note, 20, colors.cyan);
    } else {
      body += text(x + 25, y + 123, label, 18, colors.muted, 500);
      body += text(x + 25, y + 153, note, 13, colors.cyan);
    }
  });
  return svg(width, mobile ? 456 : 172, "Search p95 150 ms at 100K–1M SKU; MTTR −70%; 4+ years in production; zero-downtime AI/RAG rollouts.", body);
}
const projects = [
  ["mesh", "box", "MESH Showcase", "Ruby · Rails · Next.js · PostgreSQL", ["Creator marketplace with payment simulation,", "idempotent integrations and recovery exercises."], "FEATURED"],
  ["fusionops", "nodes", "FusionOps", "C# · .NET · EventStoreDB · PostgreSQL", ["Resource allocation, event-based audit,", "outbox delivery and read-model projections."], "EVENTS"],
  ["market", "chart", "Market Tick Ingestion", "C# · .NET 10 · PostgreSQL", ["Three simulated WebSocket feeds; bounded", "queues, reconnects, deduplication and batches."], "REAL-TIME"],
  ["mplx", "code", "MPLX", "C++20 · Compiler · Bytecode VM · .NET", ["Language tooling and a bytecode virtual", "machine with a stable .NET interop boundary."], "LANGUAGE"],
  ["trusthub", "shield", "TrustHub", "Go · PostgreSQL · Redis · OpenSearch · TON", ["TON escrow with Tact contracts, arbitration,", "reputation and on-chain acknowledgements."], "ESCROW"],
  ["aiti", "cart", "Aiti Guru backend", "Python · FastAPI · PostgreSQL · Redis", ["Commerce and logistics API; transactional", "stock updates and order management."], "COMMERCE"]
];
function projectCard([slug, i, name, stack, lines, tag]) {
  let body = panel(2, 2, 556, 230);
  body += icon(i, 24, 25, 31);
  body += text(70, 48, name, name.length > 19 ? 23 : 25, colors.text, 700);
  body += text(26, 87, tag, 11, colors.cyan, 600, "mono", 'letter-spacing="1.6"');
  lines.forEach((line, index) => body += text(26, 126 + index * 29, line, 21, colors.muted));
  body += `<path d="M26 179H534" stroke="${colors.line}"/>`;
  body += text(26, 210, stack, slug === "trusthub" ? 16 : 17, colors.cyan, 500);
  return svg(560, 234, `${name} — ${lines.join(" ")} ${stack}.`, body);
}
const mobileProjects = {
  mesh: [["MESH", "Showcase"], ["Creator market.", "Payment flows,", "safe retries", "and recovery."], ["Ruby · Rails", "Next.js", "PostgreSQL"]],
  fusionops: [["FusionOps"], ["Resource", "allocation,", "outbox and", "projections."], ["C# · .NET", "EventStoreDB", "PostgreSQL"]],
  market: [["Market Tick", "Ingestion"], ["Market feeds.", "Bounded queues,", "reconnects and", "batch writes."], ["C# · .NET 10", "PostgreSQL"]],
  mplx: [["MPLX"], ["C++ compiler,", "bytecode VM", "and .NET", "interop."], ["C++20", "Bytecode VM", ".NET interop"]],
  trusthub: [["TrustHub"], ["TON escrow.", "Tact contracts,", "arbitration", "and reputation."], ["Go · TON", "Tact · Redis", "PostgreSQL"]],
  aiti: [["Aiti Guru", "backend"], ["Commerce API.", "Stock updates,", "orders and", "logistics."], ["Python", "FastAPI · Redis", "PostgreSQL"]]
};
function mobileProjectCard([slug, i, name, stack, lines, tag]) {
  const [titleLines, summaryLines, stackLines] = mobileProjects[slug];
  let body = panel(2, 2, 276, 468, 16);
  body += icon(i, 24, 23, 33);
  titleLines.forEach((line, index) => body += text(24, 96 + index * 36, line, 30, colors.text, 700));
  body += text(24, 171, tag, 20, colors.cyan, 600, "mono", 'letter-spacing="1"');
  summaryLines.forEach((line, index) => body += text(24, 213 + index * 33, line, 28, colors.muted));
  body += `<path d="M24 336H256" stroke="${colors.line}"/>`;
  stackLines.forEach((line, index) => body += text(24, 379 + index * 32, line, 26, colors.cyan, 500));
  return svg(280, 472, `${name} — ${lines.join(" ")} ${stack}.`, body);
}
const principles = [
  ["shield", "Reliability by design", ["Plan for partial failures, observability", "and graceful degradation."]],
  ["bolt", "Performance with evidence", ["Measure, profile and optimize.", "Use data to guide decisions."]],
  ["nodes", "Pragmatic architecture", ["Simple, maintainable solutions", "that solve real problems."]],
  ["gear", "Production ownership", ["From design and deployment to", "monitoring and incident resolution."]]
];
function principlesGrid(mobile) {
  let body = "";
  principles.forEach(([i, title, lines], index) => {
    const cardW = mobile ? 716 : 285;
    const x = mobile ? 0 : index * 305;
    const y = mobile ? index * 220 : 0;
    body += panel(x + 2, y + 2, cardW, mobile ? 196 : 202, 16);
    body += icon(i, x + 22, y + 21, mobile ? 42 : 31);
    body += text(x + (mobile ? 84 : 22), y + (mobile ? 55 : 86), title, mobile ? 34 : 18, colors.text, 700);
    const desktopLines = index === 0 ? ["Plan for partial failures,", "observability and graceful", "degradation."] : index === 3 ? ["From design and deployment", "to monitoring and incident", "resolution."] : lines;
    (mobile ? lines : desktopLines).forEach((line, row) => body += text(x + 22, y + (mobile ? 117 : 126) + row * (mobile ? 41 : 26), line, mobile ? 30 : 16, colors.muted));
  });
  return svg(mobile ? 720 : 1200, mobile ? 858 : 206, principles.map(([, t, lines]) => `${t}: ${lines.join(" ")}`).join(" "), body);
}
function button(label, i, emphasis) {
  return svg(210, 54, label, `<rect x="1" y="1" width="208" height="52" rx="9" fill="${emphasis ? "#102635" : colors.bg}" stroke="${emphasis ? "#36738c" : colors.line}" stroke-width="2"/>${icon(i, 15, 15, 24)}${text(51, 34, label, 18, colors.text, 600)}`);
}
const files = {
  "profile-hero-v17.svg": hero(false, false),
  "profile-hero-mobile-v17.svg": hero(true, false),
  "profile-hero-still-v17.svg": hero(false, true),
  "profile-hero-mobile-still-v17.svg": hero(true, true),
  "profile-metrics-v17.svg": metrics(false),
  "profile-metrics-mobile-v17.svg": metrics(true),
  "profile-principles-v17.svg": principlesGrid(false),
  "profile-principles-mobile-v17.svg": principlesGrid(true),
  "contact-email.svg": button("Email", "mail", true),
  "contact-telegram.svg": button("Telegram", "send", true),
  "contact-gitlab.svg": button("GitLab", "git", false),
  "contact-repositories.svg": button("Repositories", "repo", false),
  "contact-projects.svg": button("Projects & Code", "code", false),
  ...Object.fromEntries(projects.flatMap((project) => [
    [`project-${project[0]}-v17.svg`, projectCard(project)],
    [`project-${project[0]}-mobile-v17.svg`, mobileProjectCard(project)]
  ]))
};
await Promise.all(Object.entries(files).map(([name, contents]) => writeFile(new URL(`../assets/${name}`, import.meta.url), contents, "utf8")));
console.log(`Built ${Object.keys(files).length} profile showcase assets. Bird motion uses continuous SVG transforms; all copy is visible from the first frame.`);
