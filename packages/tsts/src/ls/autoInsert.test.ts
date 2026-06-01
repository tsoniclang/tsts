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
  createJsxText,
  createNodeArray,
  createToken,
  type JsxElement,
  type JsxFragment,
  type Node,
} from "../ast/index.js";
import {
  autoInsertClosingText,
  escapeSnippetText,
  isUnclosedFragment,
  isUnclosedTag,
  provideOnAutoInsert,
  type AutoInsertLanguageService,
} from "./autoInsert.js";

function jsxElement(openName: string, closeName: string): JsxElement {
  const attributes = createJsxAttributes(createNodeArray([]));
  const opening = createJsxOpeningElement(createIdentifier(openName), undefined, attributes);
  const closing = createJsxClosingElement(createIdentifier(closeName));
  return createJsxElement(opening, createNodeArray([]), closing);
}

function jsxFragment(flags: NodeFlags = NodeFlags.None): JsxFragment {
  const opening = createJsxOpeningFragment();
  const closing = createJsxClosingFragment();
  closing.flags = flags;
  return createJsxFragment(opening, createNodeArray([]), closing);
}

function greaterThanToken(parent: Node): Node {
  const token = createToken(Kind.GreaterThanToken);
  token.parent = parent;
  return token;
}

function unreachableService(): AutoInsertLanguageService {
  const fail = (): never => {
    throw new Error("auto-insert service should not be reached");
  };
  return {
    converters: { lineAndCharacterToPosition: fail },
    getProgramAndFile: fail,
  };
}

export class AutoInsertTests {
  ignores_non_greater_than_trigger_without_touching_service(): void {
    const response = provideOnAutoInsert(unreachableService(), {
      _vs_ch: "{",
      _vs_position: { line: 3, character: 4 },
      _vs_textDocument: { uri: "file:///repo/input.tsx" },
    });

    Assert.Equal(undefined, response.vsOnAutoInsertResponseItem);
  }

  detects_direct_unclosed_jsx_tag_after_opening_angle(): void {
    const element = jsxElement("Widget$Name", "Other");
    const token = greaterThanToken(element.openingElement);

    Assert.True(isUnclosedTag(element));
    Assert.Equal("</Widget$Name>", autoInsertClosingText(token));
    Assert.Equal("</Widget\\$Name>", escapeSnippetText(autoInsertClosingText(token)));
  }

  does_not_insert_for_balanced_jsx_tag(): void {
    const element = jsxElement("Widget", "Widget");
    const token = greaterThanToken(element.openingElement);

    Assert.False(isUnclosedTag(element));
    Assert.Equal("", autoInsertClosingText(token));
  }

  propagates_parent_unclosed_jsx_tag_for_same_nested_tag(): void {
    const parent = jsxElement("div", "span");
    const child = jsxElement("div", "div");
    child.parent = parent;

    Assert.True(isUnclosedTag(parent));
    Assert.True(isUnclosedTag(child));
  }

  detects_unclosed_fragment_from_error_flag(): void {
    const fragment = jsxFragment(NodeFlags.ThisNodeHasError);
    const token = greaterThanToken(fragment.openingFragment);

    Assert.True(isUnclosedFragment(fragment));
    Assert.Equal("</>", autoInsertClosingText(token));
  }

  detects_unclosed_fragment_from_jsx_text_child(): void {
    const fragment = jsxFragment(NodeFlags.ThisNodeHasError);
    const text = createJsxText("", false);
    text.parent = fragment;

    Assert.Equal("</>", autoInsertClosingText(text));
  }
}

A<AutoInsertTests>().method((t) => t.ignores_non_greater_than_trigger_without_touching_service).add(FactAttribute);
A<AutoInsertTests>().method((t) => t.detects_direct_unclosed_jsx_tag_after_opening_angle).add(FactAttribute);
A<AutoInsertTests>().method((t) => t.does_not_insert_for_balanced_jsx_tag).add(FactAttribute);
A<AutoInsertTests>().method((t) => t.propagates_parent_unclosed_jsx_tag_for_same_nested_tag).add(FactAttribute);
A<AutoInsertTests>().method((t) => t.detects_unclosed_fragment_from_error_flag).add(FactAttribute);
A<AutoInsertTests>().method((t) => t.detects_unclosed_fragment_from_jsx_text_child).add(FactAttribute);
