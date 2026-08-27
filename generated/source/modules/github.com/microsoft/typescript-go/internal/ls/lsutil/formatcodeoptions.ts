import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { FormattingOptions as FormattingOptions__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, float64, gostring, int } from "@gotots/runtime/scalars.js";
import { BoolToTristate as BoolToTristate__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetDefaultIndentSize as GetDefaultIndentSize__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class IndentStyle {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function IndentStyleNone$constant(): IndentStyle {
    return new IndentStyle(0);
}
export function IndentStyleBlock$constant(): IndentStyle {
    return new IndentStyle(1);
}
export function IndentStyleSmart$constant(): IndentStyle {
    return new IndentStyle(2);
}
export function parseIndentStyle(v: GoInterface | undefined): IndentStyle {
    const __gotots_type_switch_0: GoInterface | undefined = v;
    switch (true) {
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let s: gostring = __gotots_type_switch_0.$go$value;
            switch (strings__from_gostdlib.ToLower(s)) {
                case "none": {
                    return IndentStyleNone$constant();
                    break;
                }
                case "block": {
                    return IndentStyleBlock$constant();
                    break;
                }
                case "smart": {
                    return IndentStyleSmart$constant();
                    break;
                }
            }
            break;
        }
        case $goInterfaceAdapter$float64.$is(__gotots_type_switch_0): {
            let s: float64 = __gotots_type_switch_0.$go$value;
            return new IndentStyle(globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(s))));
            break;
        }
        case $goInterfaceAdapter$int.$is(__gotots_type_switch_0): {
            let s: int = __gotots_type_switch_0.$go$value;
            return new IndentStyle(s);
            break;
        }
    }
    return IndentStyleSmart$constant();
}
export class SemicolonPreference {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function SemicolonPreferenceIgnore$constant(): SemicolonPreference {
    return new SemicolonPreference("ignore");
}
export function SemicolonPreferenceInsert$constant(): SemicolonPreference {
    return new SemicolonPreference("insert");
}
export function SemicolonPreferenceRemove$constant(): SemicolonPreference {
    return new SemicolonPreference("remove");
}
export function parseSemicolonPreference(v: GoInterface | undefined): SemicolonPreference {
    {
        const __gotots_results_0 = (($value: GoInterface | undefined): [
            gostring,
            boolean
        ] => {
            if (!GoInterfaceAdapter.$is($value)) {
                return ["", false];
            }
            return [$value.$go$value, true];
        })(v);
        let s = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            switch (strings__from_gostdlib.ToLower(s)) {
                case "ignore": {
                    return SemicolonPreferenceIgnore$constant();
                    break;
                }
                case "insert": {
                    return SemicolonPreferenceInsert$constant();
                    break;
                }
                case "remove": {
                    return SemicolonPreferenceRemove$constant();
                    break;
                }
            }
        }
    }
    return SemicolonPreferenceIgnore$constant();
}
export class EditorSettings {
    declare private readonly $goType: void;
    public constructor(public BaseIndentSize: int, public IndentSize: int, public TabSize: int, public NewLineCharacter: gostring, public ConvertTabsToSpaces: Tristate__from_core, public IndentStyle: IndentStyle, public TrimTrailingWhitespace: Tristate__from_core) {
    }
    static $zero(): EditorSettings {
        return new EditorSettings(0, 0, 0, "", 0, new IndentStyle(0), 0);
    }
    static $copy($source: EditorSettings): EditorSettings {
        return new EditorSettings($source.BaseIndentSize, $source.IndentSize, $source.TabSize, $source.NewLineCharacter, $source.ConvertTabsToSpaces, $source.IndentStyle, $source.TrimTrailingWhitespace);
    }
    static $equal($left: EditorSettings, $right: EditorSettings): bool {
        return $left.BaseIndentSize === $right.BaseIndentSize && $left.IndentSize === $right.IndentSize && $left.TabSize === $right.TabSize && $left.NewLineCharacter === $right.NewLineCharacter && $left.ConvertTabsToSpaces === $right.ConvertTabsToSpaces && $left.IndentStyle.$value === $right.IndentStyle.$value && $left.TrimTrailingWhitespace === $right.TrimTrailingWhitespace;
    }
    static $hash($source: EditorSettings): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.BaseIndentSize));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IndentSize));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.TabSize));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.NewLineCharacter));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ConvertTabsToSpaces));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IndentStyle.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.TrimTrailingWhitespace));
        return $hash;
    }
    declare private readonly then?: never;
}
export class FormatCodeSettings {
    declare private readonly $goType: void;
    public constructor(public EditorSettings: EditorSettings, public InsertSpaceAfterCommaDelimiter: Tristate__from_core, public InsertSpaceAfterSemicolonInForStatements: Tristate__from_core, public InsertSpaceBeforeAndAfterBinaryOperators: Tristate__from_core, public InsertSpaceAfterConstructor: Tristate__from_core, public InsertSpaceAfterKeywordsInControlFlowStatements: Tristate__from_core, public InsertSpaceAfterFunctionKeywordForAnonymousFunctions: Tristate__from_core, public InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: Tristate__from_core, public InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: Tristate__from_core, public InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: Tristate__from_core, public InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces: Tristate__from_core, public InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: Tristate__from_core, public InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: Tristate__from_core, public InsertSpaceAfterTypeAssertion: Tristate__from_core, public InsertSpaceBeforeFunctionParenthesis: Tristate__from_core, public PlaceOpenBraceOnNewLineForFunctions: Tristate__from_core, public PlaceOpenBraceOnNewLineForControlBlocks: Tristate__from_core, public InsertSpaceBeforeTypeAnnotation: Tristate__from_core, public IndentMultiLineObjectLiteralBeginningOnBlankLine: Tristate__from_core, public Semicolons: SemicolonPreference, public IndentSwitchCase: Tristate__from_core) {
    }
    static $zero(): FormatCodeSettings {
        return new FormatCodeSettings(EditorSettings.$zero(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, new SemicolonPreference(""), 0);
    }
    static $copy($source: FormatCodeSettings): FormatCodeSettings {
        return new FormatCodeSettings(EditorSettings.$copy($source.EditorSettings), $source.InsertSpaceAfterCommaDelimiter, $source.InsertSpaceAfterSemicolonInForStatements, $source.InsertSpaceBeforeAndAfterBinaryOperators, $source.InsertSpaceAfterConstructor, $source.InsertSpaceAfterKeywordsInControlFlowStatements, $source.InsertSpaceAfterFunctionKeywordForAnonymousFunctions, $source.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis, $source.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets, $source.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces, $source.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces, $source.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces, $source.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces, $source.InsertSpaceAfterTypeAssertion, $source.InsertSpaceBeforeFunctionParenthesis, $source.PlaceOpenBraceOnNewLineForFunctions, $source.PlaceOpenBraceOnNewLineForControlBlocks, $source.InsertSpaceBeforeTypeAnnotation, $source.IndentMultiLineObjectLiteralBeginningOnBlankLine, $source.Semicolons, $source.IndentSwitchCase);
    }
    static $equal($left: FormatCodeSettings, $right: FormatCodeSettings): bool {
        return EditorSettings.$equal($left.EditorSettings, $right.EditorSettings) && $left.InsertSpaceAfterCommaDelimiter === $right.InsertSpaceAfterCommaDelimiter && $left.InsertSpaceAfterSemicolonInForStatements === $right.InsertSpaceAfterSemicolonInForStatements && $left.InsertSpaceBeforeAndAfterBinaryOperators === $right.InsertSpaceBeforeAndAfterBinaryOperators && $left.InsertSpaceAfterConstructor === $right.InsertSpaceAfterConstructor && $left.InsertSpaceAfterKeywordsInControlFlowStatements === $right.InsertSpaceAfterKeywordsInControlFlowStatements && $left.InsertSpaceAfterFunctionKeywordForAnonymousFunctions === $right.InsertSpaceAfterFunctionKeywordForAnonymousFunctions && $left.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis === $right.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis && $left.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets === $right.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets && $left.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces === $right.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces && $left.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces === $right.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces && $left.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces === $right.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces && $left.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces === $right.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces && $left.InsertSpaceAfterTypeAssertion === $right.InsertSpaceAfterTypeAssertion && $left.InsertSpaceBeforeFunctionParenthesis === $right.InsertSpaceBeforeFunctionParenthesis && $left.PlaceOpenBraceOnNewLineForFunctions === $right.PlaceOpenBraceOnNewLineForFunctions && $left.PlaceOpenBraceOnNewLineForControlBlocks === $right.PlaceOpenBraceOnNewLineForControlBlocks && $left.InsertSpaceBeforeTypeAnnotation === $right.InsertSpaceBeforeTypeAnnotation && $left.IndentMultiLineObjectLiteralBeginningOnBlankLine === $right.IndentMultiLineObjectLiteralBeginningOnBlankLine && $left.Semicolons.$value === $right.Semicolons.$value && $left.IndentSwitchCase === $right.IndentSwitchCase;
    }
    static $hash($source: FormatCodeSettings): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, EditorSettings.$hash($source.EditorSettings));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterCommaDelimiter));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterSemicolonInForStatements));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceBeforeAndAfterBinaryOperators));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterConstructor));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterKeywordsInControlFlowStatements));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterFunctionKeywordForAnonymousFunctions));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceAfterTypeAssertion));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceBeforeFunctionParenthesis));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.PlaceOpenBraceOnNewLineForFunctions));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.PlaceOpenBraceOnNewLineForControlBlocks));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.InsertSpaceBeforeTypeAnnotation));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IndentMultiLineObjectLiteralBeginningOnBlankLine));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Semicolons.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IndentSwitchCase));
        return $hash;
    }
    declare private readonly then?: never;
}
export function FromLSFormatOptions(f: FormatCodeSettings, opt: tsonicTypeScriptRuntime.Location<FormattingOptions__from_lsproto> | undefined): FormatCodeSettings {
    let updatedSettings = FormatCodeSettings.$copy(f);
    updatedSettings.EditorSettings.TabSize = ((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FormattingOptions__from_lsproto>).value.TabSize;
    updatedSettings.EditorSettings.IndentSize = ((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FormattingOptions__from_lsproto>).value.TabSize;
    updatedSettings.EditorSettings.ConvertTabsToSpaces = BoolToTristate__from_core(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FormattingOptions__from_lsproto>).value.InsertSpaces);
    if (!(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FormattingOptions__from_lsproto>).value.TrimTrailingWhitespace === undefined)) {
        updatedSettings.EditorSettings.TrimTrailingWhitespace = BoolToTristate__from_core(((((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FormattingOptions__from_lsproto>).value.TrimTrailingWhitespace ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value);
    }
    return FormatCodeSettings.$copy(updatedSettings);
}
export function GetDefaultFormatCodeSettings(): FormatCodeSettings {
    return new FormatCodeSettings(new EditorSettings(0, GetDefaultIndentSize__from_printer(), GetDefaultIndentSize__from_printer(), "\n", TSTrue$constant__from_core(), IndentStyleSmart$constant(), TSTrue$constant__from_core()), TSTrue$constant__from_core(), TSTrue$constant__from_core(), TSTrue$constant__from_core(), TSFalse$constant__from_core(), TSTrue$constant__from_core(), TSFalse$constant__from_core(), TSFalse$constant__from_core(), TSFalse$constant__from_core(), TSTrue$constant__from_core(), 0, TSFalse$constant__from_core(), TSFalse$constant__from_core(), 0, TSFalse$constant__from_core(), TSFalse$constant__from_core(), TSFalse$constant__from_core(), 0, 0, SemicolonPreferenceIgnore$constant(), TSTrue$constant__from_core());
}
