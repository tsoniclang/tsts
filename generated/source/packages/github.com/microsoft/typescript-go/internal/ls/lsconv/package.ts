import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { gostring, int32 } from "@gotots/runtime/scalars.js";
import { NewSetFromItems$int32 } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetFromItems.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../diagnostics/package.js";
import { $state } from "./state.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.extraEscapeReplacer = void 0;
    $state.styleCheckDiagnostics = void 0;
    {
        const __gotots_conversion_0 = strings__from_gostdlib.NewReplacer(RuntimeSlice.literal<gostring>([":", "%3A", "/", "%2F", "?", "%3F", "#", "%23", "[", "%5B", "]", "%5D", "@", "%40", "!", "%21", "$", "%24", "&", "%26", "'", "%27", "(", "%28", ")", "%29", "*", "%2A", "+", "%2B", ",", "%2C", ";", "%3B", "=", "%3D", " ", "%20"]));
        $state.extraEscapeReplacer = __gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<strings__from_gostdlib.Replacer>(__gotots_conversion_0, (): strings__from_gostdlib.Replacer => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: strings__from_gostdlib.Replacer): void => {
                named_strings.StringsReplacerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            });
    }
    {
        $state.styleCheckDiagnostics = NewSetFromItems$int32(RuntimeSlice.literal<int32>([Message__from_diagnostics.Code($state__diagnostics.X_0_is_declared_but_never_used), Message__from_diagnostics.Code($state__diagnostics.X_0_is_declared_but_its_value_is_never_read), Message__from_diagnostics.Code($state__diagnostics.Property_0_is_declared_but_its_value_is_never_read), Message__from_diagnostics.Code($state__diagnostics.All_imports_in_import_declaration_are_unused), Message__from_diagnostics.Code($state__diagnostics.Unreachable_code_detected), Message__from_diagnostics.Code($state__diagnostics.Unused_label), Message__from_diagnostics.Code($state__diagnostics.Fallthrough_case_in_switch), Message__from_diagnostics.Code($state__diagnostics.Not_all_code_paths_return_a_value)]));
    }
}
export { Converters, DiagnosticToLSPPull, DiagnosticToLSPPush, FileNameToDocumentURI, LanguageKindToScriptKind, NewConverters, Script, Script$contract, Script$is } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsconv/converters.js";
export { ComputeLSPLineStarts, LSPLineMap, LSPLineStarts } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsconv/linemap.js";
