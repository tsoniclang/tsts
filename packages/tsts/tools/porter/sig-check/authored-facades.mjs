import {
  createExternalFacadeContractRenderer,
  createExternalMethodBindingContractRenderer,
} from "../core/facade-artifacts.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { buildExternalFacadeStorageCatalog } from "../core/external-facades.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import {
  extractIndexedFunctionExportDescriptor,
  extractIndexedTypeExportDescriptor,
  extractNamedDeclarationDescriptor,
  extractNamedFunctionDescriptor,
} from "../ts-extractor/extract-signatures.mjs";
import { parseTypeScriptModule } from "../ts-extractor/module-index.mjs";
import { compareSignatures } from "./comparison.mjs";

export function collectAuthoredFacadeMismatches({
  api,
  canonicalIdentity,
  config,
  conventions,
  moduleIndex,
  profile,
  snapshot,
  valueEnvironments,
}) {
  const facades = buildExternalFacadeStorageCatalog(config, snapshot);
  const renderContract = createExternalFacadeContractRenderer(config, snapshot, facades);
  const renderMethodContract = createExternalMethodBindingContractRenderer(config, snapshot, facades);
  const mismatches = [];
  const inventory = {
    constructors: [],
    goOnlyMembers: [],
    methodBindings: [],
    privateStorageMembers: [],
    tsOnlyMembers: [],
  };
  const declarationOwners = new Map();
  const ownedDeclarationIds = new Set();
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
      requireAuthoredDeclarationOrigin(moduleIndex, config, declarationId);
      claimDeclarationOwner(declarationOwners, declarationId, {
        file,
        identity: facade.objectId,
        kind: "type",
      });
      ownedDeclarationIds.add(declarationId);
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    const storageActual = withPublicExportIdentity(actual);
    const publicActual = publicFacadeDeclaration(storageActual);
    let directional;
    try {
      directional = collectDirectionalMemberEvidence(facade, file, publicActual, storageActual);
    } catch (error) {
      mismatches.push(contractError(facade, file, error));
      continue;
    }
    mismatches.push(...directional.mismatches);
    inventory.constructors.push(...directional.inventory.constructors);
    inventory.goOnlyMembers.push(...directional.inventory.goOnlyMembers);
    inventory.privateStorageMembers.push(...directional.inventory.privateStorageMembers);
    inventory.tsOnlyMembers.push(...directional.inventory.tsOnlyMembers);
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
    const comparable = alignAuthoredFacadeDeclarationSyntax(expected, actualProjection);
    try {
      for (const mismatch of compareSignatures(
        comparable.expected,
        comparable.actual,
        null,
        canonicalIdentity,
        conventions,
        profile.allowedGlobals,
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
        requireAuthoredDeclarationOrigin(moduleIndex, config, extracted.declarationId);
        claimDeclarationOwner(declarationOwners, extracted.declarationId, {
          file,
          identity: binding.methodId,
          kind: "method",
        });
        ownedDeclarationIds.add(extracted.declarationId);
        actual = extracted.descriptor;
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
          profile.allowedGlobals,
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

function collectDirectionalMemberEvidence(facade, file, actual, storageActual) {
  const expectedMembers = goFacadePublicMembers(facade);
  const actualMembers = new Set(["class", "interface"]).has(actual.kind) ? actual.members ?? [] : [];
  const expectedNames = new Set(expectedMembers.map((member) => member.name));
  const actualNames = new Set(actualMembers.map((member) => member.name));
  const goOnlyMembers = expectedMembers.filter((member) => !actualNames.has(member.name))
    .map((member) => memberEvidence(facade, file, member));
  const tsOnlyMembers = actualMembers.filter((member) => !expectedNames.has(member.name))
    .map((member) => memberEvidence(facade, file, member));
  const constructors = (storageActual.members ?? []).filter((member) => member.kind === "constructor")
    .map((member) => memberEvidence(facade, file, member));
  const privateStorageMembers = (storageActual.members ?? [])
    .filter((member) => member.kind !== "constructor" && !isPublicFacadeMember(member))
    .map((member) => memberEvidence(facade, file, member));
  const mismatches = [
    ...goOnlyMembers.map((member) => ({
      id: `external-facade:${facade.objectId}`,
      file,
      kind: "authored-facade-go-member-missing",
      detail: `authored facade '${facade.objectId}' omits Go ${member.memberKind} '${member.name}'`,
    })),
    ...tsOnlyMembers.map((member) => ({
      id: `external-facade:${facade.objectId}`,
      file,
      kind: "authored-facade-ts-member-extra",
      detail: `authored facade '${facade.objectId}' exposes TypeScript ${member.memberKind} '${member.name}' with no Go member identity`,
    })),
  ];
  if (constructors.length > 0 && facade.runtimeAdaptation?.representation !== "class") {
    mismatches.push(...constructors.map(() => ({
      id: `external-facade:${facade.objectId}`,
      file,
      kind: "authored-facade-constructor-without-class-storage",
      detail: `authored facade '${facade.objectId}' declares a constructor without reviewed class runtime storage`,
    })));
  }
  return {
    inventory: { constructors, goOnlyMembers, privateStorageMembers, tsOnlyMembers },
    mismatches,
  };
}

function goFacadePublicMembers(facade) {
  const members = new Map();
  const boundMethods = new Set(facade.methodBindings.map((binding) => binding.methodId));
  for (const variant of facade.variants) {
    const declaration = variant.declaration;
    for (const field of declaration.rhs.struct?.fields ?? []) {
      if (field.variable?.exported) addGoMember(members, field.variable.name, "property", facade.objectId);
    }
    const methods = declaration.rhs.kind === "interface"
      ? declaration.rhs.interface?.explicitMethods ?? []
      : declaration.methods ?? [];
    for (const method of methods) {
      if (method.exported && !boundMethods.has(method.id)) addGoMember(members, method.name, "method", facade.objectId);
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
  return rebuildInterfaceFragments({ ...descriptor, members });
}

function isPublicFacadeMember(member) {
  if (member.kind === "constructor" || String(member.name).startsWith("private:")) return false;
  const modifiers = new Set(member.modifiers ?? []);
  return !modifiers.has("private") && !modifiers.has("protected");
}

function memberEvidence(facade, file, member) {
  return {
    objectId: facade.objectId,
    file,
    memberKind: member.kind,
    name: member.name,
  };
}

function alignAuthoredFacadeDeclarationSyntax(expected, actual) {
  if (!new Set(["class", "interface"]).has(expected.kind) || expected.kind !== actual.kind) return { expected, actual };
  const remaining = [...(actual.members ?? [])];
  const orderedActual = [];
  const alignedExpected = [];
  for (const expectedMember of expected.members ?? []) {
    const actualIndex = remaining.findIndex((member) => member.kind === expectedMember.kind && member.name === expectedMember.name);
    if (actualIndex < 0) {
      alignedExpected.push(expectedMember);
      continue;
    }
    const [actualMember] = remaining.splice(actualIndex, 1);
    orderedActual.push(actualMember);
    alignedExpected.push(expectedMember);
  }
  orderedActual.push(...remaining);
  const expectedDescriptor = rebuildInterfaceFragments({ ...expected, members: alignedExpected });
  const actualDescriptor = rebuildInterfaceFragments({ ...actual, members: orderedActual });
  return { expected: expectedDescriptor, actual: actualDescriptor };
}

function rebuildInterfaceFragments(descriptor) {
  if (descriptor.kind !== "interface") return descriptor;
  return {
    ...descriptor,
    fragments: [{
      modifiers: descriptor.modifiers ?? [],
      typeParams: descriptor.typeParams ?? [],
      heritage: descriptor.heritage ?? [],
      members: descriptor.members ?? [],
    }],
  };
}

function projectAuthoredFacadeContract(facade, descriptor, counterpart, validateRuntimeStorage) {
  const adaptation = facade.runtimeAdaptation?.representation;
  if (adaptation === "scalar") {
    if (descriptor.kind !== "alias") return descriptor;
    if (validateRuntimeStorage && !isScalarStorageType(descriptor.type, facade.runtimeAdaptation.scalarStorage)) {
      return {
        ...descriptor,
        metadataIssues: [
          ...(descriptor.metadataIssues ?? []),
          "reviewed scalar runtime adaptation must use one scalar TypeScript storage type",
        ],
      };
    }
    return counterpart.kind === "alias" ? { ...descriptor, type: counterpart.type } : descriptor;
  }
  if (!new Set(["class", "interface"]).has(descriptor.kind) || descriptor.kind !== counterpart.kind) return descriptor;
  const expectedNames = new Set((counterpart.members ?? []).map((member) => member.name));
  const members = (descriptor.members ?? []).filter((member) => expectedNames.has(member.name) || isPorterContractMarker(member));
  if (descriptor.kind === "class") return { ...descriptor, members };
  const modifiers = descriptor.modifiers ?? [];
  const typeParams = descriptor.typeParams ?? [];
  const heritage = descriptor.heritage ?? [];
  return {
    ...descriptor,
    members,
    fragments: [{ modifiers, typeParams, heritage, members }],
  };
}

function isPorterContractMarker(member) {
  return member.name === "__tsgoEmpty" || String(member.name).startsWith("__goUnexported");
}

function withPublicExportIdentity(descriptor) {
  if (descriptor.kind === "value") return descriptor;
  const modifiers = ["export", ...(descriptor.modifiers ?? []).filter((modifier) => modifier !== "export")];
  if (descriptor.kind !== "interface") return { ...descriptor, modifiers };
  return {
    ...descriptor,
    modifiers,
    fragments: [{
      modifiers,
      typeParams: descriptor.typeParams ?? [],
      heritage: descriptor.heritage ?? [],
      members: descriptor.members ?? [],
    }],
  };
}

function isScalarStorageType(type, scalarStorage) {
  if (type?.t === "kw") return type.kw === scalarStorage;
  if (type?.t !== "intersect") return false;
  const scalarMembers = type.members.filter((member) => isScalarStorageType(member, scalarStorage));
  const brandMembers = type.members.filter((member) => !isScalarStorageType(member, scalarStorage));
  return scalarMembers.length === 1 && brandMembers.length > 0 && brandMembers.every(isExactScalarBrand);
}

function isExactScalarBrand(type) {
  if (type?.t !== "object" || !Array.isArray(type.members) || type.members.length === 0) return false;
  return type.members.every((member) => member.kind === "property" && member.optional !== true &&
    (member.readonly === true || member.modifiers?.includes("readonly")) && isLiteralScalar(member.type));
}

function isLiteralScalar(type) {
  return type?.t === "literal" && new Set(["bigint", "boolean", "number", "string"]).has(type.kind);
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

function requireAuthoredDeclarationOrigin(moduleIndex, config, declarationId) {
  const separator = declarationId.lastIndexOf("::");
  if (separator < 0) throw new Error(`authored declaration '${declarationId}' has no exact module identity`);
  const moduleId = declarationId.slice(0, separator);
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
