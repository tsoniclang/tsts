// `node --import ./tools/register.mjs` entry point: installs a synchronous
// `.js` -> `.ts` resolution hook so the AST tools run under Node's native
// TypeScript stripping without any out-of-tree loader files.
//
// The tools follow the repo's NodeNext convention and import siblings with a
// `.js` extension (e.g. `import ... from "./schema.js"`), but the on-disk files
// are `.ts`. Node's type stripping does not remap `.js` -> `.ts`, so this hook
// redirects a relative `.js` specifier to its `.ts` sibling when one exists.
// Anything else falls through unchanged.
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if ((specifier.startsWith("./") || specifier.startsWith("../")) && specifier.endsWith(".js")) {
      const tsSpecifier = specifier.replace(/\.js$/, ".ts");
      try {
        const candidate = new URL(tsSpecifier, context.parentURL);
        if (existsSync(fileURLToPath(candidate))) {
          return nextResolve(tsSpecifier, context);
        }
      } catch {
        // fall through to default resolution
      }
    }
    return nextResolve(specifier, context);
  },
});
