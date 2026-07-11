package main

import (
	"go/ast"
	"go/parser"
	"go/token"
	"path/filepath"
	"testing"

	"golang.org/x/tools/go/packages"
)

func TestDeclarationImportPruningIgnoresBodiesButKeepsSignatureImports(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/prune"
	writeTestFile(t, filepath.Join(root, "bodydep", "dep.go"), "package runtimeapi\ntype Token struct{}\n")
	writeTestFile(t, filepath.Join(root, "typedep", "dep.go"), "package declaredapi\ntype Token struct{}\n")
	source := `package sample
import (
	"example.test/prune/bodydep"
	"example.test/prune/typedep"
)
func Read(value declaredapi.Token) { _ = runtimeapi.Token{} }
`
	parsed, err := parser.ParseFile(token.NewFileSet(), filepath.Join(root, "sample.go"), source, parser.ParseComments)
	if err != nil {
		t.Fatal(err)
	}
	checker := &declarationPackageChecker{root: root, modulePath: modulePath, profile: semanticBuildProfile{GOOS: "linux", GOARCH: "amd64"}}
	pruneDeclarationOnlyImports(checker, &packages.Package{Imports: map[string]*packages.Package{}}, []*ast.File{parsed})
	if len(parsed.Imports) != 1 || parsed.Imports[0].Path.Value != `"example.test/prune/typedep"` {
		t.Fatalf("declaration-only imports = %#v", parsed.Imports)
	}
}
