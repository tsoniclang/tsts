// Committed checker-gate scaffolding (M5a). A node module-resolution hook that
// remaps the three xunit/tsonic specifiers used by checker.test.ts to local
// no-op/assertion shims so the compiled jsout probe imports cleanly under plain
// node.
export async function resolve(specifier, context, next) {
  if (specifier === "xunit-types/Xunit.js") {
    return next(new URL("./xunit-shim.mjs", import.meta.url).href, context);
  }
  if (specifier === "@tsonic/core/lang.js") {
    return next(new URL("./lang-shim.mjs", import.meta.url).href, context);
  }
  if (specifier === "@tsonic/dotnet/System.js") {
    return next(new URL("./system-shim.mjs", import.meta.url).href, context);
  }
  return next(specifier, context);
}
