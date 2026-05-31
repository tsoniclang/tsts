export type WatchKind = number;
export const WatchKind = {
  Create: 1,
  Change: 2,
  Delete: 4,
} as const;

export interface PatternAndIgnored {
  readonly pattern: string;
  readonly ignored?: readonly string[];
}

export type PatternsAndIgnored = readonly PatternAndIgnored[];

export interface WatchRegistration<TPayload> {
  readonly id: string;
  readonly watchKind: WatchKind;
  readonly payload: TPayload;
}

export class WatchedFiles<TPayload> {
  readonly name: string;
  readonly watchKind: WatchKind;
  private readonly registrations = new Map<string, WatchRegistration<TPayload>>();

  constructor(name: string, watchKind: WatchKind) {
    this.name = name;
    this.watchKind = watchKind;
  }

  set(id: string, payload: TPayload): void {
    this.registrations.set(id, { id, watchKind: this.watchKind, payload });
  }

  delete(id: string): void {
    this.registrations.delete(id);
  }

  clear(): void {
    this.registrations.clear();
  }

  get(id: string): WatchRegistration<TPayload> | undefined {
    return this.registrations.get(id);
  }

  values(): readonly WatchRegistration<TPayload>[] {
    return [...this.registrations.values()].sort((left, right) => left.id.localeCompare(right.id));
  }

  isEmpty(): boolean {
    return this.registrations.size === 0;
  }
}

export function newWatchedFiles<TPayload>(name: string, watchKind: WatchKind): WatchedFiles<TPayload> {
  return new WatchedFiles(name, watchKind);
}
