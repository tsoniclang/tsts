import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";

const generatedTransportSelection = "canonical-output";

export function emptyGeneratedRepresentationTransportContract() {
  return sealGeneratedContract([]);
}

export function readGeneratedRepresentationTransportContract(value, sourceFiles) {
  const contract = requireRecord(value, "generated representation transport contract");
  rejectUnknownKeys(
    contract,
    new Set(["schemaVersion", "digest", "callables"]),
    "generated representation transport contract",
  );
  if (
    contract["schemaVersion"] !== 1 ||
    typeof contract["digest"] !== "string" ||
    !/^[0-9a-f]{64}$/u.test(contract["digest"]) ||
    !Array.isArray(contract["callables"])
  ) {
    throw new Error("generated representation transport contract identity is invalid");
  }
  const callables = contract["callables"].map((value, index) =>
    readGeneratedCallable(value, index, sourceFiles)
  );
  assertCanonicalCallables(callables, "generated representation transport");
  const sealed = sealGeneratedContract(callables);
  if (sealed.digest !== contract["digest"]) {
    throw new Error("generated representation transport contract digest differs");
  }
  return sealed;
}

export async function readRepresentationTransportContract(
  profilePath,
  value,
  generated = emptyGeneratedRepresentationTransportContract(),
) {
  if (!isRecord(value)) {
    throw new Error("TypeScript target profile evidence must be an object");
  }
  rejectUnknownKeys(
    value,
    new Set([
      "representationTransportManifest",
      "generatedRepresentationTransports",
    ]),
    "TypeScript target profile evidence",
  );
  const generatedSelection = value["generatedRepresentationTransports"];
  if (
    generatedSelection !== undefined &&
    generatedSelection !== generatedTransportSelection
  ) {
    throw new Error(
      `TypeScript target generatedRepresentationTransports must be '${generatedTransportSelection}'`,
    );
  }
  if (generated.callables.length !== 0 && generatedSelection !== generatedTransportSelection) {
    throw new Error(
      "TypeScript target must explicitly select canonical generated representation transports",
    );
  }
  const manifestPath = value["representationTransportManifest"];
  if (
    typeof manifestPath !== "string" ||
    manifestPath.length === 0 ||
    isAbsolute(manifestPath) ||
    manifestPath.split(/[\\/]/u).some((segment) => segment === "..")
  ) {
    throw new Error(
      "TypeScript target representation transport manifest must be a repository-relative path",
    );
  }
  const repositoryRoot = dirname(resolve(profilePath));
  const absoluteManifest = resolve(repositoryRoot, manifestPath);
  const ownedPath = relative(repositoryRoot, absoluteManifest);
  if (ownedPath === "" || ownedPath.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)) {
    throw new Error("TypeScript target representation transport manifest escapes the repository");
  }
  const manifest = parseRecord(
    await readFile(absoluteManifest, "utf8"),
    "representation transport manifest",
  );
  if (
    manifest["schemaVersion"] !== 32 ||
    typeof manifest["manifestDigest"] !== "string" ||
    !/^[0-9a-f]{64}$/u.test(manifest["manifestDigest"])
  ) {
    throw new Error("representation transport manifest identity is invalid");
  }
  const providerCallables = readProviderCallables(manifest);
  const callables = [...providerCallables, ...generated.callables]
    .sort(compareRepresentationTransportCallables);
  assertCanonicalCallables(callables, "representation transport callable");
  const document = Object.freeze({
    schemaVersion: 2,
    callables: Object.freeze(callables),
  });
  return Object.freeze({
    ...document,
    digest: createHash("sha256").update(JSON.stringify(document)).digest("hex"),
    manifestDigest: manifest["manifestDigest"],
    generatedManifestDigest: generated.digest,
  });
}

function readProviderCallables(manifest) {
  const modules = manifest["facetModules"];
  if (!Array.isArray(modules)) {
    throw new Error("representation transport manifest facetModules is invalid");
  }
  const callables = [];
  for (const [moduleIndex, moduleValue] of modules.entries()) {
    const module = requireRecord(
      moduleValue,
      `representation transport facet module ${moduleIndex}`,
    );
    const moduleSpecifier = module["specifier"];
    const facets = module["facets"];
    if (typeof moduleSpecifier !== "string" || !Array.isArray(facets)) {
      throw new Error(
        `representation transport facet module ${moduleIndex} is incomplete`,
      );
    }
    for (const [facetIndex, facetValue] of facets.entries()) {
      const facet = requireRecord(
        facetValue,
        `representation transport facet ${moduleIndex}:${facetIndex}`,
      );
      if (facet["kind"] !== "generic-callable-kernel") {
        continue;
      }
      const capabilities = facet["capabilities"];
      const typeArguments = facet["genericTypeArguments"];
      const implementationSites = facet["implementationSites"];
      const exportName = facet["export"];
      if (
        !Array.isArray(capabilities) ||
        capabilities.length !== 1 ||
        capabilities[0] !== "kernel" ||
        facet["effect"] !== "sync" ||
        !Array.isArray(typeArguments) ||
        typeArguments.length === 0 ||
        !Array.isArray(implementationSites) ||
        implementationSites.length === 0 ||
        typeof facet["targetFingerprint"] !== "string" ||
        !/^[0-9a-f]{64}$/u.test(facet["targetFingerprint"]) ||
        typeof exportName !== "string" ||
        exportName.length === 0
      ) {
        throw new Error(
          `representation transport generic kernel ${moduleIndex}:${facetIndex} is uncertified`,
        );
      }
      callables.push(Object.freeze({
        kind: "generic-kernel",
        moduleSpecifier,
        exportName,
      }));
    }
  }
  callables.sort(compareRepresentationTransportCallables);
  assertCanonicalCallables(callables, "representation transport callable");
  if (callables.length === 0) {
    throw new Error("representation transport manifest contains no generic kernels");
  }
  return callables;
}

function readGeneratedCallable(value, index, sourceFiles) {
  const callable = requireRecord(
    value,
    `generated representation transport callable ${index}`,
  );
  rejectUnknownKeys(
    callable,
    new Set(["kind", "sourcePath", "exportName", "memberName"]),
    `generated representation transport callable ${index}`,
  );
  const kind = callable["kind"];
  const sourcePath = callable["sourcePath"];
  const exportName = callable["exportName"];
  const memberName = callable["memberName"];
  const validKind = kind === "generated-generic-function-kernel" ||
    kind === "generated-generic-member-kernel";
  const validShape = kind === "generated-generic-function-kernel"
    ? memberName === undefined
    : typeof memberName === "string" && memberName.length !== 0;
  if (
    !validKind ||
    typeof sourcePath !== "string" ||
    !sourceFiles.has(sourcePath) ||
    !sourcePath.endsWith(".ts") ||
    typeof exportName !== "string" ||
    exportName.length === 0 ||
    !validShape
  ) {
    throw new Error(
      `generated representation transport callable ${index} is invalid or unselected`,
    );
  }
  return kind === "generated-generic-function-kernel"
    ? Object.freeze({ kind, sourcePath, exportName })
    : Object.freeze({ kind, sourcePath, exportName, memberName });
}

function sealGeneratedContract(callables) {
  const document = Object.freeze({
    schemaVersion: 1,
    callables: Object.freeze([...callables]),
  });
  return Object.freeze({
    ...document,
    digest: createHash("sha256").update(JSON.stringify(document)).digest("hex"),
  });
}

function assertCanonicalCallables(callables, subject) {
  for (let index = 1; index < callables.length; index += 1) {
    if (compareRepresentationTransportCallables(callables[index - 1], callables[index]) >= 0) {
      throw new Error(`${subject} identity is duplicated or noncanonical`);
    }
  }
}

function compareRepresentationTransportCallables(left, right) {
  return compareCodeUnits(left.kind, right.kind) ||
    compareCodeUnits(
      left.kind === "generic-kernel" ? left.moduleSpecifier : left.sourcePath,
      right.kind === "generic-kernel" ? right.moduleSpecifier : right.sourcePath,
    ) ||
    compareCodeUnits(left.exportName, right.exportName) ||
    compareCodeUnits(left.memberName ?? "", right.memberName ?? "");
}

function requireRecord(value, subject) {
  if (!isRecord(value)) {
    throw new Error(`${subject} must be an object`);
  }
  return value;
}

function parseRecord(text, subject) {
  let value;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new Error(`${subject} is not valid JSON: ${errorMessage(error)}`);
  }
  return requireRecord(value, subject);
}

function rejectUnknownKeys(value, allowed, subject) {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    throw new Error(`${subject} has unsupported field '${unexpected}'`);
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
