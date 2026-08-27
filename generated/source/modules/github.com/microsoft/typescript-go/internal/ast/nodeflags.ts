import type { uint32 } from "@gotots/runtime/scalars.js";
export type NodeFlags = uint32;
export function NodeFlagsNone$constant(): NodeFlags {
    return 0;
}
export function NodeFlagsLet$constant(): NodeFlags {
    return 1;
}
export function NodeFlagsConst$constant(): NodeFlags {
    return 2;
}
export function NodeFlagsUsing$constant(): NodeFlags {
    return 4;
}
export function NodeFlagsReparsed$constant(): NodeFlags {
    return 8;
}
export function NodeFlagsSynthesized$constant(): NodeFlags {
    return 16;
}
export function NodeFlagsOptionalChain$constant(): NodeFlags {
    return 32;
}
export function NodeFlagsExportContext$constant(): NodeFlags {
    return 64;
}
export function NodeFlagsContainsThis$constant(): NodeFlags {
    return 128;
}
export function NodeFlagsHasImplicitReturn$constant(): NodeFlags {
    return 256;
}
export function NodeFlagsHasExplicitReturn$constant(): NodeFlags {
    return 512;
}
export function NodeFlagsDisallowInContext$constant(): NodeFlags {
    return 1024;
}
export function NodeFlagsYieldContext$constant(): NodeFlags {
    return 2048;
}
export function NodeFlagsDecoratorContext$constant(): NodeFlags {
    return 4096;
}
export function NodeFlagsAwaitContext$constant(): NodeFlags {
    return 8192;
}
export function NodeFlagsDisallowConditionalTypesContext$constant(): NodeFlags {
    return 16384;
}
export function NodeFlagsThisNodeHasError$constant(): NodeFlags {
    return 32768;
}
export function NodeFlagsJavaScriptFile$constant(): NodeFlags {
    return 65536;
}
export function NodeFlagsThisNodeOrAnySubNodesHasError$constant(): NodeFlags {
    return 131072;
}
export function NodeFlagsHasAsyncFunctions$constant(): NodeFlags {
    return 262144;
}
export function NodeFlagsPossiblyContainsDynamicImport$constant(): NodeFlags {
    return 524288;
}
export function NodeFlagsPossiblyContainsImportMeta$constant(): NodeFlags {
    return 1048576;
}
export function NodeFlagsHasJSDoc$constant(): NodeFlags {
    return 2097152;
}
export function NodeFlagsJSDoc$constant(): NodeFlags {
    return 4194304;
}
export function NodeFlagsAmbient$constant(): NodeFlags {
    return 8388608;
}
export function NodeFlagsInWithStatement$constant(): NodeFlags {
    return 16777216;
}
export function NodeFlagsJsonFile$constant(): NodeFlags {
    return 33554432;
}
export function NodeFlagsPossiblyContainsDeprecatedTag$constant(): NodeFlags {
    return 67108864;
}
export function NodeFlagsUnreachable$constant(): NodeFlags {
    return 134217728;
}
export function NodeFlagsReparserTransformedLiteral$constant(): NodeFlags {
    return 268435456;
}
export function NodeFlagsBlockScoped$constant(): NodeFlags {
    return 7;
}
export function NodeFlagsConstant$constant(): NodeFlags {
    return 6;
}
export function NodeFlagsAwaitUsing$constant(): NodeFlags {
    return 6;
}
export function NodeFlagsTypeExcludesFlags$constant(): NodeFlags {
    return 10240;
}
export function NodeFlagsIdentifierIsInJSDocNamespace$constant(): NodeFlags {
    return 262144;
}
export function NodeFlagsNestedNamespace$constant(): NodeFlags {
    return 32;
}
