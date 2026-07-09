import assert from "node:assert/strict";
import { test } from "node:test";
import type { GoPtr } from "../../go/compat.js";
import { Map as SyncGoMap } from "../../go/sync.js";
import type { SourceFile } from "../ast/ast.js";
import {
  NewOrderedMapWithSizeHint,
  OrderedMap_Set,
} from "../collections/ordered_map.js";
import type { SyncMap } from "../collections/syncmap.js";
import type { CompilerHost } from "../compiler/host.js";
import type { Path } from "../tspath/path.js";
import type { FS } from "../vfs/vfs.js";
import {
  parsedConfigDeepEqual,
  watchCompilerHost_as_compiler_CompilerHost,
  type cachedSourceFile,
  type watchCompilerHost,
} from "./watcher.js";

function newSyncMap<K, V>(): SyncMap<K, V> {
  return { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncGoMap() };
}

test("watch config comparison observes OrderedMap values", () => {
  const left = NewOrderedMapWithSizeHint<string, unknown>(1)!;
  const right = NewOrderedMapWithSizeHint<string, unknown>(1)!;
  const leftOptions = NewOrderedMapWithSizeHint<string, unknown>(1)!;
  const rightOptions = NewOrderedMapWithSizeHint<string, unknown>(1)!;
  OrderedMap_Set(leftOptions, "strict", true);
  OrderedMap_Set(rightOptions, "strict", true);
  OrderedMap_Set(left, "compilerOptions", leftOptions);
  OrderedMap_Set(right, "compilerOptions", rightOptions);

  assert.equal(parsedConfigDeepEqual(left, right), true);

  OrderedMap_Set(rightOptions, "strict", false);
  assert.equal(parsedConfigDeepEqual(left, right), false);
});

test("watch compiler host delegates and caches source files by modification time", () => {
  const firstModTime = {
    Equal: (other: unknown): boolean => other === firstModTime,
  };
  const secondModTime = {
    Equal: (other: unknown): boolean => other === secondModTime,
  };
  let modTime = firstModTime;
  const fs = {
    Stat: () => ({ ModTime: () => modTime }),
  } as unknown as FS;
  const firstFile = { fileName: "/work/main.ts" } as SourceFile;
  const secondFile = { fileName: "/work/main.ts" } as SourceFile;
  let reads = 0;
  const inner: CompilerHost = {
    FS: () => fs,
    DefaultLibraryPath: () => "/lib",
    GetCurrentDirectory: () => "/work",
    Trace: () => {},
    GetSourceFile: () => {
      reads++;
      return reads === 1 ? firstFile : secondFile;
    },
    GetResolvedProjectReference: (): GoPtr<never> => undefined,
  };
  const wrapper: watchCompilerHost = {
    __tsgoEmbedded0: inner,
    cache: newSyncMap<Path, GoPtr<cachedSourceFile>>(),
  };
  const host = watchCompilerHost_as_compiler_CompilerHost(wrapper);
  const options = { FileName: "/work/main.ts", Path: "/work/main.ts" as Path };

  assert.equal(host.FS(), fs);
  assert.equal(host.DefaultLibraryPath(), "/lib");
  assert.equal(host.GetCurrentDirectory(), "/work");
  assert.equal(host.GetSourceFile(options), firstFile);
  assert.equal(host.GetSourceFile(options), firstFile);
  assert.equal(reads, 1);

  modTime = secondModTime;
  assert.equal(host.GetSourceFile(options), secondFile);
  assert.equal(reads, 2);
});
