package main

import (
	"go/ast"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"path/filepath"
	"testing"
)

func TestExternalDeclarationsComeFromExactGoTypesObjects(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/external"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "external.go"), `package external
import (
	"context"
	"io"
	"time"
)
func Use(writer io.Writer, duration time.Duration, cancel context.CancelFunc, instant time.Time) {}
`)
	snapshot := declarationSnapshot(t, root, modulePath)

	writer := requireExternalTypeDeclaration(t, snapshot, "io::type::Writer")
	if writer.Type == nil || writer.Type.Alias || writer.Type.RHS.Kind != "interface" || !writer.Type.RHS.Nilable {
		t.Fatalf("io.Writer declaration = %#v", writer.Type)
	}
	methods := writer.Type.RHS.Interface.ExplicitMethods
	if len(methods) != 1 || methods[0].Name != "Write" || methods[0].Signature.Variadic {
		t.Fatalf("io.Writer methods = %#v", methods)
	}
	writeParameter := methods[0].Signature.Parameters.Variables[0].Type
	if writeParameter.Kind != "slice" || !writeParameter.Nilable || writeParameter.Element.Basic.Name != "byte" {
		t.Fatalf("io.Writer.Write parameter = %#v", writeParameter)
	}
	writeResults := methods[0].Signature.Results.Variables
	if len(writeResults) != 2 || writeResults[0].Type.Basic.Name != "int" || writeResults[1].Type.Reference.ObjectID != "builtin::type::error" {
		t.Fatalf("io.Writer.Write results = %#v", writeResults)
	}

	duration := requireExternalTypeDeclaration(t, snapshot, "time::type::Duration")
	if duration.Type == nil || duration.Type.Alias || duration.Type.RHS.Kind != "basic" || duration.Type.RHS.Basic.Name != "int64" || duration.Type.RHS.Nilable {
		t.Fatalf("time.Duration declaration = %#v", duration.Type)
	}

	cancel := requireExternalTypeDeclaration(t, snapshot, "context::type::CancelFunc")
	if cancel.Type == nil || cancel.Type.Alias || cancel.Type.RHS.Kind != "signature" || !cancel.Type.RHS.Nilable {
		t.Fatalf("context.CancelFunc declaration = %#v", cancel.Type)
	}

	instant := requireExternalTypeDeclaration(t, snapshot, "time::type::Time")
	methodFound := false
	for _, method := range instant.Type.Methods {
		if method.Name != "Add" {
			continue
		}
		methodFound = true
		if method.Signature.Receiver == nil || method.Signature.Receiver.Type.Reference.ObjectID != "time::type::Time" {
			t.Fatalf("time.Time.Add receiver = %#v", method.Signature.Receiver)
		}
	}
	if !methodFound {
		t.Fatalf("time.Time external declaration has no exact Add method: %#v", instant.Type.Methods)
	}
	location := requireExternalTypeDeclaration(t, snapshot, "time::type::Location")
	if location.Type == nil || location.Type.RHS.Kind != "struct" {
		t.Fatalf("transitive time.Location declaration = %#v", location.Type)
	}
}

func TestExternalDeclarationsRetainAliasGenericsInterfacesAndVariadics(t *testing.T) {
	dependency := checkExternalFixturePackage(t, "example.test/dependency", `package dependency

import "fmt"

type Scalar = int64

type Box[T comparable] struct { Value T }

func (box *Box[T]) Set(value T) { box.Value = value }

type Reader interface {
	fmt.Stringer
	Read(buffer []byte) (int, error)
}

type Callback func(prefix string, values ...int) (bool, error)
`)
	declarations := []SemanticDeclarationReport{}
	for _, name := range []string{"Scalar", "Box", "Reader", "Callback"} {
		object, ok := dependency.Scope().Lookup(name).(*types.TypeName)
		if !ok || object == nil {
			t.Fatalf("dependency.%s is not one go/types TypeName", name)
		}
		report := semanticExternalTypeDeclaration(newExternalSemanticTypeEncoder(), object)
		report.Profiles = []int{0}
		declarations = append(declarations, report)
	}
	snapshot := Snapshot{Semantic: SemanticEvidenceReport{ExternalDeclarations: declarations}}

	scalar := requireExternalTypeDeclaration(t, snapshot, "example.test/dependency::type::Scalar")
	if scalar.Type == nil || !scalar.Type.Alias || scalar.Object.Type.Kind != "alias" || scalar.Type.RHS.Kind != "basic" || scalar.Type.RHS.Basic.Name != "int64" || scalar.Type.RHS.Nilable {
		t.Fatalf("dependency.Scalar declaration = %#v", scalar.Type)
	}

	box := requireExternalTypeDeclaration(t, snapshot, "example.test/dependency::type::Box")
	if box.Type == nil || box.Type.Alias || len(box.Type.TypeParameters) != 1 || box.Type.TypeParameters[0].Constraint.Kind != "named" || box.Type.TypeParameters[0].Constraint.Reference.ObjectID != "builtin::type::comparable" {
		t.Fatalf("dependency.Box type parameters = %#v", box.Type)
	}
	if box.Type.RHS.Kind != "struct" || len(box.Type.RHS.Struct.Fields) != 1 || box.Type.RHS.Struct.Fields[0].Variable.Type.Kind != "typeParameter" {
		t.Fatalf("dependency.Box RHS = %#v", box.Type.RHS)
	}
	if len(box.Type.Methods) != 1 ||
		box.Type.Methods[0].ID != "example.test/dependency::type::Box::method::Set" ||
		box.Type.Methods[0].OwnerID != box.Object.ID ||
		box.Type.Methods[0].Signature.Receiver == nil ||
		len(box.Type.Methods[0].Signature.ReceiverTypeParameters) != 1 {
		t.Fatalf("dependency.Box methods = %#v", box.Type.Methods)
	}
	setSignature := box.Type.Methods[0].Signature
	if setSignature.Receiver.Type.Kind != "pointer" ||
		setSignature.Receiver.Type.Element.Reference.ObjectID != box.Object.ID ||
		len(setSignature.Parameters.Variables) != 1 ||
		setSignature.Parameters.Variables[0].Type.Kind != "typeParameter" {
		t.Fatalf("dependency.Box.Set signature = %#v", setSignature)
	}

	reader := requireExternalTypeDeclaration(t, snapshot, "example.test/dependency::type::Reader")
	if reader.Type == nil || reader.Type.RHS.Kind != "interface" || len(reader.Type.RHS.Interface.ExplicitMethods) != 1 || reader.Type.RHS.Interface.ExplicitMethods[0].Name != "Read" {
		t.Fatalf("dependency.Reader explicit methods = %#v", reader.Type)
	}
	if len(reader.Type.RHS.Interface.EmbeddedTypes) != 1 || reader.Type.RHS.Interface.EmbeddedTypes[0].Reference.ObjectID != "fmt::type::Stringer" || reader.Type.RHS.Interface.EmbeddedKinds[0] != "interface" {
		t.Fatalf("dependency.Reader embeddings = %#v", reader.Type.RHS.Interface)
	}
	if len(reader.Type.RHS.Interface.CompleteMethods) != 2 {
		t.Fatalf("dependency.Reader complete methods = %#v", reader.Type.RHS.Interface.CompleteMethods)
	}

	callback := requireExternalTypeDeclaration(t, snapshot, "example.test/dependency::type::Callback")
	if callback.Type == nil || callback.Type.RHS.Kind != "signature" || !callback.Type.RHS.Nilable || !callback.Type.RHS.Signature.Variadic {
		t.Fatalf("dependency.Callback declaration = %#v", callback.Type)
	}
	parameters := callback.Type.RHS.Signature.Parameters.Variables
	results := callback.Type.RHS.Signature.Results.Variables
	if len(parameters) != 2 ||
		parameters[0].Name != "prefix" ||
		parameters[1].Name != "values" ||
		parameters[1].Type.Kind != "slice" ||
		parameters[1].Type.Element.Basic.Name != "int" {
		t.Fatalf("dependency.Callback parameters = %#v", parameters)
	}
	if len(results) != 2 || results[0].Type.Basic.Name != "bool" || results[1].Type.Reference.ObjectID != "builtin::type::error" {
		t.Fatalf("dependency.Callback results = %#v", results)
	}
}

func checkExternalFixturePackage(t *testing.T, packagePath string, source string) *types.Package {
	t.Helper()
	fileSet := token.NewFileSet()
	file, err := parser.ParseFile(fileSet, "dependency.go", source, parser.AllErrors)
	if err != nil {
		t.Fatalf("parse external fixture: %v", err)
	}
	checked, err := (&types.Config{Importer: importer.Default(), GoVersion: "go1.26"}).Check(packagePath, fileSet, []*ast.File{file}, nil)
	if err != nil {
		t.Fatalf("check external fixture: %v", err)
	}
	return checked
}

func requireExternalTypeDeclaration(t *testing.T, snapshot Snapshot, objectID string) SemanticDeclarationReport {
	t.Helper()
	for _, declaration := range snapshot.Semantic.ExternalDeclarations {
		if declaration.Object != nil && declaration.Object.ID == objectID {
			return declaration
		}
	}
	t.Fatalf("external declaration %s is missing", objectID)
	return SemanticDeclarationReport{}
}
