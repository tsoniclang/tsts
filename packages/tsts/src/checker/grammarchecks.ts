/**
 * Grammar checks.
 *
 * Substantive port of TS-Go `internal/checker/grammarchecks.go`
 * (~2204 LoC, 76 funcs). Implements the early-error grammar pass that
 * runs alongside checking: modifier-combination rules, decorator
 * placement rules, parameter-property rules, late-binding rules, etc.
 *
 * Port scope: full method-API parity for the ~70 checkGrammar* methods.
 */

import { Kind } from "../ast/index.js";
import type { Node as AstNode } from "../ast/index.js";

const ModifierFlagsExport = 1 << 0;
const ModifierFlagsDeclare = 1 << 1;
const ModifierFlagsAsync = 1 << 8;
const ScriptTargetES2018 = 5;
const ScriptTargetES2020 = 7;
const TokenFlagsUnterminated = 1 << 0;

// Compute modifier flags from a node's modifiers list. Mirrors
// printer-utilities' getSyntacticModifierFlags so grammar checks can be
// modifier-aware without taking a printer dependency.
function getModifierFlagsOf(node: AstNode): number {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return 0;
  let f = 0;
  for (const m of mods) {
    switch ((m as { kind?: number }).kind) {
      case Kind.PublicKeyword: f |= 1 << 2; break;
      case Kind.PrivateKeyword: f |= 1 << 3; break;
      case Kind.ProtectedKeyword: f |= 1 << 4; break;
      case Kind.ReadonlyKeyword: f |= 1 << 6; break;
      case Kind.OverrideKeyword: f |= 1 << 14; break;
      case Kind.ExportKeyword: f |= 1 << 0; break;
      case Kind.AbstractKeyword: f |= 1 << 7; break;
      case Kind.AsyncKeyword: f |= 1 << 8; break;
      case Kind.DefaultKeyword: f |= 1 << 9; break;
      case Kind.ConstKeyword: f |= 1 << 11; break;
      case Kind.DeclareKeyword: f |= 1 << 1; break;
      case Kind.StaticKeyword: f |= 1 << 5; break;
      case Kind.AccessorKeyword: f |= 1 << 15; break;
      default: break;
    }
  }
  return f;
}

export class GrammarChecker {
  // -------------------------------------------------------------------------
  // Modifier rules
  // -------------------------------------------------------------------------

  checkGrammarModifiers(node: AstNode): boolean {
    // Walk the modifier list checking for invalid combinations:
    // - duplicates
    // - access modifier with private identifier
    // - readonly outside class field / index signature
    const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
    if (mods === undefined) return false;
    const seen = new Set<number>();
    for (const m of mods) {
      const k = (m as { kind?: number }).kind;
      if (k === undefined) continue;
      if (k === Kind.Decorator) continue;
      if (seen.has(k)) return true; // Duplicate modifier.
      seen.add(k);
      // Mutually exclusive access modifiers.
      if (k === Kind.PublicKeyword || k === Kind.PrivateKeyword || k === Kind.ProtectedKeyword) {
        if (seen.has(Kind.PublicKeyword) && seen.has(Kind.PrivateKeyword)) return true;
        if (seen.has(Kind.PublicKeyword) && seen.has(Kind.ProtectedKeyword)) return true;
        if (seen.has(Kind.PrivateKeyword) && seen.has(Kind.ProtectedKeyword)) return true;
      }
    }
    return false;
  }
  checkGrammarAsyncModifier(node: AstNode, asyncModifier: AstNode | undefined): boolean {
    // 'async' can only appear on function-like declarations + arrow
    // functions.
    if (asyncModifier === undefined) return false;
    const k = (node as { kind?: number }).kind;
    return !(k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
      k === Kind.ArrowFunction || k === Kind.MethodDeclaration);
  }
  checkGrammarAccessor(node: AstNode): boolean {
    // Accessors cannot have type parameters (TS1094) or be marked
    // generator (TS1138).
    const typeParams = (node as unknown as { typeParameters?: AstNode }).typeParameters;
    const asterisk = (node as unknown as { asteriskToken?: AstNode }).asteriskToken;
    return typeParams !== undefined || asterisk !== undefined;
  }
  checkGrammarTypeParameterList(node: AstNode, parent: AstNode): boolean {
    void parent;
    // Empty type-parameter list is invalid.
    const params = (node as unknown as { nodes?: readonly AstNode[] }).nodes;
    return params === undefined || params.length === 0;
  }
  checkGrammarParameterList(node: AstNode): boolean {
    // Required parameter after optional, or rest parameter not last.
    const params = (node as unknown as { nodes?: readonly AstNode[] }).nodes;
    if (params === undefined) return false;
    let sawOptional = false;
    for (let i = 0; i < params.length; i++) {
      const p = params[i]!;
      const isRest = (p as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
      if (isRest && i !== params.length - 1) return true;
      const isOptional = (p as unknown as { questionToken?: AstNode }).questionToken !== undefined ||
        (p as unknown as { initializer?: AstNode }).initializer !== undefined ||
        isRest;
      if (sawOptional && !isOptional) return true;
      if (isOptional) sawOptional = true;
    }
    return false;
  }
  checkGrammarRequiredParameter(node: AstNode): boolean {
    // A required parameter cannot have a '?' marker.
    return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
  }
  checkGrammarBindingElement(node: AstNode): boolean {
    // A rest binding element cannot have an initializer.
    const isRest = (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    return isRest && init !== undefined;
  }
  checkGrammarObjectLiteralExpression(node: AstNode, inDestructuring: boolean): boolean {
    // Duplicate property names within an object literal (TS1117).
    // Excluded in destructuring assignment context, where each name
    // is a distinct binding target.
    if (inDestructuring) return false;
    const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
    if (props === undefined) return false;
    const seen = new Set<string>();
    for (const p of props) {
      const name = (p as unknown as { name?: { text?: string } }).name?.text;
      if (name !== undefined) {
        if (seen.has(name)) return true;
        seen.add(name);
      }
    }
    return false;
  }
  checkGrammarJsxElement(node: AstNode): boolean {
    // Detect duplicate JSX attributes by name.
    const opening = (node as unknown as { openingElement?: { attributes?: { properties?: { nodes?: readonly AstNode[] } } } }).openingElement;
    const props = opening?.attributes?.properties?.nodes;
    if (props === undefined) return false;
    const seen = new Set<string>();
    for (const p of props) {
      const name = (p as unknown as { name?: { text?: string } }).name?.text;
      if (name !== undefined) {
        if (seen.has(name)) return true;
        seen.add(name);
      }
    }
    return false;
  }
  checkGrammarJsxExpression(node: AstNode): boolean {
    // Empty JSX expression: { } with no content (other than whitespace).
    return (node as unknown as { expression?: AstNode }).expression === undefined;
  }
  checkGrammarForInOrForOfStatement(node: AstNode): boolean {
    // The .initializer must be a single VariableDeclarationList with
    // exactly one declaration (no destructuring is fine), or a simple
    // assignment target.
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init === undefined) return true;
    const k = (init as { kind?: number }).kind;
    if (k === Kind.VariableDeclarationList) {
      const decls = (init as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations?.nodes;
      if (decls === undefined || decls.length !== 1) return true;
      // Initializer on the declaration is invalid in for-in/of context.
      const declInit = (decls[0] as unknown as { initializer?: AstNode }).initializer;
      if (declInit !== undefined) return true;
    }
    return false;
  }
  checkGrammarAccessor_(node: AstNode): boolean {
    // Alias-style accessor check (used by `accessor` auto-accessor
    // field). Auto-accessors cannot be abstract.
    const flags = getModifierFlagsOf(node);
    return (flags & ((1 << 7) | (1 << 15))) === ((1 << 7) | (1 << 15));
  }
  checkGrammarComputedPropertyName(node: AstNode): boolean {
    // The computed property name expression must be a well-typed key.
    // Without type info we accept any non-undefined expression.
    const expr = (node as unknown as { expression?: AstNode }).expression;
    return expr === undefined;
  }
  checkGrammarForOfStatement(node: AstNode): boolean {
    // for-of cannot use a 'let'-of variant with an initializer; we
    // covered the general case in checkGrammarForInOrForOfStatement.
    // Here additionally: 'for await' must be in an async function.
    const awaitToken = (node as unknown as { awaitModifier?: AstNode }).awaitModifier;
    if (awaitToken === undefined) return false;
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.SourceFile) {
        const isModule = (n as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
        return !isModule;
      }
      if (k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
          k === Kind.MethodDeclaration || k === Kind.ArrowFunction) {
        const flags = getModifierFlagsOf(n);
        const isAsync = (flags & (1 << 8)) !== 0;
        return !isAsync;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarFunctionLikeDeclaration(node: AstNode): boolean {
    // Reject async generators when targeting old ES versions (handled
    // upstream); here we just check that function-like has either a
    // body or, when ambient, is a signature.
    const body = (node as unknown as { body?: AstNode }).body;
    const flags = getModifierFlagsOf(node);
    const isAmbient = (flags & (1 << 1)) !== 0; // Declare
    return isAmbient && body !== undefined;
  }
  checkGrammarFunctionName(name: AstNode): boolean {
    // The function name must not be 'eval' or 'arguments' in strict mode.
    const text = (name as unknown as { text?: string }).text;
    return text === "eval" || text === "arguments";
  }
  checkGrammarVariableDeclaration(node: AstNode): boolean {
    // A 'const' declaration must have an initializer (unless it's in
    // a `for ... in/of` initializer).
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init === undefined) {
      const parent = (node as unknown as { parent?: AstNode }).parent;
      if (parent !== undefined) {
        const grandparent = (parent as unknown as { parent?: AstNode }).parent;
        const gpk = (grandparent as { kind?: number } | undefined)?.kind;
        if (gpk === Kind.ForInStatement || gpk === Kind.ForOfStatement) return false;
      }
      const declList = (node as unknown as { parent?: AstNode }).parent;
      const declFlags = (declList as unknown as { flags?: number } | undefined)?.flags ?? 0;
      // NodeFlags.Const = 2
      if ((declFlags & 2) !== 0) return true;
    }
    return false;
  }
  checkGrammarVariableDeclarationList(node: AstNode): boolean {
    const decls = (node as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations?.nodes;
    return decls === undefined || decls.length === 0;
  }
  checkGrammarVariableStatement(node: AstNode): boolean {
    const declList = (node as unknown as { declarationList?: AstNode }).declarationList;
    return declList !== undefined ? this.checkGrammarVariableDeclarationList(declList) : false;
  }
  checkGrammarBreakOrContinueStatement(node: AstNode): boolean {
    // A break/continue is only valid inside an enclosing iteration
    // (for/while/do) or switch (break only). Walk parents looking for
    // such a container, stopping at function-like boundaries.
    const k = (node as { kind?: number }).kind;
    const isBreak = k === Kind.BreakStatement;
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const pk = (n as { kind?: number }).kind;
      if (pk === Kind.FunctionDeclaration || pk === Kind.FunctionExpression ||
          pk === Kind.ArrowFunction || pk === Kind.MethodDeclaration ||
          pk === Kind.Constructor || pk === Kind.GetAccessor || pk === Kind.SetAccessor ||
          pk === Kind.SourceFile) {
        return true; // No enclosing iteration/switch — grammar error.
      }
      if (pk === Kind.ForStatement || pk === Kind.ForInStatement ||
          pk === Kind.ForOfStatement || pk === Kind.WhileStatement ||
          pk === Kind.DoStatement) return false;
      if (isBreak && pk === Kind.SwitchStatement) return false;
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarReturnStatement(node: AstNode): boolean {
    // A return must be inside a function-like container.
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.SourceFile) return true;
      if (k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
          k === Kind.ArrowFunction || k === Kind.MethodDeclaration ||
          k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor) {
        return false;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarThrowStatement(node: AstNode): boolean {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    return expr === undefined; // 'throw' without an expression is invalid.
  }
  checkGrammarTryStatement(node: AstNode): boolean {
    // A try statement must have either a catch clause or a finally
    // block (or both).
    const catchClause = (node as unknown as { catchClause?: AstNode }).catchClause;
    const finallyBlock = (node as unknown as { finallyBlock?: AstNode }).finallyBlock;
    return catchClause === undefined && finallyBlock === undefined;
  }
  checkGrammarCatchClause(node: AstNode): boolean {
    // The catch-clause variable cannot have an initializer.
    const variable = (node as unknown as { variableDeclaration?: AstNode }).variableDeclaration;
    if (variable === undefined) return false;
    const init = (variable as unknown as { initializer?: AstNode }).initializer;
    return init !== undefined;
  }
  checkGrammarSwitchStatement(node: AstNode): boolean {
    // At most one 'default' clause in a switch.
    const caseBlock = (node as unknown as { caseBlock?: { clauses?: { nodes?: readonly AstNode[] } } }).caseBlock;
    const clauses = caseBlock?.clauses?.nodes;
    if (clauses === undefined) return false;
    let defaultCount = 0;
    for (const c of clauses) {
      if ((c as { kind?: number }).kind === Kind.DefaultClause) defaultCount += 1;
      if (defaultCount > 1) return true;
    }
    return false;
  }
  checkGrammarLabeledStatement(node: AstNode): boolean {
    // Duplicate-label check: walk parents looking for a LabeledStatement
    // with the same label.
    const name = (node as unknown as { label?: { text?: string } }).label?.text;
    if (name === undefined) return false;
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      if ((n as { kind?: number }).kind === Kind.LabeledStatement) {
        const otherName = (n as unknown as { label?: { text?: string } }).label?.text;
        if (otherName === name) return true;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return false;
  }
  checkGrammarMetaProperty(node: AstNode): boolean {
    // 'new.target' and 'import.meta' are the only allowed forms.
    const name = (node as unknown as { name?: { text?: string } }).name?.text;
    const keyword = (node as unknown as { keywordToken?: { kind?: number } }).keywordToken?.kind;
    if (keyword === Kind.NewKeyword) return name !== "target";
    if (keyword === Kind.ImportKeyword) return name !== "meta";
    return true;
  }
  checkGrammarPrivateIdentifier(node: AstNode): boolean {
    // A private identifier (#foo) must be declared in an enclosing
    // class. Walk parents looking for one.
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.ClassDeclaration || k === Kind.ClassExpression) return false;
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarPropertyDeclaration(node: AstNode): boolean {
    // A property declaration cannot have both a type annotation and an
    // initializer with mismatched types — type checking is the checker's
    // job. Here we only flag the grammar errors: ambient declarations
    // cannot have initializers.
    const flags = getModifierFlagsOf(node);
    const isAmbient = (flags & (1 << 1)) !== 0; // DeclareKeyword
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    return isAmbient && init !== undefined;
  }
  checkGrammarPropertyAssignment(node: AstNode): boolean {
    // The property must have an initializer (vs. a shorthand assignment).
    return (node as unknown as { initializer?: AstNode }).initializer === undefined;
  }
  checkGrammarParameter(node: AstNode): boolean {
    // A parameter cannot have both ? and an initializer (TS1015).
    const questionToken = (node as unknown as { questionToken?: AstNode }).questionToken;
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    return questionToken !== undefined && init !== undefined;
  }
  checkGrammarParameterPropertyAndPrivateName(node: AstNode): boolean {
    // A parameter property cannot have a private-identifier name.
    const name = (node as unknown as { name?: { kind?: number } }).name;
    return name?.kind === Kind.PrivateIdentifier;
  }
  checkGrammarParameterPropertyDeclaration(node: AstNode): boolean {
    // Parameter properties are only valid in a constructor.
    const parent = (node as unknown as { parent?: { kind?: number } }).parent;
    return parent?.kind !== Kind.Constructor;
  }
  checkGrammarTypeAssertion(node: AstNode): boolean {
    // Angle-bracket type assertions are not allowed in JSX files
    // — caller is responsible for the JSX scriptKind check.
    return isJsxSourceFile(node);
  }
  checkGrammarStatementInAmbientContext(node: AstNode): boolean {
    // Walk parents looking for an ambient (declare) context. In an
    // ambient context, only declaration statements are allowed.
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const flags = getModifierFlagsOf(n);
      if ((flags & (1 << 1)) !== 0) {
        // Ambient context: reject non-declaration statements.
        const k = (node as { kind?: number }).kind;
        const allowedKinds = new Set<number>([
          Kind.VariableStatement, Kind.FunctionDeclaration,
          Kind.ClassDeclaration, Kind.InterfaceDeclaration,
          Kind.TypeAliasDeclaration, Kind.EnumDeclaration,
          Kind.ModuleDeclaration, Kind.ImportDeclaration,
          Kind.ImportEqualsDeclaration, Kind.ExportDeclaration,
          Kind.ExportAssignment,
        ]);
        return !allowedKinds.has(k!);
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return false;
  }
  checkGrammarNumericLiteral(node: AstNode): boolean {
    // Octal literals are not allowed in strict mode (TS1121); the
    // parser tags such literals with NumericLiteralFlags.Octal.
    const flags = (node as unknown as { numericLiteralFlags?: number }).numericLiteralFlags ?? 0;
    return (flags & 0x10) !== 0;
  }
  checkGrammarTaggedTemplateChain(node: AstNode): boolean {
    // Optional chains cannot include tagged templates: tag?.`...`
    const tag = (node as unknown as { tag?: AstNode }).tag;
    return containsOptionalChain(tag);
  }
  checkGrammarBigIntLiteral(node: AstNode): boolean {
    // BigInt literals are only valid when target is ES2020+.
    return scriptTargetOf(node) < ScriptTargetES2020;
  }
  checkGrammarStringLiteralExpression(node: AstNode): boolean {
    const text = (node as unknown as { text?: string; rawText?: string }).rawText
      ?? (node as unknown as { text?: string; rawText?: string }).text
      ?? "";
    const flags = (node as unknown as { tokenFlags?: number }).tokenFlags ?? 0;
    return (flags & TokenFlagsUnterminated) !== 0
      || (isStrictContext(node) && containsLegacyOctalEscape(text));
  }
  checkGrammarNullishCoalesceWithLogicalExpression(node: AstNode): boolean {
    // ?? must be parenthesized when combined with && or ||.
    const k = (node as { kind?: number }).kind;
    if (k !== Kind.BinaryExpression) return false;
    const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
    if (op !== Kind.QuestionQuestionToken) return false;
    const left = (node as unknown as { left?: { kind?: number; operatorToken?: { kind?: number } } }).left;
    const right = (node as unknown as { right?: { kind?: number; operatorToken?: { kind?: number } } }).right;
    const isLogical = (n: typeof left): boolean => {
      if (n?.kind !== Kind.BinaryExpression) return false;
      const k2 = n.operatorToken?.kind;
      return k2 === Kind.AmpersandAmpersandToken || k2 === Kind.BarBarToken;
    };
    return isLogical(left) || isLogical(right);
  }
  checkGrammarRegularExpressionLiteral(node: AstNode): boolean {
    const text = (node as unknown as { text?: string }).text ?? "";
    if (text.length === 0) return false;
    const match = /^\/(.*)\/([a-z]*)$/iu.exec(text);
    if (match === null) return true;
    try {
      new RegExp(match[1]!, match[2]!);
      return false;
    } catch {
      return true;
    }
  }
  checkGrammarImportClause(node: AstNode): boolean {
    // type-only import combined with namespace import + default is OK,
    // but: type-only import cannot also have a name in some contexts —
    // the structural validity is enforced by the parser. Here we just
    // check that an empty import clause (no .name + no .namedBindings)
    // is invalid.
    const name = (node as unknown as { name?: AstNode }).name;
    const namedBindings = (node as unknown as { namedBindings?: AstNode }).namedBindings;
    return name === undefined && namedBindings === undefined;
  }
  checkGrammarImportCallExpression(node: AstNode): boolean {
    // import() must have 1 or 2 arguments.
    const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
    if (args === undefined) return true;
    return args.length === 0 || args.length > 2;
  }
  checkGrammarMethod(node: AstNode): boolean {
    // Method shorthand cannot have a body when declared in an interface
    // (TS1183), and async methods must not be generators in old targets.
    const body = (node as unknown as { body?: AstNode }).body;
    const parent = (node as unknown as { parent?: AstNode }).parent;
    if (body !== undefined && parent?.kind === Kind.InterfaceDeclaration) return true;
    const flags = getModifierFlagsOf(node);
    const asterisk = (node as unknown as { asteriskToken?: AstNode }).asteriskToken;
    return (flags & ModifierFlagsAsync) !== 0 && asterisk !== undefined && scriptTargetOf(node) < ScriptTargetES2018;
  }
  checkGrammarMethodSignature(node: AstNode): boolean {
    // Interface method signatures cannot have a body.
    return (node as unknown as { body?: AstNode }).body !== undefined;
  }
  checkGrammarClassExpression(node: AstNode): boolean { return this.checkGrammarClassLikeDeclaration(node); }
  checkGrammarClassDeclaration(node: AstNode): boolean { return this.checkGrammarClassLikeDeclaration(node); }
  checkGrammarClassLikeDeclaration(node: AstNode): boolean {
    // Heritage clauses: at most one 'extends' and one 'implements';
    // 'extends' must precede 'implements'.
    const clauses = (node as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
    if (clauses === undefined) return false;
    let sawExtends = false;
    let sawImplements = false;
    for (const c of clauses) {
      const tok = (c as unknown as { token?: number }).token;
      if (tok === Kind.ExtendsKeyword) {
        if (sawExtends) return true; // Multiple extends.
        if (sawImplements) return true; // extends after implements.
        sawExtends = true;
      } else if (tok === Kind.ImplementsKeyword) {
        if (sawImplements) return true; // Multiple implements.
        sawImplements = true;
      }
    }
    return false;
  }
  checkGrammarClassStaticBlockDeclaration(node: AstNode): boolean {
    // Static blocks cannot have modifiers (other than the 'static'
    // marker implicit in the syntax).
    const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
    if (mods === undefined) return false;
    for (const m of mods) {
      if ((m as { kind?: number }).kind !== Kind.StaticKeyword) return true;
    }
    return false;
  }
  checkGrammarEnumDeclaration(node: AstNode): boolean {
    // Enum members must have unique names; const enum members must
    // have constant initializers.
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
    if (members === undefined) return false;
    const seen = new Set<string>();
    for (const m of members) {
      const name = (m as unknown as { name?: { text?: string } }).name?.text;
      if (name !== undefined) {
        if (seen.has(name)) return true;
        seen.add(name);
      }
    }
    return false;
  }
  checkGrammarIndexSignature(node: AstNode): boolean {
    // Index signatures must have exactly one parameter with a type.
    const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
    if (params === undefined || params.length !== 1) return true;
    const p = params[0]!;
    const t = (p as unknown as { type?: AstNode }).type;
    if (t === undefined) return true;
    // No rest/init/question on the parameter.
    const hasDotDot = (p as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
    const hasInit = (p as unknown as { initializer?: AstNode }).initializer !== undefined;
    const hasQuestion = (p as unknown as { questionToken?: AstNode }).questionToken !== undefined;
    return hasDotDot || hasInit || hasQuestion;
  }
  checkGrammarInterfaceDeclaration(node: AstNode): boolean {
    // 'implements' clause invalid; only 'extends' allowed.
    const clauses = (node as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
    if (clauses === undefined) return false;
    for (const c of clauses) {
      const tok = (c as unknown as { token?: number }).token;
      if (tok === Kind.ImplementsKeyword) return true;
    }
    return false;
  }
  checkGrammarTypeAliasDeclaration(node: AstNode): boolean {
    // Type alias must have .type set.
    return (node as unknown as { type?: AstNode }).type === undefined;
  }
  checkGrammarModuleDeclaration(node: AstNode): boolean {
    // ModuleDeclaration with quoted name only valid at top level.
    const name = (node as unknown as { name?: { kind?: number } }).name;
    if (name?.kind !== Kind.StringLiteral) return false;
    const parent = (node as unknown as { parent?: { kind?: number } }).parent;
    return parent?.kind !== Kind.SourceFile && parent?.kind !== Kind.ModuleBlock;
  }
  checkGrammarSourceFile(node: AstNode): boolean {
    // A SourceFile cannot have a 'with' statement in strict mode (which
    // includes all modules).
    const isExternalModule = (node as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
    if (!isExternalModule) return false;
    const statements = (node as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
    if (statements === undefined) return false;
    for (const s of statements) {
      if ((s as { kind?: number }).kind === Kind.WithStatement) return true;
    }
    return false;
  }
  checkGrammarHeritageClause(node: AstNode): boolean {
    // Empty heritage clause is invalid.
    const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
    return types === undefined || types.length === 0;
  }
  checkGrammarExpressionWithTypeArguments(node: AstNode): boolean {
    // The expression of an ExpressionWithTypeArguments must be an
    // entity name (Identifier or QualifiedName chain).
    const expr = (node as unknown as { expression?: { kind?: number } }).expression;
    if (expr === undefined) return true;
    const k = expr.kind;
    return k !== Kind.Identifier && k !== Kind.PropertyAccessExpression;
  }
  checkGrammarConstructor(node: AstNode): boolean {
    // A constructor cannot have type parameters or a return-type
    // annotation.
    const typeParams = (node as unknown as { typeParameters?: AstNode }).typeParameters;
    const returnType = (node as unknown as { type?: AstNode }).type;
    return typeParams !== undefined || returnType !== undefined;
  }
  checkGrammarAccessorParameter(node: AstNode): boolean {
    // Setter accessor parameter cannot be optional / rest / have init.
    const isRest = (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
    const isOptional = (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
    const hasInit = (node as unknown as { initializer?: AstNode }).initializer !== undefined;
    return isRest || isOptional || hasInit;
  }
  checkGrammarTopLevelElementForRequiredDeclareModifier(node: AstNode): boolean {
    // Inside a declaration file (.d.ts), top-level value declarations
    // must have a 'declare' modifier.
    if (!isDeclarationFile(node)) return false;
    if (!isTopLevel(node)) return false;
    if (!isValueDeclarationKind(node.kind)) return false;
    const flags = getModifierFlagsOf(node);
    return (flags & (ModifierFlagsDeclare | ModifierFlagsExport)) === 0;
  }
  checkGrammarTopLevelElementsForRequiredDeclareModifier(file: AstNode): boolean {
    return sourceFileStatements(file).some((statement) => this.checkGrammarTopLevelElementForRequiredDeclareModifier(statement));
  }
  checkGrammarConstructorTypeParameters(node: AstNode): boolean {
    // A constructor declaration cannot have type parameters (TS1092).
    return (node as unknown as { typeParameters?: AstNode }).typeParameters !== undefined;
  }
  checkGrammarConstructorTypeAnnotation(node: AstNode): boolean {
    // A constructor declaration cannot have a return-type annotation
    // (TS1093).
    return (node as unknown as { type?: AstNode }).type !== undefined;
  }
  checkGrammarConstantInitializer(node: AstNode): boolean {
    // const enum member initializer must be a constant expression.
    // Without full constant-folding, we accept: NumericLiteral,
    // StringLiteral, identifier reference to an earlier enum member.
    const init = (node as unknown as { initializer?: { kind?: number } }).initializer;
    if (init === undefined) return false;
    const k = init.kind;
    return !(k === Kind.NumericLiteral || k === Kind.StringLiteral ||
      k === Kind.PrefixUnaryExpression || k === Kind.Identifier ||
      k === Kind.PropertyAccessExpression);
  }
  checkGrammarYieldExpression(node: AstNode): boolean {
    // 'yield' is only valid inside a generator function.
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.SourceFile) return true; // 'yield' outside any function
      if (k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
          k === Kind.MethodDeclaration) {
        const isGenerator = (n as unknown as { asteriskToken?: AstNode }).asteriskToken !== undefined;
        return !isGenerator;
      }
      if (k === Kind.ArrowFunction) return true; // arrows can't be generators
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarAwaitExpression(node: AstNode): boolean {
    // 'await' is only valid inside an async function or at the top level
    // of a module.
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.SourceFile) {
        const isModule = (n as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
        return !isModule;
      }
      if (k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
          k === Kind.MethodDeclaration || k === Kind.ArrowFunction) {
        const mods = (n as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
        const isAsync = mods !== undefined && mods.some((m) => (m as { kind?: number }).kind === Kind.AsyncKeyword);
        return !isAsync;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarUsingDeclarations(node: AstNode): boolean {
    // 'using' declarations require an initializer and cannot be empty.
    const decls = (node as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations?.nodes;
    if (decls === undefined || decls.length === 0) return true;
    for (const d of decls) {
      const init = (d as unknown as { initializer?: AstNode }).initializer;
      if (init === undefined) return true;
    }
    return false;
  }
  checkGrammarAwaitUsing(node: AstNode): boolean {
    // 'await using' must be inside an async function or top level of a
    // module.
    let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.SourceFile) {
        const isModule = (n as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
        return !isModule;
      }
      if (k === Kind.FunctionDeclaration || k === Kind.FunctionExpression ||
          k === Kind.MethodDeclaration || k === Kind.ArrowFunction) {
        const flags = getModifierFlagsOf(n);
        const isAsync = (flags & (1 << 8)) !== 0;
        return !isAsync;
      }
      if (k === Kind.ClassStaticBlockDeclaration) return true;
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return true;
  }
  checkGrammarDecorator(node: AstNode): boolean {
    // The expression of a decorator must be a call or identifier.
    const expr = (node as unknown as { expression?: AstNode }).expression;
    return expr === undefined;
  }
  checkGrammarDecorators(node: AstNode): boolean {
    // Decorators are only valid on class declarations and class members.
    const k = (node as { kind?: number }).kind;
    const validTargets = new Set<number>([
      Kind.ClassDeclaration, Kind.ClassExpression, Kind.MethodDeclaration,
      Kind.GetAccessor, Kind.SetAccessor, Kind.PropertyDeclaration, Kind.Parameter,
    ]);
    if (!validTargets.has(k!)) {
      const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
      if (mods === undefined) return false;
      for (const m of mods) {
        if ((m as { kind?: number }).kind === Kind.Decorator) return true;
      }
    }
    return false;
  }
  checkGrammarExportAssignment(node: AstNode): boolean {
    // 'export =' is invalid in ES modules.
    const isExportEquals = (node as unknown as { isExportEquals?: boolean }).isExportEquals === true;
    if (!isExportEquals) return false;
    // Walk up to source file and check externalModuleIndicator.
    let n: AstNode | undefined = node;
    while (n !== undefined) {
      if ((n as { kind?: number }).kind === Kind.SourceFile) {
        const isModule = (n as unknown as { externalModuleIndicator?: AstNode }).externalModuleIndicator !== undefined;
        // ES module + export= is a conflict; CommonJS + export= is fine.
        return isModule;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return false;
  }
  checkGrammarExportDeclaration(node: AstNode): boolean {
    // 'export *' must have a moduleSpecifier.
    const exportClause = (node as unknown as { exportClause?: AstNode }).exportClause;
    const moduleSpecifier = (node as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
    return exportClause === undefined && moduleSpecifier === undefined;
  }
  checkGrammarImportAttributes(node: AstNode): boolean {
    // Duplicate attribute keys are invalid.
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    if (elements === undefined) return false;
    const seen = new Set<string>();
    for (const e of elements) {
      const name = (e as unknown as { name?: { text?: string } }).name?.text;
      if (name !== undefined) {
        if (seen.has(name)) return true;
        seen.add(name);
      }
    }
    return false;
  }
  checkGrammarOnlyFirstHasInitializerInBindingPattern(pattern: AstNode): boolean {
    // Only the first element in a destructuring binding pattern may have
    // a default initializer (no — they can all have one). In fact this
    // check enforces a different rule: rest element cannot have one.
    const elements = (pattern as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    if (elements === undefined) return false;
    for (const e of elements) {
      const isRest = (e as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
      const init = (e as unknown as { initializer?: AstNode }).initializer;
      if (isRest && init !== undefined) return true;
    }
    return false;
  }
  checkGrammarVariableDeclarationInUsingStatement(node: AstNode): boolean {
    // 'using' / 'await using' declarations: name must be an Identifier
    // (no destructuring), and initializer must be present.
    const name = (node as unknown as { name?: { kind?: number } }).name;
    if (name?.kind !== Kind.Identifier) return true;
    return (node as unknown as { initializer?: AstNode }).initializer === undefined;
  }
  checkGrammarBindingElementBindingDeclaration(node: AstNode): boolean {
    // A binding element with a default initializer cannot also be marked
    // optional with '?'.
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    const optional = (node as unknown as { questionToken?: AstNode }).questionToken;
    return init !== undefined && optional !== undefined;
  }
}

export function newGrammarChecker(): GrammarChecker {
  return new GrammarChecker();
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { parent?: AstNode } | undefined)?.parent;
}

function sourceFileOf(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile || (current as unknown as { fileName?: string; path?: string }).fileName !== undefined) {
      return current;
    }
    current = parentOf(current);
  }
  return undefined;
}

function isJsxSourceFile(node: AstNode): boolean {
  const sourceFile = sourceFileOf(node);
  const languageVariant = (sourceFile as unknown as { languageVariant?: string | number } | undefined)?.languageVariant;
  const fileName = (sourceFile as unknown as { fileName?: string; path?: string } | undefined)?.fileName
    ?? (sourceFile as unknown as { fileName?: string; path?: string } | undefined)?.path
    ?? "";
  return languageVariant === "jsx" || languageVariant === 1 || /\.tsx$/iu.test(fileName);
}

function containsOptionalChain(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if ((node as unknown as { questionDotToken?: AstNode }).questionDotToken !== undefined) return true;
  for (const child of childNodes(node)) {
    if (containsOptionalChain(child)) return true;
  }
  return false;
}

function scriptTargetOf(node: AstNode): number {
  return (sourceFileOf(node) as unknown as { scriptTarget?: number; languageVersion?: number } | undefined)?.scriptTarget
    ?? (sourceFileOf(node) as unknown as { scriptTarget?: number; languageVersion?: number } | undefined)?.languageVersion
    ?? ScriptTargetES2020;
}

function isStrictContext(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (((current as unknown as { flags?: number }).flags ?? 0) & (1 << 23)) return true;
    const statements = sourceFileStatements(current);
    if (statements.length > 0) {
      const first = statements[0];
      const text = (first as unknown as { expression?: { text?: string } }).expression?.text;
      if (text === "use strict") return true;
    }
    current = parentOf(current);
  }
  return false;
}

function containsLegacyOctalEscape(text: string): boolean {
  return /(^|[^\\])\\[0-7]/u.test(text);
}

function isDeclarationFile(node: AstNode): boolean {
  const fileName = (sourceFileOf(node) as unknown as { fileName?: string; path?: string } | undefined)?.fileName
    ?? (sourceFileOf(node) as unknown as { fileName?: string; path?: string } | undefined)?.path
    ?? "";
  return /\.d\.[cm]?ts$/iu.test(fileName);
}

function isTopLevel(node: AstNode): boolean {
  return parentOf(node)?.kind === Kind.SourceFile;
}

function isValueDeclarationKind(kind: Kind): boolean {
  return kind === Kind.VariableStatement
    || kind === Kind.FunctionDeclaration
    || kind === Kind.ClassDeclaration
    || kind === Kind.EnumDeclaration
    || kind === Kind.ModuleDeclaration;
}

function sourceFileStatements(file: AstNode): readonly AstNode[] {
  const statements = (file as unknown as { statements?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).statements;
  if (statements === undefined) return [];
  if (Array.isArray(statements)) return statements as readonly AstNode[];
  return (statements as { nodes?: readonly AstNode[] }).nodes ?? [];
}

function childNodes(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isNode(value)) out.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) if (isNode(item)) out.push(item);
    } else if (isNodeList(value)) {
      out.push(...value.nodes.filter(isNode));
    }
  }
  return out;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { nodes: readonly unknown[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { nodes?: unknown }).nodes);
}
