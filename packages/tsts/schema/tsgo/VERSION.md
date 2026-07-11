# TS-Go Schema Pin

TSTS vendors the TS-Go AST schema as the exact frontend contract.

| Field | Value |
| --- | --- |
| Upstream | `microsoft/typescript-go` |
| Commit | `168e7015edf98244febc8f4ae450b673b5d195d7` |
| Git object format | `sha1` |
| Nested TypeScript commit | `4d4f005c8541e0255a9d8791205fdce326e462bc` |
| Go toolchain executable SHA-256 | `86b748c64de0175db601f56805251f3b08cd12bffb927ad5c68ef8497c50c7ba` |
| Go GOROOT hash contract | `tsts-porter-goroot-tree-v1` |
| Go GOROOT tree SHA-256 | `97e26a04c728a7dc6b39db3198b9d3b6ae89abb5d97f28e082509c8082205447` |
| `ast.json` SHA-256 | `8f9117acd1ba332beb8222e4f958346a6846dc0acbcb75d1c20a7bb0eef68689` |
| `ast.schema.json` SHA-256 | `c614df46892e8623fcb4ba9d2cbdc4da2537af140674776f3dbb78e96cdf16d2` |
| `protocol.ts` SHA-256 | `02662b99b9e40190fc56b7210139175d043e369c59345b61fb5c5533bdd42830` |
| `nodeflags.go` SHA-256 | `8be5737c5cfe5478fcef3f0b50847d7ca4045157a6d039ffaac658977a181dc2` |
| `symbolflags.go` SHA-256 | `eb2c56aac8513ac676f48313eb5c3fa65ba90990474b7e873ff9ec6cdb35ebca` |
| Source `_packages/native-preview/src/api/node/protocol.generated.ts` SHA-256 | `e22fa883d199c0cb11c6bf5961dbae322e36c3bccb3ef9679555e9d1e3d1acc1` |

## Policy

- Generated AST contract code must be derived from these files.
- Schema drift is a hard failure.
- Updating the schema requires updating this file, regenerating artifacts, and explaining the upstream TS-Go change.
- The AST schema inputs must not be pinned on a separate track from the source
  submodule. `source-pin.json` is the machine-readable authority for the source,
  nested TypeScript checkout, schema paths, byte hashes, and extractor toolchain.
  `porter:verify` inventories every file in this directory, compares every
  upstream copy byte-for-byte against the clean pinned source tree, validates this
  document against the manifest, and fails on any provenance or classification
  drift.
- Porter also pins the exact Go executable and the complete GOROOT tree used by
  semantic extraction. The GOROOT digest covers normalized relative paths,
  entry kinds, permission bits, file bytes, and symlink targets; mutation,
  escaping symlinks, unsupported file kinds, and toolchain auto-downloads fail
  closed.

## Pin bump — 2026-07-10

Bumped the TS-Go source and schema pin together from
`c78d39e7075b4fc641b12b1f35d905c54cdc13ef` to
`168e7015edf98244febc8f4ae450b673b5d195d7`. The nested TypeScript source is
`4d4f005c8541e0255a9d8791205fdce326e462bc`. The final two upstream commits
close a concurrent auto-import extraction-cache race and validate malformed
project-reference fields; neither changes the schema or nested TypeScript pin.

Schema input drift across that range:

- `ast.json` — changed; generated node/data infrastructure must be regenerated.
- `ast.schema.json`, `protocol.ts`, `nodeflags.go`, `symbolflags.go` — unchanged.

The schema inventory is now exhaustive rather than an allowlist of sync checks:
adding any file to this directory without an explicit policy fails the porter.

## Pin bump — 2026-06-13

Bumped the schema directory and the TS-Go source submodule together from
`515d036f927aba8b468011098e2721335f0e2d00` (2026-04-24) to
`c78d39e7075b4fc641b12b1f35d905c54cdc13ef` (2026-06-12), 285 upstream commits.

Schema input drift across that range:

- `ast.json` — changed (new AST node shapes / kinds).
- `nodeflags.go` — changed (new node flags).
- `symbolflags.go` — changed (symbol-merge exclusion masks now exclude accessor/
  property cross-merges; this is the upstream behaviour the bump adopts).
- `ast.schema.json`, `protocol.ts` — unchanged.

Generated AST artifacts were regenerated from these inputs; the hand-ported
`internal/ast/symbolflags.ts` was re-ported to the new masks as part of the bump.
