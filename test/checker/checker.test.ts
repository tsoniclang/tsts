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

  it("treats any-bearing intersections as any for property access", () => {
    const sourceFile = parseSourceFile("function f(value: any & any) { return value.anchorRef; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("checks JSX tag names, intrinsic fallback, and embedded expressions", () => {
    const sourceFile = parseSourceFile("const x = 1; const view = <div>{missing}<Component /></div>;", { fileName: "view.tsx" });
    const result = checkSourceFile(sourceFile, { jsx: "preserve", noImplicitAny: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.",
      "Cannot find name 'missing'.",
      "Cannot find name 'Component'.",
      "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [7026, 2304, 2304, 7026]);
  });

  it("contextually types JSX attributes from function component props", () => {
    const sourceFile = parseSourceFile([
      "namespace JSX { export interface Element {} }",
      "type Yes = { disc: true; cb: (value: string) => void; };",
      "type No = { disc?: false; cb: (value: number) => void; };",
      "declare function Comp(props: Yes | No): JSX.Element;",
      "void (<Comp disc cb={value => parseInt(value)} />);",
      "void (<Comp disc={false} cb={value => value.toFixed()} />);",
      "void (<Comp disc={undefined} cb={value => value.toFixed()} />);",
      "void (<Comp cb={value => value.toFixed()} />);",
    ].join("\n"), { fileName: "view.tsx" });
    const result = checkSourceFile(sourceFile, { jsx: "preserve", noImplicitAny: true, strictNullChecks: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("reports missing JSX runtime dependencies by emit mode", () => {
    const sourceFile = parseSourceFile("const view = <div />;", { fileName: "view.tsx" });

    assert.deepEqual(checkSourceFile(sourceFile, { jsx: "react", noImplicitAny: true }).diagnostics.map(diagnostic => diagnostic.message), [
      "This JSX tag requires 'React' to be in scope, but it could not be found.",
      "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.",
    ]);
    assert.deepEqual(checkSourceFile(sourceFile, { jsx: "react-jsx", noImplicitAny: true }).diagnostics.map(diagnostic => diagnostic.message), [
      "This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found. Make sure you have types for the appropriate package installed.",
      "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.",
    ]);
  });

  it("reports classic JSX fragment factory requirements", () => {
    const sourceFile = parseSourceFile("const view = <></>;", { fileName: "view.tsx" });

    assert.deepEqual(checkSourceFile(sourceFile, { jsx: "react", jsxFactory: "h" }).diagnostics.map(diagnostic => diagnostic.message), [
      "This JSX tag requires 'h' to be in scope, but it could not be found.",
      "The 'jsxFragmentFactory' compiler option must be provided to use JSX fragments with the 'jsxFactory' compiler option.",
    ]);
    assert.deepEqual(checkSourceFile(sourceFile, { jsx: "react" }).diagnostics.map(diagnostic => diagnostic.message), [
      "This JSX tag requires 'React' to be in scope, but it could not be found.",
      "Using JSX fragments requires fragment factory 'React' to be in scope, but it could not be found.",
    ]);
  });

  it("reports missing JSX mode without cascading JSX semantic diagnostics", () => {
    const sourceFile = parseSourceFile("const view = <div>{missing}<Component /></div>;", { fileName: "view.tsx" });
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot use JSX unless the '--jsx' flag is provided.",
      "Cannot use JSX unless the '--jsx' flag is provided.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [17004, 17004]);
  });

  it("reports missing this-property access with deterministic class-member suggestions", () => {
    const sourceFile = parseSourceFile("class B { methodB() { this.methodA; this.methodB; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Property 'methodA' does not exist on type 'B'. Did you mean 'methodB'?"]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2551]);
  });

  it("reports missing property assignment targets and lexical arrow this reads", () => {
    const sourceFile = parseSourceFile("class A { m() { this.foo = 1; const f = () => this.foo; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'foo' does not exist on type 'A'.",
      "Property 'foo' does not exist on type 'A'.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2339, 2339]);
  });

  it("uses TS-Go spelling distance thresholds for property suggestions", () => {
    const sourceFile = parseSourceFile("class A { baz() {} methodB() {} m() { this.bar; this.methodA; this.methodB; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'bar' does not exist on type 'A'.",
      "Property 'methodA' does not exist on type 'A'. Did you mean 'methodB'?",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2339, 2551]);
  });

  it("keeps the closest spelling suggestion before lexical tie-breaking", () => {
    const sourceFile = parseSourceFile("class A { MethodA() {} AethodA() {} m() { this.methodA; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'methodA' does not exist on type 'A'. Did you mean 'MethodA'?",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2551]);
  });

  it("treats constructor parameter properties as initialized instance members", () => {
    const sourceFile = parseSourceFile("class Point { constructor(public x: number, readonly y: number) {} toString() { return this.x.toFixed() + this.y.toFixed(); } }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
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

  it("validates explicit variance annotations against the declared generic surface", () => {
    const sourceFile = parseSourceFile([
      "interface Controller<out T> {",
      "  createAnimal: () => T;",
      "  run: (animal: T) => void;",
      "}",
      "interface Animal { run(): void; }",
      "class Dog implements Animal { run() {}; bark() {}; }",
      "interface AnimalContainer<T> { controller: Controller<T>; }",
      "declare let ca: AnimalContainer<Animal>;",
      "declare let cd: AnimalContainer<Dog>;",
      "ca = cd;",
      "cd = ca;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2636, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'Controller<sub-T>' is not assignable to type 'Controller<super-T>' as implied by variance annotation.",
      "Type 'AnimalContainer<Animal>' is not assignable to type 'AnimalContainer<Dog>'.",
    ]);
  });

  it("restricts type-alias variance annotations to object-like alias declarations", () => {
    const sourceFile = parseSourceFile([
      "type Identity<out T> = T;",
      "type Box<out T> = { value: T };",
      "type Consumer<out T> = (value: T) => void;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2637, 2636]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Variance annotations are only supported in type aliases for object, function, constructor, and mapped types.",
      "Type 'Consumer<sub-T>' is not assignable to type 'Consumer<super-T>' as implied by variance annotation.",
    ]);
  });

  it("reports in and out modifiers outside class interface and type-alias type parameters", () => {
    const sourceFile = parseSourceFile([
      "declare function f<in T>(value: T): void;",
      "type Repeated<in out in T> = { value: T };",
      "type Ordered<out in T> = { value: T };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1274, 1030, 1029]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'in' modifier can only appear on a type parameter of a class, interface or type alias",
      "'in' modifier already seen.",
      "'in' modifier must precede 'out' modifier.",
    ]);
  });

  it("reports unused type parameters that shadow their generic owner name", () => {
    const sourceFile = parseSourceFile("type T<T> = {};");
    const result = checkSourceFile(sourceFile, { noUnusedParameters: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [6133]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["'T' is declared but its value is never read."]);
  });

  it("terminates recursive callback signature comparison through aliases", () => {
    const sourceFile = parseSourceFile([
      "interface Foo<T> { (bar: Bar<T>): void };",
      "type Bar<T> = (foo: Foo<T>) => Foo<T>;",
      "declare function foo<T>(bar: Bar<T>): void;",
      "declare var bar: Bar<{}>;",
      "bar = foo;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type '<T>(bar: Bar<T>) => void' is not assignable to type 'Bar<{}>'."]);
  });

  it("does not select overloads through invalid contextual array element diagnostics", () => {
    const sourceFile = parseSourceFile([
      "function foo(bar: { a: number }[]): string;",
      "function foo(bar: { a: boolean }[]): number;",
      "function foo(bar: { a: any }[]): any { return bar; }",
      "const value: number = foo([{ a: true }]);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015" });

    assert.deepEqual(result.diagnostics, []);
  });

  it("suppresses duplicate outer diagnostics for contextually typed array elements", () => {
    const sourceFile = parseSourceFile([
      "interface Foo { bar: Bar | Bar[]; }",
      "interface Bar { prop: string; }",
      "let value: Foo[] = [{ bar: { prop: 100 } }];",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'number' is not assignable to type 'string'."]);
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

  it("resolves standard array members through union receivers", () => {
    const sourceFile = parseSourceFile("function f(items: string[] | number[]): void { items.splice(1, 1); items.toLocaleString(); }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("recognizes ES array and typed-array library surfaces generically", () => {
    const sourceFile = parseSourceFile([
      "function f(items: number[]): void {",
      "  items.flat();",
      "  items.flatMap(value => [value]);",
      "  items.values();",
      "  items.toLocaleString(\"en-US\");",
      "}",
      "new Int8Array(3).toLocaleString();",
      "new Uint8Array(3).toLocaleString();",
      "new Float64Array(3).toLocaleString();",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("binds destructuring elements from contextual object and array types", () => {
    const sourceFile = parseSourceFile([
      "interface Box { value: string; }",
      "const fromObject = ({ value }: Box): string => value;",
      "const fromArray = ([value]: string[]): string => value;",
      "const fromContextual: (arg: { value: string }) => string = ({ value }) => value;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports parameter property modifiers outside constructor implementations", () => {
    const sourceFile = parseSourceFile("const f = (public value: string) => value;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["A parameter property is only allowed in a constructor implementation."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2369]);
  });

  it("reports parameter modifier grammar before parameter property checks", () => {
    const sourceFile = parseSourceFile([
      "class StaticOnly { constructor(static value: number) {} }",
      "class PublicStatic { constructor(public static value: number) {} }",
      "class DuplicatePublic { constructor(public public value: number) {} }",
      "class MixedAccessibility { constructor(private public value: number) {} }",
      "class ExportedParameter { constructor(export value: number) {} }",
      "class DeclaredParameter { constructor(declare value: number) {} }",
      "function f(async value: number) {}",
      "class BindingPattern { constructor(public { value }: { value: string }) {} }",
      "class RestParameter { constructor(public ...values: string[]) {} }",
      "const outside = (public value: string) => value;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1090, 1090, 1028, 1028, 1090, 1090, 1090, 1187, 1317, 2369]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'static' modifier cannot appear on a parameter.",
      "'static' modifier cannot appear on a parameter.",
      "Accessibility modifier already seen.",
      "Accessibility modifier already seen.",
      "'export' modifier cannot appear on a parameter.",
      "'declare' modifier cannot appear on a parameter.",
      "'async' modifier cannot appear on a parameter.",
      "A parameter property may not be declared using a binding pattern.",
      "A parameter property cannot be declared using a rest parameter.",
      "A parameter property is only allowed in a constructor implementation.",
    ]);
  });

  it("reports computed class-field names and decorator targets through TS-Go grammar rules", () => {
    const sourceFile = parseSourceFile([
      "function x(_target: object, _key: PropertyKey) {}",
      "function foo(): string { return 'field'; }",
      "const fieldName: string = 'fieldName';",
      "class Declared {",
      "  [foo()]: any;",
      "  [fieldName]: any;",
      "  ['literal']: any;",
      "  [-1]: any;",
      "}",
      "void class Expression {",
      "  @x ['literal']: any;",
      "  @x [foo()]() {}",
      "  @x [foo()]: any;",
      "};",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { experimentalDecorators: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1166, 1206, 1206, 1206]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.",
      "Decorators are not valid here.",
      "Decorators are not valid here.",
      "Decorators are not valid here.",
    ]);
  });

  it("uses standard decorator grammar when legacy decorators are explicitly off", () => {
    const sourceFile = parseSourceFile([
      "declare const dec: any;",
      "class C {",
      "  @dec(C) method(@dec(C) value: any) {}",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { experimentalDecorators: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2449, 1206]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Class 'C' used before its declaration.",
      "Decorators are not valid here.",
    ]);
  });

  it("reports bigint property names and computed-property key types generically", () => {
    const sourceFile = parseSourceFile([
      "const bigNum: bigint = 0n;",
      "const value = { 1n: 123, [2n]: 456, [bigNum]: 789 };",
      "interface I { 3n: string; }",
      "class C { 4n = 0; }",
      "const c: C = { \"4n\": \"still empty because bigint class members are invalid\" };",
      "declare const target: number[];",
      "target[1n];",
      "const arr = [1, 2, 3] as const;",
      "const { 0n: item } = arr;",
      "interface H { \"3n\": string; }",
      "const h: H = { 3n: \"bad\" };",
      "const h2: H = { \"3n\": \"ok\" };",
      "class L { \"5n\" = 0; }",
      "const l: L = { 5n: \"bad\" };",
      "const l2: L = { \"5n\": \"badType\" };",
      "type Q = 6n | 7n | 8n;",
      "type T = { [t in Q]: string };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1539, 2464, 2464, 1539, 1539, 2538, 2538, 1539, 2741, 1539, 2741, 2322, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A 'bigint' literal cannot be used as a property name.",
      "A computed property name must be of type 'string', 'number', 'symbol', or 'any'.",
      "A computed property name must be of type 'string', 'number', 'symbol', or 'any'.",
      "A 'bigint' literal cannot be used as a property name.",
      "A 'bigint' literal cannot be used as a property name.",
      "Type 'bigint' cannot be used as an index type.",
      "Type 'bigint' cannot be used as an index type.",
      "A 'bigint' literal cannot be used as a property name.",
      "Property '\"3n\"' is missing in type '{}' but required in type 'H'.",
      "A 'bigint' literal cannot be used as a property name.",
      "Property '\"5n\"' is missing in type '{}' but required in type 'L'.",
      "Type 'string' is not assignable to type 'number'.",
      "Type 'bigint' is not assignable to type 'string | number | symbol'.",
    ]);
  });

  it("reports BigInt literals below ES2020 while preserving ambient initializer exemptions", () => {
    const sourceFile = parseSourceFile([
      "declare const ambient = 1n;",
      "const regular = 2n;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2019" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2737]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "BigInt literals are not available when targeting lower than ES2020.",
    ]);
  });

  it("keeps computed property key validation namespace-accurate", () => {
    const sourceFile = parseSourceFile([
      "declare const O: unique symbol;",
      "declare class Bar<O> { [O]: number; }",
      "declare function foo2<T extends { [P in keyof T & string as Capitalize<P>]: V }, V extends string>(a: T): T;",
      "export const r2 = foo2({A: \"a\"});",
      "function bar(props: { x?: string; y?: string }) {",
      "  const { x = \"\", y = \"\" } = props;",
      "  return { [x]: 1, [y]: 2 };",
      "}",
      "const bigintMath = 1n + (2n % 1n < 0n ? -1n : 0n);",
      "declare const ns: any;",
      "const anyBigintMath = ns / 1000n + 0n;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true, target: "es2020" });

    assert.deepEqual(result.diagnostics, []);
  });

  it("reports parameter list grammar for rest and optional ordering", () => {
    const sourceFile = parseSourceFile([
      "function restNotLast(...x: number[], y: number) {}",
      "function restOptional(...x?) {}",
      "function restInitializer(...x = []) {}",
      "function restImplicitAny(...x) { x.push(1); }",
      "function optionalAndInitializer(x?: number = 1) {}",
      "function requiredAfterOptional(x?: number, y: number) {}",
      "function requiredAfterDefault(x = 1, y: number) {}",
      "function restLast(x?: number, y = 1, ...z: number[]) {}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { noImplicitAny: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1014, 1047, 7019, 1048, 7019, 1015, 1016]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A rest parameter must be last in a parameter list.",
      "A rest parameter cannot be optional.",
      "Rest parameter 'x' implicitly has an 'any[]' type.",
      "A rest parameter cannot have an initializer.",
      "Rest parameter 'x' implicitly has an 'any[]' type.",
      "Parameter cannot have question mark and initializer.",
      "A required parameter cannot follow an optional parameter.",
    ]);
  });

  it("reports rest parameter array type requirements generically", () => {
    const sourceFile = parseSourceFile([
      "type UnionArray = number[] | string[];",
      "type MappedArray<T> = { [K in keyof T]: T[K] };",
      "interface UserArray extends Array<any> {}",
      "function nonArray(...x: number) {}",
      "function optionalTyped(...x?: string[]) {}",
      "function directArray(...x: number[]) {}",
      "function tupleArray(...x: [number, string]) {}",
      "function unionArray(...x: UnionArray) {}",
      "function constrained<Args extends unknown[]>(...x: Args) {}",
      "function mappedConstrained<Args extends [number] | [string]>(...x: MappedArray<Args>) {}",
      "function userArraySubtype(...x: UserArray) {}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2370, 1047, 2370, 2370]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A rest parameter must be of an array type.",
      "A rest parameter cannot be optional.",
      "A rest parameter must be of an array type.",
      "A rest parameter must be of an array type.",
    ]);
  });

  it("reports index signature parameter grammar generically", () => {
    const sourceFile = parseSourceFile([
      "interface I {",
      "  [optional?: string]: string;",
      "  [...rest: string[]]: string;",
      "  [left: string, right: string]: string;",
      "  [bad: Date]: string;",
      "}",
      "class C {",
      "  [...rest]: string;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1019, 1017, 1096, 1268, 1017]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "An index signature parameter cannot have a question mark.",
      "An index signature cannot have a rest parameter.",
      "An index signature must have exactly one parameter.",
      "An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.",
      "An index signature cannot have a rest parameter.",
    ]);
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

  it("reports duplicate class members with TypeScript class grouping rules", () => {
    const sourceFile = parseSourceFile([
      "const key = 'q';",
      "class C {",
      "  a;",
      "  a;",
      "  b() {}",
      "  b() {}",
      "  x;",
      "  get x() { return 1; }",
      "  set x(value) {}",
      "  get y() { return 1; }",
      "  set y(value) {}",
      "  y = 1;",
      "  z() {}",
      "  get z() { return 1; }",
      "  set z(value) {}",
      "  static s;",
      "  s;",
      "  overloaded(value: string): void;",
      "  overloaded(value: number): void;",
      "  overloaded(value: string | number) {}",
      "  get pair() { return 1; }",
      "  set pair(value) {}",
      "  [key];",
      "  q;",
      "}",
      "class D { constructor(); constructor() {} constructor() {} }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [
      2300,
      2300,
      2300,
      2300,
      2300,
      2300,
      2300,
      2300,
      2300,
      2393,
      2393,
      2392,
      2392,
      2392,
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Duplicate identifier 'a'.",
      "Duplicate identifier 'x'.",
      "Duplicate identifier 'x'.",
      "Duplicate identifier 'x'.",
      "Duplicate identifier 'y'.",
      "Duplicate identifier 'z'.",
      "Duplicate identifier 'z'.",
      "Duplicate identifier 'z'.",
      "Duplicate identifier 'q'.",
      "Duplicate function implementation.",
      "Duplicate function implementation.",
      "Multiple constructor implementations are not allowed.",
      "Multiple constructor implementations are not allowed.",
      "Multiple constructor implementations are not allowed.",
    ]);
  });

  it("reports subsequent class property type conflicts against the first property-like declaration", () => {
    const sourceFile = parseSourceFile([
      "class C {",
      "  a(): number { return 0; }",
      "  a: number;",
      "  c: number;",
      "  c: string;",
      "  get x() { return 1; }",
      "  set x(value: number) {}",
      "  x;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.filter(diagnostic => diagnostic.code === 2717).map(diagnostic => diagnostic.message), [
      "Subsequent property declarations must have the same type.  Property 'a' must be of type '() => number', but here has type 'number'.",
      "Subsequent property declarations must have the same type.  Property 'c' must be of type 'number', but here has type 'string'.",
      "Subsequent property declarations must have the same type.  Property 'x' must be of type 'number', but here has type 'any'.",
    ]);
  });

  it("reports block function modifier and implementation grammar", () => {
    const sourceFile = parseSourceFile([
      "{",
      "  declare function f() { }",
      "  export function f() { }",
      "  declare export function f() { }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1184, 1184, 1184, 2393, 2393, 2393, 1183, 1183]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Modifiers cannot appear here.",
      "Modifiers cannot appear here.",
      "Modifiers cannot appear here.",
      "Duplicate function implementation.",
      "Duplicate function implementation.",
      "Duplicate function implementation.",
      "An implementation cannot be declared in ambient contexts.",
      "An implementation cannot be declared in ambient contexts.",
    ]);
  });

  it("reports misplaced module elements from statement context", () => {
    const sourceFile = parseSourceFile([
      "{",
      "  namespace M { }",
      "  declare module \"ambient\" { }",
      "  export = M;",
      "  export * from \"ambient\";",
      "  export default M;",
      "  import I = M;",
      "  import \"ambient\";",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1235, 1234, 1231, 1233, 1258, 1232, 1232]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A namespace declaration is only allowed at the top level of a namespace or module.",
      "An ambient module declaration is only allowed at the top level in a file.",
      "An export assignment must be at the top level of a file or module declaration.",
      "An export declaration can only be used at the top level of a namespace or module.",
      "A default export must be at the top level of a file or module declaration.",
      "An import declaration can only be used at the top level of a namespace or module.",
      "An import declaration can only be used at the top level of a namespace or module.",
    ]);
  });

  it("uses JavaScript import context grammar and nested ambient module grammar", () => {
    const javascriptFile = parseSourceFile("function container() { import \"fs\"; }", { fileName: "check.js" });
    const nestedAmbientModule = parseSourceFile("namespace Outer { declare module \"nested\" { } }");

    assert.deepEqual(checkSourceFile(javascriptFile, { checkJs: true }).diagnostics.map(diagnostic => diagnostic.code), [1473]);
    assert.deepEqual(checkSourceFile(nestedAmbientModule).diagnostics.map(diagnostic => diagnostic.code), [2435]);
  });

  it("reports primitive type keywords used as class names", () => {
    const sourceFile = parseSourceFile("class any { }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Class name cannot be 'any'."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2414]);
  });

  it("reports primitive type keywords used as values", () => {
    const sourceFile = parseSourceFile("number; string; any; undefined;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'number' only refers to a type, but is being used as a value here.",
      "'string' only refers to a type, but is being used as a value here.",
      "'any' only refers to a type, but is being used as a value here.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2693, 2693, 2693]);
  });

  it("reports const modifiers on class members", () => {
    const sourceFile = parseSourceFile("class AtomicNumbers { static const H = 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["A class member cannot have the 'const' keyword."]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1248]);
  });

  it("scopes generic parameters for class methods and type-literal signatures", () => {
    const sourceFile = parseSourceFile([
      "declare class BaseClass {",
      "  static extends<A>(a: A): new () => A & BaseClass;",
      "}",
      "type Maker = {",
      "  new <T>(value: T): T;",
      "};",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports implicit any template types in mapped types", () => {
    const sourceFile = parseSourceFile("type Foo = { [P in \"bar\"] };");
    const result = checkSourceFile(sourceFile, { noImplicitAny: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [7039]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Mapped object type implicitly has an 'any' template type."]);
  });

  it("scopes generic arrow type parameters through parameters and return types", () => {
    const sourceFile = parseSourceFile("const box = { id: async <T>(value: T): Promise<T> => value, sync: <T>(value: T): T => value };");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("reports duplicate generic type parameters and merged declaration list mismatches", () => {
    const sourceFile = parseSourceFile([
      "function f<T, T>() {}",
      "class C<T, T> {",
      "  method<U, U>() {}",
      "}",
      "interface I<T, T> {",
      "  method<U, U>(): void;",
      "}",
      "const box = { fn: function <T, T>() {}, arrow: <U, U>() => undefined };",
      "interface Merge<T> { value: T; }",
      "interface Merge<U, V> { other: U; }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015", strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2300, 2300, 2300, 2300, 2300, 2300, 2300, 2428, 2428]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Duplicate identifier 'T'.",
      "Duplicate identifier 'T'.",
      "Duplicate identifier 'U'.",
      "Duplicate identifier 'T'.",
      "Duplicate identifier 'U'.",
      "Duplicate identifier 'T'.",
      "Duplicate identifier 'U'.",
      "All declarations of 'Merge' must have identical type parameters.",
      "All declarations of 'Merge' must have identical type parameters.",
    ]);
  });

  it("reports function overload declarations without matching implementations", () => {
    const sourceFile = parseSourceFile("function foo(); function bar() { } function baz();");
    const result = checkSourceFile(sourceFile, { noImplicitAny: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Function implementation name must be 'foo'.",
      "Function implementation is missing or not immediately following the declaration.",
      "'foo', which lacks return-type annotation, implicitly has an 'any' return type.",
      "'baz', which lacks return-type annotation, implicitly has an 'any' return type.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2389, 2391, 7010, 7010]);
  });

  it("resolves calls against overload signatures instead of implementation arity", () => {
    const sourceFile = parseSourceFile([
      "function pick(value: string, mode): number;",
      "function pick(value: string, flag): string;",
      "function pick(value: any): any { return value; }",
      "const bad: string = pick('x', null);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'number' is not assignable to type 'string'."]);
  });

  it("reports implementation signatures that require more arguments than overloads", () => {
    const sourceFile = parseSourceFile("function f(value: any); function f(value: any); function f(value: any, required: number) { }");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2394]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["This overload signature is not compatible with its implementation signature."]);
  });

  it("reports namespace var-function value declaration collisions without rejecting var redeclarations", () => {
    const duplicate = checkSourceFile(parseSourceFile("namespace N { var f; function f() {} }"), { strict: false });
    const redeclaration = checkSourceFile(parseSourceFile("namespace N { var x; var x; }"), { strict: false });

    assert.deepEqual(duplicate.diagnostics.map(diagnostic => diagnostic.code), [2300, 2300]);
    assert.deepEqual(duplicate.diagnostics.map(diagnostic => diagnostic.message), [
      "Duplicate identifier 'f'.",
      "Duplicate identifier 'f'.",
    ]);
    assert.equal(redeclaration.diagnostics.length, 0);
  });

  it("keeps ambient namespace variable exports callable when their interface type is declared later", () => {
    const sourceFile = parseSourceFile([
      "declare namespace ko {",
      "  export var observableArray: KnockoutObservableArrayStatic;",
      "}",
      "interface KnockoutObservableArrayStatic {",
      "  <T>(value?: T[]): T[];",
      "}",
      "const values = ko.observableArray<string>();",
      "const first: string = values[0];",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports duplicate object-literal property names through canonical constant keys", () => {
    const sourceFile = parseSourceFile([
      "const first = {",
      "  a: 1,",
      "  a: 2,",
      "  \\u0061: 3,",
      "  nested: { c: 1, \"c\": 2 },",
      "};",
      "const computed = {",
      "  1: 1,",
      "  [1]: 2,",
      "  [+1]: 3,",
      "  ['+1']: 4,",
      "  [+1]: 5,",
      "  '-1': 6,",
      "  [-1]: 7,",
      "};",
      "const accessors = {",
      "  get value() { return 1; },",
      "  set value(next: number) {},",
      "  get value() { return 2; },",
      "};",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1117, 1117, 1117, 1117, 1117, 1117, 1117, 1118, 2300, 2300, 2300]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple properties with the same name.",
      "An object literal cannot have multiple get/set accessors with the same name.",
      "Duplicate identifier 'value'.",
      "Duplicate identifier 'value'.",
      "Duplicate identifier 'value'.",
    ]);
  });

  it("reports duplicate type-member names while allowing overload and accessor pairs", () => {
    const sourceFile = parseSourceFile([
      "type T = {",
      "  a: string;",
      "  a: string;",
      "  method(value: string): void;",
      "  method(value: number): void;",
      "  get pair(): string;",
      "  set pair(value: string);",
      "  get repeated(): string;",
      "  get repeated(): string;",
      "  mixed: string;",
      "  mixed(): string;",
      "};",
      "const computed = 'a';",
      "type Computed = { [computed]: string; ['a']: string; a: string; };",
      "interface I { duplicate: string; duplicate: string; }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2300, 2300, 2300, 2300, 2300, 2300, 2300, 2300]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Duplicate identifier 'a'.",
      "Duplicate identifier 'a'.",
      "Duplicate identifier 'repeated'.",
      "Duplicate identifier 'repeated'.",
      "Duplicate identifier 'mixed'.",
      "Duplicate identifier 'mixed'.",
      "Duplicate identifier 'duplicate'.",
      "Duplicate identifier 'duplicate'.",
    ]);
  });

  it("resolves duplicate computed object-literal keys from const and enum literals", () => {
    const sourceFile = parseSourceFile([
      "const n = 1;",
      "const s = 's';",
      "enum E1 { A = 'ENUM_KEY' }",
      "enum E2 { B }",
      "const referenced = {",
      "  [n]: 1,",
      "  [n]: 2,",
      "  [s]: 1,",
      "  [s]: 2,",
      "  [E1.A]: 1,",
      "  [E1.A]: 2,",
      "  [E2.B]: 1,",
      "  [E2.B]: 2,",
      "};",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1117, 1117, 1117, 1117]);
  });

  it("contextually types object-literal members through constant computed property names", () => {
    const sourceFile = parseSourceFile([
      "declare function literalKey(): 'value';",
      "declare function accept(callbacks: { value: (text: string) => void }): void;",
      "accept({ [literalKey()]: text => text.toFixed() });",
      "accept({ [literalKey()](text) { return text.toFixed(); } });",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true, target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2339, 2339]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'toFixed' does not exist on type 'string'.",
      "Property 'toFixed' does not exist on type 'string'.",
    ]);
  });

  it("reports duplicate block-scoped bindings with redeclaration diagnostics per declaration", () => {
    const sourceFile = parseSourceFile([
      "let top = 1;",
      "const top = 2;",
      "switch (0) {",
      "  default:",
      "    let inCase = 1;",
      "    let inCase = 2;",
      "}",
      "try {",
      "  const inTry = 1;",
      "  const inTry = 2;",
      "} catch (err) {",
      "  let inCatch = 1;",
      "  let inCatch = 2;",
      "}",
      "function f() {",
      "  let local = 1;",
      "  let local = 2;",
      "}",
      "function nested() {",
      "  let lifted;",
      "  {",
      "    var lifted;",
      "  }",
      "}",
      "let looped;",
      "for (var looped; ;) {",
      "  break;",
      "}",
      "function constWrite() {",
      "  const fixed = 1;",
      "  {",
      "    var fixed = 2;",
      "  }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [
      2451, 2451,
      2451, 2451,
      2451, 2451,
      2451, 2451,
      2451, 2451,
      2451, 2451,
      2451, 2451,
      2481,
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot redeclare block-scoped variable 'top'.",
      "Cannot redeclare block-scoped variable 'top'.",
      "Cannot redeclare block-scoped variable 'looped'.",
      "Cannot redeclare block-scoped variable 'looped'.",
      "Cannot redeclare block-scoped variable 'inCase'.",
      "Cannot redeclare block-scoped variable 'inCase'.",
      "Cannot redeclare block-scoped variable 'inTry'.",
      "Cannot redeclare block-scoped variable 'inTry'.",
      "Cannot redeclare block-scoped variable 'inCatch'.",
      "Cannot redeclare block-scoped variable 'inCatch'.",
      "Cannot redeclare block-scoped variable 'local'.",
      "Cannot redeclare block-scoped variable 'local'.",
      "Cannot redeclare block-scoped variable 'lifted'.",
      "Cannot redeclare block-scoped variable 'lifted'.",
      "Cannot initialize outer scoped variable 'fixed' in the same scope as block scoped declaration 'fixed'.",
    ]);
  });

  it("widens enum member literals for mutable variable bindings and readonly enum writes", () => {
    const sourceFile = parseSourceFile([
      "enum Choice { A, B }",
      "let mutable = Choice.A;",
      "mutable = Choice.B;",
      "const exact = Choice.A;",
      "let widened = exact;",
      "widened = Choice.B;",
      "Choice.A = Choice.B;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2540]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot assign to 'A' because it is a read-only property.",
    ]);
  });

  it("treats exported namespace const bindings as readonly properties", () => {
    const sourceFile = parseSourceFile([
      "namespace M {",
      "  export const x = 0;",
      "  export let y = 0;",
      "}",
      "M.x = 1;",
      "M.x += 2;",
      "M.x++;",
      "++M.x;",
      "M['x'] = 3;",
      "M.y = 4;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2540, 2540, 2540, 2540, 2540]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot assign to 'x' because it is a read-only property.",
      "Cannot assign to 'x' because it is a read-only property.",
      "Cannot assign to 'x' because it is a read-only property.",
      "Cannot assign to 'x' because it is a read-only property.",
      "Cannot assign to 'x' because it is a read-only property.",
    ]);
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
    const result = checkSourceFile(sourceFile, { noImplicitAny: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Interface name cannot be 'string'.",
      "A parameter property is only allowed in a constructor implementation.",
      "Parameter 'x' implicitly has an 'any' type.",
      "Construct signature, which lacks return-type annotation, implicitly has an 'any' return type.",
      "A parameter property is only allowed in a constructor implementation.",
      "Parameter 'x' implicitly has an 'any' type.",
      "A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2427, 2369, 7006, 7013, 2369, 7006, 2355]);
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

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2355, 2304, 2304]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.",
      "Cannot find name 'Missing'.",
      "Cannot find name 'Missing'.",
    ]);
  });

  it("checks declared arrow function return types", () => {
    const sourceFile = parseSourceFile("const f = (x: string): number => x;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("types JavaScript arrow signatures from JSDoc generics", () => {
    const sourceFile = parseSourceFile([
      "/**",
      " * @template T",
      " * @param {T|undefined} value value or not",
      " * @returns {T} result value",
      " */",
      "const clone = value => /** @type {T} */({ ...value });",
    ].join("\n"), { fileName: "sample.js" });
    const result = checkSourceFile(sourceFile, { strict: true, allowJs: true, checkJs: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("checks JavaScript JSDoc arrow return casts against declared returns", () => {
    const sourceFile = parseSourceFile([
      "/**",
      " * @template T",
      " * @param {T|undefined} value value or not",
      " * @returns {T} result value",
      " */",
      "const bad = value => /** @type {string} */({ ...value });",
    ].join("\n"), { fileName: "sample.js" });
    const result = checkSourceFile(sourceFile, { strict: true, allowJs: true, checkJs: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'T'."]);
  });

  it("uses JSDoc parameter and return tags on JavaScript callback arrows", () => {
    const sourceFile = parseSourceFile([
      "/**",
      " * @param {any} v",
      " */",
      "function identity(v) { return v; }",
      "const x = identity(",
      "  /**",
      "   * @param {number} param",
      "   * @returns {number=}",
      "   */",
      "  param => param",
      ");",
    ].join("\n"), { fileName: "sample.js" });
    const result = checkSourceFile(sourceFile, { strict: true, allowJs: true, checkJs: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("checks JavaScript class type annotations while reporting JavaScript-only syntax errors", () => {
    const sourceFile = parseSourceFile([
      "class Foo {",
      "  constructor() {",
      "    this.prop = {};",
      "  }",
      "  declare prop: string;",
      "  method() {",
      "    this.prop.foo;",
      "  }",
      "}",
    ].join("\n"), { fileName: "input.js" });
    const result = checkSourceFile(sourceFile, { allowJs: true, checkJs: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 8009, 8010, 2339]);
  });

  it("checks loop initializer declarations and loop bodies", () => {
    const sourceFile = parseSourceFile("function f(items: string[]): number { for (const item: string of items) { return item; } return 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("checks conditional branches after assertion expressions", () => {
    const sourceFile = parseSourceFile("function f(flag: boolean): number { return flag ? \"x\" as string : 1; }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string | number' is not assignable to type 'number'."]);
  });

  it("checks assertion overlap against resolved interface targets", () => {
    const sourceFile = parseSourceFile([
      "interface IHasValue { value: string; }",
      "const invalid = <IHasValue>null;",
      "const valid = { value: \"x\", extra: 1 } as IHasValue;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2352]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Conversion of type 'null' to type 'IHasValue' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
    ]);
  });

  it("checks assertion overlap through generic alias instantiation expressions", () => {
    const sourceFile = parseSourceFile([
      "class ErrImpl<E> { e!: E; }",
      "declare const Err: typeof ErrImpl & (<T>() => T);",
      "type ErrAlias<U> = typeof Err<U>;",
      "declare const e: ErrAlias<number>;",
      "e as ErrAlias<string>;",
      "declare class Class<T> { x: T; }",
      "declare function fn<T>(): T;",
      "type ClassAlias<T> = typeof Class<T>;",
      "type FnAlias<T> = typeof fn<T>;",
      "type Wat<T> = ClassAlias<T> & FnAlias<T>;",
      "declare const wat: Wat<number>;",
      "wat as Wat<string>;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2352, 2352]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Conversion of type '{ new (): ErrImpl<number>; prototype: ErrImpl<any>; } & (() => number)' to type '{ new (): ErrImpl<string>; prototype: ErrImpl<any>; } & (() => string)' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
      "Conversion of type 'Wat<number>' to type 'Wat<string>' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
    ]);
  });

  it("makes destructured binding names available to checked bodies", () => {
    const sourceFile = parseSourceFile("function f({ value }: string): string { return value; }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports implicit any and initializer diagnostics for untyped destructuring declarations", () => {
    const sourceFile = parseSourceFile([
      "function fn([a], { b }, [c = undefined], { d = null }) {}",
      "let [e], { f };",
      "declare var { g };",
      "let [h] = [undefined];",
      "type MissingMember = { i };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { noImplicitAny: true, target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [7031, 7031, 1182, 7031, 1182, 7031, 7031, 7008]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Binding element 'a' implicitly has an 'any' type.",
      "Binding element 'b' implicitly has an 'any' type.",
      "A destructuring declaration must have an initializer.",
      "Binding element 'e' implicitly has an 'any' type.",
      "A destructuring declaration must have an initializer.",
      "Binding element 'f' implicitly has an 'any' type.",
      "Binding element 'g' implicitly has an 'any' type.",
      "Member 'i' implicitly has an 'any' type.",
    ]);
  });

  it("reports typed variable reads before assignment", () => {
    const sourceFile = parseSourceFile("interface Shape { value: number; } let value: number; var shape: Shape; const first = value; const second = shape;");
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Variable 'value' is used before being assigned.",
      "Variable 'shape' is used before being assigned.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2454, 2454]);
  });

  it("reports temporal dead zone reads for future lexical and class declarations", () => {
    const sourceFile = parseSourceFile([
      "x; let x = 1;",
      "class B extends A {}",
      "class A {}",
      "function f() { return later; }",
      "const g = () => later;",
      "class Fields { value = later; method() { return later; } static { later; } }",
      "writeOnly = 1; let writeOnly: number;",
      "let outer = 1; { outer; let outer = 2; }",
      "let later = 1;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true, target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2448, 2454, 2449, 2448, 2454, 2448, 2448, 2454]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Block-scoped variable 'x' used before its declaration.",
      "Variable 'x' is used before being assigned.",
      "Class 'A' used before its declaration.",
      "Block-scoped variable 'later' used before its declaration.",
      "Variable 'later' is used before being assigned.",
      "Block-scoped variable 'writeOnly' used before its declaration.",
      "Block-scoped variable 'outer' used before its declaration.",
      "Variable 'outer' is used before being assigned.",
    ]);
  });

  it("uses TypeScript computed-name temporal-dead-zone contexts", () => {
    const sourceFile = parseSourceFile([
      "class FieldName { [field] = 1; }",
      "class MethodName { [method]() {} get [accessor]() { return 1; } }",
      "interface Shape { [typeKey]: number; }",
      "declare class Ambient { [ambientKey]: number; }",
      "const object = { [objectKey]() { return 1; } };",
      "let field = 'field';",
      "let method = 'method';",
      "let accessor = 'accessor';",
      "let typeKey = 'typeKey';",
      "let ambientKey = 'ambientKey';",
      "let objectKey = 'objectKey';",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true, target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2448]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Block-scoped variable 'field' used before its declaration.",
    ]);
  });

  it("uses export-assignment temporal-dead-zone rules", () => {
    const classSource = parseSourceFile("export = Foo; class Foo {}");
    const variableSource = parseSourceFile("export = value; let value: number;");
    const defaultSource = parseSourceFile("export default Foo; class Foo {}");

    assert.deepEqual(checkSourceFile(classSource, { module: "commonjs", strict: true }).diagnostics, []);
    assert.deepEqual(checkSourceFile(variableSource, { module: "commonjs", strict: true }).diagnostics.map(diagnostic => [diagnostic.code, diagnostic.message]), [
      [2454, "Variable 'value' is used before being assigned."],
    ]);
    assert.deepEqual(checkSourceFile(defaultSource, { module: "commonjs", strict: true }).diagnostics.map(diagnostic => [diagnostic.code, diagnostic.message]), [
      [2449, "Class 'Foo' used before its declaration."],
    ]);
  });

  it("disables definite-assignment diagnostics when strict null checks are off", () => {
    const sourceFile = parseSourceFile("class C { value: number; } var item: C; item;");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.equal(result.diagnostics.length, 0);
  });

  it("disables definite-assignment diagnostics when strict property initialization is explicitly off", () => {
    const sourceFile = parseSourceFile("class C { value: number; }");
    const result = checkSourceFile(sourceFile, { strictNullChecks: true, strictPropertyInitialization: false });

    assert.equal(result.diagnostics.length, 0);
  });

  it("does not require initialization for any or undefined-bearing property types", () => {
    const sourceFile = parseSourceFile("class C { anything: any; optional: string | undefined; required: number; }");
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2564]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'required' has no initializer and is not definitely assigned in the constructor.",
    ]);
  });

  it("uses non-nullish union members for property and operator checks when strict null checks are off", () => {
    const sourceFile = parseSourceFile([
      "let text: string | undefined;",
      "let count: number | undefined;",
      "text.length;",
      "count + 1;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: false });

    assert.equal(result.diagnostics.length, 0);
  });

  it("checks recursive optional object-literal properties without widening away undefined", () => {
    const sourceFile = parseSourceFile([
      "interface Interval { begin: number; }",
      "interface Node { interval: Interval; children?: Node[]; }",
      "var nodes: Node[] = [{ interval: { begin: 0 }, children: null }];",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'null' is not assignable to type 'Node[] | undefined'.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
  });

  it("checks present optional properties against the declared initializer type for non-nullish values", () => {
    const sourceFile = parseSourceFile([
      "interface Box { name?: string; }",
      "interface Style { cb?: () => string[]; }",
      "const box: Box = { name: false };",
      "const style: Style = { cb: () => [null] };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'boolean' is not assignable to type 'string'.",
      "Type '() => null[]' is not assignable to type '() => string[]'.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
  });

  it("accepts optional property reads assigned back to optional properties", () => {
    const sourceFile = parseSourceFile([
      "interface Host { realpath?(path: string): string; }",
      "interface System { realpath?(path: string): string; }",
      "declare const sys: System;",
      "const host: Host = { realpath: sys.realpath };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("keeps optional structural property checks precise for generic inference", () => {
    const sourceFile = parseSourceFile([
      "type Thing = 'a' | 'b';",
      "function f(options: SelectOptions<Thing>, onChange: (status: Thing | null) => void): void {",
      "  select({ options, onChange });",
      "}",
      "declare function select<KeyT extends string>(props: SelectProps<KeyT>): void;",
      "type SelectProps<KeyT extends string> = {",
      "  options?: SelectOptions<KeyT>;",
      "  onChange: (key: KeyT) => void;",
      "};",
      "type SelectOptions<KeyT extends string> = Array<{ key: KeyT }> | Array<KeyT>;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("widens unannotated loose-nullish initializers to any", () => {
    const sourceFile = parseSourceFile([
      "namespace N {",
      "  export var diagnosticWriter = null;",
      "  export function alert(output: string) {",
      "    if (diagnosticWriter) diagnosticWriter.Alert(output);",
      "  }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: false });

    assert.deepEqual(result.diagnostics, []);
  });

  it("marks simple assignment targets as assigned without reading the target first", () => {
    const sourceFile = parseSourceFile("let value: number; value = 1; const copy: number = value;");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("still reads compound assignment targets before assignment", () => {
    const sourceFile = parseSourceFile("let value: number; value += 1; const copy = value;");
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Variable 'value' is used before being assigned.",
      "Variable 'value' is used before being assigned.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2454, 2454]);
  });

  it("reports direct abstract property access through this before concrete initialization", () => {
    const sourceFile = parseSourceFile([
      "abstract class Base {",
      "  constructor() { this.value; const deferred = () => this.value; }",
      "  abstract value: string;",
      "  field = this.value;",
      "}",
      "abstract class Derived extends Base { constructor() { super(); this.value; } }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Abstract property 'value' in class 'Base' cannot be accessed in the constructor.",
      "Abstract property 'value' in class 'Base' cannot be accessed in the constructor.",
      "Property 'value' is used before its initialization.",
      "Abstract property 'value' in class 'Base' cannot be accessed in the constructor.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2715, 2715, 2729, 2715]);
  });

  it("reports class field initializer reads before later field initialization", () => {
    const sourceFile = parseSourceFile([
      "class Base { x = 0; }",
      "class Derived extends Base { old = this.x; x = 1; }",
      "class Plain { before = this.x; x = 1; late = this.y; y = 2; }",
      "class StaticOrder { static first = StaticOrder.second; static second = 1; static ok = StaticOrder.first; }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true, target: "es2015" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2729, 2729, 2729]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'x' is used before its initialization.",
      "Property 'y' is used before its initialization.",
      "Property 'second' is used before its initialization.",
    ]);
  });

  it("checks inherited abstract property contracts and readonly assignment targets", () => {
    const sourceFile = parseSourceFile([
      "abstract class Base { abstract value: number; abstract method(): void; }",
      "class Wrong extends Base { value = \"x\"; method() { } }",
      "class Missing extends Base { }",
      "abstract class AccessorPair { abstract get item(): string; set item(value: string) { } }",
      "class ReadonlyBox { readonly value = \"x\"; }",
      "const box = new ReadonlyBox();",
      "box.value = \"y\";",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2416, 2654, 2676, 2676, 2540]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'value' in type 'Wrong' is not assignable to the same property in base type 'Base'.",
      "Non-abstract class 'Missing' is missing implementations for the following members of 'Base': 'value', 'method'.",
      "Accessors must both be abstract or non-abstract.",
      "Accessors must both be abstract or non-abstract.",
      "Cannot assign to 'value' because it is a read-only property.",
    ]);
  });

  it("checks accessor property calls, paired accessor types, object-literal self access, and ES5 auto-accessor targets", () => {
    const sourceFile = parseSourceFile([
      "class Box { get value(): number { return 1; } }",
      "function read(box: Box) { box.value(); }",
      "class Pair {",
      "  set item(value: number) { }",
      "  get item() { return \"x\"; }",
      "  get name(): string { return \"x\"; }",
      "  set name(next) { next = 1; }",
      "}",
      "const obj = {",
      "  get primaryPath() {",
      "    const self = this;",
      "    return self.collection.schema.primaryPath;",
      "  }",
      "};",
      "class Auto { accessor value: string; }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es5", strictNullChecks: true, strictPropertyInitialization: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [6234, 2322, 2322, 7023, 2339, 2564, 18045]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "This expression is not callable because it is a 'get' accessor. Did you mean to use it without '()'?",
      "Type 'string' is not assignable to type 'number'.",
      "Type 'number' is not assignable to type 'string'.",
      "'primaryPath' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.",
      "Property 'collection' does not exist on type '{ readonly primaryPath: any; }'.",
      "Property 'value' has no initializer and is not definitely assigned in the constructor.",
      "Properties with the 'accessor' modifier are only available when targeting ECMAScript 2015 and higher.",
    ]);
  });

  it("treats public class instances as structurally assignable through inherited members", () => {
    const sourceFile = parseSourceFile("class A { value = 1; } class B extends A { } function f(): A { return new B(); }");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("treats subclass constructor values as structurally assignable through inherited instance members", () => {
    const sourceFile = parseSourceFile([
      "class Model { someData = ''; }",
      "class VisualizationModel extends Model {}",
      "interface HasVisualizationModel { VisualizationModel: typeof Model; }",
      "const value: HasVisualizationModel = { VisualizationModel };",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("treats subclass constructor values as structurally assignable through inherited static interface members", () => {
    const sourceFile = parseSourceFile([
      "interface Tag<Id, Value> {",
      "  readonly Service: Value;",
      "  readonly Identifier: Id;",
      "}",
      "interface TagClass<Self, Id extends string, Value> extends Tag<Self, Value> {",
      "  new(): { readonly Id: Id; readonly Type: Value; };",
      "  readonly key: Id;",
      "}",
      "declare function makeTag<const Id extends string>(id: Id): <Self, Value>() => TagClass<Self, Id, Value>;",
      "class Foo extends makeTag('Foo')<Foo, { fn: (value: string) => void }>() {}",
      "declare function acceptsTag<Id, Value>(tag: Tag<Id, Value>): Value;",
      "const service = acceptsTag(Foo);",
      "service.fn('ok');",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.equal(result.diagnostics.length, 0);
  });

  it("checks implemented interface contracts and derived constructor super ordering", () => {
    const sourceFile = parseSourceFile([
      "interface I { x: string; }",
      "class B { }",
      "class C extends B implements I {",
      "  constructor() { this.x; }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Class 'C' incorrectly implements interface 'I'.",
      "Constructors for derived classes must contain a 'super' call.",
      "'super' must be called before accessing 'this' in the constructor of a derived class.",
      "Property 'x' does not exist on type 'C'.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2420, 2377, 17009, 2339]);
  });

  it("reports incompatible named interface members while allowing extra call signatures", () => {
    const sourceFile = parseSourceFile([
      "interface Base { f(): string; }",
      "interface Bad extends Base { f(key: string): string; }",
      "interface Callable { (): string; }",
      "interface MoreCallable extends Callable { (key: string): string; }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2430]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Interface 'Bad' incorrectly extends interface 'Base'."]);
  });

  it("validates recursive interface returns against the completed current interface shape", () => {
    const sourceFile = parseSourceFile([
      "interface Collection<K, V> {",
      "  map<M>(): Collection<K, M>;",
      "  toSeq(): Seq<K, V>;",
      "}",
      "interface Seq<K, V> extends Collection<K, V> {}",
      "interface N1<T> extends Collection<void, T> {",
      "  map<M>(): N1<M>;",
      "}",
      "interface N2<T> extends N1<T> {",
      "  map<M>(): N2<M>;",
      "  toSeq(): N2<T>;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("resolves local generic type references before intrinsic container aliases", () => {
    const sourceFile = parseSourceFile([
      "declare namespace Immutable {",
      "  export interface Collection<T> {",
      "    map<M>(): Collection<M>;",
      "  }",
      "  export namespace Set {}",
      "  export interface Set<T> extends Collection<T> {",
      "    map<M>(): Set<M>;",
      "  }",
      "  export namespace OrderedSet {}",
      "  export interface OrderedSet<T> extends Set<T> {",
      "    map<M>(): OrderedSet<M>;",
      "  }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("validates recursive and later type-parameter constraints with complete substitutions", () => {
    const sourceFile = parseSourceFile([
      "type Expect<TActual extends TExpected, TExpected> = TActual;",
      "type Bit = 0 | 1;",
      "type Flip<A extends Bit> = A extends 1 ? 0 : 1;",
      "type And<A extends Bit, B extends Bit> = A extends 1 ? B : 0;",
      "interface Recursive<T extends Recursive<T>> { next(): T; }",
      "type ValidLater = Expect<Flip<1>, Bit>;",
      "type ValidConditional<A extends Bit> = And<Flip<A>, 1>;",
      "type ValidRecursive<T extends Recursive<T>> = T;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("reports interface type-parameter constraint diagnostics once", () => {
    const sourceFile = parseSourceFile("class Foo<T> {} interface Box<T extends Foo<{ x: V }>> {}");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find name 'V'."]);
  });

  it("relates tuple, mapped-array, and constrained array carriers through element types", () => {
    const sourceFile = parseSourceFile([
      "type Identity<T> = { [K in keyof T]: T[K] };",
      "type Fn<Args extends any[]> = (...args: Args) => void;",
      "type TupleFn = Fn<[string]>;",
      "type MappedTupleFn<Args extends [number] | [string]> = Fn<Identity<Args>>;",
      "declare const one: TupleFn;",
      "declare const mapped: MappedTupleFn<[number]>;",
      "one('x');",
      "mapped(1);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("uses constrained type-parameter members and interface-inherited classes generically", () => {
    const sourceFile = parseSourceFile([
      "class Message { id!: number; }",
      "interface MessageList<T extends Message> extends Message { methodOnMessageList(): T[]; }",
      "function acceptMessage(value: Message) {}",
      "function read<T extends Message, U extends MessageList<T>>(value: U) {",
      "  acceptMessage(value);",
      "  return value.methodOnMessageList()[0].id.toFixed() + value.id.toFixed();",
      "}",
      "type IdOf<T extends { id: number }> = T['id'];",
      "const id: IdOf<{ id: number }> = 1;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("preserves interface method overloads during member collection", () => {
    const sourceFile = parseSourceFile([
      "interface Reducer<T> {",
      "  reduce(callbackfn: (previousValue: T, currentValue: T) => T): T;",
      "  reduce<U>(callbackfn: (previousValue: U, currentValue: T) => U, initialValue: U): U;",
      "}",
      "declare const values: Reducer<number>;",
      "const sum: number = values.reduce((left, right) => left + right);",
      "const text: string = values.reduce((left, right) => left + right.toFixed(), '');",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("contextually types overloaded and generic callback parameters from resolved call signatures", () => {
    const sourceFile = parseSourceFile([
      "interface Foo {",
      "  getFoo(n: number): void;",
      "  getFoo(s: string): void;",
      "}",
      "declare const foo: Foo;",
      "foo.getFoo = value => { value; };",
      "class GenericClass<T> { payload!: T; }",
      "declare const genericObject: GenericClass<{ greeting: string }>;",
      "function genericFunction<T>(object: GenericClass<T>, callback: (payload: T) => void) { callback(object.payload); }",
      "genericFunction(genericObject, ({ greeting }) => { greeting.toLocaleLowerCase(); });",
      "class Collection<T> { add(value: T) {} }",
      "interface Utils { mapReduce<T, U, V>(c: Collection<T>, mapper: (value: T) => U, reducer: (value: U) => V): Collection<V>; }",
      "declare const utils: Utils;",
      "declare const collection: Collection<string>;",
      "utils.mapReduce(collection, value => value.length, value => new Date(value));",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("keeps value parameter names from shadowing type parameters in type signatures", () => {
    const sourceFile = parseSourceFile([
      "type Wrapper<T> = { value: T };",
      "type Maker<F> = (F: { value: F }) => Wrapper<F>;",
      "declare const maker: Maker<string>;",
      "const value: string = maker({ value: 'x' }).value;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("binds type-signature parameters as values without type-meaning shadowing", () => {
    const sourceFile = parseSourceFile([
      "type FromDestructuring = ({ a: text }: { a: string }) => typeof text;",
      "type FromInterface = { ({ count: value }: { count: number }): typeof value; };",
      "type Maker<F> = (F: { value: F }) => F;",
      "declare const readText: FromDestructuring;",
      "declare const readValue: FromInterface;",
      "declare const maker: Maker<string>;",
      "const text: string = readText({ a: 'x' });",
      "const value: number = readValue({ count: 1 });",
      "const made: string = maker({ value: 'x' });",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("relates generic signatures, nominal subclasses, intersections, namespaces, and enum literals", () => {
    const sourceFile = parseSourceFile([
      "type Id = <T>(value: T) => T;",
      "const id: Id = <T>(value: T): T => value;",
      "const stringId: (value: string) => string = id;",
      "class Base { private marker!: number; }",
      "class Derived extends Base {}",
      "const base: Base = new Derived();",
      "type A = { a: string };",
      "type B = { b: string };",
      "declare const both: A & B;",
      "const onlyA: A = both;",
      "namespace M { export class C { value = 1; } }",
      "const namespaceValue: number = new M.C().value;",
      "enum E { A = 'a' }",
      "type StringBox<T extends string> = T;",
      "type EnumMember = StringBox<E.A>;",
      "const text: string = stringId('x');",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("does not treat distinct constrained type parameters as assertion-overlapping", () => {
    const sourceFile = parseSourceFile([
      "class Base {}",
      "function convert<T extends Base, U extends Base>(value: U): T {",
      "  return value as T;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2352]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Conversion of type 'U' to type 'T' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
    ]);
  });

  it("preserves external import-equals module namespace values for assignment diagnostics", () => {
    const sourceFile = parseSourceFile([
      "import moduleA = require(\"./moduleA\");",
      "var x = moduleA;",
      "x = 1;",
      "var y = 1;",
      "y = moduleA;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'number' is not assignable to type 'typeof import(\"moduleA\")'.",
      "Type 'typeof import(\"moduleA\")' is not assignable to type 'number'.",
    ]);
  });

  it("reports value-only globals as invalid import-equals namespace targets", () => {
    const sourceFile = parseSourceFile("import alias = undefined;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2503]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find namespace 'undefined'."]);
  });

  it("uses resolved program module exports for namespace-import structural assignment", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "main.ts") {
          return [
            "import Backbone = require(\"./base\");",
            "import moduleA = require(\"./moduleA\");",
            "interface IHasVisualizationModel { VisualizationModel: typeof Backbone.Model; }",
            "interface IHasTypedVisualizationModel { VisualizationModel: typeof moduleA.VisualizationModel; }",
            "const value: IHasVisualizationModel = moduleA;",
            "const typedValue: IHasTypedVisualizationModel = moduleA;",
            "declare const reverse: IHasVisualizationModel;",
            "const moduleLike: typeof moduleA = reverse;",
          ].join("\n");
        }
        if (fileName === "base.ts") {
          return "export class Model { someData = ''; }";
        }
        if (fileName === "moduleA.ts") {
          return [
            "import Backbone = require(\"./base\");",
            "export class VisualizationModel extends Backbone.Model { }",
          ].join("\n");
        }
        return undefined;
      },
      useCaseSensitiveFileNames: () => true,
    };
    const program = createProgram(["main.ts"], { module: "commonjs" }, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), []);
  });

  it("recognizes standard global values before reporting unresolved expression names", () => {
    const sourceFile = parseSourceFile([
      "parseInt(\"1\");",
      "new Array();",
      "new Promise(() => undefined);",
      "new Set();",
      "Symbol();",
      "BigInt(1);",
      "new WeakMap();",
      "new WeakSet();",
      "new WeakRef({});",
      "new FinalizationRegistry(() => undefined);",
      "isFinite(Infinity);",
      "isNaN(NaN);",
      "parseFloat(\"1\");",
      "Reflect.apply(() => undefined, undefined, []);",
      "Object.keys({ a: 1 });",
      "Object.assign({ a: 1 }, { b: \"x\" }).b;",
      "Array.of(1, 2, 3).push(4);",
      "\"x\".codePointAt(0);",
      "\"x\".normalize().repeat(2);",
      "String.fromCodePoint(65);",
      "String.raw`x`;",
      "JSON.stringify({ value: 1 });",
      "new Map();",
      "const instant: Temporal.Instant = Temporal.Instant.from(\"2020-01-01T00:00Z\");",
      "Temporal.Now.instant().add(Temporal.Duration.from({ hours: 1 }));",
      "new Temporal.ZonedDateTime(0n, \"UTC\");",
      "instant.toZonedDateTimeISO(\"UTC\").toPlainDate();",
      "const monthsByDays: Record<number, Temporal.PlainDate[]> = {};",
      "const date = Temporal.Now.plainDateISO().with({ month: 1 });",
      "monthsByDays[date.daysInMonth] = (monthsByDays[date.daysInMonth] || []).concat(date);",
      "monthsByDays[30].map(date => date.toLocaleString(\"en\", { month: \"long\" }));",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("recognizes standard ambient library type and value surfaces", () => {
    const sourceFile = parseSourceFile([
      "declare const generator: Generator<string, void, unknown>;",
      "declare const iteratorResult: IteratorResult<number>;",
      "declare const asyncIterable: AsyncIterable<string>;",
      "declare const descriptor: PropertyDescriptor;",
      "declare const methodDecorator: MethodDecorator;",
      "declare const parameterDecorator: ParameterDecorator;",
      "declare const flattened: FlatArray<string[], 0>;",
      "declare const node: Node;",
      "declare const file: File;",
      "declare const form: FormData;",
      "declare const svg: SVGRectElement;",
      "declare const worker: Worker;",
      "declare const element: HTMLElement;",
      "const bool: boolean = Boolean(1);",
      "const boxedBool: Boolean = true;",
      "setTimeout(() => undefined, 0);",
      "window;",
      "self;",
      "generator; iteratorResult; asyncIterable; descriptor; methodDecorator; parameterDecorator;",
      "flattened; node; file; form; svg; worker; element; bool; boxedBool;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("models Object and Function structural surfaces from the standard library", () => {
    const sourceFile = parseSourceFile([
      "var badObjectSource = { toString: 5 };",
      "var emptyObjectOk: {} = badObjectSource;",
      "var objectError: Object = badObjectSource;",
      "var contextualObjectError: Object = { toString: 0 };",
      "var functionMissing: Function = {};",
      "function good() {}",
      "namespace good { export var extra = 0; }",
      "var goodFunction: Function = good;",
      "function bad() {}",
      "namespace bad { export var apply = 0; }",
      "var badFunction: Function = bad;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015", strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322, 2740, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type '{ toString: number; }' is not assignable to type 'Object'.",
      "Type 'number' is not assignable to type '() => string'.",
      "Type '{}' is missing the following properties from type 'Function': apply, call, bind, prototype, and 5 more.",
      "Type 'typeof bad' is not assignable to type 'Function'.",
    ]);
  });

  it("reports standard type-only library bindings used as values", () => {
    const sourceFile = parseSourceFile([
      "Generator;",
      "IteratorResult;",
      "PropertyDescriptor;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2693, 2693, 2693]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'Generator' only refers to a type, but is being used as a value here.",
      "'IteratorResult' only refers to a type, but is being used as a value here.",
      "'PropertyDescriptor' only refers to a type, but is being used as a value here.",
    ]);
  });

  it("keeps Temporal interfaces precise enough for missing-property checks", () => {
    const sourceFile = parseSourceFile([
      "const instant = Temporal.Instant.from(\"2020-01-01T00:00Z\");",
      "instant.epochNanoseconds;",
      "instant.year;",
      "const monthDay = Temporal.PlainMonthDay.from(\"08-24\");",
      "monthDay.monthCode;",
      "monthDay.month;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2339, 2339]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Property 'year' does not exist on type 'Instant'.",
      "Property 'month' does not exist on type 'PlainMonthDay'.",
    ]);
  });

  it("models Object.freeze as a readonly view of arrays and objects", () => {
    const sourceFile = parseSourceFile([
      "const objectValue = Object.freeze({ count: 1 });",
      "const arrayValue = Object.freeze([1]);",
      "const count: number = objectValue.count;",
      "objectValue.count = 2;",
      "arrayValue[0] = 2;",
      "count;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2540, 2542]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot assign to 'count' because it is a read-only property.",
      "Index signature in type 'readonly number[]' only permits reading.",
    ]);
  });

  it("checks element assignment target types", () => {
    const sourceFile = parseSourceFile("const values = [1]; values[0] = \"x\";");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string' is not assignable to type 'number'."]);
  });

  it("evolves empty array element types through indexed assignments", () => {
    const sourceFile = parseSourceFile("let values = []; values[0] = { foo: 'x' }; values[1] = { foo: 'y' }; values[0].foo.toUpperCase();");
    const result = checkSourceFile(sourceFile, { noImplicitAny: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("models globalThis as the standard global value namespace", () => {
    const sourceFile = parseSourceFile([
      "const finite = globalThis.isFinite;",
      "const nan: typeof globalThis.isNaN = isNaN;",
      "const symbol = globalThis.Symbol;",
      "const value: number = globalThis.NaN + globalThis.Infinity;",
      "nan(value);",
      "finite(value);",
      "symbol;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("uses declared Array interface augmentations as array apparent members", () => {
    const sourceFile = parseSourceFile([
      "interface Array<T> {",
      "  split(parts: number): T[][];",
      "}",
      "const values = [\"x\"];",
      "const chunks: string[][] = values.split(2);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("narrows variables and arrays through type-predicate calls", () => {
    const sourceFile = parseSourceFile([
      "const isString = (value: unknown): value is string => typeof value === \"string\";",
      "function assertNonNullable<T>(value: T): asserts value is NonNullable<T> {}",
      "let value: string | number = \"x\";",
      "if (isString(value)) {",
      "  value.slice(0);",
      "}",
      "let nullable: string | null = \"x\";",
      "assertNonNullable(nullable);",
      "nullable.trim();",
      "const values: (string | number)[] = [\"x\"];",
      "if (values.every(isString)) {",
      "  values[0].slice(0);",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("narrows unions through asserted discriminant property access", () => {
    const sourceFile = parseSourceFile([
      "interface Cat { type: 'cat'; canMeow: true; }",
      "interface Dog { type: 'dog'; canBark: true; }",
      "type Animal = Cat | Dog;",
      "declare function assertEqual<T>(value: any, type: T): asserts value is T;",
      "const animal = { type: 'cat', canMeow: true } as Animal;",
      "assertEqual(animal.type, 'cat' as const);",
      "animal.canMeow;",
      "const maybeAnimal = { type: 'cat', canMeow: true } as Animal | undefined;",
      "assertEqual(maybeAnimal?.type, 'cat' as const);",
      "maybeAnimal.canMeow;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("infers Array.from element types from iterable and array-like sources", () => {
    const sourceFile = parseSourceFile([
      "interface A { a: string; }",
      "interface B { b: string; }",
      "const inputA: A[] = [];",
      "const inputALike: ArrayLike<A> = { length: 0 };",
      "const inputASet = new Set<A>();",
      "const ok1: A[] = Array.from(inputA);",
      "const ok2: A[] = Array.from(inputA.values());",
      "const ok3: A[] = Array.from(inputALike);",
      "const ok4: A[] = Array.from(inputASet);",
      "const bad1: B[] = Array.from(inputA);",
      "const bad2: B[] = Array.from(inputALike);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
  });

  it("reports class value assignment targets for compound assignments", () => {
    const sourceFile = parseSourceFile([
      "class f {}",
      "f += '';",
      "f -= 1;",
      "f *= 1;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2629, 2629, 2629]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot assign to 'f' because it is a class.",
      "Cannot assign to 'f' because it is a class.",
      "Cannot assign to 'f' because it is a class.",
    ]);
  });

  it("checks binary arithmetic operands against primitive numeric facts", () => {
    const boxedNumberSource = parseSourceFile([
      "var x: Number;",
      "var y: Number;",
      "var z = x + y;",
      "var z2 = x - y;",
      "var z3 = x * y;",
      "var z4 = x / y;",
    ].join("\n"));
    const genericSource = parseSourceFile([
      "var obj = function f<T>(a: T, b: T) {",
      "  var z1 = a + b;",
      "  var z2 = a - b;",
      "};",
    ].join("\n"));
    const boxedResult = checkSourceFile(boxedNumberSource, { strictNullChecks: true });
    const genericResult = checkSourceFile(genericSource);

    assert.deepEqual(boxedResult.diagnostics.map(diagnostic => diagnostic.code), [
      2454, 2454, 2365,
      2454, 2454, 2362, 2363,
      2454, 2454, 2362, 2363,
      2454, 2454, 2362, 2363,
    ]);
    assert.deepEqual(genericResult.diagnostics.map(diagnostic => diagnostic.code), [2365, 2362, 2363]);
  });

  it("checks deeply left-associated eager binary expressions without recursive overflow", () => {
    const sourceFile = parseSourceFile(`${Array.from({ length: 2_000 }, (_, index) => String(index)).join(" + ")};`);
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("does not leak outer definite-assignment state into nested function bodies", () => {
    const sourceFile = parseSourceFile([
      "function outer(): void {",
      "  let value: number;",
      "  (() => value);",
      "  (function () { value; });",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("resolves ambient module export-equals aliases for named imports", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "demo.d.ts") {
          return [
            "declare namespace demoNS {",
            "  function f(): void;",
            "}",
            "declare module \"demoModule\" {",
            "  import alias = demoNS;",
            "  export = alias;",
            "}",
          ].join("\n");
        }
        if (fileName === "user.ts") {
          return [
            "import { f } from \"demoModule\";",
            "let x1: string = demoNS.f;",
            "let x2: string = f;",
          ].join("\n");
        }
        return undefined;
      },
      useCaseSensitiveFileNames: () => true,
    };
    const program = createProgram(["demo.d.ts", "user.ts"], { module: "commonjs" }, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "Type '() => void' is not assignable to type 'string'.",
      "Type '() => void' is not assignable to type 'string'.",
    ]);
  });

  it("keeps default imports with merged value and type meanings distinct", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "b.ts") {
          return [
            "export const zzz = 123;",
            "export default zzz;",
          ].join("\n");
        }
        if (fileName === "a.ts") {
          return [
            "export default interface zzz {",
            "  x: string;",
            "}",
            "import zzz from \"./b\";",
            "const x: zzz = { x: \"\" };",
            "zzz;",
            "export { zzz as default };",
          ].join("\n");
        }
        if (fileName === "index.ts") {
          return [
            "import zzz from \"./a\";",
            "const x: zzz = { x: \"\" };",
            "zzz;",
            "import originalZZZ from \"./b\";",
            "originalZZZ;",
            "const y: originalZZZ = x;",
          ].join("\n");
        }
        return undefined;
      },
      useCaseSensitiveFileNames: () => true,
    };
    const program = createProgram(["index.ts"], {}, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2749]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), [
      "'originalZZZ' refers to a value, but is being used as a type here. Did you mean 'typeof originalZZZ'?",
    ]);
  });

  it("keeps export-equals namespace and interface meanings without inventing a value", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "types.d.ts") {
          return [
            "declare module \"foo\" {",
            "  namespace B {",
            "    export interface A { }",
            "  }",
            "  interface B {",
            "    bar(name: string): B.A;",
            "  }",
            "  export = B;",
            "}",
          ].join("\n");
        }
        if (fileName === "index.ts") {
          return [
            "import foo = require(\"foo\");",
            "declare var z: foo;",
            "z.bar(\"hello\");",
            "var x: foo.A = foo.bar(\"hello\");",
          ].join("\n");
        }
        return undefined;
      },
      useCaseSensitiveFileNames: () => true,
    };
    const program = createProgram(["types.d.ts", "index.ts"], { module: "commonjs" }, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2708]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), ["Cannot use namespace 'foo' as a value."]);
  });

  it("does not emit cascading assignment diagnostics when the target type is unresolved", () => {
    const sourceFile = parseSourceFile([
      "let x: Missing;",
      "x = 1;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find name 'Missing'."]);
  });

  it("resolves internal namespace aliases through exported namespace members", () => {
    const sourceFile = parseSourceFile([
      "namespace foo {",
      "  export class Provide { }",
      "  export namespace bar { export namespace baz { export class boo { } } }",
      "}",
      "import provide = foo;",
      "import booz = foo.bar.baz;",
      "var p = new provide.Provide();",
      "var p1: provide.Provide;",
      "var p2: foo.Provide;",
      "var p3: booz.bar;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2694]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Namespace 'foo.bar.baz' has no exported member 'bar'."]);
  });

  it("reports unresolved property receivers without cascading property diagnostics", () => {
    const sourceFile = parseSourceFile("var d = b.q3;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Cannot find name 'b'."]);
  });

  it("reports strict-mode eval and arguments bindings from compiler options", () => {
    const sourceFile = parseSourceFile("function f() { var arguments = []; const eval = 1; }");
    const result = checkSourceFile(sourceFile, { alwaysStrict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1100, 1100]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Invalid use of 'arguments' in strict mode.",
      "Invalid use of 'eval' in strict mode.",
    ]);
  });

  it("allows eval and arguments for strict type-only and nominal declaration names", () => {
    const cases = [
      "interface arguments {}",
      "interface eval {}",
      "type arguments = number;",
      "type eval = string;",
      "class arguments {}",
      "class eval {}",
      "enum arguments {}",
      "enum eval {}",
      "namespace arguments {}",
      "namespace eval {}",
      "function f<arguments, eval>() {}",
      "namespace Ns {} import arguments = Ns;",
    ];

    for (const source of cases) {
      const result = checkSourceFile(parseSourceFile(source), { alwaysStrict: true });
      assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [], source);
    }
  });

  it("treats source files as always-strict unless explicitly disabled", () => {
    const defaultStrict = checkSourceFile(parseSourceFile("declare const value: any; with (value) {}"));
    assert.deepEqual(defaultStrict.diagnostics.map(diagnostic => diagnostic.code), [1101, 2410]);

    const explicitlyDisabled = checkSourceFile(parseSourceFile("declare const value: any; with (value) {}"), { alwaysStrict: false });
    assert.deepEqual(explicitlyDisabled.diagnostics.map(diagnostic => diagnostic.code), [2410]);

    const asyncWith = checkSourceFile(parseSourceFile("declare const value: any; async function f() { with (value) { with (value) {} } }"));
    assert.deepEqual(asyncWith.diagnostics.map(diagnostic => diagnostic.code), [1101, 1300, 2410, 1101]);
  });

  it("reports future-reserved identifiers through the shared strict-mode identifier rule", () => {
    const valueAndFunction = checkSourceFile(parseSourceFile("var let = 10; let = 30; function package() {}"), { alwaysStrict: true });
    assert.deepEqual(valueAndFunction.diagnostics.map(diagnostic => diagnostic.code), [1212, 1212, 1212]);

    const lexicalLet = checkSourceFile(parseSourceFile("let x = 1, let = 2;"), { alwaysStrict: true });
    assert.deepEqual(lexicalLet.diagnostics.map(diagnostic => diagnostic.code), [1212, 2480]);

    const typeReference = checkSourceFile(parseSourceFile("function f(x: private.package.x) {}"), { alwaysStrict: true });
    assert.deepEqual(typeReference.diagnostics.map(diagnostic => diagnostic.code), [1212, 2503]);
  });

  it("uses class strict-mode diagnostics for reserved identifiers owned by class syntax", () => {
    const classExpression = checkSourceFile(parseSourceFile("var public = 1; var myClass = class package extends public {}"), { alwaysStrict: true });
    assert.deepEqual(classExpression.diagnostics.map(diagnostic => diagnostic.code), [1212, 1213, 1213, 2507]);

    const implementedInterface = checkSourceFile(parseSourceFile("interface public { } class E implements public { }"), { alwaysStrict: true });
    assert.deepEqual(implementedInterface.diagnostics.map(diagnostic => diagnostic.code), [1212, 1213]);
  });

  it("reports class-body strict eval and arguments bindings with the class diagnostic", () => {
    const sourceFile = parseSourceFile("class C { method() { const arguments = 1; const eval = 2; } }");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1210, 1210]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Code contained in a class is evaluated in JavaScript's strict mode which does not allow this use of 'arguments'. For more information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode.",
      "Code contained in a class is evaluated in JavaScript's strict mode which does not allow this use of 'eval'. For more information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode.",
    ]);
  });

  it("binds arguments only in non-arrow function bodies and type-queries unresolved outer uses", () => {
    const sourceFile = parseSourceFile([
      "function f() {",
      "  const length: number = arguments.length;",
      "  const item = arguments[0];",
      "  (() => arguments)();",
      "}",
      "(() => arguments)();",
      "interface I { method(args: typeof arguments): void; }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304, 2304]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot find name 'arguments'.",
      "Cannot find name 'arguments'.",
    ]);
  });

  it("uses the function-scoped arguments object instead of outer variables", () => {
    const sourceFile = parseSourceFile("var arguments = 10; function foo(a) { arguments = 10; }");
    const result = checkSourceFile(sourceFile, { strict: false, alwaysStrict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'number' is not assignable to type 'IArguments'."]);
  });

  it("reports strict-mode assignment targets named arguments or eval", () => {
    const sourceFile = parseSourceFile("function foo() { arguments = 10; eval = 20; }");
    const result = checkSourceFile(sourceFile, { alwaysStrict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1100, 2322, 1100, 2630]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Invalid use of 'arguments' in strict mode.",
      "Type 'number' is not assignable to type 'IArguments'.",
      "Invalid use of 'eval' in strict mode.",
      "Cannot assign to 'eval' because it is a function.",
    ]);
  });

  it("reports assignment to function declarations without leaking that fact through function-typed variables", () => {
    const sourceFile = parseSourceFile("function f() {} f = 1; const g = f; g = 1; parseInt = 1;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2630, 2588, 2630]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot assign to 'f' because it is a function.",
      "Cannot assign to 'g' because it is a constant.",
      "Cannot assign to 'parseInt' because it is a function.",
    ]);
  });

  it("reports strict-mode update targets named arguments or eval", () => {
    const sourceFile = parseSourceFile([
      "\"use strict\"",
      "++eval;",
      "--eval;",
      "++arguments;",
      "--arguments;",
      "eval++;",
      "eval--;",
      "arguments++;",
      "arguments--;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [
      1100, 2630,
      1100, 2630,
      1100, 2304,
      1100, 2304,
      1100, 2630,
      1100, 2630,
      1100, 2304,
      1100, 2304,
    ]);
  });

  it("checks break and continue targets through enclosing statements and function boundaries", () => {
    const sourceFile = parseSourceFile([
      "break;",
      "continue;",
      "while (true) { break; continue; }",
      "switch (1) { default: break; }",
      "target: while (true) { break target; continue target; }",
      "block: { continue block; }",
      "break missing;",
      "outer: while (true) { function nested() { break outer; } }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1105, 1104, 1115, 1116, 1107]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A 'break' statement can only be used within an enclosing iteration or switch statement.",
      "A 'continue' statement can only be used within an enclosing iteration statement.",
      "A 'continue' statement can only jump to a label of an enclosing iteration statement.",
      "A 'break' statement can only jump to a label of an enclosing statement.",
      "Jump target cannot cross function boundary.",
    ]);
  });

  it("reports duplicate labels inside one function boundary", () => {
    const sourceFile = parseSourceFile([
      "label: { label: while (true) { break label; } }",
      "label2: function nested() { label2: while (true) { break label2; } }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1114]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Duplicate label 'label'.",
    ]);
  });

  it("reports duplicate default clauses once per switch statement", () => {
    const sourceFile = parseSourceFile("switch (value) { default: break; case 1: break; default: break; default: break; }");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2304, 1113]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot find name 'value'.",
      "A 'default' clause cannot appear more than once in a 'switch' statement.",
    ]);
  });

  it("reports invalid class heritage clauses without rejecting valid interface heritage lists", () => {
    const sourceFile = parseSourceFile([
      "class A {}",
      "class B {}",
      "class C extends A, B {}",
      "class D extends A extends B {}",
      "interface I extends A, B {}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1174, 1172]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Classes can only extend a single class.",
      "'extends' clause already seen.",
    ]);
  });

  it("reports invalid update operands while accepting outer assertion expressions", () => {
    const sourceFile = parseSourceFile([
      "let a = 1;",
      "(a satisfies number)++;",
      "a!++;",
      "(1 + 2)++;",
      "++(1 + 2);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2357, 2357]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "The operand of an increment or decrement operator must be a variable or a property access.",
      "The operand of an increment or decrement operator must be a variable or a property access.",
    ]);
  });

  it("checks delete operands, property optionality, indexes, namespaces, and nested ordering", () => {
    const sourceFile = parseSourceFile([
      "\"use strict\";",
      "interface Foo {",
      "  a: number;",
      "  b: number | undefined;",
      "  c: number | null;",
      "  d?: number;",
      "  e: unknown;",
      "  f: any;",
      "  g: never;",
      "}",
      "interface ByString { [key: string]: number; }",
      "type ByRecord = Record<string, number>;",
      "declare const foo: Foo;",
      "declare const byString: ByString;",
      "declare const byRecord: ByRecord;",
      "namespace M { export var n: boolean; }",
      "enum E { A }",
      "delete foo.a;",
      "delete foo.b;",
      "delete foo.c;",
      "delete foo.d;",
      "delete foo.e;",
      "delete foo.f;",
      "delete foo.g;",
      "delete foo.missing;",
      "delete byString.anything;",
      "delete byRecord.anything;",
      "delete M.n;",
      "delete E.A;",
      "delete E[\"A\"];",
      "delete foo;",
      "delete delete foo;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true, exactOptionalPropertyTypes: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [
      2790,
      2790,
      2339,
      2790,
      2704,
      2704,
      1102,
      2703,
      2703,
      1102,
      2703,
    ]);
  });

  it("uses exactOptionalPropertyTypes only when explicitly enabled for delete optionality", () => {
    const sourceFile = parseSourceFile([
      "interface Foo {",
      "  a: number;",
      "  b: number | undefined;",
      "  c?: number;",
      "  d?: number | undefined;",
      "}",
      "declare const foo: Foo;",
      "delete foo.a;",
      "delete foo.b;",
      "delete foo.c;",
      "delete foo.d;",
    ].join("\n"));

    assert.deepEqual(checkSourceFile(sourceFile, { strictNullChecks: true, exactOptionalPropertyTypes: false }).diagnostics.map(diagnostic => diagnostic.code), [2790]);
    assert.deepEqual(checkSourceFile(sourceFile, { strictNullChecks: true, exactOptionalPropertyTypes: true }).diagnostics.map(diagnostic => diagnostic.code), [2790, 2790]);
  });

  it("models Partial<T> as an optionalized object surface", () => {
    const sourceFile = parseSourceFile([
      "interface Foo {",
      "  a: number;",
      "  b?: string;",
      "}",
      "declare const partial: Partial<Foo>;",
      "delete partial.a;",
      "delete partial.b;",
      "delete partial.missing;",
      "const value: number = partial.a;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2339, 2322]);
  });

  it("uses declared Function interface properties as class-constructor apparent members", () => {
    const sourceFile = parseSourceFile([
      "interface Function { readonly name: string; }",
      "class Foo {}",
      "delete Foo.name;",
      "Foo.name = \"Bar\";",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2704, 2540]);
  });

  it("checks syntactic truthiness and nullish coalescing predicates", () => {
    const sourceFile = parseSourceFile([
      "declare const maybe: string | undefined;",
      "if (void 0) {}",
      "if (\"\") {}",
      "if (\"x\") {}",
      "if (/x/) {}",
      "if (2) {}",
      "if (undefined) {}",
      "function shadow(undefined: number) {",
      "  if (undefined) {}",
      "}",
      "function returnsVoid(): void {}",
      "if (returnsVoid()) {}",
      "if (maybe ? '' : null) {}",
      "if (maybe ? 'x' : []) {}",
      "const fallback = (maybe ?? \"fallback\") ?? \"never\";",
      "const always = (maybe ? undefined : null) ?? \"always\";",
      "const sometimes = (maybe ? undefined : 1) ?? \"ok\";",
      "const arithmetic = (1 + 2) ?? \"never\";",
      "const numeric = 0 ?? \"never\";",
      "const invertedNull = !null;",
      "const invertedObject = !{};",
      "const doubleBoolean = !!true;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [
      2873,
      2873,
      2872,
      2872,
      2872,
      2873,
      1345,
      2873,
      2872,
      2869,
      2871,
      2869,
      2869,
      2873,
      2872,
    ]);
  });

  it("reports uncalled non-nullable function conditions", () => {
    const sourceFile = parseSourceFile([
      "function basic(required: () => boolean, optional?: () => boolean) {",
      "  if (required) {}",
      "  if (optional) {}",
      "  if (!!required) {}",
      "  if (required()) {}",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2774]);
  });

  it("keeps optional parameter signatures distinct from parameter variable reads", () => {
    const sourceFile = parseSourceFile([
      "function foo(a?: string) {",
      "  if (a) a.toUpperCase();",
      "}",
      "foo(1);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Argument of type 'number' is not assignable to parameter of type 'string'.",
    ]);
  });

  it("normalizes boolean literal unions in type predicate returns", () => {
    const sourceFile = parseSourceFile([
      "function isDefined<T>(value: T | undefined | null | void): value is T {",
      "  return value !== undefined && value !== null;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("suppresses uncalled function conditions when the same value is used in the condition body", () => {
    const sourceFile = parseSourceFile([
      "declare function consume(callback: () => void): void;",
      "declare function consumeShadow(callback: (test: () => void) => void): void;",
      "function outer() {",
      "  function test() { return true; }",
      "  if (test) {}",
      "  if (test) { const fn = test; }",
      "  if (test) { test(); }",
      "  if (test) { consume(() => { test(); }); }",
      "  if (test) { consumeShadow(test => { test(); }); }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2774, 2774]);
  });

  it("matches uncalled function body usage by full property receiver", () => {
    const sourceFile = parseSourceFile([
      "interface Stats { isDirectory(): boolean; }",
      "interface Nested { stats: Stats; }",
      "function property(a: Nested, b: Nested) {",
      "  if (a.stats.isDirectory) {}",
      "  if (a.stats.isDirectory) { b.stats.isDirectory(); }",
      "  if (a.stats.isDirectory) { a.stats.isDirectory(); }",
      "  const chained = a.stats.isDirectory && a.stats.isDirectory();",
      "}",
      "class Foo {",
      "  maybeIsUser?: () => boolean;",
      "  isUser() { return true; }",
      "  test() {",
      "    if (this.isUser) {}",
      "    if (this.maybeIsUser) {}",
      "    if (this.isUser) { this.isUser(); }",
      "  }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strictNullChecks: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2774, 2774, 2774]);
  });

  it("reports writes to const bindings through assignments, updates, and destructuring", () => {
    const sourceFile = parseSourceFile([
      "declare const maybe: number | undefined;",
      "const x = 1;",
      "const { y } = { y: 2 };",
      "maybe!++;",
      "x = 2;",
      "++x;",
      "y = 3;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2588, 2588, 2588, 2588]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Cannot assign to 'maybe' because it is a constant.",
      "Cannot assign to 'x' because it is a constant.",
      "Cannot assign to 'x' because it is a constant.",
      "Cannot assign to 'y' because it is a constant.",
    ]);
  });

  it("requires non-ambient const declarations to have initializers outside for-in and for-of", () => {
    const sourceFile = parseSourceFile([
      "const a;",
      "const b: number;",
      "for (const key in {}) {}",
      "for (const value of []) {}",
      "for (const index; index < 1;) {}",
      "declare const ambient;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1155, 1155, 1155]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'const' declarations must be initialized.",
      "'const' declarations must be initialized.",
      "'const' declarations must be initialized.",
    ]);
  });

  it("reports lexical and type declarations in unbraced statement bodies", () => {
    const sourceFile = parseSourceFile([
      "declare const flag: boolean;",
      "if (flag) const c = 0; else let l = 0;",
      "while (flag) label: const nested = 0;",
      "do type Alias = string; while (flag);",
      "if (flag) interface Shape { value: string; }",
      "if (flag) { const ok = 0; type Ok = string; interface Fine { value: string; } }",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { alwaysStrict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1156, 1156, 1156, 1156, 1156]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'const' declarations can only be declared inside a block.",
      "'let' declarations can only be declared inside a block.",
      "'const' declarations can only be declared inside a block.",
      "'type' declarations can only be declared inside a block.",
      "'interface' declarations can only be declared inside a block.",
    ]);
  });

  it("reports missing shorthand property values with the shorthand diagnostic", () => {
    const sourceFile = parseSourceFile("const make = () => ({ arguments });");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [18004]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "No value exists in scope for the shorthand property 'arguments'. Either declare one or provide an initializer.",
    ]);
  });

  it("forbids arguments in class field initializers and static blocks while allowing nested functions", () => {
    const sourceFile = parseSourceFile([
      "function outer() {",
      "  return class T {",
      "    a = arguments;",
      "    b = () => arguments;",
      "    c = function () { return arguments; };",
      "    static { arguments; function f() { return arguments; } }",
      "  };",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es2015", strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2815, 2815, 2815]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "'arguments' cannot be referenced in property initializers or class static initialization blocks.",
      "'arguments' cannot be referenced in property initializers or class static initialization blocks.",
      "'arguments' cannot be referenced in property initializers or class static initialization blocks.",
    ]);
  });

  it("accepts TypeScript constant ambient const initializers and literal enum references", () => {
    const sourceFile = parseSourceFile([
      "declare namespace Foo {",
      "  enum Bar { a = `1`, b = '2', c = '3' }",
      "  export const a = 'string';",
      "  export const b = `template`; ",
      "  export const c = 1;",
      "  export const d = true;",
      "  export const e = Bar.a;",
      "  export const f = Bar['b'];",
      "  export const g = Bar[`c`];",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("reports invalid ambient initializers and non-constant ambient enum members", () => {
    const sourceFile = parseSourceFile("declare let value = 1; declare const invalid = 1 + 2; declare enum E { A = 1, B = Math.random() }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1039, 1254, 1066]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Initializers are not allowed in ambient contexts.",
      "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
      "In ambient enum declarations member initializer must be constant expression.",
    ]);
  });

  it("reports ambient runtime statements with TS-Go statement context diagnostics", () => {
    const sourceFile = parseSourceFile([
      "declare namespace M {",
      "  break;",
      "  continue;",
      "  return;",
      "  with ({}) { }",
      "  label: var item;",
      "  switch (item) { case 1: break; default: break; }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { alwaysStrict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1036, 1104, 1108, 1101, 2410, 1344]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Statements are not allowed in ambient contexts.",
      "A 'continue' statement can only be used within an enclosing iteration statement.",
      "A 'return' statement can only be used within a function body.",
      "'with' statements are not allowed in strict mode.",
      "The 'with' statement is not supported. All symbols in a 'with' block will have type 'any'.",
      "A label is not allowed here.",
    ]);
  });

  it("uses contextual object method types and preserved generic alias display for assignments", () => {
    const sourceFile = parseSourceFile([
      "type WatchHandler<T> = (value: T) => void;",
      "interface Shape { data2: WatchHandler<any>; }",
      "const shape: Shape = {",
      "  data(value) { this.data2 = 1; },",
      "  data2(value) { }",
      "};",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { noImplicitAny: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2353, 7006, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Object literal may only specify known properties, and 'data' does not exist in type 'Shape'.",
      "Parameter 'value' implicitly has an 'any' type.",
      "Type 'number' is not assignable to type 'WatchHandler<any>'.",
    ]);
  });

  it("checks calls against inferred generic parameter substitutions", () => {
    const sourceFile = parseSourceFile("function id<T>(value: T): T { return value; } const ok: number = id(1); const bad: string = id(1);");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'number' is not assignable to type 'string'."]);
  });

  it("lazily substitutes instantiated class member property types", () => {
    const sourceFile = parseSourceFile([
      "class Box<T> { value!: T; get(): T { return this.value; } }",
      "const box = new Box<string>();",
      "const fromProperty: number = box.value;",
      "const fromMethod: number = box.get();",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'string' is not assignable to type 'number'.",
      "Type 'string' is not assignable to type 'number'.",
    ]);
  });

  it("substitutes inherited generic class member property types from heritage type arguments", () => {
    const sourceFile = parseSourceFile([
      "class Item { name = ''; }",
      "class Base<T extends Item> { byKey!: { [key: string]: T }; }",
      "class View extends Base<Item> {",
      "  fill(item: Item) { this.byKey['dummy'] = item; }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("contextually types function expression callback parameters from array methods", () => {
    const sourceFile = parseSourceFile("class Ship { isSunk = false; } class Board { ships: Ship[] = []; allShipsSunk() { return this.ships.every(function (value) { return value.isSunk; }); } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics, []);
  });

  it("checks rest call arguments against the rest element type", () => {
    const sourceFile = parseSourceFile("function panic(value: string[], ...rest: string[]) { } panic([], 'one', 'two'); panic([], 1);");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2345]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Argument of type 'number' is not assignable to parameter of type 'string'."]);
  });

  it("checks spread call arguments using the spread element type", () => {
    const sourceFile = parseSourceFile([
      "interface NodeArray<T extends Node> extends ReadonlyArray<T> {}",
      "interface Node {",
      "  forEachChild<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;",
      "}",
      "declare function toArray<T>(value: T | T[]): T[];",
      "declare function toArray<T>(value: T | readonly T[]): readonly T[];",
      "function flatMapChildren<T>(node: Node, cb: (child: Node) => readonly T[] | T | undefined): readonly T[] {",
      "  const result: T[] = [];",
      "  node.forEachChild(child => {",
      "    const value = cb(child);",
      "    if (value !== undefined) {",
      "      result.push(...toArray(value));",
      "    }",
      "  });",
      "  return result;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("checks Function.apply argument arrays against parameter tuples", () => {
    const sourceFile = parseSourceFile("function f(value) { arguments; } /** @param {IArguments} args */ function g(args) { f.apply(null, args); }", { fileName: "foo.js" });
    const result = checkSourceFile(sourceFile, { allowJs: true, checkJs: true, strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2345]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Argument of type 'IArguments' is not assignable to parameter of type '[value?: any, ...any[]]'.",
    ]);
  });

  it("assigns non-nullish structural values to empty object-like targets", () => {
    const sourceFile = parseSourceFile("interface Empty { } function accept(value: Empty) { } accept([]); accept(1); accept(null);");
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2345]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Argument of type 'null' is not assignable to parameter of type 'Empty'."]);
  });

  it("does not reject abstract instance property access from ordinary methods", () => {
    const sourceFile = parseSourceFile("abstract class Base { abstract value: string; method() { return this.value; } constructor() { this.value; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2715]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Abstract property 'value' in class 'Base' cannot be accessed in the constructor."]);
  });

  it("reports omitted type arguments for built-in generic type references", () => {
    const sourceFile = parseSourceFile("function f(items: Array, values: Record) { }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2314, 2314]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Generic type 'Array<T>' requires 1 type argument(s).",
      "Generic type 'Record<K, T>' requires 2 type argument(s).",
    ]);
  });

  it("checks declared generic type reference arity with defaults", () => {
    const sourceFile = parseSourceFile([
      "interface Box<T> { value: T }",
      "interface Pair<T, U = string> { first: T; second: U }",
      "type Alias<T> = T;",
      "type AliasPair<T, U = string> = T | U;",
      "class Holder<T> { value!: T }",
      "class DefaultHolder<T = string> { value!: T }",
      "let a: Box;",
      "let b: Box<string, number>;",
      "let c: Pair;",
      "let d: Pair<number, string, boolean>;",
      "let e: Alias;",
      "let f: AliasPair<number, string, boolean>;",
      "let g: Holder;",
      "let h: Holder<number, string>;",
      "let i: DefaultHolder;",
      "class ImplementsBox implements Box { value!: string }",
      "interface ExtendsBox extends Box {}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2314, 2314, 2707, 2707, 2314, 2707, 2314, 2314, 2314, 2314]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Generic type 'Box<T>' requires 1 type argument(s).",
      "Generic type 'Box<T>' requires 1 type argument(s).",
      "Generic type 'Pair<T, U>' requires between 1 and 2 type arguments.",
      "Generic type 'Pair<T, U>' requires between 1 and 2 type arguments.",
      "Generic type 'Alias' requires 1 type argument(s).",
      "Generic type 'AliasPair' requires between 1 and 2 type arguments.",
      "Generic type 'Holder<T>' requires 1 type argument(s).",
      "Generic type 'Holder<T>' requires 1 type argument(s).",
      "Generic type 'Box<T>' requires 1 type argument(s).",
      "Generic type 'Box<T>' requires 1 type argument(s).",
    ]);
  });

  it("reports invalid element access index types through union members", () => {
    const sourceFile = parseSourceFile("declare const keys: (string | string[])[]; declare const values: number[]; values[keys[0]];");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2538]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'string[]' cannot be used as an index type."]);
  });

  it("reports invalid indexed-access type index types", () => {
    const sourceFile = parseSourceFile("type Bad = any[[]];");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2538]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type '[]' cannot be used as an index type."]);
  });

  it("accepts literal indexed-access type indexes", () => {
    const sourceFile = parseSourceFile("type Picked = { value: number }[\"value\"]; const value: Picked = 1;");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("contextually types tuple return array literals", () => {
    const sourceFile = parseSourceFile("function f(): [boolean, string, number] { let x: any, y: any, z: any; return [z, y, x]; }");
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.equal(result.diagnostics.length, 0);
  });

  it("allows array-to-tuple assertions when element types overlap", () => {
    const sourceFile = parseSourceFile("function f(): [any, any, any] { let result = []; return <[any, any, any]>result; }");
    const result = checkSourceFile(sourceFile, { strict: true });

    assert.equal(result.diagnostics.length, 0);
  });

  it("relates mutable arrays and array subclasses to readonly arrays through element types", () => {
    const sourceFile = parseSourceFile([
      "class A { a!: string; }",
      "class B extends A { b!: string; }",
      "class C<T> extends Array<T> { c!: string; }",
      "declare let ara: A[];",
      "declare let arb: B[];",
      "declare let cra: C<A>;",
      "declare let crb: C<B>;",
      "declare let rra: ReadonlyArray<A>;",
      "declare let rrb: ReadonlyArray<B>;",
      "rra = ara;",
      "rrb = arb;",
      "rra = arb;",
      "rrb = ara;",
      "rra = cra;",
      "rra = crb;",
      "rrb = crb;",
      "rrb = cra;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'A[]' is not assignable to type 'readonly B[]'.",
      "Type 'C<A>' is not assignable to type 'readonly B[]'.",
    ]);
  });

  it("does not assign readonly arrays to mutable array targets", () => {
    const sourceFile = parseSourceFile("declare let readonlyValues: ReadonlyArray<number>; declare let mutableValues: number[]; mutableValues = readonlyValues;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'readonly number[]' is not assignable to type 'number[]'."]);
  });

  it("compares object property sets structurally instead of accepting every object kind", () => {
    const sourceFile = parseSourceFile([
      "const invalid = <{ id: number }[]>[{ foo: 's' }];",
      "const valid = <{ id: number }[]>[{ foo: 's' }, {}];",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2352]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Conversion of type '{ foo: string; }[]' to type '{ id: number; }[]' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
    ]);
  });

  it("reports too few call arguments using required parameter count", () => {
    const sourceFile = parseSourceFile("function f(a: string, b: number, { c }: { c: boolean }) { } function g(a: string, b?: number, c?: boolean) { } f('', 0); g('');");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2554]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Expected 3 arguments, but got 2."]);
  });

  it("reports too many call arguments using maximum parameter count", () => {
    const sourceFile = parseSourceFile("function f(a: string) { } function g(a?: string, b?: number) { } f('', 0); g('', 1, true);");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2554, 2554]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Expected 1 arguments, but got 2.",
      "Expected 0-2 arguments, but got 3.",
    ]);
  });

  it("reports too many JavaScript call arguments unless the function owns arguments", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "foo.js") {
          return "function f(x) { function nested() { return arguments.length; } return x; }";
        }
        return fileName === "bar.ts" ? "f(1, 2, 3);" : undefined;
      },
    };
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: true, strict: false, noEmit: true }, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2554]);
    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.message), ["Expected 0-1 arguments, but got 3."]);
  });

  it("checks JavaScript argument ownership through deeply nested expressions iteratively", () => {
    let expression = "x";
    for (let index = 0; index < 160; index += 1) {
      expression = `(x = ${expression} + ${index} | 0)`;
    }
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "foo.js") {
          return `function f(x) { ${expression}; return x; }`;
        }
        return fileName === "bar.ts" ? "f(1, 2, 3);" : undefined;
      },
    };
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: true, strict: false, noEmit: true }, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2554]);
  });

  it("treats unannotated JavaScript parameters as optional call arguments", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "foo.js") {
          return "function f(a, b, c) { return arguments.length; }";
        }
        return fileName === "bar.ts" ? "f(); f(1); f(1, 2); f(1, 2, 3);" : undefined;
      },
    };
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: true, strict: false, noEmit: true }, host);
    const diagnostics = checkProgram(program);

    assert.equal(diagnostics.length, 0);
  });

  it("reports JavaScript implicit any parameters only when checkJs participates", () => {
    const sourceFile = parseSourceFile("function f(a, b) { return a || b; }", { fileName: "foo.js" });
    const checked = checkSourceFile(sourceFile, { allowJs: true, checkJs: true, strict: true, noImplicitAny: true });
    const unchecked = checkSourceFile(sourceFile, { allowJs: true, checkJs: false, strict: true, noImplicitAny: true });

    assert.deepEqual(checked.diagnostics.map(diagnostic => diagnostic.code), [7006, 7006]);
    assert.deepEqual(checked.diagnostics.map(diagnostic => diagnostic.message), [
      "Parameter 'a' implicitly has an 'any' type.",
      "Parameter 'b' implicitly has an 'any' type.",
    ]);
    assert.equal(unchecked.diagnostics.length, 0);
  });

  it("declares JavaScript CommonJS module variables only after a CommonJS indicator", () => {
    const sourceFile = parseSourceFile([
      "function fn() {}",
      "if (typeof module === 'object' && module.exports) {",
      "  module.exports = fn;",
      "}",
      "exports.named = fn;",
      "Object.defineProperty(exports, 'defined', { value: fn });",
    ].join("\n"), { fileName: "foo.js" });
    const result = checkSourceFile(sourceFile, { allowJs: true, checkJs: true, strict: true });

    assert.deepEqual(result.diagnostics, []);
  });

  it("reports plain JavaScript grammar diagnostics while suppressing unchecked type diagnostics", () => {
    const sourceFile = parseSourceFile([
      "break;",
      "continue;",
      "class A { method() { const arguments = missing; } }",
    ].join("\n"), { fileName: "foo.js" });
    const result = checkSourceFile(sourceFile, { allowJs: true, checkJs: false, strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [1105, 1104, 1210]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "A 'break' statement can only be used within an enclosing iteration or switch statement.",
      "A 'continue' statement can only be used within an enclosing iteration statement.",
      "Code contained in a class is evaluated in JavaScript's strict mode which does not allow this use of 'arguments'. For more information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode.",
    ]);
  });

  it("suppresses unchecked JavaScript semantic diagnostics while keeping program symbols", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "foo.js") {
          return "function f(x) { return missing + x; }";
        }
        return fileName === "bar.ts" ? "f(1, 2);" : undefined;
      },
    };
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: false, strict: false, noEmit: true }, host);
    const diagnostics = checkProgram(program);

    assert.deepEqual(diagnostics.map(diagnostic => diagnostic.code), [2554]);
  });

  it("checks for-of iterability against target and array/string rules", () => {
    const sourceFile = parseSourceFile([
      "declare const args: IArguments;",
      "declare const value: number;",
      "declare const obj: { foo: string };",
      "function f() {",
      "  for (const item of args) { item; }",
      "  for (const item of value) { item; }",
      "  for (const item of obj) { item; }",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es5" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2802, 2495, 2495]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'IArguments' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.",
      "Type 'number' is not an array type or a string type.",
      "Type '{ foo: string; }' is not an array type or a string type.",
    ]);
  });

  it("checks destructuring and spread iterability through the shared iteration rule", () => {
    const sourceFile = parseSourceFile([
      "declare const args: IArguments;",
      "declare const numbers: Iterable<number>;",
      "function f() {",
      "  const [first] = args;",
      "  ((...items: number[]) => items)(...numbers);",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { target: "es5" });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2802, 2802]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'IArguments' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.",
      "Type 'Iterable<number>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.",
    ]);
  });

  it("contextually checks array literal object elements for excess properties", () => {
    const sourceFile = parseSourceFile("class Action { id!: number; } var actions: Action[] = [{ id: 2, name: 'extra' }]; var shapes: { id: number }[] = [{ id: 3, trueness: false }];");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2353, 2353]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Object literal may only specify known properties, and 'name' does not exist in type 'Action'.",
      "Object literal may only specify known properties, and 'trueness' does not exist in type '{ id: number; }'.",
    ]);
  });

  it("preserves instantiated interface type arguments in diagnostics", () => {
    const sourceFile = parseSourceFile([
      "interface Pair<T, U> { first: T; second?: U; }",
      "const pair: Pair<number, string> = { first: 1, second: 'x' };",
      "const target: { second: number } = pair;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'Pair<number, string>' is not assignable to type '{ second: number; }'.",
    ]);
  });

  it("displays single call and construct signature object types as signatures", () => {
    const sourceFile = parseSourceFile([
      "interface Pair<T, U> { first: T; }",
      "declare const pair: Pair<number, string>;",
      "let callTarget: { <TValue>(value: TValue): TValue };",
      "let constructTarget: { new <TValue>(value: TValue); };",
      "callTarget = pair;",
      "constructTarget = pair;",
    ].join("\n"), { fileName: "signatures.ts" });
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'Pair<number, string>' is not assignable to type '<TValue>(value: TValue) => TValue'.",
      "Type 'Pair<number, string>' is not assignable to type 'new <TValue>(value: TValue) => any'.",
    ]);
  });

  it("checks class constructor values against construct signatures", () => {
    const sourceFile = parseSourceFile([
      "class Base { }",
      "class NeedsArgument extends Base { constructor(value: number) { super(); } }",
      "const direct: { new(): NeedsArgument } = NeedsArgument;",
      "const baseConstructor: typeof Base = NeedsArgument;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322, 2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'typeof NeedsArgument' is not assignable to type 'new () => NeedsArgument'.",
      "Type 'typeof NeedsArgument' is not assignable to type 'typeof Base'.",
    ]);
  });

  it("uses function apparent call and apply members for structural assignment", () => {
    const sourceFile = parseSourceFile([
      "interface Callable { call(value: any); }",
      "interface Applicable { apply(value: any); }",
      "declare function f(): void;",
      "const callable: Callable = f;",
      "const applicable: Applicable = f;",
    ].join("\n"), { fileName: "function-members.ts" });
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.equal(result.diagnostics.length, 0);
  });

  it("requires declared interface index support for numeric index targets", () => {
    const sourceFile = parseSourceFile([
      "interface Named { one: number; }",
      "interface StringIndexed { [key: string]: number; one: number; }",
      "declare const named: Named;",
      "declare const stringIndexed: StringIndexed;",
      "let anyStringIndex: { [key: string]: any } = named;",
      "let numberIndex: { [index: number]: number } = named;",
      "let numberIndexFromStringIndex: { [index: number]: number } = stringIndexed;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'Named' is not assignable to type '{ [index: number]: number; }'.",
    ]);
  });

  it("models standard TemplateStringsArray merging with source classes", () => {
    const sourceFile = parseSourceFile([
      "class TemplateStringsArray {}",
      "function f(value: TemplateStringsArray): void {}",
      "f({});",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2345]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Argument of type '{}' is not assignable to parameter of type 'TemplateStringsArray'.",
    ]);
  });

  it("models RegExp match and exec array library surfaces", () => {
    const sourceFile = parseSourceFile([
      "function f(matchResult: RegExpMatchArray, execResult: RegExpExecArray): void {",
      "  execResult.slice();",
      "  execResult = matchResult;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'RegExpMatchArray' is not assignable to type 'RegExpExecArray'.",
    ]);
  });

  it("checks generator yields against IterableIterator element types", () => {
    const sourceFile = parseSourceFile("function* f(): IterableIterator<number> { yield; yield 1; }");
    const result = checkSourceFile(sourceFile, { target: "es2015", strict: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Type 'undefined' is not assignable to type 'number'.",
    ]);
  });

  it("models ES5 Math as a standard namespace surface", () => {
    const sourceFile = parseSourceFile("const value = Math.pow(Math.floor(Math.PI), 2) + Math.abs(-1);");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("reports side-effect-free comma operator left operands", () => {
    const sourceFile = parseSourceFile([
      "declare function effect(): void;",
      "(1, 2);",
      "((true ? 1 : 2), 3);",
      "(effect(), 4);",
      "(0, eval)(\"1\");",
      "(void 0, 5);",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { allowUnreachableCode: false });
    const suppressed = checkSourceFile(sourceFile, { allowUnreachableCode: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2695, 2695]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Left side of comma operator is unused and has no side effects.",
      "Left side of comma operator is unused and has no side effects.",
    ]);
    assert.equal(suppressed.diagnostics.length, 0);
  });

  it("reports unreachable executable statements after terminating flow", () => {
    const sourceFile = parseSourceFile([
      "function f(value: boolean): void {",
      "  if (value) {",
      "    return;",
      "    value = false;",
      "  } else {",
      "    throw new Error();",
      "    const afterThrow = 1;",
      "  }",
      "}",
      "for (;;) {",
      "  break;",
      "}",
      "for (;;) {",
      "  continue;",
      "}",
      "const afterLoop = 1;",
    ].join("\n"));
    const result = checkSourceFile(sourceFile, { allowUnreachableCode: false });
    const suppressed = checkSourceFile(sourceFile, { allowUnreachableCode: true });

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [7027, 7027, 7027]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Unreachable code detected.",
      "Unreachable code detected.",
      "Unreachable code detected.",
    ]);
    assert.equal(suppressed.diagnostics.length, 0);
  });

  it("rejects class type parameters throughout static member type scopes", () => {
    const sourceFile = parseSourceFile([
      "class Box<T> {",
      "  static value: T;",
      "  static method(argument: T): T { return argument; }",
      "  static field = (argument: T) => argument;",
      "  static expression = function (argument: T) { return argument; };",
      "  static shadow<T>(argument: T): T { return argument; }",
      "  static functionType: <T>(argument: T) => T;",
      "}",
    ].join("\n"));
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2302, 2302, 2302, 2302, 2302]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Static members cannot reference class type parameters.",
      "Static members cannot reference class type parameters.",
      "Static members cannot reference class type parameters.",
      "Static members cannot reference class type parameters.",
      "Static members cannot reference class type parameters.",
    ]);
  });
});
