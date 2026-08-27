import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LanguageVariant as LanguageVariant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { GetSourceFileOfNode as GetSourceFileOfNode__from_ast, Identifier as Identifier__from_ast, IsIdentifier as IsIdentifier__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindJSDocLink$constant as KindJSDocLink$constant__from_ast, KindJSDocLinkCode$constant as KindJSDocLinkCode$constant__from_ast, KindJSDocLinkPlain$constant as KindJSDocLinkPlain$constant__from_ast, KindJSDocText$constant as KindJSDocText$constant__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, NodeFlagsReparserTransformedLiteral$constant as NodeFlagsReparserTransformedLiteral$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FailBadSyntaxKind as FailBadSyntaxKind__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/state.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { IsIdentifierPartEx, IsIdentifierStart, SkipTrivia } from "./scanner.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function tokenIsIdentifierOrKeyword(token: Kind__from_ast): bool {
    return token >= KindIdentifier$constant__from_ast();
}
export function IdentifierToKeywordKind(node: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined): Kind__from_ast {
    return $state.textToKeyword.lookup(Identifier__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text);
}
export function GetSourceTextOfNodeFromSourceFile(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, includeTrivia: bool): gostring {
    return GetTextOfNodeFromSourceText(SourceFile__from_ast.Text(sourceFile), node, includeTrivia);
}
export function GetTextOfNodeFromSourceText(sourceText: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, includeTrivia: bool): gostring {
    if (NodeIsMissing__from_ast(node)) {
        return "";
    }
    let pos = Node__from_ast.Pos(node);
    if (!includeTrivia) {
        pos = SkipTrivia(sourceText, pos);
    }
    let text = goStringSlice(sourceText, pos, Node__from_ast.End(node));
    if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparserTransformedLiteral$constant__from_ast()) >>> 0 === 0)) {
        if (IsStringLiteral__from_ast(node)) {
            if (!((LiteralLikeNodeBase__from_ast.$storageOf(LiteralLikeNodeBase__from_ast.$fromStorage(LiteralExpressionBase__from_ast.$storageOf(LiteralExpressionBase__from_ast.$fromStorage(StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags & TokenFlagsSingleQuote$constant__from_ast()) === 0)) {
                return "'" + text + "'";
            }
            return "\"" + text + "\"";
        }
        else if (IsIdentifier__from_ast(node)) {
            return Node__from_ast.Text(node);
        }
        FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(node), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Unexpected reparser-transformed node kind")]));
    }
    return text;
}
export function GetTextOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    return GetSourceTextOfNodeFromSourceFile(GetSourceFileOfNode__from_ast(node), node, false);
}
export function GetTextOfJSDocComment(comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): gostring {
    if (comment === undefined) {
        return "";
    }
    let b = named_strings.StringsBuilderOperations.$zero();
    const __gotots_range_0 = NodeList__from_ast.$storageOf(((comment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        switch (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindJSDocText$constant__from_ast(): {
                strings__from_gostdlib.Builder.WriteString(b, Node__from_ast.Text(n));
                break;
            }
            case KindJSDocLink$constant__from_ast():
            case KindJSDocLinkCode$constant__from_ast():
            case KindJSDocLinkPlain$constant__from_ast(): {
                strings__from_gostdlib.Builder.WriteString(b, GetTextOfNode(n));
                break;
            }
        }
    }
    return strings__from_gostdlib.TrimRightFunc(strings__from_gostdlib.Builder.String(b), unicode__from_gostdlib.IsSpace);
}
export function DeclarationNameToString(name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (name === undefined || Node__from_ast.Pos(name) === Node__from_ast.End(name)) {
        return "(Missing)";
    }
    return GetTextOfNode(name);
}
export function IsIdentifierText(name: gostring, languageVariant: LanguageVariant__from_core): bool {
    const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(name);
    const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
        int32,
        int
    ];
    let ch = __gotots_results_1[0];
    let size = __gotots_results_1[1];
    if (!IsIdentifierStart(ch)) {
        return false;
    }
    for (let i = size; i < name.length;) {
        const __gotots_results_2 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(name, i));
        const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
            int32,
            int
        ];
        ch = __gotots_results_3[0];
        size = __gotots_results_3[1];
        if (!IsIdentifierPartEx(ch, languageVariant)) {
            return false;
        }
        i += size;
    }
    return true;
}
export function IsIntrinsicJsxName(name: gostring): bool {
    return name.length !== 0 && (goStringIndex(name, 0) >= 97 && goStringIndex(name, 0) <= 122 || strings__from_gostdlib.ContainsRune(name, 45));
}
