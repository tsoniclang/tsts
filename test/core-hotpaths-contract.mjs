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
const { location, projectLocation, sameLocation } = await import(
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
let indexAddressCalls = 0;

function allocate() {
  const pointer = arenaNew(
    arenaPointer,
    (slice) => slice.capacity,
    identity,
    identity,
    identity,
    () => {
      indexAddressCalls++;
      throw new Error("superseded index-address capability was invoked");
    },
    (slice) => slice.length,
    identity,
    () => 0,
  );
  assert.notEqual(pointer, undefined);
  return pointer;
}

const first = allocate();
const firstSlice = Arena.$storageOf(arena).data;
const firstCanonical = projectLocation(firstSlice.address(0), identity, identity);
assert.equal(sameLocation(first, firstCanonical), true);
first.value = 11;
assert.equal(first.value, 11);
assert.equal(firstCanonical.value, 11);

const second = allocate();
assert.equal(sameLocation(first, second), false);
second.value = 13;
assert.equal(second.value, 13);

const third = allocate();
const grownSlice = Arena.$storageOf(arena).data;
const thirdCanonical = projectLocation(grownSlice.address(0), identity, identity);
assert.equal(sameLocation(third, thirdCanonical), true);
assert.equal(sameLocation(first, third), false);
third.value = 17;
assert.equal(grownSlice.get(0), 17);

first.value = 19;
assert.equal(firstCanonical.value, 19);
assert.equal(grownSlice.get(0), 17);
assert.equal(indexAddressCalls, 0);

console.log("core hotpaths: exact arena location identity and growth verified");
