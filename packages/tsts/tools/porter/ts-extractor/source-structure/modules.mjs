// Exact source module ids, import bindings, and resolved references.

import { posix } from "node:path";
import { compareText } from "../../core/deterministic-order.mjs";
import {
  defaultSourceModuleId,
  exportName,
  identifierName,
  kindLabel,
} from "./declarations.mjs";

export function assertSourceModuleId(moduleId) {
  if (typeof moduleId !== "string" || moduleId.length === 0) throw new Error("TypeScript source module id must be non-empty");
  if (moduleId.startsWith("/") || moduleId.startsWith("./") || moduleId.includes("\\") || moduleId.includes("\0") ||
      moduleId.includes("::") || moduleId.includes("?") || moduleId.includes("#")) {
    throw new Error(`invalid TypeScript source module id '${moduleId}'`);
  }
  const segments = moduleId.split("/");
  if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..") || !moduleId.endsWith(".ts")) {
    throw new Error(`invalid TypeScript source module id '${moduleId}'`);
  }
  return moduleId;
}

export function buildImportMap(api, sourceFile, moduleId = defaultSourceModuleId(sourceFile), references = []) {
  const named = new Map();
  const namespaces = new Map();
  for (const statement of sourceFile.Statements?.Nodes ?? []) {
    if (statement.Kind === api.Kinds.KindImportEqualsDeclaration) {
      throw new Error(`CommonJS import-equals declarations are unsupported in Porter module '${moduleId}'`);
    }
    if (statement.Kind !== api.Kinds.KindImportDeclaration) continue;
    const declaration = api.Casts.AsImportDeclaration(statement);
    const specifier = moduleSpecifierText(api, declaration.ModuleSpecifier, moduleId, "import");
    references.push(moduleReference(specifier, moduleId));
    const clause = declaration.ImportClause;
    if (!clause) continue;
    const clauseTypeOnly = clause.PhaseModifier === api.Kinds.KindTypeKeyword;
    if (clause.name) {
      setImportBinding(named, namespaces, identifierName(api, clause.name, moduleId, "default import"), {
        module: specifier,
        imported: "default",
        typeOnly: clauseTypeOnly,
      }, moduleId);
    }
    const bindings = clause.NamedBindings;
    if (!bindings) continue;
    if (bindings.Kind === api.Kinds.KindNamespaceImport) {
      const alias = identifierName(api, api.Casts.AsNamespaceImport(bindings).name, moduleId, "namespace import");
      setNamespaceBinding(named, namespaces, alias, { module: specifier, typeOnly: clauseTypeOnly }, moduleId);
      continue;
    }
    if (bindings.Kind !== api.Kinds.KindNamedImports) {
      throw new Error(`unsupported import binding ${kindLabel(api, bindings)} in '${moduleId}'`);
    }
    for (const element of bindings.Elements?.Nodes ?? []) {
      const importSpecifier = api.Casts.AsImportSpecifier(element);
      const local = identifierName(api, importSpecifier.name, moduleId, "named import");
      const imported = exportName(api, importSpecifier.PropertyName ?? importSpecifier.name, moduleId, "imported name");
      setImportBinding(named, namespaces, local, {
        module: specifier,
        imported,
        typeOnly: clauseTypeOnly || importSpecifier.IsTypeOnly,
      }, moduleId);
    }
  }
  return { named, namespaces };
}

function setImportBinding(named, namespaces, local, target, moduleId) {
  if (named.has(local) || namespaces.has(local)) throw new Error(`duplicate TypeScript import binding '${moduleId}::${local}'`);
  named.set(local, target);
}

function setNamespaceBinding(named, namespaces, local, target, moduleId) {
  if (named.has(local) || namespaces.has(local)) throw new Error(`duplicate TypeScript import binding '${moduleId}::${local}'`);
  namespaces.set(local, target);
}

export function moduleSpecifierText(api, node, moduleId, context) {
  if (node?.Kind !== api.Kinds.KindStringLiteral || typeof node.Text !== "string" || node.Text.length === 0) {
    throw new Error(`${context} in '${moduleId}' must use a non-empty string module specifier`);
  }
  return node.Text;
}

export function moduleReference(specifier, moduleId) {
  const relative = specifier.startsWith("./") || specifier.startsWith("../");
  return { specifier, resolved: resolveModuleId(specifier, moduleId), relative };
}

export function uniqueReferences(references) {
  const rows = new Map();
  for (const reference of references) rows.set(`${reference.relative ? "r" : "e"}:${reference.resolved}`, reference);
  return [...rows.values()].sort((left, right) => compareText(left.resolved, right.resolved));
}

export function uniqueSorted(values) {
  return [...new Set(values)].sort(compareText);
}

export function resolveModuleId(specifier, fromModuleId) {
  assertSourceModuleId(fromModuleId);
  if (typeof specifier !== "string" || specifier.length === 0) throw new Error(`invalid empty module specifier from '${fromModuleId}'`);
  if (specifier.includes("\\") || specifier.includes("\0") || specifier.includes("::")) {
    throw new Error(`unsupported module specifier '${specifier}' from '${fromModuleId}'`);
  }
  if (!specifier.startsWith("./") && !specifier.startsWith("../")) {
    if (specifier.startsWith("/")) throw new Error(`absolute module specifier '${specifier}' is unsupported`);
    if (specifier.includes("?") || specifier.includes("#") || posix.normalize(specifier) !== specifier ||
        specifier.split("/").some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
      throw new Error(`noncanonical bare module specifier '${specifier}' from '${fromModuleId}'`);
    }
    return specifier;
  }
  if (specifier.includes("?") || specifier.includes("#")) throw new Error(`unsupported relative module specifier '${specifier}' from '${fromModuleId}'`);
  const extension = posix.extname(specifier);
  if (extension !== ".js" && extension !== ".ts") {
    throw new Error(`relative module specifier '${specifier}' from '${fromModuleId}' must end in .js or .ts`);
  }
  const baseSegments = posix.dirname(fromModuleId).split("/").filter((segment) => segment !== "" && segment !== ".");
  if (baseSegments.some((segment) => segment === "..")) throw new Error(`invalid source module id '${fromModuleId}'`);
  const segments = [...baseSegments];
  for (const segment of specifier.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      if (segments.length === 0) throw new Error(`module path '${specifier}' underflows from '${fromModuleId}'`);
      segments.pop();
    } else {
      segments.push(segment);
    }
  }
  const resolved = segments.join("/");
  return extension === ".js" ? `${resolved.slice(0, -3)}.ts` : resolved;
}
