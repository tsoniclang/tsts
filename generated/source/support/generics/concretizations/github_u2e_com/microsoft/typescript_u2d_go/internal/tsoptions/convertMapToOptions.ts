import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import type { buildOptionsParser as buildOptionsParser__from_tsoptions, compilerOptionsParser as compilerOptionsParser__from_tsoptions, watchOptionsParser as watchOptionsParser__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsinghelpers.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { convertMapToOptions$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/tsconfigparsing.js";
import { $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$buildOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$compilerOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$watchOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic } from "../../../../../../capabilities/constraint_method.js";
export function convertMapToOptions$PointerTo_Named_tsoptions$buildOptionsParser($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: buildOptionsParser__from_tsoptions | undefined): buildOptionsParser__from_tsoptions | undefined {
    return convertMapToOptions$kernel<buildOptionsParser__from_tsoptions | undefined>($go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$buildOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $argument0, $argument1);
}
export function convertMapToOptions$PointerTo_Named_tsoptions$compilerOptionsParser($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: compilerOptionsParser__from_tsoptions | undefined): compilerOptionsParser__from_tsoptions | undefined {
    return convertMapToOptions$kernel<compilerOptionsParser__from_tsoptions | undefined>($go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$compilerOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $argument0, $argument1);
}
export function convertMapToOptions$PointerTo_Named_tsoptions$watchOptionsParser($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: watchOptionsParser__from_tsoptions | undefined): watchOptionsParser__from_tsoptions | undefined {
    return convertMapToOptions$kernel<watchOptionsParser__from_tsoptions | undefined>($go$constraint_method$tsoptions$ParseOption$PointerTo_Named_tsoptions$watchOptionsParser_string_Interface_void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $argument0, $argument1);
}
