import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { AstSchema } from "../ast-schema-model.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(here, "../../../schema/tsgo/ast.json");
const schema = new AstSchema(JSON.parse(readFileSync(schemaPath, "utf8")));
const kindNames = buildKindNames(schema.schema.kinds.elements);
const nodeNamesByKind = buildNodeNamesByKind();

export function canonicalKindNames() {
  return kindNames;
}

export function canonicalSchema() {
  return schema;
}

export function canonicalNodeNameForKind(kind) {
  if (!Number.isInteger(kind) || !nodeNamesByKind.has(kind)) {
    throw new Error(`pinned AST schema has no node definition for concrete kind ${String(kind)}`);
  }
  return nodeNamesByKind.get(kind);
}

export function canonicalSchemaCoverage() {
  return Object.freeze({ concreteKindCount: kindNames.size, plannedKindCount: nodeNamesByKind.size });
}

function buildKindNames(elements) {
  const result = new Map();
  let value = 0;
  for (const element of elements) {
    if (typeof element === "string") {
      result.set(value++, element);
    } else if (element?.name !== undefined) {
      result.set(value++, element.name);
    } else if (element?.comment === undefined) {
      throw new Error(`invalid pinned AST kind entry ${JSON.stringify(element)}`);
    }
  }
  return result;
}

function buildNodeNamesByKind() {
  const candidatesByKindName = new Map([...kindNames.values()].map((kindName) => [kindName, []]));
  for (const nodeName of schema.nodeNames()) {
    const concreteKinds = schema.kindTypesOf(nodeName).kindNames;
    for (const kindName of concreteKinds) {
      const candidates = candidatesByKindName.get(kindName);
      if (candidates === undefined) throw new Error(`pinned AST node ${nodeName} claims unknown concrete kind ${kindName}`);
      candidates.push(Object.freeze({ concreteKindCount: concreteKinds.length, nodeName }));
    }
  }
  const result = new Map();
  for (const [kind, kindName] of kindNames) {
    const explicit = schema.syntaxKindToNodeInfo.get(kindName);
    result.set(kind, explicit?.nodeName ?? selectNarrowestSchemaNode(kindName, candidatesByKindName.get(kindName) ?? []));
  }
  if (result.size !== kindNames.size) throw new Error(`pinned AST node-definition coverage is ${result.size}/${kindNames.size}`);
  return result;
}

function selectNarrowestSchemaNode(kindName, candidates) {
  if (candidates.length === 0) throw new Error(`pinned AST concrete kind ${kindName} has no node definition`);
  const ordered = [...candidates].sort((left, right) =>
    left.concreteKindCount - right.concreteKindCount || left.nodeName.localeCompare(right.nodeName));
  if (ordered.length > 1 && ordered[0].concreteKindCount === ordered[1].concreteKindCount) {
    throw new Error(`pinned AST concrete kind ${kindName} has ambiguous node definitions ${ordered
      .filter((candidate) => candidate.concreteKindCount === ordered[0].concreteKindCount)
      .map((candidate) => candidate.nodeName)
      .join(", ")}`);
  }
  return ordered[0].nodeName;
}
