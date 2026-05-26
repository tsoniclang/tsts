/**
 * EmitTextWriter interface reexport.
 *
 * Port of TS-Go `internal/printer/emittextwriter.go` (~36 LoC). The
 * upstream file is the canonical interface definition; the concrete
 * TextWriter + SingleLineStringWriter live in their own files.
 */

export type { EmitTextWriter } from "./textwriter.js";
export { newTextWriter, TextWriter } from "./textwriter.js";
export { newSingleLineStringWriter, SingleLineStringWriter } from "./singlelinestringwriter.js";
