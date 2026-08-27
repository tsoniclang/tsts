import type { CompilerHost as CompilerHost__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_incremental$host as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$GetMTime$string_to_Named_time$Time, $goInterfaceMethod$SetMTime$string_Named_time$Time_to_Named_error } from "../../../../../../../support/interface-methods.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export interface Host extends GoInterfaceValue {
    GetMTime($argument0: gostring): time__from_gostdlib.Time;
    SetMTime($argument0: gostring, $argument1: time__from_gostdlib.Time): GoInterface | undefined;
}
export const Host$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetMTime$string_to_Named_time$Time, $goInterfaceMethod$SetMTime$string_Named_time$Time_to_Named_error]);
export function Host$is(value: GoInterfaceValue | undefined): value is Host {
    return value !== undefined && value.$go$implements(Host$contract);
}
export class host {
    declare private readonly $goType: void;
    public constructor(public host: CompilerHost__from_compiler | undefined) {
    }
    static $copy($source: host): host {
        return new host($source.host);
    }
    static $equal($left: host, $right: host): bool {
        return goInterfaceEqual($left.host, $right.host);
    }
    static $hash($source: host): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.host === undefined ? 0 : $source.host.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static GetMTime(b: {
        value: host;
    } | undefined, fileName: gostring): time__from_gostdlib.Time {
        return GetMTime((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, fileName);
    }
    static SetMTime(b: {
        value: host;
    } | undefined, fileName: gostring, mTime: time__from_gostdlib.Time): GoInterface | undefined {
        const __gotots_receiver_3 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_receiver_4 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_3).FS();
        const __gotots_argument_1 = fileName;
        const __gotots_struct_0 = named_time.TimeOperations.$zero();
        const __gotots_argument_2 = __gotots_struct_0;
        const __gotots_argument_3 = named_time.TimeOperations.$copy(mTime);
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).Chtimes(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
    }
}
export function CreateHost(compilerHost: CompilerHost__from_compiler | undefined): Host | undefined {
    return new GoInterfaceAdapter({ value: new host(compilerHost) });
}
export function GetMTime(host__shadow_1: CompilerHost__from_compiler | undefined, fileName: gostring): time__from_gostdlib.Time {
    const __gotots_receiver_0 = host__shadow_1;
    const __gotots_receiver_1 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_0).FS();
    const __gotots_argument_0 = fileName;
    let stat: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Stat(__gotots_argument_0);
    let mTime = named_time.TimeOperations.$zero();
    if (!(stat === undefined)) {
        const __gotots_receiver_2 = stat;
        mTime = goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_2).ModTime();
    }
    return named_time.TimeOperations.$copy(mTime);
}
