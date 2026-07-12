import { compareText } from "./deterministic-order.mjs";
import {
  buildExternalFacadeStoragePlan,
  externalFacadeStoragePlanAuthoredRoots,
  finalizeExternalFacadeStorageCatalog,
} from "./external-facades.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import { loadParser } from "../ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractIndexedTypeExportDescriptor } from "../ts-extractor/extract-signatures.mjs";
import { loadTypeScriptModuleIndex } from "../ts-extractor/module-index.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { join } from "node:path";
import { externalTypeScriptDeclarationHash } from "./external-facade-runtime-adaptation.mjs";

export async function prepareExternalFacadeStorageCatalog(config, snapshot, repoRoot) {
  const profile = loadProfile(config);
  const api = await loadParser({
    distRoot: join(repoRoot, profile.parser.distRoot),
    freshnessSrcDirs: profile.parser.freshnessSrcDirs.map((directory) => join(repoRoot, directory)),
  });
  const moduleIndex = loadTypeScriptModuleIndex(api, repoRoot, config.tsRoot);
  const valueEnvironments = buildIndexedModuleValueEnvironments(api, moduleIndex);
  const plan = buildExternalFacadeStoragePlan(config, snapshot);
  const authoredSurfaces = buildAuthoredFacadeSurfaceIndex({
    api,
    config,
    moduleIndex,
    plan,
    valueEnvironments,
  });
  return finalizeExternalFacadeStorageCatalog(plan, authoredSurfaces);
}

export function buildAuthoredFacadeSurfaceIndex({
  api,
  config,
  moduleIndex,
  plan,
  valueEnvironments,
}) {
  const roots = externalFacadeStoragePlanAuthoredRoots(plan);
  const surfaces = new Map();
  for (const facade of [...roots.values()].sort((left, right) => compareText(left.objectId, right.objectId))) {
    const file = `${config.tsRoot.replace(/\/+$/, "")}/${facade.tsModule}`;
    const extracted = extractIndexedTypeExportDescriptor(api, moduleIndex, file, facade.tsName, valueEnvironments);
    requireAuthoredDeclarationOrigin(moduleIndex, config, extracted.declarationId, file, facade.tsName);
    const descriptor = publicFacadeDeclaration(extracted.descriptor);
    const members = authoredSurfaceMembers(descriptor);
    const memberKeys = members.filter(isSourceVisibleFacadeMember).map(directionalMemberKey);
    if (new Set(memberKeys).size !== memberKeys.length) {
      throw new Error(`authored facade '${facade.objectId}' has duplicate public declaration member identities`);
    }
    surfaces.set(facade.objectId, Object.freeze({
      declarationHash: externalTypeScriptDeclarationHash(extracted.descriptor),
      declarationId: extracted.declarationId,
      declarationKind: authoredDeclarationKind(descriptor),
      memberKeys: Object.freeze(memberKeys),
      objectId: facade.objectId,
    }));
  }
  return surfaces;
}

export function publicFacadeDeclaration(descriptor) {
  if (new Set(["class", "interface"]).has(descriptor.kind)) {
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
  if (descriptor.kind === "alias" && descriptor.type?.t === "object") {
    return { ...descriptor, type: { ...descriptor.type, members: (descriptor.type.members ?? []).filter(isPublicFacadeMember) } };
  }
  return descriptor;
}

export function isPublicFacadeMember(member) {
  if (member.kind === "constructor" || String(member.name).startsWith("private:")) return false;
  const modifiers = new Set(member.modifiers ?? []);
  return !modifiers.has("private") && !modifiers.has("protected");
}

export function isSourceVisibleFacadeMember(member) {
  return isPublicFacadeMember(member) && !isPorterContractMarker(member);
}

export function isPorterContractMarker(member) {
  return member.name === "__tsgoEmpty" || member.name === "computed:global::__tsgoPointerMethodSet" ||
    String(member.name).startsWith("__goUnexported");
}

export function requireAuthoredDeclarationOrigin(moduleIndex, config, declarationId, expectedModuleId, expectedName) {
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

function directionalMemberKey(member) {
  return `${member.kind}\0${member.name}`;
}

function authoredSurfaceMembers(descriptor) {
  if (new Set(["class", "interface"]).has(descriptor.kind)) return descriptor.members ?? [];
  if (descriptor.kind === "alias" && descriptor.type?.t === "object") return descriptor.type.members ?? [];
  return [];
}

function authoredDeclarationKind(descriptor) {
  if (descriptor.kind === "class" || descriptor.kind === "interface") return descriptor.kind;
  if (descriptor.kind !== "alias") throw new Error(`authored facade must be one class, interface, or type alias; got '${descriptor.kind}'`);
  return descriptor.type?.t === "object" ? "object-alias" : "type-alias";
}
