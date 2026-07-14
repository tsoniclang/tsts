import type { bool, byte, int } from "../../go/scalars.js";
import type { GoError, GoMap, GoPtr, GoRef, GoRune, GoSlice } from "../../go/compat.js";
import { GoAppend, GoNilSlice } from "../../go/compat.js";
import { StdEncoding as base64StdEncoding } from "../../go/encoding/base64.js";
import { BinarySearchFunc as slicesBinarySearchFunc, SortFunc as slicesSortFunc } from "../../go/slices.js";
import { CutPrefix, EqualFold } from "../../go/strings.js";
import { DeduplicateSorted, Map as coreMap, Some } from "../core/core.js";
import { Assert as debugAssert } from "../debug/debug.js";
import { Unmarshal as jsonUnmarshal } from "../json/json.js";
import { ComputePositionOfLineAndUTF16Character } from "../scanner/scanner.js";
import { IsASCIILetter, IsDigit } from "../stringutil/util.js";
import { GetCanonicalFileName, GetDirectoryPath, GetNormalizedAbsolutePath } from "../tspath/path.js";
import { DecodeMappings, Mapping_IsSourceMapping, MappingsDecoder_Error, MappingsDecoder_Values, MissingSource } from "./decoder.js";
import { TryGetSourceMappingURL } from "./util.js";
import type { NameIndex, RawSourceMap, SourceIndex } from "./generator.js";
import { rawSourceMapJsonFieldNames } from "./generator.js";
import { JsonFieldNames } from "../json/json.js";
import type { ECMALineInfo } from "./lineinfo.js";

import type { GoInterface } from "../../go/compat.js";
// Go strings are immutable UTF-8 byte sequences; `[]byte(s)` and ranging over a
// string both operate on the UTF-8 byte / rune views. We mirror that contract by
// operating over the encoded byte view at the boundaries.
const utf8Encoder: TextEncoder = new globalThis.TextEncoder();
const utf8Decoder: TextDecoder = new globalThis.TextDecoder("utf-8");
const stringToBytes = (s: string): GoSlice<byte> => globalThis.Array.from(utf8Encoder.encode(s));
// Go's `string([]byte)` decodes the bytes as UTF-8.
const bytesToString = (b: GoSlice<byte>): string => utf8Decoder.decode(globalThis.Uint8Array.from(b));
const byteLen = (s: string): int => utf8Encoder.encode(s).length;
const byteSlice = (s: string, start: int, end: int): string => {
  const bytes: Uint8Array = utf8Encoder.encode(s);
  return utf8Decoder.decode(bytes.subarray(start, end));
};
// runesOf yields the runes (code points) of a string, mirroring Go's `for _, r := range s`.
const runesOf = (s: string): GoRune[] => {
  const result: GoRune[] = [];
  for (const ch of s) {
    result.push(ch.codePointAt(0)!);
  }
  return result;
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::type::Host","kind":"type","status":"implemented","sigHash":"b1bf4af2732113dcf17fee1f4e6faad1162ed68cb2e5a8e2d69cbc880e14e210"}
 *
 * Go source:
 * Host interface {
 * 	UseCaseSensitiveFileNames() bool
 * 	GetECMALineInfo(fileName string) *ECMALineInfo
 * 	ReadFile(fileName string) (string, bool)
 * }
 */
export interface Host {
  UseCaseSensitiveFileNames(): bool;
  GetECMALineInfo(fileName: string): GoPtr<ECMALineInfo>;
  ReadFile(fileName: string): [string, bool];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::type::MappedPosition","kind":"type","status":"implemented","sigHash":"61851ed315c339f101c87b841f7bc369c10703fd062a126a046b6f6c3a4a966e"}
 *
 * Go source:
 * MappedPosition struct {
 * 	generatedPosition int
 * 	sourcePosition    int
 * 	sourceIndex       SourceIndex
 * 	nameIndex         NameIndex
 * }
 */
export interface MappedPosition {
  generatedPosition: int;
  sourcePosition: int;
  sourceIndex: SourceIndex;
  nameIndex: NameIndex;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::constGroup::missingPosition","kind":"constGroup","status":"implemented","sigHash":"22158eec09f51c857d1856810cb58f038cc7c2f8a9c78686425a32c20dfdb264"}
 *
 * Go source:
 * const (
 * 	missingPosition = -1
 * )
 */
export const missingPosition: int = -1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::method::MappedPosition.isSourceMappedPosition","kind":"method","status":"implemented","sigHash":"e3939c5f93517db8ba20a4511dc6134b373329dc6a70b97f47afbce6fd0ea8ac"}
 *
 * Go source:
 * func (m *MappedPosition) isSourceMappedPosition() bool {
 * 	return m.sourceIndex != MissingSource && m.sourcePosition != missingPosition
 * }
 */
export function MappedPosition_isSourceMappedPosition(receiver: GoPtr<MappedPosition>): bool {
  const m: MappedPosition = receiver!;
  return m.sourceIndex !== MissingSource && m.sourcePosition !== missingPosition;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::type::SourceMappedPosition","kind":"type","status":"implemented","sigHash":"68f59dc927992b723df6ab63d3a25ef0d55880804b2a16098a1a5d1116fcb179"}
 *
 * Go source:
 * SourceMappedPosition = MappedPosition
 */
export type SourceMappedPosition = MappedPosition;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::type::DocumentPositionMapper","kind":"type","status":"implemented","sigHash":"c04b12ae54e311960ea5d50b05291849fa3f128bea9fcf9ae9f3bab2a7ccdd3f"}
 *
 * Go source:
 * DocumentPositionMapper struct {
 * 	useCaseSensitiveFileNames bool
 * 
 * 	sourceFileAbsolutePaths   []string
 * 	sourceToSourceIndexMap    map[string]SourceIndex
 * 	generatedAbsoluteFilePath string
 * 
 * 	generatedMappings []*MappedPosition
 * 	sourceMappings    map[SourceIndex][]*SourceMappedPosition
 * }
 */
export interface DocumentPositionMapper {
  useCaseSensitiveFileNames: bool;
  sourceFileAbsolutePaths: GoSlice<string>;
  sourceToSourceIndexMap: GoMap<string, SourceIndex>;
  generatedAbsoluteFilePath: string;
  generatedMappings: GoSlice<GoPtr<MappedPosition>>;
  sourceMappings: GoMap<SourceIndex, GoSlice<GoPtr<SourceMappedPosition>>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::func::createDocumentPositionMapper","kind":"func","status":"implemented","sigHash":"aa0fb35a859f95528dd71a98b53fd0075b18a2c1d45fbd59ae694cc5cac7c5a4"}
 *
 * Go source:
 * func createDocumentPositionMapper(host Host, sourceMap *RawSourceMap, mapPath string) *DocumentPositionMapper {
 * 	mapDirectory := tspath.GetDirectoryPath(mapPath)
 * 	var sourceRoot string
 * 	if sourceMap.SourceRoot != "" {
 * 		sourceRoot = tspath.GetNormalizedAbsolutePath(sourceMap.SourceRoot, mapDirectory)
 * 	} else {
 * 		sourceRoot = mapDirectory
 * 	}
 * 	generatedAbsoluteFilePath := tspath.GetNormalizedAbsolutePath(sourceMap.File, mapDirectory)
 * 	sourceFileAbsolutePaths := core.Map(sourceMap.Sources, func(source string) string {
 * 		return tspath.GetNormalizedAbsolutePath(source, sourceRoot)
 * 	})
 * 	useCaseSensitiveFileNames := host.UseCaseSensitiveFileNames()
 * 	sourceToSourceIndexMap := make(map[string]SourceIndex, len(sourceFileAbsolutePaths))
 * 	for i, source := range sourceFileAbsolutePaths {
 * 		sourceToSourceIndexMap[tspath.GetCanonicalFileName(source, useCaseSensitiveFileNames)] = SourceIndex(i)
 * 	}
 * 
 * 	var decodedMappings []*MappedPosition
 * 	var generatedMappings []*MappedPosition
 * 	sourceMappings := make(map[SourceIndex][]*SourceMappedPosition)
 * 
 * 	// getDecodedMappings()
 * 	decoder := DecodeMappings(sourceMap.Mappings)
 * 	for mapping := range decoder.Values() {
 * 		// processMapping()
 * 		generatedPosition := -1
 * 		lineInfo := host.GetECMALineInfo(generatedAbsoluteFilePath)
 * 		if lineInfo != nil {
 * 			generatedPosition = scanner.ComputePositionOfLineAndUTF16Character(
 * 				lineInfo.lineStarts,
 * 				mapping.GeneratedLine,
 * 				mapping.GeneratedCharacter,
 * 				lineInfo.text,
 * 				true, /*allowEdits* /
 * 			)
 * 		}
 * 
 * 		sourcePosition := -1
 * 		if mapping.IsSourceMapping() {
 * 			lineInfo := host.GetECMALineInfo(sourceFileAbsolutePaths[mapping.SourceIndex])
 * 			if lineInfo != nil {
 * 				pos := scanner.ComputePositionOfLineAndUTF16Character(
 * 					lineInfo.lineStarts,
 * 					mapping.SourceLine,
 * 					mapping.SourceCharacter,
 * 					lineInfo.text,
 * 					true, /*allowEdits* /
 * 				)
 * 				sourcePosition = pos
 * 			}
 * 		}
 * 
 * 		decodedMappings = append(decodedMappings, &MappedPosition{
 * 			generatedPosition: generatedPosition,
 * 			sourceIndex:       mapping.SourceIndex,
 * 			sourcePosition:    sourcePosition,
 * 			nameIndex:         mapping.NameIndex,
 * 		})
 * 	}
 * 	if decoder.Error() != nil {
 * 		decodedMappings = nil
 * 	}
 * 
 * 	// getSourceMappings()
 * 	for _, mapping := range decodedMappings {
 * 		if !mapping.isSourceMappedPosition() {
 * 			continue
 * 		}
 * 		sourceIndex := mapping.sourceIndex
 * 		list := sourceMappings[sourceIndex]
 * 		list = append(list, &SourceMappedPosition{
 * 			generatedPosition: mapping.generatedPosition,
 * 			sourceIndex:       sourceIndex,
 * 			sourcePosition:    mapping.sourcePosition,
 * 			nameIndex:         mapping.nameIndex,
 * 		})
 * 		sourceMappings[sourceIndex] = list
 * 	}
 * 	for i, list := range sourceMappings {
 * 		slices.SortFunc(list, func(a, b *SourceMappedPosition) int {
 * 			debug.Assert(a.sourceIndex == b.sourceIndex, "All source mappings should have the same source index")
 * 			return a.sourcePosition - b.sourcePosition
 * 		})
 * 		sourceMappings[i] = core.DeduplicateSorted(list, func(a, b *SourceMappedPosition) bool {
 * 			return a.generatedPosition == b.generatedPosition &&
 * 				a.sourceIndex == b.sourceIndex &&
 * 				a.sourcePosition == b.sourcePosition
 * 		})
 * 	}
 * 
 * 	// getGeneratedMappings()
 * 	generatedMappings = decodedMappings
 * 	slices.SortFunc(generatedMappings, func(a, b *MappedPosition) int {
 * 		return a.generatedPosition - b.generatedPosition
 * 	})
 * 	generatedMappings = core.DeduplicateSorted(generatedMappings, func(a, b *MappedPosition) bool {
 * 		return a.generatedPosition == b.generatedPosition &&
 * 			a.sourceIndex == b.sourceIndex &&
 * 			a.sourcePosition == b.sourcePosition
 * 	})
 * 
 * 	return &DocumentPositionMapper{
 * 		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
 * 		sourceFileAbsolutePaths:   sourceFileAbsolutePaths,
 * 		sourceToSourceIndexMap:    sourceToSourceIndexMap,
 * 		generatedAbsoluteFilePath: generatedAbsoluteFilePath,
 * 		generatedMappings:         generatedMappings,
 * 		sourceMappings:            sourceMappings,
 * 	}
 * }
 */
export function createDocumentPositionMapper(host: GoInterface<Host>, sourceMap: GoPtr<RawSourceMap>, mapPath: string): GoPtr<DocumentPositionMapper> {
  const mapDirectory: string = GetDirectoryPath(mapPath);
  let sourceRoot: string;
  if (sourceMap!.SourceRoot !== "") {
    sourceRoot = GetNormalizedAbsolutePath(sourceMap!.SourceRoot, mapDirectory);
  } else {
    sourceRoot = mapDirectory;
  }
  const generatedAbsoluteFilePath: string = GetNormalizedAbsolutePath(sourceMap!.File, mapDirectory);
  const sourceFileAbsolutePaths: GoSlice<string> = coreMap(sourceMap!.Sources, (source: string): string => {
    return GetNormalizedAbsolutePath(source, sourceRoot);
  });
  const useCaseSensitiveFileNames: bool = host!.UseCaseSensitiveFileNames();
  const sourceToSourceIndexMap: GoMap<string, SourceIndex> = new globalThis.Map<string, SourceIndex>();
  for (let i = 0; i < sourceFileAbsolutePaths.length; i++) {
    const source: string = sourceFileAbsolutePaths[i]!;
    sourceToSourceIndexMap.set(GetCanonicalFileName(source, useCaseSensitiveFileNames), i);
  }

  let decodedMappings: GoSlice<GoPtr<MappedPosition>> = [];
  let generatedMappings: GoSlice<GoPtr<MappedPosition>> = [];
  const sourceMappings: GoMap<SourceIndex, GoSlice<GoPtr<SourceMappedPosition>>> = new globalThis.Map<SourceIndex, GoSlice<GoPtr<SourceMappedPosition>>>();

  // getDecodedMappings()
  const decoder = DecodeMappings(sourceMap!.Mappings);
  MappingsDecoder_Values(decoder)!((mapping): bool => {
    // processMapping()
    let generatedPosition: int = -1;
    let lineInfo: GoPtr<ECMALineInfo> = host!.GetECMALineInfo(generatedAbsoluteFilePath);
    if (lineInfo !== undefined) {
      generatedPosition = ComputePositionOfLineAndUTF16Character(
        lineInfo.lineStarts,
        mapping!.GeneratedLine,
        mapping!.GeneratedCharacter,
        lineInfo.text,
        true /*allowEdits*/,
      );
    }

    let sourcePosition: int = -1;
    if (Mapping_IsSourceMapping(mapping)) {
      lineInfo = host!.GetECMALineInfo(sourceFileAbsolutePaths[mapping!.SourceIndex]!);
      if (lineInfo !== undefined) {
        const pos: int = ComputePositionOfLineAndUTF16Character(
          lineInfo.lineStarts,
          mapping!.SourceLine,
          mapping!.SourceCharacter,
          lineInfo.text,
          true /*allowEdits*/,
        );
        sourcePosition = pos;
      }
    }

    decodedMappings = GoAppend(decodedMappings, {
      generatedPosition: generatedPosition,
      sourceIndex: mapping!.SourceIndex,
      sourcePosition: sourcePosition,
      nameIndex: mapping!.NameIndex,
    });
    return true;
  });
  if (MappingsDecoder_Error(decoder) !== undefined) {
    decodedMappings = [];
  }

  // getSourceMappings()
  for (const mapping of decodedMappings) {
    if (!MappedPosition_isSourceMappedPosition(mapping)) {
      continue;
    }
    const sourceIndex: SourceIndex = mapping!.sourceIndex;
    const list: GoSlice<GoPtr<SourceMappedPosition>> = sourceMappings.get(sourceIndex) ?? [];
    sourceMappings.set(sourceIndex, GoAppend(list, {
      generatedPosition: mapping!.generatedPosition,
      sourceIndex: sourceIndex,
      sourcePosition: mapping!.sourcePosition,
      nameIndex: mapping!.nameIndex,
    }));
  }
  for (const [i, list] of sourceMappings) {
    slicesSortFunc(list, (a: GoPtr<SourceMappedPosition>, b: GoPtr<SourceMappedPosition>): int => {
      debugAssert(a!.sourceIndex === b!.sourceIndex, "All source mappings should have the same source index");
      return a!.sourcePosition - b!.sourcePosition;
    });
    sourceMappings.set(i, DeduplicateSorted(list, (a: GoPtr<SourceMappedPosition>, b: GoPtr<SourceMappedPosition>): bool => {
      return a!.generatedPosition === b!.generatedPosition &&
        a!.sourceIndex === b!.sourceIndex &&
        a!.sourcePosition === b!.sourcePosition;
    }));
  }

  // getGeneratedMappings()
  generatedMappings = decodedMappings;
  slicesSortFunc(generatedMappings, (a: GoPtr<MappedPosition>, b: GoPtr<MappedPosition>): int => {
    return a!.generatedPosition - b!.generatedPosition;
  });
  generatedMappings = DeduplicateSorted(generatedMappings, (a: GoPtr<MappedPosition>, b: GoPtr<MappedPosition>): bool => {
    return a!.generatedPosition === b!.generatedPosition &&
      a!.sourceIndex === b!.sourceIndex &&
      a!.sourcePosition === b!.sourcePosition;
  });

  return {
    useCaseSensitiveFileNames: useCaseSensitiveFileNames,
    sourceFileAbsolutePaths: sourceFileAbsolutePaths,
    sourceToSourceIndexMap: sourceToSourceIndexMap,
    generatedAbsoluteFilePath: generatedAbsoluteFilePath,
    generatedMappings: generatedMappings,
    sourceMappings: sourceMappings,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::type::DocumentPosition","kind":"type","status":"implemented","sigHash":"50d151d591632ea209d11a1010a40f51d0211eaa28ef3b16f49124c233e3ac2b"}
 *
 * Go source:
 * DocumentPosition struct {
 * 	FileName string
 * 	Pos      int
 * }
 */
export interface DocumentPosition {
  FileName: string;
  Pos: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::method::DocumentPositionMapper.GetSourcePosition","kind":"method","status":"implemented","sigHash":"a2edb4299755a31ef25d276639ee78066b3512a7d6e92c4d93e0cf90c12816cd"}
 *
 * Go source:
 * func (d *DocumentPositionMapper) GetSourcePosition(loc *DocumentPosition) *DocumentPosition {
 * 	if d == nil {
 * 		return nil
 * 	}
 * 	if len(d.generatedMappings) == 0 {
 * 		return nil
 * 	}
 * 
 * 	targetIndex, _ := slices.BinarySearchFunc(d.generatedMappings, loc.Pos, func(m *MappedPosition, pos int) int {
 * 		return m.generatedPosition - pos
 * 	})
 * 
 * 	if targetIndex < 0 || targetIndex >= len(d.generatedMappings) {
 * 		return nil
 * 	}
 * 
 * 	mapping := d.generatedMappings[targetIndex]
 * 	if !mapping.isSourceMappedPosition() {
 * 		return nil
 * 	}
 * 
 * 	// Closest position
 * 	return &DocumentPosition{
 * 		FileName: d.sourceFileAbsolutePaths[mapping.sourceIndex],
 * 		Pos:      mapping.sourcePosition,
 * 	}
 * }
 */
export function DocumentPositionMapper_GetSourcePosition(receiver: GoPtr<DocumentPositionMapper>, loc: GoPtr<DocumentPosition>): GoPtr<DocumentPosition> {
  const d: GoPtr<DocumentPositionMapper> = receiver;
  if (d === undefined) {
    return undefined;
  }
  if (d.generatedMappings.length === 0) {
    return undefined;
  }

  const [targetIndex] = slicesBinarySearchFunc(d.generatedMappings, loc!.Pos, (m: GoPtr<MappedPosition>, pos: int): int => {
    return m!.generatedPosition - pos;
  });

  if (targetIndex < 0 || targetIndex >= d.generatedMappings.length) {
    return undefined;
  }

  const mapping: GoPtr<MappedPosition> = d.generatedMappings[targetIndex];
  if (!MappedPosition_isSourceMappedPosition(mapping)) {
    return undefined;
  }

  // Closest position
  return {
    FileName: d.sourceFileAbsolutePaths[mapping!.sourceIndex]!,
    Pos: mapping!.sourcePosition,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::method::DocumentPositionMapper.GetGeneratedPosition","kind":"method","status":"implemented","sigHash":"12f70b52e1943fd1566ad4d411cd6325e6f58ec7c95a8833c624b8091bb57d3e"}
 *
 * Go source:
 * func (d *DocumentPositionMapper) GetGeneratedPosition(loc *DocumentPosition) *DocumentPosition {
 * 	if d == nil {
 * 		return nil
 * 	}
 * 	sourceIndex, ok := d.sourceToSourceIndexMap[tspath.GetCanonicalFileName(loc.FileName, d.useCaseSensitiveFileNames)]
 * 	if !ok {
 * 		return nil
 * 	}
 * 	if sourceIndex < 0 || int(sourceIndex) >= len(d.sourceMappings) {
 * 		return nil
 * 	}
 * 	sourceMappings := d.sourceMappings[sourceIndex]
 * 	targetIndex, _ := slices.BinarySearchFunc(sourceMappings, loc.Pos, func(m *SourceMappedPosition, pos int) int {
 * 		return m.sourcePosition - pos
 * 	})
 * 
 * 	if targetIndex < 0 || targetIndex >= len(sourceMappings) {
 * 		return nil
 * 	}
 * 
 * 	mapping := sourceMappings[targetIndex]
 * 	if mapping.sourceIndex != sourceIndex {
 * 		return nil
 * 	}
 * 
 * 	// Closest position
 * 	return &DocumentPosition{
 * 		FileName: d.generatedAbsoluteFilePath,
 * 		Pos:      mapping.generatedPosition,
 * 	}
 * }
 */
export function DocumentPositionMapper_GetGeneratedPosition(receiver: GoPtr<DocumentPositionMapper>, loc: GoPtr<DocumentPosition>): GoPtr<DocumentPosition> {
  const d: GoPtr<DocumentPositionMapper> = receiver;
  if (d === undefined) {
    return undefined;
  }
  const canonical: string = GetCanonicalFileName(loc!.FileName, d.useCaseSensitiveFileNames);
  const ok: bool = d.sourceToSourceIndexMap.has(canonical);
  const sourceIndex: SourceIndex = ok ? d.sourceToSourceIndexMap.get(canonical)! : 0;
  if (!ok) {
    return undefined;
  }
  if (sourceIndex < 0 || sourceIndex >= d.sourceMappings.size) {
    return undefined;
  }
  const sourceMappings: GoSlice<GoPtr<SourceMappedPosition>> = d.sourceMappings.get(sourceIndex) ?? [];
  const [targetIndex] = slicesBinarySearchFunc(sourceMappings, loc!.Pos, (m: GoPtr<SourceMappedPosition>, pos: int): int => {
    return m!.sourcePosition - pos;
  });

  if (targetIndex < 0 || targetIndex >= sourceMappings.length) {
    return undefined;
  }

  const mapping: GoPtr<SourceMappedPosition> = sourceMappings[targetIndex];
  if (mapping!.sourceIndex !== sourceIndex) {
    return undefined;
  }

  // Closest position
  return {
    FileName: d.generatedAbsoluteFilePath,
    Pos: mapping!.generatedPosition,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::func::GetDocumentPositionMapper","kind":"func","status":"implemented","sigHash":"a83374a7dcd8fe31c4879adfb4605af5d16023838ffcc5d782252d8f85624d75"}
 *
 * Go source:
 * func GetDocumentPositionMapper(host Host, generatedFileName string) *DocumentPositionMapper {
 * 	mapFileName := tryGetSourceMappingURL(host, generatedFileName)
 * 	if mapFileName != "" {
 * 		if base64Object, matched := tryParseBase64Url(mapFileName); matched {
 * 			if base64Object != "" {
 * 				if decoded, err := base64.StdEncoding.DecodeString(base64Object); err == nil {
 * 					return convertDocumentToSourceMapper(host, string(decoded), generatedFileName)
 * 				}
 * 			}
 * 			// Not a data URL we can parse, skip it
 * 			mapFileName = ""
 * 		}
 * 	}
 * 
 * 	var possibleMapLocations []string
 * 	if mapFileName != "" {
 * 		possibleMapLocations = append(possibleMapLocations, mapFileName)
 * 	}
 * 	possibleMapLocations = append(possibleMapLocations, generatedFileName+".map")
 * 	for _, location := range possibleMapLocations {
 * 		mapFileName := tspath.GetNormalizedAbsolutePath(location, tspath.GetDirectoryPath(generatedFileName))
 * 		if mapFileContents, ok := host.ReadFile(mapFileName); ok {
 * 			return convertDocumentToSourceMapper(host, mapFileContents, mapFileName)
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function GetDocumentPositionMapper(host: GoInterface<Host>, generatedFileName: string): GoPtr<DocumentPositionMapper> {
  let mapFileName: string = tryGetSourceMappingURL(host, generatedFileName);
  if (mapFileName !== "") {
    const [base64Object, matched] = tryParseBase64Url(mapFileName);
    if (matched) {
      if (base64Object !== "") {
        const [decoded, err] = base64StdEncoding.DecodeString(base64Object);
        if (err === undefined) {
          return convertDocumentToSourceMapper(host, bytesToString(decoded), generatedFileName);
        }
      }
      // Not a data URL we can parse, skip it
      mapFileName = "";
    }
  }

  let possibleMapLocations: GoSlice<string> = [];
  if (mapFileName !== "") {
    possibleMapLocations = GoAppend(possibleMapLocations, mapFileName);
  }
  possibleMapLocations = GoAppend(possibleMapLocations, generatedFileName + ".map");
  for (const location of possibleMapLocations) {
    const resolvedMapFileName: string = GetNormalizedAbsolutePath(location, GetDirectoryPath(generatedFileName));
    const [mapFileContents, ok] = host!.ReadFile(resolvedMapFileName);
    if (ok) {
      return convertDocumentToSourceMapper(host, mapFileContents, resolvedMapFileName);
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::func::convertDocumentToSourceMapper","kind":"func","status":"implemented","sigHash":"e2228f77b8e746e1f19340626ef279437c66ff525e4a5224a3035ceb9a3357bb"}
 *
 * Go source:
 * func convertDocumentToSourceMapper(host Host, contents string, mapFileName string) *DocumentPositionMapper {
 * 	sourceMap := tryParseRawSourceMap(contents)
 * 	if sourceMap == nil || len(sourceMap.Sources) == 0 || sourceMap.File == "" || sourceMap.Mappings == "" {
 * 		// invalid map
 * 		return nil
 * 	}
 * 
 * 	// Don't support source maps that contain inlined sources
 * 	if core.Some(sourceMap.SourcesContent, func(s *string) bool { return s != nil }) {
 * 		return nil
 * 	}
 * 
 * 	return createDocumentPositionMapper(host, sourceMap, mapFileName)
 * }
 */
export function convertDocumentToSourceMapper(host: GoInterface<Host>, contents: string, mapFileName: string): GoPtr<DocumentPositionMapper> {
  const sourceMap: GoPtr<RawSourceMap> = tryParseRawSourceMap(contents);
  if (sourceMap === undefined || sourceMap.Sources.length === 0 || sourceMap.File === "" || sourceMap.Mappings === "") {
    // invalid map
    return undefined;
  }

  // Don't support source maps that contain inlined sources
  if (Some(sourceMap.SourcesContent, (s: GoRef<string>): bool => { return s !== undefined; })) {
    return undefined;
  }

  return createDocumentPositionMapper(host, sourceMap, mapFileName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::func::tryParseRawSourceMap","kind":"func","status":"implemented","sigHash":"2c5011aad6978bf4b7d62b73da6e8ff1eaed6fcc32fe5c25b8c40759c34cf9ab"}
 *
 * Go source:
 * func tryParseRawSourceMap(contents string) *RawSourceMap {
 * 	sourceMap := &RawSourceMap{}
 * 	err := json.Unmarshal([]byte(contents), sourceMap)
 * 	if err != nil {
 * 		return nil
 * 	}
 * 	if sourceMap.Version != 3 {
 * 		return nil
 * 	}
 * 	return sourceMap
 * }
 */
export function tryParseRawSourceMap(contents: string): GoPtr<RawSourceMap> {
  const sourceMap: RawSourceMap & { [JsonFieldNames]: typeof rawSourceMapJsonFieldNames } = {
    [JsonFieldNames]: rawSourceMapJsonFieldNames,
    Version: 0,
    File: "",
    SourceRoot: "",
    Sources: [],
    Names: [],
    Mappings: "",
    SourcesContent: GoNilSlice<GoRef<string>>(),
  };
  const err: GoError = jsonUnmarshal(stringToBytes(contents), sourceMap);
  if (err !== undefined) {
    return undefined;
  }
  if (sourceMap.Version !== 3) {
    return undefined;
  }
  return sourceMap;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::func::tryGetSourceMappingURL","kind":"func","status":"implemented","sigHash":"95c86edec2accb78fb8becae56fbdfe84d3b71de32920e052357e2a8eab8d3b5"}
 *
 * Go source:
 * func tryGetSourceMappingURL(host Host, fileName string) string {
 * 	lineInfo := host.GetECMALineInfo(fileName)
 * 	return TryGetSourceMappingURL(lineInfo)
 * }
 */
export function tryGetSourceMappingURL(host: GoInterface<Host>, fileName: string): string {
  const lineInfo: GoPtr<ECMALineInfo> = host!.GetECMALineInfo(fileName);
  return TryGetSourceMappingURL(lineInfo);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/sourcemap/source_mapper.go::func::tryParseBase64Url","kind":"func","status":"implemented","sigHash":"67b4902646a8a387691414c2a4534c7ee2aa6c8bcd6c14a53eebecf5d33de931"}
 *
 * Go source:
 * func tryParseBase64Url(url string) (parseableUrl string, isBase64Url bool) {
 * 	var found bool
 * 	if url, found = strings.CutPrefix(url, `data:`); !found {
 * 		return "", false
 * 	}
 * 	if url, found = strings.CutPrefix(url, `application/json;`); !found {
 * 		return "", true
 * 	}
 * 	if url, found = strings.CutPrefix(url, `charset=`); found {
 * 		if !strings.EqualFold(url[:len(`utf-8;`)], `utf-8;`) {
 * 			return "", true
 * 		}
 * 		url = url[len(`utf-8;`):]
 * 	}
 * 	if url, found = strings.CutPrefix(url, `base64,`); !found {
 * 		return "", true
 * 	}
 * 	for _, r := range url {
 * 		if !(stringutil.IsASCIILetter(r) || stringutil.IsDigit(r) || r == '+' || r == '/' || r == '=') {
 * 			return "", true
 * 		}
 * 	}
 * 	return url, true
 * }
 */
export function tryParseBase64Url(url: string): [parseableUrl: string, isBase64Url: bool] {
  let found: bool;
  [url, found] = CutPrefix(url, "data:");
  if (!found) {
    return ["", false];
  }
  [url, found] = CutPrefix(url, "application/json;");
  if (!found) {
    return ["", true];
  }
  [url, found] = CutPrefix(url, "charset=");
  if (found) {
    if (!EqualFold(byteSlice(url, 0, byteLen("utf-8;")), "utf-8;")) {
      return ["", true];
    }
    url = byteSlice(url, byteLen("utf-8;"), byteLen(url));
  }
  [url, found] = CutPrefix(url, "base64,");
  if (!found) {
    return ["", true];
  }
  for (const r of runesOf(url)) {
    if (!(IsASCIILetter(r) || IsDigit(r) || r === 0x2b /* '+' */ || r === 0x2f /* '/' */ || r === 0x3d /* '=' */)) {
      return ["", true];
    }
  }
  return [url, true];
}
