import {
  Kind,
  isBlock,
  isCallExpression,
  isCallOrNewExpression,
  isDeclarationName,
  isIdentifier,
  isNewExpression,
  isSourceFile,
  isTypeNode,
  type Identifier,
  type Node,
  type NodeArray,
  type SourceFile,
  type Symbol,
} from "../ast/index.js";
import { findPrecedingTokenEx } from "../astnav/index.js";
import type { Signature, Type } from "../checker/types.js";
import { TextRange } from "../core/index.js";
import type { ClassifiedTextRun, ParameterInformation, SignatureHelpContext } from "../lsp/lsproto/index.js";
import { skipTrivia } from "../scanner/trivia.js";
import {
  isInsideTemplateLiteral,
  isNoSubstitutionTemplateLiteral,
  isTaggedTemplateExpression,
  isTemplateHead,
  isTemplateTail,
} from "./utilities.js";

export interface CallInvocation {
  readonly node: Node;
}

export interface TypeArgsInvocation {
  readonly called: Identifier;
}

export interface ContextualInvocation {
  readonly signature: Signature;
  readonly node: Node;
  readonly symbol: Symbol;
}

export interface Invocation {
  readonly callInvocation?: CallInvocation;
  readonly typeArgsInvocation?: TypeArgsInvocation;
  readonly contextualInvocation?: ContextualInvocation;
}

export interface SignatureHelpInformation {
  readonly label: string;
  readonly documentation?: string;
  readonly parameters: readonly SignatureHelpParameter[];
  readonly isVariadic: boolean;
  readonly colorizedRuns: readonly ClassifiedTextRun[];
}

export interface SignatureHelpItemInfo {
  readonly isVariadic: boolean;
  readonly parameters: readonly SignatureHelpParameter[];
  readonly writer: unknown;
}

export interface SignatureHelpParameter {
  readonly parameterInfo: ParameterInformation;
  readonly isRest: boolean;
  readonly isOptional: boolean;
}

export interface CandidateInfo {
  readonly candidates: readonly Signature[];
  readonly resolvedSignature?: Signature;
}

export interface CandidateOrTypeInfo {
  readonly candidateInfo?: CandidateInfo;
  readonly typeInfo?: Symbol;
}

export interface ArgumentListInfo {
  readonly isTypeParameterList: boolean;
  readonly invocation: Invocation;
  readonly argumentsSpan: TextRange;
  readonly argumentIndex: number;
  readonly argumentCount: number;
}

export interface ContextualSignatureLocationInfo {
  readonly contextualType: Type;
  readonly signature?: Signature;
  readonly symbol?: Symbol;
  readonly argumentIndex: number;
  readonly argumentCount: number;
  readonly argumentsSpan: TextRange;
}

export interface ArgumentOrParameterListInfo {
  readonly list: readonly Node[];
  readonly argumentIndex: number;
  readonly argumentCount: number;
  readonly argumentsSpan: TextRange;
}

export interface ArgumentOrParameterListAndIndex {
  readonly list: readonly Node[];
  readonly argumentIndex: number;
}

export interface SignatureHelpProgram {
  getTypeCheckerForFile?(context: unknown, sourceFile: SourceFile): readonly [SignatureHelpChecker, () => void] | { readonly checker: SignatureHelpChecker; readonly release: () => void };
}

export interface PossibleTypeArgumentInfo {
  readonly called: Identifier;
  readonly nTypeArguments: number;
}

export interface SignatureHelpChecker {
  getTypeAtLocation?(node: Node): Type | undefined;
  getSignaturesOfType?(type: Type, kind: number): readonly Signature[];
  getSymbolAtLocation?(node: Node): Symbol | undefined;
  getResolvedSignatureForSignatureHelp?(node: Node, argumentCount: number): readonly [Signature | undefined, readonly Signature[]];
  getContextualSignatureLocationInfo?(node: Node, sourceFile: SourceFile, argumentsSpan: TextRange, argumentIndex: number, argumentCount: number): ContextualSignatureLocationInfo | undefined;
}

export interface SignatureHelpService {
  getProgramAndFile(documentURI: string): readonly [SignatureHelpProgram, SourceFile];
  converters: {
    lineAndCharacterToPosition(file: SourceFile, position: { readonly line: number; readonly character: number }): number;
  };
}

export function provideSignatureHelp(
  service: SignatureHelpService,
  documentURI: string,
  position: { readonly line: number; readonly character: number },
  context: SignatureHelpContext | undefined,
): unknown {
  const [program, sourceFile] = service.getProgramAndFile(documentURI);
  return getSignatureHelpItems(
    service.converters.lineAndCharacterToPosition(sourceFile, position),
    program,
    sourceFile,
    context,
  );
}

export function getSignatureHelpItems(
  position: number,
  program: SignatureHelpProgram,
  sourceFile: SourceFile,
  context: SignatureHelpContext | undefined,
): CandidateOrTypeInfo | undefined {
  const lease = program.getTypeCheckerForFile?.(undefined, sourceFile);
  if (lease === undefined) return undefined;
  const normalized = normalizeSignatureHelpCheckerLease(lease);
  const checker = normalized.checker;
  const release = normalized.release;
  try {
    const startingToken = findPrecedingTokenEx(sourceFile, position, undefined, true);
    if (startingToken === undefined) return undefined;
    const manuallyInvoked = context?.triggerKind === undefined || context.triggerKind === 1;
    const argumentInfo = getContainingArgumentInfo(startingToken, sourceFile, checker, manuallyInvoked, position);
    return argumentInfo === undefined ? undefined : getCandidateOrTypeInfo(argumentInfo, checker, sourceFile, startingToken, !manuallyInvoked);
  } finally {
    release();
  }
}

export function ensureMinimumSpanSize(start: number, end: number): number {
  if (end <= start) return start + 1;
  return end;
}

export function getArgumentIndexOrCount(argumentsList: readonly Node[], node: Node | undefined, spreadElementCounter: (node: Node) => number): number {
  let argumentIndex = 0;
  let skipComma = false;
  for (const argument of argumentsList) {
    if (node !== undefined && argument === node) {
      if (!skipComma && argument.kind === Kind.CommaToken) argumentIndex += 1;
      return argumentIndex;
    }
    if (argument.kind === Kind.SpreadElement) {
      argumentIndex += spreadElementCounter(argument);
      skipComma = true;
      continue;
    }
    if (argument.kind !== Kind.CommaToken) {
      argumentIndex += 1;
      skipComma = true;
      continue;
    }
    if (skipComma) {
      skipComma = false;
      continue;
    }
    argumentIndex += 1;
  }
  if (node !== undefined) return argumentIndex;
  return argumentsList.length > 0 && argumentsList[argumentsList.length - 1]!.kind === Kind.CommaToken
    ? argumentIndex + 1
    : argumentIndex;
}

export function getEnclosingDeclarationFromInvocation(invocation: Invocation): Node {
  if (invocation.callInvocation !== undefined) return invocation.callInvocation.node;
  if (invocation.typeArgsInvocation !== undefined) return invocation.typeArgsInvocation.called;
  if (invocation.contextualInvocation !== undefined) return invocation.contextualInvocation.node;
  throw new Error("invocation has no source");
}

export function getExpressionFromInvocation(argumentInfo: ArgumentListInfo): Node {
  const callNode = argumentInfo.invocation.callInvocation?.node;
  if (callNode !== undefined) return getInvokedExpression(callNode);
  const called = argumentInfo.invocation.typeArgsInvocation?.called;
  if (called !== undefined) return called;
  throw new Error("invocation has no expression");
}

export function getCandidateOrTypeInfo(
  info: ArgumentListInfo,
  checker: SignatureHelpChecker,
  sourceFile: SourceFile,
  startingToken: Node,
  onlyUseSyntacticOwners: boolean,
): CandidateOrTypeInfo | undefined {
  const callInvocation = info.invocation.callInvocation;
  if (callInvocation !== undefined) {
    if (onlyUseSyntacticOwners && !isSyntacticOwner(startingToken, callInvocation.node, sourceFile)) return undefined;
    const [resolvedSignature, candidates] = checker.getResolvedSignatureForSignatureHelp?.(callInvocation.node, info.argumentCount) ?? [undefined, []];
    if (candidates.length === 0) return undefined;
    return {
      candidateInfo: {
        candidates,
        ...(resolvedSignature === undefined ? {} : { resolvedSignature }),
      },
    };
  }

  const typeArgsInvocation = info.invocation.typeArgsInvocation;
  if (typeArgsInvocation !== undefined) {
    const called = typeArgsInvocation.called;
    const container = called.parent?.kind === Kind.Identifier ? called.parent : called;
    if (onlyUseSyntacticOwners && !containsPrecedingToken(startingToken, sourceFile, container)) return undefined;
    const symbol = checker.getSymbolAtLocation?.(called);
    return symbol === undefined ? undefined : { typeInfo: symbol };
  }

  const contextualInvocation = info.invocation.contextualInvocation;
  if (contextualInvocation !== undefined) {
    return {
      candidateInfo: {
        candidates: [contextualInvocation.signature],
        resolvedSignature: contextualInvocation.signature,
      },
    };
  }
  throw new Error("unknown invocation kind");
}

export function isSyntacticOwner(startingToken: Node, node: Node, sourceFile: SourceFile): boolean {
  if (!isCallOrNewExpression(node)) return false;
  const invocationChildren = getChildrenFromNonJSDocNode(node);
  switch (startingToken.kind) {
    case Kind.OpenParenToken:
    case Kind.CommaToken:
      return invocationChildren.includes(startingToken);
    case Kind.LessThanToken:
      return containsPrecedingToken(startingToken, sourceFile, nodeProperty<Node>(node, "expression") ?? node);
    default:
      return false;
  }
}

export function containsPrecedingToken(startingToken: Node, sourceFile: SourceFile, container: Node): boolean {
  let currentParent = startingToken.parent;
  while (currentParent !== undefined) {
    const precedingToken = findPrecedingTokenEx(sourceFile, startingToken.pos, currentParent, true);
    if (precedingToken !== undefined) return rangeContainsNode(container, precedingToken);
    currentParent = currentParent.parent;
  }
  return false;
}

export function getContainingArgumentInfo(
  node: Node,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
  isManuallyInvoked: boolean,
  position: number,
): ArgumentListInfo | undefined {
  let firstArgumentInfo: ArgumentListInfo | undefined;
  for (let current: Node | undefined = node; current !== undefined && !isSourceFile(current) && (isManuallyInvoked || !isBlock(current)); current = current.parent) {
    const argumentInfo = getImmediatelyContainingArgumentOrContextualParameterInfo(current, position, sourceFile, checker);
    if (argumentInfo !== undefined) {
      if (argumentInfo.invocation.contextualInvocation !== undefined) return argumentInfo;
      firstArgumentInfo ??= argumentInfo;
      if (argumentInfo.argumentsSpan.end === position || argumentInfo.argumentsSpan.contains(position)) return argumentInfo;
    }
  }
  return firstArgumentInfo;
}

export function getImmediatelyContainingArgumentOrContextualParameterInfo(
  node: Node,
  position: number,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
): ArgumentListInfo | undefined {
  return tryGetParameterInfo(node, sourceFile, checker) ?? getImmediatelyContainingArgumentInfo(node, position, sourceFile, checker);
}

export function getImmediatelyContainingArgumentInfo(
  node: Node,
  position: number,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
): ArgumentListInfo | undefined {
  const parent = node.parent;
  if (parent !== undefined && isCallOrNewExpression(parent)) {
    const info = getArgumentOrParameterListInfo(node, sourceFile, checker);
    if (info === undefined) return undefined;
    const typeArguments = nodeArray(parent, "typeArguments");
    return {
      isTypeParameterList: typeArguments.length > 0 && sameNodeArray(typeArguments, info.list),
      invocation: { callInvocation: { node: parent } },
      argumentsSpan: info.argumentsSpan,
      argumentIndex: info.argumentIndex,
      argumentCount: info.argumentCount,
    };
  }

  if (parent !== undefined && isNoSubstitutionTemplateLiteral(node) && isTaggedTemplateExpression(parent)) {
    return isInsideTemplateLiteral(node, position, sourceFile)
      ? getArgumentListInfoForTemplate(parent, 0, sourceFile)
      : undefined;
  }

  if (parent?.parent !== undefined && isTemplateHead(node) && isTaggedTemplateExpression(parent.parent)) {
    return getArgumentListInfoForTemplate(parent.parent, isInsideTemplateLiteral(node, position, sourceFile) ? 0 : 1, sourceFile);
  }

  const possible = getPossibleTypeArgumentsInfo(node, sourceFile);
  if (possible !== undefined) {
    return {
      isTypeParameterList: true,
      invocation: { typeArgsInvocation: { called: possible.called } },
      argumentsSpan: new TextRange(possible.called.pos, node.end),
      argumentIndex: possible.nTypeArguments,
      argumentCount: possible.nTypeArguments + 1,
    };
  }
  return undefined;
}

export function getArgumentIndexForTemplatePiece(spanIndex: number, node: Node, position: number, sourceFile: SourceFile): number {
  if (position < node.pos) throw new Error("position cannot occur before node");
  if (isTemplateLiteralToken(node)) {
    return isInsideTemplateLiteral(node, position, sourceFile) ? 0 : spanIndex + 2;
  }
  return spanIndex + 1;
}

export function getAdjustedNode(node: Node): Node | undefined {
  switch (node.kind) {
    case Kind.OpenParenToken:
    case Kind.CommaToken:
      return node;
    default:
      return findAncestor(node.parent, candidate => candidate.kind === Kind.Parameter);
  }
}

export function getArgumentIndex(node: Node, argumentsList: readonly Node[], sourceFile: SourceFile, checker: SignatureHelpChecker): number {
  return getArgumentIndexOrCount(getTokenFromNodeList(argumentsList, node.parent, sourceFile), node, spreadElement => getSpreadElementCount(spreadElement, checker));
}

export function getArgumentCount(node: Node, argumentsList: readonly Node[], sourceFile: SourceFile, checker: SignatureHelpChecker): number {
  return getArgumentIndexOrCount(getTokenFromNodeList(argumentsList, node.parent, sourceFile), undefined, spreadElement => getSpreadElementCount(spreadElement, checker));
}

export function getArgumentOrParameterListInfo(
  node: Node,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
): ArgumentOrParameterListInfo | undefined {
  const info = getArgumentOrParameterListAndIndex(node, sourceFile, checker);
  if (info === undefined) return undefined;
  return {
    list: info.list,
    argumentIndex: info.argumentIndex,
    argumentCount: getArgumentCount(node, info.list, sourceFile, checker),
    argumentsSpan: getApplicableSpanForArguments(info.list, node, sourceFile),
  };
}

export function getApplicableSpanForArguments(argumentList: readonly Node[] | undefined, node: Node | undefined, sourceFile: SourceFile): TextRange {
  if (argumentList === undefined && node !== undefined) {
    const spanStart = node.end;
    const spanEnd = ensureMinimumSpanSize(spanStart, skipTrivia(sourceFile.text, node.end));
    return new TextRange(spanStart, spanEnd);
  }
  const spanStart = listPosition(argumentList);
  const spanEnd = ensureMinimumSpanSize(spanStart, skipTrivia(sourceFile.text, listEnd(argumentList)));
  return new TextRange(spanStart, spanEnd);
}

export function getArgumentOrParameterListAndIndex(
  node: Node,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
): ArgumentOrParameterListAndIndex | undefined {
  if (node.kind === Kind.LessThanToken || node.kind === Kind.OpenParenToken) {
    return { list: getChildListThatStartsWithOpenerToken(node.parent, node) ?? [], argumentIndex: 0 };
  }
  const list = findContainingList(node);
  if (list === undefined) return undefined;
  return { list, argumentIndex: getArgumentIndex(node, list, sourceFile, checker) };
}

export function getChildListThatStartsWithOpenerToken(parent: Node | undefined, openerToken: Node): readonly Node[] | undefined {
  if (parent === undefined) return undefined;
  if (isCallExpression(parent)) return openerToken.kind === Kind.LessThanToken ? parent.typeArguments : parent.arguments;
  if (isNewExpression(parent)) return openerToken.kind === Kind.LessThanToken ? parent.typeArguments : parent.arguments;
  return undefined;
}

export function tryGetParameterInfo(
  startingToken: Node,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
): ArgumentListInfo | undefined {
  const node = getAdjustedNode(startingToken);
  if (node === undefined) return undefined;
  const info = getContextualSignatureLocationInfo(node, sourceFile, checker);
  if (info === undefined || info.signature === undefined || info.symbol === undefined) return undefined;
  return {
    isTypeParameterList: false,
    invocation: {
      contextualInvocation: {
        signature: info.signature,
        node: startingToken,
        symbol: info.symbol,
      },
    },
    argumentsSpan: info.argumentsSpan,
    argumentIndex: info.argumentIndex,
    argumentCount: info.argumentCount,
  };
}

export function getContextualSignatureLocationInfo(
  node: Node,
  sourceFile: SourceFile,
  checker: SignatureHelpChecker,
): ContextualSignatureLocationInfo | undefined {
  const parent = node.parent;
  if (parent === undefined) return undefined;
  switch (parent.kind) {
    case Kind.ParenthesizedExpression:
    case Kind.MethodDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction: {
      const info = getArgumentOrParameterListInfo(node, sourceFile, checker);
      if (info === undefined) return undefined;
      return checker.getContextualSignatureLocationInfo?.(node, sourceFile, info.argumentsSpan, info.argumentIndex, info.argumentCount);
    }
    default:
      return undefined;
  }
}

export function getTokenFromNodeList(nodeList: readonly Node[] | undefined, nodeListParent: Node | undefined, _sourceFile: SourceFile): readonly Node[] {
  void nodeListParent;
  return nodeList ?? [];
}

export function getArgumentListInfoForTemplate(tagExpression: Node, argumentIndex: number, sourceFile: SourceFile): ArgumentListInfo {
  const template = nodeProperty<Node>(tagExpression, "template") ?? tagExpression;
  const templateSpans = nodeArray(template, "templateSpans");
  const argumentCount = isNoSubstitutionTemplateLiteral(template) ? 1 : templateSpans.length + 1;
  if (argumentIndex !== 0 && argumentIndex >= argumentCount) throw new Error("template argument index out of range");
  return {
    isTypeParameterList: false,
    invocation: { callInvocation: { node: tagExpression } },
    argumentIndex,
    argumentCount,
    argumentsSpan: getApplicableRangeForTaggedTemplate(tagExpression, sourceFile),
  };
}

export function getApplicableRangeForTaggedTemplate(taggedTemplate: Node, sourceFile: SourceFile): TextRange {
  const template = nodeProperty<Node>(taggedTemplate, "template") ?? taggedTemplate;
  let applicableSpanEnd = template.end;
  if (template.kind === Kind.TemplateExpression) {
    const templateSpans = nodeArray(template, "templateSpans");
    const lastSpan = templateSpans[templateSpans.length - 1];
    const literal = lastSpan === undefined ? undefined : nodeProperty<Node>(lastSpan, "literal");
    if (literal !== undefined && literal.end - literal.pos === 0) {
      applicableSpanEnd = skipTrivia(sourceFile.text, applicableSpanEnd);
    }
  }
  return new TextRange(template.pos, applicableSpanEnd);
}

function getSpreadElementCount(node: Node, checker: SignatureHelpChecker): number {
  void checker;
  return node.kind === Kind.SpreadElement ? 1 : 0;
}

function findContainingList(node: Node): readonly Node[] | undefined {
  const parent = node.parent;
  if (parent === undefined) return undefined;
  for (const value of Object.values(parent as unknown as Record<string, unknown>)) {
    if (Array.isArray(value) && value.includes(node)) return value.filter(isNode);
  }
  return undefined;
}

function findAncestor(node: Node | undefined, predicate: (node: Node) => boolean): Node | undefined {
  let current = node;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = current.parent;
  }
  return undefined;
}

function getInvokedExpression(node: Node): Node {
  return nodeProperty<Node>(node, "expression") ?? node;
}

function getPossibleTypeArgumentsInfo(tokenIn: Node, sourceFile: SourceFile): PossibleTypeArgumentInfo | undefined {
  if (!sourceFile.text.includes("<")) return undefined;

  let token: Node | undefined = tokenIn;
  let remainingLessThanTokens = 0;
  let nTypeArguments = 0;
  while (token !== undefined) {
    switch (token.kind) {
      case Kind.LessThanToken: {
        token = findPrecedingTokenEx(sourceFile, token.pos, undefined, true);
        if (token?.kind === Kind.QuestionDotToken) token = findPrecedingTokenEx(sourceFile, token.pos, undefined, true);
        if (token === undefined || !isIdentifier(token)) return undefined;
        if (remainingLessThanTokens === 0) {
          if (isDeclarationName(token)) return undefined;
          return { called: token, nTypeArguments };
        }
        remainingLessThanTokens -= 1;
        break;
      }
      case Kind.GreaterThanGreaterThanGreaterThanToken:
        remainingLessThanTokens += 3;
        break;
      case Kind.GreaterThanGreaterThanToken:
        remainingLessThanTokens += 2;
        break;
      case Kind.GreaterThanToken:
        remainingLessThanTokens += 1;
        break;
      case Kind.CloseBraceToken:
        token = findPrecedingMatchingToken(token, Kind.OpenBraceToken, sourceFile);
        if (token === undefined) return undefined;
        break;
      case Kind.CloseParenToken:
        token = findPrecedingMatchingToken(token, Kind.OpenParenToken, sourceFile);
        if (token === undefined) return undefined;
        break;
      case Kind.CloseBracketToken:
        token = findPrecedingMatchingToken(token, Kind.OpenBracketToken, sourceFile);
        if (token === undefined) return undefined;
        break;
      case Kind.CommaToken:
        nTypeArguments += 1;
        break;
      case Kind.EqualsGreaterThanToken:
      case Kind.Identifier:
      case Kind.StringLiteral:
      case Kind.NumericLiteral:
      case Kind.BigIntLiteral:
      case Kind.TrueKeyword:
      case Kind.FalseKeyword:
      case Kind.TypeOfKeyword:
      case Kind.ExtendsKeyword:
      case Kind.KeyOfKeyword:
      case Kind.DotToken:
      case Kind.BarToken:
      case Kind.QuestionToken:
      case Kind.ColonToken:
        break;
      default:
        if (!isTypeNode(token)) return undefined;
    }
    token = findPrecedingTokenEx(sourceFile, token.pos, undefined, true);
  }
  return undefined;
}

function findPrecedingMatchingToken(token: Node, matchingTokenKind: Kind, sourceFile: SourceFile): Node | undefined {
  const closeKind = token.kind;
  let depth = 0;
  let current = findPrecedingTokenEx(sourceFile, token.pos, undefined, true);
  while (current !== undefined) {
    if (current.kind === closeKind) {
      depth += 1;
    } else if (current.kind === matchingTokenKind) {
      if (depth === 0) return current;
      depth -= 1;
    }
    current = findPrecedingTokenEx(sourceFile, current.pos, undefined, true);
  }
  return undefined;
}

function getChildrenFromNonJSDocNode(node: Node): readonly Node[] {
  const children: Node[] = [];
  node.forEachChild(child => {
    children.push(child);
    return undefined;
  });
  return children;
}

function rangeContainsNode(container: Node, candidate: Node): boolean {
  return container.pos <= candidate.pos && container.end >= candidate.end;
}

function listPosition(list: readonly Node[] | undefined): number {
  return nodeArrayBounds(list).pos;
}

function listEnd(list: readonly Node[] | undefined): number {
  return nodeArrayBounds(list).end;
}

function nodeArrayBounds(list: readonly Node[] | undefined): { readonly pos: number; readonly end: number } {
  const array = list as NodeArray | undefined;
  if (array !== undefined && typeof array.pos === "number" && typeof array.end === "number") return array;
  if (list === undefined || list.length === 0) return { pos: 0, end: 0 };
  return { pos: list[0]!.pos, end: list[list.length - 1]!.end };
}

function sameNodeArray(left: readonly Node[] | undefined, right: readonly Node[]): boolean {
  return left !== undefined && left.length === right.length && left.every((node, index) => node === right[index]);
}

function nodeProperty<T>(node: Node, key: string): T | undefined {
  return (node as unknown as Record<string, T | undefined>)[key];
}

function nodeArray(node: Node, key: string): readonly Node[] {
  return nodeProperty<readonly Node[]>(node, key) ?? [];
}

function isTemplateLiteralToken(node: Node): boolean {
  return node.kind === Kind.NoSubstitutionTemplateLiteral
    || node.kind === Kind.TemplateHead
    || node.kind === Kind.TemplateMiddle
    || node.kind === Kind.TemplateTail;
}

function isNode(value: unknown): value is Node {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function normalizeSignatureHelpCheckerLease(
  lease: readonly [SignatureHelpChecker, () => void] | { readonly checker: SignatureHelpChecker; readonly release: () => void },
): { readonly checker: SignatureHelpChecker; readonly release: () => void } {
  if (Array.isArray(lease)) return { checker: lease[0], release: lease[1] };
  return lease as { readonly checker: SignatureHelpChecker; readonly release: () => void };
}

// Language-service parity map: internal/ls/signaturehelp.go
/**
 * Language-service parity map for TS-Go `ls/signaturehelp.go`.
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

export const lsSignatureHelpUpstreamPath = "ls/signaturehelp.go";

export const lsSignatureHelpDeclarations: readonly UpstreamDeclaration[] = [
  {"line":20,"kind":"type","name":"callInvocation"},
  {"line":24,"kind":"type","name":"typeArgsInvocation"},
  {"line":28,"kind":"type","name":"contextualInvocation"},
  {"line":34,"kind":"type","name":"invocation"},
  {"line":40,"kind":"func","name":"ProvideSignatureHelp","receiver":"l *LanguageService"},
  {"line":56,"kind":"func","name":"GetSignatureHelpItems","receiver":"l *LanguageService"},
  {"line":150,"kind":"func","name":"createTypeHelpItems"},
  {"line":192,"kind":"func","name":"getTypeHelpItem"},
  {"line":225,"kind":"func","name":"createJSSignatureHelpItems","receiver":"l *LanguageService"},
  {"line":248,"kind":"func","name":"findSignatureHelpFromNamedDeclarations","receiver":"l *LanguageService"},
  {"line":276,"kind":"func","name":"createSignatureHelpItems","receiver":"l *LanguageService"},
  {"line":395,"kind":"func","name":"computeActiveParameter","receiver":"l *LanguageService"},
  {"line":425,"kind":"func","name":"getSignatureHelpItem","receiver":"l *LanguageService"},
  {"line":464,"kind":"func","name":"returnTypeToDisplayParts"},
  {"line":490,"kind":"func","name":"itemInfoForTypeParameters","receiver":"l *LanguageService"},
  {"line":567,"kind":"func","name":"itemInfoForParameters","receiver":"l *LanguageService"},
  {"line":647,"kind":"const","name":"signatureHelpNodeBuilderFlags"},
  {"line":650,"kind":"func","name":"createSignatureHelpParameterFromLabel","receiver":"l *LanguageService"},
  {"line":675,"kind":"func","name":"createSignatureHelpParameterForParameter","receiver":"l *LanguageService"},
  {"line":680,"kind":"func","name":"createSignatureHelpParameterForTypeParameter"},
  {"line":694,"kind":"type","name":"signatureInformation"},
  {"line":709,"kind":"type","name":"signatureHelpItemInfo"},
  {"line":715,"kind":"type","name":"signatureHelpParameter"},
  {"line":721,"kind":"func","name":"getEnclosingDeclarationFromInvocation"},
  {"line":731,"kind":"func","name":"getExpressionFromInvocation"},
  {"line":738,"kind":"type","name":"candidateInfo"},
  {"line":743,"kind":"type","name":"CandidateOrTypeInfo"},
  {"line":748,"kind":"func","name":"getCandidateOrTypeInfo"},
  {"line":809,"kind":"func","name":"isSyntacticOwner"},
  {"line":824,"kind":"func","name":"containsPrecedingToken"},
  {"line":842,"kind":"func","name":"getContainingArgumentInfo"},
  {"line":885,"kind":"func","name":"getImmediatelyContainingArgumentOrContextualParameterInfo"},
  {"line":893,"kind":"type","name":"argumentListInfo"},
  {"line":904,"kind":"func","name":"getImmediatelyContainingArgumentInfo"},
  {"line":1010,"kind":"func","name":"getArgumentIndexForTemplatePiece"},
  {"line":1032,"kind":"func","name":"getAdjustedNode"},
  {"line":1048,"kind":"type","name":"contextualSignatureLocationInfo"},
  {"line":1055,"kind":"func","name":"getSpreadElementCount"},
  {"line":1079,"kind":"func","name":"getArgumentIndex"},
  {"line":1083,"kind":"func","name":"getArgumentCount"},
  {"line":1087,"kind":"func","name":"getArgumentIndexOrCount"},
  {"line":1129,"kind":"type","name":"argumentOrParameterListInfo"},
  {"line":1136,"kind":"func","name":"getArgumentOrParameterListInfo"},
  {"line":1153,"kind":"func","name":"getApplicableSpanForArguments"},
  {"line":1185,"kind":"func","name":"ensureMinimumSpanSize"},
  {"line":1192,"kind":"type","name":"argumentOrParameterListAndIndex"},
  {"line":1197,"kind":"func","name":"getArgumentOrParameterListAndIndex"},
  {"line":1225,"kind":"func","name":"getChildListThatStartsWithOpenerToken"},
  {"line":1242,"kind":"func","name":"tryGetParameterInfo"},
  {"line":1283,"kind":"func","name":"chooseBetterSymbol"},
  {"line":1294,"kind":"func","name":"getContextualSignatureLocationInfo"},
  {"line":1342,"kind":"func","name":"getHighestBinary"},
  {"line":1349,"kind":"func","name":"countBinaryExpressionParameters"},
  {"line":1356,"kind":"func","name":"getTokenFromNodeList"},
  {"line":1380,"kind":"func","name":"getArgumentListInfoForTemplate"},
  {"line":1398,"kind":"func","name":"getApplicableRangeForTaggedTemplate"},
];

export const lsSignatureHelpSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"slices\""},
  {"line":6,"text":"\t\"strings\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/nodebuilder\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":18,"text":")"},
  {"line":20,"text":"type callInvocation struct {"},
  {"line":21,"text":"\tnode *ast.Node"},
  {"line":22,"text":"}"},
  {"line":24,"text":"type typeArgsInvocation struct {"},
  {"line":25,"text":"\tcalled *ast.Identifier"},
  {"line":26,"text":"}"},
  {"line":28,"text":"type contextualInvocation struct {"},
  {"line":29,"text":"\tsignature *checker.Signature"},
  {"line":30,"text":"\tnode      *ast.Node // Just for enclosingDeclaration for printing types"},
  {"line":31,"text":"\tsymbol    *ast.Symbol"},
  {"line":32,"text":"}"},
  {"line":34,"text":"type invocation struct {"},
  {"line":35,"text":"\tcallInvocation       *callInvocation"},
  {"line":36,"text":"\ttypeArgsInvocation   *typeArgsInvocation"},
  {"line":37,"text":"\tcontextualInvocation *contextualInvocation"},
  {"line":38,"text":"}"},
  {"line":40,"text":"func (l *LanguageService) ProvideSignatureHelp("},
  {"line":41,"text":"\tctx context.Context,"},
  {"line":42,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":43,"text":"\tposition lsproto.Position,"},
  {"line":44,"text":"\tcontext *lsproto.SignatureHelpContext,"},
  {"line":45,"text":") (lsproto.SignatureHelpResponse, error) {"},
  {"line":46,"text":"\tprogram, sourceFile := l.getProgramAndFile(documentURI)"},
  {"line":47,"text":"\titems := l.GetSignatureHelpItems("},
  {"line":48,"text":"\t\tctx,"},
  {"line":49,"text":"\t\tint(l.converters.LineAndCharacterToPosition(sourceFile, position)),"},
  {"line":50,"text":"\t\tprogram,"},
  {"line":51,"text":"\t\tsourceFile,"},
  {"line":52,"text":"\t\tcontext)"},
  {"line":53,"text":"\treturn lsproto.SignatureHelpOrNull{SignatureHelp: items}, nil"},
  {"line":54,"text":"}"},
  {"line":56,"text":"func (l *LanguageService) GetSignatureHelpItems("},
  {"line":57,"text":"\tctx context.Context,"},
  {"line":58,"text":"\tposition int,"},
  {"line":59,"text":"\tprogram *compiler.Program,"},
  {"line":60,"text":"\tsourceFile *ast.SourceFile,"},
  {"line":61,"text":"\tcontext *lsproto.SignatureHelpContext,"},
  {"line":62,"text":") *lsproto.SignatureHelp {"},
  {"line":63,"text":"\ttypeChecker, done := program.GetTypeCheckerForFile(ctx, sourceFile)"},
  {"line":64,"text":"\tdefer done()"},
  {"line":67,"text":"\tstartingToken := astnav.FindPrecedingToken(sourceFile, position)"},
  {"line":68,"text":"\tif startingToken == nil {"},
  {"line":70,"text":"\t\treturn nil"},
  {"line":71,"text":"\t}"},
  {"line":73,"text":"\ttype signatureHelpTriggerReasonKind int32"},
  {"line":75,"text":"\tconst ("},
  {"line":76,"text":"\t\tsignatureHelpTriggerReasonKindNone           signatureHelpTriggerReasonKind = 0    // was undefined"},
  {"line":77,"text":"\t\tsignatureHelpTriggerReasonKindInvoked        signatureHelpTriggerReasonKind = iota // was \"invoked\""},
  {"line":78,"text":"\t\tsignatureHelpTriggerReasonKindCharacterTyped                                       // was \"characterTyped\""},
  {"line":79,"text":"\t\tsignatureHelpTriggerReasonKindRetriggered                                          // was \"retrigger\""},
  {"line":80,"text":"\t)"},
  {"line":83,"text":"\ttriggerReasonKind := signatureHelpTriggerReasonKindNone"},
  {"line":84,"text":"\tif context != nil {"},
  {"line":85,"text":"\t\tswitch context.TriggerKind {"},
  {"line":86,"text":"\t\tcase lsproto.SignatureHelpTriggerKindTriggerCharacter:"},
  {"line":87,"text":"\t\t\tif context.TriggerCharacter != nil {"},
  {"line":88,"text":"\t\t\t\tif context.IsRetrigger {"},
  {"line":89,"text":"\t\t\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindRetriggered"},
  {"line":90,"text":"\t\t\t\t} else {"},
  {"line":91,"text":"\t\t\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindCharacterTyped"},
  {"line":92,"text":"\t\t\t\t}"},
  {"line":93,"text":"\t\t\t} else {"},
  {"line":94,"text":"\t\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindInvoked"},
  {"line":95,"text":"\t\t\t}"},
  {"line":96,"text":"\t\tcase lsproto.SignatureHelpTriggerKindContentChange:"},
  {"line":97,"text":"\t\t\tif context.IsRetrigger {"},
  {"line":98,"text":"\t\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindRetriggered"},
  {"line":99,"text":"\t\t\t} else {"},
  {"line":100,"text":"\t\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindCharacterTyped"},
  {"line":101,"text":"\t\t\t}"},
  {"line":102,"text":"\t\tcase lsproto.SignatureHelpTriggerKindInvoked:"},
  {"line":103,"text":"\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindInvoked"},
  {"line":104,"text":"\t\tdefault:"},
  {"line":105,"text":"\t\t\ttriggerReasonKind = signatureHelpTriggerReasonKindInvoked"},
  {"line":106,"text":"\t\t}"},
  {"line":107,"text":"\t}"},
  {"line":110,"text":"\tonlyUseSyntacticOwners := triggerReasonKind == signatureHelpTriggerReasonKindCharacterTyped"},
  {"line":113,"text":"\tif onlyUseSyntacticOwners && (IsInString(sourceFile, position, startingToken) || isInComment(sourceFile, position, startingToken) != nil) {"},
  {"line":114,"text":"\t\treturn nil"},
  {"line":115,"text":"\t}"},
  {"line":117,"text":"\tisManuallyInvoked := triggerReasonKind == signatureHelpTriggerReasonKindInvoked"},
  {"line":118,"text":"\targumentInfo := getContainingArgumentInfo(startingToken, sourceFile, typeChecker, isManuallyInvoked, position)"},
  {"line":119,"text":"\tif argumentInfo == nil {"},
  {"line":120,"text":"\t\treturn nil"},
  {"line":121,"text":"\t}"},
  {"line":123,"text":"\tif ctx.Err() != nil {"},
  {"line":124,"text":"\t\treturn nil"},
  {"line":125,"text":"\t}"},
  {"line":128,"text":"\tcandidateInfo := getCandidateOrTypeInfo(argumentInfo, typeChecker, sourceFile, startingToken, onlyUseSyntacticOwners)"},
  {"line":130,"text":"\tif ctx.Err() != nil {"},
  {"line":131,"text":"\t\treturn nil"},
  {"line":132,"text":"\t}"},
  {"line":134,"text":"\tif candidateInfo == nil {"},
  {"line":137,"text":"\t\tif ast.IsSourceFileJS(sourceFile) {"},
  {"line":138,"text":"\t\t\treturn l.createJSSignatureHelpItems(ctx, argumentInfo, program, typeChecker)"},
  {"line":139,"text":"\t\t}"},
  {"line":140,"text":"\t\treturn nil"},
  {"line":141,"text":"\t}"},
  {"line":144,"text":"\tif candidateInfo.candidateInfo != nil {"},
  {"line":145,"text":"\t\treturn l.createSignatureHelpItems(ctx, candidateInfo.candidateInfo.candidates, candidateInfo.candidateInfo.resolvedSignature, argumentInfo, sourceFile, typeChecker, onlyUseSyntacticOwners)"},
  {"line":146,"text":"\t}"},
  {"line":147,"text":"\treturn createTypeHelpItems(ctx, candidateInfo.typeInfo, argumentInfo, sourceFile, typeChecker)"},
  {"line":148,"text":"}"},
  {"line":150,"text":"func createTypeHelpItems(ctx context.Context, symbol *ast.Symbol, argumentInfo *argumentListInfo, sourceFile *ast.SourceFile, c *checker.Checker) *lsproto.SignatureHelp {"},
  {"line":151,"text":"\ttypeParameters := c.GetLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol)"},
  {"line":152,"text":"\tif typeParameters == nil {"},
  {"line":153,"text":"\t\treturn nil"},
  {"line":154,"text":"\t}"},
  {"line":155,"text":"\titem := getTypeHelpItem(symbol, typeParameters, getEnclosingDeclarationFromInvocation(argumentInfo.invocation), sourceFile, c)"},
  {"line":158,"text":"\tcaps := lsproto.GetClientCapabilities(ctx)"},
  {"line":159,"text":"\tsigInfoCaps := caps.TextDocument.SignatureHelp.SignatureInformation"},
  {"line":160,"text":"\tsupportsPerSignatureActiveParam := sigInfoCaps.ActiveParameterSupport"},
  {"line":163,"text":"\tparameters := make([]*lsproto.ParameterInformation, len(item.Parameters))"},
  {"line":164,"text":"\tfor i, param := range item.Parameters {"},
  {"line":165,"text":"\t\tparameters[i] = param.parameterInfo"},
  {"line":166,"text":"\t}"},
  {"line":168,"text":"\tsigInfo := &lsproto.SignatureInformation{"},
  {"line":169,"text":"\t\tLabel:         item.Label,"},
  {"line":170,"text":"\t\tDocumentation: nil,"},
  {"line":171,"text":"\t\tParameters:    &parameters,"},
  {"line":172,"text":"\t}"},
  {"line":175,"text":"\tif supportsPerSignatureActiveParam && len(item.Parameters) > 0 {"},
  {"line":176,"text":"\t\tsigInfo.ActiveParameter = &lsproto.UintegerOrNull{Uinteger: new(uint32(argumentInfo.argumentIndex))}"},
  {"line":177,"text":"\t}"},
  {"line":179,"text":"\thelp := &lsproto.SignatureHelp{"},
  {"line":180,"text":"\t\tSignatures:      []*lsproto.SignatureInformation{sigInfo},"},
  {"line":181,"text":"\t\tActiveSignature: new(uint32(0)),"},
  {"line":182,"text":"\t}"},
  {"line":185,"text":"\tif !supportsPerSignatureActiveParam && len(item.Parameters) > 0 {"},
  {"line":186,"text":"\t\thelp.ActiveParameter = &lsproto.UintegerOrNull{Uinteger: new(uint32(argumentInfo.argumentIndex))}"},
  {"line":187,"text":"\t}"},
  {"line":189,"text":"\treturn help"},
  {"line":190,"text":"}"},
  {"line":192,"text":"func getTypeHelpItem(symbol *ast.Symbol, typeParameter []*checker.Type, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) signatureInformation {"},
  {"line":193,"text":"\tprinter := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, nil)"},
  {"line":195,"text":"\tparameters := make([]signatureHelpParameter, len(typeParameter))"},
  {"line":196,"text":"\tfor i, typeParam := range typeParameter {"},
  {"line":197,"text":"\t\tparameters[i] = createSignatureHelpParameterForTypeParameter(typeParam, sourceFile, enclosingDeclaration, c, printer)"},
  {"line":198,"text":"\t}"},
  {"line":201,"text":"\tvar displayParts strings.Builder"},
  {"line":202,"text":"\tdisplayParts.WriteString(c.SymbolToString(symbol))"},
  {"line":203,"text":"\tif len(parameters) != 0 {"},
  {"line":204,"text":"\t\tdisplayParts.WriteString(scanner.TokenToString(ast.KindLessThanToken))"},
  {"line":205,"text":"\t\tfor i, typeParameter := range parameters {"},
  {"line":206,"text":"\t\t\tif i > 0 {"},
  {"line":207,"text":"\t\t\t\tdisplayParts.WriteString(\", \")"},
  {"line":208,"text":"\t\t\t}"},
  {"line":209,"text":"\t\t\tdisplayParts.WriteString(*typeParameter.parameterInfo.Label.String)"},
  {"line":210,"text":"\t\t}"},
  {"line":211,"text":"\t\tdisplayParts.WriteString(scanner.TokenToString(ast.KindGreaterThanToken))"},
  {"line":212,"text":"\t}"},
  {"line":214,"text":"\treturn signatureInformation{"},
  {"line":215,"text":"\t\tLabel:         displayParts.String(),"},
  {"line":216,"text":"\t\tDocumentation: nil,"},
  {"line":217,"text":"\t\tParameters:    parameters,"},
  {"line":218,"text":"\t\tIsVariadic:    false,"},
  {"line":219,"text":"\t}"},
  {"line":220,"text":"}"},
  {"line":225,"text":"func (l *LanguageService) createJSSignatureHelpItems(ctx context.Context, argumentInfo *argumentListInfo, program *compiler.Program, c *checker.Checker) *lsproto.SignatureHelp {"},
  {"line":226,"text":"\tif argumentInfo.invocation.contextualInvocation != nil {"},
  {"line":227,"text":"\t\treturn nil"},
  {"line":228,"text":"\t}"},
  {"line":230,"text":"\texpression := getExpressionFromInvocation(argumentInfo)"},
  {"line":231,"text":"\tif !ast.IsPropertyAccessExpression(expression) {"},
  {"line":232,"text":"\t\treturn nil"},
  {"line":233,"text":"\t}"},
  {"line":234,"text":"\tname := expression.AsPropertyAccessExpression().Name().Text()"},
  {"line":235,"text":"\tif name == \"\" {"},
  {"line":236,"text":"\t\treturn nil"},
  {"line":237,"text":"\t}"},
  {"line":239,"text":"\tfor _, sf := range program.GetSourceFiles() {"},
  {"line":240,"text":"\t\tresult := l.findSignatureHelpFromNamedDeclarations(ctx, sf, name, argumentInfo, c)"},
  {"line":241,"text":"\t\tif result != nil {"},
  {"line":242,"text":"\t\t\treturn result"},
  {"line":243,"text":"\t\t}"},
  {"line":244,"text":"\t}"},
  {"line":245,"text":"\treturn nil"},
  {"line":246,"text":"}"},
  {"line":248,"text":"func (l *LanguageService) findSignatureHelpFromNamedDeclarations(ctx context.Context, sourceFile *ast.SourceFile, name string, argumentInfo *argumentListInfo, c *checker.Checker) *lsproto.SignatureHelp {"},
  {"line":249,"text":"\tvar result *lsproto.SignatureHelp"},
  {"line":250,"text":"\tvar visit func(node *ast.Node) bool"},
  {"line":251,"text":"\tvisit = func(node *ast.Node) bool {"},
  {"line":252,"text":"\t\tif result != nil {"},
  {"line":253,"text":"\t\t\treturn true"},
  {"line":254,"text":"\t\t}"},
  {"line":255,"text":"\t\tif ast.GetDeclarationName(node) == name {"},
  {"line":256,"text":"\t\t\tif symbol := node.Symbol(); symbol != nil {"},
  {"line":257,"text":"\t\t\t\tif t := c.GetTypeOfSymbolAtLocation(symbol, node); t != nil {"},
  {"line":258,"text":"\t\t\t\t\tif callSignatures := c.GetCallSignatures(t); len(callSignatures) > 0 {"},
  {"line":259,"text":"\t\t\t\t\t\tresult = l.createSignatureHelpItems(ctx, callSignatures, callSignatures[0], argumentInfo, sourceFile, c, true /*useFullPrefix*/)"},
  {"line":260,"text":"\t\t\t\t\t\tif result != nil {"},
  {"line":261,"text":"\t\t\t\t\t\t\treturn true"},
  {"line":262,"text":"\t\t\t\t\t\t}"},
  {"line":263,"text":"\t\t\t\t\t}"},
  {"line":264,"text":"\t\t\t\t}"},
  {"line":265,"text":"\t\t\t}"},
  {"line":266,"text":"\t\t}"},
  {"line":267,"text":"\t\tnode.ForEachChild(func(child *ast.Node) bool {"},
  {"line":268,"text":"\t\t\treturn visit(child)"},
  {"line":269,"text":"\t\t})"},
  {"line":270,"text":"\t\treturn result != nil"},
  {"line":271,"text":"\t}"},
  {"line":272,"text":"\tvisit(sourceFile.AsNode())"},
  {"line":273,"text":"\treturn result"},
  {"line":274,"text":"}"},
  {"line":276,"text":"func (l *LanguageService) createSignatureHelpItems(ctx context.Context, candidates []*checker.Signature, resolvedSignature *checker.Signature, argumentInfo *argumentListInfo, sourceFile *ast.SourceFile, c *checker.Checker, useFullPrefix bool) *lsproto.SignatureHelp {"},
  {"line":277,"text":"\tcaps := lsproto.GetClientCapabilities(ctx)"},
  {"line":278,"text":"\tdocFormat := lsproto.PreferredMarkupKind(caps.TextDocument.SignatureHelp.SignatureInformation.DocumentationFormat)"},
  {"line":279,"text":"\tvsCapability := caps.VSSupportsVisualStudioExtensions"},
  {"line":281,"text":"\tenclosingDeclaration := getEnclosingDeclarationFromInvocation(argumentInfo.invocation)"},
  {"line":282,"text":"\tif enclosingDeclaration == nil {"},
  {"line":283,"text":"\t\treturn nil"},
  {"line":284,"text":"\t}"},
  {"line":285,"text":"\tvar callTargetSymbol *ast.Symbol"},
  {"line":286,"text":"\tif argumentInfo.invocation.contextualInvocation != nil {"},
  {"line":287,"text":"\t\tcallTargetSymbol = argumentInfo.invocation.contextualInvocation.symbol"},
  {"line":288,"text":"\t} else {"},
  {"line":289,"text":"\t\tcallTargetSymbol = c.GetSymbolAtLocation(getExpressionFromInvocation(argumentInfo))"},
  {"line":290,"text":"\t\tif callTargetSymbol == nil && useFullPrefix && resolvedSignature.Declaration() != nil {"},
  {"line":291,"text":"\t\t\tcallTargetSymbol = resolvedSignature.Declaration().Symbol()"},
  {"line":292,"text":"\t\t}"},
  {"line":293,"text":"\t}"},
  {"line":295,"text":"\tvar callTargetDisplayParts strings.Builder"},
  {"line":296,"text":"\tif callTargetSymbol != nil {"},
  {"line":297,"text":"\t\tif useFullPrefix {"},
  {"line":298,"text":"\t\t\tcallTargetDisplayParts.WriteString(c.SymbolToStringEx(callTargetSymbol, sourceFile.AsNode(), ast.SymbolFlagsNone, checker.SymbolFormatFlagsUseAliasDefinedOutsideCurrentScope))"},
  {"line":299,"text":"\t\t} else {"},
  {"line":300,"text":"\t\t\tcallTargetDisplayParts.WriteString(c.SymbolToString(callTargetSymbol))"},
  {"line":301,"text":"\t\t}"},
  {"line":302,"text":"\t}"},
  {"line":303,"text":"\titems := make([][]signatureInformation, len(candidates))"},
  {"line":304,"text":"\tfor i, candidateSignature := range candidates {"},
  {"line":305,"text":"\t\titems[i] = l.getSignatureHelpItem(candidateSignature, argumentInfo.isTypeParameterList, callTargetDisplayParts.String(), callTargetSymbol, enclosingDeclaration, sourceFile, c, docFormat, vsCapability)"},
  {"line":306,"text":"\t}"},
  {"line":308,"text":"\tselectedItemIndex := 0"},
  {"line":309,"text":"\titemSeen := 0"},
  {"line":310,"text":"\tfor i := range items {"},
  {"line":311,"text":"\t\titem := items[i]"},
  {"line":312,"text":"\t\tif (candidates)[i] == resolvedSignature {"},
  {"line":313,"text":"\t\t\tselectedItemIndex = itemSeen"},
  {"line":314,"text":"\t\t\tif len(item) > 1 {"},
  {"line":315,"text":"\t\t\t\tcount := 0"},
  {"line":316,"text":"\t\t\t\tfor _, j := range item {"},
  {"line":317,"text":"\t\t\t\t\tif j.IsVariadic || len(j.Parameters) >= argumentInfo.argumentCount {"},
  {"line":318,"text":"\t\t\t\t\t\tselectedItemIndex = itemSeen + count"},
  {"line":319,"text":"\t\t\t\t\t\tbreak"},
  {"line":320,"text":"\t\t\t\t\t}"},
  {"line":321,"text":"\t\t\t\t\tcount++"},
  {"line":322,"text":"\t\t\t\t}"},
  {"line":323,"text":"\t\t\t}"},
  {"line":324,"text":"\t\t}"},
  {"line":325,"text":"\t\titemSeen = itemSeen + len(item)"},
  {"line":326,"text":"\t}"},
  {"line":328,"text":"\tdebug.Assert(selectedItemIndex != -1)"},
  {"line":329,"text":"\tflattenedSignatures := []signatureInformation{}"},
  {"line":330,"text":"\tfor _, item := range items {"},
  {"line":331,"text":"\t\tflattenedSignatures = append(flattenedSignatures, item...)"},
  {"line":332,"text":"\t}"},
  {"line":333,"text":"\tif len(flattenedSignatures) == 0 {"},
  {"line":334,"text":"\t\treturn nil"},
  {"line":335,"text":"\t}"},
  {"line":338,"text":"\tsigInfoCaps := caps.TextDocument.SignatureHelp.SignatureInformation"},
  {"line":339,"text":"\tsupportsPerSignatureActiveParam := sigInfoCaps.ActiveParameterSupport"},
  {"line":340,"text":"\tsupportsNullActiveParam := sigInfoCaps.NoActiveParameterSupport"},
  {"line":343,"text":"\tsignatureInformation := make([]*lsproto.SignatureInformation, len(flattenedSignatures))"},
  {"line":344,"text":"\tfor i, item := range flattenedSignatures {"},
  {"line":345,"text":"\t\tparameters := make([]*lsproto.ParameterInformation, len(item.Parameters))"},
  {"line":346,"text":"\t\tfor j, param := range item.Parameters {"},
  {"line":347,"text":"\t\t\tparameters[j] = param.parameterInfo"},
  {"line":348,"text":"\t\t}"},
  {"line":349,"text":"\t\tvar documentation *lsproto.StringOrMarkupContent"},
  {"line":350,"text":"\t\tif item.Documentation != nil {"},
  {"line":351,"text":"\t\t\tdocumentation = &lsproto.StringOrMarkupContent{"},
  {"line":352,"text":"\t\t\t\tMarkupContent: &lsproto.MarkupContent{"},
  {"line":353,"text":"\t\t\t\t\tKind:  docFormat,"},
  {"line":354,"text":"\t\t\t\t\tValue: *item.Documentation,"},
  {"line":355,"text":"\t\t\t\t},"},
  {"line":356,"text":"\t\t\t}"},
  {"line":357,"text":"\t\t}"},
  {"line":358,"text":"\t\tsigInfo := &lsproto.SignatureInformation{"},
  {"line":359,"text":"\t\t\tLabel:         item.Label,"},
  {"line":360,"text":"\t\t\tDocumentation: documentation,"},
  {"line":361,"text":"\t\t\tParameters:    &parameters,"},
  {"line":362,"text":"\t\t}"},
  {"line":365,"text":"\t\tif len(item.ColorizedRuns) > 0 {"},
  {"line":366,"text":"\t\t\tsigInfo.VSColorizedLabel = &lsproto.ClassifiedTextElement{"},
  {"line":367,"text":"\t\t\t\tRuns: item.ColorizedRuns,"},
  {"line":368,"text":"\t\t\t}"},
  {"line":369,"text":"\t\t}"},
  {"line":372,"text":"\t\tif supportsPerSignatureActiveParam {"},
  {"line":373,"text":"\t\t\tsigInfo.ActiveParameter = l.computeActiveParameter(item, argumentInfo.argumentIndex, supportsNullActiveParam)"},
  {"line":374,"text":"\t\t}"},
  {"line":376,"text":"\t\tsignatureInformation[i] = sigInfo"},
  {"line":377,"text":"\t}"},
  {"line":379,"text":"\thelp := &lsproto.SignatureHelp{"},
  {"line":380,"text":"\t\tSignatures:      signatureInformation,"},
  {"line":381,"text":"\t\tActiveSignature: new(uint32(selectedItemIndex)),"},
  {"line":382,"text":"\t}"},
  {"line":385,"text":"\tif !supportsPerSignatureActiveParam {"},
  {"line":386,"text":"\t\tactiveSignature := flattenedSignatures[selectedItemIndex]"},
  {"line":387,"text":"\t\thelp.ActiveParameter = l.computeActiveParameter(activeSignature, argumentInfo.argumentIndex, supportsNullActiveParam)"},
  {"line":388,"text":"\t}"},
  {"line":390,"text":"\treturn help"},
  {"line":391,"text":"}"},
  {"line":395,"text":"func (l *LanguageService) computeActiveParameter(sig signatureInformation, argumentIndex int, supportsNull bool) *lsproto.UintegerOrNull {"},
  {"line":396,"text":"\tparamCount := len(sig.Parameters)"},
  {"line":397,"text":"\tif paramCount == 0 {"},
  {"line":399,"text":"\t\treturn nil"},
  {"line":400,"text":"\t}"},
  {"line":402,"text":"\tactiveParam := uint32(argumentIndex)"},
  {"line":404,"text":"\tif sig.IsVariadic {"},
  {"line":405,"text":"\t\tfirstRest := core.FindIndex(sig.Parameters, func(p signatureHelpParameter) bool {"},
  {"line":406,"text":"\t\t\treturn p.isRest"},
  {"line":407,"text":"\t\t})"},
  {"line":408,"text":"\t\tif -1 < firstRest && firstRest < paramCount-1 {"},
  {"line":410,"text":"\t\t\tif supportsNull {"},
  {"line":411,"text":"\t\t\t\treturn &lsproto.UintegerOrNull{} // null means \"no parameter is active\""},
  {"line":412,"text":"\t\t\t}"},
  {"line":414,"text":"\t\t\treturn &lsproto.UintegerOrNull{Uinteger: new(uint32(paramCount))}"},
  {"line":415,"text":"\t\t}"},
  {"line":417,"text":"\t\tif activeParam > uint32(paramCount-1) {"},
  {"line":418,"text":"\t\t\tactiveParam = uint32(paramCount - 1)"},
  {"line":419,"text":"\t\t}"},
  {"line":420,"text":"\t}"},
  {"line":422,"text":"\treturn &lsproto.UintegerOrNull{Uinteger: new(activeParam)}"},
  {"line":423,"text":"}"},
  {"line":425,"text":"func (l *LanguageService) getSignatureHelpItem(candidate *checker.Signature, isTypeParameterList bool, callTargetSymbol string, callTargetSym *ast.Symbol, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker, docFormat lsproto.MarkupKind, vsCapability bool) []signatureInformation {"},
  {"line":426,"text":"\tvar infos []*signatureHelpItemInfo"},
  {"line":427,"text":"\tif isTypeParameterList {"},
  {"line":428,"text":"\t\tinfos = l.itemInfoForTypeParameters(candidate, c, enclosingDeclaration, sourceFile, docFormat, vsCapability)"},
  {"line":429,"text":"\t} else {"},
  {"line":430,"text":"\t\tinfos = l.itemInfoForParameters(candidate, c, enclosingDeclaration, sourceFile, docFormat, vsCapability)"},
  {"line":431,"text":"\t}"},
  {"line":433,"text":"\tsuffixDpw := returnTypeToDisplayParts(candidate, c, enclosingDeclaration, sourceFile, vsCapability)"},
  {"line":436,"text":"\tvar documentation *string"},
  {"line":437,"text":"\tif declaration := candidate.Declaration(); declaration != nil {"},
  {"line":438,"text":"\t\tdoc := l.getDocumentationFromDeclaration(c, nil, declaration, nil, docFormat, true /*commentOnly*/)"},
  {"line":439,"text":"\t\tif doc != \"\" {"},
  {"line":440,"text":"\t\t\tdocumentation = &doc"},
  {"line":441,"text":"\t\t}"},
  {"line":442,"text":"\t}"},
  {"line":444,"text":"\tresult := make([]signatureInformation, len(infos))"},
  {"line":445,"text":"\tfor i, info := range infos {"},
  {"line":446,"text":"\t\tlabelDpw := newDisplayPartsWriter(vsCapability)"},
  {"line":447,"text":"\t\tif callTargetSymbol != \"\" {"},
  {"line":448,"text":"\t\t\tlabelDpw.WriteSymbol(callTargetSymbol, callTargetSym)"},
  {"line":449,"text":"\t\t}"},
  {"line":450,"text":"\t\tlabelDpw.WriteFrom(info.writer)"},
  {"line":451,"text":"\t\tlabelDpw.WriteFrom(suffixDpw)"},
  {"line":453,"text":"\t\tresult[i] = signatureInformation{"},
  {"line":454,"text":"\t\t\tLabel:         labelDpw.String(),"},
  {"line":455,"text":"\t\t\tDocumentation: documentation,"},
  {"line":456,"text":"\t\t\tParameters:    info.parameters,"},
  {"line":457,"text":"\t\t\tIsVariadic:    info.isVariadic,"},
  {"line":458,"text":"\t\t\tColorizedRuns: labelDpw.GetRuns(),"},
  {"line":459,"text":"\t\t}"},
  {"line":460,"text":"\t}"},
  {"line":461,"text":"\treturn result"},
  {"line":462,"text":"}"},
  {"line":464,"text":"func returnTypeToDisplayParts(candidateSignature *checker.Signature, c *checker.Checker, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, vsCapability bool) *displayPartsWriter {"},
  {"line":465,"text":"\tdpw := newDisplayPartsWriter(vsCapability)"},
  {"line":468,"text":"\tdpw.WritePunctuation(\":\")"},
  {"line":469,"text":"\tdpw.WriteSpace(\" \")"},
  {"line":471,"text":"\tpredicate := c.GetTypePredicateOfSignature(candidateSignature)"},
  {"line":472,"text":"\tif predicate != nil {"},
  {"line":473,"text":"\t\tdpw.Write(c.TypePredicateToString(predicate))"},
  {"line":474,"text":"\t} else {"},
  {"line":475,"text":"\t\treturnType := c.GetReturnTypeOfSignature(candidateSignature)"},
  {"line":476,"text":"\t\ttypeNode := c.TypeToTypeNode(returnType, enclosingDeclaration, signatureHelpNodeBuilderFlags, nil)"},
  {"line":477,"text":"\t\tif typeNode != nil {"},
  {"line":478,"text":"\t\t\tp := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, printer.NewEmitContext())"},
  {"line":480,"text":"\t\t\ttempDpw := newDisplayPartsWriter(vsCapability)"},
  {"line":481,"text":"\t\t\tp.Write(typeNode, sourceFile, tempDpw, nil)"},
  {"line":482,"text":"\t\t\tdpw.WriteFrom(tempDpw)"},
  {"line":483,"text":"\t\t} else {"},
  {"line":484,"text":"\t\t\tdpw.Write(c.TypeToString(returnType))"},
  {"line":485,"text":"\t\t}"},
  {"line":486,"text":"\t}"},
  {"line":487,"text":"\treturn dpw"},
  {"line":488,"text":"}"},
  {"line":490,"text":"func (l *LanguageService) itemInfoForTypeParameters(candidateSignature *checker.Signature, c *checker.Checker, enclosingDeclaration *ast.Node, sourceFile *ast.SourceFile, docFormat lsproto.MarkupKind, vsCapability bool) []*signatureHelpItemInfo {"},
  {"line":491,"text":"\temitContext := printer.NewEmitContext()"},
  {"line":492,"text":"\tp := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, emitContext)"},
  {"line":494,"text":"\tvar typeParameters []*checker.Type"},
  {"line":495,"text":"\tif candidateSignature.Target() != nil {"},
  {"line":496,"text":"\t\ttypeParameters = candidateSignature.Target().TypeParameters()"},
  {"line":497,"text":"\t} else {"},
  {"line":498,"text":"\t\ttypeParameters = candidateSignature.TypeParameters()"},
  {"line":499,"text":"\t}"},
  {"line":500,"text":"\tsignatureHelpTypeParameters := make([]signatureHelpParameter, len(typeParameters))"},
  {"line":501,"text":"\tfor i, typeParameter := range typeParameters {"},
  {"line":502,"text":"\t\tsignatureHelpTypeParameters[i] = createSignatureHelpParameterForTypeParameter(typeParameter, sourceFile, enclosingDeclaration, c, p)"},
  {"line":503,"text":"\t}"},
  {"line":505,"text":"\tthisParameter := []signatureHelpParameter{}"},
  {"line":506,"text":"\tif candidateSignature.ThisParameter() != nil {"},
  {"line":507,"text":"\t\tthisParameter = []signatureHelpParameter{l.createSignatureHelpParameterForParameter(candidateSignature.ThisParameter(), enclosingDeclaration, p, sourceFile, c, docFormat)}"},
  {"line":508,"text":"\t}"},
  {"line":511,"text":"\tdpw := newDisplayPartsWriter(vsCapability)"},
  {"line":513,"text":"\tlessThanToken := scanner.TokenToString(ast.KindLessThanToken)"},
  {"line":514,"text":"\tdpw.WritePunctuation(lessThanToken)"},
  {"line":515,"text":"\tfor i, typeParameter := range signatureHelpTypeParameters {"},
  {"line":516,"text":"\t\tif i > 0 {"},
  {"line":517,"text":"\t\t\tdpw.WritePunctuation(\",\")"},
  {"line":518,"text":"\t\t\tdpw.WriteSpace(\" \")"},
  {"line":519,"text":"\t\t}"},
  {"line":520,"text":"\t\tlabel := *typeParameter.parameterInfo.Label.String"},
  {"line":521,"text":"\t\tdpw.WriteClassified(label, lsproto.ClassificationTypeNameTypeParameterName)"},
  {"line":522,"text":"\t}"},
  {"line":523,"text":"\tgreaterThanToken := scanner.TokenToString(ast.KindGreaterThanToken)"},
  {"line":524,"text":"\tdpw.WritePunctuation(greaterThanToken)"},
  {"line":527,"text":"\tlists := c.GetExpandedParameters(candidateSignature, false)"},
  {"line":528,"text":"\tif len(lists) != 0 {"},
  {"line":529,"text":"\t\topenParen := scanner.TokenToString(ast.KindOpenParenToken)"},
  {"line":530,"text":"\t\tdpw.WritePunctuation(openParen)"},
  {"line":531,"text":"\t}"},
  {"line":533,"text":"\tresult := make([]*signatureHelpItemInfo, len(lists))"},
  {"line":534,"text":"\tfor i, parameterList := range lists {"},
  {"line":535,"text":"\t\tparamDpw := newDisplayPartsWriter(vsCapability)"},
  {"line":536,"text":"\t\tparamDpw.WriteFrom(dpw)"},
  {"line":538,"text":"\t\tparameters := thisParameter"},
  {"line":539,"text":"\t\tfor j, param := range parameterList {"},
  {"line":540,"text":"\t\t\tparamNode := checker.NewNodeBuilder(c, emitContext).SymbolToParameterDeclaration(param, enclosingDeclaration, signatureHelpNodeBuilderFlags, nodebuilder.InternalFlagsNone, nil)"},
  {"line":542,"text":"\t\t\tif j > 0 {"},
  {"line":543,"text":"\t\t\t\tparamDpw.WritePunctuation(\",\")"},
  {"line":544,"text":"\t\t\t\tparamDpw.WriteSpace(\" \")"},
  {"line":545,"text":"\t\t\t}"},
  {"line":547,"text":"\t\t\ttempDpw := newDisplayPartsWriter(vsCapability)"},
  {"line":548,"text":"\t\t\tp.Write(paramNode, sourceFile, tempDpw, nil)"},
  {"line":549,"text":"\t\t\tparamLabel := tempDpw.String()"},
  {"line":550,"text":"\t\t\tparamDpw.WriteFrom(tempDpw)"},
  {"line":552,"text":"\t\t\tparameter := l.createSignatureHelpParameterFromLabel(param, paramLabel, c, docFormat)"},
  {"line":553,"text":"\t\t\tparameters = append(parameters, parameter)"},
  {"line":554,"text":"\t\t}"},
  {"line":555,"text":"\t\tcloseParen := scanner.TokenToString(ast.KindCloseParenToken)"},
  {"line":556,"text":"\t\tparamDpw.WritePunctuation(closeParen)"},
  {"line":558,"text":"\t\tresult[i] = &signatureHelpItemInfo{"},
  {"line":559,"text":"\t\t\tisVariadic: false,"},
  {"line":560,"text":"\t\t\tparameters: signatureHelpTypeParameters,"},
  {"line":561,"text":"\t\t\twriter:     paramDpw,"},
  {"line":562,"text":"\t\t}"},
  {"line":563,"text":"\t}"},
  {"line":564,"text":"\treturn result"},
  {"line":565,"text":"}"},
  {"line":567,"text":"func (l *LanguageService) itemInfoForParameters(candidateSignature *checker.Signature, c *checker.Checker, enclosingDeclaratipn *ast.Node, sourceFile *ast.SourceFile, docFormat lsproto.MarkupKind, vsCapability bool) []*signatureHelpItemInfo {"},
  {"line":568,"text":"\temitContext := printer.NewEmitContext()"},
  {"line":569,"text":"\tp := printer.NewPrinter(printer.PrinterOptions{NewLine: core.NewLineKindLF}, printer.PrintHandlers{}, emitContext)"},
  {"line":571,"text":"\tsignatureHelpTypeParameters := make([]signatureHelpParameter, len(candidateSignature.TypeParameters()))"},
  {"line":572,"text":"\tif len(candidateSignature.TypeParameters()) != 0 {"},
  {"line":573,"text":"\t\tfor i, typeParameter := range candidateSignature.TypeParameters() {"},
  {"line":574,"text":"\t\t\tsignatureHelpTypeParameters[i] = createSignatureHelpParameterForTypeParameter(typeParameter, sourceFile, enclosingDeclaratipn, c, p)"},
  {"line":575,"text":"\t\t}"},
  {"line":576,"text":"\t}"},
  {"line":579,"text":"\tdpw := newDisplayPartsWriter(vsCapability)"},
  {"line":581,"text":"\tif len(signatureHelpTypeParameters) != 0 {"},
  {"line":582,"text":"\t\tlessThanToken := scanner.TokenToString(ast.KindLessThanToken)"},
  {"line":583,"text":"\t\tdpw.WritePunctuation(lessThanToken)"},
  {"line":584,"text":"\t\tfor i, typeParameter := range signatureHelpTypeParameters {"},
  {"line":585,"text":"\t\t\tif i > 0 {"},
  {"line":586,"text":"\t\t\t\tdpw.WritePunctuation(\",\")"},
  {"line":587,"text":"\t\t\t\tdpw.WriteSpace(\" \")"},
  {"line":588,"text":"\t\t\t}"},
  {"line":589,"text":"\t\t\tlabel := *typeParameter.parameterInfo.Label.String"},
  {"line":590,"text":"\t\t\tdpw.WriteClassified(label, lsproto.ClassificationTypeNameTypeParameterName)"},
  {"line":591,"text":"\t\t}"},
  {"line":592,"text":"\t\tgreaterThanToken := scanner.TokenToString(ast.KindGreaterThanToken)"},
  {"line":593,"text":"\t\tdpw.WritePunctuation(greaterThanToken)"},
  {"line":594,"text":"\t}"},
  {"line":597,"text":"\tlists := c.GetExpandedParameters(candidateSignature, false)"},
  {"line":598,"text":"\tif len(lists) != 0 {"},
  {"line":599,"text":"\t\topenParen := scanner.TokenToString(ast.KindOpenParenToken)"},
  {"line":600,"text":"\t\tdpw.WritePunctuation(openParen)"},
  {"line":601,"text":"\t}"},
  {"line":603,"text":"\tisVariadic := func(parameterList []*ast.Symbol) bool {"},
  {"line":604,"text":"\t\tif !c.HasEffectiveRestParameter(candidateSignature) {"},
  {"line":605,"text":"\t\t\treturn false"},
  {"line":606,"text":"\t\t}"},
  {"line":607,"text":"\t\tif len(lists) == 1 {"},
  {"line":608,"text":"\t\t\treturn true"},
  {"line":609,"text":"\t\t}"},
  {"line":610,"text":"\t\treturn len(parameterList) != 0 && parameterList[len(parameterList)-1] != nil && (parameterList[len(parameterList)-1].CheckFlags&ast.CheckFlagsRestParameter != 0)"},
  {"line":611,"text":"\t}"},
  {"line":613,"text":"\tresult := make([]*signatureHelpItemInfo, len(lists))"},
  {"line":614,"text":"\tfor i, parameterList := range lists {"},
  {"line":615,"text":"\t\tparameters := make([]signatureHelpParameter, len(parameterList))"},
  {"line":616,"text":"\t\tparamDpw := newDisplayPartsWriter(vsCapability)"},
  {"line":617,"text":"\t\tparamDpw.WriteFrom(dpw)"},
  {"line":619,"text":"\t\tfor j, param := range parameterList {"},
  {"line":620,"text":"\t\t\tparamNode := checker.NewNodeBuilder(c, emitContext).SymbolToParameterDeclaration(param, enclosingDeclaratipn, signatureHelpNodeBuilderFlags, nodebuilder.InternalFlagsNone, nil)"},
  {"line":622,"text":"\t\t\tif j > 0 {"},
  {"line":623,"text":"\t\t\t\tparamDpw.WritePunctuation(\",\")"},
  {"line":624,"text":"\t\t\t\tparamDpw.WriteSpace(\" \")"},
  {"line":625,"text":"\t\t\t}"},
  {"line":627,"text":"\t\t\ttempDpw := newDisplayPartsWriter(vsCapability)"},
  {"line":628,"text":"\t\t\tp.Write(paramNode, sourceFile, tempDpw, nil)"},
  {"line":629,"text":"\t\t\tparamLabel := tempDpw.String()"},
  {"line":630,"text":"\t\t\tparamDpw.WriteFrom(tempDpw)"},
  {"line":632,"text":"\t\t\tparameter := l.createSignatureHelpParameterFromLabel(param, paramLabel, c, docFormat)"},
  {"line":633,"text":"\t\t\tparameters[j] = parameter"},
  {"line":634,"text":"\t\t}"},
  {"line":635,"text":"\t\tcloseParen := scanner.TokenToString(ast.KindCloseParenToken)"},
  {"line":636,"text":"\t\tparamDpw.WritePunctuation(closeParen)"},
  {"line":638,"text":"\t\tresult[i] = &signatureHelpItemInfo{"},
  {"line":639,"text":"\t\t\tisVariadic: isVariadic(parameterList),"},
  {"line":640,"text":"\t\t\tparameters: parameters,"},
  {"line":641,"text":"\t\t\twriter:     paramDpw,"},
  {"line":642,"text":"\t\t}"},
  {"line":643,"text":"\t}"},
  {"line":644,"text":"\treturn result"},
  {"line":645,"text":"}"},
  {"line":647,"text":"const signatureHelpNodeBuilderFlags = nodebuilder.FlagsOmitParameterModifiers | nodebuilder.FlagsIgnoreErrors | nodebuilder.FlagsUseAliasDefinedOutsideCurrentScope"},
  {"line":650,"text":"func (l *LanguageService) createSignatureHelpParameterFromLabel(parameter *ast.Symbol, label string, c *checker.Checker, docFormat lsproto.MarkupKind) signatureHelpParameter {"},
  {"line":651,"text":"\tisOptional := parameter.CheckFlags&ast.CheckFlagsOptionalParameter != 0"},
  {"line":652,"text":"\tisRest := parameter.CheckFlags&ast.CheckFlagsRestParameter != 0"},
  {"line":653,"text":"\tvar documentation *lsproto.StringOrMarkupContent"},
  {"line":654,"text":"\tif parameter.ValueDeclaration != nil {"},
  {"line":655,"text":"\t\tdoc := l.getDocumentationFromDeclaration(c, nil, parameter.ValueDeclaration, nil, docFormat, true /*commentOnly*/)"},
  {"line":656,"text":"\t\tif doc != \"\" {"},
  {"line":657,"text":"\t\t\tdocumentation = &lsproto.StringOrMarkupContent{"},
  {"line":658,"text":"\t\t\t\tMarkupContent: &lsproto.MarkupContent{"},
  {"line":659,"text":"\t\t\t\t\tKind:  docFormat,"},
  {"line":660,"text":"\t\t\t\t\tValue: doc,"},
  {"line":661,"text":"\t\t\t\t},"},
  {"line":662,"text":"\t\t\t}"},
  {"line":663,"text":"\t\t}"},
  {"line":664,"text":"\t}"},
  {"line":665,"text":"\treturn signatureHelpParameter{"},
  {"line":666,"text":"\t\tparameterInfo: &lsproto.ParameterInformation{"},
  {"line":667,"text":"\t\t\tLabel:         lsproto.StringOrTuple{String: &label},"},
  {"line":668,"text":"\t\t\tDocumentation: documentation,"},
  {"line":669,"text":"\t\t},"},
  {"line":670,"text":"\t\tisRest:     isRest,"},
  {"line":671,"text":"\t\tisOptional: isOptional,"},
  {"line":672,"text":"\t}"},
  {"line":673,"text":"}"},
  {"line":675,"text":"func (l *LanguageService) createSignatureHelpParameterForParameter(parameter *ast.Symbol, enclosingDeclaratipn *ast.Node, p *printer.Printer, sourceFile *ast.SourceFile, c *checker.Checker, docFormat lsproto.MarkupKind) signatureHelpParameter {"},
  {"line":676,"text":"\tdisplay := p.Emit(checker.NewNodeBuilder(c, printer.NewEmitContext()).SymbolToParameterDeclaration(parameter, enclosingDeclaratipn, signatureHelpNodeBuilderFlags, nodebuilder.InternalFlagsNone, nil), sourceFile)"},
  {"line":677,"text":"\treturn l.createSignatureHelpParameterFromLabel(parameter, display, c, docFormat)"},
  {"line":678,"text":"}"},
  {"line":680,"text":"func createSignatureHelpParameterForTypeParameter(t *checker.Type, sourceFile *ast.SourceFile, enclosingDeclaration *ast.Node, c *checker.Checker, p *printer.Printer) signatureHelpParameter {"},
  {"line":681,"text":"\tdisplay := p.Emit(checker.NewNodeBuilder(c, printer.NewEmitContext()).TypeParameterToDeclaration(t, enclosingDeclaration, signatureHelpNodeBuilderFlags, nodebuilder.InternalFlagsNone, nil), sourceFile)"},
  {"line":682,"text":"\treturn signatureHelpParameter{"},
  {"line":683,"text":"\t\tparameterInfo: &lsproto.ParameterInformation{"},
  {"line":684,"text":"\t\t\tLabel: lsproto.StringOrTuple{String: &display},"},
  {"line":685,"text":"\t\t},"},
  {"line":686,"text":"\t\tisRest:     false,"},
  {"line":687,"text":"\t\tisOptional: false,"},
  {"line":688,"text":"\t}"},
  {"line":689,"text":"}"},
  {"line":694,"text":"type signatureInformation struct {"},
  {"line":697,"text":"\tLabel string"},
  {"line":700,"text":"\tDocumentation *string"},
  {"line":702,"text":"\tParameters []signatureHelpParameter"},
  {"line":704,"text":"\tIsVariadic bool"},
  {"line":706,"text":"\tColorizedRuns []*lsproto.ClassifiedTextRun"},
  {"line":707,"text":"}"},
  {"line":709,"text":"type signatureHelpItemInfo struct {"},
  {"line":710,"text":"\tisVariadic bool"},
  {"line":711,"text":"\tparameters []signatureHelpParameter"},
  {"line":712,"text":"\twriter     *displayPartsWriter"},
  {"line":713,"text":"}"},
  {"line":715,"text":"type signatureHelpParameter struct {"},
  {"line":716,"text":"\tparameterInfo *lsproto.ParameterInformation"},
  {"line":717,"text":"\tisRest        bool"},
  {"line":718,"text":"\tisOptional    bool"},
  {"line":719,"text":"}"},
  {"line":721,"text":"func getEnclosingDeclarationFromInvocation(invocation *invocation) *ast.Node {"},
  {"line":722,"text":"\tif invocation.callInvocation != nil {"},
  {"line":723,"text":"\t\treturn invocation.callInvocation.node"},
  {"line":724,"text":"\t} else if invocation.typeArgsInvocation != nil {"},
  {"line":725,"text":"\t\treturn invocation.typeArgsInvocation.called.AsNode()"},
  {"line":726,"text":"\t} else {"},
  {"line":727,"text":"\t\treturn invocation.contextualInvocation.node"},
  {"line":728,"text":"\t}"},
  {"line":729,"text":"}"},
  {"line":731,"text":"func getExpressionFromInvocation(argumentInfo *argumentListInfo) *ast.Node {"},
  {"line":732,"text":"\tif argumentInfo.invocation.callInvocation != nil {"},
  {"line":733,"text":"\t\treturn ast.GetInvokedExpression(argumentInfo.invocation.callInvocation.node)"},
  {"line":734,"text":"\t}"},
  {"line":735,"text":"\treturn argumentInfo.invocation.typeArgsInvocation.called.AsNode()"},
  {"line":736,"text":"}"},
  {"line":738,"text":"type candidateInfo struct {"},
  {"line":739,"text":"\tcandidates        []*checker.Signature"},
  {"line":740,"text":"\tresolvedSignature *checker.Signature"},
  {"line":741,"text":"}"},
  {"line":743,"text":"type CandidateOrTypeInfo struct {"},
  {"line":744,"text":"\tcandidateInfo *candidateInfo"},
  {"line":745,"text":"\ttypeInfo      *ast.Symbol"},
  {"line":746,"text":"}"},
  {"line":748,"text":"func getCandidateOrTypeInfo(info *argumentListInfo, c *checker.Checker, sourceFile *ast.SourceFile, startingToken *ast.Node, onlyUseSyntacticOwners bool) *CandidateOrTypeInfo {"},
  {"line":749,"text":"\tif info.invocation.callInvocation != nil {"},
  {"line":750,"text":"\t\tif onlyUseSyntacticOwners && !isSyntacticOwner(startingToken, info.invocation.callInvocation.node, sourceFile) {"},
  {"line":751,"text":"\t\t\treturn nil"},
  {"line":752,"text":"\t\t}"},
  {"line":754,"text":"\t\tresolvedSignature, candidates := checker.GetResolvedSignatureForSignatureHelp(info.invocation.callInvocation.node, info.argumentCount, c)"},
  {"line":755,"text":"\t\tif len(candidates) == 0 {"},
  {"line":756,"text":"\t\t\treturn nil"},
  {"line":757,"text":"\t\t}"},
  {"line":759,"text":"\t\treturn &CandidateOrTypeInfo{"},
  {"line":760,"text":"\t\t\tcandidateInfo: &candidateInfo{"},
  {"line":761,"text":"\t\t\t\tcandidates:        candidates,"},
  {"line":762,"text":"\t\t\t\tresolvedSignature: resolvedSignature,"},
  {"line":763,"text":"\t\t\t},"},
  {"line":764,"text":"\t\t}"},
  {"line":765,"text":"\t}"},
  {"line":766,"text":"\tif info.invocation.typeArgsInvocation != nil {"},
  {"line":767,"text":"\t\tcalled := info.invocation.typeArgsInvocation.called.AsNode()"},
  {"line":768,"text":"\t\tcontainer := called"},
  {"line":769,"text":"\t\tif ast.IsIdentifier(called) {"},
  {"line":770,"text":"\t\t\tcontainer = called.Parent"},
  {"line":771,"text":"\t\t}"},
  {"line":773,"text":"\t\tif onlyUseSyntacticOwners && !containsPrecedingToken(startingToken, sourceFile, container) {"},
  {"line":774,"text":"\t\t\treturn nil"},
  {"line":775,"text":"\t\t}"},
  {"line":777,"text":"\t\tcandidates := getPossibleGenericSignatures(called, info.argumentCount, c)"},
  {"line":778,"text":"\t\tif len(candidates) != 0 {"},
  {"line":779,"text":"\t\t\treturn &CandidateOrTypeInfo{"},
  {"line":780,"text":"\t\t\t\tcandidateInfo: &candidateInfo{"},
  {"line":781,"text":"\t\t\t\t\tcandidates:        candidates,"},
  {"line":782,"text":"\t\t\t\t\tresolvedSignature: candidates[0],"},
  {"line":783,"text":"\t\t\t\t},"},
  {"line":784,"text":"\t\t\t}"},
  {"line":785,"text":"\t\t}"},
  {"line":787,"text":"\t\tif symbol := c.GetSymbolAtLocation(called); symbol != nil {"},
  {"line":788,"text":"\t\t\treturn &CandidateOrTypeInfo{"},
  {"line":789,"text":"\t\t\t\ttypeInfo: symbol,"},
  {"line":790,"text":"\t\t\t}"},
  {"line":791,"text":"\t\t}"},
  {"line":794,"text":"\t\treturn nil"},
  {"line":795,"text":"\t}"},
  {"line":797,"text":"\tif info.invocation.contextualInvocation != nil {"},
  {"line":798,"text":"\t\treturn &CandidateOrTypeInfo{"},
  {"line":799,"text":"\t\t\tcandidateInfo: &candidateInfo{"},
  {"line":800,"text":"\t\t\t\tcandidates:        []*checker.Signature{info.invocation.contextualInvocation.signature},"},
  {"line":801,"text":"\t\t\t\tresolvedSignature: info.invocation.contextualInvocation.signature,"},
  {"line":802,"text":"\t\t\t},"},
  {"line":803,"text":"\t\t}"},
  {"line":804,"text":"\t}"},
  {"line":805,"text":"\tdebug.AssertNever(info.invocation)"},
  {"line":806,"text":"\treturn nil"},
  {"line":807,"text":"}"},
  {"line":809,"text":"func isSyntacticOwner(startingToken *ast.Node, node *ast.CallLikeExpression, sourceFile *ast.SourceFile) bool {"},
  {"line":810,"text":"\tif !ast.IsCallOrNewExpression(node) {"},
  {"line":811,"text":"\t\treturn false"},
  {"line":812,"text":"\t}"},
  {"line":813,"text":"\tinvocationChildren := getChildrenFromNonJSDocNode(node, sourceFile)"},
  {"line":814,"text":"\tswitch startingToken.Kind {"},
  {"line":815,"text":"\tcase ast.KindOpenParenToken, ast.KindCommaToken:"},
  {"line":816,"text":"\t\treturn slices.Contains(invocationChildren, startingToken)"},
  {"line":817,"text":"\tcase ast.KindLessThanToken:"},
  {"line":818,"text":"\t\treturn containsPrecedingToken(startingToken, sourceFile, node.Expression())"},
  {"line":819,"text":"\tdefault:"},
  {"line":820,"text":"\t\treturn false"},
  {"line":821,"text":"\t}"},
  {"line":822,"text":"}"},
  {"line":824,"text":"func containsPrecedingToken(startingToken *ast.Node, sourceFile *ast.SourceFile, container *ast.Node) bool {"},
  {"line":825,"text":"\tpos := startingToken.Pos()"},
  {"line":831,"text":"\tcurrentParent := startingToken.Parent"},
  {"line":832,"text":"\tfor currentParent != nil {"},
  {"line":833,"text":"\t\tprecedingToken := astnav.FindPrecedingTokenEx(sourceFile, pos, currentParent, true /*excludeJSDoc*/)"},
  {"line":834,"text":"\t\tif precedingToken != nil {"},
  {"line":835,"text":"\t\t\treturn RangeContainsRange(container.Loc, precedingToken.Loc)"},
  {"line":836,"text":"\t\t}"},
  {"line":837,"text":"\t\tcurrentParent = currentParent.Parent"},
  {"line":838,"text":"\t}"},
  {"line":839,"text":"\treturn false"},
  {"line":840,"text":"}"},
  {"line":842,"text":"func getContainingArgumentInfo(node *ast.Node, sourceFile *ast.SourceFile, checker *checker.Checker, isManuallyInvoked bool, position int) *argumentListInfo {"},
  {"line":843,"text":"\tvar firstArgumentInfo *argumentListInfo"},
  {"line":844,"text":"\tfor n := node; !ast.IsSourceFile(n) && (isManuallyInvoked || !ast.IsBlock(n)); n = n.Parent {"},
  {"line":847,"text":"\t\tdebug.Assert(RangeContainsRange(n.Parent.Loc, n.Loc), \"Not a subspan. Child: \", n.KindString(), \", parent: \", n.Parent.KindString())"},
  {"line":848,"text":"\t\targumentInfo := getImmediatelyContainingArgumentOrContextualParameterInfo(n, position, sourceFile, checker)"},
  {"line":849,"text":"\t\tif argumentInfo != nil {"},
  {"line":854,"text":"\t\t\tif argumentInfo.invocation.contextualInvocation != nil {"},
  {"line":855,"text":"\t\t\t\treturn argumentInfo"},
  {"line":856,"text":"\t\t\t}"},
  {"line":859,"text":"\t\t\tif firstArgumentInfo == nil {"},
  {"line":860,"text":"\t\t\t\tfirstArgumentInfo = argumentInfo"},
  {"line":861,"text":"\t\t\t}"},
  {"line":866,"text":"\t\t\tif argumentInfo.argumentsSpan.End() == position {"},
  {"line":867,"text":"\t\t\t\treturn argumentInfo"},
  {"line":868,"text":"\t\t\t}"},
  {"line":873,"text":"\t\t\tif argumentInfo.argumentsSpan.Contains(position) {"},
  {"line":874,"text":"\t\t\t\treturn argumentInfo"},
  {"line":875,"text":"\t\t\t}"},
  {"line":876,"text":"\t\t}"},
  {"line":877,"text":"\t}"},
  {"line":882,"text":"\treturn firstArgumentInfo"},
  {"line":883,"text":"}"},
  {"line":885,"text":"func getImmediatelyContainingArgumentOrContextualParameterInfo(node *ast.Node, position int, sourceFile *ast.SourceFile, checker *checker.Checker) *argumentListInfo {"},
  {"line":886,"text":"\tresult := tryGetParameterInfo(node, sourceFile, checker)"},
  {"line":887,"text":"\tif result == nil {"},
  {"line":888,"text":"\t\treturn getImmediatelyContainingArgumentInfo(node, position, sourceFile, checker)"},
  {"line":889,"text":"\t}"},
  {"line":890,"text":"\treturn result"},
  {"line":891,"text":"}"},
  {"line":893,"text":"type argumentListInfo struct {"},
  {"line":894,"text":"\tisTypeParameterList bool"},
  {"line":895,"text":"\tinvocation          *invocation"},
  {"line":896,"text":"\targumentsSpan       core.TextRange"},
  {"line":897,"text":"\targumentIndex       int"},
  {"line":898,"text":"\t/** argumentCount is the *apparent* number of arguments. */"},
  {"line":899,"text":"\targumentCount int"},
  {"line":900,"text":"}"},
  {"line":904,"text":"func getImmediatelyContainingArgumentInfo(node *ast.Node, position int, sourceFile *ast.SourceFile, c *checker.Checker) *argumentListInfo {"},
  {"line":905,"text":"\tparent := node.Parent"},
  {"line":906,"text":"\tif ast.IsCallOrNewExpression(parent) {"},
  {"line":921,"text":"\t\tinfo := getArgumentOrParameterListInfo(node, sourceFile, c)"},
  {"line":922,"text":"\t\tif info == nil {"},
  {"line":923,"text":"\t\t\treturn nil"},
  {"line":924,"text":"\t\t}"},
  {"line":925,"text":"\t\tlist := info.list"},
  {"line":926,"text":"\t\targumentIndex := info.argumentIndex"},
  {"line":927,"text":"\t\targumentCount := info.argumentCount"},
  {"line":928,"text":"\t\targumentsSpan := info.argumentsSpan"},
  {"line":929,"text":"\t\tisTypeParameterList := false"},
  {"line":930,"text":"\t\tparentTypeArgumentList := parent.TypeArgumentList()"},
  {"line":931,"text":"\t\tif parentTypeArgumentList != nil {"},
  {"line":932,"text":"\t\t\tif parentTypeArgumentList.Pos() == list.Pos() {"},
  {"line":933,"text":"\t\t\t\tisTypeParameterList = true"},
  {"line":934,"text":"\t\t\t}"},
  {"line":935,"text":"\t\t}"},
  {"line":936,"text":"\t\treturn &argumentListInfo{"},
  {"line":937,"text":"\t\t\tisTypeParameterList: isTypeParameterList,"},
  {"line":938,"text":"\t\t\tinvocation:          &invocation{callInvocation: &callInvocation{node: parent}},"},
  {"line":939,"text":"\t\t\targumentsSpan:       argumentsSpan,"},
  {"line":940,"text":"\t\t\targumentIndex:       argumentIndex,"},
  {"line":941,"text":"\t\t\targumentCount:       argumentCount,"},
  {"line":942,"text":"\t\t}"},
  {"line":943,"text":"\t} else if isNoSubstitutionTemplateLiteral(node) && isTaggedTemplateExpression(parent) {"},
  {"line":946,"text":"\t\tif isInsideTemplateLiteral(node, position, sourceFile) {"},
  {"line":947,"text":"\t\t\treturn getArgumentListInfoForTemplate(parent.AsTaggedTemplateExpression(), 0, sourceFile)"},
  {"line":948,"text":"\t\t}"},
  {"line":949,"text":"\t\treturn nil"},
  {"line":950,"text":"\t} else if isTemplateHead(node) && parent.Parent.Kind == ast.KindTaggedTemplateExpression {"},
  {"line":951,"text":"\t\ttemplateExpression := parent.AsTemplateExpression()"},
  {"line":952,"text":"\t\ttagExpression := templateExpression.Parent.AsTaggedTemplateExpression()"},
  {"line":954,"text":"\t\targumentIndex := 1"},
  {"line":955,"text":"\t\tif isInsideTemplateLiteral(node, position, sourceFile) {"},
  {"line":956,"text":"\t\t\targumentIndex = 0"},
  {"line":957,"text":"\t\t}"},
  {"line":958,"text":"\t\treturn getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile)"},
  {"line":959,"text":"\t} else if ast.IsTemplateSpan(parent) && isTaggedTemplateExpression(parent.Parent.Parent) {"},
  {"line":960,"text":"\t\ttemplateSpan := parent"},
  {"line":961,"text":"\t\ttagExpression := parent.Parent.Parent"},
  {"line":964,"text":"\t\tif isTemplateTail(node) && !isInsideTemplateLiteral(node, position, sourceFile) {"},
  {"line":965,"text":"\t\t\treturn nil"},
  {"line":966,"text":"\t\t}"},
  {"line":968,"text":"\t\tspanIndex := ast.IndexOfNode(templateSpan.Parent.AsTemplateExpression().TemplateSpans.Nodes, templateSpan)"},
  {"line":969,"text":"\t\targumentIndex := getArgumentIndexForTemplatePiece(spanIndex, node, position, sourceFile)"},
  {"line":971,"text":"\t\treturn getArgumentListInfoForTemplate(tagExpression.AsTaggedTemplateExpression(), argumentIndex, sourceFile)"},
  {"line":972,"text":"\t} else if ast.IsJsxOpeningLikeElement(parent) {"},
  {"line":978,"text":"\t\tattributeSpanStart := parent.Attributes().Loc.Pos()"},
  {"line":979,"text":"\t\tattributeSpanEnd := scanner.SkipTrivia(sourceFile.Text(), parent.Attributes().End())"},
  {"line":980,"text":"\t\treturn &argumentListInfo{"},
  {"line":981,"text":"\t\t\tisTypeParameterList: false,"},
  {"line":982,"text":"\t\t\tinvocation:          &invocation{callInvocation: &callInvocation{node: parent}},"},
  {"line":983,"text":"\t\t\targumentsSpan:       core.NewTextRange(attributeSpanStart, attributeSpanEnd-attributeSpanStart),"},
  {"line":984,"text":"\t\t\targumentIndex:       0,"},
  {"line":985,"text":"\t\t\targumentCount:       1,"},
  {"line":986,"text":"\t\t}"},
  {"line":987,"text":"\t} else {"},
  {"line":988,"text":"\t\ttypeArgInfo := getPossibleTypeArgumentsInfo(node, sourceFile)"},
  {"line":989,"text":"\t\tif typeArgInfo != nil {"},
  {"line":990,"text":"\t\t\tcalled := typeArgInfo.called"},
  {"line":991,"text":"\t\t\tnTypeArguments := typeArgInfo.nTypeArguments"},
  {"line":992,"text":"\t\t\tinvoc := &typeArgsInvocation{called: called.AsIdentifier()}"},
  {"line":993,"text":"\t\t\targumentRange := core.NewTextRange(called.Loc.Pos(), node.End())"},
  {"line":994,"text":"\t\t\treturn &argumentListInfo{"},
  {"line":995,"text":"\t\t\t\tisTypeParameterList: true,"},
  {"line":996,"text":"\t\t\t\tinvocation: &invocation{"},
  {"line":997,"text":"\t\t\t\t\ttypeArgsInvocation: invoc,"},
  {"line":998,"text":"\t\t\t\t},"},
  {"line":999,"text":"\t\t\t\targumentsSpan: argumentRange,"},
  {"line":1000,"text":"\t\t\t\targumentIndex: nTypeArguments,"},
  {"line":1001,"text":"\t\t\t\targumentCount: nTypeArguments + 1,"},
  {"line":1002,"text":"\t\t\t}"},
  {"line":1003,"text":"\t\t}"},
  {"line":1004,"text":"\t}"},
  {"line":1005,"text":"\treturn nil"},
  {"line":1006,"text":"}"},
  {"line":1010,"text":"func getArgumentIndexForTemplatePiece(spanIndex int, node *ast.Node, position int, sourceFile *ast.SourceFile) int {"},
  {"line":1022,"text":"\tdebug.Assert(position >= node.Loc.Pos(), \"Assumed 'position' could not occur before node.\")"},
  {"line":1023,"text":"\tif ast.IsTemplateLiteralToken(node) {"},
  {"line":1024,"text":"\t\tif isInsideTemplateLiteral(node, position, sourceFile) {"},
  {"line":1025,"text":"\t\t\treturn 0"},
  {"line":1026,"text":"\t\t}"},
  {"line":1027,"text":"\t\treturn spanIndex + 2"},
  {"line":1028,"text":"\t}"},
  {"line":1029,"text":"\treturn spanIndex + 1"},
  {"line":1030,"text":"}"},
  {"line":1032,"text":"func getAdjustedNode(node *ast.Node) *ast.Node {"},
  {"line":1033,"text":"\tswitch node.Kind {"},
  {"line":1034,"text":"\tcase ast.KindOpenParenToken, ast.KindCommaToken:"},
  {"line":1035,"text":"\t\treturn node"},
  {"line":1036,"text":"\tdefault:"},
  {"line":1037,"text":"\t\treturn ast.FindAncestor(node.Parent, func(n *ast.Node) bool {"},
  {"line":1038,"text":"\t\t\tif ast.IsParameterDeclaration(n) {"},
  {"line":1039,"text":"\t\t\t\treturn true"},
  {"line":1040,"text":"\t\t\t} else if ast.IsBindingElement(n) || ast.IsObjectBindingPattern(n) || ast.IsArrayBindingPattern(n) {"},
  {"line":1041,"text":"\t\t\t\treturn false"},
  {"line":1042,"text":"\t\t\t}"},
  {"line":1043,"text":"\t\t\treturn false"},
  {"line":1044,"text":"\t\t})"},
  {"line":1045,"text":"\t}"},
  {"line":1046,"text":"}"},
  {"line":1048,"text":"type contextualSignatureLocationInfo struct {"},
  {"line":1049,"text":"\tcontextualType *checker.Type"},
  {"line":1050,"text":"\targumentIndex  int"},
  {"line":1051,"text":"\targumentCount  int"},
  {"line":1052,"text":"\targumentsSpan  core.TextRange"},
  {"line":1053,"text":"}"},
  {"line":1055,"text":"func getSpreadElementCount(node *ast.SpreadElement, c *checker.Checker) int {"},
  {"line":1056,"text":"\tspreadType := c.GetTypeAtLocation(node.Expression)"},
  {"line":1057,"text":"\tif checker.IsTupleType(spreadType) {"},
  {"line":1058,"text":"\t\ttupleType := spreadType.Target().AsTupleType()"},
  {"line":1059,"text":"\t\tif tupleType == nil {"},
  {"line":1060,"text":"\t\t\treturn 0"},
  {"line":1061,"text":"\t\t}"},
  {"line":1062,"text":"\t\telementFlags := tupleType.ElementFlags()"},
  {"line":1063,"text":"\t\tfixedLength := tupleType.FixedLength()"},
  {"line":1064,"text":"\t\tif fixedLength == 0 {"},
  {"line":1065,"text":"\t\t\treturn 0"},
  {"line":1066,"text":"\t\t}"},
  {"line":1068,"text":"\t\tfirstOptionalIndex := core.FindIndex(elementFlags, func(f checker.ElementFlags) bool {"},
  {"line":1069,"text":"\t\t\treturn (f&checker.ElementFlagsRequired == 0)"},
  {"line":1070,"text":"\t\t})"},
  {"line":1071,"text":"\t\tif firstOptionalIndex < 0 {"},
  {"line":1072,"text":"\t\t\treturn fixedLength"},
  {"line":1073,"text":"\t\t}"},
  {"line":1074,"text":"\t\treturn firstOptionalIndex"},
  {"line":1075,"text":"\t}"},
  {"line":1076,"text":"\treturn 0"},
  {"line":1077,"text":"}"},
  {"line":1079,"text":"func getArgumentIndex(node *ast.Node, arguments *ast.NodeList, sourceFile *ast.SourceFile, c *checker.Checker) int {"},
  {"line":1080,"text":"\treturn getArgumentIndexOrCount(getTokenFromNodeList(arguments, node.Parent, sourceFile), node, c)"},
  {"line":1081,"text":"}"},
  {"line":1083,"text":"func getArgumentCount(node *ast.Node, arguments *ast.NodeList, sourceFile *ast.SourceFile, c *checker.Checker) int {"},
  {"line":1084,"text":"\treturn getArgumentIndexOrCount(getTokenFromNodeList(arguments, node.Parent, sourceFile), nil, c)"},
  {"line":1085,"text":"}"},
  {"line":1087,"text":"func getArgumentIndexOrCount(arguments []*ast.Node, node *ast.Node, c *checker.Checker) int {"},
  {"line":1088,"text":"\targumentIndex := 0"},
  {"line":1089,"text":"\tskipComma := false"},
  {"line":1090,"text":"\tfor _, arg := range arguments {"},
  {"line":1091,"text":"\t\tif node != nil && arg == node {"},
  {"line":1092,"text":"\t\t\tif !skipComma && arg.Kind == ast.KindCommaToken {"},
  {"line":1093,"text":"\t\t\t\targumentIndex++"},
  {"line":1094,"text":"\t\t\t}"},
  {"line":1095,"text":"\t\t\treturn argumentIndex"},
  {"line":1096,"text":"\t\t}"},
  {"line":1097,"text":"\t\tif ast.IsSpreadElement(arg) {"},
  {"line":1098,"text":"\t\t\targumentIndex += getSpreadElementCount(arg.AsSpreadElement(), c)"},
  {"line":1099,"text":"\t\t\tskipComma = true"},
  {"line":1100,"text":"\t\t\tcontinue"},
  {"line":1101,"text":"\t\t}"},
  {"line":1102,"text":"\t\tif arg.Kind != ast.KindCommaToken {"},
  {"line":1103,"text":"\t\t\targumentIndex++"},
  {"line":1104,"text":"\t\t\tskipComma = true"},
  {"line":1105,"text":"\t\t\tcontinue"},
  {"line":1106,"text":"\t\t}"},
  {"line":1107,"text":"\t\tif skipComma {"},
  {"line":1108,"text":"\t\t\tskipComma = false"},
  {"line":1109,"text":"\t\t\tcontinue"},
  {"line":1110,"text":"\t\t}"},
  {"line":1111,"text":"\t\targumentIndex++"},
  {"line":1112,"text":"\t}"},
  {"line":1113,"text":"\tif node != nil {"},
  {"line":1114,"text":"\t\treturn argumentIndex"},
  {"line":1115,"text":"\t}"},
  {"line":1122,"text":"\targumentCount := argumentIndex"},
  {"line":1123,"text":"\tif len(arguments) > 0 && arguments[len(arguments)-1].Kind == ast.KindCommaToken {"},
  {"line":1124,"text":"\t\targumentCount = argumentIndex + 1"},
  {"line":1125,"text":"\t}"},
  {"line":1126,"text":"\treturn argumentCount"},
  {"line":1127,"text":"}"},
  {"line":1129,"text":"type argumentOrParameterListInfo struct {"},
  {"line":1130,"text":"\tlist          *ast.NodeList"},
  {"line":1131,"text":"\targumentIndex int"},
  {"line":1132,"text":"\targumentCount int"},
  {"line":1133,"text":"\targumentsSpan core.TextRange"},
  {"line":1134,"text":"}"},
  {"line":1136,"text":"func getArgumentOrParameterListInfo(node *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *argumentOrParameterListInfo {"},
  {"line":1137,"text":"\tinfo := getArgumentOrParameterListAndIndex(node, sourceFile, c)"},
  {"line":1138,"text":"\tif info == nil {"},
  {"line":1139,"text":"\t\treturn nil"},
  {"line":1140,"text":"\t}"},
  {"line":1141,"text":"\tlist := info.list"},
  {"line":1142,"text":"\targumentIndex := info.argumentIndex"},
  {"line":1143,"text":"\targumentCount := getArgumentCount(node, list, sourceFile, c)"},
  {"line":1144,"text":"\targumentsSpan := getApplicableSpanForArguments(list, node, sourceFile)"},
  {"line":1145,"text":"\treturn &argumentOrParameterListInfo{"},
  {"line":1146,"text":"\t\tlist:          list,"},
  {"line":1147,"text":"\t\targumentIndex: argumentIndex,"},
  {"line":1148,"text":"\t\targumentCount: argumentCount,"},
  {"line":1149,"text":"\t\targumentsSpan: argumentsSpan,"},
  {"line":1150,"text":"\t}"},
  {"line":1151,"text":"}"},
  {"line":1153,"text":"func getApplicableSpanForArguments(argumentList *ast.NodeList, node *ast.Node, sourceFile *ast.SourceFile) core.TextRange {"},
  {"line":1162,"text":"\tif argumentList == nil && node != nil {"},
  {"line":1167,"text":"\t\tspanStart := node.End()"},
  {"line":1168,"text":"\t\tspanEnd := scanner.SkipTrivia(sourceFile.Text(), node.End())"},
  {"line":1169,"text":"\t\tspanEnd = ensureMinimumSpanSize(spanStart, spanEnd)"},
  {"line":1170,"text":"\t\treturn core.NewTextRange(spanStart, spanEnd)"},
  {"line":1171,"text":"\t}"},
  {"line":1172,"text":"\tapplicableSpanStart := argumentList.Pos()"},
  {"line":1173,"text":"\tapplicableSpanEnd := scanner.SkipTrivia(sourceFile.Text(), argumentList.End())"},
  {"line":1177,"text":"\tapplicableSpanEnd = ensureMinimumSpanSize(applicableSpanStart, applicableSpanEnd)"},
  {"line":1179,"text":"\treturn core.NewTextRange(applicableSpanStart, applicableSpanEnd)"},
  {"line":1180,"text":"}"},
  {"line":1185,"text":"func ensureMinimumSpanSize(start, end int) int {"},
  {"line":1186,"text":"\tif end <= start {"},
  {"line":1187,"text":"\t\treturn start + 1"},
  {"line":1188,"text":"\t}"},
  {"line":1189,"text":"\treturn end"},
  {"line":1190,"text":"}"},
  {"line":1192,"text":"type argumentOrParameterListAndIndex struct {"},
  {"line":1193,"text":"\tlist          *ast.NodeList"},
  {"line":1194,"text":"\targumentIndex int"},
  {"line":1195,"text":"}"},
  {"line":1197,"text":"func getArgumentOrParameterListAndIndex(node *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *argumentOrParameterListAndIndex {"},
  {"line":1198,"text":"\tif node.Kind == ast.KindLessThanToken || node.Kind == ast.KindOpenParenToken {"},
  {"line":1201,"text":"\t\tlist := getChildListThatStartsWithOpenerToken(node.Parent, node)"},
  {"line":1202,"text":"\t\treturn &argumentOrParameterListAndIndex{"},
  {"line":1203,"text":"\t\t\tlist:          list,"},
  {"line":1204,"text":"\t\t\targumentIndex: 0,"},
  {"line":1205,"text":"\t\t}"},
  {"line":1206,"text":"\t} else {"},
  {"line":1213,"text":"\t\tlist := findContainingList(node, sourceFile)"},
  {"line":1214,"text":"\t\tif list == nil {"},
  {"line":1215,"text":"\t\t\treturn nil"},
  {"line":1216,"text":"\t\t}"},
  {"line":1217,"text":"\t\treturn &argumentOrParameterListAndIndex{"},
  {"line":1218,"text":"\t\t\tlist: list,"},
  {"line":1220,"text":"\t\t\targumentIndex: getArgumentIndex(node, list, sourceFile, c),"},
  {"line":1221,"text":"\t\t}"},
  {"line":1222,"text":"\t}"},
  {"line":1223,"text":"}"},
  {"line":1225,"text":"func getChildListThatStartsWithOpenerToken(parent *ast.Node, openerToken *ast.Node) *ast.NodeList {"},
  {"line":1226,"text":"\tif ast.IsCallExpression(parent) {"},
  {"line":1227,"text":"\t\tparentCallExpression := parent.AsCallExpression()"},
  {"line":1228,"text":"\t\tif openerToken.Kind == ast.KindLessThanToken {"},
  {"line":1229,"text":"\t\t\treturn parentCallExpression.TypeArgumentList()"},
  {"line":1230,"text":"\t\t}"},
  {"line":1231,"text":"\t\treturn parentCallExpression.Arguments"},
  {"line":1232,"text":"\t} else if ast.IsNewExpression(parent) {"},
  {"line":1233,"text":"\t\tparentNewExpression := parent.AsNewExpression()"},
  {"line":1234,"text":"\t\tif openerToken.Kind == ast.KindLessThanToken {"},
  {"line":1235,"text":"\t\t\treturn parentNewExpression.TypeArgumentList()"},
  {"line":1236,"text":"\t\t}"},
  {"line":1237,"text":"\t\treturn parentNewExpression.Arguments"},
  {"line":1238,"text":"\t}"},
  {"line":1239,"text":"\treturn nil"},
  {"line":1240,"text":"}"},
  {"line":1242,"text":"func tryGetParameterInfo(startingToken *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *argumentListInfo {"},
  {"line":1243,"text":"\tnode := getAdjustedNode(startingToken)"},
  {"line":1244,"text":"\tif node == nil {"},
  {"line":1245,"text":"\t\treturn nil"},
  {"line":1246,"text":"\t}"},
  {"line":1247,"text":"\tinfo := getContextualSignatureLocationInfo(node, sourceFile, c)"},
  {"line":1248,"text":"\tif info == nil {"},
  {"line":1249,"text":"\t\treturn nil"},
  {"line":1250,"text":"\t}"},
  {"line":1253,"text":"\tnonNullableContextualType := c.GetNonNullableType(info.contextualType)"},
  {"line":1254,"text":"\tif nonNullableContextualType == nil {"},
  {"line":1255,"text":"\t\treturn nil"},
  {"line":1256,"text":"\t}"},
  {"line":1258,"text":"\tsymbol := nonNullableContextualType.Symbol()"},
  {"line":1259,"text":"\tif symbol == nil {"},
  {"line":1260,"text":"\t\treturn nil"},
  {"line":1261,"text":"\t}"},
  {"line":1263,"text":"\tsignatures := c.GetSignaturesOfType(nonNullableContextualType, checker.SignatureKindCall)"},
  {"line":1264,"text":"\tif len(signatures) == 0 {"},
  {"line":1265,"text":"\t\treturn nil"},
  {"line":1266,"text":"\t}"},
  {"line":1267,"text":"\tsignature := signatures[len(signatures)-1]"},
  {"line":1269,"text":"\tcontextualInvocation := &contextualInvocation{"},
  {"line":1270,"text":"\t\tsignature: signature,"},
  {"line":1271,"text":"\t\tnode:      startingToken,"},
  {"line":1272,"text":"\t\tsymbol:    chooseBetterSymbol(symbol),"},
  {"line":1273,"text":"\t}"},
  {"line":1274,"text":"\treturn &argumentListInfo{"},
  {"line":1275,"text":"\t\tisTypeParameterList: false,"},
  {"line":1276,"text":"\t\tinvocation:          &invocation{contextualInvocation: contextualInvocation},"},
  {"line":1277,"text":"\t\targumentsSpan:       info.argumentsSpan,"},
  {"line":1278,"text":"\t\targumentIndex:       info.argumentIndex,"},
  {"line":1279,"text":"\t\targumentCount:       info.argumentCount,"},
  {"line":1280,"text":"\t}"},
  {"line":1281,"text":"}"},
  {"line":1283,"text":"func chooseBetterSymbol(s *ast.Symbol) *ast.Symbol {"},
  {"line":1284,"text":"\tif s.Name == ast.InternalSymbolNameType {"},
  {"line":1285,"text":"\t\tfor _, d := range s.Declarations {"},
  {"line":1286,"text":"\t\t\tif ast.IsFunctionTypeNode(d) && ast.CanHaveSymbol(d.Parent) {"},
  {"line":1287,"text":"\t\t\t\treturn d.Parent.Symbol()"},
  {"line":1288,"text":"\t\t\t}"},
  {"line":1289,"text":"\t\t}"},
  {"line":1290,"text":"\t}"},
  {"line":1291,"text":"\treturn s"},
  {"line":1292,"text":"}"},
  {"line":1294,"text":"func getContextualSignatureLocationInfo(node *ast.Node, sourceFile *ast.SourceFile, c *checker.Checker) *contextualSignatureLocationInfo {"},
  {"line":1295,"text":"\tparent := node.Parent"},
  {"line":1296,"text":"\tswitch parent.Kind {"},
  {"line":1297,"text":"\tcase ast.KindParenthesizedExpression, ast.KindMethodDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:"},
  {"line":1298,"text":"\t\tinfo := getArgumentOrParameterListInfo(node, sourceFile, c)"},
  {"line":1299,"text":"\t\tif info == nil {"},
  {"line":1300,"text":"\t\t\treturn nil"},
  {"line":1301,"text":"\t\t}"},
  {"line":1302,"text":"\t\targumentIndex := info.argumentIndex"},
  {"line":1303,"text":"\t\targumentCount := info.argumentCount"},
  {"line":1304,"text":"\t\targumentsSpan := info.argumentsSpan"},
  {"line":1306,"text":"\t\tvar contextualType *checker.Type"},
  {"line":1307,"text":"\t\tif ast.IsMethodDeclaration(parent) {"},
  {"line":1308,"text":"\t\t\tcontextualType = c.GetContextualTypeForObjectLiteralElement(parent, checker.ContextFlagsNone)"},
  {"line":1309,"text":"\t\t} else {"},
  {"line":1310,"text":"\t\t\tcontextualType = c.GetContextualType(parent, checker.ContextFlagsNone)"},
  {"line":1311,"text":"\t\t}"},
  {"line":1312,"text":"\t\tif contextualType != nil {"},
  {"line":1313,"text":"\t\t\treturn &contextualSignatureLocationInfo{"},
  {"line":1314,"text":"\t\t\t\tcontextualType: contextualType,"},
  {"line":1315,"text":"\t\t\t\targumentIndex:  argumentIndex,"},
  {"line":1316,"text":"\t\t\t\targumentCount:  argumentCount,"},
  {"line":1317,"text":"\t\t\t\targumentsSpan:  argumentsSpan,"},
  {"line":1318,"text":"\t\t\t}"},
  {"line":1319,"text":"\t\t}"},
  {"line":1320,"text":"\t\treturn nil"},
  {"line":1321,"text":"\tcase ast.KindBinaryExpression:"},
  {"line":1322,"text":"\t\thighestBinary := getHighestBinary(parent.AsBinaryExpression())"},
  {"line":1323,"text":"\t\tcontextualType := c.GetContextualType(highestBinary.AsNode(), checker.ContextFlagsNone)"},
  {"line":1324,"text":"\t\targumentIndex := 0"},
  {"line":1325,"text":"\t\tif node.Kind != ast.KindOpenParenToken {"},
  {"line":1326,"text":"\t\t\targumentIndex = countBinaryExpressionParameters(parent.AsBinaryExpression()) - 1"},
  {"line":1327,"text":"\t\t\targumentCount := countBinaryExpressionParameters(highestBinary)"},
  {"line":1328,"text":"\t\t\tif contextualType != nil {"},
  {"line":1329,"text":"\t\t\t\treturn &contextualSignatureLocationInfo{"},
  {"line":1330,"text":"\t\t\t\t\tcontextualType: contextualType,"},
  {"line":1331,"text":"\t\t\t\t\targumentIndex:  argumentIndex,"},
  {"line":1332,"text":"\t\t\t\t\targumentCount:  argumentCount,"},
  {"line":1333,"text":"\t\t\t\t\targumentsSpan:  core.NewTextRange(parent.Pos(), parent.End()),"},
  {"line":1334,"text":"\t\t\t\t}"},
  {"line":1335,"text":"\t\t\t}"},
  {"line":1336,"text":"\t\t\treturn nil"},
  {"line":1337,"text":"\t\t}"},
  {"line":1338,"text":"\t}"},
  {"line":1339,"text":"\treturn nil"},
  {"line":1340,"text":"}"},
  {"line":1342,"text":"func getHighestBinary(b *ast.BinaryExpression) *ast.BinaryExpression {"},
  {"line":1343,"text":"\tif ast.IsBinaryExpression(b.Parent) {"},
  {"line":1344,"text":"\t\treturn getHighestBinary(b.Parent.AsBinaryExpression())"},
  {"line":1345,"text":"\t}"},
  {"line":1346,"text":"\treturn b"},
  {"line":1347,"text":"}"},
  {"line":1349,"text":"func countBinaryExpressionParameters(b *ast.BinaryExpression) int {"},
  {"line":1350,"text":"\tif ast.IsBinaryExpression(b.Left) {"},
  {"line":1351,"text":"\t\treturn countBinaryExpressionParameters(b.Left.AsBinaryExpression()) + 1"},
  {"line":1352,"text":"\t}"},
  {"line":1353,"text":"\treturn 2"},
  {"line":1354,"text":"}"},
  {"line":1356,"text":"func getTokenFromNodeList(nodeList *ast.NodeList, nodeListParent *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":1357,"text":"\tif nodeList == nil || nodeListParent == nil {"},
  {"line":1358,"text":"\t\treturn nil"},
  {"line":1359,"text":"\t}"},
  {"line":1360,"text":"\tleft := nodeList.Pos()"},
  {"line":1361,"text":"\tnodeListIndex := 0"},
  {"line":1362,"text":"\tvar tokens []*ast.Node"},
  {"line":1363,"text":"\tfor left < nodeList.End() {"},
  {"line":1364,"text":"\t\tif len(nodeList.Nodes) > nodeListIndex && left == nodeList.Nodes[nodeListIndex].Pos() {"},
  {"line":1365,"text":"\t\t\ttokens = append(tokens, nodeList.Nodes[nodeListIndex])"},
  {"line":1366,"text":"\t\t\tleft = nodeList.Nodes[nodeListIndex].End()"},
  {"line":1367,"text":"\t\t\tnodeListIndex++"},
  {"line":1368,"text":"\t\t} else {"},
  {"line":1369,"text":"\t\t\tscanner := scanner.GetScannerForSourceFile(sourceFile, left)"},
  {"line":1370,"text":"\t\t\ttoken := scanner.Token()"},
  {"line":1371,"text":"\t\t\ttokenFullStart := scanner.TokenFullStart()"},
  {"line":1372,"text":"\t\t\ttokenEnd := scanner.TokenEnd()"},
  {"line":1373,"text":"\t\t\ttokens = append(tokens, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, nodeListParent, scanner.TokenFlags()))"},
  {"line":1374,"text":"\t\t\tleft = tokenEnd"},
  {"line":1375,"text":"\t\t}"},
  {"line":1376,"text":"\t}"},
  {"line":1377,"text":"\treturn tokens"},
  {"line":1378,"text":"}"},
  {"line":1380,"text":"func getArgumentListInfoForTemplate(tagExpression *ast.TaggedTemplateExpression, argumentIndex int, sourceFile *ast.SourceFile) *argumentListInfo {"},
  {"line":1382,"text":"\targumentCount := 1"},
  {"line":1383,"text":"\tif !isNoSubstitutionTemplateLiteral(tagExpression.Template) {"},
  {"line":1384,"text":"\t\targumentCount = len(tagExpression.Template.AsTemplateExpression().TemplateSpans.Nodes) + 1"},
  {"line":1385,"text":"\t}"},
  {"line":1386,"text":"\tif argumentIndex != 0 {"},
  {"line":1387,"text":"\t\tdebug.Assert(argumentIndex < argumentCount)"},
  {"line":1388,"text":"\t}"},
  {"line":1389,"text":"\treturn &argumentListInfo{"},
  {"line":1390,"text":"\t\tisTypeParameterList: false,"},
  {"line":1391,"text":"\t\tinvocation:          &invocation{callInvocation: &callInvocation{node: tagExpression.AsNode()}},"},
  {"line":1392,"text":"\t\targumentIndex:       argumentIndex,"},
  {"line":1393,"text":"\t\targumentCount:       argumentCount,"},
  {"line":1394,"text":"\t\targumentsSpan:       getApplicableRangeForTaggedTemplate(tagExpression, sourceFile),"},
  {"line":1395,"text":"\t}"},
  {"line":1396,"text":"}"},
  {"line":1398,"text":"func getApplicableRangeForTaggedTemplate(taggedTemplate *ast.TaggedTemplateExpression, sourceFile *ast.SourceFile) core.TextRange {"},
  {"line":1399,"text":"\ttemplate := taggedTemplate.Template"},
  {"line":1400,"text":"\tapplicableSpanStart := scanner.GetTokenPosOfNode(template, sourceFile, false)"},
  {"line":1401,"text":"\tapplicableSpanEnd := template.End()"},
  {"line":1411,"text":"\tif template.Kind == ast.KindTemplateExpression {"},
  {"line":1412,"text":"\t\ttemplateSpans := template.AsTemplateExpression().TemplateSpans"},
  {"line":1413,"text":"\t\tlastSpan := templateSpans.Nodes[len(templateSpans.Nodes)-1]"},
  {"line":1414,"text":"\t\tif lastSpan.AsTemplateSpan().Literal.End()-lastSpan.AsTemplateSpan().Literal.Pos() == 0 {"},
  {"line":1415,"text":"\t\t\tapplicableSpanEnd = scanner.SkipTrivia(sourceFile.Text(), applicableSpanEnd)"},
  {"line":1416,"text":"\t\t}"},
  {"line":1417,"text":"\t}"},
  {"line":1419,"text":"\treturn core.NewTextRange(applicableSpanStart, applicableSpanEnd-applicableSpanStart)"},
  {"line":1420,"text":"}"},
];

export function findLsSignatureHelpDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsSignatureHelpDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsSignatureHelpDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsSignatureHelpDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsSignatureHelpLineText(line: number): string | undefined {
  return lsSignatureHelpSourceLines.find((entry) => entry.line === line)?.text;
}
