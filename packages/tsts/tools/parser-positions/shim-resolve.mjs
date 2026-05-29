// Committed test scaffolding (wave 4b-prep). A node module-resolution hook that
// remaps the three xunit/tsonic specifiers used by *.test.ts files to the local
// no-op shims so the compiled jsout probes import cleanly under plain node.
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
