import type { int32, uint8 } from "@gotots/runtime/scalars.js";
import { UsageDirectories$constant, UsageExclude$constant, UsageFiles$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/vfsmatch.js";
import { $state } from "./state.js";
import { GoArray } from "@gotots/runtime/array.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    UsageDirectories = UsageDirectories$constant();
    UsageExclude = UsageExclude$constant();
    UsageFiles = UsageFiles$constant();
    $state._Usage_index = GoArray.zero<uint8, 4>(4, 0);
    $state.wildcardCharCodes = RuntimeSlice.nil<int32>();
    {
        $state._Usage_index = GoArray.literal<uint8, 4>(4, 0, [0, 1, 2, 3], [0, 5, 16, 23]);
    }
    {
        $state.wildcardCharCodes = RuntimeSlice.literal<int32>([42, 63]);
    }
}
export { IsImplicitGlob, NewSpecMatcher, ReadDirectory, SpecMatcher, UnlimitedDepth$int, Usage, UsageDirectories$constant, UsageExclude$constant, UsageFiles$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/vfsmatch.js";
export let UsageDirectories: ReturnType<typeof UsageDirectories$constant>;
export let UsageExclude: ReturnType<typeof UsageExclude$constant>;
export let UsageFiles: ReturnType<typeof UsageFiles$constant>;
