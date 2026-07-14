import type { bool, int } from "../../go/scalars.js";
import type { GoMap, GoMapKeyDescriptor, GoPtr, GoSlice } from "../../go/compat.js";
import { GoNilMap, GoNilSlice, GoPointerKey, GoStringKey, GoValueRef, GoZeroPointer, GoZeroSlice } from "../../go/compat.js";
import { IsExternalOrCommonJSModule } from "../ast/utilities.js";
import { SourceFile_FileName } from "../ast/ast.js";
import type { HasFileName, SourceFile } from "../ast/ast.js";
import { DiagnosticsCollection_Add, NewCompilerDiagnostic } from "../ast/diagnostic.js";
import type { Diagnostic, DiagnosticsCollection } from "../ast/diagnostic.js";
import { Map as SyncMapImpl, Once } from "../../go/sync.js";
import { Set_AddIfAbsent } from "../collections/set.js";
import type { Set } from "../collections/set.js";
import { SyncMap_Load, SyncMap_LoadOrStore } from "../collections/syncmap.js";
import type { SyncMap } from "../collections/syncmap.js";
import { ModuleKindCommonJS, ModuleKindESNext } from "../core/compileroptions.js";
import { Already_included_file_name_0_differs_from_file_name_1_only_in_casing, File_is_CommonJS_module_because_0_does_not_have_field_type, File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module, File_is_CommonJS_module_because_package_json_was_not_found, File_is_ECMAScript_module_because_0_has_field_type_with_value_module, File_is_output_of_project_reference_source_0, File_name_0_differs_from_already_included_file_name_1_only_in_casing, File_redirects_to_file_0 } from "../diagnostics/generated/messages.js";
import type { Path } from "../tspath/path.js";
import { ForEachTsConfigPropArray } from "../tsoptions/tsconfigparsing.js";
import { Identity } from "../core/core.js";
import { IsObjectLiteralExpression } from "../ast/generated/predicates.js";
import { AsObjectLiteralExpression } from "../ast/generated/casts.js";
import type { ObjectLiteralExpression, PropertyAssignment } from "../ast/generated/data.js";
import { Program_GetImpliedNodeFormatForEmit, Program_GetSourceFileByPath, Program_GetSourceFileMetaData, Program_GetSourceOfProjectReferenceIfOutputIncluded } from "./program.js";
import type { FileIncludeReason, referenceFileLocation } from "./fileInclude.js";
import { FileIncludeReason_getReferencedLocation, FileIncludeReason_isReferencedFile, FileIncludeReason_toRelatedInfo } from "./fileInclude.js";
import { ContainsFunc } from "../../go/slices.js";
import { processingDiagnostic_toDiagnostic } from "./processingDiagnostic.js";
import type { processingDiagnostic } from "./processingDiagnostic.js";
import { processingDiagnosticKindExplainingFileInclude } from "./processingDiagnostic.js";
import type { includeExplainingDiagnostic } from "./processingDiagnostic.js";
import type { Program } from "./program.js";

import type { GoFunc } from "../../go/compat.js";

const fileIncludeReasonKey: GoMapKeyDescriptor<GoPtr<FileIncludeReason>> = GoPointerKey<FileIncludeReason>();
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::type::includeProcessor","kind":"type","status":"implemented","sigHash":"2efafe763ea3a3c2973f6532b40068cec44411815fa26a6fe84b2d6e54e440f3"}
 *
 * Go source:
 * includeProcessor struct {
 * 	fileIncludeReasons    map[tspath.Path][]*FileIncludeReason
 * 	processingDiagnostics []*processingDiagnostic
 * 
 * 	reasonToReferenceLocation  collections.SyncMap[*FileIncludeReason, *referenceFileLocation]
 * 	includeReasonToRelatedInfo collections.SyncMap[*FileIncludeReason, *ast.Diagnostic]
 * 	redirectAndFileFormat      collections.SyncMap[tspath.Path, []*ast.Diagnostic]
 * 	computedDiagnostics        *ast.DiagnosticsCollection
 * 	computedDiagnosticsOnce    sync.Once
 * 	compilerOptionsSyntax      *ast.ObjectLiteralExpression
 * 	compilerOptionsSyntaxOnce  sync.Once
 * }
 */
export interface includeProcessor {
  fileIncludeReasons: GoMap<Path, GoSlice<GoPtr<FileIncludeReason>>>;
  processingDiagnostics: GoSlice<GoPtr<processingDiagnostic>>;
  reasonToReferenceLocation: SyncMap<GoPtr<FileIncludeReason>, GoPtr<referenceFileLocation>>;
  includeReasonToRelatedInfo: SyncMap<GoPtr<FileIncludeReason>, GoPtr<Diagnostic>>;
  redirectAndFileFormat: SyncMap<Path, GoSlice<GoPtr<Diagnostic>>>;
  computedDiagnostics: GoPtr<DiagnosticsCollection>;
  computedDiagnosticsOnce: Once;
  compilerOptionsSyntax: GoPtr<ObjectLiteralExpression>;
  compilerOptionsSyntaxOnce: Once;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::func::updateFileIncludeProcessor","kind":"func","status":"implemented","sigHash":"cd9ede619520787b2eed9a5f979052266af0014ff54619cadeb1671b0fc53678"}
 *
 * Go source:
 * func updateFileIncludeProcessor(p *Program) {
 * 	p.includeProcessor = &includeProcessor{
 * 		fileIncludeReasons:    p.includeProcessor.fileIncludeReasons,
 * 		processingDiagnostics: p.includeProcessor.processingDiagnostics,
 * 	}
 * }
 */
export function updateFileIncludeProcessor(p: GoPtr<Program>): void {
  const old = p!.__tsgoEmbedded0!.includeProcessor;
  p!.__tsgoEmbedded0!.includeProcessor = {
    fileIncludeReasons: old!.fileIncludeReasons,
    processingDiagnostics: old!.processingDiagnostics,
    reasonToReferenceLocation: { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapImpl() } as SyncMap<GoPtr<FileIncludeReason>, GoPtr<referenceFileLocation>>,
    includeReasonToRelatedInfo: { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapImpl() } as SyncMap<GoPtr<FileIncludeReason>, GoPtr<Diagnostic>>,
    redirectAndFileFormat: { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapImpl() } as SyncMap<Path, GoSlice<GoPtr<Diagnostic>>>,
    computedDiagnostics: undefined,
    computedDiagnosticsOnce: new Once(),
    compilerOptionsSyntax: undefined,
    compilerOptionsSyntaxOnce: new Once(),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.getDiagnostics","kind":"method","status":"implemented","sigHash":"a20014f7daf68398b649bd2efaac7828ef6e056e8d14593b47eed90a616e26e9"}
 *
 * Go source:
 * func (i *includeProcessor) getDiagnostics(p *Program) *ast.DiagnosticsCollection {
 * 	i.computedDiagnosticsOnce.Do(func() {
 * 		i.computedDiagnostics = &ast.DiagnosticsCollection{}
 * 		for _, d := range i.processingDiagnostics {
 * 			i.computedDiagnostics.Add(d.toDiagnostic(p))
 * 		}
 * 		for _, resolutions := range p.resolvedModules {
 * 			for _, resolvedModule := range resolutions {
 * 				for _, diag := range resolvedModule.ResolutionDiagnostics {
 * 					i.computedDiagnostics.Add(diag)
 * 				}
 * 			}
 * 		}
 * 		for _, typeResolutions := range p.typeResolutionsInFile {
 * 			for _, resolvedTypeRef := range typeResolutions {
 * 				for _, diag := range resolvedTypeRef.ResolutionDiagnostics {
 * 					i.computedDiagnostics.Add(diag)
 * 				}
 * 			}
 * 		}
 * 	})
 * 	return i.computedDiagnostics
 * }
 */
export function includeProcessor_getDiagnostics(receiver: GoPtr<includeProcessor>, p: GoPtr<Program>): GoPtr<DiagnosticsCollection> {
  receiver!.computedDiagnosticsOnce.Do((): void => {
    const coll: DiagnosticsCollection = {
      mu: new (class { Lock(): void {} Unlock(): void {} TryLock(): bool { return true; } })(),
      count: 0 as int,
      fileDiagnostics: GoNilMap(),
      fileDiagnosticsSorted: { M: GoNilMap() },
      nonFileDiagnostics: GoNilSlice(),
      nonFileDiagnosticsSorted: false as bool,
    };
    receiver!.computedDiagnostics = coll;
    for (const d of receiver!.processingDiagnostics ?? []) {
      DiagnosticsCollection_Add(receiver!.computedDiagnostics, processingDiagnostic_toDiagnostic(d, p));
    }
    for (const [, resolutions] of p!.__tsgoEmbedded0!.resolvedModules) {
      for (const [, resolvedModule] of resolutions ?? []) {
        const rm = resolvedModule as { ResolutionDiagnostics: GoSlice<GoPtr<Diagnostic>> } | undefined;
        if (rm !== undefined) {
          for (const diag of rm.ResolutionDiagnostics) {
            DiagnosticsCollection_Add(receiver!.computedDiagnostics, diag);
          }
        }
      }
    }
    for (const [, typeResolutions] of p!.__tsgoEmbedded0!.typeResolutionsInFile) {
      for (const [, resolvedTypeRef] of typeResolutions ?? []) {
        const rt = resolvedTypeRef as { ResolutionDiagnostics: GoSlice<GoPtr<Diagnostic>> } | undefined;
        if (rt !== undefined) {
          for (const diag of rt.ResolutionDiagnostics) {
            DiagnosticsCollection_Add(receiver!.computedDiagnostics, diag);
          }
        }
      }
    }
  });
  return receiver!.computedDiagnostics;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.addProcessingDiagnostic","kind":"method","status":"implemented","sigHash":"87c749047e25e59bee8a129fb081853430430809eeab16cdd008755641a3335c"}
 *
 * Go source:
 * func (i *includeProcessor) addProcessingDiagnostic(d ...*processingDiagnostic) {
 * 	i.processingDiagnostics = append(i.processingDiagnostics, d...)
 * }
 */
export function includeProcessor_addProcessingDiagnostic(receiver: GoPtr<includeProcessor>, ...d: Array<GoPtr<processingDiagnostic>>): void {
  receiver!.processingDiagnostics = [...receiver!.processingDiagnostics, ...d];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.addProcessingDiagnosticsForFileCasing","kind":"method","status":"implemented","sigHash":"e622d80191db1ccdbfcac4fc01bb75104868961288907dd8491941d2995f1230"}
 *
 * Go source:
 * func (i *includeProcessor) addProcessingDiagnosticsForFileCasing(file tspath.Path, existingCasing string, currentCasing string, reason *FileIncludeReason) {
 * 	if !reason.isReferencedFile() && slices.ContainsFunc(i.fileIncludeReasons[file], func(r *FileIncludeReason) bool {
 * 		return r.isReferencedFile()
 * 	}) {
 * 		i.addProcessingDiagnostic(&processingDiagnostic{
 * 			kind: processingDiagnosticKindExplainingFileInclude,
 * 			data: &includeExplainingDiagnostic{
 * 				file:             file,
 * 				diagnosticReason: reason,
 * 				message:          diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing,
 * 				args:             []any{existingCasing, currentCasing},
 * 			},
 * 		})
 * 	} else {
 * 		i.addProcessingDiagnostic(&processingDiagnostic{
 * 			kind: processingDiagnosticKindExplainingFileInclude,
 * 			data: &includeExplainingDiagnostic{
 * 				file:             file,
 * 				diagnosticReason: reason,
 * 				message:          diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing,
 * 				args:             []any{currentCasing, existingCasing},
 * 			},
 * 		})
 * 	}
 * }
 */
export function includeProcessor_addProcessingDiagnosticsForFileCasing(receiver: GoPtr<includeProcessor>, file: Path, existingCasing: string, currentCasing: string, reason: GoPtr<FileIncludeReason>): void {
  const reasons = receiver!.fileIncludeReasons.get(file);
  if (!FileIncludeReason_isReferencedFile(reason) && ContainsFunc(reasons ?? [], (r: GoPtr<FileIncludeReason>): bool => FileIncludeReason_isReferencedFile(r))) {
    includeProcessor_addProcessingDiagnostic(receiver, {
      kind: processingDiagnosticKindExplainingFileInclude,
      data: {
        file,
        diagnosticReason: reason,
        message: Already_included_file_name_0_differs_from_file_name_1_only_in_casing,
        args: [existingCasing, currentCasing],
      } as includeExplainingDiagnostic,
    });
  } else {
    includeProcessor_addProcessingDiagnostic(receiver, {
      kind: processingDiagnosticKindExplainingFileInclude,
      data: {
        file,
        diagnosticReason: reason,
        message: File_name_0_differs_from_already_included_file_name_1_only_in_casing,
        args: [currentCasing, existingCasing],
      } as includeExplainingDiagnostic,
    });
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.getReferenceLocation","kind":"method","status":"implemented","sigHash":"00b35dc9c1869b9e7f9c49d815681c829cd06af5681e9894a50f8408065d34b3"}
 *
 * Go source:
 * func (i *includeProcessor) getReferenceLocation(r *FileIncludeReason, program *Program) *referenceFileLocation {
 * 	if existing, ok := i.reasonToReferenceLocation.Load(r); ok {
 * 		return existing
 * 	}
 * 
 * 	loc, _ := i.reasonToReferenceLocation.LoadOrStore(r, r.getReferencedLocation(program))
 * 	return loc
 * }
 */
export function includeProcessor_getReferenceLocation(receiver: GoPtr<includeProcessor>, r: GoPtr<FileIncludeReason>, program: GoPtr<Program>): GoPtr<referenceFileLocation> {
  const [existing, ok] = SyncMap_Load(receiver!.reasonToReferenceLocation, r, GoZeroPointer<referenceFileLocation>, fileIncludeReasonKey);
  if (ok) {
    return existing;
  }
  const [loc] = SyncMap_LoadOrStore<GoPtr<FileIncludeReason>, GoPtr<referenceFileLocation>>(receiver!.reasonToReferenceLocation as unknown as SyncMap<GoPtr<FileIncludeReason>, GoPtr<referenceFileLocation>>, r, FileIncludeReason_getReferencedLocation(r, program), GoZeroPointer<referenceFileLocation>, fileIncludeReasonKey);
  return loc;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.getCompilerOptionsObjectLiteralSyntax","kind":"method","status":"implemented","sigHash":"583b0a3cd6f5921f51f82cbf825230aac9b343b2c89898e21d7d691895c37924"}
 *
 * Go source:
 * func (i *includeProcessor) getCompilerOptionsObjectLiteralSyntax(program *Program) *ast.ObjectLiteralExpression {
 * 	i.compilerOptionsSyntaxOnce.Do(func() {
 * 		configFile := program.opts.Config.ConfigFile
 * 		if configFile != nil {
 * 			if compilerOptionsProperty := tsoptions.ForEachTsConfigPropArray(configFile.SourceFile, "compilerOptions", core.Identity); compilerOptionsProperty != nil &&
 * 				compilerOptionsProperty.Initializer != nil &&
 * 				ast.IsObjectLiteralExpression(compilerOptionsProperty.Initializer) {
 * 				i.compilerOptionsSyntax = compilerOptionsProperty.Initializer.AsObjectLiteralExpression()
 * 			}
 * 		} else {
 * 			i.compilerOptionsSyntax = nil
 * 		}
 * 	})
 * 	return i.compilerOptionsSyntax
 * }
 */
export function includeProcessor_getCompilerOptionsObjectLiteralSyntax(receiver: GoPtr<includeProcessor>, program: GoPtr<Program>): GoPtr<ObjectLiteralExpression> {
  receiver!.compilerOptionsSyntaxOnce.Do((): void => {
    const configFile = program!.opts.Config!.ConfigFile;
    if (configFile !== undefined) {
      const compilerOptionsProperty = ForEachTsConfigPropArray(configFile.SourceFile, "compilerOptions", (property) => GoValueRef<PropertyAssignment>(Identity(property)!));
      if (compilerOptionsProperty !== undefined) {
        const property = compilerOptionsProperty.v;
        if (property.Initializer !== undefined && IsObjectLiteralExpression(property.Initializer)) {
          receiver!.compilerOptionsSyntax = AsObjectLiteralExpression(property.Initializer);
        }
      }
    } else {
      receiver!.compilerOptionsSyntax = undefined;
    }
  });
  return receiver!.compilerOptionsSyntax;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.getRelatedInfo","kind":"method","status":"implemented","sigHash":"2769a6ec55d6285538bdd516c8ec90b5c9f75c42b72236428d47d752e93a5a67"}
 *
 * Go source:
 * func (i *includeProcessor) getRelatedInfo(r *FileIncludeReason, program *Program) *ast.Diagnostic {
 * 	if existing, ok := i.includeReasonToRelatedInfo.Load(r); ok {
 * 		return existing
 * 	}
 * 
 * 	relatedInfo, _ := i.includeReasonToRelatedInfo.LoadOrStore(r, r.toRelatedInfo(program))
 * 	return relatedInfo
 * }
 */
export function includeProcessor_getRelatedInfo(receiver: GoPtr<includeProcessor>, r: GoPtr<FileIncludeReason>, program: GoPtr<Program>): GoPtr<Diagnostic> {
  const [existing, ok] = SyncMap_Load(receiver!.includeReasonToRelatedInfo, r, GoZeroPointer<Diagnostic>, fileIncludeReasonKey);
  if (ok) {
    return existing;
  }
  const [relatedInfo] = SyncMap_LoadOrStore<GoPtr<FileIncludeReason>, GoPtr<Diagnostic>>(receiver!.includeReasonToRelatedInfo as unknown as SyncMap<GoPtr<FileIncludeReason>, GoPtr<Diagnostic>>, r, FileIncludeReason_toRelatedInfo(r, program), GoZeroPointer<Diagnostic>, fileIncludeReasonKey);
  return relatedInfo;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/includeprocessor.go::method::includeProcessor.explainRedirectAndImpliedFormat","kind":"method","status":"implemented","sigHash":"e202b35c33de1654b2cd84c97131572b8405bf39afe3f60583766fbfb5eadc5c"}
 *
 * Go source:
 * func (i *includeProcessor) explainRedirectAndImpliedFormat(
 * 	program *Program,
 * 	filePath tspath.Path,
 * 	toFileName func(fileName string) string,
 * ) []*ast.Diagnostic {
 * 	if existing, ok := i.redirectAndFileFormat.Load(filePath); ok {
 * 		return existing
 * 	}
 * 	var file ast.HasFileName
 * 	var sourceFile *ast.SourceFile
 * 	redirectsFile := program.redirectFilesByPath[filePath]
 * 	if redirectsFile != nil {
 * 		file = redirectsFile
 * 	} else {
 * 		sourceFile = program.GetSourceFileByPath(filePath)
 * 		if sourceFile == nil {
 * 			return nil
 * 		}
 * 		file = sourceFile
 * 	}
 * 	var result []*ast.Diagnostic
 * 	if source := program.GetSourceOfProjectReferenceIfOutputIncluded(file); source != file.FileName() {
 * 		result = append(result, ast.NewCompilerDiagnostic(
 * 			diagnostics.File_is_output_of_project_reference_source_0,
 * 			toFileName(source),
 * 		))
 * 	}
 * 
 * 	if redirectsFile != nil {
 * 		targetFile := program.GetSourceFileByPath(redirectsFile.target)
 * 		result = append(result, ast.NewCompilerDiagnostic(
 * 			diagnostics.File_redirects_to_file_0,
 * 			toFileName(targetFile.FileName()),
 * 		))
 * 	}
 * 
 * 	if sourceFile != nil && ast.IsExternalOrCommonJSModule(sourceFile) {
 * 		metaData := program.GetSourceFileMetaData(file.Path())
 * 		switch program.GetImpliedNodeFormatForEmit(file) {
 * 		case core.ModuleKindESNext:
 * 			if metaData.PackageJsonType == "module" {
 * 				result = append(result, ast.NewCompilerDiagnostic(
 * 					diagnostics.File_is_ECMAScript_module_because_0_has_field_type_with_value_module,
 * 					toFileName(metaData.PackageJsonDirectory+"/package.json"),
 * 				))
 * 			}
 * 		case core.ModuleKindCommonJS:
 * 			if metaData.PackageJsonType != "" {
 * 				result = append(result, ast.NewCompilerDiagnostic(diagnostics.File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module, toFileName(metaData.PackageJsonDirectory+"/package.json")))
 * 			} else if metaData.PackageJsonDirectory != "" {
 * 				if metaData.PackageJsonType == "" {
 * 					result = append(result, ast.NewCompilerDiagnostic(diagnostics.File_is_CommonJS_module_because_0_does_not_have_field_type, toFileName(metaData.PackageJsonDirectory+"/package.json")))
 * 				}
 * 			} else {
 * 				result = append(result, ast.NewCompilerDiagnostic(diagnostics.File_is_CommonJS_module_because_package_json_was_not_found))
 * 			}
 * 		}
 * 	}
 * 
 * 	result, _ = i.redirectAndFileFormat.LoadOrStore(filePath, result)
 * 	return result
 * }
 */
export function includeProcessor_explainRedirectAndImpliedFormat(receiver: GoPtr<includeProcessor>, program: GoPtr<Program>, filePath: Path, toFileName: GoFunc<(fileName: string) => string>): GoSlice<GoPtr<Diagnostic>> {
  const [existing, ok] = SyncMap_Load(receiver!.redirectAndFileFormat, filePath, GoZeroSlice<GoPtr<Diagnostic>>, GoStringKey);
  if (ok) {
    return existing;
  }
  let file: HasFileName | undefined = undefined;
  let sourceFile: GoPtr<SourceFile> = undefined;
  const redirectsFile = program!.__tsgoEmbedded0!.redirectFilesByPath.get(filePath);
  if (redirectsFile !== undefined) {
    file = redirectsFile as unknown as HasFileName;
  } else {
    sourceFile = Program_GetSourceFileByPath(program, filePath);
    if (sourceFile === undefined) {
      return [];
    }
    file = sourceFile as unknown as HasFileName;
  }
  let result: GoSlice<GoPtr<Diagnostic>> = [];
  const source = Program_GetSourceOfProjectReferenceIfOutputIncluded(program, file!);
  if (source !== file!.FileName()) {
    result = [...result, NewCompilerDiagnostic(
      File_is_output_of_project_reference_source_0,
      toFileName!(source),
    )];
  }

  if (redirectsFile !== undefined) {
    const targetFile = Program_GetSourceFileByPath(program, redirectsFile.target);
    result = [...result, NewCompilerDiagnostic(
      File_redirects_to_file_0,
      toFileName!(SourceFile_FileName(targetFile)),
    )];
  }

  if (sourceFile !== undefined && IsExternalOrCommonJSModule(sourceFile)) {
    const metaData = Program_GetSourceFileMetaData(program, file!.Path());
    const impliedFormat = Program_GetImpliedNodeFormatForEmit(program, file!);
    if (impliedFormat === ModuleKindESNext) {
      if (metaData.PackageJsonType === "module") {
        result = [...result, NewCompilerDiagnostic(
          File_is_ECMAScript_module_because_0_has_field_type_with_value_module,
          toFileName!(metaData.PackageJsonDirectory + "/package.json"),
        )];
      }
    } else if (impliedFormat === ModuleKindCommonJS) {
      if (metaData.PackageJsonType !== "") {
        result = [...result, NewCompilerDiagnostic(File_is_CommonJS_module_because_0_has_field_type_whose_value_is_not_module, toFileName!(metaData.PackageJsonDirectory + "/package.json"))];
      } else if (metaData.PackageJsonDirectory !== "") {
        if (metaData.PackageJsonType === "") {
          result = [...result, NewCompilerDiagnostic(File_is_CommonJS_module_because_0_does_not_have_field_type, toFileName!(metaData.PackageJsonDirectory + "/package.json"))];
        }
      } else {
        result = [...result, NewCompilerDiagnostic(File_is_CommonJS_module_because_package_json_was_not_found)];
      }
    }
  }

  const [stored] = SyncMap_LoadOrStore<Path, GoSlice<GoPtr<Diagnostic>>>(receiver!.redirectAndFileFormat as unknown as SyncMap<Path, GoSlice<GoPtr<Diagnostic>>>, filePath, result, GoZeroSlice<GoPtr<Diagnostic>>, GoStringKey);
  return stored;
}
