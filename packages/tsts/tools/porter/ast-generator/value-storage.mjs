import { safePropertyName } from "../core/names.mjs";

const nodeFields = Object.freeze([
  field("Kind", "Kind", "0 as Kind"),
  field("Flags", "NodeFlags", "0 as NodeFlags"),
  field("Loc", "TextRange", "NewTextRange(0 as int, 0 as int)", "text-range"),
  field("id", "Uint64", "new Uint64()", "uint64"),
  field("Parent", "GoPtr<Node>", "undefined"),
  field("data", "GoInterface<nodeData>", "undefined"),
]);

export function concreteNodeValueStorage(schema, nodeName, options) {
  const { handWrittenBases, memberType } = requireOptions(options);
  if (schema.definitions[nodeName]?.handWritten) {
    throw new Error(`hand-written AST node '${nodeName}' cannot use generated concrete value storage`);
  }
  const fields = new Map();
  for (const entry of nodeFields) addField(fields, entry, `${nodeName}.Node`);
  for (const baseName of schema.baseChainOf(nodeName)) {
    if (handWrittenBases.has(baseName)) continue;
    for (const member of schema.baseFields(baseName)) addMemberField(fields, member, `${nodeName}.${baseName}`, memberType);
  }
  for (const member of schema.members(nodeName)) {
    if (member.isKindParam()) continue;
    addMemberField(fields, member, nodeName, memberType);
  }
  return Object.freeze([...fields.values()]);
}

export function generatedBaseValueStorage(schema, baseName, options) {
  const { handWrittenBases, memberType } = requireOptions(options);
  if (!(baseName in schema.bases) || handWrittenBases.has(baseName)) {
    throw new Error(`'${baseName}' is not a generator-owned AST base`);
  }
  const fields = new Map();
  if (schema.baseChainOf(baseName).includes("NodeBase")) {
    for (const entry of nodeFields) addField(fields, entry, `${baseName}.Node`);
  }
  for (const inheritedBase of schema.baseChainOf(baseName)) {
    if (handWrittenBases.has(inheritedBase)) continue;
    for (const member of schema.baseFields(inheritedBase)) addMemberField(fields, member, `${baseName}.${inheritedBase}`, memberType);
  }
  for (const member of schema.baseFields(baseName)) addMemberField(fields, member, baseName, memberType);
  return Object.freeze([...fields.values()]);
}

export function renderStorageProperty(fieldPlan) {
  return `${safePropertyName(fieldPlan.name)}: ${fieldPlan.type} = ${fieldPlan.zero};`;
}

export function renderStorageCopyAssignment(fieldPlan, source = "value", target = "result") {
  if (!fieldPlan.copyFromGo) return undefined;
  const property = safePropertyName(fieldPlan.name);
  const sourceExpression = property === fieldPlan.name ? `${source}.${property}` : `${source}[${property}]`;
  const expression = fieldPlan.copyKind === "identity" ? sourceExpression
    : fieldPlan.copyKind === "text-range" ? `copyTextRange(${sourceExpression})`
      : fieldPlan.copyKind === "uint32" ? `copyUint32(${sourceExpression})`
        : fieldPlan.copyKind === "uint64" ? `copyUint64(${sourceExpression})`
          : undefined;
  if (expression === undefined) throw new Error(`AST generated value field '${fieldPlan.name}' has invalid copy operation '${fieldPlan.copyKind}'`);
  const targetExpression = property === fieldPlan.name ? `${target}.${property}` : `${target}[${property}]`;
  return `${targetExpression} = ${expression};`;
}

export function renderValueCopyHelpers() {
  return Object.freeze([
    `function copyTextRange(value: TextRange): TextRange {`,
    `  return NewTextRange(value.pos, value.end);`,
    `}`,
    ``,
    `function copyUint32(value: Uint32): Uint32 {`,
    `  const result = new Uint32();`,
    `  result.Store(value.Load());`,
    `  return result;`,
    `}`,
    ``,
    `function copyUint64(value: Uint64): Uint64 {`,
    `  const result = new Uint64();`,
    `  result.Store(value.Load());`,
    `  return result;`,
    `}`,
    ``,
  ]);
}

function addMemberField(fields, member, owner, memberType) {
  if (member.noTS && !member.goOnly) return;
  const type = memberType(member);
  const semantics = valueSemantics(type, member.noGo === true);
  addField(fields, field(member.name, type, semantics.zero, semantics.copyKind, member.noGo !== true), owner);
}

function valueSemantics(type, tsOnly) {
  const zero = zeroExpression(type);
  if (tsOnly) return { zero, copyKind: "identity" };
  if (type === "TextRange") return { zero, copyKind: "text-range" };
  if (type === "Uint32") return { zero, copyKind: "uint32" };
  if (type === "Uint64") return { zero, copyKind: "uint64" };
  return { zero, copyKind: "identity" };
}

function zeroExpression(type) {
  if (type === "string") return '""';
  if (type === "bool") return "false as bool";
  if (type === "unknown" || type.startsWith("GoPtr<") || type.startsWith("GoRef<") || type.startsWith("GoInterface<")) {
    return "undefined";
  }
  if (type.startsWith("GoSlice<")) return "GoNilSlice()";
  if (type === "SymbolTable") return "GoNilMap()";
  if (type === "Uint32") return "new Uint32()";
  if (type === "Uint64") return "new Uint64()";
  if (type === "Kind" || type === "NodeFlags" || type === "ModifierFlags" || type === "TokenFlags" || type === "int") {
    return `0 as ${type}`;
  }
  throw new Error(`AST generated value storage has no exact zero operation for '${type}'`);
}

function field(name, type, zero, copyKind = "identity", copyFromGo = true) {
  return Object.freeze({ name, type, zero, copyKind, copyFromGo });
}

function addField(fields, entry, owner) {
  const previous = fields.get(entry.name);
  if (previous === undefined) {
    fields.set(entry.name, entry);
    return;
  }
  if (previous.zero === entry.zero && previous.copyKind === entry.copyKind &&
      pointerStorage(previous.type) && pointerStorage(entry.type)) {
    fields.set(entry.name, field(
      entry.name,
      entry.type,
      entry.zero,
      entry.copyKind,
      previous.copyFromGo || entry.copyFromGo,
    ));
    return;
  }
  if (previous.type !== entry.type || previous.zero !== entry.zero || previous.copyKind !== entry.copyKind) {
    throw new Error(`AST generated value field '${entry.name}' has conflicting flattened storage at '${owner}'`);
  }
  if (previous.copyFromGo !== entry.copyFromGo) {
    fields.set(entry.name, field(entry.name, entry.type, entry.zero, entry.copyKind, previous.copyFromGo || entry.copyFromGo));
  }
}

function pointerStorage(type) {
  return type.startsWith("GoPtr<") || type.startsWith("GoRef<") || type.startsWith("GoInterface<");
}

function requireOptions(options) {
  if (options === null || typeof options !== "object" || Array.isArray(options) ||
      !(options.handWrittenBases instanceof Set) || typeof options.memberType !== "function") {
    throw new Error("AST generated value storage requires exact member-type and hand-written-base policies");
  }
  return options;
}
