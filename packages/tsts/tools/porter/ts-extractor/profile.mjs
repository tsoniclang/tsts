// Project profile: ALL Go->TS mapping knowledge the checker needs, so the engine
// stays generic and a different Go->TS port project runs by editing config only.
// `config.signatureCheck` deep-overrides these defaults; absent => tsts behavior.
//
// (The one code-level extension point that is NOT config is the parser AST shape:
// the actual side reads the TSTS Go-port AST. A project using a different TS
// parser supplies a parser adapter. Everything else below is config.)

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
    core: "@tsonic/core/types.ts",
    compat: "packages/tsts/src/go/compat.ts",
  },
  // Go composite kinds -> bridge generic name (resolved in `modules.compat`).
  bridge: { pointer: "GoPtr", slice: "GoSlice", array: "GoArray", map: "GoMap", chan: "GoChan" },
  primitives: {
    keyword: { string: "string", any: "unknown" },
    core: {
      bool: "bool", byte: "byte", int: "int", int8: "sbyte", int16: "short",
      int32: "int", int64: "long", uint: "uint", uint8: "byte", uint16: "ushort",
      uint32: "uint", uint64: "ulong", uintptr: "nuint", float32: "float", float64: "double",
    },
    compat: { rune: "GoRune", error: "GoError", complex64: "GoComplex64", complex128: "GoComplex128" },
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
  // One canonical module per GLOBALLY-UNIQUE type name that is declared in more
  // than one TS module (a generated copy + a hand-ported copy, or a brand +
  // full interface). Both declarations are the same logical (same Go-origin)
  // type; the checker collapses every reference to the canonical module. Narrow
  // and named — NOT broad module-path equivalence. Only add names that are
  // unique across the tree.
  canonicalTypes: {
    "SymbolFlags": "packages/tsts/src/internal/ast/generated/flags.ts",
    "NodeFlags": "packages/tsts/src/internal/ast/generated/flags.ts",
    "NodeVisitor": "packages/tsts/src/internal/ast/spine.ts",
    "ExtendedConfigCache": "packages/tsts/src/internal/execute/tsc/extendedconfigcache.ts",
  },
};

function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function deepMerge(base, override) {
  if (!isPlainObject(override)) return override ?? base;
  const out = { ...base };
  for (const [k, v] of Object.entries(override)) {
    out[k] = isPlainObject(v) && isPlainObject(base?.[k]) ? deepMerge(base[k], v) : v;
  }
  return out;
}

export function loadProfile(config) {
  return deepMerge(TSTS_PROFILE, config?.signatureCheck ?? {});
}
