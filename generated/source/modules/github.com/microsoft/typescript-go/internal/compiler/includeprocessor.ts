import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, HasFileName as HasFileName__from_ast, ObjectLiteralExpression as ObjectLiteralExpression__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModeAwareCache as ModeAwareCache__from___go_module, ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { ParsedCommandLine as ParsedCommandLine__from_tsoptions, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { referenceFileLocation } from "./fileInclude.js";
import type { redirectsFile } from "./fileloader.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { DiagnosticsCollection as DiagnosticsCollection__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, Node as Node__from_ast, PropertyAssignment as PropertyAssignment__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { ForEachTsConfigPropArray as ForEachTsConfigPropArray__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { SyncMap$Load$Named_tspath$Path$SliceOf_PointerTo_Named_ast$Diagnostic, SyncMap$Load$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_ast$Diagnostic, SyncMap$Load$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$referenceFileLocation } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$SliceOf_PointerTo_Named_ast$Diagnostic, SyncMap$LoadOrStore$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_ast$Diagnostic, SyncMap$LoadOrStore$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$referenceFileLocation } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { Identity$PointerTo_Named_ast$PropertyAssignment } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { ContainsFunc$SliceOf_PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$FileIncludeReason } from "../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic, $goInterfaceAdapter$PointerTo_Named_compiler$redirectsFile, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { FileIncludeReason } from "./fileInclude.js";
import { includeExplainingDiagnostic, processingDiagnostic, processingDiagnosticKindExplainingFileInclude$constant } from "./processingDiagnostic.js";
import { Program } from "./program.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class includeProcessor {
    declare private readonly $goType: void;
    public constructor(public fileIncludeReasons: GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: FileIncludeReason;
    } | undefined>>, public processingDiagnostics: RuntimeSlice<{
        value: processingDiagnostic;
    } | undefined>, public reasonToReferenceLocation: SyncMap__from_collections<{
        value: FileIncludeReason;
    } | undefined, {
        value: referenceFileLocation;
    } | undefined>, public includeReasonToRelatedInfo: SyncMap__from_collections<{
        value: FileIncludeReason;
    } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public redirectAndFileFormat: SyncMap__from_collections<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>, public computedDiagnostics: tsonicTypeScriptRuntime.Location<DiagnosticsCollection__from_ast> | undefined, public computedDiagnosticsOnce: sync__from_gostdlib.Once, public compilerOptionsSyntax: {
        value: ObjectLiteralExpression__from_ast;
    } | undefined, public compilerOptionsSyntaxOnce: sync__from_gostdlib.Once) {
    }
    static $copy($source: includeProcessor): includeProcessor {
        return new includeProcessor($source.fileIncludeReasons, $source.processingDiagnostics, SyncMap__from_collections.$copy<{
            value: FileIncludeReason;
        } | undefined, {
            value: referenceFileLocation;
        } | undefined>($source.reasonToReferenceLocation), SyncMap__from_collections.$copy<{
            value: FileIncludeReason;
        } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>($source.includeReasonToRelatedInfo), SyncMap__from_collections.$copy<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>($source.redirectAndFileFormat), $source.computedDiagnostics, named_sync.SyncOnceOperations.$copy($source.computedDiagnosticsOnce), $source.compilerOptionsSyntax, named_sync.SyncOnceOperations.$copy($source.compilerOptionsSyntaxOnce));
    }
    declare private readonly then?: never;
    static $go$private$compiler$addProcessingDiagnostic(i: {
        value: includeProcessor;
    } | undefined, d: RuntimeSlice<{
        value: processingDiagnostic;
    } | undefined>): void {
        (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = goSliceAppendSlice<{
            value: processingDiagnostic;
        } | undefined>((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, d, void 0);
    }
    static $go$private$compiler$addProcessingDiagnosticsForFileCasing(i: {
        value: includeProcessor;
    } | undefined, file: Path__from_tspath, existingCasing: gostring, currentCasing: gostring, reason: {
        value: FileIncludeReason;
    } | undefined): void {
        if (!FileIncludeReason.$go$private$compiler$isReferencedFile(reason) && ContainsFunc$SliceOf_PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$FileIncludeReason((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons.lookup(file), (r: {
            value: FileIncludeReason;
        } | undefined): bool => {
            return FileIncludeReason.$go$private$compiler$isReferencedFile(r);
        })) {
            includeProcessor.$go$private$compiler$addProcessingDiagnostic(i, RuntimeSlice.literal<{
                value: processingDiagnostic;
            } | undefined>([
                { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(file, reason, $state__diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(existingCasing), new GoInterfaceAdapter(currentCasing)])) })) },
            ]));
        }
        else {
            includeProcessor.$go$private$compiler$addProcessingDiagnostic(i, RuntimeSlice.literal<{
                value: processingDiagnostic;
            } | undefined>([
                { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(file, reason, $state__diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(currentCasing), new GoInterfaceAdapter(existingCasing)])) })) },
            ]));
        }
    }
    static $go$private$compiler$explainRedirectAndImpliedFormat(i: {
        value: includeProcessor;
    } | undefined, program: {
        value: Program;
    } | undefined, filePath: Path__from_tspath, toFileName: (($0: gostring) => gostring) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        {
            const __gotots_store_0 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$SliceOf_PointerTo_Named_ast$Diagnostic(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "redirectAndFileFormat"), filePath);
            let existing = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                return existing;
            }
        }
        let file: HasFileName__from_ast | undefined = void 0;
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        let redirectsFile__shadow_1: redirectsFile | undefined = (program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectFilesByPath.lookup(filePath);
        if (!(redirectsFile__shadow_1 === undefined)) {
            file = new $goInterfaceAdapter$PointerTo_Named_compiler$redirectsFile(redirectsFile__shadow_1);
        }
        else {
            sourceFile = Program.GetSourceFileByPath(program, filePath);
            if (sourceFile === undefined) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
            }
            file = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile);
        }
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        {
            let source = Program.GetSourceOfProjectReferenceIfOutputIncluded(program, file);
            const __gotots_binary_operand_0 = source;
            const __gotots_receiver_0 = file;
            const __gotots_binary_operand_1 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_0).FileName();
            if (__gotots_binary_operand_0 !== __gotots_binary_operand_1) {
                const __gotots_argument_4 = result;
                const __gotots_argument_2 = $state__diagnostics.File_is_output_of_project_reference_source_0;
                const __gotots_callee_0 = toFileName;
                const __gotots_argument_0 = source;
                const __gotots_argument_1 = new GoInterfaceAdapter((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0));
                const __gotots_argument_3 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_1]);
                const __gotots_argument_5 = NewCompilerDiagnostic__from_ast(__gotots_argument_2, __gotots_argument_3);
                result = __gotots_argument_4.append(void 0, [__gotots_argument_5]);
            }
        }
        if (!(redirectsFile__shadow_1 === undefined)) {
            let targetFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program.GetSourceFileByPath(program, (redirectsFile__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).target);
            const __gotots_argument_10 = result;
            const __gotots_argument_8 = $state__diagnostics.File_redirects_to_file_0;
            const __gotots_callee_1 = toFileName;
            const __gotots_argument_6 = SourceFile__from_ast.FileName(targetFile);
            const __gotots_argument_7 = new GoInterfaceAdapter((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6));
            const __gotots_argument_9 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_7]);
            const __gotots_argument_11 = NewCompilerDiagnostic__from_ast(__gotots_argument_8, __gotots_argument_9);
            result = __gotots_argument_10.append(void 0, [__gotots_argument_11]);
        }
        if (!(sourceFile === undefined) && IsExternalOrCommonJSModule__from_ast(sourceFile)) {
            const __gotots_receiver_2 = program;
            const __gotots_receiver_1 = file;
            const __gotots_argument_12 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_1).Path();
            let metaData = Program.GetSourceFileMetaData(__gotots_receiver_2, __gotots_argument_12);
            switch (Program.GetImpliedNodeFormatForEmit(program, file)) {
                case ModuleKindESNext$constant__from_core(): {
                    if (metaData.PackageJsonType === "module") {
                        const __gotots_argument_17 = result;
                        const __gotots_argument_15 = $state__diagnostics.File_is_ECMAScript_module_because_0_has_field_type_with_value_module;
                        const __gotots_callee_2 = toFileName;
                        const __gotots_argument_13 = metaData.PackageJsonDirectory + "/package.json";
                        const __gotots_argument_14 = new GoInterfaceAdapter((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13));
                        const __gotots_argument_16 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_14]);
                        const __gotots_argument_18 = NewCompilerDiagnostic__from_ast(__gotots_argument_15, __gotots_argument_16);
                        result = __gotots_argument_17.append(void 0, [__gotots_argument_18]);
                    }
                    break;
                }
                case ModuleKindCommonJS$constant__from_core(): {
                    if (metaData.PackageJsonType !== "") {
                        const __gotots_argument_23 = result;
                        const __gotots_argument_21 = $state__diagnostics.File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module;
                        const __gotots_callee_3 = toFileName;
                        const __gotots_argument_19 = metaData.PackageJsonDirectory + "/package.json";
                        const __gotots_argument_20 = new GoInterfaceAdapter((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19));
                        const __gotots_argument_22 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_20]);
                        const __gotots_argument_24 = NewCompilerDiagnostic__from_ast(__gotots_argument_21, __gotots_argument_22);
                        result = __gotots_argument_23.append(void 0, [__gotots_argument_24]);
                    }
                    else if (metaData.PackageJsonDirectory !== "") {
                        if (metaData.PackageJsonType === "") {
                            const __gotots_argument_29 = result;
                            const __gotots_argument_27 = $state__diagnostics.File_is_CommonJS_module_because_0_does_not_have_field_type;
                            const __gotots_callee_4 = toFileName;
                            const __gotots_argument_25 = metaData.PackageJsonDirectory + "/package.json";
                            const __gotots_argument_26 = new GoInterfaceAdapter((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25));
                            const __gotots_argument_28 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_26]);
                            const __gotots_argument_30 = NewCompilerDiagnostic__from_ast(__gotots_argument_27, __gotots_argument_28);
                            result = __gotots_argument_29.append(void 0, [__gotots_argument_30]);
                        }
                    }
                    else {
                        result = result.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.File_is_CommonJS_module_because_package_json_was_not_found, RuntimeSlice.nil<GoInterface | undefined>())]);
                    }
                    break;
                }
            }
        }
        const __gotots_store_1 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_1 = SyncMap$LoadOrStore$Named_tspath$Path$SliceOf_PointerTo_Named_ast$Diagnostic(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "redirectAndFileFormat"), filePath, result);
        result = __gotots_results_1[0];
        return result;
    }
    static $go$private$compiler$getCompilerOptionsObjectLiteralSyntax(i: {
        value: includeProcessor;
    } | undefined, program: {
        value: Program;
    } | undefined): {
        value: ObjectLiteralExpression__from_ast;
    } | undefined {
        sync__from_gostdlib.Once.Do((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsSyntaxOnce, (): void => {
            let configFile: {
                value: TsConfigSourceFile__from_tsoptions;
            } | undefined = (((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile;
            if (!(configFile === undefined)) {
                {
                    let compilerOptionsProperty: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = ForEachTsConfigPropArray__from_tsoptions<PropertyAssignment__from_ast>((configFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, "compilerOptions", ($argument0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined => {
                        return Identity$PointerTo_Named_ast$PropertyAssignment($argument0);
                    });
                    if (!(compilerOptionsProperty === undefined) && !(PropertyAssignment__from_ast.$storageOf(((compilerOptionsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer === undefined) && IsObjectLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((compilerOptionsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
                        (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsSyntax = Node__from_ast.AsObjectLiteralExpression(PropertyAssignment__from_ast.$storageOf(((compilerOptionsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
                    }
                }
            }
            else {
                (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsSyntax = void 0;
            }
        });
        return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptionsSyntax;
    }
    static $go$private$compiler$getDiagnostics(i: {
        value: includeProcessor;
    } | undefined, p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<DiagnosticsCollection__from_ast> | undefined {
        sync__from_gostdlib.Once.Do((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.computedDiagnosticsOnce, (): void => {
            const __gotots_struct_0 = DiagnosticsCollection__from_ast.$zero();
            (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.computedDiagnostics =
                tsonicTypeScriptRuntime.location<DiagnosticsCollection__from_ast>(__gotots_struct_0);
            const __gotots_range_0: includeProcessor["processingDiagnostics"] = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let d: {
                    value: processingDiagnostic;
                } | undefined = __gotots_range_value_0;
                DiagnosticsCollection__from_ast.Add((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.computedDiagnostics, processingDiagnostic.$go$private$compiler$toDiagnostic(d, p));
            }
            const __gotots_range_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules;
            const __gotots_range_keys_0 = __gotots_range_1.keys();
            for (const __gotots_range_value_1 of __gotots_range_keys_0) {
                const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
                if (!__gotots_range_value_2[1]) {
                    continue;
                }
                const __gotots_range_value_3 = __gotots_range_value_2[0];
                let resolutions: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined> = __gotots_range_value_3;
                const __gotots_range_2 = resolutions.$value;
                const __gotots_range_keys_1 = __gotots_range_2.keys();
                for (const __gotots_range_value_4 of __gotots_range_keys_1) {
                    const __gotots_range_value_5 = __gotots_range_2.lookupOk(__gotots_range_value_4);
                    if (!__gotots_range_value_5[1]) {
                        continue;
                    }
                    const __gotots_range_value_6 = __gotots_range_value_5[0];
                    let resolvedModule: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_range_value_6;
                    const __gotots_range_3 = ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolutionDiagnostics;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
                        const __gotots_range_value_7 = __gotots_range_3.get(__gotots_range_index_1);
                        let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_7;
                        DiagnosticsCollection__from_ast.Add((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.computedDiagnostics, diag);
                    }
                }
            }
            const __gotots_range_4 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.typeResolutionsInFile;
            const __gotots_range_keys_2 = __gotots_range_4.keys();
            for (const __gotots_range_value_8 of __gotots_range_keys_2) {
                const __gotots_range_value_9 = __gotots_range_4.lookupOk(__gotots_range_value_8);
                if (!__gotots_range_value_9[1]) {
                    continue;
                }
                const __gotots_range_value_10 = __gotots_range_value_9[0];
                let typeResolutions: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined> = __gotots_range_value_10;
                const __gotots_range_5 = typeResolutions.$value;
                const __gotots_range_keys_3 = __gotots_range_5.keys();
                for (const __gotots_range_value_11 of __gotots_range_keys_3) {
                    const __gotots_range_value_12 = __gotots_range_5.lookupOk(__gotots_range_value_11);
                    if (!__gotots_range_value_12[1]) {
                        continue;
                    }
                    const __gotots_range_value_13 = __gotots_range_value_12[0];
                    let resolvedTypeRef: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = __gotots_range_value_13;
                    const __gotots_range_6 = ((resolvedTypeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolutionDiagnostics;
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_6.length; __gotots_range_index_2++) {
                        const __gotots_range_value_14 = __gotots_range_6.get(__gotots_range_index_2);
                        let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_14;
                        DiagnosticsCollection__from_ast.Add((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.computedDiagnostics, diag);
                    }
                }
            }
        });
        return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.computedDiagnostics;
    }
    static $go$private$compiler$getReferenceLocation(i: {
        value: includeProcessor;
    } | undefined, r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined): {
        value: referenceFileLocation;
    } | undefined {
        {
            const __gotots_store_2 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_2 = SyncMap$Load$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$referenceFileLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "reasonToReferenceLocation"), r);
            let existing: {
                value: referenceFileLocation;
            } | undefined = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                return existing;
            }
        }
        const __gotots_store_3 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_3 = SyncMap$LoadOrStore$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_compiler$referenceFileLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "reasonToReferenceLocation"), r, FileIncludeReason.$go$private$compiler$getReferencedLocation(r, program));
        let loc: {
            value: referenceFileLocation;
        } | undefined = __gotots_results_3[0];
        return loc;
    }
    static $go$private$compiler$getRelatedInfo(i: {
        value: includeProcessor;
    } | undefined, r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        {
            const __gotots_store_4 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_4 = SyncMap$Load$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_ast$Diagnostic(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "includeReasonToRelatedInfo"), r);
            let existing: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                return existing;
            }
        }
        const __gotots_store_5 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_5 = SyncMap$LoadOrStore$PointerTo_Named_compiler$FileIncludeReason$PointerTo_Named_ast$Diagnostic(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "includeReasonToRelatedInfo"), r, FileIncludeReason.$go$private$compiler$toRelatedInfo(r, program));
        let relatedInfo: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_results_5[0];
        return relatedInfo;
    }
}
export function updateFileIncludeProcessor(p: {
    value: Program;
} | undefined): void {
    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor =
        { value: new includeProcessor(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, SyncMap__from_collections.$zero<{
                value: FileIncludeReason;
            } | undefined, {
                value: referenceFileLocation;
            } | undefined>(), SyncMap__from_collections.$zero<{
                value: FileIncludeReason;
            } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) };
}
