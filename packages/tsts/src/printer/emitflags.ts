/**
 * EmitFlags bitfield.
 *
 * Port of TS-Go `internal/printer/emitflags.go` (~37 LoC). Bitmask of
 * emit-time hints attached to nodes by transformers — single-line
 * formatting, source-map suppression, no-leading-comments, etc.
 */

export type EmitFlags = number;
export const EmitFlags = {
  None: 0 as EmitFlags,
  SingleLine: (1 << 0) as EmitFlags,
  AdviseOnEmitNode: (1 << 1) as EmitFlags,
  NoSubstitution: (1 << 2) as EmitFlags,
  CapturesThis: (1 << 3) as EmitFlags,
  NoLeadingSourceMap: (1 << 4) as EmitFlags,
  NoTrailingSourceMap: (1 << 5) as EmitFlags,
  NoSourceMap: (1 << 6) as EmitFlags,
  NoNestedSourceMaps: (1 << 7) as EmitFlags,
  NoTokenLeadingSourceMaps: (1 << 8) as EmitFlags,
  NoTokenTrailingSourceMaps: (1 << 9) as EmitFlags,
  NoTokenSourceMaps: (1 << 10) as EmitFlags,
  NoLeadingComments: (1 << 11) as EmitFlags,
  NoTrailingComments: (1 << 12) as EmitFlags,
  NoComments: (1 << 13) as EmitFlags,
  NoNestedComments: (1 << 14) as EmitFlags,
  HelperName: (1 << 15) as EmitFlags,
  ExportName: (1 << 16) as EmitFlags,
  LocalName: (1 << 17) as EmitFlags,
  InternalName: (1 << 18) as EmitFlags,
  Indented: (1 << 19) as EmitFlags,
  NoIndentation: (1 << 20) as EmitFlags,
  AsyncFunctionBody: (1 << 21) as EmitFlags,
  ReuseTempVariableScope: (1 << 22) as EmitFlags,
  CustomPrologue: (1 << 23) as EmitFlags,
  NoHoisting: (1 << 24) as EmitFlags,
  Iterator: (1 << 25) as EmitFlags,
  NoAsciiEscaping: (1 << 26) as EmitFlags,
  TransformPrivateStaticElements: (1 << 27) as EmitFlags,
  StartOnNewLine: (1 << 28) as EmitFlags,
  IndirectCall: (1 << 29) as EmitFlags,
  NoLexicalArguments: (1 << 30) as EmitFlags,
} as const;
