import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDiagnostic, diagnosticMessagesByCode } from "../../src/diagnostics/index.js";

describe("TypeScript diagnostic catalog", () => {
  it("pins upstream diagnostic identity by code, category, key, and text", () => {
    assert.equal(diagnosticMessagesByCode[2322].category, "Error");
    assert.equal(diagnosticMessagesByCode[2322].text, "Type '{0}' is not assignable to type '{1}'.");
    assert.equal(diagnosticMessagesByCode[2339].text, "Property '{0}' does not exist on type '{1}'.");
    assert.equal(diagnosticMessagesByCode[2307].text, "Cannot find module '{0}' or its corresponding type declarations.");
  });

  it("formats diagnostic placeholders exactly from the pinned template", () => {
    const diagnostic = createDiagnostic(2322, "string", "number");

    assert.equal(diagnostic.code, 2322);
    assert.equal(diagnostic.category, "Error");
    assert.equal(diagnostic.message, "Type 'string' is not assignable to type 'number'.");
    assert.equal(diagnostic.messageText, diagnostic.message);
  });
});
