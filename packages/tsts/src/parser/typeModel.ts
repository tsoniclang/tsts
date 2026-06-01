import type { Node } from "../ast/index.js";
import { Kind } from "../ast/index.js";

export interface TypeParseShape {
  readonly kind: "keyword" | "reference" | "array" | "tuple" | "object" | "function" | "constructor" | "conditional" | "mapped" | "import" | "template" | "unknown";
  readonly node: Node;
  readonly children: readonly TypeParseShape[];
}

export function classifyTypeNode(node: Node): TypeParseShape {
  const children = typeChildren(node).map(classifyTypeNode);
  return { kind: typeShapeKind(node), node, children };
}

export function typeShapeKind(node: Node): TypeParseShape["kind"] {
  switch (node.kind) {
    case Kind.AnyKeyword:
    case Kind.UnknownKeyword:
    case Kind.StringKeyword:
    case Kind.NumberKeyword:
    case Kind.BigIntKeyword:
    case Kind.BooleanKeyword:
    case Kind.SymbolKeyword:
    case Kind.VoidKeyword:
    case Kind.UndefinedKeyword:
    case Kind.NullKeyword:
    case Kind.NeverKeyword:
    case Kind.ObjectKeyword:
      return "keyword";
    case Kind.TypeReference:
    case Kind.ExpressionWithTypeArguments:
      return "reference";
    case Kind.ArrayType:
      return "array";
    case Kind.TupleType:
    case Kind.NamedTupleMember:
    case Kind.OptionalType:
    case Kind.RestType:
      return "tuple";
    case Kind.TypeLiteral:
      return "object";
    case Kind.FunctionType:
      return "function";
    case Kind.ConstructorType:
      return "constructor";
    case Kind.ConditionalType:
      return "conditional";
    case Kind.MappedType:
      return "mapped";
    case Kind.ImportType:
      return "import";
    case Kind.TemplateLiteralType:
    case Kind.TemplateLiteralTypeSpan:
      return "template";
  }
  return "unknown";
}

export function typeChildren(node: Node): readonly Node[] {
  const result: Node[] = [];
  const push = (child: Node | undefined): void => {
    if (child !== undefined) result.push(child);
  };
  switch (node.kind) {
    case Kind.TypeReference:
      push(field<Node>(node, "typeName"));
      result.push(...nodeArray(field<readonly Node[]>(node, "typeArguments")));
      break;
    case Kind.ArrayType:
    case Kind.OptionalType:
    case Kind.RestType:
      push(field<Node>(node, "elementType") ?? field<Node>(node, "type"));
      break;
    case Kind.TupleType:
      result.push(...nodeArray(field<readonly Node[]>(node, "elements")));
      break;
    case Kind.NamedTupleMember:
      push(field<Node>(node, "type"));
      break;
    case Kind.TypeLiteral:
      result.push(...nodeArray(field<readonly Node[]>(node, "members")));
      break;
    case Kind.FunctionType:
    case Kind.ConstructorType:
      result.push(...nodeArray(field<readonly Node[]>(node, "typeParameters")));
      result.push(...nodeArray(field<readonly Node[]>(node, "parameters")));
      push(field<Node>(node, "type"));
      break;
    case Kind.ConditionalType:
      push(field<Node>(node, "checkType"));
      push(field<Node>(node, "extendsType"));
      push(field<Node>(node, "trueType"));
      push(field<Node>(node, "falseType"));
      break;
    case Kind.MappedType:
      push(field<Node>(node, "typeParameter"));
      push(field<Node>(node, "nameType"));
      push(field<Node>(node, "type"));
      break;
    case Kind.ImportType:
      push(field<Node>(node, "argument"));
      push(field<Node>(node, "qualifier"));
      result.push(...nodeArray(field<readonly Node[]>(node, "typeArguments")));
      break;
    case Kind.TemplateLiteralType:
      push(field<Node>(node, "head"));
      result.push(...nodeArray(field<readonly Node[]>(node, "templateSpans")));
      break;
    case Kind.TemplateLiteralTypeSpan:
      push(field<Node>(node, "type"));
      push(field<Node>(node, "literal"));
      break;
  }
  return result;
}

export function typeHasInferNode(node: Node): boolean {
  if (node.kind === Kind.InferType) return true;
  return typeChildren(node).some(typeHasInferNode);
}

export function typeHasImportType(node: Node): boolean {
  if (node.kind === Kind.ImportType) return true;
  return typeChildren(node).some(typeHasImportType);
}

export function typeHasThisType(node: Node): boolean {
  if (node.kind === Kind.ThisType) return true;
  return typeChildren(node).some(typeHasThisType);
}

export function typeParameterNames(node: Node): readonly string[] {
  const params = nodeArray(field<readonly Node[]>(node, "typeParameters"));
  return params.map(typeParameterName).filter((name) => name !== "");
}

export function typeParameterName(node: Node): string {
  const name = field<Node>(node, "name");
  return field<string>(name, "text") ?? "";
}

export function typeReferenceName(node: Node): string {
  if (node.kind !== Kind.TypeReference) return "";
  return entityNameText(field<Node>(node, "typeName"));
}

export function entityNameText(node: Node | undefined): string {
  if (node === undefined) return "";
  const text = field<string>(node, "text");
  if (text !== undefined) return text;
  if (node.kind === Kind.QualifiedName) {
    const left = entityNameText(field<Node>(node, "left"));
    const right = entityNameText(field<Node>(node, "right"));
    return left === "" ? right : `${left}.${right}`;
  }
  return "";
}

export function countTypeNodes(node: Node): number {
  let count = 1;
  for (const child of typeChildren(node)) count += countTypeNodes(child);
  return count;
}

export function flattenTypeNodes(node: Node): readonly Node[] {
  const result: Node[] = [node];
  for (const child of typeChildren(node)) result.push(...flattenTypeNodes(child));
  return result;
}

export function typeTreeDepth(node: Node): number {
  const depths = typeChildren(node).map(typeTreeDepth);
  return depths.length === 0 ? 1 : 1 + Math.max(...depths);
}

function nodeArray<T>(value: readonly T[] | undefined): readonly T[] {
  return value ?? [];
}

function field<T>(node: Node | undefined, key: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[key];
}
