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
    const result = checkSourceFile(sourceFile);

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

  it("uses resolved program module exports for namespace-import structural assignment", () => {
    const host: CompilerHost = {
      readFile: fileName => {
        if (fileName === "main.ts") {
          return [
            "import moduleA = require(\"./moduleA\");",
            "interface IHasVisualizationModel { VisualizationModel: any; }",
            "interface IHasTypedVisualizationModel { VisualizationModel: typeof moduleA.VisualizationModel; }",
            "const value: IHasVisualizationModel = moduleA;",
            "const typedValue: IHasTypedVisualizationModel = moduleA;",
            "declare const reverse: IHasVisualizationModel;",
            "const moduleLike: typeof moduleA = reverse;",
          ].join("\n");
        }
        if (fileName === "moduleA.ts") {
          return "export class VisualizationModel { }";
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
      "  continue;",
      "  return;",
      "  with ({}) { }",
      "  label: var item;",
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
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'number' is not assignable to type 'WatchHandler<any>'." ]);
  });

  it("checks calls against inferred generic parameter substitutions", () => {
    const sourceFile = parseSourceFile("function id<T>(value: T): T { return value; } const ok: number = id(1); const bad: string = id(1);");
    const result = checkSourceFile(sourceFile);

    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.code), [2322]);
    assert.deepEqual(result.diagnostics.map(diagnostic => diagnostic.message), ["Type 'number' is not assignable to type 'string'."]);
  });
});
