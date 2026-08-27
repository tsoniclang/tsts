import type { FormattingContext } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/context.js";
import type { ruleImpl } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/rule.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { FormatRequestKindFormatDocument$constant, FormatRequestKindFormatOnClosingCurlyBrace$constant, FormatRequestKindFormatOnEnter$constant, FormatRequestKindFormatOnOpeningCurlyBrace$constant, FormatRequestKindFormatOnSemicolon$constant, FormatRequestKindFormatSelection$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/api.js";
import { RulesPositionContextRulesAny$constant, RulesPositionContextRulesSpecific$constant, RulesPositionNoContextRulesAny$constant, RulesPositionNoContextRulesSpecific$constant, RulesPositionStopRulesAny$constant, RulesPositionStopRulesSpecific$constant, buildRulesMap } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/rulesmap.js";
import { LineActionLineAdded$constant, LineActionLineRemoved$constant, LineActionNone$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/span.js";
import { $state } from "./state.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    FormatRequestKindFormatDocument = FormatRequestKindFormatDocument$constant();
    FormatRequestKindFormatOnClosingCurlyBrace = FormatRequestKindFormatOnClosingCurlyBrace$constant();
    FormatRequestKindFormatOnEnter = FormatRequestKindFormatOnEnter$constant();
    FormatRequestKindFormatOnOpeningCurlyBrace = FormatRequestKindFormatOnOpeningCurlyBrace$constant();
    FormatRequestKindFormatOnSemicolon = FormatRequestKindFormatOnSemicolon$constant();
    FormatRequestKindFormatSelection = FormatRequestKindFormatSelection$constant();
    LineActionLineAdded = LineActionLineAdded$constant();
    LineActionLineRemoved = LineActionLineRemoved$constant();
    LineActionNone = LineActionNone$constant();
    RulesPositionContextRulesAny = RulesPositionContextRulesAny$constant();
    RulesPositionContextRulesSpecific = RulesPositionContextRulesSpecific$constant();
    RulesPositionNoContextRulesAny = RulesPositionNoContextRulesAny$constant();
    RulesPositionNoContextRulesSpecific = RulesPositionNoContextRulesSpecific$constant();
    RulesPositionStopRulesAny = RulesPositionStopRulesAny$constant();
    RulesPositionStopRulesSpecific = RulesPositionStopRulesSpecific$constant();
    $state.anyContext = RuntimeSlice.nil<(($0: FormattingContext | undefined) => bool) | undefined>();
    $state.getRulesMap = void 0;
    {
        $state.anyContext = RuntimeSlice.literal<(($0: FormattingContext | undefined) => bool) | undefined>([]);
    }
    {
        $state.getRulesMap = sync__from_gostdlib.OnceValue<RuntimeSlice<RuntimeSlice<ruleImpl | undefined>>>(buildRulesMap);
    }
}
export { FormatDocument, FormatNodeGivenIndentation, FormatOnClosingCurly, FormatOnEnter, FormatOnOpeningCurly, FormatOnSemicolon, FormatRequestKind, FormatRequestKindFormatDocument$constant, FormatRequestKindFormatOnClosingCurlyBrace$constant, FormatRequestKindFormatOnEnter$constant, FormatRequestKindFormatOnOpeningCurlyBrace$constant, FormatRequestKindFormatOnSemicolon$constant, FormatRequestKindFormatSelection$constant, FormatSelection, FormatSpan, GetFormatCodeSettingsFromContext, GetNewLineOrDefaultFromContext, WithFormatCodeSettings } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/api.js";
export { FormattingContext, NewFormattingContext } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/context.js";
export { FindFirstNonWhitespaceColumn, GetContainingList, GetIndentation, GetIndentationForNode, NodeWillIndentChild, ShouldIndentChildNode } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/indent.js";
export { RulesPosition, RulesPositionContextRulesAny$constant, RulesPositionContextRulesSpecific$constant, RulesPositionNoContextRulesAny$constant, RulesPositionNoContextRulesSpecific$constant, RulesPositionStopRulesAny$constant, RulesPositionStopRulesSpecific$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/rulesmap.js";
export { NewTextRangeWithKind, TextRangeWithKind, TextRangeWithKind$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/scanner.js";
export { LineAction, LineActionLineAdded$constant, LineActionLineRemoved$constant, LineActionNone$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/span.js";
export { GetLineStartPositionForPosition } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/format/util.js";
export let FormatRequestKindFormatDocument: ReturnType<typeof FormatRequestKindFormatDocument$constant>;
export let FormatRequestKindFormatOnClosingCurlyBrace: ReturnType<typeof FormatRequestKindFormatOnClosingCurlyBrace$constant>;
export let FormatRequestKindFormatOnEnter: ReturnType<typeof FormatRequestKindFormatOnEnter$constant>;
export let FormatRequestKindFormatOnOpeningCurlyBrace: ReturnType<typeof FormatRequestKindFormatOnOpeningCurlyBrace$constant>;
export let FormatRequestKindFormatOnSemicolon: ReturnType<typeof FormatRequestKindFormatOnSemicolon$constant>;
export let FormatRequestKindFormatSelection: ReturnType<typeof FormatRequestKindFormatSelection$constant>;
export let LineActionLineAdded: ReturnType<typeof LineActionLineAdded$constant>;
export let LineActionLineRemoved: ReturnType<typeof LineActionLineRemoved$constant>;
export let LineActionNone: ReturnType<typeof LineActionNone$constant>;
export let RulesPositionContextRulesAny: ReturnType<typeof RulesPositionContextRulesAny$constant>;
export let RulesPositionContextRulesSpecific: ReturnType<typeof RulesPositionContextRulesSpecific$constant>;
export let RulesPositionNoContextRulesAny: ReturnType<typeof RulesPositionNoContextRulesAny$constant>;
export let RulesPositionNoContextRulesSpecific: ReturnType<typeof RulesPositionNoContextRulesSpecific$constant>;
export let RulesPositionStopRulesAny: ReturnType<typeof RulesPositionStopRulesAny$constant>;
export let RulesPositionStopRulesSpecific: ReturnType<typeof RulesPositionStopRulesSpecific$constant>;
