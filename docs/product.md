# TSTS Product Contract

## Ownership

TSTS assembles one generated compiler. TS-Go defines the source behavior,
GoToTS defines generic translation, and this repository defines product
selection. No product decision is encoded in GoToTS.

The final executable TypeScript is committed under `generated/source/` so the
product can be reviewed without running the assembly. This tree is derived
evidence, not an editing surface. `npm run generate` is its sole writer and
seals it with `generated/manifest.json`; emitted JavaScript and all other
transient or failed generation state remain under `.temp/`.

The toolchain identity hashes every committed superproject entry except
`generated/`, then joins the selected submodule gitlinks. This prevents the
derived snapshot from recursively changing the identity of the tool that
produced it. The exclusion is not an unverified hole: the repository must be
clean before construction, while the generated manifest and regeneration gate
independently own every committed product byte.

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

## Selected Profile

`gotots.json` selects `./cmd/tsgo` for Linux/amd64 with cgo disabled and the
`noasm` build tag. Fixed-width `int64` and `uint64` use the exact
`fixed64-bigint` profile while native `int`, `uint`, `uintptr`, and narrower
integers remain JavaScript numbers. Evaluation order uses the direct profile.
Standard-library and external providers are enabled. This profile is required
because reached JSON parser state uses the high bit of a `uint64` as control
data; the number profile cannot distinguish that value from its incremented
successor.

This is one synchronous product. GoToTS owns one fixed serial execution
semantics and emits ordinary synchronous callable contracts. The
TypeScript target may change pointer, scalar, and representation shapes, but
it does not infer callable effects or remove `Promise`, `async`, or `await`
after generation. The product runner selects TS-Go's own `--singleThreaded`
compiler path exactly once before entering its generated `main`; native
differentials select the same path. TS-Go's `singleThreadedWorkGroup` therefore
queues source work and drains it in `RunAndWait` without requiring JavaScript
tasks, promises, or a second scheduler model. A reached Go goroutine outside
that source-owned serial path still follows GoToTS's fixed contract: it runs
inline, and a channel or synchronization operation that would suspend fails
loudly at its typed owner. This is a bounded serial product semantics, not a
claim of Go concurrency parity, and no alternate execution profile exists.

`typescript-target.json` also selects one executable packaging route:
`single-esm`. After strict TypeScript checking and JavaScript emission, TSTS
verifies implementation contracts against the unbundled graph, then invokes
the exact esbuild binary sealed in the immutable toolchain. The bundler
aggregates and fully minifies the reachable ESM graph and leaves only
`node:` built-ins external. The committed TypeScript remains the reviewable
product source; the transient executable is `out/tsts.mjs` plus one canonical
manifest containing the exact input graph, external set, bundler identity, and
output digest. The superseded multi-file JavaScript graph is removed only by
the successful atomic packaging transaction. No text rewrite or second
executable route survives.

The same profile forms one representation-transport contract from two closed
sources. The exact pinned GoToTS gostdlib manifest contributes only
signature-certified synchronous generic kernels with generated-caller
representation facets. The product profile additionally selects the canonical
GoToTS runtime `@gotots/runtime/map.js#goMapStore` as an
`inline-generic-method-call`; that runtime boundary cannot live in the
gostdlib provider manifest. TSTS validates, merges, canonically orders, and
deduplicates these exact module/export identities before passing the immutable
contract to the TypeScript target. The target exact-joins the selected
declaration, signature, checker type, and constrained one-method body before
inlining any call. Its sealed evidence must match the profile digest and
callable count and must report nonzero selected and inline call counts for this
product. A stale manifest, duplicate identity, concrete parameter, unexpected
body, or same-spelled ordinary call remains an external boundary rather than
becoming an optimization exception.

The profile separately records exact product-acceptance denominators for
measured target optimizations. These values never select source or permit an
optimization: the target decides solely from finalized facts and emits its own
count. TSTS exact-joins that count before installing output. The current pinned
product accepts exactly 72 complete canonical pointer-key map rewrites; a
source, compiler, or target-pin change that produces any other denominator
must be re-reviewed and recertified rather than silently widening or shrinking
the optimized class.

Module aggregation is a bounded internal equivalence envelope. It may remove
loader and per-module initialization overhead, but it must preserve ESM
dependency initialization order and may not change the compiler's exit status,
stdout, stderr, or emitted files. Deterministic bundle bytes, side-effect
ordering, exact input membership, external membership, output mutation, and
failed-transaction retention are permanent gates.

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

Performance substitutions for product-only hot paths are complete callable
body replacements under `implementations/`. Each one exact-joins the
load-owned selected-source snapshot, canonical Go callable identity, generated
TypeScript signature, and canonical source-body digest before the translated
body is omitted. Package implementations remain package-atomic. A generic
translation or representation optimization remains owned by the selected
GoToTS or TypeScript-target profile. Neither class may patch the committed
generated tree: its result becomes visible only by regenerating the complete
product and passing the differential gates.

The core-hotpath certification source also carries the complete marker
declarations needed to typecheck the generated and handwritten modules in one
strict certification project. Its `struct<T>(shape): T` and `field<T>(): T`
signatures mirror the source-core virtual-module contract exactly; they enable
checking only and do not select marker semantics. Source-core remains the sole
owner that attaches finalized marker facts in the subsequent target session.

The selected callable set is exactly `Checker.compareNodes`,
`Checker.compareSymbolsWorker`, `Checker.sortSymbols`, `Arena.New`, and
`LinkStore.Get`. The comparison and storage replacements preserve their source
algorithms while removing generated representation overhead.
`Checker.sortSymbols` replaces Go's generic `slices.SortFunc` machinery with
native `Array.sort` under the same total `compareSymbols` order. A zero
comparison identifies the same symbol value, so target sort stability cannot
change an observable result. No source-file, node-wrapper, or member-partition
cache is selected.

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

The same checkpoint exact-joins the freshly generated final TypeScript against
`generated/`. The committed manifest carries the
canonical semantic, target-profile, and historical toolchain digests plus
the normalized tree digest, file count, byte count, and fixed entrypoint.
Source drift, missing files, extra files, stale toolchain selection, and hand
edits all fail the checkpoint.

The product check owns four serial, resource-disjoint guarded transactions:
assembly tests, exact toolchain construction, product generation plus strict
typecheck, and runtime replay. Toolchain construction commits its immutable
historical root before the generation transaction opens it. Each transaction
receives a fresh cgroup so process and file-cache charges from an earlier phase
cannot consume the next phase's memory envelope. Wrapping the whole check in
one outer guard is forbidden. The replay transaction preserves a previous
run's emitted JavaScript by moving it to a timestamped `.temp/preserved/`
directory before re-emitting. Failed runtime artifacts therefore remain
inspectable without contaminating or blocking the next exact assembly.

The bounded scalar check uses the same constructor/opener split: its first
guard may construct and select the immutable toolchain, while its second guard
may only open that selection and execute the scalar product.

The synchronous product additionally exact-joins its generated callable
surface against the selected source profile. Generated Go callable
declarations and calls contain no unexpected `async`, `await`, or
Promise-bearing ABI. GoToTS owns the callable contract; the TypeScript target
independently rejects authored suspension nodes from the exact checked tree
before planning or printing. Its sealed evidence exact-joins
`sourceExecution: "synchronous"`, the selected optimization identity, and the
complete source membership. Representation evidence separately exact-joins
the certified transport digest, denominator, selected-call count, and inline
call count. Value-structure evidence proves that canonical Go struct-layout
facts were selected and consumed before their marker statements were removed.
Neither gate decides semantics by marker spelling or repairs generated
source. Adding an obsolete concurrency selector, changing
the target execution contract away from `synchronous`, removing the product
runner's source-owned serial selection, or supplying that selection more than
once must fail before publication.

`npm run replay` resumes from the current certified generated source and runs
only JavaScript emission from `.temp/target`, provider/runtime assembly,
implementation verification, deterministic executable bundling, native TS-Go
construction, and the exact runtime differential. It uses the
same guarded execution and output preservation policy as the full check.

`npm run generate` executes that complete checkpoint in publication mode and
atomically replaces `generated/` only after the staged source and manifest
verify. `npm run check` runs the same pipeline in verification mode and
requires byte-identical committed TypeScript.
