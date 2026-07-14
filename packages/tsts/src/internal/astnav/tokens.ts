import type { bool, int } from "../../go/scalars.js";
import { GoAppend, GoNilSlice, GoSliceToZeroLength, type GoPtr, type GoSlice } from "../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend } from "../../go/compat.js";
import type { ModifierList, Node, NodeList } from "../ast/spine.js";
import { Node_AsNode, Node_End, Node_Pos, Node_VisitEachChild, NodeList_End, NodeList_Pos } from "../ast/spine.js";
import type { SourceFile } from "../ast/ast.js";
import { Node_JSDoc, SourceFile_GetOrCreateToken } from "../ast/ast.js";
import type { NodeVisitor, NodeVisitorHooks } from "../ast/visitor.js";
import { NewNodeVisitor } from "../ast/visitor.js";
import type { TokenNode } from "../ast/generated/unions.js";
import type { Kind } from "../ast/generated/kinds.js";
import { KindEndOfFile, KindIdentifier, KindJSDoc, KindJSDocSignature, KindJSDocText, KindJSDocTypeLiteral, KindLessThanLessThanToken } from "../ast/generated/kinds.js";
import { NodeFlagsReparsed } from "../ast/generated/flags.js";
import { IsJSDocKind, IsJSDocLinkLike, IsJSDocTag, IsJSDocSingleCommentNodeComment, IsJSDocSingleCommentNodeList, IsNonWhitespaceToken, IsWhitespaceOnlyJsxText, FindLastVisibleNode, IsJsxChild, ForEachChildAndJSDoc } from "../ast/utilities.js";
import { IsKeywordKind, IsPrivateIdentifier, IsTokenKind } from "../ast/generated/predicates.js";
import { IsPropertyNameLiteral } from "../ast/utilities.js";
import { BinarySearchUniqueFunc } from "../core/binarysearch.js";
import { Filter, Identity, IfElse } from "../core/core.js";
import type { Scanner } from "../scanner/scanner.js";
import { GetScannerForSourceFile, GetTokenPosOfNode, Scanner_ReScanJsxToken, Scanner_Scan, Scanner_Token, Scanner_TokenEnd, Scanner_TokenFlags, Scanner_TokenFullStart, Scanner_TokenStart, Scanner_ResetPos } from "../scanner/scanner.js";
import type { TokenFlags } from "../ast/tokenflags.js";

import type { GoFunc } from "../../go/compat.js";
import { GoSliceMake } from "../../go/compat.js";
import { GoSliceLoad } from "../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::shouldRescanLessThanLessThanToken","kind":"func","status":"implemented","sigHash":"027e136379acde7957dacce28399aee470574eaa534d282f4d10a947c386695d"}
 *
 * Go source:
 * func shouldRescanLessThanLessThanToken(s *scanner.Scanner, containingNode *ast.Node, token ast.Kind) bool {
 * 	return token == ast.KindLessThanLessThanToken && ast.IsJsxChild(containingNode)
 * }
 */
export function shouldRescanLessThanLessThanToken(s: GoPtr<Scanner>, containingNode: GoPtr<Node>, token: Kind): bool {
  return (token === KindLessThanLessThanToken && IsJsxChild(containingNode)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::scanNavigationToken","kind":"func","status":"implemented","sigHash":"ccb74a2af5949e6e264e5672dceb4db4bb1145ee28da97efacec1d68fccb47cb"}
 *
 * Go source:
 * func scanNavigationToken(s *scanner.Scanner, containingNode *ast.Node) ast.Kind {
 * 	token := s.Token()
 * 	if shouldRescanLessThanLessThanToken(s, containingNode, token) {
 * 		return s.ReScanJsxToken(true /*allowMultilineJsxText* /)
 * 	}
 * 	return token
 * }
 */
export function scanNavigationToken(s: GoPtr<Scanner>, containingNode: GoPtr<Node>): Kind {
  const token = Scanner_Token(s);
  if (shouldRescanLessThanLessThanToken(s, containingNode, token)) {
    return Scanner_ReScanJsxToken(s, true /*allowMultilineJsxText*/);
  }
  return token;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::GetTouchingPropertyName","kind":"func","status":"implemented","sigHash":"8b33bd131ce2aa3cde76ded97fef5444895aa8510ed8a0bee63cdb256e29f6fd"}
 *
 * Go source:
 * func GetTouchingPropertyName(sourceFile *ast.SourceFile, position int) *ast.Node {
 * 	return getTokenAtPosition(sourceFile, position, false /*allowPositionInLeadingTrivia* /, func(node *ast.Node) bool {
 * 		return ast.IsPropertyNameLiteral(node) || ast.IsKeywordKind(node.Kind) || ast.IsPrivateIdentifier(node)
 * 	})
 * }
 */
export function GetTouchingPropertyName(sourceFile: GoPtr<SourceFile>, position: int): GoPtr<Node> {
  return getTokenAtPosition(sourceFile, position, false /*allowPositionInLeadingTrivia*/, (node: GoPtr<Node>): bool => {
    return (IsPropertyNameLiteral(node) || IsKeywordKind(node!.Kind) || IsPrivateIdentifier(node)) as bool;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::GetTouchingToken","kind":"func","status":"implemented","sigHash":"c07d3176a13f1bb371f51c7d1fb976a10161a6c782ac14840447baf40153aa65"}
 *
 * Go source:
 * func GetTouchingToken(sourceFile *ast.SourceFile, position int) *ast.Node {
 * 	return getTokenAtPosition(sourceFile, position, false /*allowPositionInLeadingTrivia* /, nil)
 * }
 */
export function GetTouchingToken(sourceFile: GoPtr<SourceFile>, position: int): GoPtr<Node> {
  return getTokenAtPosition(sourceFile, position, false /*allowPositionInLeadingTrivia*/, undefined!);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::GetTokenAtPosition","kind":"func","status":"implemented","sigHash":"699149b51222a5f13d162e47cdfcc39f1d8dc3f52733f22d56fa762c6a914f6c"}
 *
 * Go source:
 * func GetTokenAtPosition(sourceFile *ast.SourceFile, position int) *ast.Node {
 * 	return getTokenAtPosition(sourceFile, position, true /*allowPositionInLeadingTrivia* /, nil)
 * }
 */
export function GetTokenAtPosition(sourceFile: GoPtr<SourceFile>, position: int): GoPtr<Node> {
  return getTokenAtPosition(sourceFile, position, true /*allowPositionInLeadingTrivia*/, undefined!);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::getTokenAtPosition","kind":"func","status":"implemented","sigHash":"563d8d71be2eae8e3d04988705a3778a857db560c3a2eab99d2113efab2ad4ec"}
 *
 * Go source:
 * func getTokenAtPosition(
 * 	sourceFile *ast.SourceFile,
 * 	position int,
 * 	allowPositionInLeadingTrivia bool,
 * 	includePrecedingTokenAtEndPosition func(node *ast.Node) bool,
 * ) *ast.Node {
 * 	// getTokenAtPosition returns a token at the given position in the source file.
 * 	// The token can be a real node in the AST, or a synthesized token constructed
 * 	// with information from the scanner. Synthesized tokens are only created when
 * 	// needed, and they are stored in the source file's token cache such that multiple
 * 	// calls to getTokenAtPosition with the same position will return the same object
 * 	// in memory. If there is no token at the given position (possible when
 * 	// `allowPositionInLeadingTrivia` is false), the lowest node that encloses the
 * 	// position is returned.
 * 
 * 	// `next` tracks the node whose children will be visited on the next iteration.
 * 	// `prevSubtree` is a node whose end position is equal to the target position,
 * 	// only if `includePrecedingTokenAtEndPosition` is provided. Once set, the next
 * 	// iteration of the loop will test the rightmost token of `prevSubtree` to see
 * 	// if it should be returned.
 * 	var next, prevSubtree *ast.Node
 * 	current := sourceFile.AsNode()
 * 	// `left` tracks the lower boundary of the node/token that could be returned,
 * 	// and is eventually the scanner's start position, if the scanner is used.
 * 	left := 0
 * 	// `nodeAfterLeft` tracks the first node we visit after visiting the node that advances `left`.
 * 	// When scanning in between nodes for token, we should only scan up to the start of `nodeAfterLeft`.
 * 	var nodeAfterLeft *ast.Node
 * 
 * 	testNode := func(node *ast.Node) int {
 * 		if node.Kind != ast.KindEndOfFile && node.End() == position &&
 * 			includePrecedingTokenAtEndPosition != nil && node.Flags&ast.NodeFlagsReparsed == 0 {
 * 			prevSubtree = node
 * 		}
 * 
 * 		// A node "contains" the position if position < end, except nodes at the file end
 * 		// treat end as inclusive (there's nowhere else to look). This applies to the EOF
 * 		// token itself, and to JSDoc nodes reaching EOF (e.g. unterminated JSDoc comments).
 * 		if node.End() < position || node.End() == position &&
 * 			node.Kind != ast.KindEndOfFile &&
 * 			(!ast.IsJSDocKind(node.Kind) || node.End() != sourceFile.EndOfFileToken.End()) {
 * 			return -1
 * 		}
 * 		nodePos := getPosition(node, sourceFile, allowPositionInLeadingTrivia)
 * 		if nodePos > position {
 * 			return 1
 * 		}
 * 		return 0
 * 	}
 * 
 * 	// We zero in on the node that contains the target position by visiting each
 * 	// child and JSDoc comment of the current node. Node children are walked in
 * 	// order, while node lists are binary searched.
 * 	visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
 * 		// We can't abort visiting children, so once a match is found, we set `next`
 * 		// and do nothing on subsequent visits.
 * 		if node == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
 * 			return nil
 * 		}
 * 		if nodeAfterLeft == nil {
 * 			nodeAfterLeft = node
 * 		}
 * 		if next == nil {
 * 			result := testNode(node)
 * 			switch result {
 * 			case -1:
 * 				if !ast.IsJSDocKind(node.Kind) {
 * 					// We can't move the left boundary into or beyond JSDoc,
 * 					// because we may end up returning the token after this JSDoc,
 * 					// constructing it with the scanner, and we need to include
 * 					// all its leading trivia in its position.
 * 					left = node.End()
 * 				}
 * 				nodeAfterLeft = nil
 * 			case 0:
 * 				next = node
 * 			}
 * 		}
 * 		return node
 * 	}
 * 
 * 	visitNodeList := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
 * 		if nodeList == nil || len(nodeList.Nodes) == 0 {
 * 			return nodeList
 * 		}
 * 		if nodeAfterLeft == nil {
 * 			for _, node := range nodeList.Nodes {
 * 				if node.Flags&ast.NodeFlagsReparsed == 0 {
 * 					nodeAfterLeft = node
 * 					break
 * 				}
 * 			}
 * 		}
 * 		if next == nil {
 * 			if nodeList.End() == position && includePrecedingTokenAtEndPosition != nil {
 * 				left = nodeList.End()
 * 				nodeAfterLeft = nil
 * 				for i := len(nodeList.Nodes) - 1; i >= 0; i-- {
 * 					if nodeList.Nodes[i].Flags&ast.NodeFlagsReparsed == 0 {
 * 						prevSubtree = nodeList.Nodes[i]
 * 						break
 * 					}
 * 				}
 * 			} else if nodeList.End() <= position {
 * 				left = nodeList.End()
 * 				nodeAfterLeft = nil
 * 			} else if nodeList.Pos() <= position {
 * 				nodes := nodeList.Nodes
 * 				index, match := core.BinarySearchUniqueFunc(nodes, func(middle int, node *ast.Node) int {
 * 					if node.Flags&ast.NodeFlagsReparsed != 0 {
 * 						return 0
 * 					}
 * 					cmp := testNode(node)
 * 					if cmp < 0 {
 * 						left = node.End()
 * 						nodeAfterLeft = nil
 * 						for i := middle + 1; i < len(nodes); i++ {
 * 							if nodes[i].Flags&ast.NodeFlagsReparsed == 0 {
 * 								nodeAfterLeft = nodes[i]
 * 								break
 * 							}
 * 						}
 * 					}
 * 					return cmp
 * 				})
 * 				if match && nodes[index].Flags&ast.NodeFlagsReparsed != 0 {
 * 					// filter and search again
 * 					nodes = core.Filter(nodes, func(node *ast.Node) bool {
 * 						return node.Flags&ast.NodeFlagsReparsed == 0
 * 					})
 * 					index, match = core.BinarySearchUniqueFunc(nodes, func(middle int, node *ast.Node) int {
 * 						cmp := testNode(node)
 * 						if cmp < 0 {
 * 							left = node.End()
 * 							if middle+1 < len(nodes) {
 * 								nodeAfterLeft = nodes[middle+1]
 * 							} else {
 * 								nodeAfterLeft = nil
 * 							}
 * 						}
 * 						return cmp
 * 					})
 * 				}
 * 				if match {
 * 					next = nodes[index]
 * 				}
 * 			}
 * 		}
 * 		return nodeList
 * 	}
 * 
 * 	for {
 * 		VisitEachChildAndJSDoc(current, sourceFile, visitNode, visitNodeList)
 * 		// If prevSubtree was set on the last iteration, it ends at the target position.
 * 		// Check if the rightmost token of prevSubtree should be returned based on the
 * 		// `includePrecedingTokenAtEndPosition` callback.
 * 		if prevSubtree != nil {
 * 			child := FindPrecedingTokenEx(sourceFile, position, prevSubtree, false /*excludeJSDoc* /)
 * 			if child != nil && child.End() == position && includePrecedingTokenAtEndPosition(child) {
 * 				// Optimization: includePrecedingTokenAtEndPosition only ever returns true
 * 				// for real AST nodes, so we don't run the scanner here.
 * 				return child
 * 			}
 * 			prevSubtree = nil
 * 		}
 * 
 * 		// No node was found that contains the target position, so we've gone as deep as
 * 		// we can in the AST. We've either found a token, or we need to run the scanner
 * 		// to construct one that isn't stored in the AST.
 * 		if next == nil {
 * 			if ast.IsTokenKind(current.Kind) || shouldSkipChild(current) {
 * 				return current
 * 			}
 * 			scanner := scanner.GetScannerForSourceFile(sourceFile, left)
 * 			end := current.End()
 * 			// We should only scan up to the start of the next node in the AST after the node ending at position `left`.
 * 			// It is necessary to enforce this invariant in cases where `position` occurs in between two node/tokens,
 * 			// such that we would not find a token in the loop below before we reach the next node.
 * 			// We can fall into this case when `allowPositionInLeadingTrivia` is false and `position` is in a leading trivia,
 * 			// or when `position` would be in the leading trivia of a node but this node is inside JSDoc:
 * 			// ```
 * 			// /**
 * 			//  * @type {{
 * 			//  * /*$* / identifier: boolean;
 * 			//  * }}
 * 			//  * /
 * 			// ```
 * 			// The position of marker '$' falls in between the asterisk token and the identifier token, but is not
 * 			// part of the leading trivia for `identifier`.
 * 			if nodeAfterLeft != nil {
 * 				end = nodeAfterLeft.Pos()
 * 			}
 * 			for left < end {
 * 				token := scanNavigationToken(scanner, current)
 * 				tokenFullStart := scanner.TokenFullStart()
 * 				tokenStart := core.IfElse(allowPositionInLeadingTrivia, tokenFullStart, scanner.TokenStart())
 * 				tokenEnd := scanner.TokenEnd()
 * 				flags := scanner.TokenFlags()
 * 				if tokenEnd > end {
 * 					break
 * 				}
 * 				if tokenStart <= position && (position < tokenEnd) {
 * 					if token == ast.KindIdentifier || !ast.IsTokenKind(token) {
 * 						if ast.IsJSDocKind(current.Kind) {
 * 							return current
 * 						}
 * 						panic(fmt.Sprintf("did not expect %s to have %s in its trivia", current.Kind.String(), token.String()))
 * 					}
 * 					return sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, current, flags)
 * 				}
 * 				if includePrecedingTokenAtEndPosition != nil && tokenEnd == position {
 * 					prevToken := sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, current, flags)
 * 					if includePrecedingTokenAtEndPosition(prevToken) {
 * 						return prevToken
 * 					}
 * 				}
 * 				left = tokenEnd
 * 				scanner.Scan()
 * 			}
 * 			return current
 * 		}
 * 		current = next
 * 		left = current.Pos()
 * 		nodeAfterLeft = nil
 * 		next = nil
 * 	}
 * }
 */
export function getTokenAtPosition(sourceFile: GoPtr<SourceFile>, position: int, allowPositionInLeadingTrivia: bool, includePrecedingTokenAtEndPosition: GoFunc<(node: GoPtr<Node>) => bool>): GoPtr<Node> {
  let next: GoPtr<Node> = undefined;
  let prevSubtree: GoPtr<Node> = undefined;
  let current: GoPtr<Node> = Node_AsNode(sourceFile);
  let left: int = 0;
  let nodeAfterLeft: GoPtr<Node> = undefined;

  const testNode = (node: GoPtr<Node>): int => {
    if (node!.Kind !== KindEndOfFile && Node_End(node) === position &&
      includePrecedingTokenAtEndPosition !== undefined && (node!.Flags & NodeFlagsReparsed) === 0) {
      prevSubtree = node;
    }

    if (Node_End(node) < position || (Node_End(node) === position &&
      node!.Kind !== KindEndOfFile &&
      (!IsJSDocKind(node!.Kind) || Node_End(node) !== Node_End(sourceFile!.EndOfFileToken)))) {
      return -1;
    }
    const nodePos = getPosition(node, sourceFile, allowPositionInLeadingTrivia);
    if (nodePos > position) {
      return 1;
    }
    return 0;
  };

  const visitNode = (node: GoPtr<Node>, _v: GoPtr<NodeVisitor>): GoPtr<Node> => {
    if (node === undefined || (node.Flags & NodeFlagsReparsed) !== 0) {
      return undefined;
    }
    if (nodeAfterLeft === undefined) {
      nodeAfterLeft = node;
    }
    if (next === undefined) {
      const result = testNode(node);
      switch (result) {
        case -1:
          if (!IsJSDocKind(node.Kind)) {
            left = Node_End(node);
          }
          nodeAfterLeft = undefined;
          break;
        case 0:
          next = node;
          break;
      }
    }
    return node;
  };

  const visitNodeList = (nodeList: GoPtr<NodeList>, _v: GoPtr<NodeVisitor>): GoPtr<NodeList> => {
    if (nodeList === undefined || nodeList.Nodes.length === 0) {
      return nodeList;
    }
    if (nodeAfterLeft === undefined) {
      for (
        let __goRangeSlice = nodeList.Nodes,
          __goRangeLength = __goRangeSlice.length,
          __goRangeValueOps = GoPointerValueOps<Node>(),
          __goRangeIndex = 0;
        __goRangeIndex < __goRangeLength;
        __goRangeIndex++
      ) {
        const node = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
        if ((node!.Flags & NodeFlagsReparsed) === 0) {
          nodeAfterLeft = node;
          break;
        }
      }
    }
    if (next === undefined) {
      if (NodeList_End(nodeList) === position && includePrecedingTokenAtEndPosition !== undefined) {
        left = NodeList_End(nodeList);
        nodeAfterLeft = undefined;
        for (let i = nodeList.Nodes.length - 1; i >= 0; i--) {
          if ((GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>())!.Flags & NodeFlagsReparsed) === 0) {
            prevSubtree = GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>());
            break;
          }
        }
      } else if (NodeList_End(nodeList) <= position) {
        left = NodeList_End(nodeList);
        nodeAfterLeft = undefined;
      } else if (NodeList_Pos(nodeList) <= position) {
        let nodes = nodeList.Nodes;
        let [index, match] = BinarySearchUniqueFunc(nodes, (middle: int, node: GoPtr<Node>): int => {
          if ((node!.Flags & NodeFlagsReparsed) !== 0) {
            return 0;
          }
          const cmp = testNode(node);
          if (cmp < 0) {
            left = Node_End(node);
            nodeAfterLeft = undefined;
            for (let i = middle + 1; i < nodes.length; i++) {
              if ((GoSliceLoad(nodes, i, GoPointerValueOps<Node>())!.Flags & NodeFlagsReparsed) === 0) {
                nodeAfterLeft = GoSliceLoad(nodes, i, GoPointerValueOps<Node>());
                break;
              }
            }
          }
          return cmp;
        });
        if (match && (GoSliceLoad(nodes, index, GoPointerValueOps<Node>())!.Flags & NodeFlagsReparsed) !== 0) {
          // filter and search again
          nodes = Filter(nodes, (node: GoPtr<Node>): bool => {
            return ((node!.Flags & NodeFlagsReparsed) === 0) as bool;
          });
          [index, match] = BinarySearchUniqueFunc(nodes, (middle: int, node: GoPtr<Node>): int => {
            const cmp = testNode(node);
            if (cmp < 0) {
              left = Node_End(node);
              if (middle + 1 < nodes.length) {
                nodeAfterLeft = GoSliceLoad(nodes, middle + 1, GoPointerValueOps<Node>());
              } else {
                nodeAfterLeft = undefined;
              }
            }
            return cmp;
          });
        }
        if (match) {
          next = GoSliceLoad(nodes, index, GoPointerValueOps<Node>());
        }
      }
    }
    return nodeList;
  };

  for (;;) {
    VisitEachChildAndJSDoc(current, sourceFile, visitNode, visitNodeList);
    if (prevSubtree !== undefined) {
      const child = FindPrecedingTokenEx(sourceFile, position, prevSubtree, false /*excludeJSDoc*/);
      if (child !== undefined && Node_End(child) === position && includePrecedingTokenAtEndPosition!(child)) {
        return child;
      }
      prevSubtree = undefined;
    }

    if (next === undefined) {
      if (IsTokenKind(current!.Kind) || shouldSkipChild(current)) {
        return current;
      }
      const s = GetScannerForSourceFile(sourceFile, left);
      let end: int = Node_End(current);
      if (nodeAfterLeft !== undefined) {
        end = Node_Pos(nodeAfterLeft);
      }
      while (left < end) {
        const token = scanNavigationToken(s, current);
        const tokenFullStart = Scanner_TokenFullStart(s);
        const tokenStart = IfElse(allowPositionInLeadingTrivia, tokenFullStart, Scanner_TokenStart(s));
        const tokenEnd = Scanner_TokenEnd(s);
        const flags: TokenFlags = Scanner_TokenFlags(s);
        if (tokenEnd > end) {
          break;
        }
        if (tokenStart <= position && position < tokenEnd) {
          if (token === KindIdentifier || !IsTokenKind(token)) {
            if (IsJSDocKind(current!.Kind)) {
              return current;
            }
            throw new globalThis.Error(`did not expect ${current!.Kind} to have ${token} in its trivia`);
          }
          return SourceFile_GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
        }
        if (includePrecedingTokenAtEndPosition !== undefined && tokenEnd === position) {
          const prevToken = SourceFile_GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
          if (includePrecedingTokenAtEndPosition(prevToken)) {
            return prevToken;
          }
        }
        left = tokenEnd;
        Scanner_Scan(s);
      }
      return current;
    }
    current = next;
    left = Node_Pos(current);
    nodeAfterLeft = undefined;
    next = undefined;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::getPosition","kind":"func","status":"implemented","sigHash":"68b53544318f188b29871d1f93170ca779a016d1b1836c72f92ca6c13e361d2a"}
 *
 * Go source:
 * func getPosition(node *ast.Node, sourceFile *ast.SourceFile, allowPositionInLeadingTrivia bool) int {
 * 	if allowPositionInLeadingTrivia {
 * 		return node.Pos()
 * 	}
 * 	return scanner.GetTokenPosOfNode(node, sourceFile, true /*includeJSDoc* /)
 * }
 */
export function getPosition(node: GoPtr<Node>, sourceFile: GoPtr<SourceFile>, allowPositionInLeadingTrivia: bool): int {
  if (allowPositionInLeadingTrivia) {
    return Node_Pos(node);
  }
  return GetTokenPosOfNode(node, sourceFile, true /*includeJSDoc*/);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::findRightmostNode","kind":"func","status":"implemented","sigHash":"e7d0c8f012ab4c76046b86bbc5739ee82d2c73c3b0e76e859b757385ff581fdd"}
 *
 * Go source:
 * func findRightmostNode(node *ast.Node) *ast.Node {
 * 	var next *ast.Node
 * 	current := node
 * 	visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
 * 		if node != nil {
 * 			next = node
 * 		}
 * 		return node
 * 	}
 * 	visitNodes := func(nodeList *ast.NodeList, visitor *ast.NodeVisitor) *ast.NodeList {
 * 		if nodeList != nil {
 * 			if rightmost := ast.FindLastVisibleNode(nodeList.Nodes); rightmost != nil {
 * 				next = rightmost
 * 			}
 * 		}
 * 		return nodeList
 * 	}
 * 	visitor := getNodeVisitor(visitNode, visitNodes)
 * 
 * 	for {
 * 		current.VisitEachChild(visitor)
 * 		if next == nil {
 * 			return current
 * 		}
 * 		current = next
 * 		next = nil
 * 	}
 * }
 */
export function findRightmostNode(node: GoPtr<Node>): GoPtr<Node> {
  let next: GoPtr<Node> = undefined;
  let current: GoPtr<Node> = node;
  const visitNode = (n: GoPtr<Node>, _v: GoPtr<NodeVisitor>): GoPtr<Node> => {
    if (n !== undefined) {
      next = n;
    }
    return n;
  };
  const visitNodes = (nodeList: GoPtr<NodeList>, _visitor: GoPtr<NodeVisitor>): GoPtr<NodeList> => {
    if (nodeList !== undefined) {
      const rightmost = FindLastVisibleNode(nodeList.Nodes);
      if (rightmost !== undefined) {
        next = rightmost;
      }
    }
    return nodeList;
  };
  const visitor = getNodeVisitor(visitNode, visitNodes);

  for (;;) {
    Node_VisitEachChild(current, visitor);
    if (next === undefined) {
      return current;
    }
    current = next;
    next = undefined;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::VisitEachChildAndJSDoc","kind":"func","status":"implemented","sigHash":"4fe20e31ee2c4ec396334d4a173e048fb3223a33bb16a743e58bf8452aa7c847"}
 *
 * Go source:
 * func VisitEachChildAndJSDoc(
 * 	node *ast.Node,
 * 	sourceFile *ast.SourceFile,
 * 	visitNode func(*ast.Node, *ast.NodeVisitor) *ast.Node,
 * 	visitNodes func(*ast.NodeList, *ast.NodeVisitor) *ast.NodeList,
 * ) {
 * 	visitor := getNodeVisitor(visitNode, visitNodes)
 * 	for _, jsdoc := range node.JSDoc(sourceFile) {
 * 		if visitor.Hooks.VisitNode != nil {
 * 			visitor.Hooks.VisitNode(jsdoc, visitor)
 * 		} else {
 * 			visitor.VisitNode(jsdoc)
 * 		}
 * 	}
 * 	node.VisitEachChild(visitor)
 * }
 */
export function VisitEachChildAndJSDoc(node: GoPtr<Node>, sourceFile: GoPtr<SourceFile>, visitNode: GoFunc<(arg0: GoPtr<Node>, arg1: GoPtr<NodeVisitor>) => GoPtr<Node>>, visitNodes: GoFunc<(arg0: GoPtr<NodeList>, arg1: GoPtr<NodeVisitor>) => GoPtr<NodeList>>): void {
  const visitor = getNodeVisitor(visitNode, visitNodes);
  for (
    let __goRangeSlice = Node_JSDoc(node, sourceFile),
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoPointerValueOps<Node>(),
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const jsdoc = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (visitor!.Hooks.VisitNode !== undefined) {
      visitor!.Hooks.VisitNode(jsdoc, visitor);
    } else {
      // visitor.VisitNode(jsdoc) — corresponds to NodeVisitor_VisitNode
      if (jsdoc !== undefined && visitor!.Visit !== undefined) {
        visitor!.Visit(jsdoc);
      }
    }
  }
  Node_VisitEachChild(node, visitor);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::constGroup::comparisonLessThan+comparisonEqualTo+comparisonGreaterThan","kind":"constGroup","status":"implemented","sigHash":"ae74468f468536b83e7f942c6b992e14e78673b04daf910be90bcb06fc9e4a41"}
 *
 * Go source:
 * const (
 * 	comparisonLessThan    = -1
 * 	comparisonEqualTo     = 0
 * 	comparisonGreaterThan = 1
 * )
 */
export const comparisonLessThan: int = -1;
export const comparisonEqualTo: int = 0;
export const comparisonGreaterThan: int = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::FindPrecedingToken","kind":"func","status":"implemented","sigHash":"906e4c7031610bab8ba501b73dfed1102051945256a5a8867eaed380da34da55"}
 *
 * Go source:
 * func FindPrecedingToken(sourceFile *ast.SourceFile, position int) *ast.Node {
 * 	return FindPrecedingTokenEx(sourceFile, position, nil, false)
 * }
 */
export function FindPrecedingToken(sourceFile: GoPtr<SourceFile>, position: int): GoPtr<Node> {
  return FindPrecedingTokenEx(sourceFile, position, undefined, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::FindPrecedingTokenEx","kind":"func","status":"implemented","sigHash":"5f6f10073037f2fbafba997cb6cfee4a9d727b2556cd10242552ed35a2bd5056"}
 *
 * Go source:
 * func FindPrecedingTokenEx(sourceFile *ast.SourceFile, position int, startNode *ast.Node, excludeJSDoc bool) *ast.Node {
 * 	var find func(node *ast.Node) *ast.Node
 * 	find = func(n *ast.Node) *ast.Node {
 * 		if ast.IsNonWhitespaceToken(n) && n.Kind != ast.KindEndOfFile {
 * 			return n
 * 		}
 * 
 * 		// `foundChild` is the leftmost node that contains the target position.
 * 		// `prevChild` is the last visited child of the current node.
 * 		var foundChild, prevChild *ast.Node
 * 		visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
 * 			// skip synthesized nodes (that will exist now because of jsdoc handling)
 * 			if node == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
 * 				return node
 * 			}
 * 			if foundChild != nil { // We cannot abort visiting children, so once the desired child is found, we do nothing.
 * 				return node
 * 			}
 * 			if position < node.End() && (prevChild == nil || prevChild.End() <= position) {
 * 				foundChild = node
 * 			} else {
 * 				prevChild = node
 * 			}
 * 			return node
 * 		}
 * 		visitNodes := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
 * 			if foundChild != nil {
 * 				return nodeList
 * 			}
 * 			if nodeList != nil && len(nodeList.Nodes) > 0 {
 * 				nodes := nodeList.Nodes
 * 				index, match := core.BinarySearchUniqueFunc(nodes, func(middle int, _ *ast.Node) int {
 * 					// synthetic jsdoc nodes should have jsdocNode.End() <= n.Pos()
 * 					if nodes[middle].Flags&ast.NodeFlagsReparsed != 0 {
 * 						return comparisonLessThan
 * 					}
 * 					if position < nodes[middle].End() {
 * 						if middle == 0 || position >= nodes[middle-1].End() {
 * 							return comparisonEqualTo
 * 						}
 * 						return comparisonGreaterThan
 * 					}
 * 					return comparisonLessThan
 * 				})
 * 
 * 				if match {
 * 					foundChild = nodes[index]
 * 				}
 * 
 * 				validLookupIndex := core.IfElse(match, index-1, len(nodes)-1)
 * 				for i := validLookupIndex; i >= 0; i-- {
 * 					if nodes[i].Flags&ast.NodeFlagsReparsed != 0 {
 * 						continue
 * 					}
 * 					if prevChild == nil {
 * 						prevChild = nodes[i]
 * 					}
 * 				}
 * 			}
 * 			return nodeList
 * 		}
 * 		VisitEachChildAndJSDoc(n, sourceFile, visitNode, visitNodes)
 * 
 * 		if foundChild != nil {
 * 			// Note that the span of a node's tokens is [getStartOfNode(node, ...), node.end).
 * 			// Given that `position < child.end` and child has constituent tokens, we distinguish these cases:
 * 			// 1) `position` precedes `child`'s tokens or `child` has no tokens (ie: in a comment or whitespace preceding `child`):
 * 			// we need to find the last token in a previous child node or child tokens.
 * 			// 2) `position` is within the same span: we recurse on `child`.
 * 			start := GetStartOfNode(foundChild, sourceFile, !excludeJSDoc /*includeJSDoc* /)
 * 			lookInPreviousChild := start >= position || // cursor in the leading trivia or preceding tokens
 * 				!isValidPrecedingNode(foundChild, sourceFile)
 * 			if lookInPreviousChild {
 * 				if position >= foundChild.Pos() {
 * 					// Find jsdoc preceding the foundChild.
 * 					var jsDoc *ast.Node
 * 					nodeJSDoc := n.JSDoc(sourceFile)
 * 					for i := len(nodeJSDoc) - 1; i >= 0; i-- {
 * 						if nodeJSDoc[i].Pos() >= foundChild.Pos() {
 * 							jsDoc = nodeJSDoc[i]
 * 							break
 * 						}
 * 					}
 * 					if jsDoc != nil {
 * 						if !excludeJSDoc && position < jsDoc.End() {
 * 							return find(jsDoc)
 * 						} else {
 * 							return findRightmostValidToken(jsDoc.End(), sourceFile, n, position, excludeJSDoc)
 * 						}
 * 					}
 * 					return findRightmostValidToken(foundChild.Pos(), sourceFile, n, -1 /*position* /, excludeJSDoc)
 * 				} else { // Answer is in tokens between two visited children.
 * 					return findRightmostValidToken(foundChild.Pos(), sourceFile, n, position, excludeJSDoc)
 * 				}
 * 			} else {
 * 				// position is in [foundChild.getStart(), foundChild.End): recur.
 * 				return find(foundChild)
 * 			}
 * 		}
 * 
 * 		// We have two cases here: either the position is at the end of the file,
 * 		// or the desired token is in the unvisited trailing tokens of the current node.
 * 		if position >= n.End() {
 * 			return findRightmostValidToken(n.End(), sourceFile, n, -1 /*position* /, excludeJSDoc)
 * 		} else {
 * 			return findRightmostValidToken(n.End(), sourceFile, n, position, excludeJSDoc)
 * 		}
 * 	}
 * 
 * 	var node *ast.Node
 * 	if startNode != nil {
 * 		node = startNode
 * 	} else {
 * 		node = sourceFile.AsNode()
 * 	}
 * 	result := find(node)
 * 	if result != nil && ast.IsWhitespaceOnlyJsxText(result) {
 * 		panic("Expected result to be a non-whitespace token.")
 * 	}
 * 	return result
 * }
 */
export function FindPrecedingTokenEx(sourceFile: GoPtr<SourceFile>, position: int, startNode: GoPtr<Node>, excludeJSDoc: bool): GoPtr<Node> {
  const find = (n: GoPtr<Node>): GoPtr<Node> => {
    if (IsNonWhitespaceToken(n) && n!.Kind !== KindEndOfFile) {
      return n;
    }

    let foundChild: GoPtr<Node> = undefined;
    let prevChild: GoPtr<Node> = undefined;
    const visitNodeFn = (node: GoPtr<Node>, _v: GoPtr<NodeVisitor>): GoPtr<Node> => {
      // skip synthesized nodes (that will exist now because of jsdoc handling)
      if (node === undefined || (node.Flags & NodeFlagsReparsed) !== 0) {
        return node;
      }
      if (foundChild !== undefined) { // We cannot abort visiting children, so once the desired child is found, we do nothing.
        return node;
      }
      if (position < Node_End(node) && (prevChild === undefined || Node_End(prevChild) <= position)) {
        foundChild = node;
      } else {
        prevChild = node;
      }
      return node;
    };
    const visitNodesFn = (nodeList: GoPtr<NodeList>, _v: GoPtr<NodeVisitor>): GoPtr<NodeList> => {
      if (foundChild !== undefined) {
        return nodeList;
      }
      if (nodeList !== undefined && nodeList.Nodes.length > 0) {
        const nodes = nodeList.Nodes;
        const [index, match] = BinarySearchUniqueFunc(nodes, (middle: int, _node: GoPtr<Node>): int => {
          // synthetic jsdoc nodes should have jsdocNode.End() <= n.Pos()
          if ((GoSliceLoad(nodes, middle, GoPointerValueOps<Node>())!.Flags & NodeFlagsReparsed) !== 0) {
            return comparisonLessThan;
          }
          if (position < Node_End(GoSliceLoad(nodes, middle, GoPointerValueOps<Node>()))) {
            if (middle === 0 || position >= Node_End(GoSliceLoad(nodes, middle - 1, GoPointerValueOps<Node>()))) {
              return comparisonEqualTo;
            }
            return comparisonGreaterThan;
          }
          return comparisonLessThan;
        });

        if (match) {
          foundChild = GoSliceLoad(nodes, index, GoPointerValueOps<Node>());
        }

        const validLookupIndex = IfElse(match, index - 1, nodes.length - 1);
        for (let i = validLookupIndex; i >= 0; i--) {
          if ((GoSliceLoad(nodes, i, GoPointerValueOps<Node>())!.Flags & NodeFlagsReparsed) !== 0) {
            continue;
          }
          if (prevChild === undefined) {
            prevChild = GoSliceLoad(nodes, i, GoPointerValueOps<Node>());
          }
        }
      }
      return nodeList;
    };
    VisitEachChildAndJSDoc(n, sourceFile, visitNodeFn, visitNodesFn);

    if (foundChild !== undefined) {
      const start = GetStartOfNode(foundChild, sourceFile, !excludeJSDoc /*includeJSDoc*/);
      const lookInPreviousChild = start >= position || // cursor in the leading trivia or preceding tokens
        !isValidPrecedingNode(foundChild, sourceFile);
      if (lookInPreviousChild) {
        if (position >= Node_Pos(foundChild)) {
          // Find jsdoc preceding the foundChild.
          let jsDoc: GoPtr<Node> = undefined;
          const nodeJSDoc = Node_JSDoc(n, sourceFile);
          for (let i = nodeJSDoc.length - 1; i >= 0; i--) {
            if (Node_Pos(GoSliceLoad(nodeJSDoc, i, GoPointerValueOps<Node>())) >= Node_Pos(foundChild)) {
              jsDoc = GoSliceLoad(nodeJSDoc, i, GoPointerValueOps<Node>());
              break;
            }
          }
          if (jsDoc !== undefined) {
            if (!excludeJSDoc && position < Node_End(jsDoc)) {
              return find(jsDoc);
            } else {
              return findRightmostValidToken(Node_End(jsDoc), sourceFile, n, position, excludeJSDoc);
            }
          }
          return findRightmostValidToken(Node_Pos(foundChild), sourceFile, n, -1 /*position*/, excludeJSDoc);
        } else { // Answer is in tokens between two visited children.
          return findRightmostValidToken(Node_Pos(foundChild), sourceFile, n, position, excludeJSDoc);
        }
      } else {
        // position is in [foundChild.getStart(), foundChild.End): recur.
        return find(foundChild);
      }
    }

    // We have two cases here: either the position is at the end of the file,
    // or the desired token is in the unvisited trailing tokens of the current node.
    if (position >= Node_End(n)) {
      return findRightmostValidToken(Node_End(n), sourceFile, n, -1 /*position*/, excludeJSDoc);
    } else {
      return findRightmostValidToken(Node_End(n), sourceFile, n, position, excludeJSDoc);
    }
  };

  let node: GoPtr<Node>;
  if (startNode !== undefined) {
    node = startNode;
  } else {
    node = Node_AsNode(sourceFile);
  }
  const result = find(node);
  if (result !== undefined && IsWhitespaceOnlyJsxText(result)) {
    throw new globalThis.Error("Expected result to be a non-whitespace token.");
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::isValidPrecedingNode","kind":"func","status":"implemented","sigHash":"89224758b8ffc08c7bffc07766c51f1d7550aaa115708b33880b5711de7acf1a"}
 *
 * Go source:
 * func isValidPrecedingNode(node *ast.Node, sourceFile *ast.SourceFile) bool {
 * 	if node.Kind == ast.KindEndOfFile {
 * 		return len(node.JSDoc(sourceFile)) > 0
 * 	}
 * 	start := GetStartOfNode(node, sourceFile, false /*includeJSDoc* /)
 * 	width := node.End() - start
 * 	return !(ast.IsWhitespaceOnlyJsxText(node) || width == 0)
 * }
 */
export function isValidPrecedingNode(node: GoPtr<Node>, sourceFile: GoPtr<SourceFile>): bool {
  if (node!.Kind === KindEndOfFile) {
    return (Node_JSDoc(node, sourceFile).length > 0) as bool;
  }
  const start = GetStartOfNode(node, sourceFile, false /*includeJSDoc*/);
  const width = Node_End(node) - start;
  return (!IsWhitespaceOnlyJsxText(node) && width !== 0) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::GetStartOfNode","kind":"func","status":"implemented","sigHash":"6dc07695844b03ac075df2a12c68b0c8084bf3e1204c324ab43cbb53c5974e1d"}
 *
 * Go source:
 * func GetStartOfNode(node *ast.Node, file *ast.SourceFile, includeJSDoc bool) int {
 * 	return scanner.GetTokenPosOfNode(node, file, includeJSDoc)
 * }
 */
export function GetStartOfNode(node: GoPtr<Node>, file: GoPtr<SourceFile>, includeJSDoc: bool): int {
  return GetTokenPosOfNode(node, file, includeJSDoc);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::findRightmostValidToken","kind":"func","status":"implemented","sigHash":"830726f16c0660f53d53e29e960a04da40afcb2a2d13d553ff1fc7a3136799df"}
 *
 * Go source:
 * func findRightmostValidToken(endPos int, sourceFile *ast.SourceFile, containingNode *ast.Node, position int, excludeJSDoc bool) *ast.Node {
 * 	if position == -1 {
 * 		position = containingNode.End()
 * 	}
 * 	var find func(n *ast.Node, endPos int) *ast.Node
 * 	find = func(n *ast.Node, endPos int) *ast.Node {
 * 		if n == nil {
 * 			return nil
 * 		}
 * 		if ast.IsNonWhitespaceToken(n) {
 * 			return n
 * 		}
 * 
 * 		var rightmostValidNode *ast.Node
 * 		rightmostVisitedNodes := make([]*ast.Node, 0, 1) // Nodes after the last valid node.
 * 		hasChildren := false
 * 		shouldVisitNode := func(node *ast.Node) bool {
 * 			// Node is synthetic or out of the desired range: don't visit it.
 * 			return !(node.Flags&ast.NodeFlagsReparsed != 0 ||
 * 				node.End() > endPos || GetStartOfNode(node, sourceFile, !excludeJSDoc /*includeJSDoc* /) >= position)
 * 		}
 * 		visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
 * 			if node == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
 * 				return node
 * 			}
 * 			hasChildren = true
 * 			if !shouldVisitNode(node) {
 * 				return node
 * 			}
 * 			rightmostVisitedNodes = append(rightmostVisitedNodes, node)
 * 			if isValidPrecedingNode(node, sourceFile) {
 * 				rightmostValidNode = node
 * 				rightmostVisitedNodes = rightmostVisitedNodes[:0]
 * 			}
 * 			return node
 * 		}
 * 		visitNodes := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
 * 			if nodeList != nil && len(nodeList.Nodes) > 0 {
 * 				hasChildren = true
 * 				index, _ := core.BinarySearchUniqueFunc(nodeList.Nodes, func(middle int, node *ast.Node) int {
 * 					if node.End() > endPos {
 * 						return comparisonGreaterThan
 * 					}
 * 					return comparisonLessThan
 * 				})
 * 				validIndex := -1
 * 				for i := index - 1; i >= 0; i-- {
 * 					if !shouldVisitNode(nodeList.Nodes[i]) {
 * 						continue
 * 					}
 * 					if isValidPrecedingNode(nodeList.Nodes[i], sourceFile) {
 * 						validIndex = i
 * 						rightmostValidNode = nodeList.Nodes[i]
 * 						break
 * 					}
 * 				}
 * 				for i := validIndex + 1; i < index; i++ {
 * 					if !shouldVisitNode(nodeList.Nodes[i]) {
 * 						continue
 * 					}
 * 					rightmostVisitedNodes = append(rightmostVisitedNodes, nodeList.Nodes[i])
 * 				}
 * 			}
 * 			return nodeList
 * 		}
 * 		VisitEachChildAndJSDoc(n, sourceFile, visitNode, visitNodes)
 * 
 * 		// Three cases:
 * 		// 1. The answer is a token of `rightmostValidNode`.
 * 		// 2. The answer is one of the unvisited tokens that occur after the rightmost valid node.
 * 		// 3. The current node is a childless, token-less node. The answer is the current node.
 * 
 * 		// Case 2: Look at unvisited trailing tokens that occur in between the rightmost visited nodes.
 * 		if !shouldSkipChild(n) { // JSDoc nodes don't include trivia tokens as children.
 * 			var startPos int
 * 			if rightmostValidNode != nil {
 * 				startPos = rightmostValidNode.End()
 * 			} else {
 * 				startPos = n.Pos()
 * 			}
 * 			scanner := scanner.GetScannerForSourceFile(sourceFile, startPos)
 * 			var tokens []*ast.Node
 * 			for _, visitedNode := range rightmostVisitedNodes {
 * 				// Trailing tokens that occur before this node.
 * 				for startPos < min(visitedNode.Pos(), position) {
 * 					token := scanNavigationToken(scanner, n)
 * 					tokenStart := scanner.TokenStart()
 * 					if tokenStart >= position {
 * 						break
 * 					}
 * 					tokenFullStart := scanner.TokenFullStart()
 * 					tokenEnd := scanner.TokenEnd()
 * 					startPos = tokenEnd
 * 					flags := scanner.TokenFlags()
 * 					tokens = append(tokens, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, n, flags))
 * 					scanner.Scan()
 * 				}
 * 				startPos = visitedNode.End()
 * 				scanner.ResetPos(startPos)
 * 				scanner.Scan()
 * 			}
 * 			// Trailing tokens after last visited node.
 * 			for startPos < min(endPos, position) {
 * 				token := scanNavigationToken(scanner, n)
 * 				tokenStart := scanner.TokenStart()
 * 				if tokenStart >= position {
 * 					break
 * 				}
 * 				tokenFullStart := scanner.TokenFullStart()
 * 				tokenEnd := scanner.TokenEnd()
 * 				startPos = tokenEnd
 * 				flags := scanner.TokenFlags()
 * 				tokens = append(tokens, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, n, flags))
 * 				scanner.Scan()
 * 			}
 * 
 * 			lastToken := len(tokens) - 1
 * 			// Find preceding valid token.
 * 			for i := lastToken; i >= 0; i-- {
 * 				if !ast.IsWhitespaceOnlyJsxText(tokens[i]) {
 * 					return tokens[i]
 * 				}
 * 			}
 * 		}
 * 
 * 		// Case 3: childless node.
 * 		if !hasChildren {
 * 			if n != containingNode {
 * 				return n
 * 			}
 * 			return nil
 * 		}
 * 		// Case 1: recur on rightmostValidNode.
 * 		if rightmostValidNode != nil {
 * 			endPos = rightmostValidNode.End()
 * 		}
 * 		return find(rightmostValidNode, endPos)
 * 	}
 * 
 * 	return find(containingNode, endPos)
 * }
 */
export function findRightmostValidToken(endPos: int, sourceFile: GoPtr<SourceFile>, containingNode: GoPtr<Node>, position: int, excludeJSDoc: bool): GoPtr<Node> {
  if (position === -1) {
    position = Node_End(containingNode);
  }
  const find = (n: GoPtr<Node>, ep: int): GoPtr<Node> => {
    if (n === undefined) {
      return undefined;
    }
    if (IsNonWhitespaceToken(n)) {
      return n;
    }

    let rightmostValidNode: GoPtr<Node> = undefined;
    let rightmostVisitedNodes: GoSlice<GoPtr<Node>> = GoSliceMake(0, 0, GoPointerValueOps<Node>()); // Nodes after the last valid node.
    let hasChildren: bool = false as bool;
    const shouldVisitNode = (node: GoPtr<Node>): bool => {
      // Node is synthetic or out of the desired range: don't visit it.
      return (!(((node!.Flags & NodeFlagsReparsed) !== 0) ||
        Node_End(node) > ep || GetStartOfNode(node, sourceFile, !excludeJSDoc /*includeJSDoc*/) >= position)) as bool;
    };
    const visitNodeFn = (node: GoPtr<Node>, _v: GoPtr<NodeVisitor>): GoPtr<Node> => {
      if (node === undefined || (node.Flags & NodeFlagsReparsed) !== 0) {
        return node;
      }
      hasChildren = true as bool;
      if (!shouldVisitNode(node)) {
        return node;
      }
      rightmostVisitedNodes = GoSliceAppend(rightmostVisitedNodes, node, GoPointerValueOps<Node>());
      if (isValidPrecedingNode(node, sourceFile)) {
        rightmostValidNode = node;
        rightmostVisitedNodes = GoSliceToZeroLength(rightmostVisitedNodes);
      }
      return node;
    };
    const visitNodesFn = (nodeList: GoPtr<NodeList>, _v: GoPtr<NodeVisitor>): GoPtr<NodeList> => {
      if (nodeList !== undefined && nodeList.Nodes.length > 0) {
        hasChildren = true as bool;
        const [index, _match] = BinarySearchUniqueFunc(nodeList.Nodes, (_middle: int, node: GoPtr<Node>): int => {
          if (Node_End(node) > ep) {
            return comparisonGreaterThan;
          }
          return comparisonLessThan;
        });
        let validIndex = -1;
        for (let i = index - 1; i >= 0; i--) {
          if (!shouldVisitNode(GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>()))) {
            continue;
          }
          if (isValidPrecedingNode(GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>()), sourceFile)) {
            validIndex = i;
            rightmostValidNode = GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>());
            break;
          }
        }
        for (let i = validIndex + 1; i < index; i++) {
          if (!shouldVisitNode(GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>()))) {
            continue;
          }
          rightmostVisitedNodes = GoSliceAppend(rightmostVisitedNodes, GoSliceLoad(nodeList.Nodes, i, GoPointerValueOps<Node>()), GoPointerValueOps<Node>());
        }
      }
      return nodeList;
    };
    VisitEachChildAndJSDoc(n, sourceFile, visitNodeFn, visitNodesFn);

    // Three cases:
    // 1. The answer is a token of `rightmostValidNode`.
    // 2. The answer is one of the unvisited tokens that occur after the rightmost valid node.
    // 3. The current node is a childless, token-less node. The answer is the current node.

    // Case 2: Look at unvisited trailing tokens that occur in between the rightmost visited nodes.
    if (!shouldSkipChild(n)) { // JSDoc nodes don't include trivia tokens as children.
      let startPos: int;
      if (rightmostValidNode !== undefined) {
        startPos = Node_End(rightmostValidNode);
      } else {
        startPos = Node_Pos(n);
      }
      const s = GetScannerForSourceFile(sourceFile, startPos);
      let tokens = GoNilSlice<GoPtr<Node>>();
      for (
        let __goRangeSlice = rightmostVisitedNodes,
          __goRangeLength = __goRangeSlice.length,
          __goRangeValueOps = GoPointerValueOps<Node>(),
          __goRangeIndex = 0;
        __goRangeIndex < __goRangeLength;
        __goRangeIndex++
      ) {
        const visitedNode = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
        // Trailing tokens that occur before this node.
        while (startPos < Math.min(Node_Pos(visitedNode), position)) {
          const token = scanNavigationToken(s, n);
          const tokenStart = Scanner_TokenStart(s);
          if (tokenStart >= position) {
            break;
          }
          const tokenFullStart = Scanner_TokenFullStart(s);
          const tokenEnd = Scanner_TokenEnd(s);
          startPos = tokenEnd;
          const flags: TokenFlags = Scanner_TokenFlags(s);
          tokens = GoSliceAppend(tokens, SourceFile_GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags), GoPointerValueOps<Node>());
          Scanner_Scan(s);
        }
        startPos = Node_End(visitedNode);
        Scanner_ResetPos(s, startPos);
        Scanner_Scan(s);
      }
      // Trailing tokens after last visited node.
      while (startPos < Math.min(ep, position)) {
        const token = scanNavigationToken(s, n);
        const tokenStart = Scanner_TokenStart(s);
        if (tokenStart >= position) {
          break;
        }
        const tokenFullStart = Scanner_TokenFullStart(s);
        const tokenEnd = Scanner_TokenEnd(s);
        startPos = tokenEnd;
        const flags: TokenFlags = Scanner_TokenFlags(s);
        tokens = GoSliceAppend(tokens, SourceFile_GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags), GoPointerValueOps<Node>());
        Scanner_Scan(s);
      }

      const lastToken = tokens.length - 1;
      // Find preceding valid token.
      for (let i = lastToken; i >= 0; i--) {
        if (!IsWhitespaceOnlyJsxText(GoSliceLoad(tokens, i, GoPointerValueOps<Node>()))) {
          return GoSliceLoad(tokens, i, GoPointerValueOps<Node>());
        }
      }
    }

    // Case 3: childless node.
    if (!hasChildren) {
      if (n !== containingNode) {
        return n;
      }
      return undefined;
    }
    // Case 1: recur on rightmostValidNode.
    let newEp = ep;
    if (rightmostValidNode !== undefined) {
      newEp = Node_End(rightmostValidNode);
    }
    return find(rightmostValidNode, newEp);
  };

  return find(containingNode, endPos);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::FindNextToken","kind":"func","status":"implemented","sigHash":"3a4e76064f9762a95ef6173efe71a551bb650a75a2fc670c647edcf3d04adc08"}
 *
 * Go source:
 * func FindNextToken(previousToken *ast.Node, parent *ast.Node, file *ast.SourceFile) *ast.Node {
 * 	var find func(n *ast.Node) *ast.Node
 * 	find = func(n *ast.Node) *ast.Node {
 * 		if ast.IsTokenKind(n.Kind) && n.Pos() == previousToken.End() {
 * 			// this is token that starts at the end of previous token - return it
 * 			return n
 * 		}
 * 		// Node that contains `previousToken` or occurs immediately after it.
 * 		var foundNode *ast.Node
 * 		visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
 * 			if node != nil && node.Flags&ast.NodeFlagsReparsed == 0 &&
 * 				node.Pos() <= previousToken.End() && node.End() > previousToken.End() {
 * 				foundNode = node
 * 			}
 * 			return node
 * 		}
 * 		visitNodes := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
 * 			if nodeList != nil && len(nodeList.Nodes) > 0 && foundNode == nil {
 * 				nodes := nodeList.Nodes
 * 				index, match := core.BinarySearchUniqueFunc(nodes, func(_ int, node *ast.Node) int {
 * 					if node.Flags&ast.NodeFlagsReparsed != 0 {
 * 						return comparisonLessThan
 * 					}
 * 					if node.Pos() > previousToken.End() {
 * 						return comparisonGreaterThan
 * 					}
 * 					if node.End() <= previousToken.Pos() {
 * 						return comparisonLessThan
 * 					}
 * 					return comparisonEqualTo
 * 				})
 * 				if match {
 * 					foundNode = nodes[index]
 * 				}
 * 			}
 * 			return nodeList
 * 		}
 * 		VisitEachChildAndJSDoc(n, file, visitNode, visitNodes)
 * 		// Cases:
 * 		// 1. no answer exists
 * 		// 2. answer is an unvisited token
 * 		// 3. answer is in the visited found node
 * 
 * 		// Case 3: look for the next token inside the found node.
 * 		if foundNode != nil {
 * 			return find(foundNode)
 * 		}
 * 		startPos := previousToken.End()
 * 		// Case 2: look for the next token directly.
 * 		if startPos >= n.Pos() && startPos < n.End() {
 * 			scanner := scanner.GetScannerForSourceFile(file, startPos)
 * 			token := scanner.Token()
 * 			tokenFullStart := scanner.TokenFullStart()
 * 			tokenEnd := scanner.TokenEnd()
 * 			flags := scanner.TokenFlags()
 * 			// Use tokenFullStart (which includes leading trivia) to match TS's
 * 			// findNextToken behavior where `n.pos === previousToken.end` is checked
 * 			// (TS's pos includes trivia, same as Go's Pos()/tokenFullStart).
 * 			if tokenFullStart == previousToken.End() {
 * 				return file.GetOrCreateToken(token, tokenFullStart, tokenEnd, n, flags)
 * 			}
 * 			panic(fmt.Sprintf("Expected to find next token at %d, got token %s at %d", previousToken.End(), token, tokenFullStart))
 * 		}
 * 		// Case 3: no answer.
 * 		return nil
 * 	}
 * 	return find(parent)
 * }
 */
export function FindNextToken(previousToken: GoPtr<Node>, parent: GoPtr<Node>, file: GoPtr<SourceFile>): GoPtr<Node> {
  const find = (n: GoPtr<Node>): GoPtr<Node> => {
    if (IsTokenKind(n!.Kind) && Node_Pos(n) === Node_End(previousToken)) {
      // this is token that starts at the end of previous token - return it
      return n;
    }
    // Node that contains `previousToken` or occurs immediately after it.
    let foundNode: GoPtr<Node> = undefined;
    const visitNodeFn = (node: GoPtr<Node>, _v: GoPtr<NodeVisitor>): GoPtr<Node> => {
      if (node !== undefined && (node.Flags & NodeFlagsReparsed) === 0 &&
        Node_Pos(node) <= Node_End(previousToken) && Node_End(node) > Node_End(previousToken)) {
        foundNode = node;
      }
      return node;
    };
    const visitNodesFn = (nodeList: GoPtr<NodeList>, _v: GoPtr<NodeVisitor>): GoPtr<NodeList> => {
      if (nodeList !== undefined && nodeList.Nodes.length > 0 && foundNode === undefined) {
        const nodes = nodeList.Nodes;
        const [index, match] = BinarySearchUniqueFunc(nodes, (_i: int, node: GoPtr<Node>): int => {
          if ((node!.Flags & NodeFlagsReparsed) !== 0) {
            return comparisonLessThan;
          }
          if (Node_Pos(node) > Node_End(previousToken)) {
            return comparisonGreaterThan;
          }
          if (Node_End(node) <= Node_Pos(previousToken)) {
            return comparisonLessThan;
          }
          return comparisonEqualTo;
        });
        if (match) {
          foundNode = GoSliceLoad(nodes, index, GoPointerValueOps<Node>());
        }
      }
      return nodeList;
    };
    VisitEachChildAndJSDoc(n, file, visitNodeFn, visitNodesFn);
    // Cases:
    // 1. no answer exists
    // 2. answer is an unvisited token
    // 3. answer is in the visited found node

    // Case 3: look for the next token inside the found node.
    if (foundNode !== undefined) {
      return find(foundNode);
    }
    const startPos = Node_End(previousToken);
    // Case 2: look for the next token directly.
    if (startPos >= Node_Pos(n) && startPos < Node_End(n)) {
      const s = GetScannerForSourceFile(file, startPos);
      const token = Scanner_Token(s);
      const tokenFullStart = Scanner_TokenFullStart(s);
      const tokenEnd = Scanner_TokenEnd(s);
      const flags: TokenFlags = Scanner_TokenFlags(s);
      // Use tokenFullStart (which includes leading trivia) to match TS's
      // findNextToken behavior where `n.pos === previousToken.end` is checked
      // (TS's pos includes trivia, same as Go's Pos()/tokenFullStart).
      if (tokenFullStart === Node_End(previousToken)) {
        return SourceFile_GetOrCreateToken(file, token, tokenFullStart, tokenEnd, n, flags);
      }
      throw new globalThis.Error(`Expected to find next token at ${Node_End(previousToken)}, got token ${token} at ${tokenFullStart}`);
    }
    // Case 3: no answer.
    return undefined;
  };
  return find(parent);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::getNodeVisitor","kind":"func","status":"implemented","sigHash":"6eed77c40beaa6e549a5940e25abc0c12a1784067f9f709b2b65de0904ad936f"}
 *
 * Go source:
 * func getNodeVisitor(
 * 	visitNode func(*ast.Node, *ast.NodeVisitor) *ast.Node,
 * 	visitNodes func(*ast.NodeList, *ast.NodeVisitor) *ast.NodeList,
 * ) *ast.NodeVisitor {
 * 	var wrappedVisitNode func(*ast.Node, *ast.NodeVisitor) *ast.Node
 * 	var wrappedVisitNodes func(*ast.NodeList, *ast.NodeVisitor) *ast.NodeList
 * 	if visitNode != nil {
 * 		wrappedVisitNode = func(n *ast.Node, v *ast.NodeVisitor) *ast.Node {
 * 			if ast.IsJSDocSingleCommentNodeComment(n) {
 * 				return n
 * 			}
 * 			return visitNode(n, v)
 * 		}
 * 	}
 * 
 * 	if visitNodes != nil {
 * 		wrappedVisitNodes = func(n *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
 * 			if ast.IsJSDocSingleCommentNodeList(n) {
 * 				return n
 * 			}
 * 			return visitNodes(n, v)
 * 		}
 * 	}
 * 
 * 	return ast.NewNodeVisitor(core.Identity, nil, ast.NodeVisitorHooks{
 * 		VisitNode:  wrappedVisitNode,
 * 		VisitToken: wrappedVisitNode,
 * 		VisitNodes: wrappedVisitNodes,
 * 		VisitModifiers: func(modifiers *ast.ModifierList, visitor *ast.NodeVisitor) *ast.ModifierList {
 * 			if modifiers != nil {
 * 				wrappedVisitNodes(&modifiers.NodeList, visitor)
 * 			}
 * 			return modifiers
 * 		},
 * 	})
 * }
 */
export function getNodeVisitor(visitNode: GoFunc<(arg0: GoPtr<Node>, arg1: GoPtr<NodeVisitor>) => GoPtr<Node>>, visitNodes: GoFunc<(arg0: GoPtr<NodeList>, arg1: GoPtr<NodeVisitor>) => GoPtr<NodeList>>): GoPtr<NodeVisitor> {
  let wrappedVisitNode: ((n: GoPtr<Node>, v: GoPtr<NodeVisitor>) => GoPtr<Node>) | undefined = undefined;
  let wrappedVisitNodes: ((n: GoPtr<NodeList>, v: GoPtr<NodeVisitor>) => GoPtr<NodeList>) | undefined = undefined;
  if (visitNode !== undefined) {
    wrappedVisitNode = (n: GoPtr<Node>, v: GoPtr<NodeVisitor>): GoPtr<Node> => {
      if (IsJSDocSingleCommentNodeComment(n)) {
        return n;
      }
      return visitNode(n, v);
    };
  }

  if (visitNodes !== undefined) {
    wrappedVisitNodes = (n: GoPtr<NodeList>, v: GoPtr<NodeVisitor>): GoPtr<NodeList> => {
      if (IsJSDocSingleCommentNodeList(n)) {
        return n;
      }
      return visitNodes(n, v);
    };
  }

  const hooks: NodeVisitorHooks = {
    VisitNode: wrappedVisitNode!,
    VisitToken: wrappedVisitNode!,
    VisitNodes: wrappedVisitNodes!,
    VisitModifiers: (modifiers: GoPtr<ModifierList>, visitor: GoPtr<NodeVisitor>): GoPtr<ModifierList> => {
      if (modifiers !== undefined && wrappedVisitNodes !== undefined) {
        wrappedVisitNodes(modifiers as unknown as GoPtr<NodeList>, visitor);
      }
      return modifiers;
    },
    VisitEmbeddedStatement: undefined,
    VisitIterationBody: undefined,
    VisitParameters: undefined,
    VisitFunctionBody: undefined,
    VisitTopLevelStatements: undefined,
  };
  return NewNodeVisitor(Identity, undefined, hooks);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::shouldSkipChild","kind":"func","status":"implemented","sigHash":"a69cd500216e0fce6e0896ba67c68fe1568950b1d4e92833c0f7babdb632f3aa"}
 *
 * Go source:
 * func shouldSkipChild(node *ast.Node) bool {
 * 	return node.Kind == ast.KindJSDoc ||
 * 		node.Kind == ast.KindJSDocText ||
 * 		node.Kind == ast.KindJSDocTypeLiteral ||
 * 		node.Kind == ast.KindJSDocSignature ||
 * 		ast.IsJSDocLinkLike(node) ||
 * 		ast.IsJSDocTag(node)
 * }
 */
export function shouldSkipChild(node: GoPtr<Node>): bool {
  return (node!.Kind === KindJSDoc ||
    node!.Kind === KindJSDocText ||
    node!.Kind === KindJSDocTypeLiteral ||
    node!.Kind === KindJSDocSignature ||
    IsJSDocLinkLike(node) ||
    IsJSDocTag(node)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/astnav/tokens.go::func::FindChildOfKind","kind":"func","status":"implemented","sigHash":"c7405d06102fc3383f1f5da52ea37c11cc53c086c8397d9759565ecaaeb61502"}
 *
 * Go source:
 * func FindChildOfKind(containingNode *ast.Node, kind ast.Kind, sourceFile *ast.SourceFile) *ast.Node {
 * 	lastNodePos := containingNode.Pos()
 * 	scan := scanner.GetScannerForSourceFile(sourceFile, lastNodePos)
 * 
 * 	var foundChild *ast.Node
 * 	visitNode := func(node *ast.Node) bool {
 * 		if node == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
 * 			return false
 * 		}
 * 		// Look for child in preceding tokens.
 * 		startPos := lastNodePos
 * 		for startPos < node.Pos() {
 * 			tokenKind := scan.Token()
 * 			tokenEnd := scan.TokenEnd()
 * 			if tokenKind == kind {
 * 				tokenFullStart := scan.TokenFullStart()
 * 				flags := scan.TokenFlags()
 * 				foundChild = sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, containingNode, flags)
 * 				return true
 * 			}
 * 			startPos = tokenEnd
 * 			scan.Scan()
 * 		}
 * 
 * 		if node.Kind == kind {
 * 			foundChild = node
 * 			return true
 * 		}
 * 
 * 		lastNodePos = node.End()
 * 		scan.ResetPos(lastNodePos)
 * 		return false
 * 	}
 * 
 * 	ast.ForEachChildAndJSDoc(containingNode, sourceFile, visitNode)
 * 
 * 	if foundChild != nil {
 * 		return foundChild
 * 	}
 * 
 * 	// Look for child in trailing tokens.
 * 	startPos := lastNodePos
 * 	for startPos < containingNode.End() {
 * 		tokenKind := scan.Token()
 * 		tokenEnd := scan.TokenEnd()
 * 		if tokenKind == kind {
 * 			tokenFullStart := scan.TokenFullStart()
 * 			flags := scan.TokenFlags()
 * 			token := sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, containingNode, flags)
 * 			return token
 * 		}
 * 		startPos = tokenEnd
 * 		scan.Scan()
 * 	}
 * 	return nil
 * }
 */
export function FindChildOfKind(containingNode: GoPtr<Node>, kind: Kind, sourceFile: GoPtr<SourceFile>): GoPtr<Node> {
  let lastNodePos: int = Node_Pos(containingNode);
  const scan = GetScannerForSourceFile(sourceFile, lastNodePos);

  let foundChild: GoPtr<Node> = undefined;
  const visitNodeFn = (node: GoPtr<Node>): bool => {
    if (node === undefined || (node.Flags & NodeFlagsReparsed) !== 0) {
      return false as bool;
    }
    // Look for child in preceding tokens.
    let startPos: int = lastNodePos;
    while (startPos < Node_Pos(node)) {
      const tokenKind = Scanner_Token(scan);
      const tokenEnd = Scanner_TokenEnd(scan);
      if (tokenKind === kind) {
        const tokenFullStart = Scanner_TokenFullStart(scan);
        const flags: TokenFlags = Scanner_TokenFlags(scan);
        foundChild = SourceFile_GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, containingNode, flags);
        return true as bool;
      }
      startPos = tokenEnd;
      Scanner_Scan(scan);
    }

    if (node.Kind === kind) {
      foundChild = node;
      return true as bool;
    }

    lastNodePos = Node_End(node);
    Scanner_ResetPos(scan, lastNodePos);
    return false as bool;
  };

  ForEachChildAndJSDoc(containingNode, sourceFile, visitNodeFn);

  if (foundChild !== undefined) {
    return foundChild;
  }

  // Look for child in trailing tokens.
  let startPos: int = lastNodePos;
  while (startPos < Node_End(containingNode)) {
    const tokenKind = Scanner_Token(scan);
    const tokenEnd = Scanner_TokenEnd(scan);
    if (tokenKind === kind) {
      const tokenFullStart = Scanner_TokenFullStart(scan);
      const flags: TokenFlags = Scanner_TokenFlags(scan);
      const token = SourceFile_GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, containingNode, flags);
      return token;
    }
    startPos = tokenEnd;
    Scanner_Scan(scan);
  }
  return undefined;
}
