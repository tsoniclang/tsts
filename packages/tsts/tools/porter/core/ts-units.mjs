import { extractTsgoOverrideJson } from "./local-overrides.mjs";
import { fail, repoRoot, resolveRepo, walk } from "./runtime.mjs";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

export function scanTsUnits(root) {
  if (!existsSync(root)) return { fileCount: 0, files: [], units: [] };

  const files = walk(root).filter((file) => file.endsWith(".ts"));
  const fileReports = [];
  const units = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const relativeFile = path.relative(repoRoot, file).split(path.sep).join("/");
    const overridesByUnitId = collectFileOverrides(text, relativeFile);
    const textLines = text.split(/\r?\n/);
    const malformedGoSourceLine = textLines.findIndex((line) => /^\s*\*\s+Go source:\s*\S/.test(line));
    if (malformedGoSourceLine >= 0) {
      throw new Error(`inline Go source annotations are forbidden in ${path.relative(repoRoot, file)}:${malformedGoSourceLine + 1}; use 'Port note:' for prose and reserve 'Go source:' for the exact embedded upstream source block`);
    }
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const importBindings = collectTypeScriptImportBindings(sourceFile);
    const regex = /@tsgo-unit\s+({[^\n\r]+})/g;
    let match;
    let metadataCount = 0;
    while ((match = regex.exec(text)) !== null) {
      metadataCount++;
      try {
        const metadata = JSON.parse(match[1]);
        const metadataIssues = validateTsgoUnitMetadata(metadata);
        if (metadataIssues.length > 0) {
          throw new Error(metadataIssues.join("; "));
        }
        const overrideDocStart = text.lastIndexOf("/**", match.index);
        const overrideDocEnd = text.indexOf("*/", regex.lastIndex);
        const doc = overrideDocStart >= 0 && overrideDocEnd >= regex.lastIndex
          ? text.slice(overrideDocStart, overrideDocEnd)
          : "";
        units.push({
          id: metadata.id,
          kind: metadata.kind,
          status: metadata.status,
          sigHash: metadata.sigHash,
          bodyHash: metadata.bodyHash,
          path: relativeFile,
          metadata,
          embeddedGoSource: extractEmbeddedGoSource(doc),
        });
        const override = overridesByUnitId.get(metadata.id);
        if (override !== undefined) units[units.length - 1].override = override;
        const expectedName = expectedTsImplementationName(metadata);
        const matchingDeclarations = expectedName === undefined
          ? []
          : sourceFile.statements.filter((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === expectedName);
        const declaration = matchingDeclarations.length === 1 ? matchingDeclarations[0] : undefined;
        const implementationBody = declaration?.body?.getText(sourceFile) ?? "";
        if (expectedName !== undefined && matchingDeclarations.length !== 1) {
          units[units.length - 1].implementationOwnerIssue = matchingDeclarations.length === 0
            ? `missing function declaration '${expectedName}'`
            : `ambiguous function declaration '${expectedName}' (${matchingDeclarations.length} matches)`;
        }
        const hasUnimplThrow = implementationBody.includes("TSGO_UNIMPLEMENTED");
        units[units.length - 1].hasUnimplThrow = hasUnimplThrow;
        units[units.length - 1].implementationBody = implementationBody;
        units[units.length - 1].implementationAnalysis = analyzeTypeScriptImplementation(implementationBody, importBindings);
      } catch (error) {
        fail(`invalid @tsgo-unit JSON in ${path.relative(repoRoot, file)}: ${error.message}`);
      }
    }
    fileReports.push({
      path: relativeFile,
      metadataCount,
    });
  }
  return { fileCount: files.length, files: fileReports, units };
}

export function collectFileOverrides(text, relativeFile) {
  const overrides = new Map();
  let markersInDocs = 0;
  for (const match of text.matchAll(/\/\*\*[\s\S]*?\*\//g)) {
    const doc = match[0];
    const markerCount = [...doc.matchAll(/@tsgo-override\b/g)].length;
    markersInDocs += markerCount;
    if (markerCount === 0) continue;
    if (markerCount !== 1) throw new Error(`invalid @tsgo-override metadata in ${relativeFile}: one JSDoc must contain exactly one override marker`);
    const unitMatches = [...doc.matchAll(/@tsgo-unit\s+({[^\n\r]+})/g)];
    if (unitMatches.length !== 1) throw new Error(`orphan or ambiguous @tsgo-override in ${relativeFile}: its JSDoc must contain exactly one @tsgo-unit`);
    let metadata;
    try {
      metadata = JSON.parse(unitMatches[0][1]);
    } catch (error) {
      throw new Error(`invalid @tsgo-unit JSON next to @tsgo-override in ${relativeFile}: ${error.message}`);
    }
    const overrideJson = extractTsgoOverrideJson(doc);
    if (overrideJson === undefined) throw new Error(`invalid @tsgo-override in ${relativeFile}: marker must be followed by one JSON object`);
    let override;
    try {
      override = JSON.parse(overrideJson);
    } catch (error) {
      throw new Error(`invalid @tsgo-override JSON in ${relativeFile}: ${error.message}`);
    }
    if (overrides.has(metadata.id)) throw new Error(`duplicate @tsgo-override for ${metadata.id} in ${relativeFile}`);
    overrides.set(metadata.id, override);
  }
  const totalMarkers = [...text.matchAll(/@tsgo-override\b/g)].length;
  if (totalMarkers !== markersInDocs) throw new Error(`orphan @tsgo-override marker outside a JSDoc in ${relativeFile}`);
  return overrides;
}

export function validateTsgoUnitMetadata(metadata) {
  const issues = [];
  if (metadata === null || typeof metadata !== "object" || Array.isArray(metadata)) {
    return ["metadata must be an object"];
  }
  const expectedKeys = ["bodyHash", "id", "kind", "sigHash", "status"];
  const actualKeys = Object.keys(metadata).sort();
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    issues.push(`metadata keys must be exactly ${expectedKeys.join(", ")}`);
  }
  if (typeof metadata.id !== "string" || metadata.id.trim() === "" || /\s/.test(metadata.id)) {
    issues.push("id must be a non-empty whitespace-free string");
  }
  const kinds = new Set(["constGroup", "func", "method", "type", "varGroup"]);
  if (!kinds.has(metadata.kind)) issues.push("kind must be a primary porter unit kind");
  if (typeof metadata.id === "string" && typeof metadata.kind === "string" && !metadata.id.includes(`::${metadata.kind}::`)) {
    issues.push("id kind segment does not match metadata kind");
  }
  if (metadata.status !== "implemented" && metadata.status !== "stub") {
    issues.push("status must be 'implemented' or 'stub'");
  }
  if (typeof metadata.sigHash !== "string" || !/^[0-9a-f]{64}$/.test(metadata.sigHash)) {
    issues.push("sigHash must be a lowercase SHA-256 digest");
  }
  if (typeof metadata.bodyHash !== "string" || !/^[0-9a-f]{64}$/.test(metadata.bodyHash)) {
    issues.push("bodyHash must be a lowercase SHA-256 digest");
  }
  return issues;
}

export function collectTypeScriptImportBindings(sourceFile) {
  const bindings = new Map();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const moduleSpecifier = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    if (clause?.name !== undefined) bindings.set(clause.name.text, { moduleSpecifier, importedName: "default" });
    const named = clause?.namedBindings;
    if (named === undefined) continue;
    if (ts.isNamespaceImport(named)) {
      bindings.set(named.name.text, { moduleSpecifier, importedName: "*" });
      continue;
    }
    for (const element of named.elements) {
      bindings.set(element.name.text, { moduleSpecifier, importedName: element.propertyName?.text ?? element.name.text });
    }
  }
  return bindings;
}

export function analyzeTypeScriptImplementation(body, importBindings = new Map()) {
  if (body === "") return { calls: [] };
  const sourceFile = ts.createSourceFile("/__tsgo_unit.ts", `function __tsgoUnit() ${body}`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const calls = [];
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const callee = typeScriptCallee(node.expression, importBindings);
      if (callee !== undefined) {
        const argumentCalls = new Set();
        for (const argument of node.arguments) {
          collectTypeScriptCallTerminals(argument, argumentCalls);
        }
        calls.push({ ...callee, argumentCalls: [...argumentCalls] });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return { calls };
}

export function typeScriptCallee(expression, importBindings) {
  const segments = [];
  let current = expression;
  while (ts.isPropertyAccessExpression(current)) {
    segments.unshift(current.name.text);
    current = current.expression;
  }
  if (!ts.isIdentifier(current)) {
    if (segments.length === 0) return undefined;
    return { text: segments.join("."), terminal: segments.at(-1), moduleSpecifier: undefined, importedName: undefined };
  }
  segments.unshift(current.text);
  const binding = importBindings.get(current.text);
  return {
    text: segments.join("."),
    terminal: segments.at(-1),
    moduleSpecifier: binding?.moduleSpecifier,
    importedName: binding?.importedName === "*" ? segments[1] : binding?.importedName,
  };
}

export function collectTypeScriptCallTerminals(node, out) {
  if (ts.isCallExpression(node)) {
    let expression = node.expression;
    while (ts.isPropertyAccessExpression(expression)) expression = expression.name;
    if (ts.isIdentifier(expression)) out.add(expression.text);
  }
  ts.forEachChild(node, (child) => collectTypeScriptCallTerminals(child, out));
}

export function expectedTsImplementationName(metadata) {
  if (metadata.kind !== "func" && metadata.kind !== "method") return undefined;
  const segments = String(metadata.id ?? "").split("::");
  const ordinal = /^#(\d+)$/.exec(segments.at(-1) ?? "");
  if (ordinal !== null) segments.pop();
  const qualifiedName = segments.at(-1) ?? "";
  const base = metadata.kind === "method" ? qualifiedName.replaceAll(".", "_") : qualifiedName;
  return ordinal === null ? base : `${base}__${ordinal[1]}`;
}

export function renderGoSourceComment(snippet) {
  return String(snippet ?? "")
    .split("\n")
    .map((line) => line === "" ? " *" : ` * ${line.replaceAll("*/", "* /")}`)
    .join("\n");
}

export function extractEmbeddedGoSource(doc) {
  const lines = doc.split(/\r?\n/);
  const markerIndex = lines.findIndex((line) => /^\s*\*\s+Go source:\s*$/.test(line));
  if (markerIndex < 0) return undefined;
  const sourceLines = [];
  for (let index = markerIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (/^\s*\*\s+@tsgo-/.test(line)) break;
    sourceLines.push(line);
  }
  while (sourceLines.length > 0 && /^\s*(?:\*)?\s*$/.test(sourceLines[sourceLines.length - 1])) {
    sourceLines.pop();
  }
  return sourceLines.join("\n");
}

export function normalizeEmbeddedGoSource(source) {
  if (source === undefined) return undefined;
  return source.split("\n").map((line) => line.trimEnd()).join("\n");
}

export function buildEmbeddedGoSourceUpdates(snapshot, root) {
  const goById = new Map(snapshot.files.flatMap((file) => (file.units ?? []).map((unit) => [unit.id, unit])));
  const tsUnits = scanTsUnits(root);
  const replacementsByPath = new Map();
  for (const tsUnit of tsUnits.units) {
    const goUnit = goById.get(tsUnit.id);
    if (goUnit === undefined) continue;
    const expected = renderGoSourceComment(goUnit.snippet);
    if (normalizeEmbeddedGoSource(tsUnit.embeddedGoSource) === normalizeEmbeddedGoSource(expected)) continue;
    const replacements = replacementsByPath.get(tsUnit.path) ?? new Map();
    replacements.set(tsUnit.id, expected);
    replacementsByPath.set(tsUnit.path, replacements);
  }

  const updates = [];
  let unitCount = 0;
  for (const [relativePath, replacements] of replacementsByPath) {
    const filePath = resolveRepo(relativePath);
    const current = readFileSync(filePath, "utf8");
    const locations = [];
    const metadataRegex = /@tsgo-unit\s+({[^\n\r]+})/g;
    let match;
    while ((match = metadataRegex.exec(current)) !== null) {
      const metadata = JSON.parse(match[1]);
      const expected = replacements.get(metadata.id);
      if (expected === undefined) continue;
      const docStart = current.lastIndexOf("/**", match.index);
      const docEnd = current.indexOf("*/", metadataRegex.lastIndex);
      if (docStart < 0 || docEnd < 0) {
        fail(`missing JSDoc block for ${metadata.id} in ${relativePath}`);
      }
      locations.push({ docStart, docEnd, expected });
    }
    if (locations.length !== replacements.size) {
      fail(`could not locate every stale Go source block in ${relativePath}`);
    }
    let next = current;
    for (const location of locations.sort((left, right) => right.docStart - left.docStart)) {
      const doc = next.slice(location.docStart, location.docEnd);
      const updatedDoc = synchronizeEmbeddedGoSourceDoc(doc, location.expected);
      next = next.slice(0, location.docStart) + updatedDoc + next.slice(location.docEnd);
    }
    updates.push({ path: filePath, text: next, unitCount: locations.length });
    unitCount += locations.length;
  }
  return { updates, unitCount };
}

export function synchronizeEmbeddedGoSourceDoc(doc, expected) {
  const marker = /^\s*\*\s+Go source:\s*$/m.exec(doc);
  if (marker === null) {
    return `${doc.trimEnd()}\n *\n * Go source:\n${expected}\n `;
  }
  const markerLineStart = doc.lastIndexOf("\n", marker.index) + 1;
  const afterMarker = marker.index + marker[0].length;
  const nextTag = /\n\s*\*\s+@tsgo-/.exec(doc.slice(afterMarker));
  const sourceEnd = nextTag === null ? doc.trimEnd().length : afterMarker + nextTag.index + 1;
  const sourceBlock = nextTag === null
    ? ` * Go source:\n${expected}`
    : ` * Go source:\n${expected}\n *\n`;
  return doc.slice(0, markerLineStart) + sourceBlock + doc.slice(sourceEnd);
}
