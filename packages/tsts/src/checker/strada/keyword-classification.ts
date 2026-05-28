/**
 * Keyword classification.
 *
 * Ported from Strada `scanner/utilities.go` — classifies keyword
 * tokens by their role: reserved word, future-reserved, contextual,
 * strict-mode-only.
 */

import { Kind } from "../../ast/index.js";

/**
 * Returns true when the keyword kind is a reserved word.
 */
export function isReservedKeyword(kind: number): boolean {
  return kind >= Kind.BreakKeyword && kind <= Kind.WithKeyword;
}

/**
 * Returns true when the keyword is a "contextual" keyword — has
 * meaning only in certain positions (e.g. `as`, `of`, `from`).
 */
export function isContextualKeyword(kind: number): boolean {
  switch (kind) {
    case Kind.AsKeyword:
    case Kind.AsyncKeyword:
    case Kind.AwaitKeyword:
    case Kind.FromKeyword:
    case Kind.GetKeyword:
    case Kind.OfKeyword:
    case Kind.SetKeyword:
    case Kind.TypeKeyword:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the keyword is a "future-reserved" word —
 * reserved by ECMAScript spec but currently usable as an identifier.
 */
export function isFutureReservedKeyword(kind: number): boolean {
  return kind >= Kind.ImplementsKeyword && kind <= Kind.YieldKeyword;
}

/**
 * Returns true when the keyword is strict-mode-only reserved.
 */
export function isStrictModeReservedKeyword(kind: number): boolean {
  switch (kind) {
    case Kind.ImplementsKeyword:
    case Kind.InterfaceKeyword:
    case Kind.LetKeyword:
    case Kind.PackageKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.PublicKeyword:
    case Kind.StaticKeyword:
    case Kind.YieldKeyword:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the keyword is a TypeScript-only keyword.
 */
export function isTypeScriptKeyword(kind: number): boolean {
  switch (kind) {
    case Kind.AbstractKeyword:
    case Kind.AnyKeyword:
    case Kind.AsKeyword:
    case Kind.AssertsKeyword:
    case Kind.BooleanKeyword:
    case Kind.DeclareKeyword:
    case Kind.InferKeyword:
    case Kind.IntrinsicKeyword:
    case Kind.IsKeyword:
    case Kind.KeyOfKeyword:
    case Kind.ModuleKeyword:
    case Kind.NamespaceKeyword:
    case Kind.NeverKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.RequireKeyword:
    case Kind.NumberKeyword:
    case Kind.ObjectKeyword:
    case Kind.SatisfiesKeyword:
    case Kind.SymbolKeyword:
    case Kind.TypeKeyword:
    case Kind.UndefinedKeyword:
    case Kind.UniqueKeyword:
    case Kind.UnknownKeyword:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the keyword is one of the modifier keywords
 * (`public`, `private`, etc.).
 */
export function isModifierKeyword(kind: number): boolean {
  switch (kind) {
    case Kind.AbstractKeyword:
    case Kind.AccessorKeyword:
    case Kind.AsyncKeyword:
    case Kind.ConstKeyword:
    case Kind.DeclareKeyword:
    case Kind.DefaultKeyword:
    case Kind.ExportKeyword:
    case Kind.InKeyword:
    case Kind.OutKeyword:
    case Kind.OverrideKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.PublicKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.StaticKeyword:
      return true;
    default:
      return false;
  }
}
