// Faithful TypeScript port of Go's `unicode/utf16` package (the subset that
// typescript-go references).

import type { int } from "../scalars.js";
import type { GoRune, GoSlice } from "../compat.js";
import { GoNumberValueOps, GoSliceAppend, GoSliceAppendSlice, GoSliceBuild, GoSliceStore } from "../compat.js";
import { GoAppend } from "../compat.js";
import { GoSliceMake } from "../compat.js";
import { GoSliceLoad } from "../compat.js";



// replacementChar is U+FFFD, the Unicode replacement character.
const replacementChar: GoRune = 0xfffd;
// maxRune is the maximum valid Unicode code point.
const maxRune: GoRune = 0x10ffff;

const surr1: int = 0xd800;
const surr2: int = 0xdc00;
const surr3: int = 0xe000;
const surrSelf: int = 0x10000;

// AppendRune appends the UTF-16 encoding of rune r to the slice a and returns
// the extended slice. Mutation-free style: returns a new slice like Go append.
export function AppendRune(a: GoSlice<int>, r: GoRune): GoSlice<int> {
  if (r >= 0 && r < surrSelf) {
    if (r >= surr1 && r < surr3) {
      // Surrogate-half value: not a valid scalar; emit replacement.
      return GoSliceAppend(a, replacementChar, GoNumberValueOps);
    }
    return GoSliceAppend(a, r, GoNumberValueOps);
  }
  if (r >= surrSelf && r <= maxRune) {
    const v = r - surrSelf;
    const r1 = surr1 + ((v >> 10) & 0x3ff);
    const r2 = surr2 + (v & 0x3ff);
    return GoSliceAppendSlice(a, GoSliceBuild(2, 2, GoNumberValueOps, (__goSliceLiteral_482) => { GoSliceStore(__goSliceLiteral_482, 0, r1, GoNumberValueOps); GoSliceStore(__goSliceLiteral_482, 1, r2, GoNumberValueOps); }), GoNumberValueOps);
  }
  return GoSliceAppend(a, replacementChar, GoNumberValueOps);
}

// Decode returns the Unicode code points represented by the UTF-16 encoding s.
// Unpaired surrogates are decoded as the replacement character.
export function Decode(s: GoSlice<int>): GoSlice<GoRune> {
  let result: GoSlice<GoRune> = GoSliceMake(0, 0, GoNumberValueOps);
  let i = 0;
  const n = s.length;
  while (i < n) {
    const r = GoSliceLoad(s, i, GoNumberValueOps)!;
    if (r < surr1 || surr3 <= r) {
      // Normal rune (not a surrogate half).
      result = GoSliceAppend(result, r, GoNumberValueOps);
      i++;
    } else if (surr1 <= r && r < surr2 && i + 1 < n && surr2 <= GoSliceLoad(s, i + 1, GoNumberValueOps)! && GoSliceLoad(s, i + 1, GoNumberValueOps)! < surr3) {
      // Valid surrogate pair.
      const r2 = GoSliceLoad(s, i + 1, GoNumberValueOps)!;
      const dec = (r - surr1) * 0x400 + (r2 - surr2) + surrSelf;
      result = GoSliceAppend(result, dec, GoNumberValueOps);
      i += 2;
    } else {
      // Invalid surrogate sequence.
      result = GoSliceAppend(result, replacementChar, GoNumberValueOps);
      i++;
    }
  }
  return result;
}

// Encode returns the UTF-16 encoding of the Unicode code point sequence s.
export function Encode(s: GoSlice<GoRune>): GoSlice<int> {
  let out: GoSlice<int> = GoSliceMake(0, 0, GoNumberValueOps);
  for (
    let __goRangeSlice = s,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoNumberValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const r = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    out = AppendRune(out, r);
  }
  return out;
}

// RuneLen returns the number of 16-bit words in the UTF-16 encoding of the rune.
// It returns -1 if the rune is not a valid value to encode in UTF-16.
export function RuneLen(r: GoRune): int {
  if ((0 <= r && r < surr1) || (surr3 <= r && r < surrSelf)) {
    return 1;
  }
  if (surrSelf <= r && r <= maxRune) {
    return 2;
  }
  return -1;
}

// IsSurrogate reports whether the specified Unicode code point can appear in a
// surrogate pair.
export function IsSurrogate(r: GoRune): boolean {
  return surr1 <= r && r < surr3;
}

// DecodeRune returns the UTF-16 decoding of a surrogate pair. If the pair is
// not a valid UTF-16 surrogate pair, DecodeRune returns the replacement char.
export function DecodeRune(r1: GoRune, r2: GoRune): GoRune {
  if (surr1 <= r1 && r1 < surr2 && surr2 <= r2 && r2 < surr3) {
    return (r1 - surr1) * 0x400 + (r2 - surr2) + surrSelf;
  }
  return replacementChar;
}

// EncodeRune returns the UTF-16 surrogate pair r1, r2 for the given rune. If
// the rune is not a valid Unicode code point or does not need encoding,
// EncodeRune returns [replacementChar, replacementChar].
export function EncodeRune(r: GoRune): [GoRune, GoRune] {
  if (r < surrSelf || r > maxRune) {
    return [replacementChar, replacementChar];
  }
  const v = r - surrSelf;
  return [surr1 + ((v >> 10) & 0x3ff), surr2 + (v & 0x3ff)];
}
