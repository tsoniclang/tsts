/**
 * Import elision pass.
 *
 * Substantive port of TS-Go `internal/transformers/tstransforms/importelision.go`
 * (~149 LoC). Removes type-only imports/exports during TypeScript →
 * JavaScript emission, including:
 *   - `import type { ... }` declarations
 *   - `import { type Foo }` specifiers
 *   - Imports where every binding is type-only and unused
 *   - `import = require(...)` for type-only references
 *
 * Skipped when `verbatimModuleSyntax` is enabled (which preserves
 * imports verbatim).
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import type {
  Node as AstNode,
  SourceFile as SourceFileNode,
  ImportEqualsDeclaration,
  ImportDeclaration,
  ImportClause,
  NamedImports,
  ExportDeclaration,
  NamedExports,
  NodeList,
} from "../../ast/index.js";
import {
  Kind, isTrue, isInJSFile, declModifiers as getModifiers,
  getNodeName, getNodeListLength, nodeName,
} from "../../ast/index.js";
import { isExternalModule, isExternalModuleImportEqualsDeclaration } from "../../ast/index.js";

function getImportClause(node: AstNode): AstNode | undefined {
  return (node as unknown as { importClause?: AstNode }).importClause;
}
function getModuleSpecifier(node: AstNode): AstNode {
  return (node as unknown as { moduleSpecifier: AstNode }).moduleSpecifier;
}
function getImportAttributes(node: AstNode): AstNode | undefined {
  return (node as unknown as { attributes?: AstNode }).attributes;
}
function getNamedBindings(node: AstNode): AstNode | undefined {
  return (node as unknown as { namedBindings?: AstNode }).namedBindings;
}
function getPhaseModifier(node: AstNode): AstNode | undefined {
  return (node as unknown as { phaseModifier?: AstNode }).phaseModifier;
}
function getNamedImportElements(node: AstNode): NodeList | undefined {
  return (node as unknown as { elements?: NodeList }).elements;
}
function getNamedExportElements(node: AstNode): NodeList | undefined {
  return (node as unknown as { elements?: NodeList }).elements;
}
function getExportClause(node: AstNode): AstNode | undefined {
  return (node as unknown as { exportClause?: AstNode }).exportClause;
}

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class ImportElisionTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  readonly emitResolver: EmitResolver;
  currentSourceFile: SourceFileNode | undefined;

  constructor(opts: TransformOptions) {
    super();
    if (isTrue(opts.compilerOptions.verbatimModuleSyntax)) {
      throw new Error("ImportElisionTransformer should not be used with VerbatimModuleSyntax");
    }
    this.compilerOptions = opts.compilerOptions as unknown as CompilerOptions;
    this.emitResolver = opts.emitResolver as unknown as EmitResolver;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  // -------------------------------------------------------------------------
  // Main visit dispatch
  // -------------------------------------------------------------------------

  visit(node: AstNode): AstNode | undefined {
    switch (node.kind) {
      case Kind.ImportEqualsDeclaration: {
        if (isExternalModuleImportEqualsDeclaration(node)) {
          if (!this.shouldEmitAliasDeclaration(node)) return undefined;
        } else {
          if (!this.shouldEmitImportEqualsDeclaration(node as unknown as ImportEqualsDeclaration)) return undefined;
        }
        return this.visitor().visitEachChild(node);
      }
      case Kind.ImportDeclaration: {
        const n = node as unknown as ImportDeclaration;
        const ic = getImportClause(n);
        if (ic !== undefined) {
          const visited = this.visitor().visitNode(ic);
          if (visited === undefined) return undefined;
          return this.factory().updateImportDeclaration(
            n, getModifiers(n), visited, getModuleSpecifier(n),
            this.visitor().visitNode(getImportAttributes(n)),
          );
        }
        return this.visitor().visitEachChild(node);
      }
      case Kind.ImportClause: {
        const n = node as unknown as ImportClause;
        const name = this.shouldEmitAliasDeclaration(node) ? getNodeName(node) : undefined;
        const namedBindings = this.visitor().visitNode(getNamedBindings(n));
        if (name === undefined && namedBindings === undefined) return undefined;
        return this.factory().updateImportClause(n, getPhaseModifier(n), name, namedBindings);
      }
      case Kind.NamespaceImport:
        if (!this.shouldEmitAliasDeclaration(node)) return undefined;
        return node;
      case Kind.NamedImports: {
        const n = node as unknown as NamedImports;
        const visited = this.visitor().visitNodes(getNamedImportElements(n));
        if (getNodeListLength(visited) === 0) return undefined;
        return this.factory().updateNamedImports(n, visited);
      }
      case Kind.ImportSpecifier:
        if (!this.shouldEmitAliasDeclaration(node)) return undefined;
        return node;
      case Kind.ExportAssignment:
        if (!isTrue(this.compilerOptions.verbatimModuleSyntax) && !this.isValueAliasDeclaration(node)) {
          return undefined;
        }
        return this.visitor().visitEachChild(node);
      case Kind.ExportDeclaration: {
        const n = node as unknown as ExportDeclaration;
        let exportClause: AstNode | undefined;
        const ec = getExportClause(n);
        if (ec !== undefined) {
          exportClause = this.visitor().visitNode(ec);
          if (exportClause === undefined) return undefined;
        }
        return this.factory().updateExportDeclaration(
          n, undefined, false, exportClause,
          this.visitor().visitNode(getModuleSpecifier(n)),
          this.visitor().visitNode(getImportAttributes(n)),
        );
      }
      case Kind.NamedExports: {
        const n = node as unknown as NamedExports;
        const visited = this.visitor().visitNodes(getNamedExportElements(n));
        if (getNodeListLength(visited) === 0) return undefined;
        return this.factory().updateNamedExports(n, visited);
      }
      case Kind.ExportSpecifier:
        if (!this.isValueAliasDeclaration(node)) return undefined;
        return node;
      case Kind.SourceFile: {
        const saved = this.currentSourceFile;
        this.currentSourceFile = node as unknown as SourceFileNode;
        const result = this.visitor().visitEachChild(node);
        this.currentSourceFile = saved;
        return result;
      }
      case Kind.ModuleDeclaration:
      case Kind.ModuleBlock:
        return this.visitor().visitEachChild(node);
      default:
        return node;
    }
  }

  // -------------------------------------------------------------------------
  // Elision predicates
  // -------------------------------------------------------------------------

  shouldEmitAliasDeclaration(node: AstNode): boolean {
    if (isInJSFile(node)) return true;
    return this.isReferencedAliasDeclaration(node);
  }

  shouldEmitImportEqualsDeclaration(node: ImportEqualsDeclaration): boolean {
    if (this.shouldEmitAliasDeclaration(node as unknown as AstNode)) return true;
    if (this.currentSourceFile === undefined) return false;
    return !isExternalModule(this.currentSourceFile)
      && this.isTopLevelValueImportEqualsWithEntityName(node as unknown as AstNode);
  }

  isReferencedAliasDeclaration(node: AstNode): boolean {
    const parsed = this.emitContext().parseNode(node);
    if (parsed === undefined) return true;
    return this.emitResolver.isReferencedAliasDeclaration(parsed);
  }

  isValueAliasDeclaration(node: AstNode): boolean {
    const parsed = this.emitContext().parseNode(node);
    if (parsed === undefined) return true;
    return this.emitResolver.isValueAliasDeclaration(parsed);
  }

  isTopLevelValueImportEqualsWithEntityName(node: AstNode): boolean {
    const parsed = this.emitContext().parseNode(node);
    if (parsed === undefined) return false;
    return this.emitResolver.isTopLevelValueImportEqualsWithEntityName(parsed);
  }
}

export function newImportElisionTransformer(opts: TransformOptions): Transformer {
  return new ImportElisionTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions {
  verbatimModuleSyntax?: unknown;
  readonly _opts?: unknown;
}

interface EmitResolver {
  isReferencedAliasDeclaration(node: AstNode): boolean;
  isValueAliasDeclaration(node: AstNode): boolean;
  isTopLevelValueImportEqualsWithEntityName(node: AstNode): boolean;
}

