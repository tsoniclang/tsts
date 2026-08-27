import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Node as Node__from_ast } from "../ast/package.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { init } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/jsdoc.js";
import { PCArgumentExpressions$constant, PCArrayBindingElements$constant, PCArrayLiteralMembers$constant, PCBlockStatements$constant, PCClassMembers$constant, PCCount$constant, PCEnumMembers$constant, PCHeritageClauseElement$constant, PCHeritageClauses$constant, PCImportAttributes$constant, PCImportOrExportSpecifiers$constant, PCJSDocComment$constant, PCJSDocParameters$constant, PCJsxAttributes$constant, PCJsxChildren$constant, PCObjectBindingElements$constant, PCObjectLiteralMembers$constant, PCParameters$constant, PCRestProperties$constant, PCSourceElements$constant, PCSwitchClauseStatements$constant, PCSwitchClauses$constant, PCTupleElementTypes$constant, PCTypeArguments$constant, PCTypeMembers$constant, PCTypeParameters$constant, PCVariableDeclarations$constant, newParser } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/parser.js";
import { ParseFlagsAwait$constant, ParseFlagsIgnoreMissingOpenBrace$constant, ParseFlagsNone$constant, ParseFlagsType$constant, ParseFlagsYield$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/types.js";
import { $goInterfaceAdapter$PointerTo_Named_parser$Parser as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GetViableKeywordSuggestions as GetViableKeywordSuggestions__from_scanner } from "../scanner/package.js";
import { $state } from "./state.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    PCArgumentExpressions = PCArgumentExpressions$constant();
    PCArrayBindingElements = PCArrayBindingElements$constant();
    PCArrayLiteralMembers = PCArrayLiteralMembers$constant();
    PCBlockStatements = PCBlockStatements$constant();
    PCClassMembers = PCClassMembers$constant();
    PCCount = PCCount$constant();
    PCEnumMembers = PCEnumMembers$constant();
    PCHeritageClauseElement = PCHeritageClauseElement$constant();
    PCHeritageClauses = PCHeritageClauses$constant();
    PCImportAttributes = PCImportAttributes$constant();
    PCImportOrExportSpecifiers = PCImportOrExportSpecifiers$constant();
    PCJSDocComment = PCJSDocComment$constant();
    PCJSDocParameters = PCJSDocParameters$constant();
    PCJsxAttributes = PCJsxAttributes$constant();
    PCJsxChildren = PCJsxChildren$constant();
    PCObjectBindingElements = PCObjectBindingElements$constant();
    PCObjectLiteralMembers = PCObjectLiteralMembers$constant();
    PCParameters = PCParameters$constant();
    PCRestProperties = PCRestProperties$constant();
    PCSourceElements = PCSourceElements$constant();
    PCSwitchClauseStatements = PCSwitchClauseStatements$constant();
    PCSwitchClauses = PCSwitchClauses$constant();
    PCTupleElementTypes = PCTupleElementTypes$constant();
    PCTypeArguments = PCTypeArguments$constant();
    PCTypeMembers = PCTypeMembers$constant();
    PCTypeParameters = PCTypeParameters$constant();
    PCVariableDeclarations = PCVariableDeclarations$constant();
    ParseFlagsAwait = ParseFlagsAwait$constant();
    ParseFlagsIgnoreMissingOpenBrace = ParseFlagsIgnoreMissingOpenBrace$constant();
    ParseFlagsNone = ParseFlagsNone$constant();
    ParseFlagsType = ParseFlagsType$constant();
    ParseFlagsYield = ParseFlagsYield$constant();
    $state.missingListNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    $state.parserPool = named_sync.SyncPoolOperations.$zero();
    $state.viableKeywordSuggestions = RuntimeSlice.nil<gostring>();
    {
        $state.viableKeywordSuggestions = GetViableKeywordSuggestions__from_scanner();
    }
    {
        $state.missingListNodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1, void 0);
    }
    {
        const __gotots_field_0 = (): GoInterface | undefined => {
            return new GoInterfaceAdapter(newParser());
        };
        const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
        __gotots_struct_0.New = __gotots_field_0;
        $state.parserPool = __gotots_struct_0;
    }
    init();
}
export { JSDocInfo, JSDocInfo$Storage, PCArgumentExpressions$constant, PCArrayBindingElements$constant, PCArrayLiteralMembers$constant, PCBlockStatements$constant, PCClassMembers$constant, PCCount$constant, PCEnumMembers$constant, PCHeritageClauseElement$constant, PCHeritageClauses$constant, PCImportAttributes$constant, PCImportOrExportSpecifiers$constant, PCJSDocComment$constant, PCJSDocParameters$constant, PCJsxAttributes$constant, PCJsxChildren$constant, PCObjectBindingElements$constant, PCObjectLiteralMembers$constant, PCParameters$constant, PCRestProperties$constant, PCSourceElements$constant, PCSwitchClauseStatements$constant, PCSwitchClauses$constant, PCTupleElementTypes$constant, PCTypeArguments$constant, PCTypeMembers$constant, PCTypeParameters$constant, PCVariableDeclarations$constant, ParseIsolatedEntityName, ParseSourceFile, Parser, ParserState, ParsingContext, ParsingContexts } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/parser.js";
export { ParseFlags, ParseFlagsAwait$constant, ParseFlagsIgnoreMissingOpenBrace$constant, ParseFlagsNone$constant, ParseFlagsType$constant, ParseFlagsYield$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/types.js";
export { GetJSDocCommentRanges } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/parser/utilities.js";
export let PCArgumentExpressions: ReturnType<typeof PCArgumentExpressions$constant>;
export let PCArrayBindingElements: ReturnType<typeof PCArrayBindingElements$constant>;
export let PCArrayLiteralMembers: ReturnType<typeof PCArrayLiteralMembers$constant>;
export let PCBlockStatements: ReturnType<typeof PCBlockStatements$constant>;
export let PCClassMembers: ReturnType<typeof PCClassMembers$constant>;
export let PCCount: ReturnType<typeof PCCount$constant>;
export let PCEnumMembers: ReturnType<typeof PCEnumMembers$constant>;
export let PCHeritageClauseElement: ReturnType<typeof PCHeritageClauseElement$constant>;
export let PCHeritageClauses: ReturnType<typeof PCHeritageClauses$constant>;
export let PCImportAttributes: ReturnType<typeof PCImportAttributes$constant>;
export let PCImportOrExportSpecifiers: ReturnType<typeof PCImportOrExportSpecifiers$constant>;
export let PCJSDocComment: ReturnType<typeof PCJSDocComment$constant>;
export let PCJSDocParameters: ReturnType<typeof PCJSDocParameters$constant>;
export let PCJsxAttributes: ReturnType<typeof PCJsxAttributes$constant>;
export let PCJsxChildren: ReturnType<typeof PCJsxChildren$constant>;
export let PCObjectBindingElements: ReturnType<typeof PCObjectBindingElements$constant>;
export let PCObjectLiteralMembers: ReturnType<typeof PCObjectLiteralMembers$constant>;
export let PCParameters: ReturnType<typeof PCParameters$constant>;
export let PCRestProperties: ReturnType<typeof PCRestProperties$constant>;
export let PCSourceElements: ReturnType<typeof PCSourceElements$constant>;
export let PCSwitchClauseStatements: ReturnType<typeof PCSwitchClauseStatements$constant>;
export let PCSwitchClauses: ReturnType<typeof PCSwitchClauses$constant>;
export let PCTupleElementTypes: ReturnType<typeof PCTupleElementTypes$constant>;
export let PCTypeArguments: ReturnType<typeof PCTypeArguments$constant>;
export let PCTypeMembers: ReturnType<typeof PCTypeMembers$constant>;
export let PCTypeParameters: ReturnType<typeof PCTypeParameters$constant>;
export let PCVariableDeclarations: ReturnType<typeof PCVariableDeclarations$constant>;
export let ParseFlagsAwait: ReturnType<typeof ParseFlagsAwait$constant>;
export let ParseFlagsIgnoreMissingOpenBrace: ReturnType<typeof ParseFlagsIgnoreMissingOpenBrace$constant>;
export let ParseFlagsNone: ReturnType<typeof ParseFlagsNone$constant>;
export let ParseFlagsType: ReturnType<typeof ParseFlagsType$constant>;
export let ParseFlagsYield: ReturnType<typeof ParseFlagsYield$constant>;
