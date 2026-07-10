# TSTS Porter Tooling

This directory is the mechanical-port backbone for TSTS. The tooling reads the real vendored TS-Go checkout, extracts Go declarations with Go's own parser, and compares those extracted units against TypeScript files that carry embedded `@tsgo-unit` metadata.

## Scope Boundary

Porter is an authoritative **inventory, contract verifier, and upgrade-delta tool** for the maintained Go-to-TypeScript mechanical port. It proves the pinned source identity, complete Go declaration inventory, source/signature/body hashes, generated-artifact ownership, Go-derived public signatures and constant values, and every reviewed local exception. It reports changes; it does not decide how an upstream implementation should be rewritten in TypeScript.

Porter is deliberately not a Go-to-TypeScript translator. It must not infer implementation bodies, rewrite authored TypeScript, automatically re-stamp stale metadata, accept a scaffold as an implementation, or treat an orphan/missing pair as a rename. `scaffold` is optional, non-authoritative bootstrap output: it creates a traceable throwing/type-only placeholder for human implementation, while strict verification continues to reject the stub.

The extractor evaluates only the compile-time constant subset needed to verify Go constant declarations and value ordering. Unsupported or build-dependent constant forms stay explicit and must be covered by a reviewed exact local override; they are never approximated. External selectors are collected only to audit the dependency/facade boundary used by active port units. They are not signature authority and are never used to infer an authored function body.

Every accepted divergence is local to the affected TypeScript declaration through `@tsgo-override`, names a registered category, gives a durable reason, and snapshots the exact Go and TypeScript contract for the allowed aspect. There is no global waiver and no compatibility fallback.

## Commands

- `npm run porter:delta -- --from <old-tsgo-root> --to <new-tsgo-root> --out <new-evidence-dir>` scans both clean Git checkouts twice, fails on nondeterminism, and atomically writes complete tracked-tree/Go-file/raw-unit/active-unit deltas without changing either checkout. `--to` defaults to the pinned source root. Evidence directories are immutable and are never overwritten; a completion marker is published last.
- `npm run porter:delta-verify -- --dir <evidence-dir>` independently validates the exact evidence-file inventory, every byte length and SHA-256 digest, both complete extractor snapshots, report/snapshot identities, clean deterministic provenance, and the exact Markdown rendering.
- `npm run porter:scan` extracts a full TS-Go snapshot into `.temp/porter/tsgo-snapshot.json`.
- `npm run porter:status` extracts TS-Go, scans TypeScript metadata, and writes `.temp/porter/status.json` plus `.temp/porter/status.md`.
- `npm run porter:verify` runs strict-port mode and fails on Go parse errors, missing/stub/stale/orphan/duplicate units, untracked TypeScript, generated-artifact drift, source-pin drift, or an invalid override.
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
invisible when its public signature still matches. These divergences must be
tracked explicitly.

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

Facade generation has two inputs:

- Type-position selectors in Go signatures produce typed facades where the shape is known, such as `io.Writer`, `io.Reader`, `time.Duration`, and `context.Context`.
- Body-position selectors produce callable/value skeletons for later implementation work, such as `path/filepath.Join`, `os.ReadFile`, `regexp.MustCompile`, and `gotest.tools/v3/assert.Equal`.

Examples:

```ts
export interface Writer {
  Write(p: GoSlice<byte>): [int, GoError];
}

export function Join(...args: Array<unknown>): unknown {
  throw new globalThis.Error("TSGO_EXTERNAL_FACADE_UNIMPLEMENTED path/filepath.Join");
}
```

Body-position facade observations are dependency-boundary inventory, not inferred API contracts. A generated throwing skeleton may reserve a deterministic TypeScript home for an observed external package symbol, but it is non-authoritative scaffolding and cannot satisfy strict port verification. Every active external call/value reference backed only by `TSGO_EXTERNAL_FACADE_UNIMPLEMENTED` remains an unresolved obligation. Exact host/runtime behavior remains reviewed authored work or an explicit host-native boundary.

## Generated Skeleton Quality

The skeleton renderer emits compilable TypeScript for every portable Go unit:

- Function and method parameters/results are derived from Go AST signatures.
- Go primitives map to TSTS internal scalar aliases where the port needs fixed-width source-level meaning.
- Multiple Go return values become TypeScript tuples.
- Go generic type declarations receive `unknown` defaults so partially specialized Go uses compile as skeletons.
- Untyped values use syntactic inference for literals, `make(...)`, `new(...)`, function literals, composite literals, `errors.New(...)`, and same-package aliases.
- Every generated body throws with `globalThis.Error` so facade symbols named `Error` cannot shadow the runtime constructor.

The validation gate is `npm run porter:skeleton-check`; it must render all portable units with zero renderer diagnostics and a passing TypeScript compile.

## Coverage Safeguards

The extractor records every `.go` file it sees, including generated files, tests, package-doc-only files, and host-specific files. `porter:status` reports:

- Go parse errors.
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
