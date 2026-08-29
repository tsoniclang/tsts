import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExportAssignment as ExportAssignment__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { DocumentSymbol as DocumentSymbol__from_lsproto, SymbolKind as SymbolKind__from_lsproto, WorkspaceSymbol as WorkspaceSymbol__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetDeclarationName as GetDeclarationName__from_ast, GetElementOrPropertyAccessName as GetElementOrPropertyAccessName__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsCallExpression as IsCallExpression__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExternalModule as IsExternalModule__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringOrNumericLiteralLike as IsStringOrNumericLiteralLike__from_ast, IsTemplateExpression as IsTemplateExpression__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSDocCallbackTag$constant as KindJSDocCallbackTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsParameterPropertyModifier$constant as ModifierFlagsParameterPropertyModifier$constant__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { MultiMap as MultiMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { CompareRanges as CompareRanges__from_lsproto, Location as Location__from_lsproto, Range as Range__from_lsproto, SymbolInformation as SymbolInformation__from_lsproto, SymbolInformationsOrWorkspaceSymbolsOrNull as SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto, SymbolKindClass$constant as SymbolKindClass$constant__from_lsproto, SymbolKindConstructor$constant as SymbolKindConstructor$constant__from_lsproto, SymbolKindEnum$constant as SymbolKindEnum$constant__from_lsproto, SymbolKindEnumMember$constant as SymbolKindEnumMember$constant__from_lsproto, SymbolKindFile$constant as SymbolKindFile$constant__from_lsproto, SymbolKindFunction$constant as SymbolKindFunction$constant__from_lsproto, SymbolKindInterface$constant as SymbolKindInterface$constant__from_lsproto, SymbolKindMethod$constant as SymbolKindMethod$constant__from_lsproto, SymbolKindModule$constant as SymbolKindModule$constant__from_lsproto, SymbolKindNamespace$constant as SymbolKindNamespace$constant__from_lsproto, SymbolKindProperty$constant as SymbolKindProperty$constant__from_lsproto, SymbolKindTypeParameter$constant as SymbolKindTypeParameter$constant__from_lsproto, SymbolKindVariable$constant as SymbolKindVariable$constant__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { EscapeString as EscapeString__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetTextOfNode as GetTextOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { CompareStringsCaseInsensitive as CompareStringsCaseInsensitive__from_stringutil, IsLineBreak as IsLineBreak__from_stringutil, TruncateByRunes as TruncateByRunes__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { MultiMap$Add$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/MultiMap$Add.js";
import { SortFunc$SliceOf_Named_ls$DeclarationInfo$Named_ls$DeclarationInfo, SortFunc$SliceOf_PointerTo_Named_lsproto$DocumentSymbol$PointerTo_Named_lsproto$DocumentSymbol } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_SliceOf_int, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile as GoMap } from "../../../../../../support/maps.js";
import { strPtrTo } from "./completions.js";
import { getContainerNode } from "./utilities.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringSlice } from "@gotots/runtime/string.js";
export function isPrototypeExpando(target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsAccessExpression__from_ast(target)) {
        let accessName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetElementOrPropertyAccessName__from_ast(target);
        return !(accessName === undefined) && Node__from_ast.Text(accessName) === "prototype";
    }
    return false;
}
export const maxLength$int: int = 150;
export function mergeExpandos(symbols: RuntimeSlice<{
    value: DocumentSymbol__from_lsproto;
} | undefined>): RuntimeSlice<{
    value: DocumentSymbol__from_lsproto;
} | undefined> {
    let mergedSymbols = RuntimeSlice.make<{
        value: DocumentSymbol__from_lsproto;
    } | undefined>(0, symbols.length, void 0);
    let nameToExpandoTargetIndex = MultiMap__from_collections.$fromStorage<gostring, int>({
        M: $goMap$MapOf_string_To_SliceOf_int.nil()
    });
    let nameToNamespaceIndex: GoMapValue<gostring, int> = GoMap__from_gotots_runtime.make<gostring, int>(0, 0, []);
    const __gotots_range_7 = symbols;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_7.length; __gotots_range_index_5++) {
        const __gotots_range_value_13 = __gotots_range_index_5;
        const __gotots_range_value_14 = __gotots_range_7.get(__gotots_range_index_5);
        let i = __gotots_range_value_13;
        let __go_symbol: {
            value: DocumentSymbol__from_lsproto;
        } | undefined = __gotots_range_value_14;
        if (isAnonymousName((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name)) {
            continue;
        }
        if ((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === SymbolKindClass$constant__from_lsproto() || (__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === SymbolKindFunction$constant__from_lsproto() || (__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === SymbolKindVariable$constant__from_lsproto()) {
            MultiMap$Add$string$int(nameToExpandoTargetIndex, (__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, i);
        }
        if ((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === SymbolKindNamespace$constant__from_lsproto()) {
            {
                const __gotots_results_2 = nameToNamespaceIndex.lookupOk((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name);
                let ok = __gotots_results_2[1];
                if (!ok) {
                    nameToNamespaceIndex.store((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name, i);
                }
            }
        }
    }
    const __gotots_range_8 = symbols;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
        const __gotots_range_value_15 = __gotots_range_index_6;
        const __gotots_range_value_16 = __gotots_range_8.get(__gotots_range_index_6);
        let i = __gotots_range_value_15;
        let __go_symbol: {
            value: DocumentSymbol__from_lsproto;
        } | undefined = __gotots_range_value_16;
        if (!((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children === undefined)) {
            let children = mergeExpandos((((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: DocumentSymbol__from_lsproto;
            } | undefined>>).value);
            const children$location = tsonicTypeScriptRuntime.boundLocation({}, () => children, children$next => children = children$next);
            (__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children =
                children$location;
        }
        if (isAnonymousName((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name)) {
            continue;
        }
        if ((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === SymbolKindProperty$constant__from_lsproto()) {
            let symbolsWithSameName = MultiMap__from_collections.Get<gostring, int>(nameToExpandoTargetIndex, (__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name);
            for (let j = symbolsWithSameName.length - 1; j >= 0; j--) {
                let targetIndex = symbolsWithSameName.get(j);
                let targetSymbol: {
                    value: DocumentSymbol__from_lsproto;
                } | undefined = symbols.get(targetIndex);
                mergeChildren(targetSymbol, __go_symbol);
                symbols.set(i, void 0);
            }
        }
        if ((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind === SymbolKindNamespace$constant__from_lsproto()) {
            {
                const __gotots_results_3 = nameToNamespaceIndex.lookupOk((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name);
                let targetIndex = __gotots_results_3[0];
                let ok = __gotots_results_3[1];
                if (ok && targetIndex !== i) {
                    let targetSymbol: {
                        value: DocumentSymbol__from_lsproto;
                    } | undefined = symbols.get(targetIndex);
                    mergeChildren(targetSymbol, __go_symbol);
                    symbols.set(i, void 0);
                }
            }
        }
    }
    const __gotots_range_9 = symbols;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
        const __gotots_range_value_17 = __gotots_range_9.get(__gotots_range_index_7);
        let __go_symbol: {
            value: DocumentSymbol__from_lsproto;
        } | undefined = __gotots_range_value_17;
        if (!(__go_symbol === undefined)) {
            mergedSymbols = mergedSymbols.append(void 0, [__go_symbol]);
        }
    }
    return mergedSymbols;
}
export function mergeChildren(target: {
    value: DocumentSymbol__from_lsproto;
} | undefined, source: {
    value: DocumentSymbol__from_lsproto;
} | undefined): void {
    if (!((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children === undefined)) {
        if ((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children === undefined) {
            (target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children = (source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
        }
        else {
            void (((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                mergeExpandos(goSliceAppendSlice<{
                    value: DocumentSymbol__from_lsproto;
                } | undefined>((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                    value: DocumentSymbol__from_lsproto;
                } | undefined>>).value, (((source ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                    value: DocumentSymbol__from_lsproto;
                } | undefined>>).value, void 0)));
            SortFunc$SliceOf_PointerTo_Named_lsproto$DocumentSymbol$PointerTo_Named_lsproto$DocumentSymbol((((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<RuntimeSlice<{
                value: DocumentSymbol__from_lsproto;
            } | undefined>>).value, (a: {
                value: DocumentSymbol__from_lsproto;
            } | undefined, b: {
                value: DocumentSymbol__from_lsproto;
            } | undefined): int => {
                return CompareRanges__from_lsproto(Range__from_lsproto.$copy((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range), Range__from_lsproto.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range));
            });
        }
    }
}
export function isAnonymousName(name: gostring): bool {
    return name === "<function>" || name === "<class>" || name === "export=" || name === "default" || name === "constructor" || name === "()" || name === "new()" || name === "[]" || strings__from_gostdlib.HasSuffix(name, ") callback");
}
export function getTextOfName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
        case KindPrivateIdentifier$constant__from_ast():
        case KindNumericLiteral$constant__from_ast(): {
            return Node__from_ast.Text(node);
            break;
        }
        case KindStringLiteral$constant__from_ast(): {
            return "\"" + EscapeString__from_printer(Node__from_ast.Text(node), 34) + "\"";
            break;
        }
        case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
            return "`" + EscapeString__from_printer(Node__from_ast.Text(node), 96) + "`";
            break;
        }
        case KindComputedPropertyName$constant__from_ast(): {
            if (IsStringOrNumericLiteralLike__from_ast(Node__from_ast.Expression(node))) {
                return getTextOfName(Node__from_ast.Expression(node));
            }
            break;
        }
    }
    return GetTextOfNode__from_scanner(node);
}
export function getUnnamedNodeLabel(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = WalkUpParenthesizedExpressions__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        if (!(parent === undefined) && IsExportAssignment__from_ast(parent)) {
            if ((Node__from_ast.AsExportAssignment(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals) {
                return "export=";
            }
            return "default";
        }
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast(): {
            if (!((Node__from_ast.ModifierFlags(node) & ModifierFlagsDefault$constant__from_ast()) >>> 0 === 0)) {
                return "default";
            }
            if (IsCallExpression__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                let name = getCallExpressionName(Node__from_ast.Expression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
                if (name !== "") {
                    name = cleanCallbackText(name);
                    if (name.length > maxLength$int) {
                        return name + " callback";
                    }
                    let args = cleanCallbackText(getCallExpressionLiteralArgs(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
                    return name + "(" + args + ") callback";
                }
            }
            return "<function>";
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast(): {
            if (!((Node__from_ast.ModifierFlags(node) & ModifierFlagsDefault$constant__from_ast()) >>> 0 === 0)) {
                return "default";
            }
            return "<class>";
            break;
        }
        case KindConstructor$constant__from_ast(): {
            return "constructor";
            break;
        }
        case KindCallSignature$constant__from_ast(): {
            return "()";
            break;
        }
        case KindConstructSignature$constant__from_ast(): {
            return "new()";
            break;
        }
        case KindIndexSignature$constant__from_ast(): {
            return "[]";
            break;
        }
    }
    return "";
}
export function getCallExpressionName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast():
        case KindPrivateIdentifier$constant__from_ast(): {
            return Node__from_ast.Text(node);
            break;
        }
        case KindPropertyAccessExpression$constant__from_ast(): {
            let left = getCallExpressionName(Node__from_ast.Expression(node));
            let right = getCallExpressionName(Node__from_ast.Name(node));
            if (left !== "") {
                return left + "." + right;
            }
            return right;
            break;
        }
    }
    return "";
}
export function getCallExpressionLiteralArgs(callExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    let parts = RuntimeSlice.nil<gostring>();
    const __gotots_range_10 = Node__from_ast.Arguments(callExpr);
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10.length; __gotots_range_index_8++) {
        const __gotots_range_value_18 = __gotots_range_10.get(__gotots_range_index_8);
        let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_18;
        if (IsStringLiteralLike__from_ast(arg) || IsTemplateExpression__from_ast(arg)) {
            parts = parts.append("", [GetTextOfNode__from_scanner(arg)]);
        }
    }
    return strings__from_gostdlib.Join(parts, ", ");
}
export function cleanCallbackText(text: gostring): gostring {
    let truncated = TruncateByRunes__from_stringutil(text, maxLength$int);
    if (truncated.length < text.length) {
        text = truncated + "...";
    }
    return strings__from_gostdlib.Map((r: int32): int32 => {
        if (IsLineBreak__from_stringutil(r)) {
            return -1;
        }
        return r;
    }, text);
}
export function getInteriorModule(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (; !(Node__from_ast.Body(node) === undefined) && IsModuleDeclaration__from_ast(Node__from_ast.Body(node));) {
        node = Node__from_ast.Body(node);
    }
    return node;
}
export function getModuleName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    let result = Node__from_ast.Text(Node__from_ast.Name(node));
    for (; !(Node__from_ast.Body(node) === undefined) && IsModuleDeclaration__from_ast(Node__from_ast.Body(node));) {
        node = Node__from_ast.Body(node);
        result = result + "." + Node__from_ast.Text(Node__from_ast.Name(node));
    }
    return result;
}
export type DeclarationInfo$Storage = {
    name: gostring;
    declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    matchScore: int;
};
export class DeclarationInfo implements GoContainerStoredValue<DeclarationInfo$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: DeclarationInfo$Storage) {
    }
    public static $storageOf($source: DeclarationInfo): DeclarationInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: DeclarationInfo$Storage): DeclarationInfo {
        return new DeclarationInfo($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get declaration(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.declaration;
    }
    public set declaration($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.declaration = $value;
    }
    public get matchScore(): int {
        return this.$storage.matchScore;
    }
    public set matchScore($value: int) {
        this.$storage.matchScore = $value;
    }
    declare readonly [$goContainerStorageType]: DeclarationInfo$Storage;
    static $copy($source: DeclarationInfo): DeclarationInfo {
        return new DeclarationInfo({
            name: $source.$storage.name,
            declaration: $source.$storage.declaration,
            matchScore: $source.$storage.matchScore
        });
    }
    static $zeroStorage(): DeclarationInfo$Storage {
        return {
            name: "",
            declaration: void 0,
            matchScore: 0
        };
    }
    declare private readonly then?: never;
}
export function ProvideWorkspaceSymbols(ctx: GoInterface | undefined, programs: RuntimeSlice<{
    value: Program__from_compiler;
} | undefined>, converters: {
    value: Converters__from_lsconv;
} | undefined, preferences: UserPreferences__from_lsutil, query: gostring): [
    SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let excludeLibrarySymbols = Tristate_IsTrue__from_core(preferences.ExcludeLibrarySymbolsInNavTo);
    let sourceFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = GoMap.make(0, []);
    const __gotots_range_0 = programs;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let program: {
            value: Program__from_compiler;
        } | undefined = __gotots_range_value_0;
        const __gotots_range_1 = Program__from_compiler.SourceFiles(program);
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_1;
            if ((Program__from_compiler.HasTSFile(program) || !((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) && !shouldExcludeFile(sourceFile, program, excludeLibrarySymbols)) {
                sourceFiles.store(SourceFile__from_ast.Path(sourceFile), sourceFile);
            }
        }
    }
    let infos = RuntimeSlice.nil<DeclarationInfo$Storage>();
    const __gotots_range_2 = sourceFiles;
    const __gotots_range_keys_0 = __gotots_range_2.keys();
    for (const __gotots_range_value_2 of __gotots_range_keys_0) {
        const __gotots_range_value_3 = __gotots_range_2.lookupOk(__gotots_range_value_2);
        if (!__gotots_range_value_3[1]) {
            continue;
        }
        const __gotots_range_value_4 = __gotots_range_value_3[0];
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_4;
        const __gotots_receiver_0 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined)) {
            return [SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$fromStorage({
                    SymbolInformations: void 0,
                    WorkspaceSymbols: void 0
                }), void 0];
        }
        let declarationMap: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>> = SourceFile__from_ast.GetDeclarationMap(sourceFile);
        const __gotots_range_3 = declarationMap;
        const __gotots_range_keys_1 = __gotots_range_3.keys();
        for (const __gotots_range_value_5 of __gotots_range_keys_1) {
            const __gotots_range_value_6 = __gotots_range_3.lookupOk(__gotots_range_value_5);
            if (!__gotots_range_value_6[1]) {
                continue;
            }
            const __gotots_range_value_7 = __gotots_range_value_5;
            const __gotots_range_value_8 = __gotots_range_value_6[0];
            let name = __gotots_range_value_7;
            let declarations = __gotots_range_value_8;
            let score = getMatchScore(name, query);
            if (score >= 0) {
                const __gotots_range_4 = declarations;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_4.length; __gotots_range_index_2++) {
                    const __gotots_range_value_9 = __gotots_range_4.get(__gotots_range_index_2);
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_9;
                    const __gotots_slice_build_0 = infos;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void DeclarationInfo.$storageOf, (void DeclarationInfo.$fromStorage,
                            {
                                name: name,
                                declaration: declaration,
                                matchScore: score
                            })));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<DeclarationInfo$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, DeclarationInfo.$storageOf(DeclarationInfo.$copy(DeclarationInfo.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void DeclarationInfo.$storageOf, (void DeclarationInfo.$fromStorage,
                            {
                                name: name,
                                declaration: declaration,
                                matchScore: score
                            })));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, DeclarationInfo.$zeroStorage());
                        }
                    }
                    infos = __gotots_slice_build_1;
                }
            }
        }
    }
    SortFunc$SliceOf_Named_ls$DeclarationInfo$Named_ls$DeclarationInfo(infos, compareDeclarationInfos);
    let count = globalThis.Math.min(infos.length, 256);
    let symbols = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<SymbolInformation__from_lsproto> | undefined>(count, null, void 0);
    const symbols$location = tsonicTypeScriptRuntime.boundLocation({}, () => symbols, symbols$next => symbols = symbols$next);
    const __gotots_range_5 = infos.slice(0, count, null);
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_5.length; __gotots_range_index_3++) {
        const __gotots_range_value_10 = __gotots_range_index_3;
        const __gotots_range_value_11 = DeclarationInfo.$copy(DeclarationInfo.$fromStorage(__gotots_range_5.get(__gotots_range_index_3)));
        let i = __gotots_range_value_10;
        let info = __gotots_range_value_11;
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationInfo.$storageOf(info).declaration;
        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
        let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainerNode(DeclarationInfo.$storageOf(info).declaration);
        let containerName: tsonicTypeScriptRuntime.Location<gostring> | undefined = void 0;
        if (!(container === undefined)) {
            containerName = strPtrTo(GetDeclarationName__from_ast(container));
        }
        let nameNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
        let nameStart = GetStartOfNode__from_astnav(nameNode, sourceFile, false);
        let nameRange = NewTextRange__from_core(nameStart, Node__from_ast.End(nameNode));
        let __go_symbol = SymbolInformation__from_lsproto.$zero();
        const __go_symbol$location = tsonicTypeScriptRuntime.boundLocation({}, () => __go_symbol, __go_symbol$next => __go_symbol = __go_symbol$next);
        SymbolInformation__from_lsproto.$storageOf(__go_symbol).Name = DeclarationInfo.$storageOf(info).name;
        SymbolInformation__from_lsproto.$storageOf(__go_symbol).Kind = getSymbolKindFromNode(DeclarationInfo.$storageOf(info).declaration);
        SymbolInformation__from_lsproto.$storageOf(__go_symbol).Location = Location__from_lsproto.$storageOf(Converters__from_lsconv.ToLSPLocation(converters, new GoInterfaceAdapter(sourceFile), TextRange__from_core.$copy(nameRange)));
        SymbolInformation__from_lsproto.$storageOf(__go_symbol).ContainerName = containerName;
        symbols.set(i, __go_symbol$location);
    }
    return [SymbolInformationsOrWorkspaceSymbolsOrNull__from_lsproto.$fromStorage({
            SymbolInformations: symbols$location,
            WorkspaceSymbols: void 0
        }), void 0];
}
export function shouldExcludeFile(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, program: {
    value: Program__from_compiler;
} | undefined, excludeLibrarySymbols: bool): bool {
    return excludeLibrarySymbols && (isInsideNodeModules(SourceFile__from_ast.FileName(file)) || Program__from_compiler.IsLibFile(program, file));
}
export function isInsideNodeModules(fileName: gostring): bool {
    return strings__from_gostdlib.Contains(fileName, "/node_modules/");
}
export function getMatchScore(s: gostring, pattern: gostring): int {
    let score = 0;
    const __gotots_range_6 = pattern;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_6.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_6, __gotots_range_index_4);
        const __gotots_range_value_12 = __gotots_range_decode_0[0];
        let p = __gotots_range_value_12;
        __gotots_range_index_4 += __gotots_range_decode_0[1];
        let exact = unicode__from_gostdlib.IsUpper(p);
        for (;;) {
            const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(s);
            const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
                int32,
                int
            ];
            let c = __gotots_results_1[0];
            let size = __gotots_results_1[1];
            if (size === 0) {
                return -1;
            }
            s = goStringSlice(s, size);
            if (exact && c === p || !exact && unicode__from_gostdlib.ToLower(c) === unicode__from_gostdlib.ToLower(p)) {
                break;
            }
            score++;
        }
    }
    return score;
}
export function compareDeclarationInfos(d1: DeclarationInfo, d2: DeclarationInfo): int {
    if (DeclarationInfo.$storageOf(d1).matchScore !== DeclarationInfo.$storageOf(d2).matchScore) {
        return DeclarationInfo.$storageOf(d1).matchScore - DeclarationInfo.$storageOf(d2).matchScore;
    }
    {
        let c = CompareStringsCaseInsensitive__from_stringutil(DeclarationInfo.$storageOf(d1).name, DeclarationInfo.$storageOf(d2).name);
        if (c !== 0) {
            return c;
        }
    }
    {
        let c = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(DeclarationInfo.$storageOf(d1).name, DeclarationInfo.$storageOf(d2).name)));
        if (c !== 0) {
            return c;
        }
    }
    let s1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(DeclarationInfo.$storageOf(d1).declaration);
    let s2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(DeclarationInfo.$storageOf(d2).declaration);
    if (!tsonicTypeScriptRuntime.sameLocation(s1, s2)) {
        return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(SourceFile__from_ast.Path(s1).$value, SourceFile__from_ast.Path(s2).$value)));
    }
    return Node__from_ast.Pos(DeclarationInfo.$storageOf(d1).declaration) - Node__from_ast.Pos(DeclarationInfo.$storageOf(d2).declaration);
}
export function getSymbolKindFromNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SymbolKind__from_lsproto {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindSourceFile$constant__from_ast(): {
            if (IsExternalModule__from_ast(Node__from_ast.AsSourceFile(node))) {
                return SymbolKindModule$constant__from_lsproto();
            }
            return SymbolKindFile$constant__from_lsproto();
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            return SymbolKindNamespace$constant__from_lsproto();
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast(): {
            return SymbolKindClass$constant__from_lsproto();
            break;
        }
        case KindInterfaceDeclaration$constant__from_ast(): {
            return SymbolKindInterface$constant__from_lsproto();
            break;
        }
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSDocTypedefTag$constant__from_ast():
        case KindJSDocCallbackTag$constant__from_ast(): {
            return SymbolKindClass$constant__from_lsproto();
            break;
        }
        case KindEnumDeclaration$constant__from_ast(): {
            return SymbolKindEnum$constant__from_lsproto();
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            return SymbolKindVariable$constant__from_lsproto();
            break;
        }
        case KindArrowFunction$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast(): {
            return SymbolKindFunction$constant__from_lsproto();
            break;
        }
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            return SymbolKindProperty$constant__from_lsproto();
            break;
        }
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast(): {
            return SymbolKindMethod$constant__from_lsproto();
            break;
        }
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindShorthandPropertyAssignment$constant__from_ast():
        case KindSpreadAssignment$constant__from_ast():
        case KindIndexSignature$constant__from_ast(): {
            return SymbolKindProperty$constant__from_lsproto();
            break;
        }
        case KindCallSignature$constant__from_ast(): {
            return SymbolKindMethod$constant__from_lsproto();
            break;
        }
        case KindConstructSignature$constant__from_ast(): {
            return SymbolKindConstructor$constant__from_lsproto();
            break;
        }
        case KindConstructor$constant__from_ast():
        case KindClassStaticBlockDeclaration$constant__from_ast(): {
            return SymbolKindConstructor$constant__from_lsproto();
            break;
        }
        case KindTypeParameter$constant__from_ast(): {
            return SymbolKindTypeParameter$constant__from_lsproto();
            break;
        }
        case KindEnumMember$constant__from_ast(): {
            return SymbolKindEnumMember$constant__from_lsproto();
            break;
        }
        case KindParameter$constant__from_ast(): {
            if (HasSyntacticModifier__from_ast(node, ModifierFlagsParameterPropertyModifier$constant__from_ast())) {
                return SymbolKindProperty$constant__from_lsproto();
            }
            return SymbolKindVariable$constant__from_lsproto();
            break;
        }
        case KindBinaryExpression$constant__from_ast():
        case KindCallExpression$constant__from_ast(): {
            let kind = GetAssignmentDeclarationKind__from_ast(node);
            switch (kind.$value) {
                case 3:
                case 4:
                case 5: {
                    return SymbolKindProperty$constant__from_lsproto();
                    break;
                }
            }
            break;
        }
        case KindStringLiteral$constant__from_ast():
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindNumericLiteral$constant__from_ast(): {
            return SymbolKindProperty$constant__from_lsproto();
            break;
        }
    }
    return SymbolKindVariable$constant__from_lsproto();
}
