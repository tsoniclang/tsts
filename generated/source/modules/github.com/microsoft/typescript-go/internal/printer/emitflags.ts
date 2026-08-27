import type { uint32 } from "@gotots/runtime/scalars.js";
export type EmitFlags = uint32;
export function EFSingleLine$constant(): EmitFlags {
    return 1;
}
export function EFMultiLine$constant(): EmitFlags {
    return 2;
}
export function EFNoLeadingSourceMap$constant(): EmitFlags {
    return 4;
}
export function EFNoTrailingSourceMap$constant(): EmitFlags {
    return 8;
}
export function EFNoNestedSourceMaps$constant(): EmitFlags {
    return 16;
}
export function EFNoTokenLeadingSourceMaps$constant(): EmitFlags {
    return 32;
}
export function EFNoTokenTrailingSourceMaps$constant(): EmitFlags {
    return 64;
}
export function EFNoLeadingComments$constant(): EmitFlags {
    return 128;
}
export function EFNoTrailingComments$constant(): EmitFlags {
    return 256;
}
export function EFNoNestedComments$constant(): EmitFlags {
    return 512;
}
export function EFHelperName$constant(): EmitFlags {
    return 1024;
}
export function EFExportName$constant(): EmitFlags {
    return 2048;
}
export function EFLocalName$constant(): EmitFlags {
    return 4096;
}
export function EFIndented$constant(): EmitFlags {
    return 8192;
}
export function EFNoIndentation$constant(): EmitFlags {
    return 16384;
}
export function EFReuseTempVariableScope$constant(): EmitFlags {
    return 32768;
}
export function EFCustomPrologue$constant(): EmitFlags {
    return 65536;
}
export function EFNoAsciiEscaping$constant(): EmitFlags {
    return 131072;
}
export function EFExternalHelpers$constant(): EmitFlags {
    return 262144;
}
export function EFStartOnNewLine$constant(): EmitFlags {
    return 524288;
}
export function EFIndirectCall$constant(): EmitFlags {
    return 1048576;
}
export function EFNoLexicalArguments$constant(): EmitFlags {
    return 4194304;
}
export function EFTransformPrivateStaticElements$constant(): EmitFlags {
    return 8388608;
}
export function EFNoLexicalThis$constant(): EmitFlags {
    return 16777216;
}
export function EFNone$constant(): EmitFlags {
    return 0;
}
export function EFNoSourceMap$constant(): EmitFlags {
    return 12;
}
export function EFNoComments$constant(): EmitFlags {
    return 384;
}
