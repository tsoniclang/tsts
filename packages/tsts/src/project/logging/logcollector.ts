import { formatTime, type Logger, StringWriter } from "./logger.js";

export interface LogCollector extends Logger {
  toString(): string;
}

class LogCollectorImpl implements LogCollector {
  private verboseEnabled = false;
  private readonly writer = new StringWriter();

  toString(): string {
    return this.writer.toString();
  }

  log(...message: readonly unknown[]): void {
    this.writer.write(`${formatTime(new Date(1349085672 * 1000))} ${message.map(String).join("")}\n`);
  }

  logf(format: string, ...args: readonly unknown[]): void {
    let index = 0;
    this.log(format.replace(/%[sdv]/g, () => String(args[index++])));
  }

  verbose(): Logger | undefined {
    return this.verboseEnabled ? this : undefined;
  }

  isVerbose(): boolean {
    return this.verboseEnabled;
  }

  setVerbose(verbose: boolean): void {
    this.verboseEnabled = verbose;
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
}

export function newTestLogger(): LogCollector {
  return new LogCollectorImpl();
}
