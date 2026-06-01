/**
 * Type-predicate parity helpers.
 *
 * TS-Go keeps assertion predicates, `this` predicates, identifier predicates,
 * and never-returning functions in the same checker decision path.
 */

export type TypePredicateKind =
  | "identifier"
  | "this"
  | "assertsIdentifier"
  | "assertsThis";

export interface TypePredicate {
  readonly kind: TypePredicateKind;
  readonly parameterName?: string;
  readonly parameterIndex?: number;
  readonly targetTypeId?: number;
  readonly asserts: boolean;
}

export interface SignaturePredicateInfo {
  readonly signatureId: number;
  readonly predicate?: TypePredicate;
  readonly neverReturns: boolean;
  readonly asyncReturns: boolean;
}

export function createIdentifierTypePredicate(parameterName: string, parameterIndex: number, targetTypeId: number): TypePredicate {
  return {
    kind: "identifier",
    parameterName,
    parameterIndex,
    targetTypeId,
    asserts: false,
  };
}

export function createThisTypePredicate(targetTypeId: number): TypePredicate {
  return {
    kind: "this",
    targetTypeId,
    asserts: false,
  };
}

export function createAssertsIdentifierTypePredicate(parameterName: string, parameterIndex: number, targetTypeId?: number): TypePredicate {
  return {
    kind: "assertsIdentifier",
    parameterName,
    parameterIndex,
    ...(targetTypeId === undefined ? {} : { targetTypeId }),
    asserts: true,
  };
}

export function createAssertsThisTypePredicate(targetTypeId?: number): TypePredicate {
  return {
    kind: "assertsThis",
    ...(targetTypeId === undefined ? {} : { targetTypeId }),
    asserts: true,
  };
}

export function predicateNarrowsParameter(predicate: TypePredicate, parameterName: string, parameterIndex: number): boolean {
  if (predicate.kind !== "identifier" && predicate.kind !== "assertsIdentifier") return false;
  return predicate.parameterName === parameterName || predicate.parameterIndex === parameterIndex;
}

export function predicateNarrowsThis(predicate: TypePredicate): boolean {
  return predicate.kind === "this" || predicate.kind === "assertsThis";
}

export function predicateRequiresTruthiness(predicate: TypePredicate): boolean {
  return predicate.asserts && predicate.targetTypeId === undefined;
}

export function combineSignaturePredicateInfo(left: SignaturePredicateInfo, right: SignaturePredicateInfo): SignaturePredicateInfo {
  const predicate = left.predicate ?? right.predicate;
  return {
    signatureId: left.signatureId,
    ...(predicate === undefined ? {} : { predicate }),
    neverReturns: left.neverReturns || right.neverReturns,
    asyncReturns: left.asyncReturns || right.asyncReturns,
  };
}

export function signatureHasTypePredicate(info: SignaturePredicateInfo): boolean {
  return info.predicate !== undefined;
}

export function signatureHasAssertionPredicate(info: SignaturePredicateInfo): boolean {
  return info.predicate?.asserts === true;
}

export function signatureNarrowsParameter(info: SignaturePredicateInfo, parameterName: string, parameterIndex: number): boolean {
  return info.predicate === undefined ? false : predicateNarrowsParameter(info.predicate, parameterName, parameterIndex);
}

export function signatureNarrowsThis(info: SignaturePredicateInfo): boolean {
  return info.predicate === undefined ? false : predicateNarrowsThis(info.predicate);
}

export function chooseDominantPredicate(left: TypePredicate | undefined, right: TypePredicate | undefined): TypePredicate | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  if (left.asserts && !right.asserts) return left;
  if (right.asserts && !left.asserts) return right;
  if (left.targetTypeId !== undefined) return left;
  return right;
}

export function mergePredicateInfoList(infos: readonly SignaturePredicateInfo[]): SignaturePredicateInfo | undefined {
  const first = infos[0];
  if (first === undefined) return undefined;
  return infos.slice(1).reduce(combineSignaturePredicateInfo, first);
}

export function predicateInfoRequiresControlFlow(info: SignaturePredicateInfo): boolean {
  return info.neverReturns || signatureHasAssertionPredicate(info) || signatureNarrowsThis(info);
}

export function predicateInfoDebugText(info: SignaturePredicateInfo): string {
  return `${info.signatureId}: ${predicateDebugText(info.predicate)} ${info.neverReturns ? "never" : "returns"} ${info.asyncReturns ? "async" : "sync"}`;
}

export function sortPredicateInfos(infos: readonly SignaturePredicateInfo[]): readonly SignaturePredicateInfo[] {
  return [...infos].sort((left, right) => left.signatureId - right.signatureId || signaturePredicateKey(left).localeCompare(signaturePredicateKey(right)));
}

export function dedupePredicateInfos(infos: readonly SignaturePredicateInfo[]): readonly SignaturePredicateInfo[] {
  const seen = new Set<string>();
  const result: SignaturePredicateInfo[] = [];
  for (const info of sortPredicateInfos(infos)) {
    const key = signaturePredicateKey(info);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(info);
  }
  return result;
}

export function predicatesByParameter(infos: readonly SignaturePredicateInfo[]): ReadonlyMap<string, readonly SignaturePredicateInfo[]> {
  const result = new Map<string, SignaturePredicateInfo[]>();
  for (const info of infos) {
    const predicate = info.predicate;
    if (predicate === undefined || predicate.parameterName === undefined) continue;
    const list = result.get(predicate.parameterName) ?? [];
    result.set(predicate.parameterName, [...list, info]);
  }
  return result;
}

export function assertionPredicateInfos(infos: readonly SignaturePredicateInfo[]): readonly SignaturePredicateInfo[] {
  return infos.filter(signatureHasAssertionPredicate);
}

export function signaturePredicateKey(info: SignaturePredicateInfo): string {
  const predicate = info.predicate;
  return [
    info.signatureId,
    predicate?.kind ?? "none",
    predicate?.parameterName ?? "",
    predicate?.parameterIndex ?? "",
    predicate?.targetTypeId ?? "",
    info.neverReturns ? "never" : "returns",
    info.asyncReturns ? "async" : "sync",
  ].join(":");
}

export function predicateDebugText(predicate: TypePredicate | undefined): string {
  if (predicate === undefined) return "<none>";
  if (predicateNarrowsThis(predicate)) return `${predicate.asserts ? "asserts " : ""}this is ${predicate.targetTypeId ?? "truthy"}`;
  const parameter = predicate.parameterName ?? `#${predicate.parameterIndex ?? -1}`;
  return `${predicate.asserts ? "asserts " : ""}${parameter} is ${predicate.targetTypeId ?? "truthy"}`;
}
