import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/cache.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { ForEachAncestorDirectoryStoppingAtGlobalCache$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function ForEachAncestorDirectoryStoppingAtGlobalCache$Interface_void($argument0: gostring, $argument1: gostring, $argument2: (($0: gostring) => [
    GoInterface | undefined,
    bool
]) | undefined): GoInterface | undefined {
    return ForEachAncestorDirectoryStoppingAtGlobalCache$kernel<GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function ForEachAncestorDirectoryStoppingAtGlobalCache$PointerTo_Named_packagejson$InfoCacheEntry($argument0: gostring, $argument1: gostring, $argument2: (($0: gostring) => [
    {
        value: InfoCacheEntry__from_packagejson;
    } | undefined,
    bool
]) | undefined): {
    value: InfoCacheEntry__from_packagejson;
} | undefined {
    return ForEachAncestorDirectoryStoppingAtGlobalCache$kernel<{
        value: InfoCacheEntry__from_packagejson;
    } | undefined>(($argument0: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined => {
        return $argument0;
    }, (): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2);
}
export function ForEachAncestorDirectoryStoppingAtGlobalCache$bool($argument0: gostring, $argument1: gostring, $argument2: (($0: gostring) => [
    bool,
    bool
]) | undefined): bool {
    return ForEachAncestorDirectoryStoppingAtGlobalCache$kernel<bool>(($argument0: bool): bool => {
        return $argument0;
    }, (): bool => {
        return false;
    }, $argument0, $argument1, $argument2);
}
