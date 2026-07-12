# Porter Change Tracking Contract

Porter compares two exact, clean TS-Go source trees as declaration inventories.
It does not translate implementation bodies and does not infer whether a source
change is behaviorally equivalent.

## Inputs

Each scan is bound to:

- the complete clean TS-Go Git tree and revision;
- every nested source revision;
- the copied schema files and their source hashes;
- the exact Go executable and GOROOT tree;
- the complete declaration-bearing Go file set and build-profile evidence.

A dirty, incomplete, unpinned, or changing input fails before evidence is
accepted.

## Declaration Evidence

The Go extractor records every declaration-bearing source file and every
top-level declaration. Canonical `go/types` evidence closes:

- functions and methods, including receiver, generics, constraints, parameters,
  variadics, and results;
- named types, aliases, structs, interfaces, embedded types, type sets, and tags;
- constants and variables, including exact constant values;
- all supported build-profile variants.

Implementation bodies contribute no unit evidence. They are never traversed,
hashed, copied, or compared for imports, types, ownership, control flow, risk
classification, or semantic comparison.

## Delta Evidence

`porter delta` scans both source trees twice and fails if either scan is
nondeterministic. The resulting immutable evidence records:

- complete file additions, removals, and byte changes, rooted in the exact Git
  commit objects and reconstructed root trees;
- the exact clean Porter implementation commit and tree used for extraction;
- declaration additions, removals, moves, and signature changes;
- every changed top-level semantic snapshot inventory;
- canonical semantic declaration changes by build profile;
- exact constant changes;
- the full normalized extractor/toolchain profile;
- every effective file/unit policy and the exact policy contract;
- every generated-source mechanism and its per-revision coverage.

Body-only edits remain visible in the complete tracked-tree and Go-file change
sets. They do not create declaration-unit changes.

Move candidates are evidence only. Porter never treats an orphan/missing pair as
equivalent and never rewrites or re-stamps authored TypeScript.

`porter delta-verify` requires the same explicit old and new clean checkouts. It
reruns each extractor twice and recomputes every artifact; an internally
consistent replacement snapshot, tree list, policy summary, or completion
envelope is rejected unless it is also the exact result of those checkouts.
Both commands reject hidden Git index state. Delta output must be outside the
source checkouts so publishing evidence cannot invalidate its own provenance.

## TypeScript Reconciliation

TypeScript declaration ownership comes only from parser-attached `@tsgo-unit`
metadata on the exact top-level declaration. Marker-like source text elsewhere
has no meaning. Porter parses every supported declaration and compares its
structured signature against the canonical Go declaration.

TypeScript declaration constants use one result contract: exact
`{ status: "known", value: { kind, value } }`,
`{ status: "missing", reason }`, or
`{ status: "unsupported", astKind, reason }` records. Missing/additional keys,
accessors, invalid discriminants, and mismatched primitive value shapes fail.
`missing` denotes an absent initializer; `unsupported` denotes a present
initializer outside the closed declaration grammar or an unresolved declaration
reference. An absent environment route is JavaScript `undefined`, not a fourth
result state.

Constant routes include identifier-bound module/namespace `const` declarations,
enum members, and top-level default value expressions. A path such as
`Values.Second` is resolved from the exact TS-Go property-access schema and never
as a runtime object read. Porter does not collect `let`, `var`, binding patterns,
or function-local constants, and it never enters an implementation body to find
constant evidence.

The comparison uses exact module/export/object identity. It has no terminal-name
matching, suffix aliasing, source-spelling guesses, structural waivers, or
compatibility path.

Dependency declaration evidence is split by ownership. The semantic snapshot's
`dependencyTypeDeclarations` collection is a type-only transitive closure rooted
in active local declaration signatures. External-package entries may receive
generated facades; excluded module-local entries require exact reviewed
`go-type-storage` relations. The collection is neither a package API inventory
nor a source for generated functions, constants, or variables. A reviewed
authored package surface is an independent explicit partial contract and cannot
seed the generated type closure.

Any reviewed declaration divergence must use one local `@tsgo-override` with:

- a registered timeless category;
- a durable reason;
- one or more current declaration aspects (`signature`, `initializer`, or
  `value-order`);
- exact Go and TypeScript snapshots for every allowed aspect.

This local override rule governs mechanically ported `@tsgo-unit`
declarations. External Go facade storage has no local TS-Go source unit and uses
one separate closed policy: exact Go object identity, exact TypeScript storage
identity, durable adaptation reason, and a hash of every complete canonical Go
declaration variant plus its profile set. A method
stored as a top-level function is bound by exact Go method identity; its
signature is still derived from Go rather than restated in policy.

Parameter defaults belong to `signature`. `initializer` applies only to
top-level `constGroup` values. Member implementation initializers and function,
method, accessor, constructor, and static-block bodies have no Porter override
category because they are outside the declaration/signature contract.
Ordinary top-level `var` declarations retain exact declaration and inferred-type
comparison, but their TypeScript initializer expressions are implementation
bodies and are not compared.

Unknown aspects and noncontract metadata/configuration shapes fail. Body exceptions
do not exist.

## Verification Bar

Strict verification fails on any:

- missing, stale, orphan, duplicate, or untracked declaration;
- forbidden or unclassified source file;
- unresolved or unsupported signature shape;
- malformed or unsupported declaration-constant evidence;
- source-pin, schema, generated-artifact, or toolchain drift;
- declaration or JSON-tag mismatch;
- omitted/extra authored facade members, stale scalar facade snapshots, or invalid facade method bindings;
- exported TypeScript declarations without a Go unit in a `requires-tsgo-unit` module;
- invalid, stale, broad, or unused local override;
- nondeterministic scan or delta evidence.

False positives are preferable to silent misses. A new upstream shape must be
modeled at the extractor/schema/comparator boundary or rejected explicitly; it
must never acquire an approximation or fallback.

Audit execution is evidence. Every declaration subaudit records `complete` or
`not-run` independently, with a reason for non-execution; skipped checks are
never represented as zero findings. Trusted verification requires every
whole-program subaudit, including declaration ownership, and rejects filtered
signature evidence. A completed report preserves every concrete inventory row
alongside counts. Parser freshness uncertainty is a failure, and the
authoritative Porter test gate includes both recursive Node tests and the Go
extractor test suite.
