import { canonicalSchemaValue, invariantSemanticVariant } from "../core/semantic-variants.mjs";
import { semanticTypeContexts } from "../core/semantic-type-nilability.mjs";
import {
  lowerSemanticSignature,
  lowerSemanticType,
  lowerSemanticTypeParameters,
  semanticContextWithTypeParameters,
} from "./semantic-type-contract.mjs";

export function invariantSemanticTypeContract(type, context, unit, typeContext = semanticTypeContexts.value, options = {}) {
  requireOnlyOptions(options, new Set(["typeParameterConstraints"]), "semantic type lowering");
  return invariantAcrossProfiles(unit, `lowering a ${typeContext} semantic type`, (profile) => lowerSemanticType(type, {
    index: semanticIndex(context),
    profile,
    typeParameterConstraints: options.typeParameterConstraints,
  }, typeContext));
}

export function invariantSemanticSignatureContract(signature, context, unit, options = {}) {
  return invariantAcrossProfiles(unit, "lowering a callable semantic signature", (profile) => lowerSemanticSignature(signature, {
    index: semanticIndex(context),
    profile,
    typeParameterConstraints: options.typeParameterConstraints,
  }, { includeReceiver: options.includeReceiver === true }));
}

export function invariantSemanticDeclarationContext(declaration, context, unit) {
  return invariantAcrossProfiles(unit, "lowering a semantic type declaration", (profile) => {
    const scoped = semanticContextWithTypeParameters({ index: semanticIndex(context), profile }, declaration.typeParameters ?? []);
    return {
      parameters: lowerSemanticTypeParameters(declaration.typeParameters ?? [], scoped),
      typeParameterConstraints: [...scoped.typeParameterConstraints.entries()],
    };
  });
}

export function semanticProfilesForUnit(unit, action = "lowered from canonical Go semantics") {
  const profiles = invariantSemanticVariant(unit, action).profiles;
  if (!Array.isArray(profiles) || profiles.length === 0) throw new Error(`${action} has no semantic profile for ${unit.id}`);
  return profiles;
}

function invariantAcrossProfiles(unit, action, produce) {
  const values = semanticProfilesForUnit(unit, action).map(produce);
  const canonical = new Map(values.map((value) => [canonicalSchemaValue(value), value]));
  if (canonical.size !== 1) throw new Error(`${action} for '${unit.id}' changes across semantic profiles`);
  return canonical.values().next().value;
}

function semanticIndex(context) {
  return context.semanticIndex ?? context;
}

function requireOnlyOptions(options, allowed, label) {
  if (options === null || typeof options !== "object" || Array.isArray(options)) throw new Error(`${label} options must be an object`);
  const unknown = Object.keys(options).filter((key) => !allowed.has(key));
  if (unknown.length !== 0) throw new Error(`${label} received unsupported option(s): ${unknown.sort().join(", ")}`);
}
