import {
  canonicalTypeScriptConstantValue,
  constantEvaluationIssue,
  evaluateTypeScriptConstant,
} from "./constant-evaluation.mjs";

export function parameterInitializerDescriptor(api, initializer, environment) {
  const evaluation = evaluateTypeScriptConstant(api, initializer, environment);
  if (initializer !== undefined && evaluation.status === "unsupported") {
    return {
      initializerStatus: "runtime",
      initializer: undefined,
      initializerIssue: undefined,
    };
  }
  return {
    initializerStatus: evaluation.status,
    initializer: canonicalTypeScriptConstantValue(evaluation),
    initializerIssue: evaluation.status === "unsupported" ? constantEvaluationIssue(evaluation) : undefined,
  };
}
