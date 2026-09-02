import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  tsonicCoreSourceSemanticsModules,
} from "../tools/tsonic/packages/source-core/dist/public/index.js";
import {
  providerExportDeclarationsForSourceModule,
} from "../tools/tsonic/packages/source-core/dist/public/extension.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const tsonicCoreCertificationPath = resolve(
  repositoryRoot,
  "implementations/certification/tsonic-core.d.ts",
);

export function buildTsonicCoreCertificationSource() {
  const modules = tsonicCoreSourceSemanticsModules();
  assertExactModuleSet(modules);
  return [
    "// Certified projection of the selected @tsonic/source-core provider model.",
    "// Regenerate only with: node scripts/tsonic-core-certification.mjs --write",
    "",
    ...modules.map(renderModule),
  ].join("\n");
}

function renderModule(module) {
  const declarations = providerExportDeclarationsForSourceModule(module);
  assertUniqueDeclarations(module.moduleSpecifier, declarations);
  const imports = collectExternalReferences(module.moduleSpecifier, declarations);
  const body = [];
  for (const [moduleSpecifier, names] of imports) {
    body.push(`import type { ${names.join(", ")} } from ${JSON.stringify(moduleSpecifier)};`);
  }
  if (body.length !== 0) {
    body.push("");
  }
  for (const declaration of declarations) {
    body.push(renderDeclaration(declaration, module.moduleSpecifier), "");
  }
  body.pop();
  return [
    `declare module ${JSON.stringify(module.moduleSpecifier)} {`,
    indent(body.join("\n")),
    "}",
    "",
  ].join("\n");
}

function renderDeclaration(declaration, moduleSpecifier) {
  assertIdentifier(declaration.name, `declaration '${declaration.id}'`);
  if (declaration.exportName !== undefined || declaration.exportKind !== undefined ||
      declaration.sourceTypeFamily !== undefined || declaration.heritage !== undefined ||
      declaration.documentation !== undefined) {
    throw new Error(`Unsupported metadata on source-core declaration '${declaration.id}'.`);
  }
  switch (declaration.kind) {
    case "type":
      return `export type ${declaration.name}${renderTypeParameters(declaration.typeParameters, moduleSpecifier)} = ${renderType(declaration.type, moduleSpecifier)};`;
    case "interface":
      return [
        `export interface ${declaration.name}${renderTypeParameters(declaration.typeParameters, moduleSpecifier)} {`,
        indent((declaration.members ?? []).map((member) => renderMember(member, moduleSpecifier)).join("\n")),
        "}",
      ].join("\n");
    case "function":
      return (declaration.signatures ?? []).map((signature) =>
        `export function ${renderSignature(declaration.name, signature, moduleSpecifier)}`
      ).join("\n");
    default:
      throw new Error(`Unsupported source-core declaration kind '${declaration.kind}'.`);
  }
}

function renderMember(member, moduleSpecifier) {
  if (member.static === true || member.optional === true || member.documentation !== undefined) {
    throw new Error(`Unsupported metadata on source-core member '${member.id}'.`);
  }
  const name = renderPropertyName(member.name);
  switch (member.kind) {
    case "property":
      return `${member.readonly === true ? "readonly " : ""}${name}: ${renderType(member.type, moduleSpecifier)};`;
    case "method":
      return (member.signatures ?? []).map((signature) =>
        renderSignature(name, signature, moduleSpecifier)
      ).join("\n");
    case "indexer": {
      const signatures = member.signatures ?? [];
      if (signatures.length === 0) {
        throw new Error(`Source-core indexer '${member.id}' has no signatures.`);
      }
      return signatures.map((signature) => {
        if (signature.parameters.length !== 1 || signature.returnType === undefined) {
          throw new Error(`Source-core indexer '${signature.id}' has an invalid shape.`);
        }
        return `${member.readonly === true ? "readonly " : ""}[${renderParameter(signature.parameters[0], moduleSpecifier)}]: ${renderType(signature.returnType, moduleSpecifier)};`;
      }).join("\n");
    }
    default:
      throw new Error(`Unsupported source-core member kind '${member.kind}'.`);
  }
}

function renderSignature(name, signature, moduleSpecifier) {
  if (signature.documentation !== undefined ||
      (signature.name !== undefined && signature.name !== name)) {
    throw new Error(`Unsupported metadata on source-core signature '${signature.id}'.`);
  }
  const parameters = signature.parameters.map((parameter) =>
    renderParameter(parameter, moduleSpecifier)
  ).join(", ");
  return `${name}${renderTypeParameters(signature.typeParameters, moduleSpecifier)}(${parameters}): ${renderType(signature.returnType ?? { kind: "void" }, moduleSpecifier)};`;
}

function renderTypeParameters(parameters = [], moduleSpecifier) {
  if (parameters.length === 0) {
    return "";
  }
  return `<${parameters.map((parameter) => {
    assertIdentifier(parameter.name, "type parameter");
    if (parameter.variance !== undefined) {
      throw new Error(`Unsupported variance on source-core type parameter '${parameter.name}'.`);
    }
    const constraints = parameter.constraints ?? [];
    const constraint = constraints.length === 0
      ? ""
      : ` extends ${constraints.map((entry) => renderType(entry, moduleSpecifier)).join(" & ")}`;
    const defaultType = parameter.defaultType === undefined
      ? ""
      : ` = ${renderType(parameter.defaultType, moduleSpecifier)}`;
    return `${parameter.name}${constraint}${defaultType}`;
  }).join(", ")}>`;
}

function renderParameter(parameter, moduleSpecifier) {
  assertIdentifier(parameter.name, "parameter");
  if (parameter.passingMode !== undefined || parameter.defaultType !== undefined) {
    throw new Error(`Unsupported metadata on source-core parameter '${parameter.name}'.`);
  }
  const rest = parameter.rest === true ? "..." : "";
  const optional = parameter.optional === true && parameter.rest !== true ? "?" : "";
  return `${rest}${parameter.name}${optional}: ${renderType(parameter.type, moduleSpecifier)}`;
}

function renderType(type, moduleSpecifier, parentPrecedence = 0) {
  if (type === undefined) {
    throw new Error("Source-core declaration omitted a required type.");
  }
  switch (type.kind) {
    case "any":
    case "unknown":
    case "void":
    case "never":
    case "undefined":
    case "boolean":
    case "string":
    case "number":
    case "bigint":
    case "object":
      return type.kind;
    case "source-primitive":
      return renderSourcePrimitive(type.name);
    case "source-global":
      assertIdentifier(type.name, "source-global type");
      return renderReference(`globalThis.${type.name}`, type.typeArguments, moduleSpecifier);
    case "type-parameter":
      assertIdentifier(type.name, "type-parameter reference");
      return type.name;
    case "array":
      return `${renderType(type.elementType, moduleSpecifier, 3)}[]`;
    case "tuple":
      return `[${type.elementTypes.map((entry) => renderType(entry, moduleSpecifier)).join(", ")}]`;
    case "union": {
      const rendered = type.types.map((entry) => renderType(entry, moduleSpecifier, 1)).join(" | ");
      return parentPrecedence > 1 ? `(${rendered})` : rendered;
    }
    case "intersection": {
      const rendered = type.types.map((entry) => renderType(entry, moduleSpecifier, 2)).join(" & ");
      return parentPrecedence > 2 ? `(${rendered})` : rendered;
    }
    case "function": {
      const parameters = type.parameters.map((parameter) =>
        renderParameter(parameter, moduleSpecifier)
      ).join(", ");
      const rendered = `${renderTypeParameters(type.typeParameters, moduleSpecifier)}(${parameters}) => ${renderType(type.returnType, moduleSpecifier)}`;
      return parentPrecedence > 0 ? `(${rendered})` : rendered;
    }
    case "literal":
      return type.value === null ? "null" : JSON.stringify(type.value);
    case "provider-ref":
      if (type.localName !== undefined || type.namespaceImport !== undefined) {
        throw new Error(`Source-core provider reference '${type.exportName}' carries an unsupported local binding.`);
      }
      assertIdentifier(type.exportName, "provider reference");
      return renderReference(type.exportName, type.typeArguments, moduleSpecifier);
    default:
      throw new Error(`Unsupported source-core type kind '${type.kind}'.`);
  }
}

function renderReference(name, typeArguments = [], moduleSpecifier) {
  return typeArguments.length === 0
    ? name
    : `${name}<${typeArguments.map((entry) => renderType(entry, moduleSpecifier)).join(", ")}>`;
}

function renderSourcePrimitive(name) {
  switch (name) {
    case "bool":
      return "boolean";
    case "char":
      return "string";
    case "int64":
    case "uint64":
    case "int128":
    case "uint128":
      return "bigint";
    case "int8":
    case "uint8":
    case "int16":
    case "uint16":
    case "int32":
    case "uint32":
    case "native-int":
    case "native-uint":
    case "float16":
    case "float32":
    case "float64":
    case "decimal":
      return "number";
    default:
      throw new Error(`Unsupported source-core primitive '${name}'.`);
  }
}

function renderPropertyName(name) {
  if (typeof name === "string") {
    assertIdentifier(name, "member");
    return name;
  }
  if (name?.kind === "well-known-symbol") {
    assertIdentifier(name.name, "well-known symbol");
    return `[Symbol.${name.name}]`;
  }
  throw new Error(`Unsupported source-core property name '${JSON.stringify(name)}'.`);
}

function collectExternalReferences(moduleSpecifier, declarations) {
  const references = new Map();
  const visit = (value) => {
    if (Array.isArray(value)) {
      for (const entry of value) {
        visit(entry);
      }
      return;
    }
    if (value === null || typeof value !== "object") {
      return;
    }
    if (value.kind === "provider-ref" && value.moduleSpecifier !== moduleSpecifier) {
      const names = references.get(value.moduleSpecifier) ?? new Set();
      names.add(value.exportName);
      references.set(value.moduleSpecifier, names);
    }
    for (const entry of Object.values(value)) {
      visit(entry);
    }
  };
  visit(declarations);
  return [...references]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([specifier, names]) => [specifier, [...names].sort()]);
}

function assertExactModuleSet(modules) {
  const actual = modules.map((module) => module.moduleSpecifier);
  const expected = ["@tsonic/core/types.js", "@tsonic/core/lang.js"];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Selected source-core module set changed: ${JSON.stringify(actual)}.`);
  }
}

function assertUniqueDeclarations(moduleSpecifier, declarations) {
  const identities = new Set();
  const names = new Set();
  for (const declaration of declarations) {
    if (identities.has(declaration.id) || names.has(declaration.name)) {
      throw new Error(`Source-core module '${moduleSpecifier}' has duplicate declaration '${declaration.id}'.`);
    }
    identities.add(declaration.id);
    names.add(declaration.name);
  }
}

function assertIdentifier(value, subject) {
  if (typeof value !== "string" || !/^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(value)) {
    throw new Error(`Source-core ${subject} '${String(value)}' is not a TypeScript identifier.`);
  }
}

function indent(text) {
  return text.split("\n").map((line) => line === "" ? "" : `  ${line}`).join("\n");
}

async function main() {
  const mode = process.argv[2];
  const expected = buildTsonicCoreCertificationSource();
  if (mode === "--write") {
    await mkdir(dirname(tsonicCoreCertificationPath), { recursive: true });
    await writeFile(tsonicCoreCertificationPath, expected, "utf8");
    return;
  }
  if (mode === "--check") {
    const actual = await readFile(tsonicCoreCertificationPath, "utf8");
    if (actual !== expected) {
      throw new Error(
        `Tsonic core certification snapshot is stale; regenerate ${tsonicCoreCertificationPath}.`,
      );
    }
    return;
  }
  throw new Error("Usage: node scripts/tsonic-core-certification.mjs --check|--write");
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main();
}
