// symbol.ts — Faithful 1:1 port of typescript-go internal/ast/symbol.go.
//
// Mirrors the upstream Symbol receiver methods (modeled as free functions in
// TSTS), the SymbolTable alias, the InternalSymbolName constants, and the
// SymbolName / EscapeAllInternalSymbolNames helpers.

import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { SymbolFlags } from "../enums/symbolFlags.enum.js";
import { hasSyntacticModifier, isPrivateIdentifierClassElementDeclaration } from "./utilities.js";
import { nodeName, nodeText } from "./accessors.js";
import type { Symbol } from "./generated/types.js";

// (*Symbol).IsExternalModule (symbol.go:23).
export function isExternalModuleSymbol(s: Symbol): boolean {
  return (((s.flags ?? 0) & SymbolFlags.Module) !== 0) && s.name !== undefined && s.name.length > 0 && s.name[0] === '"';
}

// (*Symbol).IsStatic (symbol.go:27).
export function isStaticSymbol(s: Symbol): boolean {
  if (s.valueDeclaration === undefined) {
    return false;
  }
  return hasSyntacticModifier(s.valueDeclaration, ModifierFlags.Static);
}

// (*Symbol).CombinedLocalAndExportSymbolFlags (symbol.go:36).
// See comment on `declareModuleMember` in `binder.go`.
export function combinedLocalAndExportSymbolFlags(s: Symbol): SymbolFlags {
  if (s.exportSymbol !== undefined) {
    return (s.flags ?? 0) | (s.exportSymbol.flags ?? 0);
  }
  return s.flags ?? 0;
}

// Invalid UTF8 sequence, will never occur as IdentifierName (symbol.go:47).
export const InternalSymbolNamePrefix = "\xFE";

// InternalSymbolName constants (symbol.go:49-70).
export const InternalSymbolNameCall = InternalSymbolNamePrefix + "call"; // Call signatures
export const InternalSymbolNameConstructor = InternalSymbolNamePrefix + "constructor"; // Constructor implementations
export const InternalSymbolNameNew = InternalSymbolNamePrefix + "new"; // Constructor signatures
export const InternalSymbolNameIndex = InternalSymbolNamePrefix + "index"; // Index signatures
export const InternalSymbolNameExportStar = InternalSymbolNamePrefix + "export"; // Module export * declarations
export const InternalSymbolNameGlobal = InternalSymbolNamePrefix + "global"; // Global self-reference
export const InternalSymbolNameMissing = InternalSymbolNamePrefix + "missing"; // Indicates missing symbol
export const InternalSymbolNameType = InternalSymbolNamePrefix + "type"; // Anonymous type literal symbol
export const InternalSymbolNameObject = InternalSymbolNamePrefix + "object"; // Anonymous object literal declaration
export const InternalSymbolNameJSXAttributes = InternalSymbolNamePrefix + "jsxAttributes"; // Anonymous JSX attributes object literal declaration
export const InternalSymbolNameClass = InternalSymbolNamePrefix + "class"; // Unnamed class expression
export const InternalSymbolNameFunction = InternalSymbolNamePrefix + "function"; // Unnamed function expression
export const InternalSymbolNameComputed = InternalSymbolNamePrefix + "computed"; // Computed property name declaration with dynamic name
export const InternalSymbolNameAssignmentDeclaration = InternalSymbolNamePrefix + "assignment"; // Assignment declarations
export const InternalSymbolNameInstantiationExpression = InternalSymbolNamePrefix + "instantiationExpression"; // Instantiation expressions
export const InternalSymbolNameImportAttributes = InternalSymbolNamePrefix + "importAttributes";
export const InternalSymbolNameExportEquals = "export="; // Export assignment symbol
export const InternalSymbolNameDefault = "default"; // Default export symbol (technically not wholly internal, but included here for usability)
export const InternalSymbolNameThis = "this";
export const InternalSymbolNameModuleExports = "module.exports";

// SymbolName (symbol.go:72).
export function symbolName(symbol: Symbol): string {
  if (symbol.valueDeclaration !== undefined && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
    return nodeText(nodeName(symbol.valueDeclaration));
  }
  return symbol.name ?? "";
}

// EscapeAllInternalSymbolNames replaces internal symbol name markers ("\xFE")
// with "__" (symbol.go:80).
export function escapeAllInternalSymbolNames(name: string): string {
  return name.split(InternalSymbolNamePrefix).join("__");
}
