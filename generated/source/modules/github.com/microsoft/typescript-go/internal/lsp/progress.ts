import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Null as Null__from_lsproto, Null$Storage as Null__from_lsproto$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Server } from "./server.js";
import type { GoReceiveChannel } from "@gotots/runtime/channel.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { $state as $state__lsproto, IntegerOrString as IntegerOrString__from_lsproto, NotificationInfo as NotificationInfo__from_lsproto, ProgressParams as ProgressParams__from_lsproto, RequestInfo as RequestInfo__from_lsproto, StringLiteralBegin as StringLiteralBegin__from_lsproto, StringLiteralEnd as StringLiteralEnd__from_lsproto, StringLiteralReport as StringLiteralReport__from_lsproto, WorkDoneProgressBeginOrReportOrEnd as WorkDoneProgressBeginOrReportOrEnd__from_lsproto, WorkDoneProgressBegin as WorkDoneProgressBegin__from_lsproto, WorkDoneProgressCreateParams as WorkDoneProgressCreateParams__from_lsproto, WorkDoneProgressEnd as WorkDoneProgressEnd__from_lsproto, WorkDoneProgressReport as WorkDoneProgressReport__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { OrderedMap$Delete$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Delete.js";
import { OrderedMap$GetOrZero$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$GetOrZero.js";
import { OrderedMap$Keys$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { OrderedMap$Set$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { FirstOrNilSeq$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNilSeq.js";
import { sendClientRequestFireAndForget$PointerTo_Named_lsproto$WorkDoneProgressCreateParams$Named_lsproto$Null } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/sendClientRequestFireAndForget.js";
import { sendNotification$PointerTo_Named_lsproto$ProgressParams } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/sendNotification.js";
import { $goInterfaceAdapter$int, $goInterfaceAdapter$PointerTo_Named_lsp$serverProgressReporter as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$lsp$createWorkDoneProgress$string_to_void, $goInterfaceMethod$lsp$done$void_to_ReceiveChannelOf_Struct_void, $goInterfaceMethod$lsp$localize$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_string, $goInterfaceMethod$lsp$sendProgress$string_Named_lsproto$WorkDoneProgressBeginOrReportOrEnd_to_void } from "../../../../../../support/interface-methods.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap, GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class progressEvent {
    declare private readonly $goType: void;
    public constructor(public message: {
        value: Message__from_diagnostics;
    } | undefined, public args: RuntimeSlice<GoInterface | undefined>, public finish: bool) {
    }
    static $zero(): progressEvent {
        return new progressEvent(void 0, RuntimeSlice.nil<GoInterface | undefined>(), false);
    }
    static $copy($source: progressEvent): progressEvent {
        return new progressEvent($source.message, $source.args, $source.finish);
    }
    declare private readonly then?: never;
}
export interface progressReporter extends GoInterfaceValue {
    $go$private$lsp$createWorkDoneProgress($argument0: gostring): void;
    $go$private$lsp$done(): GoReceiveChannel<GoEmptyStruct> | undefined;
    $go$private$lsp$localize($argument0: {
        value: Message__from_diagnostics;
    } | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): gostring;
    $go$private$lsp$sendProgress($argument0: gostring, $argument1: WorkDoneProgressBeginOrReportOrEnd__from_lsproto): void;
}
export const progressReporter$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$lsp$createWorkDoneProgress$string_to_void, $goInterfaceMethod$lsp$done$void_to_ReceiveChannelOf_Struct_void, $goInterfaceMethod$lsp$localize$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_string, $goInterfaceMethod$lsp$sendProgress$string_Named_lsproto$WorkDoneProgressBeginOrReportOrEnd_to_void]);
export function progressReporter$is(value: GoInterfaceValue | undefined): value is progressReporter {
    return value !== undefined && value.$go$implements(progressReporter$contract);
}
export class serverProgressReporter {
    declare private readonly $goType: void;
    public constructor(public server: {
        value: Server;
    } | undefined) {
    }
    static $copy($source: serverProgressReporter): serverProgressReporter {
        return new serverProgressReporter($source.server);
    }
    static $equal($left: serverProgressReporter, $right: serverProgressReporter): bool {
        return $left.server
            ===
                $right.server;
    }
    static $hash($source: serverProgressReporter): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.server));
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$lsp$createWorkDoneProgress(r: {
        value: serverProgressReporter;
    } | undefined, token: gostring): void {
        const token$location = tsonicTypeScriptRuntime.boundLocation({}, () => token, token$next => token = token$next);
        sendClientRequestFireAndForget$PointerTo_Named_lsproto$WorkDoneProgressCreateParams$Named_lsproto$Null((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server, RequestInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined, Null__from_lsproto>(RequestInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<WorkDoneProgressCreateParams__from_lsproto> | undefined, Null__from_lsproto>($state__lsproto.WindowWorkDoneProgressCreateInfo)), tsonicTypeScriptRuntime.location<WorkDoneProgressCreateParams__from_lsproto>(new WorkDoneProgressCreateParams__from_lsproto(new IntegerOrString__from_lsproto(void 0, token$location))));
    }
    static $go$private$lsp$done(r: {
        value: serverProgressReporter;
    } | undefined): GoReceiveChannel<GoEmptyStruct> | undefined {
        const __gotots_receiver_10 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
        return goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_10).Done();
    }
    static $go$private$lsp$localize(r: {
        value: serverProgressReporter;
    } | undefined, msg: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): gostring {
        return Message__from_diagnostics.Localize(msg, Locale__from_locale.$copy(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.locale), args);
    }
    static $go$private$lsp$sendProgress(r: {
        value: serverProgressReporter;
    } | undefined, token: gostring, value: WorkDoneProgressBeginOrReportOrEnd__from_lsproto): void {
        const token$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => token, token$next2 => token = token$next2);
        sendNotification$PointerTo_Named_lsproto$ProgressParams((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server, NotificationInfo__from_lsproto.$copy<tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined>(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<ProgressParams__from_lsproto> | undefined>($state__lsproto.ProgressInfo)), tsonicTypeScriptRuntime.location<ProgressParams__from_lsproto>(new ProgressParams__from_lsproto(new IntegerOrString__from_lsproto(void 0, token$location2), WorkDoneProgressBeginOrReportOrEnd__from_lsproto.$copy(value))));
    }
}
export class projectLoadingProgress {
    declare private readonly $goType: void;
    public constructor(public reporter: progressReporter | undefined, public ch: GoChannel<progressEvent> | undefined, public delay: time__from_gostdlib.Duration) {
    }
    static $copy($source: projectLoadingProgress): projectLoadingProgress {
        return new projectLoadingProgress($source.reporter, $source.ch, $source.delay);
    }
    static $equal($left: projectLoadingProgress, $right: projectLoadingProgress): bool {
        return goInterfaceEqual($left.reporter, $right.reporter) && $left.ch === $right.ch && named_time.TimeDurationValueOperations.$project($left.delay) === named_time.TimeDurationValueOperations.$project($right.delay);
    }
    static $hash($source: projectLoadingProgress): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.reporter === undefined ? 0 : $source.reporter.$go$hash());
        $hash = GoMapHash.mix($hash, $source.ch === undefined ? 0 : GoMapHash.object($source.ch));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.delay)));
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$lsp$beginOrReport(p: {
        value: projectLoadingProgress;
    } | undefined, token: gostring, text: gostring, begun: bool): bool {
        const text$location = tsonicTypeScriptRuntime.boundLocation({}, () => text, text$next => text = text$next);
        if (!begun) {
            const __gotots_receiver_7 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
            const __gotots_argument_8 = $state__diagnostics.Loading;
            const __gotots_argument_9 = RuntimeSlice.nil<GoInterface | undefined>();
            let title = goInterfaceNonNil<progressReporter>(__gotots_receiver_7).$go$private$lsp$localize(__gotots_argument_8, __gotots_argument_9);
            const __gotots_receiver_8 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
            const __gotots_argument_10 = token;
            const __gotots_argument_11 = new WorkDoneProgressBeginOrReportOrEnd__from_lsproto({ value: new WorkDoneProgressBegin__from_lsproto(StringLiteralBegin__from_lsproto.$zero(), title, void 0, text$location, void 0) }, void 0, void 0);
            goInterfaceNonNil<progressReporter>(__gotots_receiver_8).$go$private$lsp$sendProgress(__gotots_argument_10, __gotots_argument_11);
        }
        else {
            const __gotots_receiver_9 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
            const __gotots_argument_12 = token;
            const __gotots_argument_13 = new WorkDoneProgressBeginOrReportOrEnd__from_lsproto(void 0, { value: new WorkDoneProgressReport__from_lsproto(StringLiteralReport__from_lsproto.$zero(), void 0, text$location, void 0) }, void 0);
            goInterfaceNonNil<progressReporter>(__gotots_receiver_9).$go$private$lsp$sendProgress(__gotots_argument_12, __gotots_argument_13);
        }
        return true;
    }
    static $go$private$lsp$finish(p: {
        value: projectLoadingProgress;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        const __gotots_select_3 = GoChannel.$selectSend((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, new progressEvent(message, args, true));
        const __gotots_receiver_11 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
        const __gotots_channel_4 = goInterfaceNonNil<progressReporter>(__gotots_receiver_11).$go$private$lsp$done();
        const __gotots_channel_5 = (value: GoEmptyStruct, ok: boolean): void => {
            __gotots_receive_3 = [value, ok];
        };
        let __gotots_receive_3: [
            GoEmptyStruct,
            boolean
        ] | undefined = undefined;
        const __gotots_select_4 = GoChannel.$selectReceive(__gotots_channel_4, __gotots_channel_5);
        const __gotots_switch_selection_1 = goSelect([__gotots_select_3, __gotots_select_4]);
        switch (__gotots_switch_selection_1) {
            case 0: {
                break;
            }
            case 1: {
                break;
            }
            default: GoPanic.raiseRuntime("select returned an invalid case");
        }
    }
    static $go$private$lsp$run(p: {
        value: projectLoadingProgress;
    } | undefined): void {
        let loading = OrderedMap__from_collections.$zero<gostring, int>((): GoMapValue<gostring, int> => {
            return GoMap.nil<gostring, int>(0);
        });
        const loading$location = tsonicTypeScriptRuntime.boundLocation({}, () => loading, loading$next => loading = loading$next);
        let token = "";
        let tokenID = 0;
        let begun = false;
        let delay: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer> | undefined = void 0;
        let delayC: (() => GoReceiveChannel<time__from_gostdlib.Time> | undefined) | undefined = (): GoReceiveChannel<time__from_gostdlib.Time> | undefined => {
            if (delay === undefined) {
                return undefined;
            }
            return ((delay ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value.C;
        };
        let stopDelay: (() => void) | undefined = (): void => {
            if (!(delay === undefined)) {
                const __gotots_receiver_0 = delay;
                time__from_gostdlib.Timer.Stop(__gotots_receiver_0 === void 0 ? void 0 :
                    (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value);
                delay = void 0;
            }
        };
        let delayFired = false;
        for (;;) {
            let __gotots_receive_0: [
                progressEvent,
                boolean
            ] | undefined = undefined;
            const __gotots_select_0 = GoChannel.$selectReceive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (value: progressEvent, ok: boolean): void => {
                __gotots_receive_0 = [value, ok];
            });
            const __gotots_callee_0 = delayC;
            const __gotots_channel_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_channel_1 = (value: time__from_gostdlib.Time, ok: boolean): void => {
                __gotots_receive_1 = [value, ok];
            };
            let __gotots_receive_1: [
                time__from_gostdlib.Time,
                boolean
            ] | undefined = undefined;
            const __gotots_select_1 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
            const __gotots_receiver_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
            const __gotots_channel_2 = goInterfaceNonNil<progressReporter>(__gotots_receiver_1).$go$private$lsp$done();
            const __gotots_channel_3 = (value: GoEmptyStruct, ok: boolean): void => {
                __gotots_receive_2 = [value, ok];
            };
            let __gotots_receive_2: [
                GoEmptyStruct,
                boolean
            ] | undefined = undefined;
            const __gotots_select_2 = GoChannel.$selectReceive(__gotots_channel_2, __gotots_channel_3);
            const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1, __gotots_select_2]);
            switch (__gotots_switch_selection_0) {
                case 0: {
                    if (__gotots_receive_0 === undefined) {
                        GoPanic.raiseRuntime("selected receive has no result");
                    }
                    let ev = progressEvent.$copy(__gotots_receive_0[0]);
                    const __gotots_receiver_2 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
                    const __gotots_argument_0 = ev.message;
                    const __gotots_argument_1 = ev.args;
                    let text = goInterfaceNonNil<progressReporter>(__gotots_receiver_2).$go$private$lsp$localize(__gotots_argument_0, __gotots_argument_1);
                    if (!ev.finish) {
                        let count = OrderedMap$GetOrZero$string$int(loading$location, text);
                        OrderedMap$Set$string$int(loading$location, text, count + 1);
                        if (token === "") {
                            tokenID++;
                            token = fmt__from_gostdlib.Sprintf("tsgo-loading-%d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(tokenID)]));
                            begun = false;
                            if (named_time.TimeDurationValueOperations.$project((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.delay) <= 0n) {
                                delayFired = true;
                                const __gotots_receiver_3 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
                                const __gotots_argument_2 = token;
                                goInterfaceNonNil<progressReporter>(__gotots_receiver_3).$go$private$lsp$createWorkDoneProgress(__gotots_argument_2);
                            }
                            else {
                                delayFired = false;
                                const __gotots_conversion_0 = time__from_gostdlib.NewTimer((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.delay);
                                delay = __gotots_conversion_0 === undefined ? undefined :
                                    tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Timer>(__gotots_conversion_0, (): time__from_gostdlib.Timer => {
                                        return __gotots_conversion_0;
                                    }, ($go$providerPointerValue: time__from_gostdlib.Timer): void => {
                                        named_time.TimeTimerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                                    });
                            }
                        }
                        if (delayFired) {
                            begun = projectLoadingProgress.$go$private$lsp$beginOrReport(p, token, text, begun);
                        }
                    }
                    else {
                        let count = OrderedMap$GetOrZero$string$int(loading$location, text);
                        if (count <= 1) {
                            OrderedMap$Delete$string$int(loading$location, text);
                        }
                        else {
                            OrderedMap$Set$string$int(loading$location, text, count - 1);
                        }
                        if (token === "") {
                            continue;
                        }
                        if (OrderedMap$Size$string$int(loading$location) === 0) {
                            if (begun) {
                                const __gotots_receiver_4 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
                                const __gotots_argument_3 = token;
                                const __gotots_argument_4 = new WorkDoneProgressBeginOrReportOrEnd__from_lsproto(void 0, void 0, { value: new WorkDoneProgressEnd__from_lsproto(StringLiteralEnd__from_lsproto.$zero(), void 0) });
                                goInterfaceNonNil<progressReporter>(__gotots_receiver_4).$go$private$lsp$sendProgress(__gotots_argument_3, __gotots_argument_4);
                            }
                            const __gotots_callee_1 = stopDelay;
                            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                            token = "";
                        }
                        else if (delayFired) {
                            let first = FirstOrNilSeq$string(OrderedMap$Keys$string$int(loading$location));
                            const first$location = tsonicTypeScriptRuntime.boundLocation({}, () => first, first$next => first = first$next);
                            const __gotots_receiver_5 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
                            const __gotots_argument_5 = token;
                            const __gotots_argument_6 = new WorkDoneProgressBeginOrReportOrEnd__from_lsproto(void 0, { value: new WorkDoneProgressReport__from_lsproto(StringLiteralReport__from_lsproto.$zero(), void 0, first$location, void 0) }, void 0);
                            goInterfaceNonNil<progressReporter>(__gotots_receiver_5).$go$private$lsp$sendProgress(__gotots_argument_5, __gotots_argument_6);
                        }
                    }
                    break;
                }
                case 1: {
                    delayFired = true;
                    if (token !== "" && OrderedMap$Size$string$int(loading$location) > 0) {
                        const __gotots_receiver_6 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
                        const __gotots_argument_7 = token;
                        goInterfaceNonNil<progressReporter>(__gotots_receiver_6).$go$private$lsp$createWorkDoneProgress(__gotots_argument_7);
                        let first = FirstOrNilSeq$string(OrderedMap$Keys$string$int(loading$location));
                        begun = projectLoadingProgress.$go$private$lsp$beginOrReport(p, token, first, begun);
                    }
                    break;
                }
                case 2: {
                    const __gotots_callee_2 = stopDelay;
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
                    return;
                    break;
                }
                default: GoPanic.raiseRuntime("select returned an invalid case");
            }
        }
    }
    static $go$private$lsp$start(p: {
        value: projectLoadingProgress;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        const __gotots_select_5 = GoChannel.$selectSend((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, new progressEvent(message, args, false));
        const __gotots_receiver_12 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reporter;
        const __gotots_channel_6 = goInterfaceNonNil<progressReporter>(__gotots_receiver_12).$go$private$lsp$done();
        const __gotots_channel_7 = (value: GoEmptyStruct, ok: boolean): void => {
            __gotots_receive_4 = [value, ok];
        };
        let __gotots_receive_4: [
            GoEmptyStruct,
            boolean
        ] | undefined = undefined;
        const __gotots_select_6 = GoChannel.$selectReceive(__gotots_channel_6, __gotots_channel_7);
        const __gotots_switch_selection_2 = goSelect([__gotots_select_5, __gotots_select_6]);
        switch (__gotots_switch_selection_2) {
            case 0: {
                break;
            }
            case 1: {
                break;
            }
            default: GoPanic.raiseRuntime("select returned an invalid case");
        }
    }
}
export function newProjectLoadingProgress(server: {
    value: Server;
} | undefined, delay: time__from_gostdlib.Duration): {
    value: projectLoadingProgress;
} | undefined {
    return newProjectLoadingProgressFromReporter(new GoInterfaceAdapter({ value: new serverProgressReporter(server) }), delay);
}
export function newProjectLoadingProgressFromReporter(reporter: progressReporter | undefined, delay: time__from_gostdlib.Duration): {
    value: projectLoadingProgress;
} | undefined {
    let p: {
        value: projectLoadingProgress;
    } | undefined = { value: new projectLoadingProgress(reporter, GoChannel.make<progressEvent>(64, (): progressEvent => {
            return progressEvent.$zero();
        }, (value: progressEvent): progressEvent => {
            return progressEvent.$copy(value);
        }), delay) };
    projectLoadingProgress.$go$private$lsp$run(p);
    return p;
}
