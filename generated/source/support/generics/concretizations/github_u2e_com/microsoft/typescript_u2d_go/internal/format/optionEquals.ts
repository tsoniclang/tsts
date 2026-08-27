import type { FormattingContext as FormattingContext__from_format } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/format/context.js";
import type { anyOptionSelector as anyOptionSelector__from_format } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/format/rulecontext.js";
import type { SemicolonPreference as SemicolonPreference__from_lsutil } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/formatcodeoptions.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { optionEquals$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/format/rulecontext.js";
export function optionEquals$Named_lsutil$SemicolonPreference($argument0: anyOptionSelector__from_format<SemicolonPreference__from_lsutil>, $argument1: SemicolonPreference__from_lsutil): (($0: FormattingContext__from_format | undefined) => bool) | undefined {
    return optionEquals$kernel<SemicolonPreference__from_lsutil>(($argument0: SemicolonPreference__from_lsutil, $argument1: SemicolonPreference__from_lsutil): bool => {
        return $argument0.$value === $argument1.$value;
    }, $argument0, $argument1);
}
