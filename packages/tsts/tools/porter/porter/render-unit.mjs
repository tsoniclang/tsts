import { createHash } from "node:crypto";

import {
  localTsName,
  primitiveTypes,
  safeIdentifier,
  safeParamName,
  safePropertyName,
  standardSelectorTypes,
} from "./policy.mjs";
import { buildLargeFileSplitStatus } from "./large-file-splits.mjs";
import {
  buildSymbolIndex,
  buildValueTypeIndex,
  fileFromUnit,
  importAliasMap,
  relativeImportPath,
} from "./render-indexes.mjs";
import { buildExternalFacadeMap } from "./external-facade-model.mjs";

export function renderUnitGroup(config, snapshot, relativeTargetPath, units, options = {}) {
  for (const unit of units) {
    if (!["constGroup", "func", "method", "type", "varGroup"].includes(unit.kind)) {
      throw new Error(`cannot render scaffold for non-portable Go unit kind '${unit.kind}': ${unit.id}`);
    }
  }
  const context = rendererContext(config, snapshot, relativeTargetPath, units, options);
  const body = units.map((unit) => renderUnit(unit, context)).join("\n");
  const imports = renderImports(context);
  return `${imports}${body}`.replace(/\s*$/, "\n");
}

function rendererContext(config, snapshot, relativeTargetPath, units, options) {
  const filesByPath = options.filesByPath ?? new Map(snapshot.files.map((file) => [file.path, file]));
  const largeFileSplits = options.largeFileSplits ?? buildLargeFileSplitStatus(config, snapshot);
  // The symbol/value/facade indexes are expensive global builds over the whole
  // snapshot; callers that render many units in a loop may inject pre-built ones.
  const symbolIndex = options.symbolIndex ?? buildSymbolIndex(config, snapshot, largeFileSplits);
  const firstUnit = units[0];
  const goPath = firstUnit?.metadata?.goPath ?? "";
  const file = filesByPath.get(goPath) ?? fileFromUnit(firstUnit);
  const localTypeNames = new Set(
    units
      .filter((unit) => unit.kind === "type")
      .map((unit) => unit.name),
  );
  const localTopLevelNames = new Set(units.flatMap((unit) => topLevelNamesForUnit(unit)));
  return {
    config,
    snapshot,
    symbolIndex,
    valueTypeIndex: options.valueTypeIndex ?? buildValueTypeIndex(config, snapshot, largeFileSplits),
    file,
    relativeTargetPath,
    imports: new Map(),
    coreImports: new Set(),
    compatImports: new Set(),
    diagnostics: options.diagnostics ?? [],
    localTypeNames,
    localTopLevelNames,
    importAliases: importAliasMap(file.imports ?? []),
    externalFacades: options.externalFacades ?? buildExternalFacadeMap(config, snapshot),
  };
}

// Builds the expensive whole-snapshot indexes once, for callers that render many
// units in a loop (e.g. the signature checker). Pass the result as renderUnitGroup
// `options` so rendererContext reuses them instead of rebuilding per call.
export function buildRenderIndexes(config, snapshot) {
  const filesByPath = new Map(snapshot.files.map((file) => [file.path, file]));
  const largeFileSplits = buildLargeFileSplitStatus(config, snapshot);
  return {
    filesByPath,
    largeFileSplits,
    symbolIndex: buildSymbolIndex(config, snapshot, largeFileSplits),
    valueTypeIndex: buildValueTypeIndex(config, snapshot, largeFileSplits),
    externalFacades: buildExternalFacadeMap(config, snapshot),
  };
}

function renderUnit(unit, context) {
  const metadata = {
    id: unit.id,
    kind: unit.kind,
    status: "stub",
    sigHash: unit.sigHash,
    bodyHash: unit.bodyHash,
  };
  const goComment = String(unit.snippet ?? "")
    .split("\n")
    .map((line) => ` * ${line.replaceAll("*/", "* /")}`)
    .join("\n");
  const header = `/**\n * @tsgo-unit ${JSON.stringify(metadata)}\n *\n * Go source:\n${goComment}\n */\n`;
  if (unit.kind === "type") return `${header}${renderTypeUnit(unit, context)}\n`;
  if (unit.kind === "func" || unit.kind === "method") return `${header}${renderFunctionUnit(unit, context)}\n`;
  if (unit.kind === "constGroup") return `${header}${renderValueGroup(unit, context, "const")}\n`;
  if (unit.kind === "varGroup") return `${header}${renderValueGroup(unit, context, "let")}\n`;
  throw new Error(`unsupported unit kind ${unit.kind}`);
}

function renderTypeUnit(unit, context) {
  const typeParameters = renderTypeParameterList(unit.typeParameterDetails ?? [], context, unit, { defaultUnknown: true });
  if (unit.typeKind === "struct") {
    const { heritage, members } = renderObjectMembers(unit.members ?? [], context, unit, "struct");
    const extendsClause = heritage.length > 0 ? ` extends ${heritage.join(", ")}` : "";
    return `export interface ${safeIdentifier(unit.name)}${typeParameters}${extendsClause} {\n${members.length > 0 ? members.join("\n") : "  readonly __tsgoEmpty?: never;"}\n}`;
  }
  if (unit.typeKind === "interface") {
    const { heritage, members } = renderObjectMembers(unit.members ?? [], context, unit, "interface");
    const extendsClause = heritage.length > 0 ? ` extends ${heritage.join(", ")}` : "";
    return `export interface ${safeIdentifier(unit.name)}${typeParameters}${extendsClause} {\n${members.length > 0 ? members.join("\n") : "  readonly __tsgoEmpty?: never;"}\n}`;
  }
  const expression = tsType(unit.typeExpression, context, scopeForUnit(unit), unit);
  return `export type ${safeIdentifier(unit.name)}${typeParameters} = ${expression};`;
}

function renderFunctionUnit(unit, context) {
  const scope = scopeForUnit(unit);
  const receiverTypeParameters = receiverTypeParameterDetails(unit.receiverType);
  const typeParameters = renderTypeParameterList([...(receiverTypeParameters ?? []), ...(unit.typeParameterDetails ?? [])], context, unit);
  const params = [];
  const usedParamNames = new Set();
  if (unit.kind === "method") {
    const receiverName = uniqueName("receiver", usedParamNames);
    params.push(`${receiverName}: ${tsType(unit.receiverType, context, scope, unit)}`);
  }
  params.push(...renderParameters(unit.parameters ?? [], context, scope, unit, usedParamNames));
  const returnType = tsReturnType(unit.results ?? [], context, scope, unit);
  return `export function ${localTsName(unit)}${typeParameters}(${params.join(", ")}): ${returnType} {\n  throw new globalThis.Error(${JSON.stringify(`TSGO_UNIMPLEMENTED ${unit.id}`)});\n}`;
}

function renderValueGroup(unit, context, declarationKind) {
  const lines = [];
  let fallbackIndex = 0;
  let blankIndex = 0;
  const used = new Set();
  for (const spec of unit.valueSpecs ?? []) {
    const names = (spec.names ?? []).length > 0 ? spec.names : [`__tsgoValue${fallbackIndex++}`];
    for (const [index, name] of names.entries()) {
      const baseName = name === "_" ? `${localTsName(unit)}_${unitHash(unit)}_${blankIndex++}` : safeIdentifier(name);
      const localName = uniqueName(baseName, used);
      const inferredType = spec.inferredValueTypes?.[index] ?? spec.inferredValueTypes?.[0];
      const indexedType = context.valueTypeIndex.get(`${context.file.importPath}::${name}`);
      const valueType = spec.type
        ? tsType(spec.type, context, scopeForUnit(unit), unit)
        : inferredType
          ? tsType(inferredType, context, scopeForUnit(unit), unit)
          : indexedType
            ? tsType(indexedType, context, scopeForUnit(unit), unit)
            : inferValueType(spec.values?.[index] ?? spec.values?.[0], context, unit);
      lines.push(`export ${declarationKind} ${localName}: ${valueType} = undefined as never;`);
    }
  }
  if (lines.length === 0) {
    lines.push(`export ${declarationKind} ${localTsName(unit)}: never = undefined as never;`);
  }
  return lines.join("\n");
}

function renderObjectMembers(members, context, unit, ownerKind) {
  const scope = scopeForUnit(unit);
  const heritage = [];
  const lines = [];
  let embeddedIndex = 0;
  let blankIndex = 0;
  for (const member of members) {
    if (member.kind === "embeddedField" || member.kind === "embeddedInterface") {
      const embeddedType = tsType(member.typeExpr, context, scope, unit);
      lines.push(`  readonly __tsgoEmbedded${embeddedIndex++}?: ${embeddedType};`);
      continue;
    }
    if (member.kind === "method" && member.typeExpr?.kind === "func") {
      const params = renderParameters(member.typeExpr.parameters ?? [], context, scope, unit);
      const result = tsReturnType(member.typeExpr.results ?? [], context, scope, unit);
      lines.push(`  ${safePropertyName(member.name)}(${params.join(", ")}): ${result};`);
      continue;
    }
    const propertyName = member.name === "_" ? `__tsgoBlank${blankIndex++}` : member.name;
    const readonly = ownerKind === "struct" ? "" : "readonly ";
    lines.push(`  ${readonly}${safePropertyName(propertyName)}: ${tsType(member.typeExpr, context, scope, unit)};`);
  }
  return { heritage, members: lines };
}

export function renderParameters(params, context, scope, unit, used = new Set()) {
  const output = [];
  let syntheticIndex = 0;
  for (const param of params) {
    const names = (param.names ?? []).length > 0 ? param.names : [`arg${syntheticIndex++}`];
    for (const name of names) {
      const paramName = uniqueName(safeParamName(name), used);
      const paramType = tsType(param.type, context, scope, unit);
      if (param.variadic) {
        output.push(`...${paramName}: ${restType(paramType)}`);
      } else {
        output.push(`${paramName}: ${paramType}`);
      }
    }
  }
  return output;
}

export function tsReturnType(results, context, scope, unit) {
  const flattened = [];
  for (const result of results) {
    const names = (result.names ?? []).length > 0 ? result.names : [""];
    for (const _name of names) {
      flattened.push(tsType(result.type, context, scope, unit));
    }
  }
  if (flattened.length === 0) return "void";
  if (flattened.length === 1) return flattened[0];
  return `[${flattened.join(", ")}]`;
}

function restType(paramType) {
  const sliceMatch = /^GoSlice<(.+)>$/.exec(paramType);
  if (sliceMatch) return `${sliceMatch[1]}[]`;
  return `Array<${paramType}>`;
}

function renderTypeParameterList(typeParameters, context, unit, options = {}) {
  const seen = new Set();
  const rendered = [];
  for (const param of typeParameters) {
    if (!param?.name || seen.has(param.name)) continue;
    seen.add(param.name);
    const constraint = renderTypeParameterConstraint(param.constraint, context, unit);
    const defaultType = options.defaultUnknown ? " = unknown" : "";
    rendered.push(`${safeIdentifier(param.name)}${constraint}${defaultType}`);
  }
  return rendered.length > 0 ? `<${rendered.join(", ")}>` : "";
}

function renderTypeParameterConstraint(constraint, context, unit) {
  if (!constraint || constraint.text === "any") return "";
  if (constraint.text === "comparable") return ` extends ${useCompat(context, "GoComparable")}`;
  useCompat(context, "GoConstraint");
  return "";
}

export function tsType(expr, context, scope, unit) {
  if (!expr) return "unknown";
  switch (expr.kind) {
    case "ident":
      return tsIdentType(expr.name, context, scope, unit);
    case "selector":
      return tsSelectorType(expr, context, scope, unit);
    case "pointer":
      return `${useCompat(context, "GoPtr")}<${tsType(expr.element, context, scope, unit)}>`;
    case "slice":
      return `${useCompat(context, "GoSlice")}<${tsType(expr.element, context, scope, unit)}>`;
    case "array":
      return `${useCompat(context, "GoArray")}<${tsType(expr.element, context, scope, unit)}, ${JSON.stringify(expr.length ?? "")}>`;
    case "map":
      return `${useCompat(context, "GoMap")}<${tsType(expr.key, context, scope, unit)}, ${tsType(expr.value, context, scope, unit)}>`;
    case "func":
      return tsFunctionType(expr, context, scope, unit);
    case "interface":
      return tsInlineInterface(expr.members ?? [], context, scope, unit);
    case "struct":
      return tsInlineStruct(expr.members ?? [], context, scope, unit);
    case "ellipsis":
      return `${useCompat(context, "GoSlice")}<${tsType(expr.element, context, scope, unit)}>`;
    case "instantiation":
      return tsInstantiationType(expr, context, scope, unit);
    case "paren":
      return tsType(expr.element, context, scope, unit);
    case "channel":
      return `${useCompat(context, "GoChan")}<${tsType(expr.element, context, scope, unit)}, ${JSON.stringify(expr.direction ?? "bidirectional")}>`;
    case "unary":
    case "binary":
      return `${useCompat(context, "GoConstraint")}<${JSON.stringify(expr.text)}>`;
    default:
      context.diagnostics.push({
        severity: "error",
        unitID: unit?.id ?? "",
        message: `unsupported Go type expression '${expr.kind}' (${expr.text})`,
      });
      return `${useCompat(context, "GoUnsupported")}<${JSON.stringify(expr.text ?? expr.kind)}>`;
  }
}

function tsIdentType(name, context, scope, unit) {
  if (!name) return "unknown";
  if (scope.typeParameters.has(name)) return safeIdentifier(name);
  const primitive = primitiveTypes.get(name);
  if (primitive) {
    if (primitive.source === "core") return useCore(context, primitive.name);
    if (primitive.source === "compat") return useCompat(context, primitive.name);
    return primitive.name;
  }
  if (context.localTypeNames.has(name)) return safeIdentifier(name);
  const resolved = resolvePackageSymbol(context, context.file.importPath, name, unit);
  if (resolved) return resolved;
  context.diagnostics.push({
    severity: "error",
    unitID: unit?.id ?? "",
    message: `unresolved package-local type '${name}' in ${context.file.path}`,
  });
  return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(`${context.file.importPath}.${name}`)}>`;
}

function tsSelectorType(expr, context, _scope, unit, typeArgs = []) {
  const importPath = context.importAliases.get(expr.package);
  if (!importPath) {
    const externalName = `${expr.package}.${expr.name}`;
    return tsExternalType(context, externalName, typeArgs, unit);
  }
  const standard = standardSelectorTypes.get(`${importPath}.${expr.name}`);
  if (standard) return useCompat(context, standard);
  if (importPath.startsWith(context.config.goModulePath)) {
    const resolved = resolvePackageSymbol(context, importPath, expr.name, unit);
    if (resolved) return resolved;
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `unresolved imported TS-Go type '${expr.name}' from ${importPath}`,
    });
    return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(`${importPath}.${expr.name}`)}>`;
  }
  return tsExternalType(context, `${importPath}.${expr.name}`, typeArgs, unit);
}

function tsInstantiationType(expr, context, scope, unit) {
  const args = (expr.typeArgs ?? []).map((arg) => tsType(arg, context, scope, unit));
  if (expr.element?.kind === "selector") {
    const selector = expr.element;
    const importPath = context.importAliases.get(selector.package);
    const standard = importPath ? standardSelectorTypes.get(`${importPath}.${selector.name}`) : undefined;
    if (!standard) return tsSelectorType(selector, context, scope, unit, args);
  }
  const base = tsType(expr.element, context, scope, unit);
  return `${base}<${args.join(", ")}>`;
}

function tsExternalType(context, goName, typeArgs, unit) {
  const facade = context.externalFacades.get(goName);
  if (!facade) {
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `external Go type '${goName}' was not assigned a generated facade`,
    });
    return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(goName)}>`;
  }
  if (facade.arity !== typeArgs.length) {
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `external Go type '${goName}' expected ${facade.arity} type argument(s), got ${typeArgs.length}`,
    });
  }
  const name = importExternalFacadeName(context, facade, unit);
  return typeArgs.length > 0 ? `${name}<${typeArgs.join(", ")}>` : name;
}

function tsFunctionType(expr, context, scope, unit) {
  const params = renderParameters(expr.parameters ?? [], context, scope, unit);
  const result = tsReturnType(expr.results ?? [], context, scope, unit);
  return `(${params.join(", ")}) => ${result}`;
}

function tsInlineInterface(members, context, scope, unit) {
  if (members.length === 0) return "unknown";
  const lines = [];
  for (const member of members) {
    if (member.kind === "embeddedInterface") {
      lines.push(`readonly __tsgoEmbedded?: ${tsType(member.typeExpr, context, scope, unit)}`);
      continue;
    }
    if (member.kind === "method" && member.typeExpr?.kind === "func") {
      const params = renderParameters(member.typeExpr.parameters ?? [], context, scope, unit);
      const result = tsReturnType(member.typeExpr.results ?? [], context, scope, unit);
      lines.push(`${safePropertyName(member.name)}: (${params.join(", ")}) => ${result}`);
      continue;
    }
    lines.push(`${safePropertyName(member.name)}: ${tsType(member.typeExpr, context, scope, unit)}`);
  }
  return `{ ${lines.join("; ")} }`;
}

function tsInlineStruct(members, context, scope, unit) {
  if (members.length === 0) return "{ readonly __tsgoEmpty?: never }";
  return `{ ${members.map((member, index) => {
    const name = member.kind === "embeddedField" ? `__tsgoEmbedded${index}` : member.name;
    return `${safePropertyName(name)}: ${tsType(member.typeExpr, context, scope, unit)}`;
  }).join("; ")} }`;
}

function inferValueType(value, context, unit) {
  if (value === undefined || value === "") return "unknown";
  if (/^".*"$|^`[\s\S]*`$/.test(value)) return "string";
  if (/^(true|false)$/.test(value)) return useCore(context, "bool");
  if (/^[+-]?(?:\d|\.\d)/.test(value) || value === "iota") return useCore(context, "int");
  const identifierMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)$/.exec(value);
  if (identifierMatch) {
    const inferred = context.valueTypeIndex.get(`${context.file.importPath}::${identifierMatch[1]}`);
    if (inferred) return tsType(inferred, context, scopeForUnit(unit), unit);
  }
  const conversionMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/.exec(value);
  if (conversionMatch && context.symbolIndex.has(`${context.file.importPath}::${conversionMatch[1]}`)) {
    return tsType({ kind: "ident", name: conversionMatch[1], text: conversionMatch[1] }, context, scopeForUnit(unit), unit);
  }
  return "unknown";
}

function topLevelNamesForUnit(unit) {
  if (unit.kind === "type" || unit.kind === "func" || unit.kind === "method") return [localTsName(unit), safeIdentifier(unit.name)];
  if (unit.kind === "constGroup" || unit.kind === "varGroup") {
    const names = [];
    for (const spec of unit.valueSpecs ?? []) {
      for (const name of spec.names ?? []) {
        if (name !== "_") names.push(safeIdentifier(name));
      }
    }
    return names.length > 0 ? names : [localTsName(unit)];
  }
  return [localTsName(unit)];
}

function uniqueName(name, used) {
  const base = name === "" ? "arg" : name;
  let candidate = base;
  let index = 0;
  while (used.has(candidate)) {
    candidate = `${base}${++index}`;
  }
  used.add(candidate);
  return candidate;
}

function uniqueImportAlias(exportName, unit, targetPath = "") {
  const hash = createHash("sha256").update(`${unit?.id ?? ""}:${targetPath}:${exportName}`).digest("hex").slice(0, 8);
  return `${exportName}_${hash}`;
}

function isImportAliasUsed(context, alias) {
  for (const names of context.imports.values()) {
    for (const existing of names.values()) {
      if (existing === alias) return true;
    }
  }
  return false;
}

function unitHash(unit) {
  return createHash("sha256").update(unit?.id ?? "").digest("hex").slice(0, 8);
}

function scopeForUnit(unit) {
  return {
    typeParameters: new Set([
      ...(unit.typeParameters ?? []),
      ...(unit.typeParameterDetails ?? []).map((param) => param.name),
      ...receiverTypeParameterDetails(unit.receiverType).map((param) => param.name),
    ]),
  };
}

function receiverTypeParameterDetails(receiverType) {
  const details = [];
  const seen = new Set();
  for (const name of collectReceiverTypeParameterNames(receiverType)) {
    if (primitiveTypes.has(name) || seen.has(name)) continue;
    seen.add(name);
    details.push({ name });
  }
  return details;
}

function collectReceiverTypeParameterNames(expr) {
  if (!expr) return [];
  if (expr.kind === "pointer") return collectReceiverTypeParameterNames(expr.element);
  if (expr.kind === "instantiation") return (expr.typeArgs ?? []).flatMap((arg) => collectTypeIdentifiers(arg));
  return [];
}

function collectTypeIdentifiers(expr) {
  if (!expr) return [];
  if (expr.kind === "ident") return [expr.name];
  return [
    ...collectTypeIdentifiers(expr.element),
    ...collectTypeIdentifiers(expr.key),
    ...collectTypeIdentifiers(expr.value),
    ...collectTypeIdentifiers(expr.left),
    ...collectTypeIdentifiers(expr.right),
    ...(expr.typeArgs ?? []).flatMap((arg) => collectTypeIdentifiers(arg)),
  ];
}

function resolvePackageSymbol(context, importPath, name, unit) {
  const symbol = context.symbolIndex.get(`${importPath}::${name}`);
  if (!symbol) return undefined;
  if (!symbol.active) return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(symbol.goName)}>`;
  if (symbol.targetPath === context.relativeTargetPath) return safeIdentifier(symbol.exportName);
  const alias = importTypeName(context, symbol.targetPath, symbol.exportName, unit);
  return alias;
}

function importTypeName(context, targetPath, exportName, unit) {
  const source = relativeImportPath(context.relativeTargetPath, targetPath);
  const names = context.imports.get(source) ?? new Map();
  context.imports.set(source, names);
  const safeExport = safeIdentifier(exportName);
  const existing = names.get(safeExport);
  if (existing) return existing;
  const alias = context.localTopLevelNames.has(safeExport) || isImportAliasUsed(context, safeExport)
    ? uniqueImportAlias(safeExport, unit, targetPath)
    : safeExport;
  names.set(safeExport, alias);
  return alias;
}

export function renderImports(context) {
  const lines = [];
  if (context.coreImports.size > 0) {
    lines.push(`import type { ${[...context.coreImports].sort().join(", ")} } from "${relativeImportPath(context.relativeTargetPath, `${context.config.tsRoot}/go/scalars.ts`)}";`);
  }
  if (context.compatImports.size > 0) {
    lines.push(`import type { ${[...context.compatImports].sort().join(", ")} } from "${relativeImportPath(context.relativeTargetPath, `${context.config.tsRoot}/go/compat.ts`)}";`);
  }
  for (const [source, names] of [...context.imports.entries()].sort()) {
    const specifiers = [...names.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([exportName, alias]) => exportName === alias ? exportName : `${exportName} as ${alias}`)
      .join(", ");
    lines.push(`import type { ${specifiers} } from "${source}";`);
  }
  return lines.length > 0 ? `${lines.join("\n")}\n\n` : "";
}

function useCore(context, name) {
  context.coreImports.add(name);
  return name;
}

export function useCompat(context, name) {
  context.compatImports.add(name);
  return name;
}

export function importExternalFacadeName(context, policy, unit) {
  if (!policy.tsModule || !policy.tsName) {
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `external type policy for '${policy.goName}' must specify tsModule and tsName`,
    });
    return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(policy.goName)}>`;
  }
  if (`${context.config.tsRoot}/${policy.tsModule}` === context.relativeTargetPath) return safeIdentifier(policy.tsName);
  return importTypeName(context, `${context.config.tsRoot}/${policy.tsModule}`, policy.tsName, unit);
}
