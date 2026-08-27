import { PseudoObjectElementKindGetAccessor$constant, PseudoObjectElementKindMethod$constant, PseudoObjectElementKindPropertyAssignment$constant, PseudoObjectElementKindSetAccessor$constant, PseudoTypeBase, PseudoTypeDefault, PseudoTypeKindAny$constant, PseudoTypeKindBigInt$constant, PseudoTypeKindBigIntLiteral$constant, PseudoTypeKindBoolean$constant, PseudoTypeKindDirect$constant, PseudoTypeKindFalse$constant, PseudoTypeKindInferred$constant, PseudoTypeKindMaybeConstLocation$constant, PseudoTypeKindNoResult$constant, PseudoTypeKindNull$constant, PseudoTypeKindNumber$constant, PseudoTypeKindNumericLiteral$constant, PseudoTypeKindObjectLiteral$constant, PseudoTypeKindSingleCallSignature$constant, PseudoTypeKindString$constant, PseudoTypeKindStringLiteral$constant, PseudoTypeKindTrue$constant, PseudoTypeKindTuple$constant, PseudoTypeKindUndefined$constant, PseudoTypeKindUnion$constant, newPseudoType } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/pseudochecker/type.js";
import { $goInterfaceAdapter$PointerTo_Named_pseudochecker$PseudoTypeBase as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $state } from "./state.js";
export function $initialize(): void {
    PseudoObjectElementKindGetAccessor = PseudoObjectElementKindGetAccessor$constant();
    PseudoObjectElementKindMethod = PseudoObjectElementKindMethod$constant();
    PseudoObjectElementKindPropertyAssignment = PseudoObjectElementKindPropertyAssignment$constant();
    PseudoObjectElementKindSetAccessor = PseudoObjectElementKindSetAccessor$constant();
    PseudoTypeKindAny = PseudoTypeKindAny$constant();
    PseudoTypeKindBigInt = PseudoTypeKindBigInt$constant();
    PseudoTypeKindBigIntLiteral = PseudoTypeKindBigIntLiteral$constant();
    PseudoTypeKindBoolean = PseudoTypeKindBoolean$constant();
    PseudoTypeKindDirect = PseudoTypeKindDirect$constant();
    PseudoTypeKindFalse = PseudoTypeKindFalse$constant();
    PseudoTypeKindInferred = PseudoTypeKindInferred$constant();
    PseudoTypeKindMaybeConstLocation = PseudoTypeKindMaybeConstLocation$constant();
    PseudoTypeKindNoResult = PseudoTypeKindNoResult$constant();
    PseudoTypeKindNull = PseudoTypeKindNull$constant();
    PseudoTypeKindNumber = PseudoTypeKindNumber$constant();
    PseudoTypeKindNumericLiteral = PseudoTypeKindNumericLiteral$constant();
    PseudoTypeKindObjectLiteral = PseudoTypeKindObjectLiteral$constant();
    PseudoTypeKindSingleCallSignature = PseudoTypeKindSingleCallSignature$constant();
    PseudoTypeKindString = PseudoTypeKindString$constant();
    PseudoTypeKindStringLiteral = PseudoTypeKindStringLiteral$constant();
    PseudoTypeKindTrue = PseudoTypeKindTrue$constant();
    PseudoTypeKindTuple = PseudoTypeKindTuple$constant();
    PseudoTypeKindUndefined = PseudoTypeKindUndefined$constant();
    PseudoTypeKindUnion = PseudoTypeKindUnion$constant();
    $state.PseudoTypeAny = void 0;
    $state.PseudoTypeBigInt = void 0;
    $state.PseudoTypeBoolean = void 0;
    $state.PseudoTypeFalse = void 0;
    $state.PseudoTypeNull = void 0;
    $state.PseudoTypeNumber = void 0;
    $state.PseudoTypeString = void 0;
    $state.PseudoTypeTrue = void 0;
    $state.PseudoTypeUndefined = void 0;
    {
        $state.PseudoTypeUndefined = newPseudoType(PseudoTypeKindUndefined$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeNull = newPseudoType(PseudoTypeKindNull$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeAny = newPseudoType(PseudoTypeKindAny$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeString = newPseudoType(PseudoTypeKindString$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeNumber = newPseudoType(PseudoTypeKindNumber$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeBigInt = newPseudoType(PseudoTypeKindBigInt$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeBoolean = newPseudoType(PseudoTypeKindBoolean$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeFalse = newPseudoType(PseudoTypeKindFalse$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
    {
        $state.PseudoTypeTrue = newPseudoType(PseudoTypeKindTrue$constant(), new GoInterfaceAdapter(new PseudoTypeBase(PseudoTypeDefault.$zero())));
    }
}
export { NewPseudoChecker, PseudoChecker } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/pseudochecker/checker.js";
export { IsInConstContext } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/pseudochecker/lookup.js";
export { NewPseudoGetAccessor, NewPseudoObjectMethod, NewPseudoParameter, NewPseudoPropertyAssignment, NewPseudoSetAccessor, NewPseudoTypeBigIntLiteral, NewPseudoTypeDirect, NewPseudoTypeInferred, NewPseudoTypeInferredWithErrors, NewPseudoTypeMaybeConstLocation, NewPseudoTypeNoResult, NewPseudoTypeNumericLiteral, NewPseudoTypeObjectLiteral, NewPseudoTypeSingleCallSignature, NewPseudoTypeStringLiteral, NewPseudoTypeTuple, NewPseudoTypeUnion, PseudoGetAccessor, PseudoObjectElement, PseudoObjectElementKind, PseudoObjectElementKindGetAccessor$constant, PseudoObjectElementKindMethod$constant, PseudoObjectElementKindPropertyAssignment$constant, PseudoObjectElementKindSetAccessor$constant, PseudoObjectMethod, PseudoParameter, PseudoPropertyAssignment, PseudoSetAccessor, PseudoType, PseudoTypeBase, PseudoTypeDefault, PseudoTypeDirect, PseudoTypeInferred, PseudoTypeKind, PseudoTypeKindAny$constant, PseudoTypeKindBigInt$constant, PseudoTypeKindBigIntLiteral$constant, PseudoTypeKindBoolean$constant, PseudoTypeKindDirect$constant, PseudoTypeKindFalse$constant, PseudoTypeKindInferred$constant, PseudoTypeKindMaybeConstLocation$constant, PseudoTypeKindNoResult$constant, PseudoTypeKindNull$constant, PseudoTypeKindNumber$constant, PseudoTypeKindNumericLiteral$constant, PseudoTypeKindObjectLiteral$constant, PseudoTypeKindSingleCallSignature$constant, PseudoTypeKindString$constant, PseudoTypeKindStringLiteral$constant, PseudoTypeKindTrue$constant, PseudoTypeKindTuple$constant, PseudoTypeKindUndefined$constant, PseudoTypeKindUnion$constant, PseudoTypeLiteral, PseudoTypeMaybeConstLocation, PseudoTypeNoResult, PseudoTypeObjectLiteral, PseudoTypeSingleCallSignature, PseudoTypeTuple, PseudoTypeUnion } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/pseudochecker/type.js";
export let PseudoObjectElementKindGetAccessor: ReturnType<typeof PseudoObjectElementKindGetAccessor$constant>;
export let PseudoObjectElementKindMethod: ReturnType<typeof PseudoObjectElementKindMethod$constant>;
export let PseudoObjectElementKindPropertyAssignment: ReturnType<typeof PseudoObjectElementKindPropertyAssignment$constant>;
export let PseudoObjectElementKindSetAccessor: ReturnType<typeof PseudoObjectElementKindSetAccessor$constant>;
export let PseudoTypeKindAny: ReturnType<typeof PseudoTypeKindAny$constant>;
export let PseudoTypeKindBigInt: ReturnType<typeof PseudoTypeKindBigInt$constant>;
export let PseudoTypeKindBigIntLiteral: ReturnType<typeof PseudoTypeKindBigIntLiteral$constant>;
export let PseudoTypeKindBoolean: ReturnType<typeof PseudoTypeKindBoolean$constant>;
export let PseudoTypeKindDirect: ReturnType<typeof PseudoTypeKindDirect$constant>;
export let PseudoTypeKindFalse: ReturnType<typeof PseudoTypeKindFalse$constant>;
export let PseudoTypeKindInferred: ReturnType<typeof PseudoTypeKindInferred$constant>;
export let PseudoTypeKindMaybeConstLocation: ReturnType<typeof PseudoTypeKindMaybeConstLocation$constant>;
export let PseudoTypeKindNoResult: ReturnType<typeof PseudoTypeKindNoResult$constant>;
export let PseudoTypeKindNull: ReturnType<typeof PseudoTypeKindNull$constant>;
export let PseudoTypeKindNumber: ReturnType<typeof PseudoTypeKindNumber$constant>;
export let PseudoTypeKindNumericLiteral: ReturnType<typeof PseudoTypeKindNumericLiteral$constant>;
export let PseudoTypeKindObjectLiteral: ReturnType<typeof PseudoTypeKindObjectLiteral$constant>;
export let PseudoTypeKindSingleCallSignature: ReturnType<typeof PseudoTypeKindSingleCallSignature$constant>;
export let PseudoTypeKindString: ReturnType<typeof PseudoTypeKindString$constant>;
export let PseudoTypeKindStringLiteral: ReturnType<typeof PseudoTypeKindStringLiteral$constant>;
export let PseudoTypeKindTrue: ReturnType<typeof PseudoTypeKindTrue$constant>;
export let PseudoTypeKindTuple: ReturnType<typeof PseudoTypeKindTuple$constant>;
export let PseudoTypeKindUndefined: ReturnType<typeof PseudoTypeKindUndefined$constant>;
export let PseudoTypeKindUnion: ReturnType<typeof PseudoTypeKindUnion$constant>;
export { $state };
