import { readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../assets/nightingale-flight-v9.webp", import.meta.url));
const nightingaleFlight = `data:image/webp;base64,${source.toString("base64")}`;

const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640" role="img" aria-labelledby="title desc">
  <title id="title">Egor Solovyev — Senior C#/.NET Backend Engineer</title>
  <desc id="desc">Professional profile hero for a backend engineer specializing in highload distributed systems, FinTech and AI/RAG.</desc>
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#080a0e" stop-opacity="1"/>
      <stop offset=".52" stop-color="#080a0e" stop-opacity=".94"/>
      <stop offset=".72" stop-color="#080a0e" stop-opacity=".26"/>
      <stop offset="1" stop-color="#080a0e" stop-opacity=".05"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#080a0e" stop-opacity="0"/>
      <stop offset="1" stop-color="#080a0e" stop-opacity=".92"/>
    </linearGradient>
    <linearGradient id="hairline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5ee5f7" stop-opacity=".9"/>
      <stop offset=".5" stop-color="#5ee5f7" stop-opacity=".12"/>
      <stop offset="1" stop-color="#5ee5f7" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset=".5" stop-color="#8eefff" stop-opacity=".12"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#000000" flood-opacity=".55"/>
    </filter>
    <linearGradient id="scanner" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#63e6f6" stop-opacity="0"/>
      <stop offset=".5" stop-color="#63e6f6" stop-opacity=".3"/>
      <stop offset="1" stop-color="#63e6f6" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="flightAmbient" cx="78%" cy="37%" r="45%">
      <stop offset="0" stop-color="#173441" stop-opacity=".72"/>
      <stop offset=".42" stop-color="#0d2029" stop-opacity=".28"/>
      <stop offset="1" stop-color="#080a0e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flightTrail" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0" stop-color="#63e6f6" stop-opacity="0"/>
      <stop offset=".35" stop-color="#63e6f6" stop-opacity=".32"/>
      <stop offset="1" stop-color="#63e6f6" stop-opacity=".02"/>
    </linearGradient>
    <pattern id="cockpitGrid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="#18222b" stroke-width="1"/>
    </pattern>
    <filter id="flightGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="13" flood-color="#000000" flood-opacity=".72"/>
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#56dbef" flood-opacity=".16"/>
    </filter>
    <mask id="copyReveal" maskUnits="userSpaceOnUse" x="-10" y="-80" width="630" height="410">
      <rect x="-10" y="-80" width="630" height="0" fill="#fff">
        <animate attributeName="height" from="0" to="410" dur="2.15s" begin=".55s" fill="freeze" calcMode="spline" keySplines=".22 .8 .24 1"/>
      </rect>
    </mask>
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .sweep { animation: sweep 8s ease-in-out infinite; }
      .pulse { animation: pulse 3.2s ease-in-out infinite; }
      .flight-dash { animation: flightDash 5.8s linear infinite; }
      @keyframes sweep { 0%, 22% { transform: translateX(-430px); opacity: 0; } 38% { opacity: .75; } 57%, 100% { transform: translateX(1150px); opacity: 0; } }
      @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: .95; } }
      @keyframes flightDash { to { stroke-dashoffset: -72; } }
    </style>
  </defs>

  <rect x="12" y="12" width="1176" height="616" rx="28" fill="#080a0e" filter="url(#shadow)"/>
  <clipPath id="clip"><rect x="12" y="12" width="1176" height="616" rx="28"/></clipPath>
  <g clip-path="url(#clip)">
    <rect x="12" y="12" width="1176" height="616" fill="#080a0e"/>
    <rect x="12" y="12" width="1176" height="616" fill="url(#cockpitGrid)" opacity=".36"/>
    <rect x="12" y="12" width="1176" height="616" fill="url(#flightAmbient)"/>
    <path d="M692 416C823 310 985 293 1178 326" fill="none" stroke="#253846" stroke-width="1.2" stroke-dasharray="4 12"/>
    <path d="M728 92C854 36 1031 43 1182 115" fill="none" stroke="#1d2a34" stroke-width="1"/>
    <circle cx="939" cy="246" r="178" fill="none" stroke="#223744" stroke-width="1" stroke-dasharray="2 10" opacity=".72"/>
    <circle cx="939" cy="246" r="142" fill="none" stroke="#1b2d37" stroke-width="1" opacity=".62"/>
    <g opacity=".78">
      <path class="flight-dash" d="M1180 236C1132 237 1083 246 1037 265" fill="none" stroke="url(#flightTrail)" stroke-width="2" stroke-dasharray="18 12"/>
      <path class="flight-dash" d="M1174 263C1120 262 1076 268 1031 284" fill="none" stroke="url(#flightTrail)" stroke-width="1" stroke-dasharray="12 16"/>
      <circle cx="1120" cy="250" r="3" fill="#63e6f6" class="pulse"/>
    </g>
    <g opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="1.15s" begin=".2s" fill="freeze"/>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;-13 -7;0 0;8 4;0 0" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1;.42 0 .58 1;.42 0 .58 1"/>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-1 925 250;1.2 925 250;-1 925 250" dur="7.2s" repeatCount="indefinite"/>
          <image href="${nightingaleFlight}" x="708" y="112" width="430" height="268" preserveAspectRatio="xMidYMid meet" filter="url(#flightGlow)"/>
        </g>
      </g>
    </g>
    <rect x="12" y="12" width="665" height="616" fill="url(#shade)"/>
    <rect x="12" y="388" width="1176" height="240" fill="url(#bottom)"/>
    <rect class="sweep" x="-420" y="12" width="360" height="616" fill="url(#sweep)" transform="skewX(-16)"/>
    <rect x="-250" y="12" width="250" height="616" fill="url(#scanner)" opacity=".55">
      <animate attributeName="x" values="-250;1200" dur="7.5s" begin=".2s" repeatCount="indefinite"/>
    </rect>
  </g>
  <rect x="12" y="12" width="1176" height="616" rx="28" fill="none" stroke="#2a303a" stroke-width="2"/>

  <g transform="translate(64 62)">
    <circle cx="5" cy="0" r="5" fill="#63e6f6" class="pulse"/>
    <text x="23" y="5" class="mono" font-size="13" letter-spacing="2" fill="#a5b0bd">INGALEE / SYSTEMS ENGINEER</text>
  </g>

  <g transform="translate(64 142)" mask="url(#copyReveal)">
    <text x="0" y="0" class="sans" font-size="58" font-weight="760" letter-spacing="-2" fill="#f7f9fc">EGOR SOLOVYEV</text>
    <text x="0" y="46" class="sans" font-size="23" font-weight="620" fill="#78e4f2">Senior C#/.NET Backend Engineer</text>
    <text x="0" y="96" class="sans" font-size="30" font-weight="520" fill="#dfe4ea">Systems that stay fast</text>
    <text x="0" y="132" class="sans" font-size="30" font-weight="520" fill="#dfe4ea">when everything gets noisy.</text>
    <text x="0" y="180" class="mono" font-size="14" letter-spacing=".7" fill="#9da8b5">HIGHLOAD  /  DISTRIBUTED SYSTEMS  /  FINTECH  /  AI &amp; RAG</text>
    <rect x="0" y="207" width="510" height="2" fill="url(#hairline)"/>
    <text x="0" y="245" class="sans" font-size="15" fill="#a9b2bd">Architecture · performance · reliability · technical delivery</text>
  </g>

  <g transform="translate(64 486)" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".8s" begin="2.35s" fill="freeze"/>
    <g>
      <text x="0" y="0" class="sans" font-size="29" font-weight="720" fill="#f7f9fc">150 ms</text>
      <text x="0" y="24" class="mono" font-size="10" letter-spacing="1.2" fill="#8793a1">SEARCH P95</text>
    </g>
    <g transform="translate(145 0)">
      <text x="0" y="0" class="sans" font-size="29" font-weight="720" fill="#f7f9fc">−70%</text>
      <text x="0" y="24" class="mono" font-size="10" letter-spacing="1.2" fill="#8793a1">MTTR</text>
    </g>
    <g transform="translate(276 0)">
      <text x="0" y="0" class="sans" font-size="29" font-weight="720" fill="#f7f9fc">4+ years</text>
      <text x="0" y="24" class="mono" font-size="10" letter-spacing="1.2" fill="#8793a1">PRODUCTION</text>
    </g>
    <g transform="translate(447 0)">
      <text x="0" y="0" class="sans" font-size="29" font-weight="720" fill="#f7f9fc">0</text>
      <text x="0" y="24" class="mono" font-size="10" letter-spacing="1.2" fill="#8793a1">DOWNTIME ROLLOUT</text>
    </g>
  </g>

  <text x="64" y="592" class="mono" font-size="11" letter-spacing="1" fill="#6f7a87">OPEN TO RELOCATION AND INTERNATIONAL REMOTE CONTRACTS</text>
  <g transform="translate(956 548)">
    <path d="M0 0H158M158 0V28" fill="none" stroke="#263944"/>
    <circle cx="0" cy="0" r="3" fill="#63e6f6" class="pulse"/>
    <text x="18" y="20" class="mono" font-size="9" letter-spacing="1.2" fill="#71808d">FLIGHT VECTOR / ACTIVE</text>
  </g>
  <text x="1013" y="592" class="mono" font-size="10" letter-spacing="1.4" fill="#7b8794">NIGHTINGALE / 09</text>
</svg>
`;

const impact = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="472" viewBox="0 0 1200 472" role="img" aria-labelledby="title desc">
  <title id="title">Engineering focus and production impact</title>
  <desc id="desc">A concise summary of Egor Solovyev's backend engineering expertise and measurable outcomes.</desc>
  <defs>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="#171c24" stroke-width="1"/>
    </pattern>
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    </style>
  </defs>

  <rect x="12" y="12" width="1176" height="448" rx="28" fill="#0b0e13" stroke="#282e38" stroke-width="2"/>
  <rect x="12" y="12" width="1176" height="448" rx="28" fill="url(#grid)" opacity=".5"/>

  <text x="52" y="61" class="mono" font-size="12" letter-spacing="2" fill="#74dce9">PROOF / NOT PROMISES</text>
  <text x="52" y="98" class="sans" font-size="27" font-weight="680" fill="#f2f5f8">Production engineering at the point where systems get difficult.</text>

  <line x1="52" y1="132" x2="1148" y2="132" stroke="#2b323d"/>
  <line x1="326" y1="132" x2="326" y2="282" stroke="#252b34"/>
  <line x1="600" y1="132" x2="600" y2="282" stroke="#252b34"/>
  <line x1="874" y1="132" x2="874" y2="282" stroke="#252b34"/>

  <g transform="translate(52 171)">
    <text x="0" y="0" class="sans" font-size="34" font-weight="740" fill="#f4f7fa">150 ms p95</text>
    <text x="0" y="34" class="sans" font-size="14" fill="#a1abb7">PostgreSQL search across</text>
    <text x="0" y="56" class="sans" font-size="14" fill="#a1abb7">large B2B catalogs</text>
  </g>
  <g transform="translate(356 171)">
    <text x="0" y="0" class="sans" font-size="34" font-weight="740" fill="#f4f7fa">−70% MTTR</text>
    <text x="0" y="34" class="sans" font-size="14" fill="#a1abb7">Observability, alerts,</text>
    <text x="0" y="56" class="sans" font-size="14" fill="#a1abb7">runbooks and tracing</text>
  </g>
  <g transform="translate(630 171)">
    <text x="0" y="0" class="sans" font-size="34" font-weight="740" fill="#f4f7fa">Zero downtime</text>
    <text x="0" y="34" class="sans" font-size="14" fill="#a1abb7">Versioned RAG knowledge</text>
    <text x="0" y="56" class="sans" font-size="14" fill="#a1abb7">base rollout and rollback</text>
  </g>
  <g transform="translate(904 171)">
    <text x="0" y="0" class="sans" font-size="34" font-weight="740" fill="#f4f7fa">Fault tolerant</text>
    <text x="0" y="34" class="sans" font-size="14" fill="#a1abb7">Payments, callbacks,</text>
    <text x="0" y="56" class="sans" font-size="14" fill="#a1abb7">retries and reconciliation</text>
  </g>

  <rect x="52" y="309" width="1096" height="111" rx="16" fill="#10151c" stroke="#252d37"/>
  <g transform="translate(76 340)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">RUNTIME</text>
    <text x="0" y="28" class="sans" font-size="15" fill="#dce2e8">C# · .NET 6—9 · ASP.NET Core</text>
  </g>
  <g transform="translate(332 340)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">ARCHITECTURE</text>
    <text x="0" y="28" class="sans" font-size="15" fill="#dce2e8">DDD · CQRS · Event-driven</text>
  </g>
  <g transform="translate(611 340)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">DATA</text>
    <text x="0" y="28" class="sans" font-size="15" fill="#dce2e8">PostgreSQL · SQL Server · Redis</text>
  </g>
  <g transform="translate(897 340)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">PLATFORM</text>
    <text x="0" y="28" class="sans" font-size="15" fill="#dce2e8">Kafka · Kubernetes · OTel</text>
  </g>
</svg>
`;

const mobileHero = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900" role="img" aria-labelledby="title desc">
  <title id="title">Egor Solovyev — Senior C#/.NET Backend Engineer</title>
  <desc id="desc">Mobile professional profile hero for a backend engineer specializing in highload distributed systems, FinTech and AI/RAG.</desc>
  <defs>
    <linearGradient id="imageShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#080a0e" stop-opacity=".02"/>
      <stop offset=".6" stop-color="#080a0e" stop-opacity=".2"/>
      <stop offset="1" stop-color="#080a0e" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5ee5f7" stop-opacity=".9"/>
      <stop offset="1" stop-color="#5ee5f7" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="mobileFlightAmbient" cx="72%" cy="24%" r="48%">
      <stop offset="0" stop-color="#173441" stop-opacity=".75"/>
      <stop offset=".48" stop-color="#0d2029" stop-opacity=".25"/>
      <stop offset="1" stop-color="#080a0e" stop-opacity="0"/>
    </radialGradient>
    <pattern id="mobileCockpitGrid" width="38" height="38" patternUnits="userSpaceOnUse">
      <path d="M38 0H0V38" fill="none" stroke="#18222b" stroke-width="1"/>
    </pattern>
    <filter id="mobileFlightGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="9" stdDeviation="12" flood-color="#000000" flood-opacity=".72"/>
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#56dbef" flood-opacity=".16"/>
    </filter>
    <mask id="mobileCopyReveal" maskUnits="userSpaceOnUse" x="35" y="380" width="650" height="280">
      <rect x="35" y="380" width="650" height="0" fill="#fff">
        <animate attributeName="height" from="0" to="280" dur="1.9s" begin=".5s" fill="freeze" calcMode="spline" keySplines=".22 .8 .24 1"/>
      </rect>
    </mask>
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
      .pulse { animation: pulse 3.2s ease-in-out infinite; }
      .mobile-dash { animation: mobileDash 5.4s linear infinite; }
      @keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: .95; } }
      @keyframes mobileDash { to { stroke-dashoffset: -64; } }
    </style>
  </defs>
  <rect x="12" y="12" width="696" height="876" rx="28" fill="#080a0e"/>
  <clipPath id="mobileClip"><rect x="12" y="12" width="696" height="876" rx="28"/></clipPath>
  <g clip-path="url(#mobileClip)">
    <rect x="12" y="12" width="696" height="480" fill="#080a0e"/>
    <rect x="12" y="12" width="696" height="480" fill="url(#mobileCockpitGrid)" opacity=".35"/>
    <rect x="12" y="12" width="696" height="480" fill="url(#mobileFlightAmbient)"/>
    <circle cx="482" cy="220" r="154" fill="none" stroke="#223744" stroke-width="1" stroke-dasharray="2 10" opacity=".72"/>
    <circle cx="482" cy="220" r="119" fill="none" stroke="#1b2d37" stroke-width="1" opacity=".62"/>
    <path class="mobile-dash" d="M692 204C650 204 614 211 579 225" fill="none" stroke="#63e6f6" stroke-opacity=".24" stroke-width="2" stroke-dasharray="16 12"/>
    <g opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="1.15s" begin=".15s" fill="freeze"/>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;-10 -6;0 0;7 4;0 0" dur="8.5s" repeatCount="indefinite" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1;.42 0 .58 1;.42 0 .58 1"/>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-1 483 222;1.2 483 222;-1 483 222" dur="7s" repeatCount="indefinite"/>
          <image href="${nightingaleFlight}" x="282" y="103" width="388" height="242" preserveAspectRatio="xMidYMid meet" filter="url(#mobileFlightGlow)"/>
        </g>
      </g>
    </g>
    <rect x="12" y="12" width="696" height="480" fill="url(#imageShade)"/>
  </g>
  <rect x="12" y="12" width="696" height="876" rx="28" fill="none" stroke="#2a303a" stroke-width="2"/>
  <circle cx="48" cy="49" r="5" fill="#63e6f6" class="pulse"/>
  <text x="67" y="54" class="mono" font-size="12" letter-spacing="2" fill="#a5b0bd">INGALEE / SYSTEMS ENGINEER</text>

  <g mask="url(#mobileCopyReveal)">
    <text x="42" y="445" class="sans" font-size="49" font-weight="760" letter-spacing="-1.4" fill="#f7f9fc">EGOR SOLOVYEV</text>
    <text x="42" y="485" class="sans" font-size="21" font-weight="620" fill="#78e4f2">Senior C#/.NET Backend Engineer</text>
    <text x="42" y="546" class="sans" font-size="30" font-weight="520" fill="#dfe4ea">Systems that stay fast</text>
    <text x="42" y="581" class="sans" font-size="30" font-weight="520" fill="#dfe4ea">when everything gets noisy.</text>
    <text x="42" y="625" class="mono" font-size="12" letter-spacing=".6" fill="#9da8b5">HIGHLOAD / DISTRIBUTED SYSTEMS / FINTECH / AI &amp; RAG</text>
    <rect x="42" y="649" width="486" height="2" fill="url(#line)"/>
  </g>

  <g transform="translate(42 711)" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur=".75s" begin="2.2s" fill="freeze"/>
    <g>
      <text x="0" y="0" class="sans" font-size="25" font-weight="720" fill="#f7f9fc">150 ms</text>
      <text x="0" y="22" class="mono" font-size="9" letter-spacing="1" fill="#8793a1">SEARCH P95</text>
    </g>
    <g transform="translate(145 0)">
      <text x="0" y="0" class="sans" font-size="25" font-weight="720" fill="#f7f9fc">−70%</text>
      <text x="0" y="22" class="mono" font-size="9" letter-spacing="1" fill="#8793a1">MTTR</text>
    </g>
    <g transform="translate(267 0)">
      <text x="0" y="0" class="sans" font-size="25" font-weight="720" fill="#f7f9fc">4+ years</text>
      <text x="0" y="22" class="mono" font-size="9" letter-spacing="1" fill="#8793a1">PRODUCTION</text>
    </g>
    <g transform="translate(446 0)">
      <text x="0" y="0" class="sans" font-size="25" font-weight="720" fill="#f7f9fc">0</text>
      <text x="0" y="22" class="mono" font-size="9" letter-spacing="1" fill="#8793a1">DOWNTIME</text>
    </g>
  </g>
  <text x="42" y="831" class="mono" font-size="10" letter-spacing=".8" fill="#6f7a87">OPEN TO RELOCATION AND INTERNATIONAL REMOTE CONTRACTS</text>
</svg>
`;

const mobileImpact = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="940" viewBox="0 0 720 940" role="img" aria-labelledby="title desc">
  <title id="title">Engineering focus and production impact</title>
  <desc id="desc">Mobile summary of Egor Solovyev's backend engineering expertise and measurable outcomes.</desc>
  <defs>
    <pattern id="mobileGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" fill="none" stroke="#171c24" stroke-width="1"/>
    </pattern>
    <style>
      .sans { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    </style>
  </defs>
  <rect x="12" y="12" width="696" height="916" rx="28" fill="#0b0e13" stroke="#282e38" stroke-width="2"/>
  <rect x="12" y="12" width="696" height="916" rx="28" fill="url(#mobileGrid)" opacity=".5"/>
  <text x="42" y="61" class="mono" font-size="12" letter-spacing="2" fill="#74dce9">PROOF / NOT PROMISES</text>
  <text x="42" y="101" class="sans" font-size="27" font-weight="680" fill="#f2f5f8">Production engineering where</text>
  <text x="42" y="134" class="sans" font-size="27" font-weight="680" fill="#f2f5f8">systems get difficult.</text>

  <g transform="translate(42 180)">
    <rect width="304" height="170" rx="16" fill="#10151c" stroke="#252d37"/>
    <text x="22" y="52" class="sans" font-size="31" font-weight="740" fill="#f4f7fa">150 ms p95</text>
    <text x="22" y="91" class="sans" font-size="14" fill="#a1abb7">PostgreSQL search across</text>
    <text x="22" y="115" class="sans" font-size="14" fill="#a1abb7">large B2B catalogs</text>
  </g>
  <g transform="translate(374 180)">
    <rect width="304" height="170" rx="16" fill="#10151c" stroke="#252d37"/>
    <text x="22" y="52" class="sans" font-size="31" font-weight="740" fill="#f4f7fa">−70% MTTR</text>
    <text x="22" y="91" class="sans" font-size="14" fill="#a1abb7">Observability, alerts,</text>
    <text x="22" y="115" class="sans" font-size="14" fill="#a1abb7">runbooks and tracing</text>
  </g>
  <g transform="translate(42 378)">
    <rect width="304" height="170" rx="16" fill="#10151c" stroke="#252d37"/>
    <text x="22" y="52" class="sans" font-size="29" font-weight="740" fill="#f4f7fa">Zero downtime</text>
    <text x="22" y="91" class="sans" font-size="14" fill="#a1abb7">Versioned RAG rollout</text>
    <text x="22" y="115" class="sans" font-size="14" fill="#a1abb7">and rapid rollback</text>
  </g>
  <g transform="translate(374 378)">
    <rect width="304" height="170" rx="16" fill="#10151c" stroke="#252d37"/>
    <text x="22" y="52" class="sans" font-size="29" font-weight="740" fill="#f4f7fa">Fault tolerant</text>
    <text x="22" y="91" class="sans" font-size="14" fill="#a1abb7">Payments, callbacks,</text>
    <text x="22" y="115" class="sans" font-size="14" fill="#a1abb7">retries and reconciliation</text>
  </g>

  <text x="42" y="608" class="mono" font-size="11" letter-spacing="1.4" fill="#73808d">ENGINEERING SYSTEM</text>
  <g transform="translate(42 644)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">RUNTIME</text>
    <text x="174" y="0" class="sans" font-size="16" fill="#dce2e8">C# · .NET 6—9 · ASP.NET Core</text>
    <line x1="0" y1="28" x2="636" y2="28" stroke="#252d37"/>
  </g>
  <g transform="translate(42 704)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">ARCHITECTURE</text>
    <text x="174" y="0" class="sans" font-size="16" fill="#dce2e8">DDD · CQRS · Event-driven</text>
    <line x1="0" y1="28" x2="636" y2="28" stroke="#252d37"/>
  </g>
  <g transform="translate(42 764)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">DATA</text>
    <text x="174" y="0" class="sans" font-size="16" fill="#dce2e8">PostgreSQL · SQL Server · Redis</text>
    <line x1="0" y1="28" x2="636" y2="28" stroke="#252d37"/>
  </g>
  <g transform="translate(42 824)">
    <text x="0" y="0" class="mono" font-size="10" letter-spacing="1.2" fill="#73808d">PLATFORM</text>
    <text x="174" y="0" class="sans" font-size="16" fill="#dce2e8">Kafka · Kubernetes · OpenTelemetry</text>
  </g>
</svg>
`;

await writeFile(new URL("../assets/professional-hero-v9.svg", import.meta.url), hero, "utf8");
await writeFile(new URL("../assets/professional-impact.svg", import.meta.url), impact, "utf8");
await writeFile(new URL("../assets/professional-hero-mobile-v9.svg", import.meta.url), mobileHero, "utf8");
await writeFile(new URL("../assets/professional-impact-mobile.svg", import.meta.url), mobileImpact, "utf8");
console.log("Built professional profile assets.");
