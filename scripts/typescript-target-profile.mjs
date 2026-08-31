import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { compareCodeUnits } from "./canonical-order.mjs";
import { readRepresentationTransportContract } from "./representation-transport-contract.mjs";

export async function readTypeScriptTargetProfile(path) {
  const text = await readFile(path, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`TypeScript target profile is not valid JSON: ${errorMessage(error)}`);
  }
  if (!isRecord(parsed)) {
    throw new Error("TypeScript target profile must be an object");
  }
  rejectUnknownKeys(
    parsed,
    new Set([
      "schemaVersion",
      "execution",
      "assembly",
      "optimizations",
      "acceptance",
      "evidence",
    ]),
    "TypeScript target profile",
  );
  if (parsed["schemaVersion"] !== 10) {
    throw new Error("TypeScript target profile schemaVersion must be 10");
  }
  if (parsed["execution"] !== "synchronous") {
    throw new Error("TSTS TypeScript target execution must be 'synchronous'");
  }
  const assembly = parsed["assembly"];
  if (!isRecord(assembly)) {
    throw new Error("TypeScript target profile assembly must be an object");
  }
  rejectUnknownKeys(
    assembly,
    new Set(["modulePackaging", "minification"]),
    "TypeScript target profile assembly",
  );
  if (assembly["modulePackaging"] !== "single-esm") {
    throw new Error(
      "TSTS TypeScript target modulePackaging must be 'single-esm'",
    );
  }
  if (assembly["minification"] !== "full") {
    throw new Error(
      "TSTS TypeScript target minification must be 'full'",
    );
  }
  const optimizations = parsed["optimizations"];
  if (!isRecord(optimizations)) {
    throw new Error("TypeScript target profile optimizations must be an object");
  }
  rejectUnknownKeys(
    optimizations,
    new Set([
      "pointerFlows",
      "scalarProjections",
      "representationProjections",
    ]),
    "TypeScript target profile optimizations",
  );
  assertOptimizationChoice(
    optimizations["pointerFlows"],
    "pointerFlows",
    "location",
  );
  assertOptimizationChoice(
    optimizations["scalarProjections"],
    "scalarProjections",
    "preserve",
  );
  const acceptance = parsed["acceptance"];
  if (!isRecord(acceptance)) {
    throw new Error("TypeScript target profile acceptance must be an object");
  }
  rejectUnknownKeys(
    acceptance,
    new Set([
      "pointerKeyMapCount",
      "dominatingNilCheckEliminationCount",
    ]),
    "TypeScript target profile acceptance",
  );
  if (
    !Number.isSafeInteger(acceptance["pointerKeyMapCount"]) ||
    acceptance["pointerKeyMapCount"] <= 0
  ) {
    throw new Error(
      "TypeScript target profile pointerKeyMapCount must be a positive safe integer",
    );
  }
  if (
    !Number.isSafeInteger(
      acceptance["dominatingNilCheckEliminationCount"],
    ) ||
    acceptance["dominatingNilCheckEliminationCount"] <= 0
  ) {
    throw new Error(
      "TypeScript target profile dominatingNilCheckEliminationCount must be a positive safe integer",
    );
  }
  assertOptimizationChoice(
    optimizations["representationProjections"],
    "representationProjections",
    "preserve",
  );
  const representationTransports = await readRepresentationTransportContract(
    path,
    parsed["evidence"],
  );
  const normalized = normalizeJson({
    profile: parsed,
    representationTransports,
  });
  const digest = createHash("sha256")
    .update(JSON.stringify(normalized))
    .digest("hex");
  return Object.freeze({
    digest,
    execution: parsed["execution"],
    assembly: freezeJson(assembly),
    optimizations: freezeJson(optimizations),
    acceptance: freezeJson(acceptance),
    representationTransports,
  });
}

function assertOptimizationChoice(value, name, canonical) {
  if (value !== canonical && value !== "closed-direct") {
    throw new Error(
      `TypeScript target optimization '${name}' must be '${canonical}' or 'closed-direct'`,
    );
  }
}

function normalizeJson(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeJson);
  }
  if (!isRecord(value)) {
    return value;
  }
  return Object.fromEntries(
    Object.keys(value)
      .sort(compareCodeUnits)
      .map((key) => [key, normalizeJson(value[key])]),
  );
}

function freezeJson(value) {
  if (Array.isArray(value)) {
    return Object.freeze(value.map(freezeJson));
  }
  if (!isRecord(value)) {
    return value;
  }
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, freezeJson(entry)]),
  ));
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
