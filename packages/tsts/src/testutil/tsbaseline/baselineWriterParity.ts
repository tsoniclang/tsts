/**
 * TS baseline writer parity helpers.
 */

export interface BaselineSection {
  readonly name: string;
  readonly body: string;
}

export function writeBaselineSections(sections: readonly BaselineSection[]): string {
  return sections.map(section => formatSection(section)).join("\n\n");
}

export function normalizeBaselineSectionName(name: string): string {
  return name.replace(/\\/g, "/").replace(/^\.\//, "");
}

export function sortBaselineSections(sections: readonly BaselineSection[]): readonly BaselineSection[] {
  return [...sections].sort((left, right) => normalizeBaselineSectionName(left.name).localeCompare(normalizeBaselineSectionName(right.name)));
}

export function baselineHasContent(section: BaselineSection): boolean {
  return section.body.trim().length > 0;
}

function formatSection(section: BaselineSection): string {
  return `==== ${normalizeBaselineSectionName(section.name)} ====\n${section.body.trimEnd()}`;
}
