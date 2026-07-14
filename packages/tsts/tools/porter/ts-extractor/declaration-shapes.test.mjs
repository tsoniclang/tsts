import assert from "node:assert/strict";
import test from "node:test";

import {
  buildImportMap,
  buildLocalTypeNames,
  declarationDescriptor,
  loadParser,
  parseSource,
} from "./ast-signatures.mjs";

test("declaration descriptors retain interfaces, classes, enums, heritage, overloads, and generic defaults", async () => {
  const api = await loadParser();
  const moduleId = "fixture/shapes.ts";
  const text = `
import { Base as ImportedBase } from "./base.js";
export interface Shape<T extends object = { value: string }> extends ImportedBase<T> {
  (value: T): string;
  new (value: T): Shape<T>;
  readonly [key: string]: T;
  read<U extends T = T>(value: U): T;
  read(value: T, fallback: T): T;
}
export abstract class Model<T = string> extends ImportedBase<T> implements Shape<T> {
  static readonly version: number = implementationOnly();
  constructor(public readonly value: T, fallback = "x") { forbiddenConstructorBody(); }
  abstract read(value: T): T;
  async *stream(): AsyncIterable<T> { forbiddenGeneratorBody(); }
  [Symbol.iterator](): Iterator<T> { forbiddenIteratorBody(); }
  get current(): T { forbiddenGetterBody(); }
  set current(value: T) { forbiddenSetterBody(); }
  declared!: T;
  static { forbiddenStaticBlock(); }
}
export const enum Mode { First = 1, Second = First + 2, Third = Second + 1 }
`;
  const sourceFile = parseSource(api, moduleId, text);
  const imports = buildImportMap(api, sourceFile, moduleId);
  const context = {
    api,
    text,
    imports,
    localTypes: buildLocalTypeNames(api, sourceFile),
    localNamespaces: new Set(),
    moduleId,
    valueEnvironment: new Map(),
  };
  const [interfaceNode, classNode, enumNode] = sourceFile.Statements.Nodes.slice(1);
  const interfaceShape = declarationDescriptor(api, interfaceNode, context);
  const classShape = declarationDescriptor(api, classNode, context);
  const enumShape = declarationDescriptor(api, enumNode, context);

  assert.equal(interfaceShape.kind, "interface");
  assert.equal(interfaceShape.typeParams[0].constraint.t, "kw");
  assert.equal(interfaceShape.typeParams[0].default.t, "object");
  assert.equal(interfaceShape.heritage[0].types[0].id, "fixture/base.ts::Base");
  assert.deepEqual(interfaceShape.members.map((member) => member.kind), ["call", "construct", "index", "method", "method"]);
  assert.equal(interfaceShape.members[3].type.typeParams[0].default.t, "tp");

  assert.equal(classShape.kind, "class");
  assert.deepEqual(classShape.modifiers, ["export", "abstract"]);
  assert.deepEqual(classShape.heritage.map((clause) => clause.token), ["extends", "implements"]);
  assert.deepEqual(classShape.members.map((member) => member.kind), ["property", "constructor", "method", "method", "method", "get", "set", "property"]);
  assert.deepEqual(classShape.members[0].modifiers, ["static", "readonly"]);
  assert.equal(classShape.members[1].type.params[0].role, "parameter-property");
  assert.deepEqual(classShape.members[1].type.params[0].modifiers, ["public", "readonly"]);
  assert.equal(classShape.members[1].type.params[1].optional, true);
  assert.equal(classShape.members[1].type.missingReturnType, false);
  assert.equal(classShape.members[1].type.returnTypePolicy, "forbidden");
  assert.deepEqual(classShape.members[1].type.ret, { t: "kw", kw: "void" });
  assert.deepEqual(classShape.members[3].type.signatureModifiers, ["async", "generator"]);
  assert.equal(classShape.members[4].name, "symbol:global::Symbol.iterator");
  assert.equal(classShape.members[6].type.missingReturnType, false);
  assert.equal(classShape.members[6].type.returnTypePolicy, "forbidden");
  assert.equal(classShape.members[7].definite, true);
  const serializedClass = JSON.stringify(classShape);
  for (const bodyName of ["forbiddenConstructorBody", "forbiddenGeneratorBody", "forbiddenIteratorBody", "forbiddenGetterBody", "forbiddenSetterBody", "forbiddenStaticBlock"]) {
    assert.equal(serializedClass.includes(bodyName), false);
  }

  assert.equal(enumShape.kind, "enum");
  assert.deepEqual(enumShape.modifiers, ["export", "const"]);
  assert.deepEqual(enumShape.members.map((member) => [member.name, member.value]), [
    ["First", { kind: "number", value: "1" }],
    ["Second", { kind: "number", value: "3" }],
    ["Third", { kind: "number", value: "4" }],
  ]);
});

test("variable descriptors distinguish every declaration kind and retain structural binding patterns", async () => {
  const api = await loadParser();
  const moduleId = "fixture/values.ts";
  const text = `
var a: number;
let b!: number;
const c: number = 1;
using d = resource;
await using e = resource;
const { value } = source;
`;
  const sourceFile = parseSource(api, moduleId, text);
  const context = {
    api,
    text,
    imports: buildImportMap(api, sourceFile, moduleId),
    localTypes: buildLocalTypeNames(api, sourceFile),
    localNamespaces: new Set(),
    moduleId,
    valueEnvironment: new Map(),
  };
  const descriptors = sourceFile.Statements.Nodes.slice(0, 5).map((node) => declarationDescriptor(api, node, context));
  assert.deepEqual(descriptors.map((descriptor) => descriptor.decls[0].declarationKind), ["var", "let", "const", "using", "awaitUsing"]);
  assert.equal(descriptors[1].decls[0].definite, true);
  assert.equal(descriptors[2].decls[0].initializerStatus, "known");
  assert.equal(Object.hasOwn(descriptors[0].decls[0], "initializerStatus"), false);
  assert.deepEqual(declarationDescriptor(api, sourceFile.Statements.Nodes[5], context).decls[0].binding, {
    kind: "object",
    elements: [{
      kind: "binding-element",
      rest: false,
      property: null,
      name: { kind: "identifier", name: "value" },
      initializer: "missing",
    }],
  });
});

test("authored TypeScript rest parameters remain native rest parameters", async () => {
  const api = await loadParser();
  const moduleId = "fixture/native-rest.ts";
  const text = "export function log(...values: string[]): void { forbiddenCallBody(values); }";
  const sourceFile = parseSource(api, moduleId, text);
  const context = {
    api,
    text,
    imports: buildImportMap(api, sourceFile, moduleId),
    localTypes: buildLocalTypeNames(api, sourceFile),
    localNamespaces: new Set(),
    moduleId,
    valueEnvironment: new Map(),
  };
  const descriptor = declarationDescriptor(api, sourceFile.Statements.Nodes[0], context);
  assert.equal(descriptor.params[0].rest, true);
  assert.deepEqual(descriptor.params[0].type, { t: "array", element: { t: "kw", kw: "string" } });
  assert.equal(JSON.stringify(descriptor).includes("forbiddenCallBody"), false);
});
