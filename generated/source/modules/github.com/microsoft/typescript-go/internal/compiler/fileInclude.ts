import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, FileReference as FileReference__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { ExpressionBase as ExpressionBase__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, NewDiagnostic as NewDiagnostic__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, ScriptTarget_String as ScriptTarget_String__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { PackageId as PackageId__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CreateDiagnosticForNodeInSourceFile as CreateDiagnosticForNodeInSourceFile__from_tsoptions, ForEachPropertyAssignment as ForEachPropertyAssignment__from_tsoptions, GetCallbackForFindingPropertyAssignmentByValue as GetCallbackForFindingPropertyAssignmentByValue__from_tsoptions, GetOptionsSyntaxByArrayElementValue as GetOptionsSyntaxByArrayElementValue__from_tsoptions, GetTsConfigPropArrayElementValue as GetTsConfigPropArrayElementValue__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceAdapter$Named_compiler$fileIncludeKind, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_compiler$automaticTypeDirectiveFileData, $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { includeProcessor } from "./includeprocessor.js";
import { Program } from "./program.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class fileIncludeKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export const fileIncludeKindImport$int: int = 0;
export const fileIncludeKindReferenceFile$int: int = 1;
export const fileIncludeKindTypeReferenceDirective$int: int = 2;
export const fileIncludeKindLibReferenceDirective$int: int = 3;
export const fileIncludeKindRootFile$int: int = 4;
export const fileIncludeKindLibFile$int: int = 5;
export const fileIncludeKindAutomaticTypeDirectiveFile$int: int = 6;
export class FileIncludeReason {
    declare private readonly $goType: void;
    public constructor(public kind: fileIncludeKind, public data: GoInterface | undefined, public relativeFileNameDiag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, public relativeFileNameDiagOnce: sync__from_gostdlib.Once, public diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, public diagOnce: sync__from_gostdlib.Once) {
    }
    static $copy($source: FileIncludeReason): FileIncludeReason {
        return new FileIncludeReason($source.kind, $source.data, $source.relativeFileNameDiag, named_sync.SyncOnceOperations.$copy($source.relativeFileNameDiagOnce), $source.diag, named_sync.SyncOnceOperations.$copy($source.diagOnce));
    }
    static $equal($left: FileIncludeReason, $right: FileIncludeReason): bool {
        return $left.kind.$value === $right.kind.$value && goInterfaceEqual($left.data, $right.data) &&
            tsonicTypeScriptRuntime.sameLocation($left.relativeFileNameDiag, $right.relativeFileNameDiag) && named_sync.SyncOnceOperations.$equal($left.relativeFileNameDiagOnce, $right.relativeFileNameDiagOnce) &&
            tsonicTypeScriptRuntime.sameLocation($left.diag, $right.diag) && named_sync.SyncOnceOperations.$equal($left.diagOnce, $right.diagOnce);
    }
    static $hash($source: FileIncludeReason): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind.$value));
        $hash = GoMapHash.mix($hash, $source.data === undefined ? 0 : $source.data.$go$hash());
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.relativeFileNameDiag));
        $hash = GoMapHash.mix($hash, named_sync.SyncOnceOperations.$hash($source.relativeFileNameDiagOnce));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.diag));
        $hash = GoMapHash.mix($hash, named_sync.SyncOnceOperations.$hash($source.diagOnce));
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$compiler$asAutomaticTypeDirectiveFileData(r: {
        value: FileIncludeReason;
    } | undefined): {
        value: automaticTypeDirectiveFileData;
    } | undefined {
        return (($value: GoInterface | undefined): {
            value: automaticTypeDirectiveFileData;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$automaticTypeDirectiveFileData.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
    static $go$private$compiler$asIndex(r: {
        value: FileIncludeReason;
    } | undefined): int {
        return (($value: GoInterface | undefined): int => {
            if (!$goInterfaceAdapter$int.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
    static $go$private$compiler$asLibFileIndex(r: {
        value: FileIncludeReason;
    } | undefined): [
        int,
        bool
    ] {
        const __gotots_results_3 = (($value: GoInterface | undefined): [
            int,
            boolean
        ] => {
            if (!$goInterfaceAdapter$int.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
        let index = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        return [index, ok];
    }
    static $go$private$compiler$asReferencedFileData(r: {
        value: FileIncludeReason;
    } | undefined): {
        value: referencedFileData;
    } | undefined {
        return (($value: GoInterface | undefined): {
            value: referencedFileData;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
    static $go$private$compiler$computeDiagnostic(r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined, toFileName: (($0: gostring) => gostring) | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        if (FileIncludeReason.$go$private$compiler$isReferencedFile(r)) {
            return FileIncludeReason.$go$private$compiler$computeReferenceFileDiagnostic(r, program, toFileName);
        }
        switch ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
            case 4: {
                if (!((((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined)) {
                    let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = (program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config;
                    let fileName = GetNormalizedAbsolutePath__from_tspath(ParsedCommandLine__from_tsoptions.FileNames(config).get(FileIncludeReason.$go$private$compiler$asIndex(r)), Program.GetCurrentDirectory(program));
                    {
                        let matchedFileSpec = ParsedCommandLine__from_tsoptions.GetMatchedFileSpec(config, fileName);
                        if (matchedFileSpec !== "") {
                            const __gotots_argument_3 = $state__diagnostics.Part_of_files_list_in_tsconfig_json;
                            const __gotots_argument_1 = new GoInterfaceAdapter(matchedFileSpec);
                            const __gotots_callee_2 = toFileName;
                            const __gotots_argument_0 = fileName;
                            const __gotots_argument_2 = new GoInterfaceAdapter((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0));
                            const __gotots_argument_4 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_1, __gotots_argument_2]);
                            return NewCompilerDiagnostic__from_ast(__gotots_argument_3, __gotots_argument_4);
                        }
                        else {
                            const __gotots_results_0 = ParsedCommandLine__from_tsoptions.GetMatchedIncludeSpec(config, fileName);
                            let matchedIncludeSpec = __gotots_results_0[0];
                            let isDefaultIncludeSpec = __gotots_results_0[1];
                            if (matchedIncludeSpec !== "") {
                                if (isDefaultIncludeSpec) {
                                    return NewCompilerDiagnostic__from_ast($state__diagnostics.Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                                else {
                                    const __gotots_argument_8 = $state__diagnostics.Matched_by_include_pattern_0_in_1;
                                    const __gotots_argument_6 = new GoInterfaceAdapter(matchedIncludeSpec);
                                    const __gotots_callee_3 = toFileName;
                                    const __gotots_argument_5 = ParsedCommandLine__from_tsoptions.ConfigName(config);
                                    const __gotots_argument_7 = new GoInterfaceAdapter((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5));
                                    const __gotots_argument_9 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_6, __gotots_argument_7]);
                                    return NewCompilerDiagnostic__from_ast(__gotots_argument_8, __gotots_argument_9);
                                }
                            }
                            else {
                                return NewCompilerDiagnostic__from_ast($state__diagnostics.Root_file_specified_for_compilation, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                        }
                    }
                }
                else {
                    return NewCompilerDiagnostic__from_ast($state__diagnostics.Root_file_specified_for_compilation, RuntimeSlice.nil<GoInterface | undefined>());
                }
                break;
            }
            case 6: {
                let data: {
                    value: automaticTypeDirectiveFileData;
                } | undefined = FileIncludeReason.$go$private$compiler$asAutomaticTypeDirectiveFileData(r);
                if (!CompilerOptions__from_core.UsesWildcardTypes(Program.Options(program))) {
                    if (PackageId__from___go_module.$storageOf((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                        const __gotots_argument_12 = $state__diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1;
                        const __gotots_argument_10 = new GoInterfaceAdapter((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeReference);
                        const __gotots_store_0 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_11 = new GoInterfaceAdapter(PackageId__from___go_module.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "packageId")));
                        const __gotots_argument_13 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_10, __gotots_argument_11]);
                        return NewCompilerDiagnostic__from_ast(__gotots_argument_12, __gotots_argument_13);
                    }
                    else {
                        return NewCompilerDiagnostic__from_ast($state__diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeReference)]));
                    }
                }
                else {
                    if (PackageId__from___go_module.$storageOf((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                        const __gotots_argument_16 = $state__diagnostics.Entry_point_for_implicit_type_library_0_with_packageId_1;
                        const __gotots_argument_14 = new GoInterfaceAdapter((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeReference);
                        const __gotots_store_1 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_15 = new GoInterfaceAdapter(PackageId__from___go_module.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "packageId")));
                        const __gotots_argument_17 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_14, __gotots_argument_15]);
                        return NewCompilerDiagnostic__from_ast(__gotots_argument_16, __gotots_argument_17);
                    }
                    else {
                        return NewCompilerDiagnostic__from_ast($state__diagnostics.Entry_point_for_implicit_type_library_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeReference)]));
                    }
                }
                break;
            }
            case 5: {
                {
                    const __gotots_results_1 = FileIncludeReason.$go$private$compiler$asLibFileIndex(r);
                    let index = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (ok) {
                        return NewCompilerDiagnostic__from_ast($state__diagnostics.Library_0_specified_in_compilerOptions, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((Program.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib.get(index))]));
                    }
                    else {
                        let target = ScriptTarget_String__from_core(CompilerOptions__from_core.GetEmitScriptTarget(Program.Options(program)));
                        if (target !== "") {
                            return NewCompilerDiagnostic__from_ast($state__diagnostics.Default_library_for_target_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(target)]));
                        }
                        else {
                            return NewCompilerDiagnostic__from_ast($state__diagnostics.Default_library, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                    }
                }
                break;
            }
            default: {
                const __gotots_argument_18 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("unknown reason: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_compiler$fileIncludeKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind)])));
                GoPanic.raise(__gotots_argument_18 === undefined ? GoPanicNilValue.create() : __gotots_argument_18);
                break;
            }
        }
    }
    static $go$private$compiler$computeReferenceFileDiagnostic(r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined, toFileName: (($0: gostring) => gostring) | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        let referenceLocation: {
            value: referenceFileLocation;
        } | undefined = includeProcessor.$go$private$compiler$getReferenceLocation((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, r, program);
        let referenceText = referenceFileLocation.$go$private$compiler$text(referenceLocation);
        switch ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
            case 0: {
                if (!(referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isSynthetic) {
                    if (PackageId__from___go_module.$storageOf((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                        const __gotots_argument_23 = $state__diagnostics.Imported_via_0_from_file_1_with_packageId_2;
                        const __gotots_argument_20 = new GoInterfaceAdapter(referenceText);
                        const __gotots_callee_4 = toFileName;
                        const __gotots_argument_19 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                        const __gotots_argument_21 = new GoInterfaceAdapter((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19));
                        const __gotots_store_2 = (referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_22 = new GoInterfaceAdapter(PackageId__from___go_module.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "packageId")));
                        const __gotots_argument_24 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_20, __gotots_argument_21, __gotots_argument_22]);
                        return NewCompilerDiagnostic__from_ast(__gotots_argument_23, __gotots_argument_24);
                    }
                    else {
                        const __gotots_argument_28 = $state__diagnostics.Imported_via_0_from_file_1;
                        const __gotots_argument_26 = new GoInterfaceAdapter(referenceText);
                        const __gotots_callee_5 = toFileName;
                        const __gotots_argument_25 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                        const __gotots_argument_27 = new GoInterfaceAdapter((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25));
                        const __gotots_argument_29 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_26, __gotots_argument_27]);
                        return NewCompilerDiagnostic__from_ast(__gotots_argument_28, __gotots_argument_29);
                    }
                }
                else {
                    const __gotots_results_2 = (program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.importHelpersImportSpecifiers.lookupOk(SourceFile__from_ast.Path((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file));
                    let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_2[0];
                    let ok = __gotots_results_2[1];
                    if (ok &&
                        tsonicTypeScriptRuntime.sameLocation(specifier, (referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node)) {
                        if (PackageId__from___go_module.$storageOf((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                            const __gotots_argument_34 = $state__diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions;
                            const __gotots_argument_31 = new GoInterfaceAdapter(referenceText);
                            const __gotots_callee_6 = toFileName;
                            const __gotots_argument_30 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                            const __gotots_argument_32 = new GoInterfaceAdapter((__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30));
                            const __gotots_store_3 = (referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_33 = new GoInterfaceAdapter(PackageId__from___go_module.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "packageId")));
                            const __gotots_argument_35 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_31, __gotots_argument_32, __gotots_argument_33]);
                            return NewCompilerDiagnostic__from_ast(__gotots_argument_34, __gotots_argument_35);
                        }
                        else {
                            const __gotots_argument_39 = $state__diagnostics.Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions;
                            const __gotots_argument_37 = new GoInterfaceAdapter(referenceText);
                            const __gotots_callee_7 = toFileName;
                            const __gotots_argument_36 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                            const __gotots_argument_38 = new GoInterfaceAdapter((__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36));
                            const __gotots_argument_40 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_37, __gotots_argument_38]);
                            return NewCompilerDiagnostic__from_ast(__gotots_argument_39, __gotots_argument_40);
                        }
                    }
                    else {
                        if (PackageId__from___go_module.$storageOf((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                            const __gotots_argument_45 = $state__diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_jsx_and_jsxs_factory_functions;
                            const __gotots_argument_42 = new GoInterfaceAdapter(referenceText);
                            const __gotots_callee_8 = toFileName;
                            const __gotots_argument_41 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                            const __gotots_argument_43 = new GoInterfaceAdapter((__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41));
                            const __gotots_store_4 = (referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_44 = new GoInterfaceAdapter(PackageId__from___go_module.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "packageId")));
                            const __gotots_argument_46 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_42, __gotots_argument_43, __gotots_argument_44]);
                            return NewCompilerDiagnostic__from_ast(__gotots_argument_45, __gotots_argument_46);
                        }
                        else {
                            const __gotots_argument_50 = $state__diagnostics.Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions;
                            const __gotots_argument_48 = new GoInterfaceAdapter(referenceText);
                            const __gotots_callee_9 = toFileName;
                            const __gotots_argument_47 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                            const __gotots_argument_49 = new GoInterfaceAdapter((__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47));
                            const __gotots_argument_51 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_48, __gotots_argument_49]);
                            return NewCompilerDiagnostic__from_ast(__gotots_argument_50, __gotots_argument_51);
                        }
                    }
                }
                break;
            }
            case 1: {
                const __gotots_argument_55 = $state__diagnostics.Referenced_via_0_from_file_1;
                const __gotots_argument_53 = new GoInterfaceAdapter(referenceText);
                const __gotots_callee_10 = toFileName;
                const __gotots_argument_52 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                const __gotots_argument_54 = new GoInterfaceAdapter((__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52));
                const __gotots_argument_56 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_53, __gotots_argument_54]);
                return NewCompilerDiagnostic__from_ast(__gotots_argument_55, __gotots_argument_56);
                break;
            }
            case 2: {
                if (PackageId__from___go_module.$storageOf((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                    const __gotots_argument_61 = $state__diagnostics.Type_library_referenced_via_0_from_file_1_with_packageId_2;
                    const __gotots_argument_58 = new GoInterfaceAdapter(referenceText);
                    const __gotots_callee_11 = toFileName;
                    const __gotots_argument_57 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                    const __gotots_argument_59 = new GoInterfaceAdapter((__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57));
                    const __gotots_store_5 = (referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_60 = new GoInterfaceAdapter(PackageId__from___go_module.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "packageId")));
                    const __gotots_argument_62 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_58, __gotots_argument_59, __gotots_argument_60]);
                    return NewCompilerDiagnostic__from_ast(__gotots_argument_61, __gotots_argument_62);
                }
                else {
                    const __gotots_argument_66 = $state__diagnostics.Type_library_referenced_via_0_from_file_1;
                    const __gotots_argument_64 = new GoInterfaceAdapter(referenceText);
                    const __gotots_callee_12 = toFileName;
                    const __gotots_argument_63 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                    const __gotots_argument_65 = new GoInterfaceAdapter((__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63));
                    const __gotots_argument_67 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_64, __gotots_argument_65]);
                    return NewCompilerDiagnostic__from_ast(__gotots_argument_66, __gotots_argument_67);
                }
                break;
            }
            case 3: {
                const __gotots_argument_71 = $state__diagnostics.Library_referenced_via_0_from_file_1;
                const __gotots_argument_69 = new GoInterfaceAdapter(referenceText);
                const __gotots_callee_13 = toFileName;
                const __gotots_argument_68 = SourceFile__from_ast.FileName((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
                const __gotots_argument_70 = new GoInterfaceAdapter((__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68));
                const __gotots_argument_72 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_69, __gotots_argument_70]);
                return NewCompilerDiagnostic__from_ast(__gotots_argument_71, __gotots_argument_72);
                break;
            }
            default: {
                const __gotots_argument_73 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("unknown reason: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_compiler$fileIncludeKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind)])));
                GoPanic.raise(__gotots_argument_73 === undefined ? GoPanicNilValue.create() : __gotots_argument_73);
                break;
            }
        }
    }
    static $go$private$compiler$computeReferenceFileRelatedInfo(r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        let referenceLocation: {
            value: referenceFileLocation;
        } | undefined = includeProcessor.$go$private$compiler$getReferenceLocation((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, r, program);
        if ((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isSynthetic) {
            return void 0;
        }
        switch ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
            case 0: {
                return referenceFileLocation.$go$private$compiler$diagnosticAt(referenceLocation, $state__diagnostics.File_is_included_via_import_here, RuntimeSlice.nil<GoInterface | undefined>());
                break;
            }
            case 1: {
                return referenceFileLocation.$go$private$compiler$diagnosticAt(referenceLocation, $state__diagnostics.File_is_included_via_reference_here, RuntimeSlice.nil<GoInterface | undefined>());
                break;
            }
            case 2: {
                return referenceFileLocation.$go$private$compiler$diagnosticAt(referenceLocation, $state__diagnostics.File_is_included_via_type_library_reference_here, RuntimeSlice.nil<GoInterface | undefined>());
                break;
            }
            case 3: {
                return referenceFileLocation.$go$private$compiler$diagnosticAt(referenceLocation, $state__diagnostics.File_is_included_via_library_reference_here, RuntimeSlice.nil<GoInterface | undefined>());
                break;
            }
            default: {
                const __gotots_argument_84 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("unknown reason: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_compiler$fileIncludeKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind)])));
                GoPanic.raise(__gotots_argument_84 === undefined ? GoPanicNilValue.create() : __gotots_argument_84);
                break;
            }
        }
    }
    static $go$private$compiler$getReferencedLocation(r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined): {
        value: referenceFileLocation;
    } | undefined {
        let ref: {
            value: referencedFileData;
        } | undefined = FileIncludeReason.$go$private$compiler$asReferencedFileData(r);
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program.GetSourceFileByPath(program, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
        switch ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
            case 0: {
                let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                let isSynthetic = false;
                if (!((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.synthetic === undefined)) {
                    specifier = (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.synthetic;
                    isSynthetic = true;
                }
                else if ((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.index < SourceFile__from_ast.Imports(file).length) {
                    specifier = SourceFile__from_ast.Imports(file).get((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.index);
                }
                else {
                    let augIndex = SourceFile__from_ast.Imports(file).length;
                    const __gotots_range_0 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                        if (Node__from_ast.$storageOf(((imp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast()) {
                            if (augIndex === (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.index) {
                                specifier = imp;
                                break;
                            }
                            augIndex++;
                        }
                    }
                }
                let resolution: ResolvedModule__from___go_module | undefined = Program.GetResolvedModuleFromModuleSpecifier(program, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), specifier);
                return { value: new referenceFileLocation(file, specifier, void 0, PackageId__from___go_module.$copy((resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageId), isSynthetic) };
                break;
            }
            case 1: {
                return { value: new referenceFileLocation(file, void 0, ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles.get((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.index), PackageId__from___go_module.$zero(), false) };
                break;
            }
            case 2: {
                return { value: new referenceFileLocation(file, void 0, ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives.get((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.index), PackageId__from___go_module.$zero(), false) };
                break;
            }
            case 3: {
                return { value: new referenceFileLocation(file, void 0, ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives.get((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.index), PackageId__from___go_module.$zero(), false) };
                break;
            }
            default: {
                const __gotots_argument_74 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("unknown reason: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_compiler$fileIncludeKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind)])));
                GoPanic.raise(__gotots_argument_74 === undefined ? GoPanicNilValue.create() : __gotots_argument_74);
                break;
            }
        }
    }
    static $go$private$compiler$isReferencedFile(r: {
        value: FileIncludeReason;
    } | undefined): bool {
        return !(r === undefined) && (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value <=
            ((void fileIncludeKind,
                fileIncludeKindLibReferenceDirective$int) as int);
    }
    static $go$private$compiler$toDiagnostic(r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined, relativeFileName: bool): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        if (relativeFileName) {
            sync__from_gostdlib.Once.Do((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relativeFileNameDiagOnce, (): void => {
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relativeFileNameDiag = FileIncludeReason.$go$private$compiler$computeDiagnostic(r, program, (fileName: gostring): gostring => {
                    return GetRelativePathFromDirectory__from_tspath(Program.GetCurrentDirectory(program), fileName, ComparePathsOptions__from_tspath.$copy((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions));
                });
            });
            return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relativeFileNameDiag;
        }
        else {
            sync__from_gostdlib.Once.Do((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagOnce, (): void => {
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diag = FileIncludeReason.$go$private$compiler$computeDiagnostic(r, program, (fileName: gostring): gostring => {
                    return fileName;
                });
            });
            return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diag;
        }
    }
    static $go$private$compiler$toRelatedInfo(r: {
        value: FileIncludeReason;
    } | undefined, program: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        if (FileIncludeReason.$go$private$compiler$isReferencedFile(r)) {
            return FileIncludeReason.$go$private$compiler$computeReferenceFileRelatedInfo(r, program);
        }
        if ((((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) {
            return void 0;
        }
        let config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = (program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config;
        switch ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind.$value) {
            case 4: {
                let fileName = GetNormalizedAbsolutePath__from_tspath(ParsedCommandLine__from_tsoptions.FileNames(config).get(FileIncludeReason.$go$private$compiler$asIndex(r)), Program.GetCurrentDirectory(program));
                {
                    let matchedFileSpec = ParsedCommandLine__from_tsoptions.GetMatchedFileSpec(config, fileName);
                    if (matchedFileSpec !== "") {
                        {
                            let filesNode: tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined = GetTsConfigPropArrayElementValue__from_tsoptions((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, "files", matchedFileSpec);
                            if (!(filesNode === undefined)) {
                                const __gotots_argument_75: TsConfigSourceFile__from_tsoptions["SourceFile"] = (((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile;
                                const __gotots_store_6 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                        (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                            (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                                                                StringLiteral__from_ast.$storageOf(((filesNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                                const __gotots_argument_76 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_6, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                                const __gotots_argument_77 = $state__diagnostics.File_is_matched_by_files_list_specified_here;
                                const __gotots_argument_78 = RuntimeSlice.nil<GoInterface | undefined>();
                                return CreateDiagnosticForNodeInSourceFile__from_tsoptions(__gotots_argument_75, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78);
                            }
                        }
                    }
                    else {
                        const __gotots_results_4 = ParsedCommandLine__from_tsoptions.GetMatchedIncludeSpec(config, fileName);
                        let matchedIncludeSpec = __gotots_results_4[0];
                        let isDefaultIncludeSpec = __gotots_results_4[1];
                        if (matchedIncludeSpec !== "" && !isDefaultIncludeSpec) {
                            {
                                let includeNode: tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined = GetTsConfigPropArrayElementValue__from_tsoptions((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, "include", matchedIncludeSpec);
                                if (!(includeNode === undefined)) {
                                    const __gotots_argument_79: TsConfigSourceFile__from_tsoptions["SourceFile"] = (((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile;
                                    const __gotots_store_7 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                        (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                                            (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                                                (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                                                                    StringLiteral__from_ast.$storageOf(((includeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                                    const __gotots_argument_80 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_7, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                                    const __gotots_argument_81 = $state__diagnostics.File_is_matched_by_include_pattern_specified_here;
                                    const __gotots_argument_82 = RuntimeSlice.nil<GoInterface | undefined>();
                                    return CreateDiagnosticForNodeInSourceFile__from_tsoptions(__gotots_argument_79, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82);
                                }
                            }
                        }
                    }
                }
                break;
            }
            case 6: {
                if (!CompilerOptions__from_core.UsesWildcardTypes(Program.Options(program))) {
                    let data: {
                        value: automaticTypeDirectiveFileData;
                    } | undefined = FileIncludeReason.$go$private$compiler$asAutomaticTypeDirectiveFileData(r);
                    {
                        let typesSyntax: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetOptionsSyntaxByArrayElementValue__from_tsoptions(includeProcessor.$go$private$compiler$getCompilerOptionsObjectLiteralSyntax((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, program), "types", (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeReference);
                        if (!(typesSyntax === undefined)) {
                            return CreateDiagnosticForNodeInSourceFile__from_tsoptions((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, (void Node__from_ast.AsNode,
                                typesSyntax), $state__diagnostics.File_is_entry_point_of_type_library_specified_here, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                    }
                }
                break;
            }
            case 5: {
                {
                    const __gotots_results_5 = FileIncludeReason.$go$private$compiler$asLibFileIndex(r);
                    let index = __gotots_results_5[0];
                    let ok = __gotots_results_5[1];
                    if (ok) {
                        {
                            let libSyntax: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetOptionsSyntaxByArrayElementValue__from_tsoptions(includeProcessor.$go$private$compiler$getCompilerOptionsObjectLiteralSyntax((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, program), "lib", (Program.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib.get(index));
                            if (!(libSyntax === undefined)) {
                                return CreateDiagnosticForNodeInSourceFile__from_tsoptions((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, (void Node__from_ast.AsNode,
                                    libSyntax), $state__diagnostics.File_is_library_specified_here, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                        }
                    }
                    else {
                        let target = ScriptTarget_String__from_core(CompilerOptions__from_core.GetEmitScriptTarget(Program.Options(program)));
                        if (target !== "") {
                            {
                                let targetValueSyntax: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ForEachPropertyAssignment__from_tsoptions<Node__from_ast>(includeProcessor.$go$private$compiler$getCompilerOptionsObjectLiteralSyntax((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, program), "target", GetCallbackForFindingPropertyAssignmentByValue__from_tsoptions(target), RuntimeSlice.nil<gostring>());
                                if (!(targetValueSyntax === undefined)) {
                                    return CreateDiagnosticForNodeInSourceFile__from_tsoptions((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile, (void Node__from_ast.AsNode,
                                        targetValueSyntax), $state__diagnostics.File_is_default_library_for_target_specified_here, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                            }
                        }
                    }
                }
                break;
            }
            default: {
                const __gotots_argument_83 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("unknown reason: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_compiler$fileIncludeKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind)])));
                GoPanic.raise(__gotots_argument_83 === undefined ? GoPanicNilValue.create() : __gotots_argument_83);
                break;
            }
        }
        return void 0;
    }
}
export class referencedFileData {
    declare private readonly $goType: void;
    public constructor(public file: Path__from_tspath, public index: int, public synthetic: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: referencedFileData): referencedFileData {
        return new referencedFileData($source.file, $source.index, $source.synthetic);
    }
    static $equal($left: referencedFileData, $right: referencedFileData): bool {
        return $left.file.$value === $right.file.$value && $left.index === $right.index &&
            tsonicTypeScriptRuntime.sameLocation($left.synthetic, $right.synthetic);
    }
    static $hash($source: referencedFileData): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.file.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.index));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.synthetic));
        return $hash;
    }
    declare private readonly then?: never;
}
export class referenceFileLocation {
    declare private readonly $goType: void;
    public constructor(public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public ref: {
        value: FileReference__from_ast;
    } | undefined, public packageId: PackageId__from___go_module, public isSynthetic: bool) {
    }
    static $copy($source: referenceFileLocation): referenceFileLocation {
        return new referenceFileLocation($source.file, $source.node, $source.ref, PackageId__from___go_module.$copy($source.packageId), $source.isSynthetic);
    }
    static $equal($left: referenceFileLocation, $right: referenceFileLocation): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.file, $right.file)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.node, $right.node) &&
            $left.ref
                ===
                    $right.ref && PackageId__from___go_module.$equal($left.packageId, $right.packageId) && $left.isSynthetic === $right.isSynthetic;
    }
    static $hash($source: referenceFileLocation): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.file));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.node));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.ref));
        $hash = GoMapHash.mix($hash, PackageId__from___go_module.$hash($source.packageId));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isSynthetic));
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$compiler$diagnosticAt(r: {
        value: referenceFileLocation;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node === undefined)) {
            return CreateDiagnosticForNodeInSourceFile__from_tsoptions((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node, message, args);
        }
        else {
            return NewDiagnostic__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file, TextRange__from_core.$copy(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextRange), message, args);
        }
    }
    static $go$private$compiler$text(r: {
        value: referenceFileLocation;
    } | undefined): gostring {
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node === undefined)) {
            if (!NodeIsSynthesized__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node)) {
                return goStringSlice(SourceFile__from_ast.Text((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file), SkipTrivia__from_scanner(SourceFile__from_ast.Text((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file), TextRange__from_core.$fromStorage(Node__from_ast.$storageOf((((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos()), Node__from_ast.End((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node));
            }
            else {
                return fmt__from_gostdlib.Sprintf("\"%s\"", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Node__from_ast.Text((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node))]));
            }
        }
        else {
            return goStringSlice(SourceFile__from_ast.Text((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file), ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextRange.Pos(), ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextRange.End());
        }
    }
}
export class automaticTypeDirectiveFileData {
    declare private readonly $goType: void;
    public constructor(public typeReference: gostring, public packageId: PackageId__from___go_module) {
    }
    static $copy($source: automaticTypeDirectiveFileData): automaticTypeDirectiveFileData {
        return new automaticTypeDirectiveFileData($source.typeReference, PackageId__from___go_module.$copy($source.packageId));
    }
    static $equal($left: automaticTypeDirectiveFileData, $right: automaticTypeDirectiveFileData): bool {
        return $left.typeReference === $right.typeReference && PackageId__from___go_module.$equal($left.packageId, $right.packageId);
    }
    static $hash($source: automaticTypeDirectiveFileData): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.typeReference));
        $hash = GoMapHash.mix($hash, PackageId__from___go_module.$hash($source.packageId));
        return $hash;
    }
    declare private readonly then?: never;
}
