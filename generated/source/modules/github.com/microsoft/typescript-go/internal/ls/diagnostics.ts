import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function getAllDiagnostics(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    let diags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, Program__from_compiler.GetSyntacticDiagnostics(program, ctx, file), void 0);
    diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, Program__from_compiler.GetSemanticDiagnostics(program, ctx, file), void 0);
    diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, Program__from_compiler.GetSuggestionDiagnostics(program, ctx, file), void 0);
    if (CompilerOptions__from_core.GetEmitDeclarations(Program__from_compiler.Options(program))) {
        diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, Program__from_compiler.GetDeclarationDiagnostics(program, ctx, file), void 0);
    }
    return diags;
}
