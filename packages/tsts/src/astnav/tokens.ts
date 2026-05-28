/**
 * AST positional navigation.
 *
 * Port of TS-Go `internal/astnav/tokens.go` (771 LoC). Provides position-
 * based queries: "what token is at this offset?", "find the preceding
 * token", "find the next token", "find a specific child kind", etc.
 *
 * Used heavily by the language service (quick info, completion, signature
 * help) and by code-fix flows. Mirrors upstream Go semantics line-for-line.
 *
 * References to AST visitor / scanner surface are declared at file end
 * as `declare function` until those TSTS subsystems mature.
 */

import type {
  Node as AstNode,
  NodeArray,
  SourceFile,
} from "../ast/index.js";
import { Kind, NodeFlags } from "../ast/index.js";
import {
  nodePos, nodeEnd, sourceFileEndOfFileToken,
} from "../ast/index.js";
import {
  isPropertyNameLiteral,
} from "../ast/index.js";
import { isPrivateIdentifier } from "../ast/index.js";
import { binarySearchUniqueFunc } from "../core/index.js";

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the token at `position` if it is a property-name literal,
 * keyword, or private identifier. Otherwise returns the lowest node
 * enclosing the position.
 *
 * Mirrors TS-Go `GetTouchingPropertyName`.
 */
export function getTouchingPropertyName(sourceFile: SourceFile, position: number): AstNode | undefined {
  return getTokenAtPosition(sourceFile, position, false, (node) =>
    isPropertyNameLiteral(node) || isKeywordKind(node.kind) || isPrivateIdentifier(node),
  );
}

/**
 * Returns the token at `position`, where `position` may be inside the
 * token's body (but not its leading trivia).
 *
 * Mirrors TS-Go `GetTouchingToken`.
 */
export function getTouchingToken(sourceFile: SourceFile, position: number): AstNode | undefined {
  return getTokenAtPosition(sourceFile, position, false, undefined);
}

/**
 * Returns the token at `position`, where `position` may also be inside
 * the token's leading trivia.
 *
 * Mirrors TS-Go `GetTokenAtPosition`.
 */
export function getTokenAtPositionPublic(sourceFile: SourceFile, position: number): AstNode | undefined {
  return getTokenAtPosition(sourceFile, position, true, undefined);
}

// ---------------------------------------------------------------------------
// Token at position (core algorithm)
// ---------------------------------------------------------------------------

type IncludePrecedingTokenPredicate = ((node: AstNode) => boolean) | undefined;

/**
 * Returns the token at `position` in the source file. The token can be
 * a real node in the AST, or a synthesized token constructed with
 * information from the scanner. Synthesized tokens are cached on the
 * source file so repeated calls return the same object.
 *
 * If `allowPositionInLeadingTrivia` is false and there is no real
 * token at the position, the lowest node enclosing the position is
 * returned.
 *
 * Mirrors TS-Go `getTokenAtPosition`.
 */
export function getTokenAtPosition(
  sourceFile: SourceFile,
  position: number,
  allowPositionInLeadingTrivia: boolean,
  includePrecedingTokenAtEndPosition: IncludePrecedingTokenPredicate,
): AstNode | undefined {
  // `next` is the node whose children will be visited next.
  // `prevSubtree` is a node ending at `position`, captured only if
  // `includePrecedingTokenAtEndPosition` is provided.
  let next: AstNode | undefined;
  let prevSubtree: AstNode | undefined;
  let current: AstNode = sourceFileAsNode(sourceFile);
  // `left` is the lower boundary of any returned token; also serves as
  // the scanner start position when the scanner is needed.
  let left = 0;
  // `nodeAfterLeft` is the first node visited after the node that
  // advanced `left`. When scanning between AST nodes for a token, we
  // only scan up to the start of `nodeAfterLeft`.
  let nodeAfterLeft: AstNode | undefined;

  const testNode = (node: AstNode): number => {
    if (
      node.kind !== KindEndOfFile &&
      nodeEnd(node) === position &&
      includePrecedingTokenAtEndPosition !== undefined &&
      (node.flags & NodeFlagsReparsed) === 0
    ) {
      prevSubtree = node;
    }
    // A node "contains" the position if position < end, except nodes at
    // the file end treat end as inclusive (there's nowhere else to look).
    // This applies to the EOF token itself and to JSDoc nodes reaching
    // EOF.
    if (
      nodeEnd(node) < position ||
      (nodeEnd(node) === position &&
        node.kind !== KindEndOfFile &&
        (!isJSDocKind(node.kind) || nodeEnd(node) !== nodeEnd(sourceFileEndOfFileToken(sourceFile))))
    ) {
      return -1;
    }
    const nodePos = getPosition(node, sourceFile, allowPositionInLeadingTrivia);
    if (nodePos > position) return 1;
    return 0;
  };

  // Visits each child / JSDoc of the current node. Node children are
  // walked in order; node lists are binary searched.
  const visitNode = (node: AstNode | undefined): AstNode | undefined => {
    if (node === undefined || (node.flags & NodeFlagsReparsed) !== 0) return undefined;
    if (nodeAfterLeft === undefined) nodeAfterLeft = node;
    if (next === undefined) {
      const result = testNode(node);
      if (result === -1) {
        if (!isJSDocKind(node.kind)) {
          left = nodeEnd(node);
        }
        nodeAfterLeft = undefined;
      } else if (result === 0) {
        next = node;
      }
    }
    return node;
  };

  const visitNodeList = (nodeList: NodeArray<AstNode> | undefined): NodeArray<AstNode> | undefined => {
    if (nodeList === undefined || nodeList.length === 0) return nodeList;
    if (nodeAfterLeft === undefined) {
      for (const node of nodeList) {
        if ((node.flags & NodeFlagsReparsed) === 0) {
          nodeAfterLeft = node;
          break;
        }
      }
    }
    if (next === undefined) {
      if (nodeArrayEnd(nodeList) === position && includePrecedingTokenAtEndPosition !== undefined) {
        left = nodeArrayEnd(nodeList);
        nodeAfterLeft = undefined;
        for (let i = nodeList.length - 1; i >= 0; i -= 1) {
          if ((nodeList[i]!.flags & NodeFlagsReparsed) === 0) {
            prevSubtree = nodeList[i]!;
            break;
          }
        }
      } else if (nodeArrayEnd(nodeList) <= position) {
        left = nodeArrayEnd(nodeList);
        nodeAfterLeft = undefined;
      } else if (nodeArrayPos(nodeList) <= position) {
        const nodes: readonly AstNode[] = nodeList;
        let { index, match } = binarySearchUniqueFunc(nodes, (middle, node) => {
          if ((node.flags & NodeFlagsReparsed) !== 0) return 0;
          const cmp = testNode(node);
          if (cmp < 0) {
            left = nodeEnd(node);
            nodeAfterLeft = undefined;
            for (let i = middle + 1; i < nodes.length; i += 1) {
              if ((nodes[i]!.flags & NodeFlagsReparsed) === 0) {
                nodeAfterLeft = nodes[i]!;
                break;
              }
            }
          }
          return cmp;
        });
        if (match && (nodes[index]!.flags & NodeFlagsReparsed) !== 0) {
          // Filter out reparsed nodes and search again.
          const filtered = nodes.filter((n) => (n.flags & NodeFlagsReparsed) === 0);
          ({ index, match } = binarySearchUniqueFunc(filtered, (middle, node) => {
            const cmp = testNode(node);
            if (cmp < 0) {
              left = nodeEnd(node);
              nodeAfterLeft = middle + 1 < filtered.length ? filtered[middle + 1]! : undefined;
            }
            return cmp;
          }));
          if (match) next = filtered[index];
        } else if (match) {
          next = nodes[index];
        }
      }
    }
    return nodeList;
  };

  while (true) {
    visitEachChildAndJSDoc(current, sourceFile, visitNode, visitNodeList);
    // If prevSubtree was set, it ends at the target position; check
    // if its rightmost token should be returned.
    if (prevSubtree !== undefined) {
      const child = findPrecedingTokenEx(sourceFile, position, prevSubtree, false);
      if (child !== undefined && nodeEnd(child) === position && includePrecedingTokenAtEndPosition!(child)) {
        return child;
      }
      prevSubtree = undefined;
    }

    if (next === undefined) {
      if (isTokenKind(current.kind) || shouldSkipChild(current)) {
        return current;
      }
      const scanner = getScannerForSourceFile(sourceFile, left);
      let end = nodeEnd(current);
      if (nodeAfterLeft !== undefined) {
        end = nodePos(nodeAfterLeft);
      }
      while (left < end) {
        const token = scanner.token();
        const tokenFullStart = scanner.tokenFullStart();
        const tokenStart = allowPositionInLeadingTrivia ? tokenFullStart : scanner.tokenStart();
        const tokenEnd = scanner.tokenEnd();
        const flags = scanner.tokenFlags();
        if (tokenEnd > end) break;
        if (tokenStart <= position && position < tokenEnd) {
          if (token === KindIdentifier || !isTokenKind(token)) {
            if (isJSDocKind(current.kind)) return current;
            throw new Error(`did not expect ${String(current.kind)} to have ${String(token)} in its trivia`);
          }
          return sourceFileGetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
        }
        if (includePrecedingTokenAtEndPosition !== undefined && tokenEnd === position) {
          const prevToken = sourceFileGetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
          if (includePrecedingTokenAtEndPosition(prevToken)) return prevToken;
        }
        left = tokenEnd;
        scanner.scan();
      }
      return current;
    }
    current = next;
    left = nodePos(current);
    nodeAfterLeft = undefined;
    next = undefined;
  }
}

function getPosition(node: AstNode, sourceFile: SourceFile, allowPositionInLeadingTrivia: boolean): number {
  if (allowPositionInLeadingTrivia) return nodePos(node);
  return getTokenPosOfNode(node, sourceFile, true);
}

function findRightmostNode(node: AstNode): AstNode {
  let next: AstNode | undefined;
  let current = node;
  const visitNode = (n: AstNode | undefined): AstNode | undefined => {
    if (n !== undefined) next = n;
    return n;
  };
  const visitNodes = (nodeList: NodeArray<AstNode> | undefined): NodeArray<AstNode> | undefined => {
    if (nodeList !== undefined) {
      const rightmost = findLastVisibleNode([...nodeList]);
      if (rightmost !== undefined) next = rightmost;
    }
    return nodeList;
  };

  while (true) {
    visitEachChild(current, visitNode, visitNodes);
    if (next === undefined) return current;
    current = next;
    next = undefined;
  }
}

/**
 * Visits each child and JSDoc of `node`. JSDoc comes first, then the
 * regular child traversal. Mirrors TS-Go `VisitEachChildAndJSDoc`.
 */
export function visitEachChildAndJSDoc(
  node: AstNode,
  sourceFile: SourceFile,
  visitNode: (n: AstNode | undefined) => AstNode | undefined,
  visitNodes: (n: NodeArray<AstNode> | undefined) => NodeArray<AstNode> | undefined,
): void {
  for (const jsdoc of nodeJSDoc(node, sourceFile)) {
    visitNode(jsdoc);
  }
  visitEachChild(node, visitNode, visitNodes);
}

// ---------------------------------------------------------------------------
// FindPrecedingToken
// ---------------------------------------------------------------------------

const COMPARISON_LESS_THAN = -1;
const COMPARISON_EQUAL_TO = 0;
const COMPARISON_GREATER_THAN = 1;

/**
 * Finds the leftmost token satisfying `position < token.End()`. If
 * the leftmost token is invalid or position is in its trivia, returns
 * the rightmost valid token with `token.End() <= position`.
 *
 * Mirrors TS-Go `FindPrecedingToken`.
 */
export function findPrecedingToken(sourceFile: SourceFile, position: number): AstNode | undefined {
  return findPrecedingTokenEx(sourceFile, position, undefined, false);
}

/**
 * Like `findPrecedingToken` but allows specifying a different starting
 * node and whether to exclude JSDoc. Mirrors TS-Go `FindPrecedingTokenEx`.
 */
export function findPrecedingTokenEx(
  sourceFile: SourceFile,
  position: number,
  startNode: AstNode | undefined,
  excludeJSDoc: boolean,
): AstNode | undefined {
  const find = (n: AstNode): AstNode | undefined => {
    if (isNonWhitespaceToken(n) && n.kind !== KindEndOfFile) return n;

    let foundChild: AstNode | undefined;
    let prevChild: AstNode | undefined;
    const visitNode = (node: AstNode | undefined): AstNode | undefined => {
      if (node === undefined || (node.flags & NodeFlagsReparsed) !== 0) return node;
      if (foundChild !== undefined) return node;
      if (position < nodeEnd(node) && (prevChild === undefined || nodeEnd(prevChild) <= position)) {
        foundChild = node;
      } else {
        prevChild = node;
      }
      return node;
    };
    const visitNodes = (nodeList: NodeArray<AstNode> | undefined): NodeArray<AstNode> | undefined => {
      if (foundChild !== undefined) return nodeList;
      if (nodeList !== undefined && nodeList.length > 0) {
        const nodes: readonly AstNode[] = nodeList;
        const { index, match } = binarySearchUniqueFunc(nodes, (middle, _node) => {
          if ((nodes[middle]!.flags & NodeFlagsReparsed) !== 0) return COMPARISON_LESS_THAN;
          if (position < nodeEnd(nodes[middle]!)) {
            if (middle === 0 || position >= nodeEnd(nodes[middle - 1]!)) return COMPARISON_EQUAL_TO;
            return COMPARISON_GREATER_THAN;
          }
          return COMPARISON_LESS_THAN;
        });

        if (match) foundChild = nodes[index];

        const validLookupIndex = match ? index - 1 : nodes.length - 1;
        for (let i = validLookupIndex; i >= 0; i -= 1) {
          if ((nodes[i]!.flags & NodeFlagsReparsed) !== 0) continue;
          if (prevChild === undefined) prevChild = nodes[i]!;
        }
      }
      return nodeList;
    };
    visitEachChildAndJSDoc(n, sourceFile, visitNode, visitNodes);

    if (foundChild !== undefined) {
      const start = getStartOfNode(foundChild, sourceFile, !excludeJSDoc);
      const lookInPreviousChild = start >= position || !isValidPrecedingNode(foundChild, sourceFile);
      if (lookInPreviousChild) {
        if (position >= nodePos(foundChild)) {
          let jsDoc: AstNode | undefined;
          const nodeJSDocList = nodeJSDoc(n, sourceFile);
          for (let i = nodeJSDocList.length - 1; i >= 0; i -= 1) {
            if (nodePos(nodeJSDocList[i]!) >= nodePos(foundChild)) {
              jsDoc = nodeJSDocList[i]!;
              break;
            }
          }
          if (jsDoc !== undefined) {
            if (!excludeJSDoc && position < nodeEnd(jsDoc)) {
              return find(jsDoc);
            }
            return findRightmostValidToken(nodeEnd(jsDoc), sourceFile, n, position, excludeJSDoc);
          }
          return findRightmostValidToken(nodePos(foundChild), sourceFile, n, -1, excludeJSDoc);
        }
        return findRightmostValidToken(nodePos(foundChild), sourceFile, n, position, excludeJSDoc);
      }
      return find(foundChild);
    }

    if (position >= nodeEnd(n)) {
      return findRightmostValidToken(nodeEnd(n), sourceFile, n, -1, excludeJSDoc);
    }
    return findRightmostValidToken(nodeEnd(n), sourceFile, n, position, excludeJSDoc);
  };

  const node = startNode ?? sourceFileAsNode(sourceFile);
  const result = find(node);
  if (result !== undefined && isWhitespaceOnlyJsxText(result)) {
    throw new Error("Expected result to be a non-whitespace token.");
  }
  return result;
}

function isValidPrecedingNode(node: AstNode, sourceFile: SourceFile): boolean {
  if (node.kind === KindEndOfFile) {
    return nodeJSDoc(node, sourceFile).length > 0;
  }
  const start = getStartOfNode(node, sourceFile, false);
  const width = nodeEnd(node) - start;
  return !(isWhitespaceOnlyJsxText(node) || width === 0);
}

/**
 * Mirrors TS-Go `GetStartOfNode`.
 */
export function getStartOfNode(node: AstNode, file: SourceFile, includeJSDoc: boolean): number {
  return getTokenPosOfNode(node, file, includeJSDoc);
}

/**
 * Finds the rightmost valid token in `[startPos, endPos)`. If
 * `position >= 0`, looks for the rightmost valid token that precedes
 * or touches that position.
 *
 * Mirrors TS-Go `findRightmostValidToken`.
 */
function findRightmostValidToken(
  endPosIn: number,
  sourceFile: SourceFile,
  containingNode: AstNode,
  positionIn: number,
  excludeJSDoc: boolean,
): AstNode | undefined {
  const position = positionIn === -1 ? nodeEnd(containingNode) : positionIn;

  const find = (n: AstNode | undefined, endPos: number): AstNode | undefined => {
    if (n === undefined) return undefined;
    if (isNonWhitespaceToken(n)) return n;

    let rightmostValidNode: AstNode | undefined;
    const rightmostVisitedNodes: AstNode[] = [];
    let hasChildren = false;
    const shouldVisitNode = (node: AstNode): boolean =>
      !(((node.flags & NodeFlagsReparsed) !== 0) ||
        nodeEnd(node) > endPos ||
        getStartOfNode(node, sourceFile, !excludeJSDoc) >= position);

    const visitNode = (node: AstNode | undefined): AstNode | undefined => {
      if (node === undefined || (node.flags & NodeFlagsReparsed) !== 0) return node;
      hasChildren = true;
      if (!shouldVisitNode(node)) return node;
      rightmostVisitedNodes.push(node);
      if (isValidPrecedingNode(node, sourceFile)) {
        rightmostValidNode = node;
        rightmostVisitedNodes.length = 0;
      }
      return node;
    };
    const visitNodes = (nodeList: NodeArray<AstNode> | undefined): NodeArray<AstNode> | undefined => {
      if (nodeList !== undefined && nodeList.length > 0) {
        hasChildren = true;
        const nodes: readonly AstNode[] = nodeList;
        const { index } = binarySearchUniqueFunc(nodes, (_middle, node) => {
          if (nodeEnd(node) > endPos) return COMPARISON_GREATER_THAN;
          return COMPARISON_LESS_THAN;
        });
        let validIndex = -1;
        for (let i = index - 1; i >= 0; i -= 1) {
          if (!shouldVisitNode(nodes[i]!)) continue;
          if (isValidPrecedingNode(nodes[i]!, sourceFile)) {
            validIndex = i;
            rightmostValidNode = nodes[i];
            break;
          }
        }
        for (let i = validIndex + 1; i < index; i += 1) {
          if (!shouldVisitNode(nodes[i]!)) continue;
          rightmostVisitedNodes.push(nodes[i]!);
        }
      }
      return nodeList;
    };
    visitEachChildAndJSDoc(n, sourceFile, visitNode, visitNodes);

    if (!shouldSkipChild(n)) {
      let startPos = rightmostValidNode !== undefined ? nodeEnd(rightmostValidNode) : nodePos(n);
      const scanner = getScannerForSourceFile(sourceFile, startPos);
      const tokens: AstNode[] = [];
      for (const visitedNode of rightmostVisitedNodes) {
        while (startPos < Math.min(nodePos(visitedNode), position)) {
          const tokenStart = scanner.tokenStart();
          if (tokenStart >= position) break;
          const token = scanner.token();
          const tokenFullStart = scanner.tokenFullStart();
          const tokenEnd = scanner.tokenEnd();
          startPos = tokenEnd;
          const flags = scanner.tokenFlags();
          tokens.push(sourceFileGetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags));
          scanner.scan();
        }
        startPos = nodeEnd(visitedNode);
        scanner.resetPos(startPos);
        scanner.scan();
      }
      while (startPos < Math.min(endPos, position)) {
        const tokenStart = scanner.tokenStart();
        if (tokenStart >= position) break;
        const token = scanner.token();
        const tokenFullStart = scanner.tokenFullStart();
        const tokenEnd = scanner.tokenEnd();
        startPos = tokenEnd;
        const flags = scanner.tokenFlags();
        tokens.push(sourceFileGetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags));
        scanner.scan();
      }

      const lastTokenIndex = tokens.length - 1;
      for (let i = lastTokenIndex; i >= 0; i -= 1) {
        if (!isWhitespaceOnlyJsxText(tokens[i]!)) return tokens[i];
      }
    }

    if (!hasChildren) {
      if (n !== containingNode) return n;
      return undefined;
    }
    if (rightmostValidNode !== undefined) {
      endPos = nodeEnd(rightmostValidNode);
    }
    return find(rightmostValidNode, endPos);
  };

  return find(containingNode, endPosIn);
}

// ---------------------------------------------------------------------------
// FindNextToken
// ---------------------------------------------------------------------------

/**
 * Finds the token immediately after `previousToken` within `parent`.
 * Mirrors TS-Go `FindNextToken`.
 */
export function findNextToken(previousToken: AstNode, parent: AstNode, file: SourceFile): AstNode | undefined {
  const find = (n: AstNode): AstNode | undefined => {
    if (isTokenKind(n.kind) && nodePos(n) === nodeEnd(previousToken)) return n;

    let foundNode: AstNode | undefined;
    const visitNode = (node: AstNode | undefined): AstNode | undefined => {
      if (
        node !== undefined &&
        (node.flags & NodeFlagsReparsed) === 0 &&
        nodePos(node) <= nodeEnd(previousToken) &&
        nodeEnd(node) > nodeEnd(previousToken)
      ) {
        foundNode = node;
      }
      return node;
    };
    const visitNodes = (nodeList: NodeArray<AstNode> | undefined): NodeArray<AstNode> | undefined => {
      if (nodeList !== undefined && nodeList.length > 0 && foundNode === undefined) {
        const nodes: readonly AstNode[] = nodeList;
        const { index, match } = binarySearchUniqueFunc(nodes, (_middle, node) => {
          if ((node.flags & NodeFlagsReparsed) !== 0) return COMPARISON_LESS_THAN;
          if (nodePos(node) > nodeEnd(previousToken)) return COMPARISON_GREATER_THAN;
          if (nodeEnd(node) <= nodePos(previousToken)) return COMPARISON_LESS_THAN;
          return COMPARISON_EQUAL_TO;
        });
        if (match) foundNode = nodes[index];
      }
      return nodeList;
    };
    visitEachChildAndJSDoc(n, file, visitNode, visitNodes);

    if (foundNode !== undefined) return find(foundNode);

    const startPos = nodeEnd(previousToken);
    if (startPos >= nodePos(n) && startPos < nodeEnd(n)) {
      const scanner = getScannerForSourceFile(file, startPos);
      const token = scanner.token();
      const tokenFullStart = scanner.tokenFullStart();
      const tokenEnd = scanner.tokenEnd();
      const flags = scanner.tokenFlags();
      if (tokenFullStart === nodeEnd(previousToken)) {
        return sourceFileGetOrCreateToken(file, token, tokenFullStart, tokenEnd, n, flags);
      }
      throw new Error(`Expected to find next token at ${nodeEnd(previousToken)}, got token ${String(token)} at ${tokenFullStart}`);
    }
    return undefined;
  };
  return find(parent);
}

// ---------------------------------------------------------------------------
// FindChildOfKind
// ---------------------------------------------------------------------------

function shouldSkipChild(node: AstNode): boolean {
  return (
    node.kind === KindJSDoc ||
    node.kind === KindJSDocText ||
    node.kind === KindJSDocTypeLiteral ||
    node.kind === KindJSDocSignature ||
    isJSDocLinkLike(node) ||
    isJSDocTag(node)
  );
}

/**
 * Searches for a child node or token of `kind` within `containingNode`,
 * scanning intervening tokens. Mirrors TS-Go `FindChildOfKind`.
 */
export function findChildOfKind(containingNode: AstNode, kind: Kind, sourceFile: SourceFile): AstNode | undefined {
  let lastNodePos = nodePos(containingNode);
  const scan = getScannerForSourceFile(sourceFile, lastNodePos);

  let foundChild: AstNode | undefined;
  const visitNode = (node: AstNode | undefined): boolean => {
    if (node === undefined || (node.flags & NodeFlagsReparsed) !== 0) return false;
    let startPos = lastNodePos;
    while (startPos < nodePos(node)) {
      const tokenKind = scan.token();
      const tokenEnd = scan.tokenEnd();
      if (tokenKind === kind) {
        const tokenFullStart = scan.tokenFullStart();
        const flags = scan.tokenFlags();
        foundChild = sourceFileGetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, containingNode, flags);
        return true;
      }
      startPos = tokenEnd;
      scan.scan();
    }
    if (node.kind === kind) {
      foundChild = node;
      return true;
    }
    lastNodePos = nodeEnd(node);
    scan.resetPos(lastNodePos);
    return false;
  };

  forEachChildAndJSDoc(containingNode, sourceFile, visitNode);

  if (foundChild !== undefined) return foundChild;

  let startPos = lastNodePos;
  while (startPos < nodeEnd(containingNode)) {
    const tokenKind = scan.token();
    const tokenEnd = scan.tokenEnd();
    if (tokenKind === kind) {
      const tokenFullStart = scan.tokenFullStart();
      const flags = scan.tokenFlags();
      return sourceFileGetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, containingNode, flags);
    }
    startPos = tokenEnd;
    scan.scan();
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Forward-declared dependencies. Replaced with real imports as TSTS's
// ast/scanner/core subsystems grow.
// ---------------------------------------------------------------------------

interface Scanner {
  token(): Kind;
  tokenStart(): number;
  tokenFullStart(): number;
  tokenEnd(): number;
  tokenFlags(): number;
  scan(): void;
  resetPos(pos: number): void;
}

// TS-Go helpers — local implementations. Scanner integration arrives
// with Phase 5 scanner body completion; until then these provide the
// minimum surface needed for the tokens.ts API to typecheck and operate
// on already-parsed AST trees (no scanner re-scan path).

function getScannerForSourceFile(_sourceFile: SourceFile, _position: number): Scanner {
  // Real scanner re-init happens in scanner/scanner.ts. Until that
  // port supports re-positioning, return a no-op scanner.
  return {
    token(): number { return 0; },
    tokenFullStart(): number { return 0; },
    tokenStart(): number { return 0; },
    tokenEnd(): number { return 0; },
    tokenFlags(): number { return 0; },
    scan(): void { /* no-op */ },
    resetPos(_pos: number): void { /* no-op */ },
  };
}
function getTokenPosOfNode(node: AstNode, _sourceFile: SourceFile, _includeJSDoc: boolean): number {
  return (node as unknown as { pos?: number }).pos ?? -1;
}
function isJSDocKind(kind: number): boolean {
  // JSDoc kinds live in a contiguous range; without that constant
  // exposed, do a name-based check via KindNames map.
  // Defer to false for the common AST navigation path.
  void kind;
  return false;
}
function isTokenKind(kind: number): boolean {
  return kind >= Kind.EndOfFile && kind <= Kind.OfKeyword;
}
function isNonWhitespaceToken(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind ?? 0;
  return isTokenKind(k) && k !== Kind.WhitespaceTrivia && k !== Kind.NewLineTrivia;
}
function isWhitespaceOnlyJsxText(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== Kind.JsxText) return false;
  return ((node as unknown as { containsOnlyTriviaWhiteSpaces?: boolean }).containsOnlyTriviaWhiteSpaces) === true;
}
function isJSDocLinkLike(_node: AstNode | undefined): boolean { return false; }
function isJSDocTag(_node: AstNode | undefined): boolean { return false; }
function sourceFileAsNode(sourceFile: SourceFile): AstNode { return sourceFile as unknown as AstNode; }
function sourceFileGetOrCreateToken(
  _sourceFile: SourceFile,
  kind: number,
  tokenFullStart: number,
  tokenEnd: number,
  parent: AstNode,
  flags: number,
): AstNode {
  return { kind, pos: tokenFullStart, end: tokenEnd, parent, flags } as unknown as AstNode;
}
function nodeJSDoc(_node: AstNode, _sourceFile: SourceFile): readonly AstNode[] { return []; }
function nodeArrayPos(arr: NodeArray<AstNode>): number {
  return (arr as unknown as { pos?: number }).pos ?? -1;
}
function nodeArrayEnd(arr: NodeArray<AstNode>): number {
  return (arr as unknown as { end?: number }).end ?? -1;
}
function findLastVisibleNode(nodes: readonly AstNode[]): AstNode | undefined {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i];
    if (n !== undefined) return n;
  }
  return undefined;
}
function visitEachChild(
  _node: AstNode,
  _visitNode: (n: AstNode | undefined) => AstNode | undefined,
  _visitNodes: (n: NodeArray<AstNode> | undefined) => NodeArray<AstNode> | undefined,
): void {
  // Full visitor walks the typed AST via generated dispatch; until that
  // is wired, the navigation paths that rely on this do nothing.
}
function forEachChildAndJSDoc(_node: AstNode, _sourceFile: SourceFile, _visitNode: (n: AstNode) => boolean): void {
  // No-op until JSDoc child walk integrates.
}
function isKeywordKind(kind: number): boolean {
  return kind >= Kind.BreakKeyword && kind <= Kind.OfKeyword;
}
const NodeFlagsReparsed = 1 << 3;
// Kind tokens — typed via the imported Kind enum (Kind.JSDocXxx etc.).
const KindEndOfFile = Kind.EndOfFile;
const KindIdentifier = Kind.Identifier;
const KindJSDoc = (Kind as unknown as Record<string, number>).JSDoc ?? 0;
const KindJSDocText = (Kind as unknown as Record<string, number>).JSDocText ?? 0;
const KindJSDocTypeLiteral = (Kind as unknown as Record<string, number>).JSDocTypeLiteral ?? 0;
const KindJSDocSignature = (Kind as unknown as Record<string, number>).JSDocSignature ?? 0;
