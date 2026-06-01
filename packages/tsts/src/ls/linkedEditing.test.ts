import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  NodeFlags,
  createIdentifier,
  createJsxAttributes,
  createJsxClosingElement,
  createJsxClosingFragment,
  createJsxElement,
  createJsxFragment,
  createJsxOpeningElement,
  createJsxOpeningFragment,
  createNodeArray,
  createSourceFile,
  createToken,
  type EndOfFile,
  type JsxElement,
  type JsxFragment,
  type Node,
  type NodeArray,
  type Path,
  type SourceFile,
  type Statement,
} from "../ast/index.js";
import {
  jsxTagWordPattern,
  linkedEditingRangeForToken,
  type LinkedEditingConverters,
  type LinkedEditingSourceFile,
} from "./linkedEditing.js";

const converters: LinkedEditingConverters = {
  lineAndCharacterToPosition: (_file, position) => position.character,
  positionToLineAndCharacter: (_file, position) => ({ line: 0, character: position }),
};

function sourceFile(text: string): LinkedEditingSourceFile {
  const file = createSourceFile(
    "input.tsx",
    "input.tsx" as Path,
    text,
    createNodeArray([]) as NodeArray<Statement>,
    createToken(Kind.EndOfFile) as EndOfFile,
    [],
    0,
    0,
  );
  Object.defineProperty(file, "lineStarts", { value: [0], enumerable: true });
  return file as SourceFile & { readonly lineStarts: readonly number[] };
}

function stamp<T extends Node>(node: T, pos: number, end: number): T {
  node.pos = pos;
  node.end = end;
  return node;
}

function jsxElement(openName: string, closeName: string): JsxElement {
  const openIdentifier = stamp(createIdentifier(openName), 1, 1 + openName.length);
  const closeIdentifier = stamp(createIdentifier(closeName), 7, 7 + closeName.length);
  const attributes = createJsxAttributes(createNodeArray([]));
  const opening = stamp(createJsxOpeningElement(openIdentifier, undefined, attributes), 0, 5);
  const closing = stamp(createJsxClosingElement(closeIdentifier), 5, 11);
  return stamp(createJsxElement(opening, createNodeArray([]), closing), 0, 11);
}

function jsxFragment(flags: NodeFlags = NodeFlags.None): JsxFragment {
  const opening = stamp(createJsxOpeningFragment(), 0, 2);
  const closing = stamp(createJsxClosingFragment(), 2, 5);
  opening.flags = flags;
  closing.flags = flags;
  return stamp(createJsxFragment(opening, createNodeArray([]), closing), 0, 5);
}

function tokenWithParent(parent: Node): Node {
  const token = createToken(Kind.GreaterThanToken);
  token.parent = parent;
  return token;
}

export class LinkedEditingTests {
  returns_linked_ranges_for_matching_jsx_element_tag_names(): void {
    const file = sourceFile("<div></div>");
    const element = jsxElement("div", "div");
    const response = linkedEditingRangeForToken(file, tokenWithParent(element.openingElement.tagName), 2, converters);

    Assert.Equal(jsxTagWordPattern, response.linkedEditingRanges?.wordPattern);
    Assert.Equal(2, response.linkedEditingRanges?.ranges.length);
    Assert.Equal(1, response.linkedEditingRanges?.ranges[0]?.start.character);
    Assert.Equal(4, response.linkedEditingRanges?.ranges[0]?.end.character);
    Assert.Equal(7, response.linkedEditingRanges?.ranges[1]?.start.character);
    Assert.Equal(10, response.linkedEditingRanges?.ranges[1]?.end.character);
  }

  rejects_mismatched_jsx_element_tag_names(): void {
    const file = sourceFile("<div></span>");
    const element = jsxElement("div", "span");
    const response = linkedEditingRangeForToken(file, tokenWithParent(element.openingElement.tagName), 2, converters);

    Assert.Equal(undefined, response.linkedEditingRanges);
  }

  rejects_positions_outside_tag_names(): void {
    const file = sourceFile("<div></div>");
    const element = jsxElement("div", "div");
    const response = linkedEditingRangeForToken(file, tokenWithParent(element.openingElement), 5, converters);

    Assert.Equal(undefined, response.linkedEditingRanges);
  }

  returns_zero_width_ranges_for_jsx_fragments(): void {
    const file = sourceFile("<></>");
    const fragment = jsxFragment();
    const response = linkedEditingRangeForToken(file, tokenWithParent(fragment.openingFragment), 1, converters);

    Assert.Equal(2, response.linkedEditingRanges?.ranges.length);
    Assert.Equal(1, response.linkedEditingRanges?.ranges[0]?.start.character);
    Assert.Equal(1, response.linkedEditingRanges?.ranges[0]?.end.character);
    Assert.Equal(4, response.linkedEditingRanges?.ranges[1]?.start.character);
    Assert.Equal(4, response.linkedEditingRanges?.ranges[1]?.end.character);
  }

  rejects_fragments_with_parse_errors(): void {
    const file = sourceFile("<></>");
    const fragment = jsxFragment(NodeFlags.ThisNodeOrAnySubNodesHasError);
    const response = linkedEditingRangeForToken(file, tokenWithParent(fragment.openingFragment), 1, converters);

    Assert.Equal(undefined, response.linkedEditingRanges);
  }
}

A<LinkedEditingTests>().method((t) => t.returns_linked_ranges_for_matching_jsx_element_tag_names).add(FactAttribute);
A<LinkedEditingTests>().method((t) => t.rejects_mismatched_jsx_element_tag_names).add(FactAttribute);
A<LinkedEditingTests>().method((t) => t.rejects_positions_outside_tag_names).add(FactAttribute);
A<LinkedEditingTests>().method((t) => t.returns_zero_width_ranges_for_jsx_fragments).add(FactAttribute);
A<LinkedEditingTests>().method((t) => t.rejects_fragments_with_parse_errors).add(FactAttribute);
