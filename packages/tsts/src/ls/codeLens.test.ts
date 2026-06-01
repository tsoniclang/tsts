import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  type FunctionDeclaration,
  type InterfaceDeclaration,
  type MethodDeclaration,
  type MethodSignatureDeclaration,
  type Node,
  type SourceFile,
  type Symbol,
} from "../ast/index.js";
import { parseSourceFile } from "../parser/index.js";
import {
  CodeLensKindImplementations,
  CodeLensKindReferences,
  type CodeLens,
  type Location,
  type Position,
} from "../lsp/lsproto/index.js";
import {
  createCodeLensUserPreferences,
  type CodeLensUserPreferences,
} from "./lsutil/index.js";
import {
  isValidImplementationsCodeLensNode,
  isValidReferenceLensNode,
  newCodeLensForNode,
  provideCodeLenses,
  resolveCodeLens,
  type CodeLensLanguageService,
} from "./codeLens.js";

class CodeLensConverters {
  readonly lineStarts: readonly number[];

  constructor(text: string) {
    const starts: number[] = [0];
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === "\n") starts.push(index + 1);
    }
    this.lineStarts = starts;
  }

  positionToLineAndCharacter(_file: SourceFile, position: number): Position {
    let line = 0;
    for (let index = 0; index < this.lineStarts.length; index += 1) {
      if (this.lineStarts[index]! <= position) line = index;
    }
    return { line, character: position - this.lineStarts[line]! };
  }
}

class CodeLensService implements CodeLensLanguageService {
  readonly file: SourceFile;
  readonly converters: CodeLensConverters;
  readonly preferences: CodeLensUserPreferences;

  constructor(text: string, preferences: CodeLensUserPreferences) {
    this.file = parseSourceFile(text);
    this.converters = new CodeLensConverters(text);
    this.preferences = preferences;
  }

  getProgramAndFile(_documentUri: string): readonly [unknown, SourceFile] {
    return [{}, this.file];
  }

  userPreferences(): { readonly codeLens: CodeLensUserPreferences } {
    return { codeLens: this.preferences };
  }
}

function findNode<T extends Node>(file: SourceFile, predicate: (node: Node) => node is T): T {
  let found: T | undefined;
  const visit = (node: Node): boolean | undefined => {
    if (found !== undefined) return true;
    if (predicate(node)) {
      found = node;
      return true;
    }
    node.forEachChild(visit);
    return found !== undefined;
  };
  visit(file);
  if (found === undefined) throw new Error("Expected test node was not found");
  return found;
}

function findNodes<T extends Node>(file: SourceFile, predicate: (node: Node) => node is T): readonly T[] {
  const found: T[] = [];
  const visit = (node: Node): boolean | undefined => {
    if (predicate(node)) found.push(node);
    node.forEachChild(visit);
    return false;
  };
  visit(file);
  return found;
}

function assignSymbol(node: Node, name: string): Symbol {
  const symbol: Symbol = { name, escapedName: name, declarations: [node] };
  node.symbol = symbol;
  return symbol;
}

function referenceLocation(uri: string): Location {
  return {
    uri,
    range: {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 1 },
    },
  };
}

export class CodeLensTests {
  disabled_preferences_return_no_code_lenses(): void {
    const service = new CodeLensService(
      "export function sample() {}",
      createCodeLensUserPreferences(),
    );
    const functionNode = findNode(service.file, (node): node is FunctionDeclaration => node.kind === Kind.FunctionDeclaration);
    assignSymbol(functionNode, "sample");

    const response = provideCodeLenses(service, "file:///input.ts");

    Assert.Equal(undefined, response.codeLenses);
  }

  exported_function_receives_reference_lens(): void {
    const service = new CodeLensService(
      "export function sample() {}",
      createCodeLensUserPreferences({ referencesCodeLensEnabled: true }),
    );
    const functionNode = findNode(service.file, (node): node is FunctionDeclaration => node.kind === Kind.FunctionDeclaration);
    assignSymbol(functionNode, "sample");

    const response = provideCodeLenses(service, "file:///input.ts");

    Assert.Equal(1, response.codeLenses?.length);
    Assert.Equal(CodeLensKindReferences, response.codeLenses?.[0]?.data?.kind);
    Assert.Equal(0, response.codeLenses?.[0]?.range.start.line);
    Assert.Equal(service.file.text.indexOf("sample"), response.codeLenses?.[0]?.range.start.character);
  }

  overload_declarations_share_one_lens_for_the_same_symbol(): void {
    const service = new CodeLensService(
      "export function overloaded(x: string): void;\nexport function overloaded(x: number): void;\nexport function overloaded(x: string | number): void {}",
      createCodeLensUserPreferences({ referencesCodeLensEnabled: true }),
    );
    const functions = findNodes(service.file, (node): node is FunctionDeclaration => node.kind === Kind.FunctionDeclaration);
    const sharedSymbol = assignSymbol(functions[0]!, "overloaded");
    functions[1]!.symbol = sharedSymbol;
    functions[2]!.symbol = sharedSymbol;

    const response = provideCodeLenses(service, "file:///input.ts");

    Assert.Equal(1, response.codeLenses?.length);
  }

  implementation_lenses_follow_interface_and_method_preferences(): void {
    const service = new CodeLensService(
      "interface Shape { area(): number; }\nclass Box { method() {} private hidden() {} }",
      createCodeLensUserPreferences({
        implementationsCodeLensEnabled: true,
        implementationsCodeLensShowOnInterfaceMethods: true,
        implementationsCodeLensShowOnAllClassMethods: true,
      }),
    );
    const iface = findNode(service.file, (node): node is InterfaceDeclaration => node.kind === Kind.InterfaceDeclaration);
    const methodSignature = findNode(service.file, (node): node is MethodSignatureDeclaration => node.kind === Kind.MethodSignature);
    const methods = findNodes(service.file, (node): node is MethodDeclaration => node.kind === Kind.MethodDeclaration);

    Assert.True(isValidImplementationsCodeLensNode(iface, service.preferences));
    Assert.True(isValidImplementationsCodeLensNode(methodSignature, service.preferences));
    Assert.True(isValidImplementationsCodeLensNode(methods[0]!, service.preferences));
    Assert.False(isValidImplementationsCodeLensNode(methods[1]!, service.preferences));
  }

  reference_lens_validation_matches_export_and_member_rules(): void {
    const service = new CodeLensService(
      "function local() {}\nexport const value = 1;\ninterface Shape { area(): number; }",
      createCodeLensUserPreferences({
        referencesCodeLensEnabled: true,
        referencesCodeLensShowOnAllFunctions: false,
      }),
    );
    const localFunction = findNode(service.file, (node): node is FunctionDeclaration => node.kind === Kind.FunctionDeclaration);
    const variable = findNode(service.file, (node): node is Node => node.kind === Kind.VariableDeclaration);
    const methodSignature = findNode(service.file, (node): node is MethodSignatureDeclaration => node.kind === Kind.MethodSignature);

    Assert.False(isValidReferenceLensNode(localFunction, service.preferences));
    Assert.True(isValidReferenceLensNode(variable, service.preferences));
    Assert.True(isValidReferenceLensNode(methodSignature, service.preferences));
  }

  new_lens_uses_node_name_as_the_start_of_the_range(): void {
    const service = new CodeLensService(
      "export function sample() {}",
      createCodeLensUserPreferences({ referencesCodeLensEnabled: true }),
    );
    const functionNode = findNode(service.file, (node): node is FunctionDeclaration => node.kind === Kind.FunctionDeclaration);

    const lens = newCodeLensForNode(service, "file:///input.ts", service.file, functionNode, CodeLensKindReferences);

    Assert.Equal(service.file.text.indexOf("sample"), lens.range.start.character);
    Assert.Equal(CodeLensKindReferences, lens.data?.kind);
  }

  resolve_lens_sets_reference_title_and_show_locations_command(): void {
    const lens: CodeLens = {
      range: {
        start: { line: 0, character: 7 },
        end: { line: 0, character: 13 },
      },
      data: {
        kind: CodeLensKindReferences,
        uri: "file:///input.ts",
      },
    };

    const resolved = resolveCodeLens({
      showLocationsCommandName: "editor.showReferences",
      provideReferences: () => [referenceLocation("file:///a.ts"), referenceLocation("file:///b.ts")],
      provideImplementations: () => [],
    }, lens);

    Assert.Equal("2 references", resolved.command?.title);
    Assert.Equal("editor.showReferences", resolved.command?.command);
    Assert.Equal(3, resolved.command?.arguments?.length);
  }

  resolve_lens_sets_singular_implementation_title(): void {
    const lens: CodeLens = {
      range: {
        start: { line: 0, character: 0 },
        end: { line: 0, character: 5 },
      },
      data: {
        kind: CodeLensKindImplementations,
        uri: "file:///input.ts",
      },
    };

    const resolved = resolveCodeLens({
      provideReferences: () => [],
      provideImplementations: () => [referenceLocation("file:///impl.ts")],
    }, lens);

    Assert.Equal("1 implementation", resolved.command?.title);
    Assert.Equal("", resolved.command?.command);
  }
}

A<CodeLensTests>().method((t) => t.disabled_preferences_return_no_code_lenses).add(FactAttribute);
A<CodeLensTests>().method((t) => t.exported_function_receives_reference_lens).add(FactAttribute);
A<CodeLensTests>().method((t) => t.overload_declarations_share_one_lens_for_the_same_symbol).add(FactAttribute);
A<CodeLensTests>().method((t) => t.implementation_lenses_follow_interface_and_method_preferences).add(FactAttribute);
A<CodeLensTests>().method((t) => t.reference_lens_validation_matches_export_and_member_rules).add(FactAttribute);
A<CodeLensTests>().method((t) => t.new_lens_uses_node_name_as_the_start_of_the_range).add(FactAttribute);
A<CodeLensTests>().method((t) => t.resolve_lens_sets_reference_title_and_show_locations_command).add(FactAttribute);
A<CodeLensTests>().method((t) => t.resolve_lens_sets_singular_implementation_title).add(FactAttribute);
