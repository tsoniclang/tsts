import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex } from "./core/external-facades.mjs";
import { buildExternalPackageSurfaceDeclarationIndex } from "./core/external-package-declarations.mjs";
import { renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { collectExternalPackageSurfaceMismatches } from "./sig-check/external-package-declarations.mjs";
import {
  basic,
  externalFunction,
  externalSnapshot,
  externalType,
  externalValue,
  namedType,
  signature,
  variable,
} from "./test/external-facade-fixtures.mjs";
import { baseConfig } from "./test/helpers.mjs";
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { loadConventions } from "./ts-extractor/conventions.mjs";
import { buildExpectedIndex } from "./ts-extractor/expected-from-go.mjs";
import { buildIndexedModuleValueEnvironments } from "./ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { createCanonicalDeclarationResolver } from "./ts-extractor/module-resolution.mjs";
import { loadProfile } from "./ts-extractor/profile.mjs";

const parser = await loadParser();

test("external package surfaces are explicit and never seed generated facade artifacts", () => {
  const packagePath = "example.com/native";
  const tokenId = `${packagePath}::type::Token`;
  const token = externalType({ packagePath, name: "Token", rhs: basic("string") });
  const parse = externalFunction({
    packagePath,
    name: "Parse",
    functionSignature: signature([
      variable(`${packagePath}::func::Parse::signature::parameters::0`, "text", basic("string")),
    ], [
      variable(`${packagePath}::func::Parse::signature::results::0`, "", namedType(tokenId, packagePath, "Token")),
    ]),
  });
  const limit = externalValue({
    packagePath,
    name: "Limit",
    type: basic("int"),
    constant: { kind: "Int", exact: "7" },
  });
  const state = externalValue({ packagePath, name: "State", type: basic("string") });
  const surfaceDeclarations = [parse, limit, state];
  const surface = buildExternalPackageSurfaceDeclarationIndex(surfaceDeclarations);
  assert.deepEqual([...surface.keys()], [
    `${packagePath}::const::Limit`,
    `${packagePath}::func::Parse`,
    `${packagePath}::var::State`,
  ]);

  const snapshot = externalSnapshot([token], [tokenId]);
  const source = renderExternalFacadeModules(baseConfig, snapshot).get("go/example.com/native.ts");
  assert.match(source, /export type Token = \(string\) & \{ readonly "__goDefinedType::example\.com\/native::type::Token::[0-9a-f]{64}": never \};/);
  assert.doesNotMatch(source, /\b(?:Parse|Limit|State)\b/);
  assert.throws(
    () => buildDependencySemanticTypeIndex({ semantic: { dependencyTypeDeclarations: [parse] } }),
    /canonical dependency Go type declaration/,
  );

  const authoredSource = `${source}\nimport type { int } from "../scalars.js";\nexport function Parse(text: string): Token { throw new Error(text); }\nexport const Limit: int = 7;\nexport let State: string = "";\n`;
  const audit = (packageSource) => {
    const moduleId = `${baseConfig.tsRoot}/go/example.com/native.ts`;
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [moduleId, packageSource],
      [`${baseConfig.tsRoot}/go/scalars.ts`, "export type int = number;"],
    ]));
    const profile = loadProfile(baseConfig);
    return collectExternalPackageSurfaceMismatches({
      api: parser,
      canonicalIdentity: createCanonicalDeclarationResolver(moduleIndex, {}),
      config: baseConfig,
      conventions: loadConventions(profile.conventions),
      expectedIndex: buildExpectedIndex(baseConfig, snapshot, new Map(), profile),
      moduleIndex,
      profile,
      surfaceDeclarations,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    });
  };
  const exact = audit(authoredSource);
  assert.equal(exact.checked, 3);
  assert.deepEqual(exact.mismatches, []);
  const drifted = audit(authoredSource.replace("export const Limit: int = 7;", "export const Limit: int = 8;"));
  assert.ok(
    drifted.mismatches.some((mismatch) => mismatch.id === `external-package:${packagePath}::const::Limit` && mismatch.kind === "value-initializer"),
    JSON.stringify(drifted.mismatches),
  );
});
