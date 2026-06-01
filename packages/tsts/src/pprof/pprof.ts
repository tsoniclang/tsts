/**
 * Profiling helpers.
 *
 * Port of TS-Go `internal/pprof/pprof.go`. Node does not emit Go pprof
 * protobufs, so this module preserves the profiling session contract using
 * deterministic profile artifacts that callers can manage uniformly.
 */

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { memoryUsage } from "node:process";
import v8 from "node:v8";

export interface ProfileLogWriter {
  write(text: string): void;
}

export class ProfileSession {
  readonly cpuFilePath: string;
  readonly memFilePath: string;
  private readonly logWriter: ProfileLogWriter;
  private stopped = false;
  private readonly startedAt = Date.now();

  constructor(cpuFilePath: string, memFilePath: string, logWriter: ProfileLogWriter) {
    this.cpuFilePath = cpuFilePath;
    this.memFilePath = memFilePath;
    this.logWriter = logWriter;
    writeFileSync(cpuFilePath, JSON.stringify({ startedAt: Date.now(), pid: process.pid, kind: "cpu" }, null, 2));
  }

  stop(): void {
    if (this.stopped) return;
    this.stopped = true;
    writeFileSync(this.cpuFilePath, JSON.stringify(this.cpuProfilePayload(), null, 2));
    writeFileSync(this.memFilePath, JSON.stringify(this.memoryProfilePayload("memory"), null, 2));
    this.logWriter.write(`Memory profile: ${this.memFilePath}\n`);
    this.logWriter.write(`CPU profile: ${this.cpuFilePath}\n`);
  }

  isRunning(): boolean {
    return !this.stopped;
  }

  profilePaths(): { readonly cpuFilePath: string; readonly memFilePath: string } {
    return {
      cpuFilePath: this.cpuFilePath,
      memFilePath: this.memFilePath,
    };
  }

  private cpuProfilePayload(): ProfilePayload {
    return {
      kind: "cpu",
      pid: process.pid,
      startedAt: this.startedAt,
      capturedAt: Date.now(),
      durationMs: Date.now() - this.startedAt,
      usage: memoryUsage(),
    };
  }

  private memoryProfilePayload(kind: ProfileKind): ProfilePayload {
    return {
      kind,
      pid: process.pid,
      startedAt: this.startedAt,
      capturedAt: Date.now(),
      durationMs: Date.now() - this.startedAt,
      usage: memoryUsage(),
    };
  }
}

export type ProfileKind = "cpu" | "memory" | "heap" | "alloc";

export interface ProfilePayload {
  readonly kind: ProfileKind;
  readonly pid: number;
  readonly startedAt: number;
  readonly capturedAt: number;
  readonly durationMs: number;
  readonly usage: NodeJS.MemoryUsage;
}

export function beginProfiling(profileDir: string, logWriter: ProfileLogWriter): ProfileSession {
  ensureProfileDirectory(profileDir);
  const pid = process.pid;
  return new ProfileSession(
    join(profileDir, `${pid}-cpuprofile.pb.gz`),
    join(profileDir, `${pid}-memprofile.pb.gz`),
    logWriter,
  );
}

export class CPUProfiler {
  private session: ProfileSession | undefined;

  startCPUProfile(profileDir: string): Error | undefined {
    if (this.session !== undefined) return new Error("CPU profiling already in progress");
    try {
      ensureProfileDirectory(profileDir);
      const timestamp = Date.now();
      const path = profileFilePath(profileDir, "cpu", timestamp);
      const memPath = profileFilePath(profileDir, "memory", timestamp);
      this.session = new ProfileSession(path, memPath, discardWriter);
      return undefined;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
  }

  stopCPUProfile(): { readonly filePath: string; readonly error?: Error } {
    if (this.session === undefined) return { filePath: "", error: new Error("CPU profiling not in progress") };
    const filePath = this.session.cpuFilePath;
    this.session.stop();
    this.session = undefined;
    return { filePath };
  }

  currentSession(): ProfileSession | undefined {
    return this.session;
  }
}

export function saveHeapProfile(profileDir: string): { readonly filePath: string; readonly error?: Error } {
  try {
    ensureProfileDirectory(profileDir);
    const filePath = profileFilePath(profileDir, "heap", Date.now());
    v8.writeHeapSnapshot(filePath);
    return { filePath };
  } catch (error) {
    return { filePath: "", error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export function saveAllocProfile(profileDir: string): { readonly filePath: string; readonly error?: Error } {
  try {
    ensureProfileDirectory(profileDir);
    const filePath = profileFilePath(profileDir, "alloc", Date.now());
    writeFileSync(filePath, JSON.stringify({ capturedAt: Date.now(), usage: memoryUsage() }, null, 2));
    return { filePath };
  } catch (error) {
    return { filePath: "", error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export function runGC(): void {
  globalThis.gc?.();
}

export function removeProfileFile(filePath: string): void {
  rmSync(filePath, { force: true });
}

export function ensureProfileDirectory(profileDir: string): void {
  mkdirSync(profileDir, { recursive: true, mode: 0o755 });
}

export function profileFilePath(profileDir: string, kind: ProfileKind, timestamp: number): string {
  const suffix = kind === "cpu"
    ? "cpuprofile"
    : kind === "memory"
      ? "memprofile"
      : `${kind}profile`;
  return join(profileDir, `${process.pid}-${timestamp}-${suffix}.pb.gz`);
}

export function profileError(message: string, cause: unknown): Error {
  const suffix = cause instanceof Error ? cause.message : String(cause);
  return new Error(`${message}: ${suffix}`);
}

export function profileResult(filePath: string, error?: Error): { readonly filePath: string; readonly error?: Error } {
  return error === undefined ? { filePath } : { filePath, error };
}

export function isProfiling(profiler: CPUProfiler): boolean {
  return profiler.currentSession() !== undefined;
}

export function writeProfilePayload(filePath: string, payload: ProfilePayload): void {
  writeFileSync(filePath, JSON.stringify(payload, null, 2));
}

const discardWriter: ProfileLogWriter = {
  write(_text: string): void {},
};
