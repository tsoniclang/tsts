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

// Skeleton placeholders — full Strada coverage uses ~30 additional
// selectors. Tests will surface gaps as we lock in baseline output.
function getVariableDeclarationTypeVisibilityDiagnosticMessage(_n: AstNode, _r: SymbolAccessibilityResult): DiagnosticMessage {
  return Diagnostics.Generic_inaccessible_symbol_error;
}
function getAccessorDeclarationTypeVisibilityDiagnosticMessage(_n: AstNode, _r: SymbolAccessibilityResult): DiagnosticMessage {
  return Diagnostics.Generic_inaccessible_symbol_error;
}
function getReturnTypeVisibilityDiagnosticMessage(_n: AstNode, _r: SymbolAccessibilityResult): DiagnosticMessage {
  return Diagnostics.Generic_inaccessible_symbol_error;
}
function getParameterDeclarationTypeVisibilityDiagnosticMessage(_n: AstNode, _r: SymbolAccessibilityResult): DiagnosticMessage {
  return Diagnostics.Generic_inaccessible_symbol_error;
}
function getTypeParameterConstraintVisibilityDiagnosticMessage(_n: AstNode, _r: SymbolAccessibilityResult): DiagnosticMessage {
  return Diagnostics.Generic_inaccessible_symbol_error;
}

export function createGetIsolatedDeclarationErrors(_resolver: EmitResolver): (node: AstNode) => Diagnostic {
  return (node) => createIsolatedDeclarationDiagnostic(node);
}

declare function createIsolatedDeclarationDiagnostic(node: AstNode): Diagnostic;

// ---------------------------------------------------------------------------
// Forward-declared
// ---------------------------------------------------------------------------

declare const Kind: { ClassDeclaration: number };
declare const ModifierFlags: { Private: number };
declare const SymbolAccessibility: { CannotBeNamed: number };
declare const Diagnostics: Record<string, DiagnosticMessage>;

declare function getNameOfDeclaration(node: AstNode): AstNode | undefined;
declare function nodeName(node: AstNode): AstNode | undefined;
declare function nodeParent(node: AstNode): AstNode | undefined;
declare function nodeType(node: AstNode): AstNode | undefined;
declare function hasSyntacticModifier(node: AstNode, flags: number): boolean;
declare function isStatic(node: AstNode): boolean;
declare function isVariableDeclaration(node: AstNode): boolean;
declare function isPropertyDeclaration(node: AstNode): boolean;
declare function isPropertySignatureDeclaration(node: AstNode): boolean;
declare function isPropertyAccessExpression(node: AstNode): boolean;
declare function isElementAccessExpression(node: AstNode): boolean;
declare function isBinaryExpression(node: AstNode): boolean;
declare function isBindingElement(node: AstNode): boolean;
declare function isConstructorDeclaration(node: AstNode): boolean;
declare function isSetAccessorDeclaration(node: AstNode): boolean;
declare function isGetAccessorDeclaration(node: AstNode): boolean;
declare function isMethodDeclaration(node: AstNode): boolean;
declare function isMethodSignatureDeclaration(node: AstNode): boolean;
declare function isConstructSignatureDeclaration(node: AstNode): boolean;
declare function isCallSignatureDeclaration(node: AstNode): boolean;
declare function isFunctionDeclaration(node: AstNode): boolean;
declare function isIndexSignatureDeclaration(node: AstNode): boolean;
declare function isParameterDeclaration(node: AstNode): boolean;
declare function isTypeParameterDeclaration(node: AstNode): boolean;
declare function isExpressionWithTypeArguments(node: AstNode): boolean;
declare function isImportEqualsDeclaration(node: AstNode): boolean;
declare function isTypeAliasDeclaration(node: AstNode): boolean;
declare function isJSTypeAliasDeclaration(node: AstNode): boolean;
declare function isParameterPropertyDeclaration(node: AstNode, parent: AstNode): boolean;
