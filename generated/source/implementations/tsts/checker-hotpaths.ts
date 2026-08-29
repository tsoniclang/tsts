import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { int } from "@gotots/runtime/scalars.js";
import type { Checker } from "../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import { GetSourceFileOfNode, GetSymbolId, Node, Symbol, } from "../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import * as strings from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function sortSymbols(checkerPointer: {
    value: Checker;
} | undefined, symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol> | undefined>): void {
    const compare = (checkerPointer ??
        GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compareSymbols;
    const selectedCompare = compare ?? GoPanic.raiseRuntime("call of nil function");
    const values = new Array<tsonicTypeScriptRuntime.Location<Symbol> | undefined>(symbols.length);
    for (let index = 0; index < symbols.length; index++) {
        values[index] = symbols.get(index);
    }
    values.sort((left, right) => selectedCompare(left, right));
    for (let index = 0; index < values.length; index++) {
        symbols.set(index, values[index]);
    }
}
export function compareNodes(checkerPointer: {
    value: Checker;
} | undefined, leftPointer: tsonicTypeScriptRuntime.Location<Node> | undefined, rightPointer: tsonicTypeScriptRuntime.Location<Node> | undefined): int {
    if (tsonicTypeScriptRuntime.sameLocation(leftPointer, rightPointer)) {
        return 0;
    }
    if (leftPointer === undefined) {
        return 1;
    }
    if (rightPointer === undefined) {
        return -1;
    }
    const leftSource = GetSourceFileOfNode(leftPointer);
    const rightSource = GetSourceFileOfNode(rightPointer);
    if (!tsonicTypeScriptRuntime.sameLocation(leftSource, rightSource)) {
        const checker = (checkerPointer ??
            GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return checker.fileIndexMap.lookup(leftSource) - checker.fileIndexMap.lookup(rightSource);
    }
    return Node.Pos(leftPointer) - Node.Pos(rightPointer);
}
export function compareSymbolsWorker(checkerPointer: {
    value: Checker;
} | undefined, leftPointer: tsonicTypeScriptRuntime.Location<Symbol> | undefined, rightPointer: tsonicTypeScriptRuntime.Location<Symbol> | undefined): int {
    if (tsonicTypeScriptRuntime.sameLocation(leftPointer, rightPointer)) {
        return 0;
    }
    if (leftPointer === undefined) {
        return 1;
    }
    if (rightPointer === undefined) {
        return -1;
    }
    const left = leftPointer.value;
    const right = rightPointer.value;
    const leftDeclarations = left.Declarations;
    const rightDeclarations = right.Declarations;
    if (leftDeclarations.length !== 0 && rightDeclarations.length !== 0) {
        const result = compareNodes(checkerPointer, leftDeclarations.get(0), rightDeclarations.get(0));
        if (result !== 0) {
            return result;
        }
    }
    else if (leftDeclarations.length !== 0) {
        return -1;
    }
    else if (rightDeclarations.length !== 0) {
        return 1;
    }
    const nameResult = globalThis.Number(BigInt.asIntN(64, strings.Compare(left.Name, right.Name)));
    if (nameResult !== 0) {
        return nameResult;
    }
    return (globalThis.Number(BigInt.asIntN(64, GetSymbolId(leftPointer).$value)) -
        globalThis.Number(BigInt.asIntN(64, GetSymbolId(rightPointer).$value)));
}
