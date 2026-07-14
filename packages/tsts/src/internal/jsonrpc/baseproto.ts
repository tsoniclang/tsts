import type { byte } from "../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../go/compat.js";
import type { Reader as Reader_565be45f, Writer as Writer_8cbaef7c } from "../../go/bufio.js";
import type { Reader as Reader_9d71ca04, Writer as Writer_51cf46eb } from "../../go/io.js";
import * as bufio from "../../go/bufio.js";
import * as bytes from "../../go/bytes.js";
import * as errors from "../../go/errors.js";
import * as fmt from "../../go/fmt.js";
import * as io from "../../go/io.js";
import * as strconv from "../../go/strconv.js";

import type { GoInterface } from "../../go/compat.js";
import { GoNumberValueOps, GoSliceMake } from "../../go/compat.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::varGroup::ErrInvalidHeader+ErrInvalidContentLength+ErrNoContentLength","kind":"varGroup","status":"implemented","sigHash":"c53c8c227eda3800874e035cc6f4f4033adde42eeaf289363c7937edd94b788b"}
 *
 * Go source:
 * var (
 * 	ErrInvalidHeader        = errors.New("jsonrpc: invalid header")
 * 	ErrInvalidContentLength = errors.New("jsonrpc: invalid content length")
 * 	ErrNoContentLength      = errors.New("jsonrpc: no content length")
 * )
 */
export let ErrInvalidHeader: GoError = errors.New("jsonrpc: invalid header");
export let ErrInvalidContentLength: GoError = errors.New("jsonrpc: invalid content length");
export let ErrNoContentLength: GoError = errors.New("jsonrpc: no content length");

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::type::Reader","kind":"type","status":"implemented","sigHash":"ef29dd1e525f91fab999ed8cd0845ca162d773c10d9ad73ef307052f4814dadb"}
 *
 * Go source:
 * Reader struct {
 * 	r *bufio.Reader
 * }
 */
export interface Reader {
  r: GoPtr<Reader_565be45f>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::func::NewReader","kind":"func","status":"implemented","sigHash":"c93b7fcf7ca6b85732809098d00c9bb5158ca8a78d98d650679d38913d4b3fd7"}
 *
 * Go source:
 * func NewReader(r io.Reader) *Reader {
 * 	return &Reader{
 * 		r: bufio.NewReader(r),
 * 	}
 * }
 */
export function NewReader(r: GoInterface<Reader_9d71ca04>): GoPtr<Reader> {
  return { r: bufio.NewReader(r!) };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::method::Reader.Read","kind":"method","status":"implemented","sigHash":"2f81c15bceb10f1727badc8b5606afcb5c150fd16664ca2b5a70da9f64689b35"}
 *
 * Go source:
 * func (r *Reader) Read() ([]byte, error) {
 * 	var contentLength int64
 * 
 * 	for {
 * 		line, err := r.r.ReadBytes('\n')
 * 		if err != nil {
 * 			if errors.Is(err, io.EOF) {
 * 				return nil, io.EOF
 * 			}
 * 			return nil, fmt.Errorf("jsonrpc: read header: %w", err)
 * 		}
 * 
 * 		if bytes.Equal(line, []byte("\r\n")) {
 * 			break
 * 		}
 * 
 * 		key, value, ok := bytes.Cut(line, []byte(":"))
 * 		if !ok {
 * 			return nil, fmt.Errorf("%w: %q", ErrInvalidHeader, line)
 * 		}
 * 
 * 		if bytes.Equal(key, []byte("Content-Length")) {
 * 			contentLength, err = strconv.ParseInt(string(bytes.TrimSpace(value)), 10, 64)
 * 			if err != nil {
 * 				return nil, fmt.Errorf("%w: parse error: %w", ErrInvalidContentLength, err)
 * 			}
 * 			if contentLength < 0 {
 * 				return nil, fmt.Errorf("%w: negative value %d", ErrInvalidContentLength, contentLength)
 * 			}
 * 		}
 * 	}
 * 
 * 	if contentLength <= 0 {
 * 		return nil, ErrNoContentLength
 * 	}
 * 
 * 	data := make([]byte, contentLength)
 * 	if _, err := io.ReadFull(r.r, data); err != nil {
 * 		return nil, fmt.Errorf("jsonrpc: read content: %w", err)
 * 	}
 * 
 * 	return data, nil
 * }
 */
export function Reader_Read(receiver: GoPtr<Reader>): [GoSlice<byte>, GoError] {
  let contentLength = 0;
  for (;;) {
    const [line, err] = receiver!.r!.ReadBytes("\n".charCodeAt(0) as byte);
    if (err !== undefined) {
      if (errors.Is(err, io.EOF)) {
        return [GoSliceMake(0, 0, GoNumberValueOps), io.EOF];
      }
      return [GoSliceMake(0, 0, GoNumberValueOps), fmt.Errorf("jsonrpc: read header: %w", err)];
    }
    if (bytes.Equal(line, [13 as byte, 10 as byte])) {
      break;
    }
    const [key, value, ok] = bytes.Cut(line, [":".charCodeAt(0) as byte]);
    if (!ok) {
      return [GoSliceMake(0, 0, GoNumberValueOps), fmt.Errorf("%w: %q", ErrInvalidHeader, line)];
    }
    if (bytes.Equal(key, Array.from(new TextEncoder().encode("Content-Length")) as GoSlice<byte>)) {
      const [parsed, parseErr] = strconv.ParseInt(new TextDecoder().decode(bytes.TrimSpace(value)), 10, 64);
      if (parseErr !== undefined) {
        return [GoSliceMake(0, 0, GoNumberValueOps), fmt.Errorf("%w: parse error: %w", ErrInvalidContentLength, parseErr)];
      }
      if (parsed < 0) {
        return [GoSliceMake(0, 0, GoNumberValueOps), fmt.Errorf("%w: negative value %d", ErrInvalidContentLength, parsed)];
      }
      contentLength = parsed;
    }
  }
  if (contentLength <= 0) {
    return [GoSliceMake(0, 0, GoNumberValueOps), ErrNoContentLength];
  }
  const data = new globalThis.Array(contentLength).fill(0) as GoSlice<byte>;
  const [, err] = io.ReadFull(receiver!.r!, data);
  if (err !== undefined) {
    return [GoSliceMake(0, 0, GoNumberValueOps), fmt.Errorf("jsonrpc: read content: %w", err)];
  }
  return [data, undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::type::Writer","kind":"type","status":"implemented","sigHash":"3168f07211684e3bcb45c1db02730e78415bb24be238455d126ff4664e3209b3"}
 *
 * Go source:
 * Writer struct {
 * 	w *bufio.Writer
 * }
 */
export interface Writer {
  w: GoPtr<Writer_8cbaef7c>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::func::NewWriter","kind":"func","status":"implemented","sigHash":"50acc16b4051fd7272129b112e131d79c4e336b07021396d5a8df0ae3aa74041"}
 *
 * Go source:
 * func NewWriter(w io.Writer) *Writer {
 * 	return &Writer{
 * 		w: bufio.NewWriter(w),
 * 	}
 * }
 */
export function NewWriter(w: GoInterface<Writer_51cf46eb>): GoPtr<Writer> {
  return { w: new bufio.Writer(w!) };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsonrpc/baseproto.go::method::Writer.Write","kind":"method","status":"implemented","sigHash":"8354501c67a09930d3dd75c96cef05c1b9ee869be31ac97fe9e4f7d90a92c8af"}
 *
 * Go source:
 * func (w *Writer) Write(data []byte) error {
 * 	if _, err := fmt.Fprintf(w.w, "Content-Length: %d\r\n\r\n", len(data)); err != nil {
 * 		return err
 * 	}
 * 	if _, err := w.w.Write(data); err != nil {
 * 		return err
 * 	}
 * 	return w.w.Flush()
 * }
 */
export function Writer_Write(receiver: GoPtr<Writer>, data: GoSlice<byte>): GoError {
  const [, headerErr] = fmt.Fprintf(receiver!.w!, "Content-Length: %d\r\n\r\n", data.length);
  if (headerErr !== undefined) {
    return headerErr;
  }
  const [, writeErr] = receiver!.w!.Write(data);
  if (writeErr !== undefined) {
    return writeErr;
  }
  return receiver!.w!.Flush();
}
