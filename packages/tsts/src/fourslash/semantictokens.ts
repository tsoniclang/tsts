/**
 * Fourslash semantic-token baseline support.
 *
 * Port of TS-Go `internal/fourslash/semantictokens.go`.
 */

import type { SemanticTokens } from "../lsp/lsproto/index.js";
import type { FourslashTest, ScriptInfo } from "./fourslash.js";

export interface SemanticToken {
  readonly type: string;
  readonly text: string;
}

export function verifySemanticTokens(
  test: FourslashTest,
  response: SemanticTokens | undefined,
  expected: readonly SemanticToken[],
): void {
  if (response === undefined) {
    if (expected.length === 0) return;
    throw new Error("Expected semantic tokens but got nil");
  }

  const actual = decodeSemanticTokens(test, response.data, test.semanticTokenTypes, test.semanticTokenModifiers);
  if (actual.length !== expected.length) {
    throw new Error(
      [
        `Expected ${expected.length} semantic tokens, got ${actual.length}`,
        "",
        "Expected:",
        formatSemanticTokens(expected),
        "",
        "Actual:",
        formatSemanticTokens(actual),
      ].join("\n"),
    );
  }

  for (let index = 0; index < expected.length; index += 1) {
    const expectedToken = expected[index]!;
    const actualToken = actual[index]!;
    if (expectedToken.type !== actualToken.type || expectedToken.text !== actualToken.text) {
      throw new Error(
        `Token ${index} mismatch:\n`
        + `  Expected: {Type: ${JSON.stringify(expectedToken.type)}, Text: ${JSON.stringify(expectedToken.text)}}\n`
        + `  Actual:   {Type: ${JSON.stringify(actualToken.type)}, Text: ${JSON.stringify(actualToken.text)}}`,
      );
    }
  }
}

export function decodeSemanticTokens(
  test: FourslashTest,
  data: readonly number[],
  tokenTypes: readonly string[],
  tokenModifiers: readonly string[],
): readonly SemanticToken[] {
  if (data.length % 5 !== 0) {
    throw new Error(`Invalid semantic tokens data length: ${data.length}`);
  }

  const scriptInfo = test.scriptInfos.get(test.activeFilename);
  if (scriptInfo === undefined) {
    throw new Error(`Unknown fourslash script: ${test.activeFilename}`);
  }

  const tokens: SemanticToken[] = [];
  let previousLine = 0;
  let previousCharacter = 0;

  for (let index = 0; index < data.length; index += 5) {
    const deltaLine = data[index]!;
    const deltaCharacter = data[index + 1]!;
    const length = data[index + 2]!;
    const tokenTypeIndex = data[index + 3]!;
    const tokenModifierMask = data[index + 4]!;

    const line = previousLine + deltaLine;
    const character = deltaLine === 0 ? previousCharacter + deltaCharacter : deltaCharacter;

    if (tokenTypeIndex >= tokenTypes.length) {
      throw new Error(`Token type index out of range: ${tokenTypeIndex}`);
    }
    const tokenType = tokenTypes[tokenTypeIndex]!;

    const modifiers = decodeTokenModifiers(tokenModifierMask, tokenModifiers);
    const type = modifiers.length === 0 ? tokenType : `${tokenType}.${modifiers.join(".")}`;

    const startOffset = lineAndCharacterToPosition(scriptInfo, line, character);
    const endOffset = lineAndCharacterToPosition(scriptInfo, line, character + length);
    const text = scriptInfo.text().slice(startOffset, endOffset);

    tokens.push({ type, text });

    previousLine = line;
    previousCharacter = character;
  }

  return tokens;
}

export function formatSemanticTokens(tokens: readonly SemanticToken[]): string {
  return tokens
    .map((token, index) => `  [${index}] {Type: ${JSON.stringify(token.type)}, Text: ${JSON.stringify(token.text)}}`)
    .join("\n");
}

function decodeTokenModifiers(mask: number, modifiers: readonly string[]): readonly string[] {
  const result: string[] = [];
  for (let index = 0; index < modifiers.length; index += 1) {
    if ((mask & (1 << index)) !== 0) result.push(modifiers[index]!);
  }
  return result;
}

function lineAndCharacterToPosition(scriptInfo: ScriptInfo, line: number, character: number): number {
  return (scriptInfo.lineStarts()[line] ?? scriptInfo.text().length) + character;
}
