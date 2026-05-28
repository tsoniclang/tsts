/**
 * Checker — entry point + orchestration (port of `checker.go`).
 *
 * Upstream `checker.go` is a single 31k-line file: a `Checker` struct
 * with its methods grouped by concern. We mirror that structure but
 * split the file by concern (it would otherwise be unmanageable):
 *
 *   - checker.checkedtype.ts  — the checked-type model + leaf helpers
 *   - checker.statements.ts   — statement checking
 *   - checker.expressions.ts  — expression inference
 *   - checker.declarations.ts — class / function declaration checking
 *
 * The `Checker` class owns per-check state and is the entry; the split
 * files hold the recursive check logic. `newChecker` constructs one
 * (mirrors `checkerpool.go` handing out `*Checker`). The free
 * `checkSourceFile` / `checkProgram` wrappers preserve the existing
 * call sites in `program/program.ts` and the checker tests.
 */

import type { SourceFile } from "../ast/index.js";
import type { Program, ProgramDiagnostic } from "../program/index.js";
import { type CheckResult, newCheckState } from "./checker.checkedtype.js";
import { checkStatements } from "./checker.statements.js";

export type { CheckDiagnostic, CheckResult } from "./checker.checkedtype.js";

export class Checker {
  readonly program: Program | undefined;

  constructor(program?: Program) {
    this.program = program;
  }

  checkSourceFile(sourceFile: SourceFile): CheckResult {
    const state = newCheckState();
    checkStatements(sourceFile.statements, state, new Map(), undefined);
    return { diagnostics: state.diagnostics };
  }
}

export function newChecker(program?: Program): Checker {
  return new Checker(program);
}

export function checkSourceFile(sourceFile: SourceFile): CheckResult {
  return new Checker().checkSourceFile(sourceFile);
}

export function checkProgram(program: Program): readonly ProgramDiagnostic[] {
  const diagnostics: ProgramDiagnostic[] = [...program.diagnostics];
  if (diagnostics.length > 0) {
    return diagnostics;
  }
  const checker = new Checker(program);
  for (const sourceFile of program.sourceFiles) {
    const result = checker.checkSourceFile(sourceFile.sourceFile);
    diagnostics.push(...result.diagnostics.map(diagnostic => ({
      fileName: sourceFile.fileName,
      message: diagnostic.message,
    })));
  }
  return diagnostics;
}
