import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { CommandLineTesting } from "./compile.js";
import type { EmitInput } from "./emit.js";
import type * as runtime__from_gostdlib from "@gotots/gostdlib/runtime.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring, int, uint64 } from "@gotots/runtime/scalars.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { $goDeferred$Named_io$Writer_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$float64, $goInterfaceAdapter$string, $goInterfaceAdapter$uint64, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$OnStatisticsEnd$Named_io$Writer_to_void } from "../../../../../../../support/interface-methods.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { CompileTimes } from "./compile.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInt64, goIntegerDivide, goUint64 } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type tableRow$Storage = {
    name: gostring;
    value: gostring;
};
export class tableRow {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: tableRow$Storage) {
    }
    public static $storageOf($source: tableRow): tableRow$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: tableRow$Storage): tableRow {
        return new tableRow($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get value(): gostring {
        return this.$storage.value;
    }
    public set value($value: gostring) {
        this.$storage.value = $value;
    }
    static $zero(): tableRow {
        return new tableRow({
            name: "",
            value: ""
        });
    }
    static $copy($source: tableRow): tableRow {
        return new tableRow({
            name: $source.$storage.name,
            value: $source.$storage.value
        });
    }
    declare private readonly then?: never;
}
export class table {
    declare private readonly $goType: void;
    public constructor(public rows: RuntimeSlice<tableRow$Storage>) {
    }
    static $zero(): table {
        return new table(RuntimeSlice.nil<tableRow$Storage>());
    }
    declare private readonly then?: never;
    static $go$private$tsc$add(t: table | undefined, name: gostring, value: $goInterface$Interface_void | undefined): void {
        {
            const __gotots_results_0 = (($value: $goInterface$Interface_void | undefined): [
                time__from_gostdlib.Duration,
                boolean
            ] => {
                if (!$goInterfaceAdapter$Named_time$Duration.$is($value)) {
                    return [named_time.TimeDurationValueOperations.$wrap(0n), false];
                }
                return [$value.$go$value, true];
            })(value);
            let d = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                value = new $goInterfaceAdapter$string(formatDuration(d));
            }
        }
        const __gotots_slice_build_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rows;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void tableRow.$storageOf, (void tableRow.$fromStorage,
                {
                    name: name,
                    value: fmt__from_gostdlib.Sprint(RuntimeSlice.literal<$goInterface$Interface_void | undefined>([value]))
                })));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<tableRow$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, tableRow.$storageOf(tableRow.$copy(tableRow.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void tableRow.$storageOf, (void tableRow.$fromStorage,
                {
                    name: name,
                    value: fmt__from_gostdlib.Sprint(RuntimeSlice.literal<$goInterface$Interface_void | undefined>([value]))
                })));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, tableRow.$storageOf(tableRow.$zero()));
            }
        }
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rows = __gotots_slice_build_1;
    }
    static $go$private$tsc$print(t: table | undefined, w: GoInterface | undefined): void {
        let nameWidth = 0;
        let valueWidth = 0;
        const __gotots_range_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rows;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = tableRow.$copy(tableRow.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
            let r = __gotots_range_value_0;
            nameWidth = globalThis.Math.max(nameWidth, tableRow.$storageOf(r).name.length);
            valueWidth = globalThis.Math.max(valueWidth, tableRow.$storageOf(r).value.length);
        }
        const __gotots_range_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rows;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = tableRow.$copy(tableRow.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
            let r = __gotots_range_value_1;
            const __gotots_argument_1 = w;
            const __gotots_argument_2 = "%-*s %*s\n";
            const __gotots_argument_3 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(nameWidth + 1), new $goInterfaceAdapter$string(tableRow.$storageOf(r).name + ":"), new GoInterfaceAdapter(valueWidth), new $goInterfaceAdapter$string(tableRow.$storageOf(r).value)]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_1), __gotots_argument_2, __gotots_argument_3);
        }
    }
}
export function formatDuration(d: time__from_gostdlib.Duration): gostring {
    return fmt__from_gostdlib.Sprintf("%.3fs", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$float64(d.Seconds())]));
}
export class Statistics {
    declare private readonly $goType: void;
    public constructor(public isAggregate: bool, public Projects: int, public ProjectsBuilt: int, public TimestampUpdates: int, public files: int, public lines: int, public identifiers: int, public symbols: int, public types: int, public instantiations: int, public memoryUsed: uint64, public memoryAllocs: uint64, public compileTimes: tsonicTypeScriptRuntime.Location<CompileTimes> | undefined) {
    }
    static $zero(): Statistics {
        return new Statistics(false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0n, 0n, void 0);
    }
    static $copy($source: Statistics): Statistics {
        return new Statistics($source.isAggregate, $source.Projects, $source.ProjectsBuilt, $source.TimestampUpdates, $source.files, $source.lines, $source.identifiers, $source.symbols, $source.types, $source.instantiations, $source.memoryUsed, $source.memoryAllocs, $source.compileTimes);
    }
    static $equal($left: Statistics, $right: Statistics): bool {
        return $left.isAggregate === $right.isAggregate && $left.Projects === $right.Projects && $left.ProjectsBuilt === $right.ProjectsBuilt && $left.TimestampUpdates === $right.TimestampUpdates && $left.files === $right.files && $left.lines === $right.lines && $left.identifiers === $right.identifiers && $left.symbols === $right.symbols && $left.types === $right.types && $left.instantiations === $right.instantiations && $left.memoryUsed === $right.memoryUsed && $left.memoryAllocs === $right.memoryAllocs &&
            tsonicTypeScriptRuntime.sameLocation($left.compileTimes, $right.compileTimes);
    }
    static $hash($source: Statistics): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isAggregate));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Projects));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ProjectsBuilt));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.TimestampUpdates));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.files));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.lines));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.identifiers));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.symbols));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.types));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.instantiations));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.memoryUsed));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.memoryAllocs));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.compileTimes));
        return $hash;
    }
    declare private readonly then?: never;
    static Aggregate(s: tsonicTypeScriptRuntime.Location<Statistics> | undefined, stat: tsonicTypeScriptRuntime.Location<Statistics> | undefined): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.isAggregate = true;
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes === undefined) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes =
                tsonicTypeScriptRuntime.location<CompileTimes>(new CompileTimes(named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n)));
        }
        const __gotots_store_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_0.files = __gotots_store_0.files + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.files;
        const __gotots_store_1 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_1.lines = __gotots_store_1.lines + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.lines;
        const __gotots_store_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_2.identifiers = __gotots_store_2.identifiers + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.identifiers;
        const __gotots_store_3 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_3.symbols = __gotots_store_3.symbols + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.symbols;
        const __gotots_store_4 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_4.types = __gotots_store_4.types + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.types;
        const __gotots_store_5 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_5.instantiations = __gotots_store_5.instantiations + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.instantiations;
        const __gotots_store_6 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_6.memoryUsed = goUint64(__gotots_store_6.memoryUsed + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.memoryUsed);
        const __gotots_store_7 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value;
        __gotots_store_7.memoryAllocs = goUint64(__gotots_store_7.memoryAllocs + ((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.memoryAllocs);
        const __gotots_store_8 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_8.ConfigTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_8.ConfigTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ConfigTime)));
        const __gotots_store_9 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_9.BuildInfoReadTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_9.BuildInfoReadTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.BuildInfoReadTime)));
        const __gotots_store_10 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_10.ParseTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_10.ParseTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ParseTime)));
        const __gotots_store_11 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_11.bindTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_11.bindTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.bindTime)));
        const __gotots_store_12 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_12.checkTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_12.checkTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.checkTime)));
        const __gotots_store_13 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_13.emitTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_13.emitTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.emitTime)));
        const __gotots_store_14 = ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value;
        __gotots_store_14.ChangesComputeTime = named_time.TimeDurationValueOperations.$wrap(goInt64(named_time.TimeDurationValueOperations.$project(__gotots_store_14.ChangesComputeTime) + named_time.TimeDurationValueOperations.$project(((((stat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ChangesComputeTime)));
    }
    static Report(s: tsonicTypeScriptRuntime.Location<Statistics> | undefined, w: GoInterface | undefined, testing: CommandLineTesting | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (!(testing === undefined)) {
                        const __gotots_receiver_0 = testing;
                        const __gotots_argument_0 = w;
                        goInterfaceNonNil<CommandLineTesting>(__gotots_receiver_0).OnStatisticsStart(__gotots_argument_0);
                        const __gotots_receiver_1: CommandLineTesting = goInterfaceNonNil<CommandLineTesting>(testing);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$OnStatisticsEnd$Named_io$Writer_to_void, __gotots_receiver_1);
                        const __gotots_argument_1 = w;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? __gotots_receiver_1.OnStatisticsEnd(__gotots_argument_1) : __gotots_deferred_1($go$recovery, __gotots_receiver_1, __gotots_argument_1);
                        });
                    }
                    let table__shadow_1 = table.$zero();
                    let prefix = "";
                    if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.isAggregate) {
                        prefix = "Aggregate ";
                        table.$go$private$tsc$add(table__shadow_1, "Projects in scope", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.Projects));
                        table.$go$private$tsc$add(table__shadow_1, "Projects built", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.ProjectsBuilt));
                        table.$go$private$tsc$add(table__shadow_1, "Timestamps only updates", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.TimestampUpdates));
                    }
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Files", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.files));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Lines", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.lines));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Identifiers", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.identifiers));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Symbols", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.symbols));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Types", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.types));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Instantiations", new GoInterfaceAdapter(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.instantiations));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Memory used", new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("%vK", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint64(goUint64(goIntegerDivide(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.memoryUsed, 1024n)))]))));
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Memory allocs", new $goInterfaceAdapter$string(strconv__from_gostdlib.FormatUint(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.memoryAllocs, BigInt.asIntN(64, goNumberToBigInt(10)))));
                    if (!(named_time.TimeDurationValueOperations.$project(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ConfigTime) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n)))) {
                        table.$go$private$tsc$add(table__shadow_1, prefix + "Config time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ConfigTime));
                    }
                    if (!(named_time.TimeDurationValueOperations.$project(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.BuildInfoReadTime) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n)))) {
                        table.$go$private$tsc$add(table__shadow_1, prefix + "BuildInfo read time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.BuildInfoReadTime));
                    }
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Parse time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ParseTime));
                    if (!(named_time.TimeDurationValueOperations.$project(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.bindTime) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n)))) {
                        table.$go$private$tsc$add(table__shadow_1, prefix + "Bind time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.bindTime));
                    }
                    if (!(named_time.TimeDurationValueOperations.$project(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.checkTime) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n)))) {
                        table.$go$private$tsc$add(table__shadow_1, prefix + "Check time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.checkTime));
                    }
                    if (!(named_time.TimeDurationValueOperations.$project(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.emitTime) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n)))) {
                        table.$go$private$tsc$add(table__shadow_1, prefix + "Emit time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.emitTime));
                    }
                    if (!(named_time.TimeDurationValueOperations.$project(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ChangesComputeTime) === named_time.TimeDurationValueOperations.$project(named_time.TimeDurationValueOperations.$wrap(0n)))) {
                        table.$go$private$tsc$add(table__shadow_1, prefix + "Changes compute time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.ChangesComputeTime));
                    }
                    table.$go$private$tsc$add(table__shadow_1, prefix + "Total time", new $goInterfaceAdapter$Named_time$Duration(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.totalTime));
                    table.$go$private$tsc$print(table__shadow_1, w);
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static SetTotalTime(s: tsonicTypeScriptRuntime.Location<Statistics> | undefined, totalTime: time__from_gostdlib.Duration): void {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes === undefined) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes =
                tsonicTypeScriptRuntime.location<CompileTimes>(new CompileTimes(named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n)));
        }
        ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Statistics>).value.compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.totalTime = totalTime;
    }
}
export function statisticsFromProgram(input: EmitInput, memStats: tsonicTypeScriptRuntime.Location<runtime__from_gostdlib.MemStats> | undefined): tsonicTypeScriptRuntime.Location<Statistics> | undefined {
    return tsonicTypeScriptRuntime.location<Statistics>(new Statistics(false, 0, 0, 0, Program__from_compiler.SourceFiles(input.Program).length, Program__from_compiler.LineCount(input.Program), Program__from_compiler.IdentifierCount(input.Program), Program__from_compiler.SymbolCount(input.Program), Program__from_compiler.TypeCount(input.Program), Program__from_compiler.InstantiationCount(input.Program), ((memStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<runtime__from_gostdlib.MemStats>).value.Alloc, ((memStats ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<runtime__from_gostdlib.MemStats>).value.Mallocs, input.CompileTimes));
}
