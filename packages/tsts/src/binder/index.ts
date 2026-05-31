export {
  type BindDiagnostic,
  bindSourceFile,
  lookupSymbol,
  getSymbol,
  assertBoundSourceFile,
} from "./binder.js";
export * from "./nameresolver.js";
export * from "./referenceresolver.js";
export * from "./flow.js";
export * from "./strictmode.js";
export * as commonjs from "./commonjs.js";
export * as container from "./container.js";
export * as labels from "./labels.js";
export * as scope from "./scope.js";
