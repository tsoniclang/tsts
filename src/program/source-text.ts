export function decodeSourceText(bytes: Uint8Array): string {
  if (hasUtf8Bom(bytes)) {
    return decodeUtf8(bytes.subarray(3));
  }
  if (hasUtf16LittleEndianBom(bytes)) {
    return decodeUtf16LittleEndian(bytes.subarray(2));
  }
  if (hasUtf16BigEndianBom(bytes)) {
    return decodeUtf16BigEndian(bytes.subarray(2));
  }
  return decodeUtf8(bytes);
}

function hasUtf8Bom(bytes: Uint8Array): boolean {
  return bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
}

function hasUtf16LittleEndianBom(bytes: Uint8Array): boolean {
  return bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe;
}

function hasUtf16BigEndianBom(bytes: Uint8Array): boolean {
  return bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff;
}

function decodeUtf8(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("utf8");
}

function decodeUtf16LittleEndian(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("utf16le");
}

function decodeUtf16BigEndian(bytes: Uint8Array): string {
  const characters: string[] = [];
  let chunk = "";
  for (let index = 0; index + 1 < bytes.length; index += 2) {
    chunk += String.fromCharCode((bytes[index]! << 8) | bytes[index + 1]!);
    if (chunk.length >= 8192) {
      characters.push(chunk);
      chunk = "";
    }
  }
  if (indexHasTrailingByte(bytes)) {
    chunk += "\uFFFD";
  }
  if (chunk.length > 0) {
    characters.push(chunk);
  }
  return characters.join("");
}

function indexHasTrailingByte(bytes: Uint8Array): boolean {
  return bytes.length % 2 === 1;
}
