import type { int } from "@gotots/runtime/scalars.js";
import { Compare$uint32 } from "../../../../../../../support/generics/concretizations/cmp/Compare.js";
import { Position, Range } from "./lsp_generated.js";
export function ComparePositions(pos: Position, other: Position): int {
    {
        let lineComp = Compare$uint32(Position.$storageOf(pos).Line, Position.$storageOf(other).Line);
        if (lineComp !== 0) {
            return lineComp;
        }
    }
    return Compare$uint32(Position.$storageOf(pos).Character, Position.$storageOf(other).Character);
}
export function CompareRanges(lsRange: Range, other: Range): int {
    {
        let startComp = ComparePositions(Position.$copy(Position.$fromStorage(Range.$storageOf(lsRange).Start)), Position.$copy(Position.$fromStorage(Range.$storageOf(other).Start)));
        if (startComp !== 0) {
            return startComp;
        }
    }
    return ComparePositions(Position.$copy(Position.$fromStorage(Range.$storageOf(lsRange).End)), Position.$copy(Position.$fromStorage(Range.$storageOf(other).End)));
}
