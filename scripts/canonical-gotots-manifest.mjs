import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

import { compareCodeUnits } from "./canonical-order.mjs";
import { validateRelativePath } from "./package-artifact.mjs";
import { readGeneratedRepresentationTransportContract } from "./representation-transport-contract.mjs";

export const canonicalGoToTSManifestName = "gotots-manifest.json";

export async function readCanonicalGoToTSManifest(rootArgument) {
  const root = resolve(rootArgument);
  const document = parseRecord(
    await readFile(join(root, canonicalGoToTSManifestName), "utf8"),
  );
  const expectedKeys = [
    "files",
    "representationTransports",
    "schemaVersion",
    "semanticDigest",
  ];
  const actualKeys = Object.keys(document).sort(compareCodeUnits);
  if (
    document["schemaVersion"] !== 2 ||
    !equalPaths(expectedKeys, actualKeys) ||
    typeof document["semanticDigest"] !== "string" ||
    !/^[0-9a-f]{64}$/u.test(document["semanticDigest"])
  ) {
    throw new Error("GoToTS manifest identity is invalid");
  }
  const files = document["files"];
  if (!Array.isArray(files)) {
    throw new Error("GoToTS manifest files are invalid");
  }
  const normalized = files.map((path) =>
    validateRelativePath(path, "GoToTS manifest")
  );
  const sorted = [...normalized].sort(compareCodeUnits);
  if (!equalPaths(normalized, sorted) || new Set(normalized).size !== normalized.length) {
    throw new Error("GoToTS manifest files are duplicated or noncanonical");
  }
  const physical = await listPhysicalFiles(root);
  if (!equalPaths(normalized, physical)) {
    throw new Error(
      `GoToTS manifest and physical output differ\nmanifest=${JSON.stringify(normalized)}\nphysical=${JSON.stringify(physical)}`,
    );
  }
  return Object.freeze({
    semanticDigest: document["semanticDigest"],
    files: Object.freeze(normalized),
    representationTransports: readGeneratedRepresentationTransportContract(
      document["representationTransports"],
      new Set(normalized),
    ),
  });
}

async function listPhysicalFiles(root, directory = "") {
  const paths = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = directory.length === 0 ? entry.name : `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      paths.push(...await listPhysicalFiles(root, path));
    } else if (entry.isFile()) {
      paths.push(path);
    } else {
      throw new Error(`GoToTS output member '${path}' is not a regular file`);
    }
  }
  return paths.sort(compareCodeUnits);
}

function parseRecord(text) {
  let value;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new Error(`GoToTS manifest is not valid JSON: ${errorMessage(error)}`);
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("GoToTS manifest must be an object");
  }
  return value;
}

function equalPaths(left, right) {
  return left.length === right.length &&
    left.every((path, index) => path === right[index]);
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
