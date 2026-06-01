import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  SymbolFlags,
  type Node,
  type ParameterDeclaration,
  type Symbol,
  type VariableDeclaration,
} from "../ast/index.js";
import {
  ClassificationTypeNameClassName,
  ClassificationTypeNameEnumName,
  ClassificationTypeNameFieldName,
  ClassificationTypeNameIdentifier,
  ClassificationTypeNameInterfaceName,
  ClassificationTypeNameKeyword,
  ClassificationTypeNameLocalName,
  ClassificationTypeNameMethodName,
  ClassificationTypeNameModuleName,
  ClassificationTypeNameOperator,
  ClassificationTypeNameParameterName,
  ClassificationTypeNamePropertyName,
  ClassificationTypeNamePunctuation,
  ClassificationTypeNameString,
  ClassificationTypeNameText,
  ClassificationTypeNameTypeParameterName,
  ClassificationTypeNameWhiteSpace,
} from "../lsp/lsproto/index.js";
import { parseSourceFile } from "../parser/index.js";
import {
  classificationForSymbol,
  newDisplayPartsWriter,
} from "./displayPartsWriter.js";
import { isFirstDeclarationOfSymbolParameter } from "./lsutil/symbolDisplay.js";

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

function symbolWith(flags: SymbolFlags, declaration: Node): Symbol {
  return {
    name: "value",
    escapedName: "value",
    flags,
    declarations: [declaration],
  };
}

export class DisplayPartsWriterTests {
  plain_writer_collects_text_without_classified_runs(): void {
    const writer = newDisplayPartsWriter(false);

    writer.writeKeyword("function");
    writer.writeSpace(" ");
    writer.write("sample");
    writer.writePunctuation("(");
    writer.writePunctuation(")");

    Assert.Equal("function sample()", writer.toString());
    Assert.Equal("function sample()", writer.getText());
    Assert.Equal(0, writer.getRuns().length);
    Assert.Equal(17, writer.getTextPos());
  }

  visual_studio_capability_collects_classified_runs(): void {
    const writer = newDisplayPartsWriter(true);

    writer.writeKeyword("const");
    writer.writeSpace(" ");
    writer.writeParameter("input");
    writer.writeOperator("=");
    writer.writeStringLiteral("\"value\"");
    writer.writeTrailingSemicolon(";");

    const runs = writer.getRuns();
    Assert.Equal("const input=\"value\";", writer.toString());
    Assert.Equal(6, runs.length);
    Assert.Equal(ClassificationTypeNameKeyword, runs[0]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNameWhiteSpace, runs[1]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNameParameterName, runs[2]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNameOperator, runs[3]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNameString, runs[4]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNamePunctuation, runs[5]?.ClassificationTypeName);
  }

  write_from_appends_text_runs_and_trailing_state(): void {
    const left = newDisplayPartsWriter(true);
    const right = newDisplayPartsWriter(true);
    left.writeKeyword("return");
    right.writeSpace(" ");

    left.writeFrom(right);

    Assert.Equal("return ", left.toString());
    Assert.Equal(2, left.getRuns().length);
    Assert.True(left.hasTrailingWhitespace());
  }

  clear_resets_text_runs_and_trailing_state(): void {
    const writer = newDisplayPartsWriter(true);
    writer.writeSpace(" ");

    writer.clear();

    Assert.Equal("", writer.toString());
    Assert.Equal(0, writer.getRuns().length);
    Assert.False(writer.hasTrailingWhitespace());
  }

  writer_noop_position_methods_match_tsgo_contract(): void {
    const writer = newDisplayPartsWriter(false);

    writer.increaseIndent();
    writer.decreaseIndent();
    writer.writeLine();
    writer.writeLineForce(true);
    writer.writeLineRepeat(1);

    Assert.Equal("   ", writer.toString());
    Assert.Equal(0, writer.getLine());
    Assert.Equal(0, writer.getColumn());
    Assert.Equal(0, writer.getIndent());
    Assert.False(writer.isAtStartOfLine());
    Assert.False(writer.hasTrailingComment());
    Assert.True(writer.hasTrailingWhitespace());
  }

  write_symbol_uses_symbol_classification(): void {
    const parameter = findNode("function f(input: string) { const value = input; }", (node): node is ParameterDeclaration => node.kind === Kind.Parameter);
    const variable = findNode("function f(input: string) { const value = input; }", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);
    const writer = newDisplayPartsWriter(true);

    writer.writeSymbol("input", symbolWith(SymbolFlags.Variable, parameter));
    writer.writeSpace(" ");
    writer.writeSymbol("value", symbolWith(SymbolFlags.Variable, variable));

    const runs = writer.getRuns();
    Assert.Equal(ClassificationTypeNameParameterName, runs[0]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNameWhiteSpace, runs[1]?.ClassificationTypeName);
    Assert.Equal(ClassificationTypeNameLocalName, runs[2]?.ClassificationTypeName);
  }

  classification_for_symbol_matches_tsgo_flag_priority(): void {
    const variable = findNode("const value = 1;", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);

    Assert.Equal(ClassificationTypeNameText, classificationForSymbol(undefined));
    Assert.Equal(ClassificationTypeNameLocalName, classificationForSymbol(symbolWith(SymbolFlags.Variable, variable)));
    Assert.Equal(ClassificationTypeNamePropertyName, classificationForSymbol(symbolWith(SymbolFlags.Property, variable)));
    Assert.Equal(ClassificationTypeNamePropertyName, classificationForSymbol(symbolWith(SymbolFlags.GetAccessor, variable)));
    Assert.Equal(ClassificationTypeNamePropertyName, classificationForSymbol(symbolWith(SymbolFlags.SetAccessor, variable)));
    Assert.Equal(ClassificationTypeNameFieldName, classificationForSymbol(symbolWith(SymbolFlags.EnumMember, variable)));
    Assert.Equal(ClassificationTypeNameMethodName, classificationForSymbol(symbolWith(SymbolFlags.Function, variable)));
    Assert.Equal(ClassificationTypeNameClassName, classificationForSymbol(symbolWith(SymbolFlags.Class, variable)));
    Assert.Equal(ClassificationTypeNameInterfaceName, classificationForSymbol(symbolWith(SymbolFlags.Interface, variable)));
    Assert.Equal(ClassificationTypeNameEnumName, classificationForSymbol(symbolWith(SymbolFlags.Enum, variable)));
    Assert.Equal(ClassificationTypeNameModuleName, classificationForSymbol(symbolWith(SymbolFlags.Module, variable)));
    Assert.Equal(ClassificationTypeNameMethodName, classificationForSymbol(symbolWith(SymbolFlags.Method, variable)));
    Assert.Equal(ClassificationTypeNameTypeParameterName, classificationForSymbol(symbolWith(SymbolFlags.TypeParameter, variable)));
    Assert.Equal(ClassificationTypeNameIdentifier, classificationForSymbol(symbolWith(SymbolFlags.TypeAlias, variable)));
    Assert.Equal(ClassificationTypeNameIdentifier, classificationForSymbol(symbolWith(SymbolFlags.Alias, variable)));
  }

  parameter_detection_uses_first_symbol_declaration_only(): void {
    const parameter = findNode("function f(input: string) { const value = input; }", (node): node is ParameterDeclaration => node.kind === Kind.Parameter);
    const variable = findNode("function f(input: string) { const value = input; }", (node): node is VariableDeclaration => node.kind === Kind.VariableDeclaration);

    Assert.True(isFirstDeclarationOfSymbolParameter(symbolWith(SymbolFlags.Variable, parameter)));
    Assert.False(isFirstDeclarationOfSymbolParameter(symbolWith(SymbolFlags.Variable, variable)));
    Assert.False(isFirstDeclarationOfSymbolParameter({
      name: "empty",
      escapedName: "empty",
      flags: SymbolFlags.Variable,
      declarations: [],
    }));
  }
}

A<DisplayPartsWriterTests>().method((t) => t.plain_writer_collects_text_without_classified_runs).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.visual_studio_capability_collects_classified_runs).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.write_from_appends_text_runs_and_trailing_state).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.clear_resets_text_runs_and_trailing_state).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.writer_noop_position_methods_match_tsgo_contract).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.write_symbol_uses_symbol_classification).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.classification_for_symbol_matches_tsgo_flag_priority).add(FactAttribute);
A<DisplayPartsWriterTests>().method((t) => t.parameter_detection_uses_first_symbol_declaration_only).add(FactAttribute);
