import test from "node:test";
import assert from "node:assert/strict";
import { FromDate, Time, UnixMilli } from "./time.js";

test("Time uses Go's year-1 zero value", () => {
  const zero = new Time();

  assert.equal(zero.IsZero(), true);
  assert.equal(zero.UnixMilli(), -62_135_596_800_000);
  assert.equal(zero.ToDate().toISOString(), "0001-01-01T00:00:00.000Z");
  assert.equal(UnixMilli(0).IsZero(), false);
});

test("Time compares instants", () => {
  const earlier = UnixMilli(1_000);
  const same = UnixMilli(1_000);
  const later = UnixMilli(2_000);

  assert.equal(earlier.Equal(same), true);
  assert.equal(earlier.Equal(later), false);
  assert.equal(earlier.Before(later), true);
  assert.equal(later.Before(earlier), false);
  assert.equal(later.After(earlier), true);
  assert.equal(earlier.After(later), false);
});

test("Time converts Date values without retaining mutable state", () => {
  const date = new Date("2001-02-03T04:05:06.000Z");
  const instant = FromDate(date);
  date.setTime(0);

  assert.equal(instant.UnixMilli(), 981_173_106_000);

  const converted = instant.ToDate();
  converted.setTime(0);
  assert.equal(instant.UnixMilli(), 981_173_106_000);
});
