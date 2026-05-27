/**
 * Symbol-accessibility diagnostic selectors for declaration emit.
 *
 * Port skeleton of TS-Go `internal/transformers/declarations/diagnostics.go`
 * (~717 LoC). The Go file is a long table of node-kind → diagnostic-
 * message mappings used when a private type leaks into the declaration
 * surface. The skeleton below exposes the public API
 * (`createGetSymbolAccessibilityDiagnosticForNode(Name)`,
 * `createGetIsolatedDeclarationErrors`) with stubbed bodies that
 * fall back to a generic message. The full table will be filled in as
 * tests demand finer error fidelity.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, Diagnostic } from "../../ast/index.js";
import {
  nodeName, nodeParent, hasSyntacticModifier, getNodeName as _getNodeName,
} from "../../ast/index.js";
import {
  isVariableDeclaration, isPropertyDeclaration, isPropertyAccessExpression,
  isElementAccessExpression, isBinaryExpression, isBindingElement,
  isConstructorDeclaration, isSetAccessorDeclaration, isGetAccessorDeclaration,
  isMethodDeclaration, isFunctionDeclaration, isIndexSignatureDeclaration,
  isParameterDeclaration, isTypeParameterDeclaration,
  isExpressionWithTypeArguments, isImportEqualsDeclaration,
  isTypeAliasDeclaration,
  isDeclaration,
} from "../../ast/index.js";
import { isParameterPropertyDeclaration } from "../../ast/index.js";
import { Kind } from "../../ast/index.js";

const SymbolAccessibility = { CannotBeNamed: 1 } as const;

// Strada predicates we implement locally — kind-dispatch + field reads.
function isFunctionLike(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind ?? 0;
  return k === Kind.FunctionDeclaration || k === Kind.FunctionExpression
    || k === Kind.ArrowFunction || k === Kind.MethodDeclaration
    || k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor;
}
function makeDiagnostic(node: AstNode, message: DiagnosticMessage): Diagnostic {
  return { file: node, start: 0, length: 0, messageText: message.message, category: 1, code: message.code } as unknown as Diagnostic;
}
function getNameOfDeclaration(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  return _getNodeName(node) ?? undefined;
}
function nodeType(node: AstNode | undefined): AstNode | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}
function isStatic(node: AstNode): boolean {
  return hasSyntacticModifier(node, 1 << 8 /* ModifierFlags.Static */);
}
function isPropertySignatureDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && (node as { kind?: number }).kind === Kind.PropertySignature;
}
function isMethodSignatureDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && (node as { kind?: number }).kind === Kind.MethodSignature;
}
function isConstructSignatureDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && (node as { kind?: number }).kind === Kind.ConstructSignature;
}
function isCallSignatureDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && (node as { kind?: number }).kind === Kind.CallSignature;
}
function isJSTypeAliasDeclaration(_node: AstNode): boolean { return false; }
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import type { GetSymbolAccessibilityDiagnostic, SymbolAccessibilityResult, SymbolAccessibilityErrorInfo, DiagnosticMessage, EmitResolver } from "./tracker.js";

export interface SymbolAccessibilityDiagnostic {
  errorNode: AstNode;
  diagnosticMessage: DiagnosticMessage;
  typeName?: AstNode | undefined;
}

export function wrapSimpleDiagnosticSelector(
  node: AstNode,
  selector: (node: AstNode, result: SymbolAccessibilityResult) => DiagnosticMessage | undefined,
): GetSymbolAccessibilityDiagnostic {
  return (result) => {
    const diagnosticMessage = selector(node, result);
    if (diagnosticMessage === undefined) return undefined;
    return { errorNode: node, diagnosticMessage, typeName: getNameOfDeclaration(node) } as unknown as SymbolAccessibilityErrorInfo;
  };
}

export function wrapNamedDiagnosticSelector(
  node: AstNode,
  selector: (node: AstNode, result: SymbolAccessibilityResult) => DiagnosticMessage | undefined,
): GetSymbolAccessibilityDiagnostic {
  return (result) => {
    const diagnosticMessage = selector(node, result);
    if (diagnosticMessage === undefined) return undefined;
    const name = getNameOfDeclaration(node);
    return { errorNode: name ?? node, diagnosticMessage, typeName: name } as unknown as SymbolAccessibilityErrorInfo;
  };
}

export function wrapFallbackErrorDiagnosticSelector(
  node: AstNode,
  selector: (node: AstNode, result: SymbolAccessibilityResult) => DiagnosticMessage | undefined,
): GetSymbolAccessibilityDiagnostic {
  return (result) => {
    const diagnosticMessage = selector(node, result);
    if (diagnosticMessage === undefined) return undefined;
    return { errorNode: getNameOfDeclaration(node) ?? node, diagnosticMessage, typeName: undefined } as unknown as SymbolAccessibilityErrorInfo;
  };
}

export function selectDiagnosticBasedOnModuleName(
  result: SymbolAccessibilityResult,
  moduleNotNameable: DiagnosticMessage,
  privateModule: DiagnosticMessage,
  nonModule: DiagnosticMessage,
): DiagnosticMessage {
  if (result.errorModuleName.length > 0) {
    if (result.accessibility === SymbolAccessibility.CannotBeNamed) return moduleNotNameable;
    return privateModule;
  }
  return nonModule;
}

export function selectDiagnosticBasedOnModuleNameNoNameCheck(
  result: SymbolAccessibilityResult,
  privateModule: DiagnosticMessage,
  nonModule: DiagnosticMessage,
): DiagnosticMessage {
  return result.errorModuleName.length > 0 ? privateModule : nonModule;
}

export function createGetSymbolAccessibilityDiagnosticForNodeName(node: AstNode): GetSymbolAccessibilityDiagnostic {
  if (isSetAccessorDeclaration(node) || isGetAccessorDeclaration(node)) {
    return wrapSimpleDiagnosticSelector(node, getAccessorNameVisibilityDiagnosticMessage);
  }
  if (isMethodDeclaration(node) || isMethodSignatureDeclaration(node)) {
    return wrapSimpleDiagnosticSelector(node, getMethodNameVisibilityDiagnosticMessage);
  }
  return createGetSymbolAccessibilityDiagnosticForNode(node);
}

export function createGetSymbolAccessibilityDiagnosticForNode(node: AstNode): GetSymbolAccessibilityDiagnostic {
  if (
    isVariableDeclaration(node) || isPropertyDeclaration(node) || isPropertySignatureDeclaration(node) ||
    isPropertyAccessExpression(node) || isElementAccessExpression(node) || isBinaryExpression(node) ||
    isBindingElement(node) || isConstructorDeclaration(node)
  ) {
    return wrapSimpleDiagnosticSelector(node, getVariableDeclarationTypeVisibilityDiagnosticMessage);
  }
  if (isSetAccessorDeclaration(node) || isGetAccessorDeclaration(node)) {
    return wrapNamedDiagnosticSelector(node, getAccessorDeclarationTypeVisibilityDiagnosticMessage);
  }
  if (isConstructSignatureDeclaration(node) || isCallSignatureDeclaration(node) || isMethodDeclaration(node) ||
      isMethodSignatureDeclaration(node) || isFunctionDeclaration(node) || isIndexSignatureDeclaration(node)) {
    return wrapFallbackErrorDiagnosticSelector(node, getReturnTypeVisibilityDiagnosticMessage);
  }
  if (isParameterDeclaration(node)) {
    if (isParameterPropertyDeclaration(node, nodeParent(node)!) && hasSyntacticModifier(nodeParent(node)!, ModifierFlags.Private)) {
      return wrapSimpleDiagnosticSelector(node, getVariableDeclarationTypeVisibilityDiagnosticMessage);
    }
    return wrapSimpleDiagnosticSelector(node, getParameterDeclarationTypeVisibilityDiagnosticMessage);
  }
  if (isTypeParameterDeclaration(node)) {
    return wrapSimpleDiagnosticSelector(node, getTypeParameterConstraintVisibilityDiagnosticMessage);
  }
  if (isExpressionWithTypeArguments(node)) {
    return (_result) => ({
      errorNode: node,
      diagnosticMessage: Diagnostics.Generic_inaccessible_symbol_error,
      typeName: undefined,
    } as unknown as SymbolAccessibilityErrorInfo);
  }
  if (isImportEqualsDeclaration(node)) {
    return wrapSimpleDiagnosticSelector(node, () => Diagnostics.Import_declaration_0_is_using_private_name_1);
  }
  if (isTypeAliasDeclaration(node) || isJSTypeAliasDeclaration(node)) {
    return (_result) => ({
      errorNode: nodeType(node) ?? node,
      diagnosticMessage: Diagnostics.Generic_inaccessible_symbol_error,
      typeName: nodeName(node),
    } as unknown as SymbolAccessibilityErrorInfo);
  }
  // Fallback for unhandled node kinds.
  return (_result) => ({
    errorNode: node,
    diagnosticMessage: Diagnostics.Generic_inaccessible_symbol_error,
    typeName: undefined,
  } as unknown as SymbolAccessibilityErrorInfo);
}

function getAccessorNameVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  if (isStatic(node)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1);
  }
  const parent = nodeParent(node)!;
  if (parent.kind === Kind.ClassDeclaration) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1);
  }
  return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
    Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2,
    Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1);
}

function getMethodNameVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  if (isStatic(node)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_private_name_1);
  }
  const parent = nodeParent(node)!;
  if (parent.kind === Kind.ClassDeclaration) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Public_method_0_of_exported_class_has_or_is_using_private_name_1);
  }
  return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
    Diagnostics.Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2,
    Diagnostics.Method_0_of_exported_interface_has_or_is_using_private_name_1);
}

// Type-visibility message selectors. Mirror Strada's per-node-kind
// switch over modifier flags + parent kind to pick the most specific
// message. Each fall-back goes to Generic_inaccessible_symbol_error.

function getVariableDeclarationTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  if (isVariableDeclaration(node) || isBindingElement(node) || isPropertyAccessExpression(node) || isElementAccessExpression(node) || isBinaryExpression(node)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Exported_variable_0_has_or_is_using_private_name_1);
  }
  if (isPropertyDeclaration(node) || isPropertySignatureDeclaration(node)) {
    if (isStatic(node)) {
      return selectDiagnosticBasedOnModuleName(result,
        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
        Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1);
    }
    const parent = nodeParent(node);
    if (parent !== undefined && parent.kind === Kind.ClassDeclaration) {
      return selectDiagnosticBasedOnModuleName(result,
        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2,
        Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1);
    }
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
      Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1);
  }
  return Diagnostics.Generic_inaccessible_symbol_error;
}

function getAccessorDeclarationTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  if (isSetAccessorDeclaration(node)) {
    if (isStatic(node)) {
      return selectDiagnosticBasedOnModuleName(result,
        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1);
    }
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Parameter_type_of_public_setter_0_from_exported_class_has_or_is_using_private_name_1);
  }
  if (isStatic(node)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Return_type_of_public_static_getter_0_from_exported_class_has_or_is_using_private_name_1);
  }
  return selectDiagnosticBasedOnModuleName(result,
    Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
    Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
    Diagnostics.Return_type_of_public_getter_0_from_exported_class_has_or_is_using_private_name_1);
}

function getReturnTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  if (isConstructSignatureDeclaration(node)) {
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
      Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
      Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0);
  }
  if (isCallSignatureDeclaration(node)) {
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
      Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
      Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0);
  }
  if (isIndexSignatureDeclaration(node)) {
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
      Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
      Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0);
  }
  if (isMethodDeclaration(node)) {
    if (isStatic(node)) {
      return selectDiagnosticBasedOnModuleName(result,
        Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named,
        Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1,
        Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0);
    }
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named,
      Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1,
      Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0);
  }
  if (isMethodSignatureDeclaration(node)) {
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
      Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1,
      Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0);
  }
  if (isFunctionDeclaration(node)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named,
      Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1,
      Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0);
  }
  return Diagnostics.Generic_inaccessible_symbol_error;
}

function getParameterDeclarationTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  const parent = nodeParent(node);
  if (parent === undefined) return Diagnostics.Generic_inaccessible_symbol_error;
  if (isConstructorDeclaration(parent)) {
    if (isStatic(parent)) {
      return selectDiagnosticBasedOnModuleName(result,
        Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
        Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2,
        Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1);
    }
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1);
  }
  if (isConstructSignatureDeclaration(parent) || isCallSignatureDeclaration(parent)) {
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
      Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1);
  }
  if (isMethodDeclaration(parent) || isMethodSignatureDeclaration(parent)) {
    if (isStatic(parent)) {
      return selectDiagnosticBasedOnModuleName(result,
        Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
        Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2,
        Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1);
    }
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1);
  }
  if (isFunctionDeclaration(parent)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1);
  }
  return Diagnostics.Generic_inaccessible_symbol_error;
}

function getTypeParameterConstraintVisibilityDiagnosticMessage(node: AstNode, _result: SymbolAccessibilityResult): DiagnosticMessage {
  const parent = nodeParent(node);
  if (parent === undefined) return Diagnostics.Generic_inaccessible_symbol_error;
  switch (parent.kind) {
    case Kind.ClassDeclaration:
      return Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
    case Kind.InterfaceDeclaration:
      return Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
    case Kind.MappedType:
      return Diagnostics.Type_parameter_0_of_exported_mapped_object_type_is_using_private_name_1;
    case Kind.ConstructorType:
    case Kind.ConstructSignature:
      return Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
    case Kind.CallSignature:
      return Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
      if (isStatic(parent)) {
        return Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
      }
      if (parent.kind === Kind.MethodDeclaration) {
        return Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
      }
      return Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
    case Kind.FunctionType:
    case Kind.FunctionDeclaration:
      return Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
    case Kind.InferType:
      return Diagnostics.Extends_clause_for_inferred_type_0_has_or_is_using_private_name_1;
    case Kind.TypeAliasDeclaration:
    case Kind.JSTypeAliasDeclaration:
      return Diagnostics.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1;
    default:
      return Diagnostics.Generic_inaccessible_symbol_error;
  }
}

// ---------------------------------------------------------------------------
// Declaration-kind → message suggestion / error mappings
// ---------------------------------------------------------------------------

export function getRelatedSuggestionByDeclarationKind(kind: number): DiagnosticMessage | undefined {
  switch (kind) {
    case Kind.Parameter:
      return Diagnostics.Add_a_type_annotation_to_the_parameter_0;
    case Kind.VariableDeclaration:
    case Kind.BindingElement:
      return Diagnostics.Add_a_type_annotation_to_the_variable_0;
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      return Diagnostics.Add_a_type_annotation_to_the_property_0;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return Diagnostics.Add_a_return_type_to_the_accessor_0;
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
      return Diagnostics.Add_a_return_type_to_the_method;
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
      return Diagnostics.Add_a_return_type_to_the_function;
  }
  return undefined;
}

export function getErrorByDeclarationKind(kind: number): DiagnosticMessage | undefined {
  switch (kind) {
    case Kind.VariableDeclaration:
    case Kind.BindingElement:
      return Diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.Parameter:
      return Diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      return Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return Diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.MethodDeclaration:
    case Kind.FunctionDeclaration:
    case Kind.MethodSignature:
      return Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Predicate + nearest-declaration helpers
// ---------------------------------------------------------------------------

export function isDeclarationEnoughForErrors(node: AstNode): boolean {
  void node;
  return false;
}

export function isFunctionLikeAndNotConstructor(node: AstNode): boolean {
  return isFunctionLike(node) && !isConstructorDeclaration(node);
}

export function findNearestDeclaration(node: AstNode | undefined): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (isDeclaration(current)) return current;
    current = nodeParent(current);
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Error creators
// ---------------------------------------------------------------------------

export function createEntityInTypeNodeError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations);
}

export function addParentDeclarationRelatedInfo(node: AstNode, diag: Diagnostic): void {
  void node; void diag;
}

export function createAccessorTypeError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations);
}

export function createObjectLiteralError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.Object_literal_must_be_cast_to_an_explicit_type_with_isolatedDeclarations);
}

export function createArrayLiteralError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.Array_literal_must_be_cast_to_an_explicit_type_with_isolatedDeclarations);
}

export function createReturnTypeError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations);
}

export function createBindingElementError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.Binding_elements_can_t_be_exported_directly_with_isolatedDeclarations);
}

export function createVariableOrPropertyError(node: AstNode): Diagnostic {
  return createExpressionErrorEx(node, Diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations);
}

export function createExpressionError(node: AstNode): Diagnostic {
  return createExpressionErrorEx(node, Diagnostics.Expression_type_can_t_be_inferred_with_isolatedDeclarations);
}

export function createClassExpressionError(node: AstNode): Diagnostic {
  return makeDiagnostic(node, Diagnostics.Inference_from_class_expressions_is_not_supported_with_isolatedDeclarations);
}

export function createExpressionErrorEx(node: AstNode, diagnosticMessage: DiagnosticMessage): Diagnostic {
  return makeDiagnostic(node, diagnosticMessage);
}

// ---------------------------------------------------------------------------
// Isolated-declaration error factory
// ---------------------------------------------------------------------------

export function createGetIsolatedDeclarationErrors(_resolver: EmitResolver): (node: AstNode) => Diagnostic {
  return (node) => {
    const nearest = findNearestDeclaration(node);
    if (nearest === undefined) return createExpressionError(node);
    const msg = getErrorByDeclarationKind(nearest.kind);
    if (msg !== undefined) return makeDiagnostic(nearest, msg);
    return createExpressionError(node);
  };
}

// Diagnostics catalog imported via a permissive Record. The actual
// catalog lives in diagnostics/diagnostics_generated.ts; using a typed
// import here would couple this file to the catalog's exact key set.
// Under noUncheckedIndexedAccess, untyped record lookups return
// `T | undefined`, so the callers below treat undefined as a fallback
// to the generic accessibility message.
import { Diagnostics as DiagnosticsCatalog } from "../../diagnostics/diagnostics_generated.js";
const Diagnostics = DiagnosticsCatalog;

