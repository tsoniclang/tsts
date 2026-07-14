import type { bool, long } from "./scalars.js";
import type { GoDefined, GoValueOps } from "./compat.js";

export type Duration = GoDefined<bigint, "__goDefinedType::time::type::Duration::a2b59f69065fc1762fc4d97e11e27b8eb52c2372d68658f9858161696d2f1796">;

const minimumInt64 = -(1n << 63n);
const maximumInt64 = (1n << 63n) - 1n;
const nanosecondsPerMillisecond = 1_000_000n;
const nanosecondsPerSecond = 1_000_000_000n;
const nanosecondsPerMinute = 60n * nanosecondsPerSecond;
const millisecondsPerSecond = 1_000n;
const unixToInternal = 62_135_596_800n;
const wallToInternal = 59_453_308_800n;
const hasMonotonic = 1n << 63n;
const wallSecondsMask = (1n << 33n) - 1n;
const nanosecondsMask = (1n << 30n) - 1n;
const nanosecondsShift = 30n;
const maximumDateMilliseconds = 8_640_000_000_000_000n;

export const Millisecond: Duration = nanosecondsPerMillisecond as Duration;
export const Second: Duration = nanosecondsPerSecond as Duration;
export const Minute: Duration = nanosecondsPerMinute as Duration;

const zeroDuration = (): Duration => 0n as Duration;
const copyDuration = (value: Duration): Duration => value;

export const DurationValueOps: GoValueOps<Duration> = Object.freeze({
  zero: zeroDuration,
  copy: copyDuration,
});

interface TimeLocation {
  readonly kind: "local";
}

const localLocation: TimeLocation = Object.freeze({ kind: "local" });
const monotonicStartNanoseconds = process.hrtime.bigint() - 1n;

export class Time {
  #wall = 0n;
  #ext = 0n;
  #location: TimeLocation | undefined;

  constructor() {}

  static copy(value: Time): Time {
    return Time.fromStorage(value.#wall, value.#ext, value.#location);
  }

  static fromUnix(seconds: bigint, nanoseconds: bigint): Time {
    let normalizedSeconds = signedInt64(seconds);
    let normalizedNanoseconds = signedInt64(nanoseconds);
    if (normalizedNanoseconds < 0n || normalizedNanoseconds >= nanosecondsPerSecond) {
      const wholeSeconds = normalizedNanoseconds / nanosecondsPerSecond;
      normalizedSeconds = signedInt64(normalizedSeconds + wholeSeconds);
      normalizedNanoseconds -= wholeSeconds * nanosecondsPerSecond;
      if (normalizedNanoseconds < 0n) {
        normalizedNanoseconds += nanosecondsPerSecond;
        normalizedSeconds = signedInt64(normalizedSeconds - 1n);
      }
    }
    return Time.fromStorage(
      normalizedNanoseconds,
      signedInt64(normalizedSeconds + unixToInternal),
      localLocation,
    );
  }

  static fromUnixMilliseconds(milliseconds: bigint): Time {
    const value = signedInt64(milliseconds);
    return Time.fromUnix(
      value / millisecondsPerSecond,
      (value % millisecondsPerSecond) * nanosecondsPerMillisecond,
    );
  }

  static now(): Time {
    const milliseconds = BigInt(Date.now());
    const seconds = milliseconds / millisecondsPerSecond;
    const nanoseconds = (milliseconds % millisecondsPerSecond) * nanosecondsPerMillisecond;
    const internalSeconds = seconds + unixToInternal;
    const monotonicNanoseconds = signedInt64(process.hrtime.bigint() - monotonicStartNanoseconds);
    if (internalSeconds >= wallToInternal && internalSeconds <= wallToInternal + wallSecondsMask) {
      return Time.fromStorage(
        hasMonotonic | ((internalSeconds - wallToInternal) << nanosecondsShift) | nanoseconds,
        monotonicNanoseconds,
        localLocation,
      );
    }
    return Time.fromStorage(nanoseconds, signedInt64(internalSeconds), localLocation);
  }

  static valueEqual(left: Time, right: Time): bool {
    return left.#wall === right.#wall
      && left.#ext === right.#ext
      && left.#location === right.#location;
  }

  Equal(other: Time): bool {
    if (this.hasMonotonic() && other.hasMonotonic()) {
      return this.#ext === other.#ext;
    }
    return this.seconds() === other.seconds() && this.nanoseconds() === other.nanoseconds();
  }

  Before(other: Time): bool {
    if (this.hasMonotonic() && other.hasMonotonic()) {
      return this.#ext < other.#ext;
    }
    const seconds = this.seconds();
    const otherSeconds = other.seconds();
    return seconds < otherSeconds
      || (seconds === otherSeconds && this.nanoseconds() < other.nanoseconds());
  }

  After(other: Time): bool {
    if (this.hasMonotonic() && other.hasMonotonic()) {
      return this.#ext > other.#ext;
    }
    const seconds = this.seconds();
    const otherSeconds = other.seconds();
    return seconds > otherSeconds
      || (seconds === otherSeconds && this.nanoseconds() > other.nanoseconds());
  }

  Sub(other: Time): Duration {
    const nanoseconds = this.hasMonotonic() && other.hasMonotonic()
      ? this.#ext - other.#ext
      : (this.seconds() - other.seconds()) * nanosecondsPerSecond
        + this.nanoseconds() - other.nanoseconds();
    if (nanoseconds < minimumInt64) return minimumInt64 as Duration;
    if (nanoseconds > maximumInt64) return maximumInt64 as Duration;
    return nanoseconds as Duration;
  }

  UnixMilli(): long {
    return int64ToLong(this.unixMilliseconds(), "time.Time.UnixMilli result");
  }

  IsZero(): bool {
    return this.#wall === 0n && this.#ext === 0n;
  }

  ToDate(): Date {
    const milliseconds = this.unixMilliseconds();
    if (milliseconds < -maximumDateMilliseconds || milliseconds > maximumDateMilliseconds) {
      throw new RangeError("time.Time is outside the JavaScript Date range");
    }
    return new Date(Number(milliseconds));
  }

  private static fromStorage(wall: bigint, ext: bigint, location: TimeLocation | undefined): Time {
    const value = new Time();
    value.#wall = wall;
    value.#ext = ext;
    value.#location = location;
    return value;
  }

  private hasMonotonic(): boolean {
    return (this.#wall & hasMonotonic) !== 0n;
  }

  private nanoseconds(): bigint {
    return this.#wall & nanosecondsMask;
  }

  private seconds(): bigint {
    if (this.hasMonotonic()) {
      return wallToInternal + ((this.#wall >> nanosecondsShift) & wallSecondsMask);
    }
    return this.#ext;
  }

  private unixSeconds(): bigint {
    return signedInt64(this.seconds() - unixToInternal);
  }

  private unixMilliseconds(): bigint {
    return signedInt64(
      this.unixSeconds() * millisecondsPerSecond
      + this.nanoseconds() / nanosecondsPerMillisecond,
    );
  }
}

const zeroTime = (): Time => new Time();
const copyTime = (value: Time): Time => Time.copy(value);

export const TimeValueOps: GoValueOps<Time> = Object.freeze({
  zero: zeroTime,
  copy: copyTime,
});

export function TimeValueEqual(left: Time, right: Time): bool {
  return Time.valueEqual(left, right);
}

export function FromDate(date: Date): Time {
  return Time.fromUnixMilliseconds(longToInt64(date.getTime(), "Date milliseconds"));
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
  return Time.now();
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
  return Time.fromUnix(
    longToInt64(seconds, "time.Unix seconds"),
    longToInt64(nanoseconds, "time.Unix nanoseconds"),
  );
}

export function UnixMilli(milliseconds: long): Time {
  return Time.fromUnixMilliseconds(longToInt64(milliseconds, "time.UnixMilli milliseconds"));
}

function durationToMilliseconds(duration: Duration): number {
  if (duration <= 0n) return 0;
  return Number((duration + nanosecondsPerMillisecond - 1n) / nanosecondsPerMillisecond);
}

function signedInt64(value: bigint): bigint {
  return BigInt.asIntN(64, value);
}

function longToInt64(value: long, label: string): bigint {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`${label} must be a safe integer`);
  }
  return BigInt(value);
}

function int64ToLong(value: bigint, label: string): long {
  const numberValue = Number(value);
  if (!Number.isSafeInteger(numberValue) || BigInt(numberValue) !== value) {
    throw new RangeError(`${label} is outside the exact long carrier range`);
  }
  return numberValue as long;
}
