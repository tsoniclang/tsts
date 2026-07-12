import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";

import { renderGoCompatModule } from "./core/runtime-templates.mjs";
import { semanticNilabilityIssue } from "./core/semantic-type-nilability.mjs";
import { goUnitDescriptor, semanticTypeDescriptor } from "./ts-extractor/expected-from-go-semantic.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const compat = "src/go/compat.ts";
const core = "src/go/scalars.ts";
const packagePath = "example/p";
const bridge = {
  nilable: "GoNilable", pointer: "GoPtr", ref: "GoRef", slice: "GoSlice", array: "GoArray",
  map: "GoMap", chan: "GoChan", func: "GoFunc", interface: "GoInterface", unsafePointer: "GoUnsafePointer",
};

const basic = (name) => ({ kind: "basic", nilable: false, basic: { name, untyped: false } });
const named = (name, nilable, kind = "named") => ({
  kind,
  nilable,
  reference: { objectId: `${packagePath}::type::${name}`, packagePath, name, typeArgs: [] },
});
const emptySignature = () => ({
  receiverTypeParameters: [], typeParameters: [], parameters: { variables: [] }, results: { variables: [] }, variadic: false,
  parameterNameProvenance: "source",
});
const emptyInterface = () => ({
  explicitMethods: [], embeddedTypes: [], embeddedKinds: [], completeMethods: [], comparable: false, implicit: false, methodSetOnly: true,
  explicitMethodOrderProvenance: "source",
});
const semanticInterface = () => ({ kind: "interface", nilable: true, interface: emptyInterface() });
const semanticSignature = () => ({ kind: "signature", nilable: true, signature: emptySignature() });

function indexWith(declarations = []) {
  const contracts = new Map(declarations.map(([name, rhs, alias = false]) => {
    const objectId = `${packagePath}::type::${name}`;
    return [objectId, {
      objectId,
      alias,
      rawInterface: rhs.kind === "interface",
      nilable: rhs.nilable,
      typeParameterCount: 0,
      rhs,
    }];
  }));
  return {
    goModule: "example",
    core,
    compat,
    bridge,
    primKeyword: { string: "string", any: "unknown" },
    primCore: { bool: "bool", int: "int" },
    primCompat: { error: "GoError" },
    facadeTemplate: "src/go/{importPath}.ts",
    pkgType: new Map(declarations.map(([name]) => [
      `${packagePath}::type::${name}`,
      { moduleId: "src/p/types.ts", tsName: name },
    ])),
    declaredTypeContractsByProfile: new Map([[0, contracts]]),
    externalTypeContracts: new Map(),
    externalPointerTerminals: new Map(),
    externalFacadeArities: new Map(),
    namedTypeStorage: new Map(),
    rawInterfaceObjects: new Set(),
    storageCarrierByIdentity: new Map(),
    knownStorageIdentities: new Set(),
  };
}

const context = (index) => ({ index, profile: 0, typeParameters: new Map() });

test("compat declares one exact family of nilability carriers", () => {
  const source = renderGoCompatModule();
  assert.match(source, /export type GoNilable<T> = T \| undefined;/);
  assert.match(source, /const __tsgoPointerMethodSet: unique symbol;/);
  assert.match(source, /export type GoPointerMethodSet<Methods extends object> = Methods;/);
  assert.match(source, /type GoPointerMethods<T> = typeof __tsgoPointerMethodSet extends keyof T/);
  assert.match(source, /export type GoPtr<T> = GoNilable<T & GoPointerMethods<T>>;/);
  assert.match(source, /export type GoRef<T> = GoNilable<\{ v: T \} & GoPointerMethods<T>>;/);
  assert.match(source, /export type GoSlice<T> = T\[];/);
  assert.match(source, /export function GoNilSlice<T>\(\): GoSlice<T>/);
  assert.match(source, /export function GoSliceIsNil<T>\(slice: GoSlice<T>\): bool/);
  assert.match(source, /export type GoMap<K, V> = Map<K, V>;/);
  assert.match(source, /export function GoNilMap<K, V>\(\): GoMap<K, V>/);
  assert.match(source, /assignment to entry in nil map/);
  assert.match(source, /export type GoChan<T, Direction extends string = "bidirectional"> = \{/);
  assert.match(source, /export function GoNilChan<T, Direction extends string = "bidirectional">\(\): GoChan<T, Direction>/);
  assert.match(source, /if \(GoChanIsNil\(channel\)\) return false as bool;/);
  assert.match(source, /export type GoFunc<F> = GoNilable<F>;/);
  assert.match(source, /export type GoInterface<I> = GoNilable<I>;/);
  assert.match(source, /export type GoSeq<T> = GoFunc<\(yieldValue: \(value: T\) => bool\) => void>;/);
  assert.match(source, /export type GoSeq2<K, V> = GoFunc<\(yieldValue: \(key: K, value: V\) => bool\) => void>;/);
  assert.match(source, /export type GoError = GoInterface<Error>;/);
  assert.match(source, /export type GoUnsafePointer = GoNilable<\{ readonly \[goUnsafePointerBrand\]: never \}>;/);
  assert.doesNotMatch(source, /Nilable extends boolean/);
  assert.match(source, /MakeGoChan<T>\(capacity: number, zeroValue: \(\) => T\): GoChan<T>/);
  assert.match(source, /GoMapGetExisting<K, V>\(map: NonNullable<GoMap<K, V>>/);
  assert.match(source, /GoAppend<T>\(slice: GoSlice<T>, \.\.\.items: T\[]\): NonNullable<GoSlice<T>>/);
});

test("operation-bearing nil carriers execute their Go zero-value operations", async () => {
  const javascript = ts.transpileModule(renderGoCompatModule(), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const runtime = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);
  const nilSlice = runtime.GoNilSlice();
  assert.equal(nilSlice.length, 0);
  assert.equal(runtime.GoSliceIsNil(nilSlice), true);
  assert.equal(runtime.GoSliceIsNil([]), false);
  assert.equal(runtime.GoAppend(nilSlice), nilSlice);
  assert.deepEqual(runtime.GoAppend(nilSlice, 1), [1]);

  const nilMap = runtime.GoNilMap();
  assert.equal(nilMap.size, 0);
  assert.equal(nilMap.get("missing"), undefined);
  assert.equal(nilMap.delete("missing"), false);
  nilMap.clear();
  assert.equal(runtime.GoMapIsNil(nilMap), true);
  assert.throws(() => nilMap.set("key", 1), /assignment to entry in nil map/);

  const nilChannel = runtime.GoNilChan();
  assert.equal(runtime.GoChanIsNil(nilChannel), true);
  assert.equal(runtime.GoChanTrySend(nilChannel, 1), false);
  let received = false;
  runtime.GoChanReceive(nilChannel, () => { received = true; });
  await Promise.resolve();
  assert.equal(received, false);
  assert.throws(() => runtime.GoChanClose(nilChannel), /close of nil channel/);
});

test("direct nilable kinds use their exact carriers", () => {
  const index = indexWith();
  index.namedTypeStorage.set("builtin::type::error", `${compat}::GoError`);
  index.knownStorageIdentities.add(`${compat}::GoError`);
  assert.deepEqual(semanticTypeDescriptor({ kind: "slice", nilable: true, element: basic("int") }, context(index)), {
    t: "ref", id: `${compat}::GoSlice`, args: [{ t: "ref", id: `${core}::int`, args: [] }],
  });
  assert.equal(semanticTypeDescriptor(semanticSignature(), context(index)).id, `${compat}::GoFunc`);
  assert.equal(semanticTypeDescriptor(semanticInterface(), context(index)).id, `${compat}::GoInterface`);
  assert.equal(semanticTypeDescriptor({
    kind: "map", nilable: true, key: basic("int"), element: basic("bool"),
  }, context(index)).id, `${compat}::GoMap`);
  assert.deepEqual(semanticTypeDescriptor({
    kind: "channel", nilable: true, direction: "receive", element: basic("int"),
  }, context(index)), {
    t: "ref",
    id: `${compat}::GoChan`,
    args: [
      { t: "ref", id: `${core}::int`, args: [] },
      { t: "literal", kind: "string", value: "receive" },
    ],
  });
  assert.deepEqual(semanticTypeDescriptor({
    kind: "basic", nilable: true, basic: { name: "Pointer", untyped: false },
  }, context(index)), { t: "ref", id: `${compat}::GoUnsafePointer`, args: [] });
  assert.deepEqual(semanticTypeDescriptor({
    kind: "named",
    nilable: true,
    reference: { objectId: "builtin::type::error", packagePath: "", name: "error", typeArgs: [] },
  }, context(index)), { t: "ref", id: `${compat}::GoError`, args: [] });
});

test("pointer lowering selects GoRef only from scalar representation evidence", () => {
  const record = { kind: "struct", nilable: false, struct: { fields: [] } };
  const index = indexWith([["Flag", basic("bool")], ["Record", record]]);
  const scalarPointer = { kind: "pointer", nilable: true, element: named("Flag", false) };
  const recordPointer = { kind: "pointer", nilable: true, element: named("Record", false) };
  assert.equal(semanticTypeDescriptor({ kind: "pointer", nilable: true, element: basic("bool") }, context(index)).id, `${compat}::GoRef`);
  assert.equal(semanticTypeDescriptor(scalarPointer, context(index)).id, `${compat}::GoRef`);
  assert.equal(semanticTypeDescriptor(recordPointer, context(index)).id, `${compat}::GoPtr`);

  const typeParameter = {
    kind: "pointer", nilable: true,
    element: { kind: "typeParameter", nilable: false, typeParameter: { ownerId: "owner", role: "type", index: 0, name: "T" } },
  };
  const polymorphic = semanticTypeDescriptor(typeParameter, {
    ...context(index),
    typeParameters: new Map([["owner::type::0", { depth: 0, index: 0 }]]),
  });
  assert.equal(polymorphic.t, "unsupported");
  assert.match(polymorphic.reason, /representation-polymorphic Go pointer/);
});

test("pointers to builtin interface values use mutable slot storage", () => {
  const index = indexWith();
  index.namedTypeStorage.set("builtin::type::error", `${compat}::GoError`);
  index.knownStorageIdentities.add(`${compat}::GoError`);
  const anyType = {
    kind: "named", nilable: true,
    reference: { objectId: "builtin::type::any", packagePath: "", name: "any", typeArgs: [] },
  };
  const errorType = {
    kind: "named", nilable: true,
    reference: { objectId: "builtin::type::error", packagePath: "", name: "error", typeArgs: [] },
  };
  assert.deepEqual(semanticTypeDescriptor({ kind: "pointer", nilable: true, element: anyType }, context(index)), {
    t: "ref", id: `${compat}::GoRef`, args: [{
      t: "ref", id: `${compat}::GoInterface`, args: [{ t: "kw", kw: "unknown" }],
    }],
  });
  assert.deepEqual(semanticTypeDescriptor({ kind: "pointer", nilable: true, element: errorType }, context(index)), {
    t: "ref", id: `${compat}::GoRef`, args: [{ t: "ref", id: `${compat}::GoError`, args: [] }],
  });
});

test("pointer lowering preserves every nested storage layer", () => {
  const record = { kind: "struct", nilable: false, struct: { fields: [] } };
  const index = indexWith([["Record", record]]);
  const pointerToSlice = {
    kind: "pointer", nilable: true,
    element: { kind: "slice", nilable: true, element: basic("int") },
  };
  const pointerToPointer = {
    kind: "pointer", nilable: true,
    element: { kind: "pointer", nilable: true, element: named("Record", false) },
  };
  const sliceDescriptor = {
    t: "ref", id: `${compat}::GoRef`, args: [{
      t: "ref", id: `${compat}::GoSlice`, args: [{ t: "ref", id: `${core}::int`, args: [] }],
    }],
  };
  const pointerDescriptor = {
    t: "ref", id: `${compat}::GoRef`, args: [{
      t: "ref", id: `${compat}::GoPtr`, args: [{ t: "ref", id: "src/p/types.ts::Record", args: [] }],
    }],
  };
  assert.deepEqual(semanticTypeDescriptor(pointerToSlice, context(index)), sliceDescriptor);
  assert.deepEqual(semanticTypeDescriptor(pointerToPointer, context(index)), pointerDescriptor);
  assert.deepEqual(semanticTypeDescriptor({
    kind: "union",
    nilable: false,
    union: { terms: [
      { tilde: false, type: pointerToSlice },
      { tilde: false, type: pointerToPointer },
    ] },
  }, context(index), { typeContext: "constraint" }), {
    t: "union",
    members: [sliceDescriptor, pointerDescriptor],
  });
});

test("interface declarations stay interfaces while interface values carry nilability", () => {
  const interfaceRhs = semanticInterface();
  const aliasRhs = named("Contract", true);
  const functionRhs = semanticSignature();
  const sliceRhs = { kind: "slice", nilable: true, element: basic("int") };
  const index = indexWith([
    ["Contract", interfaceRhs], ["ContractAlias", aliasRhs, true], ["InlineAlias", interfaceRhs, true],
    ["Callback", functionRhs], ["Numbers", sliceRhs],
  ]);
  assert.equal(semanticTypeDescriptor(named("Contract", true), context(index)).id, `${compat}::GoInterface`);
  const contractAlias = semanticTypeDescriptor(named("ContractAlias", true, "alias"), context(index));
  assert.equal(contractAlias.id, `${compat}::GoInterface`);
  assert.equal(contractAlias.args[0].id, "src/p/types.ts::ContractAlias");
  const inlineAlias = semanticTypeDescriptor(named("InlineAlias", true, "alias"), context(index));
  assert.equal(inlineAlias.id, `${compat}::GoInterface`);
  assert.equal(inlineAlias.args[0].id, "src/p/types.ts::InlineAlias");
  assert.equal(semanticTypeDescriptor(named("Callback", true), context(index)).id, "src/p/types.ts::Callback");
  assert.equal(semanticTypeDescriptor(named("Numbers", true), context(index)).id, "src/p/types.ts::Numbers");

  const object = { id: `${packagePath}::type::Contract`, name: "Contract", packagePath, exported: true, type: named("Contract", true) };
  const declaration = goUnitDescriptor({
    id: "example::contract.go::type::Contract",
    kind: "type",
    name: "Contract",
    members: [],
    semantic: [{ kind: "type", profiles: [0], object, type: { alias: false, object, typeParameters: [], rhs: interfaceRhs } }],
  }, index);
  assert.equal(declaration.kind, "interface");
});

test("nilable and unconstrained type parameters remain their exact source parameter", () => {
  const reference = { ownerId: "owner", role: "type", index: 0, name: "T" };
  const index = indexWith();
  const typeParameters = new Map([["owner::type::0", { depth: 0, index: 0 }]]);
  const descriptor = { t: "tp", depth: 0, index: 0 };
  assert.deepEqual(semanticTypeDescriptor({
    kind: "typeParameter",
    nilable: true,
    typeParameter: reference,
  }, {
    index,
    profile: 0,
    typeParameters,
    typeParameterConstraints: new Map([["owner::type::0", {
      kind: "slice", nilable: true, element: basic("int"),
    }]]),
  }), descriptor);
  assert.deepEqual(semanticTypeDescriptor({
    kind: "typeParameter",
    nilable: false,
    typeParameter: reference,
  }, { index, profile: 0, typeParameters }), descriptor);
});

test("nilability evidence and profile carrier dispositions fail closed", () => {
  assert.equal(semanticNilabilityIssue({ kind: "slice", nilable: false }), "must be true for direct Go slice types");
  assert.equal(semanticNilabilityIssue({ kind: "basic", nilable: true, basic: { name: "int" } }), "must be false for direct Go basic types");
  assert.throws(
    () => semanticTypeDescriptor({ kind: "signature", nilable: false, signature: emptySignature() }, context(indexWith())),
    /nilable must be true for direct Go signature types/,
  );
  assert.throws(() => loadProfile({ signatureCheck: {
    namedNilabilityEvidence: { "example::type::Value": "pointer" },
  } }), /unknown current-contract key\(s\): namedNilabilityEvidence/);
  const index = indexWith();
  index.pkgType.set(`${packagePath}::Carrier`, "src/p/types.ts");
  const storage = "src/p/carrier.ts::CarrierStorage";
  index.namedTypeStorage.set(`${packagePath}::type::Carrier`, storage);
  index.storageCarrierByIdentity.set(storage, "nilable");
  assert.deepEqual(semanticTypeDescriptor(named("Carrier", true), context(index)), {
    t: "ref",
    id: `${compat}::GoNilable`,
    args: [{ t: "ref", id: storage, args: [] }],
  });
  index.pkgType.set(`${packagePath}::Unproven`, "src/p/types.ts");
  assert.throws(
    () => semanticTypeDescriptor(named("Unproven", true), context(index)),
    /has no exact semantic lowering contract/,
  );
  assert.equal(loadProfile({}).bridge.nilable, "GoNilable");
});
