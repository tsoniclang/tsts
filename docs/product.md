# TSTS Product Contract

## Ownership

TSTS assembles one generated compiler. TS-Go defines the source behavior,
GoToTS defines generic translation, and this repository defines product
selection. No product decision is encoded in GoToTS.

## Pinned Inputs

The gitlinks are authoritative:

- `vendor/typescript-go`: selected Microsoft TS-Go source;
- `tools/gotots`: selected GoToTS compiler and provider distribution.

A pin changes only with differential product evidence.

## Selected Profile

`gotots.json` selects `./cmd/tsgo` for Linux/amd64 with cgo disabled and the
`noasm` build tag. Integers use the JavaScript-number profile, evaluation
order uses the direct profile, and Go concurrency uses cooperative execution.
Standard-library and external providers are enabled.

## Product Implementations

`implementations/xxh3` atomically replaces
`github.com/zeebo/xxh3@v1.1.0` for this profile. Its bounded internal
equivalence envelope permits a fast deterministic internal digest because TSTS
uses the result only as an internal equality/cache identity. The envelope is
invalid if digest values become externally visible, persisted, serialized, or
compared with canonical XXH3 vectors.

The generated package implementation and every generated package body are
absent when the bundle is selected. Consumers retain ordinary generated
imports and source-facing signatures.

The product check executes the selected implementation itself over a fixed
10,012-input collision corpus and verifies deterministic hashing, incremental
and one-shot agreement, reset behavior, byte projection, and seeded hashing.
The native/generated compiler differential separately proves that this bounded
algorithm substitution does not change the selected compiler outputs.

## Exit Evidence

A release candidate must generate and strict-typecheck the complete compiler,
emit JavaScript, and compare the generated executable with pinned native TS-Go
on valid input, syntax diagnostics, and semantic diagnostics. Exit status,
stdout, and stderr are compared exactly for the certified fixtures; the valid
fixture's emitted file set and bytes are also exact-joined. Generation,
typecheck, startup, minimal-compilation time, peak RSS, source size, and output
size are reported at the exact pins.

The guarded check preserves a previous run's emitted JavaScript by moving it
to a timestamped `.temp/preserved/` directory before re-emitting. Failed
runtime artifacts therefore remain inspectable without contaminating or
blocking the next exact assembly.

`npm run replay` resumes from the current certified generated source and runs
only JavaScript emission, provider assembly, native TS-Go construction, and
the exact runtime differential. It uses the same guarded execution and output
preservation policy as the full check.
