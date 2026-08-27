import { GoPanic } from "./panic.js";
export function goIntegerDivide(left: bigint, right: bigint): bigint {
    if (right === 0n) {
        GoPanic.raiseRuntime("integer divide by zero");
    }
    return left / right;
}
export function goIntegerRemainder(left: bigint, right: bigint): bigint {
    if (right === 0n) {
        GoPanic.raiseRuntime("integer divide by zero");
    }
    return left % right;
}
export function goNumberIntegerDivide(left: number, right: number): number {
    if (right === 0) {
        GoPanic.raiseRuntime("integer divide by zero");
    }
    const result: number = Math.trunc(left / right);
    return result === 0 ? 0 : result;
}
export function goNumberIntegerRemainder(left: number, right: number): number {
    if (right === 0) {
        GoPanic.raiseRuntime("integer divide by zero");
    }
    const result: number = left % right;
    return result === 0 ? 0 : result;
}
export function goInt64(value: bigint): bigint {
    return globalThis.BigInt.asIntN(64, value);
}
export function goUint64(value: bigint): bigint {
    return globalThis.BigInt.asUintN(64, value);
}
