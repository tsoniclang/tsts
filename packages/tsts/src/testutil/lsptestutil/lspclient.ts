export interface LspMessage {
  readonly method?: string;
  readonly id?: string | number;
  readonly params?: unknown;
  readonly result?: unknown;
  readonly error?: unknown;
}

export class LspClient {
  private readonly messages: LspMessage[] = [];

  send(message: LspMessage): void {
    this.messages.push(message);
  }

  takeAll(): readonly LspMessage[] {
    const out = [...this.messages];
    this.messages.length = 0;
    return out;
  }
}
