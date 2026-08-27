import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast, SymbolFlags as SymbolFlags__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int32, uint32 } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$PopErrorFallbackNode$void_to_void, $goInterfaceMethod$PushErrorFallbackNode$PointerTo_Named_ast$Node_to_void, $goInterfaceMethod$ReportCyclicStructureError$void_to_void, $goInterfaceMethod$ReportInaccessibleThisError$void_to_void, $goInterfaceMethod$ReportInaccessibleUniqueSymbolError$void_to_void, $goInterfaceMethod$ReportInferenceFallback$PointerTo_Named_ast$Node_to_void, $goInterfaceMethod$ReportLikelyUnsafeImportRequiredError$string_string_to_void, $goInterfaceMethod$ReportNonSerializableProperty$string_to_void, $goInterfaceMethod$ReportNonlocalAugmentation$PointerTo_Named_ast$SourceFile_PointerTo_Named_ast$Symbol_PointerTo_Named_ast$Symbol_to_void, $goInterfaceMethod$ReportPrivateInBaseOfClassExpression$string_to_void, $goInterfaceMethod$ReportTruncationError$void_to_void, $goInterfaceMethod$TrackSymbol$PointerTo_Named_ast$Symbol_PointerTo_Named_ast$Node_Named_ast$SymbolFlags_to_bool } from "../../../../../../support/interface-methods.js";
export interface SymbolTracker extends GoInterfaceValue {
    PopErrorFallbackNode(): void;
    PushErrorFallbackNode($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void;
    ReportCyclicStructureError(): void;
    ReportInaccessibleThisError(): void;
    ReportInaccessibleUniqueSymbolError(): void;
    ReportInferenceFallback($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void;
    ReportLikelyUnsafeImportRequiredError($argument0: gostring, $argument1: gostring): void;
    ReportNonSerializableProperty($argument0: gostring): void;
    ReportNonlocalAugmentation($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void;
    ReportPrivateInBaseOfClassExpression($argument0: gostring): void;
    ReportTruncationError(): void;
    TrackSymbol($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: SymbolFlags__from_ast): bool;
}
export const SymbolTracker$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$PopErrorFallbackNode$void_to_void, $goInterfaceMethod$PushErrorFallbackNode$PointerTo_Named_ast$Node_to_void, $goInterfaceMethod$ReportCyclicStructureError$void_to_void, $goInterfaceMethod$ReportInaccessibleThisError$void_to_void, $goInterfaceMethod$ReportInaccessibleUniqueSymbolError$void_to_void, $goInterfaceMethod$ReportInferenceFallback$PointerTo_Named_ast$Node_to_void, $goInterfaceMethod$ReportLikelyUnsafeImportRequiredError$string_string_to_void, $goInterfaceMethod$ReportNonSerializableProperty$string_to_void, $goInterfaceMethod$ReportNonlocalAugmentation$PointerTo_Named_ast$SourceFile_PointerTo_Named_ast$Symbol_PointerTo_Named_ast$Symbol_to_void, $goInterfaceMethod$ReportPrivateInBaseOfClassExpression$string_to_void, $goInterfaceMethod$ReportTruncationError$void_to_void, $goInterfaceMethod$TrackSymbol$PointerTo_Named_ast$Symbol_PointerTo_Named_ast$Node_Named_ast$SymbolFlags_to_bool]);
export function SymbolTracker$is(value: GoInterfaceValue | undefined): value is SymbolTracker {
    return value !== undefined && value.$go$implements(SymbolTracker$contract);
}
export type Flags = uint32;
export function FlagsNone$constant(): Flags {
    return 0;
}
export function FlagsNoTruncation$constant(): Flags {
    return 1;
}
export function FlagsWriteArrayAsGenericType$constant(): Flags {
    return 2;
}
export function FlagsGenerateNamesForShadowedTypeParams$constant(): Flags {
    return 4;
}
export function FlagsUseStructuralFallback$constant(): Flags {
    return 8;
}
export function FlagsForbidIndexedAccessSymbolReferences$constant(): Flags {
    return 16;
}
export function FlagsWriteTypeArgumentsOfSignature$constant(): Flags {
    return 32;
}
export function FlagsUseFullyQualifiedType$constant(): Flags {
    return 64;
}
export function FlagsUseOnlyExternalAliasing$constant(): Flags {
    return 128;
}
export function FlagsSuppressAnyReturnType$constant(): Flags {
    return 256;
}
export function FlagsWriteTypeParametersInQualifiedName$constant(): Flags {
    return 512;
}
export function FlagsMultilineObjectLiterals$constant(): Flags {
    return 1024;
}
export function FlagsWriteClassExpressionAsTypeLiteral$constant(): Flags {
    return 2048;
}
export function FlagsUseTypeOfFunction$constant(): Flags {
    return 4096;
}
export function FlagsOmitParameterModifiers$constant(): Flags {
    return 8192;
}
export function FlagsUseAliasDefinedOutsideCurrentScope$constant(): Flags {
    return 16384;
}
export function FlagsUseSingleQuotesForStringLiteralType$constant(): Flags {
    return 268435456;
}
export function FlagsNoTypeReduction$constant(): Flags {
    return 536870912;
}
export function FlagsUseInstantiationExpressions$constant(): Flags {
    return 1073741824;
}
export function FlagsOmitThisParameter$constant(): Flags {
    return 33554432;
}
export function FlagsAllowThisInObjectLiteral$constant(): Flags {
    return 32768;
}
export function FlagsAllowQualifiedNameInPlaceOfIdentifier$constant(): Flags {
    return 65536;
}
export function FlagsAllowAnonymousIdentifier$constant(): Flags {
    return 131072;
}
export function FlagsAllowEmptyUnionOrIntersection$constant(): Flags {
    return 262144;
}
export function FlagsAllowEmptyTuple$constant(): Flags {
    return 524288;
}
export function FlagsAllowUniqueESSymbolType$constant(): Flags {
    return 1048576;
}
export function FlagsAllowEmptyIndexInfoType$constant(): Flags {
    return 2097152;
}
export function FlagsAllowNodeModulesRelativePaths$constant(): Flags {
    return 67108864;
}
export function FlagsIgnoreErrors$constant(): Flags {
    return 70221824;
}
export function FlagsInObjectTypeLiteral$constant(): Flags {
    return 4194304;
}
export function FlagsInTypeAlias$constant(): Flags {
    return 8388608;
}
export function FlagsInInitialEntityName$constant(): Flags {
    return 16777216;
}
export type InternalFlags = int32;
export function InternalFlagsNone$constant(): InternalFlags {
    return 0;
}
export function InternalFlagsWriteComputedProps$constant(): InternalFlags {
    return 1;
}
export function InternalFlagsDoNotIncludeSymbolChain$constant(): InternalFlags {
    return 4;
}
export function InternalFlagsAllowUnresolvedNames$constant(): InternalFlags {
    return 8;
}
