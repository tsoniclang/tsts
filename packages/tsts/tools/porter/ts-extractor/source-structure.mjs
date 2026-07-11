// Exact source-level import, declaration, export, and module identity model.

import { posix } from "node:path";
import { compareText } from "../core/deterministic-order.mjs";

export const sliceText = (api, text, node) => node === undefined
  ? ""
  : api.GetTextOfNodeFromSourceText(text, node, false).trim();
export const identText = (node) => node?.Text;
const modifiersOf = (node) => node.modifiers?.Nodes ?? [];
const hasModifier = (node, kind) => modifiersOf(node).some((modifier) => modifier.Kind === kind);
export const isExported = (api, node) => hasModifier(node, api.Kinds.KindExportKeyword);
const isDefaultExport = (api, node) => hasModifier(node, api.Kinds.KindDefaultKeyword);

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

export function keywordOf(api, kind) {
  const name = api.kindName.get(kind);
  if (!name || !name.endsWith("Keyword")) return undefined;
  return name.slice("Kind".length, -"Keyword".length).toLowerCase();
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

export function buildLocalTypeNames(api, sourceFile) {
  return collectLocalDeclarations(api, sourceFile, defaultSourceModuleId(sourceFile)).types;
}

function defaultSourceModuleId(sourceFile) {
  const fileName = sourceFile.fileName;
  if (typeof fileName !== "string" || fileName.length === 0) return "<module>.ts";
  return fileName.replace(/^\/+/, "") || "<module>.ts";
}

function collectLocalDeclarations(api, sourceFile, moduleId) {
  const types = new Set();
  const values = new Set();
  const namespaces = new Set();
  const exportedNamespaceTypes = new Set();
  const exportedNamespaceValues = new Set();
  const locals = { types, values, namespaces, exportedNamespaceTypes, exportedNamespaceValues };
  for (const statement of sourceFile.Statements?.Nodes ?? []) {
    const kind = statement.Kind;
    if (kind === api.Kinds.KindInterfaceDeclaration) {
      types.add(declarationIdentifier(api, statement, moduleId));
    } else if (kind === api.Kinds.KindTypeAliasDeclaration) {
      types.add(declarationIdentifier(api, statement, moduleId));
    } else if (kind === api.Kinds.KindClassDeclaration || kind === api.Kinds.KindEnumDeclaration) {
      const name = declarationIdentifier(api, statement, moduleId, isDefaultExport(api, statement));
      if (name !== undefined) {
        types.add(name);
        values.add(name);
      }
    } else if (kind === api.Kinds.KindFunctionDeclaration) {
      const name = declarationIdentifier(api, statement, moduleId, isDefaultExport(api, statement));
      if (name !== undefined) values.add(name);
    } else if (kind === api.Kinds.KindVariableStatement) {
      for (const name of variableNames(api, statement, moduleId)) values.add(name);
    } else if (kind === api.Kinds.KindModuleDeclaration) {
      const name = declarationIdentifier(api, statement, moduleId);
      namespaces.add(name);
      if (namespaceHasRuntimeValue(api, statement)) values.add(name);
      collectNamespaceDeclarations(api, statement, moduleId, "", isExported(api, statement), locals);
    }
  }
  return locals;
}

function collectNamespaceDeclarations(api, declaration, moduleId, parentPath, publiclyReachable, locals) {
  const name = declarationIdentifier(api, declaration, moduleId);
  const namespacePath = qualifyNamespaceName(parentPath, name);
  locals.namespaces.add(namespacePath);
  if (namespaceHasRuntimeValue(api, declaration)) {
    locals.values.add(namespacePath);
    if (publiclyReachable && parentPath.length > 0) locals.exportedNamespaceValues.add(namespacePath);
  }
  let body = declaration.Body;
  while (body?.Kind === api.Kinds.KindModuleDeclaration) {
    const nestedName = declarationIdentifier(api, body, moduleId);
    const nestedPath = qualifyNamespaceName(namespacePath, nestedName);
    locals.namespaces.add(nestedPath);
    if (namespaceHasRuntimeValue(api, body)) {
      locals.values.add(nestedPath);
      if (publiclyReachable) locals.exportedNamespaceValues.add(nestedPath);
    }
    body = body.Body;
    if (body?.Kind === api.Kinds.KindModuleBlock) {
      collectNamespaceBlockDeclarations(api, body, moduleId, nestedPath, publiclyReachable, locals);
    }
    return;
  }
  if (body?.Kind === api.Kinds.KindModuleBlock) {
    collectNamespaceBlockDeclarations(api, body, moduleId, namespacePath, publiclyReachable, locals);
  }
}

function collectNamespaceBlockDeclarations(api, block, moduleId, namespacePath, publiclyReachable, locals) {
  for (const statement of block.Statements?.Nodes ?? []) {
    const memberPublic = publiclyReachable && isExported(api, statement);
    const kind = statement.Kind;
    if (kind === api.Kinds.KindInterfaceDeclaration || kind === api.Kinds.KindTypeAliasDeclaration) {
      const path = qualifyNamespaceName(namespacePath, declarationIdentifier(api, statement, moduleId));
      locals.types.add(path);
      if (memberPublic) locals.exportedNamespaceTypes.add(path);
    } else if (kind === api.Kinds.KindClassDeclaration || kind === api.Kinds.KindEnumDeclaration) {
      const path = qualifyNamespaceName(namespacePath, declarationIdentifier(api, statement, moduleId));
      locals.types.add(path);
      locals.values.add(path);
      if (memberPublic) {
        locals.exportedNamespaceTypes.add(path);
        locals.exportedNamespaceValues.add(path);
      }
    } else if (kind === api.Kinds.KindFunctionDeclaration) {
      const path = qualifyNamespaceName(namespacePath, declarationIdentifier(api, statement, moduleId));
      locals.values.add(path);
      if (memberPublic) locals.exportedNamespaceValues.add(path);
    } else if (kind === api.Kinds.KindVariableStatement) {
      for (const name of variableNames(api, statement, moduleId)) {
        const path = qualifyNamespaceName(namespacePath, name);
        locals.values.add(path);
        if (memberPublic) locals.exportedNamespaceValues.add(path);
      }
    } else if (kind === api.Kinds.KindModuleDeclaration) {
      collectNamespaceDeclarations(api, statement, moduleId, namespacePath, memberPublic, locals);
    }
  }
}

function qualifyNamespaceName(parent, name) {
  return parent.length === 0 ? name : `${parent}.${name}`;
}

function namespaceHasRuntimeValue(api, declaration) {
  let body = declaration.Body;
  while (body?.Kind === api.Kinds.KindModuleDeclaration) body = body.Body;
  if (body?.Kind !== api.Kinds.KindModuleBlock) return false;
  return (body.Statements?.Nodes ?? []).some((statement) => {
    return statement.Kind === api.Kinds.KindVariableStatement ||
      statement.Kind === api.Kinds.KindFunctionDeclaration ||
      statement.Kind === api.Kinds.KindClassDeclaration ||
      statement.Kind === api.Kinds.KindEnumDeclaration ||
      (statement.Kind === api.Kinds.KindModuleDeclaration && namespaceHasRuntimeValue(api, statement));
  });
}

export function variableNames(api, statement, moduleId = "<module>") {
  if (statement.Kind !== api.Kinds.KindVariableStatement) return [];
  const declaration = api.Casts.AsVariableStatement(statement);
  return (declaration.DeclarationList?.Declarations?.Nodes ?? []).flatMap((node) => {
    const variable = api.Casts.AsVariableDeclaration(node);
    return bindingNames(api, variable.name, moduleId);
  });
}

function bindingNames(api, binding, moduleId) {
  if (binding?.Kind === api.Kinds.KindIdentifier) return [identifierName(api, binding, moduleId, "variable declaration")];
  if (binding?.Kind !== api.Kinds.KindObjectBindingPattern && binding?.Kind !== api.Kinds.KindArrayBindingPattern) {
    throw new Error(`unsupported variable declaration binding in '${moduleId}'`);
  }
  return (binding.Elements?.Nodes ?? []).flatMap((element) => {
    const name = api.Casts.AsBindingElement(element)?.name;
    return name === undefined ? [] : bindingNames(api, name, moduleId);
  });
}

export function extractModuleStructure(api, sourceFile, moduleId) {
  const moduleReferences = [];
  const imports = buildImportMap(api, sourceFile, moduleId, moduleReferences);
  const locals = collectLocalDeclarations(api, sourceFile, moduleId);
  const typeExports = new Map();
  const valueExports = new Map();
  const namespaceExports = new Map();
  const typeStarReexports = [];
  const valueStarReexports = [];
  let defaultValueExpression;

  for (const statement of sourceFile.Statements?.Nodes ?? []) {
    if (registerDirectDeclarationExports(api, statement, moduleId, locals, typeExports, valueExports, namespaceExports)) continue;
    if (statement.Kind === api.Kinds.KindExportAssignment) {
      const assignment = api.Casts.AsExportAssignment(statement);
      if (assignment.IsExportEquals) throw new Error(`CommonJS export assignment is unsupported in Porter module '${moduleId}'`);
      if (assignment.Expression?.Kind === api.Kinds.KindIdentifier) {
        const name = assignment.Expression.Text;
        if (locals.types.has(name)) {
          setExport(typeExports, "default", `${moduleId}::${name}`, moduleId, "type");
        } else {
          const importedType = imports.named.get(name);
          if (importedType !== undefined) {
            setExport(typeExports, "default", `${resolveModuleId(importedType.module, moduleId)}::${importedType.imported}`, moduleId, "type");
          }
        }
        const importedNamespace = imports.namespaces.get(name);
        if (importedNamespace !== undefined && !importedNamespace.typeOnly) {
          setNamespaceExport(namespaceExports, "default", { module: resolveModuleId(importedNamespace.module, moduleId), typeOnly: false }, moduleId);
        } else if (locals.namespaces.has(name)) {
          setNamespaceExport(namespaceExports, "default", { module: moduleId, local: name, typeOnly: !locals.values.has(name) }, moduleId);
        }
      }
      const target = valueExpressionTarget(api, assignment.Expression, moduleId, imports, locals);
      const exportTarget = target ?? `${moduleId}::default`;
      if (exportTarget === `${moduleId}::default`) locals.values.add("default");
      setExport(valueExports, "default", exportTarget, moduleId, "value");
      if (target === undefined) defaultValueExpression = assignment.Expression;
      continue;
    }
    if (statement.Kind === api.Kinds.KindNamespaceExportDeclaration) {
      throw new Error(`global namespace export declarations are unsupported in Porter module '${moduleId}'`);
    }
    if (statement.Kind !== api.Kinds.KindExportDeclaration) continue;
    const declaration = api.Casts.AsExportDeclaration(statement);
    const sourceSpecifier = declaration.ModuleSpecifier === undefined
      ? undefined
      : moduleSpecifierText(api, declaration.ModuleSpecifier, moduleId, "export");
    const sourceModule = sourceSpecifier === undefined ? undefined : resolveModuleId(sourceSpecifier, moduleId);
    if (sourceSpecifier !== undefined) moduleReferences.push(moduleReference(sourceSpecifier, moduleId));
    const clause = declaration.ExportClause;
    if (!clause) {
      if (sourceModule === undefined) throw new Error(`export-star in '${moduleId}' must name a source module`);
      typeStarReexports.push(sourceModule);
      if (!declaration.IsTypeOnly) valueStarReexports.push(sourceModule);
      continue;
    }
    if (clause.Kind === api.Kinds.KindNamespaceExport) {
      if (sourceModule === undefined) throw new Error(`namespace re-export in '${moduleId}' must name a source module`);
      const name = exportName(api, clause.name, moduleId, "namespace export");
      setNamespaceExport(namespaceExports, name, { module: sourceModule, typeOnly: declaration.IsTypeOnly }, moduleId);
      if (!declaration.IsTypeOnly) setExport(valueExports, name, `${moduleId}::${name}`, moduleId, "value");
      continue;
    }
    if (clause.Kind !== api.Kinds.KindNamedExports) {
      throw new Error(`unsupported export clause ${kindLabel(api, clause)} in '${moduleId}'`);
    }
    for (const element of clause.Elements?.Nodes ?? []) {
      registerNamedExport(api, declaration, element, sourceModule, moduleId, imports, locals, typeExports, valueExports, namespaceExports);
    }
  }

  return finalizeStructure({
    imports,
    locals,
    typeExports,
    valueExports,
    namespaceExports,
    typeStarReexports,
    valueStarReexports,
    moduleReferences,
    defaultValueExpression,
    moduleId,
  });
}

function registerDirectDeclarationExports(api, statement, moduleId, locals, typeExports, valueExports, namespaceExports) {
  if (!isExported(api, statement)) return false;
  const defaulted = isDefaultExport(api, statement);
  const kind = statement.Kind;
  if (kind === api.Kinds.KindInterfaceDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId);
    setExport(typeExports, defaulted ? "default" : local, `${moduleId}::${local}`, moduleId, "type");
    return true;
  }
  if (kind === api.Kinds.KindTypeAliasDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId);
    setExport(typeExports, defaulted ? "default" : local, `${moduleId}::${local}`, moduleId, "type");
    return true;
  }
  if (kind === api.Kinds.KindClassDeclaration || kind === api.Kinds.KindEnumDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId, defaulted) ?? "default";
    if (local === "default") {
      locals.types.add(local);
      locals.values.add(local);
    }
    const exported = defaulted ? "default" : local;
    setExport(typeExports, exported, `${moduleId}::${local}`, moduleId, "type");
    setExport(valueExports, exported, `${moduleId}::${local}`, moduleId, "value");
    return true;
  }
  if (kind === api.Kinds.KindFunctionDeclaration) {
    const local = declarationIdentifier(api, statement, moduleId, defaulted) ?? "default";
    if (local === "default") locals.values.add(local);
    setExport(valueExports, defaulted ? "default" : local, `${moduleId}::${local}`, moduleId, "value");
    return true;
  }
  if (kind === api.Kinds.KindVariableStatement) {
    if (defaulted) throw new Error(`variable statement cannot be a default export in '${moduleId}'`);
    for (const name of variableNames(api, statement, moduleId)) setExport(valueExports, name, `${moduleId}::${name}`, moduleId, "value");
    return true;
  }
  if (kind === api.Kinds.KindModuleDeclaration) {
    if (defaulted) throw new Error(`namespace declaration cannot be a default export in '${moduleId}'`);
    const name = declarationIdentifier(api, statement, moduleId);
    setNamespaceExport(namespaceExports, name, { module: moduleId, local: name, typeOnly: !locals.values.has(name) }, moduleId);
    if (locals.values.has(name)) setExport(valueExports, name, `${moduleId}::${name}`, moduleId, "value");
    return true;
  }
  return false;
}

function registerNamedExport(api, declaration, element, sourceModule, moduleId, imports, locals, typeExports, valueExports, namespaceExports) {
  const specifier = api.Casts.AsExportSpecifier(element);
  const exported = exportName(api, specifier.name, moduleId, "exported name");
  const source = exportName(api, specifier.PropertyName ?? specifier.name, moduleId, "source export name");
  const typeOnly = declaration.IsTypeOnly || specifier.IsTypeOnly;
  if (sourceModule !== undefined) {
    setExport(typeExports, exported, `${sourceModule}::${source}`, moduleId, "type");
    if (!typeOnly) setExport(valueExports, exported, `${sourceModule}::${source}`, moduleId, "value");
    return;
  }
  const namespaceImport = imports.namespaces.get(source);
  if (namespaceImport !== undefined) {
    setNamespaceExport(namespaceExports, exported, {
      module: resolveModuleId(namespaceImport.module, moduleId),
      typeOnly: typeOnly || namespaceImport.typeOnly,
    }, moduleId);
    if (!typeOnly && !namespaceImport.typeOnly) setExport(valueExports, exported, `${moduleId}::${exported}`, moduleId, "value");
    return;
  }
  const namedImport = imports.named.get(source);
  if (namedImport !== undefined) {
    const target = `${resolveModuleId(namedImport.module, moduleId)}::${namedImport.imported}`;
    setExport(typeExports, exported, target, moduleId, "type");
    if (!typeOnly && !namedImport.typeOnly) setExport(valueExports, exported, target, moduleId, "value");
    return;
  }
  let found = false;
  if (locals.types.has(source)) {
    setExport(typeExports, exported, `${moduleId}::${source}`, moduleId, "type");
    found = true;
  }
  if (locals.namespaces.has(source)) {
    setNamespaceExport(namespaceExports, exported, { module: moduleId, local: source, typeOnly: typeOnly || !locals.values.has(source) }, moduleId);
    found = true;
  }
  if (!typeOnly && locals.values.has(source)) {
    setExport(valueExports, exported, `${moduleId}::${source}`, moduleId, "value");
    found = true;
  }
  if (!found) throw new Error(`TypeScript export '${moduleId}::${exported}' references unknown local '${source}'`);
}

function finalizeStructure(input) {
  const namedReexports = nonDirectExports(input.typeExports, input.moduleId);
  const valueNamedReexports = nonDirectExports(input.valueExports, input.moduleId);
  return {
    imports: input.imports,
    localTypeNames: input.locals.types,
    localValueNames: input.locals.values,
    localNamespaceNames: input.locals.namespaces,
    exportedNamespaceTypeNames: input.locals.exportedNamespaceTypes,
    exportedNamespaceValueNames: input.locals.exportedNamespaceValues,
    exportedTypeNames: directExportNames(input.typeExports, input.moduleId, input.locals.types),
    exportedValueNames: directExportNames(input.valueExports, input.moduleId, input.locals.values),
    typeExports: input.typeExports,
    valueExports: input.valueExports,
    namedReexports,
    starReexports: uniqueSorted(input.typeStarReexports),
    valueNamedReexports,
    valueStarReexports: uniqueSorted(input.valueStarReexports),
    namespaceReexports: input.namespaceExports,
    moduleReferences: uniqueReferences(input.moduleReferences),
    defaultValueExpression: input.defaultValueExpression,
  };
}

function directExportNames(exports, moduleId, locals) {
  const names = new Set();
  for (const [exported, target] of exports) {
    if (target === `${moduleId}::${exported}` && locals.has(exported)) names.add(exported);
  }
  return names;
}

function nonDirectExports(exports, moduleId) {
  const aliases = new Map();
  for (const [name, target] of exports) {
    if (target !== `${moduleId}::${name}`) aliases.set(name, target);
  }
  return aliases;
}

function setExport(exports, name, target, moduleId, namespace) {
  const existing = exports.get(name);
  if (existing === target) return;
  if (existing !== undefined) throw new Error(`conflicting TypeScript export '${moduleId}::${name}' in the ${namespace} namespace`);
  exports.set(name, target);
}

function setNamespaceExport(exports, name, target, moduleId) {
  const existing = exports.get(name);
  if (existing !== undefined && existing.module === target.module && existing.local === target.local && existing.typeOnly === target.typeOnly) return;
  if (existing !== undefined) throw new Error(`conflicting TypeScript namespace export '${moduleId}::${name}'`);
  exports.set(name, target);
}

function valueExpressionTarget(api, expression, moduleId, imports, locals) {
  if (expression?.Kind !== api.Kinds.KindIdentifier) return undefined;
  const name = expression.Text;
  if (locals.values.has(name)) return `${moduleId}::${name}`;
  const named = imports.named.get(name);
  if (named !== undefined && !named.typeOnly) return `${resolveModuleId(named.module, moduleId)}::${named.imported}`;
  const namespace = imports.namespaces.get(name);
  if (namespace !== undefined && !namespace.typeOnly) return `${moduleId}::${name}`;
  throw new Error(`default export in '${moduleId}' references non-value '${name}'`);
}

function declarationIdentifier(api, statement, moduleId, optional = false) {
  if (statement.name === undefined && optional) return undefined;
  return identifierName(api, statement.name, moduleId, "declaration");
}

function identifierName(api, node, moduleId, context) {
  if (node?.Kind !== api.Kinds.KindIdentifier || typeof node.Text !== "string" || node.Text.length === 0) {
    throw new Error(`unsupported ${context} binding in '${moduleId}'; an identifier is required`);
  }
  return node.Text;
}

function exportName(api, node, moduleId, context) {
  if (node?.Kind !== api.Kinds.KindIdentifier || typeof node.Text !== "string") {
    throw new Error(`unsupported ${context} in '${moduleId}'; string-named bindings are not representable by the Porter identity contract`);
  }
  return node.Text;
}

function moduleSpecifierText(api, node, moduleId, context) {
  if (node?.Kind !== api.Kinds.KindStringLiteral || typeof node.Text !== "string" || node.Text.length === 0) {
    throw new Error(`${context} in '${moduleId}' must use a non-empty string module specifier`);
  }
  return node.Text;
}

function moduleReference(specifier, moduleId) {
  const relative = specifier.startsWith("./") || specifier.startsWith("../");
  return { specifier, resolved: resolveModuleId(specifier, moduleId), relative };
}

function uniqueReferences(references) {
  const rows = new Map();
  for (const reference of references) rows.set(`${reference.relative ? "r" : "e"}:${reference.resolved}`, reference);
  return [...rows.values()].sort((left, right) => compareText(left.resolved, right.resolved));
}

function uniqueSorted(values) {
  return [...new Set(values)].sort(compareText);
}

export function extractReexports(api, sourceFile, moduleId) {
  const structure = extractModuleStructure(api, sourceFile, moduleId);
  return { named: structure.namedReexports, star: structure.starReexports };
}

export function extractTypeDecls(api, sourceFile, moduleId = "<module>.ts") {
  return [...extractModuleStructure(api, sourceFile, moduleId).exportedTypeNames].sort(compareText);
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

function kindLabel(api, node) {
  return api.kindName.get(node.Kind) ?? `kind ${node.Kind}`;
}
