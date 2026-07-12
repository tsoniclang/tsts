import assert from "node:assert/strict";
import test from "node:test";

import { renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { hashText } from "./core/runtime.mjs";
import { canonicalSemanticSignature } from "./core/semantic-variants.mjs";
import { baseConfig } from "./test/helpers.mjs";
import {
  basic,
  externalSnapshot,
  externalType,
  namedType,
  signature,
  structType,
  variable,
} from "./test/external-facade-fixtures.mjs";

test("facade values expose value methods while pointer carriers recover the complete pointer set", () => {
  const packagePath = "example.com/native";
  const objectId = `${packagePath}::type::Thing`;
  const method = (name, receiverMode) => {
    const methodId = `${objectId}::method::${name}`;
    return {
      id: methodId,
      ownerId: objectId,
      name,
      packagePath,
      exported: true,
      signature: {
        ...signature([], []),
        receiver: variable(`${methodId}::signature::receiver`, "thing", namedType(objectId, packagePath, "Thing")),
        receiverMode,
      },
    };
  };
  const snapshot = externalSnapshot([
    externalType({
      packagePath,
      name: "Thing",
      rhs: structType([]),
      methods: [method("Value", "value"), method("Pointer", "pointer")],
    }),
  ]);
  const config = {
    ...baseConfig,
    externalFacadePolicies: [{
      objectId,
      tsModule: "go/example.com/native.ts",
      tsName: "Thing",
      storageStrategy: "generated",
    }],
  };

  const source = renderExternalFacadeModules(config, snapshot).get("go/example.com/native.ts");
  assert.match(source, /import type \{ GoPointerMethodSet \} from "\.\.\/compat\.js";/);
  assert.equal(source.match(/\bValue\(/g)?.length, 2, "value method appears on Thing and in its pointer metadata");
  assert.equal(source.match(/\bPointer\(/g)?.length, 1, "pointer-only method appears only in pointer metadata");
  assert.match(source, /readonly \[__tsgoPointerMethodSet\]\?: GoPointerMethodSet<\{/);
});

test("promoted instantiated signatures are rendered directly from the normalized pointer method set", () => {
  const packagePath = "example.com/native";
  const outerId = `${packagePath}::type::Outer`;
  const genericId = `${packagePath}::type::Generic`;
  const snapshot = externalSnapshot([
    externalType({ packagePath, name: "Outer", rhs: structType([]) }),
  ]);
  const declaration = snapshot.semantic.dependencyTypeDeclarations[0].type;
  const echoSignature = signature([
    variable(`${genericId}::method::Echo::selected::parameters::0`, "value", basic("int")),
  ], [
    variable(`${genericId}::method::Echo::selected::results::0`, "", basic("int")),
  ]);
  const resetSignature = signature([], []);
  const echo = selectedMethod(`${genericId}::method::Echo`, genericId, "Echo", echoSignature, [0, 0]);
  const reset = selectedMethod(`${genericId}::method::Reset`, genericId, "Reset", resetSignature, [0, 1]);
  declaration.valueMethodSet = [echo.selection];
  declaration.pointerMethodSet = [structuredClone(echo.selection), reset.selection];
  snapshot.semantic.methodSetSignatures = [echo.signatureEntry, reset.signatureEntry]
    .sort((left, right) => left.id.localeCompare(right.id));

  const source = renderExternalFacadeModules(baseConfig, snapshot).get("go/example.com/native.ts");
  assert.match(source, /Echo\(value: int\): int/);
  assert.match(source, /\[__tsgoPointerMethodSet\]\?: GoPointerMethodSet<\{[^}]*Echo\(value: int\): int[^}]*Reset\(\): void[^}]*\}>/);
  assert.equal(source.match(/\bReset\(/g)?.length, 1, "pointer-only promoted method is not added to Outer itself");
  assert.match(source, new RegExp(`__goDefinedType::${outerId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}::`));
});

function selectedMethod(methodId, methodOwnerId, name, selectedSignature, index) {
  const signatureId = `${methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(selectedSignature))}`;
  return {
    selection: {
      key: name,
      methodId,
      methodOwnerId,
      name,
      packagePath: "example.com/native",
      exported: true,
      index,
      indirect: false,
      promoted: true,
      signatureId,
    },
    signatureEntry: { id: signatureId, methodId, signature: selectedSignature },
  };
}
