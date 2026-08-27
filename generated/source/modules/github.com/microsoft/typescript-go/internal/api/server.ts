import type { Session as Session__from_project } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Conn } from "./conn.js";
import type { JSONRPCProtocol } from "./protocol_jsonrpc.js";
import type { MessagePackProtocol } from "./protocol_msgpack.js";
import type { Transport } from "./transport.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { WrapFS as WrapFS__from_bundled } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { PositionEncodingKindUTF8$constant as PositionEncodingKindUTF8$constant__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { CheckerPoolOptions as CheckerPoolOptions__from_project, NewSession as NewSession__from_project, SessionInit as SessionInit__from_project, SessionOptions as SessionOptions__from_project } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/package.js";
import { FS as FS__from_osvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/osvfs/package.js";
import { $goInterfaceAdapter$PointerTo_Named_api$AsyncConn, $goInterfaceAdapter$PointerTo_Named_api$JSONRPCProtocol, $goInterfaceAdapter$PointerTo_Named_api$MessagePackProtocol, $goInterfaceAdapter$PointerTo_Named_api$PipeTransport, $goInterfaceAdapter$PointerTo_Named_api$Session, $goInterfaceAdapter$PointerTo_Named_api$StdioTransport, $goInterfaceAdapter$PointerTo_Named_api$SyncConn, $goInterfaceAdapter$PointerTo_Named_api$callbackFS, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { callbackFS, newCallbackFS } from "./callbackfs.js";
import { NewAsyncConnWithProtocol } from "./conn_async.js";
import { NewSyncConn } from "./conn_sync.js";
import { NewJSONRPCProtocol } from "./protocol_jsonrpc.js";
import { NewMessagePackProtocol } from "./protocol_msgpack.js";
import { NewSession, Session, SessionOptions } from "./session.js";
import { NewPipeTransport, NewStdioTransport, PipeTransport, StdioTransport } from "./transport.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class StdioServerOptions {
    declare private readonly $goType: void;
    public constructor(public In: GoInterface | undefined, public Out: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public Err: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public Cwd: gostring, public DefaultLibraryPath: gostring, public PipePath: gostring, public Callbacks: RuntimeSlice<gostring>, public Async: bool) {
    }
    declare private readonly then?: never;
}
export class StdioServer {
    declare private readonly $goType: void;
    public constructor(public options: StdioServerOptions | undefined) {
    }
    declare private readonly then?: never;
    static Run(s: StdioServer | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    let transport: Transport | undefined = void 0;
                    if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PipePath !== "") {
                        const __gotots_results_0 = NewPipeTransport(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PipePath);
                        let t: PipeTransport | undefined = __gotots_results_0[0];
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create pipe transport: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                            break __gotots_return_block_0;
                        }
                        const __gotots_receiver_0 = t;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            PipeTransport.Close(__gotots_receiver_0);
                        });
                        transport = new $goInterfaceAdapter$PointerTo_Named_api$PipeTransport(t);
                    }
                    else {
                        let t: StdioTransport | undefined = NewStdioTransport(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).In, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Out);
                        const __gotots_receiver_1 = t;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            StdioTransport.Close(__gotots_receiver_1);
                        });
                        transport = new $goInterfaceAdapter$PointerTo_Named_api$StdioTransport(t);
                    }
                    let fs: FS__from_vfs | undefined = WrapFS__from_bundled(FS__from_osvfs());
                    let callbackFS__shadow_1: {
                        value: callbackFS;
                    } | undefined = void 0;
                    if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Callbacks.length > 0) {
                        callbackFS__shadow_1 = newCallbackFS(fs, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Callbacks);
                        fs = new $goInterfaceAdapter$PointerTo_Named_api$callbackFS(callbackFS__shadow_1);
                    }
                    let projectSession: {
                        value: Session__from_project;
                    } | undefined = NewSession__from_project(new SessionInit__from_project(ctx, { value: new SessionOptions__from_project(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Cwd, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).DefaultLibraryPath, "", PositionEncodingKindUTF8$constant__from_lsproto(), false, false, false, false, named_time.TimeDurationValueOperations.$wrap(0n), Locale__from_locale.$zero(), CheckerPoolOptions__from_project.$zero()) }, fs, void 0, void 0, void 0, void 0));
                    let session: {
                        value: Session;
                    } | undefined = NewSession(projectSession, new SessionOptions(!((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Async));
                    const __gotots_receiver_2 = session;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        Session.Close(__gotots_receiver_2);
                    });
                    const __gotots_receiver_3 = transport;
                    const __gotots_results_1 = goInterfaceNonNil<Transport>(__gotots_receiver_3).Accept();
                    let rwc: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined = __gotots_results_1[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to accept connection: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
                        break __gotots_return_block_0;
                    }
                    let conn: Conn | undefined = void 0;
                    if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Async) {
                        let protocol: {
                            value: JSONRPCProtocol;
                        } | undefined = NewJSONRPCProtocol(rwc);
                        conn = new $goInterfaceAdapter$PointerTo_Named_api$AsyncConn(NewAsyncConnWithProtocol(rwc, new $goInterfaceAdapter$PointerTo_Named_api$JSONRPCProtocol(protocol), new $goInterfaceAdapter$PointerTo_Named_api$Session(session)));
                    }
                    else {
                        let protocol: {
                            value: MessagePackProtocol;
                        } | undefined = NewMessagePackProtocol(rwc);
                        conn = new $goInterfaceAdapter$PointerTo_Named_api$SyncConn(NewSyncConn(rwc, new $goInterfaceAdapter$PointerTo_Named_api$MessagePackProtocol(protocol), new $goInterfaceAdapter$PointerTo_Named_api$Session(session)));
                    }
                    if (!(callbackFS__shadow_1 === undefined)) {
                        callbackFS.SetConnection(callbackFS__shadow_1, ctx, conn);
                    }
                    const __gotots_receiver_4 = conn;
                    const __gotots_argument_1 = ctx;
                    __gotots_return_0 = goInterfaceNonNil<Conn>(__gotots_receiver_4).Run(__gotots_argument_1);
                    break __gotots_return_block_0;
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
        return __gotots_return_0;
    }
}
export function NewStdioServer(options: StdioServerOptions | undefined): StdioServer | undefined {
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Cwd === "") {
        const __gotots_argument_0 = new GoInterfaceAdapter("StdioServerOptions.Cwd is required");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    return new StdioServer(options);
}
