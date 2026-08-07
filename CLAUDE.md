# Agent Notes (TSTS)

`AGENTS.md` and `CLAUDE.md` must remain byte-identical. Apply every change
to both and verify with `cmp`.

## Product Ownership

TSTS is the reproducible product assembly for the TypeScript compiler generated
from the pinned Microsoft TS-Go source by the pinned GoToTS compiler.

- `vendor/typescript-go` owns the selected Go source.
- `tools/gotots` owns generic Go-to-TypeScript translation.
- `gotots.json` owns the selected product profile.
- `implementations/` owns certified TSTS-specific package implementations.
- Generated TypeScript and JavaScript are build artifacts under `.temp/` and
  are never hand-edited or committed.

Do not add TS-Go-specific behavior to GoToTS. Do not patch either submodule in
this repository. A generic compiler defect is fixed and certified in GoToTS,
then the submodule pin is advanced. A product-only implementation or
equivalence envelope remains in TSTS.

## Begin With WCBUBWHB

Before design or edits, establish:

1. the concrete source, generated-artifact, or runtime problem;
2. the complete semantic class;
3. whether TS-Go, GoToTS, or TSTS owns the truth;
4. the highest layer that eliminates the class;
5. the path that must be deleted rather than wrapped;
6. the simplest exact final architecture;
7. source-size, typecheck, memory, runtime, and consumer consequences;
8. source -> decision -> generated output examples;
9. independent differential and mutation proof;
10. broad searches proving no sibling or fallback survives.

One fact has one owner. There is one current path. No compatibility route,
spelling heuristic, source scan, dynamic semantic dispatch, `any` recovery,
`unknown` recovery, or post-generation text patch is allowed.

## Product Contract

The selected profile is explicit and versioned in `gotots.json`. It must not
come from ambient shell state. Every implementation bundle is package-atomic,
signature-certified, strict-ESM, and selected before output is sealed.

TSTS public behavior is compared against the exact pinned TS-Go revision.
Intentional internal equivalence envelopes must be named, bounded, and proven
not to escape into observable output. Compile-only success is not runtime
parity.

## Verification

Every product checkpoint must:

1. verify clean, exact submodule pins;
2. build GoToTS and generate TSTS under the memory guard;
3. strict-typecheck generated TypeScript before JavaScript emission;
4. execute valid, syntax-error, and semantic-error fixtures;
5. compare exit status, stdout, and stderr with pinned native TS-Go;
6. inspect generated artifacts and implementation replacement;
7. report generation/typecheck/runtime time, peak RSS, and output size;
8. fail on stale implementation contracts or unselected generated remnants.

Heavy jobs run serially through `scripts/run-guarded.sh`. Preserve failed
artifacts and never retry an OOM with the same unbounded command.

## Repository Safety

- Never force-push or delete remote branches or tags.
- Work on feature branches and merge through pull requests.
- Never edit or commit files inside either submodule.
- Never commit `.analysis/`, `.temp/`, generated output, or local logs.
- Never use `git stash`.
