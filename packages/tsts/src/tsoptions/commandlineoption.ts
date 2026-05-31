/**
 * Command-line option declaration type.
 *
 * Port surface for TS-Go `internal/tsoptions/commandlineoption.go`. The
 * full file is 1000+ lines of option-table data; this captures the
 * type that the rest of the tsoptions surface consumes. The data
 * tables (OptionsDeclarations, BuildOpts, OptionsForWatch) arrive in
 * later commits.
 */

import type { OrderedMap } from "../collections/index.js";
import type { Tristate } from "../core/tristate.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";

/**
 * The kind of value a command-line option accepts. Mirrors TS-Go
 * `CommandLineOptionType*` constants. May also be a `Map` of
 * string -> enum-value when the option is an enum (e.g. `--module`,
 * `--target`, `--jsx`).
 */
export type CommandLineOptionType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "list"
  | "listOrElement"
  | ReadonlyMap<string, number | string>;

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
  /** Type discriminator. May be a string literal or an enum-Map. */
  readonly type: CommandLineOptionType;
  /** For `list`/`listOrElement`: shape of each element. */
  readonly element?: CommandLineOption;
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
  readonly affectsDeclarationPath?: boolean;
  readonly affectsBuildInfo?: boolean;
  readonly transpileOptionValue?: Tristate;
  readonly extraValidation?: "spec" | "locale" | ((value: unknown) => readonly [DiagnosticMessage, readonly string[]] | undefined);
  readonly strictFlag?: boolean;
  readonly allowJsFlag?: boolean;
  readonly deprecated?: boolean;
  readonly defaultValueDescription?: string | number | boolean | DiagnosticMessage;
  readonly showInSimplifiedHelpView?: boolean;
  readonly minValue?: number;
  readonly allowConfigDirTemplateSubstitution?: boolean;
  readonly listPreserveFalsyValues?: boolean;
  readonly disallowNullOrUndefined?: boolean;

  /** Optional methods that some kinds provide. */
  enumMap?(): OrderedMap<string, unknown>;
  deprecatedKeys?(): { has(key: string): boolean } | undefined;
  elements?(): CommandLineOption;
}

export function commandLineOptionDisallowNullOrUndefined(option: CommandLineOption): boolean {
  return option.disallowNullOrUndefined === true || option.name === "extends";
}

/** Backward-compat alias for callers that referred to it as `kind`. */
export type CommandLineOptionKind = CommandLineOptionType;
