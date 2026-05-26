export {
  type BoundSymbol,
  type BindDiagnostic,
  type BindResult,
  bindSourceFile,
  lookupSymbol,
  getSymbol,
  assertBoundSourceFile,
} from "./binder.js";
export type { SymbolTable as BinderSymbolTable } from "./binder.js";
export * from "./nameresolver.js";
export * from "./referenceresolver.js";
