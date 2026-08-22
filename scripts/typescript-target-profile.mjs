import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { compareCodeUnits } from "./canonical-order.mjs";

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
    new Set(["schemaVersion", "optimizations", "diagnostics"]),
    "TypeScript target profile",
  );
  if (parsed["schemaVersion"] !== 1) {
    throw new Error("TypeScript target profile schemaVersion must be 1");
  }
  const optimizations = parsed["optimizations"];
  if (!isRecord(optimizations)) {
    throw new Error("TypeScript target profile optimizations must be an object");
  }
  const diagnostics = parsed["diagnostics"] ?? { planningPhases: false };
  if (!isRecord(diagnostics)) {
    throw new Error("TypeScript target profile diagnostics must be an object");
  }
  rejectUnknownKeys(
    diagnostics,
    new Set(["planningPhases"]),
    "TypeScript target profile diagnostics",
  );
  if (typeof diagnostics["planningPhases"] !== "boolean") {
    throw new Error(
      "TypeScript target profile diagnostic 'planningPhases' must be boolean",
    );
  }
  const normalized = normalizeJson(parsed);
  const digest = createHash("sha256")
    .update(JSON.stringify(normalized))
    .digest("hex");
  return Object.freeze({
    digest,
    optimizations: freezeJson(optimizations),
    diagnostics: freezeJson(diagnostics),
  });
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
