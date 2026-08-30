import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FindAncestorResult as FindAncestorResult__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, Kind as Kind__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SetAccessorDeclaration as SetAccessorDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast, FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestorTrue$constant as FindAncestorTrue$constant__from_ast, FindAncestor as FindAncestor__from_ast, GetAllAccessorDeclarationsForDeclaration as GetAllAccessorDeclarationsForDeclaration__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, HeritageClause as HeritageClause__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCallSignatureDeclaration as IsCallSignatureDeclaration__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsConstructSignatureDeclaration as IsConstructSignatureDeclaration__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsEntityName as IsEntityName__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExpressionWithTypeArguments as IsExpressionWithTypeArguments__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsHeritageClause as IsHeritageClause__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsIndexSignatureDeclaration as IsIndexSignatureDeclaration__from_ast, IsJSTypeAliasDeclaration as IsJSTypeAliasDeclaration__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsMethodSignatureDeclaration as IsMethodSignatureDeclaration__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPartOfTypeNode as IsPartOfTypeNode__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsReturnStatement as IsReturnStatement__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsStatement as IsStatement__from_ast, IsStatic as IsStatic__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsTypeQueryNode as IsTypeQueryNode__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, Kind_String as Kind_String__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, Symbol as Symbol__from_ast, ToFindAncestorResult as ToFindAncestorResult__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $state as $state__diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { SymbolAccessibilityCannotBeNamed$constant as SymbolAccessibilityCannotBeNamed$constant__from_printer, SymbolAccessibilityResult as SymbolAccessibilityResult__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetTextOfNode as GetTextOfNode__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { createDiagnosticForNode } from "./tracker.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class SymbolAccessibilityDiagnostic {
    declare private readonly $goType: void;
    public constructor(public errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public diagnosticMessage: {
        value: Message__from_diagnostics;
    } | undefined, public typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: SymbolAccessibilityDiagnostic): SymbolAccessibilityDiagnostic {
        return new SymbolAccessibilityDiagnostic($source.errorNode, $source.diagnosticMessage, $source.typeName);
    }
    declare private readonly then?: never;
}
export function wrapSimpleDiagnosticSelector(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, selector: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: SymbolAccessibilityResult__from_printer) => {
    value: Message__from_diagnostics;
} | undefined) | undefined): (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined {
    return (symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
        const __gotots_callee_1 = selector;
        const __gotots_argument_13 = node;
        const __gotots_argument_14 = SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult);
        let diagnosticMessage: {
            value: Message__from_diagnostics;
        } | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14);
        if (diagnosticMessage === undefined) {
            return void 0;
        }
        return new SymbolAccessibilityDiagnostic(node, diagnosticMessage, GetNameOfDeclaration__from_ast(node));
    };
}
export function wrapNamedDiagnosticSelector(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, selector: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: SymbolAccessibilityResult__from_printer) => {
    value: Message__from_diagnostics;
} | undefined) | undefined): (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined {
    return (symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
        const __gotots_callee_2 = selector;
        const __gotots_argument_15 = node;
        const __gotots_argument_16 = SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult);
        let diagnosticMessage: {
            value: Message__from_diagnostics;
        } | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16);
        if (diagnosticMessage === undefined) {
            return void 0;
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
        return new SymbolAccessibilityDiagnostic(name, diagnosticMessage, name);
    };
}
export function wrapFallbackErrorDiagnosticSelector(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, selector: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: SymbolAccessibilityResult__from_printer) => {
    value: Message__from_diagnostics;
} | undefined) | undefined): (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined {
    return (symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
        const __gotots_callee_3 = selector;
        const __gotots_argument_17 = node;
        const __gotots_argument_18 = SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult);
        let diagnosticMessage: {
            value: Message__from_diagnostics;
        } | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18);
        if (diagnosticMessage === undefined) {
            return void 0;
        }
        let errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
        if (errorNode === undefined) {
            errorNode = node;
        }
        return new SymbolAccessibilityDiagnostic(errorNode, diagnosticMessage, void 0);
    };
}
export function selectDiagnosticBasedOnModuleName(symbolAccessibilityResult: SymbolAccessibilityResult__from_printer, moduleNotNameable: {
    value: Message__from_diagnostics;
} | undefined, privateModule: {
    value: Message__from_diagnostics;
} | undefined, nonModule: {
    value: Message__from_diagnostics;
} | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    if (symbolAccessibilityResult.ErrorModuleName.length > 0) {
        if (symbolAccessibilityResult.Accessibility === SymbolAccessibilityCannotBeNamed$constant__from_printer()) {
            return moduleNotNameable;
        }
        return privateModule;
    }
    return nonModule;
}
export function selectDiagnosticBasedOnModuleNameNoNameCheck(symbolAccessibilityResult: SymbolAccessibilityResult__from_printer, privateModule: {
    value: Message__from_diagnostics;
} | undefined, nonModule: {
    value: Message__from_diagnostics;
} | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    if (symbolAccessibilityResult.ErrorModuleName.length > 0) {
        return privateModule;
    }
    return nonModule;
}
export function createGetSymbolAccessibilityDiagnosticForNodeName(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined {
    if (IsSetAccessorDeclaration__from_ast(node) || IsGetAccessorDeclaration__from_ast(node)) {
        return wrapSimpleDiagnosticSelector(node, getAccessorNameVisibilityDiagnosticMessage);
    }
    else if (IsMethodDeclaration__from_ast(node) || IsMethodSignatureDeclaration__from_ast(node)) {
        return wrapSimpleDiagnosticSelector(node, getMethodNameVisibilityDiagnosticMessage);
    }
    else {
        return createGetSymbolAccessibilityDiagnosticForNode(node);
    }
}
export function getAccessorNameVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    if (IsStatic__from_ast(node)) {
        return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1);
    }
    else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast()) {
        return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1);
    }
    else {
        return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1);
    }
}
export function getMethodNameVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    if (IsStatic__from_ast(node)) {
        return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_private_name_1);
    }
    else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast()) {
        return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Public_method_0_of_exported_class_has_or_is_using_private_name_1);
    }
    else {
        return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Method_0_of_exported_interface_has_or_is_using_private_name_1);
    }
}
export function createGetSymbolAccessibilityDiagnosticForNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined {
    if (IsVariableDeclaration__from_ast(node) || IsPropertyDeclaration__from_ast(node) || IsPropertySignatureDeclaration__from_ast(node) || IsPropertyAccessExpression__from_ast(node) || IsElementAccessExpression__from_ast(node) || IsBinaryExpression__from_ast(node) || IsBindingElement__from_ast(node) || IsConstructorDeclaration__from_ast(node)) {
        return wrapSimpleDiagnosticSelector(node, getVariableDeclarationTypeVisibilityDiagnosticMessage);
    }
    else if (IsSetAccessorDeclaration__from_ast(node) || IsGetAccessorDeclaration__from_ast(node)) {
        return wrapNamedDiagnosticSelector(node, getAccessorDeclarationTypeVisibilityDiagnosticMessage);
    }
    else if (IsConstructSignatureDeclaration__from_ast(node) || IsCallSignatureDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsMethodSignatureDeclaration__from_ast(node) || IsFunctionDeclaration__from_ast(node) || IsIndexSignatureDeclaration__from_ast(node)) {
        return wrapFallbackErrorDiagnosticSelector(node, getReturnTypeVisibilityDiagnosticMessage);
    }
    else if (IsParameterDeclaration__from_ast(node)) {
        if (IsParameterPropertyDeclaration__from_ast(node, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && HasSyntacticModifier__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ModifierFlagsPrivate$constant__from_ast())) {
            return wrapSimpleDiagnosticSelector(node, getVariableDeclarationTypeVisibilityDiagnosticMessage);
        }
        return wrapSimpleDiagnosticSelector(node, getParameterDeclarationTypeVisibilityDiagnosticMessage);
    }
    else if (IsTypeParameterDeclaration__from_ast(node)) {
        return wrapSimpleDiagnosticSelector(node, getTypeParameterConstraintVisibilityDiagnosticMessage);
    }
    else if (IsExpressionWithTypeArguments__from_ast(node)) {
        return (symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
            let diagnosticMessage: {
                value: Message__from_diagnostics;
            } | undefined = void 0;
            if (IsClassDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                if (IsHeritageClause__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindImplementsKeyword$constant__from_ast()) {
                    diagnosticMessage = $state__diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1;
                }
                else {
                    if (!(Node__from_ast.Name(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined)) {
                        diagnosticMessage = $state__diagnostics.X_extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
                    }
                    else {
                        diagnosticMessage = $state__diagnostics.X_extends_clause_of_exported_class_has_or_is_using_private_name_0;
                    }
                }
            }
            else {
                diagnosticMessage = $state__diagnostics.X_extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
            }
            return new SymbolAccessibilityDiagnostic(node, diagnosticMessage, GetNameOfDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
        };
    }
    else if (IsImportEqualsDeclaration__from_ast(node)) {
        return wrapSimpleDiagnosticSelector(node, ($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: SymbolAccessibilityResult__from_printer): {
            value: Message__from_diagnostics;
        } | undefined => {
            return $state__diagnostics.Import_declaration_0_is_using_private_name_1;
        });
    }
    else if (IsTypeAliasDeclaration__from_ast(node) || IsJSTypeAliasDeclaration__from_ast(node)) {
        return (symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
            let diagnosticMessage: {
                value: Message__from_diagnostics;
            } | undefined = selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2, $state__diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1);
            let errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(node);
            let typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(node);
            return new SymbolAccessibilityDiagnostic(errorNode, diagnosticMessage, typeName);
        };
    }
    else if (IsCallExpression__from_ast(node)) {
        return (symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
            let diagnosticMessage: {
                value: Message__from_diagnostics;
            } | undefined = selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Exported_variable_0_has_or_is_using_private_name_1);
            let errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Arguments(node).get(1);
            let typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Arguments(node).get(1);
            return new SymbolAccessibilityDiagnostic(errorNode, diagnosticMessage, typeName);
        };
    }
    else {
        const __gotots_argument_12 = new GoInterfaceAdapter("Attempted to set a declaration diagnostic context for unhandled node kind: " + Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
        GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function getVariableDeclarationTypeVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBindingElement$constant__from_ast()) {
        return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Exported_variable_0_has_or_is_using_private_name_1);
    }
    else if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindElementAccessExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertySignature$constant__from_ast() || (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast() && HasSyntacticModifier__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, ModifierFlagsPrivate$constant__from_ast()))) {
        if (IsStatic__from_ast(node)) {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1);
        }
        else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1);
        }
        else {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1);
        }
    }
    return void 0;
}
export function getAccessorDeclarationTypeVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast()) {
        if (IsStatic__from_ast(node)) {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1);
        }
        else {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1);
        }
    }
    else {
        if (IsStatic__from_ast(node)) {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1);
        }
        else {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1);
        }
    }
}
export function getReturnTypeVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindConstructSignature$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0);
            break;
        }
        case KindCallSignature$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0);
            break;
        }
        case KindIndexSignature$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0);
            break;
        }
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast(): {
            if (IsStatic__from_ast(node)) {
                return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named, $state__diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0);
            }
            else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast()) {
                return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named, $state__diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0);
            }
            else {
                return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0);
            }
            break;
        }
        case KindFunctionDeclaration$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named, $state__diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1, $state__diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0);
            break;
        }
        default: {
            const __gotots_argument_19 = new GoInterfaceAdapter("This is unknown kind for signature: " + Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
            GoPanic.raise(__gotots_argument_19 === undefined ? GoPanicNilValue.create() : __gotots_argument_19);
            break;
        }
    }
}
export function getParameterDeclarationTypeVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindConstructor$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1);
            break;
        }
        case KindConstructSignature$constant__from_ast():
        case KindConstructorType$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1);
            break;
        }
        case KindCallSignature$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1);
            break;
        }
        case KindIndexSignature$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1);
            break;
        }
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast(): {
            if (IsStatic__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1);
            }
            else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast()) {
                return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1);
            }
            else {
                return selectDiagnosticBasedOnModuleNameNoNameCheck(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1);
            }
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionType$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1);
            break;
        }
        case KindSetAccessor$constant__from_ast():
        case KindGetAccessor$constant__from_ast(): {
            return selectDiagnosticBasedOnModuleName(SymbolAccessibilityResult__from_printer.$copy(symbolAccessibilityResult), $state__diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named, $state__diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2, $state__diagnostics.Parameter_0_of_accessor_has_or_is_using_private_name_1);
            break;
        }
        default: {
            const __gotots_argument_20 = new GoInterfaceAdapter("Unknown parent for parameter: " + Kind_String__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
            GoPanic.raise(__gotots_argument_20 === undefined ? GoPanicNilValue.create() : __gotots_argument_20);
            break;
        }
    }
}
export function getTypeParameterConstraintVisibilityDiagnosticMessage(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, symbolAccessibilityResult: SymbolAccessibilityResult__from_printer): {
    value: Message__from_diagnostics;
} | undefined {
    switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassDeclaration$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
            break;
        }
        case KindInterfaceDeclaration$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case KindMappedType$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1;
            break;
        }
        case KindConstructorType$constant__from_ast():
        case KindConstructSignature$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case KindCallSignature$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
            break;
        }
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast(): {
            if (IsStatic__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return $state__diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
            }
            else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast()) {
                return $state__diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
            }
            else {
                return $state__diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
            }
            break;
        }
        case KindFunctionType$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
            break;
        }
        case KindInferType$constant__from_ast(): {
            return $state__diagnostics.Extends_clause_for_inferred_type_0_has_or_is_using_private_name_1;
            break;
        }
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSTypeAliasDeclaration$constant__from_ast(): {
            return $state__diagnostics.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1;
            break;
        }
        default: {
            const __gotots_argument_21 = new GoInterfaceAdapter("This is unknown parent for type parameter: " + Kind_String__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
            GoPanic.raise(__gotots_argument_21 === undefined ? GoPanicNilValue.create() : __gotots_argument_21);
            break;
        }
    }
}
export function getRelatedSuggestionByDeclarationKind(kind: Kind__from_ast): {
    value: Message__from_diagnostics;
} | undefined {
    switch (kind) {
        case KindArrowFunction$constant__from_ast(): {
            return $state__diagnostics.Add_a_return_type_to_the_function_expression;
            break;
        }
        case KindFunctionExpression$constant__from_ast(): {
            return $state__diagnostics.Add_a_return_type_to_the_function_expression;
            break;
        }
        case KindMethodDeclaration$constant__from_ast(): {
            return $state__diagnostics.Add_a_return_type_to_the_method;
            break;
        }
        case KindGetAccessor$constant__from_ast(): {
            return $state__diagnostics.Add_a_return_type_to_the_get_accessor_declaration;
            break;
        }
        case KindSetAccessor$constant__from_ast(): {
            return $state__diagnostics.Add_a_type_to_parameter_of_the_set_accessor_declaration;
            break;
        }
        case KindFunctionDeclaration$constant__from_ast(): {
            return $state__diagnostics.Add_a_return_type_to_the_function_declaration;
            break;
        }
        case KindConstructSignature$constant__from_ast(): {
            return $state__diagnostics.Add_a_return_type_to_the_function_declaration;
            break;
        }
        case KindParameter$constant__from_ast(): {
            return $state__diagnostics.Add_a_type_annotation_to_the_parameter_0;
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            return $state__diagnostics.Add_a_type_annotation_to_the_variable_0;
            break;
        }
        case KindPropertyDeclaration$constant__from_ast(): {
            return $state__diagnostics.Add_a_type_annotation_to_the_property_0;
            break;
        }
        case KindPropertySignature$constant__from_ast(): {
            return $state__diagnostics.Add_a_type_annotation_to_the_property_0;
            break;
        }
        case KindExportAssignment$constant__from_ast(): {
            return $state__diagnostics.Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function getErrorByDeclarationKind(kind: Kind__from_ast): {
    value: Message__from_diagnostics;
} | undefined {
    switch (kind) {
        case KindFunctionExpression$constant__from_ast(): {
            return $state__diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindFunctionDeclaration$constant__from_ast(): {
            return $state__diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            return $state__diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindMethodDeclaration$constant__from_ast(): {
            return $state__diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindConstructSignature$constant__from_ast(): {
            return $state__diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindGetAccessor$constant__from_ast(): {
            return $state__diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindSetAccessor$constant__from_ast(): {
            return $state__diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindParameter$constant__from_ast(): {
            return $state__diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            return $state__diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindPropertyDeclaration$constant__from_ast(): {
            return $state__diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindPropertySignature$constant__from_ast(): {
            return $state__diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
            break;
        }
        case KindComputedPropertyName$constant__from_ast(): {
            return $state__diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations;
            break;
        }
        case KindSpreadAssignment$constant__from_ast(): {
            return $state__diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case KindShorthandPropertyAssignment$constant__from_ast(): {
            return $state__diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            return $state__diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations;
            break;
        }
        case KindExportAssignment$constant__from_ast(): {
            return $state__diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations;
            break;
        }
        case KindSpreadElement$constant__from_ast(): {
            return $state__diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function isDeclarationEnoughForErrors(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsExportAssignment__from_ast(node) || IsStatement__from_ast(node) || IsVariableDeclaration__from_ast(node) || IsPropertyDeclaration__from_ast(node) || IsParameterDeclaration__from_ast(node);
}
export function isFunctionLikeAndNotConstructor(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsFunctionLikeDeclaration__from_ast(node) && !IsConstructorDeclaration__from_ast(node);
}
export function findNearestDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, isDeclarationEnoughForErrors);
    if (result === undefined) {
        return void 0;
    }
    if (IsExportAssignment__from_ast(result)) {
        return result;
    }
    if (IsReturnStatement__from_ast(result)) {
        return FindAncestor__from_ast(result, isFunctionLikeAndNotConstructor);
    }
    if (IsStatement__from_ast(result)) {
        return void 0;
    }
    return result;
}
export function createEntityInTypeNodeError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, $state__diagnostics.Type_containing_private_name_0_can_t_be_used_with_isolatedDeclarations, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(GetTextOfNode__from_scanner(node))]));
    addParentDeclarationRelatedInfo(node, diag);
    return diag;
}
export function addParentDeclarationRelatedInfo(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void {
    let parentDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findNearestDeclaration(node);
    if (parentDeclaration === undefined) {
        return;
    }
    let targetStr = "";
    if (!IsExportAssignment__from_ast(parentDeclaration) && !(Node__from_ast.Name(parentDeclaration) === undefined)) {
        targetStr = GetTextOfNode__from_scanner(Node__from_ast.Name(parentDeclaration));
    }
    Diagnostic__from_ast.AddRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, getRelatedSuggestionByDeclarationKind(Node__from_ast.$storageOf(((parentDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetStr)])));
}
export function createAccessorTypeError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let allDeclarations = GetAllAccessorDeclarationsForDeclaration__from_ast(node, Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations);
    let getAccessor: {
        value: GetAccessorDeclaration__from_ast;
    } | undefined = allDeclarations.GetAccessor;
    let setAccessor: {
        value: SetAccessorDeclaration__from_ast;
    } | undefined = allDeclarations.SetAccessor;
    let targetNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    if (IsSetAccessorDeclaration__from_ast(node) && Node__from_ast.Parameters(node).length > 0) {
        targetNode = Node__from_ast.Parameters(node).get(0);
    }
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(targetNode, getErrorByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.nil<GoInterface | undefined>());
    if (!(setAccessor === undefined)) {
        const __gotots_receiver_1 = diag;
        const __gotots_store_0 = NodeBase__from_ast.$storageOf((setAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_4 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_5 = getRelatedSuggestionByDeclarationKind((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((setAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase).NodeDefault)).Node)).Kind);
        const __gotots_argument_6 = RuntimeSlice.nil<GoInterface | undefined>();
        const __gotots_argument_7 = createDiagnosticForNode(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
        Diagnostic__from_ast.AddRelatedInfo(__gotots_receiver_1, __gotots_argument_7);
    }
    if (!(getAccessor === undefined)) {
        const __gotots_receiver_2 = diag;
        const __gotots_store_1 = NodeBase__from_ast.$storageOf((getAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_8 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_1, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_9 = getRelatedSuggestionByDeclarationKind((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((getAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase).NodeDefault)).Node)).Kind);
        const __gotots_argument_10 = RuntimeSlice.nil<GoInterface | undefined>();
        const __gotots_argument_11 = createDiagnosticForNode(__gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
        Diagnostic__from_ast.AddRelatedInfo(__gotots_receiver_2, __gotots_argument_11);
    }
    return diag;
}
export function createObjectLiteralError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, getErrorByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.nil<GoInterface | undefined>());
    addParentDeclarationRelatedInfo(node, diag);
    return diag;
}
export function createArrayLiteralError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, getErrorByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.nil<GoInterface | undefined>());
    addParentDeclarationRelatedInfo(node, diag);
    return diag;
}
export function createReturnTypeError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, getErrorByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.nil<GoInterface | undefined>());
    addParentDeclarationRelatedInfo(node, diag);
    Diagnostic__from_ast.AddRelatedInfo(diag, createDiagnosticForNode(node, getRelatedSuggestionByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.nil<GoInterface | undefined>()));
    return diag;
}
export function createBindingElementError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    return createDiagnosticForNode(node, $state__diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations, RuntimeSlice.nil<GoInterface | undefined>());
}
export function createVariableOrPropertyError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, getErrorByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.nil<GoInterface | undefined>());
    Diagnostic__from_ast.AddRelatedInfo(diag, createDiagnosticForNode(node, getRelatedSuggestionByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(GetTextOfNode__from_scanner(Node__from_ast.Name(node)))])));
    return diag;
}
export function createExpressionError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    return createExpressionErrorEx(node, void 0);
}
export function createClassExpressionError(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    return createExpressionErrorEx(node, $state__diagnostics.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations);
}
export function isParentForIDDIagnostic(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast {
    if (IsExportAssignment__from_ast(node)) {
        return FindAncestorTrue$constant__from_ast();
    }
    if (IsStatement__from_ast(node)) {
        return FindAncestorQuit$constant__from_ast();
    }
    return ToFindAncestorResult__from_ast(!IsParenthesizedExpression__from_ast(node) && !IsAssertionExpression__from_ast(node));
}
export function createExpressionErrorEx(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, diagnosticMessage: {
    value: Message__from_diagnostics;
} | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined {
    let parentDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findNearestDeclaration(node);
    if (parentDeclaration === undefined) {
        if (diagnosticMessage === undefined) {
            diagnosticMessage = $state__diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations;
        }
        return createDiagnosticForNode(node, diagnosticMessage, RuntimeSlice.nil<GoInterface | undefined>());
    }
    let targetStr = "";
    if (!IsExportAssignment__from_ast(parentDeclaration) && !(Node__from_ast.Name(parentDeclaration) === undefined)) {
        targetStr = GetTextOfNode__from_scanner(Node__from_ast.Name(parentDeclaration));
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, isParentForIDDIagnostic);
    if (tsonicTypeScriptRuntime.sameLocation(parentDeclaration, parent)) {
        if (diagnosticMessage === undefined) {
            diagnosticMessage = getErrorByDeclarationKind(Node__from_ast.$storageOf(((parentDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
        }
        let diag__shadow_1: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, diagnosticMessage, RuntimeSlice.nil<GoInterface | undefined>());
        Diagnostic__from_ast.AddRelatedInfo(diag__shadow_1, createDiagnosticForNode(parentDeclaration, getRelatedSuggestionByDeclarationKind(Node__from_ast.$storageOf(((parentDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetStr)])));
        return diag__shadow_1;
    }
    if (diagnosticMessage === undefined) {
        diagnosticMessage = $state__diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations;
    }
    let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, diagnosticMessage, RuntimeSlice.nil<GoInterface | undefined>());
    Diagnostic__from_ast.AddRelatedInfo(diag, createDiagnosticForNode(parentDeclaration, getRelatedSuggestionByDeclarationKind(Node__from_ast.$storageOf(((parentDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetStr)])));
    Diagnostic__from_ast.AddRelatedInfo(diag, createDiagnosticForNode(node, $state__diagnostics.Add_satisfies_and_a_type_assertion_to_this_expression_satisfies_T_as_T_to_make_the_type_explicit, RuntimeSlice.nil<GoInterface | undefined>()));
    return diag;
}
export function createGetIsolatedDeclarationErrors(resolver: EmitResolver__from_printer | undefined): (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined {
    let createParameterError: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        if (IsSetAccessorDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return createAccessorTypeError(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        }
        const __gotots_receiver_0 = resolver;
        const __gotots_argument_0 = node;
        const __gotots_argument_1 = void 0;
        const __gotots_argument_2 = void 0;
        let addUndefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_0).RequiresAddingImplicitUndefinedUnsafe(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        if (!addUndefined && !(Node__from_ast.Initializer(node) === undefined)) {
            return createExpressionError(node);
        }
        let message: {
            value: Message__from_diagnostics;
        } | undefined = getErrorByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
        if (addUndefined) {
            message = $state__diagnostics.Declaration_emit_for_this_parameter_requires_implicitly_adding_undefined_to_its_type_This_is_not_supported_with_isolatedDeclarations;
        }
        let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = createDiagnosticForNode(node, message, RuntimeSlice.nil<GoInterface | undefined>());
        let targetStr = GetTextOfNode__from_scanner(Node__from_ast.Name(node));
        Diagnostic__from_ast.AddRelatedInfo(diag, createDiagnosticForNode(node, getRelatedSuggestionByDeclarationKind(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(targetStr)])));
        return diag;
    };
    return (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
        let heritageClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, IsHeritageClause__from_ast);
        if (!(heritageClause === undefined)) {
            return createDiagnosticForNode(node, $state__diagnostics.Extends_clause_can_t_contain_an_expression_with_isolatedDeclarations, RuntimeSlice.nil<GoInterface | undefined>());
        }
        if (IsPartOfTypeNode__from_ast(node) || IsTypeQueryNode__from_ast(node)) {
            return createEntityInTypeNodeError(node);
        }
        if (IsEntityName__from_ast(node) || IsEntityNameExpression__from_ast(node)) {
            return createEntityInTypeNodeError(node);
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast(): {
                return createAccessorTypeError(node);
                break;
            }
            case KindComputedPropertyName$constant__from_ast():
            case KindShorthandPropertyAssignment$constant__from_ast():
            case KindSpreadAssignment$constant__from_ast(): {
                return createObjectLiteralError(node);
                break;
            }
            case KindArrayLiteralExpression$constant__from_ast():
            case KindSpreadElement$constant__from_ast(): {
                return createArrayLiteralError(node);
                break;
            }
            case KindMethodDeclaration$constant__from_ast():
            case KindConstructSignature$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindArrowFunction$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast(): {
                return createReturnTypeError(node);
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                return createBindingElementError(node);
                break;
            }
            case KindPropertyDeclaration$constant__from_ast():
            case KindVariableDeclaration$constant__from_ast(): {
                return createVariableOrPropertyError(node);
                break;
            }
            case KindParameter$constant__from_ast(): {
                const __gotots_callee_0 = createParameterError;
                const __gotots_argument_3 = node;
                return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                break;
            }
            case KindPropertyAssignment$constant__from_ast(): {
                return createExpressionError(Node__from_ast.Initializer(node));
                break;
            }
            case KindClassExpression$constant__from_ast(): {
                return createClassExpressionError(node);
                break;
            }
            default: {
                return createExpressionError(node);
                break;
            }
        }
    };
}
