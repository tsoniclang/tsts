# Agent Notes (TSTS)

`AGENTS.md` and `CLAUDE.md` must remain byte-identical. Apply every change
to both and verify with `cmp`.

## Product Ownership

TSTS is the reproducible product assembly for the TypeScript compiler generated
from the pinned Microsoft TS-Go source by the pinned GoToTS compiler.

- `vendor/typescript-go` owns the selected Go source.
- `tools/gotots` owns generic Go-to-TypeScript translation.
- `gotots.json` owns the canonical Go translation profile.
- `typescript-target.json` owns the executable TypeScript target profile.
- `implementations/` owns certified TSTS-specific package implementations.
- `generated/source/` owns the committed, derived final TypeScript product
  snapshot. It is refreshed only by `npm run generate` and is never
  hand-edited. Emitted JavaScript remains transient runtime evidence.
- `.temp/` owns uncommitted generation, verification, and failure evidence.

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

The selected Go and TypeScript target profiles are explicit and versioned in
`gotots.json` and `typescript-target.json`. They must not come from ambient
shell state. Every implementation bundle is package-atomic,
signature-certified, strict-ESM, and selected before output is sealed.

The selected TSTS product is synchronous. `gotots.json` owns that language
decision with concurrency disabled. GoToTS must emit synchronous callable
contracts directly; `typescript-target.json` requires the TypeScript target
to reject authored suspension syntax before publication. The target may lower
pointer, scalar, and representation shapes, but it must not infer effects,
consume effect manifests, or remove `Promise`, `async`, or `await` after
generation. A cooperative product requires separate explicit authority and is
not a fallback path.

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
8. exact-join the regenerated final TypeScript with `generated/`;
9. fail on stale implementation contracts or unselected generated remnants.

Heavy jobs run serially through `scripts/run-guarded.sh`. Preserve failed
artifacts and never retry an OOM with the same unbounded command.
Assembly tests, exact toolchain construction, product generation/typecheck,
and runtime replay each own a fresh guarded transaction; never wrap the
complete checkpoint in one resource scope.
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

## Repository Safety

- Never force-push or delete remote branches or tags.
- Work on feature branches and merge through pull requests.
- Never edit or commit files inside either submodule.
- Never commit `.analysis/`, `.temp/`, or local logs.
- Never hand-edit `generated/`; commit its complete `npm run generate` result.
- Never use `git stash`.
