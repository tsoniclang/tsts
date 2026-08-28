import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ConditionalTypeNode as ConditionalTypeNode__from_ast, ImportTypeNode as ImportTypeNode__from_ast, InferTypeNode as InferTypeNode__from_ast, MappedTypeNode as MappedTypeNode__from_ast, NamedTupleMember as NamedTupleMember__from_ast, QualifiedName as QualifiedName__from_ast, TemplateLiteralTypeNode as TemplateLiteralTypeNode__from_ast, TemplateLiteralTypeSpan as TemplateLiteralTypeSpan__from_ast, TypePredicateNode as TypePredicateNode__from_ast, TypeQueryNode as TypeQueryNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ElementFlags as ElementFlags__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { QuotePreference as QuotePreference__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { InlayHintKind as InlayHintKind__from_lsproto, Range$Storage as Range__from_lsproto$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { ArrayTypeNode as ArrayTypeNode__from_ast, CommentRange as CommentRange__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasContextSensitiveParameters as HasContextSensitiveParameters__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, IntersectionTypeNode as IntersectionTypeNode__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsCallExpression as IsCallExpression__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsEnumMember as IsEnumMember__from_ast, IsExpressionWithTypeArguments as IsExpressionWithTypeArguments__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInfinityOrNaNString as IsInfinityOrNaNString__from_ast, IsLiteralExpression as IsLiteralExpression__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsNamedTupleMember as IsNamedTupleMember__from_ast, IsNewExpression as IsNewExpression__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPartOfParameterDeclaration as IsPartOfParameterDeclaration__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsThisParameter as IsThisParameter__from_ast, IsTypeNode as IsTypeNode__from_ast, IsVarConst as IsVarConst__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindOptionalType$constant as KindOptionalType$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindRestType$constant as KindRestType$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateLiteralType$constant as KindTemplateLiteralType$constant__from_ast, KindTemplateLiteralTypeSpan$constant as KindTemplateLiteralTypeSpan$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, SkipParentheses as SkipParentheses__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, Symbol as Symbol__from_ast, TypeOperatorNode as TypeOperatorNode__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnionOrIntersectionTypeNodeBase as UnionOrIntersectionTypeNodeBase__from_ast, UnionTypeNode as UnionTypeNode__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, ElementFlagsRequired$constant as ElementFlagsRequired$constant__from_checker, Signature as Signature__from_checker, TupleElementInfo as TupleElementInfo__from_checker, TupleType as TupleType__from_checker, TypeFlagsAny$constant as TypeFlagsAny$constant__from_checker, TypePredicate as TypePredicate__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug, FailBadSyntaxKind as FailBadSyntaxKind__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { AnyToString as AnyToString__from_evaluator } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import { Converters as Converters__from_lsconv, FileNameToDocumentURI as FileNameToDocumentURI__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { IncludeInlayParameterNameHintsAll$constant as IncludeInlayParameterNameHintsAll$constant__from_lsutil, IncludeInlayParameterNameHintsLiterals$constant as IncludeInlayParameterNameHintsLiterals$constant__from_lsutil, IncludeInlayParameterNameHintsNone$constant as IncludeInlayParameterNameHintsNone$constant__from_lsutil, InlayHintsPreferences as InlayHintsPreferences__from_lsutil, QuotePreferenceSingle$constant as QuotePreferenceSingle$constant__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { InlayHintKindParameter$constant as InlayHintKindParameter$constant__from_lsproto, InlayHintKindType$constant as InlayHintKindType$constant__from_lsproto, InlayHintLabelPart as InlayHintLabelPart__from_lsproto, InlayHint as InlayHint__from_lsproto, Location as Location__from_lsproto, Range as Range__from_lsproto, StringOrInlayHintLabelParts as StringOrInlayHintLabelParts__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { EscapeString as EscapeString__from_printer, QuoteCharBacktick$constant as QuoteCharBacktick$constant__from_printer, QuoteCharDoubleQuote$constant as QuoteCharDoubleQuote$constant__from_printer, QuoteCharSingleQuote$constant as QuoteCharSingleQuote$constant__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsIdentifierText as IsIdentifierText__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { EquateStringCaseInsensitive as EquateStringCaseInsensitive__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { IfElse$int, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { IndexFunc$SliceOf_Named_checker$ElementFlags$Named_checker$ElementFlags } from "../../../../../../support/generics/concretizations/slices/IndexFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { getLeadingCommentRangesOfNode } from "./utilities.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class inlayHintState {
    declare private readonly $goType: void;
    public constructor(public ctx: GoInterface | undefined, public span: TextRange__from_core, public preferences: InlayHintsPreferences__from_lsutil, public quotePreference: QuotePreference__from_lsutil, public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public checker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, public converters: {
        value: Converters__from_lsconv;
    } | undefined, public result: RuntimeSlice<tsonicTypeScriptRuntime.Location<InlayHint__from_lsproto> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$addEnumMemberValueHints(s: inlayHintState | undefined, text: gostring, position__shadow_1: int): void {
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result.append(void 0, [
            tsonicTypeScriptRuntime.location<InlayHint__from_lsproto>(new InlayHint__from_lsproto(Converters__from_lsconv.PositionToLineAndCharacter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file), position__shadow_1 | 0), new StringOrInlayHintLabelParts__from_lsproto(tsonicTypeScriptRuntime.location<gostring>("= " + text), void 0), void 0, void 0, void 0, tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0)),
        ]);
    }
    static $go$private$ls$addParameterHints(s: inlayHintState | undefined, text: gostring, parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, isFirstVariadicArgument: bool): void {
        let hintText = IfElse$string(isFirstVariadicArgument, "...", "") + text;
        let displayParts = RuntimeSlice.literal<{
            value: InlayHintLabelPart__from_lsproto;
        } | undefined>([inlayHintState.$go$private$ls$getNodeDisplayPart(s, hintText, parameter), { value: new InlayHintLabelPart__from_lsproto(":", void 0, void 0, void 0) },
        ]);
        const displayParts$location = tsonicTypeScriptRuntime.boundLocation({}, () => displayParts, displayParts$next => displayParts = displayParts$next);
        let labelParts = new StringOrInlayHintLabelParts__from_lsproto(void 0, displayParts$location);
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result.append(void 0, [
            tsonicTypeScriptRuntime.location<InlayHint__from_lsproto>(new InlayHint__from_lsproto(Converters__from_lsconv.PositionToLineAndCharacter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file), position__shadow_1 | 0), StringOrInlayHintLabelParts__from_lsproto.$copy(labelParts), tsonicTypeScriptRuntime.location<InlayHintKind__from_lsproto>(InlayHintKindParameter$constant__from_lsproto()), void 0, void 0, void 0, tsonicTypeScriptRuntime.location<bool>(true), void 0)),
        ]);
    }
    static $go$private$ls$addParameterTypeHint(s: inlayHintState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        let typeAnnotation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(node);
        if (!(typeAnnotation === undefined) || __go_symbol === undefined) {
            return;
        }
        let typeHints: tsonicTypeScriptRuntime.Location<StringOrInlayHintLabelParts__from_lsproto> | undefined = inlayHintState.$go$private$ls$getParameterDeclarationTypeHints(s, __go_symbol);
        if (typeHints === undefined) {
            return;
        }
        let pos = 0;
        if (!(Node__from_ast.QuestionToken(node) === undefined)) {
            pos = Node__from_ast.End(Node__from_ast.QuestionToken(node));
        }
        else {
            pos = Node__from_ast.End(Node__from_ast.Name(node));
        }
        inlayHintState.$go$private$ls$addTypeHints(s, StringOrInlayHintLabelParts__from_lsproto.$copy(StringOrInlayHintLabelParts__from_lsproto.$copy(((typeHints ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringOrInlayHintLabelParts__from_lsproto>).value)), pos);
    }
    static $go$private$ls$addTypeHints(s: inlayHintState | undefined, hint: StringOrInlayHintLabelParts__from_lsproto, position__shadow_1: int): void {
        if (!(hint.String === undefined)) {
            hint.String =
                tsonicTypeScriptRuntime.location<gostring>(": " +
                    ((hint.String ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value);
        }
        else {
            hint.InlayHintLabelParts =
                tsonicTypeScriptRuntime.location<RuntimeSlice<{
                    value: InlayHintLabelPart__from_lsproto;
                } | undefined>>(goSliceAppendSlice<{
                    value: InlayHintLabelPart__from_lsproto;
                } | undefined>(RuntimeSlice.literal<{
                    value: InlayHintLabelPart__from_lsproto;
                } | undefined>([
                    { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                ]), ((hint.InlayHintLabelParts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                    value: InlayHintLabelPart__from_lsproto;
                } | undefined>>).value, void 0));
        }
        (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result.append(void 0, [
            tsonicTypeScriptRuntime.location<InlayHint__from_lsproto>(new InlayHint__from_lsproto(Converters__from_lsconv.PositionToLineAndCharacter((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file), position__shadow_1 | 0), StringOrInlayHintLabelParts__from_lsproto.$copy(hint), tsonicTypeScriptRuntime.location<InlayHintKind__from_lsproto>(InlayHintKindType$constant__from_lsproto()), void 0, void 0, tsonicTypeScriptRuntime.location<bool>(true), void 0, void 0)),
        ]);
    }
    static $go$private$ls$getInlayHintLabelParts(s: inlayHintState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<{
        value: InlayHintLabelPart__from_lsproto;
    } | undefined> {
        let parts = RuntimeSlice.nil<{
            value: InlayHintLabelPart__from_lsproto;
        } | undefined>();
        let visitForDisplayParts: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined;
        let visitDisplayPartList: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $1: gostring) => void) | undefined;
        let visitParametersAndTypeParameters: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined;
        visitForDisplayParts = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (node__shadow_1 === undefined) {
                return;
            }
            let tokenString = TokenToString__from_scanner(Node__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
            if (tokenString !== "") {
                parts = parts.append(void 0, [
                    { value: new InlayHintLabelPart__from_lsproto(tokenString, void 0, void 0, void 0) },
                ]);
                return;
            }
            if (IsLiteralExpression__from_ast(node__shadow_1)) {
                parts = parts.append(void 0, [
                    { value: new InlayHintLabelPart__from_lsproto(inlayHintState.$go$private$ls$getLiteralText(s, node__shadow_1), void 0, void 0, void 0) },
                ]);
                return;
            }
            switch (Node__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindIdentifier$constant__from_ast(): {
                    let identifierText = Node__from_ast.Text(node__shadow_1);
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    {
                        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = idToSymbol.lookup(node__shadow_1);
                        if (!(__go_symbol === undefined) && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0) {
                            name = GetNameOfDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0));
                        }
                    }
                    if (!(name === undefined)) {
                        parts = parts.append(void 0, [inlayHintState.$go$private$ls$getNodeDisplayPart(s, identifierText, name)]);
                    }
                    else {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(identifierText, void 0, void 0, void 0) },
                        ]);
                    }
                    break;
                }
                case KindQualifiedName$constant__from_ast(): {
                    const __gotots_callee_1 = visitForDisplayParts;
                    const __gotots_argument_1: QualifiedName__from_ast["Left"] = (Node__from_ast.AsQualifiedName(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left;
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(".", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_2 = visitForDisplayParts;
                    const __gotots_argument_2: QualifiedName__from_ast["Right"] = (Node__from_ast.AsQualifiedName(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right;
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                    break;
                }
                case KindTypePredicate$constant__from_ast(): {
                    if (!((Node__from_ast.AsTypePredicateNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssertsModifier === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("asserts ", void 0, void 0, void 0) },
                        ]);
                    }
                    const __gotots_callee_3 = visitForDisplayParts;
                    const __gotots_argument_3: TypePredicateNode__from_ast["ParameterName"] = (Node__from_ast.AsTypePredicateNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName;
                    (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" is ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_4 = visitForDisplayParts;
                        const __gotots_argument_4 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
                    }
                    break;
                }
                case KindTypeReference$constant__from_ast(): {
                    const __gotots_callee_5 = visitForDisplayParts;
                    const __gotots_argument_5 = TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
                    (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
                    if (Node__from_ast.TypeArguments(node__shadow_1).length > 0) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("<", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_6 = visitDisplayPartList;
                        const __gotots_argument_6 = Node__from_ast.TypeArguments(node__shadow_1);
                        const __gotots_argument_7 = ",";
                        (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(">", void 0, void 0, void 0) },
                        ]);
                    }
                    break;
                }
                case KindTypeParameter$constant__from_ast(): {
                    if (Node__from_ast.ModifierNodes(node__shadow_1).length > 0) {
                        const __gotots_callee_7 = visitDisplayPartList;
                        const __gotots_argument_8 = Node__from_ast.ModifierNodes(node__shadow_1);
                        const __gotots_argument_9 = "";
                        (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
                    }
                    const __gotots_callee_8 = visitForDisplayParts;
                    const __gotots_argument_10 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
                    if (!(TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" extends ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_9 = visitForDisplayParts;
                        const __gotots_argument_11 = TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint;
                        (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
                    }
                    if (!(TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" = ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_10 = visitForDisplayParts;
                        const __gotots_argument_12 = TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType;
                        (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
                    }
                    break;
                }
                case KindParameter$constant__from_ast(): {
                    if (Node__from_ast.ModifierNodes(node__shadow_1).length > 0) {
                        const __gotots_callee_11 = visitDisplayPartList;
                        const __gotots_argument_13 = Node__from_ast.ModifierNodes(node__shadow_1);
                        const __gotots_argument_14 = " ";
                        (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14);
                    }
                    if (!(ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("...", void 0, void 0, void 0) },
                        ]);
                    }
                    const __gotots_callee_12 = visitForDisplayParts;
                    const __gotots_argument_15 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
                    if (!(Node__from_ast.QuestionToken(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("?", void 0, void 0, void 0) },
                        ]);
                    }
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_13 = visitForDisplayParts;
                        const __gotots_argument_16 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
                    }
                    break;
                }
                case KindConstructorType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("new ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_14 = visitParametersAndTypeParameters;
                    const __gotots_argument_17 = node__shadow_1;
                    (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(" => ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_15 = visitForDisplayParts;
                    const __gotots_argument_18 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
                    break;
                }
                case KindTypeQuery$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("typeof ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_16 = visitForDisplayParts;
                    const __gotots_argument_19: TypeQueryNode__from_ast["ExprName"] = (Node__from_ast.AsTypeQueryNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName;
                    (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
                    if (Node__from_ast.TypeArguments(node__shadow_1).length > 0) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("<", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_17 = visitDisplayPartList;
                        const __gotots_argument_20 = Node__from_ast.TypeArguments(node__shadow_1);
                        const __gotots_argument_21 = ", ";
                        (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(">", void 0, void 0, void 0) },
                        ]);
                    }
                    break;
                }
                case KindTypeLiteral$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("{", void 0, void 0, void 0) },
                    ]);
                    if (Node__from_ast.Members(node__shadow_1).length > 0) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_18 = visitDisplayPartList;
                        const __gotots_argument_22 = Node__from_ast.Members(node__shadow_1);
                        const __gotots_argument_23 = "; ";
                        (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22, __gotots_argument_23);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" ", void 0, void 0, void 0) },
                        ]);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("}", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindArrayType$constant__from_ast(): {
                    const __gotots_callee_19 = visitForDisplayParts;
                    const __gotots_argument_24 = ArrayTypeNode__from_ast.$storageOf(((Node__from_ast.AsArrayTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast>).value).ElementType;
                    (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[]", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindTupleType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_20 = visitDisplayPartList;
                    const __gotots_argument_25 = Node__from_ast.Elements(node__shadow_1);
                    const __gotots_argument_26 = ", ";
                    (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindNamedTupleMember$constant__from_ast(): {
                    if (!((Node__from_ast.AsNamedTupleMember(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("...", void 0, void 0, void 0) },
                        ]);
                    }
                    const __gotots_callee_21 = visitForDisplayParts;
                    const __gotots_argument_27 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
                    if (!(Node__from_ast.QuestionToken(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("?", void 0, void 0, void 0) },
                        ]);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_22 = visitForDisplayParts;
                    const __gotots_argument_28 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
                    break;
                }
                case KindOptionalType$constant__from_ast(): {
                    const __gotots_callee_23 = visitForDisplayParts;
                    const __gotots_argument_29 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("?", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindRestType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("...", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_24 = visitForDisplayParts;
                    const __gotots_argument_30 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
                    break;
                }
                case KindUnionType$constant__from_ast(): {
                    if (!((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                        UnionTypeNode__from_ast.$storageOf(((Node__from_ast.AsUnionTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types === undefined)) {
                        const __gotots_callee_25 = visitDisplayPartList;
                        const __gotots_argument_31 = NodeList__from_ast.$storageOf((((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                            UnionTypeNode__from_ast.$storageOf(((Node__from_ast.AsUnionTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                        const __gotots_argument_32 = " | ";
                        (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32);
                    }
                    break;
                }
                case KindIntersectionType$constant__from_ast(): {
                    if (!((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                        IntersectionTypeNode__from_ast.$storageOf(((Node__from_ast.AsIntersectionTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types === undefined)) {
                        const __gotots_callee_26 = visitDisplayPartList;
                        const __gotots_argument_33 = NodeList__from_ast.$storageOf((((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                            IntersectionTypeNode__from_ast.$storageOf(((Node__from_ast.AsIntersectionTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                        const __gotots_argument_34 = " & ";
                        (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33, __gotots_argument_34);
                    }
                    break;
                }
                case KindConditionalType$constant__from_ast(): {
                    const __gotots_callee_27 = visitForDisplayParts;
                    const __gotots_argument_35: ConditionalTypeNode__from_ast["CheckType"] = (Node__from_ast.AsConditionalTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckType;
                    (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(" extends ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_28 = visitForDisplayParts;
                    const __gotots_argument_36: ConditionalTypeNode__from_ast["ExtendsType"] = (Node__from_ast.AsConditionalTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendsType;
                    (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(" ? ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_29 = visitForDisplayParts;
                    const __gotots_argument_37: ConditionalTypeNode__from_ast["TrueType"] = (Node__from_ast.AsConditionalTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType;
                    (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(" : ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_30 = visitForDisplayParts;
                    const __gotots_argument_38: ConditionalTypeNode__from_ast["FalseType"] = (Node__from_ast.AsConditionalTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FalseType;
                    (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38);
                    break;
                }
                case KindInferType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("infer ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_31 = visitForDisplayParts;
                    const __gotots_argument_39: InferTypeNode__from_ast["TypeParameter"] = (Node__from_ast.AsInferTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter;
                    (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39);
                    break;
                }
                case KindParenthesizedType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("(", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_32 = visitForDisplayParts;
                    const __gotots_argument_40 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_40);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(")", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindTypeOperator$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(TokenToString__from_scanner(TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator), void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_33 = visitForDisplayParts;
                    const __gotots_argument_41 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41);
                    break;
                }
                case KindIndexedAccessType$constant__from_ast(): {
                    const __gotots_callee_34 = visitForDisplayParts;
                    const __gotots_argument_42 = IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType;
                    (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_35 = visitForDisplayParts;
                    const __gotots_argument_43 = IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).IndexType;
                    (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindMappedType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("{ ", void 0, void 0, void 0) },
                    ]);
                    if (!((Node__from_ast.AsMappedTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken === undefined)) {
                        if (Node__from_ast.$storageOf((((Node__from_ast.AsMappedTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPlusToken$constant__from_ast()) {
                            parts = parts.append(void 0, [
                                { value: new InlayHintLabelPart__from_lsproto("+", void 0, void 0, void 0) },
                            ]);
                        }
                        else if (Node__from_ast.$storageOf((((Node__from_ast.AsMappedTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMinusToken$constant__from_ast()) {
                            parts = parts.append(void 0, [
                                { value: new InlayHintLabelPart__from_lsproto("-", void 0, void 0, void 0) },
                            ]);
                        }
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("readonly ", void 0, void 0, void 0) },
                        ]);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_36 = visitForDisplayParts;
                    const __gotots_argument_44: MappedTypeNode__from_ast["TypeParameter"] = (Node__from_ast.AsMappedTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter;
                    (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44);
                    if (!((Node__from_ast.AsMappedTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" as ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_37 = visitForDisplayParts;
                        const __gotots_argument_45: MappedTypeNode__from_ast["NameType"] = (Node__from_ast.AsMappedTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType;
                        (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    if (!(Node__from_ast.QuestionToken(node__shadow_1) === undefined)) {
                        if (Node__from_ast.$storageOf(((Node__from_ast.QuestionToken(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPlusToken$constant__from_ast()) {
                            parts = parts.append(void 0, [
                                { value: new InlayHintLabelPart__from_lsproto("+", void 0, void 0, void 0) },
                            ]);
                        }
                        else if (Node__from_ast.$storageOf(((Node__from_ast.QuestionToken(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMinusToken$constant__from_ast()) {
                            parts = parts.append(void 0, [
                                { value: new InlayHintLabelPart__from_lsproto("-", void 0, void 0, void 0) },
                            ]);
                        }
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("?", void 0, void 0, void 0) },
                        ]);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                    ]);
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        const __gotots_callee_38 = visitForDisplayParts;
                        const __gotots_argument_46 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_46);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("; }", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindLiteralType$constant__from_ast(): {
                    const __gotots_callee_39 = visitForDisplayParts;
                    const __gotots_argument_47 = LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal;
                    (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47);
                    break;
                }
                case KindFunctionType$constant__from_ast(): {
                    const __gotots_callee_40 = visitParametersAndTypeParameters;
                    const __gotots_argument_48 = node__shadow_1;
                    (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(" => ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_41 = visitForDisplayParts;
                    const __gotots_argument_49 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49);
                    break;
                }
                case KindImportType$constant__from_ast(): {
                    if ((Node__from_ast.AsImportTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("typeof ", void 0, void 0, void 0) },
                        ]);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("import(", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_42 = visitForDisplayParts;
                    const __gotots_argument_50: ImportTypeNode__from_ast["Argument"] = (Node__from_ast.AsImportTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument;
                    (__gotots_callee_42 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_50);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(")", void 0, void 0, void 0) },
                    ]);
                    if (!((Node__from_ast.AsImportTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(".", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_43 = visitForDisplayParts;
                        const __gotots_argument_51: ImportTypeNode__from_ast["Qualifier"] = (Node__from_ast.AsImportTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier;
                        (__gotots_callee_43 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51);
                    }
                    if (Node__from_ast.TypeArguments(node__shadow_1).length > 0) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto("<", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_44 = visitDisplayPartList;
                        const __gotots_argument_52 = Node__from_ast.TypeArguments(node__shadow_1);
                        const __gotots_argument_53 = ", ";
                        (__gotots_callee_44 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52, __gotots_argument_53);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(">", void 0, void 0, void 0) },
                        ]);
                    }
                    break;
                }
                case KindPropertySignature$constant__from_ast(): {
                    if (Node__from_ast.ModifierNodes(node__shadow_1).length > 0) {
                        const __gotots_callee_45 = visitDisplayPartList;
                        const __gotots_argument_54 = Node__from_ast.ModifierNodes(node__shadow_1);
                        const __gotots_argument_55 = " ";
                        (__gotots_callee_45 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54, __gotots_argument_55);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" ", void 0, void 0, void 0) },
                        ]);
                    }
                    const __gotots_callee_46 = visitForDisplayParts;
                    const __gotots_argument_56 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_46 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56);
                    if (!(Node__from_ast.PostfixToken(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(TokenToString__from_scanner(Node__from_ast.$storageOf(((Node__from_ast.PostfixToken(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), void 0, void 0, void 0) },
                        ]);
                    }
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_47 = visitForDisplayParts;
                        const __gotots_argument_57 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_47 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57);
                    }
                    break;
                }
                case KindIndexSignature$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_48 = visitDisplayPartList;
                    const __gotots_argument_58 = Node__from_ast.Parameters(node__shadow_1);
                    const __gotots_argument_59 = ", ";
                    (__gotots_callee_48 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_58, __gotots_argument_59);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_49 = visitForDisplayParts;
                        const __gotots_argument_60 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_49 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60);
                    }
                    break;
                }
                case KindMethodSignature$constant__from_ast(): {
                    if (Node__from_ast.ModifierNodes(node__shadow_1).length > 0) {
                        const __gotots_callee_50 = visitDisplayPartList;
                        const __gotots_argument_61 = Node__from_ast.ModifierNodes(node__shadow_1);
                        const __gotots_argument_62 = " ";
                        (__gotots_callee_50 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_61, __gotots_argument_62);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" ", void 0, void 0, void 0) },
                        ]);
                    }
                    const __gotots_callee_51 = visitForDisplayParts;
                    const __gotots_argument_63 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_51 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63);
                    if (!(Node__from_ast.PostfixToken(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(TokenToString__from_scanner(Node__from_ast.$storageOf(((Node__from_ast.PostfixToken(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), void 0, void 0, void 0) },
                        ]);
                    }
                    const __gotots_callee_52 = visitParametersAndTypeParameters;
                    const __gotots_argument_64 = node__shadow_1;
                    (__gotots_callee_52 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_64);
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_53 = visitForDisplayParts;
                        const __gotots_argument_65 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_53 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_65);
                    }
                    break;
                }
                case KindCallSignature$constant__from_ast(): {
                    const __gotots_callee_54 = visitParametersAndTypeParameters;
                    const __gotots_argument_66 = node__shadow_1;
                    (__gotots_callee_54 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_66);
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_55 = visitForDisplayParts;
                        const __gotots_argument_67 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_55 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_67);
                    }
                    break;
                }
                case KindConstructSignature$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("new ", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_56 = visitParametersAndTypeParameters;
                    const __gotots_argument_68 = node__shadow_1;
                    (__gotots_callee_56 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68);
                    if (!(Node__from_ast.Type(node__shadow_1) === undefined)) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(": ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_57 = visitForDisplayParts;
                        const __gotots_argument_69 = Node__from_ast.Type(node__shadow_1);
                        (__gotots_callee_57 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_69);
                    }
                    break;
                }
                case KindArrayBindingPattern$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_58 = visitDisplayPartList;
                    const __gotots_argument_70 = Node__from_ast.Elements(node__shadow_1);
                    const __gotots_argument_71 = ", ";
                    (__gotots_callee_58 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_70, __gotots_argument_71);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindObjectBindingPattern$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("{", void 0, void 0, void 0) },
                    ]);
                    if (Node__from_ast.Elements(node__shadow_1).length > 0) {
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" ", void 0, void 0, void 0) },
                        ]);
                        const __gotots_callee_59 = visitDisplayPartList;
                        const __gotots_argument_72 = Node__from_ast.Elements(node__shadow_1);
                        const __gotots_argument_73 = ", ";
                        (__gotots_callee_59 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_72, __gotots_argument_73);
                        parts = parts.append(void 0, [
                            { value: new InlayHintLabelPart__from_lsproto(" ", void 0, void 0, void 0) },
                        ]);
                    }
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("}", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindBindingElement$constant__from_ast(): {
                    const __gotots_callee_60 = visitForDisplayParts;
                    const __gotots_argument_74 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_60 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_74);
                    break;
                }
                case KindPrefixUnaryExpression$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(TokenToString__from_scanner(PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator), void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_61 = visitForDisplayParts;
                    const __gotots_argument_75 = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
                    (__gotots_callee_61 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_75);
                    break;
                }
                case KindTemplateLiteralType$constant__from_ast(): {
                    const __gotots_callee_62 = visitForDisplayParts;
                    const __gotots_argument_76: TemplateLiteralTypeNode__from_ast["Head"] = (Node__from_ast.AsTemplateLiteralTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Head;
                    (__gotots_callee_62 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_76);
                    const __gotots_range_5 = NodeList__from_ast.$storageOf((((Node__from_ast.AsTemplateLiteralTypeNode(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_4);
                        let span: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                        const __gotots_callee_63 = visitForDisplayParts;
                        const __gotots_argument_77 = span;
                        (__gotots_callee_63 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_77);
                    }
                    break;
                }
                case KindTemplateHead$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(inlayHintState.$go$private$ls$getLiteralText(s, node__shadow_1), void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindTemplateLiteralTypeSpan$constant__from_ast(): {
                    const __gotots_callee_64 = visitForDisplayParts;
                    const __gotots_argument_78 = Node__from_ast.Type(node__shadow_1);
                    (__gotots_callee_64 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78);
                    const __gotots_callee_65 = visitForDisplayParts;
                    const __gotots_argument_79: TemplateLiteralTypeSpan__from_ast["Literal"] = (Node__from_ast.AsTemplateLiteralTypeSpan(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal;
                    (__gotots_callee_65 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_79);
                    break;
                }
                case KindTemplateMiddle$constant__from_ast():
                case KindTemplateTail$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(inlayHintState.$go$private$ls$getLiteralText(s, node__shadow_1), void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindThisType$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("this", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindComputedPropertyName$constant__from_ast(): {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_66 = visitForDisplayParts;
                    const __gotots_argument_80 = Node__from_ast.Expression(node__shadow_1);
                    (__gotots_callee_66 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_80);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                case KindPropertyAccessExpression$constant__from_ast(): {
                    const __gotots_callee_67 = visitForDisplayParts;
                    const __gotots_argument_81 = Node__from_ast.Expression(node__shadow_1);
                    (__gotots_callee_67 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_81);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(".", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_68 = visitForDisplayParts;
                    const __gotots_argument_82 = Node__from_ast.Name(node__shadow_1);
                    (__gotots_callee_68 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_82);
                    break;
                }
                case KindElementAccessExpression$constant__from_ast(): {
                    const __gotots_callee_69 = visitForDisplayParts;
                    const __gotots_argument_83 = Node__from_ast.Expression(node__shadow_1);
                    (__gotots_callee_69 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_83);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("[", void 0, void 0, void 0) },
                    ]);
                    const __gotots_callee_70 = visitForDisplayParts;
                    const __gotots_argument_84 = ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(node__shadow_1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression;
                    (__gotots_callee_70 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_84);
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto("]", void 0, void 0, void 0) },
                    ]);
                    break;
                }
                default: {
                    FailBadSyntaxKind__from_debug(new $goInterfaceAdapter$PointerTo_Named_ast$Node(node__shadow_1), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                    break;
                }
            }
        };
        visitDisplayPartList = (nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, separator: gostring): void => {
            const __gotots_range_6 = nodes;
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                const __gotots_range_value_6 = __gotots_range_index_5;
                const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_5);
                let i = __gotots_range_value_6;
                let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
                if (i > 0) {
                    parts = parts.append(void 0, [
                        { value: new InlayHintLabelPart__from_lsproto(separator, void 0, void 0, void 0) },
                    ]);
                }
                const __gotots_callee_71 = visitForDisplayParts;
                const __gotots_argument_85 = n;
                (__gotots_callee_71 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_85);
            }
        };
        visitParametersAndTypeParameters = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (Node__from_ast.TypeParameters(node__shadow_1).length > 0) {
                parts = parts.append(void 0, [
                    { value: new InlayHintLabelPart__from_lsproto("<", void 0, void 0, void 0) },
                ]);
                const __gotots_callee_72 = visitDisplayPartList;
                const __gotots_argument_86 = Node__from_ast.TypeParameters(node__shadow_1);
                const __gotots_argument_87 = ", ";
                (__gotots_callee_72 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86, __gotots_argument_87);
                parts = parts.append(void 0, [
                    { value: new InlayHintLabelPart__from_lsproto(">", void 0, void 0, void 0) },
                ]);
            }
            parts = parts.append(void 0, [
                { value: new InlayHintLabelPart__from_lsproto("(", void 0, void 0, void 0) },
            ]);
            const __gotots_callee_73 = visitDisplayPartList;
            const __gotots_argument_88 = Node__from_ast.Parameters(node__shadow_1);
            const __gotots_argument_89 = ", ";
            (__gotots_callee_73 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_88, __gotots_argument_89);
            parts = parts.append(void 0, [
                { value: new InlayHintLabelPart__from_lsproto(")", void 0, void 0, void 0) },
            ]);
        };
        const __gotots_callee_74 = visitForDisplayParts;
        const __gotots_argument_90 = node;
        (__gotots_callee_74 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_90);
        return parts;
    }
    static $go$private$ls$getLiteralText(s: inlayHintState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindStringLiteral$constant__from_ast(): {
                if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
                    return "'" + EscapeString__from_printer(Node__from_ast.Text(node), QuoteCharSingleQuote$constant__from_printer()) + "'";
                }
                return "\"" + EscapeString__from_printer(Node__from_ast.Text(node), QuoteCharDoubleQuote$constant__from_printer()) + "\"";
                break;
            }
            case KindTemplateHead$constant__from_ast():
            case KindTemplateMiddle$constant__from_ast():
            case KindTemplateTail$constant__from_ast(): {
                let rawText = Node__from_ast.RawText(node);
                if (rawText === "") {
                    rawText = EscapeString__from_printer(Node__from_ast.Text(node), QuoteCharBacktick$constant__from_printer());
                }
                switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindTemplateHead$constant__from_ast(): {
                        return "`" + rawText + "${";
                        break;
                    }
                    case KindTemplateMiddle$constant__from_ast(): {
                        return "}" + rawText + "${";
                        break;
                    }
                    case KindTemplateTail$constant__from_ast(): {
                        return "}" + rawText + "`";
                        break;
                    }
                }
                break;
            }
        }
        return Node__from_ast.Text(node);
    }
    static $go$private$ls$getNodeDisplayPart(s: inlayHintState | undefined, text: gostring, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
        value: InlayHintLabelPart__from_lsproto;
    } | undefined {
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
        let pos = GetStartOfNode__from_astnav(node, file, false);
        let end = Node__from_ast.End(node);
        return { value: new InlayHintLabelPart__from_lsproto(text, void 0, tsonicTypeScriptRuntime.location<Location__from_lsproto>(Location__from_lsproto.$fromStorage({
                Uri: FileNameToDocumentURI__from_lsconv(SourceFile__from_ast.FileName(file)).$value,
                Range: Range__from_lsproto.$storageOf(Converters__from_lsconv.ToLSPRange((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), NewTextRange__from_core(pos, end)))
            })), void 0) };
    }
    static $go$private$ls$getParameterDeclarationTypeHints(s: inlayHintState | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<StringOrInlayHintLabelParts__from_lsproto> | undefined {
        let valueDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
        if (valueDeclaration === undefined || !IsParameterDeclaration__from_ast(valueDeclaration)) {
            return void 0;
        }
        let signatureParamType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbolAtLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, __go_symbol, valueDeclaration);
        if (isModuleReferenceType(signatureParamType)) {
            return void 0;
        }
        return tsonicTypeScriptRuntime.location<StringOrInlayHintLabelParts__from_lsproto>(inlayHintState.$go$private$ls$typeToInlayHintParts(s, signatureParamType));
    }
    static $go$private$ls$getParameterIdentifierInfoAtPosition(s: inlayHintState | undefined, signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, pos: int): parameterInfo | undefined {
        let parameters = Signature__from_checker.Parameters(signature);
        let paramCount = parameters.length - IfElse$int(Signature__from_checker.HasRestParameter(signature), 1, 0);
        if (pos < paramCount) {
            let param: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = parameters.get(pos);
            let paramId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getParameterDeclarationIdentifier(param);
            if (paramId === undefined) {
                return void 0;
            }
            return new parameterInfo(paramId, Node__from_ast.Text(paramId), false);
        }
        let restParameter: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        let restId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (paramCount < parameters.length) {
            restParameter = parameters.get(paramCount);
            restId = getParameterDeclarationIdentifier(restParameter);
        }
        if (restId === undefined) {
            return void 0;
        }
        let restType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeOfSymbol((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, restParameter);
        if (Type__from_checker.IsTupleType(restType)) {
            let associatedNames = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, TupleType__from_checker.ElementInfos(Type__from_checker.AsTupleType(Type__from_checker.Target(restType))).length, void 0);
            const __gotots_range_3 = TupleType__from_checker.ElementInfos(Type__from_checker.AsTupleType(Type__from_checker.Target(restType)));
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = TupleElementInfo__from_checker.$copy(TupleElementInfo__from_checker.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
                let elementInfo = __gotots_range_value_3;
                let labeledElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TupleElementInfo__from_checker.LabeledDeclaration(elementInfo);
                associatedNames = associatedNames.append(void 0, [labeledElement]);
            }
            let index = pos - paramCount;
            if (index < associatedNames.length) {
                let associatedName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = associatedNames.get(index);
                if (!(associatedName === undefined)) {
                    Assert__from_debug(IsIdentifier__from_ast(Node__from_ast.Name(associatedName)), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                    let isRestTupleElement = false;
                    if (IsNamedTupleMember__from_ast(associatedName)) {
                        isRestTupleElement = !((Node__from_ast.AsNamedTupleMember(associatedName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken === undefined);
                    }
                    else {
                        isRestTupleElement = !(ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(associatedName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined);
                    }
                    return new parameterInfo(Node__from_ast.Name(associatedName), Node__from_ast.Text(Node__from_ast.Name(associatedName)), isRestTupleElement);
                }
            }
            return void 0;
        }
        if (pos === paramCount) {
            return new parameterInfo(restId, Symbol__from_ast.$storageOf(((restParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, true);
        }
        return void 0;
    }
    static $go$private$ls$getTypeAnnotationPosition(s: inlayHintState | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        let closeParenToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(decl, KindCloseParenToken$constant__from_ast(), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file);
        if (!(closeParenToken === undefined)) {
            return Node__from_ast.End(closeParenToken);
        }
        return NodeList__from_ast.End(Node__from_ast.ParameterList(decl));
    }
    static $go$private$ls$leadingCommentsContainsParameterName(s: inlayHintState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring): bool {
        if (!IsIdentifierText__from_scanner(name, (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant)) {
            return false;
        }
        let ranges: iter__from_gostdlib.Seq<CommentRange__from_ast> = getLeadingCommentRangesOfNode(node, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file);
        let fileText = SourceFile__from_ast.Text((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file);
        const __gotots_range_4 = named_iter.IterSeqValueOperations.$project(ranges);
        if (__gotots_range_4 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        let __gotots_range_return_0: bool = false;
        __gotots_range_4(($argument0: CommentRange__from_ast): bool => {
            if (__gotots_range_state_0 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_0 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_0 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_0 = -1;
            const __gotots_range_value_4 = CommentRange__from_ast.$copy($argument0);
            let r = __gotots_range_value_4;
            let commentText = strings__from_gostdlib.TrimFunc(goStringSlice(fileText, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(r).TextRange).Pos(), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(r).TextRange).End()), (r__shadow_1: int32): bool => {
                return unicode__from_gostdlib.IsSpace(r__shadow_1) || r__shadow_1 === 47 || r__shadow_1 === 42;
            });
            if (commentText === name) {
                __gotots_range_return_0 = true;
                __gotots_range_state_0 = 2;
                return false;
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_0 === 2) {
            return __gotots_range_return_0;
        }
        __gotots_range_state_0 = -2;
        return false;
    }
    static $go$private$ls$typePredicateToInlayHintParts(s: inlayHintState | undefined, typePredicate: {
        value: TypePredicate__from_checker;
    } | undefined): StringOrInlayHintLabelParts__from_lsproto {
        let flags = 71286784;
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = GoMap.make(0, []);
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypePredicateToTypePredicateNode((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, typePredicate, void 0, flags, idToSymbol);
        Assert__from_debug(!(typeNode === undefined), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("should always get typePredicateNode")]));
        return new StringOrInlayHintLabelParts__from_lsproto(void 0, tsonicTypeScriptRuntime.location<RuntimeSlice<{
            value: InlayHintLabelPart__from_lsproto;
        } | undefined>>(inlayHintState.$go$private$ls$getInlayHintLabelParts(s, typeNode, idToSymbol)));
    }
    static $go$private$ls$typeToInlayHintParts(s: inlayHintState | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): StringOrInlayHintLabelParts__from_lsproto {
        let flags = 71286784;
        let idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = GoMap.make(0, []);
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypeToTypeNode((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, t, void 0, flags, idToSymbol);
        Assert__from_debug(!(typeNode === undefined), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("should always get typenode")]));
        return new StringOrInlayHintLabelParts__from_lsproto(void 0, tsonicTypeScriptRuntime.location<RuntimeSlice<{
            value: InlayHintLabelPart__from_lsproto;
        } | undefined>>(inlayHintState.$go$private$ls$getInlayHintLabelParts(s, typeNode, idToSymbol)));
    }
    static $go$private$ls$visit(s: inlayHintState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (node === undefined || Node__from_ast.End(node) - Node__from_ast.Pos(node) === 0 || !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
            return false;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindModuleDeclaration$constant__from_ast():
            case KindClassDeclaration$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindClassExpression$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindArrowFunction$constant__from_ast(): {
                const __gotots_receiver_0 = (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx;
                if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined)) {
                    return true;
                }
                break;
            }
        }
        if (!(s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).span.Intersects(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)))) {
            return false;
        }
        if (IsTypeNode__from_ast(node) && !IsExpressionWithTypeArguments__from_ast(node)) {
            return false;
        }
        if (Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayVariableTypeHints) && IsVariableDeclaration__from_ast(node)) {
            inlayHintState.$go$private$ls$visitVariableLikeDeclaration(s, node);
        }
        else if (Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayPropertyDeclarationTypeHints) && IsPropertyDeclaration__from_ast(node)) {
            inlayHintState.$go$private$ls$visitVariableLikeDeclaration(s, node);
        }
        else if (Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayEnumMemberValueHints) && IsEnumMember__from_ast(node)) {
            inlayHintState.$go$private$ls$visitEnumMember(s, node);
        }
        else if (shouldShowParameterNameHints(InlayHintsPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences)) && (IsCallExpression__from_ast(node) || IsNewExpression__from_ast(node))) {
            inlayHintState.$go$private$ls$visitCallOrNewExpression(s, node);
        }
        else {
            if (Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayFunctionParameterTypeHints) && IsFunctionLikeDeclaration__from_ast(node) && HasContextSensitiveParameters__from_ast(node)) {
                inlayHintState.$go$private$ls$visitFunctionLikeForParameterType(s, node);
            }
            if (Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayFunctionLikeReturnTypeHints) && isSignatureSupportingReturnAnnotation(node)) {
                inlayHintState.$go$private$ls$visitFunctionDeclarationLikeForReturnType(s, node);
            }
        }
        const __gotots_receiver_2 = node;
        const __gotots_receiver_1 = s;
        const __gotots_argument_0 = new Visitor__from_ast(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return inlayHintState.$go$private$ls$visit(__gotots_receiver_1, $argument0);
        });
        return Node__from_ast.ForEachChild(__gotots_receiver_2, __gotots_argument_0);
    }
    static $go$private$ls$visitCallOrNewExpression(s: inlayHintState | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let args = Node__from_ast.Arguments(expr);
        if (args.length === 0) {
            return;
        }
        let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetResolvedSignature((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, expr);
        if (signature === undefined) {
            return;
        }
        let signatureParamPos = 0;
        const __gotots_range_1 = args;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let originalArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(originalArg);
            if (shouldShowLiteralParameterNameHintsOnly(InlayHintsPreferences__from_lsutil.$copy((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences)) && !isHintableLiteral(arg)) {
                signatureParamPos++;
                continue;
            }
            let spreadArgs = 0;
            if (IsSpreadElement__from_ast(arg)) {
                let spreadType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Node__from_ast.Expression(arg));
                if (Type__from_checker.IsTupleType(spreadType)) {
                    let elementFlags = TupleType__from_checker.ElementFlags(Type__from_checker.AsTupleType(Type__from_checker.Target(spreadType)));
                    let fixedLength = TupleType__from_checker.FixedLength(Type__from_checker.AsTupleType(Type__from_checker.Target(spreadType)));
                    if (fixedLength === 0) {
                        continue;
                    }
                    let firstOptionalIndex = IndexFunc$SliceOf_Named_checker$ElementFlags$Named_checker$ElementFlags(elementFlags, (f: ElementFlags__from_checker): bool => {
                        return (f & ElementFlagsRequired$constant__from_checker()) >>> 0 === 0;
                    });
                    let requiredArgs = IfElse$int(firstOptionalIndex < 0, fixedLength, firstOptionalIndex);
                    if (requiredArgs > 0) {
                        spreadArgs = requiredArgs;
                    }
                }
            }
            let identifierInfo: parameterInfo | undefined = inlayHintState.$go$private$ls$getParameterIdentifierInfoAtPosition(s, signature, signatureParamPos);
            signatureParamPos = signatureParamPos + IfElse$int(spreadArgs > 0, spreadArgs, 1);
            if (identifierInfo === undefined) {
                return;
            }
            let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (identifierInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parameter;
            let parameterName = (identifierInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name;
            let isFirstVariadicArgument = (identifierInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isRestParameter;
            let parameterNameNotSameAsArgument = Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayParameterNameHintsWhenArgumentMatchesName) || !identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName);
            if (!parameterNameNotSameAsArgument && !isFirstVariadicArgument) {
                continue;
            }
            if (inlayHintState.$go$private$ls$leadingCommentsContainsParameterName(s, arg, parameterName)) {
                continue;
            }
            inlayHintState.$go$private$ls$addParameterHints(s, parameterName, parameter, GetStartOfNode__from_astnav(originalArg, (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file, false), isFirstVariadicArgument);
        }
    }
    static $go$private$ls$visitEnumMember(s: inlayHintState | undefined, member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(Node__from_ast.Initializer(member) === undefined)) {
            return;
        }
        let enumValue: $goInterface$Interface_void | undefined = Checker__from_checker.GetConstantValue((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, member);
        if (!(enumValue === undefined)) {
            inlayHintState.$go$private$ls$addEnumMemberValueHints(s, AnyToString__from_evaluator(enumValue), Node__from_ast.End(member));
        }
    }
    static $go$private$ls$visitFunctionDeclarationLikeForReturnType(s: inlayHintState | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (IsArrowFunction__from_ast(decl)) {
            if (FindChildOfKind__from_astnav(decl, KindOpenParenToken$constant__from_ast(), (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).file) === undefined) {
                return;
            }
        }
        let typeAnnotation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(decl);
        if (!(typeAnnotation === undefined) || Node__from_ast.Body(decl) === undefined) {
            return;
        }
        let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetSignatureFromDeclaration((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, decl);
        if (signature === undefined) {
            return;
        }
        let typePredicate: {
            value: TypePredicate__from_checker;
        } | undefined = Checker__from_checker.GetTypePredicateOfSignature((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, signature);
        if (!(typePredicate === undefined) && !(TypePredicate__from_checker.Type(typePredicate) === undefined)) {
            let hintParts__shadow_1 = inlayHintState.$go$private$ls$typePredicateToInlayHintParts(s, typePredicate);
            inlayHintState.$go$private$ls$addTypeHints(s, StringOrInlayHintLabelParts__from_lsproto.$copy(hintParts__shadow_1), inlayHintState.$go$private$ls$getTypeAnnotationPosition(s, decl));
            return;
        }
        let returnType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetReturnTypeOfSignature((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, signature);
        if (isModuleReferenceType(returnType)) {
            return;
        }
        let hintParts = inlayHintState.$go$private$ls$typeToInlayHintParts(s, returnType);
        inlayHintState.$go$private$ls$addTypeHints(s, StringOrInlayHintLabelParts__from_lsproto.$copy(hintParts), inlayHintState.$go$private$ls$getTypeAnnotationPosition(s, decl));
    }
    static $go$private$ls$visitFunctionLikeForParameterType(s: inlayHintState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let signature: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined = Checker__from_checker.GetSignatureFromDeclaration((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, node);
        if (signature === undefined) {
            return;
        }
        let pos = 0;
        const __gotots_range_2 = Node__from_ast.Parameters(node);
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            if (isHintableDeclaration(param)) {
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
                if (IsThisParameter__from_ast(param)) {
                    __go_symbol = Signature__from_checker.ThisParameter(signature);
                }
                else {
                    __go_symbol = Signature__from_checker.Parameters(signature).get(pos);
                }
                inlayHintState.$go$private$ls$addParameterTypeHint(s, param, __go_symbol);
            }
            if (IsThisParameter__from_ast(param)) {
                continue;
            }
            pos++;
        }
    }
    static $go$private$ls$visitVariableLikeDeclaration(s: inlayHintState | undefined, decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (Node__from_ast.Initializer(decl) === undefined && !(IsPropertyDeclaration__from_ast(decl) && (Type__from_checker.Flags(Checker__from_checker.GetTypeAtLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, decl)) & TypeFlagsAny$constant__from_checker()) >>> 0 === 0) || IsBindingPattern__from_ast(Node__from_ast.Name(decl)) || (IsVariableDeclaration__from_ast(decl) && !isHintableDeclaration(decl))) {
            return;
        }
        let typeAnnotation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(decl);
        if (!(typeAnnotation === undefined)) {
            return;
        }
        let declarationType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, decl);
        if (isModuleReferenceType(declarationType)) {
            return;
        }
        let hintParts = inlayHintState.$go$private$ls$typeToInlayHintParts(s, declarationType);
        let hintText = "";
        if (!(hintParts.String === undefined)) {
            hintText =
                ((hintParts.String ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
        }
        else if (!(hintParts.InlayHintLabelParts === undefined)) {
            let b = named_strings.StringsBuilderOperations.$zero();
            const __gotots_range_0 = ((hintParts.InlayHintLabelParts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: InlayHintLabelPart__from_lsproto;
            } | undefined>>).value;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let part: {
                    value: InlayHintLabelPart__from_lsproto;
                } | undefined = __gotots_range_value_0;
                strings__from_gostdlib.Builder.WriteString(b, (part ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Value);
            }
            hintText = strings__from_gostdlib.Builder.String(b);
        }
        if (!Tristate_IsTrue__from_core((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferences.IncludeInlayVariableTypeHintsWhenTypeMatchesName) && !IsComputedPropertyName__from_ast(Node__from_ast.Name(decl)) && EquateStringCaseInsensitive__from_stringutil(Node__from_ast.Text(Node__from_ast.Name(decl)), hintText)) {
            return;
        }
        inlayHintState.$go$private$ls$addTypeHints(s, StringOrInlayHintLabelParts__from_lsproto.$copy(hintParts), Node__from_ast.End(Node__from_ast.Name(decl)));
    }
}
export function shouldShowParameterNameHints(preferences: InlayHintsPreferences__from_lsutil): bool {
    return (preferences.IncludeInlayParameterNameHints.$value === IncludeInlayParameterNameHintsLiterals$constant__from_lsutil().$value || preferences.IncludeInlayParameterNameHints.$value === IncludeInlayParameterNameHintsAll$constant__from_lsutil().$value);
}
export function shouldShowLiteralParameterNameHintsOnly(preferences: InlayHintsPreferences__from_lsutil): bool {
    return preferences.IncludeInlayParameterNameHints.$value === IncludeInlayParameterNameHintsLiterals$constant__from_lsutil().$value;
}
export function isSignatureSupportingReturnAnnotation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsArrowFunction__from_ast(node) || IsFunctionExpression__from_ast(node) || IsFunctionDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsGetAccessorDeclaration__from_ast(node);
}
export function isHintableDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if ((IsPartOfParameterDeclaration__from_ast(node) || IsVariableDeclaration__from_ast(node) && IsVarConst__from_ast(node)) && !(Node__from_ast.Initializer(node) === undefined)) {
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(Node__from_ast.Initializer(node));
        return !(isHintableLiteral(initializer) || IsNewExpression__from_ast(initializer) || IsObjectLiteralExpression__from_ast(initializer) || IsAssertionExpression__from_ast(initializer));
    }
    return true;
}
export function isHintableLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPrefixUnaryExpression$constant__from_ast(): {
            let operand: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
            return IsLiteralExpression__from_ast(operand) || IsIdentifier__from_ast(operand) && IsInfinityOrNaNString__from_ast(Node__from_ast.Text(operand));
            break;
        }
        case KindTrueKeyword$constant__from_ast():
        case KindFalseKeyword$constant__from_ast():
        case KindNullKeyword$constant__from_ast():
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindTemplateExpression$constant__from_ast(): {
            return true;
            break;
        }
        case KindIdentifier$constant__from_ast(): {
            let name = Node__from_ast.Text(node);
            return name === "undefined" || IsInfinityOrNaNString__from_ast(name);
            break;
        }
    }
    return IsLiteralExpression__from_ast(node);
}
export function isModuleReferenceType(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Type__from_checker.Symbol(t);
    return !(__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0);
}
export class parameterInfo {
    declare private readonly $goType: void;
    public constructor(public parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public name: gostring, public isRestParameter: bool) {
    }
    declare private readonly then?: never;
}
export function getParameterDeclarationIdentifier(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsParameterDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && IsIdentifier__from_ast(Node__from_ast.Name(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration))) {
        return Node__from_ast.Name(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
    }
    return void 0;
}
export function identifierOrAccessExpressionPostfixMatchesParameterName(expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parameterName: gostring): bool {
    if (IsIdentifier__from_ast(expr)) {
        return Node__from_ast.Text(expr) === parameterName;
    }
    if (IsPropertyAccessExpression__from_ast(expr)) {
        return Node__from_ast.Text(Node__from_ast.Name(expr)) === parameterName;
    }
    return false;
}
export function isAnyInlayHintEnabled(preferences: InlayHintsPreferences__from_lsutil): bool {
    return !(preferences.IncludeInlayParameterNameHints.$value === IncludeInlayParameterNameHintsNone$constant__from_lsutil().$value) || Tristate_IsTrue__from_core(preferences.IncludeInlayFunctionParameterTypeHints) || Tristate_IsTrue__from_core(preferences.IncludeInlayVariableTypeHints) || Tristate_IsTrue__from_core(preferences.IncludeInlayPropertyDeclarationTypeHints) || Tristate_IsTrue__from_core(preferences.IncludeInlayFunctionLikeReturnTypeHints) || Tristate_IsTrue__from_core(preferences.IncludeInlayEnumMemberValueHints);
}
