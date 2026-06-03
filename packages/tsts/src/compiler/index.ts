// The scaffold's source-text compiler. Its `CompileOptions`/`CompileResult`
// names collide with the canonical standalone API below, so re-export
// `compileSource` by name (NOT a star) to keep the canonical
// `CompileOptions`/`CompileResult` authoritative at this barrel.
export { compileSource } from "./compile.js";

// The canonical compiler pipeline. `newProgram`/`Program`/`EmitResult` and the
// `CompilerHost` contract live here (compiler/program.ts), distinct from the
// throwaway `program/` scaffold. These are the product-facing surface.
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
} from "./program.js";

// Real-disk host adapters over the OS filesystem for the canonical pipeline.
export { newNodeCompilerHost, newNodeParseConfigHost } from "./nodeCompilerHost.js";

// The stable standalone-compiler API over the canonical pipeline. These
// `CompileOptions`/`CompileResult` are the authoritative package surface.
export { compileProject, type CompileOptions, type CompileResult } from "./compileProject.js";
