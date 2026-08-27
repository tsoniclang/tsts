import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $PackageState {
    declare AllSupportedExtensions: RuntimeSlice<RuntimeSlice<gostring>>;
    declare AllSupportedExtensionsWithJson: RuntimeSlice<RuntimeSlice<gostring>>;
    declare ExtensionsNotSupportingExtensionlessResolution: RuntimeSlice<gostring>;
    declare SupportedDeclarationExtensions: RuntimeSlice<gostring>;
    declare SupportedJSExtensions: RuntimeSlice<RuntimeSlice<gostring>>;
    declare SupportedJSExtensionsFlat: RuntimeSlice<gostring>;
    declare SupportedTSExtensions: RuntimeSlice<RuntimeSlice<gostring>>;
    declare SupportedTSExtensionsFlat: RuntimeSlice<gostring>;
    declare SupportedTSExtensionsWithJson: RuntimeSlice<RuntimeSlice<gostring>>;
    declare SupportedTSExtensionsWithJsonFlat: RuntimeSlice<gostring>;
    declare SupportedTSImplementationExtensions: RuntimeSlice<gostring>;
    declare extensionsToRemove: RuntimeSlice<gostring>;
    declare ignoredPaths: RuntimeSlice<gostring>;
    declare supportedTSExtensionsForExtractExtension: RuntimeSlice<gostring>;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
