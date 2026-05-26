/**
 * tsconfig / command-line option parsing.
 *
 * Port of TS-Go `internal/tsoptions/`. Provides parsing of tsconfig
 * JSON files, `tsc` CLI arguments, and the option declaration tables.
 *
 * Current scope (committed in stages):
 *   - `commandlineoption.ts`: option declaration type
 *   - `namemap.ts`: case-insensitive name lookup with short-name aliases
 *   - `diagnostics.ts`: parser diagnostic context types
 *   - `parsedbuildcommandline.ts`: --build CLI result type
 *   - `wildcarddirectories.ts`: include/exclude → watch-dir analysis
 *
 * Forthcoming (mirrors TS-Go file layout):
 *   - `commandlineparser.ts` (commandlineparser.go, ~480 LoC)
 *   - `parsedcommandline.ts` (parsedcommandline.go, 409 LoC)
 *   - `parsinghelpers.ts` (parsinghelpers.go, 631 LoC)
 *   - `tsconfigparsing.ts` (tsconfigparsing.go, 1792 LoC)
 *   - `enummaps.ts` (enummaps.go, 255 LoC)
 *   - `showconfig.ts` (showconfig.go, 389 LoC)
 *   - `errors.ts` (errors.go, 105 LoC — depends on diagnostics catalog)
 *   - Option declaration tables (decls*.go, ~3500 LoC of static data)
 */

export * from "./commandlineoption.js";
export * from "./diagnostics.js";
export * from "./namemap.js";
export * from "./parsedbuildcommandline.js";
export * from "./wildcarddirectories.js";
