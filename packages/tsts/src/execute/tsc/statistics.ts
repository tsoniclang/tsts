/**
 * Command-line statistics reporting.
 *
 * Port of TS-Go `internal/execute/tsc/statistics.go`.
 */

import type { CompileTimes } from "./compile.js";

export interface TextWriter {
  write(text: string): void;
}

export interface ProgramStatisticsSource {
  sourceFileCount(): number;
  lineCount(): number;
  identifierCount(): number;
  symbolCount(): number;
  typeCount(): number;
  instantiationCount(): number;
}

export interface EmitInput {
  readonly program: ProgramStatisticsSource;
  readonly compileTimes: CompileTimes;
}

export interface MemoryStats {
  readonly alloc: number;
  readonly mallocs: number;
}

interface TableRow {
  readonly name: string;
  readonly value: string;
}

class Table {
  private readonly rows: TableRow[] = [];

  add(name: string, value: string | number): void {
    this.rows.push({ name, value: String(value) });
  }

  addDuration(name: string, value: number | undefined): void {
    if (value === undefined || value === 0) return;
    this.add(name, formatDuration(value));
  }

  print(writer: TextWriter): void {
    let nameWidth = 0;
    let valueWidth = 0;
    for (const row of this.rows) {
      nameWidth = Math.max(nameWidth, row.name.length);
      valueWidth = Math.max(valueWidth, row.value.length);
    }

    for (const row of this.rows) {
      writer.write(padEnd(row.name + ":", nameWidth + 1) + " " + padStart(row.value, valueWidth) + "\n");
    }
  }
}

function padEnd(value: string, width: number): string {
  if (value.length >= width) return value;
  return value + " ".repeat(width - value.length);
}

function padStart(value: string, width: number): string {
  if (value.length >= width) return value;
  return " ".repeat(width - value.length) + value;
}

export function formatDuration(durationMilliseconds: number): string {
  const roundedMilliseconds = (durationMilliseconds + 0.5) | 0;
  const milliseconds = roundedMilliseconds % 1000;
  const seconds = (roundedMilliseconds - milliseconds) / 1000;
  let millisecondsText = String(milliseconds);
  while (millisecondsText.length < 3) millisecondsText = "0" + millisecondsText;
  return String(seconds) + "." + millisecondsText + "s";
}

export class Statistics {
  isAggregate = false;
  projects = 0;
  projectsBuilt = 0;
  timestampUpdates = 0;
  files = 0;
  lines = 0;
  identifiers = 0;
  symbols = 0;
  types = 0;
  instantiations = 0;
  memoryUsed = 0;
  memoryAllocs = 0;
  compileTimes: CompileTimes = { parseTime: 0, totalTime: 0 };

  static fromProgram(input: EmitInput, memStats: MemoryStats): Statistics {
    const stats = new Statistics();
    stats.files = input.program.sourceFileCount();
    stats.lines = input.program.lineCount();
    stats.identifiers = input.program.identifierCount();
    stats.symbols = input.program.symbolCount();
    stats.types = input.program.typeCount();
    stats.instantiations = input.program.instantiationCount();
    stats.memoryUsed = memStats.alloc;
    stats.memoryAllocs = memStats.mallocs;
    stats.compileTimes = input.compileTimes;
    return stats;
  }

  report(writer: TextWriter): void {
    const table = new Table();
    const prefix = this.isAggregate ? "Aggregate " : "";

    if (this.isAggregate) {
      table.add("Projects in scope", this.projects);
      table.add("Projects built", this.projectsBuilt);
      table.add("Timestamps only updates", this.timestampUpdates);
    }
    table.add(prefix + "Files", this.files);
    table.add(prefix + "Lines", this.lines);
    table.add(prefix + "Identifiers", this.identifiers);
    table.add(prefix + "Symbols", this.symbols);
    table.add(prefix + "Types", this.types);
    table.add(prefix + "Instantiations", this.instantiations);
    table.add(prefix + "Memory used", Math.floor(this.memoryUsed / 1024) + "K");
    table.add(prefix + "Memory allocs", this.memoryAllocs);
    table.addDuration(prefix + "Config time", this.compileTimes.configTime);
    table.addDuration(prefix + "BuildInfo read time", this.compileTimes.buildInfoReadTime);
    table.add(prefix + "Parse time", formatDuration(this.compileTimes.parseTime));
    table.addDuration(prefix + "Bind time", this.compileTimes.bindTime);
    table.addDuration(prefix + "Check time", this.compileTimes.checkTime);
    table.addDuration(prefix + "Emit time", this.compileTimes.emitTime);
    table.addDuration(prefix + "Changes compute time", this.compileTimes.changesComputeTime);
    table.add(prefix + "Total time", formatDuration(this.compileTimes.totalTime));
    table.print(writer);
  }

  aggregate(stat: Statistics): void {
    this.isAggregate = true;
    this.files += stat.files;
    this.lines += stat.lines;
    this.identifiers += stat.identifiers;
    this.symbols += stat.symbols;
    this.types += stat.types;
    this.instantiations += stat.instantiations;
    this.memoryUsed += stat.memoryUsed;
    this.memoryAllocs += stat.memoryAllocs;
    this.compileTimes.configTime = (this.compileTimes.configTime ?? 0) + (stat.compileTimes.configTime ?? 0);
    this.compileTimes.buildInfoReadTime = (this.compileTimes.buildInfoReadTime ?? 0) + (stat.compileTimes.buildInfoReadTime ?? 0);
    this.compileTimes.parseTime += stat.compileTimes.parseTime;
    this.compileTimes.bindTime = (this.compileTimes.bindTime ?? 0) + (stat.compileTimes.bindTime ?? 0);
    this.compileTimes.checkTime = (this.compileTimes.checkTime ?? 0) + (stat.compileTimes.checkTime ?? 0);
    this.compileTimes.emitTime = (this.compileTimes.emitTime ?? 0) + (stat.compileTimes.emitTime ?? 0);
    this.compileTimes.changesComputeTime = (this.compileTimes.changesComputeTime ?? 0) + (stat.compileTimes.changesComputeTime ?? 0);
  }

  setTotalTime(totalTime: number): void {
    this.compileTimes.totalTime = totalTime;
  }
}
