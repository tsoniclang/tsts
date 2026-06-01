/**
 * Project reload summary parity helper.
 */

export interface ProjectReloadSummary {
  readonly project: string;
  readonly added: readonly string[];
  readonly removed: readonly string[];
  readonly changed: readonly string[];
  readonly configChanged: boolean;
}

export function formatProjectReloadSummary(project: string, added: number, removed: number): string {
  return `${project}: ${added} added, ${removed} removed`;
}

export function createProjectReloadSummary(project: string): ProjectReloadSummary {
  return {
    project,
    added: [],
    removed: [],
    changed: [],
    configChanged: false,
  };
}

export function addReloadedFile(summary: ProjectReloadSummary, file: string): ProjectReloadSummary {
  if (summary.added.includes(file)) return summary;
  return {
    ...summary,
    added: [...summary.added, file],
  };
}

export function removeReloadedFile(summary: ProjectReloadSummary, file: string): ProjectReloadSummary {
  if (summary.removed.includes(file)) return summary;
  return {
    ...summary,
    removed: [...summary.removed, file],
  };
}

export function changeReloadedFile(summary: ProjectReloadSummary, file: string): ProjectReloadSummary {
  if (summary.changed.includes(file)) return summary;
  return {
    ...summary,
    changed: [...summary.changed, file],
  };
}

export function markReloadedConfig(summary: ProjectReloadSummary): ProjectReloadSummary {
  return {
    ...summary,
    configChanged: true,
  };
}

export function projectReloadSummaryIsEmpty(summary: ProjectReloadSummary): boolean {
  return summary.added.length === 0
    && summary.removed.length === 0
    && summary.changed.length === 0
    && !summary.configChanged;
}

export function formatDetailedProjectReloadSummary(summary: ProjectReloadSummary): string {
  const parts = [
    `${summary.project}:`,
    `${summary.added.length} added`,
    `${summary.removed.length} removed`,
    `${summary.changed.length} changed`,
  ];
  if (summary.configChanged) parts.push("config changed");
  return parts.join(" ");
}

export function mergeProjectReloadSummaries(left: ProjectReloadSummary, right: ProjectReloadSummary): ProjectReloadSummary {
  return {
    project: left.project,
    added: unique([...left.added, ...right.added]),
    removed: unique([...left.removed, ...right.removed]),
    changed: unique([...left.changed, ...right.changed]),
    configChanged: left.configChanged || right.configChanged,
  };
}

function unique(values: readonly string[]): readonly string[] {
  return [...new Set(values)].sort();
}
