import type { bool } from "@tsonic/core/types.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { CommentRange } from "../ast/generated/data.js";
import type { Node } from "../ast/spine.js";
import type { NodeFactory } from "../ast/generated/factory.js";
import type { Kind } from "../ast/generated/kinds.js";
import { KindGreaterThanToken, KindIdentifier } from "../ast/generated/kinds.js";
import { IsKeywordKind, IsPunctuationKind } from "../ast/generated/predicates.js";
import type { LanguageVariant } from "../core/languagevariant.js";
import { LanguageVariantJSX, LanguageVariantStandard } from "../core/languagevariant.js";
import type { ScriptKind } from "../core/scriptkind.js";
import { ScriptKindJS, ScriptKindJSON, ScriptKindJSX, ScriptKindTSX } from "../core/scriptkind.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/utilities.go::func::getLanguageVariant","kind":"func","status":"implemented","sigHash":"4c5ee87fd9820be6daa04017b5c0edc7a2877024645c650bdab8194a3da6286b","bodyHash":"13c7111a0611fe78ed4af50148613b6c6f4ac28950c0080c87902c309eb7de82"}
 *
 * Go source:
 * func getLanguageVariant(scriptKind core.ScriptKind) core.LanguageVariant {
 * 	switch scriptKind {
 * 	case core.ScriptKindTSX, core.ScriptKindJSX, core.ScriptKindJS, core.ScriptKindJSON:
 * 		// .tsx and .jsx files are treated as jsx language variant.
 * 		return core.LanguageVariantJSX
 * 	}
 * 	return core.LanguageVariantStandard
 * }
 */
export function getLanguageVariant(scriptKind: ScriptKind): LanguageVariant {
  switch (scriptKind) {
    case ScriptKindTSX:
    case ScriptKindJSX:
    case ScriptKindJS:
    case ScriptKindJSON:
      // .tsx and .jsx files are treated as jsx language variant.
      return LanguageVariantJSX;
  }
  return LanguageVariantStandard;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/utilities.go::func::tokenIsIdentifierOrKeyword","kind":"func","status":"implemented","sigHash":"538026bcddd56581a52c2d4c5ae6b1f36ef3386ee89dd8f7605ba57f9f21df7d","bodyHash":"b09ca2afbed17046efb355bbc5fa534f58fc7cb9b3b212c37a3ba8428a1b3726"}
 *
 * Go source:
 * func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
 * 	return token >= ast.KindIdentifier
 * }
 */
export function tokenIsIdentifierOrKeyword(token: Kind): bool {
  return (token >= KindIdentifier) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/utilities.go::func::tokenIsIdentifierOrKeywordOrGreaterThan","kind":"func","status":"implemented","sigHash":"8c2bbccf98db702c946063640450b133e7c0c3a1978a7263dc599cb503470a5c","bodyHash":"9c4b664d2fc422eddefcedbe8884f7565459bc1020b09a71cf200b48340e8865"}
 *
 * Go source:
 * func tokenIsIdentifierOrKeywordOrGreaterThan(token ast.Kind) bool {
 * 	return token == ast.KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
 * }
 */
export function tokenIsIdentifierOrKeywordOrGreaterThan(token: Kind): bool {
  return (token === KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/utilities.go::func::GetJSDocCommentRanges","kind":"func","status":"stub","sigHash":"abe27f30e9295ee1de1c8e361301cd0f43503a6a7610221b954137e14cf1de5f","bodyHash":"634b57b5113bebc9488a8a7f8a1b22bf79284fc4a6d2da6e3850c6fbb8db4e0e"}
 *
 * Go source:
 * func GetJSDocCommentRanges(f *ast.NodeFactory, commentRanges []ast.CommentRange, node *ast.Node, text string) []ast.CommentRange {
 * 	switch node.Kind {
 * 	case ast.KindParameter, ast.KindTypeParameter, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindParenthesizedExpression, ast.KindVariableDeclaration, ast.KindExportSpecifier:
 * 		for commentRange := range scanner.GetTrailingCommentRanges(f, text, node.Pos()) {
 * 			commentRanges = append(commentRanges, commentRange)
 * 		}
 * 		for commentRange := range scanner.GetLeadingCommentRanges(f, text, node.Pos()) {
 * 			commentRanges = append(commentRanges, commentRange)
 * 		}
 * 	default:
 * 		for commentRange := range scanner.GetLeadingCommentRanges(f, text, node.Pos()) {
 * 			commentRanges = append(commentRanges, commentRange)
 * 		}
 * 	}
 * 	// Keep if the comment starts with '/**' but not if it is '/** /'
 * 	return slices.DeleteFunc(commentRanges, func(comment ast.CommentRange) bool {
 * 		commentStart := comment.Pos()
 * 		commentLen := comment.End() - commentStart
 * 		return comment.End() > node.End() || commentLen < 4 || text[commentStart+1] != '*' || text[commentStart+2] != '*' || text[commentStart+3] == '/'
 * 	})
 * }
 */
export function GetJSDocCommentRanges(f: GoPtr<NodeFactory>, commentRanges: GoSlice<CommentRange>, node: GoPtr<Node>, text: string): GoSlice<CommentRange> {
  throw new globalThis.Error("TSGO_UNIMPLEMENTED github.com/microsoft/typescript-go::internal/parser/utilities.go::func::GetJSDocCommentRanges");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/utilities.go::func::isKeywordOrPunctuation","kind":"func","status":"implemented","sigHash":"53f2f63cdd996e985a35c1fad8a26455a9a94463fa1e21564c5abceb63419a67","bodyHash":"0b38ee7685fe7b143c5d253720aa4667b27dc8308a65b30ac3c74cd62aa5df6c"}
 *
 * Go source:
 * func isKeywordOrPunctuation(token ast.Kind) bool {
 * 	return ast.IsKeywordKind(token) || ast.IsPunctuationKind(token)
 * }
 */
export function isKeywordOrPunctuation(token: Kind): bool {
  return (IsKeywordKind(token) || IsPunctuationKind(token)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/utilities.go::func::isJSDocLikeText","kind":"func","status":"implemented","sigHash":"c61fe909f944ef817f69d9192197de1b7ddcd4d111f961c160e90fd1aba46450","bodyHash":"4b1f735bd42ffc5633fd4c4946f823c7ff15ff09b9de169a12d4e7228a783725"}
 *
 * Go source:
 * func isJSDocLikeText(text string) bool {
 * 	return len(text) >= 4 && text[1] == '*' && text[2] == '*' && text[3] != '/'
 * }
 */
export function isJSDocLikeText(text: string): bool {
  return (text.length >= 4 && text[1] === "*" && text[2] === "*" && text[3] !== "/") as bool;
}
