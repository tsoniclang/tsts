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
  private entryCount = 0;
  private stringLength = 0;

  constructor(name: string, root?: LogTree, level = 0) {
    this.name = name;
    this.root = root ?? this;
    this.level = level;
  }

  log(...message: readonly unknown[]): void {
    this.add(newLogEntry(message.map(String).join("")));
  }

  logf(format: string, ...args: readonly unknown[]): void {
    this.add(newLogEntry(formatString(format, args)));
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
    this.root.entryCount += logs.root.entryCount;
    this.root.stringLength += logs.root.stringLength + logs.root.entryCount * this.level;
    this.add(newLogEntry(logs.name, logs));
  }

  fork(message: string): LogTree {
    const child = new LogTree(message, this.root, this.level + 1);
    child.setVerbose(this.verboseEnabled);
    this.add(newLogEntry(message, child));
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

  private add(log: LogEntry): void {
    this.root.entryCount += 1;
    this.root.stringLength += this.level + 15 + log.message.length + 1;
    this.logs.push(log);
  }

  count(): number {
    return this.root.entryCount;
  }

  estimatedStringLength(): number {
    return this.root.stringLength;
  }
}

export function newLogTree(name: string): LogTree {
  return new LogTree(name);
}
