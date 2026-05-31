export interface AutoImportProviderProject {
  readonly projectId: string;
  readonly packageName: string;
  readonly rootFileNames: readonly string[];
}

export interface AutoImportRequest {
  readonly importingFileName: string;
  readonly moduleSpecifier: string;
}

export interface AutoImportResult {
  readonly packageName: string;
  readonly fileName: string;
  readonly moduleSpecifier: string;
}

export class AutoImportRegistry {
  private readonly providers = new Map<string, AutoImportProviderProject>();

  set(provider: AutoImportProviderProject): void {
    this.providers.set(provider.projectId, provider);
  }

  delete(projectId: string): void {
    this.providers.delete(projectId);
  }

  get(projectId: string): AutoImportProviderProject | undefined {
    return this.providers.get(projectId);
  }

  resolve(request: AutoImportRequest): readonly AutoImportResult[] {
    const matches: AutoImportResult[] = [];
    for (const provider of this.providers.values()) {
      for (const fileName of provider.rootFileNames) {
        if (!fileName.endsWith(".d.ts") && !fileName.endsWith(".ts")) continue;
        matches.push({
          packageName: provider.packageName,
          fileName,
          moduleSpecifier: request.moduleSpecifier,
        });
      }
    }
    return matches.sort((left, right) => left.packageName.localeCompare(right.packageName) || left.fileName.localeCompare(right.fileName));
  }
}
