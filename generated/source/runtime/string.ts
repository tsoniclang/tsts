import { GoPanic } from "./panic.js";
export function goStringIndex(value: string, index: number | bigint): number {
    const offset = globalThis.Number(index);
    if (!globalThis.Number.isSafeInteger(offset) || (offset < 0 || offset >= value.length)) {
        GoPanic.raiseRuntime("Go string index out of range");
    }
    return value.charCodeAt(offset);
}
export function goStringSlice(value: string, low: number | bigint, high?: number | bigint): string {
    const start = globalThis.Number(low);
    const end = high === undefined ? value.length : globalThis.Number(high);
    if (!globalThis.Number.isSafeInteger(start) || (!globalThis.Number.isSafeInteger(end) || (start < 0 || (start > end || end > value.length)))) {
        GoPanic.raiseRuntime("Go string slice bounds out of range");
    }
    return value.slice(start, end);
}
export function goStringEncodeRune(input: number | bigint): string {
    let runeValue = globalThis.Number(input);
    if (!globalThis.Number.isInteger(runeValue) || (runeValue < 0 || (runeValue > 1114111 || runeValue >= 55296 && runeValue <= 57343))) {
        runeValue = 65533;
    }
    if (runeValue <= 127) {
        return globalThis.String.fromCharCode(runeValue);
    }
    if (runeValue <= 2047) {
        return globalThis.String.fromCharCode(192 | runeValue >> 6, 128 | runeValue & 63);
    }
    if (runeValue <= 65535) {
        return globalThis.String.fromCharCode(224 | runeValue >> 12, 128 | runeValue >> 6 & 63, 128 | runeValue & 63);
    }
    return globalThis.String.fromCharCode(240 | runeValue >> 18, 128 | runeValue >> 12 & 63, 128 | runeValue >> 6 & 63, 128 | runeValue & 63);
}
export function goStringDecodeRune(value: string, input: number | bigint): [
    number,
    number
] {
    const index = globalThis.Number(input);
    const first = value.charCodeAt(index);
    if (first < 128) {
        return [first, 1];
    }
    if (first < 194 || first > 244) {
        return [65533, 1];
    }
    const width = first < 224 ? 2 : first < 240 ? 3 : 4;
    if (index + width > value.length) {
        return [65533, 1];
    }
    const second = value.charCodeAt(index + 1);
    if (second < 128 || second > 191) {
        return [65533, 1];
    }
    if (first === 224 && second < 160 || (first === 237 && second > 159 || (first === 240 && second < 144 || first === 244 && second > 143))) {
        return [65533, 1];
    }
    let result = (first & (width === 2 ? 31 : width === 3 ? 15 : 7)) << 6;
    result = result | second & 63;
    if (width === 2) {
        return [result, width];
    }
    const third = value.charCodeAt(index + 2);
    if (third < 128 || third > 191) {
        return [65533, 1];
    }
    result = result << 6 | third & 63;
    if (width === 3) {
        return [result, width];
    }
    const fourth = value.charCodeAt(index + 3);
    if (fourth < 128 || fourth > 191) {
        return [65533, 1];
    }
    result = result << 6 | fourth & 63;
    return [result, width];
}
