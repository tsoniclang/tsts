/**
 * JSX type checking.
 *
 * Substantive port of TS-Go `internal/checker/jsx.go` (~1479 LoC).
 * Resolves JSX intrinsic elements, computes attribute/children types,
 * applies the JSX factory (legacy or runtime).
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { Type, Signature, ObjectType, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export type JsxReferenceKind = 0 | 1 | 2;
export const JsxReferenceKind = {
  Component: 0 as JsxReferenceKind,
  Function: 1 as JsxReferenceKind,
  Mixed: 2 as JsxReferenceKind,
} as const;

export type JsxFlags = number;
export const JsxFlags = {
  None: 0 as JsxFlags,
  IntrinsicNamedElement: (1 << 0) as JsxFlags,
  IntrinsicIndexedElement: (1 << 1) as JsxFlags,
  IntrinsicElement: 3 as JsxFlags,
} as const;

export const JsxNames = {
  JSX: "JSX",
  IntrinsicElements: "IntrinsicElements",
  ElementClass: "ElementClass",
  ElementAttributesPropertyNameContainer: "ElementAttributesProperty",
  ElementChildrenAttributeNameContainer: "ElementChildrenAttribute",
  Element: "Element",
  ElementType: "ElementType",
  IntrinsicAttributes: "IntrinsicAttributes",
  IntrinsicClassAttributes: "IntrinsicClassAttributes",
  LibraryManagedAttributes: "LibraryManagedAttributes",
} as const;

export const ReactNames = {
  Fragment: "Fragment",
} as const;

export interface JsxCheckerHost {
  resolveName?(location: AstNode | undefined, name: string, meaning: number): AstSymbol | undefined;
  checkExpression?(node: AstNode): Type;
  isTypeAssignableTo?(source: Type, target: Type): boolean;
  getStringLiteralType?(value: string): Type;
  anyType?: Type;
  errorType?: Type;
  booleanTrueType?: Type;
  stringType?: Type;
  jsxNamespace?: string;
  jsxImplicitImportBase?: string;
}

export class JsxChecker {
  constructor(private readonly host: JsxCheckerHost = {}) {}

  // JSX type resolution
  getJsxType(name: string, location: AstNode | undefined): Type | undefined {
    const namespace = this.getJsxNamespaceAt(location);
    const symbol = membersOf(namespace)?.get(name) ?? exportsOf(namespace)?.get(name);
    return getTypeOfSymbol(symbol);
  }
  getJsxNamespaceAt(location: AstNode | undefined): AstSymbol | undefined {
    const cached = sourceFileOf(location)?.jsxNamespaceSymbol;
    if (cached !== undefined) return cached;
    const namespaceName = this.getJsxNamespace(location);
    return this.host.resolveName?.(location, namespaceName, SymbolFlags.Namespace | SymbolFlags.Value)
      ?? lookupSymbolInScope(location, namespaceName, SymbolFlags.Namespace | SymbolFlags.Value);
  }
  getJsxNamespace(location: AstNode | undefined): string {
    return sourceFileOf(location)?.jsxNamespace
      ?? this.host.jsxNamespace
      ?? "React";
  }
  getJsxImplicitImportBase(location: AstNode | undefined): string {
    return sourceFileOf(location)?.jsxImportSource
      ?? this.host.jsxImplicitImportBase
      ?? "";
  }
  getResolvedJsxRuntimeImports(location: AstNode | undefined): readonly AstSymbol[] {
    const imports = sourceFileOf(location)?.imports ?? [];
    const base = this.getJsxImplicitImportBase(location);
    if (base.length === 0) return [];
    return imports
      .filter((node) => moduleSpecifierText(node).startsWith(base))
      .map((node) => nodeSymbol(node))
      .filter((symbol): symbol is AstSymbol => symbol !== undefined);
  }
  getJsxAttributesTypeFromAttributesProperty(openingLikeElement: AstNode): Type {
    return this.createJsxAttributesTypeFromAttributesProperty(openingLikeElement);
  }
  getApparentTypeOfJsxClassComponentClass(node: AstNode): Type {
    const tagType = this.checkTagName(node);
    const constructSignature = this.getConstructSignaturesOfType(tagType)[0];
    return constructSignature?.resolvedReturnType ?? tagType;
  }

  // Element checking
  checkJsxElement(node: AstNode): Type {
    this.checkJsxOpeningLikeElementOrOpeningFragment(openingElementOf(node) ?? node);
    for (const child of jsxChildrenOf(node)) this.checkJsxChild(child);
    return this.getJsxElementTypeAt(node);
  }
  checkJsxSelfClosingElement(node: AstNode): Type {
    this.checkJsxOpeningLikeElementOrOpeningFragment(node);
    return this.getJsxElementTypeAt(node);
  }
  checkJsxFragment(node: AstNode): Type {
    this.checkJsxOpeningLikeElementOrOpeningFragment(openingFragmentOf(node) ?? node);
    for (const child of jsxChildrenOf(node)) this.checkJsxChild(child);
    return this.getJsxElementTypeAt(node);
  }
  checkJsxExpression(node: AstNode): Type {
    const expression = expressionOf(node);
    if (expression === undefined) return this.errorType();
    const type = this.host.checkExpression?.(expression) ?? typeOfNode(expression);
    if (spreadTokenOf(node) !== undefined && type !== this.anyType() && !this.isArrayLikeType(type)) {
      recordDiagnostic(node, "JSX spread child must be an array type.");
    }
    return type;
  }
  checkJsxAttribute(node: AstNode): Type {
    const initializer = initializerOf(node);
    if (initializer !== undefined) return this.host.checkExpression?.(initializer) ?? typeOfNode(initializer);
    return this.trueType();
  }
  checkJsxAttributes(node: AstNode): Type {
    return this.createJsxAttributesTypeFromAttributesProperty(parentOf(node) ?? node);
  }
  checkJsxOpeningLikeElementOrOpeningFragment(node: AstNode): void {
    this.checkJsxPreconditions(node);
    const signature = this.resolveJsxOpeningLikeElement(node, []);
    if (signature === undefined) return;
    if (isJsxOpeningLikeElement(node)) {
      this.checkJsxReturnAssignableToAppropriateBound(
        this.getJsxReferenceKind(node),
        signature.resolvedReturnType ?? this.anyType(),
        node,
      );
    }
  }
  checkJsxReturnAssignableToAppropriateBound(jsxRefKind: number, expressionType: Type, openingElement: AstNode): void {
    const bound = jsxRefKind === JsxReferenceKind.Component
      ? this.getJsxElementClassType(openingElement)
      : this.getJsxType(JsxNames.Element, openingElement);
    if (bound !== undefined && !this.isTypeAssignableTo(expressionType, bound)) {
      recordDiagnostic(openingElement, `JSX component return type ${typeName(expressionType)} is not assignable to ${typeName(bound)}.`);
    }
  }
  checkApplicableSignatureForJsxOpeningLikeElement(node: AstNode, signature: Signature, relation: number): boolean {
    void relation;
    const paramType = this.getEffectiveFirstArgumentForJsxSignature(signature, node);
    const attributesType = this.createJsxAttributesTypeFromAttributesProperty(node);
    return paramType === undefined || this.isTypeAssignableTo(attributesType, paramType);
  }

  // Intrinsic + component classification
  isJsxIntrinsicTagName(tagName: AstNode): boolean {
    const text = entityNameText(tagName);
    if (text.length === 0) return false;
    if (text.includes(":")) return true;
    if (text.includes(".")) return false;
    const c = text.charCodeAt(0);
    return c >= 0x61 /* a */ && c <= 0x7a /* z */;
  }
  isJsxIntrinsicTagNameOfHostType(tagName: AstNode): boolean {
    return this.isJsxIntrinsicTagName(tagName);
  }
  getIntrinsicTagSymbol(node: AstNode): AstSymbol | undefined {
    const name = entityNameText(tagNameOf(node) ?? node);
    const intrinsicElements = this.getJsxType(JsxNames.IntrinsicElements, node);
    return intrinsicElements === undefined ? undefined : propertyOfType(intrinsicElements, name);
  }
  getJsxElementClassType(location: AstNode): Type | undefined {
    return this.getJsxType(JsxNames.ElementClass, location);
  }
  resolveJsxOpeningLikeElement(node: AstNode, candidatesOutArray: readonly Signature[]): Signature | undefined {
    const candidates = candidatesOutArray as Signature[];
    if (isOpeningFragment(node)) {
      const fragmentType = this.getJSXFragmentType(node);
      const signature = this.getCallSignaturesOfType(fragmentType)[0] ?? syntheticSignature([], fragmentType);
      candidates.push(signature);
      return signature;
    }
    const tagName = tagNameOf(node);
    if (tagName !== undefined && this.isJsxIntrinsicTagName(tagName)) {
      const attributesType = this.getIntrinsicAttributesTypeFromJsxOpeningLikeElement(node);
      const signature = syntheticSignature([syntheticSymbol("props", attributesType)], this.getJsxElementTypeAt(node));
      candidates.push(signature);
      return signature;
    }
    const tagType = tagName === undefined ? this.errorType() : this.checkTagName(tagName);
    const signatures = this.getUninstantiatedJsxSignaturesOfType(tagType);
    candidates.push(...signatures);
    return signatures[0];
  }

  // Children
  getJsxElementChildrenPropertyName(jsxNamespace: AstSymbol): string | undefined {
    return singlePropertyName(membersOf(jsxNamespace)?.get(JsxNames.ElementChildrenAttributeNameContainer))
      ?? "children";
  }
  getJsxElementPropertiesName(jsxNamespace: AstSymbol): string | undefined {
    return singlePropertyName(membersOf(jsxNamespace)?.get(JsxNames.ElementAttributesPropertyNameContainer))
      ?? "props";
  }
  isUnhyphenatedJsxName(name: string): boolean { return !name.includes("-"); }

  checkJsxPreconditions(errorNode: AstNode): void {
    if (this.getJsxElementTypeAt(errorNode) === this.errorType()) {
      recordDiagnostic(errorNode, "JSX.Element type is not in scope.");
    }
  }

  createJsxAttributesTypeFromAttributesProperty(openingLikeElement: AstNode): Type {
    const table: SymbolTable = new Map();
    const attributes = attributesOf(openingLikeElement);
    for (const attribute of jsxAttributeProperties(attributes)) {
      if (isJsxSpreadAttribute(attribute)) {
        const spreadType = this.host.checkExpression?.(expressionOf(attribute) ?? attribute) ?? typeOfNode(expressionOf(attribute) ?? attribute);
        for (const property of propertiesOfType(spreadType)) table.set(symbolName(property), property);
        continue;
      }
      const name = propertyNameText(attribute);
      const type = this.checkJsxAttribute(attribute);
      table.set(name, syntheticSymbol(name, type, attribute));
    }
    const childrenName = this.getJsxElementChildrenPropertyName(this.getJsxNamespaceAt(openingLikeElement) ?? syntheticSymbol(JsxNames.JSX, this.errorType()));
    if (childrenName !== undefined && childrenName.length > 0 && hasSemanticJsxChildren(parentOf(openingLikeElement))) {
      const childrenTypes = this.checkJsxChildren(parentOf(openingLikeElement)!);
      table.set(childrenName, syntheticSymbol(childrenName, unionOrArrayType(childrenTypes), openingLikeElement));
    }
    return anonymousObjectType(table, ObjectFlags.JsxAttributes | ObjectFlags.FreshLiteral | ObjectFlags.ObjectLiteral);
  }

  checkJsxChildren(node: AstNode): readonly Type[] {
    const out: Type[] = [];
    for (const child of jsxChildrenOf(node)) {
      if (isJsxText(child)) {
        if (!isWhitespaceJsxText(child)) out.push(this.stringType());
      } else if (isJsxExpression(child) && expressionOf(child) === undefined) {
        continue;
      } else {
        out.push(this.checkJsxChild(child));
      }
    }
    return out;
  }

  checkJsxChild(node: AstNode): Type {
    if (isJsxExpression(node)) return this.checkJsxExpression(node);
    if (isJsxElementNode(node)) return this.checkJsxElement(node);
    if (isJsxSelfClosingNode(node)) return this.checkJsxSelfClosingElement(node);
    if (isJsxFragmentNode(node)) return this.checkJsxFragment(node);
    if (isJsxText(node)) return this.stringType();
    return this.host.checkExpression?.(node) ?? typeOfNode(node);
  }

  getUninstantiatedJsxSignaturesOfType(elementType: Type): readonly Signature[] {
    if ((elementType.flags & TypeFlags.String) !== 0) return [syntheticSignature([], this.anyType())];
    if ((elementType.flags & TypeFlags.StringLiteral) !== 0) {
      const literalName = literalValue(elementType);
      const intrinsicType = typeof literalName === "string" ? this.getIntrinsicAttributesTypeFromStringLiteralType(literalName) : undefined;
      return intrinsicType === undefined ? [] : [syntheticSignature([syntheticSymbol("props", intrinsicType)], this.getJsxElementTypeAt(undefined))];
    }
    const apparent = apparentType(elementType);
    const construct = this.getConstructSignaturesOfType(apparent);
    if (construct.length > 0) return construct;
    const call = this.getCallSignaturesOfType(apparent);
    if (call.length > 0) return call;
    if ((apparent.flags & TypeFlags.Union) !== 0) {
      return (constituentTypes(apparent) ?? []).flatMap((type) => this.getUninstantiatedJsxSignaturesOfType(type));
    }
    return [];
  }

  getIntrinsicAttributesTypeFromJsxOpeningLikeElement(node: AstNode): Type {
    const tagName = entityNameText(tagNameOf(node));
    return this.getIntrinsicAttributesTypeFromStringLiteralType(tagName)
      ?? anonymousObjectType(new Map(), ObjectFlags.JsxAttributes);
  }

  getIntrinsicAttributesTypeFromStringLiteralType(tagName: string): Type | undefined {
    const intrinsicElements = this.getJsxType(JsxNames.IntrinsicElements, undefined);
    if (intrinsicElements === undefined) return undefined;
    return getTypeOfSymbol(propertyOfType(intrinsicElements, tagName));
  }

  getEffectiveFirstArgumentForJsxSignature(signature: Signature, node: AstNode): Type | undefined {
    if (isOpeningFragment(node) || this.getJsxReferenceKind(node) !== JsxReferenceKind.Component) {
      return getTypeOfSymbol(signature.parameters[0]) ?? this.unknownType();
    }
    return this.getJsxPropsTypeFromClassType(signature, node);
  }

  getJsxPropsTypeFromClassType(signature: Signature, context: AstNode): Type | undefined {
    const namespace = this.getJsxNamespaceAt(context);
    const forcedLookup = namespace === undefined ? "props" : this.getJsxElementPropertiesName(namespace);
    if (forcedLookup === undefined) return getTypeOfSymbol(signature.parameters[0]) ?? this.unknownType();
    if (forcedLookup.length === 0) return signature.resolvedReturnType;
    return propertyTypeOfType(signature.resolvedReturnType, forcedLookup);
  }

  getJsxReferenceKind(node: AstNode): JsxReferenceKind {
    const tagType = this.checkTagName(tagNameOf(node) ?? node);
    const hasConstruct = this.getConstructSignaturesOfType(tagType).length > 0;
    const hasCall = this.getCallSignaturesOfType(tagType).length > 0;
    if (hasConstruct && hasCall) return JsxReferenceKind.Mixed;
    return hasConstruct ? JsxReferenceKind.Component : JsxReferenceKind.Function;
  }

  getJSXFragmentType(node: AstNode): Type {
    const namespace = this.getJsxNamespaceAt(node);
    const fragmentSymbol = membersOf(namespace)?.get(ReactNames.Fragment)
      ?? exportsOf(namespace)?.get(ReactNames.Fragment);
    return getTypeOfSymbol(fragmentSymbol) ?? this.anyType();
  }

  getJsxElementTypeAt(location: AstNode | undefined): Type {
    return this.getJsxType(JsxNames.Element, location) ?? this.anyType();
  }

  checkTagName(node: AstNode): Type {
    if (this.isJsxIntrinsicTagName(node)) {
      return this.host.getStringLiteralType?.(entityNameText(node)) ?? stringLiteralType(entityNameText(node));
    }
    return this.host.checkExpression?.(node) ?? typeOfNode(node);
  }

  getCallSignaturesOfType(type: Type): readonly Signature[] {
    return (type.data as ObjectType | undefined)?.declaredCallSignatures ?? [];
  }

  getConstructSignaturesOfType(type: Type): readonly Signature[] {
    return (type.data as ObjectType | undefined)?.declaredConstructSignatures ?? [];
  }

  isArrayLikeType(type: Type): boolean {
    return (objectFlagsOf(type) & ObjectFlags.Tuple) !== 0
      || symbolName(type.symbol) === "Array"
      || symbolName(type.symbol) === "ReadonlyArray"
      || (type.data as { elementType?: Type } | undefined)?.elementType !== undefined;
  }

  isTypeAssignableTo(source: Type, target: Type): boolean {
    return this.host.isTypeAssignableTo?.(source, target)
      ?? (source === target
        || (target.flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0
        || (source.flags & TypeFlags.Never) !== 0);
  }

  anyType(): Type { return this.host.anyType ?? intrinsicType(TypeFlags.Any, "any"); }
  unknownType(): Type { return intrinsicType(TypeFlags.Unknown, "unknown"); }
  errorType(): Type { return this.host.errorType ?? intrinsicType(TypeFlags.Any, "error"); }
  trueType(): Type { return this.host.booleanTrueType ?? { flags: TypeFlags.BooleanLiteral, id: nextSyntheticTypeId(), data: { value: true } }; }
  stringType(): Type { return this.host.stringType ?? intrinsicType(TypeFlags.String, "string"); }
}

export function newJsxChecker(host?: JsxCheckerHost): JsxChecker {
  return new JsxChecker(host);
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { parent?: AstNode } | undefined)?.parent;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { symbol?: AstSymbol } | undefined)?.symbol;
}

function sourceFileOf(node: AstNode | undefined): ({ jsxNamespaceSymbol?: AstSymbol; jsxNamespace?: string; jsxImportSource?: string; imports?: readonly AstNode[] } & AstNode) | undefined {
  let current = node;
  while (current !== undefined) {
    if ((current as { fileName?: string }).fileName !== undefined || (current as { imports?: readonly AstNode[] }).imports !== undefined) {
      return current as ({ jsxNamespaceSymbol?: AstSymbol; jsxNamespace?: string; jsxImportSource?: string; imports?: readonly AstNode[] } & AstNode);
    }
    current = parentOf(current);
  }
  return undefined;
}

function membersOf(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return (symbol as { members?: SymbolTable } | undefined)?.members;
}

function exportsOf(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return (symbol as { exports?: SymbolTable } | undefined)?.exports;
}

function symbolName(symbol: AstSymbol | undefined): string {
  return (symbol as { name?: string } | undefined)?.name ?? "";
}

function entityNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const text = (node as { text?: string }).text;
  if (text !== undefined) return text;
  const left = entityNameText((node as { left?: AstNode; expression?: AstNode }).left ?? (node as { expression?: AstNode }).expression);
  const right = entityNameText((node as { right?: AstNode; name?: AstNode }).right ?? (node as { name?: AstNode }).name);
  return left.length === 0 ? right : right.length === 0 ? left : `${left}.${right}`;
}

function tagNameOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { tagName?: AstNode } | undefined)?.tagName;
}

function attributesOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { attributes?: AstNode } | undefined)?.attributes;
}

function openingElementOf(node: AstNode): AstNode | undefined {
  return (node as { openingElement?: AstNode }).openingElement;
}

function openingFragmentOf(node: AstNode): AstNode | undefined {
  return (node as { openingFragment?: AstNode }).openingFragment;
}

function jsxChildrenOf(node: AstNode | undefined): readonly AstNode[] {
  const children = (node as { children?: readonly AstNode[] | { nodes?: readonly AstNode[] } } | undefined)?.children;
  return nodeArrayOrList(children);
}

function jsxAttributeProperties(node: AstNode | undefined): readonly AstNode[] {
  const props = (node as { properties?: readonly AstNode[] | { nodes?: readonly AstNode[] } } | undefined)?.properties;
  return nodeArrayOrList(props);
}

function nodeArrayOrList(value: readonly AstNode[] | { nodes?: readonly AstNode[] } | undefined): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { nodes?: readonly AstNode[] }).nodes ?? [];
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { expression?: AstNode } | undefined)?.expression;
}

function initializerOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { initializer?: AstNode } | undefined)?.initializer;
}

function spreadTokenOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { dotDotDotToken?: AstNode } | undefined)?.dotDotDotToken;
}

function propertyNameText(node: AstNode): string {
  return entityNameText((node as { name?: AstNode }).name ?? node);
}

function moduleSpecifierText(node: AstNode): string {
  return entityNameText((node as { moduleSpecifier?: AstNode }).moduleSpecifier);
}

function isOpeningFragment(node: AstNode): boolean {
  return (node as { tagName?: AstNode; attributes?: AstNode }).tagName === undefined
    && (node as { attributes?: AstNode }).attributes === undefined;
}

function isJsxOpeningLikeElement(node: AstNode): boolean {
  return tagNameOf(node) !== undefined && attributesOf(node) !== undefined;
}

function isJsxSpreadAttribute(node: AstNode): boolean {
  return expressionOf(node) !== undefined && propertyNameText(node).length === 0;
}

function isJsxText(node: AstNode): boolean {
  return (node as { containsOnlyTriviaWhiteSpaces?: boolean; text?: string }).containsOnlyTriviaWhiteSpaces !== undefined
    || ((node as { kind?: number }).kind ?? 0) === 284;
}

function isWhitespaceJsxText(node: AstNode): boolean {
  return (node as { containsOnlyTriviaWhiteSpaces?: boolean }).containsOnlyTriviaWhiteSpaces === true
    || ((node as { text?: string }).text ?? "").trim().length === 0;
}

function isJsxExpression(node: AstNode): boolean {
  return expressionOf(node) !== undefined || ((node as { kind?: number }).kind ?? 0) === 285;
}

function isJsxElementNode(node: AstNode): boolean {
  return openingElementOf(node) !== undefined;
}

function isJsxSelfClosingNode(node: AstNode): boolean {
  return tagNameOf(node) !== undefined && attributesOf(node) !== undefined && jsxChildrenOf(node).length === 0;
}

function isJsxFragmentNode(node: AstNode): boolean {
  return openingFragmentOf(node) !== undefined;
}

function hasSemanticJsxChildren(node: AstNode | undefined): boolean {
  return jsxChildrenOf(node).some((child) => !isJsxText(child) || !isWhitespaceJsxText(child));
}

function typeOfNode(node: AstNode): Type {
  return (node as { checkedType?: Type; type?: Type }).checkedType
    ?? (node as { checkedType?: Type; type?: Type }).type
    ?? intrinsicType(TypeFlags.Any, "any");
}

function propertyOfType(type: Type, name: string): AstSymbol | undefined {
  return membersOf(type.symbol)?.get(name)
    ?? (type.data as ObjectType | UnionOrIntersectionType | undefined)?.declaredProperties?.find((property) => symbolName(property) === name)
    ?? ((type.data as UnionOrIntersectionType | undefined)?.propertyCache?.get(name));
}

function propertyTypeOfType(type: Type | undefined, name: string): Type | undefined {
  return getTypeOfSymbol(type === undefined ? undefined : propertyOfType(type, name));
}

function propertiesOfType(type: Type): readonly AstSymbol[] {
  return [
    ...membersOf(type.symbol)?.values() ?? [],
    ...(type.data as ObjectType | undefined)?.declaredProperties ?? [],
  ];
}

function apparentType(type: Type): Type {
  return (type.data as { constraint?: Type } | undefined)?.constraint ?? type;
}

function constituentTypes(type: Type): readonly Type[] | undefined {
  return (type.data as UnionOrIntersectionType | undefined)?.types;
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as ObjectType | UnionOrIntersectionType | undefined)?.objectFlags ?? 0;
}

function singlePropertyName(symbol: AstSymbol | undefined): string | undefined {
  const members = membersOf(symbol);
  if (members === undefined || members.size === 0) return undefined;
  return members.keys().next().value;
}

function lookupSymbolInScope(location: AstNode | undefined, name: string, meaning: number): AstSymbol | undefined {
  let current = location;
  while (current !== undefined) {
    const locals = (current as { locals?: SymbolTable }).locals;
    const symbol = locals?.get(name);
    if (symbol !== undefined && (((symbol.flags ?? 0) & meaning) !== 0)) return symbol;
    current = parentOf(current);
  }
  return undefined;
}

function syntheticSymbol(name: string, type: Type, declaration?: AstNode): AstSymbol {
  return {
    name,
    escapedName: name,
    flags: SymbolFlags.Property,
    declarations: declaration === undefined ? [] : [declaration],
    synthetic: true,
    syntheticType: type,
  } as AstSymbol & { synthetic: true; syntheticType: Type };
}

function syntheticSignature(parameters: readonly AstSymbol[], returnType: Type): Signature {
  return {
    flags: 0,
    parameters,
    resolvedReturnType: returnType,
    minArgumentCount: parameters.filter((parameter) => ((parameter.flags ?? 0) & SymbolFlags.Optional) === 0).length,
  };
}

function anonymousObjectType(members: SymbolTable, objectFlags: ObjectFlags): Type {
  const symbol: AstSymbol = {
    name: "__jsxAttributes",
    escapedName: "__jsxAttributes",
    flags: SymbolFlags.TypeLiteral,
    declarations: [],
    members,
  };
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    symbol,
    data: {
      objectFlags,
      declaredProperties: [...members.values()],
    },
  };
}

function unionOrArrayType(types: readonly Type[]): Type {
  if (types.length === 0) return intrinsicType(TypeFlags.Undefined, "undefined");
  if (types.length === 1) return types[0]!;
  return {
    flags: TypeFlags.Object,
    id: nextSyntheticTypeId(),
    symbol: { name: "Array", escapedName: "Array", flags: SymbolFlags.Interface, declarations: [] },
    data: {
      objectFlags: ObjectFlags.Reference,
      elementType: unionType(types),
    },
  };
}

function unionType(types: readonly Type[]): Type {
  return {
    flags: TypeFlags.Union,
    id: nextSyntheticTypeId(),
    data: {
      types,
      objectFlags: ObjectFlags.None,
    },
  };
}

function stringLiteralType(value: string): Type {
  return { flags: TypeFlags.StringLiteral, id: nextSyntheticTypeId(), data: { value } };
}

function intrinsicType(flags: TypeFlags, intrinsicName: string): Type {
  return {
    flags,
    id: nextSyntheticTypeId(),
    data: {
      intrinsicName,
      objectFlags: ObjectFlags.None,
    },
  };
}

function literalValue(type: Type): unknown {
  return (type.data as { value?: unknown } | undefined)?.value;
}

function typeName(type: Type): string {
  return symbolName(type.symbol) || (type.data as { intrinsicName?: string } | undefined)?.intrinsicName || `type#${type.id}`;
}

function recordDiagnostic(node: AstNode, message: string): void {
  const diagnostics = (sourceFileOf(node) as { diagnostics?: string[] } | undefined)?.diagnostics;
  diagnostics?.push(message);
}

let syntheticTypeId = -1;
function nextSyntheticTypeId(): number {
  return syntheticTypeId--;
}
