export interface NodeIdCarrier {
  id?: number;
}

let nextNodeId = 1;

export function getNodeId(node: NodeIdCarrier): number {
  node.id ??= nextNodeId++;
  return node.id;
}
