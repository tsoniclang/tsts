package main

import (
	"go/ast"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"testing"
)

func TestDeclarationImportPruningUsesResolvedPackageObjectsOutsideBodies(t *testing.T) {
	source := `package sample
import (
	runtimeapi "fmt"
	declaredapi "time"
	. "io"
	. "math"
	_ "embed"
)
type Record struct { runtimeapi int }
func Read(value declaredapi.Duration, writer Writer) {}
func execute() { runtimeapi.Println("body only"); _ = Sqrt(4) }
`
	fileSet := token.NewFileSet()
	parsed, err := parser.ParseFile(fileSet, "sample.go", source, parser.ParseComments)
	if err != nil {
		t.Fatal(err)
	}
	info := newDeclarationTypeInfo()
	configuration := &types.Config{Importer: importer.Default(), IgnoreFuncBodies: true, DisableUnusedImportCheck: true}
	if _, err := configuration.Check("example.test/prune", fileSet, []*ast.File{parsed}, info); err != nil {
		t.Fatalf("resolve declaration imports: %v", err)
	}
	pruneDeclarationOnlyImportsFromInfo([]*ast.File{parsed}, info)
	if len(parsed.Imports) != 2 || parsed.Imports[0].Path.Value != `"time"` || parsed.Imports[1].Path.Value != `"io"` {
		t.Fatalf("declaration-only imports = %#v", parsed.Imports)
	}
}
