import type { GoError } from "../../../compat.js";
import type { Context } from "../../../context.js";

export class Group {
  private err: GoError;

  Go(fn: () => GoError): void {
    const err = fn();
    if (err !== undefined && this.err === undefined) {
      this.err = err;
    }
  }

  Wait(): GoError {
    return this.err;
  }
}

export function WithContext(ctx: Context): [Group, Context] {
  return [new Group(), ctx];
}
