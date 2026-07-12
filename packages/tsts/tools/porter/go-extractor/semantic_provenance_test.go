package main

import (
	"os"
	"path/filepath"
	"testing"

	"golang.org/x/tools/go/packages"
)

func TestGoListCapabilityErrorsDoNotReplaceDeclarationChecking(t *testing.T) {
	if semanticPackageErrorAffectsDeclarations(packages.Error{Kind: packages.ListError}) {
		t.Fatal("go list capability errors must be left to the independent declaration checker")
	}
	for _, kind := range []packages.ErrorKind{packages.UnknownError, packages.ParseError, packages.TypeError} {
		if !semanticPackageErrorAffectsDeclarations(packages.Error{Kind: kind}) {
			t.Fatalf("declaration-affecting package error kind %d was ignored", kind)
		}
	}
}

func TestGoToolchainRootHashMatchesCrossLanguageContract(t *testing.T) {
	root, err := os.MkdirTemp("", "tsts-goroot-hash-")
	if err != nil {
		t.Fatal(err)
	}
	bin := filepath.Join(root, "bin")
	lib := filepath.Join(root, "lib")
	for _, directory := range []string{root, bin, lib} {
		if directory != root {
			if err := os.Mkdir(directory, 0o755); err != nil {
				t.Fatal(err)
			}
		}
		if err := os.Chmod(directory, 0o755); err != nil {
			t.Fatal(err)
		}
	}
	writeFixtureFile := func(filename string, content string, mode os.FileMode) {
		if err := os.WriteFile(filename, []byte(content), mode); err != nil {
			t.Fatal(err)
		}
		if err := os.Chmod(filename, mode); err != nil {
			t.Fatal(err)
		}
	}
	writeFixtureFile(filepath.Join(bin, "tool"), "#!/bin/sh\nexit 0\n", 0o755)
	writeFixtureFile(filepath.Join(lib, "data.txt"), "alpha\x00beta\n", 0o644)
	if err := os.Symlink("lib/data.txt", filepath.Join(root, "alias")); err != nil {
		t.Fatal(err)
	}
	seal, err := hashGoToolchainRoot(root)
	if err != nil {
		t.Fatal(err)
	}
	const expected = "e9438fb2b08e3255f850123a8437fd10cd73f3d2367351e5615272f35108ef7f"
	if seal.SHA256 != expected {
		t.Fatalf("GOROOT tree digest = %s, expected %s", seal.SHA256, expected)
	}
	if seal.Contract != "tsts-porter-goroot-tree-v1" || seal.EntryCount != 5 || seal.FileCount != 2 || seal.DirectoryCount != 2 || seal.SymlinkCount != 1 || seal.Bytes != 28 {
		t.Fatalf("GOROOT tree seal = %#v", seal)
	}
}

func TestPackageBelongsToModuleHonorsExactModuleOwnership(t *testing.T) {
	rootPath := "example.test/root"
	root := &packages.Package{PkgPath: rootPath + "/pkg", Module: &packages.Module{Path: rootPath}}
	nested := &packages.Package{PkgPath: rootPath + "/nested/pkg", Module: &packages.Module{Path: rootPath + "/nested"}}
	withoutMetadata := &packages.Package{PkgPath: rootPath + "/unproven"}

	if !packageBelongsToModule(root, rootPath) {
		t.Fatal("root module package was not recognized")
	}
	if packageBelongsToModule(nested, rootPath) {
		t.Fatal("nested module package was attributed to its path-prefix parent")
	}
	if packageBelongsToModule(withoutMetadata, rootPath) {
		t.Fatal("package without module metadata was guessed to belong to the module")
	}
}

func TestSemanticModuleReportUsesExactChecksums(t *testing.T) {
	module := &packages.Module{Path: "example.test/dependency", Version: "v1.2.3"}
	selections := map[string]exactSemanticModuleSelection{
		module.Path: {Path: module.Path, Version: module.Version, Sum: "h1:source"},
	}
	report := semanticModuleReport(module, selections)
	if report.Sum != "h1:source" || report.ReplacePath != "" || report.ReplaceSum != "" {
		t.Fatalf("module report = %#v", report)
	}
}

func TestSemanticModuleReportUsesExactReplacementChecksum(t *testing.T) {
	replacement := &packages.Module{Path: "example.test/replacement", Version: "v2.0.0"}
	module := &packages.Module{Path: "example.test/dependency", Version: "v1.2.3", Replace: replacement}
	selections := map[string]exactSemanticModuleSelection{
		module.Path: {
			Path: module.Path, Version: module.Version, Sum: "h1:original",
			Replace: &exactSemanticModuleSelection{Path: replacement.Path, Version: replacement.Version, Sum: "h1:replacement"},
		},
	}
	report := semanticModuleReport(module, selections)
	if report.ReplacePath != replacement.Path || report.ReplaceVersion != replacement.Version || report.ReplaceSum != "h1:replacement" {
		t.Fatalf("replacement module report = %#v", report)
	}
}
