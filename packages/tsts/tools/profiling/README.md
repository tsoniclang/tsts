# TSTS performance evidence

The profiling harness measures a closed TypeScript workload with the current
prepared TSTS build, the source-pinned TS-Go producer, and the repository's
exact TypeScript package. It is a provenance-bearing regression verifier, not a
translator and not a collection of unsealed timing anecdotes.

## Policy and gate

`performance-policy.json` is the versioned measurement and regression policy.
It fixes the corpus, required metrics, equivalent-work checks, warmup/measured
round counts, gated metrics, accepted known-good report, and per-metric limits.
The checked-in policy deliberately starts with `calibration-required`: no
calibration numbers have been invented, and `npm run profile:gate` fails before
building or measuring until maintainers bind a measured baseline.

Capture a candidate on the stable host that will run the gate:

```bash
node packages/tsts/tools/profiling/bench.mjs \
  --record-baseline packages/tsts/tools/profiling/baselines/<candidate-id>
```

Review `summary.md`, all raw samples, and each gated metric's coefficient of
variation. Then set the policy baseline to `calibrated`, using the candidate's
relative directory, sealed `evidenceDigest`, and `reportId`; set regression and
dispersion limits from the measured calibration and the intended performance
budget. The policy loader rejects partial bindings, missing limits, limits below
1 for regression ratios, and invalid evidence IDs. A maintainer must make this
acceptance decision; the harness never derives permissive limits from the run it
is supposed to gate.

After calibration:

```bash
npm run profile:gate
```

The gate compares current TSTS medians with the sealed known-good TSTS medians.
TS-Go and `tsc` ratios remain context only. The gate also requires compatible
host, harness, corpus, sampling policy, and exact TS-Go/`tsc` reference evidence,
and rejects excessive dispersion in either the current or baseline sample set.
Gate failures are written as sealed reports before the command exits nonzero.

## Measurement

```bash
node packages/tsts/tools/profiling/bench.mjs [--profile] [--no-build] [--output <new-directory>]
node packages/tsts/tools/profiling/bench.mjs --verify-report <sealed-directory>
```

- TSTS is always built through `tools/tsts-build.mjs`; its sealed prepared-build
  evidence binds the exact current source, build driver, TypeScript producer,
  runtime, command, environment, and emitted `dist` bytes.
- TS-Go is always acquired through `tools/pinned-go-producer.mjs` from the
  verified `schema/tsgo/source-pin.json` revision. Arbitrary compiler overrides
  are rejected.
- `tsc` is the exact repository `node_modules/typescript` package. The Node and
  GNU `time` executable bytes are recorded.
- Children receive a complete minimal environment with empty `NODE_OPTIONS` and
  `NODE_PATH`, isolated home/cache/temp directories, fixed locale/time zone, and
  no ambient environment inheritance. Startup `execArgv` and compiler override
  variables are rejected.
- Every invocation is a fresh compiler process. The first policy rounds are
  explicitly **system-cache warmups**, not claimed JIT warmups. Warmup and
  measured rounds rotate compiler order to reduce fixed-order bias.
- Every sample must contain Files, Lines, Parse, Bind, Check, Total,
  compiler-reported memory, wall/user/system/CPU time, CPU utilization, and
  maxRSS. Missing metrics fail the run; aggregation never drops missing values.
  Reports include median, min, max, mean, sample standard deviation, MAD, and CV.
- Before timing, every compiler runs `--listFilesOnly` under the same closed
  environment. Every selected file must be a canonical regular file inside the
  read-only staged project; paths and byte identities are sorted, hashed, stored
  for each compiler, and required to match exactly. Files and Lines must also
  match across all compilers and all rounds. The selected-input receipt, closed
  tree, identical arguments, and successful exits form the equivalent-work proof.

Measurement/gate outputs are restricted to unique no-overwrite directories
under `.tests/profiling/runs/`; baseline candidates are restricted to
`packages/tsts/tools/profiling/baselines/`. Each successful measurement contains `report.json`,
`summary.md`, optional profiles, full compiler/corpus/harness/host evidence, and
`COMPLETE.json`. The directory inventory and metadata are sealed and verified
before atomic publication. `--output` and `--record-baseline` also refuse to
replace an existing path.

## Closed workload

`corpus.default.json` uses schema 2. Inputs are copied into a unique temporary
tree outside the repository, checked byte-for-byte against their source
evidence, made read-only, and hashed after every compiler invocation. Corpus
sources, compiler producers, and harness files are reverified after measurement.
The default compiler-shaped fixture supplies its own `noLib` declarations and
replicates independent parser/checker/flow-style modules, so all three compilers
see the same nontrivial files and no ambient `node_modules` or standard library.
Every corpus project has the same obligation: all files selected by the compiler,
including library declarations, must be staged inputs. A project that selects a
compiler-owned standard library outside its sealed staging root fails the
selected-input preflight; use `noLib` with an explicit staged library instead.

Each project has this shape:

```json
{
  "name": "safe-report-name",
  "cwd": "project",
  "args": ["-p", "tsconfig.json", "--noEmit", "--incremental", "false"],
  "inputs": [
    {
      "label": "complete-input",
      "source": "path-relative-to-corpus",
      "destination": "project",
      "replicas": 1
    }
  ]
}
```

Names and paths are traversal-safe. Compiler arguments are a closed contract:
exactly one project option, `--noEmit true`, and `--incremental false` are
required; response files, option terminators, additional inputs, and every
other compiler option are rejected. Workload-specific settings belong in the
sealed project configuration rather than an open command line. `replicas`
copies a directory into zero-padded child directories and is useful for a
checked-in deterministic workload template.

## Profiles

`--profile` captures one V8 CPU profile and one heap-allocation profile for each
project using the same prepared TSTS build, closed tree, arguments, timeout, and
environment. Paths are unique and derived only from validated project names.
Attribution output is captured into the report instead of being mixed with JSON
or timing output. All profile bytes are part of the final evidence seal.

`attribute.mjs` groups CPU self-time and heap allocation into named compiler and
runtime buckets. Bucket labels are diagnostic hypotheses; only measured profile
bytes and the sealed attribution output are evidence.

## Other commands

`self-compile-bench.mjs` is now a compatibility entry point for the same default
closed policy pipeline; it no longer maintains a second threshold architecture.
`utf8-bench.mjs` and `scanner-bench.mjs` remain exploratory microbenchmarks.
They acquire the same source-bound prepared TSTS build, reject injected Node
startup state, reverify build/harness inputs, and report raw samples plus
dispersion and functional checks. They are not sealed regression gates and do
not establish preservation of whole-compiler gains.
