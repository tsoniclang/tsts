import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import type { GoValueOps } from "./compat.js";
import {
  DurationValueOps,
  Millisecond,
  Minute,
  Now,
  Second,
  Time,
  TimeValueEqual,
  TimeValueOps,
  Unix,
  UnixMilli,
  type Duration,
} from "./time.js";
import { TimeFromDate, TimeToDate } from "../runtime-adapters/time.js";

interface TimeOracle {
  readonly duration: {
    readonly minimum: string;
    readonly maximum: string;
    readonly millisecond: string;
    readonly second: string;
    readonly minute: string;
  };
  readonly zero: {
    readonly freshAddresses: boolean;
    readonly rawEqual: boolean;
    readonly isZero: boolean;
    readonly unixMilliseconds: number;
    readonly epochIsZero: boolean;
    readonly epochMilliseconds: number;
    readonly localYearOneIsZero: boolean;
    readonly sameInstant: boolean;
    readonly sameRepresentation: boolean;
  };
  readonly copy: {
    readonly freshAddress: boolean;
    readonly sameRepresentation: boolean;
    readonly sameInstant: boolean;
    readonly difference: string;
    readonly wallOnlySameInstant: boolean;
    readonly wallOnlySameRepresentation: boolean;
  };
  readonly normalization: {
    readonly negativeNanosecondDifference: string;
    readonly negativeNanosecondMillis: number;
    readonly beforeEpochDifference: string;
    readonly beforeEpochMillis: number;
    readonly overflowNanosecondDifference: string;
    readonly overflowNanosecondMillis: number;
  };
  readonly subtraction: {
    readonly maximum: string;
    readonly minimum: string;
  };
}

const goOracle = JSON.parse(readFileSync(
  path.join(process.cwd(), "packages/tsts/tools/go-runtime-oracle/time.expected.json"),
  "utf8",
)) as TimeOracle;

test("Duration and Time value operations have direct exact types", () => {
  const durationOperations: GoValueOps<Duration> = DurationValueOps;
  const timeOperations: GoValueOps<Time> = TimeValueOps;

  assert.equal(Object.isFrozen(durationOperations), true);
  assert.equal(Object.isFrozen(timeOperations), true);
  assert.equal(durationOperations.zero(), 0n);

  if (false) {
    const duration: Duration = 1n;
    const bigintValue: bigint = duration;
    // @ts-expect-error JavaScript numbers are not exact Duration storage.
    const numberValue: Duration = 1;
    // @ts-expect-error A Time constructor creates only Go's zero value.
    const epoch = new Time(0);
    void bigintValue;
    void numberValue;
    void epoch;
  }
});

test("Duration and Time semantics match the pinned Go 1.26.4 oracle", () => {
  const minimumDuration = (-(1n << 63n)) as Duration;
  const maximumDuration = ((1n << 63n) - 1n) as Duration;
  const zero = TimeValueOps.zero();
  const anotherZero = TimeValueOps.zero();
  const epoch = UnixMilli(0);
  const localYearOne = Unix(-62_135_596_800, 0);
  const now = Now();
  const nowCopy = TimeValueOps.copy(now);
  const wallOnlyNow = UnixMilli(now.UnixMilli());
  const negativeNanosecond = Unix(1, -1);
  const beforeEpoch = Unix(0, -1);
  const overflowNanosecond = Unix(0, 1_000_000_001);
  const farFuture = Unix(10_000_000_000, 0);

  assert.deepEqual({
    duration: {
      minimum: DurationValueOps.copy(minimumDuration).toString(),
      maximum: DurationValueOps.copy(maximumDuration).toString(),
      millisecond: Millisecond.toString(),
      second: Second.toString(),
      minute: Minute.toString(),
    },
    zero: {
      freshAddresses: zero !== anotherZero,
      rawEqual: TimeValueEqual(zero, anotherZero),
      isZero: zero.IsZero(),
      unixMilliseconds: zero.UnixMilli(),
      epochIsZero: epoch.IsZero(),
      epochMilliseconds: epoch.UnixMilli(),
      localYearOneIsZero: localYearOne.IsZero(),
      sameInstant: zero.Equal(localYearOne),
      sameRepresentation: TimeValueEqual(zero, localYearOne),
    },
    copy: {
      freshAddress: now !== nowCopy,
      sameRepresentation: TimeValueEqual(now, nowCopy),
      sameInstant: now.Equal(nowCopy),
      difference: nowCopy.Sub(now).toString(),
      wallOnlySameInstant: now.Equal(wallOnlyNow),
      wallOnlySameRepresentation: TimeValueEqual(now, wallOnlyNow),
    },
    normalization: {
      negativeNanosecondDifference: negativeNanosecond.Sub(epoch).toString(),
      negativeNanosecondMillis: negativeNanosecond.UnixMilli(),
      beforeEpochDifference: beforeEpoch.Sub(epoch).toString(),
      beforeEpochMillis: beforeEpoch.UnixMilli(),
      overflowNanosecondDifference: overflowNanosecond.Sub(epoch).toString(),
      overflowNanosecondMillis: overflowNanosecond.UnixMilli(),
    },
    subtraction: {
      maximum: farFuture.Sub(epoch).toString(),
      minimum: epoch.Sub(farFuture).toString(),
    },
  }, goOracle);
});

test("Time compares instants independently from raw location representation", () => {
  const earlier = UnixMilli(1_000);
  const same = UnixMilli(1_000);
  const later = UnixMilli(2_000);

  assert.equal(earlier.Equal(same), true);
  assert.equal(earlier.Equal(later), false);
  assert.equal(earlier.Before(later), true);
  assert.equal(later.Before(earlier), false);
  assert.equal(later.After(earlier), true);
  assert.equal(earlier.After(later), false);
  assert.equal(TimeValueEqual(earlier, same), true);
});

test("Date adapters copy host values and fail outside their exact domain", () => {
  const date = new Date("2001-02-03T04:05:06.000Z");
  const instant = TimeFromDate(date);
  date.setTime(0);

  assert.equal(instant.UnixMilli(), 981_173_106_000);
  const converted = TimeToDate(instant);
  converted.setTime(0);
  assert.equal(instant.UnixMilli(), 981_173_106_000);
  assert.equal(TimeToDate(new Time()).toISOString(), "0001-01-01T00:00:00.000Z");
  assert.throws(() => TimeFromDate(new Date(Number.NaN)), /must be a safe integer/);
  assert.throws(() => Unix(Number.MAX_SAFE_INTEGER + 1, 0), /must be a safe integer/);
});
