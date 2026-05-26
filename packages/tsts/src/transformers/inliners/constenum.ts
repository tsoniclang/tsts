/**
 * Const-enum inlining transformer.
 *
 * Port of TS-Go `internal/transformers/inliners/constenum.go`.
 * Inlines property-access expressions that resolve to a const-enum
 * member value. Emits an Identifier/Numeric/String/BigInt literal
 * with optional trailing comment carrying the original text.
 *
 * Disabled under `isolatedModules`. Cross-module deps are forward
 * declared at the file end.
 */

import { Transformer, type TransformOptions } from "../transformer.js";
import type { Node as AstNode, SourceFile } from "../../ast/index.js";

// ---------------------------------------------------------------------------
// Transformer
// ---------------------------------------------------------------------------

export class ConstEnumInliningTransformer extends Transformer {
  readonly compilerOptions: CompilerOptions;
  currentSourceFile: SourceFile | undefined;
  readonly emitResolver: EmitResolver;

  constructor(opts: TransformOptions) {
    super();
    this.compilerOptions = opts.compilerOptions;
    if (compilerOptionsGetIsolatedModules(this.compilerOptions)) {
      throw new Error("const enums are not inlined under isolated modules");
    }
    this.currentSourceFile = undefined;
    this.emitResolver = opts.emitResolver;
    this.initTransformer((node) => this.visit(node), opts.context);
  }

  visit(node: AstNode): AstNode {
    switch (node.kind) {
      case Kind.PropertyAccessExpression:
      case Kind.ElementAccessExpression: {
        const parse = this.emitContext().parseNode(node);
        if (parse === undefined) return this.visitor().visitEachChild(node);
        const value = this.emitResolver.getConstantValue(parse);
        if (value !== undefined) {
          const replacement = this.makeReplacement(value);
          if (replacement === undefined) return this.visitor().visitEachChild(node);

          if (isFalseOrUnknown(compilerOptionsRemoveComments(this.compilerOptions))) {
            const original = this.emitContext().mostOriginal(node);
            if (original !== undefined && !nodeIsSynthesized(original)) {
              const originalText = getTextOfNode(original);
              const escapedText = safeMultiLineComment(originalText);
              this.emitContext().addSyntheticTrailingComment(
                replacement,
                Kind.MultiLineCommentTrivia,
                escapedText,
                false,
              );
            }
          }
          return replacement;
        }
        return this.visitor().visitEachChild(node);
      }
    }
    return this.visitor().visitEachChild(node);
  }

  private makeReplacement(value: ConstantValue): AstNode | undefined {
    const f = this.factory();
    if (isNumberValue(value)) {
      const n = value.numeric;
      if (jsNumIsInf(n)) {
        if (jsNumAbsEq(n)) {
          return f.newIdentifier("Infinity");
        }
        return f.newPrefixUnaryExpression(Kind.MinusToken, f.newIdentifier("Infinity"));
      }
      if (jsNumIsNaN(n)) {
        return f.newIdentifier("NaN");
      }
      if (jsNumAbsEq(n)) {
        return f.newNumericLiteral(jsNumToString(n), TokenFlags.None);
      }
      return f.newPrefixUnaryExpression(
        Kind.MinusToken,
        f.newNumericLiteral(jsNumToString(jsNumAbs(n)), TokenFlags.None),
      );
    }
    if (isStringValue(value)) {
      return f.newStringLiteral(value.string, TokenFlags.None);
    }
    if (isBigIntValue(value)) {
      const v = value.bigint;
      if (v.base10Value === "" || (v.base10Value === "0" && !v.negative)) {
        return f.newBigIntLiteral("0", TokenFlags.None);
      }
      if (!v.negative) {
        return f.newBigIntLiteral(v.base10Value, TokenFlags.None);
      }
      return f.newPrefixUnaryExpression(Kind.MinusToken, f.newBigIntLiteral(v.base10Value, TokenFlags.None));
    }
    return undefined;
  }
}

export function newConstEnumInliningTransformer(opts: TransformOptions): Transformer {
  return new ConstEnumInliningTransformer(opts);
}

// ---------------------------------------------------------------------------
// safeMultiLineComment
// ---------------------------------------------------------------------------

export function safeMultiLineComment(text: string): string {
  let t = text;
  let out = " ";
  for (;;) {
    const i = t.indexOf("*/");
    if (i < 0) break;
    out += t.slice(0, i);
    out += "*_/";
    t = t.slice(i + 2);
  }
  out += t;
  out += " ";
  return out;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

type ConstantValue =
  | { kind: "number"; numeric: JsNumber }
  | { kind: "string"; string: string }
  | { kind: "bigint"; bigint: PseudoBigInt };

interface JsNumber {
  readonly _js: unknown;
}

interface PseudoBigInt {
  readonly negative: boolean;
  readonly base10Value: string;
}

interface CompilerOptions {
  readonly _opts: unknown;
}

interface EmitResolver {
  getConstantValue(node: AstNode): ConstantValue | undefined;
}

declare const Kind: {
  PropertyAccessExpression: number; ElementAccessExpression: number;
  MinusToken: number; MultiLineCommentTrivia: number;
};
declare const TokenFlags: { None: number };

declare function compilerOptionsGetIsolatedModules(options: CompilerOptions): boolean;
declare function compilerOptionsRemoveComments(options: CompilerOptions): Tristate;
declare function isFalseOrUnknown(t: Tristate): boolean;
declare function nodeIsSynthesized(node: AstNode): boolean;
declare function getTextOfNode(node: AstNode): string;
declare function isNumberValue(v: ConstantValue): v is { kind: "number"; numeric: JsNumber };
declare function isStringValue(v: ConstantValue): v is { kind: "string"; string: string };
declare function isBigIntValue(v: ConstantValue): v is { kind: "bigint"; bigint: PseudoBigInt };
declare function jsNumIsInf(n: JsNumber): boolean;
declare function jsNumIsNaN(n: JsNumber): boolean;
declare function jsNumAbsEq(n: JsNumber): boolean;
declare function jsNumAbs(n: JsNumber): JsNumber;
declare function jsNumToString(n: JsNumber): string;

type Tristate = -1 | 0 | 1 | undefined;
