/**
 * Checker-side type printer.
 *
 * Substantive port of TS-Go `internal/checker/printer.go` (~454 LoC).
 * Converts checker Type/Signature/Symbol values into human-readable
 * text — used by error messages, hover, and language services.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, TupleType, Type, TypeFormatFlags, LiteralType } from "./types.js";
import { ElementFlags, ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

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
    if ((flags & TypeFlags.IndexedAccess) !== 0) return this.writeIndexedAccessType(t);
    if ((flags & TypeFlags.Conditional) !== 0) return this.writeConditionalType(t);
    if ((flags & TypeFlags.TemplateLiteral) !== 0) return this.writeTemplateLiteralType(t);
    if ((flags & TypeFlags.Object) !== 0) {
      return this.writeObjectType(t);
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
    const typeParameters = (signature as unknown as { typeParameters?: readonly Type[] }).typeParameters ?? [];
    const returnType = (signature as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    const typeParameterText = typeParameters.length === 0 ? "" : `<${typeParameters.map((p) => this.typeParameterToString(p)).join(", ")}>`;
    const paramStr = params.map((p) => this.parameterToString(p)).join(", ");
    const returnText = returnType !== undefined ? this.renderType(returnType) : "any";
    const construct = kind === SignatureKind.Construct || kind === 1 /* Construct */;
    return construct ? `new ${typeParameterText}(${paramStr}) => ${returnText}` : `${typeParameterText}(${paramStr}) => ${returnText}`;
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
    const tuple = t.data as TupleType | undefined;
    const args = this.typeArgumentsOf(t);
    if (tuple === undefined) return `[${args.map((a) => this.renderType(a)).join(", ")}]`;
    const elements = tuple.elementInfo.map((info, index) => {
      const elementType = args[index] ?? (info.labeledDeclaration as unknown as { type?: Type } | undefined)?.type;
      const typeText = elementType === undefined ? "unknown" : this.renderType(elementType);
      const label = nodeName((info.labeledDeclaration as unknown as { name?: AstNode } | undefined)?.name);
      const optional = (info.flags & ElementFlags.Optional) !== 0 ? "?" : "";
      const rest = (info.flags & ElementFlags.Rest) !== 0 ? "..." : "";
      return label === "" ? `${rest}${typeText}` : `${rest}${label}${optional}: ${typeText}`;
    });
    return `[${elements.join(", ")}]`;
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
    const types = (t as { data?: { types?: readonly Type[] } }).data?.types
      ?? (t as unknown as { types?: readonly Type[] }).types
      ?? [];
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
    const args = this.typeArgumentsOf(t);
    if (args.length === 0) return name;
    return `${name}<${args.map((a) => this.renderType(a)).join(", ")}>`;
  }
  writeMappedType(t: Type): string {
    const data = t.data as {
      typeParameter?: Type;
      constraintType?: Type;
      nameType?: Type;
      templateType?: Type;
      declaration?: AstNode;
    } | undefined;
    const typeParameterName = data?.typeParameter !== undefined
      ? this.typeParameterToString(data.typeParameter)
      : nodeName((data?.declaration as unknown as { typeParameter?: { name?: AstNode } } | undefined)?.typeParameter?.name) || "K";
    const constraint = data?.constraintType !== undefined
      ? this.renderType(data.constraintType)
      : typeNodeText((data?.declaration as unknown as { typeParameter?: { constraint?: AstNode } } | undefined)?.typeParameter?.constraint) || "keyof any";
    const nameMapping = data?.nameType === undefined ? "" : ` as ${this.renderType(data.nameType)}`;
    const value = data?.templateType !== undefined
      ? this.renderType(data.templateType)
      : typeNodeText((data?.declaration as unknown as { type?: AstNode } | undefined)?.type) || "unknown";
    const readonlyPrefix = mappedModifierText(data?.declaration, "readonlyToken", "readonly ");
    const optionalSuffix = mappedModifierText(data?.declaration, "questionToken", "?");
    return `{ ${readonlyPrefix}[${typeParameterName} in ${constraint}${nameMapping}]${optionalSuffix}: ${value} }`;
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
    const data = t.data as { texts?: readonly string[]; types?: readonly Type[] } | undefined;
    const texts = data?.texts ?? [];
    const types = data?.types ?? [];
    if (texts.length === 0 && types.length === 0) return "`${string}`";
    let result = "`";
    for (let index = 0; index < types.length; index += 1) {
      result += escapeTemplateText(texts[index] ?? "");
      result += "${";
      result += this.renderType(types[index]!);
      result += "}";
    }
    result += escapeTemplateText(texts[types.length] ?? "");
    result += "`";
    return result;
  }

  private writeObjectType(t: Type): string {
    const data = t.data as ObjectType | TupleType | undefined;
    if (data !== undefined && (data.objectFlags & ObjectFlags.Tuple) !== 0) return this.writeTupleType(t);
    const arrayElement = this.arrayElementType(t);
    if (arrayElement !== undefined && this.typeName(t) !== "ReadonlyArray") return `${this.renderType(arrayElement)}[]`;
    const name = this.typeName(t);
    const args = this.typeArgumentsOf(t);
    if (name !== "" && name !== "__object") {
      return args.length === 0 ? name : `${name}<${args.map((a) => this.renderType(a)).join(", ")}>`;
    }
    const callSignatures = data?.declaredCallSignatures ?? [];
    if (callSignatures.length === 1 && (data?.declaredProperties?.length ?? 0) === 0 && (data?.indexInfos?.length ?? 0) === 0) {
      return this.writeFunctionType(callSignatures[0]!);
    }
    const members = this.objectMembersToStrings(t);
    return members.length === 0 ? "{}" : `{ ${members.join("; ")} }`;
  }

  private objectMembersToStrings(t: Type): readonly string[] {
    const data = t.data as ObjectType | undefined;
    const members: string[] = [];
    const propertySymbols = data?.declaredProperties ?? [...((t.symbol as unknown as { members?: Map<string, AstSymbol> } | undefined)?.members?.values() ?? [])];
    for (const property of propertySymbols) {
      const name = this.symbolToString(property);
      if (name === "") continue;
      const propertyType = getTypeOfSymbol(property);
      const optional = ((property.flags ?? 0) & 0x01000000 /* SymbolFlags.Optional */) !== 0 ? "?" : "";
      members.push(`${quotePropertyNameIfNeeded(name)}${optional}: ${propertyType === undefined ? "any" : this.renderType(propertyType)}`);
    }
    for (const signature of data?.declaredCallSignatures ?? []) {
      members.push(this.signatureToString(signature));
    }
    for (const signature of data?.declaredConstructSignatures ?? []) {
      members.push(this.signatureToString(signature, undefined, undefined, SignatureKind.Construct));
    }
    for (const indexInfo of data?.indexInfos ?? []) {
      members.push(this.indexInfoToString(indexInfo));
    }
    return members;
  }

  private indexInfoToString(indexInfo: IndexInfo): string {
    const keyName = (indexInfo.keyType.flags & TypeFlags.NumberLike) !== 0 ? "index" : "key";
    const readonly = indexInfo.isReadonly === true ? "readonly " : "";
    return `${readonly}[${keyName}: ${this.renderType(indexInfo.keyType)}]: ${this.renderType(indexInfo.valueType)}`;
  }

  private parameterToString(symbol: AstSymbol): string {
    const name = this.symbolToString(symbol) || "arg";
    const type = getTypeOfSymbol(symbol);
    const rest = (symbol as unknown as { rest?: boolean }).rest === true ? "..." : "";
    const optional = ((symbol.flags ?? 0) & 0x01000000 /* SymbolFlags.Optional */) !== 0 ? "?" : "";
    return `${rest}${name}${optional}: ${type === undefined ? "any" : this.renderType(type)}`;
  }

  private typeArgumentsOf(t: Type): readonly Type[] {
    return t.aliasTypeArguments
      ?? (t.data as ObjectType | undefined)?.resolvedTypeArguments
      ?? (t.data as { resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
      ?? (t as unknown as { typeArguments?: readonly Type[] }).typeArguments
      ?? [];
  }

  private arrayElementType(t: Type): Type | undefined {
    return (t.data as { elementType?: Type } | undefined)?.elementType ?? this.typeArgumentsOf(t)[0];
  }

  private typeName(t: Type): string {
    return (t.aliasSymbol as unknown as { name?: string; escapedName?: string } | undefined)?.name
      ?? (t.aliasSymbol as unknown as { escapedName?: string } | undefined)?.escapedName
      ?? (t.symbol as unknown as { name?: string; escapedName?: string } | undefined)?.name
      ?? (t.symbol as unknown as { escapedName?: string } | undefined)?.escapedName
      ?? (t.data as { intrinsicName?: string } | undefined)?.intrinsicName
      ?? "";
  }
}

function nodeName(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function typeNodeText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  if ((node as unknown as { text?: string }).text !== undefined) return String((node as unknown as { text: string }).text);
  const kind = (node as { kind?: number }).kind;
  switch (kind) {
    case 150 /* StringKeyword */: return "string";
    case 151 /* NumberKeyword */: return "number";
    case 136 /* BooleanKeyword */: return "boolean";
    case 155 /* SymbolKeyword */: return "symbol";
    case 157 /* UnknownKeyword */: return "unknown";
    case 133 /* AnyKeyword */: return "any";
    case 158 /* VoidKeyword */: return "void";
    case 149 /* NeverKeyword */: return "never";
  }
  return "";
}

function mappedModifierText(declaration: AstNode | undefined, field: "readonlyToken" | "questionToken", positive: string): string {
  const token = (declaration as unknown as Record<string, AstNode | undefined> | undefined)?.[field];
  if (token === undefined) return "";
  const kind = (token as { kind?: number }).kind;
  if (kind === 40 /* MinusToken */) return `-${positive.trim()}`;
  if (kind === 41 /* PlusToken */) return `+${positive}`;
  return positive;
}

function quotePropertyNameIfNeeded(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

function escapeTemplateText(text: string): string {
  return text.replace(/[`\\]/g, (value) => `\\${value}`).replace(/\$\{/g, "\\${");
}

export function newCheckerPrinter(): CheckerPrinter {
  return new CheckerPrinter();
}
