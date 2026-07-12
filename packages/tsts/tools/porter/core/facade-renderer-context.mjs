import { buildSemanticMethodSetSignatureIndex } from "./semantic-method-sets.mjs";
import { buildDeclaredTypeRhsIndex } from "../ts-extractor/constant-representation.mjs";

export function buildFacadeSemanticIndex(config, profile, evidence, snapshot) {
  return {
    goModule: config.goModulePath,
    core: profile.modules.core,
    compat: profile.modules.compat,
    bridge: profile.bridge,
    primKeyword: profile.primitives.keyword,
    primCore: profile.primitives.core,
    primCompat: profile.primitives.compat,
    constantRepresentations: {
      bigintBasics: new Set(profile.constantRepresentations?.bigintBasics ?? []),
      bigintNamedTypes: new Set(profile.constantRepresentations?.bigintNamedTypes ?? []),
    },
    declaredTypeRhsByProfile: buildDeclaredTypeRhsIndex(snapshot),
    declaredTypeContractsByProfile: evidence.declaredTypeContractsByProfile,
    externalTypeContracts: evidence.externalTypeContracts,
    dependencyTypeContractsByProfile: evidence.dependencyTypeContractsByProfile,
    dependencyPointerTerminalsByProfile: evidence.dependencyPointerTerminalsByProfile,
    externalFacadeArities: evidence.externalFacadeArities,
    namedTypeStorage: evidence.namedTypeStorage,
    rawInterfaceObjects: evidence.rawInterfaceObjects,
    storageCarrierByIdentity: evidence.storageCarrierByIdentity,
    knownStorageIdentities: evidence.knownStorageIdentities,
    methodSetSignatures: buildSemanticMethodSetSignatureIndex(snapshot),
  };
}
