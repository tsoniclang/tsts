/**
 * Downlevel `for await...of` and async generator transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/forawait.go`.
 * Lowers `for await...of` to a `try/catch/finally` with a manual
 * iterator protocol and lowers async generators using the
 * `__asyncGenerator`, `__asyncValues`, `__asyncDelegator`, and
 * `__await` runtime helpers.
 *
 * Cross-module dependencies (factory, emit context, ast surface,
 * collections.OrderedSet) are forward-declared at the file end.
 */

import { SuperAccessState } from "./utilities.js";
import type { Node as AstNode, NodeArray, NodeList, SourceFile, AwaitExpression, YieldExpression, ReturnStatement, LabeledStatement, ForInOrOfStatement, ModifierList, ConstructorDeclaration, GetAccessorDeclaration, SetAccessorDeclaration, MethodDeclaration, FunctionDeclaration, ArrowFunction, FunctionExpression, Block, TextRange } from "../../ast/index.js";
import {
  nodeLoc, setLoc, nodeBody, nodeName, isBlockNode,
  blockStatements, blockStatementList, blockStatementListLoc, blockMultiLine,
  declModifiers, declParameters, methodAsteriskToken, arrowEqualsGreaterThanToken,
  parameterInitializer, parameterDotDotDotToken, parameterName,
  getFunctionFlags,
  subtreeFacts, awaitExpressionOf,
  forInOrOfAwaitModifierOpt as forInOrOfAwaitModifier,
  forInOrOfInitializer, forInOrOfExpression, forInOrOfExpressionNode,
  forInOrOfBody as forInOrOfStatementBody,
  declName, nodeParameters, nodeParameterList,
  functionAsteriskToken, functionExpressionAsteriskToken,
} from "../../ast/index.js";
import { newOrderedSet } from "../../printer/factory-helpers.js";
import { Kind, NodeFlags } from "../../ast/index.js";
import { isIdentifier } from "../../ast/index.js";
import { EmitFlags } from "../../printer/emitflags.js";
import { GeneratedIdentifierFlags } from "../../printer/namegenerator.js";
import type { CompilerOptions } from "../../core/compileroptions.js";
import { Transformer, type TransformOptions, type NodeVisitor } from "../transformer.js";
type TokenNode = AstNode;

// ---------------------------------------------------------------------------
// Hierarchy facts (literal-union + const object — no enums)
// ---------------------------------------------------------------------------

export type ForAwaitHierarchyFacts = number;

export const ForAwaitHierarchyFacts = {
  None: 0 as ForAwaitHierarchyFacts,

  // Ancestor facts (bit flags)
  HasLexicalThis: 1 << 0 as ForAwaitHierarchyFacts,
  IterationContainer: 1 << 1 as ForAwaitHierarchyFacts,

  // Ancestor mask: union of all ancestor-fact bits.
  AncestorFactsMask: ((1 << 2) - 1) as ForAwaitHierarchyFacts,

  // Pre-computed include/exclude pairs for hierarchy entries.
  SourceFileExcludes: (1 << 1) as ForAwaitHierarchyFacts,
  StrictModeSourceFileIncludes: 0 as ForAwaitHierarchyFacts,

  ClassOrFunctionIncludes: (1 << 0) as ForAwaitHierarchyFacts,
  ClassOrFunctionExcludes: (1 << 1) as ForAwaitHierarchyFacts,

  ArrowFunctionIncludes: 0 as ForAwaitHierarchyFacts,
  ArrowFunctionExcludes: (1 << 1) as ForAwaitHierarchyFacts,

  IterationStatementIncludes: (1 << 1) as ForAwaitHierarchyFacts,
  IterationStatementExcludes: 0 as ForAwaitHierarchyFacts,
} as const;

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class ForAwaitTransformer extends Transformer {
  readonly superAccessState: SuperAccessState;
  readonly compilerOptions: CompilerOptions;

  enclosingFunctionFlags: number;
  forAwaitHierarchyFacts: ForAwaitHierarchyFacts;
  exportedVariableStatement: boolean;

  readonly fallbackNodeVisitor: NodeVisitor;
  readonly noAsyncModifierVisitor: NodeVisitor;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions as CompilerOptions;
    this.superAccessState = new SuperAccessState();
    this.enclosingFunctionFlags = FunctionFlags.Normal;
    this.forAwaitHierarchyFacts = ForAwaitHierarchyFacts.None;
    this.exportedVariableStatement = false;
    this.initTransformer((node) => this.visit(node), opts.context);
    this.superAccessState.initSuperAccessVisitor(this.emitContext(), this.factory());
    this.fallbackNodeVisitor = this.emitContext().newNodeVisitor((node) => this.visitFallback(node));
    this.noAsyncModifierVisitor = this.emitContext().newNodeVisitor((node) => {
      if (node.kind === Kind.AsyncKeyword) return undefined;
      return node;
    });
  }

  // -------------------------------------------------------------------------
  // Hierarchy-fact helpers
  // -------------------------------------------------------------------------

  affectsSubtree(excludeFacts: ForAwaitHierarchyFacts, includeFacts: ForAwaitHierarchyFacts): boolean {
    return this.forAwaitHierarchyFacts !== ((this.forAwaitHierarchyFacts & ~excludeFacts) | includeFacts);
  }

  enterSubtree(excludeFacts: ForAwaitHierarchyFacts, includeFacts: ForAwaitHierarchyFacts): ForAwaitHierarchyFacts {
    const ancestorFacts = this.forAwaitHierarchyFacts;
    this.forAwaitHierarchyFacts =
      ((this.forAwaitHierarchyFacts & ~excludeFacts) | includeFacts) & ForAwaitHierarchyFacts.AncestorFactsMask;
    return ancestorFacts;
  }

  exitSubtree(ancestorFacts: ForAwaitHierarchyFacts): void {
    this.forAwaitHierarchyFacts = ancestorFacts;
  }

  visitModifiersNoAsync(modifiers: ModifierList | undefined): ModifierList | undefined {
    return this.noAsyncModifierVisitor.visitModifiers(modifiers);
  }

  doWithHierarchyFacts(
    cb: (tx: ForAwaitTransformer, node: AstNode) => AstNode,
    node: AstNode,
    excludeFacts: ForAwaitHierarchyFacts,
    includeFacts: ForAwaitHierarchyFacts,
  ): AstNode {
    if (this.affectsSubtree(excludeFacts, includeFacts)) {
      const ancestorFacts = this.enterSubtree(excludeFacts, includeFacts);
      const result = cb(this, node);
      this.exitSubtree(ancestorFacts);
      return result;
    }
    return cb(this, node);
  }

  // -------------------------------------------------------------------------
  // Top-level visit dispatch
  // -------------------------------------------------------------------------

  visitDefault(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  fallbackVisitor(node: AstNode): AstNode {
    if (this.superAccessState.capturedSuperProperties === undefined) {
      return node;
    }
    switch (node.kind) {
      case Kind.FunctionExpression:
      case Kind.FunctionDeclaration:
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.Constructor:
        return node;
    }
    this.superAccessState.trackSuperAccess(node);
    return this.fallbackNodeVisitor.visitEachChild(node);
  }

  visitFallback(node: AstNode): AstNode {
    return this.fallbackVisitor(node);
  }

  visit(node: AstNode): AstNode {
    if ((subtreeFacts(node) & SubtreeFacts.ContainsForAwaitOrAsyncGenerator) === 0) {
      return this.fallbackVisitor(node);
    }
    this.superAccessState.trackSuperAccess(node);
    switch (node.kind) {
      case Kind.SourceFile:
        return this.visitSourceFile(node as unknown as SourceFile);
      case Kind.AwaitExpression:
        return this.visitAwaitExpression(node as unknown as AwaitExpression);
      case Kind.YieldExpression:
        return this.visitYieldExpression(node as unknown as YieldExpression);
      case Kind.ReturnStatement:
        return this.visitReturnStatement(node as unknown as ReturnStatement);
      case Kind.LabeledStatement:
        return this.visitLabeledStatement(node as unknown as LabeledStatement);
      case Kind.DoStatement:
      case Kind.WhileStatement:
      case Kind.ForInStatement:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitDefault(n),
          node,
          ForAwaitHierarchyFacts.IterationStatementExcludes,
          ForAwaitHierarchyFacts.IterationStatementIncludes,
        );
      case Kind.ForOfStatement:
        return this.visitForOfStatement(node as unknown as ForInOrOfStatement, undefined);
      case Kind.ForStatement:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitDefault(n),
          node,
          ForAwaitHierarchyFacts.IterationStatementExcludes,
          ForAwaitHierarchyFacts.IterationStatementIncludes,
        );
      case Kind.Constructor:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitConstructorDeclaration(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      case Kind.MethodDeclaration:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitMethodDeclaration(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      case Kind.GetAccessor:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitGetAccessorDeclaration(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      case Kind.SetAccessor:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitSetAccessorDeclaration(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      case Kind.FunctionDeclaration:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitFunctionDeclaration(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      case Kind.FunctionExpression:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitFunctionExpression(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      case Kind.ArrowFunction:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitArrowFunction(n),
          node,
          ForAwaitHierarchyFacts.ArrowFunctionExcludes,
          ForAwaitHierarchyFacts.ArrowFunctionIncludes,
        );
      case Kind.ClassDeclaration:
      case Kind.ClassExpression:
        return this.doWithHierarchyFacts(
          (tx, n) => tx.visitDefault(n),
          node,
          ForAwaitHierarchyFacts.ClassOrFunctionExcludes,
          ForAwaitHierarchyFacts.ClassOrFunctionIncludes,
        );
      default:
        return this.visitor().visitEachChild(node);
    }
  }

  // -------------------------------------------------------------------------
  // Per-kind visitors
  // -------------------------------------------------------------------------

  visitAwaitExpression(node: AwaitExpression): AstNode {
    if (
      (this.enclosingFunctionFlags & FunctionFlags.Async) !== 0 &&
      (this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0
    ) {
      const result = this.factory().newYieldExpression(
        undefined,
        this.factory().newAwaitHelper(this.visitor().visitNode(awaitExpressionOf(node))),
      );
      setLoc(result, nodeLoc(node as unknown as AstNode));
      this.emitContext().setOriginal(result, node as unknown as AstNode);
      return result;
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitYieldExpression(node: YieldExpression): AstNode {
    if (
      (this.enclosingFunctionFlags & FunctionFlags.Async) !== 0 &&
      (this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0
    ) {
      const asterisk = yieldAsteriskToken(node);
      if (asterisk !== undefined) {
        const expression = this.visitor().visitNode(yieldExpressionOf(node));

        const asyncValuesResult = this.factory().newAsyncValuesHelper(expression);
        setLoc(asyncValuesResult, nodeLoc(expression));

        const asyncDelegatorResult = this.factory().newAsyncDelegatorHelper(asyncValuesResult);
        setLoc(asyncDelegatorResult, nodeLoc(expression));

        const innerYield = this.factory().updateYieldExpression(
          node,
          asterisk,
          asyncDelegatorResult,
        );

        const awaitedYield = this.factory().newAwaitHelper(innerYield);

        const result = this.factory().newYieldExpression(undefined, awaitedYield);
        setLoc(result, nodeLoc(node as unknown as AstNode));
        this.emitContext().setOriginal(result, node as unknown as AstNode);
        return result;
      }

      let innerExpression: AstNode;
      const exp = yieldExpressionOf(node);
      if (exp !== undefined) {
        innerExpression = this.visitor().visitNode(exp);
      } else {
        innerExpression = this.factory().newVoidZeroExpression();
      }

      const result = this.factory().newYieldExpression(undefined, this.createDownlevelAwait(innerExpression));
      setLoc(result, nodeLoc(node as unknown as AstNode));
      this.emitContext().setOriginal(result, node as unknown as AstNode);
      return result;
    }

    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitReturnStatement(node: ReturnStatement): AstNode {
    if (
      (this.enclosingFunctionFlags & FunctionFlags.Async) !== 0 &&
      (this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0
    ) {
      let expression: AstNode;
      const exp = returnExpressionOf(node);
      if (exp !== undefined) {
        expression = this.visitor().visitNode(exp);
      } else {
        expression = this.factory().newVoidZeroExpression();
      }
      return this.factory().updateReturnStatement(node, this.createDownlevelAwait(expression));
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitLabeledStatement(node: LabeledStatement): AstNode {
    if ((this.enclosingFunctionFlags & FunctionFlags.Async) !== 0) {
      const statement = unwrapInnermostStatementOfLabel(node);
      if (
        statement.kind === Kind.ForOfStatement &&
        forInOrOfAwaitModifier(statement as unknown as ForInOrOfStatement) !== undefined
      ) {
        return this.visitForOfStatement(statement as unknown as ForInOrOfStatement, node);
      }
      return this.factory().restoreEnclosingLabel(this.visitor().visitNode(statement), node);
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitSourceFile(node: SourceFile): AstNode {
    const ancestorFacts = this.enterSubtree(
      ForAwaitHierarchyFacts.SourceFileExcludes,
      ForAwaitHierarchyFacts.StrictModeSourceFileIncludes,
    );
    this.exportedVariableStatement = false;
    const visited = this.visitor().visitEachChild(node as unknown as AstNode);
    this.emitContext().addEmitHelpers(visited, this.emitContext().readEmitHelpers());
    this.exitSubtree(ancestorFacts);
    return visited;
  }

  // -------------------------------------------------------------------------
  // For-await-of lowering
  // -------------------------------------------------------------------------

  visitForOfStatement(node: ForInOrOfStatement, outermostLabeledStatement: LabeledStatement | undefined): AstNode {
    const ancestorFacts = this.enterSubtree(
      ForAwaitHierarchyFacts.IterationStatementExcludes,
      ForAwaitHierarchyFacts.IterationStatementIncludes,
    );
    let result: AstNode;
    if (forInOrOfAwaitModifier(node) !== undefined) {
      result = this.transformForAwaitOfStatement(node, outermostLabeledStatement, ancestorFacts);
    } else {
      result = this.factory().restoreEnclosingLabel(
        this.visitor().visitEachChild(node as unknown as AstNode),
        outermostLabeledStatement,
      );
    }
    this.exitSubtree(ancestorFacts);
    return result;
  }

  convertForOfStatementHead(node: ForInOrOfStatement, boundValue: AstNode, nonUserCode: AstNode): AstNode {
    const f = this.factory();
    const value = f.newTempVariable();
    this.emitContext().addVariableDeclaration(value);
    const iteratorValueExpression = f.newAssignmentExpression(value, boundValue);
    const iteratorValueStatement = f.newExpressionStatement(iteratorValueExpression);
    this.emitContext().setSourceMapRange(iteratorValueStatement, nodeLoc(forInOrOfExpression(node)));

    const exitNonUserCodeExpression = f.newAssignmentExpression(nonUserCode, f.newKeywordExpression(Kind.FalseKeyword));
    const exitNonUserCodeStatement = f.newExpressionStatement(exitNonUserCodeExpression);
    this.emitContext().setSourceMapRange(exitNonUserCodeStatement, nodeLoc(forInOrOfExpression(node)));

    const statements: AstNode[] = [iteratorValueStatement, exitNonUserCodeStatement];
    const binding = this.factory().createForOfBindingStatement(forInOrOfInitializer(node), value);
    statements.push(this.visitor().visitNode(binding));

    let bodyLocation: unknown;
    let statementsLocation: unknown;
    const statement = this.visitor().visitEmbeddedStatement(forInOrOfStatementBody(node));
    if (isBlockNode(statement)) {
      for (const s of blockStatements(statement)) statements.push(s);
      bodyLocation = nodeLoc(statement);
      statementsLocation = blockStatementListLoc(statement);
    } else {
      statements.push(statement);
    }

    const stmtList = f.newNodeList(statements);
    if (statementsLocation !== undefined) setLoc(stmtList, statementsLocation);
    const block = f.newBlock(stmtList, true);
    if (bodyLocation !== undefined) setLoc(block, bodyLocation);
    return block;
  }

  createDownlevelAwait(expression: AstNode): AstNode {
    if ((this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0) {
      return this.factory().newYieldExpression(undefined, this.factory().newAwaitHelper(expression));
    }
    return this.factory().newAwaitExpression(expression);
  }

  transformForAwaitOfStatement(
    node: ForInOrOfStatement,
    outermostLabeledStatement: LabeledStatement | undefined,
    ancestorFacts: ForAwaitHierarchyFacts,
  ): AstNode {
    const f = this.factory();
    const expression = this.visitor().visitNode(forInOrOfExpressionNode(node));

    let iterator: AstNode;
    if (isIdentifier(expression)) {
      iterator = f.newGeneratedNameForNode(expression);
    } else {
      iterator = f.newTempVariable();
    }

    let result: AstNode;
    if (isIdentifier(expression)) {
      result = f.newGeneratedNameForNode(iterator);
    } else {
      result = f.newTempVariable();
    }

    const nonUserCode = f.newTempVariable();
    const done = f.newTempVariable();
    this.emitContext().addVariableDeclaration(done);
    const errorRecord = f.newUniqueName("e");
    const catchVariable = f.newGeneratedNameForNode(errorRecord);
    const returnMethod = f.newTempVariable();
    const callValues = f.newAsyncValuesHelper(expression);
    setLoc(callValues, nodeLoc(forInOrOfExpressionNode(node)));
    const callNext = f.newCallExpression(
      f.newPropertyAccessExpression(iterator, undefined, f.newIdentifier("next"), NodeFlags.None),
      undefined,
      undefined,
      f.newNodeList<AstNode>([]),
      NodeFlags.None,
    );
    const getDone = f.newPropertyAccessExpression(result, undefined, f.newIdentifier("done"), NodeFlags.None);
    const getValue = f.newPropertyAccessExpression(result, undefined, f.newIdentifier("value"), NodeFlags.None);
    const callReturn = f.newFunctionCallCall(returnMethod, iterator, []);

    this.emitContext().addVariableDeclaration(errorRecord);
    this.emitContext().addVariableDeclaration(returnMethod);

    // if we are enclosed in an outer loop ensure we reset 'errorRecord' per each iteration
    let initializer: AstNode;
    if ((ancestorFacts & ForAwaitHierarchyFacts.IterationContainer) !== 0) {
      initializer = f.inlineExpressions([
        f.newAssignmentExpression(errorRecord, f.newVoidZeroExpression()),
        callValues,
      ]);
    } else {
      initializer = callValues;
    }

    // Build the for statement
    const iteratorDecl = f.newVariableDeclaration(iterator, undefined, undefined, initializer);
    setLoc(iteratorDecl, nodeLoc(forInOrOfExpressionNode(node)));
    const varDeclList = f.newVariableDeclarationList(
      f.newNodeList<AstNode>([
        f.newVariableDeclaration(nonUserCode, undefined, undefined, f.newKeywordExpression(Kind.TrueKeyword)),
        iteratorDecl,
        f.newVariableDeclaration(result, undefined, undefined, undefined),
      ]),
      NodeFlags.None,
    );
    setLoc(varDeclList, nodeLoc(forInOrOfExpressionNode(node)));

    const condition = f.inlineExpressions([
      f.newAssignmentExpression(result, this.createDownlevelAwait(callNext)),
      f.newAssignmentExpression(done, getDone),
      f.newPrefixUnaryExpression(Kind.ExclamationToken, done),
    ]);

    const incrementor = f.newAssignmentExpression(nonUserCode, f.newKeywordExpression(Kind.TrueKeyword));

    const forStatement = f.newForStatement(
      varDeclList,
      condition,
      incrementor,
      this.convertForOfStatementHead(node, getValue, nonUserCode),
    );
    setLoc(forStatement, nodeLoc(node as unknown as AstNode));
    this.emitContext().addEmitFlags(forStatement, EmitFlags.NoTokenTrailingSourceMaps);
    this.emitContext().setOriginal(forStatement, node as unknown as AstNode);

    // Build the try/catch/finally
    const tryBlock = f.newBlock(
      f.newNodeList<AstNode>([f.restoreEnclosingLabel(forStatement, outermostLabeledStatement)]),
      true,
    );

    // catch clause: { e_1 = { error: e_2 }; }
    const catchBody = f.newBlock(
      f.newNodeList<AstNode>([
        f.newExpressionStatement(
          f.newAssignmentExpression(
            errorRecord,
            f.newObjectLiteralExpression(
              f.newNodeList<AstNode>([
                f.newPropertyAssignment(undefined, f.newIdentifier("error"), undefined, undefined, catchVariable),
              ]),
              false,
            ),
          ),
        ),
      ]),
      false,
    );
    this.emitContext().addEmitFlags(catchBody, EmitFlags.SingleLine);
    const catchClause = f.newCatchClause(f.newVariableDeclaration(catchVariable, undefined, undefined, undefined), catchBody);

    // finally block
    // inner try: if (!nonUserCode && !done && (returnMethod = iterator.return)) await returnMethod.call(iterator);
    const innerIfCondition = f.newBinaryExpression(
      undefined,
      f.newBinaryExpression(
        undefined,
        f.newPrefixUnaryExpression(Kind.ExclamationToken, nonUserCode),
        undefined,
        f.newToken(Kind.AmpersandAmpersandToken),
        f.newPrefixUnaryExpression(Kind.ExclamationToken, done),
      ),
      undefined,
      f.newToken(Kind.AmpersandAmpersandToken),
      f.newAssignmentExpression(
        returnMethod,
        f.newPropertyAccessExpression(iterator, undefined, f.newIdentifier("return"), NodeFlags.None),
      ),
    );
    const innerIfStatement = f.newIfStatement(
      innerIfCondition,
      f.newExpressionStatement(this.createDownlevelAwait(callReturn)),
      undefined,
    );
    this.emitContext().addEmitFlags(innerIfStatement, EmitFlags.SingleLine);

    const innerTryBlock = f.newBlock(f.newNodeList<AstNode>([innerIfStatement]), false);

    // inner finally: if (errorRecord) throw errorRecord.error;
    const innerFinallyIf = f.newIfStatement(
      errorRecord,
      f.newThrowStatement(f.newPropertyAccessExpression(errorRecord, undefined, f.newIdentifier("error"), NodeFlags.None)),
      undefined,
    );
    this.emitContext().addEmitFlags(innerFinallyIf, EmitFlags.SingleLine);
    const innerFinallyBlock = f.newBlock(f.newNodeList<AstNode>([innerFinallyIf]), false);
    this.emitContext().addEmitFlags(innerFinallyBlock, EmitFlags.SingleLine);

    const innerTryStatement = f.newTryStatement(innerTryBlock, undefined, innerFinallyBlock);
    const finallyBlock = f.newBlock(f.newNodeList<AstNode>([innerTryStatement]), true);

    return f.newTryStatement(tryBlock, catchClause, finallyBlock);
  }

  // -------------------------------------------------------------------------
  // Function-like declarations
  // -------------------------------------------------------------------------

  visitConstructorDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as ConstructorDeclaration;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);
    const updated = this.factory().updateConstructorDeclaration(
      decl,
      declModifiers(decl),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      this.emitContext().visitFunctionBody(nodeBody(node), this.visitor()),
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  visitGetAccessorDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as GetAccessorDeclaration;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);
    const updated = this.factory().updateGetAccessorDeclaration(
      decl,
      declModifiers(decl),
      this.visitor().visitNode(declName(decl)),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      this.emitContext().visitFunctionBody(nodeBody(node), this.visitor()),
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  visitSetAccessorDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as SetAccessorDeclaration;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);
    const updated = this.factory().updateSetAccessorDeclaration(
      decl,
      declModifiers(decl),
      this.visitor().visitNode(declName(decl)),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      this.emitContext().visitFunctionBody(nodeBody(node), this.visitor()),
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  visitMethodDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as MethodDeclaration;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);

    let modifiers: ModifierList | undefined;
    if ((this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0) {
      modifiers = this.visitModifiersNoAsync(declModifiers(decl));
    } else {
      modifiers = declModifiers(decl);
    }

    let asteriskToken: TokenNode | undefined;
    if ((this.enclosingFunctionFlags & FunctionFlags.Async) !== 0) {
      asteriskToken = undefined;
    } else {
      asteriskToken = methodAsteriskToken(decl);
    }

    let parameters: NodeArray<AstNode>;
    let body: AstNode | undefined;
    if (
      (this.enclosingFunctionFlags & FunctionFlags.Async) !== 0 &&
      (this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0
    ) {
      parameters = this.transformAsyncGeneratorFunctionParameterList(node);
      body = this.transformAsyncGeneratorFunctionBody(node);
    } else {
      parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
      body = this.emitContext().visitFunctionBody(nodeBody(node), this.visitor());
    }

    const updated = this.factory().updateMethodDeclaration(
      decl,
      modifiers,
      asteriskToken,
      this.visitor().visitNode(declName(decl)),
      undefined,
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  visitFunctionDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as FunctionDeclaration;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);

    let modifiers: ModifierList | undefined;
    if ((this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0) {
      modifiers = this.visitModifiersNoAsync(declModifiers(decl));
    } else {
      modifiers = declModifiers(decl);
    }

    let asteriskToken: TokenNode | undefined;
    if ((this.enclosingFunctionFlags & FunctionFlags.Async) !== 0) {
      asteriskToken = undefined;
    } else {
      asteriskToken = functionAsteriskToken(decl);
    }

    let parameters: NodeArray<AstNode>;
    let body: AstNode | undefined;
    if (
      (this.enclosingFunctionFlags & FunctionFlags.Async) !== 0 &&
      (this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0
    ) {
      parameters = this.transformAsyncGeneratorFunctionParameterList(node);
      body = this.transformAsyncGeneratorFunctionBody(node);
    } else {
      parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
      body = this.emitContext().visitFunctionBody(nodeBody(node), this.visitor());
    }

    const updated = this.factory().updateFunctionDeclaration(
      decl,
      modifiers,
      asteriskToken,
      declName(decl),
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  visitArrowFunction(node: AstNode): AstNode {
    const decl = node as unknown as ArrowFunction;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);
    const updated = this.factory().updateArrowFunction(
      decl,
      declModifiers(decl),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      arrowEqualsGreaterThanToken(decl),
      this.emitContext().visitFunctionBody(nodeBody(node), this.visitor()),
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  visitFunctionExpression(node: AstNode): AstNode {
    const decl = node as unknown as FunctionExpression;
    const saved = this.enclosingFunctionFlags;
    this.enclosingFunctionFlags = getFunctionFlags(node);

    let modifiers: ModifierList | undefined;
    if ((this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0) {
      modifiers = this.visitModifiersNoAsync(declModifiers(decl));
    } else {
      modifiers = declModifiers(decl);
    }

    let asteriskToken: TokenNode | undefined;
    if ((this.enclosingFunctionFlags & FunctionFlags.Async) !== 0) {
      asteriskToken = undefined;
    } else {
      asteriskToken = functionExpressionAsteriskToken(decl);
    }

    let parameters: NodeArray<AstNode>;
    let body: AstNode | undefined;
    if (
      (this.enclosingFunctionFlags & FunctionFlags.Async) !== 0 &&
      (this.enclosingFunctionFlags & FunctionFlags.Generator) !== 0
    ) {
      parameters = this.transformAsyncGeneratorFunctionParameterList(node);
      body = this.transformAsyncGeneratorFunctionBody(node);
    } else {
      parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
      body = this.emitContext().visitFunctionBody(nodeBody(node), this.visitor());
    }

    const updated = this.factory().updateFunctionExpression(
      decl,
      modifiers,
      asteriskToken,
      declName(decl),
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );
    this.enclosingFunctionFlags = saved;
    return updated;
  }

  transformAsyncGeneratorFunctionParameterList(node: AstNode): NodeArray<AstNode> {
    if (isSimpleParameterList(nodeParameters(node))) {
      return this.emitContext().visitParameters(nodeParameterList(node), this.visitor());
    }
    // Add fixed parameters to preserve the function's `length` property.
    const newParameters: AstNode[] = [];
    for (const parameter of nodeParameters(node)) {
      const initializer = parameterInitializer(parameter);
      const dotDotDot = parameterDotDotDotToken(parameter);
      if (initializer !== undefined || dotDotDot !== undefined) break;
      const newParameter = this.factory().newParameterDeclaration(
        undefined,
        undefined,
        this.factory().newGeneratedNameForNodeEx(parameterName(parameter), {
          flags: GeneratedIdentifierFlags.ReservedInNestedScopes,
        }),
        undefined,
        undefined,
        undefined,
      );
      newParameters.push(newParameter);
    }
    const newParametersArray = this.factory().newNodeList(newParameters);
    setLoc(newParametersArray, nodeLoc(nodeParameterList(node) as unknown as AstNode));
    return newParametersArray;
  }

  transformAsyncGeneratorFunctionBody(node: AstNode): AstNode {
    const f = this.factory();
    let innerParameters: NodeArray<AstNode> | undefined;
    if (!isSimpleParameterList(nodeParameters(node))) {
      innerParameters = this.emitContext().visitParameters(nodeParameterList(node), this.visitor());
    }

    const sas = this.superAccessState;
    const savedCapturedSuperProperties = sas.capturedSuperProperties;
    const savedHasSuperElementAccess = sas.hasSuperElementAccess;
    const savedHasSuperPropertyAssignment = sas.hasSuperPropertyAssignment;
    const savedSuperBinding = sas.superBinding;
    const savedSuperIndexBinding = sas.superIndexBinding;
    sas.capturedSuperProperties = newOrderedSet<string>();
    sas.hasSuperElementAccess = false;
    sas.hasSuperPropertyAssignment = false;
    sas.superBinding = f.newUniqueNameEx("_super", {
      flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
    });
    sas.superIndexBinding = f.newUniqueNameEx("_superIndex", {
      flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
    });

    let asyncBody: AstNode = f.updateBlock(
      nodeBody(node) as unknown as Block,
      this.visitor().visitNodes(blockStatementList(nodeBody(node))),
      blockMultiLine(nodeBody(node)),
    );
    asyncBody = f.updateBlock(
      asyncBody as unknown as Block,
      this.emitContext().endAndMergeVariableEnvironmentList(blockStatementList(asyncBody)),
      blockMultiLine(asyncBody),
    );

    // Substitute super property accesses with _super/_superIndex helpers
    const emitSuperHelpers = (sas.capturedSuperProperties?.size ?? 0) > 0 || sas.hasSuperElementAccess;
    if (emitSuperHelpers) {
      asyncBody = sas.substituteSuperAccessesInBody(asyncBody);
    }

    let innerParams: NodeArray<AstNode>;
    if (innerParameters !== undefined) {
      innerParams = innerParameters;
    } else {
      innerParams = f.newNodeList<AstNode>([]);
    }

    let name: AstNode | undefined;
    const declName2 = nodeName(node);
    if (declName2 !== undefined) {
      name = f.newGeneratedNameForNode(declName2);
    }

    const generatorFunc = f.newFunctionExpression(
      undefined,
      f.newToken(Kind.AsteriskToken),
      name,
      undefined,
      innerParams,
      undefined,
      undefined,
      asyncBody,
    );

    const returnStatement = f.newReturnStatement(
      f.newAsyncGeneratorHelper(
        generatorFunc,
        (this.forAwaitHierarchyFacts & ForAwaitHierarchyFacts.HasLexicalThis) !== 0,
      ),
    );

    this.emitContext().startVariableEnvironment();
    if (emitSuperHelpers) {
      if ((sas.capturedSuperProperties?.size ?? 0) > 0) {
        this.emitContext().addInitializationStatement(sas.createSuperAccessVariableStatement());
      }
    }

    const outerStatements: AstNode[] = [returnStatement];

    const block = f.updateBlock(
      nodeBody(node) as unknown as Block,
      this.emitContext().endAndMergeVariableEnvironmentList(f.newNodeList(outerStatements)),
      blockMultiLine(nodeBody(node)),
    );

    if (emitSuperHelpers && sas.hasSuperElementAccess) {
      if (sas.hasSuperPropertyAssignment) {
        this.emitContext().addEmitHelper(block, EmitHelpers.AdvancedAsyncSuper);
      } else {
        this.emitContext().addEmitHelper(block, EmitHelpers.AsyncSuper);
      }
    }

    sas.capturedSuperProperties = savedCapturedSuperProperties;
    sas.hasSuperElementAccess = savedHasSuperElementAccess;
    sas.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment;
    sas.superBinding = savedSuperBinding;
    sas.superIndexBinding = savedSuperIndexBinding;

    return block;
  }
}

// ---------------------------------------------------------------------------
// Factory function (matches TS-Go `newforawaitTransformer`)
// ---------------------------------------------------------------------------

export function newForAwaitTransformer(opts: TransformOptions): Transformer {
  return new ForAwaitTransformer(opts);
}

// ---------------------------------------------------------------------------
// Helpers / forward-declared deps
// ---------------------------------------------------------------------------

function unwrapInnermostStatementOfLabel(node: LabeledStatement): AstNode {
  let n: LabeledStatement = node;
  for (;;) {
    const stmt = labeledStatementBody(n);
    if (stmt.kind !== Kind.LabeledStatement) return stmt;
    n = stmt as unknown as LabeledStatement;
  }
}

// NodeVisitor type comes from transformer.ts via the Transformer base.

// Forward-declared local helpers — body-completion phase will fill these.
const FunctionFlags = { Normal: 0, Async: 2, Generator: 1 } as const;
const SubtreeFacts = { ContainsForAwaitOrAsyncGenerator: 1 << 0 } as const;
const EmitHelpers: { AdvancedAsyncSuper: AstNode; AsyncSuper: AstNode } = { AdvancedAsyncSuper: {} as AstNode, AsyncSuper: {} as AstNode };
function isSimpleParameterList(parameters: readonly AstNode[]): boolean {
  for (const p of parameters) {
    if ((p as unknown as { initializer?: AstNode }).initializer !== undefined) return false;
    if ((p as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined) return false;
    const name = (p as unknown as { name?: { kind?: number } }).name;
    if (name !== undefined && name.kind !== Kind.Identifier) return false;
  }
  return true;
}
function yieldExpressionOf(node: YieldExpression): AstNode | undefined {
  return (node as unknown as { expression?: AstNode }).expression;
}
function yieldAsteriskToken(node: YieldExpression): TokenNode | undefined {
  return (node as unknown as { asteriskToken?: TokenNode }).asteriskToken;
}
function returnExpressionOf(node: ReturnStatement): AstNode | undefined {
  return (node as unknown as { expression?: AstNode }).expression;
}
function labeledStatementBody(node: LabeledStatement): AstNode {
  return (node as unknown as { statement: AstNode }).statement;
}
