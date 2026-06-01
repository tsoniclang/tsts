import { attributes as A } from "@tsonic/core/lang.js";
import { Exception } from "@tsonic/dotnet/System.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Kind,
  isFunctionDeclaration,
  isInterfaceDeclaration,
  isMethodSignatureDeclaration,
  isPropertySignatureDeclaration,
  isVariableStatement,
} from "../../ast/index.js";
import { parseSourceFile } from "../../parser/index.js";
import {
  nodeIsASICandidate,
  positionIsASICandidate,
  syntaxMayBeASICandidate,
  syntaxRequiresTrailingCommaOrSemicolonOrASI,
  syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI,
  syntaxRequiresTrailingSemicolonOrASI,
} from "./asi.js";
import { getLastChild, getLastToken } from "./children.js";

export class ASIUtilityTests {
  classifies_upstream_asi_syntax_families(): void {
    Assert.True(syntaxRequiresTrailingCommaOrSemicolonOrASI(Kind.MethodSignature));
    Assert.True(syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(Kind.FunctionDeclaration));
    Assert.True(syntaxRequiresTrailingSemicolonOrASI(Kind.VariableStatement));
    Assert.True(syntaxMayBeASICandidate(Kind.ExportAssignment));
    Assert.False(syntaxMayBeASICandidate(Kind.ClassDeclaration));
  }

  rejects_nodes_that_already_end_with_semicolon(): void {
    const sourceFile = parseSourceFile("let value = 1; let next = 2;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");

    const lastToken = getLastToken(statement, sourceFile);
    Assert.Equal(Kind.SemicolonToken, lastToken?.kind);
    Assert.False(nodeIsASICandidate(statement, sourceFile));
  }

  accepts_semicolon_syntax_when_next_token_is_on_later_line(): void {
    const sourceFile = parseSourceFile("let value = 1\nlet next = 2;");
    const statement = sourceFile.statements[0]!;
    if (!isVariableStatement(statement)) throw new Exception("Expected variable statement");

    Assert.True(nodeIsASICandidate(statement, sourceFile));
    Assert.True(positionIsASICandidate(statement.end, statement, sourceFile));
  }

  rejects_signature_members_that_end_with_comma(): void {
    const sourceFile = parseSourceFile("interface I { method(): void, next(): void }");
    const declaration = sourceFile.statements[0]!;
    if (!isInterfaceDeclaration(declaration)) throw new Exception("Expected interface declaration");
    const member = declaration.members[0]!;
    if (!isMethodSignatureDeclaration(member)) throw new Exception("Expected method signature");

    const lastToken = getLastToken(member, sourceFile);
    Assert.Equal(Kind.CommaToken, lastToken?.kind);
    Assert.False(nodeIsASICandidate(member, sourceFile));
  }

  accepts_signature_members_when_next_member_starts_on_later_line(): void {
    const sourceFile = parseSourceFile("interface I {\n  first: string\n  second: string\n}");
    const declaration = sourceFile.statements[0]!;
    if (!isInterfaceDeclaration(declaration)) throw new Exception("Expected interface declaration");
    const member = declaration.members[0]!;
    if (!isPropertySignatureDeclaration(member)) throw new Exception("Expected property signature");

    Assert.True(nodeIsASICandidate(member, sourceFile));
  }

  treats_function_body_as_the_required_trailing_function_block(): void {
    const sourceFile = parseSourceFile("function fn() { return 1; }");
    const declaration = sourceFile.statements[0]!;
    if (!isFunctionDeclaration(declaration)) throw new Exception("Expected function declaration");

    const lastChild = getLastChild(declaration, sourceFile);
    Assert.Equal(Kind.Block, lastChild?.kind);
    Assert.False(nodeIsASICandidate(declaration, sourceFile));
  }
}

A<ASIUtilityTests>().method((t) => t.classifies_upstream_asi_syntax_families).add(FactAttribute);
A<ASIUtilityTests>().method((t) => t.rejects_nodes_that_already_end_with_semicolon).add(FactAttribute);
A<ASIUtilityTests>().method((t) => t.accepts_semicolon_syntax_when_next_token_is_on_later_line).add(FactAttribute);
A<ASIUtilityTests>().method((t) => t.rejects_signature_members_that_end_with_comma).add(FactAttribute);
A<ASIUtilityTests>().method((t) => t.accepts_signature_members_when_next_member_starts_on_later_line).add(FactAttribute);
A<ASIUtilityTests>().method((t) => t.treats_function_body_as_the_required_trailing_function_block).add(FactAttribute);
