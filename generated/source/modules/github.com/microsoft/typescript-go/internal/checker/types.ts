import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ConditionalTypeNode as ConditionalTypeNode__from_ast, MappedTypeNode as MappedTypeNode__from_ast, NodeId as NodeId__from_ast, Node as Node__from_ast, SymbolFlags as SymbolFlags__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedSet$Storage as OrderedSet__from_collections$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ScriptTarget as ScriptTarget__from_core, Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Result$Storage as Result__from_evaluator$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import type { $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage } from "../../../../../../support/anonymous-structs.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CacheHashKey, Checker } from "./checker.js";
import type { TypeMapper } from "./mapper.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, int8, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { NodeFactory as NodeFactory__from_ast, SymbolTable as SymbolTable__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/state.js";
import { OrderedSet as OrderedSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Result as Result__from_evaluator } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import { $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import { Clip$SliceOf_PointerTo_Named_checker$Signature$PointerTo_Named_checker$Signature, Clip$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/Clip.js";
import { $goInterfaceAdapter$PointerTo_Named_checker$ConditionalType, $goInterfaceAdapter$PointerTo_Named_checker$EvolvingArrayType, $goInterfaceAdapter$PointerTo_Named_checker$IndexType, $goInterfaceAdapter$PointerTo_Named_checker$IndexedAccessType, $goInterfaceAdapter$PointerTo_Named_checker$InstantiationExpressionType, $goInterfaceAdapter$PointerTo_Named_checker$IntersectionType, $goInterfaceAdapter$PointerTo_Named_checker$IntrinsicType, $goInterfaceAdapter$PointerTo_Named_checker$MappedType, $goInterfaceAdapter$PointerTo_Named_checker$ReverseMappedType, $goInterfaceAdapter$PointerTo_Named_checker$StringMappingType, $goInterfaceAdapter$PointerTo_Named_checker$SubstitutionType, $goInterfaceAdapter$PointerTo_Named_checker$TemplateLiteralType, $goInterfaceAdapter$PointerTo_Named_checker$TupleType, $goInterfaceAdapter$PointerTo_Named_checker$TypeParameter, $goInterfaceAdapter$PointerTo_Named_checker$UnionType, $goInterfaceAdapter$PointerTo_Named_checker$UniqueESSymbolType, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_checker$LiteralType as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$AsConstrainedType$void_to_PointerTo_Named_checker$ConstrainedType, $goInterfaceMethod$AsInterfaceType$void_to_PointerTo_Named_checker$InterfaceType, $goInterfaceMethod$AsObjectType$void_to_PointerTo_Named_checker$ObjectType, $goInterfaceMethod$AsStructuredType$void_to_PointerTo_Named_checker$StructuredType, $goInterfaceMethod$AsType$void_to_PointerTo_Named_checker$Type, $goInterfaceMethod$AsTypeReference$void_to_PointerTo_Named_checker$TypeReference, $goInterfaceMethod$AsUnionOrIntersectionType$void_to_PointerTo_Named_checker$UnionOrIntersectionType } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_ast$NodeId_To_SliceOf_PointerTo_Named_ast$Symbol, $goMap$MapOf_Named_checker$CacheHashKey_To_PointerTo_Named_checker$Type, $goMap$MapOf_Named_checker$accessibleChainCacheKey_To_SliceOf_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_string_To_PointerTo_Named_ast$Node, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { isTupleType } from "./checker.js";
import { NodeBuilderImpl } from "./nodebuilderimpl.js";
import { ValueToString } from "./utilities.js";
import * as bits__from_gostdlib from "@gotots/gostdlib/math/bits.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goArrayAllocate } from "@gotots/runtime/array.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type SignatureKind = int32;
export function SignatureKindCall$constant(): SignatureKind {
    return 0;
}
export function SignatureKindConstruct$constant(): SignatureKind {
    return 1;
}
export type ContextFlags = uint32;
export function ContextFlagsNone$constant(): ContextFlags {
    return 0;
}
export function ContextFlagsSignature$constant(): ContextFlags {
    return 1;
}
export function ContextFlagsNoConstraints$constant(): ContextFlags {
    return 2;
}
export function ContextFlagsIgnoreNodeInferences$constant(): ContextFlags {
    return 4;
}
export function ContextFlagsSkipBindingPatterns$constant(): ContextFlags {
    return 8;
}
export type TypeFormatFlags = uint32;
export function TypeFormatFlagsNone$constant(): TypeFormatFlags {
    return 0;
}
export function TypeFormatFlagsNoTruncation$constant(): TypeFormatFlags {
    return 1;
}
export function TypeFormatFlagsWriteArrayAsGenericType$constant(): TypeFormatFlags {
    return 2;
}
export function TypeFormatFlagsUseFullyQualifiedType$constant(): TypeFormatFlags {
    return 64;
}
export function TypeFormatFlagsMultilineObjectLiterals$constant(): TypeFormatFlags {
    return 1024;
}
export function TypeFormatFlagsUseAliasDefinedOutsideCurrentScope$constant(): TypeFormatFlags {
    return 16384;
}
export function TypeFormatFlagsNoTypeReduction$constant(): TypeFormatFlags {
    return 536870912;
}
export function TypeFormatFlagsWriteCallStyleSignature$constant(): TypeFormatFlags {
    return 134217728;
}
export function TypeFormatFlagsWriteArrowStyleSignature$constant(): TypeFormatFlags {
    return 262144;
}
export function TypeFormatFlagsNodeBuilderFlagsMask$constant(): TypeFormatFlags {
    return 1922071919;
}
export type SymbolFormatFlags = uint32;
export function SymbolFormatFlagsWriteTypeParametersOrArguments$constant(): SymbolFormatFlags {
    return 1;
}
export function SymbolFormatFlagsUseOnlyExternalAliasing$constant(): SymbolFormatFlags {
    return 2;
}
export function SymbolFormatFlagsAllowAnyNodeKind$constant(): SymbolFormatFlags {
    return 4;
}
export function SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope$constant(): SymbolFormatFlags {
    return 8;
}
export function SymbolFormatFlagsWriteComputedProps$constant(): SymbolFormatFlags {
    return 16;
}
export function SymbolFormatFlagsDoNotIncludeSymbolChain$constant(): SymbolFormatFlags {
    return 32;
}
export type ExternalEmitHelpers = uint32;
export function ExternalEmitHelpersRest$constant(): ExternalEmitHelpers {
    return 1;
}
export function ExternalEmitHelpersDecorate$constant(): ExternalEmitHelpers {
    return 2;
}
export function ExternalEmitHelpersMetadata$constant(): ExternalEmitHelpers {
    return 4;
}
export function ExternalEmitHelpersParam$constant(): ExternalEmitHelpers {
    return 8;
}
export function ExternalEmitHelpersAwaiter$constant(): ExternalEmitHelpers {
    return 16;
}
export function ExternalEmitHelpersAwait$constant(): ExternalEmitHelpers {
    return 32;
}
export function ExternalEmitHelpersAsyncGenerator$constant(): ExternalEmitHelpers {
    return 64;
}
export function ExternalEmitHelpersAsyncDelegator$constant(): ExternalEmitHelpers {
    return 128;
}
export function ExternalEmitHelpersAsyncValues$constant(): ExternalEmitHelpers {
    return 256;
}
export function ExternalEmitHelpersExportStar$constant(): ExternalEmitHelpers {
    return 512;
}
export function ExternalEmitHelpersImportStar$constant(): ExternalEmitHelpers {
    return 1024;
}
export function ExternalEmitHelpersImportDefault$constant(): ExternalEmitHelpers {
    return 2048;
}
export function ExternalEmitHelpersMakeTemplateObject$constant(): ExternalEmitHelpers {
    return 4096;
}
export function ExternalEmitHelpersClassPrivateFieldGet$constant(): ExternalEmitHelpers {
    return 8192;
}
export function ExternalEmitHelpersClassPrivateFieldSet$constant(): ExternalEmitHelpers {
    return 16384;
}
export function ExternalEmitHelpersClassPrivateFieldIn$constant(): ExternalEmitHelpers {
    return 32768;
}
export function ExternalEmitHelpersSetFunctionName$constant(): ExternalEmitHelpers {
    return 65536;
}
export function ExternalEmitHelpersPropKey$constant(): ExternalEmitHelpers {
    return 131072;
}
export function ExternalEmitHelpersAddDisposableResourceAndDisposeResources$constant(): ExternalEmitHelpers {
    return 262144;
}
export function ExternalEmitHelpersRewriteRelativeImportExtension$constant(): ExternalEmitHelpers {
    return 524288;
}
export function ExternalEmitHelpersESDecorateAndRunInitializers$constant(): ExternalEmitHelpers {
    return 2;
}
export function ExternalEmitHelpersFirstEmitHelper$constant(): ExternalEmitHelpers {
    return 1;
}
export function ExternalEmitHelpersLastEmitHelper$constant(): ExternalEmitHelpers {
    return 524288;
}
export function ExternalEmitHelpersForAwaitOfIncludes$constant(): ExternalEmitHelpers {
    return 256;
}
export function ExternalEmitHelpersAsyncGeneratorIncludes$constant(): ExternalEmitHelpers {
    return 96;
}
export function ExternalEmitHelpersAsyncDelegatorIncludes$constant(): ExternalEmitHelpers {
    return 416;
}
export const externalHelpersModuleNameText$string: gostring = "tslib";
export type TypeId = uint32;
export type SymbolReferenceLinks$Storage = {
    referenceKinds: uint32;
};
export class SymbolReferenceLinks implements GoContainerStoredValue<SymbolReferenceLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SymbolReferenceLinks$Storage) {
    }
    public static $storageOf($source: SymbolReferenceLinks): SymbolReferenceLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SymbolReferenceLinks$Storage): SymbolReferenceLinks {
        return new SymbolReferenceLinks($source);
    }
    public get referenceKinds(): SymbolFlags__from_ast {
        return this.$storage.referenceKinds;
    }
    public set referenceKinds($value: SymbolFlags__from_ast) {
        this.$storage.referenceKinds = $value;
    }
    declare readonly [$goContainerStorageType]: SymbolReferenceLinks$Storage;
    static $zero(): SymbolReferenceLinks {
        return new SymbolReferenceLinks({
            referenceKinds: 0
        });
    }
    static $copy($source: SymbolReferenceLinks): SymbolReferenceLinks {
        return new SymbolReferenceLinks({
            referenceKinds: $source.$storage.referenceKinds
        });
    }
    static $equal($left: SymbolReferenceLinks, $right: SymbolReferenceLinks): bool {
        return $left.$storage.referenceKinds === $right.$storage.referenceKinds;
    }
    static $hash($source: SymbolReferenceLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.referenceKinds));
        return $hash;
    }
    declare private readonly then?: never;
}
export type ValueSymbolLinks$Storage = {
    resolvedType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    writeType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined;
    nameType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    containingType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    functionOrConstructorChecked: bool;
};
export class ValueSymbolLinks implements GoContainerStoredValue<ValueSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ValueSymbolLinks$Storage) {
    }
    public static $storageOf($source: ValueSymbolLinks): ValueSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ValueSymbolLinks$Storage): ValueSymbolLinks {
        return new ValueSymbolLinks($source);
    }
    public get resolvedType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.resolvedType;
    }
    public set resolvedType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.resolvedType = $value;
    }
    public get writeType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.writeType;
    }
    public set writeType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.writeType = $value;
    }
    public get target(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.target;
    }
    public set target($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.target = $value;
    }
    public get mapper(): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
        return this.$storage.mapper;
    }
    public set mapper($value: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined) {
        this.$storage.mapper = $value;
    }
    public get nameType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.nameType;
    }
    public set nameType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.nameType = $value;
    }
    public get containingType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.containingType;
    }
    public set containingType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.containingType = $value;
    }
    public get functionOrConstructorChecked(): bool {
        return this.$storage.functionOrConstructorChecked;
    }
    public set functionOrConstructorChecked($value: bool) {
        this.$storage.functionOrConstructorChecked = $value;
    }
    declare readonly [$goContainerStorageType]: ValueSymbolLinks$Storage;
    static $zero(): ValueSymbolLinks {
        return new ValueSymbolLinks({
            resolvedType: void 0,
            writeType: void 0,
            target: void 0,
            mapper: void 0,
            nameType: void 0,
            containingType: void 0,
            functionOrConstructorChecked: false
        });
    }
    static $copy($source: ValueSymbolLinks): ValueSymbolLinks {
        return new ValueSymbolLinks({
            resolvedType: $source.$storage.resolvedType,
            writeType: $source.$storage.writeType,
            target: $source.$storage.target,
            mapper: $source.$storage.mapper,
            nameType: $source.$storage.nameType,
            containingType: $source.$storage.containingType,
            functionOrConstructorChecked: $source.$storage.functionOrConstructorChecked
        });
    }
    static $equal($left: ValueSymbolLinks, $right: ValueSymbolLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.resolvedType, $right.$storage.resolvedType)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.writeType, $right.$storage.writeType) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.target, $right.$storage.target) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.mapper, $right.$storage.mapper) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.nameType, $right.$storage.nameType) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.containingType, $right.$storage.containingType) && $left.$storage.functionOrConstructorChecked === $right.$storage.functionOrConstructorChecked;
    }
    static $hash($source: ValueSymbolLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.resolvedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.writeType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.target));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.mapper));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.nameType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.containingType));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.functionOrConstructorChecked));
        return $hash;
    }
    declare private readonly then?: never;
}
export type MappedSymbolLinks$Storage = {
    keyType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    syntheticOrigin: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class MappedSymbolLinks implements GoContainerStoredValue<MappedSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: MappedSymbolLinks$Storage) {
    }
    public static $storageOf($source: MappedSymbolLinks): MappedSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: MappedSymbolLinks$Storage): MappedSymbolLinks {
        return new MappedSymbolLinks($source);
    }
    public get keyType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.keyType;
    }
    public set keyType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.keyType = $value;
    }
    public get syntheticOrigin(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.syntheticOrigin;
    }
    public set syntheticOrigin($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.syntheticOrigin = $value;
    }
    declare readonly [$goContainerStorageType]: MappedSymbolLinks$Storage;
    static $zero(): MappedSymbolLinks {
        return new MappedSymbolLinks({
            keyType: void 0,
            syntheticOrigin: void 0
        });
    }
    static $copy($source: MappedSymbolLinks): MappedSymbolLinks {
        return new MappedSymbolLinks({
            keyType: $source.$storage.keyType,
            syntheticOrigin: $source.$storage.syntheticOrigin
        });
    }
    static $equal($left: MappedSymbolLinks, $right: MappedSymbolLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.keyType, $right.$storage.keyType)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.syntheticOrigin, $right.$storage.syntheticOrigin);
    }
    static $hash($source: MappedSymbolLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.keyType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.syntheticOrigin));
        return $hash;
    }
    declare private readonly then?: never;
}
export type DeferredSymbolLinks$Storage = {
    parent: tsonicTypeScriptRuntime.Location<Type> | undefined;
    constituents: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>;
    writeConstituents: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>;
};
export class DeferredSymbolLinks implements GoContainerStoredValue<DeferredSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DeferredSymbolLinks$Storage) {
    }
    public static $storageOf($source: DeferredSymbolLinks): DeferredSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DeferredSymbolLinks$Storage): DeferredSymbolLinks {
        return new DeferredSymbolLinks($source);
    }
    public get parent(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.parent;
    }
    public set parent($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.parent = $value;
    }
    public get constituents(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.constituents;
    }
    public set constituents($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.constituents = $value;
    }
    public get writeConstituents(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.writeConstituents;
    }
    public set writeConstituents($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.writeConstituents = $value;
    }
    declare readonly [$goContainerStorageType]: DeferredSymbolLinks$Storage;
    static $zero(): DeferredSymbolLinks {
        return new DeferredSymbolLinks({
            parent: void 0,
            constituents: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(),
            writeConstituents: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>()
        });
    }
    static $copy($source: DeferredSymbolLinks): DeferredSymbolLinks {
        return new DeferredSymbolLinks({
            parent: $source.$storage.parent,
            constituents: $source.$storage.constituents,
            writeConstituents: $source.$storage.writeConstituents
        });
    }
    declare private readonly then?: never;
}
export type AliasSymbolLinks$Storage = {
    immediateTarget: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    aliasTarget: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    referenced: bool;
    typeOnlyDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class AliasSymbolLinks implements GoContainerStoredValue<AliasSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: AliasSymbolLinks$Storage) {
    }
    public static $storageOf($source: AliasSymbolLinks): AliasSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: AliasSymbolLinks$Storage): AliasSymbolLinks {
        return new AliasSymbolLinks($source);
    }
    public get immediateTarget(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.immediateTarget;
    }
    public set immediateTarget($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.immediateTarget = $value;
    }
    public get aliasTarget(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.aliasTarget;
    }
    public set aliasTarget($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.aliasTarget = $value;
    }
    public get referenced(): bool {
        return this.$storage.referenced;
    }
    public set referenced($value: bool) {
        this.$storage.referenced = $value;
    }
    public get typeOnlyDeclaration(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.typeOnlyDeclaration;
    }
    public set typeOnlyDeclaration($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.typeOnlyDeclaration = $value;
    }
    declare readonly [$goContainerStorageType]: AliasSymbolLinks$Storage;
    static $zero(): AliasSymbolLinks {
        return new AliasSymbolLinks({
            immediateTarget: void 0,
            aliasTarget: void 0,
            referenced: false,
            typeOnlyDeclaration: void 0
        });
    }
    static $copy($source: AliasSymbolLinks): AliasSymbolLinks {
        return new AliasSymbolLinks({
            immediateTarget: $source.$storage.immediateTarget,
            aliasTarget: $source.$storage.aliasTarget,
            referenced: $source.$storage.referenced,
            typeOnlyDeclaration: $source.$storage.typeOnlyDeclaration
        });
    }
    static $equal($left: AliasSymbolLinks, $right: AliasSymbolLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.immediateTarget, $right.$storage.immediateTarget)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.aliasTarget, $right.$storage.aliasTarget) && $left.$storage.referenced === $right.$storage.referenced &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.typeOnlyDeclaration, $right.$storage.typeOnlyDeclaration);
    }
    static $hash($source: AliasSymbolLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.immediateTarget));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.aliasTarget));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.referenced));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.typeOnlyDeclaration));
        return $hash;
    }
    declare private readonly then?: never;
}
export type ModuleSymbolLinks$Storage = {
    resolvedExports: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>;
    typeOnlyExportStarMap: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    exportsChecked: bool;
};
export class ModuleSymbolLinks implements GoContainerStoredValue<ModuleSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ModuleSymbolLinks$Storage) {
    }
    public static $storageOf($source: ModuleSymbolLinks): ModuleSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ModuleSymbolLinks$Storage): ModuleSymbolLinks {
        return new ModuleSymbolLinks($source);
    }
    public get resolvedExports(): SymbolTable__from_ast {
        return new SymbolTable__from_ast(this.$storage.resolvedExports);
    }
    public set resolvedExports($value: SymbolTable__from_ast) {
        this.$storage.resolvedExports = $value.$value;
    }
    public get typeOnlyExportStarMap(): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.typeOnlyExportStarMap;
    }
    public set typeOnlyExportStarMap($value: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.typeOnlyExportStarMap = $value;
    }
    public get exportsChecked(): bool {
        return this.$storage.exportsChecked;
    }
    public set exportsChecked($value: bool) {
        this.$storage.exportsChecked = $value;
    }
    declare readonly [$goContainerStorageType]: ModuleSymbolLinks$Storage;
    static $zero(): ModuleSymbolLinks {
        return new ModuleSymbolLinks({
            resolvedExports: new SymbolTable__from_ast(GoMap.nil()).$value,
            typeOnlyExportStarMap: $goMap$MapOf_string_To_PointerTo_Named_ast$Node.nil(),
            exportsChecked: false
        });
    }
    static $copy($source: ModuleSymbolLinks): ModuleSymbolLinks {
        return new ModuleSymbolLinks({
            resolvedExports: new SymbolTable__from_ast($source.$storage.resolvedExports).$value,
            typeOnlyExportStarMap: $source.$storage.typeOnlyExportStarMap,
            exportsChecked: $source.$storage.exportsChecked
        });
    }
    declare private readonly then?: never;
}
export type ReverseMappedSymbolLinks$Storage = {
    propertyType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    mappedType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    constraintType: tsonicTypeScriptRuntime.Location<Type> | undefined;
};
export class ReverseMappedSymbolLinks implements GoContainerStoredValue<ReverseMappedSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ReverseMappedSymbolLinks$Storage) {
    }
    public static $storageOf($source: ReverseMappedSymbolLinks): ReverseMappedSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ReverseMappedSymbolLinks$Storage): ReverseMappedSymbolLinks {
        return new ReverseMappedSymbolLinks($source);
    }
    public get propertyType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.propertyType;
    }
    public set propertyType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.propertyType = $value;
    }
    public get mappedType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.mappedType;
    }
    public set mappedType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.mappedType = $value;
    }
    public get constraintType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.constraintType;
    }
    public set constraintType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.constraintType = $value;
    }
    declare readonly [$goContainerStorageType]: ReverseMappedSymbolLinks$Storage;
    static $zero(): ReverseMappedSymbolLinks {
        return new ReverseMappedSymbolLinks({
            propertyType: void 0,
            mappedType: void 0,
            constraintType: void 0
        });
    }
    static $copy($source: ReverseMappedSymbolLinks): ReverseMappedSymbolLinks {
        return new ReverseMappedSymbolLinks({
            propertyType: $source.$storage.propertyType,
            mappedType: $source.$storage.mappedType,
            constraintType: $source.$storage.constraintType
        });
    }
    static $equal($left: ReverseMappedSymbolLinks, $right: ReverseMappedSymbolLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.propertyType, $right.$storage.propertyType)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.mappedType, $right.$storage.mappedType) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.constraintType, $right.$storage.constraintType);
    }
    static $hash($source: ReverseMappedSymbolLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.propertyType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.mappedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.constraintType));
        return $hash;
    }
    declare private readonly then?: never;
}
export type LateBoundLinks$Storage = {
    lateSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class LateBoundLinks implements GoContainerStoredValue<LateBoundLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: LateBoundLinks$Storage) {
    }
    public static $storageOf($source: LateBoundLinks): LateBoundLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: LateBoundLinks$Storage): LateBoundLinks {
        return new LateBoundLinks($source);
    }
    public get lateSymbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.lateSymbol;
    }
    public set lateSymbol($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.lateSymbol = $value;
    }
    declare readonly [$goContainerStorageType]: LateBoundLinks$Storage;
    static $zero(): LateBoundLinks {
        return new LateBoundLinks({
            lateSymbol: void 0
        });
    }
    static $copy($source: LateBoundLinks): LateBoundLinks {
        return new LateBoundLinks({
            lateSymbol: $source.$storage.lateSymbol
        });
    }
    static $equal($left: LateBoundLinks, $right: LateBoundLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.lateSymbol, $right.$storage.lateSymbol);
    }
    static $hash($source: LateBoundLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.lateSymbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export type ExportTypeLinks$Storage = {
    target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    originatingImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class ExportTypeLinks implements GoContainerStoredValue<ExportTypeLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ExportTypeLinks$Storage) {
    }
    public static $storageOf($source: ExportTypeLinks): ExportTypeLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ExportTypeLinks$Storage): ExportTypeLinks {
        return new ExportTypeLinks($source);
    }
    public get target(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.target;
    }
    public set target($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.target = $value;
    }
    public get originatingImport(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.originatingImport;
    }
    public set originatingImport($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.originatingImport = $value;
    }
    declare readonly [$goContainerStorageType]: ExportTypeLinks$Storage;
    static $zero(): ExportTypeLinks {
        return new ExportTypeLinks({
            target: void 0,
            originatingImport: void 0
        });
    }
    static $copy($source: ExportTypeLinks): ExportTypeLinks {
        return new ExportTypeLinks({
            target: $source.$storage.target,
            originatingImport: $source.$storage.originatingImport
        });
    }
    static $equal($left: ExportTypeLinks, $right: ExportTypeLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.target, $right.$storage.target)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.originatingImport, $right.$storage.originatingImport);
    }
    static $hash($source: ExportTypeLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.target));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.originatingImport));
        return $hash;
    }
    declare private readonly then?: never;
}
export type TypeAliasLinks$Storage = {
    declaredType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    typeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>;
    instantiations: GoMapValue<CacheHashKey, tsonicTypeScriptRuntime.Location<Type> | undefined>;
    isConstructorDeclaredProperty: bool;
};
export class TypeAliasLinks implements GoContainerStoredValue<TypeAliasLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TypeAliasLinks$Storage) {
    }
    public static $storageOf($source: TypeAliasLinks): TypeAliasLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TypeAliasLinks$Storage): TypeAliasLinks {
        return new TypeAliasLinks($source);
    }
    public get declaredType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.declaredType;
    }
    public set declaredType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.declaredType = $value;
    }
    public get typeParameters(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.typeParameters;
    }
    public set typeParameters($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.typeParameters = $value;
    }
    public get instantiations(): GoMapValue<CacheHashKey, tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.instantiations;
    }
    public set instantiations($value: GoMapValue<CacheHashKey, tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.instantiations = $value;
    }
    public get isConstructorDeclaredProperty(): bool {
        return this.$storage.isConstructorDeclaredProperty;
    }
    public set isConstructorDeclaredProperty($value: bool) {
        this.$storage.isConstructorDeclaredProperty = $value;
    }
    declare readonly [$goContainerStorageType]: TypeAliasLinks$Storage;
    static $zero(): TypeAliasLinks {
        return new TypeAliasLinks({
            declaredType: void 0,
            typeParameters: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(),
            instantiations: $goMap$MapOf_Named_checker$CacheHashKey_To_PointerTo_Named_checker$Type.nil(),
            isConstructorDeclaredProperty: false
        });
    }
    static $copy($source: TypeAliasLinks): TypeAliasLinks {
        return new TypeAliasLinks({
            declaredType: $source.$storage.declaredType,
            typeParameters: $source.$storage.typeParameters,
            instantiations: $source.$storage.instantiations,
            isConstructorDeclaredProperty: $source.$storage.isConstructorDeclaredProperty
        });
    }
    declare private readonly then?: never;
}
export type DeclaredTypeLinks$Storage = {
    declaredType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    interfaceChecked: bool;
    indexSignaturesChecked: bool;
    typeParametersChecked: bool;
    enumChecked: bool;
};
export class DeclaredTypeLinks implements GoContainerStoredValue<DeclaredTypeLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DeclaredTypeLinks$Storage) {
    }
    public static $storageOf($source: DeclaredTypeLinks): DeclaredTypeLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DeclaredTypeLinks$Storage): DeclaredTypeLinks {
        return new DeclaredTypeLinks($source);
    }
    public get declaredType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.declaredType;
    }
    public set declaredType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.declaredType = $value;
    }
    public get interfaceChecked(): bool {
        return this.$storage.interfaceChecked;
    }
    public set interfaceChecked($value: bool) {
        this.$storage.interfaceChecked = $value;
    }
    public get indexSignaturesChecked(): bool {
        return this.$storage.indexSignaturesChecked;
    }
    public set indexSignaturesChecked($value: bool) {
        this.$storage.indexSignaturesChecked = $value;
    }
    public get typeParametersChecked(): bool {
        return this.$storage.typeParametersChecked;
    }
    public set typeParametersChecked($value: bool) {
        this.$storage.typeParametersChecked = $value;
    }
    public get enumChecked(): bool {
        return this.$storage.enumChecked;
    }
    public set enumChecked($value: bool) {
        this.$storage.enumChecked = $value;
    }
    declare readonly [$goContainerStorageType]: DeclaredTypeLinks$Storage;
    static $zero(): DeclaredTypeLinks {
        return new DeclaredTypeLinks({
            declaredType: void 0,
            interfaceChecked: false,
            indexSignaturesChecked: false,
            typeParametersChecked: false,
            enumChecked: false
        });
    }
    static $copy($source: DeclaredTypeLinks): DeclaredTypeLinks {
        return new DeclaredTypeLinks({
            declaredType: $source.$storage.declaredType,
            interfaceChecked: $source.$storage.interfaceChecked,
            indexSignaturesChecked: $source.$storage.indexSignaturesChecked,
            typeParametersChecked: $source.$storage.typeParametersChecked,
            enumChecked: $source.$storage.enumChecked
        });
    }
    static $equal($left: DeclaredTypeLinks, $right: DeclaredTypeLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.declaredType, $right.$storage.declaredType)
            && $left.$storage.interfaceChecked === $right.$storage.interfaceChecked && $left.$storage.indexSignaturesChecked === $right.$storage.indexSignaturesChecked && $left.$storage.typeParametersChecked === $right.$storage.typeParametersChecked && $left.$storage.enumChecked === $right.$storage.enumChecked;
    }
    static $hash($source: DeclaredTypeLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.declaredType));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.interfaceChecked));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.indexSignaturesChecked));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.typeParametersChecked));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.enumChecked));
        return $hash;
    }
    declare private readonly then?: never;
}
export type ExhaustiveState = uint8;
export function ExhaustiveStateUnknown$constant(): ExhaustiveState {
    return 0;
}
export function ExhaustiveStateComputing$constant(): ExhaustiveState {
    return 1;
}
export function ExhaustiveStateFalse$constant(): ExhaustiveState {
    return 2;
}
export function ExhaustiveStateTrue$constant(): ExhaustiveState {
    return 3;
}
export type SwitchStatementLinks$Storage = {
    exhaustiveState: uint8;
    switchTypesComputed: bool;
    witnessesComputed: bool;
    switchTypes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>;
    witnesses: RuntimeSlice<gostring>;
};
export class SwitchStatementLinks implements GoContainerStoredValue<SwitchStatementLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SwitchStatementLinks$Storage) {
    }
    public static $storageOf($source: SwitchStatementLinks): SwitchStatementLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SwitchStatementLinks$Storage): SwitchStatementLinks {
        return new SwitchStatementLinks($source);
    }
    public get exhaustiveState(): ExhaustiveState {
        return this.$storage.exhaustiveState;
    }
    public set exhaustiveState($value: ExhaustiveState) {
        this.$storage.exhaustiveState = $value;
    }
    public get switchTypesComputed(): bool {
        return this.$storage.switchTypesComputed;
    }
    public set switchTypesComputed($value: bool) {
        this.$storage.switchTypesComputed = $value;
    }
    public get witnessesComputed(): bool {
        return this.$storage.witnessesComputed;
    }
    public set witnessesComputed($value: bool) {
        this.$storage.witnessesComputed = $value;
    }
    public get switchTypes(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.switchTypes;
    }
    public set switchTypes($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.switchTypes = $value;
    }
    public get witnesses(): RuntimeSlice<gostring> {
        return this.$storage.witnesses;
    }
    public set witnesses($value: RuntimeSlice<gostring>) {
        this.$storage.witnesses = $value;
    }
    declare readonly [$goContainerStorageType]: SwitchStatementLinks$Storage;
    static $zero(): SwitchStatementLinks {
        return new SwitchStatementLinks({
            exhaustiveState: 0,
            switchTypesComputed: false,
            witnessesComputed: false,
            switchTypes: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(),
            witnesses: RuntimeSlice.nil<gostring>()
        });
    }
    static $copy($source: SwitchStatementLinks): SwitchStatementLinks {
        return new SwitchStatementLinks({
            exhaustiveState: $source.$storage.exhaustiveState,
            switchTypesComputed: $source.$storage.switchTypesComputed,
            witnessesComputed: $source.$storage.witnessesComputed,
            switchTypes: $source.$storage.switchTypes,
            witnesses: $source.$storage.witnesses
        });
    }
    declare private readonly then?: never;
}
export type ArrayLiteralLinks$Storage = {
    indicesComputed: bool;
    firstSpreadIndex: int;
    lastSpreadIndex: int;
};
export class ArrayLiteralLinks implements GoContainerStoredValue<ArrayLiteralLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ArrayLiteralLinks$Storage) {
    }
    public static $storageOf($source: ArrayLiteralLinks): ArrayLiteralLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ArrayLiteralLinks$Storage): ArrayLiteralLinks {
        return new ArrayLiteralLinks($source);
    }
    public get indicesComputed(): bool {
        return this.$storage.indicesComputed;
    }
    public set indicesComputed($value: bool) {
        this.$storage.indicesComputed = $value;
    }
    public get firstSpreadIndex(): int {
        return this.$storage.firstSpreadIndex;
    }
    public set firstSpreadIndex($value: int) {
        this.$storage.firstSpreadIndex = $value;
    }
    public get lastSpreadIndex(): int {
        return this.$storage.lastSpreadIndex;
    }
    public set lastSpreadIndex($value: int) {
        this.$storage.lastSpreadIndex = $value;
    }
    declare readonly [$goContainerStorageType]: ArrayLiteralLinks$Storage;
    static $zero(): ArrayLiteralLinks {
        return new ArrayLiteralLinks({
            indicesComputed: false,
            firstSpreadIndex: 0,
            lastSpreadIndex: 0
        });
    }
    static $copy($source: ArrayLiteralLinks): ArrayLiteralLinks {
        return new ArrayLiteralLinks({
            indicesComputed: $source.$storage.indicesComputed,
            firstSpreadIndex: $source.$storage.firstSpreadIndex,
            lastSpreadIndex: $source.$storage.lastSpreadIndex
        });
    }
    static $equal($left: ArrayLiteralLinks, $right: ArrayLiteralLinks): bool {
        return $left.$storage.indicesComputed === $right.$storage.indicesComputed && $left.$storage.firstSpreadIndex === $right.$storage.firstSpreadIndex && $left.$storage.lastSpreadIndex === $right.$storage.lastSpreadIndex;
    }
    static $hash($source: ArrayLiteralLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.indicesComputed));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.firstSpreadIndex));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.lastSpreadIndex));
        return $hash;
    }
    declare private readonly then?: never;
}
export class MembersOrExportsResolutionKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function MembersOrExportsResolutionKindResolvedExports$constant(): MembersOrExportsResolutionKind {
    return new MembersOrExportsResolutionKind(0);
}
export function MembersOrExportsResolutionKindResolvedMembers$constant(): MembersOrExportsResolutionKind {
    return new MembersOrExportsResolutionKind(1);
}
export class MembersAndExportsLinks implements GoContainerStoredValue<GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>> {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>) {
    }
    declare readonly [$goContainerStorageType]: GoArray<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, 2>;
    declare private readonly then?: never;
}
export type SpreadLinks$Storage = {
    leftSpread: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    rightSpread: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class SpreadLinks implements GoContainerStoredValue<SpreadLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SpreadLinks$Storage) {
    }
    public static $storageOf($source: SpreadLinks): SpreadLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SpreadLinks$Storage): SpreadLinks {
        return new SpreadLinks($source);
    }
    public get leftSpread(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.leftSpread;
    }
    public set leftSpread($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.leftSpread = $value;
    }
    public get rightSpread(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.rightSpread;
    }
    public set rightSpread($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.rightSpread = $value;
    }
    declare readonly [$goContainerStorageType]: SpreadLinks$Storage;
    static $zero(): SpreadLinks {
        return new SpreadLinks({
            leftSpread: void 0,
            rightSpread: void 0
        });
    }
    static $copy($source: SpreadLinks): SpreadLinks {
        return new SpreadLinks({
            leftSpread: $source.$storage.leftSpread,
            rightSpread: $source.$storage.rightSpread
        });
    }
    static $equal($left: SpreadLinks, $right: SpreadLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.leftSpread, $right.$storage.leftSpread)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.rightSpread, $right.$storage.rightSpread);
    }
    static $hash($source: SpreadLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.leftSpread));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.rightSpread));
        return $hash;
    }
    declare private readonly then?: never;
}
export type VarianceLinks$Storage = {
    variances: RuntimeSlice<VarianceFlags>;
};
export class VarianceLinks implements GoContainerStoredValue<VarianceLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: VarianceLinks$Storage) {
    }
    public static $storageOf($source: VarianceLinks): VarianceLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: VarianceLinks$Storage): VarianceLinks {
        return new VarianceLinks($source);
    }
    public get variances(): RuntimeSlice<VarianceFlags> {
        return this.$storage.variances;
    }
    public set variances($value: RuntimeSlice<VarianceFlags>) {
        this.$storage.variances = $value;
    }
    declare readonly [$goContainerStorageType]: VarianceLinks$Storage;
    static $zero(): VarianceLinks {
        return new VarianceLinks({
            variances: RuntimeSlice.nil<VarianceFlags>()
        });
    }
    static $copy($source: VarianceLinks): VarianceLinks {
        return new VarianceLinks({
            variances: $source.$storage.variances
        });
    }
    declare private readonly then?: never;
}
export type VarianceFlags = uint32;
export function VarianceFlagsInvariant$constant(): VarianceFlags {
    return 0;
}
export function VarianceFlagsCovariant$constant(): VarianceFlags {
    return 1;
}
export function VarianceFlagsContravariant$constant(): VarianceFlags {
    return 2;
}
export function VarianceFlagsBivariant$constant(): VarianceFlags {
    return 3;
}
export function VarianceFlagsIndependent$constant(): VarianceFlags {
    return 4;
}
export function VarianceFlagsVarianceMask$constant(): VarianceFlags {
    return 7;
}
export function VarianceFlagsUnmeasurable$constant(): VarianceFlags {
    return 8;
}
export function VarianceFlagsUnreliable$constant(): VarianceFlags {
    return 16;
}
export function VarianceFlagsAllowsStructuralFallback$constant(): VarianceFlags {
    return 24;
}
export type MarkedAssignmentSymbolLinks$Storage = {
    lastAssignmentPos: int32;
    hasDefiniteAssignment: bool;
};
export class MarkedAssignmentSymbolLinks implements GoContainerStoredValue<MarkedAssignmentSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: MarkedAssignmentSymbolLinks$Storage) {
    }
    public static $storageOf($source: MarkedAssignmentSymbolLinks): MarkedAssignmentSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: MarkedAssignmentSymbolLinks$Storage): MarkedAssignmentSymbolLinks {
        return new MarkedAssignmentSymbolLinks($source);
    }
    public get lastAssignmentPos(): int32 {
        return this.$storage.lastAssignmentPos;
    }
    public set lastAssignmentPos($value: int32) {
        this.$storage.lastAssignmentPos = $value;
    }
    public get hasDefiniteAssignment(): bool {
        return this.$storage.hasDefiniteAssignment;
    }
    public set hasDefiniteAssignment($value: bool) {
        this.$storage.hasDefiniteAssignment = $value;
    }
    declare readonly [$goContainerStorageType]: MarkedAssignmentSymbolLinks$Storage;
    static $zero(): MarkedAssignmentSymbolLinks {
        return new MarkedAssignmentSymbolLinks({
            lastAssignmentPos: 0,
            hasDefiniteAssignment: false
        });
    }
    static $copy($source: MarkedAssignmentSymbolLinks): MarkedAssignmentSymbolLinks {
        return new MarkedAssignmentSymbolLinks({
            lastAssignmentPos: $source.$storage.lastAssignmentPos,
            hasDefiniteAssignment: $source.$storage.hasDefiniteAssignment
        });
    }
    static $equal($left: MarkedAssignmentSymbolLinks, $right: MarkedAssignmentSymbolLinks): bool {
        return $left.$storage.lastAssignmentPos === $right.$storage.lastAssignmentPos && $left.$storage.hasDefiniteAssignment === $right.$storage.hasDefiniteAssignment;
    }
    static $hash($source: MarkedAssignmentSymbolLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.lastAssignmentPos));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.hasDefiniteAssignment));
        return $hash;
    }
    declare private readonly then?: never;
}
export class accessibleChainCacheKey {
    declare private readonly $goType: void;
    public constructor(public useOnlyExternalAliasing: bool, public location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public meaning: SymbolFlags__from_ast) {
    }
    static $copy($source: accessibleChainCacheKey): accessibleChainCacheKey {
        return new accessibleChainCacheKey($source.useOnlyExternalAliasing, $source.location, $source.meaning);
    }
    static $equal($left: accessibleChainCacheKey, $right: accessibleChainCacheKey): bool {
        return $left.useOnlyExternalAliasing === $right.useOnlyExternalAliasing &&
            tsonicTypeScriptRuntime.sameLocation($left.location, $right.location) && $left.meaning === $right.meaning;
    }
    static $hash($source: accessibleChainCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.useOnlyExternalAliasing));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.location));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.meaning));
        return $hash;
    }
    declare private readonly then?: never;
}
export type ContainingSymbolLinks$Storage = {
    extendedContainersByFile: GoMapValue<NodeId__from_ast, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>;
    extendedContainers: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined;
    accessibleChainCache: GoMapValue<accessibleChainCacheKey, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>;
};
export class ContainingSymbolLinks implements GoContainerStoredValue<ContainingSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ContainingSymbolLinks$Storage) {
    }
    public static $storageOf($source: ContainingSymbolLinks): ContainingSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ContainingSymbolLinks$Storage): ContainingSymbolLinks {
        return new ContainingSymbolLinks($source);
    }
    public get extendedContainersByFile(): GoMapValue<NodeId__from_ast, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> {
        return this.$storage.extendedContainersByFile;
    }
    public set extendedContainersByFile($value: GoMapValue<NodeId__from_ast, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>) {
        this.$storage.extendedContainersByFile = $value;
    }
    public get extendedContainers(): tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined {
        return this.$storage.extendedContainers;
    }
    public set extendedContainers($value: tsonicTypeScriptRuntime.Location<RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined) {
        this.$storage.extendedContainers = $value;
    }
    public get accessibleChainCache(): GoMapValue<accessibleChainCacheKey, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> {
        return this.$storage.accessibleChainCache;
    }
    public set accessibleChainCache($value: GoMapValue<accessibleChainCacheKey, RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>) {
        this.$storage.accessibleChainCache = $value;
    }
    declare readonly [$goContainerStorageType]: ContainingSymbolLinks$Storage;
    static $zero(): ContainingSymbolLinks {
        return new ContainingSymbolLinks({
            extendedContainersByFile: $goMap$MapOf_Named_ast$NodeId_To_SliceOf_PointerTo_Named_ast$Symbol.nil(),
            extendedContainers: void 0,
            accessibleChainCache: $goMap$MapOf_Named_checker$accessibleChainCacheKey_To_SliceOf_PointerTo_Named_ast$Symbol.nil()
        });
    }
    static $copy($source: ContainingSymbolLinks): ContainingSymbolLinks {
        return new ContainingSymbolLinks({
            extendedContainersByFile: $source.$storage.extendedContainersByFile,
            extendedContainers: $source.$storage.extendedContainers,
            accessibleChainCache: $source.$storage.accessibleChainCache
        });
    }
    declare private readonly then?: never;
}
export type AccessFlags = uint32;
export function AccessFlagsNone$constant(): AccessFlags {
    return 0;
}
export function AccessFlagsIncludeUndefined$constant(): AccessFlags {
    return 1;
}
export function AccessFlagsNoIndexSignatures$constant(): AccessFlags {
    return 2;
}
export function AccessFlagsWriting$constant(): AccessFlags {
    return 4;
}
export function AccessFlagsCacheSymbol$constant(): AccessFlags {
    return 8;
}
export function AccessFlagsAllowMissing$constant(): AccessFlags {
    return 16;
}
export function AccessFlagsExpressionPosition$constant(): AccessFlags {
    return 32;
}
export function AccessFlagsReportDeprecated$constant(): AccessFlags {
    return 64;
}
export function AccessFlagsSuppressNoImplicitAnyError$constant(): AccessFlags {
    return 128;
}
export function AccessFlagsContextual$constant(): AccessFlags {
    return 256;
}
export function AccessFlagsPersistent$constant(): AccessFlags {
    return 1;
}
export type NodeCheckFlags = uint32;
export function NodeCheckFlagsTypeChecked$constant(): NodeCheckFlags {
    return 1;
}
export function NodeCheckFlagsContextChecked$constant(): NodeCheckFlags {
    return 64;
}
export function NodeCheckFlagsEnumValuesComputed$constant(): NodeCheckFlags {
    return 1024;
}
export function NodeCheckFlagsAssignmentsMarked$constant(): NodeCheckFlags {
    return 131072;
}
export function NodeCheckFlagsContainsClassWithPrivateIdentifiers$constant(): NodeCheckFlags {
    return 1048576;
}
export function NodeCheckFlagsContainsSuperPropertyInStaticInitializer$constant(): NodeCheckFlags {
    return 2097152;
}
export function NodeCheckFlagsInCheckIdentifier$constant(): NodeCheckFlags {
    return 4194304;
}
export function NodeCheckFlagsInitializerIsUndefined$constant(): NodeCheckFlags {
    return 16777216;
}
export function NodeCheckFlagsInitializerIsUndefinedComputed$constant(): NodeCheckFlags {
    return 33554432;
}
export type NodeLinks$Storage = {
    flags: uint32;
    declarationRequiresScopeChange: uint8;
    hasReportedStatementInAmbientContext: bool;
};
export class NodeLinks implements GoContainerStoredValue<NodeLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NodeLinks$Storage) {
    }
    public static $storageOf($source: NodeLinks): NodeLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NodeLinks$Storage): NodeLinks {
        return new NodeLinks($source);
    }
    public get flags(): NodeCheckFlags {
        return this.$storage.flags;
    }
    public set flags($value: NodeCheckFlags) {
        this.$storage.flags = $value;
    }
    public get declarationRequiresScopeChange(): Tristate__from_core {
        return this.$storage.declarationRequiresScopeChange;
    }
    public set declarationRequiresScopeChange($value: Tristate__from_core) {
        this.$storage.declarationRequiresScopeChange = $value;
    }
    public get hasReportedStatementInAmbientContext(): bool {
        return this.$storage.hasReportedStatementInAmbientContext;
    }
    public set hasReportedStatementInAmbientContext($value: bool) {
        this.$storage.hasReportedStatementInAmbientContext = $value;
    }
    declare readonly [$goContainerStorageType]: NodeLinks$Storage;
    static $zero(): NodeLinks {
        return new NodeLinks({
            flags: 0,
            declarationRequiresScopeChange: 0,
            hasReportedStatementInAmbientContext: false
        });
    }
    static $copy($source: NodeLinks): NodeLinks {
        return new NodeLinks({
            flags: $source.$storage.flags,
            declarationRequiresScopeChange: $source.$storage.declarationRequiresScopeChange,
            hasReportedStatementInAmbientContext: $source.$storage.hasReportedStatementInAmbientContext
        });
    }
    static $equal($left: NodeLinks, $right: NodeLinks): bool {
        return $left.$storage.flags === $right.$storage.flags && $left.$storage.declarationRequiresScopeChange === $right.$storage.declarationRequiresScopeChange && $left.$storage.hasReportedStatementInAmbientContext === $right.$storage.hasReportedStatementInAmbientContext;
    }
    static $hash($source: NodeLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.flags));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.declarationRequiresScopeChange));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.hasReportedStatementInAmbientContext));
        return $hash;
    }
    declare private readonly then?: never;
}
export type SymbolNodeLinks$Storage = {
    resolvedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class SymbolNodeLinks implements GoContainerStoredValue<SymbolNodeLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SymbolNodeLinks$Storage) {
    }
    public static $storageOf($source: SymbolNodeLinks): SymbolNodeLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SymbolNodeLinks$Storage): SymbolNodeLinks {
        return new SymbolNodeLinks($source);
    }
    public get resolvedSymbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.resolvedSymbol;
    }
    public set resolvedSymbol($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.resolvedSymbol = $value;
    }
    declare readonly [$goContainerStorageType]: SymbolNodeLinks$Storage;
    static $zero(): SymbolNodeLinks {
        return new SymbolNodeLinks({
            resolvedSymbol: void 0
        });
    }
    static $copy($source: SymbolNodeLinks): SymbolNodeLinks {
        return new SymbolNodeLinks({
            resolvedSymbol: $source.$storage.resolvedSymbol
        });
    }
    static $equal($left: SymbolNodeLinks, $right: SymbolNodeLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.resolvedSymbol, $right.$storage.resolvedSymbol);
    }
    static $hash($source: SymbolNodeLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.resolvedSymbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export type TypeNodeLinks$Storage = {
    resolvedType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    outerTypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>;
};
export class TypeNodeLinks implements GoContainerStoredValue<TypeNodeLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TypeNodeLinks$Storage) {
    }
    public static $storageOf($source: TypeNodeLinks): TypeNodeLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TypeNodeLinks$Storage): TypeNodeLinks {
        return new TypeNodeLinks($source);
    }
    public get resolvedType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.resolvedType;
    }
    public set resolvedType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.resolvedType = $value;
    }
    public get outerTypeParameters(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.outerTypeParameters;
    }
    public set outerTypeParameters($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.outerTypeParameters = $value;
    }
    declare readonly [$goContainerStorageType]: TypeNodeLinks$Storage;
    static $zero(): TypeNodeLinks {
        return new TypeNodeLinks({
            resolvedType: void 0,
            outerTypeParameters: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>()
        });
    }
    static $copy($source: TypeNodeLinks): TypeNodeLinks {
        return new TypeNodeLinks({
            resolvedType: $source.$storage.resolvedType,
            outerTypeParameters: $source.$storage.outerTypeParameters
        });
    }
    declare private readonly then?: never;
}
export type EnumMemberLinks$Storage = {
    value: Result__from_evaluator$Storage;
};
export class EnumMemberLinks implements GoContainerStoredValue<EnumMemberLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: EnumMemberLinks$Storage) {
    }
    public static $storageOf($source: EnumMemberLinks): EnumMemberLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: EnumMemberLinks$Storage): EnumMemberLinks {
        return new EnumMemberLinks($source);
    }
    public get value(): Result__from_evaluator {
        return Result__from_evaluator.$fromStorage(this.$storage.value);
    }
    public set value($value: Result__from_evaluator) {
        this.$storage.value = Result__from_evaluator.$storageOf($value);
    }
    declare readonly [$goContainerStorageType]: EnumMemberLinks$Storage;
    static $zero(): EnumMemberLinks {
        return new EnumMemberLinks({
            value: Result__from_evaluator.$storageOf(Result__from_evaluator.$zero())
        });
    }
    static $copy($source: EnumMemberLinks): EnumMemberLinks {
        return new EnumMemberLinks({
            value: Result__from_evaluator.$storageOf(Result__from_evaluator.$copy(Result__from_evaluator.$fromStorage($source.$storage.value)))
        });
    }
    static $equal($left: EnumMemberLinks, $right: EnumMemberLinks): bool {
        return Result__from_evaluator.$equal(Result__from_evaluator.$fromStorage($left.$storage.value), Result__from_evaluator.$fromStorage($right.$storage.value));
    }
    static $hash($source: EnumMemberLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Result__from_evaluator.$hash(Result__from_evaluator.$fromStorage($source.$storage.value)));
        return $hash;
    }
    declare private readonly then?: never;
}
export type AssertionLinks$Storage = {
    exprType: tsonicTypeScriptRuntime.Location<Type> | undefined;
};
export class AssertionLinks implements GoContainerStoredValue<AssertionLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: AssertionLinks$Storage) {
    }
    public static $storageOf($source: AssertionLinks): AssertionLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: AssertionLinks$Storage): AssertionLinks {
        return new AssertionLinks($source);
    }
    public get exprType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.exprType;
    }
    public set exprType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.exprType = $value;
    }
    declare readonly [$goContainerStorageType]: AssertionLinks$Storage;
    static $zero(): AssertionLinks {
        return new AssertionLinks({
            exprType: void 0
        });
    }
    static $copy($source: AssertionLinks): AssertionLinks {
        return new AssertionLinks({
            exprType: $source.$storage.exprType
        });
    }
    static $equal($left: AssertionLinks, $right: AssertionLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.exprType, $right.$storage.exprType);
    }
    static $hash($source: AssertionLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.exprType));
        return $hash;
    }
    declare private readonly then?: never;
}
export type SourceFileLinks$Storage = {
    typeChecked: bool;
    unusedChecked: bool;
    externalHelpersModule: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    requestedExternalEmitHelpers: uint32;
    deferredNodes: OrderedSet__from_collections$Storage<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    identifierCheckNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    localJsxNamespace: gostring;
    localJsxFragmentNamespace: gostring;
    localJsxFactory: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    localJsxFragmentFactory: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    jsxFragmentType: tsonicTypeScriptRuntime.Location<Type> | undefined;
};
export class SourceFileLinks implements GoContainerStoredValue<SourceFileLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SourceFileLinks$Storage) {
    }
    public static $storageOf($source: SourceFileLinks): SourceFileLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SourceFileLinks$Storage): SourceFileLinks {
        return new SourceFileLinks($source);
    }
    public get typeChecked(): bool {
        return this.$storage.typeChecked;
    }
    public set typeChecked($value: bool) {
        this.$storage.typeChecked = $value;
    }
    public get unusedChecked(): bool {
        return this.$storage.unusedChecked;
    }
    public set unusedChecked($value: bool) {
        this.$storage.unusedChecked = $value;
    }
    public get externalHelpersModule(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.externalHelpersModule;
    }
    public set externalHelpersModule($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.externalHelpersModule = $value;
    }
    public get requestedExternalEmitHelpers(): ExternalEmitHelpers {
        return this.$storage.requestedExternalEmitHelpers;
    }
    public set requestedExternalEmitHelpers($value: ExternalEmitHelpers) {
        this.$storage.requestedExternalEmitHelpers = $value;
    }
    public get deferredNodes(): OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return OrderedSet__from_collections.$fromStorage<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(this.$storage.deferredNodes);
    }
    public set deferredNodes($value: OrderedSet__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.deferredNodes = OrderedSet__from_collections.$storageOf<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($value);
    }
    public get identifierCheckNodes(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.identifierCheckNodes;
    }
    public set identifierCheckNodes($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.identifierCheckNodes = $value;
    }
    public get localJsxNamespace(): gostring {
        return this.$storage.localJsxNamespace;
    }
    public set localJsxNamespace($value: gostring) {
        this.$storage.localJsxNamespace = $value;
    }
    public get localJsxFragmentNamespace(): gostring {
        return this.$storage.localJsxFragmentNamespace;
    }
    public set localJsxFragmentNamespace($value: gostring) {
        this.$storage.localJsxFragmentNamespace = $value;
    }
    public get localJsxFactory(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.localJsxFactory;
    }
    public set localJsxFactory($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.localJsxFactory = $value;
    }
    public get localJsxFragmentFactory(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.localJsxFragmentFactory;
    }
    public set localJsxFragmentFactory($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.localJsxFragmentFactory = $value;
    }
    public get jsxFragmentType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.jsxFragmentType;
    }
    public set jsxFragmentType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.jsxFragmentType = $value;
    }
    declare readonly [$goContainerStorageType]: SourceFileLinks$Storage;
    static $zero(): SourceFileLinks {
        return new SourceFileLinks({
            typeChecked: false,
            unusedChecked: false,
            externalHelpersModule: void 0,
            requestedExternalEmitHelpers: 0,
            deferredNodes: OrderedSet__from_collections.$storageOf<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(OrderedSet__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
                return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
            })),
            identifierCheckNodes: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(),
            localJsxNamespace: "",
            localJsxFragmentNamespace: "",
            localJsxFactory: void 0,
            localJsxFragmentFactory: void 0,
            jsxFragmentType: void 0
        });
    }
    static $copy($source: SourceFileLinks): SourceFileLinks {
        return new SourceFileLinks({
            typeChecked: $source.$storage.typeChecked,
            unusedChecked: $source.$storage.unusedChecked,
            externalHelpersModule: $source.$storage.externalHelpersModule,
            requestedExternalEmitHelpers: $source.$storage.requestedExternalEmitHelpers,
            deferredNodes: OrderedSet__from_collections.$storageOf<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(OrderedSet__from_collections.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(OrderedSet__from_collections.$fromStorage<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>($source.$storage.deferredNodes))),
            identifierCheckNodes: $source.$storage.identifierCheckNodes,
            localJsxNamespace: $source.$storage.localJsxNamespace,
            localJsxFragmentNamespace: $source.$storage.localJsxFragmentNamespace,
            localJsxFactory: $source.$storage.localJsxFactory,
            localJsxFragmentFactory: $source.$storage.localJsxFragmentFactory,
            jsxFragmentType: $source.$storage.jsxFragmentType
        });
    }
    declare private readonly then?: never;
}
export type SignatureLinks$Storage = {
    resolvedSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined;
    effectsSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined;
    decoratorSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined;
};
export class SignatureLinks implements GoContainerStoredValue<SignatureLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SignatureLinks$Storage) {
    }
    public static $storageOf($source: SignatureLinks): SignatureLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SignatureLinks$Storage): SignatureLinks {
        return new SignatureLinks($source);
    }
    public get resolvedSignature(): tsonicTypeScriptRuntime.Location<Signature> | undefined {
        return this.$storage.resolvedSignature;
    }
    public set resolvedSignature($value: tsonicTypeScriptRuntime.Location<Signature> | undefined) {
        this.$storage.resolvedSignature = $value;
    }
    public get effectsSignature(): tsonicTypeScriptRuntime.Location<Signature> | undefined {
        return this.$storage.effectsSignature;
    }
    public set effectsSignature($value: tsonicTypeScriptRuntime.Location<Signature> | undefined) {
        this.$storage.effectsSignature = $value;
    }
    public get decoratorSignature(): tsonicTypeScriptRuntime.Location<Signature> | undefined {
        return this.$storage.decoratorSignature;
    }
    public set decoratorSignature($value: tsonicTypeScriptRuntime.Location<Signature> | undefined) {
        this.$storage.decoratorSignature = $value;
    }
    declare readonly [$goContainerStorageType]: SignatureLinks$Storage;
    static $zero(): SignatureLinks {
        return new SignatureLinks({
            resolvedSignature: void 0,
            effectsSignature: void 0,
            decoratorSignature: void 0
        });
    }
    static $copy($source: SignatureLinks): SignatureLinks {
        return new SignatureLinks({
            resolvedSignature: $source.$storage.resolvedSignature,
            effectsSignature: $source.$storage.effectsSignature,
            decoratorSignature: $source.$storage.decoratorSignature
        });
    }
    static $equal($left: SignatureLinks, $right: SignatureLinks): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.$storage.resolvedSignature, $right.$storage.resolvedSignature)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.$storage.effectsSignature, $right.$storage.effectsSignature) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.decoratorSignature, $right.$storage.decoratorSignature);
    }
    static $hash($source: SignatureLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.resolvedSignature));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.effectsSignature));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.decoratorSignature));
        return $hash;
    }
    declare private readonly then?: never;
}
export type TypeFlags = uint32;
export function TypeFlagsNone$constant(): TypeFlags {
    return 0;
}
export function TypeFlagsAny$constant(): TypeFlags {
    return 1;
}
export function TypeFlagsUnknown$constant(): TypeFlags {
    return 2;
}
export function TypeFlagsUndefined$constant(): TypeFlags {
    return 4;
}
export function TypeFlagsNull$constant(): TypeFlags {
    return 8;
}
export function TypeFlagsVoid$constant(): TypeFlags {
    return 16;
}
export function TypeFlagsString$constant(): TypeFlags {
    return 32;
}
export function TypeFlagsNumber$constant(): TypeFlags {
    return 64;
}
export function TypeFlagsBigInt$constant(): TypeFlags {
    return 128;
}
export function TypeFlagsBoolean$constant(): TypeFlags {
    return 256;
}
export function TypeFlagsESSymbol$constant(): TypeFlags {
    return 512;
}
export function TypeFlagsStringLiteral$constant(): TypeFlags {
    return 1024;
}
export function TypeFlagsNumberLiteral$constant(): TypeFlags {
    return 2048;
}
export function TypeFlagsBigIntLiteral$constant(): TypeFlags {
    return 4096;
}
export function TypeFlagsBooleanLiteral$constant(): TypeFlags {
    return 8192;
}
export function TypeFlagsUniqueESSymbol$constant(): TypeFlags {
    return 16384;
}
export function TypeFlagsEnumLiteral$constant(): TypeFlags {
    return 32768;
}
export function TypeFlagsEnum$constant(): TypeFlags {
    return 65536;
}
export function TypeFlagsNonPrimitive$constant(): TypeFlags {
    return 131072;
}
export function TypeFlagsNever$constant(): TypeFlags {
    return 262144;
}
export function TypeFlagsTypeParameter$constant(): TypeFlags {
    return 524288;
}
export function TypeFlagsObject$constant(): TypeFlags {
    return 1048576;
}
export function TypeFlagsIndex$constant(): TypeFlags {
    return 2097152;
}
export function TypeFlagsTemplateLiteral$constant(): TypeFlags {
    return 4194304;
}
export function TypeFlagsStringMapping$constant(): TypeFlags {
    return 8388608;
}
export function TypeFlagsSubstitution$constant(): TypeFlags {
    return 16777216;
}
export function TypeFlagsIndexedAccess$constant(): TypeFlags {
    return 33554432;
}
export function TypeFlagsConditional$constant(): TypeFlags {
    return 67108864;
}
export function TypeFlagsUnion$constant(): TypeFlags {
    return 134217728;
}
export function TypeFlagsIntersection$constant(): TypeFlags {
    return 268435456;
}
export function TypeFlagsAnyOrUnknown$constant(): TypeFlags {
    return 3;
}
export function TypeFlagsNullable$constant(): TypeFlags {
    return 12;
}
export function TypeFlagsLiteral$constant(): TypeFlags {
    return 15360;
}
export function TypeFlagsUnit$constant(): TypeFlags {
    return 97292;
}
export function TypeFlagsFreshable$constant(): TypeFlags {
    return 80896;
}
export function TypeFlagsStringOrNumberLiteral$constant(): TypeFlags {
    return 3072;
}
export function TypeFlagsStringOrNumberLiteralOrUnique$constant(): TypeFlags {
    return 19456;
}
export function TypeFlagsIntrinsic$constant(): TypeFlags {
    return 393983;
}
export function TypeFlagsStringLike$constant(): TypeFlags {
    return 12583968;
}
export function TypeFlagsNumberLike$constant(): TypeFlags {
    return 67648;
}
export function TypeFlagsBigIntLike$constant(): TypeFlags {
    return 4224;
}
export function TypeFlagsBooleanLike$constant(): TypeFlags {
    return 8448;
}
export function TypeFlagsEnumLike$constant(): TypeFlags {
    return 98304;
}
export function TypeFlagsESSymbolLike$constant(): TypeFlags {
    return 16896;
}
export function TypeFlagsVoidLike$constant(): TypeFlags {
    return 20;
}
export function TypeFlagsPrimitive$constant(): TypeFlags {
    return 12713980;
}
export function TypeFlagsDefinitelyNonNullable$constant(): TypeFlags {
    return 13893600;
}
export function TypeFlagsDisjointDomains$constant(): TypeFlags {
    return 12812284;
}
export function TypeFlagsUnionOrIntersection$constant(): TypeFlags {
    return 402653184;
}
export function TypeFlagsStructuredType$constant(): TypeFlags {
    return 403701760;
}
export function TypeFlagsTypeVariable$constant(): TypeFlags {
    return 34078720;
}
export function TypeFlagsInstantiableNonPrimitive$constant(): TypeFlags {
    return 117964800;
}
export function TypeFlagsInstantiable$constant(): TypeFlags {
    return 132644864;
}
export function TypeFlagsStructuredOrInstantiable$constant(): TypeFlags {
    return 536346624;
}
export function TypeFlagsObjectFlagsType$constant(): TypeFlags {
    return 403963917;
}
export function TypeFlagsSimplifiable$constant(): TypeFlags {
    return 102760448;
}
export function TypeFlagsSingleton$constant(): TypeFlags {
    return 394239;
}
export function TypeFlagsIncludesMask$constant(): TypeFlags {
    return 416808959;
}
export function TypeFlagsIncludesMissingType$constant(): TypeFlags {
    return 524288;
}
export function TypeFlagsIncludesNonWideningType$constant(): TypeFlags {
    return 2097152;
}
export function TypeFlagsIncludesWildcard$constant(): TypeFlags {
    return 33554432;
}
export function TypeFlagsIncludesEmptyObject$constant(): TypeFlags {
    return 67108864;
}
export function TypeFlagsIncludesInstantiable$constant(): TypeFlags {
    return 16777216;
}
export function TypeFlagsIncludesConstrainedTypeVariable$constant(): TypeFlags {
    return 536870912;
}
export function TypeFlagsIncludesError$constant(): TypeFlags {
    return 1073741824;
}
export function TypeFlagsNotPrimitiveUnion$constant(): TypeFlags {
    return 286523411;
}
export function FormatTypeFlags(flags: TypeFlags): RuntimeSlice<gostring> {
    let result = RuntimeSlice.make<gostring>(0, globalThis.Number(BigInt.asIntN(64, bits__from_gostdlib.OnesCount32(flags))), "");
    const __gotots_array_build_0 = $state.typeFlagNames;
    const __gotots_array_build_1 = goArrayAllocate<$goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage, 29>(29);
    for (let __gotots_array_build_2 = 0; __gotots_array_build_2 < 29; __gotots_array_build_2++) {
        __gotots_array_build_1.set(__gotots_array_build_2, $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$storageOf($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$copy($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage(__gotots_array_build_0.get(__gotots_array_build_2)))));
    }
    const __gotots_range_0 = __gotots_array_build_1;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < 29; __gotots_range_index_0++) {
        const __gotots_range_value_0 = $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$copy($goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
        let fn = __gotots_range_value_0;
        if (!((flags & fn.flag) >>> 0 === 0)) {
            result = result.append("", [fn.name]);
        }
    }
    if (result.length === 0) {
        result = result.append("", ["None"]);
    }
    return result;
}
export function TypeFlags_String(f: TypeFlags): gostring {
    return strings__from_gostdlib.Join(FormatTypeFlags(f), "|");
}
export function VarianceFlags_String(v: VarianceFlags): gostring {
    let variance = (v & VarianceFlagsVarianceMask$constant()) >>> 0;
    let result = "";
    switch (variance) {
        case VarianceFlagsInvariant$constant(): {
            result = "in out";
            break;
        }
        case VarianceFlagsBivariant$constant(): {
            result = "[bivariant]";
            break;
        }
        case VarianceFlagsContravariant$constant(): {
            result = "in";
            break;
        }
        case VarianceFlagsCovariant$constant(): {
            result = "out";
            break;
        }
        case VarianceFlagsIndependent$constant(): {
            result = "[independent]";
            break;
        }
        default: {
            result = "";
            break;
        }
    }
    if (!((v & VarianceFlagsUnmeasurable$constant()) >>> 0 === 0)) {
        result = result + " (unmeasurable)";
    }
    else if (!((v & VarianceFlagsUnreliable$constant()) >>> 0 === 0)) {
        result = result + " (unreliable)";
    }
    return result;
}
export type ObjectFlags = uint32;
export function ObjectFlagsNone$constant(): ObjectFlags {
    return 0;
}
export function ObjectFlagsClass$constant(): ObjectFlags {
    return 1;
}
export function ObjectFlagsInterface$constant(): ObjectFlags {
    return 2;
}
export function ObjectFlagsReference$constant(): ObjectFlags {
    return 4;
}
export function ObjectFlagsTuple$constant(): ObjectFlags {
    return 8;
}
export function ObjectFlagsAnonymous$constant(): ObjectFlags {
    return 16;
}
export function ObjectFlagsMapped$constant(): ObjectFlags {
    return 32;
}
export function ObjectFlagsInstantiated$constant(): ObjectFlags {
    return 64;
}
export function ObjectFlagsObjectLiteral$constant(): ObjectFlags {
    return 128;
}
export function ObjectFlagsEvolvingArray$constant(): ObjectFlags {
    return 256;
}
export function ObjectFlagsObjectLiteralPatternWithComputedProperties$constant(): ObjectFlags {
    return 512;
}
export function ObjectFlagsReverseMapped$constant(): ObjectFlags {
    return 1024;
}
export function ObjectFlagsJsxAttributes$constant(): ObjectFlags {
    return 2048;
}
export function ObjectFlagsJSLiteral$constant(): ObjectFlags {
    return 4096;
}
export function ObjectFlagsFreshLiteral$constant(): ObjectFlags {
    return 8192;
}
export function ObjectFlagsPrimitiveUnion$constant(): ObjectFlags {
    return 32768;
}
export function ObjectFlagsContainsWideningType$constant(): ObjectFlags {
    return 65536;
}
export function ObjectFlagsContainsObjectOrArrayLiteral$constant(): ObjectFlags {
    return 131072;
}
export function ObjectFlagsNonInferrableType$constant(): ObjectFlags {
    return 262144;
}
export function ObjectFlagsCouldContainTypeVariablesComputed$constant(): ObjectFlags {
    return 524288;
}
export function ObjectFlagsCouldContainTypeVariables$constant(): ObjectFlags {
    return 1048576;
}
export function ObjectFlagsMembersResolved$constant(): ObjectFlags {
    return 2097152;
}
export function ObjectFlagsClassOrInterface$constant(): ObjectFlags {
    return 3;
}
export function ObjectFlagsRequiresWidening$constant(): ObjectFlags {
    return 196608;
}
export function ObjectFlagsPropagatingFlags$constant(): ObjectFlags {
    return 458752;
}
export function ObjectFlagsInstantiatedMapped$constant(): ObjectFlags {
    return 96;
}
export function ObjectFlagsObjectTypeKindMask$constant(): ObjectFlags {
    return 50332991;
}
export const ObjectFlagsContainsSpread$uint32: uint32 = 4194304;
export const ObjectFlagsObjectRestType$uint32: uint32 = 8388608;
export const ObjectFlagsInstantiationExpressionType$uint32: uint32 = 16777216;
export const ObjectFlagsSingleSignatureType$uint32: uint32 = 33554432;
export const ObjectFlagsIsClassInstanceClone$uint32: uint32 = 67108864;
export const ObjectFlagsIdenticalBaseTypeCalculated$uint32: uint32 = 134217728;
export const ObjectFlagsUnresolvedMembers$uint32: uint32 = 536870912;
export const ObjectFlagsFromTypeNode$uint32: uint32 = 1073741824;
export const ObjectFlagsIsGenericTypeComputed$uint32: uint32 = 4194304;
export const ObjectFlagsIsGenericObjectType$uint32: uint32 = 8388608;
export const ObjectFlagsIsGenericIndexType$uint32: uint32 = 16777216;
export const ObjectFlagsIsGenericType$uint32: uint32 = 25165824;
export const ObjectFlagsContainsIntersections$uint32: uint32 = 33554432;
export const ObjectFlagsIsUnknownLikeUnionComputed$uint32: uint32 = 67108864;
export const ObjectFlagsIsUnknownLikeUnion$uint32: uint32 = 134217728;
export const ObjectFlagsIsNeverIntersectionComputed$uint32: uint32 = 33554432;
export const ObjectFlagsIsNeverIntersection$uint32: uint32 = 67108864;
export const ObjectFlagsIsConstrainedTypeVariable$uint32: uint32 = 134217728;
export class TypeAlias {
    declare private readonly $goType: void;
    public constructor(public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public typeArguments: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
    }
    static $copy($source: TypeAlias): TypeAlias {
        return new TypeAlias($source.__go_symbol, $source.typeArguments);
    }
    declare private readonly then?: never;
    static Symbol(a: {
        value: TypeAlias;
    } | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if (a === undefined) {
            return void 0;
        }
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol;
    }
    static ToTypeReferenceNode(t: {
        value: TypeAlias;
    } | undefined, b: {
        value: NodeBuilderImpl;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$symbolToEntityNameNode(b, TypeAlias.Symbol(t)), NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, TypeAlias.TypeArguments(t), false));
    }
    static TypeArguments(a: {
        value: TypeAlias;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        if (a === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        }
        return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArguments;
    }
}
export class Type {
    declare private readonly $goType: void;
    public constructor(public flags: TypeFlags, public objectFlags: ObjectFlags, public id: TypeId, public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public alias: {
        value: TypeAlias;
    } | undefined, public checker: tsonicTypeScriptRuntime.Location<Checker> | undefined, public data: TypeData | undefined) {
    }
    static $zero(): Type {
        return new Type(0, 0, 0, void 0, void 0, void 0, void 0);
    }
    static $copy($source: Type): Type {
        return new Type($source.flags, $source.objectFlags, $source.id, $source.__go_symbol, $source.alias, $source.checker, $source.data);
    }
    static $equal($left: Type, $right: Type): bool {
        return $left.flags === $right.flags && $left.objectFlags === $right.objectFlags && $left.id === $right.id &&
            tsonicTypeScriptRuntime.sameLocation($left.__go_symbol, $right.__go_symbol) &&
            $left.alias
                ===
                    $right.alias &&
            tsonicTypeScriptRuntime.sameLocation($left.checker, $right.checker) && goInterfaceEqual($left.data, $right.data);
    }
    static $hash($source: Type): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.flags));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.objectFlags));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.id));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.__go_symbol));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.alias));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.checker));
        $hash = GoMapHash.mix($hash, $source.data === undefined ? 0 : $source.data.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Alias(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: TypeAlias;
    } | undefined {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias;
    }
    static AsConditionalType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: ConditionalType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: ConditionalType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$ConditionalType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsConstrainedType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<ConstrainedType> | undefined {
        const __gotots_receiver_5 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data;
        return goInterfaceNonNil<TypeData>(__gotots_receiver_5).AsConstrainedType();
    }
    static AsEvolvingArrayType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: EvolvingArrayType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: EvolvingArrayType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$EvolvingArrayType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsIndexType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: IndexType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: IndexType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$IndexType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsIndexedAccessType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: IndexedAccessType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: IndexedAccessType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$IndexedAccessType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsInstantiationExpressionType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: InstantiationExpressionType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: InstantiationExpressionType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$InstantiationExpressionType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsInterfaceType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<InterfaceType> | undefined {
        const __gotots_receiver_1 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data;
        return goInterfaceNonNil<TypeData>(__gotots_receiver_1).AsInterfaceType();
    }
    static AsIntersectionType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: IntersectionType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: IntersectionType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$IntersectionType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsIntrinsicType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: IntrinsicType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: IntrinsicType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$IntrinsicType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsLiteralType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: LiteralType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: LiteralType;
        } | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsMappedType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: MappedType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: MappedType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$MappedType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsObjectType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<ObjectType> | undefined {
        const __gotots_receiver_0 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data;
        return goInterfaceNonNil<TypeData>(__gotots_receiver_0).AsObjectType();
    }
    static AsReverseMappedType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: ReverseMappedType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: ReverseMappedType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$ReverseMappedType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsStringMappingType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: StringMappingType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: StringMappingType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$StringMappingType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsStructuredType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<StructuredType> | undefined {
        const __gotots_receiver_2 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data;
        return goInterfaceNonNil<TypeData>(__gotots_receiver_2).AsStructuredType();
    }
    static AsSubstitutionType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: SubstitutionType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: SubstitutionType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$SubstitutionType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsTemplateLiteralType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: TemplateLiteralType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: TemplateLiteralType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$TemplateLiteralType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsTupleType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: TupleType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: TupleType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$TupleType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsTypeParameter(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: TypeParameter;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: TypeParameter;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$TypeParameter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsTypeReference(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<TypeReference> | undefined {
        const __gotots_receiver_4 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data;
        return goInterfaceNonNil<TypeData>(__gotots_receiver_4).AsTypeReference();
    }
    static AsUnionOrIntersectionType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<UnionOrIntersectionType> | undefined {
        const __gotots_receiver_3 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data;
        return goInterfaceNonNil<TypeData>(__gotots_receiver_3).AsUnionOrIntersectionType();
    }
    static AsUnionType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: UnionType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: UnionType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$UnionType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static AsUniqueESSymbolType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: UniqueESSymbolType;
    } | undefined {
        return (($value: TypeData | undefined): {
            value: UniqueESSymbolType;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_checker$UniqueESSymbolType.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.data);
    }
    static Distributed(t: tsonicTypeScriptRuntime.Location<Type> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        __gotots_control_target_3: {
            if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                return (Type.AsUnionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnionOrIntersectionType.types;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0)) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
            }
        }
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([t]);
    }
    static Flags(t: tsonicTypeScriptRuntime.Location<Type> | undefined): TypeFlags {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags;
    }
    static Id(t: tsonicTypeScriptRuntime.Location<Type> | undefined): TypeId {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id;
    }
    static IsBigIntLiteral(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBigIntLiteral$constant()) >>> 0 === 0);
    }
    static IsBooleanLike(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBooleanLike$constant()) >>> 0 === 0);
    }
    static IsClass(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsClass$constant()) >>> 0 === 0);
    }
    static IsEnumLiteral(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsEnumLiteral$constant()) >>> 0 === 0);
    }
    static IsIndex(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0);
    }
    static IsIntersection(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0);
    }
    static IsNumberLiteral(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumberLiteral$constant()) >>> 0 === 0);
    }
    static IsString(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsString$constant()) >>> 0 === 0);
    }
    static IsStringLike(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLike$constant()) >>> 0 === 0);
    }
    static IsStringLiteral(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLiteral$constant()) >>> 0 === 0);
    }
    static IsTupleType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return isTupleType(t);
    }
    static IsTypeParameter(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0);
    }
    static IsUnion(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0);
    }
    static Mapper(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
        __gotots_control_target_2: {
            if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0)) {
                return ((Type.AsObjectType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType>).value.mapper;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0)) {
                return (Type.AsTypeParameter(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                return (Type.AsConditionalType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper;
            }
        }
        const __gotots_argument_2 = new $goInterfaceAdapter$string("Unhandled case in Type.Mapper");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static ObjectFlags(t: tsonicTypeScriptRuntime.Location<Type> | undefined): ObjectFlags {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags;
    }
    static Symbol(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
    }
    static Target(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        __gotots_control_target_1: {
            if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0)) {
                return ((Type.AsObjectType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ObjectType>).value.target;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0)) {
                return (Type.AsTypeParameter(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
                return (Type.AsIndexType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
                return (Type.AsStringMappingType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsMapped$constant()) >>> 0 === 0)) {
                return (Type.AsMappedType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectType.target;
            }
        }
        const __gotots_argument_1 = new $goInterfaceAdapter$string("Unhandled case in Type.Target");
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static TargetInterfaceType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<InterfaceType> | undefined {
        return Type.AsInterfaceType(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target);
    }
    static TargetTupleType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): {
        value: TupleType;
    } | undefined {
        return Type.AsTupleType(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target);
    }
    static Types(t: tsonicTypeScriptRuntime.Location<Type> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        __gotots_control_target_0: {
            if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnionOrIntersection$constant()) >>> 0 === 0)) {
                return ((Type.AsUnionOrIntersectionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionOrIntersectionType>).value.types;
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0)) {
                return (Type.AsTemplateLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types;
            }
        }
        const __gotots_argument_0 = new $goInterfaceAdapter$string("Unhandled case in Type.Types");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
}
export interface TypeData extends GoInterfaceValue {
    AsConstrainedType(): tsonicTypeScriptRuntime.Location<ConstrainedType> | undefined;
    AsInterfaceType(): tsonicTypeScriptRuntime.Location<InterfaceType> | undefined;
    AsObjectType(): tsonicTypeScriptRuntime.Location<ObjectType> | undefined;
    AsStructuredType(): tsonicTypeScriptRuntime.Location<StructuredType> | undefined;
    AsType(): tsonicTypeScriptRuntime.Location<Type> | undefined;
    AsTypeReference(): tsonicTypeScriptRuntime.Location<TypeReference> | undefined;
    AsUnionOrIntersectionType(): tsonicTypeScriptRuntime.Location<UnionOrIntersectionType> | undefined;
}
export const TypeData$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AsConstrainedType$void_to_PointerTo_Named_checker$ConstrainedType, $goInterfaceMethod$AsInterfaceType$void_to_PointerTo_Named_checker$InterfaceType, $goInterfaceMethod$AsObjectType$void_to_PointerTo_Named_checker$ObjectType, $goInterfaceMethod$AsStructuredType$void_to_PointerTo_Named_checker$StructuredType, $goInterfaceMethod$AsType$void_to_PointerTo_Named_checker$Type, $goInterfaceMethod$AsTypeReference$void_to_PointerTo_Named_checker$TypeReference, $goInterfaceMethod$AsUnionOrIntersectionType$void_to_PointerTo_Named_checker$UnionOrIntersectionType]);
export function TypeData$is(value: GoInterfaceValue | undefined): value is TypeData {
    return value !== undefined && value.$go$implements(TypeData$contract);
}
export class TypeBase {
    declare private readonly $goType: void;
    public constructor(public Type: Type) {
    }
    static $zero(): TypeBase {
        return new TypeBase(Type.$zero());
    }
    static $copy($source: TypeBase): TypeBase {
        return new TypeBase(Type.$copy($source.Type));
    }
    static $equal($left: TypeBase, $right: TypeBase): bool {
        return Type.$equal($left.Type, $right.Type);
    }
    static $hash($source: TypeBase): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, Type.$hash($source.Type));
        return $hash;
    }
    declare private readonly then?: never;
    static AsConstrainedType(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<ConstrainedType> | undefined {
        return void 0;
    }
    static AsInterfaceType(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<InterfaceType> | undefined {
        return void 0;
    }
    static AsObjectType(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<ObjectType> | undefined {
        return void 0;
    }
    static AsStructuredType(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<StructuredType> | undefined {
        return void 0;
    }
    static AsType(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        const __gotots_store_0 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeBase>).value;
        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Type");
    }
    static AsTypeReference(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<TypeReference> | undefined {
        return void 0;
    }
    static AsUnionOrIntersectionType(t: tsonicTypeScriptRuntime.Location<TypeBase> | undefined): tsonicTypeScriptRuntime.Location<UnionOrIntersectionType> | undefined {
        return void 0;
    }
}
export class IntrinsicType {
    declare private readonly $goType: void;
    public constructor(public TypeBase: TypeBase, public intrinsicName: gostring) {
    }
    static $copy($source: IntrinsicType): IntrinsicType {
        return new IntrinsicType(TypeBase.$copy($source.TypeBase), $source.intrinsicName);
    }
    static $equal($left: IntrinsicType, $right: IntrinsicType): bool {
        return TypeBase.$equal($left.TypeBase, $right.TypeBase) && $left.intrinsicName === $right.intrinsicName;
    }
    static $hash($source: IntrinsicType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeBase.$hash($source.TypeBase));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.intrinsicName));
        return $hash;
    }
    declare private readonly then?: never;
    static IntrinsicName(t: {
        value: IntrinsicType;
    } | undefined): gostring {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.intrinsicName;
    }
}
export class LiteralType {
    declare private readonly $goType: void;
    public constructor(public TypeBase: TypeBase, public value: GoInterface | undefined, public freshType: tsonicTypeScriptRuntime.Location<Type> | undefined, public regularType: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: LiteralType): LiteralType {
        return new LiteralType(TypeBase.$copy($source.TypeBase), $source.value, $source.freshType, $source.regularType);
    }
    static $equal($left: LiteralType, $right: LiteralType): bool {
        return TypeBase.$equal($left.TypeBase, $right.TypeBase) && goInterfaceEqual($left.value, $right.value) &&
            tsonicTypeScriptRuntime.sameLocation($left.freshType, $right.freshType) &&
            tsonicTypeScriptRuntime.sameLocation($left.regularType, $right.regularType);
    }
    static $hash($source: LiteralType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeBase.$hash($source.TypeBase));
        $hash = GoMapHash.mix($hash, $source.value === undefined ? 0 : $source.value.$go$hash());
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.freshType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.regularType));
        return $hash;
    }
    declare private readonly then?: never;
    static FreshType(t: {
        value: LiteralType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.freshType;
    }
    static RegularType(t: {
        value: LiteralType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.regularType;
    }
    static String(t: {
        value: LiteralType;
    } | undefined): gostring {
        return ValueToString((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
    }
    static Value(t: {
        value: LiteralType;
    } | undefined): GoInterface | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value;
    }
}
export class UniqueESSymbolType {
    declare private readonly $goType: void;
    public constructor(public TypeBase: TypeBase, public name: gostring) {
    }
    static $copy($source: UniqueESSymbolType): UniqueESSymbolType {
        return new UniqueESSymbolType(TypeBase.$copy($source.TypeBase), $source.name);
    }
    static $equal($left: UniqueESSymbolType, $right: UniqueESSymbolType): bool {
        return TypeBase.$equal($left.TypeBase, $right.TypeBase) && $left.name === $right.name;
    }
    static $hash($source: UniqueESSymbolType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeBase.$hash($source.TypeBase));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.name));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ConstrainedType {
    declare private readonly $goType: void;
    public constructor(public TypeBase: TypeBase, public resolvedBaseConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $zero(): ConstrainedType {
        return new ConstrainedType(TypeBase.$zero(), void 0);
    }
    static $copy($source: ConstrainedType): ConstrainedType {
        return new ConstrainedType(TypeBase.$copy($source.TypeBase), $source.resolvedBaseConstraint);
    }
    static $equal($left: ConstrainedType, $right: ConstrainedType): bool {
        return TypeBase.$equal($left.TypeBase, $right.TypeBase) &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedBaseConstraint, $right.resolvedBaseConstraint);
    }
    static $hash($source: ConstrainedType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TypeBase.$hash($source.TypeBase));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedBaseConstraint));
        return $hash;
    }
    declare private readonly then?: never;
    static AsConstrainedType(t: tsonicTypeScriptRuntime.Location<ConstrainedType> | undefined): tsonicTypeScriptRuntime.Location<ConstrainedType> | undefined {
        return t;
    }
}
export class StructuredType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public members: SymbolTable__from_ast, public properties: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public signatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined>, public callSignatureCount: int, public indexInfos: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo> | undefined>, public objectTypeWithoutAbstractConstructSignatures: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $zero(): StructuredType {
        return new StructuredType(ConstrainedType.$zero(), new SymbolTable__from_ast(GoMap.nil()), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Signature> | undefined>(), 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<IndexInfo> | undefined>(), void 0);
    }
    static $copy($source: StructuredType): StructuredType {
        return new StructuredType(ConstrainedType.$copy($source.ConstrainedType), $source.members, $source.properties, $source.signatures, $source.callSignatureCount, $source.indexInfos, $source.objectTypeWithoutAbstractConstructSignatures);
    }
    declare private readonly then?: never;
    static AsStructuredType(t: tsonicTypeScriptRuntime.Location<StructuredType> | undefined): tsonicTypeScriptRuntime.Location<StructuredType> | undefined {
        return t;
    }
    static CallSignatures(t: tsonicTypeScriptRuntime.Location<StructuredType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined> {
        return Clip$SliceOf_PointerTo_Named_checker$Signature$PointerTo_Named_checker$Signature(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.signatures.slice(0, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.callSignatureCount, null));
    }
    static ConstructSignatures(t: tsonicTypeScriptRuntime.Location<StructuredType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined> {
        return Clip$SliceOf_PointerTo_Named_checker$Signature$PointerTo_Named_checker$Signature(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.signatures.slice(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.callSignatureCount, null, null));
    }
    static Properties(t: tsonicTypeScriptRuntime.Location<StructuredType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.properties;
    }
}
export class ObjectType {
    declare private readonly $goType: void;
    public constructor(public StructuredType: StructuredType, public target: tsonicTypeScriptRuntime.Location<Type> | undefined, public mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, public instantiations: GoMapValue<CacheHashKey, tsonicTypeScriptRuntime.Location<Type> | undefined>) {
    }
    static $zero(): ObjectType {
        return new ObjectType(StructuredType.$zero(), void 0, void 0, $goMap$MapOf_Named_checker$CacheHashKey_To_PointerTo_Named_checker$Type.nil());
    }
    static $copy($source: ObjectType): ObjectType {
        return new ObjectType(StructuredType.$copy($source.StructuredType), $source.target, $source.mapper, $source.instantiations);
    }
    declare private readonly then?: never;
    static AsObjectType(t: tsonicTypeScriptRuntime.Location<ObjectType> | undefined): tsonicTypeScriptRuntime.Location<ObjectType> | undefined {
        return t;
    }
}
export class TypeReference {
    declare private readonly $goType: void;
    public constructor(public ObjectType: ObjectType, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public resolvedTypeArguments: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
    }
    static $zero(): TypeReference {
        return new TypeReference(ObjectType.$zero(), void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>());
    }
    static $copy($source: TypeReference): TypeReference {
        return new TypeReference(ObjectType.$copy($source.ObjectType), $source.node, $source.resolvedTypeArguments);
    }
    declare private readonly then?: never;
    static AsTypeReference(t: tsonicTypeScriptRuntime.Location<TypeReference> | undefined): tsonicTypeScriptRuntime.Location<TypeReference> | undefined {
        return t;
    }
}
export class InterfaceType {
    declare private readonly $goType: void;
    public constructor(public TypeReference: TypeReference, public allTypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public outerTypeParameterCount: int, public thisType: tsonicTypeScriptRuntime.Location<Type> | undefined, public baseTypesResolved: bool, public declaredMembersResolved: bool, public resolvedBaseConstructorType: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedBaseTypes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public declaredMembers: SymbolTable__from_ast, public declaredCallSignatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined>, public declaredConstructSignatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined>, public declaredIndexInfos: RuntimeSlice<tsonicTypeScriptRuntime.Location<IndexInfo> | undefined>) {
    }
    static $zero(): InterfaceType {
        return new InterfaceType(TypeReference.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), 0, void 0, false, false, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), new SymbolTable__from_ast(GoMap.nil()), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Signature> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Signature> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<IndexInfo> | undefined>());
    }
    static $copy($source: InterfaceType): InterfaceType {
        return new InterfaceType(TypeReference.$copy($source.TypeReference), $source.allTypeParameters, $source.outerTypeParameterCount, $source.thisType, $source.baseTypesResolved, $source.declaredMembersResolved, $source.resolvedBaseConstructorType, $source.resolvedBaseTypes, $source.declaredMembers, $source.declaredCallSignatures, $source.declaredConstructSignatures, $source.declaredIndexInfos);
    }
    declare private readonly then?: never;
    static AsInterfaceType(t: tsonicTypeScriptRuntime.Location<InterfaceType> | undefined): tsonicTypeScriptRuntime.Location<InterfaceType> | undefined {
        return t;
    }
    static LocalTypeParameters(t: tsonicTypeScriptRuntime.Location<InterfaceType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        if (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        }
        return Clip$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.slice(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.outerTypeParameterCount, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.length - 1, null));
    }
    static OuterTypeParameters(t: tsonicTypeScriptRuntime.Location<InterfaceType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        if (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        }
        return Clip$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.slice(0, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.outerTypeParameterCount, null));
    }
    static TypeParameters(t: tsonicTypeScriptRuntime.Location<InterfaceType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        if (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        }
        return Clip$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.slice(0, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.allTypeParameters.length - 1, null));
    }
}
export type ElementFlags = uint32;
export function ElementFlagsNone$constant(): ElementFlags {
    return 0;
}
export function ElementFlagsRequired$constant(): ElementFlags {
    return 1;
}
export function ElementFlagsOptional$constant(): ElementFlags {
    return 2;
}
export function ElementFlagsRest$constant(): ElementFlags {
    return 4;
}
export function ElementFlagsVariadic$constant(): ElementFlags {
    return 8;
}
export function ElementFlagsFixed$constant(): ElementFlags {
    return 3;
}
export function ElementFlagsVariable$constant(): ElementFlags {
    return 12;
}
export function ElementFlagsNonRequired$constant(): ElementFlags {
    return 14;
}
export function ElementFlagsNonRest$constant(): ElementFlags {
    return 11;
}
export type TupleElementInfo$Storage = {
    flags: uint32;
    labeledDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class TupleElementInfo implements GoContainerStoredValue<TupleElementInfo$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TupleElementInfo$Storage) {
    }
    public static $storageOf($source: TupleElementInfo): TupleElementInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TupleElementInfo$Storage): TupleElementInfo {
        return new TupleElementInfo($source);
    }
    public get flags(): ElementFlags {
        return this.$storage.flags;
    }
    public set flags($value: ElementFlags) {
        this.$storage.flags = $value;
    }
    public get labeledDeclaration(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.labeledDeclaration;
    }
    public set labeledDeclaration($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.labeledDeclaration = $value;
    }
    declare readonly [$goContainerStorageType]: TupleElementInfo$Storage;
    static $zero(): TupleElementInfo {
        return new TupleElementInfo({
            flags: 0,
            labeledDeclaration: void 0
        });
    }
    static $copy($source: TupleElementInfo): TupleElementInfo {
        return new TupleElementInfo({
            flags: $source.$storage.flags,
            labeledDeclaration: $source.$storage.labeledDeclaration
        });
    }
    static $equal($left: TupleElementInfo, $right: TupleElementInfo): bool {
        return $left.$storage.flags === $right.$storage.flags &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.labeledDeclaration, $right.$storage.labeledDeclaration);
    }
    static $hash($source: TupleElementInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.flags));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.labeledDeclaration));
        return $hash;
    }
    declare private readonly then?: never;
    static LabeledDeclaration(t: TupleElementInfo | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return TupleElementInfo.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).labeledDeclaration;
    }
}
export class TupleType {
    declare private readonly $goType: void;
    public constructor(public InterfaceType: InterfaceType, public elementInfos: RuntimeSlice<TupleElementInfo$Storage>, public minLength: int, public fixedLength: int, public combinedFlags: ElementFlags, public __go_readonly: bool) {
    }
    static $copy($source: TupleType): TupleType {
        return new TupleType(InterfaceType.$copy($source.InterfaceType), $source.elementInfos, $source.minLength, $source.fixedLength, $source.combinedFlags, $source.__go_readonly);
    }
    declare private readonly then?: never;
    static ElementFlags(t: {
        value: TupleType;
    } | undefined): RuntimeSlice<ElementFlags> {
        let elementFlags = RuntimeSlice.make<ElementFlags>((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.length, null, 0);
        const __gotots_range_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = TupleElementInfo.$copy(TupleElementInfo.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
            let i = __gotots_range_value_1;
            let info = __gotots_range_value_2;
            elementFlags.set(i, TupleElementInfo.$storageOf(info).flags);
        }
        return elementFlags;
    }
    static ElementInfos(t: {
        value: TupleType;
    } | undefined): RuntimeSlice<TupleElementInfo$Storage> {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos;
    }
    static FixedLength(t: {
        value: TupleType;
    } | undefined): int {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fixedLength;
    }
    static IsReadonly(t: {
        value: TupleType;
    } | undefined): bool {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly;
    }
}
export class InstantiationExpressionType {
    declare private readonly $goType: void;
    public constructor(public ObjectType: ObjectType, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: InstantiationExpressionType): InstantiationExpressionType {
        return new InstantiationExpressionType(ObjectType.$copy($source.ObjectType), $source.node);
    }
    declare private readonly then?: never;
}
export class MappedType {
    declare private readonly $goType: void;
    public constructor(public ObjectType: ObjectType, public declaration: {
        value: MappedTypeNode__from_ast;
    } | undefined, public typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined, public constraintType: tsonicTypeScriptRuntime.Location<Type> | undefined, public nameType: tsonicTypeScriptRuntime.Location<Type> | undefined, public templateType: tsonicTypeScriptRuntime.Location<Type> | undefined, public modifiersType: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedApparentType: tsonicTypeScriptRuntime.Location<Type> | undefined, public containsError: bool) {
    }
    static $copy($source: MappedType): MappedType {
        return new MappedType(ObjectType.$copy($source.ObjectType), $source.declaration, $source.typeParameter, $source.constraintType, $source.nameType, $source.templateType, $source.modifiersType, $source.resolvedApparentType, $source.containsError);
    }
    declare private readonly then?: never;
}
export class ReverseMappedType {
    declare private readonly $goType: void;
    public constructor(public ObjectType: ObjectType, public source: tsonicTypeScriptRuntime.Location<Type> | undefined, public mappedType: tsonicTypeScriptRuntime.Location<Type> | undefined, public constraintType: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: ReverseMappedType): ReverseMappedType {
        return new ReverseMappedType(ObjectType.$copy($source.ObjectType), $source.source, $source.mappedType, $source.constraintType);
    }
    declare private readonly then?: never;
}
export class EvolvingArrayType {
    declare private readonly $goType: void;
    public constructor(public ObjectType: ObjectType, public elementType: tsonicTypeScriptRuntime.Location<Type> | undefined, public finalArrayType: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: EvolvingArrayType): EvolvingArrayType {
        return new EvolvingArrayType(ObjectType.$copy($source.ObjectType), $source.elementType, $source.finalArrayType);
    }
    declare private readonly then?: never;
}
export class UnionOrIntersectionType {
    declare private readonly $goType: void;
    public constructor(public StructuredType: StructuredType, public types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public propertyCache: SymbolTable__from_ast, public propertyCacheWithoutFunctionPropertyAugment: SymbolTable__from_ast, public resolvedProperties: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>) {
    }
    static $zero(): UnionOrIntersectionType {
        return new UnionOrIntersectionType(StructuredType.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), new SymbolTable__from_ast(GoMap.nil()), new SymbolTable__from_ast(GoMap.nil()), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>());
    }
    static $copy($source: UnionOrIntersectionType): UnionOrIntersectionType {
        return new UnionOrIntersectionType(StructuredType.$copy($source.StructuredType), $source.types, $source.propertyCache, $source.propertyCacheWithoutFunctionPropertyAugment, $source.resolvedProperties);
    }
    declare private readonly then?: never;
    static AsUnionOrIntersectionType(t: tsonicTypeScriptRuntime.Location<UnionOrIntersectionType> | undefined): tsonicTypeScriptRuntime.Location<UnionOrIntersectionType> | undefined {
        return t;
    }
    static Types(t: tsonicTypeScriptRuntime.Location<UnionOrIntersectionType> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionOrIntersectionType>).value.types;
    }
}
export class UnionType {
    declare private readonly $goType: void;
    public constructor(public UnionOrIntersectionType: UnionOrIntersectionType, public resolvedReducedType: tsonicTypeScriptRuntime.Location<Type> | undefined, public regularType: tsonicTypeScriptRuntime.Location<Type> | undefined, public origin: tsonicTypeScriptRuntime.Location<Type> | undefined, public keyPropertyName: gostring, public constituentMap: GoMapValue<tsonicTypeScriptRuntime.Location<Type> | undefined, tsonicTypeScriptRuntime.Location<Type> | undefined>) {
    }
    static $copy($source: UnionType): UnionType {
        return new UnionType(UnionOrIntersectionType.$copy($source.UnionOrIntersectionType), $source.resolvedReducedType, $source.regularType, $source.origin, $source.keyPropertyName, $source.constituentMap);
    }
    declare private readonly then?: never;
}
export class IntersectionType {
    declare private readonly $goType: void;
    public constructor(public UnionOrIntersectionType: UnionOrIntersectionType, public resolvedApparentType: tsonicTypeScriptRuntime.Location<Type> | undefined, public uniqueLiteralFilledInstantiation: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: IntersectionType): IntersectionType {
        return new IntersectionType(UnionOrIntersectionType.$copy($source.UnionOrIntersectionType), $source.resolvedApparentType, $source.uniqueLiteralFilledInstantiation);
    }
    declare private readonly then?: never;
}
export class TypeParameter {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public constraint: tsonicTypeScriptRuntime.Location<Type> | undefined, public target: tsonicTypeScriptRuntime.Location<Type> | undefined, public mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, public isThisType: bool, public resolvedDefaultType: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: TypeParameter): TypeParameter {
        return new TypeParameter(ConstrainedType.$copy($source.ConstrainedType), $source.constraint, $source.target, $source.mapper, $source.isThisType, $source.resolvedDefaultType);
    }
    static $equal($left: TypeParameter, $right: TypeParameter): bool {
        return ConstrainedType.$equal($left.ConstrainedType, $right.ConstrainedType) &&
            tsonicTypeScriptRuntime.sameLocation($left.constraint, $right.constraint) &&
            tsonicTypeScriptRuntime.sameLocation($left.target, $right.target) &&
            tsonicTypeScriptRuntime.sameLocation($left.mapper, $right.mapper) && $left.isThisType === $right.isThisType &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedDefaultType, $right.resolvedDefaultType);
    }
    static $hash($source: TypeParameter): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ConstrainedType.$hash($source.ConstrainedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.constraint));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.target));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.mapper));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isThisType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedDefaultType));
        return $hash;
    }
    declare private readonly then?: never;
    static IsThisType(t: {
        value: TypeParameter;
    } | undefined): bool {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isThisType;
    }
}
export type IndexFlags = uint32;
export function IndexFlagsNone$constant(): IndexFlags {
    return 0;
}
export function IndexFlagsStringsOnly$constant(): IndexFlags {
    return 1;
}
export function IndexFlagsNoIndexSignatures$constant(): IndexFlags {
    return 2;
}
export function IndexFlagsNoReducibleCheck$constant(): IndexFlags {
    return 4;
}
export class IndexType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public target: tsonicTypeScriptRuntime.Location<Type> | undefined, public indexFlags: IndexFlags) {
    }
    static $copy($source: IndexType): IndexType {
        return new IndexType(ConstrainedType.$copy($source.ConstrainedType), $source.target, $source.indexFlags);
    }
    static $equal($left: IndexType, $right: IndexType): bool {
        return ConstrainedType.$equal($left.ConstrainedType, $right.ConstrainedType) &&
            tsonicTypeScriptRuntime.sameLocation($left.target, $right.target) && $left.indexFlags === $right.indexFlags;
    }
    static $hash($source: IndexType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ConstrainedType.$hash($source.ConstrainedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.target));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.indexFlags));
        return $hash;
    }
    declare private readonly then?: never;
    static Target(t: {
        value: IndexType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
    }
}
export class IndexedAccessType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public objectType: tsonicTypeScriptRuntime.Location<Type> | undefined, public indexType: tsonicTypeScriptRuntime.Location<Type> | undefined, public accessFlags: AccessFlags) {
    }
    static $copy($source: IndexedAccessType): IndexedAccessType {
        return new IndexedAccessType(ConstrainedType.$copy($source.ConstrainedType), $source.objectType, $source.indexType, $source.accessFlags);
    }
    static $equal($left: IndexedAccessType, $right: IndexedAccessType): bool {
        return ConstrainedType.$equal($left.ConstrainedType, $right.ConstrainedType) &&
            tsonicTypeScriptRuntime.sameLocation($left.objectType, $right.objectType) &&
            tsonicTypeScriptRuntime.sameLocation($left.indexType, $right.indexType) && $left.accessFlags === $right.accessFlags;
    }
    static $hash($source: IndexedAccessType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ConstrainedType.$hash($source.ConstrainedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.objectType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.indexType));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.accessFlags));
        return $hash;
    }
    declare private readonly then?: never;
    static IndexType(t: {
        value: IndexedAccessType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType;
    }
    static ObjectType(t: {
        value: IndexedAccessType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType;
    }
}
export class TemplateLiteralType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public texts: RuntimeSlice<gostring>, public types: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
    }
    static $copy($source: TemplateLiteralType): TemplateLiteralType {
        return new TemplateLiteralType(ConstrainedType.$copy($source.ConstrainedType), $source.texts, $source.types);
    }
    declare private readonly then?: never;
    static Texts(t: {
        value: TemplateLiteralType;
    } | undefined): RuntimeSlice<gostring> {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.texts;
    }
}
export class StringMappingType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public target: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: StringMappingType): StringMappingType {
        return new StringMappingType(ConstrainedType.$copy($source.ConstrainedType), $source.target);
    }
    static $equal($left: StringMappingType, $right: StringMappingType): bool {
        return ConstrainedType.$equal($left.ConstrainedType, $right.ConstrainedType) &&
            tsonicTypeScriptRuntime.sameLocation($left.target, $right.target);
    }
    static $hash($source: StringMappingType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ConstrainedType.$hash($source.ConstrainedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.target));
        return $hash;
    }
    declare private readonly then?: never;
    static Target(t: {
        value: StringMappingType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
    }
}
export class SubstitutionType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public baseType: tsonicTypeScriptRuntime.Location<Type> | undefined, public constraint: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: SubstitutionType): SubstitutionType {
        return new SubstitutionType(ConstrainedType.$copy($source.ConstrainedType), $source.baseType, $source.constraint);
    }
    static $equal($left: SubstitutionType, $right: SubstitutionType): bool {
        return ConstrainedType.$equal($left.ConstrainedType, $right.ConstrainedType) &&
            tsonicTypeScriptRuntime.sameLocation($left.baseType, $right.baseType) &&
            tsonicTypeScriptRuntime.sameLocation($left.constraint, $right.constraint);
    }
    static $hash($source: SubstitutionType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ConstrainedType.$hash($source.ConstrainedType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.baseType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.constraint));
        return $hash;
    }
    declare private readonly then?: never;
    static BaseType(t: {
        value: SubstitutionType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType;
    }
    static SubstConstraint(t: {
        value: SubstitutionType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint;
    }
}
export class ConditionalRoot {
    declare private readonly $goType: void;
    public constructor(public node: {
        value: ConditionalTypeNode__from_ast;
    } | undefined, public checkType: tsonicTypeScriptRuntime.Location<Type> | undefined, public extendsType: tsonicTypeScriptRuntime.Location<Type> | undefined, public isDistributive: bool, public inferTypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public outerTypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public instantiations: GoMapValue<CacheHashKey, tsonicTypeScriptRuntime.Location<Type> | undefined>, public alias: {
        value: TypeAlias;
    } | undefined) {
    }
    static $copy($source: ConditionalRoot): ConditionalRoot {
        return new ConditionalRoot($source.node, $source.checkType, $source.extendsType, $source.isDistributive, $source.inferTypeParameters, $source.outerTypeParameters, $source.instantiations, $source.alias);
    }
    declare private readonly then?: never;
}
export class ConditionalType {
    declare private readonly $goType: void;
    public constructor(public ConstrainedType: ConstrainedType, public root: {
        value: ConditionalRoot;
    } | undefined, public checkType: tsonicTypeScriptRuntime.Location<Type> | undefined, public extendsType: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedTrueType: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedFalseType: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedInferredTrueType: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedDefaultConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined, public resolvedConstraintOfDistributive: tsonicTypeScriptRuntime.Location<Type> | undefined, public mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, public combinedMapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined) {
    }
    static $copy($source: ConditionalType): ConditionalType {
        return new ConditionalType(ConstrainedType.$copy($source.ConstrainedType), $source.root, $source.checkType, $source.extendsType, $source.resolvedTrueType, $source.resolvedFalseType, $source.resolvedInferredTrueType, $source.resolvedDefaultConstraint, $source.resolvedConstraintOfDistributive, $source.mapper, $source.combinedMapper);
    }
    static $equal($left: ConditionalType, $right: ConditionalType): bool {
        return ConstrainedType.$equal($left.ConstrainedType, $right.ConstrainedType) &&
            $left.root
                ===
                    $right.root &&
            tsonicTypeScriptRuntime.sameLocation($left.checkType, $right.checkType) &&
            tsonicTypeScriptRuntime.sameLocation($left.extendsType, $right.extendsType) &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedTrueType, $right.resolvedTrueType) &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedFalseType, $right.resolvedFalseType) &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedInferredTrueType, $right.resolvedInferredTrueType) &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedDefaultConstraint, $right.resolvedDefaultConstraint) &&
            tsonicTypeScriptRuntime.sameLocation($left.resolvedConstraintOfDistributive, $right.resolvedConstraintOfDistributive) &&
            tsonicTypeScriptRuntime.sameLocation($left.mapper, $right.mapper) &&
            tsonicTypeScriptRuntime.sameLocation($left.combinedMapper, $right.combinedMapper);
    }
    static $hash($source: ConditionalType): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ConstrainedType.$hash($source.ConstrainedType));
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.root));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.checkType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.extendsType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedTrueType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedFalseType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedInferredTrueType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedDefaultConstraint));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolvedConstraintOfDistributive));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.mapper));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.combinedMapper));
        return $hash;
    }
    declare private readonly then?: never;
    static CheckType(t: {
        value: ConditionalType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType;
    }
    static ExtendsType(t: {
        value: ConditionalType;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType;
    }
}
export type SignatureFlags = uint32;
export function SignatureFlagsNone$constant(): SignatureFlags {
    return 0;
}
export function SignatureFlagsHasRestParameter$constant(): SignatureFlags {
    return 1;
}
export function SignatureFlagsHasLiteralTypes$constant(): SignatureFlags {
    return 2;
}
export function SignatureFlagsConstruct$constant(): SignatureFlags {
    return 4;
}
export function SignatureFlagsAbstract$constant(): SignatureFlags {
    return 8;
}
export function SignatureFlagsIsInnerCallChain$constant(): SignatureFlags {
    return 16;
}
export function SignatureFlagsIsOuterCallChain$constant(): SignatureFlags {
    return 32;
}
export function SignatureFlagsIsUntypedSignatureInJSFile$constant(): SignatureFlags {
    return 64;
}
export function SignatureFlagsIsNonInferrable$constant(): SignatureFlags {
    return 128;
}
export function SignatureFlagsIsSignatureCandidateForOverloadFailure$constant(): SignatureFlags {
    return 256;
}
export function SignatureFlagsPropagatingFlags$constant(): SignatureFlags {
    return 335;
}
export function SignatureFlagsCallChainFlags$constant(): SignatureFlags {
    return 48;
}
export type Signature$Storage = {
    flags: uint32;
    minArgumentCount: int32;
    resolvedMinArgumentCount: int32;
    declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    typeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>;
    parameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>;
    thisParameter: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    resolvedReturnType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    resolvedTypePredicate: {
        value: TypePredicate;
    } | undefined;
    target: tsonicTypeScriptRuntime.Location<Signature> | undefined;
    mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined;
    isolatedSignatureType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    composite: {
        value: CompositeSignature;
    } | undefined;
};
export class Signature implements GoContainerStoredValue<Signature$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Signature$Storage) {
    }
    public static $storageOf($source: Signature): Signature$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Signature$Storage): Signature {
        return new Signature($source);
    }
    public get flags(): SignatureFlags {
        return this.$storage.flags;
    }
    public set flags($value: SignatureFlags) {
        this.$storage.flags = $value;
    }
    public get minArgumentCount(): int32 {
        return this.$storage.minArgumentCount;
    }
    public set minArgumentCount($value: int32) {
        this.$storage.minArgumentCount = $value;
    }
    public get resolvedMinArgumentCount(): int32 {
        return this.$storage.resolvedMinArgumentCount;
    }
    public set resolvedMinArgumentCount($value: int32) {
        this.$storage.resolvedMinArgumentCount = $value;
    }
    public get declaration(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.declaration;
    }
    public set declaration($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.declaration = $value;
    }
    public get typeParameters(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return this.$storage.typeParameters;
    }
    public set typeParameters($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>) {
        this.$storage.typeParameters = $value;
    }
    public get parameters(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        return this.$storage.parameters;
    }
    public set parameters($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>) {
        this.$storage.parameters = $value;
    }
    public get thisParameter(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.thisParameter;
    }
    public set thisParameter($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.thisParameter = $value;
    }
    public get resolvedReturnType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.resolvedReturnType;
    }
    public set resolvedReturnType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.resolvedReturnType = $value;
    }
    public get resolvedTypePredicate(): {
        value: TypePredicate;
    } | undefined {
        return this.$storage.resolvedTypePredicate;
    }
    public set resolvedTypePredicate($value: {
        value: TypePredicate;
    } | undefined) {
        this.$storage.resolvedTypePredicate = $value;
    }
    public get target(): tsonicTypeScriptRuntime.Location<Signature> | undefined {
        return this.$storage.target;
    }
    public set target($value: tsonicTypeScriptRuntime.Location<Signature> | undefined) {
        this.$storage.target = $value;
    }
    public get mapper(): tsonicTypeScriptRuntime.Location<TypeMapper> | undefined {
        return this.$storage.mapper;
    }
    public set mapper($value: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined) {
        this.$storage.mapper = $value;
    }
    public get isolatedSignatureType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.isolatedSignatureType;
    }
    public set isolatedSignatureType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.isolatedSignatureType = $value;
    }
    public get composite(): {
        value: CompositeSignature;
    } | undefined {
        return this.$storage.composite;
    }
    public set composite($value: {
        value: CompositeSignature;
    } | undefined) {
        this.$storage.composite = $value;
    }
    declare readonly [$goContainerStorageType]: Signature$Storage;
    static $zero(): Signature {
        return new Signature({
            flags: 0,
            minArgumentCount: 0,
            resolvedMinArgumentCount: 0,
            declaration: void 0,
            typeParameters: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(),
            parameters: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(),
            thisParameter: void 0,
            resolvedReturnType: void 0,
            resolvedTypePredicate: void 0,
            target: void 0,
            mapper: void 0,
            isolatedSignatureType: void 0,
            composite: void 0
        });
    }
    static $copy($source: Signature): Signature {
        return new Signature({
            flags: $source.$storage.flags,
            minArgumentCount: $source.$storage.minArgumentCount,
            resolvedMinArgumentCount: $source.$storage.resolvedMinArgumentCount,
            declaration: $source.$storage.declaration,
            typeParameters: $source.$storage.typeParameters,
            parameters: $source.$storage.parameters,
            thisParameter: $source.$storage.thisParameter,
            resolvedReturnType: $source.$storage.resolvedReturnType,
            resolvedTypePredicate: $source.$storage.resolvedTypePredicate,
            target: $source.$storage.target,
            mapper: $source.$storage.mapper,
            isolatedSignatureType: $source.$storage.isolatedSignatureType,
            composite: $source.$storage.composite
        });
    }
    declare private readonly then?: never;
    static Declaration(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration;
    }
    static Flags(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): SignatureFlags {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags;
    }
    static HasRestParameter(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): bool {
        return !((Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsHasRestParameter$constant()) >>> 0 === 0);
    }
    static MinArgumentCount(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): int {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).minArgumentCount;
    }
    static Parameters(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters;
    }
    static Target(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): tsonicTypeScriptRuntime.Location<Signature> | undefined {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).target;
    }
    static ThisParameter(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter;
    }
    static TypeParameters(s: tsonicTypeScriptRuntime.Location<Signature> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        return Signature.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters;
    }
}
export class CompositeSignature {
    declare private readonly $goType: void;
    public constructor(public isUnion: bool, public signatures: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature> | undefined>) {
    }
    static $copy($source: CompositeSignature): CompositeSignature {
        return new CompositeSignature($source.isUnion, $source.signatures);
    }
    declare private readonly then?: never;
}
export type TypePredicateKind = int32;
export function TypePredicateKindThis$constant(): TypePredicateKind {
    return 0;
}
export function TypePredicateKindIdentifier$constant(): TypePredicateKind {
    return 1;
}
export function TypePredicateKindAssertsThis$constant(): TypePredicateKind {
    return 2;
}
export function TypePredicateKindAssertsIdentifier$constant(): TypePredicateKind {
    return 3;
}
export class TypePredicate {
    declare private readonly $goType: void;
    public constructor(public kind: TypePredicateKind, public parameterIndex: int32, public parameterName: gostring, public t: tsonicTypeScriptRuntime.Location<Type> | undefined) {
    }
    static $copy($source: TypePredicate): TypePredicate {
        return new TypePredicate($source.kind, $source.parameterIndex, $source.parameterName, $source.t);
    }
    static $equal($left: TypePredicate, $right: TypePredicate): bool {
        return $left.kind === $right.kind && $left.parameterIndex === $right.parameterIndex && $left.parameterName === $right.parameterName &&
            tsonicTypeScriptRuntime.sameLocation($left.t, $right.t);
    }
    static $hash($source: TypePredicate): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.parameterIndex));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.parameterName));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.t));
        return $hash;
    }
    declare private readonly then?: never;
    static Kind(typePredicate: {
        value: TypePredicate;
    } | undefined): TypePredicateKind {
        return (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind;
    }
    static ParameterIndex(typePredicate: {
        value: TypePredicate;
    } | undefined): int32 {
        return (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parameterIndex;
    }
    static ParameterName(typePredicate: {
        value: TypePredicate;
    } | undefined): gostring {
        return (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parameterName;
    }
    static Type(typePredicate: {
        value: TypePredicate;
    } | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t;
    }
}
export type IndexInfo$Storage = {
    keyType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    valueType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    isReadonly: bool;
    declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    indexSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    components: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
};
export class IndexInfo implements GoContainerStoredValue<IndexInfo$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: IndexInfo$Storage) {
    }
    public static $storageOf($source: IndexInfo): IndexInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: IndexInfo$Storage): IndexInfo {
        return new IndexInfo($source);
    }
    public get keyType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.keyType;
    }
    public set keyType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.keyType = $value;
    }
    public get valueType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.valueType;
    }
    public set valueType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.valueType = $value;
    }
    public get isReadonly(): bool {
        return this.$storage.isReadonly;
    }
    public set isReadonly($value: bool) {
        this.$storage.isReadonly = $value;
    }
    public get declaration(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.declaration;
    }
    public set declaration($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.declaration = $value;
    }
    public get indexSymbol(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.indexSymbol;
    }
    public set indexSymbol($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.indexSymbol = $value;
    }
    public get components(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.components;
    }
    public set components($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.components = $value;
    }
    declare readonly [$goContainerStorageType]: IndexInfo$Storage;
    static $zero(): IndexInfo {
        return new IndexInfo({
            keyType: void 0,
            valueType: void 0,
            isReadonly: false,
            declaration: void 0,
            indexSymbol: void 0,
            components: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()
        });
    }
    static $copy($source: IndexInfo): IndexInfo {
        return new IndexInfo({
            keyType: $source.$storage.keyType,
            valueType: $source.$storage.valueType,
            isReadonly: $source.$storage.isReadonly,
            declaration: $source.$storage.declaration,
            indexSymbol: $source.$storage.indexSymbol,
            components: $source.$storage.components
        });
    }
    declare private readonly then?: never;
    static Declaration(info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).declaration;
    }
    static IsReadonly(info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined): bool {
        return IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).isReadonly;
    }
    static KeyType(info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType;
    }
    static ValueType(info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType;
    }
}
export type Ternary = int8;
export function TernaryFalse$constant(): Ternary {
    return 0;
}
export function TernaryUnknown$constant(): Ternary {
    return 1;
}
export function TernaryMaybe$constant(): Ternary {
    return 3;
}
export function TernaryTrue$constant(): Ternary {
    return -1;
}
export class TypeComparer {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Type> | undefined, $1: tsonicTypeScriptRuntime.Location<Type> | undefined, $2: bool) => Ternary) | undefined) {
    }
    declare private readonly then?: never;
}
export type LanguageFeatureMinimumTargetMap$Storage = {
    Exponentiation: int32;
    AsyncFunctions: int32;
    ForAwaitOf: int32;
    AsyncGenerators: int32;
    AsyncIteration: int32;
    ObjectSpreadRest: int32;
    RegularExpressionFlagsDotAll: int32;
    BindinglessCatch: int32;
    BigInt: int32;
    NullishCoalesce: int32;
    OptionalChaining: int32;
    LogicalAssignment: int32;
    TopLevelAwait: int32;
    ClassFields: int32;
    PrivateNamesAndClassStaticBlocks: int32;
    RegularExpressionFlagsHasIndices: int32;
    ShebangComments: int32;
    UsingAndAwaitUsing: int32;
    ClassAndClassElementDecorators: int32;
    RegularExpressionFlagsUnicodeSets: int32;
};
export class LanguageFeatureMinimumTargetMap {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: LanguageFeatureMinimumTargetMap$Storage) {
    }
    public static $storageOf($source: LanguageFeatureMinimumTargetMap): LanguageFeatureMinimumTargetMap$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: LanguageFeatureMinimumTargetMap$Storage): LanguageFeatureMinimumTargetMap {
        return new LanguageFeatureMinimumTargetMap($source);
    }
    public get Exponentiation(): ScriptTarget__from_core {
        return this.$storage.Exponentiation;
    }
    public set Exponentiation($value: ScriptTarget__from_core) {
        this.$storage.Exponentiation = $value;
    }
    public get AsyncFunctions(): ScriptTarget__from_core {
        return this.$storage.AsyncFunctions;
    }
    public set AsyncFunctions($value: ScriptTarget__from_core) {
        this.$storage.AsyncFunctions = $value;
    }
    public get ForAwaitOf(): ScriptTarget__from_core {
        return this.$storage.ForAwaitOf;
    }
    public set ForAwaitOf($value: ScriptTarget__from_core) {
        this.$storage.ForAwaitOf = $value;
    }
    public get AsyncGenerators(): ScriptTarget__from_core {
        return this.$storage.AsyncGenerators;
    }
    public set AsyncGenerators($value: ScriptTarget__from_core) {
        this.$storage.AsyncGenerators = $value;
    }
    public get AsyncIteration(): ScriptTarget__from_core {
        return this.$storage.AsyncIteration;
    }
    public set AsyncIteration($value: ScriptTarget__from_core) {
        this.$storage.AsyncIteration = $value;
    }
    public get ObjectSpreadRest(): ScriptTarget__from_core {
        return this.$storage.ObjectSpreadRest;
    }
    public set ObjectSpreadRest($value: ScriptTarget__from_core) {
        this.$storage.ObjectSpreadRest = $value;
    }
    public get RegularExpressionFlagsDotAll(): ScriptTarget__from_core {
        return this.$storage.RegularExpressionFlagsDotAll;
    }
    public set RegularExpressionFlagsDotAll($value: ScriptTarget__from_core) {
        this.$storage.RegularExpressionFlagsDotAll = $value;
    }
    public get BindinglessCatch(): ScriptTarget__from_core {
        return this.$storage.BindinglessCatch;
    }
    public set BindinglessCatch($value: ScriptTarget__from_core) {
        this.$storage.BindinglessCatch = $value;
    }
    public get BigInt(): ScriptTarget__from_core {
        return this.$storage.BigInt;
    }
    public set BigInt($value: ScriptTarget__from_core) {
        this.$storage.BigInt = $value;
    }
    public get NullishCoalesce(): ScriptTarget__from_core {
        return this.$storage.NullishCoalesce;
    }
    public set NullishCoalesce($value: ScriptTarget__from_core) {
        this.$storage.NullishCoalesce = $value;
    }
    public get OptionalChaining(): ScriptTarget__from_core {
        return this.$storage.OptionalChaining;
    }
    public set OptionalChaining($value: ScriptTarget__from_core) {
        this.$storage.OptionalChaining = $value;
    }
    public get LogicalAssignment(): ScriptTarget__from_core {
        return this.$storage.LogicalAssignment;
    }
    public set LogicalAssignment($value: ScriptTarget__from_core) {
        this.$storage.LogicalAssignment = $value;
    }
    public get TopLevelAwait(): ScriptTarget__from_core {
        return this.$storage.TopLevelAwait;
    }
    public set TopLevelAwait($value: ScriptTarget__from_core) {
        this.$storage.TopLevelAwait = $value;
    }
    public get ClassFields(): ScriptTarget__from_core {
        return this.$storage.ClassFields;
    }
    public set ClassFields($value: ScriptTarget__from_core) {
        this.$storage.ClassFields = $value;
    }
    public get PrivateNamesAndClassStaticBlocks(): ScriptTarget__from_core {
        return this.$storage.PrivateNamesAndClassStaticBlocks;
    }
    public set PrivateNamesAndClassStaticBlocks($value: ScriptTarget__from_core) {
        this.$storage.PrivateNamesAndClassStaticBlocks = $value;
    }
    public get RegularExpressionFlagsHasIndices(): ScriptTarget__from_core {
        return this.$storage.RegularExpressionFlagsHasIndices;
    }
    public set RegularExpressionFlagsHasIndices($value: ScriptTarget__from_core) {
        this.$storage.RegularExpressionFlagsHasIndices = $value;
    }
    public get ShebangComments(): ScriptTarget__from_core {
        return this.$storage.ShebangComments;
    }
    public set ShebangComments($value: ScriptTarget__from_core) {
        this.$storage.ShebangComments = $value;
    }
    public get UsingAndAwaitUsing(): ScriptTarget__from_core {
        return this.$storage.UsingAndAwaitUsing;
    }
    public set UsingAndAwaitUsing($value: ScriptTarget__from_core) {
        this.$storage.UsingAndAwaitUsing = $value;
    }
    public get ClassAndClassElementDecorators(): ScriptTarget__from_core {
        return this.$storage.ClassAndClassElementDecorators;
    }
    public set ClassAndClassElementDecorators($value: ScriptTarget__from_core) {
        this.$storage.ClassAndClassElementDecorators = $value;
    }
    public get RegularExpressionFlagsUnicodeSets(): ScriptTarget__from_core {
        return this.$storage.RegularExpressionFlagsUnicodeSets;
    }
    public set RegularExpressionFlagsUnicodeSets($value: ScriptTarget__from_core) {
        this.$storage.RegularExpressionFlagsUnicodeSets = $value;
    }
    static $zero(): LanguageFeatureMinimumTargetMap {
        return new LanguageFeatureMinimumTargetMap({
            Exponentiation: 0,
            AsyncFunctions: 0,
            ForAwaitOf: 0,
            AsyncGenerators: 0,
            AsyncIteration: 0,
            ObjectSpreadRest: 0,
            RegularExpressionFlagsDotAll: 0,
            BindinglessCatch: 0,
            BigInt: 0,
            NullishCoalesce: 0,
            OptionalChaining: 0,
            LogicalAssignment: 0,
            TopLevelAwait: 0,
            ClassFields: 0,
            PrivateNamesAndClassStaticBlocks: 0,
            RegularExpressionFlagsHasIndices: 0,
            ShebangComments: 0,
            UsingAndAwaitUsing: 0,
            ClassAndClassElementDecorators: 0,
            RegularExpressionFlagsUnicodeSets: 0
        });
    }
    declare private readonly then?: never;
}
