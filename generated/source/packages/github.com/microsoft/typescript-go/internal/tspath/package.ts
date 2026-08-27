import type { gostring } from "@gotots/runtime/scalars.js";
import { ExtensionCjs$string, ExtensionCts$string, ExtensionDcts$string, ExtensionDmts$string, ExtensionDts$string, ExtensionJs$string, ExtensionJson$string, ExtensionJsx$string, ExtensionMjs$string, ExtensionMts$string, ExtensionTs$string, ExtensionTsx$string } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/extension.js";
import { Concat$SliceOf_SliceOf_string$SliceOf_string, Concat$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Concat.js";
import { $state } from "./state.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.AllSupportedExtensions = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    $state.AllSupportedExtensionsWithJson = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    $state.ExtensionsNotSupportingExtensionlessResolution = RuntimeSlice.nil<gostring>();
    $state.SupportedDeclarationExtensions = RuntimeSlice.nil<gostring>();
    $state.SupportedJSExtensions = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    $state.SupportedJSExtensionsFlat = RuntimeSlice.nil<gostring>();
    $state.SupportedTSExtensions = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    $state.SupportedTSExtensionsFlat = RuntimeSlice.nil<gostring>();
    $state.SupportedTSExtensionsWithJson = RuntimeSlice.nil<RuntimeSlice<gostring>>();
    $state.SupportedTSExtensionsWithJsonFlat = RuntimeSlice.nil<gostring>();
    $state.SupportedTSImplementationExtensions = RuntimeSlice.nil<gostring>();
    $state.extensionsToRemove = RuntimeSlice.nil<gostring>();
    $state.ignoredPaths = RuntimeSlice.nil<gostring>();
    $state.supportedTSExtensionsForExtractExtension = RuntimeSlice.nil<gostring>();
    {
        $state.SupportedDeclarationExtensions = RuntimeSlice.literal<gostring>([ExtensionDts$string, ExtensionDcts$string, ExtensionDmts$string]);
    }
    {
        $state.SupportedTSImplementationExtensions = RuntimeSlice.literal<gostring>([ExtensionTs$string, ExtensionTsx$string, ExtensionMts$string, ExtensionCts$string]);
    }
    {
        $state.supportedTSExtensionsForExtractExtension = RuntimeSlice.literal<gostring>([ExtensionDts$string, ExtensionDcts$string, ExtensionDmts$string, ExtensionTs$string, ExtensionTsx$string, ExtensionMts$string, ExtensionCts$string]);
    }
    {
        $state.AllSupportedExtensions = RuntimeSlice.literal<RuntimeSlice<gostring>>([RuntimeSlice.literal<gostring>([ExtensionTs$string, ExtensionTsx$string, ExtensionDts$string, ExtensionJs$string, ExtensionJsx$string]), RuntimeSlice.literal<gostring>([ExtensionCts$string, ExtensionDcts$string, ExtensionCjs$string]), RuntimeSlice.literal<gostring>([ExtensionMts$string, ExtensionDmts$string, ExtensionMjs$string])]);
    }
    {
        $state.SupportedTSExtensions = RuntimeSlice.literal<RuntimeSlice<gostring>>([RuntimeSlice.literal<gostring>([ExtensionTs$string, ExtensionTsx$string, ExtensionDts$string]), RuntimeSlice.literal<gostring>([ExtensionCts$string, ExtensionDcts$string]), RuntimeSlice.literal<gostring>([ExtensionMts$string, ExtensionDmts$string])]);
    }
    {
        $state.SupportedTSExtensionsFlat = RuntimeSlice.literal<gostring>([ExtensionTs$string, ExtensionTsx$string, ExtensionDts$string, ExtensionCts$string, ExtensionDcts$string, ExtensionMts$string, ExtensionDmts$string]);
    }
    {
        $state.SupportedJSExtensions = RuntimeSlice.literal<RuntimeSlice<gostring>>([RuntimeSlice.literal<gostring>([ExtensionJs$string, ExtensionJsx$string]), RuntimeSlice.literal<gostring>([ExtensionMjs$string]), RuntimeSlice.literal<gostring>([ExtensionCjs$string])]);
    }
    {
        $state.SupportedJSExtensionsFlat = RuntimeSlice.literal<gostring>([ExtensionJs$string, ExtensionJsx$string, ExtensionMjs$string, ExtensionCjs$string]);
    }
    {
        $state.AllSupportedExtensionsWithJson = Concat$SliceOf_SliceOf_string$SliceOf_string(RuntimeSlice.literal<RuntimeSlice<RuntimeSlice<gostring>>>([$state.AllSupportedExtensions, RuntimeSlice.literal<RuntimeSlice<gostring>>([RuntimeSlice.literal<gostring>([ExtensionJson$string])])]));
    }
    {
        $state.SupportedTSExtensionsWithJson = Concat$SliceOf_SliceOf_string$SliceOf_string(RuntimeSlice.literal<RuntimeSlice<RuntimeSlice<gostring>>>([$state.SupportedTSExtensions, RuntimeSlice.literal<RuntimeSlice<gostring>>([RuntimeSlice.literal<gostring>([ExtensionJson$string])])]));
    }
    {
        $state.SupportedTSExtensionsWithJsonFlat = Concat$SliceOf_string$string(RuntimeSlice.literal<RuntimeSlice<gostring>>([$state.SupportedTSExtensionsFlat, RuntimeSlice.literal<gostring>([ExtensionJson$string])]));
    }
    {
        $state.ExtensionsNotSupportingExtensionlessResolution = RuntimeSlice.literal<gostring>([ExtensionMts$string, ExtensionDmts$string, ExtensionMjs$string, ExtensionCts$string, ExtensionDcts$string, ExtensionCjs$string]);
    }
    {
        $state.extensionsToRemove = RuntimeSlice.literal<gostring>([ExtensionDts$string, ExtensionDmts$string, ExtensionDcts$string, ExtensionMjs$string, ExtensionMts$string, ExtensionCjs$string, ExtensionCts$string, ExtensionTs$string, ExtensionJs$string, ExtensionTsx$string, ExtensionJsx$string, ExtensionJson$string]);
    }
    {
        $state.ignoredPaths = RuntimeSlice.literal<gostring>(["/node_modules/.", "/.git", ".#"]);
    }
}
export { ChangeAnyExtension, ChangeExtension, ChangeFullExtension, ExtensionCjs$string, ExtensionCts$string, ExtensionDcts$string, ExtensionDmts$string, ExtensionDts$string, ExtensionIsOneOf, ExtensionIsTs, ExtensionJs$string, ExtensionJson$string, ExtensionJsx$string, ExtensionMjs$string, ExtensionMts$string, ExtensionTs$string, ExtensionTsBuildInfo$string, ExtensionTsx$string, FileExtensionIsOneOf, GetDeclarationEmitExtensionForPath, GetDeclarationFileExtension, GetPossibleOriginalInputExtensionForExtension, HasImplementationTSFileExtension, HasJSFileExtension, HasTSFileExtension, IsDeclarationFileName, RemoveExtension, RemoveFileExtension, TryExtractTSExtension, TryGetExtensionFromPath } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/extension.js";
export { ContainsIgnoredPath } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/ignoredpaths.js";
export { CombinePaths, CompareNumberOfDirectorySeparators, ComparePaths, ComparePathsOptions, ContainsPath, ConvertToRelativePath, DirectorySeparator$uint8, EnsurePathIsNonModuleName, EnsureTrailingDirectorySeparator, FileExtensionIs, GetAnyExtensionFromPath, GetBaseFileName, GetCanonicalFileName, GetCommonParents, GetDirectoryPath, GetEncodedRootLength, GetNormalizedAbsolutePath, GetNormalizedAbsolutePathWithoutRoot, GetNormalizedPathComponents, GetPathComponents, GetPathComponentsRelativeTo, GetPathFromPathComponents, GetRelativePathFromDirectory, GetRelativePathFromFile, GetRelativePathToDirectoryOrUrl, GetRootLength, HasExtension, HasTrailingDirectorySeparator, IsDynamicFileName, IsExternalModuleNameRelative, IsRootedDiskPath, IsUrl, IsVolumeCharacter, NormalizePath, NormalizeSlashes, Path, PathIsAbsolute, PathIsRelative, RemoveTrailingDirectorySeparator, RemoveTrailingDirectorySeparators, ResolvePath, SplitVolumePath, StartsWithDirectory, ToFileNameLowerCase, ToPath } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export { $state };
