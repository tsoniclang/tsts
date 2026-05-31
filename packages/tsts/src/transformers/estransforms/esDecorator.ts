/**
 * ES decorators (TC39 stage 3) downlevel transformer.
 *
 * Substantive port of TS-Go `internal/transformers/estransforms/esdecorator.go`
 * (~2745 LoC). Lowers TC39 stage-3 decorators on classes, methods,
 * fields, accessors, and auto-accessors into runtime helper calls
 * (`__esDecorate`, `__runInitializers`).
 *
 * Port scope: full state declarations, 11 sub-visitors, lexical entry
 * stack with all 4 entry kinds, visit dispatch with all ~30 switch cases,
 * every ~60 method signature mapped to a TS method with at minimum
 * `visitor.visitEachChild` fallback bodies. The deep emit-bodies of
 * `transformClassLike`, `partialTransformClassElement`,
 * `createMethodDescriptorObject`, `createMetadata`, etc. are stubbed;
 * baseline tests will drive incremental fill-in.
 *
 * Cross-module deps forward-declared at file end.
 */

import { Transformer, type TransformOptions, type NodeVisitor } from "../transformer.js";
import {
  Kind, isTrue, getSubtreeFacts, hasStaticModifier,
  getNodeName, nodeText, isIdentifier, isPrivateIdentifier, isStringLiteral,
  isMethodDeclaration, isGetAccessorDeclaration, isSetAccessorDeclaration,
  isAutoAccessorPropertyDeclaration, isClassLikeDeclaration,
} from "../../ast/index.js";
import { isClassStaticBlockDeclaration, isPropertyDeclaration } from "../../ast/index.js";
import { getEmitScriptTarget, getUseDefineForClassFields } from "../../core/compilerOptions.js";

const ScriptTarget = { ESNext: 99 } as const;
const SubtreeFacts = {
  ContainsLexicalThis: 1 << 0,
  ContainsLexicalSuper: 1 << 1,
  ContainsDecorators: 1 << 4,
} as const;
const EmitFlags = {
  TransformPrivateStaticElements: 1 << 24,
} as const;
import type {
  Node as AstNode,
  IdentifierNode,
  ClassDeclaration,
  ClassExpression,
  PropertyDeclaration,
  MethodDeclaration,
  GetAccessorDeclaration,
  SetAccessorDeclaration,
  ConstructorDeclaration,
  ParameterDeclaration,
  SourceFile as SourceFileNode,
  ModifierList,
  Expression,
  Statement,
} from "../../ast/index.js";

// ---------------------------------------------------------------------------
// LexicalEntryKind (constant-union)
// ---------------------------------------------------------------------------

export type LexicalEntryKind = 0 | 1 | 2 | 3;
export const LexicalEntryKind = {
  Class: 0 as LexicalEntryKind,
  ClassElement: 1 as LexicalEntryKind,
  Name: 2 as LexicalEntryKind,
  Other: 3 as LexicalEntryKind,
} as const;

// ---------------------------------------------------------------------------
// Lexical entry + class/member info data structures
// ---------------------------------------------------------------------------

export interface LexicalEntry {
  kind: LexicalEntryKind;
  next: LexicalEntry | undefined;
  classInfoData: ClassInfo | undefined;
  savedPendingExpressions: Expression[];
  classThisData: IdentifierNode | undefined;
  classSuperData: IdentifierNode | undefined;
  depth: number;
}

export interface MemberInfo {
  memberDecoratorsName: IdentifierNode | undefined;
  memberInitializersName: IdentifierNode | undefined;
  memberExtraInitializersName: IdentifierNode | undefined;
  memberDescriptorName: IdentifierNode | undefined;
}

export interface ClassInfo {
  class: AstNode;
  classDecoratorsName: IdentifierNode | undefined;
  classDescriptorName: IdentifierNode | undefined;
  classExtraInitializersName: IdentifierNode | undefined;
  classThis: IdentifierNode | undefined;
  classSuper: IdentifierNode | undefined;
  metadataReference: IdentifierNode | undefined;
  memberInfos: Map<AstNode, MemberInfo>;
  instanceMethodExtraInitializersName: IdentifierNode | undefined;
  staticMethodExtraInitializersName: IdentifierNode | undefined;
  staticNonFieldDecorationStatements: Statement[];
  nonStaticNonFieldDecorationStatements: Statement[];
  staticFieldDecorationStatements: Statement[];
  nonStaticFieldDecorationStatements: Statement[];
  hasStaticInitializers: boolean;
  hasNonAmbientInstanceFields: boolean;
  hasStaticPrivateClassElements: boolean;
  pendingStaticInitializers: Expression[];
  pendingInstanceInitializers: Expression[];
}

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

export interface DecoratedMemberFacts {
  readonly member: AstNode;
  readonly decorators: readonly AstNode[];
  readonly contextKind: ESDecoratorKind;
  readonly isStatic: boolean;
  readonly isPrivate: boolean;
  readonly hasComputedName: boolean;
  readonly needsDescriptor: boolean;
  readonly needsInitializers: boolean;
  readonly needsExtraInitializers: boolean;
}

export interface DecoratedClassFacts {
  readonly classDecorators: readonly AstNode[];
  readonly memberFacts: readonly DecoratedMemberFacts[];
  readonly hasStaticPrivateClassElements: boolean;
  readonly hasStaticInitializers: boolean;
  readonly hasNonAmbientInstanceFields: boolean;
  readonly needsClassThis: boolean;
  readonly needsClassSuper: boolean;
  readonly needsMetadata: boolean;
}

export interface DecoratorStatementBuckets {
  readonly staticNonField: readonly Statement[];
  readonly nonStaticNonField: readonly Statement[];
  readonly staticField: readonly Statement[];
  readonly nonStaticField: readonly Statement[];
}

export interface DecoratorEvaluationPlan {
  readonly classInfo: ClassInfo;
  readonly facts: DecoratedClassFacts;
  readonly leadingStatements: readonly Statement[];
  readonly memberStatements: DecoratorStatementBuckets;
  readonly trailingStatements: readonly Statement[];
}

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class ESDecoratorTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;

  // State stack
  top: LexicalEntry | undefined;
  classInfoStack: ClassInfo | undefined;
  classThis: IdentifierNode | undefined;
  classSuper: IdentifierNode | undefined;
  pendingExpressions: Expression[] = [];
  outerThis: IdentifierNode | undefined;
  shouldTransformPrivateStaticElementsInFile = false;

  // Sub-visitors (initialized in constructor)
  outerThisVisitor!: NodeVisitor;
  discardedVisitor!: NodeVisitor;
  modifierVisitor!: NodeVisitor;
  exportStrippingModifierVisitor!: NodeVisitor;
  classElementVisitor!: NodeVisitor;
  nonConstructorClassElementVisitor!: NodeVisitor;
  constructorClassElementVisitor!: NodeVisitor;
  arrayAssignmentVisitor!: NodeVisitor;
  objectAssignmentVisitor!: NodeVisitor;
  staticOnlyModifierVisitor!: NodeVisitor;
  asyncOnlyModifierVisitor!: NodeVisitor;
  accessorStrippingModifierVisitor!: NodeVisitor;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    this.initTransformer((node) => this.visit(node), opts.context);
    const ec = this.emitContext();
    this.outerThisVisitor = ec.newNodeVisitor((n) => this.outerThisVisit(n));
    this.discardedVisitor = ec.newNodeVisitor((n) => this.discardedValueVisit(n));
    this.modifierVisitor = ec.newNodeVisitor((n) => this.modifierVisitorVisit(n) ?? n);
    this.exportStrippingModifierVisitor = ec.newNodeVisitor((n) => this.exportStrippingModifierVisit(n) ?? n);
    this.classElementVisitor = ec.newNodeVisitor((n) => this.classElementVisitorVisit(n));
    this.nonConstructorClassElementVisitor = ec.newNodeVisitor((n) => this.nonConstructorClassElementVisit(n));
    this.constructorClassElementVisitor = ec.newNodeVisitor((n) => this.constructorClassElementVisit(n));
    this.arrayAssignmentVisitor = ec.newNodeVisitor((n) => this.visitArrayAssignmentElement(n));
    this.objectAssignmentVisitor = ec.newNodeVisitor((n) => this.visitObjectAssignmentElement(n));
    this.staticOnlyModifierVisitor = ec.newNodeVisitor((n) => n.kind === Kind.StaticKeyword ? n : n);
    this.asyncOnlyModifierVisitor = ec.newNodeVisitor((n) => n.kind === Kind.AsyncKeyword ? n : n);
    this.accessorStrippingModifierVisitor = ec.newNodeVisitor((n) => n.kind === Kind.AccessorKeyword ? n : n);
  }

  // -------------------------------------------------------------------------
  // Lexical entry stack
  // -------------------------------------------------------------------------

  updateState(): void {
    this.classInfoStack = undefined;
    this.classThis = undefined;
    this.classSuper = undefined;
    if (this.top === undefined) return;
    switch (this.top.kind) {
      case LexicalEntryKind.Class:
        this.classInfoStack = this.top.classInfoData;
        break;
      case LexicalEntryKind.ClassElement: {
        const next = this.top.next;
        if (next !== undefined) this.classInfoStack = next.classInfoData;
        this.classThis = this.top.classThisData;
        this.classSuper = this.top.classSuperData;
        break;
      }
      case LexicalEntryKind.Name: {
        const grandparent = this.top.next?.next?.next;
        if (grandparent !== undefined && grandparent.kind === LexicalEntryKind.ClassElement) {
          this.classInfoStack = grandparent.next?.classInfoData;
          this.classThis = grandparent.classThisData;
          this.classSuper = grandparent.classSuperData;
        }
        break;
      }
    }
  }

  enterClass(ci: ClassInfo): void {
    this.top = {
      kind: LexicalEntryKind.Class,
      next: this.top,
      classInfoData: ci,
      savedPendingExpressions: this.pendingExpressions,
      classThisData: undefined,
      classSuperData: undefined,
      depth: 0,
    };
    this.pendingExpressions = [];
    this.updateState();
  }

  exitClass(): void {
    if (this.top === undefined || this.top.kind !== LexicalEntryKind.Class) {
      throw new Error("Expected top.kind to be 'class'");
    }
    this.pendingExpressions = this.top.savedPendingExpressions;
    this.top = this.top.next;
    this.updateState();
  }

  enterClassElement(node: AstNode): void {
    if (this.top === undefined || this.top.kind !== LexicalEntryKind.Class) {
      throw new Error("Expected top.kind to be 'class'");
    }
    const entry: LexicalEntry = {
      kind: LexicalEntryKind.ClassElement,
      next: this.top,
      classInfoData: undefined,
      savedPendingExpressions: [],
      classThisData: undefined,
      classSuperData: undefined,
      depth: 0,
    };
    if (isClassStaticBlockDeclaration(node)
      || (isPropertyDeclaration(node) && hasStaticModifier(node))) {
      const parentInfo = this.top.classInfoData;
      if (parentInfo !== undefined) {
        entry.classThisData = parentInfo.classThis;
        entry.classSuperData = parentInfo.classSuper;
      }
    }
    this.top = entry;
    this.updateState();
  }

  exitClassElement(): void {
    if (this.top === undefined || this.top.kind !== LexicalEntryKind.ClassElement) {
      throw new Error("Expected top.kind to be 'class-element'");
    }
    if (this.top.next === undefined || this.top.next.kind !== LexicalEntryKind.Class) {
      throw new Error("Expected top.next.kind to be 'class'");
    }
    this.top = this.top.next;
    this.updateState();
  }

  enterName(): void {
    if (this.top === undefined || this.top.kind !== LexicalEntryKind.ClassElement) {
      throw new Error("Expected top.kind to be 'class-element'");
    }
    this.top = {
      kind: LexicalEntryKind.Name,
      next: this.top,
      classInfoData: undefined,
      savedPendingExpressions: [],
      classThisData: undefined,
      classSuperData: undefined,
      depth: 0,
    };
    this.updateState();
  }

  exitName(): void {
    if (this.top === undefined || this.top.kind !== LexicalEntryKind.Name) {
      throw new Error("Expected top.kind to be 'name'");
    }
    this.top = this.top.next;
    this.updateState();
  }

  enterOther(): void {
    if (this.top !== undefined && this.top.kind === LexicalEntryKind.Other) {
      this.top.depth += 1;
    } else {
      this.top = {
        kind: LexicalEntryKind.Other,
        next: this.top,
        classInfoData: undefined,
        savedPendingExpressions: this.pendingExpressions,
        classThisData: undefined,
        classSuperData: undefined,
        depth: 0,
      };
      this.pendingExpressions = [];
      this.updateState();
    }
  }

  exitOther(): void {
    if (this.top === undefined || this.top.kind !== LexicalEntryKind.Other) {
      throw new Error("Expected top.kind to be 'other'");
    }
    if (this.top.depth > 0) {
      this.top.depth -= 1;
    } else {
      this.pendingExpressions = this.top.savedPendingExpressions;
      this.top = this.top.next;
      this.updateState();
    }
  }

  // -------------------------------------------------------------------------
  // Source file + outer-this rewrite
  // -------------------------------------------------------------------------

  visitSourceFile(node: SourceFileNode): AstNode {
    this.top = undefined;
    this.shouldTransformPrivateStaticElementsInFile = false;
    const visited = this.visitor().visitEachChild(node as unknown as AstNode);
    this.emitContext().addEmitHelper(visited, ...this.emitContext().readEmitHelpers());
    if (this.shouldTransformPrivateStaticElementsInFile) {
      this.emitContext().addEmitFlags(visited, EmitFlags.TransformPrivateStaticElements);
      this.shouldTransformPrivateStaticElementsInFile = false;
    }
    return visited;
  }

  outerThisVisit(n: AstNode): AstNode {
    if ((getSubtreeFacts(n) & SubtreeFacts.ContainsLexicalThis) === 0
      && n.kind !== Kind.ThisKeyword) {
      return n;
    }
    if (n.kind === Kind.ThisKeyword) {
      if (this.outerThis === undefined) {
        this.outerThis = this.factory().newUniqueName("_outerThis");
      }
      return this.outerThis as unknown as AstNode;
    }
    return this.outerThisVisitor.visitEachChild(n);
  }

  shouldVisitNode(node: AstNode): boolean {
    const facts = getSubtreeFacts(node);
    if ((facts & SubtreeFacts.ContainsDecorators) !== 0) return true;
    if (this.classThis !== undefined && (facts & SubtreeFacts.ContainsLexicalThis) !== 0) return true;
    if (this.classThis !== undefined && this.classSuper !== undefined
      && (facts & SubtreeFacts.ContainsLexicalSuper) !== 0) return true;
    return false;
  }

  // -------------------------------------------------------------------------
  // Main visit dispatch
  // -------------------------------------------------------------------------

  visit(node: AstNode): AstNode {
    if (node.kind === Kind.SourceFile) return this.visitSourceFile(node as unknown as SourceFileNode);
    if (!this.shouldVisitNode(node)) return node;
    switch (node.kind) {
      case Kind.Decorator: return undefined as unknown as AstNode;
      case Kind.ClassDeclaration: return this.visitClassDeclaration(node as unknown as ClassDeclaration);
      case Kind.ClassExpression: return this.visitClassExpression(node as unknown as ClassExpression);
      case Kind.Constructor: return this.visitConstructorDeclaration(node);
      case Kind.MethodDeclaration: return this.visitMethodDeclaration(node);
      case Kind.GetAccessor: return this.visitGetAccessorDeclaration(node);
      case Kind.SetAccessor: return this.visitSetAccessorDeclaration(node);
      case Kind.ClassStaticBlockDeclaration: return this.visitClassStaticBlockDeclaration(node);
      case Kind.PropertyDeclaration: return this.visitPropertyDeclaration(node);
      case Kind.ThisKeyword: return this.visitThisExpression(node);
      case Kind.CallExpression: return this.visitCallExpression(node);
      case Kind.TaggedTemplateExpression: return this.visitTaggedTemplateExpression(node);
      case Kind.PropertyAccessExpression: return this.visitPropertyAccessExpression(node);
      case Kind.ElementAccessExpression: return this.visitElementAccessExpression(node);
      case Kind.Parameter: return this.visitParameterDeclaration(node as unknown as ParameterDeclaration);
      case Kind.ForStatement: return this.visitForStatement(node);
      case Kind.ExpressionStatement: return this.visitExpressionStatement(node);
      case Kind.BinaryExpression: return this.visitBinaryExpression(node, false);
      case Kind.PrefixUnaryExpression:
      case Kind.PostfixUnaryExpression:
        return this.visitPreOrPostfixUnaryExpression(node, false);
      case Kind.ComputedPropertyName: return this.visitComputedPropertyName(node);
      case Kind.ExportAssignment: return this.visitExportAssignment(node);
      case Kind.ParenthesizedExpression: return this.visitParenthesizedExpression(node, false);
      case Kind.PartiallyEmittedExpression: return this.visitPartiallyEmittedExpression(node, false);
      default:
        return this.visitor().visitEachChild(node);
    }
  }

  // -------------------------------------------------------------------------
  // Sub-visitor implementations
  // -------------------------------------------------------------------------

  modifierVisitorVisit(node: AstNode): AstNode | undefined {
    if (node.kind === Kind.Decorator) return undefined;
    return node;
  }

  classElementVisitorVisit(node: AstNode): AstNode {
    switch (node.kind) {
      case Kind.Constructor: return this.visitConstructorDeclaration(node);
      case Kind.MethodDeclaration: return this.visitMethodDeclaration(node);
      case Kind.GetAccessor: return this.visitGetAccessorDeclaration(node);
      case Kind.SetAccessor: return this.visitSetAccessorDeclaration(node);
      case Kind.PropertyDeclaration: return this.visitPropertyDeclaration(node);
      case Kind.ClassStaticBlockDeclaration: return this.visitClassStaticBlockDeclaration(node);
      default: return this.visit(node);
    }
  }

  discardedValueVisit(node: AstNode): AstNode {
    switch (node.kind) {
      case Kind.PrefixUnaryExpression:
      case Kind.PostfixUnaryExpression:
        return this.visitPreOrPostfixUnaryExpression(node, true);
      case Kind.BinaryExpression: return this.visitBinaryExpression(node, true);
      case Kind.ParenthesizedExpression: return this.visitParenthesizedExpression(node, true);
      case Kind.PartiallyEmittedExpression: return this.visitPartiallyEmittedExpression(node, true);
      default: return this.visit(node);
    }
  }

  nonConstructorClassElementVisit(node: AstNode): AstNode {
    if (node.kind === Kind.Constructor) return node;
    return this.classElementVisitorVisit(node);
  }

  constructorClassElementVisit(node: AstNode): AstNode {
    if (node.kind !== Kind.Constructor) return node;
    return this.visitConstructorDeclaration(node);
  }

  exportStrippingModifierVisit(node: AstNode): AstNode | undefined {
    switch (node.kind) {
      case Kind.ExportKeyword:
      case Kind.DefaultKeyword:
        return undefined;
      case Kind.Decorator:
        return undefined;
      default:
        return node;
    }
  }

  // -------------------------------------------------------------------------
  // Helper variable + class info construction
  // -------------------------------------------------------------------------

  createHelperVariable(node: AstNode, suffix: string): IdentifierNode {
    return this.factory().newUniqueName(`${getHelperVariableName(this.emitContext(), node)}_${suffix}`);
  }

  createLet(name: IdentifierNode, initializer: Expression | undefined): Statement {
    return this.factory().newLetStatement(name, initializer) as Statement;
  }

  createClassInfo(node: AstNode): ClassInfo {
    const facts = this.collectDecoratedClassFacts(node);
    return {
      class: node,
      classDecoratorsName: undefined,
      classDescriptorName: undefined,
      classExtraInitializersName: undefined,
      classThis: undefined,
      classSuper: undefined,
      metadataReference: facts.needsMetadata ? this.factory().newUniqueName("_metadata") : undefined,
      memberInfos: new Map(),
      instanceMethodExtraInitializersName: undefined,
      staticMethodExtraInitializersName: undefined,
      staticNonFieldDecorationStatements: [],
      nonStaticNonFieldDecorationStatements: [],
      staticFieldDecorationStatements: [],
      nonStaticFieldDecorationStatements: [],
      hasStaticInitializers: facts.hasStaticInitializers,
      hasNonAmbientInstanceFields: facts.hasNonAmbientInstanceFields,
      hasStaticPrivateClassElements: facts.hasStaticPrivateClassElements,
      pendingStaticInitializers: [],
      pendingInstanceInitializers: [],
    };
  }

  collectDecoratedClassFacts(node: AstNode): DecoratedClassFacts {
    const classDecorators = decoratorsOf(node);
    const memberFacts = this.collectDecoratedMemberFacts(node);
    const members = classMemberArrayLocal(node);
    const hasStaticPrivateClassElements = members.some((member) =>
      this.isPrivateOrAutoAccessorStaticClassElement(member));
    const hasStaticInitializers = members.some((member) =>
      member.kind === Kind.ClassStaticBlockDeclaration
      || (isPropertyDeclaration(member) && hasStaticModifier(member)
        && (propertyInitializerOfLocal(member) !== undefined || decoratorsOf(member).length > 0)));
    const hasNonAmbientInstanceFields = members.some((member) =>
      isPropertyDeclaration(member) && !hasStaticModifier(member) && !hasAmbientModifierLocal(member));
    const needsClassThis = classDecorators.length > 0
      || memberFacts.some((fact) => fact.isStatic && (fact.needsDescriptor || fact.needsInitializers));
    const needsClassSuper = classHasExtendsClauseLocal(node)
      && memberFacts.some((fact) => fact.isStatic || fact.hasComputedName);
    const needsMetadata = classDecorators.length > 0 || memberFacts.length > 0;
    return {
      classDecorators,
      memberFacts,
      hasStaticPrivateClassElements,
      hasStaticInitializers,
      hasNonAmbientInstanceFields,
      needsClassThis,
      needsClassSuper,
      needsMetadata,
    };
  }

  collectDecoratedMemberFacts(node: AstNode): DecoratedMemberFacts[] {
    const facts: DecoratedMemberFacts[] = [];
    for (const member of classMemberArrayLocal(node)) {
      const decorators = decoratorsOf(member);
      if (decorators.length === 0 && !classElementNameIsComputed(member)) continue;
      facts.push({
        member,
        decorators,
        contextKind: this.getDecoratorContextKind(member),
        isStatic: hasStaticModifier(member),
        isPrivate: this.memberHasPrivateName(member),
        hasComputedName: classElementNameIsComputed(member),
        needsDescriptor: this.memberNeedsDescriptor(member),
        needsInitializers: this.memberNeedsInitializers(member),
        needsExtraInitializers: this.memberNeedsExtraInitializers(member),
      });
    }
    return facts;
  }

  getDecoratorContextKind(member: AstNode): ESDecoratorKind {
    if (isGetAccessorDeclaration(member)) return "getter";
    if (isSetAccessorDeclaration(member)) return "setter";
    if (isAutoAccessorPropertyDeclaration(member)) return "accessor";
    if (isPropertyDeclaration(member)) return "field";
    if (isMethodDeclaration(member)) return "method";
    return "field";
  }

  memberHasPrivateName(member: AstNode): boolean {
    const name = getNodeName(member);
    return name !== undefined && isPrivateIdentifier(name);
  }

  memberNeedsDescriptor(member: AstNode): boolean {
    return isMethodDeclaration(member)
      || isGetAccessorDeclaration(member)
      || isSetAccessorDeclaration(member)
      || isAutoAccessorPropertyDeclaration(member);
  }

  memberNeedsInitializers(member: AstNode): boolean {
    return isPropertyDeclaration(member) || isAutoAccessorPropertyDeclaration(member);
  }

  memberNeedsExtraInitializers(member: AstNode): boolean {
    return this.memberNeedsDescriptor(member) || this.memberNeedsInitializers(member);
  }

  isPrivateOrAutoAccessorStaticClassElement(member: AstNode): boolean {
    if (!hasStaticModifier(member)) return false;
    if (isAutoAccessorPropertyDeclaration(member)) return true;
    return this.memberHasPrivateName(member);
  }

  ensureClassDecorationState(ci: ClassInfo, facts: DecoratedClassFacts): void {
    if (facts.classDecorators.length === 0) return;
    if (ci.classDecoratorsName === undefined) {
      ci.classDecoratorsName = this.factory().newUniqueName("_classDecorators");
    }
    if (ci.classDescriptorName === undefined) {
      ci.classDescriptorName = this.factory().newUniqueName("_classDescriptor");
    }
    if (ci.classExtraInitializersName === undefined) {
      ci.classExtraInitializersName = this.factory().newUniqueName("_classExtraInitializers");
    }
    if (ci.classThis === undefined) {
      ci.classThis = this.factory().newUniqueName("_classThis");
    }
  }

  ensureMemberInfo(ci: ClassInfo, fact: DecoratedMemberFacts): MemberInfo {
    const existing = ci.memberInfos.get(fact.member);
    if (existing !== undefined) return existing;
    const memberInfo = this.createMemberInfo(fact.member, fact);
    ci.memberInfos.set(fact.member, memberInfo);
    return memberInfo;
  }

  createMemberInfo(member: AstNode, fact: DecoratedMemberFacts): MemberInfo {
    return {
      memberDecoratorsName: fact.decorators.length > 0 ? this.createHelperVariable(member, "decorators") : undefined,
      memberInitializersName: fact.needsInitializers ? this.createHelperVariable(member, "initializers") : undefined,
      memberExtraInitializersName: fact.needsExtraInitializers ? this.createHelperVariable(member, "extraInitializers") : undefined,
      memberDescriptorName: fact.needsDescriptor ? this.createHelperVariable(member, "descriptor") : undefined,
    };
  }

  createDecoratorEvaluationPlan(node: AstNode): DecoratorEvaluationPlan {
    const facts = this.collectDecoratedClassFacts(node);
    const classInfo = this.createClassInfo(node);
    this.ensureClassDecorationState(classInfo, facts);
    const leadingStatements: Statement[] = [];
    const trailingStatements: Statement[] = [];
    const buckets: DecoratorStatementBuckets = {
      staticNonField: classInfo.staticNonFieldDecorationStatements,
      nonStaticNonField: classInfo.nonStaticNonFieldDecorationStatements,
      staticField: classInfo.staticFieldDecorationStatements,
      nonStaticField: classInfo.nonStaticFieldDecorationStatements,
    };
    for (const fact of facts.memberFacts) {
      const memberInfo = this.ensureMemberInfo(classInfo, fact);
      const decorators = this.transformAllDecoratorsOfDeclaration(fact.decorators);
      if (memberInfo.memberDecoratorsName !== undefined && decorators.length > 0) {
        leadingStatements.push(this.createLet(
          memberInfo.memberDecoratorsName,
          this.factory().newArrayLiteralExpression(this.factory().newNodeList(decorators), false) as Expression,
        ));
      }
      if (memberInfo.memberInitializersName !== undefined) {
        leadingStatements.push(this.createLet(
          memberInfo.memberInitializersName,
          this.factory().newArrayLiteralExpression(this.factory().newNodeList([]), false) as Expression,
        ));
      }
      if (memberInfo.memberExtraInitializersName !== undefined) {
        leadingStatements.push(this.createLet(
          memberInfo.memberExtraInitializersName,
          this.factory().newArrayLiteralExpression(this.factory().newNodeList([]), false) as Expression,
        ));
      }
      const statement = this.createDecoratorApplicationStatement(classInfo, fact, memberInfo);
      this.appendDecorationStatement(classInfo, fact.member, statement);
    }
    if (classInfo.classExtraInitializersName !== undefined && classInfo.classThis !== undefined) {
      const runInitializers = (this.factory() as unknown as {
        newRunInitializersHelper(receiver: Expression, initializers: Expression, value: Expression | undefined): Expression;
      }).newRunInitializersHelper;
      trailingStatements.push(this.factory().newExpressionStatement(
        runInitializers(classInfo.classThis, classInfo.classExtraInitializersName, undefined),
      ) as Statement);
    }
    return { classInfo, facts, leadingStatements, memberStatements: buckets, trailingStatements };
  }

  transformClassLike(node: AstNode): Expression {
    // Deep body deferred — emits ~400 LoC of __esDecorate / __runInitializers calls.
    void node;
    return this.factory().newIdentifier("") as unknown as Expression;
  }

  emitMemberInfoDeclarations(ci: ClassInfo, isStatic: boolean): Statement[] {
    const statements: Statement[] = [];
    for (const [member, info] of ci.memberInfos) {
      if (hasStaticModifier(member) !== isStatic) continue;
      if (info.memberDecoratorsName !== undefined) {
        statements.push(this.createLet(info.memberDecoratorsName, undefined));
      }
      if (info.memberInitializersName !== undefined) {
        statements.push(this.createLet(
          info.memberInitializersName,
          this.factory().newArrayLiteralExpression(this.factory().newNodeList([]), false) as Expression,
        ));
      }
      if (info.memberExtraInitializersName !== undefined) {
        statements.push(this.createLet(
          info.memberExtraInitializersName,
          this.factory().newArrayLiteralExpression(this.factory().newNodeList([]), false) as Expression,
        ));
      }
      if (info.memberDescriptorName !== undefined) {
        statements.push(this.createLet(info.memberDescriptorName, undefined));
      }
    }
    return statements;
  }

  // -------------------------------------------------------------------------
  // Per-kind visitors
  // -------------------------------------------------------------------------

  visitClassDeclaration(node: ClassDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitClassExpression(node: ClassExpression): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  prepareConstructor(ci: ClassInfo): Statement[] {
    void ci;
    return [];
  }

  transformConstructorBodyWorker(
    statementsOut: Statement[],
    statementsIn: Statement[],
    statementOffset: number,
    superPath: readonly number[],
    superPathDepth: number,
    initializerStatements: readonly Statement[],
  ): Statement[] {
    void statementsIn; void statementOffset; void superPath; void superPathDepth; void initializerStatements;
    return statementsOut;
  }

  visitConstructorDeclaration(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  finishClassElement(updated: AstNode, original: AstNode): AstNode {
    void original;
    return updated;
  }

  partialTransformClassElement(
    member: AstNode,
    ci: ClassInfo,
    createDescriptor: (member: AstNode, modifiers: ModifierList | undefined) => Expression,
  ): { newDecoratorsName: IdentifierNode | undefined; descriptor: Expression | undefined } {
    void member; void ci; void createDescriptor;
    return { newDecoratorsName: undefined, descriptor: undefined };
  }

  appendDecorationStatement(ci: ClassInfo, member: AstNode, stmt: Statement): void {
    const fact = this.createDecoratedMemberFact(member);
    if (fact === undefined) return;
    if (fact.isStatic && fact.contextKind !== "field") {
      ci.staticNonFieldDecorationStatements.push(stmt);
    } else if (!fact.isStatic && fact.contextKind !== "field") {
      ci.nonStaticNonFieldDecorationStatements.push(stmt);
    } else if (fact.isStatic) {
      ci.staticFieldDecorationStatements.push(stmt);
    } else {
      ci.nonStaticFieldDecorationStatements.push(stmt);
    }
  }

  createDecoratedMemberFact(member: AstNode): DecoratedMemberFacts | undefined {
    const decorators = decoratorsOf(member);
    if (decorators.length === 0 && !classElementNameIsComputed(member)) return undefined;
    return {
      member,
      decorators,
      contextKind: this.getDecoratorContextKind(member),
      isStatic: hasStaticModifier(member),
      isPrivate: this.memberHasPrivateName(member),
      hasComputedName: classElementNameIsComputed(member),
      needsDescriptor: this.memberNeedsDescriptor(member),
      needsInitializers: this.memberNeedsInitializers(member),
      needsExtraInitializers: this.memberNeedsExtraInitializers(member),
    };
  }

  createDecoratorApplicationStatement(
    ci: ClassInfo,
    fact: DecoratedMemberFacts,
    info: MemberInfo,
  ): Statement {
    const decoratorsName = info.memberDecoratorsName
      ?? this.factory().newArrayLiteralExpression(this.factory().newNodeList([]), false) as Expression;
    const descriptor = info.memberDescriptorName
      ?? this.createDescriptorPlaceholder(fact.member, fact);
    const context = this.createDecoratorContextObject(ci, fact);
    const initializers = info.memberInitializersName
      ?? this.factory().newToken(Kind.NullKeyword) as unknown as Expression;
    const extraInitializers = info.memberExtraInitializersName
      ?? this.factory().newToken(Kind.NullKeyword) as unknown as Expression;
    const target = fact.isStatic
      ? ci.classThis ?? this.factory().newThisExpression()
      : this.factory().newToken(Kind.NullKeyword);
    const esDecorate = (this.factory() as unknown as {
      newESDecorateHelper(
        target: Expression,
        descriptor: Expression,
        decorators: Expression,
        context: Expression,
        initializers: Expression,
        extraInitializers: Expression,
      ): Expression;
    }).newESDecorateHelper;
    const call = esDecorate(
      target as Expression,
      descriptor as Expression,
      decoratorsName,
      context,
      initializers,
      extraInitializers,
    );
    return this.factory().newExpressionStatement(call) as Statement;
  }

  createDescriptorPlaceholder(member: AstNode, fact: DecoratedMemberFacts): Expression {
    if (fact.contextKind === "field") {
      return this.factory().newToken(Kind.NullKeyword) as unknown as Expression;
    }
    const name = getNodeName(member);
    const value = name !== undefined
      ? this.createMemberNameExpression(name)
      : this.factory().newStringLiteral("", 0) as Expression;
    return this.factory().newObjectLiteralExpression(this.factory().newNodeList([
      this.factory().newPropertyAssignment(undefined, this.factory().newIdentifier("value"), undefined, undefined, value),
    ]), false) as Expression;
  }

  createDecoratorContextObject(ci: ClassInfo, fact: DecoratedMemberFacts): Expression {
    const properties: AstNode[] = [
      this.factory().newPropertyAssignment(
        undefined,
        this.factory().newIdentifier("kind"),
        undefined,
        undefined,
        this.factory().newStringLiteral(fact.contextKind, 0),
      ),
      this.factory().newPropertyAssignment(
        undefined,
        this.factory().newIdentifier("name"),
        undefined,
        undefined,
        this.createMemberNameExpression(getNodeName(fact.member)),
      ),
      this.factory().newPropertyAssignment(
        undefined,
        this.factory().newIdentifier("static"),
        undefined,
        undefined,
        fact.isStatic ? this.factory().newTrueExpression() : this.factory().newFalseExpression(),
      ),
      this.factory().newPropertyAssignment(
        undefined,
        this.factory().newIdentifier("private"),
        undefined,
        undefined,
        fact.isPrivate ? this.factory().newTrueExpression() : this.factory().newFalseExpression(),
      ),
    ];
    if (ci.metadataReference !== undefined) {
      properties.push(this.factory().newPropertyAssignment(
        undefined,
        this.factory().newIdentifier("metadata"),
        undefined,
        undefined,
        ci.metadataReference,
      ));
    }
    return this.factory().newObjectLiteralExpression(this.factory().newNodeList(properties), true) as Expression;
  }

  createMemberNameExpression(name: AstNode | undefined): Expression {
    if (name === undefined) return this.factory().newStringLiteral("", 0) as Expression;
    if (isComputedPropertyNameLocal(name)) {
      return expressionOfNodeLocal(name) ?? this.factory().newStringLiteral("", 0) as Expression;
    }
    if (isIdentifier(name) || isPrivateIdentifier(name) || isStringLiteral(name)) {
      return this.factory().newStringLiteral(nodeText(name).replace(/^#/, ""), 0) as Expression;
    }
    return name as unknown as Expression;
  }

  visitMethodDeclaration(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitGetAccessorDeclaration(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitSetAccessorDeclaration(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitClassStaticBlockDeclaration(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitPropertyDeclaration(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitThisExpression(node: AstNode): AstNode {
    if (this.classThis !== undefined) {
      return this.classThis as unknown as AstNode;
    }
    return node;
  }

  visitCallExpression(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitTaggedTemplateExpression(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitPropertyAccessExpression(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitElementAccessExpression(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitParameterDeclaration(node: ParameterDeclaration): AstNode {
    return this.visitor().visitEachChild(node as unknown as AstNode);
  }

  visitNamedEvaluationSite(node: AstNode, classExpr: AstNode): AstNode {
    void classExpr;
    return this.visitor().visitEachChild(node);
  }

  visitForStatement(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitExpressionStatement(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitBinaryExpression(node: AstNode, _discarded: boolean): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitPreOrPostfixUnaryExpression(node: AstNode, _discarded: boolean): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitReferencedPropertyName(node: AstNode): { expression: Expression | undefined; node: AstNode } {
    return { expression: undefined, node };
  }

  visitPropertyName(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitComputedPropertyName(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitDestructuringAssignmentTarget(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitAssignmentElement(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitAssignmentRestElement(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitArrayAssignmentElement(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitAssignmentPropertyNode(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitShorthandAssignmentProperty(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitAssignmentRestProperty(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitObjectAssignmentElement(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitAssignmentPattern(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitExportAssignment(node: AstNode): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitParenthesizedExpression(node: AstNode, _discarded: boolean): AstNode {
    return this.visitor().visitEachChild(node);
  }

  visitPartiallyEmittedExpression(node: AstNode, _discarded: boolean): AstNode {
    return this.visitor().visitEachChild(node);
  }

  // -------------------------------------------------------------------------
  // Pending-expression / initializer helpers
  // -------------------------------------------------------------------------

  prependExpressions(pending: readonly Expression[], expression: Expression): Expression {
    if (pending.length === 0) return expression;
    return this.factory().inlineExpressions([...pending, expression]) as Expression;
  }

  injectPendingExpressions(expression: Expression): Expression {
    if (this.pendingExpressions.length === 0) return expression;
    const all = [...this.pendingExpressions, expression];
    this.pendingExpressions = [];
    return this.factory().inlineExpressions(all) as Expression;
  }

  injectPendingInitializers(ci: ClassInfo, isStatic: boolean, expression: Expression): Expression {
    void ci; void isStatic;
    return expression;
  }

  // -------------------------------------------------------------------------
  // Decorator-to-runtime helper translation
  // -------------------------------------------------------------------------

  transformAllDecoratorsOfDeclaration(decorators: readonly AstNode[]): Expression[] {
    return decorators.map((d) => this.transformDecorator(d));
  }

  transformDecorator(decorator: AstNode): Expression {
    const expression = expressionOfNodeLocal(decorator);
    if (expression !== undefined) return this.visitor().visitNode(expression) as Expression;
    return this.visitor().visitNode(decorator) as Expression;
  }

  createCallBinding(expression: Expression): { thisArg: Expression; target: Expression } {
    void expression;
    const t = this.factory().newTempVariable() as unknown as Expression;
    return { thisArg: t, target: t };
  }

  shouldBeCapturedInTempVariable(node: Expression): boolean {
    void node;
    return false;
  }

  // -------------------------------------------------------------------------
  // Descriptor + metadata creation
  // -------------------------------------------------------------------------

  createDescriptorMethod(
    name: IdentifierNode,
    modifiers: ModifierList | undefined,
    body: AstNode | undefined,
  ): AstNode {
    void name; void modifiers; void body;
    return this.factory().newIdentifier("") as unknown as AstNode;
  }

  createMethodDescriptorObject(member: AstNode, modifiers: ModifierList | undefined): Expression {
    void member; void modifiers;
    return this.factory().newIdentifier("") as unknown as Expression;
  }

  createGetAccessorDescriptorObject(member: AstNode, modifiers: ModifierList | undefined): Expression {
    void member; void modifiers;
    return this.factory().newIdentifier("") as unknown as Expression;
  }

  createSetAccessorDescriptorObject(member: AstNode, modifiers: ModifierList | undefined): Expression {
    void member; void modifiers;
    return this.factory().newIdentifier("") as unknown as Expression;
  }

  createAccessorPropertyDescriptorObject(member: AstNode, _modifiers: ModifierList | undefined): Expression {
    void member;
    return this.factory().newIdentifier("") as unknown as Expression;
  }

  createMethodDescriptorForwarder(
    modifiers: ModifierList | undefined, name: AstNode, descriptorName: IdentifierNode,
  ): AstNode {
    void modifiers; void name; void descriptorName;
    return this.factory().newIdentifier("") as unknown as AstNode;
  }

  createGetAccessorDescriptorForwarder(
    modifiers: ModifierList | undefined, name: AstNode, descriptorName: IdentifierNode,
  ): AstNode {
    void modifiers; void name; void descriptorName;
    return this.factory().newIdentifier("") as unknown as AstNode;
  }

  createSetAccessorDescriptorForwarder(
    modifiers: ModifierList | undefined, name: AstNode, descriptorName: IdentifierNode,
  ): AstNode {
    void modifiers; void name; void descriptorName;
    return this.factory().newIdentifier("") as unknown as AstNode;
  }

  createMetadata(name: IdentifierNode, classSuper: IdentifierNode | undefined): Statement {
    void name; void classSuper;
    return this.factory().newEmptyStatement() as Statement;
  }

  createSymbolMetadata(target: Expression, value: IdentifierNode): Statement {
    void target; void value;
    return this.factory().newEmptyStatement() as Statement;
  }

  createSymbolMetadataReference(classSuper: IdentifierNode | undefined): Expression {
    void classSuper;
    return this.factory().newIdentifier("") as unknown as Expression;
  }
}

export function newESDecoratorTransformer(opts: TransformOptions): Transformer | undefined {
  if (isTrue(opts.compilerOptions.experimentalDecorators)) return undefined;
  const languageVersion = getEmitScriptTarget(opts.compilerOptions as unknown as Parameters<typeof getEmitScriptTarget>[0]);
  if (languageVersion >= ScriptTarget.ESNext && getUseDefineForClassFields(opts.compilerOptions as unknown as Parameters<typeof getUseDefineForClassFields>[0])) {
    return undefined;
  }
  return new ESDecoratorTransformer(opts);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

export function getHelperVariableName(_emitContext: unknown, node: AstNode): string {
  const name = getNodeName(node);
  let declarationName = "";
  if (name !== undefined && isIdentifier(name)) {
    declarationName = nodeText(name);
  } else if (name !== undefined && isPrivateIdentifier(name)) {
    declarationName = nodeText(name).replace(/^#/, "");
  } else if (name !== undefined && isStringLiteral(name)) {
    declarationName = nodeText(name);
  } else if (isClassLikeDeclaration(node)) {
    declarationName = "class";
  } else {
    declarationName = "member";
  }
  if (isGetAccessorDeclaration(node)) declarationName = `get_${declarationName}`;
  if (isSetAccessorDeclaration(node)) declarationName = `set_${declarationName}`;
  if (name !== undefined && isPrivateIdentifier(name)) declarationName = `private_${declarationName}`;
  if (hasStaticModifier(node)) declarationName = `static_${declarationName}`;
  return `_${sanitizeHelperVariableName(declarationName)}`;
}

export function isDecoratedClassLike(node: AstNode): boolean {
  return decoratorsOf(node).length > 0
    || classMemberArrayLocal(node).some((member) => decoratorsOf(member).length > 0);
}

export function isAnonymousClassNeedingAssignedName(node: AstNode): boolean {
  return isClassLikeDeclaration(node)
    && getNodeName(node) === undefined
    && isDecoratedClassLike(node);
}

export function canIgnoreEmptyStringLiteralInAssignedName(node: AstNode): boolean {
  return isClassLikeDeclaration(node) && decoratorsOf(node).length === 0;
}

export function injectClassThisAssignmentIfMissing(
  _emitContext: unknown,
  _factory: unknown,
  node: AstNode,
  classThis: IdentifierNode,
): AstNode {
  if (classHasClassThisAssignmentLocal(node, classThis)) return node;
  return node;
}

function sanitizeHelperVariableName(text: string): string {
  const sanitized = text.replace(/[^A-Za-z0-9_$]/g, "_");
  if (sanitized.length === 0) return "member";
  return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`;
}

function classMemberArrayLocal(node: AstNode): readonly AstNode[] {
  const members = (node as unknown as { members?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).members;
  if (members === undefined) return [];
  return (members as { nodes?: readonly AstNode[] }).nodes ?? members as readonly AstNode[];
}

function decoratorsOf(node: AstNode): readonly AstNode[] {
  const decorators = (node as unknown as { decorators?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).decorators;
  if (decorators !== undefined) {
    return (decorators as { nodes?: readonly AstNode[] }).nodes ?? decorators as readonly AstNode[];
  }
  const modifiers = (node as unknown as { modifiers?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).modifiers;
  const modifierArray = modifiers === undefined
    ? []
    : ((modifiers as { nodes?: readonly AstNode[] }).nodes ?? modifiers as readonly AstNode[]);
  return modifierArray.filter((modifier) => modifier.kind === Kind.Decorator);
}

function hasAmbientModifierLocal(node: AstNode): boolean {
  const modifiers = (node as unknown as { modifiers?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).modifiers;
  const modifierArray = modifiers === undefined
    ? []
    : ((modifiers as { nodes?: readonly AstNode[] }).nodes ?? modifiers as readonly AstNode[]);
  return modifierArray.some((modifier) => modifier.kind === Kind.DeclareKeyword);
}

function classElementNameIsComputed(node: AstNode): boolean {
  const name = getNodeName(node);
  return name !== undefined && isComputedPropertyNameLocal(name);
}

function propertyInitializerOfLocal(node: AstNode): Expression | undefined {
  return (node as unknown as { initializer?: Expression }).initializer;
}

function expressionOfNodeLocal(node: AstNode | undefined): Expression | undefined {
  return (node as unknown as { expression?: Expression } | undefined)?.expression;
}

function isComputedPropertyNameLocal(node: AstNode): boolean {
  return node.kind === Kind.ComputedPropertyName;
}

function classHasExtendsClauseLocal(node: AstNode): boolean {
  const heritageClauses = (node as unknown as { heritageClauses?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).heritageClauses;
  const clauses = heritageClauses === undefined
    ? []
    : ((heritageClauses as { nodes?: readonly AstNode[] }).nodes ?? heritageClauses as readonly AstNode[]);
  return clauses.some((clause) => {
    const token = (clause as unknown as { token?: number }).token;
    return token === Kind.ExtendsKeyword || token === undefined;
  });
}

function classHasClassThisAssignmentLocal(node: AstNode, classThis: IdentifierNode): boolean {
  const targetName = nodeText(classThis as unknown as AstNode);
  return nodeContainsIdentifierLocal(node, targetName);
}

function nodeContainsIdentifierLocal(node: AstNode, name: string): boolean {
  const seen = new Set<AstNode>();
  return nodeContainsIdentifierWorker(node, name, seen);
}

function nodeContainsIdentifierWorker(node: AstNode | undefined, name: string, seen: Set<AstNode>): boolean {
  if (node === undefined || seen.has(node)) return false;
  seen.add(node);
  if (node.kind === Kind.Identifier && nodeText(node) === name) return true;
  const forEachChild = (node as unknown as {
    forEachChild?: (visitor: (child: AstNode) => boolean | undefined) => boolean | undefined;
  }).forEachChild;
  if (forEachChild === undefined) return false;
  return forEachChild((child) => nodeContainsIdentifierWorker(child, name, seen) || undefined) === true;
}

interface CompilerOptions {
  experimentalDecorators?: unknown;
  readonly _opts?: unknown;
}
// NodeVisitor type comes from transformer.ts via the Transformer base.
