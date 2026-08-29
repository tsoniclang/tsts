import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LanguageVariant as LanguageVariant__from_core, TextChange$Storage as TextChange__from_core$Storage, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int16 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { IsJsxAttribute as IsJsxAttribute__from_ast, IsJsxElement as IsJsxElement__from_ast, IsJsxText as IsJsxText__from_ast, IsKeywordKind as IsKeywordKind__from_ast, IsTokenKind as IsTokenKind__from_ast, IsTrivia as IsTrivia__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindGreaterThanEqualsToken$constant as KindGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxNamespacedName$constant as KindJsxNamespacedName$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindNewLineTrivia$constant as KindNewLineTrivia$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindSlashEqualsToken$constant as KindSlashEqualsToken$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { NewScanner as NewScanner__from_scanner, Scanner as Scanner__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { LastOrNil$Named_format$TextRangeWithKind } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { Clone$SliceOf_Named_format$TextRangeWithKind$Named_format$TextRangeWithKind } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$Named_format$scanAction as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { formatSpanWorker } from "./span.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type TextRangeWithKind$Storage = {
    Loc: TextRange__from_core$Storage;
    Kind: int16;
};
export class TextRangeWithKind implements GoContainerStoredValue<TextRangeWithKind$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TextRangeWithKind$Storage) {
    }
    public static $storageOf($source: TextRangeWithKind): TextRangeWithKind$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TextRangeWithKind$Storage): TextRangeWithKind {
        return new TextRangeWithKind($source);
    }
    public get Loc(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.Loc);
    }
    public set Loc($value: TextRange__from_core) {
        this.$storage.Loc = TextRange__from_core.$storageOf($value);
    }
    public get Kind(): Kind__from_ast {
        return this.$storage.Kind;
    }
    public set Kind($value: Kind__from_ast) {
        this.$storage.Kind = $value;
    }
    declare readonly [$goContainerStorageType]: TextRangeWithKind$Storage;
    static $zero(): TextRangeWithKind {
        return new TextRangeWithKind({
            Loc: TextRange__from_core.$zeroStorage(),
            Kind: 0
        });
    }
    static $copy($source: TextRangeWithKind): TextRangeWithKind {
        return new TextRangeWithKind({
            Loc: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.Loc))),
            Kind: $source.$storage.Kind
        });
    }
    static $equal($left: TextRangeWithKind, $right: TextRangeWithKind): bool {
        return TextRange__from_core.$equal(TextRange__from_core.$fromStorage($left.$storage.Loc), TextRange__from_core.$fromStorage($right.$storage.Loc)) && $left.$storage.Kind === $right.$storage.Kind;
    }
    static $zeroStorage(): TextRangeWithKind$Storage {
        return {
            Loc: TextRange__from_core.$zeroStorage(),
            Kind: 0
        };
    }
    declare private readonly then?: never;
}
export function NewTextRangeWithKind(pos: int, end: int, kind: Kind__from_ast): TextRangeWithKind {
    return TextRangeWithKind.$fromStorage({
        Loc: TextRange__from_core.$storageOf(NewTextRange__from_core(pos, end)),
        Kind: kind
    });
}
export class tokenInfo {
    declare private readonly $goType: void;
    public constructor(public leadingTrivia: RuntimeSlice<TextRangeWithKind$Storage>, public token: TextRangeWithKind, public trailingTrivia: RuntimeSlice<TextRangeWithKind$Storage>) {
    }
    static $zero(): tokenInfo {
        return new tokenInfo(RuntimeSlice.nil<TextRangeWithKind$Storage>(), TextRangeWithKind.$zero(), RuntimeSlice.nil<TextRangeWithKind$Storage>());
    }
    static $copy($source: tokenInfo): tokenInfo {
        return new tokenInfo($source.leadingTrivia, TextRangeWithKind.$copy($source.token), $source.trailingTrivia);
    }
    declare private readonly then?: never;
}
export class formattingScanner {
    declare private readonly $goType: void;
    public constructor(public s: Scanner__from_scanner | undefined, public startPos: int, public endPos: int, public savedPos: int, public hasLastTokenInfo: bool, public lastTokenInfo: tokenInfo, public lastScanAction: scanAction, public leadingTrivia: RuntimeSlice<TextRangeWithKind$Storage>, public trailingTrivia: RuntimeSlice<TextRangeWithKind$Storage>, public wasNewLine: bool) {
    }
    declare private readonly then?: never;
    static $go$private$format$advance(s: formattingScanner | undefined): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo = false;
        let isStarted = Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s) !== (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).startPos;
        if (isStarted) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wasNewLine = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia.length > 0 && TextRangeWithKind.$storageOf(LastOrNil$Named_format$TextRangeWithKind((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia)).Kind === KindNewLineTrivia$constant__from_ast();
        }
        else {
            Scanner__from_scanner.Scan((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
        let pos = Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        for (; pos < (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).endPos;) {
            let t = Scanner__from_scanner.Token((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
            if (!IsTrivia__from_ast(t)) {
                break;
            }
            Scanner__from_scanner.Scan((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
            let item = NewTextRangeWithKind(pos, Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), t);
            pos = Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
            const __gotots_slice_build_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextRangeWithKind.$storageOf(TextRangeWithKind.$copy(item)));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<TextRangeWithKind$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, TextRangeWithKind.$storageOf(TextRangeWithKind.$copy(TextRangeWithKind.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextRangeWithKind.$storageOf(TextRangeWithKind.$copy(item)));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, TextRangeWithKind.$zeroStorage());
                }
            }
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia = __gotots_slice_build_1;
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPos = Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
    }
    static $go$private$format$getCurrentLeadingTrivia(s: formattingScanner | undefined): RuntimeSlice<TextRangeWithKind$Storage> {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia;
    }
    static $go$private$format$getNextToken(s: formattingScanner | undefined, n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expectedScanAction: scanAction): Kind__from_ast {
        let token = Scanner__from_scanner.Token((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionScan$constant();
        switch (expectedScanAction.$value) {
            case 1: {
                if (token === KindGreaterThanToken$constant__from_ast()) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionRescanGreaterThanToken$constant();
                    let newToken = Scanner__from_scanner.ReScanGreaterThanToken((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
                    Assert__from_debug(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === newToken, RuntimeSlice.nil<GoInterface | undefined>());
                    return newToken;
                }
                break;
            }
            case 2: {
                if (startsWithSlashToken(token)) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionRescanSlashToken$constant();
                    let newToken = Scanner__from_scanner.ReScanSlashToken((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s, RuntimeSlice.nil<bool>());
                    Assert__from_debug(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === newToken, RuntimeSlice.nil<GoInterface | undefined>());
                    return newToken;
                }
                break;
            }
            case 3: {
                if (token === KindCloseBraceToken$constant__from_ast()) {
                    (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionRescanTemplateToken$constant();
                    return Scanner__from_scanner.ReScanTemplateToken((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s, false);
                }
                break;
            }
            case 4: {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionRescanJsxIdentifier$constant();
                return Scanner__from_scanner.ScanJsxIdentifier((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
                break;
            }
            case 5: {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionRescanJsxText$constant();
                return Scanner__from_scanner.ReScanJsxToken((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s, false);
                break;
            }
            case 6: {
                (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionRescanJsxAttributeValue$constant();
                return Scanner__from_scanner.ReScanJsxAttributeValue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
                break;
            }
            case 0: {
                break;
                break;
            }
            default: {
                AssertNever__from_debug(new GoInterfaceAdapter(expectedScanAction), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("unhandled scan action kind")]));
                break;
            }
        }
        return token;
    }
    static $go$private$format$getTokenFullStart(s: formattingScanner | undefined): int {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo) {
            return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo.token.Loc.Pos();
        }
        return Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
    }
    static $go$private$format$isOnEOF(s: formattingScanner | undefined): bool {
        let current = Scanner__from_scanner.Token((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo) {
            current = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo.token.Kind;
        }
        return current === KindEndOfFile$constant__from_ast();
    }
    static $go$private$format$isOnToken(s: formattingScanner | undefined): bool {
        let current = Scanner__from_scanner.Token((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo) {
            current = TextRangeWithKind.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo.token).Kind;
        }
        return !(current === KindEndOfFile$constant__from_ast()) && !IsTrivia__from_ast(current);
    }
    static $go$private$format$lastTrailingTriviaWasNewLine(s: formattingScanner | undefined): bool {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wasNewLine;
    }
    static $go$private$format$readEOFTokenRange(s: formattingScanner | undefined): TextRangeWithKind {
        Assert__from_debug(formattingScanner.$go$private$format$isOnEOF(s), RuntimeSlice.nil<GoInterface | undefined>());
        return NewTextRangeWithKind(Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), Scanner__from_scanner.TokenEnd((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), KindEndOfFile$constant__from_ast());
    }
    static $go$private$format$readTokenInfo(s: formattingScanner | undefined, n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tokenInfo {
        Assert__from_debug(formattingScanner.$go$private$format$isOnToken(s), RuntimeSlice.nil<GoInterface | undefined>());
        let expectedScanAction = new scanAction(0);
        if (shouldRescanGreaterThanToken(n)) {
            expectedScanAction = actionRescanGreaterThanToken$constant();
        }
        else if (shouldRescanSlashToken(n)) {
            expectedScanAction = actionRescanSlashToken$constant();
        }
        else if (shouldRescanTemplateToken(n)) {
            expectedScanAction = actionRescanTemplateToken$constant();
        }
        else if (shouldRescanJsxIdentifier(n)) {
            expectedScanAction = actionRescanJsxIdentifier$constant();
        }
        else if (formattingScanner.$go$private$format$shouldRescanJsxText(s, n)) {
            expectedScanAction = actionRescanJsxText$constant();
        }
        else if (shouldRescanJsxAttributeValue(n)) {
            expectedScanAction = actionRescanJsxAttributeValue$constant();
        }
        else {
            expectedScanAction = actionScan$constant();
        }
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo && expectedScanAction.$value === (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction.$value) {
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo = fixTokenKind(tokenInfo.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo), n);
            return tokenInfo.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo);
        }
        if (Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s) !== (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPos) {
            Scanner__from_scanner.ResetTokenState((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPos);
            Scanner__from_scanner.Scan((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        }
        let currentToken = formattingScanner.$go$private$format$getNextToken(s, n, expectedScanAction);
        let token = NewTextRangeWithKind(Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), Scanner__from_scanner.TokenEnd((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), currentToken);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
        for (; Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s) < (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).endPos;) {
            currentToken = Scanner__from_scanner.Scan((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
            if (!IsTrivia__from_ast(currentToken)) {
                break;
            }
            let trivia = NewTextRangeWithKind(Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), Scanner__from_scanner.TokenEnd((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s), currentToken);
            const __gotots_slice_build_4 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia;
            const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
            let __gotots_slice_build_5 = __gotots_slice_build_4;
            if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, TextRangeWithKind.$storageOf(TextRangeWithKind.$copy(trivia)));
            }
            else {
                __gotots_slice_build_5 = goSliceAllocate<TextRangeWithKind$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                    __gotots_slice_build_5.set(__gotots_slice_build_7, TextRangeWithKind.$storageOf(TextRangeWithKind.$copy(TextRangeWithKind.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                }
                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, TextRangeWithKind.$storageOf(TextRangeWithKind.$copy(trivia)));
                for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                    __gotots_slice_build_5.$initialize(__gotots_slice_build_7, TextRangeWithKind.$zeroStorage());
                }
            }
            (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia = __gotots_slice_build_5;
            if (currentToken === KindNewLineTrivia$constant__from_ast()) {
                Scanner__from_scanner.Scan((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
                break;
            }
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo = true;
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo = new tokenInfo(Clone$SliceOf_Named_format$TextRangeWithKind$Named_format$TextRangeWithKind((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia), TextRangeWithKind.$copy(token), Clone$SliceOf_Named_format$TextRangeWithKind$Named_format$TextRangeWithKind((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia));
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo = fixTokenKind(tokenInfo.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo), n);
        return tokenInfo.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo);
    }
    static $go$private$format$shouldRescanJsxText(s: formattingScanner | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (IsJsxText__from_ast(node)) {
            return true;
        }
        if (!IsJsxElement__from_ast(node) || (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo === false) {
            return false;
        }
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastTokenInfo.token.Kind === KindJsxText$constant__from_ast();
    }
    static $go$private$format$skipToEndOf(s: formattingScanner | undefined, r: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): void {
        Scanner__from_scanner.ResetTokenState((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.End());
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPos = Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionScan$constant();
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo = false;
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wasNewLine = false;
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
    }
    static $go$private$format$skipToStartOf(s: formattingScanner | undefined, r: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): void {
        Scanner__from_scanner.ResetTokenState((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s, ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.Pos());
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).savedPos = Scanner__from_scanner.TokenFullStart((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).s);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastScanAction = actionScan$constant();
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo = false;
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wasNewLine = false;
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).leadingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trailingTrivia = RuntimeSlice.nil<TextRangeWithKind$Storage>();
    }
}
export function newFormattingScanner(text: gostring, languageVariant: LanguageVariant__from_core, startPos: int, endPos: int, worker: formatSpanWorker | undefined): RuntimeSlice<TextChange__from_core$Storage> {
    let scan: Scanner__from_scanner | undefined = NewScanner__from_scanner();
    Scanner__from_scanner.SetSkipTrivia(scan, false);
    Scanner__from_scanner.SetLanguageVariant(scan, languageVariant);
    Scanner__from_scanner.SetText(scan, text);
    Scanner__from_scanner.ResetTokenState(scan, startPos);
    let fmtScn: formattingScanner | undefined = new formattingScanner(scan, startPos, endPos, 0, false, tokenInfo.$zero(), new scanAction(0), RuntimeSlice.nil<TextRangeWithKind$Storage>(), RuntimeSlice.nil<TextRangeWithKind$Storage>(), true);
    let res = formatSpanWorker.$go$private$format$execute(worker, fmtScn);
    (fmtScn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasLastTokenInfo = false;
    Scanner__from_scanner.Reset(scan);
    return res;
}
export function shouldRescanGreaterThanToken(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindGreaterThanEqualsToken$constant__from_ast():
        case KindGreaterThanGreaterThanEqualsToken$constant__from_ast():
        case KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast():
        case KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast():
        case KindGreaterThanGreaterThanToken$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function shouldRescanJsxIdentifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
        switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindJsxAttribute$constant__from_ast():
            case KindJsxOpeningElement$constant__from_ast():
            case KindJsxClosingElement$constant__from_ast():
            case KindJsxSelfClosingElement$constant__from_ast():
            case KindJsxNamespacedName$constant__from_ast(): {
                return IsKeywordKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast();
                break;
            }
        }
    }
    return false;
}
export function shouldRescanSlashToken(container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindRegularExpressionLiteral$constant__from_ast();
}
export function shouldRescanTemplateToken(container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateMiddle$constant__from_ast() || Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateTail$constant__from_ast();
}
export function shouldRescanJsxAttributeValue(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsJsxAttribute__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function startsWithSlashToken(t: Kind__from_ast): bool {
    return t === KindSlashToken$constant__from_ast() || t === KindSlashEqualsToken$constant__from_ast();
}
export class scanAction {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function actionScan$constant(): scanAction {
    return new scanAction(0);
}
export function actionRescanGreaterThanToken$constant(): scanAction {
    return new scanAction(1);
}
export function actionRescanSlashToken$constant(): scanAction {
    return new scanAction(2);
}
export function actionRescanTemplateToken$constant(): scanAction {
    return new scanAction(3);
}
export function actionRescanJsxIdentifier$constant(): scanAction {
    return new scanAction(4);
}
export function actionRescanJsxText$constant(): scanAction {
    return new scanAction(5);
}
export function actionRescanJsxAttributeValue$constant(): scanAction {
    return new scanAction(6);
}
export function fixTokenKind(tokenInfo__shadow_1: tokenInfo, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tokenInfo {
    if (IsTokenKind__from_ast(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && !(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Kind === Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Kind = Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
    }
    return tokenInfo.$copy(tokenInfo__shadow_1);
}
