import type { int } from "./scalars.js";
import type { GoInterface } from "./compat.js";
import { Sprintf } from "./fmt.js";

export const Ldate: int = 1;
export const Ltime: int = 2;
export const Lmicroseconds: int = 4;
export const Llongfile: int = 8;
export const Lshortfile: int = 16;
export const LUTC: int = 32;
export const Lmsgprefix: int = 64;
export const LstdFlags: int = (Ldate | Ltime) as int;

let flags: int = LstdFlags;

export function SetFlags(nextFlags: int): void {
  flags = nextFlags;
}

export function Flags(): int {
  return flags;
}

export function Printf(format: string, ...args: GoInterface<unknown>[]): void {
  globalThis.console.error(formatMessage(format, args));
}

export function Fatalf(format: string, ...args: GoInterface<unknown>[]): never {
  throw new globalThis.Error(formatMessage(format, args));
}

function formatMessage(format: string, args: readonly GoInterface<unknown>[]): string {
  return Sprintf(format, ...args);
}
