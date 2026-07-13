import type { bool, int } from "../../go/scalars.js";
import type { GoPtr } from "../../go/compat.js";
import { Builder } from "../../go/strings.js";
import { Pool } from "../../go/sync.js";
import * as utf8 from "../../go/unicode/utf8.js";
import type { Symbol } from "../ast/symbol.js";
import type { UTF16Offset } from "../core/core.js";
import { IsWhiteSpaceLike } from "../stringutil/util.js";
import type { EmitTextWriter } from "./emittextwriter.js";

import type { GoFunc, GoInterface } from "../../go/compat.js";
// singleLineStringWriter_as_EmitTextWriter adapts a *singleLineStringWriter to
// the EmitTextWriter interface by delegating each method to the corresponding
// free function (Go interface satisfaction -> method-bearing adapter).
function singleLineStringWriter_as_EmitTextWriter(
  receiver: GoPtr<singleLineStringWriter>,
): EmitTextWriter {
  const w = receiver!;
  return {
    Write: (s: string): void => singleLineStringWriter_Write(w, s),
    WriteTrailingSemicolon: (text: string): void =>
      singleLineStringWriter_WriteTrailingSemicolon(w, text),
    WriteComment: (text: string): void => singleLineStringWriter_WriteComment(w, text),
    WriteKeyword: (text: string): void => singleLineStringWriter_WriteKeyword(w, text),
    WriteOperator: (text: string): void => singleLineStringWriter_WriteOperator(w, text),
    WritePunctuation: (text: string): void =>
      singleLineStringWriter_WritePunctuation(w, text),
    WriteSpace: (text: string): void => singleLineStringWriter_WriteSpace(w, text),
    WriteStringLiteral: (text: string): void =>
      singleLineStringWriter_WriteStringLiteral(w, text),
    WriteParameter: (text: string): void => singleLineStringWriter_WriteParameter(w, text),
    WriteProperty: (text: string): void => singleLineStringWriter_WriteProperty(w, text),
    WriteSymbol: (text: string, symbol_: GoPtr<Symbol>): void =>
      singleLineStringWriter_WriteSymbol(w, text, symbol_),
    WriteLine: (): void => singleLineStringWriter_WriteLine(w),
    WriteLineForce: (force: bool): void => singleLineStringWriter_WriteLineForce(w, force),
    IncreaseIndent: (): void => singleLineStringWriter_IncreaseIndent(w),
    DecreaseIndent: (): void => singleLineStringWriter_DecreaseIndent(w),
    Clear: (): void => singleLineStringWriter_Clear(w),
    String: (): string => singleLineStringWriter_String(w),
    RawWrite: (s: string): void => singleLineStringWriter_RawWrite(w, s),
    WriteLiteral: (s: string): void => singleLineStringWriter_WriteLiteral(w, s),
    GetTextPos: (): int => singleLineStringWriter_GetTextPos(w),
    GetLine: (): int => singleLineStringWriter_GetLine(w),
    GetColumn: (): UTF16Offset => singleLineStringWriter_GetColumn(w),
    GetIndent: (): int => singleLineStringWriter_GetIndent(w),
    IsAtStartOfLine: (): bool => singleLineStringWriter_IsAtStartOfLine(w),
    HasTrailingComment: (): bool => singleLineStringWriter_HasTrailingComment(w),
    HasTrailingWhitespace: (): bool => singleLineStringWriter_HasTrailingWhitespace(w),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::varGroup::singleLineStringWriterPool","kind":"varGroup","status":"implemented","sigHash":"47953f36e85fe12c52a621383c30c1494c6b401f2e5968c23fe1216b5399e5bd"}
 *
 * Go source:
 * var singleLineStringWriterPool sync.Pool = sync.Pool{
 * 	New: func() any {
 * 		return &singleLineStringWriter{}
 * 	},
 * }
 */
export let singleLineStringWriterPool: Pool = ((): Pool => {
  const pool = new Pool();
  pool.New = (): GoPtr<singleLineStringWriter> => ({
    builder: new Builder(),
    lastWritten: "",
  });
  return pool;
})();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ EmitTextWriter = &singleLineStringWriter{}
 */
export let __7e0fb603_0: GoInterface<EmitTextWriter> = singleLineStringWriter_as_EmitTextWriter({
  builder: new Builder(),
  lastWritten: "",
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::func::GetSingleLineStringWriter","kind":"func","status":"implemented","sigHash":"95e5c2e268b4c488c300c1d038aa2504121b49ebf2afba66099c4db7505413f6"}
 *
 * Go source:
 * func GetSingleLineStringWriter() (EmitTextWriter, func()) {
 * 	w := singleLineStringWriterPool.Get().(*singleLineStringWriter)
 * 	w.Clear()
 * 	return w, func() {
 * 		singleLineStringWriterPool.Put(w)
 * 	}
 * }
 */
export function GetSingleLineStringWriter(): [EmitTextWriter, GoFunc<() => void>] {
  const w = singleLineStringWriterPool.Get() as singleLineStringWriter;
  singleLineStringWriter_Clear(w);
  return [
    singleLineStringWriter_as_EmitTextWriter(w),
    (): void => {
      singleLineStringWriterPool.Put(w);
    },
  ];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::type::singleLineStringWriter","kind":"type","status":"implemented","sigHash":"658ccb8abef81471f292b93500062c96097bb5638dddf0d0578a180e923a1f18"}
 *
 * Go source:
 * singleLineStringWriter struct {
 * 	builder     strings.Builder
 * 	lastWritten string
 * }
 */
export interface singleLineStringWriter {
  builder: Builder;
  lastWritten: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.Clear","kind":"method","status":"implemented","sigHash":"f4a8cb7674cb3baec228ba4275d183efebfdc33c341db76c445b008db94b1dee"}
 *
 * Go source:
 * func (w *singleLineStringWriter) Clear() {
 * 	w.lastWritten = ""
 * 	w.builder.Reset()
 * }
 */
export function singleLineStringWriter_Clear(receiver: GoPtr<singleLineStringWriter>): void {
  const w = receiver!;
  w.lastWritten = "";
  w.builder.Reset();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.DecreaseIndent","kind":"method","status":"implemented","sigHash":"26914a21057ed86dea9ba33620a155504b10065343547e46580899a3ed80723e"}
 *
 * Go source:
 * func (w singleLineStringWriter) DecreaseIndent() {
 * 	// Do Nothing
 * }
 */
export function singleLineStringWriter_DecreaseIndent(receiver: singleLineStringWriter): void {
  // Do Nothing
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.GetColumn","kind":"method","status":"implemented","sigHash":"f043e38a87436f263a7a457ebcc7ef09e902a73c3ceee653b54e58dbfae024c2"}
 *
 * Go source:
 * func (w singleLineStringWriter) GetColumn() core.UTF16Offset {
 * 	return 0
 * }
 */
export function singleLineStringWriter_GetColumn(receiver: singleLineStringWriter): UTF16Offset {
  return 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.GetIndent","kind":"method","status":"implemented","sigHash":"32ff93718dfb5108bfc8dca925d9b38bc78f787effaeb6aa04b9e1896a814a6f"}
 *
 * Go source:
 * func (w singleLineStringWriter) GetIndent() int {
 * 	return 0
 * }
 */
export function singleLineStringWriter_GetIndent(receiver: singleLineStringWriter): int {
  return 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.GetLine","kind":"method","status":"implemented","sigHash":"4a46bfecba7057d05624d0616b49ed33175242f021f8d7b19ab9044c0c2e3151"}
 *
 * Go source:
 * func (w singleLineStringWriter) GetLine() int {
 * 	return 0
 * }
 */
export function singleLineStringWriter_GetLine(receiver: singleLineStringWriter): int {
  return 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.String","kind":"method","status":"implemented","sigHash":"ce7e42ee60562086aee6a88677d5464833a3820305c380b1856a993a5a4b7870"}
 *
 * Go source:
 * func (w singleLineStringWriter) String() string {
 * 	return w.builder.String()
 * }
 */
export function singleLineStringWriter_String(receiver: singleLineStringWriter): string {
  return receiver.builder.String();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.GetTextPos","kind":"method","status":"implemented","sigHash":"38d986edd4c8dc50562fdcb0db8ef70be747bf9b98dcfc8b9867258f20a294b3"}
 *
 * Go source:
 * func (w singleLineStringWriter) GetTextPos() int {
 * 	return w.builder.Len()
 * }
 */
export function singleLineStringWriter_GetTextPos(receiver: singleLineStringWriter): int {
  return receiver.builder.Len();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.HasTrailingComment","kind":"method","status":"implemented","sigHash":"ded081625a4f9d1cc658ab41b23b7cc36687e8bf5e476a85bd4967bb80308c18"}
 *
 * Go source:
 * func (w singleLineStringWriter) HasTrailingComment() bool {
 * 	return false
 * }
 */
export function singleLineStringWriter_HasTrailingComment(receiver: singleLineStringWriter): bool {
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.HasTrailingWhitespace","kind":"method","status":"implemented","sigHash":"09f03e29eecfae29f1839ad3625434b1c352bf2f9333fdcbb237cb8c4391bbd0"}
 *
 * Go source:
 * func (w singleLineStringWriter) HasTrailingWhitespace() bool {
 * 	if w.builder.Len() == 0 {
 * 		return false
 * 	}
 * 	ch, _ := utf8.DecodeLastRuneInString(w.lastWritten)
 * 	if ch == utf8.RuneError {
 * 		return false
 * 	}
 * 	return stringutil.IsWhiteSpaceLike(ch)
 * }
 */
export function singleLineStringWriter_HasTrailingWhitespace(receiver: singleLineStringWriter): bool {
  if (receiver.builder.Len() === 0) {
    return false;
  }
  const [ch] = utf8.DecodeLastRuneInString(receiver.lastWritten);
  if (ch === utf8.RuneError) {
    return false;
  }
  return IsWhiteSpaceLike(ch);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.IncreaseIndent","kind":"method","status":"implemented","sigHash":"fdecf37879234d8b159c546de9742bc00bf80a6ba2ee295814622070de08343e"}
 *
 * Go source:
 * func (w singleLineStringWriter) IncreaseIndent() {
 * 	// Do Nothing
 * }
 */
export function singleLineStringWriter_IncreaseIndent(receiver: singleLineStringWriter): void {
  // Do Nothing
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.IsAtStartOfLine","kind":"method","status":"implemented","sigHash":"136fada3bea70e2c87d0b1c87794bc1af5db819cc34c7735b0e6a8845fba250c"}
 *
 * Go source:
 * func (w singleLineStringWriter) IsAtStartOfLine() bool {
 * 	return false
 * }
 */
export function singleLineStringWriter_IsAtStartOfLine(receiver: singleLineStringWriter): bool {
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.RawWrite","kind":"method","status":"implemented","sigHash":"a6f62c30115f8937dea0c5415d6c9a72978513694bbf4fae47891387e6358cba"}
 *
 * Go source:
 * func (w *singleLineStringWriter) RawWrite(s string) {
 * 	w.lastWritten = s
 * 	w.builder.WriteString(s)
 * }
 */
export function singleLineStringWriter_RawWrite(receiver: GoPtr<singleLineStringWriter>, s: string): void {
  const w = receiver!;
  w.lastWritten = s;
  w.builder.WriteString(s);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.Write","kind":"method","status":"implemented","sigHash":"c882c1d7cde7a34b1c76257baf8d6873fa6da06bd720c0e1f93e1a59edd11103"}
 *
 * Go source:
 * func (w *singleLineStringWriter) Write(s string) {
 * 	w.lastWritten = s
 * 	w.builder.WriteString(s)
 * }
 */
export function singleLineStringWriter_Write(receiver: GoPtr<singleLineStringWriter>, s: string): void {
  const w = receiver!;
  w.lastWritten = s;
  w.builder.WriteString(s);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteComment","kind":"method","status":"implemented","sigHash":"c247a7ca20cae6774483b41782592c46ed9dd75b5a1f099630765bab5f0ba4c7"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteComment(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteComment(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteKeyword","kind":"method","status":"implemented","sigHash":"a6436bca745066eaf83b69454f6141fc74693e251ec7ece681ad32a020d70100"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteKeyword(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteKeyword(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteLine","kind":"method","status":"implemented","sigHash":"ad1055ccbe04f94438f9ef170655a796559552c3ab240e509de351c4ef09d7cf"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteLine() {
 * 	w.lastWritten = " "
 * 	w.builder.WriteString(" ")
 * }
 */
export function singleLineStringWriter_WriteLine(receiver: GoPtr<singleLineStringWriter>): void {
  const w = receiver!;
  w.lastWritten = " ";
  w.builder.WriteString(" ");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteLineForce","kind":"method","status":"implemented","sigHash":"2736b4925d39991fe60b1207db51f8bd6679ee9e22b2bf272f8f475c11effcff"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteLineForce(force bool) {
 * 	w.lastWritten = " "
 * 	w.builder.WriteString(" ")
 * }
 */
export function singleLineStringWriter_WriteLineForce(receiver: GoPtr<singleLineStringWriter>, force: bool): void {
  const w = receiver!;
  w.lastWritten = " ";
  w.builder.WriteString(" ");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteLiteral","kind":"method","status":"implemented","sigHash":"a0c06a68819519d6af59f05c2cae96ac70cb3308d2d750f89fc8b3b26b694235"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteLiteral(s string) {
 * 	w.lastWritten = s
 * 	w.builder.WriteString(s)
 * }
 */
export function singleLineStringWriter_WriteLiteral(receiver: GoPtr<singleLineStringWriter>, s: string): void {
  const w = receiver!;
  w.lastWritten = s;
  w.builder.WriteString(s);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteOperator","kind":"method","status":"implemented","sigHash":"62eab74b0fcacaf24c2e8a9d7d28e3cf9200a43438ee12b36efa59075ba8e5b9"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteOperator(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteOperator(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteParameter","kind":"method","status":"implemented","sigHash":"401ed951ce7ba6da1d27cbd3e337e0e2c1c5f7dd3773f97f8cc6f203b9a8d22d"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteParameter(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteParameter(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteProperty","kind":"method","status":"implemented","sigHash":"3fdebf0a5d8361a99eac9f5bdf3b7b62767e2e22fd189102c5ed1e02f011d65b"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteProperty(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteProperty(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WritePunctuation","kind":"method","status":"implemented","sigHash":"896fdeae27b5a8bd30a940f04e3c9733962cfdb0a1a7da18bb09b7e6119e0261"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WritePunctuation(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WritePunctuation(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteSpace","kind":"method","status":"implemented","sigHash":"9635c3a30fd92ea6a062ee40e97309ce5c8368436940938c6594196b65bfa5ea"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteSpace(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteSpace(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteStringLiteral","kind":"method","status":"implemented","sigHash":"0dfd47b85f284c41cebe89b748a4b02d5162f8af5f25746518cae197daa2a1af"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteStringLiteral(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteStringLiteral(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteSymbol","kind":"method","status":"implemented","sigHash":"588ec68b657f753d6a1cb1d2c6d4d3d0498d886d00fc998729d43527e7b8d644"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteSymbol(text string, symbol *ast.Symbol) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteSymbol(receiver: GoPtr<singleLineStringWriter>, text: string, symbol_: GoPtr<Symbol>): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/singlelinestringwriter.go::method::singleLineStringWriter.WriteTrailingSemicolon","kind":"method","status":"implemented","sigHash":"1f9dd22cbb6eb156ee51505e912fead1bfb434d1a90f8120993e8da697e78866"}
 *
 * Go source:
 * func (w *singleLineStringWriter) WriteTrailingSemicolon(text string) {
 * 	w.lastWritten = text
 * 	w.builder.WriteString(text)
 * }
 */
export function singleLineStringWriter_WriteTrailingSemicolon(receiver: GoPtr<singleLineStringWriter>, text: string): void {
  const w = receiver!;
  w.lastWritten = text;
  w.builder.WriteString(text);
}
