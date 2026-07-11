import assert from "node:assert/strict";
import test from "node:test";

import {
  buildImportMap,
  buildLocalTypeNames,
  canonicalKey,
  declarationDescriptor,
  loadParser,
  parseSource,
  typeDescriptorChildren,
  typesEqual,
} from "./ast-signatures.mjs";
import { loadConventions, normalizeDescriptor } from "./conventions.mjs";
import { functionDescriptor } from "./type-descriptors.mjs";

const MODULE_ID = "fixture/signatures.ts";

test("every TS type-node family has an exact structured descriptor", async () => {
  const parsed = await descriptors([
    "declare const value: { readonly item: number };",
    "type Predicate = (input: unknown) => input is string;",
    "type Assertion = (input: unknown) => asserts input is string;",
    "type Constructor = abstract new <const T extends object = {}>(input?: T) => T;",
    "type Query = typeof value;",
    "type NamedTuple = [name?: string, ...items: number[]];",
    "type Wrappers = [string?, ...number[]];",
    "type Conditional<T> = T extends Promise<infer U extends string> ? U : T;",
    "type Self = this;",
    "type Operators<T> = keyof T | readonly string[] | unique symbol;",
    "type Indexed<T> = T[keyof T];",
    "type Mapped<T> = { -readonly [K in keyof T as `get${Capitalize<string & K>}`]-?: T[K] };",
    "type Template<T extends string> = `prefix-${T}-suffix`;",
    "type Imported = import(\"./dependency.js\", { with: { \"resolution-mode\": \"import\" } }).Thing<string>;",
    "type ImportedValue = typeof import(\"./dependency.js\").value;",
  ].join("\n"), new Set(["value"]));

  assert.equal(parsed.Predicate.type.t, "fn");
  assert.deepEqual(parsed.Predicate.type.ret, {
    t: "predicate", asserts: false, subject: { kind: "parameter", index: 0 }, type: { t: "kw", kw: "string" },
  });
  assert.equal(parsed.Assertion.type.ret.asserts, true);
  assert.equal(parsed.Constructor.type.t, "constructor");
  assert.deepEqual(parsed.Constructor.type.signatureModifiers, ["abstract"]);
  assert.deepEqual(parsed.Constructor.type.typeParams[0].modifiers, { const: true, variance: null, unsupported: [] });
  assert.equal(parsed.Constructor.type.params[0].optionalSyntax, "question");
  assert.deepEqual(parsed.Query.type, { t: "query", id: `${MODULE_ID}::value`, args: [] });

  assert.deepEqual(parsed.NamedTuple.type.elements.map((element) => [element.t, element.name, element.optional, element.rest]), [
    ["namedTuple", "name", true, false],
    ["namedTuple", "items", false, true],
  ]);
  assert.deepEqual(parsed.Wrappers.type.elements.map((element) => element.t), ["optional", "rest"]);

  const conditional = parsed.Conditional.type;
  assert.equal(conditional.t, "conditional");
  assert.deepEqual(conditional.check, { t: "tp", depth: 0, index: 0 });
  assert.equal(conditional.extends.args[0].t, "infer");
  assert.deepEqual(conditional.extends.args[0].parameter.binding, { depth: 1, index: 0 });
  assert.deepEqual(conditional.trueType, { t: "tp", depth: 1, index: 0 });
  assert.deepEqual(conditional.falseType, { t: "tp", depth: 0, index: 0 });

  assert.deepEqual(parsed.Self.type, { t: "this" });
  assert.deepEqual(parsed.Operators.type.members.map((member) => member.t === "operator" ? member.operator : member.t),
    ["keyof", "readonly", "unique"]);
  assert.equal(parsed.Indexed.type.t, "indexed");
  assert.equal(parsed.Mapped.type.t, "mapped");
  assert.equal(parsed.Mapped.type.readonly, "remove");
  assert.equal(parsed.Mapped.type.optional, "remove");
  assert.deepEqual(parsed.Mapped.type.typeParam.binding, { depth: 1, index: 0 });
  assert.equal(parsed.Mapped.type.nameType.t, "template");
  assert.equal(parsed.Mapped.type.valueType.t, "indexed");
  assert.deepEqual(parsed.Template.type.spans.map((span) => span.literal), ["-suffix"]);

  assert.equal(parsed.Imported.type.t, "import");
  assert.equal(parsed.Imported.type.module, "fixture/dependency.ts");
  assert.deepEqual(parsed.Imported.type.qualifier, ["Thing"]);
  assert.deepEqual(parsed.Imported.type.attributes, {
    token: "with",
    entries: [{ name: "resolution-mode", value: { t: "literal", kind: "string", value: "import" } }],
  });
  assert.equal(parsed.ImportedValue.type.typeOf, true);
  assert.deepEqual(parsed.ImportedValue.type.qualifier, ["value"]);
  assert.equal(JSON.stringify(parsed).includes('"t":"unsupported"'), false);
  const visited = new Set();
  for (const descriptor of Object.values(parsed)) visitTypes(descriptor.type, visited);
  for (const kind of ["predicate", "constructor", "query", "namedTuple", "optional", "rest", "conditional", "infer", "this",
    "operator", "indexed", "mapped", "template", "import", "literal"]) assert.ok(visited.has(kind), `missing traversal for ${kind}`);
});

test("literal descriptors preserve kind and semantic value without collisions", async () => {
  const parsed = await descriptors([
    "type NumberOne = 1;",
    "type DecimalOne = 1.0;",
    "type StringOne = \"1\";",
    "type TemplateOne = `1`;",
    "type BigIntOne = 1n;",
    "type Negative = -1;",
    "type NegativeZero = -0;",
    "type Truth = true;",
    "type Nothing = null;",
  ].join("\n"));
  assert.ok(typesEqual(parsed.NumberOne.type, parsed.DecimalOne.type));
  assert.ok(typesEqual(parsed.StringOne.type, parsed.TemplateOne.type));
  const keys = ["NumberOne", "StringOne", "BigIntOne", "Negative", "NegativeZero", "Truth", "Nothing"]
    .map((name) => canonicalKey(parsed[name].type));
  assert.equal(new Set(keys).size, keys.length);
  assert.deepEqual(parsed.NumberOne.type, { t: "literal", kind: "number", value: "1" });
  assert.deepEqual(parsed.StringOne.type, { t: "literal", kind: "string", value: "1" });
  assert.deepEqual(parsed.BigIntOne.type, { t: "literal", kind: "bigint", value: "1" });
  assert.deepEqual(parsed.NegativeZero.type, { t: "literal", kind: "number", value: "-0" });
});

test("generic identity is lexical and retains const, variance, constraints, and defaults", async () => {
  const parsed = await descriptors(`
type Variance<in T, out U = T> = (input: T) => U;
type ConstGeneric = <const T extends readonly string[] = readonly []>(input: T) => T;
type PlainGeneric = <T extends readonly string[] = readonly []>(input: T) => T;
type Shadowed<T> = <T>(input: T) => T;
type Captured<T> = <U>(input: U) => T;
type Renamed<Outer> = <Inner>(input: Inner) => Outer;
`);
  assert.deepEqual(parsed.Variance.typeParams.map((parameter) => parameter.modifiers.variance), ["in", "out"]);
  assert.deepEqual(parsed.Variance.typeParams.map((parameter) => parameter.name), ["T", "U"]);
  assert.deepEqual(parsed.Variance.typeParams[1].default, { t: "tp", depth: 0, index: 0 });
  assert.deepEqual(parsed.ConstGeneric.type.typeParams[0].modifiers, { const: true, variance: null, unsupported: [] });
  assert.equal(typesEqual(parsed.ConstGeneric.type, parsed.PlainGeneric.type), false);
  assert.equal(typesEqual(parsed.Captured.type, parsed.Renamed.type), true);
  assert.equal(typesEqual(parsed.Shadowed.type, parsed.Captured.type), false);
  assert.deepEqual(parsed.Shadowed.type.params[0].type, { t: "tp", depth: 1, index: 0 });
  assert.deepEqual(parsed.Captured.type.ret, { t: "tp", depth: 0, index: 0 });
});

test("function descriptors retain initializer optionality, explicit this, parameter modifiers, and signature modifiers", async () => {
  const parsed = await descriptors(`
interface Guard {}
function initialized(value: number = implementationDefault()): void { implementationBody(); }
function predicate(this: Guard, value: unknown): value is string { return implementationBody(); }
async function* generate(value: number): AsyncIterable<number> { implementationBody(); }
class Holder { constructor(public readonly value: string) { implementationBody(); } }
`);
  assert.equal(parsed.initialized.params[0].optional, true);
  assert.equal(parsed.initialized.params[0].optionalSyntax, "initializer");
  assert.deepEqual(parsed.predicate.params.map((parameter) => parameter.role), ["this", "parameter"]);
  assert.deepEqual(parsed.predicate.ret.subject, { kind: "parameter", index: 1 });
  assert.deepEqual(parsed.generate.signatureModifiers, ["async", "generator"]);
  assert.equal(parsed.generate.returnTypePolicy, "required");
  const constructor = parsed.Holder.members.find((member) => member.kind === "constructor");
  assert.deepEqual(constructor.type.params[0].modifiers, ["public", "readonly"]);
  assert.equal(constructor.type.missingReturnType, false);
  assert.equal(constructor.type.returnTypePolicy, "forbidden");
  assert.doesNotMatch(canonicalKey(constructor.type), /invalidDescriptor/);
  assert.equal(JSON.stringify([parsed.initialized, parsed.predicate, parsed.generate, parsed.Holder]).includes("implementationBody"), false);
});

test("normalization traverses every structured child and preserves signature metadata", async () => {
  const parsed = await descriptors([
    "import type { Native } from \"./native.js\";",
    "type Complex<const T extends Native = Native> = T extends Native",
    "  ? { [K in keyof T]: import(\"./dependency.js\").Box<Native> }",
    "  : `fallback-${Native}`;",
  ].join("\n"));
  const conventions = loadConventions({
    goConstraintId: "fixture/go.ts::GoConstraint",
    equivalences: [
      { as: "native-bound", scope: "constraint", match: [{ id: "fixture/native.ts::Native" }, { id: "fixture/other.ts::Native" }] },
      { as: "native-type", scope: "type", match: [{ id: "fixture/native.ts::Native" }, { id: "fixture/other.ts::Native" }] },
    ],
  });
  const normalized = normalizeDescriptor(parsed.Complex.type, conventions);
  assert.equal(JSON.stringify(normalized).includes("fixture/native.ts::Native"), false);
  assert.deepEqual(normalized.check, { t: "tp", depth: 0, index: 0 });
  assert.equal(normalized.trueType.typeParam.modifiers.const, false);
  assert.equal(normalized.trueType.valueType.args[0].t, "conv");
  assert.equal(normalized.falseType.spans[0].type.t, "conv");
  const normalizedParameter = normalizeDescriptor({ t: "fn", params: [], ret: { t: "kw", kw: "void" },
    missingReturnType: false, returnTypePolicy: "required",
    typeParams: parsed.Complex.typeParams, signatureModifiers: ["async"] }, conventions);
  assert.equal(normalizedParameter.typeParams[0].modifiers.const, true);
  assert.equal(normalizedParameter.typeParams[0].default.t, "conv");
  assert.deepEqual(normalizedParameter.signatureModifiers, ["async"]);
});

test("schema-unknown descriptors can never compare equal", () => {
  const unsupported = { t: "unsupported", kind: "FutureTypeNode", text: "future" };
  assert.equal(typesEqual(unsupported, unsupported), false);
  const oldLiteral = { t: "literal", kind: "string", value: "x", text: '"x"' };
  assert.equal(typesEqual(oldLiteral, oldLiteral), false);
  assert.match(canonicalKey(oldLiteral), /invalidDescriptor/);
  const accessorKeyword = Object.defineProperty({ t: "kw" }, "kw", { enumerable: true, get: () => "string" });
  assert.equal(typesEqual(accessorKeyword, accessorKeyword), false);
  const hiddenOldField = Object.defineProperty({ t: "kw", kw: "string" }, "text", { value: "string" });
  assert.equal(typesEqual(hiddenOldField, hiddenOldField), false);
  const hiddenCurrentField = Object.defineProperty({ t: "kw" }, "kw", { value: "string" });
  assert.equal(typesEqual(hiddenCurrentField, hiddenCurrentField), false);
  const incompleteFunction = { t: "fn", params: [], ret: { t: "kw", kw: "void" } };
  assert.equal(typesEqual(incompleteFunction, incompleteFunction), false);
});

async function descriptors(source, localValues = new Set()) {
  const api = await loadParser();
  const sourceFile = parseSource(api, MODULE_ID, source);
  const context = {
    api,
    text: source,
    imports: buildImportMap(api, sourceFile, MODULE_ID),
    localTypes: buildLocalTypeNames(api, sourceFile),
    localValues,
    localNamespaces: new Set(),
    moduleId: MODULE_ID,
    valueEnvironment: new Map(),
  };
  const result = {};
  for (const statement of sourceFile.Statements?.Nodes ?? []) {
    if (![api.Kinds.KindTypeAliasDeclaration, api.Kinds.KindInterfaceDeclaration, api.Kinds.KindClassDeclaration,
      api.Kinds.KindFunctionDeclaration].includes(statement.Kind)) continue;
    const descriptor = statement.Kind === api.Kinds.KindFunctionDeclaration
      ? { kind: "func", name: statement.name?.Text, ...functionDescriptor(api, api.Casts.AsFunctionDeclaration(statement), context) }
      : declarationDescriptor(api, statement, context);
    result[descriptor.name] = descriptor;
  }
  return result;
}

function visitTypes(descriptor, visited) {
  if (!descriptor) return;
  visited.add(descriptor.t);
  for (const child of typeDescriptorChildren(descriptor)) visitTypes(child, visited);
}
