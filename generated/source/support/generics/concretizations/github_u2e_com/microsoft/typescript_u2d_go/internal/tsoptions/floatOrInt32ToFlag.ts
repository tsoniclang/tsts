import type { JsxEmit as JsxEmit__from_core, ModuleDetectionKind as ModuleDetectionKind__from_core, ModuleKind as ModuleKind__from_core, ModuleResolutionKind as ModuleResolutionKind__from_core, NewLineKind as NewLineKind__from_core, ScriptTarget as ScriptTarget__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, float64 } from "@gotots/runtime/scalars.js";
import { floatOrInt32ToFlag$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsinghelpers.js";
import { $goInterfaceAdapter$Named_core$ModuleDetectionKind, $goInterfaceAdapter$Named_core$ModuleKind, $goInterfaceAdapter$Named_core$ModuleResolutionKind, $goInterfaceAdapter$Named_core$NewLineKind, $goInterfaceAdapter$Named_core$ScriptTarget, $goInterfaceAdapter$Named_core$JsxEmit as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function floatOrInt32ToFlag$Named_core$JsxEmit($argument0: GoInterface | undefined): JsxEmit__from_core {
    return floatOrInt32ToFlag$kernel<JsxEmit__from_core>(($argument0: float64): JsxEmit__from_core => {
        return Math.trunc($argument0) | 0;
    }, ($argument0: GoInterfaceValue | undefined): [
        JsxEmit__from_core,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            JsxEmit__from_core,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, $argument0);
}
export function floatOrInt32ToFlag$Named_core$ModuleDetectionKind($argument0: GoInterface | undefined): ModuleDetectionKind__from_core {
    return floatOrInt32ToFlag$kernel<ModuleDetectionKind__from_core>(($argument0: float64): ModuleDetectionKind__from_core => {
        return Math.trunc($argument0) | 0;
    }, ($argument0: GoInterfaceValue | undefined): [
        ModuleDetectionKind__from_core,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            ModuleDetectionKind__from_core,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$ModuleDetectionKind.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, $argument0);
}
export function floatOrInt32ToFlag$Named_core$ModuleKind($argument0: GoInterface | undefined): ModuleKind__from_core {
    return floatOrInt32ToFlag$kernel<ModuleKind__from_core>(($argument0: float64): ModuleKind__from_core => {
        return Math.trunc($argument0) | 0;
    }, ($argument0: GoInterfaceValue | undefined): [
        ModuleKind__from_core,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            ModuleKind__from_core,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$ModuleKind.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, $argument0);
}
export function floatOrInt32ToFlag$Named_core$ModuleResolutionKind($argument0: GoInterface | undefined): ModuleResolutionKind__from_core {
    return floatOrInt32ToFlag$kernel<ModuleResolutionKind__from_core>(($argument0: float64): ModuleResolutionKind__from_core => {
        return Math.trunc($argument0) | 0;
    }, ($argument0: GoInterfaceValue | undefined): [
        ModuleResolutionKind__from_core,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            ModuleResolutionKind__from_core,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$ModuleResolutionKind.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, $argument0);
}
export function floatOrInt32ToFlag$Named_core$NewLineKind($argument0: GoInterface | undefined): NewLineKind__from_core {
    return floatOrInt32ToFlag$kernel<NewLineKind__from_core>(($argument0: float64): NewLineKind__from_core => {
        return Math.trunc($argument0) | 0;
    }, ($argument0: GoInterfaceValue | undefined): [
        NewLineKind__from_core,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            NewLineKind__from_core,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$NewLineKind.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, $argument0);
}
export function floatOrInt32ToFlag$Named_core$ScriptTarget($argument0: GoInterface | undefined): ScriptTarget__from_core {
    return floatOrInt32ToFlag$kernel<ScriptTarget__from_core>(($argument0: float64): ScriptTarget__from_core => {
        return Math.trunc($argument0) | 0;
    }, ($argument0: GoInterfaceValue | undefined): [
        ScriptTarget__from_core,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            ScriptTarget__from_core,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$ScriptTarget.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, $argument0);
}
