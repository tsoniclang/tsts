import type { bool, int } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import { GoAppend } from "../../go/compat.js";
import * as fmt from "../../go/fmt.js";
import * as strings from "../../go/strings.js";
import type { Diagnostic } from "../ast/diagnostic.js";
import * as extension from "../tspath/extension.js";
import type { CompilerOptions, ResolutionMode } from "../core/compileroptions.js";
import type { FS } from "../vfs/vfs.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::ResolutionHost","kind":"type","status":"implemented","sigHash":"d2874553364b5749637eb3379154f51223483ec56c1f78e21b715135dc5f382a"}
 *
 * Go source:
 * ResolutionHost interface {
 * 	FS() vfs.FS
 * 	GetCurrentDirectory() string
 * }
 */
export interface ResolutionHost {
  FS(): GoInterface<FS>;
  GetCurrentDirectory(): string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::ModeAwareCacheKey","kind":"type","status":"implemented","sigHash":"18323546afc354ec2e90acbc492df59a681adafe4d182c99cdc86deca3bec5ec"}
 *
 * Go source:
 * ModeAwareCacheKey struct {
 * 	Name string
 * 	Mode core.ResolutionMode
 * }
 */
export interface ModeAwareCacheKey {
  Name: string;
  Mode: ResolutionMode;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::ResolvedProjectReference","kind":"type","status":"implemented","sigHash":"5acc7829a1385561ed945c926c025fa983aaf2a3537f94a74133650d429ac38b"}
 *
 * Go source:
 * ResolvedProjectReference interface {
 * 	ConfigName() string
 * 	CompilerOptions() *core.CompilerOptions
 * }
 */
export interface ResolvedProjectReference {
  ConfigName(): string;
  CompilerOptions(): GoPtr<CompilerOptions>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::NodeResolutionFeatures","kind":"type","status":"implemented","sigHash":"68d7278dbcef20613284f8f6054da00fefedf5a75744311220ec363f9c8cdac5"}
 *
 * Go source:
 * NodeResolutionFeatures int32
 */
export type NodeResolutionFeatures = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::constGroup::NodeResolutionFeaturesImports+NodeResolutionFeaturesSelfName+NodeResolutionFeaturesExports+NodeResolutionFeaturesExportsPatternTrailers+NodeResolutionFeaturesImportsPatternRoot+NodeResolutionFeaturesNone+NodeResolutionFeaturesAll+NodeResolutionFeaturesNode16Default+NodeResolutionFeaturesNodeNextDefault+NodeResolutionFeaturesBundlerDefault","kind":"constGroup","status":"implemented","sigHash":"57e649df64f89e281606a8c1f9bcfd50181508dbfa267d11299d0a9d3ca1d893"}
 *
 * Go source:
 * const (
 * 	NodeResolutionFeaturesImports NodeResolutionFeatures = 1 << iota
 * 	NodeResolutionFeaturesSelfName
 * 	NodeResolutionFeaturesExports
 * 	NodeResolutionFeaturesExportsPatternTrailers
 * 	// allowing `#/` root imports in package.json imports field
 * 	// not supported until mass adoption - https://github.com/nodejs/node/pull/60864
 * 	NodeResolutionFeaturesImportsPatternRoot
 * 
 * 	NodeResolutionFeaturesNone            NodeResolutionFeatures = 0
 * 	NodeResolutionFeaturesAll                                    = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers | NodeResolutionFeaturesImportsPatternRoot
 * 	NodeResolutionFeaturesNode16Default                          = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers
 * 	NodeResolutionFeaturesNodeNextDefault                        = NodeResolutionFeaturesAll
 * 	NodeResolutionFeaturesBundlerDefault                         = NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers | NodeResolutionFeaturesImportsPatternRoot
 * )
 */
export const NodeResolutionFeaturesImports: NodeResolutionFeatures = 1 << 0;
export const NodeResolutionFeaturesSelfName: NodeResolutionFeatures = 1 << 1;
export const NodeResolutionFeaturesExports: NodeResolutionFeatures = 1 << 2;
export const NodeResolutionFeaturesExportsPatternTrailers: NodeResolutionFeatures = 1 << 3;
export const NodeResolutionFeaturesImportsPatternRoot: NodeResolutionFeatures = 1 << 4;
export const NodeResolutionFeaturesNone: NodeResolutionFeatures = 0;
export const NodeResolutionFeaturesAll: NodeResolutionFeatures =
  NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers | NodeResolutionFeaturesImportsPatternRoot;
export const NodeResolutionFeaturesNode16Default: NodeResolutionFeatures =
  NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers;
export const NodeResolutionFeaturesNodeNextDefault: NodeResolutionFeatures = NodeResolutionFeaturesAll;
export const NodeResolutionFeaturesBundlerDefault: NodeResolutionFeatures =
  NodeResolutionFeaturesImports | NodeResolutionFeaturesSelfName | NodeResolutionFeaturesExports | NodeResolutionFeaturesExportsPatternTrailers | NodeResolutionFeaturesImportsPatternRoot;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::PackageId","kind":"type","status":"implemented","sigHash":"6f2c2e5f989d5c5b609cc1155c69730a482ad1a0b3b00df3fc932a2c120d6fc9"}
 *
 * Go source:
 * PackageId struct {
 * 	Name             string
 * 	SubModuleName    string
 * 	Version          string
 * 	PeerDependencies string
 * }
 */
export interface PackageId {
  Name: string;
  SubModuleName: string;
  Version: string;
  PeerDependencies: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::method::PackageId.String","kind":"method","status":"implemented","sigHash":"07e1145105c8a286c58ed064a7a513d0a23b765a7ed2b3aea9bb26105dc8e3f3"}
 *
 * Go source:
 * func (p *PackageId) String() string {
 * 	return fmt.Sprintf("%s@%s%s", p.PackageName(), p.Version, p.PeerDependencies)
 * }
 */
export function PackageId_String(receiver: GoPtr<PackageId>): string {
  const p = receiver!;
  return fmt.Sprintf("%s@%s%s", PackageId_PackageName(p), p.Version, p.PeerDependencies);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::method::PackageId.PackageName","kind":"method","status":"implemented","sigHash":"0c9f9971b224ff800cfd18708fd154439a18723a9b2c5e92f0065bf8d6d6121d"}
 *
 * Go source:
 * func (p *PackageId) PackageName() string {
 * 	if p.SubModuleName != "" {
 * 		return p.Name + "/" + p.SubModuleName
 * 	}
 * 	return p.Name
 * }
 */
export function PackageId_PackageName(receiver: GoPtr<PackageId>): string {
  const p = receiver!;
  if (p.SubModuleName !== "") {
    return p.Name + "/" + p.SubModuleName;
  }
  return p.Name;
}

export const ResolvedModuleExtensionProviderVirtual: "provider-virtual" = "provider-virtual";

export interface ResolvedModuleProviderVirtual {
  ProviderId: string;
  ProviderTarget: string;
  ProviderModuleId: string;
  ModuleSpecifier: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::ResolvedModule","kind":"type","status":"implemented","sigHash":"53e708be8a4f3098f19f5add396ef4ec4dc8314f1b210ded9411bb8baf7c40df"}
 * @tsgo-override {"category":"extension-host","allow":["signature"],"reason":"Provider virtual modules need first-class internal module-resolution identity instead of pretending to be physical .d.ts files; physical resolutions preserve the exact TS-Go fields.","goSignatureHash":"c15dcc14dc1d0d37b71c570442cf3d5042390a7483bf558ff22db55c792bdcc7","tsSignatureHash":"692ad32e81f37a5875c4779e916ed4790df9e375b774aa4b160aecc3e3ec2f2e"}
 *
 * Go source:
 * ResolvedModule struct {
 * 	ResolutionDiagnostics    []*ast.Diagnostic
 * 	ResolvedFileName         string
 * 	OriginalPath             string
 * 	Extension                string
 * 	ResolvedUsingTsExtension bool
 * 	PackageId                PackageId
 * 	IsExternalLibraryImport  bool
 * 	AlternateResult          string
 * }
 */
export interface ResolvedModule {
  ResolutionDiagnostics: GoSlice<GoPtr<Diagnostic>>;
  ResolvedFileName: string;
  OriginalPath: string;
  Extension: string;
  ResolvedUsingTsExtension: bool;
  PackageId: PackageId;
  IsExternalLibraryImport: bool;
  AlternateResult: string;
  ProviderVirtual?: ResolvedModuleProviderVirtual;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::method::ResolvedModule.IsResolved","kind":"method","status":"implemented","sigHash":"e902c2aac26780befbbd09abc7d82ad51bcbfb33ce82087c272c87179e971f7f"}
 *
 * Go source:
 * func (r *ResolvedModule) IsResolved() bool {
 * 	return r != nil && r.ResolvedFileName != ""
 * }
 */
export function ResolvedModule_IsResolved(receiver: GoPtr<ResolvedModule>): bool {
  return receiver !== undefined && receiver.ResolvedFileName !== "";
}

export function ResolvedModule_IsProviderVirtual(receiver: GoPtr<ResolvedModule>): bool {
  return receiver !== undefined && receiver.ProviderVirtual !== undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::ResolvedTypeReferenceDirective","kind":"type","status":"implemented","sigHash":"c11fbe67219b152359d3ab637880566883cb3549f58dd690a38202f291f6f059"}
 *
 * Go source:
 * ResolvedTypeReferenceDirective struct {
 * 	ResolutionDiagnostics   []*ast.Diagnostic
 * 	Primary                 bool
 * 	ResolvedFileName        string
 * 	OriginalPath            string
 * 	PackageId               PackageId
 * 	IsExternalLibraryImport bool
 * }
 */
export interface ResolvedTypeReferenceDirective {
  ResolutionDiagnostics: GoSlice<GoPtr<Diagnostic>>;
  Primary: bool;
  ResolvedFileName: string;
  OriginalPath: string;
  PackageId: PackageId;
  IsExternalLibraryImport: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::method::ResolvedTypeReferenceDirective.IsResolved","kind":"method","status":"implemented","sigHash":"f76972df25a94a35fdaf138c5f78e76310995da67456057a47b8f4a1aa93f9b2"}
 *
 * Go source:
 * func (r *ResolvedTypeReferenceDirective) IsResolved() bool {
 * 	return r.ResolvedFileName != ""
 * }
 */
export function ResolvedTypeReferenceDirective_IsResolved(receiver: GoPtr<ResolvedTypeReferenceDirective>): bool {
  return receiver!.ResolvedFileName !== "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::type::extensions","kind":"type","status":"implemented","sigHash":"7a1558fa8b807f24ac2f3884f126fb13e12dd24d518b740fbf6a02faa9a4dbf5"}
 *
 * Go source:
 * extensions int32
 */
export type extensions = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::constGroup::extensionsTypeScript+extensionsJavaScript+extensionsDeclaration+extensionsJson+extensionsImplementationFiles","kind":"constGroup","status":"implemented","sigHash":"84d7098806dec488c73f88abdd77f7f1b29d755c8092f48c38a1fc3a6abf74a9"}
 *
 * Go source:
 * const (
 * 	extensionsTypeScript extensions = 1 << iota
 * 	extensionsJavaScript
 * 	extensionsDeclaration
 * 	extensionsJson
 * 
 * 	extensionsImplementationFiles = extensionsTypeScript | extensionsJavaScript
 * )
 */
export const extensionsTypeScript: extensions = 1 << 0;
export const extensionsJavaScript: extensions = 1 << 1;
export const extensionsDeclaration: extensions = 1 << 2;
export const extensionsJson: extensions = 1 << 3;
export const extensionsImplementationFiles: extensions = extensionsTypeScript | extensionsJavaScript;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::method::extensions.String","kind":"method","status":"implemented","sigHash":"07c9b49ec98b86cccfff9d2d466581e555912d4ff447fb9314c2d5a239c0b035"}
 *
 * Go source:
 * func (e extensions) String() string {
 * 	result := make([]string, 0, bits.OnesCount(uint(e)))
 * 	if e&extensionsTypeScript != 0 {
 * 		result = append(result, "TypeScript")
 * 	}
 * 	if e&extensionsJavaScript != 0 {
 * 		result = append(result, "JavaScript")
 * 	}
 * 	if e&extensionsDeclaration != 0 {
 * 		result = append(result, "Declaration")
 * 	}
 * 	if e&extensionsJson != 0 {
 * 		result = append(result, "JSON")
 * 	}
 * 	return strings.Join(result, ", ")
 * }
 */
export function extensions_String(receiver: extensions): string {
  const e = receiver;
  let result: GoSlice<string> = [];
  if ((e & extensionsTypeScript) !== 0) {
    result = GoAppend(result, "TypeScript");
  }
  if ((e & extensionsJavaScript) !== 0) {
    result = GoAppend(result, "JavaScript");
  }
  if ((e & extensionsDeclaration) !== 0) {
    result = GoAppend(result, "Declaration");
  }
  if ((e & extensionsJson) !== 0) {
    result = GoAppend(result, "JSON");
  }
  return strings.Join(result, ", ");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/module/types.go::method::extensions.Array","kind":"method","status":"implemented","sigHash":"be5c4e0d3a7afd7d458e356ca120da96c474cc05096ef3a59a73e52feb71dfec"}
 *
 * Go source:
 * func (e extensions) Array() []string {
 * 	result := []string{}
 * 	if e&extensionsTypeScript != 0 {
 * 		result = append(result, tspath.SupportedTSImplementationExtensions...)
 * 	}
 * 	if e&extensionsJavaScript != 0 {
 * 		result = append(result, tspath.SupportedJSExtensionsFlat...)
 * 	}
 * 	if e&extensionsDeclaration != 0 {
 * 		result = append(result, tspath.SupportedDeclarationExtensions...)
 * 	}
 * 	if e&extensionsJson != 0 {
 * 		result = append(result, tspath.ExtensionJson)
 * 	}
 * 	return result
 * }
 */
export function extensions_Array(receiver: extensions): GoSlice<string> {
  const e = receiver;
  let result: GoSlice<string> = [];
  if ((e & extensionsTypeScript) !== 0) {
    result = GoAppend(result, ...extension.SupportedTSImplementationExtensions);
  }
  if ((e & extensionsJavaScript) !== 0) {
    result = GoAppend(result, ...extension.SupportedJSExtensionsFlat);
  }
  if ((e & extensionsDeclaration) !== 0) {
    result = GoAppend(result, ...extension.SupportedDeclarationExtensions);
  }
  if ((e & extensionsJson) !== 0) {
    result = GoAppend(result, extension.ExtensionJson);
  }
  return result;
}
