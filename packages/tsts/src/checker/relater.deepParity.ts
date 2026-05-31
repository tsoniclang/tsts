/**
 * Deep relation helpers.
 *
 * Conceptual split from TS-Go `relater.go`'s recursive relation workers.
 */

import type { Symbol as AstSymbol } from "../ast/index.js";
import { SymbolFlags } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, Type, TypeParameter, TypePredicate, UnionOrIntersectionType } from "./types.js";
import { ObjectFlags, SignatureFlags, SignatureKind, TypeFlags, VarianceFlags, getTypeOfSymbol } from "./types.js";
import { Ternary } from "./relater.js";

export interface RelationDiagnostics {
  readonly property?: string;
  readonly reason?: string;
  readonly source?: Type;
  readonly target?: Type;
}

export interface DeepRelationState {
  readonly cache: Map<string, Ternary>;
  readonly stack: RelationFrame[];
  readonly strictNullChecks: boolean;
  diagnostics?: RelationDiagnostics;
  depthLimit: number;
}

export interface RelationFrame {
  readonly source: Type;
  readonly target: Type;
  readonly relation: RelationFlavor;
}

export type RelationFlavor = "identity" | "subtype" | "strictSubtype" | "assignable" | "comparable";

export function createDeepRelationState(strictNullChecks = true): DeepRelationState {
  return { cache: new Map(), stack: [], strictNullChecks, depthLimit: 100 };
}

export function isDeeplyRelatedTo(source: Type, target: Type, relation: RelationFlavor, state = createDeepRelationState()): Ternary {
  if (source === target) return Ternary.True;
  const key = relationKey(source, target, relation);
  const cached = state.cache.get(key);
  if (cached !== undefined) return cached;
  if (state.stack.length > state.depthLimit) return Ternary.Maybe;
  if (state.stack.some(frame => frame.source === source && frame.target === target && frame.relation === relation)) return Ternary.Maybe;
  state.stack.push({ source, target, relation });
  const result = structuredRelatedTo(source, target, relation, state);
  state.stack.pop();
  state.cache.set(key, result);
  return result;
}

export function structuredRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const primitive = primitiveRelatedTo(source, target, relation, state);
  if (primitive !== Ternary.Unknown) return primitive;
  if ((source.flags & TypeFlags.Union) !== 0) return unionSourceRelatedTo(source, target, relation, state);
  if ((target.flags & TypeFlags.Union) !== 0) return unionTargetRelatedTo(source, target, relation, state);
  if ((source.flags & TypeFlags.Intersection) !== 0) return intersectionSourceRelatedTo(source, target, relation, state);
  if ((target.flags & TypeFlags.Intersection) !== 0) return intersectionTargetRelatedTo(source, target, relation, state);
  if ((source.flags & TypeFlags.Object) !== 0 && (target.flags & TypeFlags.Object) !== 0) return objectRelatedTo(source, target, relation, state);
  if ((source.flags & TypeFlags.TypeParameter) !== 0 || (target.flags & TypeFlags.TypeParameter) !== 0) return typeVariableRelatedTo(source, target, relation, state);
  return relation === "comparable" ? Ternary.Maybe : Ternary.False;
}

export function primitiveRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  if ((target.flags & TypeFlags.Any) !== 0 || (source.flags & TypeFlags.Never) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.Any) !== 0) return relation === "identity" ? Ternary.False : Ternary.True;
  if ((target.flags & TypeFlags.Unknown) !== 0) return relation === "identity" ? Ternary.False : Ternary.True;
  if ((source.flags & TypeFlags.Unknown) !== 0) return target.flags === TypeFlags.Unknown ? Ternary.True : Ternary.False;
  if (!state.strictNullChecks && (source.flags & TypeFlags.Nullable) !== 0 && (target.flags & TypeFlags.Nullable) === 0) return Ternary.True;
  if ((source.flags & target.flags & TypeFlags.Primitive) !== 0) return primitiveFamilyRelated(source, target, relation);
  if ((source.flags & TypeFlags.Literal) !== 0) return literalRelatedToBase(source, target, relation);
  if ((target.flags & TypeFlags.Literal) !== 0) return literalTargetRelatedTo(source, target, relation);
  return Ternary.Unknown;
}

export function unionSourceRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const parts = constituentTypes(source);
  if (parts.length === 0) return Ternary.True;
  let aggregate = Ternary.True;
  for (const part of parts) {
    const result = isDeeplyRelatedTo(part, target, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function unionTargetRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const parts = constituentTypes(target);
  for (const part of parts) {
    const result = isDeeplyRelatedTo(source, part, relation, state);
    if (result !== Ternary.False) return result;
  }
  return Ternary.False;
}

export function intersectionSourceRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const parts = constituentTypes(source);
  if (relation === "identity") return everyRelated(parts, target, relation, state);
  for (const part of parts) {
    const result = isDeeplyRelatedTo(part, target, relation, state);
    if (result !== Ternary.False) return result;
  }
  return objectRelatedTo(source, target, relation, state);
}

export function intersectionTargetRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  return everyRelated(constituentTypes(target), source, relation, state, true);
}

export function objectRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceObject = apparentObjectType(source);
  const targetObject = apparentObjectType(target);
  if (relation !== "identity" && isEmptyObject(targetObject)) return Ternary.True;
  const propertyResult = propertiesRelatedTo(sourceObject, targetObject, relation, state);
  if (propertyResult === Ternary.False) return Ternary.False;
  const indexResult = indexSignaturesRelatedTo(sourceObject, targetObject, relation, state);
  if (indexResult === Ternary.False) return Ternary.False;
  const callResult = signaturesRelatedTo(sourceObject, targetObject, SignatureKind.Call, relation, state);
  if (callResult === Ternary.False) return Ternary.False;
  const constructResult = signaturesRelatedTo(sourceObject, targetObject, SignatureKind.Construct, relation, state);
  return ternaryAnd(propertyResult, ternaryAnd(indexResult, ternaryAnd(callResult, constructResult)));
}

export function propertiesRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  let aggregate = Ternary.True;
  for (const targetProperty of propertiesOf(target)) {
    const sourceProperty = propertyOf(source, symbolName(targetProperty));
    if (sourceProperty === undefined) {
      if (isOptional(targetProperty) && relation !== "identity") continue;
      state.diagnostics = { property: symbolName(targetProperty), reason: "missing property", source, target };
      return Ternary.False;
    }
    const result = propertyRelatedTo(sourceProperty, targetProperty, relation, state);
    if (result === Ternary.False) {
      state.diagnostics = { property: symbolName(targetProperty), reason: "incompatible property", source: typeOf(sourceProperty), target: typeOf(targetProperty) };
      return Ternary.False;
    }
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function propertyRelatedTo(source: AstSymbol, target: AstSymbol, relation: RelationFlavor, state: DeepRelationState): Ternary {
  if (isPrivateOrProtected(source) || isPrivateOrProtected(target)) {
    if (declarationIdentity(source) !== declarationIdentity(target)) return Ternary.False;
  }
  if (relation === "identity" && isOptional(source) !== isOptional(target)) return Ternary.False;
  if (isReadonly(source) !== isReadonly(target) && relation === "identity") return Ternary.False;
  return isDeeplyRelatedTo(typeOf(source), typeOf(target), relation, state);
}

export function signaturesRelatedTo(source: Type, target: Type, kind: SignatureKind, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const targetSignatures = signaturesOf(target, kind);
  if (targetSignatures.length === 0) return Ternary.True;
  const sourceSignatures = signaturesOf(source, kind);
  if (sourceSignatures.length === 0) return Ternary.False;
  let aggregate = Ternary.True;
  for (const targetSignature of targetSignatures) {
    const matching = sourceSignatures.some(sourceSignature => signatureRelatedTo(sourceSignature, targetSignature, relation, state) !== Ternary.False);
    if (!matching) return Ternary.False;
    const relationResult = signatureRelatedTo(sourceSignatures[0]!, targetSignature, relation, state);
    aggregate = ternaryAnd(aggregate, relationResult);
  }
  return aggregate;
}

export function signatureRelatedTo(source: Signature, target: Signature, relation: RelationFlavor, state: DeepRelationState): Ternary {
  if (source === target) return Ternary.True;
  if (relation === "identity" && source.parameters.length !== target.parameters.length) return Ternary.False;
  if (source.parameters.length < requiredParameterCount(target)) return Ternary.False;
  const parameterResult = signatureParametersRelated(source, target, relation, state);
  if (parameterResult === Ternary.False) return Ternary.False;
  const returnResult = signatureReturnsRelated(source, target, relation, state);
  if (returnResult === Ternary.False) return Ternary.False;
  const predicateResult = typePredicatesRelated(source.resolvedTypePredicate as TypePredicate | undefined, target.resolvedTypePredicate as TypePredicate | undefined, relation, state);
  return ternaryAnd(parameterResult, ternaryAnd(returnResult, predicateResult));
}

export function signatureParametersRelated(source: Signature, target: Signature, relation: RelationFlavor, state: DeepRelationState): Ternary {
  let aggregate = Ternary.True;
  const count = Math.max(source.parameters.length, target.parameters.length);
  for (let index = 0; index < count; index += 1) {
    const sourceParameter = source.parameters[index];
    const targetParameter = target.parameters[index];
    if (targetParameter === undefined) continue;
    if (sourceParameter === undefined) return Ternary.False;
    const sourceType = typeOf(sourceParameter);
    const targetType = typeOf(targetParameter);
    const result = relation === "identity"
      ? isDeeplyRelatedTo(sourceType, targetType, relation, state)
      : isDeeplyRelatedTo(targetType, sourceType, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function signatureReturnsRelated(source: Signature, target: Signature, relation: RelationFlavor, state: DeepRelationState): Ternary {
  if ((target.flags & SignatureFlags.IsUntypedSignatureInJSFile) !== 0 && relation !== "identity") return Ternary.True;
  const sourceReturn = source.resolvedReturnType ?? unknownType();
  const targetReturn = target.resolvedReturnType ?? unknownType();
  if ((targetReturn.flags & TypeFlags.Void) !== 0 && relation !== "identity") return Ternary.True;
  return isDeeplyRelatedTo(sourceReturn, targetReturn, relation, state);
}

export function typePredicatesRelated(source: TypePredicate | undefined, target: TypePredicate | undefined, relation: RelationFlavor, state: DeepRelationState): Ternary {
  if (source === target) return Ternary.True;
  if (source === undefined || target === undefined) return Ternary.False;
  if (source.kind !== target.kind || source.parameterIndex !== target.parameterIndex || source.parameterName !== target.parameterName) return Ternary.False;
  if (source.type === undefined || target.type === undefined) return source.type === target.type ? Ternary.True : Ternary.False;
  return isDeeplyRelatedTo(source.type, target.type, relation, state);
}

export function indexSignaturesRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  let aggregate = Ternary.True;
  for (const targetInfo of indexInfosOf(target)) {
    const sourceInfo = applicableIndexInfo(source, targetInfo.keyType);
    if (sourceInfo === undefined) return Ternary.False;
    const readonlyOk = relation !== "identity" || sourceInfo.isReadonly === targetInfo.isReadonly;
    if (!readonlyOk) return Ternary.False;
    const result = isDeeplyRelatedTo(sourceInfo.valueType, targetInfo.valueType, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function typeVariableRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceConstraint = constraintOf(source);
  if (sourceConstraint !== undefined && isDeeplyRelatedTo(sourceConstraint, target, relation, state) !== Ternary.False) return Ternary.True;
  const targetConstraint = constraintOf(target);
  if (targetConstraint !== undefined && isDeeplyRelatedTo(source, targetConstraint, relation, state) !== Ternary.False) return Ternary.True;
  return relation === "comparable" ? Ternary.Maybe : Ternary.False;
}

export function varianceRelatedTo(source: readonly Type[], target: readonly Type[], variances: readonly number[], relation: RelationFlavor, state: DeepRelationState): Ternary {
  if (source.length !== target.length) return Ternary.False;
  let aggregate = Ternary.True;
  for (let index = 0; index < source.length; index += 1) {
    const variance = variances[index] ?? VarianceFlags.Invariant;
    const result = varianceOfTypeArguments(source[index]!, target[index]!, variance, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function varianceOfTypeArguments(source: Type, target: Type, variance: number, relation: RelationFlavor, state: DeepRelationState): Ternary {
  if ((variance & VarianceFlags.Covariant) !== 0) return isDeeplyRelatedTo(source, target, relation, state);
  if ((variance & VarianceFlags.Contravariant) !== 0) return isDeeplyRelatedTo(target, source, relation, state);
  if ((variance & VarianceFlags.Bivariant) === VarianceFlags.Bivariant) {
    const forward = isDeeplyRelatedTo(source, target, relation, state);
    return forward !== Ternary.False ? forward : isDeeplyRelatedTo(target, source, relation, state);
  }
  const forward = isDeeplyRelatedTo(source, target, "identity", state);
  if (forward === Ternary.False) return Ternary.False;
  return isDeeplyRelatedTo(target, source, "identity", state);
}

export function excessPropertiesRelatedTo(source: Type, target: Type): readonly AstSymbol[] {
  const targetNames = new Set(propertiesOf(target).map(symbolName));
  return propertiesOf(source).filter(property => !targetNames.has(symbolName(property)));
}

export function commonPropertiesRelatedTo(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const targetNames = new Set(propertiesOf(target).map(symbolName));
  const common = propertiesOf(source).filter(property => targetNames.has(symbolName(property)));
  if (common.length === 0 && propertiesOf(target).length !== 0) return Ternary.False;
  let aggregate = Ternary.True;
  for (const property of common) {
    const targetProperty = propertyOf(target, symbolName(property));
    if (targetProperty === undefined) continue;
    const result = propertyRelatedTo(property, targetProperty, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function compareObjectTypeMembers(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const propertyResult = commonPropertiesRelatedTo(source, target, relation, state);
  if (propertyResult === Ternary.False) return Ternary.False;
  const sourceIndexes = indexInfosOf(source);
  const targetIndexes = indexInfosOf(target);
  if (targetIndexes.length !== 0 && sourceIndexes.length === 0) return Ternary.False;
  return propertyResult;
}

export function relateTupleTypes(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceArgs = typeArgumentsOf(source);
  const targetArgs = typeArgumentsOf(target);
  if (sourceArgs.length < fixedLengthOf(target)) return Ternary.False;
  if (relation === "identity" && sourceArgs.length !== targetArgs.length) return Ternary.False;
  let aggregate = Ternary.True;
  for (let index = 0; index < Math.min(sourceArgs.length, targetArgs.length); index += 1) {
    const result = isDeeplyRelatedTo(sourceArgs[index]!, targetArgs[index]!, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

export function relateArrayTypes(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceElement = typeArgumentsOf(source)[0] ?? unknownType();
  const targetElement = typeArgumentsOf(target)[0] ?? unknownType();
  return isDeeplyRelatedTo(sourceElement, targetElement, relation, state);
}

export function relateMappedTypes(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceConstraint = constraintOf(source);
  const targetConstraint = constraintOf(target);
  if (sourceConstraint !== undefined && targetConstraint !== undefined) {
    const constraintResult = isDeeplyRelatedTo(sourceConstraint, targetConstraint, relation, state);
    if (constraintResult === Ternary.False) return Ternary.False;
  }
  const sourceTemplate = templateTypeOf(source);
  const targetTemplate = templateTypeOf(target);
  if (sourceTemplate !== undefined && targetTemplate !== undefined) return isDeeplyRelatedTo(sourceTemplate, targetTemplate, relation, state);
  return Ternary.Maybe;
}

export function relateIndexedAccessTypes(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceObject = indexedObjectType(source);
  const targetObject = indexedObjectType(target);
  const sourceIndex = indexedIndexType(source);
  const targetIndex = indexedIndexType(target);
  if (sourceObject === undefined || targetObject === undefined || sourceIndex === undefined || targetIndex === undefined) return Ternary.Maybe;
  const objectResult = isDeeplyRelatedTo(sourceObject, targetObject, relation, state);
  if (objectResult === Ternary.False) return Ternary.False;
  return ternaryAnd(objectResult, isDeeplyRelatedTo(sourceIndex, targetIndex, relation, state));
}

export function relateConditionalTypes(source: Type, target: Type, relation: RelationFlavor, state: DeepRelationState): Ternary {
  const sourceCheck = conditionalPart(source, "checkType");
  const targetCheck = conditionalPart(target, "checkType");
  const sourceExtends = conditionalPart(source, "extendsType");
  const targetExtends = conditionalPart(target, "extendsType");
  if (sourceCheck === undefined || targetCheck === undefined || sourceExtends === undefined || targetExtends === undefined) return Ternary.Maybe;
  const checkResult = isDeeplyRelatedTo(sourceCheck, targetCheck, relation, state);
  if (checkResult === Ternary.False) return Ternary.False;
  return ternaryAnd(checkResult, isDeeplyRelatedTo(sourceExtends, targetExtends, relation, state));
}

function primitiveFamilyRelated(source: Type, target: Type, relation: RelationFlavor): Ternary {
  if (relation === "identity") return source.flags === target.flags ? Ternary.True : Ternary.False;
  if ((source.flags & TypeFlags.StringLike) !== 0 && (target.flags & TypeFlags.StringLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.NumberLike) !== 0 && (target.flags & TypeFlags.NumberLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.BigIntLike) !== 0 && (target.flags & TypeFlags.BigIntLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.BooleanLike) !== 0 && (target.flags & TypeFlags.BooleanLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.ESSymbolLike) !== 0 && (target.flags & TypeFlags.ESSymbolLike) !== 0) return Ternary.True;
  return Ternary.Unknown;
}

function literalRelatedToBase(source: Type, target: Type, relation: RelationFlavor): Ternary {
  if (relation === "identity") return literalValue(source) === literalValue(target) && source.flags === target.flags ? Ternary.True : Ternary.False;
  if ((source.flags & TypeFlags.StringLiteral) !== 0 && (target.flags & TypeFlags.StringLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.NumberLiteral) !== 0 && (target.flags & TypeFlags.NumberLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.BigIntLiteral) !== 0 && (target.flags & TypeFlags.BigIntLike) !== 0) return Ternary.True;
  if ((source.flags & TypeFlags.BooleanLiteral) !== 0 && (target.flags & TypeFlags.BooleanLike) !== 0) return Ternary.True;
  return Ternary.Unknown;
}

function literalTargetRelatedTo(source: Type, target: Type, relation: RelationFlavor): Ternary {
  if (relation !== "identity") return Ternary.Unknown;
  return literalValue(source) === literalValue(target) && source.flags === target.flags ? Ternary.True : Ternary.False;
}

function everyRelated(types: readonly Type[], other: Type, relation: RelationFlavor, state: DeepRelationState, reverse = false): Ternary {
  let aggregate = Ternary.True;
  for (const type of types) {
    const result = reverse ? isDeeplyRelatedTo(other, type, relation, state) : isDeeplyRelatedTo(type, other, relation, state);
    if (result === Ternary.False) return Ternary.False;
    aggregate = ternaryAnd(aggregate, result);
  }
  return aggregate;
}

function applicableIndexInfo(type: Type, keyType: Type): IndexInfo | undefined {
  return indexInfosOf(type).find(info => (info.keyType.flags & keyType.flags) !== 0 || (keyType.flags & info.keyType.flags) !== 0);
}

function apparentObjectType(type: Type): Type {
  return (type.data as { readonly resolvedApparentType?: Type } | undefined)?.resolvedApparentType ?? type;
}

function isEmptyObject(type: Type): boolean {
  const data = type.data as ObjectType | undefined;
  return (type.flags & TypeFlags.Object) !== 0
    && (data?.declaredProperties?.length ?? 0) === 0
    && (data?.declaredCallSignatures?.length ?? 0) === 0
    && (data?.declaredConstructSignatures?.length ?? 0) === 0
    && (data?.indexInfos?.length ?? 0) === 0;
}

function propertyOf(type: Type, name: string): AstSymbol | undefined {
  return type.symbol?.members?.get(name) ?? propertiesOf(type).find(property => symbolName(property) === name);
}

function propertiesOf(type: Type): readonly AstSymbol[] {
  return (type.data as ObjectType | undefined)?.declaredProperties ?? [];
}

function indexInfosOf(type: Type): readonly IndexInfo[] {
  return (type.data as ObjectType | undefined)?.indexInfos ?? [];
}

function signaturesOf(type: Type, kind: SignatureKind): readonly Signature[] {
  const data = type.data as ObjectType | undefined;
  return kind === SignatureKind.Call ? data?.declaredCallSignatures ?? [] : data?.declaredConstructSignatures ?? [];
}

function constituentTypes(type: Type): readonly Type[] {
  return (type.data as UnionOrIntersectionType | undefined)?.types ?? [];
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments ?? [];
}

function fixedLengthOf(type: Type): number {
  return (type.data as { readonly fixedLength?: number } | undefined)?.fixedLength ?? typeArgumentsOf(type).length;
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as ObjectType | undefined)?.objectFlags ?? ObjectFlags.None;
}

function constraintOf(type: Type): Type | undefined {
  return (type.data as TypeParameter | { readonly constraint?: Type } | undefined)?.constraint;
}

function templateTypeOf(type: Type): Type | undefined {
  return (type.data as { readonly templateType?: Type } | undefined)?.templateType;
}

function indexedObjectType(type: Type): Type | undefined {
  return (type.data as { readonly objectType?: Type } | undefined)?.objectType;
}

function indexedIndexType(type: Type): Type | undefined {
  return (type.data as { readonly indexType?: Type } | undefined)?.indexType;
}

function conditionalPart(type: Type, key: "checkType" | "extendsType" | "trueType" | "falseType"): Type | undefined {
  return (type.data as Record<string, Type | undefined> | undefined)?.[key];
}

function typeOf(symbol: AstSymbol): Type {
  return getTypeOfSymbol(symbol) ?? unknownType();
}

function unknownType(): Type {
  return { flags: TypeFlags.Unknown, id: -3_750_001, data: { intrinsicName: "unknown", objectFlags: ObjectFlags.None } };
}

function literalValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function isOptional(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Optional) !== 0;
}

function isReadonly(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly readonly?: boolean }).readonly);
}

function isPrivateOrProtected(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly private?: boolean; readonly protected?: boolean }).private)
    || Boolean((symbol as { readonly private?: boolean; readonly protected?: boolean }).protected)
    || symbolName(symbol).startsWith("#");
}

function declarationIdentity(symbol: AstSymbol): AstSymbol | undefined {
  return symbol.parent ?? symbol;
}

function requiredParameterCount(signature: Signature): number {
  return signature.minArgumentCount;
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function relationKey(source: Type, target: Type, relation: RelationFlavor): string {
  return relation === "identity" && source.id > target.id
    ? `${relation}:${target.id}:${source.id}`
    : `${relation}:${source.id}:${target.id}`;
}

function ternaryAnd(left: Ternary, right: Ternary): Ternary {
  if (left === Ternary.False || right === Ternary.False) return Ternary.False;
  if (left === Ternary.True && right === Ternary.True) return Ternary.True;
  if (left === Ternary.Maybe || right === Ternary.Maybe) return Ternary.Maybe;
  return Ternary.Unknown;
}
