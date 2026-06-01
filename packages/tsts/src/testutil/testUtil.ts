export function assert(condition: boolean, message = "assertion failed"): asserts condition {
  if (!condition) throw new Error(message);
}

export function must<T>(value: T | undefined, message = "expected value"): T {
  if (value === undefined) throw new Error(message);
  return value;
}

export function expectError(fn: () => void, message?: string): Error {
  try {
    fn();
  } catch (error) {
    if (error instanceof Error) return error;
    return new Error(String(error));
  }
  throw new Error(message ?? "expected function to throw");
}

export function assertPanics(fn: () => void, expected: unknown, message = "expected function to throw"): void {
  let got: unknown;
  let didThrow = false;
  try {
    fn();
  } catch (error) {
    got = error;
    didThrow = true;
  }
  assert(didThrow, message);
  if (!samePanicValue(got, expected)) {
    throw new Error(`panic mismatch: expected ${panicValueToString(expected)}, got ${panicValueToString(got)}`);
  }
}

export function recoverAndFail(message: string, fn: () => void): void {
  try {
    fn();
  } catch (error) {
    const detail = error instanceof Error ? error.stack ?? error.message : String(error);
    throw new Error(`${message}:\n${detail}`);
  }
}

export function testProgramIsSingleThreaded(env: ReadonlyMap<string, string | undefined> = processEnv()): boolean {
  const value = env.get("TS_TEST_PROGRAM_SINGLE_THREADED");
  if (value !== undefined && value !== "") return parseBoolean(value);
  return !raceEnabled(env);
}

export function raceEnabled(env: ReadonlyMap<string, string | undefined> = processEnv()): boolean {
  return parseBoolean(env.get("TS_GO_RACE") ?? env.get("TSTS_RACE") ?? "");
}

function samePanicValue(left: unknown, right: unknown): boolean {
  if (left === right) return true;
  if (left instanceof Error && right instanceof Error) return left.message === right.message;
  if (left instanceof Error && typeof right === "string") return left.message === right;
  if (right instanceof Error && typeof left === "string") return right.message === left;
  return false;
}

function panicValueToString(value: unknown): string {
  return value instanceof Error ? value.message : String(value);
}

function parseBoolean(value: string): boolean {
  switch (value.toLowerCase()) {
    case "1":
    case "t":
    case "true":
    case "yes":
    case "y":
    case "on":
      return true;
    default:
      return false;
  }
}

function processEnv(): ReadonlyMap<string, string | undefined> {
  return new Map(Object.entries(process.env));
}
