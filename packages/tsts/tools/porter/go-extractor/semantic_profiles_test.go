package main

import (
	"encoding/json"
	"fmt"
	"go/constant"
	"go/token"
	"go/types"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

func TestUntaggedArchitectureConstantCoversExact32And64BitDomain(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "go.mod"), "module example.test/width\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "width.go"), "package width\nconst WordBits = 32 << (^uint(0) >> 63)\n")
	snapshot := declarationSnapshot(t, root, "example.test/width")
	wordBits := requireSemanticUnitInFile(t, snapshot, "width.go", "constGroup", "WordBits")
	values := []string{}
	for _, variant := range wordBits.Semantic {
		values = append(values, variant.ValueSpecs[0].Names[0].Constant.Exact)
	}
	sort.Strings(values)
	if strings.Join(values, ",") != "32,64" {
		t.Fatalf("untagged architecture-sensitive constant variants = %v", values)
	}
}

func TestIndependentCustomTagsPreserveEveryDistinctDeclarationFileSet(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/custom"
	writeTestFile(t, filepath.Join(root, "common.go"), "package custom\nconst Common = 1\n")
	writeTestFile(t, filepath.Join(root, "alpha.go"), "//go:build alpha\n\npackage custom\nconst Alpha = 1\n")
	writeTestFile(t, filepath.Join(root, "beta.go"), "//go:build beta\n\npackage custom\nconst Beta = 1\n")
	files := []FileReport{
		scanGoFile(root, filepath.Join(root, "common.go"), modulePath),
		scanGoFile(root, filepath.Join(root, "alpha.go"), modulePath),
		scanGoFile(root, filepath.Join(root, "beta.go"), modulePath),
	}
	customTags, experiments := semanticProfileDimensions(files)
	if strings.Join(customTags, ",") != "alpha,beta" {
		t.Fatalf("profile dimensions = tags %v", customTags)
	}
	if len(experiments) != 0 {
		t.Fatalf("unexpected experiment dimensions: %v", experiments)
	}
	profiles := semanticDistinctBuildTagProfiles(root, semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}, files, customTags)
	sets := []string{}
	for _, profile := range profiles {
		sets = append(sets, strings.Join(profileCoveredFileReports(root, profile, files), ","))
	}
	sort.Strings(sets)
	want := []string{"alpha.go,beta.go,common.go", "alpha.go,common.go", "beta.go,common.go", "common.go"}
	sort.Strings(want)
	if strings.Join(sets, "|") != strings.Join(want, "|") {
		t.Fatalf("distinct declaration file sets = %v, want %v", sets, want)
	}
}

func TestCustomTagEnumerationMatchesExhaustiveFileSetOracle(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/combinations"
	sources := map[string]string{
		"common.go": "package combinations\nconst Common = 1\n",
		"ab.go":     "//go:build a && b\n\npackage combinations\nconst AB = 1\n",
		"cd.go":     "//go:build c || d\n\npackage combinations\nconst CD = 1\n",
		"edge.go":   "//go:build (a || c) && !d\n\npackage combinations\nconst Edge = 1\n",
	}
	files := []FileReport{}
	for _, name := range []string{"common.go", "ab.go", "cd.go", "edge.go"} {
		writeTestFile(t, filepath.Join(root, name), sources[name])
		files = append(files, scanGoFile(root, filepath.Join(root, name), modulePath))
	}
	tags, _ := semanticProfileDimensions(files)
	base := semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}
	actual := map[string]bool{}
	for _, profile := range semanticDistinctBuildTagProfiles(root, base, files, tags) {
		actual[strings.Join(profileCoveredFileReports(root, profile, files), "\x00")] = true
	}
	expected := map[string]bool{}
	for assignment := 0; assignment < 1<<len(tags); assignment++ {
		profile := base
		for index, tag := range tags {
			if assignment&(1<<index) != 0 {
				profile.BuildTags = append(profile.BuildTags, tag)
			}
		}
		filesForAssignment := profileCoveredFileReports(root, profile, files)
		if len(filesForAssignment) > 0 {
			expected[strings.Join(filesForAssignment, "\x00")] = true
		}
	}
	if strings.Join(sortedBoolKeys(actual), "|") != strings.Join(sortedBoolKeys(expected), "|") {
		t.Fatalf("custom-tag file-set domain = %v, exhaustive oracle = %v", sortedBoolKeys(actual), sortedBoolKeys(expected))
	}
}

func TestRequiredArchitectureFeatureDerivesExactCompilerSetting(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "go.mod"), "module example.test/features\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "common.go"), "package features\nconst Common = 1\n")
	writeTestFile(t, filepath.Join(root, "feature.go"), "//go:build amd64.v2\n\npackage features\nconst Feature = 2\n")
	snapshot := declarationSnapshot(t, root, "example.test/features")
	feature := requireSemanticUnitInFile(t, snapshot, "feature.go", "constGroup", "Feature")
	if len(feature.Semantic) != 1 || len(feature.Semantic[0].Profiles) == 0 {
		t.Fatalf("architecture-feature declaration evidence = %#v", feature.Semantic)
	}
	foundV2 := false
	for _, profile := range snapshot.Semantic.Profiles {
		if profile.GOOS == "linux" && profile.GOARCH == "amd64" && profile.Architecture == "GOAMD64=v2" {
			foundV2 = true
			if !stringSliceContains(profile.CoveredFiles, "feature.go") {
				t.Fatalf("GOAMD64=v2 profile did not cover feature.go: %#v", profile)
			}
		}
	}
	if !foundV2 {
		t.Fatal("semantic profile domain did not derive GOAMD64=v2 from amd64.v2 declaration constraint")
	}
}

func TestArchitectureFeatureDomainsMapToExactGoSettings(t *testing.T) {
	for _, test := range []struct {
		goarch string
		value  string
		tag    string
	}{
		{goarch: "386", value: "softfloat", tag: "386.softfloat"},
		{goarch: "amd64", value: "v2", tag: "amd64.v2"},
		{goarch: "arm", value: "6", tag: "arm.6"},
		{goarch: "arm64", value: "v9.1", tag: "arm64.v9.1"},
		{goarch: "mipsle", value: "softfloat", tag: "mipsle.softfloat"},
		{goarch: "ppc64le", value: "power9", tag: "ppc64le.power9"},
		{goarch: "riscv64", value: "rva22u64", tag: "riscv64.rva22u64"},
	} {
		values := semanticArchitectureProfileValues(test.goarch, true)
		if !stringSliceContains(values, test.value) {
			t.Fatalf("%s feature domain omits exact setting %s: %v", test.goarch, test.value, values)
		}
		profile := semanticBuildProfile{GOOS: "linux", GOARCH: test.goarch, ArchitectureValue: test.value}
		if !stringSliceContains(semanticToolTags(profile), test.tag) {
			t.Fatalf("%s=%s does not activate %s: %v", semanticArchitectureVariable(test.goarch), test.value, test.tag, semanticToolTags(profile))
		}
	}
	if tags := semanticToolTags(semanticBuildProfile{GOOS: "js", GOARCH: "wasm"}); !stringSliceContains(tags, "wasm.satconv") || !stringSliceContains(tags, "wasm.signext") {
		t.Fatalf("Go 1.26 GOWASM profile omitted always-enabled feature tags: %v", tags)
	}
	if values := semanticArchitectureProfileValues("wasm", true); len(values) != 1 || values[0] != "" {
		t.Fatalf("Go 1.26 GOWASM declaration profile domain = %v", values)
	}
}

func TestSemanticEnvironmentRejectsAmbientGoConfigurationInfluence(t *testing.T) {
	for name, value := range map[string]string{
		"GOAMD64": "v4", "GOEXPERIMENT": "fieldtrack", "GOFLAGS": "-tags=ambient",
		"GOENV": filepath.Join(t.TempDir(), "go-env"), "GOFIPS140": "latest", "GOTOOLCHAIN": "auto",
	} {
		t.Setenv(name, value)
	}
	profile := semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}
	values := environmentMap(semanticEnvironment(profile))
	toolchain := exactSemanticToolchain()
	if len(toolchain.executableHash) != 64 {
		t.Fatalf("exact Go executable hash = %q", toolchain.executableHash)
	}
	if values["GOAMD64"] != toolchain.architectureDefaults["GOAMD64"] || values["GOAMD64"] == "v4" {
		t.Fatalf("ambient GOAMD64 leaked into profile: %q", values["GOAMD64"])
	}
	for name, expected := range map[string]string{
		"GOEXPERIMENT": "", "GOFIPS140": "off", "GOFLAGS": "", "GOENV": "off", "GOTOOLCHAIN": "local", "GOPACKAGESDRIVER": "off",
		"GOPROXY": "off", "GOSUMDB": "off", "GOVCS": "off",
	} {
		if values[name] != expected {
			t.Fatalf("effective %s = %q, want %q", name, values[name], expected)
		}
	}
	if values["PATH"] != filepath.Join(toolchain.goRoot, "bin") {
		t.Fatalf("non-cgo profile retained ambient executable search path: %q", values["PATH"])
	}
}

func TestDefaultExperimentsAreExactPerTarget(t *testing.T) {
	linuxAMD64 := stringSet(semanticExperimentNames(semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}))
	darwinAMD64 := stringSet(semanticExperimentNames(semanticBuildProfile{GOOS: "darwin", GOARCH: "amd64"}))
	linux386 := stringSet(semanticExperimentNames(semanticBuildProfile{GOOS: "linux", GOARCH: "386"}))
	if !linuxAMD64["dwarf5"] || darwinAMD64["dwarf5"] {
		t.Fatalf("target-specific dwarf5 defaults: linux/amd64=%v darwin/amd64=%v", sortedBoolKeys(linuxAMD64), sortedBoolKeys(darwinAMD64))
	}
	if !linuxAMD64["regabiargs"] || !linuxAMD64["regabiwrappers"] || linux386["regabiargs"] || linux386["regabiwrappers"] {
		t.Fatalf("target-specific register ABI defaults: linux/amd64=%v linux/386=%v", sortedBoolKeys(linuxAMD64), sortedBoolKeys(linux386))
	}
}

func TestSemanticBaseDomainIsStrictlyNonCgo(t *testing.T) {
	profiles := semanticBaseProfiles(nil)
	keys := map[string]bool{}
	for _, profile := range profiles {
		keys[profile.GOOS+"/"+profile.GOARCH+":"+boolText(profile.CgoEnabled)] = true
	}
	for _, target := range distTargetReports() {
		prefix := target.GOOS + "/" + target.GOARCH + ":"
		if !keys[prefix+"false"] {
			t.Fatalf("semantic domain omitted non-cgo target %s/%s", target.GOOS, target.GOARCH)
		}
		if keys[prefix+"true"] {
			t.Fatalf("semantic domain admitted unsupported cgo target %s/%s", target.GOOS, target.GOARCH)
		}
	}
}

func TestGccgoPolarityIsFixedFalseWithoutRejectingMention(t *testing.T) {
	files := []FileReport{
		{Path: "gc.go", BuildTags: []string{"!gccgo"}},
		{Path: "portable.go", BuildTags: []string{"gccgo || linux"}},
		{Path: "gccgo.go", BuildTags: []string{"gccgo && linux"}},
	}
	custom, experiments := semanticProfileDimensions(files)
	if len(custom) != 0 || len(experiments) != 0 {
		t.Fatalf("gccgo mention leaked into dimensions: %v %v", custom, experiments)
	}
	if required := semanticGccgoRequiredFiles(files); strings.Join(required, ",") != "gccgo.go" {
		t.Fatalf("gccgo-only classification = %v", required)
	}
	profile := semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}
	if !semanticProfileTagEnabled(profile, "gc") || semanticProfileTagEnabled(profile, "gccgo") {
		t.Fatalf("gc compiler polarity is not exact")
	}
}

func TestCustomTagEnumerationFailsWithoutPartialProfilesAtBound(t *testing.T) {
	root := t.TempDir()
	files := []FileReport{}
	tags := []string{}
	for index := 0; index < 12; index++ {
		name := fmt.Sprintf("tag%d", index)
		tags = append(tags, name)
		path := name + ".go"
		writeTestFile(t, filepath.Join(root, path), "//go:build "+name+"\n\npackage bounded\nconst X = 1\n")
		files = append(files, FileReport{Path: path, BuildTags: []string{name}})
	}
	profiles, err := semanticDistinctBuildTagProfilesBounded(root, semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}, files, tags, 32)
	if err == nil || profiles != nil || !strings.Contains(err.Error(), "bounded") {
		t.Fatalf("bounded adversarial enumeration = profiles:%v error:%v", profiles, err)
	}
}

func TestExperimentEnumerationIsPreflightBounded(t *testing.T) {
	names := []string{}
	for index := 0; index < 20; index++ {
		names = append(names, fmt.Sprintf("experiment%d", index))
	}
	settings, err := semanticExperimentSettings(names, 64)
	if err == nil || settings != nil || !strings.Contains(err.Error(), "bounded") {
		t.Fatalf("bounded experiment enumeration = settings:%v error:%v", settings, err)
	}
}

func TestProfileExperimentStateDrivesKeyEnvironmentAndTags(t *testing.T) {
	profile := semanticBuildProfile{
		GOOS: "linux", GOARCH: "amd64", ExperimentSetting: "arenas", ExperimentTags: []string{"goexperiment.arenas"},
	}
	if !strings.Contains(semanticProfileKey(profile), "experiments=arenas:goexperiment=arenas") {
		t.Fatalf("profile key omits exact experiment state: %s", semanticProfileKey(profile))
	}
	if environmentMap(semanticEnvironment(profile))["GOEXPERIMENT"] != "arenas" {
		t.Fatalf("profile environment omitted exact experiment setting")
	}
	if !semanticProfileTagEnabled(profile, "goexperiment.arenas") {
		t.Fatalf("profile tags omitted exact experiment state")
	}
}

func TestAlternateExperimentProfilesContainOnlyExactToolchainResults(t *testing.T) {
	base := semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}
	profiles, _ := semanticExperimentProfiles([]semanticBuildProfile{base}, []string{"regabiargs", "regabiwrappers"})
	if len(profiles) == 0 {
		t.Fatal("exact experiment enumeration omitted the accepted default state")
	}
	seen := map[string]bool{}
	for _, profile := range profiles {
		result := querySemanticExperimentTags(profile)
		if result.err != "" || strings.Join(result.tags, ",") != strings.Join(profile.ExperimentTags, ",") {
			t.Fatalf("profile did not preserve exact queried experiment state: profile=%v query=%v error=%s", profile.ExperimentTags, result.tags, result.err)
		}
		key := strings.Join(profile.ExperimentTags, "\x00")
		if seen[key] {
			t.Fatalf("duplicate exact experiment state was emitted: %v", profile.ExperimentTags)
		}
		seen[key] = true
	}
}

func TestSemanticArrayLengthIsCanonicalDecimalJSON(t *testing.T) {
	length := int64(9007199254740993)
	report := newSemanticTypeEncoder().typeReport(types.NewArray(types.Typ[types.Byte], length))
	if report.Length == nil || *report.Length != "9007199254740993" {
		t.Fatalf("semantic array length = %#v", report.Length)
	}
	encoded, err := json.Marshal(report)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(encoded), `"length":"9007199254740993"`) {
		t.Fatalf("semantic array length did not remain a JSON string: %s", encoded)
	}
}

func TestSemanticStringConstantCarriesDecodedGoValue(t *testing.T) {
	literal := `"\x00\101\u03a9\U0001f49a"`
	value := constant.MakeFromLiteral(literal, token.STRING, 0)
	if value.Kind() != constant.String {
		t.Fatalf("Go string literal was not parsed: %v", value)
	}
	report := semanticConstantReport(value)
	if report.Exact == "" || report.StringValue == nil || *report.StringValue != "\x00AΩ💚" {
		t.Fatalf("semantic string constant = %#v", report)
	}
	integer := semanticConstantReport(constant.MakeFromLiteral(`'\x41'`, token.CHAR, 0))
	if integer.Kind != "Int" || integer.StringValue != nil {
		t.Fatalf("rune constant acquired string payload: %#v", integer)
	}
}

func environmentMap(environment []string) map[string]string {
	values := map[string]string{}
	for _, entry := range environment {
		name, value, ok := strings.Cut(entry, "=")
		if !ok {
			panic("invalid environment entry: " + entry)
		}
		if _, exists := values[name]; exists {
			panic("duplicate environment entry: " + name)
		}
		values[name] = value
	}
	return values
}

func boolText(value bool) string {
	if value {
		return "true"
	}
	return "false"
}
