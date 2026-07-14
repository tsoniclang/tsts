import type { bool, int } from "../../go/scalars.js";
import type { GoError, GoInterface, GoPtr, GoRune, GoSlice } from "../../go/compat.js";
import { GoSliceAppend, GoStringValueOps } from "../../go/compat.js";
import { GoAppend, GoAppendSlice, GoNilSlice, GoSliceToZeroLength } from "../../go/compat.js";
import type { Stringer } from "../../go/fmt.js";
import * as errors from "../../go/errors.js";
import * as fmt from "../../go/fmt.js";
import * as strings from "../../go/strings.js";
import * as utf8 from "../../go/unicode/utf8.js";
import { GoInterfaceValueOps, GoSliceLoad } from "../../go/compat.js";


// runeToString mirrors Go's string(rune) conversion: a valid rune yields its
// UTF-8 character, an invalid rune yields the Unicode replacement character.
const runeToString = (r: GoRune): string => {
  if (r < 0 || (r >= 0xd800 && r <= 0xdfff) || r > utf8.MaxRune) {
    return globalThis.String.fromCodePoint(utf8.RuneError);
  }
  return globalThis.String.fromCodePoint(r);
};

// Runtime element kinds. The Go element interface is satisfied by several
// concrete types (empty structs, string, slice, struct). This port carries an
// internal kind tag plus the typed Go payload so that the type switch in
// match (and the String methods invoked via fmt.Fprint) can recover the exact
// concrete value, faithfully reproducing Go's type switch over element.
type ElemKind = "slash" | "literal" | "star" | "anyChar" | "starStar" | "group" | "charRange";

interface elemCarrier extends Stringer {
  readonly __kind: ElemKind;
}

interface slashCarrier extends elemCarrier {
  readonly __kind: "slash";
}
interface literalCarrier extends elemCarrier {
  readonly __kind: "literal";
  readonly value: literal;
}
interface starCarrier extends elemCarrier {
  readonly __kind: "star";
}
interface anyCharCarrier extends elemCarrier {
  readonly __kind: "anyChar";
}
interface starStarCarrier extends elemCarrier {
  readonly __kind: "starStar";
}
interface groupCarrier extends elemCarrier {
  readonly __kind: "group";
  readonly value: group;
}
interface charRangeCarrier extends elemCarrier {
  readonly __kind: "charRange";
  readonly value: charRange;
}

const newSlash = (): element => {
  const c: slashCarrier = {
    __kind: "slash",
    String: (): string => slash_String({}),
  };
  return c;
};

const newLiteral = (value: literal): element => {
  const c: literalCarrier = {
    __kind: "literal",
    value,
    String: (): string => literal_String(value),
  };
  return c;
};

const newStar = (): element => {
  const c: starCarrier = {
    __kind: "star",
    String: (): string => star_String({}),
  };
  return c;
};

const newAnyChar = (): element => {
  const c: anyCharCarrier = {
    __kind: "anyChar",
    String: (): string => anyChar_String({}),
  };
  return c;
};

const newStarStar = (): element => {
  const c: starStarCarrier = {
    __kind: "starStar",
    String: (): string => starStar_String({}),
  };
  return c;
};

const newGroup = (value: group): element => {
  const c: groupCarrier = {
    __kind: "group",
    value,
    String: (): string => group_String(value),
  };
  return c;
};

const newCharRange = (value: charRange): element => {
  const c: charRangeCarrier = {
    __kind: "charRange",
    value,
    String: (): string => charRange_String(value),
  };
  return c;
};

// Type guards implementing Go's type switch over the element interface. The
// `in` operator narrows the structural Stringer and the literal `__kind`
// comparison selects the concrete carrier, mirroring Go's `elem.(type)`
// assertions without an unchecked cast.
const isSlashCarrier = (e: element): e is slashCarrier => "__kind" in e && e.__kind === "slash";
const isLiteralCarrier = (e: element): e is literalCarrier => "__kind" in e && e.__kind === "literal";
const isStarCarrier = (e: element): e is starCarrier => "__kind" in e && e.__kind === "star";
const isAnyCharCarrier = (e: element): e is anyCharCarrier => "__kind" in e && e.__kind === "anyChar";
const isStarStarCarrier = (e: element): e is starStarCarrier => "__kind" in e && e.__kind === "starStar";
const isGroupCarrier = (e: element): e is groupCarrier => "__kind" in e && e.__kind === "group";
const isCharRangeCarrier = (e: element): e is charRangeCarrier => "__kind" in e && e.__kind === "charRange";

// isSlash reports whether e is a slash element, the equivalent of Go's
// `e == (slash{})` value comparison.
const isSlash = (e: element): bool => isSlashCarrier(e);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::Glob","kind":"type","status":"implemented","sigHash":"42b3a6bb80d210839fc4055e5dde3f360cbc3ba41f3ebc70ddd8278a6f0247ad"}
 *
 * Go source:
 * Glob struct {
 * 	elems []element // pattern elements
 * }
 */
export interface Glob {
  elems: GoSlice<GoInterface<element>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::func::Parse","kind":"func","status":"implemented","sigHash":"8cead61fd2ed0ec4228a7ff57942012bc00d4a66070229b877bf2d47dffd290f"}
 *
 * Go source:
 * func Parse(pattern string) (*Glob, error) {
 * 	g, _, err := parse(pattern, false)
 * 	return g, err
 * }
 */
export function Parse(pattern: string): [GoPtr<Glob>, GoError] {
  const [g, , err] = parse(pattern, false);
  return [g, err];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::func::parse","kind":"func","status":"implemented","sigHash":"866f1a52349ba2273678c99bfe5eb7cd9b7d13848a0ea98f001df0d130e9120d"}
 *
 * Go source:
 * func parse(pattern string, nested bool) (*Glob, string, error) {
 * 	g := new(Glob)
 * 	for len(pattern) > 0 {
 * 		switch pattern[0] {
 * 		case '/':
 * 			pattern = pattern[1:]
 * 			g.elems = append(g.elems, slash{})
 * 
 * 		case '*':
 * 			if len(pattern) > 1 && pattern[1] == '*' {
 * 				if (len(g.elems) > 0 && g.elems[len(g.elems)-1] != slash{}) || (len(pattern) > 2 && pattern[2] != '/') {
 * 					return nil, "", errors.New("** may only be adjacent to '/'")
 * 				}
 * 				pattern = pattern[2:]
 * 				g.elems = append(g.elems, starStar{})
 * 				break
 * 			}
 * 			pattern = pattern[1:]
 * 			g.elems = append(g.elems, star{})
 * 
 * 		case '?':
 * 			pattern = pattern[1:]
 * 			g.elems = append(g.elems, anyChar{})
 * 
 * 		case '{':
 * 			var gs group
 * 			for pattern[0] != '}' {
 * 				pattern = pattern[1:]
 * 				groupG, pat, err := parse(pattern, true)
 * 				if err != nil {
 * 					return nil, "", err
 * 				}
 * 				if len(pat) == 0 {
 * 					return nil, "", errors.New("unmatched '{'")
 * 				}
 * 				pattern = pat
 * 				gs = append(gs, groupG)
 * 			}
 * 			pattern = pattern[1:]
 * 			g.elems = append(g.elems, gs)
 * 
 * 		case '}', ',':
 * 			if nested {
 * 				return g, pattern, nil
 * 			}
 * 			pattern = g.parseLiteral(pattern, false)
 * 
 * 		case '[':
 * 			pattern = pattern[1:]
 * 			if len(pattern) == 0 {
 * 				return nil, "", errBadRange
 * 			}
 * 			negate := false
 * 			if pattern[0] == '!' {
 * 				pattern = pattern[1:]
 * 				negate = true
 * 			}
 * 			low, sz, err := readRangeRune(pattern)
 * 			if err != nil {
 * 				return nil, "", err
 * 			}
 * 			pattern = pattern[sz:]
 * 			if len(pattern) == 0 || pattern[0] != '-' {
 * 				return nil, "", errBadRange
 * 			}
 * 			pattern = pattern[1:]
 * 			high, sz, err := readRangeRune(pattern)
 * 			if err != nil {
 * 				return nil, "", err
 * 			}
 * 			pattern = pattern[sz:]
 * 			if len(pattern) == 0 || pattern[0] != ']' {
 * 				return nil, "", errBadRange
 * 			}
 * 			pattern = pattern[1:]
 * 			g.elems = append(g.elems, charRange{negate, low, high})
 * 
 * 		default:
 * 			pattern = g.parseLiteral(pattern, nested)
 * 		}
 * 	}
 * 	return g, "", nil
 * }
 */
export function parse(pattern: string, nested: bool): [GoPtr<Glob>, string, GoError] {
  const g: Glob = { elems: GoNilSlice() };
  while (pattern.length > 0) {
    switch (pattern[0]) {
      case "/": {
        pattern = pattern.slice(1);
        g.elems = GoAppend(g.elems, newSlash());
        break;
      }

      case "*": {
        if (pattern.length > 1 && pattern[1] === "*") {
          if ((g.elems.length > 0 && !isSlash(GoSliceLoad(g.elems, g.elems.length - 1, GoInterfaceValueOps<Stringer>())!)) || (pattern.length > 2 && pattern[2] !== "/")) {
            return [undefined, "", errors.New("** may only be adjacent to '/'")];
          }
          pattern = pattern.slice(2);
          g.elems = GoAppend(g.elems, newStarStar());
          break;
        }
        pattern = pattern.slice(1);
        g.elems = GoAppend(g.elems, newStar());
        break;
      }

      case "?": {
        pattern = pattern.slice(1);
        g.elems = GoAppend(g.elems, newAnyChar());
        break;
      }

      case "{": {
        let gs: group = GoNilSlice();
        while (pattern[0] !== "}") {
          pattern = pattern.slice(1);
          const [groupG, pat, err] = parse(pattern, true);
          if (err !== undefined) {
            return [undefined, "", err];
          }
          if (pat.length === 0) {
            return [undefined, "", errors.New("unmatched '{'")];
          }
          pattern = pat;
          gs = GoAppend(gs, groupG);
        }
        pattern = pattern.slice(1);
        g.elems = GoAppend(g.elems, newGroup(gs));
        break;
      }

      case "}":
      case ",": {
        if (nested) {
          return [g, pattern, undefined];
        }
        pattern = Glob_parseLiteral(g, pattern, false);
        break;
      }

      case "[": {
        pattern = pattern.slice(1);
        if (pattern.length === 0) {
          return [undefined, "", errBadRange];
        }
        let negate = false;
        if (pattern[0] === "!") {
          pattern = pattern.slice(1);
          negate = true;
        }
        const [low, sz0, err0] = readRangeRune(pattern);
        if (err0 !== undefined) {
          return [undefined, "", err0];
        }
        pattern = pattern.slice(sz0);
        if (pattern.length === 0 || pattern[0] !== "-") {
          return [undefined, "", errBadRange];
        }
        pattern = pattern.slice(1);
        const [high, sz1, err1] = readRangeRune(pattern);
        if (err1 !== undefined) {
          return [undefined, "", err1];
        }
        pattern = pattern.slice(sz1);
        if (pattern.length === 0 || pattern[0] !== "]") {
          return [undefined, "", errBadRange];
        }
        pattern = pattern.slice(1);
        g.elems = GoAppend(g.elems, newCharRange({ negate, low, high }));
        break;
      }

      default: {
        pattern = Glob_parseLiteral(g, pattern, nested);
        break;
      }
    }
  }
  return [g, "", undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::func::readRangeRune","kind":"func","status":"implemented","sigHash":"5540d5033f45948e90e340a3c828ef09e89e8e2cd603c30615e9f1fb1dd3393b"}
 *
 * Go source:
 * func readRangeRune(input string) (rune, int, error) {
 * 	r, sz := utf8.DecodeRuneInString(input)
 * 	var err error
 * 	if r == utf8.RuneError {
 * 		// See the documentation for DecodeRuneInString.
 * 		switch sz {
 * 		case 0:
 * 			err = errBadRange
 * 		case 1:
 * 			err = errInvalidUTF8
 * 		}
 * 	}
 * 	return r, sz, err
 * }
 */
export function readRangeRune(input: string): [GoRune, int, GoError] {
  const [r, sz] = utf8.DecodeRuneInString(input);
  let err: GoError = undefined;
  if (r === utf8.RuneError) {
    // See the documentation for DecodeRuneInString.
    switch (sz) {
      case 0:
        err = errBadRange;
        break;
      case 1:
        err = errInvalidUTF8;
        break;
    }
  }
  return [r, sz, err];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::varGroup::errBadRange+errInvalidUTF8","kind":"varGroup","status":"implemented","sigHash":"b24a4431660412937de5b5b1e4edf1cd162a1a57ea442c3f1878a060fca22984"}
 *
 * Go source:
 * var (
 * 	errBadRange    = errors.New("'[' patterns must be of the form [x-y]")
 * 	errInvalidUTF8 = errors.New("invalid UTF-8 encoding")
 * )
 */
export let errBadRange: GoError = errors.New("'[' patterns must be of the form [x-y]");
export let errInvalidUTF8: GoError = errors.New("invalid UTF-8 encoding");

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::Glob.parseLiteral","kind":"method","status":"implemented","sigHash":"94f5e60d0619ca4f856f2677e913ee8c3d3da618286398dc47623b4586272cae"}
 *
 * Go source:
 * func (g *Glob) parseLiteral(pattern string, nested bool) string {
 * 	var specialChars string
 * 	if nested {
 * 		specialChars = "*?{[/},"
 * 	} else {
 * 		specialChars = "*?{[/"
 * 	}
 * 	end := strings.IndexAny(pattern, specialChars)
 * 	if end == -1 {
 * 		end = len(pattern)
 * 	}
 * 	g.elems = append(g.elems, literal(pattern[:end]))
 * 	return pattern[end:]
 * }
 */
export function Glob_parseLiteral(receiver: GoPtr<Glob>, pattern: string, nested: bool): string {
  const g = receiver!;
  let specialChars: string;
  if (nested) {
    specialChars = "*?{[/},";
  } else {
    specialChars = "*?{[/";
  }
  let end = strings.IndexAny(pattern, specialChars);
  if (end === -1) {
    end = pattern.length;
  }
  g.elems = GoAppend(g.elems, newLiteral(pattern.slice(0, end)));
  return pattern.slice(end);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::Glob.String","kind":"method","status":"implemented","sigHash":"caa6c19e0fcc6a5d8d23b62bfc6f9389bd5bda5e2264d0f2c28cdb1c0104ed4e"}
 *
 * Go source:
 * func (g *Glob) String() string {
 * 	var b strings.Builder
 * 	for _, e := range g.elems {
 * 		fmt.Fprint(&b, e)
 * 	}
 * 	return b.String()
 * }
 */
export function Glob_String(receiver: GoPtr<Glob>): string {
  const g = receiver!;
  const b = new strings.Builder();
  for (
    let __goRangeSlice = g.elems,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoInterfaceValueOps<Stringer>(),
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const e = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    fmt.Fprint(b, e);
  }
  return b.String();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::element","kind":"type","status":"implemented","sigHash":"3fd63e8938fb7bdc60b013eddf7d7dd0fc5e6a1358f4e18f9582e9e1e3a5f20f"}
 *
 * Go source:
 * element fmt.Stringer
 */
export type element = Stringer;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::slash","kind":"type","status":"implemented","sigHash":"5a936718c1a52cce16f576c49991025ac27815bb769a6a39d5462eb33af00481"}
 *
 * Go source:
 * slash     struct{}
 */
export interface slash {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::literal","kind":"type","status":"implemented","sigHash":"f22f9e93cd5987f0b53fb0b12094148b99596ba3e839dc7bad6838445d73f0ef"}
 *
 * Go source:
 * literal   string
 */
export type literal = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::star","kind":"type","status":"implemented","sigHash":"40b1a14b024f0cec92f415ed4628eac5313a6505d7afe67df1171011a09624ed"}
 *
 * Go source:
 * star      struct{}
 */
export interface star {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::anyChar","kind":"type","status":"implemented","sigHash":"c7017da0cfc82fe8343d4b8eee1bd67615975ffd8e6bd5bedab1b00f7c839877"}
 *
 * Go source:
 * anyChar   struct{}
 */
export interface anyChar {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::starStar","kind":"type","status":"implemented","sigHash":"9993715426187b448d91b1c3a6589ad8e8535ac3c1dde3ee4796f20c40ad7fb8"}
 *
 * Go source:
 * starStar  struct{}
 */
export interface starStar {
  readonly __tsgoEmpty?: never;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::group","kind":"type","status":"implemented","sigHash":"140b72c9a0fda266177af30ad85fe4c546bb36ad762479153b2de3c12f813c21"}
 *
 * Go source:
 * group     []*Glob
 */
export type group = GoSlice<GoPtr<Glob>>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::type::charRange","kind":"type","status":"implemented","sigHash":"f6f8158d75e8138d46af48696e9163fb88422e48dda87ec67e198cbf739bbbd3"}
 *
 * Go source:
 * charRange struct { // [a-z] character range
 * 		negate    bool
 * 		low, high rune
 * 	}
 */
export interface charRange {
  negate: bool;
  low: GoRune;
  high: GoRune;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::slash.String","kind":"method","status":"implemented","sigHash":"2714665aeed48d6c99423dd589b2f89f0378109b48a7ed1145969de666565953"}
 *
 * Go source:
 * func (s slash) String() string    { return "/" }
 */
export function slash_String(receiver: slash): string {
  return "/";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::literal.String","kind":"method","status":"implemented","sigHash":"c7cc77f01e3ebdd6759083bcc919bf478ce88b588192d7e4d77a52cfb5d6fae6"}
 *
 * Go source:
 * func (l literal) String() string  { return string(l) }
 */
export function literal_String(receiver: literal): string {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::star.String","kind":"method","status":"implemented","sigHash":"acd8e053b22c4e3ab63e6aaf1558688dd49906c248fb60bb5af34fc6a3661a61"}
 *
 * Go source:
 * func (s star) String() string     { return "*" }
 */
export function star_String(receiver: star): string {
  return "*";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::anyChar.String","kind":"method","status":"implemented","sigHash":"1fb1e4afb0e304d99c8570f3e6a9cbf7afd6e73dac73a78771ac8177e11b2600"}
 *
 * Go source:
 * func (a anyChar) String() string  { return "?" }
 */
export function anyChar_String(receiver: anyChar): string {
  return "?";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::starStar.String","kind":"method","status":"implemented","sigHash":"eb487143deb947e26eb504e2e4343fec6089aaa140ec454934b44eeb5c79d379"}
 *
 * Go source:
 * func (s starStar) String() string { return "**" }
 */
export function starStar_String(receiver: starStar): string {
  return "**";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::group.String","kind":"method","status":"implemented","sigHash":"4e2a53a6849eb882ef9733fb4f1a94b06c90539d8006846603ee225f0720495e"}
 *
 * Go source:
 * func (g group) String() string {
 * 	var parts []string
 * 	for _, g := range g {
 * 		parts = append(parts, g.String())
 * 	}
 * 	return "{" + strings.Join(parts, ",") + "}"
 * }
 */
export function group_String(receiver: group): string {
  let parts = GoNilSlice<string>();
  for (const g of receiver) {
    parts = GoSliceAppend(parts, Glob_String(g), GoStringValueOps);
  }
  return "{" + strings.Join(parts, ",") + "}";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::charRange.String","kind":"method","status":"implemented","sigHash":"a555aae52d097d7a11bebdfcdbba3e7b5e8a5d6af072eea2d6eba6cd3cc71160"}
 *
 * Go source:
 * func (r charRange) String() string {
 * 	return "[" + string(r.low) + "-" + string(r.high) + "]"
 * }
 */
export function charRange_String(receiver: charRange): string {
  return "[" + runeToString(receiver.low) + "-" + runeToString(receiver.high) + "]";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::method::Glob.Match","kind":"method","status":"implemented","sigHash":"bf3fb58afa3a694d41a5a5cfb958c05226685b036ced88e3035894dea6fb603d"}
 *
 * Go source:
 * func (g *Glob) Match(input string) bool {
 * 	return match(g.elems, input)
 * }
 */
export function Glob_Match(receiver: GoPtr<Glob>, input: string): bool {
  const g = receiver!;
  return match(g.elems, input);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::func::match","kind":"func","status":"implemented","sigHash":"085593b900998550bec88606f8e4eda14f6c2bc4a840a2e3f505324ab6ba1f6b"}
 *
 * Go source:
 * func match(elems []element, input string) (ok bool) {
 * 	var elem any
 * 	for len(elems) > 0 {
 * 		elem, elems = elems[0], elems[1:]
 * 		switch elem := elem.(type) {
 * 		case slash:
 * 			if len(input) == 0 || input[0] != '/' {
 * 				return false
 * 			}
 * 			for input[0] == '/' {
 * 				input = input[1:]
 * 			}
 * 
 * 		case starStar:
 * 			// Special cases:
 * 			//  - ** /a matches "a"
 * 			//  - ** / matches everything
 * 			//
 * 			// Note that if ** is followed by anything, it must be '/' (this is
 * 			// enforced by Parse).
 * 			if len(elems) > 0 {
 * 				elems = elems[1:]
 * 			}
 * 
 * 			// A trailing ** matches anything.
 * 			if len(elems) == 0 {
 * 				return true
 * 			}
 * 
 * 			// Backtracking: advance pattern segments until the remaining pattern
 * 			// elements match.
 * 			for len(input) != 0 {
 * 				if match(elems, input) {
 * 					return true
 * 				}
 * 				_, input = split(input)
 * 			}
 * 			return false
 * 
 * 		case literal:
 * 			if !strings.HasPrefix(input, string(elem)) {
 * 				return false
 * 			}
 * 			input = input[len(elem):]
 * 
 * 		case star:
 * 			var segInput string
 * 			segInput, input = split(input)
 * 
 * 			elemEnd := len(elems)
 * 			for i, e := range elems {
 * 				if e == (slash{}) {
 * 					elemEnd = i
 * 					break
 * 				}
 * 			}
 * 			segElems := elems[:elemEnd]
 * 			elems = elems[elemEnd:]
 * 
 * 			// A trailing * matches the entire segment.
 * 			if len(segElems) == 0 {
 * 				break
 * 			}
 * 
 * 			// Backtracking: advance characters until remaining subpattern elements
 * 			// match.
 * 			matched := false
 * 			for i := range len(segInput) {
 * 				if match(segElems, segInput[i:]) {
 * 					matched = true
 * 					break
 * 				}
 * 			}
 * 			if !matched {
 * 				return false
 * 			}
 * 
 * 		case anyChar:
 * 			if len(input) == 0 || input[0] == '/' {
 * 				return false
 * 			}
 * 			input = input[1:]
 * 
 * 		case group:
 * 			// Append remaining pattern elements to each group member looking for a
 * 			// match.
 * 			var branch []element
 * 			for _, m := range elem {
 * 				branch = branch[:0]
 * 				branch = append(branch, m.elems...)
 * 				branch = append(branch, elems...)
 * 				if match(branch, input) {
 * 					return true
 * 				}
 * 			}
 * 			return false
 * 
 * 		case charRange:
 * 			if len(input) == 0 || input[0] == '/' {
 * 				return false
 * 			}
 * 			c, sz := utf8.DecodeRuneInString(input)
 * 			if c < elem.low || c > elem.high {
 * 				return false
 * 			}
 * 			input = input[sz:]
 * 
 * 		default:
 * 			panic(fmt.Sprintf("segment type %T not implemented", elem))
 * 		}
 * 	}
 * 
 * 	return len(input) == 0
 * }
 */
export function match(elems: GoSlice<GoInterface<element>>, input: string): bool {
  while (elems.length > 0) {
    const elem: element = GoSliceLoad(elems, 0, GoInterfaceValueOps<Stringer>())!;
    elems = elems.slice(1);
    if (isSlashCarrier(elem)) {
      if (input.length === 0 || input[0] !== "/") {
        return false;
      }
      while (input[0] === "/") {
        input = input.slice(1);
      }
    } else if (isStarStarCarrier(elem)) {
      // Special cases:
      //  - **/a matches "a"
      //  - **/ matches everything
      //
      // Note that if ** is followed by anything, it must be '/' (this is
      // enforced by Parse).
      if (elems.length > 0) {
        elems = elems.slice(1);
      }

      // A trailing ** matches anything.
      if (elems.length === 0) {
        return true;
      }

      // Backtracking: advance pattern segments until the remaining pattern
      // elements match.
      while (input.length !== 0) {
        if (match(elems, input)) {
          return true;
        }
        [, input] = split(input);
      }
      return false;
    } else if (isLiteralCarrier(elem)) {
      if (!strings.HasPrefix(input, elem.value)) {
        return false;
      }
      input = input.slice(elem.value.length);
    } else if (isStarCarrier(elem)) {
      let segInput: string;
      [segInput, input] = split(input);

      let elemEnd = elems.length;
      for (let i = 0; i < elems.length; i++) {
        const e = GoSliceLoad(elems, i, GoInterfaceValueOps<Stringer>())!;
        if (isSlash(e)) {
          elemEnd = i;
          break;
        }
      }
      const segElems = elems.slice(0, elemEnd);
      elems = elems.slice(elemEnd);

      // A trailing * matches the entire segment.
      if (segElems.length === 0) {
        continue;
      }

      // Backtracking: advance characters until remaining subpattern elements
      // match.
      let matched = false;
      for (let i = 0; i < segInput.length; i++) {
        if (match(segElems, segInput.slice(i))) {
          matched = true;
          break;
        }
      }
      if (!matched) {
        return false;
      }
    } else if (isAnyCharCarrier(elem)) {
      if (input.length === 0 || input[0] === "/") {
        return false;
      }
      input = input.slice(1);
    } else if (isGroupCarrier(elem)) {
      // Append remaining pattern elements to each group member looking for a
      // match.
      let branch = GoNilSlice<GoInterface<element>>();
      for (const m of elem.value) {
        branch = GoSliceToZeroLength(branch);
        branch = GoAppendSlice(branch, m!.elems);
        branch = GoAppendSlice(branch, elems);
        if (match(branch, input)) {
          return true;
        }
      }
      return false;
    } else if (isCharRangeCarrier(elem)) {
      if (input.length === 0 || input[0] === "/") {
        return false;
      }
      const [c, sz] = utf8.DecodeRuneInString(input);
      if (c < elem.value.low || c > elem.value.high) {
        return false;
      }
      input = input.slice(sz);
    } else {
      throw new globalThis.Error(fmt.Sprintf("segment type %T not implemented", elem));
    }
  }

  return input.length === 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/glob/glob.go::func::split","kind":"func","status":"implemented","sigHash":"d5e90676864cade1956534e2304b763a3f0f8a4f914a89ed2e71699b98e15c32"}
 *
 * Go source:
 * func split(input string) (first, rest string) {
 * 	i := strings.IndexByte(input, '/')
 * 	if i < 0 {
 * 		return input, ""
 * 	}
 * 	first = input[:i]
 * 	for j := i; j < len(input); j++ {
 * 		if input[j] != '/' {
 * 			return first, input[j:]
 * 		}
 * 	}
 * 	return first, ""
 * }
 */
export function split(input: string): [first: string, rest: string] {
  const i = strings.IndexByte(input, "/".charCodeAt(0));
  if (i < 0) {
    return [input, ""];
  }
  const first = input.slice(0, i);
  for (let j = i; j < input.length; j++) {
    if (input[j] !== "/") {
      return [first, input.slice(j)];
    }
  }
  return [first, ""];
}
