import type { NodeId as NodeId__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { Number as Number__from_jsnum } from "../../../../modules/github.com/microsoft/typescript-go/internal/jsnum/jsnum.js";
import type { ImportKind as ImportKind__from_lsproto } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoRecovery } from "@gotots/runtime/panic.js";
import type { bool, gostring, int, int32, uint32, uint8 } from "@gotots/runtime/scalars.js";
import * as generic_cmp_kernel from "@gotots/gostdlib/internal/facets/generic-cmp-kernel.js";
import * as recovery_value from "@gotots/gostdlib/internal/facets/recovery-value.js";
export function Compare$Named_ast$NodeId($argument0: NodeId__from_ast, $argument1: NodeId__from_ast): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<NodeId__from_ast>(($argument0: NodeId__from_ast, $argument1: NodeId__from_ast): bool => {
        return $argument0.$value < $argument1.$value;
    }, ($argument0: NodeId__from_ast, $argument1: NodeId__from_ast): bool => {
        return $argument0.$value === $argument1.$value;
    }, $argument0, $argument1)));
}
export function Compare$Named_jsnum$Number($argument0: Number__from_jsnum, $argument1: Number__from_jsnum): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<Number__from_jsnum>(($argument0: Number__from_jsnum, $argument1: Number__from_jsnum): bool => {
        return $argument0.$value < $argument1.$value;
    }, ($argument0: Number__from_jsnum, $argument1: Number__from_jsnum): bool => {
        return $argument0.$value === $argument1.$value;
    }, $argument0, $argument1)));
}
export function Compare$Named_lsproto$ImportKind($argument0: ImportKind__from_lsproto, $argument1: ImportKind__from_lsproto): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<ImportKind__from_lsproto>(($argument0: ImportKind__from_lsproto, $argument1: ImportKind__from_lsproto): bool => {
        return $argument0 < $argument1;
    }, ($argument0: ImportKind__from_lsproto, $argument1: ImportKind__from_lsproto): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1)));
}
export function Compare$Named_tspath$Path($argument0: Path__from_tspath, $argument1: Path__from_tspath): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<Path__from_tspath>(($argument0: Path__from_tspath, $argument1: Path__from_tspath): bool => {
        return $argument0.$value < $argument1.$value;
    }, ($argument0: Path__from_tspath, $argument1: Path__from_tspath): bool => {
        return $argument0.$value === $argument1.$value;
    }, $argument0, $argument1)));
}
export function Compare$byte($argument0: uint8, $argument1: uint8): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<uint8>(($argument0: uint8, $argument1: uint8): bool => {
        return $argument0 < $argument1;
    }, ($argument0: uint8, $argument1: uint8): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1)));
}
export function Compare$int($argument0: int, $argument1: int): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<int>(($argument0: int, $argument1: int): bool => {
        return $argument0 < $argument1;
    }, ($argument0: int, $argument1: int): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1)));
}
export function Compare$rune($argument0: int32, $argument1: int32): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<int32>(($argument0: int32, $argument1: int32): bool => {
        return $argument0 < $argument1;
    }, ($argument0: int32, $argument1: int32): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1)));
}
export function Compare$string($argument0: gostring, $argument1: gostring): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 < $argument1;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1)));
}
export function Compare$string$deferred($go$recovery: GoRecovery, $argument0: gostring, $argument1: gostring): int {
    return globalThis.Number(BigInt.asIntN(64, recovery_value.CmpCompare<gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 < $argument1;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1, $go$recovery)));
}
export function Compare$uint32($argument0: uint32, $argument1: uint32): int {
    return globalThis.Number(BigInt.asIntN(64, generic_cmp_kernel.CmpCompareKernel<uint32>(($argument0: uint32, $argument1: uint32): bool => {
        return $argument0 < $argument1;
    }, ($argument0: uint32, $argument1: uint32): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1)));
}
