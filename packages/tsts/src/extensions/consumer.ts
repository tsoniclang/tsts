import {
  argumentPassingFactKey,
  associatedTypeFactKey,
  attributeFactKey,
  canonicalIdentityFactKey,
  constGenericFactKey,
  defaultValueFactKey,
  fieldFactKey,
  flowStateFactKey,
  functionPointerFactKey,
  pointerFactKey,
  providerTypeFamilyFactKey,
  providerVirtualDeclarationFactKey,
  sourcePrimitiveFactKey,
  structFactKey,
} from "./facts.js";
import type {
  ArgumentPassingFact,
  AssociatedTypeFact,
  AttributeFact,
  ConstGenericFact,
  DefaultValueFact,
  ExtensionCanonicalIdentity,
  FieldFact,
  FlowStateFact,
  FunctionPointerFact,
  PointerFact,
  ProviderTypeFamilyFact,
  ProviderVirtualDeclarationFact,
  SourcePrimitiveFact,
  StructFact,
} from "./facts.js";
import type {
  ExtensionFactEntry,
  ExtensionFactKey,
  ExtensionFactSubject,
  ExtensionHost,
  ProviderVirtualDeclarationDocument,
} from "./host.js";

export interface ReadonlySourceFactResolver {
  getFact<T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>): T | undefined;
  requireFact<T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>, purpose?: string): T | undefined;
  mustFact<T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>, purpose?: string): T;
  getFacts(subject: ExtensionFactSubject | undefined): readonly ExtensionFactEntry<unknown>[];
  getVirtualDeclarationDocument(uriOrFileName: string): ProviderVirtualDeclarationDocument | undefined;
}

export class SourceFactQueries implements ReadonlySourceFactResolver {
  readonly #host: ExtensionHost;
  readonly #consumer: string;

  constructor(host: ExtensionHost, consumer: string) {
    this.#host = host;
    this.#consumer = consumer;
  }

  getFact<T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>): T | undefined {
    return this.#host.getFactForConsumer(this.#consumer, subject, key);
  }

  requireFact<T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>, purpose?: string): T | undefined {
    return this.#host.requireFactForConsumer(this.#consumer, subject, key, purpose);
  }

  mustFact<T>(subject: ExtensionFactSubject | undefined, key: ExtensionFactKey<T>, purpose?: string): T {
    return this.#host.mustFactForConsumer(this.#consumer, subject, key, purpose);
  }

  getFacts(subject: ExtensionFactSubject | undefined): readonly ExtensionFactEntry<unknown>[] {
    return this.#host.getFactsForConsumer(this.#consumer, subject);
  }

  getVirtualDeclarationDocument(uriOrFileName: string): ProviderVirtualDeclarationDocument | undefined {
    return this.#host.getVirtualDeclarationDocumentForConsumer(this.#consumer, uriOrFileName);
  }

  getCanonicalIdentity(subject: ExtensionFactSubject | undefined): ExtensionCanonicalIdentity | undefined {
    return this.getFact(subject, canonicalIdentityFactKey);
  }

  getSourcePrimitive(subject: ExtensionFactSubject | undefined): SourcePrimitiveFact | undefined {
    return this.getFact(subject, sourcePrimitiveFactKey);
  }

  getArgumentPassing(subject: ExtensionFactSubject | undefined): ArgumentPassingFact | undefined {
    return this.getFact(subject, argumentPassingFactKey);
  }

  getFunctionPointer(subject: ExtensionFactSubject | undefined): FunctionPointerFact | undefined {
    return this.getFact(subject, functionPointerFactKey);
  }

  getPointer(subject: ExtensionFactSubject | undefined): PointerFact | undefined {
    return this.getFact(subject, pointerFactKey);
  }

  getStruct(subject: ExtensionFactSubject | undefined): StructFact | undefined {
    return this.getFact(subject, structFactKey);
  }

  getField(subject: ExtensionFactSubject | undefined): FieldFact | undefined {
    return this.getFact(subject, fieldFactKey);
  }

  getFlowState(subject: ExtensionFactSubject | undefined): FlowStateFact | undefined {
    return this.getFact(subject, flowStateFactKey);
  }

  getAttribute(subject: ExtensionFactSubject | undefined): AttributeFact | undefined {
    return this.getFact(subject, attributeFactKey);
  }

  getDefaultValue(subject: ExtensionFactSubject | undefined): DefaultValueFact | undefined {
    return this.getFact(subject, defaultValueFactKey);
  }

  getAssociatedType(subject: ExtensionFactSubject | undefined): AssociatedTypeFact | undefined {
    return this.getFact(subject, associatedTypeFactKey);
  }

  getConstGeneric(subject: ExtensionFactSubject | undefined): ConstGenericFact | undefined {
    return this.getFact(subject, constGenericFactKey);
  }

  getProviderDeclaration(subject: ExtensionFactSubject | undefined): ProviderVirtualDeclarationFact | undefined {
    return this.getFact(subject, providerVirtualDeclarationFactKey);
  }

  getProviderTypeFamily(subject: ExtensionFactSubject | undefined): ProviderTypeFamilyFact | undefined {
    return this.getFact(subject, providerTypeFamilyFactKey);
  }
}

export function createSourceFactQueries(host: ExtensionHost, consumer: string): SourceFactQueries {
  return new SourceFactQueries(host, consumer);
}
