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
  buildTsonicCoreCertificationSource,
  tsonicCoreCertificationPath,
} from "../scripts/tsonic-core-certification.mjs";

const modules = tsonicCoreSourceSemanticsModules();
const declarationsByModule = new Map(modules.map((module) => [
  module.moduleSpecifier,
  providerExportDeclarationsForSourceModule(module),
]));

test("source-core certification is an exact deterministic provider projection", async () => {
  const actual = await readFile(tsonicCoreCertificationPath, "utf8");
  const expected = buildTsonicCoreCertificationSource();
  assert.equal(actual, expected);
  assert.equal([...declarationsByModule.values()].reduce((sum, entries) => sum + entries.length, 0), 53);
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
        declarations: 23,
        names: [
          "FixedArray", "FunctionPointer", "NativePointer", "Pointer", "RawPointer",
          "bool", "char", "decimal", "float16", "float32", "float64", "int128",
          "int16", "int32", "int64", "int8", "nativeInt", "nativeUint", "uint128",
          "uint16", "uint32", "uint64", "uint8",
        ],
      },
      {
        moduleSpecifier: "@tsonic/core/lang.js",
        declarations: 30,
        names: [
          "__TsonicAttributeBuilder", "__TsonicAttributeMemberBuilder",
          "__TsonicSafetyBuilder", "__TsonicSafetyMemberBuilder", "addressOf",
          "allocatePointer", "attribute", "bindPointer", "bindRawPointer",
          "defaultValue", "equalPointer", "equalRawPointer", "field", "hashPointer",
          "hashRawPointer", "loadNativePointer", "loadPointer", "move",
          "mutableBorrow", "offsetNativePointer", "projectPointer", "readOnlyRef",
          "readWriteRef", "safety", "sharedBorrow", "storeNativePointer",
          "storePointer", "struct", "unsafeContext", "writeOnlyRef",
        ],
      },
    ],
  );
});
