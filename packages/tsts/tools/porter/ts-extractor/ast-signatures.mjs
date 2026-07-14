// Shared TS-side signature machinery for the porter signature checker.
//
// Parses TypeScript with the exact pinned TS-Go parser, and turns a
// declaration's types into a CANONICAL STRUCTURED DESCRIPTOR — never raw text —
// so that equivalent spellings collapse:
//   - Array<T> ≡ T[]
//   - a method `m(p: P): R` ≡ a function-valued property `m: (p: P) => R`
//   - terminal type refs resolve THROUGH IMPORTS to (module, exportedName)
//     identity, so `compat.GoPtr` ≡ a bare imported `GoPtr` but `core.Node`
//     ≠ `ast.Node`.
//
// Both the actual (.ts file) side and the expected (Go-rendered) side run through
// these same functions, so the comparison is apples-to-apples.

export { loadParser, parseSource } from "./parser-runtime.mjs";
export {
  sliceText, identText, isExported, keywordOf,
  buildImportMap, buildLocalTypeNames, resolveModuleId,
  extractReexports, extractTypeDecls,
} from "./source-structure.mjs";
export {
  canonicalizeType, canonicalKey, typesEqual, hasUnresolved,
  isSoftId, typeDescriptorChildren, descriptorShapeIssue,
} from "./type-descriptors.mjs";
export { declarationDescriptor } from "./declaration-descriptors.mjs";
export {
  evaluateTypeScriptConstant, canonicalTypeScriptConstantValue,
} from "./constant-evaluation.mjs";
