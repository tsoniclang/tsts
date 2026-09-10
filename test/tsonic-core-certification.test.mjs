import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  tsonicCoreSourceSemanticsModules,
} from "../tools/tsonic/packages/source-core/dist/public/index.js";
import {
  providerExportDeclarationsForSourceModule,
} from "../tools/tsonic/packages/source-core/dist/public/extension.js";
import {
  goAbiModule,
  goAbiProviderDeclarations,
} from "../tools/gotots/abi/dist/index.js";
import {
  buildTsonicCoreCertificationSource,
  tsonicCoreCertificationPath,
} from "../scripts/tsonic-core-certification.mjs";

const modules = tsonicCoreSourceSemanticsModules();
const declarationsByModule = new Map([...modules.map((module) => [
  module.moduleSpecifier,
  providerExportDeclarationsForSourceModule(module),
]), [goAbiModule, goAbiProviderDeclarations()]]);

test("source-core certification is an exact deterministic provider projection", async () => {
  const actual = await readFile(tsonicCoreCertificationPath, "utf8");
  const expected = buildTsonicCoreCertificationSource();
  assert.equal(actual, expected);
  assert.equal([...declarationsByModule.values()].reduce((sum, entries) => sum + entries.length, 0), 75);
});

test("source-core certification closes the complete selected denominator", () => {
  assert.deepEqual(
    [...declarationsByModule].map(([moduleSpecifier, declarations]) => ({
      moduleSpecifier,
      declarations: declarations.length,
      names: declarations.map((declaration) => declaration.name).sort(),
    })),
    [
      {
        moduleSpecifier: "@tsonic/core/types.js",
        declarations: 26,
        names: [
          "DataLayout", "FixedArray", "FunctionPointer", "MemoryFieldLayout", "MemoryLayout",
          "NativePointer", "Pointer", "RawPointer",
          "bool", "char", "decimal", "float16", "float32", "float64", "int128",
          "int16", "int32", "int64", "int8", "nativeInt", "nativeUint", "uint128",
          "uint16", "uint32", "uint64", "uint8",
        ],
      },
      {
        moduleSpecifier: "@tsonic/core/lang.js",
        declarations: 45,
        names: [
          "__TsonicAttributeBuilder", "__TsonicAttributeMemberBuilder",
          "__TsonicSafetyBuilder", "__TsonicSafetyMemberBuilder", "addressOf",
          "addressIntegerToRawPointer", "alignOf", "allocatePointer", "attribute", "bindPointer",
          "comptime", "comptimeIf", "defaultValue", "equalPointer", "equalRawPointer", "field", "fieldOffsetOf", "hashPointer",
          "hashRawPointer", "keepAlive", "loadNativePointer", "loadPointer", "memoryArrayLayout", "memoryField", "memoryLayout", "move",
          "mutableBorrow", "offsetNativePointer", "projectPointer", "readOnlyRef",
          "readWriteRef", "safety", "sharedBorrow", "storeNativePointer",
          "storePointer", "struct", "unsafeContext", "writeOnlyRef",
          "offsetRawPointer", "rawPointerToAddressInteger", "reinterpretRawPointer",
          "sizeOf", "strideOf", "toRawPointer", "unroll",
        ].sort(),
      },
      {
        moduleSpecifier: "@gotots/abi/layout.js",
        declarations: 4,
        names: ["big32", "big64", "little32", "little64"],
      },
    ],
  );
});

test("certification carries exact address domains and child-layout arguments", () => {
  const source = buildTsonicCoreCertificationSource();
  assert.match(source, /export const little64: DataLayout;/u);
  for (const name of ["rawPointerToAddressInteger", "addressIntegerToRawPointer", "memoryField", "memoryLayout", "toRawPointer"]) {
    assert.match(source, new RegExp(`export function ${name}[<(]`, "u"));
  }
  const fields = source.split("\n").filter(line => line.includes("export function memoryField"));
  assert.equal(fields.length, 1);
  assert.match(fields[0], /MemoryLayout</u);
  assert.doesNotMatch(source, /export function bindRawPointer/u);
});

test("certification retains exact fixed extents and their child layout", () => {
  const source = buildTsonicCoreCertificationSource();
  assert.match(source, /export interface FixedArray<T, TLength extends number \| bigint>/u);
  assert.match(source, /readonly length: TLength;/u);
  const arrays = source.split("\n").filter(line => line.includes("export function memoryArrayLayout"));
  assert.equal(arrays.length, 1);
  assert.match(arrays[0], /elementLayout: MemoryLayout<T>, length: TLength\): MemoryLayout<FixedArray<T, TLength>>;/u);
});
