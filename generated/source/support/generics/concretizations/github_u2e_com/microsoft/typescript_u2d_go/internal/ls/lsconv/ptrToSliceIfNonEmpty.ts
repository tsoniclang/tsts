import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { DiagnosticRelatedInformation as DiagnosticRelatedInformation__from_lsproto, DiagnosticTag as DiagnosticTag__from_lsproto } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { ptrToSliceIfNonEmpty$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsconv/converters.js";
export function ptrToSliceIfNonEmpty$Named_lsproto$DiagnosticTag($argument0: RuntimeSlice<DiagnosticTag__from_lsproto>): tsonicTypeScriptRuntime.Location<RuntimeSlice<DiagnosticTag__from_lsproto>> | undefined {
    return ptrToSliceIfNonEmpty$kernel<DiagnosticTag__from_lsproto>(($argument0: RuntimeSlice<DiagnosticTag__from_lsproto>): int => {
        return $argument0.length;
    }, $argument0);
}
export function ptrToSliceIfNonEmpty$PointerTo_Named_lsproto$DiagnosticRelatedInformation($argument0: RuntimeSlice<{
    value: DiagnosticRelatedInformation__from_lsproto;
} | undefined>): tsonicTypeScriptRuntime.Location<RuntimeSlice<{
    value: DiagnosticRelatedInformation__from_lsproto;
} | undefined>> | undefined {
    return ptrToSliceIfNonEmpty$kernel<{
        value: DiagnosticRelatedInformation__from_lsproto;
    } | undefined>(($argument0: RuntimeSlice<{
        value: DiagnosticRelatedInformation__from_lsproto;
    } | undefined>): int => {
        return $argument0.length;
    }, $argument0);
}
