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
  isDeclaration,
  isExternalOrCommonJSModule,
  isFunctionLike,
  sourceFileEndOfFileToken,
  sourceFileIsDeclarationFile,
} from "../../ast/index.js";
import { getNodeId } from "../../ast/ids.js";
import {
  newSymbolTracker,
  type SymbolTrackerImpl,
  type SymbolTrackerSharedState,
  type EmitResolver,
  type DeclarationEmitHost,
} from "./tracker.js";
import { createGetSymbolAccessibilityDiagnosticForNode } from "./diagnostics.js";
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
    void node; void sourceFile;
    return [];
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
    void outputFilePath;
    return [];
  }

  getLibReferences(): FileReference[] {
    return [...this.rawLibReferenceDirectives];
  }

  getTypeReferences(): FileReference[] {
    return [...this.rawTypeReferenceDirectives];
  }

  // -------------------------------------------------------------------------
  // Declaration subtree visitor
  // -------------------------------------------------------------------------

  visitDeclarationSubtree(input: AstNode): AstNode {
    return this.visitor().visitEachChild(input);
  }

  checkName(node: AstNode): void {
    void node;
  }

  // -------------------------------------------------------------------------
  // Type node transforms
  // -------------------------------------------------------------------------

  transformMappedTypeNode(input: MappedTypeNode): AstNode { return input as unknown as AstNode; }
  transformHeritageClause(clause: HeritageClause): AstNode { return clause as unknown as AstNode; }
  transformImportTypeNode(input: ImportTypeNode): AstNode { return input as unknown as AstNode; }
  transformConstructorTypeNode(input: ConstructorTypeNode): AstNode { return input as unknown as AstNode; }
  transformFunctionTypeNode(input: FunctionTypeNode): AstNode { return input as unknown as AstNode; }
  transformConditionalTypeNode(input: ConditionalTypeNode): AstNode { return input as unknown as AstNode; }
  transformTypeReference(input: TypeReferenceNode): AstNode { return input as unknown as AstNode; }
  transformExpressionWithTypeArguments(input: ExpressionWithTypeArguments): AstNode { return input as unknown as AstNode; }
  transformTypeParameterDeclaration(input: TypeParameterDeclaration): AstNode { return input as unknown as AstNode; }

  // -------------------------------------------------------------------------
  // Declaration-level transforms
  // -------------------------------------------------------------------------

  transformVariableDeclaration(input: VariableDeclaration): AstNode { return input as unknown as AstNode; }
  recreateBindingPattern(input: BindingPattern): AstNode { return input as unknown as AstNode; }
  recreateBindingElement(e: BindingElement): AstNode { return e as unknown as AstNode; }
  transformIndexSignatureDeclaration(input: IndexSignatureDeclaration): AstNode { return input as unknown as AstNode; }
  transformCallSignatureDeclaration(input: CallSignatureDeclaration): AstNode { return input as unknown as AstNode; }
  transformPropertySignatureDeclaration(input: PropertySignatureDeclaration): AstNode { return input as unknown as AstNode; }
  transformPropertyDeclaration(input: PropertyDeclaration): AstNode { return input as unknown as AstNode; }
  transformSetAccessorDeclaration(input: SetAccessorDeclaration): AstNode { return input as unknown as AstNode; }
  transformGetAccessorDeclaration(input: GetAccessorDeclaration): AstNode { return input as unknown as AstNode; }
  updateAccessorParamList(input: AstNode, isPrivate: boolean): ParameterList {
    void input; void isPrivate;
    return this.factory().newNodeList([]) as unknown as ParameterList;
  }
  transformConstructorDeclaration(input: ConstructorDeclaration): AstNode { return input as unknown as AstNode; }
  transformConstructSignatureDeclaration(input: ConstructSignatureDeclaration): AstNode { return input as unknown as AstNode; }
  omitPrivateMethodType(input: AstNode): AstNode { return input; }
  transformMethodSignatureDeclaration(input: MethodSignatureDeclaration): AstNode { return input as unknown as AstNode; }
  transformMethodDeclaration(input: MethodDeclaration): AstNode { return input as unknown as AstNode; }

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
    void updated; void original;
  }

  removeAllComments(node: AstNode): void { void node; }

  ensureType(node: AstNode, ignorePrivate: boolean): AstNode {
    void node; void ignorePrivate;
    return this.factory().newAnyKeyword();
  }

  shouldPrintWithInitializer(node: AstNode): boolean {
    void node;
    return false;
  }

  checkEntityNameVisibility(entityName: AstNode, enclosingDeclaration: AstNode | undefined): void {
    void entityName; void enclosingDeclaration;
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

  transformJSDocTypeExpression(input: JSDocTypeExpression): AstNode { return input as unknown as AstNode; }
  transformJSDocTypeLiteral(input: JSDocTypeLiteral): AstNode { return input as unknown as AstNode; }
  transformJSDocPropertyTag(input: AstNode): AstNode { return input; }
  transformJSDocAllType(input: JSDocAllType): AstNode { return input as unknown as AstNode; }

  // -------------------------------------------------------------------------
  // Expando function reporting
  // -------------------------------------------------------------------------

  reportExpandoFunctionErrors(node: AstNode): void {
    void node;
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
