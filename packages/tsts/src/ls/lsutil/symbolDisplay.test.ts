import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  NodeFlags,
  NodeObject,
  SymbolFlags,
  createIdentifier,
  type BindingElement,
  type ClassExpression,
  type Node,
  type ParameterDeclaration,
  type Symbol,
  type VariableDeclaration,
} from "../../ast/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import { parseSourceFile } from "../../parser/index.js";
import {
  FileExtensionKindModifiers,
  ScriptElementKindClassElement,
  ScriptElementKindConstElement,
  ScriptElementKindFunctionElement,
  ScriptElementKindLetElement,
  ScriptElementKindLocalClassElement,
  ScriptElementKindLocalFunctionElement,
  ScriptElementKindMemberFunctionElement,
  ScriptElementKindMemberVariableElement,
  ScriptElementKindModifierDeprecated,
  ScriptElementKindModifierDts,
  ScriptElementKindModifierOptional,
  ScriptElementKindModifierPublic,
  ScriptElementKindModifierStatic,
  ScriptElementKindModifierTs,
  ScriptElementKindParameterElement,
  ScriptElementKindVariableElement,
  getSymbolKind,
  getSymbolModifiers,
  isFirstDeclarationOfSymbolParameter,
  scriptElementKindModifierStrings,
} from "./symbolDisplay.js";

function findNode<T extends Node>(text: string, predicate: (node: Node) => node is T): T {
  const sourceFile = parseSourceFile(text);
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
  visit(sourceFile);
  if (found === undefined) throw new Error("Expected test node was not found");
  return found;
}

function symbolWith(flags: SymbolFlags, declaration: Node, valueDeclaration: Node | undefined = declaration): Symbol {
  return {
    name: "value",
    escapedName: "value",
    flags,
    declarations: [declaration],
    valueDeclaration,
  };
}

export class SymbolDisplayTests {
  modifier_values_and_strings_follow_tsgo_iota_order(): void {
    Assert.Equal(2, ScriptElementKindModifierPublic);
    Assert.Equal(64, ScriptElementKindModifierStatic);
    Assert.Equal(1024, ScriptElementKindModifierDts);

    const strings = scriptElementKindModifierStrings(
      ScriptElementKindModifierPublic | ScriptElementKindModifierStatic | ScriptElementKindModifierTs,
    );
    Assert.True(strings.has("public"));
    Assert.True(strings.has("static"));
    Assert.True(strings.has(".ts"));
    Assert.False(strings.has("private"));

    Assert.True((FileExtensionKindModifiers & ScriptElementKindModifierDts) !== 0);
    Assert.True((FileExtensionKindModifiers & ScriptElementKindModifierTs) !== 0);
    Assert.False((FileExtensionKindModifiers & ScriptElementKindModifierPublic) !== 0);
  }

  symbol_kind_distinguishes_variable_storage_forms(): void {
    const constDeclaration = findNode("const answer = 42;", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);
    const letDeclaration = findNode("let current = 1;", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);
    const varDeclaration = findNode("var globalValue = 1;", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);

    Assert.Equal(ScriptElementKindConstElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Variable, constDeclaration), constDeclaration));
    Assert.Equal(ScriptElementKindLetElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Variable, letDeclaration), letDeclaration));
    Assert.Equal(ScriptElementKindVariableElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Variable, varDeclaration), varDeclaration));
  }

  symbol_kind_distinguishes_local_and_top_level_functions(): void {
    const localFunction = findNode(
      "function outer() { function inner() { return 1; } }",
      (node): node is Node => node.kind === Kind.FunctionDeclaration && node.parent?.kind !== Kind.SourceFile,
    );
    const topLevelFunction = findNode(
      "function outer() { return 1; }",
      (node): node is Node => node.kind === Kind.FunctionDeclaration,
    );

    Assert.Equal(ScriptElementKindLocalFunctionElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Function, localFunction), localFunction));
    Assert.Equal(ScriptElementKindFunctionElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Function, topLevelFunction), topLevelFunction));
  }

  symbol_kind_uses_class_expression_declaration_for_local_class(): void {
    const classExpression = findNode(
      "const C = class Local {};",
      (node): node is ClassExpression => node.kind === Kind.ClassExpression,
    );
    const classDeclaration = findNode(
      "class Declared {}",
      (node): node is Node => node.kind === Kind.ClassDeclaration,
    );

    Assert.Equal(ScriptElementKindLocalClassElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Class, classExpression), classExpression));
    Assert.Equal(ScriptElementKindClassElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Class, classDeclaration), classDeclaration));
  }

  symbol_kind_follows_method_and_property_priority(): void {
    const property = new NodeObject(Kind.PropertyDeclaration, { name: createIdentifier("member") });
    const method = new NodeObject(Kind.MethodDeclaration, { name: createIdentifier("method") });

    Assert.Equal(ScriptElementKindMemberFunctionElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Method, method), method));
    Assert.Equal(ScriptElementKindMemberVariableElement, getSymbolKind(undefined, symbolWith(SymbolFlags.Property, property), property));
  }

  first_declaration_parameter_walks_binding_patterns(): void {
    const parameter = findNode(
      "function f({ value }: { value: string }) { return value; }",
      (node): node is ParameterDeclaration => node.kind === Kind.Parameter,
    );
    const bindingElement = findNode(
      "function f({ value }: { value: string }) { return value; }",
      (node): node is BindingElement => node.kind === Kind.BindingElement,
    );
    const variable = findNode("const value = 1;", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);

    Assert.True(isFirstDeclarationOfSymbolParameter(symbolWith(SymbolFlags.Variable, parameter)));
    Assert.True(isFirstDeclarationOfSymbolParameter(symbolWith(SymbolFlags.Variable, bindingElement)));
    Assert.False(isFirstDeclarationOfSymbolParameter(symbolWith(SymbolFlags.Variable, variable)));
  }

  symbol_modifiers_merge_node_and_symbol_flags(): void {
    const property = new NodeObject(Kind.PropertyDeclaration, {
      name: createIdentifier("member"),
      modifierFlags: ModifierFlags.Public | ModifierFlags.Static,
    });
    const symbol = symbolWith(SymbolFlags.Property | SymbolFlags.Optional, property);

    const modifiers = getSymbolModifiers(undefined, symbol);
    Assert.True((modifiers & ScriptElementKindModifierPublic) !== 0);
    Assert.True((modifiers & ScriptElementKindModifierStatic) !== 0);
    Assert.True((modifiers & ScriptElementKindModifierOptional) !== 0);
  }

  symbol_modifiers_omit_deprecated_when_overload_has_non_deprecated_declaration(): void {
    const deprecated = new NodeObject(Kind.FunctionDeclaration, {
      name: createIdentifier("fn"),
      flags: NodeFlags.PossiblyContainsDeprecatedTag,
      jsDoc: [
        new NodeObject(Kind.JSDoc, {
          tags: [new NodeObject(Kind.JSDocDeprecatedTag, { tagName: createIdentifier("deprecated") })],
        }),
      ],
    });
    const current = new NodeObject(Kind.FunctionDeclaration, { name: createIdentifier("fn") });
    const symbol: Symbol = {
      name: "fn",
      escapedName: "fn",
      flags: SymbolFlags.Function,
      declarations: [deprecated, current],
      valueDeclaration: deprecated,
    };

    Assert.Equal(0, getSymbolModifiers(undefined, symbol) & ScriptElementKindModifierDeprecated);
  }
}

A<SymbolDisplayTests>().method((t) => t.modifier_values_and_strings_follow_tsgo_iota_order).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.symbol_kind_distinguishes_variable_storage_forms).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.symbol_kind_distinguishes_local_and_top_level_functions).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.symbol_kind_uses_class_expression_declaration_for_local_class).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.symbol_kind_follows_method_and_property_priority).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.first_declaration_parameter_walks_binding_patterns).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.symbol_modifiers_merge_node_and_symbol_flags).add(FactAttribute);
A<SymbolDisplayTests>().method((t) => t.symbol_modifiers_omit_deprecated_when_overload_has_non_deprecated_declaration).add(FactAttribute);
