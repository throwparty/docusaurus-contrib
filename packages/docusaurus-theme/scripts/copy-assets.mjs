import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(packageRoot, "src");
const outDir = path.join(packageRoot, "dist");

async function copyDir(relPath = "") {
  const dir = path.join(srcDir, relPath);
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const entryRel = path.join(relPath, entry.name);
    if (entry.isDirectory()) {
      await copyDir(entryRel);
    } else if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".tsx")) {
      const target = path.join(outDir, entryRel);
      await mkdir(path.dirname(target), { recursive: true });
      await copyFile(path.join(dir, entry.name), target);
    }
  }
}

await copyDir();
