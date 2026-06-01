import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ScriptTarget } from "../core/compilerOptions.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import {
  RegularExpressionFlags,
  scanRegularExpressionBody,
  scanRegExpFlags,
  type RegularExpressionDiagnostic,
} from "./regexp.js";

export class RegularExpressionParserTests {
  validates_named_capture_references(): void {
    const result = scanRegularExpressionBody("/(?<word>a)\\k<word>/u", 1, { languageVersion: ScriptTarget.ES2024 });

    Assert.Equal(0, result.diagnostics.length);
    Assert.Equal(19, result.bodyEnd);
  }

  reports_unknown_named_capture_reference(): void {
    const result = scanRegularExpressionBody("/(?<word>a)\\k<missing>/u", 1, { languageVersion: ScriptTarget.ES2024 });

    Assert.Equal(1, result.diagnostics.length);
    Assert.Equal(Diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression.code, result.diagnostics[0]!.message.code);
    Assert.Equal("missing", result.diagnostics[0]!.args[0]);
  }

  reports_duplicate_and_conflicting_flags(): void {
    const diagnostics: RegularExpressionDiagnostic[] = [];
    const result = scanRegExpFlags("uuv", 0, {
      reportDiagnostic: diagnostic => diagnostics.push(diagnostic),
    });

    Assert.Equal(RegularExpressionFlags.Unicode, result.flags);
    Assert.Equal(2, diagnostics.length);
    Assert.Equal(Diagnostics.Duplicate_regular_expression_flag.code, diagnostics[0]!.message.code);
    Assert.Equal(Diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously.code, diagnostics[1]!.message.code);
  }

  reports_out_of_order_character_class_range(): void {
    const result = scanRegularExpressionBody("/[z-a]/", 1, { languageVersion: ScriptTarget.ES2024 });

    Assert.Equal(1, result.diagnostics.length);
    Assert.Equal(Diagnostics.Range_out_of_order_in_character_class.code, result.diagnostics[0]!.message.code);
  }
}

A<RegularExpressionParserTests>().method((t) => t.validates_named_capture_references).add(FactAttribute);
A<RegularExpressionParserTests>().method((t) => t.reports_unknown_named_capture_reference).add(FactAttribute);
A<RegularExpressionParserTests>().method((t) => t.reports_duplicate_and_conflicting_flags).add(FactAttribute);
A<RegularExpressionParserTests>().method((t) => t.reports_out_of_order_character_class_range).add(FactAttribute);
