/**
 * Command-line option declaration type.
 *
 * Port surface for TS-Go `internal/tsoptions/commandlineoption.go`. The
 * full file is 1000+ lines of option-table data; this captures the
 * type that the rest of the tsoptions surface consumes. The data
 * tables (OptionsDeclarations, BuildOpts, OptionsForWatch) arrive in
 * later commits.
 */

import type { DiagnosticMessage } from "../diagnostics/types.js";
import type { OrderedMap } from "../collections/index.js";

/**
 * The kind of value a command-line option accepts. Mirrors TS-Go
 * `CommandLineOptionType*` constants.
 */
export type CommandLineOptionKind =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "list"
  | "listOrElement";

/**
 * Single command-line option declaration. Mirrors TS-Go
 * `CommandLineOption`.
 *
 * The Go file uses methods (EnumMap, DeprecatedKeys, Elements) that
 * differ slightly based on the option kind; here we expose them as
 * optional fields/methods.
 */
export interface CommandLineOption {
  readonly name: string;
  readonly shortName?: string;
  readonly kind: CommandLineOptionKind;
  readonly description?: DiagnosticMessage;
  readonly category?: DiagnosticMessage;
  readonly paramType?: DiagnosticMessage;
  readonly isFilePath?: boolean;
  readonly isCommandLineOnly?: boolean;
  readonly isTSConfigOnly?: boolean;
  readonly affectsSemanticDiagnostics?: boolean;
  readonly affectsEmit?: boolean;
  readonly affectsModuleResolution?: boolean;
  readonly affectsBindDiagnostics?: boolean;
  readonly affectsSourceFile?: boolean;
  readonly affectsProgramStructure?: boolean;
  readonly affectsBuildInfo?: boolean;
  readonly transpileOptionValue?: boolean;
  readonly extraValidation?: (value: unknown) => readonly [DiagnosticMessage, readonly string[]] | undefined;
  readonly strictFlag?: boolean;
  readonly allowJsFlag?: boolean;
  readonly deprecated?: boolean;

  /** Optional methods that some kinds provide. */
  enumMap?(): OrderedMap<string, unknown>;
  deprecatedKeys?(): { has(key: string): boolean } | undefined;
  elements?(): CommandLineOption;
}
