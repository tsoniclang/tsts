import { ClientMock } from "./clientMock.generated.js";
import { NpmExecutorMock } from "./npmExecutorMock.generated.js";

export interface ProjectTestHost {
  readonly client: ClientMock;
  readonly npmExecutor: NpmExecutorMock;
  readonly files: Map<string, string>;
}

export function newProjectTestHost(files?: Iterable<readonly [string, string]>): ProjectTestHost {
  return {
    client: new ClientMock(),
    npmExecutor: new NpmExecutorMock(),
    files: new Map(files),
  };
}

export function updateHostFile(host: ProjectTestHost, fileName: string, content: string): void {
  host.files.set(fileName.replace(/\\/g, "/"), content);
}

export function deleteHostFile(host: ProjectTestHost, fileName: string): void {
  host.files.delete(fileName.replace(/\\/g, "/"));
}
