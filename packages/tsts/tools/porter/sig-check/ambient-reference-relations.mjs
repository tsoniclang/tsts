import { readFileSync } from "node:fs";
import { compareText } from "../core/deterministic-order.mjs";
import { hashText, resolveRepo } from "../core/runtime.mjs";
import { semanticRelationsOfKind } from "../core/semantic-relations.mjs";
import { canonicalSchemaValue } from "../core/semantic-variants.mjs";
import { declarationDescriptor } from "../ts-extractor/ast-signatures.mjs";
import { indexTypeScriptModuleSources } from "../ts-extractor/module-index.mjs";
import { deriveAmbientLibraryClosure } from "./ambient-library-closure.mjs";

export function buildAmbientReferenceRelationRegistry({
  api,
  config,
  readSource = (file) => readFileSync(resolveRepo(file), "utf8"),
}) {
  const relations = semanticRelationsOfKind(config, "ambient-reference");
  const inventory = [];
  const mismatches = [];
  const valid = new Map();
  for (const [index, relation] of relations.entries()) {
    const label = `semanticRelations[ambient-reference:${index}]`;
    requireExactObject(relation, new Set([
      "declarationHash", "identity", "kind", "namespace", "reason", "rootDirectory", "rootFiles", "sourceSetHash",
    ]), label);
    if (typeof relation.identity !== "string" || !/^global::[^:\s]+$/.test(relation.identity)) {
      throw new Error(`${label}.identity must be one exact global declaration identity`);
    }
    if (relation.namespace !== "type") throw new Error(`${label}.namespace must be the exact 'type' namespace`);
    requireHash(relation.sourceSetHash, `${label}.sourceSetHash`);
    requireHash(relation.declarationHash, `${label}.declarationHash`);
    requireReason(relation.reason, `${label}.reason`);
    if (valid.has(relation.identity)) throw new Error(`${label} duplicates ambient identity '${relation.identity}'`);
    let closure;
    let sourceFailure = false;
    try {
      closure = deriveAmbientLibraryClosure(api, {
        readSource,
        rootDirectory: relation.rootDirectory,
        rootFiles: relation.rootFiles,
      });
    } catch (error) {
      sourceFailure = true;
      mismatches.push(contractError(relation, firstRoot(relation), error instanceof Error ? error.message : String(error)));
    }
    if (!sourceFailure && closure.sourceSetHash !== relation.sourceSetHash) {
      sourceFailure = true;
      mismatches.push(contractError(relation, closure.rootFiles[0], `ambient source set drifted: config=${relation.sourceSetHash} current=${closure.sourceSetHash}`));
    }
    let declarationHash;
    if (!sourceFailure) {
      try {
        declarationHash = ambientDeclarationContractHash(api, closure.sources, relation.identity.slice("global::".length));
        if (declarationHash !== relation.declarationHash) {
          mismatches.push(contractError(relation, closure.rootFiles[0], `ambient declaration drifted: config=${relation.declarationHash} current=${declarationHash}`));
        }
      } catch (error) {
        mismatches.push(contractError(relation, closure.rootFiles[0], error instanceof Error ? error.message : String(error)));
      }
    }
    const entry = {
      declarationHash: relation.declarationHash,
      identity: relation.identity,
      namespace: relation.namespace,
      reason: relation.reason.trim(),
      rootDirectory: relation.rootDirectory,
      rootFiles: closure?.rootFiles ?? [...(relation.rootFiles ?? [])],
      sourceFiles: closure?.sourceFiles ?? [],
      sourceSetHash: relation.sourceSetHash,
      uses: [],
    };
    inventory.push(entry);
    if (!sourceFailure && declarationHash === relation.declarationHash) valid.set(relation.identity, entry);
  }
  return {
    forUseSite(useSite) {
      return {
        accept(identity) {
          const relation = valid.get(identity);
          if (relation === undefined) return false;
          relation.uses.push(useSite);
          return true;
        },
      };
    },
    finalize() {
      for (const entry of inventory) {
        entry.uses = [...new Set(entry.uses)].sort(compareText);
        if (valid.has(entry.identity) && entry.uses.length === 0) {
          mismatches.push(contractError(entry, entry.rootFiles[0], "reviewed ambient relation was not consumed by the complete signature audit", "unused-ambient-reference-relation"));
        }
      }
      mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id));
      return { checked: inventory.length, inventory, mismatches };
    },
  };
}

function firstRoot(relation) {
  const first = relation.rootFiles?.[0];
  return typeof first === "string" && typeof relation.rootDirectory === "string"
    ? `${relation.rootDirectory}/${first}`
    : "<ambient-library>";
}

export function ambientDeclarationContractHash(api, sources, name) {
  const index = indexTypeScriptModuleSources(api, sources);
  const fragments = [];
  for (const [moduleId, module] of [...index.modules].sort(([left], [right]) => compareText(left, right))) {
    let fragmentIndex = 0;
    for (const statement of module.sourceFile.Statements?.Nodes ?? []) {
      if (!isTypeDeclaration(api, statement) || statement.name?.Text !== name) continue;
      fragments.push({
        descriptor: declarationDescriptor(api, statement, {
          api,
          imports: module.descriptorImports ?? module.structure.imports,
          localNamespaces: module.structure.localNamespaceNames,
          localTypes: module.structure.localTypeNames,
          localValues: module.structure.localValueNames,
          moduleId,
          text: module.text,
          valueEnvironment: new Map(),
        }),
        file: moduleId,
        fragmentIndex: fragmentIndex++,
      });
    }
  }
  if (fragments.length === 0) throw new Error(`ambient type '${name}' has no declaration in the pinned source set`);
  return hashText(canonicalSchemaValue(fragments));
}

function isTypeDeclaration(api, statement) {
  return statement.Kind === api.Kinds.KindInterfaceDeclaration ||
    statement.Kind === api.Kinds.KindTypeAliasDeclaration ||
    statement.Kind === api.Kinds.KindClassDeclaration ||
    statement.Kind === api.Kinds.KindEnumDeclaration;
}

function contractError(relation, file, detail, kind = "ambient-reference-contract-error") {
  return { id: `ambient-reference:${relation.identity}`, file, kind, detail };
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort(compareText).join(", ")}`);
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length < 20) throw new Error(`${label} must specifically justify the ambient TypeScript declaration dependency`);
}
