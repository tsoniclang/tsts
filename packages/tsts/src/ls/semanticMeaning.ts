/**
 * Semantic meaning bitset shared by language-service classification helpers.
 *
 * Port of TS-Go `ast.SemanticMeaning`.
 */

export enum SemanticMeaning {
  Value = 1 << 0,
  Type = 1 << 1,
  Namespace = 1 << 2,
  All = Value | Type | Namespace,
}
