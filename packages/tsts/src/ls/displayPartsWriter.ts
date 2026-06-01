import {
  Kind,
  SymbolFlags,
  type Symbol,
} from "../ast/index.js";
import type {
  ClassifiedTextRun,
  ClassificationTypeName,
} from "../lsp/lsproto/index.js";
import {
  ClassificationTypeNameClassName,
  ClassificationTypeNameEnumName,
  ClassificationTypeNameFieldName,
  ClassificationTypeNameIdentifier,
  ClassificationTypeNameInterfaceName,
  ClassificationTypeNameKeyword,
  ClassificationTypeNameLocalName,
  ClassificationTypeNameMethodName,
  ClassificationTypeNameModuleName,
  ClassificationTypeNameOperator,
  ClassificationTypeNameParameterName,
  ClassificationTypeNamePropertyName,
  ClassificationTypeNamePunctuation,
  ClassificationTypeNameString,
  ClassificationTypeNameText,
  ClassificationTypeNameTypeParameterName,
  ClassificationTypeNameWhiteSpace,
} from "../lsp/lsproto/index.js";
import type { EmitTextWriter } from "../printer/index.js";
import { isWhiteSpaceLike } from "../stringutil/util.js";

export class DisplayPartsWriter implements EmitTextWriter {
  readonly vsCapability: boolean;
  private text = "";
  private runs: ClassifiedTextRun[] = [];
  private lastWritten = "";

  constructor(vsCapability: boolean) {
    this.vsCapability = vsCapability;
  }

  addRun(classification: ClassificationTypeName, text: string): void {
    if (text.length === 0) {
      return;
    }
    if (this.vsCapability) {
      this.runs.push({
        ClassificationTypeName: classification,
        Text: text,
      });
    }
    this.lastWritten = text;
    this.text += text;
  }

  writeClassified(text: string, classification: ClassificationTypeName): void {
    this.addRun(classification, text);
  }

  writeFrom(other: DisplayPartsWriter): void {
    this.text += other.toString();
    if (this.vsCapability) {
      this.runs.push(...other.getRuns());
    }
    if (other.lastWritten.length !== 0) {
      this.lastWritten = other.lastWritten;
    }
  }

  getRuns(): readonly ClassifiedTextRun[] {
    return this.runs;
  }

  getText(): string {
    return this.text;
  }

  toString(): string {
    return this.text;
  }

  clear(): void {
    this.lastWritten = "";
    this.text = "";
    this.runs = [];
  }

  decreaseIndent(): void {}

  getColumn(): number {
    return 0;
  }

  getIndent(): number {
    return 0;
  }

  getLine(): number {
    return 0;
  }

  getTextPos(): number {
    return this.text.length;
  }

  hasTrailingComment(): boolean {
    return false;
  }

  hasTrailingWhitespace(): boolean {
    if (this.text.length === 0 || this.lastWritten.length === 0) {
      return false;
    }
    const lastCodePoint = lastUnicodeCodePoint(this.lastWritten);
    return lastCodePoint !== undefined && isWhiteSpaceLike(lastCodePoint);
  }

  increaseIndent(): void {}

  isAtStartOfLine(): boolean {
    return false;
  }

  rawWrite(text: string): void {
    this.addRun(ClassificationTypeNameText, text);
  }

  write(text: string): void {
    this.addRun(ClassificationTypeNameText, text);
  }

  writeComment(text: string): void {
    this.addRun(ClassificationTypeNameText, text);
  }

  writeKeyword(text: string): void {
    this.addRun(ClassificationTypeNameKeyword, text);
  }

  writeLine(): void {
    this.addRun(ClassificationTypeNameWhiteSpace, " ");
  }

  writeLineForce(_force: boolean): void {
    this.addRun(ClassificationTypeNameWhiteSpace, " ");
  }

  writeLineRepeat(count: number): void {
    for (let index = 0; index < count; index += 1) {
      this.writeLineForce(true);
    }
  }

  writeLiteral(text: string): void {
    this.addRun(ClassificationTypeNameString, text);
  }

  writeLiteralStringLiteral(text: string): void {
    this.writeLiteral(text);
  }

  writeOperator(text: string): void {
    this.addRun(ClassificationTypeNameOperator, text);
  }

  writeParameter(text: string): void {
    this.addRun(ClassificationTypeNameParameterName, text);
  }

  writeProperty(text: string): void {
    this.addRun(ClassificationTypeNamePropertyName, text);
  }

  writePunctuation(text: string): void {
    this.addRun(ClassificationTypeNamePunctuation, text);
  }

  writeSpace(text: string): void {
    this.addRun(ClassificationTypeNameWhiteSpace, text);
  }

  writeStringLiteral(text: string): void {
    this.addRun(ClassificationTypeNameString, text);
  }

  writeSymbol(text: string, symbol: Symbol | undefined): void {
    this.addRun(classificationForSymbol(symbol), text);
  }

  writeTrailingSemicolon(text: string): void {
    this.addRun(ClassificationTypeNamePunctuation, text);
  }

  grow(_size: number): void {}
}

export function newDisplayPartsWriter(vsCapability: boolean): DisplayPartsWriter {
  return new DisplayPartsWriter(vsCapability);
}

export function classificationForSymbol(symbol: Symbol | undefined): ClassificationTypeName {
  if (symbol === undefined) {
    return ClassificationTypeNameText;
  }
  const flags = symbol.flags ?? SymbolFlags.None;
  if ((flags & SymbolFlags.Variable) !== 0) {
    if (isFirstDeclarationOfSymbolParameter(symbol)) {
      return ClassificationTypeNameParameterName;
    }
    return ClassificationTypeNameLocalName;
  }
  if ((flags & SymbolFlags.Property) !== 0) {
    return ClassificationTypeNamePropertyName;
  }
  if ((flags & SymbolFlags.GetAccessor) !== 0) {
    return ClassificationTypeNamePropertyName;
  }
  if ((flags & SymbolFlags.SetAccessor) !== 0) {
    return ClassificationTypeNamePropertyName;
  }
  if ((flags & SymbolFlags.EnumMember) !== 0) {
    return ClassificationTypeNameFieldName;
  }
  if ((flags & SymbolFlags.Function) !== 0) {
    return ClassificationTypeNameMethodName;
  }
  if ((flags & SymbolFlags.Class) !== 0) {
    return ClassificationTypeNameClassName;
  }
  if ((flags & SymbolFlags.Interface) !== 0) {
    return ClassificationTypeNameInterfaceName;
  }
  if ((flags & SymbolFlags.Enum) !== 0) {
    return ClassificationTypeNameEnumName;
  }
  if ((flags & SymbolFlags.Module) !== 0) {
    return ClassificationTypeNameModuleName;
  }
  if ((flags & SymbolFlags.Method) !== 0) {
    return ClassificationTypeNameMethodName;
  }
  if ((flags & SymbolFlags.TypeParameter) !== 0) {
    return ClassificationTypeNameTypeParameterName;
  }
  if ((flags & SymbolFlags.TypeAlias) !== 0) {
    return ClassificationTypeNameIdentifier;
  }
  if ((flags & SymbolFlags.Alias) !== 0) {
    return ClassificationTypeNameIdentifier;
  }
  return ClassificationTypeNameText;
}

export function isFirstDeclarationOfSymbolParameter(symbol: Symbol): boolean {
  return symbol.declarations.length > 0 && symbol.declarations[0]!.kind === Kind.Parameter;
}

function lastUnicodeCodePoint(text: string): number | undefined {
  if (text.length === 0) {
    return undefined;
  }
  const last = text.charCodeAt(text.length - 1);
  if (last >= 0xdc00 && last <= 0xdfff && text.length >= 2) {
    const previous = text.charCodeAt(text.length - 2);
    if (previous >= 0xd800 && previous <= 0xdbff) {
      return ((previous - 0xd800) * 0x400) + (last - 0xdc00) + 0x10000;
    }
  }
  return last;
}
