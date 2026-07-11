package main

import (
	"go/ast"
	"go/build/constraint"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

func TestSyntaxScannerRetainsOnlyBodylessDeclarationEvidence(t *testing.T) {
	root := t.TempDir()
	firstPath := filepath.Join(root, "first.go")
	secondPath := filepath.Join(root, "second.go")
	writeTestFile(t, firstPath, "package sample\nfunc Read(value int) int { return missingOne(value) }\n")
	writeTestFile(t, secondPath, "package sample\nfunc Read(value int) int { return missingTwo(value) }\n")
	first := scanGoFile(root, firstPath, "example.test/sample")
	second := scanGoFile(root, secondPath, "example.test/sample")
	firstUnit := requireSyntaxUnit(t, first, "func", "Read")
	secondUnit := requireSyntaxUnit(t, second, "func", "Read")
	if firstUnit.Signature != secondUnit.Signature || firstUnit.SigHash != secondUnit.SigHash {
		t.Fatalf("body-only edit changed source signature: %#v vs %#v", firstUnit, secondUnit)
	}
	if firstUnit.BodyHash == "" || firstUnit.BodyHash == secondUnit.BodyHash {
		t.Fatalf("opaque body hashes did not distinguish bodies: %q vs %q", firstUnit.BodyHash, secondUnit.BodyHash)
	}
	if firstUnit.Snippet != firstUnit.Signature || secondUnit.Snippet != secondUnit.Signature {
		t.Fatalf("human evidence must be the bodyless declaration signature: %#v vs %#v", firstUnit, secondUnit)
	}
	if strings.Contains(firstUnit.Snippet, "missingOne") || strings.Contains(secondUnit.Snippet, "missingTwo") {
		t.Fatalf("implementation bodies leaked into declaration evidence: %q / %q", firstUnit.Snippet, secondUnit.Snippet)
	}
}

func TestSyntaxScannerRecordsPhysicalByteLengthAndOffsetOrder(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample.go")
	source := "package sample\nvar First = 1\nvar Second = 2\n"
	writeTestFile(t, path, source)
	report := scanGoFile(root, path, "example.test/sample")
	if report.ByteLength != len([]byte(source)) {
		t.Fatalf("byte length = %d, want %d", report.ByteLength, len([]byte(source)))
	}
	for index, unit := range report.Units {
		if unit.EndOffset > report.ByteLength {
			t.Fatalf("unit %s end offset %d exceeds byte length %d", unit.ID, unit.EndOffset, report.ByteLength)
		}
		if index > 0 {
			previous := report.Units[index-1]
			if previous.StartOffset > unit.StartOffset || (previous.StartOffset == unit.StartOffset && previous.ID >= unit.ID) {
				t.Fatalf("units are not sorted by start offset then id: %#v", report.Units)
			}
		}
	}
}

func TestBodylessAndNonFunctionDeclarationsUseExactAbsentBodyHash(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample.go")
	writeTestFile(t, path, "package sample\nfunc Assembly()\ntype Value int\nvar Current Value\n")
	report := scanGoFile(root, path, "example.test/sample")
	expected := hashText("")
	for _, unit := range report.Units {
		if unit.BodyHash != expected {
			t.Fatalf("%s body hash = %q, want exact absent-body hash %q", unit.ID, unit.BodyHash, expected)
		}
	}
}

func TestVariableDeclarationEvidenceDoesNotEmbedInitializerBodies(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample.go")
	writeTestFile(t, path, "package sample\nvar Callback = func(value int) int { return value + 1 }\n")
	report := scanGoFile(root, path, "example.test/sample")
	unit := requireSyntaxUnit(t, report, "varGroup", "Callback")
	if unit.Snippet != unit.Signature || strings.Contains(unit.Snippet, "return") {
		t.Fatalf("variable initializer body leaked into declaration evidence: %#v", unit)
	}
	if len(unit.ValueSpecs) != 1 || len(unit.ValueSpecs[0].Names) != 1 {
		t.Fatalf("variable declaration shape was not retained: %#v", unit.ValueSpecs)
	}
}

func TestStructTagInventoryUsesDeclarationSyntaxOnly(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample.go")
	source := strings.ReplaceAll(`package sample
type Public struct { Name string __PUBLIC_TAG__ }
func implementation() {
	var local struct { Forbidden string __LOCAL_TAG__ }
	_ = local
}
`, "__PUBLIC_TAG__", "`json:\"name,omitzero\"`")
	source = strings.ReplaceAll(source, "__LOCAL_TAG__", "`json:\"forbidden\"`")
	writeTestFile(t, path, source)
	report := scanGoFile(root, path, "example.test/sample")
	summary := Summary{StructTagKeys: map[string]int{}}
	for _, unit := range report.Units {
		accumulateUnitStructTags(&summary, unit)
	}
	if summary.StructTagCount != 1 || summary.StructTagKeys["json"] != 1 {
		t.Fatalf("declaration tag inventory crossed into a function body: %#v", summary)
	}
}

func TestCustomTagWitnessHasNoArbitraryVariableCap(t *testing.T) {
	root := t.TempDir()
	tags := []string{}
	for index := 0; index < 64; index++ {
		tags = append(tags, "feature"+itoa(index))
	}
	path := filepath.Join(root, "sample.go")
	writeTestFile(t, path, "//go:build "+strings.Join(tags, " || ")+"\n\npackage sample\nvar Value = 1\n")
	file := scanGoFile(root, path, "example.test/sample")
	customTags, _ := semanticProfileDimensions([]FileReport{file})
	profiles := semanticDistinctBuildTagProfiles(root, semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}, []FileReport{file}, customTags)
	witness := []string{}
	if len(profiles) > 0 {
		witness = profiles[0].BuildTags
	}
	known := false
	for _, tag := range tags {
		known = known || len(witness) == 1 && witness[0] == tag
	}
	if len(witness) != 1 || !known {
		t.Fatalf("custom tag profile = %v", witness)
	}
}

func TestProfileCandidatesPreferPortableNonCgoContexts(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample_freebsd.go")
	writeTestFile(t, path, "//go:build freebsd\n\npackage sample\nvar Value = 1\n")
	file := scanGoFile(root, path, "example.test/sample")
	tags, _ := semanticProfileDimensions([]FileReport{file})
	requireNoSemanticCgo([]FileReport{file})
	bases := semanticBaseProfiles(semanticArchitectureFeatureDimensions([]FileReport{file}))
	profiles := []semanticBuildProfile{}
	for _, base := range bases {
		for _, profile := range semanticDistinctBuildTagProfiles(root, base, []FileReport{file}, tags) {
			if profileMatchesFile(root, profile, file.Path) {
				profiles = append(profiles, profile)
			}
		}
	}
	sort.Slice(profiles, func(left, right int) bool {
		return semanticProfileKey(profiles[left]) < semanticProfileKey(profiles[right])
	})
	if len(profiles) < 2 || profiles[0].CgoEnabled {
		t.Fatalf("profile candidates do not prefer non-cgo contexts: %#v", profiles)
	}
}

func TestInstrumentationNamesRemainDeclarationBuildTags(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample.go")
	writeTestFile(t, path, "//go:build race\n\npackage sample\nvar Value = 1\n")
	file := scanGoFile(root, path, "example.test/sample")
	tags, experiments := semanticProfileDimensions([]FileReport{file})
	if strings.Join(tags, ",") != "race" || len(experiments) != 0 {
		t.Fatalf("declaration dimensions = tags %v experiments %v", tags, experiments)
	}
	profile := semanticBuildProfile{GOOS: "linux", GOARCH: "amd64", BuildTags: []string{"feature", "race"}}
	if flags := semanticBuildFlags(profile); strings.Join(flags, ",") != "-mod=readonly,-tags=feature,race" {
		t.Fatalf("declaration build flags = %v", flags)
	}
	if !profileMatchesFile(root, profile, file.Path) {
		t.Fatal("explicit declaration tag did not activate the race-named build constraint")
	}
	profile.BuildTags = []string{"feature"}
	if profileMatchesFile(root, profile, file.Path) {
		t.Fatal("unselected declaration tag activated the race-named build constraint")
	}
}

func TestExplicitBuildConstraintsRemainExact(t *testing.T) {
	source := []byte("//go:build alpha && !beta\n// +build alpha,!beta\n\npackage sample\n")
	tags := explicitBuildTags(source, "sample.go")
	if len(tags) != 1 || tags[0] != "alpha && !beta" {
		t.Fatalf("build tags = %#v", tags)
	}
}

func TestAbsentBuildConstraintsRemainExactEmptyArrays(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "sample.go")
	writeTestFile(t, path, "package sample\nvar Value = 1\n")
	report := scanGoFile(root, path, "example.test/sample")
	if report.BuildTags == nil || len(report.BuildTags) != 0 {
		t.Fatalf("explicit build tags = %#v, want a non-nil empty array", report.BuildTags)
	}
	if report.ImplicitBuildTags == nil || len(report.ImplicitBuildTags) != 0 {
		t.Fatalf("implicit build tags = %#v, want a non-nil empty array", report.ImplicitBuildTags)
	}
}

func TestUnknownDeclarationTypeExpressionsAreNeverSerialized(t *testing.T) {
	if kind, supported := typeExprKind(&ast.BadExpr{}); supported || kind != "" {
		t.Fatalf("unknown declaration type kind = %q, supported=%v", kind, supported)
	}
}

func TestConstraintProofsHaveNoFixedWidthAssignmentLimit(t *testing.T) {
	names := []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s"}
	expressionText := strings.Join(names, " || ")
	left, err := constraint.Parse("//go:build " + expressionText)
	if err != nil {
		t.Fatal(err)
	}
	right, err := constraint.Parse("//go:build (" + expressionText + ")")
	if err != nil {
		t.Fatal(err)
	}
	if !constraintsEquivalent(left, right) {
		t.Fatal("equivalent 19-variable build constraints were not proven exactly")
	}
	if !semanticConstraintRequiresIgnore("ignore && ("+expressionText+")", "ignored.go") {
		t.Fatal("19-variable ignore constraint was not proven exactly")
	}
}

func requireSyntaxUnit(t *testing.T, file FileReport, kind string, name string) *UnitReport {
	t.Helper()
	for index := range file.Units {
		unit := &file.Units[index]
		if unit.Kind == kind && unit.Name == name {
			return unit
		}
	}
	t.Fatalf("missing %s %s in %#v", kind, name, file.Units)
	return nil
}

func writeTestFile(t *testing.T, path string, content string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}
}
