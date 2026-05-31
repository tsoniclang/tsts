/**
 * Checker — entry point + orchestration (port of `checker.go`).
 *
 * Upstream `checker.go` is a single 31k-line file: a `Checker` struct
 * with its methods grouped by concern. We mirror that structure but
 * split the file by concern (it would otherwise be unmanageable):
 *
 *   - checker.checkedtype.ts  — the checked-type model + leaf helpers
 *   - checker.statements.ts   — statement checking
 *   - checker.expressions.ts  — expression inference
 *   - checker.declarations.ts — class / function declaration checking
 *
 * The `Checker` class owns per-check state and is the entry; the split
 * files hold the recursive check logic. `newChecker` constructs one
 * (mirrors `checkerpool.go` handing out `*Checker`). The free
 * `checkSourceFile` / `checkProgram` wrappers preserve the existing
 * call sites in `program/program.ts` and the checker tests.
 */

import {
  Kind,
  isExpression,
  isIdentifier,
  isTypeNode,
  nodeSymbol,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import { bindSourceFile } from "../binder/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";
import {
  anyType,
  bigintType,
  booleanType,
  displayType,
  getArrayElementType,
  getCallSignature,
  getConstructSignature,
  getIndexInfos,
  getNonNullableType,
  getResolvedSymbol,
  getWidenedType,
  neverType,
  nullType,
  numberType,
  stringType,
  typeFromTypeNode,
  undefinedType,
  unknownType,
  voidType,
  type CheckResult,
  type CheckState,
  newCheckState,
  wireBinderSymbolResolution,
} from "./checker.checkedtype.js";
import { inferExpression } from "./checker.expressions.js";
import { checkStatements } from "./checker.statements.js";
import {
  getPropertySymbolOfType,
  getTypeOfSymbol,
  ObjectFlags,
  SignatureKind,
  TypeFlags,
  type IndexInfo,
  type Signature,
  type Type,
  type TypeReference,
  type UnionOrIntersectionType,
} from "./types.js";

export type { CheckDiagnostic, CheckResult } from "./checker.checkedtype.js";

export class Checker {
  readonly program: Program | undefined;
  readonly state: CheckState;

  constructor(program?: Program) {
    this.program = program;
    this.state = newCheckState();
    wireBinderSymbolResolution(this.state);
  }

  checkSourceFile(sourceFile: SourceFile): CheckResult {
    // BIND-BEFORE-CHECK (M5a): the checker resolves value names through the
    // binder symbol graph (container.locals / symbol.exports / symbol.members),
    // so the file must be bound first. The program LIVE path binds during
    // createProgram; this guard makes the direct checkSourceFile entry (tests,
    // probes, single-file checks) bind idempotently — a file whose SourceFile
    // symbol is already populated was bound by the program path.
    const bindDiagnostics = nodeSymbol(sourceFile) === undefined && sourceFile.locals === undefined
      ? bindSourceFile(sourceFile)
      : [];
    const state = this.state;
    state.diagnostics.length = 0;
    state.diagnostics.push(...bindDiagnostics.map(diagnostic => ({ message: diagnostic.message })));
    checkStatements(sourceFile.statements, state, undefined);
    return { diagnostics: state.diagnostics };
  }

  getTypeOfSymbol(symbol: AstSymbol): Type | undefined {
    return getTypeOfSymbol(symbol);
  }

  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type | undefined {
    return getTypeOfSymbol(symbol);
  }

  resolveName(name: string, location: AstNode | undefined): AstSymbol | undefined {
    if (location === undefined) return undefined;
    return getResolvedSymbol(name, location);
  }

  getSymbolAtLocation(node: AstNode): AstSymbol | undefined {
    if (isIdentifier(node)) return getResolvedSymbol(node.text, node);
    return nodeSymbol(node);
  }

  getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[] {
    const signature = kind === SignatureKind.Construct ? getConstructSignature(type) : getCallSignature(type);
    return signature === undefined ? [] : [signature];
  }

  getTypeAtLocation(node: AstNode): Type | undefined {
    if (isTypeNode(node)) return typeFromTypeNode(node, this.state);
    if (isExpression(node)) return inferExpression(node, this.state);
    const symbol = this.getSymbolAtLocation(node);
    return symbol === undefined ? undefined : getTypeOfSymbol(symbol);
  }

  getContextualType(node: AstNode): Type | undefined {
    return this.getTypeAtLocation(node);
  }

  getBaseTypeOfLiteralType(type: Type): Type {
    return getBaseTypeOfLiteralTypeLocal(type);
  }

  getNonNullableType(type: Type): Type {
    return getNonNullableType(type, this.state);
  }

  getTypeFromTypeNode(node: AstNode): Type | undefined {
    return isTypeNode(node) ? typeFromTypeNode(node, this.state) : undefined;
  }

  getWidenedType(type: Type): Type {
    return getWidenedType(type, this.state);
  }

  getTypeAtPosition(signature: Signature, position: number): Type | undefined {
    const parameter = signature.parameters[position];
    return getTypeOfSymbol(parameter);
  }

  isArrayLikeType(type: Type): boolean {
    return getArrayElementType(type) !== undefined;
  }

  getShorthandAssignmentValueSymbol(node: AstNode): AstSymbol | undefined {
    return this.getSymbolAtLocation(node);
  }

  getTypeOfSymbolAtLocation(symbol: AstSymbol, location: AstNode): Type | undefined {
    void location;
    return getTypeOfSymbol(symbol);
  }

  typeToString(type: Type): string {
    return displayType(type);
  }

  typeToStringEx(type: Type): string {
    return displayType(type);
  }

  getAnyType(): Type { return anyType; }
  getStringType(): Type { return stringType; }
  getNumberType(): Type { return numberType; }
  getBooleanType(): Type { return booleanType; }
  getVoidType(): Type { return voidType; }
  getUndefinedType(): Type { return undefinedType; }
  getNullType(): Type { return nullType; }
  getNeverType(): Type { return neverType; }
  getUnknownType(): Type { return unknownType; }
  getBigIntType(): Type { return bigintType; }
  getESSymbolType(): Type { return unknownType; }

  isContextSensitive(node: AstNode): boolean {
    return node.kind === Kind.ArrowFunction || node.kind === Kind.FunctionExpression;
  }

  getReturnTypeOfSignature(signature: Signature): Type | undefined {
    return signature.resolvedReturnType;
  }

  getRestTypeOfSignature(signature: Signature): Type | undefined {
    const restParameter = signature.parameters.findLast((parameter) =>
      ((parameter as { rest?: boolean; isRest?: boolean }).rest ?? (parameter as { isRest?: boolean }).isRest) === true,
    ) ?? signature.parameters[signature.parameters.length - 1];
    return getTypeOfSymbol(restParameter);
  }

  getTypePredicateOfSignature(signature: Signature): unknown {
    return signature.resolvedTypePredicate;
  }

  getBaseTypes(type: Type): readonly Type[] {
    return (type.data as { resolvedBaseTypes?: readonly Type[] } | undefined)?.resolvedBaseTypes ?? [];
  }

  getPropertiesOfType(type: Type): readonly AstSymbol[] {
    const properties = new Map<string, AstSymbol>();
    const declared = (type.data as UnionOrIntersectionType | undefined)?.resolvedProperties
      ?? (type.data as { declaredProperties?: readonly AstSymbol[] } | undefined)?.declaredProperties
      ?? [];
    for (const symbol of declared) properties.set(symbol.name ?? "", symbol);
    const members = (type.symbol as { members?: Map<string, AstSymbol> } | undefined)?.members;
    if (members !== undefined) for (const [name, symbol] of members) properties.set(name, symbol);
    return [...properties.values()];
  }

  getIndexInfosOfType(type: Type): readonly IndexInfo[] {
    return getIndexInfos(type) ?? [];
  }

  getConstraintOfTypeParameter(type: Type): Type | undefined {
    return (type.data as { constraint?: Type } | undefined)?.constraint;
  }

  getTypeArguments(type: Type): readonly Type[] {
    const data = type.data as TypeReference | undefined;
    return data?.resolvedTypeArguments ?? data?.resolvedTypeArguments_ ?? [];
  }

  getPropertyOfType(type: Type, name: string): AstSymbol | undefined {
    return getPropertySymbolOfType(type, name);
  }
}

function getBaseTypeOfLiteralTypeLocal(type: Type): Type {
  if ((type.flags & TypeFlags.StringLiteral) !== 0) return stringType;
  if ((type.flags & TypeFlags.NumberLiteral) !== 0) return numberType;
  if ((type.flags & TypeFlags.BigIntLiteral) !== 0) return bigintType;
  if ((type.flags & TypeFlags.BooleanLiteral) !== 0) return booleanType;
  if ((type.flags & TypeFlags.Union) !== 0) {
    const types = (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
    return types.length === 0 ? type : getBaseTypeOfLiteralTypeLocal(types[0]!);
  }
  if ((type.flags & TypeFlags.Object) !== 0 && (((type.data as { objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? 0) & ObjectFlags.ArrayLiteral) !== 0) {
    return type;
  }
  return type;
}

export function newChecker(program?: Program): Checker {
  return new Checker(program);
}

export function checkSourceFile(sourceFile: SourceFile): CheckResult {
  return new Checker().checkSourceFile(sourceFile);
}

export function checkProgram(program: Program): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [...program.diagnostics];
  if (diagnostics.length > 0) {
    return diagnostics;
  }
  const checker = new Checker(program);
  for (const sourceFile of program.sourceFiles) {
    const result = checker.checkSourceFile(sourceFile.sourceFile);
    diagnostics.push(...result.diagnostics.map(diagnostic => ({
      fileName: sourceFile.fileName,
      message: diagnostic.message,
    })));
  }
  return diagnostics;
}
