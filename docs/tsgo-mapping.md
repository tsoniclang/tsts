# TS-Go ↔ TSTS Mapping

This document records the structural correspondence between TS-Go (`microsoft/typescript-go`) and TSTS source layouts. The rule: TSTS `src/` mirrors TS-Go `internal/` to make porting and review mechanical.

## Top-level directories

| TS-Go | TSTS | Notes |
|---|---|---|
| `internal/` | `src/` | Convention difference (Go vs TypeScript); content mirrors module-by-module |
| `_scripts/` | `_scripts/` | Schema + codegen scripts |
| `testdata/` | `_testdata/tsgo/` | Vendored TS-Go test data + baselines |
| `_submodules/TypeScript` | `_submodules/TypeScript` | Same git submodule, same `tsgo-port` branch |
| `cmd/` | `src/cli/` | CLI entry |

## Module-level mapping

| TS-Go `internal/` | TSTS `src/` | Status |
|---|---|---|
| `ast/` | `ast/` | partially adopted from `@typescript/native-preview` |
| `astnav/` | `astnav/` | empty; adopt from `@typescript/native-preview/src/ast/astnav.ts` |
| `binder/` | `binder/` | partial — needs porting |
| `bundled/` | `bundled/` | not yet created; investigate need |
| `checker/` | `checker/` | foundation only — 60K LOC port pending |
| `collections/` | `collections/` | empty; port selectively |
| `compiler/` | `compiler/` | foundation; port from Go |
| `core/` | `core/` | empty; port from Go |
| `debug/` | `debug/` | empty; port from Go |
| `diagnostics/` | `diagnostics/` | empty; generate from `diagnosticMessages.json` |
| `diagnosticwriter/` | `diagnosticwriter/` | empty; port from Go |
| `evaluator/` | `evaluator/` | empty; port from Go |
| `execute/` | `execute/` | empty; port from Go |
| `glob/` | `glob/` | empty; port from Go (or use npm) |
| `jsnum/` | `jsnum/` | empty; port from Go |
| `json/` | `json/` | empty; port from Go |
| `module/` | `module/` | empty; port from Go |
| `modulespecifiers/` | `modulespecifiers/` | empty; port from Go |
| `nodebuilder/` | `nodebuilder/` | empty; port from Go (incl. checker `nodebuilder*.go`) |
| `outputpaths/` | `outputpaths/` | empty; port from Go |
| `packagejson/` | `packagejson/` | empty; port from Go |
| `parser/` | `parser/` | partial — expand to TS-Go parity |
| `printer/` | `printer/` | empty; will absorb `src/emit-js/` |
| `scanner/` | `scanner/` | will be replaced with `@typescript/native-preview/src/ast/scanner.ts` |
| `semver/` | `semver/` | empty; port from Go |
| `sourcemap/` | `sourcemap/` | empty; port from Go |
| `stringutil/` | `stringutil/` | empty; port from Go |
| `symlinks/` | `symlinks/` | empty; port from Go |
| `transformers/` | `transformers/` | empty; port from Go (24K LOC) |
| `tsoptions/` | `tsoptions/` | empty; will absorb `src/config/` |
| `tspath/` | `tspath/` | empty; port from Go |
| `vfs/` | `vfs/` | empty; port from Go |
| `pseudochecker/` | — | skip per scope |
| `format/` | — | skip per scope (formatter) |
| `api/` | — | skip per scope (IPC API to Go binary) |
| `ls/` | — | skip per scope (Language Service) |
| `lsp/` | — | skip per scope (LSP server) |
| `project/` | — | skip per scope (IDE project mgmt) |
| `fourslash/` | — | skip per scope (IDE-feature tests) |
| `jsonrpc/` | — | skip per scope (LSP-related) |
| `locale/` | — | skip per scope (i18n) |
| `tracing/` | — | skip per scope |
| `pprof/` | — | skip per scope (Go profiling) |
| `repo/` | — | skip per scope (repo tooling) |
| `testrunner/`, `testutil/` | `test/runner/` | TypeScript-native test harness — bespoke |

## TSTS-only directories

| TSTS `src/` | Purpose |
|---|---|
| `enums/` | TS-Go enum definitions in TypeScript (adopted from `@typescript/native-preview/src/enums/`). No direct TS-Go internal/ counterpart — TS-Go has flags/enums distributed across `ast/`. |
| `cli/` | TSTS CLI entry. TS-Go has `cmd/` outside `internal/`. |

## File-naming rules

- **Single-word names**: match TS-Go exactly. `relater.go` → `relater.ts`.
- **Multi-word runtogether names** (Go convention): convert to kebab-case for TypeScript readability. `nodebuilderimpl.go` → `node-builder-impl.ts`. `symbolaccessibility.go` → `symbol-accessibility.ts`.
- **Large Go files** (> 3K LOC): split into multiple TypeScript files in the same directory, mirroring the conceptual sections (separated by header comments in the Go original). The main file (`checker.ts`, `parser.ts`) hosts the class definition; feature areas split out into siblings.

## File-level mapping (selected)

This table grows as porting progresses. Initial high-traffic entries:

| TS-Go file | TSTS file | Notes |
|---|---|---|
| `_scripts/ast.json` | `schema/tsgo/ast.json` | Vendored schema; SHA-pinned |
| `_scripts/ast.schema.json` | `schema/tsgo/ast.schema.json` | Vendored schema |
| `_packages/native-preview/src/api/node/protocol.ts` | `schema/tsgo/protocol.ts` | Vendored (location moved upstream) |
| `internal/ast/nodeflags.go` | `schema/tsgo/nodeflags.go` | Vendored for flag-constant generation |
| `internal/ast/symbolflags.go` | `schema/tsgo/symbolflags.go` | Vendored for flag-constant generation |
| `_packages/native-preview/src/ast/ast.generated.ts` | `src/ast/ast.generated.ts` | (planned adoption) |
| `_packages/native-preview/src/ast/factory.generated.ts` | `src/ast/factory.generated.ts` | (planned adoption) |
| `_packages/native-preview/src/ast/is.generated.ts` | `src/ast/is.generated.ts` | (planned adoption) |
| `_packages/native-preview/src/ast/visitor.generated.ts` | `src/ast/visitor.generated.ts` | (planned adoption) |
| `_packages/native-preview/src/ast/scanner.ts` | `src/scanner/scanner.ts` | (planned: replace existing 574-LOC scanner) |
| `_packages/native-preview/src/ast/astnav.ts` | `src/astnav/astnav.ts` | (planned adoption) |
| `_packages/native-preview/src/ast/clone.ts` | `src/ast/clone.ts` | (planned adoption) |
| `_packages/native-preview/src/ast/is.ts` | `src/ast/is.ts` | (planned adoption) |
| `_packages/native-preview/src/enums/*.ts` | `src/enums/*.ts` | (planned adoption) |
| `internal/checker/checker.go` | `src/checker/checker.ts` + split files | 31K LOC; will split |
| `internal/checker/relater.go` | `src/checker/relater.ts` | port |
| `internal/checker/inference.go` | `src/checker/inference.ts` | port |
| `internal/parser/parser.go` | `src/parser/parser.ts` | port (existing 1666-LOC TSTS parser to be expanded/replaced) |
| `internal/binder/binder.go` | `src/binder/binder.ts` | port |

## Sources outside `internal/` we draw from

| TS-Go path | Purpose for TSTS |
|---|---|
| `_packages/native-preview/src/ast/*.ts` | TypeScript AST bindings (generated + hand-written), adopted as TSTS foundation |
| `_packages/native-preview/src/enums/*.ts` | TS-Go enum definitions in TypeScript |
| `_packages/native-preview/src/api/node/protocol.ts` | Schema sibling (vendored in `schema/tsgo/`) |
| `_scripts/ast.json` + `schema.ts` | Schema source of truth for AST generation |
| `testdata/` | Test cases + baselines (vendored as `_testdata/tsgo/`) |
| `_submodules/TypeScript` | Upstream TypeScript test corpus |

## Refresh procedure

When the TS-Go schema pin (`schema/tsgo/VERSION.md`) is bumped:

1. Re-copy `ast.json`, `ast.schema.json`, `nodeflags.go`, `symbolflags.go`, `protocol.ts` from the new TS-Go commit.
2. Update SHA hashes in `VERSION.md`.
3. Document drift in `VERSION.md` "Refresh — YYYY-MM-DD" section.
4. Re-vendor any adopted TypeScript files from `_packages/native-preview/src/`.
5. Re-run `npm run verify`.
6. Manually inspect test pass-rate delta to spot regressions.

Schema pin refresh cadence: monthly during active development.

## Discipline

When porting a file from TS-Go, the destination is determined mechanically:

```
internal/{module}/{file}.go    →    src/{module}/{kebab-case-of-file}.ts
```

No design discussion required per file. The structure is decided by TS-Go.

When the rule conflicts with TypeScript practicality (e.g., 30K-LOC file), follow §"File-naming rules" above. Deviations get a row in this document.
