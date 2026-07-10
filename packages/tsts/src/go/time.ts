import type { long } from "./scalars.js";

export type Duration = long;

const nanosecondsPerMillisecond = 1_000_000;
const nanosecondsPerSecond = 1_000_000_000;
const nanosecondsPerMinute = 60 * nanosecondsPerSecond;
const zeroTimeUnixMilliseconds = -62_135_596_800_000;

export const Millisecond: Duration = nanosecondsPerMillisecond;

export const Second: Duration = nanosecondsPerSecond;

export const Minute: Duration = nanosecondsPerMinute;

export class Time {
  readonly #unixMilliseconds: long;

  constructor(unixMilliseconds: long = zeroTimeUnixMilliseconds) {
    this.#unixMilliseconds = unixMilliseconds;
  }

  Equal(other: Time): boolean {
    return this.#unixMilliseconds === other.#unixMilliseconds;
  }

  Before(other: Time): boolean {
    return this.#unixMilliseconds < other.#unixMilliseconds;
  }

  After(other: Time): boolean {
    return this.#unixMilliseconds > other.#unixMilliseconds;
  }

  Sub(other: Time): Duration {
    return (this.#unixMilliseconds - other.#unixMilliseconds) * nanosecondsPerMillisecond;
  }

  UnixMilli(): long {
    return this.#unixMilliseconds;
  }

  IsZero(): boolean {
    return this.#unixMilliseconds === zeroTimeUnixMilliseconds;
  }

  ToDate(): Date {
    return new Date(this.#unixMilliseconds);
  }
}

export function FromDate(date: Date): Time {
  return new Time(date.getTime());
}

export interface Timer {
  C: Promise<Time>;
  Stop(): boolean;
}

export interface Ticker {
  C: AsyncIterable<Time>;
  Stop(): void;
}

export function After(duration: Duration): Promise<Time> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Now()), durationToMilliseconds(duration));
  });
}

export function AfterFunc(duration: Duration, callback: () => void): Timer {
  const handle = setTimeout(callback, durationToMilliseconds(duration));
  return {
    C: Promise.resolve(Now()),
    Stop: () => {
      clearTimeout(handle);
      return true;
    },
  };
}

export function NewTicker(duration: Duration): Ticker {
  let stopped = false;
  return {
    C: {
      async *[Symbol.asyncIterator](): AsyncIterator<Time> {
        while (!stopped) {
          await Sleep(duration);
          if (!stopped) {
            yield Now();
          }
        }
      },
    },
    Stop: () => {
      stopped = true;
    },
  };
}

export function NewTimer(duration: Duration): Timer {
  let active = true;
  let handle!: ReturnType<typeof setTimeout>;
  const promise = new Promise<Time>((resolve) => {
    handle = setTimeout(() => {
      active = false;
      resolve(Now());
    }, durationToMilliseconds(duration));
  });
  return {
    C: promise,
    Stop: () => {
      if (!active) {
        return false;
      }
      clearTimeout(handle);
      active = false;
      return true;
    },
  };
}

export function Now(): Time {
  return new Time(Date.now());
}

export function Since(time: Time): Duration {
  return Now().Sub(time);
}

export function Sleep(duration: Duration): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationToMilliseconds(duration));
  });
}

export function Unix(seconds: long, nanoseconds: long): Time {
  return new Time(seconds * 1000 + Math.floor(nanoseconds / nanosecondsPerMillisecond));
}

export function UnixMilli(milliseconds: long): Time {
  return new Time(milliseconds);
}

const durationToMilliseconds = (duration: Duration): number => {
  return Math.max(0, Math.floor(duration / nanosecondsPerMillisecond));
}
