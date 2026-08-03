import path from "node:path";

import {
  fail,
  repoRoot,
  resolveRepo,
  writeTextSafely,
} from "./common.mjs";
import {
  safeIdentifier,
  safePropertyName,
} from "./policy.mjs";
import { renderGeneratedArtifact } from "./generated-metadata.mjs";
import {
  authoredFacadePathSet,
  buildExternalFacadeMap,
} from "./external-facade-model.mjs";
import {
  importExternalFacadeName,
  renderImports,
  renderParameters,
  tsReturnType,
  tsType,
  useCompat,
} from "./render-unit.mjs";
import {
  renderGoCompatModule,
  renderGoScalarsModule,
} from "./runtime-templates.mjs";

export function writeExternalFacades(config, snapshot, options) {
  const outRoot = resolveRepo(options.out ?? config.tsRoot);
  const artifacts = renderExpectedGeneratedArtifacts(config, snapshot);
  const sourceRootPrefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  let count = 0;
  for (const [repoRelativePath, text] of artifacts) {
    const relativeUnderSource = repoRelativePath.startsWith(sourceRootPrefix)
      ? repoRelativePath.slice(sourceRootPrefix.length)
      : repoRelativePath;
    writeTextSafely(path.join(outRoot, relativeUnderSource), text, {
      force: options.force === true,
      label: "generated Go facade",
    });
    count++;
  }
  console.log(`generated ${count} Go compatibility/facade file(s) under ${path.relative(repoRoot, outRoot)}`);
}

export function renderExpectedGeneratedArtifacts(config, snapshot) {
  const artifacts = new Map();
  const sourceRootPrefix = config.tsRoot.replace(/\/$/, "");
  const scalarsBody = renderGoScalarsModule();
  artifacts.set(
    `${sourceRootPrefix}/go/scalars.ts`,
    renderGeneratedArtifact(snapshot, "go/scalars.ts", "go-scalars", scalarsBody),
  );
  const compatBody = renderGoCompatModule();
  artifacts.set(
    `${sourceRootPrefix}/go/compat.ts`,
    renderGeneratedArtifact(snapshot, "go/compat.ts", "go-compat", compatBody),
  );
  for (const [relativePath, body] of renderExternalFacadeModules(config, snapshot)) {
    artifacts.set(
      `${sourceRootPrefix}/${relativePath}`,
      renderGeneratedArtifact(snapshot, relativePath, "go-facade", body),
    );
  }
  // Authored facade modules are excluded from the generated set: porter:facades must
  // not regenerate or overwrite them, and they are not checked against deterministic
  // generated output. Their faithful Go-semantics bodies are hand-authored.
  for (const authoredPath of authoredFacadePathSet(config)) {
    artifacts.delete(authoredPath);
  }
  return new Map([...artifacts.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

export function renderExternalFacadeModules(config, snapshot) {
  const facades = buildExternalFacadeMap(config, snapshot);
  const groups = new Map();
  for (const facade of facades.values()) {
    if (!facade.tsModule || !facade.tsName) fail(`external facade for ${facade.goName} must include tsModule and tsName`);
    const group = groups.get(facade.tsModule) ?? [];
    group.push(facade);
    groups.set(facade.tsModule, group);
  }

  const output = new Map();
  for (const [tsModule, policies] of [...groups.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    const relativeTargetPath = `${config.tsRoot}/${tsModule}`;
    const context = facadeRendererContext(config, relativeTargetPath, policies, facades);
    const body = policies
      .slice()
      .sort((left, right) => left.tsName.localeCompare(right.tsName))
      .map((policy) => renderExternalFacadePolicy(policy, context))
      .join("\n\n");
    output.set(tsModule, `${renderImports(context)}${body}\n`);
  }
  return output;
}

function facadeRendererContext(config, relativeTargetPath, policies, facades) {
  return {
    config,
    snapshot: { files: [] },
    symbolIndex: new Map(),
    valueTypeIndex: new Map(),
    file: { path: relativeTargetPath, importPath: "", imports: [] },
    relativeTargetPath,
    imports: new Map(),
    coreImports: new Set(),
    compatImports: new Set(),
    diagnostics: [],
    localTypeNames: new Set(policies.map((policy) => policy.tsName)),
    localTopLevelNames: new Set(policies.map((policy) => policy.tsName)),
    importAliases: new Map(),
    externalFacades: facades,
  };
}

function renderExternalFacadePolicy(policy, context) {
  const typeParameters = renderExternalTypeParameters(facadeTypeParameters(policy));
  if (policy.kind === "class") {
    const members = renderExternalMembers(policy, context);
    return `export class ${safeIdentifier(policy.tsName)}${typeParameters} {\n${members.length > 0 ? members.join("\n") : "  readonly __tsgoEmpty?: never;"}\n}`;
  }
  if (policy.kind === "interface" || policy.kind === "opaque") {
    const heritage = (policy.extends ?? []).map((goName) => {
      const parent = context.externalFacades.get(goName);
      if (!parent) fail(`external type policy ${policy.goName} extends unknown facade ${goName}`);
      return importExternalFacadeName(context, parent, { id: `external-facade:${policy.goName}` });
    });
    const extendsClause = heritage.length > 0 ? ` extends ${heritage.join(", ")}` : "";
    const members = renderExternalMembers(policy, context);
    const fallback = policy.kind === "opaque"
      ? `  readonly __goFacadeName: ${JSON.stringify(policy.goName)};`
      : "  readonly __tsgoEmpty?: never;";
    return `export interface ${safeIdentifier(policy.tsName)}${typeParameters}${extendsClause} {\n${members.length > 0 ? members.join("\n") : fallback}\n}`;
  }
  if (policy.kind === "function") {
    const params = renderParameters(policy.parameters ?? [], context, facadeScope(policy), { id: `external-facade:${policy.goName}` });
    const result = tsReturnType(policy.results ?? [], context, facadeScope(policy), { id: `external-facade:${policy.goName}` });
    return `export type ${safeIdentifier(policy.tsName)}${typeParameters} = (${params.join(", ")}) => ${result};`;
  }
  if (policy.kind === "functionValue") {
    return `export function ${safeIdentifier(policy.tsName)}(...args: Array<unknown>): unknown {\n  throw new globalThis.Error(${JSON.stringify(`TSGO_EXTERNAL_FACADE_UNIMPLEMENTED ${policy.goName}`)});\n}`;
  }
  if (policy.kind === "value") {
    return `export const ${safeIdentifier(policy.tsName)}: unknown = undefined as never;`;
  }
  if (policy.kind === "type") {
    const expression = policy.typeExpression
      ? tsType(policy.typeExpression, context, facadeScope(policy), { id: `external-facade:${policy.goName}` })
      : `${useCompat(context, "GoUnresolved")}<${JSON.stringify(policy.goName)}>`;
    return `export type ${safeIdentifier(policy.tsName)}${typeParameters} = ${expression};`;
  }
  fail(`unsupported external facade kind '${policy.kind}' for ${policy.goName}`);
}

function renderExternalMembers(policy, context) {
  const scope = facadeScope(policy);
  return (policy.members ?? []).map((member) => {
    if (member.kind !== "method") fail(`unsupported external facade member kind '${member.kind}' for ${policy.goName}`);
    const params = renderParameters(member.parameters ?? [], context, scope, { id: `external-facade:${policy.goName}` });
    const result = tsReturnType(member.results ?? [], context, scope, { id: `external-facade:${policy.goName}` });
    if (policy.kind === "class") {
      return `  ${safePropertyName(member.name)}(${params.join(", ")}): ${result} {\n    throw new globalThis.Error(${JSON.stringify(`TSGO_EXTERNAL_FACADE_UNIMPLEMENTED ${policy.goName}.${member.name}`)});\n  }`;
    }
    return `  ${safePropertyName(member.name)}(${params.join(", ")}): ${result};`;
  });
}

function renderExternalTypeParameters(typeParameters) {
  return typeParameters.length > 0 ? `<${typeParameters.map((param) => safeIdentifier(param)).join(", ")}>` : "";
}

function facadeScope(policy) {
  return { typeParameters: new Set(facadeTypeParameters(policy)) };
}

function facadeTypeParameters(policy) {
  if (policy.typeParameters?.length) return policy.typeParameters;
  return Array.from({ length: policy.arity ?? 0 }, (_value, index) => `T${index}`);
}
