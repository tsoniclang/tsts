import { formatString, formatTime, type Logger } from "./logger.js";

let sequence = 0;

interface LogEntry {
  readonly seq: number;
  readonly time: Date;
  readonly message: string;
  readonly child?: LogTree;
}

function newLogEntry(message: string, child?: LogTree): LogEntry {
  sequence += 1;
  return child === undefined
    ? { seq: sequence, time: new Date(), message }
    : { seq: sequence, time: new Date(), message, child };
}

export class LogTree implements Logger {
  private readonly name: string;
  private readonly logs: LogEntry[] = [];
  private readonly root: LogTree;
  private readonly level: number;
  private verboseEnabled = false;

  constructor(name: string, root?: LogTree, level = 0) {
    this.name = name;
    this.root = root ?? this;
    this.level = level;
  }

  log(...message: readonly unknown[]): void {
    this.logs.push(newLogEntry(message.map(String).join("")));
  }

  logf(format: string, ...args: readonly unknown[]): void {
    this.logs.push(newLogEntry(formatString(format, args)));
  }

  isVerbose(): boolean {
    return this.verboseEnabled;
  }

  setVerbose(verbose: boolean): void {
    this.verboseEnabled = verbose;
  }

  verbose(): Logger | undefined {
    return this.verboseEnabled ? this : undefined;
  }

  error(...message: readonly unknown[]): void {
    this.log(...message);
  }

  errorf(format: string, ...args: readonly unknown[]): void {
    this.logf(format, ...args);
  }

  warn(...message: readonly unknown[]): void {
    this.log(...message);
  }

  warnf(format: string, ...args: readonly unknown[]): void {
    this.logf(format, ...args);
  }

  info(...message: readonly unknown[]): void {
    this.log(...message);
  }

  infof(format: string, ...args: readonly unknown[]): void {
    this.logf(format, ...args);
  }

  embed(logs: LogTree): void {
    this.logs.push(newLogEntry(logs.name, logs));
  }

  fork(message: string): LogTree {
    const child = new LogTree(message, this.root, this.level + 1);
    child.setVerbose(this.verboseEnabled);
    this.logs.push(newLogEntry(message, child));
    return child;
  }

  toString(): string {
    if (this.root !== this) throw new Error("can only call toString on root LogTree");
    return `======== ${this.name} ========\n${this.writeLogsRecursive("")}`;
  }

  private writeLogsRecursive(indent: string): string {
    return this.logs
      .sort((left, right) => left.seq - right.seq)
      .map((log) => `${indent}${formatTime(log.time)} ${log.message}\n${log.child === undefined ? "" : log.child.writeLogsRecursive(`${indent}\t`)}`)
      .join("");
  }
}

export function newLogTree(name: string): LogTree {
  return new LogTree(name);
}
