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
