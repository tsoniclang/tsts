// Committed checker-gate scaffolding (M5a). Stand-in for `@tsonic/core/lang.js`
// `attributes` builder used by the xunit decorator wiring at the bottom of
// *.test.ts files. The chain is A<T>().method(fn).add(Attr) — a no-op fluent
// surface so the module-level side effects don't throw under plain node.
export function attributes() {
  const api = {
    method() { return api; },
    add() { return api; },
  };
  return api;
}
