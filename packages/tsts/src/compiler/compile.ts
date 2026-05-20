import { encodeSourceFile } from "../api/binary-ast/index.js";
import { type SourceFile } from "../ast/index.js";
import { printSourceFile } from "../emit-js/index.js";
import { parseSourceFile } from "../parser/index.js";

export interface CompileOptions {
  readonly fileName?: string;
}

export interface CompileResult {
  readonly sourceFile: SourceFile;
  readonly javascript: string;
  readonly binaryAst: Uint8Array;
}

export function compileSource(sourceText: string, options: CompileOptions = {}): CompileResult {
  const sourceFile = parseSourceFile(sourceText, options.fileName === undefined ? {} : { fileName: options.fileName });
  return {
    sourceFile,
    javascript: printSourceFile(sourceFile),
    binaryAst: encodeSourceFile(sourceFile),
  };
}
