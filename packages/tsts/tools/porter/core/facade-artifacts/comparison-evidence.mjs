import { semanticTypeContexts } from "../semantic-type-nilability.mjs";
import { lowerSemanticSignature, lowerSemanticType } from "../../ts-extractor/semantic-type-contract.mjs";

export function buildExternalFacadeComparisonEvidence(
  facade,
  declaration,
  semanticContext,
  _rendererContext,
  contractSurface,
) {
  if (contractSurface?.authoredSurface?.objectId !== facade.objectId) {
    throw new Error("authored facade comparison evidence requires one exact contract surface");
  }
  const representation = facade.runtimeAdaptation?.representation;
  if (representation === "scalar") {
    return { kind: "alias" };
  }
  if (contractSurface.fullRhs) {
    return {
      kind: "alias",
      type: lowerSemanticType(declaration.rhs, semanticContext, semanticTypeContexts.declarationShape),
    };
  }
  const members = [];
  for (const field of contractSurface.fields) {
    const variable = field.variable;
    members.push({
      contract: lowerSemanticType(variable.type, semanticContext, semanticTypeContexts.value),
      key: memberKey("property", variable.name),
      orderProvenance: "source",
    });
  }
  for (const method of contractSurface.methods) {
    members.push({
      contract: { kind: "function", signature: lowerSemanticSignature(method.signature, semanticContext) },
      key: memberKey("method", method.name),
      orderProvenance: "canonical",
    });
  }
  const heritage = contractSurface.heritage.map((type) =>
    lowerSemanticType(type, semanticContext, semanticTypeContexts.heritage));
  const pointerMethods = contractSurface.pointerMethods
    .filter((method) => method.exported)
    .map((method) => ({
        key: memberKey("method", method.name),
        signature: lowerSemanticSignature(method.signature, semanticContext),
      }));
  return {
    kind: representation === "class" ? "class" : declaration.rhs.kind === "interface" ? "interface" : "structural",
    heritage,
    members,
    pointerMethods,
  };
}

function memberKey(kind, name) {
  return `${kind}\0${name}`;
}
