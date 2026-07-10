# TS-Go-Accepted Baseline Evidence

TSTS is a mechanical 1:1 port of the pinned TS-Go compiler. The exact-baseline gate normally
compares TSTS with the Strada reference baselines in the pinned TypeScript submodule. A small
number of transpile artifacts differ in pinned TS-Go itself. Those differences are accepted only
through the provenance-closed evidence chain in this directory.

## Evidence model

The active expectation is not a hand-edited flat overlay:

1. `plans/transpile-divergences-v1.json` declares every case, configuration, complete reference
   artifact set, divergent section occurrence, action, and durable reason.
2. `captures/<capture-id>/` contains the exact inputs, command records, stdout/stderr, emitted
   workspace, divergent section bytes, producer provenance, and a recursive immutable seal.
3. `bindings/<binding-id>/` binds each expectation file and section digest to one sealed
   capture. It has its own recursive immutable seal.
4. `active.json` selects one capture/binding pair by identity and seal digest.
5. The suite verifies the source pin, plan, current case/baseline bytes, barebones library,
   capture seal, binding seal, complete overlay inventory, and every section digest before use.

The original `manifest.json` and flat files under `typescript/transpile/` are retained as
historical evidence only. They are neither an authority nor a runner input.

## Production boundary

`capture-tsgo-accepted.mjs` does not accept a compiler path. It builds the compiler through the
content-addressed pinned-Go producer from the exact clean TS-Go revision in
`schema/tsgo/source-pin.json`. The producer records the Go executable digest, toolchain and
target values, build flags, VCS revision/tree/dirty state, binary digest, and fixed semantic
environment.

Capture is additive and does not alter the active expectation:

```sh
npm run tsgo-accepted:capture
```

That command always executes the complete capture. If the same request already exists, the new
sealed result must be byte-for-byte deterministic with it; the independently produced replay is
retained under `.temp/tsgo-accepted/verified-replays/`. Review the new immutable capture and
binding directories, then update `active.json` through normal code review. The generator has no
activation option, so production and promotion cannot collapse into one command.

Offline verification of the active evidence chain is:

```sh
npm run tsgo-accepted:verify
```

## Invariants

- Never derive accepted output from TSTS.
- Never supply an arbitrary TS-Go binary.
- Never hand-edit capture, binding, seal, or bound-overlay files.
- Every planned section must differ from its Strada section.
- An absent section must exist in Strada and be absent from pinned TS-Go output.
- Every invocation runs in its own copy of an immutable input workspace and must return compiler
  status 0, 1, or 2 before the timeout; status, argv, stdout, stderr, output inventory, and final
  workspace are retained.
- Every expected output and aggregate diagnostic is compared with the complete Strada artifact
  set. The observed difference set must equal the reviewed plan exactly; undeclared and stale
  divergences both fail.
- Capture inputs are rehashed after execution before publication.
- Publication never overwrites a capture or binding directory.
- Inactive historical evidence may remain; only `active.json` controls consumption.
- A source pin, plan, case, baseline, barebones-lib, capture, binding, or section drift fails
  before the expectation is used.
