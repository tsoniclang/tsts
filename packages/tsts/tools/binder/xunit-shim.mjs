// Committed binder-gate scaffolding (M4b). Stand-in for `xunit-types/Xunit.js`
// so the compiled binder.test.js Fact suite runs under plain node. Extends the
// parser-positions shim surface with NotNull / Null (the binder probes assert
// on optional symbol-table slots). Assert.Equal compares via JSON.stringify.
export const Assert = {
  True(condition, userMessage) {
    if (condition !== true) throw new Error("Assert.True failed: " + (userMessage ?? JSON.stringify(condition)));
  },
  False(condition, userMessage) {
    if (condition !== false) throw new Error("Assert.False failed: " + (userMessage ?? JSON.stringify(condition)));
  },
  Equal(expected, actual) {
    const e = JSON.stringify(expected);
    const a = JSON.stringify(actual);
    if (e !== a) throw new Error("Assert.Equal failed: expected " + e + " actual " + a);
  },
  NotEqual(expected, actual) {
    if (JSON.stringify(expected) === JSON.stringify(actual)) throw new Error("Assert.NotEqual failed");
  },
  NotNull(value, userMessage) {
    if (value === undefined || value === null) throw new Error("Assert.NotNull failed: " + (userMessage ?? "value was null/undefined"));
  },
  Null(value, userMessage) {
    if (value !== undefined && value !== null) throw new Error("Assert.Null failed: " + (userMessage ?? JSON.stringify(value)));
  },
  Same(expected, actual, userMessage) {
    if (expected !== actual) throw new Error("Assert.Same failed: " + (userMessage ?? "references differ"));
  },
};
export class FactAttribute {}
