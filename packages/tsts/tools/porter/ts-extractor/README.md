# Signature & type-equivalence checker

`porter sig-check` compares every ported `@tsgo-unit`'s **actual** TS signature
(parsed from the `.ts` file) against the signature **derived from the Go** source
it claims to port. It closes the gap where a hand-edited TS signature can drift
while the Go hash, `tsc` build, and conformance baselines all stay green.

```
node packages/tsts/tools/porter/porter.mjs sig-check [--id <glob>] [--json] [--no-gate]
# or
npm run porter:sig-check
```

`--id <glob>` scopes to matching unit ids; `--json` prints the full machine
report; `--no-gate` exits 0 regardless (local exploration). Without `--no-gate`
the command exits non-zero when mismatches remain. `porter verify` always runs
the same signature check as a hard gate.

## How it works

- **Metadata ownership** (`declaration-metadata.mjs`): initializes TSTS's lazy
  JSDoc parser and accepts metadata only from parser-proven JSDoc attached to the
  exact top-level declaration. Text in strings, ordinary comments, and function
  bodies is never metadata. Duplicate, malformed, orphaned, non-leading, or
  misplaced tags fail hard.
- **Actual side** (`extract-signatures.mjs` + `ast-signatures.mjs`): parses each
  ported `.ts` with TSTS's own compiled parser and builds a canonical structured
  type descriptor per unit. Interfaces and aliases are type-only, functions are
  value-only, classes and enums are dual, and namespace identities remain
  separate from both. Explicit exports shadow stars, same-origin star paths
  coalesce, true ambiguities fail, and `export *` excludes `default`. Relative
  modules must exist, namespace/default aliases resolve transitively, and all
  source ranges are read with TS-Go's UTF-8-aware node-text API.
- **Constant side** (`constant-environment.mjs`): resolves only identifier-bound
  module/namespace `const` declarations, enum members, and top-level default
  value expressions, on demand, through exact local/default/named/star and
  namespace export routes. It never scans an implementation body or promotes a
  `let`, `var`, or binding pattern into a declaration constant.
- **Expected side** (`expected-from-go.mjs`): builds the same descriptor shape
  directly from the Go extractor's structured type model, resolving each Go type
  to the TS module where its `@tsgo-unit` actually lives (split-aware).
- **Compare** (`sig-check.mjs`): structural equality (`ast-signatures.typesEqual`)
  with re-export-aware identity. Only exact, constraint-scoped spelling mappings
  are global. Runtime representation differences require local snapshotted
  overrides on every affected declaration.

## Declaration-Constant Contract

`evaluateTypeScriptConstant` always returns one exact record:

```text
{ status: "known", value: { kind: K, value: V } }
{ status: "missing", reason: string }
{ status: "unsupported", astKind: string, reason: string }
```

The keys shown are the complete own-data-property set for each variant. `reason`
and `astKind` must be non-empty. A `known.value` has exactly `kind` and `value`,
with one of these pairs: `string`/string, `number`/number, `bigint`/bigint,
`boolean`/boolean, `null`/`null`, or `undefined`/`undefined`. Unknown statuses,
missing or additional keys, accessors, non-plain records, and kind/value
mismatches throw at the boundary. They are not converted to `unsupported`.

`missing` means only that the declaration initializer is absent. `unsupported`
means a present initializer cannot be represented by the grammar below or a
referenced declaration constant has no exact route. A value environment's
`get(path)` returns one of those records, or JavaScript `undefined` when `path`
is not a declaration-semantic constant binding.

The closed expression grammar is:

- string, no-substitution template, numeric, bigint, boolean, and `null`
  literals;
- parentheses, `as`, type assertions, `satisfies`, and non-null wrappers;
- identifiers plus lexical property and element paths;
- template and conditional expressions;
- prefix `!`, `+`, `-`, and `~`;
- `+`, `-`, `*`, `/`, `%`, `**`, `<<`, `>>`, `>>>`, `&`, `|`, `^`, equality,
  relational, `&&`, `||`, and `??` binary operations with JavaScript primitive
  semantics and lazy branch selection.

For a TS-Go `PropertyAccessExpression`, the receiver comes from `Expression` and
the property identifier comes only from the schema's lower-case `name` field.
`Values.Second` therefore resolves the lexical path `Values.Second`; there is no
alternate-field fallback and no runtime property read. Element access similarly
requires a declaration-reference receiver and a known string, number, or bigint
key.

Only declaration consumers invoke this evaluator: `const` and enum values,
top-level default value expressions, parameter defaults, and computed declaration
names. Calls, `new`, object/array/function/class expressions, and all function,
method, accessor, constructor, and class-static-block bodies are outside the
grammar. Porter parses those bodies only as opaque syntax needed to preserve
declaration boundaries.

Before comparison, every declaration, callable, parameter, type parameter, and
type descriptor must satisfy the one current schema: plain enumerable own data
properties, every required field present, and no unknown field. Signature
comparison then covers declaration kind/modifiers/fragments, overload roles and
order, parameter names/roles/modifiers/defaults/optionality/rest position,
return annotation policy, lexical generic bindings/modifiers/constraints/
defaults, heritage, members, value declaration shape/type, enums, aliases,
unresolved identities, and unsupported syntax. Parameter defaults are signature
semantics. Value declaration order has its own exact `value-order` aspect. The
separate `initializer` aspect applies only to exact top-level Go `constGroup`
values; it cannot waive parameter or member shape. Invalid schemas and metadata
evidence are never waivable.

## Configuration — `signatureCheck` in `porter.config.json`

All Go→TS mapping knowledge is config, defaulting to the tsts profile in
`profile.mjs`. Override any of it under `signatureCheck`:

```jsonc
"signatureCheck": {
  "namedTypeMappings": {
    "example.com/native.Event": { "module": "src/native/events.ts", "name": "HostEvent" }
  },
  // Go->TS mapping (defaults shown in profile.mjs; override per project):
  "modules":   { "core": "packages/tsts/src/go/scalars.ts", "compat": "packages/tsts/src/go/compat.ts" },
  "bridge":    { "pointer": "GoPtr", "slice": "GoSlice", "array": "GoArray", "map": "GoMap", "chan": "GoChan" },
  "primitives":{ "keyword": { "string": "string", "any": "unknown" }, "core": { "int": "int", "uint64": "ulong" }, "compat": { "error": "GoError" } },
  "stdlibTypes": { "iter.Seq": "GoSeq" },
  "facadeTemplate": "packages/tsts/src/go/{importPath}.ts",
  "annotation": { "tag": "@tsgo-unit", "idSeparator": "::", "methodNameJoin": "_" },
  "parser": { "distRoot": "packages/tsts/dist/src/internal", "freshnessSrcDirs": ["…/parser", "…/ast", "…/scanner", "…/core"] },

  // Exact source-constraint spellings only:
  "conventions": {
    "goConstraintId": "packages/tsts/src/go/compat.ts::GoConstraint",
    "equivalences": [
      { "as": "go-comparable", "scope": "constraint", "match": [
        { "id": "name::comparable" },
        { "id": "packages/tsts/src/go/compat.ts::GoComparable" }
      ] }
    ]
  }
}
```

Per-unit signature acceptances are intentionally not configured here. They live
next to the declaration as local `@tsgo-override` metadata with full
`goSignature` and `tsSignature` snapshots. The verifier fails if either snapshot
drifts.

This checker is part of the TSTS Porter contract. It is not a general Go-to-TS
migration framework and does not infer implementation bodies or representation
changes.
