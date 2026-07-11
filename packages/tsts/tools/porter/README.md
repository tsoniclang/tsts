# TSTS Porter Tooling

This directory is the mechanical-port backbone for TSTS. The tooling reads the real vendored TS-Go checkout, extracts Go declarations with Go's own parser, and compares those extracted units against TypeScript files that carry embedded `@tsgo-unit` metadata.

## Scope Boundary

Porter is an authoritative **inventory, declaration-contract verifier, and upgrade-delta tool** for the maintained Go-to-TypeScript mechanical port. It proves the pinned source identity, complete Go declaration inventory, source/signature/body hashes, generated-artifact ownership, canonical `go/types` signatures, exact `go/constant` values, and every reviewed local exception. It reports changes; it does not decide how an upstream implementation should be rewritten in TypeScript.

Porter is deliberately not a Go-to-TypeScript translator. It must not infer implementation bodies, rewrite authored TypeScript, automatically re-stamp stale metadata, accept a scaffold as an implementation, or treat an orphan/missing pair as a rename. `scaffold` is optional, non-authoritative bootstrap output: it creates a traceable throwing/type-only placeholder for human implementation, while strict verification continues to reject the stub.

The scope is closed at the declaration boundary. Porter captures functions and methods, receivers, parameters, results, variadics, named types and aliases, structs, interfaces, type parameters, complete constraints and type sets, constants, variables, array lengths, channel directions, embedding, and struct tags. The declaration checker runs with `go/types.Config.IgnoreFuncBodies = true`; no Porter component visits, summarizes, classifies, or infers from a Go or TypeScript implementation body. The body hash remains an opaque upstream-drift fingerprint only.

Constants and inferred top-level variable types come directly from `go/types` and `go/constant`. There is no hand-written constant evaluator, textual type inference, raw-type fallback, or name-based recovery on the authoritative path. Unsupported declaration/type variants fail the snapshot rather than becoming approximate evidence. Build-profile selection covers every declaration-bearing source file and fails if a profile changes a declaration contract.

Every accepted divergence is local to the affected TypeScript declaration through `@tsgo-override`, names a registered category, gives a durable reason, and snapshots the exact Go and TypeScript contract for the allowed aspect. There is no global waiver and no compatibility fallback.

## Commands

- `npm run porter:delta -- --from <old-tsgo-root> --to <new-tsgo-root> --out <new-evidence-dir>` scans both clean Git checkouts twice, fails on nondeterminism, and atomically writes complete tracked-tree/Go-file/raw-unit/active-unit deltas without changing either checkout. Unit deltas distinguish source-signature text, canonical profile-aware `go/types` declaration semantics, exact `go/constant` values, and opaque body drift. `--to` defaults to the pinned source root. Evidence directories are immutable and are never overwritten; a completion marker is published last.
- `npm run porter:delta-verify -- --dir <evidence-dir>` independently validates the exact evidence-file inventory, every byte length and SHA-256 digest, both complete extractor snapshots, report/snapshot identities, clean deterministic provenance, and the exact Markdown rendering.
- `npm run porter:scan` extracts a full TS-Go snapshot into `.temp/porter/tsgo-snapshot.json`.
- `npm run porter:status` extracts TS-Go, scans TypeScript metadata, and writes `.temp/porter/status.json` plus `.temp/porter/status.md`.
- `npm run porter:verify` runs strict-port mode and fails on missing/stub/stale/orphan/duplicate units, untracked TypeScript, generated-artifact drift, source-pin drift, or an invalid override. Source read/parse failures stop extraction before a snapshot exists.
- `npm run porter:scaffold -- --limit 25` previews missing-unit scaffolds. Add `-- --write` to create files.
- `npm run porter:scaffold-all` creates or appends scaffolds for every active missing Go unit, refreshes porter status, and fails if any active unit remains missing.
- `npm run porter:facades -- --out packages/tsts/src` regenerates the checked-in Go compatibility/facade layer from the full TS-Go snapshot. Existing differing files are never overwritten unless `-- --force` is also supplied.
- `npm run porter:facades -- --check` verifies the checked-in Go compatibility/facade layer is exactly the deterministic output for the current TS-Go snapshot.
- `npm run porter:large-files` verifies every active literal-port Go file over the configured LOC threshold has a semantic split plan.
- `npm run porter:large-files -- --write-draft` writes a draft semantic split plan from the current TS-Go declaration inventory. Existing differing plans are never overwritten unless `-- --force` is also supplied. Treat this as a bootstrap command, not the normal update path for a reviewed plan.
- `npm run porter:skeleton-check` renders the complete missing-unit skeleton corpus into `.temp/porter/skeleton` and runs `tsc --noEmit` against it.

## Embedded Metadata

Each ported unit carries one JSON metadata line:

```ts
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/debug/debug.go::func::Fail","kind":"func","status":"implemented","sigHash":"...","bodyHash":"..."}
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
- `implemented`: a maintainer has attested that the TypeScript unit implements the recorded Go unit. The Go body hash proves upstream freshness; it does not prove semantic equivalence of arbitrary TypeScript body text.
- `stale`: the Go signature/body hash changed since the TypeScript unit was written.
- `orphan`: a TypeScript `@tsgo-unit` refers to no current Go unit.
- `untracked TS file`: a TypeScript source file exists under `src/` but carries no `@tsgo-unit`.
- `excluded`: the Go unit is explicitly outside the active standalone compiler porter scope and must not be scaffolded. Go tests, language-service/editor surfaces, generator programs, and generated artifacts owned by a named deterministic generator are excluded from production scaffold coverage even though they remain visible in the inventory.
- `forbidden TS file`: a TypeScript source file exists in a path that must not exist in the active standalone compiler tree.

Every in-scope generated Go file must match exactly one `generatedSourcePolicies` entry. Generated runtime behavior such as stringers and mocks remains active `literal-port` work with normal `@tsgo-unit` tracking. Schema/catalog/table output is excluded only when the policy names the deterministic generator that reproduces and byte-checks it. A new, stale, ambiguous, or over-broad generated-source policy fails `porter:verify`. Test, host-native, out-of-scope, and manual-required categories are likewise explicit; they are not silent omissions.

## Source Pin And Reproducibility

`packages/tsts/schema/tsgo/source-pin.json` is the machine-readable source of truth for an upgrade. It pins:

- the TS-Go Git revision and module identity,
- every nested source checkout, including the TypeScript revision,
- every copied schema file, its upstream path, and its SHA-256 digest,
- the exact Go extractor toolchain.

Normal porter commands require clean source and nested worktrees, exact checked-out revisions, byte-identical schema copies, matching hashes, matching `VERSION.md` evidence, and the pinned extractor version. The extractor snapshot itself is deterministic: it has no wall-clock field, records the Go environment, and hashes every complete Go source file in addition to declaration signatures and bodies. Nested Git worktrees are excluded from the Go walk and audited separately through the source pin.

## Implementation Overrides

The porter intentionally hashes the upstream Go unit, not the TypeScript body.
That makes TS-Go baseline updates safe: if upstream changes, the existing
`@tsgo-unit` becomes `stale` even when the TypeScript body is hand-optimized.
The complementary risk is that a deliberate TypeScript body divergence can be
invisible when its public signature still matches. These divergences remain
tracked explicitly for human review; Porter does not claim to prove them.

Every deliberate non-literal body implementation must have both records. A
`body` override is review inventory, not a machine proof of semantic equivalence:

```ts
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan","kind":"func","status":"implemented","sigHash":"...","bodyHash":"..."}
 * @tsgo-override {"category":"runtime-performance","allow":["body"],"reason":"Use the JS/.NET UTF-16 source-text model in the scanner hot path while preserving the TS-Go public contract."}
 */
```

Override metadata is local-only. Do not add per-unit override ledgers to
`porter.config.json`.

`allow` accepts:

- `"body"`: the TypeScript implementation intentionally differs from the Go body
  while preserving the public signature.
- `"signature"`: the TypeScript declaration intentionally differs from the
  Go-derived signature.

Signature overrides must capture both current snapshots locally:

```ts
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan","kind":"func","status":"implemented","sigHash":"...","bodyHash":"..."}
 * @tsgo-override {"category":"runtime-performance","allow":["body","signature"],"reason":"Use a target-native source text carrier.","goSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/scanner/scanner.ts::Scanner>,string)=>void","tsSignature":"func(packages/tsts/src/go/compat.ts::GoPtr<packages/tsts/src/internal/scanner/scanner.ts::Scanner>,packages/tsts/src/internal/core/source_text.ts::SourceText)=>void"}
 */
```

The signature checker recomputes these snapshots from the pinned Go source and
the actual TypeScript declaration. Any upstream Go drift or local TS signature
drift invalidates the override and fails `porter:verify`.

The comparison follows the mechanical port's declaration boundary:

- A Go struct type unit is its data layout: declared fields plus explicit
  `__tsgoEmbeddedN` carriers. Receiver methods are independent Go units and are
  compared with their standalone TypeScript functions; they are never injected
  into the struct's TypeScript interface.
- A Go interface's declared and embedded interface methods are structural and
  remain members of the expected TypeScript interface.
- Method promotion from an embedded struct does not create TypeScript object
  properties. Calls continue through the separately verified method adapters.
- An embedded interface is different: its method contract is expanded even
  when embedded by a struct, because the containing runtime object must satisfy
  that structural interface.

This distinction prevents a type-level override from hiding missing or changed
method units, while still checking every method exactly once.

## Go Struct-Tag Contract

Snapshot schema 5 preserves every declaration-visible Go struct field's export status, exact raw
tag text, and ordered key/value tag entries. The extractor parses tags once at
the Go AST boundary and fails on malformed syntax; downstream checks never
re-scan source text or infer JSON names from TypeScript spelling. Function-local
anonymous structs are implementation-body details and are intentionally outside
Porter's declaration contract.

Every active Go struct with a `json` tag has exactly one typed contract. Porter
binds the literal Go unit ID, local TypeScript type argument, complete field
map, and one explicit strategy:

- `runtime` uses `DefineJsonFieldNamesForGoStruct<T>` because generic JSON
  marshal or unmarshal observes the struct. Its metadata must be attached
  through `AttachJsonFieldNamesForGoStruct` in the defining module.
- `custom-codec` means authored encode/decode logic owns the wire shape. The
  exact field map remains mandatory and cannot be waived by the codec. It uses
  the type-only `JsonFieldNamesForGoStructContract` and emits no runtime object.
- `source-metadata` means the standalone port preserves the upstream schema,
  while a dedicated parser or excluded subsystem owns runtime serialization.
  It also uses the type-only contract and emits no runtime object.

The check compares default and explicit names, ignored fields, `omitzero`, and
`omitempty` independently. It rejects missing, extra, duplicate, orphaned,
dynamic, unsupported-option, embedded-field, and unattached contracts. Helper
calls must resolve through the configured ESM contract module; terminal-name
matching is not accepted. JSON-tag failures are a separate hard verification
gate and cannot be suppressed with signature overrides.

Runtime omission follows the pinned `go-json-experiment` distinction:
`omitzero` tests the mapped Go zero representation (nil/`undefined`, false,
numeric zero, or the empty string), while `omitempty` tests the encoded JSON
value (null, empty string, object, or array) after any field marshaler runs.
Allocated empty slices and maps therefore survive `omitzero` but are removed by
`omitempty`. Runtime registrations explicitly mark nil-only Go kinds with
`zero: "nil"`; this preserves non-nil pointers to scalar zero values instead of
mistaking their payload for a nil pointer. Runtime fields whose Go zero value
requires deep array/struct comparison or unresolved named-type semantics fail
the Porter gate rather than silently using scalar rules.

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

Generated artifacts are not hand-editable. `porter:verify` fails on:

- missing generated artifacts,
- stale generated artifacts whose text differs from current deterministic output,
- orphan generated artifacts no longer produced by the current TS-Go snapshot,
- untracked files under `packages/tsts/src/go/**` without `@tsgo-generated`,
- malformed generated metadata.

Facade generation has declaration inputs only:

- Type identities in Go signatures produce typed facades where the shape is known, such as `io.Writer`, `io.Reader`, `time.Duration`, and `context.Context`.
- External callable/value facades exist only through explicit reviewed configuration or authored modules. Porter never discovers them by scanning implementation bodies.

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
- Go generic type declarations receive `unknown` defaults so partially specialized Go uses compile as skeletons.
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
npm run porter:delta -- \
  --from /path/to/old/typescript-go \
  --to /path/to/new/typescript-go \
  --out .temp/porter/deltas/<unique-review-id>
```

Review `summary.md` and `delta.json`. The report distinguishes complete-file changes, all Go declaration changes, and only the units active under the porter policy. Move candidates are advisory only; porter never guesses that two declarations are equivalent or rewrites metadata automatically.

After deliberately updating the submodules, schema copies, hashes, and `source-pin.json`, run:

```sh
npm run porter:status
npm run porter:verify
```

`porter:status` reports source-pin defects but remains a diagnostic command. `porter:verify` is the gate: it proves the complete source pin, then recomputes Go signature/body hashes from the current Go AST. Any TypeScript unit whose embedded hashes no longer match becomes `stale`. The tool never overwrites implemented TypeScript. Scaffold writes are explicit and append-only unless a new file is being created.

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

Example:

```json
{
  "schemaVersion": 1,
  "files": {
    "internal/checker/checker.go": {
      "targetRoot": "packages/tsts/src/internal/checker/checker",
      "targets": [
        {
          "file": "relations.ts",
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

The current initial semantic plan covers:

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
