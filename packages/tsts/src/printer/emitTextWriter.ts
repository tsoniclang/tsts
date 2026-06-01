/**
 * EmitTextWriter interface reexport.
 *
 * Port of TS-Go `internal/printer/emittextwriter.go` (~36 LoC). The
 * upstream file is the canonical interface definition; the concrete
 * TextWriter + SingleLineStringWriter live in their own files.
 */

export type { EmitTextWriter } from "./textWriter.js";
export { newTextWriter, TextWriter } from "./textWriter.js";
export { newSingleLineStringWriter, SingleLineStringWriter } from "./singleLineStringWriter.js";
