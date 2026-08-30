import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import type { Pointer } from "@tsonic/core/types.js";
import * as genericSlicesKernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { LinkStore } from "../../modules/github.com/microsoft/typescript-go/internal/core/linkstore.js";
import {
  Arena,
  nextArenaSize,
} from "../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { allocatePointer, loadPointer } from "@tsonic/core/lang.js";

export function arenaNew<T>(
  arenaPointer: Pointer<Arena<T>> | undefined,
  sliceCapacity: (slice: RuntimeSlice<GoContainerStorage<T>>) => int,
  convertSlice: (
    slice: RuntimeSlice<GoContainerStorage<T>>,
  ) => RuntimeSlice<GoContainerStorage<T>>,
  copyValue: (value: T) => T,
  fromContainerStorage: (value: GoContainerStorage<T>) => T,
  indexAddress: (
    slice: RuntimeSlice<GoContainerStorage<T>>,
    index: int,
  ) => Pointer<T> | undefined,
  sliceLength: (slice: RuntimeSlice<GoContainerStorage<T>>) => int,
  toContainerStorage: (value: T) => GoContainerStorage<T>,
  zeroValue: () => T,
): Pointer<T> | undefined {
  const arena = Arena.$storageOf(
    loadPointer(
      arenaPointer ??
        GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"),
    ),
  );
  let data = arena.data;
  const currentLength = sliceLength(data);
  if (currentLength === sliceCapacity(data)) {
    data = genericSlicesKernel.SlicesGrowKernel<
      RuntimeSlice<GoContainerStorage<T>>,
      T,
      GoContainerStorage<T>
    >(
      convertSlice,
      convertSlice,
      copyValue,
      fromContainerStorage,
      toContainerStorage,
      zeroValue,
      RuntimeSlice.nil<GoContainerStorage<T>>(),
      BigInt.asIntN(64, goNumberToBigInt(nextArenaSize(currentLength))),
    );
  }
  const index = sliceLength(data);
  data = data.slice(0, index + 1, null);
  arena.data = data;
  return indexAddress(data, index);
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
