import path from "node:path";

import { AstSchema } from "../ast-schema-model.mjs";
import { readStableRegularFile } from "../core/provenance-filesystem.mjs";
import { normalizeGeneratorInputs, readSourcePinManifest } from "../source-pin.mjs";
import { repoRoot, resolveRepo } from "../porter.mjs";
import { validateJsonSchemaDocument } from "./json-schema-validation.mjs";

// ---------------------------------------------------------------------------
// Config / input loading
// ---------------------------------------------------------------------------

const AST_INPUT_IDS = Object.freeze(["ast", "astSchema", "nodeFlags", "symbolFlags", "nodeData", "protocolGenerated"]);

export function astConfig(config) {
  const tsRoot = (config.tsRoot ?? "packages/tsts/src").replace(/\/$/, "");
  const { manifest } = readSourcePinManifest(repoRoot, config);
  if (manifest.schemaVersion !== 3) throw new Error(`AST generator requires source pin schemaVersion 3, got ${JSON.stringify(manifest.schemaVersion)}`);
  if (manifest.schemaDirectory !== config.astSchemaDir) throw new Error("AST generator schema directory must equal the source pin manifest schemaDirectory");
  if (manifest.sourceRoot !== config.sourceRoot) throw new Error("AST generator source root must equal the source pin manifest sourceRoot");
  const selected = normalizeGeneratorInputs(manifest).filter((input) => input.generator === "porter:ast");
  const actualIds = selected.map((input) => input.id);
  if (actualIds.length !== AST_INPUT_IDS.length || actualIds.some((id, index) => id !== AST_INPUT_IDS[index])) {
    throw new Error(`porter:ast source pin inputs must be exactly ${AST_INPUT_IDS.join(", ")} in canonical order; got ${actualIds.join(", ")}`);
  }
  const inputRegistry = Object.freeze(selected.map((input) => Object.freeze({
    id: input.id,
    path: joinRepoPath(input.inventory === "schemaFiles" ? manifest.schemaDirectory : manifest.sourceRoot, input.path),
  })));
  return {
    tsRoot,
    schemaDir: manifest.schemaDirectory,
    sourceRoot: manifest.sourceRoot,
    generatedDir: "internal/ast/generated",
    inputRegistry,
  };
}

export function loadAstSchema(config) {
  const ac = astConfig(config);
  const inputs = ac.inputRegistry.map((input) => Object.freeze({
    ...input,
    text: readAstInput(input),
  }));
  const byId = new Map(inputs.map((input) => [input.id, input]));
  const astInput = byId.get("ast");
  const astSchemaInput = byId.get("astSchema");
  const ast = parseJsonInput(astInput);
  const jsonSchema = parseJsonInput(astSchemaInput);
  validateJsonSchemaDocument(ast, jsonSchema, astInput.path, astSchemaInput.path);
  const model = new AstSchema(ast);
  model.validate();
  return {
    ast,
    jsonSchema,
    model,
    nodeFlagsSource: byId.get("nodeFlags").text,
    symbolFlagsSource: byId.get("symbolFlags").text,
    nodeDataSource: byId.get("nodeData").text,
    protocolGeneratedSource: byId.get("protocolGenerated").text,
    inputs,
  };
}

function readAstInput(input) {
  try {
    return readStableRegularFile(resolveRepo(input.path), `AST generator input '${input.id}'`).toString("utf8");
  } catch (error) {
    throw new Error(`required AST generator input '${input.id}' at '${input.path}' cannot be read: ${error.message}`, { cause: error });
  }
}

function parseJsonInput(input) {
  try {
    return JSON.parse(input.text);
  } catch (error) {
    throw new Error(`AST generator input '${input.id}' at '${input.path}' is not valid JSON: ${error.message}`, { cause: error });
  }
}

function joinRepoPath(root, relativePath) {
  return path.join(root, relativePath).split(path.sep).join("/");
}
