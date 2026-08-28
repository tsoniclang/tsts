import type { ExtendedConfigCacheEntry as ExtendedConfigCacheEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/extendedconfigcache.js";
import type { ownerCacheEntry as ownerCacheEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ownercache.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring, uint64 } from "@gotots/runtime/scalars.js";
import { ExtendedConfigParseArgs as ExtendedConfigParseArgs__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/extendedconfigcache.js";
import { OwnerCache as OwnerCache__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/ownercache.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_project$ownerCacheEntryOf_PointerTo_Named_project$ExtendedConfigCacheEntry as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function OwnerCache$LoadAndAcquire$Named_tspath$Path$PointerTo_Named_project$ExtendedConfigCacheEntry$Named_project$ExtendedConfigParseArgs($argument0: {
    value: OwnerCache__from_project<Path__from_tspath, {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined, ExtendedConfigParseArgs__from_project>;
} | undefined, $argument1: Path__from_tspath, $argument2: uint64, $argument3: ExtendedConfigParseArgs__from_project): {
    value: ExtendedConfigCacheEntry__from_project;
} | undefined {
    return OwnerCache__from_project.LoadAndAcquire$kernel<Path__from_tspath, {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined, ExtendedConfigParseArgs__from_project>($argument0, ($argument0: ExtendedConfigParseArgs__from_project): ExtendedConfigParseArgs__from_project => {
        return ExtendedConfigParseArgs__from_project.$copy($argument0);
    }, ($argument0: {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined): {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined): {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: ownerCacheEntry__from_project<{
                value: ExtendedConfigCacheEntry__from_project;
            } | undefined>;
        } | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined): {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined => {
        return $argument0;
    }, (): {
        value: ownerCacheEntry__from_project<{
            value: ExtendedConfigCacheEntry__from_project;
        } | undefined>;
    } | undefined => {
        return void 0;
    }, (): {
        value: ExtendedConfigCacheEntry__from_project;
    } | undefined => {
        return void 0;
    }, $argument1, $argument2, $argument3);
}
