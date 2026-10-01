import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `..`);
const client = path.join(root, `dist/client`);
if (!existsSync(path.join(client, `index.html`))) throw new Error(`Production index.html is missing`);
const assets = path.join(root, `assets`);
if (existsSync(assets)) rmSync(assets, { recursive: true });
mkdirSync(assets, { recursive: true });
for (const name of readdirSync(client)) {
  if (name === `qa-mobile.html`) continue;
  cpSync(path.join(client, name), path.join(root, name), { recursive: true });
}
writeFileSync(path.join(root, `.nojekyll`), ``);
console.log(`Exported production website to repository root for GitHub Pages.`);
