import { canonicalSchemaValue } from "./semantic-variants.mjs";

const utf8Encoder = new TextEncoder();

export function validateStructTagContract(tag, tagValues, tagRemainder, label, issues) {
  if (typeof tag !== "string" || !Array.isArray(tagValues) || typeof tagRemainder !== "string") return;
  const expected = parseStructTagPrefix(tag);
  if (canonicalSchemaValue(tagValues) !== canonicalSchemaValue(expected.tagValues)) {
    issues.push(`${label}.tagValues must equal the exact reflect-compatible struct-tag prefix`);
  }
  if (tagRemainder !== expected.tagRemainder) {
    issues.push(`${label}.tagRemainder must equal the exact unparsed struct-tag suffix`);
  }
}

function parseStructTagPrefix(tag) {
  const tagValues = [];
  let offset = 0;
  while (offset < tag.length) {
    const unparsedOffset = offset;
    while (tag[offset] === " ") offset++;
    if (offset === tag.length) return { tagValues, tagRemainder: tag.slice(unparsedOffset) };
    let keyEnd = offset;
    while (keyEnd < tag.length) {
      const code = tag.charCodeAt(keyEnd);
      if (code <= 0x20 || code === 0x7f || tag[keyEnd] === ":" || tag[keyEnd] === '"') break;
      keyEnd++;
    }
    if (keyEnd === offset || tag[keyEnd] !== ":" || tag[keyEnd + 1] !== '"') {
      return { tagValues, tagRemainder: tag.slice(unparsedOffset) };
    }
    const quoteStart = keyEnd + 1;
    let quoteEnd = quoteStart + 1;
    while (quoteEnd < tag.length && tag[quoteEnd] !== '"') {
      if (tag[quoteEnd] === "\\") quoteEnd++;
      quoteEnd++;
    }
    if (quoteEnd >= tag.length) return { tagValues, tagRemainder: tag.slice(unparsedOffset) };
    const value = decodeGoQuotedString(tag.slice(quoteStart, quoteEnd + 1));
    if (value === undefined) return { tagValues, tagRemainder: tag.slice(unparsedOffset) };
    tagValues.push({ key: tag.slice(offset, keyEnd), value });
    offset = quoteEnd + 1;
  }
  return { tagValues, tagRemainder: "" };
}

function decodeGoQuotedString(quoted) {
  if (quoted.length < 2 || quoted[0] !== '"' || quoted.at(-1) !== '"') return undefined;
  const bytes = [];
  for (let index = 1; index < quoted.length - 1;) {
    const character = quoted[index];
    if (character !== "\\") {
      if (character === "\n" || character === '"') return undefined;
      const codePoint = quoted.codePointAt(index);
      bytes.push(...utf8Encoder.encode(String.fromCodePoint(codePoint)));
      index += codePoint > 0xffff ? 2 : 1;
      continue;
    }
    index++;
    if (index >= quoted.length - 1) return undefined;
    const escape = quoted[index++];
    const simple = { a: 0x07, b: 0x08, f: 0x0c, n: 0x0a, r: 0x0d, t: 0x09, v: 0x0b, "\\": 0x5c, '"': 0x22 }[escape];
    if (simple !== undefined) {
      bytes.push(simple);
      continue;
    }
    const width = escape === "x" ? 2 : escape === "u" ? 4 : escape === "U" ? 8 : /[0-7]/.test(escape) ? 2 : -1;
    const radix = escape === "x" || escape === "u" || escape === "U" ? 16 : 8;
    if (width < 0 || index + width > quoted.length - 1) return undefined;
    const digits = (radix === 8 ? escape : "") + quoted.slice(index, index + width);
    if (!(radix === 8 ? /^[0-7]{3}$/ : new RegExp(`^[0-9a-fA-F]{${width}}$`)).test(digits)) return undefined;
    index += width;
    const codePoint = Number.parseInt(digits, radix);
    if (radix === 8 || escape === "x") {
      if (codePoint > 0xff) return undefined;
      bytes.push(codePoint);
    } else {
      if (codePoint > 0x10ffff || codePoint >= 0xd800 && codePoint <= 0xdfff) return undefined;
      bytes.push(...utf8Encoder.encode(String.fromCodePoint(codePoint)));
    }
  }
  return decodeGoUtf8(bytes);
}

function decodeGoUtf8(bytes) {
  let output = "";
  for (let index = 0; index < bytes.length;) {
    const first = bytes[index];
    if (first < 0x80) {
      output += String.fromCodePoint(first);
      index++;
      continue;
    }
    const width = first >= 0xc2 && first <= 0xdf ? 2 : first >= 0xe0 && first <= 0xef ? 3 : first >= 0xf0 && first <= 0xf4 ? 4 : 0;
    const continuation = width > 0 && index + width <= bytes.length && bytes.slice(index + 1, index + width).every((value) => value >= 0x80 && value <= 0xbf);
    let codePoint = width === 2 ? first & 0x1f : width === 3 ? first & 0x0f : first & 0x07;
    if (continuation) for (let part = 1; part < width; part++) codePoint = codePoint << 6 | bytes[index + part] & 0x3f;
    const valid = continuation && !(width === 3 && codePoint < 0x800) && !(width === 4 && codePoint < 0x10000) && !(codePoint >= 0xd800 && codePoint <= 0xdfff) && codePoint <= 0x10ffff;
    output += String.fromCodePoint(valid ? codePoint : 0xfffd);
    index += valid ? width : 1;
  }
  return output;
}
