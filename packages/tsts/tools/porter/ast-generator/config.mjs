import { readFileSync } from "node:fs";
import path from "node:path";

import { resolveRepo } from "../porter.mjs";

// ---------------------------------------------------------------------------
// Config / schema loading
// ---------------------------------------------------------------------------

export function astConfig(config) {
  const tsRoot = (config.tsRoot ?? "packages/tsts/src").replace(/\/$/, "");
  return {
    tsRoot,
    schemaDir: config.astSchemaDir ?? "packages/tsts/schema/tsgo",
    generatedDir: config.astGeneratedDir ?? "internal/ast/generated",
    schemaInputs: config.astSchemaInputs ?? [
      "packages/tsts/schema/tsgo/ast.json",
      "packages/tsts/schema/tsgo/ast.schema.json",
      "packages/tsts/schema/tsgo/nodeflags.go",
      "packages/tsts/schema/tsgo/symbolflags.go",
    ],
  };
}

export function loadAstSchema(config) {
  const ac = astConfig(config);
  const astJsonPath = resolveRepo(path.join(ac.schemaDir, "ast.json"));
  const nodeFlagsPath = resolveRepo(path.join(ac.schemaDir, "nodeflags.go"));
  const symbolFlagsPath = resolveRepo(path.join(ac.schemaDir, "symbolflags.go"));
  return {
    ast: JSON.parse(readFileSync(astJsonPath, "utf8")),
    nodeFlagsSource: readFileSync(nodeFlagsPath, "utf8"),
    symbolFlagsSource: readFileSync(symbolFlagsPath, "utf8"),
  };
}
