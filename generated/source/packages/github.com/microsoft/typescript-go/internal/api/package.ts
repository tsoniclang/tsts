import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { MethodGetAliasSymbolOfType$constant, MethodGetAliasTypeArgumentsOfType$constant, MethodGetAnyType$constant, MethodGetBaseTypeOfLiteralType$constant, MethodGetBaseTypeOfType$constant, MethodGetBaseTypes$constant, MethodGetBigIntType$constant, MethodGetBooleanType$constant, MethodGetCheckTypeOfType$constant, MethodGetCompletionsAtPosition$constant, MethodGetConfigFileParsingDiagnostics$constant, MethodGetConstraintOfType$constant, MethodGetConstraintOfTypeParameter$constant, MethodGetContextualType$constant, MethodGetDeclarationDiagnostics$constant, MethodGetDeclaredTypeOfSymbol$constant, MethodGetDefaultProjectForFile$constant, MethodGetESSymbolType$constant, MethodGetExportSymbolOfSymbol$constant, MethodGetExportsOfSymbol$constant, MethodGetExtendsTypeOfType$constant, MethodGetFreshTypeOfType$constant, MethodGetIndexInfosOfType$constant, MethodGetIndexTypeOfType$constant, MethodGetLocalTypeParametersOfType$constant, MethodGetMembersOfSymbol$constant, MethodGetNeverType$constant, MethodGetNonNullableType$constant, MethodGetNullType$constant, MethodGetNumberType$constant, MethodGetObjectTypeOfType$constant, MethodGetOuterTypeParametersOfType$constant, MethodGetParameterType$constant, MethodGetParentOfSymbol$constant, MethodGetPropertiesOfType$constant, MethodGetReferencedSymbolsForNode$constant, MethodGetReferencesToSymbolInFile$constant, MethodGetRegularTypeOfType$constant, MethodGetResolvedSignature$constant, MethodGetRestTypeOfSignature$constant, MethodGetReturnTypeOfSignature$constant, MethodGetSemanticDiagnostics$constant, MethodGetShorthandAssignmentValueSymbol$constant, MethodGetSignatureUsages$constant, MethodGetSignaturesOfType$constant, MethodGetSourceFile$constant, MethodGetStringType$constant, MethodGetSuggestionDiagnostics$constant, MethodGetSymbolAtLocation$constant, MethodGetSymbolAtPosition$constant, MethodGetSymbolOfType$constant, MethodGetSymbolsAtLocations$constant, MethodGetSymbolsAtPositions$constant, MethodGetSyntacticDiagnostics$constant, MethodGetTargetOfType$constant, MethodGetTypeArguments$constant, MethodGetTypeAtLocation$constant, MethodGetTypeAtLocations$constant, MethodGetTypeAtPosition$constant, MethodGetTypeFromTypeNode$constant, MethodGetTypeOfSymbol$constant, MethodGetTypeOfSymbolAtLocation$constant, MethodGetTypeParametersOfType$constant, MethodGetTypePredicateOfSignature$constant, MethodGetTypesAtPositions$constant, MethodGetTypesOfSymbols$constant, MethodGetTypesOfType$constant, MethodGetUndefinedType$constant, MethodGetUnknownType$constant, MethodGetVoidType$constant, MethodGetWidenedType$constant, MethodInitialize$constant, MethodIsArrayLikeType$constant, MethodIsContextSensitive$constant, MethodIsTypeAssignableTo$constant, MethodParseConfigFile$constant, MethodPrintNode$constant, MethodRelease$constant, MethodResolveName$constant, MethodSaveHeapProfile$constant, MethodSignatureToSignatureDeclaration$constant, MethodStartCPUProfile$constant, MethodStopCPUProfile$constant, MethodTypeToString$constant, MethodTypeToTypeNode$constant, MethodUpdateSnapshot$constant, noParams } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/proto.js";
import { MessageTypeCall$constant, MessageTypeCallError$constant, MessageTypeCallResponse$constant, MessageTypeError$constant, MessageTypeRequest$constant, MessageTypeResponse$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/protocol_msgpack.js";
import { unmarshallerFor$Named_api$CheckerSignatureParams, unmarshallerFor$Named_api$CheckerTypeParams, unmarshallerFor$Named_api$GetBaseTypeOfLiteralTypeParams, unmarshallerFor$Named_api$GetCompletionsAtPositionParams, unmarshallerFor$Named_api$GetContextualTypeParams, unmarshallerFor$Named_api$GetDefaultProjectForFileParams, unmarshallerFor$Named_api$GetDiagnosticsParams, unmarshallerFor$Named_api$GetExportSymbolOfSymbolParams, unmarshallerFor$Named_api$GetExportsOfSymbolParams, unmarshallerFor$Named_api$GetIntrinsicTypeParams, unmarshallerFor$Named_api$GetMembersOfSymbolParams, unmarshallerFor$Named_api$GetNonNullableTypeParams, unmarshallerFor$Named_api$GetParameterTypeParams, unmarshallerFor$Named_api$GetParentOfSymbolParams, unmarshallerFor$Named_api$GetProjectDiagnosticsParams, unmarshallerFor$Named_api$GetReferencedSymbolsForNodeParams, unmarshallerFor$Named_api$GetReferencesToSymbolInFileParams, unmarshallerFor$Named_api$GetResolvedSignatureParams, unmarshallerFor$Named_api$GetSignatureUsagesParams, unmarshallerFor$Named_api$GetSignaturesOfTypeParams, unmarshallerFor$Named_api$GetSourceFileParams, unmarshallerFor$Named_api$GetSymbolAtLocationParams, unmarshallerFor$Named_api$GetSymbolAtPositionParams, unmarshallerFor$Named_api$GetSymbolOfTypeParams, unmarshallerFor$Named_api$GetSymbolsAtLocationsParams, unmarshallerFor$Named_api$GetSymbolsAtPositionsParams, unmarshallerFor$Named_api$GetTypeAtLocationParams, unmarshallerFor$Named_api$GetTypeAtLocationsParams, unmarshallerFor$Named_api$GetTypeAtPositionParams, unmarshallerFor$Named_api$GetTypeFromTypeNodeParams, unmarshallerFor$Named_api$GetTypeOfSymbolAtLocationParams, unmarshallerFor$Named_api$GetTypeOfSymbolParams, unmarshallerFor$Named_api$GetTypePropertyParams, unmarshallerFor$Named_api$GetTypesAtPositionsParams, unmarshallerFor$Named_api$GetTypesOfSymbolsParams, unmarshallerFor$Named_api$GetWidenedTypeParams, unmarshallerFor$Named_api$IsArrayLikeTypeParams, unmarshallerFor$Named_api$IsTypeAssignableToParams, unmarshallerFor$Named_api$ParseConfigFileParams, unmarshallerFor$Named_api$PrintNodeParams, unmarshallerFor$Named_api$ProfileParams, unmarshallerFor$Named_api$ReleaseParams, unmarshallerFor$Named_api$ResolveNameParams, unmarshallerFor$Named_api$SignatureToSignatureDeclarationParams, unmarshallerFor$Named_api$TypeToTypeNodeParams, unmarshallerFor$Named_api$UpdateSnapshotParams } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/api/unmarshallerFor.js";
import { $goMap$MapOf_Named_api$Method_To_SliceOf_byte_to_Interface_void_Named_error as GoMap } from "../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import { GoArray } from "@gotots/runtime/array.js";
export function $initialize(): void {
    MessageTypeCall = MessageTypeCall$constant();
    MessageTypeCallError = MessageTypeCallError$constant();
    MessageTypeCallResponse = MessageTypeCallResponse$constant();
    MessageTypeError = MessageTypeError$constant();
    MessageTypeRequest = MessageTypeRequest$constant();
    MessageTypeResponse = MessageTypeResponse$constant();
    MethodGetAliasSymbolOfType = MethodGetAliasSymbolOfType$constant();
    MethodGetAliasTypeArgumentsOfType = MethodGetAliasTypeArgumentsOfType$constant();
    MethodGetAnyType = MethodGetAnyType$constant();
    MethodGetBaseTypeOfLiteralType = MethodGetBaseTypeOfLiteralType$constant();
    MethodGetBaseTypeOfType = MethodGetBaseTypeOfType$constant();
    MethodGetBaseTypes = MethodGetBaseTypes$constant();
    MethodGetBigIntType = MethodGetBigIntType$constant();
    MethodGetBooleanType = MethodGetBooleanType$constant();
    MethodGetCheckTypeOfType = MethodGetCheckTypeOfType$constant();
    MethodGetCompletionsAtPosition = MethodGetCompletionsAtPosition$constant();
    MethodGetConfigFileParsingDiagnostics = MethodGetConfigFileParsingDiagnostics$constant();
    MethodGetConstraintOfType = MethodGetConstraintOfType$constant();
    MethodGetConstraintOfTypeParameter = MethodGetConstraintOfTypeParameter$constant();
    MethodGetContextualType = MethodGetContextualType$constant();
    MethodGetDeclarationDiagnostics = MethodGetDeclarationDiagnostics$constant();
    MethodGetDeclaredTypeOfSymbol = MethodGetDeclaredTypeOfSymbol$constant();
    MethodGetDefaultProjectForFile = MethodGetDefaultProjectForFile$constant();
    MethodGetESSymbolType = MethodGetESSymbolType$constant();
    MethodGetExportSymbolOfSymbol = MethodGetExportSymbolOfSymbol$constant();
    MethodGetExportsOfSymbol = MethodGetExportsOfSymbol$constant();
    MethodGetExtendsTypeOfType = MethodGetExtendsTypeOfType$constant();
    MethodGetFreshTypeOfType = MethodGetFreshTypeOfType$constant();
    MethodGetIndexInfosOfType = MethodGetIndexInfosOfType$constant();
    MethodGetIndexTypeOfType = MethodGetIndexTypeOfType$constant();
    MethodGetLocalTypeParametersOfType = MethodGetLocalTypeParametersOfType$constant();
    MethodGetMembersOfSymbol = MethodGetMembersOfSymbol$constant();
    MethodGetNeverType = MethodGetNeverType$constant();
    MethodGetNonNullableType = MethodGetNonNullableType$constant();
    MethodGetNullType = MethodGetNullType$constant();
    MethodGetNumberType = MethodGetNumberType$constant();
    MethodGetObjectTypeOfType = MethodGetObjectTypeOfType$constant();
    MethodGetOuterTypeParametersOfType = MethodGetOuterTypeParametersOfType$constant();
    MethodGetParameterType = MethodGetParameterType$constant();
    MethodGetParentOfSymbol = MethodGetParentOfSymbol$constant();
    MethodGetPropertiesOfType = MethodGetPropertiesOfType$constant();
    MethodGetReferencedSymbolsForNode = MethodGetReferencedSymbolsForNode$constant();
    MethodGetReferencesToSymbolInFile = MethodGetReferencesToSymbolInFile$constant();
    MethodGetRegularTypeOfType = MethodGetRegularTypeOfType$constant();
    MethodGetResolvedSignature = MethodGetResolvedSignature$constant();
    MethodGetRestTypeOfSignature = MethodGetRestTypeOfSignature$constant();
    MethodGetReturnTypeOfSignature = MethodGetReturnTypeOfSignature$constant();
    MethodGetSemanticDiagnostics = MethodGetSemanticDiagnostics$constant();
    MethodGetShorthandAssignmentValueSymbol = MethodGetShorthandAssignmentValueSymbol$constant();
    MethodGetSignatureUsages = MethodGetSignatureUsages$constant();
    MethodGetSignaturesOfType = MethodGetSignaturesOfType$constant();
    MethodGetSourceFile = MethodGetSourceFile$constant();
    MethodGetStringType = MethodGetStringType$constant();
    MethodGetSuggestionDiagnostics = MethodGetSuggestionDiagnostics$constant();
    MethodGetSymbolAtLocation = MethodGetSymbolAtLocation$constant();
    MethodGetSymbolAtPosition = MethodGetSymbolAtPosition$constant();
    MethodGetSymbolOfType = MethodGetSymbolOfType$constant();
    MethodGetSymbolsAtLocations = MethodGetSymbolsAtLocations$constant();
    MethodGetSymbolsAtPositions = MethodGetSymbolsAtPositions$constant();
    MethodGetSyntacticDiagnostics = MethodGetSyntacticDiagnostics$constant();
    MethodGetTargetOfType = MethodGetTargetOfType$constant();
    MethodGetTypeArguments = MethodGetTypeArguments$constant();
    MethodGetTypeAtLocation = MethodGetTypeAtLocation$constant();
    MethodGetTypeAtLocations = MethodGetTypeAtLocations$constant();
    MethodGetTypeAtPosition = MethodGetTypeAtPosition$constant();
    MethodGetTypeFromTypeNode = MethodGetTypeFromTypeNode$constant();
    MethodGetTypeOfSymbol = MethodGetTypeOfSymbol$constant();
    MethodGetTypeOfSymbolAtLocation = MethodGetTypeOfSymbolAtLocation$constant();
    MethodGetTypeParametersOfType = MethodGetTypeParametersOfType$constant();
    MethodGetTypePredicateOfSignature = MethodGetTypePredicateOfSignature$constant();
    MethodGetTypesAtPositions = MethodGetTypesAtPositions$constant();
    MethodGetTypesOfSymbols = MethodGetTypesOfSymbols$constant();
    MethodGetTypesOfType = MethodGetTypesOfType$constant();
    MethodGetUndefinedType = MethodGetUndefinedType$constant();
    MethodGetUnknownType = MethodGetUnknownType$constant();
    MethodGetVoidType = MethodGetVoidType$constant();
    MethodGetWidenedType = MethodGetWidenedType$constant();
    MethodInitialize = MethodInitialize$constant();
    MethodIsArrayLikeType = MethodIsArrayLikeType$constant();
    MethodIsContextSensitive = MethodIsContextSensitive$constant();
    MethodIsTypeAssignableTo = MethodIsTypeAssignableTo$constant();
    MethodParseConfigFile = MethodParseConfigFile$constant();
    MethodPrintNode = MethodPrintNode$constant();
    MethodRelease = MethodRelease$constant();
    MethodResolveName = MethodResolveName$constant();
    MethodSaveHeapProfile = MethodSaveHeapProfile$constant();
    MethodSignatureToSignatureDeclaration = MethodSignatureToSignatureDeclaration$constant();
    MethodStartCPUProfile = MethodStartCPUProfile$constant();
    MethodStopCPUProfile = MethodStopCPUProfile$constant();
    MethodTypeToString = MethodTypeToString$constant();
    MethodTypeToTypeNode = MethodTypeToTypeNode$constant();
    MethodUpdateSnapshot = MethodUpdateSnapshot$constant();
    $state.ErrClientError = void 0;
    $state.ErrConnClosed = void 0;
    $state.ErrInvalidRequest = void 0;
    $state.ErrRequestTimeout = void 0;
    $state._MessageType_index = GoArray.zero<uint8, 8>(8, 0);
    $state.sessionIDCounter = named_sync_atomic.SyncAtomicUint64Operations.$zero();
    $state.unmarshalers = GoMap.nil();
    {
        $state.ErrConnClosed = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("api: connection closed"));
    }
    {
        $state.ErrRequestTimeout = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("api: request timeout"));
    }
    {
        $state.ErrInvalidRequest = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("api: invalid request"));
    }
    {
        $state.ErrClientError = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("api: client error"));
    }
    {
        void 0;
    }
    {
        $state.unmarshalers = GoMap.make(86, [[MethodRelease$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$ReleaseParams($argument0);
                }], [MethodInitialize$constant(), noParams], [MethodUpdateSnapshot$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$UpdateSnapshotParams($argument0);
                }], [MethodParseConfigFile$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$ParseConfigFileParams($argument0);
                }], [MethodGetDefaultProjectForFile$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetDefaultProjectForFileParams($argument0);
                }], [MethodGetSourceFile$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSourceFileParams($argument0);
                }], [MethodGetSymbolAtPosition$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSymbolAtPositionParams($argument0);
                }], [MethodGetSymbolsAtPositions$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSymbolsAtPositionsParams($argument0);
                }], [MethodGetSymbolAtLocation$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSymbolAtLocationParams($argument0);
                }], [MethodGetSymbolsAtLocations$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSymbolsAtLocationsParams($argument0);
                }], [MethodGetTypeOfSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeOfSymbolParams($argument0);
                }], [MethodGetTypesOfSymbols$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypesOfSymbolsParams($argument0);
                }], [MethodGetDeclaredTypeOfSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeOfSymbolParams($argument0);
                }], [MethodResolveName$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$ResolveNameParams($argument0);
                }], [MethodGetParentOfSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetParentOfSymbolParams($argument0);
                }], [MethodGetMembersOfSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetMembersOfSymbolParams($argument0);
                }], [MethodGetExportsOfSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetExportsOfSymbolParams($argument0);
                }], [MethodGetExportSymbolOfSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetExportSymbolOfSymbolParams($argument0);
                }], [MethodGetSymbolOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSymbolOfTypeParams($argument0);
                }], [MethodGetSignaturesOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSignaturesOfTypeParams($argument0);
                }], [MethodGetResolvedSignature$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetResolvedSignatureParams($argument0);
                }], [MethodGetTypeAtLocation$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeAtLocationParams($argument0);
                }], [MethodGetTypeAtLocations$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeAtLocationsParams($argument0);
                }], [MethodGetTypeAtPosition$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeAtPositionParams($argument0);
                }], [MethodGetTypesAtPositions$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypesAtPositionsParams($argument0);
                }], [MethodGetTargetOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetFreshTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetRegularTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetTypesOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetTypeParametersOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetOuterTypeParametersOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetLocalTypeParametersOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetAliasTypeArgumentsOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetAliasSymbolOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetObjectTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetIndexTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetCheckTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetExtendsTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetBaseTypeOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetConstraintOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypePropertyParams($argument0);
                }], [MethodGetContextualType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetContextualTypeParams($argument0);
                }], [MethodGetBaseTypeOfLiteralType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetBaseTypeOfLiteralTypeParams($argument0);
                }], [MethodGetNonNullableType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetNonNullableTypeParams($argument0);
                }], [MethodGetTypeFromTypeNode$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeFromTypeNodeParams($argument0);
                }], [MethodGetWidenedType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetWidenedTypeParams($argument0);
                }], [MethodGetParameterType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetParameterTypeParams($argument0);
                }], [MethodIsArrayLikeType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$IsArrayLikeTypeParams($argument0);
                }], [MethodIsTypeAssignableTo$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$IsTypeAssignableToParams($argument0);
                }], [MethodGetShorthandAssignmentValueSymbol$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeAtLocationParams($argument0);
                }], [MethodGetTypeOfSymbolAtLocation$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetTypeOfSymbolAtLocationParams($argument0);
                }], [MethodTypeToTypeNode$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$TypeToTypeNodeParams($argument0);
                }], [MethodSignatureToSignatureDeclaration$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$SignatureToSignatureDeclarationParams($argument0);
                }], [MethodTypeToString$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$TypeToTypeNodeParams($argument0);
                }], [MethodIsContextSensitive$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetContextualTypeParams($argument0);
                }], [MethodGetReturnTypeOfSignature$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerSignatureParams($argument0);
                }], [MethodGetRestTypeOfSignature$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerSignatureParams($argument0);
                }], [MethodGetTypePredicateOfSignature$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerSignatureParams($argument0);
                }], [MethodGetBaseTypes$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerTypeParams($argument0);
                }], [MethodGetPropertiesOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerTypeParams($argument0);
                }], [MethodGetIndexInfosOfType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerTypeParams($argument0);
                }], [MethodGetConstraintOfTypeParameter$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerTypeParams($argument0);
                }], [MethodGetTypeArguments$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$CheckerTypeParams($argument0);
                }], [MethodGetReferencesToSymbolInFile$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetReferencesToSymbolInFileParams($argument0);
                }], [MethodGetReferencedSymbolsForNode$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetReferencedSymbolsForNodeParams($argument0);
                }], [MethodGetSignatureUsages$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetSignatureUsagesParams($argument0);
                }], [MethodGetCompletionsAtPosition$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetCompletionsAtPositionParams($argument0);
                }], [MethodPrintNode$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$PrintNodeParams($argument0);
                }], [MethodGetAnyType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetStringType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetNumberType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetBooleanType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetVoidType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetUndefinedType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetNullType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetNeverType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetUnknownType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetBigIntType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetESSymbolType$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetIntrinsicTypeParams($argument0);
                }], [MethodGetSyntacticDiagnostics$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetDiagnosticsParams($argument0);
                }], [MethodGetSemanticDiagnostics$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetDiagnosticsParams($argument0);
                }], [MethodGetSuggestionDiagnostics$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetDiagnosticsParams($argument0);
                }], [MethodGetDeclarationDiagnostics$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetDiagnosticsParams($argument0);
                }], [MethodGetConfigFileParsingDiagnostics$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$GetProjectDiagnosticsParams($argument0);
                }], [MethodStartCPUProfile$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$ProfileParams($argument0);
                }], [MethodStopCPUProfile$constant(), noParams], [MethodSaveHeapProfile$constant(), ($argument0: RuntimeSlice<uint8>): [
                    GoInterface | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ] => {
                    return unmarshallerFor$Named_api$ProfileParams($argument0);
                }]]);
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        void 0;
    }
    {
        $state._MessageType_index = GoArray.literal<uint8, 8>(8, 0, [0, 1, 2, 3, 4, 5, 6, 7], [0, 18, 36, 59, 79, 98, 114, 129]);
    }
}
export { Conn, Conn$contract, Conn$is, Handler, Handler$contract, Handler$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/conn.js";
export { AsyncConn, NewAsyncConn, NewAsyncConnWithProtocol } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/conn_async.js";
export { NewSyncConn, SyncConn } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/conn_sync.js";
export { APIFileChanges, CheckerSignatureParams, CheckerTypeParams, CompletionEntryLabelDetailsResponse, CompletionEntryResponse, CompletionInfoResponse, ConfigFileResponse, DiagnosticResponse, DocumentIdentifier, DocumentIdentifier$Storage, GetBaseTypeOfLiteralTypeParams, GetCompletionsAtPositionParams, GetContextualTypeParams, GetDefaultProjectForFileParams, GetDiagnosticsParams, GetExportSymbolOfSymbolParams, GetExportsOfSymbolParams, GetIntrinsicTypeParams, GetMembersOfSymbolParams, GetNonNullableTypeParams, GetParameterTypeParams, GetParentOfSymbolParams, GetProjectDiagnosticsParams, GetReferencedSymbolsForNodeParams, GetReferencesToSymbolInFileParams, GetResolvedSignatureParams, GetSignatureUsagesParams, GetSignaturesOfTypeParams, GetSourceFileParams, GetSymbolAtLocationParams, GetSymbolAtPositionParams, GetSymbolOfTypeParams, GetSymbolsAtLocationsParams, GetSymbolsAtPositionsParams, GetTypeAtLocationParams, GetTypeAtLocationsParams, GetTypeAtPositionParams, GetTypeFromTypeNodeParams, GetTypeOfSymbolAtLocationParams, GetTypeOfSymbolParams, GetTypePropertyParams, GetTypesAtPositionsParams, GetTypesOfSymbolsParams, GetWidenedTypeParams, IndexInfoResponse, InitializeResponse, IsArrayLikeTypeParams, IsTypeAssignableToParams, Method, MethodGetAliasSymbolOfType$constant, MethodGetAliasTypeArgumentsOfType$constant, MethodGetAnyType$constant, MethodGetBaseTypeOfLiteralType$constant, MethodGetBaseTypeOfType$constant, MethodGetBaseTypes$constant, MethodGetBigIntType$constant, MethodGetBooleanType$constant, MethodGetCheckTypeOfType$constant, MethodGetCompletionsAtPosition$constant, MethodGetConfigFileParsingDiagnostics$constant, MethodGetConstraintOfType$constant, MethodGetConstraintOfTypeParameter$constant, MethodGetContextualType$constant, MethodGetDeclarationDiagnostics$constant, MethodGetDeclaredTypeOfSymbol$constant, MethodGetDefaultProjectForFile$constant, MethodGetESSymbolType$constant, MethodGetExportSymbolOfSymbol$constant, MethodGetExportsOfSymbol$constant, MethodGetExtendsTypeOfType$constant, MethodGetFreshTypeOfType$constant, MethodGetIndexInfosOfType$constant, MethodGetIndexTypeOfType$constant, MethodGetLocalTypeParametersOfType$constant, MethodGetMembersOfSymbol$constant, MethodGetNeverType$constant, MethodGetNonNullableType$constant, MethodGetNullType$constant, MethodGetNumberType$constant, MethodGetObjectTypeOfType$constant, MethodGetOuterTypeParametersOfType$constant, MethodGetParameterType$constant, MethodGetParentOfSymbol$constant, MethodGetPropertiesOfType$constant, MethodGetReferencedSymbolsForNode$constant, MethodGetReferencesToSymbolInFile$constant, MethodGetRegularTypeOfType$constant, MethodGetResolvedSignature$constant, MethodGetRestTypeOfSignature$constant, MethodGetReturnTypeOfSignature$constant, MethodGetSemanticDiagnostics$constant, MethodGetShorthandAssignmentValueSymbol$constant, MethodGetSignatureUsages$constant, MethodGetSignaturesOfType$constant, MethodGetSourceFile$constant, MethodGetStringType$constant, MethodGetSuggestionDiagnostics$constant, MethodGetSymbolAtLocation$constant, MethodGetSymbolAtPosition$constant, MethodGetSymbolOfType$constant, MethodGetSymbolsAtLocations$constant, MethodGetSymbolsAtPositions$constant, MethodGetSyntacticDiagnostics$constant, MethodGetTargetOfType$constant, MethodGetTypeArguments$constant, MethodGetTypeAtLocation$constant, MethodGetTypeAtLocations$constant, MethodGetTypeAtPosition$constant, MethodGetTypeFromTypeNode$constant, MethodGetTypeOfSymbol$constant, MethodGetTypeOfSymbolAtLocation$constant, MethodGetTypeParametersOfType$constant, MethodGetTypePredicateOfSignature$constant, MethodGetTypesAtPositions$constant, MethodGetTypesOfSymbols$constant, MethodGetTypesOfType$constant, MethodGetUndefinedType$constant, MethodGetUnknownType$constant, MethodGetVoidType$constant, MethodGetWidenedType$constant, MethodInitialize$constant, MethodIsArrayLikeType$constant, MethodIsContextSensitive$constant, MethodIsTypeAssignableTo$constant, MethodParseConfigFile$constant, MethodPrintNode$constant, MethodRelease$constant, MethodResolveName$constant, MethodSaveHeapProfile$constant, MethodSignatureToSignatureDeclaration$constant, MethodStartCPUProfile$constant, MethodStopCPUProfile$constant, MethodTypeToString$constant, MethodTypeToTypeNode$constant, MethodUpdateSnapshot$constant, NewDiagnosticResponse, NewDiagnosticResponses, NewProjectResponse, NewSymbolResponse, NodeHandle, ParseConfigFileParams, PrintNodeParams, ProfileParams, ProfileResult, ProjectFileChanges, ProjectHandle, ProjectID, ProjectResponse, ReferencedSymbolEntry, ReferencedSymbolEntry$Storage, ReleaseParams, ResolveNameParams, SignatureHandle, SignatureID, SignatureResponse, SignatureToSignatureDeclarationParams, SignatureUsageResponse, SignatureUsageResponse$Storage, SnapshotChanges, SnapshotID, SourceFileResponse, SymbolHandle, SymbolID, SymbolResponse, TypeHandle, TypeID, TypePredicateResponse, TypeResponse, TypeToTypeNodeParams, UpdateSnapshotParams, UpdateSnapshotResponse } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/proto.js";
export { Protocol, Protocol$contract, Protocol$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/protocol.js";
export { JSONRPCProtocol, NewJSONRPCProtocol } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/protocol_jsonrpc.js";
export { MessagePackProtocol, MessageType, MessageTypeCall$constant, MessageTypeCallError$constant, MessageTypeCallResponse$constant, MessageTypeError$constant, MessageTypeRequest$constant, MessageTypeResponse$constant, MessageType_IsValid, MessageType_String, NewMessagePackProtocol, RawBinary } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/protocol_msgpack.js";
export { NewStdioServer, StdioServer, StdioServerOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/server.js";
export { NewSession, Session, SessionOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/session.js";
export { NewPipeTransport, NewStdioTransport, PipeTransport, StdioTransport, Transport, Transport$contract, Transport$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/transport.js";
export { GeneratePipePath } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/api/transport_unix.js";
export let MessageTypeCall: ReturnType<typeof MessageTypeCall$constant>;
export let MessageTypeCallError: ReturnType<typeof MessageTypeCallError$constant>;
export let MessageTypeCallResponse: ReturnType<typeof MessageTypeCallResponse$constant>;
export let MessageTypeError: ReturnType<typeof MessageTypeError$constant>;
export let MessageTypeRequest: ReturnType<typeof MessageTypeRequest$constant>;
export let MessageTypeResponse: ReturnType<typeof MessageTypeResponse$constant>;
export let MethodGetAliasSymbolOfType: ReturnType<typeof MethodGetAliasSymbolOfType$constant>;
export let MethodGetAliasTypeArgumentsOfType: ReturnType<typeof MethodGetAliasTypeArgumentsOfType$constant>;
export let MethodGetAnyType: ReturnType<typeof MethodGetAnyType$constant>;
export let MethodGetBaseTypeOfLiteralType: ReturnType<typeof MethodGetBaseTypeOfLiteralType$constant>;
export let MethodGetBaseTypeOfType: ReturnType<typeof MethodGetBaseTypeOfType$constant>;
export let MethodGetBaseTypes: ReturnType<typeof MethodGetBaseTypes$constant>;
export let MethodGetBigIntType: ReturnType<typeof MethodGetBigIntType$constant>;
export let MethodGetBooleanType: ReturnType<typeof MethodGetBooleanType$constant>;
export let MethodGetCheckTypeOfType: ReturnType<typeof MethodGetCheckTypeOfType$constant>;
export let MethodGetCompletionsAtPosition: ReturnType<typeof MethodGetCompletionsAtPosition$constant>;
export let MethodGetConfigFileParsingDiagnostics: ReturnType<typeof MethodGetConfigFileParsingDiagnostics$constant>;
export let MethodGetConstraintOfType: ReturnType<typeof MethodGetConstraintOfType$constant>;
export let MethodGetConstraintOfTypeParameter: ReturnType<typeof MethodGetConstraintOfTypeParameter$constant>;
export let MethodGetContextualType: ReturnType<typeof MethodGetContextualType$constant>;
export let MethodGetDeclarationDiagnostics: ReturnType<typeof MethodGetDeclarationDiagnostics$constant>;
export let MethodGetDeclaredTypeOfSymbol: ReturnType<typeof MethodGetDeclaredTypeOfSymbol$constant>;
export let MethodGetDefaultProjectForFile: ReturnType<typeof MethodGetDefaultProjectForFile$constant>;
export let MethodGetESSymbolType: ReturnType<typeof MethodGetESSymbolType$constant>;
export let MethodGetExportSymbolOfSymbol: ReturnType<typeof MethodGetExportSymbolOfSymbol$constant>;
export let MethodGetExportsOfSymbol: ReturnType<typeof MethodGetExportsOfSymbol$constant>;
export let MethodGetExtendsTypeOfType: ReturnType<typeof MethodGetExtendsTypeOfType$constant>;
export let MethodGetFreshTypeOfType: ReturnType<typeof MethodGetFreshTypeOfType$constant>;
export let MethodGetIndexInfosOfType: ReturnType<typeof MethodGetIndexInfosOfType$constant>;
export let MethodGetIndexTypeOfType: ReturnType<typeof MethodGetIndexTypeOfType$constant>;
export let MethodGetLocalTypeParametersOfType: ReturnType<typeof MethodGetLocalTypeParametersOfType$constant>;
export let MethodGetMembersOfSymbol: ReturnType<typeof MethodGetMembersOfSymbol$constant>;
export let MethodGetNeverType: ReturnType<typeof MethodGetNeverType$constant>;
export let MethodGetNonNullableType: ReturnType<typeof MethodGetNonNullableType$constant>;
export let MethodGetNullType: ReturnType<typeof MethodGetNullType$constant>;
export let MethodGetNumberType: ReturnType<typeof MethodGetNumberType$constant>;
export let MethodGetObjectTypeOfType: ReturnType<typeof MethodGetObjectTypeOfType$constant>;
export let MethodGetOuterTypeParametersOfType: ReturnType<typeof MethodGetOuterTypeParametersOfType$constant>;
export let MethodGetParameterType: ReturnType<typeof MethodGetParameterType$constant>;
export let MethodGetParentOfSymbol: ReturnType<typeof MethodGetParentOfSymbol$constant>;
export let MethodGetPropertiesOfType: ReturnType<typeof MethodGetPropertiesOfType$constant>;
export let MethodGetReferencedSymbolsForNode: ReturnType<typeof MethodGetReferencedSymbolsForNode$constant>;
export let MethodGetReferencesToSymbolInFile: ReturnType<typeof MethodGetReferencesToSymbolInFile$constant>;
export let MethodGetRegularTypeOfType: ReturnType<typeof MethodGetRegularTypeOfType$constant>;
export let MethodGetResolvedSignature: ReturnType<typeof MethodGetResolvedSignature$constant>;
export let MethodGetRestTypeOfSignature: ReturnType<typeof MethodGetRestTypeOfSignature$constant>;
export let MethodGetReturnTypeOfSignature: ReturnType<typeof MethodGetReturnTypeOfSignature$constant>;
export let MethodGetSemanticDiagnostics: ReturnType<typeof MethodGetSemanticDiagnostics$constant>;
export let MethodGetShorthandAssignmentValueSymbol: ReturnType<typeof MethodGetShorthandAssignmentValueSymbol$constant>;
export let MethodGetSignatureUsages: ReturnType<typeof MethodGetSignatureUsages$constant>;
export let MethodGetSignaturesOfType: ReturnType<typeof MethodGetSignaturesOfType$constant>;
export let MethodGetSourceFile: ReturnType<typeof MethodGetSourceFile$constant>;
export let MethodGetStringType: ReturnType<typeof MethodGetStringType$constant>;
export let MethodGetSuggestionDiagnostics: ReturnType<typeof MethodGetSuggestionDiagnostics$constant>;
export let MethodGetSymbolAtLocation: ReturnType<typeof MethodGetSymbolAtLocation$constant>;
export let MethodGetSymbolAtPosition: ReturnType<typeof MethodGetSymbolAtPosition$constant>;
export let MethodGetSymbolOfType: ReturnType<typeof MethodGetSymbolOfType$constant>;
export let MethodGetSymbolsAtLocations: ReturnType<typeof MethodGetSymbolsAtLocations$constant>;
export let MethodGetSymbolsAtPositions: ReturnType<typeof MethodGetSymbolsAtPositions$constant>;
export let MethodGetSyntacticDiagnostics: ReturnType<typeof MethodGetSyntacticDiagnostics$constant>;
export let MethodGetTargetOfType: ReturnType<typeof MethodGetTargetOfType$constant>;
export let MethodGetTypeArguments: ReturnType<typeof MethodGetTypeArguments$constant>;
export let MethodGetTypeAtLocation: ReturnType<typeof MethodGetTypeAtLocation$constant>;
export let MethodGetTypeAtLocations: ReturnType<typeof MethodGetTypeAtLocations$constant>;
export let MethodGetTypeAtPosition: ReturnType<typeof MethodGetTypeAtPosition$constant>;
export let MethodGetTypeFromTypeNode: ReturnType<typeof MethodGetTypeFromTypeNode$constant>;
export let MethodGetTypeOfSymbol: ReturnType<typeof MethodGetTypeOfSymbol$constant>;
export let MethodGetTypeOfSymbolAtLocation: ReturnType<typeof MethodGetTypeOfSymbolAtLocation$constant>;
export let MethodGetTypeParametersOfType: ReturnType<typeof MethodGetTypeParametersOfType$constant>;
export let MethodGetTypePredicateOfSignature: ReturnType<typeof MethodGetTypePredicateOfSignature$constant>;
export let MethodGetTypesAtPositions: ReturnType<typeof MethodGetTypesAtPositions$constant>;
export let MethodGetTypesOfSymbols: ReturnType<typeof MethodGetTypesOfSymbols$constant>;
export let MethodGetTypesOfType: ReturnType<typeof MethodGetTypesOfType$constant>;
export let MethodGetUndefinedType: ReturnType<typeof MethodGetUndefinedType$constant>;
export let MethodGetUnknownType: ReturnType<typeof MethodGetUnknownType$constant>;
export let MethodGetVoidType: ReturnType<typeof MethodGetVoidType$constant>;
export let MethodGetWidenedType: ReturnType<typeof MethodGetWidenedType$constant>;
export let MethodInitialize: ReturnType<typeof MethodInitialize$constant>;
export let MethodIsArrayLikeType: ReturnType<typeof MethodIsArrayLikeType$constant>;
export let MethodIsContextSensitive: ReturnType<typeof MethodIsContextSensitive$constant>;
export let MethodIsTypeAssignableTo: ReturnType<typeof MethodIsTypeAssignableTo$constant>;
export let MethodParseConfigFile: ReturnType<typeof MethodParseConfigFile$constant>;
export let MethodPrintNode: ReturnType<typeof MethodPrintNode$constant>;
export let MethodRelease: ReturnType<typeof MethodRelease$constant>;
export let MethodResolveName: ReturnType<typeof MethodResolveName$constant>;
export let MethodSaveHeapProfile: ReturnType<typeof MethodSaveHeapProfile$constant>;
export let MethodSignatureToSignatureDeclaration: ReturnType<typeof MethodSignatureToSignatureDeclaration$constant>;
export let MethodStartCPUProfile: ReturnType<typeof MethodStartCPUProfile$constant>;
export let MethodStopCPUProfile: ReturnType<typeof MethodStopCPUProfile$constant>;
export let MethodTypeToString: ReturnType<typeof MethodTypeToString$constant>;
export let MethodTypeToTypeNode: ReturnType<typeof MethodTypeToTypeNode$constant>;
export let MethodUpdateSnapshot: ReturnType<typeof MethodUpdateSnapshot$constant>;
export { $state };
