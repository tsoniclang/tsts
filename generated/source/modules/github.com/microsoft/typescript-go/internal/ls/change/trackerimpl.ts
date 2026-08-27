import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { IsClassOrTypeElement as IsClassOrTypeElement__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsStatementButNotDeclaration as IsStatementButNotDeclaration__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, Node as Node__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil, ProbablyUsesSemicolons as ProbablyUsesSemicolons__from_lsutil, SemicolonPreferenceIgnore$constant as SemicolonPreferenceIgnore$constant__from_lsutil, SemicolonPreferenceRemove$constant as SemicolonPreferenceRemove$constant__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringSlice } from "@gotots/runtime/string.js";
export function getFormatCodeSettingsForWriting(options: FormatCodeSettings__from_lsutil, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): FormatCodeSettings__from_lsutil {
    let shouldAutoDetectSemicolonPreference = options.Semicolons.$value === SemicolonPreferenceIgnore$constant__from_lsutil().$value;
    let shouldRemoveSemicolons = options.Semicolons.$value === SemicolonPreferenceRemove$constant__from_lsutil().$value || shouldAutoDetectSemicolonPreference && !ProbablyUsesSemicolons__from_lsutil(sourceFile);
    if (shouldRemoveSemicolons) {
        options.Semicolons = SemicolonPreferenceRemove$constant__from_lsutil();
    }
    return FormatCodeSettings__from_lsutil.$copy(options);
}
export function hasCommentsBeforeLineBreak(text: gostring, start: int): bool {
    const __gotots_conversion_0 = goStringSlice(text, start);
    let __gotots_conversion_1 = RuntimeSlice.make<int32>(0, __gotots_conversion_0.length, 0);
    let __gotots_conversion_2 = 0;
    while (__gotots_conversion_2 < __gotots_conversion_0.length) {
        const __gotots_conversion_3 = goStringDecodeRune(__gotots_conversion_0, __gotots_conversion_2);
        __gotots_conversion_1 = __gotots_conversion_1.append(0, [__gotots_conversion_3[0]]);
        __gotots_conversion_2 += __gotots_conversion_3[1];
    }
    const __gotots_range_0 = __gotots_conversion_1;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let ch = __gotots_range_value_0;
        if (!IsWhiteSpaceSingleLine__from_stringutil(ch)) {
            return ch === 47;
        }
    }
    return false;
}
export function needSemicolonBetween(a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return (IsPropertySignatureDeclaration__from_ast(a) || IsPropertyDeclaration__from_ast(a)) && IsClassOrTypeElement__from_ast(b) && Node__from_ast.$storageOf(((Node__from_ast.Name(b) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindComputedPropertyName$constant__from_ast() || IsStatementButNotDeclaration__from_ast(a) && IsStatementButNotDeclaration__from_ast(b);
}
