import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { removeSuccessfulScratchTree } from "../scripts/scratch-lifecycle.mjs";

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

function allocateFrom(receiver) {
  const allocated = arenaNew(
    receiver,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    forbidden,
    () => ({ count: 0 }),
  );
  assert.notEqual(allocated, undefined);
  return allocated;
}

const nativeNilMessage = await nativeArenaNilMessage(repositoryRoot);
assert.equal(goPanicMessage(() => allocateFrom(undefined)), nativeNilMessage);

function allocate() {
  return allocateFrom(arenaPointer);
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

function goPanicMessage(action) {
  try {
    action();
  } catch (failure) {
    const errorMethod = failure?.value?.Error;
    assert.equal(typeof errorMethod, "function");
    return errorMethod.call(failure.value);
  }
  assert.fail("nil Arena receiver did not panic");
}

async function nativeArenaNilMessage(rootArgument) {
  const root = resolve(rootArgument);
  const scratch = join(root, ".temp", `core-hotpaths-native-${process.pid}`);
  const source = join(scratch, "arena_nil_contract_test.go");
  const overlay = join(scratch, "overlay.json");
  const virtualSource = join(
    root,
    "vendor",
    "typescript-go",
    "internal",
    "core",
    "arena_tsts_contract_test.go",
  );
  await mkdir(scratch, { recursive: true });
  await writeFile(source, `package core

import (
  "fmt"
  "testing"
)

func TestTSTSArenaNilReceiverContract(t *testing.T) {
  defer func() {
    failure := recover()
    if failure == nil {
      t.Fatal("nil Arena receiver did not panic")
    }
    fmt.Printf("TSTS_ARENA_NIL=%v\\n", failure)
  }()
  var arena *Arena[int]
  arena.New()
}
`, "utf8");
  await writeFile(
    overlay,
    `${JSON.stringify({ Replace: { [virtualSource]: source } }, undefined, 2)}\n`,
    "utf8",
  );
  const result = spawnSync(
    "go",
    [
      "test",
      `-overlay=${overlay}`,
      "-run=^TestTSTSArenaNilReceiverContract$",
      "-count=1",
      "-v",
      "./internal/core",
    ],
    {
      cwd: join(root, "vendor", "typescript-go"),
      encoding: "utf8",
      maxBuffer: 16 * 1024 * 1024,
    },
  );
  if (result.error !== undefined) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `native Arena nil-receiver differential failed\n${result.stdout}${result.stderr}`,
    );
  }
  const match = /^TSTS_ARENA_NIL=(.+)$/mu.exec(result.stdout);
  if (match === null) {
    throw new Error("native Arena nil-receiver differential produced no panic value");
  }
  await removeSuccessfulScratchTree(root, scratch);
  return match[1];
}
