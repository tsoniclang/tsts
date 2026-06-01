import {
  getCombinedNodeFlags,
  isArrowFunction,
  isAssertionExpression,
  isFunctionDeclaration,
  isFunctionExpression,
  isGetAccessorDeclaration,
  isIdentifier,
  isLiteralExpression,
  isMethodDeclaration,
  isNewExpression,
  isObjectLiteralExpression,
  isPrefixUnaryExpression,
  isPropertyAccessExpression,
  isVariableDeclaration,
  isPartOfParameterDeclaration,
  skipParentheses,
  Kind,
  KindNames,
  NodeFlags,
  nodeText,
  SymbolFlags,
  type Identifier,
  type Node,
  type SourceFile,
  type Symbol,
} from "../ast/index.js";
import type { Type } from "../checker/types.js";
import { isInfinityOrNaNString } from "../checker/utilities.js";
import { tristateIsTrue } from "../core/index.js";
import {
  type InlayHintLabelPart,
  type Location,
  type Range,
  type StringOrInlayHintLabelParts,
} from "../lsp/lsproto/index.js";
import { fileNameToDocumentURI } from "./lsconv/index.js";
import {
  IncludeInlayParameterNameHintsAll,
  IncludeInlayParameterNameHintsLiterals,
  IncludeInlayParameterNameHintsNone,
  type InlayHintsPreferences,
  QuotePreferenceSingle,
  type QuotePreference,
} from "./lsutil/userpreferences.js";

export interface InlayHintState {
  readonly preferences: InlayHintsPreferences;
  readonly result: readonly unknown[];
}

export interface ParameterInfo {
  readonly parameter: Identifier;
  readonly name: string;
  readonly isRestParameter: boolean;
}

export interface InlayHintLabelPartState {
  readonly file?: SourceFile;
  readonly quotePreference?: QuotePreference;
}

export function shouldShowParameterNameHints(preferences: InlayHintsPreferences): boolean {
  return preferences.includeInlayParameterNameHints === IncludeInlayParameterNameHintsLiterals
    || preferences.includeInlayParameterNameHints === IncludeInlayParameterNameHintsAll;
}

export function shouldShowLiteralParameterNameHintsOnly(preferences: InlayHintsPreferences): boolean {
  return preferences.includeInlayParameterNameHints === IncludeInlayParameterNameHintsLiterals;
}

export function isSignatureSupportingReturnAnnotation(node: Node): boolean {
  return isArrowFunction(node)
    || isFunctionExpression(node)
    || isFunctionDeclaration(node)
    || isMethodDeclaration(node)
    || isGetAccessorDeclaration(node);
}

export function isHintableDeclaration(node: Node): boolean {
  const initializer = nodeInitializer(node);
  if ((isPartOfParameterDeclaration(node) || isVariableDeclaration(node) && isVarConst(node)) && initializer !== undefined) {
    const skippedInitializer = skipParentheses(initializer) as Node;
    return !(isHintableLiteral(skippedInitializer)
      || isNewExpression(skippedInitializer)
      || isObjectLiteralExpression(skippedInitializer)
      || isAssertionExpression(skippedInitializer));
  }
  return true;
}

export function isHintableLiteral(node: Node): boolean {
  if (isPrefixUnaryExpression(node)) {
    const operand = node.operand;
    return isLiteralExpression(operand) || isIdentifier(operand) && isInfinityOrNaNString(operand.text);
  }
  if (isIdentifier(node)) {
    return node.text === "undefined" || isInfinityOrNaNString(node.text);
  }
  switch (node.kind) {
    case Kind.TrueKeyword:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TemplateExpression:
      return true;
    default:
      return isLiteralExpression(node);
  }
}

export function isModuleReferenceType(type: Type): boolean {
  return type.symbol !== undefined && ((type.symbol.flags ?? 0) & SymbolFlags.Module) !== 0;
}

export function getInlayHintLabelParts(
  node: Node,
  idToSymbol: ReadonlyMap<Identifier, Symbol> = new Map(),
  state: InlayHintLabelPartState = {},
): readonly InlayHintLabelPart[] {
  const parts: InlayHintLabelPart[] = [];

  const push = (value: string): void => {
    if (value !== "") parts.push({ value });
  };
  const visitDisplayPartList = (nodes: readonly Node[] | undefined, separator: string): void => {
    if (nodes === undefined) return;
    nodes.forEach((item, index) => {
      if (index > 0) push(separator);
      visitForDisplayParts(item);
    });
  };
  const visitParametersAndTypeParameters = (signature: Node): void => {
    const typeParameters = nodeArray(signature, "typeParameters");
    if (typeParameters.length > 0) {
      push("<");
      visitDisplayPartList(typeParameters, ", ");
      push(">");
    }
    push("(");
    visitDisplayPartList(nodeArray(signature, "parameters"), ", ");
    push(")");
  };
  const visitForDisplayParts = (current: Node | undefined): void => {
    if (current === undefined) return;

    const tokenText = tokenToString(current.kind);
    if (tokenText !== "") {
      push(tokenText);
      return;
    }

    if (isLiteralExpression(current)) {
      push(getLiteralText(current, state.quotePreference));
      return;
    }

    switch (current.kind) {
      case Kind.Identifier: {
        const identifierText = nodeText(current);
        const symbol = idToSymbol.get(current as Identifier);
        const declarationName = symbol?.declarations[0] === undefined ? undefined : nodeName(symbol.declarations[0]);
        parts.push(declarationName === undefined ? { value: identifierText } : getNodeDisplayPart(identifierText, declarationName, state.file));
        return;
      }
      case Kind.QualifiedName:
        visitForDisplayParts(nodeProperty(current, "left"));
        push(".");
        visitForDisplayParts(nodeProperty(current, "right"));
        return;
      case Kind.TypePredicate:
        if (nodeProperty(current, "assertsModifier") !== undefined) push("asserts ");
        visitForDisplayParts(nodeProperty(current, "parameterName"));
        if (nodeProperty(current, "type") !== undefined) {
          push(" is ");
          visitForDisplayParts(nodeProperty(current, "type"));
        }
        return;
      case Kind.TypeReference:
        visitForDisplayParts(nodeProperty(current, "typeName"));
        if (nodeArray(current, "typeArguments").length > 0) {
          push("<");
          visitDisplayPartList(nodeArray(current, "typeArguments"), ",");
          push(">");
        }
        return;
      case Kind.TypeParameter:
        visitDisplayPartList(nodeArray(current, "modifiers"), "");
        visitForDisplayParts(nodeName(current));
        if (nodeProperty(current, "constraint") !== undefined) {
          push(" extends ");
          visitForDisplayParts(nodeProperty(current, "constraint"));
        }
        if (nodeProperty(current, "defaultType") !== undefined) {
          push(" = ");
          visitForDisplayParts(nodeProperty(current, "defaultType"));
        }
        return;
      case Kind.Parameter:
        visitDisplayPartList(nodeArray(current, "modifiers"), " ");
        if (nodeArray(current, "modifiers").length > 0) push(" ");
        if (nodeProperty(current, "dotDotDotToken") !== undefined) push("...");
        visitForDisplayParts(nodeName(current));
        if (nodeProperty(current, "questionToken") !== undefined) push("?");
        if (nodeProperty(current, "type") !== undefined) {
          push(": ");
          visitForDisplayParts(nodeProperty(current, "type"));
        }
        return;
      case Kind.ConstructorType:
        push("new ");
        visitParametersAndTypeParameters(current);
        push(" => ");
        visitForDisplayParts(nodeProperty(current, "type"));
        return;
      case Kind.TypeQuery:
        push("typeof ");
        visitForDisplayParts(nodeProperty(current, "exprName"));
        if (nodeArray(current, "typeArguments").length > 0) {
          push("<");
          visitDisplayPartList(nodeArray(current, "typeArguments"), ", ");
          push(">");
        }
        return;
      case Kind.TypeLiteral:
        push("{");
        if (nodeArray(current, "members").length > 0) {
          push(" ");
          visitDisplayPartList(nodeArray(current, "members"), "; ");
          push(" ");
        }
        push("}");
        return;
      case Kind.ArrayType:
        visitForDisplayParts(nodeProperty(current, "elementType"));
        push("[]");
        return;
      case Kind.TupleType:
        push("[");
        visitDisplayPartList(nodeArray(current, "elements"), ", ");
        push("]");
        return;
      case Kind.NamedTupleMember:
        if (nodeProperty(current, "dotDotDotToken") !== undefined) push("...");
        visitForDisplayParts(nodeName(current));
        if (nodeProperty(current, "questionToken") !== undefined) push("?");
        push(": ");
        visitForDisplayParts(nodeProperty(current, "type"));
        return;
      case Kind.OptionalType:
        visitForDisplayParts(nodeProperty(current, "type"));
        push("?");
        return;
      case Kind.RestType:
        push("...");
        visitForDisplayParts(nodeProperty(current, "type"));
        return;
      case Kind.UnionType:
        visitDisplayPartList(nodeArray(current, "types"), " | ");
        return;
      case Kind.IntersectionType:
        visitDisplayPartList(nodeArray(current, "types"), " & ");
        return;
      case Kind.ConditionalType:
        visitForDisplayParts(nodeProperty(current, "checkType"));
        push(" extends ");
        visitForDisplayParts(nodeProperty(current, "extendsType"));
        push(" ? ");
        visitForDisplayParts(nodeProperty(current, "trueType"));
        push(" : ");
        visitForDisplayParts(nodeProperty(current, "falseType"));
        return;
      case Kind.InferType:
        push("infer ");
        visitForDisplayParts(nodeProperty(current, "typeParameter"));
        return;
      case Kind.ParenthesizedType:
        push("(");
        visitForDisplayParts(nodeProperty(current, "type"));
        push(")");
        return;
      case Kind.TypeOperator:
        push(tokenToString(nodeOperator(current)));
        if (parts.length > 0 && parts[parts.length - 1]!.value !== "") push(" ");
        visitForDisplayParts(nodeProperty(current, "type"));
        return;
      case Kind.IndexedAccessType:
        visitForDisplayParts(nodeProperty(current, "objectType"));
        push("[");
        visitForDisplayParts(nodeProperty(current, "indexType"));
        push("]");
        return;
      case Kind.MappedType:
        push("{ ");
        visitMappedType(current);
        push("; }");
        return;
      case Kind.LiteralType:
        visitForDisplayParts(nodeProperty(current, "literal"));
        return;
      case Kind.FunctionType:
        visitParametersAndTypeParameters(current);
        push(" => ");
        visitForDisplayParts(nodeProperty(current, "type"));
        return;
      case Kind.ImportType:
        if (Boolean(nodeProperty(current, "isTypeOf"))) push("typeof ");
        push("import(");
        visitForDisplayParts(nodeProperty(current, "argument"));
        push(")");
        if (nodeProperty(current, "qualifier") !== undefined) {
          push(".");
          visitForDisplayParts(nodeProperty(current, "qualifier"));
        }
        if (nodeArray(current, "typeArguments").length > 0) {
          push("<");
          visitDisplayPartList(nodeArray(current, "typeArguments"), ", ");
          push(">");
        }
        return;
      case Kind.PropertySignature:
      case Kind.MethodSignature:
        visitMemberSignature(current, current.kind === Kind.MethodSignature);
        return;
      case Kind.IndexSignature:
        push("[");
        visitDisplayPartList(nodeArray(current, "parameters"), ", ");
        push("]");
        if (nodeProperty(current, "type") !== undefined) {
          push(": ");
          visitForDisplayParts(nodeProperty(current, "type"));
        }
        return;
      case Kind.CallSignature:
        visitParametersAndTypeParameters(current);
        if (nodeProperty(current, "type") !== undefined) {
          push(": ");
          visitForDisplayParts(nodeProperty(current, "type"));
        }
        return;
      case Kind.ConstructSignature:
        push("new ");
        visitParametersAndTypeParameters(current);
        if (nodeProperty(current, "type") !== undefined) {
          push(": ");
          visitForDisplayParts(nodeProperty(current, "type"));
        }
        return;
      case Kind.ArrayBindingPattern:
        push("[");
        visitDisplayPartList(nodeArray(current, "elements"), ", ");
        push("]");
        return;
      case Kind.ObjectBindingPattern:
        push("{");
        if (nodeArray(current, "elements").length > 0) {
          push(" ");
          visitDisplayPartList(nodeArray(current, "elements"), ", ");
          push(" ");
        }
        push("}");
        return;
      case Kind.BindingElement:
        visitForDisplayParts(nodeName(current));
        return;
      case Kind.PrefixUnaryExpression:
        push(tokenToString(nodeOperator(current)));
        visitForDisplayParts(nodeProperty(current, "operand"));
        return;
      case Kind.TemplateLiteralType:
        visitForDisplayParts(nodeProperty(current, "head"));
        visitDisplayPartList(nodeArray(nodeProperty(current, "templateSpans"), "nodes"), "");
        return;
      case Kind.TemplateHead:
      case Kind.TemplateMiddle:
      case Kind.TemplateTail:
        push(getLiteralText(current, state.quotePreference));
        return;
      case Kind.TemplateLiteralTypeSpan:
        visitForDisplayParts(nodeProperty(current, "type"));
        visitForDisplayParts(nodeProperty(current, "literal"));
        return;
      case Kind.ThisType:
        push("this");
        return;
      case Kind.ComputedPropertyName:
        push("[");
        visitForDisplayParts(nodeProperty(current, "expression"));
        push("]");
        return;
      case Kind.PropertyAccessExpression:
        visitForDisplayParts(nodeProperty(current, "expression"));
        push(".");
        visitForDisplayParts(nodeName(current));
        return;
      case Kind.ElementAccessExpression:
        visitForDisplayParts(nodeProperty(current, "expression"));
        push("[");
        visitForDisplayParts(nodeProperty(current, "argumentExpression"));
        push("]");
        return;
      default:
        current.forEachChild(child => {
          visitForDisplayParts(child);
          return undefined;
        });
    }
  };
  const visitMappedType = (current: Node): void => {
    const readonlyToken = nodeProperty(current, "readonlyToken");
    if (readonlyToken !== undefined) {
      if (readonlyToken.kind === Kind.PlusToken) push("+");
      else if (readonlyToken.kind === Kind.MinusToken) push("-");
      push("readonly ");
    }
    push("[");
    visitForDisplayParts(nodeProperty(current, "typeParameter"));
    if (nodeProperty(current, "nameType") !== undefined) {
      push(" as ");
      visitForDisplayParts(nodeProperty(current, "nameType"));
    }
    push("]");
    const questionToken = nodeProperty(current, "questionToken");
    if (questionToken !== undefined) {
      if (questionToken.kind === Kind.PlusToken) push("+");
      else if (questionToken.kind === Kind.MinusToken) push("-");
      push("?");
    }
    push(": ");
    visitForDisplayParts(nodeProperty(current, "type"));
  };
  const visitMemberSignature = (current: Node, includeParameters: boolean): void => {
    const modifiers = nodeArray(current, "modifiers");
    if (modifiers.length > 0) {
      visitDisplayPartList(modifiers, " ");
      push(" ");
    }
    visitForDisplayParts(nodeName(current));
    const postfixToken = nodeProperty(current, "postfixToken");
    if (postfixToken !== undefined) push(tokenToString(postfixToken.kind));
    if (includeParameters) visitParametersAndTypeParameters(current);
    if (nodeProperty(current, "type") !== undefined) {
      push(": ");
      visitForDisplayParts(nodeProperty(current, "type"));
    }
  };

  visitForDisplayParts(node);
  return parts;
}

export function getNodeDisplayPart(text: string, node: Node, file: SourceFile | undefined = node.getSourceFile()): InlayHintLabelPart {
  return {
    value: text,
    location: getNodeLocation(node, file),
  };
}

export function getLiteralText(node: Node, quotePreference: QuotePreference | undefined = undefined): string {
  const text = nodeText(node);
  switch (node.kind) {
    case Kind.StringLiteral:
      return quotePreference === QuotePreferenceSingle
        ? `'${escapeQuotedText(text, "'")}'`
        : `"${escapeQuotedText(text, "\"")}"`;
    case Kind.TemplateHead:
      return `\`${rawText(node) || escapeQuotedText(text, "`")}\${`;
    case Kind.TemplateMiddle:
      return `}${rawText(node) || escapeQuotedText(text, "`")}\${`;
    case Kind.TemplateTail:
      return `}${rawText(node) || escapeQuotedText(text, "`")}\``;
    default:
      return text;
  }
}

export function stringToInlayHintParts(text: string): StringOrInlayHintLabelParts {
  return { string: text };
}

export function getParameterDeclarationIdentifier(symbol: Symbol | undefined): Identifier | undefined {
  const declaration = symbol?.valueDeclaration;
  const name = declaration === undefined ? undefined : nodeName(declaration);
  return name !== undefined && isIdentifier(name) ? name : undefined;
}

export function identifierOrAccessExpressionPostfixMatchesParameterName(node: Node, parameterName: string): boolean {
  if (isIdentifier(node)) return node.text === parameterName;
  if (isPropertyAccessExpression(node)) {
    return isIdentifier(node.name) && node.name.text === parameterName;
  }
  return false;
}

export function isAnyInlayHintEnabled(preferences: InlayHintsPreferences): boolean {
  return preferences.includeInlayParameterNameHints !== IncludeInlayParameterNameHintsNone
    || tristateIsTrue(preferences.includeInlayFunctionParameterTypeHints)
    || tristateIsTrue(preferences.includeInlayVariableTypeHints)
    || tristateIsTrue(preferences.includeInlayPropertyDeclarationTypeHints)
    || tristateIsTrue(preferences.includeInlayFunctionLikeReturnTypeHints)
    || tristateIsTrue(preferences.includeInlayEnumMemberValueHints);
}

function isVarConst(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.Constant) !== 0;
}

function nodeInitializer(node: Node): Node | undefined {
  return (node as { readonly initializer?: Node }).initializer;
}

function nodeName(node: Node): Node | undefined {
  return (node as { readonly name?: Node }).name;
}

function nodeProperty<T extends Node = Node>(node: Node | undefined, key: string): T | undefined {
  return (node as Record<string, T | undefined> | undefined)?.[key];
}

function nodeArray(node: Node | undefined, key: string): readonly Node[] {
  const value = (node as Record<string, unknown> | undefined)?.[key];
  if (Array.isArray(value)) return value as readonly Node[];
  if (typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes)) {
    return (value as { readonly nodes: readonly Node[] }).nodes;
  }
  return [];
}

function nodeOperator(node: Node): Kind {
  return (node as { readonly operator?: Kind }).operator ?? Kind.Unknown;
}

function rawText(node: Node): string {
  return (node as { readonly rawText?: string }).rawText ?? "";
}

function tokenToString(kind: Kind): string {
  switch (kind) {
    case Kind.AnyKeyword: return "any";
    case Kind.AssertsKeyword: return "asserts";
    case Kind.BigIntKeyword: return "bigint";
    case Kind.BooleanKeyword: return "boolean";
    case Kind.FalseKeyword: return "false";
    case Kind.InferKeyword: return "infer";
    case Kind.KeyOfKeyword: return "keyof";
    case Kind.NeverKeyword: return "never";
    case Kind.NullKeyword: return "null";
    case Kind.NumberKeyword: return "number";
    case Kind.ObjectKeyword: return "object";
    case Kind.ReadonlyKeyword: return "readonly";
    case Kind.StringKeyword: return "string";
    case Kind.SymbolKeyword: return "symbol";
    case Kind.TypeOfKeyword: return "typeof";
    case Kind.TrueKeyword: return "true";
    case Kind.UndefinedKeyword: return "undefined";
    case Kind.UniqueKeyword: return "unique";
    case Kind.UnknownKeyword: return "unknown";
    case Kind.VoidKeyword: return "void";
    case Kind.QuestionToken: return "?";
    case Kind.ColonToken: return ":";
    case Kind.PlusToken: return "+";
    case Kind.MinusToken: return "-";
    case Kind.AsteriskToken: return "*";
    case Kind.SlashToken: return "/";
    case Kind.PercentToken: return "%";
    case Kind.AmpersandToken: return "&";
    case Kind.BarToken: return "|";
    case Kind.CaretToken: return "^";
    case Kind.ExclamationToken: return "!";
    case Kind.TildeToken: return "~";
    case Kind.LessThanToken: return "<";
    case Kind.GreaterThanToken: return ">";
    case Kind.EqualsToken: return "=";
    case Kind.DotToken: return ".";
    case Kind.DotDotDotToken: return "...";
    default: {
      const name = KindNames[kind];
      if (name !== undefined && name.endsWith("Keyword")) return name.slice(0, -"Keyword".length).toLowerCase();
      return "";
    }
  }
}

function getNodeLocation(node: Node, file: SourceFile): Location {
  return {
    uri: fileNameToDocumentURI(file.fileName),
    range: rangeFromOffsets(file, node.pos, node.end),
  };
}

function rangeFromOffsets(file: SourceFile, start: number, end: number): Range {
  return {
    start: positionFromSourceOffset(file, start),
    end: positionFromSourceOffset(file, end),
  };
}

function positionFromSourceOffset(file: SourceFile, offset: number): { readonly line: number; readonly character: number } {
  const lineStarts = sourceLineStarts(file.text);
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    if (lineStarts[index]! > offset) break;
    line = index;
  }
  return { line, character: offset - lineStarts[line]! };
}

function sourceLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index]!;
    if (ch === "\r") {
      if (text[index + 1] === "\n") index += 1;
      starts.push(index + 1);
    } else if (ch === "\n") {
      starts.push(index + 1);
    }
  }
  return starts;
}

function escapeQuotedText(text: string, quote: string): string {
  let result = "";
  for (const ch of text) {
    if (ch === "\\" || ch === quote) result += "\\";
    result += ch;
  }
  return result;
}

// Language-service parity map: internal/ls/inlay_hints.go
/**
 * Language-service parity map for TS-Go `ls/inlay_hints.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

export interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

export interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

export const lsInlayHintsUpstreamPath = "ls/inlay_hints.go";

export const lsInlayHintsDeclarations: readonly UpstreamDeclaration[] = [
  {"line":24,"kind":"func","name":"ProvideInlayHint","receiver":"l *LanguageService"},
  {"line":52,"kind":"type","name":"inlayHintState"},
  {"line":63,"kind":"func","name":"visit","receiver":"s *inlayHintState"},
  {"line":108,"kind":"func","name":"visitFunctionDeclarationLikeForReturnType","receiver":"s *inlayHintState"},
  {"line":142,"kind":"func","name":"visitCallOrNewExpression","receiver":"s *inlayHintState"},
  {"line":208,"kind":"func","name":"visitEnumMember","receiver":"s *inlayHintState"},
  {"line":219,"kind":"func","name":"visitVariableLikeDeclaration","receiver":"s *inlayHintState"},
  {"line":255,"kind":"func","name":"visitFunctionLikeForParameterType","receiver":"s *inlayHintState"},
  {"line":279,"kind":"func","name":"addParameterTypeHint","receiver":"s *inlayHintState"},
  {"line":297,"kind":"func","name":"getParameterDeclarationTypeHints","receiver":"s *inlayHintState"},
  {"line":311,"kind":"func","name":"typeToInlayHintParts","receiver":"s *inlayHintState"},
  {"line":323,"kind":"func","name":"typePredicateToInlayHintParts","receiver":"s *inlayHintState"},
  {"line":335,"kind":"func","name":"addTypeHints","receiver":"s *inlayHintState"},
  {"line":349,"kind":"func","name":"addEnumMemberValueHints","receiver":"s *inlayHintState"},
  {"line":359,"kind":"func","name":"addParameterHints","receiver":"s *inlayHintState"},
  {"line":377,"kind":"func","name":"shouldShowParameterNameHints"},
  {"line":382,"kind":"func","name":"shouldShowLiteralParameterNameHintsOnly"},
  {"line":387,"kind":"func","name":"isSignatureSupportingReturnAnnotation"},
  {"line":392,"kind":"func","name":"isHintableDeclaration"},
  {"line":402,"kind":"func","name":"isHintableLiteral"},
  {"line":417,"kind":"func","name":"isModuleReferenceType"},
  {"line":422,"kind":"func","name":"getInlayHintLabelParts","receiver":"s *inlayHintState"},
  {"line":765,"kind":"func","name":"getNodeDisplayPart","receiver":"s *inlayHintState"},
  {"line":778,"kind":"func","name":"getLiteralText","receiver":"s *inlayHintState"},
  {"line":802,"kind":"type","name":"parameterInfo"},
  {"line":808,"kind":"func","name":"getParameterIdentifierInfoAtPosition","receiver":"s *inlayHintState"},
  {"line":873,"kind":"func","name":"getParameterDeclarationIdentifier"},
  {"line":880,"kind":"func","name":"identifierOrAccessExpressionPostfixMatchesParameterName"},
  {"line":890,"kind":"func","name":"leadingCommentsContainsParameterName","receiver":"s *inlayHintState"},
  {"line":909,"kind":"func","name":"getTypeAnnotationPosition","receiver":"s *inlayHintState"},
  {"line":917,"kind":"func","name":"isAnyInlayHintEnabled"},
];

export const lsInlayHintsSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"slices\""},
  {"line":6,"text":"\t\"strings\""},
  {"line":7,"text":"\t\"unicode\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/evaluator\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/nodebuilder\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":22,"text":")"},
  {"line":24,"text":"func (l *LanguageService) ProvideInlayHint("},
  {"line":25,"text":"\tctx context.Context,"},
  {"line":26,"text":"\tparams *lsproto.InlayHintParams,"},
  {"line":27,"text":") (lsproto.InlayHintResponse, error) {"},
  {"line":28,"text":"\tuserPreferences := l.UserPreferences()"},
  {"line":29,"text":"\tinlayHintPreferences := userPreferences.InlayHints"},
  {"line":30,"text":"\tif !isAnyInlayHintEnabled(inlayHintPreferences) {"},
  {"line":31,"text":"\t\treturn lsproto.InlayHintsOrNull{InlayHints: nil}, nil"},
  {"line":32,"text":"\t}"},
  {"line":34,"text":"\tprogram, file := l.getProgramAndFile(params.TextDocument.Uri)"},
  {"line":35,"text":"\tquotePreference := lsutil.GetQuotePreference(file, userPreferences)"},
  {"line":37,"text":"\tchecker, done := program.GetTypeCheckerForFile(ctx, file)"},
  {"line":38,"text":"\tdefer done()"},
  {"line":39,"text":"\tinlayHintState := &inlayHintState{"},
  {"line":40,"text":"\t\tctx:             ctx,"},
  {"line":41,"text":"\t\tspan:            l.converters.FromLSPRange(file, params.Range),"},
  {"line":42,"text":"\t\tpreferences:     inlayHintPreferences,"},
  {"line":43,"text":"\t\tquotePreference: quotePreference,"},
  {"line":44,"text":"\t\tfile:            file,"},
  {"line":45,"text":"\t\tchecker:         checker,"},
  {"line":46,"text":"\t\tconverters:      l.converters,"},
  {"line":47,"text":"\t}"},
  {"line":48,"text":"\tinlayHintState.visit(file.AsNode())"},
  {"line":49,"text":"\treturn lsproto.InlayHintsOrNull{InlayHints: &inlayHintState.result}, nil"},
  {"line":50,"text":"}"},
  {"line":52,"text":"type inlayHintState struct {"},
  {"line":53,"text":"\tctx             context.Context"},
  {"line":54,"text":"\tspan            core.TextRange"},
  {"line":55,"text":"\tpreferences     lsutil.InlayHintsPreferences"},
  {"line":56,"text":"\tquotePreference lsutil.QuotePreference"},
  {"line":57,"text":"\tfile            *ast.SourceFile"},
  {"line":58,"text":"\tchecker         *checker.Checker"},
  {"line":59,"text":"\tconverters      *lsconv.Converters"},
  {"line":60,"text":"\tresult          []*lsproto.InlayHint"},
  {"line":61,"text":"}"},
  {"line":63,"text":"func (s *inlayHintState) visit(node *ast.Node) bool {"},
  {"line":64,"text":"\tif node == nil || node.End()-node.Pos() == 0 || node.Flags&ast.NodeFlagsReparsed != 0 {"},
  {"line":65,"text":"\t\treturn false"},
  {"line":66,"text":"\t}"},
  {"line":68,"text":"\tswitch node.Kind {"},
  {"line":69,"text":"\tcase ast.KindModuleDeclaration, ast.KindClassDeclaration, ast.KindInterfaceDeclaration,"},
  {"line":70,"text":"\t\tast.KindFunctionDeclaration, ast.KindClassExpression, ast.KindFunctionExpression,"},
  {"line":71,"text":"\t\tast.KindMethodDeclaration, ast.KindArrowFunction:"},
  {"line":72,"text":"\t\tif s.ctx.Err() != nil {"},
  {"line":73,"text":"\t\t\treturn true"},
  {"line":74,"text":"\t\t}"},
  {"line":75,"text":"\t}"},
  {"line":77,"text":"\tif !s.span.Intersects(node.Loc) {"},
  {"line":78,"text":"\t\treturn false"},
  {"line":79,"text":"\t}"},
  {"line":81,"text":"\tif ast.IsTypeNode(node) && !ast.IsExpressionWithTypeArguments(node) {"},
  {"line":82,"text":"\t\treturn false"},
  {"line":83,"text":"\t}"},
  {"line":85,"text":"\tif s.preferences.IncludeInlayVariableTypeHints.IsTrue() && ast.IsVariableDeclaration(node) {"},
  {"line":86,"text":"\t\ts.visitVariableLikeDeclaration(node)"},
  {"line":87,"text":"\t} else if s.preferences.IncludeInlayPropertyDeclarationTypeHints.IsTrue() && ast.IsPropertyDeclaration(node) {"},
  {"line":88,"text":"\t\ts.visitVariableLikeDeclaration(node)"},
  {"line":89,"text":"\t} else if s.preferences.IncludeInlayEnumMemberValueHints.IsTrue() && ast.IsEnumMember(node) {"},
  {"line":90,"text":"\t\ts.visitEnumMember(node)"},
  {"line":91,"text":"\t} else if shouldShowParameterNameHints(s.preferences) && (ast.IsCallExpression(node) || ast.IsNewExpression(node)) {"},
  {"line":92,"text":"\t\ts.visitCallOrNewExpression(node)"},
  {"line":93,"text":"\t} else {"},
  {"line":94,"text":"\t\tif s.preferences.IncludeInlayFunctionParameterTypeHints.IsTrue() &&"},
  {"line":95,"text":"\t\t\tast.IsFunctionLikeDeclaration(node) &&"},
  {"line":96,"text":"\t\t\tast.HasContextSensitiveParameters(node) {"},
  {"line":97,"text":"\t\t\ts.visitFunctionLikeForParameterType(node)"},
  {"line":98,"text":"\t\t}"},
  {"line":99,"text":"\t\tif s.preferences.IncludeInlayFunctionLikeReturnTypeHints.IsTrue() &&"},
  {"line":100,"text":"\t\t\tisSignatureSupportingReturnAnnotation(node) {"},
  {"line":101,"text":"\t\t\ts.visitFunctionDeclarationLikeForReturnType(node)"},
  {"line":102,"text":"\t\t}"},
  {"line":103,"text":"\t}"},
  {"line":104,"text":"\treturn node.ForEachChild(s.visit)"},
  {"line":105,"text":"}"},
  {"line":108,"text":"func (s *inlayHintState) visitFunctionDeclarationLikeForReturnType(decl *ast.FunctionLikeDeclaration) {"},
  {"line":109,"text":"\tif ast.IsArrowFunction(decl) {"},
  {"line":110,"text":"\t\tif astnav.FindChildOfKind(decl, ast.KindOpenParenToken, s.file) == nil {"},
  {"line":111,"text":"\t\t\treturn"},
  {"line":112,"text":"\t\t}"},
  {"line":113,"text":"\t}"},
  {"line":115,"text":"\ttypeAnnotation := decl.Type()"},
  {"line":116,"text":"\tif typeAnnotation != nil || decl.Body() == nil {"},
  {"line":117,"text":"\t\treturn"},
  {"line":118,"text":"\t}"},
  {"line":120,"text":"\tsignature := s.checker.GetSignatureFromDeclaration(decl)"},
  {"line":121,"text":"\tif signature == nil {"},
  {"line":122,"text":"\t\treturn"},
  {"line":123,"text":"\t}"},
  {"line":125,"text":"\ttypePredicate := s.checker.GetTypePredicateOfSignature(signature)"},
  {"line":127,"text":"\tif typePredicate != nil && typePredicate.Type() != nil {"},
  {"line":128,"text":"\t\thintParts := s.typePredicateToInlayHintParts(typePredicate)"},
  {"line":129,"text":"\t\ts.addTypeHints(hintParts, s.getTypeAnnotationPosition(decl))"},
  {"line":130,"text":"\t\treturn"},
  {"line":131,"text":"\t}"},
  {"line":133,"text":"\treturnType := s.checker.GetReturnTypeOfSignature(signature)"},
  {"line":134,"text":"\tif isModuleReferenceType(returnType) {"},
  {"line":135,"text":"\t\treturn"},
  {"line":136,"text":"\t}"},
  {"line":138,"text":"\thintParts := s.typeToInlayHintParts(returnType)"},
  {"line":139,"text":"\ts.addTypeHints(hintParts, s.getTypeAnnotationPosition(decl))"},
  {"line":140,"text":"}"},
  {"line":142,"text":"func (s *inlayHintState) visitCallOrNewExpression(expr *ast.CallOrNewExpression) {"},
  {"line":143,"text":"\targs := expr.Arguments()"},
  {"line":144,"text":"\tif len(args) == 0 {"},
  {"line":145,"text":"\t\treturn"},
  {"line":146,"text":"\t}"},
  {"line":148,"text":"\tsignature := s.checker.GetResolvedSignature(expr)"},
  {"line":149,"text":"\tif signature == nil {"},
  {"line":150,"text":"\t\treturn"},
  {"line":151,"text":"\t}"},
  {"line":153,"text":"\tsignatureParamPos := 0"},
  {"line":154,"text":"\tfor _, originalArg := range args {"},
  {"line":155,"text":"\t\targ := ast.SkipParentheses(originalArg)"},
  {"line":156,"text":"\t\tif shouldShowLiteralParameterNameHintsOnly(s.preferences) && !isHintableLiteral(arg) {"},
  {"line":157,"text":"\t\t\tsignatureParamPos++"},
  {"line":158,"text":"\t\t\tcontinue"},
  {"line":159,"text":"\t\t}"},
  {"line":161,"text":"\t\tspreadArgs := 0"},
  {"line":162,"text":"\t\tif ast.IsSpreadElement(arg) {"},
  {"line":163,"text":"\t\t\tspreadType := s.checker.GetTypeAtLocation(arg.Expression())"},
  {"line":164,"text":"\t\t\tif spreadType.IsTupleType() {"},
  {"line":165,"text":"\t\t\t\telementFlags := spreadType.Target().AsTupleType().ElementFlags()"},
  {"line":166,"text":"\t\t\t\tfixedLength := spreadType.Target().AsTupleType().FixedLength()"},
  {"line":167,"text":"\t\t\t\tif fixedLength == 0 {"},
  {"line":168,"text":"\t\t\t\t\tcontinue"},
  {"line":169,"text":"\t\t\t\t}"},
  {"line":170,"text":"\t\t\t\tfirstOptionalIndex := slices.IndexFunc(elementFlags, func(f checker.ElementFlags) bool {"},
  {"line":171,"text":"\t\t\t\t\treturn f&checker.ElementFlagsRequired == 0"},
  {"line":172,"text":"\t\t\t\t})"},
  {"line":173,"text":"\t\t\t\trequiredArgs := core.IfElse(firstOptionalIndex < 0, fixedLength, firstOptionalIndex)"},
  {"line":174,"text":"\t\t\t\tif requiredArgs > 0 {"},
  {"line":175,"text":"\t\t\t\t\tspreadArgs = requiredArgs"},
  {"line":176,"text":"\t\t\t\t}"},
  {"line":177,"text":"\t\t\t}"},
  {"line":178,"text":"\t\t}"},
  {"line":180,"text":"\t\tidentifierInfo := s.getParameterIdentifierInfoAtPosition(signature, signatureParamPos)"},
  {"line":181,"text":"\t\tsignatureParamPos = signatureParamPos + core.IfElse(spreadArgs > 0, spreadArgs, 1)"},
  {"line":182,"text":"\t\tif identifierInfo == nil {"},
  {"line":183,"text":"\t\t\treturn"},
  {"line":184,"text":"\t\t}"},
  {"line":186,"text":"\t\tparameter := identifierInfo.parameter"},
  {"line":187,"text":"\t\tparameterName := identifierInfo.name"},
  {"line":188,"text":"\t\tisFirstVariadicArgument := identifierInfo.isRestParameter"},
  {"line":189,"text":"\t\tparameterNameNotSameAsArgument := s.preferences.IncludeInlayParameterNameHintsWhenArgumentMatchesName.IsTrue() ||"},
  {"line":190,"text":"\t\t\t!identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName)"},
  {"line":191,"text":"\t\tif !parameterNameNotSameAsArgument && !isFirstVariadicArgument {"},
  {"line":192,"text":"\t\t\tcontinue"},
  {"line":193,"text":"\t\t}"},
  {"line":195,"text":"\t\tif s.leadingCommentsContainsParameterName(arg, parameterName) {"},
  {"line":196,"text":"\t\t\tcontinue"},
  {"line":197,"text":"\t\t}"},
  {"line":199,"text":"\t\ts.addParameterHints("},
  {"line":200,"text":"\t\t\tparameterName,"},
  {"line":201,"text":"\t\t\tparameter,"},
  {"line":202,"text":"\t\t\tastnav.GetStartOfNode(originalArg, s.file, false /*includeJSDoc*/),"},
  {"line":203,"text":"\t\t\tisFirstVariadicArgument,"},
  {"line":204,"text":"\t\t)"},
  {"line":205,"text":"\t}"},
  {"line":206,"text":"}"},
  {"line":208,"text":"func (s *inlayHintState) visitEnumMember(member *ast.EnumMemberNode) {"},
  {"line":209,"text":"\tif member.Initializer() != nil {"},
  {"line":210,"text":"\t\treturn"},
  {"line":211,"text":"\t}"},
  {"line":213,"text":"\tenumValue := s.checker.GetConstantValue(member)"},
  {"line":214,"text":"\tif enumValue != nil {"},
  {"line":215,"text":"\t\ts.addEnumMemberValueHints(evaluator.AnyToString(enumValue), member.End())"},
  {"line":216,"text":"\t}"},
  {"line":217,"text":"}"},
  {"line":219,"text":"func (s *inlayHintState) visitVariableLikeDeclaration(decl *ast.VariableOrPropertyDeclaration) {"},
  {"line":220,"text":"\tif decl.Initializer() == nil &&"},
  {"line":221,"text":"\t\t!(ast.IsPropertyDeclaration(decl) && s.checker.GetTypeAtLocation(decl).Flags()&checker.TypeFlagsAny == 0) ||"},
  {"line":222,"text":"\t\tast.IsBindingPattern(decl.Name()) || (ast.IsVariableDeclaration(decl) && !isHintableDeclaration(decl)) {"},
  {"line":223,"text":"\t\treturn"},
  {"line":224,"text":"\t}"},
  {"line":226,"text":"\ttypeAnnotation := decl.Type()"},
  {"line":227,"text":"\tif typeAnnotation != nil {"},
  {"line":228,"text":"\t\treturn"},
  {"line":229,"text":"\t}"},
  {"line":231,"text":"\tdeclarationType := s.checker.GetTypeAtLocation(decl)"},
  {"line":232,"text":"\tif isModuleReferenceType(declarationType) {"},
  {"line":233,"text":"\t\treturn"},
  {"line":234,"text":"\t}"},
  {"line":236,"text":"\thintParts := s.typeToInlayHintParts(declarationType)"},
  {"line":237,"text":"\tvar hintText string"},
  {"line":238,"text":"\tif hintParts.String != nil {"},
  {"line":239,"text":"\t\thintText = *hintParts.String"},
  {"line":240,"text":"\t} else if hintParts.InlayHintLabelParts != nil {"},
  {"line":241,"text":"\t\tvar b strings.Builder"},
  {"line":242,"text":"\t\tfor _, part := range *hintParts.InlayHintLabelParts {"},
  {"line":243,"text":"\t\t\tb.WriteString(part.Value)"},
  {"line":244,"text":"\t\t}"},
  {"line":245,"text":"\t\thintText = b.String()"},
  {"line":246,"text":"\t}"},
  {"line":247,"text":"\tif !s.preferences.IncludeInlayVariableTypeHintsWhenTypeMatchesName.IsTrue() &&"},
  {"line":248,"text":"\t\t!ast.IsComputedPropertyName(decl.Name()) &&"},
  {"line":249,"text":"\t\tstringutil.EquateStringCaseInsensitive(decl.Name().Text(), hintText) {"},
  {"line":250,"text":"\t\treturn"},
  {"line":251,"text":"\t}"},
  {"line":252,"text":"\ts.addTypeHints(hintParts, decl.Name().End())"},
  {"line":253,"text":"}"},
  {"line":255,"text":"func (s *inlayHintState) visitFunctionLikeForParameterType(node *ast.FunctionLikeDeclaration) {"},
  {"line":256,"text":"\tsignature := s.checker.GetSignatureFromDeclaration(node)"},
  {"line":257,"text":"\tif signature == nil {"},
  {"line":258,"text":"\t\treturn"},
  {"line":259,"text":"\t}"},
  {"line":261,"text":"\tpos := 0"},
  {"line":262,"text":"\tfor _, param := range node.Parameters() {"},
  {"line":263,"text":"\t\tif isHintableDeclaration(param) {"},
  {"line":264,"text":"\t\t\tvar symbol *ast.Symbol"},
  {"line":265,"text":"\t\t\tif ast.IsThisParameter(param) {"},
  {"line":266,"text":"\t\t\t\tsymbol = signature.ThisParameter()"},
  {"line":267,"text":"\t\t\t} else {"},
  {"line":268,"text":"\t\t\t\tsymbol = signature.Parameters()[pos]"},
  {"line":269,"text":"\t\t\t}"},
  {"line":270,"text":"\t\t\ts.addParameterTypeHint(param, symbol)"},
  {"line":271,"text":"\t\t}"},
  {"line":272,"text":"\t\tif ast.IsThisParameter(param) {"},
  {"line":273,"text":"\t\t\tcontinue"},
  {"line":274,"text":"\t\t}"},
  {"line":275,"text":"\t\tpos++"},
  {"line":276,"text":"\t}"},
  {"line":277,"text":"}"},
  {"line":279,"text":"func (s *inlayHintState) addParameterTypeHint(node *ast.ParameterDeclarationNode, symbol *ast.Symbol) {"},
  {"line":280,"text":"\ttypeAnnotation := node.Type()"},
  {"line":281,"text":"\tif typeAnnotation != nil || symbol == nil {"},
  {"line":282,"text":"\t\treturn"},
  {"line":283,"text":"\t}"},
  {"line":284,"text":"\ttypeHints := s.getParameterDeclarationTypeHints(symbol)"},
  {"line":285,"text":"\tif typeHints == nil {"},
  {"line":286,"text":"\t\treturn"},
  {"line":287,"text":"\t}"},
  {"line":288,"text":"\tvar pos int"},
  {"line":289,"text":"\tif node.QuestionToken() != nil {"},
  {"line":290,"text":"\t\tpos = node.QuestionToken().End()"},
  {"line":291,"text":"\t} else {"},
  {"line":292,"text":"\t\tpos = node.Name().End()"},
  {"line":293,"text":"\t}"},
  {"line":294,"text":"\ts.addTypeHints(*typeHints, pos)"},
  {"line":295,"text":"}"},
  {"line":297,"text":"func (s *inlayHintState) getParameterDeclarationTypeHints(symbol *ast.Symbol) *lsproto.StringOrInlayHintLabelParts {"},
  {"line":298,"text":"\tvalueDeclaration := symbol.ValueDeclaration"},
  {"line":299,"text":"\tif valueDeclaration == nil || !ast.IsParameterDeclaration(valueDeclaration) {"},
  {"line":300,"text":"\t\treturn nil"},
  {"line":301,"text":"\t}"},
  {"line":303,"text":"\tsignatureParamType := s.checker.GetTypeOfSymbolAtLocation(symbol, valueDeclaration)"},
  {"line":304,"text":"\tif isModuleReferenceType(signatureParamType) {"},
  {"line":305,"text":"\t\treturn nil"},
  {"line":306,"text":"\t}"},
  {"line":308,"text":"\treturn new(s.typeToInlayHintParts(signatureParamType))"},
  {"line":309,"text":"}"},
  {"line":311,"text":"func (s *inlayHintState) typeToInlayHintParts(t *checker.Type) lsproto.StringOrInlayHintLabelParts {"},
  {"line":312,"text":"\tflags := nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsAllowUniqueESSymbolType |"},
  {"line":313,"text":"\t\tnodebuilder.FlagsUseAliasDefinedOutsideCurrentScope"},
  {"line":314,"text":"\tidToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)"},
  {"line":316,"text":"\ttypeNode := s.checker.TypeToTypeNode(t, nil /*enclosingDeclaration*/, flags, idToSymbol)"},
  {"line":317,"text":"\tdebug.Assert(typeNode != nil, \"should always get typenode\")"},
  {"line":318,"text":"\treturn lsproto.StringOrInlayHintLabelParts{"},
  {"line":319,"text":"\t\tInlayHintLabelParts: new(s.getInlayHintLabelParts(typeNode, idToSymbol)),"},
  {"line":320,"text":"\t}"},
  {"line":321,"text":"}"},
  {"line":323,"text":"func (s *inlayHintState) typePredicateToInlayHintParts(typePredicate *checker.TypePredicate) lsproto.StringOrInlayHintLabelParts {"},
  {"line":324,"text":"\tflags := nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsAllowUniqueESSymbolType |"},
  {"line":325,"text":"\t\tnodebuilder.FlagsUseAliasDefinedOutsideCurrentScope"},
  {"line":326,"text":"\tidToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)"},
  {"line":328,"text":"\ttypeNode := s.checker.TypePredicateToTypePredicateNode(typePredicate, nil /*enclosingDeclaration*/, flags, idToSymbol)"},
  {"line":329,"text":"\tdebug.Assert(typeNode != nil, \"should always get typePredicateNode\")"},
  {"line":330,"text":"\treturn lsproto.StringOrInlayHintLabelParts{"},
  {"line":331,"text":"\t\tInlayHintLabelParts: new(s.getInlayHintLabelParts(typeNode, idToSymbol)),"},
  {"line":332,"text":"\t}"},
  {"line":333,"text":"}"},
  {"line":335,"text":"func (s *inlayHintState) addTypeHints(hint lsproto.StringOrInlayHintLabelParts, position int) {"},
  {"line":336,"text":"\tif hint.String != nil {"},
  {"line":337,"text":"\t\thint.String = new(\": \" + *hint.String)"},
  {"line":338,"text":"\t} else {"},
  {"line":339,"text":"\t\thint.InlayHintLabelParts = new(append([]*lsproto.InlayHintLabelPart{{Value: \": \"}}, *hint.InlayHintLabelParts...))"},
  {"line":340,"text":"\t}"},
  {"line":341,"text":"\ts.result = append(s.result, &lsproto.InlayHint{"},
  {"line":342,"text":"\t\tLabel:       hint,"},
  {"line":343,"text":"\t\tPosition:    s.converters.PositionToLineAndCharacter(s.file, core.TextPos(position)),"},
  {"line":344,"text":"\t\tKind:        new(lsproto.InlayHintKindType),"},
  {"line":345,"text":"\t\tPaddingLeft: new(true),"},
  {"line":346,"text":"\t})"},
  {"line":347,"text":"}"},
  {"line":349,"text":"func (s *inlayHintState) addEnumMemberValueHints(text string, position int) {"},
  {"line":350,"text":"\ts.result = append(s.result, &lsproto.InlayHint{"},
  {"line":351,"text":"\t\tLabel: lsproto.StringOrInlayHintLabelParts{"},
  {"line":352,"text":"\t\t\tString: new(\"= \" + text),"},
  {"line":353,"text":"\t\t},"},
  {"line":354,"text":"\t\tPosition:    s.converters.PositionToLineAndCharacter(s.file, core.TextPos(position)),"},
  {"line":355,"text":"\t\tPaddingLeft: new(true),"},
  {"line":356,"text":"\t})"},
  {"line":357,"text":"}"},
  {"line":359,"text":"func (s *inlayHintState) addParameterHints(text string, parameter *ast.IdentifierNode, position int, isFirstVariadicArgument bool) {"},
  {"line":360,"text":"\thintText := core.IfElse(isFirstVariadicArgument, \"...\", \"\") + text"},
  {"line":361,"text":"\tdisplayParts := []*lsproto.InlayHintLabelPart{"},
  {"line":362,"text":"\t\ts.getNodeDisplayPart(hintText, parameter),"},
  {"line":363,"text":"\t\t{"},
  {"line":364,"text":"\t\t\tValue: \":\","},
  {"line":365,"text":"\t\t},"},
  {"line":366,"text":"\t}"},
  {"line":367,"text":"\tlabelParts := lsproto.StringOrInlayHintLabelParts{InlayHintLabelParts: &displayParts}"},
  {"line":369,"text":"\ts.result = append(s.result, &lsproto.InlayHint{"},
  {"line":370,"text":"\t\tLabel:        labelParts,"},
  {"line":371,"text":"\t\tPosition:     s.converters.PositionToLineAndCharacter(s.file, core.TextPos(position)),"},
  {"line":372,"text":"\t\tKind:         new(lsproto.InlayHintKindParameter),"},
  {"line":373,"text":"\t\tPaddingRight: new(true),"},
  {"line":374,"text":"\t})"},
  {"line":375,"text":"}"},
  {"line":377,"text":"func shouldShowParameterNameHints(preferences lsutil.InlayHintsPreferences) bool {"},
  {"line":378,"text":"\treturn (preferences.IncludeInlayParameterNameHints == lsutil.IncludeInlayParameterNameHintsLiterals ||"},
  {"line":379,"text":"\t\tpreferences.IncludeInlayParameterNameHints == lsutil.IncludeInlayParameterNameHintsAll)"},
  {"line":380,"text":"}"},
  {"line":382,"text":"func shouldShowLiteralParameterNameHintsOnly(preferences lsutil.InlayHintsPreferences) bool {"},
  {"line":383,"text":"\treturn preferences.IncludeInlayParameterNameHints == lsutil.IncludeInlayParameterNameHintsLiterals"},
  {"line":384,"text":"}"},
  {"line":387,"text":"func isSignatureSupportingReturnAnnotation(node *ast.Node) bool {"},
  {"line":388,"text":"\treturn ast.IsArrowFunction(node) || ast.IsFunctionExpression(node) || ast.IsFunctionDeclaration(node) ||"},
  {"line":389,"text":"\t\tast.IsMethodDeclaration(node) || ast.IsGetAccessorDeclaration(node)"},
  {"line":390,"text":"}"},
  {"line":392,"text":"func isHintableDeclaration(node *ast.VariableOrParameterDeclaration) bool {"},
  {"line":393,"text":"\tif (ast.IsPartOfParameterDeclaration(node) || ast.IsVariableDeclaration(node) && ast.IsVarConst(node)) &&"},
  {"line":394,"text":"\t\tnode.Initializer() != nil {"},
  {"line":395,"text":"\t\tinitializer := ast.SkipParentheses(node.Initializer())"},
  {"line":396,"text":"\t\treturn !(isHintableLiteral(initializer) || ast.IsNewExpression(initializer) ||"},
  {"line":397,"text":"\t\t\tast.IsObjectLiteralExpression(initializer) || ast.IsAssertionExpression(initializer))"},
  {"line":398,"text":"\t}"},
  {"line":399,"text":"\treturn true"},
  {"line":400,"text":"}"},
  {"line":402,"text":"func isHintableLiteral(node *ast.Node) bool {"},
  {"line":403,"text":"\tswitch node.Kind {"},
  {"line":404,"text":"\tcase ast.KindPrefixUnaryExpression:"},
  {"line":405,"text":"\t\toperand := node.AsPrefixUnaryExpression().Operand"},
  {"line":406,"text":"\t\treturn ast.IsLiteralExpression(operand) || ast.IsIdentifier(operand) && ast.IsInfinityOrNaNString(operand.Text())"},
  {"line":407,"text":"\tcase ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindNullKeyword,"},
  {"line":408,"text":"\t\tast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateExpression:"},
  {"line":409,"text":"\t\treturn true"},
  {"line":410,"text":"\tcase ast.KindIdentifier:"},
  {"line":411,"text":"\t\tname := node.Text()"},
  {"line":412,"text":"\t\treturn name == \"undefined\" || ast.IsInfinityOrNaNString(name)"},
  {"line":413,"text":"\t}"},
  {"line":414,"text":"\treturn ast.IsLiteralExpression(node)"},
  {"line":415,"text":"}"},
  {"line":417,"text":"func isModuleReferenceType(t *checker.Type) bool {"},
  {"line":418,"text":"\tsymbol := t.Symbol()"},
  {"line":419,"text":"\treturn symbol != nil && symbol.Flags&ast.SymbolFlagsModule != 0"},
  {"line":420,"text":"}"},
  {"line":422,"text":"func (s *inlayHintState) getInlayHintLabelParts(node *ast.Node, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) []*lsproto.InlayHintLabelPart {"},
  {"line":423,"text":"\tvar parts []*lsproto.InlayHintLabelPart"},
  {"line":425,"text":"\tvar visitForDisplayParts func(node *ast.Node)"},
  {"line":426,"text":"\tvar visitDisplayPartList func(nodes []*ast.Node, separator string)"},
  {"line":427,"text":"\tvar visitParametersAndTypeParameters func(node *ast.SignatureDeclaration)"},
  {"line":429,"text":"\tvisitForDisplayParts = func(node *ast.Node) {"},
  {"line":430,"text":"\t\tif node == nil {"},
  {"line":431,"text":"\t\t\treturn"},
  {"line":432,"text":"\t\t}"},
  {"line":434,"text":"\t\ttokenString := scanner.TokenToString(node.Kind)"},
  {"line":435,"text":"\t\tif tokenString != \"\" {"},
  {"line":436,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: tokenString})"},
  {"line":437,"text":"\t\t\treturn"},
  {"line":438,"text":"\t\t}"},
  {"line":440,"text":"\t\tif ast.IsLiteralExpression(node) {"},
  {"line":441,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: s.getLiteralText(node)})"},
  {"line":442,"text":"\t\t\treturn"},
  {"line":443,"text":"\t\t}"},
  {"line":445,"text":"\t\tswitch node.Kind {"},
  {"line":446,"text":"\t\tcase ast.KindIdentifier:"},
  {"line":447,"text":"\t\t\tidentifierText := node.Text()"},
  {"line":448,"text":"\t\t\tvar name *ast.Node"},
  {"line":449,"text":"\t\t\tif symbol := idToSymbol[node]; symbol != nil && len(symbol.Declarations) != 0 {"},
  {"line":450,"text":"\t\t\t\tname = ast.GetNameOfDeclaration(symbol.Declarations[0])"},
  {"line":451,"text":"\t\t\t}"},
  {"line":452,"text":"\t\t\tif name != nil {"},
  {"line":453,"text":"\t\t\t\tparts = append(parts, s.getNodeDisplayPart(identifierText, name))"},
  {"line":454,"text":"\t\t\t} else {"},
  {"line":455,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: identifierText})"},
  {"line":456,"text":"\t\t\t}"},
  {"line":457,"text":"\t\tcase ast.KindQualifiedName:"},
  {"line":458,"text":"\t\t\tvisitForDisplayParts(node.AsQualifiedName().Left)"},
  {"line":459,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \".\"})"},
  {"line":460,"text":"\t\t\tvisitForDisplayParts(node.AsQualifiedName().Right)"},
  {"line":461,"text":"\t\tcase ast.KindTypePredicate:"},
  {"line":462,"text":"\t\t\tif node.AsTypePredicateNode().AssertsModifier != nil {"},
  {"line":463,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"asserts \"})"},
  {"line":464,"text":"\t\t\t}"},
  {"line":465,"text":"\t\t\tvisitForDisplayParts(node.AsTypePredicateNode().ParameterName)"},
  {"line":466,"text":"\t\t\tif node.Type() != nil {"},
  {"line":467,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" is \"})"},
  {"line":468,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":469,"text":"\t\t\t}"},
  {"line":470,"text":"\t\tcase ast.KindTypeReference:"},
  {"line":471,"text":"\t\t\tvisitForDisplayParts(node.AsTypeReferenceNode().TypeName)"},
  {"line":472,"text":"\t\t\tif len(node.TypeArguments()) > 0 {"},
  {"line":473,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"<\"})"},
  {"line":474,"text":"\t\t\t\tvisitDisplayPartList(node.TypeArguments(), \",\")"},
  {"line":475,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \">\"})"},
  {"line":476,"text":"\t\t\t}"},
  {"line":477,"text":"\t\tcase ast.KindTypeParameter:"},
  {"line":478,"text":"\t\t\tif len(node.ModifierNodes()) > 0 {"},
  {"line":479,"text":"\t\t\t\tvisitDisplayPartList(node.ModifierNodes(), \"\")"},
  {"line":480,"text":"\t\t\t}"},
  {"line":481,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":482,"text":"\t\t\tif node.AsTypeParameterDeclaration().Constraint != nil {"},
  {"line":483,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" extends \"})"},
  {"line":484,"text":"\t\t\t\tvisitForDisplayParts(node.AsTypeParameterDeclaration().Constraint)"},
  {"line":485,"text":"\t\t\t}"},
  {"line":486,"text":"\t\t\tif node.AsTypeParameterDeclaration().DefaultType != nil {"},
  {"line":487,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" = \"})"},
  {"line":488,"text":"\t\t\t\tvisitForDisplayParts(node.AsTypeParameterDeclaration().DefaultType)"},
  {"line":489,"text":"\t\t\t}"},
  {"line":490,"text":"\t\tcase ast.KindParameter:"},
  {"line":491,"text":"\t\t\tif len(node.ModifierNodes()) > 0 {"},
  {"line":492,"text":"\t\t\t\tvisitDisplayPartList(node.ModifierNodes(), \" \")"},
  {"line":493,"text":"\t\t\t}"},
  {"line":494,"text":"\t\t\tif node.AsParameterDeclaration().DotDotDotToken != nil {"},
  {"line":495,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"...\"})"},
  {"line":496,"text":"\t\t\t}"},
  {"line":497,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":498,"text":"\t\t\tif node.QuestionToken() != nil {"},
  {"line":499,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"?\"})"},
  {"line":500,"text":"\t\t\t}"},
  {"line":501,"text":"\t\t\tif node.Type() != nil {"},
  {"line":502,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":503,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":504,"text":"\t\t\t}"},
  {"line":505,"text":"\t\tcase ast.KindConstructorType:"},
  {"line":506,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"new \"})"},
  {"line":507,"text":"\t\t\tvisitParametersAndTypeParameters(node)"},
  {"line":508,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" => \"})"},
  {"line":509,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":510,"text":"\t\tcase ast.KindTypeQuery:"},
  {"line":511,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"typeof \"})"},
  {"line":512,"text":"\t\t\tvisitForDisplayParts(node.AsTypeQueryNode().ExprName)"},
  {"line":513,"text":"\t\t\tif len(node.TypeArguments()) > 0 {"},
  {"line":514,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"<\"})"},
  {"line":515,"text":"\t\t\t\tvisitDisplayPartList(node.TypeArguments(), \", \")"},
  {"line":516,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \">\"})"},
  {"line":517,"text":"\t\t\t}"},
  {"line":518,"text":"\t\tcase ast.KindTypeLiteral:"},
  {"line":519,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"{\"})"},
  {"line":520,"text":"\t\t\tif len(node.Members()) > 0 {"},
  {"line":521,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" \"})"},
  {"line":522,"text":"\t\t\t\tvisitDisplayPartList(node.Members(), \"; \")"},
  {"line":523,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" \"})"},
  {"line":524,"text":"\t\t\t}"},
  {"line":525,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"}\"})"},
  {"line":526,"text":"\t\tcase ast.KindArrayType:"},
  {"line":527,"text":"\t\t\tvisitForDisplayParts(node.AsArrayTypeNode().ElementType)"},
  {"line":528,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[]\"})"},
  {"line":529,"text":"\t\tcase ast.KindTupleType:"},
  {"line":530,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":531,"text":"\t\t\tvisitDisplayPartList(node.Elements(), \", \")"},
  {"line":532,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":533,"text":"\t\tcase ast.KindNamedTupleMember:"},
  {"line":534,"text":"\t\t\tif node.AsNamedTupleMember().DotDotDotToken != nil {"},
  {"line":535,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"...\"})"},
  {"line":536,"text":"\t\t\t}"},
  {"line":537,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":538,"text":"\t\t\tif node.QuestionToken() != nil {"},
  {"line":539,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"?\"})"},
  {"line":540,"text":"\t\t\t}"},
  {"line":541,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":542,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":543,"text":"\t\tcase ast.KindOptionalType:"},
  {"line":544,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":545,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"?\"})"},
  {"line":546,"text":"\t\tcase ast.KindRestType:"},
  {"line":547,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"...\"})"},
  {"line":548,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":549,"text":"\t\tcase ast.KindUnionType:"},
  {"line":550,"text":"\t\t\tif node.AsUnionTypeNode().Types != nil {"},
  {"line":551,"text":"\t\t\t\tvisitDisplayPartList(node.AsUnionTypeNode().Types.Nodes, \" | \")"},
  {"line":552,"text":"\t\t\t}"},
  {"line":553,"text":"\t\tcase ast.KindIntersectionType:"},
  {"line":554,"text":"\t\t\tif node.AsIntersectionTypeNode().Types != nil {"},
  {"line":555,"text":"\t\t\t\tvisitDisplayPartList(node.AsIntersectionTypeNode().Types.Nodes, \" & \")"},
  {"line":556,"text":"\t\t\t}"},
  {"line":557,"text":"\t\tcase ast.KindConditionalType:"},
  {"line":558,"text":"\t\t\tvisitForDisplayParts(node.AsConditionalTypeNode().CheckType)"},
  {"line":559,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" extends \"})"},
  {"line":560,"text":"\t\t\tvisitForDisplayParts(node.AsConditionalTypeNode().ExtendsType)"},
  {"line":561,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" ? \"})"},
  {"line":562,"text":"\t\t\tvisitForDisplayParts(node.AsConditionalTypeNode().TrueType)"},
  {"line":563,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" : \"})"},
  {"line":564,"text":"\t\t\tvisitForDisplayParts(node.AsConditionalTypeNode().FalseType)"},
  {"line":565,"text":"\t\tcase ast.KindInferType:"},
  {"line":566,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"infer \"})"},
  {"line":567,"text":"\t\t\tvisitForDisplayParts(node.AsInferTypeNode().TypeParameter)"},
  {"line":568,"text":"\t\tcase ast.KindParenthesizedType:"},
  {"line":569,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"(\"})"},
  {"line":570,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":571,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \")\"})"},
  {"line":572,"text":"\t\tcase ast.KindTypeOperator:"},
  {"line":573,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: scanner.TokenToString(node.AsTypeOperatorNode().Operator)})"},
  {"line":574,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":575,"text":"\t\tcase ast.KindIndexedAccessType:"},
  {"line":576,"text":"\t\t\tvisitForDisplayParts(node.AsIndexedAccessTypeNode().ObjectType)"},
  {"line":577,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":578,"text":"\t\t\tvisitForDisplayParts(node.AsIndexedAccessTypeNode().IndexType)"},
  {"line":579,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":580,"text":"\t\tcase ast.KindMappedType:"},
  {"line":581,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"{ \"})"},
  {"line":582,"text":"\t\t\tif node.AsMappedTypeNode().ReadonlyToken != nil {"},
  {"line":583,"text":"\t\t\t\tif node.AsMappedTypeNode().ReadonlyToken.Kind == ast.KindPlusToken {"},
  {"line":584,"text":"\t\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"+\"})"},
  {"line":585,"text":"\t\t\t\t} else if node.AsMappedTypeNode().ReadonlyToken.Kind == ast.KindMinusToken {"},
  {"line":586,"text":"\t\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"-\"})"},
  {"line":587,"text":"\t\t\t\t}"},
  {"line":588,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"readonly \"})"},
  {"line":589,"text":"\t\t\t}"},
  {"line":590,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":591,"text":"\t\t\tvisitForDisplayParts(node.AsMappedTypeNode().TypeParameter)"},
  {"line":592,"text":"\t\t\tif node.AsMappedTypeNode().NameType != nil {"},
  {"line":593,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" as \"})"},
  {"line":594,"text":"\t\t\t\tvisitForDisplayParts(node.AsMappedTypeNode().NameType)"},
  {"line":595,"text":"\t\t\t}"},
  {"line":596,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":597,"text":"\t\t\tif node.QuestionToken() != nil {"},
  {"line":598,"text":"\t\t\t\tif node.QuestionToken().Kind == ast.KindPlusToken {"},
  {"line":599,"text":"\t\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"+\"})"},
  {"line":600,"text":"\t\t\t\t} else if node.QuestionToken().Kind == ast.KindMinusToken {"},
  {"line":601,"text":"\t\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"-\"})"},
  {"line":602,"text":"\t\t\t\t}"},
  {"line":603,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"?\"})"},
  {"line":604,"text":"\t\t\t}"},
  {"line":605,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":606,"text":"\t\t\tif node.Type() != nil {"},
  {"line":607,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":608,"text":"\t\t\t}"},
  {"line":609,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"; }\"})"},
  {"line":610,"text":"\t\tcase ast.KindLiteralType:"},
  {"line":611,"text":"\t\t\tvisitForDisplayParts(node.AsLiteralTypeNode().Literal)"},
  {"line":612,"text":"\t\tcase ast.KindFunctionType:"},
  {"line":613,"text":"\t\t\tvisitParametersAndTypeParameters(node)"},
  {"line":614,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" => \"})"},
  {"line":615,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":616,"text":"\t\tcase ast.KindImportType:"},
  {"line":617,"text":"\t\t\tif node.AsImportTypeNode().IsTypeOf {"},
  {"line":618,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"typeof \"})"},
  {"line":619,"text":"\t\t\t}"},
  {"line":620,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"import(\"})"},
  {"line":621,"text":"\t\t\tvisitForDisplayParts(node.AsImportTypeNode().Argument)"},
  {"line":622,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \")\"})"},
  {"line":623,"text":"\t\t\tif node.AsImportTypeNode().Qualifier != nil {"},
  {"line":624,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \".\"})"},
  {"line":625,"text":"\t\t\t\tvisitForDisplayParts(node.AsImportTypeNode().Qualifier)"},
  {"line":626,"text":"\t\t\t}"},
  {"line":627,"text":"\t\t\tif len(node.TypeArguments()) > 0 {"},
  {"line":628,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"<\"})"},
  {"line":629,"text":"\t\t\t\tvisitDisplayPartList(node.TypeArguments(), \", \")"},
  {"line":630,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \">\"})"},
  {"line":631,"text":"\t\t\t}"},
  {"line":632,"text":"\t\tcase ast.KindPropertySignature:"},
  {"line":633,"text":"\t\t\tif len(node.ModifierNodes()) > 0 {"},
  {"line":634,"text":"\t\t\t\tvisitDisplayPartList(node.ModifierNodes(), \" \")"},
  {"line":635,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" \"})"},
  {"line":636,"text":"\t\t\t}"},
  {"line":637,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":638,"text":"\t\t\tif node.PostfixToken() != nil {"},
  {"line":639,"text":"\t\t\t\tparts = append("},
  {"line":640,"text":"\t\t\t\t\tparts,"},
  {"line":641,"text":"\t\t\t\t\t&lsproto.InlayHintLabelPart{"},
  {"line":642,"text":"\t\t\t\t\t\tValue: scanner.TokenToString(node.PostfixToken().Kind),"},
  {"line":643,"text":"\t\t\t\t\t})"},
  {"line":644,"text":"\t\t\t}"},
  {"line":645,"text":"\t\t\tif node.Type() != nil {"},
  {"line":646,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":647,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":648,"text":"\t\t\t}"},
  {"line":649,"text":"\t\tcase ast.KindIndexSignature:"},
  {"line":650,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":651,"text":"\t\t\tvisitDisplayPartList(node.Parameters(), \", \")"},
  {"line":652,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":653,"text":"\t\t\tif node.Type() != nil {"},
  {"line":654,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":655,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":656,"text":"\t\t\t}"},
  {"line":657,"text":"\t\tcase ast.KindMethodSignature:"},
  {"line":658,"text":"\t\t\tif len(node.ModifierNodes()) > 0 {"},
  {"line":659,"text":"\t\t\t\tvisitDisplayPartList(node.ModifierNodes(), \" \")"},
  {"line":660,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" \"})"},
  {"line":661,"text":"\t\t\t}"},
  {"line":662,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":663,"text":"\t\t\tif node.PostfixToken() != nil {"},
  {"line":664,"text":"\t\t\t\tparts = append("},
  {"line":665,"text":"\t\t\t\t\tparts,"},
  {"line":666,"text":"\t\t\t\t\t&lsproto.InlayHintLabelPart{"},
  {"line":667,"text":"\t\t\t\t\t\tValue: scanner.TokenToString(node.PostfixToken().Kind),"},
  {"line":668,"text":"\t\t\t\t\t})"},
  {"line":669,"text":"\t\t\t}"},
  {"line":670,"text":"\t\t\tvisitParametersAndTypeParameters(node)"},
  {"line":671,"text":"\t\t\tif node.Type() != nil {"},
  {"line":672,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":673,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":674,"text":"\t\t\t}"},
  {"line":675,"text":"\t\tcase ast.KindCallSignature:"},
  {"line":676,"text":"\t\t\tvisitParametersAndTypeParameters(node)"},
  {"line":677,"text":"\t\t\tif node.Type() != nil {"},
  {"line":678,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":679,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":680,"text":"\t\t\t}"},
  {"line":681,"text":"\t\tcase ast.KindConstructSignature:"},
  {"line":682,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"new \"})"},
  {"line":683,"text":"\t\t\tvisitParametersAndTypeParameters(node)"},
  {"line":684,"text":"\t\t\tif node.Type() != nil {"},
  {"line":685,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \": \"})"},
  {"line":686,"text":"\t\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":687,"text":"\t\t\t}"},
  {"line":688,"text":"\t\tcase ast.KindArrayBindingPattern:"},
  {"line":689,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":690,"text":"\t\t\tvisitDisplayPartList(node.Elements(), \", \")"},
  {"line":691,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":692,"text":"\t\tcase ast.KindObjectBindingPattern:"},
  {"line":693,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"{\"})"},
  {"line":694,"text":"\t\t\tif len(node.Elements()) > 0 {"},
  {"line":695,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" \"})"},
  {"line":696,"text":"\t\t\t\tvisitDisplayPartList(node.Elements(), \", \")"},
  {"line":697,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \" \"})"},
  {"line":698,"text":"\t\t\t}"},
  {"line":699,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"}\"})"},
  {"line":700,"text":"\t\tcase ast.KindBindingElement:"},
  {"line":701,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":702,"text":"\t\tcase ast.KindPrefixUnaryExpression:"},
  {"line":703,"text":"\t\t\tparts = append("},
  {"line":704,"text":"\t\t\t\tparts,"},
  {"line":705,"text":"\t\t\t\t&lsproto.InlayHintLabelPart{"},
  {"line":706,"text":"\t\t\t\t\tValue: scanner.TokenToString(node.AsPrefixUnaryExpression().Operator),"},
  {"line":707,"text":"\t\t\t\t})"},
  {"line":708,"text":"\t\t\tvisitForDisplayParts(node.AsPrefixUnaryExpression().Operand)"},
  {"line":709,"text":"\t\tcase ast.KindTemplateLiteralType:"},
  {"line":710,"text":"\t\t\tvisitForDisplayParts(node.AsTemplateLiteralTypeNode().Head)"},
  {"line":711,"text":"\t\t\tfor _, span := range node.AsTemplateLiteralTypeNode().TemplateSpans.Nodes {"},
  {"line":712,"text":"\t\t\t\tvisitForDisplayParts(span)"},
  {"line":713,"text":"\t\t\t}"},
  {"line":714,"text":"\t\tcase ast.KindTemplateHead:"},
  {"line":715,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: s.getLiteralText(node)})"},
  {"line":716,"text":"\t\tcase ast.KindTemplateLiteralTypeSpan:"},
  {"line":717,"text":"\t\t\tvisitForDisplayParts(node.Type())"},
  {"line":718,"text":"\t\t\tvisitForDisplayParts(node.AsTemplateLiteralTypeSpan().Literal)"},
  {"line":719,"text":"\t\tcase ast.KindTemplateMiddle, ast.KindTemplateTail:"},
  {"line":720,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: s.getLiteralText(node)})"},
  {"line":721,"text":"\t\tcase ast.KindThisType:"},
  {"line":722,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"this\"})"},
  {"line":723,"text":"\t\tcase ast.KindComputedPropertyName:"},
  {"line":724,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":725,"text":"\t\t\tvisitForDisplayParts(node.Expression())"},
  {"line":726,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":727,"text":"\t\tcase ast.KindPropertyAccessExpression:"},
  {"line":728,"text":"\t\t\tvisitForDisplayParts(node.Expression())"},
  {"line":729,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \".\"})"},
  {"line":730,"text":"\t\t\tvisitForDisplayParts(node.Name())"},
  {"line":731,"text":"\t\tcase ast.KindElementAccessExpression:"},
  {"line":732,"text":"\t\t\tvisitForDisplayParts(node.Expression())"},
  {"line":733,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"[\"})"},
  {"line":734,"text":"\t\t\tvisitForDisplayParts(node.AsElementAccessExpression().ArgumentExpression)"},
  {"line":735,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"]\"})"},
  {"line":736,"text":"\t\tdefault:"},
  {"line":737,"text":"\t\t\tdebug.FailBadSyntaxKind(node)"},
  {"line":738,"text":"\t\t}"},
  {"line":739,"text":"\t}"},
  {"line":741,"text":"\tvisitDisplayPartList = func(nodes []*ast.Node, separator string) {"},
  {"line":742,"text":"\t\tfor i, n := range nodes {"},
  {"line":743,"text":"\t\t\tif i > 0 {"},
  {"line":744,"text":"\t\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: separator})"},
  {"line":745,"text":"\t\t\t}"},
  {"line":746,"text":"\t\t\tvisitForDisplayParts(n)"},
  {"line":747,"text":"\t\t}"},
  {"line":748,"text":"\t}"},
  {"line":750,"text":"\tvisitParametersAndTypeParameters = func(node *ast.SignatureDeclaration) {"},
  {"line":751,"text":"\t\tif len(node.TypeParameters()) > 0 {"},
  {"line":752,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"<\"})"},
  {"line":753,"text":"\t\t\tvisitDisplayPartList(node.TypeParameters(), \", \")"},
  {"line":754,"text":"\t\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \">\"})"},
  {"line":755,"text":"\t\t}"},
  {"line":756,"text":"\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \"(\"})"},
  {"line":757,"text":"\t\tvisitDisplayPartList(node.Parameters(), \", \")"},
  {"line":758,"text":"\t\tparts = append(parts, &lsproto.InlayHintLabelPart{Value: \")\"})"},
  {"line":759,"text":"\t}"},
  {"line":761,"text":"\tvisitForDisplayParts(node)"},
  {"line":762,"text":"\treturn parts"},
  {"line":763,"text":"}"},
  {"line":765,"text":"func (s *inlayHintState) getNodeDisplayPart(text string, node *ast.Node) *lsproto.InlayHintLabelPart {"},
  {"line":766,"text":"\tfile := ast.GetSourceFileOfNode(node)"},
  {"line":767,"text":"\tpos := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/)"},
  {"line":768,"text":"\tend := node.End()"},
  {"line":769,"text":"\treturn &lsproto.InlayHintLabelPart{"},
  {"line":770,"text":"\t\tValue: text,"},
  {"line":771,"text":"\t\tLocation: &lsproto.Location{"},
  {"line":772,"text":"\t\t\tUri:   lsconv.FileNameToDocumentURI(file.FileName()),"},
  {"line":773,"text":"\t\t\tRange: s.converters.ToLSPRange(file, core.NewTextRange(pos, end)),"},
  {"line":774,"text":"\t\t},"},
  {"line":775,"text":"\t}"},
  {"line":776,"text":"}"},
  {"line":778,"text":"func (s *inlayHintState) getLiteralText(node *ast.LiteralLikeNode) string {"},
  {"line":779,"text":"\tswitch node.Kind {"},
  {"line":780,"text":"\tcase ast.KindStringLiteral:"},
  {"line":781,"text":"\t\tif s.quotePreference == lsutil.QuotePreferenceSingle {"},
  {"line":782,"text":"\t\t\treturn `'` + printer.EscapeString(node.Text(), printer.QuoteCharSingleQuote) + `'`"},
  {"line":783,"text":"\t\t}"},
  {"line":784,"text":"\t\treturn `\"` + printer.EscapeString(node.Text(), printer.QuoteCharDoubleQuote) + `\"`"},
  {"line":785,"text":"\tcase ast.KindTemplateHead, ast.KindTemplateMiddle, ast.KindTemplateTail:"},
  {"line":786,"text":"\t\trawText := node.RawText()"},
  {"line":787,"text":"\t\tif rawText == \"\" {"},
  {"line":788,"text":"\t\t\trawText = printer.EscapeString(node.Text(), printer.QuoteCharBacktick)"},
  {"line":789,"text":"\t\t}"},
  {"line":790,"text":"\t\tswitch node.Kind {"},
  {"line":791,"text":"\t\tcase ast.KindTemplateHead:"},
  {"line":792,"text":"\t\t\treturn \"`\" + rawText + \"${\""},
  {"line":793,"text":"\t\tcase ast.KindTemplateMiddle:"},
  {"line":794,"text":"\t\t\treturn \"}\" + rawText + \"${\""},
  {"line":795,"text":"\t\tcase ast.KindTemplateTail:"},
  {"line":796,"text":"\t\t\treturn \"}\" + rawText + \"`\""},
  {"line":797,"text":"\t\t}"},
  {"line":798,"text":"\t}"},
  {"line":799,"text":"\treturn node.Text()"},
  {"line":800,"text":"}"},
  {"line":802,"text":"type parameterInfo struct {"},
  {"line":803,"text":"\tparameter       *ast.IdentifierNode"},
  {"line":804,"text":"\tname            string"},
  {"line":805,"text":"\tisRestParameter bool"},
  {"line":806,"text":"}"},
  {"line":808,"text":"func (s *inlayHintState) getParameterIdentifierInfoAtPosition(signature *checker.Signature, pos int) *parameterInfo {"},
  {"line":809,"text":"\tparameters := signature.Parameters()"},
  {"line":810,"text":"\tparamCount := len(parameters) - core.IfElse(signature.HasRestParameter(), 1, 0)"},
  {"line":811,"text":"\tif pos < paramCount {"},
  {"line":812,"text":"\t\tparam := parameters[pos]"},
  {"line":813,"text":"\t\tparamId := getParameterDeclarationIdentifier(param)"},
  {"line":814,"text":"\t\tif paramId == nil {"},
  {"line":815,"text":"\t\t\treturn nil"},
  {"line":816,"text":"\t\t}"},
  {"line":817,"text":"\t\treturn &parameterInfo{"},
  {"line":818,"text":"\t\t\tparameter:       paramId,"},
  {"line":819,"text":"\t\t\tname:            paramId.Text(),"},
  {"line":820,"text":"\t\t\tisRestParameter: false,"},
  {"line":821,"text":"\t\t}"},
  {"line":822,"text":"\t}"},
  {"line":824,"text":"\tvar restParameter *ast.Symbol"},
  {"line":825,"text":"\tvar restId *ast.IdentifierNode"},
  {"line":826,"text":"\tif paramCount < len(parameters) {"},
  {"line":827,"text":"\t\trestParameter = parameters[paramCount]"},
  {"line":828,"text":"\t\trestId = getParameterDeclarationIdentifier(restParameter)"},
  {"line":829,"text":"\t}"},
  {"line":830,"text":"\tif restId == nil {"},
  {"line":831,"text":"\t\treturn nil"},
  {"line":832,"text":"\t}"},
  {"line":834,"text":"\trestType := s.checker.GetTypeOfSymbol(restParameter)"},
  {"line":835,"text":"\tif restType.IsTupleType() {"},
  {"line":836,"text":"\t\tassociatedNames := make([]*ast.Node, 0, len(restType.Target().AsTupleType().ElementInfos()))"},
  {"line":837,"text":"\t\tfor _, elementInfo := range restType.Target().AsTupleType().ElementInfos() {"},
  {"line":838,"text":"\t\t\tlabeledElement := elementInfo.LabeledDeclaration()"},
  {"line":839,"text":"\t\t\tassociatedNames = append(associatedNames, labeledElement)"},
  {"line":840,"text":"\t\t}"},
  {"line":841,"text":"\t\tindex := pos - paramCount"},
  {"line":842,"text":"\t\tif index < len(associatedNames) {"},
  {"line":843,"text":"\t\t\tassociatedName := associatedNames[index]"},
  {"line":844,"text":"\t\t\tif associatedName != nil {"},
  {"line":845,"text":"\t\t\t\tdebug.Assert(ast.IsIdentifier(associatedName.Name()))"},
  {"line":846,"text":"\t\t\t\tvar isRestTupleElement bool"},
  {"line":847,"text":"\t\t\t\tif ast.IsNamedTupleMember(associatedName) {"},
  {"line":848,"text":"\t\t\t\t\tisRestTupleElement = associatedName.AsNamedTupleMember().DotDotDotToken != nil"},
  {"line":849,"text":"\t\t\t\t} else {"},
  {"line":850,"text":"\t\t\t\t\tisRestTupleElement = associatedName.AsParameterDeclaration().DotDotDotToken != nil"},
  {"line":851,"text":"\t\t\t\t}"},
  {"line":852,"text":"\t\t\t\treturn &parameterInfo{"},
  {"line":853,"text":"\t\t\t\t\tparameter:       associatedName.Name(),"},
  {"line":854,"text":"\t\t\t\t\tname:            associatedName.Name().Text(),"},
  {"line":855,"text":"\t\t\t\t\tisRestParameter: isRestTupleElement,"},
  {"line":856,"text":"\t\t\t\t}"},
  {"line":857,"text":"\t\t\t}"},
  {"line":858,"text":"\t\t}"},
  {"line":860,"text":"\t\treturn nil"},
  {"line":861,"text":"\t}"},
  {"line":863,"text":"\tif pos == paramCount {"},
  {"line":864,"text":"\t\treturn &parameterInfo{"},
  {"line":865,"text":"\t\t\tparameter:       restId,"},
  {"line":866,"text":"\t\t\tname:            restParameter.Name,"},
  {"line":867,"text":"\t\t\tisRestParameter: true,"},
  {"line":868,"text":"\t\t}"},
  {"line":869,"text":"\t}"},
  {"line":870,"text":"\treturn nil"},
  {"line":871,"text":"}"},
  {"line":873,"text":"func getParameterDeclarationIdentifier(symbol *ast.Symbol) *ast.IdentifierNode {"},
  {"line":874,"text":"\tif symbol.ValueDeclaration != nil && ast.IsParameterDeclaration(symbol.ValueDeclaration) && ast.IsIdentifier(symbol.ValueDeclaration.Name()) {"},
  {"line":875,"text":"\t\treturn symbol.ValueDeclaration.Name()"},
  {"line":876,"text":"\t}"},
  {"line":877,"text":"\treturn nil"},
  {"line":878,"text":"}"},
  {"line":880,"text":"func identifierOrAccessExpressionPostfixMatchesParameterName(expr *ast.Expression, parameterName string) bool {"},
  {"line":881,"text":"\tif ast.IsIdentifier(expr) {"},
  {"line":882,"text":"\t\treturn expr.Text() == parameterName"},
  {"line":883,"text":"\t}"},
  {"line":884,"text":"\tif ast.IsPropertyAccessExpression(expr) {"},
  {"line":885,"text":"\t\treturn expr.Name().Text() == parameterName"},
  {"line":886,"text":"\t}"},
  {"line":887,"text":"\treturn false"},
  {"line":888,"text":"}"},
  {"line":890,"text":"func (s *inlayHintState) leadingCommentsContainsParameterName(node *ast.Node, name string) bool {"},
  {"line":891,"text":"\tif !scanner.IsIdentifierText(name, s.file.LanguageVariant) {"},
  {"line":892,"text":"\t\treturn false"},
  {"line":893,"text":"\t}"},
  {"line":895,"text":"\tranges := getLeadingCommentRangesOfNode(node, s.file)"},
  {"line":896,"text":"\tfileText := s.file.Text()"},
  {"line":897,"text":"\tfor r := range ranges {"},
  {"line":898,"text":"\t\tcommentText := strings.TrimFunc(fileText[r.Pos():r.End()], func(r rune) bool {"},
  {"line":899,"text":"\t\t\treturn unicode.IsSpace(r) || r == '/' || r == '*'"},
  {"line":900,"text":"\t\t})"},
  {"line":901,"text":"\t\tif commentText == name {"},
  {"line":902,"text":"\t\t\treturn true"},
  {"line":903,"text":"\t\t}"},
  {"line":904,"text":"\t}"},
  {"line":906,"text":"\treturn false"},
  {"line":907,"text":"}"},
  {"line":909,"text":"func (s *inlayHintState) getTypeAnnotationPosition(decl *ast.FunctionLikeDeclaration) int {"},
  {"line":910,"text":"\tcloseParenToken := astnav.FindChildOfKind(decl, ast.KindCloseParenToken, s.file)"},
  {"line":911,"text":"\tif closeParenToken != nil {"},
  {"line":912,"text":"\t\treturn closeParenToken.End()"},
  {"line":913,"text":"\t}"},
  {"line":914,"text":"\treturn decl.ParameterList().End()"},
  {"line":915,"text":"}"},
  {"line":917,"text":"func isAnyInlayHintEnabled(preferences lsutil.InlayHintsPreferences) bool {"},
  {"line":918,"text":"\treturn preferences.IncludeInlayParameterNameHints != lsutil.IncludeInlayParameterNameHintsNone ||"},
  {"line":919,"text":"\t\tpreferences.IncludeInlayFunctionParameterTypeHints.IsTrue() ||"},
  {"line":920,"text":"\t\tpreferences.IncludeInlayVariableTypeHints.IsTrue() ||"},
  {"line":921,"text":"\t\tpreferences.IncludeInlayPropertyDeclarationTypeHints.IsTrue() ||"},
  {"line":922,"text":"\t\tpreferences.IncludeInlayFunctionLikeReturnTypeHints.IsTrue() ||"},
  {"line":923,"text":"\t\tpreferences.IncludeInlayEnumMemberValueHints.IsTrue()"},
  {"line":924,"text":"}"},
];

export function findLsInlayHintsDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsInlayHintsDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsInlayHintsDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsInlayHintsDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsInlayHintsLineText(line: number): string | undefined {
  return lsInlayHintsSourceLines.find((entry) => entry.line === line)?.text;
}
