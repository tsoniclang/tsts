# Agent Notes (TSTS)

The canonical workspace policy in `../AGENTS.md` applies. This file contains
only TSTS product-assembly, submodule, and verification rules.

## Product Ownership

TSTS is the reproducible product assembly for the TypeScript compiler generated
from the pinned Microsoft TS-Go source by the pinned GoToTS compiler.

- `vendor/typescript-go` owns the selected Go source.
- `tools/gotots` owns generic Go-to-TypeScript translation.
- `gotots.json` owns the canonical Go translation profile.
- `typescript-target.json` owns the executable TypeScript target profile.
- `implementations/` owns certified TSTS-specific package implementations.
- Generated TypeScript and JavaScript are build artifacts under `.temp/` and
  are never hand-edited or committed.

Do not add TS-Go-specific behavior to GoToTS. Do not patch either submodule in
this repository. A generic compiler defect is fixed and certified in GoToTS,
then the submodule pin is advanced. A product-only implementation or
equivalence envelope remains in TSTS.

## Product Contract

The selected Go and TypeScript target profiles are explicit and versioned in
`gotots.json` and `typescript-target.json`. They must not come from ambient
shell state. Every implementation bundle is package-atomic,
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
Remove successful scratch only after its owning transaction commits, through
the path-confined scratch-lifecycle owner; never retain successful staging
trees as failure evidence.
The exact-toolchain environment must retain the guard's committed Go and Node
process limits; a closed-environment reset may not erase resource policy.

Keep agent output bounded. Preserve complete logs and profiles under `.temp/`
and inspect targeted summaries; never stream generated trees, full manifests,
whole traces, or profiler payloads into the agent transcript. Do not attach a
whole-product V8 CPU profiler to the compiler process: use deterministic phase
counters or bounded phase timing, then profile only the isolated phase.

## Submodule Safety

- Never edit or commit files inside either submodule.
