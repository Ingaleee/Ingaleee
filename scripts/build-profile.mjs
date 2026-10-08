import { mkdir, writeFile } from 'node:fs/promises';

const assets = new URL('../assets/', import.meta.url);
await mkdir(assets, { recursive: true });

function header({ light, mobile }) {
  const width = mobile ? 640 : 1200;
  const height = mobile ? 380 : 340;
  const p = light
    ? { bg: '#f3f6f4', ink: '#142c24', muted: '#52665f', line: '#c8d8cf', accent: '#16744f', panel: '#e6eee9' }
    : { bg: '#101a18', ink: '#f0f5f2', muted: '#9cafaa', line: '#2b433b', accent: '#a3e6c2', panel: '#172720' };
  const bird = `<g fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-91 23 L-45 6 L-15 12 L44-67 L28-10 L72-34 L48 11 L83 41 L22 24 L-8 42 L-39 26 L-65 38 L-54 20 Z" fill="${p.panel}" stroke="${p.accent}" stroke-width="2.4"/>
    <path d="M-45 6 L-8 42 L28-10 M-15 12 L48 11 L22 24 M22 24 L83 41 M-39 26 L-15 12" stroke="${p.accent}" stroke-opacity=".52" stroke-width="1.3"/>
    <circle cx="-44" cy="16" r="2.3" fill="${p.accent}" stroke="none"/>
  </g>`;
  const graphic = mobile ? '' : `<g transform="translate(998 147)">
    <circle r="107" fill="${p.panel}" fill-opacity=".35" stroke="${p.line}"/>
    <circle r="82" fill="none" stroke="${p.line}" stroke-dasharray="2 10"/>
    <path d="M-137 58 L-54-94 L63-100 L132 36 L41 106 Z" fill="none" stroke="${p.line}" stroke-width="1"/>
    <path d="M-151 56 H-118 M105-78 H142 M0-119 V-104 M0 107 V119" stroke="${p.accent}" stroke-opacity=".6"/>
    ${bird}
    <circle cx="-137" cy="58" r="3" fill="${p.accent}"/>
    <circle cx="63" cy="-100" r="3" fill="${p.accent}"/>
    <text x="0" y="136" text-anchor="middle" font-family="Consolas,monospace" font-size="11" letter-spacing="2" fill="${p.muted}">INGALEEE / NIGHTINGALE</text>
  </g>`;
  const dotGrid = Array.from({ length: 9 }, (_, y) => Array.from({ length: 12 }, (_, x) =>
    `<circle cx="${790 + x * 34}" cy="${25 + y * 34}" r="1" fill="${p.line}"/>`).join('')).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Egor Solovyev — backend and systems engineering</title>
  <desc id="desc">C#/.NET, distributed systems and reliable delivery. Geometric nightingale insignia.</desc>
  <rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="18" fill="${p.bg}" stroke="${p.line}"/>
  ${mobile ? '' : dotGrid}
  <rect x="${mobile ? 32 : 48}" y="38" width="25" height="4" rx="2" fill="${p.accent}"/>
  <text x="${mobile ? 69 : 88}" y="45" font-family="Consolas,monospace" font-size="13" letter-spacing="2.5" fill="${p.muted}">INGALEEE / ENGINEERING</text>
  ${mobile ? `
  <text x="32" y="128" font-family="Segoe UI,Arial,sans-serif" font-size="58" font-weight="700" letter-spacing="-2" fill="${p.ink}">Egor</text>
  <text x="32" y="191" font-family="Segoe UI,Arial,sans-serif" font-size="58" font-weight="700" letter-spacing="-2" fill="${p.ink}">Solovyev</text>
  <g transform="translate(504 137) scale(.8)">${bird}</g>
  <text x="32" y="237" font-family="Segoe UI,Arial,sans-serif" font-size="21" fill="${p.accent}">Backend &amp; systems engineering</text>
  <path d="M32 277 H608" stroke="${p.line}"/>
  <text x="32" y="311" font-family="Consolas,monospace" font-size="14" fill="${p.muted}">C# / .NET · DISTRIBUTED SYSTEMS</text>
  <text x="32" y="344" font-family="Consolas,monospace" font-size="14" fill="${p.muted}">CORRECTNESS · RECOVERY · DELIVERY</text>` : `
  <text x="48" y="136" font-family="Segoe UI,Arial,sans-serif" font-size="70" font-weight="700" letter-spacing="-2.5" fill="${p.ink}">Egor Solovyev</text>
  <text x="51" y="184" font-family="Segoe UI,Arial,sans-serif" font-size="25" fill="${p.accent}">Backend &amp; systems engineering</text>
  <text x="51" y="226" font-family="Segoe UI,Arial,sans-serif" font-size="20" fill="${p.muted}">Correctness under concurrency. Visibility in production.</text>
  <path d="M48 274 H754" stroke="${p.line}"/>
  <g font-family="Consolas,monospace" font-size="12" letter-spacing="1.3" fill="${p.muted}">
    <text x="48" y="308">C# / .NET</text>
    <text x="224" y="308">DISTRIBUTED SYSTEMS</text>
    <text x="524" y="308">RELIABLE DELIVERY</text>
  </g>
  <path d="M185 292 V314 M483 292 V314" stroke="${p.line}"/>
  ${graphic}`}
</svg>\n`;
}

for (const mobile of [false, true]) {
  for (const light of [false, true]) {
    const name = `profile-header-${mobile ? 'mobile-' : ''}${light ? 'light' : 'dark'}.svg`;
    const svg = header({ mobile, light });
    await writeFile(new URL(name, assets), svg);
    console.log(`${name}: ${Buffer.byteLength(svg)} bytes`);
  }
}
