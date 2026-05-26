import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { parseTestCase, DiffCategorizer } from "./index.js";

export class TestRunnerDirectiveParserTests {
  parses_simple_target_directive(): void {
    const tc = parseTestCase("/tmp/foo.ts", "compiler/foo", "// @target: ES5\nconst x = 5;");
    Assert.Equal("ES5", tc.directives.target);
    Assert.Equal(1, tc.files.length);
    Assert.Equal("const x = 5;", tc.files[0]!.content.trim());
  }

  parses_multiple_directives(): void {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @target: ES2020\n// @strict: true\n// @noEmit: true\nconst x = 5;",
    );
    Assert.Equal("ES2020", tc.directives.target);
    Assert.True(tc.directives.strict ?? false);
    Assert.True(tc.directives.noEmit ?? false);
  }

  splits_files_on_filename_directive(): void {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @target: ES5\n// @Filename: globals.ts\ndeclare global { const __FOO__: any; }\n// @Filename: app.ts\nexport {};",
    );
    Assert.Equal("ES5", tc.directives.target);
    Assert.Equal(2, tc.files.length);
    Assert.Equal("globals.ts", tc.files[0]!.fileName);
    Assert.Equal("app.ts", tc.files[1]!.fileName);
    Assert.Equal("declare global { const __FOO__: any; }", tc.files[0]!.content.trim());
    Assert.Equal("export {};", tc.files[1]!.content.trim());
  }

  parses_lib_as_comma_separated_list(): void {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @lib: ES5,ES2015.Symbol,ES2017.Object\nconst x = 5;",
    );
    Assert.Equal<readonly string[]>(["ES5", "ES2015.Symbol", "ES2017.Object"], [...(tc.directives.lib ?? [])]);
  }

  records_unknown_directives(): void {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @customFlag: someValue\nconst x = 5;",
    );
    Assert.Equal("someValue", tc.directives.unknown?.get("customFlag"));
  }

  derives_default_filename_from_test_name_when_no_filename_directive(): void {
    const tc = parseTestCase("/tmp/foo.ts", "compiler/myTest", "const x = 5;");
    Assert.Equal("myTest.ts", tc.files[0]!.fileName);
  }

  respects_first_occurrence_wins_for_repeated_directives(): void {
    const tc = parseTestCase(
      "/tmp/foo.ts",
      "compiler/foo",
      "// @target: ES5\n// @target: ES2020\nconst x = 5;",
    );
    Assert.Equal("ES5", tc.directives.target);
  }
}

export class TestRunnerDiffCategorizerTests {
  treats_missing_list_files_as_empty_no_error(): void {
    const cat = new DiffCategorizer({
      acceptedListPath: "/nonexistent/accepted.txt",
      triagedListPath: "/nonexistent/triaged.txt",
    });
    Assert.Equal(0, cat.acceptedCount());
    Assert.Equal(0, cat.triagedCount());
    Assert.Equal("new", cat.categorize("compiler/foo.types.diff"));
  }
}

A<TestRunnerDirectiveParserTests>().method((t) => t.parses_simple_target_directive).add(FactAttribute);
A<TestRunnerDirectiveParserTests>().method((t) => t.parses_multiple_directives).add(FactAttribute);
A<TestRunnerDirectiveParserTests>().method((t) => t.splits_files_on_filename_directive).add(FactAttribute);
A<TestRunnerDirectiveParserTests>().method((t) => t.parses_lib_as_comma_separated_list).add(FactAttribute);
A<TestRunnerDirectiveParserTests>().method((t) => t.records_unknown_directives).add(FactAttribute);
A<TestRunnerDirectiveParserTests>().method((t) => t.derives_default_filename_from_test_name_when_no_filename_directive).add(FactAttribute);
A<TestRunnerDirectiveParserTests>().method((t) => t.respects_first_occurrence_wins_for_repeated_directives).add(FactAttribute);
A<TestRunnerDiffCategorizerTests>().method((t) => t.treats_missing_list_files_as_empty_no_error).add(FactAttribute);
