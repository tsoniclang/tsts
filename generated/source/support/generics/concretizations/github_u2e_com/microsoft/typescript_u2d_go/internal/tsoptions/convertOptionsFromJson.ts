import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/diagnostic.js";
import type { compilerOptionsParser as compilerOptionsParser__from_tsoptions, typeAcquisitionParser as typeAcquisitionParser__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsinghelpers.js";
import type { CommandLineOptionNameMap as CommandLineOptionNameMap__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/tsconfigparsing.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { convertOptionsFromJson$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/tsconfigparsing.js";
import { $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$compilerOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$typeAcquisitionParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$PointerTo_Named_tsoptions$compilerOptionsParser_to_PointerTo_Named_diagnostics$Message, $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$PointerTo_Named_tsoptions$typeAcquisitionParser_to_PointerTo_Named_diagnostics$Message, $go$constraint_method$tsoptions$UnknownOptionDiagnostic$PointerTo_Named_tsoptions$compilerOptionsParser_to_PointerTo_Named_diagnostics$Message, $go$constraint_method$tsoptions$UnknownOptionDiagnostic$PointerTo_Named_tsoptions$typeAcquisitionParser_to_PointerTo_Named_diagnostics$Message } from "../../../../../../capabilities/constraint_method.js";
export function convertOptionsFromJson$PointerTo_Named_tsoptions$compilerOptionsParser($argument0: CommandLineOptionNameMap__from_tsoptions, $argument1: GoInterface | undefined, $argument2: gostring, $argument3: compilerOptionsParser__from_tsoptions | undefined): [
    compilerOptionsParser__from_tsoptions | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    return convertOptionsFromJson$kernel<compilerOptionsParser__from_tsoptions | undefined>($go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$compilerOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$PointerTo_Named_tsoptions$compilerOptionsParser_to_PointerTo_Named_diagnostics$Message, $go$constraint_method$tsoptions$UnknownOptionDiagnostic$PointerTo_Named_tsoptions$compilerOptionsParser_to_PointerTo_Named_diagnostics$Message, $argument0, $argument1, $argument2, $argument3);
}
export function convertOptionsFromJson$PointerTo_Named_tsoptions$typeAcquisitionParser($argument0: CommandLineOptionNameMap__from_tsoptions, $argument1: GoInterface | undefined, $argument2: gostring, $argument3: typeAcquisitionParser__from_tsoptions | undefined): [
    typeAcquisitionParser__from_tsoptions | undefined,
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>
] {
    return convertOptionsFromJson$kernel<typeAcquisitionParser__from_tsoptions | undefined>($go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$typeAcquisitionParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $go$constraint_method$tsoptions$UnknownDidYouMeanDiagnostic$PointerTo_Named_tsoptions$typeAcquisitionParser_to_PointerTo_Named_diagnostics$Message, $go$constraint_method$tsoptions$UnknownOptionDiagnostic$PointerTo_Named_tsoptions$typeAcquisitionParser_to_PointerTo_Named_diagnostics$Message, $argument0, $argument1, $argument2, $argument3);
}
