import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error, $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_api$stdioConn as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Accept$void_to_Named_io$ReadWriteCloser_Named_error, $goInterfaceMethod$Close$void_to_Named_error } from "../../../../../../support/interface-methods.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { newPipeListener } from "./transport_unix.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export interface Transport extends GoInterfaceValue {
    Accept(): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    Close(): $goInterface$Interface_Method_Error_void_to_string | undefined;
}
export const Transport$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Accept$void_to_Named_io$ReadWriteCloser_Named_error, $goInterfaceMethod$Close$void_to_Named_error]);
export function Transport$is(value: GoInterfaceValue | undefined): value is Transport {
    return value !== undefined && value.$go$implements(Transport$contract);
}
export class PipeTransport {
    declare private readonly $goType: void;
    public constructor(public listener: $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error | undefined) {
    }
    declare private readonly then?: never;
    static Accept(t: PipeTransport | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        const __gotots_receiver_3 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).listener;
        const __gotots_results_1 = goInterfaceNonNil<$goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error>(__gotots_receiver_3).Accept();
        return [__gotots_results_1[0], __gotots_results_1[1]];
    }
    static Close(t: PipeTransport | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).listener;
        return goInterfaceNonNil<$goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error>(__gotots_receiver_0).Close();
    }
}
export function NewPipeTransport(path: gostring): [
    PipeTransport | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_results_0 = newPipeListener(path);
    let listener: $goInterface$Interface_Method_net$Accept_void_to_Named_net$Conn_Named_error_Method_net$Addr_void_to_Named_net$Addr_Method_net$Close_void_to_Named_error | undefined = __gotots_results_0[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
    if (!(err === undefined)) {
        return [void 0, err];
    }
    return [new PipeTransport(listener), void 0];
}
export class StdioTransport {
    declare private readonly $goType: void;
    public constructor(public stdin: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, public stdout: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public used: bool) {
    }
    declare private readonly then?: never;
    static Accept(t: StdioTransport | undefined): [
        GoInterface | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).used) {
            return [void 0, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)];
        }
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).used = true;
        return [new GoInterfaceAdapter({ value: new stdioConn((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stdin, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stdout, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stdin, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).stdout) }), void 0];
    }
    static Close(t: StdioTransport | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return void 0;
    }
}
export function NewStdioTransport(stdin: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, stdout: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): StdioTransport | undefined {
    return new StdioTransport(stdin, stdout, false);
}
export class stdioConn {
    declare private readonly $goType: void;
    public constructor(public Reader: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, public Writer: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public stdin: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined, public stdout: $goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined) {
    }
    static $copy($source: stdioConn): stdioConn {
        return new stdioConn($source.Reader, $source.Writer, $source.stdin, $source.stdout);
    }
    static $equal($left: stdioConn, $right: stdioConn): bool {
        return goInterfaceEqual($left.Reader, $right.Reader) && goInterfaceEqual($left.Writer, $right.Writer) && goInterfaceEqual($left.stdin, $right.stdin) && goInterfaceEqual($left.stdout, $right.stdout);
    }
    static $hash($source: stdioConn): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.Reader === undefined ? 0 : $source.Reader.$go$hash());
        $hash = GoMapHash.mix($hash, $source.Writer === undefined ? 0 : $source.Writer.$go$hash());
        $hash = GoMapHash.mix($hash, $source.stdin === undefined ? 0 : $source.stdin.$go$hash());
        $hash = GoMapHash.mix($hash, $source.stdout === undefined ? 0 : $source.stdout.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Close(c: {
        value: stdioConn;
    } | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stdin;
        let err1: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Read_SliceOf_byte_to_int_Named_error>(__gotots_receiver_1).Close();
        const __gotots_receiver_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stdout;
        let err2: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error_Method_io$Write_SliceOf_byte_to_int_Named_error>(__gotots_receiver_2).Close();
        if (!(err1 === undefined)) {
            return err1;
        }
        return err2;
    }
}
