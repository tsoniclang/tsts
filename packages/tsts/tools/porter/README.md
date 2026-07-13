# TSTS Porter Tooling

This directory is the mechanical-port backbone for TSTS. The tooling reads the real vendored TS-Go checkout, extracts Go declarations with Go's own parser, and compares those extracted units against TypeScript files that carry embedded `@tsgo-unit` metadata.

## Scope Boundary

Porter is an authoritative **inventory, declaration-contract verifier, and upgrade-delta tool** for the maintained Go-to-TypeScript mechanical port. It proves the pinned source identity, complete Go declaration inventory, source-signature hashes, generated-artifact ownership, canonical `go/types` signatures, exact `go/constant` values, and every reviewed local exception. It reports declaration changes; it does not decide how an upstream implementation should be rewritten in TypeScript.

Porter is deliberately not a Go-to-TypeScript translator. It must not infer implementation bodies, rewrite authored TypeScript, automatically re-stamp stale metadata, accept a scaffold as an implementation, or treat an orphan/missing pair as a rename. `scaffold` is optional, non-authoritative bootstrap output: it creates a traceable throwing/type-only placeholder for human implementation, while strict verification continues to reject the stub.

The scope is closed at the declaration boundary. Porter captures functions and methods, receivers, parameters, results, variadics, named types and aliases, structs, interfaces, type parameters, complete constraints and type sets, constants, variables, array lengths, channel directions, type-intrinsic nilability, embedding, and struct tags. Named Go multi-results map to labeled TypeScript tuple elements. A single Go result binding has no corresponding TypeScript return-type syntax, so its binding name remains pinned by the unit's exact Go declaration `sigHash` while the TypeScript descriptor independently proves its scalar return type. Nilability is recorded by `go/types` on every canonical type occurrence; it is never inferred from TypeScript optional syntax or carrier spelling. Operation-bearing slice, map, and channel carriers encode their nil state as valid carrier values because Go permits operations such as `len`, range, lookup, delete, and blocked channel selection on nil values. Pointer, function, interface, and unsafe-pointer carriers use `undefined` because dereference, invocation, or member selection on nil is invalid. The Go declaration checker runs with `go/types.Config.IgnoreFuncBodies = true`. The TypeScript extractor traverses declaration syntax only. Implementation bodies are parsed only to establish source boundaries; Porter never visits, hashes, copies, or gates on them.

Generic operations that need erased runtime type semantics use one explicit
runtime dictionary contract. The generated compatibility module exports
`GoZeroFactory<T>`, `GoEquality<T>`, shared zero factories for common carriers,
and exact equality operations. An authored generic implementation that
materializes `var zero T` or compares erased values may accept the required
dictionaries as a reviewed local `runtime-representation` signature override.
It must not guess from a value, type name, constructor, or source spelling. A
dictionary is attached only to the generic operation that needs erased type
evidence; ordinary map and slice
carriers do not carry mandatory descriptor fields. This keeps the JavaScript
fast path direct and leaves a native target free to monomorphize the dictionary
away. Porter verifies the exact declared dictionary parameters and then checks
the complete projected Go signature, but, consistent with its declaration-only
boundary, never inserts factories by scanning implementation bodies.

## Nilability Carriers

Nilability has one declaration contract. `GoPtr<T>`, `GoRef<T>`, `GoFunc<F>`,
and `GoInterface<I>` use `GoNilable<T> = T | undefined`; `GoError` is
`GoInterface<Error>`. Operation-bearing `GoSlice<T>`, `GoMap<K, V>`, and
`GoChan<T, D>` preserve nil as valid carrier state so their legal nil
operations remain available. Parameters and properties remain required syntax.
Porter never substitutes a question mark or an extra `GoPtr`.

Direct anonymous `func` and `interface` value types become `GoFunc<F>` and
`GoInterface<I>`. A declared Go interface remains a TypeScript `interface` so
its declaration kind, members, and heritage stay exact. At a value occurrence,
declaration-RHS evidence identifies the named interface and produces
`GoInterface<DeclaredInterface>`. An alias whose RHS already applies that
carrier remains a canonical alias reference instead of being wrapped twice.
Top-level Go function and method declarations are callable declarations, not
nilable function values, and therefore are never wrapped in `GoFunc`.

Pointer lowering also follows representation evidence. For example, the Go
parameter `differsOnlyInMap *bool` is a mutable scalar cell and maps to
`GoRef<bool>`; `GoRef<T>` is itself nilable. A pointer to direct aggregate object
storage may use `GoPtr<T>`. A pointer to a scalar or replaceable header/reference
value requires a distinct addressable slot: `*[]int` becomes
`GoRef<GoSlice<int>>`, and `**Node` becomes `GoRef<GoPtr<Node>>`. Named pointees
are resolved through the exact profile-specific declared type RHS before the
carrier is selected. A pointer through an open or mixed type parameter also uses
the addressable-slot carrier `GoRef<T>`: the generic port must construct a value
cell or a storage-backed getter/setter cell, rather than guessing whether a
particular instantiation can use direct aggregate object identity. Direct-kind
nilability contradictions, missing named RHS, and absent explicit
facade/profile evidence are hard errors.

Expected Go constants and inferred top-level variable types come directly from `go/types` and `go/constant`; Porter never reconstructs them from Go source text. Actual TypeScript declaration initializers use the closed evaluator contract below. Unsupported declaration/type variants fail rather than becoming approximate evidence. Build-profile selection covers every declaration-bearing source file and fails if a profile changes a declaration contract.

Every accepted divergence in a mechanically ported `@tsgo-unit` is local to that TypeScript declaration through `@tsgo-override`, names a registered category, gives a durable reason, and snapshots the exact Go and TypeScript contract for the allowed aspect. External Go facade storage has the separate closed policy described below because it has no local TS-Go source unit. There is no global waiver and no compatibility fallback.

## TypeScript Declaration Constants

Every TypeScript declaration-constant attempt returns exactly one discriminated result:

- `known`: `{ status: "known", value: { kind, value } }`, where the nested record has exactly `kind` and `value`. The allowed pairs are `string`/string, `number`/number, `bigint`/bigint, `boolean`/boolean, `null`/`null`, and `undefined`/`undefined`.
- `missing`: `{ status: "missing", reason }`, used only when the declaration initializer is absent.
- `unsupported`: `{ status: "unsupported", astKind, reason }`, used when a present initializer is outside the closed grammar or a declaration reference cannot be resolved.

All listed fields are own data properties, `reason` and `astKind` are non-empty strings, and no other keys are accepted. A malformed result is a contract error, not an `unsupported` result. An indexed environment returns `undefined` only when a name has no declaration-semantic constant route; that is distinct from every evaluation result.

Indexed resolution includes identifier-bound module/namespace `const` declarations, enum members, and top-level default value expressions. Descriptor evaluation also covers parameter defaults and computed declaration names. Property and element access resolve lexical declaration paths such as `Values.Second`; they do not execute an object read. `let`, `var`, binding patterns, calls, runtime object construction, and function, method, accessor, constructor, or static-block bodies are outside this contract. The exact expression grammar and schema fields are documented in `ts-extractor/README.md`.

## Commands

- `node packages/tsts/tools/porter/porter-cli.mjs delta --from <old-tsgo-root> --to <new-tsgo-root> --out <new-evidence-dir>` scans both explicitly named clean Git checkouts twice, fails on nondeterminism, and atomically writes complete tracked-tree/Go-file/raw-unit/active-unit/semantic-state deltas without changing either checkout. Unit deltas distinguish source-signature text, canonical profile-aware `go/types` declaration semantics, exact `go/constant` values, and effective policy changes. The CLI verifies the clean Porter checkout before dynamically loading command modules. The evidence carries SHA-1 commit objects whose root trees are mechanically reconstructed from every tracked entry for both source revisions and the Porter implementation revision, complete generated-source mechanism/coverage evidence, and the full normalized extractor environment. Git index flags that can hide worktree state are rejected. Source paths must be canonical UTF-8. Body-only edits remain visible in tracked-tree and Go-file evidence but never become declaration-unit drift. `--out` must have one existing real parent outside both source checkouts. Evidence directories are immutable and are never overwritten; a completion marker is published last.
- `node packages/tsts/tools/porter/porter-cli.mjs delta-verify --dir <evidence-dir> --from <old-tsgo-root> --to <new-tsgo-root>` independently rechecks both clean source trees, reruns each extractor twice, reconstructs both Git commit trees, recomputes every artifact, and then validates the exact inventory, byte lengths and canonical UTF-8, SHA-256 envelope, policy/mechanism evidence, snapshots, report, and Markdown. Submitted snapshots and tree listings are never treated as trusted source evidence.
- `npm run porter:scan` extracts a full TS-Go snapshot into `.temp/porter/tsgo-snapshot.json`.
- `npm run porter:status` extracts TS-Go, scans TypeScript metadata, and writes `.temp/porter/status.json` plus `.temp/porter/status.md`. It does not execute declaration subaudits, so every signature, facade, external-package, storage-policy, relation, ownership, unmatched-TypeScript, and JSON-tag subaudit is recorded separately as `not-run`; absent evidence is never rendered as zero findings.
- `npm run porter:verify` always fails on missing/stub/stale/orphan/duplicate units, untracked TypeScript, generated-artifact drift, source-pin drift, an invalid override, any incomplete declaration subaudit, or a filtered signature selection. There is no weaker verification mode. Source read/parse failures stop extraction before a snapshot exists. Its JSON and Markdown reports retain every concrete subaudit inventory row, not only aggregate counts.
- `npm run porter:scaffold -- --limit 25` previews missing-unit scaffolds. Add `-- --write` to create files.
- `npm run porter:scaffold-all` creates or appends scaffolds for every active missing Go unit, refreshes porter status, and fails if any active unit remains missing.
- `npm run porter:facades -- --out packages/tsts/src` regenerates the checked-in Go compatibility/facade layer from the full TS-Go snapshot. Existing differing files are never overwritten unless `-- --force` is also supplied.
- `npm run porter:facades -- --check` verifies the checked-in Go compatibility/facade layer is exactly the deterministic output for the current TS-Go snapshot.
- `npm run porter:large-files` verifies every active literal-port Go file over the configured LOC threshold has a semantic split plan.
- `npm run porter:large-files -- --write-draft` writes a draft semantic split plan from the current TS-Go declaration inventory. Existing differing plans are never overwritten unless `-- --force` is also supplied. Treat this as a bootstrap command, not the normal update path for a reviewed plan.
- `npm run porter:skeleton-check` renders the complete missing-unit skeleton corpus into the fixed, sentinel-owned `.temp/porter/skeleton` directory and runs `tsc --noEmit` against it. The command never accepts an output path and refuses to replace a directory without its exact ownership sentinel. Use `-- --no-compile` to retain the rendered corpus without compiling it, or `-- --no-emit-temp` to skip skeleton corpus emission and compilation.

Porter options are closed per command. Boolean options never accept values such as `true` or `false`; use the command's explicit flag, including negative flags such as `--no-compile`. Unknown, duplicate, missing-value, conflicting, and command-inapplicable options are errors.

## Embedded Metadata

Each ported unit carries one JSON metadata line:

```ts
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/debug/debug.go::func::Fail","kind":"func","status":"implemented","sigHash":"..."}
 */
```

The ID already contains the Go module, Go file path, artifact kind, and qualified Go name. Do not repeat filename metadata in generated TypeScript files. When a large Go file is split into many TypeScript files, the split is represented in `packages/tsts/porter.large-splits.json`, not by duplicating path metadata in every unit.

Metadata ownership is parser-defined, not text-scanned. `@tsgo-unit` must be the
leading tag of the JSDoc attached by TSTS to the exact top-level declaration;
`@tsgo-override`, when present, immediately follows it in the same JSDoc.
Marker-like text in strings, ordinary comments, and implementation bodies is
ignored. Porter parses implementation bodies only as opaque syntax needed to
establish declaration boundaries and never traverses them for semantics.

## Status Model

- `missing`: the Go unit has no TypeScript `@tsgo-unit`.
- `stub`: the TypeScript unit exists but intentionally throws or contains type-only placeholder shape.
- `implemented`: a maintainer has attested that the TypeScript unit implements the recorded Go declaration.
- `stale`: the Go source-signature hash changed since the TypeScript unit was written. Canonical declaration drift is additionally enforced by the full signature audit.
- `orphan`: a TypeScript `@tsgo-unit` refers to no current Go unit.
- `untracked TS file`: a TypeScript source file exists under `src/` but carries no `@tsgo-unit`.
- `excluded`: the Go unit is explicitly outside the active standalone compiler porter scope and must not be scaffolded. Go tests, language-service/editor surfaces, generator programs, and generated artifacts owned by a named deterministic generator are excluded from production scaffold coverage even though they remain visible in the inventory.
- `forbidden TS file`: a TypeScript source file exists in a path that must not exist in the active standalone compiler tree.

Every in-scope generated Go file must match exactly one `generatedSourcePolicies` entry. Generated runtime behavior such as stringers and mocks remains active `literal-port` work with normal `@tsgo-unit` tracking. Schema/catalog/table output is excluded only when the policy names the deterministic generator that reproduces and byte-checks it. A new, stale, ambiguous, or over-broad generated-source policy fails `porter:verify`. Test, host-native, out-of-scope, and manual-required categories are likewise explicit; they are not silent omissions.

## Source Pin And Reproducibility

`packages/tsts/tools/porter/source-pin.json` is Porter's machine-readable source
of truth for its current input. Keeping it with the tool allows a Porter-only
change to validate the existing vendored source without changing that source.
It pins:

- the TS-Go Git revision and module identity,
- every nested source checkout, including the TypeScript revision,
- every copied schema file, its upstream path, and its SHA-256 digest,
- the exact Go extractor toolchain.

Normal Porter commands require clean source and nested worktrees, exact
checked-out revisions, byte-identical schema copies, matching source-pin
documentation, and the pinned extractor toolchain. The toolchain pin includes
the Go executable digest and a complete GOROOT tree digest. Extraction runs with
a scrubbed environment, networking disabled, module updates forbidden, and
`CGO_ENABLED=0`. The current source-pin schema is intentionally Linux/amd64
only.

The GOROOT digest covers relative path, entry kind, POSIX permission bits,
regular-file bytes, and symlink targets. Device/inode, ownership, link count,
size, and nanosecond timestamps are checked for mutation during a run. ACLs,
extended attributes, and file capabilities are outside the semantic-input
digest and therefore outside the current threat model. The snapshot has no
wall-clock field and records complete source-file hashes in addition to exact
declaration semantics. Nested Git worktrees are excluded
from the Go walk and audited separately through the source pin.

## Declaration Overrides

Porter hashes the exact upstream source signature and compares canonical
declaration semantics; it never hashes either implementation body. Body-only
changes remain visible at the pinned-tree and Go-file levels, while deciding
whether or how to port them belongs to ordinary architecture review and tests.
There is no body exception because there is no body contract.

Override metadata is local-only. Do not add per-unit override ledgers to
`porter.config.json`.

`allow` accepts only declaration-contract aspects: `"signature"`,
`"initializer"`, and `"value-order"`. Any other aspect is invalid.
`signature` includes parameter-default syntax and value declaration types.
`initializer` is narrower: it applies only to snapshotted top-level `constGroup`
values. Class/member implementation initializers and all implementation bodies
are outside Porter and cannot acquire an override path.

An ordinary Go `var` still contributes its exact declaration kind, modifiers,
name, order, and inferred type. Its TypeScript initializer expression is an
implementation body and is not compared. In contrast, Go `const` values and
parameter defaults are declaration semantics and remain exact.

Signature overrides must capture both current snapshots locally:

```ts
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan","kind":"func","status":"implemented","sigHash":"..."}
 * @tsgo-override {"category":"runtime-performance","allow":["signature"],"reason":"Use a target-native source text carrier.","goSignature":"func{source:(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/scanner/scanner.ts::Scanner>,string)=>void}","tsSignature":"func{implementation:(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/scanner/scanner.ts::Scanner>,packages/tsts/src/internal/core/source_text.ts::SourceText)=>void}"}
 */
```

The signature checker recomputes these snapshots from the pinned Go source and
the actual TypeScript declaration. Any upstream Go drift or local TS signature
drift invalidates the override and fails `porter:verify`.

One narrower signature contract exists for erased generic execution that must
materialize a Go zero value. JavaScript cannot construct `var zero T` from an
erased type parameter, so the implementation receives an explicit
`GoZeroFactory<T>` dictionary after all ordinary fixed parameters. For a Go
variadic, the dictionary sits immediately before the final TypeScript rest
parameter so that rest parameter remains valid syntax:

```ts
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/collections/ordered_map.go::method::OrderedMap.Get","kind":"method","status":"implemented","sigHash":"..."}
 * @tsgo-override {"category":"runtime-representation","allow":["signature"],"reason":"Erased generic execution receives an explicit static zero-value dictionary for the missing-result path.","runtimeDictionaries":[{"kind":"zero-value","parameter":"zeroValue","typeParameter":"V"}]}
 */
export function Get<K, V>(map: OrderedMap<K, V>, key: K, zeroValue: GoZeroFactory<V>): V;
```

This is not a general signature waiver. Porter proves that each declared
dictionary is a required, non-rest, initializer-free parameter in the one
canonical dictionary slot—at the end, or immediately before a final rest—with
the exact name, exact declared dictionary identity, and exact lexical
type-parameter binding stated in metadata. A `zero-value` dictionary must be
`GoZeroFactory<T>`; an `equality` dictionary must be `GoEquality<T>`. Porter
removes only those declared dictionaries from a temporary descriptor and then
performs the complete ordinary Go/TS
declaration comparison. A changed ordinary parameter, result, constraint,
modifier, overload, dictionary order, or dictionary type fails the gate. The
metadata may use only category `runtime-representation` and exactly
`allow:["signature"]`; broad snapshots and additional allowances cannot coexist
with it.

The comparison follows the mechanical port's declaration boundary:

- A Go struct type unit is its data layout: declared fields plus required,
  mutable `__tsgoEmbeddedN` storage for embedded fields. Receiver methods are
  independent Go units and are compared with their standalone TypeScript
  functions; they are never injected into the struct's TypeScript interface.
- A Go interface's embedded interface types become exact TypeScript `extends`
  heritage types, while declared methods remain members of the expected
  TypeScript interface. Type-set embeddings retain their exact constraint
  representation instead of being treated as heritage.
- Inline Go interface type expressions retain embedded types as exact
  intersections; no name-based flattening or optional carrier is accepted.
- Method promotion from an embedded struct does not create TypeScript object
  properties. Calls continue through the separately verified method adapters.
- An embedded interface is different: its method contract is expanded even
  when embedded by a struct, because the containing runtime object must satisfy
  that structural interface.

This distinction prevents a type-level override from hiding missing or changed
method units, while still checking every method exactly once.

## Go Struct-Tag Contract

Snapshot schema 6 preserves every declaration-visible Go struct field's export status, exact raw
tag text, and ordered key/value tag entries. The extractor parses tags once at
the Go AST boundary and fails on malformed syntax; downstream checks never
re-scan source text or infer JSON names from TypeScript spelling. Function-local
anonymous structs are implementation-body details and are intentionally outside
Porter's declaration contract.

Every active Go struct with a `json` tag has exactly one colocated, type-only
`JsonFieldNamesForGoStructContract<LocalType, GoUnitId, FieldMap>`. Porter binds
the local TypeScript type, literal Go unit ID, and complete field-map type.
Runtime attachment, codec ownership, omission execution, and emitted JSON are
product-test responsibilities outside Porter.

The declaration check compares default and explicit names, ignored fields,
`omitzero`, and `omitempty` independently. It rejects missing, extra, duplicate,
orphaned, dynamic, unsupported-option, and embedded-field contracts. The
contract type must resolve through an explicit ESM type import from the
configured contract module; terminal-name matching is not accepted. Porter
records `omitzero` and `omitempty` as distinct declaration options without
inferring how any runtime implements them. JSON-tag declaration failures are a
separate hard verification gate and cannot be suppressed with signature
overrides.

## Out-of-Scope Language-Service Surface

The standalone compiler porter excludes the language-service/editor surface completely:

- `internal/ls/**`
- `internal/lsp/**`
- `internal/api/**`
- `internal/project/**`
- `internal/format/**`
- `cmd/tsgo/lsp.go`
- fourslash/editor harness paths
- upstream repository tools under `_tools/**`
- upstream test harness/helper paths such as `internal/testutil/**`, `internal/testrunner/**`, and `internal/execute/tsctests/**`

These files may exist only in the vendored TS-Go checkout as upstream reference input. They must not exist under `packages/tsts/src`. The porter reports matching Go units as `excluded`, and `porter:verify` fails if matching TypeScript files appear in the active source tree.

## Generated Go Facades

The porter generates `packages/tsts/src/go/**` from the current TS-Go corpus. This is the only boundary for Go standard-library and third-party packages. Generated TSTS source must import these facades instead of using untyped `GoExternal` placeholders.

Each generated artifact carries deterministic file-level metadata:

```ts
// Code generated by TSTS porter. DO NOT EDIT.
// @tsgo-generated {"schemaVersion":1,"kind":"go-facade","generator":"porter:facades","sourceRevision":"...","path":"go/io.ts","contentHash":"..."}
```

Only an artifact with one valid, registry-matching `@tsgo-generated` record may
supply an untracked generated type identity to signature comparison. Porter
never resolves a missing Go declaration identity from an authored same-named
TypeScript export.

Generated artifacts are not hand-editable. `porter:verify` fails on:

- missing generated artifacts,
- stale generated artifacts whose text differs from current deterministic output,
- orphan generated artifacts no longer produced by the current TS-Go snapshot,
- untracked files under `packages/tsts/src/go/**` without `@tsgo-generated`,
- malformed generated metadata.

Facade generation has declaration inputs only:

- `snapshot.semantic.dependencyTypeDeclarations` is the exact, profile-aware transitive closure of non-active named types reachable from active local Go declarations. It includes external-package types and excluded module-local dependency types. Every entry is a type declaration; package functions, constants, variables, builtins, role markers, and unused package exports are invalid in this collection.
- Generated facade modules export only reachable external-package type declarations. Excluded module-local dependency types must use an exact reviewed `go-type-storage` relation and are never regenerated as external facades. Generated modules never reproduce a dependency package's callable/value API, and the extractor never seeds this closure from every exported package object.
- External type identity, alias state, type parameters and constraints, declaration RHS/underlying type, intrinsic nilability, interface composition, and method signatures come only from the snapshot's `go/types` evidence.
- External facade policy may choose only the exact Go object ID's TypeScript module/name, authored-versus-generated storage, and reviewed runtime adaptation. Every adaptation requires a specific durable reason. Policy cannot provide implementation bodies or restate Go names, arity, members, embeddings, or types.
- Every runtime adaptation snapshots all canonical external Go declaration variants and their profile sets with `goDeclarationHash`. A pin that changes fields, underlying type, methods, constraints, profile coverage, or any other declaration evidence invalidates the adaptation even when the public TypeScript storage still happens to type-check.
- A Go method stored as a top-level authored TypeScript function requires one exact `methodBindings` row: canonical Go method ID, TypeScript export name, and the receiver parameter's local TypeScript name. The function signature is still rendered only from Go evidence, including the promoted receiver type; policy cannot restate parameters, generics, or results.
- Type identities in active Go signatures produce typed facades such as `io.Writer`, `io.Reader`, `time.Duration`, and `context.Context`; policy presence is not a usage root.
- Go declaration identity and JavaScript runtime storage remain separate contracts. The shared `uint64` signature carrier is `ulong`, whose established runtime storage is `number`; declarations that require exact 64-bit integer operations use an explicit reviewed `bigint` representation rather than silently migrating every `uint64` operation.
- An authored external-package surface is a separate explicit, partial declaration contract. Callable/value entries can be compared only when supplied by that catalog; type entries additionally require an explicit TypeScript storage contract and fail closed without one. The catalog never becomes a reachability root and never enters generated facade artifacts. Porter never discovers package surfaces by scanning implementation bodies or by enumerating every package export.
- Porter finalizes one declaration registry with two explicit projections: the active artifact closure and the external-surface audit closure. Only the active projection can create generated files. Both projections consume the same parser-proven authored declaration surfaces, so audit-only evidence can never leak into artifact reachability.
- Configured authored policies are validated against their exact direct TypeScript declaration origins even when inactive, but neither the policy nor that validation becomes a usage root. Once an authored type is reached by one of the explicit closures, only its selected public declaration members, mandatory heritage, emitted pointer metadata, and explicit method bindings can add dependencies.
- Authored facade modules are removed from the generation set before rendering. They are never rendered and discarded afterward.
- Every configured authored type facade must identify a type in the reachable external declaration closure and must be declared directly at its configured TypeScript storage identity. Barrel re-exports cannot own authored storage. Ambiguous origins, cross-kind merges, storage shared by two facade policies, generated storage masquerading as authored storage, and storage also owned by `@tsgo-unit` fail closed.
- Authored facade checking is selected-surface exact: every public TypeScript member must match the same-name Go member structurally or carry one exact reviewed runtime-adaptation row. Public Go members omitted from the authored TypeScript surface are inventoried as unselected, not treated as a requirement to port the complete package API. Constructors and private/protected storage are inventoried separately and do not become Go members.

In every file governed by `requires-tsgo-unit`, including a file with zero
metadata records, Porter also accounts for complete
declaration ownership. Overload groups, merged declarations, and contiguous Go
const/var groups share their exact attached unit ownership. Any additional
exported TypeScript declaration is rejected as a source-surface addition with
no Go unit. Module-private helpers remain implementation details and are
reported separately without entering Go signature comparison. Intentional
public TypeScript APIs belong in an explicitly reviewed non-Go source-policy
module; they must not be hidden among mechanically ported declarations.
Export declarations are not duplicate declarations: named, namespace, and star
re-export routes are inventoried separately and validated by the exact module
index for missing or ambiguous targets.

Parser-backed Porter tests require a fresh built TSTS parser. Missing, empty, or
unreadable configured freshness source trees, stale output, and parser loading
failures fail the suite; they are never converted into skips. The authoritative
gate recursively discovers every `*.test.mjs` below its `test/` and
`ts-extractor/` suites and separately runs `go test ./...` for the Go extractor,
so a newly added nested Node or Go test cannot silently fall outside
`npm run porter:test`.

Examples:

```ts
export interface Writer {
  Write(p: GoSlice<byte>): [int, GoError];
}

```

## Generated Skeleton Quality

The skeleton renderer emits compilable TypeScript for every portable Go unit:

- Function and method parameters/results are derived from canonical `go/types.Signature` records.
- Go primitives map to TSTS internal scalar aliases where the port needs fixed-width source-level meaning.
- Multiple Go return values become TypeScript tuples.
- Go generic type declarations preserve their exact type-parameter lists and constraints; Porter never fabricates TypeScript defaults for omitted Go arguments.
- Constants and inferred top-level values use exact `go/types` objects; the renderer never guesses an initializer type from source text.
- Every generated body throws with `globalThis.Error` so facade symbols named `Error` cannot shadow the runtime constructor.

The validation gate is `npm run porter:skeleton-check`; it must render all portable units with zero renderer diagnostics and a passing TypeScript compile.

## Coverage Safeguards

The extractor records every `.go` file it sees, including generated files, tests, package-doc-only files, and host-specific files. `porter:status` reports:

- Go files with no top-level declaration units.
- Go units missing from TypeScript.
- TypeScript units whose Go hashes are stale.
- TypeScript `@tsgo-unit` metadata that no longer maps to current Go.
- TypeScript files that contain no `@tsgo-unit` metadata.

Normal port code cannot appear silently. If a TypeScript helper is genuinely needed, add an explicit source-file policy before it is accepted.

The intended full-coverage bootstrap invariant is stronger: every active Go unit must have exactly one TypeScript `@tsgo-unit` block. Use `npm run porter:scaffold-all` to create traceable stubs for the complete active missing set before judging implementation quality. After that point, `missing` should remain zero; ongoing work should move units from `stub` to `implemented`.

## Incremental Update Contract

Before changing the pin, compare clean old and candidate checkouts:

```sh
node packages/tsts/tools/porter/porter-cli.mjs delta \
  --from /path/to/old/typescript-go \
  --to /path/to/new/typescript-go \
  --out .temp/porter/deltas/<unique-review-id>
node packages/tsts/tools/porter/porter-cli.mjs delta-verify \
  --dir .temp/porter/deltas/<unique-review-id> \
  --from /path/to/old/typescript-go \
  --to /path/to/new/typescript-go
```

Review `summary.md` and `delta.json`. The report distinguishes complete-file changes, every top-level semantic snapshot inventory change (including dependencies, method-set signatures, external package surfaces, module graph, and profile coverage), all Go declaration changes, and only the units active under the porter policy. Move candidates are advisory only; porter never guesses that two declarations are equivalent or rewrites metadata automatically.

After deliberately updating the submodules, schema copies, hashes, and `source-pin.json`, run:

```sh
npm run porter:status
npm run porter:verify
```

`porter:status` reports source-pin defects but remains a diagnostic command. `porter:verify` is the gate: it proves the complete source pin, then recomputes Go source-signature hashes and canonical declaration semantics. Any TypeScript unit whose signature evidence no longer matches becomes `stale` or a signature-audit failure. The tool never overwrites implemented TypeScript. Scaffold writes are explicit and append-only unless a new file is being created.

If a TS-Go update removes or renames a Go unit, the existing TypeScript `@tsgo-unit` becomes `orphan`. If the update adds the same concept under a new Go identity, that new identity is reported separately as `missing`. The tool does not guess that an orphan and a missing unit are the same change; a human must either delete the orphan, move the implementation, or update the metadata after reviewing the upstream delta.

If a generated facade disappears from the new snapshot, the old generated file becomes `orphan generated artifact`. The tool never deletes it automatically because deletion is a source-control decision. Regeneration plus verification makes the stale/orphan state explicit.

## Semantic Large-File Splits

Large files are not split randomly. File size is only the trigger for a required semantic review.

The porter enforces this flow:

1. `porter:large-files` finds every active literal-port Go file over `largeFileLineThreshold`.
2. Each required file must have one entry in `packages/tsts/porter.large-splits.json`.
3. Each target must have a semantic description and a stable target file path.
4. Every portable declaration in the large Go file must be assigned to exactly one target.
5. A declaration listed in the plan that no longer exists upstream is reported as stale.
6. A declaration claimed by two targets is reported as a duplicate assignment.
7. A random-looking target such as `part-001.ts`, `chunk-002.ts`, or `lines-5000.ts` is rejected.
8. Every existing `@tsgo-unit` from a planned split must physically live at its assigned target path; correct metadata in the wrong split file is a verification failure.

Example:

```json
{
  "schemaVersion": 1,
  "files": {
    "internal/checker/checker.go": {
      "reason": "Semantic split of checker declarations by compiler responsibility.",
      "targets": [
        {
          "path": "packages/tsts/src/internal/checker/checker/relations.ts",
          "description": "Assignability, comparability, relation checks, identity checks, and excess-property logic.",
          "declarations": [
            "method::Checker.checkTypeAssignableTo",
            "method::Checker.isTypeRelatedTo"
          ]
        }
      ]
    }
  }
}
```

The declaration keys are local to the source file. They intentionally do not repeat the Go filename because the filename is already the key of the plan entry. The emitted TypeScript still carries only `@tsgo-unit` metadata, so split layout can change without changing the Go unit identity.

The checked semantic plan covers:

- `internal/checker/checker.go`
- `internal/parser/parser.go`
- `internal/printer/printer.go`

Generator-owned artifacts, tests, LS/LSP, fourslash, host-native files, and manual-required files are not part of the semantic large-file split gate. Generated files carrying runtime behavior remain active ports and are covered exactly like authored Go files.

### Overwrite Safety

Porter write commands are safe by default:

- Creating a missing file is allowed.
- Writing identical content to an existing file is a no-op.
- Writing different content to an existing file fails.
- `--force` is required before replacing existing different content.

This applies to generated facades and split-plan draft generation. The intent is that reviewed hand edits, reviewed semantic split boundaries, and manually implemented hot facades cannot be lost by a routine regeneration command.

Normal workflow:

```sh
npm run porter:large-files -- --check
npm run porter:facades -- --check
```

Only after reviewing the diff should a maintainer use:

```sh
npm run porter:large-files -- --write-draft --force
npm run porter:facades -- --out packages/tsts/src --force
```

The `--force` flag is intentionally explicit. It is a source-control operation, not a normal validation operation.

## Overrides

Policy entries classify units that are not literal mechanical ports:

- `generated-artifact`: regenerate from the named upstream schema/generator inputs; every generated source family requires an explicit disposition.
- `manual-required`: port by hand because direct translation would be wrong, such as fixed-width numeric behavior.
- `host-native`: replace OS/runtime binding code with the TypeScript/Node host equivalent.
- `out-of-scope`: keep visible as excluded upstream inventory, never scaffold, and never allow active TypeScript source files for that surface.

These policies are explicit debt categories. A unit is never silently excluded from the status report.

## Scaffolding Rules

The scaffolder is intentionally conservative and non-authoritative. It emits traceable stubs, never guessed translations. Scaffolds preserve Go unit IDs and map mechanically known public signature types to TSTS carriers, but they do not infer behavior. Strict verification rejects every `status: "stub"`, including throwing function/method scaffolds and type/value scaffolds. A maintainer must implement and review the unit, preserve the upstream intent, and record any exact local override before changing its status to `implemented`.
