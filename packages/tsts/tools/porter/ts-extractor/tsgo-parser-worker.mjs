import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { workerData } from "node:worker_threads";

import { canonicalizeTSGoBridgeResponse } from "./tsgo-canonical-ast.mjs";

const { binary, port, revision } = workerData;
if (typeof binary !== "string" || binary === "" || typeof revision !== "string" || revision === "" || port === undefined) {
  throw new Error("TS-Go parser worker requires exact bridge binary, revision, and message port inputs");
}

async function handleRequest(message) {
  const signal = message?.signal instanceof SharedArrayBuffer ? new Int32Array(message.signal) : undefined;
  try {
    if (signal === undefined || signal.length !== 1) throw new Error("TS-Go parser request requires a one-word shared completion signal");
    const request = {
      id: requireRequestID(message.id),
      fileName: requireString(message.fileName, "fileName"),
      text: requireString(message.text, "text", true),
    };
    const response = await bridge.request(request);
    const sourceFile = canonicalizeTSGoBridgeResponse(response, request, revision);
    port.postMessage({ kind: "result", id: request.id, sourceFile });
  } catch (error) {
    port.postMessage({ kind: "request-error", id: message?.id, error: serializeError(error) });
  } finally {
    if (signal !== undefined) {
      Atomics.store(signal, 0, 1);
      Atomics.notify(signal, 0, 1);
    }
  }
}

class BridgeClient {
  constructor(executable) {
    this.pending = [];
    this.stderr = "";
    this.failure = undefined;
    this.child = spawn(executable, [], {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        HOME: process.env.HOME ?? "",
        LANG: "C.UTF-8",
        LC_ALL: "C.UTF-8",
        PATH: "",
        TZ: "UTC",
      },
    });
    this.lines = createInterface({ input: this.child.stdout, crlfDelay: Infinity });
    this.lines.on("line", (line) => this.receive(line));
    this.child.stderr.setEncoding("utf8");
    this.child.stderr.on("data", (chunk) => {
      if (this.stderr.length < 1024 * 1024) this.stderr += chunk;
    });
    this.child.on("error", (error) => this.fail(error));
    this.child.on("exit", (code, signal) => {
      this.fail(new Error(`TS-Go declaration bridge exited unexpectedly (code=${String(code)}, signal=${String(signal)})${this.stderr === "" ? "" : `\n${this.stderr}`}`));
    });
  }

  request(value) {
    if (this.failure !== undefined) return Promise.reject(this.failure);
    return new Promise((resolve, reject) => {
      this.pending.push({ reject, resolve });
      this.child.stdin.write(`${JSON.stringify(value)}\n`, "utf8", (error) => {
        if (error !== null && error !== undefined) this.fail(error);
      });
    });
  }

  receive(line) {
    const pending = this.pending.shift();
    if (pending === undefined) {
      this.fail(new Error("TS-Go declaration bridge produced an unsolicited response"));
      return;
    }
    try {
      pending.resolve(JSON.parse(line));
    } catch (error) {
      pending.reject(new Error(`TS-Go declaration bridge returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`));
    }
  }

  fail(error) {
    if (this.failure !== undefined) return;
    this.failure = error instanceof Error ? error : new Error(String(error));
    for (const pending of this.pending.splice(0)) pending.reject(this.failure);
  }

  close() {
    this.lines.close();
    this.child.stdin.end();
  }
}

const bridge = new BridgeClient(binary);
let work = Promise.resolve();

port.on("message", (message) => {
  work = work.then(() => handleRequest(message));
});
port.on("close", () => bridge.close());
port.start();

try {
  const probe = { id: 0, fileName: "/__tsts_porter_bridge_probe.ts", text: "" };
  canonicalizeTSGoBridgeResponse(await bridge.request(probe), probe, revision);
  port.postMessage({ kind: "ready", revision });
} catch (error) {
  port.postMessage({ kind: "startup-error", error: serializeError(error) });
}

function requireRequestID(value) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error("TS-Go parser request id must be a positive safe integer");
  return value;
}

function requireString(value, label, allowEmpty = false) {
  if (typeof value !== "string" || (!allowEmpty && value === "")) throw new Error(`TS-Go parser request ${label} must be ${allowEmpty ? "a string" : "a non-empty string"}`);
  return value;
}

function serializeError(error) {
  return {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error && typeof error.stack === "string" ? error.stack : "",
  };
}
