/**
 * ES decorators (TC39 stage 3) downlevel transformer.
 *
 * Port skeleton of TS-Go `internal/transformers/estransforms/esdecorator.go`
 * (~2745 LoC). Lowers TC39 stage-3 decorators on classes, methods,
 * fields, accessors, and auto-accessors into runtime helper calls
 * (`__esDecorate`, `__runInitializers`). The Strada source covers
 * dozens of helper shapes (context object construction, kind/access
 * shape per decorated entity, addInitializer queueing) and emits a
 * substantial amount of bootstrap code per class.
 *
 * Skeleton scope: public constructor + factory mirror, visit dispatch
 * with all major kinds, per-kind visitors stubbed to
 * `visitor.visitEachChild`. Full coverage is deferred per project
 * policy and will be filled in as baseline tests demand.
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import type { Node as AstNode, IdentifierNode, ClassDeclaration, ClassExpression, PropertyDeclaration, MethodDeclaration, GetAccessorDeclaration, SetAccessorDeclaration, ConstructorDeclaration } from "../../ast/index.js";

// ---------------------------------------------------------------------------
// ESDecoratorKind (TC39 context.kind values)
// ---------------------------------------------------------------------------

export type ESDecoratorKind = "class" | "method" | "getter" | "setter" | "field" | "accessor";

export interface DecoratorContext {
  kind: ESDecoratorKind;
  name: string;
  isStatic: boolean;
  isPrivate: boolean;
  metadata: Record<string, unknown>;
}

export class ESDecoratorTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;

  currentClassThis: IdentifierNode | undefined;
  currentClassConstructor: IdentifierNode | undefined;
  classInfoStack: ClassInfo[] = [];

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  visit(node: AstNode): AstNode {
    switch (node.kind) {
      case Kind.ClassDeclaration: return this.visitClassDeclaration(node as unknown as ClassDeclaration);
      case Kind.ClassExpression: return this.visitClassExpression(node as unknown as ClassExpression);
      case Kind.PropertyDeclaration: return this.visitPropertyDeclaration(node as unknown as PropertyDeclaration);
      case Kind.MethodDeclaration: return this.visitMethodDeclaration(node as unknown as MethodDeclaration);
      case Kind.GetAccessor: return this.visitGetAccessorDeclaration(node as unknown as GetAccessorDeclaration);
      case Kind.SetAccessor: return this.visitSetAccessorDeclaration(node as unknown as SetAccessorDeclaration);
      case Kind.Constructor: return this.visitConstructorDeclaration(node as unknown as ConstructorDeclaration);
      default:
        return this.visitor().visitEachChild(node);
    }
  }

  // Skeleton visitors — preserve subtrees verbatim. Full lowering will
  // route decorated members through __esDecorate / __runInitializers
  // helper invocations as Strada does.
  visitClassDeclaration(node: ClassDeclaration): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
  visitClassExpression(node: ClassExpression): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
  visitPropertyDeclaration(node: PropertyDeclaration): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
  visitMethodDeclaration(node: MethodDeclaration): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
  visitGetAccessorDeclaration(node: GetAccessorDeclaration): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
  visitSetAccessorDeclaration(node: SetAccessorDeclaration): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
  visitConstructorDeclaration(node: ConstructorDeclaration): AstNode { return this.visitor().visitEachChild(node as unknown as AstNode); }
}

export function newESDecoratorTransformer(opts: TransformOptions): Transformer {
  return new ESDecoratorTransformer(opts);
}

interface ClassInfo {
  className: IdentifierNode | undefined;
  classConstructor: IdentifierNode | undefined;
  classDecorators: AstNode[];
  memberDecorators: AstNode[];
  hasInstanceFields: boolean;
  hasStaticInitializers: boolean;
}

interface CompilerOptions { readonly _opts: unknown }

declare const Kind: {
  ClassDeclaration: number; ClassExpression: number;
  PropertyDeclaration: number; MethodDeclaration: number;
  GetAccessor: number; SetAccessor: number; Constructor: number;
};
