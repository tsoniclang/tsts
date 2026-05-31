import type { Node } from "../ast/index.js";
import { Kind, nodeName } from "../ast/index.js";

export interface ReparseSyntheticDeclaration {
  readonly kind: "type-alias" | "function-overload" | "import-declaration" | "property-signature";
  readonly sourceTag: Node;
  readonly host: Node;
  readonly name: string;
  readonly type: Node | undefined;
  readonly parameters: readonly ReparseSyntheticParameter[];
}

export interface ReparseSyntheticParameter {
  readonly name: string;
  readonly type: Node | undefined;
  readonly optional: boolean;
  readonly rest: boolean;
  readonly sourceTag: Node;
}

export interface ReparsePlan {
  readonly declarations: readonly ReparseSyntheticDeclaration[];
  readonly clonePairs: readonly ReparseClonePair[];
  readonly hostedTags: readonly ReparseHostedTag[];
}

export interface ReparseClonePair {
  readonly original: Node;
  readonly clone: Node;
}

export interface ReparseHostedTag {
  readonly host: Node;
  readonly tag: Node;
  readonly jsDoc: Node;
}

export function createReparsePlan(host: Node, jsDocs: readonly Node[], clone: (node: Node) => Node): ReparsePlan {
  const declarations: ReparseSyntheticDeclaration[] = [];
  const clonePairs: ReparseClonePair[] = [];
  const hostedTags: ReparseHostedTag[] = [];
  for (const jsDoc of jsDocs) {
    const tags = jsDocTags(jsDoc);
    for (const tag of tags) {
      const cloned = clone(tag);
      clonePairs.push({ original: tag, clone: cloned });
      const unhosted = createUnhostedDeclaration(host, jsDoc, tag, clone);
      if (unhosted !== undefined) declarations.push(unhosted);
      const hosted = createHostedTag(host, jsDoc, tag);
      if (hosted !== undefined) hostedTags.push(hosted);
    }
  }
  return { declarations, clonePairs, hostedTags };
}

export function createUnhostedDeclaration(
  host: Node,
  jsDoc: Node,
  tag: Node,
  clone: (node: Node) => Node,
): ReparseSyntheticDeclaration | undefined {
  switch (tag.kind) {
    case Kind.JSDocTypedefTag:
      return {
        kind: "type-alias",
        sourceTag: tag,
        host,
        name: jsDocTagNameText(tag),
        type: clone(jsDocTagTypeExpression(tag) ?? tag),
        parameters: [],
      };
    case Kind.JSDocCallbackTag:
      return {
        kind: "type-alias",
        sourceTag: tag,
        host,
        name: jsDocTagNameText(tag),
        type: undefined,
        parameters: reparseJSDocSignatureParameters(jsDoc, tag, clone),
      };
    case Kind.JSDocImportTag:
      return {
        kind: "import-declaration",
        sourceTag: tag,
        host,
        name: jsDocTagNameText(tag),
        type: jsDocTagTypeExpression(tag),
        parameters: [],
      };
    case Kind.JSDocOverloadTag:
      if (!canHostOverload(host)) return undefined;
      return {
        kind: "function-overload",
        sourceTag: tag,
        host,
        name: declarationNameText(host),
        type: jsDocTagTypeExpression(tag),
        parameters: reparseJSDocSignatureParameters(jsDoc, tag, clone),
      };
  }
  return undefined;
}

export function createHostedTag(host: Node, jsDoc: Node, tag: Node): ReparseHostedTag | undefined {
  switch (tag.kind) {
    case Kind.JSDocParameterTag:
    case Kind.JSDocPropertyTag:
    case Kind.JSDocTemplateTag:
    case Kind.JSDocReturnTag:
    case Kind.JSDocTypeTag:
    case Kind.JSDocSatisfiesTag:
      return { host, jsDoc, tag };
  }
  return undefined;
}

export function reparseJSDocSignatureParameters(
  _jsDoc: Node,
  tag: Node,
  clone: (node: Node) => Node,
): readonly ReparseSyntheticParameter[] {
  const signature = jsDocTagTypeExpression(tag) ?? tag;
  const params = nodeArray(field<readonly Node[]>(signature, "parameters"));
  const result: ReparseSyntheticParameter[] = [];
  for (const param of params) {
    if (param.kind === Kind.JSDocThisTag) {
      result.push({
        name: "this",
        type: jsDocTagTypeExpression(param),
        optional: false,
        rest: false,
        sourceTag: param,
      });
      continue;
    }
    if (param.kind !== Kind.JSDocParameterTag && param.kind !== Kind.JSDocPropertyTag) continue;
    const name = nodeName(param);
    if (name !== undefined && name.kind === Kind.QualifiedName) continue;
    result.push({
      name: declarationNameText(param),
      type: clone(jsDocTagTypeExpression(param) ?? param),
      optional: isJSDocOptionalParameter(param),
      rest: isJSDocRestParameter(param),
      sourceTag: param,
    });
  }
  return result;
}

export function reparseJSDocTypeLiteralMembers(typeLiteral: Node, clone: (node: Node) => Node): readonly ReparseSyntheticDeclaration[] {
  const properties = nodeArray(field<readonly Node[]>(typeLiteral, "jsDocPropertyTags"));
  const result: ReparseSyntheticDeclaration[] = [];
  for (const property of properties) {
    if (property.kind !== Kind.JSDocPropertyTag && property.kind !== Kind.JSDocParameterTag) continue;
    result.push({
      kind: "property-signature",
      sourceTag: property,
      host: typeLiteral,
      name: declarationNameText(property),
      type: clone(jsDocTagTypeExpression(property) ?? property),
      parameters: [],
    });
  }
  return result;
}

export function gatherJSDocTypeParameters(jsDoc: Node, tagWithTypeParameters: Node): readonly Node[] {
  const tags = jsDocTags(jsDoc);
  let start = 0;
  for (let index = 0; index < tags.length; index += 1) {
    const tag = tags[index]!;
    if (tag === tagWithTypeParameters) break;
    if (tag.kind === Kind.JSDocTypedefTag || tag.kind === Kind.JSDocCallbackTag || tag.kind === Kind.JSDocOverloadTag) {
      start = index + 1;
    }
  }
  const result: Node[] = [];
  for (let index = start; index < tags.length; index += 1) {
    const tag = tags[index]!;
    if (tag === tagWithTypeParameters) break;
    if (tag.kind !== Kind.JSDocTemplateTag) continue;
    result.push(...nodeArray(field<readonly Node[]>(tag, "typeParameters")));
  }
  return result;
}

export function isJSDocOptionalParameter(tag: Node): boolean {
  if (field<boolean>(tag, "isBracketed") === true) return true;
  if (field<Node>(tag, "questionToken") !== undefined) return true;
  return false;
}

export function isJSDocRestParameter(tag: Node): boolean {
  const typeExpression = jsDocTagTypeExpression(tag);
  if (typeExpression === undefined) return false;
  if (typeExpression.kind === Kind.JSDocVariadicType) return true;
  return field<Node>(tag, "dotDotDotToken") !== undefined;
}

export function canHostOverload(host: Node): boolean {
  return host.kind === Kind.FunctionDeclaration ||
    host.kind === Kind.MethodDeclaration ||
    host.kind === Kind.Constructor;
}

export function jsDocTags(jsDoc: Node): readonly Node[] {
  const tags = field<{ nodes?: readonly Node[] }>(jsDoc, "tags");
  return nodeArray(tags?.nodes);
}

export function jsDocTagTypeExpression(tag: Node): Node | undefined {
  const typeExpression = field<Node>(tag, "typeExpression");
  if (typeExpression === undefined) return undefined;
  return field<Node>(typeExpression, "type") ?? typeExpression;
}

export function jsDocTagNameText(tag: Node): string {
  const name = nodeName(tag) ?? field<Node>(tag, "fullName");
  return name === undefined ? "" : declarationNameText(name);
}

export function declarationNameText(node: Node | undefined): string {
  if (node === undefined) return "";
  if (field<string>(node, "text") !== undefined) return field<string>(node, "text") ?? "";
  const name = nodeName(node);
  if (name !== undefined) return declarationNameText(name);
  if (node.kind === Kind.QualifiedName) {
    const left = declarationNameText(field<Node>(node, "left"));
    const right = declarationNameText(field<Node>(node, "right"));
    return left === "" ? right : `${left}.${right}`;
  }
  return "";
}

function nodeArray<T>(value: readonly T[] | undefined): readonly T[] {
  return value ?? [];
}

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
