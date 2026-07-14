import assert from "node:assert/strict";
import test from "node:test";

import {
  buildSemanticMethodSetSignatureScopes,
  buildSemanticTypeParameterScopes,
  validateSemanticMethodSetSignaturePool,
} from "./core/semantic-method-set-validation.mjs";
import { validateSemanticDeclaration, validateSignature } from "./core/semantic-snapshot-validation.mjs";
import { hashText } from "./core/runtime.mjs";
import { canonicalSemanticSignature } from "./core/semantic-variants.mjs";

const packagePath = "example.org/p";
const selectedOwnerId = `${packagePath}::type::Selected`;
const methodOwnerId = `${packagePath}::type::Embedded`;
const methodId = `${methodOwnerId}::method::Map`;
const selectedTypeParameter = typeParameterReference(selectedOwnerId, "type", 0, "S");
const declaringTypeParameter = typeParameterReference(methodOwnerId, "type", 0, "D");
const receiverTypeParameter = typeParameterReference(methodId, "receiver", 0, "D");

test("selected method signatures resolve exact selected and declaring type-parameter scopes", () => {
  const signature = selectedMethodSignature();
  const signatureId = `${methodId}::methodSetSignature::${hashText(canonicalSemanticSignature(signature))}`;
  const selection = {
    key: "Map",
    methodId,
    methodOwnerId,
    name: "Map",
    packagePath,
    exported: true,
    index: [0, 1],
    indirect: true,
    promoted: true,
    signatureId,
  };
  const snapshot = {
    semantic: {
      dependencyTypeDeclarations: [
        typeDeclaration(methodOwnerId, [typeParameter(declaringTypeParameter)]),
        typeDeclaration(selectedOwnerId, [typeParameter(selectedTypeParameter)], [selection]),
      ],
      methodSetSignatures: [{ id: signatureId, methodId, signature }],
    },
    files: [],
  };
  const issues = [];
  const ownerScopes = buildSemanticTypeParameterScopes(snapshot, issues);
  const signatureScopes = buildSemanticMethodSetSignatureScopes(snapshot, ownerScopes, issues);
  validateSemanticMethodSetSignaturePool(snapshot.semantic.methodSetSignatures, "signatures", issues, { validateSignature }, signatureScopes);
  assert.deepEqual(issues, []);

  const missingSelectedOwner = structuredClone(snapshot);
  missingSelectedOwner.semantic.dependencyTypeDeclarations[1].type.typeParameters = [];
  const missingIssues = [];
  const missingOwnerScopes = buildSemanticTypeParameterScopes(missingSelectedOwner, missingIssues);
  const missingSignatureScopes = buildSemanticMethodSetSignatureScopes(missingSelectedOwner, missingOwnerScopes, missingIssues);
  validateSemanticMethodSetSignaturePool(
    missingSelectedOwner.semantic.methodSetSignatures,
    "signatures",
    missingIssues,
    { validateSignature },
    missingSignatureScopes,
  );
  assert.ok(missingIssues.some((issue) => issue.includes("active declaration scope")));
});

test("type-parameter scope catalog rejects profile identity drift", () => {
  const snapshot = {
    semantic: {
      dependencyTypeDeclarations: [
        typeDeclaration(selectedOwnerId, [typeParameter(selectedTypeParameter)]),
        typeDeclaration(selectedOwnerId, [typeParameter(typeParameterReference(selectedOwnerId, "type", 0, "Renamed"))]),
      ],
    },
    files: [],
  };
  const issues = [];
  buildSemanticTypeParameterScopes(snapshot, issues);
  assert.ok(issues.some((issue) => issue.includes("changes type-parameter identity scope")));
});

test("local generic method objects and declarations use their receiver declaration scope", () => {
  const ownerId = `${packagePath}::type::Box`;
  const ownerParameter = typeParameterReference(ownerId, "type", 0, "T");
  const localMethodId = `${ownerId}::method::Get`;
  const localReceiverParameter = typeParameterReference(localMethodId, "receiver", 0, "T");
  const receiverParameters = [typeParameter(localReceiverParameter, ownerParameter)];
  const callable = {
    receiverTypeParameters: receiverParameters,
    typeParameters: [],
    parameters: { variables: [] },
    results: { variables: [] },
    variadic: false,
    parameterNameProvenance: "source",
  };
  const signature = {
    ...structuredClone(callable),
    receiver: {
      id: `${localMethodId}::signature::receiver`,
      name: "box",
      nameKind: "named",
      packagePath,
      embedded: false,
      exported: false,
      type: {
        kind: "named",
        nilable: false,
        reference: {
          objectId: ownerId,
          packagePath,
          name: "Box",
          typeArgs: [{ kind: "typeParameter", nilable: false, typeParameter: localReceiverParameter }],
        },
      },
    },
    receiverMode: "value",
  };
  const semantic = [{
    kind: "method",
    object: {
      id: localMethodId,
      name: "Get",
      packagePath,
      exported: true,
      type: { kind: "signature", nilable: true, signature: callable },
    },
    packagePath,
    profiles: [0],
    signature,
  }];
  const unit = {
    id: `${packagePath}::box.go::method::Box.Get`,
    kind: "method",
    name: "Get",
    exported: true,
    receiver: "Box",
    parameters: [],
    results: [],
    typeParameters: [],
  };
  const expectation = { kind: "required", packagePath, profileLabels: ["test"], profiles: [0] };
  const issues = [];
  validateSemanticDeclaration(semantic, "semantic", issues, unit, expectation, {
    typeParameterScopes: new Map([[ownerId, new Map([[identity(ownerParameter), ownerParameter]])]]),
  });
  assert.deepEqual(issues, []);

  const missingIssues = [];
  validateSemanticDeclaration(semantic, "semantic", missingIssues, unit, expectation, { typeParameterScopes: new Map() });
  assert.ok(missingIssues.some((issue) => issue.includes("constraintSource must identify an active declaration type parameter")));
});

function selectedMethodSignature() {
  return {
    receiverTypeParameters: [typeParameter(receiverTypeParameter, declaringTypeParameter)],
    typeParameters: [],
    parameters: {
      variables: [{
        id: `${methodId}::methodSetSignature::parameters::0`,
        name: "value",
        nameKind: "named",
        packagePath,
        embedded: false,
        exported: false,
        type: { kind: "typeParameter", nilable: false, typeParameter: selectedTypeParameter },
      }],
    },
    results: { variables: [] },
    variadic: false,
    parameterNameProvenance: "source",
  };
}

function typeDeclaration(ownerId, typeParameters, pointerMethodSet = []) {
  return {
    kind: "type",
    object: { id: ownerId },
    type: { typeParameters, valueMethodSet: [], pointerMethodSet },
  };
}

function typeParameter(reference, constraintSource) {
  return {
    reference,
    constraint: {
      kind: "alias",
      nilable: true,
      reference: { objectId: "builtin::type::any", packagePath: "", name: "any", typeArgs: [] },
    },
    ...(constraintSource === undefined ? {} : { constraintSource }),
    constraintSyntax: "any",
  };
}

function typeParameterReference(ownerId, role, index, name) {
  return { ownerId, role, index, name };
}

function identity(reference) {
  return `${reference.ownerId}\u0000${reference.role}\u0000${reference.index}\u0000${reference.name}`;
}
