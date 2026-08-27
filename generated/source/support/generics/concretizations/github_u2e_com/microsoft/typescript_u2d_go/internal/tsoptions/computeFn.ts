import type { CompilerOptions as CompilerOptions__from_core, ModuleDetectionKind as ModuleDetectionKind__from_core, ModuleKind as ModuleKind__from_core, ModuleResolutionKind as ModuleResolutionKind__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/compileroptions.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { computeFn$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/showconfig.js";
import { $goInterfaceAdapter$Named_core$ModuleDetectionKind, $goInterfaceAdapter$Named_core$ModuleResolutionKind, $goInterfaceAdapter$bool, $goInterfaceAdapter$Named_core$ModuleKind as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function computeFn$Named_core$ModuleDetectionKind($argument0: (($0: {
    value: CompilerOptions__from_core;
} | undefined) => ModuleDetectionKind__from_core) | undefined): (($0: {
    value: CompilerOptions__from_core;
} | undefined) => GoInterface | undefined) | undefined {
    return computeFn$kernel<ModuleDetectionKind__from_core>(($argument0: ModuleDetectionKind__from_core): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_core$ModuleDetectionKind($argument0);
    }, $argument0);
}
export function computeFn$Named_core$ModuleKind($argument0: (($0: {
    value: CompilerOptions__from_core;
} | undefined) => ModuleKind__from_core) | undefined): (($0: {
    value: CompilerOptions__from_core;
} | undefined) => GoInterface | undefined) | undefined {
    return computeFn$kernel<ModuleKind__from_core>(($argument0: ModuleKind__from_core): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument0);
}
export function computeFn$Named_core$ModuleResolutionKind($argument0: (($0: {
    value: CompilerOptions__from_core;
} | undefined) => ModuleResolutionKind__from_core) | undefined): (($0: {
    value: CompilerOptions__from_core;
} | undefined) => GoInterface | undefined) | undefined {
    return computeFn$kernel<ModuleResolutionKind__from_core>(($argument0: ModuleResolutionKind__from_core): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_core$ModuleResolutionKind($argument0);
    }, $argument0);
}
export function computeFn$bool($argument0: (($0: {
    value: CompilerOptions__from_core;
} | undefined) => bool) | undefined): (($0: {
    value: CompilerOptions__from_core;
} | undefined) => GoInterface | undefined) | undefined {
    return computeFn$kernel<bool>(($argument0: bool): GoInterface | undefined => {
        return new $goInterfaceAdapter$bool($argument0);
    }, $argument0);
}
