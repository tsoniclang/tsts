import assert from "node:assert/strict";
import test from "node:test";
import { extractFileDescriptors } from "./extract-signatures.mjs";
import { parseTypeScriptModule } from "./module-index.mjs";
import { loadParser } from "./parser-runtime.mjs";

const ANNOTATION = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };
const parser = await loadParser();

test("metadata comes only from parser-attached declaration JSDoc", () => {
  const api = parser;
  const source = `
const ordinary = '@tsgo-unit {"id":"m::fake.go::func::Fake","kind":"func"}';
// @tsgo-unit {"id":"m::comment.go::func::Comment","kind":"func"}
/** @not-porter ordinary */
export function helper(): void {
  /** @tsgo-unit {"id":"m::nested.go::func::Nested","kind":"func"} */
  function nested(): void {}
  nested();
}
/** @tsgo-unit {"id":"m::real.go::func::Real","kind":"func"} */
export function Real(value: string): void {}
`;
  const module = parseTypeScriptModule(api, "pkg/metadata.ts", source);
  assert.deepEqual(module.metadata.map((record) => record.metadata.id), ["m::real.go::func::Real"]);
  const descriptors = extractFileDescriptors(api, "pkg/metadata.ts", source, ANNOTATION);
  assert.equal(descriptors.length, 1);
  assert.equal(descriptors[0].descriptor.name, "Real");
});

test("metadata ownership reports the attached declaration instead of skipping ahead", () => {
  const api = parser;
  const source = `/** @tsgo-unit {"id":"m::f.go::func::target","kind":"func"} */
function helper(): void {}
export function target(): void {}
`;
  const descriptor = extractFileDescriptors(api, "pkg/interleaved.ts", source, ANNOTATION)[0].descriptor;
  assert.equal(descriptor.name, "helper");
  assert.deepEqual(descriptor.metadataIssues, ["metadata names 'target', but declaration name is 'helper'"]);
});

test("attached metadata rejects malformed, duplicate, orphan, misplaced, and non-leading forms", () => {
  const api = parser;
  const cases = [
    ["malformed", `/** @tsgo-unit {bad} */\nexport function f(): void {}`, /invalid @tsgo-unit JSON/],
    ["duplicate", `/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"}\n * @tsgo-unit {"id":"m::f.go::func::f","kind":"func"}\n */\nexport function f(): void {}`, /duplicate @tsgo-unit tags/],
    ["duplicate-id", `/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nexport function f(): void {}\n/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nexport function g(): void {}`, /duplicate @tsgo-unit id/],
    ["orphan-override", `/** @tsgo-override {"category":"x"} */\nexport function f(): void {}`, /orphan @tsgo-override/],
    ["orphan-eof", `export const value = 1;\n/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */`, /orphan Porter metadata/],
    ["misplaced", `/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nimport "pkg";`, /misplaced @tsgo-unit/],
    ["nested-member", `export class C {\n/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nf(): void {}\n}`, /misplaced @tsgo-unit/],
    ["nested-return-type", `export interface C {\nmethod(): {\n/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nvalue: string;\n};\n}`, /misplaced @tsgo-unit/],
    ["non-leading-tag", `/** @deprecated no\n * @tsgo-unit {"id":"m::f.go::func::f","kind":"func"}\n */\nexport function f(): void {}`, /must be the leading JSDoc tag/],
    ["non-leading-document", `/** ordinary */\n/** @tsgo-unit {"id":"m::f.go::func::f","kind":"func"} */\nexport function f(): void {}`, /leading attached JSDoc/],
  ];
  for (const [name, source, expected] of cases) {
    assert.throws(() => parseTypeScriptModule(api, `pkg/${name}.ts`, source), expected, name);
  }
});

test("value groups own only exact contiguous declarations", () => {
  const api = parser;
  const exact = `/** @tsgo-unit {"id":"m::v.go::constGroup::first+second","kind":"constGroup"} */
export const first: number = 1;
export const second: number = 2;
`;
  assert.deepEqual(
    extractFileDescriptors(api, "pkg/exact.ts", exact, ANNOTATION)[0].descriptor.decls.map((declaration) => declaration.name),
    ["first", "second"],
  );
  const interleaved = `/** @tsgo-unit {"id":"m::v.go::constGroup::first+second","kind":"constGroup"} */
export const first: number = 1;
export function helper(): void {}
export const second: number = 2;
`;
  assert.throws(() => extractFileDescriptors(api, "pkg/group-helper.ts", interleaved, ANNOTATION), /contiguous variable declarations/);
  const wrongName = `/** @tsgo-unit {"id":"m::v.go::constGroup::first+second","kind":"constGroup"} */
export const first: number = 1;
export const unrelated: number = 2;
`;
  const wrongNameDescriptor = extractFileDescriptors(api, "pkg/group-name.ts", wrongName, ANNOTATION)[0].descriptor;
  assert.deepEqual(wrongNameDescriptor.decls.map((declaration) => declaration.name), ["first", "unrelated"]);
  assert.deepEqual(wrongNameDescriptor.metadataIssues, ["declaration 2 is 'unrelated', expected 'second'"]);
  const mutableConstGroup = `/** @tsgo-unit {"id":"m::v.go::constGroup::value","kind":"constGroup"} */
export let value: number = 1;
`;
  assert.equal(
    extractFileDescriptors(api, "pkg/group-mutable.ts", mutableConstGroup, ANNOTATION)[0].descriptor.decls[0].declarationKind,
    "let",
  );
});

test("UTF-8 prefixes do not corrupt metadata or declaration text", () => {
  const api = parser;
  const source = `const prefix = "💚 café";
/** @tsgo-unit {"id":"m::types.go::type::Box","kind":"type"} */
export type Box<T extends { café: string }> = keyof T;
`;
  const module = parseTypeScriptModule(api, "pkg/unicode.ts", source);
  assert.match(module.metadata[0].documentText, /@tsgo-unit/);
  const descriptor = extractFileDescriptors(api, "pkg/unicode.ts", source, ANNOTATION)[0].descriptor;
  assert.deepEqual(descriptor.typeParams[0].constraint.members[0].name, "café");
  assert.deepEqual(descriptor.type, { t: "operator", operator: "keyof", type: { t: "tp", depth: 0, index: 0 } });
});

test("parser instances are cached by dist root, not globally", async () => {
  const api = parser;
  assert.equal(await loadParser(), api);
  await assert.rejects(
    loadParser({ distRoot: "/nonexistent/tsts-parser-root-for-cache-contract" }),
    /TS parser dist not built/,
  );
});
