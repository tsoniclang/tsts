import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tracer as Tracer__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { CompilerOptions as CompilerOptions__from_core, WorkGroup as WorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { Checker as Checker__from_checker, NewChecker as NewChecker__from_checker, NewTracer as NewTracer__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { NewWorkGroup as NewWorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/Concat.js";
import { Index$SliceOf_PointerTo_Named_checker$Checker$PointerTo_Named_checker$Checker } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$Program as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetChecker$Named_context$Context_PointerTo_Named_ast$SourceFile_to_PointerTo_Named_checker$Checker_void_to_void } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_PointerTo_Named_checker$Checker as GoMap } from "../../../../../../support/maps.js";
import { Program, SortAndDeduplicateDiagnostics } from "./program.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface CheckerPool extends GoInterfaceValue {
    GetChecker($argument0: GoInterface | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ];
}
export const CheckerPool$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetChecker$Named_context$Context_PointerTo_Named_ast$SourceFile_to_PointerTo_Named_checker$Checker_void_to_void]);
export function CheckerPool$is(value: GoInterfaceValue | undefined): value is CheckerPool {
    return value !== undefined && value.$go$implements(CheckerPool$contract);
}
export class checkerPool {
    declare private readonly $goType: void;
    public constructor(public program: {
        value: Program;
    } | undefined, public tracing: {
        value: Tracing__from_tracing;
    } | undefined, public createCheckersOnce: sync__from_gostdlib.Once, public checkers: RuntimeSlice<{
        value: Checker__from_checker;
    } | undefined>, public locks: RuntimeSlice<tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex> | undefined>, public fileAssociations: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, {
        value: Checker__from_checker;
    } | undefined>) {
    }
    static $copy($source: checkerPool): checkerPool {
        return new checkerPool($source.program, $source.tracing, named_sync.SyncOnceOperations.$copy($source.createCheckersOnce), $source.checkers, $source.locks, $source.fileAssociations);
    }
    declare private readonly then?: never;
    static GetChecker(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        if (!(file === undefined)) {
            return checkerPool.$go$private$compiler$getCheckerForFileExclusive(p, ctx, file);
        }
        checkerPool.$go$private$compiler$createCheckers(p);
        let c: {
            value: Checker__from_checker;
        } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(0);
        const __gotots_receiver_12 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(0);
        sync__from_gostdlib.Mutex.Lock(__gotots_receiver_12 === void 0 ? void 0 :
            (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
        return [c, sync__from_gostdlib.OnceFunc((): void => {
                const __gotots_receiver_13 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(0);
                sync__from_gostdlib.Mutex.Unlock(__gotots_receiver_13 === void 0 ? void 0 :
                    (__gotots_receiver_13 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
            })];
    }
    static GetGlobalDiagnostics(p: {
        value: checkerPool;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        checkerPool.$go$private$compiler$createCheckers(p);
        let globalDiagnostics = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.length, null, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>());
        checkerPool.$go$private$compiler$forEachCheckerParallel(p, (idx: int, checker__shadow_1: {
            value: Checker__from_checker;
        } | undefined): void => {
            globalDiagnostics.set(idx, Checker__from_checker.GetGlobalDiagnostics(checker__shadow_1));
        });
        return SortAndDeduplicateDiagnostics(Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(globalDiagnostics));
    }
    static $go$private$compiler$createCheckers(p: {
        value: checkerPool;
    } | undefined): void {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.createCheckersOnce, (): void => {
            let checkerCount = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.length;
            let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program.SingleThreaded((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program));
            const __gotots_range_1 = checkerCount;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
                const __gotots_range_value_2 = __gotots_range_index_1;
                let i = __gotots_range_value_2;
                const __gotots_receiver_5 = wg;
                const __gotots_argument_3 = (): void => {
                    let tracer: {
                        value: Tracer__from_checker;
                    } | undefined = void 0;
                    if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracing === undefined)) {
                        tracer = NewTracer__from_checker((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracing, i);
                    }
                    const __gotots_store_0: checkerPool["checkers"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers;
                    const __gotots_store_1 = i;
                    const __gotots_store_2: checkerPool["locks"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks;
                    const __gotots_store_3 = i;
                    const __gotots_results_0 = NewChecker__from_checker(new GoInterfaceAdapter((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program), tracer);
                    __gotots_store_0.set(__gotots_store_1, __gotots_results_0[0]);
                    __gotots_store_2.set(__gotots_store_3, __gotots_results_0[1]);
                };
                goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_5).Queue(__gotots_argument_3);
            }
            const __gotots_receiver_6 = wg;
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_6).RunAndWait();
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations = GoMap.make(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files.length, []);
            const __gotots_range_2 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_3 = __gotots_range_index_2;
                const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
                let i = __gotots_range_value_3;
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_4;
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.store(file, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(goNumberIntegerRemainder(i, checkerCount)));
            }
        });
    }
    static $go$private$compiler$forEachCheckerGroupDo(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, files: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, singleThreaded: bool, cb: (($0: {
        value: Checker__from_checker;
    } | undefined, $1: int, $2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => void) | undefined): void {
        checkerPool.$go$private$compiler$createCheckers(p);
        let checkerCount = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.length;
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(singleThreaded);
        const __gotots_range_3 = checkerCount;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3; __gotots_range_index_3++) {
            const __gotots_range_value_5 = __gotots_range_index_3;
            let checkerIdx = __gotots_range_value_5;
            const __gotots_receiver_10 = wg;
            const __gotots_argument_7 = (): void => {
                let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_1: GoPanic | undefined = undefined;
                try {
                    try {
                        __gotots_return_block_1: {
                            const __gotots_receiver_7 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(checkerIdx);
                            sync__from_gostdlib.Mutex.Lock(__gotots_receiver_7 === void 0 ? void 0 :
                                (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                            const __gotots_receiver_8 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(checkerIdx);
                            const __gotots_receiver_9 = __gotots_receiver_8 === void 0 ? void 0 :
                                (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                            __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_9, $go$recovery);
                            };
                            const __gotots_range_4 = files;
                            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                                const __gotots_range_value_6 = __gotots_range_index_4;
                                const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_4);
                                let i = __gotots_range_value_6;
                                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_7;
                                {
                                    let checker__shadow_1: {
                                        value: Checker__from_checker;
                                    } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(checkerIdx);
                                    if (checker__shadow_1
                                        ===
                                            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.lookup(file)) {
                                        const __gotots_callee_4 = cb;
                                        const __gotots_argument_4 = checker__shadow_1;
                                        const __gotots_argument_5 = i;
                                        const __gotots_argument_6 = file;
                                        (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
                                    }
                                }
                            }
                        }
                    }
                    catch (__gotots_caught_3) {
                        if (!(__gotots_caught_3 instanceof GoPanic)) {
                            throw __gotots_caught_3;
                        }
                        __gotots_panic_1 = __gotots_caught_3;
                    }
                }
                finally {
                    if (__gotots_deferred_1 !== undefined) {
                        const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                        try {
                            __gotots_deferred_1(__gotots_recovery_1);
                            if (__gotots_recovery_1.recovered()) {
                                __gotots_panic_1 = undefined;
                            }
                        }
                        catch (__gotots_caught_2) {
                            if (!(__gotots_caught_2 instanceof GoPanic)) {
                                throw __gotots_caught_2;
                            }
                            __gotots_panic_1 = __gotots_caught_2;
                        }
                    }
                }
                if (__gotots_panic_1 !== undefined) {
                    throw __gotots_panic_1;
                }
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_10).Queue(__gotots_argument_7);
        }
        const __gotots_receiver_11 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_11).RunAndWait();
    }
    static $go$private$compiler$forEachCheckerParallel(p: {
        value: checkerPool;
    } | undefined, cb: (($0: int, $1: {
        value: Checker__from_checker;
    } | undefined) => void) | undefined): void {
        checkerPool.$go$private$compiler$createCheckers(p);
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program.SingleThreaded((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program));
        const __gotots_range_0: checkerPool["checkers"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let idx = __gotots_range_value_0;
            let checker__shadow_1: {
                value: Checker__from_checker;
            } | undefined = __gotots_range_value_1;
            const __gotots_receiver_3 = wg;
            const __gotots_argument_2 = (): void => {
                let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_0: GoPanic | undefined = undefined;
                try {
                    try {
                        __gotots_return_block_0: {
                            const __gotots_receiver_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(idx);
                            sync__from_gostdlib.Mutex.Lock(__gotots_receiver_0 === void 0 ? void 0 :
                                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
                            const __gotots_receiver_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(idx);
                            const __gotots_receiver_2 = __gotots_receiver_1 === void 0 ? void 0 :
                                (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value;
                            __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_2, $go$recovery);
                            };
                            const __gotots_callee_0 = cb;
                            const __gotots_argument_0 = idx;
                            const __gotots_argument_1 = checker__shadow_1;
                            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
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
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_3).Queue(__gotots_argument_2);
        }
        const __gotots_receiver_4 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_4).RunAndWait();
    }
    static $go$private$compiler$getCheckerForFileExclusive(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        checkerPool.$go$private$compiler$createCheckers(p);
        let c: {
            value: Checker__from_checker;
        } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.lookup(file);
        let idx = Index$SliceOf_PointerTo_Named_checker$Checker$PointerTo_Named_checker$Checker((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers, c);
        const __gotots_receiver_3 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(idx);
        sync__from_gostdlib.Mutex.Lock(__gotots_receiver_3 === void 0 ? void 0 :
            (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
        return [c, sync__from_gostdlib.OnceFunc((): void => {
                const __gotots_receiver_4 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locks.get(idx);
                sync__from_gostdlib.Mutex.Unlock(__gotots_receiver_4 === void 0 ? void 0 :
                    (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex>).value);
            })];
    }
    static $go$private$compiler$getCheckerForFileNonExclusive(p: {
        value: checkerPool;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        checkerPool.$go$private$compiler$createCheckers(p);
        return [(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.lookup(file), noop];
    }
    static $go$private$compiler$getCheckerNonExclusive(p: {
        value: checkerPool;
    } | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        checkerPool.$go$private$compiler$createCheckers(p);
        return [(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(0), noop];
    }
}
export function newCheckerPoolWithTracing(program: {
    value: Program;
} | undefined, tr: {
    value: Tracing__from_tracing;
} | undefined): {
    value: checkerPool;
} | undefined {
    let checkerCount = 4;
    if (Program.SingleThreaded(program)) {
        checkerCount = 1;
    }
    else {
        let c: tsonicTypeScriptRuntime.Location<int> | undefined = (Program.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Checkers;
        if (!(c === undefined)) {
            checkerCount =
                ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
        }
    }
    checkerCount = globalThis.Math.max(globalThis.Math.min(checkerCount, (program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files.length, 256), 1);
    let pool: {
        value: checkerPool;
    } | undefined = { value: new checkerPool(program, tr, named_sync.SyncOnceOperations.$zero(), RuntimeSlice.make<{
            value: Checker__from_checker;
        } | undefined>(checkerCount, null, void 0), RuntimeSlice.make<tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Mutex> | undefined>(checkerCount, null, void 0), GoMap.nil()) };
    return pool;
}
export function noop(): void {
}
