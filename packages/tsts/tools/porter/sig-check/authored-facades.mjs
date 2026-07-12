import {
  createExternalFacadeContractRenderer,
  createExternalMethodBindingContractRenderer,
} from "../core/facade-artifacts.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { hashText } from "../core/runtime.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { buildExternalFacadeStorageCatalog } from "../core/external-facades.mjs";
import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { buildSemanticMethodSetSignatureIndex, materializeSemanticMethodSet } from "../core/semantic-method-sets.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import {
  extractIndexedFunctionExportDescriptor,
  extractIndexedTypeExportDescriptor,
  extractNamedDeclarationDescriptor,
  extractNamedFunctionDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { parseTypeScriptModule } from "../ts-extractor/module-index.mjs";
import { compareSignatures } from "./comparison.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";

export function collectAuthoredFacadeMismatches({
  api,
  canonicalIdentity,
  config,
  conventions,
  moduleIndex,
  profile,
  snapshot,
  valueEnvironments,
  ambientReferences = { accept: () => false },
}) {
  const facades = buildExternalFacadeStorageCatalog(config, snapshot);
  const renderContract = createExternalFacadeContractRenderer(config, snapshot, facades);
  const renderMethodContract = createExternalMethodBindingContractRenderer(config, snapshot, facades);
  const methodSetSignatures = buildSemanticMethodSetSignatureIndex(snapshot);
  const mismatches = [];
  const inventory = {
    constructors: [],
    methodBindings: [],
    privateStorageMembers: [],
    tsOnlyMembers: [],
    unselectedGoMembers: [],
  };
  const declarationOwners = new Map();
  const ownedDeclarationIds = new Set();
  const nominalStorageOwners = new Map();
  let checked = 0;
  for (const facade of [...facades.values()].filter((entry) => entry.storageStrategy === "authored")
    .sort((left, right) => compareText(left.objectId, right.objectId))) {
    checked++;
    const file = `${config.tsRoot.replace(/\/+$/, "")}/${facade.tsModule}`;
    let actual;
    let declarationId;
    try {
      const extracted = extractIndexedTypeExportDescriptor(api, moduleIndex, file, facade.tsName, valueEnvironments);
      actual = extracted.descriptor;
      declarationId = extracted.declarationId;
      requireAuthoredDeclarationOrigin(moduleIndex, config, declarationId, file, facade.tsName);
      claimDescriptorOwner(declarationOwners, ownedDeclarationIds, file, facade.tsName, actual, {
        file,
        identity: facade.objectId,
        kind: "type",
      });
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    const storageActual = actual;
    const configuredTsHash = facade.runtimeAdaptation?.tsDeclarationHash;
    if (configuredTsHash !== undefined) {
      const actualTsHash = externalTypeScriptDeclarationHash(storageActual);
      if (actualTsHash !== configuredTsHash) {
        mismatches.push({
          id: `external-facade:${facade.objectId}`,
          file,
          kind: "authored-facade-typescript-adaptation-drift",
          detail: `authored facade '${facade.objectId}' TypeScript declaration snapshot drifted: config=${configuredTsHash} current=${actualTsHash}`,
        });
        continue;
      }
    }
    const publicActual = publicFacadeDeclaration(storageActual);
    let directional;
    try {
      directional = collectDirectionalMemberEvidence(facade, file, storageActual, methodSetSignatures);
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    mismatches.push(...directional.mismatches);
    inventory.constructors.push(...directional.inventory.constructors);
    inventory.privateStorageMembers.push(...directional.inventory.privateStorageMembers);
    inventory.tsOnlyMembers.push(...directional.inventory.tsOnlyMembers);
    inventory.unselectedGoMembers.push(...directional.inventory.unselectedGoMembers);
    if (directional.nominalStorageIdentity !== undefined) {
      const previous = nominalStorageOwners.get(directional.nominalStorageIdentity);
      if (previous !== undefined && previous !== facade.objectId) {
        mismatches.push({
          id: `external-facade:${facade.objectId}`,
          file,
          kind: "authored-facade-nominal-identity-collision",
          detail: `authored facades '${previous}' and '${facade.objectId}' share one TypeScript nominal storage identity`,
        });
      } else {
        nominalStorageOwners.set(directional.nominalStorageIdentity, facade.objectId);
      }
    }
    const expectedRows = [];
    try {
      for (const variant of facade.variants) {
        for (const profileIndex of variant.profiles) {
          const source = renderContract(facade, variant.declaration, profileIndex);
          const module = parseTypeScriptModule(api, file, source);
          const expected = extractNamedDeclarationDescriptor(api, module, facade.tsName);
          expectedRows.push({
            descriptor: projectAuthoredFacadeContract(facade, expected, publicActual, false),
            profile: profileIndex,
          });
        }
      }
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    const expectedGroups = groupExpectedContracts(expectedRows);
    if (expectedGroups.length > 1) {
      mismatches.push({
        id: `external-facade:${facade.objectId}`,
        file,
        kind: "authored-facade-profile-drift",
        detail: `selected authored facade contract changes across semantic profiles: ${expectedGroups
          .map((row) => `[${row.profiles.join(",")}]`).join(" versus ")}`,
      });
      continue;
    }
    const expected = expectedGroups[0]?.descriptor;
    if (expected === undefined) {
      mismatches.push(contractError(facade, file, new Error("no active semantic profile produced an authored facade contract")));
      continue;
    }
    const actualProjection = projectAuthoredFacadeContract(facade, publicActual, expected, true);
    try {
      for (const mismatch of compareSignatures(
        expected,
        actualProjection,
        null,
        canonicalIdentity,
        conventions,
        ambientReferences,
      )) {
        mismatches.push({
          id: `external-facade:${facade.objectId}`,
          file,
          ...mismatch,
          detail: `authored facade '${facade.objectId}': ${mismatch.detail}`,
        });
      }
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
    }
  }
  for (const facade of [...facades.values()].filter((entry) => entry.storageStrategy === "authored")
    .sort((left, right) => compareText(left.objectId, right.objectId))) {
    const file = `${config.tsRoot.replace(/\/+$/, "")}/${facade.tsModule}`;
    for (const binding of facade.methodBindings) {
      inventory.methodBindings.push({
        file,
        methodId: binding.methodId,
        objectId: facade.objectId,
        receiverName: binding.receiverName,
        tsName: binding.tsName,
      });
      let actual;
      try {
        const extracted = extractIndexedFunctionExportDescriptor(api, moduleIndex, file, binding.tsName, valueEnvironments);
        requireAuthoredDeclarationOrigin(moduleIndex, config, extracted.declarationId, file, binding.tsName);
        actual = extracted.descriptor;
        claimDescriptorOwner(declarationOwners, ownedDeclarationIds, file, binding.tsName, actual, {
          file,
          identity: binding.methodId,
          kind: "method",
        });
      } catch (error) {
        mismatches.push(contractError(facade, file, error, binding.methodId));
        continue;
      }
      const expectedRows = [];
      try {
        for (const variant of facade.variants) {
          for (const profileIndex of variant.profiles) {
            const source = renderMethodContract(facade, variant.declaration, binding, profileIndex);
            const module = parseTypeScriptModule(api, file, source);
            expectedRows.push({
              descriptor: extractNamedFunctionDescriptor(api, module, binding.tsName),
              profile: profileIndex,
            });
          }
        }
      } catch (error) {
        mismatches.push(contractError(facade, file, error, binding.methodId));
        continue;
      }
      const groups = groupExpectedContracts(expectedRows);
      if (groups.length !== 1) {
        mismatches.push({
          id: `external-method:${binding.methodId}`,
          file,
          kind: "authored-facade-profile-drift",
          detail: `bound external Go method '${binding.methodId}' changes across semantic profiles`,
        });
        continue;
      }
      try {
        for (const mismatch of compareSignatures(
          groups[0].descriptor,
          actual,
          null,
          canonicalIdentity,
          conventions,
          ambientReferences,
        )) {
          mismatches.push({
            id: `external-method:${binding.methodId}`,
            file,
            ...mismatch,
            detail: `bound external Go method '${binding.methodId}': ${mismatch.detail}`,
          });
        }
      } catch (error) {
        mismatches.push(contractError(facade, file, error, binding.methodId));
      }
    }
  }
  inventory.methodBindings.sort((left, right) => compareText(left.methodId, right.methodId));
  return { checked, inventory, mismatches, ownedDeclarationIds };
}

function collectDirectionalMemberEvidence(facade, file, storageActual, methodSetSignatures) {
  const nominalStorageIdentity = validateAuthoredRuntimeRepresentation(facade, storageActual);
  const expectedMembers = goFacadePublicMembers(facade, methodSetSignatures);
  const actualMembers = new Set(["class", "interface"]).has(storageActual.kind)
    ? (storageActual.members ?? []).filter(isSourceVisibleFacadeMember) : [];
  const expectedNames = new Set(expectedMembers.map((member) => member.name));
  const actualNames = new Set(actualMembers.map((member) => member.name));
  const unselectedGoMembers = expectedMembers.filter((member) => !actualNames.has(member.name))
    .map((member) => memberEvidence(facade, file, member));
  const tsOnlyMembers = actualMembers.filter((member) => !expectedNames.has(member.name))
    .map((member) => memberEvidence(facade, file, member));
  const constructors = actualMembers.filter((member) => member.kind === "constructor")
    .map((member) => memberEvidence(facade, file, member));
  const privateStorageMembers = (storageActual.members ?? [])
    .filter((member) => member.kind !== "constructor" && !isPublicFacadeMember(member))
    .map((member) => memberEvidence(facade, file, member));
  const mismatches = [];
  const policies = new Map((facade.runtimeAdaptation?.extraMembers ?? []).map((member) => [`${member.kind}\0${member.name}`, member]));
  for (const member of tsOnlyMembers) {
    const key = `${member.memberKind}\0${member.name}`;
    const policy = policies.get(key);
    if (policy === undefined) {
      mismatches.push({
        id: `external-facade:${facade.objectId}`,
        file,
        kind: "authored-facade-ts-member-extra",
        detail: `authored facade '${facade.objectId}' exposes TypeScript ${member.memberKind} '${member.name}' with no member-specific adaptation`,
      });
      continue;
    }
    policies.delete(key);
    if (policy.declarationHash !== member.declarationHash) {
      mismatches.push({
        id: `external-facade:${facade.objectId}`,
        file,
        kind: "authored-facade-extra-member-drift",
        detail: `reviewed extra ${member.memberKind} '${member.name}' drifted: config=${policy.declarationHash} current=${member.declarationHash}`,
      });
    }
  }
  for (const policy of policies.values()) {
    mismatches.push({
      id: `external-facade:${facade.objectId}`,
      file,
      kind: "unused-authored-facade-extra-member",
      detail: `reviewed extra ${policy.kind} '${policy.name}' has no exact TypeScript member`,
    });
  }
  if (constructors.length > 0 && facade.runtimeAdaptation?.representation !== "class") {
    mismatches.push(...constructors.map(() => ({
      id: `external-facade:${facade.objectId}`,
      file,
      kind: "authored-facade-constructor-without-class-storage",
      detail: `authored facade '${facade.objectId}' declares a constructor without reviewed class runtime storage`,
    })));
  }
  return {
    inventory: { constructors, privateStorageMembers, tsOnlyMembers, unselectedGoMembers },
    mismatches,
    nominalStorageIdentity,
  };
}

function validateAuthoredRuntimeRepresentation(facade, descriptor) {
  const adaptation = facade.runtimeAdaptation;
  if (adaptation?.representation === "class") {
    if (descriptor.kind !== "class") throw new Error(`reviewed class facade '${facade.objectId}' must be one TypeScript class declaration`);
    const hasNominalMember = descriptor.members.some((member) =>
      member.name?.startsWith("private:") || member.modifiers?.includes("private") || member.modifiers?.includes("protected"));
    const actualNominality = hasNominalMember ? "preserved" : "erased";
    if (adaptation.nominality !== actualNominality) {
      throw new Error(`reviewed class facade '${facade.objectId}' declares nominality '${adaptation.nominality}' but its exact class storage is '${actualNominality}'`);
    }
    return hasNominalMember ? `${facade.tsModule}::${facade.tsName}` : undefined;
  }
  if (adaptation?.representation !== "scalar") return undefined;
  if (descriptor.kind !== "alias") throw new Error(`reviewed scalar facade '${facade.objectId}' must be one TypeScript type alias`);
  const scalar = adaptation.scalarStorage;
  if (adaptation.nominality === "erased") {
    if (descriptor.type?.t !== "kw" || descriptor.type.kw !== scalar) {
      throw new Error(`reviewed scalar facade '${facade.objectId}' with erased nominality must be exactly '${scalar}'`);
    }
    return undefined;
  }
  if (adaptation.nominality !== "preserved" || descriptor.type?.t !== "intersect") {
    throw new Error(`reviewed scalar facade '${facade.objectId}' must preserve nominality through one branded scalar intersection`);
  }
  const scalarMembers = descriptor.type.members.filter((member) => member?.t === "kw" && member.kw === scalar);
  const brandMembers = descriptor.type.members.filter((member) => !(member?.t === "kw" && member.kw === scalar));
  if (scalarMembers.length !== 1 || brandMembers.length !== 1 || !isExactNominalBrandObject(brandMembers[0])) {
    throw new Error(`reviewed scalar facade '${facade.objectId}' must contain exactly one '${scalar}' storage term and one exact readonly nominal brand object`);
  }
  return canonicalSchemaValue(brandMembers[0]);
}

function isExactNominalBrandObject(type) {
  if (type?.t !== "object" || !Array.isArray(type.members) || type.members.length === 0) return false;
  return type.members.every((member) => member.kind === "property" && member.optional !== true &&
    (member.readonly === true || member.modifiers?.includes("readonly")) && isNominalBrandValue(member.type));
}

function isNominalBrandValue(type) {
  return type?.t === "kw" && type.kw === "never" ||
    type?.t === "literal" && new Set(["bigint", "boolean", "number", "string"]).has(type.kind);
}

function goFacadePublicMembers(facade, methodSetSignatures) {
  const members = new Map();
  const boundMethods = new Set(facade.methodBindings.map((binding) => binding.methodId));
  for (const variant of facade.variants) {
    const declaration = variant.declaration;
    for (const field of declaration.rhs.struct?.fields ?? []) {
      if (field.variable?.exported) addGoMember(members, field.variable.name, "property", facade.objectId);
    }
    const methods = materializeSemanticMethodSet(declaration, "value", methodSetSignatures);
    for (const method of methods) {
      if (method.exported && !boundMethods.has(method.methodId)) addGoMember(members, method.name, "method", facade.objectId);
    }
  }
  return [...members.values()].sort((left, right) => compareText(left.name, right.name) || compareText(left.kind, right.kind));
}

function addGoMember(members, name, kind, objectId) {
  const existing = members.get(name);
  if (existing !== undefined && existing.kind !== kind) {
    throw new Error(`external Go facade '${objectId}' changes member '${name}' from ${existing.kind} to ${kind} across semantic profiles`);
  }
  members.set(name, { kind, name, modifiers: [] });
}

function publicFacadeDeclaration(descriptor) {
  if (!new Set(["class", "interface"]).has(descriptor.kind)) return descriptor;
  const members = (descriptor.members ?? []).filter(isPublicFacadeMember);
  if (descriptor.kind === "class") return { ...descriptor, members };
  return {
    ...descriptor,
    members,
    fragments: (descriptor.fragments ?? []).map((fragment) => ({
      ...fragment,
      members: (fragment.members ?? []).filter(isPublicFacadeMember),
    })),
  };
}

function isPublicFacadeMember(member) {
  if (member.kind === "constructor" || String(member.name).startsWith("private:")) return false;
  const modifiers = new Set(member.modifiers ?? []);
  return !modifiers.has("private") && !modifiers.has("protected");
}

function isSourceVisibleFacadeMember(member) {
  if (String(member.name).startsWith("private:")) return false;
  return !(member.modifiers ?? []).includes("private");
}

function memberEvidence(facade, file, member) {
  return {
    objectId: facade.objectId,
    file,
    memberKind: member.kind,
    name: member.name,
    declarationHash: hashText(canonicalSchemaValue(member)),
  };
}

function projectAuthoredFacadeContract(facade, descriptor, counterpart, validateRuntimeStorage) {
  void validateRuntimeStorage;
  if (facade.runtimeAdaptation?.representation === "scalar") return counterpart;
  if (!new Set(["class", "interface"]).has(descriptor.kind) || descriptor.kind !== counterpart.kind) return descriptor;
  const expectedNames = new Set((counterpart.members ?? []).map((member) => member.name));
  const members = (descriptor.members ?? []).filter((member) => expectedNames.has(member.name) || isPorterContractMarker(member));
  if (descriptor.kind === "class") return { ...descriptor, members };
  return {
    ...descriptor,
    members,
    fragments: (descriptor.fragments ?? []).map((fragment) => ({
      ...fragment,
      members: (fragment.members ?? []).filter((member) => expectedNames.has(member.name) || isPorterContractMarker(member)),
    })),
  };
}

function isPorterContractMarker(member) {
  return member.name === "__tsgoEmpty" || String(member.name).startsWith("__goUnexported");
}

function groupExpectedContracts(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = JSON.stringify(row.descriptor);
    const group = groups.get(key) ?? { descriptor: row.descriptor, profiles: [] };
    group.profiles.push(row.profile);
    groups.set(key, group);
  }
  return [...groups.values()]
    .map((row) => ({ ...row, profiles: row.profiles.sort((left, right) => left - right) }))
    .sort((left, right) => compareText(JSON.stringify(left.descriptor), JSON.stringify(right.descriptor)));
}

function claimDeclarationOwner(owners, declarationId, owner) {
  const previous = owners.get(declarationId);
  if (previous !== undefined && (previous.identity !== owner.identity || previous.kind !== owner.kind)) {
    throw new Error(`${previous.kind} '${previous.identity}' and ${owner.kind} '${owner.identity}' share authored declaration storage '${declarationId}'`);
  }
  owners.set(declarationId, owner);
}

function claimDescriptorOwner(owners, ownedDeclarationIds, moduleId, name, descriptor, owner) {
  const kind = descriptorOwnershipKind(descriptor);
  for (const declarationId of declarationOwnershipIds(moduleId, name, kind)) {
    claimDeclarationOwner(owners, declarationId, owner);
    ownedDeclarationIds.add(declarationId);
  }
}

function requireAuthoredDeclarationOrigin(moduleIndex, config, declarationId, expectedModuleId, expectedName) {
  const separator = declarationId.lastIndexOf("::");
  if (separator < 0) throw new Error(`authored declaration '${declarationId}' has no exact module identity`);
  const moduleId = declarationId.slice(0, separator);
  const declarationName = declarationId.slice(separator + 2);
  if (moduleId !== expectedModuleId || declarationName !== expectedName) {
    throw new Error(`authored declaration '${declarationId}' must be stored directly as '${expectedModuleId}::${expectedName}'`);
  }
  const module = moduleIndex.modules.get(moduleId);
  if (module === undefined) throw new Error(`authored declaration '${declarationId}' has no indexed source module`);
  const prefix = `${config.tsRoot.replace(/\/+$/, "")}/`;
  if (!moduleId.startsWith(prefix)) throw new Error(`authored declaration '${declarationId}' is outside configured tsRoot`);
  const registration = inspectGeneratedArtifactRegistration(moduleId.slice(prefix.length), module.text);
  if (registration.error !== undefined) throw new Error(`authored declaration '${declarationId}' has invalid generated-artifact evidence: ${registration.error}`);
  if (registration.metadata !== undefined) throw new Error(`authored declaration '${declarationId}' resolves into Porter-generated storage`);
}

function contractError(facade, file, error, methodId = undefined) {
  return {
    id: methodId === undefined ? `external-facade:${facade.objectId}` : `external-method:${methodId}`,
    file,
    kind: "authored-facade-contract-error",
    detail: `authored facade contract failed closed: ${error instanceof Error ? error.message : String(error)}`,
  };
}
