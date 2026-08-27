import type { uint32 } from "@gotots/runtime/scalars.js";
export type ParseFlags = uint32;
export function ParseFlagsNone$constant(): ParseFlags {
    return 0;
}
export function ParseFlagsYield$constant(): ParseFlags {
    return 1;
}
export function ParseFlagsAwait$constant(): ParseFlags {
    return 2;
}
export function ParseFlagsType$constant(): ParseFlags {
    return 4;
}
export function ParseFlagsIgnoreMissingOpenBrace$constant(): ParseFlags {
    return 16;
}
