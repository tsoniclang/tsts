import assert from "node:assert/strict";
import test from "node:test";
import { buildSemanticUnitEligibility } from "../core/semantic-unit-eligibility.mjs";

const declarationlessFile = Object.freeze({ path: "internal/compiler/pkg.go", imports: [], units: [] });
const primaryFile = Object.freeze({
  path: "internal/compiler/program.go",
  imports: [],
  units: [{ kind: "func", id: "compiler::func::NewProgram" }],
});

test("declarationless source files remain outside the exact signature profile without pretending to be toolchain-excluded", () => {
  const eligibility = buildSemanticUnitEligibility({
    files: [declarationlessFile],
    semantic: { requiredFiles: [], excludedFiles: [] },
  });

  assert.equal(eligibility.includes(declarationlessFile), false);
  assert.deepEqual(eligibility.policyFor(declarationlessFile, { active: true, category: "literal-port" }), {
    active: false,
    category: "semantic-declarationless",
    reason: "The source file contains no declaration kind in Porter's exact signature scope.",
  });
});

test("every primary declaration file still requires one exact semantic disposition", () => {
  assert.throws(() => buildSemanticUnitEligibility({
    files: [primaryFile],
    semantic: { requiredFiles: [], excludedFiles: [] },
  }), /must be classified exactly once as required or excluded/);

  assert.throws(() => buildSemanticUnitEligibility({
    files: [primaryFile],
    semantic: { requiredFiles: [primaryFile.path], excludedFiles: [primaryFile.path] },
  }), /both required and excluded/);
});

test("required semantic profiles cannot be assigned to declarationless files", () => {
  assert.throws(() => buildSemanticUnitEligibility({
    files: [declarationlessFile],
    semantic: { requiredFiles: [declarationlessFile.path], excludedFiles: [] },
  }), /requiredFiles includes non-primary file/);
});
