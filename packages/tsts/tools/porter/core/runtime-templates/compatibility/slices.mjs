export const sliceRuntime = `interface GoSequenceBacking<T> {
  readonly values: T[];
  elementRefs: Array<NonNullable<GoRef<T>> | undefined> | undefined;
}

class GoArrayHeader<T, Length extends string> {
  declare private readonly lengthType: Length;

  private constructor(
    private readonly backing: GoSequenceBacking<T>,
    readonly length: int,
  ) {}

  static make<T, Length extends string>(length: int, valueOps: GoValueOps<T>): GoArrayHeader<T, Length> {
    requireGoSequenceExtent(length, "array length");
    return new GoArrayHeader<T, Length>(allocateGoSequenceBacking(length, valueOps), length);
  }

  static makeZeroLength<T>(): GoArrayHeader<T, "0"> {
    const backing = allocateUninitializedGoSequenceBacking<T>(0);
    Object.freeze(backing.values);
    Object.freeze(backing);
    const array = new GoArrayHeader<T, "0">(backing, 0 as int);
    Object.freeze(array);
    return array;
  }

  static loadRaw<T, Length extends string>(array: GoArrayHeader<T, Length>, index: int): T {
    return array.backing.values[GoArrayHeader.absoluteIndex(array, index)]!;
  }

  static storeRaw<T, Length extends string>(array: GoArrayHeader<T, Length>, index: int, value: T): void {
    array.backing.values[GoArrayHeader.absoluteIndex(array, index)] = value;
  }

  static elementRef<T, Length extends string>(
    array: GoArrayHeader<T, Length>,
    index: int,
    valueOps: GoValueOps<T>,
  ): NonNullable<GoRef<T>> {
    return goSequenceElementRef(array.backing, GoArrayHeader.absoluteIndex(array, index), valueOps);
  }

  static clone<T, Length extends string>(array: GoArrayHeader<T, Length>, valueOps: GoValueOps<T>): GoArrayHeader<T, Length> {
    const result = new GoArrayHeader<T, Length>(allocateUninitializedGoSequenceBacking(array.length), array.length);
    for (let index = 0; index < array.length; index++) {
      result.backing.values[index] = valueOps.copy(array.backing.values[index]!);
    }
    return result;
  }

  static cloneZeroLength<T>(array: GoArrayHeader<T, "0">): GoArrayHeader<T, "0"> {
    if (array.length !== 0) throw new RangeError("zero-length array value expected");
    return GoArrayHeader.makeZeroLength<T>();
  }

  static slice<T, Length extends string>(
    array: GoArrayHeader<T, Length>,
    low: int,
    high: int,
    maximum: int,
  ): GoSliceHeader<T> {
    requireGoSequenceExtent(low, "low bound");
    requireGoSequenceExtent(high, "high bound");
    requireGoSequenceExtent(maximum, "maximum bound");
    if (low > high || high > maximum || maximum > array.length) throw new RangeError("slice bounds out of range");
    return GoSliceHeader.fromSequence(array.backing, low, high - low, maximum - low);
  }

  private static absoluteIndex<T, Length extends string>(array: GoArrayHeader<T, Length>, index: int): int {
    requireGoSequenceExtent(index, "index");
    if (index >= array.length) throw new RangeError("index out of range");
    return index;
  }
}

class GoSliceHeader<T> {
  private constructor(
    private readonly backing: GoSequenceBacking<T> | undefined,
    private readonly offset: int,
    readonly length: int,
    private readonly capacityValue: int,
  ) {}

  static nil<T>(): GoSliceHeader<T> {
    return new GoSliceHeader<T>(undefined, 0, 0, 0);
  }

  static empty<T>(): GoSliceHeader<T> {
    return GoSliceHeader.fromSequence(allocateUninitializedGoSequenceBacking<T>(0), 0, 0, 0);
  }

  static make<T>(length: int, capacity: int, valueOps: GoValueOps<T>): GoSliceHeader<T> {
    requireGoSequenceExtent(length, "length");
    requireGoSequenceExtent(capacity, "capacity");
    if (length > capacity) throw new RangeError("makeslice: len out of range");
    return GoSliceHeader.fromSequence(allocateGoSequenceBacking(capacity, valueOps), 0, length, capacity);
  }

  static isNil<T>(slice: GoSliceHeader<T>): bool {
    return (slice.backing === undefined) as bool;
  }

  static capacity<T>(slice: GoSliceHeader<T>): int {
    return slice.capacityValue;
  }

  static reslice<T>(slice: GoSliceHeader<T>, low: int, high: int, maximum: int): GoSliceHeader<T> {
    requireGoSequenceExtent(low, "low bound");
    requireGoSequenceExtent(high, "high bound");
    requireGoSequenceExtent(maximum, "maximum bound");
    if (low > high || high > maximum || maximum > slice.capacityValue) {
      throw new RangeError("slice bounds out of range");
    }
    return GoSliceHeader.fromSequence(
      slice.backing,
      (slice.offset + low) as int,
      (high - low) as int,
      (maximum - low) as int,
    );
  }

  static loadRaw<T>(slice: GoSliceHeader<T>, index: int): T {
    const absoluteIndex = GoSliceHeader.absoluteIndex(slice, index);
    return slice.backing!.values[absoluteIndex]!;
  }

  static storeRaw<T>(slice: GoSliceHeader<T>, index: int, value: T): void {
    const absoluteIndex = GoSliceHeader.absoluteIndex(slice, index);
    slice.backing!.values[absoluteIndex] = value;
  }

  static elementRef<T>(slice: GoSliceHeader<T>, index: int, valueOps: GoValueOps<T>): NonNullable<GoRef<T>> {
    const absoluteIndex = GoSliceHeader.absoluteIndex(slice, index);
    const backing = slice.backing!;
    return goSequenceElementRef(backing, absoluteIndex, valueOps);
  }

  static append<T>(slice: GoSliceHeader<T>, value: T, valueOps: GoValueOps<T>): GoSliceHeader<T> {
    const copiedValue = valueOps.copy(value);
    const requiredLength = checkedGoSliceSum(slice.length, 1);
    if (requiredLength <= slice.capacityValue) {
      slice.backing!.values[slice.offset + slice.length] = copiedValue;
      return GoSliceHeader.fromSequence(slice.backing, slice.offset, requiredLength, slice.capacityValue);
    }
    const result = GoSliceHeader.grow(slice, requiredLength, valueOps);
    result.backing!.values[slice.length] = copiedValue;
    return result;
  }

  static appendSlice<T>(slice: GoSliceHeader<T>, items: GoSliceHeader<T>, valueOps: GoValueOps<T>): GoSliceHeader<T> {
    if (items.length === 0) return slice;
    const requiredLength = checkedGoSliceSum(slice.length, items.length);
    const result = requiredLength <= slice.capacityValue
      ? GoSliceHeader.fromSequence(slice.backing, slice.offset, requiredLength, slice.capacityValue)
      : GoSliceHeader.grow(slice, requiredLength, valueOps);
    const destinationStart = result.offset + slice.length;
    const sourceStart = items.offset;
    const copyBackward = result.backing === items.backing
      && destinationStart > sourceStart
      && destinationStart < sourceStart + items.length;
    if (copyBackward) {
      for (let index = items.length - 1; index >= 0; index--) {
        result.backing!.values[destinationStart + index] = valueOps.copy(items.backing!.values[sourceStart + index]!);
      }
    } else {
      for (let index = 0; index < items.length; index++) {
        result.backing!.values[destinationStart + index] = valueOps.copy(items.backing!.values[sourceStart + index]!);
      }
    }
    return result;
  }

  static copy<T>(destination: GoSliceHeader<T>, source: GoSliceHeader<T>, valueOps: GoValueOps<T>): int {
    const count = Math.min(destination.length, source.length) as int;
    const destinationStart = destination.offset;
    const sourceStart = source.offset;
    const copyBackward = destination.backing === source.backing
      && destinationStart > sourceStart
      && destinationStart < sourceStart + count;
    if (copyBackward) {
      for (let index = count - 1; index >= 0; index--) {
        destination.backing!.values[destinationStart + index] = valueOps.copy(source.backing!.values[sourceStart + index]!);
      }
    } else {
      for (let index = 0; index < count; index++) {
        destination.backing!.values[destinationStart + index] = valueOps.copy(source.backing!.values[sourceStart + index]!);
      }
    }
    return count;
  }

  static clone<T>(slice: GoSliceHeader<T>, valueOps: GoValueOps<T>): GoSliceHeader<T> {
    if (GoSliceHeader.isNil(slice)) return GoSliceHeader.nil<T>();
    const result = GoSliceHeader.fromSequence(allocateUninitializedGoSequenceBacking<T>(slice.length), 0, slice.length, slice.length);
    for (let index = 0; index < slice.length; index++) {
      GoSliceHeader.storeRaw(result, index as int, valueOps.copy(GoSliceHeader.loadRaw(slice, index as int)));
    }
    return result;
  }

  static clear<T>(slice: GoSliceHeader<T>, valueOps: GoValueOps<T>): void {
    for (let index = 0; index < slice.length; index++) {
      GoSliceHeader.storeRaw(slice, index as int, valueOps.zero());
    }
  }

  static fromSequence<T>(
    backing: GoSequenceBacking<T> | undefined,
    offset: int,
    length: int,
    capacity: int,
  ): GoSliceHeader<T> {
    return new GoSliceHeader(backing, offset, length, capacity);
  }

  private static absoluteIndex<T>(slice: GoSliceHeader<T>, index: int): int {
    requireGoSequenceExtent(index, "index");
    if (index >= slice.length) throw new RangeError("index out of range");
    return (slice.offset + index) as int;
  }

  private static grow<T>(slice: GoSliceHeader<T>, requiredLength: int, valueOps: GoValueOps<T>): GoSliceHeader<T> {
    const capacity = goSliceGrowthCapacity(slice.capacityValue, requiredLength);
    const result = GoSliceHeader.fromSequence(allocateUninitializedGoSequenceBacking<T>(capacity), 0, requiredLength, capacity);
    for (let index = 0; index < slice.length; index++) {
      result.backing!.values[index] = valueOps.copy(GoSliceHeader.loadRaw(slice, index as int));
    }
    for (let index = requiredLength; index < capacity; index++) result.backing!.values[index] = valueOps.zero();
    return result;
  }
}

export type GoSlice<T> = GoSliceHeader<T>;
export type GoArray<T, Length extends string> = GoArrayHeader<T, Length>;

function allocateGoSequenceBacking<T>(capacity: int, valueOps: GoValueOps<T>): GoSequenceBacking<T> {
  const backing = allocateUninitializedGoSequenceBacking<T>(capacity);
  const values = backing.values;
  for (let index = 0; index < capacity; index++) values[index] = valueOps.zero();
  return backing;
}

function allocateUninitializedGoSequenceBacking<T>(capacity: int): GoSequenceBacking<T> {
  return { values: new Array<T>(capacity), elementRefs: undefined };
}

function goSequenceElementRef<T>(
  backing: GoSequenceBacking<T>,
  absoluteIndex: int,
  valueOps: GoValueOps<T>,
): NonNullable<GoRef<T>> {
  const elementRefs = backing.elementRefs ??= [];
  const existing = elementRefs[absoluteIndex];
  if (existing !== undefined) return existing;
  const reference = {
    [goRefStorage]: true,
    get v(): T { return backing.values[absoluteIndex]!; },
    set v(value: T) { backing.values[absoluteIndex] = valueOps.copy(value); },
  } as NonNullable<GoRef<T>>;
  elementRefs[absoluteIndex] = reference;
  return reference;
}

function requireGoSequenceExtent(value: int, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new RangeError(label + " out of range");
}

function checkedGoSliceSum(left: int, right: int): int {
  const result = left + right;
  if (!Number.isSafeInteger(result)) throw new RangeError("growslice: len out of range");
  return result as int;
}

function goSliceGrowthCapacity(current: int, required: int): int {
  let capacity = current === 0 ? 1 : current;
  while (capacity < required) {
    const next = capacity <= 1024 ? capacity * 2 : capacity + Math.ceil(capacity / 4);
    if (!Number.isSafeInteger(next) || next <= capacity) return required;
    capacity = next;
  }
  return capacity as int;
}

export function GoNilSlice<T>(): GoSlice<T> {
  return GoSliceHeader.nil<T>();
}

export function GoEmptySlice<T>(): GoSlice<T> {
  return GoSliceHeader.empty<T>();
}

export function GoArrayMake<T, Length extends string>(length: int, valueOps: GoValueOps<T>): GoArray<T, Length> {
  return GoArrayHeader.make<T, Length>(length, valueOps);
}

export function GoArrayBuild<T, Length extends string>(
  length: int,
  valueOps: GoValueOps<T>,
  initialize: (array: GoArray<T, Length>) => void,
): GoArray<T, Length> {
  const array = GoArrayMake<T, Length>(length, valueOps);
  initialize(array);
  return array;
}

export function GoArrayLoad<T, Length extends string>(array: GoArray<T, Length>, index: int, valueOps: GoValueOps<T>): T {
  return valueOps.copy(GoArrayHeader.loadRaw(array, index));
}

export function GoArrayStore<T, Length extends string>(array: GoArray<T, Length>, index: int, value: T, valueOps: GoValueOps<T>): void {
  GoArrayHeader.storeRaw(array, index, valueOps.copy(value));
}

export function GoArrayElementRef<T, Length extends string>(
  array: GoArray<T, Length>,
  index: int,
  valueOps: GoValueOps<T>,
): NonNullable<GoRef<T>> {
  return GoArrayHeader.elementRef(array, index, valueOps);
}

export function GoArraySlice<T, Length extends string>(array: GoArray<T, Length>, low: int, high: int): GoSlice<T> {
  return GoArrayHeader.slice(array, low, high, array.length);
}

export function GoArrayFullSlice<T, Length extends string>(
  array: GoArray<T, Length>,
  low: int,
  high: int,
  maximum: int,
): GoSlice<T> {
  return GoArrayHeader.slice(array, low, high, maximum);
}

export function GoArrayValueOps<T, Length extends string>(length: int, elementOps: GoValueOps<T>): GoValueOps<GoArray<T, Length>> {
  return Object.freeze({
    zero: (): GoArray<T, Length> => GoArrayMake<T, Length>(length, elementOps),
    copy: (value: GoArray<T, Length>): GoArray<T, Length> => GoArrayHeader.clone(value, elementOps),
  });
}

export function GoZeroLengthArrayValueOps<T>(): GoValueOps<GoArray<T, "0">> {
  return Object.freeze({
    zero: (): GoArray<T, "0"> => GoArrayHeader.makeZeroLength<T>(),
    copy: (value: GoArray<T, "0">): GoArray<T, "0"> => GoArrayHeader.cloneZeroLength(value),
  });
}

export function GoSliceIsNil<T>(slice: GoSlice<T>): bool {
  return GoSliceHeader.isNil(slice);
}

export function GoSliceMake<T>(length: int, capacity: int, valueOps: GoValueOps<T>): GoSlice<T> {
  return GoSliceHeader.make(length, capacity, valueOps);
}

export function GoSliceBuild<T>(
  length: int,
  capacity: int,
  valueOps: GoValueOps<T>,
  initialize: (slice: GoSlice<T>) => void,
): GoSlice<T> {
  const slice = GoSliceMake(length, capacity, valueOps);
  initialize(slice);
  return slice;
}

export function GoSliceCapacity<T>(slice: GoSlice<T>): int {
  return GoSliceHeader.capacity(slice);
}

export function GoSliceReslice<T>(slice: GoSlice<T>, low: int, high: int): GoSlice<T> {
  return GoSliceHeader.reslice(slice, low, high, GoSliceHeader.capacity(slice));
}

export function GoSliceFullReslice<T>(slice: GoSlice<T>, low: int, high: int, maximum: int): GoSlice<T> {
  return GoSliceHeader.reslice(slice, low, high, maximum);
}

export function GoSliceLoad<T>(slice: GoSlice<T>, index: int, valueOps: GoValueOps<T>): T {
  return valueOps.copy(GoSliceHeader.loadRaw(slice, index));
}

export function GoSliceStore<T>(slice: GoSlice<T>, index: int, value: T, valueOps: GoValueOps<T>): void {
  GoSliceHeader.storeRaw(slice, index, valueOps.copy(value));
}

export function GoSliceElementRef<T>(slice: GoSlice<T>, index: int, valueOps: GoValueOps<T>): NonNullable<GoRef<T>> {
  return GoSliceHeader.elementRef(slice, index, valueOps);
}

export function GoSliceAppend<T>(slice: GoSlice<T>, value: T, valueOps: GoValueOps<T>): GoSlice<T> {
  return GoSliceHeader.append(slice, value, valueOps);
}

export function GoSliceAppendSlice<T>(slice: GoSlice<T>, items: GoSlice<T>, valueOps: GoValueOps<T>): GoSlice<T> {
  return GoSliceHeader.appendSlice(slice, items, valueOps);
}

export function GoSliceCopy<T>(destination: GoSlice<T>, source: GoSlice<T>, valueOps: GoValueOps<T>): int {
  return GoSliceHeader.copy(destination, source, valueOps);
}

export function GoSliceClone<T>(slice: GoSlice<T>, valueOps: GoValueOps<T>): GoSlice<T> {
  return GoSliceHeader.clone(slice, valueOps);
}

export function GoSliceClear<T>(slice: GoSlice<T>, valueOps: GoValueOps<T>): void {
  GoSliceHeader.clear(slice, valueOps);
}
`;
