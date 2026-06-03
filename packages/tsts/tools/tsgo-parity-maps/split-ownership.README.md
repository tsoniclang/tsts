# Split Ownership Map

`split-ownership.json` declares how large TS-Go `.go` files are decomposed into
multiple TSTS `.ts` files. It is a Wave-0 (0C) data deliverable for the TS-Go
logical-parity toolchain. See the steering plan §3:
`../tsgo-logical-parity-parallel-workplan.md`.

## Why this exists

TSTS must be a mechanical 1:1 port of `typescript-go`. The *only* sanctioned
structural divergence is splitting one large TS-Go file into several TSTS files.
Every other shape difference is drift. The parity tools (function-inventory,
control-skeleton) compare TSTS against TS-Go per upstream `.go` file; to do that
correctly they must know which TSTS files together implement a single `.go`
file. Without this map a tool would see e.g. 60+ checker files and have no way
to attribute them back to `checker/checker.go`.

Workplan rules (§3):

1. Splits are allowed.
2. Splits must be declared (here).
3. Undeclared extra local files are suspicious.
4. Multiple agents must use this map to avoid overlapping edits.

## Shape

```jsonc
{
  "splits": {
    "<upstream .go path relative to internal/>": [
      "<tsts .ts path relative to packages/tsts/src/>",
      ...
    ]
  },
  "multiUpstreamLocals": { ... },  // TSTS files that draw from >1 upstream file
  "barrels": { "files": [ ... ] }, // ESM index.ts re-export scaffolding (not splits)
  "crossModuleLocals": { ... },    // TSTS dirs with no 1:1 upstream module
  "notes": [ ... ]
}
```

- Keys are upstream paths relative to `internal/` (e.g. `checker/checker.go`).
- Values are TSTS paths relative to `packages/tsts/src/` (e.g. `checker/checker.expressions.ts`).
- **Only true splits appear** — i.e. one upstream file mapped to **two or more**
  TSTS files. Clean 1:1 mappings (`checker/inference.go` -> `checker/inference.ts`)
  are intentionally omitted because they need no ownership declaration.

## How the mapping was derived (not invented)

Every entry was grounded in the actual repository, not guessed:

1. **Header comments.** Most split TSTS files carry a header citing the upstream
   `.go` file they port (e.g. `checker.expressions.ts`: "Part of the `checker.go`
   port, split by concern"). Those references were extracted directly.
2. **Upstream function home.** For files whose header does not name the `.go`
   file (mostly `*.Parity.ts` decision-engine splits), the corresponding upstream
   function was located in `typescript-go/internal/**` and the file attributed to
   that function's home (e.g. `getTypeFacts`/`isTupleType` live in `checker.go`,
   `Ternary` in `types.go`, `SignatureCheckMode`/template-literal relations in
   `relater.go`, narrowing in `flow.go`).
3. **Filename convention.** Same-module siblings with obvious 1:1 stems
   (`binder/scope.ts`, `binder/labels.ts`, `binder/strictMode.ts` all decompose
   `binder.go`; `parser/jsdoc*.ts` decompose `parser/jsdoc.go`).

The largest legitimate split is `checker/checker.go` (a ~20k-line file) into
60+ TSTS files. That single split is the main reason per-module coverage tools
must consult this map instead of assuming file-level 1:1 parity.

## Excluded surfaces

- **Generated files** are excluded on both sides (`*.generated.ts` in TSTS;
  `*_generated.go` / `*_stringer.go` / `stringer_generated.go` in TS-Go).
  Generated-surface parity is owned by `checkGenerated.ts` / `checkSchema.ts`,
  not by this hand-port map.
- **Barrels** (`index.ts`) are ESM re-export scaffolding with no `.go`
  counterpart and are listed under `barrels`, not as splits.

## Validator

`packages/tsts/tools/checkSplitOwnership.ts` validates the map:

```bash
node packages/tsts/tools/checkSplitOwnership.ts            # human report (report mode)
node packages/tsts/tools/checkSplitOwnership.ts --json     # machine report
node packages/tsts/tools/checkSplitOwnership.ts --strict   # exit 1 on structural inconsistency
```

It checks that the JSON parses; that every upstream key resolves to a real
`.go` file; that every listed TSTS path resolves to a real `.ts` file; that each
declared split has >= 2 local files; and it reports (non-blocking) any TSTS
source file living in a split-hosting directory that is neither declared nor a
barrel — i.e. "verify it is a 1:1 port, not an undeclared split". Honors
`TSGO_REPO` (expects `<repo>/internal` to exist); when the upstream root is
absent it reports gracefully and skips upstream checks.

Current state: `--strict` exits 0 (all structural references resolve). The
`undeclared-local` findings are informational only — they are legitimate 1:1
ports (e.g. `checker/inference.ts`, `checker/jsx.ts`) and `enums/*` files with no
1:1 upstream module, not actual undeclared splits.

## Maintenance

When a TS-Go file is newly split in TSTS, add the new TSTS file under the
correct upstream key. When a 1:1 port becomes a split, promote it from implicit
1:1 to an explicit entry here. Run the validator after any change.
