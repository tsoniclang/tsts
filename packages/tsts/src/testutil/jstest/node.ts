import { spawnSync } from "node:child_process";

export interface NodeRunResult {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

export function runNode(args: readonly string[], cwd?: string): NodeRunResult {
  const result = spawnSync(process.execPath, [...args], {
    cwd,
    encoding: "utf8",
  });
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}
