# tsts

TSTS is a TypeScript-native TypeScript compiler project. Its frontend target is the exact TS-Go schema-level AST contract, with two long-term products:

1. A native Tsonic self-hosting compiler backend.
2. An end-user `tsc` replacement that emits JavaScript, declarations, source maps, and build outputs.

## Current Foundation

The repository currently vendors the pinned TS-Go AST schema under `schema/tsgo/` and generates TypeScript contract metadata from it.

```sh
npm install
npm run verify
```

## Contract Rule

Do not hand-maintain AST kind ids, node fields, aliases, or list aliases. They are generated from `schema/tsgo/ast.json` and checked against `schema/tsgo/VERSION.md`.

## Provider Contract 3

`TstsProviderContractVersion` is a single strict contract. TSTS does not accept a legacy declaration-model shape.

- Every `ProviderTypeExpression` with `kind: "function"` has a stable, non-empty semantic `id`. The id identifies that exact callable shape within its export or member owner; it is not a display name or source spelling.
- Every `target-named` and `opaque` type has an explicit `sourceShape`. Target identity alone is insufficient for TypeScript checking, and TSTS never guesses a source type from a target name.
- Provider modules and source-operation producers select declarations, members, and signatures by their provider identities. Imports, aliases, namespace access, and authored spellings do not change those identities.
