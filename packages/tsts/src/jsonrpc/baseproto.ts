/**
 * JSON-RPC base protocol framing.
 *
 * Port of TS-Go `internal/jsonrpc/baseproto.go`, using explicit byte/string
 * buffers instead of Go `io.Reader`/`io.Writer`.
 */

export class JsonRpcProtocolError extends Error {
  readonly code: "invalid-header" | "invalid-content-length" | "no-content-length" | "eof";

  constructor(code: JsonRpcProtocolError["code"], message: string) {
    super(message);
    this.name = "JsonRpcProtocolError";
    this.code = code;
  }
}

export const errInvalidHeader = new JsonRpcProtocolError("invalid-header", "jsonrpc: invalid header");
export const errInvalidContentLength = new JsonRpcProtocolError("invalid-content-length", "jsonrpc: invalid content length");
export const errNoContentLength = new JsonRpcProtocolError("no-content-length", "jsonrpc: no content length");

export class Reader {
  private buffer = "";

  constructor(initialData = "") {
    this.buffer = initialData;
  }

  append(data: string): void {
    this.buffer += data;
  }

  read(): string {
    const headerEnd = this.buffer.indexOf("\r\n\r\n");
    if (headerEnd < 0) throw new JsonRpcProtocolError("eof", "jsonrpc: read header: EOF");
    const headerText = this.buffer.slice(0, headerEnd + 2);
    const contentLength = parseContentLength(headerText);
    const contentStart = headerEnd + 4;
    const contentEnd = contentStart + contentLength;
    if (this.buffer.length < contentEnd) throw new JsonRpcProtocolError("eof", "jsonrpc: read content: EOF");
    const data = this.buffer.slice(contentStart, contentEnd);
    this.buffer = this.buffer.slice(contentEnd);
    return data;
  }
}

export function newReader(data = ""): Reader {
  return new Reader(data);
}

export class Writer {
  private readonly chunks: string[] = [];

  write(data: string): void {
    this.chunks.push(formatJsonRpcMessage(data));
  }

  text(): string {
    return this.chunks.join("");
  }

  clear(): void {
    this.chunks.length = 0;
  }
}

export function newWriter(): Writer {
  return new Writer();
}

export function formatJsonRpcMessage(data: string): string {
  return `Content-Length: ${Buffer.byteLength(data, "utf8")}\r\n\r\n${data}`;
}

export function parseContentLength(headerText: string): number {
  let contentLength = 0;
  for (const line of headerText.split("\r\n")) {
    if (line === "") continue;
    const separator = line.indexOf(":");
    if (separator < 0) throw new JsonRpcProtocolError("invalid-header", `${errInvalidHeader.message}: ${JSON.stringify(line)}`);
    const key = line.slice(0, separator);
    const value = line.slice(separator + 1).trim();
    if (key !== "Content-Length") continue;
    const parsed = Number(value);
    if (!Number.isInteger(parsed)) throw new JsonRpcProtocolError("invalid-content-length", `${errInvalidContentLength.message}: parse error`);
    if (parsed < 0) throw new JsonRpcProtocolError("invalid-content-length", `${errInvalidContentLength.message}: negative value ${parsed}`);
    contentLength = parsed;
  }
  if (contentLength <= 0) throw errNoContentLength;
  return contentLength;
}
