import {
  Kind,
  NodeFlags,
  nodeIsMissing,
  nodeIsPresent,
  sourceFileText,
  type Node,
  type NodeArray,
  type SourceFile,
} from "../../ast/index.js";
import { createLiveScanner } from "../../scanner/index.js";
import { getLastVisitedChild } from "./children.js";

export function positionBelongsToNode(candidate: Node, position: number, file: SourceFile): boolean {
  if (candidate.pos > position) {
    throw new Error("Expected candidate.pos <= position");
  }
  return position < candidate.end || !isCompletedNode(candidate, file);
}

export function isCompletedNode(node: Node | undefined, sourceFile: SourceFile): boolean {
  if (node === undefined || nodeIsMissing(node)) {
    return false;
  }

  switch (node.kind) {
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ObjectLiteralExpression:
    case Kind.ObjectBindingPattern:
    case Kind.TypeLiteral:
    case Kind.Block:
    case Kind.ModuleBlock:
    case Kind.CaseBlock:
    case Kind.NamedImports:
    case Kind.NamedExports:
      return nodeEndsWith(node, Kind.CloseBraceToken, sourceFile);

    case Kind.CatchClause:
      return isCompletedNode(bodyOf(node), sourceFile);

    case Kind.NewExpression:
      if (argumentsOf(node) === undefined) {
        return true;
      }
      return nodeEndsWith(node, Kind.CloseParenToken, sourceFile);

    case Kind.CallExpression:
    case Kind.ParenthesizedExpression:
    case Kind.ParenthesizedType:
      return nodeEndsWith(node, Kind.CloseParenToken, sourceFile);

    case Kind.FunctionType:
    case Kind.ConstructorType:
      return isCompletedNode(typeOf(node), sourceFile);

    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.ConstructSignature:
    case Kind.CallSignature:
    case Kind.ArrowFunction:
      if (bodyOf(node) !== undefined) {
        return isCompletedNode(bodyOf(node), sourceFile);
      }
      if (typeOf(node) !== undefined) {
        return isCompletedNode(typeOf(node), sourceFile);
      }
      return hasChildOfKind(node, Kind.CloseParenToken, sourceFile);

    case Kind.ModuleDeclaration:
      return bodyOf(node) !== undefined && isCompletedNode(bodyOf(node), sourceFile);

    case Kind.IfStatement:
      if (elseStatementOf(node) !== undefined) {
        return isCompletedNode(elseStatementOf(node), sourceFile);
      }
      return isCompletedNode(thenStatementOf(node), sourceFile);

    case Kind.ExpressionStatement:
      return isCompletedNode(expressionOf(node), sourceFile) ||
        hasChildOfKind(node, Kind.SemicolonToken, sourceFile);

    case Kind.ArrayLiteralExpression:
    case Kind.ArrayBindingPattern:
    case Kind.ElementAccessExpression:
    case Kind.ComputedPropertyName:
    case Kind.TupleType:
      return nodeEndsWith(node, Kind.CloseBracketToken, sourceFile);

    case Kind.IndexSignature:
      if (typeOf(node) !== undefined) {
        return isCompletedNode(typeOf(node), sourceFile);
      }
      return hasChildOfKind(node, Kind.CloseBracketToken, sourceFile);

    case Kind.CaseClause:
    case Kind.DefaultClause:
      return false;

    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.WhileStatement:
      return isCompletedNode(statementOf(node), sourceFile);

    case Kind.DoStatement:
      if (hasChildOfKind(node, Kind.WhileKeyword, sourceFile)) {
        return nodeEndsWith(node, Kind.CloseParenToken, sourceFile);
      }
      return isCompletedNode(statementOf(node), sourceFile);

    case Kind.TypeQuery:
      return isCompletedNode(exprNameOf(node), sourceFile);

    case Kind.TypeOfExpression:
    case Kind.DeleteExpression:
    case Kind.VoidExpression:
    case Kind.YieldExpression:
    case Kind.SpreadElement:
      return isCompletedNode(expressionOf(node), sourceFile);

    case Kind.TaggedTemplateExpression:
      return isCompletedNode(templateOf(node), sourceFile);

    case Kind.TemplateExpression: {
      const spans = templateSpansOf(node);
      if (spans === undefined) {
        return false;
      }
      return isCompletedNode(spans[spans.length - 1], sourceFile);
    }

    case Kind.TemplateSpan:
      return nodeIsPresent(literalOf(node));

    case Kind.ExportDeclaration:
    case Kind.ImportDeclaration:
      return nodeIsPresent(moduleSpecifierOf(node));

    case Kind.PrefixUnaryExpression:
      return isCompletedNode(operandOf(node), sourceFile);

    case Kind.BinaryExpression:
      return isCompletedNode(rightOf(node), sourceFile);

    case Kind.ConditionalExpression:
      return isCompletedNode(whenFalseOf(node), sourceFile);

    default:
      return true;
  }
}

function nodeEndsWith(node: Node, expectedLastToken: Kind, sourceFile: SourceFile): boolean {
  const lastChildNode = getLastVisitedChild(node, sourceFile);
  const lastNodeAndTokens: Kind[] = [];
  let tokenStartPos: number;
  if (lastChildNode !== undefined) {
    lastNodeAndTokens.push(lastChildNode.kind);
    tokenStartPos = lastChildNode.end;
  } else {
    tokenStartPos = node.pos;
  }

  lastNodeAndTokens.push(...scanTokenKinds(sourceFileText(sourceFile), tokenStartPos, node.end));
  if (lastNodeAndTokens.length === 0) {
    return false;
  }

  const lastChild = lastNodeAndTokens[lastNodeAndTokens.length - 1];
  if (lastChild === expectedLastToken) {
    return true;
  }
  if (lastChild === Kind.SemicolonToken && lastNodeAndTokens.length > 1) {
    return lastNodeAndTokens[lastNodeAndTokens.length - 2] === expectedLastToken;
  }
  return false;
}

function hasChildOfKind(containingNode: Node, kind: Kind, sourceFile: SourceFile): boolean {
  let lastNodePos = containingNode.pos;
  const children = immediateChildren(containingNode);
  for (const child of children) {
    if (scanTokenKinds(sourceFileText(sourceFile), lastNodePos, child.pos).includes(kind)) {
      return true;
    }
    if (child.kind === kind) {
      return true;
    }
    lastNodePos = child.end;
  }
  return scanTokenKinds(sourceFileText(sourceFile), lastNodePos, containingNode.end).includes(kind);
}

function immediateChildren(node: Node): readonly Node[] {
  const children: Node[] = [];
  const visitNode = (child: Node): boolean | undefined => {
    if ((child.flags & NodeFlags.Reparsed) === 0) {
      children.push(child);
    }
    return undefined;
  };
  const visitNodes = (nodes: NodeArray<Node>): boolean | undefined => {
    for (const child of nodes) {
      if ((child.flags & NodeFlags.Reparsed) === 0) {
        children.push(child);
      }
    }
    return undefined;
  };
  node.forEachChild(visitNode, visitNodes);
  return children;
}

function scanTokenKinds(text: string, start: number, end: number): readonly Kind[] {
  const result: Kind[] = [];
  let index = Math.max(0, start);
  const stop = Math.min(text.length, end);
  const scanner = createLiveScanner(text);
  scanner.resetPos(index);
  while (index < stop) {
    const kind = scanner.scan();
    const tokenStart = scanner.getTokenStart();
    const tokenEnd = scanner.getTokenEnd();
    if (kind === Kind.EndOfFile || tokenStart >= stop) {
      break;
    }
    result.push(kind);
    if (tokenEnd <= index) break;
    index = tokenEnd;
  }
  return result;
}

type NodeWithBody = Node & { readonly body?: Node };
type NodeWithType = Node & { readonly type?: Node };
type NodeWithArguments = Node & { readonly arguments?: readonly Node[] };
type NodeWithElseStatement = Node & { readonly elseStatement?: Node };
type NodeWithThenStatement = Node & { readonly thenStatement?: Node };
type NodeWithStatement = Node & { readonly statement?: Node };
type NodeWithExpression = Node & { readonly expression?: Node };
type NodeWithExprName = Node & { readonly exprName?: Node };
type NodeWithTemplate = Node & { readonly template?: Node };
type NodeWithTemplateSpans = Node & { readonly templateSpans?: readonly Node[] };
type NodeWithLiteral = Node & { readonly literal?: Node };
type NodeWithModuleSpecifier = Node & { readonly moduleSpecifier?: Node };
type NodeWithOperand = Node & { readonly operand?: Node };
type NodeWithRight = Node & { readonly right?: Node };
type NodeWithWhenFalse = Node & { readonly whenFalse?: Node };

function bodyOf(node: Node): Node | undefined {
  return (node as NodeWithBody).body;
}

function typeOf(node: Node): Node | undefined {
  return (node as NodeWithType).type;
}

function argumentsOf(node: Node): readonly Node[] | undefined {
  return (node as NodeWithArguments).arguments;
}

function elseStatementOf(node: Node): Node | undefined {
  return (node as NodeWithElseStatement).elseStatement;
}

function thenStatementOf(node: Node): Node | undefined {
  return (node as NodeWithThenStatement).thenStatement;
}

function statementOf(node: Node): Node | undefined {
  return (node as NodeWithStatement).statement;
}

function expressionOf(node: Node): Node | undefined {
  return (node as NodeWithExpression).expression;
}

function exprNameOf(node: Node): Node | undefined {
  return (node as NodeWithExprName).exprName;
}

function templateOf(node: Node): Node | undefined {
  return (node as NodeWithTemplate).template;
}

function templateSpansOf(node: Node): readonly Node[] | undefined {
  return (node as NodeWithTemplateSpans).templateSpans;
}

function literalOf(node: Node): Node | undefined {
  return (node as NodeWithLiteral).literal;
}

function moduleSpecifierOf(node: Node): Node | undefined {
  return (node as NodeWithModuleSpecifier).moduleSpecifier;
}

function operandOf(node: Node): Node | undefined {
  return (node as NodeWithOperand).operand;
}

function rightOf(node: Node): Node | undefined {
  return (node as NodeWithRight).right;
}

function whenFalseOf(node: Node): Node | undefined {
  return (node as NodeWithWhenFalse).whenFalse;
}
