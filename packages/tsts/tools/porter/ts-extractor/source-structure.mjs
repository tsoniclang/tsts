// Exact source-level import, declaration, export, and module identity model.

export {
  buildLocalTypeNames,
  identText,
  isExported,
  keywordOf,
  sliceText,
  variableNames,
} from "./source-structure/declarations.mjs";
export {
  assertSourceModuleId,
  buildImportMap,
  resolveModuleId,
} from "./source-structure/modules.mjs";
export {
  extractModuleStructure,
  extractReexports,
  extractTypeDecls,
} from "./source-structure/exports.mjs";
