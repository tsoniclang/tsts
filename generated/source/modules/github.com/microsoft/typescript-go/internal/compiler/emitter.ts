import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, HasFileName as HasFileName__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitContext as EmitContext__from_printer, EmitHost as EmitHost__from_printer, EmitResolver as EmitResolver__from_printer, EmitTextWriter as EmitTextWriter__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { EmitHost } from "./emitHost.js";
import type { EmitResult } from "./program.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { DiagnosticsCollection as DiagnosticsCollection__from_ast, IsInJSFile as IsInJSFile__from_ast, IsJsonSourceFile as IsJsonSourceFile__from_ast, IsSourceFileJS as IsSourceFileJS__from_ast, NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewReferenceResolver as NewReferenceResolver__from_binder, ReferenceResolverHooks as ReferenceResolverHooks__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { CompilerOptions as CompilerOptions__from_core, LanguageVariantJSX$constant as LanguageVariantJSX$constant__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindES2015$constant as ModuleKindES2015$constant__from_core, ModuleKindES2020$constant as ModuleKindES2020$constant__from_core, ModuleKindES2022$constant as ModuleKindES2022$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleKindNode16$constant as ModuleKindNode16$constant__from_core, ModuleKindNode18$constant as ModuleKindNode18$constant__from_core, ModuleKindNode20$constant as ModuleKindNode20$constant__from_core, ModuleKindNodeNext$constant as ModuleKindNodeNext$constant__from_core, ModuleKindPreserve$constant as ModuleKindPreserve$constant__from_core, NewLineKindCRLF$constant as NewLineKindCRLF$constant__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { GetCommonSourceDirectory as GetCommonSourceDirectory__from_outputpaths, GetSourceFilePathInNewDirWorker as GetSourceFilePathInNewDirWorker__from_outputpaths, GetSourceFilePathInNewDir as GetSourceFilePathInNewDir__from_outputpaths, OutputPaths as OutputPaths__from_outputpaths } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { GetEmitContext as GetEmitContext__from_printer, NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Generator as Generator__from_sourcemap, NewGenerator as NewGenerator__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import { AddUTF8ByteOrderMark as AddUTF8ByteOrderMark__from_stringutil, EncodeURI as EncodeURI__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { PhaseEmit$constant as PhaseEmit$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { DeclarationTransformer as DeclarationTransformer__from_declarations, NewDeclarationTransformer as NewDeclarationTransformer__from_declarations } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/declarations/package.js";
import { GetESTransformer as GetESTransformer__from_estransforms, NewUseStrictTransformer as NewUseStrictTransformer__from_estransforms } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/estransforms/package.js";
import { NewConstEnumInliningTransformer as NewConstEnumInliningTransformer__from_inliners } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/inliners/package.js";
import { NewJSXTransformer as NewJSXTransformer__from_jsxtransforms } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/jsxtransforms/package.js";
import { NewCommonJSModuleTransformer as NewCommonJSModuleTransformer__from_moduletransforms, NewESModuleTransformer as NewESModuleTransformer__from_moduletransforms, NewImpliedModuleTransformer as NewImpliedModuleTransformer__from_moduletransforms } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/moduletransforms/package.js";
import { TransformOptions as TransformOptions__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { NewImportElisionTransformer as NewImportElisionTransformer__from_tstransforms, NewLegacyDecoratorsTransformer as NewLegacyDecoratorsTransformer__from_tstransforms, NewMetadataTransformer as NewMetadataTransformer__from_tstransforms, NewRuntimeSyntaxTransformer as NewRuntimeSyntaxTransformer__from_tstransforms, NewTypeEraserTransformer as NewTypeEraserTransformer__from_tstransforms } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/tstransforms/package.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ComparePaths as ComparePaths__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathToDirectoryOrUrl as GetRelativePathToDirectoryOrUrl__from_tspath, GetRootLength as GetRootLength__from_tspath, NormalizePath as NormalizePath__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void, $goDeferred$Named_ast$HasFileName_to_Named_core$ModuleKind as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Filter$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { IfElse$Named_core$Tristate, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Some$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetEmitModuleFormatOfFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$IsSourceFileFromExternalLibrary$PointerTo_Named_ast$SourceFile_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$SourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../support/maps.js";
import { SourceMapEmitResult, WriteFileData } from "./program.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
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
export type EmitOnly = uint8;
export function EmitAll$constant(): EmitOnly {
    return 0;
}
export function EmitOnlyJs$constant(): EmitOnly {
    return 1;
}
export function EmitOnlyDts$constant(): EmitOnly {
    return 2;
}
export function EmitOnlyForcedDts$constant(): EmitOnly {
    return 3;
}
export class emitter {
    declare private readonly $goType: void;
    public constructor(public host: EmitHost | undefined, public emitOnly: EmitOnly, public emitterDiagnostics: DiagnosticsCollection__from_ast, public writer: EmitTextWriter__from_printer | undefined, public paths: OutputPaths__from_outputpaths | undefined, public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public emitResult: EmitResult, public writeFile: (($0: gostring, $1: gostring, $2: WriteFileData | undefined) => GoInterface | undefined) | undefined, public tr: {
        value: Tracing__from_tracing;
    } | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$compiler$emit(e: emitter | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr, PhaseEmit$constant__from_tracing(), "emit", GoMap.make(1, [["path", new GoInterfaceAdapter(SourceFile__from_ast.Path((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile).$value)]]), true);
                        const __gotots_deferred_1 = $goDeferred$void_to_void.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    emitter.$go$private$compiler$emitJSFile(e, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, OutputPaths__from_outputpaths.JsFilePath((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paths), OutputPaths__from_outputpaths.SourceMapFilePath((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paths));
                    emitter.$go$private$compiler$emitDeclarationFile(e, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, OutputPaths__from_outputpaths.DeclarationFilePath((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paths), OutputPaths__from_outputpaths.DeclarationMapPath((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paths));
                    const __gotots_store_0 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.Diagnostics = DiagnosticsCollection__from_ast.GetDiagnostics(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "emitterDiagnostics"));
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
    }
    static $go$private$compiler$emitDeclarationFile(e: emitter | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, declarationFilePath: gostring, declarationMapPath: gostring): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_13 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    let options: {
                        value: CompilerOptions__from_core;
                    } | undefined = goInterfaceNonNil<EmitHost>(__gotots_receiver_13).Options();
                    if (sourceFile === undefined || (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitOnlyJs$constant() || declarationFilePath.length === 0) {
                        break __gotots_return_block_0;
                    }
                    if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr, PhaseEmit$constant__from_tracing(), "emitDeclarationFileOrBundle", GoMap.make(1, [["declarationFilePath", new GoInterfaceAdapter(declarationFilePath)]]), true);
                        const __gotots_deferred_1 = $goDeferred$void_to_void.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    const __gotots_results_1 = GetEmitContext__from_printer();
                    let emitContext: {
                        value: EmitContext__from_printer;
                    } | undefined = __gotots_results_1[0];
                    let putEmitContext: (() => void) | undefined = __gotots_results_1[1];
                    const __gotots_callee_1: (() => void) | undefined = putEmitContext;
                    const __gotots_deferred_2 = $goDeferred$void_to_void.resolve(__gotots_callee_1);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    });
                    const __gotots_results_2 = emitter.$go$private$compiler$runDeclarationTransformers(e, emitContext, sourceFile, declarationFilePath, declarationMapPath);
                    sourceFile = __gotots_results_2[0];
                    let diags = __gotots_results_2[1];
                    const __gotots_range_0 = diags;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                        let elem: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_0;
                        const __gotots_store_1 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        DiagnosticsCollection__from_ast.Add(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "emitterDiagnostics"), elem);
                    }
                    let __gotots_logical_result_2 = !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitOnlyForcedDts$constant());
                    if (__gotots_logical_result_2) {
                        let __gotots_logical_result_1 = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit === TSTrue$constant__from_core();
                        if (!__gotots_logical_result_1) {
                            const __gotots_receiver_14 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                            const __gotots_argument_18 = declarationFilePath;
                            __gotots_logical_result_1 = goInterfaceNonNil<EmitHost>(__gotots_receiver_14).IsEmitBlocked(__gotots_argument_18);
                        }
                        __gotots_logical_result_2 = (__gotots_logical_result_1);
                    }
                    if (__gotots_logical_result_2) {
                        (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmitSkipped = true;
                        break __gotots_return_block_0;
                    }
                    let declBlocked = diags.length > 0 && !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitOnlyForcedDts$constant());
                    if (declBlocked) {
                        (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmitSkipped = true;
                        break __gotots_return_block_0;
                    }
                    let printerOptions = new PrinterOptions__from_printer(Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RemoveComments), (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine, true, CompilerOptions__from_core.GetEmitScriptTarget(options), !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitOnlyForcedDts$constant()) && Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap), Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap), false, true, true, false, false, false);
                    let printer__shadow_1: Printer__from_printer | undefined = NewPrinter__from_printer(PrinterOptions__from_printer.$copy(printerOptions), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
                    const __gotots_field_2 = IfElse$Named_core$Tristate(!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitOnlyForcedDts$constant()) && Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap), TSTrue$constant__from_core(), TSFalse$constant__from_core());
                    const __gotots_field_3: CompilerOptions__from_core["SourceRoot"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot;
                    const __gotots_field_4: CompilerOptions__from_core["MapRoot"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot;
                    const __gotots_struct_0 = CompilerOptions__from_core.$zero();
                    __gotots_struct_0.SourceMap = __gotots_field_2;
                    __gotots_struct_0.SourceRoot = __gotots_field_3;
                    __gotots_struct_0.MapRoot = __gotots_field_4;
                    let declarationMapOptions: {
                        value: CompilerOptions__from_core;
                    } | undefined = { value: __gotots_struct_0 };
                    emitter.$go$private$compiler$printSourceFile(e, declarationFilePath, declarationMapPath, sourceFile, printer__shadow_1, declarationMapOptions, shouldEmitSourceMaps(declarationMapOptions, sourceFile));
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
    }
    static $go$private$compiler$emitJSFile(e: emitter | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, jsFilePath: gostring, sourceMapFilePath: gostring): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_11 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    let options: {
                        value: CompilerOptions__from_core;
                    } | undefined = goInterfaceNonNil<EmitHost>(__gotots_receiver_11).Options();
                    if (sourceFile === undefined || !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitAll$constant()) && !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitOnly === EmitOnlyJs$constant()) || jsFilePath.length === 0) {
                        break __gotots_return_block_0;
                    }
                    let __gotots_logical_result_0 = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit === TSTrue$constant__from_core();
                    if (!__gotots_logical_result_0) {
                        const __gotots_receiver_12 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                        const __gotots_argument_17 = jsFilePath;
                        __gotots_logical_result_0 = goInterfaceNonNil<EmitHost>(__gotots_receiver_12).IsEmitBlocked(__gotots_argument_17);
                    }
                    if (__gotots_logical_result_0) {
                        (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmitSkipped = true;
                        break __gotots_return_block_0;
                    }
                    if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr, PhaseEmit$constant__from_tracing(), "emitJsFileOrBundle", GoMap.make(1, [["jsFilePath", new GoInterfaceAdapter(jsFilePath)]]), true);
                        const __gotots_deferred_1 = $goDeferred$void_to_void.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    const __gotots_results_0 = GetEmitContext__from_printer();
                    let emitContext: {
                        value: EmitContext__from_printer;
                    } | undefined = __gotots_results_0[0];
                    let putEmitContext: (() => void) | undefined = __gotots_results_0[1];
                    const __gotots_callee_1: (() => void) | undefined = putEmitContext;
                    const __gotots_deferred_2 = $goDeferred$void_to_void.resolve(__gotots_callee_1);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    });
                    sourceFile = emitter.$go$private$compiler$runScriptTransformers(e, emitContext, sourceFile);
                    let printerOptions = new PrinterOptions__from_printer(Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RemoveComments), (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine, Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitHelpers), (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target, Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap), Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap), Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSources), false, false, false, false, false);
                    let printer__shadow_1: Printer__from_printer | undefined = NewPrinter__from_printer(PrinterOptions__from_printer.$copy(printerOptions), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
                    emitter.$go$private$compiler$printSourceFile(e, jsFilePath, sourceMapFilePath, sourceFile, printer__shadow_1, options, shouldEmitSourceMaps(options, sourceFile));
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
    }
    static $go$private$compiler$getDeclarationTransformers(e: emitter | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, declarationFilePath: gostring, declarationMapPath: gostring): RuntimeSlice<DeclarationTransformer__from_declarations | undefined> {
        const __gotots_argument_68 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_69 = emitContext;
        const __gotots_receiver_49 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_70 = goInterfaceNonNil<EmitHost>(__gotots_receiver_49).Options();
        const __gotots_argument_71 = declarationFilePath;
        const __gotots_argument_72 = declarationMapPath;
        let transform: DeclarationTransformer__from_declarations | undefined = NewDeclarationTransformer__from_declarations(__gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
        return RuntimeSlice.literal<DeclarationTransformer__from_declarations | undefined>([transform]);
    }
    static $go$private$compiler$getSourceMapDirectory(e: emitter | undefined, mapOptions: {
        value: CompilerOptions__from_core;
    } | undefined, filePath: gostring, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): gostring {
        if ((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot.length > 0) {
            const __gotots_receiver_37 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            return goInterfaceNonNil<EmitHost>(__gotots_receiver_37).CommonSourceDirectory();
        }
        if ((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot.length > 0) {
            let sourceMapDir = NormalizeSlashes__from_tspath((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot);
            if (!(sourceFile === undefined)) {
                const __gotots_argument_42 = SourceFile__from_ast.FileName(sourceFile);
                const __gotots_argument_43 = sourceMapDir;
                const __gotots_receiver_38 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_44 = goInterfaceNonNil<EmitHost>(__gotots_receiver_38).GetCurrentDirectory();
                const __gotots_receiver_39 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_45 = goInterfaceNonNil<EmitHost>(__gotots_receiver_39).CommonSourceDirectory();
                const __gotots_receiver_40 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_46 = goInterfaceNonNil<EmitHost>(__gotots_receiver_40).UseCaseSensitiveFileNames();
                const __gotots_argument_47 = GetSourceFilePathInNewDir__from_outputpaths(__gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46);
                sourceMapDir = GetDirectoryPath__from_tspath(__gotots_argument_47);
            }
            if (GetRootLength__from_tspath(sourceMapDir) === 0) {
                const __gotots_receiver_41 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_48 = goInterfaceNonNil<EmitHost>(__gotots_receiver_41).CommonSourceDirectory();
                const __gotots_argument_49 = RuntimeSlice.literal<gostring>([sourceMapDir]);
                sourceMapDir = CombinePaths__from_tspath(__gotots_argument_48, __gotots_argument_49);
            }
            return sourceMapDir;
        }
        return GetDirectoryPath__from_tspath(NormalizePath__from_tspath(filePath));
    }
    static $go$private$compiler$getSourceMappingURL(e: emitter | undefined, mapOptions: {
        value: CompilerOptions__from_core;
    } | undefined, sourceMapGenerator: Generator__from_sourcemap | undefined, filePath: gostring, sourceMapFilePath: gostring, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): gostring {
        if (Tristate_IsTrue__from_core((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) {
            return Generator__from_sourcemap.Base64DataURL(sourceMapGenerator);
        }
        let sourceMapFile = GetBaseFileName__from_tspath(NormalizeSlashes__from_tspath(sourceMapFilePath));
        if ((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot.length > 0) {
            let sourceMapDir = NormalizeSlashes__from_tspath((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot);
            if (!(sourceFile === undefined)) {
                const __gotots_argument_50 = SourceFile__from_ast.FileName(sourceFile);
                const __gotots_argument_51 = sourceMapDir;
                const __gotots_receiver_42 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_52 = goInterfaceNonNil<EmitHost>(__gotots_receiver_42).GetCurrentDirectory();
                const __gotots_receiver_43 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_53 = goInterfaceNonNil<EmitHost>(__gotots_receiver_43).CommonSourceDirectory();
                const __gotots_receiver_44 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_54 = goInterfaceNonNil<EmitHost>(__gotots_receiver_44).UseCaseSensitiveFileNames();
                const __gotots_argument_55 = GetSourceFilePathInNewDir__from_outputpaths(__gotots_argument_50, __gotots_argument_51, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54);
                sourceMapDir = GetDirectoryPath__from_tspath(__gotots_argument_55);
            }
            if (GetRootLength__from_tspath(sourceMapDir) === 0) {
                const __gotots_receiver_45 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_56 = goInterfaceNonNil<EmitHost>(__gotots_receiver_45).CommonSourceDirectory();
                const __gotots_argument_57 = RuntimeSlice.literal<gostring>([sourceMapDir]);
                sourceMapDir = CombinePaths__from_tspath(__gotots_argument_56, __gotots_argument_57);
                const __gotots_argument_58 = GetDirectoryPath__from_tspath(NormalizePath__from_tspath(filePath));
                const __gotots_argument_59 = CombinePaths__from_tspath(sourceMapDir, RuntimeSlice.literal<gostring>([sourceMapFile]));
                const __gotots_argument_60 = true;
                const __gotots_receiver_46 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_field_14 = goInterfaceNonNil<EmitHost>(__gotots_receiver_46).UseCaseSensitiveFileNames();
                const __gotots_receiver_47 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_field_15 = goInterfaceNonNil<EmitHost>(__gotots_receiver_47).GetCurrentDirectory();
                const __gotots_argument_61 = new ComparePathsOptions__from_tspath(__gotots_field_14, __gotots_field_15);
                const __gotots_argument_62 = GetRelativePathToDirectoryOrUrl__from_tspath(__gotots_argument_58, __gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
                return EncodeURI__from_stringutil(__gotots_argument_62);
            }
            else {
                return EncodeURI__from_stringutil(CombinePaths__from_tspath(sourceMapDir, RuntimeSlice.literal<gostring>([sourceMapFile])));
            }
        }
        return EncodeURI__from_stringutil(sourceMapFile);
    }
    static $go$private$compiler$printSourceFile(e: emitter | undefined, jsFilePath: gostring, sourceMapFilePath: gostring, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, printer_: Printer__from_printer | undefined, mapOptions: {
        value: CompilerOptions__from_core;
    } | undefined, shouldEmitSourceMaps__shadow_1: bool): void {
        const __gotots_receiver_15 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        let options: {
            value: CompilerOptions__from_core;
        } | undefined = goInterfaceNonNil<EmitHost>(__gotots_receiver_15).Options();
        let sourceMapGenerator: Generator__from_sourcemap | undefined = void 0;
        if (shouldEmitSourceMaps__shadow_1) {
            const __gotots_argument_19 = GetBaseFileName__from_tspath(NormalizeSlashes__from_tspath(jsFilePath));
            const __gotots_argument_20 = getSourceRoot(mapOptions);
            const __gotots_argument_21 = emitter.$go$private$compiler$getSourceMapDirectory(e, mapOptions, jsFilePath, sourceFile);
            const __gotots_receiver_16 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_field_5 = goInterfaceNonNil<EmitHost>(__gotots_receiver_16).UseCaseSensitiveFileNames();
            const __gotots_receiver_17 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_field_6 = goInterfaceNonNil<EmitHost>(__gotots_receiver_17).GetCurrentDirectory();
            const __gotots_argument_22 = new ComparePathsOptions__from_tspath(__gotots_field_5, __gotots_field_6);
            sourceMapGenerator = NewGenerator__from_sourcemap(__gotots_argument_19, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22);
        }
        const __gotots_receiver_18 = printer_;
        const __gotots_store_2 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_23 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_2, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_24 = sourceFile;
        const __gotots_argument_25 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
        const __gotots_argument_26 = sourceMapGenerator;
        Printer__from_printer.Write(__gotots_receiver_18, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
        let sourceMapUrlPos = -1;
        if (!(sourceMapGenerator === undefined)) {
            if (Tristate_IsTrue__from_core((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap) || Tristate_IsTrue__from_core((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) {
                (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.SourceMaps = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.SourceMaps.append(void 0, [
                    { value: new SourceMapEmitResult(Generator__from_sourcemap.Sources(sourceMapGenerator), Generator__from_sourcemap.RawSourceMap(sourceMapGenerator), jsFilePath) },
                ]);
            }
            let sourceMappingURL = emitter.$go$private$compiler$getSourceMappingURL(e, mapOptions, sourceMapGenerator, jsFilePath, sourceMapFilePath, sourceFile);
            if (sourceMappingURL.length > 0) {
                const __gotots_receiver_19 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
                if (!goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_19).IsAtStartOfLine()) {
                    const __gotots_receiver_20 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
                    const __gotots_argument_27 = IfElse$string((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine === NewLineKindCRLF$constant__from_core(), "\r\n", "\n");
                    goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_20).RawWrite(__gotots_argument_27);
                }
                const __gotots_receiver_21 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
                sourceMapUrlPos = goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_21).GetTextPos();
                const __gotots_receiver_22 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
                const __gotots_argument_28 = "//# sourceMappingURL=";
                goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_22).WriteComment(__gotots_argument_28);
                const __gotots_receiver_23 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
                const __gotots_argument_29 = sourceMappingURL;
                goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_23).WriteComment(__gotots_argument_29);
            }
            if (sourceMapFilePath.length > 0) {
                let sourceMap = Generator__from_sourcemap.String(sourceMapGenerator);
                let err__shadow_1: GoInterface | undefined = emitter.$go$private$compiler$writeText(e, sourceMapFilePath, sourceMap, void 0);
                if (!(err__shadow_1 === undefined)) {
                    const __gotots_store_3 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "emitterDiagnostics");
                    const __gotots_argument_32 = $state__diagnostics.Could_not_write_file_0_Colon_1;
                    const __gotots_argument_30 = new GoInterfaceAdapter(jsFilePath);
                    const __gotots_receiver_24 = err__shadow_1;
                    const __gotots_argument_31 = new GoInterfaceAdapter(goInterfaceNonNil<GoInterface>(__gotots_receiver_24).Error());
                    const __gotots_argument_33 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_30, __gotots_argument_31]);
                    const __gotots_argument_34 = NewCompilerDiagnostic__from_ast(__gotots_argument_32, __gotots_argument_33);
                    DiagnosticsCollection__from_ast.Add(__gotots_receiver_25, __gotots_argument_34);
                }
                else {
                    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmittedFiles = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmittedFiles.append("", [sourceMapFilePath]);
                }
            }
        }
        else {
            const __gotots_receiver_26 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
            goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_26).WriteLine();
        }
        const __gotots_receiver_27 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
        let text = goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_27).String();
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitBOM)) {
            text = AddUTF8ByteOrderMark__from_stringutil(text);
        }
        const __gotots_field_7 = sourceMapUrlPos;
        const __gotots_store_4 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_field_8 = DiagnosticsCollection__from_ast.GetDiagnostics(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "emitterDiagnostics"));
        let data: WriteFileData | undefined = new WriteFileData(__gotots_field_7, void 0, __gotots_field_8, false);
        let err: GoInterface | undefined = emitter.$go$private$compiler$writeText(e, jsFilePath, text, data);
        let skippedDtsWrite = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SkippedDtsWrite;
        if (!(err === undefined)) {
            const __gotots_store_5 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "emitterDiagnostics");
            const __gotots_argument_37 = $state__diagnostics.Could_not_write_file_0_Colon_1;
            const __gotots_argument_35 = new GoInterfaceAdapter(jsFilePath);
            const __gotots_receiver_28 = err;
            const __gotots_argument_36 = new GoInterfaceAdapter(goInterfaceNonNil<GoInterface>(__gotots_receiver_28).Error());
            const __gotots_argument_38 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_35, __gotots_argument_36]);
            const __gotots_argument_39 = NewCompilerDiagnostic__from_ast(__gotots_argument_37, __gotots_argument_38);
            DiagnosticsCollection__from_ast.Add(__gotots_receiver_29, __gotots_argument_39);
        }
        else if (!skippedDtsWrite) {
            (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmittedFiles = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResult.EmittedFiles.append("", [jsFilePath]);
        }
        const __gotots_receiver_30 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer;
        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_30).Clear();
    }
    static $go$private$compiler$runDeclarationTransformers(e: emitter | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, declarationFilePath: gostring, declarationMapPath: gostring): [
        tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined,
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
    ] {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined,
            RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
        ] = [void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>()];
        try {
            try {
                __gotots_return_block_0: {
                    if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr, PhaseEmit$constant__from_tracing(), "transformNodes", GoMap.make(1, [["path", new GoInterfaceAdapter(SourceFile__from_ast.Path(sourceFile).$value)]]), false);
                        const __gotots_deferred_1 = $goDeferred$void_to_void.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    let diags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
                    const __gotots_range_2 = emitter.$go$private$compiler$getDeclarationTransformers(e, emitContext, declarationFilePath, declarationMapPath);
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                        let transformer: DeclarationTransformer__from_declarations | undefined = __gotots_range_value_2;
                        const __gotots_store_6 = (transformer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        sourceFile = Transformer__from_transformers.TransformSourceFile(__gotots_store_6.Transformer, sourceFile);
                        diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, DeclarationTransformer__from_declarations.GetDiagnostics(transformer), void 0);
                    }
                    __gotots_return_0 = [sourceFile, diags];
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
    static $go$private$compiler$runScriptTransformers(e: emitter | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tr, PhaseEmit$constant__from_tracing(), "transformNodes", GoMap.make(1, [["path", new GoInterfaceAdapter(SourceFile__from_ast.Path(sourceFile).$value)]]), false);
                        const __gotots_deferred_1 = $goDeferred$void_to_void.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    const __gotots_range_1 = getScriptTransformers(emitContext, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, sourceFile);
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                        let transformer: Transformer__from_transformers | undefined = __gotots_range_value_1;
                        sourceFile = Transformer__from_transformers.TransformSourceFile(transformer, sourceFile);
                    }
                    __gotots_return_0 = sourceFile;
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
    static $go$private$compiler$writeText(e: emitter | undefined, fileName: gostring, text: gostring, data: WriteFileData | undefined): GoInterface | undefined {
        if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writeFile === undefined)) {
            const __gotots_callee_0 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writeFile;
            const __gotots_argument_63 = fileName;
            const __gotots_argument_64 = text;
            const __gotots_argument_65 = data;
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
        }
        const __gotots_receiver_48 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_66 = fileName;
        const __gotots_argument_67 = text;
        return goInterfaceNonNil<EmitHost>(__gotots_receiver_48).WriteFile(__gotots_argument_66, __gotots_argument_67);
    }
}
export function getModuleTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    switch (CompilerOptions__from_core.GetEmitModuleKind((opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions)) {
        case ModuleKindPreserve$constant__from_core(): {
            return NewESModuleTransformer__from_moduletransforms(opts);
            break;
        }
        case ModuleKindESNext$constant__from_core():
        case ModuleKindES2022$constant__from_core():
        case ModuleKindES2020$constant__from_core():
        case ModuleKindES2015$constant__from_core():
        case ModuleKindNode20$constant__from_core():
        case ModuleKindNode18$constant__from_core():
        case ModuleKindNode16$constant__from_core():
        case ModuleKindNodeNext$constant__from_core():
        case ModuleKindCommonJS$constant__from_core(): {
            return NewImpliedModuleTransformer__from_moduletransforms(opts);
            break;
        }
        default: {
            return NewCommonJSModuleTransformer__from_moduletransforms(opts);
            break;
        }
    }
}
export function getScriptTransformers(emitContext: {
    value: EmitContext__from_printer;
} | undefined, host: EmitHost__from_printer | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<Transformer__from_transformers | undefined> {
    let tx = RuntimeSlice.nil<Transformer__from_transformers | undefined>();
    const __gotots_receiver_32 = host;
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = goInterfaceNonNil<EmitHost__from_printer>(__gotots_receiver_32).Options();
    let __gotots_logical_result_3 = !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax);
    if (__gotots_logical_result_3) {
        const __gotots_store_8 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_40 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_8, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        __gotots_logical_result_3 = !IsInJSFile__from_ast(__gotots_argument_40);
    }
    let importElisionEnabled = __gotots_logical_result_3;
    let jsxTransformEnabled = CompilerOptions__from_core.GetJSXTransformEnabled(options) && ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant === LanguageVariantJSX$constant__from_core();
    const __gotots_receiver_33 = host;
    let emitResolver: EmitResolver__from_printer | undefined = goInterfaceNonNil<EmitHost__from_printer>(__gotots_receiver_33).GetEmitResolver();
    let referenceResolver: ReferenceResolver__from_binder | undefined = void 0;
    if (importElisionEnabled || jsxTransformEnabled || !CompilerOptions__from_core.GetIsolatedModules(options) || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDecoratorMetadata)) {
        const __gotots_receiver_34 = emitResolver;
        const __gotots_argument_41 = sourceFile;
        goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_34).MarkLinkedReferencesRecursively(__gotots_argument_41);
        referenceResolver = emitResolver;
    }
    else {
        referenceResolver = NewReferenceResolver__from_binder(options, new ReferenceResolverHooks__from_binder(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0));
    }
    const __gotots_field_9 = emitContext;
    const __gotots_field_10 = options;
    const __gotots_field_11 = referenceResolver;
    const __gotots_field_12 = emitResolver;
    const __gotots_receiver_35 = goInterfaceNonNil(host);
    const __gotots_field_13 = DeferredCallableRegistry.register(($argument0: HasFileName__from_ast | undefined): ModuleKind__from_core => __gotots_receiver_35.GetEmitModuleFormatOfFile($argument0), ($go$recovery: GoRecovery, $argument0: HasFileName__from_ast | undefined): ModuleKind__from_core => {
        const __gotots_receiver_36: EmitHost__from_printer = goInterfaceNonNil<EmitHost__from_printer>(__gotots_receiver_35);
        const __gotots_deferred_0 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$GetEmitModuleFormatOfFile$Named_ast$HasFileName_to_Named_core$ModuleKind, __gotots_receiver_36);
        return __gotots_deferred_0 === undefined ? __gotots_receiver_36.GetEmitModuleFormatOfFile($argument0) : __gotots_deferred_0($go$recovery, __gotots_receiver_36, $argument0);
    });
    let opts = new TransformOptions__from_transformers(__gotots_field_9, __gotots_field_10, __gotots_field_11, __gotots_field_12, __gotots_field_13);
    {
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDecoratorMetadata)) {
            tx = tx.append(void 0, [NewMetadataTransformer__from_tstransforms(opts)]);
        }
        tx = tx.append(void 0, [NewTypeEraserTransformer__from_tstransforms(opts)]);
        if (importElisionEnabled) {
            tx = tx.append(void 0, [NewImportElisionTransformer__from_tstransforms(opts)]);
        }
        tx = tx.append(void 0, [NewRuntimeSyntaxTransformer__from_tstransforms(opts)]);
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators)) {
            tx = tx.append(void 0, [NewLegacyDecoratorsTransformer__from_tstransforms(opts)]);
        }
    }
    if (jsxTransformEnabled) {
        tx = tx.append(void 0, [NewJSXTransformer__from_jsxtransforms(opts)]);
    }
    let downleveler: Transformer__from_transformers | undefined = GetESTransformer__from_estransforms(opts);
    if (!(downleveler === undefined)) {
        tx = tx.append(void 0, [downleveler]);
    }
    tx = tx.append(void 0, [NewUseStrictTransformer__from_estransforms(opts)]);
    tx = tx.append(void 0, [getModuleTransformer(opts)]);
    if (!CompilerOptions__from_core.GetIsolatedModules(options)) {
        tx = tx.append(void 0, [NewConstEnumInliningTransformer__from_inliners(opts)]);
    }
    return tx;
}
export function shouldEmitSourceMaps(mapOptions: {
    value: CompilerOptions__from_core;
} | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return (Tristate_IsTrue__from_core((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap) || Tristate_IsTrue__from_core((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) && !FileExtensionIs__from_tspath(SourceFile__from_ast.FileName(sourceFile), ExtensionJson$string__from_tspath);
}
export function getSourceRoot(mapOptions: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    let sourceRoot = NormalizeSlashes__from_tspath((mapOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot);
    if (sourceRoot.length > 0) {
        sourceRoot = EnsureTrailingDirectorySeparator__from_tspath(sourceRoot);
    }
    return sourceRoot;
}
export interface SourceFileMayBeEmittedHost extends GoInterfaceValue {
    GetCurrentDirectory(): gostring;
    GetProjectReferenceFromSource($argument0: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined;
    IsSourceFileFromExternalLibrary($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool;
    Options(): {
        value: CompilerOptions__from_core;
    } | undefined;
    SourceFiles(): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    UseCaseSensitiveFileNames(): bool;
}
export const SourceFileMayBeEmittedHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$IsSourceFileFromExternalLibrary$PointerTo_Named_ast$SourceFile_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$SourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool]);
export function SourceFileMayBeEmittedHost$is(value: GoInterfaceValue | undefined): value is SourceFileMayBeEmittedHost {
    return value !== undefined && value.$go$implements(SourceFileMayBeEmittedHost$contract);
}
export function sourceFileMayBeEmitted(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, host: SourceFileMayBeEmittedHost | undefined, forceDtsEmit: bool): bool {
    const __gotots_receiver_0 = host;
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_0).Options();
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitForJsFiles) && IsSourceFileJS__from_ast(sourceFile)) {
        return false;
    }
    if (((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
        return false;
    }
    const __gotots_receiver_1 = host;
    const __gotots_argument_0 = sourceFile;
    if (goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_1).IsSourceFileFromExternalLibrary(__gotots_argument_0)) {
        return false;
    }
    if (forceDtsEmit) {
        return true;
    }
    const __gotots_receiver_2 = host;
    const __gotots_argument_1 = SourceFile__from_ast.Path(sourceFile);
    if (!(goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_2).GetProjectReferenceFromSource(__gotots_argument_1) === undefined)) {
        return false;
    }
    if (!IsJsonSourceFile__from_ast(sourceFile)) {
        return true;
    }
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir === "") {
        return false;
    }
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir !== "" || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
        const __gotots_argument_2 = options;
        const __gotots_argument_3 = (): RuntimeSlice<gostring> => {
            return RuntimeSlice.nil<gostring>();
        };
        const __gotots_receiver_3 = host;
        const __gotots_argument_4 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_3).GetCurrentDirectory();
        const __gotots_receiver_4 = host;
        const __gotots_argument_5 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_4).UseCaseSensitiveFileNames();
        const __gotots_argument_6 = void 0;
        const __gotots_argument_7 = GetCommonSourceDirectory__from_outputpaths(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
        const __gotots_receiver_5 = host;
        const __gotots_argument_8 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_5).GetCurrentDirectory();
        let commonDir = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_7, __gotots_argument_8);
        const __gotots_argument_9 = SourceFile__from_ast.FileName(sourceFile);
        const __gotots_argument_10: CompilerOptions__from_core["OutDir"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir;
        const __gotots_receiver_6 = host;
        const __gotots_argument_11 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_6).GetCurrentDirectory();
        const __gotots_argument_12 = commonDir;
        const __gotots_receiver_7 = host;
        const __gotots_argument_13 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_7).UseCaseSensitiveFileNames();
        let outputPath = GetSourceFilePathInNewDirWorker__from_outputpaths(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
        const __gotots_argument_14 = SourceFile__from_ast.FileName(sourceFile);
        const __gotots_argument_15 = outputPath;
        const __gotots_receiver_8 = host;
        const __gotots_field_0 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_8).UseCaseSensitiveFileNames();
        const __gotots_receiver_9 = host;
        const __gotots_field_1 = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_9).GetCurrentDirectory();
        const __gotots_argument_16 = new ComparePathsOptions__from_tspath(__gotots_field_0, __gotots_field_1);
        const __gotots_binary_operand_0 = ComparePaths__from_tspath(__gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
        const __gotots_binary_operand_1 = 0;
        if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
            return false;
        }
    }
    return true;
}
export function getSourceFilesToEmit(host: SourceFileMayBeEmittedHost | undefined, targetSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, forceDtsEmit: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    let sourceFiles = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>();
    if (!(targetSourceFile === undefined)) {
        sourceFiles = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>([targetSourceFile]);
    }
    else {
        const __gotots_receiver_10 = host;
        sourceFiles = goInterfaceNonNil<SourceFileMayBeEmittedHost>(__gotots_receiver_10).SourceFiles();
    }
    return Filter$PointerTo_Named_ast$SourceFile(sourceFiles, (sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        return sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit);
    });
}
export function isSourceFileNotJson(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return !IsJsonSourceFile__from_ast(file);
}
export function getDeclarationDiagnostics(host: EmitHost | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    let fullFiles = Filter$PointerTo_Named_ast$SourceFile(getSourceFilesToEmit(host, file, false), isSourceFileNotJson);
    if (!Some$PointerTo_Named_ast$SourceFile(fullFiles, (f: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation(f, file);
    })) {
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([]);
    }
    const __gotots_receiver_31 = host;
    let options: {
        value: CompilerOptions__from_core;
    } | undefined = goInterfaceNonNil<EmitHost>(__gotots_receiver_31).Options();
    let transform: DeclarationTransformer__from_declarations | undefined = NewDeclarationTransformer__from_declarations(host, void 0, options, "", "");
    const __gotots_store_7 = (transform ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    Transformer__from_transformers.TransformSourceFile(__gotots_store_7.Transformer, file);
    return DeclarationTransformer__from_declarations.GetDiagnostics(transform);
}
