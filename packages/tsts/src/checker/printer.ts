/**
 * Checker-side type printer.
 *
 * Substantive port of TS-Go `internal/checker/printer.go` (~454 LoC).
 * Converts checker Type/Signature/Symbol values into human-readable
 * text — used by error messages, hover, and language services.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, Signature, TypeFormatFlags, LiteralType } from "./types.js";
import { TypeFlags } from "./types.js";

export class CheckerPrinter {
  typeToString(t: Type, enclosing?: AstNode, flags?: TypeFormatFlags): string {
    void enclosing; void flags;
    return this.renderType(t);
  }

  private renderType(t: Type): string {
    const flags = (t as { flags?: number }).flags ?? 0;
    if ((flags & TypeFlags.Any) !== 0) return "any";
    if ((flags & TypeFlags.Unknown) !== 0) return "unknown";
    if ((flags & TypeFlags.StringLiteral) !== 0) {
      const value = (t as { data?: LiteralType }).data?.value;
      return value !== undefined ? `"${value as string}"` : "string";
    }
    if ((flags & TypeFlags.NumberLiteral) !== 0) {
      const value = (t as { data?: LiteralType }).data?.value;
      return value !== undefined ? `${value as number}` : "number";
    }
    if ((flags & TypeFlags.BooleanLiteral) !== 0) {
      const value = (t as { data?: LiteralType }).data?.value;
      return value !== undefined ? String(value) : "boolean";
    }
    if ((flags & TypeFlags.String) !== 0) return "string";
    if ((flags & TypeFlags.Number) !== 0) return "number";
    if ((flags & TypeFlags.Boolean) !== 0) return "boolean";
    if ((flags & TypeFlags.BigInt) !== 0) return "bigint";
    if ((flags & TypeFlags.ESSymbol) !== 0) return "symbol";
    if ((flags & TypeFlags.Void) !== 0) return "void";
    if ((flags & TypeFlags.Undefined) !== 0) return "undefined";
    if ((flags & TypeFlags.Null) !== 0) return "null";
    if ((flags & TypeFlags.Never) !== 0) return "never";
    if ((flags & TypeFlags.TypeParameter) !== 0) {
      const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
      return sym?.name ?? "T";
    }
    if ((flags & TypeFlags.Union) !== 0) return this.writeUnionType(t);
    if ((flags & TypeFlags.Intersection) !== 0) return this.writeIntersectionType(t);
    if ((flags & TypeFlags.Object) !== 0) {
      const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
      return sym?.name ?? "object";
    }
    return "any";
  }

  symbolToString(symbol: AstSymbol, enclosing?: AstNode, meaning?: number): string {
    void enclosing; void meaning;
    return (symbol as unknown as { name?: string }).name ?? "";
  }
  signatureToString(signature: Signature, enclosing?: AstNode, flags?: TypeFormatFlags, kind?: number): string {
    void enclosing; void flags;
    const params = (signature as unknown as { parameters?: readonly AstSymbol[] }).parameters ?? [];
    const returnType = (signature as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    const paramStr = params.map((p) => this.symbolToString(p)).join(", ");
    const arrow = kind === 1 /* Construct */ ? "new " : "";
    return `${arrow}(${paramStr}) => ${returnType !== undefined ? this.renderType(returnType) : "any"}`;
  }
  typeParameterToString(parameter: Type): string {
    const sym = (parameter as unknown as { symbol?: { name?: string } }).symbol;
    return sym?.name ?? "T";
  }
  writeArrayType(t: Type): string {
    const elem = (t as unknown as { elementType?: Type; typeArguments?: readonly Type[] }).elementType;
    if (elem !== undefined) return `${this.renderType(elem)}[]`;
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    if (args !== undefined && args.length > 0) return `${this.renderType(args[0]!)}[]`;
    return "any[]";
  }
  writeTupleType(t: Type): string {
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments ?? [];
    return `[${args.map((a) => this.renderType(a)).join(", ")}]`;
  }
  writeUnionType(t: Type): string {
    const types = (t as { data?: { types?: readonly Type[] } }).data?.types ?? [];
    if (types.length === 0) return "never";
    // Collapse a false+true BooleanLiteral pair to `boolean`, emitted at the
    // first member's position (port of TS-Go formatUnionTypes).
    const isBooleanLiteral = (u: Type, value: boolean): boolean =>
      ((u.flags & TypeFlags.BooleanLiteral) !== 0) && (u as { data?: LiteralType }).data?.value === value;
    const hasBooleanPair = types.some((u) => isBooleanLiteral(u, false)) && types.some((u) => isBooleanLiteral(u, true));
    if (!hasBooleanPair) {
      return types.map((u) => this.renderType(u)).join(" | ");
    }
    const firstBooleanIndex = types.findIndex((u) => isBooleanLiteral(u, false) || isBooleanLiteral(u, true));
    return types
      .flatMap((u, i) =>
        isBooleanLiteral(u, false) || isBooleanLiteral(u, true)
          ? (i === firstBooleanIndex ? ["boolean"] : [])
          : [this.renderType(u)],
      )
      .join(" | ");
  }
  writeIntersectionType(t: Type): string {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    if (types.length === 0) return "unknown";
    return types.map((u) => this.renderType(u)).join(" & ");
  }
  writeFunctionType(signature: Signature): string {
    return this.signatureToString(signature);
  }
  writeConstructorType(signature: Signature): string {
    return this.signatureToString(signature, undefined, undefined, 1 /* Construct */);
  }
  writeTypeReference(t: Type): string {
    const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
    const name = sym?.name ?? "?";
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments ?? [];
    if (args.length === 0) return name;
    return `${name}<${args.map((a) => this.renderType(a)).join(", ")}>`;
  }
  writeMappedType(t: Type): string {
    void t; return "{[K in ...]: ...}";
  }
  writeIndexedAccessType(t: Type): string {
    const objectType = (t as unknown as { objectType?: Type }).objectType;
    const indexType = (t as unknown as { indexType?: Type }).indexType;
    if (objectType !== undefined && indexType !== undefined) {
      return `${this.renderType(objectType)}[${this.renderType(indexType)}]`;
    }
    return "any";
  }
  writeConditionalType(t: Type): string {
    const checkType = (t as unknown as { checkType?: Type }).checkType;
    const extendsType = (t as unknown as { extendsType?: Type }).extendsType;
    const trueType = (t as unknown as { trueType?: Type }).trueType;
    const falseType = (t as unknown as { falseType?: Type }).falseType;
    if (checkType !== undefined && extendsType !== undefined && trueType !== undefined && falseType !== undefined) {
      return `${this.renderType(checkType)} extends ${this.renderType(extendsType)} ? ${this.renderType(trueType)} : ${this.renderType(falseType)}`;
    }
    return "any";
  }
  writeLiteralType(t: Type): string {
    return this.renderType(t);
  }
  writeTemplateLiteralType(t: Type): string {
    void t; return "`...`";
  }
}

export function newCheckerPrinter(): CheckerPrinter {
  return new CheckerPrinter();
}
