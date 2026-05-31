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
  checkExpressionWithContextualType?(node: AstNode, contextualType: Type | undefined): Type;
  getContextualType?(node: AstNode): Type | undefined;
  isTypeAssignableTo?(source: Type, target: Type): boolean;
  getStringLiteralType?(value: string): Type;
  getNumberLiteralType?(value: number): Type;
  anyType?: Type;
  errorType?: Type;
  neverType?: Type;
  nullType?: Type;
  booleanTrueType?: Type;
  stringType?: Type;
  jsxNamespace?: string;
  jsxImplicitImportBase?: string;
  jsxRuntimeImportSpecifier?(file: AstNode | undefined): readonly [moduleReference: string, specifier: AstNode | undefined];
}

export interface JsxInferenceContext {
  readonly inferences: unknown;
  readonly inferredTypes?: readonly Type[];
}

export interface JsxElaborationElement {
  readonly errorNode?: AstNode;
  readonly innerExpression?: AstNode;
  readonly nameType: Type;
  readonly createDiagnostic?: (node: AstNode) => string;
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
    const implicit = this.getJsxNamespaceContainerForImplicitImport(location);
    const implicitNamespace = exportsOf(implicit)?.get(JsxNames.JSX) ?? membersOf(implicit)?.get(JsxNames.JSX);
    if (implicitNamespace !== undefined) return implicitNamespace;
    const namespaceName = this.getJsxNamespace(location);
    return this.host.resolveName?.(location, namespaceName, SymbolFlags.Namespace | SymbolFlags.Value)
      ?? lookupSymbolInScope(location, namespaceName, SymbolFlags.Namespace | SymbolFlags.Value);
  }
  getJsxNamespace(location: AstNode | undefined): string {
    const file = sourceFileOf(location);
    const local = this.getLocalJsxNamespace(file);
    if (local.length !== 0) return local;
    return file?.jsxNamespace
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
  getLocalJsxNamespace(file: AstNode | undefined): string {
    const cached = (file as { localJsxNamespace?: string } | undefined)?.localJsxNamespace;
    if (cached !== undefined) return cached;
    const pragma = pragmaValue(file, "jsx");
    if (pragma === undefined) return "";
    const entity = this.parseIsolatedEntityName(pragma);
    return firstIdentifierText(entity);
  }
  getJsxNamespaceContainerForImplicitImport(location: AstNode | undefined): AstSymbol | undefined {
    const file = sourceFileOf(location);
    const cached = (file as { jsxImplicitImportContainer?: AstSymbol } | undefined)?.jsxImplicitImportContainer;
    if (cached !== undefined) return cached;
    const [moduleReference] = this.getJSXRuntimeImportSpecifier(file);
    if (moduleReference.length === 0) return undefined;
    return this.getResolvedJsxRuntimeImports(location).find(symbol =>
      symbolName(symbol) === moduleReference || moduleSpecifierText(symbol.declarations?.[0] ?? syntheticNode()) === moduleReference,
    );
  }
  getJSXRuntimeImportSpecifier(file: AstNode | undefined): readonly [moduleReference: string, specifier: AstNode | undefined] {
    const hostSpecifier = this.host.jsxRuntimeImportSpecifier?.(file);
    if (hostSpecifier !== undefined) return hostSpecifier;
    const importSource = sourceFileOf(file)?.jsxImportSource ?? this.host.jsxImplicitImportBase ?? "";
    if (importSource.length === 0) return ["", undefined];
    const runtime = jsxRuntimeMode(file) === "development" ? "jsx-dev-runtime" : "jsx-runtime";
    return [`${importSource}/${runtime}`, undefined];
  }
  parseIsolatedEntityName(name: string): AstNode | undefined {
    if (name.trim().length === 0) return undefined;
    const parts = name.split(".").filter(part => part.length > 0);
    if (parts.length === 0) return undefined;
    let node: AstNode = syntheticNamedNode(parts[0]!);
    for (const part of parts.slice(1)) node = syntheticQualifiedName(node, syntheticNamedNode(part));
    markAsSynthetic(node);
    return node;
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
    this.checkJsxElementDeferred(node);
    return this.getJsxElementTypeAt(node);
  }
  checkJsxElementDeferred(node: AstNode): void {
    const openingElement = openingElementOf(node) ?? node;
    this.checkJsxOpeningLikeElementOrOpeningFragment(openingElement);
    const closingTag = closingTagNameOf(node);
    if (closingTag !== undefined) {
      if (this.isJsxIntrinsicTagName(closingTag)) {
        this.getIntrinsicTagSymbol(closingTag);
      } else {
        this.checkTagName(closingTag);
      }
    }
    this.checkJsxChildren(node);
  }
  checkJsxSelfClosingElement(node: AstNode): Type {
    this.checkJsxSelfClosingElementDeferred(node);
    return this.getJsxElementTypeAt(node);
  }
  checkJsxSelfClosingElementDeferred(node: AstNode): void {
    this.checkJsxOpeningLikeElementOrOpeningFragment(node);
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
  inferJsxTypeArguments(node: AstNode, signature: Signature, checkMode: number, context: JsxInferenceContext): readonly Type[] {
    void checkMode;
    const paramType = this.getEffectiveFirstArgumentForJsxSignature(signature, node);
    const attributesType = this.host.checkExpressionWithContextualType?.(attributesOf(node) ?? node, paramType)
      ?? this.createJsxAttributesTypeFromAttributesProperty(node);
    if (paramType !== undefined) rememberInference(context, attributesType, paramType);
    return context.inferredTypes ?? [];
  }
  getContextualTypeForJsxExpression(node: AstNode, contextFlags: number): Type | undefined {
    const parent = parentOf(node);
    if (parent === undefined) return undefined;
    if (isJsxAttributeLike(parent)) return this.host.getContextualType?.(node);
    if (isJsxElementNode(parent)) return this.getContextualTypeForChildJsxExpression(parent, node, contextFlags);
    return undefined;
  }
  getContextualJsxElementAttributesType(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    const contextual = this.host.getContextualType?.(node);
    if (contextual !== undefined && contextual !== this.anyType()) return contextual;
    const signature = this.resolveJsxOpeningLikeElement(node, []);
    return signature === undefined ? undefined : this.getEffectiveFirstArgumentForJsxSignature(signature, node);
  }
  getContextualTypeForChildJsxExpression(node: AstNode, child: AstNode, contextFlags: number): Type | undefined {
    const attributesType = this.getContextualJsxElementAttributesType(openingElementOf(node) ?? node, contextFlags);
    const namespace = this.getJsxNamespaceAt(node);
    const childrenPropertyName = namespace === undefined ? "children" : this.getJsxElementChildrenPropertyName(namespace);
    if (attributesType === undefined || childrenPropertyName === undefined || childrenPropertyName.length === 0) return undefined;
    const childFieldType = propertyTypeOfType(attributesType, childrenPropertyName);
    if (childFieldType === undefined) return undefined;
    const realChildren = semanticJsxChildren(node);
    if (realChildren.length <= 1) return childFieldType;
    const childIndex = realChildren.indexOf(child);
    if (childIndex < 0) return undefined;
    return this.mapType(childFieldType, type =>
      this.isArrayLikeType(type)
        ? this.getIndexedAccessType(type, this.getNumberLiteralType(childIndex))
        : type,
    );
  }
  discriminateContextualTypeByJSXAttributes(node: AstNode, contextualType: Type): Type {
    const discriminants = jsxAttributeProperties(node)
      .filter(attribute => !isJsxSpreadAttribute(attribute))
      .map(attribute => propertyNameText(attribute))
      .filter(name => propertyOfType(contextualType, name) !== undefined);
    if (discriminants.length === 0) return contextualType;
    const members = discriminants
      .map(name => propertyTypeOfType(contextualType, name))
      .filter((type): type is Type => type !== undefined);
    return members.length === 0 ? contextualType : this.getIntersectionType([contextualType, ...members]);
  }
  elaborateJsxComponents(node: AstNode, source: Type, target: Type, relation: number, diagnosticOutput: string[]): boolean {
    void relation;
    let reportedError = false;
    for (const prop of jsxAttributeProperties(node)) {
      if (isJsxSpreadAttribute(prop) || isHyphenatedJsxName(propertyNameText(prop))) continue;
      const targetType = propertyTypeOfType(target, propertyNameText(prop));
      const sourceType = initializerOf(prop) === undefined ? this.trueType() : this.checkJsxAttribute(prop);
      if (targetType !== undefined && !this.isTypeAssignableTo(sourceType, targetType)) {
        diagnosticOutput.push(`JSX property ${propertyNameText(prop)} has type ${typeName(sourceType)} but expected ${typeName(targetType)}.`);
        reportedError = true;
      }
      if (propertyTypeOfType(source, propertyNameText(prop)) === undefined) {
        diagnosticOutput.push(`JSX property ${propertyNameText(prop)} is missing from source attributes.`);
        reportedError = true;
      }
    }
    const containingElement = parentOf(parentOf(node));
    if (containingElement === undefined || !hasSemanticJsxChildren(containingElement)) return reportedError;
    const namespace = this.getJsxNamespaceAt(node);
    const childrenPropName = namespace === undefined ? "children" : this.getJsxElementChildrenPropertyName(namespace) ?? "children";
    const childrenTargetType = propertyTypeOfType(target, childrenPropName);
    if (childrenTargetType === undefined) return reportedError;
    const children = [...this.generateJsxChildren(containingElement, () =>
      `Text in JSX has type string but ${childrenPropName} expects ${typeName(childrenTargetType)}.`,
    )];
    return this.elaborateIterableOrArrayLikeTargetElementwise(children, source, childrenTargetType, relation, diagnosticOutput)
      || reportedError;
  }
  generateJsxChildren(node: AstNode, getInvalidTextDiagnostic: () => string): Iterable<JsxElaborationElement> {
    const checker = this;
    return {
      *[Symbol.iterator](): Iterator<JsxElaborationElement> {
        let memberOffset = 0;
        const children = jsxChildrenOf(node);
        for (let index = 0; index < children.length; index++) {
          const child = children[index]!;
          const element = checker.getElaborationElementForJsxChild(
            child,
            checker.getNumberLiteralType(index - memberOffset),
            getInvalidTextDiagnostic,
          );
          if (element.errorNode !== undefined) {
            yield element;
          } else {
            memberOffset++;
          }
        }
      },
    };
  }
  getElaborationElementForJsxChild(child: AstNode, nameType: Type, getInvalidTextDiagnostic: () => string): JsxElaborationElement {
    if (isJsxExpression(child)) {
      const expression = expressionOf(child);
      return expression === undefined ? { errorNode: child, nameType } : { errorNode: child, innerExpression: expression, nameType };
    }
    if (isJsxText(child)) {
      if (isWhitespaceJsxText(child)) return { nameType };
      return { errorNode: child, nameType, createDiagnostic: () => getInvalidTextDiagnostic() };
    }
    if (isJsxElementNode(child) || isJsxSelfClosingNode(child) || isJsxFragmentNode(child)) {
      return { errorNode: child, innerExpression: child, nameType };
    }
    return { errorNode: child, innerExpression: child, nameType };
  }
  elaborateIterableOrArrayLikeTargetElementwise(
    iterator: Iterable<JsxElaborationElement>,
    source: Type,
    target: Type,
    relation: number,
    diagnosticOutput: string[],
  ): boolean {
    void source;
    void relation;
    let reported = false;
    for (const child of iterator) {
      if (child.errorNode === undefined) continue;
      const actual = child.innerExpression === undefined ? this.stringType() : typeOfNode(child.innerExpression);
      const expected = this.isArrayLikeType(target)
        ? this.getIndexedAccessType(target, child.nameType)
        : target;
      if (!this.isTypeAssignableTo(actual, expected)) {
        diagnosticOutput.push(child.createDiagnostic?.(child.errorNode) ?? `JSX child type ${typeName(actual)} is not assignable to ${typeName(expected)}.`);
        reported = true;
      }
    }
    return reported;
  }
  getSuggestedSymbolForNonexistentJSXAttribute(node: AstNode, target: Type): AstSymbol | undefined {
    const name = propertyNameText(node);
    if (name.length === 0) return undefined;
    let best: AstSymbol | undefined;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const property of propertiesOfType(target)) {
      const distance = levenshtein(name, symbolName(property));
      if (distance < bestDistance) {
        best = property;
        bestDistance = distance;
      }
    }
    return bestDistance <= Math.max(2, Math.floor(name.length / 3)) ? best : undefined;
  }
  checkApplicableSignatureForJsxCallLikeElement(node: AstNode, signature: Signature, relation: number): boolean {
    return this.checkApplicableSignatureForJsxOpeningLikeElement(node, signature, relation);
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
    return this.getNameFromJsxElementAttributesContainer(JsxNames.ElementChildrenAttributeNameContainer, jsxNamespace)
      ?? singlePropertyName(membersOf(jsxNamespace)?.get(JsxNames.ElementChildrenAttributeNameContainer))
      ?? "children";
  }
  getJsxElementPropertiesName(jsxNamespace: AstSymbol): string | undefined {
    return this.getNameFromJsxElementAttributesContainer(JsxNames.ElementAttributesPropertyNameContainer, jsxNamespace)
      ?? singlePropertyName(membersOf(jsxNamespace)?.get(JsxNames.ElementAttributesPropertyNameContainer))
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
    const propsType = this.getJsxPropsTypeForSignatureFromMember(signature, forcedLookup);
    return propsType === undefined ? undefined : this.getJsxManagedAttributesFromLocatedAttributes(context, namespace, propsType);
  }
  getJsxPropsTypeFromCallSignature(signature: Signature, context: AstNode): Type | undefined {
    return this.getJsxManagedAttributesFromLocatedAttributes(
      context,
      this.getJsxNamespaceAt(context),
      getTypeOfSymbol(signature.parameters[0]) ?? this.unknownType(),
    );
  }
  getJsxPropsTypeForSignatureFromMember(signature: Signature, forcedLookupLocation: string): Type | undefined {
    const instanceType = signature.resolvedReturnType;
    if (instanceType === undefined || (instanceType.flags & TypeFlags.Any) !== 0) return instanceType;
    return forcedLookupLocation.length === 0 ? instanceType : propertyTypeOfType(instanceType, forcedLookupLocation);
  }
  getJsxManagedAttributesFromLocatedAttributes(context: AstNode, namespace: AstSymbol | undefined, attributesType: Type): Type {
    const managedSymbol = this.getJsxLibraryManagedAttributes(namespace);
    if (managedSymbol === undefined) return attributesType;
    const constructorType = this.getStaticTypeOfReferencedJsxConstructor(context);
    return this.instantiateAliasOrInterfaceWithDefaults(managedSymbol, [constructorType, attributesType], isInJavaScriptFile(context))
      ?? attributesType;
  }
  instantiateAliasOrInterfaceWithDefaults(managedSymbol: AstSymbol, typeArguments: readonly Type[], inJavaScript: boolean): Type | undefined {
    void inJavaScript;
    const declaredType = getTypeOfSymbol(managedSymbol);
    if (declaredType === undefined) return undefined;
    const data = declaredType.data as { typeParameters?: readonly Type[]; target?: Type; objectFlags?: ObjectFlags } | undefined;
    const typeParameters = data?.typeParameters ?? [];
    if (typeArguments.length > typeParameters.length && typeParameters.length !== 0) return undefined;
    if (typeArguments.length === 0) return declaredType;
    return {
      ...declaredType,
      id: nextSyntheticTypeId(),
      data: {
        ...data,
        target: declaredType,
        resolvedTypeArguments: fillMissingTypes(typeArguments, typeParameters, this.anyType()),
      },
    };
  }
  getJsxLibraryManagedAttributes(jsxNamespace: AstSymbol | undefined): AstSymbol | undefined {
    return exportsOf(jsxNamespace)?.get(JsxNames.LibraryManagedAttributes)
      ?? membersOf(jsxNamespace)?.get(JsxNames.LibraryManagedAttributes);
  }
  getJsxElementTypeSymbol(jsxNamespace: AstSymbol | undefined): AstSymbol | undefined {
    return exportsOf(jsxNamespace)?.get(JsxNames.ElementType)
      ?? membersOf(jsxNamespace)?.get(JsxNames.ElementType);
  }
  getNameFromJsxElementAttributesContainer(nameOfAttributePropertyContainer: string, jsxNamespace: AstSymbol | undefined): string | undefined {
    const container = exportsOf(jsxNamespace)?.get(nameOfAttributePropertyContainer)
      ?? membersOf(jsxNamespace)?.get(nameOfAttributePropertyContainer);
    const type = getTypeOfSymbol(container);
    if (type === undefined) return undefined;
    const properties = propertiesOfType(type);
    if (properties.length === 0) return "";
    if (properties.length === 1) return symbolName(properties[0]);
    recordDiagnostic(container?.declarations?.[0] ?? syntheticNode(), `Global type JSX.${nameOfAttributePropertyContainer} may not have more than one property.`);
    return undefined;
  }
  getStaticTypeOfReferencedJsxConstructor(context: AstNode): Type {
    if (isOpeningFragment(context)) return this.getJSXFragmentType(context);
    const tagName = tagNameOf(context);
    if (tagName !== undefined && this.isJsxIntrinsicTagName(tagName)) {
      return this.getOrCreateTypeFromSignature(this.createSignatureForJSXIntrinsic(context, this.getIntrinsicAttributesTypeFromJsxOpeningLikeElement(context)));
    }
    const tagType = tagName === undefined ? this.errorType() : this.checkTagName(tagName);
    if ((tagType.flags & TypeFlags.StringLiteral) !== 0) {
      const literal = literalValue(tagType);
      const intrinsic = typeof literal === "string" ? this.getIntrinsicAttributesTypeFromStringLiteralType(literal) : undefined;
      return intrinsic === undefined ? this.errorType() : this.getOrCreateTypeFromSignature(this.createSignatureForJSXIntrinsic(context, intrinsic));
    }
    return tagType;
  }
  createSignatureForJSXIntrinsic(node: AstNode, result: Type): Signature {
    const elementSymbol = this.getJsxElementTypeSymbol(this.getJsxNamespaceAt(node));
    const elementType = getTypeOfSymbol(elementSymbol) ?? this.errorType();
    return syntheticSignature([syntheticSymbol("props", result, node)], elementType);
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

  getJsxStatelessElementTypeAt(location: AstNode): Type | undefined {
    const elementType = this.getJsxElementTypeAt(location);
    return elementType === this.errorType() ? undefined : this.getUnionType([elementType, this.nullType()]);
  }

  getJsxElementClassTypeAt(location: AstNode): Type | undefined {
    const type = this.getJsxType(JsxNames.ElementClass, location);
    return type === this.errorType() ? undefined : type;
  }

  getJsxElementTypeTypeAt(location: AstNode): Type | undefined {
    const symbol = this.getJsxElementTypeSymbol(this.getJsxNamespaceAt(location));
    const type = symbol === undefined ? undefined : this.instantiateAliasOrInterfaceWithDefaults(symbol, [], isInJavaScriptFile(location));
    return type === this.errorType() ? undefined : type;
  }

  getOrCreateTypeFromSignature(signature: Signature): Type {
    return {
      flags: TypeFlags.Object,
      id: nextSyntheticTypeId(),
      symbol: syntheticSymbol("__jsxSignatureType", signature.resolvedReturnType ?? this.anyType(), signature.declaration),
      data: {
        objectFlags: ObjectFlags.Anonymous,
        declaredCallSignatures: [signature],
        declaredProperties: [],
      },
    };
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

  getStringLiteralType(value: string): Type {
    return this.host.getStringLiteralType?.(value) ?? stringLiteralType(value);
  }

  getNumberLiteralType(value: number): Type {
    return this.host.getNumberLiteralType?.(value) ?? { flags: TypeFlags.NumberLiteral, id: nextSyntheticTypeId(), data: { value } };
  }

  getUnionType(types: readonly Type[]): Type {
    return unionType(types);
  }

  getIntersectionType(types: readonly Type[]): Type {
    return {
      flags: TypeFlags.Intersection,
      id: nextSyntheticTypeId(),
      data: {
        types,
        objectFlags: ObjectFlags.None,
      },
    };
  }

  getIndexedAccessType(type: Type, indexType: Type): Type {
    if (this.isArrayLikeType(type)) {
      return (type.data as { elementType?: Type } | undefined)?.elementType ?? this.anyType();
    }
    const literal = literalValue(indexType);
    if (typeof literal === "string") return propertyTypeOfType(type, literal) ?? this.errorType();
    return this.errorType();
  }

  filterType(type: Type, predicate: (type: Type) => boolean): Type {
    if ((type.flags & TypeFlags.Union) === 0) return predicate(type) ? type : this.neverType();
    const filtered = constituentTypes(type)?.filter(predicate) ?? [];
    return filtered.length === 0 ? this.neverType() : filtered.length === 1 ? filtered[0]! : this.getUnionType(filtered);
  }

  mapType(type: Type, mapper: (type: Type) => Type): Type {
    if ((type.flags & TypeFlags.Union) === 0) return mapper(type);
    return this.getUnionType((constituentTypes(type) ?? []).map(mapper));
  }

  anyType(): Type { return this.host.anyType ?? intrinsicType(TypeFlags.Any, "any"); }
  unknownType(): Type { return intrinsicType(TypeFlags.Unknown, "unknown"); }
  errorType(): Type { return this.host.errorType ?? intrinsicType(TypeFlags.Any, "error"); }
  neverType(): Type { return this.host.neverType ?? intrinsicType(TypeFlags.Never, "never"); }
  nullType(): Type { return this.host.nullType ?? intrinsicType(TypeFlags.Null, "null"); }
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

function sourceFileOf(node: AstNode | undefined): ({ jsxNamespaceSymbol?: AstSymbol; jsxNamespace?: string; jsxImportSource?: string; imports?: readonly AstNode[]; fileName?: string } & AstNode) | undefined {
  let current = node;
  while (current !== undefined) {
    if ((current as { fileName?: string }).fileName !== undefined || (current as { imports?: readonly AstNode[] }).imports !== undefined) {
      return current as ({ jsxNamespaceSymbol?: AstSymbol; jsxNamespace?: string; jsxImportSource?: string; imports?: readonly AstNode[]; fileName?: string } & AstNode);
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

function closingTagNameOf(node: AstNode): AstNode | undefined {
  return (node as { closingElement?: { tagName?: AstNode }; closingFragment?: AstNode }).closingElement?.tagName;
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

function isJsxAttributeLike(node: AstNode): boolean {
  return propertyNameText(node).length !== 0 || isJsxSpreadAttribute(node) || parentOf(node) !== undefined && attributesOf(parentOf(node)) === node;
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

function semanticJsxChildren(node: AstNode | undefined): readonly AstNode[] {
  return jsxChildrenOf(node).filter(child => !isJsxText(child) || !isWhitespaceJsxText(child));
}

function isHyphenatedJsxName(name: string): boolean {
  return name.includes("-");
}

function rememberInference(context: JsxInferenceContext, source: Type, target: Type): void {
  const mutable = context as { inferencePairs?: { source: Type; target: Type }[] };
  mutable.inferencePairs ??= [];
  mutable.inferencePairs.push({ source, target });
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

function syntheticNode(): AstNode {
  return { kind: -1, pos: -1, end: -1 } as unknown as AstNode;
}

function syntheticNamedNode(text: string): AstNode {
  return { ...syntheticNode(), text } as AstNode;
}

function syntheticQualifiedName(left: AstNode, right: AstNode): AstNode {
  return { ...syntheticNode(), left, right } as AstNode;
}

export function markAsSynthetic(node: AstNode): boolean {
  const mutable = node as { pos?: number; end?: number; children?: readonly AstNode[]; left?: AstNode; right?: AstNode; name?: AstNode; expression?: AstNode };
  mutable.pos = -1;
  mutable.end = -1;
  for (const child of [
    ...nodeArrayOrList(mutable.children),
    mutable.left,
    mutable.right,
    mutable.name,
    mutable.expression,
  ]) {
    if (child !== undefined) markAsSynthetic(child);
  }
  return false;
}

function firstIdentifierText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const text = (node as { text?: string }).text;
  if (text !== undefined) return text;
  return firstIdentifierText((node as { left?: AstNode; expression?: AstNode }).left ?? (node as { expression?: AstNode }).expression);
}

function pragmaValue(file: AstNode | undefined, name: string): string | undefined {
  const pragmas = (file as { pragmas?: ReadonlyMap<string, { value?: string; args?: Record<string, { value?: string }> }> } | undefined)?.pragmas;
  const pragma = pragmas?.get(name);
  return pragma?.value ?? pragma?.args?.["factory"]?.value;
}

function jsxRuntimeMode(file: AstNode | undefined): "production" | "development" {
  return (file as { jsxRuntime?: "production" | "development" } | undefined)?.jsxRuntime ?? "production";
}

function isInJavaScriptFile(node: AstNode | undefined): boolean {
  const fileName = sourceFileOf(node)?.fileName ?? "";
  return fileName.endsWith(".js") || fileName.endsWith(".jsx") || fileName.endsWith(".mjs") || fileName.endsWith(".cjs");
}

function fillMissingTypes(types: readonly Type[], parameters: readonly Type[], fallback: Type): readonly Type[] {
  if (types.length >= parameters.length) return types;
  const out = [...types];
  while (out.length < parameters.length) out.push(fallback);
  return out;
}

function levenshtein(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 0; leftIndex < left.length; leftIndex++) {
    const current = [leftIndex + 1];
    for (let rightIndex = 0; rightIndex < right.length; rightIndex++) {
      const substitution = previous[rightIndex]! + (left[leftIndex] === right[rightIndex] ? 0 : 1);
      current[rightIndex + 1] = Math.min(
        current[rightIndex]! + 1,
        previous[rightIndex + 1]! + 1,
        substitution,
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length]!;
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
