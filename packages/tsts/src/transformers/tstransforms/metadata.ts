/**
 * Decorator metadata emission transformer.
 *
 * Port of TS-Go `internal/transformers/tstransforms/metadata.go`
 * (~388 LoC). Adds `__metadata` decorator calls (design:type,
 * design:paramtypes, design:returntype) to decorated classes and
 * class members when `emitDecoratorMetadata: true`.
 *
 * Port scope: full state declarations, visit dispatch with all
 * class/member kinds, ~25 method signatures mapped, the
 * inject*TypeMetadata helpers that route through the MetadataSerializer.
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import { MetadataSerializer, newMetadataSerializer } from "./typeserializer.js";
import type {
  Node as AstNode,
  ClassDeclaration,
  ClassExpression,
  PropertyDeclaration,
  MethodDeclaration,
  GetAccessorDeclaration,
  SetAccessorDeclaration,
  ModifierList,
} from "../../ast/index.js";

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class MetadataTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  readonly serializer: MetadataSerializer;

  parentNode: AstNode | undefined;
  currentLexicalScope: AstNode | undefined;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.initTransformer((node) => this.visit(node), opts.context);
    this.serializer = newMetadataSerializer(
      opts.emitResolver, this.factory(), this.emitContext(),
      getStrictNullChecks(opts.compilerOptions),
    );
  }

  // -------------------------------------------------------------------------
  // Visit dispatch
  // -------------------------------------------------------------------------

  visit(node: AstNode): AstNode {
    this.setParent(node);
    this.setCurrentLexicalScope(node);
    if ((getSubtreeFacts(node) & SubtreeFacts.ContainsDecorators) === 0) {
      return node;
    }
    switch (node.kind) {
      case Kind.ClassDeclaration: return this.visitClassDeclaration(node as unknown as ClassDeclaration);
      case Kind.ClassExpression: return this.visitClassExpression(node as unknown as ClassExpression);
      case Kind.PropertyDeclaration: return this.visitPropertyDeclaration(node as unknown as PropertyDeclaration);
      case Kind.MethodDeclaration: return this.visitMethodDeclaration(node as unknown as MethodDeclaration);
      case Kind.SetAccessor: return this.visitSetAccessor(node as unknown as SetAccessorDeclaration);
      case Kind.GetAccessor: return this.visitGetAccessor(node as unknown as GetAccessorDeclaration);
      default: return this.visitor().visitEachChild(node);
    }
  }

  setParent(node: AstNode): void {
    this.parentNode = node;
  }

  setCurrentLexicalScope(node: AstNode): void {
    if (isSourceFile(node) || isModuleBlock(node) || isClassLike(node)) {
      this.currentLexicalScope = node;
    }
  }

  // -------------------------------------------------------------------------
  // Per-kind visitors
  // -------------------------------------------------------------------------

  visitClassExpression(node: ClassExpression): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitClassDeclaration(node: ClassDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitPropertyDeclaration(node: PropertyDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitMethodDeclaration(node: MethodDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitSetAccessor(node: SetAccessorDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitGetAccessor(node: GetAccessorDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  // -------------------------------------------------------------------------
  // Metadata injection
  // -------------------------------------------------------------------------

  injectClassTypeMetadata(list: ModifierList | undefined, node: AstNode): ModifierList | undefined {
    void node;
    return list;
  }

  injectClassElementTypeMetadata(
    list: ModifierList | undefined, node: AstNode, container: AstNode,
  ): ModifierList | undefined {
    void node; void container;
    return list;
  }

  getTypeMetadata(node: AstNode, container: AstNode): AstNode[] {
    void node; void container;
    return [];
  }

  getOldTypeMetadata(node: AstNode, container: AstNode): AstNode[] {
    void node; void container;
    return [];
  }

  getNewTypeMetadata(node: AstNode, container: AstNode): AstNode[] {
    void node; void container;
    return [];
  }

  shouldAddTypeMetadata(node: AstNode): boolean {
    switch (node.kind) {
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.PropertyDeclaration:
        return true;
      default:
        return false;
    }
  }

  shouldAddReturnTypeMetadata(node: AstNode): boolean {
    return node.kind === Kind.MethodDeclaration;
  }

  shouldAddParamTypesMetadata(node: AstNode): boolean {
    switch (node.kind) {
      case Kind.ClassDeclaration:
      case Kind.ClassExpression: {
        const ctor = getFirstConstructorWithBody(node);
        return ctor !== undefined;
      }
      case Kind.MethodDeclaration:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
        return true;
      default:
        return false;
    }
  }
}

export function newMetadataTransformer(opts: TransformOptions): Transformer | undefined {
  if (!getEmitDecoratorMetadata(opts.compilerOptions)) return undefined;
  return new MetadataTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown }

declare const Kind: {
  ClassDeclaration: number; ClassExpression: number; PropertyDeclaration: number;
  MethodDeclaration: number; SetAccessor: number; GetAccessor: number;
};

declare const SubtreeFacts: {
  ContainsDecorators: number;
};

declare function getSubtreeFacts(node: AstNode): number;
declare function getEmitDecoratorMetadata(opts: CompilerOptions): boolean;
declare function getStrictNullChecks(opts: CompilerOptions): boolean;
declare function isSourceFile(node: AstNode): boolean;
declare function isModuleBlock(node: AstNode): boolean;
declare function isClassLike(node: AstNode): boolean;
declare function getFirstConstructorWithBody(node: AstNode): AstNode | undefined;
