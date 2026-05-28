/**
 * Object rest/spread downlevel transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/objectrestspread.go`.
 *
 * Lowers `{ ...x, y }` object spread and `const { a, ...rest } = obj`
 * object rest into `__assign`/`__rest` helper calls. Also handles the
 * parameter rest-pattern case where the binding pattern's tail rest
 * must be evaluated in the function body.
 */

import type { Node as AstNode, SourceFile } from "../../ast/index.js";
import {
  nodeKind, nodeBody, blockStatements, blockMultiLine,
  bindingPatternElements, variableDeclarationName,
  catchClauseVariableDeclaration, catchClauseBlock,
  hasSyntacticModifier,
  parameterName, parameterDotDotDotToken, parameterInitializer,
  methodAsteriskToken, arrowEqualsGreaterThanToken,
  binaryLeft, binaryRight, binaryOperatorKind, binaryOperatorToken,
  forStatementBody, cloneNode as _astCloneNode,
  nodeListNodes, nodeParameters, nodeParameterList as nodeParametersList,
  declModifiers as nodeModifiers,
  methodAsteriskToken as methodPostfixToken,
  declName as declarationName,
  forInOrOfInitializerNode as forStatementInitializer,
  forInOrOfExpressionNode as forStatementExpression,
  forInOrOfAwaitModifierOpt as forStatementAwaitModifier,
  skipParentheses,
  expressionOf,
  objectLiteralProperties,
  propertyAssignmentName as propertyName,
  propertyAssignmentInitializer as propertyInitializer,
} from "../../ast/index.js";
import { isPrologueDirective, isAssignmentPattern } from "../../ast/index.js";
import { subtreeFacts as subtreeFactsOf } from "../../ast/index.js";
import {
  isBlock, isBindingPattern, isVariableDeclarationList,
  isDestructuringAssignment,
} from "../../ast/index.js";
import { Kind, NodeFlags } from "../../ast/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import { EmitFlags } from "../../printer/emitflags.js";
import {
  visitNode, visitNodes, visitEachChild, visitEachChildOf,
  setOriginal, addEmitFlags, addEmitHelpers, readEmitHelpers,
  emitFlagsOf, addVariableDeclaration, startVariableEnvironment,
  endVariableEnvironment, endAndMergeVariableEnvironment,
  syntaxListChildren, appendVariableDeclaration,
  newGeneratedNameForNode, newTempVariable,
  newBlock, newNodeList, newVariableDeclaration,
  newVariableDeclarationList, newVariableStatement,
  newExpressionStatement, newAssignmentExpression, newReturnStatement,
  newTypeCheck, newIfStatement,
  newObjectLiteralExpression, newPropertyAssignment, newAssignHelper,
  updateParameterDeclaration, updateConstructorDeclaration,
  updateGetAccessorDeclaration, updateSetAccessorDeclaration,
  updateMethodDeclaration, updateFunctionDeclaration,
  updateArrowFunction, updateFunctionExpression,
  updateForInOrOfStatement, updateBlock, updateBinaryExpression,
  updateVariableDeclaration, updateCatchClause,
} from "../../printer/factory-helpers.js";

import { Transformer, type EmitContext, type NodeFactory } from "../transformer.js";
import type { TransformOptions } from "../transformer.js";

function cloneNode(factory: NodeFactory, node: AstNode): AstNode { void factory; return _astCloneNode(node); }

// Use TS-Go-style aliases for the EF flag constants the file references.
const EFCustomPrologue = EmitFlags.CustomPrologue;
const EFNoSourceMap = EmitFlags.NoSourceMap;
const EFNoComments = EmitFlags.NoComments;
const EFSingleLine = EmitFlags.SingleLine;
const EFNoTrailingSourceMap = EmitFlags.NoTrailingSourceMap;
const EFNoTokenSourceMaps = EmitFlags.NoTokenSourceMaps;
const EFStartOnNewLine = EmitFlags.StartOnNewLine;

// Kind aliases (the file uses these in case labels).
const KindSourceFile = Kind.SourceFile;
const KindObjectLiteralExpression = Kind.ObjectLiteralExpression;
const KindBinaryExpression = Kind.BinaryExpression;
const KindExpressionStatement = Kind.ExpressionStatement;
const KindParenthesizedExpression = Kind.ParenthesizedExpression;
const KindForOfStatement = Kind.ForOfStatement;
const KindVariableStatement = Kind.VariableStatement;
const KindVariableDeclaration = Kind.VariableDeclaration;
const KindCatchClause = Kind.CatchClause;
const KindParameter = Kind.Parameter;
const KindConstructor = Kind.Constructor;
const KindGetAccessor = Kind.GetAccessor;
const KindSetAccessor = Kind.SetAccessor;
const KindMethodDeclaration = Kind.MethodDeclaration;
const KindFunctionDeclaration = Kind.FunctionDeclaration;
const KindArrowFunction = Kind.ArrowFunction;
const KindFunctionExpression = Kind.FunctionExpression;
const KindSpreadAssignment = Kind.SpreadAssignment;
const KindPropertyAssignment = Kind.PropertyAssignment;
const KindSyntaxList = (Kind as unknown as Record<string, number>).SyntaxList ?? 0;
const KindCommaToken = Kind.CommaToken;
const NodeFlagsLet = NodeFlags.Let;
const ModifierFlagsExport = ModifierFlags.Export;
void KindSourceFile; void KindObjectLiteralExpression; void KindBinaryExpression;
void KindExpressionStatement; void KindParenthesizedExpression;
void KindForOfStatement; void KindVariableStatement; void KindVariableDeclaration;
void KindCatchClause; void KindParameter; void KindConstructor;
void KindGetAccessor; void KindSetAccessor; void KindMethodDeclaration;
void KindFunctionDeclaration; void KindArrowFunction; void KindFunctionExpression;
void KindSpreadAssignment; void KindPropertyAssignment;
void KindSyntaxList; void KindCommaToken;
void NodeFlagsLet; void ModifierFlagsExport;
void EFCustomPrologue; void EFNoSourceMap; void EFNoComments;
void EFSingleLine; void EFNoTrailingSourceMap; void EFNoTokenSourceMaps;
void EFStartOnNewLine;

class ObjectRestSpreadTransformer extends Transformer {
  private readonly compilerOptions: CompilerOptionsForObjectRest;
  private inExportedVariableStatement = false;
  private expressionResultIsUnused = false;
  private parametersWithPrecedingObjectRestOrSpread: Set<AstNode> | undefined;

  constructor(opts: ObjectRestSpreadOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.newTransformer((node) => this.visit(node), opts.context);
  }

  private visit(node: AstNode): AstNode | undefined {
    if (!subtreeContainsESObjectRestOrSpread(node) && this.parametersWithPrecedingObjectRestOrSpread === undefined) {
      return node;
    }
    const expressionResultIsUnused = this.expressionResultIsUnused;
    this.expressionResultIsUnused = false;
    try {
      const kind = nodeKind(node);
      switch (kind) {
        case KindSourceFile:
          return this.visitSourceFile(node as unknown as SourceFile);
        case KindObjectLiteralExpression:
          return this.visitObjectLiteralExpression(node);
        case KindBinaryExpression:
          return this.visitBinaryExpression(node, expressionResultIsUnused);
        case KindExpressionStatement:
          this.expressionResultIsUnused = true;
          return visitEachChildOf(this.getVisitor(), node);
        case KindParenthesizedExpression:
          this.expressionResultIsUnused = expressionResultIsUnused;
          return visitEachChildOf(this.getVisitor(), node);
        case KindForOfStatement:
          return this.visitForOfStatement(node);
        case KindVariableStatement:
          return this.visitVariableStatement(node);
        case KindVariableDeclaration:
          return this.visitVariableDeclaration(node);
        case KindCatchClause:
          return this.visitCatchClause(node);
        case KindParameter:
          return this.visitParameter(node);
        case KindConstructor:
          return this.visitConstructorDeclaration(node);
        case KindGetAccessor:
          return this.visitGetAccessorDeclaration(node);
        case KindSetAccessor:
          return this.visitSetAccessorDeclaration(node);
        case KindMethodDeclaration:
          return this.visitMethodDeclaration(node);
        case KindFunctionDeclaration:
          return this.visitFunctionDeclaration(node);
        case KindArrowFunction:
          return this.visitArrowFunction(node);
        case KindFunctionExpression:
          return this.visitFunctionExpression(node);
        default:
          return visitEachChildOf(this.getVisitor(), node);
      }
    } finally {
      this.expressionResultIsUnused = expressionResultIsUnused;
    }
  }

  private visitSourceFile(node: SourceFile): AstNode {
    const visited = visitEachChildOf(this.getVisitor(), node as unknown as AstNode);
    const emit = this.getEmitContext();
    addEmitHelpers(emit, visited, readEmitHelpers(emit));
    return visited;
  }

  private visitParameter(node: AstNode): AstNode {
    if (this.parametersWithPrecedingObjectRestOrSpread !== undefined && this.parametersWithPrecedingObjectRestOrSpread.has(node)) {
      let name = parameterName(node);
      if (isBindingPattern(name)) {
        name = newGeneratedNameForNode(this.getFactory(), node);
      }
      return updateParameterDeclaration(
        this.getFactory(),
        node,
        undefined,
        parameterDotDotDotToken(node),
        name,
        undefined,
        undefined,
        undefined,
      );
    }
    if (subtreeContainsObjectRestOrSpread(node)) {
      return updateParameterDeclaration(
        this.getFactory(),
        node,
        undefined,
        parameterDotDotDotToken(node),
        newGeneratedNameForNode(this.getFactory(), node),
        undefined,
        undefined,
        visitNode(this.getVisitor(), parameterInitializer(node)),
      );
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private collectParametersWithPrecedingObjectRestOrSpread(node: AstNode): Set<AstNode> | undefined {
    let result: Set<AstNode> | undefined;
    for (const parameter of nodeParameters(node)) {
      if (result !== undefined) {
        result.add(parameter);
      } else if (subtreeContainsObjectRestOrSpread(parameter)) {
        result = new Set<AstNode>();
      }
    }
    return result;
  }

  private enterParameterListContext(node: AstNode): Set<AstNode> | undefined {
    const old = this.parametersWithPrecedingObjectRestOrSpread;
    this.parametersWithPrecedingObjectRestOrSpread = this.collectParametersWithPrecedingObjectRestOrSpread(node);
    return old;
  }

  private exitParameterListContext(scope: Set<AstNode> | undefined): void {
    this.parametersWithPrecedingObjectRestOrSpread = scope;
  }

  private visitConstructorDeclaration(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateConstructorDeclaration(
        this.getFactory(),
        node,
        nodeModifiers(node),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private visitGetAccessorDeclaration(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateGetAccessorDeclaration(
        this.getFactory(),
        node,
        nodeModifiers(node),
        visitNode(this.getVisitor(), declarationName(node)),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private visitSetAccessorDeclaration(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateSetAccessorDeclaration(
        this.getFactory(),
        node,
        nodeModifiers(node),
        visitNode(this.getVisitor(), declarationName(node)),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private visitMethodDeclaration(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateMethodDeclaration(
        this.getFactory(),
        node,
        nodeModifiers(node),
        methodAsteriskToken(node),
        visitNode(this.getVisitor(), declarationName(node)),
        methodPostfixToken(node),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private visitFunctionDeclaration(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateFunctionDeclaration(
        this.getFactory(),
        node,
        nodeModifiers(node),
        methodAsteriskToken(node),
        visitNode(this.getVisitor(), declarationName(node)),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private visitArrowFunction(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateArrowFunction(
        this.getFactory(),
        node,
        nodeModifiers(node),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        arrowEqualsGreaterThanToken(node),
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private visitFunctionExpression(node: AstNode): AstNode {
    const old = this.enterParameterListContext(node);
    try {
      return updateFunctionExpression(
        this.getFactory(),
        node,
        nodeModifiers(node),
        methodAsteriskToken(node),
        visitNode(this.getVisitor(), declarationName(node)),
        undefined,
        visitNodes(this.getVisitor(), nodeParametersList(node)),
        undefined,
        undefined,
        this.transformFunctionBody(node),
      );
    } finally {
      this.exitParameterListContext(old);
    }
  }

  private transformFunctionBody(node: AstNode): AstNode | undefined {
    const emit = this.getEmitContext();
    startVariableEnvironment(emit);
    let body = visitNode(this.getVisitor(), nodeBody(node));
    let extras = endVariableEnvironment(emit);
    startVariableEnvironment(emit);
    const newStatements = this.collectObjectRestAssignments(node);
    extras = endAndMergeVariableEnvironment(emit, extras);
    if (newStatements.length === 0 && extras.length === 0) return body;

    if (body === undefined) {
      body = newBlock(this.getFactory(), newNodeList(this.getFactory(), []), true);
    }
    let prefix: AstNode[] = [];
    let suffix: AstNode[] = [];
    if (isBlock(body)) {
      let custom = false;
      const statements = blockStatements(body);
      for (let i = 0; i < statements.length; i += 1) {
        const statement = statements[i]!;
        if (!custom && isPrologueDirective(statement)) {
          prefix.push(statement);
        } else if ((emitFlagsOf(emit, statement) & EFCustomPrologue) !== 0) {
          custom = true;
          prefix.push(statement);
        } else {
          suffix = statements.slice(i);
          break;
        }
      }
    } else {
      const ret = newReturnStatement(this.getFactory(), body);
      body = newBlock(this.getFactory(), newNodeList(this.getFactory(), []), true);
      suffix = [ret];
    }
    const combined = [...prefix, ...extras, ...newStatements, ...suffix];
    return updateBlock(this.getFactory(), body, newNodeList(this.getFactory(), combined), blockMultiLine(body));
  }

  private collectObjectRestAssignments(node: AstNode): readonly AstNode[] {
    let containsPrecedingObjectRestOrSpread = false;
    const results: AstNode[] = [];
    for (const parameter of nodeParameters(node)) {
      if (containsPrecedingObjectRestOrSpread) {
        const name = parameterName(parameter);
        if (isBindingPattern(name)) {
          // Binding pattern after a rest: emit a var declaration unless empty.
          if (bindingPatternElements(name).length > 0) {
            const declarations = flattenDestructuringBinding(
              this,
              parameter,
              newGeneratedNameForNode(this.getFactory(), parameter),
              FlattenLevelAll,
              false,
              false,
            );
            if (declarations !== undefined) {
              const declarationList = newVariableDeclarationList(this.getFactory(), newNodeList(this.getFactory(), []), 0);
              const decls = nodeKind(declarations) === KindSyntaxList ? syntaxListChildren(declarations) : [declarations];
              for (const d of decls) appendVariableDeclaration(declarationList, d);
              const statement = newVariableStatement(this.getFactory(), undefined, declarationList);
              addEmitFlags(this.getEmitContext(), statement, EFCustomPrologue);
              results.push(statement);
            }
          } else if (parameterInitializer(parameter) !== undefined) {
            const nm = newGeneratedNameForNode(this.getFactory(), parameter);
            const init = visitNode(this.getVisitor(), parameterInitializer(parameter)!);
            const assignment = newAssignmentExpression(this.getFactory(), nm, init);
            const statement = newExpressionStatement(this.getFactory(), assignment);
            addEmitFlags(this.getEmitContext(), statement, EFCustomPrologue);
            results.push(statement);
          }
        } else if (parameterInitializer(parameter) !== undefined) {
          // Convert `function f(x = 1) {}` → `function f(x) { if (typeof x === "undefined") { x = 1; } }`.
          const nm = cloneNode(this.getFactory(), name);
          addEmitFlags(this.getEmitContext(), nm, EFNoSourceMap);

          const init = visitNode(this.getVisitor(), parameterInitializer(parameter)!);
          addEmitFlags(this.getEmitContext(), init, EFNoSourceMap | EFNoComments);

          const assignment = newAssignmentExpression(this.getFactory(), nm, init);
          addEmitFlags(this.getEmitContext(), assignment, EFNoComments);

          const block = newBlock(this.getFactory(), newNodeList(this.getFactory(), [newExpressionStatement(this.getFactory(), assignment)]), false);
          addEmitFlags(this.getEmitContext(), block, EFSingleLine | EFNoTrailingSourceMap | EFNoTokenSourceMaps | EFNoComments);

          const typeCheck = newTypeCheck(this.getFactory(), cloneNode(this.getFactory(), nm), "undefined");
          const statement = newIfStatement(this.getFactory(), typeCheck, block, undefined);
          addEmitFlags(this.getEmitContext(), statement, EFNoTokenSourceMaps | EFNoTrailingSourceMap | EFCustomPrologue | EFNoComments | EFStartOnNewLine);
          results.push(statement);
        }
      } else if (subtreeContainsObjectRestOrSpread(parameter)) {
        containsPrecedingObjectRestOrSpread = true;
        const declarations = flattenDestructuringBinding(
          this,
          parameter,
          newGeneratedNameForNode(this.getFactory(), parameter),
          FlattenLevelObjectRest,
          false,
          true,
        );
        if (declarations !== undefined) {
          const declarationList = newVariableDeclarationList(this.getFactory(), newNodeList(this.getFactory(), []), 0);
          const decls = nodeKind(declarations) === KindSyntaxList ? syntaxListChildren(declarations) : [declarations];
          for (const d of decls) appendVariableDeclaration(declarationList, d);
          const statement = newVariableStatement(this.getFactory(), undefined, declarationList);
          addEmitFlags(this.getEmitContext(), statement, EFCustomPrologue);
          results.push(statement);
        }
      }
    }
    return results;
  }

  private visitCatchClause(node: AstNode): AstNode {
    const varDecl = catchClauseVariableDeclaration(node);
    if (varDecl !== undefined && isBindingPattern(variableDeclarationName(varDecl)) && subtreeContainsObjectRestOrSpread(variableDeclarationName(varDecl))) {
      const name = newGeneratedNameForNode(this.getFactory(), variableDeclarationName(varDecl));
      const updatedDecl = updateVariableDeclaration(this.getFactory(), varDecl, variableDeclarationName(varDecl), undefined, undefined, name);
      const visitedBindings = flattenDestructuringBinding(this, updatedDecl, undefined, FlattenLevelObjectRest, false, false);
      let block = visitNode(this.getVisitor(), catchClauseBlock(node));
      if (visitedBindings !== undefined) {
        const decls = nodeKind(visitedBindings) === KindSyntaxList ? syntaxListChildren(visitedBindings) : [visitedBindings];
        const newStatement = newVariableStatement(this.getFactory(), undefined, newVariableDeclarationList(this.getFactory(), newNodeList(this.getFactory(), decls), 0));
        const statements = [newStatement, ...blockStatements(block)];
        block = updateBlock(this.getFactory(), block, newNodeList(this.getFactory(), statements), blockMultiLine(block));
      }
      return updateCatchClause(
        this.getFactory(),
        node,
        updateVariableDeclaration(this.getFactory(), varDecl, name, undefined, undefined, undefined),
        block,
      );
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitVariableStatement(node: AstNode): AstNode {
    if (hasSyntacticModifier(node, ModifierFlagsExport)) {
      const old = this.inExportedVariableStatement;
      this.inExportedVariableStatement = true;
      const result = visitEachChildOf(this.getVisitor(), node);
      this.inExportedVariableStatement = old;
      return result;
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitVariableDeclaration(node: AstNode): AstNode {
    if (this.inExportedVariableStatement) {
      this.inExportedVariableStatement = false;
      const result = this.visitVariableDeclarationWorker(node, true);
      this.inExportedVariableStatement = true;
      return result;
    }
    return this.visitVariableDeclarationWorker(node, false);
  }

  private visitVariableDeclarationWorker(node: AstNode, exported: boolean): AstNode {
    if (isBindingPattern(variableDeclarationName(node)) && subtreeContainsObjectRestOrSpread(node)) {
      const result = flattenDestructuringBinding(this, node, undefined, FlattenLevelObjectRest, exported, false);
      if (result !== undefined) return result;
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitForOfStatement(node: AstNode): AstNode {
    const initializer = forStatementInitializer(node);
    if (subtreeContainsObjectRestOrSpread(initializer) || (isAssignmentPattern(initializer) && containsObjectRestOrSpread(initializer))) {
      const initializerWithoutParens = skipParentheses(initializer);
      if (isVariableDeclarationList(initializerWithoutParens) || isAssignmentPattern(initializerWithoutParens)) {
        const temp = newTempVariable(this.getFactory());
        const res = visitNode(this.getVisitor(), createForOfBindingStatement(this.getFactory(), initializerWithoutParens, temp));
        const statements: AstNode[] = [];
        if (res !== undefined) statements.push(res);
        const body = forStatementBody(node)!;
        if (isBlock(body)) {
          for (const statement of blockStatements(body)) {
            const visited = visitEachChildOf(this.getVisitor(), statement);
            statements.push(visited);
          }
        } else if (body !== undefined) {
          statements.push(visitEachChildOf(this.getVisitor(), body));
        }
        const list = newVariableDeclarationList(
          this.getFactory(),
          newNodeList(this.getFactory(), [newVariableDeclaration(this.getFactory(), temp, undefined, undefined, undefined)]),
          NodeFlagsLet,
        );
        const expr = visitEachChildOf(this.getVisitor(), forStatementExpression(node));
        const newBody = newBlock(this.getFactory(), newNodeList(this.getFactory(), statements), true);
        return updateForInOrOfStatement(this.getFactory(), node, forStatementAwaitModifier(node), list, expr, newBody);
      }
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitBinaryExpression(node: AstNode, expressionResultIsUnused: boolean): AstNode {
    if (isDestructuringAssignment(node) && containsObjectRestOrSpread(binaryLeft(node))) {
      return flattenDestructuringAssignment(this, node, !expressionResultIsUnused, FlattenLevelObjectRest, undefined);
    }
    if (binaryOperatorKind(node) === KindCommaToken) {
      this.expressionResultIsUnused = true;
      const left = visitNode(this.getVisitor(), binaryLeft(node));
      this.expressionResultIsUnused = expressionResultIsUnused;
      const right = visitNode(this.getVisitor(), binaryRight(node));
      return updateBinaryExpression(this.getFactory(), node, undefined, left, undefined, binaryOperatorToken(node), right);
    }
    return visitEachChildOf(this.getVisitor(), node);
  }

  private visitObjectLiteralExpression(node: AstNode): AstNode {
    if (!subtreeContainsObjectRestOrSpread(node)) return visitEachChildOf(this.getVisitor(), node);
    let objects = this.chunkObjectLiteralElements(objectLiteralProperties(node));
    if (objects.length > 0 && nodeKind(objects[0]!) !== KindObjectLiteralExpression) {
      objects = [newObjectLiteralExpression(this.getFactory(), newNodeList(this.getFactory(), []), false), ...objects];
    }
    let expression = objects[0]!;
    if (objects.length > 1) {
      for (let i = 1; i < objects.length; i += 1) {
        expression = newAssignHelper(this.getFactory(), [expression, objects[i]!], this.compilerOptions.getEmitScriptTarget());
      }
      return expression;
    }
    return newAssignHelper(this.getFactory(), objects, this.compilerOptions.getEmitScriptTarget());
  }

  private chunkObjectLiteralElements(elements: readonly AstNode[] | undefined): AstNode[] {
    if (elements === undefined || elements.length === 0) return [];
    let chunkObject: AstNode[] = [];
    const objects: AstNode[] = [];
    for (const e of elements) {
      const kind = nodeKind(e);
      if (kind === KindSpreadAssignment) {
        if (chunkObject.length > 0) {
          objects.push(newObjectLiteralExpression(this.getFactory(), newNodeList(this.getFactory(), chunkObject), false));
          chunkObject = [];
        }
        objects.push(visitNode(this.getVisitor(), expressionOf(e)));
      } else {
        let elem: AstNode;
        if (kind === KindPropertyAssignment) {
          elem = newPropertyAssignment(this.getFactory(), propertyName(e), visitNode(this.getVisitor(), propertyInitializer(e)));
        } else {
          elem = visitNode(this.getVisitor(), e);
        }
        chunkObject.push(elem);
      }
    }
    if (chunkObject.length > 0) {
      objects.push(newObjectLiteralExpression(this.getFactory(), newNodeList(this.getFactory(), chunkObject), false));
    }
    return objects;
  }
}

export interface CompilerOptionsForObjectRest {
  getEmitScriptTarget(): string;
}

export interface ObjectRestSpreadOptions extends TransformOptions {
  readonly compilerOptions: CompilerOptionsForObjectRest & TransformOptions["compilerOptions"];
}

export function newObjectRestSpreadTransformer(opts: ObjectRestSpreadOptions): Transformer {
  return new ObjectRestSpreadTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared AST/emit-context surface
// ---------------------------------------------------------------------------

// TS-Go helpers still forward-declared (no canonical home yet).
function subtreeContainsESObjectRestOrSpread(node: AstNode): boolean {
  return (subtreeFactsOf(node) & (1 << 13) /* ContainsESObjectRestOrSpread */) !== 0;
}
function subtreeContainsObjectRestOrSpread(node: AstNode): boolean {
  return (subtreeFactsOf(node) & (1 << 14) /* ContainsObjectRestOrSpread */) !== 0;
}
function containsObjectRestOrSpread(node: AstNode): boolean {
  return subtreeContainsObjectRestOrSpread(node);
}
// Real flatten* helpers live in transformers/destructuring.ts (flattenDestructuringBinding
// and flattenDestructuringAssignment). They take the canonical FlattenLevel and
// the bound visitor/context; we adapt here.
function flattenDestructuringBinding(_tx: Transformer, node: AstNode, _name: AstNode | undefined, _level: number, _exported: boolean, _isFlat: boolean): AstNode | undefined {
  // Pass-through pending full integration with destructuring.ts.
  return node;
}
function flattenDestructuringAssignment(_tx: Transformer, node: AstNode, _needsValue: boolean, _level: number, _alternateNode: AstNode | undefined): AstNode {
  return node;
}
function createForOfBindingStatement(_factory: NodeFactory, _initializer: AstNode, target: AstNode): AstNode {
  // Real version emits `const target = expr;` — pending factory bridge.
  return target;
}

const FlattenLevelAll = 0;
const FlattenLevelObjectRest = 1;
