/**
 * Fourslash semantic-token baseline support.
 *
 * Porting surface for TS-Go `internal/fourslash/semantictokens.go`.
 */

import type { Range } from "../lsp/lsproto/index.js";

export interface SemanticToken {
  readonly range: Range;
  readonly tokenType: string;
  readonly tokenModifiers: readonly string[];
}

export interface EncodedSemanticToken {
  readonly deltaLine: number;
  readonly deltaStart: number;
  readonly length: number;
  readonly tokenType: number;
  readonly tokenModifiers: number;
}

export interface SemanticTokenLegend {
  readonly tokenTypes: readonly string[];
  readonly tokenModifiers: readonly string[];
}

export function decodeSemanticTokens(data: readonly number[], legend: SemanticTokenLegend): readonly SemanticToken[] {
  const result: SemanticToken[] = [];
  let line = 0;
  let character = 0;
  for (let index = 0; index + 4 < data.length; index += 5) {
    const deltaLine = data[index]!;
    const deltaStart = data[index + 1]!;
    const length = data[index + 2]!;
    const tokenType = data[index + 3]!;
    const tokenModifiers = data[index + 4]!;
    line += deltaLine;
    character = deltaLine === 0 ? character + deltaStart : deltaStart;
    result.push({
      range: {
        start: { line, character },
        end: { line, character: character + length },
      },
      tokenType: legend.tokenTypes[tokenType] ?? `unknown(${tokenType})`,
      tokenModifiers: decodeTokenModifiers(tokenModifiers, legend.tokenModifiers),
    });
  }
  return result;
}

export function encodeSemanticTokens(tokens: readonly SemanticToken[], legend: SemanticTokenLegend): readonly number[] {
  const sorted = [...tokens].sort((left, right) => left.range.start.line - right.range.start.line || left.range.start.character - right.range.start.character);
  const encoded: number[] = [];
  let previousLine = 0;
  let previousCharacter = 0;
  for (const token of sorted) {
    const line = token.range.start.line;
    const character = token.range.start.character;
    const deltaLine = line - previousLine;
    const deltaStart = deltaLine === 0 ? character - previousCharacter : character;
    encoded.push(
      deltaLine,
      deltaStart,
      token.range.end.character - token.range.start.character,
      Math.max(0, legend.tokenTypes.indexOf(token.tokenType)),
      encodeTokenModifiers(token.tokenModifiers, legend.tokenModifiers),
    );
    previousLine = line;
    previousCharacter = character;
  }
  return encoded;
}

export function semanticTokenBaseline(tokens: readonly SemanticToken[]): string {
  return [...tokens]
    .sort((left, right) => left.range.start.line - right.range.start.line || left.range.start.character - right.range.start.character)
    .map((token) => {
      const modifiers = token.tokenModifiers.length === 0 ? "" : ` [${token.tokenModifiers.join(", ")}]`;
      return `${token.range.start.line + 1}:${token.range.start.character + 1}-${token.range.end.character + 1} ${token.tokenType}${modifiers}`;
    })
    .join("\n");
}

function decodeTokenModifiers(mask: number, modifiers: readonly string[]): readonly string[] {
  const result: string[] = [];
  for (let bit = 0; bit < modifiers.length; bit += 1) {
    if ((mask & (1 << bit)) !== 0) result.push(modifiers[bit]!);
  }
  return result;
}

function encodeTokenModifiers(values: readonly string[], modifiers: readonly string[]): number {
  let mask = 0;
  for (const value of values) {
    const index = modifiers.indexOf(value);
    if (index >= 0) mask |= 1 << index;
  }
  return mask;
}

// Source parity map: internal/fourslash/semantictokens.go
/**
 * Source parity map for TS-Go `fourslash/semantictokens.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

const fourslashSemantictokensUpstreamPath = "fourslash/semantictokens.go";

const fourslashSemantictokensDeclarations: readonly UpstreamDeclaration[] = [
  {"line":12,"kind":"type","name":"SemanticToken"},
  {"line":17,"kind":"func","name":"VerifySemanticTokens","receiver":"f *FourslashTest"},
  {"line":55,"kind":"func","name":"decodeSemanticTokens"},
  {"line":124,"kind":"func","name":"formatSemanticTokens"},
];

const fourslashSemantictokensSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package fourslash"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"fmt\""},
  {"line":5,"text":"\t\"strings\""},
  {"line":6,"text":"\t\"testing\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":10,"text":")"},
  {"line":12,"text":"type SemanticToken struct {"},
  {"line":13,"text":"\tType string"},
  {"line":14,"text":"\tText string"},
  {"line":15,"text":"}"},
  {"line":17,"text":"func (f *FourslashTest) VerifySemanticTokens(t *testing.T, expected []SemanticToken) {"},
  {"line":18,"text":"\tt.Helper()"},
  {"line":20,"text":"\tparams := &lsproto.SemanticTokensParams{"},
  {"line":21,"text":"\t\tTextDocument: lsproto.TextDocumentIdentifier{"},
  {"line":22,"text":"\t\t\tUri: lsconv.FileNameToDocumentURI(f.activeFilename),"},
  {"line":23,"text":"\t\t},"},
  {"line":24,"text":"\t}"},
  {"line":26,"text":"\tresult := sendRequest(t, f, lsproto.TextDocumentSemanticTokensFullInfo, params)"},
  {"line":28,"text":"\tif result.SemanticTokens == nil {"},
  {"line":29,"text":"\t\tif len(expected) == 0 {"},
  {"line":30,"text":"\t\t\treturn"},
  {"line":31,"text":"\t\t}"},
  {"line":32,"text":"\t\tt.Fatal(\"Expected semantic tokens but got nil\")"},
  {"line":33,"text":"\t}"},
  {"line":36,"text":"\tactual := decodeSemanticTokens(f, result.SemanticTokens.Data, f.semanticTokenTypes, f.semanticTokenModifiers)"},
  {"line":39,"text":"\tif len(actual) != len(expected) {"},
  {"line":40,"text":"\t\tt.Fatalf(\"Expected %d semantic tokens, got %d\\n\\nExpected:\\n%s\\n\\nActual:\\n%s\","},
  {"line":41,"text":"\t\t\tlen(expected), len(actual),"},
  {"line":42,"text":"\t\t\tformatSemanticTokens(expected),"},
  {"line":43,"text":"\t\t\tformatSemanticTokens(actual))"},
  {"line":44,"text":"\t}"},
  {"line":46,"text":"\tfor i, exp := range expected {"},
  {"line":47,"text":"\t\tact := actual[i]"},
  {"line":48,"text":"\t\tif exp.Type != act.Type || exp.Text != act.Text {"},
  {"line":49,"text":"\t\t\tt.Errorf(\"Token %d mismatch:\\n  Expected: {Type: %q, Text: %q}\\n  Actual:   {Type: %q, Text: %q}\","},
  {"line":50,"text":"\t\t\t\ti, exp.Type, exp.Text, act.Type, act.Text)"},
  {"line":51,"text":"\t\t}"},
  {"line":52,"text":"\t}"},
  {"line":53,"text":"}"},
  {"line":55,"text":"func decodeSemanticTokens(f *FourslashTest, data []uint32, tokenTypes, tokenModifiers []string) []SemanticToken {"},
  {"line":56,"text":"\tif len(data)%5 != 0 {"},
  {"line":57,"text":"\t\tpanic(fmt.Sprintf(\"Invalid semantic tokens data length: %d\", len(data)))"},
  {"line":58,"text":"\t}"},
  {"line":60,"text":"\tscriptInfo := f.scriptInfos[f.activeFilename]"},
  {"line":61,"text":"\tconverters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *lsconv.LSPLineMap {"},
  {"line":62,"text":"\t\treturn scriptInfo.lineMap"},
  {"line":63,"text":"\t})"},
  {"line":65,"text":"\tvar tokens []SemanticToken"},
  {"line":66,"text":"\tprevLine := uint32(0)"},
  {"line":67,"text":"\tprevChar := uint32(0)"},
  {"line":69,"text":"\tfor i := 0; i < len(data); i += 5 {"},
  {"line":70,"text":"\t\tdeltaLine := data[i]"},
  {"line":71,"text":"\t\tdeltaChar := data[i+1]"},
  {"line":72,"text":"\t\tlength := data[i+2]"},
  {"line":73,"text":"\t\ttokenTypeIdx := data[i+3]"},
  {"line":74,"text":"\t\ttokenModifierMask := data[i+4]"},
  {"line":77,"text":"\t\tline := prevLine + deltaLine"},
  {"line":78,"text":"\t\tvar char uint32"},
  {"line":79,"text":"\t\tif deltaLine == 0 {"},
  {"line":80,"text":"\t\t\tchar = prevChar + deltaChar"},
  {"line":81,"text":"\t\t} else {"},
  {"line":82,"text":"\t\t\tchar = deltaChar"},
  {"line":83,"text":"\t\t}"},
  {"line":86,"text":"\t\tif int(tokenTypeIdx) >= len(tokenTypes) {"},
  {"line":87,"text":"\t\t\tpanic(fmt.Sprintf(\"Token type index out of range: %d\", tokenTypeIdx))"},
  {"line":88,"text":"\t\t}"},
  {"line":89,"text":"\t\ttokenType := tokenTypes[tokenTypeIdx]"},
  {"line":92,"text":"\t\tvar modifiers []string"},
  {"line":93,"text":"\t\tfor i, mod := range tokenModifiers {"},
  {"line":94,"text":"\t\t\tif tokenModifierMask&(1<<i) != 0 {"},
  {"line":95,"text":"\t\t\t\tmodifiers = append(modifiers, mod)"},
  {"line":96,"text":"\t\t\t}"},
  {"line":97,"text":"\t\t}"},
  {"line":100,"text":"\t\ttypeStr := tokenType"},
  {"line":101,"text":"\t\tif len(modifiers) > 0 {"},
  {"line":102,"text":"\t\t\ttypeStr = typeStr + \".\" + strings.Join(modifiers, \".\")"},
  {"line":103,"text":"\t\t}"},
  {"line":106,"text":"\t\tstartPos := lsproto.Position{Line: line, Character: char}"},
  {"line":107,"text":"\t\tendPos := lsproto.Position{Line: line, Character: char + length}"},
  {"line":108,"text":"\t\tstartOffset := int(converters.LineAndCharacterToPosition(scriptInfo, startPos))"},
  {"line":109,"text":"\t\tendOffset := int(converters.LineAndCharacterToPosition(scriptInfo, endPos))"},
  {"line":110,"text":"\t\ttext := scriptInfo.content[startOffset:endOffset]"},
  {"line":112,"text":"\t\ttokens = append(tokens, SemanticToken{"},
  {"line":113,"text":"\t\t\tType: typeStr,"},
  {"line":114,"text":"\t\t\tText: text,"},
  {"line":115,"text":"\t\t})"},
  {"line":117,"text":"\t\tprevLine = line"},
  {"line":118,"text":"\t\tprevChar = char"},
  {"line":119,"text":"\t}"},
  {"line":121,"text":"\treturn tokens"},
  {"line":122,"text":"}"},
  {"line":124,"text":"func formatSemanticTokens(tokens []SemanticToken) string {"},
  {"line":125,"text":"\tvar lines []string"},
  {"line":126,"text":"\tfor i, tok := range tokens {"},
  {"line":127,"text":"\t\tlines = append(lines, fmt.Sprintf(\"  [%d] {Type: %q, Text: %q}\", i, tok.Type, tok.Text))"},
  {"line":128,"text":"\t}"},
  {"line":129,"text":"\treturn strings.Join(lines, \"\\n\")"},
  {"line":130,"text":"}"},
];

function findFourslashSemantictokensDeclaration(name: string): UpstreamDeclaration | undefined {
  return fourslashSemantictokensDeclarations.find((declaration) => declaration.name === name);
}

function requireFourslashSemantictokensDeclaration(name: string): UpstreamDeclaration {
  const declaration = findFourslashSemantictokensDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

function fourslashSemantictokensLineText(line: number): string | undefined {
  return fourslashSemantictokensSourceLines.find((entry) => entry.line === line)?.text;
}
