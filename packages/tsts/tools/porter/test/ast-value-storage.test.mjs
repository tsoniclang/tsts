import assert from "node:assert/strict";
import test from "node:test";

import { loadConfig } from "../core/runtime.mjs";
import { finalizeGeneratedDeclarationOwners } from "../core/generated-declaration-owner-catalog.mjs";
import { loadAstSchema } from "../ast-generator/config.mjs";
import { emitData } from "../ast-generator/data-emitter.mjs";
import { emitFactory } from "../ast-generator/factory-emitter.mjs";
import { emitFactoryStorage } from "../ast-generator/factory-storage-emitter.mjs";
import { emitKinds } from "../ast-generator/flag-emitters.mjs";
import { astMemberTsType, emitNode, HAND_WRITTEN_BASES } from "../ast-generator/node-emitters.mjs";
import {
  concreteNodeValueStorage,
  generatedBaseValueStorage,
  renderStorageCopyAssignment,
  renderStorageProperty,
} from "../ast-generator/value-storage.mjs";
import {
  astGeneratorOwnedValueTypeNames,
  buildAstGeneratorOwnedGoValueOperationRoutes,
} from "../ast-generator/value-operation-routes.mjs";

const storageOptions = Object.freeze({
  handWrittenBases: HAND_WRITTEN_BASES,
  memberType: astMemberTsType,
});

test("ast value storage covers every generator-owned embedded Go base", () => {
  const schema = loadAstSchema(loadConfig()).model;
  const plans = schema.baseNames()
    .filter((name) => !HAND_WRITTEN_BASES.has(name))
    .map((name) => [name, generatedBaseValueStorage(schema, name, storageOptions)]);

  assert.equal(plans.length, 34);
  assert.equal(plans.reduce((count, [, fields]) => count + fields.length, 0), 187);
  assert.deepEqual(
    plans.map(([name, fields]) => [name, fields.length]).sort((left, right) => right[1] - left[1])[0],
    ["AccessorDeclarationBase", 22],
  );
  assert.deepEqual(
    plans.find(([name]) => name === "CompositeBase")[1],
    [field("facts", "Uint32", "new Uint32()", "uint32")],
  );
});

test("ast value storage covers every generator-owned concrete Go struct exactly", () => {
  const schema = loadAstSchema(loadConfig()).model;
  const plans = schema.nodeNames()
    .filter((name) => !schema.definitions[name].handWritten)
    .map((name) => [name, concreteNodeValueStorage(schema, name, storageOptions)]);

  assert.equal(plans.length, 191);
  assert.equal(plans.reduce((count, [, fields]) => count + fields.length, 0), 1_918);
  assert.deepEqual(
    plans.map(([name, fields]) => [name, fields.length]).sort((left, right) => right[1] - left[1])[0],
    ["FunctionDeclaration", 23],
  );
  assert.ok(plans.every(([, fields]) => fields.length > 0));
});

test("ast value storage flattens promoted Go fields with exact zero and copy semantics", () => {
  const schema = loadAstSchema(loadConfig()).model;
  const identifier = concreteNodeValueStorage(schema, "Identifier", storageOptions);
  assert.deepEqual(identifier, [
    field("Kind", "Kind", "0 as Kind"),
    field("Flags", "NodeFlags", "0 as NodeFlags"),
    field("Loc", "TextRange", "NewTextRange(0 as int, 0 as int)", "text-range"),
    field("id", "Uint64", "new Uint64()", "uint64"),
    field("Parent", "GoPtr<Node>", "undefined"),
    field("data", "GoInterface<nodeData>", "undefined"),
    field("FlowNode", "GoPtr<FlowNode>", "undefined"),
    field("Text", "string", '""'),
  ]);

  const declaration = concreteNodeValueStorage(schema, "FunctionDeclaration", storageOptions);
  assert.deepEqual(declaration.find(({ name }) => name === "Body"), field("Body", "GoPtr<FunctionBody>", "undefined"));
  assert.deepEqual(declaration.find(({ name }) => name === "Locals"), field("Locals", "SymbolTable", "GoNilMap()"));
  assert.deepEqual(declaration.find(({ name }) => name === "facts"), field("facts", "Uint32", "new Uint32()", "uint32"));
  assert.deepEqual(
    declaration.find(({ name }) => name === "modifierFlags"),
    field("modifierFlags", "ModifierFlags", "0 as ModifierFlags", "identity", false),
  );
});

test("ast value storage emits explicit generated zero and copy providers", () => {
  const loaded = loadAstSchema(loadConfig());
  const schema = loaded.model;
  const kindsOutput = emitKinds(loaded);
  const dataOutput = emitData(schema);
  const baseOutput = emitNode(schema);

  assert.match(dataOutput, /class IdentifierNodeData implements nodeData \{\n  Kind: Kind = 0 as Kind;/);
  assert.match(dataOutput, /  Loc: TextRange = NewTextRange\(0 as int, 0 as int\);/);
  assert.match(dataOutput, /  id: Uint64 = new Uint64\(\);/);
  assert.match(dataOutput, /export const IdentifierValueOps: GoValueOps<Identifier> = Object\.freeze\(\{/);
  assert.match(dataOutput, /result\.Loc = copyTextRange\(value\.Loc\);/);
  assert.match(dataOutput, /result\.id = copyUint64\(value\.id\);/);
  assert.match(dataOutput, /result\.FlowNode = value\.FlowNode;/);
  assert.doesNotMatch(dataOutput, /result\.modifierFlags = value\.modifierFlags;/);

  assert.match(baseOutput, /class CompositeBaseValue implements CompositeBase \{\n  facts: Uint32 = new Uint32\(\);/);
  assert.match(baseOutput, /export const CompositeBaseValueOps: GoValueOps<CompositeBase> = Object\.freeze\(\{/);
  assert.match(baseOutput, /result\.facts = copyUint32\(value\.facts\);/);
  assert.match(baseOutput, /class LocalsContainerBaseValue implements LocalsContainerBase \{/);
  assert.match(baseOutput, /  Locals: SymbolTable = GoNilMap\(\);/);
  assert.match(kindsOutput, /export const KindValueOps: GoValueOps<Kind> = GoNumberValueOps;/);
});

test("node factory storage initializes and copies every Go struct field", () => {
  const schema = loadAstSchema(loadConfig()).model;
  const factoryOutput = emitFactory(schema);
  const storageOutput = emitFactoryStorage(schema);
  const interfaceArenas = [...factoryOutput.matchAll(/^  ([A-Za-z0-9_]+Arena): Arena<([^>]+)>;$/gm)];
  const initializedArenas = [...storageOutput.matchAll(/^  ([A-Za-z0-9_]+Arena): Arena<([^>]+)> = \{ data: GoNilSlice\(\) \};$/gm)];
  const copiedArenas = [...storageOutput.matchAll(/^    result\.([A-Za-z0-9_]+Arena) = \{ data: value\.\1\.data \};$/gm)];

  assert.equal(interfaceArenas.length, 48);
  assert.deepEqual(
    initializedArenas.map((match) => match.slice(1)),
    interfaceArenas.map((match) => match.slice(1)),
  );
  assert.deepEqual(
    copiedArenas.map((match) => match[1]),
    interfaceArenas.map((match) => match[1]),
  );
  assert.doesNotMatch(factoryOutput, /^  [A-Za-z0-9_]+Arena\?: Arena</m);
  assert.match(storageOutput, /AsNodeFactory\(\): GoPtr<NodeFactory> \{ return this; \}/);
  assert.match(storageOutput, /result\.hooks = \{/);
  assert.match(storageOutput, /result\.nodeCount = value\.nodeCount;/);
  assert.match(storageOutput, /export const NodeFactoryValueOps: GoValueOps<NodeFactory>/);
});

test("AST generator owns one exact value-operation route for every generated Go struct", () => {
  const config = loadConfig();
  const names = astGeneratorOwnedValueTypeNames(config);
  const declarations = names.map((name) => semanticDeclaration(name));
  const snapshot = { files: [{ units: declarations.map((declaration, index) => ({
    id: `ast-generated-${index}`,
    kind: "type",
    semantic: [declaration],
  })) }] };
  const root = `${config.tsRoot}/internal/ast/generated`;
  const baseNames = new Set(loadAstSchema(config).model.baseNames());
  const generatedTypeOwnership = finalizeGeneratedDeclarationOwners(config, snapshot, declarations.map((declaration, index) => {
    const name = declaration.type.object.name;
    const moduleId = name === "Kind" ? `${root}/kinds.ts`
      : name === "NodeFactory" ? `${root}/factory.ts`
      : baseNames.has(name) ? `${root}/node.ts`
        : `${root}/data.ts`;
    return Object.freeze({
      generator: "porter:ast",
      moduleId,
      objectId: declaration.type.object.id,
      tsName: name,
      unitId: `ast-generated-${index}`,
    });
  }));
  const routes = buildAstGeneratorOwnedGoValueOperationRoutes(config, snapshot, generatedTypeOwnership);

  assert.equal(names.length, 227);
  assert.equal(routes.length, 227);
  const kind = routes.find(({ storageIdentity }) => storageIdentity.endsWith("::Kind"));
  assert.equal(kind.storageIdentity, `${root}/kinds.ts::Kind`);
  assert.equal(kind.operationIdentity, `${root}/kinds.ts::KindValueOps`);
  const nodeFactory = routes.find(({ storageIdentity }) => storageIdentity.endsWith("::NodeFactory"));
  assert.equal(nodeFactory.storageIdentity, `${root}/factory.ts::NodeFactory`);
  assert.equal(nodeFactory.operationIdentity, `${root}/factory-storage.ts::NodeFactoryValueOps`);
  const identifier = routes.find(({ storageIdentity }) => storageIdentity.endsWith("::Identifier"));
  assert.equal(identifier.storageIdentity, `${root}/data.ts::Identifier`);
  assert.equal(identifier.operationIdentity, `${root}/data.ts::IdentifierValueOps`);
  const composite = routes.find(({ storageIdentity }) => storageIdentity.endsWith("::CompositeBase"));
  assert.equal(composite.storageIdentity, `${root}/node.ts::CompositeBase`);
  assert.equal(composite.operationIdentity, `${root}/node.ts::CompositeBaseValueOps`);
  assert.ok(routes.every((route) => route.typeParameterCount === 0 && route.operationTypeParameterIndexes.length === 0));
});

test("ast value storage fails closed for unknown and conflicting representations", () => {
  const unknown = fakeSchema([fakeMember("Mystery", "Unsupported")]);
  assert.throws(
    () => concreteNodeValueStorage(unknown, "Example", fakeOptions),
    /no exact zero operation for 'Unsupported'/,
  );

  const conflict = fakeSchema([fakeMember("Kind", "string")]);
  assert.throws(
    () => concreteNodeValueStorage(conflict, "Example", fakeOptions),
    /field 'Kind' has conflicting flattened storage/,
  );
});

test("ast value storage renders quoted properties without dynamic lookup", () => {
  const plan = field("default", "string", '""');
  assert.equal(renderStorageProperty(plan), '"default": string = "";');
  assert.equal(renderStorageCopyAssignment(plan), 'result["default"] = value["default"];');
});

function field(name, type, zero, copyKind = "identity", copyFromGo = true) {
  return { name, type, zero, copyKind, copyFromGo };
}

function fakeMember(name, type) {
  return {
    name,
    noTS: false,
    goOnly: false,
    noGo: false,
    isKindParam: () => false,
    type,
  };
}

const fakeOptions = Object.freeze({
  handWrittenBases: new Set(["NodeBase"]),
  memberType: (member) => member.type,
});

function fakeSchema(members) {
  return {
    definitions: { Example: {} },
    baseChainOf: () => ["NodeBase"],
    baseFields: () => [],
    members: () => members,
  };
}

function semanticDeclaration(name) {
  const object = {
    exported: true,
    id: `github.com/microsoft/typescript-go/internal/ast::type::${name}`,
    name,
    packagePath: "github.com/microsoft/typescript-go/internal/ast",
  };
  return {
    kind: "type",
    object,
    packagePath: object.packagePath,
    profiles: [0],
    type: {
      alias: false,
      object,
      rhs: { kind: "struct", nilable: false, struct: { fields: [] } },
      typeParameters: [],
    },
  };
}
