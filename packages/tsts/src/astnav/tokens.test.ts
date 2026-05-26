import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getTokenAtPositionPublic, getTouchingPropertyName } from "./tokens.js";

// Most of TS-Go `internal/astnav/tokens_test.go` is baseline-driven:
// it parses a real TypeScript file from the submodule (mapCode.ts), runs
// both the Go and the JS implementations at every position, and diffs
// the results against a checked-in baseline. That requires:
//   - TS-Go's testutil/baseline infra (forthcoming)
//   - testutil/jstest (Node spawn-based comparison)
//   - The TypeScript submodule initialized
//
// This file ports the small, inline test scenarios from
// tokens_test.go — the JSDoc-type-assertion regression cases and
// pointer-equality check. Baseline-driven tests land alongside the
// baseline/jstest port.

// Forward declarations: TSTS parser API. The actual entry point in
// TSTS's parser/index.ts is `parseSourceFile`; the upstream `SourceFileParseOptions`
// type lives there.
declare function parseSourceFile(input: string, opts: { readonly fileName: string }): {
  readonly fileName: string;
};

declare const KindIdentifier: number;
declare const KindParenthesizedExpression: number;

export class GetTokenAtPositionTests {
  jsdoc_type_assertion_does_not_panic(): void {
    const fileText = "function foo(x) {\n    const s = /**@type {string}*/(x)\n}";
    const file = parseSourceFile(fileText, { fileName: "/test.js" });
    const position = 52;
    const token = getTouchingPropertyName(file as unknown as Parameters<typeof getTouchingPropertyName>[0], position);
    Assert.NotNull(token);
    // The function may return either the identifier itself or the
    // containing parenthesized expression, depending on AST shape.
    Assert.True(token!.kind === KindIdentifier || token!.kind === KindParenthesizedExpression);
  }

  jsdoc_type_assertion_with_comment_does_not_panic(): void {
    const fileText = "function foo(x) {\n    const s = /**@type {string}*/(x)  // Go-to-definition on x causes panic\n}";
    const file = parseSourceFile(fileText, { fileName: "/test.js" });
    const xPos = 52;
    const token = getTouchingPropertyName(file as unknown as Parameters<typeof getTouchingPropertyName>[0], xPos);
    Assert.NotNull(token);
  }

  pointer_equality_for_same_position(): void {
    const fileText = "\n\t\t\tfunction foo() {\n\t\t\t\treturn 0;\n\t\t\t}\n\t\t";
    const file = parseSourceFile(fileText, { fileName: "/file.ts" });
    const first = getTokenAtPositionPublic(file as unknown as Parameters<typeof getTokenAtPositionPublic>[0], 0);
    const second = getTokenAtPositionPublic(file as unknown as Parameters<typeof getTokenAtPositionPublic>[0], 0);
    Assert.Equal(first, second);
  }
}

A<GetTokenAtPositionTests>().method((t) => t.jsdoc_type_assertion_does_not_panic).add(FactAttribute);
A<GetTokenAtPositionTests>().method((t) => t.jsdoc_type_assertion_with_comment_does_not_panic).add(FactAttribute);
A<GetTokenAtPositionTests>().method((t) => t.pointer_equality_for_same_position).add(FactAttribute);
