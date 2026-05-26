/**
 * JS-spec number arithmetic.
 *
 * Port of TS-Go internal/jsnum/jsnum.go. TS-Go wraps `float64` in a `Number`
 * type to provide JS-spec operations; in TypeScript we use the built-in
 * `number` directly (since TypeScript `number` IS the IEEE 754 double that
 * JS uses) and expose the ops as free functions.
 *
 * Most arithmetic translates trivially because TypeScript/JS provides the
 * semantics natively. The non-trivial parts are:
 *
 *   - ToInt32/ToUint32 (the bitwise-op coercion that JS does implicitly)
 *   - Exponentiation with bigint fallback for high-magnitude integers
 *   - Remainder with correct NaN/Infinity edge cases
 */

export const maxSafeInteger = Number.MAX_SAFE_INTEGER;
export const minSafeInteger = Number.MIN_SAFE_INTEGER;

/** Equivalent to TS-Go's `Number(math.NaN())`. */
export function nan(): number {
  return NaN;
}

export function isNaN(x: number): boolean {
  return Number.isNaN(x);
}

/** `Inf(1)` is +Infinity, `Inf(-1)` is -Infinity. */
export function inf(sign: number): number {
  return sign < 0 ? -Infinity : Infinity;
}

export function isInf(x: number): boolean {
  return !Number.isFinite(x) && !Number.isNaN(x);
}

function isNonFinite(x: number): boolean {
  return !Number.isFinite(x);
}

/**
 * TC39 ToInt32 abstract operation.
 * https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-toint32
 *
 * Equivalent to `x | 0` in JS, which is exactly what this returns.
 */
export function toInt32(x: number): number {
  // Bitwise OR with 0 coerces to Int32 per spec.
  return x | 0;
}

/**
 * TC39 ToUint32 abstract operation.
 * https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-touint32
 *
 * `>>> 0` yields Uint32 per spec.
 */
export function toUint32(x: number): number {
  return x >>> 0;
}

function toShiftCount(x: number): number {
  return toUint32(x) & 31;
}

/** Signed right shift, JS-spec. */
export function signedRightShift(x: number, y: number): number {
  return toInt32(x) >> toShiftCount(y);
}

/** Unsigned right shift, JS-spec. */
export function unsignedRightShift(x: number, y: number): number {
  return toUint32(x) >>> toShiftCount(y);
}

/** Left shift, JS-spec. */
export function leftShift(x: number, y: number): number {
  return toInt32(x) << toShiftCount(y);
}

/** Bitwise NOT, JS-spec. */
export function bitwiseNOT(x: number): number {
  return ~toInt32(x);
}

export function bitwiseOR(x: number, y: number): number {
  return toInt32(x) | toInt32(y);
}

export function bitwiseAND(x: number, y: number): number {
  return toInt32(x) & toInt32(y);
}

export function bitwiseXOR(x: number, y: number): number {
  return toInt32(x) ^ toInt32(y);
}

export function trunc(x: number): number {
  return Math.trunc(x);
}

export function floor(x: number): number {
  return Math.floor(x);
}

export function abs(x: number): number {
  return Math.abs(x);
}

/**
 * JS-spec remainder operation.
 * https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-remainder
 *
 * Differs from `%` in edge cases (NaN/Infinity inputs).
 */
export function remainder(n: number, d: number): number {
  if (Number.isNaN(n) || Number.isNaN(d)) return NaN;
  if (isInf(n)) return NaN;
  if (isInf(d)) return n;
  if (d === 0) return NaN;
  if (n === 0) return n;
  return n % d;
}

/**
 * JS-spec exponentiation.
 * https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-exponentiate
 *
 * Uses bigint arithmetic for high-magnitude integer cases to avoid
 * Math.pow's ULP drift (which can be off by multiple units when result
 * exceeds 53 bits).
 */
export function exponentiate(base: number, exponent: number): number {
  if ((base === 1 || base === -1) && isInf(exponent)) return NaN;
  if (base === 1 && Number.isNaN(exponent)) return NaN;

  // Fast path / spec-mandated cases delegate to JS's Math.pow.
  if (
    base >= Number.MIN_SAFE_INTEGER &&
    base <= Number.MAX_SAFE_INTEGER &&
    base === Math.trunc(base) &&
    exponent >= 0 &&
    exponent <= Number.MAX_SAFE_INTEGER &&
    exponent === Math.trunc(exponent) &&
    Number.isFinite(exponent)
  ) {
    const magnitude = exponent * Math.log2(Math.abs(base));
    if (magnitude > 53 && magnitude <= Math.log2(Number.MAX_VALUE)) {
      // High-magnitude integer exponentiation: use bigint for exactness.
      const baseBig = BigInt(base);
      const expBig = BigInt(exponent);
      const resultBig = baseBig ** expBig;
      return Number(resultBig);
    }
  }

  return Math.pow(base, exponent);
}
