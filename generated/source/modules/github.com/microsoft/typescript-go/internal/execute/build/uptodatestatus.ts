import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { bool, gostring, uint16 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_build$inputOutputName, $goInterfaceAdapter$PointerTo_Named_build$upstreamErrors, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_build$inputOutputFileAndTime as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type upToDateStatusType = uint16;
export function upToDateStatusTypeConfigFileNotFound$constant(): upToDateStatusType {
    return 0;
}
export function upToDateStatusTypeBuildErrors$constant(): upToDateStatusType {
    return 1;
}
export function upToDateStatusTypeUpstreamErrors$constant(): upToDateStatusType {
    return 2;
}
export function upToDateStatusTypeUpToDate$constant(): upToDateStatusType {
    return 3;
}
export function upToDateStatusTypeUpToDateWithUpstreamTypes$constant(): upToDateStatusType {
    return 4;
}
export function upToDateStatusTypeUpToDateWithInputFileText$constant(): upToDateStatusType {
    return 5;
}
export function upToDateStatusTypeInputFileMissing$constant(): upToDateStatusType {
    return 6;
}
export function upToDateStatusTypeOutputMissing$constant(): upToDateStatusType {
    return 7;
}
export function upToDateStatusTypeInputFileNewer$constant(): upToDateStatusType {
    return 8;
}
export function upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit$constant(): upToDateStatusType {
    return 9;
}
export function upToDateStatusTypeOutOfDateBuildInfoWithErrors$constant(): upToDateStatusType {
    return 10;
}
export function upToDateStatusTypeOutOfDateOptions$constant(): upToDateStatusType {
    return 11;
}
export function upToDateStatusTypeOutOfDateRoots$constant(): upToDateStatusType {
    return 12;
}
export function upToDateStatusTypeTsVersionOutputOfDate$constant(): upToDateStatusType {
    return 13;
}
export function upToDateStatusTypeForceBuild$constant(): upToDateStatusType {
    return 14;
}
export function upToDateStatusTypeSolution$constant(): upToDateStatusType {
    return 15;
}
export class inputOutputName {
    declare private readonly $goType: void;
    public constructor(public input: gostring, public output: gostring) {
    }
    static $copy($source: inputOutputName): inputOutputName {
        return new inputOutputName($source.input, $source.output);
    }
    static $equal($left: inputOutputName, $right: inputOutputName): bool {
        return $left.input === $right.input && $left.output === $right.output;
    }
    static $hash($source: inputOutputName): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.input));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.output));
        return $hash;
    }
    declare private readonly then?: never;
}
export class fileAndTime {
    declare private readonly $goType: void;
    public constructor(public file: gostring, public time: time__from_gostdlib.Time) {
    }
    static $zero(): fileAndTime {
        return new fileAndTime("", named_time.TimeOperations.$zero());
    }
    static $copy($source: fileAndTime): fileAndTime {
        return new fileAndTime($source.file, named_time.TimeOperations.$copy($source.time));
    }
    static $equal($left: fileAndTime, $right: fileAndTime): bool {
        return $left.file === $right.file && named_time.TimeOperations.$equal($left.time, $right.time);
    }
    static $hash($source: fileAndTime): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.file));
        $hash = GoMapHash.mix($hash, named_time.TimeOperations.$hash($source.time));
        return $hash;
    }
    declare private readonly then?: never;
}
export class inputOutputFileAndTime {
    declare private readonly $goType: void;
    public constructor(public input: fileAndTime, public output: fileAndTime, public buildInfo: gostring) {
    }
    static $copy($source: inputOutputFileAndTime): inputOutputFileAndTime {
        return new inputOutputFileAndTime(fileAndTime.$copy($source.input), fileAndTime.$copy($source.output), $source.buildInfo);
    }
    static $equal($left: inputOutputFileAndTime, $right: inputOutputFileAndTime): bool {
        return fileAndTime.$equal($left.input, $right.input) && fileAndTime.$equal($left.output, $right.output) && $left.buildInfo === $right.buildInfo;
    }
    static $hash($source: inputOutputFileAndTime): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, fileAndTime.$hash($source.input));
        $hash = GoMapHash.mix($hash, fileAndTime.$hash($source.output));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.buildInfo));
        return $hash;
    }
    declare private readonly then?: never;
}
export class upstreamErrors {
    declare private readonly $goType: void;
    public constructor(public ref: gostring, public refHasUpstreamErrors: bool) {
    }
    static $copy($source: upstreamErrors): upstreamErrors {
        return new upstreamErrors($source.ref, $source.refHasUpstreamErrors);
    }
    static $equal($left: upstreamErrors, $right: upstreamErrors): bool {
        return $left.ref === $right.ref && $left.refHasUpstreamErrors === $right.refHasUpstreamErrors;
    }
    static $hash($source: upstreamErrors): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ref));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.refHasUpstreamErrors));
        return $hash;
    }
    declare private readonly then?: never;
}
export class upToDateStatus {
    declare private readonly $goType: void;
    public constructor(public kind: upToDateStatusType, public data: GoInterface | undefined) {
    }
    static $copy($source: upToDateStatus): upToDateStatus {
        return new upToDateStatus($source.kind, $source.data);
    }
    static $equal($left: upToDateStatus, $right: upToDateStatus): bool {
        return $left.kind === $right.kind && goInterfaceEqual($left.data, $right.data);
    }
    static $hash($source: upToDateStatus): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind));
        $hash = GoMapHash.mix($hash, $source.data === undefined ? 0 : $source.data.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$build$inputOutputFileAndTime(s: {
        value: upToDateStatus;
    } | undefined): {
        value: inputOutputFileAndTime;
    } | undefined {
        const __gotots_results_0 = (($value: GoInterface | undefined): [
            {
                value: inputOutputFileAndTime;
            } | undefined,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
        let data: {
            value: inputOutputFileAndTime;
        } | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (!ok) {
            return void 0;
        }
        return data;
    }
    static $go$private$build$inputOutputName(s: {
        value: upToDateStatus;
    } | undefined): {
        value: inputOutputName;
    } | undefined {
        const __gotots_results_1 = (($value: GoInterface | undefined): [
            {
                value: inputOutputName;
            } | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_build$inputOutputName.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
        let data: {
            value: inputOutputName;
        } | undefined = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (!ok) {
            return void 0;
        }
        return data;
    }
    static $go$private$build$isError(s: {
        value: upToDateStatus;
    } | undefined): bool {
        switch ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind) {
            case upToDateStatusTypeConfigFileNotFound$constant():
            case upToDateStatusTypeBuildErrors$constant():
            case upToDateStatusTypeUpstreamErrors$constant(): {
                return true;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
    static $go$private$build$isPseudoBuild(s: {
        value: upToDateStatus;
    } | undefined): bool {
        switch ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind) {
            case upToDateStatusTypeUpToDateWithUpstreamTypes$constant():
            case upToDateStatusTypeUpToDateWithInputFileText$constant(): {
                return true;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
    static $go$private$build$oldestOutputFileName(s: {
        value: upToDateStatus;
    } | undefined): gostring {
        if (!upToDateStatus.$go$private$build$isPseudoBuild(s) && !((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === upToDateStatusTypeUpToDate$constant())) {
            const __gotots_argument_0 = new $goInterfaceAdapter$string("only valid for up to date status of pseudo-build or up to date");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        {
            let inputOutputFileAndTime__shadow_1: {
                value: inputOutputFileAndTime;
            } | undefined = upToDateStatus.$go$private$build$inputOutputFileAndTime(s);
            if (!(inputOutputFileAndTime__shadow_1 === undefined)) {
                return (inputOutputFileAndTime__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.output.file;
            }
        }
        {
            let inputOutputName__shadow_1: {
                value: inputOutputName;
            } | undefined = upToDateStatus.$go$private$build$inputOutputName(s);
            if (!(inputOutputName__shadow_1 === undefined)) {
                return (inputOutputName__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.output;
            }
        }
        return (($value: GoInterface | undefined): gostring => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
    static $go$private$build$upstreamErrors(s: {
        value: upToDateStatus;
    } | undefined): {
        value: upstreamErrors;
    } | undefined {
        return (($value: GoInterface | undefined): {
            value: upstreamErrors;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_build$upstreamErrors.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data);
    }
}
