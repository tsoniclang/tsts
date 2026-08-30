import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ECMALineInfo } from "./lineinfo.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { ComputePositionOfLineAndUTF16Character as ComputePositionOfLineAndUTF16Character__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsASCIILetter as IsASCIILetter__from_stringutil, IsDigit as IsDigit__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { DeduplicateSorted$PointerTo_Named_sourcemap$MappedPosition } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/DeduplicateSorted.js";
import { Map$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Some$PointerTo_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { BinarySearchFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition$int } from "../../../../../../support/generics/concretizations/slices/BinarySearchFunc.js";
import { SortFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_sourcemap$RawSourceMap as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetECMALineInfo$string_to_PointerTo_Named_sourcemap$ECMALineInfo, $goInterfaceMethod$ReadFile$string_to_string_bool, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_sourcemap$SourceIndex_To_SliceOf_PointerTo_Named_sourcemap$MappedPosition } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { DecodeMappings, Mapping, MappingsDecoder, MissingSource$constant } from "./decoder.js";
import { NameIndex, RawSourceMap, SourceIndex } from "./generator.js";
import { TryGetSourceMappingURL } from "./util.js";
import * as base64__from_gostdlib from "@gotots/gostdlib/encoding/base64.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as provider_encoding_base64 from "@gotots/gostdlib/internal/facets/provider-encoding-base64.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringSlice } from "@gotots/runtime/string.js";
export interface Host extends GoInterfaceValue {
    GetECMALineInfo($argument0: gostring): {
        value: ECMALineInfo;
    } | undefined;
    ReadFile($argument0: gostring): [
        gostring,
        bool
    ];
    UseCaseSensitiveFileNames(): bool;
}
export const Host$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetECMALineInfo$string_to_PointerTo_Named_sourcemap$ECMALineInfo, $goInterfaceMethod$ReadFile$string_to_string_bool, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool]);
export function Host$is(value: GoInterfaceValue | undefined): value is Host {
    return value !== undefined && value.$go$implements(Host$contract);
}
export class MappedPosition {
    declare private readonly $goType: void;
    public constructor(public generatedPosition: int, public sourcePosition: int, public sourceIndex: SourceIndex, public nameIndex: NameIndex) {
    }
    declare private readonly then?: never;
    static $go$private$sourcemap$isSourceMappedPosition(m: MappedPosition | undefined): bool {
        return !((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value === MissingSource$constant().$value) && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition !== missingPosition$int;
    }
}
export const missingPosition$int: int = -1;
export class DocumentPositionMapper {
    declare private readonly $goType: void;
    public constructor(public useCaseSensitiveFileNames: bool, public sourceFileAbsolutePaths: RuntimeSlice<gostring>, public sourceToSourceIndexMap: GoMapValue<gostring, SourceIndex>, public generatedAbsoluteFilePath: gostring, public generatedMappings: RuntimeSlice<MappedPosition | undefined>, public sourceMappings: GoMapValue<SourceIndex, RuntimeSlice<MappedPosition | undefined>>) {
    }
    declare private readonly then?: never;
    static GetGeneratedPosition(d: tsonicTypeScriptRuntime.Location<DocumentPositionMapper> | undefined, loc: DocumentPosition | undefined): DocumentPosition | undefined {
        if (d === undefined) {
            return void 0;
        }
        const __gotots_results_13 = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.sourceToSourceIndexMap.lookupOk(GetCanonicalFileName__from_tspath((loc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileName, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.useCaseSensitiveFileNames));
        let sourceIndex = __gotots_results_13[0];
        let ok = __gotots_results_13[1];
        if (!ok) {
            return void 0;
        }
        if (sourceIndex.$value < 0 || sourceIndex.$value >= ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.sourceMappings.length()) {
            return void 0;
        }
        let sourceMappings = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.sourceMappings.lookup(sourceIndex);
        const __gotots_results_14 = BinarySearchFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition$int(sourceMappings, (loc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Pos, (m: MappedPosition | undefined, pos: int): int => {
            return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition - pos;
        });
        let targetIndex = __gotots_results_14[0];
        if (targetIndex < 0 || targetIndex >= sourceMappings.length) {
            return void 0;
        }
        let mapping: MappedPosition | undefined = sourceMappings.get(targetIndex);
        if (!((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value === sourceIndex.$value)) {
            return void 0;
        }
        return new DocumentPosition(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.generatedAbsoluteFilePath, (mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition);
    }
    static GetSourcePosition(d: tsonicTypeScriptRuntime.Location<DocumentPositionMapper> | undefined, loc: DocumentPosition | undefined): DocumentPosition | undefined {
        if (d === undefined) {
            return void 0;
        }
        if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.generatedMappings.length === 0) {
            return void 0;
        }
        const __gotots_results_0 = BinarySearchFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition$int(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.generatedMappings, (loc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Pos, (m: MappedPosition | undefined, pos: int): int => {
            return (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition - pos;
        });
        let targetIndex = __gotots_results_0[0];
        if (targetIndex < 0 || targetIndex >= ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.generatedMappings.length) {
            return void 0;
        }
        let mapping: MappedPosition | undefined = ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.generatedMappings.get(targetIndex);
        if (!MappedPosition.$go$private$sourcemap$isSourceMappedPosition(mapping)) {
            return void 0;
        }
        return new DocumentPosition(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DocumentPositionMapper>).value.sourceFileAbsolutePaths.get((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value), (mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition);
    }
}
export function createDocumentPositionMapper(host: Host | undefined, sourceMap: {
    value: RawSourceMap;
} | undefined, mapPath: gostring): tsonicTypeScriptRuntime.Location<DocumentPositionMapper> | undefined {
    let mapDirectory = GetDirectoryPath__from_tspath(mapPath);
    let sourceRoot = "";
    if ((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot !== "") {
        sourceRoot = GetNormalizedAbsolutePath__from_tspath((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot, mapDirectory);
    }
    else {
        sourceRoot = mapDirectory;
    }
    let generatedAbsoluteFilePath = GetNormalizedAbsolutePath__from_tspath((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.File, mapDirectory);
    let sourceFileAbsolutePaths = Map$string$string((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Sources, (source: gostring): gostring => {
        return GetNormalizedAbsolutePath__from_tspath(source, sourceRoot);
    });
    const __gotots_receiver_3 = host;
    let useCaseSensitiveFileNames = goInterfaceNonNil<Host>(__gotots_receiver_3).UseCaseSensitiveFileNames();
    let sourceToSourceIndexMap: GoMapValue<gostring, SourceIndex> = GoMap.make<gostring, SourceIndex>(new SourceIndex(0), sourceFileAbsolutePaths.length, []);
    const __gotots_range_2 = sourceFileAbsolutePaths;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
        let i = __gotots_range_value_2;
        let source = __gotots_range_value_3;
        sourceToSourceIndexMap.store(GetCanonicalFileName__from_tspath(source, useCaseSensitiveFileNames), new SourceIndex(i));
    }
    let decodedMappings = RuntimeSlice.nil<MappedPosition | undefined>();
    let generatedMappings = RuntimeSlice.nil<MappedPosition | undefined>();
    let sourceMappings: GoMapValue<SourceIndex, RuntimeSlice<MappedPosition | undefined>> = $goMap$MapOf_Named_sourcemap$SourceIndex_To_SliceOf_PointerTo_Named_sourcemap$MappedPosition.make(0, []);
    let decoder: MappingsDecoder | undefined = DecodeMappings((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Mappings);
    const __gotots_range_3 = named_iter.IterSeqValueOperations.$project(MappingsDecoder.Values(decoder));
    if (__gotots_range_3 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_3(($argument0: tsonicTypeScriptRuntime.Location<Mapping> | undefined): bool => {
        if (__gotots_range_state_0 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_0 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_0 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_0 = -1;
        const __gotots_range_value_4 = $argument0;
        let mapping: tsonicTypeScriptRuntime.Location<Mapping> | undefined = __gotots_range_value_4;
        let generatedPosition = -1;
        const __gotots_receiver_4 = host;
        const __gotots_argument_8 = generatedAbsoluteFilePath;
        let lineInfo: {
            value: ECMALineInfo;
        } | undefined = goInterfaceNonNil<Host>(__gotots_receiver_4).GetECMALineInfo(__gotots_argument_8);
        if (!(lineInfo === undefined)) {
            generatedPosition = ComputePositionOfLineAndUTF16Character__from_scanner((lineInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lineStarts.$value, Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).GeneratedLine, new UTF16Offset__from_core(Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).GeneratedCharacter), (lineInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.text, true);
        }
        let sourcePosition = -1;
        if (Mapping.IsSourceMapping(mapping)) {
            const __gotots_receiver_5 = host;
            const __gotots_argument_9 = sourceFileAbsolutePaths.get(((void SourceIndex,
                Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceIndex) as number));
            let lineInfo__shadow_1: {
                value: ECMALineInfo;
            } | undefined = goInterfaceNonNil<Host>(__gotots_receiver_5).GetECMALineInfo(__gotots_argument_9);
            if (!(lineInfo__shadow_1 === undefined)) {
                let pos = ComputePositionOfLineAndUTF16Character__from_scanner((lineInfo__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lineStarts.$value, Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceLine, new UTF16Offset__from_core(Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceCharacter), (lineInfo__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.text, true);
                sourcePosition = pos;
            }
        }
        decodedMappings = decodedMappings.append(void 0, [new MappedPosition(generatedPosition, sourcePosition, new SourceIndex(Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceIndex), new NameIndex(Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).NameIndex)),]);
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    if (!(MappingsDecoder.Error(decoder) === undefined)) {
        decodedMappings = RuntimeSlice.nil<MappedPosition | undefined>();
    }
    const __gotots_range_4 = decodedMappings;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
        const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_3);
        let mapping: MappedPosition | undefined = __gotots_range_value_5;
        if (!MappedPosition.$go$private$sourcemap$isSourceMappedPosition(mapping)) {
            continue;
        }
        let sourceIndex = (mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex;
        let list = sourceMappings.lookup(sourceIndex);
        list = list.append(void 0, [new MappedPosition((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition, (mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition, sourceIndex, (mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nameIndex),]);
        sourceMappings.store(sourceIndex, list);
    }
    const __gotots_range_5 = sourceMappings;
    const __gotots_range_keys_0 = __gotots_range_5.keys();
    for (const __gotots_range_value_6 of __gotots_range_keys_0) {
        const __gotots_range_value_7 = __gotots_range_5.lookupOk(__gotots_range_value_6);
        if (!__gotots_range_value_7[1]) {
            continue;
        }
        const __gotots_range_value_8 = __gotots_range_value_6;
        const __gotots_range_value_9 = __gotots_range_value_7[0];
        let i = __gotots_range_value_8;
        let list = __gotots_range_value_9;
        SortFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition(list, (a: MappedPosition | undefined, b: MappedPosition | undefined): int => {
            Assert__from_debug((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("All source mappings should have the same source index")]));
            return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition - (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition;
        });
        sourceMappings.store(i, DeduplicateSorted$PointerTo_Named_sourcemap$MappedPosition(list, (a: MappedPosition | undefined, b: MappedPosition | undefined): bool => {
            return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition && (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value && (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition;
        }));
    }
    generatedMappings = decodedMappings;
    SortFunc$SliceOf_PointerTo_Named_sourcemap$MappedPosition$PointerTo_Named_sourcemap$MappedPosition(generatedMappings, (a: MappedPosition | undefined, b: MappedPosition | undefined): int => {
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition - (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition;
    });
    generatedMappings = DeduplicateSorted$PointerTo_Named_sourcemap$MappedPosition(generatedMappings, (a: MappedPosition | undefined, b: MappedPosition | undefined): bool => {
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedPosition && (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value && (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition === (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcePosition;
    });
    return tsonicTypeScriptRuntime.location<DocumentPositionMapper>(new DocumentPositionMapper(useCaseSensitiveFileNames, sourceFileAbsolutePaths, sourceToSourceIndexMap, generatedAbsoluteFilePath, generatedMappings, sourceMappings));
}
export class DocumentPosition {
    declare private readonly $goType: void;
    public constructor(public FileName: gostring, public Pos: int) {
    }
    declare private readonly then?: never;
}
export function GetDocumentPositionMapper(host: Host | undefined, generatedFileName: gostring): tsonicTypeScriptRuntime.Location<DocumentPositionMapper> | undefined {
    let mapFileName = tryGetSourceMappingURL(host, generatedFileName);
    if (mapFileName !== "") {
        {
            const __gotots_results_1 = tryParseBase64Url(mapFileName);
            let base64Object = __gotots_results_1[0];
            let matched = __gotots_results_1[1];
            if (matched) {
                if (base64Object !== "") {
                    {
                        const __gotots_conversion_0 = base64__from_gostdlib.state.StdEncoding;
                        const __gotots_receiver_0 = __gotots_conversion_0 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_0, (): base64__from_gostdlib.Encoding => {
                                return __gotots_conversion_0;
                            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                            });
                        const __gotots_results_2 = base64__from_gostdlib.Encoding.DecodeString(__gotots_receiver_0 === void 0 ? void 0 :
                            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, base64Object);
                        const __gotots_results_3 = [__gotots_results_2[0], GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                            RuntimeSlice<uint8>,
                            GoInterface | undefined
                        ];
                        let decoded = __gotots_results_3[0];
                        let err: GoInterface | undefined = __gotots_results_3[1];
                        if (err === undefined) {
                            const __gotots_argument_0 = host;
                            const __gotots_conversion_1 = decoded;
                            let __gotots_conversion_2 = "";
                            for (let __gotots_conversion_3 = 0; __gotots_conversion_3 < __gotots_conversion_1.length; __gotots_conversion_3++) {
                                __gotots_conversion_2 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_1.get(__gotots_conversion_3)));
                            }
                            const __gotots_argument_1 = __gotots_conversion_2;
                            const __gotots_argument_2 = generatedFileName;
                            return convertDocumentToSourceMapper(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
                        }
                    }
                }
                mapFileName = "";
            }
        }
    }
    let possibleMapLocations = RuntimeSlice.nil<gostring>();
    if (mapFileName !== "") {
        possibleMapLocations = possibleMapLocations.append("", [mapFileName]);
    }
    possibleMapLocations = possibleMapLocations.append("", [generatedFileName + ".map"]);
    const __gotots_range_0 = possibleMapLocations;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let location = __gotots_range_value_0;
        let mapFileName__shadow_1 = GetNormalizedAbsolutePath__from_tspath(location, GetDirectoryPath__from_tspath(generatedFileName));
        {
            const __gotots_receiver_1 = host;
            const __gotots_argument_3 = mapFileName__shadow_1;
            const __gotots_results_4 = goInterfaceNonNil<Host>(__gotots_receiver_1).ReadFile(__gotots_argument_3);
            let mapFileContents = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                return convertDocumentToSourceMapper(host, mapFileContents, mapFileName__shadow_1);
            }
        }
    }
    return void 0;
}
export function convertDocumentToSourceMapper(host: Host | undefined, contents: gostring, mapFileName: gostring): tsonicTypeScriptRuntime.Location<DocumentPositionMapper> | undefined {
    let sourceMap: {
        value: RawSourceMap;
    } | undefined = tryParseRawSourceMap(contents);
    if (sourceMap === undefined || (sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Sources.length === 0 || (sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.File === "" || (sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Mappings === "") {
        return void 0;
    }
    if (Some$PointerTo_string((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourcesContent, (s: tsonicTypeScriptRuntime.Location<gostring> | undefined): bool => {
        return !(s === undefined);
    })) {
        return void 0;
    }
    return createDocumentPositionMapper(host, sourceMap, mapFileName);
}
export function tryParseRawSourceMap(contents: gostring): {
    value: RawSourceMap;
} | undefined {
    let sourceMap: {
        value: RawSourceMap;
    } | undefined = { value: new RawSourceMap(0, "", "", RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<gostring> | undefined>()) };
    const __gotots_conversion_4 = contents;
    const __gotots_conversion_5 = RuntimeSlice.make<uint8>(__gotots_conversion_4.length, null, 0);
    for (let __gotots_conversion_6 = 0; __gotots_conversion_6 < __gotots_conversion_4.length; __gotots_conversion_6++) {
        __gotots_conversion_5.set(__gotots_conversion_6, __gotots_conversion_4.charCodeAt(__gotots_conversion_6));
    }
    const __gotots_argument_5 = __gotots_conversion_5;
    const __gotots_argument_6 = new GoInterfaceAdapter(sourceMap);
    const __gotots_argument_7 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
    let err: GoInterface | undefined = Unmarshal__from_json__package_1(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
    if (!(err === undefined)) {
        return void 0;
    }
    if ((sourceMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Version !== 3) {
        return void 0;
    }
    return sourceMap;
}
export function tryGetSourceMappingURL(host: Host | undefined, fileName: gostring): gostring {
    const __gotots_receiver_2 = host;
    const __gotots_argument_4 = fileName;
    let lineInfo: {
        value: ECMALineInfo;
    } | undefined = goInterfaceNonNil<Host>(__gotots_receiver_2).GetECMALineInfo(__gotots_argument_4);
    return TryGetSourceMappingURL(lineInfo);
}
export function tryParseBase64Url(url: gostring): [
    gostring,
    bool
] {
    let parseableUrl: gostring = "";
    let isBase64Url: bool = false;
    let found = false;
    {
        const __gotots_results_6 = strings__from_gostdlib.CutPrefix(url, "data:");
        url = __gotots_results_6[0];
        found = __gotots_results_6[1];
        if (!found) {
            return ["", false];
        }
    }
    {
        const __gotots_results_8 = strings__from_gostdlib.CutPrefix(url, "application/json;");
        url = __gotots_results_8[0];
        found = __gotots_results_8[1];
        if (!found) {
            return ["", true];
        }
    }
    {
        const __gotots_results_10 = strings__from_gostdlib.CutPrefix(url, "charset=");
        url = __gotots_results_10[0];
        found = __gotots_results_10[1];
        if (found) {
            if (!strings__from_gostdlib.EqualFold(goStringSlice(url, 0, 6), "utf-8;")) {
                return ["", true];
            }
            url = goStringSlice(url, 6);
        }
    }
    {
        const __gotots_results_12 = strings__from_gostdlib.CutPrefix(url, "base64,");
        url = __gotots_results_12[0];
        found = __gotots_results_12[1];
        if (!found) {
            return ["", true];
        }
    }
    const __gotots_range_1 = url;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_1, __gotots_range_index_1);
        const __gotots_range_value_1 = __gotots_range_decode_0[0];
        let r = __gotots_range_value_1;
        __gotots_range_index_1 += __gotots_range_decode_0[1];
        if (!(IsASCIILetter__from_stringutil(r) || IsDigit__from_stringutil(r) || r === 43 || r === 47 || r === 61)) {
            return ["", true];
        }
    }
    return [url, true];
}
