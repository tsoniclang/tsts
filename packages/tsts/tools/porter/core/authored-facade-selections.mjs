import { compareText } from "./deterministic-order.mjs";
import {
  authoredFacadeModuleSet,
  buildExternalFacadeStoragePlan,
  externalFacadeStoragePlanBootstrapFacades,
  externalFacadeStoragePlanAuthoredRoots,
  finalizeExternalFacadeStorageCatalog,
} from "./external-facades.mjs";
import { renderExternalFacadeModules } from "./facade-artifacts.mjs";
import { renderGeneratedArtifact } from "./facade-artifacts/generated-envelope.mjs";
import { renderGoCompatModule, renderGoScalarsModule } from "./runtime-templates.mjs";
import { inspectGeneratedArtifactRegistration } from "../generated-source.mjs";
import { loadParser } from "../ts-extractor/ast-signatures.mjs";
import { buildIndexedModuleValueEnvironments, extractIndexedTypeExportDescriptor } from "../ts-extractor/extract-signatures.mjs";
import { indexTypeScriptModuleSources, parseTypeScriptModule } from "../ts-extractor/module-index.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import { assertSourceModuleId } from "../ts-extractor/source-structure.mjs";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { externalTypeScriptDeclarationHash } from "./external-facade-runtime-adaptation.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";

export async function prepareExternalFacadeStorageCatalog(config, snapshot, repoRoot) {
  const profile = loadProfile(config);
  const api = await loadParser({
    distRoot: join(repoRoot, profile.parser.distRoot),
    freshnessSrcDirs: profile.parser.freshnessSrcDirs.map((directory) => join(repoRoot, directory)),
  });
  const plan = buildExternalFacadeStoragePlan(config, snapshot);
  const moduleRoot = requireExactTypeScriptModuleRoot(config.tsRoot);
  const authoredSources = collectAuthoredFacadeModuleSources(config, repoRoot, moduleRoot);
  const requestedModules = requestedRelativeModules(api, authoredSources, moduleRoot);
  const bootstrapSources = mergeFacadeSources(
    expectedVirtualFacadeSources(moduleRoot, snapshot, plan, requestedModules),
    authoredSources,
  );
  const bootstrapIndex = indexTypeScriptModuleSources(api, bootstrapSources);
  const bootstrapSurfaces = buildAuthoredFacadeSurfaceIndex({
    api,
    config,
    moduleIndex: bootstrapIndex,
    plan,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, bootstrapIndex),
  });
  const bootstrapCatalog = finalizeExternalFacadeStorageCatalog(plan, bootstrapSurfaces);
  const exactSources = mergeFacadeSources(
    expectedExactFacadeSources(config, snapshot, bootstrapCatalog, moduleRoot),
    authoredSources,
  );
  const exactIndex = indexTypeScriptModuleSources(api, exactSources);
  const exactSurfaces = buildAuthoredFacadeSurfaceIndex({
    api,
    config,
    moduleIndex: exactIndex,
    plan,
    valueEnvironments: buildIndexedModuleValueEnvironments(api, exactIndex),
  });
  if (canonicalSchemaValue([...bootstrapSurfaces]) !== canonicalSchemaValue([...exactSurfaces])) {
    throw new Error("authored facade declaration evidence changed between bootstrap and exact generated module resolution");
  }
  return finalizeExternalFacadeStorageCatalog(plan, exactSurfaces);
}

function collectAuthoredFacadeModuleSources(config, repoRoot, moduleRoot) {
  const sourceRoot = sourceRootContext(repoRoot, moduleRoot);
  const sources = new Map();

  for (const authoredModule of [...authoredFacadeModuleSet(config)].sort(compareText)) {
    const moduleId = `${moduleRoot}/${authoredModule}`;
    sources.set(moduleId, readRequiredFacadeSource(sourceRoot, moduleId, authoredModule));
  }

  return sources;
}

function expectedVirtualFacadeSources(moduleRoot, snapshot, plan, requestedModules) {
  const sources = new Map([
    [
      `${moduleRoot}/go/scalars.ts`,
      renderGeneratedArtifact(snapshot, "go/scalars.ts", "go-scalars", renderGoScalarsModule()),
    ],
    [
      `${moduleRoot}/go/compat.ts`,
      renderGeneratedArtifact(snapshot, "go/compat.ts", "go-compat", renderGoCompatModule()),
    ],
  ]);
  const groups = new Map();
  for (const facade of externalFacadeStoragePlanBootstrapFacades(plan, requestedModules).values()) {
    const declarations = groups.get(facade.tsModule) ?? [];
    const parameters = Array.from({ length: facade.arity }, (_unused, index) => `T${index}`);
    declarations.push(`export type ${facade.tsName}${parameters.length === 0 ? "" : `<${parameters.join(", ")}>`} = never;`);
    groups.set(facade.tsModule, declarations);
  }
  for (const [relativePath, declarations] of [...groups].sort(([left], [right]) => compareText(left, right))) {
    const moduleId = `${moduleRoot}/${relativePath}`;
    if (sources.has(moduleId)) throw new Error(`generated facade bootstrap module '${relativePath}' conflicts with core Porter storage`);
    sources.set(moduleId, renderGeneratedArtifact(snapshot, relativePath, "go-facade", `${declarations.sort(compareText).join("\n")}\n`));
  }
  return sources;
}

function expectedExactFacadeSources(config, snapshot, catalog, moduleRoot) {
  const sources = new Map([
    [`${moduleRoot}/go/scalars.ts`, renderGeneratedArtifact(snapshot, "go/scalars.ts", "go-scalars", renderGoScalarsModule())],
    [`${moduleRoot}/go/compat.ts`, renderGeneratedArtifact(snapshot, "go/compat.ts", "go-compat", renderGoCompatModule())],
  ]);
  for (const [relativePath, body] of renderExternalFacadeModules(config, snapshot, catalog)) {
    const moduleId = `${moduleRoot}/${relativePath}`;
    if (sources.has(moduleId)) throw new Error(`generated facade module '${relativePath}' conflicts with core Porter storage`);
    sources.set(moduleId, renderGeneratedArtifact(snapshot, relativePath, "go-facade", body));
  }
  return sources;
}

function requestedRelativeModules(api, authoredSources, moduleRoot) {
  const requested = new Set();
  const prefix = `${moduleRoot}/`;
  for (const [moduleId, source] of authoredSources) {
    const parsed = parseTypeScriptModule(api, moduleId, source);
    for (const reference of parsed.structure.moduleReferences) {
      if (reference.relative && reference.resolved.startsWith(prefix) && !authoredSources.has(reference.resolved)) {
        requested.add(reference.resolved.slice(prefix.length));
      }
    }
  }
  return requested;
}

function mergeFacadeSources(virtualSources, authoredSources) {
  const sources = new Map(virtualSources);
  for (const [moduleId, source] of authoredSources) {
    if (sources.has(moduleId)) {
      throw new Error(`configured authored facade module '${moduleId}' conflicts with Porter-generated storage`);
    }
    sources.set(moduleId, source);
  }
  return sources;
}

function requireExactTypeScriptModuleRoot(value) {
  if (typeof value !== "string" || value.length === 0 || isAbsolute(value) || value.includes("\\") ||
      value.split("/").some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    throw new Error(`TypeScript module root must be an exact repo-relative path: '${value}'`);
  }
  assertSourceModuleId(`${value}/__porter_facade_bootstrap__.ts`);
  return value;
}

function sourceRootContext(repoRoot, moduleRoot) {
  const canonicalRepoRoot = realpathSync(resolve(repoRoot));
  const rootDirectory = resolve(canonicalRepoRoot, moduleRoot);
  requireContainedPath(canonicalRepoRoot, rootDirectory, `TypeScript module root '${moduleRoot}' is not contained within repo root`);
  return { canonicalRepoRoot, moduleRoot, rootDirectory };
}

function readRequiredFacadeSource(context, moduleId, authoredModule) {
  const prefix = `${context.moduleRoot}/`;
  if (!moduleId.startsWith(prefix)) throw new Error(`TypeScript facade module '${moduleId}' is outside configured tsRoot`);
  const sourcePath = resolve(context.rootDirectory, moduleId.slice(prefix.length));
  requireContainedPath(context.rootDirectory, sourcePath, `TypeScript facade module '${moduleId}' is outside configured tsRoot`);
  let stats;
  try {
    stats = lstatSync(sourcePath);
  } catch (error) {
    if (error?.code === "ENOENT") {
      throw new Error(`configured authored facade module '${authoredModule}' is missing at '${moduleId}'`);
    }
    throw error;
  }
  if (!stats.isFile()) throw new Error(`required TypeScript facade source '${moduleId}' is not one regular file`);
  const canonicalSourceRoot = realpathSync(context.rootDirectory);
  requireContainedPath(
    context.canonicalRepoRoot,
    canonicalSourceRoot,
    `TypeScript module root '${context.moduleRoot}' is not contained within repo root`,
  );
  const canonicalSourcePath = realpathSync(sourcePath);
  requireContainedPath(
    canonicalSourceRoot,
    canonicalSourcePath,
    `required TypeScript facade source '${moduleId}' resolves outside configured tsRoot`,
  );
  return readFileSync(canonicalSourcePath, "utf8");
}

function requireContainedPath(root, target, message) {
  const relativePath = relative(root, target);
  if (relativePath === "" || relativePath === ".." || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
    throw new Error(message);
  }
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
