import {
  TextRange,
  newTextRange,
  type TextPos,
} from "../core/index.js";
import { fileNameToDocumentURI } from "./lsconv/index.js";
import type { Location, Range } from "../lsp/lsproto/index.js";
import {
  getDeclarationEmitOutputFilePath,
  type CompilerOptionsSubset,
  type OutputPathsHost,
} from "../outputpaths/index.js";
import {
  type DocumentPosition,
} from "../sourcemap/index.js";
import { isDeclarationFileName, type Path } from "../tspath/index.js";

export class Script {
  readonly fileName: string;
  readonly text: string;

  constructor(fileName: string, text: string) {
    this.fileName = fileName;
    this.text = text;
  }

  fileNameValue(): string {
    return this.fileName;
  }

  textValue(): string {
    return this.text;
  }
}

export interface SourceMapReadResult {
  readonly contents: string;
  readonly ok: boolean;
}

export interface SourceMapHost {
  readFile(fileName: string): SourceMapReadResult;
}

export interface SourceMapProgram extends OutputPathsHost {
  getSourceFile(fileName: string): unknown | undefined;
  isSourceFromProjectReference(path: Path | string): boolean;
  options(): CompilerOptionsSubset;
}

export interface DocumentPositionMapperLike {
  getSourcePosition(loc: DocumentPosition): DocumentPosition | undefined;
  getGeneratedPosition(loc: DocumentPosition): DocumentPosition | undefined;
}

export interface SourceMapLanguageService {
  readonly host: SourceMapHost;
  readFile(fileName: string): SourceMapReadResult;
  getDocumentPositionMapper(fileName: string): DocumentPositionMapperLike;
  getProgram(): SourceMapProgram | undefined;
  toPath(fileName: string): Path | string;
  createLspRangeFromRange(textRange: TextRange, script: Script | undefined): Range;
}

export function getMappedLocation(
  service: SourceMapLanguageService,
  fileName: string,
  fileRange: TextRange,
): Location {
  const startPos = tryGetSourcePosition(service, fileName, fileRange.pos);
  if (startPos === undefined) {
    const lspRange = service.createLspRangeFromRange(fileRange, getScript(service, fileName));
    return {
      uri: fileNameToDocumentURI(fileName),
      range: lspRange,
    };
  }

  let endPos = tryGetSourcePosition(service, fileName, fileRange.end);
  if (endPos === undefined || endPos.fileName !== startPos.fileName || endPos.pos < startPos.pos) {
    endPos = {
      fileName: startPos.fileName,
      pos: startPos.pos + fileRange.len(),
    };
  }

  const newRange = newTextRange(startPos.pos, endPos.pos);
  const lspRange = service.createLspRangeFromRange(newRange, getScript(service, startPos.fileName));
  return {
    uri: fileNameToDocumentURI(startPos.fileName),
    range: lspRange,
  };
}

export function getScript(service: SourceMapLanguageService, fileName: string): Script | undefined {
  const result = service.host.readFile(fileName);
  if (!result.ok) {
    return undefined;
  }
  return new Script(fileName, result.contents);
}

export function tryGetSourcePosition(
  service: SourceMapLanguageService,
  fileName: string,
  position: TextPos,
): DocumentPosition | undefined {
  const newPos = tryGetSourcePositionWorker(service, fileName, position);
  if (newPos !== undefined) {
    const result = service.readFile(newPos.fileName);
    if (!result.ok) {
      return undefined;
    }
  }
  return newPos;
}

export function tryGetSourcePositionWorker(
  service: SourceMapLanguageService,
  fileName: string,
  position: TextPos,
): DocumentPosition | undefined {
  if (!isDeclarationFileName(fileName)) {
    return undefined;
  }

  const positionMapper = service.getDocumentPositionMapper(fileName);
  const documentPos = positionMapper.getSourcePosition({ fileName, pos: position });
  if (documentPos === undefined) {
    return undefined;
  }
  const newPos = tryGetSourcePositionWorker(service, documentPos.fileName, documentPos.pos);
  if (newPos !== undefined) {
    return newPos;
  }
  return documentPos;
}

export function tryGetGeneratedPosition(
  service: SourceMapLanguageService,
  fileName: string,
  position: TextPos,
): DocumentPosition | undefined {
  const newPos = tryGetGeneratedPositionWorker(service, fileName, position);
  if (newPos !== undefined) {
    const result = service.readFile(newPos.fileName);
    if (!result.ok) {
      return undefined;
    }
  }
  return newPos;
}

export function tryGetGeneratedPositionWorker(
  service: SourceMapLanguageService,
  fileName: string,
  position: TextPos,
): DocumentPosition | undefined {
  if (isDeclarationFileName(fileName)) {
    return undefined;
  }

  const program = service.getProgram();
  if (program === undefined || program.getSourceFile(fileName) === undefined) {
    return undefined;
  }

  const path = service.toPath(fileName);
  if (program.isSourceFromProjectReference(path)) {
    return undefined;
  }

  const declarationFileName = getDeclarationEmitOutputFilePath(fileName, program.options(), program);
  const positionMapper = service.getDocumentPositionMapper(declarationFileName);
  const documentPos = positionMapper.getGeneratedPosition({ fileName, pos: position });
  if (documentPos === undefined) {
    return undefined;
  }
  const newPos = tryGetGeneratedPositionWorker(service, documentPos.fileName, documentPos.pos);
  if (newPos !== undefined) {
    return newPos;
  }
  return documentPos;
}
