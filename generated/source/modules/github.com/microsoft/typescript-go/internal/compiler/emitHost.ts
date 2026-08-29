import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FileReference as FileReference__from_ast, HasFileName as HasFileName__from_ast, ModifierFlags as ModifierFlags__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import type { OutputPaths as OutputPaths__from_declarations } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/declarations/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CompilerHost } from "./host.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Checker as Checker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { GetOutputPathsFor as GetOutputPathsFor__from_outputpaths } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$emitHost, $goInterfaceAdapter$PointerTo_Named_outputpaths$OutputPaths, $goInterfaceAdapter$PointerTo_Named_checker$EmitResolver as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultResolutionModeForFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEffectiveDeclarationFlags$PointerTo_Named_ast$Node_Named_ast$ModifierFlags_to_Named_ast$ModifierFlags, $goInterfaceMethod$GetEmitModuleFormatOfFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEmitResolver$void_to_Named_printer$EmitResolver, $goInterfaceMethod$GetGlobalTypingsCacheLocation$void_to_string, $goInterfaceMethod$GetModeForUsageLocation$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetNearestAncestorDirectoryWithPackageJson$string_to_string, $goInterfaceMethod$GetOutputPathsFor$PointerTo_Named_ast$SourceFile_bool_to_Named_declarations$OutputPaths, $goInterfaceMethod$GetPackageJsonInfo$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$GetRedirectTargets$Named_tspath$Path_to_SliceOf_string, $goInterfaceMethod$GetResolutionModeOverride$PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetResolvedModuleFromModuleSpecifier$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_PointerTo_Named___go_module$ResolvedModule, $goInterfaceMethod$GetSourceFileFromReference$PointerTo_Named_ast$SourceFile_PointerTo_Named_ast$FileReference_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSourceOfProjectReferenceIfOutputIncluded$Named_ast$HasFileName_to_string, $goInterfaceMethod$GetSymlinkCache$void_to_PointerTo_Named_symlinks$KnownSymlinks, $goInterfaceMethod$IsEmitBlocked$string_to_bool, $goInterfaceMethod$IsSourceFileFromExternalLibrary$PointerTo_Named_ast$SourceFile_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$SourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool, $goInterfaceMethod$WriteFile$string_string_to_Named_error } from "../../../../../../support/interface-methods.js";
import { Program } from "./program.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export interface EmitHost extends GoInterfaceValue {
    CommonSourceDirectory(): gostring;
    FileExists($argument0: gostring): bool;
    GetCurrentDirectory(): gostring;
    GetDefaultResolutionModeForFile($argument0: HasFileName__from_ast | undefined): ModuleKind__from_core;
    GetEffectiveDeclarationFlags($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: ModifierFlags__from_ast): ModifierFlags__from_ast;
    GetEmitModuleFormatOfFile($argument0: HasFileName__from_ast | undefined): ModuleKind__from_core;
    GetEmitResolver(): EmitResolver__from_printer | undefined;
    GetGlobalTypingsCacheLocation(): gostring;
    GetModeForUsageLocation($argument0: HasFileName__from_ast | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core;
    GetNearestAncestorDirectoryWithPackageJson($argument0: gostring): gostring;
    GetOutputPathsFor($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: bool): OutputPaths__from_declarations | undefined;
    GetPackageJsonInfo($argument0: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined;
    GetProjectReferenceFromSource($argument0: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined;
    GetRedirectTargets($argument0: Path__from_tspath): RuntimeSlice<gostring>;
    GetResolutionModeOverride($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core;
    GetResolvedModuleFromModuleSpecifier($argument0: HasFileName__from_ast | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined;
    GetSourceFileFromReference($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: {
        value: FileReference__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    GetSourceOfProjectReferenceIfOutputIncluded($argument0: HasFileName__from_ast | undefined): gostring;
    GetSymlinkCache(): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined;
    IsEmitBlocked($argument0: gostring): bool;
    IsSourceFileFromExternalLibrary($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool;
    Options(): {
        value: CompilerOptions__from_core;
    } | undefined;
    SourceFiles(): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    UseCaseSensitiveFileNames(): bool;
    WriteFile($argument0: gostring, $argument1: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const EmitHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultResolutionModeForFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEffectiveDeclarationFlags$PointerTo_Named_ast$Node_Named_ast$ModifierFlags_to_Named_ast$ModifierFlags, $goInterfaceMethod$GetEmitModuleFormatOfFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEmitResolver$void_to_Named_printer$EmitResolver, $goInterfaceMethod$GetGlobalTypingsCacheLocation$void_to_string, $goInterfaceMethod$GetModeForUsageLocation$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetNearestAncestorDirectoryWithPackageJson$string_to_string, $goInterfaceMethod$GetOutputPathsFor$PointerTo_Named_ast$SourceFile_bool_to_Named_declarations$OutputPaths, $goInterfaceMethod$GetPackageJsonInfo$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$GetRedirectTargets$Named_tspath$Path_to_SliceOf_string, $goInterfaceMethod$GetResolutionModeOverride$PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetResolvedModuleFromModuleSpecifier$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_PointerTo_Named___go_module$ResolvedModule, $goInterfaceMethod$GetSourceFileFromReference$PointerTo_Named_ast$SourceFile_PointerTo_Named_ast$FileReference_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSourceOfProjectReferenceIfOutputIncluded$Named_ast$HasFileName_to_string, $goInterfaceMethod$GetSymlinkCache$void_to_PointerTo_Named_symlinks$KnownSymlinks, $goInterfaceMethod$IsEmitBlocked$string_to_bool, $goInterfaceMethod$IsSourceFileFromExternalLibrary$PointerTo_Named_ast$SourceFile_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$SourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool, $goInterfaceMethod$WriteFile$string_string_to_Named_error]);
export function EmitHost$is(value: GoInterfaceValue | undefined): value is EmitHost {
    return value !== undefined && value.$go$implements(EmitHost$contract);
}
export class emitHost {
    declare private readonly $goType: void;
    public constructor(public program: {
        value: Program;
    } | undefined, public emitResolver: EmitResolver__from_printer | undefined) {
    }
    static $copy($source: emitHost): emitHost {
        return new emitHost($source.program, $source.emitResolver);
    }
    static $equal($left: emitHost, $right: emitHost): bool {
        return $left.program
            ===
                $right.program
            && goInterfaceEqual($left.emitResolver, $right.emitResolver);
    }
    static $hash($source: emitHost): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.program));
        $hash = GoMapHash.mix($hash, $source.emitResolver === undefined ? 0 : $source.emitResolver.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static CommonSourceDirectory(host: {
        value: emitHost;
    } | undefined): gostring {
        return Program.CommonSourceDirectory((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static FileExists(host: {
        value: emitHost;
    } | undefined, path: gostring): bool {
        return Program.FileExists((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
    }
    static GetCurrentDirectory(host: {
        value: emitHost;
    } | undefined): gostring {
        return Program.GetCurrentDirectory((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static GetDefaultResolutionModeForFile(host: {
        value: emitHost;
    } | undefined, file: HasFileName__from_ast | undefined): ModuleKind__from_core {
        return Program.GetDefaultResolutionModeForFile((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file);
    }
    static GetEffectiveDeclarationFlags(host: {
        value: emitHost;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: ModifierFlags__from_ast): ModifierFlags__from_ast {
        const __gotots_receiver_0 = emitHost.GetEmitResolver(host);
        const __gotots_argument_0 = node;
        const __gotots_argument_1 = flags;
        return goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_0).GetEffectiveDeclarationFlags(__gotots_argument_0, __gotots_argument_1);
    }
    static GetEmitModuleFormatOfFile(host: {
        value: emitHost;
    } | undefined, file: HasFileName__from_ast | undefined): ModuleKind__from_core {
        return Program.GetEmitModuleFormatOfFile((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file);
    }
    static GetEmitResolver(host: {
        value: emitHost;
    } | undefined): EmitResolver__from_printer | undefined {
        return (host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.emitResolver;
    }
    static GetGlobalTypingsCacheLocation(host: {
        value: emitHost;
    } | undefined): gostring {
        return Program.GetGlobalTypingsCacheLocation((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static GetModeForUsageLocation(host: {
        value: emitHost;
    } | undefined, file: HasFileName__from_ast | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        return Program.GetModeForUsageLocation((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file, moduleSpecifier);
    }
    static GetNearestAncestorDirectoryWithPackageJson(host: {
        value: emitHost;
    } | undefined, dirname: gostring): gostring {
        return Program.GetNearestAncestorDirectoryWithPackageJson((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, dirname);
    }
    static GetOutputPathsFor(host: {
        value: emitHost;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, forceDtsPaths: bool): OutputPaths__from_declarations | undefined {
        return new $goInterfaceAdapter$PointerTo_Named_outputpaths$OutputPaths(GetOutputPathsFor__from_outputpaths(file, emitHost.Options(host), new $goInterfaceAdapter$PointerTo_Named_compiler$emitHost(host), forceDtsPaths));
    }
    static GetPackageJsonInfo(host: {
        value: emitHost;
    } | undefined, pkgJsonPath: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        return Program.GetPackageJsonInfo((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, pkgJsonPath);
    }
    static GetProjectReferenceFromSource(host: {
        value: emitHost;
    } | undefined, path: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined {
        return Program.GetProjectReferenceFromSource((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
    }
    static GetRedirectTargets(host: {
        value: emitHost;
    } | undefined, path: Path__from_tspath): RuntimeSlice<gostring> {
        return Program.GetRedirectTargets((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
    }
    static GetResolutionModeOverride(host: {
        value: emitHost;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        const __gotots_receiver_1 = emitHost.GetEmitResolver(host);
        const __gotots_argument_2 = node;
        return goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_1).GetResolutionModeOverride(__gotots_argument_2);
    }
    static GetResolvedModuleFromModuleSpecifier(host: {
        value: emitHost;
    } | undefined, file: HasFileName__from_ast | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined {
        return Program.GetResolvedModuleFromModuleSpecifier((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file, moduleSpecifier);
    }
    static GetSourceFileFromReference(host: {
        value: emitHost;
    } | undefined, origin: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ref: {
        value: FileReference__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return Program.GetSourceFileFromReference((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, origin, ref);
    }
    static GetSourceOfProjectReferenceIfOutputIncluded(host: {
        value: emitHost;
    } | undefined, file: HasFileName__from_ast | undefined): gostring {
        return Program.GetSourceOfProjectReferenceIfOutputIncluded((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file);
    }
    static GetSymlinkCache(host: {
        value: emitHost;
    } | undefined): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined {
        return Program.GetSymlinkCache((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static IsEmitBlocked(host: {
        value: emitHost;
    } | undefined, file: gostring): bool {
        return Program.IsEmitBlocked((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file);
    }
    static IsSourceFileFromExternalLibrary(host: {
        value: emitHost;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        return Program.IsSourceFileFromExternalLibrary((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file);
    }
    static Options(host: {
        value: emitHost;
    } | undefined): {
        value: CompilerOptions__from_core;
    } | undefined {
        return Program.Options((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static SourceFiles(host: {
        value: emitHost;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        return Program.SourceFiles((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static UseCaseSensitiveFileNames(host: {
        value: emitHost;
    } | undefined): bool {
        return Program.UseCaseSensitiveFileNames((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static WriteFile(host: {
        value: emitHost;
    } | undefined, fileName: gostring, text: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_2 = Program.Host((host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
        const __gotots_receiver_3 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_2).FS();
        const __gotots_argument_3 = fileName;
        const __gotots_argument_4 = text;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).WriteFile(__gotots_argument_3, __gotots_argument_4);
    }
}
export function newEmitHost(ctx: GoInterface | undefined, program: {
    value: Program;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    {
        value: emitHost;
    } | undefined,
    (() => void) | undefined
] {
    const __gotots_results_0 = Program.GetTypeCheckerForFile(program, ctx, file);
    let checker: {
        value: Checker__from_checker;
    } | undefined = __gotots_results_0[0];
    let done: (() => void) | undefined = __gotots_results_0[1];
    return [
        { value: new emitHost(program, new GoInterfaceAdapter(Checker__from_checker.GetEmitResolver(checker))) }, done];
}
