// Project profile: ALL Go->TS mapping knowledge the checker needs, so the engine
// stays generic and a different Go->TS port project runs by editing config only.
// `config.signatureCheck` deep-overrides these defaults; absent => tsts behavior.
//
// (The one code-level extension point that is NOT config is the parser AST shape:
// the actual side reads the TSTS Go-port AST. A project using a different TS
// parser supplies a parser adapter. Everything else below is config.)

import { loadConventions } from "./conventions.mjs";
import { descriptorShapeIssue, typeDescriptorChildren } from "./type-descriptors.mjs";

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
  // Go composite kinds -> bridge generic name (resolved in `modules.compat`).
  bridge: { pointer: "GoPtr", ref: "GoRef", slice: "GoSlice", array: "GoArray", map: "GoMap", chan: "GoChan" },
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
  // Qualified Go stdlib types that map to compat helpers (pkg.Name -> compat name).
  stdlibTypes: {
    "iter.Seq": "GoSeq", "iter.Seq2": "GoSeq2",
    "cmp.Ordered": "GoOrdered", "constraints.Ordered": "GoOrdered",
    "unsafe.Pointer": "GoUnsafePointer",
  },
  // Stdlib/runtime package -> facade module path. {importPath} is the full Go
  // import path (e.g. sync/atomic -> packages/tsts/src/go/sync/atomic.ts).
  facadeTemplate: "packages/tsts/src/go/{importPath}.ts",
  // Exact duplicate-declaration identities whose two full module/name IDs are
  // known to represent one Go-origin type. Terminal-name matching is forbidden.
  canonicalTypeAliases: {
    "packages/tsts/src/internal/ast/symbolflags.ts::SymbolFlags": "packages/tsts/src/internal/ast/generated/flags.ts::SymbolFlags",
    "packages/tsts/src/internal/ast/nodeflags.ts::NodeFlags": "packages/tsts/src/internal/ast/generated/flags.ts::NodeFlags",
    "packages/tsts/src/internal/ast/visitor.ts::NodeVisitor": "packages/tsts/src/internal/ast/spine.ts::NodeVisitor",
    "packages/tsts/src/internal/tsoptions/tsconfigparsing.ts::ExtendedConfigCache": "packages/tsts/src/internal/execute/tsc/extendedconfigcache.ts::ExtendedConfigCache",
  },
  // Exact Go named-type identities supplied by authored internal host-native
  // modules rather than tracked or generated mechanical-port declarations.
  namedTypeMappings: {},
  conventions: {
    goConstraintId: "packages/tsts/src/go/compat.ts::GoConstraint",
    equivalences: [
      {
        as: "go-comparable",
        scope: "constraint",
        match: [
          { id: "name::comparable" },
          { id: "packages/tsts/src/go/compat.ts::GoComparable" },
        ],
      },
    ],
  },
  // Ambient TypeScript/host globals that are intentional signature surface.
  // Everything else under global::/name::/unresolved:: remains a hard
  // unresolved-ref mismatch.
  allowedGlobals: ["Date", "ReadonlyMap", "Uint8Array"],
  jsonTags: {
    contractModules: ["packages/tsts/src/internal/json/json.ts"],
  },
  // External Go interface aliases whose zero value is nil and therefore may be
  // represented as GoPtr<Alias> in the TypeScript port.
  externalInterfaceMembers: {
    "io/fs.FileInfo": [
      { name: "Name", type: exactFunctionType({ t: "kw", kw: "string" }) },
      { name: "Size", type: exactFunctionType({ t: "ref", id: "packages/tsts/src/go/scalars.ts::int", args: [] }) },
      { name: "Mode", type: exactFunctionType({ t: "ref", id: "packages/tsts/src/go/io/fs.ts::FileMode", args: [] }) },
      { name: "ModTime", type: exactFunctionType({ t: "ref", id: "packages/tsts/src/go/time.ts::Time", args: [] }) },
      { name: "IsDir", type: exactFunctionType({ t: "ref", id: "packages/tsts/src/go/scalars.ts::bool", args: [] }) },
      { name: "Sys", type: exactFunctionType({ t: "kw", kw: "unknown" }) }
    ]
  },
  // Exact return/value types for authored Go facades. These are explicit
  // facade contracts, not name guesses; internal TS-Go symbols still resolve
  // from the Go snapshot.
  externalFunctionReturns: {
    "regexp.MustCompile": { module: "packages/tsts/src/go/regexp.ts", name: "Regexp" },
    "strings.NewReplacer": { module: "packages/tsts/src/go/strings.ts", name: "Replacer" },
    "reflect.TypeFor": { module: "packages/tsts/src/go/reflect.ts", name: "Type" },
  },
  externalValueTypes: {
    "fs.ErrInvalid": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "fs.ErrPermission": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "fs.ErrExist": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "fs.ErrNotExist": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "fs.ErrClosed": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "fs.SkipAll": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "fs.SkipDir": { module: "packages/tsts/src/go/compat.ts", name: "GoError" },
    "jsontext.BeginArray": { module: "packages/tsts/src/go/github.com/go-json-experiment/json/jsontext.ts", name: "Token" },
    "jsontext.BeginObject": { module: "packages/tsts/src/go/github.com/go-json-experiment/json/jsontext.ts", name: "Token" },
    "jsontext.EndArray": { module: "packages/tsts/src/go/github.com/go-json-experiment/json/jsontext.ts", name: "Token" },
    "jsontext.EndObject": { module: "packages/tsts/src/go/github.com/go-json-experiment/json/jsontext.ts", name: "Token" },
    "jsontext.Null": { module: "packages/tsts/src/go/github.com/go-json-experiment/json/jsontext.ts", name: "Token" },
    "math.MaxInt": { module: "packages/tsts/src/go/scalars.ts", name: "int" },
    "time.Millisecond": { module: "packages/tsts/src/go/time.ts", name: "Duration" },
  },
};

function exactFunctionType(ret) {
  return {
    t: "fn",
    params: [],
    ret,
    missingReturnType: false,
    returnTypePolicy: "required",
    typeParams: [],
    signatureModifiers: [],
  };
}

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
    ["bridge", ["pointer", "ref", "slice", "array", "map", "chan"]],
    ["primitives", ["keyword", "core", "compat"]],
    ["constantRepresentations", ["bigintBasics", "bigintNamedTypes"]],
    ["conventions", ["goConstraintId", "equivalences"]],
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
  requireStringRecord(profile.bridge, "signatureCheck.bridge", ["pointer", "ref", "slice", "array", "map", "chan"]);
  requirePlainRecord(profile.parser, "signatureCheck.parser");
  requireNonEmptyString(profile.parser.distRoot, "signatureCheck.parser.distRoot");
  requireStringArray(profile.parser.freshnessSrcDirs, "signatureCheck.parser.freshnessSrcDirs");
  requirePlainRecord(profile.primitives, "signatureCheck.primitives");
  for (const key of ["keyword", "core", "compat"]) requireStringRecord(profile.primitives[key], `signatureCheck.primitives.${key}`);
  requirePlainRecord(profile.constantRepresentations, "signatureCheck.constantRepresentations");
  requireStringArray(profile.constantRepresentations.bigintBasics, "signatureCheck.constantRepresentations.bigintBasics");
  requireStringArray(profile.constantRepresentations.bigintNamedTypes, "signatureCheck.constantRepresentations.bigintNamedTypes");
  requireStringRecord(profile.stdlibTypes, "signatureCheck.stdlibTypes");
  requireNonEmptyString(profile.facadeTemplate, "signatureCheck.facadeTemplate");
  if (!profile.facadeTemplate.includes("{importPath}")) throw new Error("signatureCheck.facadeTemplate must contain {importPath}");
  requireStringRecord(profile.canonicalTypeAliases, "signatureCheck.canonicalTypeAliases");
  for (const [source, target] of Object.entries(profile.canonicalTypeAliases)) {
    if (!source.includes("::") || !target.includes("::")) throw new Error("signatureCheck.canonicalTypeAliases entries must use full module/name identities");
  }
  validateNamedTypeMappings(profile.namedTypeMappings);
  loadConventions(profile.conventions);
  requireStringArray(profile.allowedGlobals, "signatureCheck.allowedGlobals");
  requirePlainRecord(profile.jsonTags, "signatureCheck.jsonTags");
  requireStringArray(profile.jsonTags.contractModules, "signatureCheck.jsonTags.contractModules");
  validateExternalInterfaceMembers(profile.externalInterfaceMembers);
  validateExternalReferences(profile.externalFunctionReturns, "signatureCheck.externalFunctionReturns");
  validateExternalReferences(profile.externalValueTypes, "signatureCheck.externalValueTypes");
}

function validateNamedTypeMappings(value) {
  requirePlainRecord(value, "signatureCheck.namedTypeMappings");
  for (const [identity, reference] of Object.entries(value)) {
    const separator = identity.lastIndexOf(".");
    if (separator <= 0 || separator === identity.length - 1 || /\s/.test(identity)) {
      throw new Error(`signatureCheck.namedTypeMappings key '${identity}' must be one full Go package.Type identity`);
    }
    requireStringRecord(reference, `signatureCheck.namedTypeMappings.${identity}`, ["module", "name"]);
  }
}

function validateExternalInterfaceMembers(value) {
  requirePlainRecord(value, "signatureCheck.externalInterfaceMembers");
  for (const [identity, members] of Object.entries(value)) {
    if (!Array.isArray(members)) throw new Error(`signatureCheck.externalInterfaceMembers.${identity} must be an array`);
    for (const [index, member] of members.entries()) {
      const label = `signatureCheck.externalInterfaceMembers.${identity}[${index}]`;
      requireKnownKeys(member, new Set(["name", "type"]), label);
      requireNonEmptyString(member.name, `${label}.name`);
      requireExactTypeDescriptor(member.type, `${label}.type`);
    }
  }
}

function validateExternalReferences(value, label) {
  requirePlainRecord(value, label);
  for (const [identity, reference] of Object.entries(value)) {
    const entryLabel = `${label}.${identity}`;
    requireStringRecord(reference, entryLabel, ["module", "name"]);
  }
}

function requireExactTypeDescriptor(value, label) {
  const issue = descriptorShapeIssue(value);
  if (issue !== undefined || value.t === "unsupported") throw new Error(`${label} is not an exact current type descriptor: ${issue ?? "unsupported descriptor"}`);
  for (const child of typeDescriptorChildren(value)) requireExactTypeDescriptor(child, label);
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
