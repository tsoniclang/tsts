export type ExtensionDiagnosticCategory = "error" | "warning" | "suggestion";

export type ExtensionFactSubject = object | string | number | bigint | boolean | symbol | null | undefined;

import type { ExtensionDecision, ExtensionDecisionHook, ExtensionDecisionResult, ExtensionDecisionRunOptions } from "./decisions.js";

export interface ExtensionEvidence {
  readonly message: string;
  readonly details?: unknown;
}

export interface ExtensionDiagnostic {
  readonly extensionId: string;
  readonly extensionCode: string;
  readonly numericCode: number;
  readonly publicCode?: string;
  readonly category: ExtensionDiagnosticCategory;
  readonly message: string;
  readonly nodeOrSpan?: unknown;
  readonly evidence?: readonly ExtensionEvidence[];
  readonly identity?: string;
}

export const ExtensionHostDiagnosticCode = {
  factConflict: 9000001,
  duplicateExtension: 9000002,
  missingDependency: 9000003,
  dependencyCycle: 9000004,
  decisionOwnerConflict: 9000005,
  decisionOwnerMissing: 9000006,
  initializationFailed: 9000007,
  factStoreSealed: 9000008,
  consumerBeforeFinalization: 9000009,
  invalidMetadata: 9000010,
  decisionOwnerDeferred: 9000011,
  decisionConflict: 9000012,
} as const;

export interface CompilerExtensionIdentity {
  readonly id: string;
  readonly version: string;
  readonly capabilityNamespace: string;
}

export interface ExtensionDependencySpec {
  readonly dependsOn?: readonly string[];
  readonly runsAfter?: readonly string[];
}

export interface ExtensionCapabilitySpec {
  readonly provides?: readonly string[];
  readonly requires?: readonly string[];
}

export interface CompilerExtension {
  readonly identity: CompilerExtensionIdentity;
  readonly dependencies?: ExtensionDependencySpec;
  readonly capabilities?: ExtensionCapabilitySpec;
  readonly decisionOwners?: readonly string[];
  readonly initialize?: (context: ExtensionInitializeContext) => void;
}

export interface ExtensionInitializeContext {
  readonly host: ExtensionHost;
  readonly facts: ExtensionFactStore;
  readonly factResolver: ExtensionFactResolver;
  readonly diagnostics: ExtensionDiagnosticStore;
  readonly metadata: ExtensionMetadataRegistry;
  readonly registerDecisionOwner: (question: string, extensionId: string) => void;
  readonly registerDecisionHook: <TRequest, TResult>(question: string, hook: ExtensionDecisionHook<TRequest, TResult>) => void;
}

export interface ExtensionFactKey<T> {
  readonly extensionId: string;
  readonly name: string;
  readonly id: string;
  readonly equals: (left: T, right: T) => boolean;
}

export interface ExtensionFactKeyOptions<T> {
  readonly extensionId: string;
  readonly name: string;
  readonly equals?: (left: T, right: T) => boolean;
}

export interface ExtensionFactEntry<T> {
  readonly key: ExtensionFactKey<T>;
  readonly value: T;
  readonly evidence: readonly ExtensionEvidence[];
}

export type ExtensionFactWriteResult = "inserted" | "idempotent" | "conflict" | "sealed";

export interface ExtensionFactResolution<T> {
  readonly value: T;
  readonly evidence?: readonly ExtensionEvidence[];
}

export type ExtensionFactResolverCallback<T> = (subject: ExtensionFactSubject, context: ExtensionFactResolverContext) => ExtensionFactResolution<T> | undefined;

export interface ExtensionFactResolverContext {
  readonly facts: ExtensionFactStore;
  readonly diagnostics: ExtensionDiagnosticStore;
}

export interface TargetBindingMetadataHeader {
  readonly schema: string;
  readonly schemaVersion: string;
  readonly producer: string;
  readonly producerVersion: string;
  readonly target: string;
  readonly packageName: string;
  readonly packageVersion: string;
  readonly extensionContractVersion: string;
}

export interface ExtensionHostOptions {
  readonly extensions?: readonly CompilerExtension[];
  readonly supportedMetadataSchemas?: readonly string[];
}

interface RegisteredDecisionHook {
  readonly extensionId: string;
  readonly hook: ExtensionDecisionHook<unknown, unknown>;
}

export interface ExtendedProgram<TProgram extends object = object> {
  readonly program: TProgram;
  readonly extensionHost: ExtensionHost;
}

export function defineExtensionFactKey<T>(options: ExtensionFactKeyOptions<T>): ExtensionFactKey<T> {
  if (options.extensionId.length === 0) {
    throw new Error("Extension fact key requires a non-empty extension id.");
  }
  if (options.name.length === 0) {
    throw new Error("Extension fact key requires a non-empty name.");
  }
  return Object.freeze({
    extensionId: options.extensionId,
    name: options.name,
    id: `${options.extensionId}:${options.name}`,
    equals: options.equals ?? Object.is,
  });
}

export class ExtensionDiagnosticStore {
  readonly #diagnostics: ExtensionDiagnostic[] = [];
  readonly #identities = new Set<string>();

  append(diagnostic: ExtensionDiagnostic): boolean {
    const identity = getDiagnosticIdentity(diagnostic);
    if (this.#identities.has(identity)) {
      return false;
    }
    this.#identities.add(identity);
    this.#diagnostics.push(diagnostic);
    return true;
  }

  all(): readonly ExtensionDiagnostic[] {
    return this.#diagnostics;
  }

  hasErrors(): boolean {
    return this.#diagnostics.some((diagnostic) => diagnostic.category === "error");
  }
}

export class ExtensionFactStore {
  readonly #objectFacts = new WeakMap<object, Map<string, ExtensionFactEntry<unknown>>>();
  readonly #primitiveFacts = new Map<Exclude<ExtensionFactSubject, object>, Map<string, ExtensionFactEntry<unknown>>>();
  readonly #diagnostics: ExtensionDiagnosticStore;
  #sealed = false;

  constructor(diagnostics: ExtensionDiagnosticStore) {
    this.#diagnostics = diagnostics;
  }

  set<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>, value: T, evidence: readonly ExtensionEvidence[] = []): ExtensionFactWriteResult {
    if (this.#sealed) {
      this.#diagnostics.append(createHostDiagnostic({
        extensionCode: "FACT_STORE_SEALED",
        numericCode: ExtensionHostDiagnosticCode.factStoreSealed,
        message: `Cannot write extension fact '${key.id}' after semantic finalization.`,
        identity: `fact-store-sealed:${key.id}`,
      }));
      return "sealed";
    }

    const subjectFacts = this.#getOrCreateSubjectFacts(subject);
    const existing = subjectFacts.get(key.id) as ExtensionFactEntry<T> | undefined;
    if (existing === undefined) {
      subjectFacts.set(key.id, { key: key as ExtensionFactKey<unknown>, value, evidence });
      return "inserted";
    }

    if (key.equals(existing.value, value)) {
      return "idempotent";
    }

    this.#diagnostics.append(createHostDiagnostic({
      extensionCode: "FACT_CONFLICT",
      numericCode: ExtensionHostDiagnosticCode.factConflict,
      message: `Conflicting extension fact '${key.id}' for the same subject.`,
      evidence: [
        { message: "Existing fact", details: existing.value },
        { message: "Incoming fact", details: value },
      ],
      identity: `fact-conflict:${key.id}:${getSubjectIdentity(subject)}`,
    }));
    return "conflict";
  }

  get<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>): T | undefined {
    return this.getEntry(subject, key)?.value;
  }

  getEntry<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>): ExtensionFactEntry<T> | undefined {
    const subjectFacts = this.#getSubjectFacts(subject);
    return subjectFacts?.get(key.id) as ExtensionFactEntry<T> | undefined;
  }

  has<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>): boolean {
    return this.getEntry(subject, key) !== undefined;
  }

  entries(subject: ExtensionFactSubject): readonly ExtensionFactEntry<unknown>[] {
    return Array.from(this.#getSubjectFacts(subject)?.values() ?? []);
  }

  seal(): void {
    this.#sealed = true;
  }

  get sealed(): boolean {
    return this.#sealed;
  }

  #getSubjectFacts(subject: ExtensionFactSubject): Map<string, ExtensionFactEntry<unknown>> | undefined {
    if (typeof subject === "object" && subject !== null) {
      return this.#objectFacts.get(subject);
    }
    return this.#primitiveFacts.get(subject as Exclude<ExtensionFactSubject, object>);
  }

  #getOrCreateSubjectFacts(subject: ExtensionFactSubject): Map<string, ExtensionFactEntry<unknown>> {
    const existing = this.#getSubjectFacts(subject);
    if (existing !== undefined) {
      return existing;
    }

    const created = new Map<string, ExtensionFactEntry<unknown>>();
    if (typeof subject === "object" && subject !== null) {
      this.#objectFacts.set(subject, created);
    } else {
      this.#primitiveFacts.set(subject as Exclude<ExtensionFactSubject, object>, created);
    }
    return created;
  }
}

export class ExtensionFactResolver {
  readonly #facts: ExtensionFactStore;
  readonly #diagnostics: ExtensionDiagnosticStore;
  readonly #resolvers = new Map<string, ExtensionFactResolverCallback<unknown>[]>();

  constructor(facts: ExtensionFactStore, diagnostics: ExtensionDiagnosticStore) {
    this.#facts = facts;
    this.#diagnostics = diagnostics;
  }

  register<T>(key: ExtensionFactKey<T>, resolver: ExtensionFactResolverCallback<T>): void {
    const resolvers = this.#resolvers.get(key.id);
    if (resolvers === undefined) {
      this.#resolvers.set(key.id, [resolver as ExtensionFactResolverCallback<unknown>]);
      return;
    }
    resolvers.push(resolver as ExtensionFactResolverCallback<unknown>);
  }

  resolve<T>(subject: ExtensionFactSubject, key: ExtensionFactKey<T>): T | undefined {
    const explicit = this.#facts.getEntry(subject, key);
    if (explicit !== undefined) {
      return explicit.value;
    }

    const resolvers = this.#resolvers.get(key.id);
    if (resolvers === undefined) {
      return undefined;
    }

    for (const resolver of resolvers) {
      const resolved = resolver(subject, { facts: this.#facts, diagnostics: this.#diagnostics }) as ExtensionFactResolution<T> | undefined;
      if (resolved !== undefined) {
        this.#facts.set(subject, key, resolved.value, resolved.evidence ?? []);
        return resolved.value;
      }
    }
    return undefined;
  }
}

export class ExtensionMetadataRegistry {
  readonly #diagnostics: ExtensionDiagnosticStore;
  readonly #supportedSchemas: ReadonlySet<string>;
  readonly #metadata = new Map<string, TargetBindingMetadataHeader>();

  constructor(diagnostics: ExtensionDiagnosticStore, supportedSchemas: readonly string[] = ["tsts.target-bindings"]) {
    this.#diagnostics = diagnostics;
    this.#supportedSchemas = new Set(supportedSchemas);
  }

  registerTargetMetadata(header: TargetBindingMetadataHeader): boolean {
    const validationDiagnostic = this.#validateHeader(header);
    if (validationDiagnostic !== undefined) {
      this.#diagnostics.append(validationDiagnostic);
      return false;
    }
    this.#metadata.set(getMetadataIdentity(header), header);
    return true;
  }

  getTargetMetadata(target: string, packageName: string, packageVersion: string, schema = "tsts.target-bindings"): TargetBindingMetadataHeader | undefined {
    return this.#metadata.get(`${schema}:${target}:${packageName}:${packageVersion}`);
  }

  #validateHeader(header: TargetBindingMetadataHeader): ExtensionDiagnostic | undefined {
    const headerFields: readonly (readonly [string, string])[] = [
      ["schema", header.schema],
      ["schemaVersion", header.schemaVersion],
      ["producer", header.producer],
      ["producerVersion", header.producerVersion],
      ["target", header.target],
      ["packageName", header.packageName],
      ["packageVersion", header.packageVersion],
      ["extensionContractVersion", header.extensionContractVersion],
    ];
    const missing = headerFields.filter((entry) => entry[1].length === 0).map((entry) => entry[0]);

    if (missing.length > 0) {
      return createHostDiagnostic({
        extensionCode: "INVALID_METADATA_HEADER",
        numericCode: ExtensionHostDiagnosticCode.invalidMetadata,
        message: `Target binding metadata header is missing: ${missing.join(", ")}.`,
        identity: `metadata-missing:${missing.join(",")}`,
      });
    }

    if (!this.#supportedSchemas.has(header.schema)) {
      return createHostDiagnostic({
        extensionCode: "UNSUPPORTED_METADATA_SCHEMA",
        numericCode: ExtensionHostDiagnosticCode.invalidMetadata,
        message: `Unsupported target binding metadata schema '${header.schema}'.`,
        identity: `metadata-schema:${header.schema}`,
      });
    }

    return undefined;
  }
}

export class ExtensionHost {
  readonly program: object;
  readonly diagnostics: ExtensionDiagnosticStore;
  readonly facts: ExtensionFactStore;
  readonly factResolver: ExtensionFactResolver;
  readonly metadata: ExtensionMetadataRegistry;
  readonly extensions: readonly CompilerExtension[];
  readonly #extensionsById = new Map<string, CompilerExtension>();
  readonly #decisionOwners = new Map<string, string>();
  readonly #decisionHooks = new Map<string, RegisteredDecisionHook[]>();
  #finalized = false;

  constructor(program: object, options: ExtensionHostOptions = {}) {
    this.program = program;
    this.diagnostics = new ExtensionDiagnosticStore();
    this.facts = new ExtensionFactStore(this.diagnostics);
    this.factResolver = new ExtensionFactResolver(this.facts, this.diagnostics);
    this.metadata = new ExtensionMetadataRegistry(this.diagnostics, options.supportedMetadataSchemas);
    this.extensions = orderExtensions(options.extensions ?? [], this.diagnostics);
    for (const extension of this.extensions) {
      this.#extensionsById.set(extension.identity.id, extension);
      for (const question of extension.decisionOwners ?? []) {
        this.registerDecisionOwner(question, extension.identity.id);
      }
    }
    this.#initializeExtensions();
  }

  registerDecisionOwner(question: string, extensionId: string): void {
    const existingOwner = this.#decisionOwners.get(question);
    if (existingOwner === undefined) {
      this.#decisionOwners.set(question, extensionId);
      return;
    }
    if (existingOwner === extensionId) {
      return;
    }
    this.diagnostics.append(createHostDiagnostic({
      extensionCode: "DECISION_OWNER_CONFLICT",
      numericCode: ExtensionHostDiagnosticCode.decisionOwnerConflict,
      message: `Semantic question '${question}' is owned by both '${existingOwner}' and '${extensionId}'.`,
      identity: `decision-owner-conflict:${question}:${existingOwner}:${extensionId}`,
    }));
  }

  getDecisionOwner(question: string): CompilerExtension | undefined {
    const ownerId = this.#decisionOwners.get(question);
    return ownerId === undefined ? undefined : this.#extensionsById.get(ownerId);
  }

  requireDecisionOwner(question: string): CompilerExtension | undefined {
    const owner = this.getDecisionOwner(question);
    if (owner !== undefined) {
      return owner;
    }
    this.diagnostics.append(createHostDiagnostic({
      extensionCode: "DECISION_OWNER_MISSING",
      numericCode: ExtensionHostDiagnosticCode.decisionOwnerMissing,
      message: `No extension owns semantic question '${question}'.`,
      identity: `decision-owner-missing:${question}`,
    }));
    return undefined;
  }

  registerDecisionHook<TRequest, TResult>(question: string, extensionId: string, hook: ExtensionDecisionHook<TRequest, TResult>): void {
    const hooks = this.#decisionHooks.get(question);
    const registered: RegisteredDecisionHook = {
      extensionId,
      hook: hook as ExtensionDecisionHook<unknown, unknown>,
    };
    if (hooks === undefined) {
      this.#decisionHooks.set(question, [registered]);
      return;
    }
    hooks.push(registered);
  }

  runDecision<TRequest, TResult>(
    question: string,
    request: TRequest,
    core: () => TResult,
    options: ExtensionDecisionRunOptions = {},
  ): ExtensionDecisionResult<TResult> {
    const owner = this.getDecisionOwner(question);
    if (owner === undefined && options.requireOwner === true) {
      this.requireDecisionOwner(question);
      return { kind: "missing-owner", question };
    }

    const hooks = this.#decisionHooks.get(question) ?? [];
    const selectedHooks = owner === undefined ? hooks : hooks.filter((hook) => hook.extensionId === owner.identity.id);

    if (selectedHooks.length === 0) {
      if (owner !== undefined && options.requireOwner === true) {
        this.diagnostics.append(createHostDiagnostic({
          extensionCode: "DECISION_OWNER_DEFERRED",
          numericCode: ExtensionHostDiagnosticCode.decisionOwnerDeferred,
          message: `Extension '${owner.identity.id}' owns semantic question '${question}' but registered no decision hook.`,
          identity: `decision-owner-no-hook:${question}:${owner.identity.id}`,
        }));
        return { kind: "owner-deferred", question, extensionId: owner.identity.id };
      }
      return { kind: "core", value: core() };
    }

    const nonDeferred: Array<ExtensionDecisionResult<TResult>> = [];
    for (const registered of selectedHooks) {
      const decision = registered.hook(request, {
        question,
        extensionId: registered.extensionId,
      }) as ExtensionDecision<TResult>;
      if (decision.kind === "defer") {
        continue;
      }
      if (decision.kind === "reject") {
        this.diagnostics.append(decision.diagnostic);
        nonDeferred.push({ kind: "reject", diagnostic: decision.diagnostic, extensionId: registered.extensionId });
        continue;
      }
      nonDeferred.push({
        kind: "accept",
        value: decision.value,
        extensionId: registered.extensionId,
        ...(decision.evidence !== undefined ? { evidence: decision.evidence } : {}),
      });
    }

    if (nonDeferred.length === 0) {
      if (owner !== undefined && options.requireOwner === true) {
        this.diagnostics.append(createHostDiagnostic({
          extensionCode: "DECISION_OWNER_DEFERRED",
          numericCode: ExtensionHostDiagnosticCode.decisionOwnerDeferred,
          message: `Extension '${owner.identity.id}' owns semantic question '${question}' but deferred the decision.`,
          identity: `decision-owner-deferred:${question}:${owner.identity.id}`,
        }));
        return { kind: "owner-deferred", question, extensionId: owner.identity.id };
      }
      return { kind: "core", value: core() };
    }

    if (owner === undefined && nonDeferred.length > 1) {
      this.diagnostics.append(createHostDiagnostic({
        extensionCode: "DECISION_CONFLICT",
        numericCode: ExtensionHostDiagnosticCode.decisionConflict,
        message: `Multiple extensions answered semantic question '${question}' without a registered owner.`,
        evidence: nonDeferred.map((decision) => ({ message: `Decision kind: ${decision.kind}`, details: decision })),
        identity: `decision-conflict:${question}`,
      }));
      return { kind: "conflict", question };
    }

    return nonDeferred[0]!;
  }

  finalizeSemantics(): void {
    if (this.#finalized) {
      return;
    }
    this.facts.seal();
    this.#finalized = true;
  }

  get finalized(): boolean {
    return this.#finalized;
  }

  assertFinalizedForConsumer(consumer: string): boolean {
    if (this.#finalized) {
      return true;
    }
    this.diagnostics.append(createHostDiagnostic({
      extensionCode: "CONSUMER_BEFORE_FINALIZATION",
      numericCode: ExtensionHostDiagnosticCode.consumerBeforeFinalization,
      message: `Consumer '${consumer}' attempted to read extension facts before semantic finalization.`,
      identity: `consumer-before-finalization:${consumer}`,
    }));
    return false;
  }

  getFactForConsumer<T>(consumer: string, subject: ExtensionFactSubject, key: ExtensionFactKey<T>): T | undefined {
    if (!this.assertFinalizedForConsumer(consumer)) {
      return undefined;
    }
    return this.factResolver.resolve(subject, key);
  }

  #initializeExtensions(): void {
    for (const extension of this.extensions) {
      try {
        extension.initialize?.({
          host: this,
          facts: this.facts,
          factResolver: this.factResolver,
          diagnostics: this.diagnostics,
          metadata: this.metadata,
          registerDecisionOwner: (question, extensionId) => this.registerDecisionOwner(question, extensionId),
          registerDecisionHook: (question, hook) => this.registerDecisionHook(question, extension.identity.id, hook),
        });
      } catch (error) {
        this.diagnostics.append(createHostDiagnostic({
          extensionCode: "EXTENSION_INITIALIZE_FAILED",
          numericCode: ExtensionHostDiagnosticCode.initializationFailed,
          message: `Extension '${extension.identity.id}' failed during initialization.`,
          evidence: [{ message: "Thrown value", details: error }],
          identity: `extension-initialize-failed:${extension.identity.id}`,
        }));
      }
    }
  }
}

const attachedExtensionHosts = new WeakMap<object, ExtensionHost>();

export function attachExtensionHost<TProgram extends object>(program: TProgram, options: ExtensionHostOptions = {}): ExtendedProgram<TProgram> {
  const host = new ExtensionHost(program, options);
  attachedExtensionHosts.set(program, host);
  return Object.freeze({ program, extensionHost: host });
}

export function getExtensionHost(program: object): ExtensionHost | undefined {
  return attachedExtensionHosts.get(program);
}

export function hasExtensionHost(program: object): boolean {
  return attachedExtensionHosts.has(program);
}

function orderExtensions(extensions: readonly CompilerExtension[], diagnostics: ExtensionDiagnosticStore): readonly CompilerExtension[] {
  const extensionsById = new Map<string, CompilerExtension>();
  for (const extension of extensions) {
    const id = extension.identity.id;
    if (extensionsById.has(id)) {
      diagnostics.append(createHostDiagnostic({
        extensionCode: "DUPLICATE_EXTENSION_ID",
        numericCode: ExtensionHostDiagnosticCode.duplicateExtension,
        message: `Duplicate extension id '${id}'.`,
        identity: `duplicate-extension:${id}`,
      }));
      continue;
    }
    extensionsById.set(id, extension);
  }

  const outgoingEdges = new Map<string, Set<string>>();
  const incomingCounts = new Map<string, number>();
  for (const id of extensionsById.keys()) {
    outgoingEdges.set(id, new Set<string>());
    incomingCounts.set(id, 0);
  }

  for (const extension of extensionsById.values()) {
    const extensionId = extension.identity.id;
    for (const dependencyId of extension.dependencies?.dependsOn ?? []) {
      if (!extensionsById.has(dependencyId)) {
        diagnostics.append(createHostDiagnostic({
          extensionCode: "MISSING_EXTENSION_DEPENDENCY",
          numericCode: ExtensionHostDiagnosticCode.missingDependency,
          message: `Extension '${extensionId}' requires missing dependency '${dependencyId}'.`,
          identity: `missing-dependency:${extensionId}:${dependencyId}`,
        }));
        continue;
      }
      addOrderingEdge(outgoingEdges, incomingCounts, dependencyId, extensionId);
    }
    for (const predecessorId of extension.dependencies?.runsAfter ?? []) {
      if (extensionsById.has(predecessorId)) {
        addOrderingEdge(outgoingEdges, incomingCounts, predecessorId, extensionId);
      }
    }
  }

  const ready = Array.from(incomingCounts.entries())
    .filter((entry) => entry[1] === 0)
    .map((entry) => entry[0])
    .sort();
  const ordered: CompilerExtension[] = [];

  while (ready.length > 0) {
    const id = ready.shift()!;
    const extension = extensionsById.get(id);
    if (extension !== undefined) {
      ordered.push(extension);
    }
    for (const dependentId of Array.from(outgoingEdges.get(id) ?? []).sort()) {
      const nextCount = (incomingCounts.get(dependentId) ?? 0) - 1;
      incomingCounts.set(dependentId, nextCount);
      if (nextCount === 0) {
        ready.push(dependentId);
        ready.sort();
      }
    }
  }

  if (ordered.length !== extensionsById.size) {
    const cycleIds = Array.from(extensionsById.keys())
      .filter((id) => !ordered.some((extension) => extension.identity.id === id))
      .sort();
    diagnostics.append(createHostDiagnostic({
      extensionCode: "EXTENSION_DEPENDENCY_CYCLE",
      numericCode: ExtensionHostDiagnosticCode.dependencyCycle,
      message: `Extension dependency cycle detected: ${cycleIds.join(", ")}.`,
      identity: `dependency-cycle:${cycleIds.join(",")}`,
    }));
    for (const id of cycleIds) {
      const extension = extensionsById.get(id);
      if (extension !== undefined) {
        ordered.push(extension);
      }
    }
  }

  return ordered;
}

function addOrderingEdge(outgoingEdges: Map<string, Set<string>>, incomingCounts: Map<string, number>, from: string, to: string): void {
  const dependents = outgoingEdges.get(from);
  if (dependents === undefined || dependents.has(to)) {
    return;
  }
  dependents.add(to);
  incomingCounts.set(to, (incomingCounts.get(to) ?? 0) + 1);
}

function createHostDiagnostic(input: {
  readonly extensionCode: string;
  readonly numericCode: number;
  readonly message: string;
  readonly evidence?: readonly ExtensionEvidence[];
  readonly identity?: string;
}): ExtensionDiagnostic {
  return {
    extensionId: "tsts.extension-host",
    extensionCode: input.extensionCode,
    numericCode: input.numericCode,
    publicCode: `TSEXT${input.numericCode}`,
    category: "error",
    message: input.message,
    evidence: input.evidence ?? [],
    ...(input.identity !== undefined ? { identity: input.identity } : {}),
  };
}

function getDiagnosticIdentity(diagnostic: ExtensionDiagnostic): string {
  return diagnostic.identity ?? [
    diagnostic.extensionId,
    diagnostic.extensionCode,
    diagnostic.numericCode,
    diagnostic.category,
    diagnostic.message,
  ].join(":");
}

function getMetadataIdentity(header: TargetBindingMetadataHeader): string {
  return `${header.schema}:${header.target}:${header.packageName}:${header.packageVersion}`;
}

function getSubjectIdentity(subject: ExtensionFactSubject): string {
  if (typeof subject === "object") {
    return subject === null ? "null" : "object";
  }
  return `${typeof subject}:${String(subject)}`;
}
