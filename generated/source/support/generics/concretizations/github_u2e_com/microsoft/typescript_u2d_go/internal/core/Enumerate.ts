import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import { Enumerate$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Enumerate$string($argument0: iter.Seq<gostring>): iter.Seq2<int, gostring> {
    return Enumerate$kernel<gostring>($argument0);
}
