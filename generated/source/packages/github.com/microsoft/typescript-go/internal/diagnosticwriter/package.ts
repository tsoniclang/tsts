import type { int32 } from "@gotots/runtime/scalars.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../diagnostics/package.js";
import { $state } from "./state.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    $state.ScreenStartingCodes = RuntimeSlice.nil<int32>();
    {
        $state.ScreenStartingCodes = RuntimeSlice.literal<int32>([Message__from_diagnostics.Code($state__diagnostics.Starting_compilation_in_watch_mode), Message__from_diagnostics.Code($state__diagnostics.File_change_detected_Starting_incremental_compilation)]);
    }
}
export { ASTDiagnostic, Diagnostic, Diagnostic$contract, Diagnostic$is, ErrorSummary, FileLike, FileLike$contract, FileLike$is, FormatDiagnosticWithColorAndContext, FormatDiagnosticsStatusAndTime, FormatDiagnosticsStatusWithColorAndTime, FormattedWriter, FormattingOptions, FromASTDiagnostics, TryClearScreen, WrapASTDiagnostic, WriteErrorSummaryText, WriteFlattenedASTDiagnosticMessage, WriteFlattenedDiagnosticMessage, WriteFormatDiagnostic, WriteLocation } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/diagnosticwriter/diagnosticwriter.js";
export { $state };
