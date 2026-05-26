/**
 * Checker tracing.
 *
 * Port of TS-Go `internal/checker/tracer.go` (~327 LoC). Optional
 * structured-trace output (events with timestamps, durations, types)
 * for diagnosing checker performance.
 */

export interface TraceEvent {
  name: string;
  ts: number;
  dur?: number;
  args?: Record<string, unknown>;
  cat?: string;
}

export class CheckerTracer {
  events: TraceEvent[] = [];
  enabled = false;
  startTime = 0;

  start(): void {
    this.enabled = true;
    this.startTime = Date.now();
  }

  stop(): readonly TraceEvent[] {
    this.enabled = false;
    return this.events;
  }

  begin(name: string, cat?: string, args?: Record<string, unknown>): number {
    if (!this.enabled) return 0;
    const ts = Date.now() - this.startTime;
    const ev: TraceEvent = { name, ts };
    if (cat !== undefined) ev.cat = cat;
    if (args !== undefined) ev.args = args;
    this.events.push(ev);
    return ts;
  }

  end(beginTs: number): void {
    if (!this.enabled || this.events.length === 0) return;
    const last = this.events[this.events.length - 1]!;
    last.dur = Date.now() - this.startTime - beginTs;
  }

  trace(name: string, fn: () => void, cat?: string, args?: Record<string, unknown>): void {
    const ts = this.begin(name, cat, args);
    try {
      fn();
    } finally {
      this.end(ts);
    }
  }

  push(event: TraceEvent): void {
    this.events.push(event);
  }

  reset(): void {
    this.events = [];
  }

  toJSON(): string {
    return JSON.stringify(this.events);
  }
}

export function newCheckerTracer(): CheckerTracer {
  return new CheckerTracer();
}
