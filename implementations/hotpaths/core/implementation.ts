import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import type { Pointer } from "@tsonic/core/types.js";
import type { Arena$Storage } from "../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
import { LinkStore } from "../../modules/github.com/microsoft/typescript-go/internal/core/linkstore.js";
import { Arena } from "../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { addressOf, loadPointer, projectPointer } from "@tsonic/core/lang.js";

export function linkStoreGet<K, V>(
  storePointer: Pointer<LinkStore<K, V>> | undefined,
  sliceCapacity: (slice: RuntimeSlice<GoContainerStorage<V>>) => int,
  convertSlice: (
    slice: RuntimeSlice<GoContainerStorage<V>>,
  ) => RuntimeSlice<GoContainerStorage<V>>,
  copyValue: (value: V) => V,
  fromContainerStorage: (value: GoContainerStorage<V>) => V,
  indexAddress: (
    slice: RuntimeSlice<GoContainerStorage<V>>,
    index: int,
  ) => Pointer<V> | undefined,
  sliceLength: (slice: RuntimeSlice<GoContainerStorage<V>>) => int,
  constructMap: (
    zero: Pointer<V> | undefined,
  ) => GoMapValue<K, Pointer<V> | undefined>,
  toContainerStorage: (value: V) => GoContainerStorage<V>,
  zeroValue: () => V,
  key: K,
): Pointer<V> | undefined {
  const store = LinkStore.$storageOf(
    loadPointer(
      storePointer ??
        GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"),
    ),
  );
  let value = store.entries.lookup(key);
  if (value !== undefined) {
    return value;
  }
  if (store.entries.isNil()) {
    store.entries = constructMap(undefined);
  }

  value = Arena.New$kernel(
    projectPointer<Arena$Storage<V>, Arena<V>>(
      addressOf(store.arena),
      (storage) => Arena.$fromStorage(storage),
      (arena) => Arena.$storageOf(arena),
    ),
    sliceCapacity,
    convertSlice,
    copyValue,
    fromContainerStorage,
    indexAddress,
    sliceLength,
    toContainerStorage,
    zeroValue,
  );
  store.entries.store(key, value);
  return value;
}
