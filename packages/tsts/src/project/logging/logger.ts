export interface Logger {
  error(...message: readonly unknown[]): void;
  errorf(format: string, ...args: readonly unknown[]): void;
  warn(...message: readonly unknown[]): void;
  warnf(format: string, ...args: readonly unknown[]): void;
  info(...message: readonly unknown[]): void;
  infof(format: string, ...args: readonly unknown[]): void;
  log(...message: readonly unknown[]): void;
  logf(format: string, ...args: readonly unknown[]): void;
  verbose(): Logger | undefined;
  isVerbose(): boolean;
  setVerbose(verbose: boolean): void;
}

export interface LogWriter {
  write(text: string): void;
}

class LoggerImpl implements Logger {
  private verboseEnabled = false;
  private readonly writer: LogWriter;
  private readonly prefix: () => string;

  constructor(writer: LogWriter, prefix: () => string) {
    this.writer = writer;
    this.prefix = prefix;
  }

  log(...message: readonly unknown[]): void {
    this.writer.write(`${this.prefix()} ${message.map(String).join("")}\n`);
  }

  logf(format: string, ...args: readonly unknown[]): void {
    this.writer.write(`${this.prefix()} ${formatString(format, args)}\n`);
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

export function newLogger(writer: LogWriter): Logger {
  return new LoggerImpl(writer, () => formatTime(new Date()));
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const millis = date.getMilliseconds().toString().padStart(3, "0");
  return `[${hours}:${minutes}:${seconds}.${millis}]`;
}

export function formatString(format: string, args: readonly unknown[]): string {
  let index = 0;
  return format.replace(/%[sdv]/g, () => String(args[index++]));
}

export class StringWriter implements LogWriter {
  private text = "";

  write(value: string): void {
    this.text += value;
  }

  toString(): string {
    return this.text;
  }
}
