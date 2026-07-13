import { renderCanonicalType } from "../canonical-type-renderer.mjs";
import { safeIdentifier, safePropertyName } from "../names.mjs";
import { hashText } from "../runtime.mjs";
import { canonicalSchemaValue } from "../semantic-variants.mjs";
import {
  lowerSemanticType,
  semanticTypeParameterKey,
} from "../../ts-extractor/semantic-type-contract.mjs";

export function externalDefinedTypeIdentity(declaration) {
  if (declaration.alias) throw new Error(`Go alias '${declaration.object?.id ?? "<unknown>"}' cannot carry defined-type identity`);
  return `__goDefinedType::${declaration.object.id}::${hashText(canonicalSchemaValue(declaration))}`;
}

export function renderExternalDefinedType(declaration, body, operations) {
  return `${operations.compat("GoDefined")}<${body}, ${JSON.stringify(externalDefinedTypeIdentity(declaration))}>`;
}

export function externalConstraintSources(parameters, ownerId) {
  return (parameters ?? []).map((parameter, index) => {
    if (typeof parameter?.constraintSyntax !== "string" || parameter.constraintSyntax === "") {
      throw new Error(`external Go declaration '${ownerId}' type parameter #${index} has no exact constraint syntax`);
    }
    return { name: parameter.reference?.name, constraint: { text: parameter.constraintSyntax } };
  });
}

export function externalMethodSelectionBrand(method, mode) {
  return `__goMethodSelection::${method.methodId}::${method.signatureId}::${mode}`;
}

export function selectedMethodTypeParameterAliases(declaration, method) {
  const receiverParameters = method.signature?.receiverTypeParameters;
  if (!Array.isArray(receiverParameters)) throw new Error(`selected Go method '${method.methodId}' has no exact receiver type-parameter list`);
  const aliases = new Map();
  const declarationAliases = new Map();
  for (const parameter of declaration.typeParameters) {
    const key = semanticTypeParameterKey(parameter.reference);
    const alias = safeIdentifier(parameter.reference.name);
    declarationAliases.set(key, alias);
    aliases.set(key, alias);
  }
  for (const parameter of method.signature.typeParameters) {
    aliases.set(semanticTypeParameterKey(parameter.reference), safeIdentifier(parameter.reference.name));
  }
  for (const [index, parameter] of receiverParameters.entries()) {
    const source = parameter.constraintSource;
    if (source === undefined) throw new Error(`selected Go method '${method.methodId}' receiver parameter #${index} has no exact declared type-parameter source`);
    const alias = declarationAliases.get(semanticTypeParameterKey(source));
    if (alias === undefined) {
      throw new Error(`selected Go method '${method.methodId}' receiver parameter #${index} is not sourced from '${declaration.object.id}'`);
    }
    aliases.set(semanticTypeParameterKey(parameter.reference), alias);
  }
  return aliases;
}

export function selectedTypeParameterName(reference, aliases, methodId, exactAliasScope) {
  const alias = aliases.get(semanticTypeParameterKey(reference));
  if (alias !== undefined) return alias;
  if (exactAliasScope) throw new Error(`selected Go method '${methodId}' references an unbound normalized type parameter`);
  return safeIdentifier(reference.name);
}

export function renderExternalType(type, semanticContext, typeContext, operations) {
  return renderCanonicalType(lowerSemanticType(type, semanticContext, typeContext), operations);
}
