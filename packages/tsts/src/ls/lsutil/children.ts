import {
  Kind,
  NodeFlags,
  type Node,
  type NodeArray,
  type SourceFile,
  isIdentifier,
  positionIsSynthesized,
  sourceFileText,
} from "../../ast/index.js";

export function getLastChild(node: Node, sourceFile: SourceFile): Node | undefined {
  const lastChildNode = getLastVisitedChild(node, sourceFile);
  if (lastChildNode !== undefined && lastChildNode.end === node.end) {
    return lastChildNode;
  }

  const lastToken = scanLastTokenAfterLastChild(node, sourceFile, lastChildNode);
  return lastToken ?? lastChildNode;
}

export function getLastToken(node: Node | undefined, sourceFile: SourceFile): Node | undefined {
  if (node === undefined) return undefined;
  if (node.kind < Kind.FirstNode || isIdentifier(node)) return undefined;

  assertHasRealPosition(node);
  const lastChild = getLastChild(node, sourceFile);
  if (lastChild === undefined) return undefined;
  if (lastChild.kind < Kind.FirstNode) return lastChild;
  return getLastToken(lastChild, sourceFile);
}

export function getLastVisitedChild(node: Node, sourceFile: SourceFile): Node | undefined {
  let lastChild: Node | undefined;

  const visitNode = (child: Node): boolean | undefined => {
    if (child !== undefined && (child.flags & NodeFlags.Reparsed) === 0) {
      lastChild = child;
    }
    return undefined;
  };

  const visitNodes = (children: NodeArray<Node>): boolean | undefined => {
    if (children !== undefined && children.length > 0) {
      for (let index = children.length - 1; index >= 0; index -= 1) {
        const child = children[index]!;
        if ((child.flags & NodeFlags.Reparsed) === 0) {
          lastChild = child;
          break;
        }
      }
    }
    return undefined;
  };

  node.forEachChild(visitNode, visitNodes);
  return lastChild;
}

export function assertHasRealPosition(node: Node): void {
  if (positionIsSynthesized(node.pos) || positionIsSynthesized(node.end)) {
    throw new Error("Node must have a real position for this operation.");
  }
}

function scanLastTokenAfterLastChild(node: Node, sourceFile: SourceFile, lastChildNode: Node | undefined): Node | undefined {
  const text = sourceFileText(sourceFile);
  const scanStart = lastChildNode?.end ?? node.pos;
  let token: Node | undefined;
  let index = scanStart;
  while (index < node.end) {
    const current = scanNextPunctuationToken(text, index, node.end, node);
    if (current === undefined) break;
    token = current;
    index = current.end;
  }
  return token;
}

function scanNextPunctuationToken(text: string, start: number, end: number, parent: Node): Node | undefined {
  let index = skipTrivia(text, start, end);
  if (index >= end) return undefined;

  const ch = text[index];
  if (ch === ";") return syntheticToken(Kind.SemicolonToken, index, index + 1, parent);
  if (ch === ",") return syntheticToken(Kind.CommaToken, index, index + 1, parent);
  if (ch === "}") return syntheticToken(Kind.CloseBraceToken, index, index + 1, parent);
  if (ch === "{") return syntheticToken(Kind.OpenBraceToken, index, index + 1, parent);
  if (ch === ")") return syntheticToken(Kind.CloseParenToken, index, index + 1, parent);
  if (ch === "]") return syntheticToken(Kind.CloseBracketToken, index, index + 1, parent);
  return undefined;
}

export function skipTrivia(text: string, start: number, end: number): number {
  let index = start;
  while (index < end) {
    const ch = text[index];
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || ch === "\v" || ch === "\f") {
      index += 1;
      continue;
    }
    if (ch === "/" && index + 1 < end && text[index + 1] === "/") {
      index += 2;
      while (index < end && text[index] !== "\n" && text[index] !== "\r") index += 1;
      continue;
    }
    if (ch === "/" && index + 1 < end && text[index + 1] === "*") {
      index += 2;
      while (index + 1 < end && !(text[index] === "*" && text[index + 1] === "/")) index += 1;
      index = Math.min(index + 2, end);
      continue;
    }
    break;
  }
  return index;
}

function syntheticToken(kind: Kind, pos: number, end: number, parent: Node): Node {
  return {
    kind,
    pos,
    end,
    parent,
    flags: NodeFlags.None,
    forEachChild: () => undefined,
    getSourceFile: () => parent.getSourceFile(),
  };
}
