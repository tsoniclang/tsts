import { EndingChangeable$constant, EndingExtensionChangeable$constant, EndingFixed$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
import { NodeResolutionFeaturesAll$constant, NodeResolutionFeaturesBundlerDefault$constant, NodeResolutionFeaturesExports$constant, NodeResolutionFeaturesExportsPatternTrailers$constant, NodeResolutionFeaturesImports$constant, NodeResolutionFeaturesImportsPatternRoot$constant, NodeResolutionFeaturesNode16Default$constant, NodeResolutionFeaturesNodeNextDefault$constant, NodeResolutionFeaturesNone$constant, NodeResolutionFeaturesSelfName$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
import { Version as Version__from_core } from "../core/package.js";
import { MustParse as MustParse__from_semver, Version as Version__from_semver } from "../semver/package.js";
import { $state } from "./state.js";
export function $initialize(): void {
    EndingChangeable = EndingChangeable$constant();
    EndingExtensionChangeable = EndingExtensionChangeable$constant();
    EndingFixed = EndingFixed$constant();
    NodeResolutionFeaturesAll = NodeResolutionFeaturesAll$constant();
    NodeResolutionFeaturesBundlerDefault = NodeResolutionFeaturesBundlerDefault$constant();
    NodeResolutionFeaturesExports = NodeResolutionFeaturesExports$constant();
    NodeResolutionFeaturesExportsPatternTrailers = NodeResolutionFeaturesExportsPatternTrailers$constant();
    NodeResolutionFeaturesImports = NodeResolutionFeaturesImports$constant();
    NodeResolutionFeaturesImportsPatternRoot = NodeResolutionFeaturesImportsPatternRoot$constant();
    NodeResolutionFeaturesNode16Default = NodeResolutionFeaturesNode16Default$constant();
    NodeResolutionFeaturesNodeNextDefault = NodeResolutionFeaturesNodeNextDefault$constant();
    NodeResolutionFeaturesNone = NodeResolutionFeaturesNone$constant();
    NodeResolutionFeaturesSelfName = NodeResolutionFeaturesSelfName$constant();
    $state.typeScriptVersion = Version__from_semver.$zeroStorage();
    {
        $state.typeScriptVersion = Version__from_semver.$storageOf(MustParse__from_semver(Version__from_core()));
    }
}
export { ModeAwareCache } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/module/cache.js";
export { DiagAndArgs, DiagAndArgs$Storage, Ending, EndingChangeable$constant, EndingExtensionChangeable$constant, EndingFixed$constant, GetAutomaticTypeDirectiveNames, GetCompilerOptionsWithRedirect, GetConditions, MatchPatternOrExact, NewResolver, NewResolverWithOptions, ParsedPatterns, ResolveConfig, ResolvedEntrypoint, Resolver, ResolverOptions, TryParsePatterns } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
export { ModeAwareCacheKey, ModeAwareCacheKey$Storage, NodeResolutionFeatures, NodeResolutionFeaturesAll$constant, NodeResolutionFeaturesBundlerDefault$constant, NodeResolutionFeaturesExports$constant, NodeResolutionFeaturesExportsPatternTrailers$constant, NodeResolutionFeaturesImports$constant, NodeResolutionFeaturesImportsPatternRoot$constant, NodeResolutionFeaturesNode16Default$constant, NodeResolutionFeaturesNodeNextDefault$constant, NodeResolutionFeaturesNone$constant, NodeResolutionFeaturesSelfName$constant, PackageId, PackageId$Storage, ResolutionHost, ResolutionHost$contract, ResolutionHost$is, ResolvedModule, ResolvedProjectReference, ResolvedProjectReference$contract, ResolvedProjectReference$is, ResolvedTypeReferenceDirective, extensions_Array, extensions_String } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/module/types.js";
export { ComparePatternKeys, GetPackageNameFromTypesPackageName, GetResolutionDiagnostic, GetTypesPackageName, InferredTypesContainingFile$string, IsApplicableVersionedTypesKey, MangleScopedPackageName, ParseNodeModuleFromPath, ParsePackageName, TryGetJSExtensionForFile, UnmangleScopedPackageName } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/module/util.js";
export let EndingChangeable: ReturnType<typeof EndingChangeable$constant>;
export let EndingExtensionChangeable: ReturnType<typeof EndingExtensionChangeable$constant>;
export let EndingFixed: ReturnType<typeof EndingFixed$constant>;
export let NodeResolutionFeaturesAll: ReturnType<typeof NodeResolutionFeaturesAll$constant>;
export let NodeResolutionFeaturesBundlerDefault: ReturnType<typeof NodeResolutionFeaturesBundlerDefault$constant>;
export let NodeResolutionFeaturesExports: ReturnType<typeof NodeResolutionFeaturesExports$constant>;
export let NodeResolutionFeaturesExportsPatternTrailers: ReturnType<typeof NodeResolutionFeaturesExportsPatternTrailers$constant>;
export let NodeResolutionFeaturesImports: ReturnType<typeof NodeResolutionFeaturesImports$constant>;
export let NodeResolutionFeaturesImportsPatternRoot: ReturnType<typeof NodeResolutionFeaturesImportsPatternRoot$constant>;
export let NodeResolutionFeaturesNode16Default: ReturnType<typeof NodeResolutionFeaturesNode16Default$constant>;
export let NodeResolutionFeaturesNodeNextDefault: ReturnType<typeof NodeResolutionFeaturesNodeNextDefault$constant>;
export let NodeResolutionFeaturesNone: ReturnType<typeof NodeResolutionFeaturesNone$constant>;
export let NodeResolutionFeaturesSelfName: ReturnType<typeof NodeResolutionFeaturesSelfName$constant>;
