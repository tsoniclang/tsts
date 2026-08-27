import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeId as NodeId__from_ast, SymbolId as SymbolId__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { Hasher as Hasher__from_xxh3 } from "../../../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import type { int, uint64 } from "@gotots/runtime/scalars.js";
import { hashWrite64$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function hashWrite64$Named_ast$NodeId($argument0: tsonicTypeScriptRuntime.Location<Hasher__from_xxh3> | undefined, $argument1: NodeId__from_ast): void {
    return hashWrite64$kernel<NodeId__from_ast>(($argument0: NodeId__from_ast): uint64 => {
        return $argument0.$value;
    }, $argument0, $argument1);
}
export function hashWrite64$Named_ast$SymbolId($argument0: tsonicTypeScriptRuntime.Location<Hasher__from_xxh3> | undefined, $argument1: SymbolId__from_ast): void {
    return hashWrite64$kernel<SymbolId__from_ast>(($argument0: SymbolId__from_ast): uint64 => {
        return $argument0.$value;
    }, $argument0, $argument1);
}
export function hashWrite64$int($argument0: tsonicTypeScriptRuntime.Location<Hasher__from_xxh3> | undefined, $argument1: int): void {
    return hashWrite64$kernel<int>(($argument0: int): uint64 => {
        return BigInt.asUintN(64, goNumberToBigInt($argument0));
    }, $argument0, $argument1);
}
