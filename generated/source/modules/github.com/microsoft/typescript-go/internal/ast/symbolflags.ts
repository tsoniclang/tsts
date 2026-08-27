import type { uint32 } from "@gotots/runtime/scalars.js";
export type SymbolFlags = uint32;
export function SymbolFlagsNone$constant(): SymbolFlags {
    return 0;
}
export function SymbolFlagsFunctionScopedVariable$constant(): SymbolFlags {
    return 1;
}
export function SymbolFlagsBlockScopedVariable$constant(): SymbolFlags {
    return 2;
}
export function SymbolFlagsProperty$constant(): SymbolFlags {
    return 4;
}
export function SymbolFlagsEnumMember$constant(): SymbolFlags {
    return 8;
}
export function SymbolFlagsFunction$constant(): SymbolFlags {
    return 16;
}
export function SymbolFlagsClass$constant(): SymbolFlags {
    return 32;
}
export function SymbolFlagsInterface$constant(): SymbolFlags {
    return 64;
}
export function SymbolFlagsConstEnum$constant(): SymbolFlags {
    return 128;
}
export function SymbolFlagsRegularEnum$constant(): SymbolFlags {
    return 256;
}
export function SymbolFlagsValueModule$constant(): SymbolFlags {
    return 512;
}
export function SymbolFlagsNamespaceModule$constant(): SymbolFlags {
    return 1024;
}
export function SymbolFlagsTypeLiteral$constant(): SymbolFlags {
    return 2048;
}
export function SymbolFlagsObjectLiteral$constant(): SymbolFlags {
    return 4096;
}
export function SymbolFlagsMethod$constant(): SymbolFlags {
    return 8192;
}
export function SymbolFlagsConstructor$constant(): SymbolFlags {
    return 16384;
}
export function SymbolFlagsGetAccessor$constant(): SymbolFlags {
    return 32768;
}
export function SymbolFlagsSetAccessor$constant(): SymbolFlags {
    return 65536;
}
export function SymbolFlagsSignature$constant(): SymbolFlags {
    return 131072;
}
export function SymbolFlagsTypeParameter$constant(): SymbolFlags {
    return 262144;
}
export function SymbolFlagsTypeAlias$constant(): SymbolFlags {
    return 524288;
}
export function SymbolFlagsExportValue$constant(): SymbolFlags {
    return 1048576;
}
export function SymbolFlagsAlias$constant(): SymbolFlags {
    return 2097152;
}
export function SymbolFlagsPrototype$constant(): SymbolFlags {
    return 4194304;
}
export function SymbolFlagsExportStar$constant(): SymbolFlags {
    return 8388608;
}
export function SymbolFlagsOptional$constant(): SymbolFlags {
    return 16777216;
}
export function SymbolFlagsTransient$constant(): SymbolFlags {
    return 33554432;
}
export function SymbolFlagsAssignment$constant(): SymbolFlags {
    return 67108864;
}
export function SymbolFlagsModuleExports$constant(): SymbolFlags {
    return 134217728;
}
export function SymbolFlagsConstEnumOnlyModule$constant(): SymbolFlags {
    return 268435456;
}
export function SymbolFlagsReplaceableByMethod$constant(): SymbolFlags {
    return 536870912;
}
export function SymbolFlagsGlobalLookup$constant(): SymbolFlags {
    return 1073741824;
}
export function SymbolFlagsAll$constant(): SymbolFlags {
    return 1073741823;
}
export function SymbolFlagsEnum$constant(): SymbolFlags {
    return 384;
}
export function SymbolFlagsVariable$constant(): SymbolFlags {
    return 3;
}
export function SymbolFlagsValue$constant(): SymbolFlags {
    return 111551;
}
export function SymbolFlagsType$constant(): SymbolFlags {
    return 788968;
}
export function SymbolFlagsNamespace$constant(): SymbolFlags {
    return 1920;
}
export function SymbolFlagsModule$constant(): SymbolFlags {
    return 1536;
}
export function SymbolFlagsAccessor$constant(): SymbolFlags {
    return 98304;
}
export function SymbolFlagsFunctionScopedVariableExcludes$constant(): SymbolFlags {
    return 111550;
}
export function SymbolFlagsBlockScopedVariableExcludes$constant(): SymbolFlags {
    return 111551;
}
export function SymbolFlagsParameterExcludes$constant(): SymbolFlags {
    return 111551;
}
export function SymbolFlagsPropertyExcludes$constant(): SymbolFlags {
    return 13243;
}
export function SymbolFlagsEnumMemberExcludes$constant(): SymbolFlags {
    return 900095;
}
export function SymbolFlagsFunctionExcludes$constant(): SymbolFlags {
    return 110991;
}
export function SymbolFlagsClassExcludes$constant(): SymbolFlags {
    return 899503;
}
export function SymbolFlagsInterfaceExcludes$constant(): SymbolFlags {
    return 788872;
}
export function SymbolFlagsRegularEnumExcludes$constant(): SymbolFlags {
    return 899327;
}
export function SymbolFlagsConstEnumExcludes$constant(): SymbolFlags {
    return 899967;
}
export function SymbolFlagsValueModuleExcludes$constant(): SymbolFlags {
    return 110735;
}
export function SymbolFlagsNamespaceModuleExcludes$constant(): SymbolFlags {
    return 0;
}
export function SymbolFlagsMethodExcludes$constant(): SymbolFlags {
    return 103359;
}
export function SymbolFlagsGetAccessorExcludes$constant(): SymbolFlags {
    return 46011;
}
export function SymbolFlagsSetAccessorExcludes$constant(): SymbolFlags {
    return 78779;
}
export function SymbolFlagsAccessorExcludes$constant(): SymbolFlags {
    return 111547;
}
export function SymbolFlagsTypeParameterExcludes$constant(): SymbolFlags {
    return 526824;
}
export function SymbolFlagsTypeAliasExcludes$constant(): SymbolFlags {
    return 788968;
}
export function SymbolFlagsAliasExcludes$constant(): SymbolFlags {
    return 2097152;
}
export function SymbolFlagsModuleMember$constant(): SymbolFlags {
    return 2623475;
}
export function SymbolFlagsExportHasLocal$constant(): SymbolFlags {
    return 944;
}
export function SymbolFlagsBlockScoped$constant(): SymbolFlags {
    return 418;
}
export function SymbolFlagsPropertyOrAccessor$constant(): SymbolFlags {
    return 98308;
}
export function SymbolFlagsClassMember$constant(): SymbolFlags {
    return 106500;
}
export function SymbolFlagsClassifiable$constant(): SymbolFlags {
    return 2885600;
}
export function SymbolFlagsLateBindingContainer$constant(): SymbolFlags {
    return 6256;
}
