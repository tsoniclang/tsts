import type { bool, int } from "../../go/scalars.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";
import * as fmt from "../../go/fmt.js";
import * as strings from "../../go/strings.js";
import type { GoMap, GoPtr, GoSeq, GoSeq2, GoSlice } from "../../go/compat.js";
import { Once } from "../../go/sync.js";
import type { Diagnostic } from "../ast/diagnostic.js";
import { NewCompilerDiagnostic } from "../ast/diagnostic.js";
import { File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files } from "../diagnostics/generated/messages.js";
import type { SourceFile } from "../ast/ast.js";
import { SourceFile_FileName, SourceFile_Diagnostics } from "../ast/ast.js";
import type { CompilerOptions as CompilerOptions_3bab6c7a } from "../core/compileroptions.js";
import { CompilerOptions_GetAreDeclarationMapsEnabled, CompilerOptions_GetEmitDeclarations, NormalizeCompilerOptions } from "../core/compileroptions.js";
import { Filter, IfElse, Map as core_Map } from "../core/core.js";
import type { ParsedOptions } from "../core/parsedoptions.js";
import type { ProjectReference } from "../core/projectreference.js";
import { ResolveProjectReferencePath } from "../core/projectreference.js";
import { Tristate_IsTrue } from "../core/tristate.js";
import type { TypeAcquisition as TypeAcquisition_0a5bf39c } from "../core/typeacquisition.js";
import type { WatchOptions } from "../core/watchoptions.js";
import type { Glob } from "../glob/glob.js";
import { Glob_Match, Parse as glob_Parse } from "../glob/glob.js";
import type { Locale as Locale_c4184476 } from "../locale/locale.js";
import { Parse as locale_Parse } from "../locale/locale.js";
import type { ResolvedProjectReference } from "../module/types.js";
import type { OutputPathsHost } from "../outputpaths/outputpaths.js";
import { GetBuildInfoFileName, GetOutputDeclarationFileNameWorker, GetOutputJSFileName, GetSourceMapFilePath } from "../outputpaths/outputpaths.js";
import { GetCommonSourceDirectory } from "../outputpaths/commonsourcedirectory.js";
import { ExtensionJson, HasJSFileExtension, IsDeclarationFileName } from "../tspath/extension.js";
import type { ComparePathsOptions, Path } from "../tspath/path.js";
import { ContainsPath, FileExtensionIs, GetCanonicalFileName, GetNormalizedAbsolutePath, NormalizePath, Path_ContainsPath, ToPath } from "../tspath/path.js";
import type { FS } from "../vfs/vfs.js";
import { IsImplicitGlob } from "../vfs/vfsmatch/vfsmatch.js";
import { configFileSpecs_getMatchedFileSpec, configFileSpecs_getMatchedIncludeSpec, getFileNamesFromConfigSpecs } from "./tsconfigparsing.js";
import type { FileExtensionInfo, TsConfigSourceFile } from "./tsconfigparsing.js";
import { getWildcardDirectories } from "./wildcarddirectories.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::constGroup::fileGlobPattern+recursiveFileGlobPattern","kind":"constGroup","status":"implemented","sigHash":"b72f79c30886c1bb508333146dea617bea7fa7ea2bcd9c06e79b68e1fe236c28"}
 *
 * Go source:
 * const (
 * 	fileGlobPattern          = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
 * 	recursiveFileGlobPattern = "** /*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}"
 * )
 */
export const fileGlobPattern: string = "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}";
export const recursiveFileGlobPattern: string = "**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json}";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::type::ParsedCommandLine","kind":"type","status":"implemented","sigHash":"fe8a58046a678b95837026594b9593557e0041023932ee4366c6d1126b5057c0"}
 *
 * Go source:
 * ParsedCommandLine struct {
 * 	ParsedConfig *core.ParsedOptions `json:"parsedConfig"`
 *
 * 	ConfigFile    *TsConfigSourceFile `json:"configFile"` // TsConfigSourceFile, used in Program and ExecuteCommandLine
 * 	Errors        []*ast.Diagnostic   `json:"errors"`
 * 	Raw           any                 `json:"raw"`
 * 	CompileOnSave *bool               `json:"compileOnSave"`
 *
 * 	comparePathsOptions     tspath.ComparePathsOptions
 * 	wildcardDirectoriesOnce sync.Once
 * 	wildcardDirectories     map[string]bool
 * 	includeGlobsOnce        sync.Once
 * 	includeGlobs            []*glob.Glob
 * 	extraFileExtensions     []FileExtensionInfo
 *
 * 	sourceAndOutputMapsOnce     sync.Once
 * 	sourceToProjectReference    map[tspath.Path]*SourceOutputAndProjectReference
 * 	outputDtsToProjectReference map[tspath.Path]*SourceOutputAndProjectReference
 *
 * 	commonSourceDirectory     string
 * 	commonSourceDirectoryOnce sync.Once
 *
 * 	resolvedProjectReferencePaths     []string
 * 	resolvedProjectReferencePathsOnce sync.Once
 *
 * 	literalFileNamesLen int
 * 	fileNamesByPath     map[tspath.Path]string // maps file names to their paths, used for quick lookups
 * 	fileNamesByPathOnce sync.Once
 *
 * 	locale     locale.Locale
 * 	localeOnce sync.Once
 * }
 */
export interface ParsedCommandLine {
  ParsedConfig: GoPtr<ParsedOptions>;
  ConfigFile: GoPtr<TsConfigSourceFile>;
  Errors: GoSlice<GoPtr<Diagnostic>>;
  Raw: unknown;
  CompileOnSave: GoPtr<bool>;
  comparePathsOptions: ComparePathsOptions;
  wildcardDirectoriesOnce: Once;
  wildcardDirectories: GoMap<string, bool>;
  includeGlobsOnce: Once;
  includeGlobs: GoSlice<GoPtr<Glob>>;
  extraFileExtensions: GoSlice<FileExtensionInfo>;
  sourceAndOutputMapsOnce: Once;
  sourceToProjectReference: GoMap<Path, GoPtr<SourceOutputAndProjectReference>>;
  outputDtsToProjectReference: GoMap<Path, GoPtr<SourceOutputAndProjectReference>>;
  commonSourceDirectory: string;
  commonSourceDirectoryOnce: Once;
  resolvedProjectReferencePaths: GoSlice<string>;
  resolvedProjectReferencePathsOnce: Once;
  literalFileNamesLen: int;
  fileNamesByPath: GoMap<Path, string>;
  fileNamesByPathOnce: Once;
  locale: Locale_c4184476;
  localeOnce: Once;
}

// ParsedCommandLine_as_ResolvedProjectReference adapts a *ParsedCommandLine to the
// module.ResolvedProjectReference interface by delegating each method to the
// corresponding free function (Go interface satisfaction -> method-bearing adapter).
export function ParsedCommandLine_as_ResolvedProjectReference(receiver: GoPtr<ParsedCommandLine>): ResolvedProjectReference {
  const p = receiver;
  return {
    ConfigName: (): string => ParsedCommandLine_ConfigName(p),
    CompilerOptions: (): GoPtr<CompilerOptions_3bab6c7a> => ParsedCommandLine_CompilerOptions(p),
  };
}

// ParsedCommandLine_as_OutputPathsHost adapts a *ParsedCommandLine to the
// outputpaths.OutputPathsHost interface by delegating each method to the
// corresponding free function (Go interface satisfaction -> method-bearing adapter).
function ParsedCommandLine_as_OutputPathsHost(receiver: GoPtr<ParsedCommandLine>): OutputPathsHost {
  const p = receiver;
  return {
    CommonSourceDirectory: (): string => ParsedCommandLine_CommonSourceDirectory(p),
    GetCurrentDirectory: (): string => ParsedCommandLine_GetCurrentDirectory(p),
    UseCaseSensitiveFileNames: (): bool => ParsedCommandLine_UseCaseSensitiveFileNames(p),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::func::NewParsedCommandLine","kind":"func","status":"implemented","sigHash":"e2ad6628087e8f290d41e5f5f436cd8a69367b1abc367852b3a505b582625f26"}
 *
 * Go source:
 * func NewParsedCommandLine(
 * 	compilerOptions *core.CompilerOptions,
 * 	rootFileNames []string,
 * 	comparePathsOptions tspath.ComparePathsOptions,
 * ) *ParsedCommandLine {
 * 	return &ParsedCommandLine{
 * 		ParsedConfig: &core.ParsedOptions{
 * 			CompilerOptions: compilerOptions,
 * 			FileNames:       rootFileNames,
 * 		},
 * 		comparePathsOptions: comparePathsOptions,
 * 	}
 * }
 */
export function NewParsedCommandLine(compilerOptions: GoPtr<CompilerOptions_3bab6c7a>, rootFileNames: GoSlice<string>, comparePathsOptions: ComparePathsOptions): GoPtr<ParsedCommandLine> {
  const normalizedCompilerOptions = NormalizeCompilerOptions(compilerOptions);
  return {
    ParsedConfig: {
      CompilerOptions: normalizedCompilerOptions,
      WatchOptions: undefined,
      FileNames: rootFileNames,
      TypeAcquisition: undefined,
      ProjectReferences: [],
    },
    ConfigFile: undefined,
    Errors: [],
    Raw: undefined,
    CompileOnSave: undefined,
    comparePathsOptions: comparePathsOptions,
    wildcardDirectoriesOnce: new Once(),
    wildcardDirectories: new globalThis.Map<string, bool>(),
    includeGlobsOnce: new Once(),
    includeGlobs: [],
    extraFileExtensions: [],
    sourceAndOutputMapsOnce: new Once(),
    sourceToProjectReference: new globalThis.Map<Path, GoPtr<SourceOutputAndProjectReference>>(),
    outputDtsToProjectReference: new globalThis.Map<Path, GoPtr<SourceOutputAndProjectReference>>(),
    commonSourceDirectory: "",
    commonSourceDirectoryOnce: new Once(),
    resolvedProjectReferencePaths: [],
    resolvedProjectReferencePathsOnce: new Once(),
    literalFileNamesLen: 0 as int,
    fileNamesByPath: new globalThis.Map<Path, string>(),
    fileNamesByPathOnce: new Once(),
    locale: locale_Parse("")[0],
    localeOnce: new Once(),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::type::SourceOutputAndProjectReference","kind":"type","status":"implemented","sigHash":"7f8fc5d25ceb67c4e5f7feaa34d531d9c06bd770fa0088d5342bc87a910e5ea3"}
 *
 * Go source:
 * SourceOutputAndProjectReference struct {
 * 	Source    string
 * 	OutputDts string
 * 	Resolved  *ParsedCommandLine
 * }
 */
export interface SourceOutputAndProjectReference {
  Source: string;
  OutputDts: string;
  Resolved: GoPtr<ParsedCommandLine>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::varGroup::_+_","kind":"varGroup","status":"implemented","sigHash":"606a448813ea549ca7a41fa67189d5c616eb07aa6693c9028679d4b9a5b43602"}
 *
 * Go source:
 * var (
 * 	_ module.ResolvedProjectReference = (*ParsedCommandLine)(nil)
 * 	_ outputpaths.OutputPathsHost     = (*ParsedCommandLine)(nil)
 * )
 */
export let ____696f5a2e_0: ResolvedProjectReference = ParsedCommandLine_as_ResolvedProjectReference(undefined);
export let ____696f5a2e_1: OutputPathsHost = ParsedCommandLine_as_OutputPathsHost(undefined);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.ConfigName","kind":"method","status":"implemented","sigHash":"ca2a0fcae55a827972ed0dddfca3fe277a8c3dcd47c3a3b8f4f2948d5df7f888"}
 *
 * Go source:
 * func (p *ParsedCommandLine) ConfigName() string {
 * 	if p == nil {
 * 		return ""
 * 	}
 * 	return p.ConfigFile.SourceFile.FileName()
 * }
 */
export function ParsedCommandLine_ConfigName(receiver: GoPtr<ParsedCommandLine>): string {
  if (receiver === undefined) {
    return "";
  }
  return SourceFile_FileName(receiver.ConfigFile!.SourceFile);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.SourceToProjectReference","kind":"method","status":"implemented","sigHash":"ecdbb056ed5d5ba955d429fb6f3c95273a6c04e601ce968b538b59eb4df68e3a"}
 *
 * Go source:
 * func (p *ParsedCommandLine) SourceToProjectReference() map[tspath.Path]*SourceOutputAndProjectReference {
 * 	return p.sourceToProjectReference
 * }
 */
export function ParsedCommandLine_SourceToProjectReference(receiver: GoPtr<ParsedCommandLine>): GoMap<Path, GoPtr<SourceOutputAndProjectReference>> {
  return receiver!.sourceToProjectReference;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.OutputDtsToProjectReference","kind":"method","status":"implemented","sigHash":"fcd34a8f2dc4ddd1e53cf400dbde2906e1e84263755e16d057b509356c30fe52"}
 *
 * Go source:
 * func (p *ParsedCommandLine) OutputDtsToProjectReference() map[tspath.Path]*SourceOutputAndProjectReference {
 * 	return p.outputDtsToProjectReference
 * }
 */
export function ParsedCommandLine_OutputDtsToProjectReference(receiver: GoPtr<ParsedCommandLine>): GoMap<Path, GoPtr<SourceOutputAndProjectReference>> {
  return receiver!.outputDtsToProjectReference;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.ParseInputOutputNames","kind":"method","status":"implemented","sigHash":"0003c5c0792da437caf0ba7f60ccf1922fc17079d0c75018d6b1606acda38b60"}
 *
 * Go source:
 * func (p *ParsedCommandLine) ParseInputOutputNames() {
 * 	p.sourceAndOutputMapsOnce.Do(func() {
 * 		sourceToOutput := map[tspath.Path]*SourceOutputAndProjectReference{}
 * 		outputDtsToSource := map[tspath.Path]*SourceOutputAndProjectReference{}
 *
 * 		for outputDts, source := range p.getOutputDeclarationAndSourceFileNames() {
 * 			path := tspath.ToPath(source, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 			projectReference := &SourceOutputAndProjectReference{
 * 				Source:    source,
 * 				OutputDts: outputDts,
 * 				Resolved:  p,
 * 			}
 * 			if outputDts != "" {
 * 				outputDtsToSource[tspath.ToPath(outputDts, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())] = projectReference
 * 			}
 * 			sourceToOutput[path] = projectReference
 * 		}
 * 		p.outputDtsToProjectReference = outputDtsToSource
 * 		p.sourceToProjectReference = sourceToOutput
 * 	})
 * }
 */
export function ParsedCommandLine_ParseInputOutputNames(receiver: GoPtr<ParsedCommandLine>): void {
  const p = receiver!;
  p.sourceAndOutputMapsOnce.Do((): void => {
    const sourceToOutput: GoMap<Path, GoPtr<SourceOutputAndProjectReference>> = new globalThis.Map<Path, GoPtr<SourceOutputAndProjectReference>>();
    const outputDtsToSource: GoMap<Path, GoPtr<SourceOutputAndProjectReference>> = new globalThis.Map<Path, GoPtr<SourceOutputAndProjectReference>>();

    ParsedCommandLine_getOutputDeclarationAndSourceFileNames(p)!((outputDts: string, source: string): bool => {
      const path = ToPath(source, ParsedCommandLine_GetCurrentDirectory(p), ParsedCommandLine_UseCaseSensitiveFileNames(p));
      const projectReference: GoPtr<SourceOutputAndProjectReference> = {
        Source: source,
        OutputDts: outputDts,
        Resolved: p,
      };
      if (outputDts !== "") {
        outputDtsToSource.set(ToPath(outputDts, ParsedCommandLine_GetCurrentDirectory(p), ParsedCommandLine_UseCaseSensitiveFileNames(p)), projectReference);
      }
      sourceToOutput.set(path, projectReference);
      return true;
    });
    p.outputDtsToProjectReference = outputDtsToSource;
    p.sourceToProjectReference = sourceToOutput;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.CommonSourceDirectory","kind":"method","status":"implemented","sigHash":"669ab3ad38525146912a93c2dc4b5faeb46eada70af3133171b83a90bafbb6be"}
 *
 * Go source:
 * func (p *ParsedCommandLine) CommonSourceDirectory() string {
 * 	p.commonSourceDirectoryOnce.Do(func() {
 * 		p.commonSourceDirectory = outputpaths.GetCommonSourceDirectory(
 * 			p.ParsedConfig.CompilerOptions,
 * 			func() []string {
 * 				return core.Filter(
 * 					p.ParsedConfig.FileNames,
 * 					func(file string) bool {
 * 						return !(p.ParsedConfig.CompilerOptions.NoEmitForJsFiles.IsTrue() && tspath.HasJSFileExtension(file)) &&
 * 							!tspath.IsDeclarationFileName(file)
 * 					})
 * 			},
 * 			p.GetCurrentDirectory(),
 * 			p.UseCaseSensitiveFileNames(),
 * 			p.checkSourceFilesBelongToPath,
 * 		)
 * 	})
 * 	return p.commonSourceDirectory
 * }
 */
export function ParsedCommandLine_CommonSourceDirectory(receiver: GoPtr<ParsedCommandLine>): string {
  const p = receiver!;
  p.commonSourceDirectoryOnce.Do((): void => {
    p.commonSourceDirectory = GetCommonSourceDirectory(
      p.ParsedConfig!.CompilerOptions,
      (): GoSlice<string> => {
        return Filter(
          p.ParsedConfig!.FileNames,
          (file: string): bool => {
            return !(Tristate_IsTrue(p.ParsedConfig!.CompilerOptions!.NoEmitForJsFiles) && HasJSFileExtension(file)) &&
              !IsDeclarationFileName(file);
          },
        );
      },
      ParsedCommandLine_GetCurrentDirectory(p),
      ParsedCommandLine_UseCaseSensitiveFileNames(p),
      (sourceFiles, rootDirectory) => ParsedCommandLine_checkSourceFilesBelongToPath(p, sourceFiles, rootDirectory),
    );
  });
  return p.commonSourceDirectory;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.checkSourceFilesBelongToPath","kind":"method","status":"implemented","sigHash":"042768a353496b85a2340a1904d959c0cab1b9dd0a07c9745e2b6276abfdabf6"}
 *
 * Go source:
 * func (p *ParsedCommandLine) checkSourceFilesBelongToPath(sourceFiles []string, rootDirectory string) bool {
 * 	allFilesBelongToPath := true
 * 	for _, file := range sourceFiles {
 * 		absoluteSourceFilePath := tspath.GetCanonicalFileName(tspath.GetNormalizedAbsolutePath(file, p.GetCurrentDirectory()), p.UseCaseSensitiveFileNames())
 * 		if !tspath.ContainsPath(rootDirectory, file, p.comparePathsOptions) {
 * 			p.Errors = append(p.Errors, ast.NewCompilerDiagnostic(diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, absoluteSourceFilePath, rootDirectory))
 * 			allFilesBelongToPath = false
 * 		}
 * 	}
 *
 * 	return allFilesBelongToPath
 * }
 */
export function ParsedCommandLine_checkSourceFilesBelongToPath(receiver: GoPtr<ParsedCommandLine>, sourceFiles: GoSlice<string>, rootDirectory: string): bool {
  const p = receiver!;
  let allFilesBelongToPath = true as bool;
  for (const file of sourceFiles) {
    const absoluteSourceFilePath = GetCanonicalFileName(GetNormalizedAbsolutePath(file, ParsedCommandLine_GetCurrentDirectory(p)), ParsedCommandLine_UseCaseSensitiveFileNames(p));
    if (!ContainsPath(rootDirectory, file, p.comparePathsOptions)) {
      p.Errors = [...(p.Errors ?? []), NewCompilerDiagnostic(File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, absoluteSourceFilePath, rootDirectory)];
      allFilesBelongToPath = false as bool;
    }
  }

  return allFilesBelongToPath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"23a48d06f7bf69a347808ec471293eaef883415b981f36db02783bda28543704"}
 *
 * Go source:
 * func (p *ParsedCommandLine) GetCurrentDirectory() string {
 * 	return p.comparePathsOptions.CurrentDirectory
 * }
 */
export function ParsedCommandLine_GetCurrentDirectory(receiver: GoPtr<ParsedCommandLine>): string {
  return receiver!.comparePathsOptions.CurrentDirectory;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"6b15f84f43bae2a17797d99da9fc7fa0ffdd5f542d00db66bdad5c9b02cc9fc2"}
 *
 * Go source:
 * func (p *ParsedCommandLine) UseCaseSensitiveFileNames() bool {
 * 	return p.comparePathsOptions.UseCaseSensitiveFileNames
 * }
 */
export function ParsedCommandLine_UseCaseSensitiveFileNames(receiver: GoPtr<ParsedCommandLine>): bool {
  return receiver!.comparePathsOptions.UseCaseSensitiveFileNames;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.getOutputDeclarationAndSourceFileNames","kind":"method","status":"implemented","sigHash":"38d4efcd235f208c538b34c1011ea4a23b815e1f75c64b9f8ffb907bfdfa007d"}
 *
 * Go source:
 * func (p *ParsedCommandLine) getOutputDeclarationAndSourceFileNames() iter.Seq2[string, string] {
 * 	return func(yield func(dtsName string, inputName string) bool) {
 * 		for _, fileName := range p.ParsedConfig.FileNames {
 * 			var outputDts string
 * 			if !tspath.IsDeclarationFileName(fileName) && !tspath.FileExtensionIs(fileName, tspath.ExtensionJson) {
 * 				outputDts = outputpaths.GetOutputDeclarationFileNameWorker(fileName, p.CompilerOptions(), p)
 * 			}
 * 			if !yield(outputDts, fileName) {
 * 				return
 * 			}
 * 		}
 * 	}
 * }
 */
export function ParsedCommandLine_getOutputDeclarationAndSourceFileNames(receiver: GoPtr<ParsedCommandLine>): GoSeq2<string, string> {
  const p = receiver!;
  return (yield_: (dtsName: string, inputName: string) => bool): void => {
    for (const fileName of p.ParsedConfig!.FileNames) {
      const outputDts = (!IsDeclarationFileName(fileName) && !FileExtensionIs(fileName, ExtensionJson))
        ? GetOutputDeclarationFileNameWorker(fileName, ParsedCommandLine_CompilerOptions(p), ParsedCommandLine_as_OutputPathsHost(p))
        : "";
      if (!yield_(outputDts, fileName)) {
        return;
      }
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.GetOutputFileNames","kind":"method","status":"implemented","sigHash":"46678113bf19e6f2de1954c167664d5a468de83b9b2504158413abaaa2d03d07"}
 *
 * Go source:
 * func (p *ParsedCommandLine) GetOutputFileNames() iter.Seq[string] {
 * 	return func(yield func(outputName string) bool) {
 * 		for _, fileName := range p.ParsedConfig.FileNames {
 * 			if tspath.IsDeclarationFileName(fileName) {
 * 				continue
 * 			}
 * 			jsFileName := outputpaths.GetOutputJSFileName(fileName, p.CompilerOptions(), p)
 * 			isJson := tspath.FileExtensionIs(fileName, tspath.ExtensionJson)
 * 			if jsFileName != "" {
 * 				if !yield(jsFileName) {
 * 					return
 * 				}
 * 				if !isJson {
 * 					sourceMap := outputpaths.GetSourceMapFilePath(jsFileName, p.CompilerOptions())
 * 					if sourceMap != "" {
 * 						if !yield(sourceMap) {
 * 							return
 * 						}
 * 					}
 * 				}
 * 			}
 * 			if isJson {
 * 				continue
 * 			}
 * 			if p.CompilerOptions().GetEmitDeclarations() {
 * 				dtsFileName := outputpaths.GetOutputDeclarationFileNameWorker(fileName, p.CompilerOptions(), p)
 * 				if dtsFileName != "" {
 * 					if !yield(dtsFileName) {
 * 						return
 * 					}
 * 					if p.CompilerOptions().GetAreDeclarationMapsEnabled() {
 * 						declarationMap := dtsFileName + ".map"
 * 						if !yield(declarationMap) {
 * 							return
 * 						}
 * 					}
 * 				}
 * 			}
 * 		}
 * 	}
 * }
 */
export function ParsedCommandLine_GetOutputFileNames(receiver: GoPtr<ParsedCommandLine>): GoSeq<string> {
  const p = receiver!;
  return (yield_: (outputName: string) => bool): void => {
    for (const fileName of p.ParsedConfig!.FileNames) {
      if (IsDeclarationFileName(fileName)) {
        continue;
      }
      const jsFileName = GetOutputJSFileName(fileName, ParsedCommandLine_CompilerOptions(p), ParsedCommandLine_as_OutputPathsHost(p));
      const isJson = FileExtensionIs(fileName, ExtensionJson);
      if (jsFileName !== "") {
        if (!yield_(jsFileName)) {
          return;
        }
        if (!isJson) {
          const sourceMap = GetSourceMapFilePath(jsFileName, ParsedCommandLine_CompilerOptions(p));
          if (sourceMap !== "") {
            if (!yield_(sourceMap)) {
              return;
            }
          }
        }
      }
      if (isJson) {
        continue;
      }
      if (CompilerOptions_GetEmitDeclarations(ParsedCommandLine_CompilerOptions(p))) {
        const dtsFileName = GetOutputDeclarationFileNameWorker(fileName, ParsedCommandLine_CompilerOptions(p), ParsedCommandLine_as_OutputPathsHost(p));
        if (dtsFileName !== "") {
          if (!yield_(dtsFileName)) {
            return;
          }
          if (CompilerOptions_GetAreDeclarationMapsEnabled(ParsedCommandLine_CompilerOptions(p))) {
            const declarationMap = dtsFileName + ".map";
            if (!yield_(declarationMap)) {
              return;
            }
          }
        }
      }
    }
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.GetBuildInfoFileName","kind":"method","status":"implemented","sigHash":"ca5c12d827fbdeedec8fcbee0729d47e2940e10e538ae1882efd33c33492fd7c"}
 *
 * Go source:
 * func (p *ParsedCommandLine) GetBuildInfoFileName() string {
 * 	return outputpaths.GetBuildInfoFileName(p.CompilerOptions(), p.comparePathsOptions)
 * }
 */
export function ParsedCommandLine_GetBuildInfoFileName(receiver: GoPtr<ParsedCommandLine>): string {
  const p = receiver!;
  return GetBuildInfoFileName(ParsedCommandLine_CompilerOptions(p), p.comparePathsOptions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.WildcardDirectories","kind":"method","status":"implemented","sigHash":"bcc1c5e97bbf7b5d49ecc7493fe1f4b2f27c4bbb57e81902f6790d5471cdd1ab"}
 *
 * Go source:
 * func (p *ParsedCommandLine) WildcardDirectories() map[string]bool {
 * 	if p == nil {
 * 		return nil
 * 	}
 *
 * 	p.wildcardDirectoriesOnce.Do(func() {
 * 		if p.wildcardDirectories == nil {
 * 			p.wildcardDirectories = getWildcardDirectories(
 * 				p.ConfigFile.configFileSpecs.validatedIncludeSpecs,
 * 				p.ConfigFile.configFileSpecs.validatedExcludeSpecs,
 * 				p.comparePathsOptions,
 * 			)
 * 		}
 * 	})
 *
 * 	return p.wildcardDirectories
 * }
 */
export function ParsedCommandLine_WildcardDirectories(receiver: GoPtr<ParsedCommandLine>): GoMap<string, bool> {
  if (receiver === undefined) {
    return new globalThis.Map<string, bool>();
  }
  const p = receiver;
  p.wildcardDirectoriesOnce.Do((): void => {
    if (p.wildcardDirectories.size === 0) {
      p.wildcardDirectories = getWildcardDirectories(
        p.ConfigFile!.configFileSpecs!.validatedIncludeSpecs,
        p.ConfigFile!.configFileSpecs!.validatedExcludeSpecs,
        p.comparePathsOptions,
      );
    }
  });
  return p.wildcardDirectories;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.WildcardDirectoryGlobs","kind":"method","status":"implemented","sigHash":"1be2dbed8713724274bb32172adcfc849b383b422e2bfc74f277deb2f8022f54"}
 *
 * Go source:
 * func (p *ParsedCommandLine) WildcardDirectoryGlobs() []*glob.Glob {
 * 	wildcardDirectories := p.WildcardDirectories()
 * 	if wildcardDirectories == nil {
 * 		return nil
 * 	}
 *
 * 	p.includeGlobsOnce.Do(func() {
 * 		if p.includeGlobs == nil {
 * 			globs := make([]*glob.Glob, 0, len(wildcardDirectories))
 * 			for dir, recursive := range wildcardDirectories {
 * 				if parsed, err := glob.Parse(fmt.Sprintf("%s/%s", tspath.NormalizePath(dir), core.IfElse(recursive, recursiveFileGlobPattern, fileGlobPattern))); err == nil {
 * 					globs = append(globs, parsed)
 * 				}
 * 			}
 * 			p.includeGlobs = globs
 * 		}
 * 	})
 *
 * 	return p.includeGlobs
 * }
 */
export function ParsedCommandLine_WildcardDirectoryGlobs(receiver: GoPtr<ParsedCommandLine>): GoSlice<GoPtr<Glob>> {
  const p = receiver!;
  const wildcardDirectories = ParsedCommandLine_WildcardDirectories(p);
  if (wildcardDirectories.size === 0) {
    return [];
  }

  p.includeGlobsOnce.Do((): void => {
    if (p.includeGlobs.length === 0) {
      const globs: GoSlice<GoPtr<Glob>> = [];
      for (const [dir, recursive] of wildcardDirectories) {
        const pattern = fmt.Sprintf("%s/%s", NormalizePath(dir), IfElse(recursive, recursiveFileGlobPattern, fileGlobPattern));
        const [parsed, err] = glob_Parse(pattern);
        if (err === undefined) {
          globs.push(parsed);
        }
      }
      p.includeGlobs = globs;
    }
  });

  return p.includeGlobs;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.LiteralFileNames","kind":"method","status":"implemented","sigHash":"e347d7ea24e70da0991ac1020e89a93c637387cd6b35be1ee245d0e36676d864"}
 *
 * Go source:
 * func (p *ParsedCommandLine) LiteralFileNames() []string {
 * 	if p != nil && p.ConfigFile != nil {
 * 		return p.FileNames()[0:p.literalFileNamesLen]
 * 	}
 * 	return nil
 * }
 */
export function ParsedCommandLine_LiteralFileNames(receiver: GoPtr<ParsedCommandLine>): GoSlice<string> {
  if (receiver !== undefined && receiver.ConfigFile !== undefined) {
    return ParsedCommandLine_FileNames(receiver).slice(0, receiver.literalFileNamesLen);
  }
  return [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.SetParsedOptions","kind":"method","status":"implemented","sigHash":"690c688d5b49a297fec3deeccfcb2fae21cba44a8984d7244efc4a4ef545e3ab"}
 *
 * Go source:
 * func (p *ParsedCommandLine) SetParsedOptions(o *core.ParsedOptions) {
 * 	p.ParsedConfig = o
 * }
 */
export function ParsedCommandLine_SetParsedOptions(receiver: GoPtr<ParsedCommandLine>, o: GoPtr<ParsedOptions>): void {
  receiver!.ParsedConfig = o;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.SetCompilerOptions","kind":"method","status":"implemented","sigHash":"6697753b7c21e56874b159d0985dc2b2aa2e391c73b2cc48bd6e18f26c41e5f6"}
 *
 * Go source:
 * func (p *ParsedCommandLine) SetCompilerOptions(o *core.CompilerOptions) {
 * 	p.ParsedConfig.CompilerOptions = o
 * }
 */
export function ParsedCommandLine_SetCompilerOptions(receiver: GoPtr<ParsedCommandLine>, o: GoPtr<CompilerOptions_3bab6c7a>): void {
  receiver!.ParsedConfig!.CompilerOptions = NormalizeCompilerOptions(o);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.CompilerOptions","kind":"method","status":"implemented","sigHash":"417a91bda330dfb31d1bc826fb335c56eedcfdd1d30db8342d87b86f7ef18683"}
 *
 * Go source:
 * func (p *ParsedCommandLine) CompilerOptions() *core.CompilerOptions {
 * 	if p == nil {
 * 		return nil
 * 	}
 * 	return p.ParsedConfig.CompilerOptions
 * }
 */
export function ParsedCommandLine_CompilerOptions(receiver: GoPtr<ParsedCommandLine>): GoPtr<CompilerOptions_3bab6c7a> {
  const p = receiver;
  if (p === undefined) {
    return undefined;
  }
  return NormalizeCompilerOptions(p.ParsedConfig!.CompilerOptions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.SetTypeAcquisition","kind":"method","status":"implemented","sigHash":"a7b3f9565336ce873945d65ef384934fa3a0aa06304153e3d098adb1a959835a"}
 *
 * Go source:
 * func (p *ParsedCommandLine) SetTypeAcquisition(o *core.TypeAcquisition) {
 * 	p.ParsedConfig.TypeAcquisition = o
 * }
 */
export function ParsedCommandLine_SetTypeAcquisition(receiver: GoPtr<ParsedCommandLine>, o: GoPtr<TypeAcquisition_0a5bf39c>): void {
  receiver!.ParsedConfig!.TypeAcquisition = o;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.TypeAcquisition","kind":"method","status":"implemented","sigHash":"c190161054ed9e1d473f81e5ab8478cb10fa3a6d94e213f1c0a5c89f0c7ea7b4"}
 *
 * Go source:
 * func (p *ParsedCommandLine) TypeAcquisition() *core.TypeAcquisition {
 * 	return p.ParsedConfig.TypeAcquisition
 * }
 */
export function ParsedCommandLine_TypeAcquisition(receiver: GoPtr<ParsedCommandLine>): GoPtr<TypeAcquisition_0a5bf39c> {
  return receiver!.ParsedConfig!.TypeAcquisition;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.FileNames","kind":"method","status":"implemented","sigHash":"cd9d32c7052438a002442ec1bff08098a440b4deb99693869e1bd4de3ae2260d"}
 *
 * Go source:
 * func (p *ParsedCommandLine) FileNames() []string {
 * 	return p.ParsedConfig.FileNames
 * }
 */
export function ParsedCommandLine_FileNames(receiver: GoPtr<ParsedCommandLine>): GoSlice<string> {
  return receiver!.ParsedConfig!.FileNames;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.FileNamesByPath","kind":"method","status":"implemented","sigHash":"9a76b8dcaadf96585d7f6aa7520ec82e6ab3a5d9bcf046c87e1bb3d037353888"}
 *
 * Go source:
 * func (p *ParsedCommandLine) FileNamesByPath() map[tspath.Path]string {
 * 	p.fileNamesByPathOnce.Do(func() {
 * 		p.fileNamesByPath = make(map[tspath.Path]string, len(p.ParsedConfig.FileNames))
 * 		for _, fileName := range p.ParsedConfig.FileNames {
 * 			path := tspath.ToPath(fileName, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 			p.fileNamesByPath[path] = fileName
 * 		}
 * 	})
 * 	return p.fileNamesByPath
 * }
 */
export function ParsedCommandLine_FileNamesByPath(receiver: GoPtr<ParsedCommandLine>): GoMap<Path, string> {
  const p = receiver!;
  p.fileNamesByPathOnce.Do((): void => {
    p.fileNamesByPath = new globalThis.Map<Path, string>();
    for (const fileName of p.ParsedConfig!.FileNames) {
      const path = ToPath(fileName, ParsedCommandLine_GetCurrentDirectory(p), ParsedCommandLine_UseCaseSensitiveFileNames(p));
      p.fileNamesByPath.set(path, fileName);
    }
  });
  return p.fileNamesByPath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.ProjectReferences","kind":"method","status":"implemented","sigHash":"85e5f6555979046b68c5ffd49930da400decb0b2e8a6effa12ab1fcb7d50d6f4"}
 *
 * Go source:
 * func (p *ParsedCommandLine) ProjectReferences() []*core.ProjectReference {
 * 	return p.ParsedConfig.ProjectReferences
 * }
 */
export function ParsedCommandLine_ProjectReferences(receiver: GoPtr<ParsedCommandLine>): GoSlice<GoPtr<ProjectReference>> {
  return receiver!.ParsedConfig!.ProjectReferences ?? [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.ResolvedProjectReferencePaths","kind":"method","status":"implemented","sigHash":"d9e61e3291d6c7371e74b3a3a71502db5b6455d2577c15a0a38158e258c474bb"}
 *
 * Go source:
 * func (p *ParsedCommandLine) ResolvedProjectReferencePaths() []string {
 * 	p.resolvedProjectReferencePathsOnce.Do(func() {
 * 		p.resolvedProjectReferencePaths = core.Map(p.ParsedConfig.ProjectReferences, core.ResolveProjectReferencePath)
 * 	})
 * 	return p.resolvedProjectReferencePaths
 * }
 */
export function ParsedCommandLine_ResolvedProjectReferencePaths(receiver: GoPtr<ParsedCommandLine>): GoSlice<string> {
  const p = receiver!;
  p.resolvedProjectReferencePathsOnce.Do((): void => {
    p.resolvedProjectReferencePaths = core_Map(ParsedCommandLine_ProjectReferences(p), ResolveProjectReferencePath);
  });
  return p.resolvedProjectReferencePaths;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.ExtendedSourceFiles","kind":"method","status":"implemented","sigHash":"0c71cd2559d25efd7fa5a46d4a21883cf9c43ec8969590561b87f2b2741b1a51"}
 *
 * Go source:
 * func (p *ParsedCommandLine) ExtendedSourceFiles() []string {
 * 	if p == nil || p.ConfigFile == nil {
 * 		return nil
 * 	}
 * 	return p.ConfigFile.ExtendedSourceFiles
 * }
 */
export function ParsedCommandLine_ExtendedSourceFiles(receiver: GoPtr<ParsedCommandLine>): GoSlice<string> {
  if (receiver === undefined || receiver.ConfigFile === undefined) {
    return [];
  }
  return receiver.ConfigFile.ExtendedSourceFiles;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.GetConfigFileParsingDiagnostics","kind":"method","status":"implemented","sigHash":"eb4d9e6d8a688a330c9f9b3d9a53786e7e8d515a5128bb5174e7a1c83b921773"}
 *
 * Go source:
 * func (p *ParsedCommandLine) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
 * 	if p.ConfigFile != nil {
 * 		// todo: !!! should be ConfigFile.ParseDiagnostics, check if they are the same
 * 		return slices.Concat(p.ConfigFile.SourceFile.Diagnostics(), p.Errors)
 * 	}
 * 	return p.Errors
 * }
 */
export function ParsedCommandLine_GetConfigFileParsingDiagnostics(receiver: GoPtr<ParsedCommandLine>): GoSlice<GoPtr<Diagnostic>> {
  const p = receiver!;
  if (p.ConfigFile !== undefined) {
    // todo: !!! should be ConfigFile.ParseDiagnostics, check if they are the same
    return [...SourceFile_Diagnostics(p.ConfigFile.SourceFile), ...p.Errors];
  }
  return p.Errors;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.PossiblyMatchesFileName","kind":"method","status":"implemented","sigHash":"30f6e2c36d1ba5f2b9a620ba4cc4808ecb764b6c45f2bf9b7d31f1b93479b970"}
 *
 * Go source:
 * func (p *ParsedCommandLine) PossiblyMatchesFileName(fileName string) bool {
 * 	path := tspath.ToPath(fileName, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 	if _, ok := p.FileNamesByPath()[path]; ok {
 * 		return true
 * 	}
 *
 * 	for _, include := range p.ConfigFile.configFileSpecs.validatedIncludeSpecs {
 * 		if !strings.ContainsAny(include, "*?") && !vfsmatch.IsImplicitGlob(include) {
 * 			includePath := tspath.ToPath(include, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 			if includePath == path {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	if wildcardDirectoryGlobs := p.WildcardDirectoryGlobs(); len(wildcardDirectoryGlobs) > 0 {
 * 		for _, glob := range wildcardDirectoryGlobs {
 * 			if glob.Match(fileName) {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function ParsedCommandLine_PossiblyMatchesFileName(receiver: GoPtr<ParsedCommandLine>, fileName: string): bool {
  const p = receiver!;
  const path = ToPath(fileName, ParsedCommandLine_GetCurrentDirectory(p), ParsedCommandLine_UseCaseSensitiveFileNames(p));
  if (ParsedCommandLine_FileNamesByPath(p).has(path)) {
    return true;
  }

  for (const include of p.ConfigFile!.configFileSpecs!.validatedIncludeSpecs) {
    if (!strings.ContainsAny(include, "*?") && !IsImplicitGlob(include)) {
      const includePath = ToPath(include, ParsedCommandLine_GetCurrentDirectory(p), ParsedCommandLine_UseCaseSensitiveFileNames(p));
      if (includePath === path) {
        return true;
      }
    }
  }
  const wildcardDirectoryGlobs = ParsedCommandLine_WildcardDirectoryGlobs(p);
  if (wildcardDirectoryGlobs.length > 0) {
    for (const glob of wildcardDirectoryGlobs) {
      if (Glob_Match(glob, fileName)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.PossiblyMatchesDirectoryName","kind":"method","status":"implemented","sigHash":"a9bb21b73145249e122e4516885a5b9f7b02147cff6544059ce137a8f93e9332"}
 *
 * Go source:
 * func (p *ParsedCommandLine) PossiblyMatchesDirectoryName(directoryPath tspath.Path) bool {
 * 	for wildcardDir, recursive := range p.WildcardDirectories() {
 * 		wildcardDirPath := tspath.ToPath(wildcardDir, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 		if recursive {
 * 			if wildcardDirPath.ContainsPath(directoryPath) {
 * 				return true
 * 			}
 * 		} else {
 * 			if wildcardDirPath == directoryPath {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function ParsedCommandLine_PossiblyMatchesDirectoryName(receiver: GoPtr<ParsedCommandLine>, directoryPath: Path): bool {
  const p = receiver!;
  for (const [wildcardDir, recursive] of ParsedCommandLine_WildcardDirectories(p)) {
    const wildcardDirPath = ToPath(wildcardDir, ParsedCommandLine_GetCurrentDirectory(p), ParsedCommandLine_UseCaseSensitiveFileNames(p));
    if (recursive) {
      if (Path_ContainsPath(wildcardDirPath, directoryPath)) {
        return true;
      }
    } else {
      if (wildcardDirPath === directoryPath) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.GetMatchedFileSpec","kind":"method","status":"implemented","sigHash":"ad59179912240328819dcd8efac08d61cfe6efc3fffa10fed54ed4861e6230c3"}
 *
 * Go source:
 * func (p *ParsedCommandLine) GetMatchedFileSpec(fileName string) string {
 * 	return p.ConfigFile.configFileSpecs.getMatchedFileSpec(fileName, p.comparePathsOptions)
 * }
 */
export function ParsedCommandLine_GetMatchedFileSpec(receiver: GoPtr<ParsedCommandLine>, fileName: string): string {
  const p = receiver!;
  return configFileSpecs_getMatchedFileSpec(p.ConfigFile!.configFileSpecs, fileName, p.comparePathsOptions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.GetMatchedIncludeSpec","kind":"method","status":"implemented","sigHash":"cc80e60c9e244cfaa255bc90eec3f7f9df26d523f01d66cdb9dab97750982faa"}
 *
 * Go source:
 * func (p *ParsedCommandLine) GetMatchedIncludeSpec(fileName string) (string, bool) {
 * 	if len(p.ConfigFile.configFileSpecs.validatedIncludeSpecs) == 0 {
 * 		return "", false
 * 	}
 *
 * 	if p.ConfigFile.configFileSpecs.isDefaultIncludeSpec {
 * 		return p.ConfigFile.configFileSpecs.validatedIncludeSpecs[0], true
 * 	}
 *
 * 	return p.ConfigFile.configFileSpecs.getMatchedIncludeSpec(fileName, p.comparePathsOptions), false
 * }
 */
export function ParsedCommandLine_GetMatchedIncludeSpec(receiver: GoPtr<ParsedCommandLine>, fileName: string): [string, bool] {
  const p = receiver!;
  if (p.ConfigFile!.configFileSpecs!.validatedIncludeSpecs.length === 0) {
    return ["", false];
  }

  if (p.ConfigFile!.configFileSpecs!.isDefaultIncludeSpec) {
    return [p.ConfigFile!.configFileSpecs!.validatedIncludeSpecs[0]!, true];
  }

  return [configFileSpecs_getMatchedIncludeSpec(p.ConfigFile!.configFileSpecs, fileName, p.comparePathsOptions), false];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.ReloadFileNamesOfParsedCommandLine","kind":"method","status":"implemented","sigHash":"80efa087e2c5c84dac298c6291809eb6e0e34c4ac9065362bcd98b4cdc685224"}
 *
 * Go source:
 * func (p *ParsedCommandLine) ReloadFileNamesOfParsedCommandLine(fs vfs.FS) *ParsedCommandLine {
 * 	parsedConfig := *p.ParsedConfig
 * 	fileNames, literalFileNamesLen := getFileNamesFromConfigSpecs(
 * 		*p.ConfigFile.configFileSpecs,
 * 		p.GetCurrentDirectory(),
 * 		p.CompilerOptions(),
 * 		fs,
 * 		p.extraFileExtensions,
 * 	)
 * 	parsedConfig.FileNames = fileNames
 * 	parsedCommandLine := ParsedCommandLine{
 * 		ParsedConfig:        &parsedConfig,
 * 		ConfigFile:          p.ConfigFile,
 * 		Errors:              p.Errors,
 * 		Raw:                 p.Raw,
 * 		CompileOnSave:       p.CompileOnSave,
 * 		comparePathsOptions: p.comparePathsOptions,
 * 		wildcardDirectories: p.wildcardDirectories,
 * 		includeGlobs:        p.includeGlobs,
 * 		extraFileExtensions: p.extraFileExtensions,
 * 		literalFileNamesLen: literalFileNamesLen,
 * 	}
 * 	return &parsedCommandLine
 * }
 */
export function ParsedCommandLine_ReloadFileNamesOfParsedCommandLine(receiver: GoPtr<ParsedCommandLine>, fs: FS): GoPtr<ParsedCommandLine> {
  const p = receiver!;
  const parsedConfig = { ...p.ParsedConfig! };
  const [fileNames, literalFileNamesLen] = getFileNamesFromConfigSpecs(
    { ...p.ConfigFile!.configFileSpecs! },
    ParsedCommandLine_GetCurrentDirectory(p),
    ParsedCommandLine_CompilerOptions(p),
    fs,
    p.extraFileExtensions,
  );
  parsedConfig.FileNames = fileNames;
  const parsedCommandLine: ParsedCommandLine = {
    ParsedConfig: parsedConfig,
    ConfigFile: p.ConfigFile,
    Errors: p.Errors,
    Raw: p.Raw,
    CompileOnSave: p.CompileOnSave,
    comparePathsOptions: p.comparePathsOptions,
    wildcardDirectoriesOnce: new Once(),
    wildcardDirectories: p.wildcardDirectories,
    includeGlobsOnce: new Once(),
    includeGlobs: p.includeGlobs,
    extraFileExtensions: p.extraFileExtensions,
    sourceAndOutputMapsOnce: new Once(),
    sourceToProjectReference: new globalThis.Map<Path, GoPtr<SourceOutputAndProjectReference>>(),
    outputDtsToProjectReference: new globalThis.Map<Path, GoPtr<SourceOutputAndProjectReference>>(),
    commonSourceDirectory: "",
    commonSourceDirectoryOnce: new Once(),
    resolvedProjectReferencePaths: [],
    resolvedProjectReferencePathsOnce: new Once(),
    literalFileNamesLen: literalFileNamesLen,
    fileNamesByPath: new globalThis.Map<Path, string>(),
    fileNamesByPathOnce: new Once(),
    locale: p.locale,
    localeOnce: new Once(),
  };
  return parsedCommandLine;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::method::ParsedCommandLine.Locale","kind":"method","status":"implemented","sigHash":"235a88370a730c41aa6bbab60e8ecb7bd8f09ed50da16d6877ae0fdaa5d5f739"}
 *
 * Go source:
 * func (p *ParsedCommandLine) Locale() locale.Locale {
 * 	p.localeOnce.Do(func() {
 * 		p.locale, _ = locale.Parse(p.CompilerOptions().Locale)
 * 	})
 * 	return p.locale
 * }
 */
export function ParsedCommandLine_Locale(receiver: GoPtr<ParsedCommandLine>): Locale_c4184476 {
  const p = receiver!;
  p.localeOnce.Do((): void => {
    const [locale_, _] = locale_Parse(ParsedCommandLine_CompilerOptions(p)!.Locale);
    p.locale = locale_;
  });
  return p.locale;
}

type ParsedCommandLineJsonFields = JsonFieldNamesForGoStructContract<
  ParsedCommandLine,
  "github.com/microsoft/typescript-go::internal/tsoptions/parsedcommandline.go::type::ParsedCommandLine",
  {
    readonly ParsedConfig: { readonly name: "parsedConfig"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly ConfigFile: { readonly name: "configFile"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Errors: { readonly name: "errors"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly Raw: { readonly name: "raw"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
    readonly CompileOnSave: { readonly name: "compileOnSave"; readonly omitZero: false; readonly omitEmpty: false; readonly ignored: false };
  }
>;
