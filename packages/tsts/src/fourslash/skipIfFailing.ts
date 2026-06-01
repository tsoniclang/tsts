/**
 * Fourslash known-failure controls.
 *
 * Porting surface for TS-Go `internal/fourslash/skip_if_failing.go`.
 */

export interface KnownFailure {
  readonly testName: string;
  readonly reason: string;
  readonly issue?: string;
}

const knownFailures = new Map<string, KnownFailure>();

export function registerKnownFailure(failure: KnownFailure): void {
  knownFailures.set(failure.testName, failure);
}

export function clearKnownFailures(): void {
  knownFailures.clear();
}

export function getKnownFailure(testName: string): KnownFailure | undefined {
  return knownFailures.get(testName);
}

export function shouldSkipIfFailing(testName: string): boolean {
  return knownFailures.has(testName);
}

export function requireNotKnownFailing(testName: string): void {
  const failure = knownFailures.get(testName);
  if (failure !== undefined) {
    const issue = failure.issue === undefined ? "" : ` (${failure.issue})`;
    throw new Error(`Known failing fourslash test skipped: ${failure.testName}: ${failure.reason}${issue}`);
  }
}

// Source parity map: internal/fourslash/skip_if_failing.go
/**
 * Source parity map for TS-Go `fourslash/skip_if_failing.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

const homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingUpstreamPath = "fourslash/skip_if_failing.go";

const homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingDeclarations: readonly UpstreamDeclaration[] = [
  {"line":13,"kind":"var","name":"failingTests"},
  {"line":43,"kind":"func","name":"SkipIfFailing"},
];

const homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package fourslash"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"bufio\""},
  {"line":5,"text":"\t\"os\""},
  {"line":6,"text":"\t\"path/filepath\""},
  {"line":7,"text":"\t\"runtime\""},
  {"line":8,"text":"\t\"strings\""},
  {"line":9,"text":"\t\"sync\""},
  {"line":10,"text":"\t\"testing\""},
  {"line":11,"text":")"},
  {"line":13,"text":"var failingTests = sync.OnceValue(func() map[string]struct{} {"},
  {"line":14,"text":"\tfailingTestsSet := make(map[string]struct{})"},
  {"line":17,"text":"\t_, thisFile, _, ok := runtime.Caller(0)"},
  {"line":18,"text":"\tif !ok {"},
  {"line":19,"text":"\t\treturn failingTestsSet"},
  {"line":20,"text":"\t}"},
  {"line":22,"text":"\tfailingTestsPath := filepath.Join(filepath.Dir(thisFile), \"_scripts\", \"failingTests.txt\") //nolint:forbidigo"},
  {"line":24,"text":"\tfile, err := os.Open(failingTestsPath) //nolint:forbidigo"},
  {"line":25,"text":"\tif err != nil {"},
  {"line":26,"text":"\t\treturn failingTestsSet"},
  {"line":27,"text":"\t}"},
  {"line":28,"text":"\tdefer file.Close() //nolint:forbidigo"},
  {"line":30,"text":"\tscanner := bufio.NewScanner(file)"},
  {"line":31,"text":"\tfor scanner.Scan() {"},
  {"line":32,"text":"\t\tline := strings.TrimSpace(scanner.Text())"},
  {"line":33,"text":"\t\tif line != \"\" {"},
  {"line":34,"text":"\t\t\tfailingTestsSet[line] = struct{}{}"},
  {"line":35,"text":"\t\t}"},
  {"line":36,"text":"\t}"},
  {"line":37,"text":"\treturn failingTestsSet"},
  {"line":38,"text":"})"},
  {"line":43,"text":"func SkipIfFailing(t *testing.T) {"},
  {"line":44,"text":"\tt.Helper()"},
  {"line":46,"text":"\tif os.Getenv(\"TSGO_FOURSLASH_IGNORE_FAILING\") != \"\" { //nolint:forbidigo"},
  {"line":47,"text":"\t\treturn"},
  {"line":48,"text":"\t}"},
  {"line":50,"text":"\tif _, found := failingTests()[t.Name()]; found {"},
  {"line":51,"text":"\t\tt.Skip(\"Test is in failingTests.txt\")"},
  {"line":52,"text":"\t}"},
  {"line":53,"text":"}"},
];

function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingDeclarations.find((declaration) => declaration.name === name);
}

function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

function homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashSkipIfFailingSourceLines.find((entry) => entry.line === line)?.text;
}
