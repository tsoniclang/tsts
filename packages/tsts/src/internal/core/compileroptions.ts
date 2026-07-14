import type { bool, int } from "../../go/scalars.js";
import type { JsonFieldNamesForGoStructContract } from "../json/json.js";
import { GoEqualStrict, GoNilSlice, GoSliceIsNil, GoZeroInterface, type GoMap, type GoPtr, type GoSlice } from "../../go/compat.js";
import { OrderedMap_Size } from "../collections/ordered_map.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import * as slices from "../../go/slices.js";
import * as strings from "../../go/strings.js";
import { TypeFor } from "../../go/reflect.js";
import type { Type } from "../../go/reflect.js";
import { CombinePaths, ForEachAncestorDirectory, GetDirectoryPath } from "../tspath/path.js";
import { IsDeclarationFileName } from "../tspath/extension.js";
import {
  Tristate_IsTrue,
  Tristate_IsTrueOrUnknown,
  TSFalse,
  TSTrue,
  TSUnknown,
} from "./tristate.js";
import type { Tristate } from "./tristate.js";

import type { GoInterface, GoRef } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::CompilerOptions","kind":"type","status":"implemented","sigHash":"8a63738fb9feb6aefe951e61468ec8061d410041053b72009f7679bc32e449cd"}
 *
 * Go source:
 * CompilerOptions struct {
 * 	_ noCopy
 * 
 * 	AllowJs                                   Tristate                                  `json:"allowJs,omitzero"`
 * 	AllowArbitraryExtensions                  Tristate                                  `json:"allowArbitraryExtensions,omitzero"`
 * 	AllowImportingTsExtensions                Tristate                                  `json:"allowImportingTsExtensions,omitzero"`
 * 	AllowNonTsExtensions                      Tristate                                  `json:"allowNonTsExtensions,omitzero"`
 * 	AllowUmdGlobalAccess                      Tristate                                  `json:"allowUmdGlobalAccess,omitzero"`
 * 	AllowUnreachableCode                      Tristate                                  `json:"allowUnreachableCode,omitzero"`
 * 	AllowUnusedLabels                         Tristate                                  `json:"allowUnusedLabels,omitzero"`
 * 	AssumeChangesOnlyAffectDirectDependencies Tristate                                  `json:"assumeChangesOnlyAffectDirectDependencies,omitzero"`
 * 	CheckJs                                   Tristate                                  `json:"checkJs,omitzero"`
 * 	CustomConditions                          []string                                  `json:"customConditions,omitzero"`
 * 	Composite                                 Tristate                                  `json:"composite,omitzero"`
 * 	EmitDeclarationOnly                       Tristate                                  `json:"emitDeclarationOnly,omitzero"`
 * 	EmitBOM                                   Tristate                                  `json:"emitBOM,omitzero"`
 * 	EmitDecoratorMetadata                     Tristate                                  `json:"emitDecoratorMetadata,omitzero"`
 * 	Declaration                               Tristate                                  `json:"declaration,omitzero"`
 * 	DeclarationDir                            string                                    `json:"declarationDir,omitzero"`
 * 	DeclarationMap                            Tristate                                  `json:"declarationMap,omitzero"`
 * 	DeduplicatePackages                       Tristate                                  `json:"deduplicatePackages,omitzero"`
 * 	DisableSizeLimit                          Tristate                                  `json:"disableSizeLimit,omitzero"`
 * 	DisableSourceOfProjectReferenceRedirect   Tristate                                  `json:"disableSourceOfProjectReferenceRedirect,omitzero"`
 * 	DisableSolutionSearching                  Tristate                                  `json:"disableSolutionSearching,omitzero"`
 * 	DisableReferencedProjectLoad              Tristate                                  `json:"disableReferencedProjectLoad,omitzero"`
 * 	ErasableSyntaxOnly                        Tristate                                  `json:"erasableSyntaxOnly,omitzero"`
 * 	ExactOptionalPropertyTypes                Tristate                                  `json:"exactOptionalPropertyTypes,omitzero"`
 * 	ExperimentalDecorators                    Tristate                                  `json:"experimentalDecorators,omitzero"`
 * 	ForceConsistentCasingInFileNames          Tristate                                  `json:"forceConsistentCasingInFileNames,omitzero"`
 * 	IsolatedModules                           Tristate                                  `json:"isolatedModules,omitzero"`
 * 	IsolatedDeclarations                      Tristate                                  `json:"isolatedDeclarations,omitzero"`
 * 	IgnoreConfig                              Tristate                                  `json:"ignoreConfig,omitzero"`
 * 	IgnoreDeprecations                        string                                    `json:"ignoreDeprecations,omitzero"`
 * 	ImportHelpers                             Tristate                                  `json:"importHelpers,omitzero"`
 * 	InlineSourceMap                           Tristate                                  `json:"inlineSourceMap,omitzero"`
 * 	InlineSources                             Tristate                                  `json:"inlineSources,omitzero"`
 * 	Init                                      Tristate                                  `json:"init,omitzero"`
 * 	Incremental                               Tristate                                  `json:"incremental,omitzero"`
 * 	Jsx                                       JsxEmit                                   `json:"jsx,omitzero"`
 * 	JsxFactory                                string                                    `json:"jsxFactory,omitzero"`
 * 	JsxFragmentFactory                        string                                    `json:"jsxFragmentFactory,omitzero"`
 * 	JsxImportSource                           string                                    `json:"jsxImportSource,omitzero"`
 * 	Lib                                       []string                                  `json:"lib,omitzero"`
 * 	LibReplacement                            Tristate                                  `json:"libReplacement,omitzero"`
 * 	Locale                                    string                                    `json:"locale,omitzero"`
 * 	MapRoot                                   string                                    `json:"mapRoot,omitzero"`
 * 	Module                                    ModuleKind                                `json:"module,omitzero"`
 * 	ModuleResolution                          ModuleResolutionKind                      `json:"moduleResolution,omitzero"`
 * 	ModuleSuffixes                            []string                                  `json:"moduleSuffixes,omitzero"`
 * 	ModuleDetection                           ModuleDetectionKind                       `json:"moduleDetection,omitzero"`
 * 	NewLine                                   NewLineKind                               `json:"newLine,omitzero"`
 * 	NoEmit                                    Tristate                                  `json:"noEmit,omitzero"`
 * 	NoCheck                                   Tristate                                  `json:"noCheck,omitzero"`
 * 	NoErrorTruncation                         Tristate                                  `json:"noErrorTruncation,omitzero"`
 * 	NoFallthroughCasesInSwitch                Tristate                                  `json:"noFallthroughCasesInSwitch,omitzero"`
 * 	NoImplicitAny                             Tristate                                  `json:"noImplicitAny,omitzero"`
 * 	NoImplicitThis                            Tristate                                  `json:"noImplicitThis,omitzero"`
 * 	NoImplicitReturns                         Tristate                                  `json:"noImplicitReturns,omitzero"`
 * 	NoEmitHelpers                             Tristate                                  `json:"noEmitHelpers,omitzero"`
 * 	NoLib                                     Tristate                                  `json:"noLib,omitzero"`
 * 	NoPropertyAccessFromIndexSignature        Tristate                                  `json:"noPropertyAccessFromIndexSignature,omitzero"`
 * 	NoUncheckedIndexedAccess                  Tristate                                  `json:"noUncheckedIndexedAccess,omitzero"`
 * 	NoEmitOnError                             Tristate                                  `json:"noEmitOnError,omitzero"`
 * 	NoUnusedLocals                            Tristate                                  `json:"noUnusedLocals,omitzero"`
 * 	NoUnusedParameters                        Tristate                                  `json:"noUnusedParameters,omitzero"`
 * 	NoResolve                                 Tristate                                  `json:"noResolve,omitzero"`
 * 	NoImplicitOverride                        Tristate                                  `json:"noImplicitOverride,omitzero"`
 * 	NoUncheckedSideEffectImports              Tristate                                  `json:"noUncheckedSideEffectImports,omitzero"`
 * 	OutDir                                    string                                    `json:"outDir,omitzero"`
 * 	Paths                                     *collections.OrderedMap[string, []string] `json:"paths,omitzero"`
 * 	PreserveConstEnums                        Tristate                                  `json:"preserveConstEnums,omitzero"`
 * 	PreserveSymlinks                          Tristate                                  `json:"preserveSymlinks,omitzero"`
 * 	Project                                   string                                    `json:"project,omitzero"`
 * 	ResolveJsonModule                         Tristate                                  `json:"resolveJsonModule,omitzero"`
 * 	ResolvePackageJsonExports                 Tristate                                  `json:"resolvePackageJsonExports,omitzero"`
 * 	ResolvePackageJsonImports                 Tristate                                  `json:"resolvePackageJsonImports,omitzero"`
 * 	RemoveComments                            Tristate                                  `json:"removeComments,omitzero"`
 * 	RewriteRelativeImportExtensions           Tristate                                  `json:"rewriteRelativeImportExtensions,omitzero"`
 * 	ReactNamespace                            string                                    `json:"reactNamespace,omitzero"`
 * 	RootDir                                   string                                    `json:"rootDir,omitzero"`
 * 	RootDirs                                  []string                                  `json:"rootDirs,omitzero"`
 * 	SkipLibCheck                              Tristate                                  `json:"skipLibCheck,omitzero"`
 * 	StableTypeOrdering                        Tristate                                  `json:"stableTypeOrdering,omitzero"`
 * 	Strict                                    Tristate                                  `json:"strict,omitzero"`
 * 	StrictBindCallApply                       Tristate                                  `json:"strictBindCallApply,omitzero"`
 * 	StrictBuiltinIteratorReturn               Tristate                                  `json:"strictBuiltinIteratorReturn,omitzero"`
 * 	StrictFunctionTypes                       Tristate                                  `json:"strictFunctionTypes,omitzero"`
 * 	StrictNullChecks                          Tristate                                  `json:"strictNullChecks,omitzero"`
 * 	StrictPropertyInitialization              Tristate                                  `json:"strictPropertyInitialization,omitzero"`
 * 	StripInternal                             Tristate                                  `json:"stripInternal,omitzero"`
 * 	SkipDefaultLibCheck                       Tristate                                  `json:"skipDefaultLibCheck,omitzero"`
 * 	SourceMap                                 Tristate                                  `json:"sourceMap,omitzero"`
 * 	SourceRoot                                string                                    `json:"sourceRoot,omitzero"`
 * 	SuppressOutputPathCheck                   Tristate                                  `json:"suppressOutputPathCheck,omitzero"`
 * 	Target                                    ScriptTarget                              `json:"target,omitzero"`
 * 	TraceResolution                           Tristate                                  `json:"traceResolution,omitzero"`
 * 	TsBuildInfoFile                           string                                    `json:"tsBuildInfoFile,omitzero"`
 * 	TypeRoots                                 []string                                  `json:"typeRoots,omitzero"`
 * 	Types                                     []string                                  `json:"types,omitzero"`
 * 	UseDefineForClassFields                   Tristate                                  `json:"useDefineForClassFields,omitzero"`
 * 	UseUnknownInCatchVariables                Tristate                                  `json:"useUnknownInCatchVariables,omitzero"`
 * 	VerbatimModuleSyntax                      Tristate                                  `json:"verbatimModuleSyntax,omitzero"`
 * 	MaxNodeModuleJsDepth                      *int                                      `json:"maxNodeModuleJsDepth,omitzero"`
 * 
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	AllowSyntheticDefaultImports Tristate `json:"allowSyntheticDefaultImports,omitzero"`
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	AlwaysStrict Tristate `json:"alwaysStrict,omitzero"`
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	BaseUrl string `json:"baseUrl,omitzero"`
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	DownlevelIteration Tristate `json:"downlevelIteration,omitzero"`
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ESModuleInterop Tristate `json:"esModuleInterop,omitzero"`
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	OutFile string `json:"outFile,omitzero"`
 * 
 * 	// Internal fields
 * 	ConfigFilePath      string   `json:"configFilePath,omitzero"`
 * 	NoDtsResolution     Tristate `json:"noDtsResolution,omitzero"`
 * 	PathsBasePath       string   `json:"pathsBasePath,omitzero"`
 * 	Diagnostics         Tristate `json:"diagnostics,omitzero"`
 * 	ExtendedDiagnostics Tristate `json:"extendedDiagnostics,omitzero"`
 * 	GenerateCpuProfile  string   `json:"generateCpuProfile,omitzero"`
 * 	GenerateTrace       string   `json:"generateTrace,omitzero"`
 * 	ListEmittedFiles    Tristate `json:"listEmittedFiles,omitzero"`
 * 	ListFiles           Tristate `json:"listFiles,omitzero"`
 * 	ExplainFiles        Tristate `json:"explainFiles,omitzero"`
 * 	ListFilesOnly       Tristate `json:"listFilesOnly,omitzero"`
 * 	NoEmitForJsFiles    Tristate `json:"noEmitForJsFiles,omitzero"`
 * 	PreserveWatchOutput Tristate `json:"preserveWatchOutput,omitzero"`
 * 	Pretty              Tristate `json:"pretty,omitzero"`
 * 	Version             Tristate `json:"version,omitzero"`
 * 	Watch               Tristate `json:"watch,omitzero"`
 * 	ShowConfig          Tristate `json:"showConfig,omitzero"`
 * 	Build               Tristate `json:"build,omitzero"`
 * 	Help                Tristate `json:"help,omitzero"`
 * 	All                 Tristate `json:"all,omitzero"`
 * 
 * 	PprofDir       string   `json:"pprofDir,omitzero"`
 * 	SingleThreaded Tristate `json:"singleThreaded,omitzero"`
 * 	Quiet          Tristate `json:"quiet,omitzero"`
 * 	Checkers       *int     `json:"checkers,omitzero"`
 * }
 */
export interface CompilerOptions {
  __tsgoBlank0: noCopy;
  AllowJs: Tristate;
  AllowArbitraryExtensions: Tristate;
  AllowImportingTsExtensions: Tristate;
  AllowNonTsExtensions: Tristate;
  AllowUmdGlobalAccess: Tristate;
  AllowUnreachableCode: Tristate;
  AllowUnusedLabels: Tristate;
  AssumeChangesOnlyAffectDirectDependencies: Tristate;
  CheckJs: Tristate;
  CustomConditions: GoSlice<string>;
  Composite: Tristate;
  EmitDeclarationOnly: Tristate;
  EmitBOM: Tristate;
  EmitDecoratorMetadata: Tristate;
  Declaration: Tristate;
  DeclarationDir: string;
  DeclarationMap: Tristate;
  DeduplicatePackages: Tristate;
  DisableSizeLimit: Tristate;
  DisableSourceOfProjectReferenceRedirect: Tristate;
  DisableSolutionSearching: Tristate;
  DisableReferencedProjectLoad: Tristate;
  ErasableSyntaxOnly: Tristate;
  ExactOptionalPropertyTypes: Tristate;
  ExperimentalDecorators: Tristate;
  ForceConsistentCasingInFileNames: Tristate;
  IsolatedModules: Tristate;
  IsolatedDeclarations: Tristate;
  IgnoreConfig: Tristate;
  IgnoreDeprecations: string;
  ImportHelpers: Tristate;
  InlineSourceMap: Tristate;
  InlineSources: Tristate;
  Init: Tristate;
  Incremental: Tristate;
  Jsx: JsxEmit;
  JsxFactory: string;
  JsxFragmentFactory: string;
  JsxImportSource: string;
  Lib: GoSlice<string>;
  LibReplacement: Tristate;
  Locale: string;
  MapRoot: string;
  Module: ModuleKind;
  ModuleResolution: ModuleResolutionKind;
  ModuleSuffixes: GoSlice<string>;
  ModuleDetection: ModuleDetectionKind;
  NewLine: NewLineKind;
  NoEmit: Tristate;
  NoCheck: Tristate;
  NoErrorTruncation: Tristate;
  NoFallthroughCasesInSwitch: Tristate;
  NoImplicitAny: Tristate;
  NoImplicitThis: Tristate;
  NoImplicitReturns: Tristate;
  NoEmitHelpers: Tristate;
  NoLib: Tristate;
  NoPropertyAccessFromIndexSignature: Tristate;
  NoUncheckedIndexedAccess: Tristate;
  NoEmitOnError: Tristate;
  NoUnusedLocals: Tristate;
  NoUnusedParameters: Tristate;
  NoResolve: Tristate;
  NoImplicitOverride: Tristate;
  NoUncheckedSideEffectImports: Tristate;
  OutDir: string;
  Paths: GoPtr<OrderedMap<string, GoSlice<string>>>;
  PreserveConstEnums: Tristate;
  PreserveSymlinks: Tristate;
  Project: string;
  ResolveJsonModule: Tristate;
  ResolvePackageJsonExports: Tristate;
  ResolvePackageJsonImports: Tristate;
  RemoveComments: Tristate;
  RewriteRelativeImportExtensions: Tristate;
  ReactNamespace: string;
  RootDir: string;
  RootDirs: GoSlice<string>;
  SkipLibCheck: Tristate;
  StableTypeOrdering: Tristate;
  Strict: Tristate;
  StrictBindCallApply: Tristate;
  StrictBuiltinIteratorReturn: Tristate;
  StrictFunctionTypes: Tristate;
  StrictNullChecks: Tristate;
  StrictPropertyInitialization: Tristate;
  StripInternal: Tristate;
  SkipDefaultLibCheck: Tristate;
  SourceMap: Tristate;
  SourceRoot: string;
  SuppressOutputPathCheck: Tristate;
  Target: ScriptTarget;
  TraceResolution: Tristate;
  TsBuildInfoFile: string;
  TypeRoots: GoSlice<string>;
  Types: GoSlice<string>;
  UseDefineForClassFields: Tristate;
  UseUnknownInCatchVariables: Tristate;
  VerbatimModuleSyntax: Tristate;
  MaxNodeModuleJsDepth: GoRef<int>;
  AllowSyntheticDefaultImports: Tristate;
  AlwaysStrict: Tristate;
  BaseUrl: string;
  DownlevelIteration: Tristate;
  ESModuleInterop: Tristate;
  OutFile: string;
  ConfigFilePath: string;
  NoDtsResolution: Tristate;
  PathsBasePath: string;
  Diagnostics: Tristate;
  ExtendedDiagnostics: Tristate;
  GenerateCpuProfile: string;
  GenerateTrace: string;
  ListEmittedFiles: Tristate;
  ListFiles: Tristate;
  ExplainFiles: Tristate;
  ListFilesOnly: Tristate;
  NoEmitForJsFiles: Tristate;
  PreserveWatchOutput: Tristate;
  Pretty: Tristate;
  Version: Tristate;
  Watch: Tristate;
  ShowConfig: Tristate;
  Build: Tristate;
  Help: Tristate;
  All: Tristate;
  PprofDir: string;
  SingleThreaded: Tristate;
  Quiet: Tristate;
  Checkers: GoRef<int>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::noCopy","kind":"type","status":"implemented","sigHash":"4dcbe9a808682845cced4a8ac867060d272f873cf5c3371f5076d5b05b982b44"}
 *
 * Go source:
 * noCopy struct{}
 */
export interface noCopy {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::noCopy.Lock","kind":"method","status":"implemented","sigHash":"969d994c108e5f5bfa9da378d51b44b92df000aa82bacd7d7dcc9853f62e3d63"}
 *
 * Go source:
 * func (*noCopy) Lock()   {}
 */
export function noCopy_Lock(receiver: GoPtr<noCopy>): void {}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::noCopy.Unlock","kind":"method","status":"implemented","sigHash":"4b8ec101bd0b82416c8a357dd49660645aba927e928d925db66e01338e538acb"}
 *
 * Go source:
 * func (*noCopy) Unlock() {}
 */
export function noCopy_Unlock(receiver: GoPtr<noCopy>): void {}

const compilerOptionStringFields: readonly [
  "DeclarationDir",
  "IgnoreDeprecations",
  "JsxFactory",
  "JsxFragmentFactory",
  "JsxImportSource",
  "Locale",
  "MapRoot",
  "OutDir",
  "Project",
  "ReactNamespace",
  "RootDir",
  "SourceRoot",
  "TsBuildInfoFile",
  "BaseUrl",
  "OutFile",
  "ConfigFilePath",
  "PathsBasePath",
  "GenerateCpuProfile",
  "GenerateTrace",
  "PprofDir",
] = [
  "DeclarationDir",
  "IgnoreDeprecations",
  "JsxFactory",
  "JsxFragmentFactory",
  "JsxImportSource",
  "Locale",
  "MapRoot",
  "OutDir",
  "Project",
  "ReactNamespace",
  "RootDir",
  "SourceRoot",
  "TsBuildInfoFile",
  "BaseUrl",
  "OutFile",
  "ConfigFilePath",
  "PathsBasePath",
  "GenerateCpuProfile",
  "GenerateTrace",
  "PprofDir",
] as const;

const compilerOptionTristateFields: readonly [
  "AllowJs",
  "AllowArbitraryExtensions",
  "AllowImportingTsExtensions",
  "AllowNonTsExtensions",
  "AllowUmdGlobalAccess",
  "AllowUnreachableCode",
  "AllowUnusedLabels",
  "AssumeChangesOnlyAffectDirectDependencies",
  "CheckJs",
  "Composite",
  "EmitDeclarationOnly",
  "EmitBOM",
  "EmitDecoratorMetadata",
  "Declaration",
  "DeclarationMap",
  "DeduplicatePackages",
  "DisableSizeLimit",
  "DisableSourceOfProjectReferenceRedirect",
  "DisableSolutionSearching",
  "DisableReferencedProjectLoad",
  "ErasableSyntaxOnly",
  "ExactOptionalPropertyTypes",
  "ExperimentalDecorators",
  "ForceConsistentCasingInFileNames",
  "IsolatedModules",
  "IsolatedDeclarations",
  "IgnoreConfig",
  "ImportHelpers",
  "InlineSourceMap",
  "InlineSources",
  "Init",
  "Incremental",
  "LibReplacement",
  "NoEmit",
  "NoCheck",
  "NoErrorTruncation",
  "NoFallthroughCasesInSwitch",
  "NoImplicitAny",
  "NoImplicitThis",
  "NoImplicitReturns",
  "NoEmitHelpers",
  "NoLib",
  "NoPropertyAccessFromIndexSignature",
  "NoUncheckedIndexedAccess",
  "NoEmitOnError",
  "NoUnusedLocals",
  "NoUnusedParameters",
  "NoResolve",
  "NoImplicitOverride",
  "NoUncheckedSideEffectImports",
  "PreserveConstEnums",
  "PreserveSymlinks",
  "ResolveJsonModule",
  "ResolvePackageJsonExports",
  "ResolvePackageJsonImports",
  "RemoveComments",
  "RewriteRelativeImportExtensions",
  "SkipLibCheck",
  "StableTypeOrdering",
  "Strict",
  "StrictBindCallApply",
  "StrictBuiltinIteratorReturn",
  "StrictFunctionTypes",
  "StrictNullChecks",
  "StrictPropertyInitialization",
  "StripInternal",
  "SkipDefaultLibCheck",
  "SourceMap",
  "SuppressOutputPathCheck",
  "TraceResolution",
  "UseDefineForClassFields",
  "UseUnknownInCatchVariables",
  "VerbatimModuleSyntax",
  "AllowSyntheticDefaultImports",
  "AlwaysStrict",
  "DownlevelIteration",
  "ESModuleInterop",
  "NoDtsResolution",
  "Diagnostics",
  "ExtendedDiagnostics",
  "ListEmittedFiles",
  "ListFiles",
  "ExplainFiles",
  "ListFilesOnly",
  "NoEmitForJsFiles",
  "PreserveWatchOutput",
  "Pretty",
  "Version",
  "Watch",
  "ShowConfig",
  "Build",
  "Help",
  "All",
  "SingleThreaded",
  "Quiet",
] = [
  "AllowJs",
  "AllowArbitraryExtensions",
  "AllowImportingTsExtensions",
  "AllowNonTsExtensions",
  "AllowUmdGlobalAccess",
  "AllowUnreachableCode",
  "AllowUnusedLabels",
  "AssumeChangesOnlyAffectDirectDependencies",
  "CheckJs",
  "Composite",
  "EmitDeclarationOnly",
  "EmitBOM",
  "EmitDecoratorMetadata",
  "Declaration",
  "DeclarationMap",
  "DeduplicatePackages",
  "DisableSizeLimit",
  "DisableSourceOfProjectReferenceRedirect",
  "DisableSolutionSearching",
  "DisableReferencedProjectLoad",
  "ErasableSyntaxOnly",
  "ExactOptionalPropertyTypes",
  "ExperimentalDecorators",
  "ForceConsistentCasingInFileNames",
  "IsolatedModules",
  "IsolatedDeclarations",
  "IgnoreConfig",
  "ImportHelpers",
  "InlineSourceMap",
  "InlineSources",
  "Init",
  "Incremental",
  "LibReplacement",
  "NoEmit",
  "NoCheck",
  "NoErrorTruncation",
  "NoFallthroughCasesInSwitch",
  "NoImplicitAny",
  "NoImplicitThis",
  "NoImplicitReturns",
  "NoEmitHelpers",
  "NoLib",
  "NoPropertyAccessFromIndexSignature",
  "NoUncheckedIndexedAccess",
  "NoEmitOnError",
  "NoUnusedLocals",
  "NoUnusedParameters",
  "NoResolve",
  "NoImplicitOverride",
  "NoUncheckedSideEffectImports",
  "PreserveConstEnums",
  "PreserveSymlinks",
  "ResolveJsonModule",
  "ResolvePackageJsonExports",
  "ResolvePackageJsonImports",
  "RemoveComments",
  "RewriteRelativeImportExtensions",
  "SkipLibCheck",
  "StableTypeOrdering",
  "Strict",
  "StrictBindCallApply",
  "StrictBuiltinIteratorReturn",
  "StrictFunctionTypes",
  "StrictNullChecks",
  "StrictPropertyInitialization",
  "StripInternal",
  "SkipDefaultLibCheck",
  "SourceMap",
  "SuppressOutputPathCheck",
  "TraceResolution",
  "UseDefineForClassFields",
  "UseUnknownInCatchVariables",
  "VerbatimModuleSyntax",
  "AllowSyntheticDefaultImports",
  "AlwaysStrict",
  "DownlevelIteration",
  "ESModuleInterop",
  "NoDtsResolution",
  "Diagnostics",
  "ExtendedDiagnostics",
  "ListEmittedFiles",
  "ListFiles",
  "ExplainFiles",
  "ListFilesOnly",
  "NoEmitForJsFiles",
  "PreserveWatchOutput",
  "Pretty",
  "Version",
  "Watch",
  "ShowConfig",
  "Build",
  "Help",
  "All",
  "SingleThreaded",
  "Quiet",
] as const;

const normalizedCompilerOptionsMarker: unique symbol = Symbol("tsts.normalizedCompilerOptions");
type NormalizedCompilerOptions = CompilerOptions & Record<string, unknown> & {
  [normalizedCompilerOptionsMarker]?: true;
};

export function NormalizeCompilerOptions(options: GoPtr<CompilerOptions>): GoPtr<CompilerOptions> {
  if (options === undefined) {
    return undefined;
  }
  const target = options as NormalizedCompilerOptions;
  if (target[normalizedCompilerOptionsMarker] === true) {
    return options;
  }
  target.__tsgoBlank0 ??= {};
  for (const key of compilerOptionStringFields) {
    target[key] ??= "";
  }
  for (const key of compilerOptionTristateFields) {
    target[key] ??= TSUnknown;
  }
  target.Jsx ??= 0 as JsxEmit;
  target.Module ??= 0 as ModuleKind;
  target.ModuleResolution ??= 0 as ModuleResolutionKind;
  target.ModuleDetection ??= 0 as ModuleDetectionKind;
  target.NewLine ??= 0 as NewLineKind;
  target.Target ??= 0 as ScriptTarget;
  target.CustomConditions ??= GoNilSlice<string>();
  target.Lib ??= GoNilSlice<string>();
  target.ModuleSuffixes ??= GoNilSlice<string>();
  target.RootDirs ??= GoNilSlice<string>();
  target.TypeRoots ??= GoNilSlice<string>();
  target.Types ??= GoNilSlice<string>();
  target[normalizedCompilerOptionsMarker] = true;
  return options;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::varGroup::EmptyCompilerOptions","kind":"varGroup","status":"implemented","sigHash":"f417950c76bd808b3472dc5954acd94eb845f5f6d7483e3c6949a8c5449d5c61"}
 *
 * Go source:
 * var EmptyCompilerOptions = &CompilerOptions{}
 */
export let EmptyCompilerOptions: GoPtr<CompilerOptions> = NormalizeCompilerOptions({} as CompilerOptions);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::varGroup::optionsType","kind":"varGroup","status":"implemented","sigHash":"3d184ca1e3e56cf149b7c8f536cbbb918bb8d541f4d342d703f4da50714cd6dd"}
 *
 * Go source:
 * var optionsType = reflect.TypeFor[CompilerOptions]()
 */
export let optionsType: GoInterface<Type> = TypeFor<CompilerOptions>();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.Clone","kind":"method","status":"implemented","sigHash":"1bdde2d988f8a4a9d19644e5d33c4a3e67a77d9a2fa5538d7726acd0c8f41c82"}
 *
 * Go source:
 * func (options *CompilerOptions) Clone() *CompilerOptions {
 * 	// TODO: this could be generated code instead of reflection.
 * 	target := &CompilerOptions{}
 * 
 * 	sourceValue := reflect.ValueOf(options).Elem()
 * 	targetValue := reflect.ValueOf(target).Elem()
 * 
 * 	for i := range sourceValue.NumField() {
 * 		if optionsType.Field(i).IsExported() {
 * 			targetValue.Field(i).Set(sourceValue.Field(i))
 * 		}
 * 	}
 * 
 * 	return target
 * }
 */
export function CompilerOptions_Clone(receiver: GoPtr<CompilerOptions>): GoPtr<CompilerOptions> {
  return { ...receiver! };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetEmitScriptTarget","kind":"method","status":"implemented","sigHash":"de9ec2858431b3da2af42a54630ad10f9f9eadf91fefb46df146acb26d00efcb"}
 *
 * Go source:
 * func (options *CompilerOptions) GetEmitScriptTarget() ScriptTarget {
 * 	if options.Target != ScriptTargetNone {
 * 		return options.Target
 * 	}
 * 	return ScriptTargetLatestStandard
 * }
 */
export function CompilerOptions_GetEmitScriptTarget(receiver: GoPtr<CompilerOptions>): ScriptTarget {
  const options: GoPtr<CompilerOptions> = receiver;
  if (options!.Target !== ScriptTargetNone) {
    return options!.Target;
  }
  return ScriptTargetLatestStandard;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetEmitModuleKind","kind":"method","status":"implemented","sigHash":"7f73705924e97d6c26ee4d8d5b98e456027de41ff022bfa9aca069abd99bbdd1"}
 *
 * Go source:
 * func (options *CompilerOptions) GetEmitModuleKind() ModuleKind {
 * 	if options.Module != ModuleKindNone {
 * 		return options.Module
 * 	}
 *
 * 	target := options.GetEmitScriptTarget()
 * 	if target == ScriptTargetESNext {
 * 		return ModuleKindESNext
 * 	}
 * 	if target >= ScriptTargetES2022 {
 * 		return ModuleKindES2022
 * 	}
 * 	if target >= ScriptTargetES2020 {
 * 		return ModuleKindES2020
 * 	}
 * 	if target >= ScriptTargetES2015 {
 * 		return ModuleKindES2015
 * 	}
 * 	return ModuleKindCommonJS
 * }
 */
export function CompilerOptions_GetEmitModuleKind(receiver: GoPtr<CompilerOptions>): ModuleKind {
  const options: GoPtr<CompilerOptions> = receiver;
  if (options!.Module !== ModuleKindNone) {
    return options!.Module;
  }

  const target = CompilerOptions_GetEmitScriptTarget(options);
  if (target === ScriptTargetESNext) {
    return ModuleKindESNext;
  }
  if (target >= ScriptTargetES2022) {
    return ModuleKindES2022;
  }
  if (target >= ScriptTargetES2020) {
    return ModuleKindES2020;
  }
  if (target >= ScriptTargetES2015) {
    return ModuleKindES2015;
  }
  return ModuleKindCommonJS;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetModuleResolutionKind","kind":"method","status":"implemented","sigHash":"0400ded2dff71a7cd908dbfd292d0890374919f7b88a2237819b82f98b0e0a1e"}
 *
 * Go source:
 * func (options *CompilerOptions) GetModuleResolutionKind() ModuleResolutionKind {
 * 	switch options.ModuleResolution {
 * 	case ModuleResolutionKindUnknown, ModuleResolutionKindClassic, ModuleResolutionKindNode10:
 * 		switch options.GetEmitModuleKind() {
 * 		case ModuleKindNode16, ModuleKindNode18, ModuleKindNode20:
 * 			return ModuleResolutionKindNode16
 * 		case ModuleKindNodeNext:
 * 			return ModuleResolutionKindNodeNext
 * 		default:
 * 			return ModuleResolutionKindBundler
 * 		}
 * 	default:
 * 		return options.ModuleResolution
 * 	}
 * }
 */
export function CompilerOptions_GetModuleResolutionKind(receiver: GoPtr<CompilerOptions>): ModuleResolutionKind {
  const options: GoPtr<CompilerOptions> = receiver;
  const moduleResolution = options!.ModuleResolution ?? ModuleResolutionKindUnknown;
  switch (moduleResolution) {
    case ModuleResolutionKindUnknown:
    case ModuleResolutionKindClassic:
    case ModuleResolutionKindNode10:
      switch (CompilerOptions_GetEmitModuleKind(options)) {
        case ModuleKindNode16:
        case ModuleKindNode18:
        case ModuleKindNode20:
          return ModuleResolutionKindNode16;
        case ModuleKindNodeNext:
          return ModuleResolutionKindNodeNext;
        default:
          return ModuleResolutionKindBundler;
      }
    default:
      return moduleResolution;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetEmitModuleDetectionKind","kind":"method","status":"implemented","sigHash":"e2baa2b2c705f80ef227fd29c4c85feed4f8e7e272dfb6557f60dc88729bda8e"}
 *
 * Go source:
 * func (options *CompilerOptions) GetEmitModuleDetectionKind() ModuleDetectionKind {
 * 	if options.ModuleDetection != ModuleDetectionKindNone {
 * 		return options.ModuleDetection
 * 	}
 * 	moduleKind := options.GetEmitModuleKind()
 * 	if ModuleKindNode16 <= moduleKind && moduleKind <= ModuleKindNodeNext {
 * 		return ModuleDetectionKindForce
 * 	}
 * 	return ModuleDetectionKindAuto
 * }
 */
export function CompilerOptions_GetEmitModuleDetectionKind(receiver: GoPtr<CompilerOptions>): ModuleDetectionKind {
  const options: GoPtr<CompilerOptions> = receiver;
  if (options!.ModuleDetection !== ModuleDetectionKindNone) {
    return options!.ModuleDetection;
  }
  const moduleKind = CompilerOptions_GetEmitModuleKind(options);
  if (ModuleKindNode16 <= moduleKind && moduleKind <= ModuleKindNodeNext) {
    return ModuleDetectionKindForce;
  }
  return ModuleDetectionKindAuto;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetResolvePackageJsonExports","kind":"method","status":"implemented","sigHash":"cf719126986561dcaa1e39df5c2169fc7f3d8730146b1967d284ad42df26b9b7"}
 *
 * Go source:
 * func (options *CompilerOptions) GetResolvePackageJsonExports() bool {
 * 	return options.ResolvePackageJsonExports.IsTrueOrUnknown()
 * }
 */
export function CompilerOptions_GetResolvePackageJsonExports(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return Tristate_IsTrueOrUnknown(options!.ResolvePackageJsonExports);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetResolvePackageJsonImports","kind":"method","status":"implemented","sigHash":"90738769bb1a90159b5843691bb3ace2ad6e86067a9bdf0c5eebd28b584d9af6"}
 *
 * Go source:
 * func (options *CompilerOptions) GetResolvePackageJsonImports() bool {
 * 	return options.ResolvePackageJsonImports.IsTrueOrUnknown()
 * }
 */
export function CompilerOptions_GetResolvePackageJsonImports(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return Tristate_IsTrueOrUnknown(options!.ResolvePackageJsonImports);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetAllowImportingTsExtensions","kind":"method","status":"implemented","sigHash":"08829cd0a81ccb7e4236a28466470157e5f5bd1acd5aaf183e034764320ee140"}
 *
 * Go source:
 * func (options *CompilerOptions) GetAllowImportingTsExtensions() bool {
 * 	return options.AllowImportingTsExtensions.IsTrue() || options.RewriteRelativeImportExtensions.IsTrue()
 * }
 */
export function CompilerOptions_GetAllowImportingTsExtensions(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return Tristate_IsTrue(options!.AllowImportingTsExtensions) || Tristate_IsTrue(options!.RewriteRelativeImportExtensions);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.AllowImportingTsExtensionsFrom","kind":"method","status":"implemented","sigHash":"2ee8d29702700cf2511a58098ae2961887cd3972deb0cf584cc93ad7ca2768d2"}
 *
 * Go source:
 * func (options *CompilerOptions) AllowImportingTsExtensionsFrom(fileName string) bool {
 * 	return options.GetAllowImportingTsExtensions() || tspath.IsDeclarationFileName(fileName)
 * }
 */
export function CompilerOptions_AllowImportingTsExtensionsFrom(receiver: GoPtr<CompilerOptions>, fileName: string): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return CompilerOptions_GetAllowImportingTsExtensions(options) || IsDeclarationFileName(fileName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetResolveJsonModule","kind":"method","status":"implemented","sigHash":"bddc9d959f92480d676bd4c6850b101ba8d71db4ebb403d6b9d371a81cd21631"}
 *
 * Go source:
 * func (options *CompilerOptions) GetResolveJsonModule() bool {
 * 	if options.ResolveJsonModule != TSUnknown {
 * 		return options.ResolveJsonModule == TSTrue
 * 	}
 * 	switch options.GetEmitModuleKind() {
 * 	// TODO in 6.0: add Node16/Node18
 * 	case ModuleKindNode20, ModuleKindNodeNext:
 * 		return true
 * 	}
 * 	return options.GetModuleResolutionKind() == ModuleResolutionKindBundler
 * }
 */
export function CompilerOptions_GetResolveJsonModule(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  const resolveJsonModule = options!.ResolveJsonModule ?? TSUnknown;
  if (resolveJsonModule !== TSUnknown) {
    return resolveJsonModule === TSTrue;
  }
  switch (CompilerOptions_GetEmitModuleKind(options)) {
    // TODO in 6.0: add Node16/Node18
    case ModuleKindNode20:
    case ModuleKindNodeNext:
      return true;
  }
  return CompilerOptions_GetModuleResolutionKind(options) === ModuleResolutionKindBundler;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.ShouldPreserveConstEnums","kind":"method","status":"implemented","sigHash":"ba5aa65c845f68be242da43baf2b8d5a7934a8f36958b2eaba27d31010c2338a"}
 *
 * Go source:
 * func (options *CompilerOptions) ShouldPreserveConstEnums() bool {
 * 	return options.PreserveConstEnums == TSTrue || options.GetIsolatedModules()
 * }
 */
export function CompilerOptions_ShouldPreserveConstEnums(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return (options!.PreserveConstEnums ?? TSUnknown) === TSTrue || CompilerOptions_GetIsolatedModules(options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetAllowJS","kind":"method","status":"implemented","sigHash":"5f741467ff09234b754542adf9a2611962c4f66c80818977b9ece96e1b615288"}
 *
 * Go source:
 * func (options *CompilerOptions) GetAllowJS() bool {
 * 	if options.AllowJs != TSUnknown {
 * 		return options.AllowJs == TSTrue
 * 	}
 * 	return options.CheckJs == TSTrue
 * }
 */
export function CompilerOptions_GetAllowJS(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  const allowJs = options!.AllowJs ?? TSUnknown;
  if (allowJs !== TSUnknown) {
    return allowJs === TSTrue;
  }
  return (options!.CheckJs ?? TSUnknown) === TSTrue;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetJSXTransformEnabled","kind":"method","status":"implemented","sigHash":"156b73eb27116a2cbb3da24645d3847ba8f8a2c7721c766cb9cd4f421df5c3d8"}
 *
 * Go source:
 * func (options *CompilerOptions) GetJSXTransformEnabled() bool {
 * 	jsx := options.Jsx
 * 	return jsx == JsxEmitReact || jsx == JsxEmitReactJSX || jsx == JsxEmitReactJSXDev
 * }
 */
export function CompilerOptions_GetJSXTransformEnabled(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  const jsx = options!.Jsx;
  return jsx === JsxEmitReact || jsx === JsxEmitReactJSX || jsx === JsxEmitReactJSXDev;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetStrictOptionValue","kind":"method","status":"implemented","sigHash":"902e73b6bc019ae1cdb9d0a8cd8073c9c28748ac48d8c0f265d7110ff3a7a564"}
 *
 * Go source:
 * func (options *CompilerOptions) GetStrictOptionValue(value Tristate) bool {
 * 	if value != TSUnknown {
 * 		return value == TSTrue
 * 	}
 * 	return options.Strict != TSFalse
 * }
 */
export function CompilerOptions_GetStrictOptionValue(receiver: GoPtr<CompilerOptions>, value: Tristate): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  const effectiveValue = value ?? TSUnknown;
  if (effectiveValue !== TSUnknown) {
    return effectiveValue === TSTrue;
  }
  return (options!.Strict ?? TSUnknown) !== TSFalse;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetEffectiveTypeRoots","kind":"method","status":"implemented","sigHash":"79b9e0013779d08e5f2c2a543cd5677768ee920be194a19189e83aceeb6db399"}
 *
 * Go source:
 * func (options *CompilerOptions) GetEffectiveTypeRoots(currentDirectory string) (result []string, fromConfig bool) {
 * 	if options.TypeRoots != nil {
 * 		return options.TypeRoots, true
 * 	}
 * 	var baseDir string
 * 	if options.ConfigFilePath != "" {
 * 		baseDir = tspath.GetDirectoryPath(options.ConfigFilePath)
 * 	} else {
 * 		baseDir = currentDirectory
 * 		if baseDir == "" {
 * 			// This was accounted for in the TS codebase, but only for third-party API usage
 * 			// where the module resolution host does not provide a getCurrentDirectory().
 * 			panic("cannot get effective type roots without a config file path or current directory")
 * 		}
 * 	}
 *
 * 	typeRoots := make([]string, 0, strings.Count(baseDir, "/"))
 * 	tspath.ForEachAncestorDirectory(baseDir, func(dir string) (any, bool) {
 * 		typeRoots = append(typeRoots, tspath.CombinePaths(dir, "node_modules", "@types"))
 * 		return nil, false
 * 	})
 * 	return typeRoots, false
 * }
 */
export function CompilerOptions_GetEffectiveTypeRoots(receiver: GoPtr<CompilerOptions>, currentDirectory: string): [result: GoSlice<string>, fromConfig: bool] {
  const options: GoPtr<CompilerOptions> = receiver;
  if (!GoSliceIsNil(options!.TypeRoots)) {
    return [options!.TypeRoots, true];
  }
  let baseDir: string;
  const configFilePath = options!.ConfigFilePath ?? "";
  if (configFilePath !== "") {
    baseDir = GetDirectoryPath(configFilePath);
  } else {
    baseDir = currentDirectory;
    if (baseDir === "") {
      // This was accounted for in the TS codebase, but only for third-party API usage
      // where the module resolution host does not provide a getCurrentDirectory().
      throw new globalThis.Error("cannot get effective type roots without a config file path or current directory");
    }
  }

  const typeRoots: GoSlice<string> = [];
  void strings.Count(baseDir, "/");
  ForEachAncestorDirectory<unknown>(baseDir, (dir: string): [unknown, bool] => {
    typeRoots.push(CombinePaths(dir, "node_modules", "@types"));
    return [undefined, false];
  }, GoZeroInterface);
  return [typeRoots, false];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.UsesWildcardTypes","kind":"method","status":"implemented","sigHash":"d3e47efd7ec273aaa1a32d58f0e1088a089b495f8cebefabc7a05725244f2d0a"}
 *
 * Go source:
 * func (options *CompilerOptions) UsesWildcardTypes() bool {
 * 	return slices.Contains(options.Types, "*")
 * }
 */
export function CompilerOptions_UsesWildcardTypes(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return slices.Contains(options!.Types, "*", GoEqualStrict);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetIsolatedModules","kind":"method","status":"implemented","sigHash":"7d20f73c4d8f94d8a6490055742935dcede3f3a95e382e319b38141b17f0b2dd"}
 *
 * Go source:
 * func (options *CompilerOptions) GetIsolatedModules() bool {
 * 	return options.IsolatedModules == TSTrue || options.VerbatimModuleSyntax == TSTrue
 * }
 */
export function CompilerOptions_GetIsolatedModules(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return (options!.IsolatedModules ?? TSUnknown) === TSTrue || (options!.VerbatimModuleSyntax ?? TSUnknown) === TSTrue;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.IsIncremental","kind":"method","status":"implemented","sigHash":"2a5f7840f4fd027ab2f14a4f9252ee151868880e36ef48582e12e9b7aeb31392"}
 *
 * Go source:
 * func (options *CompilerOptions) IsIncremental() bool {
 * 	return options.Incremental.IsTrue() || options.Composite.IsTrue()
 * }
 */
export function CompilerOptions_IsIncremental(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return Tristate_IsTrue(options!.Incremental) || Tristate_IsTrue(options!.Composite);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetEmitStandardClassFields","kind":"method","status":"implemented","sigHash":"6820304737bd8e7e0a5bbd46c58070611ab3699405b9918adc0a997cfb724161"}
 *
 * Go source:
 * func (options *CompilerOptions) GetEmitStandardClassFields() bool {
 * 	return options.UseDefineForClassFields != TSFalse && options.GetEmitScriptTarget() >= ScriptTargetES2022
 * }
 */
export function CompilerOptions_GetEmitStandardClassFields(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return (options!.UseDefineForClassFields ?? TSUnknown) !== TSFalse && CompilerOptions_GetEmitScriptTarget(options) >= ScriptTargetES2022;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetUseDefineForClassFields","kind":"method","status":"implemented","sigHash":"7bbcbbeefc963c259ec20eb3d2e1c3babf28923d00187e24720dfafdb10d2a9b"}
 *
 * Go source:
 * func (options *CompilerOptions) GetUseDefineForClassFields() bool {
 * 	if options.UseDefineForClassFields == TSUnknown {
 * 		return options.GetEmitScriptTarget() >= ScriptTargetES2022
 * 	}
 * 	return options.UseDefineForClassFields == TSTrue
 * }
 */
export function CompilerOptions_GetUseDefineForClassFields(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  const useDefineForClassFields = options!.UseDefineForClassFields ?? TSUnknown;
  if (useDefineForClassFields === TSUnknown) {
    return CompilerOptions_GetEmitScriptTarget(options) >= ScriptTargetES2022;
  }
  return useDefineForClassFields === TSTrue;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetEmitDeclarations","kind":"method","status":"implemented","sigHash":"6d889a2965e0d06ca23a9a09a4fcf42ebb5e2285b06cba6104f6a15d5754c5aa"}
 *
 * Go source:
 * func (options *CompilerOptions) GetEmitDeclarations() bool {
 * 	return options.Declaration.IsTrue() || options.Composite.IsTrue()
 * }
 */
export function CompilerOptions_GetEmitDeclarations(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return Tristate_IsTrue(options!.Declaration) || Tristate_IsTrue(options!.Composite);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetAreDeclarationMapsEnabled","kind":"method","status":"implemented","sigHash":"efd86b5088cb13a1ff943af5f60aa4269b31ca5687b4f8229135efcd1b46d840"}
 *
 * Go source:
 * func (options *CompilerOptions) GetAreDeclarationMapsEnabled() bool {
 * 	return options.DeclarationMap == TSTrue && options.GetEmitDeclarations()
 * }
 */
export function CompilerOptions_GetAreDeclarationMapsEnabled(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  return options!.DeclarationMap === TSTrue && CompilerOptions_GetEmitDeclarations(options);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.HasJsonModuleEmitEnabled","kind":"method","status":"implemented","sigHash":"ee90ac5838a79c380a38894668e46b56a548d8b95653c85434ea68f05913eef4"}
 *
 * Go source:
 * func (options *CompilerOptions) HasJsonModuleEmitEnabled() bool {
 * 	switch options.GetEmitModuleKind() {
 * 	case ModuleKindSystem, ModuleKindUMD:
 * 		return false
 * 	}
 * 	return true
 * }
 */
export function CompilerOptions_HasJsonModuleEmitEnabled(receiver: GoPtr<CompilerOptions>): bool {
  const options: GoPtr<CompilerOptions> = receiver;
  switch (CompilerOptions_GetEmitModuleKind(options)) {
    case ModuleKindSystem:
    case ModuleKindUMD:
      return false;
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::CompilerOptions.GetPathsBasePath","kind":"method","status":"implemented","sigHash":"450a3ccbf5dac0d726749a6b37b48dd3713493dd6fe4b6c5cc73fa03c3bf5744"}
 *
 * Go source:
 * func (options *CompilerOptions) GetPathsBasePath(currentDirectory string) string {
 * 	if options.Paths.Size() == 0 {
 * 		return ""
 * 	}
 * 	if options.PathsBasePath != "" {
 * 		return options.PathsBasePath
 * 	}
 * 	return currentDirectory
 * }
 */
export function CompilerOptions_GetPathsBasePath(receiver: GoPtr<CompilerOptions>, currentDirectory: string): string {
  const options: GoPtr<CompilerOptions> = receiver;
  if (OrderedMap_Size(options!.Paths) === 0) {
    return "";
  }
  if (options!.PathsBasePath !== "") {
    return options!.PathsBasePath;
  }
  return currentDirectory;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::ModuleDetectionKind","kind":"type","status":"implemented","sigHash":"846d3c09229f548bd1bfa0dab7c7820157465ce748a7aea7eb67114bc40dc528"}
 *
 * Go source:
 * ModuleDetectionKind int32
 */
export type ModuleDetectionKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::ModuleDetectionKindNone+ModuleDetectionKindAuto+ModuleDetectionKindLegacy+ModuleDetectionKindForce","kind":"constGroup","status":"implemented","sigHash":"71c26f100c08658f4e99625e51fcae43c855e35c75b861c58f4273786153a859"}
 *
 * Go source:
 * const (
 * 	ModuleDetectionKindNone   ModuleDetectionKind = 0
 * 	ModuleDetectionKindAuto   ModuleDetectionKind = 1
 * 	ModuleDetectionKindLegacy ModuleDetectionKind = 2
 * 	ModuleDetectionKindForce  ModuleDetectionKind = 3
 * )
 */
export const ModuleDetectionKindNone: ModuleDetectionKind = 0;
export const ModuleDetectionKindAuto: ModuleDetectionKind = 1;
export const ModuleDetectionKindLegacy: ModuleDetectionKind = 2;
export const ModuleDetectionKindForce: ModuleDetectionKind = 3;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::ModuleKind","kind":"type","status":"implemented","sigHash":"be89d3a99b4623bbc5eff707e741c28e876b917b4587d4232f81d18127d38061"}
 *
 * Go source:
 * ModuleKind int32
 */
export type ModuleKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::ModuleKindNone+ModuleKindCommonJS+ModuleKindAMD+ModuleKindUMD+ModuleKindSystem+ModuleKindES2015+ModuleKindES2020+ModuleKindES2022+ModuleKindESNext+ModuleKindNode16+ModuleKindNode18+ModuleKindNode20+ModuleKindNodeNext+ModuleKindPreserve","kind":"constGroup","status":"implemented","sigHash":"9e4e1b6f4534bb7c93826bb4000721649b579b24570e1b714aa8864873530f61"}
 *
 * Go source:
 * const (
 * 	ModuleKindNone     ModuleKind = 0
 * 	ModuleKindCommonJS ModuleKind = 1
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ModuleKindAMD ModuleKind = 2
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ModuleKindUMD ModuleKind = 3
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ModuleKindSystem ModuleKind = 4
 * 	// NOTE: ES module kinds should be contiguous to more easily check whether a module kind is *any* ES module kind.
 * 	//       Non-ES module kinds should not come between ES2015 (the earliest ES module kind) and ESNext (the last ES
 * 	//       module kind).
 * 	ModuleKindES2015 ModuleKind = 5
 * 	ModuleKindES2020 ModuleKind = 6
 * 	ModuleKindES2022 ModuleKind = 7
 * 	ModuleKindESNext ModuleKind = 99
 * 	// Node16+ is an amalgam of commonjs (albeit updated) and es2022+, and represents a distinct module system from es2020/esnext
 * 	ModuleKindNode16   ModuleKind = 100
 * 	ModuleKindNode18   ModuleKind = 101
 * 	ModuleKindNode20   ModuleKind = 102
 * 	ModuleKindNodeNext ModuleKind = 199
 * 	// Emit as written
 * 	ModuleKindPreserve ModuleKind = 200
 * )
 */
export const ModuleKindNone: ModuleKind = 0;
export const ModuleKindCommonJS: ModuleKind = 1;
// Deprecated: Do not use outside of options parsing and validation.
export const ModuleKindAMD: ModuleKind = 2;
// Deprecated: Do not use outside of options parsing and validation.
export const ModuleKindUMD: ModuleKind = 3;
// Deprecated: Do not use outside of options parsing and validation.
export const ModuleKindSystem: ModuleKind = 4;
// NOTE: ES module kinds should be contiguous to more easily check whether a module kind is *any* ES module kind.
//       Non-ES module kinds should not come between ES2015 (the earliest ES module kind) and ESNext (the last ES
//       module kind).
export const ModuleKindES2015: ModuleKind = 5;
export const ModuleKindES2020: ModuleKind = 6;
export const ModuleKindES2022: ModuleKind = 7;
export const ModuleKindESNext: ModuleKind = 99;
// Node16+ is an amalgam of commonjs (albeit updated) and es2022+, and represents a distinct module system from es2020/esnext
export const ModuleKindNode16: ModuleKind = 100;
export const ModuleKindNode18: ModuleKind = 101;
export const ModuleKindNode20: ModuleKind = 102;
export const ModuleKindNodeNext: ModuleKind = 199;
// Emit as written
export const ModuleKindPreserve: ModuleKind = 200;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::ModuleKind.IsNonNodeESM","kind":"method","status":"implemented","sigHash":"67e21d7f9f381e766df2b5c353282fba829d341984b902111df2c27860ed0a74"}
 *
 * Go source:
 * func (moduleKind ModuleKind) IsNonNodeESM() bool {
 * 	return moduleKind >= ModuleKindES2015 && moduleKind <= ModuleKindESNext
 * }
 */
export function ModuleKind_IsNonNodeESM(receiver: ModuleKind): bool {
  const moduleKind: ModuleKind = receiver;
  return moduleKind >= ModuleKindES2015 && moduleKind <= ModuleKindESNext;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::ModuleKind.SupportsImportAttributes","kind":"method","status":"implemented","sigHash":"5074aacebc86d93799bb776799dee9d4b4d54b43222bded5980c05dd85eba468"}
 *
 * Go source:
 * func (moduleKind ModuleKind) SupportsImportAttributes() bool {
 * 	return ModuleKindNode18 <= moduleKind && moduleKind <= ModuleKindNodeNext ||
 * 		moduleKind == ModuleKindPreserve ||
 * 		moduleKind == ModuleKindESNext
 * }
 */
export function ModuleKind_SupportsImportAttributes(receiver: ModuleKind): bool {
  const moduleKind: ModuleKind = receiver;
  return (
    (ModuleKindNode18 <= moduleKind && moduleKind <= ModuleKindNodeNext) ||
    moduleKind === ModuleKindPreserve ||
    moduleKind === ModuleKindESNext
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::ResolutionMode","kind":"type","status":"implemented","sigHash":"e3892feb33013b1b2db641842c219e361de28de2a8d52495b8385259a1a4200a"}
 *
 * Go source:
 * ResolutionMode = ModuleKind
 */
export type ResolutionMode = ModuleKind;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::ResolutionModeNone+ResolutionModeCommonJS+ResolutionModeESM","kind":"constGroup","status":"implemented","sigHash":"dcf71b4b7bc0545c9173334cbcf1f49d871a6c4da87fb0679ac21fba9fa7b912"}
 *
 * Go source:
 * const (
 * 	ResolutionModeNone     = ModuleKindNone
 * 	ResolutionModeCommonJS = ModuleKindCommonJS
 * 	ResolutionModeESM      = ModuleKindESNext
 * )
 */
export const ResolutionModeNone: ModuleKind = ModuleKindNone;
export const ResolutionModeCommonJS: ModuleKind = ModuleKindCommonJS;
export const ResolutionModeESM: ModuleKind = ModuleKindESNext;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::ModuleResolutionKind","kind":"type","status":"implemented","sigHash":"0fa5effbcd76e7a7b3eca5e12fb346ce5e1d096d4e36a79cdfd4f8e86b8e4306"}
 *
 * Go source:
 * ModuleResolutionKind int32
 */
export type ModuleResolutionKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::ModuleResolutionKindUnknown+ModuleResolutionKindClassic+ModuleResolutionKindNode10+ModuleResolutionKindNode16+ModuleResolutionKindNodeNext+ModuleResolutionKindBundler","kind":"constGroup","status":"implemented","sigHash":"fb143d34ff062ec7a8a67e818f29829308ea515d43388a0d39e5375b08ac0a2e"}
 *
 * Go source:
 * const (
 * 	ModuleResolutionKindUnknown ModuleResolutionKind = 0
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ModuleResolutionKindClassic ModuleResolutionKind = 1
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ModuleResolutionKindNode10 ModuleResolutionKind = 2
 * 	// Starting with node16, node's module resolver has significant departures from traditional cjs resolution
 * 	// to better support ECMAScript modules and their use within node - however more features are still being added.
 * 	// TypeScript's Node ESM support was introduced after Node 12 went end-of-life, and Node 14 is the earliest stable
 * 	// version that supports both pattern trailers - *but*, Node 16 is the first version that also supports ECMAScript 2022.
 * 	// In turn, we offer both a `NodeNext` moving resolution target, and a `Node16` version-anchored resolution target
 * 	ModuleResolutionKindNode16   ModuleResolutionKind = 3
 * 	ModuleResolutionKindNodeNext ModuleResolutionKind = 99 // Not simply `Node16` so that compiled code linked against TS can use the `Next` value reliably (same as with `ModuleKind`)
 * 	ModuleResolutionKindBundler  ModuleResolutionKind = 100
 * )
 */
export const ModuleResolutionKindUnknown: ModuleResolutionKind = 0;
// Deprecated: Do not use outside of options parsing and validation.
export const ModuleResolutionKindClassic: ModuleResolutionKind = 1;
// Deprecated: Do not use outside of options parsing and validation.
export const ModuleResolutionKindNode10: ModuleResolutionKind = 2;
// Starting with node16, node's module resolver has significant departures from traditional cjs resolution
// to better support ECMAScript modules and their use within node - however more features are still being added.
// TypeScript's Node ESM support was introduced after Node 12 went end-of-life, and Node 14 is the earliest stable
// version that supports both pattern trailers - *but*, Node 16 is the first version that also supports ECMAScript 2022.
// In turn, we offer both a `NodeNext` moving resolution target, and a `Node16` version-anchored resolution target
export const ModuleResolutionKindNode16: ModuleResolutionKind = 3;
export const ModuleResolutionKindNodeNext: ModuleResolutionKind = 99; // Not simply `Node16` so that compiled code linked against TS can use the `Next` value reliably (same as with `ModuleKind`)
export const ModuleResolutionKindBundler: ModuleResolutionKind = 100;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::varGroup::ModuleKindToModuleResolutionKind","kind":"varGroup","status":"implemented","sigHash":"581b869f0ae7b1b8d9d00883addfc9d413d13ed3d695b2a85e5e3d65a80d0ce8"}
 *
 * Go source:
 * var ModuleKindToModuleResolutionKind = map[ModuleKind]ModuleResolutionKind{
 * 	ModuleKindNode16:   ModuleResolutionKindNode16,
 * 	ModuleKindNodeNext: ModuleResolutionKindNodeNext,
 * }
 */
export let ModuleKindToModuleResolutionKind: GoMap<ModuleKind, ModuleResolutionKind> = new globalThis.Map<ModuleKind, ModuleResolutionKind>([
  [ModuleKindNode16, ModuleResolutionKindNode16],
  [ModuleKindNodeNext, ModuleResolutionKindNodeNext],
]);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::ModuleResolutionKind.String","kind":"method","status":"implemented","sigHash":"04aa60537da30b2af19d2b05325b67dc999bdf83c18ab947c721d3060772b6c0"}
 *
 * Go source:
 * func (m ModuleResolutionKind) String() string {
 * 	switch m {
 * 	case ModuleResolutionKindUnknown:
 * 		panic("should not use zero value of ModuleResolutionKind")
 * 	case ModuleResolutionKindClassic:
 * 		return "Classic"
 * 	case ModuleResolutionKindNode10:
 * 		return "Node10"
 * 	case ModuleResolutionKindNode16:
 * 		return "Node16"
 * 	case ModuleResolutionKindNodeNext:
 * 		return "NodeNext"
 * 	case ModuleResolutionKindBundler:
 * 		return "Bundler"
 * 	default:
 * 		panic("unhandled case in ModuleResolutionKind.String")
 * 	}
 * }
 */
export function ModuleResolutionKind_String(receiver: ModuleResolutionKind): string {
  const m: ModuleResolutionKind = receiver;
  switch (m) {
    case ModuleResolutionKindUnknown:
      throw new globalThis.Error("should not use zero value of ModuleResolutionKind");
    case ModuleResolutionKindClassic:
      return "Classic";
    case ModuleResolutionKindNode10:
      return "Node10";
    case ModuleResolutionKindNode16:
      return "Node16";
    case ModuleResolutionKindNodeNext:
      return "NodeNext";
    case ModuleResolutionKindBundler:
      return "Bundler";
    default:
      throw new globalThis.Error("unhandled case in ModuleResolutionKind.String");
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::NewLineKind","kind":"type","status":"implemented","sigHash":"e3443c77092a3fd2b87937cfef97ff4590d1b75f859f4f589fcc21289ccaeaad"}
 *
 * Go source:
 * NewLineKind int32
 */
export type NewLineKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::NewLineKindNone+NewLineKindCRLF+NewLineKindLF","kind":"constGroup","status":"implemented","sigHash":"607c169c4aef5207c93a896e138b1346898c230e892c3fb06e9cd4cad3a2261a"}
 *
 * Go source:
 * const (
 * 	NewLineKindNone NewLineKind = 0
 * 	NewLineKindCRLF NewLineKind = 1
 * 	NewLineKindLF   NewLineKind = 2
 * )
 */
export const NewLineKindNone: NewLineKind = 0;
export const NewLineKindCRLF: NewLineKind = 1;
export const NewLineKindLF: NewLineKind = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::func::GetNewLineKind","kind":"func","status":"implemented","sigHash":"aa4b394574ca877dfd6417c57a23164aa1fa1f4f8a9822be1be179a7529153c4"}
 *
 * Go source:
 * func GetNewLineKind(s string) NewLineKind {
 * 	switch s {
 * 	case "\r\n":
 * 		return NewLineKindCRLF
 * 	case "\n":
 * 		return NewLineKindLF
 * 	default:
 * 		return NewLineKindNone
 * 	}
 * }
 */
export function GetNewLineKind(s: string): NewLineKind {
  switch (s) {
    case "\r\n":
      return NewLineKindCRLF;
    case "\n":
      return NewLineKindLF;
    default:
      return NewLineKindNone;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::NewLineKind.GetNewLineCharacter","kind":"method","status":"implemented","sigHash":"b504b4d26e21808b3f3c5e3d6dd580fad5e18183df9d8916b3a044d0a52e4678"}
 *
 * Go source:
 * func (newLine NewLineKind) GetNewLineCharacter() string {
 * 	switch newLine {
 * 	case NewLineKindCRLF:
 * 		return "\r\n"
 * 	default:
 * 		return "\n"
 * 	}
 * }
 */
export function NewLineKind_GetNewLineCharacter(receiver: NewLineKind): string {
  const newLine: NewLineKind = receiver;
  switch (newLine) {
    case NewLineKindCRLF:
      return "\r\n";
    default:
      return "\n";
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::ScriptTarget","kind":"type","status":"implemented","sigHash":"bca37d218829266940f9cad52870ac2ba6847ceedaca63f4a256272464a4ea84"}
 *
 * Go source:
 * ScriptTarget int32
 */
export type ScriptTarget = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::ScriptTargetNone+ScriptTargetES5+ScriptTargetES2015+ScriptTargetES2016+ScriptTargetES2017+ScriptTargetES2018+ScriptTargetES2019+ScriptTargetES2020+ScriptTargetES2021+ScriptTargetES2022+ScriptTargetES2023+ScriptTargetES2024+ScriptTargetES2025+ScriptTargetESNext+ScriptTargetJSON+ScriptTargetLatest+ScriptTargetLatestStandard","kind":"constGroup","status":"implemented","sigHash":"0e107f65ba2f78d8f1e2319cd546d1ed0b4a6783238c32533ccf8c4f2fdffe45"}
 *
 * Go source:
 * const (
 * 	ScriptTargetNone ScriptTarget = 0
 * 	// Deprecated: Do not use outside of options parsing and validation.
 * 	ScriptTargetES5            ScriptTarget = 1
 * 	ScriptTargetES2015         ScriptTarget = 2
 * 	ScriptTargetES2016         ScriptTarget = 3
 * 	ScriptTargetES2017         ScriptTarget = 4
 * 	ScriptTargetES2018         ScriptTarget = 5
 * 	ScriptTargetES2019         ScriptTarget = 6
 * 	ScriptTargetES2020         ScriptTarget = 7
 * 	ScriptTargetES2021         ScriptTarget = 8
 * 	ScriptTargetES2022         ScriptTarget = 9
 * 	ScriptTargetES2023         ScriptTarget = 10
 * 	ScriptTargetES2024         ScriptTarget = 11
 * 	ScriptTargetES2025         ScriptTarget = 12
 * 	ScriptTargetESNext         ScriptTarget = 99
 * 	ScriptTargetJSON           ScriptTarget = 100
 * 	ScriptTargetLatest         ScriptTarget = ScriptTargetESNext
 * 	ScriptTargetLatestStandard ScriptTarget = ScriptTargetES2025
 * )
 */
export const ScriptTargetNone: ScriptTarget = 0;
// Deprecated: Do not use outside of options parsing and validation.
export const ScriptTargetES5: ScriptTarget = 1;
export const ScriptTargetES2015: ScriptTarget = 2;
export const ScriptTargetES2016: ScriptTarget = 3;
export const ScriptTargetES2017: ScriptTarget = 4;
export const ScriptTargetES2018: ScriptTarget = 5;
export const ScriptTargetES2019: ScriptTarget = 6;
export const ScriptTargetES2020: ScriptTarget = 7;
export const ScriptTargetES2021: ScriptTarget = 8;
export const ScriptTargetES2022: ScriptTarget = 9;
export const ScriptTargetES2023: ScriptTarget = 10;
export const ScriptTargetES2024: ScriptTarget = 11;
export const ScriptTargetES2025: ScriptTarget = 12;
export const ScriptTargetESNext: ScriptTarget = 99;
export const ScriptTargetJSON: ScriptTarget = 100;
export const ScriptTargetLatest: ScriptTarget = ScriptTargetESNext;
export const ScriptTargetLatestStandard: ScriptTarget = ScriptTargetES2025;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::JsxEmit","kind":"type","status":"implemented","sigHash":"2d5c6ecace49775e98e163631f916965b29249d299ec2b847c3a97a23ac7d3ce"}
 *
 * Go source:
 * JsxEmit int32
 */
export type JsxEmit = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::constGroup::JsxEmitNone+JsxEmitPreserve+JsxEmitReactNative+JsxEmitReact+JsxEmitReactJSX+JsxEmitReactJSXDev","kind":"constGroup","status":"implemented","sigHash":"97236ceb574198876ee12b73f7afd866112ec81ca3d5fa8a7a31c83950dcb2c3"}
 *
 * Go source:
 * const (
 * 	JsxEmitNone        JsxEmit = 0
 * 	JsxEmitPreserve    JsxEmit = 1
 * 	JsxEmitReactNative JsxEmit = 2
 * 	JsxEmitReact       JsxEmit = 3
 * 	JsxEmitReactJSX    JsxEmit = 4
 * 	JsxEmitReactJSXDev JsxEmit = 5
 * )
 */
export const JsxEmitNone: JsxEmit = 0;
export const JsxEmitPreserve: JsxEmit = 1;
export const JsxEmitReactNative: JsxEmit = 2;
export const JsxEmitReact: JsxEmit = 3;
export const JsxEmitReactJSX: JsxEmit = 4;
export const JsxEmitReactJSXDev: JsxEmit = 5;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/compileroptions.go::method::JsxEmit.String","kind":"method","status":"implemented","sigHash":"2f7d6fd6194ea7c34c021351ac0d349a9662bdc34f4243c2e15cdc83b17244a9"}
 *
 * Go source:
 * func (j JsxEmit) String() string {
 * 	switch j {
 * 	case JsxEmitNone:
 * 		panic("should not use zero value of JsxEmit")
 * 	case JsxEmitPreserve:
 * 		return "preserve"
 * 	case JsxEmitReactNative:
 * 		return "react-native"
 * 	case JsxEmitReact:
 * 		return "react"
 * 	case JsxEmitReactJSX:
 * 		return "react-jsx"
 * 	case JsxEmitReactJSXDev:
 * 		return "react-jsxdev"
 * 	default:
 * 		panic("unhandled case in JsxEmit.String")
 * 	}
 * }
 */
export function JsxEmit_String(receiver: JsxEmit): string {
  const j: JsxEmit = receiver;
  switch (j) {
    case JsxEmitNone:
      throw new globalThis.Error("should not use zero value of JsxEmit");
    case JsxEmitPreserve:
      return "preserve";
    case JsxEmitReactNative:
      return "react-native";
    case JsxEmitReact:
      return "react";
    case JsxEmitReactJSX:
      return "react-jsx";
    case JsxEmitReactJSXDev:
      return "react-jsxdev";
    default:
      throw new globalThis.Error("unhandled case in JsxEmit.String");
  }
}

type CompilerOptionsJsonFields = JsonFieldNamesForGoStructContract<
  CompilerOptions,
  "github.com/microsoft/typescript-go::internal/core/compileroptions.go::type::CompilerOptions",
  {
    readonly AllowJs: { readonly name: "allowJs"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowArbitraryExtensions: { readonly name: "allowArbitraryExtensions"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowImportingTsExtensions: { readonly name: "allowImportingTsExtensions"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowNonTsExtensions: { readonly name: "allowNonTsExtensions"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowUmdGlobalAccess: { readonly name: "allowUmdGlobalAccess"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowUnreachableCode: { readonly name: "allowUnreachableCode"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowUnusedLabels: { readonly name: "allowUnusedLabels"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AssumeChangesOnlyAffectDirectDependencies: { readonly name: "assumeChangesOnlyAffectDirectDependencies"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly CheckJs: { readonly name: "checkJs"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly CustomConditions: { readonly name: "customConditions"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Composite: { readonly name: "composite"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly EmitDeclarationOnly: { readonly name: "emitDeclarationOnly"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly EmitBOM: { readonly name: "emitBOM"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly EmitDecoratorMetadata: { readonly name: "emitDecoratorMetadata"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Declaration: { readonly name: "declaration"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DeclarationDir: { readonly name: "declarationDir"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DeclarationMap: { readonly name: "declarationMap"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DeduplicatePackages: { readonly name: "deduplicatePackages"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DisableSizeLimit: { readonly name: "disableSizeLimit"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DisableSourceOfProjectReferenceRedirect: { readonly name: "disableSourceOfProjectReferenceRedirect"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DisableSolutionSearching: { readonly name: "disableSolutionSearching"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DisableReferencedProjectLoad: { readonly name: "disableReferencedProjectLoad"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ErasableSyntaxOnly: { readonly name: "erasableSyntaxOnly"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ExactOptionalPropertyTypes: { readonly name: "exactOptionalPropertyTypes"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ExperimentalDecorators: { readonly name: "experimentalDecorators"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ForceConsistentCasingInFileNames: { readonly name: "forceConsistentCasingInFileNames"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly IsolatedModules: { readonly name: "isolatedModules"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly IsolatedDeclarations: { readonly name: "isolatedDeclarations"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly IgnoreConfig: { readonly name: "ignoreConfig"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly IgnoreDeprecations: { readonly name: "ignoreDeprecations"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ImportHelpers: { readonly name: "importHelpers"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly InlineSourceMap: { readonly name: "inlineSourceMap"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly InlineSources: { readonly name: "inlineSources"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Init: { readonly name: "init"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Incremental: { readonly name: "incremental"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Jsx: { readonly name: "jsx"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly JsxFactory: { readonly name: "jsxFactory"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly JsxFragmentFactory: { readonly name: "jsxFragmentFactory"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly JsxImportSource: { readonly name: "jsxImportSource"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Lib: { readonly name: "lib"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly LibReplacement: { readonly name: "libReplacement"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Locale: { readonly name: "locale"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly MapRoot: { readonly name: "mapRoot"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Module: { readonly name: "module"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ModuleResolution: { readonly name: "moduleResolution"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ModuleSuffixes: { readonly name: "moduleSuffixes"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ModuleDetection: { readonly name: "moduleDetection"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NewLine: { readonly name: "newLine"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoEmit: { readonly name: "noEmit"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoCheck: { readonly name: "noCheck"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoErrorTruncation: { readonly name: "noErrorTruncation"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoFallthroughCasesInSwitch: { readonly name: "noFallthroughCasesInSwitch"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoImplicitAny: { readonly name: "noImplicitAny"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoImplicitThis: { readonly name: "noImplicitThis"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoImplicitReturns: { readonly name: "noImplicitReturns"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoEmitHelpers: { readonly name: "noEmitHelpers"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoLib: { readonly name: "noLib"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoPropertyAccessFromIndexSignature: { readonly name: "noPropertyAccessFromIndexSignature"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoUncheckedIndexedAccess: { readonly name: "noUncheckedIndexedAccess"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoEmitOnError: { readonly name: "noEmitOnError"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoUnusedLocals: { readonly name: "noUnusedLocals"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoUnusedParameters: { readonly name: "noUnusedParameters"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoResolve: { readonly name: "noResolve"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoImplicitOverride: { readonly name: "noImplicitOverride"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoUncheckedSideEffectImports: { readonly name: "noUncheckedSideEffectImports"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly OutDir: { readonly name: "outDir"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Paths: { readonly name: "paths"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly PreserveConstEnums: { readonly name: "preserveConstEnums"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly PreserveSymlinks: { readonly name: "preserveSymlinks"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Project: { readonly name: "project"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ResolveJsonModule: { readonly name: "resolveJsonModule"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ResolvePackageJsonExports: { readonly name: "resolvePackageJsonExports"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ResolvePackageJsonImports: { readonly name: "resolvePackageJsonImports"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly RemoveComments: { readonly name: "removeComments"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly RewriteRelativeImportExtensions: { readonly name: "rewriteRelativeImportExtensions"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ReactNamespace: { readonly name: "reactNamespace"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly RootDir: { readonly name: "rootDir"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly RootDirs: { readonly name: "rootDirs"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly SkipLibCheck: { readonly name: "skipLibCheck"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StableTypeOrdering: { readonly name: "stableTypeOrdering"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Strict: { readonly name: "strict"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StrictBindCallApply: { readonly name: "strictBindCallApply"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StrictBuiltinIteratorReturn: { readonly name: "strictBuiltinIteratorReturn"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StrictFunctionTypes: { readonly name: "strictFunctionTypes"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StrictNullChecks: { readonly name: "strictNullChecks"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StrictPropertyInitialization: { readonly name: "strictPropertyInitialization"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly StripInternal: { readonly name: "stripInternal"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly SkipDefaultLibCheck: { readonly name: "skipDefaultLibCheck"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly SourceMap: { readonly name: "sourceMap"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly SourceRoot: { readonly name: "sourceRoot"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly SuppressOutputPathCheck: { readonly name: "suppressOutputPathCheck"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Target: { readonly name: "target"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly TraceResolution: { readonly name: "traceResolution"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly TsBuildInfoFile: { readonly name: "tsBuildInfoFile"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly TypeRoots: { readonly name: "typeRoots"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Types: { readonly name: "types"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly UseDefineForClassFields: { readonly name: "useDefineForClassFields"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly UseUnknownInCatchVariables: { readonly name: "useUnknownInCatchVariables"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly VerbatimModuleSyntax: { readonly name: "verbatimModuleSyntax"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly MaxNodeModuleJsDepth: { readonly name: "maxNodeModuleJsDepth"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AllowSyntheticDefaultImports: { readonly name: "allowSyntheticDefaultImports"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly AlwaysStrict: { readonly name: "alwaysStrict"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly BaseUrl: { readonly name: "baseUrl"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly DownlevelIteration: { readonly name: "downlevelIteration"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ESModuleInterop: { readonly name: "esModuleInterop"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly OutFile: { readonly name: "outFile"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ConfigFilePath: { readonly name: "configFilePath"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoDtsResolution: { readonly name: "noDtsResolution"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly PathsBasePath: { readonly name: "pathsBasePath"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Diagnostics: { readonly name: "diagnostics"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ExtendedDiagnostics: { readonly name: "extendedDiagnostics"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly GenerateCpuProfile: { readonly name: "generateCpuProfile"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly GenerateTrace: { readonly name: "generateTrace"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ListEmittedFiles: { readonly name: "listEmittedFiles"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ListFiles: { readonly name: "listFiles"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ExplainFiles: { readonly name: "explainFiles"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ListFilesOnly: { readonly name: "listFilesOnly"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly NoEmitForJsFiles: { readonly name: "noEmitForJsFiles"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly PreserveWatchOutput: { readonly name: "preserveWatchOutput"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Pretty: { readonly name: "pretty"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Version: { readonly name: "version"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Watch: { readonly name: "watch"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly ShowConfig: { readonly name: "showConfig"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Build: { readonly name: "build"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Help: { readonly name: "help"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly All: { readonly name: "all"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly PprofDir: { readonly name: "pprofDir"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly SingleThreaded: { readonly name: "singleThreaded"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Quiet: { readonly name: "quiet"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
    readonly Checkers: { readonly name: "checkers"; readonly omitZero: true; readonly omitEmpty: false; readonly ignored: false };
  }
>;
