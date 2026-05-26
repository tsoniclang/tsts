/**
 * LSP-compliant glob pattern matching.
 *
 * Port of TS-Go internal/glob/glob.go.
 *
 * Spec: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#documentFilter
 *
 * Pattern syntax:
 *   `*`        match one or more chars in a path segment
 *   `?`        match a single char in a path segment
 *   `**`       match any number of path segments (or none)
 *   `{a,b,c}`  group sub-patterns; OR
 *   `[a-z]`    character range; matches any single char in the range
 *   `[!a-z]`   negated character range
 *   `/`        matches one or more literal slashes
 */

interface GlobElement {
  readonly kind:
    | "slash"
    | "literal"
    | "star"
    | "anyChar"
    | "starStar"
    | "group"
    | "charRange";
}

interface SlashElement extends GlobElement { kind: "slash"; }
interface LiteralElement extends GlobElement { kind: "literal"; value: string; }
interface StarElement extends GlobElement { kind: "star"; }
interface AnyCharElement extends GlobElement { kind: "anyChar"; }
interface StarStarElement extends GlobElement { kind: "starStar"; }
interface GroupElement extends GlobElement { kind: "group"; branches: readonly Glob[]; }
interface CharRangeElement extends GlobElement { kind: "charRange"; negate: boolean; low: number; high: number; }

type Element =
  | SlashElement
  | LiteralElement
  | StarElement
  | AnyCharElement
  | StarStarElement
  | GroupElement
  | CharRangeElement;

export class Glob {
  readonly elems: readonly Element[];

  constructor(elems: readonly Element[]) {
    this.elems = elems;
  }

  toString(): string {
    return this.elems.map(elementToString).join("");
  }

  /** Reports whether the input matches the glob pattern. */
  match(input: string): boolean {
    return matchElems(this.elems, input);
  }
}

export class GlobError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GlobError";
  }
}

const ERR_BAD_RANGE = "'[' patterns must be of the form [x-y]";

export function parse(pattern: string): Glob {
  const [g, remaining] = parseInner(pattern, false);
  if (remaining.length > 0) {
    throw new GlobError(`unexpected trailing content: ${remaining}`);
  }
  return g;
}

function parseInner(pattern: string, nested: boolean): [Glob, string] {
  const elems: Element[] = [];

  while (pattern.length > 0) {
    const ch = pattern[0]!;
    switch (ch) {
      case "/":
        pattern = pattern.slice(1);
        elems.push({ kind: "slash" });
        break;

      case "*": {
        if (pattern.length > 1 && pattern[1] === "*") {
          const lastIsSlash = elems.length > 0 && elems[elems.length - 1]!.kind === "slash";
          if ((elems.length > 0 && !lastIsSlash) ||
              (pattern.length > 2 && pattern[2] !== "/")) {
            throw new GlobError("** may only be adjacent to '/'");
          }
          pattern = pattern.slice(2);
          elems.push({ kind: "starStar" });
        } else {
          pattern = pattern.slice(1);
          elems.push({ kind: "star" });
        }
        break;
      }

      case "?":
        pattern = pattern.slice(1);
        elems.push({ kind: "anyChar" });
        break;

      case "{": {
        const branches: Glob[] = [];
        while (pattern[0] !== "}") {
          pattern = pattern.slice(1);  // skip '{' or ','
          const [branch, rest] = parseInner(pattern, true);
          if (rest.length === 0) {
            throw new GlobError("unmatched '{'");
          }
          pattern = rest;
          branches.push(branch);
        }
        pattern = pattern.slice(1);  // skip '}'
        elems.push({ kind: "group", branches });
        break;
      }

      case "}":
      case ",":
        if (nested) {
          return [new Glob(elems), pattern];
        }
        pattern = parseLiteralAppend(elems, pattern, false);
        break;

      case "[": {
        pattern = pattern.slice(1);
        if (pattern.length === 0) {
          throw new GlobError(ERR_BAD_RANGE);
        }
        let negate = false;
        if (pattern[0] === "!") {
          pattern = pattern.slice(1);
          negate = true;
        }
        const low = pattern.codePointAt(0);
        if (low === undefined) {
          throw new GlobError(ERR_BAD_RANGE);
        }
        pattern = pattern.slice(low > 0xFFFF ? 2 : 1);
        if (pattern.length === 0 || pattern[0] !== "-") {
          throw new GlobError(ERR_BAD_RANGE);
        }
        pattern = pattern.slice(1);
        const high = pattern.codePointAt(0);
        if (high === undefined) {
          throw new GlobError(ERR_BAD_RANGE);
        }
        pattern = pattern.slice(high > 0xFFFF ? 2 : 1);
        if (pattern.length === 0 || pattern[0] !== "]") {
          throw new GlobError(ERR_BAD_RANGE);
        }
        pattern = pattern.slice(1);
        elems.push({ kind: "charRange", negate, low, high });
        break;
      }

      default:
        pattern = parseLiteralAppend(elems, pattern, nested);
        break;
    }
  }

  return [new Glob(elems), ""];
}

const SPECIAL_CHARS = new Set(["*", "?", "{", "[", "/"]);
const SPECIAL_CHARS_NESTED = new Set(["*", "?", "{", "[", "/", "}", ","]);

function parseLiteralAppend(
  elems: Element[],
  pattern: string,
  nested: boolean
): string {
  const stopSet = nested ? SPECIAL_CHARS_NESTED : SPECIAL_CHARS;
  let end = 0;
  while (end < pattern.length && !stopSet.has(pattern[end]!)) {
    end += 1;
  }
  if (end === 0) end = pattern.length;
  elems.push({ kind: "literal", value: pattern.slice(0, end) });
  return pattern.slice(end);
}

function elementToString(e: Element): string {
  switch (e.kind) {
    case "slash": return "/";
    case "literal": return e.value;
    case "star": return "*";
    case "anyChar": return "?";
    case "starStar": return "**";
    case "group": return "{" + e.branches.map((b) => b.toString()).join(",") + "}";
    case "charRange": {
      const lo = String.fromCodePoint(e.low);
      const hi = String.fromCodePoint(e.high);
      return e.negate ? `[!${lo}-${hi}]` : `[${lo}-${hi}]`;
    }
  }
}

function matchElems(elems: readonly Element[], input: string): boolean {
  let i = 0;
  while (i < elems.length) {
    const elem = elems[i]!;
    i += 1;

    switch (elem.kind) {
      case "slash":
        if (input.length === 0 || input[0] !== "/") return false;
        while (input.length > 0 && input[0] === "/") {
          input = input.slice(1);
        }
        break;

      case "starStar": {
        // Skip the following slash (enforced by parse).
        if (i < elems.length) i += 1;

        // Trailing ** matches everything.
        if (i === elems.length) return true;

        // Backtrack: advance segments until remaining elements match.
        const rest = elems.slice(i);
        while (input.length > 0) {
          if (matchElems(rest, input)) return true;
          input = splitAndRest(input);
        }
        return false;
      }

      case "literal":
        if (!input.startsWith(elem.value)) return false;
        input = input.slice(elem.value.length);
        break;

      case "star": {
        const [segInput, restAfter] = splitFirst(input);

        // Find end of current segment in `elems` (next slash, or end of elems).
        let elemEnd = elems.length;
        for (let k = i; k < elems.length; k += 1) {
          if (elems[k]!.kind === "slash") {
            elemEnd = k;
            break;
          }
        }
        const segElems = elems.slice(i, elemEnd);
        const remaining = elems.slice(elemEnd);

        // Trailing * matches the whole segment.
        if (segElems.length === 0) {
          input = restAfter !== undefined ? "/" + restAfter : "";
          // continue with remaining
          if (matchElems(remaining, input)) return true;
          return restAfter === undefined && remaining.length === 0;
        }

        // Backtrack: advance chars until segElems match.
        let matched = false;
        for (let k = 0; k <= segInput.length; k += 1) {
          if (matchElems(segElems, segInput.slice(k))) {
            matched = true;
            break;
          }
        }
        if (!matched) return false;
        input = restAfter !== undefined ? "/" + restAfter : "";
        // Continue with remaining elems
        return matchElems(remaining, input);
      }

      case "anyChar":
        if (input.length === 0 || input[0] === "/") return false;
        input = input.slice(1);
        break;

      case "group": {
        const rest = elems.slice(i);
        for (const branch of elem.branches) {
          const combined: Element[] = [...branch.elems, ...rest];
          if (matchElems(combined, input)) return true;
        }
        return false;
      }

      case "charRange": {
        if (input.length === 0 || input[0] === "/") return false;
        const cp = input.codePointAt(0)!;
        const inRange = cp >= elem.low && cp <= elem.high;
        if (elem.negate ? inRange : !inRange) return false;
        input = input.slice(cp > 0xFFFF ? 2 : 1);
        break;
      }
    }
  }

  return input.length === 0;
}

function splitFirst(input: string): [string, string | undefined] {
  const idx = input.indexOf("/");
  if (idx < 0) return [input, undefined];
  return [input.slice(0, idx), input.slice(idx + 1)];
}

function splitAndRest(input: string): string {
  const idx = input.indexOf("/");
  if (idx < 0) return "";
  // Skip consecutive slashes
  let j = idx;
  while (j < input.length && input[j] === "/") {
    j += 1;
  }
  return input.slice(j);
}
