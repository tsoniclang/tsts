import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { checkProgram, checkSourceFile, newChecker } from "./index.js";
import { parseSourceFile } from "../parser/index.js";
import { createProgram, type CompilerHost } from "../program/index.js";

export class CheckerGroundworkTests {
  accepts_numeric_to_fixed_calls_that_flow_into_string_returns(): void {
    const sourceFile = parseSourceFile("function f(x: number): string { return x.toFixed(2); }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }

  reports_invalid_property_access_on_primitive_receivers(): void {
    const sourceFile = parseSourceFile("function f(x: string): string { return x.toFixed(); }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Property 'toFixed' does not exist on type 'string'."], result.diagnostics.map((d) => d.message));
  }

  reports_return_type_assignability_failures(): void {
    const sourceFile = parseSourceFile("function f(): number { return \"not a number\"; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_every_source_file_in_a_program(): void {
    const host: CompilerHost = {
      readFile: (fileName) => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
    };
    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = checkProgram(program);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], diagnostics.map((d) => d.message));
  }

  checks_method_and_constructor_bodies_inside_classes(): void {
    const sourceFile = parseSourceFile("class Box { getValue(): number { return \"x\"; } }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_declared_arrow_function_return_types(): void {
    const sourceFile = parseSourceFile("const f = (x: string): number => x;");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_loop_initializer_declarations_and_loop_bodies(): void {
    const sourceFile = parseSourceFile("function f(): number { for (const item: string of items) { return item; } return 1; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checks_conditional_branches_after_assertion_expressions(): void {
    const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? \"x\" as string : 1; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'unknown' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  makes_destructured_binding_names_available_to_checked_bodies(): void {
    const sourceFile = parseSourceFile("function f({ value }: string): string { return value; }");
    const result = checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }

  checker_class_entry_reports_assignment_mismatches(): void {
    const sourceFile = parseSourceFile("const x: number = \"a\";");
    const result = newChecker().checkSourceFile(sourceFile);

    Assert.Equal<readonly string[]>(["Type 'string' is not assignable to type 'number'."], result.diagnostics.map((d) => d.message));
  }

  checker_class_entry_accepts_well_typed_assignment(): void {
    const sourceFile = parseSourceFile("const y: number = 1;");
    const result = newChecker().checkSourceFile(sourceFile);

    Assert.Equal(0, result.diagnostics.length);
  }
}

A<CheckerGroundworkTests>().method((t) => t.accepts_numeric_to_fixed_calls_that_flow_into_string_returns).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_invalid_property_access_on_primitive_receivers).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.reports_return_type_assignability_failures).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_every_source_file_in_a_program).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_method_and_constructor_bodies_inside_classes).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_declared_arrow_function_return_types).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_loop_initializer_declarations_and_loop_bodies).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checks_conditional_branches_after_assertion_expressions).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.makes_destructured_binding_names_available_to_checked_bodies).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_reports_assignment_mismatches).add(FactAttribute);
A<CheckerGroundworkTests>().method((t) => t.checker_class_entry_accepts_well_typed_assignment).add(FactAttribute);
