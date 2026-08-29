import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $state as $state__tspath, ExtensionJson$string as ExtensionJson$string__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$CompilerOptions$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$ConfigName$void_to_string, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string } from "../../../../../../support/interface-methods.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export interface ResolutionHost extends GoInterfaceValue {
    FS(): FS__from_vfs | undefined;
    GetCurrentDirectory(): gostring;
}
export const ResolutionHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string]);
export function ResolutionHost$is(value: GoInterfaceValue | undefined): value is ResolutionHost {
    return value !== undefined && value.$go$implements(ResolutionHost$contract);
}
export type ModeAwareCacheKey$Storage = {
    Name: gostring;
    Mode: int32;
};
export class ModeAwareCacheKey implements GoContainerStoredValue<ModeAwareCacheKey$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ModeAwareCacheKey$Storage) {
    }
    public static $storageOf($source: ModeAwareCacheKey): ModeAwareCacheKey$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ModeAwareCacheKey$Storage): ModeAwareCacheKey {
        return new ModeAwareCacheKey($source);
    }
    public get Name(): gostring {
        return this.$storage.Name;
    }
    public set Name($value: gostring) {
        this.$storage.Name = $value;
    }
    public get Mode(): ModuleKind__from_core {
        return this.$storage.Mode;
    }
    public set Mode($value: ModuleKind__from_core) {
        this.$storage.Mode = $value;
    }
    declare readonly [$goContainerStorageType]: ModeAwareCacheKey$Storage;
    static $copy($source: ModeAwareCacheKey): ModeAwareCacheKey {
        return new ModeAwareCacheKey({
            Name: $source.$storage.Name,
            Mode: $source.$storage.Mode
        });
    }
    static $equal($left: ModeAwareCacheKey, $right: ModeAwareCacheKey): bool {
        return $left.$storage.Name === $right.$storage.Name && $left.$storage.Mode === $right.$storage.Mode;
    }
    static $hash($source: ModeAwareCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Name));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Mode));
        return $hash;
    }
    declare private readonly then?: never;
}
export interface ResolvedProjectReference extends GoInterfaceValue {
    CompilerOptions(): {
        value: CompilerOptions__from_core;
    } | undefined;
    ConfigName(): gostring;
}
export const ResolvedProjectReference$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CompilerOptions$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$ConfigName$void_to_string]);
export function ResolvedProjectReference$is(value: GoInterfaceValue | undefined): value is ResolvedProjectReference {
    return value !== undefined && value.$go$implements(ResolvedProjectReference$contract);
}
export type NodeResolutionFeatures = int32;
export function NodeResolutionFeaturesImports$constant(): NodeResolutionFeatures {
    return 1;
}
export function NodeResolutionFeaturesSelfName$constant(): NodeResolutionFeatures {
    return 2;
}
export function NodeResolutionFeaturesExports$constant(): NodeResolutionFeatures {
    return 4;
}
export function NodeResolutionFeaturesExportsPatternTrailers$constant(): NodeResolutionFeatures {
    return 8;
}
export function NodeResolutionFeaturesImportsPatternRoot$constant(): NodeResolutionFeatures {
    return 16;
}
export function NodeResolutionFeaturesNone$constant(): NodeResolutionFeatures {
    return 0;
}
export function NodeResolutionFeaturesAll$constant(): NodeResolutionFeatures {
    return 31;
}
export function NodeResolutionFeaturesNode16Default$constant(): NodeResolutionFeatures {
    return 15;
}
export function NodeResolutionFeaturesNodeNextDefault$constant(): NodeResolutionFeatures {
    return 31;
}
export function NodeResolutionFeaturesBundlerDefault$constant(): NodeResolutionFeatures {
    return 31;
}
export type PackageId$Storage = {
    Name: gostring;
    SubModuleName: gostring;
    Version: gostring;
    PeerDependencies: gostring;
};
export class PackageId {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: PackageId$Storage) {
    }
    public static $storageOf($source: PackageId): PackageId$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: PackageId$Storage): PackageId {
        return new PackageId($source);
    }
    public get Name(): gostring {
        return this.$storage.Name;
    }
    public set Name($value: gostring) {
        this.$storage.Name = $value;
    }
    public get SubModuleName(): gostring {
        return this.$storage.SubModuleName;
    }
    public set SubModuleName($value: gostring) {
        this.$storage.SubModuleName = $value;
    }
    public get Version(): gostring {
        return this.$storage.Version;
    }
    public set Version($value: gostring) {
        this.$storage.Version = $value;
    }
    public get PeerDependencies(): gostring {
        return this.$storage.PeerDependencies;
    }
    public set PeerDependencies($value: gostring) {
        this.$storage.PeerDependencies = $value;
    }
    static $zero(): PackageId {
        return new PackageId({
            Name: "",
            SubModuleName: "",
            Version: "",
            PeerDependencies: ""
        });
    }
    static $copy($source: PackageId): PackageId {
        return new PackageId({
            Name: $source.$storage.Name,
            SubModuleName: $source.$storage.SubModuleName,
            Version: $source.$storage.Version,
            PeerDependencies: $source.$storage.PeerDependencies
        });
    }
    static $equal($left: PackageId, $right: PackageId): bool {
        return $left.$storage.Name === $right.$storage.Name && $left.$storage.SubModuleName === $right.$storage.SubModuleName && $left.$storage.Version === $right.$storage.Version && $left.$storage.PeerDependencies === $right.$storage.PeerDependencies;
    }
    static $hash($source: PackageId): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Name));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.SubModuleName));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.Version));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.PeerDependencies));
        return $hash;
    }
    static $zeroStorage(): PackageId$Storage {
        return {
            Name: "",
            SubModuleName: "",
            Version: "",
            PeerDependencies: ""
        };
    }
    declare private readonly then?: never;
    static PackageName(p: tsonicTypeScriptRuntime.Location<PackageId> | undefined): gostring {
        if (PackageId.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PackageId>).value).SubModuleName !== "") {
            return PackageId.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PackageId>).value).Name + "/" + PackageId.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PackageId>).value).SubModuleName;
        }
        return PackageId.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PackageId>).value).Name;
    }
    static String(p: tsonicTypeScriptRuntime.Location<PackageId> | undefined): gostring {
        return fmt__from_gostdlib.Sprintf("%s@%s%s", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(PackageId.PackageName(p)), new GoInterfaceAdapter(PackageId.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PackageId>).value).Version), new GoInterfaceAdapter(PackageId.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PackageId>).value).PeerDependencies)]));
    }
}
export class ResolvedModule {
    declare private readonly $goType: void;
    public constructor(public ResolutionDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public ResolvedFileName: gostring, public OriginalPath: gostring, public Extension: gostring, public ResolvedUsingTsExtension: bool, public PackageId: PackageId, public IsExternalLibraryImport: bool, public AlternateResult: gostring) {
    }
    static $zero(): ResolvedModule {
        return new ResolvedModule(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), "", "", "", false, PackageId.$zero(), false, "");
    }
    static $copy($source: ResolvedModule): ResolvedModule {
        return new ResolvedModule($source.ResolutionDiagnostics, $source.ResolvedFileName, $source.OriginalPath, $source.Extension, $source.ResolvedUsingTsExtension, PackageId.$copy($source.PackageId), $source.IsExternalLibraryImport, $source.AlternateResult);
    }
    declare private readonly then?: never;
    static IsResolved(r: tsonicTypeScriptRuntime.Location<ResolvedModule> | undefined): bool {
        return !(r === undefined) && ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule>).value.ResolvedFileName !== "";
    }
}
export class ResolvedTypeReferenceDirective {
    declare private readonly $goType: void;
    public constructor(public ResolutionDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public Primary: bool, public ResolvedFileName: gostring, public OriginalPath: gostring, public PackageId: PackageId, public IsExternalLibraryImport: bool) {
    }
    static $zero(): ResolvedTypeReferenceDirective {
        return new ResolvedTypeReferenceDirective(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), false, "", "", PackageId.$zero(), false);
    }
    static $copy($source: ResolvedTypeReferenceDirective): ResolvedTypeReferenceDirective {
        return new ResolvedTypeReferenceDirective($source.ResolutionDiagnostics, $source.Primary, $source.ResolvedFileName, $source.OriginalPath, PackageId.$copy($source.PackageId), $source.IsExternalLibraryImport);
    }
    declare private readonly then?: never;
    static IsResolved(r: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective> | undefined): bool {
        return ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective>).value.ResolvedFileName !== "";
    }
}
export type extensions = int32;
export function extensionsTypeScript$constant(): extensions {
    return 1;
}
export function extensionsJavaScript$constant(): extensions {
    return 2;
}
export function extensionsDeclaration$constant(): extensions {
    return 4;
}
export function extensionsJson$constant(): extensions {
    return 8;
}
export function extensionsImplementationFiles$constant(): extensions {
    return 3;
}
export function extensions_String(e: extensions): gostring {
    let result = RuntimeSlice.make<gostring>(0, globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.OnesCount(BigInt.asUintN(64, goNumberToBigInt(globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(e)))))))), "");
    if (!((e & extensionsTypeScript$constant()) === 0)) {
        result = result.append("", ["TypeScript"]);
    }
    if (!((e & extensionsJavaScript$constant()) === 0)) {
        result = result.append("", ["JavaScript"]);
    }
    if (!((e & extensionsDeclaration$constant()) === 0)) {
        result = result.append("", ["Declaration"]);
    }
    if (!((e & extensionsJson$constant()) === 0)) {
        result = result.append("", ["JSON"]);
    }
    return strings__from_gostdlib.Join(result, ", ");
}
export function extensions_Array(e: extensions): RuntimeSlice<gostring> {
    let result = RuntimeSlice.literal<gostring>([]);
    if (!((e & extensionsTypeScript$constant()) === 0)) {
        result = goSliceAppendSlice<gostring>(result, $state__tspath.SupportedTSImplementationExtensions, "");
    }
    if (!((e & extensionsJavaScript$constant()) === 0)) {
        result = goSliceAppendSlice<gostring>(result, $state__tspath.SupportedJSExtensionsFlat, "");
    }
    if (!((e & extensionsDeclaration$constant()) === 0)) {
        result = goSliceAppendSlice<gostring>(result, $state__tspath.SupportedDeclarationExtensions, "");
    }
    if (!((e & extensionsJson$constant()) === 0)) {
        result = result.append("", [ExtensionJson$string__from_tspath]);
    }
    return result;
}
