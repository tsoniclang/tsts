/**
 * Token writer parity helpers.
 */

export interface TokenWriterState {
  readonly tokens: string[];
  lastToken?: string;
}

export function createTokenWriterState(): TokenWriterState {
  return { tokens: [] };
}

export function writeToken(state: TokenWriterState, token: string): void {
  if (needsSpaceBetween(state.lastToken, token)) state.tokens.push(" ");
  state.tokens.push(token);
  state.lastToken = token;
}

export function writeKeyword(state: TokenWriterState, keyword: string): void {
  writeToken(state, keyword);
  state.tokens.push(" ");
}

export function writePunctuation(state: TokenWriterState, punctuation: string): void {
  state.tokens.push(punctuation);
  state.lastToken = punctuation;
}

export function tokenWriterText(state: TokenWriterState): string {
  return state.tokens.join("");
}

function needsSpaceBetween(left: string | undefined, right: string): boolean {
  if (left === undefined) return false;
  return /[$_A-Za-z0-9]$/.test(left) && /^[$_A-Za-z0-9]/.test(right);
}
