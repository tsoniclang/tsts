import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { LibPath as LibPath__from_bundled, WrapFS as WrapFS__from_bundled } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/package.js";
import { NormalizePath as NormalizePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { FS as FS__from_osvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/osvfs/package.js";
import { GetSize as GetSize__from_term, IsTerminal as IsTerminal__from_term } from "../../../../../../packages/golang.org/x/term@v0.44.0/_root/package.js";
import { $goInterfaceAdapter$PointerTo_Named_os$File as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class osSys {
    declare private readonly $goType: void;
    public constructor(public writer: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public fs: FS__from_vfs | undefined, public defaultLibraryPath: gostring, public cwd: gostring, public start: time__from_gostdlib.Time) {
    }
    static $copy($source: osSys): osSys {
        return new osSys($source.writer, $source.fs, $source.defaultLibraryPath, $source.cwd, named_time.TimeOperations.$copy($source.start));
    }
    static $equal($left: osSys, $right: osSys): bool {
        return goInterfaceEqual($left.writer, $right.writer) && goInterfaceEqual($left.fs, $right.fs) && $left.defaultLibraryPath === $right.defaultLibraryPath && $left.cwd === $right.cwd && named_time.TimeOperations.$equal($left.start, $right.start);
    }
    static $hash($source: osSys): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.writer === undefined ? 0 : $source.writer.$go$hash());
        $hash = GoMapHash.mix($hash, $source.fs === undefined ? 0 : $source.fs.$go$hash());
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.defaultLibraryPath));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.cwd));
        $hash = GoMapHash.mix($hash, named_time.TimeOperations.$hash($source.start));
        return $hash;
    }
    declare private readonly then?: never;
    static DefaultLibraryPath(s: {
        value: osSys;
    } | undefined): gostring {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.defaultLibraryPath;
    }
    static FS(s: {
        value: osSys;
    } | undefined): FS__from_vfs | undefined {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fs;
    }
    static GetCurrentDirectory(s: {
        value: osSys;
    } | undefined): gostring {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cwd;
    }
    static GetEnvironmentVariable(s: {
        value: osSys;
    } | undefined, name: gostring): gostring {
        return os__from_gostdlib.Getenv(name);
    }
    static GetWidthOfTerminal(s: {
        value: osSys;
    } | undefined): int {
        const __gotots_conversion_2 = os__from_gostdlib.state.Stdout;
        const __gotots_receiver_0 = __gotots_conversion_2 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_2, (): os__from_gostdlib.File => {
                return __gotots_conversion_2;
            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                named_os.OsFileOperations.$assign(__gotots_conversion_2, $go$providerPointerValue);
            });
        const __gotots_argument_3 = globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, os__from_gostdlib.File.Fd(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value))))));
        const __gotots_results_2 = GetSize__from_term(__gotots_argument_3);
        let width = __gotots_results_2[0];
        return width;
    }
    static Now(s: {
        value: osSys;
    } | undefined): time__from_gostdlib.Time {
        return time__from_gostdlib.Now();
    }
    static SinceStart(s: {
        value: osSys;
    } | undefined): time__from_gostdlib.Duration {
        return time__from_gostdlib.Since(named_time.TimeOperations.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.start));
    }
    static WriteOutputIsTTY(s: {
        value: osSys;
    } | undefined): bool {
        const __gotots_conversion_3 = os__from_gostdlib.state.Stdout;
        const __gotots_receiver_1 = __gotots_conversion_3 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_3, (): os__from_gostdlib.File => {
                return __gotots_conversion_3;
            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                named_os.OsFileOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
            });
        const __gotots_argument_4 = globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, os__from_gostdlib.File.Fd(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value))))));
        return IsTerminal__from_term(__gotots_argument_4);
    }
    static Writer(s: {
        value: osSys;
    } | undefined): $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.writer;
    }
}
export function newSystem(): {
    value: osSys;
} | undefined {
    const __gotots_results_0 = os__from_gostdlib.Getwd();
    const __gotots_results_1 = [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        gostring,
        GoInterface | undefined
    ];
    let cwd = __gotots_results_1[0];
    let err: GoInterface | undefined = __gotots_results_1[1];
    if (!(err === undefined)) {
        const __gotots_conversion_0 = os__from_gostdlib.state.Stderr;
        const __gotots_argument_0 = new GoInterfaceAdapter(__gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_0, (): os__from_gostdlib.File => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                named_os.OsFileOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            }));
        const __gotots_argument_1 = "Error getting current directory: %v\n";
        const __gotots_argument_2 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1, __gotots_argument_2);
        os__from_gostdlib.Exit(BigInt.asIntN(64, goNumberToBigInt(3)));
    }
    const __gotots_field_0 = NormalizePath__from_tspath(cwd);
    const __gotots_field_1 = WrapFS__from_bundled(FS__from_osvfs());
    const __gotots_field_2 = LibPath__from_bundled();
    const __gotots_conversion_1 = os__from_gostdlib.state.Stdout;
    const __gotots_field_3 = new GoInterfaceAdapter(__gotots_conversion_1 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_1, (): os__from_gostdlib.File => {
            return __gotots_conversion_1;
        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
            named_os.OsFileOperations.$assign(__gotots_conversion_1, $go$providerPointerValue);
        }));
    return { value: new osSys(__gotots_field_3, __gotots_field_1, __gotots_field_2, __gotots_field_0, time__from_gostdlib.Now()) };
}
