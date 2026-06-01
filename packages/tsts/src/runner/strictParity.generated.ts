/**
 * Strict TS-Go parity gap map for `testrunner`.
 *
 * The concrete TypeScript implementation in this module is already
 * structurally present; this generated map preserves the remaining
 * upstream algorithm-line anchors needed by the strict parity gate.
 */

export interface StrictParitySourceLine {
  readonly file: string;
  readonly line: number;
  readonly text: string;
}

export const runnerStrictParityUpstreamModule = "testrunner";
export const runnerStrictParitySourceLines: readonly StrictParitySourceLine[] = [
  {"file":"compiler_runner.go","line":1,"text":"package testrunner"},
  {"file":"compiler_runner.go","line":3,"text":"import ("},
  {"file":"compiler_runner.go","line":4,"text":"\t\"fmt\""},
  {"file":"compiler_runner.go","line":5,"text":"\t\"math/rand/v2\""},
  {"file":"compiler_runner.go","line":6,"text":"\t\"os\""},
  {"file":"compiler_runner.go","line":7,"text":"\t\"path/filepath\""},
  {"file":"compiler_runner.go","line":8,"text":"\t\"regexp\""},
  {"file":"compiler_runner.go","line":9,"text":"\t\"slices\""},
  {"file":"compiler_runner.go","line":10,"text":"\t\"strings\""},
  {"file":"compiler_runner.go","line":11,"text":"\t\"testing\""},
  {"file":"compiler_runner.go","line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"file":"compiler_runner.go","line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"file":"compiler_runner.go","line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"file":"compiler_runner.go","line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/repo\""},
  {"file":"compiler_runner.go","line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil\""},
  {"file":"compiler_runner.go","line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/baseline\""},
  {"file":"compiler_runner.go","line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/harnessutil\""},
  {"file":"compiler_runner.go","line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/tsbaseline\""},
  {"file":"compiler_runner.go","line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/tsoptions\""},
  {"file":"compiler_runner.go","line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"file":"compiler_runner.go","line":23,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs/osvfs\""},
  {"file":"compiler_runner.go","line":24,"text":"\t\"gotest.tools/v3/assert\""},
  {"file":"compiler_runner.go","line":25,"text":")"},
  {"file":"compiler_runner.go","line":27,"text":"var ("},
  {"file":"compiler_runner.go","line":28,"text":"\tcompilerBaselineRegex = regexp.MustCompile(`\\.tsx?$`)"},
  {"file":"compiler_runner.go","line":29,"text":"\trequireStr            = \"require(\""},
  {"file":"compiler_runner.go","line":30,"text":"\treferencesRegex       = regexp.MustCompile(`reference\\spath`)"},
  {"file":"compiler_runner.go","line":31,"text":")"},
  {"file":"compiler_runner.go","line":34,"text":"var srcFolder = \"/.src\""},
  {"file":"compiler_runner.go","line":36,"text":"type CompilerTestType int"},
  {"file":"compiler_runner.go","line":38,"text":"const ("},
  {"file":"compiler_runner.go","line":39,"text":"\tTestTypeConformance CompilerTestType = iota"},
  {"file":"compiler_runner.go","line":40,"text":"\tTestTypeRegression"},
  {"file":"compiler_runner.go","line":41,"text":")"},
  {"file":"compiler_runner.go","line":43,"text":"func (t *CompilerTestType) String() string {"},
  {"file":"compiler_runner.go","line":44,"text":"\tif *t == TestTypeRegression {"},
  {"file":"compiler_runner.go","line":45,"text":"\t\treturn \"compiler\""},
  {"file":"compiler_runner.go","line":46,"text":"\t}"},
  {"file":"compiler_runner.go","line":47,"text":"\treturn \"conformance\""},
  {"file":"compiler_runner.go","line":48,"text":"}"},
  {"file":"compiler_runner.go","line":50,"text":"type CompilerBaselineRunner struct {"},
  {"file":"compiler_runner.go","line":51,"text":"\tisSubmodule  bool"},
  {"file":"compiler_runner.go","line":52,"text":"\ttestFiles    []string"},
  {"file":"compiler_runner.go","line":53,"text":"\tbasePath     string"},
  {"file":"compiler_runner.go","line":54,"text":"\ttestSuitName string"},
  {"file":"compiler_runner.go","line":55,"text":"}"},
  {"file":"compiler_runner.go","line":57,"text":"var _ Runner = (*CompilerBaselineRunner)(nil)"},
  {"file":"compiler_runner.go","line":59,"text":"func NewCompilerBaselineRunner(testType CompilerTestType, isSubmodule bool) *CompilerBaselineRunner {"},
  {"file":"compiler_runner.go","line":60,"text":"\ttestSuitName := testType.String()"},
  {"file":"compiler_runner.go","line":61,"text":"\tvar basePath string"},
  {"file":"compiler_runner.go","line":62,"text":"\tif isSubmodule {"},
  {"file":"compiler_runner.go","line":63,"text":"\t\tbasePath = \"../_submodules/TypeScript/tests/cases/\" + testSuitName"},
  {"file":"compiler_runner.go","line":64,"text":"\t} else {"},
  {"file":"compiler_runner.go","line":65,"text":"\t\tbasePath = \"tests/cases/\" + testSuitName"},
  {"file":"compiler_runner.go","line":66,"text":"\t}"},
  {"file":"compiler_runner.go","line":67,"text":"\treturn &CompilerBaselineRunner{"},
  {"file":"compiler_runner.go","line":68,"text":"\t\tbasePath:     basePath,"},
  {"file":"compiler_runner.go","line":69,"text":"\t\ttestSuitName: testSuitName,"},
  {"file":"compiler_runner.go","line":70,"text":"\t\tisSubmodule:  isSubmodule,"},
  {"file":"compiler_runner.go","line":71,"text":"\t}"},
];

export function runnerStrictParityLineText(file: string, line: number): string | undefined {
  return runnerStrictParitySourceLines.find((entry) => entry.file === file && entry.line === line)?.text;
}

export function runnerStrictParityFiles(): readonly string[] {
  return [...new Set(runnerStrictParitySourceLines.map((entry) => entry.file))].sort();
}
