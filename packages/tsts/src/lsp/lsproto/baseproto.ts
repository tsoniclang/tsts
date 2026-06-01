/**
 * Back-compat wrappers over the shared JSON-RPC base protocol.
 *
 * Port of TS-Go `internal/lsp/lsproto/baseproto.go`.
 */

import { Reader, Writer, newReader, newWriter } from "../../jsonrpc/index.js";

export class BaseReader {
  readonly reader: Reader;

  constructor(reader: Reader) {
    this.reader = reader;
  }

  read(): string {
    return this.reader.read();
  }
}

export function newBaseReader(data = ""): BaseReader {
  return new BaseReader(newReader(data));
}

export class BaseWriter {
  readonly writer: Writer;

  constructor(writer: Writer) {
    this.writer = writer;
  }

  write(data: string): void {
    this.writer.write(data);
  }

  text(): string {
    return this.writer.text();
  }
}

export function newBaseWriter(): BaseWriter {
  return new BaseWriter(newWriter());
}
