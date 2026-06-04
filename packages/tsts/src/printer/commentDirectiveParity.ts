/**
 * Printer pragma/triple-slash directive emission helpers.
 *
 * These handle TypeScript pragma comments (`/// <reference ... />`, `@jsx`,
 * `//# sourceMappingURL`), NOT TS-Go `ast.CommentDirective` (which is the
 * `// @ts-expect-error` / `// @ts-ignore` concept owned canonically by
 * `ast/pragma.ts`). Named `PrinterPragma*` so the pragma concept does not
 * collide with the AST comment-directive concept.
 */

export type PrinterPragmaKind = "reference" | "amd-module" | "amd-dependency" | "source-map" | "jsx";

export interface PrinterPragmaDirective {
  readonly kind: PrinterPragmaKind;
  readonly value: string;
  readonly arguments?: ReadonlyMap<string, string>;
}

export function parsePrinterPragma(text: string): PrinterPragmaDirective | undefined {
  const trimmed = text.trim().replace(/^\/{2,3}\s*/, "");
  if (!trimmed.startsWith("@")) return undefined;
  const [name, ...rest] = trimmed.slice(1).split(/\s+/);
  const value = rest.join(" ").trim();
  switch (name?.toLowerCase()) {
    case "reference":
      return { kind: "reference", value, arguments: parseDirectiveArguments(value) };
    case "amd-module":
      return { kind: "amd-module", value, arguments: parseDirectiveArguments(value) };
    case "amd-dependency":
      return { kind: "amd-dependency", value, arguments: parseDirectiveArguments(value) };
    case "sourceMappingURL":
    case "sourcemappingurl":
      return { kind: "source-map", value };
    case "jsx":
      return { kind: "jsx", value };
    default:
      return undefined;
  }
}

export function emitPrinterPragma(directive: PrinterPragmaDirective): string {
  if (directive.kind === "source-map") return `//# sourceMappingURL=${directive.value}`;
  if (directive.kind === "jsx") return `/** @jsx ${directive.value} */`;
  const args = directive.arguments === undefined ? directive.value : formatDirectiveArguments(directive.arguments);
  return `/// <${directive.kind.replace("-", " ")} ${args} />`;
}

export function collectPrinterPragmas(comments: readonly string[]): readonly PrinterPragmaDirective[] {
  return comments.map(parsePrinterPragma).filter((directive): directive is PrinterPragmaDirective => directive !== undefined);
}

export function printerPragmaValue(directive: PrinterPragmaDirective, key: string): string | undefined {
  return directive.arguments?.get(key);
}

function parseDirectiveArguments(text: string): ReadonlyMap<string, string> {
  const args = new Map<string, string>();
  for (const match of text.matchAll(/([A-Za-z]+)\s*=\s*"([^"]*)"/g)) args.set(match[1]!, match[2]!);
  return args;
}

function formatDirectiveArguments(args: ReadonlyMap<string, string>): string {
  return [...args].map(([key, value]) => `${key}="${value}"`).join(" ");
}
