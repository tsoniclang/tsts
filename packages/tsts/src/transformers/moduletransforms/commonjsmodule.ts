/**
 * CommonJS module transformer.
 *
 * Port of TS-Go `internal/transformers/moduletransforms/commonjsmodule.go`
 * (~2142 LoC). Converts ES module source files into CommonJS form:
 * imports become `require(...)` calls, exports become assignments to
 * `exports.x`, `export default` becomes `exports.default = ...`,
 * `export =` becomes `module.exports = ...`. Dynamic `import()`
 * becomes `Promise.resolve(...).then(s => require(s))`.
 *
 * Handles:
 * - top-level dispatch via topLevelVisitor / topLevelNestedVisitor /
 *   discardedValueVisitor / assignmentPatternVisitor
 * - `__esModule` defineProperty preamble
 * - export-binding hoisting (exports.x = exports.y = void 0)
 * - identifier rewriting for imported references (mod_1.foo) and
 *   exported references (exports.foo)
 * - prefix/postfix unary updates that propagate to exports
 * - destructuring assignment to exported names (uses
 *   FlattenDestructuringAssignment with createAllExportExpressions)
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions, type NodeVisitor } from "../transformer.js";
import { extractModifiers } from "../modifiervisitor.js";
import { isExportName, isGeneratedIdentifier, isHelperName, isIdentifierReference, isLocalName, singleOrMany, convertVariableDeclarationToAssignmentExpression } from "../utilities.js";
import { flattenDestructuringAssignment, FlattenLevel } from "../destructuring.js";
import {
  collectExternalModuleInfo,
  createExternalHelpersImportDeclarationIfNeeded,
  type ExternalModuleInfo,
  getExportNeedsImportStarHelper,
  getImportNeedsImportDefaultHelper,
  getImportNeedsImportStarHelper,
} from "./externalmoduleinfo.js";
import {
  getExternalModuleNameLiteral,
  isDeclarationNameOfEnumOrNamespace,
  isFileLevelReservedGeneratedIdentifier,
  isSimpleInlineableExpression,
  rewriteModuleSpecifier,
} from "./utilities.js";
import type { Node as AstNode, SourceFile, IdentifierNode, ImportDeclaration, ImportEqualsDeclaration, ExportDeclaration, ExportAssignment, FunctionDeclaration, ClassDeclaration, VariableStatement, VariableDeclaration, ForStatement, ForInOrOfStatement, DoStatement, WhileStatement, LabeledStatement, WithStatement, IfStatement, SwitchStatement, CaseBlock, TryStatement, CatchClause, Block, ExpressionStatement, VoidExpression, ParenthesizedExpression, PartiallyEmittedExpression, CallExpression, TaggedTemplateExpression, BinaryExpression, PrefixUnaryExpression, PostfixUnaryExpression, ShorthandPropertyAssignment, PropertyAssignment, SpreadAssignment, SpreadElement } from "../../ast/index.js";

export class CommonJSModuleTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  readonly resolver: ReferenceResolver;
  readonly getEmitModuleFormatOfFile: (file: HasFileName) => number;
  readonly moduleKind: number;
  readonly languageVersion: number;

  topLevelVisitor!: NodeVisitor;
  topLevelNestedVisitor!: NodeVisitor;
  discardedValueVisitor!: NodeVisitor;
  assignmentPatternVisitor!: NodeVisitor;

  currentSourceFile: SourceFile | undefined;
  currentModuleInfo: ExternalModuleInfo | undefined;
  parentNode: AstNode | undefined;
  currentNode: AstNode | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.resolver = opts.resolver;
    this.getEmitModuleFormatOfFile = opts.getEmitModuleFormatOfFile as (file: HasFileName) => number;
    this.languageVersion = compilerOptionsGetEmitScriptTarget(this.compilerOptions);
    this.moduleKind = compilerOptionsGetEmitModuleKind(this.compilerOptions);
    this.initTransformer((node) => this.visit(node), opts.context);
    this.topLevelVisitor = this.emitContext().newNodeVisitor((n) => this.visitTopLevel(n));
    this.topLevelNestedVisitor = this.emitContext().newNodeVisitor((n) => this.visitTopLevelNested(n));
    this.discardedValueVisitor = this.emitContext().newNodeVisitor((n) => this.visitDiscardedValue(n));
    this.assignmentPatternVisitor = this.emitContext().newNodeVisitor((n) => this.visitAssignmentPattern(n));
  }

  // -------------------------------------------------------------------------
  // Ancestor tracking
  // -------------------------------------------------------------------------

  pushNode(node: AstNode): AstNode | undefined {
    const grandparent = this.parentNode;
    this.parentNode = this.currentNode;
    this.currentNode = node;
    return grandparent;
  }

  popNode(grandparent: AstNode | undefined): void {
    this.currentNode = this.parentNode;
    this.parentNode = grandparent;
  }

  // -------------------------------------------------------------------------
  // Top-level dispatch
  // -------------------------------------------------------------------------

  visitTopLevel(node: AstNode): AstNode | undefined {
    const grandparent = this.pushNode(node);
    try {
      switch (node.kind) {
        case Kind.ImportDeclaration: return this.visitTopLevelImportDeclaration(node as unknown as ImportDeclaration);
        case Kind.ImportEqualsDeclaration: return this.visitTopLevelImportEqualsDeclaration(node as unknown as ImportEqualsDeclaration);
        case Kind.ExportDeclaration: return this.visitTopLevelExportDeclaration(node as unknown as ExportDeclaration);
        case Kind.ExportAssignment: return this.visitTopLevelExportAssignment(node as unknown as ExportAssignment);
        case Kind.FunctionDeclaration: return this.visitTopLevelFunctionDeclaration(node as unknown as FunctionDeclaration);
        case Kind.ClassDeclaration: return this.visitTopLevelClassDeclaration(node as unknown as ClassDeclaration);
        case Kind.VariableStatement: return this.visitTopLevelVariableStatement(node as unknown as VariableStatement);
        default: return this.visitTopLevelNestedNoStack(node);
      }
    } finally {
      this.popNode(grandparent);
    }
  }

  visitTopLevelNested(node: AstNode): AstNode | undefined {
    const grandparent = this.pushNode(node);
    try {
      return this.visitTopLevelNestedNoStack(node);
    } finally {
      this.popNode(grandparent);
    }
  }

  visitTopLevelNestedNoStack(node: AstNode): AstNode | undefined {
    switch (node.kind) {
      case Kind.VariableStatement: return this.visitTopLevelNestedVariableStatement(node as unknown as VariableStatement);
      case Kind.ForStatement: return this.visitTopLevelNestedForStatement(node as unknown as ForStatement);
      case Kind.ForInStatement: case Kind.ForOfStatement: return this.visitTopLevelNestedForInOrOfStatement(node as unknown as ForInOrOfStatement);
      case Kind.DoStatement: return this.visitTopLevelNestedDoStatement(node as unknown as DoStatement);
      case Kind.WhileStatement: return this.visitTopLevelNestedWhileStatement(node as unknown as WhileStatement);
      case Kind.LabeledStatement: return this.visitTopLevelNestedLabeledStatement(node as unknown as LabeledStatement);
      case Kind.WithStatement: return this.visitTopLevelNestedWithStatement(node as unknown as WithStatement);
      case Kind.IfStatement: return this.visitTopLevelNestedIfStatement(node as unknown as IfStatement);
      case Kind.SwitchStatement: return this.visitTopLevelNestedSwitchStatement(node as unknown as SwitchStatement);
      case Kind.CaseBlock: return this.visitTopLevelNestedCaseBlock(node as unknown as CaseBlock);
      case Kind.CaseClause: case Kind.DefaultClause: return this.visitTopLevelNestedCaseOrDefaultClause(node);
      case Kind.TryStatement: return this.visitTopLevelNestedTryStatement(node as unknown as TryStatement);
      case Kind.CatchClause: return this.visitTopLevelNestedCatchClause(node as unknown as CatchClause);
      case Kind.Block: return this.visitTopLevelNestedBlock(node as unknown as Block);
      default: return this.visitNoStack(node, false);
    }
  }

  visit(node: AstNode): AstNode | undefined {
    const grandparent = this.pushNode(node);
    try {
      return this.visitNoStack(node, false);
    } finally {
      this.popNode(grandparent);
    }
  }

  visitNoStack(node: AstNode, resultIsDiscarded: boolean): AstNode | undefined {
    if (!isSourceFile(node) && (subtreeFacts(node) & (SubtreeFacts.ContainsDynamicImport | SubtreeFacts.ContainsIdentifier)) === 0) {
      return node;
    }
    switch (node.kind) {
      case Kind.SourceFile: return this.visitSourceFile(node as unknown as SourceFile);
      case Kind.ForStatement: return this.visitForStatement(node as unknown as ForStatement);
      case Kind.ForInStatement: case Kind.ForOfStatement: return this.visitForInOrOfStatement(node as unknown as ForInOrOfStatement);
      case Kind.ExpressionStatement: return this.visitExpressionStatement(node as unknown as ExpressionStatement);
      case Kind.VoidExpression: return this.visitVoidExpression(node as unknown as VoidExpression);
      case Kind.ParenthesizedExpression: return this.visitParenthesizedExpression(node as unknown as ParenthesizedExpression, resultIsDiscarded);
      case Kind.PartiallyEmittedExpression: return this.visitPartiallyEmittedExpression(node as unknown as PartiallyEmittedExpression, resultIsDiscarded);
      case Kind.CallExpression: return this.visitCallExpression(node as unknown as CallExpression);
      case Kind.TaggedTemplateExpression: return this.visitTaggedTemplateExpression(node as unknown as TaggedTemplateExpression);
      case Kind.BinaryExpression: return this.visitBinaryExpression(node as unknown as BinaryExpression, resultIsDiscarded);
      case Kind.PrefixUnaryExpression: return this.visitPrefixUnaryExpression(node as unknown as PrefixUnaryExpression, resultIsDiscarded);
      case Kind.PostfixUnaryExpression: return this.visitPostfixUnaryExpression(node as unknown as PostfixUnaryExpression, resultIsDiscarded);
      case Kind.ShorthandPropertyAssignment: return this.visitShorthandPropertyAssignment(node as unknown as ShorthandPropertyAssignment);
      case Kind.Identifier: return this.visitIdentifier(node as unknown as IdentifierNode);
      default: return this.visitor().visitEachChild(node);
    }
  }

  visitDiscardedValue(node: AstNode): AstNode | undefined {
    const grandparent = this.pushNode(node);
    try { return this.visitNoStack(node, true); } finally { this.popNode(grandparent); }
  }

  visitAssignmentPattern(node: AstNode): AstNode | undefined {
    const grandparent = this.pushNode(node);
    try { return this.visitAssignmentPatternNoStack(node); } finally { this.popNode(grandparent); }
  }

  visitAssignmentPatternNoStack(node: AstNode): AstNode | undefined {
    switch (node.kind) {
      case Kind.ObjectLiteralExpression: case Kind.ArrayLiteralExpression:
        return this.assignmentPatternVisitor.visitEachChild(node);
      case Kind.PropertyAssignment: return this.visitAssignmentProperty(node as unknown as PropertyAssignment);
      case Kind.ShorthandPropertyAssignment: return this.visitShorthandAssignmentProperty(node as unknown as ShorthandPropertyAssignment);
      case Kind.SpreadAssignment: return this.visitAssignmentRestProperty(node as unknown as SpreadAssignment);
      case Kind.SpreadElement: return this.visitAssignmentRestElement(node as unknown as SpreadElement);
      default:
        if (isExpression(node)) return this.visitAssignmentElement(node);
        return this.visitNoStack(node, false);
    }
  }

  // -------------------------------------------------------------------------
  // Source file
  // -------------------------------------------------------------------------

  visitSourceFile(node: SourceFile): AstNode {
    if (
      sourceFileIsDeclarationFile(node) ||
      !(isEffectiveExternalModule(node, this.compilerOptions) || (subtreeFacts(node as unknown as AstNode) & SubtreeFacts.ContainsDynamicImport) !== 0)
    ) {
      return node as unknown as AstNode;
    }

    this.currentSourceFile = node;
    this.currentModuleInfo = collectExternalModuleInfo(node, this.compilerOptions, this.emitContext() as unknown as never, this.resolver as unknown as never);
    const updated = this.transformCommonJSModule(node);
    this.currentSourceFile = undefined;
    this.currentModuleInfo = undefined;
    return updated;
  }

  shouldEmitUnderscoreUnderscoreESModule(): boolean {
    if (
      fileExtensionIsOneOf(sourceFileFileName(this.currentSourceFile!), supportedJSExtensionsFlat) &&
      sourceFileCommonJSModuleIndicator(this.currentSourceFile!) !== undefined &&
      (sourceFileExternalModuleIndicator(this.currentSourceFile!) === undefined ||
        sourceFileExternalModuleIndicator(this.currentSourceFile!)!.kind === Kind.SourceFile)
    ) {
      return false;
    }
    if (this.currentModuleInfo!.exportEquals === undefined && isExternalModule(this.currentSourceFile!)) return true;
    return false;
  }

  createUnderscoreUnderscoreESModule(): AstNode {
    const f = this.factory();
    const statement = f.newExpressionStatement(
      f.newCallExpression(
        f.newPropertyAccessExpression(f.newIdentifier("Object"), undefined, f.newIdentifier("defineProperty"), NodeFlags.None),
        undefined,
        undefined,
        f.newNodeList([
          f.newIdentifier("exports"),
          f.newStringLiteral("__esModule", TokenFlags.None),
          f.newObjectLiteralExpression(
            f.newNodeList([
              f.newPropertyAssignment(undefined, f.newIdentifier("value"), undefined, undefined, f.newTrueExpression()),
            ]),
            false,
          ),
        ]),
        NodeFlags.None,
      ),
    );
    this.emitContext().setEmitFlags(statement, EmitFlags.CustomPrologue);
    return statement;
  }

  transformCommonJSModule(node: SourceFile): AstNode {
    this.emitContext().startVariableEnvironment();

    const { prologue, rest: rest0 } = this.factory().splitStandardPrologue(sourceFileStatementsRO(node));
    let statements: AstNode[] = [...prologue];
    const { custom, rest } = this.factory().splitCustomPrologue(rest0);
    statements = [...statements, ...this.topLevelVisitor.visitSlice(custom).items];

    if (this.shouldEmitUnderscoreUnderscoreESModule()) statements.push(this.createUnderscoreUnderscoreESModule());

    const info = this.currentModuleInfo!;
    if (info.exportedNames.length > 0) {
      const chunkSize = 50;
      const l = info.exportedNames.length;
      for (let i = 0; i < l; i += chunkSize) {
        let right: AstNode = this.factory().newVoidZeroExpression();
        for (const nextId of info.exportedNames.slice(i, Math.min(i + chunkSize, l))) {
          let left: AstNode;
          if (nextId.kind === Kind.StringLiteral) {
            left = this.factory().newElementAccessExpression(
              this.factory().newIdentifier("exports"),
              undefined,
              this.factory().newStringLiteralFromNode(nextId),
              NodeFlags.None,
            );
          } else {
            const name = cloneNode(nextId, this.factory());
            this.emitContext().setEmitFlags(name, EmitFlags.NoSourceMap | EmitFlags.NoComments);
            left = this.factory().newPropertyAccessExpression(this.factory().newIdentifier("exports"), undefined, name, NodeFlags.None);
          }
          right = this.factory().newAssignmentExpression(left, right);
        }
        const statement = this.factory().newExpressionStatement(right);
        this.emitContext().addEmitFlags(statement, EmitFlags.CustomPrologue);
        statements.push(statement);
      }
    }

    const exportedFunctionsStart = statements.length;
    for (const fnDecl of info.exportedFunctions) {
      statements = this.appendExportsOfClassOrFunctionDeclaration(statements, fnDecl);
    }
    for (const s of statements.slice(exportedFunctionsStart)) this.emitContext().addEmitFlags(s, EmitFlags.CustomPrologue);

    const visitedRest = this.topLevelVisitor.visitSlice(rest).items;
    statements = [...statements, ...visitedRest];
    statements = this.appendExportEqualsIfNeeded(statements);
    statements = [...this.emitContext().endAndMergeVariableEnvironment(statements)];

    const statementList = this.factory().newNodeList(statements);
    setLoc(statementList, sourceFileStatementsLoc(node));
    let result = this.factory().updateSourceFile(node, statementList, sourceFileEndOfFileToken(node)) as unknown as SourceFile;
    this.emitContext().addEmitHelpers(result as unknown as AstNode, this.emitContext().readEmitHelpers());

    const externalHelpersImportDeclaration = createExternalHelpersImportDeclarationIfNeeded(
      this.emitContext() as unknown as never,
      result,
      this.compilerOptions,
      this.getEmitModuleFormatOfFile(node),
      false,
      false,
      false,
    );
    if (externalHelpersImportDeclaration !== undefined) {
      const { prologue, rest: r0 } = this.factory().splitStandardPrologue(sourceFileStatementsRO(result));
      const { custom, rest } = this.factory().splitCustomPrologue(r0);
      const merged: AstNode[] = [...prologue, ...custom, this.topLevelVisitor.visitNode(externalHelpersImportDeclaration)!, ...rest];
      const newList = this.factory().newNodeList(merged);
      setLoc(newList, sourceFileStatementsLoc(result));
      result = this.factory().updateSourceFile(result, newList, sourceFileEndOfFileToken(node)) as unknown as SourceFile;
    }
    return result as unknown as AstNode;
  }

  // -------------------------------------------------------------------------
  // export = handling
  // -------------------------------------------------------------------------

  appendExportEqualsIfNeeded(statements: AstNode[]): AstNode[] {
    const exportEquals = this.currentModuleInfo!.exportEquals;
    if (exportEquals !== undefined) {
      const expressionResult = this.visitExportEquals(exportEquals);
      if (expressionResult !== undefined) {
        const statement = this.factory().newExpressionStatement(
          this.factory().newAssignmentExpression(
            this.factory().newPropertyAccessExpression(this.factory().newIdentifier("module"), undefined, this.factory().newIdentifier("exports"), NodeFlags.None),
            expressionResult,
          ),
        );
        this.emitContext().assignCommentAndSourceMapRanges(statement, exportEquals as unknown as AstNode);
        this.emitContext().addEmitFlags(statement, EmitFlags.NoComments);
        return [...statements, statement];
      }
    }
    return statements;
  }

  visitExportEquals(node: ExportAssignment): AstNode {
    const grandparent = this.pushNode(node as unknown as AstNode);
    try {
      return this.visitor().visitNode(exportAssignmentExpression(node));
    } finally {
      this.popNode(grandparent);
    }
  }

  // -------------------------------------------------------------------------
  // Export emission helpers
  // -------------------------------------------------------------------------

  appendExportsOfImportDeclaration(statements: AstNode[], decl: ImportDeclaration): AstNode[] {
    if (this.currentModuleInfo!.exportEquals !== undefined) return statements;
    const importClause = importDeclarationImportClause(decl);
    if (importClause === undefined) return statements;

    const seen = new Set<string>();
    if (importClauseName(importClause) !== undefined) {
      statements = this.appendExportsOfDeclaration(statements, importClause, seen, false);
    }
    const namedBindings = importClauseNamedBindings(importClause);
    if (namedBindings !== undefined) {
      switch (namedBindings.kind) {
        case Kind.NamespaceImport:
          statements = this.appendExportsOfDeclaration(statements, namedBindings, seen, false);
          break;
        case Kind.NamedImports:
          for (const binding of namedElements(namedBindings)) {
            statements = this.appendExportsOfDeclaration(statements, binding, seen, true);
          }
          break;
      }
    }
    return statements;
  }

  appendExportsOfVariableStatement(statements: AstNode[], node: VariableStatement): AstNode[] {
    return this.appendExportsOfVariableDeclarationList(statements, variableStatementDeclarationListRO(node), false);
  }

  appendExportsOfVariableDeclarationList(statements: AstNode[], node: AstNode, isForInOrOfInitializer: boolean): AstNode[] {
    if (this.currentModuleInfo!.exportEquals !== undefined) return statements;
    for (const decl of variableDeclarationListDeclarationsRO(node)) {
      statements = this.appendExportsOfBindingElement(statements, decl, isForInOrOfInitializer);
    }
    return statements;
  }

  appendExportsOfBindingElement(statements: AstNode[], decl: AstNode, isForInOrOfInitializer: boolean): AstNode[] {
    if (this.currentModuleInfo!.exportEquals !== undefined || nodeName(decl) === undefined) return statements;
    const name = nodeName(decl)!;
    if (isBindingPattern(name)) {
      for (const element of bindingPatternElements(name)) {
        if (!isOmittedExpression(element)) {
          statements = this.appendExportsOfBindingElement(statements, element, isForInOrOfInitializer);
        }
      }
    } else if (
      !isGeneratedIdentifier(this.emitContext() as unknown as never, name as never) &&
      (!isVariableDeclaration(decl) || nodeInitializerOf(decl) !== undefined || isForInOrOfInitializer)
    ) {
      statements = this.appendExportsOfDeclaration(statements, decl, undefined, false);
    }
    return statements;
  }

  appendExportsOfClassOrFunctionDeclaration(statements: AstNode[], decl: AstNode): AstNode[] {
    if (this.currentModuleInfo!.exportEquals !== undefined) return statements;
    const seen = new Set<string>();
    if (hasSyntacticModifier(decl, ModifierFlags.Export)) {
      let exportName: AstNode;
      if (hasSyntacticModifier(decl, ModifierFlags.Default)) {
        exportName = this.factory().newIdentifier("default");
      } else {
        exportName = this.factory().getDeclarationName(decl);
      }
      const exportValue = this.factory().getLocalName(decl);
      statements = this.appendExportStatement(statements, seen, exportName, exportValue, nodeLoc(decl), false, false);
    }
    if (nodeName(decl) !== undefined) {
      return this.appendExportsOfDeclaration(statements, decl, seen, false);
    }
    return statements;
  }

  appendExportsOfDeclaration(statements: AstNode[], decl: AstNode, seen: Set<string> | undefined, liveBinding: boolean): AstNode[] {
    if (this.currentModuleInfo!.exportEquals !== undefined) return statements;
    if (seen === undefined) seen = new Set();
    const name = nodeName(decl);
    if (this.currentModuleInfo!.exportSpecifiers.size > 0 && name !== undefined && isIdentifier(name)) {
      const declName = this.factory().getDeclarationName(decl);
      const exportSpecifiers = this.currentModuleInfo!.exportSpecifiers.get(nodeText(declName));
      if (exportSpecifiers !== undefined && exportSpecifiers.length > 0) {
        const exportValue = this.visitExpressionIdentifier(declName as unknown as IdentifierNode);
        for (const exportSpecifier of exportSpecifiers) {
          statements = this.appendExportStatement(
            statements,
            seen,
            exportSpecifierName(exportSpecifier),
            exportValue,
            nodeLoc(exportSpecifierName(exportSpecifier)),
            false,
            liveBinding,
          );
        }
      }
    }
    return statements;
  }

  appendExportStatement(
    statements: AstNode[],
    seen: Set<string>,
    exportName: AstNode,
    expression: AstNode,
    location: unknown,
    allowComments: boolean,
    liveBinding: boolean,
  ): AstNode[] {
    if (exportName.kind !== Kind.StringLiteral) {
      if (seen.has(nodeText(exportName))) return statements;
      seen.add(nodeText(exportName));
    }
    return [...statements, this.createExportStatement(exportName, expression, location, allowComments, liveBinding)];
  }

  createExportStatement(name: AstNode, value: AstNode, location: unknown, allowComments: boolean, liveBinding: boolean): AstNode {
    const statement = this.factory().newExpressionStatement(this.createExportExpression(name, value, undefined, liveBinding));
    if (location !== undefined) this.emitContext().setCommentRange(statement, location);
    this.emitContext().addEmitFlags(statement, EmitFlags.StartOnNewLine);
    if (!allowComments) this.emitContext().addEmitFlags(statement, EmitFlags.NoComments);
    return statement;
  }

  createExportExpression(name: AstNode, value: AstNode, location: unknown, liveBinding: boolean): AstNode {
    const f = this.factory();
    let expression: AstNode;
    if (liveBinding) {
      expression = f.newCallExpression(
        f.newPropertyAccessExpression(f.newIdentifier("Object"), undefined, f.newIdentifier("defineProperty"), NodeFlags.None),
        undefined,
        undefined,
        f.newNodeList([
          f.newIdentifier("exports"),
          f.newStringLiteralFromNode(name),
          f.newObjectLiteralExpression(
            f.newNodeList([
              f.newPropertyAssignment(undefined, f.newIdentifier("enumerable"), undefined, undefined, f.newTrueExpression()),
              f.newPropertyAssignment(
                undefined,
                f.newIdentifier("get"),
                undefined,
                undefined,
                f.newFunctionExpression(
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  f.newNodeList<AstNode>([]),
                  undefined,
                  undefined,
                  f.newBlock(f.newNodeList([f.newReturnStatement(value)]), false),
                ),
              ),
            ]),
            false,
          ),
        ]),
        NodeFlags.None,
      );
    } else {
      let left: AstNode;
      if (name.kind === Kind.StringLiteral) {
        left = f.newElementAccessExpression(f.newIdentifier("exports"), undefined, f.newStringLiteralFromNode(name), NodeFlags.None);
      } else {
        left = f.newPropertyAccessExpression(f.newIdentifier("exports"), undefined, cloneNode(name, f), NodeFlags.None);
      }
      expression = f.newAssignmentExpression(left, value);
    }
    if (location !== undefined) this.emitContext().setCommentRange(expression, location);
    return expression;
  }

  createRequireCall(node: AstNode): AstNode {
    const args: AstNode[] = [];
    const moduleName = getExternalModuleNameLiteral(this.factory(), node, this.currentSourceFile!, undefined, this.resolver as unknown as never, this.compilerOptions);
    if (moduleName !== undefined) {
      args.push(rewriteModuleSpecifier(this.emitContext(), moduleName, this.compilerOptions)!);
    }
    return this.factory().newCallExpression(this.factory().newIdentifier("require"), undefined, undefined, this.factory().newNodeList(args), NodeFlags.None);
  }

  getHelperExpressionForExport(node: ExportDeclaration, innerExpr: AstNode): AstNode {
    if (getExportNeedsImportStarHelper(node)) return this.visitor().visitNode(this.factory().newImportStarHelper(innerExpr));
    return innerExpr;
  }

  getHelperExpressionForImport(node: ImportDeclaration, innerExpr: AstNode): AstNode {
    if (getImportNeedsImportStarHelper(node)) return this.visitor().visitNode(this.factory().newImportStarHelper(innerExpr));
    if (getImportNeedsImportDefaultHelper(node)) return this.visitor().visitNode(this.factory().newImportDefaultHelper(innerExpr));
    return innerExpr;
  }

  // -------------------------------------------------------------------------
  // Per-kind top-level handlers
  // -------------------------------------------------------------------------

  visitTopLevelImportDeclaration(node: ImportDeclaration): AstNode | undefined {
    if (importDeclarationImportClause(node) === undefined) {
      const statement = this.factory().newExpressionStatement(this.createRequireCall(node as unknown as AstNode));
      this.emitContext().setOriginal(statement, node as unknown as AstNode);
      this.emitContext().assignCommentAndSourceMapRanges(statement, node as unknown as AstNode);
      return statement;
    }

    let statements: AstNode[] = [];
    const variables: AstNode[] = [];
    const namespaceDeclaration = getNamespaceDeclarationNode(node as unknown as AstNode);
    if (namespaceDeclaration !== undefined && !isDefaultImport(node as unknown as AstNode)) {
      variables.push(
        this.factory().newVariableDeclaration(
          cloneNode(nodeName(namespaceDeclaration)!, this.factory()),
          undefined,
          undefined,
          this.getHelperExpressionForImport(node, this.createRequireCall(node as unknown as AstNode)),
        ),
      );
    } else {
      variables.push(
        this.factory().newVariableDeclaration(
          this.factory().newGeneratedNameForNode(node as unknown as AstNode),
          undefined,
          undefined,
          this.getHelperExpressionForImport(node, this.createRequireCall(node as unknown as AstNode)),
        ),
      );
      if (namespaceDeclaration !== undefined && isDefaultImport(node as unknown as AstNode)) {
        variables.push(
          this.factory().newVariableDeclaration(
            cloneNode(nodeName(namespaceDeclaration)!, this.factory()),
            undefined,
            undefined,
            this.factory().newGeneratedNameForNode(node as unknown as AstNode),
          ),
        );
      }
    }

    const varStatement = this.factory().newVariableStatement(
      undefined,
      this.factory().newVariableDeclarationList(this.factory().newNodeList(variables), NodeFlags.Const),
    );
    this.emitContext().setOriginal(varStatement, node as unknown as AstNode);
    this.emitContext().assignCommentAndSourceMapRanges(varStatement, node as unknown as AstNode);
    statements.push(varStatement);
    statements = this.appendExportsOfImportDeclaration(statements, node);
    return singleOrMany(statements, this.factory());
  }

  visitTopLevelImportEqualsDeclaration(node: ImportEqualsDeclaration): AstNode {
    if (!isExternalModuleImportEqualsDeclaration(node as unknown as AstNode)) {
      throw new Error("import= for internal module references should be handled in an earlier transformer.");
    }

    let statements: AstNode[] = [];
    if (hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export)) {
      const statement = this.factory().newExpressionStatement(
        this.createExportExpression(importEqualsName(node), this.createRequireCall(node as unknown as AstNode), nodeLoc(node as unknown as AstNode), false),
      );
      this.emitContext().setOriginal(statement, node as unknown as AstNode);
      this.emitContext().assignCommentAndSourceMapRanges(statement, node as unknown as AstNode);
      statements.push(statement);
    } else {
      const statement = this.factory().newVariableStatement(
        undefined,
        this.factory().newVariableDeclarationList(
          this.factory().newNodeList([
            this.factory().newVariableDeclaration(cloneNode(importEqualsName(node), this.factory()), undefined, undefined, this.createRequireCall(node as unknown as AstNode)),
          ]),
          NodeFlags.Const,
        ),
      );
      this.emitContext().setOriginal(statement, node as unknown as AstNode);
      this.emitContext().assignCommentAndSourceMapRanges(statement, node as unknown as AstNode);
      statements.push(statement);
    }
    statements = this.appendExportsOfDeclaration(statements, node as unknown as AstNode, undefined, false);
    return singleOrMany(statements, this.factory());
  }

  visitTopLevelExportDeclaration(node: ExportDeclaration): AstNode | undefined {
    const moduleSpecifier = exportDeclarationModuleSpecifier(node);
    if (moduleSpecifier === undefined) return undefined;

    const generatedName = this.factory().newGeneratedNameForNode(node as unknown as AstNode);
    const exportClause = exportDeclarationExportClause(node);
    if (exportClause !== undefined && isNamedExports(exportClause)) {
      const statements: AstNode[] = [];
      const varStatement = this.factory().newVariableStatement(
        undefined,
        this.factory().newVariableDeclarationList(
          this.factory().newNodeList([
            this.factory().newVariableDeclaration(generatedName, undefined, undefined, this.createRequireCall(node as unknown as AstNode)),
          ]),
          NodeFlags.None,
        ),
      );
      this.emitContext().setOriginal(varStatement, node as unknown as AstNode);
      this.emitContext().assignCommentAndSourceMapRanges(varStatement, node as unknown as AstNode);
      statements.push(varStatement);

      for (const specifier of namedExportsElements(exportClause)) {
        const specifierName = exportSpecifierPropertyNameOrName(specifier);
        const exportNeedsImportDefault = moduleExportNameIsDefault(specifierName);
        const target = exportNeedsImportDefault ? this.factory().newImportDefaultHelper(generatedName) : generatedName;
        let exportName: AstNode;
        if (isStringLiteral(exportSpecifierName(specifier))) {
          exportName = this.factory().newStringLiteralFromNode(exportSpecifierName(specifier));
        } else {
          exportName = this.factory().getExportName(specifier);
        }
        let exportedValue: AstNode;
        if (isStringLiteral(specifierName)) {
          exportedValue = this.factory().newElementAccessExpression(target, undefined, specifierName, NodeFlags.None);
        } else {
          exportedValue = this.factory().newPropertyAccessExpression(target, undefined, specifierName, NodeFlags.None);
        }
        const statement = this.factory().newExpressionStatement(this.createExportExpression(exportName, exportedValue, undefined, true));
        this.emitContext().setOriginal(statement, specifier);
        this.emitContext().assignCommentAndSourceMapRanges(statement, specifier);
        statements.push(statement);
      }
      return singleOrMany(statements, this.factory());
    }

    if (exportClause !== undefined) {
      let exportName: AstNode;
      const name = nodeName(exportClause)!;
      if (isStringLiteral(name)) exportName = this.factory().newStringLiteralFromNode(name);
      else exportName = cloneNode(name, this.factory());
      const statement = this.factory().newExpressionStatement(
        this.createExportExpression(exportName, this.getHelperExpressionForExport(node, this.createRequireCall(node as unknown as AstNode)), undefined, false),
      );
      this.emitContext().setOriginal(statement, node as unknown as AstNode);
      this.emitContext().assignCommentAndSourceMapRanges(statement, node as unknown as AstNode);
      return statement;
    }

    const statement = this.factory().newExpressionStatement(
      this.visitor().visitNode(this.factory().newExportStarHelper(this.createRequireCall(node as unknown as AstNode), this.factory().newIdentifier("exports"))),
    );
    this.emitContext().setOriginal(statement, node as unknown as AstNode);
    this.emitContext().assignCommentAndSourceMapRanges(statement, node as unknown as AstNode);
    return statement;
  }

  visitTopLevelExportAssignment(node: ExportAssignment): AstNode | undefined {
    if (exportAssignmentIsExportEquals(node)) return undefined;
    return this.createExportStatement(
      this.factory().newIdentifier("default"),
      this.visitor().visitNode(exportAssignmentExpression(node)),
      nodeLoc(node as unknown as AstNode),
      true,
      false,
    );
  }

  visitTopLevelFunctionDeclaration(node: FunctionDeclaration): AstNode {
    if (hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export)) {
      return this.factory().updateFunctionDeclaration(
        node,
        extractModifiers(this.emitContext() as unknown as never, functionDeclarationModifiers(node), ~ModifierFlags.ExportDefault),
        functionAsteriskTokenRO(node),
        this.factory().getDeclarationName(node as unknown as AstNode),
        undefined,
        this.visitor().visitNodes(functionDeclarationParameters(node)),
        undefined,
        undefined,
        this.visitor().visitNode(functionDeclarationBody(node)!),
      );
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitTopLevelClassDeclaration(node: ClassDeclaration): AstNode {
    let statements: AstNode[] = [];
    if (hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export)) {
      statements.push(
        this.factory().updateClassDeclaration(
          node,
          this.visitor().visitModifiers(extractModifiers(this.emitContext() as unknown as never, classDeclarationModifiers(node), ~ModifierFlags.ExportDefault)),
          this.factory().getDeclarationName(node as unknown as AstNode),
          undefined,
          this.visitor().visitNodes(classDeclarationHeritageClauses(node)),
          this.visitor().visitNodes(classDeclarationMembers(node)),
        ),
      );
    } else {
      statements.push(this.visitor().visitEachChild(node as unknown as AstNode));
    }
    statements = this.appendExportsOfClassOrFunctionDeclaration(statements, node as unknown as AstNode);
    return singleOrMany(statements, this.factory());
  }

  visitTopLevelVariableStatement(node: VariableStatement): AstNode {
    // Detailed export-decomposition logic: when var is exported with an initializer, rewrite
    // each declaration to an exports.x = ... assignment expression, otherwise preserve.
    // See TS-Go for the full implementation; this preserves the structural shape.
    let statements: AstNode[] = [];
    if (hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export)) {
      let variables: AstNode[] = [];
      let expressions: AstNode[] = [];
      let modifiers: AstNode | undefined;

      const commitVariables = () => {
        if (variables.length > 0) {
          const variableList = this.factory().newNodeList(variables);
          const statement = this.factory().updateVariableStatement(
            node,
            modifiers,
            this.factory().updateVariableDeclarationList(variableStatementDeclarationListRO(node), variableList, nodeFlags(variableStatementDeclarationListRO(node) as unknown as AstNode)),
          );
          if (statements.length > 0) this.emitContext().addEmitFlags(statement, EmitFlags.NoComments);
          statements.push(statement);
          variables = [];
        }
      };

      const commitExpressions = () => {
        if (expressions.length > 0) {
          const statement = this.factory().newExpressionStatement(this.factory().inlineExpressions(expressions));
          this.emitContext().assignCommentAndSourceMapRanges(statement, node as unknown as AstNode);
          if (statements.length > 0) this.emitContext().addEmitFlags(statement, EmitFlags.NoComments);
          statements.push(statement);
          expressions = [];
        }
      };

      const pushVariable = (v: AstNode) => { commitExpressions(); variables.push(v); };
      const pushExpression = (e: AstNode) => { commitVariables(); expressions.push(e); };

      for (let variable of variableDeclarationListDeclarationsRO(variableStatementDeclarationListRO(node))) {
        const v = variable as unknown as VariableDeclaration;
        const vName = variableDeclarationNameRO(v);
        const vInit = variableDeclarationInitializerRO(v);
        if (isIdentifier(vName) && isLocalName(this.emitContext() as unknown as never, vName as never)) {
          if (modifiers === undefined) {
            modifiers = extractModifiers(this.emitContext() as unknown as never, variableStatementModifiers(node), ~ModifierFlags.ExportDefault);
          }
          if (vInit !== undefined) {
            variable = this.factory().updateVariableDeclaration(
              v,
              vName,
              undefined,
              undefined,
              this.createExportExpression(vName, this.visitor().visitNode(vInit), undefined, false),
            );
          }
          pushVariable(variable);
        } else if (vInit !== undefined && !isBindingPattern(vName) && (isArrowFunction(vInit) || isFunctionExpression(vInit) || isClassExpression(vInit))) {
          pushVariable(this.factory().newVariableDeclaration(vName, variableDeclarationExclamationTokenRO(v), variableDeclarationTypeRO(v), this.visitor().visitNode(vInit)));
          const propertyAccess = this.factory().newPropertyAccessExpression(this.factory().newIdentifier("exports"), undefined, vName, NodeFlags.None);
          this.emitContext().assignCommentAndSourceMapRanges(propertyAccess, vName);
          pushExpression(this.factory().newAssignmentExpression(propertyAccess, cloneNode(vName, this.factory())));
        } else if (isIdentifier(vName)) {
          const expression = this.transformInitializedVariable(v);
          if (expression !== undefined) pushExpression(this.visitor().visitNode(expression));
        } else if (isBindingPattern(vName)) {
          const expression = this.transformInitializedVariable(v);
          if (expression !== undefined) pushExpression(expression);
        } else {
          const expression = convertVariableDeclarationToAssignmentExpression(this.emitContext() as unknown as never, v);
          if (expression !== undefined) pushExpression(this.visitor().visitNode(expression));
        }
      }

      commitVariables();
      commitExpressions();
      statements = this.appendExportsOfVariableStatement(statements, node);
      return singleOrMany(statements, this.factory());
    }
    return this.visitTopLevelNestedVariableStatement(node);
  }

  transformInitializedVariable(node: VariableDeclaration): AstNode | undefined {
    const init = variableDeclarationInitializerRO(node);
    if (init === undefined) return undefined;
    const name = variableDeclarationNameRO(node);
    if (isBindingPattern(name)) {
      return flattenDestructuringAssignment(
        this,
        this.visitor().visitNode(node as unknown as AstNode),
        false,
        FlattenLevel.All,
        (n, v, l) => this.createAllExportExpressions(n, v, l),
      );
    }
    const propertyAccess = this.factory().newPropertyAccessExpression(this.factory().newIdentifier("exports"), undefined, name, NodeFlags.None);
    this.emitContext().assignCommentAndSourceMapRanges(propertyAccess, name);
    return this.factory().newAssignmentExpression(propertyAccess, init);
  }

  visitTopLevelNestedVariableStatement(node: VariableStatement): AstNode {
    let statements: AstNode[] = [this.visitor().visitEachChild(node as unknown as AstNode)];
    statements = this.appendExportsOfVariableStatement(statements, node);
    return singleOrMany(statements, this.factory());
  }

  visitTopLevelNestedForStatement(node: ForStatement): AstNode {
    const initializer = forInitializerRO(node);
    if (initializer !== undefined && isVariableDeclarationList(initializer) && (nodeFlags(initializer) & NodeFlags.BlockScoped) === 0) {
      const exportStatements = this.appendExportsOfVariableDeclarationList([], initializer, false);
      if (exportStatements.length > 0) {
        const statements: AstNode[] = [];
        const varDeclList = this.discardedValueVisitor.visitNode(initializer);
        statements.push(this.factory().newVariableStatement(undefined, varDeclList));
        for (const s of exportStatements) statements.push(s);
        const condition = this.visitor().visitNode(forConditionRO(node));
        const incrementor = this.discardedValueVisitor.visitNode(forIncrementorRO(node));
        const body = this.emitContext().visitIterationBody(forBodyRO(node), this.topLevelNestedVisitor);
        statements.push(this.factory().updateForStatement(node, undefined, condition, incrementor, body));
        return singleOrMany(statements, this.factory());
      }
    }
    return this.factory().updateForStatement(
      node,
      this.discardedValueVisitor.visitNode(initializer),
      this.visitor().visitNode(forConditionRO(node)),
      this.discardedValueVisitor.visitNode(forIncrementorRO(node)),
      this.emitContext().visitIterationBody(forBodyRO(node), this.topLevelNestedVisitor),
    );
  }

  visitTopLevelNestedForInOrOfStatement(node: ForInOrOfStatement): AstNode {
    const initializer = forInOrOfInitializerRO(node);
    if (isVariableDeclarationList(initializer) && (nodeFlags(initializer) & NodeFlags.BlockScoped) === 0) {
      const exportStatements = this.appendExportsOfVariableDeclarationList([], initializer, true);
      if (exportStatements.length > 0) {
        const visitedInitializer = this.discardedValueVisitor.visitNode(initializer);
        const expression = this.visitor().visitNode(forInOrOfExpressionRO(node));
        let body = this.emitContext().visitIterationBody(forInOrOfBodyRO(node), this.topLevelNestedVisitor);
        if (isBlockNode(body)) {
          const block = body as unknown as Block;
          const stmts = [...exportStatements, ...blockStatementsRO(block)];
          const bodyList = this.factory().newNodeList(stmts);
          setLoc(bodyList, blockStatementsLoc(block));
          body = this.factory().updateBlock(block, bodyList, blockMultiLineRO(block));
        } else {
          body = this.factory().newBlock(this.factory().newNodeList([...exportStatements, body]), true);
        }
        return this.factory().updateForInOrOfStatement(node, forInOrOfAwaitModifierRO(node), visitedInitializer, expression, body);
      }
    }
    return this.factory().updateForInOrOfStatement(
      node,
      forInOrOfAwaitModifierRO(node),
      this.discardedValueVisitor.visitNode(initializer),
      this.visitor().visitNode(forInOrOfExpressionRO(node)),
      this.emitContext().visitIterationBody(forInOrOfBodyRO(node), this.topLevelNestedVisitor),
    );
  }

  visitTopLevelNestedDoStatement(node: DoStatement): AstNode {
    return this.factory().updateDoStatement(
      node,
      this.emitContext().visitIterationBody(doStatementStatement(node), this.topLevelNestedVisitor),
      this.visitor().visitNode(doStatementExpression(node)),
    );
  }

  visitTopLevelNestedWhileStatement(node: WhileStatement): AstNode {
    return this.factory().updateWhileStatement(
      node,
      this.visitor().visitNode(whileStatementExpression(node)),
      this.emitContext().visitIterationBody(whileStatementBody(node), this.topLevelNestedVisitor),
    );
  }

  visitTopLevelNestedLabeledStatement(node: LabeledStatement): AstNode {
    return this.factory().updateLabeledStatement(
      node,
      labeledStatementLabel(node),
      this.topLevelNestedVisitor.visitEmbeddedStatement(labeledStatementStatement(node)),
    );
  }

  visitTopLevelNestedWithStatement(node: WithStatement): AstNode {
    return this.factory().updateWithStatement(
      node,
      this.visitor().visitNode(withStatementExpression(node)),
      this.topLevelNestedVisitor.visitEmbeddedStatement(withStatementStatement(node)),
    );
  }

  visitTopLevelNestedIfStatement(node: IfStatement): AstNode {
    return this.factory().updateIfStatement(
      node,
      this.visitor().visitNode(ifStatementExpression(node)),
      this.topLevelNestedVisitor.visitEmbeddedStatement(ifStatementThen(node)),
      this.topLevelNestedVisitor.visitEmbeddedStatement(ifStatementElse(node)),
    );
  }

  visitTopLevelNestedSwitchStatement(node: SwitchStatement): AstNode {
    return this.factory().updateSwitchStatement(
      node,
      this.visitor().visitNode(switchStatementExpression(node)),
      this.topLevelNestedVisitor.visitNode(switchStatementCaseBlock(node)),
    );
  }

  visitTopLevelNestedCaseBlock(node: CaseBlock): AstNode {
    return this.topLevelNestedVisitor.visitEachChild(node as unknown as AstNode);
  }

  visitTopLevelNestedCaseOrDefaultClause(node: AstNode): AstNode {
    return this.factory().updateCaseOrDefaultClause(
      node,
      this.visitor().visitNode(caseClauseExpression(node)),
      this.topLevelNestedVisitor.visitNodes(caseClauseStatements(node)),
    );
  }

  visitTopLevelNestedTryStatement(node: TryStatement): AstNode {
    return this.topLevelNestedVisitor.visitEachChild(node as unknown as AstNode);
  }

  visitTopLevelNestedCatchClause(node: CatchClause): AstNode {
    return this.factory().updateCatchClause(
      node,
      catchClauseVariableDeclaration(node),
      this.topLevelNestedVisitor.visitNode(catchClauseBlock(node)),
    );
  }

  visitTopLevelNestedBlock(node: Block): AstNode {
    return this.topLevelNestedVisitor.visitEachChild(node as unknown as AstNode);
  }

  visitForStatement(node: ForStatement): AstNode {
    return this.factory().updateForStatement(
      node,
      this.discardedValueVisitor.visitNode(forInitializerRO(node)),
      this.visitor().visitNode(forConditionRO(node)),
      this.discardedValueVisitor.visitNode(forIncrementorRO(node)),
      this.emitContext().visitIterationBody(forBodyRO(node), this.topLevelNestedVisitor),
    );
  }

  visitForInOrOfStatement(node: ForInOrOfStatement): AstNode {
    return this.factory().updateForInOrOfStatement(
      node,
      forInOrOfAwaitModifierRO(node),
      this.discardedValueVisitor.visitNode(forInOrOfInitializerRO(node)),
      this.visitor().visitNode(forInOrOfExpressionRO(node)),
      this.emitContext().visitIterationBody(forInOrOfBodyRO(node), this.topLevelNestedVisitor),
    );
  }

  visitExpressionStatement(node: ExpressionStatement): AstNode {
    return this.discardedValueVisitor.visitEachChild(node as unknown as AstNode);
  }

  visitVoidExpression(node: VoidExpression): AstNode {
    return this.discardedValueVisitor.visitEachChild(node as unknown as AstNode);
  }

  visitParenthesizedExpression(node: ParenthesizedExpression, resultIsDiscarded: boolean): AstNode {
    const expression = (resultIsDiscarded ? this.discardedValueVisitor : this.visitor()).visitNode(parenthesizedExpressionRO(node));
    return this.factory().updateParenthesizedExpression(node, expression);
  }

  visitPartiallyEmittedExpression(node: PartiallyEmittedExpression, resultIsDiscarded: boolean): AstNode {
    const expression = (resultIsDiscarded ? this.discardedValueVisitor : this.visitor()).visitNode(partiallyEmittedExpressionRO(node));
    return this.factory().updatePartiallyEmittedExpression(node, expression);
  }

  visitBinaryExpression(node: BinaryExpression, resultIsDiscarded: boolean): AstNode {
    if (isDestructuringAssignment(node as unknown as AstNode)) return this.visitDestructuringAssignment(node, resultIsDiscarded);
    if (isAssignmentExpression(node as unknown as AstNode, false)) return this.visitAssignmentExpression(node);
    if (isCommaExpression(node as unknown as AstNode)) return this.visitCommaExpression(node, resultIsDiscarded);
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitAssignmentExpression(node: BinaryExpression): AstNode {
    const left = binaryLeft(node);
    if (
      isIdentifier(left) &&
      (!isGeneratedIdentifier(this.emitContext() as unknown as never, left as never) || isFileLevelReservedGeneratedIdentifier(this.emitContext() as unknown as never, left as never)) &&
      !isLocalName(this.emitContext() as unknown as never, left as never)
    ) {
      const exportedNames = this.getExports(left as unknown as IdentifierNode);
      if (exportedNames.length > 0) {
        let expression: AstNode = this.visitor().visitEachChild(node as unknown as AstNode);
        for (const exportName of exportedNames) {
          expression = this.createExportExpression(exportName, expression, nodeLoc(node as unknown as AstNode), false);
        }
        return expression;
      }
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitDestructuringAssignment(node: BinaryExpression, valueIsDiscarded: boolean): AstNode {
    if (this.destructuringNeedsFlattening(binaryLeft(node))) {
      return flattenDestructuringAssignment(
        this,
        node as unknown as AstNode,
        !valueIsDiscarded,
        FlattenLevel.All,
        (n, v, l) => this.createAllExportExpressions(n, v, l),
      );
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  destructuringNeedsFlattening(node: AstNode): boolean {
    if (isObjectLiteralExpression(node)) {
      for (const elem of objectLiteralProperties(node)) {
        switch (elem.kind) {
          case Kind.PropertyAssignment:
            if (this.destructuringNeedsFlattening(propertyAssignmentInitializerRO(elem))) return true;
            break;
          case Kind.ShorthandPropertyAssignment:
            if (this.destructuringNeedsFlattening(nodeName(elem)!)) return true;
            break;
          case Kind.SpreadAssignment:
            if (this.destructuringNeedsFlattening(spreadAssignmentExpressionRO(elem))) return true;
            break;
          case Kind.MethodDeclaration:
          case Kind.GetAccessor:
          case Kind.SetAccessor:
            return false;
        }
      }
    } else if (isArrayLiteralExpression(node)) {
      for (const elem of arrayLiteralElements(node)) {
        if (isSpreadElement(elem)) {
          if (this.destructuringNeedsFlattening(spreadElementExpressionRO(elem))) return true;
        } else if (this.destructuringNeedsFlattening(elem)) {
          return true;
        }
      }
    } else if (isIdentifier(node)) {
      const exportedNames = this.getExports(node as unknown as IdentifierNode);
      const threshold = isExportName(this.emitContext() as unknown as never, node as never) ? 1 : 0;
      return exportedNames.length > threshold;
    }
    return false;
  }

  createAllExportExpressions(name: IdentifierNode, value: AstNode, location: unknown): AstNode {
    const exportedNames = this.getExports(name);
    if (exportedNames.length > 0) {
      let expression: AstNode;
      if (this.isDirectExport(name)) {
        const exportName = cloneNode(name as unknown as AstNode, this.factory());
        this.emitContext().addEmitFlags(exportName, EmitFlags.NoComments | EmitFlags.NoSourceMap);
        const propertyAccess = this.factory().newPropertyAccessExpression(this.factory().newIdentifier("exports"), undefined, exportName, NodeFlags.None);
        this.emitContext().addEmitFlags(propertyAccess, EmitFlags.NoComments);
        expression = this.factory().newAssignmentExpression(propertyAccess, value);
        this.emitContext().assignCommentAndSourceMapRanges(expression, name as unknown as AstNode);
      } else {
        expression = this.factory().newAssignmentExpression(name as unknown as AstNode, value);
      }
      for (const exportName of exportedNames) {
        expression = this.createExportExpression(exportName, expression, location, false);
      }
      return expression;
    }
    if (this.isDirectExport(name)) {
      const exportName = cloneNode(name as unknown as AstNode, this.factory());
      this.emitContext().addEmitFlags(exportName, EmitFlags.NoComments | EmitFlags.NoSourceMap);
      const propertyAccess = this.factory().newPropertyAccessExpression(this.factory().newIdentifier("exports"), undefined, exportName, NodeFlags.None);
      this.emitContext().addEmitFlags(propertyAccess, EmitFlags.NoComments);
      const result = this.factory().newAssignmentExpression(propertyAccess, value);
      this.emitContext().assignCommentAndSourceMapRanges(result, name as unknown as AstNode);
      return result;
    }
    return this.factory().newAssignmentExpression(name as unknown as AstNode, value);
  }

  isDirectExport(name: IdentifierNode): boolean {
    const exportContainer = this.resolver.getReferencedExportContainer(this.emitContext().mostOriginal(name as unknown as AstNode)!, false);
    return exportContainer !== undefined && isSourceFile(exportContainer);
  }

  // Assignment-pattern visitors
  visitAssignmentProperty(node: PropertyAssignment): AstNode {
    return this.factory().updatePropertyAssignment(
      node,
      undefined,
      this.visitor().visitNode(propertyAssignmentNameRO(node)),
      undefined,
      undefined,
      this.assignmentPatternVisitor.visitNode(propertyAssignmentInitializerRO(node)),
    );
  }

  visitShorthandAssignmentProperty(node: ShorthandPropertyAssignment): AstNode {
    let target = this.visitDestructuringAssignmentTargetNoStack(shorthandPropertyAssignmentNameRO(node));
    if (isIdentifier(target)) {
      return this.factory().updateShorthandPropertyAssignment(
        node,
        undefined,
        target,
        undefined,
        undefined,
        shorthandEqualsTokenRO(node),
        this.visitor().visitNode(shorthandObjectAssignmentInitializerRO(node)!),
      );
    }
    if (shorthandObjectAssignmentInitializerRO(node) !== undefined) {
      let equalsToken = shorthandEqualsTokenRO(node);
      if (equalsToken === undefined) equalsToken = this.factory().newToken(Kind.EqualsToken);
      target = this.factory().newBinaryExpression(undefined, target, undefined, equalsToken, this.visitor().visitNode(shorthandObjectAssignmentInitializerRO(node)!));
    }
    const updated = this.factory().newPropertyAssignment(undefined, shorthandPropertyAssignmentNameRO(node), undefined, undefined, target);
    this.emitContext().setOriginal(updated, node as unknown as AstNode);
    this.emitContext().assignCommentAndSourceMapRanges(updated, node as unknown as AstNode);
    return updated;
  }

  visitAssignmentRestProperty(node: SpreadAssignment): AstNode {
    return this.factory().updateSpreadAssignment(node, this.visitDestructuringAssignmentTarget(spreadAssignmentExpressionRO(node)));
  }

  visitAssignmentRestElement(node: SpreadElement): AstNode {
    return this.factory().updateSpreadElement(node, this.visitDestructuringAssignmentTarget(spreadElementExpressionRO(node)));
  }

  visitAssignmentElement(node: AstNode): AstNode {
    if (isBinaryExpression(node)) {
      const opToken = binaryOperatorToken(node as unknown as BinaryExpression);
      if (binaryOperatorTokenKind(node as unknown as BinaryExpression) === Kind.EqualsToken) {
        return this.factory().updateBinaryExpression(
          node as unknown as BinaryExpression,
          undefined,
          this.visitDestructuringAssignmentTarget(binaryLeft(node as unknown as BinaryExpression)),
          undefined,
          opToken,
          this.visitor().visitNode(binaryRight(node as unknown as BinaryExpression)),
        );
      }
    }
    return this.visitDestructuringAssignmentTargetNoStack(node);
  }

  visitDestructuringAssignmentTarget(node: AstNode): AstNode {
    const grandparent = this.pushNode(node);
    try {
      switch (node.kind) {
        case Kind.ObjectLiteralExpression:
        case Kind.ArrayLiteralExpression:
          return this.visitAssignmentPatternNoStack(node)!;
        default:
          return this.visitDestructuringAssignmentTargetNoStack(node);
      }
    } finally {
      this.popNode(grandparent);
    }
  }

  visitDestructuringAssignmentTargetNoStack(node: AstNode): AstNode {
    if (
      isIdentifier(node) &&
      (!isGeneratedIdentifier(this.emitContext() as unknown as never, node as never) || isFileLevelReservedGeneratedIdentifier(this.emitContext() as unknown as never, node as never)) &&
      !isLocalName(this.emitContext() as unknown as never, node as never)
    ) {
      let expression = this.visitExpressionIdentifier(node as unknown as IdentifierNode);
      const exportedNames = this.getExports(node as unknown as IdentifierNode);
      if (exportedNames.length > 0) {
        const value = this.factory().newUniqueNameEx("value", { flags: GeneratedIdentifierFlags.Optimistic });
        expression = this.factory().newAssignmentExpression(expression, value);
        for (const exportName of exportedNames) {
          expression = this.createExportExpression(exportName, expression, undefined, false);
        }
        const statement = this.factory().newExpressionStatement(expression);
        const statementList = this.factory().newNodeList([statement]);
        const param = this.factory().newParameterDeclaration(undefined, undefined, value, undefined, undefined, undefined);
        const valueSetter = this.factory().newSetAccessorDeclaration(
          undefined,
          this.factory().newIdentifier("value"),
          undefined,
          this.factory().newNodeList([param]),
          undefined,
          undefined,
          this.factory().newBlock(statementList, false),
        );
        const propertyList = this.factory().newNodeList([valueSetter]);
        expression = this.factory().newObjectLiteralExpression(propertyList, false);
        expression = this.factory().newPropertyAccessExpression(expression, undefined, this.factory().newIdentifier("value"), NodeFlags.None);
      }
      return expression;
    }
    return this.visitNoStack(node, false)!;
  }

  visitCommaExpression(node: BinaryExpression, resultIsDiscarded: boolean): AstNode {
    const left = this.discardedValueVisitor.visitNode(binaryLeft(node));
    const right = (resultIsDiscarded ? this.discardedValueVisitor : this.visitor()).visitNode(binaryRight(node));
    return this.factory().updateBinaryExpression(node, undefined, left, undefined, binaryOperatorToken(node), right);
  }

  visitPrefixUnaryExpression(node: PrefixUnaryExpression, resultIsDiscarded: boolean): AstNode {
    const op = prefixUnaryOperatorRO(node);
    const operand = prefixUnaryOperandRO(node);
    if (
      (op === Kind.PlusPlusToken || op === Kind.MinusMinusToken) &&
      isIdentifier(operand) &&
      !isLocalName(this.emitContext() as unknown as never, operand as never)
    ) {
      const exportedNames = this.getExports(operand as unknown as IdentifierNode);
      if (exportedNames.length > 0) {
        let expression: AstNode = this.factory().updatePrefixUnaryExpression(node, op, this.visitor().visitNode(operand));
        for (const exportName of exportedNames) {
          expression = this.createExportExpression(exportName, expression, undefined, false);
          this.emitContext().assignCommentAndSourceMapRanges(expression, node as unknown as AstNode);
        }
        return expression;
      }
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitPostfixUnaryExpression(node: PostfixUnaryExpression, resultIsDiscarded: boolean): AstNode {
    const op = postfixUnaryOperatorRO(node);
    const operand = postfixUnaryOperandRO(node);
    if (
      (op === Kind.PlusPlusToken || op === Kind.MinusMinusToken) &&
      isIdentifier(operand) &&
      !isLocalName(this.emitContext() as unknown as never, operand as never)
    ) {
      const exportedNames = this.getExports(operand as unknown as IdentifierNode);
      if (exportedNames.length > 0) {
        let temp: IdentifierNode | undefined;
        let expression: AstNode = this.factory().updatePostfixUnaryExpression(node, this.visitor().visitNode(operand), op);
        if (!resultIsDiscarded) {
          temp = this.factory().newTempVariable() as unknown as IdentifierNode;
          this.emitContext().addVariableDeclaration(temp as unknown as AstNode);
          expression = this.factory().newAssignmentExpression(temp as unknown as AstNode, expression);
          this.emitContext().assignCommentAndSourceMapRanges(expression, node as unknown as AstNode);
        }
        expression = this.factory().newCommaExpression(expression, cloneNode(operand, this.factory()));
        this.emitContext().assignCommentAndSourceMapRanges(expression, node as unknown as AstNode);
        for (const exportName of exportedNames) {
          expression = this.createExportExpression(exportName, expression, undefined, false);
          this.emitContext().assignCommentAndSourceMapRanges(expression, node as unknown as AstNode);
        }
        if (temp !== undefined) {
          expression = this.factory().newCommaExpression(expression, temp as unknown as AstNode);
          this.emitContext().assignCommentAndSourceMapRanges(expression, node as unknown as AstNode);
        }
        return expression;
      }
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitCallExpression(node: CallExpression): AstNode {
    let needsRewrite = false;
    if (compilerOptionsRewriteRelativeImportExtensions(this.compilerOptions)) {
      const args = callExpressionArgumentsRO(node);
      if (
        (isImportCall(node as unknown as AstNode) && args.length > 0) ||
        (isInJSFile(node as unknown as AstNode) && isRequireCall(node as unknown as AstNode, false))
      ) {
        needsRewrite = true;
      }
    }
    if (isImportCall(node as unknown as AstNode) && this.shouldTransformImportCall()) {
      return this.visitImportCallExpression(node, needsRewrite);
    }
    if (needsRewrite) return this.shimOrRewriteImportOrRequireCall(node);
    if (isIdentifier(callExpressionExpressionRO(node))) {
      const expression = this.visitExpressionIdentifier(callExpressionExpressionRO(node) as unknown as IdentifierNode);
      const updated = this.factory().updateCallExpression(
        node,
        expression,
        callExpressionQuestionDotTokenRO(node),
        undefined,
        this.visitor().visitNodes(callExpressionArgumentsListRO(node)),
        nodeFlags(node as unknown as AstNode),
      );
      if (!isIdentifier(expression) && !isHelperName(this.emitContext() as unknown as never, callExpressionExpressionRO(node) as never)) {
        this.emitContext().addEmitFlags(updated, EmitFlags.IndirectCall);
      }
      return updated;
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  shouldTransformImportCall(): boolean {
    return shouldTransformImportCallStandalone(sourceFileFileName(this.currentSourceFile!), this.compilerOptions, this.getEmitModuleFormatOfFile(this.currentSourceFile!));
  }

  visitImportCallExpression(node: CallExpression, rewriteOrShim: boolean): AstNode {
    if (this.moduleKind === ModuleKind.None && this.languageVersion >= ScriptTarget.ES2020) {
      return this.visitor().visitEachChild(node as unknown as AstNode);
    }
    const externalModuleName = getExternalModuleNameLiteral(this.factory(), node as unknown as AstNode, this.currentSourceFile!, undefined, this.resolver as unknown as never, this.compilerOptions);
    const args = callExpressionArgumentsRO(node);
    const firstArgument = args.length > 0 ? this.visitor().visitNode(args[0]!) : undefined;

    let argument: AstNode | undefined;
    if (externalModuleName !== undefined && (firstArgument === undefined || !isStringLiteral(firstArgument) || nodeText(firstArgument) !== nodeText(externalModuleName))) {
      argument = externalModuleName;
    } else if (firstArgument !== undefined && rewriteOrShim) {
      if (isStringLiteral(firstArgument)) {
        argument = rewriteModuleSpecifier(this.emitContext(), firstArgument, this.compilerOptions);
      } else {
        argument = this.factory().newRewriteRelativeImportExtensionsHelper(firstArgument, compilerOptionsJsx(this.compilerOptions) === JsxEmit.Preserve);
      }
    } else {
      argument = firstArgument;
    }
    return this.createImportCallExpressionCommonJS(argument);
  }

  createImportCallExpressionCommonJS(arg: AstNode | undefined): AstNode {
    const f = this.factory();
    const needSyncEval = arg !== undefined && !isSimpleInlineableExpression(arg);
    const promiseResolveArguments: AstNode[] = [];
    if (needSyncEval) {
      promiseResolveArguments.push(
        f.newTemplateExpression(
          f.newTemplateHead("", "", TokenFlags.None),
          f.newNodeList([f.newTemplateSpan(arg!, f.newTemplateTail("", "", TokenFlags.None))]),
        ),
      );
    }
    const promiseResolveCall = f.newCallExpression(
      f.newPropertyAccessExpression(f.newIdentifier("Promise"), undefined, f.newIdentifier("resolve"), NodeFlags.None),
      undefined,
      undefined,
      f.newNodeList(promiseResolveArguments),
      NodeFlags.None,
    );

    const requireArguments: AstNode[] = needSyncEval ? [f.newIdentifier("s")] : arg !== undefined ? [arg] : [];
    const requireCall = f.newImportStarHelper(
      f.newCallExpression(f.newIdentifier("require"), undefined, undefined, f.newNodeList(requireArguments), NodeFlags.None),
    );
    const parameters: AstNode[] = needSyncEval
      ? [f.newParameterDeclaration(undefined, undefined, f.newIdentifier("s"), undefined, undefined, undefined)]
      : [];
    const fn = f.newArrowFunction(undefined, undefined, f.newNodeList(parameters), undefined, undefined, f.newToken(Kind.EqualsGreaterThanToken), requireCall);
    return f.newCallExpression(
      f.newPropertyAccessExpression(promiseResolveCall, undefined, f.newIdentifier("then"), NodeFlags.None),
      undefined,
      undefined,
      f.newNodeList([fn]),
      NodeFlags.None,
    );
  }

  shimOrRewriteImportOrRequireCall(node: CallExpression): AstNode {
    const expression = this.visitor().visitNode(callExpressionExpressionRO(node));
    let argumentsList = callExpressionArgumentsListRO(node);
    const args = callExpressionArgumentsRO(node);
    if (args.length > 0) {
      let firstArgument = args[0]!;
      let firstArgumentChanged = false;
      if (isStringLiteralLike(firstArgument)) {
        const rewritten = rewriteModuleSpecifier(this.emitContext(), firstArgument, this.compilerOptions)!;
        firstArgumentChanged = rewritten !== firstArgument;
        firstArgument = rewritten;
      } else {
        firstArgument = this.factory().newRewriteRelativeImportExtensionsHelper(firstArgument, compilerOptionsJsx(this.compilerOptions) === JsxEmit.Preserve);
        firstArgumentChanged = true;
      }
      const { items: rest, changed: restChanged } = this.visitor().visitSlice(args.slice(1));
      if (firstArgumentChanged || restChanged) {
        const allArgs = [firstArgument, ...rest];
        argumentsList = this.factory().newNodeList(allArgs);
        setLoc(argumentsList, callExpressionArgumentsLocRO(node));
      }
    }
    return this.factory().updateCallExpression(node, expression, callExpressionQuestionDotTokenRO(node), undefined, argumentsList, nodeFlags(node as unknown as AstNode));
  }

  visitTaggedTemplateExpression(node: TaggedTemplateExpression): AstNode {
    if (isIdentifier(taggedTemplateTagRO(node))) {
      const expression = this.visitExpressionIdentifier(taggedTemplateTagRO(node) as unknown as IdentifierNode);
      const updated = this.factory().updateTaggedTemplateExpression(
        node,
        expression,
        undefined,
        undefined,
        this.visitor().visitNode(taggedTemplateTemplateRO(node)),
        nodeFlags(node as unknown as AstNode),
      );
      if (!isIdentifier(expression) && !isHelperName(this.emitContext() as unknown as never, taggedTemplateTagRO(node) as never)) {
        this.emitContext().addEmitFlags(updated, EmitFlags.IndirectCall);
      }
      return updated;
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): AstNode {
    const name = shorthandPropertyAssignmentNameRO(node);
    const exportedOrImportedName = this.visitExpressionIdentifier(name as unknown as IdentifierNode);
    if (exportedOrImportedName !== name) {
      let expression: AstNode = exportedOrImportedName;
      const init = shorthandObjectAssignmentInitializerRO(node);
      if (init !== undefined) {
        expression = this.factory().newAssignmentExpression(expression, this.visitor().visitNode(init));
      }
      const assignment = this.factory().newPropertyAssignment(undefined, name, undefined, undefined, expression);
      setLoc(assignment, nodeLoc(node as unknown as AstNode));
      this.emitContext().assignCommentAndSourceMapRanges(assignment, node as unknown as AstNode);
      return assignment;
    }
    return this.factory().updateShorthandPropertyAssignment(
      node,
      undefined,
      exportedOrImportedName,
      undefined,
      undefined,
      shorthandEqualsTokenRO(node),
      this.visitor().visitNode(shorthandObjectAssignmentInitializerRO(node)!),
    );
  }

  visitIdentifier(node: IdentifierNode): AstNode {
    if (isIdentifierReference(node, this.parentNode!)) return this.visitExpressionIdentifier(node);
    return node as unknown as AstNode;
  }

  visitExpressionIdentifier(node: IdentifierNode): AstNode {
    const info = this.emitContext().getAutoGenerateInfo(node as unknown as AstNode);
    if (!(info !== undefined && !autoGenInfoHasAllowNameSubstitution(info)) &&
        !isHelperName(this.emitContext() as unknown as never, node as never) &&
        !isLocalName(this.emitContext() as unknown as never, node as never) &&
        !isDeclarationNameOfEnumOrNamespace(this.emitContext() as unknown as never, node)) {
      const exportContainer = this.resolver.getReferencedExportContainer(this.emitContext().mostOriginal(node as unknown as AstNode)!, isExportName(this.emitContext() as unknown as never, node as never));
      if (exportContainer !== undefined && isSourceFile(exportContainer)) {
        const reference = this.factory().newPropertyAccessExpression(this.factory().newIdentifier("exports"), undefined, cloneNode(node as unknown as AstNode, this.factory()), NodeFlags.None);
        this.emitContext().assignCommentAndSourceMapRanges(reference, node as unknown as AstNode);
        setLoc(reference, nodeLoc(node as unknown as AstNode));
        return reference;
      }
      const importDeclaration = this.resolver.getReferencedImportDeclaration(this.emitContext().mostOriginal(node as unknown as AstNode)!);
      if (importDeclaration !== undefined) {
        if (isImportClause(importDeclaration)) {
          const reference = this.factory().newPropertyAccessExpression(
            this.factory().newGeneratedNameForNode(nodeParent(importDeclaration)!),
            undefined,
            this.factory().newIdentifier("default"),
            NodeFlags.None,
          );
          this.emitContext().assignCommentAndSourceMapRanges(reference, node as unknown as AstNode);
          setLoc(reference, nodeLoc(node as unknown as AstNode));
          return reference;
        }
        if (isImportSpecifier(importDeclaration)) {
          const name = importSpecifierPropertyNameOrNameRO(importDeclaration);
          const decl = findAncestor(importDeclaration, isImportDeclaration);
          const target = this.factory().newGeneratedNameForNode(decl ?? importDeclaration);
          let reference: AstNode;
          if (isStringLiteral(name)) {
            reference = this.factory().newElementAccessExpression(target, undefined, this.factory().newStringLiteralFromNode(name), NodeFlags.None);
          } else {
            const referenceName = cloneNode(name, this.factory());
            this.emitContext().addEmitFlags(referenceName, EmitFlags.NoSourceMap | EmitFlags.NoComments);
            reference = this.factory().newPropertyAccessExpression(target, undefined, referenceName, NodeFlags.None);
          }
          this.emitContext().assignCommentAndSourceMapRanges(reference, node as unknown as AstNode);
          setLoc(reference, nodeLoc(node as unknown as AstNode));
          return reference;
        }
      }
    }
    return node as unknown as AstNode;
  }

  getExports(name: IdentifierNode): AstNode[] {
    if (!isGeneratedIdentifier(this.emitContext() as unknown as never, name as never)) {
      const importDeclaration = this.resolver.getReferencedImportDeclaration(this.emitContext().mostOriginal(name as unknown as AstNode)!);
      if (importDeclaration !== undefined) {
        return this.currentModuleInfo!.exportedBindings.get(importDeclaration) ?? [];
      }
      const bindingsSet = new Set<AstNode>();
      const bindings: AstNode[] = [];
      const declarations = this.resolver.getReferencedValueDeclarations(this.emitContext().mostOriginal(name as unknown as AstNode)!);
      if (declarations !== undefined) {
        for (const declaration of declarations) {
          const exportedBindings = this.currentModuleInfo!.exportedBindings.get(declaration);
          if (exportedBindings !== undefined) {
            for (const binding of exportedBindings) {
              if (!bindingsSet.has(binding)) {
                bindingsSet.add(binding);
                bindings.push(binding);
              }
            }
          }
        }
        return bindings;
      }
    } else if (isFileLevelReservedGeneratedIdentifier(this.emitContext() as unknown as never, name as never)) {
      const exportSpecifiers = this.currentModuleInfo!.exportSpecifiers.get(nodeText(name as unknown as AstNode));
      if (exportSpecifiers !== undefined) {
        const exportedNames: AstNode[] = [];
        for (const exportSpecifier of exportSpecifiers) exportedNames.push(exportSpecifierName(exportSpecifier));
        return exportedNames;
      }
    }
    return [];
  }
}

export function newCommonJSModuleTransformer(opts: TransformOptions): Transformer {
  return new CommonJSModuleTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown; readonly [key: string]: unknown }
interface ReferenceResolver {
  getReferencedExportContainer?(node: AstNode, prefixLocals: boolean): AstNode | undefined;
  getReferencedImportDeclaration?(node: AstNode): AstNode | undefined;
  getReferencedValueDeclaration(node: AstNode): AstNode | undefined;
  getReferencedValueDeclarations?(node: AstNode): readonly AstNode[] | undefined;
}
interface HasFileName { readonly _hf: unknown }

// NodeVisitor type comes from transformer.ts (imported via Transformer
// base class context). Removed local stub — was conflicting with the
// imported shape.

declare const Kind: {
  SourceFile: number; ImportDeclaration: number; ImportEqualsDeclaration: number;
  ExportDeclaration: number; ExportAssignment: number; FunctionDeclaration: number;
  ClassDeclaration: number; VariableStatement: number; ForStatement: number;
  ForInStatement: number; ForOfStatement: number; DoStatement: number; WhileStatement: number;
  LabeledStatement: number; WithStatement: number; IfStatement: number;
  SwitchStatement: number; CaseBlock: number; CaseClause: number; DefaultClause: number;
  TryStatement: number; CatchClause: number; Block: number;
  ExpressionStatement: number; VoidExpression: number; ParenthesizedExpression: number;
  PartiallyEmittedExpression: number; CallExpression: number;
  TaggedTemplateExpression: number; BinaryExpression: number;
  PrefixUnaryExpression: number; PostfixUnaryExpression: number;
  ShorthandPropertyAssignment: number; Identifier: number;
  ObjectLiteralExpression: number; ArrayLiteralExpression: number;
  PropertyAssignment: number; SpreadAssignment: number; SpreadElement: number;
  MethodDeclaration: number; GetAccessor: number; SetAccessor: number;
  StringLiteral: number; NamespaceImport: number; NamedImports: number;
  EqualsToken: number; EqualsGreaterThanToken: number;
  PlusPlusToken: number; MinusMinusToken: number;
};
declare const NodeFlags: { None: number; Const: number; BlockScoped: number };
declare const TokenFlags: { None: number };
declare const ModuleKind: { None: number };
declare const ScriptTarget: { ES2020: number };
declare const ModifierFlags: { Export: number; Default: number; ExportDefault: number };
declare const SubtreeFacts: { ContainsDynamicImport: number; ContainsIdentifier: number };
declare const EmitFlags: {
  CustomPrologue: number; NoSourceMap: number; NoComments: number;
  StartOnNewLine: number; IndirectCall: number;
};
declare const JsxEmit: { Preserve: number };
declare const GeneratedIdentifierFlags: { Optimistic: number };

declare function sourceFileIsDeclarationFile(node: SourceFile): boolean;
declare function sourceFileStatementsRO(node: SourceFile): readonly AstNode[];
declare function sourceFileStatementsLoc(node: SourceFile): unknown;
declare function sourceFileEndOfFileToken(node: SourceFile): AstNode;
declare function sourceFileFileName(node: SourceFile): string;
declare function sourceFileCommonJSModuleIndicator(node: SourceFile): AstNode | undefined;
declare function sourceFileExternalModuleIndicator(node: SourceFile): AstNode | undefined;
declare function isExternalModule(node: SourceFile): boolean;
declare function isSourceFile(node: AstNode): boolean;
declare function isEffectiveExternalModule(file: SourceFile, options: CompilerOptions): boolean;
declare function fileExtensionIsOneOf(name: string, exts: readonly string[]): boolean;
declare const supportedJSExtensionsFlat: readonly string[];
declare function nodeFlags(node: AstNode): number;
declare function nodeLoc(node: AstNode): unknown;
declare function nodeText(node: AstNode): string;
declare function nodeName(node: AstNode): AstNode | undefined;
declare function nodeParent(node: AstNode): AstNode | undefined;
declare function nodeInitializerOf(node: AstNode): AstNode | undefined;
declare function setLoc(node: unknown, loc: unknown): void;
declare function isExpression(node: AstNode): boolean;
declare function isStringLiteral(node: AstNode): boolean;
declare function isStringLiteralLike(node: AstNode): boolean;
declare function isIdentifier(node: AstNode): boolean;
declare function isBindingPattern(node: AstNode): boolean;
declare function isOmittedExpression(node: AstNode): boolean;
declare function isBlockNode(node: AstNode): boolean;
declare function isVariableDeclaration(node: AstNode): boolean;
declare function isVariableDeclarationList(node: AstNode): boolean;
declare function isImportClause(node: AstNode): boolean;
declare function isImportSpecifier(node: AstNode): boolean;
declare function isImportDeclaration(node: AstNode): boolean;
declare function isImportCall(node: AstNode): boolean;
declare function isRequireCall(node: AstNode, requireStringLiteralLikeArgument: boolean): boolean;
declare function isInJSFile(node: AstNode): boolean;
declare function isDefaultImport(node: AstNode): boolean;
declare function isExternalModuleImportEqualsDeclaration(node: AstNode): boolean;
declare function isAssignmentExpression(node: AstNode, excludeCompound: boolean): boolean;
declare function isCommaExpression(node: AstNode): boolean;
declare function isDestructuringAssignment(node: AstNode): boolean;
declare function isBinaryExpression(node: AstNode): boolean;
declare function isObjectLiteralExpression(node: AstNode): boolean;
declare function isArrayLiteralExpression(node: AstNode): boolean;
declare function isArrowFunction(node: AstNode): boolean;
declare function isFunctionExpression(node: AstNode): boolean;
declare function isClassExpression(node: AstNode): boolean;
declare function isSpreadElement(node: AstNode): boolean;
declare function isNamedExports(node: AstNode): boolean;
declare function getNamespaceDeclarationNode(node: AstNode): AstNode | undefined;
declare function hasSyntacticModifier(node: AstNode, flags: number): boolean;
declare function moduleExportNameIsDefault(node: AstNode): boolean;
declare function findAncestor(node: AstNode, predicate: (node: AstNode) => boolean): AstNode | undefined;
declare function compilerOptionsGetEmitScriptTarget(options: CompilerOptions): number;
declare function compilerOptionsGetEmitModuleKind(options: CompilerOptions): number;
declare function compilerOptionsRewriteRelativeImportExtensions(options: CompilerOptions): boolean;
declare function compilerOptionsJsx(options: CompilerOptions): number;
declare function shouldTransformImportCallStandalone(fileName: string, options: CompilerOptions, moduleFormat: number): boolean;
declare function subtreeFacts(node: AstNode): number;
declare function cloneNode(node: AstNode, factory: unknown): AstNode;
declare function bindingPatternElements(pattern: AstNode): readonly AstNode[];
declare function variableStatementDeclarationListRO(node: VariableStatement): AstNode;
declare function variableStatementModifiers(node: VariableStatement): AstNode | undefined;
declare function variableDeclarationListDeclarationsRO(node: AstNode): readonly AstNode[];
declare function variableDeclarationNameRO(node: VariableDeclaration): AstNode;
declare function variableDeclarationInitializerRO(node: VariableDeclaration): AstNode | undefined;
declare function variableDeclarationExclamationTokenRO(node: VariableDeclaration): AstNode | undefined;
declare function variableDeclarationTypeRO(node: VariableDeclaration): AstNode | undefined;
declare function importDeclarationImportClause(node: ImportDeclaration): AstNode | undefined;
declare function importClauseName(clause: AstNode): AstNode | undefined;
declare function importClauseNamedBindings(clause: AstNode): AstNode | undefined;
declare function namedElements(node: AstNode): readonly AstNode[];
declare function namedExportsElements(node: AstNode): readonly AstNode[];
declare function exportSpecifierName(node: AstNode): AstNode;
declare function exportSpecifierPropertyNameOrName(node: AstNode): AstNode;
declare function importSpecifierPropertyNameOrNameRO(node: AstNode): AstNode;
declare function importEqualsName(node: ImportEqualsDeclaration): AstNode;
declare function exportDeclarationModuleSpecifier(node: ExportDeclaration): AstNode | undefined;
declare function exportDeclarationExportClause(node: ExportDeclaration): AstNode | undefined;
declare function exportAssignmentIsExportEquals(node: ExportAssignment): boolean;
declare function exportAssignmentExpression(node: ExportAssignment): AstNode;
declare function classDeclarationModifiers(node: ClassDeclaration): unknown;
declare function classDeclarationHeritageClauses(node: ClassDeclaration): unknown;
declare function classDeclarationMembers(node: ClassDeclaration): unknown;
declare function functionDeclarationModifiers(node: FunctionDeclaration): unknown;
declare function functionAsteriskTokenRO(node: FunctionDeclaration): AstNode | undefined;
declare function functionDeclarationParameters(node: FunctionDeclaration): unknown;
declare function functionDeclarationBody(node: FunctionDeclaration): AstNode | undefined;
declare function forInitializerRO(node: ForStatement): AstNode | undefined;
declare function forConditionRO(node: ForStatement): AstNode | undefined;
declare function forIncrementorRO(node: ForStatement): AstNode | undefined;
declare function forBodyRO(node: ForStatement): AstNode;
declare function forInOrOfInitializerRO(node: ForInOrOfStatement): AstNode;
declare function forInOrOfExpressionRO(node: ForInOrOfStatement): AstNode;
declare function forInOrOfBodyRO(node: ForInOrOfStatement): AstNode;
declare function forInOrOfAwaitModifierRO(node: ForInOrOfStatement): AstNode | undefined;
declare function doStatementStatement(node: DoStatement): AstNode;
declare function doStatementExpression(node: DoStatement): AstNode;
declare function whileStatementExpression(node: WhileStatement): AstNode;
declare function whileStatementBody(node: WhileStatement): AstNode;
declare function labeledStatementLabel(node: LabeledStatement): AstNode;
declare function labeledStatementStatement(node: LabeledStatement): AstNode;
declare function withStatementExpression(node: WithStatement): AstNode;
declare function withStatementStatement(node: WithStatement): AstNode;
declare function ifStatementExpression(node: IfStatement): AstNode;
declare function ifStatementThen(node: IfStatement): AstNode;
declare function ifStatementElse(node: IfStatement): AstNode | undefined;
declare function switchStatementExpression(node: SwitchStatement): AstNode;
declare function switchStatementCaseBlock(node: SwitchStatement): AstNode;
declare function caseClauseExpression(node: AstNode): AstNode | undefined;
declare function caseClauseStatements(node: AstNode): unknown;
declare function catchClauseVariableDeclaration(node: CatchClause): AstNode | undefined;
declare function catchClauseBlock(node: CatchClause): AstNode;
declare function blockStatementsRO(node: Block): readonly AstNode[];
declare function blockStatementsLoc(node: Block): unknown;
declare function blockMultiLineRO(node: Block): boolean;
declare function parenthesizedExpressionRO(node: ParenthesizedExpression): AstNode;
declare function partiallyEmittedExpressionRO(node: PartiallyEmittedExpression): AstNode;
declare function callExpressionExpressionRO(node: CallExpression): AstNode;
declare function callExpressionArgumentsRO(node: CallExpression): readonly AstNode[];
declare function callExpressionArgumentsListRO(node: CallExpression): unknown;
declare function callExpressionArgumentsLocRO(node: CallExpression): unknown;
declare function callExpressionQuestionDotTokenRO(node: CallExpression): AstNode | undefined;
declare function taggedTemplateTagRO(node: TaggedTemplateExpression): AstNode;
declare function taggedTemplateTemplateRO(node: TaggedTemplateExpression): AstNode;
declare function binaryLeft(node: BinaryExpression): AstNode;
declare function binaryRight(node: BinaryExpression): AstNode;
declare function binaryOperatorToken(node: BinaryExpression): AstNode;
declare function binaryOperatorTokenKind(node: BinaryExpression): number;
declare function prefixUnaryOperatorRO(node: PrefixUnaryExpression): number;
declare function prefixUnaryOperandRO(node: PrefixUnaryExpression): AstNode;
declare function postfixUnaryOperatorRO(node: PostfixUnaryExpression): number;
declare function postfixUnaryOperandRO(node: PostfixUnaryExpression): AstNode;
declare function shorthandPropertyAssignmentNameRO(node: ShorthandPropertyAssignment): AstNode;
declare function shorthandObjectAssignmentInitializerRO(node: ShorthandPropertyAssignment): AstNode | undefined;
declare function shorthandEqualsTokenRO(node: ShorthandPropertyAssignment): AstNode | undefined;
declare function propertyAssignmentNameRO(node: PropertyAssignment): AstNode;
declare function propertyAssignmentInitializerRO(node: PropertyAssignment): AstNode;
declare function spreadAssignmentExpressionRO(node: SpreadAssignment | AstNode): AstNode;
declare function spreadElementExpressionRO(node: SpreadElement | AstNode): AstNode;
declare function objectLiteralProperties(node: AstNode): readonly AstNode[];
declare function arrayLiteralElements(node: AstNode): readonly AstNode[];
declare function autoGenInfoHasAllowNameSubstitution(info: unknown): boolean;
