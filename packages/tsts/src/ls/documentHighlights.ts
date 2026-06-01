import {
  Kind,
  findAncestor,
  isAccessorDeclaration,
  isAwaitExpression,
  isBreakOrContinueStatement,
  isCaseClause,
  isClassLikeDeclaration,
  isConstructorDeclaration,
  isDeclaration,
  isDefaultClause,
  isFunctionBlock,
  isFunctionLike,
  isIfStatement,
  isInterfaceDeclaration,
  isIterationStatement,
  isModuleDeclaration,
  isReturnStatement,
  isSwitchStatement,
  isThrowStatement,
  isTryStatement,
  isTypeAliasDeclaration,
  isTypeNode,
  isVariableStatement,
  isYieldExpression,
  modifierToFlag,
  nodeSymbol,
  type Block,
  type BreakOrContinueStatement,
  type IfStatement,
  type Modifier,
  type Node,
  type SourceFile,
  type Statement,
  type SwitchStatement,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { findChildOfKind } from "../astnav/index.js";
import {
  DocumentHighlightKindRead,
  DocumentHighlightKindWrite,
  type DocumentHighlight,
  type Range,
} from "../lsp/lsproto/index.js";

export interface MultiDocumentHighlight {
  readonly uri: string;
  readonly highlights: readonly DocumentHighlight[];
}

export interface ReferenceEntryLike {
  readonly fileName: string;
  readonly node?: Node;
  readonly range?: Range;
  readonly kind?: "range" | "node";
}

export function toDocumentHighlight(entry: ReferenceEntryLike): readonly [string, DocumentHighlight] {
  if (entry.range !== undefined || entry.kind === "range") {
    return [
      entry.fileName,
      { range: entry.range ?? emptyRange(), kind: DocumentHighlightKindRead },
    ];
  }
  const node = entry.node;
  return [
    entry.fileName,
    {
      range: node === undefined ? emptyRange() : createLspRangeFromNode(node, node.getSourceFile()),
      kind: node !== undefined && isWriteAccessForReference(node) ? DocumentHighlightKindWrite : DocumentHighlightKindRead,
    },
  ];
}

export function getSyntacticDocumentHighlights(node: Node, sourceFile: SourceFile): DocumentHighlight[] {
  switch (node.kind) {
    case Kind.IfKeyword:
    case Kind.ElseKeyword: {
      const parent = parentOf(node);
      return parent !== undefined && isIfStatement(parent) ? getIfElseOccurrences(parent, sourceFile) : [];
    }
    case Kind.ReturnKeyword:
      return useParent(parentOf(node), isReturnStatement, getReturnOccurrences, sourceFile);
    case Kind.ThrowKeyword:
      return useParent(parentOf(node), isThrowStatement, getThrowOccurrences, sourceFile);
    case Kind.TryKeyword:
    case Kind.CatchKeyword:
    case Kind.FinallyKeyword: {
      const tryStatement = node.kind === Kind.CatchKeyword ? parentOf(parentOf(node)) : parentOf(node);
      return useParent(tryStatement, isTryStatement, getTryCatchFinallyOccurrences, sourceFile);
    }
    case Kind.SwitchKeyword:
      return useParent(parentOf(node), isSwitchStatement, (candidate, file) => getSwitchCaseDefaultOccurrences(candidate as SwitchStatement, file), sourceFile);
    case Kind.CaseKeyword:
    case Kind.DefaultKeyword: {
      const clause = parentOf(node);
      if (clause !== undefined && (isDefaultClause(clause) || isCaseClause(clause))) {
        return useParent(
          parentOf(parentOf(parentOf(node))),
          isSwitchStatement,
          (candidate, file) => getSwitchCaseDefaultOccurrences(candidate as SwitchStatement, file),
          sourceFile,
        );
      }
      return [];
    }
    case Kind.BreakKeyword:
    case Kind.ContinueKeyword:
      return useParent(
        parentOf(node),
        isBreakOrContinueStatement,
        (candidate, file) => getBreakOrContinueStatementOccurrences(candidate as BreakOrContinueStatement, file),
        sourceFile,
      );
    case Kind.ForKeyword:
    case Kind.WhileKeyword:
    case Kind.DoKeyword:
      return useParent(parentOf(node), (candidate) => isIterationStatement(candidate, true), getLoopBreakContinueOccurrences, sourceFile);
    case Kind.ConstructorKeyword:
      return getFromAllDeclarations(isConstructorDeclaration, [Kind.ConstructorKeyword], node, sourceFile);
    case Kind.GetKeyword:
    case Kind.SetKeyword:
      return getFromAllDeclarations(isAccessorDeclaration, [Kind.GetKeyword, Kind.SetKeyword], node, sourceFile);
    case Kind.AwaitKeyword:
      return useParent(parentOf(node), isAwaitExpression, getAsyncAndAwaitOccurrences, sourceFile);
    case Kind.AsyncKeyword:
      return highlightSpans(getAsyncAndAwaitOccurrences(node, sourceFile), sourceFile);
    case Kind.YieldKeyword:
      return highlightSpans(getYieldOccurrences(node, sourceFile), sourceFile);
    case Kind.InKeyword:
    case Kind.OutKeyword:
      return [];
    default:
      if (isModifierKindLocal(node.kind)) {
        const parent = parentOf(node);
        if (parent !== undefined && (isDeclaration(parent) || isVariableStatement(parent))) {
          return highlightSpans(getModifierOccurrences(node.kind, parent, sourceFile), sourceFile);
        }
      }
      return [];
  }
}

export function useParent(
  node: Node | undefined,
  nodeTest: (node: Node) => boolean,
  getNodes: (node: Node, sourceFile: SourceFile) => readonly Node[],
  sourceFile: SourceFile,
): DocumentHighlight[] {
  return node !== undefined && nodeTest(node) ? highlightSpans(getNodes(node, sourceFile), sourceFile) : [];
}

export function highlightSpans(nodes: readonly (Node | undefined)[], sourceFile: SourceFile): DocumentHighlight[] {
  const highlights: DocumentHighlight[] = [];
  for (const node of nodes) {
    if (node !== undefined) {
      highlights.push({
        range: createLspRangeFromNode(node, sourceFile),
        kind: DocumentHighlightKindRead,
      });
    }
  }
  return highlights;
}

export function getFromAllDeclarations<T extends Node>(
  nodeTest: (node: Node) => node is T,
  keywords: readonly Kind[],
  node: Node,
  sourceFile: SourceFile,
): DocumentHighlight[] {
  return useParent(parentOf(node), nodeTest, (declaration) => {
    const declarations = nodeSymbol(declaration)?.declarations ?? [];
    const symbolDeclarations: Node[] = [];
    for (const candidate of declarations) {
      if (!nodeTest(candidate)) continue;
      for (const child of getChildrenFromNonJSDocNode(candidate, sourceFile)) {
        if (keywords.includes(child.kind)) {
          symbolDeclarations.push(child);
          break;
        }
      }
    }
    return symbolDeclarations;
  }, sourceFile);
}

export function getIfElseOccurrences(ifStatement: IfStatement, sourceFile: SourceFile): DocumentHighlight[] {
  const keywords = getIfElseKeywords(ifStatement, sourceFile);
  const highlights: DocumentHighlight[] = [];
  for (let index = 0; index < keywords.length; index += 1) {
    const keyword = keywords[index]!;
    if (keyword.kind === Kind.ElseKeyword && index < keywords.length - 1) {
      const ifKeyword = keywords[index + 1]!;
      if (ifKeyword.kind === Kind.IfKeyword && onlySingleLineWhitespace(sourceFile.text, keyword.end, ifKeyword.pos)) {
        highlights.push({
          range: createLspRangeFromBounds(skipTrivia(sourceFile.text, keyword.pos), ifKeyword.end, sourceFile),
          kind: DocumentHighlightKindRead,
        });
        index += 1;
        continue;
      }
    }
    highlights.push({
      range: createLspRangeFromNode(keyword, sourceFile),
      kind: DocumentHighlightKindRead,
    });
  }
  return highlights;
}

export function getIfElseKeywords(ifStatement: IfStatement, sourceFile: SourceFile): Node[] {
  let current: IfStatement = ifStatement;
  let parent = parentOf(current);
  while (parent !== undefined && isIfStatement(parent)) {
    if (parent.elseStatement !== current) break;
    current = parent;
    parent = parentOf(current);
  }

  const keywords: Node[] = [];
  for (;;) {
    const children = getChildrenFromNonJSDocNode(current, sourceFile);
    const firstChild = children[0];
    if (firstChild?.kind === Kind.IfKeyword) keywords.push(firstChild);
    for (let index = children.length - 1; index >= 0; index -= 1) {
      if (children[index]!.kind === Kind.ElseKeyword) {
        keywords.push(children[index]!);
        break;
      }
    }
    const elseStatement = current.elseStatement;
    if (elseStatement === undefined || !isIfStatement(elseStatement)) break;
    current = elseStatement;
  }
  return keywords;
}

export function getReturnOccurrences(node: Node, sourceFile: SourceFile): Node[] {
  const functionNode = findAncestor(parentOf(node), isFunctionLike);
  const body = functionNode === undefined ? undefined : nodeBody(functionNode);
  if (body === undefined) return [];

  const keywords: Node[] = [];
  forEachDescendant(body, (candidate) => {
    if (isReturnStatement(candidate)) pushFirstToken(candidate, Kind.ReturnKeyword, sourceFile, keywords);
  }, shouldCrossFunctionBoundary);
  for (const throwStatement of aggregateOwnedThrowStatements(body, sourceFile)) {
    pushFirstToken(throwStatement, Kind.ThrowKeyword, sourceFile, keywords);
  }
  return keywords;
}

export function aggregateOwnedThrowStatements(node: Node, sourceFile: SourceFile): Node[] {
  if (isThrowStatement(node)) return [node];
  if (isTryStatement(node)) {
    const result: Node[] = [];
    if (node.catchClause !== undefined) result.push(...aggregateOwnedThrowStatements(node.catchClause, sourceFile));
    else result.push(...aggregateOwnedThrowStatements(node.tryBlock, sourceFile));
    if (node.finallyBlock !== undefined) result.push(...aggregateOwnedThrowStatements(node.finallyBlock, sourceFile));
    return result;
  }
  if (isFunctionLike(node)) return [];
  return flatMapChildren(node, sourceFile, aggregateOwnedThrowStatements);
}

export function flatMapChildren<T>(
  node: Node,
  sourceFile: SourceFile,
  callback: (child: Node, sourceFile: SourceFile) => readonly T[],
): T[] {
  const result: T[] = [];
  node.forEachChild((child) => {
    result.push(...callback(child, sourceFile));
    return undefined;
  });
  return result;
}

export function getThrowOccurrences(node: Node, sourceFile: SourceFile): Node[] {
  const owner = getThrowStatementOwner(node);
  if (owner === undefined) return [];

  const keywords: Node[] = [];
  for (const throwStatement of aggregateOwnedThrowStatements(owner, sourceFile)) {
    pushFirstToken(throwStatement, Kind.ThrowKeyword, sourceFile, keywords);
  }
  if (isFunctionBlock(owner)) {
    forEachDescendant(owner, (candidate) => {
      if (isReturnStatement(candidate)) pushFirstToken(candidate, Kind.ReturnKeyword, sourceFile, keywords);
    }, shouldCrossFunctionBoundary);
  }
  return keywords;
}

export function getThrowStatementOwner(throwStatement: Node): Node | undefined {
  let child: Node | undefined = throwStatement;
  while (parentOf(child) !== undefined) {
    const parentNode: Node = parentOf(child)!;
    if (isFunctionBlock(parentNode) || parentNode.kind === Kind.SourceFile) return parentNode;
    if (isTryStatement(parentNode) && parentNode.tryBlock === child && parentNode.catchClause !== undefined) return child;
    child = parentNode;
  }
  return undefined;
}

export function getTryCatchFinallyOccurrences(node: Node, sourceFile: SourceFile): Node[] {
  if (!isTryStatement(node)) return [];
  const keywords: Node[] = [];
  pushFirstToken(node, Kind.TryKeyword, sourceFile, keywords);
  if (node.catchClause !== undefined) pushFirstToken(node.catchClause, Kind.CatchKeyword, sourceFile, keywords);
  if (node.finallyBlock !== undefined) pushFirstToken(node, Kind.FinallyKeyword, sourceFile, keywords);
  return keywords;
}

export function getSwitchCaseDefaultOccurrences(node: SwitchStatement, sourceFile: SourceFile): Node[] {
  const keywords: Node[] = [];
  pushFirstToken(node, Kind.SwitchKeyword, sourceFile, keywords);
  for (const clause of node.caseBlock.clauses) {
    pushFirstToken(clause, clause.kind === Kind.CaseClause ? Kind.CaseKeyword : Kind.DefaultKeyword, sourceFile, keywords);
    for (const statement of aggregateAllBreakAndContinueStatements(clause, sourceFile)) {
      if (statement.kind === Kind.BreakStatement && ownsBreakOrContinueStatement(node, statement)) {
        pushFirstToken(statement, Kind.BreakKeyword, sourceFile, keywords);
      }
    }
  }
  return keywords;
}

export function aggregateAllBreakAndContinueStatements(node: Node, sourceFile: SourceFile): Node[] {
  if (isBreakOrContinueStatement(node)) return [node];
  if (isFunctionLike(node)) return [];
  return flatMapChildren(node, sourceFile, aggregateAllBreakAndContinueStatements);
}

export function ownsBreakOrContinueStatement(owner: Node, statement: Node): boolean {
  return getBreakOrContinueOwner(statement) === owner;
}

export function getBreakOrContinueOwner(statement: Node): Node | undefined {
  let current = parentOf(statement);
  while (current !== undefined) {
    switch (current.kind) {
      case Kind.SwitchStatement:
        if (statement.kind === Kind.ContinueStatement) return undefined;
        return isLabeledBreakOrContinueOwnedBy(current, statement) ? current : undefined;
      case Kind.ForStatement:
      case Kind.ForInStatement:
      case Kind.ForOfStatement:
      case Kind.WhileStatement:
      case Kind.DoStatement:
        return isLabeledBreakOrContinueOwnedBy(current, statement) ? current : undefined;
      default:
        if (isFunctionLike(current)) return undefined;
        current = parentOf(current);
    }
  }
  return undefined;
}

export function isLabeledBy(node: Node, labelName: string): boolean {
  let owner = parentOf(node);
  while (owner !== undefined) {
    if (owner.kind !== Kind.LabeledStatement) return false;
    if (nodeNameText(owner) === labelName) return true;
    owner = parentOf(owner);
  }
  return false;
}

export function getBreakOrContinueStatementOccurrences(node: BreakOrContinueStatement, sourceFile: SourceFile): Node[] {
  const owner = getBreakOrContinueOwner(node);
  if (owner === undefined) return [];
  if (isIterationStatement(owner, false)) return getLoopBreakContinueOccurrences(owner, sourceFile);
  if (isSwitchStatement(owner)) return getSwitchCaseDefaultOccurrences(owner, sourceFile);
  return [];
}

export function getLoopBreakContinueOccurrences(node: Node, sourceFile: SourceFile): Node[] {
  const keywords: Node[] = [];
  const firstToken = getFirstTokenOfKind(node, [Kind.ForKeyword, Kind.DoKeyword, Kind.WhileKeyword], sourceFile);
  if (firstToken !== undefined) {
    keywords.push(firstToken);
    if (node.kind === Kind.DoStatement) {
      const loopTokens = getChildrenFromNonJSDocNode(node, sourceFile);
      for (let index = loopTokens.length - 1; index >= 0; index -= 1) {
        if (loopTokens[index]!.kind === Kind.WhileKeyword) {
          keywords.push(loopTokens[index]!);
          break;
        }
      }
    }
  }

  for (const statement of aggregateAllBreakAndContinueStatements(node, sourceFile)) {
    const tokenKind = statement.kind === Kind.BreakStatement ? Kind.BreakKeyword : Kind.ContinueKeyword;
    if (ownsBreakOrContinueStatement(node, statement)) pushFirstToken(statement, tokenKind, sourceFile, keywords);
  }
  return keywords;
}

export function getAsyncAndAwaitOccurrences(node: Node, sourceFile: SourceFile): Node[] {
  const functionNode = getContainingFunction(node);
  if (functionNode === undefined) return [];

  const keywords: Node[] = [];
  for (const modifier of nodeModifiers(functionNode)) {
    if (modifier.kind === Kind.AsyncKeyword) keywords.push(modifier);
  }
  forEachDescendant(functionNode, (child) => {
    if (child !== functionNode && isAwaitExpression(child)) pushFirstToken(child, Kind.AwaitKeyword, sourceFile, keywords);
  }, (child) => child === functionNode || shouldCrossFunctionBoundary(child));
  return keywords;
}

export function getYieldOccurrences(node: Node, sourceFile: SourceFile): Node[] {
  const parentFunction = findAncestor(parentOf(node), isFunctionLike);
  if (parentFunction === undefined) return [];

  const keywords: Node[] = [];
  forEachDescendant(parentFunction, (child) => {
    if (child !== parentFunction && isYieldExpression(child)) pushFirstToken(child, Kind.YieldKeyword, sourceFile, keywords);
  }, (child) => child === parentFunction || shouldCrossFunctionBoundary(child));
  return keywords;
}

export function traverseWithoutCrossingFunction(
  node: Node,
  sourceFile: SourceFile,
  callback: (node: Node, sourceFile: SourceFile) => void,
): void {
  callback(node, sourceFile);
  if (!shouldCrossFunctionBoundary(node)) return;
  node.forEachChild((child) => {
    traverseWithoutCrossingFunction(child, sourceFile, callback);
    return undefined;
  });
}

export function getModifierOccurrences(kind: Kind, node: Node, sourceFile: SourceFile): Node[] {
  const result: Node[] = [];
  for (const candidate of getNodesToSearchForModifier(node, modifierToFlag(kind))) {
    const modifier = findModifier(candidate, kind);
    if (modifier !== undefined) result.push(modifier);
  }
  return result;
}

export function getNodesToSearchForModifier(declaration: Node, modifierFlag: ModifierFlags): Node[] {
  const container = parentOf(declaration);
  if (container === undefined) return [];

  switch (container.kind) {
    case Kind.ModuleBlock:
    case Kind.SourceFile:
    case Kind.Block:
    case Kind.CaseClause:
    case Kind.DefaultClause:
      if ((modifierFlag & ModifierFlags.Abstract) !== 0 && declaration.kind === Kind.ClassDeclaration) {
        return [...nodeMembers(declaration), declaration];
      }
      return nodeStatements(container);
    case Kind.Constructor:
    case Kind.MethodDeclaration:
    case Kind.FunctionDeclaration: {
      const result = [...nodeParameters(container)];
      const containerParent = parentOf(container);
      if (containerParent !== undefined && isClassLikeDeclaration(containerParent)) result.push(...nodeMembers(containerParent));
      return result;
    }
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
    case Kind.TypeLiteral: {
      const members = nodeMembers(container);
      if ((modifierFlag & (ModifierFlags.AccessibilityModifier | ModifierFlags.Readonly)) !== 0) {
        const constructor = members.find(isConstructorDeclaration);
        return constructor === undefined ? members : [...members, ...nodeParameters(constructor)];
      }
      if ((modifierFlag & ModifierFlags.Abstract) !== 0) return [...members, container];
      return members;
    }
    default:
      return [];
  }
}

export function findModifier(node: Node, kind: Kind): Node | undefined {
  return nodeModifiers(node).find((modifier) => modifier.kind === kind);
}

function getChildrenFromNonJSDocNode(node: Node, _sourceFile: SourceFile): Node[] {
  const childNodes: Node[] = [];
  node.forEachChild((child) => {
    childNodes.push(child);
    return undefined;
  }, (children) => {
    childNodes.push(...children);
    return undefined;
  });
  return childNodes.sort((left, right) => left.pos - right.pos);
}

function createLspRangeFromNode(node: Node, sourceFile: SourceFile): Range {
  return createLspRangeFromBounds(node.pos, node.end, sourceFile);
}

function createLspRangeFromBounds(start: number, end: number, sourceFile: SourceFile): Range {
  return {
    start: positionToLineAndCharacter(sourceFile, start),
    end: positionToLineAndCharacter(sourceFile, end),
  };
}

function positionToLineAndCharacter(sourceFile: SourceFile, position: number): Range["start"] {
  const lineStarts = sourceFileTextLineStarts(sourceFile.text);
  let line = 0;
  for (let index = 0; index < lineStarts.length; index += 1) {
    if (lineStarts[index]! <= position) line = index;
    else break;
  }
  return { line, character: position - lineStarts[line]! };
}

function sourceFileTextLineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13) {
      if (text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    } else if (ch === 10) {
      starts.push(index + 1);
    }
  }
  return starts;
}

function emptyRange(): Range {
  const position = { line: 0, character: 0 };
  return { start: position, end: position };
}

function pushFirstToken(node: Node, kind: Kind, sourceFile: SourceFile, output: Node[]): void {
  const token = findChildOfKind(node, kind, sourceFile);
  if (token !== undefined) output.push(token);
}

function getFirstTokenOfKind(node: Node, kinds: readonly Kind[], sourceFile: SourceFile): Node | undefined {
  for (const kind of kinds) {
    const token = findChildOfKind(node, kind, sourceFile);
    if (token !== undefined) return token;
  }
  return undefined;
}

function skipTrivia(text: string, start: number): number {
  let index = start;
  while (index < text.length) {
    const ch = text[index];
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n" || ch === "\v" || ch === "\f") {
      index += 1;
      continue;
    }
    if (ch === "/" && text[index + 1] === "/") {
      index += 2;
      while (index < text.length && text[index] !== "\n" && text[index] !== "\r") index += 1;
      continue;
    }
    if (ch === "/" && text[index + 1] === "*") {
      index += 2;
      while (index + 1 < text.length && !(text[index] === "*" && text[index + 1] === "/")) index += 1;
      index = Math.min(index + 2, text.length);
      continue;
    }
    break;
  }
  return index;
}

function onlySingleLineWhitespace(text: string, start: number, end: number): boolean {
  for (let index = start; index < end; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 10 || ch === 13) return false;
    if (ch !== 9 && ch !== 11 && ch !== 12 && ch !== 32) return false;
  }
  return true;
}

function parentOf(node: Node | undefined): Node | undefined {
  return node?.parent;
}

function nodeBody(node: Node): Node | undefined {
  return (node as { readonly body?: Node }).body;
}

function nodeStatements(node: Node): Node[] {
  return [...((node as { readonly statements?: readonly Statement[] }).statements ?? [])];
}

function nodeMembers(node: Node): Node[] {
  return [...((node as { readonly members?: readonly Node[] }).members ?? [])];
}

function nodeParameters(node: Node): Node[] {
  return [...((node as { readonly parameters?: readonly Node[] }).parameters ?? [])];
}

function nodeModifiers(node: Node): readonly Modifier[] {
  return (node as { readonly modifiers?: readonly Modifier[] }).modifiers ?? [];
}

function nodeNameText(node: Node): string {
  const name = (node as { readonly label?: Node; readonly name?: Node }).label ?? (node as { readonly name?: Node }).name;
  return name !== undefined && "text" in name && typeof name.text === "string" ? name.text : "";
}

function getContainingFunction(node: Node): Node | undefined {
  return findAncestor(node, isFunctionLike);
}

function forEachDescendant(
  node: Node,
  callback: (node: Node) => void,
  shouldDescend: (node: Node) => boolean = () => true,
): void {
  callback(node);
  if (!shouldDescend(node)) return;
  node.forEachChild((child) => {
    forEachDescendant(child, callback, shouldDescend);
    return undefined;
  });
}

function shouldCrossFunctionBoundary(node: Node): boolean {
  return !isFunctionLike(node)
    && !isClassLikeDeclaration(node)
    && !isInterfaceDeclaration(node)
    && !isModuleDeclaration(node)
    && !isTypeAliasDeclaration(node)
    && !isTypeNode(node);
}

function isLabeledBreakOrContinueOwnedBy(owner: Node, statement: Node): boolean {
  const label = (statement as { readonly label?: Node }).label;
  return label === undefined || isLabeledBy(owner, nodeNameText(label));
}

function isWriteAccessForReference(node: Node): boolean {
  return parentOf(node)?.kind === Kind.BinaryExpression;
}

function isModifierKindLocal(kind: Kind): boolean {
  return modifierToFlag(kind) !== ModifierFlags.None;
}

// Language-service parity map: internal/ls/documenthighlights.go
/**
 * Language-service parity map for TS-Go `ls/documenthighlights.go`.
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

export const lsDocumentHighlightsUpstreamPath = "ls/documenthighlights.go";

export const lsDocumentHighlightsDeclarations: readonly UpstreamDeclaration[] = [
  {"line":18,"kind":"func","name":"ProvideDocumentHighlights","receiver":"l *LanguageService"},
  {"line":35,"kind":"func","name":"ProvideMultiDocumentHighlights","receiver":"l *LanguageService"},
  {"line":39,"kind":"func","name":"provideDocumentHighlightsWorker","receiver":"l *LanguageService"},
  {"line":102,"kind":"func","name":"getSemanticDocumentHighlights","receiver":"l *LanguageService"},
  {"line":130,"kind":"func","name":"toDocumentHighlight","receiver":"l *LanguageService"},
  {"line":154,"kind":"func","name":"getSyntacticDocumentHighlights","receiver":"l *LanguageService"},
  {"line":206,"kind":"func","name":"useParent","receiver":"l *LanguageService"},
  {"line":213,"kind":"func","name":"highlightSpans","receiver":"l *LanguageService"},
  {"line":230,"kind":"func","name":"getFromAllDeclarations","receiver":"l *LanguageService"},
  {"line":254,"kind":"func","name":"getIfElseOccurrences","receiver":"l *LanguageService"},
  {"line":296,"kind":"func","name":"getIfElseKeywords"},
  {"line":339,"kind":"func","name":"getReturnOccurrences"},
  {"line":368,"kind":"func","name":"aggregateOwnedThrowStatements"},
  {"line":410,"kind":"func","name":"getThrowOccurrences"},
  {"line":445,"kind":"func","name":"getThrowStatementOwner"},
  {"line":468,"kind":"func","name":"getTryCatchFinallyOccurrences"},
  {"line":492,"kind":"func","name":"getSwitchCaseDefaultOccurrences"},
  {"line":519,"kind":"func","name":"aggregateAllBreakAndContinueStatements"},
  {"line":529,"kind":"func","name":"ownsBreakOrContinueStatement"},
  {"line":537,"kind":"func","name":"getBreakOrContinueOwner"},
  {"line":567,"kind":"func","name":"isLabeledBy"},
  {"line":579,"kind":"func","name":"getBreakOrContinueStatementOccurrences"},
  {"line":591,"kind":"func","name":"getLoopBreakContinueOccurrences"},
  {"line":619,"kind":"func","name":"getAsyncAndAwaitOccurrences"},
  {"line":648,"kind":"func","name":"getYieldOccurrences"},
  {"line":671,"kind":"func","name":"traverseWithoutCrossingFunction"},
  {"line":681,"kind":"func","name":"getModifierOccurrences"},
  {"line":694,"kind":"func","name":"getNodesToSearchForModifier"},
  {"line":745,"kind":"func","name":"findModifier"},
];

export const lsDocumentHighlightsSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":16,"text":")"},
  {"line":18,"text":"func (l *LanguageService) ProvideDocumentHighlights(ctx context.Context, documentUri lsproto.DocumentUri, documentPosition lsproto.Position) (lsproto.DocumentHighlightResponse, error) {"},
  {"line":19,"text":"\tresult, err := l.provideDocumentHighlightsWorker(ctx, documentUri, documentPosition, nil)"},
  {"line":20,"text":"\tif err != nil {"},
  {"line":21,"text":"\t\treturn lsproto.DocumentHighlightsOrNull{}, err"},
  {"line":22,"text":"\t}"},
  {"line":24,"text":"\tvar documentHighlights []*lsproto.DocumentHighlight"},
  {"line":25,"text":"\tif result.MultiDocumentHighlights != nil {"},
  {"line":26,"text":"\t\tfor _, mh := range *result.MultiDocumentHighlights {"},
  {"line":27,"text":"\t\t\tif mh.Uri == documentUri {"},
  {"line":28,"text":"\t\t\t\tdocumentHighlights = append(documentHighlights, mh.Highlights...)"},
  {"line":29,"text":"\t\t\t}"},
  {"line":30,"text":"\t\t}"},
  {"line":31,"text":"\t}"},
  {"line":32,"text":"\treturn lsproto.DocumentHighlightsOrNull{DocumentHighlights: &documentHighlights}, nil"},
  {"line":33,"text":"}"},
  {"line":35,"text":"func (l *LanguageService) ProvideMultiDocumentHighlights(ctx context.Context, documentUri lsproto.DocumentUri, documentPosition lsproto.Position, filesToSearch []lsproto.DocumentUri) (lsproto.CustomMultiDocumentHighlightResponse, error) {"},
  {"line":36,"text":"\treturn l.provideDocumentHighlightsWorker(ctx, documentUri, documentPosition, filesToSearch)"},
  {"line":37,"text":"}"},
  {"line":39,"text":"func (l *LanguageService) provideDocumentHighlightsWorker(ctx context.Context, documentUri lsproto.DocumentUri, documentPosition lsproto.Position, filesToSearch []lsproto.DocumentUri) (lsproto.MultiDocumentHighlightsOrNull, error) {"},
  {"line":40,"text":"\tprogram, sourceFile := l.getProgramAndFile(documentUri)"},
  {"line":41,"text":"\tposition := int(l.converters.LineAndCharacterToPosition(sourceFile, documentPosition))"},
  {"line":42,"text":"\tnode := astnav.GetTouchingPropertyName(sourceFile, position)"},
  {"line":45,"text":"\tif node.Parent != nil && (node.Parent.Kind == ast.KindJsxClosingElement || (node.Parent.Kind == ast.KindJsxOpeningElement && node.Parent.TagName() == node)) {"},
  {"line":46,"text":"\t\tvar openingElement, closingElement *ast.Node"},
  {"line":47,"text":"\t\tif ast.IsJsxElement(node.Parent.Parent) {"},
  {"line":48,"text":"\t\t\topeningElement = node.Parent.Parent.AsJsxElement().OpeningElement"},
  {"line":49,"text":"\t\t\tclosingElement = node.Parent.Parent.AsJsxElement().ClosingElement"},
  {"line":50,"text":"\t\t}"},
  {"line":51,"text":"\t\tvar highlights []*lsproto.DocumentHighlight"},
  {"line":52,"text":"\t\tkind := lsproto.DocumentHighlightKindRead"},
  {"line":53,"text":"\t\tif openingElement != nil {"},
  {"line":54,"text":"\t\t\thighlights = append(highlights, &lsproto.DocumentHighlight{"},
  {"line":55,"text":"\t\t\t\tRange: l.createLspRangeFromNode(openingElement, sourceFile),"},
  {"line":56,"text":"\t\t\t\tKind:  &kind,"},
  {"line":57,"text":"\t\t\t})"},
  {"line":58,"text":"\t\t}"},
  {"line":59,"text":"\t\tif closingElement != nil {"},
  {"line":60,"text":"\t\t\thighlights = append(highlights, &lsproto.DocumentHighlight{"},
  {"line":61,"text":"\t\t\t\tRange: l.createLspRangeFromNode(closingElement, sourceFile),"},
  {"line":62,"text":"\t\t\t\tKind:  &kind,"},
  {"line":63,"text":"\t\t\t})"},
  {"line":64,"text":"\t\t}"},
  {"line":65,"text":"\t\tmultiHighlights := []*lsproto.MultiDocumentHighlight{"},
  {"line":66,"text":"\t\t\t{Uri: documentUri, Highlights: highlights},"},
  {"line":67,"text":"\t\t}"},
  {"line":68,"text":"\t\treturn lsproto.MultiDocumentHighlightsOrNull{"},
  {"line":69,"text":"\t\t\tMultiDocumentHighlights: &multiHighlights,"},
  {"line":70,"text":"\t\t}, nil"},
  {"line":71,"text":"\t}"},
  {"line":74,"text":"\tvar sourceFiles []*ast.SourceFile"},
  {"line":75,"text":"\tseenFiles := collections.NewSetWithSizeHint[string](len(filesToSearch))"},
  {"line":76,"text":"\tfor _, uri := range filesToSearch {"},
  {"line":77,"text":"\t\tfileName := uri.FileName()"},
  {"line":78,"text":"\t\tif !seenFiles.AddIfAbsent(fileName) {"},
  {"line":79,"text":"\t\t\tcontinue"},
  {"line":80,"text":"\t\t}"},
  {"line":81,"text":"\t\tif sf := program.GetSourceFile(fileName); sf != nil {"},
  {"line":82,"text":"\t\t\tsourceFiles = append(sourceFiles, sf)"},
  {"line":83,"text":"\t\t}"},
  {"line":84,"text":"\t}"},
  {"line":85,"text":"\tif len(sourceFiles) == 0 {"},
  {"line":86,"text":"\t\tsourceFiles = []*ast.SourceFile{sourceFile}"},
  {"line":87,"text":"\t}"},
  {"line":89,"text":"\tmultiHighlights := l.getSemanticDocumentHighlights(ctx, position, node, program, sourceFiles)"},
  {"line":90,"text":"\tif len(multiHighlights) == 0 {"},
  {"line":92,"text":"\t\tsyntacticHighlights := l.getSyntacticDocumentHighlights(node, sourceFile)"},
  {"line":93,"text":"\t\tif len(syntacticHighlights) > 0 {"},
  {"line":94,"text":"\t\t\tmultiHighlights = []*lsproto.MultiDocumentHighlight{"},
  {"line":95,"text":"\t\t\t\t{Uri: documentUri, Highlights: syntacticHighlights},"},
  {"line":96,"text":"\t\t\t}"},
  {"line":97,"text":"\t\t}"},
  {"line":98,"text":"\t}"},
  {"line":99,"text":"\treturn lsproto.MultiDocumentHighlightsOrNull{MultiDocumentHighlights: &multiHighlights}, nil"},
  {"line":100,"text":"}"},
  {"line":102,"text":"func (l *LanguageService) getSemanticDocumentHighlights(ctx context.Context, position int, node *ast.Node, program *compiler.Program, sourceFiles []*ast.SourceFile) []*lsproto.MultiDocumentHighlight {"},
  {"line":103,"text":"\toptions := refOptions{use: referenceUseNone}"},
  {"line":104,"text":"\treferenceEntries := l.getReferencedSymbolsForNode(ctx, position, node, program, sourceFiles, options)"},
  {"line":105,"text":"\tif referenceEntries == nil {"},
  {"line":106,"text":"\t\treturn nil"},
  {"line":107,"text":"\t}"},
  {"line":110,"text":"\tfileHighlights := make(map[string][]*lsproto.DocumentHighlight)"},
  {"line":111,"text":"\tfor _, entry := range referenceEntries {"},
  {"line":112,"text":"\t\tfor _, ref := range entry.references {"},
  {"line":113,"text":"\t\t\tfileName, highlight := l.toDocumentHighlight(ref)"},
  {"line":114,"text":"\t\t\tfileHighlights[fileName] = append(fileHighlights[fileName], highlight)"},
  {"line":115,"text":"\t\t}"},
  {"line":116,"text":"\t}"},
  {"line":118,"text":"\tvar result []*lsproto.MultiDocumentHighlight"},
  {"line":119,"text":"\tfor _, sf := range sourceFiles {"},
  {"line":120,"text":"\t\tif highlights, ok := fileHighlights[sf.FileName()]; ok {"},
  {"line":121,"text":"\t\t\tresult = append(result, &lsproto.MultiDocumentHighlight{"},
  {"line":122,"text":"\t\t\t\tUri:        lsconv.FileNameToDocumentURI(sf.FileName()),"},
  {"line":123,"text":"\t\t\t\tHighlights: highlights,"},
  {"line":124,"text":"\t\t\t})"},
  {"line":125,"text":"\t\t}"},
  {"line":126,"text":"\t}"},
  {"line":127,"text":"\treturn result"},
  {"line":128,"text":"}"},
  {"line":130,"text":"func (l *LanguageService) toDocumentHighlight(entry *ReferenceEntry) (string, *lsproto.DocumentHighlight) {"},
  {"line":131,"text":"\tentry = l.resolveEntry(entry)"},
  {"line":133,"text":"\tkind := lsproto.DocumentHighlightKindRead"},
  {"line":134,"text":"\tif entry.kind == entryKindRange {"},
  {"line":135,"text":"\t\treturn entry.fileName, &lsproto.DocumentHighlight{"},
  {"line":136,"text":"\t\t\tRange: l.getRangeOfEntry(entry),"},
  {"line":137,"text":"\t\t\tKind:  &kind,"},
  {"line":138,"text":"\t\t}"},
  {"line":139,"text":"\t}"},
  {"line":142,"text":"\tif ast.IsWriteAccessForReference(entry.node) {"},
  {"line":143,"text":"\t\tkind = lsproto.DocumentHighlightKindWrite"},
  {"line":144,"text":"\t}"},
  {"line":146,"text":"\tdh := &lsproto.DocumentHighlight{"},
  {"line":147,"text":"\t\tRange: l.getRangeOfEntry(entry),"},
  {"line":148,"text":"\t\tKind:  &kind,"},
  {"line":149,"text":"\t}"},
  {"line":151,"text":"\treturn entry.fileName, dh"},
  {"line":152,"text":"}"},
  {"line":154,"text":"func (l *LanguageService) getSyntacticDocumentHighlights(node *ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {"},
  {"line":155,"text":"\tswitch node.Kind {"},
  {"line":156,"text":"\tcase ast.KindIfKeyword, ast.KindElseKeyword:"},
  {"line":157,"text":"\t\tif ast.IsIfStatement(node.Parent) {"},
  {"line":158,"text":"\t\t\treturn l.getIfElseOccurrences(node.Parent.AsIfStatement(), sourceFile)"},
  {"line":159,"text":"\t\t}"},
  {"line":160,"text":"\t\treturn nil"},
  {"line":161,"text":"\tcase ast.KindReturnKeyword:"},
  {"line":162,"text":"\t\treturn l.useParent(node.Parent, ast.IsReturnStatement, getReturnOccurrences, sourceFile)"},
  {"line":163,"text":"\tcase ast.KindThrowKeyword:"},
  {"line":164,"text":"\t\treturn l.useParent(node.Parent, ast.IsThrowStatement, getThrowOccurrences, sourceFile)"},
  {"line":165,"text":"\tcase ast.KindTryKeyword, ast.KindCatchKeyword, ast.KindFinallyKeyword:"},
  {"line":166,"text":"\t\tvar tryStatement *ast.Node"},
  {"line":167,"text":"\t\tif node.Kind == ast.KindCatchKeyword {"},
  {"line":168,"text":"\t\t\ttryStatement = node.Parent.Parent"},
  {"line":169,"text":"\t\t} else {"},
  {"line":170,"text":"\t\t\ttryStatement = node.Parent"},
  {"line":171,"text":"\t\t}"},
  {"line":172,"text":"\t\treturn l.useParent(tryStatement, ast.IsTryStatement, getTryCatchFinallyOccurrences, sourceFile)"},
  {"line":173,"text":"\tcase ast.KindSwitchKeyword:"},
  {"line":174,"text":"\t\treturn l.useParent(node.Parent, ast.IsSwitchStatement, getSwitchCaseDefaultOccurrences, sourceFile)"},
  {"line":175,"text":"\tcase ast.KindCaseKeyword, ast.KindDefaultKeyword:"},
  {"line":176,"text":"\t\tif ast.IsDefaultClause(node.Parent) || ast.IsCaseClause(node.Parent) {"},
  {"line":177,"text":"\t\t\treturn l.useParent(node.Parent.Parent.Parent, ast.IsSwitchStatement, getSwitchCaseDefaultOccurrences, sourceFile)"},
  {"line":178,"text":"\t\t}"},
  {"line":179,"text":"\t\treturn nil"},
  {"line":180,"text":"\tcase ast.KindBreakKeyword, ast.KindContinueKeyword:"},
  {"line":181,"text":"\t\treturn l.useParent(node.Parent, ast.IsBreakOrContinueStatement, getBreakOrContinueStatementOccurrences, sourceFile)"},
  {"line":182,"text":"\tcase ast.KindForKeyword, ast.KindWhileKeyword, ast.KindDoKeyword:"},
  {"line":183,"text":"\t\treturn l.useParent(node.Parent, func(n *ast.Node) bool {"},
  {"line":184,"text":"\t\t\treturn ast.IsIterationStatement(n, true)"},
  {"line":185,"text":"\t\t}, getLoopBreakContinueOccurrences, sourceFile)"},
  {"line":186,"text":"\tcase ast.KindConstructorKeyword:"},
  {"line":187,"text":"\t\treturn l.getFromAllDeclarations(ast.IsConstructorDeclaration, []ast.Kind{ast.KindConstructorKeyword}, node, sourceFile)"},
  {"line":188,"text":"\tcase ast.KindGetKeyword, ast.KindSetKeyword:"},
  {"line":189,"text":"\t\treturn l.getFromAllDeclarations(ast.IsAccessor, []ast.Kind{ast.KindGetKeyword, ast.KindSetKeyword}, node, sourceFile)"},
  {"line":190,"text":"\tcase ast.KindAwaitKeyword:"},
  {"line":191,"text":"\t\treturn l.useParent(node.Parent, ast.IsAwaitExpression, getAsyncAndAwaitOccurrences, sourceFile)"},
  {"line":192,"text":"\tcase ast.KindAsyncKeyword:"},
  {"line":193,"text":"\t\treturn l.highlightSpans(getAsyncAndAwaitOccurrences(node, sourceFile), sourceFile)"},
  {"line":194,"text":"\tcase ast.KindYieldKeyword:"},
  {"line":195,"text":"\t\treturn l.highlightSpans(getYieldOccurrences(node, sourceFile), sourceFile)"},
  {"line":196,"text":"\tcase ast.KindInKeyword, ast.KindOutKeyword:"},
  {"line":197,"text":"\t\treturn nil"},
  {"line":198,"text":"\tdefault:"},
  {"line":199,"text":"\t\tif ast.IsModifierKind(node.Kind) && (ast.IsDeclaration(node.Parent) || ast.IsVariableStatement(node.Parent)) {"},
  {"line":200,"text":"\t\t\treturn l.highlightSpans(getModifierOccurrences(node.Kind, node.Parent, sourceFile), sourceFile)"},
  {"line":201,"text":"\t\t}"},
  {"line":202,"text":"\t\treturn nil"},
  {"line":203,"text":"\t}"},
  {"line":204,"text":"}"},
  {"line":206,"text":"func (l *LanguageService) useParent(node *ast.Node, nodeTest func(*ast.Node) bool, getNodes func(*ast.Node, *ast.SourceFile) []*ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {"},
  {"line":207,"text":"\tif nodeTest(node) {"},
  {"line":208,"text":"\t\treturn l.highlightSpans(getNodes(node, sourceFile), sourceFile)"},
  {"line":209,"text":"\t}"},
  {"line":210,"text":"\treturn nil"},
  {"line":211,"text":"}"},
  {"line":213,"text":"func (l *LanguageService) highlightSpans(nodes []*ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {"},
  {"line":214,"text":"\tif len(nodes) == 0 {"},
  {"line":215,"text":"\t\treturn nil"},
  {"line":216,"text":"\t}"},
  {"line":217,"text":"\tvar highlights []*lsproto.DocumentHighlight"},
  {"line":218,"text":"\tkind := lsproto.DocumentHighlightKindRead"},
  {"line":219,"text":"\tfor _, node := range nodes {"},
  {"line":220,"text":"\t\tif node != nil {"},
  {"line":221,"text":"\t\t\thighlights = append(highlights, &lsproto.DocumentHighlight{"},
  {"line":222,"text":"\t\t\t\tRange: l.createLspRangeFromNode(node, sourceFile),"},
  {"line":223,"text":"\t\t\t\tKind:  &kind,"},
  {"line":224,"text":"\t\t\t})"},
  {"line":225,"text":"\t\t}"},
  {"line":226,"text":"\t}"},
  {"line":227,"text":"\treturn highlights"},
  {"line":228,"text":"}"},
  {"line":230,"text":"func (l *LanguageService) getFromAllDeclarations(nodeTest func(*ast.Node) bool, keywords []ast.Kind, node *ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {"},
  {"line":231,"text":"\treturn l.useParent(node.Parent, nodeTest, func(decl *ast.Node, sf *ast.SourceFile) []*ast.Node {"},
  {"line":232,"text":"\t\tvar symbolDecls []*ast.Node"},
  {"line":233,"text":"\t\tif ast.CanHaveSymbol(decl) {"},
  {"line":234,"text":"\t\t\tif symbol := decl.Symbol(); symbol != nil {"},
  {"line":235,"text":"\t\t\t\tfor _, d := range symbol.Declarations {"},
  {"line":236,"text":"\t\t\t\t\tif nodeTest(d) {"},
  {"line":237,"text":"\t\t\t\t\touter:"},
  {"line":238,"text":"\t\t\t\t\t\tfor _, c := range getChildrenFromNonJSDocNode(d, sourceFile) {"},
  {"line":239,"text":"\t\t\t\t\t\t\tfor _, k := range keywords {"},
  {"line":240,"text":"\t\t\t\t\t\t\t\tif c.Kind == k {"},
  {"line":241,"text":"\t\t\t\t\t\t\t\t\tsymbolDecls = append(symbolDecls, c)"},
  {"line":242,"text":"\t\t\t\t\t\t\t\t\tbreak outer"},
  {"line":243,"text":"\t\t\t\t\t\t\t\t}"},
  {"line":244,"text":"\t\t\t\t\t\t\t}"},
  {"line":245,"text":"\t\t\t\t\t\t}"},
  {"line":246,"text":"\t\t\t\t\t}"},
  {"line":247,"text":"\t\t\t\t}"},
  {"line":248,"text":"\t\t\t}"},
  {"line":249,"text":"\t\t}"},
  {"line":250,"text":"\t\treturn symbolDecls"},
  {"line":251,"text":"\t}, sourceFile)"},
  {"line":252,"text":"}"},
  {"line":254,"text":"func (l *LanguageService) getIfElseOccurrences(ifStatement *ast.IfStatement, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {"},
  {"line":255,"text":"\tkeywords := getIfElseKeywords(ifStatement, sourceFile)"},
  {"line":256,"text":"\tkind := lsproto.DocumentHighlightKindRead"},
  {"line":257,"text":"\tvar highlights []*lsproto.DocumentHighlight"},
  {"line":261,"text":"\tfor i := 0; i < len(keywords); i++ {"},
  {"line":262,"text":"\t\tif keywords[i].Kind == ast.KindElseKeyword && i < len(keywords)-1 {"},
  {"line":263,"text":"\t\t\telseKeyword := keywords[i]"},
  {"line":264,"text":"\t\t\tifKeyword := keywords[i+1] // this *should* always be an 'if' keyword."},
  {"line":265,"text":"\t\t\tshouldCombine := true"},
  {"line":268,"text":"\t\t\tifTokenStart := scanner.GetTokenPosOfNode(ifKeyword, sourceFile, false)"},
  {"line":269,"text":"\t\t\tif ifTokenStart < 0 {"},
  {"line":270,"text":"\t\t\t\tifTokenStart = ifKeyword.Pos()"},
  {"line":271,"text":"\t\t\t}"},
  {"line":272,"text":"\t\t\tfor j := ifTokenStart - 1; j >= elseKeyword.End(); j-- {"},
  {"line":273,"text":"\t\t\t\tif !stringutil.IsWhiteSpaceSingleLine(rune(sourceFile.Text()[j])) {"},
  {"line":274,"text":"\t\t\t\t\tshouldCombine = false"},
  {"line":275,"text":"\t\t\t\t\tbreak"},
  {"line":276,"text":"\t\t\t\t}"},
  {"line":277,"text":"\t\t\t}"},
  {"line":278,"text":"\t\t\tif shouldCombine {"},
  {"line":279,"text":"\t\t\t\thighlights = append(highlights, &lsproto.DocumentHighlight{"},
  {"line":280,"text":"\t\t\t\t\tRange: l.createLspRangeFromBounds(scanner.SkipTrivia(sourceFile.Text(), elseKeyword.Pos()), ifKeyword.End(), sourceFile),"},
  {"line":281,"text":"\t\t\t\t\tKind:  &kind,"},
  {"line":282,"text":"\t\t\t\t})"},
  {"line":283,"text":"\t\t\t\ti++ // skip the next keyword"},
  {"line":284,"text":"\t\t\t\tcontinue"},
  {"line":285,"text":"\t\t\t}"},
  {"line":286,"text":"\t\t}"},
  {"line":288,"text":"\t\thighlights = append(highlights, &lsproto.DocumentHighlight{"},
  {"line":289,"text":"\t\t\tRange: l.createLspRangeFromNode(keywords[i], sourceFile),"},
  {"line":290,"text":"\t\t\tKind:  &kind,"},
  {"line":291,"text":"\t\t})"},
  {"line":292,"text":"\t}"},
  {"line":293,"text":"\treturn highlights"},
  {"line":294,"text":"}"},
  {"line":296,"text":"func getIfElseKeywords(ifStatement *ast.IfStatement, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":305,"text":"\tfor ast.IsIfStatement(ifStatement.Parent) {"},
  {"line":307,"text":"\t\tparentingIf := ifStatement.Parent.AsIfStatement()"},
  {"line":308,"text":"\t\telseStatement := parentingIf.ElseStatement"},
  {"line":309,"text":"\t\tif elseStatement != ifStatement.AsNode() {"},
  {"line":310,"text":"\t\t\tbreak"},
  {"line":311,"text":"\t\t}"},
  {"line":312,"text":"\t\tifStatement = parentingIf"},
  {"line":313,"text":"\t}"},
  {"line":315,"text":"\tvar keywords []*ast.Node"},
  {"line":318,"text":"\tfor {"},
  {"line":319,"text":"\t\tchildren := getChildrenFromNonJSDocNode(ifStatement.AsNode(), sourceFile)"},
  {"line":320,"text":"\t\tif len(children) > 0 && children[0].Kind == ast.KindIfKeyword {"},
  {"line":321,"text":"\t\t\tkeywords = append(keywords, children[0])"},
  {"line":322,"text":"\t\t}"},
  {"line":324,"text":"\t\tfor i := len(children) - 1; i >= 0; i-- {"},
  {"line":325,"text":"\t\t\tif children[i].Kind == ast.KindElseKeyword {"},
  {"line":326,"text":"\t\t\t\tkeywords = append(keywords, children[i])"},
  {"line":327,"text":"\t\t\t\tbreak"},
  {"line":328,"text":"\t\t\t}"},
  {"line":329,"text":"\t\t}"},
  {"line":330,"text":"\t\telseStatement := ifStatement.ElseStatement"},
  {"line":331,"text":"\t\tif elseStatement == nil || !ast.IsIfStatement(elseStatement) {"},
  {"line":332,"text":"\t\t\tbreak"},
  {"line":333,"text":"\t\t}"},
  {"line":334,"text":"\t\tifStatement = elseStatement.AsIfStatement()"},
  {"line":335,"text":"\t}"},
  {"line":336,"text":"\treturn keywords"},
  {"line":337,"text":"}"},
  {"line":339,"text":"func getReturnOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":340,"text":"\tfuncNode := ast.FindAncestor(node.Parent, ast.IsFunctionLike)"},
  {"line":341,"text":"\tif funcNode == nil {"},
  {"line":342,"text":"\t\treturn nil"},
  {"line":343,"text":"\t}"},
  {"line":345,"text":"\tvar keywords []*ast.Node"},
  {"line":346,"text":"\tbody := funcNode.Body()"},
  {"line":347,"text":"\tif body != nil {"},
  {"line":348,"text":"\t\tast.ForEachReturnStatement(body, func(ret *ast.Node) bool {"},
  {"line":349,"text":"\t\t\tkeyword := astnav.FindChildOfKind(ret, ast.KindReturnKeyword, sourceFile)"},
  {"line":350,"text":"\t\t\tif keyword != nil {"},
  {"line":351,"text":"\t\t\t\tkeywords = append(keywords, keyword)"},
  {"line":352,"text":"\t\t\t}"},
  {"line":353,"text":"\t\t\treturn false // continue traversal"},
  {"line":354,"text":"\t\t})"},
  {"line":357,"text":"\t\tthrowStatements := aggregateOwnedThrowStatements(body, sourceFile)"},
  {"line":358,"text":"\t\tfor _, throw := range throwStatements {"},
  {"line":359,"text":"\t\t\tkeyword := astnav.FindChildOfKind(throw, ast.KindThrowKeyword, sourceFile)"},
  {"line":360,"text":"\t\t\tif keyword != nil {"},
  {"line":361,"text":"\t\t\t\tkeywords = append(keywords, keyword)"},
  {"line":362,"text":"\t\t\t}"},
  {"line":363,"text":"\t\t}"},
  {"line":364,"text":"\t}"},
  {"line":365,"text":"\treturn keywords"},
  {"line":366,"text":"}"},
  {"line":368,"text":"func aggregateOwnedThrowStatements(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":369,"text":"\tif ast.IsThrowStatement(node) {"},
  {"line":370,"text":"\t\treturn []*ast.Node{node}"},
  {"line":371,"text":"\t}"},
  {"line":372,"text":"\tif ast.IsTryStatement(node) {"},
  {"line":374,"text":"\t\tstatement := node.AsTryStatement()"},
  {"line":375,"text":"\t\ttryBlock := statement.TryBlock"},
  {"line":376,"text":"\t\tcatchClause := statement.CatchClause"},
  {"line":377,"text":"\t\tfinallyBlock := statement.FinallyBlock"},
  {"line":379,"text":"\t\tvar result []*ast.Node"},
  {"line":380,"text":"\t\tif catchClause != nil {"},
  {"line":381,"text":"\t\t\tresult = aggregateOwnedThrowStatements(catchClause, sourceFile)"},
  {"line":382,"text":"\t\t} else if tryBlock != nil {"},
  {"line":383,"text":"\t\t\tresult = aggregateOwnedThrowStatements(tryBlock, sourceFile)"},
  {"line":384,"text":"\t\t}"},
  {"line":385,"text":"\t\tif finallyBlock != nil {"},
  {"line":386,"text":"\t\t\tresult = append(result, aggregateOwnedThrowStatements(finallyBlock, sourceFile)...)"},
  {"line":387,"text":"\t\t}"},
  {"line":388,"text":"\t\treturn result"},
  {"line":389,"text":"\t}"},
  {"line":391,"text":"\tif ast.IsFunctionLike(node) {"},
  {"line":392,"text":"\t\treturn nil"},
  {"line":393,"text":"\t}"},
  {"line":394,"text":"\treturn flatMapChildren(node, sourceFile, aggregateOwnedThrowStatements)"},
  {"line":395,"text":"}"},
  {"line":397,"text":"func flatMapChildren[T any](node *ast.Node, sourceFile *ast.SourceFile, cb func(child *ast.Node, sourceFile *ast.SourceFile) []T) []T {"},
  {"line":398,"text":"\tvar result []T"},
  {"line":400,"text":"\tnode.ForEachChild(func(child *ast.Node) bool {"},
  {"line":401,"text":"\t\tvalue := cb(child, sourceFile)"},
  {"line":402,"text":"\t\tif value != nil {"},
  {"line":403,"text":"\t\t\tresult = append(result, value...)"},
  {"line":404,"text":"\t\t}"},
  {"line":405,"text":"\t\treturn false // continue traversal"},
  {"line":406,"text":"\t})"},
  {"line":407,"text":"\treturn result"},
  {"line":408,"text":"}"},
  {"line":410,"text":"func getThrowOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":411,"text":"\towner := getThrowStatementOwner(node)"},
  {"line":412,"text":"\tif owner == nil {"},
  {"line":413,"text":"\t\treturn nil"},
  {"line":414,"text":"\t}"},
  {"line":416,"text":"\tvar keywords []*ast.Node"},
  {"line":419,"text":"\tthrowStatements := aggregateOwnedThrowStatements(owner, sourceFile)"},
  {"line":420,"text":"\tfor _, throw := range throwStatements {"},
  {"line":421,"text":"\t\tkeyword := astnav.FindChildOfKind(throw, ast.KindThrowKeyword, sourceFile)"},
  {"line":422,"text":"\t\tif keyword != nil {"},
  {"line":423,"text":"\t\t\tkeywords = append(keywords, keyword)"},
  {"line":424,"text":"\t\t}"},
  {"line":425,"text":"\t}"},
  {"line":429,"text":"\tif ast.IsFunctionBlock(owner) {"},
  {"line":430,"text":"\t\tast.ForEachReturnStatement(owner, func(ret *ast.Node) bool {"},
  {"line":431,"text":"\t\t\tkeyword := astnav.FindChildOfKind(ret, ast.KindReturnKeyword, sourceFile)"},
  {"line":432,"text":"\t\t\tif keyword != nil {"},
  {"line":433,"text":"\t\t\t\tkeywords = append(keywords, keyword)"},
  {"line":434,"text":"\t\t\t}"},
  {"line":435,"text":"\t\t\treturn false // continue traversal"},
  {"line":436,"text":"\t\t})"},
  {"line":437,"text":"\t}"},
  {"line":439,"text":"\treturn keywords"},
  {"line":440,"text":"}"},
  {"line":445,"text":"func getThrowStatementOwner(throwStatement *ast.Node) *ast.Node {"},
  {"line":446,"text":"\tchild := throwStatement"},
  {"line":447,"text":"\tfor child.Parent != nil {"},
  {"line":448,"text":"\t\tparent := child.Parent"},
  {"line":450,"text":"\t\tif ast.IsFunctionBlock(parent) || parent.Kind == ast.KindSourceFile {"},
  {"line":451,"text":"\t\t\treturn parent"},
  {"line":452,"text":"\t\t}"},
  {"line":456,"text":"\t\tif ast.IsTryStatement(parent) {"},
  {"line":457,"text":"\t\t\ttryStatement := parent.AsTryStatement()"},
  {"line":458,"text":"\t\t\tif tryStatement.TryBlock == child && tryStatement.CatchClause != nil {"},
  {"line":459,"text":"\t\t\t\treturn child"},
  {"line":460,"text":"\t\t\t}"},
  {"line":461,"text":"\t\t}"},
  {"line":463,"text":"\t\tchild = parent"},
  {"line":464,"text":"\t}"},
  {"line":465,"text":"\treturn nil"},
  {"line":466,"text":"}"},
  {"line":468,"text":"func getTryCatchFinallyOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":469,"text":"\ttryStatement := node.AsTryStatement()"},
  {"line":471,"text":"\tvar keywords []*ast.Node"},
  {"line":472,"text":"\ttoken := lsutil.GetFirstToken(node, sourceFile)"},
  {"line":473,"text":"\tif token != nil && token.Kind == ast.KindTryKeyword {"},
  {"line":474,"text":"\t\tkeywords = append(keywords, token)"},
  {"line":475,"text":"\t}"},
  {"line":477,"text":"\tif tryStatement.CatchClause != nil {"},
  {"line":478,"text":"\t\tif catchToken := astnav.FindChildOfKind(node, ast.KindCatchKeyword, sourceFile); catchToken != nil {"},
  {"line":479,"text":"\t\t\tkeywords = append(keywords, catchToken)"},
  {"line":480,"text":"\t\t}"},
  {"line":481,"text":"\t}"},
  {"line":483,"text":"\tif tryStatement.FinallyBlock != nil {"},
  {"line":484,"text":"\t\tif finallyKeyword := astnav.FindChildOfKind(node, ast.KindFinallyKeyword, sourceFile); finallyKeyword != nil {"},
  {"line":485,"text":"\t\t\tkeywords = append(keywords, finallyKeyword)"},
  {"line":486,"text":"\t\t}"},
  {"line":487,"text":"\t}"},
  {"line":489,"text":"\treturn keywords"},
  {"line":490,"text":"}"},
  {"line":492,"text":"func getSwitchCaseDefaultOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":493,"text":"\tswitchStatement := node.AsSwitchStatement()"},
  {"line":495,"text":"\tvar keywords []*ast.Node"},
  {"line":496,"text":"\ttoken := lsutil.GetFirstToken(node, sourceFile)"},
  {"line":497,"text":"\tif token.Kind == ast.KindSwitchKeyword {"},
  {"line":498,"text":"\t\tkeywords = append(keywords, token)"},
  {"line":499,"text":"\t}"},
  {"line":501,"text":"\tclauses := switchStatement.CaseBlock.AsCaseBlock().Clauses"},
  {"line":502,"text":"\tfor _, clause := range clauses.Nodes {"},
  {"line":503,"text":"\t\tclauseToken := lsutil.GetFirstToken(clause.AsNode(), sourceFile)"},
  {"line":504,"text":"\t\tif clauseToken.Kind == ast.KindCaseKeyword || clauseToken.Kind == ast.KindDefaultKeyword {"},
  {"line":505,"text":"\t\t\tkeywords = append(keywords, clauseToken)"},
  {"line":506,"text":"\t\t}"},
  {"line":508,"text":"\t\tbreakAndContinueStatements := aggregateAllBreakAndContinueStatements(clause, sourceFile)"},
  {"line":509,"text":"\t\tfor _, statement := range breakAndContinueStatements {"},
  {"line":510,"text":"\t\t\tif statement.Kind == ast.KindBreakStatement && ownsBreakOrContinueStatement(switchStatement.AsNode(), statement) {"},
  {"line":511,"text":"\t\t\t\tkeywords = append(keywords, lsutil.GetFirstToken(statement, sourceFile))"},
  {"line":512,"text":"\t\t\t}"},
  {"line":513,"text":"\t\t}"},
  {"line":514,"text":"\t}"},
  {"line":516,"text":"\treturn keywords"},
  {"line":517,"text":"}"},
  {"line":519,"text":"func aggregateAllBreakAndContinueStatements(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":520,"text":"\tif ast.IsBreakOrContinueStatement(node) {"},
  {"line":521,"text":"\t\treturn []*ast.Node{node}"},
  {"line":522,"text":"\t}"},
  {"line":523,"text":"\tif ast.IsFunctionLike(node) {"},
  {"line":524,"text":"\t\treturn nil"},
  {"line":525,"text":"\t}"},
  {"line":526,"text":"\treturn flatMapChildren(node, sourceFile, aggregateAllBreakAndContinueStatements)"},
  {"line":527,"text":"}"},
  {"line":529,"text":"func ownsBreakOrContinueStatement(owner *ast.Node, statement *ast.Node) bool {"},
  {"line":530,"text":"\tactualOwner := getBreakOrContinueOwner(statement)"},
  {"line":531,"text":"\tif actualOwner == nil {"},
  {"line":532,"text":"\t\treturn false"},
  {"line":533,"text":"\t}"},
  {"line":534,"text":"\treturn actualOwner == owner"},
  {"line":535,"text":"}"},
  {"line":537,"text":"func getBreakOrContinueOwner(statement *ast.Node) *ast.Node {"},
  {"line":538,"text":"\treturn ast.FindAncestorOrQuit(statement, func(node *ast.Node) ast.FindAncestorResult {"},
  {"line":539,"text":"\t\tswitch node.Kind {"},
  {"line":540,"text":"\t\tcase ast.KindSwitchStatement:"},
  {"line":541,"text":"\t\t\tif statement.Kind == ast.KindContinueStatement {"},
  {"line":542,"text":"\t\t\t\treturn ast.FindAncestorFalse"},
  {"line":543,"text":"\t\t\t}"},
  {"line":544,"text":"\t\t\tfallthrough"},
  {"line":545,"text":"\t\tcase ast.KindForStatement,"},
  {"line":546,"text":"\t\t\tast.KindForInStatement,"},
  {"line":547,"text":"\t\t\tast.KindForOfStatement,"},
  {"line":548,"text":"\t\t\tast.KindWhileStatement,"},
  {"line":549,"text":"\t\t\tast.KindDoStatement:"},
  {"line":551,"text":"\t\t\tif statement.Label() == nil || isLabeledBy(node, statement.Label().Text()) {"},
  {"line":552,"text":"\t\t\t\treturn ast.FindAncestorTrue"},
  {"line":553,"text":"\t\t\t}"},
  {"line":554,"text":"\t\t\treturn ast.FindAncestorFalse"},
  {"line":555,"text":"\t\tdefault:"},
  {"line":557,"text":"\t\t\tif ast.IsFunctionLike(node) {"},
  {"line":558,"text":"\t\t\t\treturn ast.FindAncestorQuit"},
  {"line":559,"text":"\t\t\t}"},
  {"line":560,"text":"\t\t\treturn ast.FindAncestorFalse"},
  {"line":561,"text":"\t\t}"},
  {"line":562,"text":"\t})"},
  {"line":563,"text":"}"},
  {"line":567,"text":"func isLabeledBy(node *ast.Node, labelName string) bool {"},
  {"line":568,"text":"\treturn ast.FindAncestorOrQuit(node.Parent, func(owner *ast.Node) ast.FindAncestorResult {"},
  {"line":569,"text":"\t\tif !ast.IsLabeledStatement(owner) {"},
  {"line":570,"text":"\t\t\treturn ast.FindAncestorQuit"},
  {"line":571,"text":"\t\t}"},
  {"line":572,"text":"\t\tif owner.Label().Text() == labelName {"},
  {"line":573,"text":"\t\t\treturn ast.FindAncestorTrue"},
  {"line":574,"text":"\t\t}"},
  {"line":575,"text":"\t\treturn ast.FindAncestorFalse"},
  {"line":576,"text":"\t}) != nil"},
  {"line":577,"text":"}"},
  {"line":579,"text":"func getBreakOrContinueStatementOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":580,"text":"\tif owner := getBreakOrContinueOwner(node); owner != nil {"},
  {"line":581,"text":"\t\tswitch owner.Kind {"},
  {"line":582,"text":"\t\tcase ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindDoStatement, ast.KindWhileStatement:"},
  {"line":583,"text":"\t\t\treturn getLoopBreakContinueOccurrences(owner, sourceFile)"},
  {"line":584,"text":"\t\tcase ast.KindSwitchStatement:"},
  {"line":585,"text":"\t\t\treturn getSwitchCaseDefaultOccurrences(owner, sourceFile)"},
  {"line":586,"text":"\t\t}"},
  {"line":587,"text":"\t}"},
  {"line":588,"text":"\treturn nil"},
  {"line":589,"text":"}"},
  {"line":591,"text":"func getLoopBreakContinueOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":592,"text":"\tvar keywords []*ast.Node"},
  {"line":594,"text":"\ttoken := lsutil.GetFirstToken(node, sourceFile)"},
  {"line":595,"text":"\tif token.Kind == ast.KindForKeyword || token.Kind == ast.KindDoKeyword || token.Kind == ast.KindWhileKeyword {"},
  {"line":596,"text":"\t\tkeywords = append(keywords, token)"},
  {"line":597,"text":"\t\tif node.Kind == ast.KindDoStatement {"},
  {"line":598,"text":"\t\t\tloopTokens := getChildrenFromNonJSDocNode(node, sourceFile)"},
  {"line":599,"text":"\t\t\tfor i := len(loopTokens) - 1; i >= 0; i-- {"},
  {"line":600,"text":"\t\t\t\tif loopTokens[i].Kind == ast.KindWhileKeyword {"},
  {"line":601,"text":"\t\t\t\t\tkeywords = append(keywords, loopTokens[i])"},
  {"line":602,"text":"\t\t\t\t\tbreak"},
  {"line":603,"text":"\t\t\t\t}"},
  {"line":604,"text":"\t\t\t}"},
  {"line":605,"text":"\t\t}"},
  {"line":606,"text":"\t}"},
  {"line":608,"text":"\tbreakAndContinueStatements := aggregateAllBreakAndContinueStatements(node, sourceFile)"},
  {"line":609,"text":"\tfor _, statement := range breakAndContinueStatements {"},
  {"line":610,"text":"\t\ttoken := lsutil.GetFirstToken(statement, sourceFile)"},
  {"line":611,"text":"\t\tif ownsBreakOrContinueStatement(node, statement) && (token.Kind == ast.KindBreakKeyword || token.Kind == ast.KindContinueKeyword) {"},
  {"line":612,"text":"\t\t\tkeywords = append(keywords, token)"},
  {"line":613,"text":"\t\t}"},
  {"line":614,"text":"\t}"},
  {"line":616,"text":"\treturn keywords"},
  {"line":617,"text":"}"},
  {"line":619,"text":"func getAsyncAndAwaitOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":620,"text":"\tfun := ast.GetContainingFunction(node)"},
  {"line":621,"text":"\tif fun == nil {"},
  {"line":622,"text":"\t\treturn nil"},
  {"line":623,"text":"\t}"},
  {"line":625,"text":"\tvar keywords []*ast.Node"},
  {"line":627,"text":"\tfor _, modifier := range fun.ModifierNodes() {"},
  {"line":628,"text":"\t\tif modifier.Kind == ast.KindAsyncKeyword {"},
  {"line":629,"text":"\t\t\tkeywords = append(keywords, modifier)"},
  {"line":630,"text":"\t\t}"},
  {"line":631,"text":"\t}"},
  {"line":633,"text":"\tfun.ForEachChild(func(child *ast.Node) bool {"},
  {"line":634,"text":"\t\ttraverseWithoutCrossingFunction(child, sourceFile, func(child *ast.Node) {"},
  {"line":635,"text":"\t\t\tif ast.IsAwaitExpression(child) {"},
  {"line":636,"text":"\t\t\t\ttoken := lsutil.GetFirstToken(child, sourceFile)"},
  {"line":637,"text":"\t\t\t\tif token.Kind == ast.KindAwaitKeyword {"},
  {"line":638,"text":"\t\t\t\t\tkeywords = append(keywords, token)"},
  {"line":639,"text":"\t\t\t\t}"},
  {"line":640,"text":"\t\t\t}"},
  {"line":641,"text":"\t\t})"},
  {"line":642,"text":"\t\treturn false // continue traversal"},
  {"line":643,"text":"\t})"},
  {"line":645,"text":"\treturn keywords"},
  {"line":646,"text":"}"},
  {"line":648,"text":"func getYieldOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":649,"text":"\tparentFunc := ast.FindAncestor(node.Parent, ast.IsFunctionLike)"},
  {"line":650,"text":"\tif parentFunc == nil {"},
  {"line":651,"text":"\t\treturn nil"},
  {"line":652,"text":"\t}"},
  {"line":654,"text":"\tvar keywords []*ast.Node"},
  {"line":656,"text":"\tparentFunc.ForEachChild(func(child *ast.Node) bool {"},
  {"line":657,"text":"\t\ttraverseWithoutCrossingFunction(child, sourceFile, func(child *ast.Node) {"},
  {"line":658,"text":"\t\t\tif ast.IsYieldExpression(child) {"},
  {"line":659,"text":"\t\t\t\ttoken := lsutil.GetFirstToken(child, sourceFile)"},
  {"line":660,"text":"\t\t\t\tif token.Kind == ast.KindYieldKeyword {"},
  {"line":661,"text":"\t\t\t\t\tkeywords = append(keywords, token)"},
  {"line":662,"text":"\t\t\t\t}"},
  {"line":663,"text":"\t\t\t}"},
  {"line":664,"text":"\t\t})"},
  {"line":665,"text":"\t\treturn false // continue traversal"},
  {"line":666,"text":"\t})"},
  {"line":668,"text":"\treturn keywords"},
  {"line":669,"text":"}"},
  {"line":671,"text":"func traverseWithoutCrossingFunction(node *ast.Node, sourceFile *ast.SourceFile, cb func(*ast.Node)) {"},
  {"line":672,"text":"\tcb(node)"},
  {"line":673,"text":"\tif !ast.IsFunctionLike(node) && !ast.IsClassLike(node) && !ast.IsInterfaceDeclaration(node) && !ast.IsModuleDeclaration(node) && !ast.IsTypeAliasDeclaration(node) && !ast.IsTypeNode(node) {"},
  {"line":674,"text":"\t\tnode.ForEachChild(func(child *ast.Node) bool {"},
  {"line":675,"text":"\t\t\ttraverseWithoutCrossingFunction(child, sourceFile, cb)"},
  {"line":676,"text":"\t\t\treturn false // continue traversal"},
  {"line":677,"text":"\t\t})"},
  {"line":678,"text":"\t}"},
  {"line":679,"text":"}"},
  {"line":681,"text":"func getModifierOccurrences(kind ast.Kind, node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {"},
  {"line":682,"text":"\tvar result []*ast.Node"},
  {"line":684,"text":"\tnodesToSearch := getNodesToSearchForModifier(node, ast.ModifierToFlag(kind))"},
  {"line":685,"text":"\tfor _, n := range nodesToSearch {"},
  {"line":686,"text":"\t\tmodifier := findModifier(n, kind)"},
  {"line":687,"text":"\t\tif modifier != nil {"},
  {"line":688,"text":"\t\t\tresult = append(result, modifier)"},
  {"line":689,"text":"\t\t}"},
  {"line":690,"text":"\t}"},
  {"line":691,"text":"\treturn result"},
  {"line":692,"text":"}"},
  {"line":694,"text":"func getNodesToSearchForModifier(declaration *ast.Node, modifierFlag ast.ModifierFlags) []*ast.Node {"},
  {"line":695,"text":"\tvar result []*ast.Node"},
  {"line":697,"text":"\tcontainer := declaration.Parent"},
  {"line":698,"text":"\tif container == nil {"},
  {"line":699,"text":"\t\treturn nil"},
  {"line":700,"text":"\t}"},
  {"line":703,"text":"\tswitch container.Kind {"},
  {"line":704,"text":"\tcase ast.KindModuleBlock, ast.KindSourceFile, ast.KindBlock, ast.KindCaseClause, ast.KindDefaultClause:"},
  {"line":706,"text":"\t\tif (modifierFlag&ast.ModifierFlagsAbstract) != 0 && ast.IsClassDeclaration(declaration) {"},
  {"line":707,"text":"\t\t\treturn append(append(result, declaration.Members()...), declaration)"},
  {"line":708,"text":"\t\t} else {"},
  {"line":709,"text":"\t\t\treturn append(result, container.Statements()...)"},
  {"line":710,"text":"\t\t}"},
  {"line":711,"text":"\tcase ast.KindConstructor, ast.KindMethodDeclaration, ast.KindFunctionDeclaration:"},
  {"line":713,"text":"\t\tresult = append(result, container.Parameters()...)"},
  {"line":714,"text":"\t\tif ast.IsClassLike(container.Parent) {"},
  {"line":715,"text":"\t\t\tresult = append(result, container.Parent.Members()...)"},
  {"line":716,"text":"\t\t}"},
  {"line":717,"text":"\t\treturn result"},
  {"line":718,"text":"\tcase ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindTypeLiteral:"},
  {"line":719,"text":"\t\tnodes := container.Members()"},
  {"line":720,"text":"\t\tresult = append(result, nodes...)"},
  {"line":723,"text":"\t\tif (modifierFlag & (ast.ModifierFlagsAccessibilityModifier | ast.ModifierFlagsReadonly)) != 0 {"},
  {"line":724,"text":"\t\t\tvar constructor *ast.Node"},
  {"line":726,"text":"\t\t\tfor _, member := range nodes {"},
  {"line":727,"text":"\t\t\t\tif ast.IsConstructorDeclaration(member) {"},
  {"line":728,"text":"\t\t\t\t\tconstructor = member"},
  {"line":729,"text":"\t\t\t\t\tbreak"},
  {"line":730,"text":"\t\t\t\t}"},
  {"line":731,"text":"\t\t\t}"},
  {"line":732,"text":"\t\t\tif constructor != nil {"},
  {"line":733,"text":"\t\t\t\tresult = append(result, constructor.Parameters()...)"},
  {"line":734,"text":"\t\t\t}"},
  {"line":735,"text":"\t\t} else if (modifierFlag & ast.ModifierFlagsAbstract) != 0 {"},
  {"line":736,"text":"\t\t\tresult = append(result, container)"},
  {"line":737,"text":"\t\t}"},
  {"line":738,"text":"\t\treturn result"},
  {"line":739,"text":"\tdefault:"},
  {"line":741,"text":"\t\treturn nil"},
  {"line":742,"text":"\t}"},
  {"line":743,"text":"}"},
  {"line":745,"text":"func findModifier(node *ast.Node, kind ast.Kind) *ast.Node {"},
  {"line":746,"text":"\tfor _, modifier := range node.ModifierNodes() {"},
  {"line":747,"text":"\t\tif modifier.Kind == kind {"},
  {"line":748,"text":"\t\t\treturn modifier"},
  {"line":749,"text":"\t\t}"},
  {"line":750,"text":"\t}"},
  {"line":751,"text":"\treturn nil"},
  {"line":752,"text":"}"},
];

export function findLsDocumentHighlightsDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsDocumentHighlightsDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsDocumentHighlightsDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsDocumentHighlightsDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsDocumentHighlightsLineText(line: number): string | undefined {
  return lsDocumentHighlightsSourceLines.find((entry) => entry.line === line)?.text;
}
