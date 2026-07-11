package main

import (
	"path/filepath"
	"testing"
)

func TestSemanticTypesCarryExactGoNilability(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/nilability"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "types.go"), `package nilability
type Pointer *int
type Slice []int
type Mapping map[string]int
type Channel chan int
type Function func(int) bool
type Contract interface { Apply(int) bool }
type Array [2]int
type Record struct { Value int }
type Number int
type NilableParameter[T ~[]int] struct { Value T }
type AnyParameter[T any] struct { Value T }
`)

	snapshot := declarationSnapshot(t, root, modulePath)
	for _, name := range []string{"Pointer", "Slice", "Mapping", "Channel", "Function", "Contract"} {
		declaration := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", name))
		if !declaration.Object.Type.Nilable || !declaration.Type.RHS.Nilable {
			t.Fatalf("%s nilability was not preserved: object=%#v rhs=%#v", name, declaration.Object.Type, declaration.Type.RHS)
		}
	}
	for _, name := range []string{"Array", "Record", "Number"} {
		declaration := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", name))
		if declaration.Object.Type.Nilable || declaration.Type.RHS.Nilable {
			t.Fatalf("%s was incorrectly reported nilable: object=%#v rhs=%#v", name, declaration.Object.Type, declaration.Type.RHS)
		}
	}

	nilableParameter := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "NilableParameter")).Type.RHS.Struct.Fields[0].Variable.Type
	if !nilableParameter.Nilable {
		t.Fatalf("slice-constrained type parameter was not reported nilable: %#v", nilableParameter)
	}
	anyParameter := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "AnyParameter")).Type.RHS.Struct.Fields[0].Variable.Type
	if anyParameter.Nilable {
		t.Fatalf("any-constrained type parameter was incorrectly reported nilable: %#v", anyParameter)
	}
}
