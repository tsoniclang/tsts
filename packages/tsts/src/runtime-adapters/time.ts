import type { long } from "../go/scalars.js";
import type { Time } from "../go/time.js";
import { UnixMilli } from "../go/time.js";

const maximumDateMilliseconds: number = 8_640_000_000_000_000;

export function TimeFromDate(date: Date): Time {
  const milliseconds = date.getTime();
  if (!Number.isSafeInteger(milliseconds)) {
    throw new RangeError("Date milliseconds must be a safe integer");
  }
  return UnixMilli(milliseconds as long);
}

export function TimeToDate(value: Time): Date {
  const milliseconds = value.UnixMilli();
  if (milliseconds < -maximumDateMilliseconds || milliseconds > maximumDateMilliseconds) {
    throw new RangeError("time.Time is outside the JavaScript Date range");
  }
  return new Date(milliseconds);
}
