import {
  renderCanonicalSignature,
  renderCanonicalTypeParameters,
} from "./canonical-type-renderer.mjs";
import { compareText } from "./deterministic-order.mjs";
import { requireFinalizedExternalFacadeStorageCatalog } from "./external-facades.mjs";
import { safeIdentifier, safePropertyName } from "./names.mjs";
import { renderGoCompatModule, renderGoScalarsModule } from "./runtime-templates.mjs";
import { hashText, repoRoot, resolveRepo, writeTextSafely } from "./runtime.mjs";
import { canonicalSchemaValue } from "./semantic-variants.mjs";
import { materializeSemanticMethodSet } from "./semantic-method-sets.mjs";
import { semanticTypeContexts } from "./semantic-type-nilability.mjs";
import { FACADE_POINTER_METHOD_SET_SYMBOL } from "./pointer-method-facades.mjs";
import { renderImports, semanticRendererOperations, typeParameterRenderingOperations } from "./type-renderer.mjs";
import { addProfileSemanticStorageEvidence, buildTypeRepresentationEvidence } from "../ts-extractor/semantic-pointer-lowering.mjs";
import { loadProfile } from "../ts-extractor/profile.mjs";
import {
  lowerSemanticSignature,
  lowerSemanticTypeParameters,
  semanticContextWithTypeParameters,
} from "../ts-extractor/semantic-type-contract.mjs";
import path from "node:path";
import { externalMethodById } from "./external-facade-method-bindings.mjs";
import { buildTypeStorageIdentityMap } from "./type-storage-policies.mjs";
import { buildFacadeSemanticIndex } from "./facade-renderer-context.mjs";
import {
  externalConstraintSources,
  externalDefinedTypeIdentity,
  externalMethodSelectionBrand,
  renderExternalDefinedType,
  renderExternalType,
  selectedMethodTypeParameterAliases,
  selectedTypeParameterName,
} from "./facade-artifacts/semantic-types.mjs";
import { buildExternalFacadeComparisonEvidence } from "./facade-artifacts/comparison-evidence.mjs";
import { buildAuthoredContractSurface } from "./authored-contract-surface.mjs";
import { directAuthoredMethodSetMode, memberIsSelected } from "./facade-artifacts/member-selection.mjs";
import { externalRuntimeStorageOperations } from "./facade-artifacts/runtime-basic-storage.mjs";
import { renderGeneratedArtifact } from "./facade-artifacts/generated-envelope.mjs";

export { renderGeneratedArtifact, stripGeneratedArtifactHeader } from "./facade-artifacts/generated-envelope.mjs";
export { authoredFacadePathSet } from "./facade-artifacts/authored-paths.mjs";

export function writeExternalFacades(config, snapshot, facades, options) {
  requireFinalizedExternalFacadeStorageCatalog(facades, config, snapshot);
  const outRoot = resolveRepo(options.out ?? config.tsRoot);
  const artifacts = renderExpectedGeneratedArtifacts(config, snapshot, facades);
  const sourceRootPrefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  let count = 0;
  for (const [repoRelativePath, text] of artifacts) {
    const relativeUnderSource = repoRelativePath.startsWith(sourceRootPrefix) ? repoRelativePath.slice(sourceRootPrefix.length) : repoRelativePath;
    writeTextSafely(path.join(outRoot, relativeUnderSource), text, {
      force: options.force === true,
      label: "generated Go facade",
    });
    count++;
  }
  console.log(`generated ${count} Go compatibility/facade file(s) under ${path.relative(repoRoot, outRoot)}`);
}

export function renderExpectedGeneratedArtifacts(config, snapshot, facades) {
  requireFinalizedExternalFacadeStorageCatalog(facades, config, snapshot);
  const artifacts = new Map();
  const sourceRootPrefix = config.tsRoot.replace(/\/$/, "");
  artifacts.set(
    `${sourceRootPrefix}/go/scalars.ts`,
    renderGeneratedArtifact(snapshot, "go/scalars.ts", "go-scalars", renderGoScalarsModule()),
  );
  artifacts.set(
    `${sourceRootPrefix}/go/compat.ts`,
    renderGeneratedArtifact(snapshot, "go/compat.ts", "go-compat", renderGoCompatModule()),
  );
  for (const [relativePath, body] of renderExternalFacadeModules(config, snapshot, facades)) {
    artifacts.set(`${sourceRootPrefix}/${relativePath}`, renderGeneratedArtifact(snapshot, relativePath, "go-facade", body));
  }
  return new Map([...artifacts.entries()].sort(([left], [right]) => compareText(left, right)));
}

export function renderExternalFacadeModules(config, snapshot, catalog) {
  const facades = requireFinalizedExternalFacadeStorageCatalog(catalog, config, snapshot).artifactFacades(config, snapshot);
  const groups = new Map();
  for (const facade of facades.values()) {
    if (facade.storageStrategy !== "generated") continue;
    const group = groups.get(facade.tsModule) ?? [];
    group.push(facade);
    groups.set(facade.tsModule, group);
  }
  const profile = loadProfile(config);
  const evidence = addProfileSemanticStorageEvidence(
    buildTypeRepresentationEvidence(config, snapshot, facades),
    profile,
    buildTypeStorageIdentityMap(config, snapshot),
  );
  const output = new Map();
  for (const [tsModule, group] of [...groups.entries()].sort(([left], [right]) => compareText(left, right))) {
    const sorted = group.slice().sort((left, right) => compareText(left.tsName, right.tsName));
    const relativeTargetPath = `${config.tsRoot.replace(/\/+$/, "")}/${tsModule}`;
    const context = facadeRendererContext(config, snapshot, relativeTargetPath, sorted, facades, profile, evidence);
    const bodies = sorted.map((facade) => renderInvariantExternalFacade(facade, context, config, snapshot, sorted, facades, profile, evidence));
    output.set(tsModule, `${renderImports(context)}${bodies.join("\n\n")}\n`);
  }
  return output;
}

export function facadeRendererContext(config, snapshot, relativeTargetPath, policies, facades, profile, evidence) {
  return {
    config,
    snapshot,
    semanticIndex: buildFacadeSemanticIndex(config, profile, evidence, snapshot),
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
    bridge: profile.bridge,
  };
}

export function renderExternalFacadePolicy(facade, declaration, profileIndex, context) {
  const unit = { id: `external-facade:${facade.objectId}`, semantic: [{ profiles: [profileIndex] }] };
  const semanticContext = semanticContextWithTypeParameters({ index: context.semanticIndex, profile: profileIndex }, declaration.typeParameters);
  const operations = semanticRendererOperations(context, unit);
  const parameters = lowerSemanticTypeParameters(declaration.typeParameters, semanticContext);
  const typeParameters = renderCanonicalTypeParameters(
    parameters,
    typeParameterRenderingOperations(operations, parameters, externalConstraintSources(declaration.typeParameters, facade.objectId), unit),
  );
  const name = safeIdentifier(facade.tsName);
  const pointerMethods = renderPointerMethodSetSurface(declaration, semanticContext, operations, context);
  if (!declaration.alias && declaration.rhs.kind === "interface" && externalInterfaceCanUseDeclaration(declaration.rhs)) {
    return externalDeclarationVisibility(facade, renderExternalInterfaceDeclaration(
      name,
      typeParameters,
      declaration,
      semanticContext,
      operations,
      context,
      pointerMethods,
    ));
  }
  const valueMethods = renderMethodSetSurface(declaration, "value", semanticContext, operations, context);
  const body = attachPointerMethodSet(
    attachMethodSet(renderExternalDeclarationBody(declaration, semanticContext, operations), valueMethods),
    pointerMethods,
  );
  return externalDeclarationVisibility(facade, `export type ${name}${typeParameters} = ${body};`);
}

export function createExternalFacadeContractRenderer(config, snapshot, catalog) {
  requireFinalizedExternalFacadeStorageCatalog(catalog, config, snapshot);
  const facades = catalog.auditFacades(config, snapshot);
  const environment = externalContractEnvironment(config, snapshot, facades);
  return (facade, declaration, profileIndex) => {
    const context = environment.contextFor(facade);
    const authoredSurface = catalog.authoredSurface(config, snapshot, facade.objectId);
    const contractSurface = buildAuthoredContractSurface(
      facade,
      declaration,
      context.semanticIndex.methodSetSignatures,
      authoredSurface,
    );
    const semanticContext = semanticContextWithTypeParameters(
      { index: context.semanticIndex, profile: profileIndex },
      declaration.typeParameters,
    );
    const body = renderExternalFacadeContractPolicy(facade, declaration, profileIndex, context, contractSurface);
    return {
      evidence: buildExternalFacadeComparisonEvidence(
        facade,
        declaration,
        semanticContext,
        context,
        contractSurface,
      ),
      source: `${externalContractPrefix(environment, facade, context)}${body}\n`,
    };
  };
}

export function createExternalMethodBindingContractRenderer(config, snapshot, catalog) {
  requireFinalizedExternalFacadeStorageCatalog(catalog, config, snapshot);
  const facades = catalog.auditFacades(config, snapshot);
  const environment = externalContractEnvironment(config, snapshot, facades);
  return (facade, declaration, binding, profileIndex) => {
    const method = externalMethodById(declaration, binding.methodId);
    if (method === undefined) throw new Error(`external Go method binding '${binding.methodId}' is missing from '${facade.objectId}'`);
    const context = environment.contextFor(facade);
    const semanticContext = semanticContextWithTypeParameters(
      { index: context.semanticIndex, profile: profileIndex },
      declaration.typeParameters,
    );
    const unit = { id: `external-method:${binding.methodId}`, semantic: [{ profiles: [profileIndex] }] };
    const operations = externalRuntimeStorageOperations(facade, semanticRendererOperations(context, unit)).operations;
    const lowered = lowerSemanticSignature(method.signature, semanticContext, { includeReceiver: true });
    const parameters = [...lowered.receiverTypeParameters, ...lowered.typeParameters];
    const typeParameters = renderCanonicalTypeParameters(
      parameters,
      typeParameterRenderingOperations(
        operations,
        parameters,
        externalConstraintSources([...method.signature.receiverTypeParameters, ...method.signature.typeParameters], method.id),
        unit,
      ),
    );
    const rendered = renderCanonicalSignature(lowered, operations, {
      includeReceiver: true,
      receiverName: binding.receiverName,
    });
    const body = `export function ${safeIdentifier(binding.tsName)}${typeParameters}(${rendered.parameters.join(", ")}): ${rendered.returnType};`;
    return {
      signature: lowered,
      source: `${externalContractPrefix(environment, facade, context)}${externalFacadeScaffold(facade)}\n${body}\n`,
    };
  };
}

function externalContractEnvironment(config, snapshot, facades) {
  const profile = loadProfile(config);
  const storageFacades = new Map(facades);
  const evidence = addProfileSemanticStorageEvidence(
    buildTypeRepresentationEvidence(config, snapshot, facades),
    profile,
    buildTypeStorageIdentityMap(config, snapshot),
  );
  const byModule = new Map();
  for (const facade of storageFacades.values()) {
    const group = byModule.get(facade.tsModule) ?? [];
    group.push(facade);
    byModule.set(facade.tsModule, group);
  }
  for (const group of byModule.values()) group.sort((left, right) => compareText(left.tsName, right.tsName));
  return {
    byModule,
    contextFor(facade) {
      const relativeTargetPath = `${config.tsRoot.replace(/\/+$/, "")}/${facade.tsModule}`;
      return facadeRendererContext(
        config,
        snapshot,
        relativeTargetPath,
        byModule.get(facade.tsModule) ?? [facade],
        storageFacades,
        profile,
        evidence,
      );
    },
  };
}

function externalContractPrefix(environment, facade, context) {
  const localTypeScaffolds = (environment.byModule.get(facade.tsModule) ?? [])
    .filter((entry) => entry.objectId !== facade.objectId)
    .map((entry) => {
      const parameters = Array.from({ length: entry.arity }, (_unused, index) => `T${index}`).join(", ");
      return `type ${safeIdentifier(entry.tsName)}${parameters === "" ? "" : `<${parameters}>`} = never;`;
    });
  return `${renderImports(context)}${localTypeScaffolds.length === 0 ? "" : `${localTypeScaffolds.join("\n")}\n`}`;
}

function externalFacadeScaffold(facade) {
  const parameters = Array.from({ length: facade.arity }, (_unused, index) => `T${index}`).join(", ");
  return `type ${safeIdentifier(facade.tsName)}${parameters === "" ? "" : `<${parameters}>`} = never;`;
}

export function renderExternalFacadeContractPolicy(facade, declaration, profileIndex, context, contractSurface) {
  if (contractSurface?.authoredSurface?.objectId !== facade.objectId) {
    throw new Error(`external facade '${facade.objectId}' has no exact authored contract surface`);
  }
  const memberSelection = contractSurface.memberSelection;
  const representation = facade.runtimeAdaptation?.representation;
  const unit = { id: `external-facade:${facade.objectId}`, semantic: [{ profiles: [profileIndex] }] };
  const semanticContext = semanticContextWithTypeParameters({ index: context.semanticIndex, profile: profileIndex }, declaration.typeParameters);
  const runtimeOperations = externalRuntimeStorageOperations(facade, semanticRendererOperations(context, unit));
  const operations = runtimeOperations.operations;
  const finish = (declarationText) => {
    runtimeOperations.assertConsumed();
    return declarationText;
  };
  const parameters = lowerSemanticTypeParameters(declaration.typeParameters, semanticContext);
  const typeParameters = renderCanonicalTypeParameters(
    parameters,
    typeParameterRenderingOperations(operations, parameters, externalConstraintSources(declaration.typeParameters, facade.objectId), unit),
  );
  const name = safeIdentifier(facade.tsName);
  const pointerMethods = contractSurface.pointerMethods.length > 0
    ? renderMethodListSurface(declaration, contractSurface.pointerMethods, "pointer", semanticContext, operations)
    : undefined;
  if (representation === "scalar") {
    const scalar = facade.runtimeAdaptation.scalarStorage;
    const body = declaration.alias
      ? scalar
      : `(${scalar}) & { readonly ${safePropertyName(externalDefinedTypeIdentity(declaration))}: never }`;
    return finish(externalDeclarationVisibility(
      facade,
      `export type ${name}${typeParameters} = ${body};`,
    ));
  }
  if (representation === "class") {
    if (declaration.rhs.kind !== "struct" || declaration.alias) {
      throw new Error(`external facade ${facade.objectId} can use class runtime adaptation only for a defined Go struct`);
    }
    return finish(externalDeclarationVisibility(facade, renderAuthoredClassContract(
      name,
      typeParameters,
      facade,
      declaration,
      semanticContext,
      operations,
      context,
      memberSelection,
    )));
  }
  if (contractSurface.declarationKind === "object-alias") {
    const members = [];
    for (const field of contractSurface.fields) {
      const variable = field.variable;
      members.push(`${safePropertyName(variable.name)}: ${renderExternalType(variable.type, semanticContext, semanticTypeContexts.value, operations)}`);
    }
    for (const method of contractSurface.methods) {
      const aliases = selectedMethodTypeParameterAliases(declaration, method);
      members.push(renderMethodSignature(method.name, method.signature, semanticContext, operations, aliases, true));
    }
    const heritage = contractSurface.heritage.map((embedded) => renderExternalType(
      embedded,
      semanticContext,
      semanticTypeContexts.heritage,
      operations,
    ));
    const bodyParts = [];
    if (members.length > 0) bodyParts.push(`{ ${members.join("; ")} }`);
    bodyParts.push(...heritage.map((entry) => `(${entry})`));
    const body = bodyParts.length === 0 ? "unknown" : bodyParts.join(" & ");
    return finish(externalDeclarationVisibility(
      facade,
      `export type ${name}${typeParameters} = ${attachPointerMethodSet(body, pointerMethods)};`,
    ));
  }
  if (representation !== "structural") {
    if (!declaration.alias && declaration.rhs.kind === "interface" && externalInterfaceCanUseDeclaration(declaration.rhs)) {
      return finish(externalDeclarationVisibility(facade, renderExternalInterfaceDeclaration(
        name,
        typeParameters,
        declaration,
        semanticContext,
        operations,
        context,
        pointerMethods,
        memberSelection,
      )));
    }
    const valueMethods = renderSelectedMethodSetSurface(
      declaration,
      directAuthoredMethodSetMode(facade),
      semanticContext,
      operations,
      context,
      memberSelection,
    );
    return finish(externalDeclarationVisibility(
      facade,
      `export type ${name}${typeParameters} = ${attachPointerMethodSet(attachMethodSet(renderExternalDeclarationBody(declaration, semanticContext, operations, memberSelection), valueMethods), pointerMethods)};`,
    ));
  }
  const members = [];
  for (const field of contractSurface.fields) {
    const variable = field.variable;
    members.push(`  ${safePropertyName(variable.name)}: ${renderExternalType(variable.type, semanticContext, semanticTypeContexts.value, operations)};`);
  }
  for (const method of contractSurface.methods) {
    const aliases = selectedMethodTypeParameterAliases(declaration, method);
    members.push(`  ${renderMethodSignature(method.name, method.signature, semanticContext, operations, aliases, true)};`);
  }
  if (pointerMethods !== undefined) members.push(renderPointerMethodSetMember(pointerMethods, "  "));
  return finish(externalDeclarationVisibility(facade, `export interface ${safeIdentifier(facade.tsName)}${typeParameters} {\n${members.join("\n")}\n}`));
}

function externalDeclarationVisibility(facade, declaration) {
  if (!declaration.startsWith("export ")) throw new Error(`external facade '${facade.objectId}' declaration has no explicit export boundary`);
  return declaration;
}

function renderInvariantExternalFacade(facade, sharedContext, config, snapshot, policies, facades, profile, evidence) {
  const outputs = new Map();
  for (const { declaration, profiles } of facade.variants) {
    for (const profileIndex of profiles) {
      const isolated = facadeRendererContext(config, snapshot, sharedContext.relativeTargetPath, policies, facades, profile, evidence);
      const body = renderExternalFacadePolicy(facade, declaration, profileIndex, isolated);
      const complete = `${renderImports(isolated)}${body}`;
      outputs.set(complete, { body, declaration, profileIndex });
    }
  }
  if (outputs.size !== 1) throw new Error(`external facade '${facade.objectId}' renders differently across active semantic profiles`);
  const selected = outputs.values().next().value;
  return renderExternalFacadePolicy(facade, selected.declaration, selected.profileIndex, sharedContext);
}

function renderExternalDeclarationBody(declaration, semanticContext, operations, memberSelection = undefined) {
  const body = declaration.rhs.kind === "struct"
    ? renderExternalStruct(declaration.rhs, semanticContext, operations, memberSelection)
    : declaration.rhs.kind === "interface"
      ? renderExternalInterface(declaration.rhs, semanticContext, operations, memberSelection)
      : renderExternalType(declaration.rhs, semanticContext, semanticTypeContexts.declarationShape, operations);
  if (declaration.alias || declaration.rhs.kind === "interface") return body;
  return renderExternalDefinedType(declaration, body, operations);
}

function renderExternalStruct(type, semanticContext, operations, memberSelection = undefined) {
  const members = [];
  let hidden = 0;
  for (const field of type.struct?.fields ?? []) {
    const variable = field.variable;
    if (!variable.exported) {
      members.push(`readonly ${unexportedFieldProperty(field, hidden++)}: never`);
      continue;
    }
    if (!memberIsSelected(memberSelection, "property", variable.name)) continue;
    const rendered = renderExternalType(variable.type, semanticContext, semanticTypeContexts.value, operations);
    members.push(`${safePropertyName(variable.name)}: ${rendered}`);
  }
  return members.length === 0 ? "{ readonly __tsgoEmpty?: never }" : `{ ${members.join("; ")} }`;
}

function renderExternalInterface(type, semanticContext, operations, memberSelection = undefined) {
  const members = [];
  let hidden = 0;
  for (const method of type.interface?.explicitMethods ?? []) {
    if (!method.exported) {
      members.push(`readonly ${unexportedMethodProperty(method, hidden++)}: never`);
      continue;
    }
    if (memberIsSelected(memberSelection, "method", method.name)) {
      members.push(renderMethodSignature(method.name, method.signature, semanticContext, operations));
    }
  }
  const parts = [];
  if (members.length > 0) parts.push(`{ ${members.join("; ")} }`);
  const embeddedTypes = type.interface?.embeddedTypes ?? [];
  const embeddedKinds = type.interface?.embeddedKinds ?? [];
  if (embeddedTypes.length !== embeddedKinds.length) throw new Error("external Go interface has inconsistent embedding evidence");
  for (const [index, embedded] of embeddedTypes.entries()) {
    const kind = embeddedKinds[index];
    if (kind !== "interface" && kind !== "typeSet") throw new Error(`external Go interface embedding has no exact classification '${kind}'`);
    parts.push(renderExternalType(embedded, semanticContext, kind === "interface" ? semanticTypeContexts.heritage : semanticTypeContexts.constraint, operations));
  }
  if (parts.length === 0) return type.interface?.comparable ? operations.compat("GoComparable") : "unknown";
  return parts.length === 1 ? parts[0] : parts.map((part) => `(${part})`).join(" & ");
}

function externalInterfaceCanUseDeclaration(type) {
  return type.interface?.methodSetOnly === true && (type.interface.embeddedKinds ?? []).every((kind) => kind === "interface");
}

function renderExternalInterfaceDeclaration(name, typeParameters, declaration, semanticContext, operations, context, pointerMethods, memberSelection = undefined) {
  const type = declaration.rhs;
  const heritage = (type.interface?.embeddedTypes ?? []).map((embedded) => renderExternalType(
    embedded,
    semanticContext,
    semanticTypeContexts.heritage,
    operations,
  ));
  const members = [];
  let hidden = 0;
  for (const method of materializeSemanticMethodSet(declaration, "value", context.semanticIndex.methodSetSignatures)) {
    if (!method.exported) {
      members.push(`  readonly ${unexportedMethodProperty(method, hidden++)}: never;`);
      continue;
    }
    if (!memberIsSelected(memberSelection, "method", method.name)) continue;
    const aliases = selectedMethodTypeParameterAliases(declaration, method);
    members.push(`  ${renderMethodSignature(method.name, method.signature, semanticContext, operations, aliases, true)};`);
  }
  if (pointerMethods !== undefined) members.push(renderPointerMethodSetMember(pointerMethods, "  "));
  if (members.length === 0) members.push("  readonly __tsgoEmpty?: never;");
  const extendsClause = heritage.length === 0 ? "" : ` extends ${heritage.join(", ")}`;
  return `export interface ${name}${typeParameters}${extendsClause} {\n${members.join("\n")}\n}`;
}

function renderMethodSignature(name, signature, semanticContext, operations, aliases = new Map(), exactAliasScope = false) {
  const lowered = lowerSemanticSignature(signature, semanticContext, { includeReceiver: false });
  const methodOperations = {
    ...operations,
    typeParameter: (reference) => selectedTypeParameterName(reference, aliases, name, exactAliasScope),
  };
  const typeParameters = renderCanonicalTypeParameters(
    lowered.typeParameters,
    typeParameterRenderingOperations(
      methodOperations,
      lowered.typeParameters,
      externalConstraintSources(signature.typeParameters, name),
      { id: `external-method:${name}` },
    ),
  );
  const rendered = renderCanonicalSignature(lowered, methodOperations);
  return `${safePropertyName(name)}${typeParameters}(${rendered.parameters.join(", ")}): ${rendered.returnType}`;
}

function renderMethodSetSurface(declaration, mode, semanticContext, operations, context) {
  const methods = materializeSemanticMethodSet(declaration, mode, context.semanticIndex.methodSetSignatures);
  return renderMethodListSurface(declaration, methods, mode, semanticContext, operations);
}

function renderMethodListSurface(declaration, methods, mode, semanticContext, operations) {
  if (methods.length === 0) return undefined;
  const members = [];
  let hidden = 0;
  for (const method of methods) {
    if (!method.exported) {
      members.push(`readonly ${unexportedMethodProperty(method, hidden++)}: never`);
      continue;
    }
    const aliases = selectedMethodTypeParameterAliases(declaration, method);
    members.push(renderMethodSignature(method.name, method.signature, semanticContext, operations, aliases, true));
    members.push(`readonly ${safePropertyName(externalMethodSelectionBrand(method, mode))}?: never`);
  }
  return `{ ${members.join("; ")} }`;
}

function renderSelectedMethodSetSurface(declaration, mode, semanticContext, operations, context, memberSelection) {
  const methods = materializeSemanticMethodSet(declaration, mode, context.semanticIndex.methodSetSignatures)
    .filter((method) => method.exported && memberSelection.has(`method\0${method.name}`));
  if (methods.length === 0) return undefined;
  const members = [];
  for (const method of methods) {
    const aliases = selectedMethodTypeParameterAliases(declaration, method);
    members.push(renderMethodSignature(method.name, method.signature, semanticContext, operations, aliases, true));
  }
  return `{ ${members.join("; ")} }`;
}

function renderPointerMethodSetSurface(declaration, semanticContext, operations, context) {
  const surface = renderMethodSetSurface(declaration, "pointer", semanticContext, operations, context);
  return surface === undefined ? undefined : `${operations.compat("GoPointerMethodSet")}<${surface}>`;
}

function renderPointerMethodSetMember(pointerMethods, indentation, classMember = false) {
  return `${indentation}${classMember ? "declare " : ""}readonly [${FACADE_POINTER_METHOD_SET_SYMBOL}]?: ${pointerMethods};`;
}

function attachPointerMethodSet(body, pointerMethods) {
  if (pointerMethods === undefined) return body;
  return `(${body}) & { readonly [${FACADE_POINTER_METHOD_SET_SYMBOL}]?: ${pointerMethods} }`;
}

function attachMethodSet(body, methods) {
  if (methods === undefined) return body;
  return `(${body}) & ${methods}`;
}

function unexportedFieldProperty(field, index) {
  const variable = field.variable;
  const identity = variable.name === "_" ? `${variable.packagePath}::_::${index}` : `${variable.packagePath}::${variable.name}`;
  return safePropertyName(`__goUnexportedField::${identity}::${hashText(canonicalSchemaValue(field))}`);
}

function unexportedMethodProperty(method, index) {
  const identity = method.name === "_" ? `${method.packagePath}::_::${index}` : `${method.packagePath}::${method.name}`;
  return safePropertyName(`__goUnexportedMethod::${identity}::${hashText(canonicalSchemaValue(method))}`);
}

function renderAuthoredClassContract(name, typeParameters, facade, declaration, semanticContext, operations, context, memberSelection) {
  const lines = [];
  for (const field of declaration.rhs.struct?.fields ?? []) {
    const variable = field.variable;
    if (!variable.exported || !memberSelection.has(`property\0${variable.name}`)) continue;
    const rendered = renderExternalType(variable.type, semanticContext, semanticTypeContexts.value, operations);
    lines.push(`  ${safePropertyName(variable.name)}!: ${rendered};`);
  }
  const methodMode = directAuthoredMethodSetMode(facade);
  for (const method of materializeSemanticMethodSet(declaration, methodMode, context.semanticIndex.methodSetSignatures)) {
    if (!method.exported || !memberSelection.has(`method\0${method.name}`)) continue;
    const aliases = selectedMethodTypeParameterAliases(declaration, method);
    const lowered = lowerSemanticSignature(method.signature, semanticContext, { includeReceiver: false });
    const methodOperations = {
      ...operations,
      typeParameter: (reference) => selectedTypeParameterName(reference, aliases, method.methodId, true),
    };
    const methodParameters = renderCanonicalTypeParameters(
      lowered.typeParameters,
      typeParameterRenderingOperations(
        methodOperations,
        lowered.typeParameters,
        externalConstraintSources(method.signature.typeParameters, method.methodId),
        { id: `external-method:${method.methodId}` },
      ),
    );
    const rendered = renderCanonicalSignature(lowered, methodOperations);
    lines.push(`  ${safePropertyName(method.name)}${methodParameters}(${rendered.parameters.join(", ")}): ${rendered.returnType};`);
  }
  return `export class ${name}${typeParameters} {\n${lines.join("\n")}\n}`;
}
