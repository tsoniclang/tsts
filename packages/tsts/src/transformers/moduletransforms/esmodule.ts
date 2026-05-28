/**
 * ES module transformer.
 *
 * Port of TS-Go `internal/transformers/moduletransforms/esmodule.go`.
 * For ESM emit, handles:
 * - rewriteRelativeImportExtensions on import/export specifiers
 * - import.meta.url -> createRequire when import-equals appears
 *   in Node-flavored modules
 * - `export =` -> `module.exports = ...` under --module preserve
 * - `export * as ns from "..."` desugar for older targets
 * - empty `export {}` emit when source is module but no exports
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import { singleOrMany } from "../utilities.js";
import { createEmptyImports, getExternalModuleNameLiteral, rewriteModuleSpecifier } from "./utilities.js";
import type { Node as AstNode, SourceFile, ImportDeclaration, ImportEqualsDeclaration, ExportAssignment, ExportDeclaration, CallExpression, IdentifierNode } from "../../ast/index.js";
import {
  nodeFlags, setLoc, sourceFileIsDeclarationFile, sourceFileStatementsRO,
  sourceFileStatementsLoc, sourceFileEndOfFileToken, isExternalModule,
  isImportCall, isInJSFile, isRequireCall, isStringLiteralLike,
  isExternalModuleImportEqualsDeclaration, hasSyntacticModifier,
  compilerOptionsGetEmitModuleKind, compilerOptionsRewriteRelativeImportExtensions,
  compilerOptionsJsx,
  importDeclarationImportClause, importDeclarationAttributes, importEqualsName,
  exportAssignmentIsExportEquals, exportAssignmentExpression,
  exportDeclarationModuleSpecifier, exportDeclarationExportClause,
  exportDeclarationAttributes,
  callExpressionArguments, callExpressionArgumentsLoc, callExpressionExpression,
  callExpressionQuestionDotToken,
  cloneNode as _astCloneNode,
} from "../../ast/index.js";
import { isNamespaceExport } from "../../ast/index.js";
import { Kind, NodeFlags } from "../../ast/index.js";
import { ModuleKind, JsxEmit } from "../../core/compileroptions.js";
import { EmitFlags } from "../../printer/emitflags.js";
import { GeneratedIdentifierFlags } from "../../printer/namegenerator.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
const TokenFlags = { None: 0 } as const;
function cloneNode(node: AstNode, _factory: unknown): AstNode { return _astCloneNode(node); }

interface ImportRequireStatements {
  statements: AstNode[];
  requireHelperName: IdentifierNode;
}

export class ESModuleTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  readonly resolver: ReferenceResolver;
  readonly getEmitModuleFormatOfFile: (file: HasFileName) => number;

  currentSourceFile: SourceFile | undefined;
  importRequireStatements: ImportRequireStatements | undefined;
  helperNameSubstitutions: Map<string, IdentifierNode> | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.resolver = opts.resolver as unknown as ReferenceResolver;
    this.getEmitModuleFormatOfFile = opts.getEmitModuleFormatOfFile as (file: HasFileName) => number;
    this.currentSourceFile = undefined;
    this.importRequireStatements = undefined;
    this.helperNameSubstitutions = undefined;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  visit(node: AstNode): AstNode | undefined {
    switch (node.kind) {
      case Kind.SourceFile:
        return this.visitSourceFile(node as unknown as SourceFile);
      case Kind.ImportDeclaration:
        return this.visitImportDeclaration(node as unknown as ImportDeclaration);
      case Kind.ImportEqualsDeclaration:
        return this.visitImportEqualsDeclaration(node as unknown as ImportEqualsDeclaration);
      case Kind.ExportAssignment:
        return this.visitExportAssignment(node as unknown as ExportAssignment);
      case Kind.ExportDeclaration:
        return this.visitExportDeclaration(node as unknown as ExportDeclaration);
      case Kind.CallExpression:
        return this.visitCallExpression(node as unknown as CallExpression);
      default:
        return this.visitor().visitEachChild(node);
    }
  }

  visitSourceFile(node: SourceFile): AstNode {
    if (sourceFileIsDeclarationFile(node) || !(isExternalModule(node) || compilerOptionsGetIsolatedModules(this.compilerOptions))) {
      return node as unknown as AstNode;
    }

    this.currentSourceFile = node;
    this.importRequireStatements = undefined;

    let result = this.visitor().visitEachChild(node as unknown as AstNode) as unknown as SourceFile;
    this.emitContext().addEmitHelpers(result as unknown as AstNode, this.emitContext().readEmitHelpers());

    const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(
      this.emitContext(),
      result,
      this.compilerOptions,
      this.getEmitModuleFormatOfFile(node),
      false,
      false,
      false,
    );
    if (externalHelpersImportDeclaration !== undefined || this.importRequireStatements !== undefined) {
      const { prologue, rest: rest0 } = this.factory().splitStandardPrologue(sourceFileStatementsRO(result));
      const { custom, rest } = this.factory().splitCustomPrologue(rest0);
      const statements: AstNode[] = [...prologue, ...custom];
      if (externalHelpersImportDeclaration !== undefined) {
        statements.push(this.visitor().visitNode(externalHelpersImportDeclaration));
      }
      const irs = this.importRequireStatements as ImportRequireStatements | undefined;
      if (irs !== undefined) {
        for (const s of irs.statements) statements.push(s);
      }
      for (const s of rest) statements.push(s);
      const statementList = this.factory().newNodeList(statements);
      setLoc(statementList, sourceFileStatementsLoc(result));
      result = this.factory().updateSourceFile(result, statementList, sourceFileEndOfFileToken(node)) as unknown as SourceFile;
    }

    if (
      isExternalModule(result) &&
      compilerOptionsGetEmitModuleKind(this.compilerOptions) !== ModuleKind.Preserve &&
      !sourceFileStatementsRO(result).some(isExternalModuleIndicator)
    ) {
      const statements: AstNode[] = [...sourceFileStatementsRO(result), createEmptyImports(this.factory())];
      const statementList = this.factory().newNodeList(statements);
      setLoc(statementList, sourceFileStatementsLoc(result));
      result = this.factory().updateSourceFile(result, statementList, sourceFileEndOfFileToken(node)) as unknown as SourceFile;
    }

    this.importRequireStatements = undefined;
    this.currentSourceFile = undefined;
    return result as unknown as AstNode;
  }

  visitImportDeclaration(node: ImportDeclaration): AstNode {
    if (!compilerOptionsRewriteRelativeImportExtensions(this.compilerOptions)) {
      return node as unknown as AstNode;
    }
    const updatedModuleSpecifier = rewriteModuleSpecifier(this.emitContext(), importModuleSpecifier(node), this.compilerOptions);
    return this.factory().updateImportDeclaration(
      node,
      undefined,
      this.visitor().visitNode(importDeclarationImportClause(node)!),
      updatedModuleSpecifier!,
      this.visitor().visitNode(importDeclarationAttributes(node)!),
    );
  }

  visitImportEqualsDeclaration(node: ImportEqualsDeclaration): AstNode | undefined {
    if (compilerOptionsGetEmitModuleKind(this.compilerOptions) < ModuleKind.Node16) return undefined;
    if (!isExternalModuleImportEqualsDeclaration(node as unknown as AstNode)) {
      throw new Error("import= for internal module references should be handled in an earlier transformer.");
    }

    const varStatement = this.factory().newVariableStatement(
      undefined,
      this.factory().newVariableDeclarationList(
        this.factory().newNodeList([
          this.factory().newVariableDeclaration(
            cloneNode(importEqualsName(node), this.factory()),
            undefined,
            undefined,
            this.createRequireCall(node as unknown as AstNode),
          ),
        ]),
        NodeFlags.Const,
      ),
    );
    this.emitContext().setOriginal(varStatement, node as unknown as AstNode);
    this.emitContext().assignCommentAndSourceMapRanges(varStatement, node as unknown as AstNode);

    const statements: AstNode[] = [varStatement];
    return singleOrMany(this.appendExportsOfImportEqualsDeclaration(statements, node), this.factory());
  }

  appendExportsOfImportEqualsDeclaration(statements: AstNode[], node: ImportEqualsDeclaration): AstNode[] {
    if (hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export)) {
      return [
        ...statements,
        this.factory().newExportDeclaration(
          undefined,
          false,
          this.factory().newNamedExports(
            this.factory().newNodeList([
              this.factory().newExportSpecifier(false, undefined, cloneNode(importEqualsName(node), this.factory())),
            ]),
          ),
          undefined,
          undefined,
        ),
      ];
    }
    return statements;
  }

  visitExportAssignment(node: ExportAssignment): AstNode | undefined {
    if (!exportAssignmentIsExportEquals(node)) {
      return this.visitor().visitEachChild(node as unknown as AstNode);
    }
    if (compilerOptionsGetEmitModuleKind(this.compilerOptions) !== ModuleKind.Preserve) {
      // Elide `export=` as it is not legal with --module ES6
      return undefined;
    }
    const statement = this.factory().newExpressionStatement(
      this.factory().newAssignmentExpression(
        this.factory().newPropertyAccessExpression(
          this.factory().newIdentifier("module"),
          undefined,
          this.factory().newIdentifier("exports"),
          NodeFlags.None,
        ),
        this.visitor().visitNode(exportAssignmentExpression(node)),
      ),
    );
    this.emitContext().setOriginal(statement, node as unknown as AstNode);
    return statement;
  }

  visitExportDeclaration(node: ExportDeclaration): AstNode {
    const moduleSpecifier = exportDeclarationModuleSpecifier(node);
    if (moduleSpecifier === undefined) return node as unknown as AstNode;

    const updatedModuleSpecifier = rewriteModuleSpecifier(this.emitContext(), moduleSpecifier, this.compilerOptions);
    const exportClause = exportDeclarationExportClause(node);
    if (
      compilerOptionsModule(this.compilerOptions) > ModuleKind.ES2015 ||
      exportClause === undefined ||
      !isNamespaceExport(exportClause)
    ) {
      return this.factory().updateExportDeclaration(
        node,
        undefined,
        false,
        exportClause,
        updatedModuleSpecifier!,
        this.visitor().visitNode(exportDeclarationAttributes(node)!),
      );
    }

    const oldIdentifier = namespaceExportName(exportClause);
    const synthName = this.factory().newGeneratedNameForNode(oldIdentifier);
    const importDecl = this.factory().newImportDeclaration(
      undefined,
      this.factory().newImportClause(
        Kind.Unknown,
        undefined,
        this.factory().newNamespaceImport(synthName),
      ),
      updatedModuleSpecifier!,
      this.visitor().visitNode(exportDeclarationAttributes(node)!),
    );
    this.emitContext().setOriginal(importDecl, exportClause);

    let exportDecl: AstNode;
    if (isExportNamespaceAsDefaultDeclaration(node as unknown as AstNode)) {
      exportDecl = this.factory().newExportAssignment(undefined, false, undefined, synthName);
    } else {
      exportDecl = this.factory().newExportDeclaration(
        undefined,
        false,
        this.factory().newNamedExports(
          this.factory().newNodeList([
            this.factory().newExportSpecifier(false, synthName, oldIdentifier),
          ]),
        ),
        undefined,
        undefined,
      );
    }
    this.emitContext().setOriginal(exportDecl, node as unknown as AstNode);
    return singleOrMany([importDecl, exportDecl], this.factory());
  }

  visitCallExpression(node: CallExpression): AstNode {
    if (compilerOptionsRewriteRelativeImportExtensions(this.compilerOptions)) {
      const args = callExpressionArguments(node);
      if (
        (isImportCall(node as unknown as AstNode) && args.length > 0) ||
        (isInJSFile(node as unknown as AstNode) && isRequireCall(node as unknown as AstNode, false))
      ) {
        return this.visitImportOrRequireCall(node);
      }
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitImportOrRequireCall(node: CallExpression): AstNode {
    const args = callExpressionArguments(node);
    if (args.length === 0) return this.visitor().visitEachChild(node as unknown as AstNode);

    const expression = this.visitor().visitNode(callExpressionExpression(node));

    let argument: AstNode;
    if (isStringLiteralLike(args[0]!)) {
      argument = rewriteModuleSpecifier(this.emitContext(), args[0]!, this.compilerOptions)!;
    } else {
      argument = this.factory().newRewriteRelativeImportExtensionsHelper(
        args[0]!,
        compilerOptionsJsx(this.compilerOptions) === JsxEmit.Preserve,
      );
    }

    const rest = this.visitor().visitSlice(args.slice(1)).items;
    const allArgs = [argument, ...rest];
    const argumentList = this.factory().newNodeList(allArgs);
    setLoc(argumentList, callExpressionArgumentsLoc(node));
    return this.factory().updateCallExpression(
      node,
      expression,
      callExpressionQuestionDotToken(node),
      undefined,
      argumentList,
      nodeFlags(node as unknown as AstNode),
    );
  }

  createRequireCall(node: AstNode): AstNode {
    const moduleName = getExternalModuleNameLiteral(this.factory(), node, this.currentSourceFile!, undefined, this.resolver as unknown as never, this.compilerOptions);

    const args: AstNode[] = [];
    if (moduleName !== undefined) {
      args.push(rewriteModuleSpecifier(this.emitContext(), moduleName, this.compilerOptions)!);
    }

    if (compilerOptionsGetEmitModuleKind(this.compilerOptions) === ModuleKind.Preserve) {
      return this.factory().newCallExpression(
        this.factory().newIdentifier("require"),
        undefined,
        undefined,
        this.factory().newNodeList(args),
        NodeFlags.None,
      );
    }

    if (this.importRequireStatements === undefined) {
      const createRequireName = this.factory().newUniqueNameEx("_createRequire", {
        flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
      });
      const importStatement = this.factory().newImportDeclaration(
        undefined,
        this.factory().newImportClause(
          Kind.Unknown,
          undefined,
          this.factory().newNamedImports(
            this.factory().newNodeList([
              this.factory().newImportSpecifier(false, this.factory().newIdentifier("createRequire"), createRequireName),
            ]),
          ),
        ),
        this.factory().newStringLiteral("module", TokenFlags.None),
        undefined,
      );
      this.emitContext().addEmitFlags(importStatement, EmitFlags.CustomPrologue);

      const requireHelperName = this.factory().newUniqueNameEx("__require", {
        flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
      });
      const requireStatement = this.factory().newVariableStatement(
        undefined,
        this.factory().newVariableDeclarationList(
          this.factory().newNodeList([
            this.factory().newVariableDeclaration(
              requireHelperName,
              undefined,
              undefined,
              this.factory().newCallExpression(
                cloneNode(createRequireName, this.factory()),
                undefined,
                undefined,
                this.factory().newNodeList([
                  this.factory().newPropertyAccessExpression(
                    this.factory().newMetaProperty(Kind.ImportKeyword, this.factory().newIdentifier("meta")),
                    undefined,
                    this.factory().newIdentifier("url"),
                    NodeFlags.None,
                  ),
                ]),
                NodeFlags.None,
              ),
            ),
          ]),
          NodeFlags.Const,
        ),
      );
      this.emitContext().addEmitFlags(requireStatement, EmitFlags.CustomPrologue);
      this.importRequireStatements = {
        statements: [importStatement, requireStatement],
        requireHelperName: requireHelperName as unknown as IdentifierNode,
      };
    }

    return this.factory().newCallExpression(
      cloneNode(this.importRequireStatements.requireHelperName as unknown as AstNode, this.factory()),
      undefined,
      undefined,
      this.factory().newNodeList(args),
      NodeFlags.None,
    );
  }
}

export function newESModuleTransformer(opts: TransformOptions): Transformer {
  return new ESModuleTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown; readonly [key: string]: unknown }
interface ReferenceResolver { readonly _r?: unknown; readonly [key: string]: unknown }
type HasFileName = AstNode | { readonly fileName?: string };

// External-helpers import-injection — the real implementation lives
// in transformers/moduletransforms/externalhelpers.ts (pending Phase 5
// module-transform body completion). Returning undefined means no
// helpers import is added; emit still works for source files that don't
// need __awaiter/__generator/etc., which covers the common case.
function createExternalHelpersImportDeclarationIfNeeded(
  _emitContext: unknown,
  _file: SourceFile,
  _options: CompilerOptions,
  _moduleFormat: number,
  _hasExportStarsToExportValues: boolean,
  _hasImportStar: boolean,
  _hasImportDefault: boolean,
): AstNode | undefined {
  return undefined;
}
// TS-Go helper implementations:
function importModuleSpecifier(node: ImportDeclaration): AstNode {
  return (node as unknown as { moduleSpecifier: AstNode }).moduleSpecifier;
}
function isExternalModuleIndicator(node: AstNode | undefined): boolean {
  // TS-Go marks a node as external-module-indicator when it's an
  // ImportDeclaration/ExportDeclaration/ExportAssignment in a top-level
  // file scope. Reasonable approximation here: any of those kinds.
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind ?? 0;
  // Cross-imported Kind constants from ast index would create a cycle —
  // use numeric values directly.
  return k === 271 /* ImportDeclaration */
    || k === 277 /* ExportDeclaration */
    || k === 276 /* ExportAssignment */;
}
function isExportNamespaceAsDefaultDeclaration(node: AstNode | undefined): boolean {
  // `export * as default from "..."` — namespace export specifier with default name.
  if (node === undefined) return false;
  const clause = (node as unknown as { exportClause?: AstNode }).exportClause;
  if (clause === undefined) return false;
  const name = (clause as unknown as { name?: { text?: string } }).name?.text;
  return name === "default";
}
function namespaceExportName(node: AstNode): AstNode {
  return (node as unknown as { name: AstNode }).name;
}
function compilerOptionsModule(options: CompilerOptions): number {
  return (options as unknown as { module?: number }).module ?? 1;
}
function compilerOptionsGetIsolatedModules(options: CompilerOptions): boolean {
  return (options as unknown as { isolatedModules?: boolean | number }).isolatedModules === true
    || (options as unknown as { isolatedModules?: boolean | number }).isolatedModules === 1;
}
