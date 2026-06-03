/**
 * Diagnostic message catalog and emission infrastructure.
 *
 * Mirrors TS-Go internal/diagnostics/.
 *
 * Status: types in place; message catalog generation pending.
 *
 * The TS-Go diagnostic system has two source files:
 *   - Upstream TypeScript: src/compiler/diagnosticMessages.json
 *     (~9500 messages, codes 1001-9999)
 *   - TS-Go-specific: internal/diagnostics/extraDiagnosticMessages.json
 *     (codes 100000+; vendored at _vendor/tsgo/extraDiagnosticMessages.json)
 *
 * Both are JSON; TS-Go's generate.go produces diagnostics_generated.go from
 * them. TSTS will produce messages.generated.ts via tools/generateDiagnostics.ts
 * (forthcoming).
 *
 * The upstream diagnosticMessages.json requires the upstream TypeScript
 * submodule to be initialized (see _submodules/TypeScript). Until then,
 * only extraDiagnosticMessages.json is consumable.
 */

export type { Diagnostic, DiagnosticMessage, Key, SourceFileSlim } from "./types.js";
export {
  categoryName,
  format,
  localize,
  localizeMessage,
  messageCategory,
  messageCode,
  messageElidedInCompatibilityPyramid,
  messageKey,
  messageReportsDeprecated,
  messageReportsUnnecessary,
  messageString,
  stringifyArgs,
  type Locale,
  type LocaleMessages,
  type LocaleProvider,
} from "./diagnostics.js";
