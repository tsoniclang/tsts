import assert from "node:assert/strict";
import test from "node:test";

import {
  buildExternalFacadeStoragePlan,
  buildExternalTypeStorageMap,
  finalizeExternalFacadeStorageCatalog,
} from "./core/external-facades.mjs";
import {
  createExternalFacadeContractRenderer,
  renderExternalFacadeModules,
  renderGeneratedArtifact,
} from "./core/facade-artifacts.mjs";
import {
  basic,
  externalSnapshot,
  externalType,
  finalizeExternalFacadeFixtureCatalog,
  interfaceType,
  method,
  namedType,
  signature,
  structType,
  variable,
} from "./test/external-facade-fixtures.mjs";
import { baseConfig } from "./test/helpers.mjs";
import { loadParser } from "./ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments } from "./ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./ts-extractor/module-index.mjs";
import { buildAuthoredFacadeSurfaceIndex } from "./core/authored-facade-selections.mjs";

const parser = await loadParser();

test("the full authored policy catalog is validated before active facade selection", () => {
  const used = externalType({ packagePath: "example.com/native", name: "Used", rhs: basic("int") });
  const unused = externalType({ packagePath: "example.com/native", name: "Unused", rhs: basic("int") });
  const snapshot = externalSnapshot([used, unused], [used.object.id]);
  assert.throws(() => buildExternalTypeStorageMap({
    ...baseConfig,
    externalFacadePolicies: [{
      objectId: unused.object.id,
      tsModule: "go/example.com/native.ts",
      tsName: "Unused",
      storageStrategy: "authored",
    }],
  }, snapshot), /authored storage outside config\.authoredFacadeModules/);
  assert.throws(() => buildExternalTypeStorageMap({
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts", "go/example.com/native.ts"],
  }, snapshot), /authoredFacadeModules duplicates/);
  assert.throws(
    () => buildExternalTypeStorageMap(baseConfig, snapshot),
    /is not recursively reachable from an active Go declaration/,
  );
});

test("authored modules never imply same-name type storage", () => {
  const declaration = externalType({ packagePath: "example.com/native", name: "Thing", rhs: interfaceType() });
  const snapshot = externalSnapshot([declaration]);
  assert.throws(() => buildExternalTypeStorageMap({
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
  }, snapshot), /requires one explicit externalFacadePolicies storage identity/);
});

test("generated storage closure ignores private representation dependencies", () => {
  const privateType = externalType({ packagePath: "private.example/internal", name: "State", rhs: structType([]) });
  const publicType = externalType({
    packagePath: "example.com/native",
    name: "Thing",
    rhs: structType([
      variable(
        "example.com/native::type::Thing::field::state",
        "state",
        namedType(privateType.object.id, "private.example/internal", "State"),
        false,
      ),
    ]),
  });
  const snapshot = externalSnapshot([publicType, privateType], [publicType.object.id]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/private.example/internal.ts"],
  };
  assert.deepEqual([...buildExternalTypeStorageMap(config, snapshot).keys()], [publicType.object.id]);
});

test("policy presence is not a root, while active authored storage closes only selected members", () => {
  const packagePath = "example.com/native";
  const readerId = `${packagePath}::type::Reader`;
  const token = externalType({ packagePath, name: "Token", rhs: basic("string") });
  const omitted = externalType({ packagePath: "omitted.example/private", name: "Options", rhs: structType([]) });
  const read = method(
    `${readerId}::rhs::explicitMethod::0::Read`,
    `${readerId}::rhs`,
    "Read",
    signature([], [variable(`${readerId}::Read::result`, "", namedType(token.object.id, packagePath, "Token"))]),
  );
  const options = method(
    `${readerId}::rhs::explicitMethod::1::Options`,
    `${readerId}::rhs`,
    "Options",
    signature([], [variable(`${readerId}::Options::result`, "", namedType(omitted.object.id, "omitted.example/private", "Options"))]),
  );
  const reader = externalType({ packagePath, name: "Reader", rhs: interfaceType([read, options]) });
  const wrapperPackage = "root.example/entry";
  const wrapper = externalType({
    packagePath: wrapperPackage,
    name: "Wrapper",
    rhs: structType([variable(
      `${wrapperPackage}::type::Wrapper::field::reader`,
      "reader",
      namedType(reader.object.id, packagePath, "Reader"),
      false,
    )]),
  });
  const snapshot = externalSnapshot([wrapper, reader, token, omitted], [wrapper.object.id]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [
      { objectId: reader.object.id, tsModule: "go/example.com/native.ts", tsName: "Reader", storageStrategy: "authored" },
      { objectId: token.object.id, tsModule: "go/example.com/native-token.ts", tsName: "Token", storageStrategy: "generated" },
    ],
  };
  assert.deepEqual([...buildExternalTypeStorageMap(config, snapshot).keys()], [wrapper.object.id]);
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[
    `${config.tsRoot}/go/example.com/native.ts`,
    "export interface Reader { Read(): unknown; }\n",
  ]]));
  const inactive = finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api: parser,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
  });
  assert.deepEqual([...inactive.artifactFacades().keys()], [wrapper.object.id]);
  assert.deepEqual([...inactive.auditFacades().keys()], [wrapper.object.id]);
  const wrongKindIndex = indexTypeScriptModuleSources(parser, new Map([[
    `${config.tsRoot}/go/example.com/native.ts`,
    "export class Reader { Read(): unknown { return undefined; } }\n",
  ]]));
  assert.throws(() => finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api: parser,
    moduleIndex: wrongKindIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, wrongKindIndex),
  }), /direct representation cannot use TypeScript class storage/);
  const activeSnapshot = externalSnapshot([reader, token, omitted], [reader.object.id]);
  const selected = finalizeExternalFacadeFixtureCatalog(config, activeSnapshot, {
    api: parser,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
  });
  assert.deepEqual([...selected.artifactFacades().keys()], [reader.object.id, token.object.id]);
  const modules = renderExternalFacadeModules(config, activeSnapshot, selected);
  assert.ok(modules.has("go/example.com/native-token.ts"));
  assert.equal([...modules.values()].some((source) => source.includes("Options")), false);
});

test("authored facade storage cannot alias Porter-generated declaration storage", () => {
  const api = parser;
  const declaration = externalType({ packagePath: "example.com/native", name: "Facade", rhs: interfaceType() });
  const snapshot = externalSnapshot([declaration]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/authored.ts"],
    externalFacadePolicies: [{
      objectId: declaration.object.id,
      tsModule: "go/authored.ts",
      tsName: "Facade",
      storageStrategy: "authored",
    }],
  };
  const generatedBody = "export interface Shared { Read(): void; }\n";
  const generated = renderGeneratedArtifact(snapshot, "go/generated.ts", "go-facade", generatedBody);
  const moduleIndex = indexTypeScriptModuleSources(api, new Map([
    [`${config.tsRoot}/go/authored.ts`, 'export { Shared as Facade } from "./generated.js";'],
    [`${config.tsRoot}/go/generated.ts`, generated],
  ]));
  assert.throws(() => finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, moduleIndex),
  }), /must be stored directly/);
});

test("finalized facade catalogs reject missing, extra, and provisional authored evidence", () => {
  const declaration = externalType({ packagePath: "example.com/native", name: "Facade", rhs: interfaceType() });
  const snapshot = externalSnapshot([declaration]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId: declaration.object.id,
      tsModule: "go/example.com/native.ts",
      tsName: "Facade",
      storageStrategy: "authored",
    }],
  };
  const plan = buildExternalFacadeStoragePlan(config, snapshot);
  assert.throws(() => finalizeExternalFacadeStorageCatalog(plan, new Map()), /has no source declaration surface/);
  assert.throws(() => finalizeExternalFacadeStorageCatalog(plan, new Map([[
    "example.com/native::type::Extra",
    { objectId: "example.com/native::type::Extra" },
  ]])), /has no storage-plan root/);
  assert.throws(() => renderExternalFacadeModules(config, snapshot, new Map()), /finalized external facade storage catalog/);
});

test("authored object aliases root exactly their selected field dependencies and remain aliases", () => {
  const range16 = externalType({ packagePath: "unicode", name: "Range16", rhs: structType([]) });
  const range32 = externalType({ packagePath: "unicode", name: "Range32", rhs: structType([]) });
  const hidden = externalType({ packagePath: "hidden.example/internal", name: "State", rhs: structType([]) });
  const rangeTable = externalType({
    packagePath: "unicode",
    name: "RangeTable",
    rhs: structType([
      variable("unicode::type::RangeTable::field::R16", "R16", namedType(range16.object.id, "unicode", "Range16"), true),
      variable("unicode::type::RangeTable::field::R32", "R32", namedType(range32.object.id, "unicode", "Range32"), true),
      variable("unicode::type::RangeTable::field::Hidden", "Hidden", namedType(hidden.object.id, "hidden.example/internal", "State"), true),
    ]),
  });
  const rootPackage = "root.example/entry";
  const root = externalType({
    packagePath: rootPackage,
    name: "Root",
    rhs: structType([variable(
      `${rootPackage}::type::Root::field::table`,
      "table",
      namedType(rangeTable.object.id, "unicode", "RangeTable"),
      true,
    )]),
  });
  const snapshot = externalSnapshot([root, rangeTable, range16, range32, hidden], [root.object.id]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/unicode.ts"],
    externalFacadePolicies: [
      { objectId: rangeTable.object.id, tsModule: "go/unicode.ts", tsName: "RangeTable", storageStrategy: "authored" },
      { objectId: range16.object.id, tsModule: "go/unicode-range16.ts", tsName: "Range16", storageStrategy: "generated" },
      { objectId: range32.object.id, tsModule: "go/unicode-range32.ts", tsName: "Range32", storageStrategy: "generated" },
    ],
  };
  const moduleId = `${config.tsRoot}/go/unicode.ts`;
  const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[
    moduleId,
    "export type RangeTable = { R16: unknown; R32: unknown };\n",
  ]]));
  const catalog = finalizeExternalFacadeFixtureCatalog(config, snapshot, {
    api: parser,
    moduleIndex,
    valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
  });
  const artifactFacades = catalog.artifactFacades();
  const auditFacades = catalog.auditFacades();
  assert.deepEqual([...artifactFacades.keys()], [root.object.id, range16.object.id, range32.object.id, rangeTable.object.id]);
  assert.equal(artifactFacades.has(hidden.object.id), false);
  assert.equal(artifactFacades.get(rangeTable.object.id), auditFacades.get(rangeTable.object.id));
  assert.equal(artifactFacades.set, undefined);
  const immutableFacade = artifactFacades.get(rangeTable.object.id);
  assert.equal(Object.isFrozen(immutableFacade), true);
  assert.equal(Object.isFrozen(immutableFacade.variants), true);
  assert.throws(() => { immutableFacade.storageStrategy = "generated"; }, TypeError);
  const immutableSurface = catalog.authoredSurface(rangeTable.object.id);
  assert.equal(Object.isFrozen(immutableSurface), true);
  assert.equal(Object.isFrozen(immutableSurface.memberKeys), true);
  assert.throws(() => immutableSurface.memberKeys.push("property\0Hidden"), TypeError);
  const rendered = createExternalFacadeContractRenderer(config, snapshot, catalog)(
    auditFacades.get(rangeTable.object.id),
    rangeTable.type,
    0,
  ).source;
  assert.match(rendered, /export type RangeTable =/);
  assert.doesNotMatch(rendered, /export interface RangeTable/);
  assert.doesNotMatch(rendered, /Hidden/);
});

test("authored surface evidence is declaration-only and ignores implementation bodies", () => {
  const declaration = externalType({ packagePath: "example.com/native", name: "Facade", rhs: structType([]) });
  const snapshot = externalSnapshot([declaration]);
  const config = {
    ...baseConfig,
    authoredFacadeModules: ["go/example.com/native.ts"],
    externalFacadePolicies: [{
      objectId: declaration.object.id,
      tsModule: "go/example.com/native.ts",
      tsName: "Facade",
      storageStrategy: "authored",
    }],
  };
  const plan = buildExternalFacadeStoragePlan(config, snapshot);
  const moduleId = `${config.tsRoot}/go/example.com/native.ts`;
  const surface = (source) => {
    const moduleIndex = indexTypeScriptModuleSources(parser, new Map([[moduleId, source]]));
    return buildAuthoredFacadeSurfaceIndex({
      api: parser,
      config,
      moduleIndex,
      plan,
      valueEnvironments: buildIndexedModuleValueEnvironments(parser, moduleIndex),
    }).get(declaration.object.id);
  };
  const first = surface('export class Facade { Read(): string { return "first"; } }');
  const bodyOnly = surface('export class Facade { Read(): string { return "second"; } }');
  const signatureDrift = surface("export class Facade { Read(): number { return 2; } }");
  assert.deepEqual(bodyOnly, first);
  assert.notEqual(signatureDrift.declarationHash, first.declarationHash);
  assert.deepEqual(signatureDrift.memberKeys, first.memberKeys);
});
