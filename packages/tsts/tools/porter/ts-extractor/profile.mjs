// Project profile: ALL Go->TS mapping knowledge the checker needs, so the engine
// stays generic and a different Go->TS port project runs by editing config only.
// `config.signatureCheck` deep-overrides these defaults; absent => tsts behavior.
//
// (The one code-level extension point that is NOT config is the parser AST shape:
// the actual side reads the TSTS Go-port AST. A project using a different TS
// parser supplies a parser adapter. Everything else below is config.)

import { loadConventions } from "./conventions.mjs";

export const TSTS_PROFILE = {
  annotation: { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" },
  parser: {
    distRoot: "packages/tsts/dist/src/internal",
    freshnessSrcDirs: [
      "packages/tsts/src/internal/parser",
      "packages/tsts/src/internal/ast",
      "packages/tsts/src/internal/scanner",
      "packages/tsts/src/internal/core",
    ],
  },
  modules: {
    core: "packages/tsts/src/go/scalars.ts",
    compat: "packages/tsts/src/go/compat.ts",
  },
  // Go representation carriers -> exact generic name (resolved in `modules.compat`).
  bridge: {
    nilable: "GoNilable", pointer: "GoPtr", ref: "GoRef", slice: "GoSlice", array: "GoArray",
    map: "GoMap", chan: "GoChan", func: "GoFunc", interface: "GoInterface", unsafePointer: "GoUnsafePointer",
  },
  primitives: {
    keyword: { string: "string", any: "unknown" },
    core: {
      bool: "bool", byte: "byte", int: "int", int8: "sbyte", int16: "short",
      int32: "int", int64: "long", uint: "uint", uint8: "byte", uint16: "ushort",
      uint32: "uint", uint64: "ulong", uintptr: "nuint", float32: "float", float64: "double",
    },
    compat: { rune: "GoRune", error: "GoError", complex64: "GoComplex64", complex128: "GoComplex128" },
  },
  constantRepresentations: {
    bigintBasics: ["uint64"],
    bigintNamedTypes: [],
  },
  // Stdlib/runtime package -> facade module path. {importPath} is the full Go
  // import path (e.g. sync/atomic -> packages/tsts/src/go/sync/atomic.ts).
  facadeTemplate: "packages/tsts/src/go/{importPath}.ts",
  conventions: {
    goConstraintId: "packages/tsts/src/go/compat.ts::GoConstraint",
  },
  jsonTags: {
    contractModules: ["packages/tsts/src/internal/json/json.ts"],
  },
};

function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v) && [Object.prototype, null].includes(Object.getPrototypeOf(v));
}

function deepMerge(base, override) {
  if (override === undefined) return base;
  if (!isPlainObject(override)) return override;
  const out = { ...base };
  for (const [k, v] of Object.entries(override)) {
    out[k] = isPlainObject(v) && isPlainObject(base?.[k]) ? deepMerge(base[k], v) : v;
  }
  return out;
}

export function loadProfile(config) {
  const override = config?.signatureCheck === undefined ? {} : config.signatureCheck;
  requireKnownKeys(override, new Set(Object.keys(TSTS_PROFILE)), "signatureCheck");
  for (const [key, allowed] of [
    ["annotation", ["tag", "idSeparator", "methodNameJoin"]],
    ["parser", ["distRoot", "freshnessSrcDirs"]],
    ["modules", ["core", "compat"]],
    ["bridge", ["nilable", "pointer", "ref", "slice", "array", "map", "chan", "func", "interface", "unsafePointer"]],
    ["primitives", ["keyword", "core", "compat"]],
    ["constantRepresentations", ["bigintBasics", "bigintNamedTypes"]],
    ["conventions", ["goConstraintId"]],
    ["jsonTags", ["contractModules"]],
  ]) {
    if (override[key] !== undefined) requireKnownKeys(override[key], new Set(allowed), `signatureCheck.${key}`);
  }
  const profile = deepMerge(TSTS_PROFILE, override);
  validateProfile(profile);
  return profile;
}

function requireKnownKeys(value, allowed, label) {
  requirePlainRecord(value, label);
  const unknown = Reflect.ownKeys(value).filter((key) => typeof key !== "string" || !allowed.has(key)).map(String).sort();
  if (unknown.length > 0) throw new Error(`${label} contains unknown current-contract key(s): ${unknown.join(", ")}`);
}

function validateProfile(profile) {
  requireKnownKeys(profile, new Set(Object.keys(TSTS_PROFILE)), "signatureCheck");
  requireStringRecord(profile.annotation, "signatureCheck.annotation", ["tag", "idSeparator", "methodNameJoin"]);
  requireStringRecord(profile.modules, "signatureCheck.modules", ["core", "compat"]);
  requireStringRecord(profile.bridge, "signatureCheck.bridge", ["nilable", "pointer", "ref", "slice", "array", "map", "chan", "func", "interface", "unsafePointer"]);
  requirePlainRecord(profile.parser, "signatureCheck.parser");
  requireNonEmptyString(profile.parser.distRoot, "signatureCheck.parser.distRoot");
  requireStringArray(profile.parser.freshnessSrcDirs, "signatureCheck.parser.freshnessSrcDirs");
  requirePlainRecord(profile.primitives, "signatureCheck.primitives");
  for (const key of ["keyword", "core", "compat"]) requireStringRecord(profile.primitives[key], `signatureCheck.primitives.${key}`);
  requirePlainRecord(profile.constantRepresentations, "signatureCheck.constantRepresentations");
  requireStringArray(profile.constantRepresentations.bigintBasics, "signatureCheck.constantRepresentations.bigintBasics");
  requireStringArray(profile.constantRepresentations.bigintNamedTypes, "signatureCheck.constantRepresentations.bigintNamedTypes");
  validateFacadeTemplate(profile.facadeTemplate);
  loadConventions(profile.conventions);
  requirePlainRecord(profile.jsonTags, "signatureCheck.jsonTags");
  requireStringArray(profile.jsonTags.contractModules, "signatureCheck.jsonTags.contractModules");
}

function validateFacadeTemplate(value) {
  requireNonEmptyString(value, "signatureCheck.facadeTemplate");
  const placeholder = "{importPath}";
  const first = value.indexOf(placeholder);
  if (first < 0 || first !== value.lastIndexOf(placeholder)) {
    throw new Error("signatureCheck.facadeTemplate must contain exactly one {importPath} placeholder");
  }
  const remainder = `${value.slice(0, first)}${value.slice(first + placeholder.length)}`;
  if (remainder.includes("{") || remainder.includes("}")) {
    throw new Error("signatureCheck.facadeTemplate contains an unsupported placeholder");
  }
}

function requireStringRecord(value, label, exactKeys = undefined) {
  requirePlainRecord(value, label);
  if (exactKeys !== undefined) {
    requireKnownKeys(value, new Set(exactKeys), label);
    const missing = exactKeys.filter((key) => !Object.hasOwn(value, key));
    if (missing.length > 0) throw new Error(`${label} is missing current-contract key(s): ${missing.join(", ")}`);
  }
  for (const [key, entry] of Object.entries(value)) requireNonEmptyString(entry, `${label}.${key}`);
}

function requireStringArray(value, label) {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string" || entry.length === 0) || new Set(value).size !== value.length) {
    throw new Error(`${label} must be an array of unique non-empty strings`);
  }
}

function requireNonEmptyString(value, label) {
  if (typeof value !== "string" || value.length === 0) throw new Error(`${label} must be a non-empty string`);
}

function requirePlainRecord(value, label) {
  if (!isPlainObject(value) || Reflect.ownKeys(value).some((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
  })) throw new Error(`${label} must be a plain enumerable own-data-property object`);
}
