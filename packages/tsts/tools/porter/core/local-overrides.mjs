import { increment } from "./runtime.mjs";

export function extractTsgoOverrideJson(doc) {
  const marker = "@tsgo-override";
  const markerIndex = doc.indexOf(marker);
  if (markerIndex < 0) return undefined;

  const raw = doc.slice(markerIndex + marker.length);
  const cleaned = raw
    .split(/\r?\n/)
    .map((line, index) => (index === 0 ? line : line.replace(/^\s*\*\s?/, "")))
    .join("\n")
    .trimStart();
  const start = cleaned.indexOf("{");
  if (start < 0) return undefined;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < cleaned.length; index++) {
    const ch = cleaned[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") {
      depth++;
      continue;
    }
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        return cleaned.slice(start, index + 1);
      }
    }
  }
  return cleaned.slice(start);
}

export function emptyLocalOverrideStatus() {
  return {
    inline: 0,
    failureCount: 0,
    invalidInline: [],
    byCategory: {},
    byAllow: {},
    signatureUnits: [],
    units: [],
  };
}

export function buildLocalOverrideStatus(config, tsUnits) {
  if ((config.implementationOverrides ?? []).length > 0) {
    return {
      ...emptyLocalOverrideStatus(),
      failureCount: config.implementationOverrides.length,
      invalidInline: config.implementationOverrides.map((entry, index) => ({
        id: entry.id ?? "",
        path: "",
        reason: `central implementationOverrides[${index}] is banned; move the full metadata to local @tsgo-override`,
      })),
    };
  }
  const units = tsUnits.units ?? [];
  const invalidInline = [];
  const configuredCategories = config.overrideCategories;
  if (!Array.isArray(configuredCategories) || configuredCategories.length === 0 || configuredCategories.some((category) => typeof category !== "string" || category.trim() === "") || new Set(configuredCategories).size !== configuredCategories.length) {
    invalidInline.push({ id: "", path: "packages/tsts/porter.config.json", reason: "overrideCategories must be a non-empty array of unique non-empty category names" });
  }
  const byCategory = new Map();
  const byAllow = new Map();
  const signatureUnits = [];
  const overrideUnits = [];
  const inlineUnits = units.filter((unit) => unit.override !== undefined);
  for (const unit of inlineUnits) {
    const issues = validateOverrideShape(unit.override, config, unit);
    if (issues.length > 0) {
      invalidInline.push({
        id: unit.id,
        path: unit.path,
        reason: issues.join("; "),
      });
      continue;
    }
    increment(byCategory, unit.override.category);
    for (const allow of unit.override.allow) increment(byAllow, allow);
    overrideUnits.push({
      id: unit.id,
      path: unit.path,
      category: unit.override.category,
      allow: [...unit.override.allow],
      reason: unit.override.reason,
    });
    if (unit.override.allow.includes("signature")) {
      signatureUnits.push({ id: unit.id, path: unit.path, category: unit.override.category, reason: unit.override.reason });
    }
  }
  overrideUnits.sort((left, right) => left.path.localeCompare(right.path) || left.id.localeCompare(right.id));
  signatureUnits.sort((left, right) => left.path.localeCompare(right.path) || left.id.localeCompare(right.id));
  return {
    inline: inlineUnits.length,
    failureCount: invalidInline.length,
    invalidInline,
    byCategory: Object.fromEntries([...byCategory.entries()].sort()),
    byAllow: Object.fromEntries([...byAllow.entries()].sort()),
    signatureUnits,
    units: overrideUnits,
  };
}

export function validateOverrideShape(value, config, unit) {
  const issues = [];
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return ["override must be an object"];
  }
  if (typeof value.category !== "string" || value.category.trim() === "") {
    issues.push("category is required");
  } else if (!(config.overrideCategories ?? []).includes(value.category)) {
    issues.push(`category '${value.category}' is not registered in overrideCategories`);
  }
  if (typeof value.reason !== "string" || value.reason.trim().length < 40) {
    issues.push("reason must be a durable explanation of at least 40 characters");
  } else if (/\b(?:todo|tbd|fixme|phase\s*\d+|slice\s*\d+)\b/i.test(value.reason)) {
    issues.push("reason must be timeless and cannot contain planning/status placeholders");
  }
  const allowed = new Set(["body", "signature", "initializer", "value-order"]);
  if (!Array.isArray(value.allow) || value.allow.length === 0 || value.allow.some((item) => !allowed.has(item))) {
    issues.push("allow must be a non-empty array containing only 'body', 'signature', 'initializer', or 'value-order'");
  } else if (new Set(value.allow).size !== value.allow.length) {
    issues.push("allow entries must be unique");
  }
  if (unit?.status === "stub") issues.push("stub units cannot carry implementation overrides");
  if (Array.isArray(value.allow) && value.allow.includes("body") && unit?.kind === "type") {
    issues.push("body overrides do not apply to type units; type-shape differences require a signature override");
  }
  if (Array.isArray(value.allow) && (value.allow.includes("initializer") || value.allow.includes("value-order")) && unit?.kind !== "constGroup" && unit?.kind !== "varGroup") {
    issues.push("initializer and value-order overrides apply only to constGroup or varGroup units");
  }
  if (Array.isArray(value.allow) && value.allow.includes("signature")) {
    if (typeof value.goSignature !== "string" || value.goSignature.trim() === "") {
      issues.push("signature overrides require goSignature");
    }
    if (typeof value.tsSignature !== "string" || value.tsSignature.trim() === "") {
      issues.push("signature overrides require tsSignature");
    }
  }
  if (Array.isArray(value.allow) && value.allow.includes("initializer")) {
    if (typeof value.goInitializer !== "string" || value.goInitializer.trim() === "") {
      issues.push("initializer overrides require goInitializer");
    }
    if (typeof value.tsInitializer !== "string" || value.tsInitializer.trim() === "") {
      issues.push("initializer overrides require tsInitializer");
    }
  }
  if (Array.isArray(value.allow) && value.allow.includes("value-order")) {
    if (typeof value.goValueOrder !== "string" || value.goValueOrder.trim() === "") {
      issues.push("value-order overrides require goValueOrder");
    }
    if (typeof value.tsValueOrder !== "string" || value.tsValueOrder.trim() === "") {
      issues.push("value-order overrides require tsValueOrder");
    }
  }
  const permittedKeys = new Set(["category", "allow", "reason"]);
  if (Array.isArray(value.allow) && value.allow.includes("signature")) {
    permittedKeys.add("goSignature");
    permittedKeys.add("tsSignature");
  }
  if (Array.isArray(value.allow) && value.allow.includes("initializer")) {
    permittedKeys.add("goInitializer");
    permittedKeys.add("tsInitializer");
  }
  if (Array.isArray(value.allow) && value.allow.includes("value-order")) {
    permittedKeys.add("goValueOrder");
    permittedKeys.add("tsValueOrder");
  }
  for (const key of Object.keys(value)) {
    if (!permittedKeys.has(key)) issues.push(`unknown or inapplicable override key '${key}'`);
  }
  return issues;
}
