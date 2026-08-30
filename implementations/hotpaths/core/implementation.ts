import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import type { Pointer } from "@tsonic/core/types.js";
import { LinkStore } from "../../modules/github.com/microsoft/typescript-go/internal/core/linkstore.js";
import type { Arena } from "../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { allocatePointer, loadPointer } from "@tsonic/core/lang.js";

export function arenaNew<T>(
  _arenaPointer: Pointer<Arena<T>> | undefined,
  _sliceCapacity: (slice: RuntimeSlice<GoContainerStorage<T>>) => int,
  _convertSlice: (
    slice: RuntimeSlice<GoContainerStorage<T>>,
  ) => RuntimeSlice<GoContainerStorage<T>>,
  _copyValue: (value: T) => T,
  _fromContainerStorage: (value: GoContainerStorage<T>) => T,
  _indexAddress: (
    slice: RuntimeSlice<GoContainerStorage<T>>,
    index: int,
  ) => Pointer<T> | undefined,
  _sliceLength: (slice: RuntimeSlice<GoContainerStorage<T>>) => int,
  _toContainerStorage: (value: T) => GoContainerStorage<T>,
  zeroValue: () => T,
): Pointer<T> | undefined {
  return allocatePointer(zeroValue());
}

export function linkStoreGet<K, V>(
  storePointer: Pointer<LinkStore<K, V>> | undefined,
  _sliceCapacity: (slice: RuntimeSlice<GoContainerStorage<V>>) => int,
  _convertSlice: (
    slice: RuntimeSlice<GoContainerStorage<V>>,
  ) => RuntimeSlice<GoContainerStorage<V>>,
  _copyValue: (value: V) => V,
  _fromContainerStorage: (value: GoContainerStorage<V>) => V,
  _indexAddress: (
    slice: RuntimeSlice<GoContainerStorage<V>>,
    index: int,
  ) => Pointer<V> | undefined,
  _sliceLength: (slice: RuntimeSlice<GoContainerStorage<V>>) => int,
  constructMap: (
    zero: Pointer<V> | undefined,
  ) => GoMapValue<K, Pointer<V> | undefined>,
  _toContainerStorage: (value: V) => GoContainerStorage<V>,
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

  value = allocatePointer(zeroValue());
  store.entries.store(key, value);
  return value;
}
