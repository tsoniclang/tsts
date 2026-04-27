import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkProgram, checkSourceFile } from "../../src/checker/index.js";
import { parseSourceFile } from "../../src/parser/index.js";
import { createProgram, type CompilerHost } from "../../src/program/index.js";

describe("checker groundwork", () => {
  it("accepts numeric toFixed calls that flow into string returns", () => {
    const sourceFile = parseSourceFile("function f(x: number): string { return x.toFixed(2); }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports invalid property access on primitive receivers", () => {
    const sourceFile = parseSourceFile("function f(x: string): string { return x.toFixed(); }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Property 'toFixed' does not exist on type 'string'."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2339]);
  });

  it("reports return type assignability failures", () => {
    const sourceFile = parseSourceFile("function f(): number { return \"not a number\"; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
  });

  it("instantiates generic function return types from explicit type arguments", () => {
    const sourceFile = parseSourceFile("function first<T>(items: T[]): T { return items[0]; } const n: number = first<string>([\"x\"]);");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
  });

  it("infers generic function return types from array arguments", () => {
    const sourceFile = parseSourceFile("function first<T>(items: T[]): T { return items[0]; } const s: string = first([\"x\"]);");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("accepts core array member access and method calls on typed arrays", () => {
    const sourceFile = parseSourceFile("function f(items: string[]): number { items.forEach(item => item.toLowerCase()); return items.map(item => item).length; }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("treats empty any arrays and core mutating array methods as standard Array surface", () => {
    const sourceFile = parseSourceFile("function f(): string[] { const items: string[] = []; items.push(\"x\"); return items.reduce((result, item) => result.concat(item), []); }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports parameter property modifiers outside constructor implementations", () => {
    const sourceFile = parseSourceFile("const f = (public value: string) => value;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["A parameter property is only allowed in a constructor implementation."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2369]);
  });

  it("checks every source file in a program", () => {
    const host: CompilerHost = {
      readFile: fileName => fileName === "src/index.ts" ? "export function f(): number { return \"x\"; }" : undefined,
    };
    const program = createProgram(["src/index.ts"], {}, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks method and constructor bodies inside classes", () => {
    const sourceFile = parseSourceFile("class Box { getValue(): number { return \"x\"; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("reports class overload declarations without immediately following implementations", () => {
    const sourceFile = parseSourceFile("class C { foo(); constructor(); }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Constructor implementation is missing.",
      "Function implementation is missing or not immediately following the declaration.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2390, 2391]);
  });

  it("reports class overload implementations with mismatched names", () => {
    const sourceFile = parseSourceFile("class C { \"foo\"(); \"bar\"() { } 0(); 1() { } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Function implementation name must be '\"foo\"'.",
      "Function implementation name must be '0'.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2389, 2389]);
  });

  it("reports primitive type keywords used as class names", () => {
    const sourceFile = parseSourceFile("class any { }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Class name cannot be 'any'."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2414]);
  });

  it("reports const modifiers on class members", () => {
    const sourceFile = parseSourceFile("class AtomicNumbers { static const H = 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["A class member cannot have the 'const' keyword."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1248]);
  });

  it("reports function overload declarations without matching implementations", () => {
    const sourceFile = parseSourceFile("function foo(); function bar() { } function baz();");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Function implementation name must be 'foo'.",
      "Function implementation is missing or not immediately following the declaration.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2389, 2391]);
  });

  it("reports export-equals conflicts with exported declarations", () => {
    const sourceFile = parseSourceFile("export class C { } export = B;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot find name 'B'.",
      "An export assignment cannot be used in a module with other exported elements.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304, 2309]);
  });

  it("reports accessor signature and ambient-body diagnostics generically", () => {
    const sourceFile = parseSourceFile([
      "class C {",
      "  get value(arg: string): number { return 1; }",
      "  set value(public next = \"x\"): number { }",
      "  set rest(...values) { }",
      "}",
      "declare class Ambient { get value() { return 1; } }",
      "type Shape = { set value(next) { } };",
      "const obj = { get broken() };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1054, 2369, 1052, 1095, 1053, 1183, 1183, 1005]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A 'get' accessor cannot have parameters.",
      "A parameter property is only allowed in a constructor implementation.",
      "A 'set' accessor parameter cannot have an initializer.",
      "A 'set' accessor cannot have a return type annotation.",
      "A 'set' accessor cannot have rest parameter.",
      "An implementation cannot be declared in ambient contexts.",
      "An implementation cannot be declared in ambient contexts.",
      "'{' expected.",
    ]);
  });

  it("tracks abstract constructors and abstract class members generically", () => {
    const sourceFile = parseSourceFile([
      "abstract class Base { abstract value: string; abstract get current(): string; abstract method(): void; }",
      "class Bad { abstract value: string; abstract method(): void; }",
      "abstract class WithBody { abstract get current() { return \"x\"; } abstract method() { } abstract value = \"x\"; }",
      "new Base();",
      "type Ctor = typeof Base;",
      "declare const ctor: Ctor;",
      "new ctor();",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1253, 1244, 1318, 1245, 1267, 2511, 2511]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Abstract properties can only appear within an abstract class.",
      "Abstract methods can only appear within an abstract class.",
      "An abstract accessor cannot have an implementation.",
      "Method 'method' cannot have an implementation because it is marked abstract.",
      "Property 'value' cannot have an initializer because it is marked abstract.",
      "Cannot create an instance of an abstract class.",
      "Cannot create an instance of an abstract class.",
    ]);
  });

  it("reports invalid interface names and parameter properties in type signatures", () => {
    const sourceFile = parseSourceFile("interface string { new (public x); } function f(value: (private x) => void): () => number { }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Interface name cannot be 'string'.",
      "A parameter property is only allowed in a constructor implementation.",
      "A parameter property is only allowed in a constructor implementation.",
      "A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2427, 2369, 2369, 2355]);
  });

  it("reports unresolved type references while honoring declared and imported types", () => {
    const sourceFile = parseSourceFile([
      "import { External } from \"./external\";",
      "interface Local { value: string; }",
      "type Alias = Local;",
      "function f(arg: External): Alias { }",
      "function g(arg: Missing): Missing { }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304, 2304]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot find name 'Missing'.",
      "Cannot find name 'Missing'.",
    ]);
  });

  it("checks declared arrow function return types", () => {
    const sourceFile = parseSourceFile("const f = (x: string): number => x;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks loop initializer declarations and loop bodies", () => {
    const sourceFile = parseSourceFile("function f(): number { for (const item: string of items) { return item; } return 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks conditional branches after assertion expressions", () => {
    const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? \"x\" as string : 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'unknown' is not assignable to type 'number'."]);
  });

  it("makes destructured binding names available to checked bodies", () => {
    const sourceFile = parseSourceFile("function f({ value }: string): string { return value; }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });
});
