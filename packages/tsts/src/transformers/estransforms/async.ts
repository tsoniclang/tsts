/**
 * Async function downlevel transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/async.go` (~1007 LoC).
 * Lowers ES2017 async functions to ES5/ES6 using the `__awaiter` and
 * `__generator` runtime helpers. Hoists colliding `var` declarations,
 * captures lexical `arguments` and `super` access where needed.
 *
 * Cross-module deps (factory, emit context, ast surface, collections)
 * are forward-declared at the file end.
 */

import { SuperAccessState } from "./utilities.js";
import type { Node as AstNode, NodeArray, SourceFile, AwaitExpression, ForStatement, ForInOrOfStatement, CatchClause, VariableDeclaration, VariableDeclarationList, IdentifierNode, ConstructorDeclaration, MethodDeclaration, GetAccessorDeclaration, SetAccessorDeclaration, FunctionDeclaration, FunctionExpression, ArrowFunction, ParameterDeclaration, Block } from "../../ast/index.js";
import { Transformer, type TransformOptions, type NodeVisitor } from "../transformer.js";

// ---------------------------------------------------------------------------
// Context flags
// ---------------------------------------------------------------------------

export type AsyncContextFlags = number;

export const AsyncContextFlags = {
  NonTopLevel: 1 << 0 as AsyncContextFlags,
  HasLexicalThis: 1 << 1 as AsyncContextFlags,
} as const;

interface LexicalArgumentsInfo {
  binding: IdentifierNode | undefined;
  used: boolean;
}

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class AsyncTransformer extends Transformer {
  readonly superAccessState: SuperAccessState;

  contextFlags: AsyncContextFlags;

  enclosingFunctionParameterNames: SetOfString | undefined;
  lexicalArguments: LexicalArgumentsInfo;

  parentNode: AstNode | undefined;
  currentNode: AstNode | undefined;

  readonly asyncBodyVisitor: NodeVisitor;
  readonly fallbackNodeVisitor: NodeVisitor;

  constructor(opts: TransformOptions) {
    super();
    this.superAccessState = new SuperAccessState();
    this.contextFlags = 0;
    this.enclosingFunctionParameterNames = undefined;
    this.lexicalArguments = { binding: undefined, used: false };
    this.parentNode = undefined;
    this.currentNode = undefined;
    this.initTransformer((node) => this.visit(node), opts.context);
    this.superAccessState.initSuperAccessVisitor(this.emitContext(), this.factory());
    this.asyncBodyVisitor = this.emitContext().newNodeVisitor((node) => this.visitAsyncBodyNode(node));
    this.fallbackNodeVisitor = this.emitContext().newNodeVisitor((node) => this.visitFallback(node));
  }

  // -------------------------------------------------------------------------
  // Top-level dispatch
  // -------------------------------------------------------------------------

  visitSourceFile(node: SourceFile): AstNode {
    if (sourceFileIsDeclarationFile(node)) {
      return node as unknown as AstNode;
    }
    this.setContextFlag(AsyncContextFlags.NonTopLevel, false);
    this.setContextFlag(AsyncContextFlags.HasLexicalThis, false);
    const visited = this.visitor().visitEachChild(node as unknown as AstNode);
    this.emitContext().addEmitHelpers(visited, this.emitContext().readEmitHelpers());
    return visited;
  }

  setContextFlag(flag: AsyncContextFlags, val: boolean): void {
    if (val) this.contextFlags |= flag;
    else this.contextFlags &= ~flag;
  }

  inContext(flags: AsyncContextFlags): boolean {
    return (this.contextFlags & flags) !== 0;
  }

  inTopLevelContext(): boolean {
    return !this.inContext(AsyncContextFlags.NonTopLevel);
  }

  inHasLexicalThisContext(): boolean {
    return this.inContext(AsyncContextFlags.HasLexicalThis);
  }

  doWithContext(
    flags: AsyncContextFlags,
    cb: (tx: AsyncTransformer, node: AstNode) => AstNode,
    node: AstNode,
  ): AstNode {
    const flagsToSet = flags & ~this.contextFlags;
    if (flagsToSet !== 0) {
      this.setContextFlag(flagsToSet, true);
      const result = cb(this, node);
      this.setContextFlag(flagsToSet, false);
      return result;
    }
    return cb(this, node);
  }

  visitDefault(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  fallbackVisitor(node: AstNode): AstNode | undefined {
    if (this.superAccessState.capturedSuperProperties === undefined && this.lexicalArguments.binding === undefined) {
      return node;
    }
    this.superAccessState.trackSuperAccess(node);
    switch (node.kind) {
      case Kind.FunctionExpression:
      case Kind.FunctionDeclaration:
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.Constructor:
        return node;
      case Kind.Parameter:
      case Kind.BindingElement:
      case Kind.VariableDeclaration:
        // fall through to visitEachChild
        break;
      case Kind.Identifier:
        if (
          this.lexicalArguments.binding !== undefined &&
          nodeText(node) === "arguments" &&
          !isNameOfPropertyAccessOrAssignment(this.parentNode, node)
        ) {
          this.lexicalArguments.used = true;
          return this.lexicalArguments.binding as unknown as AstNode;
        }
        break;
    }
    return this.fallbackNodeVisitor.visitEachChild(node);
  }

  descendInto(node: AstNode): () => void {
    const savedParent = this.parentNode;
    this.parentNode = this.currentNode;
    this.currentNode = node;
    return () => {
      this.currentNode = this.parentNode;
      this.parentNode = savedParent;
    };
  }

  visitFallback(node: AstNode): AstNode | undefined {
    const cleanup = this.descendInto(node);
    try {
      return this.fallbackVisitor(node);
    } finally {
      cleanup();
    }
  }

  visit(node: AstNode): AstNode | undefined {
    const cleanup = this.descendInto(node);
    try {
      if ((subtreeFacts(node) & (SubtreeFacts.ContainsAnyAwait | SubtreeFacts.ContainsAwait)) === 0) {
        return this.fallbackVisitor(node);
      }
      this.superAccessState.trackSuperAccess(node);
      switch (node.kind) {
        case Kind.AsyncKeyword:
          // ES2017 async modifier should be elided for targets < ES2017
          return undefined;
        case Kind.SourceFile:
          return this.visitSourceFile(node as unknown as SourceFile);
        case Kind.AwaitExpression:
          return this.visitAwaitExpression(node as unknown as AwaitExpression);
        case Kind.MethodDeclaration:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitMethodDeclaration(n),
            node,
          );
        case Kind.FunctionDeclaration:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitFunctionDeclaration(n),
            node,
          );
        case Kind.FunctionExpression:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitFunctionExpression(n),
            node,
          );
        case Kind.ArrowFunction:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel,
            (tx, n) => tx.visitArrowFunction(n),
            node,
          );
        case Kind.GetAccessor:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitGetAccessorDeclaration(n),
            node,
          );
        case Kind.SetAccessor:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitSetAccessorDeclaration(n),
            node,
          );
        case Kind.Constructor:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitConstructorDeclaration(n),
            node,
          );
        case Kind.ClassDeclaration:
        case Kind.ClassExpression:
          return this.doWithContext(
            AsyncContextFlags.NonTopLevel | AsyncContextFlags.HasLexicalThis,
            (tx, n) => tx.visitDefault(n),
            node,
          );
        default:
          return this.visitor().visitEachChild(node);
      }
    } finally {
      cleanup();
    }
  }

  // -------------------------------------------------------------------------
  // Body visitor
  // -------------------------------------------------------------------------

  visitAsyncBodyNode(node: AstNode): AstNode | undefined {
    if (isNodeWithPossibleHoistedDeclaration(node)) {
      switch (node.kind) {
        case Kind.VariableStatement:
          return this.visitVariableStatementInAsyncBody(node);
        case Kind.ForStatement:
          return this.visitForStatementInAsyncBody(node as unknown as ForStatement);
        case Kind.ForInStatement:
          return this.visitForInStatementInAsyncBody(node as unknown as ForInOrOfStatement);
        case Kind.ForOfStatement:
          return this.visitForOfStatementInAsyncBody(node as unknown as ForInOrOfStatement);
        case Kind.CatchClause:
          return this.visitCatchClauseInAsyncBody(node as unknown as CatchClause);
        case Kind.Block:
        case Kind.SwitchStatement:
        case Kind.CaseBlock:
        case Kind.CaseClause:
        case Kind.DefaultClause:
        case Kind.TryStatement:
        case Kind.DoStatement:
        case Kind.WhileStatement:
        case Kind.IfStatement:
        case Kind.WithStatement:
        case Kind.LabeledStatement:
          return this.asyncBodyVisitor.visitEachChild(node);
      }
    }
    return this.visit(node);
  }

  visitCatchClauseInAsyncBody(node: CatchClause): AstNode {
    const catchClauseNames = newSetOfString();
    const varDecl = catchClauseVariableDeclaration(node);
    if (varDecl !== undefined) {
      this.recordDeclarationName(varDecl, catchClauseNames);
    }

    // names declared in a catch variable are block scoped
    let catchClauseUnshadowedNames: SetOfString | undefined;
    for (const escapedName of catchClauseNames.keys()) {
      if (this.enclosingFunctionParameterNames !== undefined && this.enclosingFunctionParameterNames.has(escapedName)) {
        if (catchClauseUnshadowedNames === undefined) {
          catchClauseUnshadowedNames = this.enclosingFunctionParameterNames.clone();
        }
        catchClauseUnshadowedNames.delete(escapedName);
      }
    }

    if (catchClauseUnshadowedNames !== undefined) {
      const saved = this.enclosingFunctionParameterNames;
      this.enclosingFunctionParameterNames = catchClauseUnshadowedNames;
      const result = this.asyncBodyVisitor.visitEachChild(node as unknown as AstNode);
      this.enclosingFunctionParameterNames = saved;
      return result;
    }
    return this.asyncBodyVisitor.visitEachChild(node as unknown as AstNode);
  }

  visitVariableStatementInAsyncBody(node: AstNode): AstNode | undefined {
    const declList = variableStatementDeclarationList(node);
    if (this.isVariableDeclarationListWithCollidingName(declList)) {
      const expression = this.visitVariableDeclarationListWithCollidingNames(declList as unknown as VariableDeclarationList, false);
      if (expression !== undefined) {
        return this.factory().newExpressionStatement(expression);
      }
      return undefined;
    }
    return this.visitor().visitEachChild(node);
  }

  visitForInStatementInAsyncBody(node: ForInOrOfStatement): AstNode {
    let visitedInitializer: AstNode;
    const initializer = forInOrOfInitializerNode(node);
    if (this.isVariableDeclarationListWithCollidingName(initializer)) {
      visitedInitializer = this.visitVariableDeclarationListWithCollidingNames(
        initializer as unknown as VariableDeclarationList,
        true,
      )!;
    } else {
      visitedInitializer = this.visitor().visitNode(initializer);
    }

    return this.factory().updateForInOrOfStatement(
      node,
      undefined,
      visitedInitializer,
      this.visitor().visitNode(forInOrOfExpressionNode(node)),
      this.asyncBodyVisitor.visitEmbeddedStatement(forInOrOfBody(node)),
    );
  }

  visitForOfStatementInAsyncBody(node: ForInOrOfStatement): AstNode {
    let visitedInitializer: AstNode;
    const initializer = forInOrOfInitializerNode(node);
    if (this.isVariableDeclarationListWithCollidingName(initializer)) {
      visitedInitializer = this.visitVariableDeclarationListWithCollidingNames(
        initializer as unknown as VariableDeclarationList,
        true,
      )!;
    } else {
      visitedInitializer = this.visitor().visitNode(initializer);
    }

    return this.factory().updateForInOrOfStatement(
      node,
      this.visitor().visitNode(forInOrOfAwaitModifierOpt(node)),
      visitedInitializer,
      this.visitor().visitNode(forInOrOfExpressionNode(node)),
      this.asyncBodyVisitor.visitEmbeddedStatement(forInOrOfBody(node)),
    );
  }

  visitForStatementInAsyncBody(node: ForStatement): AstNode {
    const initializer = forInitializer(node);
    let visitedInitializer: AstNode | undefined;
    if (initializer !== undefined && this.isVariableDeclarationListWithCollidingName(initializer)) {
      visitedInitializer = this.visitVariableDeclarationListWithCollidingNames(
        initializer as unknown as VariableDeclarationList,
        false,
      );
    } else {
      visitedInitializer = initializer !== undefined ? this.visitor().visitNode(initializer) : undefined;
    }

    return this.factory().updateForStatement(
      node,
      visitedInitializer,
      this.visitor().visitNode(forCondition(node)),
      this.visitor().visitNode(forIncrementor(node)),
      this.asyncBodyVisitor.visitEmbeddedStatement(forBody(node)),
    );
  }

  // -------------------------------------------------------------------------
  // Await
  // -------------------------------------------------------------------------

  visitAwaitExpression(node: AwaitExpression): AstNode {
    // do not downlevel a top-level await as it is module syntax
    if (this.inTopLevelContext()) {
      return this.visitor().visitEachChild(node as unknown as AstNode);
    }
    const yieldExpr = this.factory().newYieldExpression(
      undefined,
      this.visitor().visitNode(awaitExpressionOf(node)),
    );
    setLoc(yieldExpr, nodeLoc(node as unknown as AstNode));
    this.emitContext().setOriginal(yieldExpr, node as unknown as AstNode);
    return yieldExpr;
  }

  // -------------------------------------------------------------------------
  // Function-like declarations
  // -------------------------------------------------------------------------

  visitConstructorDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as ConstructorDeclaration;
    const saved = this.lexicalArguments;
    this.lexicalArguments = { binding: undefined, used: false };
    const updated = this.factory().updateConstructorDeclaration(
      decl,
      this.visitor().visitModifiers(declModifiers(decl)),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      this.transformMethodBody(node),
    );
    this.lexicalArguments = saved;
    return updated;
  }

  visitMethodDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as MethodDeclaration;
    const functionFlags = getFunctionFlags(node);
    const saved = this.lexicalArguments;
    this.lexicalArguments = { binding: undefined, used: false };

    let parameters: NodeArray<AstNode>;
    let body: AstNode;
    if ((functionFlags & FunctionFlags.Async) !== 0) {
      parameters = this.transformAsyncFunctionParameterList(node);
      body = this.transformAsyncFunctionBody(node, parameters);
    } else {
      parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
      body = this.transformMethodBody(node);
    }

    const updated = this.factory().updateMethodDeclaration(
      decl,
      this.visitor().visitModifiers(declModifiers(decl)),
      methodAsteriskToken(decl),
      declName(decl),
      undefined,
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );
    this.lexicalArguments = saved;
    return updated;
  }

  visitGetAccessorDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as GetAccessorDeclaration;
    const saved = this.lexicalArguments;
    this.lexicalArguments = { binding: undefined, used: false };
    const updated = this.factory().updateGetAccessorDeclaration(
      decl,
      this.visitor().visitModifiers(declModifiers(decl)),
      declName(decl),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      this.transformMethodBody(node),
    );
    this.lexicalArguments = saved;
    return updated;
  }

  visitSetAccessorDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as SetAccessorDeclaration;
    const saved = this.lexicalArguments;
    this.lexicalArguments = { binding: undefined, used: false };
    const updated = this.factory().updateSetAccessorDeclaration(
      decl,
      this.visitor().visitModifiers(declModifiers(decl)),
      declName(decl),
      undefined,
      this.emitContext().visitParameters(declParameters(decl), this.visitor()),
      undefined,
      undefined,
      this.transformMethodBody(node),
    );
    this.lexicalArguments = saved;
    return updated;
  }

  visitFunctionDeclaration(node: AstNode): AstNode {
    const decl = node as unknown as FunctionDeclaration;
    const functionFlags = getFunctionFlags(node);
    const saved = this.lexicalArguments;
    this.lexicalArguments = { binding: undefined, used: false };

    let parameters: NodeArray<AstNode>;
    let body: AstNode | undefined;
    if ((functionFlags & FunctionFlags.Async) !== 0) {
      parameters = this.transformAsyncFunctionParameterList(node);
      body = this.transformAsyncFunctionBody(node, parameters);
    } else {
      parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
      body = this.emitContext().visitFunctionBody(functionDeclarationBody(decl), this.visitor());
    }

    const updated = this.factory().updateFunctionDeclaration(
      decl,
      this.visitor().visitModifiers(declModifiers(decl)),
      functionAsteriskToken(decl),
      this.visitor().visitNode(declName(decl)),
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );
    this.lexicalArguments = saved;
    return updated;
  }

  visitFunctionExpression(node: AstNode): AstNode {
    const decl = node as unknown as FunctionExpression;
    const functionFlags = getFunctionFlags(node);
    const saved = this.lexicalArguments;
    this.lexicalArguments = { binding: undefined, used: false };

    let parameters: NodeArray<AstNode>;
    let body: AstNode | undefined;
    if ((functionFlags & FunctionFlags.Async) !== 0) {
      parameters = this.transformAsyncFunctionParameterList(node);
      body = this.transformAsyncFunctionBody(node, parameters);
    } else {
      parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
      body = this.emitContext().visitFunctionBody(functionExpressionBody(decl), this.visitor());
    }

    const updated = this.factory().updateFunctionExpression(
      decl,
      this.visitor().visitModifiers(declModifiers(decl)),
      functionExpressionAsteriskToken(decl),
      this.visitor().visitNode(declName(decl)),
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );
    this.lexicalArguments = saved;
    return updated;
  }

  visitArrowFunction(node: AstNode): AstNode {
    let saved: LexicalArgumentsInfo | undefined;
    if ((this.emitContext().emitFlags(node) & EmitFlags.NoLexicalArguments) !== 0) {
      saved = this.lexicalArguments;
      this.lexicalArguments = { binding: undefined, used: false };
    }
    try {
      const decl = node as unknown as ArrowFunction;
      const functionFlags = getFunctionFlags(node);

      let parameters: NodeArray<AstNode>;
      let body: AstNode | undefined;
      if ((functionFlags & FunctionFlags.Async) !== 0) {
        parameters = this.transformAsyncFunctionParameterList(node);
        body = this.transformAsyncFunctionBody(node, parameters);
      } else {
        parameters = this.emitContext().visitParameters(declParameters(decl), this.visitor());
        body = this.emitContext().visitFunctionBody(arrowFunctionBody(decl), this.visitor());
      }

      return this.factory().updateArrowFunction(
        decl,
        this.visitor().visitModifiers(declModifiers(decl)),
        undefined,
        parameters,
        undefined,
        undefined,
        arrowEqualsGreaterThanToken(decl),
        body,
      );
    } finally {
      if (saved !== undefined) this.lexicalArguments = saved;
    }
  }

  // -------------------------------------------------------------------------
  // Declaration-name recording / colliding-name hoisting
  // -------------------------------------------------------------------------

  recordDeclarationName(node: AstNode, names: SetOfString): void {
    const name = nodeName(node);
    if (name === undefined) return;
    if (isIdentifier(name)) {
      names.add(nodeText(name));
    } else if (isBindingPattern(name)) {
      for (const element of bindingPatternElements(name)) {
        if (!isOmittedExpression(element)) this.recordDeclarationName(element, names);
      }
    }
  }

  isVariableDeclarationListWithCollidingName(node: AstNode | undefined): boolean {
    return (
      node !== undefined &&
      isVariableDeclarationList(node) &&
      (nodeFlags(node) & NodeFlags.BlockScoped) === 0 &&
      variableDeclarationListDeclarations(node as unknown as VariableDeclarationList).some((d) => this.collidesWithParameterName(d))
    );
  }

  visitVariableDeclarationListWithCollidingNames(
    node: VariableDeclarationList,
    hasReceiver: boolean,
  ): AstNode | undefined {
    this.hoistVariableDeclarationList(node);

    const variables: AstNode[] = [];
    for (const decl of variableDeclarationListDeclarations(node)) {
      if (variableDeclarationInitializer(decl as unknown as VariableDeclaration) !== undefined) {
        variables.push(decl);
      }
    }

    if (variables.length === 0) {
      if (hasReceiver) {
        const name = nodeName(variableDeclarationListDeclarations(node)[0]!);
        let target: AstNode;
        if (isBindingPattern(name!)) {
          target = convertBindingPatternToAssignmentPattern(this.emitContext(), name!);
        } else {
          target = name!;
        }
        return this.visitor().visitNode(target);
      }
      return undefined;
    }

    const expressions: AstNode[] = [];
    for (const variable of variables) {
      expressions.push(this.transformInitializedVariable(variable as unknown as VariableDeclaration));
    }
    return this.factory().inlineExpressions(expressions);
  }

  hoistVariableDeclarationList(node: VariableDeclarationList): void {
    for (const decl of variableDeclarationListDeclarations(node)) {
      this.hoistVariable(decl);
    }
  }

  hoistVariable(node: AstNode): void {
    const name = nodeName(node);
    if (name === undefined) return;
    if (isIdentifier(name)) {
      this.emitContext().addVariableDeclaration(name);
    } else if (isBindingPattern(name)) {
      for (const element of bindingPatternElements(name)) {
        if (!isOmittedExpression(element)) this.hoistVariable(element);
      }
    }
  }

  transformInitializedVariable(node: VariableDeclaration): AstNode {
    let target: AstNode;
    const name = variableDeclarationName(node);
    if (isBindingPattern(name)) {
      target = convertBindingPatternToAssignmentPattern(this.emitContext(), name);
    } else {
      target = name;
    }
    const converted = this.factory().newAssignmentExpression(target, variableDeclarationInitializer(node)!);
    this.emitContext().setSourceMapRange(converted, nodeLoc(node as unknown as AstNode));
    return this.visitor().visitNode(converted);
  }

  collidesWithParameterName(node: AstNode): boolean {
    const name = nodeName(node);
    if (name === undefined) return false;
    if (isIdentifier(name)) {
      return (
        this.enclosingFunctionParameterNames !== undefined &&
        this.enclosingFunctionParameterNames.has(nodeText(name))
      );
    }
    if (isBindingPattern(name)) {
      for (const element of bindingPatternElements(name)) {
        if (!isOmittedExpression(element) && this.collidesWithParameterName(element)) {
          return true;
        }
      }
    }
    return false;
  }

  // -------------------------------------------------------------------------
  // Method body transform (captures super)
  // -------------------------------------------------------------------------

  transformMethodBody(node: AstNode): AstNode {
    const sas = this.superAccessState;
    const savedCapturedSuperProperties = sas.capturedSuperProperties;
    const savedHasSuperElementAccess = sas.hasSuperElementAccess;
    const savedHasSuperPropertyAssignment = sas.hasSuperPropertyAssignment;
    const savedSuperBinding = sas.superBinding;
    const savedSuperIndexBinding = sas.superIndexBinding;
    sas.capturedSuperProperties = newOrderedSet<string>();
    sas.hasSuperElementAccess = false;
    sas.hasSuperPropertyAssignment = false;
    sas.superBinding = this.factory().newUniqueNameEx("_super", {
      flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
    });
    sas.superIndexBinding = this.factory().newUniqueNameEx("_superIndex", {
      flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
    });

    this.emitContext().startVariableEnvironment();
    let updated = this.emitContext().visitFunctionBody(nodeBody(node), this.visitor());

    // Minor optimization, emit `_super` helper to capture `super` access in an arrow.
    const emitSuperHelpers =
      ((sas.capturedSuperProperties?.size ?? 0) > 0 || sas.hasSuperElementAccess) &&
      (getFunctionFlags(this.getOriginalIfFunctionLike(node)) & FunctionFlags.AsyncGenerator) !== FunctionFlags.AsyncGenerator;

    if (emitSuperHelpers) {
      if ((sas.capturedSuperProperties?.size ?? 0) > 0) {
        this.emitContext().addInitializationStatement(sas.createSuperAccessVariableStatement());
      }
    }

    const mergedStatements = this.emitContext().endAndMergeVariableEnvironmentList(blockStatementList(updated));
    if (emitSuperHelpers && sas.hasSuperElementAccess && !blockMultiLine(updated)) {
      const newBlock = this.factory().newBlock(mergedStatements, true);
      setLoc(newBlock, nodeLoc(updated));
      updated = newBlock;
    } else {
      updated = this.factory().updateBlock(updated as unknown as Block, mergedStatements, blockMultiLine(updated));
    }

    if (emitSuperHelpers && sas.hasSuperElementAccess) {
      if (sas.hasSuperPropertyAssignment) {
        this.emitContext().addEmitHelper(updated, EmitHelpers.AdvancedAsyncSuper);
      } else {
        this.emitContext().addEmitHelper(updated, EmitHelpers.AsyncSuper);
      }
    }

    sas.capturedSuperProperties = savedCapturedSuperProperties;
    sas.hasSuperElementAccess = savedHasSuperElementAccess;
    sas.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment;
    sas.superBinding = savedSuperBinding;
    sas.superIndexBinding = savedSuperIndexBinding;
    return updated;
  }

  // -------------------------------------------------------------------------
  // Async function body / parameter list transforms
  // -------------------------------------------------------------------------

  createCaptureArgumentsStatement(): AstNode {
    const f = this.factory();
    const variable = f.newVariableDeclaration(
      this.lexicalArguments.binding! as unknown as AstNode,
      undefined,
      undefined,
      f.newIdentifier("arguments"),
    );
    const declList = f.newVariableDeclarationList(f.newNodeList([variable]), NodeFlags.None);
    const statement = f.newVariableStatement(undefined, declList);
    this.emitContext().addEmitFlags(statement, EmitFlags.StartOnNewLine | EmitFlags.CustomPrologue);
    return statement;
  }

  transformAsyncFunctionParameterList(node: AstNode): NodeArray<AstNode> {
    if (isSimpleParameterList(nodeParameters(node))) {
      return this.emitContext().visitParameters(nodeParameterList(node), this.visitor());
    }

    const newParameters: AstNode[] = [];
    for (const parameter of nodeParameters(node)) {
      const initializer = parameterInitializer(parameter);
      const dotDotDot = parameterDotDotDotToken(parameter as unknown as ParameterDeclaration);
      if (initializer !== undefined || dotDotDot !== undefined) {
        if (node.kind === Kind.ArrowFunction) {
          const restParameter = this.factory().newParameterDeclaration(
            undefined,
            this.factory().newToken(Kind.DotDotDotToken),
            this.factory().newUniqueNameEx("args", { flags: GeneratedIdentifierFlags.ReservedInNestedScopes }),
            undefined,
            undefined,
            undefined,
          );
          newParameters.push(restParameter);
        }
        break;
      }
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

  transformAsyncFunctionBody(node: AstNode, outerParameters: NodeArray<AstNode>): AstNode {
    let innerParameters: NodeArray<AstNode> | undefined;
    if (!isSimpleParameterList(nodeParameters(node))) {
      innerParameters = this.emitContext().visitParameters(nodeParameterList(node), this.visitor());
    }

    const isArrow = node.kind === Kind.ArrowFunction;
    const savedLexicalArguments = this.lexicalArguments;
    const captureLexicalArguments = this.lexicalArguments.binding === undefined;
    if (captureLexicalArguments) {
      this.lexicalArguments = { binding: this.factory().newUniqueName("arguments") as unknown as IdentifierNode, used: false };
    }

    let argumentsExpression: AstNode | undefined;
    if (innerParameters !== undefined) {
      if (isArrow) {
        const parameterBindings: AstNode[] = [];
        const outerLen = outerParameters.length;
        const params = nodeParameters(node);
        for (let i = 0; i < params.length; i++) {
          if (i >= outerLen) break;
          const originalParameter = params[i]!;
          const outerParameter = outerParameters[i]!;
          const init = parameterInitializer(originalParameter);
          const dotDotDot = parameterDotDotDotToken(originalParameter as unknown as ParameterDeclaration);
          if (init !== undefined || dotDotDot !== undefined) {
            parameterBindings.push(this.factory().newSpreadElement(parameterName(outerParameter)));
            break;
          }
          parameterBindings.push(parameterName(outerParameter));
        }
        argumentsExpression = this.factory().newArrayLiteralExpression(
          this.factory().newNodeList(parameterBindings),
          false,
        );
      } else {
        argumentsExpression = this.factory().newIdentifier("arguments");
      }
    }

    // An async function is emit as an outer function that calls an inner generator function.
    // To preserve lexical bindings, we pass the current `this` and `arguments` objects to `__awaiter`.

    const savedEnclosingFunctionParameterNames = this.enclosingFunctionParameterNames;
    this.enclosingFunctionParameterNames = newSetOfString();
    for (const parameter of nodeParameters(node)) {
      this.recordDeclarationName(parameter, this.enclosingFunctionParameterNames);
    }

    const sas = this.superAccessState;
    const savedCapturedSuperProperties = sas.capturedSuperProperties;
    const savedHasSuperElementAccess = sas.hasSuperElementAccess;
    const savedHasSuperPropertyAssignment = sas.hasSuperPropertyAssignment;
    const savedSuperBinding = sas.superBinding;
    const savedSuperIndexBinding = sas.superIndexBinding;
    if (!isArrow) {
      sas.capturedSuperProperties = newOrderedSet<string>();
      sas.hasSuperElementAccess = false;
      sas.hasSuperPropertyAssignment = false;
      sas.superBinding = this.factory().newUniqueNameEx("_super", {
        flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
      });
      sas.superIndexBinding = this.factory().newUniqueNameEx("_superIndex", {
        flags: GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel,
      });
    }

    const hasLexicalThis = this.inHasLexicalThisContext();

    let asyncBody = this.transformAsyncFunctionBodyWorker(nodeBody(node));
    asyncBody = this.factory().updateBlock(
      asyncBody as unknown as Block,
      this.emitContext().endAndMergeVariableEnvironmentList(blockStatementList(asyncBody)),
      blockMultiLine(asyncBody),
    );

    const emitSuperHelpers =
      sas.capturedSuperProperties !== undefined &&
      ((sas.capturedSuperProperties.size ?? 0) > 0 || sas.hasSuperElementAccess);
    if (emitSuperHelpers) {
      asyncBody = sas.substituteSuperAccessesInBody(asyncBody);
    }

    let result: AstNode;
    if (!isArrow) {
      this.emitContext().startVariableEnvironment();

      if (emitSuperHelpers) {
        if ((sas.capturedSuperProperties?.size ?? 0) > 0) {
          this.emitContext().addInitializationStatement(sas.createSuperAccessVariableStatement());
        }
      }

      if (captureLexicalArguments && this.lexicalArguments.used) {
        this.emitContext().addInitializationStatement(this.createCaptureArgumentsStatement());
      }

      const statements: AstNode[] = [
        this.factory().newReturnStatement(
          this.factory().newAwaiterHelper(hasLexicalThis, argumentsExpression, innerParameters, asyncBody),
        ),
      ];

      const block = this.factory().newBlock(
        this.emitContext().endAndMergeVariableEnvironmentList(this.factory().newNodeList(statements)),
        true,
      );
      setLoc(block, nodeLoc(nodeBody(node)));

      if (emitSuperHelpers && sas.hasSuperElementAccess) {
        if (sas.hasSuperPropertyAssignment) {
          this.emitContext().addEmitHelper(block, EmitHelpers.AdvancedAsyncSuper);
        } else {
          this.emitContext().addEmitHelper(block, EmitHelpers.AsyncSuper);
        }
      }

      result = block;
    } else {
      result = this.factory().newAwaiterHelper(hasLexicalThis, argumentsExpression, innerParameters, asyncBody);

      if (captureLexicalArguments && this.lexicalArguments.used) {
        const block = this.convertToFunctionBlock(result);
        result = this.factory().updateBlock(
          block as unknown as Block,
          this.emitContext().mergeEnvironmentList(blockStatementList(block), [this.createCaptureArgumentsStatement()]),
          blockMultiLine(block),
        );
      }
    }

    this.enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
    if (!isArrow) {
      sas.capturedSuperProperties = savedCapturedSuperProperties;
      sas.hasSuperElementAccess = savedHasSuperElementAccess;
      sas.hasSuperPropertyAssignment = savedHasSuperPropertyAssignment;
      sas.superBinding = savedSuperBinding;
      sas.superIndexBinding = savedSuperIndexBinding;
      this.lexicalArguments = savedLexicalArguments;
    } else if (captureLexicalArguments && !this.lexicalArguments.used) {
      this.lexicalArguments = savedLexicalArguments;
    } else if (captureLexicalArguments) {
      // Keep the binding but clear the used flag so siblings don't re-emit the capture statement.
      this.lexicalArguments.used = false;
    }
    return result;
  }

  transformAsyncFunctionBodyWorker(body: AstNode): AstNode {
    if (isBlockNode(body)) {
      return this.factory().updateBlock(
        body as unknown as Block,
        this.asyncBodyVisitor.visitNodes(blockStatementList(body)),
        blockMultiLine(body),
      );
    }
    // Convert expression body to block body with return statement
    const visited = this.asyncBodyVisitor.visitNode(body);
    const ret = this.factory().newReturnStatement(visited);
    setLoc(ret, nodeLoc(body));
    const list = this.factory().newNodeList<AstNode>([ret]);
    setLoc(list, nodeLoc(body));
    const block = this.factory().newBlock(list, false);
    setLoc(block, nodeLoc(body));
    return block;
  }

  convertToFunctionBlock(node: AstNode): AstNode {
    if (isBlockNode(node)) return node;
    const ret = this.factory().newReturnStatement(node);
    setLoc(ret, nodeLoc(node));
    this.emitContext().setOriginal(ret, node);
    const list = this.factory().newNodeList<AstNode>([ret]);
    setLoc(list, nodeLoc(node));
    const block = this.factory().newBlock(list, true);
    setLoc(block, nodeLoc(node));
    return block;
  }

  getOriginalIfFunctionLike(node: AstNode): AstNode {
    const original = this.emitContext().mostOriginal(node);
    if (original !== undefined && isFunctionLikeDeclaration(original)) return original;
    return node;
  }
}

// ---------------------------------------------------------------------------
// Standalone helpers (also used by other estransforms)
// ---------------------------------------------------------------------------

export function assignmentTargetContainsSuperProperty(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
      return propertyAccessExpressionOf(node).kind === Kind.SuperKeyword;
    case Kind.ParenthesizedExpression:
      return assignmentTargetContainsSuperProperty(parenthesizedExpression(node));
    case Kind.ArrayLiteralExpression:
      return arrayLiteralElements(node).some(assignmentTargetContainsSuperProperty);
    case Kind.ObjectLiteralExpression:
      for (const prop of objectLiteralProperties(node)) {
        switch (prop.kind) {
          case Kind.PropertyAssignment:
            if (assignmentTargetContainsSuperProperty(propertyAssignmentInitializer(prop))) return true;
            break;
          case Kind.ShorthandPropertyAssignment:
            if (assignmentTargetContainsSuperProperty(shorthandPropertyAssignmentName(prop))) return true;
            break;
          case Kind.SpreadAssignment:
            if (assignmentTargetContainsSuperProperty(spreadAssignmentExpression(prop))) return true;
            break;
        }
      }
      return false;
    case Kind.SpreadElement:
      return assignmentTargetContainsSuperProperty(spreadElementExpression(node));
  }
  return false;
}

export function isUpdateExpression(node: AstNode): boolean {
  if (isPrefixUnaryExpression(node)) {
    const op = prefixUnaryOperator(node);
    return op === Kind.PlusPlusToken || op === Kind.MinusMinusToken;
  }
  if (isPostfixUnaryExpression(node)) {
    const op = postfixUnaryOperator(node);
    return op === Kind.PlusPlusToken || op === Kind.MinusMinusToken;
  }
  return false;
}

export function isNameOfPropertyAccessOrAssignment(parent: AstNode | undefined, node: AstNode): boolean {
  return (
    parent !== undefined &&
    (isPropertyAccessExpression(parent) || isPropertyAssignment(parent)) &&
    nodeName(parent) === node
  );
}

export function isSimpleParameterList(params: readonly AstNode[]): boolean {
  for (const param of params) {
    const init = parameterInitializer(param);
    const name = parameterName(param);
    if (init !== undefined || !isIdentifier(name)) return false;
  }
  return true;
}

export function isNodeWithPossibleHoistedDeclaration(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.Block:
    case Kind.VariableStatement:
    case Kind.WithStatement:
    case Kind.IfStatement:
    case Kind.SwitchStatement:
    case Kind.CaseBlock:
    case Kind.CaseClause:
    case Kind.DefaultClause:
    case Kind.LabeledStatement:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.DoStatement:
    case Kind.WhileStatement:
    case Kind.TryStatement:
    case Kind.CatchClause:
      return true;
  }
  return false;
}

// Factory mirror
export function newAsyncTransformer(opts: TransformOptions): Transformer {
  return new AsyncTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

// NodeVisitor type comes from transformer.ts via the Transformer base.

interface SetOfString {
  add(value: string): void;
  has(value: string): boolean;
  delete(value: string): void;
  clone(): SetOfString;
  keys(): Iterable<string>;
}

declare function newSetOfString(): SetOfString;
declare function newOrderedSet<T>(): { add(v: T): void; has(v: T): boolean; readonly size: number };
declare function convertBindingPatternToAssignmentPattern(emitContext: unknown, pattern: AstNode): AstNode;

declare const Kind: {
  AsyncKeyword: number; SourceFile: number; AwaitExpression: number;
  MethodDeclaration: number; FunctionDeclaration: number; FunctionExpression: number;
  ArrowFunction: number; GetAccessor: number; SetAccessor: number; Constructor: number;
  ClassDeclaration: number; ClassExpression: number;
  VariableStatement: number; ForStatement: number; ForInStatement: number; ForOfStatement: number;
  CatchClause: number; Block: number; SwitchStatement: number; CaseBlock: number;
  CaseClause: number; DefaultClause: number; TryStatement: number; DoStatement: number;
  WhileStatement: number; IfStatement: number; WithStatement: number; LabeledStatement: number;
  Identifier: number; Parameter: number; BindingElement: number; VariableDeclaration: number;
  DotDotDotToken: number;
  PropertyAccessExpression: number; ElementAccessExpression: number; SuperKeyword: number;
  ParenthesizedExpression: number; ArrayLiteralExpression: number; ObjectLiteralExpression: number;
  PropertyAssignment: number; ShorthandPropertyAssignment: number; SpreadAssignment: number;
  SpreadElement: number; PlusPlusToken: number; MinusMinusToken: number;
};

declare const NodeFlags: { None: number; BlockScoped: number };
declare const FunctionFlags: { Async: number; AsyncGenerator: number };
declare const SubtreeFacts: { ContainsAnyAwait: number; ContainsAwait: number };
declare const EmitFlags: {
  NoLexicalArguments: number;
  StartOnNewLine: number;
  CustomPrologue: number;
};
declare const EmitHelpers: { AdvancedAsyncSuper: unknown; AsyncSuper: unknown };
declare const GeneratedIdentifierFlags: {
  Optimistic: number; FileLevel: number; ReservedInNestedScopes: number;
};

declare function getFunctionFlags(node: AstNode): number;
declare function subtreeFacts(node: AstNode): number;
declare function nodeLoc(node: AstNode): unknown;
declare function setLoc(node: unknown, loc: unknown): void;
declare function nodeFlags(node: AstNode): number;
declare function nodeText(node: AstNode): string;
declare function nodeName(node: AstNode): AstNode | undefined;
declare function nodeBody(node: AstNode): AstNode;
declare function nodeParameters(node: AstNode): readonly AstNode[];
declare function nodeParameterList(node: AstNode): NodeArray<AstNode>;
declare function sourceFileIsDeclarationFile(node: SourceFile): boolean;
declare function awaitExpressionOf(node: AwaitExpression): AstNode;
declare function isIdentifier(node: AstNode): boolean;
declare function isBindingPattern(node: AstNode): boolean;
declare function isOmittedExpression(node: AstNode): boolean;
declare function isBlockNode(node: AstNode): boolean;
declare function isPropertyAccessExpression(node: AstNode): boolean;
declare function isPropertyAssignment(node: AstNode): boolean;
declare function isPrefixUnaryExpression(node: AstNode): boolean;
declare function isPostfixUnaryExpression(node: AstNode): boolean;
declare function isFunctionLikeDeclaration(node: AstNode): boolean;
declare function isVariableDeclarationList(node: AstNode): boolean;
declare function bindingPatternElements(node: AstNode): readonly AstNode[];
declare function blockStatementList(node: AstNode): NodeArray<AstNode>;
declare function blockMultiLine(node: AstNode): boolean;
declare function declModifiers(decl: AstNode): unknown;
declare function declParameters(decl: AstNode): NodeArray<AstNode>;
declare function declName(decl: AstNode): AstNode | undefined;
declare function methodAsteriskToken(decl: MethodDeclaration): unknown;
declare function functionAsteriskToken(decl: FunctionDeclaration): unknown;
declare function functionExpressionAsteriskToken(decl: FunctionExpression): unknown;
declare function functionDeclarationBody(decl: FunctionDeclaration): AstNode | undefined;
declare function functionExpressionBody(decl: FunctionExpression): AstNode | undefined;
declare function arrowFunctionBody(decl: ArrowFunction): AstNode;
declare function arrowEqualsGreaterThanToken(decl: ArrowFunction): unknown;
declare function catchClauseVariableDeclaration(node: CatchClause): VariableDeclaration | undefined;
declare function variableStatementDeclarationList(node: AstNode): VariableDeclarationList | undefined;
declare function variableDeclarationListDeclarations(node: VariableDeclarationList): readonly AstNode[];
declare function variableDeclarationInitializer(node: VariableDeclaration): AstNode | undefined;
declare function variableDeclarationName(node: VariableDeclaration): AstNode;
declare function forInOrOfInitializerNode(node: ForInOrOfStatement): AstNode;
declare function forInOrOfExpressionNode(node: ForInOrOfStatement): AstNode;
declare function forInOrOfBody(node: ForInOrOfStatement): AstNode;
declare function forInOrOfAwaitModifierOpt(node: ForInOrOfStatement): AstNode | undefined;
declare function forInitializer(node: ForStatement): AstNode | undefined;
declare function forCondition(node: ForStatement): AstNode | undefined;
declare function forIncrementor(node: ForStatement): AstNode | undefined;
declare function forBody(node: ForStatement): AstNode;
declare function parameterInitializer(parameter: AstNode): AstNode | undefined;
declare function parameterName(parameter: AstNode): AstNode;
declare function parameterDotDotDotToken(parameter: ParameterDeclaration): unknown;
declare function propertyAccessExpressionOf(node: AstNode): AstNode;
declare function parenthesizedExpression(node: AstNode): AstNode;
declare function arrayLiteralElements(node: AstNode): readonly AstNode[];
declare function objectLiteralProperties(node: AstNode): readonly AstNode[];
declare function propertyAssignmentInitializer(node: AstNode): AstNode;
declare function shorthandPropertyAssignmentName(node: AstNode): AstNode;
declare function spreadAssignmentExpression(node: AstNode): AstNode;
declare function spreadElementExpression(node: AstNode): AstNode;
declare function prefixUnaryOperator(node: AstNode): number;
declare function postfixUnaryOperator(node: AstNode): number;
