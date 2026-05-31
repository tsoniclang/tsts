import type { FileChangeSummary } from "./filechange.js";

export interface APISnapshotRequest {
  readonly openProjects?: ReadonlySet<string>;
}

export interface SnapshotChange {
  readonly apiRequest?: APISnapshotRequest;
  readonly fileChanges: FileChangeSummary;
  readonly ataChanges?: unknown;
}

export interface ApiOpenProjectResult<TProject, TSnapshot> {
  readonly project: TProject;
  readonly snapshot: TSnapshot;
}

export interface ApiSession<TProject, TSnapshot> {
  apiOpenProject(configFileName: string, apiFileChanges: FileChangeSummary): ApiOpenProjectResult<TProject, TSnapshot>;
  apiUpdateWithFileChanges(apiFileChanges: FileChangeSummary): TSnapshot;
}
