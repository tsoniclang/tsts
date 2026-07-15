import { renderCanonicalType, renderCanonicalTypeParameters } from "../canonical-type-renderer.mjs";
import { compareText } from "../deterministic-order.mjs";
import { safeIdentifier, safePropertyName } from "../names.mjs";
import { canonicalStructFieldLayout } from "../struct-field-layout.mjs";
import {
  createSemanticRendererContext,
  importTypeName,
  importValueName,
  renderImports,
  semanticRendererOperations,
  typeParameterRenderingOperations,
  useCompat,
} from "../type-renderer.mjs";
import { semanticTypeContexts } from "../semantic-type-nilability.mjs";
import {
  invariantSemanticDeclarationContext,
  invariantSemanticDeclaredValueContract,
  invariantSemanticTypeContract,
} from "../../ts-extractor/semantic-carrier-rendering.mjs";
import { semanticTypeParameterKey } from "../../ts-extractor/semantic-type-contract.mjs";
import { requireDirectProviderIdentity } from "./provider-identity.mjs";
import { requireGoValueOperationPlan } from "./operation-plan.mjs";
import {
  requireArrayValueOperationRule,
  requireBasicValueOperationRule,
  requireCarrierValueOperationRule,
  requireNamedIntrinsicValueOperationRule,
  requirePointerValueOperationRule,
} from "./runtime-operation-rules.mjs";

const inputKeys = Object.freeze(["config", "externalFacadeCatalog", "generatedDeclarationOwners", "largeFileSplits", "plan", "snapshot"]);

export function renderGoValueOperationArtifacts(input) {
  requireExactInput(input, inputKeys, "Go value-operation artifact input");
  const { config, externalFacadeCatalog, generatedDeclarationOwners, largeFileSplits, plan, snapshot } = input;
  requireGoValueOperationPlan(plan, config, snapshot);
  const groups = new Map();
  for (const entry of plan.generated(config, snapshot)) {
    const identity = operationIdentity(entry, config);
    const group = groups.get(identity.moduleId) ?? [];
    group.push({ entry, identity });
    groups.set(identity.moduleId, group);
  }
  const artifacts = new Map();
  for (const [moduleId, group] of [...groups].sort(([left], [right]) => compareText(left, right))) {
    const context = createSemanticRendererContext(
      config,
      snapshot,
      moduleId,
      group.map(({ entry }) => entry.sourceUnit),
      {
        externalFacadeCatalog,
        generatedDeclarationOwners,
        largeFileSplits,
        localTopLevelNames: new Set(group.map(({ identity }) => identity.exportName)),
      },
    );
    const environment = { config, context, plan, snapshot };
    const declarations = group.map(({ entry, identity }) => renderOperationDeclaration(entry, identity, environment));
    artifacts.set(moduleId, `${renderImports(context)}${declarations.join("\n\n")}\n`);
  }
  return artifacts;
}

function renderOperationDeclaration(entry, identity, environment) {
  const declaration = entry.semanticDeclaration;
  const unit = entry.sourceUnit;
  if (declaration?.object?.id !== entry.objectId || unit?.id !== entry.unitId) {
    throw new Error(`generated Go value operation '${entry.objectId}' lost its exact declaration ownership`);
  }
  const declarationContext = invariantSemanticDeclarationContext(declaration, environment.context, unit);
  const parameters = declarationContext.parameters;
  if (parameters.length !== entry.typeParameterCount || entry.typeParameters.length !== parameters.length) {
    throw new Error(`generated Go value operation '${entry.objectId}' has inconsistent type-parameter arity`);
  }
  const operations = semanticRendererOperations(environment.context, unit);
  const typeParameters = renderCanonicalTypeParameters(
    parameters,
    typeParameterRenderingOperations(operations, parameters, unit.typeParameterDetails, unit),
  );
  const targetContract = invariantSemanticDeclaredValueContract(declaration, environment.context, unit);
  const targetType = targetContract.kind === "carrier" && targetContract.carrier === "interface"
    ? renderCanonicalType(targetContract, operations)
    : renderStorageTargetType(entry, parameters, operations, environment);
  const goValueOps = useCompat(environment.context, "GoValueOps");
  const operationParameters = new Map();
  const parameterText = entry.operationTypeParameterIndexes.map((parameterIndex, position) => {
    const parameter = parameters[parameterIndex];
    if (parameter === undefined) throw new Error(`generated Go value operation '${entry.objectId}' has invalid operation parameter index ${parameterIndex}`);
    const localName = `valueOps${position}`;
    operationParameters.set(semanticTypeParameterKey(parameter.reference), localName);
    return `${localName}: ${goValueOps}<${renderCanonicalType({ kind: "typeParameter", reference: parameter.reference }, operations)}>`;
  });
  const rhs = invariantSemanticTypeContract(
    declaration.rhs,
    environment.context,
    unit,
    semanticTypeContexts.value,
    { typeParameterConstraints: new Map(declarationContext.typeParameterConstraints) },
  );
  const expression = renderValueOperations(rhs, {
    ...environment,
    entry,
    operationParameters,
    operations,
    unit,
  }, targetType, entry.storageAudit.fieldMappings);
  const resultType = `${goValueOps}<${targetType}>`;
  if (parameters.length === 0) {
    if (parameterText.length !== 0) throw new Error(`non-generic Go value operation '${entry.objectId}' unexpectedly requires operation parameters`);
    return `export const ${identity.exportName}: ${resultType} = ${expression};`;
  }
  return `export function ${identity.exportName}${typeParameters}(${parameterText.join(", ")}): ${resultType} {\n  return ${indentContinuation(expression, 2)};\n}`;
}

function renderStorageTargetType(entry, parameters, operations, environment) {
  const identity = requireDirectProviderIdentity(
    entry.storageIdentity,
    environment.config.tsRoot,
    `Go value operation '${entry.objectId}'`,
    "storage",
  );
  const name = importTypeName(environment.context, identity.moduleId, identity.exportName, environment.unit);
  const argumentsText = parameters.map((parameter) => renderCanonicalType(
    { kind: "typeParameter", reference: parameter.reference },
    operations,
  ));
  return `${name}${argumentsText.length === 0 ? "" : `<${argumentsText.join(", ")}>`}`;
}

function renderValueOperations(contract, environment, targetType = undefined, directFieldMappings = undefined) {
  const renderedTarget = targetType ?? renderCanonicalType(contract, environment.operations);
  switch (contract.kind) {
    case "basic":
      return intrinsicBasicOperations(contract.name, environment);
    case "reference":
      return namedOperations(contract, environment);
    case "typeParameter": {
      const operation = environment.operationParameters.get(semanticTypeParameterKey(contract.reference));
      if (operation === undefined) throw new Error(`Go value operation uses unbound operation-bearing type parameter '${contract.reference.name}'`);
      return operation;
    }
    case "pointer": {
      const rule = requirePointerValueOperationRule(contract.representation);
      return `${runtimeValue(environment, rule.operationExport)}<${renderCanonicalType(contract.element, environment.operations)}>()`;
    }
    case "carrier":
      return carrierOperations(contract, environment);
    case "array": {
      const elementType = renderCanonicalType(contract.element, environment.operations);
      const rule = requireArrayValueOperationRule(contract.length);
      if (contract.length === "0") return `${runtimeValue(environment, rule.operationExport)}<${elementType}>()`;
      const elementOperations = renderValueOperations(contract.element, environment);
      return `${runtimeValue(environment, rule.operationExport)}<${elementType}, ${JSON.stringify(contract.length)}>(${contract.length}, ${elementOperations})`;
    }
    case "struct":
      return structOperations(contract, renderedTarget, environment, directFieldMappings);
    default:
      throw new Error(`Go value operation cannot materialize canonical ${contract.kind} value semantics`);
  }
}

function carrierOperations(contract, environment) {
  if ((contract.carrier === "interface" || contract.carrier === "nilable") && contract.arguments.length === 1 && contract.arguments[0]?.kind === "reference") {
    return namedOperations(contract.arguments[0], environment);
  }
  const argumentsText = contract.arguments.map((argument) => renderCanonicalType(argument, environment.operations));
  for (const metadata of contract.metadataArguments) {
    if (metadata?.kind !== "string" || typeof metadata.value !== "string") throw new Error(`Go ${contract.carrier} value operation has invalid metadata`);
    argumentsText.push(JSON.stringify(metadata.value));
  }
  const rule = requireCarrierValueOperationRule(contract.carrier);
  return `${runtimeValue(environment, rule.operationExport)}${argumentsText.length === 0 ? "" : `<${argumentsText.join(", ")}>`}()`;
}

function namedOperations(contract, environment) {
  const objectId = contract.reference?.objectId;
  const provider = environment.plan.get(objectId);
  if (provider === undefined) throw new Error(`Go value operation for named type '${objectId ?? "missing"}' has no finalized provider`);
  if (provider.disposition === "intrinsic") {
    const target = renderCanonicalType(contract, environment.operations);
    const rule = requireNamedIntrinsicValueOperationRule(provider.intrinsicCarrier);
    if (rule.invocation === "target-generic-factory") {
      return `${runtimeValue(environment, rule.operationExport)}<${target}>()`;
    }
    const zero = rule.zeroExport === null ? "undefined" : `${runtimeValue(environment, rule.zeroExport)}()`;
    return `${runtimeValue(environment, rule.operationExport)}<${target}>(() => ${zero})`;
  }
  if (contract.typeArguments.length !== provider.typeParameterCount) {
    throw new Error(`Go value-operation provider '${objectId}' expected ${provider.typeParameterCount} type arguments, got ${contract.typeArguments.length}`);
  }
  const identity = operationIdentity(provider, environment.config);
  const operation = importValueName(environment.context, identity.moduleId, identity.exportName, environment.unit);
  if (provider.typeParameterCount === 0) {
    if (provider.operationTypeParameterIndexes.length !== 0) throw new Error(`non-generic Go value-operation provider '${objectId}' requires operation parameters`);
    return operation;
  }
  const typeArguments = contract.typeArguments.map((argument) => renderCanonicalType(argument, environment.operations));
  const operationArguments = provider.operationTypeParameterIndexes.map((index) => {
    const argument = contract.typeArguments[index];
    if (argument === undefined) throw new Error(`Go value-operation provider '${objectId}' has invalid operation parameter index ${index}`);
    return renderValueOperations(argument, environment);
  });
  return `${operation}<${typeArguments.join(", ")}>(${operationArguments.join(", ")})`;
}

function structOperations(contract, targetType, environment, directFieldMappings) {
  const canonical = canonicalStructFieldLayout(contract.fields, "canonical Go value-operation struct fields");
  const fields = directFieldMappings === undefined
    ? canonical
    : directStructFieldLayout(canonical, directFieldMappings, environment.entry);
  if (fields.length === 0) {
    return `Object.freeze({\n  zero: (): ${targetType} => ({}),\n  copy: (_value: ${targetType}): ${targetType} => ({}),\n})`;
  }
  const setup = [];
  const zeroFields = [];
  const copyFields = [];
  for (const [index, layout] of fields.entries()) {
    const operationName = `fieldOps${index}`;
    setup.push(`const ${operationName} = ${renderValueOperations(layout.field.type, environment)};`);
    const property = safePropertyName(layout.name);
    zeroFields.push(`${property}: ${operationName}.zero()`);
    const copied = layout.blank ? `${operationName}.zero()` : `${operationName}.copy(${propertyAccess("value", layout.name)})`;
    copyFields.push(`${property}: ${copied}`);
  }
  return `((): ${useCompat(environment.context, "GoValueOps")}<${targetType}> => {\n${indentLines(setup, 2)}\n  return Object.freeze({\n    zero: (): ${targetType} => ({ ${zeroFields.join(", ")} }),\n    copy: (value: ${targetType}): ${targetType} => ({ ${copyFields.join(", ")} }),\n  });\n})()`;
}

function directStructFieldLayout(canonical, mappings, entry) {
  if (!Array.isArray(mappings) || mappings.length !== canonical.length) {
    throw new Error(`generated Go value operation '${entry.objectId}' has incomplete audited field mappings`);
  }
  const semanticFields = entry.semanticDeclaration.rhs.struct?.fields;
  if (!Array.isArray(semanticFields) || semanticFields.length !== canonical.length) {
    throw new Error(`generated Go value operation '${entry.objectId}' has inconsistent semantic struct fields`);
  }
  return canonical.map((layout, index) => {
    const mapping = mappings[index];
    const variable = semanticFields[index]?.variable;
    if (mapping.goFieldIndex !== index || mapping.tsMemberIndex !== index || mapping.goFieldId !== variable?.id ||
        mapping.goFieldName !== variable?.name || mapping.blank !== layout.blank) {
      throw new Error(`generated Go value operation '${entry.objectId}' field #${index} drifted from its audited storage mapping`);
    }
    return { ...layout, name: mapping.tsMemberName };
  });
}

function intrinsicBasicOperations(name, environment) {
  const rule = requireBasicValueOperationRule(name);
  const operation = runtimeValue(environment, rule.operationExport);
  return rule.invocation === "factory" ? `${operation}()` : operation;
}

function runtimeValue(environment, name) {
  return importValueName(
    environment.context,
    `${environment.config.tsRoot.replace(/\/+$/, "")}/go/compat.ts`,
    name,
    environment.unit,
  );
}

function operationIdentity(entry, config) {
  return requireDirectProviderIdentity(entry.operationIdentity, config.tsRoot, `Go value operation '${entry.objectId}'`, "operation");
}

function propertyAccess(receiver, name) {
  const property = safePropertyName(name);
  return property === safeIdentifier(name) ? `${receiver}.${property}` : `${receiver}[${property}]`;
}

function indentContinuation(value, spaces) {
  const indentation = " ".repeat(spaces);
  return value.replaceAll("\n", `\n${indentation}`);
}

function indentLines(lines, spaces) {
  const indentation = " ".repeat(spaces);
  return lines.map((line) => `${indentation}${line}`).join("\n");
}

function requireExactInput(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareText);
  const expected = [...expectedKeys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
}
