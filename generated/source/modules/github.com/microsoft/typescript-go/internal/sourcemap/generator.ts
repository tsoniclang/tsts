import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Marshal as Marshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetRelativePathToDirectoryOrUrl as GetRelativePathToDirectoryOrUrl__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Clone$SliceOf_PointerTo_string$PointerTo_string, Clone$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$PointerTo_Named_sourcemap$RawSourceMap, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$contract as GoInterface$contract, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as base64__from_gostdlib from "@gotots/gostdlib/encoding/base64.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as provider_encoding_base64 from "@gotots/gostdlib/internal/facets/provider-encoding-base64.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class SourceIndex {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export class NameIndex {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function sourceIndexNotSet$constant(): SourceIndex {
    return new SourceIndex(-1);
}
export function nameIndexNotSet$constant(): NameIndex {
    return new NameIndex(-1);
}
export const notSet: int = -1;
export function notSetUTF16$constant(): UTF16Offset__from_core {
    return new UTF16Offset__from_core(-1);
}
export class Generator {
    declare private readonly $goType: void;
    public constructor(public pathOptions: ComparePathsOptions__from_tspath, public file: gostring, public sourceRoot: gostring, public sourcesDirectoryPath: gostring, public rawSources: RuntimeSlice<gostring>, public sources: RuntimeSlice<gostring>, public sourceToSourceIndexMap: GoMapValue<gostring, SourceIndex>, public sourcesContent: RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>, public names: RuntimeSlice<gostring>, public nameToNameIndexMap: GoMapValue<gostring, NameIndex>, public mappings: strings__from_gostdlib.Builder, public lastGeneratedLine: int, public lastGeneratedCharacter: UTF16Offset__from_core, public lastSourceIndex: SourceIndex, public lastSourceLine: int, public lastSourceCharacter: UTF16Offset__from_core, public lastNameIndex: NameIndex, public hasLast: bool, public pendingGeneratedLine: int, public pendingGeneratedCharacter: UTF16Offset__from_core, public pendingSourceIndex: SourceIndex, public pendingSourceLine: int, public pendingSourceCharacter: UTF16Offset__from_core, public pendingNameIndex: NameIndex, public hasPending: bool, public hasPendingSource: bool, public hasPendingName: bool) {
    }
    declare private readonly then?: never;
    static AddSource(gen: Generator | undefined, fileName: gostring): SourceIndex {
        let source = GetRelativePathToDirectoryOrUrl__from_tspath((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcesDirectoryPath, fileName, true, ComparePathsOptions__from_tspath.$copy((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pathOptions));
        const __gotots_results_0 = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceToSourceIndexMap.lookupOk(source);
        let sourceIndex = __gotots_results_0[0];
        let found = __gotots_results_0[1];
        if (!found) {
            sourceIndex = new SourceIndex((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sources.length);
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sources = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sources.append("", [source]);
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawSources = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawSources.append("", [fileName]);
            if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceToSourceIndexMap.isNil()) {
                (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceToSourceIndexMap = GoMap.make<gostring, SourceIndex>(new SourceIndex(0), 0, []);
            }
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceToSourceIndexMap.store(source, sourceIndex);
        }
        return sourceIndex;
    }
    static AddSourceMapping(gen: Generator | undefined, generatedLine: int, generatedCharacter: UTF16Offset__from_core, sourceIndex: SourceIndex, sourceLine: int, sourceCharacter: UTF16Offset__from_core): GoInterface | undefined {
        if (generatedLine < (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("generatedLine cannot backtrack"));
        }
        if (generatedCharacter.$value < 0) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("generatedCharacter cannot be negative"));
        }
        if (sourceIndex.$value < 0 || sourceIndex.$value >= (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sources.length) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("sourceIndex is out of range"));
        }
        if (sourceLine < 0) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("sourceLine cannot be negative"));
        }
        if (sourceCharacter.$value < 0) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("sourceCharacter cannot be negative"));
        }
        Generator.$go$private$sourcemap$addMapping(gen, generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndexNotSet$constant());
        return void 0;
    }
    static Base64DataURL(gen: Generator | undefined): gostring {
        const prefix$string: gostring = "data:application/json;base64,";
        let data = Generator.$go$private$sourcemap$bytes(gen);
        let sb = named_strings.StringsBuilderOperations.$zero();
        const sb$location = tsonicTypeScriptRuntime.boundLocation({}, () => sb, sb$next => sb = sb$next);
        const __gotots_receiver_1 = sb;
        const __gotots_binary_operand_0 = 29;
        const __gotots_conversion_3 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_receiver_0 = __gotots_conversion_3 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_3, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_3;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
            });
        const __gotots_binary_operand_1 = globalThis.Number(BigInt.asIntN(64, base64__from_gostdlib.Encoding.EncodedLen(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, BigInt.asIntN(64, goNumberToBigInt(data.length)))));
        const __gotots_argument_2 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
        strings__from_gostdlib.Builder.Grow(__gotots_receiver_1, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_2)));
        strings__from_gostdlib.Builder.WriteString(sb, prefix$string);
        const __gotots_conversion_4 = base64__from_gostdlib.state.StdEncoding;
        const __gotots_argument_3 = __gotots_conversion_4 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<base64__from_gostdlib.Encoding>(__gotots_conversion_4, (): base64__from_gostdlib.Encoding => {
                return __gotots_conversion_4;
            }, ($go$providerPointerValue: base64__from_gostdlib.Encoding): void => {
                provider_encoding_base64.Base64EncodingOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
            });
        const __gotots_argument_4 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(sb$location);
        const __gotots_conversion_5 = __gotots_argument_3;
        let encoder: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined = $goProviderProfileBridge$Named_io$WriteCloser$Using$Error$Direct$And$io_WriteCloser$Direct.$from(provider_encoding_base64.Base64NewEncoderDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(__gotots_conversion_5 === undefined ? undefined :
            (__gotots_conversion_5 as tsonicTypeScriptRuntime.Location<base64__from_gostdlib.Encoding>).value, GoProviderProfileBridge.$to(__gotots_argument_4), GoInterface$contract));
        const __gotots_receiver_2 = encoder;
        const __gotots_argument_5 = data;
        const __gotots_results_1 = goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error>(__gotots_receiver_2).Write(__gotots_argument_5);
        const __gotots_receiver_3 = encoder;
        goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error>(__gotots_receiver_3).Close();
        return strings__from_gostdlib.Builder.String(sb);
    }
    static RawSourceMap(gen: Generator | undefined): {
        value: RawSourceMap;
    } | undefined {
        Generator.$go$private$sourcemap$commitPendingMapping(gen);
        let sources = Clone$SliceOf_string$string((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sources);
        if (sources.isNil()) {
            sources = RuntimeSlice.literal<gostring>([]);
        }
        let names = Clone$SliceOf_string$string((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).names);
        if (names.isNil()) {
            names = RuntimeSlice.literal<gostring>([]);
        }
        return { value: new RawSourceMap(3, (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file, (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceRoot, sources, names, strings__from_gostdlib.Builder.String((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings), Clone$SliceOf_PointerTo_string$PointerTo_string((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcesContent)) };
    }
    static SetSourceContent(gen: Generator | undefined, sourceIndex: SourceIndex, content: gostring): GoInterface | undefined {
        const content$location = tsonicTypeScriptRuntime.boundLocation({}, () => content, content$next => content = content$next);
        if (sourceIndex.$value < 0 || sourceIndex.$value >= (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sources.length) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("sourceIndex is out of range"));
        }
        for (; (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcesContent.length <= sourceIndex.$value;) {
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcesContent = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcesContent.append(void 0, [void 0]);
        }
        (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourcesContent.set(sourceIndex.$value, content$location);
        return void 0;
    }
    static Sources(gen: Generator | undefined): RuntimeSlice<gostring> {
        return (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawSources;
    }
    static String(gen: Generator | undefined): gostring {
        const __gotots_conversion_0 = Generator.$go$private$sourcemap$bytes(gen);
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }
    static $go$private$sourcemap$addMapping(gen: Generator | undefined, generatedLine: int, generatedCharacter: UTF16Offset__from_core, sourceIndex: SourceIndex, sourceLine: int, sourceCharacter: UTF16Offset__from_core, nameIndex: NameIndex): void {
        if (Generator.$go$private$sourcemap$isNewGeneratedPosition(gen, generatedLine, generatedCharacter) || Generator.$go$private$sourcemap$isBacktrackingSourcePosition(gen, sourceIndex, sourceLine, sourceCharacter)) {
            Generator.$go$private$sourcemap$commitPendingMapping(gen);
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine = generatedLine;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedCharacter = generatedCharacter;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPendingSource = false;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPendingName = false;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPending = true;
        }
        if (!(sourceIndex.$value === sourceIndexNotSet$constant().$value) && sourceLine !== notSet && !(sourceCharacter.$value === notSetUTF16$constant().$value)) {
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceIndex = sourceIndex;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceLine = sourceLine;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceCharacter = sourceCharacter;
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPendingSource = true;
            if (!(nameIndex.$value === nameIndexNotSet$constant().$value)) {
                (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingNameIndex = nameIndex;
                (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPendingName = true;
            }
        }
    }
    static $go$private$sourcemap$appendBase64VLQ(gen: Generator | undefined, inValue: int): void {
        if (inValue < 0) {
            inValue = ((-inValue) << 1) + 1;
        }
        else {
            inValue = inValue << 1;
        }
        for (;;) {
            let currentDigit = inValue & 31;
            inValue = inValue >> 5;
            if (inValue > 0) {
                currentDigit = currentDigit | 32;
            }
            Generator.$go$private$sourcemap$appendMappingCharCode(gen, base64FormatEncode(currentDigit));
            if (inValue <= 0) {
                break;
            }
        }
    }
    static $go$private$sourcemap$appendMappingCharCode(gen: Generator | undefined, charCode: int32): void {
        strings__from_gostdlib.Builder.WriteRune((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings, charCode);
    }
    static $go$private$sourcemap$bytes(gen: Generator | undefined): RuntimeSlice<uint8> {
        const __gotots_results_2 = Marshal__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_sourcemap$RawSourceMap(Generator.RawSourceMap(gen)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let buf = __gotots_results_2[0];
        let err: GoInterface | undefined = __gotots_results_2[1];
        if (!(err === undefined)) {
            const __gotots_receiver_4 = err;
            const __gotots_argument_6 = new GoInterfaceAdapter(goInterfaceNonNil<GoInterface>(__gotots_receiver_4).Error());
            GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
        }
        return buf;
    }
    static $go$private$sourcemap$commitPendingMapping(gen: Generator | undefined): void {
        if (!Generator.$go$private$sourcemap$shouldCommitMapping(gen)) {
            return;
        }
        if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedLine < (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine) {
            for (;;) {
                Generator.$go$private$sourcemap$appendMappingCharCode(gen, 59);
                const __gotots_store_0 = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_0.lastGeneratedLine = __gotots_store_0.lastGeneratedLine + 1;
                if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedLine >= (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine) {
                    break;
                }
            }
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedCharacter = new UTF16Offset__from_core(0);
        }
        else {
            if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedLine !== (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine) {
                const __gotots_argument_0 = new GoInterfaceAdapter("generatedLine cannot backtrack");
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            }
            if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLast) {
                Generator.$go$private$sourcemap$appendMappingCharCode(gen, 44);
            }
        }
        Generator.$go$private$sourcemap$appendBase64VLQ(gen, ((void UTF16Offset__from_core,
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedCharacter.$value - (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedCharacter.$value) as number));
        (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedCharacter = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedCharacter;
        if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPendingSource) {
            Generator.$go$private$sourcemap$appendBase64VLQ(gen, ((void SourceIndex,
                (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceIndex.$value - (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceIndex.$value) as int));
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceIndex = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceIndex;
            Generator.$go$private$sourcemap$appendBase64VLQ(gen, (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceLine - (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceLine);
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceLine = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceLine;
            Generator.$go$private$sourcemap$appendBase64VLQ(gen, ((void UTF16Offset__from_core,
                (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceCharacter.$value - (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceCharacter.$value) as number));
            (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceCharacter = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceCharacter;
            if ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPendingName) {
                Generator.$go$private$sourcemap$appendBase64VLQ(gen, ((void NameIndex,
                    (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingNameIndex.$value - (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastNameIndex.$value) as int));
                (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastNameIndex = (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingNameIndex;
            }
        }
        (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLast = true;
    }
    static $go$private$sourcemap$isBacktrackingSourcePosition(gen: Generator | undefined, sourceIndex: SourceIndex, sourceLine: int, sourceCharacter: UTF16Offset__from_core): bool {
        return !(sourceIndex.$value === sourceIndexNotSet$constant().$value) && sourceLine !== notSet && !(sourceCharacter.$value === notSetUTF16$constant().$value) && (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceIndex.$value === sourceIndex.$value && ((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceLine > sourceLine || (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceLine === sourceLine && (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceCharacter.$value > sourceCharacter.$value);
    }
    static $go$private$sourcemap$isNewGeneratedPosition(gen: Generator | undefined, generatedLine: int, generatedCharacter: UTF16Offset__from_core): bool {
        return !(gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPending || (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine !== generatedLine || !((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedCharacter.$value === generatedCharacter.$value);
    }
    static $go$private$sourcemap$shouldCommitMapping(gen: Generator | undefined): bool {
        return (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasPending && (!(gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLast || (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedLine !== (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedLine || !((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastGeneratedCharacter.$value === (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingGeneratedCharacter.$value) || !((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceIndex.$value === (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceIndex.$value) || (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceLine !== (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceLine || !((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastSourceCharacter.$value === (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingSourceCharacter.$value) || !((gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastNameIndex.$value === (gen ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingNameIndex.$value));
    }
}
export class RawSourceMap {
    declare private readonly $goType: void;
    public constructor(public Version: int, public File: gostring, public SourceRoot: gostring, public Sources: RuntimeSlice<gostring>, public Names: RuntimeSlice<gostring>, public Mappings: gostring, public SourcesContent: RuntimeSlice<tsonicTypeScriptRuntime.Location<gostring> | undefined>) {
    }
    static $copy($source: RawSourceMap): RawSourceMap {
        return new RawSourceMap($source.Version, $source.File, $source.SourceRoot, $source.Sources, $source.Names, $source.Mappings, $source.SourcesContent);
    }
    declare private readonly then?: never;
}
export function NewGenerator(file: gostring, sourceRoot: gostring, sourcesDirectoryPath: gostring, options: ComparePathsOptions__from_tspath): Generator | undefined {
    return new Generator(ComparePathsOptions__from_tspath.$copy(options), file, sourceRoot, sourcesDirectoryPath, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), GoMap.nil<gostring, SourceIndex>(new SourceIndex(0)), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<gostring> | undefined>(), RuntimeSlice.nil<gostring>(), GoMap.nil<gostring, NameIndex>(new NameIndex(0)), named_strings.StringsBuilderOperations.$zero(), 0, new UTF16Offset__from_core(0), new SourceIndex(0), 0, new UTF16Offset__from_core(0), new NameIndex(0), false, 0, new UTF16Offset__from_core(0), new SourceIndex(0), 0, new UTF16Offset__from_core(0), new NameIndex(0), false, false, false);
}
export function base64FormatEncode(value: int): int32 {
    __gotots_control_target_0: {
        if (value >= 0 && value < 26) {
            return 65 + (value | 0);
        }
        else if (value >= 26 && value < 52) {
            return 97 + (value | 0) - 26;
        }
        else if (value >= 52 && value < 62) {
            return 48 + (value | 0) - 52;
        }
        else if (value === 62) {
            return 43;
        }
        else if (value === 63) {
            return 47;
        }
        else {
            const __gotots_argument_1 = new GoInterfaceAdapter("not a base64 value");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
