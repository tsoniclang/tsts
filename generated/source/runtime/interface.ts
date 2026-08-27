import { GoInterfaceValue } from "./interface-value.js";
import { GoPanic } from "./panic.js";
export function goInterfaceNonNil<T extends GoInterfaceValue>(value: T | undefined): T {
    if (value === undefined) {
        GoPanic.raiseRuntime("runtime error: invalid memory address or nil pointer dereference");
    }
    return value;
}
export function goInterfaceEqual(left: GoInterfaceValue | undefined, right: GoInterfaceValue | undefined): boolean {
    return left === undefined ? right === undefined : right !== undefined && left.$go$equal(right);
}
export class GoInterfaceFormat {
    static formatOther(typeName: string, verb: string): string {
        if (verb === "T") {
            return typeName;
        }
        return GoPanic.raiseRuntime("unsupported fmt verb for " + typeName);
    }
    static formatBoolean(value: boolean, typeName: string, verb: string): string {
        if (verb === "T") {
            return typeName;
        }
        if (verb === "v" || verb === "t") {
            return value ? "true" : "false";
        }
        return GoPanic.raiseRuntime("unsupported fmt verb for " + typeName);
    }
    static formatString(value: string, precision: number | undefined, typeName: string, verb: string): string {
        if (verb === "T") {
            return typeName;
        }
        if (verb === "v" || verb === "s") {
            return precision === undefined ? value : value.slice(0, precision);
        }
        if (verb === "q") {
            return JSON.stringify(precision === undefined ? value : value.slice(0, precision));
        }
        return GoPanic.raiseRuntime("unsupported fmt verb for " + typeName);
    }
    static formatInteger(value: number | bigint, typeName: string, verb: string): string {
        if (verb === "T") {
            return typeName;
        }
        if (verb === "v" || verb === "d") {
            return value.toString(10);
        }
        if (verb === "x") {
            return value.toString(16);
        }
        if (verb === "X") {
            return value.toString(16).toUpperCase();
        }
        if (verb === "c") {
            return String.fromCodePoint(Number(value));
        }
        if (verb === "q") {
            return "'" + JSON.stringify(String.fromCodePoint(Number(value))).slice(1, -1) + "'";
        }
        return GoPanic.raiseRuntime("unsupported fmt verb for " + typeName);
    }
    static formatFloat(value: number, precision: number | undefined, typeName: string, verb: string): string {
        if (verb === "T") {
            return typeName;
        }
        if (verb === "v" || verb === "g") {
            return value.toString();
        }
        if (verb === "f") {
            return precision === undefined ? value.toString() : value.toFixed(precision);
        }
        if (verb === "e") {
            return precision === undefined ? value.toExponential() : value.toExponential(precision);
        }
        if (verb === "E") {
            return (precision === undefined ? value.toExponential() : value.toExponential(precision)).toUpperCase();
        }
        return GoPanic.raiseRuntime("unsupported fmt verb for " + typeName);
    }
    declare private readonly then?: never;
}
