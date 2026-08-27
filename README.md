# TSTS

TSTS is the TypeScript compiler generated from Microsoft's pinned TS-Go source
by the pinned GoToTS compiler.

This repository owns only product assembly:

- the exact TS-Go and GoToTS revisions;
- the selected Go build and translation profile;
- certified product-specific implementations;
- differential runtime and performance certification.

Canonical GoToTS output is first checked by pinned TSTS. The pinned TypeScript
target then transforms that exact TS-Go AST using finalized marker facts, and a
pinned Go TS-Go adapter prints the transformed AST. The target declares its
runtime package; this repository resolves that exact package from its pinned
local submodule without publishing or inventing a second runtime contract.
Bootstrap tools run from one isolated package graph containing exactly one
TSTS package, so the checker, fact owners, target transformer, and AST encoder
share node and symbol identity.

The compiler source and generated output are not hand-maintained here.

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

Run the smallest Go pointer -> canonical marker -> TSTS fact -> target AST ->
executable TypeScript proof with:

```sh
npm run check:scalar
```

Run the complete generated/native compiler differential with:

```sh
npm run check
```
