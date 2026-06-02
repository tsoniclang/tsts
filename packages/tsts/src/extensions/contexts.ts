/**
 * Extension contexts — the scoped, read-only objects handed to each hook.
 *
 * Extensions never touch mutable compiler internals directly (spec "Extension
 * Contexts"). Every hook receives a context carrying:
 *
 *   - the owning Program,
 *   - the shared ExtensionFacts sidecar store,
 *   - a DiagnosticSink for surfacing extension diagnostics,
 *   - the per-extension options map.
 *
 * Phase-specific contexts add only what that phase may legitimately use: the
 * current source file at parse/bind/check phases, a binder service handle at
 * bind, and the checker facade at check/program phases.
 *
 * `Program` is referenced structurally (only the program-fact-bearing surface)
 * so the host stays decoupled from the concrete compiler Program in this slice.
 */

import type { SourceFile } from "../ast/index.js";
import type { Diagnostic } from "../diagnostics/types.js";
import type { ExtensionFacts } from "./facts.js";
import type { ExtensionTypeChecker } from "./checkerFacade.js";

/**
 * The minimal program surface the contexts expose. The concrete compiler
 * Program is assignable to this; the host does not require its internals.
 */
export interface ExtensionProgram {
  readonly extensionFacts?: ExtensionFacts;
}

/** A sink for appending extension diagnostics during a hook. */
export interface DiagnosticSink {
  append(diagnostic: Diagnostic): void;
}

/**
 * Opaque binder service handle made available at the bind phase. Kept minimal
 * in v1; extensions use symbol identities via facts rather than binder state.
 */
export interface BinderServices {
  readonly available: boolean;
}

/** Fields common to every extension context. */
export interface ExtensionBaseContext {
  readonly program: ExtensionProgram;
  readonly facts: ExtensionFacts;
  readonly diagnostics: DiagnosticSink;
  readonly options: ReadonlyMap<string, unknown>;
}

/** Context for `configure` — options + facts only, no source files. */
export type ExtensionConfigureContext = ExtensionBaseContext;

/** Context for parse-phase hooks. `sourceFile` is undefined before parse. */
export interface ExtensionParseContext extends ExtensionBaseContext {
  readonly sourceFile: SourceFile | undefined;
}

/** Context for bind-phase hooks. */
export interface ExtensionBindContext extends ExtensionBaseContext {
  readonly sourceFile: SourceFile;
  readonly binder: BinderServices;
}

/** Context for check-phase hooks. */
export interface ExtensionCheckContext extends ExtensionBaseContext {
  readonly sourceFile: SourceFile;
  readonly checker: ExtensionTypeChecker;
}

/** Context for whole-program hooks (`afterCheckProgram`, `validateProgram`). */
export interface ExtensionProgramContext extends ExtensionBaseContext {
  readonly checker: ExtensionTypeChecker;
}
