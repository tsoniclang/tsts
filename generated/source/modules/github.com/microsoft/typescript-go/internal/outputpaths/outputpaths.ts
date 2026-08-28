import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { JsxEmit as JsxEmit__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { IsJsonSourceFile as IsJsonSourceFile__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, JsxEmitPreserve$constant as JsxEmitPreserve$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ChangeExtension as ChangeExtension__from_tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ComparePaths as ComparePaths__from_tspath, ContainsPath as ContainsPath__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTsBuildInfo$string as ExtensionTsBuildInfo$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDeclarationEmitExtensionForPath as GetDeclarationEmitExtensionForPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath, ResolvePath as ResolvePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool } from "../../../../../../support/interface-methods.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export interface OutputPathsHost extends GoInterfaceValue {
    CommonSourceDirectory(): gostring;
    GetCurrentDirectory(): gostring;
    UseCaseSensitiveFileNames(): bool;
}
export const OutputPathsHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool]);
export function OutputPathsHost$is(value: GoInterfaceValue | undefined): value is OutputPathsHost {
    return value !== undefined && value.$go$implements(OutputPathsHost$contract);
}
export class OutputPaths {
    declare private readonly $goType: void;
    public constructor(public jsFilePath: gostring, public sourceMapFilePath: gostring, public declarationFilePath: gostring, public declarationMapPath: gostring) {
    }
    declare private readonly then?: never;
    static DeclarationFilePath(o: OutputPaths | undefined): gostring {
        return (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarationFilePath;
    }
    static DeclarationMapPath(o: OutputPaths | undefined): gostring {
        return (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarationMapPath;
    }
    static JsFilePath(o: OutputPaths | undefined): gostring {
        return (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).jsFilePath;
    }
    static SourceMapFilePath(o: OutputPaths | undefined): gostring {
        return (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceMapFilePath;
    }
}
export function GetOutputPathsFor(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, host: OutputPathsHost | undefined, forceDtsEmit: bool): OutputPaths | undefined {
    let ownOutputFilePath = getOwnEmitOutputFilePath(SourceFile__from_ast.FileName(sourceFile), options, host, GetOutputExtension(SourceFile__from_ast.FileName(sourceFile), (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx));
    let isJsonFile = IsJsonSourceFile__from_ast(sourceFile);
    let __gotots_logical_result_0 = isJsonFile;
    if (__gotots_logical_result_0) {
        const __gotots_argument_2 = SourceFile__from_ast.FileName(sourceFile);
        const __gotots_argument_3 = ownOutputFilePath;
        const __gotots_receiver_0 = host;
        const __gotots_field_0 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_0).GetCurrentDirectory();
        const __gotots_receiver_1 = host;
        const __gotots_field_1 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_1).UseCaseSensitiveFileNames();
        const __gotots_argument_4 = new ComparePathsOptions__from_tspath(__gotots_field_1, __gotots_field_0);
        const __gotots_binary_operand_0 = ComparePaths__from_tspath(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        const __gotots_binary_operand_1 = 0;
        __gotots_logical_result_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
    }
    let isJsonEmittedToSameLocation = __gotots_logical_result_0;
    let paths: OutputPaths | undefined = new OutputPaths("", "", "", "");
    if (!((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDeclarationOnly === TSTrue$constant__from_core()) && !isJsonEmittedToSameLocation) {
        (paths ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).jsFilePath = ownOutputFilePath;
        if (!IsJsonSourceFile__from_ast(sourceFile)) {
            (paths ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceMapFilePath = GetSourceMapFilePath((paths ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).jsFilePath, options);
        }
    }
    if (forceDtsEmit || CompilerOptions__from_core.GetEmitDeclarations(options) && !isJsonFile) {
        (paths ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarationFilePath = GetDeclarationEmitOutputFilePath(SourceFile__from_ast.FileName(sourceFile), options, host);
        if (CompilerOptions__from_core.GetAreDeclarationMapsEnabled(options)) {
            (paths ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarationMapPath = (paths ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarationFilePath + ".map";
        }
    }
    return paths;
}
export function ForEachEmittedFile(host: OutputPathsHost | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, action: (($0: OutputPaths | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, forceDtsEmit: bool): bool {
    const __gotots_range_0 = sourceFiles;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
        const __gotots_callee_0 = action;
        const __gotots_argument_0 = GetOutputPathsFor(sourceFile, options, host, forceDtsEmit);
        const __gotots_argument_1 = sourceFile;
        if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1)) {
            return true;
        }
    }
    return false;
}
export function GetOutputJSFileName(inputFileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: OutputPathsHost | undefined): gostring {
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDeclarationOnly)) {
        return "";
    }
    let outputFileName = GetOutputJSFileNameWorker(inputFileName, options, host);
    let __gotots_logical_result_1 = !FileExtensionIs__from_tspath(outputFileName, ExtensionJson$string__from_tspath);
    if (!__gotots_logical_result_1) {
        const __gotots_argument_5 = inputFileName;
        const __gotots_argument_6 = outputFileName;
        const __gotots_receiver_2 = host;
        const __gotots_field_2 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_2).GetCurrentDirectory();
        const __gotots_receiver_3 = host;
        const __gotots_field_3 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_3).UseCaseSensitiveFileNames();
        const __gotots_argument_7 = new ComparePathsOptions__from_tspath(__gotots_field_3, __gotots_field_2);
        const __gotots_binary_operand_2 = ComparePaths__from_tspath(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
        const __gotots_binary_operand_3 = 0;
        __gotots_logical_result_1 = __gotots_binary_operand_2 !== __gotots_binary_operand_3;
    }
    if (__gotots_logical_result_1) {
        return outputFileName;
    }
    return "";
}
export function GetOutputJSFileNameWorker(inputFileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: OutputPathsHost | undefined): gostring {
    return ChangeExtension__from_tspath(getOutputPathWithoutChangingExtension(inputFileName, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir, host), GetOutputExtension(inputFileName, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx));
}
export function GetOutputDeclarationFileNameWorker(inputFileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: OutputPathsHost | undefined): gostring {
    let dir: CompilerOptions__from_core["DeclarationDir"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir;
    if (dir.length === 0) {
        dir = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir;
    }
    return ChangeExtension__from_tspath(getOutputPathWithoutChangingExtension(inputFileName, dir, host), GetDeclarationEmitExtensionForPath__from_tspath(inputFileName));
}
export function GetOutputExtension(fileName: gostring, jsx: JsxEmit__from_core): gostring {
    __gotots_control_target_0: {
        if (FileExtensionIs__from_tspath(fileName, ExtensionJson$string__from_tspath)) {
            return ExtensionJson$string__from_tspath;
        }
        else if (jsx === JsxEmitPreserve$constant__from_core() && FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionJsx$string__from_tspath, ExtensionTsx$string__from_tspath]))) {
            return ExtensionJsx$string__from_tspath;
        }
        else if (FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionMts$string__from_tspath, ExtensionMjs$string__from_tspath]))) {
            return ExtensionMjs$string__from_tspath;
        }
        else if (FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionCts$string__from_tspath, ExtensionCjs$string__from_tspath]))) {
            return ExtensionCjs$string__from_tspath;
        }
        else {
            return ExtensionJs$string__from_tspath;
        }
    }
}
export function GetDeclarationEmitOutputFilePath(file: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: OutputPathsHost | undefined): gostring {
    let outputDir: tsonicTypeScriptRuntime.Location<gostring> | undefined = void 0;
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir.length > 0) {
        const __gotots_store_0 = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        outputDir =
            tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "DeclarationDir");
    }
    else if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir.length > 0) {
        const __gotots_store_1 = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        outputDir =
            tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "OutDir");
    }
    let path = "";
    if (!(outputDir === undefined)) {
        const __gotots_argument_14 = file;
        const __gotots_argument_15 = ((outputDir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
        const __gotots_receiver_7 = host;
        const __gotots_argument_16 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_7).GetCurrentDirectory();
        const __gotots_receiver_8 = host;
        const __gotots_argument_17 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_8).CommonSourceDirectory();
        const __gotots_receiver_9 = host;
        const __gotots_argument_18 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_9).UseCaseSensitiveFileNames();
        path = GetSourceFilePathInNewDirWorker(__gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
    }
    else {
        path = file;
    }
    let declarationExtension = GetDeclarationEmitExtensionForPath__from_tspath(path);
    return RemoveFileExtension__from_tspath(path) + declarationExtension;
}
export function GetSourceFilePathInNewDir(fileName: gostring, newDirPath: gostring, currentDirectory: gostring, commonSourceDirectory: gostring, useCaseSensitiveFileNames: bool): gostring {
    let sourceFilePath = GetNormalizedAbsolutePath__from_tspath(fileName, currentDirectory);
    commonSourceDirectory = EnsureTrailingDirectorySeparator__from_tspath(commonSourceDirectory);
    let isSourceFileInCommonSourceDirectory = ContainsPath__from_tspath(commonSourceDirectory, sourceFilePath, new ComparePathsOptions__from_tspath(useCaseSensitiveFileNames, currentDirectory));
    if (isSourceFileInCommonSourceDirectory) {
        sourceFilePath = goStringSlice(sourceFilePath, commonSourceDirectory.length);
    }
    return CombinePaths__from_tspath(newDirPath, RuntimeSlice.literal<gostring>([sourceFilePath]));
}
export function getOutputPathWithoutChangingExtension(inputFileName: gostring, outputDirectory: gostring, host: OutputPathsHost | undefined): gostring {
    if (outputDirectory.length > 0) {
        const __gotots_argument_23 = outputDirectory;
        const __gotots_receiver_10 = host;
        const __gotots_argument_19 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_10).CommonSourceDirectory();
        const __gotots_argument_20 = inputFileName;
        const __gotots_receiver_11 = host;
        const __gotots_field_4 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_11).UseCaseSensitiveFileNames();
        const __gotots_receiver_12 = host;
        const __gotots_field_5 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_12).GetCurrentDirectory();
        const __gotots_argument_21 = new ComparePathsOptions__from_tspath(__gotots_field_4, __gotots_field_5);
        const __gotots_argument_22 = GetRelativePathFromDirectory__from_tspath(__gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
        const __gotots_argument_24 = RuntimeSlice.literal<gostring>([__gotots_argument_22]);
        return ResolvePath__from_tspath(__gotots_argument_23, __gotots_argument_24);
    }
    return inputFileName;
}
export function GetSourceFilePathInNewDirWorker(fileName: gostring, newDirPath: gostring, currentDirectory: gostring, commonSourceDirectory: gostring, useCaseSensitiveFileNames: bool): gostring {
    let sourceFilePath = GetNormalizedAbsolutePath__from_tspath(fileName, currentDirectory);
    let commonDir = GetCanonicalFileName__from_tspath(commonSourceDirectory, useCaseSensitiveFileNames);
    let canonFile = GetCanonicalFileName__from_tspath(sourceFilePath, useCaseSensitiveFileNames);
    let isSourceFileInCommonSourceDirectory = strings__from_gostdlib.HasPrefix(canonFile, commonDir);
    if (isSourceFileInCommonSourceDirectory) {
        sourceFilePath = goStringSlice(sourceFilePath, commonSourceDirectory.length);
    }
    return CombinePaths__from_tspath(newDirPath, RuntimeSlice.literal<gostring>([sourceFilePath]));
}
export function getOwnEmitOutputFilePath(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: OutputPathsHost | undefined, extension: gostring): gostring {
    let emitOutputFilePathWithoutExtension = "";
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir.length > 0) {
        const __gotots_receiver_4 = host;
        let currentDirectory = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_4).GetCurrentDirectory();
        const __gotots_argument_8 = fileName;
        const __gotots_argument_9: CompilerOptions__from_core["OutDir"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir;
        const __gotots_argument_10 = currentDirectory;
        const __gotots_receiver_5 = host;
        const __gotots_argument_11 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_5).CommonSourceDirectory();
        const __gotots_receiver_6 = host;
        const __gotots_argument_12 = goInterfaceNonNil<OutputPathsHost>(__gotots_receiver_6).UseCaseSensitiveFileNames();
        const __gotots_argument_13 = GetSourceFilePathInNewDir(__gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
        emitOutputFilePathWithoutExtension = RemoveFileExtension__from_tspath(__gotots_argument_13);
    }
    else {
        emitOutputFilePathWithoutExtension = RemoveFileExtension__from_tspath(fileName);
    }
    return emitOutputFilePathWithoutExtension + extension;
}
export function GetSourceMapFilePath(jsFilePath: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap) && !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) {
        return jsFilePath + ".map";
    }
    return "";
}
export function GetBuildInfoFileName(options: {
    value: CompilerOptions__from_core;
} | undefined, opts: ComparePathsOptions__from_tspath): gostring {
    if (!CompilerOptions__from_core.IsIncremental(options) && !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Build)) {
        return "";
    }
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile !== "") {
        return (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile;
    }
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath === "") {
        return "";
    }
    let configFileExtensionLess = RemoveFileExtension__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
    let buildInfoExtensionLess = "";
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "") {
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir !== "") {
            buildInfoExtensionLess = ResolvePath__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir, RuntimeSlice.literal<gostring>([GetRelativePathFromDirectory__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir, configFileExtensionLess, ComparePathsOptions__from_tspath.$copy(opts))]));
        }
        else {
            buildInfoExtensionLess = CombinePaths__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir, RuntimeSlice.literal<gostring>([GetBaseFileName__from_tspath(configFileExtensionLess)]));
        }
    }
    else {
        buildInfoExtensionLess = configFileExtensionLess;
    }
    return buildInfoExtensionLess + ExtensionTsBuildInfo$string__from_tspath;
}
