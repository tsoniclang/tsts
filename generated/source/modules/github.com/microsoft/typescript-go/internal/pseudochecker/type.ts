import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, int16, int8 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoGetAccessor, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoObjectMethod, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoPropertyAssignment, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoSetAccessor, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeDirect, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeInferred, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeLiteral, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeMaybeConstLocation, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeNoResult, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeObjectLiteral, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeSingleCallSignature, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeTuple, $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeUnion as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$AsPseudoObjectElement$void_to_PointerTo_Named_pseudochecker$PseudoObjectElement, $goInterfaceMethod$AsPseudoType$void_to_PointerTo_Named_pseudochecker$PseudoType } from "../../../../../../support/interface-methods.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type PseudoTypeKind = int16;
export function PseudoTypeKindDirect$constant(): PseudoTypeKind {
    return 0;
}
export function PseudoTypeKindInferred$constant(): PseudoTypeKind {
    return 1;
}
export function PseudoTypeKindNoResult$constant(): PseudoTypeKind {
    return 2;
}
export function PseudoTypeKindMaybeConstLocation$constant(): PseudoTypeKind {
    return 3;
}
export function PseudoTypeKindUnion$constant(): PseudoTypeKind {
    return 4;
}
export function PseudoTypeKindUndefined$constant(): PseudoTypeKind {
    return 5;
}
export function PseudoTypeKindNull$constant(): PseudoTypeKind {
    return 6;
}
export function PseudoTypeKindAny$constant(): PseudoTypeKind {
    return 7;
}
export function PseudoTypeKindString$constant(): PseudoTypeKind {
    return 8;
}
export function PseudoTypeKindNumber$constant(): PseudoTypeKind {
    return 9;
}
export function PseudoTypeKindBigInt$constant(): PseudoTypeKind {
    return 10;
}
export function PseudoTypeKindBoolean$constant(): PseudoTypeKind {
    return 11;
}
export function PseudoTypeKindFalse$constant(): PseudoTypeKind {
    return 12;
}
export function PseudoTypeKindTrue$constant(): PseudoTypeKind {
    return 13;
}
export function PseudoTypeKindSingleCallSignature$constant(): PseudoTypeKind {
    return 14;
}
export function PseudoTypeKindTuple$constant(): PseudoTypeKind {
    return 15;
}
export function PseudoTypeKindObjectLiteral$constant(): PseudoTypeKind {
    return 16;
}
export function PseudoTypeKindStringLiteral$constant(): PseudoTypeKind {
    return 17;
}
export function PseudoTypeKindNumericLiteral$constant(): PseudoTypeKind {
    return 18;
}
export function PseudoTypeKindBigIntLiteral$constant(): PseudoTypeKind {
    return 19;
}
export class PseudoType {
    declare private readonly $goType: void;
    public constructor(public Kind: PseudoTypeKind, public data: pseudoTypeData | undefined) {
    }
    static $zero(): PseudoType {
        return new PseudoType(0, void 0);
    }
    declare private readonly then?: never;
    static AsPseudoTypeDirect(t: PseudoType | undefined): PseudoTypeDirect | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeDirect | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeDirect.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeInferred(t: PseudoType | undefined): PseudoTypeInferred | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeInferred | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeInferred.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeLiteral(t: PseudoType | undefined): PseudoTypeLiteral | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeLiteral | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeMaybeConstLocation(t: PseudoType | undefined): PseudoTypeMaybeConstLocation | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeMaybeConstLocation | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeMaybeConstLocation.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeNoResult(t: PseudoType | undefined): PseudoTypeNoResult | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeNoResult | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeNoResult.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeObjectLiteral(t: PseudoType | undefined): PseudoTypeObjectLiteral | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeObjectLiteral | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeObjectLiteral.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeSingleCallSignature(t: PseudoType | undefined): PseudoTypeSingleCallSignature | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeSingleCallSignature | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeSingleCallSignature.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeTuple(t: PseudoType | undefined): PseudoTypeTuple | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeTuple | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeTuple.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoTypeUnion(t: PseudoType | undefined): PseudoTypeUnion | undefined {
        return (($value: pseudoTypeData | undefined): PseudoTypeUnion | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
}
export function newPseudoType(kind: PseudoTypeKind, data: pseudoTypeData | undefined): PseudoType | undefined {
    const __gotots_receiver_0 = data;
    let n: PseudoType | undefined = goInterfaceNonNil<pseudoTypeData>(__gotots_receiver_0).AsPseudoType();
    (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind = kind;
    (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data = data;
    return n;
}
export interface pseudoTypeData extends GoInterfaceValue {
    AsPseudoType(): PseudoType | undefined;
}
export const pseudoTypeData$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AsPseudoType$void_to_PointerTo_Named_pseudochecker$PseudoType]);
export function pseudoTypeData$is(value: GoInterfaceValue | undefined): value is pseudoTypeData {
    return value !== undefined && value.$go$implements(pseudoTypeData$contract);
}
export class PseudoTypeDefault {
    declare private readonly $goType: void;
    public constructor(public PseudoType: PseudoType) {
    }
    static $zero(): PseudoTypeDefault {
        return new PseudoTypeDefault(PseudoType.$zero());
    }
    declare private readonly then?: never;
    static AsPseudoType(b: PseudoTypeDefault | undefined): PseudoType | undefined {
        const __gotots_store_0 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return __gotots_store_0.PseudoType;
    }
}
export class PseudoTypeBase {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeDefault: PseudoTypeDefault) {
    }
    static $zero(): PseudoTypeBase {
        return new PseudoTypeBase(PseudoTypeDefault.$zero());
    }
    declare private readonly then?: never;
}
export class PseudoTypeDirect {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public TypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeDirect(typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindDirect$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeDirect(new PseudoTypeDirect(PseudoTypeBase.$zero(), typeNode)));
}
export class PseudoTypeInferred {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public ErrorNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeInferred(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindInferred$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeInferred(new PseudoTypeInferred(PseudoTypeBase.$zero(), expr, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>())));
}
export function NewPseudoTypeInferredWithErrors(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, errorNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindInferred$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeInferred(new PseudoTypeInferred(PseudoTypeBase.$zero(), expr, errorNodes)));
}
export class PseudoTypeNoResult {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeNoResult(decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindNoResult$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeNoResult(new PseudoTypeNoResult(PseudoTypeBase.$zero(), decl)));
}
export class PseudoTypeMaybeConstLocation {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public ConstType: PseudoType | undefined, public RegularType: PseudoType | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeMaybeConstLocation(loc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ct: PseudoType | undefined, reg: PseudoType | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindMaybeConstLocation$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeMaybeConstLocation(new PseudoTypeMaybeConstLocation(PseudoTypeBase.$zero(), loc, ct, reg)));
}
export class PseudoTypeUnion {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Types: RuntimeSlice<PseudoType | undefined>) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeUnion(types: RuntimeSlice<PseudoType | undefined>): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindUnion$constant(), new GoInterfaceAdapter(new PseudoTypeUnion(PseudoTypeBase.$zero(), types)));
}
export class PseudoParameter {
    declare private readonly $goType: void;
    public constructor(public Rest: bool, public Name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public Optional: bool, public Type: PseudoType | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoParameter(isRest: bool, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isOptional: bool, t: PseudoType | undefined): PseudoParameter | undefined {
    return new PseudoParameter(isRest, name, isOptional, t);
}
export class PseudoTypeSingleCallSignature {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public Parameters: RuntimeSlice<PseudoParameter | undefined>, public TypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>, public ReturnType: PseudoType | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeSingleCallSignature(signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parameters: RuntimeSlice<PseudoParameter | undefined>, typeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>, returnType: PseudoType | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindSingleCallSignature$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeSingleCallSignature(new PseudoTypeSingleCallSignature(PseudoTypeBase.$zero(), signature, parameters, typeParameters, returnType)));
}
export class PseudoTypeTuple {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Elements: RuntimeSlice<PseudoType | undefined>) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeTuple(elements: RuntimeSlice<PseudoType | undefined>): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindTuple$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeTuple(new PseudoTypeTuple(PseudoTypeBase.$zero(), elements)));
}
export class PseudoObjectElement {
    declare private readonly $goType: void;
    public constructor(public Name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public Optional: bool, public Kind: PseudoObjectElementKind, public data: pseudoObjectElementData | undefined) {
    }
    static $zero(): PseudoObjectElement {
        return new PseudoObjectElement(void 0, false, 0, void 0);
    }
    declare private readonly then?: never;
    static AsPseudoGetAccessor(e: PseudoObjectElement | undefined): PseudoGetAccessor | undefined {
        return (($value: pseudoObjectElementData | undefined): PseudoGetAccessor | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoGetAccessor.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoObjectElement(e: PseudoObjectElement | undefined): PseudoObjectElement | undefined {
        return e;
    }
    static AsPseudoObjectMethod(e: PseudoObjectElement | undefined): PseudoObjectMethod | undefined {
        return (($value: pseudoObjectElementData | undefined): PseudoObjectMethod | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoObjectMethod.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoPropertyAssignment(e: PseudoObjectElement | undefined): PseudoPropertyAssignment | undefined {
        return (($value: pseudoObjectElementData | undefined): PseudoPropertyAssignment | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoPropertyAssignment.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static AsPseudoSetAccessor(e: PseudoObjectElement | undefined): PseudoSetAccessor | undefined {
        return (($value: pseudoObjectElementData | undefined): PseudoSetAccessor | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoSetAccessor.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static Signature(e: PseudoObjectElement | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind) {
            case PseudoObjectElementKindMethod$constant(): {
                return (PseudoObjectElement.AsPseudoObjectMethod(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature;
                break;
            }
            case PseudoObjectElementKindSetAccessor$constant(): {
                return (PseudoObjectElement.AsPseudoSetAccessor(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature;
                break;
            }
            case PseudoObjectElementKindGetAccessor$constant(): {
                return (PseudoObjectElement.AsPseudoGetAccessor(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature;
                break;
            }
            default: {
                return void 0;
                break;
            }
        }
    }
}
export type PseudoObjectElementKind = int8;
export function PseudoObjectElementKindMethod$constant(): PseudoObjectElementKind {
    return 0;
}
export function PseudoObjectElementKindPropertyAssignment$constant(): PseudoObjectElementKind {
    return 1;
}
export function PseudoObjectElementKindSetAccessor$constant(): PseudoObjectElementKind {
    return 2;
}
export function PseudoObjectElementKindGetAccessor$constant(): PseudoObjectElementKind {
    return 3;
}
export interface pseudoObjectElementData extends GoInterfaceValue {
    AsPseudoObjectElement(): PseudoObjectElement | undefined;
}
export const pseudoObjectElementData$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AsPseudoObjectElement$void_to_PointerTo_Named_pseudochecker$PseudoObjectElement]);
export function pseudoObjectElementData$is(value: GoInterfaceValue | undefined): value is pseudoObjectElementData {
    return value !== undefined && value.$go$implements(pseudoObjectElementData$contract);
}
export function newPseudoObjectElement(kind: PseudoObjectElementKind, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool, data: pseudoObjectElementData | undefined): PseudoObjectElement | undefined {
    const __gotots_receiver_1 = data;
    let e: PseudoObjectElement | undefined = goInterfaceNonNil<pseudoObjectElementData>(__gotots_receiver_1).AsPseudoObjectElement();
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind = kind;
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name = name;
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional = optional;
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data = data;
    return e;
}
export class PseudoObjectMethod {
    declare private readonly $goType: void;
    public constructor(public PseudoObjectElement: PseudoObjectElement, public Signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public TypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>, public Parameters: RuntimeSlice<PseudoParameter | undefined>, public ReturnType: PseudoType | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoObjectMethod(signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool, typeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>, parameters: RuntimeSlice<PseudoParameter | undefined>, returnType: PseudoType | undefined): PseudoObjectElement | undefined {
    return newPseudoObjectElement(PseudoObjectElementKindMethod$constant(), name, optional, new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoObjectMethod(new PseudoObjectMethod(PseudoObjectElement.$zero(), signature, typeParameters, parameters, returnType)));
}
export class PseudoPropertyAssignment {
    declare private readonly $goType: void;
    public constructor(public PseudoObjectElement: PseudoObjectElement, public Readonly: bool, public Type: PseudoType | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoPropertyAssignment(__go_readonly: bool, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool, t: PseudoType | undefined): PseudoObjectElement | undefined {
    return newPseudoObjectElement(PseudoObjectElementKindPropertyAssignment$constant(), name, optional, new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoPropertyAssignment(new PseudoPropertyAssignment(PseudoObjectElement.$zero(), __go_readonly, t)));
}
export class PseudoSetAccessor {
    declare private readonly $goType: void;
    public constructor(public PseudoObjectElement: PseudoObjectElement, public Signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public Parameter: PseudoParameter | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoSetAccessor(signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool, p: PseudoParameter | undefined): PseudoObjectElement | undefined {
    return newPseudoObjectElement(PseudoObjectElementKindSetAccessor$constant(), name, optional, new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoSetAccessor(new PseudoSetAccessor(PseudoObjectElement.$zero(), signature, p)));
}
export class PseudoGetAccessor {
    declare private readonly $goType: void;
    public constructor(public PseudoObjectElement: PseudoObjectElement, public Signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public Type: PseudoType | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoGetAccessor(signature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, optional: bool, t: PseudoType | undefined): PseudoObjectElement | undefined {
    return newPseudoObjectElement(PseudoObjectElementKindGetAccessor$constant(), name, optional, new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoGetAccessor(new PseudoGetAccessor(PseudoObjectElement.$zero(), signature, t)));
}
export class PseudoTypeObjectLiteral {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Elements: RuntimeSlice<PseudoObjectElement | undefined>) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeObjectLiteral(elements: RuntimeSlice<PseudoObjectElement | undefined>): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindObjectLiteral$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeObjectLiteral(new PseudoTypeObjectLiteral(PseudoTypeBase.$zero(), elements)));
}
export class PseudoTypeLiteral {
    declare private readonly $goType: void;
    public constructor(public PseudoTypeBase: PseudoTypeBase, public Node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function NewPseudoTypeStringLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindStringLiteral$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeLiteral(new PseudoTypeLiteral(PseudoTypeBase.$zero(), node)));
}
export function NewPseudoTypeNumericLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindNumericLiteral$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeLiteral(new PseudoTypeLiteral(PseudoTypeBase.$zero(), node)));
}
export function NewPseudoTypeBigIntLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
    return newPseudoType(PseudoTypeKindBigIntLiteral$constant(), new $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeLiteral(new PseudoTypeLiteral(PseudoTypeBase.$zero(), node)));
}
