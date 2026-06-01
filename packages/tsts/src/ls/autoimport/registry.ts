/**
 * Auto-import registry anchor.
 */

export interface AutoImportExport {
  readonly name: string;
  readonly moduleSpecifier: string;
  readonly isTypeOnly?: boolean;
}

export class Registry {
  private readonly exportsByName = new Map<string, AutoImportExport[]>();

  add(value: AutoImportExport): void {
    const list = this.exportsByName.get(value.name) ?? [];
    this.exportsByName.set(value.name, [...list, value]);
  }

  get(name: string): readonly AutoImportExport[] {
    return this.exportsByName.get(name) ?? [];
  }
}
