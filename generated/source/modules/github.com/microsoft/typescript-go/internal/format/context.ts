import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { FormatRequestKind } from "./api.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { NewTextRange as NewTextRange__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { TextRangeWithKind } from "./scanner.js";
import { rangeIsOnOneLine } from "./util.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class FormattingContext {
    declare private readonly $goType: void;
    public constructor(public currentTokenSpan: TextRangeWithKind, public nextTokenSpan: TextRangeWithKind, public contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentTokenParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public nextTokenParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public contextNodeAllOnSameLine: Tristate__from_core, public nextNodeAllOnSameLine: Tristate__from_core, public tokensAreOnSameLine: Tristate__from_core, public contextNodeBlockIsOnOneLine: Tristate__from_core, public nextNodeBlockIsOnOneLine: Tristate__from_core, public SourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public FormattingRequestKind: FormatRequestKind, public Options: FormatCodeSettings__from_lsutil) {
    }
    declare private readonly then?: never;
    static ContextNodeAllOnSameLine(__go_this: FormattingContext | undefined): bool {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeAllOnSameLine === TSUnknown$constant__from_core()) {
            (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeAllOnSameLine = FormattingContext.$go$private$format$nodeIsOnOneLine(__go_this, (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode);
        }
        return (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeAllOnSameLine === TSTrue$constant__from_core();
    }
    static ContextNodeBlockIsOnOneLine(__go_this: FormattingContext | undefined): bool {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeBlockIsOnOneLine === TSUnknown$constant__from_core()) {
            (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeBlockIsOnOneLine = FormattingContext.$go$private$format$blockIsOnOneLine(__go_this, (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode);
        }
        return (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeBlockIsOnOneLine === TSTrue$constant__from_core();
    }
    static NextNodeAllOnSameLine(__go_this: FormattingContext | undefined): bool {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeAllOnSameLine === TSUnknown$constant__from_core()) {
            (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeAllOnSameLine = FormattingContext.$go$private$format$nodeIsOnOneLine(__go_this, (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent);
        }
        return (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeAllOnSameLine === TSTrue$constant__from_core();
    }
    static NextNodeBlockIsOnOneLine(__go_this: FormattingContext | undefined): bool {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeBlockIsOnOneLine === TSUnknown$constant__from_core()) {
            (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeBlockIsOnOneLine = FormattingContext.$go$private$format$blockIsOnOneLine(__go_this, (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent);
        }
        return (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeBlockIsOnOneLine === TSTrue$constant__from_core();
    }
    static TokensAreOnSameLine(__go_this: FormattingContext | undefined): bool {
        if ((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tokensAreOnSameLine === TSUnknown$constant__from_core()) {
            (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tokensAreOnSameLine = FormattingContext.$go$private$format$rangeIsOnOneLine(__go_this, NewTextRange__from_core(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Loc).Pos(), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Loc).End()));
        }
        return (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tokensAreOnSameLine === TSTrue$constant__from_core();
    }
    static UpdateContext(__go_this: FormattingContext | undefined, cur: TextRangeWithKind, curParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, next: TextRangeWithKind, nextParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, commonParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (curParent === undefined) {
            const __gotots_argument_0 = new GoInterfaceAdapter("nil current range node parent in update context");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        if (nextParent === undefined) {
            const __gotots_argument_1 = new GoInterfaceAdapter("nil next range node parent in update context");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        if (commonParent === undefined) {
            const __gotots_argument_2 = new GoInterfaceAdapter("nil common parent node in update context");
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        }
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan = TextRangeWithKind.$copy(cur);
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent = curParent;
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan = TextRangeWithKind.$copy(next);
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent = nextParent;
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode = commonParent;
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeAllOnSameLine = TSUnknown$constant__from_core();
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeAllOnSameLine = TSUnknown$constant__from_core();
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tokensAreOnSameLine = TSUnknown$constant__from_core();
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNodeBlockIsOnOneLine = TSUnknown$constant__from_core();
        (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextNodeBlockIsOnOneLine = TSUnknown$constant__from_core();
    }
    static $go$private$format$blockIsOnOneLine(__go_this: FormattingContext | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Tristate__from_core {
        let openBrace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindOpenBraceToken$constant__from_ast(), (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
        let closeBrace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindCloseBraceToken$constant__from_ast(), (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
        if (!(openBrace === undefined) && !(closeBrace === undefined)) {
            let closeBraceStart = GetTokenPosOfNode__from_scanner(closeBrace, (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, false);
            return FormattingContext.$go$private$format$rangeIsOnOneLine(__go_this, NewTextRange__from_core(Node__from_ast.End(openBrace), closeBraceStart));
        }
        return TSFalse$constant__from_core();
    }
    static $go$private$format$nodeIsOnOneLine(__go_this: FormattingContext | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Tristate__from_core {
        return FormattingContext.$go$private$format$rangeIsOnOneLine(__go_this, withTokenStart(node, (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile));
    }
    static $go$private$format$rangeIsOnOneLine(__go_this: FormattingContext | undefined, node: TextRange__from_core): Tristate__from_core {
        if (rangeIsOnOneLine(TextRange__from_core.$copy(node), (__go_this ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile)) {
            return TSTrue$constant__from_core();
        }
        return TSFalse$constant__from_core();
    }
}
export function NewFormattingContext(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, kind: FormatRequestKind, options: FormatCodeSettings__from_lsutil): FormattingContext | undefined {
    let res: FormattingContext | undefined = new FormattingContext(TextRangeWithKind.$zero(), TextRangeWithKind.$zero(), void 0, void 0, void 0, 0, 0, 0, 0, 0, file, kind, FormatCodeSettings__from_lsutil.$copy(options));
    return res;
}
export function withTokenStart(loc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): TextRange__from_core {
    let startPos = GetTokenPosOfNode__from_scanner(loc, file, false);
    return NewTextRange__from_core(startPos, Node__from_ast.End(loc));
}
