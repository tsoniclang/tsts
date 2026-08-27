import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { Logger } from "./logger.js";
import type { bool, gostring, int, uint64 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/state.js";
import { $goInterfaceAdapter$PointerTo_Named_logging$LogTree, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { formatTime } from "./logger.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class logEntry {
    declare private readonly $goType: void;
    public constructor(public seq: uint64, public time: time__from_gostdlib.Time, public message: gostring, public child: {
        value: LogTree;
    } | undefined) {
    }
    static $copy($source: logEntry): logEntry {
        return new logEntry($source.seq, named_time.TimeOperations.$copy($source.time), $source.message, $source.child);
    }
    static $equal($left: logEntry, $right: logEntry): bool {
        return $left.seq === $right.seq && named_time.TimeOperations.$equal($left.time, $right.time) && $left.message === $right.message &&
            $left.child
                ===
                    $right.child;
    }
    static $hash($source: logEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.seq));
        $hash = GoMapHash.mix($hash, named_time.TimeOperations.$hash($source.time));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.message));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.child));
        return $hash;
    }
    declare private readonly then?: never;
}
export function newLogEntry(child: {
    value: LogTree;
} | undefined, message: gostring): {
    value: logEntry;
} | undefined {
    return { value: new logEntry(atomic__from_gostdlib.Uint64.Add($state.seq, 1n), time__from_gostdlib.Now(), message, child) };
}
export class LogTree {
    declare private readonly $goType: void;
    public constructor(public name: gostring, public mu: sync__from_gostdlib.Mutex, public logs: RuntimeSlice<{
        value: logEntry;
    } | undefined>, public root: {
        value: LogTree;
    } | undefined, public level: int, public verbose: bool, public count: atomic__from_gostdlib.Int32, public stringLength: atomic__from_gostdlib.Int32) {
    }
    static $copy($source: LogTree): LogTree {
        return new LogTree($source.name, named_sync.SyncMutexOperations.$copy($source.mu), $source.logs, $source.root, $source.level, $source.verbose, named_sync_atomic.SyncAtomicInt32Operations.$copy($source.count), named_sync_atomic.SyncAtomicInt32Operations.$copy($source.stringLength));
    }
    declare private readonly then?: never;
    static Embed(c: {
        value: LogTree;
    } | undefined, logs: {
        value: LogTree;
    } | undefined): void {
        if (c === undefined) {
            return;
        }
        let count = atomic__from_gostdlib.Int32.Load((logs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.count);
        atomic__from_gostdlib.Int32.Add(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringLength, atomic__from_gostdlib.Int32.Load((logs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringLength) + count * ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.level | 0));
        atomic__from_gostdlib.Int32.Add(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.count, count);
        let log: {
            value: logEntry;
        } | undefined = newLogEntry(logs, (logs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name);
        LogTree.$go$private$logging$add(c, log);
    }
    static Error(c: {
        value: LogTree;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        LogTree.Log(c, msg);
    }
    static Errorf(c: {
        value: LogTree;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        LogTree.Logf(c, format, args);
    }
    static Fork(c: {
        value: LogTree;
    } | undefined, message: gostring): {
        value: LogTree;
    } | undefined {
        if (c === undefined) {
            return void 0;
        }
        let child: {
            value: LogTree;
        } | undefined = { value: new LogTree("", named_sync.SyncMutexOperations.$zero(), RuntimeSlice.nil<{
                value: logEntry;
            } | undefined>(), (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.level + 1, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbose, named_sync_atomic.SyncAtomicInt32Operations.$zero(), named_sync_atomic.SyncAtomicInt32Operations.$zero()) };
        let log: {
            value: logEntry;
        } | undefined = newLogEntry(child, message);
        LogTree.$go$private$logging$add(c, log);
        return child;
    }
    static Info(c: {
        value: LogTree;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        LogTree.Log(c, msg);
    }
    static Infof(c: {
        value: LogTree;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        LogTree.Logf(c, format, args);
    }
    static IsVerbose(c: {
        value: LogTree;
    } | undefined): bool {
        return (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbose;
    }
    static Log(c: {
        value: LogTree;
    } | undefined, message: RuntimeSlice<GoInterface | undefined>): void {
        if (c === undefined) {
            return;
        }
        let log: {
            value: logEntry;
        } | undefined = newLogEntry(void 0, fmt__from_gostdlib.Sprint(message));
        LogTree.$go$private$logging$add(c, log);
    }
    static Logf(c: {
        value: LogTree;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        if (c === undefined) {
            return;
        }
        let log: {
            value: logEntry;
        } | undefined = newLogEntry(void 0, fmt__from_gostdlib.Sprintf(format, args));
        LogTree.$go$private$logging$add(c, log);
    }
    static SetVerbose(c: {
        value: LogTree;
    } | undefined, verbose: bool): void {
        if (c === undefined) {
            return;
        }
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbose = verbose;
    }
    static String(c: {
        value: LogTree;
    } | undefined): gostring {
        if (!((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root
            ===
                c)) {
            const __gotots_argument_0 = new GoInterfaceAdapter("can only call String on root LogTree");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        let builder = named_strings.StringsBuilderOperations.$zero();
        const builder$location = tsonicTypeScriptRuntime.boundLocation({}, () => builder, builder$next => builder = builder$next);
        let header = fmt__from_gostdlib.Sprintf("======== %s ========\n", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.name)]));
        strings__from_gostdlib.Builder.Grow(builder, BigInt.asIntN(64, goNumberToBigInt(atomic__from_gostdlib.Int32.Load((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringLength) + header.length)));
        strings__from_gostdlib.Builder.WriteString(builder, header);
        LogTree.$go$private$logging$writeLogsRecursive(c, builder$location, "");
        return strings__from_gostdlib.Builder.String(builder);
    }
    static Verbose(c: {
        value: LogTree;
    } | undefined): Logger | undefined {
        if (c === undefined || !(c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbose) {
            return void 0;
        }
        return new $goInterfaceAdapter$PointerTo_Named_logging$LogTree(c);
    }
    static Warn(c: {
        value: LogTree;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        LogTree.Log(c, msg);
    }
    static Warnf(c: {
        value: LogTree;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        LogTree.Logf(c, format, args);
    }
    static $go$private$logging$add(c: {
        value: LogTree;
    } | undefined, log: {
        value: logEntry;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    atomic__from_gostdlib.Int32.Add(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringLength, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.level + 15 + (log ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message.length + 1 | 0);
                    atomic__from_gostdlib.Int32.Add(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.count, 1);
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_5 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_5, $go$recovery);
                    };
                    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logs = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logs.append(void 0, [log]);
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static $go$private$logging$writeLogsRecursive(c: {
        value: LogTree;
    } | undefined, builder: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, indent: gostring): void {
        const __gotots_range_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logs;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let log: {
                value: logEntry;
            } | undefined = __gotots_range_value_0;
            const __gotots_receiver_0 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_0 === void 0 ? void 0 :
                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, indent);
            const __gotots_receiver_1 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_1 === void 0 ? void 0 :
                (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, formatTime(named_time.TimeOperations.$copy((log ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.time)));
            const __gotots_receiver_2 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_2 === void 0 ? void 0 :
                (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, " ");
            const __gotots_receiver_3 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_3 === void 0 ? void 0 :
                (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, (log ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message);
            const __gotots_receiver_4 = builder;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_4 === void 0 ? void 0 :
                (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\n");
            if (!((log ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.child === undefined)) {
                LogTree.$go$private$logging$writeLogsRecursive((log ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.child, builder, indent + "\t");
            }
        }
    }
}
export function NewLogTree(name: gostring): {
    value: LogTree;
} | undefined {
    let lc: {
        value: LogTree;
    } | undefined = { value: new LogTree(name, named_sync.SyncMutexOperations.$zero(), RuntimeSlice.nil<{
            value: logEntry;
        } | undefined>(), void 0, 0, false, named_sync_atomic.SyncAtomicInt32Operations.$zero(), named_sync_atomic.SyncAtomicInt32Operations.$zero()) };
    (lc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root = lc;
    return lc;
}
