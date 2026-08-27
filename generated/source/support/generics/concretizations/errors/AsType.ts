import type { ErrorCode as ErrorCode__from_lsproto } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { userFacingRequestFailedError as userFacingRequestFailedError__from_lsp } from "../../../../modules/github.com/microsoft/typescript-go/internal/lsp/server.js";
import { $goInterfaceAdapter$Named_lsproto$ErrorCode, $goInterfaceAdapter$Named_lsp$userFacingRequestFailedError as GoInterfaceAdapter } from "../../../interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../provider-interface-bridges.js";
import * as generic_errors_kernel from "@gotots/gostdlib/internal/facets/generic-errors-kernel.js";
export function AsType$Named_lsp$userFacingRequestFailedError($argument0: GoInterface | undefined): [
    userFacingRequestFailedError__from_lsp,
    bool
] {
    return generic_errors_kernel.ErrorsAsTypeKernel<userFacingRequestFailedError__from_lsp>(($argument0: GoInterfaceValue | undefined): [
        userFacingRequestFailedError__from_lsp,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            userFacingRequestFailedError__from_lsp,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return [new userFacingRequestFailedError__from_lsp(""), false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, GoProviderInterfaceBridge.$to($argument0));
}
export function AsType$Named_lsproto$ErrorCode($argument0: GoInterface | undefined): [
    ErrorCode__from_lsproto,
    bool
] {
    return generic_errors_kernel.ErrorsAsTypeKernel<ErrorCode__from_lsproto>(($argument0: GoInterfaceValue | undefined): [
        ErrorCode__from_lsproto,
        bool
    ] => {
        return (($value: GoInterfaceValue | undefined): [
            ErrorCode__from_lsproto,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_lsproto$ErrorCode.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })($argument0);
    }, GoProviderInterfaceBridge.$to($argument0));
}
