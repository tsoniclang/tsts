# TSTS

TSTS is the TypeScript compiler generated from Microsoft's pinned TS-Go source
by the pinned GoToTS compiler.

This repository owns product assembly and its reviewable generated snapshot:

- the exact TS-Go and GoToTS revisions;
- the selected Go build and translation profile;
- certified product-specific implementations;
- differential runtime and performance certification;
- final TypeScript source under `generated/`.

Canonical GoToTS output is first checked by pinned TSTS. The pinned TypeScript
target then transforms that exact TS-Go AST using finalized marker facts, and a
pinned Go TS-Go adapter prints the transformed AST. The target declares its
runtime package; this repository resolves that exact package from its pinned
local submodule without publishing or inventing a second runtime contract.
Bootstrap tools run from one isolated package graph containing exactly one
TSTS package, so the checker, fact owners, target transformer, and AST encoder
share node and symbol identity.

The final compiler TypeScript is committed so it can be inspected directly,
but it is never hand-maintained. Its sole writer is the exact generation
transaction selected by this repository. Emitted JavaScript remains transient
runtime-validation evidence under `.temp/`.

The selected product uses GoToTS's one fixed synchronous serial execution
contract. The TypeScript target performs pointer, scalar, and representation
lowering only; it does not run a post-generation effect analysis or repair
callable execution. Any provider-facing asynchronous contract and any reached
operation that would require suspension fail before publication.

## Build

```sh
git submodule update --init --recursive
npm run build
```

Canonical Tsonic-flavored TypeScript is sealed in `.temp/generated`.
TypeScript-target output is written to `.temp/target`.

Refresh and certify the committed compiler snapshot with:

```sh
npm run generate
```

The resulting product is visible at:

- `generated/source/`: final executable TypeScript;
- `generated/manifest.json`: exact source, target-profile, toolchain, tree,
  file-count, and byte-count evidence.

Product-specific hot-path rewrites remain authoritative under
`implementations/` (or an explicitly selected translation/target profile),
then flow into this snapshot through regeneration. Generated files are never
the editing surface.

The target profile also pins measured product-acceptance denominators. They
verify the target's independently fact-selected output; they never act as
source-name allowlists or optimization selectors.
The pointer-key map denominator is partitioned into location-backed and
direct-object identity maps, and the profile exact-joins both partitions to
their total.

Run the smallest Go pointer -> canonical marker -> TSTS fact -> target AST ->
executable TypeScript proof with:

```sh
npm run check:scalar
```

Run the complete generated/native compiler differential with:

```sh
npm run check
```

That command regenerates into `.temp/`, performs runtime parity, and exact-
joins the resulting TypeScript against the committed `generated/` snapshot.
