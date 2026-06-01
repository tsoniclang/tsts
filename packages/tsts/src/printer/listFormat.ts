export type ListFormat = number;

export const LFNone = 0 as ListFormat;

export const LFSingleLine = 0 as ListFormat;
export const LFMultiLine = (1 << 0) as ListFormat;
export const LFPreserveLines = (1 << 1) as ListFormat;
export const LFLinesMask = LFSingleLine | LFMultiLine | LFPreserveLines;

export const LFNotDelimited = 0 as ListFormat;
export const LFBarDelimited = (1 << 2) as ListFormat;
export const LFAmpersandDelimited = (1 << 3) as ListFormat;
export const LFCommaDelimited = (1 << 4) as ListFormat;
export const LFAsteriskDelimited = (1 << 5) as ListFormat;
export const LFDelimitersMask = LFBarDelimited | LFAmpersandDelimited | LFCommaDelimited | LFAsteriskDelimited;

export const LFAllowTrailingComma = (1 << 6) as ListFormat;

export const LFIndented = (1 << 7) as ListFormat;
export const LFSpaceBetweenBraces = (1 << 8) as ListFormat;
export const LFSpaceBetweenSiblings = (1 << 9) as ListFormat;

export const LFBraces = (1 << 10) as ListFormat;
export const LFParenthesis = (1 << 11) as ListFormat;
export const LFAngleBrackets = (1 << 12) as ListFormat;
export const LFSquareBrackets = (1 << 13) as ListFormat;
export const LFBracketsMask = LFBraces | LFParenthesis | LFAngleBrackets | LFSquareBrackets;

export const LFOptionalIfNil = (1 << 14) as ListFormat;
export const LFOptionalIfEmpty = (1 << 15) as ListFormat;
export const LFOptional = LFOptionalIfNil | LFOptionalIfEmpty;

export const LFPreferNewLine = (1 << 16) as ListFormat;
export const LFNoTrailingNewLine = (1 << 17) as ListFormat;
export const LFNoInterveningComments = (1 << 18) as ListFormat;
export const LFNoSpaceIfEmpty = (1 << 19) as ListFormat;
export const LFSingleElement = (1 << 20) as ListFormat;
export const LFSpaceAfterList = (1 << 21) as ListFormat;

export const LFModifiers = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments | LFSpaceAfterList;
export const LFHeritageClauses = LFSingleLine | LFSpaceBetweenSiblings;
export const LFSingleLineTypeLiteralMembers = LFSingleLine | LFSpaceBetweenBraces | LFSpaceBetweenSiblings;
export const LFMultiLineTypeLiteralMembers = LFMultiLine | LFIndented | LFOptionalIfEmpty;

export const LFSingleLineTupleTypeElements = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFMultiLineTupleTypeElements = LFCommaDelimited | LFIndented | LFSpaceBetweenSiblings | LFMultiLine;
export const LFUnionTypeConstituents = LFBarDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFIntersectionTypeConstituents = LFAmpersandDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFObjectBindingPatternElements = LFSingleLine | LFAllowTrailingComma | LFSpaceBetweenBraces | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty;
export const LFArrayBindingPatternElements = LFSingleLine | LFAllowTrailingComma | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty;
export const LFObjectLiteralExpressionProperties = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty;
export const LFImportAttributes = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty;
export const LFArrayLiteralExpressionElements = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFIndented | LFSquareBrackets;
export const LFCommaListElements = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFCallExpressionArguments = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis;
export const LFNewExpressionArguments = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis | LFOptionalIfNil;
export const LFTemplateExpressionSpans = LFSingleLine | LFNoInterveningComments;
export const LFSingleLineBlockStatements = LFSpaceBetweenBraces | LFSpaceBetweenSiblings | LFSingleLine;
export const LFMultiLineBlockStatements = LFIndented | LFMultiLine;
export const LFVariableDeclarationList = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFSingleLineFunctionBodyStatements = LFSingleLine | LFSpaceBetweenSiblings | LFSpaceBetweenBraces;
export const LFMultiLineFunctionBodyStatements = LFMultiLine;
export const LFClassHeritageClauses = LFSingleLine;
export const LFClassMembers = LFIndented | LFMultiLine;
export const LFInterfaceMembers = LFIndented | LFMultiLine;
export const LFEnumMembers = LFCommaDelimited | LFIndented | LFMultiLine;
export const LFCaseBlockClauses = LFIndented | LFMultiLine;
export const LFNamedImportsOrExportsElements = LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFSingleLine | LFSpaceBetweenBraces | LFNoSpaceIfEmpty;
export const LFJsxElementOrFragmentChildren = LFSingleLine | LFNoInterveningComments;
export const LFJsxElementAttributes = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments;
export const LFCaseOrDefaultClauseStatements = LFIndented | LFMultiLine | LFNoTrailingNewLine | LFOptionalIfEmpty;
export const LFHeritageClauseTypes = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFSourceFileStatements = LFMultiLine | LFNoTrailingNewLine;
export const LFDecorators = LFMultiLine | LFOptional | LFSpaceAfterList;
export const LFTypeArguments = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional;
export const LFTypeParameters = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional;
export const LFParameters = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis;
export const LFSingleArrowParameter = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFIndexSignatureParameters = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFIndented | LFSquareBrackets;
export const LFJSDocComment = LFMultiLine | LFAsteriskDelimited;
export const LFImportClauseEntries = LFImportAttributes;

export function getOpeningBracket(format: ListFormat): string {
  switch (format & LFBracketsMask) {
    case LFBraces: return "{";
    case LFParenthesis: return "(";
    case LFAngleBrackets: return "<";
    case LFSquareBrackets: return "[";
    default: throw new Error(`Unexpected bracket: ${format & LFBracketsMask}`);
  }
}

export function getClosingBracket(format: ListFormat): string {
  switch (format & LFBracketsMask) {
    case LFBraces: return "}";
    case LFParenthesis: return ")";
    case LFAngleBrackets: return ">";
    case LFSquareBrackets: return "]";
    default: throw new Error(`Unexpected bracket: ${format & LFBracketsMask}`);
  }
}
