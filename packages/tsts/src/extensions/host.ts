/**
 * Extension host — owns the sorted extension set, the per-Program fact store,
 * and the hook-dispatch loop.
 *
 * Responsibilities (spec "Extension Lifecycle" / "Error Handling"):
 *   - Sort registered extensions deterministically (ordering.ts). Registration
 *     failures (duplicate id, missing hard dependency, cycle) become fatal
 *     diagnostics recorded into the fact store; the host then runs no hooks.
 *   - Own exactly one ExtensionFacts per host (one per Program).
 *   - Dispatch each lifecycle hook to every extension, in sorted order.
 *   - Enforce per-(file, extension, phase) idempotency: a hook is invoked at
 *     most once for the same file+phase, so re-running a phase does not append
 *     duplicate facts.
 *   - Convert any thrown hook into a fatal diagnostic (code 9000001) naming the
 *     extension id and hook, and discard that invocation's partial work for the
 *     file (we cannot roll back facts, but we never let the throw escape).
 *
 * HARD INVARIANT: with zero extensions the host does nothing observable — no
 * facts, no diagnostics — so the compiler behaves byte-identically.
 */

import type { SourceFile } from "../ast/index.js";
import type { Diagnostic, DiagnosticMessage } from "../diagnostics/types.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { createExtensionFacts, type ExtensionFacts } from "./facts.js";
import { createExtensionTypeChecker, type CheckerLike, type ExtensionTypeChecker } from "./checkerFacade.js";
import {
  type BinderServices,
  type DiagnosticSink,
  type ExtensionBaseContext,
  type ExtensionBindContext,
  type ExtensionCheckContext,
  type ExtensionConfigureContext,
  type ExtensionParseContext,
  type ExtensionProgram,
  type ExtensionProgramContext,
} from "./contexts.js";
import { orderExtensions, type OrderingError } from "./ordering.js";

// ---------------------------------------------------------------------------
// CompilerExtension
// ---------------------------------------------------------------------------

/**
 * A compiler extension. Identity (`id`, `displayName`, `version`) plus optional
 * ordering constraints and lifecycle hooks. Every hook is optional; the host
 * skips extensions that do not implement a given phase.
 */
export interface CompilerExtension {
  readonly id: string;
  readonly displayName: string;
  readonly version: string;
  readonly dependsOn?: readonly string[];
  readonly runsAfter?: readonly string[];

  configure?(context: ExtensionConfigureContext): void;

  beforeParseSourceFile?(context: ExtensionParseContext, fileName: string, text: string): void;
  afterParseSourceFile?(context: ExtensionParseContext, sourceFile: SourceFile): void;

  beforeBindSourceFile?(context: ExtensionBindContext, sourceFile: SourceFile): void;
  afterBindSourceFile?(context: ExtensionBindContext, sourceFile: SourceFile): void;

  beforeCheckSourceFile?(context: ExtensionCheckContext, sourceFile: SourceFile): void;
  afterCheckSourceFile?(context: ExtensionCheckContext, sourceFile: SourceFile): void;

  afterCheckProgram?(context: ExtensionProgramContext): void;
  validateProgram?(context: ExtensionProgramContext): readonly Diagnostic[];
}

// ---------------------------------------------------------------------------
// Host infrastructure diagnostics (reserved range 9000000-9099999)
// ---------------------------------------------------------------------------

const HookThrewFatal: DiagnosticMessage = {
  key: "Extension_0_hook_1_threw_2",
  code: 9000001,
  category: DiagnosticCategory.Error,
  message: "Extension '{0}' hook '{1}' threw: {2}.",
};

const DuplicateExtensionId: DiagnosticMessage = {
  key: "Duplicate_extension_id_0",
  code: 9000002,
  category: DiagnosticCategory.Error,
  message: "Duplicate extension id '{0}'.",
};

const MissingExtensionDependency: DiagnosticMessage = {
  key: "Extension_0_depends_on_unregistered_extension_1",
  code: 9000003,
  category: DiagnosticCategory.Error,
  message: "Extension '{0}' depends on unregistered extension '{1}'.",
};

const ExtensionCycle: DiagnosticMessage = {
  key: "Extension_dependency_cycle_0",
  code: 9000004,
  category: DiagnosticCategory.Error,
  message: "Extension dependency cycle: {0}.",
};

function fatal(message: DiagnosticMessage, text: string, file?: SourceFile): Diagnostic {
  const base: Diagnostic = {
    message,
    category: message.category,
    code: message.code,
    text,
  };
  // exactOptionalPropertyTypes: only attach `file` when present (a full
  // SourceFile is structurally a SourceFileSlim).
  return file === undefined ? base : { ...base, file };
}

function orderingDiagnostic(error: OrderingError): Diagnostic {
  if (error.kind === "duplicate-id") {
    return fatal(DuplicateExtensionId, `Duplicate extension id '${error.id}'.`);
  }
  if (error.kind === "missing-dependency") {
    return fatal(
      MissingExtensionDependency,
      `Extension '${error.id}' depends on unregistered extension '${error.missing}'.`,
    );
  }
  return fatal(ExtensionCycle, `Extension dependency cycle: ${error.cycle.join(" -> ")}.`);
}

// ---------------------------------------------------------------------------
// ExtensionHost
// ---------------------------------------------------------------------------

/**
 * The dispatch surface the compiler drives. Methods are no-ops when zero
 * extensions are registered or when registration failed.
 */
export interface ExtensionHost {
  readonly facts: ExtensionFacts;
  /** Sorted extensions actually dispatched (empty if registration failed). */
  readonly extensions: readonly CompilerExtension[];
  /** True when registration succeeded; false means only fatal diagnostics exist. */
  readonly ok: boolean;

  runConfigure(program: ExtensionProgram, options: ReadonlyMap<string, ReadonlyMap<string, unknown>>): void;
  runAfterParse(files: readonly SourceFile[], program: ExtensionProgram): void;
  runAfterBind(file: SourceFile, program: ExtensionProgram): void;
  runAfterCheck(file: SourceFile, checker: CheckerLike, program: ExtensionProgram): void;
  runAfterCheckProgram(program: ExtensionProgram, checker: CheckerLike): void;
  runValidateProgram(program: ExtensionProgram, checker: CheckerLike): void;
}

const EMPTY_OPTIONS: ReadonlyMap<string, unknown> = new Map<string, unknown>();

type Phase =
  | "configure"
  | "afterParseSourceFile"
  | "afterBindSourceFile"
  | "afterCheckSourceFile"
  | "afterCheckProgram"
  | "validateProgram";

/**
 * Create an extension host over `extensions`. The host sorts them, owns the
 * fact store, and exposes the run* dispatchers. On registration failure the
 * host records fatal diagnostics into the facts and dispatches nothing.
 */
export function createExtensionHost(
  extensions: readonly CompilerExtension[],
): ExtensionHost {
  const facts = createExtensionFacts();
  const sink: DiagnosticSink = { append: diagnostic => facts.appendDiagnostic(diagnostic) };

  // Idempotency ledger: per phase, the set of "<extensionId>::<fileKey>" pairs
  // already dispatched. Program-level phases use a single sentinel file key.
  const ledger = new Map<Phase, Set<string>>();
  const ledgerKey = (extensionId: string, fileKey: string): string => `${extensionId}::${fileKey}`;
  const alreadyRan = (phase: Phase, extensionId: string, fileKey: string): boolean => {
    const set = ledger.get(phase);
    if (set === undefined) return false;
    return set.has(ledgerKey(extensionId, fileKey));
  };
  const markRan = (phase: Phase, extensionId: string, fileKey: string): void => {
    const existing = ledger.get(phase);
    if (existing === undefined) {
      ledger.set(phase, new Set<string>([ledgerKey(extensionId, fileKey)]));
      return;
    }
    existing.add(ledgerKey(extensionId, fileKey));
  };

  const sorted = orderExtensions(extensions);
  if (!sorted.ok) {
    facts.appendDiagnostic(orderingDiagnostic(sorted.error));
    return {
      facts,
      extensions: [],
      ok: false,
      runConfigure: () => {},
      runAfterParse: () => {},
      runAfterBind: () => {},
      runAfterCheck: () => {},
      runAfterCheckProgram: () => {},
      runValidateProgram: () => {},
    };
  }

  const byId = new Map(extensions.map(extension => [extension.id, extension]));
  const orderedExtensions: readonly CompilerExtension[] = sorted.order.map(id => byId.get(id)!);

  const optionsFor = (
    extensionId: string,
    allOptions: ReadonlyMap<string, ReadonlyMap<string, unknown>>,
  ): ReadonlyMap<string, unknown> => allOptions.get(extensionId) ?? EMPTY_OPTIONS;

  const baseContext = (
    program: ExtensionProgram,
    options: ReadonlyMap<string, unknown>,
  ): ExtensionBaseContext => ({ program, facts, diagnostics: sink, options });

  // Run `body` for one extension+phase, converting a throw into the 9000001
  // fatal diagnostic. Returns nothing; partial state is left as-is but the
  // throw never escapes the compiler.
  const guarded = (extension: CompilerExtension, hookName: string, body: () => void): void => {
    try {
      body();
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      facts.appendDiagnostic(
        fatal(HookThrewFatal, `Extension '${extension.id}' hook '${hookName}' threw: ${detail}.`),
      );
    }
  };

  return {
    facts,
    extensions: orderedExtensions,
    ok: true,

    runConfigure(program, allOptions): void {
      for (const extension of orderedExtensions) {
        if (extension.configure === undefined) continue;
        if (alreadyRan("configure", extension.id, "<program>")) continue;
        markRan("configure", extension.id, "<program>");
        const context: ExtensionConfigureContext = baseContext(program, optionsFor(extension.id, allOptions));
        guarded(extension, "configure", () => extension.configure!(context));
      }
    },

    runAfterParse(files, program): void {
      for (const extension of orderedExtensions) {
        if (extension.afterParseSourceFile === undefined) continue;
        for (const file of files) {
          if (alreadyRan("afterParseSourceFile", extension.id, file.fileName)) continue;
          markRan("afterParseSourceFile", extension.id, file.fileName);
          const context: ExtensionParseContext = { ...baseContext(program, EMPTY_OPTIONS), sourceFile: file };
          guarded(extension, "afterParseSourceFile", () => extension.afterParseSourceFile!(context, file));
        }
      }
    },

    runAfterBind(file, program): void {
      const binder: BinderServices = { available: true };
      for (const extension of orderedExtensions) {
        if (extension.afterBindSourceFile === undefined) continue;
        if (alreadyRan("afterBindSourceFile", extension.id, file.fileName)) continue;
        markRan("afterBindSourceFile", extension.id, file.fileName);
        const context: ExtensionBindContext = { ...baseContext(program, EMPTY_OPTIONS), sourceFile: file, binder };
        guarded(extension, "afterBindSourceFile", () => extension.afterBindSourceFile!(context, file));
      }
    },

    runAfterCheck(file, checker, program): void {
      const facade: ExtensionTypeChecker = createExtensionTypeChecker(checker);
      for (const extension of orderedExtensions) {
        if (extension.afterCheckSourceFile === undefined) continue;
        if (alreadyRan("afterCheckSourceFile", extension.id, file.fileName)) continue;
        markRan("afterCheckSourceFile", extension.id, file.fileName);
        const context: ExtensionCheckContext = { ...baseContext(program, EMPTY_OPTIONS), sourceFile: file, checker: facade };
        guarded(extension, "afterCheckSourceFile", () => extension.afterCheckSourceFile!(context, file));
      }
    },

    runAfterCheckProgram(program, checker): void {
      const facade: ExtensionTypeChecker = createExtensionTypeChecker(checker);
      for (const extension of orderedExtensions) {
        if (extension.afterCheckProgram === undefined) continue;
        if (alreadyRan("afterCheckProgram", extension.id, "<program>")) continue;
        markRan("afterCheckProgram", extension.id, "<program>");
        const context: ExtensionProgramContext = { ...baseContext(program, EMPTY_OPTIONS), checker: facade };
        guarded(extension, "afterCheckProgram", () => extension.afterCheckProgram!(context));
      }
    },

    runValidateProgram(program, checker): void {
      const facade: ExtensionTypeChecker = createExtensionTypeChecker(checker);
      for (const extension of orderedExtensions) {
        if (extension.validateProgram === undefined) continue;
        if (alreadyRan("validateProgram", extension.id, "<program>")) continue;
        markRan("validateProgram", extension.id, "<program>");
        const context: ExtensionProgramContext = { ...baseContext(program, EMPTY_OPTIONS), checker: facade };
        guarded(extension, "validateProgram", () => {
          for (const diagnostic of extension.validateProgram!(context)) {
            facts.appendDiagnostic(diagnostic);
          }
        });
      }
    },
  };
}
