import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { AllowDuplicateNames as AllowDuplicateNames__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { NewSetWithSizeHint$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Expected$GetValue$MapOf_string_To_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/Expected$GetValue.js";
import { $goInterfaceAdapter$PointerTo_Named_packagejson$Fields as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Expected } from "./expected.js";
import { ExportsOrImports } from "./exportsorimports.js";
import { JSONValue } from "./jsonvalue.js";
import { GoMap, GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class HeaderFields {
    declare private readonly $goType: void;
    public constructor(public Name: Expected<gostring>, public Version: Expected<gostring>, public Type: Expected<gostring>) {
    }
    static $zero(): HeaderFields {
        return new HeaderFields(Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }), Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }), Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }));
    }
    static $copy($source: HeaderFields): HeaderFields {
        return new HeaderFields(Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.Name), Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.Version), Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.Type));
    }
    static $equal($left: HeaderFields, $right: HeaderFields): bool {
        return Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.Name, $right.Name) && Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.Version, $right.Version) && Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.Type, $right.Type);
    }
    static $hash($source: HeaderFields): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.Name));
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.Version));
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.Type));
        return $hash;
    }
    declare private readonly then?: never;
}
export class PathFields {
    declare private readonly $goType: void;
    public constructor(public TSConfig: Expected<gostring>, public Main: Expected<gostring>, public Types: Expected<gostring>, public Typings: Expected<gostring>, public TypesVersions: JSONValue, public Imports: ExportsOrImports, public Exports: ExportsOrImports) {
    }
    static $zero(): PathFields {
        return new PathFields(Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }), Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }), Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }), Expected.$zero<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, (): gostring => {
            return "";
        }), JSONValue.$zero(), ExportsOrImports.$zero(), ExportsOrImports.$zero());
    }
    static $copy($source: PathFields): PathFields {
        return new PathFields(Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.TSConfig), Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.Main), Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.Types), Expected.$copy<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $source.Typings), JSONValue.$copy($source.TypesVersions), ExportsOrImports.$copy($source.Imports), ExportsOrImports.$copy($source.Exports));
    }
    static $equal($left: PathFields, $right: PathFields): bool {
        return Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.TSConfig, $right.TSConfig) && Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.Main, $right.Main) && Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.Types, $right.Types) && Expected.$equal<gostring>(($argument0: gostring, $argument1: gostring): bool => {
            return $argument0 === $argument1;
        }, ($argument0: gostring): gostring => {
            return $argument0;
        }, $left.Typings, $right.Typings) && JSONValue.$equal($left.TypesVersions, $right.TypesVersions) && ExportsOrImports.$equal($left.Imports, $right.Imports) && ExportsOrImports.$equal($left.Exports, $right.Exports);
    }
    static $hash($source: PathFields): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.TSConfig));
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.Main));
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.Types));
        $hash = GoMapHash.mix($hash, Expected.$hash<gostring>(($argument0: gostring): gostring => {
            return $argument0;
        }, ($argument0: gostring): uint32 => {
            return GoMapHash.string($argument0);
        }, $source.Typings));
        $hash = GoMapHash.mix($hash, JSONValue.$hash($source.TypesVersions));
        $hash = GoMapHash.mix($hash, ExportsOrImports.$hash($source.Imports));
        $hash = GoMapHash.mix($hash, ExportsOrImports.$hash($source.Exports));
        return $hash;
    }
    declare private readonly then?: never;
}
export class DependencyFields {
    declare private readonly $goType: void;
    public constructor(public Dependencies: Expected<GoMapValue<gostring, gostring>>, public DevDependencies: Expected<GoMapValue<gostring, gostring>>, public PeerDependencies: Expected<GoMapValue<gostring, gostring>>, public OptionalDependencies: Expected<GoMapValue<gostring, gostring>>) {
    }
    static $zero(): DependencyFields {
        return new DependencyFields(Expected.$zero<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, (): GoMapValue<gostring, gostring> => {
            return GoMap.nil<gostring, gostring>("");
        }), Expected.$zero<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, (): GoMapValue<gostring, gostring> => {
            return GoMap.nil<gostring, gostring>("");
        }), Expected.$zero<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, (): GoMapValue<gostring, gostring> => {
            return GoMap.nil<gostring, gostring>("");
        }), Expected.$zero<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, (): GoMapValue<gostring, gostring> => {
            return GoMap.nil<gostring, gostring>("");
        }));
    }
    static $copy($source: DependencyFields): DependencyFields {
        return new DependencyFields(Expected.$copy<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, $source.Dependencies), Expected.$copy<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, $source.DevDependencies), Expected.$copy<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, $source.PeerDependencies), Expected.$copy<GoMapValue<gostring, gostring>>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
            return $argument0;
        }, $source.OptionalDependencies));
    }
    declare private readonly then?: never;
    static GetRuntimeDependencyNames(df: tsonicTypeScriptRuntime.Location<DependencyFields> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        let count = 0;
        const __gotots_store_0 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
        const __gotots_results_0 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Dependencies"));
        let deps: GoMapValue<gostring, gostring> = __gotots_results_0[0];
        count += deps.length();
        const __gotots_store_1 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
        const __gotots_results_1 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "PeerDependencies"));
        let peerDeps: GoMapValue<gostring, gostring> = __gotots_results_1[0];
        count += peerDeps.length();
        const __gotots_store_2 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
        const __gotots_results_2 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "OptionalDependencies"));
        let optDeps: GoMapValue<gostring, gostring> = __gotots_results_2[0];
        count += optDeps.length();
        let names: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = NewSetWithSizeHint$string(count);
        const __gotots_range_0 = deps;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            let name = __gotots_range_value_2;
            Set$Add$string(names, name);
        }
        const __gotots_range_1 = peerDeps;
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_1) {
            const __gotots_range_value_4 = __gotots_range_1.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_3;
            let name = __gotots_range_value_5;
            Set$Add$string(names, name);
        }
        const __gotots_range_2 = optDeps;
        const __gotots_range_keys_2 = __gotots_range_2.keys();
        for (const __gotots_range_value_6 of __gotots_range_keys_2) {
            const __gotots_range_value_7 = __gotots_range_2.lookupOk(__gotots_range_value_6);
            if (!__gotots_range_value_7[1]) {
                continue;
            }
            const __gotots_range_value_8 = __gotots_range_value_6;
            let name = __gotots_range_value_8;
            Set$Add$string(names, name);
        }
        return names;
    }
    static RangeDependencies(df: tsonicTypeScriptRuntime.Location<DependencyFields> | undefined, f: (($0: gostring, $1: gostring, $2: gostring) => bool) | undefined): void {
        {
            const __gotots_store_3 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
            const __gotots_results_3 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Dependencies"));
            let deps: GoMapValue<gostring, gostring> = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                const __gotots_range_3 = deps;
                const __gotots_range_keys_3 = __gotots_range_3.keys();
                for (const __gotots_range_value_9 of __gotots_range_keys_3) {
                    const __gotots_range_value_10 = __gotots_range_3.lookupOk(__gotots_range_value_9);
                    if (!__gotots_range_value_10[1]) {
                        continue;
                    }
                    const __gotots_range_value_11 = __gotots_range_value_9;
                    const __gotots_range_value_12 = __gotots_range_value_10[0];
                    let name = __gotots_range_value_11;
                    let version = __gotots_range_value_12;
                    const __gotots_callee_0 = f;
                    const __gotots_argument_0 = name;
                    const __gotots_argument_1 = version;
                    const __gotots_argument_2 = "dependencies";
                    if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2)) {
                        return;
                    }
                }
            }
        }
        {
            const __gotots_store_4 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
            const __gotots_results_4 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "DevDependencies"));
            let devDeps: GoMapValue<gostring, gostring> = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                const __gotots_range_4 = devDeps;
                const __gotots_range_keys_4 = __gotots_range_4.keys();
                for (const __gotots_range_value_13 of __gotots_range_keys_4) {
                    const __gotots_range_value_14 = __gotots_range_4.lookupOk(__gotots_range_value_13);
                    if (!__gotots_range_value_14[1]) {
                        continue;
                    }
                    const __gotots_range_value_15 = __gotots_range_value_13;
                    const __gotots_range_value_16 = __gotots_range_value_14[0];
                    let name = __gotots_range_value_15;
                    let version = __gotots_range_value_16;
                    const __gotots_callee_1 = f;
                    const __gotots_argument_3 = name;
                    const __gotots_argument_4 = version;
                    const __gotots_argument_5 = "devDependencies";
                    if (!(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5)) {
                        return;
                    }
                }
            }
        }
        {
            const __gotots_store_5 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
            const __gotots_results_5 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "PeerDependencies"));
            let peerDeps: GoMapValue<gostring, gostring> = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (ok) {
                const __gotots_range_5 = peerDeps;
                const __gotots_range_keys_5 = __gotots_range_5.keys();
                for (const __gotots_range_value_17 of __gotots_range_keys_5) {
                    const __gotots_range_value_18 = __gotots_range_5.lookupOk(__gotots_range_value_17);
                    if (!__gotots_range_value_18[1]) {
                        continue;
                    }
                    const __gotots_range_value_19 = __gotots_range_value_17;
                    const __gotots_range_value_20 = __gotots_range_value_18[0];
                    let name = __gotots_range_value_19;
                    let version = __gotots_range_value_20;
                    const __gotots_callee_2 = f;
                    const __gotots_argument_6 = name;
                    const __gotots_argument_7 = version;
                    const __gotots_argument_8 = "peerDependencies";
                    if (!(__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8)) {
                        return;
                    }
                }
            }
        }
        {
            const __gotots_store_6 = ((df ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DependencyFields>).value;
            const __gotots_results_6 = Expected$GetValue$MapOf_string_To_string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "OptionalDependencies"));
            let optDeps: GoMapValue<gostring, gostring> = __gotots_results_6[0];
            let ok = __gotots_results_6[1];
            if (ok) {
                const __gotots_range_6 = optDeps;
                const __gotots_range_keys_6 = __gotots_range_6.keys();
                for (const __gotots_range_value_21 of __gotots_range_keys_6) {
                    const __gotots_range_value_22 = __gotots_range_6.lookupOk(__gotots_range_value_21);
                    if (!__gotots_range_value_22[1]) {
                        continue;
                    }
                    const __gotots_range_value_23 = __gotots_range_value_21;
                    const __gotots_range_value_24 = __gotots_range_value_22[0];
                    let name = __gotots_range_value_23;
                    let version = __gotots_range_value_24;
                    const __gotots_callee_3 = f;
                    const __gotots_argument_9 = name;
                    const __gotots_argument_10 = version;
                    const __gotots_argument_11 = "optionalDependencies";
                    if (!(__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11)) {
                        return;
                    }
                }
            }
        }
    }
}
export class Fields {
    declare private readonly $goType: void;
    public constructor(public HeaderFields: HeaderFields, public PathFields: PathFields, public DependencyFields: DependencyFields) {
    }
    static $zero(): Fields {
        return new Fields(HeaderFields.$zero(), PathFields.$zero(), DependencyFields.$zero());
    }
    static $copy($source: Fields): Fields {
        return new Fields(HeaderFields.$copy($source.HeaderFields), PathFields.$copy($source.PathFields), DependencyFields.$copy($source.DependencyFields));
    }
    declare private readonly then?: never;
}
export function Parse(data: RuntimeSlice<uint8>): [
    Fields,
    GoInterface | undefined
] {
    let f = Fields.$zero();
    const f$location = tsonicTypeScriptRuntime.boundLocation({}, () => f, f$next => f = f$next);
    {
        let err: GoInterface | undefined = Unmarshal__from_json__package_1(data, new GoInterfaceAdapter(f$location), RuntimeSlice.literal<Options__from_jsonopts | undefined>([AllowDuplicateNames__from_json__package_1(true)]));
        if (!(err === undefined)) {
            return [new Fields(HeaderFields.$zero(), PathFields.$zero(), DependencyFields.$zero()), err];
        }
    }
    return [Fields.$copy(f), void 0];
}
