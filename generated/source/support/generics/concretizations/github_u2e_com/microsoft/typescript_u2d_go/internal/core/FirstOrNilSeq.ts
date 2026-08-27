import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { FirstOrNilSeq$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function FirstOrNilSeq$string($argument0: iter.Seq<gostring>): gostring {
    return FirstOrNilSeq$kernel<gostring>((): gostring => {
        return "";
    }, $argument0);
}
