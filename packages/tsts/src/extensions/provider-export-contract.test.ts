import { test } from "node:test";
import assert from "node:assert/strict";
import type { ProviderExportDeclaration, ProviderMemberDeclaration, ProviderTypeExpression } from "./host.js";
import { getProviderExportContractKeyMap } from "./provider-export-contract.js";

function contract(exports: readonly ProviderExportDeclaration[]): string {
  return JSON.stringify([...getProviderExportContractKeyMap("@demo/contract.js", exports)]);
}

function richDeclaration(): ProviderExportDeclaration {
  return {
    id: "Token.id",
    name: "TokenImplementation",
    exportName: "Token",
    kind: "class",
    targetIdentity: {
      target: "demo",
      id: "Demo.Token",
      displayName: "Demo.Token<T>",
      packageName: "@demo/runtime",
      packageVersion: "1.0.0",
    },
    typeParameters: [{
      name: "T",
      variance: "out",
      constraints: [{ kind: "object" }],
      defaultType: { kind: "string" },
    }],
    heritage: [{
      kind: "extends",
      type: {
        kind: "provider-ref",
        moduleSpecifier: "@demo/base.js",
        exportName: "Base",
        typeArguments: [{ kind: "type-parameter", name: "T" }],
      },
    }],
    members: [{
      id: "Token.value",
      name: { kind: "identifier", text: "value" },
      kind: "property",
      static: true,
      readonly: true,
      optional: true,
      type: {
        kind: "target-named",
        target: "demo",
        id: "Demo.Value",
        displayName: "Demo.Value",
        typeArguments: [{ kind: "type-parameter", name: "T" }],
        sourceShape: { kind: "string" },
      },
    }, {
      id: "Token.map",
      name: "map",
      kind: "method",
      static: false,
      signatures: [{
        id: "Token.map(T)",
        name: "map-signature",
        parameters: [{
          name: "input",
          type: { kind: "type-parameter", name: "T" },
          passingMode: "byref-readonly",
          optional: true,
          rest: false,
          defaultType: { kind: "undefined" },
        }],
        returnType: { kind: "tuple", elementTypes: [{ kind: "type-parameter", name: "T" }] },
        typeParameters: [{ name: "TMethod", variance: "invariant", constraints: [{ kind: "object" }] }],
      }],
    }],
  };
}

function replaceMember(
  declaration: ProviderExportDeclaration,
  index: number,
  update: (member: ProviderMemberDeclaration) => ProviderMemberDeclaration,
): ProviderExportDeclaration {
  const members = [...(declaration.members ?? [])];
  members[index] = update(members[index]!);
  return { ...declaration, members };
}

test("provider export contracts include every declaration member signature and parameter field", () => {
  const base = richDeclaration();
  const property = base.members![0]!;
  const method = base.members![1]!;
  const signature = method.signatures![0]!;
  const parameter = signature.parameters[0]!;
  const variants: readonly [string, ProviderExportDeclaration][] = [
    ["declaration id", { ...base, id: "Token.changed" }],
    ["public export", { ...base, exportName: "ChangedToken" }],
    ["export kind", { ...base, exportKind: "default" }],
    ["source family", { ...base, sourceTypeFamily: { exportName: "Token", typeArgumentCount: 1 } }],
    ["declaration kind", { ...base, kind: "interface" }],
    ["target", { ...base, targetIdentity: { ...base.targetIdentity!, target: "other" } }],
    ["target id", { ...base, targetIdentity: { ...base.targetIdentity!, id: "Demo.Other" } }],
    ["target display", { ...base, targetIdentity: { ...base.targetIdentity!, displayName: "Other" } }],
    ["target package", { ...base, targetIdentity: { ...base.targetIdentity!, packageName: "@demo/other" } }],
    ["target package version", { ...base, targetIdentity: { ...base.targetIdentity!, packageVersion: "2.0.0" } }],
    ["type parameter name", { ...base, typeParameters: [{ ...base.typeParameters![0]!, name: "U" }] }],
    ["type parameter variance", { ...base, typeParameters: [{ ...base.typeParameters![0]!, variance: "in" }] }],
    ["type parameter constraint", { ...base, typeParameters: [{ ...base.typeParameters![0]!, constraints: [{ kind: "number" }] }] }],
    ["type parameter default", { ...base, typeParameters: [{ ...base.typeParameters![0]!, defaultType: { kind: "number" } }] }],
    ["heritage kind", { ...base, heritage: [{ ...base.heritage![0]!, kind: "implements" }] }],
    ["heritage type", { ...base, heritage: [{ ...base.heritage![0]!, type: { kind: "object" } }] }],
    ["member id", replaceMember(base, 0, (member) => ({ ...member, id: "Token.other" }))],
    ["member name", replaceMember(base, 0, (member) => ({ ...member, name: "other" }))],
    ["member kind", replaceMember(base, 0, (member) => ({ ...member, kind: "field" }))],
    ["member static", replaceMember(base, 0, (member) => ({ ...member, static: false }))],
    ["member readonly", replaceMember(base, 0, (member) => ({ ...member, readonly: false }))],
    ["member optional", replaceMember(base, 0, (member) => ({ ...member, optional: false }))],
    ["member type", replaceMember(base, 0, (member) => ({ ...member, type: { kind: "number" } }))],
    ["member signatures", replaceMember(base, 0, (member) => ({ ...member, signatures: [{ id: "Token.value()", parameters: [] }] }))],
    ["signature id", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, id: "Token.map.changed" }] }))],
    ["signature name", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, name: "changed" }] }))],
    ["signature return", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, returnType: { kind: "number" } }] }))],
    ["signature type parameters", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, typeParameters: [{ name: "U" }] }] }))],
    ["parameter name", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, parameters: [{ ...parameter, name: "other" }] }] }))],
    ["parameter type", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, parameters: [{ ...parameter, type: { kind: "number" } }] }] }))],
    ["parameter passing", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, parameters: [{ ...parameter, passingMode: "move" }] }] }))],
    ["parameter optional", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, parameters: [{ ...parameter, optional: false }] }] }))],
    ["parameter rest", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, parameters: [{ ...parameter, rest: true }] }] }))],
    ["parameter default", replaceMember(base, 1, (member) => ({ ...member, signatures: [{ ...signature, parameters: [{ ...parameter, defaultType: { kind: "number" } }] }] }))],
  ];
  const baseContract = contract([base]);
  assert.ok(property.type !== undefined);
  for (const [label, variant] of variants) {
    assert.notEqual(contract([variant]), baseContract, label);
  }
});

function typeContract(type: ProviderTypeExpression): string {
  return contract([{ id: "Shape", name: "Shape", kind: "type", type }]);
}

test("provider export contracts include every provider type-expression field", () => {
  const pairs: readonly [string, ProviderTypeExpression, ProviderTypeExpression][] = [
    ["intrinsic kind", { kind: "any" }, { kind: "unknown" }],
    ["source primitive", { kind: "source-primitive", name: "int32" }, { kind: "source-primitive", name: "uint8" }],
    ["source global", { kind: "source-global", name: "ClockInstant" }, { kind: "source-global", name: "CalendarInstant" }],
    ["source global arguments", { kind: "source-global", name: "PromiseLikeValue", typeArguments: [{ kind: "string" }] }, { kind: "source-global", name: "PromiseLikeValue", typeArguments: [{ kind: "number" }] }],
    ["type parameter", { kind: "type-parameter", name: "T" }, { kind: "type-parameter", name: "U" }],
    ["target", { kind: "target-named", target: "a", id: "A", sourceShape: { kind: "string" } }, { kind: "target-named", target: "b", id: "A", sourceShape: { kind: "string" } }],
    ["target id", { kind: "target-named", target: "a", id: "A", sourceShape: { kind: "string" } }, { kind: "target-named", target: "a", id: "B", sourceShape: { kind: "string" } }],
    ["target display", { kind: "target-named", target: "a", id: "A", displayName: "A", sourceShape: { kind: "string" } }, { kind: "target-named", target: "a", id: "A", displayName: "B", sourceShape: { kind: "string" } }],
    ["target arguments", { kind: "target-named", target: "a", id: "A", typeArguments: [{ kind: "string" }], sourceShape: { kind: "string" } }, { kind: "target-named", target: "a", id: "A", typeArguments: [{ kind: "number" }], sourceShape: { kind: "string" } }],
    ["target source shape", { kind: "target-named", target: "a", id: "A", sourceShape: { kind: "string" } }, { kind: "target-named", target: "a", id: "A", sourceShape: { kind: "number" } }],
    ["array", { kind: "array", elementType: { kind: "string" } }, { kind: "array", elementType: { kind: "number" } }],
    ["tuple", { kind: "tuple", elementTypes: [{ kind: "string" }] }, { kind: "tuple", elementTypes: [{ kind: "string" }, { kind: "number" }] }],
    ["union", { kind: "union", types: [{ kind: "string" }, { kind: "number" }] }, { kind: "union", types: [{ kind: "string" }, { kind: "boolean" }] }],
    ["intersection", { kind: "intersection", types: [{ kind: "object" }, { kind: "string" }] }, { kind: "intersection", types: [{ kind: "object" }, { kind: "number" }] }],
    ["function id", { kind: "function", id: "left", parameters: [], returnType: { kind: "void" } }, { kind: "function", id: "right", parameters: [], returnType: { kind: "void" } }],
    ["function parameter", { kind: "function", id: "fn", parameters: [{ name: "value", type: { kind: "string" } }], returnType: { kind: "void" } }, { kind: "function", id: "fn", parameters: [{ name: "value", type: { kind: "number" } }], returnType: { kind: "void" } }],
    ["function return", { kind: "function", id: "fn", parameters: [], returnType: { kind: "string" } }, { kind: "function", id: "fn", parameters: [], returnType: { kind: "number" } }],
    ["function type parameters", { kind: "function", id: "fn", parameters: [], returnType: { kind: "void" }, typeParameters: [{ name: "T" }] }, { kind: "function", id: "fn", parameters: [], returnType: { kind: "void" }, typeParameters: [{ name: "U" }] }],
    ["literal string", { kind: "literal", value: "a" }, { kind: "literal", value: "b" }],
    ["literal boolean", { kind: "literal", value: true }, { kind: "literal", value: false }],
    ["literal number", { kind: "literal", value: 1 }, { kind: "literal", value: 2 }],
    ["literal null", { kind: "literal", value: null }, { kind: "literal", value: 0 }],
    ["provider module", { kind: "provider-ref", moduleSpecifier: "@a/x.js", exportName: "X" }, { kind: "provider-ref", moduleSpecifier: "@b/x.js", exportName: "X" }],
    ["provider export", { kind: "provider-ref", moduleSpecifier: "@a/x.js", exportName: "X" }, { kind: "provider-ref", moduleSpecifier: "@a/x.js", exportName: "Y" }],
    ["provider arguments", { kind: "provider-ref", moduleSpecifier: "@a/x.js", exportName: "X", typeArguments: [{ kind: "string" }] }, { kind: "provider-ref", moduleSpecifier: "@a/x.js", exportName: "X", typeArguments: [{ kind: "number" }] }],
    ["opaque id", { kind: "opaque", id: "A", sourceShape: { kind: "string" } }, { kind: "opaque", id: "B", sourceShape: { kind: "string" } }],
    ["opaque display", { kind: "opaque", id: "A", displayName: "A", sourceShape: { kind: "string" } }, { kind: "opaque", id: "A", displayName: "B", sourceShape: { kind: "string" } }],
    ["opaque source shape", { kind: "opaque", id: "A", sourceShape: { kind: "string" } }, { kind: "opaque", id: "A", sourceShape: { kind: "number" } }],
  ];
  for (const [label, left, right] of pairs) {
    assert.notEqual(typeContract(left), typeContract(right), label);
  }
});

test("provider export contracts normalize only non-semantic rendering choices", () => {
  const base = richDeclaration();
  const withDocumentation = {
    ...base,
    documentation: "changed export docs",
    members: base.members!.map((member) => ({
      ...member,
      documentation: "changed member docs",
      ...(member.signatures === undefined ? {} : {
        signatures: member.signatures.map((signature) => ({ ...signature, documentation: "changed signature docs" })),
      }),
    })),
  } satisfies ProviderExportDeclaration;
  assert.equal(contract([base]), contract([withDocumentation]));
  assert.equal(contract([base]), contract([{ ...base, name: "OtherLocalName" }]));
  assert.equal(
    typeContract({ kind: "provider-ref", moduleSpecifier: "@demo/value.js", exportName: "Value", localName: "First" }),
    typeContract({ kind: "provider-ref", moduleSpecifier: "@demo/value.js", exportName: "Value", localName: "Second", namespaceImport: "Values" }),
  );
  assert.equal(typeContract({ kind: "literal", value: -0 }), typeContract({ kind: "literal", value: 0 }));

  const propertyDeclaration = (name: ProviderMemberDeclaration["name"]): ProviderExportDeclaration => ({
    id: "Shape",
    name: "Shape",
    kind: "interface",
    members: [{ id: "Shape.value", name, kind: "property", type: { kind: "number" } }],
  });
  assert.equal(contract([propertyDeclaration("value")]), contract([propertyDeclaration({ kind: "string-literal", text: "value" })]));
  assert.equal(contract([propertyDeclaration({ kind: "number-literal", value: 1 })]), contract([propertyDeclaration({ kind: "string-literal", text: "1" })]));
  assert.notEqual(contract([propertyDeclaration({ kind: "well-known-symbol", name: "iterator" })]), contract([propertyDeclaration({ kind: "string-literal", text: "Symbol.iterator" })]));

  const family0: ProviderExportDeclaration = {
    id: "Family_0",
    name: "Family_0",
    kind: "class",
    sourceTypeFamily: { exportName: "Family", typeArgumentCount: 0 },
    members: [],
  };
  const family1: ProviderExportDeclaration = {
    id: "Family_1",
    name: "Family_1",
    kind: "class",
    sourceTypeFamily: { exportName: "Family", typeArgumentCount: 1 },
    typeParameters: [{ name: "T" }],
    members: [],
  };
  assert.equal(contract([family0, family1]), contract([family1, family0]));
  assert.notEqual(contract([family0, family1]), contract([family0, { ...family1, id: "Family_1.changed" }]));

  const defaultByKind: ProviderExportDeclaration = { id: "Default", name: "Default", exportKind: "default", kind: "class", members: [] };
  const defaultByName: ProviderExportDeclaration = { id: "Default", name: "Default", exportName: "default", kind: "class", members: [] };
  assert.equal(contract([defaultByKind]), contract([defaultByName]));
});
