# TSTS

TSTS is the TypeScript compiler generated from Microsoft's pinned TS-Go source
by the pinned GoToTS compiler.

This repository owns only product assembly:

- the exact TS-Go and GoToTS revisions;
- the selected Go build and translation profile;
- certified product-specific implementations;
- differential runtime and performance certification.

The compiler source and generated output are not hand-maintained here.

## Build

```sh
git submodule update --init --recursive
npm run build
```

Generated TypeScript is written to `.temp/generated`.

Run the complete generated/native compiler differential with:

```sh
npm run check
```
