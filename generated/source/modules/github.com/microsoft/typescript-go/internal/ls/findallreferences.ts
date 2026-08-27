import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportDeclaration as ExportDeclaration__from_ast, FileReference as FileReference__from_ast, Kind as Kind__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SemanticMeaning as SemanticMeaning__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { TextPos as TextPos__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { DocumentUri as DocumentUri__from_lsproto, HasTextDocumentPosition as HasTextDocumentPosition__from_lsproto, Location as Location__from_lsproto, VSClassifiedTextElement as VSClassifiedTextElement__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ImpExpKind, ImportExportSymbol, ImportsResult } from "./importTracker.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BinaryExpression as BinaryExpression__from_ast, CanHaveSymbol as CanHaveSymbol__from_ast, CheckFlagsSynthetic$constant as CheckFlagsSynthetic$constant__from_ast, ClimbPastPropertyAccess as ClimbPastPropertyAccess__from_ast, ExportSpecifier as ExportSpecifier__from_ast, FindAncestorKind as FindAncestorKind__from_ast, FindAncestor as FindAncestor__from_ast, ForEachReturnStatement as ForEachReturnStatement__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetDeclarationFromName as GetDeclarationFromName__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, GetMeaningFromDeclaration as GetMeaningFromDeclaration__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, GetSuperContainer as GetSuperContainer__from_ast, GetThisContainer as GetThisContainer__from_ast, HasInitializer as HasInitializer__from_ast, HasModifier as HasModifier__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, InternalSymbolNameConstructor$string as InternalSymbolNameConstructor$string__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsArrayLiteralOrObjectLiteralDestructuringPattern as IsArrayLiteralOrObjectLiteralDestructuringPattern__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindableObjectDefinePropertyCall as IsBindableObjectDefinePropertyCall__from_ast, IsCallExpressionTarget as IsCallExpressionTarget__from_ast, IsCallExpression as IsCallExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsDeclarationName as IsDeclarationName__from_ast, IsDeclaration as IsDeclaration__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportSpecifier as IsExportSpecifier__from_ast, IsExternalModule as IsExternalModule__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsForInOrOfStatement as IsForInOrOfStatement__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportMeta as IsImportMeta__from_ast, IsImportOrExportSpecifier as IsImportOrExportSpecifier__from_ast, IsInJSFile as IsInJSFile__from_ast, IsJSDocTag as IsJSDocTag__from_ast, IsLiteralComputedPropertyDeclarationName as IsLiteralComputedPropertyDeclarationName__from_ast, IsNewExpressionTarget as IsNewExpressionTarget__from_ast, IsObjectLiteralMethod as IsObjectLiteralMethod__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsPrivateIdentifierClassElementDeclaration as IsPrivateIdentifierClassElementDeclaration__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsSatisfiesExpression as IsSatisfiesExpression__from_ast, IsStatement as IsStatement__from_ast, IsStatic as IsStatic__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsTypeElement as IsTypeElement__from_ast, IsTypeNode as IsTypeNode__from_ast, IsVariableDeclarationInitializedToBareOrAccessedRequire as IsVariableDeclarationInitializedToBareOrAccessedRequire__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableStatement as IsVariableStatement__from_ast, JSDeclarationKindNone$constant as JSDeclarationKindNone$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorKeyword$constant as KindConstructorKeyword$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, Kind_String as Kind_String__from_ast, ModifierFlagsExportDefault$constant as ModifierFlagsExportDefault$constant__from_ast, ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, ModuleExportNameIsDefault as ModuleExportNameIsDefault__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SemanticMeaningAll$constant as SemanticMeaningAll$constant__from_ast, SemanticMeaningValue$constant as SemanticMeaningValue$constant__from_ast, SourceFile as SourceFile__from_ast, SubtreeContainsJsx$constant as SubtreeContainsJsx$constant__from_ast, SymbolFlagsClassMember$constant as SymbolFlagsClassMember$constant__from_ast, SymbolFlagsFunctionScopedVariable$constant as SymbolFlagsFunctionScopedVariable$constant__from_ast, SymbolFlagsTransient$constant as SymbolFlagsTransient$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolName as SymbolName__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TryGetClassExtendingExpressionWithTypeArguments as TryGetClassExtendingExpressionWithTypeArguments__from_ast, TryGetImportFromModuleSpecifier as TryGetImportFromModuleSpecifier__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, GetTouchingPropertyName as GetTouchingPropertyName__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { GetLocalSymbolForExportDefault as GetLocalSymbolForExportDefault__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { Checker as Checker__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, EmitResolver as EmitResolver__from_checker, IsExternalModuleSymbol as IsExternalModuleSymbol__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewTextRange as NewTextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { Position as Position__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, IsIdentifierPart as IsIdentifierPart__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { StripQuotes as StripQuotes__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { Set$AddIfAbsent$PointerTo_Named_ast$Node, Set$AddIfAbsent$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Coalesce$PointerTo_Named_ast$Symbol$Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Coalesce.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Symbol, FirstNonNil$PointerTo_Named_ls$ReferenceEntry$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstNonNil.js";
import { FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$Node, FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ls$ReferenceEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FlatMap.js";
import { IfElse$PointerTo_Named_ast$Node, IfElse$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry, MapNonNil$int$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { OrElse$PointerTo_Named_ast$Node, OrElse$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/OrElse.js";
import { Some$PointerTo_Named_ast$Node, Some$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Contains$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile, Contains$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_PointerTo_Named_collections$SetOf_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_ls$SymbolAndEntries, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_Named_ls$inheritKey_To_bool as GoMap } from "../../../../../../support/maps.js";
import { ExportInfo, ExportKindDefault$constant, ExportKindNamed$constant, ImpExpKindExport$constant, ImpExpKindImport$constant, ImpExpKindUnknown$constant, ImportTracker, LocationAndSymbol, createImportTracker, getExportInfo, getImportOrExportSymbol } from "./importTracker.js";
import { getAllSuperTypeNodes, getContainerNode, getContainingNodeIfInHeritageClause, getContainingObjectLiteralElement, getIntersectingMeaningFromDeclarations, getLocalSymbolForExportSpecifier, getMeaningFromLocation, getNonModuleSymbolOfMergedModuleSymbol, getParentSymbolsOfPropertyAccess, getPropertySymbolFromBindingElement, getPropertySymbolOfObjectBindingPatternWithoutPropertyName, getPropertySymbolsFromBaseTypes, getTargetLabel, isExpressionOfExternalModuleImportEqualsDeclaration, isImplementation, isImplementationExpression, isJumpStatementTarget, isLabelOfLabeledStatement, isLiteralNameOfPropertyDeclarationOrIndexAccess, isNameOfModuleDeclaration, isObjectBindingElementWithoutPropertyName, isReadonlyTypeOperator, isSourceFileWithGlobalExports, isStaticSymbol, isThis, isTypeKeyword } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class referenceUse {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function referenceUseNone$constant(): referenceUse {
    return new referenceUse(0);
}
export function referenceUseReferences$constant(): referenceUse {
    return new referenceUse(2);
}
export function referenceUseRename$constant(): referenceUse {
    return new referenceUse(3);
}
export class refOptions {
    declare private readonly $goType: void;
    public constructor(public findInStrings: bool, public findInComments: bool, public use: referenceUse, public implementations: bool, public useAliasesForRename: bool) {
    }
    static $zero(): refOptions {
        return new refOptions(false, false, new referenceUse(0), false, false);
    }
    static $copy($source: refOptions): refOptions {
        return new refOptions($source.findInStrings, $source.findInComments, $source.use, $source.implementations, $source.useAliasesForRename);
    }
    declare private readonly then?: never;
}
export class refInfo {
    declare private readonly $goType: void;
    public constructor(public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public fileName: gostring, public reference: {
        value: FileReference__from_ast;
    } | undefined, public unverified: bool) {
    }
    declare private readonly then?: never;
}
export class SymbolAndEntries {
    declare private readonly $goType: void;
    public constructor(public definition: Definition | undefined, public references: RuntimeSlice<ReferenceEntry | undefined>) {
    }
    declare private readonly then?: never;
    static DefinitionNode(s: SymbolAndEntries | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition === undefined) {
            return void 0;
        }
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node === undefined)) {
            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node;
        }
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol === undefined) && Symbol__from_ast.$storageOf(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
            return Symbol__from_ast.$storageOf(((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
        }
        return void 0;
    }
    static DefinitionSymbol(s: SymbolAndEntries | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        if ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition === undefined) {
            return void 0;
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol;
    }
    static References(s: SymbolAndEntries | undefined): RuntimeSlice<ReferenceEntry | undefined> {
        return (s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).references;
    }
    static $go$private$ls$canUseDefinitionSymbol(entry: SymbolAndEntries | undefined): bool {
        if ((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition === undefined) {
            return false;
        }
        switch (((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind.$value) {
            case 0:
            case 3: {
                return !(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).definition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol === undefined);
                break;
            }
            case 5: {
                return false;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
}
export function NewSymbolAndEntries(kind: DefinitionKind, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, references: RuntimeSlice<ReferenceEntry | undefined>): SymbolAndEntries | undefined {
    return new SymbolAndEntries(new Definition(kind, __go_symbol, node, void 0), references);
}
export class DefinitionKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function definitionKindSymbol$constant(): DefinitionKind {
    return new DefinitionKind(0);
}
export function definitionKindLabel$constant(): DefinitionKind {
    return new DefinitionKind(1);
}
export function definitionKindKeyword$constant(): DefinitionKind {
    return new DefinitionKind(2);
}
export function definitionKindThis$constant(): DefinitionKind {
    return new DefinitionKind(3);
}
export function definitionKindString$constant(): DefinitionKind {
    return new DefinitionKind(4);
}
export function definitionKindTripleSlashReference$constant(): DefinitionKind {
    return new DefinitionKind(5);
}
export class Definition {
    declare private readonly $goType: void;
    public constructor(public Kind: DefinitionKind, public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public tripleSlashFileRef: tripleSlashDefinition | undefined) {
    }
    declare private readonly then?: never;
}
export class tripleSlashDefinition {
    declare private readonly $goType: void;
    public constructor(public reference: {
        value: FileReference__from_ast;
    } | undefined, public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export class entryKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function entryKindNone$constant(): entryKind {
    return new entryKind(0);
}
export function entryKindRange$constant(): entryKind {
    return new entryKind(1);
}
export function entryKindNode$constant(): entryKind {
    return new entryKind(2);
}
export function entryKindStringLiteral$constant(): entryKind {
    return new entryKind(3);
}
export function entryKindSearchedLocalFoundProperty$constant(): entryKind {
    return new entryKind(4);
}
export function entryKindSearchedPropertyFoundLocal$constant(): entryKind {
    return new entryKind(5);
}
export class ReferenceEntry {
    declare private readonly $goType: void;
    public constructor(public kind: entryKind, public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public context: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public fileName: gostring, public textRange: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, public lspRange: tsonicTypeScriptRuntime.Location<Location__from_lsproto> | undefined) {
    }
    declare private readonly then?: never;
    static IsNodeEntry(e: ReferenceEntry | undefined): bool {
        return !((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node === undefined);
    }
    static Node(e: ReferenceEntry | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node;
    }
}
export function newNodeEntryWithKind(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: entryKind): ReferenceEntry | undefined {
    let e: ReferenceEntry | undefined = newNodeEntry(node);
    (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind = kind;
    return e;
}
export function newNodeEntry(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ReferenceEntry | undefined {
    return new ReferenceEntry(entryKindNode$constant(), OrElse$PointerTo_Named_ast$Node(Node__from_ast.Name(node), node), getContextNodeForNodeEntry(node), "", void 0, void 0);
}
export function getContextNodeForNodeEntry(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsDeclaration__from_ast(node)) {
        return getContextNode(node);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return void 0;
    }
    if (!IsDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsExportAssignment__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        if (IsInJSFile__from_ast(node)) {
            let binaryExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (IsBinaryExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                binaryExpression = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            else if (IsAccessExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsBinaryExpression__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
                tsonicTypeScriptRuntime.sameLocation(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                binaryExpression = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            if (!(binaryExpression === undefined) && !(GetAssignmentDeclarationKind__from_ast(binaryExpression).$value === JSDeclarationKindNone$constant__from_ast().$value)) {
                return getContextNode(binaryExpression);
            }
        }
        switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindJsxOpeningElement$constant__from_ast():
            case KindJsxClosingElement$constant__from_ast(): {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                break;
            }
            case KindJsxSelfClosingElement$constant__from_ast():
            case KindLabeledStatement$constant__from_ast():
            case KindBreakStatement$constant__from_ast():
            case KindContinueStatement$constant__from_ast(): {
                return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                break;
            }
            case KindStringLiteral$constant__from_ast():
            case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                {
                    let validImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetImportFromModuleSpecifier__from_ast(node);
                    if (!(validImport === undefined)) {
                        let declOrStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(validImport, ($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                            return IsDeclaration__from_ast(node) || IsStatement__from_ast(node) || IsJSDocTag__from_ast(node);
                        });
                        if (IsDeclaration__from_ast(declOrStatement)) {
                            return getContextNode(declOrStatement);
                        }
                        return declOrStatement;
                    }
                }
                break;
            }
        }
        let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsComputedPropertyName__from_ast);
        if (!(propertyName === undefined)) {
            return getContextNode(Node__from_ast.$storageOf(((propertyName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
        return void 0;
    }
    if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)
        || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructor$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast() || ((IsImportOrExportSpecifier__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBindingElement$constant__from_ast()) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.PropertyName(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) || (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast() && HasSyntacticModifier__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ModifierFlagsExportDefault$constant__from_ast()))) {
        return getContextNode(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    return void 0;
}
export function getContextNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableDeclaration$constant__from_ast(): {
            if (!IsVariableDeclarationList__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 1) {
                return node;
            }
            else if (IsVariableStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            else if (IsForInOrOfStatement__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return getContextNode(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindBindingElement$constant__from_ast(): {
            return getContextNode(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindExportSpecifier$constant__from_ast():
        case KindNamespaceImport$constant__from_ast(): {
            return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindImportClause$constant__from_ast():
        case KindNamespaceExport$constant__from_ast(): {
            return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            return IfElse$PointerTo_Named_ast$Node(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExpressionStatement$constant__from_ast(), Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, node);
            break;
        }
        case KindForOfStatement$constant__from_ast():
        case KindForInStatement$constant__from_ast(): {
            return void 0;
            break;
        }
        case KindPropertyAssignment$constant__from_ast():
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            if (IsArrayLiteralOrObjectLiteralDestructuringPattern__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return getContextNode(FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return Node__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast() || IsForInOrOfStatement__from_ast(node__shadow_1);
                }));
            }
            return node;
            break;
        }
        case KindSwitchStatement$constant__from_ast(): {
            return void 0;
            break;
        }
        default: {
            return node;
            break;
        }
    }
}
export function getRangeOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, endNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    if (sourceFile === undefined) {
        sourceFile = GetSourceFileOfNode__from_ast(node);
    }
    let start = GetTokenPosOfNode__from_scanner(node, sourceFile, false);
    let end = Node__from_ast.End(IfElse$PointerTo_Named_ast$Node(!(endNode === undefined), endNode, node));
    if (IsStringLiteralLike__from_ast(node) && (end - start) > 2) {
        if (!(endNode === undefined)) {
            const __gotots_argument_73 = new GoInterfaceAdapter("endNode is not nil for stringLiteralLike");
            GoPanic.raise(__gotots_argument_73 === undefined ? GoPanicNilValue.create() : __gotots_argument_73);
        }
        start += 1;
        end = end - 1;
    }
    if (!(endNode === undefined) && Node__from_ast.$storageOf(((endNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCaseBlock$constant__from_ast()) {
        end = Node__from_ast.Pos(endNode);
    }
    return NewTextRange__from_core(start, end);
}
export function isValidReferencePosition(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, searchSymbolName: gostring): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPrivateIdentifier$constant__from_ast(): {
            return Node__from_ast.Text(node).length === searchSymbolName.length;
            break;
        }
        case KindIdentifier$constant__from_ast(): {
            return Node__from_ast.Text(node).length === searchSymbolName.length;
            break;
        }
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindStringLiteral$constant__from_ast(): {
            return Node__from_ast.Text(node).length === searchSymbolName.length && (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) || isNameOfModuleDeclaration(node) || isExpressionOfExternalModuleImportEqualsDeclaration(node) || IsCallExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsBindableObjectDefinePropertyCall__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
                tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Arguments(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent).get(1), node) || IsImportOrExportSpecifier__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
            break;
        }
        case KindNumericLiteral$constant__from_ast(): {
            return isLiteralNameOfPropertyDeclarationOrIndexAccess(node) && Node__from_ast.Text(node).length === searchSymbolName.length;
            break;
        }
        case KindDefaultKeyword$constant__from_ast(): {
            return 7 === searchSymbolName.length;
            break;
        }
    }
    return false;
}
export function isForRenameWithPrefixAndSuffixText(options: refOptions): bool {
    return options.use.$value === referenceUseRename$constant().$value && options.useAliasesForRename;
}
export function skipPastExportOrImportSpecifierOrUnion(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, useLocalSymbolForExportSpecifier: bool): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportSpecifier$constant__from_ast() && useLocalSymbolForExportSpecifier) {
        return getLocalSymbolForExportSpecifier(node, __go_symbol, Node__from_ast.AsExportSpecifier(parent), checker__shadow_1);
    }
    return FirstNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Symbol(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
            if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (167772160)) >>> 0 === 0)) {
                return void 0;
            }
            const __gotots_argument_20 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unexpected symbol at %s: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)), new GoInterfaceAdapter(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name)])));
            GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
        }
        if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeLiteral$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindUnionType$constant__from_ast()) {
            return Checker__from_checker.GetPropertyOfType(checker__shadow_1, Checker__from_checker.GetTypeFromTypeNode(checker__shadow_1, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
        }
        return void 0;
    });
}
export function getSymbolScope(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let valueDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    if (!(valueDeclaration === undefined) && (Node__from_ast.$storageOf(((valueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast() || Node__from_ast.$storageOf(((valueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassExpression$constant__from_ast())) {
        return valueDeclaration;
    }
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0) {
        return void 0;
    }
    let declarations = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (8196)) >>> 0 === 0)) {
        let privateDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return HasModifier__from_ast(d, ModifierFlagsPrivate$constant__from_ast()) || IsPrivateIdentifierClassElementDeclaration__from_ast(d);
        });
        if (!(privateDeclaration === undefined)) {
            return FindAncestorKind__from_ast(privateDeclaration, KindClassDeclaration$constant__from_ast());
        }
        return void 0;
    }
    if (Some$PointerTo_Named_ast$Node(declarations, isObjectBindingElementWithoutPropertyName)) {
        return void 0;
    }
    let exposedByParent = !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0;
    if (exposedByParent && !(IsExternalModuleSymbol__from_checker(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent) && !isSourceFileWithGlobalExports(Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration))) {
        return void 0;
    }
    let scope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    const __gotots_range_7 = declarations;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_7;
        let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainerNode(declaration);
        if (!(scope === undefined) && !tsonicTypeScriptRuntime.sameLocation(scope, container)) {
            return void 0;
        }
        if (container === undefined || (Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() && !IsExternalOrCommonJSModule__from_ast(Node__from_ast.AsSourceFile(container)))) {
            return void 0;
        }
        scope = container;
    }
    if (exposedByParent) {
        const __gotots_store_10 = NodeBase__from_ast.$storageOf(((GetSourceFileOfNode__from_ast(scope) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
    }
    return scope;
}
export class position {
    declare private readonly $goType: void;
    public constructor(public uri: DocumentUri__from_lsproto, public pos: Position__from_lsproto) {
    }
    declare private readonly then?: never;
    static TextDocumentPosition(nld: tsonicTypeScriptRuntime.Location<position> | undefined): Position__from_lsproto {
        return Position__from_lsproto.$copy(((nld ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<position>).value.pos);
    }
    static TextDocumentURI(nld: tsonicTypeScriptRuntime.Location<position> | undefined): DocumentUri__from_lsproto {
        return ((nld ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<position>).value.uri;
    }
}
export class nonLocalDefinition {
    declare private readonly $goType: void;
    public constructor(public position: position, public GetSourcePosition: (() => HasTextDocumentPosition__from_lsproto | undefined) | undefined, public GetGeneratedPosition: (() => HasTextDocumentPosition__from_lsproto | undefined) | undefined) {
    }
    declare private readonly then?: never;
}
export function getFileAndStartPosFromDeclaration(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
    tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined,
    TextPos__from_core
] {
    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(declaration);
    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = OrElse$PointerTo_Named_ast$Node(GetNameOfDeclaration__from_ast(declaration), declaration);
    let textRange = getRangeOfNode(name, file, void 0);
    return [file, textRange.Pos() | 0];
}
export function isDefinitionVisible(emitResolver: {
    value: EmitResolver__from_checker;
} | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (EmitResolver__from_checker.IsDeclarationVisible(emitResolver, declaration)) {
        return true;
    }
    if (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return false;
    }
    if (HasInitializer__from_ast(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), declaration)) {
        return isDefinitionVisible(emitResolver, Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    {
        const __gotots_switch_tag_1 = Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_1 = -1;
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_1 === KindPropertyDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_1 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_1 === KindSetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_1 === KindMethodDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_1 = 0;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindPropertyAssignment$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindShorthandPropertyAssignment$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindObjectLiteralExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindClassExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindArrowFunction$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_1 === KindFunctionExpression$constant__from_ast();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_1 = 1;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            __gotots_switch_selection_1 = 2;
        }
        __gotots_control_target_1: {
            if (__gotots_switch_selection_1 === 0) {
                if (HasModifier__from_ast(declaration, ModifierFlagsPrivate$constant__from_ast()) || IsPrivateIdentifier__from_ast(Node__from_ast.Name(declaration))) {
                    return false;
                }
                __gotots_switch_selection_1 = 1;
            }
            if (__gotots_switch_selection_1 === 1) {
                return isDefinitionVisible(emitResolver, Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                break __gotots_control_target_1;
            }
            if (__gotots_switch_selection_1 === 2) {
                return false;
                break __gotots_control_target_1;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export class symbolEntryTransformOptions {
    declare private readonly $goType: void;
    public constructor(public requireLocationsResult: bool, public dropOriginNodes: bool) {
    }
    static $copy($source: symbolEntryTransformOptions): symbolEntryTransformOptions {
        return new symbolEntryTransformOptions($source.requireLocationsResult, $source.dropOriginNodes);
    }
    declare private readonly then?: never;
}
export class SymbolAndEntriesData {
    declare private readonly $goType: void;
    public constructor(public OriginalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public SymbolsAndEntries: RuntimeSlice<SymbolAndEntries | undefined>, public Position: int) {
    }
    static $copy($source: SymbolAndEntriesData): SymbolAndEntriesData {
        return new SymbolAndEntriesData($source.OriginalNode, $source.SymbolsAndEntries, $source.Position);
    }
    declare private readonly then?: never;
}
export class referencedSymbolDefinitionInfo {
    declare private readonly $goType: void;
    public constructor(public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public location: Location__from_lsproto, public displayText: {
        value: VSClassifiedTextElement__from_lsproto;
    } | undefined) {
    }
    declare private readonly then?: never;
}
export function isDeclarationOfSymbol(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (node === undefined || target === undefined) {
        return false;
    }
    let source: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    {
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationFromName__from_ast(node);
        if (!(decl === undefined)) {
            source = decl;
        }
        else if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast()) {
            source = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        else if (IsLiteralComputedPropertyDeclarationName__from_ast(node)) {
            source = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        else if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructorKeyword$constant__from_ast() && IsConstructorDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            source = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
    }
    return !(source === undefined) && Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation(decl, source);
    });
}
export type SignatureUsage$Storage = {
    Name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    Call: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class SignatureUsage {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SignatureUsage$Storage) {
    }
    public static $storageOf($source: SignatureUsage): SignatureUsage$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: SignatureUsage$Storage): SignatureUsage {
        return new SignatureUsage($source);
    }
    public get Name(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.Name;
    }
    public set Name($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.Name = $value;
    }
    public get Call(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.Call;
    }
    public set Call($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.Call = $value;
    }
    static $zero(): SignatureUsage {
        return new SignatureUsage({
            Name: void 0,
            Call: void 0
        });
    }
    static $copy($source: SignatureUsage): SignatureUsage {
        return new SignatureUsage({
            Name: $source.$storage.Name,
            Call: $source.$storage.Call
        });
    }
    declare private readonly then?: never;
}
export function isStringLiteralPropertyReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    if (IsPropertySignatureDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return !(Checker__from_checker.GetPropertyOfType(checker__shadow_1, Checker__from_checker.GetTypeAtLocation(checker__shadow_1, Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), Node__from_ast.Text(node)) === undefined);
    }
    return false;
}
export function getReferencedSymbolsSpecial(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<SymbolAndEntries | undefined> {
    if (isTypeKeyword(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVoidKeyword$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVoidExpression$constant__from_ast()) {
            return RuntimeSlice.nil<SymbolAndEntries | undefined>();
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindReadonlyKeyword$constant__from_ast() && !isReadonlyTypeOperator(node)) {
            return RuntimeSlice.nil<SymbolAndEntries | undefined>();
        }
        return getAllReferencesForKeyword(sourceFiles, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindReadonlyKeyword$constant__from_ast());
    }
    if (IsImportMeta__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) {
        return getAllReferencesForImportMeta(sourceFiles);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStaticKeyword$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassStaticBlockDeclaration$constant__from_ast()) {
        return RuntimeSlice.literal<SymbolAndEntries | undefined>([new SymbolAndEntries(new Definition(definitionKindKeyword$constant(), void 0, node, void 0), RuntimeSlice.literal<ReferenceEntry | undefined>([newNodeEntry(node)])),]);
    }
    if (isJumpStatementTarget(node)) {
        {
            let labelDefinition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getTargetLabel(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, Node__from_ast.Text(node));
            if (!(labelDefinition === undefined)) {
                return getLabelReferencesInNode(Node__from_ast.$storageOf(((labelDefinition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, labelDefinition);
            }
        }
        return RuntimeSlice.nil<SymbolAndEntries | undefined>();
    }
    if (isLabelOfLabeledStatement(node)) {
        return getLabelReferencesInNode(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, node);
    }
    if (isThis(node)) {
        return getReferencesForThisKeyword(node, sourceFiles);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
        return getReferencesForSuperKeyword(node);
    }
    return RuntimeSlice.nil<SymbolAndEntries | undefined>();
}
export function getLabelReferencesInNode(container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, targetLabel: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<SymbolAndEntries | undefined> {
    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(container);
    let labelName = Node__from_ast.Text(targetLabel);
    let references = MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry(getPossibleSymbolReferenceNodes(sourceFile, labelName, container), (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ReferenceEntry | undefined => {
        if (tsonicTypeScriptRuntime.sameLocation(node, Node__from_ast.AsNode(targetLabel))
            || (isJumpStatementTarget(node) &&
                tsonicTypeScriptRuntime.sameLocation(getTargetLabel(node, labelName), targetLabel))) {
            return newNodeEntry(node);
        }
        return void 0;
    });
    return RuntimeSlice.literal<SymbolAndEntries | undefined>([NewSymbolAndEntries(definitionKindLabel$constant(), targetLabel, void 0, references)]);
}
export function getReferencesForThisKeyword(thisOrSuperKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<SymbolAndEntries | undefined> {
    let searchSpaceNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetThisContainer__from_ast(thisOrSuperKeyword, false, false);
    let staticFlag = ModifierFlagsStatic$constant__from_ast();
    let isParameterName: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast() &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
    };
    switch (Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            if ((Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodSignature$constant__from_ast()) && IsObjectLiteralMethod__from_ast(searchSpaceNode)) {
                staticFlag = (staticFlag & Node__from_ast.ModifierFlags(searchSpaceNode)) >>> 0;
                searchSpaceNode = Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                break;
            }
            staticFlag = (staticFlag & Node__from_ast.ModifierFlags(searchSpaceNode)) >>> 0;
            searchSpaceNode = Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        case KindSourceFile$constant__from_ast(): {
            let __gotots_logical_result_0 = IsExternalModule__from_ast(Node__from_ast.AsSourceFile(searchSpaceNode));
            if (!__gotots_logical_result_0) {
                const __gotots_callee_0 = isParameterName;
                const __gotots_argument_10 = thisOrSuperKeyword;
                __gotots_logical_result_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
            }
            if (__gotots_logical_result_0) {
                return RuntimeSlice.nil<SymbolAndEntries | undefined>();
            }
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast(): {
            break;
        }
        default: {
            return RuntimeSlice.nil<SymbolAndEntries | undefined>();
            break;
        }
    }
    let filesToSearch = sourceFiles;
    if (!(Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast())) {
        filesToSearch = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>([GetSourceFileOfNode__from_ast(searchSpaceNode)]);
    }
    let references = Map$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry(FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$Node(filesToSearch, (sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        const __gotots_argument_14 = sourceFile;
        const __gotots_argument_15 = "this";
        const __gotots_argument_11 = Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast();
        const __gotots_store_2 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_12 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_13 = searchSpaceNode;
        const __gotots_argument_16 = IfElse$PointerTo_Named_ast$Node(__gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
        const __gotots_argument_18 = getPossibleSymbolReferenceNodes(__gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
        const __gotots_argument_19 = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            if (!isThis(node)) {
                return false;
            }
            let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetThisContainer__from_ast(node, false, false);
            if (!CanHaveSymbol__from_ast(container)) {
                return false;
            }
            switch (Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindFunctionExpression$constant__from_ast():
                case KindFunctionDeclaration$constant__from_ast(): {
                    return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Symbol(searchSpaceNode), Node__from_ast.Symbol(container));
                    break;
                }
                case KindMethodDeclaration$constant__from_ast():
                case KindMethodSignature$constant__from_ast(): {
                    return IsObjectLiteralMethod__from_ast(searchSpaceNode) &&
                        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Symbol(searchSpaceNode), Node__from_ast.Symbol(container));
                    break;
                }
                case KindClassExpression$constant__from_ast():
                case KindClassDeclaration$constant__from_ast():
                case KindObjectLiteralExpression$constant__from_ast(): {
                    return !(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && CanHaveSymbol__from_ast(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
                        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Symbol(searchSpaceNode), Node__from_ast.Symbol(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) && IsStatic__from_ast(container) === (!(staticFlag === ModifierFlagsNone$constant__from_ast()));
                    break;
                }
                case KindSourceFile$constant__from_ast(): {
                    let __gotots_logical_result_1 = Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() && !IsExternalModule__from_ast(Node__from_ast.AsSourceFile(container));
                    if (__gotots_logical_result_1) {
                        const __gotots_callee_1 = isParameterName;
                        const __gotots_argument_17 = node;
                        __gotots_logical_result_1 = !(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17);
                    }
                    return __gotots_logical_result_1;
                    break;
                }
            }
            return false;
        };
        return Filter$PointerTo_Named_ast$Node(__gotots_argument_18, __gotots_argument_19);
    }), (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ReferenceEntry | undefined => {
        return newNodeEntry(n);
    });
    let thisParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstNonNil$PointerTo_Named_ls$ReferenceEntry$PointerTo_Named_ast$Node(references, (ref: ReferenceEntry | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf((((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
            return (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node;
        }
        return void 0;
    });
    if (thisParameter === undefined) {
        thisParameter = thisOrSuperKeyword;
    }
    return RuntimeSlice.literal<SymbolAndEntries | undefined>([NewSymbolAndEntries(definitionKindThis$constant(), thisParameter, Node__from_ast.Symbol(searchSpaceNode), references)]);
}
export function getReferencesForSuperKeyword(superKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<SymbolAndEntries | undefined> {
    let searchSpaceNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetSuperContainer__from_ast(superKeyword, false);
    if (searchSpaceNode === undefined) {
        return RuntimeSlice.nil<SymbolAndEntries | undefined>();
    }
    let staticFlag = ModifierFlagsStatic$constant__from_ast();
    switch (Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            staticFlag = (staticFlag & Node__from_ast.ModifierFlags(searchSpaceNode)) >>> 0;
            searchSpaceNode = Node__from_ast.$storageOf(((searchSpaceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            break;
        }
        default: {
            return RuntimeSlice.nil<SymbolAndEntries | undefined>();
            break;
        }
    }
    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(searchSpaceNode);
    let references = MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry(getPossibleSymbolReferenceNodes(sourceFile, "super", searchSpaceNode), (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ReferenceEntry | undefined => {
        if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast())) {
            return void 0;
        }
        let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetSuperContainer__from_ast(node, false);
        if (!(container === undefined) && IsStatic__from_ast(container) === (!(staticFlag === ModifierFlagsNone$constant__from_ast())) &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Symbol(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), Node__from_ast.Symbol(searchSpaceNode))) {
            return newNodeEntry(node);
        }
        return void 0;
    });
    return RuntimeSlice.literal<SymbolAndEntries | undefined>([NewSymbolAndEntries(definitionKindSymbol$constant(), void 0, Node__from_ast.Symbol(searchSpaceNode), references)]);
}
export function getAllReferencesForImportMeta(sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<SymbolAndEntries | undefined> {
    let references = FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ls$ReferenceEntry(sourceFiles, (sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<ReferenceEntry | undefined> => {
        const __gotots_argument_5 = sourceFile;
        const __gotots_argument_6 = "meta";
        const __gotots_store_1 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_7 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_8 = getPossibleSymbolReferenceNodes(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
        const __gotots_argument_9 = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ReferenceEntry | undefined => {
            let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (IsImportMeta__from_ast(parent)) {
                return newNodeEntry(parent);
            }
            return void 0;
        };
        return MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry(__gotots_argument_8, __gotots_argument_9);
    });
    if (references.length === 0) {
        return RuntimeSlice.nil<SymbolAndEntries | undefined>();
    }
    return RuntimeSlice.literal<SymbolAndEntries | undefined>([new SymbolAndEntries(new Definition(definitionKindKeyword$constant(), void 0, (references.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, void 0), references),]);
}
export function getAllReferencesForKeyword(sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, keywordKind: Kind__from_ast, filterReadOnlyTypeOperator: bool): RuntimeSlice<SymbolAndEntries | undefined> {
    let references = FlatMap$PointerTo_Named_ast$SourceFile$PointerTo_Named_ls$ReferenceEntry(sourceFiles, (sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<ReferenceEntry | undefined> => {
        const __gotots_argument_0 = sourceFile;
        const __gotots_argument_1 = TokenToString__from_scanner(keywordKind);
        const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_3 = getPossibleSymbolReferenceNodes(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        const __gotots_argument_4 = (referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ReferenceEntry | undefined => {
            if (Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === keywordKind && (!filterReadOnlyTypeOperator || isReadonlyTypeOperator(referenceLocation))) {
                return newNodeEntry(referenceLocation);
            }
            return void 0;
        };
        return MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$ReferenceEntry(__gotots_argument_3, __gotots_argument_4);
    });
    if (references.length === 0) {
        return RuntimeSlice.nil<SymbolAndEntries | undefined>();
    }
    return RuntimeSlice.literal<SymbolAndEntries | undefined>([NewSymbolAndEntries(definitionKindKeyword$constant(), (references.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, void 0, references)]);
}
export function getPossibleSymbolReferenceNodes(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, symbolName: gostring, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return MapNonNil$int$PointerTo_Named_ast$Node(getPossibleSymbolReferencePositions(sourceFile, symbolName, container), (pos: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        {
            let referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, pos);
            const __gotots_equal_operand_0 = referenceLocation;
            const __gotots_store_6 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            if (!tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            })))) {
                return referenceLocation;
            }
        }
        return void 0;
    });
}
export function getPossibleSymbolReferencePositions(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, symbolName: gostring, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<int> {
    let positions = RuntimeSlice.literal<int>([]);
    if (symbolName === "") {
        return positions;
    }
    let text = SourceFile__from_ast.Text(sourceFile);
    let sourceLength = text.length;
    let symbolNameLength = symbolName.length;
    if (container === undefined) {
        const __gotots_store_11 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        container = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
    }
    let position__shadow_1 = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(text, Node__from_ast.Pos(container)), symbolName)));
    let endPos = Node__from_ast.End(container);
    for (; position__shadow_1 >= 0 && position__shadow_1 < endPos;) {
        let endPosition = position__shadow_1 + symbolNameLength;
        if ((position__shadow_1 === 0 || !IsIdentifierPart__from_scanner(goStringIndex(text, position__shadow_1 - 1))) && (endPosition === sourceLength || !IsIdentifierPart__from_scanner(goStringIndex(text, endPosition)))) {
            positions = positions.append(0, [position__shadow_1]);
        }
        let startIndex = position__shadow_1 + symbolNameLength + 1;
        if (startIndex > text.length) {
            break;
        }
        {
            let foundIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(text, startIndex), symbolName)));
            if (foundIndex !== -1) {
                position__shadow_1 = startIndex + foundIndex;
            }
            else {
                break;
            }
        }
    }
    return positions;
}
export function findFirstJsxNode(root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    visit = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindJsxElement$constant__from_ast():
            case KindJsxSelfClosingElement$constant__from_ast():
            case KindJsxFragment$constant__from_ast(): {
                return node;
                break;
            }
        }
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsJsx$constant__from_ast()) >>> 0 === 0) {
            return void 0;
        }
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            const __gotots_callee_9 = visit;
            const __gotots_argument_29 = child;
            result = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29);
            return !(result === undefined);
        }));
        return result;
    };
    const __gotots_callee_10 = visit;
    const __gotots_argument_30 = root;
    return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
}
export function getReferencesForNonModule(referencedFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, program: {
    value: Program__from_compiler;
} | undefined): RuntimeSlice<ReferenceEntry | undefined> {
    return RuntimeSlice.literal<ReferenceEntry | undefined>([]);
}
export function getMergedAliasedSymbolOfNamespaceExportDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceExportDeclaration$constant__from_ast()) {
        {
            const __gotots_results_0 = Checker__from_checker.ResolveAlias(checker__shadow_1, __go_symbol);
            let aliasedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                let targetSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol(checker__shadow_1, aliasedSymbol);
                if (!tsonicTypeScriptRuntime.sameLocation(aliasedSymbol, targetSymbol)) {
                    return targetSymbol;
                }
            }
        }
    }
    return void 0;
}
export function getSpecialSearchKind(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (node === undefined) {
        return "none";
    }
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindConstructorKeyword$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindIdentifier$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            __gotots_switch_selection_0 = 2;
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return "constructor";
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                if (IsClassLike__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    Assert__from_debug(tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                    return "class";
                }
                __gotots_switch_selection_0 = 2;
            }
            if (__gotots_switch_selection_0 === 2) {
                return "none";
                break __gotots_control_target_0;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function getReferencedSymbolsForSymbol(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, originalSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, sourceFilesSet: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, options: refOptions): RuntimeSlice<SymbolAndEntries | undefined> {
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Coalesce$PointerTo_Named_ast$Symbol$Named_ast$Symbol(skipPastExportOrImportSpecifierOrUnion(originalSymbol, node, checker__shadow_1, !isForRenameWithPrefixAndSuffixText(refOptions.$copy(options))), originalSymbol);
    let searchMeaning = SemanticMeaningAll$constant__from_ast();
    if (!(options.use.$value === referenceUseRename$constant().$value)) {
        searchMeaning = getIntersectingMeaningFromDeclarations(node, __go_symbol, SemanticMeaningAll$constant__from_ast());
    }
    let state: refState | undefined = newState(ctx, program, sourceFiles, sourceFilesSet, node, checker__shadow_1, searchMeaning, refOptions.$copy(options));
    let exportSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (isForRenameWithPrefixAndSuffixText(refOptions.$copy(options)) && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0) {
        exportSpecifier = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsExportSpecifier__from_ast);
    }
    if (!(exportSpecifier === undefined)) {
        refState.$go$private$ls$getReferencesAtExportSpecifier(state, Node__from_ast.Name(exportSpecifier), __go_symbol, Node__from_ast.AsExportSpecifier(exportSpecifier), refState.$go$private$ls$createSearch(state, node, originalSymbol, ImpExpKindUnknown$constant(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>()), true, true);
    }
    else if (!(node === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast() && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameDefault$string__from_ast && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
        refState.$go$private$ls$addReference(state, node, __go_symbol, entryKindNode$constant());
        refState.$go$private$ls$searchForImportsOfExport(state, node, __go_symbol, new ExportInfo(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, ExportKindDefault$constant()));
    }
    else {
        let search: refSearch | undefined = refState.$go$private$ls$createSearch(state, node, __go_symbol, ImpExpKindUnknown$constant(), "", refState.$go$private$ls$populateSearchSymbolSet(state, __go_symbol, node, options.use.$value === referenceUseRename$constant().$value, options.useAliasesForRename, options.implementations));
        refState.$go$private$ls$getReferencesInContainerOrFiles(state, __go_symbol, search);
    }
    return (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result;
}
export class refSearch {
    declare private readonly $goType: void;
    public constructor(public comingFrom: ImpExpKind, public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public text: gostring, public escapedText: gostring, public parents: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public allSearchSymbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public includes: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined) {
    }
    declare private readonly then?: never;
}
export class inheritKey {
    declare private readonly $goType: void;
    public constructor(public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
    }
    static $copy($source: inheritKey): inheritKey {
        return new inheritKey($source.__go_symbol, $source.parent);
    }
    static $equal($left: inheritKey, $right: inheritKey): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.__go_symbol, $right.__go_symbol)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.parent, $right.parent);
    }
    static $hash($source: inheritKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.__go_symbol));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.parent));
        return $hash;
    }
    declare private readonly then?: never;
}
export class refState {
    declare private readonly $goType: void;
    public constructor(public sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public sourceFilesSet: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public specialSearchKind: gostring, public checker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, public ctx: GoInterface | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public searchMeaning: SemanticMeaning__from_ast, public options: refOptions, public result: RuntimeSlice<SymbolAndEntries | undefined>, public inheritsFromCache: GoMapValue<inheritKey, bool>, public seenContainingTypeReferences: Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public seenReExportRHS: Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public importTracker: ImportTracker, public symbolToReferences: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, SymbolAndEntries | undefined>, public sourceFileToSeenSymbols: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$addClassStaticThisReferences(state: refState | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, search: refSearch | undefined, addReferencesHere: bool): void {
        if (addReferencesHere) {
            refState.$go$private$ls$addReference(state, referenceLocation, __go_symbol, entryKindNode$constant());
        }
        let classLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if ((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value || !IsClassLike__from_ast(classLike)) {
            return;
        }
        let addRef: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: entryKind) => void) | undefined = refState.$go$private$ls$referenceAdder(state, (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol);
        let members = Node__from_ast.Members(classLike);
        if (members.isNil()) {
            return;
        }
        const __gotots_range_11 = members;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
            const __gotots_range_value_11 = __gotots_range_11.get(__gotots_range_index_11);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
            if (!(isMethodOrAccessor(member) && HasStaticModifier__from_ast(member))) {
                continue;
            }
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(member);
            if (!(body === undefined)) {
                let cb: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined;
                cb = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindThisKeyword$constant__from_ast()) {
                        const __gotots_callee_39 = addRef;
                        const __gotots_argument_80 = node;
                        const __gotots_argument_81 = entryKindNode$constant();
                        (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_80, __gotots_argument_81);
                    }
                    else if (!IsFunctionLike__from_ast(node) && !IsClassLike__from_ast(node)) {
                        Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                            const __gotots_callee_40 = cb;
                            const __gotots_argument_82 = child;
                            (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_82);
                            return false;
                        }));
                    }
                };
                const __gotots_callee_41 = cb;
                const __gotots_argument_83 = body;
                (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_83);
            }
        }
    }
    static $go$private$ls$addConstructorReferences(state: refState | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, search: refSearch | undefined, addReferencesHere: bool): void {
        if (IsNewExpressionTarget__from_ast(referenceLocation, false, false) && addReferencesHere) {
            refState.$go$private$ls$addReference(state, referenceLocation, __go_symbol, entryKindNode$constant());
        }
        let pusher: (() => (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: entryKind) => void) | undefined) | undefined = (): (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: entryKind) => void) | undefined => {
            return refState.$go$private$ls$referenceAdder(state, (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol);
        };
        if (IsClassLike__from_ast(Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(referenceLocation);
            findOwnConstructorReferences((search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol, sourceFile, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                const __gotots_callee_35 = pusher;
                const __gotots_callee_36 = (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))();
                const __gotots_argument_76 = n;
                const __gotots_argument_77 = entryKindNode$constant();
                (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_76, __gotots_argument_77);
            });
        }
        else {
            {
                let classExtending: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = tryGetClassByExtendingIdentifier(referenceLocation);
                if (!(classExtending === undefined)) {
                    findSuperConstructorAccesses(classExtending, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                        const __gotots_callee_37 = pusher;
                        const __gotots_callee_38 = (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))();
                        const __gotots_argument_78 = n;
                        const __gotots_argument_79 = entryKindNode$constant();
                        (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78, __gotots_argument_79);
                    });
                    refState.$go$private$ls$findInheritedConstructorReferences(state, classExtending);
                }
            }
        }
    }
    static $go$private$ls$addImplementationReferences(state: refState | undefined, refNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, addRef: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
        if (IsDeclarationName__from_ast(refNode) && isImplementation(Node__from_ast.$storageOf(((refNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            const __gotots_callee_11 = addRef;
            const __gotots_argument_31 = refNode;
            (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31);
            return;
        }
        if (!(Node__from_ast.$storageOf(((refNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast())) {
            return;
        }
        if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((refNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindShorthandPropertyAssignment$constant__from_ast()) {
            getReferenceEntriesForShorthandPropertyAssignment(refNode, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, addRef);
        }
        {
            let containingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainingNodeIfInHeritageClause(refNode);
            if (!(containingNode === undefined)) {
                const __gotots_callee_12 = addRef;
                const __gotots_argument_32 = containingNode;
                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_32);
                return;
            }
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(refNode, (a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return !IsQualifiedName__from_ast(Node__from_ast.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsTypeNode__from_ast(Node__from_ast.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsTypeElement__from_ast(Node__from_ast.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        });
        if (typeNode === undefined || Node__from_ast.Type(Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined) {
            return;
        }
        let typeHavingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        let __gotots_logical_result_3 = tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Type(typeHavingNode), typeNode);
        if (__gotots_logical_result_3) {
            const __gotots_store_8 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_logical_result_3 = Set$AddIfAbsent$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "seenContainingTypeReferences"), typeHavingNode);
        }
        if (__gotots_logical_result_3) {
            let addIfImplementation: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined = (e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                if (isImplementationExpression(e)) {
                    const __gotots_callee_13 = addRef;
                    const __gotots_argument_33 = e;
                    (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33);
                }
            };
            if (HasInitializer__from_ast(typeHavingNode)) {
                const __gotots_callee_14 = addIfImplementation;
                const __gotots_argument_34 = Node__from_ast.Initializer(typeHavingNode);
                (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_34);
            }
            else if (IsFunctionLike__from_ast(typeHavingNode) && !(Node__from_ast.Body(typeHavingNode) === undefined)) {
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(typeHavingNode);
                if (Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBlock$constant__from_ast()) {
                    ForEachReturnStatement__from_ast(body, (returnStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        {
                            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(returnStatement);
                            if (!(expr === undefined)) {
                                const __gotots_callee_15 = addIfImplementation;
                                const __gotots_argument_35 = expr;
                                (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
                            }
                        }
                        return false;
                    });
                }
                else {
                    const __gotots_callee_16 = addIfImplementation;
                    const __gotots_argument_36 = body;
                    (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36);
                }
            }
            else if (IsAssertionExpression__from_ast(typeHavingNode) || IsSatisfiesExpression__from_ast(typeHavingNode)) {
                const __gotots_callee_17 = addIfImplementation;
                const __gotots_argument_37 = Node__from_ast.Expression(typeHavingNode);
                (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_37);
            }
        }
    }
    static $go$private$ls$addReference(state: refState | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, kind: entryKind): void {
        if ((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value && Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast()) {
            return;
        }
        let addRef: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: entryKind) => void) | undefined = refState.$go$private$ls$referenceAdder(state, __go_symbol);
        if ((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.implementations) {
            refState.$go$private$ls$addImplementationReferences(state, referenceLocation, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                const __gotots_callee_6 = addRef;
                const __gotots_argument_23 = n;
                const __gotots_argument_24 = kind;
                (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23, __gotots_argument_24);
            });
        }
        else {
            const __gotots_callee_7 = addRef;
            const __gotots_argument_25 = referenceLocation;
            const __gotots_argument_26 = kind;
            (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25, __gotots_argument_26);
        }
    }
    static $go$private$ls$createSearch(state: refState | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, comingFrom: ImpExpKind, text: gostring, allSearchSymbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): refSearch | undefined {
        if (text === "") {
            let s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = GetLocalSymbolForExportDefault__from_binder(__go_symbol);
            if (s === undefined) {
                s = getNonModuleSymbolOfMergedModuleSymbol(__go_symbol);
                if (s === undefined) {
                    s = __go_symbol;
                }
            }
            text = StripQuotes__from_stringutil(SymbolName__from_ast(s));
        }
        if (allSearchSymbols.length === 0) {
            allSearchSymbols = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([__go_symbol]);
        }
        let search: refSearch | undefined = new refSearch(comingFrom, __go_symbol, text, text, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), allSearchSymbols, (sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return Contains$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol(allSearchSymbols, sym);
        });
        if ((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.implementations && !(location === undefined)) {
            (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parents = getParentSymbolsOfPropertyAccess(location, __go_symbol, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
        }
        return search;
    }
    static $go$private$ls$explicitlyInheritsFrom(state: refState | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
        if (tsonicTypeScriptRuntime.sameLocation(__go_symbol, parent)) {
            return true;
        }
        let key = new inheritKey(__go_symbol, parent);
        {
            const __gotots_results_12 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inheritsFromCache.lookupOk(key);
            let cached = __gotots_results_12[0];
            let ok = __gotots_results_12[1];
            if (ok) {
                return cached;
            }
        }
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inheritsFromCache.store(key, false);
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.isNil()) {
            return false;
        }
        let inherits = Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            let superTypeNodes = getAllSuperTypeNodes(declaration);
            return Some$PointerTo_Named_ast$Node(superTypeNodes, (typeReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                let typ: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Node__from_ast.AsNode(typeReference));
                return !(typ === undefined) && !(Type__from_checker.Symbol(typ) === undefined) && refState.$go$private$ls$explicitlyInheritsFrom(state, Type__from_checker.Symbol(typ), parent);
            });
        });
        (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inheritsFromCache.store(key, inherits);
        return inherits;
    }
    static $go$private$ls$findInheritedConstructorReferences(state: refState | undefined, classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (hasOwnConstructor(classDeclaration)) {
            return;
        }
        let classSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(classDeclaration);
        let search: refSearch | undefined = refState.$go$private$ls$createSearch(state, void 0, classSymbol, ImpExpKindUnknown$constant(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>());
        refState.$go$private$ls$getReferencesInContainerOrFiles(state, classSymbol, search);
    }
    static $go$private$ls$forEachRelatedSymbol(state: refState | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isForRenamePopulateSearchSymbolSet: bool, onlyIncludeBindingElementAtReferenceLocation: bool, cbSymbol: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined, allowBaseTypes: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined): [
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined,
        entryKind
    ] {
        let fromRoot: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined = (sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
            const __gotots_range_5 = Checker__from_checker.GetRootSymbols((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, sym);
            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
                let rootSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_5;
                {
                    const __gotots_callee_19 = cbSymbol;
                    const __gotots_argument_45 = sym;
                    const __gotots_argument_46 = rootSymbol;
                    const __gotots_argument_47 = void 0;
                    let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45, __gotots_argument_46, __gotots_argument_47);
                    if (!(result === undefined)) {
                        return result;
                    }
                }
                let __gotots_logical_result_4 = !(Symbol__from_ast.$storageOf(((rootSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && !((Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((rootSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (96)) >>> 0 === 0);
                if (__gotots_logical_result_4) {
                    const __gotots_callee_20 = allowBaseTypes;
                    const __gotots_argument_48 = rootSymbol;
                    __gotots_logical_result_4 = (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
                }
                if (__gotots_logical_result_4) {
                    let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getPropertySymbolsFromBaseTypes(Symbol__from_ast.$storageOf(((rootSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, Symbol__from_ast.$storageOf(((rootSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, (base: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                        const __gotots_callee_21 = cbSymbol;
                        const __gotots_argument_49 = sym;
                        const __gotots_argument_50 = rootSymbol;
                        const __gotots_argument_51 = base;
                        return (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49, __gotots_argument_50, __gotots_argument_51);
                    });
                    if (!(result === undefined)) {
                        return result;
                    }
                }
            }
            return void 0;
        };
        {
            let containingObjectLiteralElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainingObjectLiteralElement(location);
            if (!(containingObjectLiteralElement === undefined)) {
                let shorthandValueSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetShorthandAssignmentValueSymbol((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                if (!(shorthandValueSymbol === undefined) && isForRenamePopulateSearchSymbolSet) {
                    const __gotots_callee_22 = cbSymbol;
                    const __gotots_argument_52 = shorthandValueSymbol;
                    const __gotots_argument_53 = void 0;
                    const __gotots_argument_54 = void 0;
                    const __gotots_results_2 = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52, __gotots_argument_53, __gotots_argument_54);
                    const __gotots_results_3 = entryKindSearchedLocalFoundProperty$constant();
                    return [__gotots_results_2, __gotots_results_3];
                }
                {
                    let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Node__from_ast.$storageOf(((containingObjectLiteralElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ContextFlagsNone$constant__from_checker());
                    if (!(contextualType === undefined)) {
                        let symbols = Checker__from_checker.GetPropertySymbolsFromContextualType((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, containingObjectLiteralElement, contextualType, true);
                        const __gotots_range_6 = symbols;
                        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                            const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                            let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_6;
                            {
                                const __gotots_callee_23 = fromRoot;
                                const __gotots_argument_55 = sym;
                                let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55);
                                if (!(res === undefined)) {
                                    return [res, entryKindSearchedPropertyFoundLocal$constant()];
                                }
                            }
                        }
                    }
                }
                {
                    let propertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertySymbolOfDestructuringAssignment((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, location);
                    if (!(propertySymbol === undefined)) {
                        {
                            const __gotots_callee_24 = cbSymbol;
                            const __gotots_argument_56 = propertySymbol;
                            const __gotots_argument_57 = void 0;
                            const __gotots_argument_58 = void 0;
                            let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
                            if (!(res === undefined)) {
                                return [res, entryKindSearchedPropertyFoundLocal$constant()];
                            }
                        }
                    }
                }
                if (!(shorthandValueSymbol === undefined)) {
                    {
                        const __gotots_callee_25 = cbSymbol;
                        const __gotots_argument_59 = shorthandValueSymbol;
                        const __gotots_argument_60 = void 0;
                        const __gotots_argument_61 = void 0;
                        let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
                        if (!(res === undefined)) {
                            return [res, entryKindSearchedLocalFoundProperty$constant()];
                        }
                    }
                }
            }
        }
        {
            let aliasedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getMergedAliasedSymbolOfNamespaceExportDeclaration(location, __go_symbol, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
            if (!(aliasedSymbol === undefined)) {
                {
                    const __gotots_callee_26 = cbSymbol;
                    const __gotots_argument_62 = aliasedSymbol;
                    const __gotots_argument_63 = void 0;
                    const __gotots_argument_64 = void 0;
                    let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62, __gotots_argument_63, __gotots_argument_64);
                    if (!(res === undefined)) {
                        return [res, entryKindNode$constant()];
                    }
                }
            }
        }
        {
            const __gotots_callee_27 = fromRoot;
            const __gotots_argument_65 = __go_symbol;
            let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_65);
            if (!(res === undefined)) {
                return [res, entryKindNode$constant()];
            }
        }
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsParameterPropertyDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            const __gotots_results_4 = Checker__from_checker.GetSymbolsOfParameterPropertyDeclaration((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            let paramProp1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_4[0];
            let paramProp2: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_4[1];
            Assert__from_debug(!((Symbol__from_ast.$storageOf(((paramProp1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsFunctionScopedVariable$constant__from_ast()) >>> 0 === 0) && !((Symbol__from_ast.$storageOf(((paramProp2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClassMember$constant__from_ast()) >>> 0 === 0), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("GetSymbolsOfParameterPropertyDeclaration must return (parameter, member) pair")]));
            const __gotots_callee_28 = fromRoot;
            const __gotots_argument_66 = IfElse$PointerTo_Named_ast$Symbol(!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsFunctionScopedVariable$constant__from_ast()) >>> 0 === 0), paramProp2, paramProp1);
            const __gotots_results_5 = (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_66);
            const __gotots_results_6 = entryKindNode$constant();
            return [__gotots_results_5, __gotots_results_6];
        }
        {
            let exportSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindExportSpecifier$constant__from_ast());
            if (!(exportSpecifier === undefined) && (!isForRenamePopulateSearchSymbolSet || Node__from_ast.PropertyName(exportSpecifier) === undefined)) {
                {
                    let localSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetExportSpecifierLocalTargetSymbol((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, exportSpecifier);
                    if (!(localSymbol === undefined)) {
                        {
                            const __gotots_callee_29 = cbSymbol;
                            const __gotots_argument_67 = localSymbol;
                            const __gotots_argument_68 = void 0;
                            const __gotots_argument_69 = void 0;
                            let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_67, __gotots_argument_68, __gotots_argument_69);
                            if (!(res === undefined)) {
                                return [res, entryKindNode$constant()];
                            }
                        }
                    }
                }
            }
        }
        if (!isForRenamePopulateSearchSymbolSet) {
            let bindingElementPropertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
            if (onlyIncludeBindingElementAtReferenceLocation) {
                if (!isObjectBindingElementWithoutPropertyName(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    return [void 0, entryKindNone$constant()];
                }
                bindingElementPropertySymbol = getPropertySymbolFromBindingElement((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            else {
                bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(__go_symbol, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
            }
            if (bindingElementPropertySymbol === undefined) {
                return [void 0, entryKindNone$constant()];
            }
            const __gotots_callee_30 = fromRoot;
            const __gotots_argument_70 = bindingElementPropertySymbol;
            const __gotots_results_7 = (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_70);
            const __gotots_results_8 = entryKindSearchedPropertyFoundLocal$constant();
            return [__gotots_results_7, __gotots_results_8];
        }
        Assert__from_debug(isForRenamePopulateSearchSymbolSet, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        let includeOriginalSymbolOfBindingElement = onlyIncludeBindingElementAtReferenceLocation;
        if (includeOriginalSymbolOfBindingElement) {
            {
                let bindingElementPropertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(__go_symbol, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
                if (!(bindingElementPropertySymbol === undefined)) {
                    const __gotots_callee_31 = fromRoot;
                    const __gotots_argument_71 = bindingElementPropertySymbol;
                    const __gotots_results_9 = (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_71);
                    const __gotots_results_10 = entryKindSearchedPropertyFoundLocal$constant();
                    return [__gotots_results_9, __gotots_results_10];
                }
            }
        }
        return [void 0, entryKindNone$constant()];
    }
    static $go$private$ls$getImportOrExportReferences(state: refState | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, referenceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, search: refSearch | undefined): void {
        let importOrExport: ImportExportSymbol | undefined = getImportOrExportSymbol(referenceLocation, referenceSymbol, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comingFrom === ImpExpKindExport$constant());
        if (importOrExport === undefined) {
            return;
        }
        if ((importOrExport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind === ImpExpKindImport$constant()) {
            if (!isForRenameWithPrefixAndSuffixText(refOptions.$copy((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options))) {
                refState.$go$private$ls$searchForImportedSymbol(state, (importOrExport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol);
            }
        }
        else {
            refState.$go$private$ls$searchForImportsOfExport(state, referenceLocation, (importOrExport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).__go_symbol, (importOrExport ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportInfo);
        }
    }
    static $go$private$ls$getImportSearches(state: refState | undefined, exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportInfo: ExportInfo | undefined): ImportsResult | undefined {
        if ((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importTracker.$value === undefined) {
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importTracker = createImportTracker((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFiles, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFilesSet, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
        }
        const __gotots_callee_18 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importTracker.$value;
        const __gotots_argument_38 = exportSymbol;
        const __gotots_argument_39 = exportInfo;
        const __gotots_argument_40 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value;
        return (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
    }
    static $go$private$ls$getReferenceForShorthandProperty(state: refState | undefined, referenceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, search: refSearch | undefined): void {
        if (!((Symbol__from_ast.$storageOf(((referenceSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTransient$constant__from_ast()) >>> 0 === 0) || Symbol__from_ast.$storageOf(((referenceSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) {
            return;
        }
        let shorthandValueSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetShorthandAssignmentValueSymbol((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, Symbol__from_ast.$storageOf(((referenceSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(Symbol__from_ast.$storageOf(((referenceSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
        let __gotots_logical_result_6 = !(name === undefined);
        if (__gotots_logical_result_6) {
            const __gotots_callee_34 = (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes;
            const __gotots_argument_75 = shorthandValueSymbol;
            __gotots_logical_result_6 = (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_75);
        }
        if (__gotots_logical_result_6) {
            refState.$go$private$ls$addReference(state, name, shorthandValueSymbol, entryKindNode$constant());
        }
    }
    static $go$private$ls$getReferencesAtExportSpecifier(state: refState | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, referenceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportSpecifier: {
        value: ExportSpecifier__from_ast;
    } | undefined, search: refSearch | undefined, addReferencesHere: bool, alwaysGetReferences: bool): void {
        Assert__from_debug(!alwaysGetReferences || (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.useAliasesForRename, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("If alwaysGetReferences is true, then prefix/suffix text must be enabled")]));
        let exportDeclaration: {
            value: ExportDeclaration__from_ast;
        } | undefined = Node__from_ast.AsExportDeclaration(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ExportSpecifier__from_ast.Name(exportSpecifier);
        let localSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getLocalSymbolForExportSpecifier(referenceLocation, referenceSymbol, exportSpecifier, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
        let __gotots_logical_result_2 = !alwaysGetReferences;
        if (__gotots_logical_result_2) {
            const __gotots_callee_2 = (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes;
            const __gotots_argument_21 = localSymbol;
            __gotots_logical_result_2 = !(__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21);
        }
        if (__gotots_logical_result_2) {
            return;
        }
        let addRef: (() => void) | undefined = (): void => {
            if (addReferencesHere) {
                refState.$go$private$ls$addReference(state, referenceLocation, localSymbol, entryKindNode$constant());
            }
        };
        if (propertyName === undefined) {
            if (!((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value && ModuleExportNameIsDefault__from_ast(name))) {
                const __gotots_callee_3 = addRef;
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
        }
        else if (tsonicTypeScriptRuntime.sameLocation(referenceLocation, Node__from_ast.AsNode(propertyName))) {
            if ((exportDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) {
                const __gotots_callee_4 = addRef;
                (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
            if (addReferencesHere && !((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value) && refState.$go$private$ls$markSeenReExportRHS(state, name)) {
                const __gotots_store_3 = NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                let exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                })));
                Assert__from_debug(!(exportSymbol === undefined), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("exportSpecifier.Symbol() should not be nil")]));
                refState.$go$private$ls$addReference(state, name, exportSymbol, entryKindNode$constant());
            }
        }
        else {
            if (refState.$go$private$ls$markSeenReExportRHS(state, referenceLocation)) {
                const __gotots_callee_5 = addRef;
                (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
        }
        if (!isForRenameWithPrefixAndSuffixText(refOptions.$copy((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options)) || alwaysGetReferences) {
            let isDefaultExport = ModuleExportNameIsDefault__from_ast(referenceLocation) || ModuleExportNameIsDefault__from_ast(ExportSpecifier__from_ast.Name(exportSpecifier));
            let exportKind = ExportKindNamed$constant();
            if (isDefaultExport) {
                exportKind = ExportKindDefault$constant();
            }
            const __gotots_store_4 = NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            let exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            })));
            Assert__from_debug(!(exportSymbol === undefined), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("exportSpecifier.Symbol() should not be nil")]));
            let exportInfo: ExportInfo | undefined = getExportInfo(exportSymbol, exportKind, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker);
            if (!(exportInfo === undefined)) {
                refState.$go$private$ls$searchForImportsOfExport(state, referenceLocation, exportSymbol, exportInfo);
            }
        }
        if (!((search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comingFrom === ImpExpKindExport$constant()) && !((exportDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier === undefined) && propertyName === undefined && !isForRenameWithPrefixAndSuffixText(refOptions.$copy((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options))) {
            const __gotots_receiver_0 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker;
            const __gotots_store_5 = NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_22 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            let imported: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetExportSpecifierLocalTargetSymbol(__gotots_receiver_0, __gotots_argument_22);
            if (!(imported === undefined)) {
                refState.$go$private$ls$searchForImportedSymbol(state, imported);
            }
        }
    }
    static $go$private$ls$getReferencesAtLocation(state: refState | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, search: refSearch | undefined, addReferencesHere: bool): void {
        let referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingPropertyName__from_astnav(sourceFile, position__shadow_1);
        if (!isValidReferencePosition(referenceLocation, (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).text)) {
            return;
        }
        if ((getMeaningFromLocation(referenceLocation) & (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).searchMeaning) === 0) {
            return;
        }
        let referenceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).checker, referenceLocation);
        if (referenceSymbol === undefined) {
            return;
        }
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportSpecifier$constant__from_ast() &&
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.PropertyName(parent), referenceLocation)) {
            return;
        }
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportSpecifier$constant__from_ast()) {
            refState.$go$private$ls$getReferencesAtExportSpecifier(state, referenceLocation, referenceSymbol, Node__from_ast.AsExportSpecifier(parent), search, addReferencesHere, false);
            return;
        }
        const __gotots_results_11 = refState.$go$private$ls$getRelatedSymbol(state, search, referenceSymbol, referenceLocation);
        let relatedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_11[0];
        let relatedSymbolKind = __gotots_results_11[1];
        if (relatedSymbol === undefined) {
            refState.$go$private$ls$getReferenceForShorthandProperty(state, referenceSymbol, search);
            return;
        }
        switch ((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).specialSearchKind) {
            case "none": {
                if (addReferencesHere) {
                    refState.$go$private$ls$addReference(state, referenceLocation, relatedSymbol, relatedSymbolKind);
                }
                break;
            }
            case "constructor": {
                refState.$go$private$ls$addConstructorReferences(state, referenceLocation, relatedSymbol, search, addReferencesHere);
                break;
            }
            case "class": {
                refState.$go$private$ls$addClassStaticThisReferences(state, referenceLocation, relatedSymbol, search, addReferencesHere);
                break;
            }
        }
        if (IsInJSFile__from_ast(referenceLocation) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBindingElement$constant__from_ast() && IsVariableDeclarationInitializedToBareOrAccessedRequire__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            referenceSymbol = Node__from_ast.Symbol(Node__from_ast.$storageOf(((referenceLocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            if (referenceSymbol === undefined) {
                return;
            }
        }
        refState.$go$private$ls$getImportOrExportReferences(state, referenceLocation, referenceSymbol, search);
    }
    static $go$private$ls$getReferencesInContainer(state: refState | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, search: refSearch | undefined, addReferencesHere: bool): void {
        if (!refState.$go$private$ls$markSearchedSymbols(state, sourceFile, (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allSearchSymbols)) {
            return;
        }
        const __gotots_range_8 = getPossibleSymbolReferencePositions(sourceFile, (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).text, container);
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
            let position__shadow_1 = __gotots_range_value_8;
            refState.$go$private$ls$getReferencesAtLocation(state, sourceFile, position__shadow_1, search, addReferencesHere);
        }
    }
    static $go$private$ls$getReferencesInContainerOrFiles(state: refState | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, search: refSearch | undefined): void {
        {
            let scope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getSymbolScope(__go_symbol);
            if (!(scope === undefined)) {
                let addReferencesHere = !(Node__from_ast.$storageOf(((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast()) || Contains$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFiles, Node__from_ast.AsSourceFile(scope));
                refState.$go$private$ls$getReferencesInContainer(state, scope, GetSourceFileOfNode__from_ast(scope), search, addReferencesHere);
            }
            else {
                const __gotots_range_3 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFiles;
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                    const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_3;
                    refState.$go$private$ls$searchForName(state, sourceFile, search);
                }
            }
        }
    }
    static $go$private$ls$getReferencesInSourceFile(state: refState | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, search: refSearch | undefined, addReferencesHere: bool): void {
        const __gotots_receiver_1 = state;
        const __gotots_store_9 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_41 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        const __gotots_argument_42 = sourceFile;
        const __gotots_argument_43 = search;
        const __gotots_argument_44 = addReferencesHere;
        refState.$go$private$ls$getReferencesInContainer(__gotots_receiver_1, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44);
    }
    static $go$private$ls$getRelatedSymbol(state: refState | undefined, search: refSearch | undefined, referenceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined,
        entryKind
    ] {
        return refState.$go$private$ls$forEachRelatedSymbol(state, referenceSymbol, referenceLocation, false, !((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value) || (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.useAliasesForRename, (sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, rootSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, baseSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
            if (!(baseSymbol === undefined)) {
                if (isStaticSymbol(referenceSymbol) !== isStaticSymbol(baseSymbol)) {
                    baseSymbol = void 0;
                }
            }
            let searchSym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Coalesce$PointerTo_Named_ast$Symbol$Named_ast$Symbol(baseSymbol, Coalesce$PointerTo_Named_ast$Symbol$Named_ast$Symbol(rootSymbol, sym));
            let __gotots_logical_result_5 = !(searchSym === undefined);
            if (__gotots_logical_result_5) {
                const __gotots_callee_33 = (search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes;
                const __gotots_argument_74 = searchSym;
                __gotots_logical_result_5 = (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_74);
            }
            if (__gotots_logical_result_5) {
                if (!(rootSymbol === undefined) && (Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsSynthetic$constant__from_ast()) >>> 0 === 0) {
                    return rootSymbol;
                }
                return sym;
            }
            return void 0;
        }, (rootSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return !((search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parents.length !== 0 && !Some$PointerTo_Named_ast$Symbol((search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parents, (parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                return refState.$go$private$ls$explicitlyInheritsFrom(state, Symbol__from_ast.$storageOf(((rootSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, parent);
            }));
        });
    }
    static $go$private$ls$hasMatchingMeaning(state: refState | undefined, referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return !((getMeaningFromLocation(referenceLocation) & (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).searchMeaning) === 0);
    }
    static $go$private$ls$includesSourceFile(state: refState | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        return Set__from_collections.Has<gostring>((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFilesSet, SourceFile__from_ast.FileName(sourceFile));
    }
    static $go$private$ls$markSearchedSymbols(state: refState | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): bool {
        let seenSymbols: tsonicTypeScriptRuntime.Location<Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>> | undefined = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileToSeenSymbols.lookup(sourceFile);
        if (seenSymbols === undefined) {
            seenSymbols =
                tsonicTypeScriptRuntime.location<Set__from_collections<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>(Set__from_collections.$fromStorage<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>({
                    M: $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.nil()
                }));
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileToSeenSymbols.store(sourceFile, seenSymbols);
        }
        let anyNewSymbols = false;
        const __gotots_range_10 = symbols;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_10 = __gotots_range_10.get(__gotots_range_index_10);
            let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_10;
            if (Set$AddIfAbsent$PointerTo_Named_ast$Symbol(seenSymbols, sym)) {
                anyNewSymbols = true;
            }
        }
        return anyNewSymbols;
    }
    static $go$private$ls$markSeenReExportRHS(state: refState | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        const __gotots_store_7 = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return Set$AddIfAbsent$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "seenReExportRHS"), node);
    }
    static $go$private$ls$populateSearchSymbolSet(state: refState | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isForRename: bool, providePrefixAndSuffixText: bool, implementations: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        if (location === undefined) {
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([__go_symbol]);
        }
        let result = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([]);
        refState.$go$private$ls$forEachRelatedSymbol(state, __go_symbol, location, isForRename, !(isForRename && providePrefixAndSuffixText), (sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, root: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, base: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
            if (!(base === undefined)) {
                if (isStaticSymbol(__go_symbol) !== isStaticSymbol(base)) {
                    base = void 0;
                }
            }
            result = result.append(void 0, [OrElse$PointerTo_Named_ast$Symbol(base, OrElse$PointerTo_Named_ast$Symbol(root, sym))]);
            return void 0;
        }, ($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return !implementations;
        });
        return result;
    }
    static $go$private$ls$referenceAdder(state: refState | undefined, searchSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: entryKind) => void) | undefined {
        let symbolAndEntries: SymbolAndEntries | undefined = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolToReferences.lookup(searchSymbol);
        if (symbolAndEntries === undefined) {
            symbolAndEntries = NewSymbolAndEntries(definitionKindSymbol$constant(), void 0, searchSymbol, RuntimeSlice.nil<ReferenceEntry | undefined>());
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).symbolToReferences.store(searchSymbol, symbolAndEntries);
            (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result = (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result.append(void 0, [symbolAndEntries]);
        }
        return (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: entryKind): void => {
            (symbolAndEntries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).references = (symbolAndEntries ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).references.append(void 0, [newNodeEntryWithKind(node, kind)]);
        };
    }
    static $go$private$ls$searchForImportedSymbol(state: refState | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        const __gotots_range_4 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            let exportingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(declaration);
            refState.$go$private$ls$getReferencesInSourceFile(state, exportingFile, refState.$go$private$ls$createSearch(state, declaration, __go_symbol, ImpExpKindImport$constant(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>()), refState.$go$private$ls$includesSourceFile(state, exportingFile));
        }
    }
    static $go$private$ls$searchForImportsOfExport(state: refState | undefined, exportLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportInfo: ExportInfo | undefined): void {
        let r: ImportsResult | undefined = refState.$go$private$ls$getImportSearches(state, exportSymbol, exportInfo);
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).singleReferences.length !== 0) {
            let addRef: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: entryKind) => void) | undefined = refState.$go$private$ls$referenceAdder(state, exportSymbol);
            const __gotots_range_0 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).singleReferences;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let singleRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                if (refState.$go$private$ls$shouldAddSingleReference(state, singleRef)) {
                    const __gotots_callee_8 = addRef;
                    const __gotots_argument_27 = singleRef;
                    const __gotots_argument_28 = entryKindNode$constant();
                    (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28);
                }
            }
        }
        const __gotots_range_1 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).importSearches;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = LocationAndSymbol.$copy(LocationAndSymbol.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
            let i = __gotots_range_value_1;
            refState.$go$private$ls$getReferencesInSourceFile(state, GetSourceFileOfNode__from_ast(LocationAndSymbol.$storageOf(i).importLocation), refState.$go$private$ls$createSearch(state, LocationAndSymbol.$storageOf(i).importLocation, LocationAndSymbol.$storageOf(i).importSymbol, ImpExpKindExport$constant(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>()), true);
        }
        if ((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indirectUsers.length !== 0) {
            let indirectSearch: refSearch | undefined = void 0;
            switch ((exportInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportKind.$value) {
                case 0: {
                    indirectSearch = refState.$go$private$ls$createSearch(state, exportLocation, exportSymbol, ImpExpKindExport$constant(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>());
                    break;
                }
                case 1: {
                    if (!((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value)) {
                        indirectSearch = refState.$go$private$ls$createSearch(state, exportLocation, exportSymbol, ImpExpKindExport$constant(), "default", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>());
                    }
                    break;
                }
            }
            if (!(indirectSearch === undefined)) {
                const __gotots_range_2 = (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indirectUsers;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                    let indirectUser: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_2;
                    refState.$go$private$ls$searchForName(state, indirectUser, indirectSearch);
                }
            }
        }
    }
    static $go$private$ls$searchForName(state: refState | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, search: refSearch | undefined): void {
        {
            const __gotots_results_1 = SourceFile__from_ast.GetNameTable(sourceFile).lookupOk((search ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).escapedText);
            let ok = __gotots_results_1[1];
            if (ok) {
                refState.$go$private$ls$getReferencesInSourceFile(state, sourceFile, search, true);
            }
        }
    }
    static $go$private$ls$shouldAddSingleReference(state: refState | undefined, singleRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!refState.$go$private$ls$hasMatchingMeaning(state, singleRef)) {
            return false;
        }
        if (!((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.use.$value === referenceUseRename$constant().$value)) {
            return true;
        }
        if (!IsIdentifier__from_ast(singleRef) && !IsImportOrExportSpecifier__from_ast(Node__from_ast.$storageOf(((singleRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return false;
        }
        return !(IsImportOrExportSpecifier__from_ast(Node__from_ast.$storageOf(((singleRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && ModuleExportNameIsDefault__from_ast(singleRef));
    }
}
export function newState(ctx: GoInterface | undefined, program: {
    value: Program__from_compiler;
} | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, sourceFilesSet: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, searchMeaning: SemanticMeaning__from_ast, options: refOptions): refState | undefined {
    return new refState(sourceFiles, sourceFilesSet, getSpecialSearchKind(node), checker__shadow_1, ctx, program, searchMeaning, refOptions.$copy(options), RuntimeSlice.nil<SymbolAndEntries | undefined>(), GoMap.make(0, []), Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
    }), Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
    }), new ImportTracker(void 0), $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_ls$SymbolAndEntries.make(0, []), $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_PointerTo_Named_collections$SetOf_PointerTo_Named_ast$Symbol.make(0, []));
}
export function getReferenceEntriesForShorthandPropertyAssignment(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, checker__shadow_1: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, addReference: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
    let refSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, node);
    if (refSymbol === undefined || Symbol__from_ast.$storageOf(((refSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) {
        return;
    }
    let shorthandSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetShorthandAssignmentValueSymbol(checker__shadow_1, Symbol__from_ast.$storageOf(((refSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
    if (!(shorthandSymbol === undefined) && Symbol__from_ast.$storageOf(((shorthandSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        const __gotots_range_9 = Symbol__from_ast.$storageOf(((shorthandSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
            const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
            if (!((GetMeaningFromDeclaration__from_ast(declaration) & SemanticMeaningValue$constant__from_ast()) === 0)) {
                const __gotots_callee_32 = addReference;
                const __gotots_argument_72 = declaration;
                (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_72);
            }
        }
    }
}
export function isMethodOrAccessor(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast();
}
export function tryGetClassByExtendingIdentifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return TryGetClassExtendingExpressionWithTypeArguments__from_ast(Node__from_ast.$storageOf(((ClimbPastPropertyAccess__from_ast(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function getClassConstructorSymbol(classSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((classSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.isNil()) {
        return void 0;
    }
    return new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((classSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Members).$value.lookup(InternalSymbolNameConstructor$string__from_ast);
}
export function hasOwnConstructor(classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(getClassConstructorSymbol(Node__from_ast.Symbol(classDeclaration)) === undefined);
}
export function findOwnConstructorReferences(classSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, addNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
    let constructorSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getClassConstructorSymbol(classSymbol);
    if (!(constructorSymbol === undefined) && Symbol__from_ast.$storageOf(((constructorSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        const __gotots_range_12 = Symbol__from_ast.$storageOf(((constructorSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
            const __gotots_range_value_12 = __gotots_range_12.get(__gotots_range_index_12);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_12;
            if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructor$constant__from_ast()) {
                {
                    let ctrKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(decl, KindConstructorKeyword$constant__from_ast(), sourceFile);
                    if (!(ctrKeyword === undefined)) {
                        const __gotots_callee_42 = addNode;
                        const __gotots_argument_84 = ctrKeyword;
                        (__gotots_callee_42 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_84);
                    }
                }
            }
        }
    }
    if (!new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((classSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.isNil()) {
        const __gotots_range_13 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((classSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
        const __gotots_range_keys_0 = __gotots_range_13.keys();
        for (const __gotots_range_value_13 of __gotots_range_keys_0) {
            const __gotots_range_value_14 = __gotots_range_13.lookupOk(__gotots_range_value_13);
            if (!__gotots_range_value_14[1]) {
                continue;
            }
            const __gotots_range_value_15 = __gotots_range_value_14[0];
            let member: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_15;
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
            if (!(decl === undefined) && Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast()) {
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(decl);
                if (!(body === undefined)) {
                    forEachDescendantOfKind(body, KindThisKeyword$constant__from_ast(), (thisKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                        if (IsNewExpressionTarget__from_ast(thisKeyword, false, false)) {
                            const __gotots_callee_43 = addNode;
                            const __gotots_argument_85 = thisKeyword;
                            (__gotots_callee_43 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_85);
                        }
                    });
                }
            }
        }
    }
}
export function findSuperConstructorAccesses(classDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, addNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
    let constructorSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getClassConstructorSymbol(Node__from_ast.Symbol(classDeclaration));
    if (constructorSymbol === undefined || Symbol__from_ast.$storageOf(((constructorSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0) {
        return;
    }
    const __gotots_range_14 = Symbol__from_ast.$storageOf(((constructorSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_14.length; __gotots_range_index_13++) {
        const __gotots_range_value_16 = __gotots_range_14.get(__gotots_range_index_13);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
        if (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructor$constant__from_ast()) {
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(decl);
            if (!(body === undefined)) {
                forEachDescendantOfKind(body, KindSuperKeyword$constant__from_ast(), (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
                    if (IsCallExpressionTarget__from_ast(node, false, false)) {
                        const __gotots_callee_44 = addNode;
                        const __gotots_argument_86 = node;
                        (__gotots_callee_44 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86);
                    }
                });
            }
        }
    }
}
export function forEachDescendantOfKind(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast, action: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined): void {
    Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === kind) {
            const __gotots_callee_45 = action;
            const __gotots_argument_87 = child;
            (__gotots_callee_45 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_87);
        }
        forEachDescendantOfKind(child, kind, action);
        return false;
    }));
}
