import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex, buildExternalFacadeStorageCatalog } from "./core/external-facades.mjs";
import { buildExternalPackageSurfaceDeclarationIndex } from "./core/external-package-declarations.mjs";
import { createExternalFacadeContractRenderer, renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { collectExternalPackageSurfaceMismatches } from "./sig-check/external-package-declarations.mjs";
import {
  basic,
  externalFunction,
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
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalPackageSurfaceSelections: [
      { objectId: `${packagePath}::const::Limit`, tsModule: "go/example.com/native.ts", tsName: "MaxLimit" },
      { objectId: `${packagePath}::func::Parse`, tsModule: "go/example.com/native.ts", tsName: "ParseNative" },
      { objectId: `${packagePath}::var::State`, tsModule: "go/example.com/native.ts", tsName: "CurrentState" },
    ],
  };
  const snapshot = {
    files: [],
    semantic: {
      dependencyTypeDeclarations: [],
      externalPackageSurface: {
        declarations: surfaceDeclarations,
        dependencyTypeDeclarations: [token],
        selections: config.externalPackageSurfaceSelections.map((selection) => selection.objectId),
        unresolvedSelections: [],
      },
      methodSetSignatures: [],
      profiles: [{}],
    },
  };
  const surface = buildExternalPackageSurfaceDeclarationIndex(config, snapshot);
  assert.deepEqual([...surface.keys()], [
    `${packagePath}::const::Limit`,
    `${packagePath}::func::Parse`,
    `${packagePath}::var::State`,
  ]);

  assert.equal(renderExternalFacadeModules(config, snapshot).size, 0);
  const missingClosure = structuredClone(snapshot);
  missingClosure.semantic.externalPackageSurface.dependencyTypeDeclarations = [];
  assert.throws(
    () => buildExternalFacadeStorageCatalog(config, missingClosure),
    /references dependency type 'example\.com\/native::type::Token' without extracted go\/types declaration evidence/,
  );
  const extraClosure = structuredClone(snapshot);
  extraClosure.semantic.externalPackageSurface.dependencyTypeDeclarations.push(
    externalType({ packagePath, name: "Unused", rhs: basic("string") }),
  );
  assert.throws(
    () => buildExternalFacadeStorageCatalog(config, extraClosure),
    /snapshot dependency type 'example\.com\/native::type::Unused'.*not recursively reachable/,
  );
  assert.throws(
    () => buildDependencySemanticTypeIndex({ semantic: { dependencyTypeDeclarations: [parse] } }),
    /canonical dependency Go type declaration/,
  );

  const authoredSource = `import type { int } from "../scalars.js";\nexport type Token = string;\nexport function ParseNative(text: string): Token { throw new Error(text); }\nexport const MaxLimit: int = 7;\nexport let CurrentState: string = "";\n`;
  const audit = (packageSource) => {
    const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [moduleId, packageSource],
      [`${config.tsRoot}/go/scalars.ts`, "export type int = number;"],
    ]));
    const profile = loadProfile(config);
    const facades = buildExternalFacadeStorageCatalog(config, snapshot);
    return collectExternalPackageSurfaceMismatches({
      api: parser,
      canonicalIdentity: createCanonicalDeclarationResolver(moduleIndex, {}),
      config,
      conventions: loadConventions(profile.conventions),
      expectedIndex: buildExpectedIndex(config, snapshot, new Map(), profile, new Map(), {
        externalFacades: facades,
        includeExternalPackageSurface: true,
      }),
      moduleIndex,
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    });
  };
  const exact = audit(authoredSource);
  assert.equal(exact.checked, 3);
  assert.deepEqual(exact.mismatches, []);
  assert.deepEqual(audit(authoredSource.replace("throw new Error(text);", "throw new Error(`parse:${text}`);")).mismatches, []);
  const drifted = audit(authoredSource.replace("export const MaxLimit: int = 7;", "export const MaxLimit: int = 8;"));
  assert.ok(
    drifted.mismatches.some((mismatch) => mismatch.id === `external-package:${packagePath}::const::Limit` && mismatch.kind === "value-initializer"),
    JSON.stringify(drifted.mismatches),
  );
});

test("selected external types reuse the authored-facade comparison without becoming generation roots", () => {
  const packagePath = "example.com/native";
  const token = externalType({ packagePath, name: "Token", rhs: basic("string") });
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalPackageSurfaceSelections: [{
      objectId: `${packagePath}::type::Token`, tsModule: "go/example.com/native.ts", tsName: "Token",
    }],
  };
  const snapshot = {
    files: [],
    semantic: {
      dependencyTypeDeclarations: [],
      externalPackageSurface: {
        declarations: [token], dependencyTypeDeclarations: [],
        selections: [`${packagePath}::type::Token`], unresolvedSelections: [],
      },
      methodSetSignatures: [],
      profiles: [{}],
    },
  };
  assert.equal(renderExternalFacadeModules(config, snapshot).size, 0);
  const facades = buildExternalFacadeStorageCatalog(config, snapshot);
  const facade = facades.get(`${packagePath}::type::Token`);
  assert.equal(facade?.storageStrategy, "authored");
  const source = createExternalFacadeContractRenderer(config, snapshot, facades)(facade, token.type, 0);
  const audit = (text) => {
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [`${config.tsRoot}/go/example.com/native.ts`, text],
    ]));
    const profile = loadProfile(config);
    return collectAuthoredFacadeMismatches({
      api: parser,
      canonicalIdentity: createCanonicalDeclarationResolver(moduleIndex, {}),
      config,
      conventions: loadConventions(profile.conventions),
      facades,
      moduleIndex,
      profile,
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    });
  };
  assert.deepEqual(audit(source).mismatches, []);
  assert.ok(audit(source.replace(/\bstring\b/, "number")).mismatches.length > 0);
});
