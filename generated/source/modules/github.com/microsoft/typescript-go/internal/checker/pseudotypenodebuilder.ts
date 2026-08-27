import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { PseudoTypeMaybeConstLocation as PseudoTypeMaybeConstLocation__from_pseudochecker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pseudochecker/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { PseudoTypeKindMaybeConstLocation$constant as PseudoTypeKindMaybeConstLocation$constant__from_pseudochecker, PseudoTypeKindObjectLiteral$constant as PseudoTypeKindObjectLiteral$constant__from_pseudochecker, PseudoTypeKindSingleCallSignature$constant as PseudoTypeKindSingleCallSignature$constant__from_pseudochecker, PseudoTypeKindTuple$constant as PseudoTypeKindTuple$constant__from_pseudochecker, PseudoType as PseudoType__from_pseudochecker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pseudochecker/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function isStructuralPseudoType(t: tsonicTypeScriptRuntime.Location<PseudoType__from_pseudochecker> | undefined): bool {
    switch (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PseudoType__from_pseudochecker>).value.Kind) {
        case PseudoTypeKindObjectLiteral$constant__from_pseudochecker():
        case PseudoTypeKindTuple$constant__from_pseudochecker():
        case PseudoTypeKindSingleCallSignature$constant__from_pseudochecker(): {
            return true;
            break;
        }
        case PseudoTypeKindMaybeConstLocation$constant__from_pseudochecker(): {
            let d: PseudoTypeMaybeConstLocation__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeMaybeConstLocation(t);
            return isStructuralPseudoType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ConstType) || isStructuralPseudoType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).RegularType);
            break;
        }
    }
    return false;
}
