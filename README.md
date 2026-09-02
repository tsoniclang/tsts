# TSTS

TSTS is the TypeScript compiler generated from Microsoft's pinned TS-Go source
by the pinned GoToTS compiler.

This repository owns reproducible product assembly:

- the exact TS-Go and GoToTS revisions;
- the selected Go build and translation profile;
- certified product-specific implementations;
- differential runtime and performance certification;
- guarded generation, strict typechecking, runtime replay, and artifact evidence
  under `.temp/`.

Canonical GoToTS output is first checked by pinned TSTS. The pinned TypeScript
target then transforms that exact TS-Go AST using finalized marker facts, and a
pinned Go TS-Go adapter prints the transformed AST. The target declares its
runtime package; this repository resolves that exact package from its pinned
local submodule without publishing or inventing a second runtime contract.
Bootstrap tools run from one isolated package graph containing exactly one
TSTS package, so the checker, fact owners, target transformer, and AST encoder
share node and symbol identity.

Generated TypeScript and JavaScript are transient build and validation
artifacts under `.temp/`. They are never hand-edited or committed; their exact
manifests, logs, and guarded transaction evidence remain inspectable locally.

The selected product uses GoToTS's one fixed synchronous serial execution
contract. The TypeScript target performs pointer, scalar, and representation
lowering only; it does not run a post-generation effect analysis or repair
callable execution. Any provider-facing asynchronous contract and any reached
operation that would require suspension fail before publication.

Required target-neutral primitive facts are concretized by exact checked-node
identity (`int64` to `bigint`, narrower numeric primitives to `number`, and so
on). This is not spelling recognition: an unrelated local alias with the same
name remains unchanged, and the selected marker import must be absent from the
strictly checked target output.

## Build

```sh
git submodule update --init --recursive
npm run build
```

Canonical Tsonic-flavored TypeScript is sealed in `.temp/generated`.
TypeScript-target output is written to `.temp/target`.

Generate and certify the compiler with:

```sh
npm run generate
```

The resulting product is visible locally at:

- `.temp/target/`: final executable TypeScript and its exact target manifest;
- `.temp/target/out/`: emitted JavaScript runtime evidence;
- `.temp/run-*.time` and `.temp/run-*.finished`: guarded resource and status
  evidence.

Product-specific hot-path rewrites remain authoritative under
`implementations/` (or an explicitly selected translation/target profile),
then flow into transient output through regeneration. Generated files are
never the editing surface.

All package and callable implementations share the certified source-core
declaration projection at `implementations/certification/tsonic-core.d.ts`.
Run `node scripts/tsonic-core-certification.mjs --check` to verify that it is
byte-exact with the selected provider model; bundle-local declaration files
contain only implementation-private dependencies.

The target profile also pins measured product-acceptance denominators. They
verify the target's independently fact-selected output; they never act as
source-name allowlists or optimization selectors.

Run the smallest Go pointer -> canonical marker -> TSTS fact -> target AST ->
executable TypeScript proof with:

```sh
npm run check:scalar
```

Run the complete generated/native compiler differential with:

```sh
npm run check
```

That command regenerates into `.temp/`, strict-typechecks the complete product,
and performs runtime parity against pinned native TS-Go.
