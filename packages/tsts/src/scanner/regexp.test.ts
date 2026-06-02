import test from "node:test";
import assert from "node:assert/strict";

import { ScriptTarget } from "../core/compilerOptions.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import {
  RegularExpressionFlags,
  scanRegularExpressionBody,
  scanRegExpFlags,
  type RegularExpressionDiagnostic,
} from "./regexp.js";

test("validates named capture references", () => {
  const result = scanRegularExpressionBody("/(?<word>a)\\k<word>/u", 1, { languageVersion: ScriptTarget.ES2024 });

  assert.strictEqual(result.diagnostics.length, 0);
  assert.strictEqual(result.bodyEnd, 19);
});

test("reports unknown named capture reference", () => {
  const result = scanRegularExpressionBody("/(?<word>a)\\k<missing>/u", 1, { languageVersion: ScriptTarget.ES2024 });

  assert.strictEqual(result.diagnostics.length, 1);
  assert.strictEqual(result.diagnostics[0]!.message.code, Diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression.code);
  assert.strictEqual(result.diagnostics[0]!.args[0], "missing");
});

test("reports duplicate and conflicting flags", () => {
  const diagnostics: RegularExpressionDiagnostic[] = [];
  const result = scanRegExpFlags("uuv", 0, {
    reportDiagnostic: (diagnostic: RegularExpressionDiagnostic) => diagnostics.push(diagnostic),
  });

  assert.strictEqual(result.flags, RegularExpressionFlags.Unicode);
  assert.strictEqual(diagnostics.length, 2);
  assert.strictEqual(diagnostics[0]!.message.code, Diagnostics.Duplicate_regular_expression_flag.code);
  assert.strictEqual(diagnostics[1]!.message.code, Diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously.code);
});

test("reports out of order character class range", () => {
  const result = scanRegularExpressionBody("/[z-a]/", 1, { languageVersion: ScriptTarget.ES2024 });

  assert.strictEqual(result.diagnostics.length, 1);
  assert.strictEqual(result.diagnostics[0]!.message.code, Diagnostics.Range_out_of_order_in_character_class.code);
});
