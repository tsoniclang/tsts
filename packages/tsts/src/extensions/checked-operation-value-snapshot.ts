import type {
  CheckedCallMappingRequest,
  CheckedCallMappingResult,
  CheckedConversionMappingRequest,
  CheckedConversionMappingResult,
  CheckedElementAccessMappingRequest,
  CheckedIterationMappingRequest,
  CheckedOperationMappingResult,
  CheckedOperationObservationPointName,
  CheckedOperatorMappingRequest,
  CheckedPropertyAccessMappingRequest,
  ExtensionObservationRequest,
  ExtensionObservationResponse,
  ExtensionObservationResult,
} from "./observations.js";
import { ExtensionObservationPoint } from "./observations.js";
import { selectedTargetSignatureEquals, targetParameterEquals } from "./fact-value-equality.js";
import { isHostOwnedExtensionDiagnostic, markHostOwnedExtensionDiagnostic } from "./diagnostic-ownership.js";
import type {
  ArgumentPassingFact,
  AssociatedTypeFact,
  AttributeFact,
  CheckedBinaryOperatorToken,
  CheckedCallSourceOperation,
  CheckedConversionSourceOperation,
  CheckedElementAccessSourceOperation,
  CheckedForAwaitOfAtomicIterationMechanism,
  CheckedForAwaitOfIterationMechanism,
  CheckedForOfAtomicIterationMechanism,
  CheckedForOfIterationMechanism,
  CheckedIterationSourceOperation,
  CheckedOperatorSourceOperation,
  CheckedPrefixUnaryOperatorToken,
  CheckedPropertyAccessSourceOperation,
  CheckedSourceChainParticipant,
  CheckedSourceChainRole,
  CheckedUpdateOperatorToken,
  ConstGenericFact,
  ContextualTargetTypeFact,
  DefaultValueFact,
  ExtensionCanonicalIdentity,
  FieldFact,
  FlowStateFact,
  FunctionPointerFact,
  InstantiatedTargetTypeFact,
  PointerFact,
  ProviderDeclarationIdentity,
  ProviderMemberKey,
  ProviderTypeFamilyFact,
  ProviderTypeFamilyVariantFact,
  ProviderVirtualDeclarationFact,
  RuntimeCarrierFact,
  RuntimeCarrierProvenance,
  SelectedSourceIterationProtocolEvidence,
  SelectedSourceIterationProtocolMemberEvidence,
  SelectedSourceIterationTypes,
  SelectedSourceTypeEvidence,
  SelectedSourceValueEvidence,
  SelectedTargetSignatureFact,
  SourcePrimitiveFact,
  SourceSelectedCallEvidence,
  SourceSelectedCallArgumentBinding,
  SourceSelectedMethodTypeArgument,
  SourceSelectedSignatureParameter,
  StructFact,
  TargetBindingFact,
  TargetCallArgumentConversionSlot,
  TargetCallArgumentConversionFact,
  TargetCallArgumentPassingFact,
  TargetConstraint,
  TargetConversionFact,
  TargetMember,
  TargetOperationFact,
  TargetOperationProposal,
  TargetOperationProvenance,
  TargetOperationSourceProvenance,
  TargetParameter,
  TargetSignatureSelection,
  TargetTypeParameter,
  TargetTypeRef,
} from "./facts.js";
import type {
  CheckedSourceAuthoredLiteralEvidence,
  CheckedSourceCallArgumentCompositionEvidence,
  CheckedSourceCallCompositionEvidence,
  CheckedSourceInlineFunctionEvidence,
  CheckedSourceInlineFunctionReturnEvidence,
  CheckedSourceInlineOperation,
  CheckedSourceInlinePropertyOperation,
  RetainedCheckedOperationRequest,
  RetainedCheckedSourceCallMappingRequest,
} from "./source-operation-producer.js";
import type {
  ExtensionDiagnostic,
  ExtensionDiagnosticSourceSpan,
  ExtensionEvidence,
  ExtensionFactSubject,
  ProviderWellKnownSymbolName,
} from "./host.js";

type SnapshotSchemaKey<T> = {
  [TKey in keyof T]-?: [Exclude<T[TKey], undefined>] extends [never] ? never : TKey;
}[keyof T];
type AllFieldsSnapshotted<T, TFields extends SnapshotSchemaKey<T>> = Exclude<SnapshotSchemaKey<T>, TFields> extends never ? true : false;
type ExactSchemaUnion<TActual, TExpected> = Exclude<TActual, TExpected> extends never
  ? Exclude<TExpected, TActual> extends never
    ? true
    : false
  : false;
type RequireAllSnapshots<T extends readonly true[]> = T;

export type CheckedOperationSnapshotFieldCoverage = RequireAllSnapshots<[
  ExactSchemaUnion<TargetOperationSourceProvenance["sourceOperationKind"], "call" | "property-access" | "element-access" | "operator" | "iteration" | "conversion">,
  ExactSchemaUnion<CheckedCallMappingRequest["callKind"], "call" | "construct">,
  ExactSchemaUnion<CheckedPropertyAccessMappingRequest["accessMode"], "read" | "write" | "read-write" | "delete">,
  ExactSchemaUnion<CheckedPropertyAccessMappingRequest["use"], "value" | "call-callee">,
  ExactSchemaUnion<CheckedOperatorMappingRequest["operatorKind"], "prefix-unary" | "prefix-update" | "postfix-update" | "binary">,
  ExactSchemaUnion<CheckedPrefixUnaryOperatorToken, "+" | "-" | "~" | "!" | "typeof" | "void" | "delete">,
  ExactSchemaUnion<CheckedUpdateOperatorToken, "++" | "--">,
  ExactSchemaUnion<CheckedBinaryOperatorToken,
    | "**" | "*" | "/" | "%" | "+" | "-"
    | "<<" | ">>" | ">>>"
    | "<" | ">" | "<=" | ">=" | "instanceof" | "in"
    | "==" | "!=" | "===" | "!=="
    | "&" | "^" | "|" | "&&" | "||" | "??"
    | "=" | "+=" | "-=" | "*=" | "**=" | "/=" | "%="
    | "<<=" | ">>=" | ">>>=" | "&=" | "^=" | "|=" | "&&=" | "||=" | "??="
    | ",">,
  ExactSchemaUnion<CheckedIterationMappingRequest["iterationKind"], "for-in" | "for-of" | "for-await-of">,
  ExactSchemaUnion<CheckedConversionMappingRequest["conversionKind"], "assertion" | "call-argument">,
  ExactSchemaUnion<Extract<CheckedConversionMappingRequest, { readonly conversionKind: "assertion" }>["assertionKind"], "as" | "angle-bracket" | "jsdoc">,
  ExactSchemaUnion<CheckedCallMappingResult["kind"], "source" | "target">,
  ExactSchemaUnion<CheckedForOfIterationMechanism["kind"], "synchronous-iterator-protocol" | "array-like-index" | "string-code-unit-index" | "untyped-dynamic-iteration" | "union">,
  ExactSchemaUnion<CheckedForAwaitOfIterationMechanism["kind"], "asynchronous-iterator-protocol" | "synchronous-iterator-adapted-to-async" | "array-like-index-adapted-to-async" | "string-code-unit-index-adapted-to-async" | "untyped-dynamic-iteration" | "union">,
  ExactSchemaUnion<SelectedSourceIterationProtocolEvidence["resolutionKind"], "known-iterable-instantiation" | "selected-iterator-member">,
  ExactSchemaUnion<SourceSelectedCallEvidence["kind"], "applicable" | "untyped">,
  ExactSchemaUnion<CheckedSourceChainRole["kind"], "ordinary" | "optional-chain">,
  ExactSchemaUnion<CheckedSourceChainParticipant, "call" | "property-access" | "element-access">,
  ExactSchemaUnion<Extract<CheckedSourceChainRole, { readonly kind: "optional-chain" }>["position"], "root" | "continuation">,
  ExactSchemaUnion<Extract<CheckedSourceChainRole, { readonly kind: "optional-chain" }>["boundary"], "nested" | "outermost">,
  ExactSchemaUnion<TargetOperationFact["operationKind"], "property" | "method" | "indexer" | "operator" | "constructor" | "iteration">,
  ExactSchemaUnion<TargetMember["kind"], "method" | "constructor" | "property" | "field" | "indexer" | "event" | "operator">,
  ExactSchemaUnion<TargetParameter["passingMode"], "by-value" | "byref-readonly" | "byref-readwrite" | "byref-writeonly-must-init" | "borrow-shared" | "borrow-mut" | "move">,
  ExactSchemaUnion<NonNullable<TargetTypeParameter["variance"]>, "in" | "out" | "invariant" | "target-defined">,
  ExactSchemaUnion<Extract<TargetTypeRef, { readonly kind: "source-primitive" }>["name"], "bool" | "char" | "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32" | "int64" | "uint64" | "native-int" | "native-uint" | "float16" | "float32" | "float64" | "decimal" | "int128" | "uint128">,
  ExactSchemaUnion<NonNullable<Extract<TargetTypeRef, { readonly kind: "pointer" }>["mutability"]>, "const" | "mut" | "target-defined">,
  ExactSchemaUnion<ProviderWellKnownSymbolName, "asyncIterator" | "hasInstance" | "isConcatSpreadable" | "iterator" | "match" | "matchAll" | "replace" | "search" | "species" | "split" | "toPrimitive" | "toStringTag" | "unscopables">,
  ExactSchemaUnion<ProviderMemberKey["kind"], "property-key" | "well-known-symbol">,
  ExactSchemaUnion<TargetCallArgumentConversionSlot["sourceForm"], "value" | "spread-element" | "spread-sequence">,
  ExactSchemaUnion<TargetCallArgumentConversionSlot["targetForm"], "parameter" | "params-element" | "params-sequence">,
  ExactSchemaUnion<SourceSelectedCallArgumentBinding["sourceParameterForm"], "parameter" | "rest-element" | "rest-sequence">,
  ExactSchemaUnion<TargetTypeRef["kind"], "source-primitive" | "source-global" | "target-named" | "type-parameter" | "array" | "tuple" | "pointer" | "function-pointer" | "opaque" | "associated-type" | "lifetime" | "target-specific">,
  ExactSchemaUnion<TargetConstraint["kind"], "implements" | "value-type" | "reference-type" | "constructible" | "unmanaged" | "copy" | "clone" | "default" | "sized" | "lifetime" | "target-specific">,
  ExactSchemaUnion<ExtensionObservationResult<unknown>["kind"], "core" | "accept" | "reject" | "missing-owner" | "owner-deferred" | "conflict">,
  ExactSchemaUnion<ExtensionDiagnostic["category"], "error" | "warning" | "suggestion">,
  AllFieldsSnapshotted<CheckedCallMappingRequest,
    | "sourceOperationKind"
    | "call"
    | "callee"
    | "arguments"
    | "callKind"
    | "sourceSelection"
    | "sourceCallee"
    | "sourceArguments"
    | "sourceResult"
    | "sourceReceiver"
    | "chainRole"
    | "target">,
  AllFieldsSnapshotted<RetainedCheckedSourceCallMappingRequest,
    | keyof CheckedCallMappingRequest
    | "sourceComposition">,
  AllFieldsSnapshotted<CheckedCallSourceOperation,
    | "sourceOperationKind"
    | "call"
    | "callee"
    | "arguments"
    | "callKind"
    | "sourceSelection"
    | "sourceCallee"
    | "sourceArguments"
    | "sourceResult"
    | "sourceReceiver"
    | "chainRole">,
  AllFieldsSnapshotted<CheckedPropertyAccessMappingRequest,
    | "sourceOperationKind"
    | "expression"
    | "receiver"
    | "propertyName"
    | "sourceReceiver"
    | "accessMode"
    | "use"
    | "sourceReadResult"
    | "sourceWriteType"
    | "chainRole"
    | "target">,
  AllFieldsSnapshotted<CheckedPropertyAccessSourceOperation,
    | "sourceOperationKind"
    | "expression"
    | "receiver"
    | "propertyName"
    | "sourceReceiver"
    | "accessMode"
    | "use"
    | "sourceReadResult"
    | "sourceWriteType"
    | "chainRole">,
  AllFieldsSnapshotted<CheckedElementAccessMappingRequest,
    | "sourceOperationKind"
    | "expression"
    | "receiver"
    | "argument"
    | "sourceArgument"
    | "sourceSelectedElementIndex"
    | "sourceReceiver"
    | "accessMode"
    | "use"
    | "sourceReadResult"
    | "sourceWriteType"
    | "chainRole"
    | "target">,
  AllFieldsSnapshotted<CheckedElementAccessSourceOperation,
    | "sourceOperationKind"
    | "expression"
    | "receiver"
    | "argument"
    | "sourceArgument"
    | "sourceSelectedElementIndex"
    | "sourceReceiver"
    | "accessMode"
    | "use"
    | "sourceReadResult"
    | "sourceWriteType"
    | "chainRole">,
  AllFieldsSnapshotted<CheckedOperatorMappingRequest,
    | "sourceOperationKind"
    | "operatorKind"
    | "expression"
    | "operator"
    | "operand"
    | "sourceOperand"
    | "left"
    | "right"
    | "sourceLeft"
    | "sourceRight"
    | "sourceResult"
    | "target">,
  AllFieldsSnapshotted<CheckedOperatorSourceOperation,
    | "sourceOperationKind"
    | "operatorKind"
    | "expression"
    | "operator"
    | "operand"
    | "sourceOperand"
    | "left"
    | "right"
    | "sourceLeft"
    | "sourceRight"
    | "sourceResult">,
  AllFieldsSnapshotted<CheckedIterationMappingRequest,
    | "sourceOperationKind"
    | "statement"
    | "expression"
    | "initializer"
    | "iterationKind"
    | "mechanism"
    | "sourceIterable"
    | "sourceElement"
    | "target">,
  AllFieldsSnapshotted<CheckedIterationSourceOperation,
    | "sourceOperationKind"
    | "statement"
    | "expression"
    | "initializer"
    | "iterationKind"
    | "mechanism"
    | "sourceIterable"
    | "sourceElement">,
  AllFieldsSnapshotted<CheckedConversionMappingRequest,
    | "sourceOperationKind"
    | "expression"
    | "source"
    | "targetPlatform"
    | "conversionKind"
    | "target"
    | "call"
    | "slot"
    | "targetParameter"
    | "selectedSignature"
    | "sourceBinding"
    | "assertionKind"
    | "explicitTargetTypeNode">,
  AllFieldsSnapshotted<Extract<CheckedConversionSourceOperation, { readonly conversionKind: "assertion" }>,
    "sourceOperationKind" | "conversionKind" | "expression" | "source" | "target" | "assertionKind" | "explicitTargetTypeNode">,
  AllFieldsSnapshotted<Extract<CheckedConversionSourceOperation, { readonly conversionKind: "call-argument" }>,
    "sourceOperationKind" | "conversionKind" | "expression" | "source" | "call" | "slot" | "sourceBinding">,
  AllFieldsSnapshotted<Extract<CheckedCallMappingResult, { readonly kind: "source" }>, "kind">,
  AllFieldsSnapshotted<Extract<CheckedCallMappingResult, { readonly kind: "target" }>, "kind" | "selectedSignature" | "argumentConversions">,
  AllFieldsSnapshotted<CheckedOperationMappingResult, "operation" | "resultType" | "providerDeclaration">,
  AllFieldsSnapshotted<CheckedConversionMappingResult, "convertedType" | "operation" | "providerDeclaration">,
  AllFieldsSnapshotted<TargetSignatureSelection, "member" | "targetTypeArguments" | "providerDeclaration">,
  AllFieldsSnapshotted<SelectedTargetSignatureFact,
    | "member"
    | "argumentConversions"
    | "targetTypeArguments"
    | "providerDeclaration"
    | "sourceCallKind"
    | "sourceSelection"
    | "sourceCallee"
    | "sourceArguments"
    | "sourceResult"
    | "sourceReceiver"
    | "sourceChainRole">,
  AllFieldsSnapshotted<Extract<SourceSelectedCallEvidence, { readonly kind: "applicable" }>,
    "kind" | "signature" | "declaration" | "methodTypeArguments" | "parameters" | "argumentBindings">,
  AllFieldsSnapshotted<Extract<SourceSelectedCallEvidence, { readonly kind: "untyped" }>, "kind">,
  AllFieldsSnapshotted<Extract<CheckedSourceChainRole, { readonly kind: "ordinary" }>, "kind" | "participant">,
  AllFieldsSnapshotted<Extract<CheckedSourceChainRole, { readonly kind: "optional-chain" }>, "kind" | "participant" | "position" | "boundary">,
  AllFieldsSnapshotted<SelectedSourceIterationProtocolMemberEvidence, "symbol" | "valueDeclaration" | "declarations" | "type">,
  AllFieldsSnapshotted<SelectedSourceIterationTypes, "yieldType" | "returnType" | "nextType">,
  AllFieldsSnapshotted<Extract<SelectedSourceIterationProtocolEvidence, { readonly resolutionKind: "known-iterable-instantiation" }>,
    "resolutionKind" | "iterationTypes" | "iterableTarget" | "iterableDeclarations">,
  AllFieldsSnapshotted<Extract<SelectedSourceIterationProtocolEvidence, { readonly resolutionKind: "selected-iterator-member" }>,
    "resolutionKind" | "iterationTypes" | "iteratorMethod" | "iteratorType">,
  AllFieldsSnapshotted<Extract<CheckedForOfIterationMechanism, { readonly kind: "union" }>, "kind" | "alternatives">,
  AllFieldsSnapshotted<Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "synchronous-iterator-protocol" }>, "kind" | "sourceAlternative" | "protocol">,
  AllFieldsSnapshotted<Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "array-like-index" }>, "kind" | "sourceAlternative" | "selectedIndex">,
  AllFieldsSnapshotted<Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "string-code-unit-index" }>, "kind" | "sourceAlternative">,
  AllFieldsSnapshotted<Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "untyped-dynamic-iteration" }>, "kind" | "sourceAlternative">,
  AllFieldsSnapshotted<Extract<CheckedForAwaitOfIterationMechanism, { readonly kind: "union" }>, "kind" | "alternatives">,
  AllFieldsSnapshotted<Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "asynchronous-iterator-protocol" }>, "kind" | "sourceAlternative" | "protocol">,
  AllFieldsSnapshotted<Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "synchronous-iterator-adapted-to-async" }>, "kind" | "sourceAlternative" | "protocol">,
  AllFieldsSnapshotted<Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "array-like-index-adapted-to-async" }>, "kind" | "sourceAlternative" | "selectedIndex">,
  AllFieldsSnapshotted<Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "string-code-unit-index-adapted-to-async" }>, "kind" | "sourceAlternative">,
  AllFieldsSnapshotted<Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "untyped-dynamic-iteration" }>, "kind" | "sourceAlternative">,
  AllFieldsSnapshotted<SelectedSourceTypeEvidence,
    | "type"
    | "symbol"
    | "declaration"
    | "selectedSymbol"
    | "selectedDeclaration"
    | "authoredTypeNode">,
  AllFieldsSnapshotted<SelectedSourceValueEvidence,
    | "expression"
    | "type"
    | "symbol"
    | "declaration"
    | "selectedSymbol"
    | "selectedDeclaration"
    | "authoredTypeNode">,
  AllFieldsSnapshotted<CheckedSourceCallCompositionEvidence, "argumentEvidence">,
  AllFieldsSnapshotted<Extract<CheckedSourceCallArgumentCompositionEvidence, { readonly kind: "authored-literal" }>, "kind" | "literal">,
  AllFieldsSnapshotted<Extract<CheckedSourceCallArgumentCompositionEvidence, { readonly kind: "inline-function" }>, "kind" | "function">,
  AllFieldsSnapshotted<Extract<CheckedSourceAuthoredLiteralEvidence, { readonly kind: "string" | "number" | "bigint" | "boolean" }>, "kind" | "value">,
  AllFieldsSnapshotted<Extract<CheckedSourceAuthoredLiteralEvidence, { readonly kind: "null" }>, "kind">,
  AllFieldsSnapshotted<CheckedSourceInlineFunctionEvidence, "expression" | "parameters" | "returns" | "operations">,
  AllFieldsSnapshotted<CheckedSourceInlineFunctionReturnEvidence, "expression">,
  AllFieldsSnapshotted<CheckedSourceInlinePropertyOperation, "sourceOperationKind" | "expression" | "receiver" | "sourceReceiver" | "accessMode" | "use" | "sourceReadResult" | "sourceWriteType" | "chainRole">,
  AllFieldsSnapshotted<TargetMember,
    | "id"
    | "sourceName"
    | "targetName"
    | "kind"
    | "static"
    | "parameters"
    | "returnType"
    | "typeParameters"
    | "overloadGroup"
    | "providerDeclaration">,
  AllFieldsSnapshotted<TargetParameter, "name" | "type" | "passingMode" | "optional" | "paramsArray">,
  AllFieldsSnapshotted<TargetTypeParameter, "name" | "constraints" | "variance">,
  AllFieldsSnapshotted<TargetOperationProposal, "operationId" | "operationKind" | "targetOperation" | "evidence">,
  AllFieldsSnapshotted<TargetOperationFact, "operationId" | "operationKind" | "targetOperation" | "resultType" | "evidence" | "provenance">,
  AllFieldsSnapshotted<TargetOperationProvenance, "providerDeclaration" | "sourceOperation">,
  AllFieldsSnapshotted<ProviderDeclarationIdentity,
    | "providerId"
    | "providerVersion"
    | "providerModuleId"
    | "moduleSpecifier"
    | "artifactFileName"
    | "exportName"
    | "exportId"
    | "memberName"
    | "memberKey"
    | "memberId"
    | "memberStatic"
    | "signatureId"
    | "targetIdentity">,
  AllFieldsSnapshotted<SourceSelectedMethodTypeArgument, "typeParameterName" | "typeParameter" | "selectedType" | "explicitTypeNode">,
  AllFieldsSnapshotted<SourceSelectedSignatureParameter,
    | "parameterIndex"
    | "parameterName"
    | "parameterSymbol"
    | "parameterDeclaration"
    | "selectedType"
    | "authoredTypeNode"
    | "acceptsOmission"
    | "rest">,
  AllFieldsSnapshotted<SourceSelectedCallArgumentBinding,
    | "sourceArgumentIndex"
    | "effectiveArgumentIndex"
    | "sourceForm"
    | "spreadElementIndex"
    | "sourceParameterIndex"
    | "sourceParameterForm"
    | "selectedArgumentType"
    | "selectedParameterType">,
  AllFieldsSnapshotted<TargetCallArgumentConversionSlot,
    | "sourceArgumentIndex"
    | "sourceForm"
    | "spreadElementIndex"
    | "targetParameterIndex"
    | "targetForm">,
  AllFieldsSnapshotted<ExtensionEvidence, "message" | "details">,
  AllFieldsSnapshotted<ExtensionDiagnostic,
    | "extensionId"
    | "extensionCode"
    | "numericCode"
    | "publicCode"
    | "category"
    | "message"
    | "nodeOrSpan"
    | "evidence"
    | "identity">,
  AllFieldsSnapshotted<ExtensionDiagnosticSourceSpan, "sourceFile" | "pos" | "end">,
  AllFieldsSnapshotted<Extract<ProviderMemberKey, { readonly kind: "property-key" }>, "kind" | "name">,
  AllFieldsSnapshotted<Extract<ProviderMemberKey, { readonly kind: "well-known-symbol" }>, "kind" | "name">,
  AllFieldsSnapshotted<Extract<TargetConstraint, { readonly kind: "implements" }>, "kind" | "contract" | "typeArguments">,
  AllFieldsSnapshotted<Extract<TargetConstraint, { readonly kind: "lifetime" }>, "kind" | "name">,
  AllFieldsSnapshotted<Extract<TargetConstraint, { readonly kind: "target-specific" }>, "kind" | "target" | "name" | "payloadId">,
  AllFieldsSnapshotted<Exclude<TargetConstraint, { readonly kind: "implements" | "lifetime" | "target-specific" }>, "kind">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "source-primitive" }>, "kind" | "name">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "source-global" }>, "kind" | "name" | "typeArguments">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "target-named" }>, "kind" | "id" | "typeArguments">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "type-parameter" }>, "kind" | "name">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "array" }>, "kind" | "element" | "rank">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "tuple" }>, "kind" | "elements">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "pointer" }>, "kind" | "pointee" | "mutability">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "function-pointer" }>, "kind" | "args" | "result" | "abi">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "opaque" }>, "kind" | "id">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "associated-type" }>, "kind" | "owner" | "name">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "lifetime" }>, "kind" | "name">,
  AllFieldsSnapshotted<Extract<TargetTypeRef, { readonly kind: "target-specific" }>, "kind" | "target" | "name" | "payloadId">,
]>;

const checkedOperationRequestSnapshotCacheBrand = Symbol("tsts.checked-operation-request-snapshot-cache");

export interface CheckedOperationRequestSnapshotCache {
  readonly [checkedOperationRequestSnapshotCacheBrand]: true;
}

interface SnapshotCacheMap<TKey extends object, TValue extends object> {
  get(key: TKey): TValue | undefined;
  set(key: TKey, value: TValue): void;
}

interface CheckedOperationRequestSnapshotCacheAccess {
  readonly selectedTargetSignatures: SnapshotCacheMap<SelectedTargetSignatureFact, SelectedTargetSignatureFact>;
  readonly targetParameters: SnapshotCacheMap<TargetParameter, TargetParameter>;
  readonly targetCallArgumentConversionSlots: SnapshotCacheMap<TargetCallArgumentConversionSlot, TargetCallArgumentConversionSlot>;
}

interface CheckedOperationRequestSnapshotCacheState {
  readonly selectedTargetSignatures: WeakMap<SelectedTargetSignatureFact, SelectedTargetSignatureFact>;
  readonly targetParameters: WeakMap<TargetParameter, TargetParameter>;
  readonly targetCallArgumentConversionSlots: WeakMap<TargetCallArgumentConversionSlot, TargetCallArgumentConversionSlot>;
}

interface TransactionalSnapshotCacheMap<TKey extends object, TValue extends object> {
  readonly view: SnapshotCacheMap<TKey, TValue>;
  assertCanCommit(): void;
  commit(): void;
}

interface SnapshotBudget {
  objectCount: number;
  targetTypeRefObjectCount: number;
  arrayElementCount: number;
  ownFieldCount: number;
  scalarCodeUnits: number;
  workUnits: number;
  readonly recordDescriptors: WeakMap<object, ReadonlyMap<string, PropertyDescriptor>>;
  readonly arrayValues: WeakMap<readonly unknown[], readonly unknown[]>;
  readonly targetTypeRefSnapshots: WeakMap<object, TargetTypeRef>;
  readonly immutableDataState: ImmutableDataSnapshotState;
  readonly chargedObjects: WeakSet<object>;
  readonly chargedTargetTypeRefObjects: WeakSet<object>;
  readonly chargedOpaqueSubjects: WeakSet<object>;
}

export interface CheckedOperationRequestSnapshotMetrics {
  readonly objectCount: number;
  readonly targetTypeRefObjectCount: number;
  readonly arrayElementCount: number;
  readonly ownFieldCount: number;
  readonly scalarCodeUnits: number;
  readonly workUnits: number;
}

export interface CheckedOperationRequestSnapshot<TObservation extends CheckedOperationObservationPointName> {
  readonly request: RetainedCheckedOperationRequest<TObservation>;
  readonly metrics: CheckedOperationRequestSnapshotMetrics;
}

interface SnapshotPath {
  readonly parent?: SnapshotPath;
  readonly segment: string;
  readonly depth: number;
  readonly budget: SnapshotBudget;
  readonly resourceClass?: "target-type-ref";
}

interface TargetTypeRefChild {
  readonly type: TargetTypeRef;
  readonly path: SnapshotPath;
}

interface CapturedTargetTypeRef {
  readonly children: readonly TargetTypeRefChild[];
  readonly build: (snapshots: WeakMap<object, TargetTypeRef>) => TargetTypeRef;
}

type TargetTypeRefTraversalFrame =
  | { readonly stage: "enter"; readonly type: TargetTypeRef; readonly path: SnapshotPath }
  | { readonly stage: "exit"; readonly type: TargetTypeRef; readonly path: SnapshotPath };

const checkedOperationResponseSnapshots = new WeakMap<object, CheckedOperationObservationPointName>();
const checkedOperationRequestSnapshotCacheStates = new WeakMap<CheckedOperationRequestSnapshotCache, CheckedOperationRequestSnapshotCacheState>();
const canonicalTargetCallArgumentConversionSlots = new WeakSet<TargetCallArgumentConversionSlot>();

const snapshotLimits = Object.freeze({
  maxDepth: 128,
  maxObjects: 16_384,
  maxTargetTypeRefObjects: 65_536,
  maxArrayElements: 65_536,
  maxOwnFields: 65_536,
  maxScalarCodeUnits: 1_048_576,
  maxWorkUnits: 2_000_000,
});

export function createCheckedOperationRequestSnapshotCache(): CheckedOperationRequestSnapshotCache {
  const cache: CheckedOperationRequestSnapshotCache = Object.freeze({
    [checkedOperationRequestSnapshotCacheBrand]: true as const,
  });
  checkedOperationRequestSnapshotCacheStates.set(cache, {
    selectedTargetSignatures: new WeakMap<SelectedTargetSignatureFact, SelectedTargetSignatureFact>(),
    targetParameters: new WeakMap<TargetParameter, TargetParameter>(),
    targetCallArgumentConversionSlots: new WeakMap<TargetCallArgumentConversionSlot, TargetCallArgumentConversionSlot>(),
  });
  return cache;
}

function createCheckedOperationRequestSnapshotCacheTransaction(
  cache: CheckedOperationRequestSnapshotCache,
  path: SnapshotPath,
): { readonly access: CheckedOperationRequestSnapshotCacheAccess; commit(): void } {
  const state = checkedOperationRequestSnapshotCacheStates.get(cache);
  if (state === undefined) {
    throw new Error(`Invalid checked-operation snapshot cache at '${formatSnapshotPath(path)}': cache was not created by createCheckedOperationRequestSnapshotCache().`);
  }
  const selectedTargetSignatures = createTransactionalSnapshotCacheMap(state.selectedTargetSignatures);
  const targetParameters = createTransactionalSnapshotCacheMap(state.targetParameters);
  const targetCallArgumentConversionSlots = createTransactionalSnapshotCacheMap(state.targetCallArgumentConversionSlots);
  let committed = false;
  return {
    access: {
      selectedTargetSignatures: selectedTargetSignatures.view,
      targetParameters: targetParameters.view,
      targetCallArgumentConversionSlots: targetCallArgumentConversionSlots.view,
    },
    commit() {
      if (committed) {
        throw new Error("Checked-operation snapshot cache transaction was committed more than once.");
      }
      selectedTargetSignatures.assertCanCommit();
      targetParameters.assertCanCommit();
      targetCallArgumentConversionSlots.assertCanCommit();
      selectedTargetSignatures.commit();
      targetParameters.commit();
      targetCallArgumentConversionSlots.commit();
      committed = true;
    },
  };
}

function createTransactionalSnapshotCacheMap<TKey extends object, TValue extends object>(
  base: WeakMap<TKey, TValue>,
): TransactionalSnapshotCacheMap<TKey, TValue> {
  const staged = new WeakMap<TKey, TValue>();
  const entries: Array<readonly [TKey, TValue]> = [];
  return {
    view: {
      get(key) {
        return staged.get(key) ?? base.get(key);
      },
      set(key, value) {
        if (staged.has(key)) {
          if (staged.get(key) !== value) {
            throw new Error("Checked-operation snapshot cache transaction attempted conflicting values for one source object.");
          }
          return;
        }
        const existing = base.get(key);
        if (existing !== undefined) {
          if (existing !== value) {
            throw new Error("Checked-operation snapshot cache transaction attempted to replace a committed snapshot.");
          }
          return;
        }
        staged.set(key, value);
        entries.push([key, value]);
      },
    },
    assertCanCommit() {
      for (const [key, value] of entries) {
        const existing = base.get(key);
        if (existing !== undefined && existing !== value) {
          throw new Error("Checked-operation snapshot cache transaction conflicted with a nested committed snapshot.");
        }
      }
    },
    commit() {
      for (const [key, value] of entries) {
        const existing = base.get(key);
        if (existing !== undefined && existing !== value) {
          throw new Error("Checked-operation snapshot cache transaction conflicted with a nested committed snapshot.");
        }
        base.set(key, value);
      }
    },
  };
}

export function snapshotCheckedOperationRequest<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  request: RetainedCheckedOperationRequest<TObservation>,
  cache: CheckedOperationRequestSnapshotCache = createCheckedOperationRequestSnapshotCache(),
): RetainedCheckedOperationRequest<TObservation> {
  return snapshotCheckedOperationRequestWithMetrics(observation, request, cache).request;
}

export function snapshotCheckedOperationRequestWithMetrics<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  request: RetainedCheckedOperationRequest<TObservation>,
  cache: CheckedOperationRequestSnapshotCache = createCheckedOperationRequestSnapshotCache(),
): CheckedOperationRequestSnapshot<TObservation> {
  const path = createSnapshotPath(`checked-operation request[${observation}]`);
  const cacheTransaction = createCheckedOperationRequestSnapshotCacheTransaction(cache, path);
  let snapshot: RetainedCheckedOperationRequest<TObservation>;
  switch (observation) {
    case ExtensionObservationPoint.mapCheckedCall:
      snapshot = snapshotCallRequest(request as RetainedCheckedSourceCallMappingRequest, path) as RetainedCheckedOperationRequest<TObservation>;
      break;
    case ExtensionObservationPoint.mapCheckedPropertyAccess:
      snapshot = snapshotPropertyRequest(request as CheckedPropertyAccessMappingRequest, path) as RetainedCheckedOperationRequest<TObservation>;
      break;
    case ExtensionObservationPoint.mapCheckedElementAccess:
      snapshot = snapshotElementRequest(request as CheckedElementAccessMappingRequest, path) as RetainedCheckedOperationRequest<TObservation>;
      break;
    case ExtensionObservationPoint.mapCheckedOperator:
      snapshot = snapshotOperatorRequest(request as CheckedOperatorMappingRequest, path) as RetainedCheckedOperationRequest<TObservation>;
      break;
    case ExtensionObservationPoint.mapCheckedIteration:
      snapshot = snapshotIterationRequest(request as CheckedIterationMappingRequest, path) as RetainedCheckedOperationRequest<TObservation>;
      break;
    case ExtensionObservationPoint.mapCheckedConversion:
      snapshot = snapshotConversionRequest(request as CheckedConversionMappingRequest, cacheTransaction.access, path) as RetainedCheckedOperationRequest<TObservation>;
      break;
    default:
      throw new Error(`Unsupported checked-operation observation '${String(observation)}'.`);
  }
  cacheTransaction.commit();
  return Object.freeze({
    request: snapshot,
    metrics: snapshotRequestMetrics(path.budget),
  });
}

function snapshotRequestMetrics(budget: SnapshotBudget): CheckedOperationRequestSnapshotMetrics {
  return Object.freeze({
    objectCount: budget.objectCount,
    targetTypeRefObjectCount: budget.targetTypeRefObjectCount,
    arrayElementCount: budget.arrayElementCount,
    ownFieldCount: budget.ownFieldCount,
    scalarCodeUnits: budget.scalarCodeUnits,
    workUnits: budget.workUnits,
  });
}

export function snapshotCheckedOperationResult<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  result: ExtensionObservationResult<ExtensionObservationResponse<TObservation>>,
): ExtensionObservationResult<ExtensionObservationResponse<TObservation>> {
  const path = createSnapshotPath(`checked-operation result[${observation}]`);
  assertRecord(result, "checked-operation result", path);
  const actualKind = readDiscriminant(result, "checked-operation result", path);
  switch (actualKind) {
    case "core": {
      const core = captureExactOwnFields(result as Extract<typeof result, { readonly kind: "core" }>, ["kind", "value"], "core checked-operation result", path);
      const value = core.value;
      return Object.freeze({
        kind: "core",
        value: snapshotCheckedOperationResponseAtPath(observation, value, childSnapshotPath(path, "value")),
      });
    }
    case "accept": {
      const accepted = captureExactOwnFields(result as Extract<typeof result, { readonly kind: "accept" }>, ["kind", "value", "extensionId", "evidence"], "accepted checked-operation result", path);
      const value = accepted.value;
      const extensionId = accepted.extensionId;
      const evidence = accepted.evidence;
      assertString(extensionId, "accepted checked-operation result extensionId", childSnapshotPath(path, "extensionId"));
      return Object.freeze({
        kind: "accept",
        value: snapshotCheckedOperationResponseAtPath(observation, value, childSnapshotPath(path, "value")),
        extensionId,
        ...(evidence === undefined ? {} : {
          evidence: snapshotEvidenceArray(evidence, childSnapshotPath(path, "evidence")),
        }),
      });
    }
    case "reject": {
      const rejected = captureExactOwnFields(result as Extract<typeof result, { readonly kind: "reject" }>, ["kind", "diagnostic", "extensionId"], "rejected checked-operation result", path);
      const diagnostic = rejected.diagnostic;
      const extensionId = rejected.extensionId;
      assertString(extensionId, "rejected checked-operation result extensionId", childSnapshotPath(path, "extensionId"));
      const diagnosticSnapshot = snapshotDiagnostic(diagnostic, childSnapshotPath(path, "diagnostic"));
      if (diagnosticSnapshot.extensionId !== extensionId) {
        throw new Error(`Invalid rejected checked-operation result at '${formatSnapshotPath(path)}': result extensionId '${extensionId}' does not match diagnostic extensionId '${diagnosticSnapshot.extensionId}'.`);
      }
      return Object.freeze({
        kind: "reject",
        diagnostic: diagnosticSnapshot,
        extensionId,
      });
    }
    case "missing-owner": {
      const missing = captureExactOwnFields(result as Extract<typeof result, { readonly kind: "missing-owner" }>, ["kind", "observation"], "missing-owner checked-operation result", path);
      assertMatchingCheckedOperationObservation(missing.observation, observation, childSnapshotPath(path, "observation"));
      return Object.freeze({ kind: "missing-owner", observation: missing.observation });
    }
    case "owner-deferred": {
      const deferred = captureExactOwnFields(result as Extract<typeof result, { readonly kind: "owner-deferred" }>, ["kind", "observation", "extensionId"], "owner-deferred checked-operation result", path);
      assertMatchingCheckedOperationObservation(deferred.observation, observation, childSnapshotPath(path, "observation"));
      assertString(deferred.extensionId, "owner-deferred checked-operation result extensionId", childSnapshotPath(path, "extensionId"));
      return Object.freeze({ kind: "owner-deferred", observation: deferred.observation, extensionId: deferred.extensionId });
    }
    case "conflict": {
      const conflict = captureExactOwnFields(result as Extract<typeof result, { readonly kind: "conflict" }>, ["kind", "observation"], "conflicting checked-operation result", path);
      assertMatchingCheckedOperationObservation(conflict.observation, observation, childSnapshotPath(path, "observation"));
      return Object.freeze({ kind: "conflict", observation: conflict.observation });
    }
    default:
      throw unknownKindError("checked-operation result", actualKind, path);
  }
}

function snapshotCallRequest(
  request: RetainedCheckedSourceCallMappingRequest,
  path: SnapshotPath,
  includeTarget = true,
): RetainedCheckedSourceCallMappingRequest {
  assertRecord(request, "CheckedCallMappingRequest", path);
  request = captureExactOwnFields(request, [
    "sourceOperationKind",
    "call",
    "callee",
    "arguments",
    "callKind",
    "sourceSelection",
    "sourceCallee",
    "sourceArguments",
    "sourceResult",
    "sourceReceiver",
    "sourceComposition",
    "chainRole",
    ...(includeTarget ? ["target"] : []),
  ], "CheckedCallMappingRequest", path);
  if (request.sourceOperationKind !== "call") {
    throw invalidEnumValueError("CheckedCallMappingRequest sourceOperationKind", request.sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  assertOpaqueIdentitySubject(request.call, "CheckedCallMappingRequest call", childSnapshotPath(path, "call"));
  assertOpaqueIdentitySubject(request.callee, "CheckedCallMappingRequest callee", childSnapshotPath(path, "callee"));
  const arguments_ = captureOpaqueIdentitySubjectArray(request.arguments, "CheckedCallMappingRequest arguments", childSnapshotPath(path, "arguments"));
  assertCheckedCallKind(request.callKind, childSnapshotPath(path, "callKind"));
  const sourceArguments = captureArray(request.sourceArguments, "CheckedCallMappingRequest sourceArguments", childSnapshotPath(path, "sourceArguments"));
  if (sourceArguments.length !== arguments_.length) {
    throw new Error(`Invalid CheckedCallMappingRequest at '${formatSnapshotPath(path)}': sourceArguments length ${sourceArguments.length} does not match arguments length ${arguments_.length}.`);
  }
  if (request.target !== undefined) {
    assertString(request.target, "CheckedCallMappingRequest target", childSnapshotPath(path, "target"));
  }
  const sourceSelection = snapshotSourceSelectedCallEvidence(
    request.sourceSelection,
    childSnapshotPath(path, "sourceSelection"),
    arguments_.length,
  );
  return Object.freeze({
    sourceOperationKind: "call",
    call: request.call,
    callee: request.callee,
    arguments: arguments_,
    callKind: request.callKind,
    sourceSelection,
    sourceCallee: snapshotSelectedSourceValueEvidence(request.sourceCallee, childSnapshotPath(path, "sourceCallee")),
    sourceArguments: Object.freeze(sourceArguments.map((evidence, index) => snapshotSelectedSourceValueEvidence(
      evidence,
      indexedSnapshotPath(childSnapshotPath(path, "sourceArguments"), index),
    ))),
    sourceResult: snapshotSelectedSourceValueEvidence(request.sourceResult, childSnapshotPath(path, "sourceResult")),
    ...(request.sourceReceiver === undefined ? {} : {
      sourceReceiver: snapshotSelectedSourceValueEvidence(request.sourceReceiver, childSnapshotPath(path, "sourceReceiver")),
    }),
    ...(request.sourceComposition === undefined ? {} : {
      sourceComposition: snapshotCheckedSourceCallCompositionEvidence(
        request.sourceComposition,
        arguments_.length,
        childSnapshotPath(path, "sourceComposition"),
      ),
    }),
    chainRole: snapshotSourceChainRole(request.chainRole, "call", childSnapshotPath(path, "chainRole")),
    ...(includeTarget && request.target !== undefined ? { target: request.target } : {}),
  });
}

function snapshotPropertyRequest(request: CheckedPropertyAccessMappingRequest, path: SnapshotPath, includeTarget = true): CheckedPropertyAccessMappingRequest {
  assertRecord(request, "CheckedPropertyAccessMappingRequest", path);
  const accessMode = readOwnStringField(request, "accessMode", "CheckedPropertyAccessMappingRequest", path);
  assertCheckedAccessMode(accessMode, childSnapshotPath(path, "accessMode"));
  const commonFields = ["sourceOperationKind", "expression", "receiver", "propertyName", "accessMode", "use", "sourceReceiver", "chainRole", ...(includeTarget ? ["target"] : [])] as const;
  const captured = captureExactOwnFields(
    request,
    accessMode === "write"
      ? [...commonFields, "sourceWriteType"]
      : accessMode === "read-write"
        ? [...commonFields, "sourceReadResult", "sourceWriteType"]
        : [...commonFields, "sourceReadResult"],
    "CheckedPropertyAccessMappingRequest",
    path,
  );
  if (captured.sourceOperationKind !== "property-access") {
    throw invalidEnumValueError("CheckedPropertyAccessMappingRequest sourceOperationKind", captured.sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  assertOpaqueIdentitySubject(captured.expression, "CheckedPropertyAccessMappingRequest expression", childSnapshotPath(path, "expression"));
  assertOpaqueIdentitySubject(captured.receiver, "CheckedPropertyAccessMappingRequest receiver", childSnapshotPath(path, "receiver"));
  assertString(captured.propertyName, "CheckedPropertyAccessMappingRequest propertyName", childSnapshotPath(path, "propertyName"));
  assertCheckedAccessUse(captured.use, "CheckedPropertyAccessMappingRequest", childSnapshotPath(path, "use"));
  assertOptionalTarget(captured.target, "CheckedPropertyAccessMappingRequest", path);
  const sourceReceiver = snapshotSelectedSourceValueEvidence(captured.sourceReceiver, childSnapshotPath(path, "sourceReceiver"));
  const chainRole = snapshotSourceChainRole(captured.chainRole, "property-access", childSnapshotPath(path, "chainRole"));
  const base = {
    sourceOperationKind: "property-access",
    expression: captured.expression,
    receiver: captured.receiver,
    propertyName: captured.propertyName,
    sourceReceiver,
    ...(includeTarget && captured.target !== undefined ? { target: captured.target } : {}),
  } as const;
  if (accessMode === "read") {
    const read = captured as Extract<CheckedPropertyAccessMappingRequest, { readonly accessMode: "read" }>;
    return Object.freeze({
      ...base,
      accessMode: "read",
      use: read.use,
      sourceReadResult: snapshotSelectedSourceValueEvidence(read.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
      chainRole,
    });
  }
  if (captured.use !== "value") {
    throw invalidEnumValueError(`CheckedPropertyAccessMappingRequest ${accessMode} use`, captured.use, childSnapshotPath(path, "use"));
  }
  if (accessMode === "delete") {
    const deleteAccess = captured as Extract<CheckedPropertyAccessMappingRequest, { readonly accessMode: "delete" }>;
    return Object.freeze({
      ...base,
      accessMode: "delete",
      use: "value",
      sourceReadResult: snapshotSelectedSourceValueEvidence(deleteAccess.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
      chainRole,
    });
  }
  if (chainRole.kind !== "ordinary") {
    throw new Error(`Invalid CheckedPropertyAccessMappingRequest at '${formatSnapshotPath(childSnapshotPath(path, "chainRole"))}': ${accessMode} access cannot be an optional-chain participant.`);
  }
  if (accessMode === "write") {
    const write = captured as Extract<CheckedPropertyAccessMappingRequest, { readonly accessMode: "write" }>;
    return Object.freeze({
      ...base,
      accessMode: "write",
      use: "value",
      sourceWriteType: snapshotSelectedSourceTypeEvidence(write.sourceWriteType, childSnapshotPath(path, "sourceWriteType")),
      chainRole,
    });
  }
  const readWrite = captured as Extract<CheckedPropertyAccessMappingRequest, { readonly accessMode: "read-write" }>;
  return Object.freeze({
    ...base,
    accessMode: "read-write",
    use: "value",
    sourceReadResult: snapshotSelectedSourceValueEvidence(readWrite.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
    sourceWriteType: snapshotSelectedSourceTypeEvidence(readWrite.sourceWriteType, childSnapshotPath(path, "sourceWriteType")),
    chainRole,
  });
}

function snapshotElementRequest(request: CheckedElementAccessMappingRequest, path: SnapshotPath, includeTarget = true): CheckedElementAccessMappingRequest {
  assertRecord(request, "CheckedElementAccessMappingRequest", path);
  const accessMode = readOwnStringField(request, "accessMode", "CheckedElementAccessMappingRequest", path);
  assertCheckedAccessMode(accessMode, childSnapshotPath(path, "accessMode"));
  const commonFields = ["sourceOperationKind", "expression", "receiver", "argument", "sourceArgument", "sourceSelectedElementIndex", "accessMode", "use", "sourceReceiver", "chainRole", ...(includeTarget ? ["target"] : [])] as const;
  const captured = captureExactOwnFields(
    request,
    accessMode === "write"
      ? [...commonFields, "sourceWriteType"]
      : accessMode === "read-write"
        ? [...commonFields, "sourceReadResult", "sourceWriteType"]
        : [...commonFields, "sourceReadResult"],
    "CheckedElementAccessMappingRequest",
    path,
  );
  if (captured.sourceOperationKind !== "element-access") {
    throw invalidEnumValueError("CheckedElementAccessMappingRequest sourceOperationKind", captured.sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  assertOpaqueIdentitySubject(captured.expression, "CheckedElementAccessMappingRequest expression", childSnapshotPath(path, "expression"));
  assertOpaqueIdentitySubject(captured.receiver, "CheckedElementAccessMappingRequest receiver", childSnapshotPath(path, "receiver"));
  assertOpaqueIdentitySubject(captured.argument, "CheckedElementAccessMappingRequest argument", childSnapshotPath(path, "argument"));
  assertCheckedAccessUse(captured.use, "CheckedElementAccessMappingRequest", childSnapshotPath(path, "use"));
  if (captured.sourceSelectedElementIndex !== undefined) {
    assertNonNegativeInteger(captured.sourceSelectedElementIndex, "CheckedElementAccessMappingRequest sourceSelectedElementIndex", childSnapshotPath(path, "sourceSelectedElementIndex"));
  }
  assertOptionalTarget(captured.target, "CheckedElementAccessMappingRequest", path);
  const sourceReceiver = snapshotSelectedSourceValueEvidence(captured.sourceReceiver, childSnapshotPath(path, "sourceReceiver"));
  const sourceArgument = snapshotSelectedSourceValueEvidence(captured.sourceArgument, childSnapshotPath(path, "sourceArgument"));
  const chainRole = snapshotSourceChainRole(captured.chainRole, "element-access", childSnapshotPath(path, "chainRole"));
  const base = {
    sourceOperationKind: "element-access",
    expression: captured.expression,
    receiver: captured.receiver,
    argument: captured.argument,
    sourceReceiver,
    sourceArgument,
    ...(captured.sourceSelectedElementIndex === undefined ? {} : { sourceSelectedElementIndex: captured.sourceSelectedElementIndex }),
    ...(includeTarget && captured.target !== undefined ? { target: captured.target } : {}),
  } as const;
  if (accessMode === "read") {
    const read = captured as Extract<CheckedElementAccessMappingRequest, { readonly accessMode: "read" }>;
    return Object.freeze({
      ...base,
      accessMode: "read",
      use: read.use,
      sourceReadResult: snapshotSelectedSourceValueEvidence(read.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
      chainRole,
    });
  }
  if (captured.use !== "value") {
    throw invalidEnumValueError(`CheckedElementAccessMappingRequest ${accessMode} use`, captured.use, childSnapshotPath(path, "use"));
  }
  if (accessMode === "delete") {
    const deleteAccess = captured as Extract<CheckedElementAccessMappingRequest, { readonly accessMode: "delete" }>;
    return Object.freeze({
      ...base,
      accessMode: "delete",
      use: "value",
      sourceReadResult: snapshotSelectedSourceValueEvidence(deleteAccess.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
      chainRole,
    });
  }
  if (chainRole.kind !== "ordinary") {
    throw new Error(`Invalid CheckedElementAccessMappingRequest at '${formatSnapshotPath(childSnapshotPath(path, "chainRole"))}': ${accessMode} access cannot be an optional-chain participant.`);
  }
  if (accessMode === "write") {
    const write = captured as Extract<CheckedElementAccessMappingRequest, { readonly accessMode: "write" }>;
    return Object.freeze({
      ...base,
      accessMode: "write",
      use: "value",
      sourceWriteType: snapshotSelectedSourceTypeEvidence(write.sourceWriteType, childSnapshotPath(path, "sourceWriteType")),
      chainRole,
    });
  }
  const readWrite = captured as Extract<CheckedElementAccessMappingRequest, { readonly accessMode: "read-write" }>;
  return Object.freeze({
    ...base,
    accessMode: "read-write",
    use: "value",
    sourceReadResult: snapshotSelectedSourceValueEvidence(readWrite.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
    sourceWriteType: snapshotSelectedSourceTypeEvidence(readWrite.sourceWriteType, childSnapshotPath(path, "sourceWriteType")),
    chainRole,
  });
}

function snapshotOperatorRequest(request: CheckedOperatorMappingRequest, path: SnapshotPath, includeTarget = true): CheckedOperatorMappingRequest {
  assertRecord(request, "CheckedOperatorMappingRequest", path);
  const operatorKind = readOwnStringField(request, "operatorKind", "CheckedOperatorMappingRequest", path);
  const commonFields = ["sourceOperationKind", "operatorKind", "expression", "operator", "sourceResult", ...(includeTarget ? ["target"] : [])] as const;
  request = captureExactOwnFields(
    request,
    operatorKind === "binary"
      ? [...commonFields, "left", "right", "sourceLeft", "sourceRight"]
      : [...commonFields, "operand", "sourceOperand"],
    "CheckedOperatorMappingRequest",
    path,
  );
  if (request.sourceOperationKind !== "operator") {
    throw invalidEnumValueError("CheckedOperatorMappingRequest sourceOperationKind", request.sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  assertOpaqueIdentitySubject(request.expression, "CheckedOperatorMappingRequest expression", childSnapshotPath(path, "expression"));
  assertString(request.operator, "CheckedOperatorMappingRequest operator", childSnapshotPath(path, "operator"));
  if (request.target !== undefined) {
    assertString(request.target, "CheckedOperatorMappingRequest target", childSnapshotPath(path, "target"));
  }
  if (operatorKind === "binary") {
    const binary = request as Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "binary" }>;
    assertCheckedBinaryOperatorToken(binary.operator, childSnapshotPath(path, "operator"));
    assertOpaqueIdentitySubject(binary.left, "CheckedOperatorMappingRequest left", childSnapshotPath(path, "left"));
    assertOpaqueIdentitySubject(binary.right, "CheckedOperatorMappingRequest right", childSnapshotPath(path, "right"));
    return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "binary",
      expression: binary.expression,
      operator: binary.operator,
      left: binary.left,
      right: binary.right,
      sourceLeft: snapshotSelectedSourceValueEvidence(binary.sourceLeft, childSnapshotPath(path, "sourceLeft")),
      sourceRight: snapshotSelectedSourceValueEvidence(binary.sourceRight, childSnapshotPath(path, "sourceRight")),
      sourceResult: snapshotSelectedSourceValueEvidence(binary.sourceResult, childSnapshotPath(path, "sourceResult")),
      ...(includeTarget && binary.target !== undefined ? { target: binary.target } : {}),
    });
  }
  if (operatorKind !== "prefix-unary" && operatorKind !== "prefix-update" && operatorKind !== "postfix-update") {
    throw invalidEnumValueError("CheckedOperatorMappingRequest operatorKind", operatorKind, childSnapshotPath(path, "operatorKind"));
  }
  if (operatorKind === "prefix-unary") {
    const prefixUnary = request as Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "prefix-unary" }>;
    assertOpaqueIdentitySubject(prefixUnary.operand, "CheckedOperatorMappingRequest operand", childSnapshotPath(path, "operand"));
    assertCheckedPrefixUnaryOperatorToken(prefixUnary.operator, childSnapshotPath(path, "operator"));
    return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "prefix-unary",
      expression: prefixUnary.expression,
      operator: prefixUnary.operator,
      operand: prefixUnary.operand,
      sourceOperand: snapshotSelectedSourceValueEvidence(prefixUnary.sourceOperand, childSnapshotPath(path, "sourceOperand")),
      sourceResult: snapshotSelectedSourceValueEvidence(prefixUnary.sourceResult, childSnapshotPath(path, "sourceResult")),
      ...(includeTarget && prefixUnary.target !== undefined ? { target: prefixUnary.target } : {}),
    });
  }
  if (operatorKind === "prefix-update") {
    const prefixUpdate = request as Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "prefix-update" }>;
    assertOpaqueIdentitySubject(prefixUpdate.operand, "CheckedOperatorMappingRequest operand", childSnapshotPath(path, "operand"));
    assertCheckedUpdateOperatorToken(prefixUpdate.operator, childSnapshotPath(path, "operator"));
    return Object.freeze({
      sourceOperationKind: "operator",
      operatorKind: "prefix-update",
      expression: prefixUpdate.expression,
      operator: prefixUpdate.operator,
      operand: prefixUpdate.operand,
      sourceOperand: snapshotSelectedSourceValueEvidence(prefixUpdate.sourceOperand, childSnapshotPath(path, "sourceOperand")),
      sourceResult: snapshotSelectedSourceValueEvidence(prefixUpdate.sourceResult, childSnapshotPath(path, "sourceResult")),
      ...(includeTarget && prefixUpdate.target !== undefined ? { target: prefixUpdate.target } : {}),
    });
  }
  const postfixUpdate = request as Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "postfix-update" }>;
  assertOpaqueIdentitySubject(postfixUpdate.operand, "CheckedOperatorMappingRequest operand", childSnapshotPath(path, "operand"));
  assertCheckedUpdateOperatorToken(postfixUpdate.operator, childSnapshotPath(path, "operator"));
  return Object.freeze({
    sourceOperationKind: "operator",
    operatorKind: "postfix-update",
    expression: postfixUpdate.expression,
    operator: postfixUpdate.operator,
    operand: postfixUpdate.operand,
    sourceOperand: snapshotSelectedSourceValueEvidence(postfixUpdate.sourceOperand, childSnapshotPath(path, "sourceOperand")),
    sourceResult: snapshotSelectedSourceValueEvidence(postfixUpdate.sourceResult, childSnapshotPath(path, "sourceResult")),
    ...(includeTarget && postfixUpdate.target !== undefined ? { target: postfixUpdate.target } : {}),
  });
}

function snapshotIterationRequest(request: CheckedIterationMappingRequest, path: SnapshotPath, includeTarget = true): CheckedIterationMappingRequest {
  assertRecord(request, "CheckedIterationMappingRequest", path);
  request = captureExactOwnFields(request, ["sourceOperationKind", "statement", "expression", "initializer", "iterationKind", "mechanism", "sourceIterable", "sourceElement", ...(includeTarget ? ["target"] : [])], "CheckedIterationMappingRequest", path);
  if (request.sourceOperationKind !== "iteration") {
    throw invalidEnumValueError("CheckedIterationMappingRequest sourceOperationKind", request.sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  assertOpaqueIdentitySubject(request.statement, "CheckedIterationMappingRequest statement", childSnapshotPath(path, "statement"));
  assertOpaqueIdentitySubject(request.expression, "CheckedIterationMappingRequest expression", childSnapshotPath(path, "expression"));
  if (request.initializer !== undefined) {
    assertOpaqueIdentitySubject(request.initializer, "CheckedIterationMappingRequest initializer", childSnapshotPath(path, "initializer"));
  }
  assertCheckedIterationKind(request.iterationKind, childSnapshotPath(path, "iterationKind"));
  if (request.target !== undefined) {
    assertString(request.target, "CheckedIterationMappingRequest target", childSnapshotPath(path, "target"));
  }
  const base = {
    sourceOperationKind: "iteration",
    statement: request.statement,
    expression: request.expression,
    ...(request.initializer === undefined ? {} : { initializer: request.initializer }),
    sourceIterable: snapshotSelectedSourceValueEvidence(request.sourceIterable, childSnapshotPath(path, "sourceIterable")),
    sourceElement: snapshotSelectedSourceTypeEvidence(request.sourceElement, childSnapshotPath(path, "sourceElement")),
    ...(includeTarget && request.target !== undefined ? { target: request.target } : {}),
  } as const;
  switch (request.iterationKind) {
    case "for-in":
      return Object.freeze({
        ...base,
        iterationKind: "for-in",
        mechanism: snapshotForInIterationMechanism(request.mechanism, childSnapshotPath(path, "mechanism")),
      });
    case "for-of":
      return Object.freeze({
        ...base,
        iterationKind: "for-of",
        mechanism: snapshotForOfIterationMechanism(request.mechanism, childSnapshotPath(path, "mechanism")),
      });
    case "for-await-of":
      return Object.freeze({
        ...base,
        iterationKind: "for-await-of",
        mechanism: snapshotForAwaitOfIterationMechanism(request.mechanism, childSnapshotPath(path, "mechanism")),
      });
  }
}

function snapshotConversionRequest(
  request: CheckedConversionMappingRequest,
  cache: CheckedOperationRequestSnapshotCacheAccess,
  path: SnapshotPath,
): CheckedConversionMappingRequest {
  assertRecord(request, "CheckedConversionMappingRequest", path);
  const sourceOperationKind = readOwnStringField(request, "sourceOperationKind", "CheckedConversionMappingRequest", path);
  if (sourceOperationKind !== "conversion") {
    throw invalidEnumValueError("CheckedConversionMappingRequest sourceOperationKind", sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  const conversionKind = readOwnStringField(request, "conversionKind", "CheckedConversionMappingRequest", path);
  if (conversionKind === "call-argument") {
    const callRequest = captureExactOwnFields(request as Extract<CheckedConversionMappingRequest, { readonly conversionKind: "call-argument" }>, [
      "sourceOperationKind",
      "expression",
      "source",
      "targetPlatform",
      "conversionKind",
      "target",
      "call",
      "slot",
      "targetParameter",
      "selectedSignature",
      "sourceBinding",
    ], "call-argument CheckedConversionMappingRequest", path);
    assertOpaqueIdentitySubject(callRequest.expression, "CheckedConversionMappingRequest expression", childSnapshotPath(path, "expression"));
    if (callRequest.targetPlatform !== undefined) {
      assertString(callRequest.targetPlatform, "CheckedConversionMappingRequest targetPlatform", childSnapshotPath(path, "targetPlatform"));
    }
    const base = {
      sourceOperationKind: "conversion" as const,
      expression: callRequest.expression,
      source: snapshotSelectedSourceValueEvidence(callRequest.source, childSnapshotPath(path, "source")),
      ...(callRequest.targetPlatform === undefined ? {} : { targetPlatform: callRequest.targetPlatform }),
    };
    assertOpaqueIdentitySubject(callRequest.call, "call-argument CheckedConversionMappingRequest call", childSnapshotPath(path, "call"));
    const selectedSignature = snapshotSelectedTargetSignature(callRequest.selectedSignature, childSnapshotPath(path, "selectedSignature"), cache);
    const slot = cache.targetCallArgumentConversionSlots.get(callRequest.slot);
    if (slot === undefined) {
      throw new Error(`Invalid checked call-argument conversion at '${formatSnapshotPath(childSnapshotPath(path, "slot"))}': slot is not one of the selected target signature's canonical conversion slots.`);
    }
    const target = callRequest.target;
    const sourceTargetParameterType = readOwnDataField(
      callRequest.targetParameter,
      "type",
      "call-argument CheckedConversionMappingRequest targetParameter",
      childSnapshotPath(path, "targetParameter"),
    ) as TargetTypeRef;
    const originalCanonicalTarget = slot.targetForm === "params-element"
      ? readOwnStringField(sourceTargetParameterType, "kind", "call-argument target parameter type", childSnapshotPath(path, "targetParameter.type")) === "array"
        ? readOwnDataField(sourceTargetParameterType, "element", "array target parameter type", childSnapshotPath(path, "targetParameter.type")) as TargetTypeRef
        : undefined
      : sourceTargetParameterType;
    if (originalCanonicalTarget === undefined || target !== originalCanonicalTarget) {
      throw new Error(`Invalid checked call-argument conversion at '${formatSnapshotPath(childSnapshotPath(path, "target"))}': target does not match the canonical selected target parameter conversion form.`);
    }
    const targetParameter = snapshotTargetParameter(callRequest.targetParameter, childSnapshotPath(path, "targetParameter"), cache);
    const canonicalTarget = slot.targetForm === "params-element"
      ? (targetParameter.type as Extract<TargetTypeRef, { readonly kind: "array" }>).element
      : targetParameter.type;
    const sourceBinding = snapshotSelectedCallArgumentBinding(callRequest.sourceBinding, childSnapshotPath(path, "sourceBinding"));
    if (selectedSignature.sourceSelection.kind !== "applicable") {
      throw new Error(`Invalid checked call-argument conversion at '${formatSnapshotPath(path)}': call-argument conversion requires an applicable selected source signature.`);
    }
    const canonicalSourceBinding = selectedSignature.sourceSelection.argumentBindings[sourceBinding.effectiveArgumentIndex];
    if (canonicalSourceBinding === undefined || !selectedCallArgumentBindingsEqual(canonicalSourceBinding, sourceBinding)) {
      throw new Error(`Invalid checked call-argument conversion at '${formatSnapshotPath(childSnapshotPath(path, "sourceBinding"))}': binding is not the canonical selected source argument binding at effective argument index ${sourceBinding.effectiveArgumentIndex}.`);
    }
    if (slot.sourceArgumentIndex !== sourceBinding.sourceArgumentIndex
      || slot.sourceForm !== sourceBinding.sourceForm
      || slot.spreadElementIndex !== sourceBinding.spreadElementIndex) {
      throw new Error(`Invalid checked call-argument conversion at '${formatSnapshotPath(childSnapshotPath(path, "slot"))}': target conversion slot does not match its selected source argument binding.`);
    }
    return Object.freeze({
      ...base,
      conversionKind: "call-argument",
      target: canonicalTarget,
      call: callRequest.call,
      slot,
      targetParameter,
      selectedSignature,
      sourceBinding: canonicalSourceBinding,
    });
  }
  if (conversionKind !== "assertion") {
    throw invalidEnumValueError("CheckedConversionMappingRequest conversionKind", conversionKind, childSnapshotPath(path, "conversionKind"));
  }
  const assertionRequest = captureExactOwnFields(request as Extract<CheckedConversionMappingRequest, { readonly conversionKind: "assertion" }>, [
    "sourceOperationKind",
    "expression",
    "source",
    "targetPlatform",
    "conversionKind",
    "target",
    "assertionKind",
    "explicitTargetTypeNode",
  ], "assertion CheckedConversionMappingRequest", path);
  assertOpaqueIdentitySubject(assertionRequest.expression, "CheckedConversionMappingRequest expression", childSnapshotPath(path, "expression"));
  if (assertionRequest.targetPlatform !== undefined) {
    assertString(assertionRequest.targetPlatform, "CheckedConversionMappingRequest targetPlatform", childSnapshotPath(path, "targetPlatform"));
  }
  if (assertionRequest.assertionKind !== "as" && assertionRequest.assertionKind !== "angle-bracket" && assertionRequest.assertionKind !== "jsdoc") {
    throw invalidEnumValueError("assertion CheckedConversionMappingRequest assertionKind", assertionRequest.assertionKind, childSnapshotPath(path, "assertionKind"));
  }
  assertOpaqueIdentitySubject(assertionRequest.explicitTargetTypeNode, "assertion CheckedConversionMappingRequest explicitTargetTypeNode", childSnapshotPath(path, "explicitTargetTypeNode"));
  return Object.freeze({
    sourceOperationKind: "conversion",
    expression: assertionRequest.expression,
    source: snapshotSelectedSourceValueEvidence(assertionRequest.source, childSnapshotPath(path, "source")),
    ...(assertionRequest.targetPlatform === undefined ? {} : { targetPlatform: assertionRequest.targetPlatform }),
    conversionKind: "assertion",
    target: snapshotSelectedSourceTypeEvidence(assertionRequest.target, childSnapshotPath(path, "target")),
    assertionKind: assertionRequest.assertionKind,
    explicitTargetTypeNode: assertionRequest.explicitTargetTypeNode,
  });
}

export function snapshotCheckedOperationResponse<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  response: unknown,
): ExtensionObservationResponse<TObservation> {
  return snapshotCheckedOperationResponseAtPath(
    observation,
    response,
    createSnapshotPath(`checked-operation response[${observation}]`),
  );
}

function snapshotCheckedOperationResponseAtPath<TObservation extends CheckedOperationObservationPointName>(
  observation: TObservation,
  response: unknown,
  path: SnapshotPath,
): ExtensionObservationResponse<TObservation> {
  assertRecord(response, "checked-operation response", path);
  if (checkedOperationResponseSnapshots.get(response) === observation) {
    return response as ExtensionObservationResponse<TObservation>;
  }
  switch (observation) {
    case ExtensionObservationPoint.mapCheckedCall: {
      const call = response as ExtensionObservationResponse<typeof ExtensionObservationPoint.mapCheckedCall>;
      const kind = readDiscriminant(call, "checked call mapping response", path);
      if (kind === "source") {
        captureExactOwnFields(call, ["kind"], "source checked call mapping response", path);
        return checkedOperationResponseSnapshot(observation, Object.freeze({ kind: "source" })) as ExtensionObservationResponse<TObservation>;
      }
      if (kind !== "target") {
        throw unknownKindError("checked call mapping response", kind, path);
      }
      const targetCall = captureExactOwnFields(call as Extract<CheckedCallMappingResult, { readonly kind: "target" }>, ["kind", "selectedSignature", "argumentConversions"], "target checked call mapping response", path);
      const selectedSignature = targetCall.selectedSignature;
      const argumentConversions = targetCall.argumentConversions;
      return checkedOperationResponseSnapshot(observation, Object.freeze({
        kind: "target",
        selectedSignature: snapshotTargetSignatureSelection(selectedSignature, childSnapshotPath(path, "selectedSignature")),
        argumentConversions: snapshotArgumentConversionSlots(argumentConversions, childSnapshotPath(path, "argumentConversions")),
      })) as ExtensionObservationResponse<TObservation>;
    }
    case ExtensionObservationPoint.mapCheckedPropertyAccess:
    case ExtensionObservationPoint.mapCheckedElementAccess:
    case ExtensionObservationPoint.mapCheckedOperator:
    case ExtensionObservationPoint.mapCheckedIteration:
      return checkedOperationResponseSnapshot(
        observation,
        snapshotOperationMappingResult(response as CheckedOperationMappingResult, path),
      ) as ExtensionObservationResponse<TObservation>;
    case ExtensionObservationPoint.mapCheckedConversion: {
      const conversion = captureExactOwnFields(response as ExtensionObservationResponse<typeof ExtensionObservationPoint.mapCheckedConversion>, ["convertedType", "operation", "providerDeclaration"], "checked conversion mapping response", path);
      const convertedType = conversion.convertedType;
      const operation = conversion.operation;
      const providerDeclaration = conversion.providerDeclaration;
      return checkedOperationResponseSnapshot(observation, Object.freeze({
        ...(convertedType === undefined ? {} : {
          convertedType: snapshotTargetTypeRef(convertedType, childSnapshotPath(path, "convertedType")),
        }),
        ...(operation === undefined ? {} : {
          operation: snapshotTargetOperationProposal(operation, childSnapshotPath(path, "operation")),
        }),
        ...(providerDeclaration === undefined ? {} : {
          providerDeclaration: snapshotProviderDeclaration(providerDeclaration, childSnapshotPath(path, "providerDeclaration")),
        }),
      })) as ExtensionObservationResponse<TObservation>;
    }
  }
}

function checkedOperationResponseSnapshot<T extends object>(
  observation: CheckedOperationObservationPointName,
  snapshot: T,
): T {
  checkedOperationResponseSnapshots.set(snapshot, observation);
  return snapshot;
}

function snapshotOperationMappingResult(result: CheckedOperationMappingResult, path: SnapshotPath): CheckedOperationMappingResult {
  assertRecord(result, "CheckedOperationMappingResult", path);
  result = captureExactOwnFields(result, ["operation", "resultType", "providerDeclaration"], "CheckedOperationMappingResult", path);
  const operation = result.operation;
  const resultType = result.resultType;
  const providerDeclaration = result.providerDeclaration;
  return Object.freeze({
    operation: snapshotTargetOperationProposal(operation, childSnapshotPath(path, "operation")),
    ...(resultType === undefined ? {} : {
      resultType: snapshotTargetTypeRef(resultType, childSnapshotPath(path, "resultType")),
    }),
    ...(providerDeclaration === undefined ? {} : {
      providerDeclaration: snapshotProviderDeclaration(providerDeclaration, childSnapshotPath(path, "providerDeclaration")),
    }),
  });
}

function snapshotTargetSignatureSelection(
  selection: TargetSignatureSelection,
  path: SnapshotPath,
  cache?: CheckedOperationRequestSnapshotCacheAccess,
): TargetSignatureSelection {
  assertRecord(selection, "TargetSignatureSelection", path);
  selection = captureExactOwnFields(selection, ["member", "targetTypeArguments", "providerDeclaration"], "TargetSignatureSelection", path);
  const member = selection.member;
  const targetTypeArguments = selection.targetTypeArguments;
  const providerDeclaration = selection.providerDeclaration;
  const memberSnapshot = snapshotTargetMember(member, childSnapshotPath(path, "member"), cache);
  if (memberSnapshot.kind !== "method" && memberSnapshot.kind !== "constructor") {
    throw new Error(`Invalid selected target call member at '${formatSnapshotPath(childSnapshotPath(path, "member.kind"))}': '${memberSnapshot.kind}' is not callable.`);
  }
  const targetTypeParameterCount = memberSnapshot.typeParameters?.length ?? 0;
  const capturedTargetTypeArguments = targetTypeArguments === undefined
    ? []
    : captureArray(targetTypeArguments, "TargetSignatureSelection targetTypeArguments", childSnapshotPath(path, "targetTypeArguments"));
  if (capturedTargetTypeArguments.length !== targetTypeParameterCount) {
    throw new Error(`Invalid TargetSignatureSelection at '${formatSnapshotPath(path)}': selected target type argument count ${capturedTargetTypeArguments.length} does not match target member type parameter count ${targetTypeParameterCount}.`);
  }
  return Object.freeze({
    member: memberSnapshot,
    ...(targetTypeParameterCount === 0 ? {} : {
      targetTypeArguments: snapshotTargetTypeRefArray(capturedTargetTypeArguments, childSnapshotPath(path, "targetTypeArguments")),
    }),
    ...(providerDeclaration === undefined ? {} : {
      providerDeclaration: snapshotProviderDeclaration(providerDeclaration, childSnapshotPath(path, "providerDeclaration")),
    }),
  });
}

function snapshotSelectedTargetSignature(
  selection: SelectedTargetSignatureFact,
  path: SnapshotPath,
  cache: CheckedOperationRequestSnapshotCacheAccess,
): SelectedTargetSignatureFact {
  assertRecord(selection, "SelectedTargetSignatureFact", path);
  const sourceSelectionObject = selection;
  selection = captureExactOwnFields(selection, [
    "member",
    "targetTypeArguments",
    "providerDeclaration",
    "argumentConversions",
    "sourceCallKind",
    "sourceSelection",
    "sourceCallee",
    "sourceArguments",
    "sourceResult",
    "sourceReceiver",
    "sourceChainRole",
  ], "SelectedTargetSignatureFact", path);
  const cached = cache.selectedTargetSignatures.get(sourceSelectionObject);
  const targetSelection = snapshotTargetSignatureSelection({
    member: selection.member,
    ...(selection.targetTypeArguments === undefined ? {} : { targetTypeArguments: selection.targetTypeArguments }),
    ...(selection.providerDeclaration === undefined ? {} : { providerDeclaration: selection.providerDeclaration }),
  }, path, cache);
  const argumentConversions = snapshotArgumentConversionSlots(selection.argumentConversions, childSnapshotPath(path, "argumentConversions"), cache);
  const sourceCallKind = selection.sourceCallKind;
  const sourceSelection = selection.sourceSelection;
  const sourceCallee = selection.sourceCallee;
  const sourceArguments = selection.sourceArguments;
  const sourceResult = selection.sourceResult;
  const sourceReceiver = selection.sourceReceiver;
  assertCheckedCallKind(sourceCallKind, childSnapshotPath(path, "sourceCallKind"));
  const capturedSourceArguments = captureArray(sourceArguments, "SelectedTargetSignatureFact sourceArguments", childSnapshotPath(path, "sourceArguments"));
  const sourceSelectionSnapshot = snapshotSourceSelectedCallEvidence(
    sourceSelection,
    childSnapshotPath(path, "sourceSelection"),
    capturedSourceArguments.length,
  );
  const snapshot = Object.freeze({
    member: targetSelection.member,
    argumentConversions,
    ...(targetSelection.targetTypeArguments === undefined ? {} : { targetTypeArguments: targetSelection.targetTypeArguments }),
    ...(targetSelection.providerDeclaration === undefined ? {} : { providerDeclaration: targetSelection.providerDeclaration }),
    sourceCallKind,
    sourceSelection: sourceSelectionSnapshot,
    sourceCallee: snapshotSelectedSourceValueEvidence(sourceCallee, childSnapshotPath(path, "sourceCallee")),
    sourceArguments: Object.freeze(capturedSourceArguments.map((evidence, index) => snapshotSelectedSourceValueEvidence(
      evidence,
      indexedSnapshotPath(childSnapshotPath(path, "sourceArguments"), index),
    ))),
    sourceResult: snapshotSelectedSourceValueEvidence(sourceResult, childSnapshotPath(path, "sourceResult")),
    ...(sourceReceiver === undefined ? {} : {
      sourceReceiver: snapshotSelectedSourceValueEvidence(sourceReceiver, childSnapshotPath(path, "sourceReceiver")),
    }),
    sourceChainRole: snapshotSourceChainRole(selection.sourceChainRole, "call", childSnapshotPath(path, "sourceChainRole")),
  });
  if (cached !== undefined) {
    if (!selectedTargetSignatureEquals(cached, snapshot)) {
      throw new Error(`Invalid SelectedTargetSignatureFact at '${formatSnapshotPath(path)}': source object changed after its reusable snapshot was committed.`);
    }
    return cached;
  }
  cache.selectedTargetSignatures.set(sourceSelectionObject, snapshot);
  cache.selectedTargetSignatures.set(snapshot, snapshot);
  return snapshot;
}

function snapshotTargetMember(
  member: TargetMember,
  path: SnapshotPath,
  cache?: CheckedOperationRequestSnapshotCacheAccess,
): TargetMember {
  assertRecord(member, "TargetMember", path);
  member = captureExactOwnFields(member, ["id", "sourceName", "targetName", "kind", "static", "parameters", "returnType", "typeParameters", "overloadGroup", "providerDeclaration"], "TargetMember", path);
  const id = member.id;
  const sourceName = member.sourceName;
  const targetName = member.targetName;
  const kind = member.kind;
  const static_ = member.static;
  const parameters = member.parameters;
  const returnType = member.returnType;
  const typeParameters = member.typeParameters;
  const overloadGroup = member.overloadGroup;
  const providerDeclaration = member.providerDeclaration;
  assertString(id, "TargetMember id", childSnapshotPath(path, "id"));
  assertString(sourceName, "TargetMember sourceName", childSnapshotPath(path, "sourceName"));
  assertString(targetName, "TargetMember targetName", childSnapshotPath(path, "targetName"));
  assertTargetMemberKind(kind, childSnapshotPath(path, "kind"));
  if (static_ !== undefined) {
    assertBoolean(static_, "TargetMember static", childSnapshotPath(path, "static"));
  }
  const capturedParameters = captureArray(parameters, "TargetMember parameters", childSnapshotPath(path, "parameters"));
  if (overloadGroup !== undefined) {
    assertString(overloadGroup, "TargetMember overloadGroup", childSnapshotPath(path, "overloadGroup"));
  }
  const typeParameterSnapshots = typeParameters === undefined
    ? undefined
    : snapshotTargetTypeParameterArray(typeParameters, childSnapshotPath(path, "typeParameters"));
  if (typeParameterSnapshots !== undefined) {
    const seenNames = new Set<string>();
    for (const parameter of typeParameterSnapshots) {
      if (seenNames.has(parameter.name)) {
        throw new Error(`Invalid TargetMember at '${formatSnapshotPath(path)}': duplicate target type parameter '${parameter.name}'.`);
      }
      seenNames.add(parameter.name);
    }
  }
  return Object.freeze({
    id,
    sourceName,
    targetName,
    kind,
    ...(static_ === undefined ? {} : { static: static_ }),
    parameters: Object.freeze(capturedParameters.map((parameter, index) => snapshotTargetParameter(
      parameter,
      indexedSnapshotPath(childSnapshotPath(path, "parameters"), index),
      cache,
    ))),
    ...(returnType === undefined ? {} : {
      returnType: snapshotTargetTypeRef(returnType, childSnapshotPath(path, "returnType")),
    }),
    ...(typeParameterSnapshots === undefined ? {} : {
      typeParameters: typeParameterSnapshots,
    }),
    ...(overloadGroup === undefined ? {} : { overloadGroup }),
    ...(providerDeclaration === undefined ? {} : {
      providerDeclaration: snapshotProviderDeclaration(providerDeclaration, childSnapshotPath(path, "providerDeclaration")),
    }),
  });
}

function snapshotTargetParameter(
  parameter: TargetParameter,
  path: SnapshotPath,
  cache?: CheckedOperationRequestSnapshotCacheAccess,
): TargetParameter {
  assertRecord(parameter, "TargetParameter", path);
  const sourceParameterObject = parameter;
  parameter = captureExactOwnFields(parameter, ["name", "type", "passingMode", "optional", "paramsArray"], "TargetParameter", path);
  const cached = cache?.targetParameters.get(sourceParameterObject);
  const name = parameter.name;
  const type = parameter.type;
  const passingMode = parameter.passingMode;
  const optional = parameter.optional;
  const paramsArray = parameter.paramsArray;
  assertString(name, "TargetParameter name", childSnapshotPath(path, "name"));
  assertArgumentPassingMode(passingMode, childSnapshotPath(path, "passingMode"));
  if (optional !== undefined) {
    assertBoolean(optional, "TargetParameter optional", childSnapshotPath(path, "optional"));
  }
  if (paramsArray !== undefined) {
    assertBoolean(paramsArray, "TargetParameter paramsArray", childSnapshotPath(path, "paramsArray"));
  }
  const snapshot = Object.freeze({
    name,
    type: snapshotTargetTypeRef(type, childSnapshotPath(path, "type")),
    passingMode,
    ...(optional === undefined ? {} : { optional }),
    ...(paramsArray === undefined ? {} : { paramsArray }),
  });
  if (cached !== undefined) {
    if (!targetParameterEquals(cached, snapshot)) {
      throw new Error(`Invalid TargetParameter at '${formatSnapshotPath(path)}': source object changed after its reusable snapshot was committed.`);
    }
    return cached;
  }
  cache?.targetParameters.set(sourceParameterObject, snapshot);
  cache?.targetParameters.set(snapshot, snapshot);
  return snapshot;
}

function snapshotTargetTypeParameter(parameter: TargetTypeParameter, path: SnapshotPath): TargetTypeParameter {
  assertRecord(parameter, "TargetTypeParameter", path);
  parameter = captureExactOwnFields(parameter, ["name", "constraints", "variance"], "TargetTypeParameter", path);
  const name = parameter.name;
  const constraints = parameter.constraints;
  const variance = parameter.variance;
  assertString(name, "TargetTypeParameter name", childSnapshotPath(path, "name"));
  if (variance !== undefined) {
    assertTargetTypeParameterVariance(variance, childSnapshotPath(path, "variance"));
  }
  return Object.freeze({
    name,
    ...(constraints === undefined ? {} : {
      constraints: snapshotTargetConstraintArray(constraints, childSnapshotPath(path, "constraints")),
    }),
    ...(variance === undefined ? {} : { variance }),
  });
}

function snapshotTargetTypeParameterArray(
  parameters: readonly TargetTypeParameter[],
  path: SnapshotPath,
): readonly TargetTypeParameter[] {
  const captured = captureArray(parameters, "TargetTypeParameter array", path);
  return Object.freeze(captured.map((parameter, index) => snapshotTargetTypeParameter(
    parameter,
    indexedSnapshotPath(path, index),
  )));
}

function snapshotTargetConstraintArray(
  constraints: readonly TargetConstraint[],
  path: SnapshotPath,
): readonly TargetConstraint[] {
  const captured = captureArray(constraints, "TargetConstraint array", path);
  return Object.freeze(captured.map((constraint, index) => snapshotTargetConstraint(
    constraint,
    indexedSnapshotPath(path, index),
  )));
}

function snapshotTargetConstraint(constraint: TargetConstraint, path: SnapshotPath): TargetConstraint {
  assertRecord(constraint, "TargetConstraint", path);
  const actualKind = readDiscriminant(constraint, "TargetConstraint", path);
  switch (actualKind) {
    case "implements": {
      const implementsConstraint = captureExactOwnFields(constraint as Extract<TargetConstraint, { readonly kind: "implements" }>, ["kind", "contract", "typeArguments"], "implements TargetConstraint", path);
      const contract = implementsConstraint.contract;
      const typeArguments = implementsConstraint.typeArguments;
      assertString(contract, "TargetConstraint contract", childSnapshotPath(path, "contract"));
      return Object.freeze({
        kind: "implements",
        contract,
        ...(typeArguments === undefined ? {} : {
          typeArguments: snapshotTargetTypeRefArray(typeArguments, childSnapshotPath(path, "typeArguments")),
        }),
      });
    }
    case "lifetime": {
      const lifetime = captureExactOwnFields(constraint as Extract<TargetConstraint, { readonly kind: "lifetime" }>, ["kind", "name"], "lifetime TargetConstraint", path);
      const name = lifetime.name;
      assertString(name, "TargetConstraint lifetime name", childSnapshotPath(path, "name"));
      return Object.freeze({ kind: "lifetime", name });
    }
    case "target-specific": {
      const targetConstraint = captureExactOwnFields(constraint as Extract<TargetConstraint, { readonly kind: "target-specific" }>, ["kind", "target", "name", "payloadId"], "target-specific TargetConstraint", path);
      const target = targetConstraint.target;
      const name = targetConstraint.name;
      const payloadId = targetConstraint.payloadId;
      assertString(target, "TargetConstraint target", childSnapshotPath(path, "target"));
      assertString(name, "TargetConstraint name", childSnapshotPath(path, "name"));
      if (payloadId !== undefined) {
        assertString(payloadId, "TargetConstraint payloadId", childSnapshotPath(path, "payloadId"));
      }
      return Object.freeze({
        kind: "target-specific",
        target,
        name,
        ...(payloadId === undefined ? {} : { payloadId }),
      });
    }
    case "value-type":
    case "reference-type":
    case "constructible":
    case "unmanaged":
    case "copy":
    case "clone":
    case "default":
    case "sized":
      assertExactOwnFields(constraint, ["kind"], `${actualKind} TargetConstraint`, path);
      return Object.freeze({ kind: actualKind });
    default:
      throw unknownKindError("TargetConstraint", actualKind, path);
  }
}

function snapshotTargetTypeRefArray(types: readonly TargetTypeRef[], path: SnapshotPath): readonly TargetTypeRef[] {
  const captured = captureTargetTypeRefArray(types, path);
  return snapshotTargetTypeRefGraph(captured, path);
}

function snapshotTargetTypeRef(type: TargetTypeRef, path: SnapshotPath): TargetTypeRef {
  const snapshots = snapshotTargetTypeRefGraph([type], path, true);
  const snapshot = snapshots[0];
  if (snapshot === undefined) {
    throw new Error("TargetTypeRef snapshot traversal did not produce a root snapshot.");
  }
  return snapshot;
}

function snapshotTargetTypeRefGraph(
  roots: readonly TargetTypeRef[],
  path: SnapshotPath,
  rootPathIsValue = false,
): readonly TargetTypeRef[] {
  path = targetTypeRefSnapshotPath(path);
  const snapshots = path.budget.targetTypeRefSnapshots;
  const capturedTypes = new WeakMap<object, CapturedTargetTypeRef>();
  const activePaths = new WeakMap<object, SnapshotPath>();
  const stack: TargetTypeRefTraversalFrame[] = [];
  for (let index = roots.length - 1; index >= 0; index -= 1) {
    const root = roots[index];
    if (root !== undefined) {
      stack.push({
        stage: "enter",
        type: root,
        path: rootPathIsValue ? path : indexedSnapshotPath(path, index),
      });
    }
  }
  while (stack.length !== 0) {
    const frame = stack.pop();
    if (frame === undefined) {
      throw new Error("TargetTypeRef snapshot traversal lost its active frame.");
    }
    if (frame.stage === "exit") {
      const captured = capturedTypes.get(frame.type);
      if (captured === undefined) {
        throw new Error("TargetTypeRef snapshot traversal lost its captured value.");
      }
      const snapshot = captured.build(snapshots);
      snapshots.set(frame.type, snapshot);
      activePaths.delete(frame.type);
      continue;
    }
    assertRecord(frame.type, "TargetTypeRef", frame.path);
    if (snapshots.has(frame.type)) {
      continue;
    }
    const activePath = activePaths.get(frame.type);
    if (activePath !== undefined) {
      throw new Error(
        `Invalid TargetTypeRef at '${formatSnapshotPath(frame.path)}': cycle references the active TargetTypeRef at '${formatSnapshotPath(activePath)}'.`,
      );
    }
    const captured = captureTargetTypeRef(frame.type, frame.path);
    capturedTypes.set(frame.type, captured);
    activePaths.set(frame.type, frame.path);
    stack.push({ stage: "exit", type: frame.type, path: frame.path });
    for (let index = captured.children.length - 1; index >= 0; index -= 1) {
      const child = captured.children[index];
      if (child !== undefined) {
        stack.push({ stage: "enter", type: child.type, path: child.path });
      }
    }
  }
  const result: TargetTypeRef[] = [];
  for (let index = 0; index < roots.length; index += 1) {
    const root = roots[index];
    const snapshot = root === undefined ? undefined : snapshots.get(root);
    if (snapshot === undefined) {
      throw new Error(`TargetTypeRef snapshot traversal did not produce root ${index}.`);
    }
    result.push(snapshot);
  }
  return Object.freeze(result);
}

function captureTargetTypeRef(type: TargetTypeRef, path: SnapshotPath): CapturedTargetTypeRef {
  const actualKind = readDiscriminant(type, "TargetTypeRef", path);
  switch (actualKind) {
    case "source-primitive": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "source-primitive" }>, ["kind", "name"], "source-primitive TargetTypeRef", path);
      const name = source.name;
      assertSourcePrimitiveKind(name, childSnapshotPath(path, "name"));
      return { children: [], build: () => Object.freeze({ kind: "source-primitive", name }) };
    }
    case "source-global": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "source-global" }>, ["kind", "name", "typeArguments"], "source-global TargetTypeRef", path);
      const name = source.name;
      const typeArguments = captureOptionalTargetTypeRefArray(source.typeArguments, childSnapshotPath(path, "typeArguments"));
      assertString(name, "TargetTypeRef source global name", childSnapshotPath(path, "name"));
      return {
        children: targetTypeRefChildren(typeArguments, childSnapshotPath(path, "typeArguments")),
        build: (snapshots) => Object.freeze({
          kind: "source-global",
          name,
          ...(typeArguments === undefined ? {} : {
            typeArguments: getTargetTypeRefSnapshotArray(typeArguments, childSnapshotPath(path, "typeArguments"), snapshots),
          }),
        }),
      };
    }
    case "target-named": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "target-named" }>, ["kind", "id", "typeArguments"], "target-named TargetTypeRef", path);
      const id = source.id;
      const typeArguments = captureOptionalTargetTypeRefArray(source.typeArguments, childSnapshotPath(path, "typeArguments"));
      assertString(id, "TargetTypeRef target id", childSnapshotPath(path, "id"));
      return {
        children: targetTypeRefChildren(typeArguments, childSnapshotPath(path, "typeArguments")),
        build: (snapshots) => Object.freeze({
          kind: "target-named",
          id,
          ...(typeArguments === undefined ? {} : {
            typeArguments: getTargetTypeRefSnapshotArray(typeArguments, childSnapshotPath(path, "typeArguments"), snapshots),
          }),
        }),
      };
    }
    case "type-parameter": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "type-parameter" }>, ["kind", "name"], "type-parameter TargetTypeRef", path);
      const name = source.name;
      assertString(name, "TargetTypeRef type parameter name", childSnapshotPath(path, "name"));
      return { children: [], build: () => Object.freeze({ kind: "type-parameter", name }) };
    }
    case "array": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "array" }>, ["kind", "element", "rank"], "array TargetTypeRef", path);
      const element = source.element;
      const rank = source.rank;
      if (rank !== undefined) {
        assertPositiveInteger(rank, "TargetTypeRef array rank", childSnapshotPath(path, "rank"));
      }
      return {
        children: [{ type: element, path: childSnapshotPath(path, "element") }],
        build: (snapshots) => Object.freeze({
          kind: "array",
          element: getTargetTypeRefSnapshot(element, childSnapshotPath(path, "element"), snapshots),
          ...(rank === undefined ? {} : { rank }),
        }),
      };
    }
    case "tuple": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "tuple" }>, ["kind", "elements"], "tuple TargetTypeRef", path);
      const elements = captureTargetTypeRefArray(source.elements, childSnapshotPath(path, "elements"));
      return {
        children: targetTypeRefChildren(elements, childSnapshotPath(path, "elements")),
        build: (snapshots) => Object.freeze({
          kind: "tuple",
          elements: getTargetTypeRefSnapshotArray(elements, childSnapshotPath(path, "elements"), snapshots),
        }),
      };
    }
    case "pointer": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "pointer" }>, ["kind", "pointee", "mutability"], "pointer TargetTypeRef", path);
      const pointee = source.pointee;
      const mutability = source.mutability;
      if (mutability !== undefined) {
        assertPointerMutability(mutability, childSnapshotPath(path, "mutability"));
      }
      return {
        children: [{ type: pointee, path: childSnapshotPath(path, "pointee") }],
        build: (snapshots) => Object.freeze({
          kind: "pointer",
          pointee: getTargetTypeRefSnapshot(pointee, childSnapshotPath(path, "pointee"), snapshots),
          ...(mutability === undefined ? {} : { mutability }),
        }),
      };
    }
    case "function-pointer": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "function-pointer" }>, ["kind", "args", "result", "abi"], "function-pointer TargetTypeRef", path);
      const args = captureTargetTypeRefArray(source.args, childSnapshotPath(path, "args"));
      const result = source.result;
      const sourceAbi = source.abi;
      const abi = sourceAbi === undefined
        ? undefined
        : captureStringArray(sourceAbi, "TargetTypeRef function-pointer ABI", childSnapshotPath(path, "abi"));
      return {
        children: [
          ...targetTypeRefChildren(args, childSnapshotPath(path, "args")),
          { type: result, path: childSnapshotPath(path, "result") },
        ],
        build: (snapshots) => Object.freeze({
          kind: "function-pointer",
          args: getTargetTypeRefSnapshotArray(args, childSnapshotPath(path, "args"), snapshots),
          result: getTargetTypeRefSnapshot(result, childSnapshotPath(path, "result"), snapshots),
          ...(abi === undefined ? {} : { abi }),
        }),
      };
    }
    case "opaque": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "opaque" }>, ["kind", "id"], "opaque TargetTypeRef", path);
      const id = source.id;
      assertString(id, "TargetTypeRef opaque id", childSnapshotPath(path, "id"));
      return { children: [], build: () => Object.freeze({ kind: "opaque", id }) };
    }
    case "associated-type": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "associated-type" }>, ["kind", "owner", "name"], "associated-type TargetTypeRef", path);
      const owner = source.owner;
      const name = source.name;
      assertString(name, "TargetTypeRef associated type name", childSnapshotPath(path, "name"));
      return {
        children: [{ type: owner, path: childSnapshotPath(path, "owner") }],
        build: (snapshots) => Object.freeze({
          kind: "associated-type",
          owner: getTargetTypeRefSnapshot(owner, childSnapshotPath(path, "owner"), snapshots),
          name,
        }),
      };
    }
    case "lifetime": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "lifetime" }>, ["kind", "name"], "lifetime TargetTypeRef", path);
      const name = source.name;
      assertString(name, "TargetTypeRef lifetime name", childSnapshotPath(path, "name"));
      return { children: [], build: () => Object.freeze({ kind: "lifetime", name }) };
    }
    case "target-specific": {
      const source = captureExactOwnFields(type as Extract<TargetTypeRef, { readonly kind: "target-specific" }>, ["kind", "target", "name", "payloadId"], "target-specific TargetTypeRef", path);
      const target = source.target;
      const name = source.name;
      const payloadId = source.payloadId;
      assertString(target, "TargetTypeRef target", childSnapshotPath(path, "target"));
      assertString(name, "TargetTypeRef name", childSnapshotPath(path, "name"));
      if (payloadId !== undefined) {
        assertString(payloadId, "TargetTypeRef payloadId", childSnapshotPath(path, "payloadId"));
      }
      return {
        children: [],
        build: () => Object.freeze({
          kind: "target-specific",
          target,
          name,
          ...(payloadId === undefined ? {} : { payloadId }),
        }),
      };
    }
    default:
      throw unknownKindError("TargetTypeRef", actualKind, path);
  }
}

function captureOptionalTargetTypeRefArray(
  types: readonly TargetTypeRef[] | undefined,
  path: SnapshotPath,
): readonly TargetTypeRef[] | undefined {
  return types === undefined ? undefined : captureTargetTypeRefArray(types, path);
}

function captureTargetTypeRefArray(types: readonly TargetTypeRef[], path: SnapshotPath): readonly TargetTypeRef[] {
  return captureArray(types, "TargetTypeRef array", path);
}

function targetTypeRefChildren(types: readonly TargetTypeRef[] | undefined, path: SnapshotPath): readonly TargetTypeRefChild[] {
  if (types === undefined) {
    return [];
  }
  const children: TargetTypeRefChild[] = [];
  for (let index = 0; index < types.length; index += 1) {
    children.push({ type: types[index]!, path: indexedSnapshotPath(path, index) });
  }
  return children;
}

function getTargetTypeRefSnapshotArray(
  types: readonly TargetTypeRef[],
  path: SnapshotPath,
  snapshots: WeakMap<object, TargetTypeRef>,
): readonly TargetTypeRef[] {
  const result: TargetTypeRef[] = [];
  for (let index = 0; index < types.length; index += 1) {
    result.push(getTargetTypeRefSnapshot(types[index]!, indexedSnapshotPath(path, index), snapshots));
  }
  return Object.freeze(result);
}

function getTargetTypeRefSnapshot(
  type: TargetTypeRef,
  path: SnapshotPath,
  snapshots: WeakMap<object, TargetTypeRef>,
): TargetTypeRef {
  assertRecord(type, "TargetTypeRef", path);
  const snapshot = snapshots.get(type);
  if (snapshot === undefined) {
    throw new Error(`TargetTypeRef snapshot at '${formatSnapshotPath(path)}' was not completed before its parent.`);
  }
  return snapshot;
}

export function snapshotTargetOperationFact(operation: TargetOperationFact): TargetOperationFact {
  return snapshotTargetOperation(operation, createSnapshotPath("target operation fact"));
}

export function snapshotSelectedTargetSignatureFact(
  selection: SelectedTargetSignatureFact,
  cache: CheckedOperationRequestSnapshotCache = createCheckedOperationRequestSnapshotCache(),
): SelectedTargetSignatureFact {
  const path = createSnapshotPath("selected target signature fact");
  const cacheTransaction = createCheckedOperationRequestSnapshotCacheTransaction(cache, path);
  const snapshot = snapshotSelectedTargetSignature(
    selection,
    path,
    cacheTransaction.access,
  );
  cacheTransaction.commit();
  return snapshot;
}

export function snapshotCanonicalIdentityFact(value: ExtensionCanonicalIdentity): ExtensionCanonicalIdentity {
  const path = createSnapshotPath("canonical identity fact");
  assertRecord(value, "ExtensionCanonicalIdentity", path);
  value = captureExactOwnFields(value, [
    "kind",
    "id",
    "packageName",
    "packageVersion",
    "subpath",
    "exportName",
    "importKind",
    "canonicalSymbolId",
  ], "ExtensionCanonicalIdentity", path);
  assertCanonicalIdentityKind(value.kind, childSnapshotPath(path, "kind"));
  assertString(value.id, "ExtensionCanonicalIdentity id", childSnapshotPath(path, "id"));
  assertOptionalString(value.packageName, "ExtensionCanonicalIdentity packageName", childSnapshotPath(path, "packageName"));
  assertOptionalString(value.packageVersion, "ExtensionCanonicalIdentity packageVersion", childSnapshotPath(path, "packageVersion"));
  assertOptionalString(value.subpath, "ExtensionCanonicalIdentity subpath", childSnapshotPath(path, "subpath"));
  assertOptionalString(value.exportName, "ExtensionCanonicalIdentity exportName", childSnapshotPath(path, "exportName"));
  if (value.importKind !== undefined) {
    assertExtensionImportKind(value.importKind, childSnapshotPath(path, "importKind"));
  }
  assertOptionalString(value.canonicalSymbolId, "ExtensionCanonicalIdentity canonicalSymbolId", childSnapshotPath(path, "canonicalSymbolId"));
  return Object.freeze({
    kind: value.kind,
    id: value.id,
    ...(value.packageName === undefined ? {} : { packageName: value.packageName }),
    ...(value.packageVersion === undefined ? {} : { packageVersion: value.packageVersion }),
    ...(value.subpath === undefined ? {} : { subpath: value.subpath }),
    ...(value.exportName === undefined ? {} : { exportName: value.exportName }),
    ...(value.importKind === undefined ? {} : { importKind: value.importKind }),
    ...(value.canonicalSymbolId === undefined ? {} : { canonicalSymbolId: value.canonicalSymbolId }),
  });
}

export function snapshotSourcePrimitiveFact(value: SourcePrimitiveFact): SourcePrimitiveFact {
  const path = createSnapshotPath("source primitive fact");
  assertRecord(value, "SourcePrimitiveFact", path);
  value = captureExactOwnFields(value, ["kind", "signed", "width", "runtimeBase"], "SourcePrimitiveFact", path);
  assertSourcePrimitiveKind(value.kind, childSnapshotPath(path, "kind"));
  if (value.signed !== undefined) {
    assertBoolean(value.signed, "SourcePrimitiveFact signed", childSnapshotPath(path, "signed"));
  }
  if (value.width !== undefined) {
    assertPositiveInteger(value.width, "SourcePrimitiveFact width", childSnapshotPath(path, "width"));
  }
  assertSourcePrimitiveRuntimeBase(value.runtimeBase, childSnapshotPath(path, "runtimeBase"));
  return Object.freeze({
    kind: value.kind,
    ...(value.signed === undefined ? {} : { signed: value.signed }),
    ...(value.width === undefined ? {} : { width: value.width }),
    runtimeBase: value.runtimeBase,
  });
}

export function snapshotArgumentPassingFact(value: ArgumentPassingFact): ArgumentPassingFact {
  const path = createSnapshotPath("argument passing fact");
  assertRecord(value, "ArgumentPassingFact", path);
  value = captureExactOwnFields(value, ["mode", "targetExpression"], "ArgumentPassingFact", path);
  assertArgumentPassingMode(value.mode, childSnapshotPath(path, "mode"));
  if (value.targetExpression !== undefined) {
    assertOpaqueIdentitySubject(value.targetExpression, "ArgumentPassingFact targetExpression", childSnapshotPath(path, "targetExpression"));
  }
  return Object.freeze({
    mode: value.mode,
    ...(value.targetExpression === undefined ? {} : { targetExpression: value.targetExpression }),
  });
}

export function snapshotFunctionPointerFact(value: FunctionPointerFact): FunctionPointerFact {
  const path = createSnapshotPath("function pointer fact");
  assertRecord(value, "FunctionPointerFact", path);
  value = captureExactOwnFields(value, ["parameters", "result", "abi"], "FunctionPointerFact", path);
  const parameters = captureOpaqueIdentitySubjectArray(value.parameters, "FunctionPointerFact parameters", childSnapshotPath(path, "parameters"));
  assertOpaqueIdentitySubject(value.result, "FunctionPointerFact result", childSnapshotPath(path, "result"));
  const abi = captureStringArray(value.abi, "FunctionPointerFact abi", childSnapshotPath(path, "abi"));
  return Object.freeze({ parameters: Object.freeze([...parameters]), result: value.result, abi: Object.freeze([...abi]) });
}

export function snapshotPointerFact(value: PointerFact): PointerFact {
  const path = createSnapshotPath("pointer fact");
  assertRecord(value, "PointerFact", path);
  value = captureExactOwnFields(value, ["pointee", "mutability", "unsafeRequired"], "PointerFact", path);
  assertOpaqueIdentitySubject(value.pointee, "PointerFact pointee", childSnapshotPath(path, "pointee"));
  assertSourcePointerMutability(value.mutability, childSnapshotPath(path, "mutability"));
  assertBoolean(value.unsafeRequired, "PointerFact unsafeRequired", childSnapshotPath(path, "unsafeRequired"));
  return Object.freeze({ pointee: value.pointee, mutability: value.mutability, unsafeRequired: value.unsafeRequired });
}

export function snapshotStructFact(value: StructFact): StructFact {
  const path = createSnapshotPath("struct fact");
  assertRecord(value, "StructFact", path);
  value = captureExactOwnFields(value, ["valueType", "fields"], "StructFact", path);
  assertBoolean(value.valueType, "StructFact valueType", childSnapshotPath(path, "valueType"));
  return Object.freeze({
    valueType: value.valueType,
    ...(value.fields === undefined ? {} : {
      fields: snapshotFieldFactArray(value.fields, childSnapshotPath(path, "fields")),
    }),
  });
}

export function snapshotFieldFactValue(value: FieldFact): FieldFact {
  return snapshotFieldFact(value, createSnapshotPath("field fact"));
}

export function snapshotAttributeFact(value: AttributeFact): AttributeFact {
  const path = createSnapshotPath("attribute fact");
  assertRecord(value, "AttributeFact", path);
  value = captureExactOwnFields(value, ["target", "attributeName", "arguments"], "AttributeFact", path);
  assertOpaqueIdentitySubject(value.target, "AttributeFact target", childSnapshotPath(path, "target"));
  assertString(value.attributeName, "AttributeFact attributeName", childSnapshotPath(path, "attributeName"));
  const arguments_ = value.arguments === undefined
    ? undefined
    : captureOpaqueIdentitySubjectArray(value.arguments, "AttributeFact arguments", childSnapshotPath(path, "arguments"));
  return Object.freeze({
    target: value.target,
    attributeName: value.attributeName,
    ...(arguments_ === undefined ? {} : { arguments: Object.freeze([...arguments_]) }),
  });
}

export function snapshotDefaultValueFact(value: DefaultValueFact): DefaultValueFact {
  const path = createSnapshotPath("default value fact");
  assertRecord(value, "DefaultValueFact", path);
  value = captureExactOwnFields(value, ["type"], "DefaultValueFact", path);
  assertOpaqueIdentitySubject(value.type, "DefaultValueFact type", childSnapshotPath(path, "type"));
  return Object.freeze({ type: value.type });
}

export function snapshotTargetBindingFact(value: TargetBindingFact): TargetBindingFact {
  return snapshotTargetBindingFactAtPath(value, createSnapshotPath("target binding fact"));
}

function snapshotTargetBindingFactAtPath(value: TargetBindingFact, path: SnapshotPath): TargetBindingFact {
  assertRecord(value, "TargetBindingFact", path);
  value = captureExactOwnFields(value, [
    "id",
    "sourceName",
    "targetName",
    "target",
    "kind",
    "typeParameters",
    "members",
    "implementedContracts",
  ], "TargetBindingFact", path);
  assertString(value.id, "TargetBindingFact id", childSnapshotPath(path, "id"));
  assertString(value.sourceName, "TargetBindingFact sourceName", childSnapshotPath(path, "sourceName"));
  assertString(value.targetName, "TargetBindingFact targetName", childSnapshotPath(path, "targetName"));
  assertString(value.target, "TargetBindingFact target", childSnapshotPath(path, "target"));
  assertTargetBindingKind(value.kind, childSnapshotPath(path, "kind"));
  return Object.freeze({
    id: value.id,
    sourceName: value.sourceName,
    targetName: value.targetName,
    target: value.target,
    kind: value.kind,
    ...(value.typeParameters === undefined ? {} : {
      typeParameters: snapshotTargetTypeParameterArray(value.typeParameters, childSnapshotPath(path, "typeParameters")),
    }),
    ...(value.members === undefined ? {} : {
      members: snapshotTargetMemberArray(value.members, childSnapshotPath(path, "members")),
    }),
    ...(value.implementedContracts === undefined ? {} : {
      implementedContracts: snapshotTargetConstraintArray(value.implementedContracts, childSnapshotPath(path, "implementedContracts")),
    }),
  });
}

export function snapshotInstantiatedTargetTypeFact(value: InstantiatedTargetTypeFact): InstantiatedTargetTypeFact {
  const path = createSnapshotPath("instantiated target type fact");
  assertRecord(value, "InstantiatedTargetTypeFact", path);
  value = captureExactOwnFields(value, ["targetType", "typeArguments", "resolvedTypeArguments"], "InstantiatedTargetTypeFact", path);
  const typeArguments = captureOpaqueIdentitySubjectArray(value.typeArguments, "InstantiatedTargetTypeFact typeArguments", childSnapshotPath(path, "typeArguments"));
  if (value.resolvedTypeArguments !== undefined && value.resolvedTypeArguments.length !== typeArguments.length) {
    throw new Error(`Invalid InstantiatedTargetTypeFact at '${formatSnapshotPath(path)}': resolved target type argument count must equal source type argument count.`);
  }
  return Object.freeze({
    targetType: snapshotTargetBindingFactAtPath(value.targetType, childSnapshotPath(path, "targetType")),
    typeArguments: Object.freeze([...typeArguments]),
    ...(value.resolvedTypeArguments === undefined ? {} : {
      resolvedTypeArguments: snapshotTargetTypeRefArray(value.resolvedTypeArguments, childSnapshotPath(path, "resolvedTypeArguments")),
    }),
  });
}

export function snapshotContextualTargetTypeFact(value: ContextualTargetTypeFact): ContextualTargetTypeFact {
  const path = createSnapshotPath("contextual target type fact");
  assertRecord(value, "ContextualTargetTypeFact", path);
  value = captureExactOwnFields(value, ["type", "targetType"], "ContextualTargetTypeFact", path);
  assertOpaqueIdentitySubject(value.type, "ContextualTargetTypeFact type", childSnapshotPath(path, "type"));
  return Object.freeze({
    type: value.type,
    ...(value.targetType === undefined ? {} : {
      targetType: snapshotTargetTypeRef(value.targetType, childSnapshotPath(path, "targetType")),
    }),
  });
}

export function snapshotFlowStateFact(value: FlowStateFact): FlowStateFact {
  const path = createSnapshotPath("flow state fact");
  assertRecord(value, "FlowStateFact", path);
  value = captureExactOwnFields(value, ["state", "targetCompiler", "evidence"], "FlowStateFact", path);
  assertFlowState(value.state, childSnapshotPath(path, "state"));
  assertOptionalString(value.targetCompiler, "FlowStateFact targetCompiler", childSnapshotPath(path, "targetCompiler"));
  return Object.freeze({
    state: value.state,
    ...(value.targetCompiler === undefined ? {} : { targetCompiler: value.targetCompiler }),
    ...(value.evidence === undefined ? {} : {
      evidence: snapshotEvidenceArray(value.evidence, childSnapshotPath(path, "evidence")),
    }),
  });
}

export function snapshotRuntimeCarrierFact(value: RuntimeCarrierFact): RuntimeCarrierFact {
  const path = createSnapshotPath("runtime carrier fact");
  assertRecord(value, "RuntimeCarrierFact", path);
  value = captureExactOwnFields(value, ["carrier", "requiresAllocation", "provenance"], "RuntimeCarrierFact", path);
  if (value.requiresAllocation !== undefined) {
    assertBoolean(value.requiresAllocation, "RuntimeCarrierFact requiresAllocation", childSnapshotPath(path, "requiresAllocation"));
  }
  return Object.freeze({
    carrier: snapshotTargetTypeRef(value.carrier, childSnapshotPath(path, "carrier")),
    ...(value.requiresAllocation === undefined ? {} : { requiresAllocation: value.requiresAllocation }),
    ...(value.provenance === undefined ? {} : {
      provenance: snapshotRuntimeCarrierProvenance(value.provenance, childSnapshotPath(path, "provenance")),
    }),
  });
}

export function snapshotTargetConversionFact(value: TargetConversionFact): TargetConversionFact {
  return snapshotTargetConversionFactAtPath(value, createSnapshotPath("target conversion fact"));
}

export function snapshotTargetCallArgumentConversionFact(value: TargetCallArgumentConversionFact): TargetCallArgumentConversionFact {
  const path = createSnapshotPath("target call argument conversion fact");
  assertRecord(value, "TargetCallArgumentConversionFact", path);
  value = captureExactOwnFields(value, ["slot", "call", "sourceBinding", "convertedType", "operation"], "TargetCallArgumentConversionFact", path);
  assertOpaqueIdentitySubject(value.call, "TargetCallArgumentConversionFact call", childSnapshotPath(path, "call"));
  const slot = snapshotSingleArgumentConversionSlot(value.slot, childSnapshotPath(path, "slot"));
  const sourceBinding = snapshotSelectedCallArgumentBinding(value.sourceBinding, childSnapshotPath(path, "sourceBinding"));
  assertConversionSlotMatchesSourceBinding(slot, sourceBinding, path);
  return Object.freeze({
    slot,
    call: value.call,
    sourceBinding,
    ...snapshotTargetConversionFactFields(value, path),
  });
}

export function snapshotTargetCallArgumentPassingFact(value: TargetCallArgumentPassingFact): TargetCallArgumentPassingFact {
  const path = createSnapshotPath("target call argument passing fact");
  assertRecord(value, "TargetCallArgumentPassingFact", path);
  value = captureExactOwnFields(value, [
    "mode",
    "targetExpression",
    "slot",
    "call",
    "sourceBinding",
    "targetParameter",
    "selectedSignature",
  ], "TargetCallArgumentPassingFact", path);
  assertArgumentPassingMode(value.mode, childSnapshotPath(path, "mode"));
  if (value.targetExpression !== undefined) {
    assertOpaqueIdentitySubject(value.targetExpression, "TargetCallArgumentPassingFact targetExpression", childSnapshotPath(path, "targetExpression"));
  }
  assertOpaqueIdentitySubject(value.call, "TargetCallArgumentPassingFact call", childSnapshotPath(path, "call"));
  const slot = snapshotSingleArgumentConversionSlot(value.slot, childSnapshotPath(path, "slot"));
  const sourceBinding = snapshotSelectedCallArgumentBinding(value.sourceBinding, childSnapshotPath(path, "sourceBinding"));
  assertConversionSlotMatchesSourceBinding(slot, sourceBinding, path);
  return Object.freeze({
    mode: value.mode,
    ...(value.targetExpression === undefined ? {} : { targetExpression: value.targetExpression }),
    slot,
    call: value.call,
    sourceBinding,
    targetParameter: snapshotTargetParameter(value.targetParameter, childSnapshotPath(path, "targetParameter")),
    ...(value.selectedSignature === undefined ? {} : {
      selectedSignature: snapshotProviderDeclaration(value.selectedSignature, childSnapshotPath(path, "selectedSignature")),
    }),
  });
}

export function snapshotProviderVirtualDeclarationFact(value: ProviderVirtualDeclarationFact): ProviderVirtualDeclarationFact {
  return snapshotProviderVirtualDeclarationFactAtPath(value, createSnapshotPath("provider virtual declaration fact"));
}

export function snapshotProviderTypeFamilyFact(value: ProviderTypeFamilyFact): ProviderTypeFamilyFact {
  const path = createSnapshotPath("provider type family fact");
  assertRecord(value, "ProviderTypeFamilyFact", path);
  value = captureExactOwnFields(value, ["exportName", "variants"], "ProviderTypeFamilyFact", path);
  assertString(value.exportName, "ProviderTypeFamilyFact exportName", childSnapshotPath(path, "exportName"));
  const variants = captureArray(value.variants, "ProviderTypeFamilyVariantFact array", childSnapshotPath(path, "variants"));
  if (variants.length === 0) {
    throw new Error(`Invalid ProviderTypeFamilyFact at '${formatSnapshotPath(path)}': variants must not be empty.`);
  }
  const seenArities = new Set<number>();
  const snapshots = variants.map((variant, index) => {
    const snapshot = snapshotProviderTypeFamilyVariantFact(variant, indexedSnapshotPath(childSnapshotPath(path, "variants"), index));
    if (seenArities.has(snapshot.sourceTypeArgumentCount)) {
      throw new Error(`Invalid ProviderTypeFamilyFact at '${formatSnapshotPath(path)}': duplicate source type argument count ${snapshot.sourceTypeArgumentCount}.`);
    }
    seenArities.add(snapshot.sourceTypeArgumentCount);
    return snapshot;
  });
  snapshots.sort((left, right) => left.sourceTypeArgumentCount - right.sourceTypeArgumentCount);
  return Object.freeze({ exportName: value.exportName, variants: Object.freeze(snapshots) });
}

export function snapshotAssociatedTypeFact(value: AssociatedTypeFact): AssociatedTypeFact {
  const path = createSnapshotPath("associated type fact");
  assertRecord(value, "AssociatedTypeFact", path);
  value = captureExactOwnFields(value, ["owner", "name", "value"], "AssociatedTypeFact", path);
  assertOpaqueIdentitySubject(value.owner, "AssociatedTypeFact owner", childSnapshotPath(path, "owner"));
  assertString(value.name, "AssociatedTypeFact name", childSnapshotPath(path, "name"));
  assertOpaqueIdentitySubject(value.value, "AssociatedTypeFact value", childSnapshotPath(path, "value"));
  return Object.freeze({ owner: value.owner, name: value.name, value: value.value });
}

export function snapshotConstGenericFact(value: ConstGenericFact): ConstGenericFact {
  const path = createSnapshotPath("const generic fact");
  assertRecord(value, "ConstGenericFact", path);
  value = captureExactOwnFields(value, ["name", "value"], "ConstGenericFact", path);
  assertString(value.name, "ConstGenericFact name", childSnapshotPath(path, "name"));
  if (typeof value.value !== "string"
    && typeof value.value !== "number"
    && typeof value.value !== "bigint"
    && typeof value.value !== "boolean") {
    throw new Error(`Invalid ConstGenericFact at '${formatSnapshotPath(childSnapshotPath(path, "value"))}': expected string, number, bigint, or boolean.`);
  }
  if (typeof value.value === "number" && !Number.isFinite(value.value)) {
    throw new Error(`Invalid ConstGenericFact at '${formatSnapshotPath(childSnapshotPath(path, "value"))}': numeric constants must be finite.`);
  }
  return Object.freeze({ name: value.name, value: value.value });
}

function snapshotFieldFact(value: FieldFact, path: SnapshotPath): FieldFact {
  assertRecord(value, "FieldFact", path);
  value = captureExactOwnFields(value, ["name", "type", "readonly"], "FieldFact", path);
  assertString(value.name, "FieldFact name", childSnapshotPath(path, "name"));
  assertOpaqueIdentitySubject(value.type, "FieldFact type", childSnapshotPath(path, "type"));
  if (value.readonly !== undefined) {
    assertBoolean(value.readonly, "FieldFact readonly", childSnapshotPath(path, "readonly"));
  }
  return Object.freeze({
    name: value.name,
    type: value.type,
    ...(value.readonly === undefined ? {} : { readonly: value.readonly }),
  });
}

function snapshotFieldFactArray(values: readonly FieldFact[], path: SnapshotPath): readonly FieldFact[] {
  const captured = captureArray(values, "FieldFact array", path);
  return Object.freeze(captured.map((value, index) => snapshotFieldFact(value, indexedSnapshotPath(path, index))));
}

function snapshotTargetMemberArray(values: readonly TargetMember[], path: SnapshotPath): readonly TargetMember[] {
  const captured = captureArray(values, "TargetMember array", path);
  return Object.freeze(captured.map((value, index) => snapshotTargetMember(value, indexedSnapshotPath(path, index))));
}

function snapshotRuntimeCarrierProvenance(value: RuntimeCarrierProvenance, path: SnapshotPath): RuntimeCarrierProvenance {
  assertRecord(value, "RuntimeCarrierProvenance", path);
  value = captureExactOwnFields(value, [
    "sourceType",
    "sourceTypeReference",
    "sourceSymbol",
    "providerDeclaration",
  ], "RuntimeCarrierProvenance", path);
  for (const [field, subject] of [
    ["sourceType", value.sourceType],
    ["sourceTypeReference", value.sourceTypeReference],
    ["sourceSymbol", value.sourceSymbol],
  ] as const) {
    if (subject !== undefined) {
      assertOpaqueIdentitySubject(subject, `RuntimeCarrierProvenance ${field}`, childSnapshotPath(path, field));
    }
  }
  return Object.freeze({
    ...(value.sourceType === undefined ? {} : { sourceType: value.sourceType }),
    ...(value.sourceTypeReference === undefined ? {} : { sourceTypeReference: value.sourceTypeReference }),
    ...(value.sourceSymbol === undefined ? {} : { sourceSymbol: value.sourceSymbol }),
    ...(value.providerDeclaration === undefined ? {} : {
      providerDeclaration: snapshotProviderDeclaration(value.providerDeclaration, childSnapshotPath(path, "providerDeclaration")),
    }),
  });
}

function snapshotTargetConversionFactAtPath(value: TargetConversionFact, path: SnapshotPath): TargetConversionFact {
  assertRecord(value, "TargetConversionFact", path);
  value = captureExactOwnFields(value, ["convertedType", "operation"], "TargetConversionFact", path);
  return Object.freeze(snapshotTargetConversionFactFields(value, path));
}

function snapshotTargetConversionFactFields(
  value: TargetConversionFact,
  path: SnapshotPath,
): Pick<TargetConversionFact, "convertedType" | "operation"> {
  return {
    ...(value.convertedType === undefined ? {} : {
      convertedType: snapshotTargetTypeRef(value.convertedType, childSnapshotPath(path, "convertedType")),
    }),
    ...(value.operation === undefined ? {} : {
      operation: snapshotTargetOperation(value.operation, childSnapshotPath(path, "operation")),
    }),
  };
}

function snapshotSingleArgumentConversionSlot(
  value: TargetCallArgumentConversionSlot,
  path: SnapshotPath,
): TargetCallArgumentConversionSlot {
  const snapshot = snapshotArgumentConversionSlots([value], path)[0];
  if (snapshot === undefined) {
    throw new Error(`TargetCallArgumentConversionSlot snapshot at '${formatSnapshotPath(path)}' was not produced.`);
  }
  return snapshot;
}

export function snapshotTargetCallArgumentConversionSlot(
  value: TargetCallArgumentConversionSlot,
): TargetCallArgumentConversionSlot {
  return snapshotSingleArgumentConversionSlot(
    value,
    createSnapshotPath("TargetCallArgumentConversionSlot"),
  );
}

function assertConversionSlotMatchesSourceBinding(
  slot: TargetCallArgumentConversionSlot,
  binding: SourceSelectedCallArgumentBinding,
  path: SnapshotPath,
): void {
  if (slot.sourceArgumentIndex !== binding.sourceArgumentIndex
    || slot.sourceForm !== binding.sourceForm
    || slot.spreadElementIndex !== binding.spreadElementIndex) {
    throw new Error(`Invalid call argument fact at '${formatSnapshotPath(path)}': target slot and selected source binding identify different authored arguments.`);
  }
}

function snapshotProviderTypeFamilyVariantFact(
  value: ProviderTypeFamilyVariantFact,
  path: SnapshotPath,
): ProviderTypeFamilyVariantFact {
  assertRecord(value, "ProviderTypeFamilyVariantFact", path);
  value = captureExactOwnFields(value, ["sourceTypeArgumentCount", "declaration", "targetBinding"], "ProviderTypeFamilyVariantFact", path);
  assertNonNegativeInteger(value.sourceTypeArgumentCount, "ProviderTypeFamilyVariantFact sourceTypeArgumentCount", childSnapshotPath(path, "sourceTypeArgumentCount"));
  return Object.freeze({
    sourceTypeArgumentCount: value.sourceTypeArgumentCount,
    declaration: snapshotProviderVirtualDeclarationFactAtPath(value.declaration, childSnapshotPath(path, "declaration")),
    ...(value.targetBinding === undefined ? {} : {
      targetBinding: snapshotTargetBindingFactAtPath(value.targetBinding, childSnapshotPath(path, "targetBinding")),
    }),
  });
}

function snapshotProviderVirtualDeclarationFactAtPath(
  value: ProviderVirtualDeclarationFact,
  path: SnapshotPath,
): ProviderVirtualDeclarationFact {
  const snapshot = snapshotProviderDeclaration(value, path);
  if (snapshot.providerVersion === undefined || snapshot.artifactFileName === undefined) {
    throw new Error(`Invalid ProviderVirtualDeclarationFact at '${formatSnapshotPath(path)}': providerVersion and artifactFileName are required.`);
  }
  return Object.freeze({
    providerId: snapshot.providerId,
    providerVersion: snapshot.providerVersion,
    providerModuleId: snapshot.providerModuleId,
    moduleSpecifier: snapshot.moduleSpecifier,
    artifactFileName: snapshot.artifactFileName,
    ...(snapshot.exportName === undefined ? {} : { exportName: snapshot.exportName }),
    ...(snapshot.exportId === undefined ? {} : { exportId: snapshot.exportId }),
    ...(snapshot.memberName === undefined ? {} : { memberName: snapshot.memberName }),
    ...(snapshot.memberKey === undefined ? {} : { memberKey: snapshot.memberKey }),
    ...(snapshot.memberId === undefined ? {} : { memberId: snapshot.memberId }),
    ...(snapshot.memberStatic === undefined ? {} : { memberStatic: snapshot.memberStatic }),
    ...(snapshot.signatureId === undefined ? {} : { signatureId: snapshot.signatureId }),
    ...(snapshot.targetIdentity === undefined ? {} : { targetIdentity: snapshot.targetIdentity }),
  });
}

function snapshotTargetOperation(operation: TargetOperationFact, path: SnapshotPath): TargetOperationFact {
  assertRecord(operation, "TargetOperationFact", path);
  operation = captureExactOwnFields(operation, ["operationId", "operationKind", "targetOperation", "resultType", "evidence", "provenance"], "TargetOperationFact", path);
  const proposal = snapshotTargetOperationProposal({
    operationId: operation.operationId,
    operationKind: operation.operationKind,
    targetOperation: operation.targetOperation,
    ...(operation.evidence === undefined ? {} : { evidence: operation.evidence }),
  }, path);
  const provenance = operation.provenance;
  return Object.freeze({
    ...proposal,
    ...(operation.resultType === undefined ? {} : {
      resultType: snapshotTargetTypeRef(operation.resultType, childSnapshotPath(path, "resultType")),
    }),
    provenance: snapshotOperationProvenance(provenance, childSnapshotPath(path, "provenance")),
  });
}

function snapshotTargetOperationProposal(operation: TargetOperationProposal, path: SnapshotPath): TargetOperationProposal {
  assertRecord(operation, "TargetOperationProposal", path);
  operation = captureExactOwnFields(operation, ["operationId", "operationKind", "targetOperation", "evidence"], "TargetOperationProposal", path);
  const operationId = operation.operationId;
  const operationKind = operation.operationKind;
  const targetOperation = operation.targetOperation;
  const evidence = operation.evidence;
  assertString(operationId, "TargetOperationProposal operationId", childSnapshotPath(path, "operationId"));
  assertTargetOperationKind(operationKind, childSnapshotPath(path, "operationKind"));
  assertString(targetOperation, "TargetOperationProposal targetOperation", childSnapshotPath(path, "targetOperation"));
  return Object.freeze({
    operationId,
    operationKind,
    targetOperation,
    ...(evidence === undefined ? {} : {
      evidence: snapshotEvidenceArray(evidence, childSnapshotPath(path, "evidence")),
    }),
  });
}

function snapshotOperationProvenance(provenance: TargetOperationProvenance, path: SnapshotPath): TargetOperationProvenance {
  assertRecord(provenance, "TargetOperationProvenance", path);
  provenance = captureExactOwnFields(provenance, ["providerDeclaration", "sourceOperation"], "TargetOperationProvenance", path);
  const providerDeclaration = provenance.providerDeclaration;
  return Object.freeze({
    ...(providerDeclaration === undefined ? {} : {
      providerDeclaration: snapshotProviderDeclaration(providerDeclaration, childSnapshotPath(path, "providerDeclaration")),
    }),
    sourceOperation: snapshotTargetOperationSourceProvenance(provenance.sourceOperation, childSnapshotPath(path, "sourceOperation")),
  });
}

function snapshotTargetOperationSourceProvenance(
  sourceOperation: TargetOperationSourceProvenance,
  path: SnapshotPath,
): TargetOperationSourceProvenance {
  assertRecord(sourceOperation, "TargetOperationSourceProvenance", path);
  const kind = readOwnStringField(sourceOperation, "sourceOperationKind", "TargetOperationSourceProvenance", path);
  switch (kind) {
    case "call":
      return snapshotCallRequest(sourceOperation as Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "call" }>, path, false);
    case "property-access":
      return snapshotPropertyRequest(sourceOperation as Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "property-access" }>, path, false);
    case "element-access":
      return snapshotElementRequest(sourceOperation as Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "element-access" }>, path, false);
    case "operator":
      return snapshotOperatorRequest(sourceOperation as Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "operator" }>, path, false);
    case "iteration":
      return snapshotIterationRequest(sourceOperation as Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "iteration" }>, path, false);
    case "conversion":
      return snapshotConversionSourceOperation(sourceOperation as Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "conversion" }>, path);
    default:
      throw unknownKindError("TargetOperationSourceProvenance", kind, path);
  }
}

function snapshotConversionSourceOperation(
  sourceOperation: Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "conversion" }>,
  path: SnapshotPath,
): Extract<TargetOperationSourceProvenance, { readonly sourceOperationKind: "conversion" }> {
  const conversionKind = readOwnStringField(sourceOperation, "conversionKind", "conversion TargetOperationSourceProvenance", path);
  if (conversionKind === "assertion") {
    const assertionOperation = captureExactOwnFields(sourceOperation as Extract<typeof sourceOperation, { readonly conversionKind: "assertion" }>, [
      "sourceOperationKind",
      "conversionKind",
      "expression",
      "source",
      "target",
      "assertionKind",
      "explicitTargetTypeNode",
    ], "assertion TargetOperationSourceProvenance", path);
    assertOpaqueIdentitySubject(assertionOperation.expression, "assertion source operation expression", childSnapshotPath(path, "expression"));
    assertOpaqueIdentitySubject(assertionOperation.explicitTargetTypeNode, "assertion source operation explicitTargetTypeNode", childSnapshotPath(path, "explicitTargetTypeNode"));
    if (assertionOperation.assertionKind !== "as" && assertionOperation.assertionKind !== "angle-bracket" && assertionOperation.assertionKind !== "jsdoc") {
      throw invalidEnumValueError("assertion source operation assertionKind", assertionOperation.assertionKind, childSnapshotPath(path, "assertionKind"));
    }
    return Object.freeze({
      sourceOperationKind: "conversion",
      conversionKind: "assertion",
      expression: assertionOperation.expression,
      source: snapshotSelectedSourceValueEvidence(assertionOperation.source, childSnapshotPath(path, "source")),
      target: snapshotSelectedSourceTypeEvidence(assertionOperation.target, childSnapshotPath(path, "target")),
      assertionKind: assertionOperation.assertionKind,
      explicitTargetTypeNode: assertionOperation.explicitTargetTypeNode,
    });
  }
  if (conversionKind !== "call-argument") {
    throw invalidEnumValueError("TargetOperationSourceProvenance conversionKind", conversionKind, childSnapshotPath(path, "conversionKind"));
  }
  const callOperation = captureExactOwnFields(sourceOperation as Extract<typeof sourceOperation, { readonly conversionKind: "call-argument" }>, [
    "sourceOperationKind",
    "conversionKind",
    "expression",
    "source",
    "call",
    "slot",
    "sourceBinding",
  ], "call-argument TargetOperationSourceProvenance", path);
  assertOpaqueIdentitySubject(callOperation.expression, "call-argument source operation expression", childSnapshotPath(path, "expression"));
  assertOpaqueIdentitySubject(callOperation.call, "call-argument source operation call", childSnapshotPath(path, "call"));
  const slot = snapshotArgumentConversionSlots([callOperation.slot], childSnapshotPath(path, "slot"))[0];
  if (slot === undefined) {
    throw new Error(`Invalid call-argument source operation at '${formatSnapshotPath(path)}': missing conversion slot.`);
  }
  const sourceBinding = snapshotSelectedCallArgumentBinding(callOperation.sourceBinding, childSnapshotPath(path, "sourceBinding"));
  if (slot.sourceArgumentIndex !== sourceBinding.sourceArgumentIndex
    || slot.sourceForm !== sourceBinding.sourceForm
    || slot.spreadElementIndex !== sourceBinding.spreadElementIndex) {
    throw new Error(`Invalid call-argument source operation at '${formatSnapshotPath(path)}': conversion slot does not match source binding.`);
  }
  return Object.freeze({
    sourceOperationKind: "conversion",
    conversionKind: "call-argument",
    expression: callOperation.expression,
    source: snapshotSelectedSourceValueEvidence(callOperation.source, childSnapshotPath(path, "source")),
    call: callOperation.call,
    slot,
    sourceBinding,
  });
}

function snapshotSourceSelectedCallEvidence(
  evidence: SourceSelectedCallEvidence,
  path: SnapshotPath,
  sourceArgumentCount: number,
): SourceSelectedCallEvidence {
  assertRecord(evidence, "SourceSelectedCallEvidence", path);
  const kind = readDiscriminant(evidence, "SourceSelectedCallEvidence", path);
  if (kind === "untyped") {
    assertExactOwnFields(evidence, ["kind"], "untyped SourceSelectedCallEvidence", path);
    return Object.freeze({ kind: "untyped" });
  }
  if (kind !== "applicable") {
    throw unknownKindError("SourceSelectedCallEvidence", kind, path);
  }
  const applicable = captureExactOwnFields(evidence as Extract<SourceSelectedCallEvidence, { readonly kind: "applicable" }>, [
    "kind",
    "signature",
    "declaration",
    "methodTypeArguments",
    "parameters",
    "argumentBindings",
  ], "applicable SourceSelectedCallEvidence", path);
  assertOpaqueIdentitySubject(applicable.signature, "SourceSelectedCallEvidence signature", childSnapshotPath(path, "signature"));
  if (applicable.declaration !== undefined) {
    assertOpaqueIdentitySubject(applicable.declaration, "SourceSelectedCallEvidence declaration", childSnapshotPath(path, "declaration"));
  }
  const parameters = snapshotSignatureParameters(applicable.parameters, childSnapshotPath(path, "parameters"));
  return Object.freeze({
    kind: "applicable",
    signature: applicable.signature,
    ...(applicable.declaration === undefined ? {} : { declaration: applicable.declaration }),
    methodTypeArguments: snapshotMethodTypeArguments(applicable.methodTypeArguments, childSnapshotPath(path, "methodTypeArguments")),
    parameters,
    argumentBindings: snapshotSelectedCallArgumentBindings(
      applicable.argumentBindings,
      childSnapshotPath(path, "argumentBindings"),
      sourceArgumentCount,
      parameters.length,
    ),
  });
}

function snapshotSourceChainRole<TParticipant extends CheckedSourceChainParticipant>(
  role: CheckedSourceChainRole<TParticipant>,
  participant: TParticipant,
  path: SnapshotPath,
): CheckedSourceChainRole<TParticipant> {
  assertRecord(role, "CheckedSourceChainRole", path);
  const kind = readDiscriminant(role, "CheckedSourceChainRole", path);
  if (kind === "ordinary") {
    const ordinary = captureExactOwnFields(role as Extract<CheckedSourceChainRole<TParticipant>, { readonly kind: "ordinary" }>, ["kind", "participant"], "ordinary CheckedSourceChainRole", path);
    if (ordinary.participant !== participant) {
      throw invalidEnumValueError("CheckedSourceChainRole participant", ordinary.participant, childSnapshotPath(path, "participant"));
    }
    return Object.freeze({ kind: "ordinary", participant });
  }
  if (kind !== "optional-chain") {
    throw unknownKindError("CheckedSourceChainRole", kind, path);
  }
  const optional = captureExactOwnFields(role as Extract<CheckedSourceChainRole<TParticipant>, { readonly kind: "optional-chain" }>, ["kind", "participant", "position", "boundary"], "optional-chain CheckedSourceChainRole", path);
  if (optional.participant !== participant) {
    throw invalidEnumValueError("CheckedSourceChainRole participant", optional.participant, childSnapshotPath(path, "participant"));
  }
  if (optional.position !== "root" && optional.position !== "continuation") {
    throw invalidEnumValueError("CheckedSourceChainRole position", optional.position, childSnapshotPath(path, "position"));
  }
  if (optional.boundary !== "nested" && optional.boundary !== "outermost") {
    throw invalidEnumValueError("CheckedSourceChainRole boundary", optional.boundary, childSnapshotPath(path, "boundary"));
  }
  return Object.freeze({
    kind: "optional-chain",
    participant,
    position: optional.position,
    boundary: optional.boundary,
  });
}

function snapshotForInIterationMechanism(
  mechanism: { readonly kind: "property-key-enumeration" },
  path: SnapshotPath,
): { readonly kind: "property-key-enumeration" } {
  assertRecord(mechanism, "for-in iteration mechanism", path);
  mechanism = captureExactOwnFields(mechanism, ["kind"], "for-in iteration mechanism", path);
  if (mechanism.kind !== "property-key-enumeration") {
    throw invalidEnumValueError("for-in iteration mechanism kind", mechanism.kind, childSnapshotPath(path, "kind"));
  }
  return Object.freeze({ kind: "property-key-enumeration" });
}

function snapshotForOfIterationMechanism(
  mechanism: CheckedForOfIterationMechanism,
  path: SnapshotPath,
): CheckedForOfIterationMechanism {
  assertRecord(mechanism, "for-of iteration mechanism", path);
  const kind = readDiscriminant(mechanism, "for-of iteration mechanism", path);
  if (kind !== "union") {
    return snapshotForOfAtomicIterationMechanism(mechanism as CheckedForOfAtomicIterationMechanism, path);
  }
  const union = captureExactOwnFields(mechanism as Extract<CheckedForOfIterationMechanism, { readonly kind: "union" }>, ["kind", "alternatives"], "union for-of iteration mechanism", path);
  const alternatives = captureArray(union.alternatives, "for-of iteration alternatives", childSnapshotPath(path, "alternatives"));
  if (alternatives.length === 0) {
    throw new Error(`Invalid union for-of iteration mechanism at '${formatSnapshotPath(path)}': alternatives must not be empty.`);
  }
  const snapshots = alternatives.map((alternative, index) => snapshotForOfAtomicIterationMechanism(
    alternative,
    indexedSnapshotPath(childSnapshotPath(path, "alternatives"), index),
  ));
  return Object.freeze({
    kind: "union",
    alternatives: freezeNonEmptySnapshotAlternatives(snapshots, "for-of", path),
  });
}

function snapshotForOfAtomicIterationMechanism(
  mechanism: CheckedForOfAtomicIterationMechanism,
  path: SnapshotPath,
): CheckedForOfAtomicIterationMechanism {
  assertRecord(mechanism, "atomic for-of iteration mechanism", path);
  const kind = readDiscriminant(mechanism, "atomic for-of iteration mechanism", path);
  switch (kind) {
    case "synchronous-iterator-protocol": {
      const selected = captureExactOwnFields(mechanism as Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "synchronous-iterator-protocol" }>, ["kind", "sourceAlternative", "protocol"], "synchronous for-of iteration mechanism", path);
      return Object.freeze({
        kind,
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
        protocol: snapshotIterationProtocolEvidence(selected.protocol, childSnapshotPath(path, "protocol")),
      });
    }
    case "array-like-index": {
      const selected = captureExactOwnFields(mechanism as Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "array-like-index" }>, ["kind", "sourceAlternative", "selectedIndex"], "array-like for-of iteration mechanism", path);
      return Object.freeze({
        kind,
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
        selectedIndex: snapshotSelectedSourceTypeEvidence(selected.selectedIndex, childSnapshotPath(path, "selectedIndex")),
      });
    }
    case "string-code-unit-index": {
      const selected = captureExactOwnFields(mechanism as Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "string-code-unit-index" }>, ["kind", "sourceAlternative"], "string for-of iteration mechanism", path);
      return Object.freeze({
        kind,
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
      });
    }
    case "untyped-dynamic-iteration": {
      const selected = captureExactOwnFields(mechanism as Extract<CheckedForOfAtomicIterationMechanism, { readonly kind: "untyped-dynamic-iteration" }>, ["kind", "sourceAlternative"], "untyped-dynamic for-of iteration mechanism", path);
      return Object.freeze({
        kind,
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
      });
    }
    default:
      throw unknownKindError("atomic for-of iteration mechanism", kind, path);
  }
}

function freezeNonEmptySnapshotAlternatives<T>(
  alternatives: readonly T[],
  iterationKind: "for-of" | "for-await-of",
  path: SnapshotPath,
): readonly [T, ...T[]] {
  const first = alternatives[0];
  if (first === undefined) {
    throw new Error(`Invalid union ${iterationKind} iteration mechanism at '${formatSnapshotPath(path)}': alternatives must not be empty.`);
  }
  return Object.freeze([first, ...alternatives.slice(1)]);
}

function snapshotForAwaitOfIterationMechanism(
  mechanism: CheckedForAwaitOfIterationMechanism,
  path: SnapshotPath,
): CheckedForAwaitOfIterationMechanism {
  assertRecord(mechanism, "for-await-of iteration mechanism", path);
  const kind = readDiscriminant(mechanism, "for-await-of iteration mechanism", path);
  if (kind !== "union") {
    return snapshotForAwaitOfAtomicIterationMechanism(mechanism as CheckedForAwaitOfAtomicIterationMechanism, path);
  }
  const union = captureExactOwnFields(mechanism as Extract<CheckedForAwaitOfIterationMechanism, { readonly kind: "union" }>, ["kind", "alternatives"], "union for-await-of iteration mechanism", path);
  const alternatives = captureArray(union.alternatives, "for-await-of iteration alternatives", childSnapshotPath(path, "alternatives"));
  if (alternatives.length === 0) {
    throw new Error(`Invalid union for-await-of iteration mechanism at '${formatSnapshotPath(path)}': alternatives must not be empty.`);
  }
  const snapshots = alternatives.map((alternative, index) => snapshotForAwaitOfAtomicIterationMechanism(
    alternative,
    indexedSnapshotPath(childSnapshotPath(path, "alternatives"), index),
  ));
  return Object.freeze({
    kind: "union",
    alternatives: freezeNonEmptySnapshotAlternatives(snapshots, "for-await-of", path),
  });
}

function snapshotForAwaitOfAtomicIterationMechanism(
  mechanism: CheckedForAwaitOfAtomicIterationMechanism,
  path: SnapshotPath,
): CheckedForAwaitOfAtomicIterationMechanism {
  assertRecord(mechanism, "atomic for-await-of iteration mechanism", path);
  const kind = readDiscriminant(mechanism, "atomic for-await-of iteration mechanism", path);
  switch (kind) {
    case "asynchronous-iterator-protocol": {
      const selected = captureExactOwnFields(
        mechanism as Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "asynchronous-iterator-protocol" }>,
        ["kind", "sourceAlternative", "protocol"],
        "asynchronous-iterator-protocol iteration mechanism",
        path,
      );
      const sourceAlternative = snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative"));
      const protocol = snapshotIterationProtocolEvidence(selected.protocol, childSnapshotPath(path, "protocol"));
      return Object.freeze({ kind: "asynchronous-iterator-protocol", sourceAlternative, protocol });
    }
    case "synchronous-iterator-adapted-to-async": {
      const selected = captureExactOwnFields(
        mechanism as Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "synchronous-iterator-adapted-to-async" }>,
        ["kind", "sourceAlternative", "protocol"],
        "synchronous-iterator-adapted-to-async iteration mechanism",
        path,
      );
      return Object.freeze({
        kind: "synchronous-iterator-adapted-to-async",
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
        protocol: snapshotIterationProtocolEvidence(selected.protocol, childSnapshotPath(path, "protocol")),
      });
    }
    case "array-like-index-adapted-to-async": {
      const selected = captureExactOwnFields(mechanism as Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "array-like-index-adapted-to-async" }>, ["kind", "sourceAlternative", "selectedIndex"], "array-like for-await-of iteration mechanism", path);
      return Object.freeze({
        kind,
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
        selectedIndex: snapshotSelectedSourceTypeEvidence(selected.selectedIndex, childSnapshotPath(path, "selectedIndex")),
      });
    }
    case "string-code-unit-index-adapted-to-async": {
      const selected = captureExactOwnFields(
        mechanism as Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "string-code-unit-index-adapted-to-async" }>,
        ["kind", "sourceAlternative"],
        "string-code-unit-index-adapted-to-async for-await-of iteration mechanism",
        path,
      );
      return Object.freeze({
        kind: "string-code-unit-index-adapted-to-async",
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
      });
    }
    case "untyped-dynamic-iteration": {
      const selected = captureExactOwnFields(
        mechanism as Extract<CheckedForAwaitOfAtomicIterationMechanism, { readonly kind: "untyped-dynamic-iteration" }>,
        ["kind", "sourceAlternative"],
        "untyped-dynamic for-await-of iteration mechanism",
        path,
      );
      return Object.freeze({
        kind: "untyped-dynamic-iteration",
        sourceAlternative: snapshotSelectedSourceTypeEvidence(selected.sourceAlternative, childSnapshotPath(path, "sourceAlternative")),
      });
    }
    default:
      throw unknownKindError("atomic for-await-of iteration mechanism", kind, path);
  }
}

function snapshotIterationProtocolEvidence(
  protocol: SelectedSourceIterationProtocolEvidence,
  path: SnapshotPath,
): SelectedSourceIterationProtocolEvidence {
  assertRecord(protocol, "SelectedSourceIterationProtocolEvidence", path);
  const resolutionKind = readOwnStringField(protocol, "resolutionKind", "SelectedSourceIterationProtocolEvidence", path);
  if (resolutionKind === "known-iterable-instantiation") {
    const known = captureExactOwnFields(
      protocol as Extract<SelectedSourceIterationProtocolEvidence, { readonly resolutionKind: "known-iterable-instantiation" }>,
      ["resolutionKind", "iterationTypes", "iterableTarget", "iterableDeclarations"],
      "known-iterable SelectedSourceIterationProtocolEvidence",
      path,
    );
    return Object.freeze({
      resolutionKind: "known-iterable-instantiation",
      iterationTypes: snapshotSelectedSourceIterationTypes(known.iterationTypes, childSnapshotPath(path, "iterationTypes")),
      iterableTarget: snapshotSelectedSourceTypeEvidence(known.iterableTarget, childSnapshotPath(path, "iterableTarget")),
      iterableDeclarations: Object.freeze(captureOpaqueIdentitySubjectArray(
        known.iterableDeclarations,
        "iteration protocol iterable declarations",
        childSnapshotPath(path, "iterableDeclarations"),
      )),
    });
  }
  if (resolutionKind !== "selected-iterator-member") {
    throw unknownKindError("SelectedSourceIterationProtocolEvidence", resolutionKind, path);
  }
  const selected = captureExactOwnFields(
    protocol as Extract<SelectedSourceIterationProtocolEvidence, { readonly resolutionKind: "selected-iterator-member" }>,
    ["resolutionKind", "iterationTypes", "iteratorMethod", "iteratorType"],
    "selected-member SelectedSourceIterationProtocolEvidence",
    path,
  );
  return Object.freeze({
    resolutionKind: "selected-iterator-member",
    iterationTypes: snapshotSelectedSourceIterationTypes(selected.iterationTypes, childSnapshotPath(path, "iterationTypes")),
    iteratorMethod: snapshotIterationProtocolMemberEvidence(selected.iteratorMethod, childSnapshotPath(path, "iteratorMethod")),
    iteratorType: snapshotSelectedSourceTypeEvidence(selected.iteratorType, childSnapshotPath(path, "iteratorType")),
  });
}

function snapshotSelectedSourceIterationTypes(
  iterationTypes: SelectedSourceIterationTypes,
  path: SnapshotPath,
): SelectedSourceIterationTypes {
  assertRecord(iterationTypes, "SelectedSourceIterationTypes", path);
  iterationTypes = captureExactOwnFields(
    iterationTypes,
    ["yieldType", "returnType", "nextType"],
    "SelectedSourceIterationTypes",
    path,
  );
  return Object.freeze({
    ...(iterationTypes.yieldType === undefined
      ? {}
      : { yieldType: snapshotSelectedSourceTypeEvidence(iterationTypes.yieldType, childSnapshotPath(path, "yieldType")) }),
    ...(iterationTypes.returnType === undefined
      ? {}
      : { returnType: snapshotSelectedSourceTypeEvidence(iterationTypes.returnType, childSnapshotPath(path, "returnType")) }),
    ...(iterationTypes.nextType === undefined
      ? {}
      : { nextType: snapshotSelectedSourceTypeEvidence(iterationTypes.nextType, childSnapshotPath(path, "nextType")) }),
  });
}

function snapshotIterationProtocolMemberEvidence(
  member: SelectedSourceIterationProtocolMemberEvidence,
  path: SnapshotPath,
): SelectedSourceIterationProtocolMemberEvidence {
  assertRecord(member, "SelectedSourceIterationProtocolMemberEvidence", path);
  member = captureExactOwnFields(member, ["symbol", "valueDeclaration", "declarations", "type"], "SelectedSourceIterationProtocolMemberEvidence", path);
  assertOpaqueIdentitySubject(member.symbol, "iteration protocol member symbol", childSnapshotPath(path, "symbol"));
  if (member.valueDeclaration !== undefined) {
    assertOpaqueIdentitySubject(member.valueDeclaration, "iteration protocol member value declaration", childSnapshotPath(path, "valueDeclaration"));
  }
  assertOpaqueIdentitySubject(member.type, "iteration protocol member type", childSnapshotPath(path, "type"));
  return Object.freeze({
    symbol: member.symbol,
    ...(member.valueDeclaration === undefined ? {} : { valueDeclaration: member.valueDeclaration }),
    declarations: Object.freeze(captureOpaqueIdentitySubjectArray(
      member.declarations,
      "iteration protocol member declarations",
      childSnapshotPath(path, "declarations"),
    )),
    type: member.type,
  });
}

function assertCheckedCallKind(value: unknown, path: SnapshotPath): asserts value is "call" | "construct" {
  if (value !== "call" && value !== "construct") {
    throw new Error(`Invalid CheckedCallMappingRequest at '${formatSnapshotPath(path)}': callKind must be 'call' or 'construct'.`);
  }
}

function assertCheckedAccessMode(value: unknown, path: SnapshotPath): asserts value is "read" | "write" | "read-write" | "delete" {
  if (value !== "read" && value !== "write" && value !== "read-write" && value !== "delete") {
    throw new Error(`Invalid checked access evidence at '${formatSnapshotPath(path)}': accessMode must be 'read', 'write', 'read-write', or 'delete'.`);
  }
}

function assertCheckedIterationKind(value: unknown, path: SnapshotPath): asserts value is CheckedIterationMappingRequest["iterationKind"] {
  if (value !== "for-in" && value !== "for-of" && value !== "for-await-of") {
    throw invalidEnumValueError("CheckedIterationMappingRequest iterationKind", value, path);
  }
}

function assertOptionalTarget(
  target: unknown,
  valueName: string,
  path: SnapshotPath,
): void {
  if (target !== undefined) {
    assertString(target, `${valueName} target`, childSnapshotPath(path, "target"));
  }
}

function assertCheckedAccessUse(value: unknown, valueName: string, path: SnapshotPath): asserts value is "value" | "call-callee" {
  if (value !== "value" && value !== "call-callee") {
    throw invalidEnumValueError(`${valueName} use`, value, path);
  }
}

function assertCheckedPrefixUnaryOperatorToken(
  value: unknown,
  path: SnapshotPath,
): asserts value is Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "prefix-unary" }>["operator"] {
  if (value !== "+" && value !== "-" && value !== "~" && value !== "!" && value !== "typeof" && value !== "void" && value !== "delete") {
    throw invalidEnumValueError("CheckedOperatorMappingRequest prefix-unary operator", value, path);
  }
}

function assertCheckedUpdateOperatorToken(
  value: unknown,
  path: SnapshotPath,
): asserts value is Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "prefix-update" | "postfix-update" }>["operator"] {
  if (value !== "++" && value !== "--") {
    throw invalidEnumValueError("CheckedOperatorMappingRequest update operator", value, path);
  }
}

function assertCheckedBinaryOperatorToken(
  value: unknown,
  path: SnapshotPath,
): asserts value is Extract<CheckedOperatorMappingRequest, { readonly operatorKind: "binary" }>["operator"] {
  const valid = value === "**" || value === "*" || value === "/" || value === "%" || value === "+" || value === "-"
    || value === "<<" || value === ">>" || value === ">>>"
    || value === "<" || value === ">" || value === "<=" || value === ">=" || value === "instanceof" || value === "in"
    || value === "==" || value === "!=" || value === "===" || value === "!=="
    || value === "&" || value === "^" || value === "|" || value === "&&" || value === "||" || value === "??"
    || value === "=" || value === "+=" || value === "-=" || value === "*=" || value === "**=" || value === "/=" || value === "%="
    || value === "<<=" || value === ">>=" || value === ">>>=" || value === "&=" || value === "^=" || value === "|="
    || value === "&&=" || value === "||=" || value === "??=" || value === ",";
  if (!valid) {
    throw invalidEnumValueError("CheckedOperatorMappingRequest binary operator", value, path);
  }
}

function assertMatchingCheckedOperationObservation(
  value: unknown,
  expected: CheckedOperationObservationPointName,
  path: SnapshotPath,
): asserts value is CheckedOperationObservationPointName {
  if (value !== expected) {
    throw new Error(`Invalid checked-operation result at '${formatSnapshotPath(path)}': expected observation '${expected}', received '${String(value)}'.`);
  }
}

function snapshotProviderDeclaration(declaration: ProviderDeclarationIdentity, path: SnapshotPath): ProviderDeclarationIdentity {
  assertRecord(declaration, "ProviderDeclarationIdentity", path);
  declaration = captureExactOwnFields(declaration, ["providerId", "providerVersion", "providerModuleId", "moduleSpecifier", "artifactFileName", "exportName", "exportId", "memberName", "memberKey", "memberId", "memberStatic", "signatureId", "targetIdentity"], "ProviderDeclarationIdentity", path);
  const providerId = declaration.providerId;
  const providerVersion = declaration.providerVersion;
  const providerModuleId = declaration.providerModuleId;
  const moduleSpecifier = declaration.moduleSpecifier;
  const artifactFileName = declaration.artifactFileName;
  const exportName = declaration.exportName;
  const exportId = declaration.exportId;
  const memberName = declaration.memberName;
  const memberKey = declaration.memberKey;
  const memberId = declaration.memberId;
  const memberStatic = declaration.memberStatic;
  const signatureId = declaration.signatureId;
  const targetIdentity = declaration.targetIdentity;
  assertString(providerId, "ProviderDeclarationIdentity providerId", childSnapshotPath(path, "providerId"));
  if (providerVersion !== undefined) {
    assertString(providerVersion, "ProviderDeclarationIdentity providerVersion", childSnapshotPath(path, "providerVersion"));
  }
  assertString(providerModuleId, "ProviderDeclarationIdentity providerModuleId", childSnapshotPath(path, "providerModuleId"));
  assertString(moduleSpecifier, "ProviderDeclarationIdentity moduleSpecifier", childSnapshotPath(path, "moduleSpecifier"));
  for (const [field, value] of [
    ["artifactFileName", artifactFileName],
    ["exportName", exportName],
    ["exportId", exportId],
    ["memberName", memberName],
    ["memberId", memberId],
    ["signatureId", signatureId],
  ] as const) {
    if (value !== undefined) {
      assertString(value, `ProviderDeclarationIdentity ${field}`, childSnapshotPath(path, field));
    }
  }
  if (memberStatic !== undefined) {
    assertBoolean(memberStatic, "ProviderDeclarationIdentity memberStatic", childSnapshotPath(path, "memberStatic"));
  }
  return Object.freeze({
    providerId,
    ...(providerVersion === undefined ? {} : { providerVersion }),
    providerModuleId,
    moduleSpecifier,
    ...(artifactFileName === undefined ? {} : { artifactFileName }),
    ...(exportName === undefined ? {} : { exportName }),
    ...(exportId === undefined ? {} : { exportId }),
    ...(memberName === undefined ? {} : { memberName }),
    ...(memberKey === undefined ? {} : {
      memberKey: snapshotProviderMemberKey(memberKey, childSnapshotPath(path, "memberKey")),
    }),
    ...(memberId === undefined ? {} : { memberId }),
    ...(memberStatic === undefined ? {} : { memberStatic }),
    ...(signatureId === undefined ? {} : { signatureId }),
    ...(targetIdentity === undefined ? {} : {
      targetIdentity: snapshotTargetTypeRef(targetIdentity, childSnapshotPath(path, "targetIdentity")),
    }),
  });
}

function snapshotProviderMemberKey(key: ProviderMemberKey, path: SnapshotPath): ProviderMemberKey {
  assertRecord(key, "ProviderMemberKey", path);
  const actualKind = readDiscriminant(key, "ProviderMemberKey", path);
  switch (actualKind) {
    case "property-key": {
      const propertyKey = captureExactOwnFields(key as Extract<ProviderMemberKey, { readonly kind: "property-key" }>, ["kind", "name"], "property ProviderMemberKey", path);
      const name = propertyKey.name;
      assertString(name, "ProviderMemberKey name", childSnapshotPath(path, "name"));
      return Object.freeze({ kind: "property-key", name });
    }
    case "well-known-symbol": {
      const symbolKey = captureExactOwnFields(key as Extract<ProviderMemberKey, { readonly kind: "well-known-symbol" }>, ["kind", "name"], "well-known-symbol ProviderMemberKey", path);
      const name = symbolKey.name;
      assertString(name, "ProviderMemberKey name", childSnapshotPath(path, "name"));
      assertProviderWellKnownSymbolName(name, childSnapshotPath(path, "name"));
      return Object.freeze({ kind: "well-known-symbol", name });
    }
    default:
      throw unknownKindError("ProviderMemberKey", actualKind, path);
  }
}

function snapshotSelectedSourceTypeEvidence(
  evidence: SelectedSourceTypeEvidence,
  path: SnapshotPath,
): SelectedSourceTypeEvidence {
  assertRecord(evidence, "SelectedSourceTypeEvidence", path);
  evidence = captureExactOwnFields(evidence, [
    "type",
    "symbol",
    "declaration",
    "selectedSymbol",
    "selectedDeclaration",
    "authoredTypeNode",
  ], "SelectedSourceTypeEvidence", path);
  return snapshotSelectedSourceTypeEvidenceFields(evidence, path);
}

function snapshotSelectedSourceTypeEvidenceFields(
  evidence: SelectedSourceTypeEvidence,
  path: SnapshotPath,
): SelectedSourceTypeEvidence {
  const type = evidence.type;
  const symbol = evidence.symbol;
  const declaration = evidence.declaration;
  const selectedSymbol = evidence.selectedSymbol;
  const selectedDeclaration = evidence.selectedDeclaration;
  const authoredTypeNode = evidence.authoredTypeNode;
  assertOpaqueIdentitySubject(type, "SelectedSourceTypeEvidence type", childSnapshotPath(path, "type"));
  for (const [field, value] of [
    ["symbol", symbol],
    ["declaration", declaration],
    ["selectedSymbol", selectedSymbol],
    ["selectedDeclaration", selectedDeclaration],
    ["authoredTypeNode", authoredTypeNode],
  ] as const) {
    if (value !== undefined) {
      assertOpaqueIdentitySubject(value, `SelectedSourceTypeEvidence ${field}`, childSnapshotPath(path, field));
    }
  }
  return Object.freeze({
    type,
    ...(symbol === undefined ? {} : { symbol }),
    ...(declaration === undefined ? {} : { declaration }),
    ...(selectedSymbol === undefined ? {} : { selectedSymbol }),
    ...(selectedDeclaration === undefined ? {} : { selectedDeclaration }),
    ...(authoredTypeNode === undefined ? {} : { authoredTypeNode }),
  });
}

function snapshotSelectedSourceValueEvidence(
  evidence: SelectedSourceValueEvidence,
  path: SnapshotPath,
): SelectedSourceValueEvidence {
  assertRecord(evidence, "SelectedSourceValueEvidence", path);
  evidence = captureExactOwnFields(evidence, [
    "expression",
    "type",
    "symbol",
    "declaration",
    "selectedSymbol",
    "selectedDeclaration",
    "authoredTypeNode",
  ], "SelectedSourceValueEvidence", path);
  const expression = evidence.expression;
  assertOpaqueIdentitySubject(expression, "SelectedSourceValueEvidence expression", childSnapshotPath(path, "expression"));
  const typeEvidence = snapshotSelectedSourceTypeEvidenceFields(evidence, path);
  return Object.freeze({
    expression,
    ...typeEvidence,
  });
}

function snapshotCheckedSourceCallCompositionEvidence(
  evidence: CheckedSourceCallCompositionEvidence,
  argumentCount: number,
  path: SnapshotPath,
): CheckedSourceCallCompositionEvidence {
  assertRecord(evidence, "CheckedSourceCallCompositionEvidence", path);
  const captured = captureExactOwnFields(evidence, ["argumentEvidence"], "CheckedSourceCallCompositionEvidence", path);
  const argumentEvidence = captureArray(captured.argumentEvidence, "CheckedSourceCallArgumentCompositionEvidence array", childSnapshotPath(path, "argumentEvidence"));
  if (argumentEvidence.length !== argumentCount) {
    throw new Error(`Invalid CheckedSourceCallCompositionEvidence at '${formatSnapshotPath(path)}': argumentEvidence length ${argumentEvidence.length} does not match call argument length ${argumentCount}.`);
  }
  return Object.freeze({
    argumentEvidence: Object.freeze(argumentEvidence.map((argument, index) => snapshotCheckedSourceCallArgumentCompositionEvidence(
      argument,
      indexedSnapshotPath(childSnapshotPath(path, "argumentEvidence"), index),
    ))),
  });
}

function snapshotCheckedSourceCallArgumentCompositionEvidence(
  evidence: CheckedSourceCallArgumentCompositionEvidence | undefined,
  path: SnapshotPath,
): CheckedSourceCallArgumentCompositionEvidence | undefined {
  if (evidence === undefined) {
    return undefined;
  }
  assertRecord(evidence, "CheckedSourceCallArgumentCompositionEvidence", path);
  const kindDescriptor = Object.getOwnPropertyDescriptor(evidence, "kind");
  if (kindDescriptor === undefined || !("value" in kindDescriptor)) {
    throw new Error(`Invalid CheckedSourceCallArgumentCompositionEvidence at '${formatSnapshotPath(path)}': kind must be an own data property.`);
  }
  if (kindDescriptor.value === "authored-literal") {
    const captured = captureExactOwnFields(
      evidence as Extract<CheckedSourceCallArgumentCompositionEvidence, { readonly kind: "authored-literal" }>,
      ["kind", "literal"],
      "CheckedSourceCallArgumentCompositionEvidence",
      path,
    );
    return Object.freeze({
      kind: "authored-literal",
      literal: snapshotCheckedSourceAuthoredLiteralEvidence(
        captured.literal as CheckedSourceAuthoredLiteralEvidence,
        childSnapshotPath(path, "literal"),
      ),
    });
  }
  if (kindDescriptor.value === "inline-function") {
    const captured = captureExactOwnFields(
      evidence as Extract<CheckedSourceCallArgumentCompositionEvidence, { readonly kind: "inline-function" }>,
      ["kind", "function"],
      "CheckedSourceCallArgumentCompositionEvidence",
      path,
    );
    return Object.freeze({
      kind: "inline-function",
      function: snapshotCheckedSourceInlineFunctionEvidence(
        captured.function as CheckedSourceInlineFunctionEvidence,
        childSnapshotPath(path, "function"),
      ),
    });
  }
  throw new Error(`Invalid CheckedSourceCallArgumentCompositionEvidence at '${formatSnapshotPath(path)}': unknown kind '${String(kindDescriptor.value)}'.`);
}

function snapshotCheckedSourceAuthoredLiteralEvidence(
  literal: CheckedSourceAuthoredLiteralEvidence,
  path: SnapshotPath,
): CheckedSourceAuthoredLiteralEvidence {
  assertRecord(literal, "CheckedSourceAuthoredLiteralEvidence", path);
  const kindDescriptor = Object.getOwnPropertyDescriptor(literal, "kind");
  if (kindDescriptor === undefined || !("value" in kindDescriptor)) {
    throw new Error(`Invalid CheckedSourceAuthoredLiteralEvidence at '${formatSnapshotPath(path)}': kind must be an own data property.`);
  }
  const kind = kindDescriptor.value;
  if (kind === "null") {
    captureExactOwnFields(
      literal as Extract<CheckedSourceAuthoredLiteralEvidence, { readonly kind: "null" }>,
      ["kind"],
      "CheckedSourceAuthoredLiteralEvidence",
      path,
    );
    return Object.freeze({ kind });
  }
  if (kind !== "string" && kind !== "number" && kind !== "bigint" && kind !== "boolean") {
    throw new Error(`Invalid CheckedSourceAuthoredLiteralEvidence at '${formatSnapshotPath(path)}': unknown kind '${String(kind)}'.`);
  }
  const captured = captureExactOwnFields(
    literal as Exclude<CheckedSourceAuthoredLiteralEvidence, { readonly kind: "null" }>,
    ["kind", "value"],
    "CheckedSourceAuthoredLiteralEvidence",
    path,
  );
  if (kind === "boolean") {
    if (typeof captured.value !== "boolean") {
      throw new Error(`Invalid CheckedSourceAuthoredLiteralEvidence at '${formatSnapshotPath(path)}': boolean value is required.`);
    }
    return Object.freeze({ kind, value: captured.value });
  }
  assertString(captured.value, `CheckedSourceAuthoredLiteralEvidence ${kind} value`, childSnapshotPath(path, "value"));
  return Object.freeze({ kind, value: captured.value });
}

function snapshotCheckedSourceInlineFunctionEvidence(
  evidence: CheckedSourceInlineFunctionEvidence,
  path: SnapshotPath,
): CheckedSourceInlineFunctionEvidence {
  assertRecord(evidence, "CheckedSourceInlineFunctionEvidence", path);
  const captured = captureExactOwnFields(
    evidence,
    ["expression", "parameters", "returns", "operations"],
    "CheckedSourceInlineFunctionEvidence",
    path,
  );
  assertOpaqueIdentitySubject(captured.expression, "CheckedSourceInlineFunctionEvidence expression", childSnapshotPath(path, "expression"));
  const parameters = captureArray(captured.parameters, "CheckedSourceInlineFunctionParameterEvidence array", childSnapshotPath(path, "parameters"));
  const returns = captureArray(captured.returns, "CheckedSourceInlineFunctionReturnEvidence array", childSnapshotPath(path, "returns"));
  const operations = captureArray(captured.operations, "CheckedSourceInlineOperation array", childSnapshotPath(path, "operations"));
  return Object.freeze({
    expression: captured.expression,
    parameters: Object.freeze(parameters.map((parameter, index) => {
      const parameterPath = indexedSnapshotPath(childSnapshotPath(path, "parameters"), index);
      assertRecord(parameter, "CheckedSourceInlineFunctionParameterEvidence", parameterPath);
      const fields = captureExactOwnFields(parameter, ["declaration", "symbol"], "CheckedSourceInlineFunctionParameterEvidence", parameterPath);
      assertOpaqueIdentitySubject(fields.declaration, "CheckedSourceInlineFunctionParameterEvidence declaration", childSnapshotPath(parameterPath, "declaration"));
      assertOpaqueIdentitySubject(fields.symbol, "CheckedSourceInlineFunctionParameterEvidence symbol", childSnapshotPath(parameterPath, "symbol"));
      return Object.freeze({ declaration: fields.declaration, symbol: fields.symbol });
    })),
    returns: Object.freeze(returns.map((returned, index) => snapshotCheckedSourceInlineFunctionReturnEvidence(
      returned as CheckedSourceInlineFunctionReturnEvidence,
      indexedSnapshotPath(childSnapshotPath(path, "returns"), index),
    ))),
    operations: Object.freeze(operations.map((operation, index) => snapshotCheckedSourceInlineOperation(
      operation as CheckedSourceInlineOperation,
      indexedSnapshotPath(childSnapshotPath(path, "operations"), index),
    ))),
  });
}

function snapshotCheckedSourceInlineFunctionReturnEvidence(
  returned: CheckedSourceInlineFunctionReturnEvidence,
  path: SnapshotPath,
): CheckedSourceInlineFunctionReturnEvidence {
  assertRecord(returned, "CheckedSourceInlineFunctionReturnEvidence", path);
  const captured = captureExactOwnFields(
    returned,
    ["expression"],
    "CheckedSourceInlineFunctionReturnEvidence",
    path,
  );
  assertOpaqueIdentitySubject(captured.expression, "CheckedSourceInlineFunctionReturnEvidence expression", childSnapshotPath(path, "expression"));
  return Object.freeze({ expression: captured.expression });
}

function snapshotCheckedSourceInlineOperation(
  operation: CheckedSourceInlineOperation,
  path: SnapshotPath,
): CheckedSourceInlineOperation {
  assertRecord(operation, "CheckedSourceInlineOperation", path);
  const kind = readOwnStringField(operation, "sourceOperationKind", "CheckedSourceInlineOperation", path);
  switch (kind) {
    case "call":
      return snapshotCallRequest(operation as CheckedCallSourceOperation, path, false) as CheckedCallSourceOperation;
    case "property-access":
      return snapshotCheckedSourceInlinePropertyOperation(operation as CheckedSourceInlinePropertyOperation, path);
    case "element-access":
      return snapshotElementRequest(operation as CheckedElementAccessSourceOperation, path, false) as CheckedElementAccessSourceOperation;
    case "operator":
      return snapshotOperatorRequest(operation as CheckedOperatorSourceOperation, path, false) as CheckedOperatorSourceOperation;
    case "iteration":
      return snapshotIterationRequest(operation as CheckedIterationSourceOperation, path, false) as CheckedIterationSourceOperation;
    case "conversion":
      return snapshotCheckedSourceInlineAssertionOperation(operation, path);
    default:
      throw invalidEnumValueError("CheckedSourceInlineOperation sourceOperationKind", kind, childSnapshotPath(path, "sourceOperationKind"));
  }
}

function snapshotCheckedSourceInlinePropertyOperation(
  operation: CheckedSourceInlinePropertyOperation,
  path: SnapshotPath,
): CheckedSourceInlinePropertyOperation {
  const accessMode = readOwnStringField(operation, "accessMode", "CheckedSourceInlinePropertyOperation", path);
  assertCheckedAccessMode(accessMode, childSnapshotPath(path, "accessMode"));
  const commonFields = ["sourceOperationKind", "expression", "receiver", "accessMode", "use", "sourceReceiver", "chainRole"] as const;
  const captured = captureExactOwnFields(
    operation,
    accessMode === "write"
      ? [...commonFields, "sourceWriteType"]
      : accessMode === "read-write"
        ? [...commonFields, "sourceReadResult", "sourceWriteType"]
        : [...commonFields, "sourceReadResult"],
    "CheckedSourceInlinePropertyOperation",
    path,
  );
  if (captured.sourceOperationKind !== "property-access") {
    throw invalidEnumValueError("CheckedSourceInlinePropertyOperation sourceOperationKind", captured.sourceOperationKind, childSnapshotPath(path, "sourceOperationKind"));
  }
  assertOpaqueIdentitySubject(captured.expression, "CheckedSourceInlinePropertyOperation expression", childSnapshotPath(path, "expression"));
  assertOpaqueIdentitySubject(captured.receiver, "CheckedSourceInlinePropertyOperation receiver", childSnapshotPath(path, "receiver"));
  assertCheckedAccessUse(captured.use, "CheckedSourceInlinePropertyOperation", childSnapshotPath(path, "use"));
  const sourceReceiver = snapshotSelectedSourceValueEvidence(captured.sourceReceiver, childSnapshotPath(path, "sourceReceiver"));
  const chainRole = snapshotSourceChainRole(captured.chainRole, "property-access", childSnapshotPath(path, "chainRole"));
  const base = {
    sourceOperationKind: "property-access" as const,
    expression: captured.expression,
    receiver: captured.receiver,
    sourceReceiver,
  };
  if (accessMode === "read") {
    const read = captured as Extract<CheckedSourceInlinePropertyOperation, { readonly accessMode: "read" }>;
    return Object.freeze({
      ...base,
      accessMode: "read",
      use: read.use,
      sourceReadResult: snapshotSelectedSourceValueEvidence(read.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
      chainRole,
    });
  }
  if (captured.use !== "value") {
    throw invalidEnumValueError(`CheckedSourceInlinePropertyOperation ${accessMode} use`, captured.use, childSnapshotPath(path, "use"));
  }
  if (accessMode === "delete") {
    const deleteAccess = captured as Extract<CheckedSourceInlinePropertyOperation, { readonly accessMode: "delete" }>;
    return Object.freeze({
      ...base,
      accessMode: "delete",
      use: "value",
      sourceReadResult: snapshotSelectedSourceValueEvidence(deleteAccess.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
      chainRole,
    });
  }
  if (chainRole.kind !== "ordinary") {
    throw new Error(`Invalid CheckedSourceInlinePropertyOperation at '${formatSnapshotPath(childSnapshotPath(path, "chainRole"))}': ${accessMode} access cannot be an optional-chain participant.`);
  }
  if (accessMode === "write") {
    const write = captured as Extract<CheckedSourceInlinePropertyOperation, { readonly accessMode: "write" }>;
    return Object.freeze({
      ...base,
      accessMode: "write",
      use: "value",
      sourceWriteType: snapshotSelectedSourceTypeEvidence(write.sourceWriteType, childSnapshotPath(path, "sourceWriteType")),
      chainRole,
    });
  }
  const readWrite = captured as Extract<CheckedSourceInlinePropertyOperation, { readonly accessMode: "read-write" }>;
  return Object.freeze({
    ...base,
    accessMode: "read-write",
    use: "value",
    sourceReadResult: snapshotSelectedSourceValueEvidence(readWrite.sourceReadResult, childSnapshotPath(path, "sourceReadResult")),
    sourceWriteType: snapshotSelectedSourceTypeEvidence(readWrite.sourceWriteType, childSnapshotPath(path, "sourceWriteType")),
    chainRole,
  });
}

function snapshotCheckedSourceInlineAssertionOperation(
  operation: CheckedSourceInlineOperation,
  path: SnapshotPath,
): Extract<CheckedSourceInlineOperation, { readonly sourceOperationKind: "conversion" }> {
  const captured = captureExactOwnFields(operation as Extract<CheckedSourceInlineOperation, { readonly sourceOperationKind: "conversion" }>, [
    "sourceOperationKind",
    "conversionKind",
    "expression",
    "source",
    "target",
    "assertionKind",
    "explicitTargetTypeNode",
  ], "CheckedSourceInlineAssertionOperation", path);
  if (captured.conversionKind !== "assertion") {
    throw invalidEnumValueError("CheckedSourceInlineAssertionOperation conversionKind", captured.conversionKind, childSnapshotPath(path, "conversionKind"));
  }
  assertOpaqueIdentitySubject(captured.expression, "CheckedSourceInlineAssertionOperation expression", childSnapshotPath(path, "expression"));
  assertOpaqueIdentitySubject(captured.explicitTargetTypeNode, "CheckedSourceInlineAssertionOperation explicitTargetTypeNode", childSnapshotPath(path, "explicitTargetTypeNode"));
  if (captured.assertionKind !== "as" && captured.assertionKind !== "angle-bracket" && captured.assertionKind !== "jsdoc") {
    throw invalidEnumValueError("CheckedSourceInlineAssertionOperation assertionKind", captured.assertionKind, childSnapshotPath(path, "assertionKind"));
  }
  return Object.freeze({
    sourceOperationKind: "conversion",
    conversionKind: "assertion",
    expression: captured.expression,
    source: snapshotSelectedSourceValueEvidence(captured.source, childSnapshotPath(path, "source")),
    target: snapshotSelectedSourceTypeEvidence(captured.target, childSnapshotPath(path, "target")),
    assertionKind: captured.assertionKind,
    explicitTargetTypeNode: captured.explicitTargetTypeNode,
  });
}

function snapshotMethodTypeArguments(
  arguments_: readonly SourceSelectedMethodTypeArgument[],
  path: SnapshotPath,
): readonly SourceSelectedMethodTypeArgument[] {
  const captured = captureArray(arguments_, "SourceSelectedMethodTypeArgument array", path);
  return Object.freeze(captured.map((argument, index) => {
    const argumentPath = indexedSnapshotPath(path, index);
    assertRecord(argument, "SourceSelectedMethodTypeArgument", argumentPath);
    argument = captureExactOwnFields(argument, ["typeParameterName", "typeParameter", "selectedType", "explicitTypeNode"], "SourceSelectedMethodTypeArgument", argumentPath);
    const typeParameterName = argument.typeParameterName;
    const typeParameter = argument.typeParameter;
    const selectedType = argument.selectedType;
    const explicitTypeNode = argument.explicitTypeNode;
    assertString(typeParameterName, "SourceSelectedMethodTypeArgument typeParameterName", childSnapshotPath(argumentPath, "typeParameterName"));
    if (typeParameter !== undefined) {
      assertOpaqueIdentitySubject(typeParameter, "SourceSelectedMethodTypeArgument typeParameter", childSnapshotPath(argumentPath, "typeParameter"));
    }
    assertOpaqueIdentitySubject(selectedType, "SourceSelectedMethodTypeArgument selectedType", childSnapshotPath(argumentPath, "selectedType"));
    if (explicitTypeNode !== undefined) {
      assertOpaqueIdentitySubject(explicitTypeNode, "SourceSelectedMethodTypeArgument explicitTypeNode", childSnapshotPath(argumentPath, "explicitTypeNode"));
    }
    return Object.freeze({
      typeParameterName,
      ...(typeParameter === undefined ? {} : { typeParameter }),
      selectedType,
      ...(explicitTypeNode === undefined ? {} : { explicitTypeNode }),
    });
  }));
}

function snapshotSelectedCallArgumentBindings(
  bindings: readonly SourceSelectedCallArgumentBinding[],
  path: SnapshotPath,
  sourceArgumentCount?: number,
  sourceParameterCount?: number,
): readonly SourceSelectedCallArgumentBinding[] {
  const captured = captureArray(bindings, "SourceSelectedCallArgumentBinding array", path);
  if (sourceArgumentCount !== undefined) {
    assertNonNegativeInteger(sourceArgumentCount, "source argument count", childSnapshotPath(path, "sourceArgumentCount"));
  }
  if (sourceParameterCount !== undefined) {
    assertNonNegativeInteger(sourceParameterCount, "source parameter count", childSnapshotPath(path, "sourceParameterCount"));
  }

  const snapshots: SourceSelectedCallArgumentBinding[] = [];
  let expectedSourceArgumentIndex = 0;
  let activeSourceArgumentIndex: number | undefined;
  let activeSourceForm: SourceSelectedCallArgumentBinding["sourceForm"] | undefined;
  let nextSpreadElementIndex = 0;
  let previousSourceParameterIndex = -1;

  for (let index = 0; index < captured.length; index += 1) {
    const bindingPath = indexedSnapshotPath(path, index);
    const binding = snapshotSelectedCallArgumentBinding(captured[index]!, bindingPath);
    if (binding.effectiveArgumentIndex !== index) {
      throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(bindingPath)}': effectiveArgumentIndex ${binding.effectiveArgumentIndex} must equal its canonical position ${index}.`);
    }
    if (binding.sourceArgumentIndex !== activeSourceArgumentIndex) {
      if (binding.sourceArgumentIndex !== expectedSourceArgumentIndex) {
        throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(childSnapshotPath(bindingPath, "sourceArgumentIndex"))}': expected the next authored source argument index ${expectedSourceArgumentIndex}, received ${binding.sourceArgumentIndex}.`);
      }
      activeSourceArgumentIndex = binding.sourceArgumentIndex;
      activeSourceForm = binding.sourceForm;
      expectedSourceArgumentIndex += 1;
      nextSpreadElementIndex = 0;
    } else if (activeSourceForm !== "spread-element" || binding.sourceForm !== "spread-element") {
      throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(bindingPath)}': only a fixed tuple spread may contribute multiple effective arguments for one authored source argument.`);
    }
    if (binding.sourceForm === "spread-element") {
      if (binding.spreadElementIndex !== nextSpreadElementIndex) {
        throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(childSnapshotPath(bindingPath, "spreadElementIndex"))}': expected contiguous tuple spread element index ${nextSpreadElementIndex}, received ${String(binding.spreadElementIndex)}.`);
      }
      nextSpreadElementIndex += 1;
    }
    if (binding.sourceParameterIndex < previousSourceParameterIndex) {
      throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(childSnapshotPath(bindingPath, "sourceParameterIndex"))}': selected source parameter indices must be monotonic in effective argument order.`);
    }
    if (sourceParameterCount !== undefined && binding.sourceParameterIndex >= sourceParameterCount) {
      throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(childSnapshotPath(bindingPath, "sourceParameterIndex"))}': selected source parameter index ${binding.sourceParameterIndex} is outside the ${sourceParameterCount}-parameter signature.`);
    }
    previousSourceParameterIndex = binding.sourceParameterIndex;
    snapshots.push(binding);
  }

  if (sourceArgumentCount !== undefined && expectedSourceArgumentIndex !== sourceArgumentCount) {
    throw new Error(`Invalid SourceSelectedCallArgumentBinding array at '${formatSnapshotPath(path)}': bindings cover ${expectedSourceArgumentIndex} authored source arguments, expected ${sourceArgumentCount}.`);
  }
  return Object.freeze(snapshots);
}

function snapshotSelectedCallArgumentBinding(
  binding: SourceSelectedCallArgumentBinding,
  path: SnapshotPath,
): SourceSelectedCallArgumentBinding {
  assertRecord(binding, "SourceSelectedCallArgumentBinding", path);
  binding = captureExactOwnFields(binding, [
    "sourceArgumentIndex",
    "effectiveArgumentIndex",
    "sourceForm",
    "spreadElementIndex",
    "sourceParameterIndex",
    "sourceParameterForm",
    "selectedArgumentType",
    "selectedParameterType",
  ], "SourceSelectedCallArgumentBinding", path);
  const sourceArgumentIndex = binding.sourceArgumentIndex;
  const effectiveArgumentIndex = binding.effectiveArgumentIndex;
  const sourceForm = binding.sourceForm;
  const spreadElementIndex = binding.spreadElementIndex;
  const sourceParameterIndex = binding.sourceParameterIndex;
  const sourceParameterForm = binding.sourceParameterForm;
  const selectedArgumentType = binding.selectedArgumentType;
  const selectedParameterType = binding.selectedParameterType;
  assertNonNegativeInteger(sourceArgumentIndex, "SourceSelectedCallArgumentBinding sourceArgumentIndex", childSnapshotPath(path, "sourceArgumentIndex"));
  assertNonNegativeInteger(effectiveArgumentIndex, "SourceSelectedCallArgumentBinding effectiveArgumentIndex", childSnapshotPath(path, "effectiveArgumentIndex"));
  assertCallConversionSourceForm(sourceForm, childSnapshotPath(path, "sourceForm"));
  if (sourceForm === "spread-element") {
    assertNonNegativeInteger(spreadElementIndex, "SourceSelectedCallArgumentBinding spreadElementIndex", childSnapshotPath(path, "spreadElementIndex"));
  } else if (spreadElementIndex !== undefined) {
    throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(path)}': spreadElementIndex is valid only for spread-element source form.`);
  }
  assertNonNegativeInteger(sourceParameterIndex, "SourceSelectedCallArgumentBinding sourceParameterIndex", childSnapshotPath(path, "sourceParameterIndex"));
  assertSourceCallParameterForm(sourceParameterForm, childSnapshotPath(path, "sourceParameterForm"));
  if ((sourceForm === "spread-sequence") !== (sourceParameterForm === "rest-sequence")) {
    throw new Error(`Invalid SourceSelectedCallArgumentBinding at '${formatSnapshotPath(path)}': spread-sequence source form and rest-sequence parameter form must occur together.`);
  }
  assertOpaqueIdentitySubject(selectedArgumentType, "SourceSelectedCallArgumentBinding selectedArgumentType", childSnapshotPath(path, "selectedArgumentType"));
  assertOpaqueIdentitySubject(selectedParameterType, "SourceSelectedCallArgumentBinding selectedParameterType", childSnapshotPath(path, "selectedParameterType"));
  return Object.freeze({
    sourceArgumentIndex,
    effectiveArgumentIndex,
    sourceForm,
    ...(spreadElementIndex === undefined ? {} : { spreadElementIndex }),
    sourceParameterIndex,
    sourceParameterForm,
    selectedArgumentType,
    selectedParameterType,
  });
}

function selectedCallArgumentBindingsEqual(
  left: SourceSelectedCallArgumentBinding,
  right: SourceSelectedCallArgumentBinding,
): boolean {
  return left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.effectiveArgumentIndex === right.effectiveArgumentIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.sourceParameterIndex === right.sourceParameterIndex
    && left.sourceParameterForm === right.sourceParameterForm
    && left.selectedArgumentType === right.selectedArgumentType
    && left.selectedParameterType === right.selectedParameterType;
}

function targetCallArgumentConversionSlotsEqual(
  left: TargetCallArgumentConversionSlot,
  right: TargetCallArgumentConversionSlot,
): boolean {
  return left.sourceArgumentIndex === right.sourceArgumentIndex
    && left.sourceForm === right.sourceForm
    && left.spreadElementIndex === right.spreadElementIndex
    && left.targetParameterIndex === right.targetParameterIndex
    && left.targetForm === right.targetForm;
}

function snapshotArgumentConversionSlots(
  slots: readonly TargetCallArgumentConversionSlot[],
  path: SnapshotPath,
  cache?: CheckedOperationRequestSnapshotCacheAccess,
): readonly TargetCallArgumentConversionSlot[] {
  const captured = captureArray(slots, "TargetCallArgumentConversionSlot array", path);
  const snapshots = captured.map((slot, index): TargetCallArgumentConversionSlot => {
    const slotPath = indexedSnapshotPath(path, index);
    if (canonicalTargetCallArgumentConversionSlots.has(slot)) {
      cache?.targetCallArgumentConversionSlots.set(slot, slot);
      return slot;
    }
    assertRecord(slot, "TargetCallArgumentConversionSlot", slotPath);
    const sourceSlotObject = slot;
    slot = captureExactOwnFields(slot, ["sourceArgumentIndex", "sourceForm", "spreadElementIndex", "targetParameterIndex", "targetForm"], "TargetCallArgumentConversionSlot", slotPath);
    const cached = cache?.targetCallArgumentConversionSlots.get(sourceSlotObject);
    const sourceArgumentIndex = slot.sourceArgumentIndex;
    const sourceForm = slot.sourceForm;
    const spreadElementIndex = slot.spreadElementIndex;
    const targetParameterIndex = slot.targetParameterIndex;
    const targetForm = slot.targetForm;
    assertNonNegativeInteger(sourceArgumentIndex, "TargetCallArgumentConversionSlot sourceArgumentIndex", childSnapshotPath(slotPath, "sourceArgumentIndex"));
    assertCallConversionSourceForm(sourceForm, childSnapshotPath(slotPath, "sourceForm"));
    assertNonNegativeInteger(targetParameterIndex, "TargetCallArgumentConversionSlot targetParameterIndex", childSnapshotPath(slotPath, "targetParameterIndex"));
    assertCallConversionTargetForm(targetForm, childSnapshotPath(slotPath, "targetForm"));
    if (sourceForm === "spread-element") {
      assertNonNegativeInteger(spreadElementIndex, "TargetCallArgumentConversionSlot spreadElementIndex", childSnapshotPath(slotPath, "spreadElementIndex"));
    } else if (spreadElementIndex !== undefined) {
      throw new Error(`Invalid TargetCallArgumentConversionSlot at '${formatSnapshotPath(slotPath)}': spreadElementIndex is valid only for spread-element source form.`);
    }
    const snapshot = Object.freeze({
      sourceArgumentIndex,
      sourceForm,
      ...(spreadElementIndex === undefined ? {} : { spreadElementIndex }),
      targetParameterIndex,
      targetForm,
    });
    canonicalTargetCallArgumentConversionSlots.add(snapshot);
    if (cached !== undefined) {
      if (!targetCallArgumentConversionSlotsEqual(cached, snapshot)) {
        throw new Error(`Invalid TargetCallArgumentConversionSlot at '${formatSnapshotPath(slotPath)}': source object changed after its reusable snapshot was committed.`);
      }
      return cached;
    }
    cache?.targetCallArgumentConversionSlots.set(sourceSlotObject, snapshot);
    cache?.targetCallArgumentConversionSlots.set(snapshot, snapshot);
    return snapshot;
  });
  snapshots.sort(compareTargetCallArgumentConversionSlots);
  return Object.freeze(snapshots);
}

function snapshotSignatureParameters(
  parameters: readonly SourceSelectedSignatureParameter[],
  path: SnapshotPath,
): readonly SourceSelectedSignatureParameter[] {
  const captured = captureArray(parameters, "SourceSelectedSignatureParameter array", path);
  return Object.freeze(captured.map((parameter, index) => snapshotSignatureParameter(
    parameter,
    indexedSnapshotPath(path, index),
  )));
}

function snapshotSignatureParameter(
  parameter: SourceSelectedSignatureParameter,
  path: SnapshotPath,
): SourceSelectedSignatureParameter {
  assertRecord(parameter, "SourceSelectedSignatureParameter", path);
  parameter = captureExactOwnFields(parameter, ["parameterIndex", "parameterName", "parameterSymbol", "parameterDeclaration", "selectedType", "authoredTypeNode", "acceptsOmission", "rest"], "SourceSelectedSignatureParameter", path);
  const parameterIndex = parameter.parameterIndex;
  const parameterName = parameter.parameterName;
  const parameterSymbol = parameter.parameterSymbol;
  const parameterDeclaration = parameter.parameterDeclaration;
  const selectedType = parameter.selectedType;
  const authoredTypeNode = parameter.authoredTypeNode;
  const acceptsOmission = parameter.acceptsOmission;
  const rest = parameter.rest;
  assertNonNegativeInteger(parameterIndex, "SourceSelectedSignatureParameter parameterIndex", childSnapshotPath(path, "parameterIndex"));
  assertString(parameterName, "SourceSelectedSignatureParameter parameterName", childSnapshotPath(path, "parameterName"));
  assertOpaqueIdentitySubject(parameterSymbol, "SourceSelectedSignatureParameter parameterSymbol", childSnapshotPath(path, "parameterSymbol"));
  if (parameterDeclaration !== undefined) {
    assertOpaqueIdentitySubject(parameterDeclaration, "SourceSelectedSignatureParameter parameterDeclaration", childSnapshotPath(path, "parameterDeclaration"));
  }
  assertOpaqueIdentitySubject(selectedType, "SourceSelectedSignatureParameter selectedType", childSnapshotPath(path, "selectedType"));
  if (authoredTypeNode !== undefined) {
    assertOpaqueIdentitySubject(authoredTypeNode, "SourceSelectedSignatureParameter authoredTypeNode", childSnapshotPath(path, "authoredTypeNode"));
  }
  assertBoolean(acceptsOmission, "SourceSelectedSignatureParameter acceptsOmission", childSnapshotPath(path, "acceptsOmission"));
  assertBoolean(rest, "SourceSelectedSignatureParameter rest", childSnapshotPath(path, "rest"));
  return Object.freeze({
    parameterIndex,
    parameterName,
    parameterSymbol,
    ...(parameterDeclaration === undefined ? {} : { parameterDeclaration }),
    selectedType,
    ...(authoredTypeNode === undefined ? {} : { authoredTypeNode }),
    acceptsOmission,
    rest,
  });
}

function snapshotEvidenceArray(evidence: readonly ExtensionEvidence[], path: SnapshotPath): readonly ExtensionEvidence[] {
  const captured = captureArray(evidence, "ExtensionEvidence array", path);
  const detailsState = path.budget.immutableDataState;
  return Object.freeze(captured.map((item, index) => {
    const itemPath = indexedSnapshotPath(path, index);
    assertRecord(item, "ExtensionEvidence", itemPath);
    item = captureExactOwnFields(item, ["message", "details"], "ExtensionEvidence", itemPath);
    const message = item.message;
    const details = item.details;
    assertString(message, "ExtensionEvidence message", childSnapshotPath(itemPath, "message"));
    return Object.freeze({
      message,
      ...(details === undefined ? {} : {
        details: snapshotImmutableData(details, childSnapshotPath(itemPath, "details"), detailsState),
      }),
    });
  }));
}

interface ImmutableDataSnapshotState {
  readonly active: WeakMap<object, SnapshotPath>;
  readonly completed: WeakMap<object, unknown>;
}

function createImmutableDataSnapshotState(): ImmutableDataSnapshotState {
  return {
    active: new WeakMap<object, SnapshotPath>(),
    completed: new WeakMap<object, unknown>(),
  };
}

function snapshotImmutableData(
  value: unknown,
  path: SnapshotPath,
  state: ImmutableDataSnapshotState,
): unknown {
  if (value === undefined || value === null || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(`Invalid immutable data at '${formatSnapshotPath(path)}': numbers must be finite.`);
    }
    return value;
  }
  if (typeof value === "string") {
    assertString(value, "immutable data string", path);
    return value;
  }
  if (typeof value !== "object") {
    throw new Error(`Invalid immutable data at '${formatSnapshotPath(path)}': expected undefined, null, boolean, finite number, string, array, or plain record.`);
  }
  const completed = state.completed.get(value);
  if (completed !== undefined) {
    return completed;
  }
  const firstPath = state.active.get(value);
  if (firstPath !== undefined) {
    throw new Error(`Invalid immutable data at '${formatSnapshotPath(path)}': cycle references '${formatSnapshotPath(firstPath)}'.`);
  }
  state.active.set(value, path);
  try {
    if (Array.isArray(value)) {
      const captured = captureArray(value, "immutable data array", path);
      const snapshot = Object.freeze(captured.map((entry, index) => snapshotImmutableData(
        entry,
        indexedSnapshotPath(path, index),
        state,
      )));
      state.completed.set(value, snapshot);
      return snapshot;
    }
    assertRecord(value, "immutable data record", path);
    const descriptors = path.budget.recordDescriptors.get(value);
    if (descriptors === undefined) {
      throw new Error(`Invalid immutable data record at '${formatSnapshotPath(path)}': record descriptors were not retained.`);
    }
    const snapshot = Object.create(null) as Record<string, unknown>;
    const keys = [...descriptors.keys()].sort();
    for (const key of keys) {
      const descriptor = descriptors.get(key);
      if (descriptor === undefined || !("value" in descriptor)) {
        throw new Error(`Invalid immutable data at '${formatSnapshotPath(childSnapshotPath(path, key))}': expected an enumerable data property.`);
      }
      Object.defineProperty(snapshot, key, {
        value: snapshotImmutableData(descriptor.value, childSnapshotPath(path, key), state),
        enumerable: true,
        configurable: false,
        writable: false,
      });
    }
    Object.freeze(snapshot);
    state.completed.set(value, snapshot);
    return snapshot;
  } finally {
    state.active.delete(value);
  }
}

function snapshotDiagnostic(diagnostic: ExtensionDiagnostic, path: SnapshotPath): ExtensionDiagnostic {
  const hostOwned = isHostOwnedExtensionDiagnostic(diagnostic);
  assertRecord(diagnostic, "ExtensionDiagnostic", path);
  diagnostic = captureExactOwnFields(diagnostic, ["extensionId", "extensionCode", "numericCode", "publicCode", "category", "message", "nodeOrSpan", "evidence", "identity"], "ExtensionDiagnostic", path);
  const extensionId = diagnostic.extensionId;
  const extensionCode = diagnostic.extensionCode;
  const numericCode = diagnostic.numericCode;
  const publicCode = diagnostic.publicCode;
  const category = diagnostic.category;
  const message = diagnostic.message;
  const nodeOrSpan = diagnostic.nodeOrSpan;
  const evidence = diagnostic.evidence;
  const identity = diagnostic.identity;
  assertString(extensionId, "ExtensionDiagnostic extensionId", childSnapshotPath(path, "extensionId"));
  assertString(extensionCode, "ExtensionDiagnostic extensionCode", childSnapshotPath(path, "extensionCode"));
  assertPositiveInteger(numericCode, "ExtensionDiagnostic numericCode", childSnapshotPath(path, "numericCode"));
  if (publicCode !== undefined) {
    assertString(publicCode, "ExtensionDiagnostic publicCode", childSnapshotPath(path, "publicCode"));
  }
  if (category !== "error" && category !== "warning" && category !== "suggestion") {
    throw invalidEnumValueError("ExtensionDiagnostic category", category, childSnapshotPath(path, "category"));
  }
  assertString(message, "ExtensionDiagnostic message", childSnapshotPath(path, "message"));
  const nodeOrSpanSnapshot = nodeOrSpan === undefined
    ? undefined
    : snapshotDiagnosticNodeOrSpan(nodeOrSpan, childSnapshotPath(path, "nodeOrSpan"));
  if (identity !== undefined) {
    assertString(identity, "ExtensionDiagnostic identity", childSnapshotPath(path, "identity"));
  }
  const snapshot = Object.freeze({
    extensionId,
    extensionCode,
    numericCode,
    ...(publicCode === undefined ? {} : { publicCode }),
    category,
    message,
    ...(nodeOrSpanSnapshot === undefined ? {} : { nodeOrSpan: nodeOrSpanSnapshot }),
    ...(evidence === undefined ? {} : {
      evidence: snapshotEvidenceArray(evidence, childSnapshotPath(path, "evidence")),
    }),
    ...(identity === undefined ? {} : { identity }),
  });
  return hostOwned ? markHostOwnedExtensionDiagnostic(snapshot) : snapshot;
}

function snapshotDiagnosticNodeOrSpan(value: unknown, path: SnapshotPath): object {
  assertOpaqueIdentitySubject(value, "ExtensionDiagnostic nodeOrSpan", path);
  if (!Reflect.has(value, "sourceFile")) {
    return value;
  }
  const keys = Reflect.ownKeys(value);
  if (keys.length !== 3 || !keys.includes("pos") || !keys.includes("end") || keys.some((key) => typeof key !== "string")) {
    throw new Error(`Invalid ExtensionDiagnosticSourceSpan at '${formatSnapshotPath(path)}': source spans must contain exactly sourceFile, pos, and end own data properties.`);
  }
  assertRecord(value, "ExtensionDiagnosticSourceSpan", path);
  const span = captureExactOwnFields(value as ExtensionDiagnosticSourceSpan, ["sourceFile", "pos", "end"], "ExtensionDiagnosticSourceSpan", path);
  assertOpaqueIdentitySubject(span.sourceFile, "ExtensionDiagnosticSourceSpan sourceFile", childSnapshotPath(path, "sourceFile"));
  assertNonNegativeInteger(span.pos, "ExtensionDiagnosticSourceSpan pos", childSnapshotPath(path, "pos"));
  assertNonNegativeInteger(span.end, "ExtensionDiagnosticSourceSpan end", childSnapshotPath(path, "end"));
  if (span.end < span.pos) {
    throw new Error(`Invalid ExtensionDiagnosticSourceSpan at '${formatSnapshotPath(path)}': end must not precede pos.`);
  }
  return Object.freeze({ sourceFile: span.sourceFile, pos: span.pos, end: span.end });
}

function createSnapshotPath(root: string): SnapshotPath {
  return {
    segment: root,
    depth: 0,
    budget: {
      objectCount: 0,
      targetTypeRefObjectCount: 0,
      arrayElementCount: 0,
      ownFieldCount: 0,
      scalarCodeUnits: 0,
      workUnits: 0,
      recordDescriptors: new WeakMap<object, ReadonlyMap<string, PropertyDescriptor>>(),
      arrayValues: new WeakMap<readonly unknown[], readonly unknown[]>(),
      targetTypeRefSnapshots: new WeakMap<object, TargetTypeRef>(),
      immutableDataState: createImmutableDataSnapshotState(),
      chargedObjects: new WeakSet<object>(),
      chargedTargetTypeRefObjects: new WeakSet<object>(),
      chargedOpaqueSubjects: new WeakSet<object>(),
    },
  };
}

function childSnapshotPath(parent: SnapshotPath, property: string): SnapshotPath {
  return nestedSnapshotPath(parent, `.${property}`);
}

function indexedSnapshotPath(parent: SnapshotPath, index: number): SnapshotPath {
  return nestedSnapshotPath(parent, `[${index}]`);
}

function nestedSnapshotPath(parent: SnapshotPath, segment: string): SnapshotPath {
  const depth = parent.depth + 1;
  if (parent.resourceClass !== "target-type-ref" && depth > snapshotLimits.maxDepth) {
    throw new Error(`Checked-operation snapshot exceeds maximum nesting depth ${snapshotLimits.maxDepth} at '${formatSnapshotPath(parent)}${segment}'.`);
  }
  chargeSnapshotWork(parent, 1, "path traversal");
  return {
    parent,
    segment,
    depth,
    budget: parent.budget,
    ...(parent.resourceClass === undefined ? {} : { resourceClass: parent.resourceClass }),
  };
}

function targetTypeRefSnapshotPath(path: SnapshotPath): SnapshotPath {
  return path.resourceClass === "target-type-ref"
    ? path
    : { ...path, resourceClass: "target-type-ref" };
}

function formatSnapshotPath(path: SnapshotPath): string {
  const segments: string[] = [];
  let current: SnapshotPath | undefined = path;
  while (current !== undefined) {
    segments.push(current.segment);
    current = current.parent;
  }
  segments.reverse();
  return segments.join("");
}

function assertRecord(value: unknown, valueName: string, path: SnapshotPath): asserts value is object {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected a non-array object.`);
  }
  if (path.budget.recordDescriptors.has(value)) {
    return;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected Object.prototype or null prototype.`);
  }
  chargeSnapshotObject(path, value, valueName);
  const descriptors = new Map<string, PropertyDescriptor>();
  const keys = Reflect.ownKeys(value);
  chargeSnapshotOwnFields(path, keys.length, valueName);
  for (const key of keys) {
    if (typeof key !== "string") {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': symbol fields are unsupported.`);
    }
    chargeSnapshotScalarCodeUnits(path, key.length, `${valueName} field name`);
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': own field '${key}' disappeared during snapshot validation.`);
    }
    if (!("value" in descriptor)) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': own field '${key}' must be a data property; accessors are unsupported.`);
    }
    if (!descriptor.enumerable) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': hidden own field '${key}' is unsupported.`);
    }
    descriptors.set(key, descriptor);
  }
  path.budget.recordDescriptors.set(value, descriptors);
}

function assertArray(value: unknown, valueName: string, path: SnapshotPath): asserts value is readonly unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected an array.`);
  }
  if (path.budget.arrayValues.has(value)) {
    return;
  }
  if (Object.getPrototypeOf(value) !== Array.prototype) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': array subclasses and custom array prototypes are unsupported.`);
  }
  chargeSnapshotObject(path, value, valueName);
  const keys = Reflect.ownKeys(value);
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
  if (lengthDescriptor === undefined || !("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value) || lengthDescriptor.value < 0) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': array length must be an own non-negative safe-integer data property.`);
  }
  const length = lengthDescriptor.value as number;
  chargeSnapshotArrayElements(path, length, valueName);
  if (keys.length !== length + 1) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': arrays must be dense and contain no extra or symbol fields.`);
  }
  const captured: unknown[] = [];
  for (let index = 0; index < length; index += 1) {
    const key = String(index);
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(indexedSnapshotPath(path, index))}': sparse array entries are unsupported.`);
    }
    if (!("value" in descriptor)) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(indexedSnapshotPath(path, index))}': array accessors are unsupported.`);
    }
    if (!descriptor.enumerable) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(indexedSnapshotPath(path, index))}': hidden array entries are unsupported.`);
    }
    captured.push(descriptor.value);
  }
  for (const key of keys) {
    if (typeof key !== "string") {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': symbol fields on arrays are unsupported.`);
    }
    if (key === "length") {
      continue;
    }
    const numericIndex = Number(key);
    if (!Number.isInteger(numericIndex) || numericIndex < 0 || numericIndex >= length || String(numericIndex) !== key) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': unsupported array field '${key}'.`);
    }
  }
  path.budget.arrayValues.set(value, Object.freeze(captured));
}

function captureArray<T>(value: readonly T[], valueName: string, path: SnapshotPath): readonly T[] {
  assertArray(value, valueName, path);
  const captured = path.budget.arrayValues.get(value);
  if (captured === undefined) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': validated array snapshot was not retained.`);
  }
  return captured as readonly T[];
}

function captureStringArray(value: readonly string[], valueName: string, path: SnapshotPath): readonly string[] {
  const captured = captureArray(value, valueName, path);
  for (let index = 0; index < captured.length; index += 1) {
    assertString(captured[index], `${valueName} entry`, indexedSnapshotPath(path, index));
  }
  return captured;
}

function captureOpaqueIdentitySubjectArray(
  value: readonly object[],
  valueName: string,
  path: SnapshotPath,
): readonly object[] {
  const captured = captureArray(value, valueName, path);
  for (let index = 0; index < captured.length; index += 1) {
    assertOpaqueIdentitySubject(captured[index], `${valueName} entry`, indexedSnapshotPath(path, index));
  }
  return captured;
}

function assertString(value: unknown, valueName: string, path: SnapshotPath): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected a string.`);
  }
  chargeSnapshotScalarCodeUnits(path, value.length, valueName);
}

function assertOptionalString(value: unknown, valueName: string, path: SnapshotPath): asserts value is string | undefined {
  if (value !== undefined) {
    assertString(value, valueName, path);
  }
}

function assertNonNegativeInteger(value: unknown, valueName: string, path: SnapshotPath): asserts value is number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected a non-negative safe integer.`);
  }
}

function assertPositiveInteger(value: unknown, valueName: string, path: SnapshotPath): asserts value is number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected a positive safe integer.`);
  }
}

function assertExactOwnFields(
  value: object,
  allowedFields: readonly string[],
  valueName: string,
  path: SnapshotPath,
): void {
  assertRecord(value, valueName, path);
  const allowed = new Set(allowedFields);
  const descriptors = path.budget.recordDescriptors.get(value);
  if (descriptors === undefined) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': record descriptors were not retained.`);
  }
  for (const field of descriptors.keys()) {
    if (!allowed.has(field)) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': unsupported field '${field}'.`);
    }
  }
}

function captureExactOwnFields<T extends object>(
  value: T,
  allowedFields: readonly string[],
  valueName: string,
  path: SnapshotPath,
): T {
  assertExactOwnFields(value, allowedFields, valueName, path);
  const descriptors = path.budget.recordDescriptors.get(value);
  if (descriptors === undefined) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': record descriptors were not retained.`);
  }
  const captured = Object.create(null) as Record<string, unknown>;
  for (const [field, descriptor] of descriptors) {
    if (!("value" in descriptor)) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(childSnapshotPath(path, field))}': expected a data property.`);
    }
    Object.defineProperty(captured, field, {
      value: descriptor.value,
      enumerable: true,
      configurable: false,
      writable: false,
    });
  }
  return Object.freeze(captured) as T;
}

function assertOpaqueIdentitySubject(value: unknown, valueName: string, path: SnapshotPath): asserts value is object {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected an opaque identity subject object.`);
  }
  if (!path.budget.chargedOpaqueSubjects.has(value)) {
    chargeSnapshotObject(path, value, valueName);
    path.budget.chargedOpaqueSubjects.add(value);
  }
}

function chargeSnapshotObject(path: SnapshotPath, value: object, valueName: string): void {
  if (path.resourceClass === "target-type-ref") {
    if (path.budget.chargedTargetTypeRefObjects.has(value)) {
      return;
    }
    path.budget.chargedTargetTypeRefObjects.add(value);
    path.budget.targetTypeRefObjectCount += 1;
    chargeSnapshotWork(path, 1, valueName);
    if (path.budget.targetTypeRefObjectCount > snapshotLimits.maxTargetTypeRefObjects) {
      throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': target type graph exceeds maximum object count ${snapshotLimits.maxTargetTypeRefObjects}.`);
    }
    return;
  }
  if (path.budget.chargedObjects.has(value)) {
    return;
  }
  path.budget.chargedObjects.add(value);
  path.budget.objectCount += 1;
  chargeSnapshotWork(path, 1, valueName);
  if (path.budget.objectCount > snapshotLimits.maxObjects) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': snapshot exceeds maximum object count ${snapshotLimits.maxObjects}.`);
  }
}

function chargeSnapshotArrayElements(path: SnapshotPath, count: number, valueName: string): void {
  if (count > snapshotLimits.maxArrayElements) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': array length ${count} exceeds per-array limit ${snapshotLimits.maxArrayElements}.`);
  }
  path.budget.arrayElementCount += count;
  chargeSnapshotWork(path, count, valueName);
  if (path.budget.arrayElementCount > snapshotLimits.maxArrayElements) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': snapshot exceeds aggregate array-entry limit ${snapshotLimits.maxArrayElements}.`);
  }
}

function chargeSnapshotOwnFields(path: SnapshotPath, count: number, valueName: string): void {
  path.budget.ownFieldCount += count;
  chargeSnapshotWork(path, count, valueName);
  if (path.budget.ownFieldCount > snapshotLimits.maxOwnFields) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': snapshot exceeds aggregate own-field limit ${snapshotLimits.maxOwnFields}.`);
  }
}

function chargeSnapshotScalarCodeUnits(path: SnapshotPath, count: number, valueName: string): void {
  path.budget.scalarCodeUnits += count;
  chargeSnapshotWork(path, count, valueName);
  if (path.budget.scalarCodeUnits > snapshotLimits.maxScalarCodeUnits) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': snapshot exceeds aggregate string-code-unit limit ${snapshotLimits.maxScalarCodeUnits}.`);
  }
}

function chargeSnapshotWork(path: SnapshotPath, count: number, valueName: string): void {
  path.budget.workUnits += count;
  if (path.budget.workUnits > snapshotLimits.maxWorkUnits) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': snapshot exceeds aggregate work-unit limit ${snapshotLimits.maxWorkUnits}.`);
  }
}

function assertCallConversionSourceForm(
  value: unknown,
  path: SnapshotPath,
): asserts value is "value" | "spread-element" | "spread-sequence" {
  if (value !== "value" && value !== "spread-element" && value !== "spread-sequence") {
    throw invalidEnumValueError("TargetCallArgumentConversionSlot sourceForm", value, path);
  }
}

function assertCallConversionTargetForm(
  value: unknown,
  path: SnapshotPath,
): asserts value is "parameter" | "params-element" | "params-sequence" {
  if (value !== "parameter" && value !== "params-element" && value !== "params-sequence") {
    throw invalidEnumValueError("TargetCallArgumentConversionSlot targetForm", value, path);
  }
}

function assertSourceCallParameterForm(
  value: unknown,
  path: SnapshotPath,
): asserts value is "parameter" | "rest-element" | "rest-sequence" {
  if (value !== "parameter" && value !== "rest-element" && value !== "rest-sequence") {
    throw invalidEnumValueError("SourceSelectedCallArgumentBinding sourceParameterForm", value, path);
  }
}

function compareTargetCallArgumentConversionSlots(
  left: TargetCallArgumentConversionSlot,
  right: TargetCallArgumentConversionSlot,
): number {
  const leftKey = targetCallArgumentConversionSlotSortKey(left);
  const rightKey = targetCallArgumentConversionSlotSortKey(right);
  for (let index = 0; index < leftKey.length; index += 1) {
    const difference = leftKey[index]! - rightKey[index]!;
    if (difference !== 0) {
      return difference;
    }
  }
  return 0;
}

function targetCallArgumentConversionSlotSortKey(slot: TargetCallArgumentConversionSlot): readonly number[] {
  const sourceFormRank = slot.sourceForm === "value"
    ? 0
    : slot.sourceForm === "spread-element"
      ? 1
      : 2;
  const targetFormRank = slot.targetForm === "parameter"
    ? 0
    : slot.targetForm === "params-element"
      ? 1
      : 2;
  return [slot.sourceArgumentIndex, sourceFormRank, slot.spreadElementIndex ?? -1, slot.targetParameterIndex, targetFormRank];
}

function assertBoolean(value: unknown, valueName: string, path: SnapshotPath): asserts value is boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': expected a boolean.`);
  }
}

function readDiscriminant(value: object, valueName: string, path: SnapshotPath): string {
  return readOwnStringField(value, "kind", valueName, path);
}

function readOwnStringField(value: object, field: string, valueName: string, path: SnapshotPath): string {
  const fieldValue = readOwnDataField(value, field, valueName, path);
  if (typeof fieldValue !== "string") {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(childSnapshotPath(path, field))}': expected a string.`);
  }
  assertString(fieldValue, `${valueName} ${field}`, childSnapshotPath(path, field));
  return fieldValue;
}

function readOwnDataField(value: object, field: string, valueName: string, path: SnapshotPath): unknown {
  assertRecord(value, valueName, path);
  const descriptor = path.budget.recordDescriptors.get(value)?.get(field);
  if (descriptor === undefined || !("value" in descriptor)) {
    throw new Error(`Invalid ${valueName} at '${formatSnapshotPath(childSnapshotPath(path, field))}': expected an own data property.`);
  }
  return descriptor.value;
}

function unknownKindError(valueName: string, kind: string, path: SnapshotPath): Error {
  return new Error(`Invalid ${valueName} at '${formatSnapshotPath(path)}': unknown kind '${kind}'.`);
}

function assertTargetOperationKind(value: unknown, path: SnapshotPath): asserts value is TargetOperationProposal["operationKind"] {
  switch (value) {
    case "property":
    case "method":
    case "indexer":
    case "operator":
    case "constructor":
    case "iteration":
      return;
    default:
      throw new Error(
        typeof value === "string"
          ? `Invalid TargetOperationProposal operationKind at '${formatSnapshotPath(path)}': unknown kind '${value}'.`
          : `Invalid TargetOperationProposal operationKind at '${formatSnapshotPath(path)}': expected a string.`,
      );
  }
}

function assertTargetMemberKind(value: unknown, path: SnapshotPath): asserts value is TargetMember["kind"] {
  switch (value) {
    case "method":
    case "constructor":
    case "property":
    case "field":
    case "indexer":
    case "event":
    case "operator":
      return;
    default:
      throw invalidEnumValueError("TargetMember kind", value, path);
  }
}

function assertCanonicalIdentityKind(value: unknown, path: SnapshotPath): asserts value is ExtensionCanonicalIdentity["kind"] {
  switch (value) {
    case "module":
    case "package":
    case "export":
    case "local-alias":
    case "symbol":
    case "type":
    case "signature":
    case "instantiated-type":
      return;
    default:
      throw invalidEnumValueError("ExtensionCanonicalIdentity kind", value, path);
  }
}

function assertExtensionImportKind(value: unknown, path: SnapshotPath): asserts value is NonNullable<ExtensionCanonicalIdentity["importKind"]> {
  switch (value) {
    case "type":
    case "value":
    case "namespace":
    case "unknown":
      return;
    default:
      throw invalidEnumValueError("ExtensionCanonicalIdentity importKind", value, path);
  }
}

function assertSourcePrimitiveRuntimeBase(value: unknown, path: SnapshotPath): asserts value is SourcePrimitiveFact["runtimeBase"] {
  switch (value) {
    case "boolean":
    case "number":
    case "bigint":
    case "string":
    case "object":
      return;
    default:
      throw invalidEnumValueError("SourcePrimitiveFact runtimeBase", value, path);
  }
}

function assertSourcePointerMutability(value: unknown, path: SnapshotPath): asserts value is PointerFact["mutability"] {
  switch (value) {
    case "readonly":
    case "readwrite":
    case "target-defined":
      return;
    default:
      throw invalidEnumValueError("PointerFact mutability", value, path);
  }
}

function assertTargetBindingKind(value: unknown, path: SnapshotPath): asserts value is TargetBindingFact["kind"] {
  switch (value) {
    case "class":
    case "struct":
    case "interface":
    case "trait":
    case "enum":
    case "delegate":
    case "function":
    case "opaque":
      return;
    default:
      throw invalidEnumValueError("TargetBindingFact kind", value, path);
  }
}

function assertFlowState(value: unknown, path: SnapshotPath): asserts value is FlowStateFact["state"] {
  switch (value) {
    case "moved":
    case "borrowed-shared":
    case "borrowed-mut":
    case "initialized":
    case "uninitialized":
    case "target-validation-required":
      return;
    default:
      throw invalidEnumValueError("FlowStateFact state", value, path);
  }
}

function assertArgumentPassingMode(value: unknown, path: SnapshotPath): asserts value is TargetParameter["passingMode"] {
  switch (value) {
    case "by-value":
    case "byref-readonly":
    case "byref-readwrite":
    case "byref-writeonly-must-init":
    case "borrow-shared":
    case "borrow-mut":
    case "move":
      return;
    default:
      throw invalidEnumValueError("TargetParameter passingMode", value, path);
  }
}

function assertTargetTypeParameterVariance(value: unknown, path: SnapshotPath): asserts value is NonNullable<TargetTypeParameter["variance"]> {
  switch (value) {
    case "in":
    case "out":
    case "invariant":
    case "target-defined":
      return;
    default:
      throw invalidEnumValueError("TargetTypeParameter variance", value, path);
  }
}

function assertPointerMutability(value: unknown, path: SnapshotPath): asserts value is "const" | "mut" | "target-defined" {
  switch (value) {
    case "const":
    case "mut":
    case "target-defined":
      return;
    default:
      throw invalidEnumValueError("TargetTypeRef pointer mutability", value, path);
  }
}

function assertSourcePrimitiveKind(value: unknown, path: SnapshotPath): void {
  switch (value) {
    case "bool":
    case "char":
    case "int8":
    case "uint8":
    case "int16":
    case "uint16":
    case "int32":
    case "uint32":
    case "int64":
    case "uint64":
    case "native-int":
    case "native-uint":
    case "float16":
    case "float32":
    case "float64":
    case "decimal":
    case "int128":
    case "uint128":
      return;
    default:
      throw invalidEnumValueError("TargetTypeRef source primitive name", value, path);
  }
}

function assertProviderWellKnownSymbolName(value: string, path: SnapshotPath): asserts value is ProviderWellKnownSymbolName {
  switch (value) {
    case "asyncIterator":
    case "hasInstance":
    case "isConcatSpreadable":
    case "iterator":
    case "match":
    case "matchAll":
    case "replace":
    case "search":
    case "species":
    case "split":
    case "toPrimitive":
    case "toStringTag":
    case "unscopables":
      return;
    default:
      throw invalidEnumValueError("ProviderMemberKey well-known symbol name", value, path);
  }
}

function invalidEnumValueError(valueName: string, value: unknown, path: SnapshotPath): Error {
  return new Error(
    typeof value === "string"
      ? `Invalid ${valueName} at '${formatSnapshotPath(path)}': unknown value '${value}'.`
      : `Invalid ${valueName} at '${formatSnapshotPath(path)}': expected a string.`,
  );
}
