# Pinned TS-Go Declaration Bridge

Porter derives TypeScript declaration evidence from the exact TS-Go revision in
`../source-pin.json`. It does not parse declarations with the current TSTS
build, TypeScript JavaScript objects, or a configurable parser.

## Contract

The Go executable parses TypeScript with the pinned TS-Go parser and serializes
the result with TS-Go's official source-file encoder. A dedicated Node worker
decodes that binary with the matching pinned native decoder. The canonical
adapter then projects only schema-declared node members into immutable,
Go-shaped declaration objects. Function bodies are opaque: Porter records the
body node's existence and span but never materializes its statements.

Each request and response is checked for exact keys, normalized absolute source
identity, source SHA-256, pinned source revision, encoder protocol version,
array cardinality, node/list spans, diagnostics, and concrete-kind schema
coverage. Every one of the pinned schema's 351 concrete kinds must resolve to
one unambiguous node definition before parsing starts.

## Pinned Decoder Corrections

The bridge has two explicit corrections for omissions in the pinned native
preview path. Neither changes TypeScript syntax or declaration semantics.

1. TS-Go's scanner fast path for a string without escapes skips updating
   `SourceFile.ContainsNonASCII`. The official encoder then treats UTF-8 byte
   offsets as UTF-16 offsets. Before encoding, the bridge sets that same TS-Go
   source-file field when the source bytes prove non-ASCII content. Tests pin
   node and diagnostic offsets after an astral character.
2. TS-Go's encoder stores `NoSubstitutionTemplateLiteral.TemplateFlags`, but
   the pinned TypeScript native decoder exposes that getter only for template
   head/middle/tail nodes. The bridge carries the exact indexed Go scalar in
   its response. The adapter accepts it only for a no-substitution template and
   rejects missing, misplaced, negative, or out-of-range evidence. A nonzero
   escaped-template case proves the side channel is not a zero-value fallback.

These are narrow evidence-transport corrections. Adding another correction
requires an independently reproduced encoder/decoder omission, an exact Go
source value, strict response validation, and a regression test. Defaults,
name inference, raw decoder-object probing, and compatibility paths are not
accepted.

## Build Provenance

`build.mjs` verifies the vendored TS-Go checkout, nested source pin, object
format, clean state, and pinned Go toolchain before building. The output path is
content-addressed by source revision and bridge inputs. The source revision is
linker-embedded into the executable and verified again by the worker's startup
probe.
