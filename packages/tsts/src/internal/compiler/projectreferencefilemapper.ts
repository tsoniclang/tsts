import type { bool, int } from "../../go/scalars.js";
import { GoMapLookup, GoNilSlice, GoStringKey, GoZeroPointer, type GoMap, type GoPtr, type GoSlice } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend } from "../../go/compat.js";
import * as strings from "../../go/strings.js";
import { SourceFile_Path } from "../ast/ast.js";
import type { HasFileName, SourceFile } from "../ast/ast.js";
import { NewSetWithSizeHint, Set_Add, Set_AddIfAbsent } from "../collections/set.js";
import type { Set } from "../collections/set.js";
import { SyncMap_Load, SyncMap_Store } from "../collections/syncmap.js";
import type { SyncMap } from "../collections/syncmap.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { Tristate_IsTrue } from "../core/tristate.js";
import { GetCompilerOptionsWithRedirect } from "../module/resolver.js";
import { ParsedCommandLine_CompilerOptions, ParsedCommandLine_as_ResolvedProjectReference } from "../tsoptions/parsedcommandline.js";
import type { ResolvedProjectReference, ResolutionHost } from "../module/types.js";
import type { ParsedCommandLine, SourceOutputAndProjectReference } from "../tsoptions/parsedcommandline.js";
import type { Path } from "../tspath/path.js";
import { fileLoader_toPath } from "./fileloader.js";
import type { fileLoader } from "./fileloader.js";
import { ProgramOptions_canUseProjectReferenceSource } from "./program.js";
import type { ProgramOptions } from "./program.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
import { GoSliceMake } from "../../go/compat.js";
import { GoSliceLoad, GoStringValueOps } from "../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::type::projectReferenceFileMapper","kind":"type","status":"implemented","sigHash":"6ba4d34374b0e8d11cb5ffc2a70018db101db1ceb8e2288f9e1c82a2d29a0864"}
 *
 * Go source:
 * projectReferenceFileMapper struct {
 * 	opts   ProgramOptions
 * 	host   module.ResolutionHost
 * 	loader *fileLoader // Only present during populating the mapper and parsing, released after that
 * 
 * 	configToProjectReference    map[tspath.Path]*tsoptions.ParsedCommandLine // All the resolved references needed
 * 	referencesInConfigFile      map[tspath.Path][]tspath.Path                // Map of config file to its references
 * 	sourceToProjectReference    map[tspath.Path]*tsoptions.SourceOutputAndProjectReference
 * 	outputDtsToProjectReference map[tspath.Path]*tsoptions.SourceOutputAndProjectReference
 * 
 * 	// Store all the realpath from dts in node_modules to source file from project reference needed during parsing so it can be used later
 * 	realpathDtsToSource collections.SyncMap[tspath.Path, *tsoptions.SourceOutputAndProjectReference]
 * }
 */
export interface projectReferenceFileMapper {
  opts: ProgramOptions;
  host: GoInterface<ResolutionHost>;
  loader: GoPtr<fileLoader>;
  configToProjectReference: GoMap<Path, GoPtr<ParsedCommandLine>>;
  referencesInConfigFile: GoMap<Path, GoSlice<Path>>;
  sourceToProjectReference: GoMap<Path, GoPtr<SourceOutputAndProjectReference>>;
  outputDtsToProjectReference: GoMap<Path, GoPtr<SourceOutputAndProjectReference>>;
  realpathDtsToSource: SyncMap<Path, GoPtr<SourceOutputAndProjectReference>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getParseFileRedirect","kind":"method","status":"implemented","sigHash":"443d5fbcdb23fe26450f2b867958ab98864f90a7fd948906f5068179a8889dcc"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getParseFileRedirect(file ast.HasFileName) string {
 * 	if mapper.opts.canUseProjectReferenceSource() {
 * 		// Map to source file from project reference
 * 		source := mapper.getProjectReferenceFromOutputDts(file.Path())
 * 		if source == nil {
 * 			source = mapper.getSourceToDtsIfSymlink(file)
 * 		}
 * 		if source != nil {
 * 			return source.Source
 * 		}
 * 	} else {
 * 		// Map to dts file from project reference
 * 		output := mapper.getProjectReferenceFromSource(file.Path())
 * 		if output != nil && output.OutputDts != "" {
 * 			return output.OutputDts
 * 		}
 * 	}
 * 	return ""
 * }
 */
export function projectReferenceFileMapper_getParseFileRedirect(receiver: GoPtr<projectReferenceFileMapper>, file: GoInterface<HasFileName>): string {
  if (ProgramOptions_canUseProjectReferenceSource(receiver!.opts)) {
    // Map to source file from project reference
    let source = projectReferenceFileMapper_getProjectReferenceFromOutputDts(receiver, file!.Path());
    if (source === undefined) {
      source = projectReferenceFileMapper_getSourceToDtsIfSymlink(receiver, file);
    }
    if (source !== undefined) {
      return source.Source;
    }
  } else {
    // Map to dts file from project reference
    const output = projectReferenceFileMapper_getProjectReferenceFromSource(receiver, file!.Path());
    if (output !== undefined && output.OutputDts !== "") {
      return output.OutputDts;
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getResolvedProjectReferences","kind":"method","status":"implemented","sigHash":"574bc40821ce53dc86eaadc776ebae140295e7963308985d393cf5a36f3b4243"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getResolvedProjectReferences() []*tsoptions.ParsedCommandLine {
 * 	if mapper.opts.Config.ConfigFile == nil {
 * 		return nil
 * 	}
 * 	refs, ok := mapper.referencesInConfigFile[mapper.opts.Config.ConfigFile.SourceFile.Path()]
 * 	var result []*tsoptions.ParsedCommandLine
 * 	if ok {
 * 		result = make([]*tsoptions.ParsedCommandLine, 0, len(refs))
 * 		for _, refPath := range refs {
 * 			refConfig, _ := mapper.configToProjectReference[refPath]
 * 			result = append(result, refConfig)
 * 		}
 * 	}
 * 	return result
 * }
 */
export function projectReferenceFileMapper_getResolvedProjectReferences(receiver: GoPtr<projectReferenceFileMapper>): GoSlice<GoPtr<ParsedCommandLine>> {
  if (receiver!.opts.Config!.ConfigFile === undefined) {
    return GoNilSlice();
  }
  const refs = SourceFile_Path(receiver!.opts.Config!.ConfigFile!.SourceFile);
  const ok = receiver!.referencesInConfigFile.has(refs);
  let result = GoNilSlice<GoPtr<ParsedCommandLine>>();
  if (ok) {
    const refPaths = receiver!.referencesInConfigFile.get(refs)!;
    result = GoSliceMake(0, 0, GoPointerValueOps<ParsedCommandLine>());
    for (
      let __goRangeSlice = refPaths,
        __goRangeLength = __goRangeSlice.length,
        __goRangeValueOps = GoStringValueOps,
        __goRangeIndex = 0;
      __goRangeIndex < __goRangeLength;
      __goRangeIndex++
    ) {
      const refPath = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
      const refConfig = receiver!.configToProjectReference.get(refPath);
      result = GoSliceAppend(result, refConfig, GoPointerValueOps<ParsedCommandLine>());
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getProjectReferenceFromSource","kind":"method","status":"implemented","sigHash":"0d58e28c39846a67abdcadaca766b3f4d5093b40254947a76625df623286ac5d"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
 * 	return mapper.sourceToProjectReference[path]
 * }
 */
export function projectReferenceFileMapper_getProjectReferenceFromSource(receiver: GoPtr<projectReferenceFileMapper>, path: Path): GoPtr<SourceOutputAndProjectReference> {
  return receiver!.sourceToProjectReference.get(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getProjectReferenceFromOutputDts","kind":"method","status":"implemented","sigHash":"e481e0eb7459bbf651ea47b68269b41f6f4780dd41b99042ac4925173a9c8dc2"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getProjectReferenceFromOutputDts(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
 * 	return mapper.outputDtsToProjectReference[path]
 * }
 */
export function projectReferenceFileMapper_getProjectReferenceFromOutputDts(receiver: GoPtr<projectReferenceFileMapper>, path: Path): GoPtr<SourceOutputAndProjectReference> {
  return receiver!.outputDtsToProjectReference.get(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.isSourceFromProjectReference","kind":"method","status":"implemented","sigHash":"e60ee5d125e9553239739a0e5e2c3d68f3d8791d55c07cee56ec9824e0a08bf3"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) isSourceFromProjectReference(path tspath.Path) bool {
 * 	return mapper.opts.canUseProjectReferenceSource() && mapper.getProjectReferenceFromSource(path) != nil
 * }
 */
export function projectReferenceFileMapper_isSourceFromProjectReference(receiver: GoPtr<projectReferenceFileMapper>, path: Path): bool {
  return ProgramOptions_canUseProjectReferenceSource(receiver!.opts) && projectReferenceFileMapper_getProjectReferenceFromSource(receiver, path) !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getCompilerOptionsForFile","kind":"method","status":"implemented","sigHash":"648ac6345ae46efeb4c78b1f11f11c5b27263be410527329bf2a131eaf3f46bf"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getCompilerOptionsForFile(file ast.HasFileName) *core.CompilerOptions {
 * 	redirect := mapper.getRedirectParsedCommandLineForResolution(file)
 * 	return module.GetCompilerOptionsWithRedirect(mapper.opts.Config.CompilerOptions(), redirect)
 * }
 */
export function projectReferenceFileMapper_getCompilerOptionsForFile(receiver: GoPtr<projectReferenceFileMapper>, file: GoInterface<HasFileName>): GoPtr<CompilerOptions> {
  const redirect = projectReferenceFileMapper_getRedirectParsedCommandLineForResolution(receiver, file);
  const redirectedReference: GoInterface<ResolvedProjectReference> = redirect !== undefined
    ? ParsedCommandLine_as_ResolvedProjectReference(redirect)
    : undefined;
  return GetCompilerOptionsWithRedirect(ParsedCommandLine_CompilerOptions(receiver!.opts.Config), redirectedReference);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getRedirectParsedCommandLineForResolution","kind":"method","status":"implemented","sigHash":"81228748952f1031e9ccb4601ddef04a082645d305150efc155c46b340d5006a"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getRedirectParsedCommandLineForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
 * 	redirect, _ := mapper.getRedirectForResolution(file)
 * 	return redirect
 * }
 */
export function projectReferenceFileMapper_getRedirectParsedCommandLineForResolution(receiver: GoPtr<projectReferenceFileMapper>, file: GoInterface<HasFileName>): GoPtr<ParsedCommandLine> {
  const [redirect] = projectReferenceFileMapper_getRedirectForResolution(receiver, file);
  return redirect;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getRedirectForResolution","kind":"method","status":"implemented","sigHash":"23dffafde00401d006e7f08c2b83e05ac9dedcd9b8354396bf7fabe02332588b"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getRedirectForResolution(file ast.HasFileName) (*tsoptions.ParsedCommandLine, string) {
 * 	path := file.Path()
 * 	// Check if outputdts of source file from project reference
 * 	output := mapper.getProjectReferenceFromSource(path)
 * 	if output != nil {
 * 		return output.Resolved, output.Source
 * 	}
 * 
 * 	// Source file from project reference
 * 	resultFromDts := mapper.getProjectReferenceFromOutputDts(path)
 * 	if resultFromDts != nil {
 * 		return resultFromDts.Resolved, resultFromDts.Source
 * 	}
 * 
 * 	realpathDtsToSource := mapper.getSourceToDtsIfSymlink(file)
 * 	if realpathDtsToSource != nil {
 * 		return realpathDtsToSource.Resolved, realpathDtsToSource.Source
 * 	}
 * 	return nil, file.FileName()
 * }
 */
export function projectReferenceFileMapper_getRedirectForResolution(receiver: GoPtr<projectReferenceFileMapper>, file: GoInterface<HasFileName>): [GoPtr<ParsedCommandLine>, string] {
  const path = file!.Path();
  // Check if outputdts of source file from project reference
  const output = projectReferenceFileMapper_getProjectReferenceFromSource(receiver, path);
  if (output !== undefined) {
    return [output.Resolved, output.Source];
  }

  // Source file from project reference
  const resultFromDts = projectReferenceFileMapper_getProjectReferenceFromOutputDts(receiver, path);
  if (resultFromDts !== undefined) {
    return [resultFromDts.Resolved, resultFromDts.Source];
  }

  const realpathDtsToSource = projectReferenceFileMapper_getSourceToDtsIfSymlink(receiver, file);
  if (realpathDtsToSource !== undefined) {
    return [realpathDtsToSource.Resolved, realpathDtsToSource.Source];
  }
  return [undefined, file!.FileName()];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getResolvedReferenceFor","kind":"method","status":"implemented","sigHash":"5e2d0e4e01d7349b0c9a21f85804d930008798cb003e03b7a6390f70d69ce155"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getResolvedReferenceFor(path tspath.Path) (*tsoptions.ParsedCommandLine, bool) {
 * 	config, ok := mapper.configToProjectReference[path]
 * 	return config, ok
 * }
 */
export function projectReferenceFileMapper_getResolvedReferenceFor(receiver: GoPtr<projectReferenceFileMapper>, path: Path): [GoPtr<ParsedCommandLine>, bool] {
  const config = receiver!.configToProjectReference.get(path);
  const ok = receiver!.configToProjectReference.has(path);
  return [config, ok];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.rangeResolvedProjectReference","kind":"method","status":"implemented","sigHash":"bb49154f76c97e6e48c99f97162d83bf1802886e9adc44a191b9d080f5f3e586"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) rangeResolvedProjectReference(
 * 	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
 * ) bool {
 * 	if mapper.opts.Config.ConfigFile == nil {
 * 		return false
 * 	}
 * 	seenRef := collections.NewSetWithSizeHint[tspath.Path](len(mapper.referencesInConfigFile))
 * 	seenRef.Add(mapper.opts.Config.ConfigFile.SourceFile.Path())
 * 	refs := mapper.referencesInConfigFile[mapper.opts.Config.ConfigFile.SourceFile.Path()]
 * 	return mapper.rangeResolvedReferenceWorker(refs, f, mapper.opts.Config, seenRef)
 * }
 */
export function projectReferenceFileMapper_rangeResolvedProjectReference(receiver: GoPtr<projectReferenceFileMapper>, f: GoFunc<(path: Path, config: GoPtr<ParsedCommandLine>, parent: GoPtr<ParsedCommandLine>, index: int) => bool>): bool {
  if (receiver!.opts.Config!.ConfigFile === undefined) {
    return false;
  }
  const seenRef = NewSetWithSizeHint<Path>(receiver!.referencesInConfigFile.size, GoStringKey);
  Set_Add(seenRef, SourceFile_Path(receiver!.opts.Config!.ConfigFile!.SourceFile), GoStringKey);
  const [refs] = GoMapLookup(receiver!.referencesInConfigFile, SourceFile_Path(receiver!.opts.Config!.ConfigFile!.SourceFile), GoNilSlice<Path>);
  return projectReferenceFileMapper_rangeResolvedReferenceWorker(receiver, refs, f, receiver!.opts.Config, seenRef);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.rangeResolvedReferenceWorker","kind":"method","status":"implemented","sigHash":"75d3bc5f39713329e257b3eb8767d820b86644eb9468be82762a278a0435bb7b"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) rangeResolvedReferenceWorker(
 * 	references []tspath.Path,
 * 	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
 * 	parent *tsoptions.ParsedCommandLine,
 * 	seenRef *collections.Set[tspath.Path],
 * ) bool {
 * 	for index, path := range references {
 * 		if !seenRef.AddIfAbsent(path) {
 * 			continue
 * 		}
 * 		config, _ := mapper.configToProjectReference[path]
 * 		if !f(path, config, parent, index) {
 * 			return false
 * 		}
 * 		if !mapper.rangeResolvedReferenceWorker(mapper.referencesInConfigFile[path], f, config, seenRef) {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function projectReferenceFileMapper_rangeResolvedReferenceWorker(receiver: GoPtr<projectReferenceFileMapper>, references: GoSlice<Path>, f: GoFunc<(path: Path, config: GoPtr<ParsedCommandLine>, parent: GoPtr<ParsedCommandLine>, index: int) => bool>, parent: GoPtr<ParsedCommandLine>, seenRef: GoPtr<Set<Path>>): bool {
  for (let index = 0; index < references.length; index++) {
    const path = GoSliceLoad(references, index, GoStringValueOps)!;
    if (!Set_AddIfAbsent(seenRef as GoPtr<Set<Path>>, path, GoStringKey)) {
      continue;
    }
    const config = receiver!.configToProjectReference.get(path);
    if (!f!(path, config, parent, index)) {
      return false;
    }
    const [childReferences] = GoMapLookup(receiver!.referencesInConfigFile, path, GoNilSlice<Path>);
    if (!projectReferenceFileMapper_rangeResolvedReferenceWorker(receiver, childReferences, f, config, seenRef)) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.rangeResolvedProjectReferenceInChildConfig","kind":"method","status":"implemented","sigHash":"73e5edd34ec23f6bfd6a48b272b609c4bb6ba0b61f44b4621b481ecc0f469014"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) rangeResolvedProjectReferenceInChildConfig(
 * 	childConfig *tsoptions.ParsedCommandLine,
 * 	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
 * ) bool {
 * 	if childConfig == nil || childConfig.ConfigFile == nil {
 * 		return false
 * 	}
 * 	seenRef := collections.NewSetWithSizeHint[tspath.Path](len(mapper.referencesInConfigFile))
 * 	seenRef.Add(childConfig.ConfigFile.SourceFile.Path())
 * 	refs := mapper.referencesInConfigFile[childConfig.ConfigFile.SourceFile.Path()]
 * 	return mapper.rangeResolvedReferenceWorker(refs, f, mapper.opts.Config, seenRef)
 * }
 */
export function projectReferenceFileMapper_rangeResolvedProjectReferenceInChildConfig(receiver: GoPtr<projectReferenceFileMapper>, childConfig: GoPtr<ParsedCommandLine>, f: GoFunc<(path: Path, config: GoPtr<ParsedCommandLine>, parent: GoPtr<ParsedCommandLine>, index: int) => bool>): bool {
  if (childConfig === undefined || childConfig.ConfigFile === undefined) {
    return false;
  }
  const seenRef = NewSetWithSizeHint<Path>(receiver!.referencesInConfigFile.size, GoStringKey);
  Set_Add(seenRef, SourceFile_Path(childConfig.ConfigFile!.SourceFile), GoStringKey);
  const [refs] = GoMapLookup(receiver!.referencesInConfigFile, SourceFile_Path(childConfig.ConfigFile!.SourceFile), GoNilSlice<Path>);
  return projectReferenceFileMapper_rangeResolvedReferenceWorker(receiver, refs, f, receiver!.opts.Config, seenRef);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/projectreferencefilemapper.go::method::projectReferenceFileMapper.getSourceToDtsIfSymlink","kind":"method","status":"implemented","sigHash":"b34848f0b911065e69c686d3afddf6ad646fff612b7f76182f3ac1340a2f385a"}
 *
 * Go source:
 * func (mapper *projectReferenceFileMapper) getSourceToDtsIfSymlink(file ast.HasFileName) *tsoptions.SourceOutputAndProjectReference {
 * 	// If preserveSymlinks is true, module resolution wont jump the symlink
 * 	// but the resolved real path may be the .d.ts from project reference
 * 	// Note:: Currently we try the real path only if the
 * 	// file is from node_modules to avoid having to run real path on all file paths
 * 	path := file.Path()
 * 	realpathDtsToSource, ok := mapper.realpathDtsToSource.Load(path)
 * 	if ok {
 * 		return realpathDtsToSource
 * 	}
 * 	if mapper.loader != nil && mapper.opts.Config.CompilerOptions().PreserveSymlinks == core.TSTrue {
 * 		fileName := file.FileName()
 * 		if !strings.Contains(fileName, "/node_modules/") {
 * 			mapper.realpathDtsToSource.Store(path, nil)
 * 		} else {
 * 			realDeclarationPath := mapper.loader.toPath(mapper.host.FS().Realpath(fileName))
 * 			if realDeclarationPath == path {
 * 				mapper.realpathDtsToSource.Store(path, nil)
 * 			} else {
 * 				realpathDtsToSource := mapper.getProjectReferenceFromOutputDts(realDeclarationPath)
 * 				if realpathDtsToSource != nil {
 * 					mapper.realpathDtsToSource.Store(path, realpathDtsToSource)
 * 					return realpathDtsToSource
 * 				}
 * 				mapper.realpathDtsToSource.Store(path, nil)
 * 			}
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function projectReferenceFileMapper_getSourceToDtsIfSymlink(receiver: GoPtr<projectReferenceFileMapper>, file: GoInterface<HasFileName>): GoPtr<SourceOutputAndProjectReference> {
  // If preserveSymlinks is true, module resolution wont jump the symlink
  // but the resolved real path may be the .d.ts from project reference
  // Note:: Currently we try the real path only if the
  // file is from node_modules to avoid having to run real path on all file paths
  const path = file!.Path();
  const [realpathDtsToSource, ok] = SyncMap_Load(receiver!.realpathDtsToSource, path, GoZeroPointer<SourceOutputAndProjectReference>, GoStringKey);
  if (ok) {
    return realpathDtsToSource;
  }
  if (receiver!.loader !== undefined && Tristate_IsTrue(ParsedCommandLine_CompilerOptions(receiver!.opts.Config)!.PreserveSymlinks)) {
    const fileName = file!.FileName();
    if (!strings.Contains(fileName, "/node_modules/")) {
      SyncMap_Store<Path, GoPtr<SourceOutputAndProjectReference>>(receiver!.realpathDtsToSource as SyncMap<Path, GoPtr<SourceOutputAndProjectReference>>, path, undefined, GoStringKey);
    } else {
      const realDeclarationPath = fileLoader_toPath(receiver!.loader, receiver!.host!.FS()!.Realpath(fileName));
      if (realDeclarationPath === path) {
        SyncMap_Store<Path, GoPtr<SourceOutputAndProjectReference>>(receiver!.realpathDtsToSource as SyncMap<Path, GoPtr<SourceOutputAndProjectReference>>, path, undefined, GoStringKey);
      } else {
        const realpathDtsToSourceResult = projectReferenceFileMapper_getProjectReferenceFromOutputDts(receiver, realDeclarationPath);
        if (realpathDtsToSourceResult !== undefined) {
          SyncMap_Store<Path, GoPtr<SourceOutputAndProjectReference>>(receiver!.realpathDtsToSource as SyncMap<Path, GoPtr<SourceOutputAndProjectReference>>, path, realpathDtsToSourceResult, GoStringKey);
          return realpathDtsToSourceResult;
        }
        SyncMap_Store<Path, GoPtr<SourceOutputAndProjectReference>>(receiver!.realpathDtsToSource as SyncMap<Path, GoPtr<SourceOutputAndProjectReference>>, path, undefined, GoStringKey);
      }
    }
  }
  return undefined;
}
