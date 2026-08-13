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

## Immutable Toolchain

`scripts/build-toolchain.mjs` is the only production entry that can publish a
toolchain. Fresh construction requires explicit `TSTS_GO_BUILDER`,
`TSTS_GO_MODULE_CACHE`, `TSTS_NODE_BUILDER`, `TSTS_NPM_CLI`, and
`TSTS_HOST_PLATFORM_PATH` selections. The host Go, module cache, Node/npm, Git,
shell utilities, dynamic loader, system libraries, kernel, and filesystem are
bootstrap/platform boundaries only. No host path is part of toolchain identity,
and no command can seal existing package `dist` directories.

Publication requires a completely clean superproject, including non-ignored
untracked files, and initialized clean submodules whose checked-out commits
equal the gitlinks in committed `HEAD`. Index-only gitlinks are not authority.
Git is used only while constructing a fresh candidate and never during open or
historical replay. The canonical entry freshly builds every selected JavaScript
package, `gotots`, `tsgo-ast-printer`, and the selected native `tsgo` before it
can seal or publish the candidate.

The TypeScript-Go source snapshot comes from the committed
`vendor/typescript-go` checkout. The executable is built offline from the
sealed module cache at the exact version and sum in GoToTS's generated schema
manifest. Construction writes an ephemeral root module whose only requirement
is that exact TS-Go module and whose `go.sum` is derived from every sealed
module record, then builds the ordinary package path under `GOPROXY=off` and
`-mod=readonly`; version-query installation is not an allowed path. Its Go
build information must report the sealed module identity. The
schema revision exact-joins that module pin to the committed vendor gitlink.
GoToTS and TS-Go package selection also define one union of external module identities.
Each identity binds module path, version, module sum, go.mod sum, selected
package uses, its complete extracted source directory, and its exact `.info`,
`.mod`, `.zip`, and `.ziphash` cache metadata.

The canonical component registry owns every destination and dependency. Its
output is `.temp/toolchains/<digest>`, where `<digest>` is the SHA-256 identity
of canonical schema 4 `toolchain-manifest.json`. The manifest partitions and
binds:

- the committed superproject and submodule selection;
- the normalized Go profile, bootstrap provenance, and complete staged GOROOT,
  including the exact `bin/go`, tools, standard library source, and assets;
- the disjoint staged Go module cache containing the complete non-standard
  source/cache closure required by both GoToTS tool builds and TS-Go package
  loading;
- the staged Node executable, artifact-owned npm launcher, and exact normalized
  npm distribution, with bootstrap and staged npm closures exact-joined member
  for member; nested package scripts resolve that launcher from the closed
  artifact `PATH` rather than a host npm installation;
- every packed package's exact name, version, dependency identity, published
  member set, and content digest;
- `gotots`, `tsgo-ast-printer`, and sealed-module-built `tsgo` executable
  bytes, including the TS-Go module/source-revision join;
- the compiler-distribution snapshot, freshly built provider output, and closed
  `@gotots/runtime`, `@types/node`, and `undici-types` certification dependency
  graph; and
- the committed main TypeScript-Go source closure consumed for generation,
  separate from GOROOT and external module sources.

Manifest keys and member registries use locale-independent UTF-16 code-unit
ordering. Sealed members are regular single-link files with exact modes;
symlinks, special files, hard links, duplicate owners, nested `node_modules`,
and unowned members are rejected. Contained Go-root and npm symlinks are
materialized as regular members with effective byte/mode identity; escaping
links are rejected. Published roots are never replaced or deleted. Failed and
duplicate candidates remain under their run identities.

Construction and consumption use a closed environment: artifact Node and Go
are the only language executables on `PATH`; HOME, temporary storage, npm cache,
and Go build cache are isolated per toolchain; the selected profile is explicit;
and `GOENV=off`, `GOWORK=off`, `GOTOOLCHAIN=local`, `GOPROXY=off`,
`GOSUMDB=off`, and the artifact `GOMODCACHE` prevent ambient configuration,
module-cache, network, or tool fallback. npm acquisition occurs only while
constructing a fresh artifact. After sealing, open and replay need no host Go,
module cache, Node, npm, network, or Git. A consuming shell supplies and checks
`TSTS_HOST_PLATFORM_PATH` for named host utilities; that machine-local path is
not persisted or hashed.

Every exact-toolchain child retains the committed resource envelope after the
closed-environment reset: Go receives a 6 GiB soft memory limit and two logical
processors, while Node receives an 8 GiB V8 old-space ceiling. Both remain
inside the independent 12 GiB guarded-job memory ceiling. These are committed
execution policies, not ambient `GOMEMLIMIT`, `GOMAXPROCS`, or `NODE_OPTIONS`;
an out-of-memory failure is preserved and must not be retried with an
unbounded process.

`.temp/toolchain-selector.json` is an atomic schema 1 pointer containing only a
digest. A consumer reads that selector at most once, verifies the corresponding
content-addressed root, and receives an opaque handle of exact package,
executable, distribution, and source paths. Product scripts thread that digest
and root through child commands; consumers never reopen the selector or use a
mutable package alias.

The full build passes the immutable source snapshot as GoToTS's project root,
an exact writable view of the compiler distribution through
`--distribution-root`, and the resolved `--go`, `--tsgo`, and writable
`--tool-cache` selections. Every target-printer request carries those same
three explicit selections; it never writes into the immutable distribution or
rediscovers tools from `PATH`. Target verification, GoToTS, GoToTS printing,
target lowering, and strict TS-Go checking therefore use one toolchain
identity. The scalar check follows the same single-resolution rule while
retaining its explicit fixture source. These explicit GoToTS tool flags are a
required submodule interface; TSTS provides no `go tool` or ambient-PATH
compatibility route.

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
fallback denominator. Schema 3 `tsts-target-manifest.json` binds the normalized
profile digest, canonical GoToTS semantic digest, selected historical toolchain
digest, and every target member's regular-file type, size, and SHA-256 content
identity. Replay verifies that exact byte set before emission and reopens the
manifest-selected historical toolchain even when the current selector differs.

## Product Implementations

Each implementation source is stored at the same semantic package path used by
canonical GoToTS output: the declared module path, optional module version, and
module-relative import path. Certification support uses the canonical generated
support modules and semantic symbol names. Content digests identify sealed
artifacts; they never become maintained source paths, import paths, or symbol
names. The product gate derives each expected path from the implementation
contract and rejects stale fingerprint-based identities.

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

`npm run build` and `npm run check:scalar` require all five explicit bootstrap
and platform selections named in the immutable-toolchain contract. Replay
requires only a current `TSTS_HOST_PLATFORM_PATH`: it reads the historical
digest from the canonical target manifest, opens and verifies that retained
content-addressed root even when the selector advances, then uses its Node, Go
module cache, TS-Go executable, packages, and distributions. Replay never reads
Git authority, selects a current compiler, or depends on bootstrap Go/Node/npm
installations. It uses the same guarded execution and output-preservation
policy as the full check.
