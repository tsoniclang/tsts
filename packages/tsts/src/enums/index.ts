/**
 * TS-Go enum definitions in TypeScript form.
 *
 * Source: `@typescript/native-preview/src/enums/`. Vendored at TS-Go pin
 * `879968116c1dc9110249dd7e74ba47558e68621b`. Refresh with the schema pin.
 *
 * Each enum has two files (matching native-preview's structure):
 *   - `foo.enum.ts` — TypeScript `enum` declaration. Import for type usage.
 *   - `foo.ts` — Runtime IIFE-style object with reverse mapping
 *                (`SyntaxKind.Unknown === 0 && SyntaxKind[0] === "Unknown"`).
 *                Import for runtime/value usage.
 *
 * Why two forms: TS-Go's TypeScript code emits both — typed enum for the
 * type checker and IIFE pattern for the runtime layer. We mirror exactly
 * so adopted code from native-preview works unchanged.
 *
 * See `docs/tsgo-mapping.md` for the full TS-Go ↔ TSTS file map.
 */

// Type-level exports (TypeScript enum declarations)
export { CharacterCodes } from "./characterCodes.enum.js";
export { CommentDirectiveType } from "./commentDirectiveType.enum.js";
export { DiagnosticCategory } from "./diagnosticCategory.enum.js";
export { ElementFlags } from "./elementFlags.enum.js";
export { LanguageVariant } from "./languageVariant.enum.js";
export { ModifierFlags } from "./modifierFlags.enum.js";
export { NodeBuilderFlags } from "./nodeBuilderFlags.enum.js";
export { NodeFlags } from "./nodeFlags.enum.js";
export { ObjectFlags } from "./objectFlags.enum.js";
export { OuterExpressionKinds } from "./outerExpressionKinds.enum.js";
export { RegularExpressionFlags } from "./regularExpressionFlags.enum.js";
export { ScriptKind } from "./scriptKind.enum.js";
export { ScriptTarget } from "./scriptTarget.enum.js";
export { SignatureFlags } from "./signatureFlags.enum.js";
export { SignatureKind } from "./signatureKind.enum.js";
export { SymbolFlags } from "./symbolFlags.enum.js";
export { SyntaxKind } from "./syntaxKind.enum.js";
export { TokenFlags } from "./tokenFlags.enum.js";
export { TypeFlags } from "./typeFlags.enum.js";
export { TypePredicateKind } from "./typePredicateKind.enum.js";
