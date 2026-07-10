// Actual-side driver: parse a ported .ts file with TSTS's own parser and produce,
// per @tsgo-unit id, the structured signature descriptor of the declaration that
// the annotation introduces. The owning declaration is found by source position
// (the @tsgo-unit JSDoc is leading trivia of the statement it annotates, so the
// annotation offset falls inside that statement's [pos, end) range).

import { readFileSync } from "node:fs";
import {
  loadParser, parseSource, buildImportMap, buildLocalTypeNames, declarationDescriptor,
  evaluateTypeScriptConstant, resolveModuleId,
} from "./ast-signatures.mjs";

const DEFAULT_ANNOTATION = { tag: "@tsgo-unit", idSeparator: "::", methodNameJoin: "_" };
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const annotationRegExp = (tag) => new RegExp(`${escapeRe(tag)}\\s+({[^\\n\\r]+})`, "g");

// The position of a declaration's NAME — the stable anchor for associating a
// @tsgo-unit annotation with the declaration it introduces. A declaration's
// trivia-inclusive Node_Pos can fall INSIDE its leading JSDoc (tsgo attaches the
// doc as a JSDoc node), so it is unreliable; the name identifier is always in
// real code after the JSDoc.
function declAnchor(api, st) {
  if (st.name) return api.Node_Pos(st.name);
  if (st.Kind === api.Kinds.KindVariableStatement) {
    const decls = st.DeclarationList?.Declarations?.Nodes ?? [];
    if (decls[0]?.name) return api.Node_Pos(decls[0].name);
  }
  return api.Node_Pos(st);
}

function declName(st) {
  return st.name?.Text;
}

// The TS declaration name a unit's @tsgo-unit metadata maps to, so the annotation
// binds to the right declaration even when non-tracked helper functions are
// interleaved between the JSDoc and the real declaration.
function expectedTsName(meta, annotation) {
  const parts = String(meta.id ?? "").split(annotation.idSeparator);
  if (/^#\d+$/.test(parts.at(-1) ?? "")) parts.pop();
  const qn = parts[parts.length - 1] ?? "";
  if (meta.kind === "method") return qn.replace(".", annotation.methodNameJoin); // Receiver.method -> Receiver_method
  return qn; // func / type use the Go name verbatim
}

// moduleId: repo-relative posix path of the file (used for module identity).
// annotation: { tag, idSeparator, methodNameJoin } from the project profile.
export function extractFileDescriptors(api, moduleId, text, annotation = DEFAULT_ANNOTATION, initialValueEnvironment = new Map()) {
  const sf = parseSource(api, "/" + moduleId, text);
  const base = {
    api,
    text,
    imports: buildImportMap(api, sf),
    localTypes: buildLocalTypeNames(api, sf),
    moduleId,
    valueEnvironment: new Map(initialValueEnvironment),
  };
  // Each statement keyed by its name position, ascending.
  const statements = (sf.Statements?.Nodes ?? [])
    .map((st) => ({ st, anchor: declAnchor(api, st) }))
    .sort((a, b) => a.anchor - b.anchor);
  const out = [];
  const re = annotationRegExp(annotation.tag);
  const annotations = [];
  const utf8Offsets = createUtf8OffsetMap(text);
  let m;
  while ((m = re.exec(text)) !== null) {
    let meta;
    try {
      meta = JSON.parse(m[1]);
    } catch {
      continue; // malformed metadata is reported by the porter's own scan
    }
    annotations.push({ meta, off: utf8Offsets[m.index] });
  }
  for (let index = 0; index < annotations.length; index++) {
    const { meta, off } = annotations[index];
    const end = annotations[index + 1]?.off ?? utf8Offsets[text.length];
    const after = statements.filter((s) => s.anchor > off && s.anchor < end);
    const isValueGroup = meta.kind === "constGroup" || meta.kind === "varGroup";
    const want = expectedTsName(meta, annotation);
    const owners = isValueGroup
      ? after.filter((s) => s.st.Kind === api.Kinds.KindVariableStatement)
      : after.filter((s) => declName(s.st) === want);
    let descriptor = null;
    if (isValueGroup && owners.length > 0) {
      const expectedNames = want.split("+");
      const namedExpected = new Set(expectedNames.filter((name) => name !== "_"));
      const declarations = owners.flatMap((owner) => declarationDescriptor(api, owner.st, base).decls ?? []);
      descriptor = {
        kind: "value",
        decls: namedExpected.size === expectedNames.length
          ? declarations.filter((declaration) => namedExpected.has(declaration.name))
          : declarations.slice(0, expectedNames.length),
      };
    } else if (!isValueGroup && owners.length === 1) {
      descriptor = declarationDescriptor(api, owners[0].st, base);
    }
    out.push({
      id: meta.id,
      metaKind: meta.kind,
      metadata: meta,
      moduleId,
      descriptor,
      ownerIssue: isValueGroup
        ? owners.length === 0 ? "missing value declaration region" : undefined
        : owners.length === 0 ? `missing declaration '${want}'` : owners.length > 1 ? `ambiguous declaration '${want}'` : undefined,
    });
  }
  return out;
}

export function buildModuleValueEnvironments(api, sources, namedReexport = new Map(), starReexport = new Map()) {
  const modules = new Map();
  const definitions = new Map();
  for (const [moduleId, text] of sources) {
    const sourceFile = parseSource(api, "/" + moduleId, text);
    const imports = buildImportMap(api, sourceFile);
    const module = { moduleId, imports, definitions: new Map() };
    modules.set(moduleId, module);
    for (const statement of sourceFile.Statements?.Nodes ?? []) {
      if (statement.Kind !== api.Kinds.KindVariableStatement) continue;
      const variableStatement = api.Casts.AsVariableStatement(statement);
      for (const node of variableStatement.DeclarationList?.Declarations?.Nodes ?? []) {
        const declaration = api.Casts.AsVariableDeclaration(node);
        const name = declaration.name?.Text;
        if (name === undefined || declaration.Initializer === undefined) continue;
        const id = `${moduleId}::${name}`;
        if (definitions.has(id)) {
          throw new Error(`duplicate TypeScript value declaration '${id}'`);
        }
        const definition = {
          id,
          moduleId,
          name,
          initializer: declaration.Initializer,
          state: 0,
          value: undefined,
        };
        definitions.set(id, definition);
        module.definitions.set(name, definition);
      }
    }
  }

  const resolveId = (id, stack = []) => {
    const definition = definitions.get(id);
    if (definition !== undefined) return resolveDefinition(definition, stack);
    const named = namedReexport.get(id);
    if (named !== undefined) return resolveId(named, stack);
    const separator = id.lastIndexOf("::");
    const moduleId = id.slice(0, separator);
    const name = id.slice(separator + 2);
    for (const sourceModule of starReexport.get(moduleId) ?? []) {
      const value = resolveId(`${sourceModule}::${name}`, stack);
      if (value !== undefined) return value;
    }
    return undefined;
  };

  const resolveDefinition = (definition, stack) => {
    if (definition.state === 2) return definition.value;
    if (definition.state === 1) {
      throw new Error(`TypeScript constant dependency cycle: ${[...stack, definition.id].join(" -> ")}`);
    }
    definition.state = 1;
    const module = modules.get(definition.moduleId);
    const environment = new Map();
    for (const reference of typeScriptConstantReferences(api, definition.initializer)) {
      const target = resolveTypeScriptValueReference(reference, module, resolveId, [...stack, definition.id]);
      if (target !== undefined) environment.set(reference, target);
    }
    definition.value = evaluateTypeScriptConstant(api, definition.initializer, environment);
    definition.state = 2;
    return definition.value;
  };

  const environments = new Map();
  for (const module of modules.values()) {
    const environment = new Map();
    for (const [name, definition] of module.definitions) {
      const value = resolveDefinition(definition, []);
      if (value !== undefined) environment.set(name, value);
    }
    for (const [local, imported] of module.imports.named) {
      const sourceModule = resolveModuleId(imported.module, module.moduleId);
      const value = resolveId(`${sourceModule}::${imported.imported}`, []);
      if (value !== undefined) environment.set(local, value);
    }
    for (const [alias, imported] of module.imports.namespaces) {
      const sourceModule = resolveModuleId(imported.module, module.moduleId);
      const source = modules.get(sourceModule);
      for (const name of source?.definitions.keys() ?? []) {
        const value = resolveId(`${sourceModule}::${name}`, []);
        if (value !== undefined) environment.set(`${alias}.${name}`, value);
      }
    }
    environments.set(module.moduleId, environment);
  }
  return environments;
}

function resolveTypeScriptValueReference(reference, module, resolveId, stack) {
  const dot = reference.indexOf(".");
  if (dot >= 0) {
    const alias = reference.slice(0, dot);
    const name = reference.slice(dot + 1);
    const imported = module.imports.namespaces.get(alias);
    if (imported === undefined) return undefined;
    return resolveId(`${resolveModuleId(imported.module, module.moduleId)}::${name}`, stack);
  }
  if (module.definitions.has(reference)) {
    return resolveId(`${module.moduleId}::${reference}`, stack);
  }
  const imported = module.imports.named.get(reference);
  if (imported !== undefined) {
    return resolveId(`${resolveModuleId(imported.module, module.moduleId)}::${imported.imported}`, stack);
  }
  return undefined;
}

function typeScriptConstantReferences(api, initializer) {
  const references = new Set();
  const collect = (node) => {
    if (node === undefined) return;
    if (node.Kind === api.Kinds.KindAsExpression) return collect(api.Casts.AsAsExpression(node)?.Expression);
    if (node.Kind === api.Kinds.KindTypeAssertionExpression) return collect(api.Casts.AsTypeAssertion(node)?.Expression);
    if (node.Kind === api.Kinds.KindParenthesizedExpression) return collect(api.Casts.AsParenthesizedExpression(node)?.Expression);
    if (node.Kind === api.Kinds.KindSatisfiesExpression) return collect(api.Casts.AsSatisfiesExpression(node)?.Expression);
    if (node.Kind === api.Kinds.KindIdentifier) {
      if (node.Text !== "undefined" && node.Text !== "NaN" && node.Text !== "Infinity") references.add(node.Text);
      return;
    }
    if (node.Kind === api.Kinds.KindPropertyAccessExpression) {
      const expression = api.Casts.AsPropertyAccessExpression(node);
      const receiver = expression?.Expression;
      const name = expression?.Name?.Text ?? expression?.name?.Text;
      if (receiver?.Kind === api.Kinds.KindIdentifier && name !== undefined) {
        references.add(`${receiver.Text}.${name}`);
      }
      return;
    }
    if (node.Kind === api.Kinds.KindPrefixUnaryExpression) {
      collect(api.Casts.AsPrefixUnaryExpression(node)?.Operand);
      return;
    }
    if (node.Kind === api.Kinds.KindBinaryExpression) {
      const expression = api.Casts.AsBinaryExpression(node);
      collect(expression?.Left);
      collect(expression?.Right);
    }
  };
  collect(initializer);
  return [...references].sort();
}

function createUtf8OffsetMap(text) {
  const offsets = new Uint32Array(text.length + 1);
  let codeUnit = 0;
  let byteOffset = 0;
  while (codeUnit < text.length) {
    offsets[codeUnit] = byteOffset;
    const first = text.charCodeAt(codeUnit);
    if (first >= 0xd800 && first <= 0xdbff && codeUnit + 1 < text.length) {
      const second = text.charCodeAt(codeUnit + 1);
      if (second >= 0xdc00 && second <= 0xdfff) {
        offsets[codeUnit + 1] = byteOffset;
        byteOffset += 4;
        codeUnit += 2;
        offsets[codeUnit] = byteOffset;
        continue;
      }
    }
    byteOffset += first < 0x80 ? 1 : first < 0x800 ? 2 : 3;
    codeUnit++;
    offsets[codeUnit] = byteOffset;
  }
  return offsets;
}

// Convenience: read + extract for a single repo-relative file path.
export function extractFile(api, repoRoot, relPath) {
  const text = readFileSync(`${repoRoot}/${relPath}`, "utf8");
  return extractFileDescriptors(api, relPath, text);
}

// CLI: node extract-signatures.mjs <repo-relative-file.ts> [...]  -> JSON to stdout.
const invokedDirectly = process.argv[1] && process.argv[1].endsWith("extract-signatures.mjs");
if (invokedDirectly) {
  const api = await loadParser();
  const files = process.argv.slice(2);
  const result = {};
  for (const f of files) {
    const rel = f.replace(/^\.?\//, "");
    for (const u of extractFileDescriptors(api, rel, readFileSync(f, "utf8"))) {
      result[u.id] = { metaKind: u.metaKind, descriptor: u.descriptor };
    }
  }
  console.log(JSON.stringify(result, null, 2));
}
