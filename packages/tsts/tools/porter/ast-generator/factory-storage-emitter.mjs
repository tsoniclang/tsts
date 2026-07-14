import { nodeFactoryArenaFields } from "./factory-emitter.mjs";

export function emitFactoryStorage(schema) {
  const arenas = nodeFactoryArenaFields(schema);
  const lines = [];
  lines.push(`import type { int } from "../../../go/scalars.js";`);
  lines.push(`import { GoNilSlice } from "../../../go/compat.js";`);
  lines.push(`import type { GoPtr, GoValueOps } from "../../../go/compat.js";`);
  lines.push(`import type { Arena } from "../../core/arena.js";`);
  lines.push(`import type { ModifierList, NodeFactoryHooks, NodeList } from "../spine.js";`);
  lines.push(`import type { NodeFactory } from "./factory.js";`);
  lines.push(`import type {`);
  for (const type of dataArenaTypes(arenas)) lines.push(`  ${type},`);
  lines.push(`} from "./data.js";`);
  lines.push("");
  lines.push(`class NodeFactoryValue implements NodeFactory {`);
  lines.push(`  hooks: NodeFactoryHooks = { OnCreate: undefined, OnUpdate: undefined, OnClone: undefined };`);
  for (const { field, type } of arenas) lines.push(`  ${field}: Arena<${type}> = { data: GoNilSlice() };`);
  lines.push(`  nodeCount: int = 0 as int;`);
  lines.push(`  textCount: int = 0 as int;`);
  lines.push("");
  lines.push(`  AsNodeFactory(): GoPtr<NodeFactory> { return this; }`);
  lines.push(`}`);
  lines.push("");
  lines.push(`export function createNodeFactoryValue(): NodeFactory {`);
  lines.push(`  return new NodeFactoryValue();`);
  lines.push(`}`);
  lines.push("");
  lines.push(`export const NodeFactoryValueOps: GoValueOps<NodeFactory> = Object.freeze({`);
  lines.push(`  zero: createNodeFactoryValue,`);
  lines.push(`  copy: (value: NodeFactory): NodeFactory => {`);
  lines.push(`    const result = createNodeFactoryValue();`);
  lines.push(`    result.hooks = {`);
  lines.push(`      OnCreate: value.hooks.OnCreate,`);
  lines.push(`      OnUpdate: value.hooks.OnUpdate,`);
  lines.push(`      OnClone: value.hooks.OnClone,`);
  lines.push(`    };`);
  for (const { field } of arenas) lines.push(`    result.${field} = { data: value.${field}.data };`);
  lines.push(`    result.nodeCount = value.nodeCount;`);
  lines.push(`    result.textCount = value.textCount;`);
  lines.push(`    return result;`);
  lines.push(`  },`);
  lines.push(`});`);
  lines.push("");
  return lines.join("\n");
}

function dataArenaTypes(arenas) {
  return [...new Set(arenas.map(({ type }) => type).filter((type) => type !== "ModifierList" && type !== "NodeList"))].sort();
}
