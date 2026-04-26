import { readAstSchema, normalizeKinds, normalizeNodes, type AstSchema, type KindMarker } from "./schema.js";
import { generatedHeader, stableJson, writeGenerated } from "./common.js";

function enumMemberName(name: string): string {
  if (!/^[$A-Z_a-z][$\w]*$/.test(name)) {
    throw new Error(`Invalid Kind name ${name}`);
  }
  return name;
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

export interface TextRange {
  readonly pos: number;
  readonly end: number;
}

export interface Node extends TextRange {
  readonly kind: Kind;
  readonly flags: number;
  readonly parent?: Node;
}

export interface NodeList<TNode extends Node = Node> extends ReadonlyArray<TNode>, TextRange {
  readonly hasTrailingComma?: boolean;
  readonly transformFlags: number;
}

export interface SourceFile extends Node {
  readonly kind: Kind.SourceFile;
  readonly Statements: NodeList;
  readonly EndOfFileToken: Node & { readonly kind: Kind.EndOfFile };
  readonly text: string;
  readonly fileName: string;
  readonly path: string;
}

export interface Identifier extends Node {
  readonly kind: Kind.Identifier;
  readonly Text: string;
}
`;
}

async function main(): Promise<void> {
  const schema = await readAstSchema();
  await writeGenerated("src/ast/generated/kind.ts", generateKind(schema));
  await writeGenerated("src/ast/generated/schema.ts", generateSchemaContract(schema));
  await writeGenerated("src/ast/generated/types.ts", generateRuntimeTypes());
  await writeGenerated("src/ast/index.ts", `${generatedHeader("schema/tsgo/ast.json")}export * from "./generated/kind.js";\nexport * from "./generated/schema.js";\nexport * from "./generated/types.js";\n`);
}

await main();
