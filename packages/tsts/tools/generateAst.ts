import { readAstSchema, normalizeKinds, normalizeNodes, type AstSchema, type MemberDefinition, type NodeDefinition } from "./schema.js";
import { generatedHeader, stableJson, writeGenerated } from "./common.js";

type KindAliasDefinition = readonly string[] | { readonly range: readonly [string, string] };
type NodeAliasDefinition = readonly string[] | { readonly base: string };

// codex-043 M2 Fork A: the controlled mutable compiler-state slots. These are
// `goOnly` fields in schema/tsgo/ast.json (which is byte-locked against the
// pinned upstream blob and MUST NOT be edited). Instead, the TS-emit path is
// opted in here via an explicit allowlist keyed by "BaseName.FieldName". The
// five slots are emitted as OPTIONAL and MUTABLE (no `readonly`) — they mirror
// TS-Go's per-node binder/checker state (Symbol, LocalSymbol, Locals,
// NextContainer, FlowNode). Other `goOnly` fields (CompositeBase.facts,
// BodyBase.EndFlowNode, per-node Return/FallthroughFlowNode) stay Go-only.
const MUTABLE_SLOT_FIELDS: ReadonlySet<string> = new Set([
  "DeclarationBase.Symbol",
  "ExportableBase.LocalSymbol",
  "LocalsContainerBase.Locals",
  "LocalsContainerBase.NextContainer",
  "FlowNodeBase.FlowNode",
]);

function isMutableSlotField(baseName: string, fieldName: string): boolean {
  return MUTABLE_SLOT_FIELDS.has(`${baseName}.${fieldName}`);
}

// codex-054 M3 Stage-2 Fork A: required-and-MUTABLE compiler-state fields. Unlike the
// optional MUTABLE_SLOT_FIELDS (binder slots that may be absent), these are always present
// fields emitted WITHOUT `readonly` (and WITHOUT `?`). NodeBase.Flags is the parser
// parse-state slot that #finishNode writes via `node.flags |= p.contextFlags` (tsgo
// finishNodeWithEnd, parser.go:5910); it MUST agree with the hardcoded mutable `Node.flags`
// in generateRuntimeTypes so the Node hierarchy does not split readonly/mutable (TS2320).
// Same controlled mutable-parse-state category as the pos/end TextRange slots (codex-048).
const MUTABLE_REQUIRED_FIELDS: ReadonlySet<string> = new Set([
  "NodeBase.Flags",
]);

function isMutableRequiredField(baseName: string, fieldName: string): boolean {
  return MUTABLE_REQUIRED_FIELDS.has(`${baseName}.${fieldName}`);
}

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
  const paramsSource = (definition.typeParameters ?? []).filter(param => param.name !== "TKind");
  if (!paramsSource.length) {
    return "";
  }
  const params = paramsSource.map(param => {
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

function tokenAliasNames(schema: AstSchema): ReadonlySet<string> {
  const aliases = new Set<string>(["Token"]);
  for (const definition of Object.values(schema.nodes.definitions)) {
    for (const aliasName of Object.keys(definition.instantiationAliases ?? {})) {
      aliases.add(aliasName);
    }
  }
  return aliases;
}

function isTokenAliasType(schema: AstSchema, type: string): boolean {
  return tokenAliasNames(schema).has(type.startsWith("*") ? type.slice(1) : type);
}

function formatType(schema: AstSchema, type: string | readonly string[] | undefined): string {
  if (type === undefined) {
    return "unknown";
  }
  if (isReadonlyArray(type)) {
    if (type.every(item => isTokenAliasType(schema, item))) {
      return "Token";
    }
    if (type.every(item => item.startsWith("SyntaxKind."))) {
      return "Kind";
    }
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
      return "int";
    case "string":
    case "unknown":
      return type;
    // Schema `any` mirrors TS-Go's untyped checker-Type slots; emit `unknown`
    // to honor the package's no-`any` convention.
    case "any":
      return "unknown";
    case "NodeFlags":
    case "ModifierFlags":
    case "TokenFlags":
    case "CheckFlags":
    case "FunctionFlags":
    case "TransformFlags":
      return "int";
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

  lines.push("export const KindNames: readonly string[] = [");
  for (const kind of kinds) {
    lines.push(`  ${JSON.stringify(kind.name)},`);
  }
  lines.push("];");
  lines.push("");
  lines.push("export type KindName = string;");
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
  return `${generatedHeader("schema/tsgo/ast.json")}import type { int } from "@tsonic/core/types.js";
import { Kind } from "./kind.js";
import type { EndOfFile, Statement } from "./nodes.js";
import type { Diagnostic } from "../../diagnostics/types.js";

export interface TextRange {
  // codex-048 Stage-1a: pos/end are MUTABLE parse-state. tsgo treats node
  // Loc/range as mutable (parser.go:5904-5917) so a faithful finishNode can
  // stamp ranges post-construction; same category as the M2 mutable slots.
  pos: int;
  end: int;
}

export interface Node extends TextRange {
  readonly kind: Kind;
  // codex-054 M3 Stage-2 Fork A: flags is MUTABLE parse-state. tsgo finishNodeWithEnd
  // does \`node.Flags |= p.contextFlags\` (parser.go:5910), OR-ing the parser's
  // contextFlags into the node post-construction; a faithful #finishNode must write
  // node.flags after createX builds the node. Same controlled mutable-compiler-state
  // category as the pos/end TextRange slots above (codex-048) and the parent slot below.
  flags: int;
  // codex-043 M2 Fork A: parent is a mutable binder-set slot.
  parent: Node;
  // codex-032140 ruling B: binder-owned slots surfaced on the shared Node
  // contract. tsgo's *ast.Node exposes these via typed DeclarationData()/
  // LocalsContainerData() accessors, so any node can reach them; the slots
  // physically live on DeclarationBase.symbol / LocalsContainerBase.locals +
  // nextContainer, and SourceFile already re-declares locals/nextContainer.
  // Surfacing them here (optional + mutable, same category as parent/flags
  // above) lets ast/accessors.ts read/write the binder slots through the typed
  // contract instead of an \`as unknown as { field }\` structural-erasure cast.
  symbol?: Symbol;
  locals?: Map<string, Symbol>;
  nextContainer?: Node;
  // codex-032140 M4c ruling: localSymbol is the binder's local↔export back-link
  // (tsgo ExportableBase.LocalSymbol; node.ExportableData().LocalSymbol = local in
  // declareModuleMember, binder.go:415). Same controlled-mutable binder-owned-slot
  // category as symbol/locals/nextContainer above — surfaced on the shared Node
  // contract so ast/accessors.ts reads/writes it through the typed contract instead
  // of an \`as unknown as { field }\` structural-erasure cast.
  localSymbol?: Symbol;
  readonly jsDoc?: readonly Node[];
  forEachChild(visitor: (node: Node) => boolean | undefined, visitArray?: (nodes: NodeArray<Node>) => boolean | undefined): boolean | undefined;
  getSourceFile(): SourceFile;
}

export interface NodeArray<T extends Node = Node> extends ReadonlyArray<T>, TextRange {
  readonly hasTrailingComma?: boolean;
  readonly transformFlags: int;
}

export type NodeList<T extends Node = Node> = NodeArray<T>;

export interface FileReference extends TextRange {
  readonly fileName: string;
  readonly resolutionMode: int;
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
  readonly languageVariant: int;
  readonly scriptKind: int;
  readonly isDeclarationFile: boolean;
  readonly referencedFiles: readonly FileReference[];
  readonly typeReferenceDirectives: readonly FileReference[];
  readonly libReferenceDirectives: readonly FileReference[];
  readonly imports: readonly Node[];
  readonly moduleAugmentations: readonly Node[];
  readonly ambientModuleNames: readonly string[];
  readonly externalModuleIndicator: unknown | undefined;
  readonly parseDiagnostics: readonly Diagnostic[];
  readonly tokenCache?: Map<string, Node>;
  // codex-021307 M4a Fork A: SourceFile is a HasLocals control-flow container
  // (tsgo GetContainerFlags KindSourceFile => HasLocals; binder.go:2577). The
  // binder writes the file's top-level symbol table here in place.
  locals?: Map<string, Symbol>;
  nextContainer?: Node;
}

export interface FlowNode {
  readonly flags: int;
  readonly node?: Node;
  readonly antecedent?: FlowNode;
  readonly antecedents?: unknown;
}

export interface Symbol {
  readonly name?: string;
  readonly escapedName?: string;
  // codex-021307 M4a Fork A: flags is a mutable binder slot — addDeclarationToSymbol
  // does \`symbol.Flags |= symbolFlags\` (binder.go:2531).
  flags?: int;
  // codex-043 M2 Fork A: binder-mutated symbol slots (declarations are pushed,
  // member/export tables are populated in place) — mirror TS-Go []*Node + maps.
  declarations: Node[];
  // codex-021307 M4a Fork A: valueDeclaration is mutable — SetValueDeclaration
  // writes \`symbol.ValueDeclaration = node\` (binder.go:2555).
  valueDeclaration?: Node;
  members?: Map<string, Symbol>;
  exports?: Map<string, Symbol>;
  readonly globalExports?: Map<string, Symbol>;
  // codex-021307 M4a Fork A: parent is mutable — declareSymbolEx writes the
  // symbol's owning-container parent during the bind walk (binder.go).
  parent?: Symbol;
  // codex-021307 M4a Fork A: exportSymbol is the mutable local↔export link
  // (ast.Symbol.ExportSymbol, symbol.go:20).
  exportSymbol?: Symbol;
}

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
  return Object.entries(base.fields).every(([fieldName, field]) => {
    // An allowlisted mutable slot is a TS-emitted field even though it is
    // marked `goOnly` in the schema, so a base that carries one is NOT
    // collapsed (un-collapses ExportableBase, LocalsContainerBase,
    // FlowNodeBase). Treat it as a real TS field by returning false here.
    if (isMutableSlotField(baseName, fieldName)) {
      return false;
    }
    return field.goOnly === true || (field.noTS === true && field.noFactory === true);
  });
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
    if (typeof kindMember.type === "string") {
      const typeParameter = definition.typeParameters?.find(param => param.name === kindMember.type);
      if (typeParameter !== undefined) {
        return formatType(schema, typeParameter.constraint);
      }
    }
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

function instantiationAliases(schema: AstSchema): Map<string, { readonly nodeName: string; readonly typeArgument: string }> {
  const aliases = new Map<string, { readonly nodeName: string; readonly typeArgument: string }>();
  for (const [nodeName, definition] of Object.entries(schema.nodes.definitions)) {
    for (const [aliasName, typeArgument] of Object.entries(definition.instantiationAliases ?? {})) {
      aliases.set(aliasName, { nodeName, typeArgument });
    }
  }
  return aliases;
}

function findBaseField(schema: AstSchema, baseName: string, fieldName: string, seen = new Set<string>()): MemberDefinition | undefined {
  if (seen.has(baseName)) {
    return undefined;
  }
  seen.add(baseName);
  const base = schema.bases[baseName];
  if (base === undefined) {
    return undefined;
  }
  const fields = base.fields ?? {};
  for (const [name, field] of Object.entries(fields)) {
    if (name === fieldName) {
      return { ...field, name };
    }
  }
  for (const inheritedBase of base.extends ?? []) {
    const field = findBaseField(schema, inheritedBase, fieldName, seen);
    if (field !== undefined) {
      return field;
    }
  }
  return undefined;
}

function resolveInheritedMember(schema: AstSchema, definition: NodeDefinition, member: MemberDefinition): MemberDefinition {
  if (member.type !== undefined || member.inherited !== true) {
    return member;
  }
  for (const baseName of definition.extends) {
    const field = findBaseField(schema, baseName, member.name);
    if (field !== undefined) {
      if (field.type === undefined) {
        return member;
      }
      const resolved: Record<string, unknown> = {
        ...field,
        ...member,
        type: field.type,
      };
      if (member.list === undefined && field.list !== undefined) {
        resolved.list = field.list;
      }
      if (member.optional === undefined && field.optional !== undefined) {
        resolved.optional = field.optional;
      }
      if (member.visit === undefined && field.visit !== undefined) {
        resolved.visit = field.visit;
      }
      if (member.typeGuard === undefined && field.typeGuard !== undefined) {
        resolved.typeGuard = field.typeGuard;
      }
      if (member.noFactory === undefined && field.noFactory !== undefined) {
        resolved.noFactory = field.noFactory;
      }
      if (member.noTS === undefined && field.noTS !== undefined) {
        resolved.noTS = field.noTS;
      }
      if (member.goOnly === undefined && field.goOnly !== undefined) {
        resolved.goOnly = field.goOnly;
      }
      return resolved as unknown as MemberDefinition;
    }
  }
  return member;
}

function runtimeMembers(schema: AstSchema, definition: NodeDefinition): readonly MemberDefinition[] {
  return (definition.members ?? [])
    .map(member => resolveInheritedMember(schema, definition, member))
    .filter(member => {
      if (member.name === "Kind" || member.name === "kind") {
        return false;
      }
      if (member.noTS === true || member.goOnly === true || member.noFactory === true) {
        return false;
      }
      return member.type !== undefined;
    });
}

function dataPropertyName(name: string): string {
  return lowerFirst(name);
}

function parameterName(name: string): string {
  const lowered = dataPropertyName(name);
  return lowered === "arguments" ? "arguments_" : lowered;
}

function isPrimitiveTypeName(type: string): boolean {
  switch (type) {
    case "bool":
    case "int":
    case "string":
    case "unknown":
    case "any":
    case "NodeFlags":
    case "ModifierFlags":
    case "TokenFlags":
    case "CheckFlags":
    case "FunctionFlags":
    case "TransformFlags":
      return true;
    default:
      return false;
  }
}

function formatRuntimeType(schema: AstSchema, type: string | readonly string[] | undefined): string {
  if (type === undefined) {
    return "unknown";
  }
  if (isReadonlyArray(type)) {
    if (type.every(item => isTokenAliasType(schema, item))) {
      return "Ast.Token";
    }
    if (type.every(item => item.startsWith("SyntaxKind."))) {
      return "Kind";
    }
    return type.map(item => formatRuntimeType(schema, item)).join(" | ");
  }
  if (type.startsWith("SyntaxKind.")) {
    return formatKindType(type);
  }
  if (type.startsWith("*")) {
    return formatRuntimeType(schema, type.slice(1));
  }
  if (isPrimitiveTypeName(type)) {
    return formatType(schema, type);
  }
  switch (type) {
    case "Node":
    case "NodeArray":
    case "SourceFile":
    case "Path":
    case "Symbol":
      return type;
    default:
      if (type === "TKind") {
        return "Ast.TokenSyntaxKind";
      }
      return `Ast.${type}`;
  }
}

function formatRuntimeMemberType(schema: AstSchema, member: MemberDefinition): string {
  const itemType = formatRuntimeType(schema, member.type);
  switch (member.list) {
    case "NodeList":
    case "ModifierList":
      return `NodeArray<${itemType}>`;
    case "raw":
      return `readonly ${itemType}[]`;
    default:
      return itemType;
  }
}

function runtimeTypeParameters(schema: AstSchema, definition: NodeDefinition): string {
  const paramsSource = (definition.typeParameters ?? []).filter(param => param.name !== "TKind");
  if (!paramsSource.length) {
    return "";
  }
  const params = paramsSource.map(param => {
    const constraint = formatRuntimeType(schema, param.constraint);
    const defaultType = param.default === undefined ? "" : ` = ${formatRuntimeType(schema, param.default)}`;
    return `${param.name} extends ${constraint}${defaultType}`;
  });
  return `<${params.join(", ")}>`;
}

function kindNamesFromType(schema: AstSchema, type: string | readonly string[] | undefined, definition: NodeDefinition): string[] {
  if (type === undefined) {
    return [];
  }
  if (isReadonlyArray(type)) {
    return type.flatMap(item => kindNamesFromType(schema, item, definition));
  }
  if (type.startsWith("SyntaxKind.")) {
    return [type.slice("SyntaxKind.".length)];
  }
  const typeParameter = definition.typeParameters?.find(param => param.name === type);
  if (typeParameter !== undefined) {
    return kindNamesFromType(schema, typeParameter.constraint, definition);
  }
  const kindAlias = schema.kinds.aliases?.[type];
  if (kindAlias !== undefined) {
    return expandKindAlias(schema, kindAlias);
  }
  if (type === "Kind") {
    return normalizeKinds(schema).map(kind => kind.name);
  }
  // A bare concrete kind name (e.g. instantiation-alias type arguments like
  // `TrueKeyword` for `TrueLiteral = Token<TrueKeyword>`) resolves to itself.
  if (concreteKindNames(schema).has(type)) {
    return [type];
  }
  return [];
}

function concreteNodeEntries(schema: AstSchema): {
  readonly name: string;
  readonly definitionName: string;
  readonly returnType: string;
  readonly kindType: string;
  readonly kindNames: readonly string[];
  readonly definition: NodeDefinition;
  readonly members: readonly MemberDefinition[];
  readonly typeParameters: string;
  readonly typeArguments: string;
}[] {
  const entries: {
    readonly name: string;
    readonly definitionName: string;
    readonly returnType: string;
    readonly kindType: string;
    readonly kindNames: readonly string[];
    readonly definition: NodeDefinition;
    readonly members: readonly MemberDefinition[];
    readonly typeParameters: string;
    readonly typeArguments: string;
  }[] = [];

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
        const variantName = kindName.slice("SyntaxKind.".length);
        entries.push({
          name: variantName,
          definitionName: name,
          returnType: `Ast.${variantName}`,
          kindType: formatKindType(variantName),
          kindNames: [variantName],
          definition,
          members: runtimeMembers(schema, definition),
          typeParameters: "",
          typeArguments: "",
        });
      }
      continue;
    }

    const params = (definition.typeParameters ?? []).filter(param => param.name !== "TKind");
    const hasKindTypeParameter = definition.typeParameters?.some(param => param.name === "TKind") === true;
    const kindNames = (isReadonlyArray(definition.kind) ? definition.kind : [definition.kind ?? name])
      .map(kindName => kindName.startsWith("SyntaxKind.") ? kindName.slice("SyntaxKind.".length) : kindName);
    const returnType = `Ast.${name}${params.length > 0 ? `<${params.map(param => param.name).join(", ")}>` : ""}`;
    for (const [index, kindName] of kindNames.entries()) {
      entries.push({
        name: index === 0 ? name : kindName,
        definitionName: name,
        returnType,
        kindType: hasKindTypeParameter ? kindType(schema, name, definition) : formatKindType(kindName),
        kindNames,
        definition,
        members: runtimeMembers(schema, definition),
        typeParameters: runtimeTypeParameters(schema, definition),
        typeArguments: params.length > 0 ? `<${params.map(param => param.name).join(", ")}>` : "",
      });
    }
  }

  return entries;
}

function generateFactory(schema: AstSchema): string {
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];
  lines.push("import type { int } from \"@tsonic/core/types.js\";");
  lines.push("");
  lines.push("import { Kind } from \"./kind.js\";");
  lines.push("import { forEachChild } from \"./visitor.js\";");
  lines.push("import type * as Ast from \"./nodes.js\";");
  lines.push("import type { Node, NodeArray, Path, SourceFile, Symbol } from \"./types.js\";");
  lines.push("import type { Diagnostic } from \"../../diagnostics/types.js\";");
  lines.push("");
  lines.push("type NodeData = Record<string, unknown>;");
  lines.push("");
  lines.push("export class NodeObject implements Node {");
  lines.push("  readonly kind: Kind;");
  lines.push("  flags = 0;");
  lines.push("  // codex-048 Stage-1a: pos/end are MUTABLE parse-state (tsgo");
  lines.push("  // parser.go:5904-5917) so finishNode can stamp ranges post-construction.");
  lines.push("  pos: int;");
  lines.push("  end: int;");
  lines.push("  parent: Node = undefined!;");
  lines.push("  symbol?: Symbol;");
  lines.push("  locals?: Map<string, Symbol>;");
  lines.push("  nextContainer?: Node;");
  lines.push("  localSymbol?: Symbol;");
  lines.push("  readonly jsDoc?: readonly Node[];");
  lines.push("  readonly #data: NodeData;");
  lines.push("");
  lines.push("  constructor(kind: Kind, data: NodeData = {}, pos: int = -1, end: int = -1) {");
  lines.push("    this.kind = kind;");
  lines.push("    this.#data = data;");
  lines.push("    this.pos = pos;");
  lines.push("    this.end = end;");
  lines.push("  }");
  lines.push("");

  const getterNames = new Set<string>();
  for (const base of Object.values(schema.bases)) {
    for (const [fieldName, field] of Object.entries(base.fields ?? {})) {
      if (field.noTS !== true && field.goOnly !== true) {
        getterNames.add(dataPropertyName(fieldName));
      }
    }
  }
  for (const definition of Object.values(schema.nodes.definitions)) {
    for (const member of runtimeMembers(schema, definition)) {
      getterNames.add(dataPropertyName(member.name));
    }
  }
  for (const name of [
    "fileName",
    "path",
    "languageVariant",
    "scriptKind",
    "isDeclarationFile",
    "referencedFiles",
    "typeReferenceDirectives",
    "libReferenceDirectives",
    "imports",
    "moduleAugmentations",
    "ambientModuleNames",
    "externalModuleIndicator",
    "parseDiagnostics",
    "tokenCache",
  ]) {
    getterNames.add(name);
  }
  for (const ownProperty of ["kind", "flags", "pos", "end", "parent", "jsDoc"]) {
    getterNames.delete(ownProperty);
  }
  for (const getterName of [...getterNames].sort()) {
    lines.push(`  get ${getterName}(): unknown { return this.#data[${JSON.stringify(getterName)}]; }`);
  }
  lines.push("");
  lines.push("  forEachChild(visitor: (node: Node) => boolean | undefined, visitArray?: (nodes: NodeArray<Node>) => boolean | undefined): boolean | undefined {");
  lines.push("    return forEachChild(this, visitor, visitArray);");
  lines.push("  }");
  lines.push("");
  lines.push("  getSourceFile(): SourceFile {");
  lines.push("    let current: Node = this;");
  lines.push("    while (current.parent !== undefined) {");
  lines.push("      current = current.parent;");
  lines.push("    }");
  lines.push("    return current as SourceFile;");
  lines.push("  }");
  lines.push("}");
  lines.push("");
  lines.push("export function createNode(kind: Kind, data: NodeData = {}, pos: int = -1, end: int = -1): Node {");
  lines.push("  return new NodeObject(kind, data, pos, end);");
  lines.push("}");
  lines.push("");
  lines.push("function kindDebugName(kind: Kind): string {");
  lines.push("  return String(kind);");
  lines.push("}");
  lines.push("");
  lines.push("function sameValue(left: unknown, right: unknown): boolean {");
  lines.push("  return left === right;");
  lines.push("}");
  lines.push("");
  lines.push("function nodeField(node: Node, key: string): unknown {");
  lines.push("  return (node as unknown as Record<string, unknown>)[key];");
  lines.push("}");
  lines.push("");
  lines.push("function valueAsUnknown<T>(value: T): unknown {");
  lines.push("  return value as unknown;");
  lines.push("}");
  lines.push("");
  lines.push("function attachChildren(parent: Node): void {");
  lines.push("  forEachChild(parent, (child) => {");
  lines.push("    child.parent = parent;");
  lines.push("    return undefined;");
  lines.push("  });");
  lines.push("}");
  lines.push("");
  lines.push("function createNodeArrayImpl<T extends Node>(elements: readonly T[], pos: int = -1, end: int = -1): NodeArray<T> {");
  lines.push("  void pos;");
  lines.push("  void end;");
  lines.push("  return elements.slice() as unknown as NodeArray<T>;");
  lines.push("}");
  lines.push("");
  lines.push("export const createNodeArray = createNodeArrayImpl;");
  lines.push("");

  for (const entry of concreteNodeEntries(schema)) {
    const memberParams = entry.members.map(member => {
      const type = formatRuntimeMemberType(schema, member);
      const optionalType = member.optional === true ? `${type} | undefined` : type;
      return `${parameterName(member.name)}: ${optionalType}`;
    });
    const kindTypeParameter = entry.definition.typeParameters?.find(param => param.name === "TKind");
    const acceptsKindParameter = kindTypeParameter !== undefined;
    const kindParameterType = kindTypeParameter === undefined ? entry.kindType : `Ast.${kindTypeParameter.constraint}`;
    const params = acceptsKindParameter ? [`kind: ${kindParameterType}`, ...memberParams] : memberParams;
    const kindExpression = acceptsKindParameter ? "kind as Kind" : entry.kindType;
    const dataMembers = entry.members.filter(member => dataPropertyName(member.name) !== "flags");
    const dataEntries = dataMembers.map(member => `${JSON.stringify(dataPropertyName(member.name))}: ${parameterName(member.name)}`);
    const dataExpression = dataEntries.length === 0 ? "{}" : `{ ${dataEntries.join(", ")} }`;
    const flagsMember = entry.members.find(member => dataPropertyName(member.name) === "flags");
    lines.push(`export function create${entry.name}${entry.typeParameters}(${params.join(", ")}): ${entry.returnType} {`);
    lines.push(`  const node = createNode(${kindExpression}, ${dataExpression}) as ${entry.returnType};`);
    if (flagsMember !== undefined) {
      lines.push(`  node.flags = ${parameterName(flagsMember.name)};`);
    }
    if (dataMembers.some(member => isNodeMember(schema, member))) {
      lines.push("  attachChildren(node);");
    }
    lines.push("  return node;");
    lines.push("}");
    lines.push("");
    const updateParams = [`node: ${entry.returnType}`, ...memberParams];
    lines.push(`export function update${entry.name}${entry.typeParameters}(${updateParams.join(", ")}): ${entry.returnType} {`);
    if (entry.members.length === 0) {
      lines.push("  return node;");
    } else {
      const comparisons = entry.members.map(member => `sameValue(nodeField(node, ${JSON.stringify(dataPropertyName(member.name))}), valueAsUnknown(${parameterName(member.name)}))`);
      lines.push(`  if (${comparisons.join(" && ")}) {`);
      lines.push("    return node;");
      lines.push("  }");
      const createArgs = acceptsKindParameter ? ["node.kind", ...entry.members.map(member => parameterName(member.name))] : entry.members.map(member => parameterName(member.name));
      if (entry.kindNames.length > 1 && entry.name === entry.definitionName) {
        lines.push("  switch (node.kind) {");
        for (const kindName of entry.kindNames) {
          lines.push(`    case Kind.${enumMemberName(kindName)}:`);
          lines.push(`      return create${kindName}${entry.typeArguments}(${createArgs.join(", ")});`);
        }
        lines.push("    default:");
        lines.push(`      throw new Error(\`Unexpected kind in update${entry.name}: \${kindDebugName(node.kind)}\`);`);
        lines.push("  }");
      } else {
        lines.push(`  return create${entry.name}${entry.typeArguments}(${createArgs.join(", ")});`);
      }
    }
    lines.push("}");
    lines.push("");
  }

  lines.push("export function createSourceFile(fileName: string, path: Path, text: string, statements: NodeArray<Ast.Statement>, endOfFileToken: Ast.EndOfFile, parseDiagnostics: readonly Diagnostic[], languageVariant: int, scriptKind: int, externalModuleIndicator: unknown | undefined = undefined): SourceFile {");
  lines.push("  const node = createNode(Kind.SourceFile, {");
  lines.push("    fileName,");
  lines.push("    path,");
  lines.push("    text,");
  lines.push("    statements,");
  lines.push("    endOfFileToken,");
  lines.push("    languageVariant,");
  lines.push("    scriptKind,");
  lines.push("    isDeclarationFile: false,");
  lines.push("    referencedFiles: [],");
  lines.push("    typeReferenceDirectives: [],");
  lines.push("    libReferenceDirectives: [],");
  lines.push("    imports: [],");
  lines.push("    moduleAugmentations: [],");
  lines.push("    ambientModuleNames: [],");
  lines.push("    externalModuleIndicator,");
  lines.push("    parseDiagnostics,");
  lines.push("  }) as SourceFile;");
  lines.push("  attachChildren(node);");
  lines.push("  return node;");
  lines.push("}");
  lines.push("");
  lines.push("export function updateSourceFile(node: SourceFile, statements: NodeArray<Ast.Statement>, endOfFileToken: Ast.EndOfFile): SourceFile {");
  lines.push("  if (node.statements === statements && node.endOfFileToken === endOfFileToken) {");
  lines.push("    return node;");
  lines.push("  }");
  lines.push("  const updated = createSourceFile(node.fileName, node.path, node.text, statements, endOfFileToken, node.parseDiagnostics, node.languageVariant, node.scriptKind, node.externalModuleIndicator);");
  lines.push("  return updated;");
  lines.push("}");
  lines.push("");
  lines.push("export function cloneNode(node: Node): Node {");
  lines.push("  const data: NodeData = {};");
  for (const getterName of [...getterNames].sort()) {
    lines.push(`  if ((node as { readonly ${getterName}?: unknown }).${getterName} !== undefined) data[${JSON.stringify(getterName)}] = (node as { readonly ${getterName}?: unknown }).${getterName};`);
  }
  lines.push("  const clone = createNode(node.kind, data, node.pos, node.end);");
  lines.push("  (clone as { flags: int }).flags = node.flags;");
  lines.push("  return clone;");
  lines.push("}");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function isNodeTypeName(schema: AstSchema, typeName: string, seen = new Set<string>()): boolean {
  if (typeName.startsWith("*")) {
    return isNodeTypeName(schema, typeName.slice(1), seen);
  }
  if (typeName.startsWith("SyntaxKind.") || isPrimitiveTypeName(typeName) || kindAliasNames(schema).has(typeName)) {
    return false;
  }
  if (typeName === "Node" || typeName === "SourceFile" || Object.hasOwn(schema.nodes.definitions, typeName) || Object.hasOwn(schema.nodes.listAliases ?? {}, typeName)) {
    return true;
  }
  if (instantiationAliases(schema).has(typeName)) {
    return true;
  }
  if (seen.has(typeName)) {
    return false;
  }
  seen.add(typeName);
  const alias = schema.nodes.aliases[typeName];
  if (alias === undefined) {
    return false;
  }
  if (isBaseNodeAlias(alias)) {
    return true;
  }
  return alias.some(member => isNodeTypeName(schema, member, seen));
}

function isNodeMember(schema: AstSchema, member: MemberDefinition): boolean {
  if (member.type === undefined) {
    return false;
  }
  if (isReadonlyArray(member.type)) {
    return member.type.some(type => isNodeTypeName(schema, type));
  }
  return isNodeTypeName(schema, member.type);
}

function nodeKindCases(schema: AstSchema, name: string, definition: NodeDefinition): string[] {
  if (definition.handWritten === true) {
    return [name];
  }
  const kindMember = definition.members?.find(member => member.name === "Kind" || member.name === "kind");
  if (kindMember?.type !== undefined) {
    const kindNames = kindNamesFromType(schema, kindMember.type, definition);
    if (kindNames.length > 0) {
      return kindNames;
    }
  }
  if (isVariantNode(schema, name, definition)) {
    if (kindMember?.type !== undefined && isReadonlyArray(kindMember.type)) {
      return kindMember.type.map(type => type.slice("SyntaxKind.".length));
    }
  }
  const kindValues = isReadonlyArray(definition.kind) ? definition.kind : [definition.kind ?? name];
  return kindValues.map(kind => kind.startsWith("SyntaxKind.") ? kind.slice("SyntaxKind.".length) : kind);
}

function generateVisitor(schema: AstSchema): string {
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];
  lines.push("import type { int } from \"@tsonic/core/types.js\";");
  lines.push("import { Kind } from \"./kind.js\";");
  lines.push("import type { Node, NodeArray } from \"./types.js\";");
  lines.push("");
  lines.push("function visitNode(node: Node | undefined, visitor: (node: Node) => boolean | undefined): boolean | undefined {");
  lines.push("  return node === undefined ? undefined : visitor(node);");
  lines.push("}");
  lines.push("");
  lines.push("function visitNodes(nodes: NodeArray<Node> | undefined, visitor: (node: Node) => boolean | undefined, visitArray?: (nodes: NodeArray<Node>) => boolean | undefined): boolean | undefined {");
  lines.push("  if (nodes === undefined) {");
  lines.push("    return undefined;");
  lines.push("  }");
  lines.push("  const arrayResult = visitArray?.(nodes);");
  lines.push("  if (arrayResult !== undefined) {");
  lines.push("    return arrayResult;");
  lines.push("  }");
  lines.push("  for (const node of nodes) {");
  lines.push("    const result = visitor(node);");
  lines.push("    if (result !== undefined) {");
  lines.push("      return result;");
  lines.push("    }");
  lines.push("  }");
  lines.push("  return undefined;");
  lines.push("}");
  lines.push("");
  lines.push("export function forEachChild(node: Node, visitor: (node: Node) => boolean | undefined, visitArray?: (nodes: NodeArray<Node>) => boolean | undefined): boolean | undefined {");
  lines.push("  switch (node.kind) {");

  const entries = Object.entries(schema.nodes.definitions);
  for (const [name, definition] of entries) {
    const members = runtimeMembers(schema, definition).filter(member => isNodeMember(schema, member));
    if (members.length === 0) {
      continue;
    }
    for (const kindName of nodeKindCases(schema, name, definition)) {
      lines.push(`    case Kind.${enumMemberName(kindName)}:`);
    }
    lines.push("      {");
    lines.push("        const typedNode = node as unknown as Record<string, unknown>;");
    for (const [index, member] of members.entries()) {
      const propName = dataPropertyName(member.name);
      const resultName = `childResult${index}`;
      if (member.list === "NodeList" || member.list === "ModifierList" || member.list === "raw") {
        lines.push(`        const ${resultName} = visitNodes(typedNode[${JSON.stringify(propName)}] as NodeArray<Node> | undefined, visitor, visitArray);`);
      } else {
        lines.push(`        const ${resultName} = visitNode(typedNode[${JSON.stringify(propName)}] as Node | undefined, visitor);`);
      }
      lines.push(`        if (${resultName} !== undefined) return ${resultName};`);
    }
    lines.push("        return undefined;");
    lines.push("      }");
  }

  lines.push("    default:");
  lines.push("      return undefined;");
  lines.push("  }");
  lines.push("}");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function guardKindCasesForType(schema: AstSchema, typeName: string, kindToNodeType: ReadonlyMap<string, string>, seen = new Set<string>()): string[] {
  if (seen.has(typeName)) {
    return [];
  }
  seen.add(typeName);
  if (typeName === "Node") {
    return normalizeKinds(schema).map(kind => kind.name);
  }
  if (typeName === "SourceFile") {
    return ["SourceFile"];
  }
  const instantiationAlias = instantiationAliases(schema).get(typeName);
  if (instantiationAlias !== undefined) {
    return kindNamesFromType(schema, instantiationAlias.typeArgument, schema.nodes.definitions[instantiationAlias.nodeName]!);
  }
  if (concreteKindNames(schema).has(typeName) && kindToNodeType.has(typeName)) {
    return [typeName];
  }
  const definition = schema.nodes.definitions[typeName];
  if (definition !== undefined) {
    return nodeKindCases(schema, typeName, definition);
  }
  const alias = schema.nodes.aliases[typeName];
  if (alias !== undefined) {
    if (isBaseNodeAlias(alias)) {
      return Object.entries(schema.nodes.definitions)
        .filter(([, definition]) => baseExtendsTransitive(schema, definition, alias.base))
        .flatMap(([nodeName, definition]) => nodeKindCases(schema, nodeName, definition));
    }
    return alias.flatMap(member => guardKindCasesForType(schema, member, kindToNodeType, seen));
  }
  const kindAlias = schema.kinds.aliases?.[typeName];
  if (kindAlias !== undefined) {
    return expandKindAlias(schema, kindAlias).map(kindName => kindToNodeType.get(kindName)).filter((nodeType): nodeType is string => nodeType !== undefined).flatMap(nodeType => guardKindCasesForType(schema, nodeType, kindToNodeType, seen));
  }
  const nodeType = kindToNodeType.get(typeName);
  return nodeType === undefined ? [] : guardKindCasesForType(schema, nodeType, kindToNodeType, seen);
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function generateGuards(schema: AstSchema): string {
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];
  lines.push("import { Kind } from \"./kind.js\";");
  lines.push("import type * as Ast from \"./nodes.js\";");
  lines.push("import type { Node, SourceFile } from \"./types.js\";");
  lines.push("");

  const kindToNodeType = syntaxKindToNodeType(schema);
  const emitted = new Set<string>();
  const emitGuard = (name: string, type: string): void => {
    if (emitted.has(name)) {
      return;
    }
    emitted.add(name);
    const cases = unique(guardKindCasesForType(schema, name, kindToNodeType));
    if (cases.length === 0) {
      lines.push(`export function is${name}(_node: Node): _node is ${type} {`);
      lines.push("  return false;");
      lines.push("}");
      lines.push("");
      return;
    }
    const condition = cases.map(kindName => `node.kind === Kind.${enumMemberName(kindName)}`).join(" || ");
    lines.push(`export function is${name}(node: Node): node is ${type} {`);
    lines.push(`  return ${condition};`);
    lines.push("}");
    lines.push("");
  };

  for (const [name, definition] of Object.entries(schema.nodes.definitions)) {
    if (definition.handWritten === true && name === "SourceFile") {
      emitGuard("SourceFile", "SourceFile");
      continue;
    }
    if (isVariantNode(schema, name, definition)) {
      const kindMember = definition.members?.find(member => member.name === "Kind" || member.name === "kind");
      if (kindMember?.type !== undefined && isReadonlyArray(kindMember.type)) {
        for (const kindName of kindMember.type) {
          const variantName = kindName.slice("SyntaxKind.".length);
          emitGuard(variantName, `Ast.${variantName}`);
        }
      }
      emitGuard(name, `Ast.${name}`);
      continue;
    }
    emitGuard(name, `Ast.${name}`);
  }

  for (const aliasName of instantiationAliases(schema).keys()) {
    emitGuard(aliasName, `Ast.${aliasName}`);
  }

  for (const name of Object.keys(schema.nodes.aliases)) {
    emitGuard(name, `Ast.${name}`);
  }

  return `${lines.join("\n")}\n`;
}

function nodeDataEncoding(schema: AstSchema, name: string, definition: NodeDefinition): "children" | "string" | "extended" {
  if (name === "SourceFile") {
    return "extended";
  }
  if (baseExtendsTransitive(schema, definition, "LiteralLikeNodeBase")) {
    return baseExtendsTransitive(schema, definition, "LiteralExpressionBase") || baseExtendsTransitive(schema, definition, "TemplateLiteralLikeNodeBase")
      ? "extended"
      : "string";
  }
  if (runtimeMembers(schema, definition).some(member => member.name === "Text" && member.type === "string")) {
    return "string";
  }
  return "children";
}

function generateMetadata(schema: AstSchema): string {
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];
  lines.push("import { Kind } from \"./kind.js\";");
  lines.push("");
  lines.push("export type NodeDataEncoding = \"children\" | \"string\" | \"extended\";");
  lines.push("export interface NodeDataEncodingTable {");
  lines.push("  readonly children: NodeDataEncoding;");
  lines.push("  readonly string: NodeDataEncoding;");
  lines.push("  readonly extended: NodeDataEncoding;");
  lines.push("}");
  lines.push("export const NodeDataEncoding: NodeDataEncodingTable = {");
  lines.push("  children: \"children\",");
  lines.push("  string: \"string\",");
  lines.push("  extended: \"extended\",");
  lines.push("};");
  lines.push("");
  const childPropertyLines: string[] = [];
  const dataEncodingLines: string[] = [];

  for (const [name, definition] of Object.entries(schema.nodes.definitions)) {
    const childProperties = runtimeMembers(schema, definition)
      .filter(member => isNodeMember(schema, member))
      .map(member => dataPropertyName(member.name));
    const encoding = nodeDataEncoding(schema, name, definition);
    for (const kindName of nodeKindCases(schema, name, definition)) {
      childPropertyLines.push(`  [Kind.${enumMemberName(kindName)}, ${stableJson(childProperties)}],`);
      dataEncodingLines.push(`  [Kind.${enumMemberName(kindName)}, NodeDataEncoding.${encoding}],`);
    }
  }
  lines.push("const childPropertiesByKind: ReadonlyMap<Kind, readonly string[]> = new Map([");
  lines.push(...childPropertyLines);
  lines.push("]);");
  lines.push("");
  lines.push("const dataEncodingByKind: ReadonlyMap<Kind, NodeDataEncoding> = new Map([");
  lines.push(...dataEncodingLines);
  lines.push("]);");
  lines.push("");
  lines.push("export { childPropertiesByKind as ChildPropertiesByKind, dataEncodingByKind as DataEncodingByKind };");
  lines.push("");

  return `${lines.join("\n")}\n`;
}

function generateNodeTypes(schema: AstSchema): string {
  const lines: string[] = [generatedHeader("schema/tsgo/ast.json")];
  lines.push("import type { int } from \"@tsonic/core/types.js\";");
  lines.push("import { Kind } from \"./kind.js\";");
  lines.push("import type { FlowNode, Node, NodeArray, SourceFile, Symbol } from \"./types.js\";");
  // codex-043 mutable slots: LocalsContainerBase.Locals is `SymbolTable`, which
  // is defined in the handwritten aliases module (Map<string, Symbol>). The
  // import is type-only, so the nodes.ts <-> aliases.ts cycle is erased.
  lines.push("import type { SymbolTable } from \"../aliases.js\";");
  lines.push("");
  lines.push("export type ModifierFlags = int;");
  lines.push("export type TokenFlags = int;");
  lines.push("export type TransformFlags = int;");
  lines.push("export type CheckFlags = int;");
  lines.push("export type FunctionFlags = int;");
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
      const isSlot = isMutableSlotField(name, fieldName);
      if (!isSlot && (field.noTS === true || field.goOnly === true)) {
        continue;
      }
      if (isSlot) {
        // codex-043 mutable compiler-state slot: optional + mutable (no readonly).
        lines.push(`  ${lowerFirst(fieldName)}?: ${formatMemberType(schema, { ...field, name: fieldName })};`);
        continue;
      }
      if (isMutableRequiredField(name, fieldName)) {
        // codex-054 M3 Stage-2 Fork A: required + mutable (no readonly), e.g. NodeBase.Flags.
        lines.push(`  ${lowerFirst(fieldName)}: ${formatMemberType(schema, { ...field, name: fieldName })};`);
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
    if (isBaseNodeAlias(alias)) {
      lines.push(`export type ${name} = ${typeNameForBase(alias.base)};`);
    } else {
      lines.push(`export type ${name} = ${expandNodeAliasMembers(schema, alias, kindToNodeType).join(" | ")};`);
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
      const kindType = kindAliasNames(schema).has(kindName) ? kindName : formatKindType(kindName);
      lines.push(`export interface ${aliasName} extends ${name} {`);
      lines.push(`  readonly kind: ${kindType};`);
      lines.push("}");
    }
  }
  lines.push("");

  for (const [name, item] of Object.entries(schema.nodes.listAliases ?? {})) {
    lines.push(`export type ${name} = NodeArray<${item}>;`);
  }
  lines.push("");

  return `${lines.join("\n")}\n`;
}

// The generated barrel also re-exports two deterministic handwritten-extension
// modules that live beside the generated output: `aliases.ts` (naming aliases +
// TS-Go-side types like SymbolTable/FlowLabel) and `accessors.ts` (TS-Go-style
// accessor functions like nodeKind/nodePos/nodeEnd). They are not schema-driven,
// but the generator owns the barrel, so it must emit their exports to keep
// generation replayable (zero-diff) instead of relying on post-generation edits.
function generateIndex(): string {
  return [
    generatedHeader("schema/tsgo/ast.json").trimEnd(),
    `export * from "./flags.js";`,
    `export * from "./generated/kind.js";`,
    `export * from "./generated/types.js";`,
    `export * from "./generated/nodes.js";`,
    `export * from "./generated/factory.js";`,
    `export * from "./generated/visitor.js";`,
    `export * from "./generated/is.js";`,
    `export * from "./generated/metadata.js";`,
    `// Faithful 1:1 AST utility helpers (sole owner of the shared predicates).`,
    `export * from "./utilities.js";`,
    `// Naming aliases + TS-Go-side types (SymbolTable, FlowLabel, etc.)`,
    `export * from "./aliases.js";`,
    `// TS-Go-style accessor functions (nodeKind, nodeParent, etc.) so`,
    "// transformer files can ESM-import them instead of `declare`ing.",
    `export * from "./accessors.js";`,
    `// FlowFlags const-bitset (control-flow-graph node flags; flow.go:5-23).`,
    `export * from "./flowFlags.js";`,
    "",
  ].join("\n");
}

// formatType maps schema `any` -> emitted `unknown` for TSTS's no-`any`
// surface. Only SyntheticExpression.Type is allowed to be `any` (TS-Go models
// it as an untyped checker-Type slot). Guard against a future upstream schema
// refresh silently introducing new `any` members whose semantics nobody
// reviewed — fail loudly so the mapping decision stays explicit.
const APPROVED_ANY_MEMBERS: ReadonlySet<string> = new Set(["SyntheticExpression.Type"]);

function assertApprovedAnyMembers(schema: AstSchema): void {
  const offenders: string[] = [];
  for (const [nodeName, definition] of Object.entries(schema.nodes.definitions)) {
    for (const member of definition.members ?? []) {
      if (member.type === "any" && !APPROVED_ANY_MEMBERS.has(`${nodeName}.${member.name}`)) {
        offenders.push(`${nodeName}.${member.name}`);
      }
    }
  }
  for (const [baseName, base] of Object.entries(schema.bases)) {
    for (const [fieldName, field] of Object.entries(base.fields ?? {})) {
      if (field.type === "any" && !APPROVED_ANY_MEMBERS.has(`${baseName}.${fieldName}`)) {
        offenders.push(`${baseName}.${fieldName}`);
      }
    }
  }
  if (offenders.length > 0) {
    throw new Error(
      `Review required: schema has \`any\` member(s) not on the approved list: ${offenders.join(", ")}. `
      + "The generator maps `any` -> `unknown`; confirm the intended emitted type and update "
      + "APPROVED_ANY_MEMBERS in tools/generateAst.ts.",
    );
  }
}

async function main(): Promise<void> {
  const schema = await readAstSchema();
  assertApprovedAnyMembers(schema);
  await writeGenerated("src/ast/generated/kind.ts", generateKind(schema));
  await writeGenerated("src/ast/generated/schema.ts", generateSchemaContract(schema));
  await writeGenerated("src/ast/generated/types.ts", generateRuntimeTypes());
  await writeGenerated("src/ast/generated/nodes.ts", generateNodeTypes(schema));
  await writeGenerated("src/ast/generated/factory.ts", generateFactory(schema));
  await writeGenerated("src/ast/generated/visitor.ts", generateVisitor(schema));
  await writeGenerated("src/ast/generated/is.ts", generateGuards(schema));
  await writeGenerated("src/ast/generated/metadata.ts", generateMetadata(schema));
  await writeGenerated("src/ast/index.ts", generateIndex());
}

await main();
