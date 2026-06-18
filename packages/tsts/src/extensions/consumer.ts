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

  getFacts(subject: ExtensionFactSubject): readonly ExtensionFactEntry<unknown>[] {
    return this.#host.getFactsForConsumer(this.#consumer, subject);
  }

  getSourcePrimitiveFact(subject: ExtensionFactSubject): SourcePrimitiveFact | undefined {
    return this.getFact(subject, sourcePrimitiveFactKey);
  }

  getTargetBindingFact(subject: ExtensionFactSubject): TargetBindingFact | undefined {
    return this.getFact(subject, targetBindingFactKey);
  }

  getSelectedTargetCall(subject: ExtensionFactSubject): SelectedTargetSignatureFact | undefined {
    return this.getFact(subject, selectedTargetSignatureFactKey);
  }

  getSelectedTargetProperty(subject: ExtensionFactSubject): SurfaceOperationFact | undefined {
    return this.getFact(subject, surfaceOperationFactKey);
  }

  getSelectedTargetElementAccess(subject: ExtensionFactSubject): SurfaceOperationFact | undefined {
    return this.getFact(subject, surfaceOperationFactKey);
  }

  getSelectedTargetOperator(subject: ExtensionFactSubject): SurfaceOperationFact | undefined {
    return this.getFact(subject, surfaceOperationFactKey);
  }

  getRuntimeCarrierFact(subject: ExtensionFactSubject): RuntimeCarrierFact | undefined {
    return this.getFact(subject, runtimeCarrierFactKey);
  }

  getArgumentPassingFact(subject: ExtensionFactSubject): ArgumentPassingFact | undefined {
    return this.getFact(subject, argumentPassingFactKey);
  }

  getVirtualDeclaration(subject: ExtensionFactSubject): ProviderVirtualDeclarationFact | undefined {
    return this.getFact(subject, providerVirtualDeclarationFactKey);
  }
}

export function createExtensionConsumerQueries(host: ExtensionHost, consumer: string): ExtensionConsumerQueries {
  return new ExtensionConsumerQueries(host, consumer);
}
