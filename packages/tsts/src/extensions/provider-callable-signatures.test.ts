import { test } from "node:test";
import assert from "node:assert/strict";
import {
  hasUniqueProviderCallableIdentities,
  parseProviderFunctionSignatureMarker,
  renderProviderFunctionSignatureMarker,
} from "./provider-callable-signatures.js";
import type { ProviderDeclarationModel } from "./host.js";

test("provider function signature markers round-trip every canonical supported boundary", () => {
  for (const marker of [0, 1, 12, 1_000_000, Number.MAX_SAFE_INTEGER]) {
    const rendered = renderProviderFunctionSignatureMarker(marker);
    assert.equal(parseProviderFunctionSignatureMarker(rendered), marker);
    assert.equal(renderProviderFunctionSignatureMarker(parseProviderFunctionSignatureMarker(rendered)!), rendered);
  }
});

test("provider function signature marker rendering rejects non-canonical numbers", () => {
  for (const marker of [-1, -0.5, 0.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(
      () => renderProviderFunctionSignatureMarker(marker),
      /non-negative safe integer/,
      String(marker),
    );
  }
});

test("provider function signature marker parsing rejects malformed and non-canonical encodings", () => {
  const malformed = [
    "",
    "/*@tsts-provider-function:*/",
    "/*@tsts-provider-function:-1*/",
    "/*@tsts-provider-function:+1*/",
    "/*@tsts-provider-function:01*/",
    "/*@tsts-provider-function:1.0*/",
    "/*@tsts-provider-function:1e3*/",
    "/*@tsts-provider-function:9007199254740992*/",
    "/*@tsts-provider-function:00000000000000000*/",
    "/*@tsts-provider-function:1",
    "// @tsts-provider-function:1",
    " /*@tsts-provider-function:1*/",
  ];
  for (const sourceText of malformed) {
    assert.equal(parseProviderFunctionSignatureMarker(sourceText), undefined, sourceText);
  }
});

test("provider function signature marker parsing reads only the canonical leading marker", () => {
  assert.equal(
    parseProviderFunctionSignatureMarker("/*@tsts-provider-function:42*/<T>(value: T) => T"),
    42,
  );
  assert.equal(
    parseProviderFunctionSignatureMarker("/*ordinary*/ /*@tsts-provider-function:42*/() => void"),
    undefined,
  );
});

test("provider callable identities reject duplicate nested function ids within one owner", () => {
  const model: ProviderDeclarationModel = {
    moduleSpecifier: "@acme/callables.js",
    providerModuleId: "acme.callables",
    exports: [{
      id: "acme.Owner",
      name: "Owner",
      kind: "interface",
      members: [{
        id: "acme.Owner.value",
        name: "value",
        kind: "property",
        type: {
          kind: "tuple",
          elementTypes: [
            { kind: "function", id: "duplicate", parameters: [], returnType: { kind: "void" } },
            { kind: "function", id: "duplicate", parameters: [], returnType: { kind: "void" } },
          ],
        },
      }],
    }],
  };

  assert.equal(hasUniqueProviderCallableIdentities(model), false);
});

test("provider member identity rejects source-property aliases that bind one TypeScript key", () => {
  const model: ProviderDeclarationModel = {
    moduleSpecifier: "@acme/members.js",
    providerModuleId: "acme.members",
    exports: [{
      id: "acme.Owner",
      name: "Owner",
      kind: "interface",
      members: [
        { id: "acme.Owner.identifier", name: { kind: "identifier", text: "same" }, kind: "property", type: { kind: "string" } },
        { id: "acme.Owner.literal", name: { kind: "string-literal", text: "same" }, kind: "property", type: { kind: "string" } },
      ],
    }],
  };

  assert.equal(hasUniqueProviderCallableIdentities(model), false);
});

test("provider callable identity does not reject legitimate ordered overloads with equal parameter surfaces", () => {
  const model: ProviderDeclarationModel = {
    moduleSpecifier: "@acme/overloads.js",
    providerModuleId: "acme.overloads",
    exports: [{
      id: "acme.pick",
      name: "pick",
      kind: "function",
      signatures: [
        { id: "acme.pick.first", parameters: [{ name: "value", type: { kind: "string" } }], returnType: { kind: "string" } },
        { id: "acme.pick.second", parameters: [{ name: "value", type: { kind: "string" } }], returnType: { kind: "number" } },
      ],
    }],
  };

  assert.equal(hasUniqueProviderCallableIdentities(model), true);
});
