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
  isClassDeclaration, isHeritageClause,
} from "../../ast/index.js";
import { isParameterPropertyDeclaration } from "../../ast/index.js";
import { Kind } from "../../ast/index.js";

const SymbolAccessibility = { CannotBeNamed: 1 } as const;

// TS-Go predicates we implement locally — kind-dispatch + field reads.
function isFunctionLike(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind ?? 0;
  return k === Kind.FunctionDeclaration || k === Kind.FunctionExpression
    || k === Kind.ArrowFunction || k === Kind.MethodDeclaration
    || k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor;
}
function makeDiagnostic(node: AstNode, message: DiagnosticMessage | undefined): Diagnostic {
  return { file: node, start: 0, length: 0, messageText: message?.message, category: 1, code: message?.code } as unknown as Diagnostic;
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
    // unique node selection behavior, inline closure
    return (_result) => {
      const parent = nodeParent(node);
      const grandParent = parent !== undefined ? nodeParent(parent) : undefined;
      // Heritage clause is written by user so it can always be named
      const diagnosticMessage = grandParent !== undefined && isClassDeclaration(grandParent)
        ? (parent !== undefined && isHeritageClause(parent) && parent.token === Kind.ImplementsKeyword
            ? Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1
            : (getNameOfDeclaration(grandParent) !== undefined
                ? Diagnostics.X_extends_clause_of_exported_class_0_has_or_is_using_private_name_1
                : Diagnostics.X_extends_clause_of_exported_class_has_or_is_using_private_name_0))
        : Diagnostics.X_extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
      return {
        errorNode: node,
        diagnosticMessage,
        typeName: grandParent !== undefined ? getNameOfDeclaration(grandParent) : undefined,
      } as unknown as SymbolAccessibilityErrorInfo;
    };
  }
  if (isImportEqualsDeclaration(node)) {
    return wrapSimpleDiagnosticSelector(node, () => Diagnostics.Import_declaration_0_is_using_private_name_1);
  }
  if (isTypeAliasDeclaration(node) || isJSTypeAliasDeclaration(node)) {
    // unique node selection behavior, inline closure
    return (result) => ({
      errorNode: nodeType(node) ?? node,
      diagnosticMessage: selectDiagnosticBasedOnModuleNameNoNameCheck(result,
        Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1_from_module_2,
        Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1),
      typeName: nodeName(node),
    } as unknown as SymbolAccessibilityErrorInfo);
  }
  // Unhandled node kind: upstream panics here ("Attempted to set a declaration
  // diagnostic context for unhandled node kind"). Mirror that as a thrown error
  // rather than inventing a generic diagnostic message.
  throw new Error("Attempted to set a declaration diagnostic context for unhandled node kind: " + String(node.kind));
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

// Type-visibility message selectors. Mirror TS-Go's per-node-kind
// switch over modifier flags + parent kind to pick the most specific
// message. Where TS-Go returns nil the selector returns undefined (the
// wrappers suppress the diagnostic); where TS-Go panics on an unreachable
// node kind, the selector throws.

function getVariableDeclarationTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage | undefined {
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
  // TS-Go returns nil here (potential silent error state in strada).
  return undefined;
}

function getAccessorDeclarationTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  if (isSetAccessorDeclaration(node)) {
    // Getters can infer the return type from the returned expression, but setters cannot, so the
    // "_from_external_module_1_but_cannot_be_named" case cannot occur.
    if (isStatic(node)) {
      return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_name_1_from_private_module_2,
        Diagnostics.Parameter_type_of_public_static_setter_0_from_exported_class_has_or_is_using_private_name_1);
    }
    return selectDiagnosticBasedOnModuleNameNoNameCheck(result,
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
  // TS-Go panics on unknown signature kind here.
  throw new Error("This is unknown kind for signature: " + String(node.kind));
}

function getParameterDeclarationTypeVisibilityDiagnosticMessage(node: AstNode, result: SymbolAccessibilityResult): DiagnosticMessage {
  const parent = nodeParent(node);
  // TS-Go switches on node.Parent.Kind directly; a missing parent is unreachable.
  if (parent === undefined) {
    throw new Error("Unknown parent for parameter: undefined");
  }
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
  if (isSetAccessorDeclaration(parent) || isGetAccessorDeclaration(parent)) {
    return selectDiagnosticBasedOnModuleName(result,
      Diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named,
      Diagnostics.Parameter_0_of_accessor_has_or_is_using_name_1_from_private_module_2,
      Diagnostics.Parameter_0_of_accessor_has_or_is_using_private_name_1);
  }
  // TS-Go panics on unknown parent kind here.
  throw new Error("Unknown parent for parameter: " + String(parent.kind));
}

function getTypeParameterConstraintVisibilityDiagnosticMessage(node: AstNode, _result: SymbolAccessibilityResult): DiagnosticMessage {
  // Type parameter constraints are named by user so we should always be able to name it.
  const parent = nodeParent(node);
  // TS-Go switches on node.Parent.Kind directly; a missing parent is unreachable.
  if (parent === undefined) {
    throw new Error("This is unknown parent for type parameter: undefined");
  }
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
      // TS-Go panics on unknown parent kind here.
      throw new Error("This is unknown parent for type parameter: " + String(parent.kind));
  }
}

// ---------------------------------------------------------------------------
// Declaration-kind → message suggestion / error mappings
// ---------------------------------------------------------------------------

export function getRelatedSuggestionByDeclarationKind(kind: number): DiagnosticMessage | undefined {
  switch (kind) {
    case Kind.ArrowFunction:
      return Diagnostics.Add_a_return_type_to_the_function_expression;
    case Kind.FunctionExpression:
      return Diagnostics.Add_a_return_type_to_the_function_expression;
    case Kind.MethodDeclaration:
      return Diagnostics.Add_a_return_type_to_the_method;
    case Kind.GetAccessor:
      return Diagnostics.Add_a_return_type_to_the_get_accessor_declaration;
    case Kind.SetAccessor:
      return Diagnostics.Add_a_type_to_parameter_of_the_set_accessor_declaration;
    case Kind.FunctionDeclaration:
      return Diagnostics.Add_a_return_type_to_the_function_declaration;
    case Kind.ConstructSignature:
      return Diagnostics.Add_a_return_type_to_the_function_declaration;
    case Kind.Parameter:
      return Diagnostics.Add_a_type_annotation_to_the_parameter_0;
    case Kind.VariableDeclaration:
      return Diagnostics.Add_a_type_annotation_to_the_variable_0;
    case Kind.PropertyDeclaration:
      return Diagnostics.Add_a_type_annotation_to_the_property_0;
    case Kind.PropertySignature:
      return Diagnostics.Add_a_type_annotation_to_the_property_0;
    case Kind.ExportAssignment:
      return Diagnostics.Move_the_expression_in_default_export_to_a_variable_and_add_a_type_annotation_to_it;
  }
  return undefined;
}

export function getErrorByDeclarationKind(kind: number): DiagnosticMessage | undefined {
  switch (kind) {
    case Kind.FunctionExpression:
      return Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
    case Kind.FunctionDeclaration:
      return Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
    case Kind.ArrowFunction:
      return Diagnostics.Function_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
    case Kind.MethodDeclaration:
      return Diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
    case Kind.ConstructSignature:
      return Diagnostics.Method_must_have_an_explicit_return_type_annotation_with_isolatedDeclarations;
    case Kind.GetAccessor:
      return Diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.SetAccessor:
      return Diagnostics.At_least_one_accessor_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.Parameter:
      return Diagnostics.Parameter_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.VariableDeclaration:
      return Diagnostics.Variable_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.PropertyDeclaration:
      return Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.PropertySignature:
      return Diagnostics.Property_must_have_an_explicit_type_annotation_with_isolatedDeclarations;
    case Kind.ComputedPropertyName:
      return Diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations;
    case Kind.SpreadAssignment:
      return Diagnostics.Objects_that_contain_spread_assignments_can_t_be_inferred_with_isolatedDeclarations;
    case Kind.ShorthandPropertyAssignment:
      return Diagnostics.Objects_that_contain_shorthand_properties_can_t_be_inferred_with_isolatedDeclarations;
    case Kind.ArrayLiteralExpression:
      return Diagnostics.Only_const_arrays_can_be_inferred_with_isolatedDeclarations;
    case Kind.ExportAssignment:
      return Diagnostics.Default_exports_can_t_be_inferred_with_isolatedDeclarations;
    case Kind.SpreadElement:
      return Diagnostics.Arrays_with_spread_elements_can_t_inferred_with_isolatedDeclarations;
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
  const diag = makeDiagnostic(node, getErrorByDeclarationKind(node.kind));
  addParentDeclarationRelatedInfo(node, diag);
  return diag;
}

export function createArrayLiteralError(node: AstNode): Diagnostic {
  const diag = makeDiagnostic(node, getErrorByDeclarationKind(node.kind));
  addParentDeclarationRelatedInfo(node, diag);
  return diag;
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
// catalog lives in diagnostics/diagnostics.generated.ts; using a typed
// import here would couple this file to the catalog's exact key set.
// Under noUncheckedIndexedAccess, untyped record lookups return
// `T | undefined`, so the callers below treat undefined as a fallback
// to the generic accessibility message.
import { Diagnostics as DiagnosticsCatalog } from "../../diagnostics/diagnostics.generated.js";
const Diagnostics = DiagnosticsCatalog;
