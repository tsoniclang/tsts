/**
 * Comment directive emission parity helpers.
 */

export type CommentDirectiveKind = "reference" | "amd-module" | "amd-dependency" | "source-map" | "jsx";

export interface CommentDirective {
  readonly kind: CommentDirectiveKind;
  readonly value: string;
  readonly arguments?: ReadonlyMap<string, string>;
}

export function parseCommentDirective(text: string): CommentDirective | undefined {
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

export function emitCommentDirective(directive: CommentDirective): string {
  if (directive.kind === "source-map") return `//# sourceMappingURL=${directive.value}`;
  if (directive.kind === "jsx") return `/** @jsx ${directive.value} */`;
  const args = directive.arguments === undefined ? directive.value : formatDirectiveArguments(directive.arguments);
  return `/// <${directive.kind.replace("-", " ")} ${args} />`;
}

export function collectCommentDirectives(comments: readonly string[]): readonly CommentDirective[] {
  return comments.map(parseCommentDirective).filter((directive): directive is CommentDirective => directive !== undefined);
}

export function directiveValue(directive: CommentDirective, key: string): string | undefined {
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
