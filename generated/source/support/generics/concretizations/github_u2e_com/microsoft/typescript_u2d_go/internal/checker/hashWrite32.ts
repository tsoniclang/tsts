import type { IntersectionState as IntersectionState__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import type { AccessFlags as AccessFlags__from_checker, TypeId as TypeId__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { Hasher as Hasher__from_xxh3 } from "../../../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import type { uint32 } from "@gotots/runtime/scalars.js";
import { hashWrite32$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
export function hashWrite32$Named_checker$AccessFlags($argument0: Hasher__from_xxh3 | undefined, $argument1: AccessFlags__from_checker): void {
    return hashWrite32$kernel<AccessFlags__from_checker>(($argument0: AccessFlags__from_checker): uint32 => {
        return $argument0;
    }, $argument0, $argument1);
}
export function hashWrite32$Named_checker$IntersectionState($argument0: Hasher__from_xxh3 | undefined, $argument1: IntersectionState__from_checker): void {
    return hashWrite32$kernel<IntersectionState__from_checker>(($argument0: IntersectionState__from_checker): uint32 => {
        return $argument0;
    }, $argument0, $argument1);
}
export function hashWrite32$Named_checker$TypeId($argument0: Hasher__from_xxh3 | undefined, $argument1: TypeId__from_checker): void {
    return hashWrite32$kernel<TypeId__from_checker>(($argument0: TypeId__from_checker): uint32 => {
        return $argument0;
    }, $argument0, $argument1);
}
