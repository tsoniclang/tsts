import {
  Kind,
  type Node,
  type SourceFile,
  findAncestor,
  getECMALineOfPosition,
  isFunctionBlock,
  isModuleBlock,
  sourceFileText,
} from "../../ast/index.js";
import { getLastChild, getLastToken, skipTrivia } from "./children.js";

export function positionIsASICandidate(pos: number, context: Node, file: SourceFile): boolean {
  const contextAncestor = findAncestorOrQuit(context, (ancestor) => {
    if (ancestor.end !== pos) return "quit";
    return syntaxMayBeASICandidate(ancestor.kind) ? "found" : "continue";
  });

  return contextAncestor !== undefined && nodeIsASICandidate(contextAncestor, file);
}

export function syntaxMayBeASICandidate(kind: Kind): boolean {
  return syntaxRequiresTrailingCommaOrSemicolonOrASI(kind)
    || syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind)
    || syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind)
    || syntaxRequiresTrailingSemicolonOrASI(kind);
}

export function syntaxRequiresTrailingCommaOrSemicolonOrASI(kind: Kind): boolean {
  return kind === Kind.CallSignature
    || kind === Kind.ConstructSignature
    || kind === Kind.IndexSignature
    || kind === Kind.PropertySignature
    || kind === Kind.MethodSignature;
}

export function syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind: Kind): boolean {
  return kind === Kind.FunctionDeclaration
    || kind === Kind.Constructor
    || kind === Kind.MethodDeclaration
    || kind === Kind.GetAccessor
    || kind === Kind.SetAccessor;
}

export function syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind: Kind): boolean {
  return kind === Kind.ModuleDeclaration;
}

export function syntaxRequiresTrailingSemicolonOrASI(kind: Kind): boolean {
  return kind === Kind.VariableStatement
    || kind === Kind.ExpressionStatement
    || kind === Kind.DoStatement
    || kind === Kind.ContinueStatement
    || kind === Kind.BreakStatement
    || kind === Kind.ReturnStatement
    || kind === Kind.ThrowStatement
    || kind === Kind.DebuggerStatement
    || kind === Kind.PropertyDeclaration
    || kind === Kind.TypeAliasDeclaration
    || kind === Kind.ImportDeclaration
    || kind === Kind.ImportEqualsDeclaration
    || kind === Kind.ExportDeclaration
    || kind === Kind.NamespaceExportDeclaration
    || kind === Kind.ExportAssignment;
}

export function nodeIsASICandidate(node: Node, file: SourceFile): boolean {
  const lastToken = getLastToken(node, file);
  if (lastToken !== undefined && lastToken.kind === Kind.SemicolonToken) {
    return false;
  }

  if (syntaxRequiresTrailingCommaOrSemicolonOrASI(node.kind)) {
    if (lastToken !== undefined && lastToken.kind === Kind.CommaToken) {
      return false;
    }
  } else if (syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(node.kind)) {
    const lastChild = getLastChild(node, file);
    if (lastChild !== undefined && isModuleBlock(lastChild)) {
      return false;
    }
  } else if (syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(node.kind)) {
    const lastChild = getLastChild(node, file);
    if (lastChild !== undefined && isFunctionBlock(lastChild)) {
      return false;
    }
  } else if (!syntaxRequiresTrailingSemicolonOrASI(node.kind)) {
    return false;
  }

  if (node.kind === Kind.DoStatement) {
    return true;
  }

  const topNode = findAncestor(node, (ancestor) => ancestor.parent === undefined);
  if (topNode === undefined) return true;

  const nextToken = findNextTokenAfterNode(node, topNode, file);
  if (nextToken === undefined || nextToken.kind === Kind.CloseBraceToken) {
    return true;
  }

  const startLine = getECMALineOfPosition(file, node.end);
  const endLine = getECMALineOfPosition(file, nextToken.pos);
  return startLine !== endLine;
}

type FindAncestorOrQuitResult = "found" | "continue" | "quit";

function findAncestorOrQuit(node: Node, predicate: (ancestor: Node) => FindAncestorOrQuitResult): Node | undefined {
  let ancestor: Node | undefined = node;
  while (ancestor !== undefined) {
    const result = predicate(ancestor);
    if (result === "found") return ancestor;
    if (result === "quit") return undefined;
    ancestor = ancestor.parent;
  }
  return undefined;
}

function findNextTokenAfterNode(node: Node, topNode: Node, file: SourceFile): Node | undefined {
  const text = sourceFileText(file);
  const index = skipTrivia(text, node.end, topNode.end);
  if (index >= topNode.end) return undefined;
  const ch = text[index];
  if (ch === "}") return syntheticToken(Kind.CloseBraceToken, index, index + 1, topNode);
  if (ch === ";") return syntheticToken(Kind.SemicolonToken, index, index + 1, topNode);
  if (ch === ",") return syntheticToken(Kind.CommaToken, index, index + 1, topNode);
  return syntheticToken(Kind.Identifier, index, index + 1, topNode);
}

function syntheticToken(kind: Kind, pos: number, end: number, parent: Node): Node {
  return {
    kind,
    pos,
    end,
    parent,
    flags: 0,
    forEachChild: () => undefined,
    getSourceFile: () => parent.getSourceFile(),
  };
}
