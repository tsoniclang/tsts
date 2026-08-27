import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { SyncMap$Keys$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Keys.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncMap$Store$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void } from "../../../../../../../support/generics/concretizations/maps/Keys.js";
import { Collect$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/slices/Collect.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SetOf_Named_tspath$Path as GoMap } from "../../../../../../../support/maps.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class referenceMap {
    declare private readonly $goType: void;
    public constructor(public references: SyncMap__from_collections<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>, public referencedBy: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>, public referenceBy: sync__from_gostdlib.Once) {
    }
    static $zero(): referenceMap {
        return new referenceMap(SyncMap__from_collections.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>(), GoMap.nil(), named_sync.SyncOnceOperations.$zero());
    }
    static $copy($source: referenceMap): referenceMap {
        return new referenceMap(SyncMap__from_collections.$copy<Path__from_tspath, tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>($source.references), $source.referencedBy, named_sync.SyncOnceOperations.$copy($source.referenceBy));
    }
    declare private readonly then?: never;
    static $go$private$incremental$getPathsWithReferences(r: tsonicTypeScriptRuntime.Location<referenceMap> | undefined): RuntimeSlice<gostring> {
        const __gotots_store_2 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value;
        const __gotots_argument_0 = SyncMap$Keys$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "references"));
        return Collect$Named_tspath$Path(__gotots_argument_0);
    }
    static $go$private$incremental$getReferencedBy(r: tsonicTypeScriptRuntime.Location<referenceMap> | undefined, path: Path__from_tspath): iter__from_gostdlib.Seq<Path__from_tspath> {
        sync__from_gostdlib.Once.Do(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value.referenceBy, (): void => {
            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value.referencedBy = GoMap.make(0, []);
            const __gotots_store_3 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value;
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "references"), (key: Path__from_tspath, value: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): bool => {
                const __gotots_range_0 = Set$Keys$Named_tspath$Path(value);
                const __gotots_range_keys_0 = __gotots_range_0.keys();
                for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                    const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                    if (!__gotots_range_value_1[1]) {
                        continue;
                    }
                    const __gotots_range_value_2 = __gotots_range_value_0;
                    let ref = __gotots_range_value_2;
                    const __gotots_results_1 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value.referencedBy.lookupOk(ref);
                    let __go_set: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = __gotots_results_1[0];
                    let ok__shadow_1 = __gotots_results_1[1];
                    if (!ok__shadow_1) {
                        __go_set =
                            tsonicTypeScriptRuntime.location<Set__from_collections<Path__from_tspath>>(Set__from_collections.$fromStorage<Path__from_tspath>({
                                M: $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil()
                            }));
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value.referencedBy.store(ref, __go_set);
                    }
                    Set$Add$Named_tspath$Path(__go_set, key);
                }
                return true;
            });
        });
        const __gotots_results_2 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value.referencedBy.lookupOk(path);
        let refs: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = __gotots_results_2[0];
        let ok = __gotots_results_2[1];
        if (ok) {
            return Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(Set$Keys$Named_tspath$Path(refs));
        }
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: Path__from_tspath) => bool) | undefined): void => {
        });
    }
    static $go$private$incremental$getReferences(r: tsonicTypeScriptRuntime.Location<referenceMap> | undefined, path: Path__from_tspath): [
        tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined,
        bool
    ] {
        const __gotots_store_1 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value;
        const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "references"), path);
        let refs: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        return [refs, ok];
    }
    static $go$private$incremental$storeReferences(r: tsonicTypeScriptRuntime.Location<referenceMap> | undefined, path: Path__from_tspath, refs: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): void {
        const __gotots_store_0 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<referenceMap>).value;
        SyncMap$Store$Named_tspath$Path$PointerTo_Named_collections$SetOf_Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "references"), path, refs);
    }
}
