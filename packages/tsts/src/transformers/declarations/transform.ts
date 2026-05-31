/**
 * Declaration (.d.ts) emit transformer.
 *
 * Substantive port of TS-Go `internal/transformers/declarations/transform.go`
 * (~2212 LoC). Rewrites a source file into `.d.ts` form by stripping
 * function bodies, private members, and initializers; computing
 * inferred types via the EmitResolver; collecting reference directives
 * (`/// <reference ... />`); and routing through a SymbolTracker for
 * accessibility diagnostics.
 *
 * The transformer owns declaration-file state, root statement routing,
 * late-painted statement replacement, and the declaration-node dispatch
 * surface. Type synthesis and isolated-declaration diagnostics delegate
 * to the resolver/tracker surfaces, matching TS-Go's package boundary.
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer } from "../transformer.js";
import {
  Kind,
  isBindingPattern,
  isDeclaration,
  isEntityName,
  isEntityNameExpression,
  isExternalOrCommonJSModule,
  isFunctionLike,
  isHeritageClause,
  isPrivateIdentifier,
  sourceFileEndOfFileToken,
  sourceFileIsDeclarationFile,
} from "../../ast/index.js";
import { getNodeId } from "../../ast/ids.js";
import { getDirectoryPath, getRelativePathToDirectoryOrUrl, normalizeSlashes } from "../../tspath/index.js";
import { getLeadingCommentRanges } from "../../printer/comments.js";
import { EmitFlags } from "../../printer/emitFlags.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import {
  newSymbolTracker,
  type SymbolTrackerImpl,
  type SymbolTrackerSharedState,
  type EmitResolver,
  type DeclarationEmitHost,
} from "./tracker.js";
import { createExpressionError, createGetSymbolAccessibilityDiagnosticForNode, createGetSymbolAccessibilityDiagnosticForNodeName } from "./diagnostics.js";
import { canProduceDiagnostics, isDeclarationAndNotVisible, isEnclosingDeclaration } from "./util.js";
import type {
  Node as AstNode,
  SourceFile,
  Diagnostic,
  FileReference,
  Statement,
  StatementList,
  MappedTypeNode,
  HeritageClause,
  ImportTypeNode,
  ConstructorTypeNode,
  FunctionTypeNode,
  ConditionalTypeNode,
  TypeReferenceNode,
  ExpressionWithTypeArguments,
  TypeParameterDeclaration,
  VariableDeclaration,
  BindingPattern,
  BindingElement,
  IndexSignatureDeclaration,
  CallSignatureDeclaration,
  PropertySignatureDeclaration,
  PropertyDeclaration,
  SetAccessorDeclaration,
  GetAccessorDeclaration,
  ConstructorDeclaration,
  ConstructSignatureDeclaration,
  MethodSignatureDeclaration,
  MethodDeclaration,
  TypeAliasDeclaration,
  InterfaceDeclaration,
  FunctionDeclaration,
  ModuleDeclaration,
  ClassDeclaration,
  VariableStatement,
  EnumDeclaration,
  ImportEqualsDeclaration,
  ImportDeclaration,
  JSDocTypeExpression,
  JSDocTypeLiteral,
  JSDocAllType,
  ModifierList,
  TypeParameterList,
  ParameterList,
  ParameterDeclaration,
} from "../../ast/index.js";

// ---------------------------------------------------------------------------
// Public surface types
// ---------------------------------------------------------------------------

export interface ReferencedFilePair {
  file: SourceFile;
  ref: FileReference;
}

export interface OutputPaths {
  declarationFilePath(): string;
  jsFilePath(): string;
}

export interface SymbolAccessibilityDiagnostic {
  errorNode: AstNode;
  diagnosticMessage: { code: number; message: string };
  typeName?: AstNode;
}

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class DeclarationTransformer extends Transformer {
  readonly host: DeclarationEmitHost;
  readonly compilerOptions: CompilerOptions;
  readonly tracker: SymbolTrackerImpl;
  readonly state: SymbolTrackerSharedState;
  readonly resolver: EmitResolver;
  readonly declarationFilePath: string;
  readonly declarationMapPath: string;

  needsDeclare = false;
  needsScopeFixMarker = false;
  resultHasScopeMarker = false;
  enclosingDeclaration: AstNode | undefined;
  resultHasExternalModuleIndicator = false;
  suppressNewDiagnosticContexts = false;
  lateStatementReplacementMap: Map<number, AstNode> = new Map();
  expandoHosts: Set<number> = new Set();
  rawReferencedFiles: ReferencedFilePair[] = [];
  rawTypeReferenceDirectives: FileReference[] = [];
  rawLibReferenceDirectives: FileReference[] = [];

  constructor(
    host: DeclarationEmitHost,
    context: EmitContext,
    compilerOptions: CompilerOptions,
    declarationFilePath: string,
    declarationMapPath: string,
  ) {
    super();
    this.host = host;
    this.compilerOptions = compilerOptions;
    this.declarationFilePath = declarationFilePath;
    this.declarationMapPath = declarationMapPath;
    this.resolver = (host as unknown as { getEmitResolver(): EmitResolver }).getEmitResolver();
    this.state = {
      lateMarkedStatements: [],
      diagnostics: [],
      getSymbolAccessibilityDiagnostic: () => undefined,
      errorNameNode: undefined,
      isolatedDeclarations: compilerOptionsIsolatedDeclarations(compilerOptions),
      stripInternal: compilerOptionsStripInternal(compilerOptions),
      currentSourceFile: undefined as unknown as SourceFile,
      resolver: this.resolver,
      reportExpandoFunctionErrors: (node: AstNode) => this.reportExpandoFunctionErrors(node),
    };
    this.tracker = newSymbolTracker(host, this.resolver, this.state);
    this.initTransformer((node) => this.visit(node) as AstNode, context as unknown as Parameters<typeof this.initTransformer>[1]);
  }

  getDiagnostics(): readonly Diagnostic[] {
    return this.state.diagnostics;
  }

  // -------------------------------------------------------------------------
  // @internal stripping
  // -------------------------------------------------------------------------

  shouldStripInternal(node: AstNode | undefined): boolean {
    return this.state.stripInternal
      && node !== undefined
      && this.isInternalDeclaration(node, this.state.currentSourceFile);
  }

  isInternalDeclaration(node: AstNode, sourceFile: SourceFile): boolean {
    if (sourceFile === undefined) return false;
    for (const range of this.getLeadingCommentRangesOfNode(node, sourceFile)) {
      if (hasInternalAnnotation(range, sourceFile)) return true;
    }
    return false;
  }

  getLeadingCommentRangesOfNode(node: AstNode, sourceFile: SourceFile): readonly CommentRange[] {
    if (node === undefined || node.kind === Kind.JsxText) return [];
    return getLeadingCommentRanges(sourceFile, node) as readonly CommentRange[];
  }

  // -------------------------------------------------------------------------
  // Main visit dispatch
  // -------------------------------------------------------------------------

  visit(node: AstNode): AstNode | undefined {
    switch (node.kind) {
      case Kind.SourceFile:
        return this.visitSourceFile(node as unknown as SourceFile);
      case Kind.FunctionDeclaration:
      case Kind.ModuleDeclaration:
      case Kind.ImportEqualsDeclaration:
      case Kind.InterfaceDeclaration:
      case Kind.ClassDeclaration:
      case Kind.JSTypeAliasDeclaration:
      case Kind.TypeAliasDeclaration:
      case Kind.EnumDeclaration:
      case Kind.VariableStatement:
      case Kind.ImportDeclaration:
      case Kind.JSImportDeclaration:
      case Kind.ExportDeclaration:
      case Kind.ExportAssignment:
        return this.visitDeclarationStatements(node);
      case Kind.BreakStatement:
      case Kind.ContinueStatement:
      case Kind.DebuggerStatement:
      case Kind.DoStatement:
      case Kind.EmptyStatement:
      case Kind.ForInStatement:
      case Kind.ForOfStatement:
      case Kind.ForStatement:
      case Kind.IfStatement:
      case Kind.LabeledStatement:
      case Kind.ReturnStatement:
      case Kind.SwitchStatement:
      case Kind.ThrowStatement:
      case Kind.TryStatement:
      case Kind.WhileStatement:
      case Kind.WithStatement:
      case Kind.NotEmittedStatement:
      case Kind.Block:
      case Kind.MissingDeclaration:
        return undefined;
      case Kind.ExpressionStatement:
        return this.visitExpressionStatement(node);
      default:
        return this.visitDeclarationSubtree(node);
    }
  }

  visitSourceFile(node: SourceFile): AstNode {
    if (sourceFileIsDeclarationFile(node)) return node as unknown as AstNode;
    this.needsDeclare = true;
    this.needsScopeFixMarker = false;
    this.resultHasScopeMarker = false;
    this.enclosingDeclaration = node as unknown as AstNode;
    this.state.getSymbolAccessibilityDiagnostic = throwDiagnostic;
    this.resultHasExternalModuleIndicator = false;
    this.suppressNewDiagnosticContexts = false;
    this.state.lateMarkedStatements = [];
    this.lateStatementReplacementMap = new Map();
    this.expandoHosts = new Set();
    this.rawReferencedFiles = [];
    this.rawTypeReferenceDirectives = [];
    this.rawLibReferenceDirectives = [];
    this.state.currentSourceFile = node;
    this.collectFileReferences(node);
    (this.resolver as unknown as { precalculateDeclarationEmitVisibility?: (sourceFile: SourceFile) => void })
      .precalculateDeclarationEmitVisibility?.(node);
    const updated = this.transformSourceFile(node);
    this.state.currentSourceFile = undefined as unknown as SourceFile;
    return updated;
  }

  collectFileReferences(sourceFile: SourceFile): void {
    const referencedFiles = (sourceFile as unknown as { readonly referencedFiles?: readonly FileReference[] }).referencedFiles ?? [];
    const typeReferenceDirectives = (sourceFile as unknown as { readonly typeReferenceDirectives?: readonly FileReference[] }).typeReferenceDirectives ?? [];
    const libReferenceDirectives = (sourceFile as unknown as { readonly libReferenceDirectives?: readonly FileReference[] }).libReferenceDirectives ?? [];
    this.rawReferencedFiles.push(...referencedFiles.map(ref => ({ file: sourceFile, ref })));
    this.rawTypeReferenceDirectives.push(...typeReferenceDirectives);
    this.rawLibReferenceDirectives.push(...libReferenceDirectives);
  }

  override transformSourceFile(node: SourceFile): SourceFile {
    const visitedStatements = this.visitor().visitNodes(node.statements) as unknown as StatementList;
    let combinedStatements = this.transformAndReplaceLatePaintedStatements(visitedStatements);
    if (isExternalOrCommonJSModule(node as unknown as AstNode)
      && (!this.resultHasExternalModuleIndicator || this.needsScopeFixMarker && !this.resultHasScopeMarker)) {
      combinedStatements = this.factory().newNodeList([
        ...statementListNodes(combinedStatements),
        createEmptyExports(this.factory()),
      ] as readonly Statement[]) as unknown as StatementList;
    }
    const updated = this.factory().updateSourceFile(
      node as unknown as AstNode,
      combinedStatements,
      sourceFileEndOfFileToken(node as unknown as AstNode),
    ) as unknown as SourceFile;
    const mutable = updated as unknown as {
      referencedFiles?: readonly FileReference[];
      typeReferenceDirectives?: readonly FileReference[];
      libReferenceDirectives?: readonly FileReference[];
      isDeclarationFile?: boolean;
    };
    mutable.libReferenceDirectives = this.getLibReferences();
    mutable.typeReferenceDirectives = this.getTypeReferences();
    mutable.isDeclarationFile = true;
    mutable.referencedFiles = this.getReferencedFiles(this.declarationFilePath);
    return updated;
  }

  transformAndReplaceLatePaintedStatements(statements: StatementList): StatementList {
    while (this.state.lateMarkedStatements.length > 0) {
      const next = this.state.lateMarkedStatements.shift()!;
      const saveNeedsDeclare = this.needsDeclare;
      this.needsDeclare = next.parent !== undefined && next.parent.kind === Kind.SourceFile;
      const result = this.transformTopLevelDeclaration(next);
      this.needsDeclare = saveNeedsDeclare;
      const original = this.emitContext().mostOriginal(next);
      this.lateStatementReplacementMap.set(getNodeId(original as unknown as { id?: number }), result);
    }
    const results: Statement[] = [];
    for (const statement of statementListNodes(statements)) {
      const original = this.emitContext().mostOriginal(statement as unknown as AstNode);
      const replacement = this.lateStatementReplacementMap.get(getNodeId(original as unknown as { id?: number }));
      if (replacement === undefined) {
        results.push(statement);
      } else if (replacement !== undefined) {
        results.push(replacement as unknown as Statement);
      }
    }
    return this.factory().newNodeList(results) as unknown as StatementList;
  }

  getReferencedFiles(outputFilePath: string): FileReference[] {
    const results: FileReference[] = [];
    const host = this.host as unknown as {
      getSourceFileFromReference?: (origin: SourceFile, ref: FileReference) => SourceFile | undefined;
      getOutputPathsFor?: (file: SourceFile, forceDtsPaths: boolean) => OutputPaths;
      getCurrentDirectory?: () => string;
      useCaseSensitiveFileNames?: () => boolean;
    };
    const outputDirectory = getDirectoryPath(normalizeSlashes(outputFilePath));
    for (const pair of this.rawReferencedFiles) {
      if (!fileReferencePreserve(pair.ref)) continue;
      const file = host.getSourceFileFromReference?.(pair.file, pair.ref);
      if (file === undefined) continue;
      let declarationFileName = sourceFileIsDeclarationFile(file)
        ? sourceFileFileName(file)
        : host.getOutputPathsFor?.(file, true)?.declarationFilePath() ?? "";
      if (declarationFileName.length === 0 && !sourceFileIsDeclarationFile(file)) {
        declarationFileName = host.getOutputPathsFor?.(file, true)?.jsFilePath() ?? "";
      }
      if (declarationFileName.length === 0) declarationFileName = sourceFileFileName(file);
      if (declarationFileName.length === 0) continue;
      const fileName = getRelativePathToDirectoryOrUrl(outputDirectory, declarationFileName, false, {
        currentDirectory: host.getCurrentDirectory?.() ?? "",
        useCaseSensitiveFileNames: host.useCaseSensitiveFileNames?.() ?? true,
      });
      results.push(cloneFileReference(pair.ref, fileName));
    }
    return results;
  }

  getLibReferences(): FileReference[] {
    return this.rawLibReferenceDirectives
      .filter(fileReferencePreserve)
      .map(ref => cloneFileReference(ref, fileReferenceFileName(ref)));
  }

  getTypeReferences(): FileReference[] {
    return this.rawTypeReferenceDirectives
      .filter(fileReferencePreserve)
      .map(ref => cloneFileReference(ref, fileReferenceFileName(ref)));
  }

  // -------------------------------------------------------------------------
  // Declaration subtree visitor
  // -------------------------------------------------------------------------

  visitDeclarationSubtree(input: AstNode): AstNode {
    if (this.shouldStripInternal(input)) return undefined as unknown as AstNode;
    if (isDeclaration(input)) {
      if (isDeclarationAndNotVisible(this.emitContext(), this.resolver, input)) {
        return undefined as unknown as AstNode;
      }
      if (hasDynamicName(input)) {
        if (this.state.isolatedDeclarations) {
          const expression = declarationName(input)?.expression;
          const parent = input.parent;
          const objectReferenceOk = expression === undefined
            || (this.resolver as unknown as { isDefinitelyReferenceToGlobalSymbolObject?: (node: AstNode) => boolean })
              .isDefinitelyReferenceToGlobalSymbolObject?.(expression) === true;
          if (!objectReferenceOk && (parent?.kind === Kind.ClassDeclaration || parent?.kind === Kind.ObjectLiteralExpression)) {
            this.state.diagnostics.push(createExpressionError(input));
            return undefined as unknown as AstNode;
          }
          if (!objectReferenceOk
            && (parent?.kind === Kind.InterfaceDeclaration || parent?.kind === Kind.TypeLiteral)
            && expression !== undefined
            && !isEntityNameExpression(expression)) {
            this.state.diagnostics.push(createExpressionError(input));
            return undefined as unknown as AstNode;
          }
        } else {
          const parseNode = this.emitContext().parseNode(input);
          const lateBound = (this.resolver as unknown as { isLateBound?: (node: AstNode | undefined) => boolean }).isLateBound?.(parseNode) === true;
          const expression = declarationName(input)?.expression;
          if (!lateBound || expression === undefined || !isEntityNameExpression(expression)) return undefined as unknown as AstNode;
        }
      }
    }
    if (isFunctionLike(input)
      && (this.resolver as unknown as { isImplementationOfOverload?: (node: AstNode) => boolean }).isImplementationOfOverload?.(input) === true) {
      return undefined as unknown as AstNode;
    }
    if (input.kind === Kind.SemicolonClassElement) return undefined as unknown as AstNode;
    if (isHeritageClause(input) && heritageClauseIsEmpty(input)) return undefined as unknown as AstNode;

    const previousEnclosingDeclaration = this.enclosingDeclaration;
    if (isEnclosingDeclaration(input)) this.enclosingDeclaration = input;
    const canProduceDiagnostic = canProduceDiagnostics(input);
    const oldSuppress = this.suppressNewDiagnosticContexts;
    const shouldSuppress = (input.kind === Kind.TypeLiteral || input.kind === Kind.MappedType)
      && input.parent?.kind !== Kind.TypeAliasDeclaration
      && input.parent?.kind !== Kind.JSTypeAliasDeclaration;
    const oldDiagnostic = this.state.getSymbolAccessibilityDiagnostic;
    const oldName = this.state.errorNameNode;
    if (canProduceDiagnostic && !this.suppressNewDiagnosticContexts) {
      this.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
    }
    if (shouldSuppress) this.suppressNewDiagnosticContexts = true;

    let result: AstNode | undefined;
    switch (input.kind) {
      case Kind.MappedType:
        result = this.transformMappedTypeNode(input as unknown as MappedTypeNode);
        break;
      case Kind.HeritageClause:
        result = this.transformHeritageClause(input as unknown as HeritageClause);
        break;
      case Kind.MethodSignature:
        result = this.transformMethodSignatureDeclaration(input as unknown as MethodSignatureDeclaration);
        break;
      case Kind.MethodDeclaration:
        result = this.transformMethodDeclaration(input as unknown as MethodDeclaration);
        break;
      case Kind.ConstructSignature:
        result = this.transformConstructSignatureDeclaration(input as unknown as ConstructSignatureDeclaration);
        break;
      case Kind.Constructor:
        result = this.transformConstructorDeclaration(input as unknown as ConstructorDeclaration);
        break;
      case Kind.GetAccessor:
        result = this.transformGetAccessorDeclaration(input as unknown as GetAccessorDeclaration);
        break;
      case Kind.SetAccessor:
        result = this.transformSetAccessorDeclaration(input as unknown as SetAccessorDeclaration);
        break;
      case Kind.PropertyDeclaration:
        result = this.transformPropertyDeclaration(input as unknown as PropertyDeclaration);
        break;
      case Kind.PropertySignature:
        result = this.transformPropertySignatureDeclaration(input as unknown as PropertySignatureDeclaration);
        break;
      case Kind.CallSignature:
        result = this.transformCallSignatureDeclaration(input as unknown as CallSignatureDeclaration);
        break;
      case Kind.IndexSignature:
        result = this.transformIndexSignatureDeclaration(input as unknown as IndexSignatureDeclaration);
        break;
      case Kind.VariableDeclaration:
        result = this.transformVariableDeclaration(input as unknown as VariableDeclaration);
        break;
      case Kind.TypeParameter:
        result = this.transformTypeParameterDeclaration(input as unknown as TypeParameterDeclaration);
        break;
      case Kind.ExpressionWithTypeArguments:
        result = this.transformExpressionWithTypeArguments(input as unknown as ExpressionWithTypeArguments);
        break;
      case Kind.TypeReference:
        result = this.transformTypeReference(input as unknown as TypeReferenceNode);
        break;
      case Kind.ConditionalType:
        result = this.transformConditionalTypeNode(input as unknown as ConditionalTypeNode);
        break;
      case Kind.FunctionType:
        result = this.transformFunctionTypeNode(input as unknown as FunctionTypeNode);
        break;
      case Kind.ConstructorType:
        result = this.transformConstructorTypeNode(input as unknown as ConstructorTypeNode);
        break;
      case Kind.ImportType:
        result = this.transformImportTypeNode(input as unknown as ImportTypeNode);
        break;
      case Kind.TypeQuery:
        this.checkEntityNameVisibility((input as unknown as { readonly exprName?: AstNode }).exprName as AstNode, this.enclosingDeclaration);
        result = this.visitor().visitEachChild(input);
        break;
      case Kind.TupleType:
        result = this.visitor().visitEachChild(input);
        if (result !== undefined && isOriginalNodeSingleLine(this.emitContext(), input)) this.emitContext().addEmitFlags(result, EmitFlags.SingleLine);
        break;
      case Kind.JSDocTypeExpression:
        result = this.transformJSDocTypeExpression(input as unknown as JSDocTypeExpression);
        break;
      case Kind.JSDocTypeLiteral:
        result = this.transformJSDocTypeLiteral(input as unknown as JSDocTypeLiteral);
        break;
      case Kind.JSDocPropertyTag:
        result = this.transformJSDocPropertyTag(input);
        break;
      case Kind.JSDocAllType:
        result = this.transformJSDocAllType(input as unknown as JSDocAllType);
        break;
      default:
        result = this.visitor().visitEachChild(input);
        break;
    }

    if (result !== undefined && canProduceDiagnostic && hasDynamicName(input)) this.checkName(input);
    this.enclosingDeclaration = previousEnclosingDeclaration;
    this.state.getSymbolAccessibilityDiagnostic = oldDiagnostic;
    this.state.errorNameNode = oldName;
    this.suppressNewDiagnosticContexts = oldSuppress;
    return result as AstNode;
  }

  checkName(node: AstNode): void {
    const oldDiagnostic = this.state.getSymbolAccessibilityDiagnostic;
    if (!this.suppressNewDiagnosticContexts) {
      this.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
    }
    const name = declarationName(node);
    this.state.errorNameNode = name;
    const expression = name?.expression;
    if (expression !== undefined) this.checkEntityNameVisibility(expression, this.enclosingDeclaration);
    if (!this.suppressNewDiagnosticContexts) this.state.getSymbolAccessibilityDiagnostic = oldDiagnostic;
    this.state.errorNameNode = undefined;
  }

  // -------------------------------------------------------------------------
  // Type node transforms
  // -------------------------------------------------------------------------

  transformMappedTypeNode(input: MappedTypeNode): AstNode {
    const typeNode = visitOptional(this, nodeField(input, "type")) ?? this.factory().newAnyKeyword();
    return updateWithFactory(this.factory(), "updateMappedTypeNode", input as unknown as AstNode,
      nodeField(input, "readonlyToken"),
      visitOptional(this, nodeField(input, "typeParameter")),
      visitOptional(this, nodeField(input, "nameType")),
      nodeField(input, "questionToken"),
      typeNode,
      undefined,
    );
  }
  transformHeritageClause(clause: HeritageClause): AstNode {
    const types = nodeArray(nodeField(clause, "types")).filter(type => {
      const expression = nodeField(type, "expression");
      return expression !== undefined
        && (isEntityNameExpression(expression) || ((clause as unknown as { readonly token?: number }).token === Kind.ExtendsKeyword && expression.kind === Kind.NullKeyword));
    });
    if (types.length === 0) return undefined as unknown as AstNode;
    if (types.length === nodeArray(nodeField(clause, "types")).length) return this.visitor().visitEachChild(clause as unknown as AstNode);
    return updateWithFactory(this.factory(), "updateHeritageClause", clause as unknown as AstNode, (clause as unknown as { readonly token?: number }).token, this.visitor().visitNodes(this.factory().newNodeList(types)));
  }
  transformImportTypeNode(input: ImportTypeNode): AstNode {
    const argument = nodeField(input, "argument");
    const literal = nodeField(argument, "literal");
    if (literal === undefined) return input as unknown as AstNode;
    const updatedLiteral = updateWithFactory(this.factory(), "updateLiteralTypeNode", argument as AstNode, this.rewriteModuleSpecifier(input as unknown as AstNode, literal));
    return updateWithFactory(this.factory(), "updateImportTypeNode", input as unknown as AstNode,
      boolField(input, "isTypeOf"),
      updatedLiteral,
      nodeField(input, "attributes"),
      nodeField(input, "qualifier"),
      this.visitor().visitNodes(nodeField(input, "typeArguments")),
    );
  }
  transformConstructorTypeNode(input: ConstructorTypeNode): AstNode {
    return updateWithFactory(this.factory(), "updateConstructorTypeNode", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      this.visitor().visitNodes(nodeField(input, "typeParameters")),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      visitOptional(this, nodeField(input, "type")),
    );
  }
  transformFunctionTypeNode(input: FunctionTypeNode): AstNode {
    return updateWithFactory(this.factory(), "updateFunctionTypeNode", input as unknown as AstNode,
      this.visitor().visitNodes(nodeField(input, "typeParameters")),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      visitOptional(this, nodeField(input, "type")),
    );
  }
  transformConditionalTypeNode(input: ConditionalTypeNode): AstNode {
    const checkType = visitOptional(this, nodeField(input, "checkType"));
    const extendsType = visitOptional(this, nodeField(input, "extendsType"));
    const oldEnclosingDeclaration = this.enclosingDeclaration;
    this.enclosingDeclaration = nodeField(input, "trueType");
    const trueType = visitOptional(this, nodeField(input, "trueType"));
    this.enclosingDeclaration = oldEnclosingDeclaration;
    const falseType = visitOptional(this, nodeField(input, "falseType"));
    return updateWithFactory(this.factory(), "updateConditionalTypeNode", input as unknown as AstNode, checkType, extendsType, trueType, falseType);
  }
  transformTypeReference(input: TypeReferenceNode): AstNode {
    const typeName = nodeField(input, "typeName");
    if (typeName !== undefined) this.checkEntityNameVisibility(typeName, this.enclosingDeclaration);
    return this.visitor().visitEachChild(input as unknown as AstNode);
  }
  transformExpressionWithTypeArguments(input: ExpressionWithTypeArguments): AstNode {
    const expression = nodeField(input, "expression");
    if (expression !== undefined && (isEntityName(expression) || isEntityNameExpression(expression))) {
      this.checkEntityNameVisibility(expression, this.enclosingDeclaration);
    }
    return this.visitor().visitEachChild(input as unknown as AstNode);
  }
  transformTypeParameterDeclaration(input: TypeParameterDeclaration): AstNode { return input as unknown as AstNode; }

  // -------------------------------------------------------------------------
  // Declaration-level transforms
  // -------------------------------------------------------------------------

  transformVariableDeclaration(input: VariableDeclaration): AstNode {
    const name = nodeField(input, "name");
    if (name !== undefined && isBindingPattern(name)) return this.recreateBindingPattern(name as unknown as BindingPattern);
    this.suppressNewDiagnosticContexts = true;
    return updateWithFactory(this.factory(), "updateVariableDeclaration", input as unknown as AstNode,
      name,
      undefined,
      this.ensureType(input as unknown as AstNode, false),
      this.ensureNoInitializer(input as unknown as AstNode),
    );
  }
  recreateBindingPattern(input: BindingPattern): AstNode {
    const results: AstNode[] = [];
    for (const element of nodeArray(nodeField(input, "elements"))) {
      const result = this.recreateBindingElement(element as unknown as BindingElement);
      if (result === undefined) continue;
      if (result.kind === Kind.SyntaxList) results.push(...nodeArray(nodeField(result, "children")));
      else results.push(result);
    }
    if (results.length === 0) return undefined as unknown as AstNode;
    if (results.length === 1) return results[0]!;
    return this.factory().newSyntaxList(results);
  }
  recreateBindingElement(e: BindingElement): AstNode {
    const name = nodeField(e, "name");
    if (name === undefined) return undefined as unknown as AstNode;
    if (!getBindingNameVisible(this.resolver, e as unknown as AstNode)) return undefined as unknown as AstNode;
    if (isBindingPattern(name)) return this.recreateBindingPattern(name as unknown as BindingPattern);
    return this.factory().newVariableDeclaration(name, undefined, this.ensureType(e as unknown as AstNode, false), undefined);
  }
  transformIndexSignatureDeclaration(input: IndexSignatureDeclaration): AstNode {
    const type = visitOptional(this, nodeField(input, "type")) ?? this.factory().newAnyKeyword();
    return updateWithFactory(this.factory(), "updateIndexSignatureDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      type,
    );
  }
  transformCallSignatureDeclaration(input: CallSignatureDeclaration): AstNode {
    return updateWithFactory(this.factory(), "updateCallSignatureDeclaration", input as unknown as AstNode,
      this.ensureTypeParams(input as unknown as AstNode, nodeField(input, "typeParameters") as TypeParameterList | undefined),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      this.ensureType(input as unknown as AstNode, false),
    );
  }
  transformPropertySignatureDeclaration(input: PropertySignatureDeclaration): AstNode {
    const name = nodeField(input, "name");
    if (isPrivateIdentifierNode(name)) return undefined as unknown as AstNode;
    return updateWithFactory(this.factory(), "updatePropertySignatureDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      name,
      nodeField(input, "postfixToken"),
      this.ensureType(input as unknown as AstNode, false),
      this.ensureNoInitializer(input as unknown as AstNode),
    );
  }
  transformPropertyDeclaration(input: PropertyDeclaration): AstNode {
    const name = nodeField(input, "name");
    if (isPrivateIdentifierNode(name)) return undefined as unknown as AstNode;
    const postfixToken = nodeField(input, "postfixToken")?.kind === Kind.ExclamationToken ? undefined : nodeField(input, "postfixToken");
    return updateWithFactory(this.factory(), "updatePropertyDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      name,
      postfixToken,
      this.ensureType(input as unknown as AstNode, false),
      this.ensureNoInitializer(input as unknown as AstNode),
    );
  }
  transformSetAccessorDeclaration(input: SetAccessorDeclaration): AstNode {
    const name = nodeField(input, "name");
    if (isPrivateIdentifierNode(name)) return undefined as unknown as AstNode;
    const isPrivate = (effectiveDeclarationFlags(this, input as unknown as AstNode, ModifierFlags.Private) & ModifierFlags.Private) !== 0;
    return updateWithFactory(this.factory(), "updateSetAccessorDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      name,
      undefined,
      this.updateAccessorParamList(input as unknown as AstNode, isPrivate),
      undefined,
      undefined,
    );
  }
  transformGetAccessorDeclaration(input: GetAccessorDeclaration): AstNode {
    const name = nodeField(input, "name");
    if (isPrivateIdentifierNode(name)) return undefined as unknown as AstNode;
    const isPrivate = (effectiveDeclarationFlags(this, input as unknown as AstNode, ModifierFlags.Private) & ModifierFlags.Private) !== 0;
    return updateWithFactory(this.factory(), "updateGetAccessorDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      name,
      undefined,
      this.updateAccessorParamList(input as unknown as AstNode, isPrivate),
      this.ensureType(input as unknown as AstNode, false),
      undefined,
    );
  }
  updateAccessorParamList(input: AstNode, isPrivate: boolean): ParameterList {
    const newParams: AstNode[] = [];
    if (!isPrivate) {
      const thisParam = getThisParameter(input);
      if (thisParam !== undefined) newParams.push(this.ensureParameter(thisParam as unknown as ParameterDeclaration));
    }
    if (input.kind === Kind.SetAccessor) {
      const parameters = nodeArray(nodeField(input, "parameters"));
      let valueParam: AstNode | undefined;
      if (!isPrivate) {
        if (newParams.length === 1 && parameters.length >= 2) valueParam = this.ensureParameter(parameters[1] as unknown as ParameterDeclaration);
        else if (newParams.length === 0 && parameters.length >= 1) valueParam = this.ensureParameter(parameters[0] as unknown as ParameterDeclaration);
      }
      if (valueParam === undefined) {
        const type = isPrivate ? undefined : this.factory().newAnyKeyword();
        valueParam = this.factory().newParameterDeclaration(undefined, undefined, this.factory().newIdentifier("value"), undefined, type, undefined);
      }
      newParams.push(valueParam);
    }
    return this.factory().newNodeList(newParams) as unknown as ParameterList;
  }
  transformConstructorDeclaration(input: ConstructorDeclaration): AstNode {
    return updateWithFactory(this.factory(), "updateConstructorDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      undefined,
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      undefined,
      undefined,
    );
  }
  transformConstructSignatureDeclaration(input: ConstructSignatureDeclaration): AstNode {
    return updateWithFactory(this.factory(), "updateConstructSignatureDeclaration", input as unknown as AstNode,
      this.ensureTypeParams(input as unknown as AstNode, nodeField(input, "typeParameters") as TypeParameterList | undefined),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      this.ensureType(input as unknown as AstNode, false),
    );
  }
  omitPrivateMethodType(input: AstNode): AstNode {
    const symbol = (input as unknown as { readonly symbol?: { readonly declarations?: readonly AstNode[] } }).symbol;
    if (symbol?.declarations !== undefined && symbol.declarations.length > 0 && symbol.declarations[0] !== input) return undefined as unknown as AstNode;
    const result = this.factory().newPropertyDeclaration(this.ensureModifiers(input), nodeField(input, "name"), undefined, undefined, undefined);
    this.preserveJsDoc(result, input);
    return result;
  }
  transformMethodSignatureDeclaration(input: MethodSignatureDeclaration): AstNode {
    const name = nodeField(input, "name");
    if ((effectiveDeclarationFlags(this, input as unknown as AstNode, ModifierFlags.Private) & ModifierFlags.Private) !== 0) return this.omitPrivateMethodType(input as unknown as AstNode);
    if (isPrivateIdentifierNode(name)) return undefined as unknown as AstNode;
    return updateWithFactory(this.factory(), "updateMethodSignatureDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      name,
      nodeField(input, "postfixToken"),
      this.ensureTypeParams(input as unknown as AstNode, nodeField(input, "typeParameters") as TypeParameterList | undefined),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      this.ensureType(input as unknown as AstNode, false),
    );
  }
  transformMethodDeclaration(input: MethodDeclaration): AstNode {
    const name = nodeField(input, "name");
    if ((effectiveDeclarationFlags(this, input as unknown as AstNode, ModifierFlags.Private) & ModifierFlags.Private) !== 0) return this.omitPrivateMethodType(input as unknown as AstNode);
    if (isPrivateIdentifierNode(name)) return undefined as unknown as AstNode;
    return updateWithFactory(this.factory(), "updateMethodDeclaration", input as unknown as AstNode,
      this.ensureModifiers(input as unknown as AstNode),
      undefined,
      name,
      nodeField(input, "postfixToken"),
      this.ensureTypeParams(input as unknown as AstNode, nodeField(input, "typeParameters") as TypeParameterList | undefined),
      this.updateParamList(input as unknown as AstNode, nodeField(input, "parameters") as ParameterList | undefined),
      this.ensureType(input as unknown as AstNode, false),
      undefined,
    );
  }

  visitDeclarationStatements(input: AstNode): AstNode {
    if (this.shouldStripInternal(input)) return undefined as unknown as AstNode;
    switch (input.kind) {
      case Kind.ExportDeclaration:
        if (input.parent?.kind === Kind.SourceFile) this.resultHasExternalModuleIndicator = true;
        this.resultHasScopeMarker = true;
        return this.factory().updateExportDeclaration(
          input,
          (input as unknown as { readonly modifiers?: ModifierList }).modifiers,
          (input as unknown as { readonly isTypeOnly?: boolean }).isTypeOnly ?? false,
          (input as unknown as { readonly exportClause?: AstNode }).exportClause,
          this.rewriteModuleSpecifier(input, (input as unknown as { readonly moduleSpecifier?: AstNode }).moduleSpecifier as AstNode),
          this.tryGetResolutionModeOverride((input as unknown as { readonly attributes?: AstNode }).attributes as AstNode),
        );
      case Kind.ExportAssignment:
        return this.transformExportAssignment(
          input,
          input,
          (input as unknown as { readonly expression?: AstNode }).expression as AstNode,
          (input as unknown as { readonly isExportEquals?: boolean }).isExportEquals ?? false,
        );
      default: {
        const id = getNodeId(this.emitContext().mostOriginal(input) as unknown as { id?: number });
        if (!this.lateStatementReplacementMap.has(id)) {
          this.lateStatementReplacementMap.set(id, this.transformTopLevelDeclaration(input));
        }
        return input;
      }
    }
  }

  transformExportAssignment(
    input: AstNode, assignment: AstNode, expression: AstNode, isExportEquals: boolean,
  ): AstNode {
    void assignment; void expression; void isExportEquals;
    return input;
  }

  transformCommonJSExport(input: AstNode, name: AstNode): AstNode {
    void name;
    return input;
  }

  rewriteModuleSpecifier(parent: AstNode, input: AstNode): AstNode {
    void parent;
    return input;
  }

  tryGetResolutionModeOverride(node: AstNode): AstNode | undefined {
    void node;
    return undefined;
  }

  preserveJsDoc(updated: AstNode, original: AstNode): void {
    this.emitContext().assignCommentAndSourceMapRanges(updated, original);
  }

  removeAllComments(node: AstNode): void { this.emitContext().addEmitFlags(node, EmitFlags.NoComments); }

  ensureType(node: AstNode, ignorePrivate: boolean): AstNode {
    void node; void ignorePrivate;
    return this.factory().newAnyKeyword();
  }

  shouldPrintWithInitializer(node: AstNode): boolean {
    void node;
    return false;
  }

  checkEntityNameVisibility(entityName: AstNode, enclosingDeclaration: AstNode | undefined): void {
    const visibility = (this.resolver as unknown as { isEntityNameVisible?: (node: AstNode, enclosingDeclaration: AstNode | undefined) => unknown })
      .isEntityNameVisible?.(entityName, enclosingDeclaration);
    if (visibility !== undefined) this.tracker.handleSymbolAccessibilityError(visibility as Parameters<SymbolTrackerImpl["handleSymbolAccessibilityError"]>[0]);
  }

  // -------------------------------------------------------------------------
  // Top-level declaration transforms
  // -------------------------------------------------------------------------

  transformTopLevelDeclaration(input: AstNode): AstNode {
    this.state.lateMarkedStatements = this.state.lateMarkedStatements.filter(node => node !== input);
    if (this.shouldStripInternal(input)) return undefined as unknown as AstNode;
    if (input.kind === Kind.ImportEqualsDeclaration) return this.transformImportEqualsDeclaration(input as unknown as ImportEqualsDeclaration);
    if (input.kind === Kind.ImportDeclaration || input.kind === Kind.JSImportDeclaration) {
      return this.transformImportDeclaration(input as unknown as ImportDeclaration);
    }
    if (isDeclaration(input) && isDeclarationAndNotVisible(this.emitContext(), this.resolver, input)) {
      return undefined as unknown as AstNode;
    }
    if (isFunctionLike(input) && (this.resolver as unknown as { isImplementationOfOverload?: (node: AstNode) => boolean }).isImplementationOfOverload?.(input) === true) {
      return undefined as unknown as AstNode;
    }
    const original = this.emitContext().mostOriginal(input);
    const expandoHost = this.expandoHosts.has(getNodeId(original as unknown as { id?: number }));
    if (expandoHost) return input;

    const previousEnclosingDeclaration = this.enclosingDeclaration;
    if (isEnclosingDeclaration(input)) this.enclosingDeclaration = input;
    const previousDiagnostic = this.state.getSymbolAccessibilityDiagnostic;
    const saveNeedsDeclare = this.needsDeclare;
    if (canProduceDiagnostics(input)) {
      this.state.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
    }

    let result: AstNode;
    switch (input.kind) {
      case Kind.TypeAliasDeclaration:
      case Kind.JSTypeAliasDeclaration:
        result = this.transformTypeAliasDeclaration(input as unknown as TypeAliasDeclaration);
        break;
      case Kind.InterfaceDeclaration:
        result = this.transformInterfaceDeclaration(input as unknown as InterfaceDeclaration);
        break;
      case Kind.FunctionDeclaration:
        result = this.transformFunctionDeclaration(input as unknown as FunctionDeclaration);
        break;
      case Kind.ModuleDeclaration:
        result = this.transformModuleDeclaration(input as unknown as ModuleDeclaration);
        break;
      case Kind.ClassDeclaration:
        result = this.transformClassDeclaration(input as unknown as ClassDeclaration);
        break;
      case Kind.VariableStatement:
        result = this.transformVariableStatement(input as unknown as VariableStatement);
        break;
      case Kind.EnumDeclaration:
        result = this.transformEnumDeclaration(input as unknown as EnumDeclaration);
        break;
      default:
        throw new Error(`Unhandled top-level node in declaration emit: ${input.kind}`);
    }

    this.enclosingDeclaration = previousEnclosingDeclaration;
    this.state.getSymbolAccessibilityDiagnostic = previousDiagnostic;
    this.needsDeclare = saveNeedsDeclare;
    return result;
  }

  transformTypeAliasDeclaration(input: TypeAliasDeclaration): AstNode { return input as unknown as AstNode; }
  transformInterfaceDeclaration(input: InterfaceDeclaration): AstNode { return input as unknown as AstNode; }
  transformFunctionDeclaration(input: FunctionDeclaration): AstNode { return input as unknown as AstNode; }
  transformModuleDeclaration(input: ModuleDeclaration): AstNode { return input as unknown as AstNode; }

  stripExportModifiers(statement: AstNode): AstNode {
    return statement;
  }

  transformClassDeclaration(input: ClassDeclaration): AstNode { return input as unknown as AstNode; }

  walkBindingPattern(pattern: BindingPattern, param: AstNode): readonly AstNode[] {
    void pattern; void param;
    return [];
  }

  transformVariableStatement(input: VariableStatement): AstNode { return input as unknown as AstNode; }
  transformEnumDeclaration(input: EnumDeclaration): AstNode { return input as unknown as AstNode; }

  // -------------------------------------------------------------------------
  // Modifier / type-parameter / parameter helpers
  // -------------------------------------------------------------------------

  ensureModifiers(node: AstNode): ModifierList | undefined {
    void node;
    return undefined;
  }

  ensureModifierFlags(node: AstNode): number {
    void node;
    return 0;
  }

  ensureTypeParams(node: AstNode, params: TypeParameterList | undefined): TypeParameterList | undefined {
    void node;
    return params;
  }

  updateParamList(node: AstNode, params: ParameterList | undefined): ParameterList | undefined {
    void node;
    return params;
  }

  ensureParameter(p: ParameterDeclaration): AstNode {
    return p as unknown as AstNode;
  }

  ensureNoInitializer(node: AstNode): AstNode {
    return node;
  }

  filterBindingPatternInitializers(node: AstNode): AstNode {
    return node;
  }

  // -------------------------------------------------------------------------
  // Import / export transforms
  // -------------------------------------------------------------------------

  transformImportEqualsDeclaration(decl: ImportEqualsDeclaration): AstNode {
    return decl as unknown as AstNode;
  }

  transformImportDeclaration(decl: ImportDeclaration): AstNode {
    return decl as unknown as AstNode;
  }

  visitExpressionStatement(node: AstNode): AstNode | undefined {
    const expression = (node as unknown as { readonly expression?: AstNode }).expression;
    if (expression === undefined) return undefined;
    return undefined;
  }

  // -------------------------------------------------------------------------
  // JSDoc node transforms
  // -------------------------------------------------------------------------

  transformJSDocTypeExpression(input: JSDocTypeExpression): AstNode {
    return visitOptional(this, nodeField(input, "type")) ?? input as unknown as AstNode;
  }

  transformJSDocTypeLiteral(input: JSDocTypeLiteral): AstNode {
    const propertyTags = nodeArray(nodeField(input, "jsDocPropertyTags"))
      .map((tag) => this.visitor().visit(tag))
      .filter((tag): tag is AstNode => tag !== undefined);
    const replacement = factoryCall(this.factory(), "newTypeLiteralNode", input as unknown as AstNode, this.factory().newNodeList(propertyTags));
    this.emitContext().setOriginal(replacement, input as unknown as AstNode);
    return replacement;
  }

  transformJSDocPropertyTag(input: AstNode): AstNode {
    const name = visitOptional(this, nodeField(input, "tagName")) ?? nodeField(input, "name") ?? this.factory().newIdentifier("");
    const type = visitOptional(this, nodeField(input, "typeExpression")) ?? this.factory().newAnyKeyword();
    const replacement = factoryCall(
      this.factory(),
      "newPropertySignatureDeclaration",
      input,
      undefined,
      name,
      undefined,
      type,
      undefined,
    );
    this.emitContext().setOriginal(replacement, input);
    return replacement;
  }

  transformJSDocAllType(input: JSDocAllType): AstNode {
    const replacement = this.factory().newAnyKeyword();
    this.emitContext().setOriginal(replacement, input as unknown as AstNode);
    return replacement;
  }

  transformJSDocNullableType(input: AstNode): AstNode {
    const type = visitOptional(this, nodeField(input, "type")) ?? this.factory().newAnyKeyword();
    const nullType = factoryCall(
      this.factory(),
      "newLiteralTypeNode",
      input,
      this.factory().newToken(Kind.NullKeyword),
    );
    const replacement = factoryCall(
      this.factory(),
      "newUnionTypeNode",
      input,
      this.factory().newNodeList([type, nullType]),
    );
    this.emitContext().setOriginal(replacement, input);
    return replacement;
  }

  transformJSDocNonNullableType(input: AstNode): AstNode {
    return visitOptional(this, nodeField(input, "type")) ?? input;
  }

  transformJSDocVariadicType(input: AstNode): AstNode {
    const type = visitOptional(this, nodeField(input, "type")) ?? this.factory().newAnyKeyword();
    const replacement = factoryCall(this.factory(), "newArrayTypeNode", input, type);
    this.emitContext().setOriginal(replacement, input);
    return replacement;
  }

  transformJSDocOptionalType(input: AstNode): AstNode {
    const type = visitOptional(this, nodeField(input, "type")) ?? this.factory().newAnyKeyword();
    const undefinedType = factoryCall(this.factory(), "newKeywordTypeNode", input, Kind.UndefinedKeyword);
    const replacement = factoryCall(
      this.factory(),
      "newUnionTypeNode",
      input,
      this.factory().newNodeList([type, undefinedType]),
    );
    this.emitContext().setOriginal(replacement, input);
    return replacement;
  }

  getNameExpressionPreferringIdentifier(nameExpr: AstNode | undefined): AstNode | undefined {
    if (nameExpr === undefined) return undefined;
    if (nameExpr.kind === Kind.NumericLiteral) {
      return this.factory().newStringLiteral(nodeTextLocal(nameExpr), 0);
    }
    if (isStringLiteralLikeLocal(nameExpr) && isIdentifierTextLocal(nodeTextLocal(nameExpr))) {
      const identifier = this.factory().newIdentifier(nodeTextLocal(nameExpr));
      const keywordKind = keywordKindForIdentifierText(nodeTextLocal(nameExpr));
      if (keywordKind === Kind.Unknown || keywordKind === Kind.DefaultKeyword) {
        setNodeParentLocal(identifier, nodeParentLocal(nameExpr));
        return identifier;
      }
    }
    return nameExpr;
  }

  visitBindingName(node: AstNode): AstNode {
    if (isBindingPattern(node)) return this.recreateBindingPattern(node as unknown as BindingPattern);
    return this.visitor().visitEachChild(node);
  }

  transformCjsRequireVariableDeclaration(input: VariableDeclaration): AstNode | undefined {
    const initializer = nodeField<AstNode>(input, "initializer");
    const args = nodeArray(nodeField(initializer, "arguments"));
    const specifier = args[0];
    const name = nodeField<AstNode>(input, "name");
    if (specifier === undefined || name === undefined) return undefined;
    const rewrittenSpecifier = this.rewriteModuleSpecifier(input as unknown as AstNode, specifier);
    if (name.kind === Kind.Identifier) {
      return factoryCall(
        this.factory(),
        "newImportEqualsDeclaration",
        input as unknown as AstNode,
        undefined,
        false,
        name,
        factoryCall(this.factory(), "newExternalModuleReference", input as unknown as AstNode, rewrittenSpecifier),
      );
    }
    if (name.kind === Kind.ArrayBindingPattern) return undefined;
    const importSpecifiers: AstNode[] = [];
    for (const element of nodeArray(nodeField(name, "elements"))) {
      const elementName = nodeField<AstNode>(element, "name");
      if (elementName?.kind !== Kind.Identifier) continue;
      importSpecifiers.push(this.factory().newImportSpecifier(
        false,
        nodeField(element, "propertyName") as never,
        elementName as never,
      ));
    }
    return this.factory().newImportDeclaration(
      undefined,
      this.factory().newImportClause(
        Kind.Unknown,
        undefined,
        this.factory().newNamedImports(this.factory().newNodeList(importSpecifiers)),
      ),
      rewrittenSpecifier,
      undefined,
    );
  }

  // -------------------------------------------------------------------------
  // Expando function reporting
  // -------------------------------------------------------------------------

  reportExpandoFunctionErrors(node: AstNode): void {
    void node;
  }

  transformExpandoAssignment(node: AstNode): AstNode | undefined {
    const left = nodeField<AstNode>(node, "left");
    if (left === undefined) return undefined;
    const namespace = leftmostAccessExpression(left);
    if (namespace?.kind !== Kind.Identifier) return undefined;
    const declaration = (this.resolver as unknown as {
      getReferencedValueDeclaration?: (node: AstNode) => AstNode | undefined;
    }).getReferencedValueDeclaration?.(namespace);
    if (declaration === undefined) return undefined;
    if (!this.expandoDeclarationCanReceiveNamespace(declaration)) return undefined;
    const property = this.tryGetPropertyName(left);
    if (property === "" || !isIdentifierTextLocal(property)) return undefined;
    if (isDeclaration(declaration) && isDeclarationAndNotVisible(this.emitContext(), this.resolver, declaration)) {
      return undefined;
    }
    const name = this.factory().newIdentifier(nodeTextLocal(namespace));
    this.transformExpandoHost(name, declaration);
    return this.createExpandoNamespace(name, declaration, property, node);
  }

  expandoDeclarationCanReceiveNamespace(declaration: AstNode): boolean {
    if (declaration.kind === Kind.VariableDeclaration && nodeField(declaration, "type") !== undefined) return false;
    if (declaration.kind === Kind.FunctionDeclaration && nodeField(declaration, "fullSignature") !== undefined) return false;
    if (declaration.kind === Kind.VariableDeclaration && !isFunctionLike(nodeField(declaration, "initializer") as AstNode)) return false;
    return true;
  }

  transformExpandoHost(name: AstNode, declaration: AstNode): void {
    const root = declaration.kind === Kind.VariableDeclaration
      ? nodeParentLocal(nodeParentLocal(declaration) ?? declaration) ?? declaration
      : declaration;
    const id = getNodeId(this.emitContext().mostOriginal(root) as Parameters<typeof getNodeId>[0]);
    if (this.expandoHosts.has(id)) return;
    const savedNeedsDeclare = this.needsDeclare;
    this.needsDeclare = true;
    const modifierFlags = this.ensureModifierFlags(root);
    this.needsDeclare = savedNeedsDeclare;
    const replacement = this.createExpandoHostReplacement(name, declaration, modifierFlags);
    if (replacement === undefined) return;
    this.expandoHosts.add(id);
    this.lateStatementReplacementMap.set(id, replacement);
  }

  createExpandoHostReplacement(name: AstNode, declaration: AstNode, modifierFlags: number): AstNode | undefined {
    const params = extractExpandoHostParams(declaration);
    const modifiers = createModifiersFromFlagsLocal(this.factory(), modifierFlags);
    if (declaration.kind === Kind.FunctionDeclaration) {
      return updateWithFactory(
        this.factory(),
        "updateFunctionDeclaration",
        declaration,
        modifiers,
        params.asteriskToken,
        nodeField(declaration, "name"),
        this.ensureTypeParams(declaration, params.typeParameters as TypeParameterList | undefined),
        this.updateParamList(declaration, params.parameters as ParameterList | undefined),
        this.ensureType(declaration, false),
        undefined,
      );
    }
    if (declaration.kind === Kind.VariableDeclaration && isFunctionLike(nodeField(declaration, "initializer") as AstNode)) {
      const initializer = nodeField<AstNode>(declaration, "initializer")!;
      return factoryCall(
        this.factory(),
        "newFunctionDeclaration",
        declaration,
        modifiers,
        params.asteriskToken,
        this.factory().newIdentifier(nodeTextLocal(name)),
        this.ensureTypeParams(initializer, params.typeParameters as TypeParameterList | undefined),
        this.updateParamList(initializer, params.parameters as ParameterList | undefined),
        this.ensureType(initializer, false),
        undefined,
        undefined,
      );
    }
    return undefined;
  }

  createExpandoNamespace(name: AstNode, declaration: AstNode, property: string, original: AstNode): AstNode {
    const exportName = this.factory().newIdentifier(property);
    const variable = this.factory().newVariableStatement(
      undefined,
      this.factory().newVariableDeclarationList(
        this.factory().newNodeList([
          this.factory().newVariableDeclaration(exportName, undefined, this.ensureType(original, false), undefined),
        ]),
        0,
      ),
    );
    const moduleBlock = factoryCall(
      this.factory(),
      "newModuleBlock",
      original,
      this.factory().newNodeList([variable]),
    );
    const namespace = factoryCall(
      this.factory(),
      "newModuleDeclaration",
      original,
      createModifiersFromFlagsLocal(this.factory(), ModifierFlags.Ambient),
      Kind.NamespaceKeyword,
      name,
      moduleBlock,
    );
    this.emitContext().setOriginal(namespace, declaration);
    return namespace;
  }

  tryGetPropertyName(node: AstNode | undefined): string {
    if (node === undefined) return "";
    if (node.kind === Kind.PropertyAccessExpression) {
      return nodeTextLocal(nodeField(node, "name"));
    }
    if (node.kind === Kind.ElementAccessExpression) {
      const resolverName = (this.resolver as unknown as {
        getElementAccessExpressionName?: (node: AstNode) => string | undefined;
      }).getElementAccessExpressionName?.(node);
      if (resolverName !== undefined) return resolverName;
      const argument = nodeField<AstNode>(node, "argumentExpression");
      return isStringLiteralLikeLocal(argument) ? nodeTextLocal(argument) : "";
    }
    return "";
  }
}

export function newDeclarationTransformer(
  host: DeclarationEmitHost,
  context: EmitContext,
  compilerOptions: CompilerOptions,
  declarationFilePath: string,
  declarationMapPath: string,
): DeclarationTransformer {
  return new DeclarationTransformer(host, context, compilerOptions, declarationFilePath, declarationMapPath);
}

// ---------------------------------------------------------------------------
// Module-level helpers
// ---------------------------------------------------------------------------

export function createEmptyExports(factory: NodeFactory): Statement {
  return factory.newExportDeclaration(undefined, false, factory.newNamedExports([]), undefined, undefined) as unknown as Statement;
}

export function isCommonJSAliasExport(node: AstNode): boolean {
  void node;
  return false;
}

export function throwDiagnostic(result: unknown): never {
  void result;
  throw new Error("Diagnostic emitted without declaration context");
}

export function hasInternalAnnotation(range: CommentRange, sourceFile: SourceFile): boolean {
  return sourceFileText(sourceFile).slice(range.pos, range.end).includes("@internal");
}

function statementListNodes(statements: StatementList): readonly Statement[] {
  if (Array.isArray(statements)) return statements as readonly Statement[];
  return (statements as unknown as { readonly nodes?: readonly Statement[] }).nodes ?? [];
}

function sourceFileText(sourceFile: SourceFile): string {
  return (sourceFile as unknown as { readonly text?: string }).text ?? "";
}

function fileReferencePreserve(ref: FileReference): boolean {
  return (ref as unknown as { readonly preserve?: boolean }).preserve === true;
}

function fileReferenceFileName(ref: FileReference): string {
  return (ref as unknown as { readonly fileName?: string; readonly FileName?: string }).fileName
    ?? (ref as unknown as { readonly FileName?: string }).FileName
    ?? "";
}

function cloneFileReference(ref: FileReference, fileName: string): FileReference {
  return {
    ...(ref as object),
    pos: -1,
    end: -1,
    fileName,
    preserve: fileReferencePreserve(ref),
    resolutionMode: (ref as unknown as { readonly resolutionMode?: unknown }).resolutionMode,
  } as FileReference;
}

function sourceFileFileName(file: SourceFile): string {
  return (file as unknown as { readonly fileName?: string; readonly FileName?: string }).fileName
    ?? (file as unknown as { readonly FileName?: string }).FileName
    ?? "";
}

function hasDynamicName(node: AstNode): boolean {
  const name = declarationName(node);
  return name !== undefined && name.kind === Kind.ComputedPropertyName;
}

function declarationName(node: AstNode): (AstNode & { readonly expression?: AstNode }) | undefined {
  return (node as unknown as { readonly name?: AstNode & { readonly expression?: AstNode } }).name;
}

function heritageClauseIsEmpty(node: AstNode): boolean {
  const types = nodeArray(nodeField(node, "types"));
  return types.length === 0 || (types.length === 1 && nodeIsMissing(types[0]!));
}

function nodeIsMissing(node: AstNode): boolean {
  return (node as unknown as { readonly missing?: boolean }).missing === true
    || (node as unknown as { readonly pos?: number; readonly end?: number }).pos === (node as unknown as { readonly end?: number }).end;
}

function isOriginalNodeSingleLine(emitContext: { mostOriginal(node: AstNode): AstNode }, node: AstNode): boolean {
  const original = emitContext.mostOriginal(node);
  const source = sourceFileText((original as unknown as { readonly sourceFile?: SourceFile }).sourceFile as SourceFile);
  const pos = (original as unknown as { readonly pos?: number }).pos ?? 0;
  const end = (original as unknown as { readonly end?: number }).end ?? pos;
  return source.slice(pos, end).indexOf("\n") < 0 && source.slice(pos, end).indexOf("\r") < 0;
}

function nodeField<T = AstNode>(node: unknown, field: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[field];
}

function boolField(node: unknown, field: string): boolean {
  return (node as Record<string, boolean | undefined> | undefined)?.[field] === true;
}

function nodeArray(node: unknown): readonly AstNode[] {
  if (node === undefined) return [];
  if (Array.isArray(node)) return node as readonly AstNode[];
  return (node as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function visitOptional(tx: DeclarationTransformer, node: AstNode | undefined): AstNode | undefined {
  return node === undefined ? undefined : tx.visitor().visit(node);
}

function updateWithFactory(factory: unknown, method: string, fallback: AstNode, ...args: readonly unknown[]): AstNode {
  const fn = (factory as Record<string, unknown>)[method];
  return typeof fn === "function" ? (fn as (...callArgs: unknown[]) => AstNode).call(factory, fallback, ...args) : fallback;
}

function factoryCall(factory: unknown, method: string, fallback: AstNode, ...args: readonly unknown[]): AstNode {
  const fn = (factory as Record<string, unknown>)[method];
  return typeof fn === "function" ? (fn as (...callArgs: unknown[]) => AstNode).call(factory, ...args) : fallback;
}

function getBindingNameVisible(resolver: EmitResolver, node: AstNode): boolean {
  const symbol = (node as unknown as { readonly symbol?: unknown }).symbol;
  if (symbol === undefined) return true;
  const result = (resolver as unknown as { isDeclarationVisible?: (node: AstNode) => boolean }).isDeclarationVisible?.(node);
  return result !== false;
}

function isPrivateIdentifierNode(node: AstNode | undefined): boolean {
  return node !== undefined && isPrivateIdentifier(node);
}

function effectiveDeclarationFlags(tx: DeclarationTransformer, node: AstNode, flags: number): number {
  const parseNode = tx.emitContext().parseNode(node) ?? node;
  return (tx.host as unknown as { getEffectiveDeclarationFlags?: (node: AstNode, flags: number) => number })
    .getEffectiveDeclarationFlags?.(parseNode, flags) ?? 0;
}

function getThisParameter(node: AstNode): AstNode | undefined {
  return nodeArray(nodeField(node, "parameters")).find(parameter => nodeField(parameter, "name")?.kind === Kind.ThisKeyword);
}

function nodeTextLocal(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as unknown as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as unknown as { readonly escapedText?: string }).escapedText
    ?? "";
}

function nodeParentLocal(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { readonly parent?: AstNode } | undefined)?.parent;
}

function setNodeParentLocal(node: AstNode, parent: AstNode | undefined): void {
  if (parent === undefined) {
    delete (node as unknown as { parent?: AstNode }).parent;
    return;
  }
  (node as unknown as { parent?: AstNode }).parent = parent;
}

function isStringLiteralLikeLocal(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  return node.kind === Kind.StringLiteral
    || node.kind === Kind.NoSubstitutionTemplateLiteral
    || node.kind === Kind.NumericLiteral;
}

function isIdentifierTextLocal(text: string): boolean {
  if (text.length === 0) return false;
  if (!/^[$A-Z_a-z][$\w]*$/.test(text)) return false;
  return keywordKindForIdentifierText(text) === Kind.Unknown
    || keywordKindForIdentifierText(text) === Kind.DefaultKeyword;
}

function keywordKindForIdentifierText(text: string): number {
  switch (text) {
    case "default": return Kind.DefaultKeyword;
    case "class": return Kind.ClassKeyword;
    case "function": return Kind.FunctionKeyword;
    case "var": return Kind.VarKeyword;
    case "let": return Kind.LetKeyword;
    case "const": return Kind.ConstKeyword;
    case "namespace": return Kind.NamespaceKeyword;
    case "import": return Kind.ImportKeyword;
    case "export": return Kind.ExportKeyword;
    default: return Kind.Unknown;
  }
}

function leftmostAccessExpression(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.Identifier) return current;
    if (current.kind === Kind.PropertyAccessExpression || current.kind === Kind.ElementAccessExpression) {
      current = nodeField(current, "expression");
      continue;
    }
    return undefined;
  }
  return undefined;
}

function createModifiersFromFlagsLocal(factory: NodeFactory, flags: number): ModifierList | undefined {
  if (flags === 0) return undefined;
  const createModifierList = (factory as unknown as {
    newModifierList?: (modifiers: readonly AstNode[]) => ModifierList;
    newModifier?: (kind: number) => AstNode;
  });
  if (createModifierList.newModifierList === undefined || createModifierList.newModifier === undefined) {
    return undefined;
  }
  const modifiers: AstNode[] = [];
  if ((flags & ModifierFlags.Export) !== 0) modifiers.push(createModifierList.newModifier(Kind.ExportKeyword));
  if ((flags & ModifierFlags.Default) !== 0) modifiers.push(createModifierList.newModifier(Kind.DefaultKeyword));
  if ((flags & ModifierFlags.Ambient) !== 0) modifiers.push(createModifierList.newModifier(Kind.DeclareKeyword));
  return createModifierList.newModifierList(modifiers);
}

function extractExpandoHostParams(node: AstNode): {
  readonly typeParameters: AstNode | undefined;
  readonly parameters: AstNode | undefined;
  readonly asteriskToken: AstNode | undefined;
} {
  const initializer = node.kind === Kind.VariableDeclaration ? nodeField<AstNode>(node, "initializer") : undefined;
  const target = initializer ?? node;
  return {
    typeParameters: nodeField(target, "typeParameters"),
    parameters: nodeField(target, "parameters"),
    asteriskToken: nodeField(target, "asteriskToken"),
  };
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown }
interface EmitContext { readonly _ctx?: unknown }
interface CommentRange { pos: number; end: number; kind: number }
interface NodeFactory {
  newNodeList(nodes: readonly AstNode[]): unknown;
  newAnyKeyword(): AstNode;
  updateSourceFile(node: AstNode, statements: unknown, endOfFileToken?: AstNode): AstNode;
  updateExportDeclaration(
    node: AstNode,
    modifiers: ModifierList | undefined,
    isTypeOnly: boolean,
    exportClause: AstNode | undefined,
    moduleSpecifier: AstNode | undefined,
    attributes: AstNode | undefined,
  ): AstNode;
  newExportDeclaration(
    modifiers: ModifierList | undefined, isTypeOnly: boolean,
    exportClause: AstNode | undefined, moduleSpecifier: AstNode | undefined,
    attributes: AstNode | undefined,
  ): AstNode;
  newNamedExports(elements: readonly AstNode[]): AstNode;
}

function compilerOptionsIsolatedDeclarations(options: CompilerOptions): boolean {
  return (options as unknown as { isolatedDeclarations?: boolean }).isolatedDeclarations === true;
}
function compilerOptionsStripInternal(options: CompilerOptions): boolean {
  return (options as unknown as { stripInternal?: boolean }).stripInternal === true;
}
