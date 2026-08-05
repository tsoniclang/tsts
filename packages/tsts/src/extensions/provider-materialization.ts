import type {
  ExtensionHostOptions,
  ProviderDeclarationMaterialization,
  ProviderDeclarationModel,
  ProviderDeclarationRequest,
  ProviderIdentity,
  ProviderModuleContext,
  ProviderModuleResolution,
  ProviderVirtualDeclarationFact,
  SourceDeclarationMaterializationMode,
} from "./index.js";
import { encodeIdentityTuple } from "./identity-tuple.js";
import {
  getProviderIncrementalExportContractMap,
  type ProviderIncrementalExportContract,
} from "./provider-export-contract.js";
import { providerDeclarationClosureLimits } from "./provider-resource-limits.js";

const providerMaterializationRounds = new WeakMap<ExtensionHostOptions, ProviderMaterializationRound>();

export class ProviderMaterializationCoordinator {
  readonly #completeExportsByModule = new Map<string, Map<string, ProviderCompleteExportDemand>>();
  readonly #exportContractsByModule = new Map<string, Map<string, ProviderIncrementalExportContract>>();
  #activeRound: ProviderMaterializationRound | undefined;
  #roundCount = 0;
  #sealed = false;

  beginRound(options: ExtensionHostOptions): ProviderMaterializationRound {
    if (this.#sealed) {
      throw new Error("Provider materialization is sealed.");
    }
    if (this.#activeRound !== undefined) {
      throw new Error("A provider materialization round is already active.");
    }
    this.#roundCount += 1;
    if (this.#roundCount > providerDeclarationClosureLimits.maxCandidates + 1) {
      throw new Error(
        `Provider materialization did not converge within ${providerDeclarationClosureLimits.maxCandidates + 1} rounds.`,
      );
    }
    const round = new ProviderMaterializationRound(
      snapshotCompleteExports(this.#completeExportsByModule),
      snapshotExportContracts(this.#exportContractsByModule),
    );
    this.#activeRound = round;
    providerMaterializationRounds.set(options, round);
    return round;
  }

  finishRound(round: ProviderMaterializationRound): boolean {
    if (this.#activeRound !== round) {
      throw new Error("Provider materialization rounds must finish in creation order.");
    }
    this.#activeRound = undefined;
    round.finish();
    let changed = false;
    for (const [moduleKey, demands] of round.pendingDemands()) {
      const completeExports = this.#completeExportsByModule.get(moduleKey) ?? new Map<string, ProviderCompleteExportDemand>();
      for (const demand of demands) {
        const demandKey = getCompleteExportDemandKey(demand);
        if (!completeExports.has(demandKey)) {
          completeExports.set(demandKey, demand);
          changed = true;
        }
      }
      this.#completeExportsByModule.set(moduleKey, completeExports);
    }
    replaceExportContracts(this.#exportContractsByModule, round.exportContracts());
    return changed;
  }

  seal(round: ProviderMaterializationRound): void {
    if (this.#activeRound !== round) {
      throw new Error("Only the active provider materialization round can be sealed.");
    }
    if (round.hasPendingDemands()) {
      throw new Error("Provider materialization cannot seal with unresolved complete-export demands.");
    }
    this.#activeRound = undefined;
    round.seal();
    replaceExportContracts(this.#exportContractsByModule, round.exportContracts());
    this.#sealed = true;
  }
}

export class ProviderMaterializationRound {
  readonly #completeExportsByModule: ReadonlyMap<string, readonly ProviderCompleteExportDemand[]>;
  readonly #exportContractsByModule: Map<string, Map<string, ProviderIncrementalExportContract>>;
  readonly #pendingDemandsByModule = new Map<string, Map<string, ProviderCompleteExportDemand>>();
  #incrementalProviderLoaded = false;
  #state: "active" | "finished" | "sealed" = "active";

  constructor(
    completeExportsByModule: ReadonlyMap<string, readonly ProviderCompleteExportDemand[]>,
    exportContractsByModule: Map<string, Map<string, ProviderIncrementalExportContract>>,
  ) {
    this.#completeExportsByModule = completeExportsByModule;
    this.#exportContractsByModule = exportContractsByModule;
  }

  createRequest(
    provider: ProviderIdentity,
    resolution: ProviderModuleResolution,
    context: ProviderModuleContext,
    mode: SourceDeclarationMaterializationMode,
  ): ProviderDeclarationRequest {
    if (mode === "complete") {
      return Object.freeze({
        context,
        materialization: completeProviderDeclarationMaterialization,
      });
    }
    this.#incrementalProviderLoaded = true;
    const moduleKey = getProviderMaterializationModuleKey(provider, resolution);
    const completeExports = this.#completeExportsByModule.get(moduleKey) ?? emptyCompleteExportDemands;
    return Object.freeze({
      context,
      materialization: Object.freeze({
        kind: "incremental",
        completeExports,
      }),
    });
  }

  recordCompleteExportDemand(
    provider: ProviderIdentity,
    fact: ProviderVirtualDeclarationFact,
    materialization: ProviderDeclarationMaterialization,
  ): boolean {
    if (fact.exportName === undefined) {
      return false;
    }
    if (provider.id !== fact.providerId
      || provider.version !== fact.providerVersion) {
      throw new Error("Provider materialization evidence does not match its owning provider identity.");
    }
    if (providerMaterializationIncludes(materialization, fact.exportName, fact.exportId)) {
      return false;
    }
    if (this.#state !== "active") {
      throw new Error(`Provider materialization demand arrived after its round was ${this.#state}.`);
    }
    if (materialization.kind !== "incremental") {
      throw new Error("A complete provider declaration cannot request additional materialization.");
    }
    const moduleKey = getProviderMaterializationModuleKey(provider, {
      moduleSpecifier: fact.moduleSpecifier,
      providerModuleId: fact.providerModuleId,
    });
    const demand = Object.freeze({
      exportName: fact.exportName,
      ...(fact.exportId === undefined ? {} : { exportId: fact.exportId }),
    });
    const demands = this.#pendingDemandsByModule.get(moduleKey) ?? new Map<string, ProviderCompleteExportDemand>();
    const demandKey = getCompleteExportDemandKey(demand);
    if (demands.has(demandKey)) {
      return false;
    }
    demands.set(demandKey, demand);
    this.#pendingDemandsByModule.set(moduleKey, demands);
    return true;
  }

  recordDeclarationModel(
    provider: ProviderIdentity,
    resolution: ProviderModuleResolution,
    mode: SourceDeclarationMaterializationMode,
    model: ProviderDeclarationModel,
  ): ProviderIncrementalContractConflict | undefined {
    if (mode !== "incremental") {
      return undefined;
    }
    if (this.#state !== "active") {
      throw new Error(`Provider declaration model arrived after its materialization round was ${this.#state}.`);
    }
    const moduleKey = getProviderMaterializationModuleKey(provider, resolution);
    const existing = this.#exportContractsByModule.get(moduleKey) ?? new Map();
    const next = new Map(existing);
    for (const [variantKey, contract] of getProviderIncrementalExportContractMap(
      model.moduleSpecifier,
      model.exports,
    )) {
      const previous = existing.get(variantKey);
      if (previous?.headerKey !== undefined && previous.headerKey !== contract.headerKey) {
        return Object.freeze({
          sourceExportName: contract.sourceExportName,
          ...(contract.typeArgumentCount === undefined ? {} : { typeArgumentCount: contract.typeArgumentCount }),
          reason: "stable export header changed between materialization rounds",
        });
      }
      if (previous?.bodyKey !== undefined && previous.bodyKey !== contract.bodyKey) {
        return Object.freeze({
          sourceExportName: contract.sourceExportName,
          ...(contract.typeArgumentCount === undefined ? {} : { typeArgumentCount: contract.typeArgumentCount }),
          reason: contract.bodyKey === undefined
            ? "completed export body disappeared in a later materialization round"
            : "completed export body changed between materialization rounds",
        });
      }
      next.set(variantKey, previous?.bodyKey === undefined && contract.bodyKey !== undefined
        ? contract
        : previous ?? contract);
    }
    this.#exportContractsByModule.set(moduleKey, next);
    return undefined;
  }

  hasIncrementalProvider(): boolean {
    return this.#incrementalProviderLoaded;
  }

  hasPendingDemands(): boolean {
    return this.#pendingDemandsByModule.size !== 0;
  }

  pendingDemands(): readonly (readonly [string, readonly ProviderCompleteExportDemand[]])[] {
    return Object.freeze([...this.#pendingDemandsByModule]
      .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
      .map(([moduleKey, demands]) => Object.freeze([
        moduleKey,
        Object.freeze([...demands.values()].sort(compareCompleteExportDemands)),
      ] as const)));
  }

  exportContracts(): ReadonlyMap<string, ReadonlyMap<string, ProviderIncrementalExportContract>> {
    return this.#exportContractsByModule;
  }

  finish(): void {
    if (this.#state !== "active") {
      throw new Error("Provider materialization round can finish only once.");
    }
    this.#state = "finished";
  }

  seal(): void {
    if (this.#state !== "active") {
      throw new Error("Provider materialization round can seal only while active.");
    }
    this.#state = "sealed";
  }
}

interface ProviderCompleteExportDemand {
  readonly exportName: string;
  readonly exportId?: string;
}

export interface ProviderIncrementalContractConflict {
  readonly sourceExportName: string;
  readonly typeArgumentCount?: number;
  readonly reason: string;
}

const completeProviderDeclarationMaterialization = Object.freeze({
  kind: "complete",
} satisfies ProviderDeclarationMaterialization);
const emptyCompleteExportDemands = Object.freeze([]) as readonly ProviderCompleteExportDemand[];

export function getProviderMaterializationRound(
  options: ExtensionHostOptions,
): ProviderMaterializationRound | undefined {
  return providerMaterializationRounds.get(options);
}

function snapshotCompleteExports(
  source: ReadonlyMap<string, ReadonlyMap<string, ProviderCompleteExportDemand>>,
): ReadonlyMap<string, readonly ProviderCompleteExportDemand[]> {
  return new Map([...source]
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([moduleKey, demands]) => [
      moduleKey,
      Object.freeze([...demands.values()].sort(compareCompleteExportDemands)),
    ]));
}

function snapshotExportContracts(
  source: ReadonlyMap<string, ReadonlyMap<string, ProviderIncrementalExportContract>>,
): Map<string, Map<string, ProviderIncrementalExportContract>> {
  return new Map([...source].map(([moduleKey, contracts]) => [moduleKey, new Map(contracts)]));
}

function replaceExportContracts(
  destination: Map<string, Map<string, ProviderIncrementalExportContract>>,
  source: ReadonlyMap<string, ReadonlyMap<string, ProviderIncrementalExportContract>>,
): void {
  destination.clear();
  for (const [moduleKey, contracts] of source) {
    destination.set(moduleKey, new Map(contracts));
  }
}

function getProviderMaterializationModuleKey(
  provider: ProviderIdentity,
  resolution: Pick<ProviderModuleResolution, "moduleSpecifier" | "providerModuleId">,
): string {
  return encodeIdentityTuple([
    provider.id,
    provider.version,
    provider.extensionContractVersion,
    provider.configHash ?? "",
    resolution.providerModuleId,
    resolution.moduleSpecifier,
  ]);
}

function getCompleteExportDemandKey(demand: ProviderCompleteExportDemand): string {
  return encodeIdentityTuple([demand.exportName, demand.exportId ?? ""]);
}

function compareCompleteExportDemands(
  left: ProviderCompleteExportDemand,
  right: ProviderCompleteExportDemand,
): number {
  return left.exportName < right.exportName
    ? -1
    : left.exportName > right.exportName
      ? 1
      : (left.exportId ?? "") < (right.exportId ?? "")
        ? -1
        : (left.exportId ?? "") > (right.exportId ?? "")
          ? 1
          : 0;
}

function providerMaterializationIncludes(
  materialization: ProviderDeclarationMaterialization,
  exportName: string,
  exportId: string | undefined,
): boolean {
  return materialization.kind === "complete"
    || materialization.completeExports.some((request) =>
      request.exportName === exportName
      && (request.exportId === undefined || request.exportId === exportId)
    );
}
