import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ConditionalTypeNode as ConditionalTypeNode__from_ast, MappedTypeNode as MappedTypeNode__from_ast, ModifierFlags as ModifierFlags__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LinkStore as LinkStore__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CacheHashKey$Storage as CacheHashKey__from_checker$Storage, InferenceContext } from "./checker.js";
import type { TypeMapper } from "./mapper.js";
import type { ConditionalRoot, ConditionalType, IndexType, IndexedAccessType, LiteralType, MappedType, SignatureKind, StringMappingType, SubstitutionType, TemplateLiteralType, Ternary, TupleType, TypeAlias, TypeAliasLinks$Storage as TypeAliasLinks__from_checker$Storage, TypeParameter, TypeReference, UnionType, VarianceFlags } from "./types.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { CheckFlagsPartial$constant as CheckFlagsPartial$constant__from_ast, Diagnostic as Diagnostic__from_ast, FindAncestor as FindAncestor__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInJSFile as IsInJSFile__from_ast, IsJsxAttribute as IsJsxAttribute__from_ast, IsJsxAttributes as IsJsxAttributes__from_ast, IsJsxOpeningLikeElement as IsJsxOpeningLikeElement__from_ast, IsObjectLiteralElement as IsObjectLiteralElement__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, ModifierFlagsNonPublicAccessibilityModifier$constant as ModifierFlagsNonPublicAccessibilityModifier$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierFlagsProtected$constant as ModifierFlagsProtected$constant__from_ast, NewDiagnosticChain as NewDiagnosticChain__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsClassMember$constant as SymbolFlagsClassMember$constant__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, SymbolFlagsPrototype$constant as SymbolFlagsPrototype$constant__from_ast, Symbol as Symbol__from_ast, TypeNodeBase as TypeNodeBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetSymbolNameForPrivateIdentifier as GetSymbolNameForPrivateIdentifier__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/state.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { PhaseCheckTypes$constant as PhaseCheckTypes$constant__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { asRecursionId$PointerTo_Named_ast$Node, asRecursionId$PointerTo_Named_ast$Symbol, asRecursionId$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/checker/asRecursionId.js";
import { Set$Add$Named_checker$CacheHashKey, Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Len$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { AppendIfUnique$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/AppendIfUnique.js";
import { Every$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Find$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { IfElse$Named_checker$AccessFlags, IfElse$Named_checker$TypeFlags, IfElse$PointerTo_Named_checker$Type, IfElse$PointerTo_Named_checker$TypeMapper, IfElse$PointerTo_Named_diagnostics$Message, IfElse$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$TypeAliasLinks } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LinkStore$Get.js";
import { Map$PointerTo_Named_ast$Symbol$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { OrElse$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/OrElse.js";
import { Same$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Same.js";
import { SameMap$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/SameMap.js";
import { Some$Named_checker$VarianceFlags, Some$PointerTo_Named_checker$IndexInfo, Some$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Clip$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/slices/Clip.js";
import { Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { Equal$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { $goInterfaceAdapter$Named_checker$TypeId, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$checker$len$void_to_int, $goInterfaceMethod$checker$matches$int_PointerTo_Named_checker$Type_to_bool, $goInterfaceMethod$checker$name$int_to_string } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_checker$CacheHashKey_To_Named_checker$RelationComparisonResult as GoMap } from "../../../../../../support/maps.js";
import { CacheHashKey, Checker, InferenceFlagsNone$constant, MappedTypeModifiersExcludeOptional$constant, MappedTypeModifiersIncludeOptional$constant, TypeFactsNEUndefined$constant, containsType, countTypes, createDiagnosticForNode, everyType, getEndElementCount, getMappedTypeModifiers, getRelationKey, getStartElementCount, isConflictingPrivateProperty, isLiteralType, isMutableTupleType, isPartialMappedType, isSingleElementGenericTupleType, isTupleType, isUnitType, someType } from "./checker.js";
import { newSimpleTypeMapper } from "./mapper.js";
import { Tracer } from "./tracer.js";
import { AccessFlagsNoIndexSignatures$constant, AccessFlagsWriting$constant, ElementFlagsNonRest$constant, ElementFlagsNone$constant, ElementFlagsOptional$constant, ElementFlagsRequired$constant, ElementFlagsRest$constant, ElementFlagsVariable$constant, ElementFlagsVariadic$constant, IndexFlagsNoIndexSignatures$constant, IndexFlagsNoReducibleCheck$constant, IndexInfo, ObjectFlagsAnonymous$constant, ObjectFlagsFreshLiteral$constant, ObjectFlagsFromTypeNode$uint32, ObjectFlagsInstantiated$constant, ObjectFlagsIsNeverIntersection$uint32, ObjectFlagsJSLiteral$constant, ObjectFlagsJsxAttributes$constant, ObjectFlagsMapped$constant, ObjectFlagsNonInferrableType$constant, ObjectFlagsObjectLiteralPatternWithComputedProperties$constant, ObjectFlagsPrimitiveUnion$constant, ObjectFlagsReference$constant, Signature, SignatureFlagsAbstract$constant, SignatureKindCall$constant, SignatureKindConstruct$constant, TernaryFalse$constant, TernaryMaybe$constant, TernaryTrue$constant, TernaryUnknown$constant, TupleElementInfo, Type, TypeAliasLinks, TypeComparer, TypeFlagsAny$constant, TypeFlagsAnyOrUnknown$constant, TypeFlagsBigIntLiteral$constant, TypeFlagsConditional$constant, TypeFlagsDefinitelyNonNullable$constant, TypeFlagsEnumLiteral$constant, TypeFlagsIndex$constant, TypeFlagsIndexedAccess$constant, TypeFlagsInstantiable$constant, TypeFlagsIntersection$constant, TypeFlagsNever$constant, TypeFlagsNonPrimitive$constant, TypeFlagsNullable$constant, TypeFlagsNumberLiteral$constant, TypeFlagsObject$constant, TypeFlagsPrimitive$constant, TypeFlagsSingleton$constant, TypeFlagsStringLiteral$constant, TypeFlagsStringMapping$constant, TypeFlagsStringOrNumberLiteralOrUnique$constant, TypeFlagsStructuredOrInstantiable$constant, TypeFlagsStructuredType$constant, TypeFlagsSubstitution$constant, TypeFlagsTemplateLiteral$constant, TypeFlagsTypeParameter$constant, TypeFlagsTypeVariable$constant, TypeFlagsUndefined$constant, TypeFlagsUnion$constant, TypeFlagsUnionOrIntersection$constant, TypeFormatFlagsNoTypeReduction$constant, VarianceFlagsAllowsStructuralFallback$constant, VarianceFlagsBivariant$constant, VarianceFlagsContravariant$constant, VarianceFlagsCovariant$constant, VarianceFlagsIndependent$constant, VarianceFlagsInvariant$constant, VarianceFlagsUnmeasurable$constant, VarianceFlagsUnreliable$constant, VarianceFlagsVarianceMask$constant } from "./types.js";
import { NewDiagnosticForNode, getDeclarationModifierFlagsFromSymbol, isNumericLiteralName, isObjectLiteralType, isObjectOrArrayLiteralType } from "./utilities.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerDivide, goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export type SignatureCheckMode = uint32;
export function SignatureCheckModeNone$constant(): SignatureCheckMode {
    return 0;
}
export function SignatureCheckModeBivariantCallback$constant(): SignatureCheckMode {
    return 1;
}
export function SignatureCheckModeStrictCallback$constant(): SignatureCheckMode {
    return 2;
}
export function SignatureCheckModeIgnoreReturnTypes$constant(): SignatureCheckMode {
    return 4;
}
export function SignatureCheckModeStrictArity$constant(): SignatureCheckMode {
    return 8;
}
export function SignatureCheckModeStrictTopSignature$constant(): SignatureCheckMode {
    return 16;
}
export function SignatureCheckModeCallback$constant(): SignatureCheckMode {
    return 3;
}
export type MinArgumentCountFlags = uint32;
export function MinArgumentCountFlagsNone$constant(): MinArgumentCountFlags {
    return 0;
}
export function MinArgumentCountFlagsStrongArityForUntypedJS$constant(): MinArgumentCountFlags {
    return 1;
}
export function MinArgumentCountFlagsVoidIsNonOptional$constant(): MinArgumentCountFlags {
    return 2;
}
export type IntersectionState = uint32;
export function IntersectionStateNone$constant(): IntersectionState {
    return 0;
}
export function IntersectionStateSource$constant(): IntersectionState {
    return 1;
}
export function IntersectionStateTarget$constant(): IntersectionState {
    return 2;
}
export type RecursionFlags = uint32;
export function RecursionFlagsSource$constant(): RecursionFlags {
    return 1;
}
export function RecursionFlagsTarget$constant(): RecursionFlags {
    return 2;
}
export function RecursionFlagsBoth$constant(): RecursionFlags {
    return 3;
}
export type ExpandingFlags = uint8;
export function ExpandingFlagsSource$constant(): ExpandingFlags {
    return 1;
}
export function ExpandingFlagsTarget$constant(): ExpandingFlags {
    return 2;
}
export function ExpandingFlagsBoth$constant(): ExpandingFlags {
    return 3;
}
export type RelationComparisonResult = uint32;
export function RelationComparisonResultNone$constant(): RelationComparisonResult {
    return 0;
}
export function RelationComparisonResultSucceeded$constant(): RelationComparisonResult {
    return 1;
}
export function RelationComparisonResultFailed$constant(): RelationComparisonResult {
    return 2;
}
export function RelationComparisonResultReportsUnmeasurable$constant(): RelationComparisonResult {
    return 8;
}
export function RelationComparisonResultReportsUnreliable$constant(): RelationComparisonResult {
    return 16;
}
export function RelationComparisonResultComplexityOverflow$constant(): RelationComparisonResult {
    return 32;
}
export function RelationComparisonResultStackDepthOverflow$constant(): RelationComparisonResult {
    return 64;
}
export function RelationComparisonResultOverflow$constant(): RelationComparisonResult {
    return 96;
}
export class ErrorReporter {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined) {
    }
    declare private readonly then?: never;
}
export type RecursionId$Storage = {
    value: GoInterface | undefined;
};
export class RecursionId implements GoContainerStoredValue<RecursionId$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: RecursionId$Storage) {
    }
    public static $storageOf($source: RecursionId): RecursionId$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: RecursionId$Storage): RecursionId {
        return new RecursionId($source);
    }
    public get value(): GoInterface | undefined {
        return this.$storage.value;
    }
    public set value($value: GoInterface | undefined) {
        this.$storage.value = $value;
    }
    declare readonly [$goContainerStorageType]: RecursionId$Storage;
    static $copy($source: RecursionId): RecursionId {
        return new RecursionId({
            value: $source.$storage.value
        });
    }
    static $equal($left: RecursionId, $right: RecursionId): bool {
        return goInterfaceEqual($left.$storage.value, $right.$storage.value);
    }
    static $zeroStorage(): RecursionId$Storage {
        return {
            value: void 0
        };
    }
    declare private readonly then?: never;
}
export function asRecursionId$kernel<T>($go$interface_adapt$T0_to_Interface_void: ($0: T) => GoInterface | undefined, value: T): RecursionId {
    return RecursionId.$fromStorage({
        value: $go$interface_adapt$T0_to_Interface_void(value)
    });
}
export class Relation {
    declare private readonly $goType: void;
    public constructor(public results: GoMapValue<CacheHashKey, RelationComparisonResult>) {
    }
    static $copy($source: Relation): Relation {
        return new Relation($source.results);
    }
    declare private readonly then?: never;
    static $go$private$checker$get(r: {
        value: Relation;
    } | undefined, key: CacheHashKey): RelationComparisonResult {
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.results.lookup(key);
    }
    static $go$private$checker$set(r: {
        value: Relation;
    } | undefined, key: CacheHashKey, result: RelationComparisonResult): void {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.results.isNil()) {
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.results = GoMap.make(0, []);
        }
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.results.store(key, result);
    }
    static $go$private$checker$size(r: {
        value: Relation;
    } | undefined): int {
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.results.length();
    }
}
export function createDiagnosticChainFromErrorChain(chain: {
    value: ErrorChain;
} | undefined, errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, relatedInfo: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    for (; !(chain === undefined) && Message__from_diagnostics.ElidedInCompatibilityPyramid((chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message);) {
        chain = (chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
    }
    if (chain === undefined) {
        return void 0;
    }
    let next: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticChainFromErrorChain((chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next, errorNode, relatedInfo);
    if (next === undefined) {
        return Diagnostic__from_ast.SetRelatedInfo(NewDiagnosticForNode(errorNode, (chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message, (chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.args), relatedInfo);
    }
    return NewDiagnosticChain__from_ast(next, (chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message, (chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.args);
}
export function isHyphenatedJsxName(name: gostring): bool {
    return strings__from_gostdlib.Contains(name, "-");
}
export function isExcessPropertyCheckTarget(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsObjectLiteralPatternWithComputedProperties$constant()) >>> 0 === 0 || !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNonPrimitive$constant()) >>> 0 === 0) || !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSubstitution$constant()) >>> 0 === 0) && isExcessPropertyCheckTarget((Type.AsSubstitutionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType) || !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && Some$PointerTo_Named_checker$Type(Type.Types(t), isExcessPropertyCheckTarget) || !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) && Every$PointerTo_Named_checker$Type(Type.Types(t), isExcessPropertyCheckTarget);
}
export function getRecursionIdentity(t: tsonicTypeScriptRuntime.Location<Type> | undefined): RecursionId {
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !isObjectOrArrayLiteralType(t)) {
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) && !(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node === undefined)) {
            return asRecursionId$PointerTo_Named_ast$Node(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node);
        }
        if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !(!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsAnonymous$constant()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) && (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsFromTypeNode$uint32) >>> 0 === 0) {
            return asRecursionId$PointerTo_Named_ast$Symbol(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
        }
        if (isTupleType(t) && (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsFromTypeNode$uint32) >>> 0 === 0) {
            return asRecursionId$PointerTo_Named_checker$Type(Type.Target(t));
        }
    }
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && !(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined)) {
        return asRecursionId$PointerTo_Named_ast$Symbol(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
    }
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0)) {
        t = (Type.AsIndexedAccessType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType;
        for (; !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0);) {
            t = (Type.AsIndexedAccessType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType;
        }
        return asRecursionId$PointerTo_Named_checker$Type(t);
    }
    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
        const __gotots_store_0 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((((Type.AsConditionalType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
        const __gotots_argument_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return asRecursionId$PointerTo_Named_ast$Node(__gotots_argument_0);
    }
    return asRecursionId$PointerTo_Named_checker$Type(t);
}
export function excludeProperties(properties: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, excludedProperties: Set__from_collections<gostring>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    const excludedProperties$location = tsonicTypeScriptRuntime.boundLocation({}, () => excludedProperties, excludedProperties$next => excludedProperties = excludedProperties$next);
    if (Set$Len$string(excludedProperties$location) === 0 || properties.length === 0) {
        return properties;
    }
    let reduced = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    let excluded = false;
    const __gotots_range_23 = properties;
    for (let __gotots_range_index_23 = 0; __gotots_range_index_23 < __gotots_range_23.length; __gotots_range_index_23++) {
        const __gotots_range_value_28 = __gotots_range_index_23;
        const __gotots_range_value_29 = __gotots_range_23.get(__gotots_range_index_23);
        let i = __gotots_range_value_28;
        let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_29;
        if (!Set__from_collections.Has<gostring>(excludedProperties$location, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name)) {
            if (excluded) {
                reduced = reduced.append(void 0, [prop]);
            }
        }
        else if (!excluded) {
            reduced = Clip$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol(properties.slice(0, i, null));
            excluded = true;
        }
    }
    if (excluded) {
        return reduced;
    }
    return properties;
}
export class TypeDiscriminator {
    declare private readonly $goType: void;
    public constructor(public c: {
        value: Checker;
    } | undefined, public props: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public isRelatedTo: (($0: tsonicTypeScriptRuntime.Location<Type> | undefined, $1: tsonicTypeScriptRuntime.Location<Type> | undefined) => Ternary) | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$checker$len(d: TypeDiscriminator | undefined): int {
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).props.length;
    }
    static $go$private$checker$matches(d: TypeDiscriminator | undefined, index: int, t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        let propType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).c, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).props.get(index));
        const __gotots_range_29 = Type.Distributed(propType);
        for (let __gotots_range_index_29 = 0; __gotots_range_index_29 < __gotots_range_29.length; __gotots_range_index_29++) {
            const __gotots_range_value_35 = __gotots_range_29.get(__gotots_range_index_29);
            let s: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_35;
            const __gotots_callee_4 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isRelatedTo;
            const __gotots_argument_74 = s;
            const __gotots_argument_75 = t;
            if (!((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_74, __gotots_argument_75) === TernaryFalse$constant())) {
                return true;
            }
        }
        return false;
    }
    static $go$private$checker$name(d: TypeDiscriminator | undefined, index: int): gostring {
        return Symbol__from_ast.$storageOf((((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).props.get(index) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
    }
}
export function isObjectOrInstantiableNonPrimitive(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (119013376)) >>> 0 === 0);
}
export interface Discriminator extends GoInterfaceValue {
    $go$private$checker$len(): int;
    $go$private$checker$matches($argument0: int, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): bool;
    $go$private$checker$name($argument0: int): gostring;
}
export const Discriminator$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$checker$len$void_to_int, $goInterfaceMethod$checker$matches$int_PointerTo_Named_checker$Type_to_bool, $goInterfaceMethod$checker$name$int_to_string]);
export function Discriminator$is(value: GoInterfaceValue | undefined): value is Discriminator {
    return value !== undefined && value.$go$implements(Discriminator$contract);
}
export function isNonPrimitiveType(t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0;
}
export function visibilityToString(flags: ModifierFlags__from_ast): gostring {
    if (flags === ModifierFlagsPrivate$constant__from_ast()) {
        return "private";
    }
    if (flags === ModifierFlagsProtected$constant__from_ast()) {
        return "protected";
    }
    return "public";
}
export class errorState {
    declare private readonly $goType: void;
    public constructor(public errorChain: {
        value: ErrorChain;
    } | undefined, public relatedInfo: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) {
    }
    static $copy($source: errorState): errorState {
        return new errorState($source.errorChain, $source.relatedInfo);
    }
    declare private readonly then?: never;
}
export class ErrorChain {
    declare private readonly $goType: void;
    public constructor(public next: {
        value: ErrorChain;
    } | undefined, public message: {
        value: Message__from_diagnostics;
    } | undefined, public args: RuntimeSlice<GoInterface | undefined>) {
    }
    static $copy($source: ErrorChain): ErrorChain {
        return new ErrorChain($source.next, $source.message, $source.args);
    }
    declare private readonly then?: never;
}
export class Relater {
    declare private readonly $goType: void;
    public constructor(public c: {
        value: Checker;
    } | undefined, public relation: {
        value: Relation;
    } | undefined, public errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public errorChain: {
        value: ErrorChain;
    } | undefined, public relatedInfo: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public maybeKeys: RuntimeSlice<CacheHashKey__from_checker$Storage>, public maybeKeysSet: Set__from_collections<CacheHashKey>, public sourceStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public targetStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public maybeCount: int, public sourceDepth: int, public targetDepth: int, public expandingFlags: ExpandingFlags, public overflow: bool, public relationCount: int, public next: {
        value: Relater;
    } | undefined) {
    }
    static $copy($source: Relater): Relater {
        return new Relater($source.c, $source.relation, $source.errorNode, $source.errorChain, $source.relatedInfo, $source.maybeKeys, Set__from_collections.$copy<CacheHashKey>($source.maybeKeysSet), $source.sourceStack, $source.targetStack, $source.maybeCount, $source.sourceDepth, $source.targetDepth, $source.expandingFlags, $source.overflow, $source.relationCount, $source.next);
    }
    declare private readonly then?: never;
    static $go$private$checker$chainArgsMatch(r: {
        value: Relater;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): bool {
        const __gotots_range_1 = args;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_1;
            let a: GoInterface | undefined = __gotots_range_value_2;
            if (!(a === undefined) && !goInterfaceEqual(a, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.args.get(i))) {
                return false;
            }
        }
        return true;
    }
    static $go$private$checker$constructorVisibilitiesAreCompatible(r: {
        value: Relater;
    } | undefined, sourceSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined, targetSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined, reportErrors: bool): bool {
        if (Signature.$storageOf(((sourceSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration === undefined || Signature.$storageOf(((targetSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration === undefined) {
            return true;
        }
        let sourceAccessibility = (Node__from_ast.ModifierFlags(Signature.$storageOf(((sourceSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration) & ModifierFlagsNonPublicAccessibilityModifier$constant__from_ast()) >>> 0;
        let targetAccessibility = (Node__from_ast.ModifierFlags(Signature.$storageOf(((targetSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration) & ModifierFlagsNonPublicAccessibilityModifier$constant__from_ast()) >>> 0;
        if (targetAccessibility === ModifierFlagsPrivate$constant__from_ast()) {
            return true;
        }
        if (targetAccessibility === ModifierFlagsProtected$constant__from_ast() && !(sourceAccessibility === ModifierFlagsPrivate$constant__from_ast())) {
            return true;
        }
        if (!(targetAccessibility === ModifierFlagsProtected$constant__from_ast()) && sourceAccessibility === 0) {
            return true;
        }
        if (reportErrors) {
            Relater.$go$private$checker$reportError(r, $state__diagnostics.Cannot_assign_a_0_constructor_type_to_a_1_constructor_type, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(visibilityToString(sourceAccessibility)), new GoInterfaceAdapter(visibilityToString(targetAccessibility))]));
        }
        return false;
    }
    static $go$private$checker$eachTypeRelatedToSomeType(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary {
        let result = TernaryTrue$constant();
        let sourceTypes = Type.Types(source);
        const __gotots_range_12 = sourceTypes;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
            const __gotots_range_value_16 = __gotots_range_12.get(__gotots_range_index_12);
            let sourceType: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_16;
            let related = Relater.$go$private$checker$typeRelatedToSomeType(r, sourceType, target, false, IntersectionStateNone$constant());
            if (related === TernaryFalse$constant()) {
                return TernaryFalse$constant();
            }
            result = result & related;
        }
        return result;
    }
    static $go$private$checker$eachTypeRelatedToType(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let result = TernaryTrue$constant();
        let sourceTypes = Type.Types(source);
        let strippedTarget: tsonicTypeScriptRuntime.Location<Type> | undefined = Relater.$go$private$checker$getUndefinedStrippedTargetIfNeeded(r, source, target);
        let strippedTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        if (!((((strippedTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            strippedTypes = Type.Types(strippedTarget);
        }
        const __gotots_range_3 = sourceTypes;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_5 = __gotots_range_index_3;
            const __gotots_range_value_6 = __gotots_range_3.get(__gotots_range_index_3);
            let i = __gotots_range_value_5;
            let sourceType: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_6;
            if (!((((strippedTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && sourceTypes.length >= strippedTypes.length && goNumberIntegerRemainder(sourceTypes.length, strippedTypes.length) === 0) {
                let related__shadow_1 = Relater.$go$private$checker$isRelatedToEx(r, sourceType, strippedTypes.get(goNumberIntegerRemainder(i, strippedTypes.length)), RecursionFlagsBoth$constant(), false, void 0, intersectionState);
                if (!(related__shadow_1 === TernaryFalse$constant())) {
                    result = result & related__shadow_1;
                    continue;
                }
            }
            let related = Relater.$go$private$checker$isRelatedToEx(r, sourceType, target, RecursionFlagsSource$constant(), reportErrors, void 0, intersectionState);
            if (related === TernaryFalse$constant()) {
                return TernaryFalse$constant();
            }
            result = result & related;
        }
        return result;
    }
    static $go$private$checker$getChainMessage(r: {
        value: Relater;
    } | undefined, index: int): {
        value: Message__from_diagnostics;
    } | undefined {
        let e: {
            value: ErrorChain;
        } | undefined = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain;
        for (;;) {
            if (e === undefined) {
                return void 0;
            }
            if (index === 0) {
                return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.message;
            }
            e = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
            index--;
        }
    }
    static $go$private$checker$getErrorState(r: {
        value: Relater;
    } | undefined): errorState {
        return new errorState((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInfo);
    }
    static $go$private$checker$getUndefinedStrippedTargetIfNeeded(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && (((Type.Types(source).get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUndefined$constant()) >>> 0 === 0 && !((((Type.Types(target).get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUndefined$constant()) >>> 0 === 0)) {
            return Checker.$go$private$checker$extractTypesOfKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, 4294967291);
        }
        return target;
    }
    static $go$private$checker$hasExcessProperties(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool): bool {
        if (!isExcessPropertyCheckTarget(target) || !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.noImplicitAny && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsJSLiteral$constant()) >>> 0 === 0)) {
            return false;
        }
        let isComparingJsxAttributes = !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsJsxAttributes$constant()) >>> 0 === 0);
        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.assignableRelation
            ||
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) && (Checker.$go$private$checker$isTypeSubsetOf((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalObjectType, target) || (!isComparingJsxAttributes && Checker.$go$private$checker$isEmptyObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target)))) {
            return false;
        }
        let reducedTarget: tsonicTypeScriptRuntime.Location<Type> | undefined = target;
        let checkTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            const __gotots_receiver_6: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
            const __gotots_argument_17 = source;
            const __gotots_argument_18 = target;
            const __gotots_receiver_5 = r;
            const __gotots_argument_19 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary => {
                return Relater.$go$private$checker$isRelatedToSimple(__gotots_receiver_5, $argument0, $argument1);
            };
            reducedTarget = Checker.$go$private$checker$findMatchingDiscriminantType(__gotots_receiver_6, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
            if (reducedTarget === undefined) {
                reducedTarget = Checker.$go$private$checker$filterPrimitivesIfContainsNonPrimitive((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
            }
            checkTypes = Type.Distributed(reducedTarget);
        }
        const __gotots_range_0 = Checker.$go$private$checker$getPropertiesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_0;
            if (shouldCheckAsExcessProperty(prop, ((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol) && !isIgnoredJsxProperty(source, prop)) {
                if (!Checker.$go$private$checker$isKnownProperty((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, reducedTarget, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, isComparingJsxAttributes)) {
                    if (reportErrors) {
                        let errorTarget: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$filterType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, reducedTarget, isExcessPropertyCheckTarget);
                        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode === undefined) {
                            const __gotots_argument_20 = new GoInterfaceAdapter("No errorNode in hasExcessProperties");
                            GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
                        }
                        if (IsJsxAttributes__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode) || IsJsxOpeningLikeElement__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode) || IsJsxOpeningLikeElement__from_ast(Node__from_ast.$storageOf((((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            if (!(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsJsxAttribute__from_ast(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) &&
                                tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode), GetSourceFileOfNode__from_ast(Node__from_ast.Name(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)))) {
                                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode = Node__from_ast.Name(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                            }
                            let propName = Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop);
                            let suggestionSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSuggestedSymbolForNonexistentJSXAttribute((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, propName, errorTarget);
                            if (!(suggestionSymbol === undefined)) {
                                Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(propName), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, errorTarget)), new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, suggestionSymbol))]));
                            }
                            else {
                                Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_does_not_exist_on_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(propName), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, errorTarget))]));
                            }
                        }
                        else {
                            let objectLiteralDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                            if (!(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined)) {
                                objectLiteralDeclaration = FirstOrNil$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations);
                            }
                            let suggestion = "";
                            if (!(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsObjectLiteralElement__from_ast(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && !(FindAncestor__from_ast(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                                return tsonicTypeScriptRuntime.sameLocation(d, objectLiteralDeclaration);
                            }) === undefined) &&
                                tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(objectLiteralDeclaration), GetSourceFileOfNode__from_ast((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode))) {
                                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode = name;
                                if (IsIdentifier__from_ast(name)) {
                                    suggestion = Checker.$go$private$checker$getSuggestionForNonexistentProperty((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Node__from_ast.Text(name), errorTarget);
                                }
                            }
                            if (suggestion !== "") {
                                Relater.$go$private$checker$reportError(r, $state__diagnostics.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, errorTarget)), new GoInterfaceAdapter(suggestion)]));
                            }
                            else {
                                Relater.$go$private$checker$reportError(r, $state__diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, errorTarget))]));
                            }
                        }
                    }
                    return true;
                }
                if (!checkTypes.isNil() && Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop), Checker.$go$private$checker$getTypeOfPropertyInTypes((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, checkTypes, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), RecursionFlagsBoth$constant(), reportErrors) === TernaryFalse$constant()) {
                    if (reportErrors) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Types_of_property_0_are_incompatible, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop))]));
                    }
                    return true;
                }
            }
        }
        return false;
    }
    static $go$private$checker$indexInfoRelatedTo(r: {
        value: Relater;
    } | undefined, sourceInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, targetInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let related = Relater.$go$private$checker$isRelatedToEx(r, IndexInfo.$storageOf(((sourceInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
        if (related === TernaryFalse$constant() && reportErrors) {
            if (tsonicTypeScriptRuntime.sameLocation(IndexInfo.$storageOf(((sourceInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType)) {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.X_0_index_signatures_are_incompatible, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IndexInfo.$storageOf(((sourceInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType))]));
            }
            else {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.X_0_and_1_index_signatures_are_incompatible, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IndexInfo.$storageOf(((sourceInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType))]));
            }
        }
        return related;
    }
    static $go$private$checker$indexSignaturesIdenticalTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary {
        let sourceInfos = Checker.$go$private$checker$getIndexInfosOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        let targetInfos = Checker.$go$private$checker$getIndexInfosOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
        if (sourceInfos.length !== targetInfos.length) {
            return TernaryFalse$constant();
        }
        const __gotots_range_25 = targetInfos;
        for (let __gotots_range_index_25 = 0; __gotots_range_index_25 < __gotots_range_25.length; __gotots_range_index_25++) {
            const __gotots_range_value_31 = __gotots_range_25.get(__gotots_range_index_25);
            let targetInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = __gotots_range_value_31;
            let sourceInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = Checker.$go$private$checker$getIndexInfoOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType);
            if (!(!(sourceInfo === undefined) && !(Relater.$go$private$checker$isRelatedTo(r, IndexInfo.$storageOf(((sourceInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, RecursionFlagsBoth$constant(), false) === TernaryFalse$constant()) && IndexInfo.$storageOf(((sourceInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).isReadonly === IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).isReadonly)) {
                return TernaryFalse$constant();
            }
        }
        return TernaryTrue$constant();
    }
    static $go$private$checker$indexSignaturesRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, sourceIsPrimitive: bool, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
            return Relater.$go$private$checker$indexSignaturesIdenticalTo(r, source, target);
        }
        let indexInfos = Checker.$go$private$checker$getIndexInfosOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
        let targetHasStringIndex = Some$PointerTo_Named_checker$IndexInfo(indexInfos, (info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringType);
        });
        let result = TernaryTrue$constant();
        const __gotots_range_10 = indexInfos;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_14 = __gotots_range_10.get(__gotots_range_index_10);
            let targetInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = __gotots_range_value_14;
            let related = 0;
            __gotots_control_target_12: {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) && !sourceIsPrimitive && targetHasStringIndex && !((((IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsAny$constant()) >>> 0 === 0)) {
                    related = TernaryTrue$constant();
                }
                else if (Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) && targetHasStringIndex) {
                    related = Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getTemplateTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, RecursionFlagsBoth$constant(), reportErrors);
                }
                else {
                    related = Relater.$go$private$checker$typeRelatedToIndexInfo(r, source, targetInfo, reportErrors, intersectionState);
                }
            }
            if (related === TernaryFalse$constant()) {
                return TernaryFalse$constant();
            }
            result = result & related;
        }
        return result;
    }
    static $go$private$checker$isPropertySymbolTypeRelated(r: {
        value: Relater;
    } | undefined, sourceProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, targetProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, getTypeOfSourceProperty: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let targetIsOptional = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks && !((Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsPartial$constant__from_ast()) >>> 0 === 0);
        let effectiveTarget: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$addOptionalityEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getNonMissingTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp), false, targetIsOptional);
        if (!((((effectiveTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & IfElse$Named_checker$TypeFlags((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation, TypeFlagsAny$constant(), TypeFlagsAnyOrUnknown$constant())) >>> 0 === 0)) {
            return TernaryTrue$constant();
        }
        const __gotots_callee_3 = getTypeOfSourceProperty;
        const __gotots_argument_73 = sourceProp;
        let effectiveSource: tsonicTypeScriptRuntime.Location<Type> | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_73);
        return Relater.$go$private$checker$isRelatedToEx(r, effectiveSource, effectiveTarget, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
    }
    static $go$private$checker$isRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, recursionFlags: RecursionFlags, reportErrors: bool): Ternary {
        return Relater.$go$private$checker$isRelatedToEx(r, source, target, recursionFlags, reportErrors, void 0, IntersectionStateNone$constant());
    }
    static $go$private$checker$isRelatedToEx(r: {
        value: Relater;
    } | undefined, originalSource: tsonicTypeScriptRuntime.Location<Type> | undefined, originalTarget: tsonicTypeScriptRuntime.Location<Type> | undefined, recursionFlags: RecursionFlags, reportErrors: bool, headMessage: {
        value: Message__from_diagnostics;
    } | undefined, intersectionState: IntersectionState): Ternary {
        if (tsonicTypeScriptRuntime.sameLocation(originalSource, originalTarget)) {
            return TernaryTrue$constant();
        }
        if (!((((originalSource ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !((((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0)) {
            let __gotots_logical_result_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation
                && (((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0 && Checker.$go$private$checker$isSimpleTypeRelatedTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalTarget, originalSource, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation, new ErrorReporter(void 0));
            if (!__gotots_logical_result_0) {
                const __gotots_receiver_1: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                const __gotots_argument_4 = originalSource;
                const __gotots_argument_5 = originalTarget;
                const __gotots_argument_6: Relater["relation"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation;
                const __gotots_argument_1 = reportErrors;
                const __gotots_receiver_0 = r;
                const __gotots_argument_2 = ($argument0: {
                    value: Message__from_diagnostics;
                } | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): void => {
                    Relater.$go$private$checker$reportError(__gotots_receiver_0, $argument0, $argument1);
                };
                const __gotots_argument_3 = void 0;
                const __gotots_argument_7 = new ErrorReporter(IfElse$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3));
                __gotots_logical_result_0 = Checker.$go$private$checker$isSimpleTypeRelatedTo(__gotots_receiver_1, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
            }
            if (__gotots_logical_result_0) {
                return TernaryTrue$constant();
            }
            if (reportErrors) {
                Relater.$go$private$checker$reportErrorResults(r, originalSource, originalTarget, originalSource, originalTarget, headMessage);
            }
            return TernaryFalse$constant();
        }
        let source: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getNormalizedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalSource, false);
        let target: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getNormalizedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalTarget, true);
        if (tsonicTypeScriptRuntime.sameLocation(source, target)) {
            return TernaryTrue$constant();
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
            if (!(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags === ((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags)) {
                return TernaryFalse$constant();
            }
            if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSingleton$constant()) >>> 0 === 0)) {
                return TernaryTrue$constant();
            }
            Relater.$go$private$checker$traceUnionsOrIntersectionsTooLarge(r, source, target);
            return Relater.$go$private$checker$recursiveTypeRelatedTo(r, source, target, false, IntersectionStateNone$constant(), recursionFlags);
        }
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) &&
            tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$getConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), target)) {
            return TernaryTrue$constant();
        }
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsDefinitelyNonNullable$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            let types = Type.Types(target);
            let candidate: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
            __gotots_control_target_0: {
                if (types.length === 2 && !((((types.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNullable$constant()) >>> 0 === 0)) {
                    candidate = types.get(1);
                }
                else if (types.length === 3 && !((((types.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNullable$constant()) >>> 0 === 0) && !((((types.get(1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNullable$constant()) >>> 0 === 0)) {
                    candidate = types.get(2);
                }
            }
            if (!(candidate === undefined) && (((candidate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNullable$constant()) >>> 0 === 0) {
                target = Checker.$go$private$checker$getNormalizedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, candidate, true);
                if (tsonicTypeScriptRuntime.sameLocation(source, target)) {
                    return TernaryTrue$constant();
                }
            }
        }
        let __gotots_logical_result_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation
            && (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0 && Checker.$go$private$checker$isSimpleTypeRelatedTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, source, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation, new ErrorReporter(void 0));
        if (!__gotots_logical_result_1) {
            const __gotots_receiver_3: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
            const __gotots_argument_11 = source;
            const __gotots_argument_12 = target;
            const __gotots_argument_13: Relater["relation"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation;
            const __gotots_argument_8 = reportErrors;
            const __gotots_receiver_2 = r;
            const __gotots_argument_9 = ($argument0: {
                value: Message__from_diagnostics;
            } | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): void => {
                Relater.$go$private$checker$reportError(__gotots_receiver_2, $argument0, $argument1);
            };
            const __gotots_argument_10 = void 0;
            const __gotots_argument_14 = new ErrorReporter(IfElse$PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void(__gotots_argument_8, __gotots_argument_9, __gotots_argument_10));
            __gotots_logical_result_1 = Checker.$go$private$checker$isSimpleTypeRelatedTo(__gotots_receiver_3, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
        }
        if (__gotots_logical_result_1) {
            return TernaryTrue$constant();
        }
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStructuredOrInstantiable$constant()) >>> 0 === 0) || !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStructuredOrInstantiable$constant()) >>> 0 === 0)) {
            let isPerformingExcessPropertyChecks = (intersectionState & IntersectionStateTarget$constant()) >>> 0 === 0 && isObjectLiteralType(source) && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsFreshLiteral$constant()) >>> 0 === 0);
            if (isPerformingExcessPropertyChecks) {
                if (Relater.$go$private$checker$hasExcessProperties(r, source, target, reportErrors)) {
                    if (reportErrors) {
                        Relater.$go$private$checker$reportRelationError(r, headMessage, source, IfElse$PointerTo_Named_checker$Type(!(((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined), originalTarget, target));
                    }
                    return TernaryFalse$constant();
                }
            }
            let isPerformingCommonPropertyChecks = (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) || isUnitType(source)) && (intersectionState & IntersectionStateTarget$constant()) >>> 0 === 0 && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (282198012)) >>> 0 === 0) && !tsonicTypeScriptRuntime.sameLocation(source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalObjectType) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (269484032)) >>> 0 === 0) && Checker.$go$private$checker$isWeakType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target) && (Checker.$go$private$checker$getPropertiesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source).length > 0 || Checker.$go$private$checker$typeHasCallOrConstructSignatures((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source));
            let isComparingJsxAttributes = !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsJsxAttributes$constant()) >>> 0 === 0);
            if (isPerformingCommonPropertyChecks && !Checker.$go$private$checker$hasCommonProperties((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target, isComparingJsxAttributes)) {
                if (reportErrors) {
                    let sourceString = Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IfElse$PointerTo_Named_checker$Type(!(((originalSource ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined), originalSource, source));
                    let targetString = Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IfElse$PointerTo_Named_checker$Type(!(((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined), originalTarget, target));
                    let calls = Checker.$go$private$checker$getSignaturesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, SignatureKindCall$constant());
                    let constructs = Checker.$go$private$checker$getSignaturesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, SignatureKindConstruct$constant());
                    if (calls.length > 0 && !(Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getReturnTypeOfSignature((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, calls.get(0)), target, RecursionFlagsSource$constant(), false) === TernaryFalse$constant()) || constructs.length > 0 && !(Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getReturnTypeOfSignature((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, constructs.get(0)), target, RecursionFlagsSource$constant(), false) === TernaryFalse$constant())) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Value_of_type_0_has_no_properties_in_common_with_type_1_Did_you_mean_to_call_it, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sourceString), new GoInterfaceAdapter(targetString)]));
                    }
                    else {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_0_has_no_properties_in_common_with_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sourceString), new GoInterfaceAdapter(targetString)]));
                    }
                }
                return TernaryFalse$constant();
            }
            Relater.$go$private$checker$traceUnionsOrIntersectionsTooLarge(r, source, target);
            let skipCaching = !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && Type.Types(source).length < 4 && (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0 || !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && Type.Types(target).length < 4 && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStructuredOrInstantiable$constant()) >>> 0 === 0;
            let result = 0;
            if (skipCaching) {
                result = Relater.$go$private$checker$unionOrIntersectionRelatedTo(r, source, target, reportErrors, intersectionState);
            }
            else {
                result = Relater.$go$private$checker$recursiveTypeRelatedTo(r, source, target, reportErrors, intersectionState, recursionFlags);
            }
            if (!(result === TernaryFalse$constant())) {
                return result;
            }
        }
        if (reportErrors) {
            Relater.$go$private$checker$reportErrorResults(r, originalSource, originalTarget, source, target, headMessage);
        }
        return TernaryFalse$constant();
    }
    static $go$private$checker$isRelatedToSimple(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary {
        return Relater.$go$private$checker$isRelatedToEx(r, source, target, RecursionFlagsBoth$constant(), false, void 0, IntersectionStateNone$constant());
    }
    static $go$private$checker$isRelatedToWorker(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool): Ternary {
        return Relater.$go$private$checker$isRelatedToEx(r, source, target, RecursionFlagsBoth$constant(), reportErrors, void 0, IntersectionStateNone$constant());
    }
    static $go$private$checker$isSourceIntersectionNeedingExtraCheck(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) && !((((Checker.$go$private$checker$getApparentType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStructuredType$constant()) >>> 0 === 0) && !Some$PointerTo_Named_checker$Type(Type.Types(source), (t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(t, target)
                || !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsNonInferrableType$constant()) >>> 0 === 0);
        });
    }
    static $go$private$checker$mappedTypeRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool): Ternary {
        let modifiersRelated = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation
            || (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation
                && getMappedTypeModifiers(source) === getMappedTypeModifiers(target) || !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) && Checker.$go$private$checker$getCombinedMappedTypeOptionality((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) <= Checker.$go$private$checker$getCombinedMappedTypeOptionality((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
        if (modifiersRelated) {
            let targetConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
            let sourceConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getConstraintTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), IfElse$PointerTo_Named_checker$TypeMapper(Checker.$go$private$checker$getCombinedMappedTypeOptionality((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) < 0, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportUnmeasurableMapper, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportUnreliableMapper));
            {
                let result = Relater.$go$private$checker$isRelatedTo(r, targetConstraint, sourceConstraint, RecursionFlagsBoth$constant(), reportErrors);
                if (!(result === TernaryFalse$constant())) {
                    let mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined = newSimpleTypeMapper(Checker.$go$private$checker$getTypeParameterFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), Checker.$go$private$checker$getTypeParameterFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target));
                    if (tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getNameTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), mapper), Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getNameTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), mapper))) {
                        return result & Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getTemplateTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), mapper), Checker.$go$private$checker$getTemplateTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsBoth$constant(), reportErrors);
                    }
                }
            }
        }
        return TernaryFalse$constant();
    }
    static $go$private$checker$membersRelatedToIndexInfo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, targetInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let result = TernaryTrue$constant();
        let keyType: tsonicTypeScriptRuntime.Location<Type> | undefined = IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType;
        let props = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0)) {
            props = Checker.$go$private$checker$getPropertiesOfUnionOrIntersectionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        }
        else {
            props = Checker.$go$private$checker$getPropertiesOfObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        }
        const __gotots_range_27 = props;
        for (let __gotots_range_index_27 = 0; __gotots_range_index_27 < __gotots_range_27.length; __gotots_range_index_27++) {
            const __gotots_range_value_33 = __gotots_range_27.get(__gotots_range_index_27);
            let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_33;
            if (isIgnoredJsxProperty(source, prop)) {
                continue;
            }
            if (Checker.$go$private$checker$isApplicableIndexType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getLiteralTypeFromProperty((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop, TypeFlagsStringOrNumberLiteralOrUnique$constant(), false), keyType)) {
                let propType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getNonMissingTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop);
                let t: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exactOptionalPropertyTypes || !((((propType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUndefined$constant()) >>> 0 === 0) ||
                    tsonicTypeScriptRuntime.sameLocation(keyType, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.numberType) || (Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0) {
                    t = propType;
                }
                else {
                    t = Checker.$go$private$checker$getTypeWithFacts((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, propType, TypeFactsNEUndefined$constant());
                }
                let related = Relater.$go$private$checker$isRelatedToEx(r, t, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                if (related === TernaryFalse$constant()) {
                    if (reportErrors) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_is_incompatible_with_index_signature, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop))]));
                    }
                    return TernaryFalse$constant();
                }
                result = result & related;
            }
        }
        const __gotots_range_28 = Checker.$go$private$checker$getIndexInfosOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        for (let __gotots_range_index_28 = 0; __gotots_range_index_28 < __gotots_range_28.length; __gotots_range_index_28++) {
            const __gotots_range_value_34 = __gotots_range_28.get(__gotots_range_index_28);
            let info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = __gotots_range_value_34;
            if (Checker.$go$private$checker$isApplicableIndexType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType, keyType)) {
                let related = Relater.$go$private$checker$indexInfoRelatedTo(r, info, targetInfo, reportErrors, intersectionState);
                if (!(!(related === 0))) {
                    return TernaryFalse$constant();
                }
                result = result & related;
            }
        }
        return result;
    }
    static $go$private$checker$propertiesIdenticalTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, excludedProperties: Set__from_collections<gostring>): Ternary {
        if ((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0 || (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) {
            return TernaryFalse$constant();
        }
        let sourceProperties = excludeProperties(Checker.$go$private$checker$getPropertiesOfObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), Set__from_collections.$copy<gostring>(excludedProperties));
        let targetProperties = excludeProperties(Checker.$go$private$checker$getPropertiesOfObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), Set__from_collections.$copy<gostring>(excludedProperties));
        if (sourceProperties.length !== targetProperties.length) {
            return TernaryFalse$constant();
        }
        let result = TernaryTrue$constant();
        const __gotots_range_24 = sourceProperties;
        for (let __gotots_range_index_24 = 0; __gotots_range_index_24 < __gotots_range_24.length; __gotots_range_index_24++) {
            const __gotots_range_value_30 = __gotots_range_24.get(__gotots_range_index_24);
            let sourceProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_30;
            let targetProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getPropertyOfObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, Symbol__from_ast.$storageOf(((sourceProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            if (targetProp === undefined) {
                return TernaryFalse$constant();
            }
            const __gotots_receiver_17: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
            const __gotots_argument_49 = sourceProp;
            const __gotots_argument_50 = targetProp;
            const __gotots_receiver_16 = r;
            const __gotots_argument_51 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary => {
                return Relater.$go$private$checker$isRelatedToSimple(__gotots_receiver_16, $argument0, $argument1);
            };
            let related = Checker.$go$private$checker$compareProperties(__gotots_receiver_17, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
            if (related === TernaryFalse$constant()) {
                return TernaryFalse$constant();
            }
            result = result & related;
        }
        return result;
    }
    static $go$private$checker$propertiesRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, excludedProperties: Set__from_collections<gostring>, optionalsOnly: bool, intersectionState: IntersectionState): Ternary {
        const excludedProperties$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => excludedProperties, excludedProperties$next2 => excludedProperties = excludedProperties$next2);
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
            return Relater.$go$private$checker$propertiesIdenticalTo(r, source, target, Set__from_collections.$copy<gostring>(excludedProperties));
        }
        let result = TernaryTrue$constant();
        if (isTupleType(target)) {
            if (Checker.$go$private$checker$isArrayOrTupleType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                if (!(Type.TargetTupleType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly && (Checker.$go$private$checker$isReadonlyArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) || isTupleType(source) && (Type.TargetTupleType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly)) {
                    return TernaryFalse$constant();
                }
                let sourceArity = Checker.$go$private$checker$getTypeReferenceArity((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                let targetArity = Checker.$go$private$checker$getTypeReferenceArity((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                let sourceRest = false;
                if (isTupleType(source)) {
                    sourceRest = !(((Type.TargetTupleType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsRest$constant()) >>> 0 === 0);
                }
                else {
                    sourceRest = true;
                }
                let targetHasRestElement = !(((Type.TargetTupleType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsVariable$constant()) >>> 0 === 0);
                let sourceMinLength = 0;
                if (isTupleType(source)) {
                    sourceMinLength = (Type.TargetTupleType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.minLength;
                }
                else {
                    sourceMinLength = 0;
                }
                let targetMinLength: TupleType["minLength"] = (Type.TargetTupleType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.minLength;
                if (!sourceRest && sourceArity < targetMinLength) {
                    if (reportErrors) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Source_has_0_element_s_but_target_requires_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(sourceArity), new $goInterfaceAdapter$int(targetMinLength)]));
                    }
                    return TernaryFalse$constant();
                }
                if (!targetHasRestElement && targetArity < sourceMinLength) {
                    if (reportErrors) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Source_has_0_element_s_but_target_allows_only_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(sourceMinLength), new $goInterfaceAdapter$int(targetArity)]));
                    }
                    return TernaryFalse$constant();
                }
                if (!targetHasRestElement && (sourceRest || targetArity < sourceArity)) {
                    if (reportErrors) {
                        if (sourceMinLength < targetMinLength) {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Target_requires_0_element_s_but_source_may_have_fewer, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(targetMinLength)]));
                        }
                        else {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Target_allows_only_0_element_s_but_source_may_have_more, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(targetArity)]));
                        }
                    }
                    return TernaryFalse$constant();
                }
                let sourceTypeArguments = Checker.$go$private$checker$getTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                let targetTypeArguments = Checker.$go$private$checker$getTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                let targetStartCount = getStartElementCount(Type.TargetTupleType(target), ElementFlagsNonRest$constant());
                let targetEndCount = getEndElementCount(Type.TargetTupleType(target), ElementFlagsNonRest$constant());
                let canExcludeDiscriminants = Set$Len$string(excludedProperties$location2) !== 0;
                const __gotots_range_7 = sourceArity;
                for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7; __gotots_range_index_7++) {
                    const __gotots_range_value_11 = __gotots_range_index_7;
                    let sourcePosition = __gotots_range_value_11;
                    let sourceFlags = 0;
                    if (isTupleType(source)) {
                        sourceFlags = (void TupleElementInfo.$storageOf, (void TupleElementInfo.$fromStorage,
                            (Type.TargetTupleType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(sourcePosition))).flags;
                    }
                    else {
                        sourceFlags = ElementFlagsRest$constant();
                    }
                    let sourcePositionFromEnd = sourceArity - 1 - sourcePosition;
                    let targetPosition = 0;
                    if (targetHasRestElement && sourcePosition >= targetStartCount) {
                        targetPosition = targetArity - 1 - globalThis.Math.min(sourcePositionFromEnd, targetEndCount);
                    }
                    else {
                        targetPosition = sourcePosition;
                    }
                    let targetFlags = ElementFlagsNone$constant();
                    if (targetPosition >= 0) {
                        targetFlags = (void TupleElementInfo.$storageOf, (void TupleElementInfo.$fromStorage,
                            (Type.TargetTupleType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(targetPosition))).flags;
                    }
                    if (!((targetFlags & ElementFlagsVariadic$constant()) >>> 0 === 0) && (sourceFlags & ElementFlagsVariadic$constant()) >>> 0 === 0) {
                        if (reportErrors) {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Source_provides_no_match_for_variadic_element_at_position_0_in_target, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(targetPosition)]));
                        }
                        return TernaryFalse$constant();
                    }
                    if (!((sourceFlags & ElementFlagsVariadic$constant()) >>> 0 === 0) && (targetFlags & ElementFlagsVariable$constant()) >>> 0 === 0) {
                        if (reportErrors) {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Variadic_element_at_position_0_in_source_does_not_match_element_at_position_1_in_target, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(sourcePosition), new $goInterfaceAdapter$int(targetPosition)]));
                        }
                        return TernaryFalse$constant();
                    }
                    if (!((targetFlags & ElementFlagsRequired$constant()) >>> 0 === 0) && (sourceFlags & ElementFlagsRequired$constant()) >>> 0 === 0) {
                        if (reportErrors) {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Source_provides_no_match_for_required_element_at_position_0_in_target, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(targetPosition)]));
                        }
                        return TernaryFalse$constant();
                    }
                    if (canExcludeDiscriminants) {
                        if (!((sourceFlags & ElementFlagsVariable$constant()) >>> 0 === 0) || !((targetFlags & ElementFlagsVariable$constant()) >>> 0 === 0)) {
                            canExcludeDiscriminants = false;
                        }
                        if (canExcludeDiscriminants && Set__from_collections.Has<gostring>(excludedProperties$location2, strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(sourcePosition))))) {
                            continue;
                        }
                    }
                    let sourceType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$removeMissingType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceTypeArguments.get(sourcePosition), !(((sourceFlags & targetFlags) >>> 0 & ElementFlagsOptional$constant()) >>> 0 === 0));
                    let targetType: tsonicTypeScriptRuntime.Location<Type> | undefined = targetTypeArguments.get(targetPosition);
                    let targetCheckType: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                    if (!((sourceFlags & ElementFlagsVariadic$constant()) >>> 0 === 0) && !((targetFlags & ElementFlagsRest$constant()) >>> 0 === 0)) {
                        targetCheckType = Checker.$go$private$checker$createArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType);
                    }
                    else {
                        targetCheckType = Checker.$go$private$checker$removeMissingType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType, !((targetFlags & ElementFlagsOptional$constant()) >>> 0 === 0));
                    }
                    let related = Relater.$go$private$checker$isRelatedToEx(r, sourceType, targetCheckType, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                    if (related === TernaryFalse$constant()) {
                        if (reportErrors && (targetArity > 1 || sourceArity > 1)) {
                            if (targetHasRestElement && sourcePosition >= targetStartCount && sourcePositionFromEnd >= targetEndCount && targetStartCount !== sourceArity - targetEndCount - 1) {
                                Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(targetStartCount), new $goInterfaceAdapter$int(sourceArity - targetEndCount - 1), new $goInterfaceAdapter$int(targetPosition)]));
                            }
                            else {
                                Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(sourcePosition), new $goInterfaceAdapter$int(targetPosition)]));
                            }
                        }
                        return TernaryFalse$constant();
                    }
                    result = result & related;
                }
                return result;
            }
            if (!(((Type.TargetTupleType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsVariable$constant()) >>> 0 === 0)) {
                return TernaryFalse$constant();
            }
        }
        let requireOptionalProperties = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subtypeRelation
            ||
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) && !isObjectLiteralType(source) && !Checker.$go$private$checker$isEmptyArrayLiteralType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) && !isTupleType(source);
        let unmatchedProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getUnmatchedProperty((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target, requireOptionalProperties, false);
        if (!(unmatchedProperty === undefined)) {
            if (reportErrors && Checker.$go$private$checker$shouldReportUnmatchedPropertyError((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target)) {
                Relater.$go$private$checker$reportUnmatchedProperty(r, source, target, unmatchedProperty, requireOptionalProperties);
            }
            return TernaryFalse$constant();
        }
        if (isObjectLiteralType(target)) {
            const __gotots_range_8 = excludeProperties(Checker.$go$private$checker$getPropertiesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), Set__from_collections.$copy<gostring>(excludedProperties));
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
                const __gotots_range_value_12 = __gotots_range_8.get(__gotots_range_index_8);
                let sourceProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_12;
                if (Checker.$go$private$checker$getPropertyOfObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, Symbol__from_ast.$storageOf(((sourceProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) === undefined) {
                    if (reportErrors) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_does_not_exist_on_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProp)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))]));
                    }
                    return TernaryFalse$constant();
                }
            }
        }
        let properties = Checker.$go$private$checker$getPropertiesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
        let numericNamesOnly = isTupleType(source) && isTupleType(target);
        const __gotots_range_9 = excludeProperties(properties, Set__from_collections.$copy<gostring>(excludedProperties));
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
            const __gotots_range_value_13 = __gotots_range_9.get(__gotots_range_index_9);
            let targetProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_13;
            let name = Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
            if ((Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0 && (!numericNamesOnly || isNumericLiteralName(name) || name === "length") && (!optionalsOnly || !((Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0))) {
                let sourceProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getPropertyOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, name);
                if (!(sourceProp === undefined) && !tsonicTypeScriptRuntime.sameLocation(sourceProp, targetProp)) {
                    const __gotots_receiver_15 = r;
                    const __gotots_argument_41 = source;
                    const __gotots_argument_42 = target;
                    const __gotots_argument_43 = sourceProp;
                    const __gotots_argument_44 = targetProp;
                    const __gotots_receiver_14: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                    const __gotots_argument_45 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined => {
                        return Checker.$go$private$checker$getNonMissingTypeOfSymbol(__gotots_receiver_14, $argument0);
                    };
                    const __gotots_argument_46 = reportErrors;
                    const __gotots_argument_47 = intersectionState;
                    const __gotots_argument_48 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                        ===
                            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation;
                    let related = Relater.$go$private$checker$propertyRelatedTo(__gotots_receiver_15, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
                    if (related === TernaryFalse$constant()) {
                        return TernaryFalse$constant();
                    }
                    result = result & related;
                }
            }
        }
        return result;
    }
    static $go$private$checker$propertyRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, sourceProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, targetProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, getTypeOfSourceProperty: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Type> | undefined) | undefined, reportErrors: bool, intersectionState: IntersectionState, skipOptional: bool): Ternary {
        let sourcePropFlags = getDeclarationModifierFlagsFromSymbol(sourceProp);
        let targetPropFlags = getDeclarationModifierFlagsFromSymbol(targetProp);
        __gotots_control_target_14: {
            if (!((sourcePropFlags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0) || !((targetPropFlags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0)) {
                if (!tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((sourceProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                    if (reportErrors) {
                        if (!((sourcePropFlags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0) && !((targetPropFlags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0)) {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Types_have_separate_declarations_of_a_private_property_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp))]));
                        }
                        else {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IfElse$PointerTo_Named_checker$Type(!((sourcePropFlags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0), source, target))), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IfElse$PointerTo_Named_checker$Type(!((sourcePropFlags & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0), target, source)))]));
                        }
                    }
                    return TernaryFalse$constant();
                }
            }
            else if (!((targetPropFlags & ModifierFlagsProtected$constant__from_ast()) >>> 0 === 0)) {
                if (!Checker.$go$private$checker$isValidOverrideOf((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProp, targetProp)) {
                    if (reportErrors) {
                        let sourceType: tsonicTypeScriptRuntime.Location<Type> | undefined = OrElse$PointerTo_Named_checker$Type(Checker.$go$private$checker$getDeclaringClass((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProp), source);
                        let targetType: tsonicTypeScriptRuntime.Location<Type> | undefined = OrElse$PointerTo_Named_checker$Type(Checker.$go$private$checker$getDeclaringClass((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp), target);
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceType)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType))]));
                    }
                    return TernaryFalse$constant();
                }
            }
            else if (!((sourcePropFlags & ModifierFlagsProtected$constant__from_ast()) >>> 0 === 0)) {
                if (reportErrors) {
                    Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))]));
                }
                return TernaryFalse$constant();
            }
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation
            && Checker.$go$private$checker$isReadonlySymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProp) && !Checker.$go$private$checker$isReadonlySymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp)) {
            return TernaryFalse$constant();
        }
        let related = Relater.$go$private$checker$isPropertySymbolTypeRelated(r, sourceProp, targetProp, getTypeOfSourceProperty, reportErrors, intersectionState);
        if (related === TernaryFalse$constant()) {
            if (reportErrors) {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.Types_of_property_0_are_incompatible, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp))]));
            }
            return TernaryFalse$constant();
        }
        if (!skipOptional && !((Symbol__from_ast.$storageOf(((sourceProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClassMember$constant__from_ast()) >>> 0 === 0) && (Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0) {
            if (reportErrors) {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetProp)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))]));
            }
            return TernaryFalse$constant();
        }
        return related;
    }
    static $go$private$checker$recursiveTypeRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState, recursionFlags: RecursionFlags): Ternary {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: Ternary = 0;
        try {
            try {
                __gotots_return_block_0: {
                    if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overflow) {
                        __gotots_return_0 = TernaryFalse$constant();
                        break __gotots_return_block_0;
                    }
                    const __gotots_results_0 = getRelationKey(source, target, intersectionState, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                        ===
                            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation, false);
                    let id = __gotots_results_0[0];
                    let constrained = __gotots_results_0[1];
                    {
                        let entry = Relation.$go$private$checker$get((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation, CacheHashKey.$copy(id));
                        if (!(entry === RelationComparisonResultNone$constant())) {
                            if (reportErrors && !((entry & RelationComparisonResultFailed$constant()) >>> 0 === 0) && (entry & RelationComparisonResultOverflow$constant()) >>> 0 === 0) {
                            }
                            else {
                                const __gotots_store_1 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                __gotots_store_1.reliabilityFlags = (__gotots_store_1.reliabilityFlags | (entry & (24)) >>> 0) >>> 0;
                                if (reportErrors && !((entry & RelationComparisonResultOverflow$constant()) >>> 0 === 0)) {
                                    let message: {
                                        value: Message__from_diagnostics;
                                    } | undefined = IfElse$PointerTo_Named_diagnostics$Message(!((entry & RelationComparisonResultComplexityOverflow$constant()) >>> 0 === 0), $state__diagnostics.Excessive_complexity_comparing_types_0_and_1, $state__diagnostics.Excessive_stack_depth_comparing_types_0_and_1);
                                    Relater.$go$private$checker$reportError(r, message, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))]));
                                }
                                if (!((entry & RelationComparisonResultSucceeded$constant()) >>> 0 === 0)) {
                                    __gotots_return_0 = TernaryTrue$constant();
                                    break __gotots_return_block_0;
                                }
                                __gotots_return_0 = TernaryFalse$constant();
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relationCount <= 0) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overflow = true;
                        __gotots_return_0 = TernaryFalse$constant();
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_2 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    if (Set__from_collections.Has<CacheHashKey>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "maybeKeysSet"), CacheHashKey.$copy(id))) {
                        __gotots_return_0 = TernaryMaybe$constant();
                        break __gotots_return_block_0;
                    }
                    if (constrained) {
                        const __gotots_results_1 = getRelationKey(source, target, intersectionState, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                            ===
                                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation, true);
                        let broadestEquivalentId = __gotots_results_1[0];
                        const __gotots_store_3 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        if (Set__from_collections.Has<CacheHashKey>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "maybeKeysSet"), CacheHashKey.$copy(broadestEquivalentId))) {
                            __gotots_return_0 = TernaryMaybe$constant();
                            break __gotots_return_block_0;
                        }
                    }
                    if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack.length === 100 || (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack.length === 100) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.overflow = true;
                        __gotots_return_0 = TernaryFalse$constant();
                        break __gotots_return_block_0;
                    }
                    let maybeStart = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys.length;
                    const __gotots_slice_build_0: Relater["maybeKeys"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, CacheHashKey.$storageOf(CacheHashKey.$copy(id)));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<CacheHashKey__from_checker$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, CacheHashKey.$storageOf(CacheHashKey.$copy(CacheHashKey.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, CacheHashKey.$storageOf(CacheHashKey.$copy(id)));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, CacheHashKey.$zeroStorage());
                        }
                    }
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys = __gotots_slice_build_1;
                    const __gotots_store_4 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    Set$Add$Named_checker$CacheHashKey(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "maybeKeysSet"), CacheHashKey.$copy(id));
                    let saveExpandingFlags: Relater["expandingFlags"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandingFlags;
                    if (!((recursionFlags & RecursionFlagsSource$constant()) >>> 0 === 0)) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack.append(void 0, [source]);
                        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandingFlags & ExpandingFlagsSource$constant()) === 0 && Checker.$go$private$checker$isDeeplyNestedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack, 3)) {
                            const __gotots_store_5 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_5.expandingFlags = __gotots_store_5.expandingFlags | 1;
                        }
                    }
                    if (!((recursionFlags & RecursionFlagsTarget$constant()) >>> 0 === 0)) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack.append(void 0, [target]);
                        if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandingFlags & ExpandingFlagsTarget$constant()) === 0 && Checker.$go$private$checker$isDeeplyNestedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack, 3)) {
                            const __gotots_store_6 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_6.expandingFlags = __gotots_store_6.expandingFlags | 2;
                        }
                    }
                    let saveReliabilityFlags: Checker["reliabilityFlags"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reliabilityFlags;
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reliabilityFlags = 0;
                    let result = 0;
                    if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandingFlags === ExpandingFlagsBoth$constant()) {
                        {
                            let tr: {
                                value: Tracer;
                            } | undefined = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracer;
                            if (!(tr === undefined)) {
                                Tracer.Instant(tr, PhaseCheckTypes$constant__from_tracing(), "recursiveTypeRelatedTo_DepthLimit", $goMap$MapOf_string_To_Interface_void.make(4, [["sourceId", new $goInterfaceAdapter$Named_checker$TypeId(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["targetId", new $goInterfaceAdapter$Named_checker$TypeId(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["depth", new $goInterfaceAdapter$int((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack.length)], ["targetDepth", new $goInterfaceAdapter$int((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack.length)]]));
                            }
                        }
                        result = TernaryMaybe$constant();
                    }
                    else {
                        {
                            let tr: {
                                value: Tracer;
                            } | undefined = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracer;
                            if (!(tr === undefined)) {
                                const __gotots_callee_0: (() => void) | undefined = Tracer.Push(tr, PhaseCheckTypes$constant__from_tracing(), "structuredTypeRelatedTo", $goMap$MapOf_string_To_Interface_void.make(2, [["sourceId", new $goInterfaceAdapter$Named_checker$TypeId(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["targetId", new $goInterfaceAdapter$Named_checker$TypeId(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)]]), false);
                                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                                __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                                });
                            }
                        }
                        result = Relater.$go$private$checker$structuredTypeRelatedTo(r, source, target, reportErrors, intersectionState);
                    }
                    let propagatingVarianceFlags: Checker["reliabilityFlags"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reliabilityFlags;
                    const __gotots_store_7 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_7.reliabilityFlags = (__gotots_store_7.reliabilityFlags | saveReliabilityFlags) >>> 0;
                    if (!((recursionFlags & RecursionFlagsSource$constant()) >>> 0 === 0)) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack.slice(0, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack.length - 1, null);
                    }
                    if (!((recursionFlags & RecursionFlagsTarget$constant()) >>> 0 === 0)) {
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack.slice(0, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack.length - 1, null);
                    }
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expandingFlags = saveExpandingFlags;
                    if (!(result === TernaryFalse$constant())) {
                        if (result === TernaryTrue$constant() || ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack.length === 0 && (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack.length === 0)) {
                            if (result === TernaryTrue$constant() || result === TernaryMaybe$constant()) {
                                Relater.$go$private$checker$resetMaybeStack(r, maybeStart, propagatingVarianceFlags, true);
                            }
                            else {
                                Relater.$go$private$checker$resetMaybeStack(r, maybeStart, propagatingVarianceFlags, false);
                            }
                        }
                    }
                    else {
                        Relation.$go$private$checker$set((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation, CacheHashKey.$copy(id), (RelationComparisonResultFailed$constant() | propagatingVarianceFlags) >>> 0);
                        const __gotots_store_8 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_8.relationCount = __gotots_store_8.relationCount - 1;
                        Relater.$go$private$checker$resetMaybeStack(r, maybeStart, propagatingVarianceFlags, false);
                    }
                    __gotots_return_0 = result;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$checker$reportError(r: {
        value: Relater;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, args: RuntimeSlice<GoInterface | undefined>): void {
        if (message
            ===
                $state__diagnostics.Types_of_property_0_are_incompatible) {
            {
                const __gotots_switch_tag_0 = Relater.$go$private$checker$getChainMessage(r, 0);
                let __gotots_switch_selection_0 = -1;
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_0 = false;
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 =
                            __gotots_switch_tag_0
                                ===
                                    $state__diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1;
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 =
                            __gotots_switch_tag_0
                                ===
                                    $state__diagnostics.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2;
                    }
                    if (__gotots_switch_match_0) {
                        __gotots_switch_selection_0 = 0;
                    }
                }
                switch (__gotots_switch_selection_0) {
                    case 0: {
                        return;
                        break;
                    }
                }
            }
            let arg = "";
            {
                const __gotots_switch_tag_1 = Relater.$go$private$checker$getChainMessage(r, 1);
                let __gotots_switch_selection_1 = -1;
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_1 = false;
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 =
                            __gotots_switch_tag_1
                                ===
                                    $state__diagnostics.Call_signatures_with_no_arguments_have_incompatible_return_types_0_and_1;
                    }
                    if (__gotots_switch_match_1) {
                        __gotots_switch_selection_1 = 0;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_2 = false;
                    if (!__gotots_switch_match_2) {
                        __gotots_switch_match_2 =
                            __gotots_switch_tag_1
                                ===
                                    $state__diagnostics.Construct_signatures_with_no_arguments_have_incompatible_return_types_0_and_1;
                    }
                    if (__gotots_switch_match_2) {
                        __gotots_switch_selection_1 = 1;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_3 = false;
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 =
                            __gotots_switch_tag_1
                                ===
                                    $state__diagnostics.Call_signature_return_types_0_and_1_are_incompatible;
                    }
                    if (__gotots_switch_match_3) {
                        __gotots_switch_selection_1 = 2;
                    }
                }
                if (__gotots_switch_selection_1 === -1) {
                    let __gotots_switch_match_4 = false;
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 =
                            __gotots_switch_tag_1
                                ===
                                    $state__diagnostics.Construct_signature_return_types_0_and_1_are_incompatible;
                    }
                    if (__gotots_switch_match_4) {
                        __gotots_switch_selection_1 = 3;
                    }
                }
                switch (__gotots_switch_selection_1) {
                    case 0: {
                        arg = getPropertyNameArg(args.get(0)) + "()";
                        break;
                    }
                    case 1: {
                        arg = "new " + getPropertyNameArg(args.get(0)) + "()";
                        break;
                    }
                    case 2: {
                        arg = getPropertyNameArg(args.get(0)) + "(...)";
                        break;
                    }
                    case 3: {
                        arg = "new " + getPropertyNameArg(args.get(0)) + "(...)";
                        break;
                    }
                }
            }
            if (arg !== "") {
                message = $state__diagnostics.The_types_returned_by_0_are_incompatible_between_these_types;
                args.set(0, new GoInterfaceAdapter(arg));
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
            }
            {
                const __gotots_switch_tag_2 = Relater.$go$private$checker$getChainMessage(r, 1);
                let __gotots_switch_selection_2 = -1;
                if (__gotots_switch_selection_2 === -1) {
                    let __gotots_switch_match_5 = false;
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 =
                            __gotots_switch_tag_2
                                ===
                                    $state__diagnostics.Types_of_property_0_are_incompatible;
                    }
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 =
                            __gotots_switch_tag_2
                                ===
                                    $state__diagnostics.The_types_of_0_are_incompatible_between_these_types;
                    }
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 =
                            __gotots_switch_tag_2
                                ===
                                    $state__diagnostics.The_types_returned_by_0_are_incompatible_between_these_types;
                    }
                    if (__gotots_switch_match_5) {
                        __gotots_switch_selection_2 = 0;
                    }
                }
                switch (__gotots_switch_selection_2) {
                    case 0: {
                        let head = getPropertyNameArg(args.get(0));
                        let tail = getPropertyNameArg((((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.args.get(0));
                        let arg__shadow_1 = addToDottedName(head, tail);
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
                        if (message
                            ===
                                $state__diagnostics.Types_of_property_0_are_incompatible) {
                            message = $state__diagnostics.The_types_of_0_are_incompatible_between_these_types;
                        }
                        Relater.$go$private$checker$reportError(r, message, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(arg__shadow_1)]));
                        return;
                        break;
                    }
                }
            }
        }
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain =
            { value: new ErrorChain((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain, message, args) };
    }
    static $go$private$checker$reportErrorResults(r: {
        value: Relater;
    } | undefined, originalSource: tsonicTypeScriptRuntime.Location<Type> | undefined, originalTarget: tsonicTypeScriptRuntime.Location<Type> | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, headMessage: {
        value: Message__from_diagnostics;
    } | undefined): void {
        let sourceHasBase = !(Checker.$go$private$checker$getSingleBaseForNonAugmentingSubtype((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalSource) === undefined);
        let targetHasBase = !(Checker.$go$private$checker$getSingleBaseForNonAugmentingSubtype((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalTarget) === undefined);
        if (!(((originalSource ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) || sourceHasBase) {
            source = originalSource;
        }
        if (!(((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) || targetHasBase) {
            target = originalTarget;
        }
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0)) {
            Relater.$go$private$checker$tryElaborateArrayLikeErrors(r, source, target, true);
        }
        __gotots_control_target_1: {
            if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0)) {
                Relater.$go$private$checker$tryElaborateErrorsForPrimitivesAndObjects(r, source, target);
            }
            else if (!(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) &&
                tsonicTypeScriptRuntime.sameLocation(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalObjectType, source)) {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.The_Object_type_is_assignable_to_very_few_other_types_Did_you_mean_to_use_the_any_type_instead, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsJsxAttributes$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0)) {
                let targetTypes = Type.Types(target);
                let intrinsicAttributes: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getJsxType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_.$fromStorage($state.JsxNames).IntrinsicAttributes, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode);
                let intrinsicClassAttributes: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getJsxType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_.$fromStorage($state.JsxNames).IntrinsicClassAttributes, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNode);
                if (!Checker.$go$private$checker$isErrorType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, intrinsicAttributes) && !Checker.$go$private$checker$isErrorType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, intrinsicClassAttributes) && (Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(targetTypes, intrinsicAttributes) || Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(targetTypes, intrinsicClassAttributes))) {
                    return;
                }
            }
            else if (!((((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) && !((((originalTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsIsNeverIntersection$uint32) >>> 0 === 0)) {
                let message: {
                    value: Message__from_diagnostics;
                } | undefined = $state__diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents;
                const __gotots_argument_15 = Checker.$go$private$checker$getPropertiesOfUnionOrIntersectionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalTarget);
                const __gotots_receiver_4: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                const __gotots_argument_16 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                    return Checker.$go$private$checker$isDiscriminantWithNeverType(__gotots_receiver_4, $argument0);
                };
                let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Find$PointerTo_Named_ast$Symbol(__gotots_argument_15, __gotots_argument_16);
                if (prop === undefined) {
                    message = $state__diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some;
                    prop = Find$PointerTo_Named_ast$Symbol(Checker.$go$private$checker$getPropertiesOfUnionOrIntersectionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalTarget), isConflictingPrivateProperty);
                }
                if (!(prop === undefined)) {
                    Relater.$go$private$checker$reportError(r, message, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.$go$private$checker$typeToStringEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, originalTarget, void 0, TypeFormatFlagsNoTypeReduction$constant(), void 0)), new GoInterfaceAdapter(Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, prop))]));
                }
            }
        }
        Relater.$go$private$checker$reportRelationError(r, headMessage, source, target);
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && !(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && Symbol__from_ast.$storageOf(((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0 && Checker.$go$private$checker$getConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) === undefined) {
            let syntheticParam: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$cloneTypeParameter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
            (Type.AsTypeParameter(syntheticParam) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint = Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, newSimpleTypeMapper(source, syntheticParam));
            if (Checker.$go$private$checker$hasNonCircularBaseConstraint((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, syntheticParam)) {
                let targetConstraintString = Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInfo = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInfo.append(void 0, [NewDiagnosticForNode(Symbol__from_ast.$storageOf(((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0), $state__diagnostics.This_type_parameter_might_need_an_extends_0_constraint, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetConstraintString)]))]);
            }
        }
    }
    static $go$private$checker$reportRelationError(r: {
        value: Relater;
    } | undefined, message: {
        value: Message__from_diagnostics;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): void {
        const __gotots_results_2 = Checker.$go$private$checker$getTypeNamesForErrorDisplay((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target);
        let sourceType = __gotots_results_2[0];
        let targetType = __gotots_results_2[1];
        let generalizedSource: tsonicTypeScriptRuntime.Location<Type> | undefined = source;
        let generalizedSourceType = sourceType;
        if ((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0 && isLiteralType(source) && !Checker.$go$private$checker$typeCouldHaveTopLevelSingletonTypes((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target)) {
            generalizedSource = Checker.$go$private$checker$getBaseTypeOfLiteralType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
            generalizedSourceType = Checker.$go$private$checker$getTypeNameForErrorDisplay((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, generalizedSource);
        }
        let targetFlags = 0;
        if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) {
            targetFlags = (((Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags;
        }
        else {
            targetFlags = ((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags;
        }
        if (!((targetFlags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && !tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.markerSuperTypeForCheck) && !tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.markerSubTypeForCheck)) {
            let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
            __gotots_control_target_2: {
                if (!(constraint === undefined) && Checker.$go$private$checker$isTypeAssignableTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, generalizedSource, constraint)) {
                    Relater.$go$private$checker$reportError(r, $state__diagnostics.X_0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_constraint_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(generalizedSourceType), new GoInterfaceAdapter(targetType), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, constraint))]));
                }
                else if (!(constraint === undefined) && Checker.$go$private$checker$isTypeAssignableTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, constraint)) {
                    Relater.$go$private$checker$reportError(r, $state__diagnostics.X_0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_constraint_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sourceType), new GoInterfaceAdapter(targetType), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, constraint))]));
                }
                else {
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = void 0;
                    Relater.$go$private$checker$reportError(r, $state__diagnostics.X_0_could_be_instantiated_with_an_arbitrary_type_which_could_be_unrelated_to_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetType), new GoInterfaceAdapter(generalizedSourceType)]));
                }
            }
        }
        if (message === undefined) {
            __gotots_control_target_3: {
                if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) {
                    message = $state__diagnostics.Type_0_is_not_comparable_to_type_1;
                }
                else if (sourceType === targetType) {
                    message = $state__diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated;
                }
                else if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exactOptionalPropertyTypes && Checker.$go$private$checker$getExactOptionalUnassignableProperties((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target).length !== 0) {
                    message = $state__diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                }
                else {
                    if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLiteral$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                        let suggestedType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getSuggestedTypeForNonexistentStringLiteralType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target);
                        if (!(suggestedType === undefined)) {
                            Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_0_is_not_assignable_to_type_1_Did_you_mean_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(generalizedSourceType), new GoInterfaceAdapter(targetType), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, suggestedType))]));
                            return;
                        }
                    }
                    message = $state__diagnostics.Type_0_is_not_assignable_to_type_1;
                }
            }
        }
        else if (message
            ===
                $state__diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1
            && ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exactOptionalPropertyTypes && Checker.$go$private$checker$getExactOptionalUnassignableProperties((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target).length > 0) {
            message = $state__diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
        }
        {
            const __gotots_switch_tag_3 = Relater.$go$private$checker$getChainMessage(r, 0);
            let __gotots_switch_selection_3 = -1;
            if (__gotots_switch_selection_3 === -1) {
                let __gotots_switch_match_6 = false;
                if (!__gotots_switch_match_6) {
                    __gotots_switch_match_6 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1;
                }
                if (!__gotots_switch_match_6) {
                    __gotots_switch_match_6 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Object_literal_may_only_specify_known_properties_but_0_does_not_exist_in_type_1_Did_you_mean_to_write_2;
                }
                if (__gotots_switch_match_6) {
                    __gotots_switch_selection_3 = 0;
                }
            }
            if (__gotots_switch_selection_3 === -1) {
                let __gotots_switch_match_7 = false;
                if (!__gotots_switch_match_7) {
                    __gotots_switch_match_7 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Excessive_complexity_comparing_types_0_and_1;
                }
                if (!__gotots_switch_match_7) {
                    __gotots_switch_match_7 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Excessive_stack_depth_comparing_types_0_and_1;
                }
                if (!__gotots_switch_match_7) {
                    __gotots_switch_match_7 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1;
                }
                if (__gotots_switch_match_7) {
                    __gotots_switch_selection_3 = 1;
                }
            }
            if (__gotots_switch_selection_3 === -1) {
                let __gotots_switch_match_8 = false;
                if (!__gotots_switch_match_8) {
                    __gotots_switch_match_8 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2;
                }
                if (__gotots_switch_match_8) {
                    __gotots_switch_selection_3 = 2;
                }
            }
            if (__gotots_switch_selection_3 === -1) {
                let __gotots_switch_match_9 = false;
                if (!__gotots_switch_match_9) {
                    __gotots_switch_match_9 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more;
                }
                if (!__gotots_switch_match_9) {
                    __gotots_switch_match_9 =
                        __gotots_switch_tag_3
                            ===
                                $state__diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2;
                }
                if (__gotots_switch_match_9) {
                    __gotots_switch_selection_3 = 3;
                }
            }
            switch (__gotots_switch_selection_3) {
                case 0: {
                    return;
                    break;
                }
                case 1: {
                    if (Relater.$go$private$checker$chainArgsMatch(r, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(generalizedSourceType), new GoInterfaceAdapter(targetType)]))) {
                        return;
                    }
                    break;
                }
                case 2: {
                    if (!isConversionOrInterfaceImplementationMessage(message) && Relater.$go$private$checker$chainArgsMatch(r, RuntimeSlice.literal<GoInterface | undefined>([void 0, new GoInterfaceAdapter(generalizedSourceType), new GoInterfaceAdapter(targetType)]))) {
                        return;
                    }
                    break;
                }
                case 3: {
                    if (!isConversionOrInterfaceImplementationMessage(message) && Relater.$go$private$checker$chainArgsMatch(r, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(generalizedSourceType), new GoInterfaceAdapter(targetType)]))) {
                        return;
                    }
                    break;
                }
            }
        }
        Relater.$go$private$checker$reportError(r, message, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(generalizedSourceType), new GoInterfaceAdapter(targetType)]));
    }
    static $go$private$checker$reportUnmatchedProperty(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, unmatchedProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, requireOptionalProperties: bool): void {
        if (!(Symbol__from_ast.$storageOf(((unmatchedProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && !(Node__from_ast.Name(Symbol__from_ast.$storageOf(((unmatchedProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) === undefined) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(Symbol__from_ast.$storageOf(((unmatchedProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) && !(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
            let privateIdentifierDescription = Node__from_ast.Text(Node__from_ast.Name(Symbol__from_ast.$storageOf(((unmatchedProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration));
            let symbolTableKey = GetSymbolNameForPrivateIdentifier__from_binder(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, privateIdentifierDescription);
            if (!(Checker.$go$private$checker$getPropertyOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, symbolTableKey) === undefined)) {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_in_type_1_refers_to_a_different_member_that_cannot_be_accessed_from_within_type_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(privateIdentifierDescription), new GoInterfaceAdapter(Checker.SymbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, ((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol)), new GoInterfaceAdapter(Checker.SymbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, ((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol))]));
                return;
            }
        }
        let props = Checker.$go$private$checker$getUnmatchedProperties((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target, requireOptionalProperties, false);
        if (props.length === 1) {
            const __gotots_results_5 = Checker.$go$private$checker$getTypeNamesForErrorDisplay((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target);
            let sourceType = __gotots_results_5[0];
            let targetType = __gotots_results_5[1];
            let propName = Checker.$go$private$checker$symbolToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, unmatchedProperty);
            Relater.$go$private$checker$reportError(r, $state__diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(propName), new GoInterfaceAdapter(sourceType), new GoInterfaceAdapter(targetType)]));
            if (Symbol__from_ast.$storageOf(((unmatchedProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0) {
                (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInfo = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInfo.append(void 0, [createDiagnosticForNode(Symbol__from_ast.$storageOf(((unmatchedProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0), $state__diagnostics.X_0_is_declared_here, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(propName)]))]);
            }
        }
        else if (Relater.$go$private$checker$tryElaborateArrayLikeErrors(r, source, target, false)) {
            const __gotots_results_6 = Checker.$go$private$checker$getTypeNamesForErrorDisplay((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target);
            let sourceType = __gotots_results_6[0];
            let targetType = __gotots_results_6[1];
            if (props.length > 5) {
                const __gotots_argument_52 = props.slice(0, 4, null);
                const __gotots_receiver_18: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                const __gotots_argument_53 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): gostring => {
                    return Checker.$go$private$checker$symbolToString(__gotots_receiver_18, $argument0);
                };
                const __gotots_argument_54 = Map$PointerTo_Named_ast$Symbol$string(__gotots_argument_52, __gotots_argument_53);
                const __gotots_argument_55 = ", ";
                let propNames = strings__from_gostdlib.Join(__gotots_argument_54, __gotots_argument_55);
                Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sourceType), new GoInterfaceAdapter(targetType), new GoInterfaceAdapter(propNames), new $goInterfaceAdapter$int(props.length - 4)]));
            }
            else {
                const __gotots_argument_56 = props;
                const __gotots_receiver_19: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                const __gotots_argument_57 = ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): gostring => {
                    return Checker.$go$private$checker$symbolToString(__gotots_receiver_19, $argument0);
                };
                const __gotots_argument_58 = Map$PointerTo_Named_ast$Symbol$string(__gotots_argument_56, __gotots_argument_57);
                const __gotots_argument_59 = ", ";
                let propNames = strings__from_gostdlib.Join(__gotots_argument_58, __gotots_argument_59);
                Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(sourceType), new GoInterfaceAdapter(targetType), new GoInterfaceAdapter(propNames)]));
            }
        }
    }
    static $go$private$checker$resetMaybeStack(r: {
        value: Relater;
    } | undefined, maybeStart: int, propagatingVarianceFlags: RelationComparisonResult, markAllAsSucceeded: bool): void {
        for (let i = maybeStart; i < (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys.length; i++) {
            const __gotots_store_9 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            Set__from_collections.Delete<CacheHashKey>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "maybeKeysSet"), CacheHashKey.$copy(CacheHashKey.$fromStorage((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys.get(i))));
            if (markAllAsSucceeded) {
                Relation.$go$private$checker$set((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation, CacheHashKey.$copy(CacheHashKey.$fromStorage((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys.get(i))), (RelationComparisonResultSucceeded$constant() | propagatingVarianceFlags) >>> 0);
                const __gotots_store_10 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                __gotots_store_10.relationCount = __gotots_store_10.relationCount - 1;
            }
        }
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maybeKeys.slice(0, maybeStart, null);
    }
    static $go$private$checker$restoreErrorState(r: {
        value: Relater;
    } | undefined, e: errorState): void {
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = e.errorChain;
        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInfo = e.relatedInfo;
    }
    static $go$private$checker$signatureRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Signature> | undefined, target: tsonicTypeScriptRuntime.Location<Signature> | undefined, erase: bool, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let checkMode = SignatureCheckModeNone$constant();
        __gotots_control_target_15: {
            if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subtypeRelation) {
                checkMode = SignatureCheckModeStrictTopSignature$constant();
            }
            else if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) {
                checkMode = 24;
            }
        }
        if (erase) {
            source = Checker.$go$private$checker$getErasedSignature((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
            target = Checker.$go$private$checker$getErasedSignature((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
        }
        let isRelatedToWorker: (($0: tsonicTypeScriptRuntime.Location<Type> | undefined, $1: tsonicTypeScriptRuntime.Location<Type> | undefined, $2: bool) => Ternary) | undefined = (source__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined, target__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors__shadow_1: bool): Ternary => {
            return Relater.$go$private$checker$isRelatedToEx(r, source__shadow_1, target__shadow_1, RecursionFlagsBoth$constant(), reportErrors__shadow_1, void 0, intersectionState);
        };
        const __gotots_receiver_23: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
        const __gotots_argument_66 = source;
        const __gotots_argument_67 = target;
        const __gotots_argument_68 = checkMode;
        const __gotots_argument_69 = reportErrors;
        const __gotots_receiver_22 = r;
        const __gotots_argument_70 = new ErrorReporter(($argument0: {
            value: Message__from_diagnostics;
        } | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): void => {
            Relater.$go$private$checker$reportError(__gotots_receiver_22, $argument0, $argument1);
        });
        const __gotots_argument_71 = new TypeComparer(isRelatedToWorker);
        const __gotots_argument_72: Checker["reportUnreliableMapper"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportUnreliableMapper;
        return Checker.$go$private$checker$compareSignaturesRelated(__gotots_receiver_23, __gotots_argument_66, __gotots_argument_67, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
    }
    static $go$private$checker$signaturesIdenticalTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, kind: SignatureKind): Ternary {
        let sourceSignatures = Checker.$go$private$checker$getSignaturesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, kind);
        let targetSignatures = Checker.$go$private$checker$getSignaturesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, kind);
        if (sourceSignatures.length !== targetSignatures.length) {
            return TernaryFalse$constant();
        }
        let result = TernaryTrue$constant();
        const __gotots_range_26 = sourceSignatures;
        for (let __gotots_range_index_26 = 0; __gotots_range_index_26 < __gotots_range_26.length; __gotots_range_index_26++) {
            const __gotots_range_value_32 = __gotots_range_index_26;
            let i = __gotots_range_value_32;
            const __gotots_receiver_21: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
            const __gotots_argument_60 = sourceSignatures.get(i);
            const __gotots_argument_61 = targetSignatures.get(i);
            const __gotots_argument_62 = false;
            const __gotots_argument_63 = false;
            const __gotots_argument_64 = false;
            const __gotots_receiver_20 = r;
            const __gotots_argument_65 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary => {
                return Relater.$go$private$checker$isRelatedToSimple(__gotots_receiver_20, $argument0, $argument1);
            };
            let related = Checker.$go$private$checker$compareSignaturesIdentical(__gotots_receiver_21, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
            if (related === 0) {
                return TernaryFalse$constant();
            }
            result = result & related;
        }
        return result;
    }
    static $go$private$checker$signaturesRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, kind: SignatureKind, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
            return Relater.$go$private$checker$signaturesIdenticalTo(r, source, target, kind);
        }
        if (tsonicTypeScriptRuntime.sameLocation(source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyFunctionType)) {
            return TernaryTrue$constant();
        }
        if (tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyFunctionType)) {
            return TernaryFalse$constant();
        }
        let sourceSignatures = Checker.$go$private$checker$getSignaturesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, kind);
        let targetSignatures = Checker.$go$private$checker$getSignaturesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, kind);
        if (kind === SignatureKindConstruct$constant() && sourceSignatures.length !== 0 && targetSignatures.length !== 0) {
            let sourceIsAbstract = !((Signature.$storageOf(((sourceSignatures.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0);
            let targetIsAbstract = !((Signature.$storageOf(((targetSignatures.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0);
            if (sourceIsAbstract && !targetIsAbstract) {
                if (reportErrors) {
                    Relater.$go$private$checker$reportError(r, $state__diagnostics.Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type, RuntimeSlice.nil<GoInterface | undefined>());
                }
                return TernaryFalse$constant();
            }
            if (!Relater.$go$private$checker$constructorVisibilitiesAreCompatible(r, sourceSignatures.get(0), targetSignatures.get(0), reportErrors)) {
                return TernaryFalse$constant();
            }
        }
        let result = TernaryTrue$constant();
        __gotots_control_target_13: {
            if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsInstantiated$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsInstantiated$constant()) >>> 0 === 0) &&
                tsonicTypeScriptRuntime.sameLocation(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, ((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol) || !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) &&
                tsonicTypeScriptRuntime.sameLocation(Type.Target(source), Type.Target(target))) {
                const __gotots_range_13 = targetSignatures;
                for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
                    const __gotots_range_value_17 = __gotots_range_index_13;
                    let i = __gotots_range_value_17;
                    let related = Relater.$go$private$checker$signatureRelatedTo(r, sourceSignatures.get(i), targetSignatures.get(i), true, reportErrors, intersectionState);
                    if (related === TernaryFalse$constant()) {
                        return TernaryFalse$constant();
                    }
                    result = result & related;
                }
            }
            else if (sourceSignatures.length === 1 && targetSignatures.length === 1) {
                let eraseGenerics = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation;
                result = Relater.$go$private$checker$signatureRelatedTo(r, sourceSignatures.get(0), targetSignatures.get(0), eraseGenerics, reportErrors, intersectionState);
            }
            else {
                const __gotots_range_14 = targetSignatures;
                outer__label_1: for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
                    const __gotots_range_value_18 = __gotots_range_14.get(__gotots_range_index_14);
                    let t: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_18;
                    let saveErrorState = Relater.$go$private$checker$getErrorState(r);
                    let shouldElaborateErrors = reportErrors;
                    const __gotots_range_15 = sourceSignatures;
                    for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
                        const __gotots_range_value_19 = __gotots_range_15.get(__gotots_range_index_15);
                        let s: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_19;
                        let related = Relater.$go$private$checker$signatureRelatedTo(r, s, t, true, shouldElaborateErrors, intersectionState);
                        if (!(related === TernaryFalse$constant())) {
                            result = result & related;
                            Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
                            continue outer__label_1;
                        }
                        shouldElaborateErrors = false;
                    }
                    if (shouldElaborateErrors) {
                        Relater.$go$private$checker$reportError(r, $state__diagnostics.Type_0_provides_no_match_for_the_signature_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)), new GoInterfaceAdapter(Checker.$go$private$checker$signatureToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, t))]));
                    }
                    return TernaryFalse$constant();
                }
            }
        }
        return result;
    }
    static $go$private$checker$someTypeRelatedToType(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let sourceTypes = Type.Types(source);
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && containsType(sourceTypes, target)) {
            return TernaryTrue$constant();
        }
        const __gotots_range_2 = sourceTypes;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_index_2;
            const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_3;
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_4;
            let related = Relater.$go$private$checker$isRelatedToEx(r, t, target, RecursionFlagsSource$constant(), reportErrors && i === sourceTypes.length - 1, void 0, intersectionState);
            if (!(related === TernaryFalse$constant())) {
                return related;
            }
        }
        return TernaryFalse$constant();
    }
    static $go$private$checker$structuredTypeRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let saveErrorState = Relater.$go$private$checker$getErrorState(r);
        let result = Relater.$go$private$checker$structuredTypeRelatedToWorker(r, source, target, reportErrors, intersectionState);
        if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation)) {
            if (result === TernaryFalse$constant() && (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) || !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0))) {
                let sourceTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0)) {
                    sourceTypes = Type.Types(source);
                }
                else {
                    sourceTypes = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([source]);
                }
                let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getEffectiveConstraintOfIntersection((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceTypes, !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0));
                if (!(constraint === undefined) && everyType(constraint, (c: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
                    return !tsonicTypeScriptRuntime.sameLocation(c, source);
                })) {
                    result = Relater.$go$private$checker$isRelatedToEx(r, constraint, target, RecursionFlagsSource$constant(), false, void 0, intersectionState);
                }
            }
            __gotots_control_target_4: {
                if (!(result === TernaryFalse$constant()) && (intersectionState & IntersectionStateTarget$constant()) >>> 0 === 0 && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) && !Checker.$go$private$checker$isGenericObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target) && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (269484032)) >>> 0 === 0)) {
                    result = result & Relater.$go$private$checker$propertiesRelatedTo(r, source, target, reportErrors, Set__from_collections.$fromStorage<gostring>({
                        M: $goMap$MapOf_string_To_Struct_void.nil()
                    }), false, IntersectionStateNone$constant());
                    if (!(result === 0) && isObjectLiteralType(source) && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsFreshLiteral$constant()) >>> 0 === 0)) {
                        result = result & Relater.$go$private$checker$indexSignaturesRelatedTo(r, source, target, false, reportErrors, IntersectionStateNone$constant());
                    }
                }
                else if (!(result === 0) && Checker.$go$private$checker$isNonGenericObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target) && !Checker.$go$private$checker$isArrayOrTupleType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target) && Relater.$go$private$checker$isSourceIntersectionNeedingExtraCheck(r, source, target)) {
                    result = result & Relater.$go$private$checker$propertiesRelatedTo(r, source, target, reportErrors, Set__from_collections.$fromStorage<gostring>({
                        M: $goMap$MapOf_string_To_Struct_void.nil()
                    }), true, intersectionState);
                }
            }
        }
        if (!(result === TernaryFalse$constant())) {
            Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
        }
        return result;
    }
    static $go$private$checker$structuredTypeRelatedToWorker(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let result = 0;
        let varianceCheckFailed = false;
        let originalErrorChain: {
            value: ErrorChain;
        } | undefined = void 0;
        let saveErrorState = Relater.$go$private$checker$getErrorState(r);
        let relateVariances: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, $1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, $2: RuntimeSlice<VarianceFlags>, $3: IntersectionState) => [
            Ternary,
            bool
        ]) | undefined = (sourceTypeArguments: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, targetTypeArguments: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, variances: RuntimeSlice<VarianceFlags>, intersectionState__shadow_1: IntersectionState): [
            Ternary,
            bool
        ] => {
            {
                result = Relater.$go$private$checker$typeArgumentsRelatedTo(r, sourceTypeArguments, targetTypeArguments, variances, reportErrors, intersectionState__shadow_1);
                if (!(result === TernaryFalse$constant())) {
                    return [result, true];
                }
            }
            if (Some$Named_checker$VarianceFlags(variances, (v: VarianceFlags): bool => {
                return !((v & VarianceFlagsAllowsStructuralFallback$constant()) >>> 0 === 0);
            })) {
                originalErrorChain = void 0;
                Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
                return [TernaryFalse$constant(), false];
            }
            let allowStructuralFallback = Checker.$go$private$checker$hasCovariantVoidArgument((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetTypeArguments, variances);
            varianceCheckFailed = !allowStructuralFallback;
            if (variances.length !== 0 && !allowStructuralFallback) {
                if (varianceCheckFailed && !(reportErrors && Some$Named_checker$VarianceFlags(variances, (v: VarianceFlags): bool => {
                    return ((v & VarianceFlagsVarianceMask$constant()) >>> 0) === VarianceFlagsInvariant$constant();
                }))) {
                    return [TernaryFalse$constant(), true];
                }
                originalErrorChain = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain;
                Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
            }
            return [TernaryFalse$constant(), false];
        };
        __gotots_control_target_6: {
            if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
                __gotots_control_target_7: {
                    if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnionOrIntersection$constant()) >>> 0 === 0)) {
                        let result__shadow_1 = Relater.$go$private$checker$eachTypeRelatedToSomeType(r, source, target);
                        if (!(result__shadow_1 === TernaryFalse$constant())) {
                            result__shadow_1 = result__shadow_1 & Relater.$go$private$checker$eachTypeRelatedToSomeType(r, target, source);
                        }
                        return result__shadow_1;
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
                        return Relater.$go$private$checker$isRelatedTo(r, Type.Target(source), Type.Target(target), RecursionFlagsBoth$constant(), false);
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0)) {
                        result = Relater.$go$private$checker$isRelatedTo(r, (Type.AsIndexedAccessType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, (Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, RecursionFlagsBoth$constant(), false);
                        if (!(result === TernaryFalse$constant())) {
                            result = result & Relater.$go$private$checker$isRelatedTo(r, (Type.AsIndexedAccessType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, (Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, RecursionFlagsBoth$constant(), false);
                            if (!(result === TernaryFalse$constant())) {
                                return result;
                            }
                        }
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                        if (((Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isDistributive === ((Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isDistributive) {
                            result = Relater.$go$private$checker$isRelatedTo(r, (Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, (Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, RecursionFlagsBoth$constant(), false);
                            if (!(result === TernaryFalse$constant())) {
                                result = result & Relater.$go$private$checker$isRelatedTo(r, (Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType, (Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType, RecursionFlagsBoth$constant(), false);
                                if (!(result === TernaryFalse$constant())) {
                                    result = result & Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getTrueTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), Checker.$go$private$checker$getTrueTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsBoth$constant(), false);
                                    if (!(result === TernaryFalse$constant())) {
                                        result = result & Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getFalseTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), Checker.$go$private$checker$getFalseTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsBoth$constant(), false);
                                        if (!(result === TernaryFalse$constant())) {
                                            return result;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSubstitution$constant()) >>> 0 === 0)) {
                        result = Relater.$go$private$checker$isRelatedTo(r, (Type.AsSubstitutionType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType, (Type.AsSubstitutionType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType, RecursionFlagsBoth$constant(), false);
                        if (!(result === TernaryFalse$constant())) {
                            result = result & Relater.$go$private$checker$isRelatedTo(r, (Type.AsSubstitutionType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint, (Type.AsSubstitutionType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.constraint, RecursionFlagsBoth$constant(), false);
                            if (!(result === TernaryFalse$constant())) {
                                return result;
                            }
                        }
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0)) {
                        if (Equal$SliceOf_string$string((Type.AsTemplateLiteralType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.texts, (Type.AsTemplateLiteralType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.texts)) {
                            result = TernaryTrue$constant();
                            const __gotots_range_6: TemplateLiteralType["types"] = (Type.AsTemplateLiteralType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types;
                            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                                const __gotots_range_value_9 = __gotots_range_index_6;
                                const __gotots_range_value_10 = __gotots_range_6.get(__gotots_range_index_6);
                                let i = __gotots_range_value_9;
                                let sourceType: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_10;
                                let targetType: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsTemplateLiteralType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types.get(i);
                                result = result & Relater.$go$private$checker$isRelatedTo(r, sourceType, targetType, RecursionFlagsBoth$constant(), false);
                                if (result === TernaryFalse$constant()) {
                                    return result;
                                }
                            }
                            return result;
                        }
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
                        const __gotots_store_11 = (Type.AsStringMappingType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConstrainedType.TypeBase;
                        const __gotots_equal_operand_1 = Type.Symbol(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Type"));
                        const __gotots_store_12 = (Type.AsStringMappingType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConstrainedType.TypeBase;
                        if (tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_1, Type.Symbol(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Type")))) {
                            return Relater.$go$private$checker$isRelatedTo(r, (Type.AsStringMappingType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, (Type.AsStringMappingType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, RecursionFlagsBoth$constant(), false);
                        }
                    }
                }
                if ((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) {
                    return TernaryFalse$constant();
                }
            }
            else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnionOrIntersection$constant()) >>> 0 === 0) || !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnionOrIntersection$constant()) >>> 0 === 0)) {
                result = Relater.$go$private$checker$unionOrIntersectionRelatedTo(r, source, target, reportErrors, intersectionState);
                if (!(result === TernaryFalse$constant())) {
                    return result;
                }
                if (!(!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsInstantiable$constant()) >>> 0 === 0) || !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) || !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (267911168)) >>> 0 === 0))) {
                    return TernaryFalse$constant();
                }
            }
        }
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (68157440)) >>> 0 === 0) && !(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArguments.length !== 0 && !(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) &&
            tsonicTypeScriptRuntime.sameLocation((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol, (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol) && !(Checker.$go$private$checker$isMarkerType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) || Checker.$go$private$checker$isMarkerType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))) {
            let variances = Checker.$go$private$checker$getAliasVariances((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol);
            if (variances.length === 0) {
                return TernaryUnknown$constant();
            }
            const __gotots_store_13 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let params = TypeAliasLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$TypeAliasLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "typeAliasLinks"), (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasLinks>).value).typeParameters;
            let minParams = Checker.$go$private$checker$getMinTypeArgumentCount((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, params);
            let nodeIsInJsFile = IsInJSFile__from_ast(Symbol__from_ast.$storageOf((((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
            let sourceTypes = Checker.$go$private$checker$fillMissingTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArguments, params, minParams, nodeIsInJsFile);
            let targetTypes = Checker.$go$private$checker$fillMissingTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeArguments, params, minParams, nodeIsInJsFile);
            const __gotots_callee_1 = relateVariances;
            const __gotots_argument_24 = sourceTypes;
            const __gotots_argument_25 = targetTypes;
            const __gotots_argument_26 = variances;
            const __gotots_argument_27 = intersectionState;
            const __gotots_results_3 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
            let varianceResult = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                return varianceResult;
            }
        }
        if (isSingleElementGenericTupleType(source) && !(Type.TargetTupleType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly) {
            result = Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source).get(0), target, RecursionFlagsSource$constant(), false);
            if (!(result === TernaryFalse$constant())) {
                return result;
            }
        }
        if (isSingleElementGenericTupleType(target) && ((Type.TargetTupleType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly || Checker.$go$private$checker$isMutableArrayOrTuple((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getBaseConstraintOrType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)))) {
            result = Relater.$go$private$checker$isRelatedTo(r, source, Checker.$go$private$checker$getTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target).get(0), RecursionFlagsTarget$constant(), false);
            if (!(result === TernaryFalse$constant())) {
                return result;
            }
        }
        __gotots_control_target_8: {
            if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0)) {
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsMapped$constant()) >>> 0 === 0) && ((Type.AsMappedType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType === undefined && !(Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getIndexType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), Checker.$go$private$checker$getConstraintTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), RecursionFlagsBoth$constant(), false) === TernaryFalse$constant())) {
                    if ((getMappedTypeModifiers(source) & MappedTypeModifiersIncludeOptional$constant()) >>> 0 === 0) {
                        let templateType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTemplateTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                        let indexedAccessType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getIndexedAccessType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, Checker.$go$private$checker$getTypeParameterFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source));
                        result = Relater.$go$private$checker$isRelatedTo(r, templateType, indexedAccessType, RecursionFlagsBoth$constant(), reportErrors);
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                }
                if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation
                    && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0)) {
                    {
                        let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintOfTypeParameter((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                        if (!(constraint === undefined) && someType(constraint, (c: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
                            return !((((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0);
                        })) {
                            return Relater.$go$private$checker$isRelatedTo(r, constraint, target, RecursionFlagsSource$constant(), false);
                        }
                    }
                    return TernaryFalse$constant();
                }
            }
            else if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0)) {
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0)) {
                    result = Relater.$go$private$checker$isRelatedTo(r, (Type.AsIndexedAccessType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, (Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, RecursionFlagsBoth$constant(), reportErrors);
                    if (!(result === TernaryFalse$constant())) {
                        result = result & Relater.$go$private$checker$isRelatedTo(r, (Type.AsIndexedAccessType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, (Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, RecursionFlagsBoth$constant(), reportErrors);
                    }
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                    if (reportErrors) {
                        originalErrorChain = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain;
                    }
                }
                if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.assignableRelation
                    ||
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                            ===
                                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) {
                    let objectType: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType;
                    let indexType: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexedAccessType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType;
                    let baseObjectType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOrType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, objectType);
                    let baseIndexType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOrType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, indexType);
                    if (!Checker.$go$private$checker$isGenericObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, baseObjectType) && !Checker.$go$private$checker$isGenericIndexType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, baseIndexType)) {
                        let accessFlags = (AccessFlagsWriting$constant() | IfElse$Named_checker$AccessFlags(!tsonicTypeScriptRuntime.sameLocation(baseObjectType, objectType), AccessFlagsNoIndexSignatures$constant(), 0)) >>> 0;
                        let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getIndexedAccessTypeOrUndefined((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, baseObjectType, baseIndexType, accessFlags, void 0, void 0);
                        if (!(constraint === undefined)) {
                            if (reportErrors && !(originalErrorChain === undefined)) {
                                Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
                            }
                            result = Relater.$go$private$checker$isRelatedToEx(r, source, constraint, RecursionFlagsTarget$constant(), reportErrors, void 0, intersectionState);
                            if (!(result === TernaryFalse$constant())) {
                                return result;
                            }
                            if (reportErrors && !(originalErrorChain === undefined) && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain === undefined)) {
                                if (chainDepth(originalErrorChain) <= chainDepth((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain)) {
                                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = originalErrorChain;
                                }
                            }
                        }
                    }
                }
                if (reportErrors) {
                    originalErrorChain = void 0;
                }
            }
            else if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
                let targetType: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
                    result = Relater.$go$private$checker$isRelatedTo(r, targetType, (Type.AsIndexType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, RecursionFlagsBoth$constant(), false);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                }
                if (isTupleType(targetType)) {
                    result = Relater.$go$private$checker$isRelatedTo(r, source, Checker.$go$private$checker$getKnownKeysOfTupleType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType), RecursionFlagsTarget$constant(), reportErrors);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                }
                else {
                    let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getSimplifiedTypeOrConstraint((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType);
                    if (!(constraint === undefined)) {
                        if (Relater.$go$private$checker$isRelatedTo(r, source, Checker.$go$private$checker$getIndexTypeEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, constraint, ((Type.AsIndexType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexFlags | IndexFlagsNoReducibleCheck$constant()) >>> 0), RecursionFlagsTarget$constant(), reportErrors) === TernaryTrue$constant()) {
                            return TernaryTrue$constant();
                        }
                    }
                    else if (Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType)) {
                        let nameType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getNameTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType);
                        let constraintType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType);
                        let targetKeys: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                        if (!(nameType === undefined) && Checker.$go$private$checker$isMappedTypeWithKeyofConstraintDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetType)) {
                            let mappedKeys: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getApparentMappedTypeKeys((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, nameType, targetType);
                            targetKeys = Checker.$go$private$checker$getUnionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([mappedKeys, nameType]));
                        }
                        else if (!(nameType === undefined)) {
                            targetKeys = nameType;
                        }
                        else {
                            targetKeys = constraintType;
                        }
                        if (Relater.$go$private$checker$isRelatedTo(r, source, targetKeys, RecursionFlagsTarget$constant(), reportErrors) === TernaryTrue$constant()) {
                            return TernaryTrue$constant();
                        }
                    }
                }
            }
            else if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                if (Checker.$go$private$checker$isDeeplyNestedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.targetStack, 10)) {
                    return TernaryMaybe$constant();
                }
                let c: {
                    value: ConditionalType;
                } | undefined = Type.AsConditionalType(target);
                if (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters.isNil() && !Checker.$go$private$checker$isDistributionDependent((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root) && !(!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0) &&
                    (Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root
                        ===
                            (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root)) {
                    let skipTrue = !Checker.$go$private$checker$isTypeAssignableTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getPermissiveInstantiation((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType), Checker.$go$private$checker$getPermissiveInstantiation((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType));
                    let skipFalse = !skipTrue && Checker.$go$private$checker$isTypeAssignableTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getRestrictiveInstantiation((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType), Checker.$go$private$checker$getRestrictiveInstantiation((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType));
                    if (skipTrue) {
                        result = TernaryTrue$constant();
                    }
                    else {
                        result = Relater.$go$private$checker$isRelatedToEx(r, source, Checker.$go$private$checker$getTrueTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsTarget$constant(), false, void 0, intersectionState);
                    }
                    if (!(result === TernaryFalse$constant())) {
                        if (skipFalse) {
                            result = result & -1;
                        }
                        else {
                            result = result & Relater.$go$private$checker$isRelatedToEx(r, source, Checker.$go$private$checker$getFalseTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsTarget$constant(), false, void 0, intersectionState);
                        }
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                }
            }
            else if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0)) {
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0)) {
                    if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                        ===
                            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) {
                        if (Checker.$go$private$checker$templateLiteralTypesDefinitelyUnrelated((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Type.AsTemplateLiteralType(source), Type.AsTemplateLiteralType(target))) {
                            return TernaryFalse$constant();
                        }
                        return TernaryTrue$constant();
                    }
                    Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportUnreliableMapper);
                }
                const __gotots_receiver_10: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                const __gotots_argument_28 = source;
                const __gotots_argument_29 = Type.AsTemplateLiteralType(target);
                const __gotots_receiver_9 = r;
                const __gotots_argument_30 = new TypeComparer(($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument2: bool): Ternary => {
                    return Relater.$go$private$checker$isRelatedToWorker(__gotots_receiver_9, $argument0, $argument1, $argument2);
                });
                if (Checker.$go$private$checker$isTypeMatchedByTemplateLiteralType(__gotots_receiver_10, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30)) {
                    return TernaryTrue$constant();
                }
            }
            else if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
                if ((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0) {
                    if (Checker.$go$private$checker$isMemberOfStringMapping((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, target)) {
                        return TernaryTrue$constant();
                    }
                }
            }
            else if (Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target) && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation)) {
                let keysRemapped = !(((Type.AsMappedType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType === undefined);
                let templateType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTemplateTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                let modifiers = getMappedTypeModifiers(target);
                if ((modifiers & MappedTypeModifiersExcludeOptional$constant()) >>> 0 === 0) {
                    if (!keysRemapped && !((((templateType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) &&
                        tsonicTypeScriptRuntime.sameLocation((Type.AsIndexedAccessType(templateType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, source) &&
                        tsonicTypeScriptRuntime.sameLocation((Type.AsIndexedAccessType(templateType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, Checker.$go$private$checker$getTypeParameterFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))) {
                        return TernaryTrue$constant();
                    }
                    if (!Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                        let targetKeys: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                        if (keysRemapped) {
                            targetKeys = Checker.$go$private$checker$getNameTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                        }
                        else {
                            targetKeys = Checker.$go$private$checker$getConstraintTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                        }
                        let sourceKeys: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getIndexTypeEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, IndexFlagsNoIndexSignatures$constant());
                        let includeOptional = !((modifiers & MappedTypeModifiersIncludeOptional$constant()) >>> 0 === 0);
                        let filteredByApplicability: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                        if (includeOptional) {
                            filteredByApplicability = Checker.$go$private$checker$intersectTypes((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, targetKeys, sourceKeys);
                        }
                        if (includeOptional && (((filteredByApplicability ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0 || !includeOptional && !(Relater.$go$private$checker$isRelatedTo(r, targetKeys, sourceKeys, RecursionFlagsBoth$constant(), false) === TernaryFalse$constant())) {
                            let templateType__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTemplateTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                            let typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeParameterFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                            let nonNullComponent: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$extractTypesOfKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, templateType__shadow_1, 4294967283);
                            if (!keysRemapped && !((((nonNullComponent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) &&
                                tsonicTypeScriptRuntime.sameLocation((Type.AsIndexedAccessType(nonNullComponent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType, typeParameter)) {
                                result = Relater.$go$private$checker$isRelatedTo(r, source, (Type.AsIndexedAccessType(nonNullComponent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, RecursionFlagsTarget$constant(), reportErrors);
                                if (!(result === TernaryFalse$constant())) {
                                    return result;
                                }
                            }
                            else {
                                let indexingType: tsonicTypeScriptRuntime.Location<Type> | undefined = typeParameter;
                                __gotots_control_target_9: {
                                    if (keysRemapped) {
                                        indexingType = OrElse$PointerTo_Named_checker$Type(filteredByApplicability, targetKeys);
                                    }
                                    else if (!(filteredByApplicability === undefined)) {
                                        indexingType = Checker.$go$private$checker$getIntersectionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([filteredByApplicability, typeParameter]));
                                    }
                                }
                                let indexedAccessType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getIndexedAccessType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, indexingType);
                                result = Relater.$go$private$checker$isRelatedTo(r, indexedAccessType, templateType__shadow_1, RecursionFlagsBoth$constant(), reportErrors);
                                if (!(result === TernaryFalse$constant())) {
                                    return result;
                                }
                            }
                        }
                        originalErrorChain = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain;
                        Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
                    }
                }
            }
        }
        __gotots_control_target_10: {
            if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeVariable$constant()) >>> 0 === 0)) {
                if ((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0 || (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0) {
                    let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                    if (constraint === undefined) {
                        constraint = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownType;
                    }
                    result = Relater.$go$private$checker$isRelatedToEx(r, constraint, target, RecursionFlagsSource$constant(), false, void 0, intersectionState);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                    let constraintWithThis: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeWithThisArgument((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, constraint, source, false);
                    result = Relater.$go$private$checker$isRelatedToEx(r, constraintWithThis, target, RecursionFlagsSource$constant(), reportErrors && !tsonicTypeScriptRuntime.sameLocation(constraint, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownType) && ((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & ((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags) >>> 0 & TypeFlagsTypeParameter$constant()) >>> 0 === 0, void 0, intersectionState);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                    if (Checker.$go$private$checker$isMappedTypeGenericIndexedAccess((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                        let indexConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (Type.AsIndexedAccessType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType);
                        if (!(indexConstraint === undefined)) {
                            result = Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getIndexedAccessType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (Type.AsIndexedAccessType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType, indexConstraint), target, RecursionFlagsSource$constant(), reportErrors);
                            if (!(result === TernaryFalse$constant())) {
                                return result;
                            }
                        }
                    }
                }
            }
            else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
                let isDeferredMappedIndex = Checker.$go$private$checker$shouldDeferIndexType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (Type.AsIndexType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, (Type.AsIndexType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexFlags) && !(((((Type.AsIndexType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsMapped$constant()) >>> 0 === 0);
                result = Relater.$go$private$checker$isRelatedTo(r, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringNumberSymbolType, target, RecursionFlagsSource$constant(), reportErrors && !isDeferredMappedIndex);
                if (!(result === TernaryFalse$constant())) {
                    return result;
                }
                if (isDeferredMappedIndex) {
                    let mappedType: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsIndexType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target;
                    let nameType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getNameTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, mappedType);
                    let sourceMappedKeys: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                    if (!(nameType === undefined) && Checker.$go$private$checker$isMappedTypeWithKeyofConstraintDeclaration((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, mappedType)) {
                        sourceMappedKeys = Checker.$go$private$checker$getApparentMappedTypeKeys((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, nameType, mappedType);
                    }
                    else if (!(nameType === undefined)) {
                        sourceMappedKeys = nameType;
                    }
                    else {
                        sourceMappedKeys = Checker.$go$private$checker$getConstraintTypeFromMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, mappedType);
                    }
                    result = Relater.$go$private$checker$isRelatedTo(r, sourceMappedKeys, target, RecursionFlagsSource$constant(), reportErrors);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                }
            }
            else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                if (Checker.$go$private$checker$isDeeplyNestedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceStack, 10)) {
                    return TernaryMaybe$constant();
                }
                if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                    let sourceParams: ConditionalRoot["inferTypeParameters"] = ((Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters;
                    let sourceExtends: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType;
                    let mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined = void 0;
                    if (sourceParams.length !== 0) {
                        const __gotots_receiver_12: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                        const __gotots_argument_31 = sourceParams;
                        const __gotots_argument_32 = void 0;
                        const __gotots_argument_33 = InferenceFlagsNone$constant();
                        const __gotots_receiver_11 = r;
                        const __gotots_argument_34 = new TypeComparer(($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument2: bool): Ternary => {
                            return Relater.$go$private$checker$isRelatedToWorker(__gotots_receiver_11, $argument0, $argument1, $argument2);
                        });
                        let ctx: {
                            value: InferenceContext;
                        } | undefined = Checker.$go$private$checker$newInferenceContext(__gotots_receiver_12, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34);
                        Checker.$go$private$checker$inferTypes((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, (ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferences, (Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType, sourceExtends, 1536, false);
                        sourceExtends = Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceExtends, (ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
                        mapper = (ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper;
                    }
                    if (Checker.$go$private$checker$isTypeIdenticalTo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceExtends, (Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType) && (!(Relater.$go$private$checker$isRelatedTo(r, (Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, (Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, RecursionFlagsBoth$constant(), false) === 0) || !(Relater.$go$private$checker$isRelatedTo(r, (Type.AsConditionalType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, (Type.AsConditionalType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, RecursionFlagsBoth$constant(), false) === 0))) {
                        result = Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Checker.$go$private$checker$getTrueTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), mapper), Checker.$go$private$checker$getTrueTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsBoth$constant(), reportErrors);
                        if (!(result === TernaryFalse$constant())) {
                            result = result & Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getFalseTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), Checker.$go$private$checker$getFalseTypeFromConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target), RecursionFlagsBoth$constant(), reportErrors);
                        }
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                }
                let defaultConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDefaultConstraintOfConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                if (!(defaultConstraint === undefined)) {
                    result = Relater.$go$private$checker$isRelatedTo(r, defaultConstraint, target, RecursionFlagsSource$constant(), reportErrors);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                }
                if ((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0 && Checker.$go$private$checker$hasNonCircularBaseConstraint((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                    let distributiveConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintOfDistributiveConditionalType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                    if (!(distributiveConstraint === undefined)) {
                        Relater.$go$private$checker$restoreErrorState(r, errorState.$copy(saveErrorState));
                        result = Relater.$go$private$checker$isRelatedTo(r, distributiveConstraint, target, RecursionFlagsSource$constant(), reportErrors);
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                }
            }
            else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0) && (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) {
                if ((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0) {
                    let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                    if (!(constraint === undefined) && !tsonicTypeScriptRuntime.sameLocation(constraint, source)) {
                        result = Relater.$go$private$checker$isRelatedTo(r, constraint, target, RecursionFlagsSource$constant(), reportErrors);
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                }
            }
            else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
                if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
                    if (!tsonicTypeScriptRuntime.sameLocation((Type.AsStringMappingType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConstrainedType.TypeBase.Type.__go_symbol, (Type.AsStringMappingType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConstrainedType.TypeBase.Type.__go_symbol)) {
                        return TernaryFalse$constant();
                    }
                    result = Relater.$go$private$checker$isRelatedTo(r, (Type.AsStringMappingType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, (Type.AsStringMappingType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.target, RecursionFlagsBoth$constant(), reportErrors);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                }
                else {
                    let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                    if (!(constraint === undefined)) {
                        result = Relater.$go$private$checker$isRelatedTo(r, constraint, target, RecursionFlagsSource$constant(), reportErrors);
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                }
            }
            else {
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subtypeRelation) && !((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) && isPartialMappedType(target) && Checker.$go$private$checker$isEmptyObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                    return TernaryTrue$constant();
                }
                if (Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target)) {
                    if (Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                        result = Relater.$go$private$checker$mappedTypeRelatedTo(r, source, target, reportErrors);
                        if (!(result === TernaryFalse$constant())) {
                            return result;
                        }
                    }
                    return TernaryFalse$constant();
                }
                let sourceIsPrimitive = !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0);
                if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                    ===
                        ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation)) {
                    source = Checker.$go$private$checker$getApparentType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                }
                else if (Checker.$go$private$checker$isGenericMappedType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                    return TernaryFalse$constant();
                }
                {
                    let __gotots_switch_selection_4 = -1;
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_10 = false;
                        if (!__gotots_switch_match_10) {
                            __gotots_switch_match_10 = !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) &&
                                tsonicTypeScriptRuntime.sameLocation(Type.Target(source), Type.Target(target)) && !isTupleType(source) && !Checker.$go$private$checker$isMarkerType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) && !Checker.$go$private$checker$isMarkerType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                        }
                        if (__gotots_switch_match_10) {
                            __gotots_switch_selection_4 = 0;
                        }
                    }
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_11 = false;
                        if (!__gotots_switch_match_11) {
                            let __gotots_logical_result_4 = Checker.$go$private$checker$isArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                            if (__gotots_logical_result_4) {
                                let __gotots_logical_result_3 = Checker.$go$private$checker$isReadonlyArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                                if (__gotots_logical_result_3) {
                                    const __gotots_argument_39 = source;
                                    const __gotots_receiver_13: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
                                    const __gotots_argument_40 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
                                        return Checker.$go$private$checker$isArrayOrTupleType(__gotots_receiver_13, $argument0);
                                    };
                                    __gotots_logical_result_3 = everyType(__gotots_argument_39, __gotots_argument_40);
                                }
                                __gotots_logical_result_4 = (__gotots_logical_result_3 || everyType(source, isMutableTupleType));
                            }
                            __gotots_switch_match_11 = __gotots_logical_result_4;
                        }
                        if (__gotots_switch_match_11) {
                            __gotots_switch_selection_4 = 1;
                        }
                    }
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_12 = false;
                        if (!__gotots_switch_match_12) {
                            __gotots_switch_match_12 = Checker.$go$private$checker$isGenericTupleType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) && isTupleType(target) && !Checker.$go$private$checker$isGenericTupleType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                        }
                        if (__gotots_switch_match_12) {
                            __gotots_switch_selection_4 = 2;
                        }
                    }
                    if (__gotots_switch_selection_4 === -1) {
                        let __gotots_switch_match_13 = false;
                        if (!__gotots_switch_match_13) {
                            __gotots_switch_match_13 = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                                ===
                                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subtypeRelation
                                ||
                                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                                        ===
                                            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) && Checker.$go$private$checker$isEmptyObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsFreshLiteral$constant()) >>> 0 === 0) && !Checker.$go$private$checker$isEmptyObjectType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                        }
                        if (__gotots_switch_match_13) {
                            __gotots_switch_selection_4 = 3;
                        }
                    }
                    __gotots_control_target_11: switch (__gotots_switch_selection_4) {
                        case 0: {
                            if (Checker.$go$private$checker$isEmptyArrayLiteralType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
                                return TernaryTrue$constant();
                            }
                            let variances = Checker.$go$private$checker$getVariances((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, Type.Target(source));
                            if (variances.length === 0) {
                                return TernaryUnknown$constant();
                            }
                            const __gotots_callee_2 = relateVariances;
                            const __gotots_argument_35 = Checker.$go$private$checker$getTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                            const __gotots_argument_36 = Checker.$go$private$checker$getTypeArguments((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
                            const __gotots_argument_37 = variances;
                            const __gotots_argument_38 = intersectionState;
                            const __gotots_results_4 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35, __gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
                            let varianceResult = __gotots_results_4[0];
                            let ok = __gotots_results_4[1];
                            if (ok) {
                                return varianceResult;
                            }
                            break;
                        }
                        case 1: {
                            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                                ===
                                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation)) {
                                return Relater.$go$private$checker$isRelatedTo(r, Checker.$go$private$checker$getIndexTypeOfTypeEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.numberType, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyType), Checker.$go$private$checker$getIndexTypeOfTypeEx((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.numberType, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyType), RecursionFlagsBoth$constant(), reportErrors);
                            }
                            return TernaryFalse$constant();
                            break;
                        }
                        case 2: {
                            let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOrType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
                            if (!tsonicTypeScriptRuntime.sameLocation(constraint, source)) {
                                return Relater.$go$private$checker$isRelatedTo(r, constraint, target, RecursionFlagsSource$constant(), reportErrors);
                            }
                            break;
                        }
                        case 3: {
                            return TernaryFalse$constant();
                            break;
                        }
                    }
                }
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (269484032)) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0)) {
                    let reportStructuralErrors = reportErrors &&
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain
                            ===
                                saveErrorState.errorChain && !sourceIsPrimitive;
                    result = Relater.$go$private$checker$propertiesRelatedTo(r, source, target, reportStructuralErrors, Set__from_collections.$fromStorage<gostring>({
                        M: $goMap$MapOf_string_To_Struct_void.nil()
                    }), false, intersectionState);
                    if (!(result === TernaryFalse$constant())) {
                        result = result & Relater.$go$private$checker$signaturesRelatedTo(r, source, target, SignatureKindCall$constant(), reportStructuralErrors, intersectionState);
                        if (!(result === TernaryFalse$constant())) {
                            result = result & Relater.$go$private$checker$signaturesRelatedTo(r, source, target, SignatureKindConstruct$constant(), reportStructuralErrors, intersectionState);
                            if (!(result === TernaryFalse$constant())) {
                                result = result & Relater.$go$private$checker$indexSignaturesRelatedTo(r, source, target, sourceIsPrimitive, reportStructuralErrors, intersectionState);
                            }
                        }
                    }
                    if (!(result === TernaryFalse$constant())) {
                        if (!varianceCheckFailed) {
                            return result;
                        }
                        if (!(originalErrorChain === undefined)) {
                            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = originalErrorChain;
                        }
                        else if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain === undefined) {
                            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorChain = saveErrorState.errorChain;
                        }
                    }
                }
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (269484032)) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                    let objectOnlyTarget: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$extractTypesOfKind((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, 286261248);
                    if (!((((objectOnlyTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                        let result__shadow_1 = Relater.$go$private$checker$typeRelatedToDiscriminatedType(r, source, objectOnlyTarget);
                        if (!(result__shadow_1 === TernaryFalse$constant())) {
                            return result__shadow_1;
                        }
                    }
                }
            }
        }
        return TernaryFalse$constant();
    }
    static $go$private$checker$traceUnionsOrIntersectionsTooLarge(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): void {
        let tr: {
            value: Tracer;
        } | undefined = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracer;
        if (tr === undefined) {
            return;
        }
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnionOrIntersection$constant()) >>> 0 === 0) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnionOrIntersection$constant()) >>> 0 === 0)) {
            if (!(((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags) >>> 0 & ObjectFlagsPrimitiveUnion$constant()) >>> 0 === 0)) {
                return;
            }
            let sourceSize = Type.Types(source).length;
            let targetSize = Type.Types(target).length;
            if (sourceSize * targetSize > 1000000) {
                Tracer.Instant(tr, PhaseCheckTypes$constant__from_tracing(), "traceUnionsOrIntersectionsTooLarge_DepthLimit", $goMap$MapOf_string_To_Interface_void.make(4, [["sourceId", new $goInterfaceAdapter$Named_checker$TypeId(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["sourceSize", new $goInterfaceAdapter$int(sourceSize)], ["targetId", new $goInterfaceAdapter$Named_checker$TypeId(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["targetSize", new $goInterfaceAdapter$int(targetSize)]]));
            }
        }
    }
    static $go$private$checker$tryElaborateArrayLikeErrors(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool): bool {
        if (isTupleType(source)) {
            if ((Type.TargetTupleType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly && Checker.$go$private$checker$isMutableArrayOrTuple((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target)) {
                if (reportErrors) {
                    Relater.$go$private$checker$reportError(r, $state__diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))]));
                }
                return false;
            }
            return Checker.$go$private$checker$isArrayOrTupleType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target);
        }
        if (Checker.$go$private$checker$isReadonlyArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source) && Checker.$go$private$checker$isMutableArrayOrTuple((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target)) {
            if (reportErrors) {
                Relater.$go$private$checker$reportError(r, $state__diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target))]));
            }
            return false;
        }
        if (isTupleType(target)) {
            return Checker.$go$private$checker$isArrayType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        }
        return true;
    }
    static $go$private$checker$tryElaborateErrorsForPrimitivesAndObjects(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): void {
        let __gotots_logical_result_2 = (tsonicTypeScriptRuntime.sameLocation(source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalStringType)
            &&
                tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringType)) || (tsonicTypeScriptRuntime.sameLocation(source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalNumberType)
            &&
                tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.numberType)) || (tsonicTypeScriptRuntime.sameLocation(source, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalBooleanType)
            &&
                tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.booleanType));
        if (!__gotots_logical_result_2) {
            const __gotots_equal_operand_0 = source;
            const __gotots_callee_0: Checker["getGlobalESSymbolType"] = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getGlobalESSymbolType;
            __gotots_logical_result_2 = (tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))())
                &&
                    tsonicTypeScriptRuntime.sameLocation(target, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.esSymbolType));
        }
        if (__gotots_logical_result_2) {
            Relater.$go$private$checker$reportError(r, $state__diagnostics.X_0_is_a_primitive_but_1_is_a_wrapper_object_Prefer_using_0_when_possible, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source))]));
        }
    }
    static $go$private$checker$typeArgumentsRelatedTo(r: {
        value: Relater;
    } | undefined, sources: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, targets: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, variances: RuntimeSlice<VarianceFlags>, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        if (sources.length !== targets.length &&
            (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
            return TernaryFalse$constant();
        }
        let length = globalThis.Math.min(sources.length, targets.length);
        let result = TernaryTrue$constant();
        const __gotots_range_11 = length;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11; __gotots_range_index_11++) {
            const __gotots_range_value_15 = __gotots_range_index_11;
            let i = __gotots_range_value_15;
            let varianceFlags = VarianceFlagsCovariant$constant();
            if (i < variances.length) {
                varianceFlags = variances.get(i);
            }
            let variance = (varianceFlags & VarianceFlagsVarianceMask$constant()) >>> 0;
            if (!(variance === VarianceFlagsIndependent$constant())) {
                let s: tsonicTypeScriptRuntime.Location<Type> | undefined = sources.get(i);
                let t: tsonicTypeScriptRuntime.Location<Type> | undefined = targets.get(i);
                let related = 0;
                if (!((varianceFlags & VarianceFlagsUnmeasurable$constant()) >>> 0 === 0)) {
                    if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                        ===
                            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.identityRelation) {
                        related = Relater.$go$private$checker$isRelatedTo(r, s, t, RecursionFlagsBoth$constant(), false);
                    }
                    else {
                        related = Checker.$go$private$checker$compareTypesIdentical((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, s, t);
                    }
                }
                else {
                    if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inVarianceComputation && !((varianceFlags & VarianceFlagsUnreliable$constant()) >>> 0 === 0)) {
                        Checker.$go$private$checker$instantiateType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, s, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportUnreliableMapper);
                    }
                    if (variance === VarianceFlagsCovariant$constant()) {
                        related = Relater.$go$private$checker$isRelatedToEx(r, s, t, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                    }
                    else if (variance === VarianceFlagsContravariant$constant()) {
                        related = Relater.$go$private$checker$isRelatedToEx(r, t, s, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                    }
                    else if (variance === VarianceFlagsBivariant$constant()) {
                        related = Relater.$go$private$checker$isRelatedTo(r, t, s, RecursionFlagsBoth$constant(), false);
                        if (related === TernaryFalse$constant()) {
                            related = Relater.$go$private$checker$isRelatedToEx(r, s, t, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                        }
                    }
                    else {
                        related = Relater.$go$private$checker$isRelatedToEx(r, s, t, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                        if (!(related === TernaryFalse$constant())) {
                            related = related & Relater.$go$private$checker$isRelatedToEx(r, t, s, RecursionFlagsBoth$constant(), reportErrors, void 0, intersectionState);
                        }
                    }
                }
                if (related === TernaryFalse$constant()) {
                    return TernaryFalse$constant();
                }
                result = result & related;
            }
        }
        return result;
    }
    static $go$private$checker$typeRelatedToDiscriminatedType(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary {
        let sourceProperties = Checker.$go$private$checker$getPropertiesOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source);
        let sourcePropertiesFiltered = Checker.$go$private$checker$findDiscriminantProperties((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProperties, target);
        if (sourcePropertiesFiltered.length === 0) {
            return TernaryFalse$constant();
        }
        let numCombinations = 1;
        const __gotots_range_16 = sourcePropertiesFiltered;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16.length; __gotots_range_index_16++) {
            const __gotots_range_value_20 = __gotots_range_16.get(__gotots_range_index_16);
            let sourceProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_20;
            numCombinations = numCombinations * countTypes(Checker.$go$private$checker$getNonMissingTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProperty));
            if (numCombinations > 25) {
                {
                    let tr: {
                        value: Tracer;
                    } | undefined = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracer;
                    if (!(tr === undefined)) {
                        Tracer.Instant(tr, PhaseCheckTypes$constant__from_tracing(), "typeRelatedToDiscriminatedType_DepthLimit", $goMap$MapOf_string_To_Interface_void.make(3, [["sourceId", new $goInterfaceAdapter$Named_checker$TypeId(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["targetId", new $goInterfaceAdapter$Named_checker$TypeId(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)], ["numCombinations", new $goInterfaceAdapter$int(numCombinations)]]));
                    }
                }
                return TernaryFalse$constant();
            }
            if (numCombinations === 0) {
                return TernaryFalse$constant();
            }
        }
        let sourceDiscriminantTypes = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>>(sourcePropertiesFiltered.length, null, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>());
        let excludedProperties = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return $goMap$MapOf_string_To_Struct_void.nil();
        });
        const excludedProperties$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => excludedProperties, excludedProperties$next3 => excludedProperties = excludedProperties$next3);
        const __gotots_range_17 = sourcePropertiesFiltered;
        for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_17.length; __gotots_range_index_17++) {
            const __gotots_range_value_21 = __gotots_range_index_17;
            const __gotots_range_value_22 = __gotots_range_17.get(__gotots_range_index_17);
            let i = __gotots_range_value_21;
            let sourceProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_22;
            let sourcePropertyType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getNonMissingTypeOfSymbol((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, sourceProperty);
            sourceDiscriminantTypes.set(i, Type.Distributed(sourcePropertyType));
            Set$Add$string(excludedProperties$location3, Symbol__from_ast.$storageOf(((sourceProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
        }
        let discriminantCombinations = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>>(numCombinations, null, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>());
        const __gotots_range_18 = numCombinations;
        for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_18; __gotots_range_index_18++) {
            const __gotots_range_value_23 = __gotots_range_index_18;
            let i = __gotots_range_value_23;
            let combination = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Type> | undefined>(sourceDiscriminantTypes.length, null, void 0);
            let n = i;
            for (let j = sourceDiscriminantTypes.length - 1; j >= 0; j--) {
                let sourceTypes = sourceDiscriminantTypes.get(j);
                let length = sourceTypes.length;
                combination.set(j, sourceTypes.get(goNumberIntegerRemainder(n, length)));
                n = goNumberIntegerDivide(n, length);
            }
            discriminantCombinations.set(i, combination);
        }
        let matchingTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
        const __gotots_range_19 = discriminantCombinations;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_19.length; __gotots_range_index_19++) {
            const __gotots_range_value_24 = __gotots_range_19.get(__gotots_range_index_19);
            let combination = __gotots_range_value_24;
            let hasMatch = false;
            const __gotots_range_20 = Type.Types(target);
            outer: for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_20.length; __gotots_range_index_20++) {
                const __gotots_range_value_25 = __gotots_range_20.get(__gotots_range_index_20);
                let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_25;
                const __gotots_range_21 = sourcePropertiesFiltered;
                for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_21.length; __gotots_range_index_21++) {
                    const __gotots_range_value_26 = __gotots_range_index_21;
                    let i = __gotots_range_value_26;
                    let sourceProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = sourcePropertiesFiltered.get(i);
                    let targetProperty: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getPropertyOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, t, Symbol__from_ast.$storageOf(((sourceProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                    if (targetProperty === undefined) {
                        continue outer;
                    }
                    if (tsonicTypeScriptRuntime.sameLocation(sourceProperty, targetProperty)) {
                        continue;
                    }
                    let related = Relater.$go$private$checker$propertyRelatedTo(r, source, target, sourceProperty, targetProperty, ($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined => {
                        return combination.get(i);
                    }, false, IntersectionStateNone$constant(), ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks ||
                        (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                            ===
                                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation);
                    if (related === TernaryFalse$constant()) {
                        continue outer;
                    }
                }
                matchingTypes = AppendIfUnique$PointerTo_Named_checker$Type(matchingTypes, t);
                hasMatch = true;
            }
            if (!hasMatch) {
                return TernaryFalse$constant();
            }
        }
        let result = TernaryTrue$constant();
        const __gotots_range_22 = matchingTypes;
        for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_22.length; __gotots_range_index_22++) {
            const __gotots_range_value_27 = __gotots_range_22.get(__gotots_range_index_22);
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_27;
            result = result & Relater.$go$private$checker$propertiesRelatedTo(r, source, t, false, Set__from_collections.$copy<gostring>(excludedProperties), false, IntersectionStateNone$constant());
            if (!(result === TernaryFalse$constant())) {
                result = result & Relater.$go$private$checker$signaturesRelatedTo(r, source, t, SignatureKindCall$constant(), false, IntersectionStateNone$constant());
                if (!(result === TernaryFalse$constant())) {
                    result = result & Relater.$go$private$checker$signaturesRelatedTo(r, source, t, SignatureKindConstruct$constant(), false, IntersectionStateNone$constant());
                    if (!(result === TernaryFalse$constant()) && !(isTupleType(source) && isTupleType(t))) {
                        result = result & Relater.$go$private$checker$indexSignaturesRelatedTo(r, source, t, false, false, IntersectionStateNone$constant());
                    }
                }
            }
            if (result === TernaryFalse$constant()) {
                return result;
            }
        }
        return result;
    }
    static $go$private$checker$typeRelatedToEachType(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let result = TernaryTrue$constant();
        let targetTypes = Type.Types(target);
        const __gotots_range_5 = targetTypes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_5);
            let targetType: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_8;
            let related = Relater.$go$private$checker$isRelatedToEx(r, source, targetType, RecursionFlagsTarget$constant(), reportErrors, void 0, intersectionState);
            if (related === TernaryFalse$constant()) {
                return TernaryFalse$constant();
            }
            result = result & related;
        }
        return result;
    }
    static $go$private$checker$typeRelatedToIndexInfo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, targetInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let sourceInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = Checker.$go$private$checker$getApplicableIndexInfo((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType);
        if (!(sourceInfo === undefined)) {
            return Relater.$go$private$checker$indexInfoRelatedTo(r, sourceInfo, targetInfo, reportErrors, intersectionState);
        }
        if ((intersectionState & IntersectionStateSource$constant()) >>> 0 === 0 && (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) || !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsFreshLiteral$constant()) >>> 0 === 0)) && Checker.$go$private$checker$isObjectTypeWithInferableIndex((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source)) {
            return Relater.$go$private$checker$membersRelatedToIndexInfo(r, source, targetInfo, reportErrors, intersectionState);
        }
        if (reportErrors) {
            Relater.$go$private$checker$reportError(r, $state__diagnostics.Index_signature_for_type_0_is_missing_in_type_1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, IndexInfo.$storageOf(((targetInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType)), new GoInterfaceAdapter(Checker.TypeToString((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source))]));
        }
        return TernaryFalse$constant();
    }
    static $go$private$checker$typeRelatedToSomeType(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        let targetTypes = Type.Types(target);
        if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            if (containsType(targetTypes, source)) {
                return TernaryTrue$constant();
            }
            if (!((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsPrimitiveUnion$constant()) >>> 0 === 0) && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsEnumLiteral$constant()) >>> 0 === 0 && (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (13312)) >>> 0 === 0) || ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subtypeRelation
                ||
                    (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                        ===
                            ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictSubtypeRelation) && !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumberLiteral$constant()) >>> 0 === 0))) {
                let alternateForm: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                if (tsonicTypeScriptRuntime.sameLocation(source, (Type.AsLiteralType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.regularType)) {
                    alternateForm = (Type.AsLiteralType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.freshType;
                }
                else {
                    alternateForm = (Type.AsLiteralType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.regularType;
                }
                let primitive: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                __gotots_control_target_5: {
                    if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLiteral$constant()) >>> 0 === 0)) {
                        primitive = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringType;
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumberLiteral$constant()) >>> 0 === 0)) {
                        primitive = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.numberType;
                    }
                    else if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBigIntLiteral$constant()) >>> 0 === 0)) {
                        primitive = ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bigintType;
                    }
                }
                if (!(primitive === undefined) && containsType(targetTypes, primitive) || !(alternateForm === undefined) && containsType(targetTypes, alternateForm)) {
                    return TernaryTrue$constant();
                }
                return TernaryFalse$constant();
            }
            let match: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getMatchingUnionConstituentForType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, target, source);
            if (!(match === undefined)) {
                let related = Relater.$go$private$checker$isRelatedToEx(r, source, match, RecursionFlagsTarget$constant(), false, void 0, intersectionState);
                if (!(related === TernaryFalse$constant())) {
                    return related;
                }
            }
        }
        const __gotots_range_4 = targetTypes;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_4);
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_7;
            let related = Relater.$go$private$checker$isRelatedToEx(r, source, t, RecursionFlagsTarget$constant(), false, void 0, intersectionState);
            if (!(related === TernaryFalse$constant())) {
                return related;
            }
        }
        if (reportErrors) {
            const __gotots_receiver_8: Relater["c"] = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c;
            const __gotots_argument_21 = source;
            const __gotots_argument_22 = target;
            const __gotots_receiver_7 = r;
            const __gotots_argument_23 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary => {
                return Relater.$go$private$checker$isRelatedToSimple(__gotots_receiver_7, $argument0, $argument1);
            };
            let bestMatchingType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBestMatchingType(__gotots_receiver_8, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23);
            if (!(bestMatchingType === undefined)) {
                Relater.$go$private$checker$isRelatedToEx(r, source, bestMatchingType, RecursionFlagsTarget$constant(), true, void 0, intersectionState);
            }
        }
        return TernaryFalse$constant();
    }
    static $go$private$checker$unionOrIntersectionRelatedTo(r: {
        value: Relater;
    } | undefined, source: tsonicTypeScriptRuntime.Location<Type> | undefined, target: tsonicTypeScriptRuntime.Location<Type> | undefined, reportErrors: bool, intersectionState: IntersectionState): Ternary {
        if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                let sourceOrigin: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsUnionType(source) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origin;
                if (!(sourceOrigin === undefined) && !((((sourceOrigin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) && !(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) && Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(Type.Types(sourceOrigin), target)) {
                    return TernaryTrue$constant();
                }
                let targetOrigin: tsonicTypeScriptRuntime.Location<Type> | undefined = (Type.AsUnionType(target) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origin;
                if (!(targetOrigin === undefined) && !((((targetOrigin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && !(((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) && Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(Type.Types(targetOrigin), source)) {
                    return TernaryTrue$constant();
                }
            }
            if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
                ===
                    ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation) {
                return Relater.$go$private$checker$someTypeRelatedToType(r, source, target, reportErrors && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0, intersectionState);
            }
            return Relater.$go$private$checker$eachTypeRelatedToType(r, source, target, reportErrors && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0, intersectionState);
        }
        if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            return Relater.$go$private$checker$typeRelatedToSomeType(r, Checker.$go$private$checker$getRegularTypeOfObjectLiteral((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, source), target, reportErrors && (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0 && (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0, intersectionState);
        }
        if (!((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0)) {
            return Relater.$go$private$checker$typeRelatedToEachType(r, source, target, reportErrors, IntersectionStateTarget$constant());
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relation
            ===
                ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparableRelation
            && !((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsPrimitive$constant()) >>> 0 === 0)) {
            let constraints = SameMap$PointerTo_Named_checker$Type(Type.Types(source), (t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined => {
                if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsInstantiable$constant()) >>> 0 === 0)) {
                    let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getBaseConstraintOfType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, t);
                    if (!(constraint === undefined)) {
                        return constraint;
                    }
                    return ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownType;
                }
                return t;
            });
            if (!Same$PointerTo_Named_checker$Type(constraints, Type.Types(source))) {
                source = Checker.$go$private$checker$getIntersectionType((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.c, constraints);
                if (!((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0)) {
                    return TernaryFalse$constant();
                }
                if ((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIntersection$constant()) >>> 0 === 0) {
                    let result = Relater.$go$private$checker$isRelatedTo(r, source, target, RecursionFlagsSource$constant(), false);
                    if (!(result === TernaryFalse$constant())) {
                        return result;
                    }
                    return Relater.$go$private$checker$isRelatedTo(r, target, source, RecursionFlagsSource$constant(), false);
                }
            }
        }
        return Relater.$go$private$checker$someTypeRelatedToType(r, source, target, false, IntersectionStateSource$constant());
    }
}
export function shouldCheckAsExcessProperty(prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, container: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && !(Symbol__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, Symbol__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
}
export function isIgnoredJsxProperty(source: tsonicTypeScriptRuntime.Location<Type> | undefined, sourceProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !((((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsJsxAttributes$constant()) >>> 0 === 0) && isHyphenatedJsxName(Symbol__from_ast.$storageOf(((sourceProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
}
export function addToDottedName(head: gostring, tail: gostring): gostring {
    if (strings__from_gostdlib.HasPrefix(head, "new ")) {
        head = "(" + head + ")";
    }
    let pos = 0;
    for (;;) {
        if (strings__from_gostdlib.HasPrefix(goStringSlice(tail, pos), "(")) {
            pos++;
        }
        else if (strings__from_gostdlib.HasPrefix(goStringSlice(tail, pos), "new ")) {
            pos += 4;
        }
        else {
            break;
        }
    }
    let prefix = goStringSlice(tail, 0, pos);
    let suffix = goStringSlice(tail, pos);
    if (strings__from_gostdlib.HasPrefix(suffix, "[")) {
        return prefix + head + suffix;
    }
    return prefix + head + "." + suffix;
}
export function getPropertyNameArg(arg: GoInterface | undefined): gostring {
    let s = (($value: GoInterface | undefined): gostring => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(arg);
    if (s.length !== 0 && (goStringIndex(s, 0) === 34 || goStringIndex(s, 0) === 39 || goStringIndex(s, 0) === 96)) {
        return "[" + s + "]";
    }
    return s;
}
export function isConversionOrInterfaceImplementationMessage(message: {
    value: Message__from_diagnostics;
} | undefined): bool {
    return message
        ===
            $state__diagnostics.Class_0_incorrectly_implements_interface_1
        ||
            message
                ===
                    $state__diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass ||
        message
            ===
                $state__diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first ||
        message
            ===
                $state__diagnostics.Its_instance_type_0_is_not_a_valid_JSX_element ||
        message
            ===
                $state__diagnostics.Its_return_type_0_is_not_a_valid_JSX_element ||
        message
            ===
                $state__diagnostics.Its_element_type_0_is_not_a_valid_JSX_element;
}
export function chainDepth(chain: {
    value: ErrorChain;
} | undefined): int {
    let depth = 0;
    for (; !(chain === undefined);) {
        depth++;
        chain = (chain ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.next;
    }
    return depth;
}
