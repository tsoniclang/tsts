// Exact source declaration, namespace, and binding identities.

export const sliceText = (api, text, node) => node === undefined
  ? ""
  : api.GetTextOfNodeFromSourceText(text, node, false).trim();
export const identText = (node) => node?.Text;

const modifiersOf = (node) => node.modifiers?.Nodes ?? [];
const hasModifier = (node, kind) => modifiersOf(node).some((modifier) => modifier.Kind === kind);

export const isExported = (api, node) => hasModifier(node, api.Kinds.KindExportKeyword);
export const isDefaultExport = (api, node) => hasModifier(node, api.Kinds.KindDefaultKeyword);

export function keywordOf(api, kind) {
  const name = api.kindName.get(kind);
  if (!name || !name.endsWith("Keyword")) return undefined;
  return name.slice("Kind".length, -"Keyword".length).toLowerCase();
}

export function buildLocalTypeNames(api, sourceFile) {
  return collectLocalDeclarations(api, sourceFile, defaultSourceModuleId(sourceFile)).types;
}

export function defaultSourceModuleId(sourceFile) {
  const fileName = sourceFile.fileName;
  if (typeof fileName !== "string" || fileName.length === 0) return "<module>.ts";
  return fileName.replace(/^\/+/, "") || "<module>.ts";
}

export function collectLocalDeclarations(api, sourceFile, moduleId) {
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
      if (isAmbientModuleDeclaration(api, statement)) continue;
      const name = declarationIdentifier(api, statement, moduleId);
      namespaces.add(name);
      if (namespaceHasRuntimeValue(api, statement)) values.add(name);
      collectNamespaceDeclarations(api, statement, moduleId, "", isExported(api, statement), locals);
    }
  }
  return locals;
}

function isAmbientModuleDeclaration(api, declaration) {
  return declaration.name?.Kind === api.Kinds.KindStringLiteral || declaration.name?.Text === "global";
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

export function declarationIdentifier(api, statement, moduleId, optional = false) {
  if (statement.name === undefined && optional) return undefined;
  return identifierName(api, statement.name, moduleId, "declaration");
}

export function identifierName(api, node, moduleId, context) {
  if (node?.Kind !== api.Kinds.KindIdentifier || typeof node.Text !== "string" || node.Text.length === 0) {
    throw new Error(`unsupported ${context} binding in '${moduleId}'; an identifier is required`);
  }
  return node.Text;
}

export function exportName(api, node, moduleId, context) {
  if (node?.Kind !== api.Kinds.KindIdentifier || typeof node.Text !== "string") {
    throw new Error(`unsupported ${context} in '${moduleId}'; string-named bindings are not representable by the Porter identity contract`);
  }
  return node.Text;
}

export function kindLabel(api, node) {
  return api.kindName.get(node.Kind) ?? `kind ${node.Kind}`;
}
