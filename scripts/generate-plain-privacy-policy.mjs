import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const sourcePath = path.join(outDir, "privacy.html");
const htmlPath = path.join(outDir, "privacy-policy.html");
const indexDir = path.join(outDir, "privacy-policy");
const indexPath = path.join(indexDir, "index.html");

const scriptPattern = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const hiddenFlightPattern = /<div hidden="">[\s\S]*?<\/div>/i;

const source = await readFile(sourcePath, "utf8");

const generated = source
  .replace(scriptPattern, "")
  .replace(hiddenFlightPattern, "")
  .replace(
    /<head>/i,
    '<head><meta name="robots" content="noindex"><meta name="eczemate-policy-source" content="/privacy">',
  )
  .replace(
    /<title>[^<]*<\/title>/i,
    "<title>Privacy Policy - Eczemate</title>",
  );

await mkdir(indexDir, { recursive: true });
await writeFile(htmlPath, generated);
await writeFile(indexPath, generated);

console.log("Generated plain privacy policy mirror from out/privacy.html");
