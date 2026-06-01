/**
 * Parser ParseFlags.
 *
 * Port of TS-Go `internal/parser/types.go` (~14 LoC). Bitflags
 * controlling parser context behavior. Replaces Go iota enum with
 * constant-union per [[no-enums]].
 */

export type ParseFlags = number;
export const ParseFlags = {
  None: 0 as ParseFlags,
  Yield: (1 << 0) as ParseFlags,
  Await: (1 << 1) as ParseFlags,
  Type: (1 << 2) as ParseFlags,
  IgnoreMissingOpenBrace: (1 << 4) as ParseFlags,
  JSDoc: (1 << 5) as ParseFlags,
} as const;
