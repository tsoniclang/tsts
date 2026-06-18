import {
  argumentPassingFactKey,
  providerVirtualDeclarationFactKey,
  runtimeCarrierFactKey,
  selectedTargetSignatureFactKey,
  sourcePrimitiveFactKey,
  surfaceOperationFactKey,
  targetBindingFactKey,
} from "./facts.js";
import type {
  ArgumentPassingFact,
  ProviderVirtualDeclarationFact,
  RuntimeCarrierFact,
  SelectedTargetSignatureFact,
  SourcePrimitiveFact,
  SurfaceOperationFact,
  TargetBindingFact,
} from "./facts.js";
import type { ExtensionFactEntry, ExtensionFactKey, ExtensionFactSubject, ExtensionHost } from "./host.js";

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

  getArgumentPassingFact(subject: ExtensionFactSubject): ArgumentPassingFact | undefined {
    return this.getFact(subject, argumentPassingFactKey);
  }

  requireArgumentPassingFact(subject: ExtensionFactSubject, purpose?: string): ArgumentPassingFact | undefined {
    return this.requireFact(subject, argumentPassingFactKey, purpose);
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
