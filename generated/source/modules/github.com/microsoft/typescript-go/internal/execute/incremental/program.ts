import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerHost as CompilerHost__from_compiler, SourceMapEmitResult as SourceMapEmitResult__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { BuildInfo } from "./buildInfo.js";
import type { Host } from "./host.js";
import type { buildInfoDiagnosticWithFileName } from "./snapshot.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { EmitOptions as EmitOptions__from_compiler, EmitResult as EmitResult__from_compiler, FilterNoEmitSemanticDiagnostics as FilterNoEmitSemanticDiagnostics__from_compiler, HandleNoEmitOnError as HandleNoEmitOnError__from_compiler, Program as Program__from_compiler, WriteFileData as WriteFileData__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Marshal as Marshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { GetBuildInfoFileName as GetBuildInfoFileName__from_outputpaths } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { PhaseEmit$constant as PhaseEmit$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { IfElse$Named_core$Tristate } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../../support/generics/concretizations/slices/Concat.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo, $goInterfaceAdapter$PointerTo_Named_incremental$Program, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_Named_tspath$Path_To_Named_incremental$SignatureUpdateKind as GoMap } from "../../../../../../../support/maps.js";
import { collectAllAffectedFiles } from "./affectedfileshandler.js";
import { emitFiles } from "./emitfileshandler.js";
import { programToSnapshot } from "./programtosnapshot.js";
import { DiagnosticsOrBuildInfoDiagnosticsWithFileName, snapshot } from "./snapshot.js";
import { snapshotToBuildInfo } from "./snapshottobuildinfo.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export type SignatureUpdateKind = uint8;
export function SignatureUpdateKindStoredAtEmit$constant(): SignatureUpdateKind {
    return 1;
}
export function SignatureUpdateKindUsedVersion$constant(): SignatureUpdateKind {
    return 2;
}
export class Program {
    declare private readonly $goType: void;
    public constructor(public snapshot: tsonicTypeScriptRuntime.Location<snapshot> | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public host: Host | undefined, public testingData: {
        value: TestingData;
    } | undefined) {
    }
    static $copy($source: Program): Program {
        return new Program($source.snapshot, $source.program, $source.host, $source.testingData);
    }
    static $equal($left: Program, $right: Program): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.snapshot, $right.snapshot)
            &&
                $left.program
                    ===
                        $right.program && goInterfaceEqual($left.host, $right.host) &&
            $left.testingData
                ===
                    $right.testingData;
    }
    static $hash($source: Program): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.snapshot));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.program));
        $hash = GoMapHash.mix($hash, $source.host === undefined ? 0 : $source.host.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.testingData));
        return $hash;
    }
    declare private readonly then?: never;
    static CommonSourceDirectory(p: {
        value: Program;
    } | undefined): gostring {
        Program.$go$private$incremental$panicIfNoProgram(p, "CommonSourceDirectory");
        return Program__from_compiler.CommonSourceDirectory((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static Emit(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, options: EmitOptions__from_compiler): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined {
        Program.$go$private$incremental$panicIfNoProgram(p, "Emit");
        let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = void 0;
        if (Tristate_IsTrue__from_core(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit)) {
            result =
                tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(true, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
                    value: SourceMapEmitResult__from_compiler;
                } | undefined>()));
        }
        else {
            result = HandleNoEmitOnError__from_compiler(ctx, new $goInterfaceAdapter$PointerTo_Named_incremental$Program(p), options.TargetSourceFile);
            const __gotots_receiver_0 = ctx;
            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined)) {
                return void 0;
            }
        }
        if (!(result === undefined)) {
            if (!(options.TargetSourceFile === undefined)) {
                return result;
            }
            let buildInfoResult: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = Program.$go$private$incremental$emitBuildInfo(p, ctx, EmitOptions__from_compiler.$copy(options));
            if (!(buildInfoResult === undefined)) {
                ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics, ((buildInfoResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics, void 0);
                ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles = goSliceAppendSlice<gostring>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles, ((buildInfoResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles, "");
            }
            return result;
        }
        return emitFiles(ctx, p, EmitOptions__from_compiler.$copy(options), false);
    }
    static GetBindDiagnostics(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetBindDiagnostics");
        return Program__from_compiler.GetBindDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, ctx, file);
    }
    static GetConfigFileParsingDiagnostics(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetConfigFileParsingDiagnostics");
        return Program__from_compiler.GetConfigFileParsingDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static GetDeclarationDiagnostics(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetDeclarationDiagnostics");
        let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = emitFiles(ctx, p, new EmitOptions__from_compiler(file, 0, new WriteFile__from_compiler(void 0)), true);
        if (!(result === undefined)) {
            return ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    static GetGlobalDiagnostics(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetGlobalDiagnostics");
        return Program__from_compiler.GetGlobalDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, ctx);
    }
    static GetProgram(p: {
        value: Program;
    } | undefined): {
        value: Program__from_compiler;
    } | undefined {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetProgram");
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
    }
    static GetProgramDiagnostics(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetProgramDiagnostics");
        return Program__from_compiler.GetProgramDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static GetSemanticDiagnostics(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetSemanticDiagnostics");
        if (Tristate_IsTrue__from_core(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        }
        Program.$go$private$incremental$collectSemanticDiagnosticsOfAffectedFiles(p, ctx, file);
        const __gotots_receiver_1 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Err() === undefined)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        }
        if (!(file === undefined)) {
            return Program.$go$private$incremental$getSemanticDiagnosticsOfFile(p, file);
        }
        let diagnostics__shadow_1 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        const __gotots_range_0 = Program__from_compiler.GetSourceFiles((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let file__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
            diagnostics__shadow_1 = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diagnostics__shadow_1, Program.$go$private$incremental$getSemanticDiagnosticsOfFile(p, file__shadow_1), void 0);
        }
        return diagnostics__shadow_1;
    }
    static GetSourceFile(p: {
        value: Program;
    } | undefined, path: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetSourceFile");
        return Program__from_compiler.GetSourceFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
    }
    static GetSourceFiles(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetSourceFiles");
        return Program__from_compiler.GetSourceFiles((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
    }
    static GetSuggestionDiagnostics(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetSuggestionDiagnostics");
        return Program__from_compiler.GetSuggestionDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, ctx, file);
    }
    static GetSyntacticDiagnostics(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        Program.$go$private$incremental$panicIfNoProgram(p, "GetSyntacticDiagnostics");
        return Program__from_compiler.GetSyntacticDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, ctx, file);
    }
    static HasChangedDtsFile(p: {
        value: Program;
    } | undefined): bool {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasChangedDtsFile;
    }
    static IsSourceFileDefaultLibrary(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): bool {
        Program.$go$private$incremental$panicIfNoProgram(p, "IsSourceFileDefaultLibrary");
        return Program__from_compiler.IsSourceFileDefaultLibrary((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
    }
    static Options(p: {
        value: Program;
    } | undefined): {
        value: CompilerOptions__from_core;
    } | undefined {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options;
    }
    static Program(p: {
        value: Program;
    } | undefined): {
        value: Program__from_compiler;
    } | undefined {
        Program.$go$private$incremental$panicIfNoProgram(p, "Program");
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
    }
    static $go$private$incremental$collectSemanticDiagnosticsOfAffectedFiles(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        if (snapshot.$go$private$incremental$canUseIncrementalState((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot)) {
            collectAllAffectedFiles(ctx, p);
            const __gotots_receiver_6 = ctx;
            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_6).Err() === undefined)) {
                return;
            }
            const __gotots_store_2 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_binary_operand_0 = SyncMap__from_collections.Size<Path__from_tspath, {
                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
            } | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "semanticDiagnosticsPerFile"));
            const __gotots_binary_operand_1 = Program__from_compiler.GetSourceFiles((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program).length;
            if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
                return;
            }
        }
        let affectedFiles = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>();
        if (!(file === undefined)) {
            const __gotots_store_3 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
            let ok = __gotots_results_1[1];
            if (ok) {
                return;
            }
            affectedFiles = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>([file]);
        }
        else {
            const __gotots_range_1 = Program__from_compiler.GetSourceFiles((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let file__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_1;
                {
                    const __gotots_store_4 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file__shadow_1));
                    let ok = __gotots_results_2[1];
                    if (!ok) {
                        affectedFiles = affectedFiles.append(void 0, [file__shadow_1]);
                    }
                }
            }
        }
        let diagnosticsPerFile: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> = Program__from_compiler.GetSemanticDiagnosticsWithoutNoEmitFiltering((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, ctx, affectedFiles);
        const __gotots_receiver_7 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_7).Err() === undefined)) {
            return;
        }
        const __gotots_range_2 = diagnosticsPerFile;
        const __gotots_range_keys_0 = __gotots_range_2.keys();
        for (const __gotots_range_value_2 of __gotots_range_keys_0) {
            const __gotots_range_value_3 = __gotots_range_2.lookupOk(__gotots_range_value_2);
            if (!__gotots_range_value_3[1]) {
                continue;
            }
            const __gotots_range_value_4 = __gotots_range_value_2;
            const __gotots_range_value_5 = __gotots_range_value_3[0];
            let file__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_4;
            let diagnostics__shadow_1 = __gotots_range_value_5;
            const __gotots_store_5 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file__shadow_1), { value: new DiagnosticsOrBuildInfoDiagnosticsWithFileName(diagnostics__shadow_1, RuntimeSlice.nil<{
                    value: buildInfoDiagnosticWithFileName;
                } | undefined>()) });
        }
        const __gotots_store_6 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_binary_operand_2 = SyncMap__from_collections.Size<Path__from_tspath, {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "semanticDiagnosticsPerFile"));
        const __gotots_binary_operand_3 = Program__from_compiler.GetSourceFiles((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program).length;
        if (__gotots_binary_operand_2 === __gotots_binary_operand_3 && (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.checkPending && !Tristate_IsTrue__from_core(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck)) {
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.checkPending = false;
        }
        atomic__from_gostdlib.Bool.Store((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
    }
    static $go$private$incremental$emitBuildInfo(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, options: EmitOptions__from_compiler): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    {
                        let tr: {
                            value: Tracing__from_tracing;
                        } | undefined = Program__from_compiler.Tracing((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
                        if (!(tr === undefined)) {
                            const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(tr, PhaseEmit$constant__from_tracing(), "emitBuildInfo", $goMap$MapOf_string_To_Interface_void.nil(), true);
                            const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                            });
                        }
                    }
                    let buildInfoFileName = GetBuildInfoFileName__from_outputpaths((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, new ComparePathsOptions__from_tspath(Program__from_compiler.UseCaseSensitiveFileNames((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program), Program__from_compiler.GetCurrentDirectory((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program)));
                    if (buildInfoFileName === "" || Program__from_compiler.IsEmitBlocked((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, buildInfoFileName)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    if ((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors === TSUnknown$constant__from_core()) {
                        Program.$go$private$incremental$ensureHasErrorsForState(p, ctx, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
                        if (!((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors === (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrorsFromOldState) || (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrors !== (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrorsFromOldState) {
                            atomic__from_gostdlib.Bool.Store((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
                        }
                    }
                    if (!atomic__from_gostdlib.Bool.Load((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_2 = ctx;
                    if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_2).Err() === undefined)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    let buildInfo: BuildInfo | undefined = snapshotToBuildInfo((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, buildInfoFileName);
                    const __gotots_results_0 = Marshal__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo(buildInfo), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    let text = __gotots_results_0[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
                    if (!(err === undefined)) {
                        const __gotots_argument_1 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Failed to marshal build info: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
                        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                    }
                    if (!(options.WriteFile.$value === undefined)) {
                        const __gotots_callee_1 = options.WriteFile.$value;
                        const __gotots_argument_2 = buildInfoFileName;
                        const __gotots_conversion_0 = text;
                        let __gotots_conversion_1 = "";
                        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                        }
                        const __gotots_argument_3 = __gotots_conversion_1;
                        const __gotots_argument_4 = new WriteFileData__from_compiler(0, new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo(buildInfo), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), false);
                        err = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
                    }
                    else {
                        const __gotots_receiver_3 = Program__from_compiler.Host((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
                        const __gotots_receiver_4 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_3).FS();
                        const __gotots_argument_5 = buildInfoFileName;
                        const __gotots_conversion_3 = text;
                        let __gotots_conversion_4 = "";
                        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
                        }
                        const __gotots_argument_6 = __gotots_conversion_4;
                        err = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).WriteFile(__gotots_argument_5, __gotots_argument_6);
                    }
                    if (!(err === undefined)) {
                        const __gotots_field_0 = true;
                        const __gotots_argument_9 = $state__diagnostics.Could_not_write_file_0_Colon_1;
                        const __gotots_argument_7 = new GoInterfaceAdapter(buildInfoFileName);
                        const __gotots_receiver_5 = err;
                        const __gotots_argument_8 = new GoInterfaceAdapter(goInterfaceNonNil<$goInterface$Interface_Method_Error_void_to_string>(__gotots_receiver_5).Error());
                        const __gotots_argument_10 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_7, __gotots_argument_8]);
                        const __gotots_slice_element_0 = NewCompilerDiagnostic__from_ast(__gotots_argument_9, __gotots_argument_10);
                        const __gotots_field_1 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([__gotots_slice_element_0]);
                        __gotots_return_0 =
                            tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(__gotots_field_0, __gotots_field_1, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
                                value: SourceMapEmitResult__from_compiler;
                            } | undefined>()));
                        break __gotots_return_block_0;
                    }
                    atomic__from_gostdlib.Bool.Store((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, false);
                    __gotots_return_0 =
                        tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.literal<gostring>([buildInfoFileName]), RuntimeSlice.nil<{
                            value: SourceMapEmitResult__from_compiler;
                        } | undefined>()));
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$incremental$ensureHasErrorsForState(p: {
        value: Program;
    } | undefined, ctx: GoInterface | undefined, program: {
        value: Program__from_compiler;
    } | undefined): void {
        let hasIncludeProcessingDiagnostics: (() => bool) | undefined;
        let hasEmitDiagnostics = false;
        if (snapshot.$go$private$incremental$canUseIncrementalState((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot)) {
            if (ContainsFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile(Program__from_compiler.GetSourceFiles(program), (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
                {
                    const __gotots_store_8 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "emitDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
                    let ok = __gotots_results_4[1];
                    if (ok) {
                        return true;
                    }
                }
                if (hasIncludeProcessingDiagnostics === undefined && Program__from_compiler.GetIncludeProcessorDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file).length > 0) {
                    hasIncludeProcessingDiagnostics = (): bool => {
                        return true;
                    };
                }
                return false;
            })) {
                hasEmitDiagnostics = true;
            }
            if (hasIncludeProcessingDiagnostics === undefined) {
                hasIncludeProcessingDiagnostics = (): bool => {
                    return false;
                };
            }
        }
        else {
            hasEmitDiagnostics = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasEmitDiagnostics;
            hasIncludeProcessingDiagnostics = (): bool => {
                return ContainsFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile(Program__from_compiler.GetSourceFiles(program), (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
                    return Program__from_compiler.GetIncludeProcessorDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file).length > 0;
                });
            };
        }
        if (hasEmitDiagnostics) {
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors = IfElse$Named_core$Tristate(CompilerOptions__from_core.IsIncremental((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options), TSFalse$constant__from_core(), TSTrue$constant__from_core());
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrors = false;
            return;
        }
        const __gotots_callee_1 = hasIncludeProcessingDiagnostics;
        if ((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() || Program__from_compiler.GetConfigFileParsingDiagnostics(program).length > 0 || Program__from_compiler.GetSyntacticDiagnostics(program, ctx, void 0).length > 0 || Program__from_compiler.GetProgramDiagnostics(program).length > 0 || Program__from_compiler.GetGlobalDiagnostics(program, ctx).length > 0) {
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors = TSTrue$constant__from_core();
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrors = false;
            return;
        }
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors = TSFalse$constant__from_core();
        if (ContainsFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile(Program__from_compiler.GetSourceFiles(program), (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
            const __gotots_store_9 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
            let semanticDiagnostics: {
                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
            } | undefined = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (!ok) {
                return CompilerOptions__from_core.IsIncremental((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options);
            }
            if ((semanticDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics.length > 0 || (semanticDiagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoDiagnostics.length > 0) {
                return true;
            }
            return false;
        })) {
            (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrors = !CompilerOptions__from_core.IsIncremental((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options);
        }
    }
    static $go$private$incremental$getSemanticDiagnosticsOfFile(p: {
        value: Program;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        const __gotots_store_7 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
        let cachedDiagnostics: {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (!ok) {
            const __gotots_argument_11 = new GoInterfaceAdapter("After handling all the affected files, there shouldnt be more changes");
            GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
        }
        return Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>([FilterNoEmitSemanticDiagnostics__from_compiler(DiagnosticsOrBuildInfoDiagnosticsWithFileName.$go$private$incremental$getDiagnostics(cachedDiagnostics, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file), (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options), Program__from_compiler.GetIncludeProcessorDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file)]));
    }
    static $go$private$incremental$panicIfNoProgram(p: {
        value: Program;
    } | undefined, method: gostring): void {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program === undefined) {
            const __gotots_argument_0 = new GoInterfaceAdapter(method + ": should not be called without program");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
    }
}
export function NewProgram(program: {
    value: Program__from_compiler;
} | undefined, oldProgram: {
    value: Program;
} | undefined, host__shadow_1: Host | undefined, testing: bool): {
    value: Program;
} | undefined {
    let incrementalProgram: {
        value: Program;
    } | undefined = { value: new Program(programToSnapshot(program, oldProgram, testing), program, host__shadow_1, void 0) };
    if (testing) {
        (incrementalProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData =
            { value: new TestingData(void 0, void 0, GoMap.nil()) };
        const __gotots_store_0 = (((incrementalProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        ((incrementalProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SemanticDiagnosticsPerFile =
            tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "semanticDiagnosticsPerFile");
        if (!(oldProgram === undefined)) {
            const __gotots_store_1 = (((oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            ((incrementalProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldProgramSemanticDiagnosticsPerFile =
                tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "semanticDiagnosticsPerFile");
        }
        else {
            const __gotots_struct_0 = SyncMap__from_collections.$zero<Path__from_tspath, {
                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
            } | undefined>();
            ((incrementalProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OldProgramSemanticDiagnosticsPerFile =
                tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
                    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
                } | undefined>>(__gotots_struct_0);
        }
        ((incrementalProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdatedSignatureKinds = GoMap.make(0, []);
    }
    return incrementalProgram;
}
export class TestingData {
    declare private readonly $goType: void;
    public constructor(public SemanticDiagnosticsPerFile: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined>> | undefined, public OldProgramSemanticDiagnosticsPerFile: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined>> | undefined, public UpdatedSignatureKinds: GoMapValue<Path__from_tspath, SignatureUpdateKind>) {
    }
    static $copy($source: TestingData): TestingData {
        return new TestingData($source.SemanticDiagnosticsPerFile, $source.OldProgramSemanticDiagnosticsPerFile, $source.UpdatedSignatureKinds);
    }
    declare private readonly then?: never;
}
