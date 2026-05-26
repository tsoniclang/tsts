/**
 * "use strict" prologue insertion transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/usestrict.go`.
 *
 * Adds `"use strict";` to the top of every emitted CommonJS source
 * file (ESM is implicitly strict). Skipped for JSON source files.
 */

import type { Node as AstNode, SourceFile } from "../../ast/index.js";

import { Transformer, type EmitContext } from "../transformer.js";

/**
 * Forward-declared `core.CompilerOptions` + `core.ModuleKind` surface.
 */
export interface CompilerOptionsForUseStrict {
  getEmitModuleKind(): ModuleKind;
}

export type ModuleKind = "none" | "commonjs" | "amd" | "umd" | "system" | "es2015" | "es2020" | "es2022" | "esnext" | "node16" | "nodenext" | "preserve";

export const ModuleKind: {
  readonly None: ModuleKind;
  readonly CommonJS: ModuleKind;
  readonly AMD: ModuleKind;
  readonly UMD: ModuleKind;
  readonly System: ModuleKind;
  readonly ES2015: ModuleKind;
  readonly ES2020: ModuleKind;
  readonly ES2022: ModuleKind;
  readonly ESNext: ModuleKind;
  readonly Node16: ModuleKind;
  readonly NodeNext: ModuleKind;
  readonly Preserve: ModuleKind;
} = {
  None: "none",
  CommonJS: "commonjs",
  AMD: "amd",
  UMD: "umd",
  System: "system",
  ES2015: "es2015",
  ES2020: "es2020",
  ES2022: "es2022",
  ESNext: "esnext",
  Node16: "node16",
  NodeNext: "nodenext",
  Preserve: "preserve",
};

/**
 * Numeric ordering of module kinds. ES2015 and later are treated as
 * "ESM family". Mirrors TS-Go's `core.ModuleKindES2015` constant
 * ordering implicit in `moduleKind >= ModuleKindES2015`.
 */
function isEsmFamily(kind: ModuleKind): boolean {
  return kind === ModuleKind.ES2015 ||
    kind === ModuleKind.ES2020 ||
    kind === ModuleKind.ES2022 ||
    kind === ModuleKind.ESNext ||
    kind === ModuleKind.Node16 ||
    kind === ModuleKind.NodeNext ||
    kind === ModuleKind.Preserve;
}

export interface UseStrictOptions {
  readonly compilerOptions: CompilerOptionsForUseStrict;
  readonly context?: EmitContext;
  readonly getEmitModuleFormatOfFile: (file: SourceFile) => ModuleKind;
}

class UseStrictTransformer extends Transformer {
  constructor(private readonly opts: UseStrictOptions) {
    super();
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (nodeKind(node) !== KindSourceFile) return node;
    return this.visitSourceFile(node as unknown as SourceFile);
  }

  private visitSourceFile(node: SourceFile): AstNode {
    if (scriptKindOf(node) === ScriptKindJSON) return node as unknown as AstNode;

    const isExternalModuleFile = isExternalModule(node);
    const moduleKind = this.opts.compilerOptions.getEmitModuleKind();
    const format = this.opts.getEmitModuleFormatOfFile(node);

    // ESM is always strict. Skip "use strict" if the file is ESM and
    // CJS emit hasn't been requested.
    if (
      isExternalModuleFile &&
      isEsmFamily(moduleKind) &&
      (moduleKind === ModuleKind.Preserve || isEsmFamily(format))
    ) {
      return node as unknown as AstNode;
    }

    // TODO: use the printer factory to insert "use strict" at the top.
    // Mirrors TS-Go `Factory().EnsureUseStrict(node.Statements.Nodes)` +
    // `UpdateSourceFile(...)`. Full body lands when the printer
    // factory surface is wired.
    return node as unknown as AstNode;
  }
}

export function newUseStrictTransformer(opts: UseStrictOptions): Transformer {
  return new UseStrictTransformer(opts);
}

declare const KindSourceFile: number;
declare const ScriptKindJSON: number;

declare function nodeKind(node: AstNode): number;
declare function scriptKindOf(node: SourceFile): number;
declare function isExternalModule(node: SourceFile): boolean;
