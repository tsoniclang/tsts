// Committed test scaffolding (wave 4b-prep). Minimal stand-in for
// `xunit-types/Xunit.js` so the compiled *.test.js position/parity probes run
// under plain node. Assert.Equal compares via JSON.stringify (the probes only
// assert numbers, strings, and Kind enum values). See run-parser-positions.mjs.
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
};
export class FactAttribute {}
