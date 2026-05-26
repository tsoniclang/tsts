/**
 * `using` / `await using` declaration downlevel transformer.
 *
 * Port of TS-Go `internal/transformers/estransforms/using.go`.
 * Lowers `using` and `await using` declarations to a try/catch/finally
 * with `__addDisposableResource` and `__disposeResources` helpers.
 * Hoists imports/exports/functions/classes/vars out of the generated
 * try block to keep them at top-level.
 *
 * Cross-module deps forward-declared at the file end.
 */

import { convertClassDeclarationToClassExpression } from "./utilities.js";
import { isNamedEvaluation, transformNamedEvaluation } from "./namedevaluation.js";
import type { Node as AstNode, SourceFile, Block, ForStatement, ForInOrOfStatement, VariableStatement, VariableDeclarationList, VariableDeclaration, ExportAssignment, ClassDeclaration, IdentifierNode, ExportSpecifier as ExportSpecifierNode } from "../../ast/index.js";
import { Transformer, type TransformOptions } from "../transformer.js";

// ---------------------------------------------------------------------------
// UsingKind
// ---------------------------------------------------------------------------

export type UsingKind = number;
export const UsingKind = {
  None: 0 as UsingKind,
  Sync: 1 as UsingKind,
  Async: 2 as UsingKind,
} as const;

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class UsingDeclarationTransformer extends Transformer {
  exportBindings: Map<string, ExportSpecifierNode> | undefined;
  exportVars: AstNode[];
  defaultExportBinding: IdentifierNode | undefined;
  exportEqualsBinding: IdentifierNode | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.exportBindings = undefined;
    this.exportVars = [];
    this.defaultExportBinding = undefined;
    this.exportEqualsBinding = undefined;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  visit(node: AstNode): AstNode {
    if ((subtreeFacts(node) & SubtreeFacts.ContainsUsing) === 0) return node;

    switch (node.kind) {
      case Kind.SourceFile:
        return this.visitSourceFile(node as unknown as SourceFile);
      case Kind.Block:
        return this.visitBlock(node as unknown as Block);
      case Kind.ForStatement:
        return this.visitForStatement(node as unknown as ForStatement);
      case Kind.ForOfStatement:
        return this.visitForOfStatement(node as unknown as ForInOrOfStatement);
      default:
        return this.visitor().visitEachChild(node);
    }
  }

  visitSourceFile(node: SourceFile): AstNode {
    if (sourceFileIsDeclarationFile(node)) return node as unknown as AstNode;

    let visited: AstNode;
    const stmts = sourceFileStatements(node);
    const usingKind = getUsingKindOfStatements(stmts);
    if (usingKind !== UsingKind.None) {
      this.emitContext().startVariableEnvironment();

      this.exportBindings = new Map();
      this.exportVars = [];

      const split = this.factory().splitStandardPrologue(stmts);
      const prologue = split.prologue;
      const rest = split.rest;

      const topLevelStatements: AstNode[] = [];
      for (const v of firstResult(this.visitor().visitSlice(prologue))) topLevelStatements.push(v);

      // Collect and transform any leading statements up to the first `using` or `await using`.
      let pos = 0;
      while (pos < rest.length) {
        const statement = rest[pos]!;
        if (getUsingKind(statement) !== UsingKind.None) {
          if (pos > 0) {
            for (const v of firstResult(this.visitor().visitSlice(rest.slice(0, pos)))) topLevelStatements.push(v);
          }
          break;
        }
        pos++;
      }

      if (pos >= rest.length) {
        throw new Error("Should have encountered at least one 'using' statement.");
      }

      // transform the rest of the body
      const envBinding = this.createEnvBinding();
      const bodyStatements = this.transformUsingDeclarations(rest.slice(pos), envBinding, topLevelStatements);

      // add `export {}` declarations for any hoisted bindings.
      if (this.exportBindings.size > 0) {
        topLevelStatements.push(
          this.factory().newExportDeclaration(
            undefined,
            false,
            this.factory().newNamedExports(this.factory().newNodeList(Array.from(this.exportBindings.values()))),
            undefined,
            undefined,
          ),
        );
      }

      for (const s of this.emitContext().endVariableEnvironment()) topLevelStatements.push(s);

      if (this.exportVars.length > 0) {
        topLevelStatements.push(
          this.factory().newVariableStatement(
            this.factory().newModifierList([this.factory().newModifier(Kind.ExportKeyword)]),
            this.factory().newVariableDeclarationList(
              this.factory().newNodeList(this.exportVars),
              NodeFlags.Let,
            ),
          ),
        );
      }
      for (const s of this.createDownlevelUsingStatements(bodyStatements, envBinding, usingKind === UsingKind.Async)) {
        topLevelStatements.push(s);
      }

      if (this.exportEqualsBinding !== undefined) {
        topLevelStatements.push(
          this.factory().newExportAssignment(undefined, true, undefined, this.exportEqualsBinding as unknown as AstNode),
        );
      }

      visited = this.factory().updateSourceFile(
        node,
        this.factory().newNodeList(topLevelStatements),
        sourceFileEndOfFileToken(node),
      );
    } else {
      visited = this.visitor().visitEachChild(node as unknown as AstNode);
    }
    this.emitContext().addEmitHelpers(visited, this.emitContext().readEmitHelpers());
    this.exportVars = [];
    this.exportBindings = undefined;
    this.defaultExportBinding = undefined;
    this.exportEqualsBinding = undefined;
    return visited;
  }

  visitBlock(node: Block): AstNode {
    const stmts = blockStatementsRO(node);
    const usingKind = getUsingKindOfStatements(stmts);
    if (usingKind !== UsingKind.None) {
      const split = this.factory().splitStandardPrologue(stmts);
      const prologue = split.prologue;
      const rest = split.rest;
      const envBinding = this.createEnvBinding();
      const statements: AstNode[] = [];
      for (const v of firstResult(this.visitor().visitSlice(prologue))) statements.push(v);
      for (const s of this.createDownlevelUsingStatements(
        this.transformUsingDeclarations(rest, envBinding, undefined),
        envBinding,
        usingKind === UsingKind.Async,
      )) {
        statements.push(s);
      }
      const statementList = this.factory().newNodeList(statements);
      setLoc(statementList, nodeLoc(statementsListAsNode(node)));
      return this.factory().updateBlock(node, statementList, blockMultiLineRO(node));
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitForStatement(node: ForStatement): AstNode {
    const initializer = forInitializerRO(node);
    if (initializer !== undefined && isUsingVariableDeclarationList(initializer)) {
      return this.visitor().visitNode(
        this.factory().newBlock(
          this.factory().newNodeList([
            this.factory().newVariableStatement(undefined, initializer),
            this.factory().updateForStatement(
              node,
              undefined,
              forConditionRO(node),
              forIncrementorRO(node),
              forBodyRO(node),
            ),
          ]),
          false,
        ),
      );
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitForOfStatement(node: ForInOrOfStatement): AstNode {
    const initializer = forInOrOfInitializerRO(node);
    if (isUsingVariableDeclarationList(initializer)) {
      const forInitializerVDL = initializer as unknown as VariableDeclarationList;
      const decls = variableDeclarationListDeclarationsRO(forInitializerVDL);
      const forDecl =
        decls.length > 0
          ? decls[0]!
          : this.factory().newVariableDeclaration(this.factory().newTempVariable(), undefined, undefined, undefined);

      const isAwaitUsing = getUsingKindOfVariableDeclarationList(forInitializerVDL) === UsingKind.Async;
      const temp = this.factory().newGeneratedNameForNode(forDeclName(forDecl));
      const usingVar = this.factory().updateVariableDeclaration(
        forDecl as unknown as VariableDeclaration,
        forDeclName(forDecl),
        undefined,
        undefined,
        temp,
      );
      const usingVarList = this.factory().newVariableDeclarationList(
        this.factory().newNodeList([usingVar]),
        isAwaitUsing ? NodeFlags.AwaitUsing : NodeFlags.Using,
      );
      const usingVarStatement = this.factory().newVariableStatement(undefined, usingVarList);

      const innerStatement = forInOrOfBodyRO(node);
      let statement: AstNode;
      if (isBlockNode(innerStatement)) {
        const innerStmts = blockStatementsRO(innerStatement as unknown as Block);
        const newStmts: AstNode[] = [usingVarStatement, ...innerStmts];
        statement = this.factory().updateBlock(
          innerStatement as unknown as Block,
          this.factory().newNodeList(newStmts),
          blockMultiLineRO(innerStatement as unknown as Block),
        );
      } else {
        statement = this.factory().newBlock(
          this.factory().newNodeList([usingVarStatement, innerStatement]),
          true,
        );
      }

      return this.visitor().visitNode(
        this.factory().updateForInOrOfStatement(
          node,
          forInOrOfAwaitModifierRO(node),
          this.factory().newVariableDeclarationList(
            this.factory().newNodeList([
              this.factory().newVariableDeclaration(temp, undefined, undefined, undefined),
            ]),
            NodeFlags.Const,
          ),
          forInOrOfExpressionRO(node),
          statement,
        ),
      );
    }
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  // -------------------------------------------------------------------------
  // Hoisting + emit
  // -------------------------------------------------------------------------

  transformUsingDeclarations(
    statementsIn: readonly AstNode[],
    envBinding: IdentifierNode,
    topLevelStatements: AstNode[] | undefined,
  ): AstNode[] {
    const statements: AstNode[] = [];

    const hoist = (node: AstNode): AstNode | undefined => {
      if (topLevelStatements === undefined) return node;

      switch (node.kind) {
        case Kind.ImportDeclaration:
        case Kind.ImportEqualsDeclaration:
        case Kind.ExportDeclaration:
        case Kind.FunctionDeclaration:
          this.hoistImportOrExportOrHoistedDeclaration(node, topLevelStatements);
          return undefined;
        case Kind.ExportAssignment:
          return this.hoistExportAssignment(node as unknown as ExportAssignment);
        case Kind.ClassDeclaration:
          return this.hoistClassDeclaration(node as unknown as ClassDeclaration);
        case Kind.VariableStatement:
          return this.hoistVariableStatement(node as unknown as VariableStatement);
      }
      return node;
    };

    const hoistOrAppendNode = (node: AstNode | undefined): void => {
      if (node === undefined) return;
      const out = hoist(node);
      if (out !== undefined) statements.push(out);
    };

    for (const statement of statementsIn) {
      const usingKind = getUsingKind(statement);
      if (usingKind !== UsingKind.None) {
        const varStatement = statement as unknown as VariableStatement;
        const declarationList = variableStatementDeclarationListRO(varStatement);
        const declarations: AstNode[] = [];
        let invalid = false;
        for (let declaration of variableDeclarationListDeclarationsRO(declarationList)) {
          if (!isIdentifier(variableDeclarationNameRO(declaration as unknown as VariableDeclaration))) {
            // Since binding patterns are a grammar error, reset declarations so we don't process this as a `using`.
            declarations.length = 0;
            invalid = true;
            break;
          }

          // perform a shallow transform for any named evaluation
          if (isNamedEvaluation(this.emitContext() as unknown as never, declaration)) {
            declaration = transformNamedEvaluation(this.emitContext() as unknown as never, declaration, false, "");
          }

          let initializer = this.visitor().visitNode(variableDeclarationInitializerRO(declaration as unknown as VariableDeclaration)!);
          if (initializer === undefined) initializer = this.factory().newVoidZeroExpression();

          declarations.push(
            this.factory().updateVariableDeclaration(
              declaration as unknown as VariableDeclaration,
              variableDeclarationNameRO(declaration as unknown as VariableDeclaration),
              undefined,
              undefined,
              this.factory().newAddDisposableResourceHelper(envBinding, initializer, usingKind === UsingKind.Async),
            ),
          );
        }

        if (!invalid && declarations.length > 0) {
          const varList = this.factory().newVariableDeclarationList(
            this.factory().newNodeList(declarations),
            NodeFlags.Const,
          );
          this.emitContext().setOriginal(varList, declarationList as unknown as AstNode);
          setLoc(varList, nodeLoc(declarationList as unknown as AstNode));
          hoistOrAppendNode(this.factory().updateVariableStatement(varStatement, undefined, varList));
          continue;
        }
      }

      const result = this.visit(statement);
      if (result !== undefined) {
        if (result.kind === Kind.SyntaxList) {
          for (const node of syntaxListChildren(result)) hoistOrAppendNode(node);
        } else {
          hoistOrAppendNode(result);
        }
      }
    }
    return statements;
  }

  hoistImportOrExportOrHoistedDeclaration(node: AstNode, topLevelStatements: AstNode[]): void {
    topLevelStatements.push(node);
  }

  hoistExportAssignment(node: ExportAssignment): AstNode {
    if (exportAssignmentIsExportEquals(node)) return this.hoistExportEquals(node);
    return this.hoistExportDefault(node);
  }

  hoistExportDefault(node: ExportAssignment): AstNode {
    if (this.defaultExportBinding !== undefined) return node as unknown as AstNode;

    this.defaultExportBinding = this.factory().newUniqueNameEx("_default", {
      flags:
        GeneratedIdentifierFlags.ReservedInNestedScopes |
        GeneratedIdentifierFlags.FileLevel |
        GeneratedIdentifierFlags.Optimistic,
    });
    this.hoistBindingIdentifier(this.defaultExportBinding, true, this.factory().newIdentifier("default") as IdentifierNode, node as unknown as AstNode);

    let expression = exportAssignmentExpressionRO(node);
    let innerExpression = skipOuterExpressions(expression, OEK.All);
    if (isNamedEvaluation(this.emitContext() as unknown as never, innerExpression)) {
      innerExpression = transformNamedEvaluation(this.emitContext() as unknown as never, innerExpression, false, "default");
      expression = this.factory().restoreOuterExpressions(expression, innerExpression, OEK.All);
    }
    const assignment = this.factory().newAssignmentExpression(this.defaultExportBinding as unknown as AstNode, expression);
    return this.factory().newExpressionStatement(assignment);
  }

  hoistExportEquals(node: ExportAssignment): AstNode {
    if (this.exportEqualsBinding !== undefined) return node as unknown as AstNode;
    this.exportEqualsBinding = this.factory().newUniqueNameEx("_default", {
      flags:
        GeneratedIdentifierFlags.ReservedInNestedScopes |
        GeneratedIdentifierFlags.FileLevel |
        GeneratedIdentifierFlags.Optimistic,
    });
    this.emitContext().addVariableDeclaration(this.exportEqualsBinding as unknown as AstNode);
    const assignment = this.factory().newAssignmentExpression(
      this.exportEqualsBinding as unknown as AstNode,
      exportAssignmentExpressionRO(node),
    );
    return this.factory().newExpressionStatement(assignment);
  }

  hoistClassDeclaration(node: ClassDeclaration): AstNode {
    if (classDeclName(node) === undefined && this.defaultExportBinding !== undefined) {
      return node as unknown as AstNode;
    }

    const isExported = hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export);
    const isDefault = hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Default);

    let expression = convertClassDeclarationToClassExpression(this.emitContext(), node as unknown as AstNode);
    const className = classDeclName(node);
    if (className !== undefined) {
      this.hoistBindingIdentifier(
        this.factory().getLocalName(node as unknown as AstNode) as IdentifierNode,
        isExported && !isDefault,
        undefined,
        node as unknown as AstNode,
      );
      expression = this.factory().newAssignmentExpression(
        this.factory().getDeclarationName(node as unknown as AstNode),
        expression,
      );
      this.emitContext().setOriginal(expression, node as unknown as AstNode);
      this.emitContext().setSourceMapRange(expression, nodeLoc(node as unknown as AstNode));
      this.emitContext().setCommentRange(expression, nodeLoc(node as unknown as AstNode));
      if (isNamedEvaluation(this.emitContext() as unknown as never, expression)) {
        expression = transformNamedEvaluation(this.emitContext() as unknown as never, expression, false, "");
      }
    }

    if (isDefault && this.defaultExportBinding === undefined) {
      this.defaultExportBinding = this.factory().newUniqueNameEx("_default", {
        flags:
          GeneratedIdentifierFlags.ReservedInNestedScopes |
          GeneratedIdentifierFlags.FileLevel |
          GeneratedIdentifierFlags.Optimistic,
      });
      this.hoistBindingIdentifier(
        this.defaultExportBinding,
        true,
        this.factory().newIdentifier("default") as IdentifierNode,
        node as unknown as AstNode,
      );
      expression = this.factory().newAssignmentExpression(this.defaultExportBinding as unknown as AstNode, expression);
      this.emitContext().setOriginal(expression, node as unknown as AstNode);
      if (isNamedEvaluation(this.emitContext() as unknown as never, expression)) {
        expression = transformNamedEvaluation(this.emitContext() as unknown as never, expression, false, "default");
      }
    }

    return this.factory().newExpressionStatement(expression);
  }

  hoistVariableStatement(node: VariableStatement): AstNode | undefined {
    const expressions: AstNode[] = [];
    const isExported = hasSyntacticModifier(node as unknown as AstNode, ModifierFlags.Export);
    const declList = variableStatementDeclarationListRO(node);
    for (const variable of variableDeclarationListDeclarationsRO(declList)) {
      this.hoistBindingElement(variable, isExported, variable);
      if (variableDeclarationInitializerRO(variable as unknown as VariableDeclaration) !== undefined) {
        expressions.push(this.hoistInitializedVariable(variable as unknown as VariableDeclaration));
      }
    }
    if (expressions.length > 0) {
      const statement = this.factory().newExpressionStatement(this.factory().inlineExpressions(expressions));
      this.emitContext().setOriginal(statement, node as unknown as AstNode);
      this.emitContext().setCommentRange(statement, nodeLoc(node as unknown as AstNode));
      this.emitContext().setSourceMapRange(statement, nodeLoc(node as unknown as AstNode));
      return statement;
    }
    return undefined;
  }

  hoistInitializedVariable(node: VariableDeclaration): AstNode {
    const init = variableDeclarationInitializerRO(node);
    if (init === undefined) throw new Error("Expected initializer");
    let target: AstNode;
    const name = variableDeclarationNameRO(node);
    if (isIdentifier(name)) {
      target = cloneIdentifier(name, this.factory());
      this.emitContext().setEmitFlags(
        target,
        this.emitContext().emitFlags(target) & ~(EmitFlags.LocalName | EmitFlags.ExportName),
      );
    } else {
      target = convertBindingPatternToAssignmentPattern(this.emitContext(), name);
    }
    const assignment = this.factory().newAssignmentExpression(target, init);
    this.emitContext().setOriginal(assignment, node as unknown as AstNode);
    this.emitContext().setCommentRange(assignment, nodeLoc(node as unknown as AstNode));
    this.emitContext().setSourceMapRange(assignment, nodeLoc(node as unknown as AstNode));
    return assignment;
  }

  hoistBindingElement(node: AstNode, isExportedDeclaration: boolean, original: AstNode): void {
    const name = nodeName(node);
    if (name !== undefined && isBindingPattern(name)) {
      for (const element of bindingPatternElementsRO(name)) {
        if (nodeName(element) !== undefined) {
          this.hoistBindingElement(element, isExportedDeclaration, original);
        }
      }
    } else if (name !== undefined) {
      this.hoistBindingIdentifier(name as IdentifierNode, isExportedDeclaration, undefined, original);
    }
  }

  hoistBindingIdentifier(
    node: IdentifierNode,
    isExport: boolean,
    exportAlias: IdentifierNode | undefined,
    original: AstNode | undefined,
  ): void {
    let name: IdentifierNode = node;
    if (!isGeneratedIdentifier(this.emitContext(), node)) {
      name = cloneIdentifier(name as unknown as AstNode, this.factory()) as unknown as IdentifierNode;
    }
    if (isExport) {
      if (exportAlias === undefined && !isLocalName(this.emitContext(), name as unknown as AstNode)) {
        const varDecl = this.factory().newVariableDeclaration(name as unknown as AstNode, undefined, undefined, undefined);
        if (original !== undefined) this.emitContext().setOriginal(varDecl, original);
        this.exportVars.push(varDecl);
        return;
      }

      let localName: IdentifierNode | undefined;
      let exportName: IdentifierNode | undefined;
      if (exportAlias !== undefined) {
        localName = name;
        exportName = exportAlias;
      } else {
        exportName = name;
      }
      const specifier = this.factory().newExportSpecifier(false, localName, exportName!);
      if (original !== undefined) this.emitContext().setOriginal(specifier, original);
      if (this.exportBindings === undefined) this.exportBindings = new Map();
      this.exportBindings.set(identifierText(name as unknown as AstNode), specifier);
    }
    this.emitContext().addVariableDeclaration(name as unknown as AstNode);
  }

  createEnvBinding(): IdentifierNode {
    return this.factory().newUniqueName("env") as IdentifierNode;
  }

  createDownlevelUsingStatements(
    bodyStatements: AstNode[],
    envBinding: IdentifierNode,
    asyncMode: boolean,
  ): AstNode[] {
    const f = this.factory();
    const statements: AstNode[] = [];

    // const env_1 = { stack: [], error: void 0, hasError: false };
    const envObject = f.newObjectLiteralExpression(
      f.newNodeList([
        f.newPropertyAssignment(undefined, f.newIdentifier("stack"), undefined, undefined, f.newArrayLiteralExpression(undefined, false)),
        f.newPropertyAssignment(undefined, f.newIdentifier("error"), undefined, undefined, f.newVoidZeroExpression()),
        f.newPropertyAssignment(undefined, f.newIdentifier("hasError"), undefined, undefined, f.newFalseExpression()),
      ]),
      false,
    );
    const envVar = f.newVariableDeclaration(envBinding as unknown as AstNode, undefined, undefined, envObject);
    const envVarList = f.newVariableDeclarationList(f.newNodeList([envVar]), NodeFlags.Const);
    const envVarStatement = f.newVariableStatement(undefined, envVarList);
    statements.push(envVarStatement);

    // try { ... } catch (e_1) { env_1.error = e_1; env_1.hasError = true; } finally { ... }
    const tryBlock = f.newBlock(f.newNodeList(bodyStatements), true);
    const bodyCatchBinding = f.newUniqueName("e");
    const catchClause = f.newCatchClause(
      f.newVariableDeclaration(bodyCatchBinding, undefined, undefined, undefined),
      f.newBlock(
        f.newNodeList([
          f.newExpressionStatement(
            f.newAssignmentExpression(
              f.newPropertyAccessExpression(envBinding as unknown as AstNode, undefined, f.newIdentifier("error"), NodeFlags.None),
              bodyCatchBinding,
            ),
          ),
          f.newExpressionStatement(
            f.newAssignmentExpression(
              f.newPropertyAccessExpression(envBinding as unknown as AstNode, undefined, f.newIdentifier("hasError"), NodeFlags.None),
              f.newTrueExpression(),
            ),
          ),
        ]),
        true,
      ),
    );

    let finallyBlock: AstNode;
    if (asyncMode) {
      const result = f.newUniqueName("result");
      finallyBlock = f.newBlock(
        f.newNodeList([
          f.newVariableStatement(
            undefined,
            f.newVariableDeclarationList(
              f.newNodeList([
                f.newVariableDeclaration(result, undefined, undefined, f.newDisposeResourcesHelper(envBinding as unknown as AstNode)),
              ]),
              NodeFlags.Const,
            ),
          ),
          f.newIfStatement(result, f.newExpressionStatement(f.newAwaitExpression(result)), undefined),
        ]),
        true,
      );
    } else {
      finallyBlock = f.newBlock(
        f.newNodeList([f.newExpressionStatement(f.newDisposeResourcesHelper(envBinding as unknown as AstNode))]),
        true,
      );
    }

    const tryStatement = f.newTryStatement(tryBlock, catchClause, finallyBlock);
    statements.push(tryStatement);
    return statements;
  }
}

// ---------------------------------------------------------------------------
// Standalone helpers
// ---------------------------------------------------------------------------

export function isUsingVariableDeclarationList(node: AstNode): boolean {
  return (
    isVariableDeclarationList(node) &&
    getUsingKindOfVariableDeclarationList(node as unknown as VariableDeclarationList) !== UsingKind.None
  );
}

export function getUsingKindOfVariableDeclarationList(node: VariableDeclarationList): UsingKind {
  const flags = nodeFlags(node as unknown as AstNode) & NodeFlags.BlockScoped;
  if (flags === NodeFlags.AwaitUsing) return UsingKind.Async;
  if (flags === NodeFlags.Using) return UsingKind.Sync;
  return UsingKind.None;
}

export function getUsingKindOfVariableStatement(node: VariableStatement): UsingKind {
  return getUsingKindOfVariableDeclarationList(variableStatementDeclarationListRO(node));
}

export function getUsingKind(statement: AstNode): UsingKind {
  if (isVariableStatement(statement)) {
    return getUsingKindOfVariableStatement(statement as unknown as VariableStatement);
  }
  return UsingKind.None;
}

export function getUsingKindOfStatements(statements: readonly AstNode[]): UsingKind {
  let result = UsingKind.None;
  for (const statement of statements) {
    const usingKind = getUsingKind(statement);
    if (usingKind === UsingKind.Async) return UsingKind.Async;
    if (usingKind > result) result = usingKind;
  }
  return result;
}

// Factory mirror
export function newUsingDeclarationTransformer(opts: TransformOptions): Transformer {
  return new UsingDeclarationTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

declare const Kind: {
  SourceFile: number; Block: number; ForStatement: number; ForOfStatement: number;
  ImportDeclaration: number; ImportEqualsDeclaration: number; ExportDeclaration: number;
  FunctionDeclaration: number; ExportAssignment: number; ClassDeclaration: number;
  VariableStatement: number; SyntaxList: number; ExportKeyword: number;
};

declare const NodeFlags: {
  None: number; Let: number; Const: number; BlockScoped: number;
  Using: number; AwaitUsing: number;
};

declare const ModifierFlags: { Export: number; Default: number };
declare const SubtreeFacts: { ContainsUsing: number };
declare const OEK: { All: number };
declare const EmitFlags: { LocalName: number; ExportName: number };
declare const GeneratedIdentifierFlags: {
  Optimistic: number; FileLevel: number; ReservedInNestedScopes: number;
};

declare function subtreeFacts(node: AstNode): number;
declare function nodeFlags(node: AstNode): number;
declare function nodeLoc(node: AstNode): unknown;
declare function setLoc(node: unknown, loc: unknown): void;
declare function nodeName(node: AstNode): AstNode | undefined;
declare function hasSyntacticModifier(node: AstNode, flags: number): boolean;
declare function skipOuterExpressions(node: AstNode, kinds: number): AstNode;
declare function firstResult<T>(arr: { items: readonly T[]; changed: boolean }): readonly T[];
declare function isIdentifier(node: AstNode): boolean;
declare function isBindingPattern(node: AstNode): boolean;
declare function isVariableDeclarationList(node: AstNode): boolean;
declare function isVariableStatement(node: AstNode): boolean;
declare function isBlockNode(node: AstNode): boolean;
declare function isGeneratedIdentifier(emitContext: unknown, node: AstNode): boolean;
declare function isLocalName(emitContext: unknown, node: AstNode): boolean;
declare function cloneIdentifier(node: AstNode, factory: unknown): AstNode;
declare function convertBindingPatternToAssignmentPattern(emitContext: unknown, pattern: AstNode): AstNode;
declare function identifierText(node: AstNode): string;
declare function syntaxListChildren(node: AstNode): readonly AstNode[];
declare function sourceFileStatements(node: SourceFile): readonly AstNode[];
declare function sourceFileIsDeclarationFile(node: SourceFile): boolean;
declare function sourceFileEndOfFileToken(node: SourceFile): AstNode;
declare function statementsListAsNode(node: AstNode): AstNode;
declare function blockStatementsRO(node: Block): readonly AstNode[];
declare function blockMultiLineRO(node: Block): boolean;
declare function forInitializerRO(node: ForStatement): AstNode | undefined;
declare function forConditionRO(node: ForStatement): AstNode | undefined;
declare function forIncrementorRO(node: ForStatement): AstNode | undefined;
declare function forBodyRO(node: ForStatement): AstNode;
declare function forInOrOfInitializerRO(node: ForInOrOfStatement): AstNode;
declare function forInOrOfExpressionRO(node: ForInOrOfStatement): AstNode;
declare function forInOrOfBodyRO(node: ForInOrOfStatement): AstNode;
declare function forInOrOfAwaitModifierRO(node: ForInOrOfStatement): AstNode | undefined;
declare function forDeclName(node: AstNode): AstNode;
declare function variableDeclarationListDeclarationsRO(node: VariableDeclarationList): readonly AstNode[];
declare function variableStatementDeclarationListRO(node: VariableStatement): VariableDeclarationList;
declare function variableDeclarationNameRO(node: VariableDeclaration): AstNode;
declare function variableDeclarationInitializerRO(node: VariableDeclaration): AstNode | undefined;
declare function bindingPatternElementsRO(node: AstNode): readonly AstNode[];
declare function exportAssignmentExpressionRO(node: ExportAssignment): AstNode;
declare function exportAssignmentIsExportEquals(node: ExportAssignment): boolean;
declare function classDeclName(node: ClassDeclaration): IdentifierNode | undefined;
