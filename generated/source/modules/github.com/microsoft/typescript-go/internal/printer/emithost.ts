import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { EmitResolver } from "./emitresolver.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetEmitModuleFormatOfFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEmitResolver$void_to_Named_printer$EmitResolver, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$IsEmitBlocked$string_to_bool, $goInterfaceMethod$IsSourceFileFromExternalLibrary$PointerTo_Named_ast$SourceFile_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$SourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool, $goInterfaceMethod$WriteFile$string_string_to_Named_error } from "../../../../../../support/interface-methods.js";
export interface EmitHost extends GoInterfaceValue {
    CommonSourceDirectory(): gostring;
    GetCurrentDirectory(): gostring;
    GetEmitModuleFormatOfFile($argument0: HasFileName__from_ast | undefined): ModuleKind__from_core;
    GetEmitResolver(): EmitResolver | undefined;
    GetProjectReferenceFromSource($argument0: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined;
    IsEmitBlocked($argument0: gostring): bool;
    IsSourceFileFromExternalLibrary($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool;
    Options(): {
        value: CompilerOptions__from_core;
    } | undefined;
    SourceFiles(): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    UseCaseSensitiveFileNames(): bool;
    WriteFile($argument0: gostring, $argument1: gostring): GoInterface | undefined;
}
export const EmitHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetEmitModuleFormatOfFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEmitResolver$void_to_Named_printer$EmitResolver, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$IsEmitBlocked$string_to_bool, $goInterfaceMethod$IsSourceFileFromExternalLibrary$PointerTo_Named_ast$SourceFile_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$SourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool, $goInterfaceMethod$WriteFile$string_string_to_Named_error]);
export function EmitHost$is(value: GoInterfaceValue | undefined): value is EmitHost {
    return value !== undefined && value.$go$implements(EmitHost$contract);
}
