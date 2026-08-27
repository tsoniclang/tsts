import type { uint32 } from "@gotots/runtime/scalars.js";
export type ModifierFlags = uint32;
export function ModifierFlagsNone$constant(): ModifierFlags {
    return 0;
}
export function ModifierFlagsPublic$constant(): ModifierFlags {
    return 1;
}
export function ModifierFlagsPrivate$constant(): ModifierFlags {
    return 2;
}
export function ModifierFlagsProtected$constant(): ModifierFlags {
    return 4;
}
export function ModifierFlagsReadonly$constant(): ModifierFlags {
    return 8;
}
export function ModifierFlagsOverride$constant(): ModifierFlags {
    return 16;
}
export function ModifierFlagsExport$constant(): ModifierFlags {
    return 32;
}
export function ModifierFlagsAbstract$constant(): ModifierFlags {
    return 64;
}
export function ModifierFlagsAmbient$constant(): ModifierFlags {
    return 128;
}
export function ModifierFlagsStatic$constant(): ModifierFlags {
    return 256;
}
export function ModifierFlagsAccessor$constant(): ModifierFlags {
    return 512;
}
export function ModifierFlagsAsync$constant(): ModifierFlags {
    return 1024;
}
export function ModifierFlagsDefault$constant(): ModifierFlags {
    return 2048;
}
export function ModifierFlagsConst$constant(): ModifierFlags {
    return 4096;
}
export function ModifierFlagsIn$constant(): ModifierFlags {
    return 8192;
}
export function ModifierFlagsOut$constant(): ModifierFlags {
    return 16384;
}
export function ModifierFlagsDecorator$constant(): ModifierFlags {
    return 32768;
}
export function ModifierFlagsDeprecated$constant(): ModifierFlags {
    return 65536;
}
export function ModifierFlagsAccessibilityModifier$constant(): ModifierFlags {
    return 7;
}
export function ModifierFlagsParameterPropertyModifier$constant(): ModifierFlags {
    return 31;
}
export function ModifierFlagsNonPublicAccessibilityModifier$constant(): ModifierFlags {
    return 6;
}
export function ModifierFlagsExportDefault$constant(): ModifierFlags {
    return 2080;
}
export function ModifierFlagsAll$constant(): ModifierFlags {
    return 131071;
}
export function ModifierFlagsModifier$constant(): ModifierFlags {
    return 98303;
}
export function ModifierFlagsJavaScript$constant(): ModifierFlags {
    return 3872;
}
