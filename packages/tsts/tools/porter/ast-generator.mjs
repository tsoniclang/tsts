// TSTS AST generator.
//
// Reads the checked-in AST schema (packages/tsts/schema/tsgo/*) and emits the
// generated AST infrastructure under packages/tsts/src/internal/ast/generated/.
// This is the TypeScript analogue of TS-Go's ast_generated.go / kind_generated.go
// / kind_stringer_generated.go, produced deterministically from the same schema.
//
// Output files carry file-level @tsgo-generated metadata and are checked the same
// way as the Go-compat facades: missing / stale / orphan / untracked / invalid.
// Safe-write contract: create missing, no-op identical, fail on different unless
// --force.
//
// Emitters are intentionally incremental. The NodeData-independent surfaces
// (kinds, flags) land first; node/data/adapters/factory/visitor follow under the
// same pipeline.

export { astConfig, loadAstSchema } from "./ast-generator/config.mjs";
export { emitKinds, parseGoFlagFile } from "./ast-generator/flag-emitters.mjs";
export { parseGoNodeDataMethods } from "./ast-generator/node-emitters.mjs";
export {
  assertProtocolGeneratedMatchesSchema,
  buildAstGeneratedArtifactStatus,
  buildAstGeneratedFiles,
  buildGeneratedAstSkips,
  collectAstArtifactFailures,
  emptyAstGeneratedArtifactStatus,
  writeAstGenerated,
} from "./ast-generator/artifacts.mjs";
