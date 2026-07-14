export const stringRuntime = `interface GoStringBacking {
  readonly bytes: readonly byte[];
}

class GoStringHeader {
  private static readonly emptyValue = new GoStringHeader({ bytes: [] }, 0, 0);

  private constructor(
    private readonly backing: GoStringBacking,
    private readonly offset: int,
    private readonly byteLength: int,
  ) {}

  static fromUtf8(text: string): GoStringHeader {
    if (typeof text !== "string") throw new TypeError("Go UTF-8 input must be a string");
    if (text.length === 0) return GoStringHeader.emptyValue;
    let byteLength = 0;
    for (let index = 0; index < text.length; index++) {
      const codePoint = goStringCodePointAt(text, index);
      byteLength += goUtf8EncodedLength(codePoint);
      if (codePoint > 0xffff) index++;
    }
    const bytes = new Array<byte>(byteLength);
    let byteIndex = 0;
    for (let index = 0; index < text.length; index++) {
      const codePoint = goStringCodePointAt(text, index);
      byteIndex = writeGoUtf8CodePoint(bytes, byteIndex, codePoint);
      if (codePoint > 0xffff) index++;
    }
    return GoStringHeader.fromOwnedBytes(bytes);
  }

  static toUtf8(value: GoStringHeader): string {
    let text = "";
    let index = 0;
    while (index < value.byteLength) {
      const first = value.backing.bytes[value.offset + index]!;
      if (first < 0x80) {
        text += globalThis.String.fromCodePoint(first);
        index++;
        continue;
      }
      const width = goUtf8SequenceWidth(first);
      if (width === 0 || index + width > value.byteLength) throwInvalidGoStringUtf8(index as int);
      let codePoint = first & (width === 2 ? 0x1f : width === 3 ? 0x0f : 0x07);
      for (let part = 1; part < width; part++) {
        const continuation = value.backing.bytes[value.offset + index + part]!;
        if (continuation < 0x80 || continuation > 0xbf) throwInvalidGoStringUtf8(index as int);
        codePoint = (codePoint << 6) | (continuation & 0x3f);
      }
      if (!isCanonicalGoUtf8CodePoint(codePoint, width)) throwInvalidGoStringUtf8(index as int);
      text += globalThis.String.fromCodePoint(codePoint);
      index += width;
    }
    return text;
  }

  static fromByteValues(values: readonly number[]): GoStringHeader {
    if (!globalThis.Array.isArray(values)) throw new TypeError("Go string byte values must be an array");
    if (values.length === 0) return GoStringHeader.emptyValue;
    const bytes = new Array<byte>(values.length);
    for (let index = 0; index < values.length; index++) bytes[index] = requireGoStringByte(values[index]!);
    return GoStringHeader.fromOwnedBytes(bytes);
  }

  static fromByteSlice(values: GoSlice<byte>): GoStringHeader {
    if (values.length === 0) return GoStringHeader.emptyValue;
    const bytes = new Array<byte>(values.length);
    for (let index = 0; index < values.length; index++) {
      bytes[index] = requireGoStringByte(GoSliceLoad(values, index as int, GoNumberValueOps));
    }
    return GoStringHeader.fromOwnedBytes(bytes);
  }

  static length(value: GoStringHeader): int {
    return value.byteLength;
  }

  static byteAt(value: GoStringHeader, index: int): byte {
    requireGoStringIndex(index, value.byteLength);
    return value.backing.bytes[value.offset + index]!;
  }

  static slice(value: GoStringHeader, low: int, high: int): GoStringHeader {
    requireGoStringSliceBounds(low, high, value.byteLength);
    if (low === 0 && high === value.byteLength) return value;
    if (low === high) return GoStringHeader.emptyValue;
    return new GoStringHeader(value.backing, (value.offset + low) as int, (high - low) as int);
  }

  static toByteSlice(value: GoStringHeader): GoSlice<byte> {
    return GoSliceBuild(value.byteLength, value.byteLength, GoNumberValueOps, (result) => {
      GoStringHeader.copyBytesToByteSlice(result, 0, value, value.byteLength);
    });
  }

  static appendToByteSlice(destination: GoSlice<byte>, source: GoStringHeader): GoSlice<byte> {
    if (source.byteLength === 0) return destination;
    const destinationLength = destination.length;
    const requiredLength = checkedGoSliceSum(destinationLength, source.byteLength);
    if (requiredLength <= GoSliceCapacity(destination)) {
      const result = GoSliceReslice(destination, 0, requiredLength);
      GoStringHeader.copyBytesToByteSlice(result, destinationLength, source, source.byteLength);
      return result;
    }
    const capacity = goSliceGrowthCapacity(GoSliceCapacity(destination), requiredLength);
    return GoSliceBuild<byte>(requiredLength, capacity, GoNumberValueOps, (result) => {
      GoSliceCopy(result, destination, GoNumberValueOps);
      GoStringHeader.copyBytesToByteSlice(result, destinationLength, source, source.byteLength);
    });
  }

  static copyToByteSlice(destination: GoSlice<byte>, source: GoStringHeader): int {
    const count = Math.min(destination.length, source.byteLength) as int;
    GoStringHeader.copyBytesToByteSlice(destination, 0, source, count);
    return count;
  }

  private static copyBytesToByteSlice(
    destination: GoSlice<byte>,
    destinationStart: int,
    source: GoStringHeader,
    count: int,
  ): void {
    for (let index = 0; index < count; index++) {
      GoSliceStore(
        destination,
        (destinationStart + index) as int,
        source.backing.bytes[source.offset + index]!,
        GoNumberValueOps,
      );
    }
  }

  private static fromOwnedBytes(bytes: readonly byte[]): GoStringHeader {
    return bytes.length === 0
      ? GoStringHeader.emptyValue
      : new GoStringHeader({ bytes }, 0, bytes.length as int);
  }
}

export type GoString = GoStringHeader;

function goStringCodePointAt(text: string, index: number): number {
  const first = text.charCodeAt(index);
  if (first >= 0xd800 && first <= 0xdbff) {
    if (index + 1 >= text.length) throw new RangeError("Go UTF-8 input contains an unpaired surrogate");
    const second = text.charCodeAt(index + 1);
    if (second < 0xdc00 || second > 0xdfff) throw new RangeError("Go UTF-8 input contains an unpaired surrogate");
    return 0x10000 + ((first - 0xd800) << 10) + (second - 0xdc00);
  }
  if (first >= 0xdc00 && first <= 0xdfff) throw new RangeError("Go UTF-8 input contains an unpaired surrogate");
  return first;
}

function goUtf8EncodedLength(codePoint: number): int {
  if (codePoint < 0x80) return 1;
  if (codePoint < 0x800) return 2;
  if (codePoint < 0x10000) return 3;
  return 4;
}

function goUtf8SequenceWidth(first: byte): int {
  if (first >= 0xc2 && first <= 0xdf) return 2;
  if (first >= 0xe0 && first <= 0xef) return 3;
  if (first >= 0xf0 && first <= 0xf4) return 4;
  return 0;
}

function isCanonicalGoUtf8CodePoint(codePoint: number, width: int): boolean {
  const minimum = width === 2 ? 0x80 : width === 3 ? 0x800 : 0x10000;
  return codePoint >= minimum
    && codePoint <= 0x10ffff
    && (codePoint < 0xd800 || codePoint > 0xdfff);
}

function throwInvalidGoStringUtf8(index: int): never {
  throw new RangeError("Go string contains invalid UTF-8 at byte " + index);
}

function writeGoUtf8CodePoint(bytes: byte[], start: number, codePoint: number): int {
  if (codePoint < 0x80) {
    bytes[start] = codePoint as byte;
    return (start + 1) as int;
  }
  if (codePoint < 0x800) {
    bytes[start] = (0xc0 | (codePoint >> 6)) as byte;
    bytes[start + 1] = (0x80 | (codePoint & 0x3f)) as byte;
    return (start + 2) as int;
  }
  if (codePoint < 0x10000) {
    bytes[start] = (0xe0 | (codePoint >> 12)) as byte;
    bytes[start + 1] = (0x80 | ((codePoint >> 6) & 0x3f)) as byte;
    bytes[start + 2] = (0x80 | (codePoint & 0x3f)) as byte;
    return (start + 3) as int;
  }
  bytes[start] = (0xf0 | (codePoint >> 18)) as byte;
  bytes[start + 1] = (0x80 | ((codePoint >> 12) & 0x3f)) as byte;
  bytes[start + 2] = (0x80 | ((codePoint >> 6) & 0x3f)) as byte;
  bytes[start + 3] = (0x80 | (codePoint & 0x3f)) as byte;
  return (start + 4) as int;
}

function requireGoStringByte(value: number): byte {
  if (!Number.isInteger(value) || value < 0 || value > 0xff) throw new RangeError("Go string byte out of range");
  return (value === 0 ? 0 : value) as byte;
}

function requireGoStringIndex(index: int, length: int): void {
  if (!Number.isSafeInteger(index) || index < 0 || index >= length) throw new RangeError("string index out of range");
}

function requireGoStringSliceBounds(low: int, high: int, length: int): void {
  if (!Number.isSafeInteger(low) || !Number.isSafeInteger(high) || low < 0 || low > high || high > length) {
    throw new RangeError("slice bounds out of range");
  }
}

export function GoStringFromUtf8(text: string): GoString {
  return GoStringHeader.fromUtf8(text);
}

export function GoStringToUtf8(value: GoString): string {
  return GoStringHeader.toUtf8(value);
}

export function GoStringFromByteValues(values: readonly number[]): GoString {
  return GoStringHeader.fromByteValues(values);
}

export function GoStringFromByteSlice(values: GoSlice<byte>): GoString {
  return GoStringHeader.fromByteSlice(values);
}

export function GoStringLength(value: GoString): int {
  return GoStringHeader.length(value);
}

export function GoStringByteAt(value: GoString, index: int): byte {
  return GoStringHeader.byteAt(value, index);
}

export function GoStringSlice(value: GoString, low: int, high: int): GoString {
  return GoStringHeader.slice(value, low, high);
}

export function GoStringToByteSlice(value: GoString): GoSlice<byte> {
  return GoStringHeader.toByteSlice(value);
}

export function GoStringAppendToByteSlice(destination: GoSlice<byte>, source: GoString): GoSlice<byte> {
  return GoStringHeader.appendToByteSlice(destination, source);
}

export function GoStringCopyToByteSlice(destination: GoSlice<byte>, source: GoString): int {
  return GoStringHeader.copyToByteSlice(destination, source);
}
`;
