import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [repositoryRoot] = process.argv.slice(2);
assert.equal(typeof repositoryRoot, "string");
const { Event, EventUpdate$constant, EventDelete$constant } = await import(pathToFileURL(join(
  repositoryRoot, ".temp/target/out/packages/github.com/microsoft/typescript-go/internal/fswatch/package.js",
)).href);
const { GoString } = await import(pathToFileURL(join(
  repositoryRoot, ".temp/target/out/node_modules/@gotots/runtime/string-value.js",
)).href);
const before = GoString.fromText("before.ts");
const after = GoString.fromText("after.ts");
const target = Event.$make(EventUpdate$constant(), before);
const source = Event.$make(EventDelete$constant(), after);
const retained = Event.$storageOf(target);
Event.$assign(target, source);
assert.equal(Event.$storageOf(target), retained);
assert.equal(target.Path, after);
assert.equal(target.Kind.$value, EventDelete$constant().$value);
const independent = Event.$copy(target);
Event.$assign(target, Event.$zero());
assert.equal(retained.Path, GoString.empty);
assert.equal(independent.Path, after);
Event.$assign(independent, independent);
assert.equal(independent.Path, after);
console.log("fswatch value assignment: retained storage, independent copy and self assignment verified");
