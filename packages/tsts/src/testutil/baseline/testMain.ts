import { createHash } from "node:crypto";
import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

export interface TestMainOptions {
  readonly updateBaselines?: boolean;
  readonly filter?: RegExp;
}

export interface TestCase {
  readonly name: string;
  run(): void | Promise<void>;
}

export async function runTestMain(tests: readonly TestCase[], options: TestMainOptions = {}): Promise<void> {
  const failures: string[] = [];
  for (const test of tests) {
    if (options.filter !== undefined && !options.filter.test(test.name)) continue;
    try {
      await test.run();
    } catch (error) {
      failures.push(`${test.name}: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
    }
  }
  if (failures.length > 0) throw new Error(failures.join("\n\n"));
}

const recordedBaselines = new Set<string>();
let trackingInitialized = false;

export function baselineTrackingDirectory(): string {
  return process.env.TSGO_BASELINE_TRACKING_DIR ?? "";
}

export function track(stack = new Error().stack ?? ""): () => void {
  trackingInitialized = true;
  const trackingDir = baselineTrackingDirectory();
  if (trackingDir.length === 0) return () => {};
  const trackingPath = join(trackingDir, `${trackingFileHash(stack)}.txt`);
  return () => writeRecordedBaselines(trackingPath);
}

export function recordBaseline(relativePath: string, reportError: (message: string) => void = message => { throw new Error(message); }): void {
  if (baselineTrackingDirectory().length === 0) return;
  if (!trackingInitialized) {
    reportError("baseline: package uses baselines but TestMain did not call baseline.track(). Please add a TestMain function with: defer baseline.track()()");
    return;
  }
  recordedBaselines.add(relativePath);
}

export function recordedBaselinePaths(): readonly string[] {
  return [...recordedBaselines].sort();
}

export function clearRecordedBaselines(): void {
  recordedBaselines.clear();
  trackingInitialized = false;
}

export function writeRecordedBaselines(trackingPath: string): void {
  if (recordedBaselines.size === 0) return;
  doWriteRecordedBaselines(trackingPath);
}

export function doWriteRecordedBaselines(trackingPath: string): void {
  const dir = dirname(trackingPath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const stream = createWriteStream(trackingPath, { encoding: "utf8" });
  for (const baseline of recordedBaselinePaths()) stream.write(`${baseline}\n`);
  stream.end();
}

function trackingFileHash(stack: string): string {
  return createHash("sha256").update(stack).digest("hex").slice(0, 16);
}
