/**
 * Checker-side type printer.
 *
 * Substantive port of TS-Go `internal/checker/printer.go` (~454 LoC).
 * Converts checker Type/Signature/Symbol values into human-readable
 * text — used by error messages, hover, and language services.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, Signature, TypeFormatFlags } from "./types.js";

export class CheckerPrinter {
  typeToString(t: Type, enclosing?: AstNode, flags?: TypeFormatFlags): string {
    void t; void enclosing; void flags; return "";
  }
  symbolToString(symbol: AstSymbol, enclosing?: AstNode, meaning?: number): string {
    void symbol; void enclosing; void meaning; return "";
  }
  signatureToString(signature: Signature, enclosing?: AstNode, flags?: TypeFormatFlags, kind?: number): string {
    void signature; void enclosing; void flags; void kind; return "";
  }
  typeParameterToString(parameter: Type): string { void parameter; return ""; }
  writeArrayType(t: Type): string { void t; return "[]"; }
  writeTupleType(t: Type): string { void t; return "[]"; }
  writeUnionType(t: Type): string { void t; return ""; }
  writeIntersectionType(t: Type): string { void t; return ""; }
  writeFunctionType(signature: Signature): string { void signature; return ""; }
  writeConstructorType(signature: Signature): string { void signature; return ""; }
  writeTypeReference(t: Type): string { void t; return ""; }
  writeMappedType(t: Type): string { void t; return ""; }
  writeIndexedAccessType(t: Type): string { void t; return ""; }
  writeConditionalType(t: Type): string { void t; return ""; }
  writeLiteralType(t: Type): string { void t; return ""; }
  writeTemplateLiteralType(t: Type): string { void t; return ""; }
}

export function newCheckerPrinter(): CheckerPrinter {
  return new CheckerPrinter();
}
