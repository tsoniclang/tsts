import { diagnosticMessagesByCode, type DiagnosticCategory, type DiagnosticCode, type DiagnosticMessageTemplate } from "./generated/messages.js";

export { diagnosticMessages, diagnosticMessagesByCode } from "./generated/messages.js";
export type { DiagnosticCategory, DiagnosticCode, DiagnosticMessageTemplate };

export interface Diagnostic {
  readonly code: DiagnosticCode;
  readonly category: DiagnosticCategory;
  readonly key: string;
  readonly messageText: string;
  readonly message: string;
  readonly fileName?: string;
  readonly start?: number;
  readonly length?: number;
}

export interface DiagnosticLocation {
  readonly fileName?: string;
  readonly start?: number;
  readonly length?: number;
}

export function createDiagnostic(code: DiagnosticCode, ...args: readonly string[]): Diagnostic {
  return createDiagnosticAt({}, code, ...args);
}

export function createDiagnosticAt(location: DiagnosticLocation, code: DiagnosticCode, ...args: readonly string[]): Diagnostic {
  const template = diagnosticMessagesByCode[code];
  if (template === undefined) {
    throw new Error(`Unknown TypeScript diagnostic code ${code}`);
  }
  const messageText = formatDiagnosticMessage(template.text, args);
  return {
    code,
    category: template.category,
    key: template.key,
    messageText,
    message: messageText,
    ...location,
  };
}

export function formatDiagnosticMessage(template: string, args: readonly string[]): string {
  return template.replace(/\{(\d+)\}/g, (placeholder, indexText) => {
    const index = Number(indexText);
    return args[index] ?? placeholder;
  });
}
