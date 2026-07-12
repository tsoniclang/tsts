import { compareText } from "../core/deterministic-order.mjs";

const UNIT_TAG = "tsgo-unit";
const OVERRIDE_TAG = "tsgo-override";

export function collectDeclarationMetadata(api, sourceFile, sourceText, moduleId) {
  const records = [];
  const statements = sourceFile.Statements?.Nodes ?? [];
  for (let statementIndex = 0; statementIndex < statements.length; statementIndex++) {
    const statement = statements[statementIndex];
    const record = metadataForNode(api, sourceFile, sourceText, moduleId, statement, statementIndex);
    if (record !== undefined) records.push(record);
    assertNoNestedPorterMetadata(api, sourceFile, sourceText, moduleId, statement);
  }
  const eofRecord = sourceFile.EndOfFileToken === undefined
    ? undefined
    : metadataForNode(api, sourceFile, sourceText, moduleId, sourceFile.EndOfFileToken, statements.length);
  if (eofRecord !== undefined) {
    throw new Error(`orphan Porter metadata at end of '${moduleId}'`);
  }
  assertNoJSDocDiagnostics(api, sourceFile, moduleId);
  const ids = new Set();
  for (const record of records) {
    if (ids.has(record.metadata.id)) {
      throw new Error(`duplicate @tsgo-unit id '${record.metadata.id}' in '${moduleId}'`);
    }
    ids.add(record.metadata.id);
  }
  return records.sort((left, right) => left.statementIndex - right.statementIndex);
}

function assertNoNestedPorterMetadata(api, sourceFile, sourceText, moduleId, declaration) {
  if (declaration.Kind === api.Kinds.KindClassStaticBlockDeclaration) return;
  api.Node_ForEachChild(declaration, (nested) => {
    if (isOpaqueImplementationChild(api, declaration, nested)) return false;
    const record = metadataForNode(api, sourceFile, sourceText, moduleId, nested, -1);
    if (record !== undefined) {
      throw new Error(`misplaced @tsgo-unit '${record.metadata.id ?? "<missing-id>"}' on nested declaration in '${moduleId}'`);
    }
    assertNoNestedPorterMetadata(api, sourceFile, sourceText, moduleId, nested);
    return false;
  });
}

function isOpaqueImplementationChild(api, parent, child) {
  if (parent.Initializer === child) return true;
  if (parent.Body !== child) return false;
  return parent.Kind === api.Kinds.KindFunctionDeclaration ||
    parent.Kind === api.Kinds.KindMethodDeclaration ||
    parent.Kind === api.Kinds.KindConstructor ||
    parent.Kind === api.Kinds.KindGetAccessor ||
    parent.Kind === api.Kinds.KindSetAccessor ||
    parent.Kind === api.Kinds.KindFunctionExpression ||
    parent.Kind === api.Kinds.KindArrowFunction;
}

function metadataForNode(api, sourceFile, sourceText, moduleId, node, statementIndex) {
  const docs = api.Node_JSDoc(node, sourceFile) ?? [];
  const documents = docs.map((doc) => parseMetadataDocument(api, sourceText, moduleId, doc));
  const documentsWithUnit = documents.filter((document) => document.unit !== undefined);
  const documentsWithOverride = documents.filter((document) => document.override !== undefined);
  if (documentsWithUnit.length === 0 && documentsWithOverride.length === 0) return undefined;
  if (documentsWithUnit.length !== 1) {
    throw new Error(`declaration in '${moduleId}' must have exactly one attached @tsgo-unit tag`);
  }
  if (documentsWithOverride.length > 1) {
    throw new Error(`declaration in '${moduleId}' must have at most one attached @tsgo-override tag`);
  }
  const document = documentsWithUnit[0];
  if (documents[0] !== document) {
    throw new Error(`@tsgo-unit in '${moduleId}' must be in the declaration's leading attached JSDoc`);
  }
  if (documentsWithOverride.length === 1 && documentsWithOverride[0] !== document) {
    throw new Error(`@tsgo-override in '${moduleId}' must share the @tsgo-unit JSDoc`);
  }
  if (node.Kind === api.Kinds.KindEndOfFile) throw new Error(`orphan Porter metadata at end of '${moduleId}'`);
  if (!isPorterDeclaration(api, node)) {
    throw new Error(`misplaced @tsgo-unit '${document.unit.id ?? "<missing-id>"}' on ${kindLabel(api, node)} in '${moduleId}'`);
  }
  return {
    metadata: document.unit,
    override: document.override,
    statement: node,
    statementIndex,
    document: document.node,
    documentText: document.text,
    documentStart: api.Node_Pos(document.node),
    documentEnd: api.Node_End(document.node),
  };
}

function parseMetadataDocument(api, sourceText, moduleId, document) {
  const jsdoc = api.Casts.AsJSDoc(document);
  const tags = jsdoc.Tags?.Nodes ?? [];
  const unitTags = tags.filter((tag) => tagName(tag) === UNIT_TAG);
  const overrideTags = tags.filter((tag) => tagName(tag) === OVERRIDE_TAG);
  if (unitTags.length > 1) throw new Error(`duplicate @tsgo-unit tags in one JSDoc in '${moduleId}'`);
  if (overrideTags.length > 1) throw new Error(`duplicate @tsgo-override tags in one JSDoc in '${moduleId}'`);
  if (unitTags.length === 1 && tags.indexOf(unitTags[0]) !== 0) {
    throw new Error(`@tsgo-unit in '${moduleId}' must be the leading JSDoc tag`);
  }
  if (overrideTags.length === 1 && tags.indexOf(overrideTags[0]) !== tags.indexOf(unitTags[0]) + 1) {
    throw new Error(`@tsgo-override in '${moduleId}' must immediately follow @tsgo-unit`);
  }
  const unit = unitTags.length === 0 ? undefined : parseTagJson(api, sourceText, moduleId, unitTags[0], UNIT_TAG);
  const override = overrideTags.length === 0 ? undefined : parseTagJson(api, sourceText, moduleId, overrideTags[0], OVERRIDE_TAG);
  if (override !== undefined && unit === undefined) {
    throw new Error(`orphan @tsgo-override in attached JSDoc in '${moduleId}'`);
  }
  return {
    node: document,
    text: api.GetTextOfNodeFromSourceText(sourceText, document, true),
    unit,
    override,
  };
}

function parseTagJson(api, sourceText, moduleId, tag, tagNameText) {
  const text = api.GetTextOfNodeFromSourceText(sourceText, tag, false);
  const prefix = `@${tagNameText}`;
  if (!text.startsWith(prefix)) {
    throw new Error(`parser returned malformed ${prefix} tag text in '${moduleId}'`);
  }
  const payload = cleanTagPayload(text.slice(prefix.length));
  if (payload.length === 0) throw new Error(`${prefix} in '${moduleId}' must be followed by one JSON object`);
  const json = leadingJsonObject(payload, prefix, moduleId);
  let value;
  try {
    value = JSON.parse(json);
  } catch (error) {
    throw new Error(`invalid ${prefix} JSON in '${moduleId}': ${error.message}`);
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${prefix} JSON in '${moduleId}' must be an object`);
  }
  return value;
}

function leadingJsonObject(payload, prefix, moduleId) {
  if (!payload.startsWith("{")) throw new Error(`${prefix} in '${moduleId}' must be followed by one JSON object`);
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = 0; index < payload.length; index++) {
    const character = payload[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth++;
    else if (character === "}") {
      depth--;
      if (depth === 0) {
        const remainder = payload.slice(index + 1);
        if (remainder.length > 0 && !remainder.startsWith("\n")) {
          throw new Error(`${prefix} in '${moduleId}' must contain exactly one JSON object on its tag line`);
        }
        return payload.slice(0, index + 1);
      }
    }
  }
  throw new Error(`${prefix} in '${moduleId}' has an unterminated JSON object`);
}

function cleanTagPayload(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trim();
}

function tagName(tag) {
  return tag.TagName?.Text;
}

function isPorterDeclaration(api, node) {
  return node.Kind === api.Kinds.KindFunctionDeclaration ||
    node.Kind === api.Kinds.KindInterfaceDeclaration ||
    node.Kind === api.Kinds.KindTypeAliasDeclaration ||
    node.Kind === api.Kinds.KindClassDeclaration ||
    node.Kind === api.Kinds.KindEnumDeclaration ||
    node.Kind === api.Kinds.KindVariableStatement;
}

function assertNoJSDocDiagnostics(api, sourceFile, moduleId) {
  const diagnostics = api.SourceFile_JSDocDiagnostics(sourceFile) ?? [];
  if (diagnostics.length === 0) return;
  const details = diagnostics
    .map((diagnostic) => `${api.Diagnostic_Code(diagnostic)}@${api.Diagnostic_Pos(diagnostic)}-${api.Diagnostic_End(diagnostic)}`)
    .sort(compareText)
    .join(", ");
  throw new Error(`TSTS parser reported JSDoc diagnostic(s) in '${moduleId}': ${details}`);
}

function kindLabel(api, node) {
  return api.kindName.get(node.Kind) ?? `kind ${node.Kind}`;
}

export function expectedTypeScriptNames(metadata, annotation) {
  const parts = String(metadata.id ?? "").split(annotation.idSeparator);
  if (/^#\d+$/.test(parts.at(-1) ?? "")) parts.pop();
  const qualifiedName = parts.at(-1) ?? "";
  if (metadata.kind === "method") return [qualifiedName.replace(".", annotation.methodNameJoin)];
  if (metadata.kind === "constGroup" || metadata.kind === "varGroup") return qualifiedName.split("+");
  return [qualifiedName];
}

export function declarationName(api, statement) {
  if (statement.Kind === api.Kinds.KindVariableStatement) return undefined;
  return statement.name?.Text;
}
