package main

import (
	"os"
	"path/filepath"
	"testing"

	"golang.org/x/mod/sumdb/dirhash"
	"golang.org/x/tools/go/packages"
)

func TestSemanticModuleContentSealMatchesGoModuleHash(t *testing.T) {
	directory := t.TempDir()
	if err := os.WriteFile(filepath.Join(directory, "value.go"), []byte("package value\n"), 0o600); err != nil {
		t.Fatal(err)
	}
	prefix := "example.test/value@v1.2.3"
	sum, err := dirhash.HashDir(directory, prefix, dirhash.Hash1)
	if err != nil {
		t.Fatal(err)
	}
	module := &packages.Module{Path: "example.test/value", Version: "v1.2.3", Dir: directory}
	selection := exactSemanticModuleSelection{Path: module.Path, Version: module.Version, Sum: sum}
	seal, err := semanticModuleContentSealFor(module, selection)
	if err != nil {
		t.Fatal(err)
	}
	if seal.prefix != prefix || seal.sum != sum {
		t.Fatalf("seal = %#v", seal)
	}
}

func TestSemanticModuleContentSealRejectsChecksumDrift(t *testing.T) {
	directory := t.TempDir()
	if err := os.WriteFile(filepath.Join(directory, "value.go"), []byte("package value\n"), 0o600); err != nil {
		t.Fatal(err)
	}
	module := &packages.Module{Path: "example.test/value", Version: "v1.2.3", Dir: directory}
	selection := exactSemanticModuleSelection{Path: module.Path, Version: module.Version, Sum: "h1:wrong"}
	if _, err := semanticModuleContentSealFor(module, selection); err == nil {
		t.Fatal("checksum drift was accepted")
	}
}
