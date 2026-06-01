export type LspMessageKind = "request" | "response" | "notification";

export interface LspMessage {
  readonly jsonrpc?: string;
  readonly kind?: LspMessageKind;
  readonly method?: string;
  readonly id?: string | number;
  readonly params?: unknown;
  readonly result?: unknown;
  readonly error?: ResponseError;
}

export interface ResponseError {
  readonly code: number;
  readonly message: string;
}

export interface RequestInfo<Params, Resp> {
  newRequestMessage(id: string | number, params: Params): LspMessage;
  parseResponse?(result: unknown): Resp | undefined;
}

export interface NotificationInfo<Params> {
  newNotificationMessage(params: Params): LspMessage;
}

export type ServerRequestHandler = (request: LspMessage) => LspMessage | undefined;
export type ServerNotificationHandler = (request: LspMessage) => void;

export class LspReader {
  constructor(private readonly pipe: LspPipe) {}

  async read(): Promise<LspMessage | undefined> {
    return await this.pipe.read();
  }
}

export class LspWriter {
  constructor(private readonly pipe: LspPipe) {}

  write(message: LspMessage): void {
    this.pipe.write(message);
  }

  close(): void {
    this.pipe.close();
  }
}

export class LspPipe {
  private readonly queue: LspMessage[] = [];
  private readonly waiters: ((message: LspMessage | undefined) => void)[] = [];
  private closed = false;

  read(): Promise<LspMessage | undefined> {
    const existing = this.queue.shift();
    if (existing !== undefined) return Promise.resolve(existing);
    if (this.closed) return Promise.resolve(undefined);
    return new Promise(resolve => this.waiters.push(resolve));
  }

  write(message: LspMessage): void {
    if (this.closed) throw new Error("LSP pipe is closed");
    const waiter = this.waiters.shift();
    if (waiter !== undefined) waiter(message);
    else this.queue.push(message);
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    for (const waiter of this.waiters.splice(0)) waiter(undefined);
  }
}

export function newLspPipe(): readonly [LspReader, LspWriter] {
  const pipe = new LspPipe();
  return [new LspReader(pipe), new LspWriter(pipe)];
}

export class LspClient {
  readonly server: unknown;
  readonly inputWriter: LspWriter;
  readonly outputReader: LspReader;
  onServerNotification: ServerNotificationHandler | undefined;
  private nextRequestID = 0;
  private readonly pendingRequests = new Map<string | number, (message: LspMessage | undefined) => void>();
  private readonly sentMessages: LspMessage[] = [];
  private closed = false;

  constructor(init?: {
    readonly server?: unknown;
    readonly inputWriter?: LspWriter;
    readonly outputReader?: LspReader;
    readonly onServerRequest?: ServerRequestHandler;
    readonly onServerNotification?: ServerNotificationHandler;
  }) {
    const [inputReader, inputWriter] = newLspPipe();
    const [outputReader, outputWriter] = newLspPipe();
    void inputReader;
    void outputWriter;
    this.server = init?.server;
    this.inputWriter = init?.inputWriter ?? inputWriter;
    this.outputReader = init?.outputReader ?? outputReader;
    this.onServerRequest = init?.onServerRequest;
    this.onServerNotification = init?.onServerNotification;
  }

  private readonly onServerRequest: ServerRequestHandler | undefined;

  nextID(): number {
    const id = this.nextRequestID;
    this.nextRequestID += 1;
    return id;
  }

  async messageRouter(signal?: AbortSignal): Promise<void> {
    for (;;) {
      const message = await this.outputReader.read();
      if (message === undefined) return;
      if (signal?.aborted === true || this.closed) continue;
      validateJsonMessage(message);
      switch (message.kind ?? inferMessageKind(message)) {
        case "response":
          this.handleResponse(message);
          break;
        case "request":
          this.handleServerRequest(message);
          break;
        case "notification":
          this.onServerNotification?.(message);
          break;
      }
    }
  }

  handleResponse(response: LspMessage): void {
    if (response.id === undefined) return;
    const resolve = this.pendingRequests.get(response.id);
    if (resolve === undefined) return;
    this.pendingRequests.delete(response.id);
    resolve(response);
  }

  handleServerRequest(request: LspMessage): void {
    const response = this.onServerRequest?.(request) ?? defaultMethodNotFoundResponse(request);
    if (!this.closed) this.inputWriter.write(response);
  }

  writeMsg(message: LspMessage): void {
    validateJsonMessage(message);
    this.sentMessages.push(message);
    this.inputWriter.write(message);
  }

  send(message: LspMessage): void {
    this.writeMsg(message);
  }

  takeAll(): readonly LspMessage[] {
    const out = [...this.sentMessages];
    this.sentMessages.length = 0;
    return out;
  }

  sendRequestWorker(request: LspMessage, requestID: string | number): Promise<readonly [LspMessage | undefined, boolean]> {
    const responsePromise = this.startRequestWorker(request, requestID);
    return this.waitForResponse(requestID, responsePromise);
  }

  startRequestWorker(request: LspMessage, requestID: string | number): Promise<LspMessage | undefined> {
    const responsePromise = new Promise<LspMessage | undefined>(resolve => this.pendingRequests.set(requestID, resolve));
    this.writeMsg(request);
    return responsePromise;
  }

  async waitForResponse(requestID: string | number, responsePromise: Promise<LspMessage | undefined>): Promise<readonly [LspMessage | undefined, boolean]> {
    const response = await responsePromise;
    this.pendingRequests.delete(requestID);
    return [response, response !== undefined];
  }

  close(): void {
    this.closed = true;
    for (const resolve of this.pendingRequests.values()) resolve(undefined);
    this.pendingRequests.clear();
    this.inputWriter.close();
  }

  setCompilerOptionsForInferredProjects(options: unknown): void {
    const server = this.server as { setCompilerOptionsForInferredProjects?: (options: unknown) => void } | undefined;
    server?.setCompilerOptionsForInferredProjects?.(options);
  }
}

export function newLspClient(init?: ConstructorParameters<typeof LspClient>[0]): readonly [LspClient, () => void] {
  const client = new LspClient(init);
  return [client, () => client.close()];
}

export async function sendRequest<Params, Resp>(
  client: LspClient,
  info: RequestInfo<Params, Resp>,
  params: Params,
): Promise<readonly [LspMessage | undefined, Resp | undefined, boolean]> {
  const id = client.nextID();
  const request = info.newRequestMessage(id, params);
  const [response, ok] = await client.sendRequestWorker(request, id);
  if (!ok || response === undefined) return [response, undefined, false];
  const result = info.parseResponse?.(response.result) ?? response.result as Resp;
  return [response, result, true];
}

export function sendRequestAsync<Params, Resp>(
  client: LspClient,
  info: RequestInfo<Params, Resp>,
  params: Params,
): () => Promise<readonly [LspMessage | undefined, Resp | undefined, boolean]> {
  const id = client.nextID();
  const request = info.newRequestMessage(id, params);
  const responsePromise = client.startRequestWorker(request, id);
  return async () => {
    const [response, ok] = await client.waitForResponse(id, responsePromise);
    if (!ok || response === undefined) return [response, undefined, false];
    const result = info.parseResponse?.(response.result) ?? response.result as Resp;
    return [response, result, true];
  };
}

export function sendNotification<Params>(client: LspClient, info: NotificationInfo<Params>, params: Params): void {
  client.writeMsg(info.newNotificationMessage(params));
}

function inferMessageKind(message: LspMessage): LspMessageKind {
  if (message.id !== undefined && (message.result !== undefined || message.error !== undefined)) return "response";
  if (message.id !== undefined) return "request";
  return "notification";
}

function validateJsonMessage(message: LspMessage): void {
  JSON.stringify(message);
}

function defaultMethodNotFoundResponse(request: LspMessage): LspMessage {
  return {
    jsonrpc: request.jsonrpc ?? "2.0",
    kind: "response",
    ...(request.id === undefined ? {} : { id: request.id }),
    error: {
      code: -32601,
      message: `Unknown method: ${request.method ?? ""}`,
    },
  };
}
