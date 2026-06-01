import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TextRange } from "../core/index.js";
import { fileNameToDocumentURI } from "./lsconv/index.js";
import type { Range } from "../lsp/lsproto/index.js";
import {
  getMappedLocation,
  getScript,
  tryGetGeneratedPosition,
  tryGetSourcePosition,
  type DocumentPositionMapperLike,
  type SourceMapLanguageService,
  type SourceMapProgram,
  type SourceMapReadResult,
} from "./sourceMap.js";

class Mapper implements DocumentPositionMapperLike {
  readonly sourcePositions = new Map<string, readonly [string, number]>();
  readonly generatedPositions = new Map<string, readonly [string, number]>();

  getSourcePosition(loc: { readonly fileName: string; readonly pos: number }): { readonly fileName: string; readonly pos: number } | undefined {
    const mapped = this.sourcePositions.get(`${loc.fileName}:${loc.pos}`);
    return mapped === undefined ? undefined : { fileName: mapped[0], pos: mapped[1] };
  }

  getGeneratedPosition(loc: { readonly fileName: string; readonly pos: number }): { readonly fileName: string; readonly pos: number } | undefined {
    const mapped = this.generatedPositions.get(`${loc.fileName}:${loc.pos}`);
    return mapped === undefined ? undefined : { fileName: mapped[0], pos: mapped[1] };
  }
}

class Program implements SourceMapProgram {
  options(): { readonly rootDir: string; readonly outDir: string } {
    return { rootDir: "/src", outDir: "/out" };
  }

  commonSourceDirectory(): string {
    return "/src";
  }

  getCurrentDirectory(): string {
    return "/";
  }

  useCaseSensitiveFileNames(): boolean {
    return true;
  }

  getSourceFile(fileName: string): unknown | undefined {
    return fileName === "/src/input.ts" ? {} : undefined;
  }

  isSourceFromProjectReference(_path: string): boolean {
    return false;
  }
}

class Service implements SourceMapLanguageService {
  readonly mapper: Mapper;
  readonly files = new Map<string, string>();
  readonly host = {
    readFile: (fileName: string): SourceMapReadResult => this.readFile(fileName),
  };
  readonly program = new Program();

  constructor(mapper: Mapper) {
    this.mapper = mapper;
  }

  readFile(fileName: string): SourceMapReadResult {
    const contents = this.files.get(fileName);
    return contents === undefined ? { contents: "", ok: false } : { contents, ok: true };
  }

  getDocumentPositionMapper(_fileName: string): DocumentPositionMapperLike {
    return this.mapper;
  }

  getProgram(): SourceMapProgram {
    return this.program;
  }

  toPath(fileName: string): string {
    return fileName;
  }

  createLspRangeFromRange(textRange: TextRange, _script: unknown): Range {
    return {
      start: { line: 0, character: textRange.pos },
      end: { line: 0, character: textRange.end },
    };
  }
}

export class SourceMapTests {
  converts_file_names_to_document_uris(): void {
    Assert.Equal("file:///path/to/file.ts", fileNameToDocumentURI("/path/to/file.ts"));
    Assert.Equal("file:///d%3A/work/app/%28test%29.ts", fileNameToDocumentURI("d:/work/app/(test).ts"));
    Assert.Equal("untitled:Untitled-1", fileNameToDocumentURI("^/untitled/ts-nul-authority/Untitled-1"));
  }

  reads_script_from_host(): void {
    const service = new Service(new Mapper());
    service.files.set("/src/input.ts", "const x = 1;");

    const script = getScript(service, "/src/input.ts");

    Assert.Equal("/src/input.ts", script?.fileName);
    Assert.Equal("const x = 1;", script?.text);
  }

  maps_declaration_positions_to_existing_source_files(): void {
    const mapper = new Mapper();
    mapper.sourcePositions.set("/out/input.d.ts:10", ["/src/input.ts", 2]);
    const service = new Service(mapper);
    service.files.set("/src/input.ts", "source");

    const mapped = tryGetSourcePosition(service, "/out/input.d.ts", 10);

    Assert.Equal("/src/input.ts", mapped?.fileName);
    Assert.Equal(2, mapped?.pos);
  }

  drops_source_mappings_to_missing_files(): void {
    const mapper = new Mapper();
    mapper.sourcePositions.set("/out/input.d.ts:10", ["/src/missing.ts", 2]);
    const service = new Service(mapper);

    Assert.Equal(undefined, tryGetSourcePosition(service, "/out/input.d.ts", 10));
  }

  maps_source_positions_to_generated_declarations(): void {
    const mapper = new Mapper();
    mapper.generatedPositions.set("/src/input.ts:2", ["/out/input.d.ts", 20]);
    const service = new Service(mapper);
    service.files.set("/out/input.d.ts", "declare const x: number;");

    const mapped = tryGetGeneratedPosition(service, "/src/input.ts", 2);

    Assert.Equal("/out/input.d.ts", mapped?.fileName);
    Assert.Equal(20, mapped?.pos);
  }

  returns_mapped_location_and_approximates_unmapped_end(): void {
    const mapper = new Mapper();
    mapper.sourcePositions.set("/out/input.d.ts:10", ["/src/input.ts", 2]);
    const service = new Service(mapper);
    service.files.set("/src/input.ts", "source");
    service.files.set("/out/input.d.ts", "declare");

    const location = getMappedLocation(service, "/out/input.d.ts", new TextRange(10, 15));

    Assert.Equal("file:///src/input.ts", location.uri);
    Assert.Equal(2, location.range.start.character);
    Assert.Equal(7, location.range.end.character);
  }
}

A<SourceMapTests>().method((t) => t.converts_file_names_to_document_uris).add(FactAttribute);
A<SourceMapTests>().method((t) => t.reads_script_from_host).add(FactAttribute);
A<SourceMapTests>().method((t) => t.maps_declaration_positions_to_existing_source_files).add(FactAttribute);
A<SourceMapTests>().method((t) => t.drops_source_mappings_to_missing_files).add(FactAttribute);
A<SourceMapTests>().method((t) => t.maps_source_positions_to_generated_declarations).add(FactAttribute);
A<SourceMapTests>().method((t) => t.returns_mapped_location_and_approximates_unmapped_end).add(FactAttribute);
