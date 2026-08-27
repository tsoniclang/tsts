export function goNumberToBigInt(value: number): bigint {
    return BigInt(globalThis.Number.isFinite(value) ? Math.trunc(value) : 0);
}
