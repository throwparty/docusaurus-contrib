import path from "node:path";
import { fileURLToPath } from "node:url";
import type { LoadContext, Plugin } from "@docusaurus/types";

export default function themeThrowparty(_context: LoadContext): Plugin {
  // dist/ in the compiled package; theme components live in dist/theme/,
  // sources (for swizzle in TS mode) in src/theme/, stylesheet at the root.
  const themeDir = path.dirname(fileURLToPath(import.meta.url));

  return {
    name: "@throwparty/docusaurus-theme",
    getThemePath: () => path.join(themeDir, "theme"),
    getTypeScriptThemePath: () => path.join(themeDir, "../src/theme"),
    getClientModules: () => [path.join(themeDir, "..", "styles.css")],
  };
}
