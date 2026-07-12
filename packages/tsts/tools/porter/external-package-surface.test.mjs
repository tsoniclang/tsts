import assert from "node:assert/strict";
import test from "node:test";

import { buildDependencySemanticTypeIndex, buildExternalFacadeStoragePlan } from "./core/external-facades.mjs";
import { buildExternalPackageSurfaceDeclarationIndex } from "./core/external-package-declarations.mjs";
import { createExternalFacadeContractRenderer, renderExternalFacadeModules } from "./core/facade-artifacts.mjs";
import { collectAuthoredFacadeMismatches } from "./sig-check/authored-facades.mjs";
import { collectExternalPackageSurfaceMismatches } from "./sig-check/external-package-declarations.mjs";
import {
  basic,
  externalFunction,
  externalType,
  externalValue,
  finalizeExternalFacadeFixtureCatalog,
  finalizeGeneratedFacadeFixtureCatalog,
  namedType,
  signature,
  structType,
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

function finalizedCatalog(config, snapshot, moduleIndex) {
  return finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api: parser,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
  });
}

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
    externalFacadePolicies: [{
      objectId: tokenId,
      tsModule: "go/example.com/native.ts",
      tsName: "Token",
      storageStrategy: "authored",
    }],
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

  const authoredSource = `import type { int } from "../scalars.js";\nexport type Token = string;\nexport function ParseNative(text: string): Token { throw new Error(text); }\nexport const MaxLimit: int = 7;\nexport let CurrentState: string = "";\n`;
  const initialModuleIndex = indexTypeScriptModuleSources(parser, new Map([
    [`${config.tsRoot}/go/example.com/native.ts`, authoredSource],
    [`${config.tsRoot}/go/scalars.ts`, "export type int = number;"],
  ]));
  assert.equal(renderExternalFacadeModules(config, snapshot, finalizedCatalog(config, snapshot, initialModuleIndex)).size, 0);
  const missingClosure = structuredClone(snapshot);
  missingClosure.semantic.externalPackageSurface.dependencyTypeDeclarations = [];
  assert.throws(
    () => buildExternalFacadeStoragePlan({ ...config, externalFacadePolicies: [] }, missingClosure),
    /references dependency type 'example\.com\/native::type::Token' without extracted go\/types declaration evidence/,
  );
  assert.throws(
    () => buildExternalFacadeStoragePlan(config, missingClosure),
    /externalFacadePolicies\[0\]\.objectId 'example\.com\/native::type::Token' has no extracted go\/types declaration/,
  );
  const extraClosure = structuredClone(snapshot);
  extraClosure.semantic.externalPackageSurface.dependencyTypeDeclarations.push(
    externalType({ packagePath, name: "Unused", rhs: basic("string") }),
  );
  assert.throws(
    () => buildExternalFacadeStoragePlan(config, extraClosure),
    /snapshot dependency type 'example\.com\/native::type::Unused'.*not recursively reachable/,
  );
  assert.throws(
    () => buildDependencySemanticTypeIndex({ semantic: { dependencyTypeDeclarations: [parse] } }),
    /canonical dependency Go type declaration/,
  );

  const audit = (packageSource) => {
    const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [moduleId, packageSource],
      [`${config.tsRoot}/go/scalars.ts`, "export type int = number;"],
    ]));
    const profile = loadProfile(config);
    const facades = finalizedCatalog(config, snapshot, moduleIndex);
    return collectExternalPackageSurfaceMismatches({
      api: parser,
      canonicalIdentity: createCanonicalDeclarationResolver(moduleIndex, {}),
      config,
      conventions: loadConventions(profile.conventions),
      expectedIndex: buildExpectedIndex(config, snapshot, new Map(), profile, new Map(), {
        externalFacades: facades.auditFacades(),
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
  const renamedParameter = authoredSource.replace("ParseNative(text: string)", "ParseNative(input: string)");
  assert.ok(audit(renamedParameter).mismatches.some((mismatch) => mismatch.kind === "param-name"));
  parse.signature.parameterNameProvenance = "unavailable";
  assert.ok(audit(renamedParameter).mismatches.every((mismatch) => mismatch.kind !== "param-name"));
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
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const seedIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, "export type Token = string;\n"]]));
  const seedFacades = finalizedCatalog(config, snapshot, seedIndex);
  assert.equal(renderExternalFacadeModules(config, snapshot, seedFacades).size, 0);
  const facade = seedFacades.auditFacades().get(`${packagePath}::type::Token`);
  assert.equal(facade?.storageStrategy, "authored");
  const source = createExternalFacadeContractRenderer(config, snapshot, seedFacades)(facade, token.type, 0).source;
  const audit = (text) => {
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [`${config.tsRoot}/go/example.com/native.ts`, text],
    ]));
    const profile = loadProfile(config);
    const facades = finalizedCatalog(config, snapshot, moduleIndex);
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

test("external declaration evidence normalizes unavailable names through nested callbacks", () => {
  const packagePath = "example.com/native";
  const callback = signature([
    variable(`${packagePath}::callback::parameters::0`, "arg0", basic("string")),
  ], []);
  callback.parameterNameProvenance = "unavailable";
  const callbackType = { kind: "signature", nilable: true, signature: callback };
  const register = externalFunction({
    packagePath,
    name: "Register",
    functionSignature: signature([
      variable(`${packagePath}::func::Register::parameters::0`, "arg0", callbackType),
    ], []),
  });
  register.signature.parameterNameProvenance = "unavailable";
  register.object.type.signature.parameterNameProvenance = "unavailable";
  const current = externalValue({ packagePath, name: "Current", type: callbackType });
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalPackageSurfaceSelections: [
      { objectId: register.object.id, tsModule: "go/example.com/native.ts", tsName: "RegisterNative" },
      { objectId: `${packagePath}::var::Current`, tsModule: "go/example.com/native.ts", tsName: "CurrentCallback" },
    ],
  };
  const snapshot = {
    files: [],
    semantic: {
      dependencyTypeDeclarations: [],
      externalPackageSurface: {
        declarations: [register, current],
        dependencyTypeDeclarations: [],
        selections: config.externalPackageSurfaceSelections.map((selection) => selection.objectId),
        unresolvedSelections: [],
      },
      methodSetSignatures: [],
      profiles: [{}],
    },
  };
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const compatModuleId = `${config.tsRoot}/go/compat.ts`;
  const audit = (callbackParameterType) => {
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([
      [moduleId, `
import type { GoFunc } from "../compat.js";
export function RegisterNative(handler: GoFunc<(value: ${callbackParameterType}) => void>): void {}
export let CurrentCallback: GoFunc<(currentValue: ${callbackParameterType}) => void>;
`],
      [compatModuleId, "export type GoFunc<F> = F | null;"],
    ]));
    const profile = loadProfile(config);
    const facades = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
    return collectExternalPackageSurfaceMismatches({
      api: parser,
      canonicalIdentity: createCanonicalDeclarationResolver(moduleIndex),
      config,
      conventions: loadConventions(profile.conventions),
      expectedIndex: buildExpectedIndex(config, snapshot, new Map(), profile, new Map(), {
        externalFacades: facades.auditFacades(),
        includeExternalPackageSurface: true,
      }),
      moduleIndex,
      snapshot,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    });
  };
  assert.deepEqual(audit("string").mismatches, []);
  const wrong = audit("number").mismatches;
  assert.equal(wrong.some((mismatch) => mismatch.id === `external-package:${register.object.id}`), true);
  assert.equal(wrong.some((mismatch) => mismatch.id === `external-package:${packagePath}::var::Current`), true);
});

test("selected external type members close audit-only dependencies without generating artifacts", () => {
  const packagePath = "example.com/native";
  const tokenPackage = "dependency.example/types";
  const token = externalType({ packagePath: tokenPackage, name: "Token", rhs: basic("string") });
  const container = externalType({
    packagePath,
    name: "Container",
    rhs: structType([variable(
      `${packagePath}::type::Container::field::Token`,
      "Token",
      namedType(token.object.id, tokenPackage, "Token"),
      true,
    )]),
  });
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalPackageSurfaceSelections: [{
      objectId: container.object.id,
      tsModule: "go/example.com/native.ts",
      tsName: "Container",
    }],
  };
  const snapshot = {
    files: [],
    semantic: {
      dependencyTypeDeclarations: [],
      externalPackageSurface: {
        declarations: [container],
        dependencyTypeDeclarations: [token],
        selections: [container.object.id],
        unresolvedSelections: [],
      },
      methodSetSignatures: [],
      profiles: [{}],
    },
  };
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[
    moduleId,
    "export type Container = { Token: unknown };\n",
  ]]));
  const catalog = finalizedCatalog(config, snapshot, moduleIndex);
  const auditFacades = catalog.auditFacades();
  assert.equal(auditFacades.get(container.object.id)?.storageStrategy, "authored");
  assert.equal(auditFacades.get(token.object.id)?.storageStrategy, "generated");
  assert.equal(catalog.artifactFacades().size, 0);
  assert.equal(renderExternalFacadeModules(config, snapshot, catalog).size, 0);
});
