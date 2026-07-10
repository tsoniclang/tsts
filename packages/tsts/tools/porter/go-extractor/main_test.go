package main

import (
	"strings"
	"testing"
)

func TestResolveSnapshotConstantValuesAcrossFilesAndImports(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{
		constantTestFile("core/base.go", "example/core", "core", nil,
			constantTestSpec([]string{"Base"}, []string{"1"}, 0),
		),
		constantTestFile("core/derived.go", "example/core", "core", nil,
			constantTestSpec([]string{"Derived"}, []string{"Base + 2"}, 0),
		),
		constantTestFile("use/use.go", "example/use", "use", []ImportReport{{Name: "source", Path: "example/core"}},
			constantTestSpec([]string{"Result"}, []string{"source.Derived << 1"}, 0),
		),
	}}

	resolveSnapshotConstantValues(&snapshot)

	assertConstantReport(t, snapshot.Files[0].Units[0].ValueSpecs[0].ConstantValues[0], "number", "1")
	assertConstantReport(t, snapshot.Files[1].Units[0].ValueSpecs[0].ConstantValues[0], "number", "3")
	assertConstantReport(t, snapshot.Files[2].Units[0].ValueSpecs[0].ConstantValues[0], "number", "6")
}

func TestResolveSnapshotConstantValuesAcceptsEquivalentBuildVariants(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{
		constantTestFile("platform/value_linux.go", "example/platform", "platform", nil,
			constantTestSpec([]string{"Value"}, []string{"4"}, 0),
		),
		constantTestFile("platform/value_windows.go", "example/platform", "platform", nil,
			constantTestSpec([]string{"Value"}, []string{"2 + 2"}, 0),
		),
		constantTestFile("platform/use.go", "example/platform", "platform", nil,
			constantTestSpec([]string{"Result"}, []string{"Value * 2"}, 0),
		),
	}}

	resolveSnapshotConstantValues(&snapshot)

	assertConstantReport(t, snapshot.Files[2].Units[0].ValueSpecs[0].ConstantValues[0], "number", "8")
}

func TestResolveSnapshotConstantValuesRejectsBuildDependentAndCyclicValues(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{
		constantTestFile("platform/value_linux.go", "example/platform", "platform", nil,
			constantTestSpec([]string{"Value"}, []string{"1"}, 0),
		),
		constantTestFile("platform/value_windows.go", "example/platform", "platform", nil,
			constantTestSpec([]string{"Value"}, []string{"2"}, 0),
		),
		constantTestFile("platform/use.go", "example/platform", "platform", nil,
			constantTestSpec([]string{"Result"}, []string{"Value"}, 0),
			constantTestSpec([]string{"CycleA"}, []string{"CycleB"}, 1),
			constantTestSpec([]string{"CycleB"}, []string{"CycleA"}, 2),
		),
	}}

	resolveSnapshotConstantValues(&snapshot)

	buildDependent := snapshot.Files[2].Units[0].ValueSpecs[0].ConstantValues[0]
	if buildDependent.Supported || !strings.Contains(buildDependent.Reason, "build-dependent constant reference Value") {
		t.Fatalf("expected explicit build-dependent rejection, got %#v", buildDependent)
	}
	cycle := snapshot.Files[2].Units[0].ValueSpecs[1].ConstantValues[0]
	if cycle.Supported || !strings.Contains(cycle.Reason, "constant dependency cycle") {
		t.Fatalf("expected explicit cycle rejection, got %#v", cycle)
	}
}

func TestResolveSnapshotConstantValuesDoesNotTreatConversionsAsReferences(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{
		constantTestFile("convert/convert.go", "example/convert", "convert", nil,
			constantTestSpec([]string{"Value"}, []string{"uint32(3)"}, 0),
		),
	}}

	resolveSnapshotConstantValues(&snapshot)

	assertConstantReport(t, snapshot.Files[0].Units[0].ValueSpecs[0].ConstantValues[0], "number", "3")
}

func TestResolveSnapshotConstantValuesLoadsStandardLibraryConstants(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{
		constantTestFile("duration/duration.go", "example/duration", "duration", []ImportReport{{Path: "time"}},
			constantTestSpec([]string{"Delay"}, []string{"5 * time.Millisecond"}, 0),
		),
	}}

	resolveSnapshotConstantValues(&snapshot)

	assertConstantReport(t, snapshot.Files[0].Units[0].ValueSpecs[0].ConstantValues[0], "number", "5000000")
}

func TestResolveSnapshotConstantValuesAppliesNamedUnsignedWidth(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{{
		Path:        "flags/flags.go",
		ImportPath:  "example/flags",
		PackageName: "flags",
		Units: []UnitReport{
			{Kind: "type", Name: "Flags", TypeExpression: identTypeExpr("uint32")},
			{Kind: "constGroup", ValueSpecs: []ValueSpecReport{
				{Names: []string{"One"}, Values: []string{"1"}, Type: identTypeExpr("Flags")},
				{Names: []string{"Mask"}, Values: []string{"^One"}},
			}},
		},
	}}}

	resolveSnapshotConstantValues(&snapshot)

	assertConstantReport(t, snapshot.Files[0].Units[1].ValueSpecs[1].ConstantValues[0], "number", "4294967294")
}

func constantTestFile(path string, importPath string, packageName string, imports []ImportReport, specs ...ValueSpecReport) FileReport {
	return FileReport{
		Path:        path,
		ImportPath:  importPath,
		PackageName: packageName,
		Imports:     imports,
		Units:       []UnitReport{{Kind: "constGroup", ValueSpecs: specs}},
	}
}

func constantTestSpec(names []string, values []string, constIndex int) ValueSpecReport {
	return ValueSpecReport{Names: names, Values: values, ConstIndex: constIndex}
}

func assertConstantReport(t *testing.T, report ConstantValueReport, kind string, exact string) {
	t.Helper()
	if !report.Supported || report.Kind != kind || report.Exact != exact {
		t.Fatalf("expected %s %s, got %#v", kind, exact, report)
	}
}
