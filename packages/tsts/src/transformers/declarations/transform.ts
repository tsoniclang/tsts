/**
 * Declaration (.d.ts) emit transformer.
 *
 * Port skeleton of TS-Go `internal/transformers/declarations/transform.go`
 * (~2212 LoC). This module is the primary engine that rewrites a
 * source file into a `.d.ts` form by stripping function bodies and
 * private members, computing inferred types via the EmitResolver, and
 * collecting reference directives.
 *
 * The skeleton exposes the public API (constructor, GetDiagnostics,
 * transformSourceFile) with the per-kind visitors stubbed to
 * `visitor.visitEachChild`. Full coverage of every Strada visitor
 * branch is deferred — tests against the upstream baseline corpus
 * will drive incremental fill-in.
 *
 * Cross-module deps forward-declared at the file end.
 */

import { Transformer } from "../transformer.js";
import { newSymbolTracker, type SymbolTrackerImpl, type SymbolTrackerSharedState, type EmitResolver, type DeclarationEmitHost } from "./tracker.js";
import type { Node as AstNode, SourceFile, Diagnostic, FileReference } from "../../ast/index.js";

export interface ReferencedFilePair {
  file: SourceFile;
  ref: FileReference;
}

export interface OutputPaths {
  declarationFilePath(): string;
  jsFilePath(): string;
}

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
  lateStatementReplacementMap = new Map<number, AstNode>();
  expandoHosts = new Set<number>();
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
    this.initTransformer((node) => this.visit(node) as AstNode, context);
  }

  getDiagnostics(): readonly Diagnostic[] {
    return this.state.diagnostics;
  }

  visit(node: AstNode): AstNode | undefined {
    // Top-level dispatch — full Strada coverage requires per-kind visitors
    // (visitSourceFile, visitDeclaration*, visitImport*, visitExport*,
    // visitDestructuringTypeAnnotation, etc.). Until each is filled in,
    // delegate to visitEachChild so structurally-similar trees pass
    // through unchanged.
    return this.visitor().visitEachChild(node);
  }

  reportExpandoFunctionErrors(node: AstNode): void {
    // Stub — full version walks resolver-returned expando properties.
    void node;
  }

  shouldStripInternal(node: AstNode | undefined): boolean {
    return this.state.stripInternal && node !== undefined && this.isInternalDeclaration(node, this.state.currentSourceFile);
  }

  isInternalDeclaration(_node: AstNode, _sourceFile: SourceFile): boolean {
    // Full version inspects @internal JSDoc trivia.
    return false;
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
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts: unknown }
interface EmitContext { readonly _ctx: unknown }

declare function compilerOptionsIsolatedDeclarations(options: CompilerOptions): boolean;
declare function compilerOptionsStripInternal(options: CompilerOptions): boolean;
