import type { int } from "@gotots/runtime/scalars.js";
import type { Pointer } from "@tsonic/core/types.js";
import type { Checker } from "../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import {
  GetSourceFileOfNode,
  GetSymbolId,
  Node,
  Symbol,
} from "../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import * as strings from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { equalPointer, loadPointer } from "@tsonic/core/lang.js";

export function sortSymbols(
  checkerPointer: Pointer<Checker> | undefined,
  symbols: RuntimeSlice<Pointer<Symbol> | undefined>,
): void {
  const compare = loadPointer(
    checkerPointer ??
      GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"),
  ).compareSymbols;
  const selectedCompare =
    compare ?? GoPanic.raiseRuntime("call of nil function");
  const values = new Array<Pointer<Symbol> | undefined>(symbols.length);
  for (let index = 0; index < symbols.length; index++) {
    values[index] = symbols.get(index);
  }
  values.sort((left, right) => selectedCompare(left, right));
  for (let index = 0; index < values.length; index++) {
    symbols.set(index, values[index]);
  }
}

export function compareNodes(
  checkerPointer: Pointer<Checker> | undefined,
  leftPointer: Pointer<Node> | undefined,
  rightPointer: Pointer<Node> | undefined,
): int {
  if (equalPointer(leftPointer, rightPointer)) {
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
  if (!equalPointer(leftSource, rightSource)) {
    const checker = loadPointer(
      checkerPointer ??
        GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"),
    );
    return checker.fileIndexMap.lookup(leftSource) - checker.fileIndexMap.lookup(rightSource);
  }
  return Node.Pos(leftPointer) - Node.Pos(rightPointer);
}

export function compareSymbolsWorker(
  checkerPointer: Pointer<Checker> | undefined,
  leftPointer: Pointer<Symbol> | undefined,
  rightPointer: Pointer<Symbol> | undefined,
): int {
  if (equalPointer(leftPointer, rightPointer)) {
    return 0;
  }
  if (leftPointer === undefined) {
    return 1;
  }
  if (rightPointer === undefined) {
    return -1;
  }

  const left = loadPointer(leftPointer);
  const right = loadPointer(rightPointer);
  const leftDeclarations = left.Declarations;
  const rightDeclarations = right.Declarations;
  if (leftDeclarations.length !== 0 && rightDeclarations.length !== 0) {
    const result = compareNodes(
      checkerPointer,
      leftDeclarations.get(0),
      rightDeclarations.get(0),
    );
    if (result !== 0) {
      return result;
    }
  } else if (leftDeclarations.length !== 0) {
    return -1;
  } else if (rightDeclarations.length !== 0) {
    return 1;
  }

  const nameResult = globalThis.Number(
    BigInt.asIntN(64, strings.Compare(left.Name, right.Name)),
  );
  if (nameResult !== 0) {
    return nameResult;
  }
  return (
    globalThis.Number(BigInt.asIntN(64, GetSymbolId(leftPointer).$value)) -
    globalThis.Number(BigInt.asIntN(64, GetSymbolId(rightPointer).$value))
  );
}
