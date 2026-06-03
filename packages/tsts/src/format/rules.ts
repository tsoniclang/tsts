/**
 * Format rule table.
 *
 * Mechanical 1:1 port of TS-Go `internal/format/rules.go`. `getAllRules`
 * enumerates every formatting rule, grouped by priority tier
 * (high-priority common rules, user-configurable rules, low-priority
 * common rules) and returned in that order. Each rule binds a left/right
 * token-range trigger, a context-predicate list, and a rule action.
 *
 * lsutil dependency: TS-Go's NoOptionalSemicolon / OptionalSemicolon
 * rules compare against `lsutil.SemicolonPreferenceRemove` /
 * `lsutil.SemicolonPreferenceInsert`. The TSTS FormatCodeSettings surface
 * models the semicolon preference as the string union
 * "ignore" | "insert" | "remove", so those literals stand in for the
 * lsutil enum values.
 */

import { Kind } from "../ast/index.js";

import { RuleAction, RuleFlags, type RuleSpec, type TokenRange, anyContext, rule } from "./rule.js";
import {
  insertSpaceAfterCommaDelimiterOption,
  insertSpaceAfterConstructorOption,
  insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption,
  insertSpaceAfterKeywordsInControlFlowStatementsOption,
  insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption,
  insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption,
  insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption,
  insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption,
  insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption,
  insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption,
  insertSpaceAfterSemicolonInForStatementsOption,
  insertSpaceAfterTypeAssertionOption,
  insertSpaceBeforeAndAfterBinaryOperatorsOption,
  insertSpaceBeforeFunctionParenthesisOption,
  insertSpaceBeforeTypeAnnotationOption,
  isAfterCodeBlockContext,
  isArrowFunctionContext,
  isBeforeBlockContext,
  isBeforeMultilineBlockContext,
  isBinaryOpContext,
  isBraceWrappedContext,
  isConditionalOperatorContext,
  isConstructorSignatureContext,
  isControlDeclContext,
  isEndOfDecoratorContextOnSameLine,
  isForContext,
  isFunctionCallOrNewContext,
  isFunctionDeclContext,
  isFunctionDeclarationOrFunctionExpressionContext,
  isImportTypeContext,
  isJsxAttributeContext,
  isJsxExpressionContext,
  isJsxSelfClosingElementContext,
  isModuleDeclContext,
  isMultilineBlockContext,
  isNextTokenNotCloseBracket,
  isNextTokenNotCloseParen,
  isNextTokenParentJsxAttribute,
  isNextTokenParentJsxNamespacedName,
  isNextTokenParentNotJsxNamespacedName,
  isNonJsxElementOrFragmentContext,
  isNonJsxSameLineTokenContext,
  isNonJsxTextContext,
  isNonNullAssertionContext,
  isNonOptionalPropertyContext,
  isNonTypeAssertionContext,
  isNotBeforeBlockInFunctionDeclarationContext,
  isNotBinaryOpContext,
  isNotForContext,
  isNotFormatOnEnter,
  isNotFunctionDeclContext,
  isNotPropertyAccessOnIntegerLiteral,
  isNotStatementConditionContext,
  isNotTypeAnnotationContext,
  isObjectContext,
  isObjectTypeContext,
  isOptionDisabled,
  isOptionDisabledOrUndefined,
  isOptionDisabledOrUndefinedOrTokensOnSameLine,
  isOptionEnabled,
  isOptionEnabledOrUndefined,
  isPreviousTokenNotComma,
  isSameLineTokenOrBeforeBlockContext,
  isSemicolonDeletionContext,
  isSemicolonInsertionContext,
  isSingleLineBlockContext,
  isStartOfVariableDeclarationList,
  isTypeAnnotationContext,
  isTypeArgumentOrParameterOrAssertionContext,
  isTypeAssertionContext,
  isTypeScriptDeclWithBlockContext,
  isVoidOpContext,
  isYieldOrYieldStarWithOperand,
  optionEquals,
  placeOpenBraceOnNewLineForControlBlocksOption,
  placeOpenBraceOnNewLineForFunctionsOption,
  semicolonOption,
} from "./ruleContext.js";

// SemicolonPreference values — the TSTS FormatCodeSettings.semicolons string
// union stands in for TS-Go's lsutil.SemicolonPreference enum.
const SemicolonPreferenceRemove: FormatSemicolonPreference = "remove";
const SemicolonPreferenceInsert: FormatSemicolonPreference = "insert";
type FormatSemicolonPreference = "ignore" | "insert" | "remove" | undefined;

export function getAllRules(): readonly RuleSpec[] {
  const allTokens: Kind[] = [];
  for (let token = Kind.FirstToken; token <= Kind.LastToken; token++) {
    if (token !== Kind.EndOfFile) {
      allTokens.push(token);
    }
  }

  const anyTokenExcept = (...tokens: readonly Kind[]): TokenRange => {
    const newTokens: Kind[] = [];
    for (const token of allTokens) {
      if (tokens.includes(token)) {
        continue;
      }
      newTokens.push(token);
    }
    return {
      isSpecific: false,
      tokens: newTokens,
    };
  };

  const anyToken: TokenRange = {
    isSpecific: false,
    tokens: allTokens,
  };

  const anyTokenIncludingMultilineComments = tokenRangeFromEx(allTokens, Kind.MultiLineCommentTrivia);
  const anyTokenIncludingEOF = tokenRangeFromEx(allTokens, Kind.EndOfFile);
  const keywords = tokenRangeFromRange(Kind.FirstKeyword, Kind.LastKeyword);
  const binaryOperators = tokenRangeFromRange(Kind.FirstBinaryOperator, Kind.LastBinaryOperator);
  const binaryKeywordOperators: Kind[] = [
    Kind.InKeyword,
    Kind.InstanceOfKeyword,
    Kind.OfKeyword,
    Kind.AsKeyword,
    Kind.IsKeyword,
    Kind.SatisfiesKeyword,
  ];
  const unaryPrefixOperators: Kind[] = [Kind.PlusPlusToken, Kind.MinusToken, Kind.TildeToken, Kind.ExclamationToken];
  const unaryPrefixExpressions: Kind[] = [
    Kind.NumericLiteral,
    Kind.BigIntLiteral,
    Kind.Identifier,
    Kind.OpenParenToken,
    Kind.OpenBracketToken,
    Kind.OpenBraceToken,
    Kind.ThisKeyword,
    Kind.NewKeyword,
  ];
  const unaryPreincrementExpressions: Kind[] = [Kind.Identifier, Kind.OpenParenToken, Kind.ThisKeyword, Kind.NewKeyword];
  const unaryPostincrementExpressions: Kind[] = [Kind.Identifier, Kind.CloseParenToken, Kind.CloseBracketToken, Kind.NewKeyword];
  const unaryPredecrementExpressions: Kind[] = [Kind.Identifier, Kind.OpenParenToken, Kind.ThisKeyword, Kind.NewKeyword];
  const unaryPostdecrementExpressions: Kind[] = [Kind.Identifier, Kind.CloseParenToken, Kind.CloseBracketToken, Kind.NewKeyword];
  const comments: Kind[] = [Kind.SingleLineCommentTrivia, Kind.MultiLineCommentTrivia];
  const typeKeywords: Kind[] = [
    Kind.AnyKeyword,
    Kind.AssertsKeyword,
    Kind.BigIntKeyword,
    Kind.BooleanKeyword,
    Kind.FalseKeyword,
    Kind.InferKeyword,
    Kind.KeyOfKeyword,
    Kind.NeverKeyword,
    Kind.NullKeyword,
    Kind.NumberKeyword,
    Kind.ObjectKeyword,
    Kind.ReadonlyKeyword,
    Kind.StringKeyword,
    Kind.SymbolKeyword,
    Kind.TypeOfKeyword,
    Kind.TrueKeyword,
    Kind.VoidKeyword,
    Kind.UndefinedKeyword,
    Kind.UniqueKeyword,
    Kind.UnknownKeyword,
  ];
  const typeNames: Kind[] = [Kind.Identifier, ...typeKeywords];

  // Place a space before open brace in a function declaration
  // TypeScript: Function can have return types, which can be made of tons of different token kinds
  const functionOpenBraceLeftTokenRange = anyTokenIncludingMultilineComments;

  // Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
  const typeScriptOpenBraceLeftTokenRange = tokenRangeFrom(Kind.Identifier, Kind.GreaterThanToken, Kind.MultiLineCommentTrivia, Kind.ClassKeyword, Kind.ExportKeyword, Kind.ImportKeyword);

  // Place a space before open brace in a control flow construct
  const controlOpenBraceLeftTokenRange = tokenRangeFrom(Kind.CloseParenToken, Kind.MultiLineCommentTrivia, Kind.DoKeyword, Kind.TryKeyword, Kind.FinallyKeyword, Kind.ElseKeyword, Kind.CatchKeyword);

  // These rules are higher in priority than user-configurable
  const highPriorityCommonRules: RuleSpec[] = [
    // Leave comments alone
    rule("IgnoreBeforeComment", anyToken, comments, anyContext, RuleAction.StopProcessingSpaceActions),
    rule("IgnoreAfterLineComment", Kind.SingleLineCommentTrivia, anyToken, anyContext, RuleAction.StopProcessingSpaceActions),

    rule("NotSpaceBeforeColon", anyToken, Kind.ColonToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], RuleAction.DeleteSpace),
    rule("SpaceAfterColon", Kind.ColonToken, anyToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNextTokenParentNotJsxNamespacedName], RuleAction.InsertSpace),
    rule("NoSpaceBeforeQuestionMark", anyToken, Kind.QuestionToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], RuleAction.DeleteSpace),
    // insert space after '?' only when it is used in conditional operator
    rule("SpaceAfterQuestionMarkInConditionalOperator", Kind.QuestionToken, anyToken, [isNonJsxSameLineTokenContext, isConditionalOperatorContext], RuleAction.InsertSpace),

    // in other cases there should be no space between '?' and next token
    rule("NoSpaceAfterQuestionMark", Kind.QuestionToken, anyToken, [isNonJsxSameLineTokenContext, isNonOptionalPropertyContext], RuleAction.DeleteSpace),

    rule("NoSpaceBeforeDot", anyToken, [Kind.DotToken, Kind.QuestionDotToken], [isNonJsxSameLineTokenContext, isNotPropertyAccessOnIntegerLiteral], RuleAction.DeleteSpace),
    rule("NoSpaceAfterDot", [Kind.DotToken, Kind.QuestionDotToken], anyToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    rule("NoSpaceBetweenImportParenInImportType", Kind.ImportKeyword, Kind.OpenParenToken, [isNonJsxSameLineTokenContext, isImportTypeContext], RuleAction.DeleteSpace),

    // Special handling of unary operators.
    // Prefix operators generally shouldn't have a space between
    // them and their target unary expression.
    rule("NoSpaceAfterUnaryPrefixOperator", unaryPrefixOperators, unaryPrefixExpressions, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterUnaryPreincrementOperator", Kind.PlusPlusToken, unaryPreincrementExpressions, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterUnaryPredecrementOperator", Kind.MinusMinusToken, unaryPredecrementExpressions, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeUnaryPostincrementOperator", unaryPostincrementExpressions, Kind.PlusPlusToken, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeUnaryPostdecrementOperator", unaryPostdecrementExpressions, Kind.MinusMinusToken, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], RuleAction.DeleteSpace),

    // More unary operator special-casing.
    // DevDiv 181814: Be careful when removing leading whitespace
    // around unary operators.  Examples:
    //      1 - -2  --X--> 1--2
    //      a + ++b --X--> a+++b
    rule("SpaceAfterPostincrementWhenFollowedByAdd", Kind.PlusPlusToken, Kind.PlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterAddWhenFollowedByUnaryPlus", Kind.PlusToken, Kind.PlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterAddWhenFollowedByPreincrement", Kind.PlusToken, Kind.PlusPlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterPostdecrementWhenFollowedBySubtract", Kind.MinusMinusToken, Kind.MinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterSubtractWhenFollowedByUnaryMinus", Kind.MinusToken, Kind.MinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterSubtractWhenFollowedByPredecrement", Kind.MinusToken, Kind.MinusMinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),

    rule("NoSpaceAfterCloseBrace", Kind.CloseBraceToken, [Kind.CommaToken, Kind.SemicolonToken], [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    // For functions and control block place } on a new line [multi-line rule]
    rule("NewLineBeforeCloseBraceInBlockContext", anyTokenIncludingMultilineComments, Kind.CloseBraceToken, [isMultilineBlockContext], RuleAction.InsertNewLine),

    // Space/new line after }.
    rule("SpaceAfterCloseBrace", Kind.CloseBraceToken, anyTokenExcept(Kind.CloseParenToken), [isNonJsxSameLineTokenContext, isAfterCodeBlockContext], RuleAction.InsertSpace),
    // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
    // Also should not apply to })
    rule("SpaceBetweenCloseBraceAndElse", Kind.CloseBraceToken, Kind.ElseKeyword, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceBetweenCloseBraceAndWhile", Kind.CloseBraceToken, Kind.WhileKeyword, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceBetweenEmptyBraceBrackets", Kind.OpenBraceToken, Kind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectContext], RuleAction.DeleteSpace),

    // Add a space after control dec context if the next character is an open bracket ex: 'if (false)[a, b] = [1, 2];' -> 'if (false) [a, b] = [1, 2];'
    rule("SpaceAfterConditionalClosingParen", Kind.CloseParenToken, Kind.OpenBracketToken, [isControlDeclContext], RuleAction.InsertSpace),

    rule("NoSpaceBetweenFunctionKeywordAndStar", Kind.FunctionKeyword, Kind.AsteriskToken, [isFunctionDeclarationOrFunctionExpressionContext], RuleAction.DeleteSpace),
    rule("SpaceAfterStarInGeneratorDeclaration", Kind.AsteriskToken, Kind.Identifier, [isFunctionDeclarationOrFunctionExpressionContext], RuleAction.InsertSpace),

    rule("SpaceAfterFunctionInFuncDecl", Kind.FunctionKeyword, anyToken, [isFunctionDeclContext], RuleAction.InsertSpace),
    // Insert new line after { and before } in multi-line contexts.
    rule("NewLineAfterOpenBraceInBlockContext", Kind.OpenBraceToken, anyToken, [isMultilineBlockContext], RuleAction.InsertNewLine),

    // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
    // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
    //      get x() {}
    //      set x(val) {}
    rule("SpaceAfterGetSetInMember", [Kind.GetKeyword, Kind.SetKeyword], Kind.Identifier, [isFunctionDeclContext], RuleAction.InsertSpace),

    rule("NoSpaceBetweenYieldKeywordAndStar", Kind.YieldKeyword, Kind.AsteriskToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], RuleAction.DeleteSpace),
    rule("SpaceBetweenYieldOrYieldStarAndOperand", [Kind.YieldKeyword, Kind.AsteriskToken], anyToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], RuleAction.InsertSpace),

    rule("NoSpaceBetweenReturnAndSemicolon", Kind.ReturnKeyword, Kind.SemicolonToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("SpaceAfterCertainKeywords", [Kind.VarKeyword, Kind.ThrowKeyword, Kind.NewKeyword, Kind.DeleteKeyword, Kind.ReturnKeyword, Kind.TypeOfKeyword, Kind.AwaitKeyword], anyToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceAfterLetConstInVariableDeclaration", [Kind.LetKeyword, Kind.ConstKeyword], anyToken, [isNonJsxSameLineTokenContext, isStartOfVariableDeclarationList], RuleAction.InsertSpace),
    rule("NoSpaceBeforeOpenParenInFuncCall", anyToken, Kind.OpenParenToken, [isNonJsxSameLineTokenContext, isFunctionCallOrNewContext, isPreviousTokenNotComma], RuleAction.DeleteSpace),

    // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
    rule("SpaceBeforeBinaryKeywordOperator", anyToken, binaryKeywordOperators, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterBinaryKeywordOperator", binaryKeywordOperators, anyToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),

    rule("SpaceAfterVoidOperator", Kind.VoidKeyword, anyToken, [isNonJsxSameLineTokenContext, isVoidOpContext], RuleAction.InsertSpace),

    // Async-await
    rule("SpaceBetweenAsyncAndOpenParen", Kind.AsyncKeyword, Kind.OpenParenToken, [isArrowFunctionContext, isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceBetweenAsyncAndFunctionKeyword", Kind.AsyncKeyword, [Kind.FunctionKeyword, Kind.Identifier], [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

    // Template string
    rule("NoSpaceBetweenTagAndTemplateString", [Kind.Identifier, Kind.CloseParenToken], [Kind.NoSubstitutionTemplateLiteral, Kind.TemplateHead], [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // JSX opening elements
    rule("SpaceBeforeJsxAttribute", anyToken, Kind.Identifier, [isNextTokenParentJsxAttribute, isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceBeforeSlashInJsxOpeningElement", anyToken, Kind.SlashToken, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceBeforeGreaterThanTokenInJsxOpeningElement", Kind.SlashToken, Kind.GreaterThanToken, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeEqualInJsxAttribute", anyToken, Kind.EqualsToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterEqualInJsxAttribute", Kind.EqualsToken, anyToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeJsxNamespaceColon", Kind.Identifier, Kind.ColonToken, [isNextTokenParentJsxNamespacedName], RuleAction.DeleteSpace),
    rule("NoSpaceAfterJsxNamespaceColon", Kind.ColonToken, Kind.Identifier, [isNextTokenParentJsxNamespacedName], RuleAction.DeleteSpace),

    // TypeScript-specific rules
    // Use of module as a function call. e.g.: import m2 = module("m2");
    rule("NoSpaceAfterModuleImport", [Kind.ModuleKeyword, Kind.RequireKeyword], Kind.OpenParenToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    // Add a space around certain TypeScript keywords
    rule(
      "SpaceAfterCertainTypeScriptKeywords",
      [
        Kind.AbstractKeyword,
        Kind.AccessorKeyword,
        Kind.ClassKeyword,
        Kind.DeclareKeyword,
        Kind.DefaultKeyword,
        Kind.EnumKeyword,
        Kind.ExportKeyword,
        Kind.ExtendsKeyword,
        Kind.GetKeyword,
        Kind.ImplementsKeyword,
        Kind.ImportKeyword,
        Kind.InterfaceKeyword,
        Kind.ModuleKeyword,
        Kind.NamespaceKeyword,
        Kind.OverrideKeyword,
        Kind.PrivateKeyword,
        Kind.PublicKeyword,
        Kind.ProtectedKeyword,
        Kind.ReadonlyKeyword,
        Kind.SetKeyword,
        Kind.StaticKeyword,
        Kind.TypeKeyword,
        Kind.FromKeyword,
        Kind.KeyOfKeyword,
        Kind.InferKeyword,
      ],
      anyToken,
      [isNonJsxSameLineTokenContext],
      RuleAction.InsertSpace,
    ),
    rule(
      "SpaceBeforeCertainTypeScriptKeywords",
      anyToken,
      [Kind.ExtendsKeyword, Kind.ImplementsKeyword, Kind.FromKeyword],
      [isNonJsxSameLineTokenContext],
      RuleAction.InsertSpace,
    ),
    // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
    rule("SpaceAfterModuleName", Kind.StringLiteral, Kind.OpenBraceToken, [isModuleDeclContext], RuleAction.InsertSpace),

    // Lambda expressions
    rule("SpaceBeforeArrow", anyToken, Kind.EqualsGreaterThanToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceAfterArrow", Kind.EqualsGreaterThanToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

    // Optional parameters and let args
    rule("NoSpaceAfterEllipsis", Kind.DotDotDotToken, Kind.Identifier, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterOptionalParameters", Kind.QuestionToken, [Kind.CloseParenToken, Kind.CommaToken], [isNonJsxSameLineTokenContext, isNotBinaryOpContext], RuleAction.DeleteSpace),

    // Remove spaces in empty interface literals. e.g.: x: {}
    rule("NoSpaceBetweenEmptyInterfaceBraceBrackets", Kind.OpenBraceToken, Kind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectTypeContext], RuleAction.DeleteSpace),

    // generics and type assertions
    rule("NoSpaceBeforeOpenAngularBracket", typeNames, Kind.LessThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
    rule("NoSpaceBetweenCloseParenAndAngularBracket", Kind.CloseParenToken, Kind.LessThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterOpenAngularBracket", Kind.LessThanToken, anyToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeCloseAngularBracket", anyToken, Kind.GreaterThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterCloseAngularBracket", Kind.GreaterThanToken, [Kind.OpenParenToken, Kind.OpenBracketToken, Kind.GreaterThanToken, Kind.CommaToken], [
      isNonJsxSameLineTokenContext,
      isTypeArgumentOrParameterOrAssertionContext,
      isNotFunctionDeclContext, /* To prevent an interference with the SpaceBeforeOpenParenInFuncDecl rule */
      isNonTypeAssertionContext,
    ], RuleAction.DeleteSpace),

    // decorators
    rule("SpaceBeforeAt", [Kind.CloseParenToken, Kind.Identifier], Kind.AtToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterAt", Kind.AtToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    // Insert space after @ in decorator
    rule(
      "SpaceAfterDecorator",
      anyToken,
      [
        Kind.AbstractKeyword,
        Kind.Identifier,
        Kind.ExportKeyword,
        Kind.DefaultKeyword,
        Kind.ClassKeyword,
        Kind.StaticKeyword,
        Kind.PublicKeyword,
        Kind.PrivateKeyword,
        Kind.ProtectedKeyword,
        Kind.GetKeyword,
        Kind.SetKeyword,
        Kind.OpenBracketToken,
        Kind.AsteriskToken,
      ],
      [isEndOfDecoratorContextOnSameLine],
      RuleAction.InsertSpace,
    ),

    rule("NoSpaceBeforeNonNullAssertionOperator", anyToken, Kind.ExclamationToken, [isNonJsxSameLineTokenContext, isNonNullAssertionContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterNewKeywordOnConstructorSignature", Kind.NewKeyword, Kind.OpenParenToken, [isNonJsxSameLineTokenContext, isConstructorSignatureContext], RuleAction.DeleteSpace),
    rule("SpaceLessThanAndNonJSXTypeAnnotation", Kind.LessThanToken, Kind.LessThanToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
  ];

  // These rules are applied after high priority
  const userConfigurableRules: RuleSpec[] = [
    // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
    rule("SpaceAfterConstructor", Kind.ConstructorKeyword, Kind.OpenParenToken, [isOptionEnabled(insertSpaceAfterConstructorOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterConstructor", Kind.ConstructorKeyword, Kind.OpenParenToken, [isOptionDisabledOrUndefined(insertSpaceAfterConstructorOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    rule("SpaceAfterComma", Kind.CommaToken, anyToken, [isOptionEnabled(insertSpaceAfterCommaDelimiterOption), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNextTokenNotCloseBracket, isNextTokenNotCloseParen], RuleAction.InsertSpace),
    rule("NoSpaceAfterComma", Kind.CommaToken, anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterCommaDelimiterOption), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext], RuleAction.DeleteSpace),

    // Insert space after function keyword for anonymous functions
    rule("SpaceAfterAnonymousFunctionKeyword", [Kind.FunctionKeyword, Kind.AsteriskToken], Kind.OpenParenToken, [isOptionEnabled(insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption), isFunctionDeclContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterAnonymousFunctionKeyword", [Kind.FunctionKeyword, Kind.AsteriskToken], Kind.OpenParenToken, [isOptionDisabledOrUndefined(insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption), isFunctionDeclContext], RuleAction.DeleteSpace),

    // Insert space after keywords in control flow statements
    rule("SpaceAfterKeywordInControl", keywords, Kind.OpenParenToken, [isOptionEnabled(insertSpaceAfterKeywordsInControlFlowStatementsOption), isControlDeclContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterKeywordInControl", keywords, Kind.OpenParenToken, [isOptionDisabledOrUndefined(insertSpaceAfterKeywordsInControlFlowStatementsOption), isControlDeclContext], RuleAction.DeleteSpace),

    // Insert space after opening and before closing nonempty parenthesis
    rule("SpaceAfterOpenParen", Kind.OpenParenToken, anyToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceBeforeCloseParen", anyToken, Kind.CloseParenToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceBetweenOpenParens", Kind.OpenParenToken, Kind.OpenParenToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceBetweenParens", Kind.OpenParenToken, Kind.CloseParenToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterOpenParen", Kind.OpenParenToken, anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeCloseParen", anyToken, Kind.CloseParenToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // Insert space after opening and before closing nonempty brackets
    rule("SpaceAfterOpenBracket", Kind.OpenBracketToken, anyToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("SpaceBeforeCloseBracket", anyToken, Kind.CloseBracketToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceBetweenBrackets", Kind.OpenBracketToken, Kind.CloseBracketToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterOpenBracket", Kind.OpenBracketToken, anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeCloseBracket", anyToken, Kind.CloseBracketToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
    rule("SpaceAfterOpenBrace", Kind.OpenBraceToken, anyToken, [isOptionEnabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isBraceWrappedContext], RuleAction.InsertSpace),
    rule("SpaceBeforeCloseBrace", anyToken, Kind.CloseBraceToken, [isOptionEnabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isBraceWrappedContext], RuleAction.InsertSpace),
    rule("NoSpaceBetweenEmptyBraceBrackets", Kind.OpenBraceToken, Kind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterOpenBrace", Kind.OpenBraceToken, anyToken, [isOptionDisabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeCloseBrace", anyToken, Kind.CloseBraceToken, [isOptionDisabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // Insert a space after opening and before closing empty brace brackets
    rule("SpaceBetweenEmptyBraceBrackets", Kind.OpenBraceToken, Kind.CloseBraceToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption)], RuleAction.InsertSpace),
    rule("NoSpaceBetweenEmptyBraceBrackets", Kind.OpenBraceToken, Kind.CloseBraceToken, [isOptionDisabled(insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // Insert space after opening and before closing template string braces
    rule("SpaceAfterTemplateHeadAndMiddle", [Kind.TemplateHead, Kind.TemplateMiddle], anyToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxTextContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),
    rule("SpaceBeforeTemplateMiddleAndTail", anyToken, [Kind.TemplateMiddle, Kind.TemplateTail], [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterTemplateHeadAndMiddle", [Kind.TemplateHead, Kind.TemplateMiddle], anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxTextContext], RuleAction.DeleteSpace, RuleFlags.CanDeleteNewLines),
    rule("NoSpaceBeforeTemplateMiddleAndTail", anyToken, [Kind.TemplateMiddle, Kind.TemplateTail], [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // No space after { and before } in JSX expression
    rule("SpaceAfterOpenBraceInJsxExpression", Kind.OpenBraceToken, anyToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.InsertSpace),
    rule("SpaceBeforeCloseBraceInJsxExpression", anyToken, Kind.CloseBraceToken, [isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterOpenBraceInJsxExpression", Kind.OpenBraceToken, anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.DeleteSpace),
    rule("NoSpaceBeforeCloseBraceInJsxExpression", anyToken, Kind.CloseBraceToken, [isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.DeleteSpace),

    // Insert space after semicolon in for statement
    rule("SpaceAfterSemicolonInFor", Kind.SemicolonToken, anyToken, [isOptionEnabled(insertSpaceAfterSemicolonInForStatementsOption), isNonJsxSameLineTokenContext, isForContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterSemicolonInFor", Kind.SemicolonToken, anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterSemicolonInForStatementsOption), isNonJsxSameLineTokenContext, isForContext], RuleAction.DeleteSpace),

    // Insert space before and after binary operators
    rule("SpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionEnabled(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("SpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionEnabled(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
    rule("NoSpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionDisabledOrUndefined(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionDisabledOrUndefined(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.DeleteSpace),

    rule("SpaceBeforeOpenParenInFuncDecl", anyToken, Kind.OpenParenToken, [isOptionEnabled(insertSpaceBeforeFunctionParenthesisOption), isNonJsxSameLineTokenContext, isFunctionDeclContext], RuleAction.InsertSpace),
    rule("NoSpaceBeforeOpenParenInFuncDecl", anyToken, Kind.OpenParenToken, [isOptionDisabledOrUndefined(insertSpaceBeforeFunctionParenthesisOption), isNonJsxSameLineTokenContext, isFunctionDeclContext], RuleAction.DeleteSpace),

    // Open Brace braces after control block
    rule("NewLineBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, Kind.OpenBraceToken, [isOptionEnabled(placeOpenBraceOnNewLineForControlBlocksOption), isControlDeclContext, isBeforeMultilineBlockContext], RuleAction.InsertNewLine, RuleFlags.CanDeleteNewLines),

    // Open Brace braces after function
    // TypeScript: Function can have return types, which can be made of tons of different token kinds
    rule("NewLineBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, Kind.OpenBraceToken, [isOptionEnabled(placeOpenBraceOnNewLineForFunctionsOption), isFunctionDeclContext, isBeforeMultilineBlockContext], RuleAction.InsertNewLine, RuleFlags.CanDeleteNewLines),
    // Open Brace braces after TypeScript module/class/interface
    rule("NewLineBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, Kind.OpenBraceToken, [isOptionEnabled(placeOpenBraceOnNewLineForFunctionsOption), isTypeScriptDeclWithBlockContext, isBeforeMultilineBlockContext], RuleAction.InsertNewLine, RuleFlags.CanDeleteNewLines),

    rule("SpaceAfterTypeAssertion", Kind.GreaterThanToken, anyToken, [isOptionEnabled(insertSpaceAfterTypeAssertionOption), isNonJsxSameLineTokenContext, isTypeAssertionContext], RuleAction.InsertSpace),
    rule("NoSpaceAfterTypeAssertion", Kind.GreaterThanToken, anyToken, [isOptionDisabledOrUndefined(insertSpaceAfterTypeAssertionOption), isNonJsxSameLineTokenContext, isTypeAssertionContext], RuleAction.DeleteSpace),

    rule("SpaceBeforeTypeAnnotation", anyToken, [Kind.QuestionToken, Kind.ColonToken], [isOptionEnabled(insertSpaceBeforeTypeAnnotationOption), isNonJsxSameLineTokenContext, isTypeAnnotationContext], RuleAction.InsertSpace),
    rule("NoSpaceBeforeTypeAnnotation", anyToken, [Kind.QuestionToken, Kind.ColonToken], [isOptionDisabledOrUndefined(insertSpaceBeforeTypeAnnotationOption), isNonJsxSameLineTokenContext, isTypeAnnotationContext], RuleAction.DeleteSpace),

    rule("NoOptionalSemicolon", Kind.SemicolonToken, anyTokenIncludingEOF, [optionEquals(semicolonOption, SemicolonPreferenceRemove), isSemicolonDeletionContext], RuleAction.DeleteToken),
    rule("OptionalSemicolon", anyToken, anyTokenIncludingEOF, [optionEquals(semicolonOption, SemicolonPreferenceInsert), isSemicolonInsertionContext], RuleAction.InsertTrailingSemicolon),
  ];

  // These rules are lower in priority than user-configurable. Rules earlier in this list have priority over rules later in the list.
  const lowPriorityCommonRules: RuleSpec[] = [
    // Space after keyword but not before ; or : or ?
    rule("NoSpaceBeforeSemicolon", anyToken, Kind.SemicolonToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    rule("SpaceBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, Kind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine(placeOpenBraceOnNewLineForControlBlocksOption), isControlDeclContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),
    rule("SpaceBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, Kind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine(placeOpenBraceOnNewLineForFunctionsOption), isFunctionDeclContext, isBeforeBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),
    rule("SpaceBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, Kind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine(placeOpenBraceOnNewLineForFunctionsOption), isTypeScriptDeclWithBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),

    rule("NoSpaceBeforeComma", anyToken, Kind.CommaToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // No space before and after indexer `x[]`
    rule("NoSpaceBeforeOpenBracket", anyTokenExcept(Kind.AsyncKeyword, Kind.CaseKeyword), Kind.OpenBracketToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
    rule("NoSpaceAfterCloseBracket", Kind.CloseBracketToken, anyToken, [isNonJsxSameLineTokenContext, isNotBeforeBlockInFunctionDeclarationContext], RuleAction.DeleteSpace),
    rule("SpaceAfterSemicolon", Kind.SemicolonToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

    // Remove extra space between for and await
    rule("SpaceBetweenForAndAwaitKeyword", Kind.ForKeyword, Kind.AwaitKeyword, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

    // Remove extra spaces between ... and type name in tuple spread
    rule("SpaceBetweenDotDotDotAndTypeName", Kind.DotDotDotToken, typeNames, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

    // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
    // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
    rule(
      "SpaceBetweenStatements",
      [Kind.CloseParenToken, Kind.DoKeyword, Kind.ElseKeyword, Kind.CaseKeyword],
      anyToken,
      [isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNotForContext],
      RuleAction.InsertSpace,
    ),
    // This low-pri rule takes care of "try {", "catch {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
    rule("SpaceAfterTryCatchFinally", [Kind.TryKeyword, Kind.CatchKeyword, Kind.FinallyKeyword], Kind.OpenBraceToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
  ];

  return [...highPriorityCommonRules, ...userConfigurableRules, ...lowPriorityCommonRules];
}

export function tokenRangeFrom(...tokens: readonly Kind[]): TokenRange {
  return {
    isSpecific: true,
    tokens: [...tokens],
  };
}

export function tokenRangeFromEx(prefix: readonly Kind[], ...tokens: readonly Kind[]): TokenRange {
  return {
    isSpecific: true,
    tokens: [...prefix, ...tokens],
  };
}

export function tokenRangeFromRange(start: Kind, end: Kind): TokenRange {
  const tokens: Kind[] = [];
  for (let token = start; token <= end; token++) {
    tokens.push(token);
  }
  return tokenRangeFrom(...tokens);
}
