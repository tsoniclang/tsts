/**
 * Transformer emit-flag parity helpers.
 */

export type TransformerEmitFlags = number;

export const TransformerEmitFlags = {
  None: 0,
  NoComments: 1 << 0,
  NoNestedComments: 1 << 1,
  NoTokenSourceMaps: 1 << 2,
  NoLeadingSourceMap: 1 << 3,
  NoTrailingSourceMap: 1 << 4,
  StartsOnNewLine: 1 << 5,
  AdviseOnEmitNode: 1 << 6,
} as const;

export interface EmitFlagCarrier {
  emitFlags?: TransformerEmitFlags;
}

export function addEmitFlags(node: EmitFlagCarrier, flags: TransformerEmitFlags): void {
  node.emitFlags = (node.emitFlags ?? TransformerEmitFlags.None) | flags;
}

export function removeEmitFlags(node: EmitFlagCarrier, flags: TransformerEmitFlags): void {
  node.emitFlags = (node.emitFlags ?? TransformerEmitFlags.None) & ~flags;
}

export function hasEmitFlags(node: EmitFlagCarrier, flags: TransformerEmitFlags): boolean {
  return ((node.emitFlags ?? TransformerEmitFlags.None) & flags) === flags;
}

export function copyEmitFlags(source: EmitFlagCarrier, target: EmitFlagCarrier): void {
  if (source.emitFlags !== undefined) target.emitFlags = source.emitFlags;
}
