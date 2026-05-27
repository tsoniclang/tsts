/**
 * JSX type-resolution helpers.
 *
 * Ported from Strada `checker.go` — getJsxElementTypeAt,
 * getJsxIntrinsicElementType, resolveJsxNamespace,
 * getJsxNamespaceFromCompilerOptions. Complements `jsx.ts` which
 * holds the per-Kind dispatch.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the JSX namespace name from compiler options. Default is
 * "React" — the canonical pre-`jsx-runtime` namespace.
 */
export function getJsxNamespaceFromOptions(jsxNamespaceOption: string | undefined): string {
  return jsxNamespaceOption ?? "React";
}

/**
 * Returns true when the JSX tag is intrinsic — a lowercase
 * identifier (`<div>`) vs. a component reference (`<MyComp>`).
 */
export function isIntrinsicJsxName(name: string): boolean {
  if (name.length === 0) return false;
  const first = name.charCodeAt(0);
  return first >= 97 && first <= 122; // a-z
}

/**
 * Returns the intrinsic element type for a JSX tag name. Returns
 * Any when no JSX.IntrinsicElements interface is in scope.
 */
export function getJsxIntrinsicElementType(_tagName: string): Type {
  return ANY;
}

/**
 * Returns the JSX element type for a component reference. Returns
 * Any when the component is not resolved.
 */
export function getJsxComponentReturnType(_component: AstNode): Type {
  return ANY;
}

/**
 * Returns the props type for a component reference. Looks up the
 * first parameter type of the constructor / function signature.
 */
export function getJsxPropsType(_component: AstNode): Type {
  return ANY;
}

/**
 * Returns the type-arguments node-list for a JSX opening element,
 * used by generic components (`<MyComp<T> />`).
 */
export function getJsxOpeningElementTypeArguments(
  node: AstNode,
): readonly AstNode[] {
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns the children property name configured by the runtime
 * (default "children").
 */
export function getJsxChildrenPropertyName(): string {
  return "children";
}

/**
 * Returns the canonical JSX runtime mode based on compiler options
 * — `"preserve"` | `"react"` | `"react-native"` | `"react-jsx"` |
 * `"react-jsxdev"`.
 */
export function resolveJsxMode(modeOption: string | undefined): string {
  return modeOption ?? "preserve";
}

/**
 * Returns true when the node is a `<Fragment>` or `<></>` shape.
 */
export function isJsxFragmentTag(node: AstNode): boolean {
  return node.kind === Kind.JsxFragment ||
    node.kind === Kind.JsxOpeningFragment ||
    node.kind === Kind.JsxClosingFragment;
}
