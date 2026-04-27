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

  it("reports missing this-property access with deterministic class-member suggestions", () => {
    const sourceFile = parseSourceFile("class B { methodB() { this.methodA; this.methodB; } }");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Property 'methodA' does not exist on type 'B'. Did you mean 'methodB'?"]);
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
      "const fromImplicitAny = ({ value }): string => value;",
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

  it("reports function overload declarations without matching implementations", () => {
    const sourceFile = parseSourceFile("function foo(); function bar() { } function baz();");
    const result = checkSourceFile(sourceFile);

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

  it("reports typed variable reads before assignment", () => {
    const sourceFile = parseSourceFile("interface Shape { value: number; } let value: number; var shape: Shape; const first = value; const second = shape;");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), [
      "Variable 'value' is used before being assigned.",
      "Variable 'shape' is used before being assigned.",
    ]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2454, 2454]);
  });

  it("disables definite-assignment diagnostics when strict null checks are off", () => {
    const sourceFile = parseSourceFile("class C { value: number; } var item: C; item;");
    const result = checkSourceFile(sourceFile, { strict: false });

    assert.equal(result.diagnostics.length, 0);
  });

  it("marks simple assignment targets as assigned without reading the target first", () => {
    const sourceFile = parseSourceFile("let value: number; value = 1; const copy: number = value;");
    const result = checkSourceFile(sourceFile);

    assert.equal(result.diagnostics.length, 0);
  });

  it("still reads compound assignment targets before assignment", () => {
    const sourceFile = parseSourceFile("let value: number; value += 1; const copy = value;");
    const result = checkSourceFile(sourceFile);

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
    const result = checkSourceFile(sourceFile, { target: "es5" });

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
    const boxedResult = checkSourceFile(boxedNumberSource);
    const genericResult = checkSourceFile(genericSource);

    assert.deepEqual(boxedResult.diagnostics.map(diagnostic => diagnostic.code), [
      2454, 2454, 2365,
      2454, 2454, 2362, 2363,
      2454, 2454, 2362, 2363,
      2454, 2454, 2362, 2363,
    ]);
    assert.deepEqual(genericResult.diagnostics.map(diagnostic => diagnostic.code), [2365, 2362, 2363]);
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
    const result = checkSourceFile(sourceFile, { strict: false });

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
    const result = checkSourceFile(sourceFile);

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
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: true, strict: false }, host);
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
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: true, strict: false }, host);
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
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: true, strict: false }, host);
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
    const program = createProgram(["foo.js", "bar.ts"], { allowJs: true, checkJs: false, strict: false }, host);
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
});
