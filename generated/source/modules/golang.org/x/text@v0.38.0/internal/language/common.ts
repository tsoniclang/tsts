import type { int8 } from "@gotots/runtime/scalars.js";
export type AliasType = int8;
export function Deprecated$constant(): AliasType {
    return 0;
}
export function Macro$constant(): AliasType {
    return 1;
}
export function Legacy$constant(): AliasType {
    return 2;
}
export function AliasTypeUnknown$constant(): AliasType {
    return -1;
}
