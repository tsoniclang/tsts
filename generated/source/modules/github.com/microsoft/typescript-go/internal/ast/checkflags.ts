import type { uint32 } from "@gotots/runtime/scalars.js";
export type CheckFlags = uint32;
export function CheckFlagsInstantiated$constant(): CheckFlags {
    return 1;
}
export function CheckFlagsSyntheticProperty$constant(): CheckFlags {
    return 2;
}
export function CheckFlagsSyntheticMethod$constant(): CheckFlags {
    return 4;
}
export function CheckFlagsReadonly$constant(): CheckFlags {
    return 8;
}
export function CheckFlagsReadPartial$constant(): CheckFlags {
    return 16;
}
export function CheckFlagsWritePartial$constant(): CheckFlags {
    return 32;
}
export function CheckFlagsHasNonUniformType$constant(): CheckFlags {
    return 64;
}
export function CheckFlagsHasLiteralType$constant(): CheckFlags {
    return 128;
}
export function CheckFlagsContainsPublic$constant(): CheckFlags {
    return 256;
}
export function CheckFlagsContainsProtected$constant(): CheckFlags {
    return 512;
}
export function CheckFlagsContainsPrivate$constant(): CheckFlags {
    return 1024;
}
export function CheckFlagsContainsStatic$constant(): CheckFlags {
    return 2048;
}
export function CheckFlagsLate$constant(): CheckFlags {
    return 4096;
}
export function CheckFlagsReverseMapped$constant(): CheckFlags {
    return 8192;
}
export function CheckFlagsOptionalParameter$constant(): CheckFlags {
    return 16384;
}
export function CheckFlagsRestParameter$constant(): CheckFlags {
    return 32768;
}
export function CheckFlagsDeferredType$constant(): CheckFlags {
    return 65536;
}
export function CheckFlagsHasNeverType$constant(): CheckFlags {
    return 131072;
}
export function CheckFlagsMapped$constant(): CheckFlags {
    return 262144;
}
export function CheckFlagsStripOptional$constant(): CheckFlags {
    return 524288;
}
export function CheckFlagsUnresolved$constant(): CheckFlags {
    return 1048576;
}
export function CheckFlagsIsDiscriminantComputed$constant(): CheckFlags {
    return 2097152;
}
export function CheckFlagsIsDiscriminant$constant(): CheckFlags {
    return 4194304;
}
export function CheckFlagsIndexSymbol$constant(): CheckFlags {
    return 8388608;
}
export function CheckFlagsSynthetic$constant(): CheckFlags {
    return 6;
}
export function CheckFlagsNonUniformAndLiteral$constant(): CheckFlags {
    return 192;
}
export function CheckFlagsPartial$constant(): CheckFlags {
    return 48;
}
