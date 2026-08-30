import assert from "node:assert/strict";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [repositoryRoot] = process.argv.slice(2);
if (repositoryRoot === undefined) {
  throw new Error("repository root is required");
}

const outputRoot = join(repositoryRoot, ".temp", "target", "out");
const { arenaNew } = await import(
  pathToFileURL(
    join(outputRoot, "implementations", "tsts", "core-hotpaths.js"),
  ).href
);
const { Arena } = await import(
  pathToFileURL(
    join(
      outputRoot,
      "modules",
      "github.com",
      "microsoft",
      "typescript-go",
      "internal",
      "core",
      "arena.js",
    ),
  ).href
);
const { RuntimeSlice } = await import(
  pathToFileURL(join(outputRoot, "runtime", "slice.js")).href
);
const { location, sameLocation } = await import(
  pathToFileURL(
    join(
      outputRoot,
      "node_modules",
      "@tsonic",
      "typescript-runtime",
      "dist",
      "location.js",
    ),
  ).href
);

const identity = (value) => value;
const arena = Arena.$fromStorage({ data: RuntimeSlice.make(0, 2, 0) });
const arenaPointer = location(arena);
const initialData = Arena.$storageOf(arena).data;
let forbiddenCapabilityCalls = 0;

const forbidden = () => {
  forbiddenCapabilityCalls += 1;
  throw new Error("independent arena allocation used a backing-storage capability");
};

function allocate() {
  const pointer = arenaNew(
    arenaPointer,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    () => ({ count: 0 }),
  );
  assert.notEqual(pointer, undefined);
  return pointer;
}

const first = allocate();
const firstAlias = first;
assert.deepEqual(first.value, { count: 0 });
first.value.count = 11;
assert.equal(firstAlias.value.count, 11);
assert.equal(sameLocation(first, firstAlias), true);

const second = allocate();
assert.equal(sameLocation(first, second), false);
assert.deepEqual(second.value, { count: 0 });
second.value.count = 13;
assert.equal(first.value.count, 11);

assert.equal(Arena.$storageOf(arena).data, initialData);
assert.equal(initialData.length, 0);
assert.equal(forbiddenCapabilityCalls, 0);

console.log("core hotpaths: independent arena allocation verified");
