import {
  createExternalFacadeContractRenderer,
  createExternalMethodBindingContractRenderer,
} from "../core/facade-artifacts.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { hashText } from "../core/runtime.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { requireFinalizedExternalFacadeStorageCatalog } from "../core/external-facades/catalog.mjs";
import { externalTypeScriptDeclarationHash } from "../core/external-facade-runtime-adaptation.mjs";
import { buildSemanticMethodSetSignatureIndex, materializeSemanticMethodSet } from "../core/semantic-method-sets.mjs";
import {
  isPorterContractMarker,
  isPublicFacadeMember,
  isSourceVisibleFacadeMember,
  publicFacadeDeclaration,
  requireAuthoredDeclarationOrigin,
} from "../core/authored-facade-selections.mjs";
import {
  extractIndexedFunctionExportDescriptor,
  extractIndexedTypeExportDescriptor,
  extractNamedDeclarationDescriptor,
  extractNamedFunctionDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { parseTypeScriptModule } from "../ts-extractor/module-index.mjs";
import { createCanonicalDeclarationResolver } from "../ts-extractor/module-resolution.mjs";
import { typesEqual } from "../ts-extractor/ast-signatures.mjs";
import { compareSignatures } from "./comparison.mjs";
import { declarationOwnershipIds, descriptorOwnershipKind } from "./declaration-ownership.mjs";
import {
  mergeExternalEvidence,
  normalizeExternalDeclarationDescriptor,
  normalizeExternalFunctionDescriptor,
} from "./external-evidence-projection.mjs";

export function collectAuthoredFacadeMismatches({
  api,
  canonicalIdentity,
  config,
  conventions,
  moduleIndex,
  profile,
  snapshot,
  valueEnvironments,
  facades,
  ambientReferences = { accept: () => false },
}) {
  const catalog = requireFinalizedExternalFacadeStorageCatalog(facades, config, snapshot);
  const auditFacades = catalog.auditFacades(config, snapshot);
  const renderContract = createExternalFacadeContractRenderer(config, snapshot, catalog);
  const renderMethodContract = createExternalMethodBindingContractRenderer(config, snapshot, catalog);
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
  const routeCanonicalIdentity = createCanonicalDeclarationResolver(moduleIndex);
  let checked = 0;
  for (const facade of [...auditFacades.values()].filter((entry) => entry.storageStrategy === "authored")
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
    const authoredSurface = catalog.authoredSurface(config, snapshot, facade.objectId);
    const actualTsHash = externalTypeScriptDeclarationHash(storageActual);
    if (authoredSurface === undefined || authoredSurface.declarationId !== declarationId ||
        authoredSurface.declarationHash !== actualTsHash) {
      mismatches.push({
        id: `external-facade:${facade.objectId}`,
        file,
        kind: "authored-facade-surface-drift",
        detail: `authored facade '${facade.objectId}' no longer matches the declaration surface used to finalize its dependency closure`,
      });
      continue;
    }
    const configuredTsHash = facade.runtimeAdaptation?.tsDeclarationHash;
    if (configuredTsHash !== undefined) {
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
      directional = collectDirectionalMemberEvidence(facade, file, storageActual, methodSetSignatures, {
        api,
        canonicalIdentity,
        moduleIndex,
        routeCanonicalIdentity,
        valueEnvironments,
      });
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
          const contract = renderContract(facade, variant.declaration, profileIndex);
          const module = parseTypeScriptModule(api, file, contract.source);
          const expected = extractNamedDeclarationDescriptor(api, module, facade.tsName);
          expectedRows.push({
            descriptor: projectAuthoredFacadeContract(facade, expected, publicActual, false),
            evidence: contract.evidence,
            profile: profileIndex,
          });
        }
      }
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    let evidence;
    try {
      evidence = mergeExternalEvidence(
        expectedRows.map((row) => ({ evidence: row.evidence, profiles: [row.profile] })),
        `authored facade '${facade.objectId}' evidence`,
      );
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    const expectedGroups = groupExpectedContracts(expectedRows.map((row) => ({
      ...row,
      descriptor: normalizeExternalDeclarationDescriptor(row.descriptor, evidence),
    })));
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
    try {
      const actualProjection = normalizeExternalDeclarationDescriptor(
        projectAuthoredFacadeContract(facade, publicActual, expected, true),
        evidence,
      );
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
  for (const facade of [...auditFacades.values()].filter((entry) => entry.storageStrategy === "authored")
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
            const contract = renderMethodContract(facade, variant.declaration, binding, profileIndex);
            const module = parseTypeScriptModule(api, file, contract.source);
            expectedRows.push({
              descriptor: extractNamedFunctionDescriptor(api, module, binding.tsName),
              evidence: contract.signature,
              profile: profileIndex,
            });
          }
        }
      } catch (error) {
        mismatches.push(contractError(facade, file, error, binding.methodId));
        continue;
      }
      let evidence;
      try {
        evidence = mergeExternalEvidence(
          expectedRows.map((row) => ({ evidence: row.evidence, profiles: [row.profile] })),
          `bound external Go method '${binding.methodId}' evidence`,
        );
      } catch (error) {
        mismatches.push(contractError(facade, file, error, binding.methodId));
        continue;
      }
      const groups = groupExpectedContracts(expectedRows.map((row) => ({
        ...row,
        descriptor: normalizeExternalFunctionDescriptor(row.descriptor, [evidence], 1),
      })));
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
        const expected = groups[0].descriptor;
        actual = normalizeExternalFunctionDescriptor(
          actual,
          [evidence],
          1,
        );
        const expectedReceiver = expected.signatures?.[0]?.params?.[0]?.type;
        const actualReceiver = actual.signatures?.[0]?.params?.[0]?.type;
        if (expectedReceiver !== undefined && actualReceiver !== undefined &&
            !typesEqual(expectedReceiver, actualReceiver, routeCanonicalIdentity)) {
          mismatches.push({
            id: `external-method:${binding.methodId}`,
            file,
            kind: "authored-facade-receiver-storage",
            detail: `bound external Go method '${binding.methodId}' receiver does not use its exact authored facade storage route`,
          });
        }
        for (const mismatch of compareSignatures(
          expected,
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

function collectDirectionalMemberEvidence(facade, file, storageActual, methodSetSignatures, descriptorContext) {
  const nominalStorageIdentity = validateAuthoredRuntimeRepresentation(facade, storageActual, descriptorContext);
  const expectedMembers = goFacadePublicMembers(facade, methodSetSignatures);
  const actualMembers = authoredDescriptorMembers(storageActual).filter(isSourceVisibleFacadeMember);
  const expectedKeys = new Set(expectedMembers.map(directionalMemberKey));
  const actualKeys = new Set(actualMembers.map(directionalMemberKey));
  const unselectedGoMembers = expectedMembers.filter((member) => !actualKeys.has(directionalMemberKey(member)))
    .map((member) => memberEvidence(facade, file, member));
  const tsOnlyMembers = actualMembers.filter((member) => !expectedKeys.has(directionalMemberKey(member)))
    .map((member) => memberEvidence(facade, file, member));
  const constructors = authoredDescriptorMembers(storageActual).filter((member) => member.kind === "constructor")
    .map((member) => memberEvidence(facade, file, member));
  const privateStorageMembers = authoredDescriptorMembers(storageActual)
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

function validateAuthoredRuntimeRepresentation(facade, descriptor, descriptorContext) {
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
  validateScalarCarrier(adaptation, descriptorContext);
  if (adaptation.nominality === "erased") {
    if (!isScalarStorageTerm(descriptor.type, adaptation, descriptorContext.routeCanonicalIdentity)) {
      throw new Error(`reviewed scalar facade '${facade.objectId}' with erased nominality must use its exact '${scalar}' storage carrier`);
    }
    return undefined;
  }
  if (adaptation.nominality !== "preserved" || descriptor.type?.t !== "intersect") {
    throw new Error(`reviewed scalar facade '${facade.objectId}' must preserve nominality through one branded scalar intersection`);
  }
  const scalarMembers = descriptor.type.members.filter((member) => isScalarStorageTerm(member, adaptation, descriptorContext.routeCanonicalIdentity));
  const brandMembers = descriptor.type.members.filter((member) => !isScalarStorageTerm(member, adaptation, descriptorContext.routeCanonicalIdentity));
  if (scalarMembers.length !== 1 || brandMembers.length !== 1 || !isExactNominalBrandObject(brandMembers[0])) {
    throw new Error(`reviewed scalar facade '${facade.objectId}' must contain exactly one '${scalar}' storage term and one exact readonly nominal brand object`);
  }
  return canonicalSchemaValue(brandMembers[0]);
}

function validateScalarCarrier(adaptation, { api, moduleIndex, valueEnvironments }) {
  const identity = adaptation.scalarCarrierIdentity;
  if (identity === undefined) return;
  const separator = identity.lastIndexOf("::");
  const moduleId = identity.slice(0, separator);
  const name = identity.slice(separator + 2);
  const extracted = extractIndexedTypeExportDescriptor(api, moduleIndex, moduleId, name, valueEnvironments);
  if (extracted.declarationId !== identity) {
    throw new Error(`reviewed scalar carrier '${identity}' must be stored directly at its configured declaration identity`);
  }
  const descriptor = extracted.descriptor;
  if (descriptor.kind !== "alias" || (descriptor.typeParams ?? []).length !== 0 ||
      descriptor.type?.t !== "kw" || descriptor.type.kw !== adaptation.scalarStorage) {
    throw new Error(`reviewed scalar carrier '${identity}' must be one exact '${adaptation.scalarStorage}' alias`);
  }
}

function isScalarStorageTerm(type, adaptation, routeCanonicalIdentity) {
  if (adaptation.scalarCarrierIdentity === undefined) return type?.t === "kw" && type.kw === adaptation.scalarStorage;
  return type?.t === "ref" && (type.args ?? []).length === 0 &&
    routeCanonicalIdentity(type.id, "type") === adaptation.scalarCarrierIdentity;
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
    const methodMode = facade.runtimeAdaptation?.pointer === "aggregate" ? "pointer" : "value";
    const methods = materializeSemanticMethodSet(declaration, methodMode, methodSetSignatures);
    for (const method of methods) {
      if (method.exported && !boundMethods.has(method.methodId)) addGoMember(members, method.name, "method", facade.objectId);
    }
  }
  return [...members.values()].sort((left, right) => compareText(left.name, right.name) || compareText(left.kind, right.kind));
}

function directionalMemberKey(member) {
  return `${member.kind}\0${member.name}`;
}

function addGoMember(members, name, kind, objectId) {
  const existing = members.get(name);
  if (existing !== undefined && existing.kind !== kind) {
    throw new Error(`external Go facade '${objectId}' changes member '${name}' from ${existing.kind} to ${kind} across semantic profiles`);
  }
  members.set(name, { kind, name, modifiers: [] });
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
  if (descriptor.kind !== counterpart.kind) return descriptor;
  const counterpartMembers = authoredDescriptorMembers(counterpart);
  const descriptorMembers = authoredDescriptorMembers(descriptor);
  if (counterpartMembers.length === 0 && descriptorMembers.length === 0) return descriptor;
  const expectedNames = new Set(counterpartMembers.map((member) => member.name));
  const members = descriptorMembers.filter((member) => expectedNames.has(member.name) || isPorterContractMarker(member));
  if (descriptor.kind === "class") return { ...descriptor, members };
  if (descriptor.kind === "interface") {
    return {
      ...descriptor,
      members,
      fragments: (descriptor.fragments ?? []).map((fragment) => ({
        ...fragment,
        members: (fragment.members ?? []).filter((member) => expectedNames.has(member.name) || isPorterContractMarker(member)),
      })),
    };
  }
  if (descriptor.kind === "alias" && descriptor.type?.t === "object") {
    return { ...descriptor, type: { ...descriptor.type, members } };
  }
  return descriptor;
}

function authoredDescriptorMembers(descriptor) {
  if (new Set(["class", "interface"]).has(descriptor?.kind)) return descriptor.members ?? [];
  if (descriptor?.kind === "alias" && descriptor.type?.t === "object") return descriptor.type.members ?? [];
  return [];
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

function contractError(facade, file, error, methodId = undefined) {
  return {
    id: methodId === undefined ? `external-facade:${facade.objectId}` : `external-method:${methodId}`,
    file,
    kind: "authored-facade-contract-error",
    detail: `authored facade contract failed closed: ${error instanceof Error ? error.message : String(error)}`,
  };
}
