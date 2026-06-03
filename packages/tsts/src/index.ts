export * from "./api/binary-ast/index.js";
export * from "./ast/index.js";
export * from "./binder/index.js";
export * from "./checker/index.js";
export * from "./compiler/index.js";
export * from "./config/index.js";
export * from "./emit-js/index.js";
export * from "./extensions/index.js";
export * from "./parser/index.js";
export * from "./program/index.js";
export * from "./scanner/index.js";

// `skipTrivia`, `getECMALineOfPosition`, and `getECMALineAndUTF16CharacterOfPosition`
// are re-exported by both `./ast/index.js` (AstNode-adapted shims that delegate
// here) and `./scanner/index.js` (the canonical, faithful scanner.go ports). The
// scanner is the canonical owner, so disambiguate the package root in its favor.
export {
  skipTrivia,
  getECMALineOfPosition,
  getECMALineAndUTF16CharacterOfPosition,
} from "./scanner/index.js";

// `TokenFlags` is exported as a bare `type` alias by `./ast/index.js`
// (generated) and as a runtime const-map + type by `./scanner/tokenFlags.js`
// (the faithful tokenflags.go port). The scanner owns the canonical values, so
// disambiguate the package root in its favor.
export { TokenFlags } from "./scanner/index.js";

// `Program`, `CompilerHost`, and `EmitResult` are exported by BOTH the canonical
// compiler pipeline (`./compiler/index.js` -> compiler/program.ts) and the
// throwaway `./program/index.js` scaffold. The standalone compiler product is
// built on the canonical pipeline, so disambiguate the package root in its
// favor with explicit named re-exports (which take precedence over the colliding
// `export *` stars). The scaffold's own names remain reachable via its module
// path (`./program/index.js`) for the internal call sites still using it.
export {
  newProgram,
  Program,
  type ProgramOptions,
  type CompilerHost,
  type EmitOptions,
  type EmitResult,
  type SourceMapEmitResult,
  type WriteFile,
  type WriteFileData,
  newNodeCompilerHost,
  newNodeParseConfigHost,
} from "./compiler/index.js";

// The stable standalone-compiler API. `CompileOptions`/`CompileResult` here
// are the canonical product surface; the throwaway scaffold's colliding names
// are no longer star-exported from `./compiler/index.js`, so this is the only
// `CompileOptions`/`CompileResult` reachable from the package root.
export {
  compileProject,
  type CompileOptions,
  type CompileResult,
} from "./compiler/index.js";
