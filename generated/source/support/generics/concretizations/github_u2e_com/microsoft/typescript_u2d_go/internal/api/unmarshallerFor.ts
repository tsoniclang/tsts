import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CheckerSignatureParams as CheckerSignatureParams__from_api, CheckerTypeParams as CheckerTypeParams__from_api, GetBaseTypeOfLiteralTypeParams as GetBaseTypeOfLiteralTypeParams__from_api, GetCompletionsAtPositionParams as GetCompletionsAtPositionParams__from_api, GetContextualTypeParams as GetContextualTypeParams__from_api, GetDefaultProjectForFileParams as GetDefaultProjectForFileParams__from_api, GetDiagnosticsParams as GetDiagnosticsParams__from_api, GetExportSymbolOfSymbolParams as GetExportSymbolOfSymbolParams__from_api, GetExportsOfSymbolParams as GetExportsOfSymbolParams__from_api, GetIntrinsicTypeParams as GetIntrinsicTypeParams__from_api, GetMembersOfSymbolParams as GetMembersOfSymbolParams__from_api, GetNonNullableTypeParams as GetNonNullableTypeParams__from_api, GetParameterTypeParams as GetParameterTypeParams__from_api, GetParentOfSymbolParams as GetParentOfSymbolParams__from_api, GetProjectDiagnosticsParams as GetProjectDiagnosticsParams__from_api, GetReferencedSymbolsForNodeParams as GetReferencedSymbolsForNodeParams__from_api, GetReferencesToSymbolInFileParams as GetReferencesToSymbolInFileParams__from_api, GetResolvedSignatureParams as GetResolvedSignatureParams__from_api, GetSignatureUsagesParams as GetSignatureUsagesParams__from_api, GetSignaturesOfTypeParams as GetSignaturesOfTypeParams__from_api, GetSourceFileParams as GetSourceFileParams__from_api, GetSymbolAtLocationParams as GetSymbolAtLocationParams__from_api, GetSymbolAtPositionParams as GetSymbolAtPositionParams__from_api, GetSymbolOfTypeParams as GetSymbolOfTypeParams__from_api, GetSymbolsAtLocationsParams as GetSymbolsAtLocationsParams__from_api, GetSymbolsAtPositionsParams as GetSymbolsAtPositionsParams__from_api, GetTypeAtLocationParams as GetTypeAtLocationParams__from_api, GetTypeAtLocationsParams as GetTypeAtLocationsParams__from_api, GetTypeAtPositionParams as GetTypeAtPositionParams__from_api, GetTypeFromTypeNodeParams as GetTypeFromTypeNodeParams__from_api, GetTypeOfSymbolAtLocationParams as GetTypeOfSymbolAtLocationParams__from_api, GetTypeOfSymbolParams as GetTypeOfSymbolParams__from_api, GetTypePropertyParams as GetTypePropertyParams__from_api, GetTypesAtPositionsParams as GetTypesAtPositionsParams__from_api, GetTypesOfSymbolsParams as GetTypesOfSymbolsParams__from_api, GetWidenedTypeParams as GetWidenedTypeParams__from_api, IsArrayLikeTypeParams as IsArrayLikeTypeParams__from_api, IsTypeAssignableToParams as IsTypeAssignableToParams__from_api, ParseConfigFileParams as ParseConfigFileParams__from_api, PrintNodeParams as PrintNodeParams__from_api, ProfileParams as ProfileParams__from_api, ReleaseParams as ReleaseParams__from_api, ResolveNameParams as ResolveNameParams__from_api, SignatureToSignatureDeclarationParams as SignatureToSignatureDeclarationParams__from_api, TypeToTypeNodeParams as TypeToTypeNodeParams__from_api, UpdateSnapshotParams as UpdateSnapshotParams__from_api, unmarshallerFor$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/api/proto.js";
import { $goInterfaceAdapter$PointerTo_Named_api$CheckerSignatureParams, $goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetBaseTypeOfLiteralTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetCompletionsAtPositionParams, $goInterfaceAdapter$PointerTo_Named_api$GetContextualTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetDefaultProjectForFileParams, $goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams, $goInterfaceAdapter$PointerTo_Named_api$GetExportSymbolOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetExportsOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetMembersOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetNonNullableTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetParameterTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetParentOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetProjectDiagnosticsParams, $goInterfaceAdapter$PointerTo_Named_api$GetReferencedSymbolsForNodeParams, $goInterfaceAdapter$PointerTo_Named_api$GetReferencesToSymbolInFileParams, $goInterfaceAdapter$PointerTo_Named_api$GetResolvedSignatureParams, $goInterfaceAdapter$PointerTo_Named_api$GetSignatureUsagesParams, $goInterfaceAdapter$PointerTo_Named_api$GetSignaturesOfTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetSourceFileParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtLocationParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtPositionParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolOfTypeParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtLocationsParams, $goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtPositionsParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationsParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtPositionParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeFromTypeNodeParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolAtLocationParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypesAtPositionsParams, $goInterfaceAdapter$PointerTo_Named_api$GetTypesOfSymbolsParams, $goInterfaceAdapter$PointerTo_Named_api$GetWidenedTypeParams, $goInterfaceAdapter$PointerTo_Named_api$IsArrayLikeTypeParams, $goInterfaceAdapter$PointerTo_Named_api$IsTypeAssignableToParams, $goInterfaceAdapter$PointerTo_Named_api$ParseConfigFileParams, $goInterfaceAdapter$PointerTo_Named_api$PrintNodeParams, $goInterfaceAdapter$PointerTo_Named_api$ProfileParams, $goInterfaceAdapter$PointerTo_Named_api$ReleaseParams, $goInterfaceAdapter$PointerTo_Named_api$ResolveNameParams, $goInterfaceAdapter$PointerTo_Named_api$SignatureToSignatureDeclarationParams, $goInterfaceAdapter$PointerTo_Named_api$TypeToTypeNodeParams, $goInterfaceAdapter$PointerTo_Named_api$UpdateSnapshotParams, $goInterfaceAdapter$PointerTo_Named_api$GetIntrinsicTypeParams as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function unmarshallerFor$Named_api$CheckerSignatureParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<CheckerSignatureParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<CheckerSignatureParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$CheckerSignatureParams($argument0);
    }, (): CheckerSignatureParams__from_api => {
        return CheckerSignatureParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$CheckerTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<CheckerTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<CheckerTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$CheckerTypeParams($argument0);
    }, (): CheckerTypeParams__from_api => {
        return CheckerTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetBaseTypeOfLiteralTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetBaseTypeOfLiteralTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetBaseTypeOfLiteralTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetBaseTypeOfLiteralTypeParams($argument0);
    }, (): GetBaseTypeOfLiteralTypeParams__from_api => {
        return GetBaseTypeOfLiteralTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetCompletionsAtPositionParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetCompletionsAtPositionParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetCompletionsAtPositionParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetCompletionsAtPositionParams($argument0);
    }, (): GetCompletionsAtPositionParams__from_api => {
        return GetCompletionsAtPositionParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetContextualTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetContextualTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetContextualTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetContextualTypeParams($argument0);
    }, (): GetContextualTypeParams__from_api => {
        return GetContextualTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetDefaultProjectForFileParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetDefaultProjectForFileParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetDefaultProjectForFileParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetDefaultProjectForFileParams($argument0);
    }, (): GetDefaultProjectForFileParams__from_api => {
        return GetDefaultProjectForFileParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetDiagnosticsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetDiagnosticsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetDiagnosticsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetDiagnosticsParams($argument0);
    }, (): GetDiagnosticsParams__from_api => {
        return GetDiagnosticsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetExportSymbolOfSymbolParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetExportSymbolOfSymbolParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetExportSymbolOfSymbolParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetExportSymbolOfSymbolParams($argument0);
    }, (): GetExportSymbolOfSymbolParams__from_api => {
        return GetExportSymbolOfSymbolParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetExportsOfSymbolParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetExportsOfSymbolParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetExportsOfSymbolParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetExportsOfSymbolParams($argument0);
    }, (): GetExportsOfSymbolParams__from_api => {
        return GetExportsOfSymbolParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetIntrinsicTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetIntrinsicTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, (): GetIntrinsicTypeParams__from_api => {
        return GetIntrinsicTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetMembersOfSymbolParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetMembersOfSymbolParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetMembersOfSymbolParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetMembersOfSymbolParams($argument0);
    }, (): GetMembersOfSymbolParams__from_api => {
        return GetMembersOfSymbolParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetNonNullableTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetNonNullableTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetNonNullableTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetNonNullableTypeParams($argument0);
    }, (): GetNonNullableTypeParams__from_api => {
        return GetNonNullableTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetParameterTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetParameterTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetParameterTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetParameterTypeParams($argument0);
    }, (): GetParameterTypeParams__from_api => {
        return GetParameterTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetParentOfSymbolParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetParentOfSymbolParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetParentOfSymbolParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetParentOfSymbolParams($argument0);
    }, (): GetParentOfSymbolParams__from_api => {
        return GetParentOfSymbolParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetProjectDiagnosticsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetProjectDiagnosticsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetProjectDiagnosticsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetProjectDiagnosticsParams($argument0);
    }, (): GetProjectDiagnosticsParams__from_api => {
        return GetProjectDiagnosticsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetReferencedSymbolsForNodeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetReferencedSymbolsForNodeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetReferencedSymbolsForNodeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetReferencedSymbolsForNodeParams($argument0);
    }, (): GetReferencedSymbolsForNodeParams__from_api => {
        return GetReferencedSymbolsForNodeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetReferencesToSymbolInFileParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetReferencesToSymbolInFileParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetReferencesToSymbolInFileParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetReferencesToSymbolInFileParams($argument0);
    }, (): GetReferencesToSymbolInFileParams__from_api => {
        return GetReferencesToSymbolInFileParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetResolvedSignatureParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetResolvedSignatureParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetResolvedSignatureParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetResolvedSignatureParams($argument0);
    }, (): GetResolvedSignatureParams__from_api => {
        return GetResolvedSignatureParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSignatureUsagesParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSignatureUsagesParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSignatureUsagesParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSignatureUsagesParams($argument0);
    }, (): GetSignatureUsagesParams__from_api => {
        return GetSignatureUsagesParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSignaturesOfTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSignaturesOfTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSignaturesOfTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSignaturesOfTypeParams($argument0);
    }, (): GetSignaturesOfTypeParams__from_api => {
        return GetSignaturesOfTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSourceFileParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSourceFileParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSourceFileParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSourceFileParams($argument0);
    }, (): GetSourceFileParams__from_api => {
        return GetSourceFileParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSymbolAtLocationParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSymbolAtLocationParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSymbolAtLocationParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtLocationParams($argument0);
    }, (): GetSymbolAtLocationParams__from_api => {
        return GetSymbolAtLocationParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSymbolAtPositionParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSymbolAtPositionParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSymbolAtPositionParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSymbolAtPositionParams($argument0);
    }, (): GetSymbolAtPositionParams__from_api => {
        return GetSymbolAtPositionParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSymbolOfTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSymbolOfTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSymbolOfTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSymbolOfTypeParams($argument0);
    }, (): GetSymbolOfTypeParams__from_api => {
        return GetSymbolOfTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSymbolsAtLocationsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSymbolsAtLocationsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSymbolsAtLocationsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtLocationsParams($argument0);
    }, (): GetSymbolsAtLocationsParams__from_api => {
        return GetSymbolsAtLocationsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetSymbolsAtPositionsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetSymbolsAtPositionsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetSymbolsAtPositionsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetSymbolsAtPositionsParams($argument0);
    }, (): GetSymbolsAtPositionsParams__from_api => {
        return GetSymbolsAtPositionsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypeAtLocationParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypeAtLocationParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypeAtLocationParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationParams($argument0);
    }, (): GetTypeAtLocationParams__from_api => {
        return GetTypeAtLocationParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypeAtLocationsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypeAtLocationsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypeAtLocationsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtLocationsParams($argument0);
    }, (): GetTypeAtLocationsParams__from_api => {
        return GetTypeAtLocationsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypeAtPositionParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypeAtPositionParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypeAtPositionParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypeAtPositionParams($argument0);
    }, (): GetTypeAtPositionParams__from_api => {
        return GetTypeAtPositionParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypeFromTypeNodeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypeFromTypeNodeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypeFromTypeNodeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypeFromTypeNodeParams($argument0);
    }, (): GetTypeFromTypeNodeParams__from_api => {
        return GetTypeFromTypeNodeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypeOfSymbolAtLocationParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypeOfSymbolAtLocationParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypeOfSymbolAtLocationParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolAtLocationParams($argument0);
    }, (): GetTypeOfSymbolAtLocationParams__from_api => {
        return GetTypeOfSymbolAtLocationParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypeOfSymbolParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypeOfSymbolParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypeOfSymbolParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypeOfSymbolParams($argument0);
    }, (): GetTypeOfSymbolParams__from_api => {
        return GetTypeOfSymbolParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypePropertyParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypePropertyParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypePropertyParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypePropertyParams($argument0);
    }, (): GetTypePropertyParams__from_api => {
        return GetTypePropertyParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypesAtPositionsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypesAtPositionsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypesAtPositionsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypesAtPositionsParams($argument0);
    }, (): GetTypesAtPositionsParams__from_api => {
        return GetTypesAtPositionsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetTypesOfSymbolsParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetTypesOfSymbolsParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetTypesOfSymbolsParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetTypesOfSymbolsParams($argument0);
    }, (): GetTypesOfSymbolsParams__from_api => {
        return GetTypesOfSymbolsParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$GetWidenedTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<GetWidenedTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<GetWidenedTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$GetWidenedTypeParams($argument0);
    }, (): GetWidenedTypeParams__from_api => {
        return GetWidenedTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$IsArrayLikeTypeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<IsArrayLikeTypeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<IsArrayLikeTypeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$IsArrayLikeTypeParams($argument0);
    }, (): IsArrayLikeTypeParams__from_api => {
        return IsArrayLikeTypeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$IsTypeAssignableToParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<IsTypeAssignableToParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<IsTypeAssignableToParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$IsTypeAssignableToParams($argument0);
    }, (): IsTypeAssignableToParams__from_api => {
        return IsTypeAssignableToParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$ParseConfigFileParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<ParseConfigFileParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<ParseConfigFileParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$ParseConfigFileParams($argument0);
    }, (): ParseConfigFileParams__from_api => {
        return ParseConfigFileParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$PrintNodeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<PrintNodeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<PrintNodeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$PrintNodeParams($argument0);
    }, (): PrintNodeParams__from_api => {
        return PrintNodeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$ProfileParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<ProfileParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<ProfileParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$ProfileParams($argument0);
    }, (): ProfileParams__from_api => {
        return ProfileParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$ReleaseParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<ReleaseParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<ReleaseParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$ReleaseParams($argument0);
    }, (): ReleaseParams__from_api => {
        return ReleaseParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$ResolveNameParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<ResolveNameParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<ResolveNameParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$ResolveNameParams($argument0);
    }, (): ResolveNameParams__from_api => {
        return ResolveNameParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$SignatureToSignatureDeclarationParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<SignatureToSignatureDeclarationParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<SignatureToSignatureDeclarationParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$SignatureToSignatureDeclarationParams($argument0);
    }, (): SignatureToSignatureDeclarationParams__from_api => {
        return SignatureToSignatureDeclarationParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$TypeToTypeNodeParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<TypeToTypeNodeParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<TypeToTypeNodeParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$TypeToTypeNodeParams($argument0);
    }, (): TypeToTypeNodeParams__from_api => {
        return TypeToTypeNodeParams__from_api.$zero();
    }, $argument0);
}
export function unmarshallerFor$Named_api$UpdateSnapshotParams($argument0: RuntimeSlice<uint8>): [
    GoInterface | undefined,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    return unmarshallerFor$kernel<UpdateSnapshotParams__from_api>(($argument0: tsonicTypeScriptRuntime.Location<UpdateSnapshotParams__from_api> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_api$UpdateSnapshotParams($argument0);
    }, (): UpdateSnapshotParams__from_api => {
        return UpdateSnapshotParams__from_api.$zero();
    }, $argument0);
}
