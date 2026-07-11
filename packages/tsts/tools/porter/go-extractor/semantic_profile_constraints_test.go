package main

import (
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

func TestSemanticCgoRequirementsClassifyEveryUnsupportedInput(t *testing.T) {
	files := []FileReport{
		{
			Path: "native.go",
			Imports: []ImportReport{
				{Name: "native", Path: "C"},
			},
		},
		{Path: "cgo_disabled.go", BuildTags: []string{"linux && !cgo"}},
		{Path: "modes.go", BuildTags: []string{"race || msan || !asan"}},
	}
	requirements := semanticCgoRequirements(files)
	actual := []string{}
	for _, requirement := range requirements {
		actual = append(actual, requirement.Path+"|"+requirement.Kind+"|"+requirement.Detail)
	}
	expected := []string{
		"cgo_disabled.go|build-constraint|cgo in linux && !cgo",
		`native.go|import|import "C"`,
	}
	if strings.Join(actual, "\n") != strings.Join(expected, "\n") {
		t.Fatalf("cgo requirement classification =\n%s\nwant\n%s", strings.Join(actual, "\n"), strings.Join(expected, "\n"))
	}
}

func TestSemanticCgoRequirementsUseScannedSourceEvidence(t *testing.T) {
	root := t.TempDir()
	nativePath := filepath.Join(root, "native.go")
	modePath := filepath.Join(root, "mode.go")
	writeTestFile(t, nativePath, "package sample\nimport \"C\"\nvar Native int\n")
	writeTestFile(t, modePath, "//go:build !race\n\npackage sample\nvar Ordinary int\n")
	files := []FileReport{
		scanGoFile(root, nativePath, "example.test/sample"),
		scanGoFile(root, modePath, "example.test/sample"),
	}
	evidence := semanticCgoRequirementEvidence(semanticCgoRequirements(files))
	for _, expected := range []string{
		`native.go: import "C" [import]`,
	} {
		if !strings.Contains(evidence, expected) {
			t.Fatalf("scanned cgo evidence %q does not contain %q", evidence, expected)
		}
	}
}

func TestSemanticInstrumentationConstraintsAreDeclarationTags(t *testing.T) {
	custom, experiments := semanticProfileDimensions([]FileReport{{Path: "modes.go", BuildTags: []string{"race || msan || asan"}}})
	if strings.Join(custom, ",") != "asan,msan,race" || len(experiments) != 0 {
		t.Fatalf("declaration profile dimensions: custom=%v experiments=%v", custom, experiments)
	}
}

func TestSemanticCgoRequirementsIgnoreOrdinaryDeclarationProfiles(t *testing.T) {
	files := []FileReport{
		{Path: "portable.go", BuildTags: []string{"linux && amd64"}, Imports: []ImportReport{{Path: "fmt"}}},
		{Path: "custom.go", BuildTags: []string{"feature && !goexperiment.boringcrypto"}},
	}
	if requirements := semanticCgoRequirements(files); len(requirements) != 0 {
		t.Fatalf("ordinary declaration profiles classified as cgo-dependent: %#v", requirements)
	}
	requireNoSemanticCgo(files)
}

func TestSemanticCgoFailsBeforeProfileEnumeration(t *testing.T) {
	if os.Getenv("TSTS_PORTER_TEST_CGO_REJECTION") == "reject-cgo-profile" {
		requireNoSemanticCgo([]FileReport{
			{Path: "native.go", Imports: []ImportReport{{Path: "C"}}},
			{Path: "cgo_variant.go", BuildTags: []string{"cgo && linux"}},
		})
		os.Exit(0)
	}
	command := exec.Command(os.Args[0], "-test.run=^TestSemanticCgoFailsBeforeProfileEnumeration$")
	command.Env = append(os.Environ(), "TSTS_PORTER_TEST_CGO_REJECTION=reject-cgo-profile")
	output, err := command.CombinedOutput()
	if err == nil {
		t.Fatalf("cgo-dependent declaration profile did not fail hard:\n%s", output)
	}
	exitError, ok := err.(*exec.ExitError)
	if !ok || exitError.ExitCode() != 1 {
		t.Fatalf("cgo-dependent declaration profile terminated unexpectedly: error=%v output=%s", err, output)
	}
	message := string(output)
	for _, expected := range []string{
		"exact declaration extraction rejects cgo-dependent source",
		"native C compiler, header, linker, and generated cgo artifact provenance is not pinned",
		`native.go: import "C" [import]`,
		"cgo_variant.go: cgo in cgo && linux [build-constraint]",
	} {
		if !strings.Contains(message, expected) {
			t.Fatalf("cgo rejection evidence %q does not contain %q", message, expected)
		}
	}
}

func TestSemanticCgoRequirementEvidenceIsDeterministicAndDeduplicated(t *testing.T) {
	files := []FileReport{
		{Path: "z.go", BuildTags: []string{"cgo || cgo"}},
		{Path: "a.go", Imports: []ImportReport{{Path: "C"}, {Path: "C"}}},
	}
	evidence := semanticCgoRequirementEvidence(semanticCgoRequirements(files))
	expected := `a.go: import "C" [import]; z.go: cgo in cgo || cgo [build-constraint]`
	if evidence != expected {
		t.Fatalf("cgo rejection evidence = %q, want %q", evidence, expected)
	}
}
