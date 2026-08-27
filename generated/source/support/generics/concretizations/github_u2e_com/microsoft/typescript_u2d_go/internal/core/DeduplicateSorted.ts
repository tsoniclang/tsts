import type { MappedPosition as MappedPosition__from_sourcemap } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/sourcemap/source_mapper.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { DeduplicateSorted$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function DeduplicateSorted$PointerTo_Named_sourcemap$MappedPosition($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>, $argument1: (($0: MappedPosition__from_sourcemap | undefined, $1: MappedPosition__from_sourcemap | undefined) => bool) | undefined): RuntimeSlice<MappedPosition__from_sourcemap | undefined> {
    return DeduplicateSorted$kernel<MappedPosition__from_sourcemap | undefined>(($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>, $argument1: int): MappedPosition__from_sourcemap | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<MappedPosition__from_sourcemap | undefined>): int => {
        return $argument0.length;
    }, ($argument0: MappedPosition__from_sourcemap | undefined): MappedPosition__from_sourcemap | undefined => {
        return $argument0;
    }, (): MappedPosition__from_sourcemap | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
