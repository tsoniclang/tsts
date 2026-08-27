import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { Arena as Arena__from_core, UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Arena$New$Named_sourcemap$Mapping } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Arena$New.js";
import { IfElse$Named_core$UTF16Offset, IfElse$Named_sourcemap$NameIndex, IfElse$Named_sourcemap$SourceIndex, IfElse$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { NameIndex, SourceIndex } from "./generator.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export type Mapping$Storage = {
    GeneratedLine: int;
    GeneratedCharacter: int;
    SourceIndex: int;
    SourceLine: int;
    SourceCharacter: int;
    NameIndex: int;
};
export class Mapping implements GoContainerStoredValue<Mapping$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Mapping$Storage) {
    }
    public static $storageOf($source: Mapping): Mapping$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Mapping$Storage): Mapping {
        return new Mapping($source);
    }
    public get GeneratedLine(): int {
        return this.$storage.GeneratedLine;
    }
    public set GeneratedLine($value: int) {
        this.$storage.GeneratedLine = $value;
    }
    public get GeneratedCharacter(): UTF16Offset__from_core {
        return new UTF16Offset__from_core(this.$storage.GeneratedCharacter);
    }
    public set GeneratedCharacter($value: UTF16Offset__from_core) {
        this.$storage.GeneratedCharacter = $value.$value;
    }
    public get SourceIndex(): SourceIndex {
        return new SourceIndex(this.$storage.SourceIndex);
    }
    public set SourceIndex($value: SourceIndex) {
        this.$storage.SourceIndex = $value.$value;
    }
    public get SourceLine(): int {
        return this.$storage.SourceLine;
    }
    public set SourceLine($value: int) {
        this.$storage.SourceLine = $value;
    }
    public get SourceCharacter(): UTF16Offset__from_core {
        return new UTF16Offset__from_core(this.$storage.SourceCharacter);
    }
    public set SourceCharacter($value: UTF16Offset__from_core) {
        this.$storage.SourceCharacter = $value.$value;
    }
    public get NameIndex(): NameIndex {
        return new NameIndex(this.$storage.NameIndex);
    }
    public set NameIndex($value: NameIndex) {
        this.$storage.NameIndex = $value.$value;
    }
    declare readonly [$goContainerStorageType]: Mapping$Storage;
    static $zero(): Mapping {
        return new Mapping({
            GeneratedLine: 0,
            GeneratedCharacter: ((void UTF16Offset__from_core,
                0) as number),
            SourceIndex: ((void SourceIndex,
                0) as number),
            SourceLine: 0,
            SourceCharacter: ((void UTF16Offset__from_core,
                0) as number),
            NameIndex: ((void NameIndex,
                0) as number)
        });
    }
    static $copy($source: Mapping): Mapping {
        return new Mapping({
            GeneratedLine: $source.$storage.GeneratedLine,
            GeneratedCharacter: ((void UTF16Offset__from_core,
                $source.$storage.GeneratedCharacter) as number),
            SourceIndex: ((void SourceIndex,
                $source.$storage.SourceIndex) as number),
            SourceLine: $source.$storage.SourceLine,
            SourceCharacter: ((void UTF16Offset__from_core,
                $source.$storage.SourceCharacter) as number),
            NameIndex: ((void NameIndex,
                $source.$storage.NameIndex) as number)
        });
    }
    declare private readonly then?: never;
    static IsSourceMapping(m: tsonicTypeScriptRuntime.Location<Mapping> | undefined): bool {
        return !(((void SourceIndex,
            Mapping.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceIndex) as number)
            === MissingSource$constant().$value) && Mapping.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceLine !== MissingLineOrColumn && !(((void UTF16Offset__from_core,
            Mapping.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceCharacter) as number)
            === MissingUTF16Column$constant().$value);
    }
}
export function MissingSource$constant(): SourceIndex {
    return new SourceIndex(-1);
}
export function MissingName$constant(): NameIndex {
    return new NameIndex(-1);
}
export const MissingLineOrColumn: int = -1;
export function MissingUTF16Column$constant(): UTF16Offset__from_core {
    return new UTF16Offset__from_core(-1);
}
export class MappingsDecoder {
    declare private readonly $goType: void;
    public constructor(public mappings: gostring, public done: bool, public pos: int, public generatedLine: int, public generatedCharacter: UTF16Offset__from_core, public sourceIndex: SourceIndex, public sourceLine: int, public sourceCharacter: UTF16Offset__from_core, public nameIndex: NameIndex, public error: GoInterface | undefined, public mappingArena: Arena__from_core<Mapping>) {
    }
    declare private readonly then?: never;
    static Error(d: MappingsDecoder | undefined): GoInterface | undefined {
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).error;
    }
    static Next(d: MappingsDecoder | undefined): [
        tsonicTypeScriptRuntime.Location<Mapping> | undefined,
        bool
    ] {
        let value: tsonicTypeScriptRuntime.Location<Mapping> | undefined = void 0;
        let done: bool = false;
        for (; !(d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done && (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos < (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings.length;) {
            let ch = goStringIndex((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos);
            if (ch === 59) {
                const __gotots_store_0 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_0.generatedLine = __gotots_store_0.generatedLine + 1;
                (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedCharacter = new UTF16Offset__from_core(0);
                const __gotots_store_1 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_1.pos = __gotots_store_1.pos + 1;
                continue;
            }
            if (ch === 44) {
                const __gotots_store_2 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_2.pos = __gotots_store_2.pos + 1;
                continue;
            }
            let hasSource = false;
            let hasName = false;
            const __gotots_store_3 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_3.generatedCharacter = new UTF16Offset__from_core(__gotots_store_3.generatedCharacter.$value +
                ((void UTF16Offset__from_core,
                    MappingsDecoder.$go$private$sourcemap$base64VLQFormatDecode(d)) as number));
            if (MappingsDecoder.$go$private$sourcemap$hasReportedError(d)) {
                return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
            }
            if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedCharacter.$value < 0) {
                return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Invalid generatedCharacter found");
            }
            if (!MappingsDecoder.$go$private$sourcemap$isSourceMappingSegmentEnd(d)) {
                hasSource = true;
                const __gotots_store_4 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_4.sourceIndex = new SourceIndex(__gotots_store_4.sourceIndex.$value +
                    ((void SourceIndex,
                        MappingsDecoder.$go$private$sourcemap$base64VLQFormatDecode(d)) as number));
                if (MappingsDecoder.$go$private$sourcemap$hasReportedError(d)) {
                    return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
                }
                if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex.$value < 0) {
                    return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Invalid sourceIndex found");
                }
                if (MappingsDecoder.$go$private$sourcemap$isSourceMappingSegmentEnd(d)) {
                    return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Unsupported Format: No entries after sourceIndex");
                }
                const __gotots_store_5 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_5.sourceLine = __gotots_store_5.sourceLine + MappingsDecoder.$go$private$sourcemap$base64VLQFormatDecode(d);
                if (MappingsDecoder.$go$private$sourcemap$hasReportedError(d)) {
                    return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
                }
                if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceLine < 0) {
                    return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Invalid sourceLine found");
                }
                if (MappingsDecoder.$go$private$sourcemap$isSourceMappingSegmentEnd(d)) {
                    return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Unsupported Format: No entries after sourceLine");
                }
                const __gotots_store_6 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_6.sourceCharacter = new UTF16Offset__from_core(__gotots_store_6.sourceCharacter.$value +
                    ((void UTF16Offset__from_core,
                        MappingsDecoder.$go$private$sourcemap$base64VLQFormatDecode(d)) as number));
                if (MappingsDecoder.$go$private$sourcemap$hasReportedError(d)) {
                    return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
                }
                if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceCharacter.$value < 0) {
                    return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Invalid sourceCharacter found");
                }
                if (!MappingsDecoder.$go$private$sourcemap$isSourceMappingSegmentEnd(d)) {
                    hasName = true;
                    const __gotots_store_7 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_store_7.nameIndex = new NameIndex(__gotots_store_7.nameIndex.$value +
                        ((void NameIndex,
                            MappingsDecoder.$go$private$sourcemap$base64VLQFormatDecode(d)) as number));
                    if (MappingsDecoder.$go$private$sourcemap$hasReportedError(d)) {
                        return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
                    }
                    if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nameIndex.$value < 0) {
                        return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Invalid nameIndex found");
                    }
                    if (!MappingsDecoder.$go$private$sourcemap$isSourceMappingSegmentEnd(d)) {
                        return MappingsDecoder.$go$private$sourcemap$setErrorAndStopIterating(d, "Unsupported Error Format: Entries after nameIndex");
                    }
                }
            }
            return [MappingsDecoder.$go$private$sourcemap$captureMapping(d, hasSource, hasName), false];
        }
        return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
    }
    static Values(d: MappingsDecoder | undefined): iter__from_gostdlib.Seq<tsonicTypeScriptRuntime.Location<Mapping> | undefined> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: tsonicTypeScriptRuntime.Location<Mapping> | undefined) => bool) | undefined): void => {
            {
                const __gotots_results_0 = MappingsDecoder.Next(d);
                let value: tsonicTypeScriptRuntime.Location<Mapping> | undefined = __gotots_results_0[0];
                let done = __gotots_results_0[1];
                let __gotots_for_first_0 = true;
                for (;;) {
                    if (__gotots_for_first_0) {
                        __gotots_for_first_0 = false;
                    }
                    else {
                        const __gotots_results_1 = MappingsDecoder.Next(d);
                        value = __gotots_results_1[0];
                        done = __gotots_results_1[1];
                    }
                    if (!!done) {
                        break;
                    }
                    {
                        const __gotots_callee_0 = __go_yield;
                        const __gotots_argument_0 = value;
                        if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0)) {
                            break;
                        }
                    }
                }
            }
        });
    }
    static $go$private$sourcemap$base64VLQFormatDecode(d: MappingsDecoder | undefined): int {
        let moreDigits = true;
        let shiftCount = 0;
        let value = 0;
        {
            let __gotots_for_first_1 = true;
            for (;;) {
                if (__gotots_for_first_1) {
                    __gotots_for_first_1 = false;
                }
                else {
                    const __gotots_store_8 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_store_8.pos = __gotots_store_8.pos + 1;
                }
                if (!moreDigits) {
                    break;
                }
                {
                    if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos >= (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings.length) {
                        MappingsDecoder.$go$private$sourcemap$setError(d, "Error in decoding base64VLQFormatDecode, past the mapping string");
                        return -1;
                    }
                    let currentByte = base64FormatDecode(goStringIndex((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos));
                    if (currentByte === -1) {
                        MappingsDecoder.$go$private$sourcemap$setError(d, "Invalid character in VLQ");
                        return -1;
                    }
                    moreDigits = (currentByte & 32) !== 0;
                    value = value | (shiftCount < 0 ? GoPanic.raiseRuntime("negative shift amount") : shiftCount >= 64 ? 0 : (currentByte & 31) << shiftCount);
                    shiftCount += 5;
                }
            }
        }
        if ((value & 1) === 0) {
            value = value >> 1;
        }
        else {
            value = value >> 1;
            value = -value;
        }
        return value;
    }
    static $go$private$sourcemap$captureMapping(d: MappingsDecoder | undefined, hasSource: bool, hasName: bool): tsonicTypeScriptRuntime.Location<Mapping> | undefined {
        const __gotots_store_9 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let mapping: tsonicTypeScriptRuntime.Location<Mapping> | undefined = Arena$New$Named_sourcemap$Mapping(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "mappingArena"));
        Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).GeneratedLine = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedLine;
        Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).GeneratedCharacter = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).generatedCharacter.$value;
        Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceIndex = IfElse$Named_sourcemap$SourceIndex(hasSource, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceIndex, MissingSource$constant()).$value;
        Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceLine = IfElse$int(hasSource, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceLine, MissingLineOrColumn);
        Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).SourceCharacter = IfElse$Named_core$UTF16Offset(hasSource, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceCharacter, MissingUTF16Column$constant()).$value;
        Mapping.$storageOf(((mapping ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Mapping>).value).NameIndex = IfElse$Named_sourcemap$NameIndex(hasName, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nameIndex, MissingName$constant()).$value;
        return mapping;
    }
    static $go$private$sourcemap$hasReportedError(d: MappingsDecoder | undefined): bool {
        return !((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).error === undefined);
    }
    static $go$private$sourcemap$isSourceMappingSegmentEnd(d: MappingsDecoder | undefined): bool {
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos === (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings.length || goStringIndex((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos) === 44 || goStringIndex((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mappings, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos) === 59;
    }
    static $go$private$sourcemap$setError(d: MappingsDecoder | undefined, err: gostring): void {
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).error = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New(err));
    }
    static $go$private$sourcemap$setErrorAndStopIterating(d: MappingsDecoder | undefined, err: gostring): [
        tsonicTypeScriptRuntime.Location<Mapping> | undefined,
        bool
    ] {
        MappingsDecoder.$go$private$sourcemap$setError(d, err);
        return MappingsDecoder.$go$private$sourcemap$stopIterating(d);
    }
    static $go$private$sourcemap$stopIterating(d: MappingsDecoder | undefined): [
        tsonicTypeScriptRuntime.Location<Mapping> | undefined,
        bool
    ] {
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).done = true;
        return [void 0, true];
    }
}
export function DecodeMappings(mappings: gostring): MappingsDecoder | undefined {
    return new MappingsDecoder(mappings, false, 0, 0, new UTF16Offset__from_core(0), new SourceIndex(0), 0, new UTF16Offset__from_core(0), new NameIndex(0), void 0, Arena__from_core.$zero<Mapping>());
}
export function base64FormatDecode(ch: uint8): int {
    __gotots_control_target_0: {
        if (ch >= 65 && ch <= 90) {
            return ch - 65;
        }
        else if (ch >= 97 && ch <= 122) {
            return ch - 97 + 26;
        }
        else if (ch >= 48 && ch <= 57) {
            return ch - 48 + 52;
        }
        else if (ch === 43) {
            return 62;
        }
        else if (ch === 47) {
            return 63;
        }
        else {
            return -1;
        }
    }
}
