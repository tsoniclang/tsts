import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";

export async function readRepresentationTransportContract(profilePath, value) {
  if (!isRecord(value)) {
    throw new Error("TypeScript target profile evidence must be an object");
  }
  rejectUnknownKeys(
    value,
    new Set([
      "representationTransportCallables",
      "representationTransportManifest",
    ]),
    "TypeScript target profile evidence",
  );
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
  const modules = manifest["facetModules"];
  if (!Array.isArray(modules)) {
    throw new Error("representation transport manifest facetModules is invalid");
  }
  const callables = readConfiguredCallables(
    value["representationTransportCallables"],
  );
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
  for (let index = 1; index < callables.length; index += 1) {
    if (compareRepresentationTransportCallables(callables[index - 1], callables[index]) === 0) {
      throw new Error("representation transport callable identity is duplicated");
    }
  }
  if (callables.length === 0) {
    throw new Error("representation transport manifest contains no generic kernels");
  }
  const document = Object.freeze({
    schemaVersion: 2,
    callables: Object.freeze(callables),
  });
  return Object.freeze({
    ...document,
    digest: createHash("sha256").update(JSON.stringify(document)).digest("hex"),
    manifestDigest: manifest["manifestDigest"],
  });
}

function readConfiguredCallables(value) {
  if (!Array.isArray(value)) {
    throw new Error(
      "TypeScript target representationTransportCallables must be an array",
    );
  }
  return value.map((entry, index) => {
    const callable = requireRecord(
      entry,
      `representation transport callable ${index}`,
    );
    rejectUnknownKeys(
      callable,
      new Set(["kind", "moduleSpecifier", "exportName"]),
      `representation transport callable ${index}`,
    );
    if (
      callable["kind"] !== "inline-generic-method-call" ||
      typeof callable["moduleSpecifier"] !== "string" ||
      callable["moduleSpecifier"].length === 0 ||
      typeof callable["exportName"] !== "string" ||
      callable["exportName"].length === 0
    ) {
      throw new Error(
        `representation transport callable ${index} is incomplete`,
      );
    }
    return Object.freeze({
      kind: callable["kind"],
      moduleSpecifier: callable["moduleSpecifier"],
      exportName: callable["exportName"],
    });
  });
}

function compareRepresentationTransportCallables(left, right) {
  return compareCodeUnits(left.moduleSpecifier, right.moduleSpecifier) ||
    compareCodeUnits(left.exportName, right.exportName);
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
