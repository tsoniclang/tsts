import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ProjectReference as ProjectReference__from_core, TypeAcquisition as TypeAcquisition__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FileExtensionInfo$Storage as FileExtensionInfo__from_tsoptions$Storage, TsConfigSourceFile } from "./tsconfigparsing.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, ParsedOptions as ParsedOptions__from_core, ResolveProjectReferencePath as ResolveProjectReferencePath__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Glob as Glob__from_glob, Parse as Parse__from_glob } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/glob/package.js";
import { Locale as Locale__from_locale, Parse as Parse__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { GetBuildInfoFileName as GetBuildInfoFileName__from_outputpaths, GetCommonSourceDirectory as GetCommonSourceDirectory__from_outputpaths, GetOutputDeclarationFileNameWorker as GetOutputDeclarationFileNameWorker__from_outputpaths, GetOutputJSFileName as GetOutputJSFileName__from_outputpaths, GetSourceMapFilePath as GetSourceMapFilePath__from_outputpaths } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, HasJSFileExtension as HasJSFileExtension__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, NormalizePath as NormalizePath__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { IsImplicitGlob as IsImplicitGlob__from_vfsmatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { Filter$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_core$ProjectReference$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/Concat.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goMap$MapOf_Named_tspath$Path_To_string } from "../../../../../../support/maps.js";
import { configFileSpecs, getFileNamesFromConfigSpecs } from "./tsconfigparsing.js";
import { getWildcardDirectories } from "./wildcarddirectories.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMap, GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export const fileGlobPattern$string: gostring = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}";
export const recursiveFileGlobPattern$string: gostring = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}";
export class ParsedCommandLine {
    declare private readonly $goType: void;
    public constructor(public ParsedConfig: ParsedOptions__from_core | undefined, public ConfigFile: {
        value: TsConfigSourceFile;
    } | undefined, public Errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public Raw: GoInterface | undefined, public CompileOnSave: tsonicTypeScriptRuntime.Location<bool> | undefined, public comparePathsOptions: ComparePathsOptions__from_tspath, public wildcardDirectoriesOnce: sync__from_gostdlib.Once, public wildcardDirectories: GoMapValue<gostring, bool>, public includeGlobsOnce: sync__from_gostdlib.Once, public includeGlobs: RuntimeSlice<{
        value: Glob__from_glob;
    } | undefined>, public extraFileExtensions: RuntimeSlice<FileExtensionInfo__from_tsoptions$Storage>, public sourceAndOutputMapsOnce: sync__from_gostdlib.Once, public sourceToProjectReference: GoMapValue<Path__from_tspath, {
        value: SourceOutputAndProjectReference;
    } | undefined>, public outputDtsToProjectReference: GoMapValue<Path__from_tspath, {
        value: SourceOutputAndProjectReference;
    } | undefined>, public commonSourceDirectory: gostring, public commonSourceDirectoryOnce: sync__from_gostdlib.Once, public resolvedProjectReferencePaths: RuntimeSlice<gostring>, public resolvedProjectReferencePathsOnce: sync__from_gostdlib.Once, public literalFileNamesLen: int, public fileNamesByPath: GoMapValue<Path__from_tspath, gostring>, public fileNamesByPathOnce: sync__from_gostdlib.Once, public locale: Locale__from_locale, public localeOnce: sync__from_gostdlib.Once) {
    }
    static $copy($source: ParsedCommandLine): ParsedCommandLine {
        return new ParsedCommandLine($source.ParsedConfig, $source.ConfigFile, $source.Errors, $source.Raw, $source.CompileOnSave, ComparePathsOptions__from_tspath.$copy($source.comparePathsOptions), named_sync.SyncOnceOperations.$copy($source.wildcardDirectoriesOnce), $source.wildcardDirectories, named_sync.SyncOnceOperations.$copy($source.includeGlobsOnce), $source.includeGlobs, $source.extraFileExtensions, named_sync.SyncOnceOperations.$copy($source.sourceAndOutputMapsOnce), $source.sourceToProjectReference, $source.outputDtsToProjectReference, $source.commonSourceDirectory, named_sync.SyncOnceOperations.$copy($source.commonSourceDirectoryOnce), $source.resolvedProjectReferencePaths, named_sync.SyncOnceOperations.$copy($source.resolvedProjectReferencePathsOnce), $source.literalFileNamesLen, $source.fileNamesByPath, named_sync.SyncOnceOperations.$copy($source.fileNamesByPathOnce), Locale__from_locale.$copy($source.locale), named_sync.SyncOnceOperations.$copy($source.localeOnce));
    }
    declare private readonly then?: never;
    static CommonSourceDirectory(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): gostring {
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.commonSourceDirectoryOnce, (): void => {
            let files: (() => RuntimeSlice<gostring>) | undefined = (): RuntimeSlice<gostring> => {
                return Filter$string((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames, (file: gostring): bool => {
                    return !(Tristate_IsTrue__from_core(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitForJsFiles) && HasJSFileExtension__from_tspath(file)) && !IsDeclarationFileName__from_tspath(file);
                });
            };
            const __gotots_argument_6 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
            const __gotots_argument_7 = files;
            const __gotots_argument_8 = ParsedCommandLine.GetCurrentDirectory(p);
            const __gotots_argument_9 = ParsedCommandLine.UseCaseSensitiveFileNames(p);
            const __gotots_receiver_0 = p;
            const __gotots_argument_10 = ($argument0: RuntimeSlice<gostring>, $argument1: gostring): bool => {
                return ParsedCommandLine.$go$private$tsoptions$checkSourceFilesBelongToPath(__gotots_receiver_0, $argument0, $argument1);
            };
            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.commonSourceDirectory = GetCommonSourceDirectory__from_outputpaths(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
        });
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.commonSourceDirectory;
    }
    static CompilerOptions(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): {
        value: CompilerOptions__from_core;
    } | undefined {
        if (p === undefined) {
            return void 0;
        }
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    }
    static ConfigName(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): gostring {
        if (p === undefined) {
            return "";
        }
        return SourceFile__from_ast.FileName((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile);
    }
    static ExtendedSourceFiles(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<gostring> {
        if (p === undefined || ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile === undefined) {
            return RuntimeSlice.nil<gostring>();
        }
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedSourceFiles;
    }
    static FileNames(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<gostring> {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames;
    }
    static FileNamesByPath(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): GoMapValue<Path__from_tspath, gostring> {
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.fileNamesByPathOnce, (): void => {
            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.fileNamesByPath = $goMap$MapOf_Named_tspath$Path_To_string.make((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames.length, []);
            const __gotots_range_4 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_3);
                let fileName = __gotots_range_value_7;
                let path = ToPath__from_tspath(fileName, ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.UseCaseSensitiveFileNames(p));
                ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.fileNamesByPath.store(path, fileName);
            }
        });
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.fileNamesByPath;
    }
    static GetBuildInfoFileName(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): gostring {
        return GetBuildInfoFileName__from_outputpaths(ParsedCommandLine.CompilerOptions(p), ComparePathsOptions__from_tspath.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions));
    }
    static GetConfigFileParsingDiagnostics(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if (!(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile === undefined)) {
            return Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>([SourceFile__from_ast.Diagnostics((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile), ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Errors]));
        }
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Errors;
    }
    static GetCurrentDirectory(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): gostring {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions.CurrentDirectory;
    }
    static GetMatchedFileSpec(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, fileName: gostring): gostring {
        return configFileSpecs.$go$private$tsoptions$getMatchedFileSpec((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs, fileName, ComparePathsOptions__from_tspath.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions));
    }
    static GetMatchedIncludeSpec(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, fileName: gostring): [
        gostring,
        bool
    ] {
        if (((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).validatedIncludeSpecs.length === 0) {
            return ["", false];
        }
        if (((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isDefaultIncludeSpec) {
            return [((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).validatedIncludeSpecs.get(0), true];
        }
        return [configFileSpecs.$go$private$tsoptions$getMatchedIncludeSpec((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs, fileName, ComparePathsOptions__from_tspath.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions)), false];
    }
    static GetOutputFileNames(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): iter__from_gostdlib.Seq<gostring> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: gostring) => bool) | undefined): void => {
            const __gotots_range_3 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                const __gotots_range_value_6 = __gotots_range_3.get(__gotots_range_index_2);
                let fileName = __gotots_range_value_6;
                if (IsDeclarationFileName__from_tspath(fileName)) {
                    continue;
                }
                let jsFileName = GetOutputJSFileName__from_outputpaths(fileName, ParsedCommandLine.CompilerOptions(p), new GoInterfaceAdapter(p));
                let isJson = FileExtensionIs__from_tspath(fileName, ExtensionJson$string__from_tspath);
                if (jsFileName !== "") {
                    const __gotots_callee_3 = __go_yield;
                    const __gotots_argument_0 = jsFileName;
                    if (!(__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0)) {
                        return;
                    }
                    if (!isJson) {
                        let sourceMap = GetSourceMapFilePath__from_outputpaths(jsFileName, ParsedCommandLine.CompilerOptions(p));
                        if (sourceMap !== "") {
                            const __gotots_callee_4 = __go_yield;
                            const __gotots_argument_1 = sourceMap;
                            if (!(__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1)) {
                                return;
                            }
                        }
                    }
                }
                if (isJson) {
                    continue;
                }
                if (CompilerOptions__from_core.GetEmitDeclarations(ParsedCommandLine.CompilerOptions(p))) {
                    let dtsFileName = GetOutputDeclarationFileNameWorker__from_outputpaths(fileName, ParsedCommandLine.CompilerOptions(p), new GoInterfaceAdapter(p));
                    if (dtsFileName !== "") {
                        const __gotots_callee_5 = __go_yield;
                        const __gotots_argument_2 = dtsFileName;
                        if (!(__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2)) {
                            return;
                        }
                        if (CompilerOptions__from_core.GetAreDeclarationMapsEnabled(ParsedCommandLine.CompilerOptions(p))) {
                            let declarationMap = dtsFileName + ".map";
                            const __gotots_callee_6 = __go_yield;
                            const __gotots_argument_3 = declarationMap;
                            if (!(__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3)) {
                                return;
                            }
                        }
                    }
                }
            }
        });
    }
    static LiteralFileNames(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<gostring> {
        if (!(p === undefined) && !(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile === undefined)) {
            return ParsedCommandLine.FileNames(p).slice(0, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.literalFileNamesLen, null);
        }
        return RuntimeSlice.nil<gostring>();
    }
    static Locale(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): Locale__from_locale {
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.localeOnce, (): void => {
            const __gotots_store_0 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value;
            const __gotots_results_0 = Parse__from_locale((ParsedCommandLine.CompilerOptions(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Locale);
            __gotots_store_0.locale = __gotots_results_0[0];
        });
        return Locale__from_locale.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.locale);
    }
    static OutputDtsToProjectReference(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): GoMapValue<Path__from_tspath, {
        value: SourceOutputAndProjectReference;
    } | undefined> {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.outputDtsToProjectReference;
    }
    static ParseInputOutputNames(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): void {
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.sourceAndOutputMapsOnce, (): void => {
            let sourceToOutput: GoMapValue<Path__from_tspath, {
                value: SourceOutputAndProjectReference;
            } | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.make(0, []);
            let outputDtsToSource: GoMapValue<Path__from_tspath, {
                value: SourceOutputAndProjectReference;
            } | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.make(0, []);
            const __gotots_range_6 = named_iter.IterSeq2ValueOperations.$project(ParsedCommandLine.$go$private$tsoptions$getOutputDeclarationAndSourceFileNames(p));
            if (__gotots_range_6 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            __gotots_range_6(($argument0: gostring, $argument1: gostring): bool => {
                if (__gotots_range_state_0 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_0 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_0 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_0 = -1;
                const __gotots_range_value_12 = $argument0;
                const __gotots_range_value_13 = $argument1;
                let outputDts = __gotots_range_value_12;
                let source = __gotots_range_value_13;
                let path = ToPath__from_tspath(source, ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.UseCaseSensitiveFileNames(p));
                let projectReference: {
                    value: SourceOutputAndProjectReference;
                } | undefined = { value: new SourceOutputAndProjectReference(source, outputDts, p) };
                if (outputDts !== "") {
                    outputDtsToSource.store(ToPath__from_tspath(outputDts, ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.UseCaseSensitiveFileNames(p)), projectReference);
                }
                sourceToOutput.store(path, projectReference);
                __gotots_range_state_0 = 1;
                return true;
            });
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_0 = -2;
            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.outputDtsToProjectReference = outputDtsToSource;
            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.sourceToProjectReference = sourceToOutput;
        });
    }
    static PossiblyMatchesDirectoryName(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, directoryPath: Path__from_tspath): bool {
        const __gotots_range_2 = ParsedCommandLine.WildcardDirectories(p);
        const __gotots_range_keys_0 = __gotots_range_2.keys();
        for (const __gotots_range_value_2 of __gotots_range_keys_0) {
            const __gotots_range_value_3 = __gotots_range_2.lookupOk(__gotots_range_value_2);
            if (!__gotots_range_value_3[1]) {
                continue;
            }
            const __gotots_range_value_4 = __gotots_range_value_2;
            const __gotots_range_value_5 = __gotots_range_value_3[0];
            let wildcardDir = __gotots_range_value_4;
            let recursive = __gotots_range_value_5;
            let wildcardDirPath = ToPath__from_tspath(wildcardDir, ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.UseCaseSensitiveFileNames(p));
            if (recursive) {
                if (wildcardDirPath.ContainsPath(directoryPath)) {
                    return true;
                }
            }
            else {
                if (wildcardDirPath.$value === directoryPath.$value) {
                    return true;
                }
            }
        }
        return false;
    }
    static PossiblyMatchesFileName(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, fileName: gostring): bool {
        let path = ToPath__from_tspath(fileName, ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.UseCaseSensitiveFileNames(p));
        {
            const __gotots_results_2 = ParsedCommandLine.FileNamesByPath(p).lookupOk(path);
            let ok = __gotots_results_2[1];
            if (ok) {
                return true;
            }
        }
        const __gotots_range_0 = ((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).validatedIncludeSpecs;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let include = __gotots_range_value_0;
            if (!strings__from_gostdlib.ContainsAny(include, "*?") && !IsImplicitGlob__from_vfsmatch(include)) {
                let includePath = ToPath__from_tspath(include, ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.UseCaseSensitiveFileNames(p));
                if (includePath.$value === path.$value) {
                    return true;
                }
            }
        }
        {
            let wildcardDirectoryGlobs = ParsedCommandLine.WildcardDirectoryGlobs(p);
            if (wildcardDirectoryGlobs.length > 0) {
                const __gotots_range_1 = wildcardDirectoryGlobs;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let glob__shadow_1: {
                        value: Glob__from_glob;
                    } | undefined = __gotots_range_value_1;
                    if (Glob__from_glob.Match(glob__shadow_1, fileName)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static ProjectReferences(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<ProjectReference__from_core | undefined> {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectReferences;
    }
    static ReloadFileNamesOfParsedCommandLine(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, fs: FS__from_vfs | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined {
        let parsedConfig = ParsedOptions__from_core.$copy(ParsedOptions__from_core.$copy((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
        const __gotots_results_1 = getFileNamesFromConfigSpecs(configFileSpecs.$copy(configFileSpecs.$copy(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")))), ParsedCommandLine.GetCurrentDirectory(p), ParsedCommandLine.CompilerOptions(p), fs, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.extraFileExtensions);
        let fileNames = __gotots_results_1[0];
        let literalFileNamesLen = __gotots_results_1[1];
        parsedConfig.FileNames = fileNames;
        let parsedCommandLine = new ParsedCommandLine(parsedConfig, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Errors, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Raw, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.CompileOnSave, ComparePathsOptions__from_tspath.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions), named_sync.SyncOnceOperations.$zero(), ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.wildcardDirectories, named_sync.SyncOnceOperations.$zero(), ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.includeGlobs, ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.extraFileExtensions, named_sync.SyncOnceOperations.$zero(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), "", named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<gostring>(), named_sync.SyncOnceOperations.$zero(), literalFileNamesLen, $goMap$MapOf_Named_tspath$Path_To_string.nil(), named_sync.SyncOnceOperations.$zero(), Locale__from_locale.$zero(), named_sync.SyncOnceOperations.$zero());
        const parsedCommandLine$location = tsonicTypeScriptRuntime.boundLocation({}, () => parsedCommandLine, parsedCommandLine$next => parsedCommandLine = parsedCommandLine$next);
        return parsedCommandLine$location;
    }
    static ResolvedProjectReferencePaths(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<gostring> {
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.resolvedProjectReferencePathsOnce, (): void => {
            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.resolvedProjectReferencePaths = Map$PointerTo_Named_core$ProjectReference$string((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ProjectReferences, ResolveProjectReferencePath__from_core);
        });
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.resolvedProjectReferencePaths;
    }
    static SourceToProjectReference(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): GoMapValue<Path__from_tspath, {
        value: SourceOutputAndProjectReference;
    } | undefined> {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.sourceToProjectReference;
    }
    static TypeAcquisition(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): {
        value: TypeAcquisition__from_core;
    } | undefined {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeAcquisition;
    }
    static UseCaseSensitiveFileNames(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): bool {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions.UseCaseSensitiveFileNames;
    }
    static WildcardDirectories(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): GoMapValue<gostring, bool> {
        if (p === undefined) {
            return GoMap.nil<gostring, bool>(false);
        }
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.wildcardDirectoriesOnce, (): void => {
            if (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.wildcardDirectories.isNil()) {
                ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.wildcardDirectories = getWildcardDirectories(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).validatedIncludeSpecs, ((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).validatedExcludeSpecs, ComparePathsOptions__from_tspath.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions));
            }
        });
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.wildcardDirectories;
    }
    static WildcardDirectoryGlobs(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): RuntimeSlice<{
        value: Glob__from_glob;
    } | undefined> {
        let wildcardDirectories: GoMapValue<gostring, bool> = ParsedCommandLine.WildcardDirectories(p);
        if (wildcardDirectories.isNil()) {
            return RuntimeSlice.nil<{
                value: Glob__from_glob;
            } | undefined>();
        }
        sync__from_gostdlib.Once.Do(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.includeGlobsOnce, (): void => {
            if (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.includeGlobs.isNil()) {
                let globs = RuntimeSlice.make<{
                    value: Glob__from_glob;
                } | undefined>(0, wildcardDirectories.length(), void 0);
                const __gotots_range_5 = wildcardDirectories;
                const __gotots_range_keys_1 = __gotots_range_5.keys();
                for (const __gotots_range_value_8 of __gotots_range_keys_1) {
                    const __gotots_range_value_9 = __gotots_range_5.lookupOk(__gotots_range_value_8);
                    if (!__gotots_range_value_9[1]) {
                        continue;
                    }
                    const __gotots_range_value_10 = __gotots_range_value_8;
                    const __gotots_range_value_11 = __gotots_range_value_9[0];
                    let dir = __gotots_range_value_10;
                    let recursive = __gotots_range_value_11;
                    {
                        const __gotots_results_3 = Parse__from_glob(fmt__from_gostdlib.Sprintf("%s/%s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(NormalizePath__from_tspath(dir)), new $goInterfaceAdapter$string(IfElse$string(recursive, recursiveFileGlobPattern$string, fileGlobPattern$string))])));
                        let parsed: {
                            value: Glob__from_glob;
                        } | undefined = __gotots_results_3[0];
                        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
                        if (err === undefined) {
                            globs = globs.append(void 0, [parsed]);
                        }
                    }
                }
                ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.includeGlobs = globs;
            }
        });
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.includeGlobs;
    }
    static $go$private$tsoptions$checkSourceFilesBelongToPath(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, sourceFiles: RuntimeSlice<gostring>, rootDirectory: gostring): bool {
        let allFilesBelongToPath = true;
        const __gotots_range_8 = sourceFiles;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_8.length; __gotots_range_index_5++) {
            const __gotots_range_value_15 = __gotots_range_8.get(__gotots_range_index_5);
            let file = __gotots_range_value_15;
            let absoluteSourceFilePath = GetCanonicalFileName__from_tspath(GetNormalizedAbsolutePath__from_tspath(file, ParsedCommandLine.GetCurrentDirectory(p)), ParsedCommandLine.UseCaseSensitiveFileNames(p));
            if (!ContainsPath__from_tspath(rootDirectory, file, ComparePathsOptions__from_tspath.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.comparePathsOptions))) {
                ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Errors = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.Errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(absoluteSourceFilePath), new $goInterfaceAdapter$string(rootDirectory)]))]);
                allFilesBelongToPath = false;
            }
        }
        return allFilesBelongToPath;
    }
    static $go$private$tsoptions$getOutputDeclarationAndSourceFileNames(p: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined): iter__from_gostdlib.Seq2<gostring, gostring> {
        return named_iter.IterSeq2ValueOperations.$wrap((__go_yield: (($0: gostring, $1: gostring) => bool) | undefined): void => {
            const __gotots_range_7 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ParsedConfig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length; __gotots_range_index_4++) {
                const __gotots_range_value_14 = __gotots_range_7.get(__gotots_range_index_4);
                let fileName = __gotots_range_value_14;
                let outputDts = "";
                if (!IsDeclarationFileName__from_tspath(fileName) && !FileExtensionIs__from_tspath(fileName, ExtensionJson$string__from_tspath)) {
                    outputDts = GetOutputDeclarationFileNameWorker__from_outputpaths(fileName, ParsedCommandLine.CompilerOptions(p), new GoInterfaceAdapter(p));
                }
                const __gotots_callee_10 = __go_yield;
                const __gotots_argument_4 = outputDts;
                const __gotots_argument_5 = fileName;
                if (!(__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5)) {
                    return;
                }
            }
        });
    }
}
export function NewParsedCommandLine(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, rootFileNames: RuntimeSlice<gostring>, comparePathsOptions: ComparePathsOptions__from_tspath): tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined {
    return tsonicTypeScriptRuntime.location<ParsedCommandLine>(new ParsedCommandLine(new ParsedOptions__from_core(compilerOptions, void 0, void 0, rootFileNames, RuntimeSlice.nil<ProjectReference__from_core | undefined>()), void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), void 0, void 0, ComparePathsOptions__from_tspath.$copy(comparePathsOptions), named_sync.SyncOnceOperations.$zero(), GoMap.nil<gostring, bool>(false), named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<{
        value: Glob__from_glob;
    } | undefined>(), RuntimeSlice.nil<FileExtensionInfo__from_tsoptions$Storage>(), named_sync.SyncOnceOperations.$zero(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), "", named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<gostring>(), named_sync.SyncOnceOperations.$zero(), 0, $goMap$MapOf_Named_tspath$Path_To_string.nil(), named_sync.SyncOnceOperations.$zero(), Locale__from_locale.$zero(), named_sync.SyncOnceOperations.$zero()));
}
export class SourceOutputAndProjectReference {
    declare private readonly $goType: void;
    public constructor(public Source: gostring, public OutputDts: gostring, public Resolved: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined) {
    }
    static $copy($source: SourceOutputAndProjectReference): SourceOutputAndProjectReference {
        return new SourceOutputAndProjectReference($source.Source, $source.OutputDts, $source.Resolved);
    }
    static $equal($left: SourceOutputAndProjectReference, $right: SourceOutputAndProjectReference): bool {
        return $left.Source === $right.Source && $left.OutputDts === $right.OutputDts &&
            tsonicTypeScriptRuntime.sameLocation($left.Resolved, $right.Resolved);
    }
    static $hash($source: SourceOutputAndProjectReference): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Source));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.OutputDts));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Resolved));
        return $hash;
    }
    declare private readonly then?: never;
}
