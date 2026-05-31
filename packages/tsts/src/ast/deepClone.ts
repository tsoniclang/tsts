import type { int } from "@tsonic/core/types.js";
import { createNode } from "./generated/factory.js";
import type { Node } from "./generated/types.js";
import { NodeFlags } from "./flags.js";

type NodeData = Record<string, unknown>;

const NON_DATA_GETTERS = new Set(["constructor", "forEachChild", "getSourceFile"]);

function isNode(value: unknown): value is Node {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly kind?: unknown }).kind === "number"
    && typeof (value as { readonly pos?: unknown }).pos === "number"
    && typeof (value as { readonly end?: unknown }).end === "number";
}

function cloneValue(value: unknown, syntheticLocation: boolean): unknown {
  if (isNode(value)) return deepCloneNode(value, syntheticLocation);
  if (Array.isArray(value)) return value.map((element) => cloneValue(element, syntheticLocation));
  return value;
}

function attachParent(value: unknown, parent: Node): void {
  if (isNode(value)) {
    value.parent = parent;
    return;
  }
  if (!Array.isArray(value)) return;
  for (const element of value) attachParent(element, parent);
}

function cloneNodeData(node: Node, syntheticLocation: boolean): NodeData {
  const data: NodeData = {};
  const prototype = Object.getPrototypeOf(node) as object;
  for (const propertyName of Object.getOwnPropertyNames(prototype)) {
    if (NON_DATA_GETTERS.has(propertyName)) continue;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
    if (descriptor?.get === undefined) continue;
    const value = (node as unknown as Record<string, unknown>)[propertyName];
    if (value !== undefined) data[propertyName] = cloneValue(value, syntheticLocation);
  }
  return data;
}

export function deepCloneNode<T extends Node>(node: T, syntheticLocation = true): T {
  const data = cloneNodeData(node, syntheticLocation);
  const pos = syntheticLocation ? -1 as int : node.pos;
  const end = syntheticLocation ? -1 as int : node.end;
  const clone = createNode(node.kind, data, pos, end) as T;
  clone.flags = node.flags;
  for (const value of Object.values(data)) attachParent(value, clone);
  return clone;
}

export function deepCloneReparse<T extends Node>(node: T | undefined): T | undefined {
  if (node === undefined) return undefined;
  const clone = deepCloneNode(node, false);
  clone.flags |= NodeFlags.Reparsed;
  return clone;
}

export function deepCloneReparseModifiers<T extends readonly Node[] | undefined>(modifiers: T): T {
  if (modifiers === undefined) return modifiers;
  return modifiers.map((modifier) => deepCloneNode(modifier, false)) as unknown as T;
}
