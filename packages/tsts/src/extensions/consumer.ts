import {
  argumentPassingFactKey,
  associatedTypeFactKey,
  attributeFactKey,
  contextualTargetTypeFactKey,
  constGenericFactKey,
  defaultValueFactKey,
  fieldFactKey,
  functionPointerFactKey,
  instantiatedTargetTypeFactKey,
  providerVirtualDeclarationFactKey,
  pointerFactKey,
  runtimeCarrierFactKey,
  selectedTargetSignatureFactKey,
  sourcePrimitiveFactKey,
  structFactKey,
  surfaceOperationFactKey,
  targetConversionFactKey,
  targetBindingFactKey,
} from "./facts.js";
import type {
  ArgumentPassingFact,
  AssociatedTypeFact,
  AttributeFact,
  ContextualTargetTypeFact,
  ConstGenericFact,
  DefaultValueFact,
  FieldFact,
  FunctionPointerFact,
  InstantiatedTargetTypeFact,
  PointerFact,
  ProviderVirtualDeclarationFact,
  RuntimeCarrierFact,
  SelectedTargetSignatureFact,
  SourcePrimitiveFact,
  StructFact,
  SurfaceOperationFact,
  TargetConversionFact,
  TargetBindingFact,
} from "./facts.js";
import type { ExtensionFactEntry, ExtensionFactKey, ExtensionFactSubject, ExtensionHost, ProviderVirtualDeclarationDocument } from "./host.js";

export class ExtensionConsumerQueries {
  readonly #host: ExtensionHost;
  readonly #consumer: string;

  constructor(host: ExtensionHost, consumer: string) {
    this.#host = host;
    this.#consumer = consumer;
  }

  getFact<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>): T | undefined {
    return this.#host.getFactForConsumer(this.#consumer, subject, key);
  }

  requireFact<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>, purpose?: string): T | undefined {
    return this.#host.requireFactForConsumer(this.#consumer, subject, key, purpose);
  }

  getFacts(subject: ExtensionFactSubject): readonly ExtensionFactEntry<unknown>[] {
    return this.#host.getFactsForConsumer(this.#consumer, subject);
  }

  getVirtualDeclarationDocument(uriOrFileName: string): ProviderVirtualDeclarationDocument | undefined {
    return this.#host.getVirtualDeclarationDocumentForConsumer(this.#consumer, uriOrFileName);
  }

  getSourcePrimitiveFact(subject: ExtensionFactSubject): SourcePrimitiveFact | undefined {
    return this.getFact(subject, sourcePrimitiveFactKey);
  }

  requireSourcePrimitiveFact(subject: ExtensionFactSubject, purpose?: string): SourcePrimitiveFact | undefined {
    return this.requireFact(subject, sourcePrimitiveFactKey, purpose);
  }

  getTargetBindingFact(subject: ExtensionFactSubject): TargetBindingFact | undefined {
    return this.getFact(subject, targetBindingFactKey);
  }

  requireTargetBindingFact(subject: ExtensionFactSubject, purpose?: string): TargetBindingFact | undefined {
    return this.requireFact(subject, targetBindingFactKey, purpose);
  }

  getSelectedTargetCall(subject: ExtensionFactSubject): SelectedTargetSignatureFact | undefined {
    return this.getFact(subject, selectedTargetSignatureFactKey);
  }

  requireSelectedTargetCall(subject: ExtensionFactSubject, purpose?: string): SelectedTargetSignatureFact | undefined {
    return this.requireFact(subject, selectedTargetSignatureFactKey, purpose);
  }

  getContextualTargetTypeFact(subject: ExtensionFactSubject): ContextualTargetTypeFact | undefined {
    return this.getFact(subject, contextualTargetTypeFactKey);
  }

  requireContextualTargetTypeFact(subject: ExtensionFactSubject, purpose?: string): ContextualTargetTypeFact | undefined {
    return this.requireFact(subject, contextualTargetTypeFactKey, purpose);
  }

  getSelectedTargetProperty(subject: ExtensionFactSubject): SurfaceOperationFact | undefined {
    return this.getFact(subject, surfaceOperationFactKey);
  }

  requireSelectedTargetProperty(subject: ExtensionFactSubject, purpose?: string): SurfaceOperationFact | undefined {
    return this.requireFact(subject, surfaceOperationFactKey, purpose);
  }

  getSelectedTargetElementAccess(subject: ExtensionFactSubject): SurfaceOperationFact | undefined {
    return this.getFact(subject, surfaceOperationFactKey);
  }

  requireSelectedTargetElementAccess(subject: ExtensionFactSubject, purpose?: string): SurfaceOperationFact | undefined {
    return this.requireFact(subject, surfaceOperationFactKey, purpose);
  }

  getSelectedTargetOperator(subject: ExtensionFactSubject): SurfaceOperationFact | undefined {
    return this.getFact(subject, surfaceOperationFactKey);
  }

  requireSelectedTargetOperator(subject: ExtensionFactSubject, purpose?: string): SurfaceOperationFact | undefined {
    return this.requireFact(subject, surfaceOperationFactKey, purpose);
  }

  getRuntimeCarrierFact(subject: ExtensionFactSubject): RuntimeCarrierFact | undefined {
    return this.getFact(subject, runtimeCarrierFactKey);
  }

  requireRuntimeCarrierFact(subject: ExtensionFactSubject, purpose?: string): RuntimeCarrierFact | undefined {
    return this.requireFact(subject, runtimeCarrierFactKey, purpose);
  }

  getTargetConversionFact(subject: ExtensionFactSubject): TargetConversionFact | undefined {
    return this.getFact(subject, targetConversionFactKey);
  }

  requireTargetConversionFact(subject: ExtensionFactSubject, purpose?: string): TargetConversionFact | undefined {
    return this.requireFact(subject, targetConversionFactKey, purpose);
  }

  getArgumentPassingFact(subject: ExtensionFactSubject): ArgumentPassingFact | undefined {
    return this.getFact(subject, argumentPassingFactKey);
  }

  requireArgumentPassingFact(subject: ExtensionFactSubject, purpose?: string): ArgumentPassingFact | undefined {
    return this.requireFact(subject, argumentPassingFactKey, purpose);
  }

  getFunctionPointerFact(subject: ExtensionFactSubject): FunctionPointerFact | undefined {
    return this.getFact(subject, functionPointerFactKey);
  }

  requireFunctionPointerFact(subject: ExtensionFactSubject, purpose?: string): FunctionPointerFact | undefined {
    return this.requireFact(subject, functionPointerFactKey, purpose);
  }

  getPointerFact(subject: ExtensionFactSubject): PointerFact | undefined {
    return this.getFact(subject, pointerFactKey);
  }

  requirePointerFact(subject: ExtensionFactSubject, purpose?: string): PointerFact | undefined {
    return this.requireFact(subject, pointerFactKey, purpose);
  }

  getStructFact(subject: ExtensionFactSubject): StructFact | undefined {
    return this.getFact(subject, structFactKey);
  }

  requireStructFact(subject: ExtensionFactSubject, purpose?: string): StructFact | undefined {
    return this.requireFact(subject, structFactKey, purpose);
  }

  getFieldFact(subject: ExtensionFactSubject): FieldFact | undefined {
    return this.getFact(subject, fieldFactKey);
  }

  requireFieldFact(subject: ExtensionFactSubject, purpose?: string): FieldFact | undefined {
    return this.requireFact(subject, fieldFactKey, purpose);
  }

  getAttributeFact(subject: ExtensionFactSubject): AttributeFact | undefined {
    return this.getFact(subject, attributeFactKey);
  }

  requireAttributeFact(subject: ExtensionFactSubject, purpose?: string): AttributeFact | undefined {
    return this.requireFact(subject, attributeFactKey, purpose);
  }

  getDefaultValueFact(subject: ExtensionFactSubject): DefaultValueFact | undefined {
    return this.getFact(subject, defaultValueFactKey);
  }

  requireDefaultValueFact(subject: ExtensionFactSubject, purpose?: string): DefaultValueFact | undefined {
    return this.requireFact(subject, defaultValueFactKey, purpose);
  }

  getInstantiatedTargetTypeFact(subject: ExtensionFactSubject): InstantiatedTargetTypeFact | undefined {
    return this.getFact(subject, instantiatedTargetTypeFactKey);
  }

  requireInstantiatedTargetTypeFact(subject: ExtensionFactSubject, purpose?: string): InstantiatedTargetTypeFact | undefined {
    return this.requireFact(subject, instantiatedTargetTypeFactKey, purpose);
  }

  getAssociatedTypeFact(subject: ExtensionFactSubject): AssociatedTypeFact | undefined {
    return this.getFact(subject, associatedTypeFactKey);
  }

  requireAssociatedTypeFact(subject: ExtensionFactSubject, purpose?: string): AssociatedTypeFact | undefined {
    return this.requireFact(subject, associatedTypeFactKey, purpose);
  }

  getConstGenericFact(subject: ExtensionFactSubject): ConstGenericFact | undefined {
    return this.getFact(subject, constGenericFactKey);
  }

  requireConstGenericFact(subject: ExtensionFactSubject, purpose?: string): ConstGenericFact | undefined {
    return this.requireFact(subject, constGenericFactKey, purpose);
  }

  getVirtualDeclaration(subject: ExtensionFactSubject): ProviderVirtualDeclarationFact | undefined {
    return this.getFact(subject, providerVirtualDeclarationFactKey);
  }

  requireVirtualDeclaration(subject: ExtensionFactSubject, purpose?: string): ProviderVirtualDeclarationFact | undefined {
    return this.requireFact(subject, providerVirtualDeclarationFactKey, purpose);
  }
}

export function createExtensionConsumerQueries(host: ExtensionHost, consumer: string): ExtensionConsumerQueries {
  return new ExtensionConsumerQueries(host, consumer);
}
