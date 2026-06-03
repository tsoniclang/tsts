// checkFlags.ts — Faithful 1:1 port of typescript-go internal/ast/checkflags.go.
//
// CheckFlags is non-zero only in transient symbols created by the Checker.
// Modeled as a const-map (NOT an enum) so it carries no runtime machinery and
// stays a plain `number` at the type level. Bit values verified 1:1 against
// internal/ast/checkflags.go:8-35.

export type CheckFlags = number;

export const CheckFlags = {
  None: 0 as CheckFlags,
  Instantiated: 1 << 0 as CheckFlags, // Instantiated symbol
  SyntheticProperty: 1 << 1 as CheckFlags, // Property in union or intersection type
  SyntheticMethod: 1 << 2 as CheckFlags, // Method in union or intersection type
  Readonly: 1 << 3 as CheckFlags, // Readonly transient symbol
  ReadPartial: 1 << 4 as CheckFlags, // Synthetic property present in some but not all constituents
  WritePartial: 1 << 5 as CheckFlags, // Synthetic property present in some but only satisfied by an index signature in others
  HasNonUniformType: 1 << 6 as CheckFlags, // Synthetic property with non-uniform type in constituents
  HasLiteralType: 1 << 7 as CheckFlags, // Synthetic property with at least one literal type in constituents
  ContainsPublic: 1 << 8 as CheckFlags, // Synthetic property with public constituent(s)
  ContainsProtected: 1 << 9 as CheckFlags, // Synthetic property with protected constituent(s)
  ContainsPrivate: 1 << 10 as CheckFlags, // Synthetic property with private constituent(s)
  ContainsStatic: 1 << 11 as CheckFlags, // Synthetic property with static constituent(s)
  Late: 1 << 12 as CheckFlags, // Late-bound symbol for a computed property with a dynamic name
  ReverseMapped: 1 << 13 as CheckFlags, // Property of reverse-inferred homomorphic mapped type
  OptionalParameter: 1 << 14 as CheckFlags, // Optional parameter
  RestParameter: 1 << 15 as CheckFlags, // Rest parameter
  DeferredType: 1 << 16 as CheckFlags, // Calculation of the type of this symbol is deferred due to processing costs
  HasNeverType: 1 << 17 as CheckFlags, // Synthetic property with at least one never type in constituents
  Mapped: 1 << 18 as CheckFlags, // Property of mapped type
  StripOptional: 1 << 19 as CheckFlags, // Strip optionality in mapped property
  Unresolved: 1 << 20 as CheckFlags, // Unresolved type alias symbol
  IsDiscriminantComputed: 1 << 21 as CheckFlags, // IsDiscriminant flags has been computed
  IsDiscriminant: 1 << 22 as CheckFlags, // Discriminant property
  IndexSymbol: 1 << 23 as CheckFlags, // Synthetic property created from index signature
  Synthetic: 1 << 1 | 1 << 2 as CheckFlags,
  NonUniformAndLiteral: 1 << 6 | 1 << 7 as CheckFlags,
  Partial: 1 << 4 | 1 << 5 as CheckFlags,
} as const;
