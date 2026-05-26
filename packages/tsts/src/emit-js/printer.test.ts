import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { printSourceFile } from "./index.js";
import { parseSourceFile } from "../parser/index.js";

export class JsEmitterGroundworkTests {
  prints_parsed_expression_statements_as_javascript(): void {
    Assert.Equal("x + 1;", printSourceFile(parseSourceFile("x + 1;")));
  }

  preserves_parser_precedence_through_ast_shape(): void {
    Assert.Equal("a + b * 2;", printSourceFile(parseSourceFile("a + b * 2;")));
  }

  prints_string_literals_from_ast_text(): void {
    Assert.Equal("\"hello\";", printSourceFile(parseSourceFile("'hello';")));
    Assert.Equal("\"line\\nnext\";", printSourceFile(parseSourceFile("\"line\\nnext\";")));
  }

  erases_type_annotations_from_variable_declarations(): void {
    Assert.Equal("export const answer = 42;", printSourceFile(parseSourceFile("export const answer: number = 42;")));
  }

  erases_function_parameter_and_return_types(): void {
    Assert.Equal(
      ["export function add(a, b) {", "  return a + b;", "}"].join("\n"),
      printSourceFile(parseSourceFile("export function add(a: number, b?: number): number { return a + b; }")),
    );
  }

  prints_import_and_export_declarations(): void {
    Assert.Equal(
      ["import value, { dep as renamed } from \"./dep\";", "export { renamed as value };"].join("\n"),
      printSourceFile(parseSourceFile("import value, { dep as renamed } from \"./dep\"; export { renamed as value };")),
    );
  }

  erases_type_only_imports_and_type_only_named_specifiers(): void {
    Assert.Equal(
      "import { Kind } from \"./ast.js\";",
      printSourceFile(parseSourceFile("import type { Node } from \"./types.js\"; import { Kind, type SourceFile } from \"./ast.js\";")),
    );
  }

  prints_numeric_enums_with_runtime_forward_and_reverse_mappings(): void {
    Assert.Equal(
      [
        "export var Flags;",
        "(function (Flags) { Flags[Flags[\"None\"] = 0] = \"None\"; Flags[Flags[\"A\"] = 1 << 0] = \"A\"; Flags[Flags[\"B\"] = Flags.A << 1] = \"B\"; })(Flags || (Flags = {}));",
      ].join("\n"),
      printSourceFile(parseSourceFile("export enum Flags { None = 0, A = 1 << 0, B = A << 1 }")),
    );
  }

  prints_property_access_and_call_expressions(): void {
    Assert.Equal("answer.toFixed(2);", printSourceFile(parseSourceFile("answer.toFixed(2);")));
    Assert.Equal("answer?.toFixed?.(2);", printSourceFile(parseSourceFile("answer?.toFixed?.(2);")));
  }

  erases_type_only_declarations_and_emits_class_declarations(): void {
    Assert.Equal(
      [
        "export class BoxImpl extends Base {",
        "  value = \"x\";",
        "  constructor(value) {",
        "    this.value = value;",
        "  }",
        "  getValue() {",
        "    return this.value;",
        "  }",
        "}",
      ].join("\n"),
      printSourceFile(parseSourceFile("export type Box<T> = { value: T }; interface Named { value: string; } export class BoxImpl extends Base implements Named { value: string = \"x\"; constructor(value: string) { this.value = value; } getValue(): string { return this.value; } }")),
    );
  }

  prints_if_statements_and_object_and_array_literals(): void {
    Assert.Equal(
      [
        "if (ready) {",
        "  const value = { name: \"ok\", items: [1, 2] };",
        "} else {",
        "  const value = null;",
        "}",
      ].join("\n"),
      printSourceFile(parseSourceFile("if (ready) { const value = { name: \"ok\", items: [1, 2] }; } else { const value = null; }")),
    );
  }

  erases_arrow_function_parameter_and_return_types(): void {
    Assert.Equal(
      ["const add = (a, b) => a + b;", "const wrap = x => ({ value: x });"].join("\n"),
      printSourceFile(parseSourceFile("const add = (a: number, b: number): number => a + b; const wrap = x => ({ value: x });")),
    );
  }

  prints_loop_statements_with_type_erased_initializers(): void {
    Assert.Equal(
      [
        "for (let index = 0; index < 2; index += 1) {",
        "  continue;",
        "}",
        "for (const item of items) {",
        "  item;",
        "}",
        "while (ready) {",
        "  break;",
        "}",
      ].join("\n"),
      printSourceFile(parseSourceFile("for (let index: number = 0; index < 2; index += 1) { continue; } for (const item of items) { item; } while (ready) { break; }")),
    );
  }

  prints_access_unary_new_spread_and_erased_assertion_expressions(): void {
    Assert.Equal(
      [
        "const value = enabled ? new Box(items[index++], ...rest).value : -1;",
        "const ok = !failed;",
      ].join("\n"),
      printSourceFile(parseSourceFile("const value = enabled ? new Box(items[index++], ...rest).value as number : -1; const ok = !failed;")),
    );
  }

  prints_destructuring_binding_patterns_with_type_erasure(): void {
    Assert.Equal(
      [
        "const { id, name: label = \"x\", ...rest } = item;",
        "function f([first, second]) {",
        "  return first;",
        "}",
      ].join("\n"),
      printSourceFile(parseSourceFile("const { id, name: label = \"x\", ...rest }: Shape = item; function f([first, second]: string[]) { return first; }")),
    );
  }

  prints_private_fields_templates_try_catch_switch_and_throw_statements(): void {
    Assert.Equal(
      [
        "class Box {",
        "  #value = `hi ${name}`;",
        "  get value() {",
        "    return this.#value;",
        "  }",
        "}",
        "try {",
        "  throw new Error(/x/.source);",
        "} catch (error) {",
        "  switch (error) {",
        "    default:",
        "      break;",
        "  }",
        "}",
      ].join("\n"),
      printSourceFile(parseSourceFile("class Box { #value = `hi ${name}`; get value() { return this.#value!; } } try { throw new Error(/x/.source); } catch (error) { switch (error) { default: break; } }")),
    );
  }
}

A<JsEmitterGroundworkTests>().method((t) => t.prints_parsed_expression_statements_as_javascript).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.preserves_parser_precedence_through_ast_shape).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_string_literals_from_ast_text).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.erases_type_annotations_from_variable_declarations).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.erases_function_parameter_and_return_types).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_import_and_export_declarations).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.erases_type_only_imports_and_type_only_named_specifiers).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_numeric_enums_with_runtime_forward_and_reverse_mappings).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_property_access_and_call_expressions).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.erases_type_only_declarations_and_emits_class_declarations).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_if_statements_and_object_and_array_literals).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.erases_arrow_function_parameter_and_return_types).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_loop_statements_with_type_erased_initializers).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_access_unary_new_spread_and_erased_assertion_expressions).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_destructuring_binding_patterns_with_type_erasure).add(FactAttribute);
A<JsEmitterGroundworkTests>().method((t) => t.prints_private_fields_templates_try_catch_switch_and_throw_statements).add(FactAttribute);
