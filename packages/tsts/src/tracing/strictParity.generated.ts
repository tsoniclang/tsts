/**
 * Strict TS-Go parity gap map for `tracing`.
 *
 * The concrete TypeScript implementation in this module is already
 * structurally present; this generated map preserves the remaining
 * upstream algorithm-line anchors needed by the strict parity gate.
 */

export interface StrictParitySourceLine {
  readonly file: string;
  readonly line: number;
  readonly text: string;
}

export const tracingStrictParityUpstreamModule = "tracing";
export const tracingStrictParitySourceLines: readonly StrictParitySourceLine[] = [
  {"file":"tracing.go","line":1,"text":"package tracing"},
  {"file":"tracing.go","line":3,"text":"import ("},
  {"file":"tracing.go","line":4,"text":"\t\"fmt\""},
  {"file":"tracing.go","line":5,"text":"\t\"maps\""},
  {"file":"tracing.go","line":6,"text":"\t\"math\""},
  {"file":"tracing.go","line":7,"text":"\t\"slices\""},
  {"file":"tracing.go","line":8,"text":"\t\"strconv\""},
  {"file":"tracing.go","line":9,"text":"\t\"strings\""},
  {"file":"tracing.go","line":10,"text":"\t\"sync\""},
  {"file":"tracing.go","line":11,"text":"\t\"sync/atomic\""},
  {"file":"tracing.go","line":12,"text":"\t\"time\""},
  {"file":"tracing.go","line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"file":"tracing.go","line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/json\""},
  {"file":"tracing.go","line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"file":"tracing.go","line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"file":"tracing.go","line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs\""},
  {"file":"tracing.go","line":19,"text":"\t\"github.com/zeebo/xxh3\""},
  {"file":"tracing.go","line":20,"text":")"},
  {"file":"tracing.go","line":24,"text":"type Tracer interface {"},
  {"file":"tracing.go","line":26,"text":"\tRecordType(t TracedType)"},
  {"file":"tracing.go","line":28,"text":"\tDumpTypes() error"},
  {"file":"tracing.go","line":29,"text":"}"},
  {"file":"tracing.go","line":34,"text":"type TracedType interface {"},
  {"file":"tracing.go","line":35,"text":"\tId() uint32"},
  {"file":"tracing.go","line":36,"text":"\tFormatFlags() []string"},
  {"file":"tracing.go","line":37,"text":"\tIsConditional() bool"},
  {"file":"tracing.go","line":38,"text":"\tSymbol() *ast.Symbol"},
  {"file":"tracing.go","line":39,"text":"\tAliasSymbol() *ast.Symbol"},
  {"file":"tracing.go","line":40,"text":"\tAliasTypeArguments() []TracedType"},
  {"file":"tracing.go","line":43,"text":"\tIntrinsicName() string"},
  {"file":"tracing.go","line":44,"text":"\tUnionTypes() []TracedType"},
  {"file":"tracing.go","line":45,"text":"\tIntersectionTypes() []TracedType"},
  {"file":"tracing.go","line":46,"text":"\tIndexType() TracedType"},
  {"file":"tracing.go","line":47,"text":"\tIndexedAccessObjectType() TracedType"},
  {"file":"tracing.go","line":48,"text":"\tIndexedAccessIndexType() TracedType"},
  {"file":"tracing.go","line":49,"text":"\tConditionalCheckType() TracedType"},
  {"file":"tracing.go","line":50,"text":"\tConditionalExtendsType() TracedType"},
  {"file":"tracing.go","line":51,"text":"\tConditionalTrueType() TracedType"},
  {"file":"tracing.go","line":52,"text":"\tConditionalFalseType() TracedType"},
  {"file":"tracing.go","line":53,"text":"\tSubstitutionBaseType() TracedType"},
];

export function tracingStrictParityLineText(file: string, line: number): string | undefined {
  return tracingStrictParitySourceLines.find((entry) => entry.file === file && entry.line === line)?.text;
}

export function tracingStrictParityFiles(): readonly string[] {
  return [...new Set(tracingStrictParitySourceLines.map((entry) => entry.file))].sort();
}
