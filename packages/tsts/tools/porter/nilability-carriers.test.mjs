import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";

import { renderGoCompatModule } from "./core/runtime-templates.mjs";
import { semanticNilabilityIssue, semanticTypeContexts } from "./core/semantic-type-nilability.mjs";
import { goUnitDescriptor, semanticTypeDescriptor } from "./ts-extractor/expected-from-go-semantic.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const compat = "src/go/compat.ts";
const core = "src/go/scalars.ts";
const packagePath = "example/p";
const bridge = {
  nilable: "GoNilable", pointer: "GoPtr", ref: "GoRef", pointerConstraint: "GoPointerConstraint", slice: "GoSlice", array: "GoArray",
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
  assert.match(source, /export type GoRef<T> = GoNilable<\{ v: T; readonly \[goRefStorage\]: true \} & GoPointerMethods<T>>;/);
  assert.match(source, /export type GoPointerConstraint<T> = GoPtr<T> \| GoRef<T>;/);
  assert.match(source, /export function GoValueRef<T>\(value: T\): NonNullable<GoRef<T>>/);
  assert.match(source, /export function GoSliceElementRef<T>\(slice: GoSlice<T>, index: int\): NonNullable<GoRef<T>>/);
  assert.match(source, /export function GoFieldRef<T>\(read: \(\) => T, write: \(value: T\) => void\): NonNullable<GoRef<T>>/);
  assert.match(source, /export function GoIsRef\(value: unknown\): value is NonNullable<GoRef<unknown>>/);
  assert.match(source, /export type GoSlice<T> = T\[];/);
  assert.match(source, /const goNilSlice: readonly unknown\[] = Object\.freeze\(\[]\);/);
  assert.doesNotMatch(source, /__tsgoGoNil/);
  assert.match(source, /export function GoNilSlice<T>\(\): GoSlice<T>/);
  assert.match(source, /export function GoSliceIsNil<T>\(slice: GoSlice<T>\): bool/);
  assert.match(source, /export function GoSliceToZeroLength<T>\(slice: GoSlice<T>\): GoSlice<T>/);
  assert.match(source, /export type GoMap<K, V> = Map<K, V>;/);
  assert.match(source, /export function GoNilMap<K, V>\(\): GoMap<K, V>/);
  assert.doesNotMatch(source, /__tsgo(?:Key|Value)Zero|class GoNativeMap|function NewGoMap/);
  assert.match(source, /makeMap<V>\(\): GoMap<K, V>/);
  assert.match(source, /export function GoMapMake<K, V>\(keyDescriptor: GoMapKeyDescriptor<K>\): GoMap<K, V>/);
  assert.match(source, /export function GoMapClone<K, V>\(map: GoMap<K, V>, keyDescriptor: GoMapKeyDescriptor<K>\): GoMap<K, V>/);
  assert.doesNotMatch(source, /instanceof Go(?:Struct|Number)Map|isGoCloneableMap/);
  assert.match(source, /export class GoNumberMap<K extends number = number, V = unknown> implements Map<K, V>/);
  assert.match(source, /export type GoComparableInterface<T = unknown> = GoDynamicComparable<T> \| undefined;/);
  assert.match(source, /export function GoBoxComparableInterface<T>\(descriptor: GoMapKeyDescriptor<T>, value: T\): GoInterface<unknown>/);
  assert.match(source, /export function GoRequireComparableInterface\(value: GoInterface<unknown>\): GoComparableInterface/);
  assert.match(source, /export function GoUnboxComparableInterface\(value: GoInterface<unknown>\): GoInterface<unknown>/);
  assert.match(source, /export function GoAssertComparableInterface<T>\(value: GoInterface<unknown>, descriptor: GoMapKeyDescriptor<T>, expectedType: string\): T/);
  assert.match(source, /export const GoComparableInterfaceKey: GoMapKeyDescriptor<GoComparableInterface>/);
  assert.match(source, /assignment to entry in nil map/);
  assert.match(source, /export type GoChan<T, Direction extends string = "bidirectional"> = \{/);
  assert.match(source, /export function GoNilChan<T, Direction extends string = "bidirectional">\(\): GoChan<T, Direction>/);
  assert.match(source, /if \(GoChanIsNil\(channel\)\) return false as bool;/);
  assert.match(source, /export type GoFunc<F> = GoNilable<F>;/);
  assert.match(source, /export type GoDefined<T, Identity extends string> = T extends undefined\s*\? T\s*:\s*T & \{ readonly \[__goDefinedTypeBrand\]\?: Identity \};/);
  assert.match(source, /export type GoInterface<I> = GoNilable<I>;/);
  assert.doesNotMatch(source, /\bGoSeq2?\b/);
  assert.match(source, /export type GoError = GoInterface<Error>;/);
  assert.match(source, /export type GoUnsafePointer = GoNilable<\{ readonly \[goUnsafePointerBrand\]: never \}>;/);
  assert.match(source, /export type GoZeroFactory<T> = \(\) => T;/);
  assert.match(source, /export type GoEquality<T> = \(left: T, right: T\) => bool;/);
  assert.match(source, /export function GoEqualStrict<T extends GoComparable>\(left: T, right: T\): bool/);
  assert.match(source, /export function GoEqualEmptyStruct\(/);
  assert.match(source, /export function GoZeroBoolean\(\): bool/);
  assert.match(source, /export function GoZeroNumber\(\): number/);
  assert.match(source, /export function GoZeroBigInt\(\): bigint/);
  assert.match(source, /export function GoZeroString\(\): string/);
  assert.match(source, /export function GoZeroPointer<T>\(\): GoPtr<T>/);
  assert.match(source, /export function GoZeroRef<T>\(\): GoRef<T>/);
  assert.match(source, /export function GoZeroFunction<F>\(\): GoFunc<F>/);
  assert.match(source, /export function GoZeroInterface<I>\(\): GoInterface<I>/);
  assert.match(source, /export function GoZeroSlice<T>\(\): GoSlice<T>/);
  assert.match(source, /export function GoZeroMap<K, V>\(\): GoMap<K, V>/);
  assert.match(source, /export function GoZeroChannel<T, Direction extends string = "bidirectional">\(\): GoChan<T, Direction>/);
  assert.match(source, /export function GoZeroEmptyStruct\(\): \{ readonly __tsgoEmpty\?: never \}/);
  assert.doesNotMatch(source, /Nilable extends boolean/);
  assert.match(source, /MakeGoChan<T>\(capacity: number, zeroValue: \(\) => T\): GoChan<T>/);
  assert.match(source, /GoMapGetExisting<K, V>\(map: NonNullable<GoMap<K, V>>/);
  assert.match(source, /GoAppend<T>\(slice: GoSlice<T>, \.\.\.items: T\[]\): NonNullable<GoSlice<T>>/);
  assert.match(source, /GoAppendSlice<T>\(slice: GoSlice<T>, items: GoSlice<T>\): NonNullable<GoSlice<T>>/);
});

test("defined Go types preserve nil and unnamed-to-named assignment without becoming mutually assignable", () => {
  const fileName = "/go-defined-contract.ts";
  const source = `${renderGoCompatModule().replace(
    /^import type \{ bool, int \} from "\.\/scalars\.js";\n\n/,
    "type bool = boolean;\ntype int = number;\n\n",
  )}
type Underlying = (value: number) => number;
type First = GoDefined<GoFunc<Underlying>, "first">;
type Second = GoDefined<GoFunc<Underlying>, "second">;
const raw: Underlying = (value) => value;
const first: First = raw;
const nil: First = undefined;
// @ts-expect-error distinct defined Go types with identical underlying types are not assignable
const second: Second = first;
void nil;
void second;
`;
  const options = {
    module: ts.ModuleKind.ESNext,
    noEmit: true,
    strict: true,
    target: ts.ScriptTarget.ES2022,
  };
  const host = ts.createCompilerHost(options);
  const defaultGetSourceFile = host.getSourceFile.bind(host);
  const defaultFileExists = host.fileExists.bind(host);
  const defaultReadFile = host.readFile.bind(host);
  host.getSourceFile = (path, languageVersion, onError, shouldCreateNewSourceFile) => path === fileName
    ? ts.createSourceFile(path, source, languageVersion, true)
    : defaultGetSourceFile(path, languageVersion, onError, shouldCreateNewSourceFile);
  host.fileExists = (path) => path === fileName || defaultFileExists(path);
  host.readFile = (path) => path === fileName ? source : defaultReadFile(path);
  const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([fileName], options, host));
  assert.deepEqual(diagnostics.map((diagnostic) => ({
    code: diagnostic.code,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
  })), []);
});

test("operation-bearing nil carriers execute their Go zero-value operations", async () => {
  const javascript = ts.transpileModule(renderGoCompatModule(), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const runtime = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);
  const nilSlice = runtime.GoNilSlice();
  const sameNilSlice = runtime.GoNilSlice();
  assert.equal(nilSlice.length, 0);

  assert.equal(runtime.GoZeroBoolean(), false);
  assert.equal(runtime.GoEqualStrict("same", "same"), true);
  assert.equal(runtime.GoEqualStrict("left", "right"), false);
  assert.equal(runtime.GoEqualEmptyStruct({}, {}), true);
  assert.equal(runtime.GoZeroNumber(), 0);
  assert.equal(runtime.GoZeroBigInt(), 0n);
  assert.equal(runtime.GoZeroString(), "");
  assert.equal(runtime.GoZeroPointer(), undefined);
  assert.equal(runtime.GoZeroFunction(), undefined);
  assert.equal(runtime.GoZeroInterface(), undefined);
  assert.equal(runtime.GoSliceIsNil(runtime.GoZeroSlice()), true);
  assert.equal(runtime.GoZeroRef(), undefined);
  assert.equal(runtime.GoMapIsNil(runtime.GoZeroMap()), true);
  assert.equal(runtime.GoChanIsNil(runtime.GoZeroChannel()), true);
  assert.deepEqual(runtime.GoZeroEmptyStruct(), {});
  assert.equal(nilSlice, sameNilSlice);
  assert.deepEqual(nilSlice, []);
  assert.deepEqual(Object.keys(nilSlice), []);
  assert.equal(Object.isFrozen(nilSlice), true);
  assert.equal(runtime.GoSliceIsNil(nilSlice), true);
  assert.equal(runtime.GoSliceIsNil(sameNilSlice), true);
  assert.equal(runtime.GoSliceIsNil([]), false);
  assert.equal(runtime.GoSliceToZeroLength(nilSlice), nilSlice);
  const nonNilSlice = [1, 2, 3];
  const zeroLengthSlice = runtime.GoSliceToZeroLength(nonNilSlice);
  assert.notEqual(zeroLengthSlice, nonNilSlice);
  assert.deepEqual(nonNilSlice, [1, 2, 3]);
  assert.deepEqual(zeroLengthSlice, []);
  assert.equal(runtime.GoSliceIsNil(zeroLengthSlice), false);
  const valueRef = runtime.GoValueRef(1);
  valueRef.v = 2;
  assert.equal(valueRef.v, 2);
  const values = [1, 2];
  const elementRef = runtime.GoSliceElementRef(values, 1);
  assert.equal(elementRef.v, 2);
  elementRef.v = 3;
  assert.deepEqual(values, [1, 3]);
  assert.throws(() => runtime.GoSliceElementRef(values, 2), /index out of range/);
  assert.equal(runtime.GoAppend(nilSlice), nilSlice);
  const appended = runtime.GoAppend(nilSlice, 1);
  assert.deepEqual(appended, [1]);
  assert.notEqual(appended, nilSlice);
  assert.equal(nilSlice.length, 0);
  assert.equal(runtime.GoAppendSlice(nilSlice, []), nilSlice);
  const appendSource = [1, 2];
  const appendItems = globalThis.Array.from({ length: 150_000 }, (_, index) => index + 3);
  const appendedSlice = runtime.GoAppendSlice(appendSource, appendItems);
  assert.equal(appendedSlice.length, 150_002);
  assert.deepEqual(appendSource, [1, 2]);
  assert.equal(appendedSlice[0], 1);
  assert.equal(appendedSlice[150_001], 150_002);

  const nilMap = runtime.GoNilMap();
  assert.equal(nilMap.size, 0);
  assert.equal(nilMap.get("missing"), undefined);
  assert.equal(nilMap.delete("missing"), false);
  nilMap.clear();
  assert.equal(runtime.GoMapIsNil(nilMap), true);
  assert.throws(() => nilMap.set("key", 1), /assignment to entry in nil map/);
  const allocatedMap = new Map();
  assert.equal(runtime.GoMapIsNil(allocatedMap), false);
  assert.deepEqual(runtime.GoMapLookup(allocatedMap, "missing", runtime.GoZeroNumber), [0, false]);
  allocatedMap.set("key", 1);
  assert.deepEqual(runtime.GoMapLookup(allocatedMap, "key", runtime.GoZeroNumber), [1, true]);

  const stringMap = runtime.GoMapMake(runtime.GoStringKey);
  stringMap.set("key", 1);
  assert.equal(stringMap.get("key"), 1);

  const numberMap = runtime.GoMapMake(runtime.GoNumberKey);
  numberMap.set(0, "positive zero");
  numberMap.set(-0, "negative zero");
  assert.equal(numberMap.size, 1);
  assert.equal(numberMap.get(0), "negative zero");
  numberMap.set(Number.NaN, "first NaN");
  numberMap.set(Number.NaN, "second NaN");
  assert.equal(numberMap.size, 3);
  assert.equal(numberMap.has(Number.NaN), false);
  assert.equal(numberMap.get(Number.NaN), undefined);
  assert.equal(numberMap.delete(Number.NaN), false);
  assert.deepEqual(runtime.GoMapLookup(numberMap, Number.NaN, runtime.GoZeroString), ["", false]);
  assert.deepEqual([...numberMap.values()], ["negative zero", "first NaN", "second NaN"]);
  assert.deepEqual([...runtime.GoMapClone(numberMap, runtime.GoNumberKey).values()], ["negative zero", "first NaN", "second NaN"]);

  const firstNamedNumberKey = runtime.GoNamedNumberKey();
  const secondNamedNumberKey = runtime.GoNamedNumberKey();
  const interfaceMap = runtime.GoMapMake(runtime.GoComparableInterfaceKey);
  interfaceMap.set(runtime.GoDynamicValue(firstNamedNumberKey, 1), "first type");
  assert.equal(interfaceMap.get(runtime.GoDynamicValue(firstNamedNumberKey, 1)), "first type");
  assert.equal(interfaceMap.get(runtime.GoDynamicValue(secondNamedNumberKey, 1)), undefined);
  interfaceMap.set(runtime.GoDynamicValue(secondNamedNumberKey, 1), "second type");
  assert.deepEqual([...interfaceMap.values()], ["first type", "second type"]);

  const boxed = runtime.GoBoxComparableInterface(firstNamedNumberKey, 7);
  assert.equal(runtime.GoRequireComparableInterface(boxed), boxed);
  assert.throws(() => runtime.GoRequireComparableInterface(7), /unboxed Go interface value/);
  assert.equal(runtime.GoUnboxComparableInterface(boxed), 7);
  assert.equal(runtime.GoAssertComparableInterface(boxed, firstNamedNumberKey, "First"), 7);
  assert.throws(() => runtime.GoAssertComparableInterface(undefined, firstNamedNumberKey, "First"), /interface is nil, not First/);
  assert.throws(() => runtime.GoAssertComparableInterface(boxed, secondNamedNumberKey, "Second"), /interface does not contain Second/);

  class StructuredKey {
    constructor(value) { this.value = value; }
    text() { return String(this.value); }
  }
  const structuredKey = runtime.GoStructKey(
    [runtime.GoStructField((value) => value.value, runtime.GoNumberKey)],
    ([value], source) => Object.assign(Object.create(Object.getPrototypeOf(source)), source, { value }),
  );
  const structuredMap = runtime.GoMapMake(structuredKey);
  const sourceKey = new StructuredKey(1);
  structuredMap.set(sourceKey, "stored");
  sourceKey.value = 2;
  assert.equal(structuredMap.get(new StructuredKey(1)), "stored");
  assert.equal(structuredMap.keys().next().value.text(), "1");
  assert.deepEqual(runtime.GoMapLookup(structuredMap, new StructuredKey(2), runtime.GoZeroString), ["", false]);
  const exactStructuredMap = runtime.GoMapMake(structuredKey);
  exactStructuredMap.set(new StructuredKey(3), "exact");
  assert.equal(exactStructuredMap.get(new StructuredKey(3)), "exact");

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

test("pointer lowering uses addressable slots for scalar and open type-parameter storage", () => {
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
  const openTypeParameter = semanticTypeDescriptor(typeParameter, {
    ...context(index),
    typeParameters: new Map([["owner::type::0", { depth: 0, index: 0 }]]),
  });
  assert.deepEqual(openTypeParameter, {
    t: "ref",
    id: `${compat}::GoRef`,
    args: [{ t: "tp", depth: 0, index: 0 }],
  });
  const openPointerConstraint = semanticTypeDescriptor(typeParameter, {
    ...context(index),
    typeParameters: new Map([["owner::type::0", { depth: 0, index: 0 }]]),
  }, { typeContext: semanticTypeContexts.constraint });
  assert.deepEqual(openPointerConstraint, {
    t: "ref",
    id: `${compat}::GoPointerConstraint`,
    args: [{ t: "tp", depth: 0, index: 0 }],
  });
  const anyConstraint = {
    kind: "named", nilable: true,
    reference: { objectId: "builtin::type::any", packagePath: "", name: "any", typeArgs: [] },
  };
  const anyConstrainedTypeParameter = semanticTypeDescriptor(typeParameter, {
    ...context(index),
    typeParameters: new Map([["owner::type::0", { depth: 0, index: 0 }]]),
    typeParameterConstraints: new Map([["owner::type::0", anyConstraint]]),
  });
  assert.deepEqual(anyConstrainedTypeParameter, openTypeParameter);
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
