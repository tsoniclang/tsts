/**
 * Format engine.
 *
 * Port of TS-Go `internal/format/`. The formatter takes a source file
 * and a range and produces text changes that re-indent / re-space the
 * code according to user settings.
 *
 * Current scope:
 *   - `api.ts`: public entry points (formatDocument, formatSelection,
 *     formatOnEnter, etc.) and the FormatRequestKind enum-equivalent.
 *
 * Forthcoming (mirrors TS-Go file layout):
 *   - `context.ts` (port of context.go)
 *   - `rule.ts` (port of rule.go)
 *   - `rulecontext.ts` (port of rulecontext.go)
 *   - `rules.ts` (port of rules.go)
 *   - `rulesmap.ts` (port of rulesmap.go)
 *   - `scanner.ts` (port of scanner.go)
 *   - `span.ts` (port of span.go)
 *   - `indent.ts` (port of indent.go)
 *   - `util.ts` (port of util.go)
 *   - Tests (api/comment/format/indent/indent_getindentation)
 */

export * from "./api.js";
