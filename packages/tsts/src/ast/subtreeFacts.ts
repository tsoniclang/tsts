export type SubtreeFacts = number;

export const SubtreeFacts = {
  ContainsTypeScript: 1 << 0,
  ContainsJsx: 1 << 1,
  ContainsESDecorators: 1 << 2,
  ContainsUsing: 1 << 3,
  ContainsClassStaticBlocks: 1 << 4,
  ContainsESClassFields: 1 << 5,
  ContainsLogicalAssignments: 1 << 6,
  ContainsNullishCoalescing: 1 << 7,
  ContainsOptionalChaining: 1 << 8,
  ContainsMissingCatchClauseVariable: 1 << 9,
  ContainsESObjectRestOrSpread: 1 << 10,
  ContainsForAwaitOrAsyncGenerator: 1 << 11,
  ContainsAnyAwait: 1 << 12,
  ContainsExponentiationOperator: 1 << 13,
  ContainsLexicalThis: 1 << 14,
  ContainsLexicalSuper: 1 << 15,
  ContainsRestOrSpread: 1 << 16,
  ContainsObjectRestOrSpread: 1 << 17,
  ContainsAwait: 1 << 18,
  ContainsDynamicImport: 1 << 19,
  ContainsClassFields: 1 << 20,
  ContainsDecorators: 1 << 21,
  ContainsIdentifier: 1 << 22,
  ContainsPrivateIdentifierInExpression: 1 << 23,
  ContainsInvalidTemplateEscape: 1 << 24,
  FactsComputed: 1 << 25,
  None: 0,
  ContainsESNext: (1 << 2) | (1 << 3),
  ContainsES2022: (1 << 4) | (1 << 5),
  ContainsES2021: 1 << 6,
  ContainsES2020: (1 << 7) | (1 << 8),
  ContainsES2019: 1 << 9,
  ContainsES2018: (1 << 10) | (1 << 11) | (1 << 24),
  ContainsES2017: 1 << 12,
  ContainsES2016: 1 << 13,
  // Scope Exclusions (subtreefacts.go:57-81)
  // - Bitmasks that exclude flags from propagating out of a specific context
  //   into the subtree flags of their container.
  ExclusionsNode: 1 << 25, // SubtreeFactsComputed
  ExclusionsEraseable: ~(1 << 0), // ^SubtreeContainsTypeScript
  ExclusionsOuterExpression: 1 << 25, // ExclusionsNode
  ExclusionsPropertyAccess: 1 << 25, // ExclusionsNode
  ExclusionsElementAccess: 1 << 25, // ExclusionsNode
  ExclusionsArrowFunction: (1 << 25) /* Node */ | (1 << 18) /* Await */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsFunction:
    (1 << 25) /* Node */ | (1 << 14) /* LexicalThis */ | (1 << 15) /* LexicalSuper */ | (1 << 18) /* Await */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsConstructor:
    (1 << 25) /* Node */ | (1 << 14) /* LexicalThis */ | (1 << 15) /* LexicalSuper */ | (1 << 18) /* Await */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsMethod:
    (1 << 25) /* Node */ | (1 << 14) /* LexicalThis */ | (1 << 15) /* LexicalSuper */ | (1 << 18) /* Await */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsAccessor:
    (1 << 25) /* Node */ | (1 << 14) /* LexicalThis */ | (1 << 15) /* LexicalSuper */ | (1 << 18) /* Await */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsProperty: (1 << 25) /* Node */ | (1 << 14) /* LexicalThis */ | (1 << 15) /* LexicalSuper */,
  ExclusionsClass: 1 << 25, // ExclusionsNode
  ExclusionsModule: (1 << 25) /* Node */ | (1 << 14) /* LexicalThis */ | (1 << 15) /* LexicalSuper */,
  ExclusionsObjectLiteral: (1 << 25) /* Node */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsArrayLiteral: 1 << 25, // ExclusionsNode
  ExclusionsCall: 1 << 25, // ExclusionsNode
  ExclusionsNew: 1 << 25, // ExclusionsNode
  ExclusionsVariableDeclarationList: (1 << 25) /* Node */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsParameter: 1 << 25, // ExclusionsNode
  ExclusionsCatchClause: (1 << 25) /* Node */ | (1 << 17) /* ObjectRestOrSpread */,
  ExclusionsBindingPattern: (1 << 25) /* Node */ | (1 << 16) /* RestOrSpread */,

  // Masks (subtreefacts.go:83-86)
  ContainsLexicalThisOrSuper: (1 << 14) | (1 << 15),
} as const;
