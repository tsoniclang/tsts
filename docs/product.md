# TSTS Product Contract

## Ownership

TSTS assembles one generated compiler. TS-Go defines the source behavior,
GoToTS defines generic translation, and this repository defines product
selection. No product decision is encoded in GoToTS.

## Pinned Inputs

The gitlinks are authoritative:

- `vendor/typescript-go`: selected Microsoft TS-Go source;
- `tools/gotots`: selected GoToTS compiler and provider distribution.
- `tools/tsonic`: selected semantic host and shared source-core contracts;
- `tools/tsts-legacy`: bootstrap TSTS checker and exact target-AST contract;
- `tools/tsonic-typescript`: selected TypeScript target;
- `tools/typescript-runtime`: selected ordinary TypeScript runtime.

A pin changes only with differential product evidence.

GoToTS canonical output remains sealed. Product assembly copies those exact
manifest members into an isolated checking workspace before installing local
provider packages. TSTS checks that immutable byte set, the TypeScript target
returns transformed AST artifacts, and the product exact-joins target source
paths to canonical TypeScript paths before publication. Neither product
assembly nor the printer recognizes marker names or patches source text.

The canonical manifest's TypeScript members are the exact target source
artifact set. Every non-package member and the product runner are explicit TSTS
roots. Canonical Go runtime members are selected exactly once through the
installed `@gotots/runtime` source package, then their target artifacts are
rejoined to canonical `runtime/` paths. This supports library products whose
generated `program.ts` is empty without manufacturing imports, duplicating the
runtime package, or dropping unreferenced package modules.

Build tools are assembled from each pinned package's `npm pack` surface into
one isolated module graph. That graph contains exactly one `@tsonic/tsts`
package: the target-AST-enabled bootstrap. The semantic host, source-core,
target API, TypeScript target, and encoder therefore share one AST runtime.
Nested dependency copies and whole-`dist` test leakage are not assembly paths.

## Selected Profiles

`gotots.json` selects `./cmd/tsgo` for Linux/amd64 with cgo disabled and the
`noasm` build tag. Integers use the JavaScript-number profile, evaluation
order uses the direct profile, and Go concurrency uses cooperative execution.
Standard-library and external providers are enabled.

`typescript-target.json` independently selects executable TypeScript
lowering. Pointer flows and scalar projections use the target's exact
whole-program `closed-direct` plans. Cooperative effects also use
`closed-direct`: only exact closed call components become synchronous, while
provider, escaping, promise-producing, promise-observed, and unresolved
components retain canonical `Promise` transport. The target emits an immutable
optimization artifact containing the selected representations and every typed
fallback denominator. The normalized profile digest is sealed into
`tsts-target-manifest.json`. Replay rejects profile drift and any file not owned
by that manifest before JavaScript emission.

## Product Implementations

`implementations/xxh3` atomically replaces
`github.com/zeebo/xxh3@v1.1.0` for this profile. Its bounded internal
equivalence envelope permits a fast deterministic internal digest because TSTS
uses the result only as an internal equality/cache identity. The envelope is
invalid if digest values become externally visible, persisted, serialized, or
compared with canonical XXH3 vectors.

The generated package implementation and every generated package body are
absent when the bundle is selected. Consumers retain ordinary generated
imports and source-facing signatures.

The product check executes the selected implementation itself over a fixed
10,012-input collision corpus and verifies deterministic hashing, incremental
and one-shot agreement, reset behavior, byte projection, and seeded hashing.
The native/generated compiler differential separately proves that this bounded
algorithm substitution does not change the selected compiler outputs.

## Exit Evidence

A release candidate must generate and strict-typecheck the complete compiler,
emit JavaScript, and compare the generated executable with pinned native TS-Go
on valid input, syntax diagnostics, and semantic diagnostics. Exit status,
stdout, and stderr are compared exactly for the certified fixtures; the valid
fixture's emitted file set and bytes are also exact-joined. Generation,
typecheck, startup, minimal-compilation time, peak RSS, source size, and output
size are reported at the exact pins.

The guarded check preserves a previous run's emitted JavaScript by moving it
to a timestamped `.temp/preserved/` directory before re-emitting. Failed
runtime artifacts therefore remain inspectable without contaminating or
blocking the next exact assembly.

`npm run replay` resumes from the current certified generated source and runs
only JavaScript emission from `.temp/target`, provider/runtime assembly,
native TS-Go construction, and the exact runtime differential. It uses the
same guarded execution and output preservation policy as the full check.
