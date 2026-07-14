export const valueOperationsRuntime = `export function GoCopyIdentity<T>(value: T): T {
  return value;
}

export const GoBooleanValueOps: GoValueOps<boolean> = Object.freeze({ zero: GoZeroBoolean, copy: GoCopyIdentity });
export const GoNumberValueOps: GoValueOps<number> = Object.freeze({ zero: GoZeroNumber, copy: GoCopyIdentity });
export const GoBigIntValueOps: GoValueOps<bigint> = Object.freeze({ zero: GoZeroBigInt, copy: GoCopyIdentity });
export const GoStringValueOps: GoValueOps<string> = Object.freeze({ zero: GoZeroString, copy: GoCopyIdentity });
export const GoComplex64ValueOps: GoValueOps<GoComplex64> = Object.freeze({
  zero: (): GoComplex64 => ({ real: 0, imag: 0 }),
  copy: (value: GoComplex64): GoComplex64 => ({ real: value.real, imag: value.imag }),
});
export const GoComplex128ValueOps: GoValueOps<GoComplex128> = Object.freeze({
  zero: (): GoComplex128 => ({ real: 0, imag: 0 }),
  copy: (value: GoComplex128): GoComplex128 => ({ real: value.real, imag: value.imag }),
});

const goPointerValueOps = Object.freeze({ zero: GoZeroPointer, copy: GoCopyIdentity });
const goRefValueOps = Object.freeze({ zero: GoZeroRef, copy: GoCopyIdentity });
const goFunctionValueOps = Object.freeze({ zero: GoZeroFunction, copy: GoCopyIdentity });
const goSliceValueOps = Object.freeze({ zero: GoZeroSlice, copy: GoCopyIdentity });
const goMapValueOps = Object.freeze({ zero: GoZeroMap, copy: GoCopyIdentity });
const goChannelValueOps = Object.freeze({ zero: GoZeroChannel, copy: GoCopyIdentity });
const goInterfaceValueOps = Object.freeze({ zero: GoZeroInterface, copy: GoCopyIdentity });
const goUnsafePointerValueOps = Object.freeze({ zero: GoZeroUnsafePointer, copy: GoCopyIdentity });

export function GoPointerValueOps<T>(): GoValueOps<GoPtr<T>> {
  return goPointerValueOps;
}

export function GoRefValueOps<T>(): GoValueOps<GoRef<T>> {
  return goRefValueOps;
}

export function GoFunctionValueOps<F>(): GoValueOps<GoFunc<F>> {
  return goFunctionValueOps;
}

export function GoSliceValueOps<T>(): GoValueOps<GoSlice<T>> {
  return goSliceValueOps;
}

export function GoMapValueOps<K, V>(): GoValueOps<GoMap<K, V>> {
  return goMapValueOps;
}

export function GoChannelValueOps<T, Direction extends string = "bidirectional">(): GoValueOps<GoChan<T, Direction>> {
  return goChannelValueOps;
}

export function GoInterfaceValueOps<I>(): GoValueOps<GoInterface<I>> {
  return goInterfaceValueOps;
}

export function GoNamedValueOps<T>(zero: GoZeroFactory<T>): GoValueOps<T> {
  return Object.freeze({ zero, copy: GoCopyIdentity });
}

export function GoUnsafePointerValueOps(): GoValueOps<GoUnsafePointer> {
  return goUnsafePointerValueOps;
}
`;
