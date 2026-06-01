export {
  type BindDiagnostic,
  bindSourceFile,
  lookupSymbol,
  getSymbol,
  assertBoundSourceFile,
} from "./binder.js";
export * from "./nameResolver.js";
export * from "./referenceResolver.js";
export * from "./flow.js";
export * from "./strictMode.js";
export * as commonjs from "./commonJs.js";
export * as container from "./container.js";
export * as labels from "./labels.js";
export * as scope from "./scope.js";
