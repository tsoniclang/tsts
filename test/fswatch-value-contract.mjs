import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [repositoryRoot] = process.argv.slice(2);
assert.equal(typeof repositoryRoot, "string");
const { Event, EventUpdate$constant, EventDelete$constant } = await import(pathToFileURL(join(
  repositoryRoot, ".temp/target/out/packages/github.com/microsoft/typescript-go/internal/fswatch/package.js",
)).href);
const target = Event.$make(EventUpdate$constant(), "before.ts");
const source = Event.$make(EventDelete$constant(), "after.ts");
const retained = Event.$storageOf(target);
Event.$assign(target, source);
assert.equal(Event.$storageOf(target), retained);
assert.equal(target.Path, "after.ts");
assert.equal(target.Kind.$value, EventDelete$constant().$value);
const independent = Event.$copy(target);
Event.$assign(target, Event.$zero());
assert.equal(retained.Path, "");
assert.equal(independent.Path, "after.ts");
Event.$assign(independent, independent);
assert.equal(independent.Path, "after.ts");
console.log("fswatch value assignment: retained storage, independent copy and self assignment verified");
