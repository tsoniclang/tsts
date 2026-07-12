import assert from "node:assert/strict";
import test from "node:test";

import { hashText } from "./core/runtime.mjs";
import { canonicalSemanticSignature } from "./core/semantic-variants.mjs";
import {
  buildSemanticMethodSetSignatureIndex,
  materializeSemanticMethodSet,
  pointerOnlySemanticMethodSet,
} from "./core/semantic-method-sets.mjs";

const methodId = "example.org/p::type::Value::method::Set";
const selectedSignature = {
  receiverTypeParameters: [],
  typeParameters: [],
  parameters: { variables: [] },
  results: { variables: [] },
  variadic: false,
};
const signatureId = `${methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(selectedSignature))}`;
const selection = {
  key: "Set",
  methodId,
  methodOwnerId: "example.org/p::type::Value",
  name: "Set",
  packagePath: "example.org/p",
  exported: true,
  index: [0],
  indirect: false,
  promoted: false,
  signatureId,
};

function snapshot() {
  return {
    semantic: {
      methodSetSignatures: [{ id: signatureId, methodId, signature: structuredClone(selectedSignature) }],
    },
  };
}

test("method-set selections resolve one normalized exact selected signature", () => {
  const signatures = buildSemanticMethodSetSignatureIndex(snapshot());
  const declaration = { valueMethodSet: [], pointerMethodSet: [selection] };
  assert.deepEqual(materializeSemanticMethodSet(declaration, "value", signatures), []);
  assert.deepEqual(pointerOnlySemanticMethodSet(declaration, signatures), [{ ...selection, signature: selectedSignature }]);
});

test("method-set signature references fail closed on drift and cross-method reuse", () => {
  const drifted = snapshot();
  drifted.semantic.methodSetSignatures[0].signature.variadic = true;
  assert.throws(() => buildSemanticMethodSetSignatureIndex(drifted), /does not hash/);

  const signatures = buildSemanticMethodSetSignatureIndex(snapshot());
  assert.throws(
    () => materializeSemanticMethodSet({ valueMethodSet: [{ ...selection, methodId: `${methodId}Wrong` }] }, "value", signatures),
    /another declaring method/,
  );
  assert.throws(
    () => materializeSemanticMethodSet({ valueMethodSet: [{ ...selection, signatureId: "missing" }] }, "value", signatures),
    /no selected-signature evidence/,
  );
});
