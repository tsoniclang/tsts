import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Value as Value__from_jsontext } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { RepopulateDiagnosticKind as RepopulateDiagnosticKind__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedMap as OrderedMap__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Category as Category__from_diagnostics, Key as Key__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { ComparePathsOptions as ComparePathsOptions__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { FileEmitKind } from "./snapshot.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { CompilerOptions as CompilerOptions__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Version as Version__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Marshal as Marshal__from_json__package_1, Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { $state as $state__tsoptions, CommandLineOptionNameMap as CommandLineOptionNameMap__from_tsoptions, ConvertOptionToAbsolutePath as ConvertOptionToAbsolutePath__from_tsoptions, ParseCompilerOptions as ParseCompilerOptions__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewOrderedMapWithSizeHint$Named_tspath$Path$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { OrderedMap$Entries$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$Named_tspath$Path$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$Keys$Named_tspath$Path$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { OrderedMap$Set$Named_tspath$Path$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { IfElse$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$Array2Of_Named_incremental$BuildInfoFileId, $goInterfaceAdapter$Array2Of_int, $goInterfaceAdapter$PointerTo_Array2Of_int, $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoDiagnosticsOfFile, $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoFileId, $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoFileInfoNoSignature, $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoFileInfoWithSignature, $goInterfaceAdapter$PointerTo_PointerTo_Array2Of_int, $goInterfaceAdapter$PointerTo_SliceOf_Interface_void, $goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$Value, $goInterfaceAdapter$PointerTo_SliceOf_PointerTo_Named_incremental$BuildInfoDiagnostic, $goInterfaceAdapter$PointerTo_SliceOf_int, $goInterfaceAdapter$PointerTo_int, $goInterfaceAdapter$PointerTo_string, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$SliceOf_Named_incremental$BuildInfoFileId, $goInterfaceAdapter$SliceOf_PointerTo_Named_incremental$BuildInfoDiagnostic, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$SliceOf_int, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_incremental$BuildInfoFileId as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_incremental$BuildInfoFileInfo as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { FileEmitKindDts$constant, FileEmitKindDtsErrors$constant, FileInfo, emitSignature, getPendingEmitKindWithOptions } from "./snapshot.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoArray, goArrayLocation } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class BuildInfoFileId implements GoContainerStoredValue<int> {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare readonly [$goContainerStorageType]: int;
    declare private readonly then?: never;
}
export class BuildInfoFileIdListId {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export class BuildInfoRoot {
    declare private readonly $goType: void;
    public constructor(public Start: BuildInfoFileId, public End: BuildInfoFileId, public NonIncremental: gostring) {
    }
    static $copy($source: BuildInfoRoot): BuildInfoRoot {
        return new BuildInfoRoot($source.Start, $source.End, $source.NonIncremental);
    }
    static $equal($left: BuildInfoRoot, $right: BuildInfoRoot): bool {
        return $left.Start.$value === $right.Start.$value && $left.End.$value === $right.End.$value && $left.NonIncremental === $right.NonIncremental;
    }
    static $hash($source: BuildInfoRoot): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Start.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.End.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.NonIncremental));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(b: {
        value: BuildInfoRoot;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start.$value ===
            ((void BuildInfoFileId,
                0) as int))) {
            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End.$value ===
                ((void BuildInfoFileId,
                    0) as int))) {
                return Marshal__from_json__package_1(new $goInterfaceAdapter$Array2Of_Named_incremental$BuildInfoFileId(GoArray.literal<int, 2>(2, ((void BuildInfoFileId,
                    0) as int), [0, 1], [(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start.$value, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End.$value])), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            }
            else {
                return Marshal__from_json__package_1(new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            }
        }
        else {
            return Marshal__from_json__package_1(new $goInterfaceAdapter$string((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NonIncremental), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
    }
    static UnmarshalJSON(b: {
        value: BuildInfoRoot;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let startAndEnd: tsonicTypeScriptRuntime.Location<GoArray<int, 2>> | undefined = void 0;
        const startAndEnd$location = tsonicTypeScriptRuntime.boundLocation({}, () => startAndEnd, startAndEnd$next => startAndEnd = startAndEnd$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_PointerTo_Array2Of_int(startAndEnd$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                let start = 0;
                const start$location = tsonicTypeScriptRuntime.boundLocation({}, () => start, start$next => start = start$next);
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_int(start$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        let name = "";
                        const name$location = tsonicTypeScriptRuntime.boundLocation({}, () => name, name$next => name = name$next);
                        {
                            let err__shadow_2: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_string(name$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                            if (!(err__shadow_2 === undefined)) {
                                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoRoot: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
                            }
                        }
                        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                            new BuildInfoRoot(new BuildInfoFileId(0), new BuildInfoFileId(0), name));
                        return void 0;
                    }
                }
                void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    new BuildInfoRoot(new BuildInfoFileId(start), new BuildInfoFileId(0), ""));
                return void 0;
            }
        }
        const __gotots_store_2 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_0 = startAndEnd;
        const __gotots_address_1 = 0;
        const __gotots_address_2 = ((__gotots_address_0 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoArray<int, 2>>).value;
        const __gotots_address_3 = __gotots_address_2;
        __gotots_address_3.get(__gotots_address_1);
        const __gotots_address_4 = goArrayLocation(__gotots_address_3);
        const __gotots_field_0 = new BuildInfoFileId(((tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_4, 0), __gotots_address_4[1] + globalThis.Number(__gotots_address_1))
            ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value);
        const __gotots_address_5 = startAndEnd;
        const __gotots_address_6 = 1;
        const __gotots_address_7 = ((__gotots_address_5 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoArray<int, 2>>).value;
        const __gotots_address_8 = __gotots_address_7;
        __gotots_address_8.get(__gotots_address_6);
        const __gotots_address_9 = goArrayLocation(__gotots_address_8);
        const __gotots_field_1 = new BuildInfoFileId(((tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_9, 0), __gotots_address_9[1] + globalThis.Number(__gotots_address_6))
            ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value);
        void (__gotots_store_2.value =
            new BuildInfoRoot(__gotots_field_0, __gotots_field_1, ""));
        return void 0;
    }
}
export class buildInfoFileInfoNoSignature {
    declare private readonly $goType: void;
    public constructor(public Version: gostring, public NoSignature: bool, public AffectsGlobalScope: bool, public ImpliedNodeFormat: ModuleKind__from_core) {
    }
    static $zero(): buildInfoFileInfoNoSignature {
        return new buildInfoFileInfoNoSignature("", false, false, 0);
    }
    static $copy($source: buildInfoFileInfoNoSignature): buildInfoFileInfoNoSignature {
        return new buildInfoFileInfoNoSignature($source.Version, $source.NoSignature, $source.AffectsGlobalScope, $source.ImpliedNodeFormat);
    }
    static $equal($left: buildInfoFileInfoNoSignature, $right: buildInfoFileInfoNoSignature): bool {
        return $left.Version === $right.Version && $left.NoSignature === $right.NoSignature && $left.AffectsGlobalScope === $right.AffectsGlobalScope && $left.ImpliedNodeFormat === $right.ImpliedNodeFormat;
    }
    static $hash($source: buildInfoFileInfoNoSignature): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Version));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.NoSignature));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.AffectsGlobalScope));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ImpliedNodeFormat));
        return $hash;
    }
    declare private readonly then?: never;
    $tsonicReplace($value: buildInfoFileInfoNoSignature): void {
        this.Version = $value.Version;
        this.NoSignature = $value.NoSignature;
        this.AffectsGlobalScope = $value.AffectsGlobalScope;
        this.ImpliedNodeFormat = $value.ImpliedNodeFormat;
    }
}
export class buildInfoFileInfoWithSignature {
    declare private readonly $goType: void;
    public constructor(public Version: gostring, public Signature: gostring, public AffectsGlobalScope: bool, public ImpliedNodeFormat: ModuleKind__from_core) {
    }
    static $zero(): buildInfoFileInfoWithSignature {
        return new buildInfoFileInfoWithSignature("", "", false, 0);
    }
    static $copy($source: buildInfoFileInfoWithSignature): buildInfoFileInfoWithSignature {
        return new buildInfoFileInfoWithSignature($source.Version, $source.Signature, $source.AffectsGlobalScope, $source.ImpliedNodeFormat);
    }
    static $equal($left: buildInfoFileInfoWithSignature, $right: buildInfoFileInfoWithSignature): bool {
        return $left.Version === $right.Version && $left.Signature === $right.Signature && $left.AffectsGlobalScope === $right.AffectsGlobalScope && $left.ImpliedNodeFormat === $right.ImpliedNodeFormat;
    }
    static $hash($source: buildInfoFileInfoWithSignature): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Version));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Signature));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.AffectsGlobalScope));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ImpliedNodeFormat));
        return $hash;
    }
    declare private readonly then?: never;
    $tsonicReplace($value: buildInfoFileInfoWithSignature): void {
        this.Version = $value.Version;
        this.Signature = $value.Signature;
        this.AffectsGlobalScope = $value.AffectsGlobalScope;
        this.ImpliedNodeFormat = $value.ImpliedNodeFormat;
    }
}
export class BuildInfoFileInfo {
    declare private readonly $goType: void;
    public constructor(public signature: gostring, public noSignature: buildInfoFileInfoNoSignature | undefined, public fileInfo: buildInfoFileInfoWithSignature | undefined) {
    }
    static $copy($source: BuildInfoFileInfo): BuildInfoFileInfo {
        return new BuildInfoFileInfo($source.signature, $source.noSignature, $source.fileInfo);
    }
    static $equal($left: BuildInfoFileInfo, $right: BuildInfoFileInfo): bool {
        return $left.signature === $right.signature &&
            $left.noSignature
                ===
                    $right.noSignature &&
            $left.fileInfo
                ===
                    $right.fileInfo;
    }
    static $hash($source: BuildInfoFileInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.signature));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.noSignature));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.fileInfo));
        return $hash;
    }
    declare private readonly then?: never;
    static GetFileInfo(b: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined): {
        value: FileInfo;
    } | undefined {
        if (b === undefined) {
            return void 0;
        }
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.signature !== "") {
            return { value: new FileInfo(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.signature, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.signature, false, ResolutionModeCommonJS$constant__from_core()) };
        }
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.noSignature === undefined)) {
            return { value: new FileInfo((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.noSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Version, "", (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.noSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AffectsGlobalScope, (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.noSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ImpliedNodeFormat) };
        }
        return { value: new FileInfo((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Version, IfElse$string((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature === "", (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Version, (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature), (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AffectsGlobalScope, (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ImpliedNodeFormat) };
    }
    static MarshalJSON(b: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.signature !== "") {
            return Marshal__from_json__package_1(new $goInterfaceAdapter$string(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.signature), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.noSignature === undefined)) {
            return Marshal__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoFileInfoNoSignature(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.noSignature), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        return Marshal__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoFileInfoWithSignature(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfoFileInfo>).value.fileInfo), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let vSignature = "";
        const vSignature$location = tsonicTypeScriptRuntime.boundLocation({}, () => vSignature, vSignature$next => vSignature = vSignature$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_string(vSignature$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                let noSignature = buildInfoFileInfoNoSignature.$zero();
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoFileInfoNoSignature(noSignature), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined) || !noSignature.NoSignature) {
                        let fileInfo = buildInfoFileInfoWithSignature.$zero();
                        {
                            let err__shadow_2: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_incremental$buildInfoFileInfoWithSignature(fileInfo), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                            if (!(err__shadow_2 === undefined)) {
                                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoFileInfo: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
                            }
                        }
                        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                            new BuildInfoFileInfo("", void 0, fileInfo));
                        return void 0;
                    }
                }
                void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    new BuildInfoFileInfo("", noSignature, void 0));
                return void 0;
            }
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new BuildInfoFileInfo(vSignature, void 0, void 0));
        return void 0;
    }
}
export function newBuildInfoFileInfo(fileInfo: {
    value: FileInfo;
} | undefined): tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined {
    if ((fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version === (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature) {
        if (!(fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope && (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.impliedNodeFormat === ResolutionModeCommonJS$constant__from_core()) {
            return tsonicTypeScriptRuntime.location<BuildInfoFileInfo>(new BuildInfoFileInfo((fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature, void 0, void 0));
        }
    }
    else if ((fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature === "") {
        return tsonicTypeScriptRuntime.location<BuildInfoFileInfo>(new BuildInfoFileInfo("", new buildInfoFileInfoNoSignature((fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version, true, (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope, (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.impliedNodeFormat), void 0));
    }
    return tsonicTypeScriptRuntime.location<BuildInfoFileInfo>(new BuildInfoFileInfo("", void 0, new buildInfoFileInfoWithSignature((fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version, IfElse$string((fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature === (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version, "", (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature), (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope, (fileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.impliedNodeFormat)));
}
export class BuildInfoReferenceMapEntry {
    declare private readonly $goType: void;
    public constructor(public FileId: BuildInfoFileId, public FileIdListId: BuildInfoFileIdListId) {
    }
    static $copy($source: BuildInfoReferenceMapEntry): BuildInfoReferenceMapEntry {
        return new BuildInfoReferenceMapEntry($source.FileId, $source.FileIdListId);
    }
    static $equal($left: BuildInfoReferenceMapEntry, $right: BuildInfoReferenceMapEntry): bool {
        return $left.FileId.$value === $right.FileId.$value && $left.FileIdListId.$value === $right.FileIdListId.$value;
    }
    static $hash($source: BuildInfoReferenceMapEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.FileId.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.FileIdListId.$value));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(b: {
        value: BuildInfoReferenceMapEntry;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Marshal__from_json__package_1(new $goInterfaceAdapter$Array2Of_int(GoArray.literal<int, 2>(2, 0, [0, 1], [(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId.$value, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileIdListId.$value])), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: {
        value: BuildInfoReferenceMapEntry;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let v: tsonicTypeScriptRuntime.Location<GoArray<int, 2>> | undefined = void 0;
        const v$location = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next => v = v$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_PointerTo_Array2Of_int(v$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                return err;
            }
        }
        const __gotots_store_3 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_address_10 = v;
        const __gotots_address_11 = 0;
        const __gotots_address_12 = ((__gotots_address_10 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoArray<int, 2>>).value;
        const __gotots_address_13 = __gotots_address_12;
        __gotots_address_13.get(__gotots_address_11);
        const __gotots_address_14 = goArrayLocation(__gotots_address_13);
        const __gotots_field_2 = new BuildInfoFileId(((tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_14, 0), __gotots_address_14[1] + globalThis.Number(__gotots_address_11))
            ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value);
        const __gotots_address_15 = v;
        const __gotots_address_16 = 1;
        const __gotots_address_17 = ((__gotots_address_15 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<GoArray<int, 2>>).value;
        const __gotots_address_18 = __gotots_address_17;
        __gotots_address_18.get(__gotots_address_16);
        const __gotots_address_19 = goArrayLocation(__gotots_address_18);
        const __gotots_field_3 = new BuildInfoFileIdListId(((tsonicTypeScriptRuntime.nestedPropertyLocation(tsonicTypeScriptRuntime.propertyLocation(__gotots_address_19, 0), __gotots_address_19[1] + globalThis.Number(__gotots_address_16))
            ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value);
        void (__gotots_store_3.value =
            new BuildInfoReferenceMapEntry(__gotots_field_2, __gotots_field_3));
        return void 0;
    }
}
export class BuildInfoDiagnostic {
    declare private readonly $goType: void;
    public constructor(public File: BuildInfoFileId, public NoFile: bool, public Pos: int, public End: int, public Code: int32, public Category: Category__from_diagnostics, public MessageKey: Key__from_diagnostics, public MessageArgs: RuntimeSlice<gostring>, public MessageChain: RuntimeSlice<{
        value: BuildInfoDiagnostic;
    } | undefined>, public RelatedInformation: RuntimeSlice<{
        value: BuildInfoDiagnostic;
    } | undefined>, public ReportsUnnecessary: bool, public ReportsDeprecated: bool, public SkippedOnNoEmit: bool, public RepopulateInfo: {
        value: BuildInfoRepopulateInfo;
    } | undefined) {
    }
    static $copy($source: BuildInfoDiagnostic): BuildInfoDiagnostic {
        return new BuildInfoDiagnostic($source.File, $source.NoFile, $source.Pos, $source.End, $source.Code, $source.Category, $source.MessageKey, $source.MessageArgs, $source.MessageChain, $source.RelatedInformation, $source.ReportsUnnecessary, $source.ReportsDeprecated, $source.SkippedOnNoEmit, $source.RepopulateInfo);
    }
    declare private readonly then?: never;
}
export class BuildInfoRepopulateInfo {
    declare private readonly $goType: void;
    public constructor(public Kind: RepopulateDiagnosticKind__from_ast, public ModuleReference: gostring, public Mode: ModuleKind__from_core, public PackageName: gostring) {
    }
    static $copy($source: BuildInfoRepopulateInfo): BuildInfoRepopulateInfo {
        return new BuildInfoRepopulateInfo($source.Kind, $source.ModuleReference, $source.Mode, $source.PackageName);
    }
    static $equal($left: BuildInfoRepopulateInfo, $right: BuildInfoRepopulateInfo): bool {
        return $left.Kind.$value === $right.Kind.$value && $left.ModuleReference === $right.ModuleReference && $left.Mode === $right.Mode && $left.PackageName === $right.PackageName;
    }
    static $hash($source: BuildInfoRepopulateInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Kind.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ModuleReference));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Mode));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PackageName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class BuildInfoDiagnosticsOfFile {
    declare private readonly $goType: void;
    public constructor(public FileId: BuildInfoFileId, public Diagnostics: RuntimeSlice<{
        value: BuildInfoDiagnostic;
    } | undefined>) {
    }
    static $zero(): BuildInfoDiagnosticsOfFile {
        return new BuildInfoDiagnosticsOfFile(new BuildInfoFileId(0), RuntimeSlice.nil<{
            value: BuildInfoDiagnostic;
        } | undefined>());
    }
    static $copy($source: BuildInfoDiagnosticsOfFile): BuildInfoDiagnosticsOfFile {
        return new BuildInfoDiagnosticsOfFile($source.FileId, $source.Diagnostics);
    }
    declare private readonly then?: never;
    static MarshalJSON(b: BuildInfoDiagnosticsOfFile | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let fileIdAndDiagnostics = RuntimeSlice.make<GoInterface | undefined>(0, 2, void 0);
        fileIdAndDiagnostics = fileIdAndDiagnostics.append(void 0, [new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileId)]);
        fileIdAndDiagnostics = fileIdAndDiagnostics.append(void 0, [new $goInterfaceAdapter$SliceOf_PointerTo_Named_incremental$BuildInfoDiagnostic((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostics)]);
        return Marshal__from_json__package_1(new $goInterfaceAdapter$SliceOf_Interface_void(fileIdAndDiagnostics), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: BuildInfoDiagnosticsOfFile | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let fileIdAndDiagnostics = RuntimeSlice.nil<Value__from_jsontext>();
        const fileIdAndDiagnostics$location = tsonicTypeScriptRuntime.boundLocation({}, () => fileIdAndDiagnostics, fileIdAndDiagnostics$next => fileIdAndDiagnostics = fileIdAndDiagnostics$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_SliceOf_Named_jsontext$Value(fileIdAndDiagnostics$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoDiagnosticsOfFile: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
            }
        }
        if (fileIdAndDiagnostics.length !== 2) {
            return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoDiagnosticsOfFile: expected 2 elements, got %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(fileIdAndDiagnostics.length)])));
        }
        let fileId = new BuildInfoFileId(0);
        const fileId$location = tsonicTypeScriptRuntime.boundLocation({}, () => fileId, fileId$next => fileId = fileId$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(fileIdAndDiagnostics.get(0).$value, new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoFileId(fileId$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid fileId in BuildInfoDiagnosticsOfFile: %w", RuntimeSlice.literal<GoInterface | undefined>([err])));
            }
        }
        let diagnostics__shadow_1 = RuntimeSlice.nil<{
            value: BuildInfoDiagnostic;
        } | undefined>();
        const diagnostics__shadow_1$location = tsonicTypeScriptRuntime.boundLocation({}, () => diagnostics__shadow_1, diagnostics__shadow_1$next => diagnostics__shadow_1 = diagnostics__shadow_1$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(fileIdAndDiagnostics.get(1).$value, new $goInterfaceAdapter$PointerTo_SliceOf_PointerTo_Named_incremental$BuildInfoDiagnostic(diagnostics__shadow_1$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid diagnostics in BuildInfoDiagnosticsOfFile: %w", RuntimeSlice.literal<GoInterface | undefined>([err])));
            }
        }
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).$tsonicReplace(new BuildInfoDiagnosticsOfFile(fileId, diagnostics__shadow_1));
        return void 0;
    }
    $tsonicReplace($value: BuildInfoDiagnosticsOfFile): void {
        this.FileId = $value.FileId;
        this.Diagnostics = $value.Diagnostics;
    }
}
export class BuildInfoSemanticDiagnostic {
    declare private readonly $goType: void;
    public constructor(public FileId: BuildInfoFileId, public Diagnostics: BuildInfoDiagnosticsOfFile | undefined) {
    }
    static $copy($source: BuildInfoSemanticDiagnostic): BuildInfoSemanticDiagnostic {
        return new BuildInfoSemanticDiagnostic($source.FileId, $source.Diagnostics);
    }
    static $equal($left: BuildInfoSemanticDiagnostic, $right: BuildInfoSemanticDiagnostic): bool {
        return $left.FileId.$value === $right.FileId.$value &&
            $left.Diagnostics
                ===
                    $right.Diagnostics;
    }
    static $hash($source: BuildInfoSemanticDiagnostic): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.FileId.$value));
        $hash = GoMapHash.mix($hash, (($pointer3: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer3 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer3)))($source.Diagnostics));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(b: {
        value: BuildInfoSemanticDiagnostic;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId.$value ===
            ((void BuildInfoFileId,
                0) as int))) {
            return Marshal__from_json__package_1(new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        return Marshal__from_json__package_1(new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoDiagnosticsOfFile((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: {
        value: BuildInfoSemanticDiagnostic;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let fileId = new BuildInfoFileId(0);
        const fileId$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => fileId, fileId$next2 => fileId = fileId$next2);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoFileId(fileId$location2), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                let diagnostics__shadow_1 = BuildInfoDiagnosticsOfFile.$zero();
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoDiagnosticsOfFile(diagnostics__shadow_1), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoSemanticDiagnostic: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
                    }
                }
                void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    new BuildInfoSemanticDiagnostic(new BuildInfoFileId(0), diagnostics__shadow_1));
                return void 0;
            }
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new BuildInfoSemanticDiagnostic(fileId, void 0));
        return void 0;
    }
}
export class BuildInfoFilePendingEmit {
    declare private readonly $goType: void;
    public constructor(public FileId: BuildInfoFileId, public EmitKind: FileEmitKind) {
    }
    static $copy($source: BuildInfoFilePendingEmit): BuildInfoFilePendingEmit {
        return new BuildInfoFilePendingEmit($source.FileId, $source.EmitKind);
    }
    static $equal($left: BuildInfoFilePendingEmit, $right: BuildInfoFilePendingEmit): bool {
        return $left.FileId.$value === $right.FileId.$value && $left.EmitKind === $right.EmitKind;
    }
    static $hash($source: BuildInfoFilePendingEmit): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.FileId.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.EmitKind));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(b: {
        value: BuildInfoFilePendingEmit;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitKind === 0) {
            return Marshal__from_json__package_1(new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitKind === FileEmitKindDts$constant()) {
            let fileListIds = RuntimeSlice.literal<int>([(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId.$value]);
            return Marshal__from_json__package_1(new $goInterfaceAdapter$SliceOf_Named_incremental$BuildInfoFileId(fileListIds), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        let fileAndEmitKind = RuntimeSlice.literal<int>([(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId.$value, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitKind]);
        return Marshal__from_json__package_1(new $goInterfaceAdapter$SliceOf_int(fileAndEmitKind), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: {
        value: BuildInfoFilePendingEmit;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let fileId = new BuildInfoFileId(0);
        const fileId$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => fileId, fileId$next3 => fileId = fileId$next3);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoFileId(fileId$location3), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                let intTuple = RuntimeSlice.nil<int>();
                const intTuple$location = tsonicTypeScriptRuntime.boundLocation({}, () => intTuple, intTuple$next => intTuple = intTuple$next);
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_SliceOf_int(intTuple$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined) || intTuple.length === 0) {
                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoFilePendingEmit: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
                    }
                }
                switch (intTuple.length) {
                    case 1: {
                        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                            new BuildInfoFilePendingEmit(new BuildInfoFileId(intTuple.get(0)), FileEmitKindDts$constant()));
                        return void 0;
                        break;
                    }
                    case 2: {
                        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                            new BuildInfoFilePendingEmit(new BuildInfoFileId(intTuple.get(0)), intTuple.get(1) >>> 0));
                        return void 0;
                        break;
                    }
                    default: {
                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoFilePendingEmit: expected 1 or 2 integers, got %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(intTuple.length)])));
                        break;
                    }
                }
            }
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new BuildInfoFilePendingEmit(fileId, 0));
        return void 0;
    }
}
export class BuildInfoEmitSignature {
    declare private readonly $goType: void;
    public constructor(public FileId: BuildInfoFileId, public Signature: gostring, public DiffersOnlyInDtsMap: bool, public DiffersInOptions: bool) {
    }
    static $copy($source: BuildInfoEmitSignature): BuildInfoEmitSignature {
        return new BuildInfoEmitSignature($source.FileId, $source.Signature, $source.DiffersOnlyInDtsMap, $source.DiffersInOptions);
    }
    static $equal($left: BuildInfoEmitSignature, $right: BuildInfoEmitSignature): bool {
        return $left.FileId.$value === $right.FileId.$value && $left.Signature === $right.Signature && $left.DiffersOnlyInDtsMap === $right.DiffersOnlyInDtsMap && $left.DiffersInOptions === $right.DiffersInOptions;
    }
    static $hash($source: BuildInfoEmitSignature): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.FileId.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Signature));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.DiffersOnlyInDtsMap));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.DiffersInOptions));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(b: {
        value: BuildInfoEmitSignature;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        if (BuildInfoEmitSignature.$go$private$incremental$noEmitSignature(b)) {
            return Marshal__from_json__package_1(new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        }
        let fileIdAndSignature = RuntimeSlice.make<GoInterface | undefined>(2, null, void 0);
        fileIdAndSignature.set(0, new GoInterfaceAdapter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId));
        let signature: GoInterface | undefined = void 0;
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersOnlyInDtsMap) {
            signature = new $goInterfaceAdapter$SliceOf_string(RuntimeSlice.literal<gostring>([]));
        }
        else if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersInOptions) {
            signature = new $goInterfaceAdapter$SliceOf_string(RuntimeSlice.literal<gostring>([(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature]));
        }
        else {
            signature = new $goInterfaceAdapter$string((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature);
        }
        fileIdAndSignature.set(1, signature);
        return Marshal__from_json__package_1(new $goInterfaceAdapter$SliceOf_Interface_void(fileIdAndSignature), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: {
        value: BuildInfoEmitSignature;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let fileId = new BuildInfoFileId(0);
        const fileId$location4 = tsonicTypeScriptRuntime.boundLocation({}, () => fileId, fileId$next4 => fileId = fileId$next4);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfoFileId(fileId$location4), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                let fileIdAndSignature = RuntimeSlice.nil<GoInterface | undefined>();
                const fileIdAndSignature$location = tsonicTypeScriptRuntime.boundLocation({}, () => fileIdAndSignature, fileIdAndSignature$next => fileIdAndSignature = fileIdAndSignature$next);
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_SliceOf_Interface_void(fileIdAndSignature$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err__shadow_1 === undefined)) {
                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoEmitSignature: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
                    }
                }
                if (fileIdAndSignature.length !== 2) {
                    return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoEmitSignature: expected 2 elements, got %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(fileIdAndSignature.length)])));
                }
                let fileId__shadow_1 = new BuildInfoFileId(0);
                {
                    const __gotots_results_5 = (($value: GoInterface | undefined): [
                        float64,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$float64.$is($value)) {
                            return [0, false];
                        }
                        return [$value.$go$value, true];
                    })(fileIdAndSignature.get(0));
                    let id = __gotots_results_5[0];
                    let ok = __gotots_results_5[1];
                    if (!ok) {
                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid fileId in BuildInfoEmitSignature: expected float64, got %T", RuntimeSlice.literal<GoInterface | undefined>([fileIdAndSignature.get(0)])));
                    }
                    else {
                        fileId__shadow_1 = new BuildInfoFileId(globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(id))));
                    }
                }
                let signature = "";
                let differsOnlyInDtsMap = false, differsInOptions = false;
                {
                    const __gotots_results_6 = (($value: GoInterface | undefined): [
                        gostring,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$string.$is($value)) {
                            return ["", false];
                        }
                        return [$value.$go$value, true];
                    })(fileIdAndSignature.get(1));
                    let signatureV = __gotots_results_6[0];
                    let ok = __gotots_results_6[1];
                    if (!ok) {
                        {
                            const __gotots_results_7 = (($value: GoInterface | undefined): [
                                RuntimeSlice<GoInterface | undefined>,
                                boolean
                            ] => {
                                if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                                    return [RuntimeSlice.nil<GoInterface | undefined>(), false];
                                }
                                return [$value.$go$value, true];
                            })(fileIdAndSignature.get(1));
                            let signatureList = __gotots_results_7[0];
                            let ok__shadow_1 = __gotots_results_7[1];
                            if (!ok__shadow_1) {
                                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid signature in BuildInfoEmitSignature: expected string or []string, got %T", RuntimeSlice.literal<GoInterface | undefined>([fileIdAndSignature.get(1)])));
                            }
                            else {
                                switch (signatureList.length) {
                                    case 0: {
                                        differsOnlyInDtsMap = true;
                                        break;
                                    }
                                    case 1: {
                                        {
                                            const __gotots_results_8 = (($value: GoInterface | undefined): [
                                                gostring,
                                                boolean
                                            ] => {
                                                if (!$goInterfaceAdapter$string.$is($value)) {
                                                    return ["", false];
                                                }
                                                return [$value.$go$value, true];
                                            })(signatureList.get(0));
                                            let sig = __gotots_results_8[0];
                                            let ok__shadow_2 = __gotots_results_8[1];
                                            if (!ok__shadow_2) {
                                                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid signature in BuildInfoEmitSignature: expected string, got %T", RuntimeSlice.literal<GoInterface | undefined>([signatureList.get(0)])));
                                            }
                                            else {
                                                signature = sig;
                                                differsInOptions = true;
                                            }
                                        }
                                        break;
                                    }
                                    default: {
                                        return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid signature in BuildInfoEmitSignature: expected string or []string with 0 or 1 element, got %d elements", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(signatureList.length)])));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        signature = signatureV;
                    }
                }
                void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    new BuildInfoEmitSignature(fileId__shadow_1, signature, differsOnlyInDtsMap, differsInOptions));
                return void 0;
            }
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new BuildInfoEmitSignature(fileId, "", false, false));
        return void 0;
    }
    static $go$private$incremental$noEmitSignature(b: {
        value: BuildInfoEmitSignature;
    } | undefined): bool {
        return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature === "" && !(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersOnlyInDtsMap && !(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersInOptions;
    }
    static $go$private$incremental$toEmitSignature(b: {
        value: BuildInfoEmitSignature;
    } | undefined, path: Path__from_tspath, emitSignatures: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: emitSignature;
    } | undefined>> | undefined): {
        value: emitSignature;
    } | undefined {
        let signature = "";
        let signatureWithDifferentOptions = RuntimeSlice.nil<gostring>();
        if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersOnlyInDtsMap) {
            signatureWithDifferentOptions = RuntimeSlice.make<gostring>(0, 1, "");
            const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(emitSignatures, path);
            let info: {
                value: emitSignature;
            } | undefined = __gotots_results_1[0];
            signatureWithDifferentOptions = signatureWithDifferentOptions.append("", [(info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature]);
        }
        else if ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersInOptions) {
            signatureWithDifferentOptions = RuntimeSlice.make<gostring>(0, 1, "");
            signatureWithDifferentOptions = signatureWithDifferentOptions.append("", [(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature]);
        }
        else {
            signature = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature;
        }
        return { value: new emitSignature(signature, signatureWithDifferentOptions) };
    }
}
export class BuildInfoResolvedRoot {
    declare private readonly $goType: void;
    public constructor(public Resolved: BuildInfoFileId, public Root: BuildInfoFileId) {
    }
    static $copy($source: BuildInfoResolvedRoot): BuildInfoResolvedRoot {
        return new BuildInfoResolvedRoot($source.Resolved, $source.Root);
    }
    static $equal($left: BuildInfoResolvedRoot, $right: BuildInfoResolvedRoot): bool {
        return $left.Resolved.$value === $right.Resolved.$value && $left.Root.$value === $right.Root.$value;
    }
    static $hash($source: BuildInfoResolvedRoot): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Resolved.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Root.$value));
        return $hash;
    }
    declare private readonly then?: never;
    static MarshalJSON(b: {
        value: BuildInfoResolvedRoot;
    } | undefined): [
        RuntimeSlice<uint8>,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        return Marshal__from_json__package_1(new $goInterfaceAdapter$Array2Of_Named_incremental$BuildInfoFileId(GoArray.literal<int, 2>(2, ((void BuildInfoFileId,
            0) as int), [0, 1], [(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Resolved.$value, (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Root.$value])), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
    }
    static UnmarshalJSON(b: {
        value: BuildInfoResolvedRoot;
    } | undefined, data: RuntimeSlice<uint8>): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let resolvedAndRoot = GoArray.zero<int, 2>(2, 0);
        const resolvedAndRoot$location = tsonicTypeScriptRuntime.boundLocation({}, () => resolvedAndRoot, resolvedAndRoot$next => resolvedAndRoot = resolvedAndRoot$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Unmarshal__from_json__package_1(data, new $goInterfaceAdapter$PointerTo_Array2Of_int(resolvedAndRoot$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                return GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid BuildInfoResolvedRoot: %s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_byte(data)])));
            }
        }
        void ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            new BuildInfoResolvedRoot(new BuildInfoFileId(resolvedAndRoot.get(0)), new BuildInfoFileId(resolvedAndRoot.get(1))));
        return void 0;
    }
}
export class BuildInfo {
    declare private readonly $goType: void;
    public constructor(public Version: gostring, public Errors: bool, public CheckPending: bool, public Root: RuntimeSlice<{
        value: BuildInfoRoot;
    } | undefined>, public FileNames: RuntimeSlice<gostring>, public FileInfos: RuntimeSlice<tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined>, public FileIdsList: RuntimeSlice<RuntimeSlice<int>>, public Options: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, public ReferencedMap: RuntimeSlice<{
        value: BuildInfoReferenceMapEntry;
    } | undefined>, public SemanticDiagnosticsPerFile: RuntimeSlice<{
        value: BuildInfoSemanticDiagnostic;
    } | undefined>, public EmitDiagnosticsPerFile: RuntimeSlice<BuildInfoDiagnosticsOfFile | undefined>, public ChangeFileSet: RuntimeSlice<int>, public AffectedFilesPendingEmit: RuntimeSlice<{
        value: BuildInfoFilePendingEmit;
    } | undefined>, public LatestChangedDtsFile: gostring, public EmitSignatures: RuntimeSlice<{
        value: BuildInfoEmitSignature;
    } | undefined>, public ResolvedRoot: RuntimeSlice<{
        value: BuildInfoResolvedRoot;
    } | undefined>, public SemanticErrors: bool) {
    }
    static $zero(): BuildInfo {
        return new BuildInfo("", false, false, RuntimeSlice.nil<{
            value: BuildInfoRoot;
        } | undefined>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined>(), RuntimeSlice.nil<RuntimeSlice<int>>(), void 0, RuntimeSlice.nil<{
            value: BuildInfoReferenceMapEntry;
        } | undefined>(), RuntimeSlice.nil<{
            value: BuildInfoSemanticDiagnostic;
        } | undefined>(), RuntimeSlice.nil<BuildInfoDiagnosticsOfFile | undefined>(), RuntimeSlice.nil<int>(), RuntimeSlice.nil<{
            value: BuildInfoFilePendingEmit;
        } | undefined>(), "", RuntimeSlice.nil<{
            value: BuildInfoEmitSignature;
        } | undefined>(), RuntimeSlice.nil<{
            value: BuildInfoResolvedRoot;
        } | undefined>(), false);
    }
    static $copy($source: BuildInfo): BuildInfo {
        return new BuildInfo($source.Version, $source.Errors, $source.CheckPending, $source.Root, $source.FileNames, $source.FileInfos, $source.FileIdsList, $source.Options, $source.ReferencedMap, $source.SemanticDiagnosticsPerFile, $source.EmitDiagnosticsPerFile, $source.ChangeFileSet, $source.AffectedFilesPendingEmit, $source.LatestChangedDtsFile, $source.EmitSignatures, $source.ResolvedRoot, $source.SemanticErrors);
    }
    declare private readonly then?: never;
    static GetBuildInfoRootInfoReader(b: BuildInfo | undefined, buildInfoDirectory: gostring, comparePathOptions: ComparePathsOptions__from_tspath): BuildInfoRootInfoReader | undefined {
        let resolvedRootFileInfos: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined> = GoMap.make((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames.length, []);
        let rootToResolved: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, Path__from_tspath>> | undefined = NewOrderedMapWithSizeHint$Named_tspath$Path$Named_tspath$Path((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames.length);
        let resolvedToRoot: GoMapValue<Path__from_tspath, Path__from_tspath> = $goMap$MapOf_Named_tspath$Path_To_Named_tspath$Path.make((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedRoot.length, []);
        let toPath: (($0: gostring) => Path__from_tspath) | undefined = (fileName: gostring): Path__from_tspath => {
            return ToPath__from_tspath(fileName, buildInfoDirectory, comparePathOptions.UseCaseSensitiveFileNames);
        };
        const __gotots_range_1 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ResolvedRoot;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_0);
            let resolved: {
                value: BuildInfoResolvedRoot;
            } | undefined = __gotots_range_value_2;
            const __gotots_store_0 = resolvedToRoot;
            const __gotots_callee_0 = toPath;
            const __gotots_argument_0 = BuildInfo.$go$private$incremental$fileName(b, (resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Resolved);
            const __gotots_store_1 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            const __gotots_callee_1 = toPath;
            const __gotots_argument_1 = BuildInfo.$go$private$incremental$fileName(b, (resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Root);
            __gotots_store_0.store(__gotots_store_1, (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1));
        }
        let addRoot: (($0: gostring, $1: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined) => void) | undefined = (resolvedRoot: gostring, fileInfo: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined): void => {
            const __gotots_callee_2 = toPath;
            const __gotots_argument_2 = resolvedRoot;
            let resolvedRootPath = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
            {
                const __gotots_results_2 = resolvedToRoot.lookupOk(resolvedRootPath);
                let rootPath = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                if (ok) {
                    OrderedMap$Set$Named_tspath$Path$Named_tspath$Path(rootToResolved, rootPath, resolvedRootPath);
                }
                else {
                    OrderedMap$Set$Named_tspath$Path$Named_tspath$Path(rootToResolved, resolvedRootPath, resolvedRootPath);
                }
            }
            if (!(fileInfo === undefined)) {
                resolvedRootFileInfos.store(resolvedRootPath, fileInfo);
            }
        };
        const __gotots_range_2 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Root;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_1);
            let root: {
                value: BuildInfoRoot;
            } | undefined = __gotots_range_value_3;
            if ((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NonIncremental !== "") {
                const __gotots_callee_3 = addRoot;
                const __gotots_argument_3: BuildInfoRoot["NonIncremental"] = (root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NonIncremental;
                const __gotots_argument_4 = void 0;
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4);
            }
            else if ((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End.$value ===
                ((void BuildInfoFileId,
                    0) as int)) {
                const __gotots_callee_4 = addRoot;
                const __gotots_argument_5 = BuildInfo.$go$private$incremental$fileName(b, (root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start);
                const __gotots_argument_6 = BuildInfo.$go$private$incremental$fileInfo(b, (root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start);
                (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6);
            }
            else {
                for (let i: BuildInfoRoot["Start"] = (root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start; i.$value <= (root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End.$value; i = new BuildInfoFileId(i.$value + 1)) {
                    const __gotots_callee_5 = addRoot;
                    const __gotots_argument_7 = BuildInfo.$go$private$incremental$fileName(b, i);
                    const __gotots_argument_8 = BuildInfo.$go$private$incremental$fileInfo(b, i);
                    (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8);
                }
            }
        }
        return new BuildInfoRootInfoReader(resolvedRootFileInfos, rootToResolved);
    }
    static GetCompilerOptions(b: BuildInfo | undefined, buildInfoDirectory: gostring): {
        value: CompilerOptions__from_core;
    } | undefined {
        const __gotots_struct_0 = CompilerOptions__from_core.$zero();
        let options: {
            value: CompilerOptions__from_core;
        } | undefined = { value: __gotots_struct_0 };
        const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
        if (__gotots_range_0 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_0(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
            if (__gotots_range_state_0 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_0 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_0 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_0 = -1;
            const __gotots_range_value_0 = $argument0;
            const __gotots_range_value_1 = $argument1;
            let option = __gotots_range_value_0;
            let value: GoInterface | undefined = __gotots_range_value_1;
            if (buildInfoDirectory !== "") {
                const __gotots_results_0 = ConvertOptionToAbsolutePath__from_tsoptions(option, value, new CommandLineOptionNameMap__from_tsoptions($state__tsoptions.CommandLineCompilerOptionsMap), buildInfoDirectory);
                let result: GoInterface | undefined = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    ParseCompilerOptions__from_tsoptions(option, result, options);
                    __gotots_range_state_0 = 1;
                    return true;
                }
            }
            ParseCompilerOptions__from_tsoptions(option, value, options);
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        return options;
    }
    static IsEmitPending(b: BuildInfo | undefined, resolved: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, buildInfoDirectory: gostring): bool {
        if (!Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit) || CompilerOptions__from_core.GetEmitDeclarations(ParsedCommandLine__from_tsoptions.CompilerOptions(resolved))) {
            let pendingEmit = getPendingEmitKindWithOptions(ParsedCommandLine__from_tsoptions.CompilerOptions(resolved), BuildInfo.GetCompilerOptions(b, buildInfoDirectory));
            if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit)) {
                pendingEmit = (pendingEmit & 8) >>> 0;
            }
            return !(pendingEmit === 0);
        }
        return false;
    }
    static IsIncremental(b: BuildInfo | undefined): bool {
        return !(b === undefined) && (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames.length !== 0;
    }
    static IsValidVersion(b: BuildInfo | undefined): bool {
        return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Version === Version__from_core();
    }
    static $go$private$incremental$fileInfo(b: BuildInfo | undefined, fileId: BuildInfoFileId): tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined {
        return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileInfos.get(((void BuildInfoFileId,
            fileId.$value - 1) as int));
    }
    static $go$private$incremental$fileName(b: BuildInfo | undefined, fileId: BuildInfoFileId): gostring {
        return (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames.get(((void BuildInfoFileId,
            fileId.$value - 1) as int));
    }
    $tsonicReplace($value: BuildInfo): void {
        this.Version = $value.Version;
        this.Errors = $value.Errors;
        this.CheckPending = $value.CheckPending;
        this.Root = $value.Root;
        this.FileNames = $value.FileNames;
        this.FileInfos = $value.FileInfos;
        this.FileIdsList = $value.FileIdsList;
        this.Options = $value.Options;
        this.ReferencedMap = $value.ReferencedMap;
        this.SemanticDiagnosticsPerFile = $value.SemanticDiagnosticsPerFile;
        this.EmitDiagnosticsPerFile = $value.EmitDiagnosticsPerFile;
        this.ChangeFileSet = $value.ChangeFileSet;
        this.AffectedFilesPendingEmit = $value.AffectedFilesPendingEmit;
        this.LatestChangedDtsFile = $value.LatestChangedDtsFile;
        this.EmitSignatures = $value.EmitSignatures;
        this.ResolvedRoot = $value.ResolvedRoot;
        this.SemanticErrors = $value.SemanticErrors;
    }
}
export class BuildInfoRootInfoReader {
    declare private readonly $goType: void;
    public constructor(public resolvedRootFileInfos: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined>, public rootToResolved: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, Path__from_tspath>> | undefined) {
    }
    declare private readonly then?: never;
    static GetBuildInfoFileInfo(b: BuildInfoRootInfoReader | undefined, inputFilePath: Path__from_tspath): [
        tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined,
        Path__from_tspath
    ] {
        {
            const __gotots_results_3 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvedRootFileInfos.lookupOk(inputFilePath);
            let info: tsonicTypeScriptRuntime.Location<BuildInfoFileInfo> | undefined = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                return [info, inputFilePath];
            }
        }
        {
            const __gotots_results_4 = OrderedMap$Get$Named_tspath$Path$Named_tspath$Path((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rootToResolved, inputFilePath);
            let resolved = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                return [(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolvedRootFileInfos.lookup(resolved), resolved];
            }
        }
        return [void 0, new Path__from_tspath("")];
    }
    static Roots(b: BuildInfoRootInfoReader | undefined): iter__from_gostdlib.Seq<Path__from_tspath> {
        return OrderedMap$Keys$Named_tspath$Path$Named_tspath$Path((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rootToResolved);
    }
}
