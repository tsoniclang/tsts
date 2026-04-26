import { readAstSchema, normalizeKinds, normalizeNodes, type AstSchema, type MemberDefinition, type NodeDefinition } from "./schema.js";
import { generatedHeader, stableJson, writeGenerated } from "./common.js";

type KindAliasDefinition = readonly string[] | { readonly range: readonly [string, string] };
type NodeAliasDefinition = readonly string[] | { readonly base: string };

function enumMemberName(name: string): string {
  if (!/^[$A-Z_a-z][$\w]*$/.test(name)) {
    throw new Error(`Invalid Kind name ${name}`);
  }
  return name;
}

function lowerFirst(name: string): string {
  return `${name.slice(0, 1).toLowerCase()}${name.slice(1)}`;
}

function typeNameForBase(name: string): string {
  return name.endsWith("Base") ? name : `${name}Base`;
}

function isReadonlyArray<T>(value: T | readonly T[]): value is readonly T[] {
  return Array.isArray(value);
}

function isRangeKindAlias(value: KindAliasDefinition): value is { readonly range: readonly [string, string] } {
  return !Array.isArray(value);
}

function isBaseNodeAlias(value: NodeAliasDefinition): value is { readonly base: string } {
  return !Array.isArray(value);
}

function kindAliasNames(schema: AstSchema): Set<string> {
  return new Set(Object.keys(schema.kinds.aliases ?? {}));
}

function concreteKindNames(schema: AstSchema): Set<string> {
  return new Set(normalizeKinds(schema).map(kind => kind.name));
}

function typeParameters(schema: AstSchema, definition: NodeDefinition): string {
  if (!definition.typeParameters?.length) {
    return "";
  }
  const params = definition.typeParameters.map(param => {
    const constraint = formatType(schema, param.constraint);
    const defaultType = param.default === undefined ? "" : ` = ${formatType(schema, param.default)}`;
    return `${param.name} extends ${constraint}${defaultType}`;
  });
  return `<${params.join(", ")}>`;
}

function formatKindType(name: string): string {
  const kindName = name.startsWith("SyntaxKind.") ? name.slice("SyntaxKind.".length) : name;
  return `Kind.${enumMemberName(kindName)}`;
}

function formatType(schema: AstSchema, type: string | readonly string[] | undefined): string {
  if (type === undefined) {
    return "unknown";
  }
  if (isReadonlyArray(type)) {
    return type.map(item => formatType(schema, item)).join(" | ");
  }
  if (type.startsWith("SyntaxKind.")) {
    return formatKindType(type);
  }
  if (type.startsWith("*")) {
    return formatType(schema, type.slice(1));
  }
  if (kindAliasNames(schema).has(type)) {
    return type;
  }
  switch (type) {
    case "bool":
      return "boolean";
    case "int":
      return "number";
    case "string":
    case "unknown":
    case "any":
      return type;
    case "NodeFlags":
    case "ModifierFlags":
    case "TokenFlags":
    case "CheckFlags":
    case "FunctionFlags":
    case "TransformFlags":
      return "number";
    default:
      return type;
  }
}

function formatMemberType(schema: AstSchema, member: MemberDefinition): string {
  const itemType = formatType(schema, member.type);
  switch (member.list) {
    case "NodeList":
      return `NodeArray<${itemType}>`;
    case "ModifierList":
      return `NodeArray<${itemType}>`;
    case "raw":
      return `readonly ${itemType}[]`;
    default:
      return itemType;
  }
}

function generateKind(schema: AstSchema): string {
  const kinds = normalizeKinds(schema);
  const markers = schema.kinds.markers;
  const aliases = schema.kinds.aliases ?? {};
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];

  lines.push("export enum Kind {");
  for (const kind of kinds) {
    lines.push(`  ${enumMemberName(kind.name)} = ${kind.value},`);
  }
  for (const marker of markers) {
    lines.push(`  ${enumMemberName(marker.name)} = ${enumMemberName(marker.value)},`);
  }
  lines.push("}");
  lines.push("");
  lines.push("export { Kind as SyntaxKind };");
  lines.push("");

  lines.push("export const KindNames = [");
  for (const kind of kinds) {
    lines.push(`  ${JSON.stringify(kind.name)},`);
  }
  lines.push("] as const;");
  lines.push("");
  lines.push("export type KindName = typeof KindNames[number];");
  lines.push("");

  lines.push("export const KindValues = {");
  for (const kind of kinds) {
    lines.push(`  ${JSON.stringify(kind.name)}: ${kind.value},`);
  }
  lines.push("} as const;");
  lines.push("");

  lines.push("export const KindMarkers = {");
  for (const marker of markers) {
    lines.push(`  ${JSON.stringify(marker.name)}: ${JSON.stringify(marker.value)},`);
  }
  lines.push("} as const satisfies Record<string, string>;");
  lines.push("");

  lines.push("export const KindMarkerValues = {");
  for (const marker of markers) {
    lines.push(`  ${JSON.stringify(marker.name)}: Kind.${enumMemberName(marker.name)},`);
  }
  lines.push("} as const;");
  lines.push("");

  lines.push(`export const KindAliases = ${stableJson(aliases).trimEnd()} as const;`);
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function generateSchemaContract(schema: AstSchema): string {
  const nodes = normalizeNodes(schema);
  const kindByNode = Object.fromEntries(nodes.map(node => [node.name, node.kind]));
  const kindValuesByNode = Object.fromEntries(nodes.map(node => [node.name, node.kindValues]));
  const membersByNode = Object.fromEntries(nodes.map(node => [node.name, node.members]));
  const extendsByNode = Object.fromEntries(nodes.map(node => [node.name, node.extends]));
  const handWrittenNodes = nodes.filter(node => node.handWritten).map(node => node.name);
  const arenaNodes = nodes.filter(node => node.arena).map(node => node.name);

  return [
    generatedHeader("schema/tsgo/ast.json"),
    `export const BaseDefinitions = ${stableJson(schema.bases).trimEnd()} as const;`,
    "",
    `export const NodeDefinitions = ${stableJson(schema.nodes.definitions).trimEnd()} as const;`,
    "",
    `export const NodeAliases = ${stableJson(schema.nodes.aliases).trimEnd()} as const;`,
    "",
    `export const ListAliases = ${stableJson(schema.nodes.listAliases ?? {}).trimEnd()} as const;`,
    "",
    `export const NodeNames = ${stableJson(nodes.map(node => node.name)).trimEnd()} as const;`,
    "",
    `export const BaseNames = ${stableJson(Object.keys(schema.bases)).trimEnd()} as const;`,
    "",
    `export const NodeKindByName = ${stableJson(kindByNode).trimEnd()} as const;`,
    "",
    `export const NodeKindValuesByName = ${stableJson(kindValuesByNode).trimEnd()} as const;`,
    "",
    `export const NodeMembersByName = ${stableJson(membersByNode).trimEnd()} as const;`,
    "",
    `export const NodeExtendsByName = ${stableJson(extendsByNode).trimEnd()} as const;`,
    "",
    `export const HandWrittenNodes = ${stableJson(handWrittenNodes).trimEnd()} as const;`,
    "",
    `export const ArenaNodes = ${stableJson(arenaNodes).trimEnd()} as const;`,
    "",
    "export type NodeName = typeof NodeNames[number];",
    "export type BaseName = typeof BaseNames[number];",
    "",
  ].join("\n");
}

function generateRuntimeTypes(): string {
  return `${generatedHeader("schema/tsgo/ast.json")}import { Kind } from "./kind.js";
import type { EndOfFile, Statement } from "./nodes.js";

export interface TextRange {
  readonly pos: number;
  readonly end: number;
}

export interface Node extends TextRange {
  readonly kind: Kind;
  readonly flags: number;
  readonly parent: Node;
  readonly jsDoc?: readonly Node[];
  forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined;
  getSourceFile(): SourceFile;
}

export interface NodeArray<TNode extends Node = Node> extends ReadonlyArray<TNode>, TextRange {
  readonly hasTrailingComma?: boolean;
  readonly transformFlags: number;
}

export type NodeList<TNode extends Node = Node> = NodeArray<TNode>;

export interface FileReference extends TextRange {
  readonly fileName: string;
  readonly resolutionMode: number;
  readonly preserve: boolean;
}

export type Path = string & { readonly __pathBrand: unknown };

export interface SourceFile extends Node {
  readonly kind: Kind.SourceFile;
  readonly statements: NodeArray<Statement>;
  readonly endOfFileToken: EndOfFile;
  readonly text: string;
  readonly fileName: string;
  readonly path: Path;
  readonly languageVariant: number;
  readonly scriptKind: number;
  readonly isDeclarationFile: boolean;
  readonly referencedFiles: readonly FileReference[];
  readonly typeReferenceDirectives: readonly FileReference[];
  readonly libReferenceDirectives: readonly FileReference[];
  readonly imports: readonly Node[];
  readonly moduleAugmentations: readonly Node[];
  readonly ambientModuleNames: readonly string[];
  readonly externalModuleIndicator: Node | true | undefined;
  readonly tokenCache?: Map<string, Node>;
}

export interface FlowNode {}
export interface Symbol {}
export interface CheckFlagsBrand {}
`;
}

function expandKindAlias(schema: AstSchema, value: KindAliasDefinition): string[] {
  const kinds = normalizeKinds(schema).map(kind => kind.name);
  const markerValues = new Map(schema.kinds.markers.map(marker => [marker.name, marker.value]));
  const resolveMarker = (name: string): string => {
    let current = name;
    const seen = new Set<string>();
    while (markerValues.has(current)) {
      if (seen.has(current)) {
        throw new Error(`Circular kind marker ${name}`);
      }
      seen.add(current);
      current = markerValues.get(current)!;
    }
    return current;
  };
  if (!isRangeKindAlias(value)) {
    return value.flatMap(item => {
      const nested = schema.kinds.aliases?.[item];
      return nested === undefined ? [item] : expandKindAlias(schema, nested);
    });
  }
  const [startMarker, endMarker] = value.range;
  const start = kinds.indexOf(resolveMarker(startMarker));
  const end = kinds.indexOf(resolveMarker(endMarker));
  if (start < 0 || end < start) {
    throw new Error(`Invalid kind range ${startMarker}..${endMarker}`);
  }
  return kinds.slice(start, end + 1);
}

function isGoOnlyBase(schema: AstSchema, baseName: string): boolean {
  const base = schema.bases[baseName];
  if (base === undefined) {
    return false;
  }
  if (base.brand !== undefined) {
    return false;
  }
  if (base.fields === undefined) {
    return true;
  }
  return Object.values(base.fields).every(field => field.goOnly === true || (field.noTS === true && field.noFactory === true));
}

function expandTypeScriptExtends(schema: AstSchema, extendsList: readonly string[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();

  const visit = (baseNames: readonly string[]): void => {
    for (const baseName of baseNames) {
      if (seen.has(baseName)) {
        continue;
      }
      seen.add(baseName);
      if (isGoOnlyBase(schema, baseName)) {
        visit(schema.bases[baseName]?.extends ?? []);
      } else {
        result.push(baseName);
      }
    }
  };

  visit(extendsList);
  return result;
}

function baseExtendsTransitive(schema: AstSchema, nodeDefinition: NodeDefinition, baseName: string): boolean {
  const stack = [...nodeDefinition.extends];
  const seen = new Set<string>();
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === baseName) {
      return true;
    }
    if (seen.has(current)) {
      continue;
    }
    seen.add(current);
    stack.push(...(schema.bases[current]?.extends ?? []));
  }
  return false;
}

function kindType(schema: AstSchema, name: string, definition: NodeDefinition): string {
  const kindMember = definition.members?.find(member => member.name === "Kind" || member.name === "kind");
  if (kindMember?.type !== undefined) {
    return formatType(schema, kindMember.type);
  }

  const kindValues = isReadonlyArray(definition.kind) ? definition.kind : [definition.kind ?? name];
  return kindValues.map(formatKindType).join(" | ");
}

function isVariantNode(schema: AstSchema, name: string, definition: NodeDefinition): boolean {
  const kindMember = definition.members?.find(member => member.name === "Kind" || member.name === "kind");
  if (kindMember?.type === undefined) {
    return false;
  }
  if (!isReadonlyArray(kindMember.type)) {
    return false;
  }
  const concreteKinds = concreteKindNames(schema);
  return kindMember.type.every(type => type.startsWith("SyntaxKind.") && concreteKinds.has(type.slice("SyntaxKind.".length))) && name !== kindMember.type[0]?.slice("SyntaxKind.".length);
}

function typeScriptExtendsClause(schema: AstSchema, extendsList: readonly string[]): string {
  const tsExtends = expandTypeScriptExtends(schema, extendsList).map(typeNameForBase);
  return tsExtends.length > 0 ? tsExtends.join(", ") : "Node";
}

function ownTypeScriptMembers(schema: AstSchema, definition: NodeDefinition): readonly MemberDefinition[] {
  return (definition.members ?? []).filter(member => {
    if (member.name === "Kind" || member.name === "kind") {
      return false;
    }
    if (member.noTS === true || member.goOnly === true) {
      return false;
    }
    if (member.inherited !== true) {
      return true;
    }
    if (member.type === undefined) {
      return false;
    }
    return true;
  });
}

function syntaxKindToNodeType(schema: AstSchema): Map<string, string> {
  const result = new Map<string, string>();
  for (const [nodeName, definition] of Object.entries(schema.nodes.definitions)) {
    if (isVariantNode(schema, nodeName, definition)) {
      const kindMember = definition.members?.find(member => member.name === "Kind" || member.name === "kind");
      if (kindMember?.type !== undefined && isReadonlyArray(kindMember.type)) {
        for (const kindTypeName of kindMember.type) {
          if (!kindTypeName.startsWith("SyntaxKind.")) {
            throw new Error(`Variant node ${nodeName} has non-SyntaxKind variant ${kindTypeName}`);
          }
          const syntaxKindName = kindTypeName.slice("SyntaxKind.".length);
          result.set(syntaxKindName, syntaxKindName);
        }
      }
      continue;
    }

    const kindValues = isReadonlyArray(definition.kind) ? definition.kind : [definition.kind ?? nodeName];
    for (const kindName of kindValues) {
      result.set(kindName, nodeName);
    }

    for (const [aliasName, typeArg] of Object.entries(definition.instantiationAliases ?? {})) {
      result.set(typeArg, aliasName);
    }
  }
  return result;
}

function resolveNodeAliasMember(schema: AstSchema, typeName: string, kindToNodeType: ReadonlyMap<string, string>): string {
  const kindAliases = schema.kinds.aliases ?? {};
  if (Object.hasOwn(kindAliases, typeName)) {
    return expandKindAlias(schema, kindAliases[typeName]!).map(kindName => {
      const nodeType = kindToNodeType.get(kindName);
      if (nodeType === undefined) {
        throw new Error(`Kind alias member ${kindName} from ${typeName} does not resolve to a node type`);
      }
      return nodeType;
    }).join(" | ");
  }
  return typeName;
}

function expandNodeAliasMembers(schema: AstSchema, alias: readonly string[], kindToNodeType: ReadonlyMap<string, string>): string[] {
  return alias.flatMap(typeName => resolveNodeAliasMember(schema, typeName, kindToNodeType).split(" | "));
}

function generateNodeTypes(schema: AstSchema): string {
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];
  lines.push("import { Kind } from \"./kind.js\";");
  lines.push("import type { Node, NodeArray, SourceFile, Symbol } from \"./types.js\";");
  lines.push("");
  lines.push("export type NodeFlags = number;");
  lines.push("export type ModifierFlags = number;");
  lines.push("export type TokenFlags = number;");
  lines.push("export type TransformFlags = number;");
  lines.push("export type CheckFlags = number;");
  lines.push("export type FunctionFlags = number;");
  lines.push("");

  for (const [name, alias] of Object.entries(schema.kinds.aliases ?? {})) {
    const values = expandKindAlias(schema, alias);
    lines.push(`export type ${name} = ${values.map(formatKindType).join(" | ")};`);
  }
  lines.push("");

  for (const [name, base] of Object.entries(schema.bases)) {
    if (isGoOnlyBase(schema, name)) {
      continue;
    }
    const tsName = typeNameForBase(name);
    const extendsText = ` extends ${typeScriptExtendsClause(schema, base.extends ?? [])}`;
    lines.push(`export interface ${tsName}${extendsText} {`);
    if (base.brand !== undefined) {
      lines.push(`  readonly ${base.brand}: unknown;`);
    }
    for (const [fieldName, field] of Object.entries(base.fields ?? {})) {
      if (field.noTS === true || field.goOnly === true) {
        continue;
      }
      const optional = field.optional === true ? "?" : "";
      lines.push(`  readonly ${lowerFirst(fieldName)}${optional}: ${formatMemberType(schema, { ...field, name: fieldName })};`);
    }
    lines.push("}");
  }
  lines.push("");

  const variants: { readonly sourceName: string; readonly variantName: string; readonly syntaxKindName: string; readonly definition: NodeDefinition }[] = [];

  for (const [name, definition] of Object.entries(schema.nodes.definitions)) {
    if (definition.handWritten === true) {
      continue;
    }
    if (isVariantNode(schema, name, definition)) {
      const kindMember = definition.members?.find(member => member.name === "Kind" || member.name === "kind");
      if (kindMember?.type === undefined || !isReadonlyArray(kindMember.type)) {
        throw new Error(`Variant node ${name} does not declare a SyntaxKind union`);
      }
      for (const kindName of kindMember.type) {
        variants.push({
          sourceName: name,
          variantName: kindName.slice("SyntaxKind.".length),
          syntaxKindName: kindName.slice("SyntaxKind.".length),
          definition,
        });
      }
      continue;
    }

    const extendsText = ` extends ${typeScriptExtendsClause(schema, definition.extends)}`;
    const genericParams = typeParameters(schema, definition);
    lines.push(`export interface ${name}${genericParams}${extendsText} {`);
    lines.push(`  readonly kind: ${kindType(schema, name, definition)};`);
    for (const member of ownTypeScriptMembers(schema, definition)) {
      const optional = member.optional === true ? "?" : "";
      lines.push(`  readonly ${lowerFirst(member.name)}${optional}: ${formatMemberType(schema, member)};`);
    }
    lines.push("}");
  }
  lines.push("");

  const kindToNodeType = syntaxKindToNodeType(schema);

  for (const [name, alias] of Object.entries(schema.nodes.aliases)) {
    if (!isBaseNodeAlias(alias)) {
      lines.push(`export type ${name} = ${expandNodeAliasMembers(schema, alias, kindToNodeType).join(" | ")};`);
      continue;
    }
    const members = Object.entries(schema.nodes.definitions)
      .filter(([, definition]) => !definition.handWritten && !isVariantNode(schema, name, definition) && baseExtendsTransitive(schema, definition, alias.base))
      .map(([nodeName]) => nodeName);
    if (members.length === 0) {
      lines.push(`export type ${name} = never;`);
    } else {
      lines.push(`export type ${name} = ${members.join(" | ")};`);
    }
  }
  lines.push("");

  for (const variant of variants) {
    const extendsText = ` extends ${typeScriptExtendsClause(schema, variant.definition.extends)}`;
    lines.push(`export interface ${variant.variantName}${extendsText} {`);
    lines.push(`  readonly kind: ${formatKindType(variant.syntaxKindName)};`);
    for (const member of ownTypeScriptMembers(schema, variant.definition)) {
      const optional = member.optional === true ? "?" : "";
      lines.push(`  readonly ${lowerFirst(member.name)}${optional}: ${formatMemberType(schema, member)};`);
    }
    lines.push("}");
  }
  for (const [name, definition] of Object.entries(schema.nodes.definitions)) {
    if (!isVariantNode(schema, name, definition)) {
      continue;
    }
    const aliases = variants.filter(variant => variant.sourceName === name).map(variant => variant.variantName);
    lines.push(`export type ${name} = ${aliases.join(" | ")};`);
  }
  lines.push("");

  for (const [name, definition] of Object.entries(schema.nodes.definitions)) {
    if (definition.instantiationAliases === undefined) {
      continue;
    }
    for (const [aliasName, kindName] of Object.entries(definition.instantiationAliases)) {
      const typeArg = kindAliasNames(schema).has(kindName) ? kindName : formatKindType(kindName);
      lines.push(`export type ${aliasName} = ${name}<${typeArg}>;`);
    }
  }
  lines.push("");

  for (const [name, item] of Object.entries(schema.nodes.listAliases ?? {})) {
    lines.push(`export type ${name} = NodeArray<${item}>;`);
  }
  lines.push("");

  return `${lines.join("\n")}\n`;
}

async function main(): Promise<void> {
  const schema = await readAstSchema();
  await writeGenerated("src/ast/generated/kind.ts", generateKind(schema));
  await writeGenerated("src/ast/generated/schema.ts", generateSchemaContract(schema));
  await writeGenerated("src/ast/generated/types.ts", generateRuntimeTypes());
  await writeGenerated("src/ast/generated/nodes.ts", generateNodeTypes(schema));
  await writeGenerated("src/ast/index.ts", `${generatedHeader("schema/tsgo/ast.json")}export * from "./generated/kind.js";\nexport * from "./generated/schema.js";\nexport * from "./generated/types.js";\nexport * from "./generated/nodes.js";\n`);
}

await main();
