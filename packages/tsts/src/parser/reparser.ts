import { Kind, NodeFlags, nodeParent, type ModifierList, type Node, type NodeArray } from "../ast/index.js";

export interface ReparseClone {
  readonly original: Node;
  readonly clone: Node;
}

export interface JSDocInfo {
  readonly parent: Node;
  readonly jsDocs: readonly Node[];
}

export interface ReparseState {
  readonly clones: ReparseClone[];
  readonly syntheticNodes: Node[];
  readonly reparseList: Node[];
  readonly jsDocInfos: JSDocInfo[];
  readonly contextFlags: number;
}

export function newReparseState(contextFlags = 0): ReparseState {
  return { clones: [], syntheticNodes: [], reparseList: [], jsDocInfos: [], contextFlags };
}

export function finishReparsedNode<T extends Node>(node: T, locationNode: Node): T {
  const mutable = node as Node & { flags?: number; pos?: number; end?: number; parent?: Node };
  const location = locationNode as Node & { pos?: number; end?: number };
  mutable.pos = location.pos;
  mutable.end = location.end;
  mutable.flags = ((mutable.flags ?? 0) | NodeFlags.Reparsed);
  overrideParentInImmediateChildren(node);
  return node;
}

export function finishMutatedNode<T extends Node>(node: T): T {
  overrideParentInImmediateChildren(node);
  return node;
}

export function addDeepCloneReparse<T extends Node>(state: ReparseState, node: T, clone?: T): T {
  const cloned = clone ?? deepCloneReparse(node);
  state.clones.push({ original: node, clone: cloned });
  return cloned;
}

export function reparseTags(state: ReparseState, parent: Node, jsDoc: readonly Node[]): void {
  for (const doc of jsDoc) {
    const tags = nodeListElements((doc as unknown as { tags?: NodeListLike<Node> }).tags);
    if (tags.length === 0) continue;
    const isLastDoc = doc === jsDoc[jsDoc.length - 1];
    for (const tag of tags) {
      reparseUnhosted(state, parent, tag, doc);
      if (isLastDoc) reparseHosted(state, parent, tag, doc);
    }
  }
}

export function reparseUnhosted(state: ReparseState, parent: Node, tag: Node, jsDoc?: Node): void {
  const owningDoc = jsDoc ?? tag;
  switch (tag.kind) {
    case Kind.JSDocTypedefTag: {
      const typeExpression = typeExpressionOf(tag);
      if (typeExpression === undefined) return;
      const name = addDeepCloneReparse(state, nameOf(tag) ?? tag);
      const typeAlias = syntheticNode(Kind.JSTypeAliasDeclaration, tag, {
        name,
        typeParameters: gatherTypeParameters(state, owningDoc, tag),
        type: reparseJSDocTypeExpressionOrLiteral(state, typeExpression),
      });
      finishReparsedNode(typeAlias, tag);
      state.jsDocInfos.push({ parent: typeAlias, jsDocs: [owningDoc] });
      markHasJSDoc(typeAlias);
      state.reparseList.push(typeAlias);
      break;
    }
    case Kind.JSDocCallbackTag: {
      const typeExpression = typeExpressionOf(tag);
      const fullName = (tag as unknown as { fullName?: Node }).fullName ?? nameOf(tag);
      if (typeExpression === undefined || fullName === undefined) return;
      const functionType = reparseJSDocSignature(state, typeExpression, tag, owningDoc, tag, undefined);
      const typeAlias = syntheticNode(Kind.JSTypeAliasDeclaration, tag, {
        name: addDeepCloneReparse(state, fullName),
        typeParameters: gatherTypeParameters(state, owningDoc, tag),
        type: functionType,
      });
      finishReparsedNode(typeAlias, tag);
      state.jsDocInfos.push({ parent: typeAlias, jsDocs: [owningDoc] });
      markHasJSDoc(typeAlias);
      state.reparseList.push(typeAlias);
      break;
    }
    case Kind.JSDocImportTag: {
      const importClause = (tag as unknown as { importClause?: Node }).importClause;
      const moduleSpecifier = (tag as unknown as { moduleSpecifier?: Node }).moduleSpecifier;
      if (importClause === undefined || moduleSpecifier === undefined) return;
      const clonedImportClause = addDeepCloneReparse(state, importClause) as Node & { phaseModifier?: Kind };
      clonedImportClause.phaseModifier = Kind.TypeKeyword;
      const declaration = syntheticNode(Kind.JSImportDeclaration, tag, {
        modifiers: deepCloneModifiers((tag as unknown as { modifiers?: ModifierList }).modifiers),
        importClause: clonedImportClause,
        moduleSpecifier: addDeepCloneReparse(state, moduleSpecifier),
        attributes: maybeClone(state, (tag as unknown as { attributes?: Node }).attributes),
      });
      finishReparsedNode(declaration, tag);
      state.reparseList.push(declaration);
      break;
    }
    case Kind.JSDocOverloadTag:
      if (isFunctionMethodOrConstructor(parent)) {
        const typeExpression = typeExpressionOf(tag);
        if (typeExpression !== undefined) {
          state.reparseList.push(reparseJSDocSignature(state, typeExpression, parent, owningDoc, tag, modifiersOf(parent)));
        }
      }
      break;
  }
}

export function reparseJSDocSignature(
  state: ReparseState,
  jsSignature: Node,
  fun: Node,
  jsDoc: Node,
  tag: Node,
  modifiers: ModifierList | undefined,
): Node {
  const signature = createSignatureShell(state, fun, tag, modifiers);
  if (tag.kind !== Kind.JSDocCallbackTag) {
    const typeParameters = gatherTypeParameters(state, jsDoc, tag);
    if (typeParameters !== undefined) {
      (signature as unknown as { typeParameters?: NodeArray<Node> }).typeParameters = typeParameters;
    }
  }
  const parameters: Node[] = [];
  for (const param of parametersOf(jsSignature)) {
    const parameter = reparseJSDocParameter(state, param);
    if (parameter === undefined) continue;
    finishReparsedNode(parameter, param);
    parameters.push(parameter);
    reparseJSDocComment(state, parameter, param);
  }
  (signature as unknown as { parameters?: NodeArray<Node> }).parameters = newNodeList(parameters);
  const returnType = typeOf(jsSignature);
  const returnTypeExpression = returnType === undefined ? undefined : typeExpressionOf(returnType);
  if (returnTypeExpression !== undefined) {
    (signature as unknown as { type?: Node }).type = addDeepCloneReparse(state, typeNodeOfExpression(returnTypeExpression));
  }
  finishReparsedNode(signature, tag.kind === Kind.JSDocOverloadTag ? (nameOf(tag) ?? tag) : jsSignature);
  return signature;
}

export function reparseJSDocTypeLiteral(state: ReparseState, typeNode: Node | undefined): Node | undefined {
  if (typeNode === undefined) return undefined;
  if (typeNode.kind !== Kind.JSDocTypeLiteral) return addDeepCloneReparse(state, typeNode);
  const properties: Node[] = [];
  const propertyTags = nodeListElements((typeNode as unknown as { jsDocPropertyTags?: NodeListLike<Node>; JSDocPropertyTags?: NodeListLike<Node> }).jsDocPropertyTags
    ?? (typeNode as unknown as { JSDocPropertyTags?: NodeListLike<Node> }).JSDocPropertyTags);
  for (const prop of propertyTags) {
    if (prop.kind !== Kind.JSDocPropertyTag && prop.kind !== Kind.JSDocParameterTag) continue;
    const propName = propertyTagName(prop);
    if (propName === undefined) continue;
    const property = syntheticNode(Kind.PropertySignature, prop, {
      name: addDeepCloneReparse(state, rightmostQualifiedName(propName)),
      questionToken: makeQuestionIfOptional(prop),
      type: reparseJSDocTypeLiteral(state, typeExpressionType(prop)),
    });
    finishReparsedNode(property, prop);
    properties.push(property);
    reparseJSDocComment(state, property, prop);
  }
  let literal = syntheticNode(Kind.TypeLiteral, typeNode, { members: newNodeList(properties) });
  finishReparsedNode(literal, typeNode);
  if ((typeNode as unknown as { isArrayType?: boolean }).isArrayType === true) {
    literal = syntheticNode(Kind.ArrayType, typeNode, { elementType: literal });
    finishReparsedNode(literal, typeNode);
  }
  return literal;
}

export function reparseJSDocComment(state: ReparseState, node: Node, tag: Node): void {
  const comment = (tag as unknown as { comment?: NodeListLike<Node>; commentList?: NodeListLike<Node> }).comment
    ?? (tag as unknown as { commentList?: NodeListLike<Node> }).commentList;
  const comments = nodeListElements(comment).map((entry) => addDeepCloneReparse(state, entry));
  if (comments.length === 0) return;
  const propJSDoc = syntheticNode(Kind.JSDoc, tag, { comment: newNodeList(comments) });
  finishReparsedNode(propJSDoc, tag);
  (propJSDoc as Node & { parent?: Node }).parent = node;
  state.jsDocInfos.push({ parent: node, jsDocs: [propJSDoc] });
  markHasJSDoc(node);
}

export function gatherTypeParameters(state: ReparseState, jsDoc: Node, tagWithTypeParameters: Node): NodeArray<Node> | undefined {
  const tags = nodeListElements((jsDoc as unknown as { tags?: NodeListLike<Node> }).tags);
  const stop = tags.indexOf(tagWithTypeParameters);
  if (stop < 0) return undefined;
  let start = 0;
  for (let index = 0; index < stop; index += 1) {
    const tag = tags[index]!;
    if (tag.kind === Kind.JSDocTypedefTag || tag.kind === Kind.JSDocCallbackTag || tag.kind === Kind.JSDocOverloadTag) {
      start = index + 1;
    }
  }
  const typeParameters: Node[] = [];
  for (let index = start; index < stop; index += 1) {
    const tag = tags[index]!;
    if (tag.kind !== Kind.JSDocTemplateTag) continue;
    const constraint = (tag as unknown as { constraint?: Node }).constraint;
    let first = true;
    for (const typeParameter of nodeListElements((tag as unknown as { typeParameters?: NodeListLike<Node> }).typeParameters)) {
      const cloned = addDeepCloneReparse(state, typeParameter) as Node & { constraint?: Node };
      if (constraint !== undefined && first) cloned.constraint = addDeepCloneReparse(state, constraint);
      first = false;
      finishReparsedNode(cloned, typeParameter);
      typeParameters.push(cloned);
    }
  }
  return typeParameters.length === 0 ? undefined : newNodeList(typeParameters);
}

export function reparseHosted(state: ReparseState, parent: Node, tag: Node, jsDoc?: Node): void {
  const owningDoc = jsDoc ?? tag;
  if (tag.kind === Kind.JSDocParameterTag) {
    const match = findMatchingParameter(parent, tag, owningDoc);
    if (match !== undefined) {
      const parameterType = typeExpressionType(tag);
      const reparsedType = parameterType === undefined ? undefined : reparseJSDocTypeLiteral(state, parameterType);
      if (reparsedType !== undefined) (match as Node & { type?: Node }).type = reparsedType;
      const questionToken = makeQuestionIfOptional(tag);
      if (questionToken !== undefined) (match as Node & { questionToken?: Node }).questionToken = questionToken;
      reparseJSDocComment(state, match, tag);
      finishMutatedNode(match);
    }
  } else if (tag.kind === Kind.JSDocReturnTag) {
    const returnType = typeExpressionType(tag);
    if (returnType !== undefined && isFunctionMethodOrConstructor(parent)) {
      (parent as Node & { type?: Node }).type = addDeepCloneReparse(state, returnType);
      finishMutatedNode(parent);
    }
  }
}

export function makeQuestionIfOptional(parameter: Node): Node | undefined {
  const isBracketed = (parameter as unknown as { isBracketed?: boolean }).isBracketed === true;
  const isOptional = (parameter as unknown as { isOptional?: boolean }).isOptional === true;
  return isBracketed || isOptional ? syntheticNode(Kind.QuestionToken, parameter, {}) : undefined;
}

export function findMatchingParameter(fun: Node, parameterTag: Node, _jsDoc: Node): Node | undefined {
  const tagName = propertyTagName(parameterTag);
  if (tagName === undefined) return undefined;
  const tagText = nameText(rightmostQualifiedName(tagName));
  return parametersOf(fun).find((parameter) => nameText(nameOf(parameter)) === tagText);
}

export function skipSatisfiesExpressions(node: Node): Node {
  let current = node;
  while (current.kind === Kind.SatisfiesExpression) {
    current = expressionOf(current) ?? current;
  }
  return current;
}

export function getFunctionLikeHost(host: Node): Node {
  let current: Node | undefined = host;
  while (current !== undefined) {
    if (isFunctionMethodOrConstructor(current)) return current;
    current = nodeParent(current);
  }
  return host;
}

export function makeNewCast(state: ReparseState, typeNode: Node | undefined, expression: Node, isAssertion: boolean): Node {
  const kind = isAssertion ? Kind.TypeAssertionExpression : Kind.AsExpression;
  const cast = syntheticNode(kind, expression, { type: typeNode, expression });
  return finishReparsedNode(cast, expression);
}

export function getClassLikeData(parent: Node): { readonly members?: NodeListLike<Node> } | undefined {
  return parent.kind === Kind.ClassDeclaration || parent.kind === Kind.ClassExpression ? parent as unknown as { members?: NodeListLike<Node> } : undefined;
}

interface NodeListLike<T extends Node> {
  readonly nodes?: readonly T[];
  readonly pos?: number;
  readonly end?: number;
}

function reparseJSDocTypeExpressionOrLiteral(state: ReparseState, typeExpression: Node): Node | undefined {
  const type = typeNodeOfExpression(typeExpression);
  return reparseJSDocTypeLiteral(state, type);
}

function reparseJSDocParameter(state: ReparseState, param: Node): Node | undefined {
  if (param.kind === Kind.JSDocThisTag) {
    const thisIdent = syntheticNode(Kind.Identifier, param, { text: "this" });
    const parameter = syntheticNode(Kind.Parameter, param, { name: thisIdent, type: typeExpressionType(param) });
    return parameter;
  }
  if (param.kind !== Kind.JSDocParameterTag && param.kind !== Kind.JSDocPropertyTag) return undefined;
  const name = propertyTagName(param);
  if (name === undefined || name.kind === Kind.QualifiedName) return undefined;
  let paramType = typeExpressionType(param);
  let dotDotDotToken: Node | undefined;
  if (paramType?.kind === Kind.JSDocVariadicType) {
    dotDotDotToken = syntheticNode(Kind.DotDotDotToken, param, {});
    paramType = reparseJSDocTypeLiteral(state, typeNodeOfExpression(paramType));
  } else {
    paramType = reparseJSDocTypeLiteral(state, paramType);
  }
  return syntheticNode(Kind.Parameter, param, {
    dotDotDotToken,
    name: addDeepCloneReparse(state, name),
    questionToken: makeQuestionIfOptional(param),
    type: paramType,
  });
}

function createSignatureShell(state: ReparseState, fun: Node, tag: Node, modifiers: ModifierList | undefined): Node {
  const common = { modifiers: deepCloneModifiers(modifiers), name: maybeClone(state, nameOf(fun)) };
  switch (fun.kind) {
    case Kind.FunctionDeclaration:
      return syntheticNode(Kind.FunctionDeclaration, tag, common);
    case Kind.MethodDeclaration:
      return syntheticNode(Kind.MethodDeclaration, tag, common);
    case Kind.Constructor:
      return syntheticNode(Kind.Constructor, tag, { modifiers: deepCloneModifiers(modifiers) });
    case Kind.JSDocCallbackTag:
      return syntheticNode(Kind.FunctionType, tag, { type: syntheticNode(Kind.AnyKeyword, tag, {}) });
    default:
      return syntheticNode(Kind.FunctionType, tag, { type: syntheticNode(Kind.AnyKeyword, tag, {}) });
  }
}

function deepCloneReparse<T extends Node>(node: T): T {
  const clone = cloneObjectGraph(node, new Map()) as T;
  overrideParentInImmediateChildren(clone);
  return clone;
}

function cloneObjectGraph(value: unknown, seen: Map<object, unknown>): unknown {
  if (typeof value !== "object" || value === null) return value;
  if (seen.has(value)) return seen.get(value as object);
  if (Array.isArray(value)) {
    const out: unknown[] = [];
    seen.set(value, out);
    for (const item of value) out.push(cloneObjectGraph(item, seen));
    return out;
  }
  const out: Record<string, unknown> = {};
  seen.set(value as object, out);
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (key === "parent" || key === "symbol" || key === "locals" || key === "flowNode") continue;
    out[key] = cloneObjectGraph(entry, seen);
  }
  return out;
}

function syntheticNode<T extends Node>(kind: Kind, location: Node, fields: Record<string, unknown>): T {
  const node = {
    kind,
    flags: ((location.flags ?? 0) | NodeFlags.Reparsed),
    pos: (location as unknown as { pos?: number }).pos,
    end: (location as unknown as { end?: number }).end,
    ...fields,
  } as unknown as T;
  overrideParentInImmediateChildren(node);
  return node;
}

function newNodeList<T extends Node>(nodes: readonly T[]): NodeArray<T> {
  const list = [...nodes] as unknown as NodeArray<T>;
  (list as unknown as { nodes?: readonly T[] }).nodes = list;
  return list;
}

function nodeListElements<T extends Node>(list: NodeListLike<T> | readonly T[] | undefined): readonly T[] {
  if (list === undefined) return [];
  if (Array.isArray(list)) return list;
  return (list as NodeListLike<T>).nodes ?? [];
}

function overrideParentInImmediateChildren(node: Node): void {
  for (const value of Object.values(node as unknown as Record<string, unknown>)) {
    if (isNode(value)) {
      (value as Node & { parent?: Node }).parent = node;
    } else if (Array.isArray(value)) {
      for (const item of value) if (isNode(item)) (item as Node & { parent?: Node }).parent = node;
    } else if (isNodeList(value)) {
      for (const item of value.nodes) (item as Node & { parent?: Node }).parent = node;
    }
  }
}

function isNode(value: unknown): value is Node {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { readonly nodes: readonly Node[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { nodes?: unknown }).nodes);
}

function maybeClone<T extends Node>(state: ReparseState, node: T | undefined): T | undefined {
  return node === undefined ? undefined : addDeepCloneReparse(state, node);
}

function deepCloneModifiers(modifiers: ModifierList | undefined): ModifierList | undefined {
  return modifiers === undefined ? undefined : deepCloneReparse(modifiers as unknown as Node) as unknown as ModifierList;
}

function markHasJSDoc(node: Node): void {
  (node as Node & { flags?: number }).flags = ((node.flags ?? 0) | NodeFlags.HasJSDoc);
}

function typeExpressionOf(node: Node): Node | undefined {
  return (node as unknown as { typeExpression?: Node }).typeExpression;
}

function typeNodeOfExpression(node: Node): Node {
  return (node as unknown as { type?: Node }).type ?? node;
}

function typeExpressionType(node: Node): Node | undefined {
  const typeExpression = typeExpressionOf(node);
  return typeExpression === undefined ? undefined : typeNodeOfExpression(typeExpression);
}

function typeOf(node: Node): Node | undefined {
  return (node as unknown as { type?: Node }).type;
}

function parametersOf(node: Node): readonly Node[] {
  return nodeListElements((node as unknown as { parameters?: NodeListLike<Node> | readonly Node[] }).parameters);
}

function modifiersOf(node: Node): ModifierList | undefined {
  return (node as unknown as { modifiers?: ModifierList }).modifiers;
}

function nameOf(node: Node | undefined): Node | undefined {
  return (node as unknown as { name?: Node } | undefined)?.name;
}

function propertyTagName(node: Node): Node | undefined {
  return (node as unknown as { name?: Node }).name ?? (node as unknown as { fullName?: Node }).fullName;
}

function rightmostQualifiedName(node: Node): Node {
  let current = node;
  while (current.kind === Kind.QualifiedName) {
    current = (current as unknown as { right?: Node }).right ?? current;
  }
  return current;
}

function nameText(node: Node | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function expressionOf(node: Node): Node | undefined {
  return (node as unknown as { expression?: Node }).expression;
}

function isFunctionMethodOrConstructor(node: Node): boolean {
  return node.kind === Kind.FunctionDeclaration || node.kind === Kind.MethodDeclaration || node.kind === Kind.Constructor;
}
