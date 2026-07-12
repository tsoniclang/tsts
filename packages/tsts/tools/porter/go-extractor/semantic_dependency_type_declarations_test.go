package main

import (
	"encoding/json"
	"go/ast"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

func TestDependencyTypeDeclarationsContainOnlyReachableExactGoTypes(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/external"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "external.go"), `package external
import (
	"context"
	"io"
	"time"
	"unsafe"
)
func Use(writer io.Writer, duration time.Duration, cancel context.CancelFunc, instant time.Time, pointer unsafe.Pointer) {}
`)
	snapshot := declarationSnapshot(t, root, modulePath)

	writer := requireDependencyTypeDeclaration(t, snapshot, "io::type::Writer")
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

	duration := requireDependencyTypeDeclaration(t, snapshot, "time::type::Duration")
	if duration.Type == nil || duration.Type.Alias || duration.Type.RHS.Kind != "basic" || duration.Type.RHS.Basic.Name != "int64" || duration.Type.RHS.Nilable {
		t.Fatalf("time.Duration declaration = %#v", duration.Type)
	}

	cancel := requireDependencyTypeDeclaration(t, snapshot, "context::type::CancelFunc")
	if cancel.Type == nil || cancel.Type.Alias || cancel.Type.RHS.Kind != "signature" || !cancel.Type.RHS.Nilable {
		t.Fatalf("context.CancelFunc declaration = %#v", cancel.Type)
	}

	instant := requireDependencyTypeDeclaration(t, snapshot, "time::type::Time")
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
		t.Fatalf("time.Time dependency declaration has no exact Add method: %#v", instant.Type.Methods)
	}
	location := requireDependencyTypeDeclaration(t, snapshot, "time::type::Location")
	if location.Type == nil || location.Type.RHS.Kind != "struct" {
		t.Fatalf("transitive time.Location declaration = %#v", location.Type)
	}
	pointer := requireDependencyTypeDeclaration(t, snapshot, "unsafe::type::Pointer")
	if pointer.Type == nil || pointer.Type.RHS.Kind != "basic" || pointer.Type.RHS.Basic.Name != "Pointer" {
		t.Fatalf("unsafe.Pointer declaration = %#v", pointer.Type)
	}
	for _, absent := range []string{
		"context::type::Context",
		"io::type::Reader",
		"time::func::Now",
		"time::const::Nanosecond",
		"time::var::Local",
		"unsafe::builtin::Alignof",
		"unsafe::builtin::Sizeof",
	} {
		if declaration, ok := findDependencyTypeDeclaration(snapshot, absent); ok {
			t.Fatalf("unreachable or non-type package member %s entered dependency type closure: %#v", absent, declaration)
		}
	}
	for _, declaration := range snapshot.Semantic.DependencyTypeDeclarations {
		if declaration.Kind != "type" || declaration.Type == nil {
			t.Fatalf("dependency declaration closure contains non-type evidence: %#v", declaration)
		}
	}
}

func TestDependencyTypeDeclarationsRetainAliasGenericsInterfacesAndVariadics(t *testing.T) {
	dependency := checkSemanticFixturePackage(t, "example.test/dependency", `package dependency

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
		report := semanticDependencyTypeDeclaration(newDeclarationSurfaceSemanticTypeEncoder(), object)
		report.Profiles = []int{0}
		declarations = append(declarations, report)
	}
	snapshot := Snapshot{Semantic: SemanticEvidenceReport{DependencyTypeDeclarations: declarations}}

	scalar := requireDependencyTypeDeclaration(t, snapshot, "example.test/dependency::type::Scalar")
	if scalar.Type == nil || !scalar.Type.Alias || scalar.Object.Type.Kind != "alias" || scalar.Type.RHS.Kind != "basic" || scalar.Type.RHS.Basic.Name != "int64" || scalar.Type.RHS.Nilable {
		t.Fatalf("dependency.Scalar declaration = %#v", scalar.Type)
	}

	box := requireDependencyTypeDeclaration(t, snapshot, "example.test/dependency::type::Box")
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
	if setSignature.ReceiverMode != "pointer" || setSignature.Receiver.Type.Kind != "pointer" ||
		setSignature.Receiver.Type.Element.Reference.ObjectID != box.Object.ID ||
		len(setSignature.Parameters.Variables) != 1 ||
		setSignature.Parameters.Variables[0].Type.Kind != "typeParameter" {
		t.Fatalf("dependency.Box.Set signature = %#v", setSignature)
	}

	reader := requireDependencyTypeDeclaration(t, snapshot, "example.test/dependency::type::Reader")
	if reader.Type == nil || reader.Type.RHS.Kind != "interface" || len(reader.Type.RHS.Interface.ExplicitMethods) != 1 || reader.Type.RHS.Interface.ExplicitMethods[0].Name != "Read" {
		t.Fatalf("dependency.Reader explicit methods = %#v", reader.Type)
	}
	if len(reader.Type.RHS.Interface.EmbeddedTypes) != 1 || reader.Type.RHS.Interface.EmbeddedTypes[0].Reference.ObjectID != "fmt::type::Stringer" || reader.Type.RHS.Interface.EmbeddedKinds[0] != "interface" {
		t.Fatalf("dependency.Reader embeddings = %#v", reader.Type.RHS.Interface)
	}
	if len(reader.Type.RHS.Interface.CompleteMethods) != 2 {
		t.Fatalf("dependency.Reader complete methods = %#v", reader.Type.RHS.Interface.CompleteMethods)
	}

	callback := requireDependencyTypeDeclaration(t, snapshot, "example.test/dependency::type::Callback")
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

func TestDependencyTypeClosureIncludesExcludedLocalTypesWithoutDuplicatingActiveTypes(t *testing.T) {
	packagePath := "example.test/local/internal/fswatch"
	dependency := checkSemanticFixturePackage(t, packagePath, `package fswatch

type ActiveWatcher struct { backend excludedBackend }
type excludedBackend struct { option excludedOption }
func (excludedBackend) Close() error { return nil }
type excludedOption struct { Recursive bool }
`)
	activeObject, ok := dependency.Scope().Lookup("ActiveWatcher").(*types.TypeName)
	if !ok || activeObject == nil {
		t.Fatal("fixture ActiveWatcher type is missing")
	}
	encoder := newDeclarationSurfaceSemanticTypeEncoder()
	activeReport := semanticDependencyTypeDeclaration(encoder, activeObject)
	referenced := semanticTypeObjectSet{}
	for _, object := range encoder.referencedTypes {
		addSemanticTypeObject(referenced, object)
	}
	backendObject, ok := dependency.Scope().Lookup("excludedBackend").(*types.TypeName)
	if !ok || backendObject == nil || len(referenced[semanticObjectID(backendObject)]) != 1 || referenced[semanticObjectID(backendObject)][0] != backendObject {
		t.Fatalf("active declaration did not preserve the exact excluded-local type object: %#v", referenced)
	}
	activeIDs := activeSemanticTypeObjectIDs(map[string]SemanticDeclarationReport{"active": activeReport})
	declarations := semanticDependencyTypeDeclarations(referenced, activeIDs)
	if _, duplicated := declarations[semanticObjectID(activeObject)]; duplicated {
		t.Fatalf("active local type was duplicated in dependency declarations: %#v", declarations[semanticObjectID(activeObject)])
	}
	backend := declarations[semanticObjectID(backendObject)]
	if backend.Type == nil || backend.Object.Exported || backend.Type.MethodSurface != "complete" || len(backend.Type.Methods) != 1 || backend.Type.Methods[0].Name != "Close" {
		t.Fatalf("excluded local dependency type declaration = %#v", backend)
	}
	optionObject, ok := dependency.Scope().Lookup("excludedOption").(*types.TypeName)
	if !ok || optionObject == nil {
		t.Fatal("fixture excludedOption type is missing")
	}
	option := declarations[semanticObjectID(optionObject)]
	if option.Type == nil || option.Object.Exported || option.Type.RHS.Kind != "struct" || len(option.Type.RHS.Struct.Fields) != 1 {
		t.Fatalf("recursive excluded local dependency type declaration = %#v", option)
	}
}

func TestDependencyTypeClosureIncludesRecursiveUnexportedTypesAndCompleteMethodSets(t *testing.T) {
	packagePath := "example.test/surface"
	dependency := checkSemanticFixturePackage(t, packagePath, `package surface

type Leaf struct { Value int }
type hidden struct {
	Detail Leaf `+"`json:\"detail\" custom:\"value\" malformed`"+`
}
func (hidden) HiddenValue() Leaf { return Leaf{} }

type Sealed interface { seal() Leaf }

type Base struct{}
func (Base) Value() Leaf { return Leaf{} }
func (*Base) Pointer() *hidden { return nil }
func (_ Base) BlankReceiver() int { return 0 }

type Outer struct {
	Base
	Detail hidden
	Contract Sealed
}

type Generic[T any] struct{}
func (Generic[Item]) Echo(value Item) Item { return value }
type GenericOuter struct { Generic[Leaf] }

type Root struct {
	Outer
	GenericOuter
}

type Unused struct{}
const UnusedConst = 1
var UnusedVar Unused
func UnusedFunction() Unused { return Unused{} }
`)
	root, ok := dependency.Scope().Lookup("Root").(*types.TypeName)
	if !ok || root == nil {
		t.Fatal("fixture Root type is missing")
	}
	declarations := semanticDependencyTypeClosure(semanticTypeObjectSet{semanticObjectID(root): []*types.TypeName{root}}, map[string]bool{})
	snapshot := dependencyTypeDeclarationSnapshot(declarations)

	expected := []string{"Root", "Outer", "Base", "hidden", "Leaf", "Sealed", "GenericOuter", "Generic"}
	for _, name := range expected {
		declaration := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::"+name)
		if declaration.Type.MethodSurface != "complete" {
			t.Fatalf("dependency type %s has incomplete method surface: %#v", name, declaration.Type)
		}
	}
	for _, absent := range []string{
		packagePath + "::type::Unused",
		packagePath + "::const::UnusedConst",
		packagePath + "::var::UnusedVar",
		packagePath + "::func::UnusedFunction",
	} {
		if declaration, exists := declarations[absent]; exists {
			t.Fatalf("unreachable or non-type package member %s entered dependency type closure: %#v", absent, declaration)
		}
	}

	hidden := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::hidden")
	field := hidden.Type.RHS.Struct.Fields[0]
	if hidden.Object.Exported || field.Variable.PackagePath != packagePath || !field.Variable.Exported ||
		field.Tag != `json:"detail" custom:"value" malformed` || field.TagRemainder != " malformed" {
		t.Fatalf("unexported recursive dependency and struct-tag evidence = %#v", hidden)
	}
	if len(hidden.Type.Methods) != 1 || hidden.Type.Methods[0].Name != "HiddenValue" ||
		hidden.Type.Methods[0].Signature.Results.Variables[0].Type.Reference.ObjectID != packagePath+"::type::Leaf" {
		t.Fatalf("unexported dependency method surface = %#v", hidden.Type.Methods)
	}

	sealed := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::Sealed")
	method := sealed.Type.RHS.Interface.ExplicitMethods[0]
	if method.Name != "seal" || method.PackagePath != packagePath || method.Exported {
		t.Fatalf("unexported interface member package identity = %#v", method)
	}
	methodSet := sealed.Type.ValueMethodSet
	if len(methodSet) != 1 || methodSet[0].Key != packagePath+".seal" || methodSet[0].Name != "seal" || methodSet[0].Exported || methodSet[0].Signature == nil {
		t.Fatalf("interface method-set evidence = %#v", methodSet)
	}

	base := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::Base")
	for _, method := range base.Type.Methods {
		if method.Signature.Receiver == nil {
			t.Fatalf("declared receiver evidence = %#v", base.Type.Methods)
		}
		if method.Name == "BlankReceiver" {
			if method.Signature.Receiver.Name != "_" || method.Signature.Receiver.NameKind != "blank" || method.Signature.ReceiverMode != "value" {
				t.Fatalf("blank receiver evidence = %#v", method)
			}
		} else if method.Signature.Receiver.Name != "" || method.Signature.Receiver.NameKind != "unnamed" {
			t.Fatalf("unnamed receiver evidence = %#v", method)
		}
	}

	outer := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::Outer").Type
	if len(outer.Methods) != 0 || len(outer.ValueMethodSet) != 2 || len(outer.PointerMethodSet) != 3 {
		t.Fatalf("promoted method sets = %#v", outer)
	}
	methodOwners := map[string]string{}
	for _, selection := range append(append([]SemanticMethodSelectionReport{}, outer.ValueMethodSet...), outer.PointerMethodSet...) {
		if !selection.Promoted || len(selection.Index) < 2 || selection.Signature == nil {
			t.Fatalf("promoted selection path/signature = %#v", selection)
		}
		methodOwners[selection.Name] = selection.MethodOwnerID
	}
	if methodOwners["Value"] != packagePath+"::type::Base" || methodOwners["BlankReceiver"] != packagePath+"::type::Base" || methodOwners["Pointer"] != packagePath+"::type::Base" {
		t.Fatalf("promoted method declaration owners = %#v", outer.PointerMethodSet)
	}

	generic := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::Generic").Type.Methods[0].Signature
	constraintSource := generic.ReceiverTypeParameters[0].ConstraintSource
	if constraintSource == nil || constraintSource.OwnerID != packagePath+"::type::Generic" || constraintSource.Name != "T" || generic.ReceiverTypeParameters[0].Reference.Name != "Item" {
		t.Fatalf("generic receiver constraint source = %#v", generic.ReceiverTypeParameters)
	}
	genericSelection := requireDependencyTypeDeclaration(t, snapshot, packagePath+"::type::GenericOuter").Type.ValueMethodSet[0]
	if !genericSelection.Promoted || genericSelection.MethodID != packagePath+"::type::Generic::method::Echo" ||
		genericSelection.Signature.Parameters.Variables[0].Type.Reference.ObjectID != packagePath+"::type::Leaf" ||
		genericSelection.Signature.Results.Variables[0].Type.Reference.ObjectID != packagePath+"::type::Leaf" {
		t.Fatalf("instantiated promoted method selection = promoted=%v methodId=%s selectedParameter=%#v selectedResult=%#v",
			genericSelection.Promoted, genericSelection.MethodID,
			genericSelection.Signature.Parameters.Variables[0].Type, genericSelection.Signature.Results.Variables[0].Type)
	}

	encoded, err := json.Marshal(snapshot.Semantic)
	if err != nil {
		t.Fatalf("encode dependency type closure: %v", err)
	}
	encodedText := string(encoded)
	if !strings.Contains(encodedText, `"dependencyTypeDeclarations"`) || strings.Contains(encodedText, `"externalDeclarations"`) || strings.Contains(encodedText, `"externalRole"`) {
		t.Fatalf("dependency declaration snapshot retained a legacy schema path: %s", encoded)
	}
}

func TestUnsafePointerIsTheOnlyReachableUnsafeDependencyType(t *testing.T) {
	pointer, ok := types.Unsafe.Scope().Lookup("Pointer").(*types.TypeName)
	if !ok || pointer == nil {
		t.Fatal("unsafe.Pointer type object is missing")
	}
	declarations := semanticDependencyTypeClosure(semanticTypeObjectSet{semanticObjectID(pointer): []*types.TypeName{pointer}}, map[string]bool{})
	if len(declarations) != 1 {
		t.Fatalf("unsafe.Pointer closure contains unrelated unsafe declarations: %#v", declarations)
	}
	report := declarations[semanticObjectID(pointer)]
	if report.Kind != "type" || report.Type == nil || report.Object.ID != "unsafe::type::Pointer" || report.Type.RHS.Basic.Name != "Pointer" {
		t.Fatalf("unsafe.Pointer declaration kind=%q object=%#v type=%#v", report.Kind, report.Object, report.Type)
	}
}

func checkSemanticFixturePackage(t *testing.T, packagePath string, source string) *types.Package {
	t.Helper()
	fileSet := token.NewFileSet()
	file, err := parser.ParseFile(fileSet, "dependency.go", source, parser.AllErrors)
	if err != nil {
		t.Fatalf("parse semantic fixture: %v", err)
	}
	checked, err := (&types.Config{Importer: importer.Default(), GoVersion: "go1.26", IgnoreFuncBodies: true}).Check(packagePath, fileSet, []*ast.File{file}, nil)
	if err != nil {
		t.Fatalf("check semantic fixture: %v", err)
	}
	return checked
}

func dependencyTypeDeclarationSnapshot(declarations map[string]SemanticDeclarationReport) Snapshot {
	identities := make([]string, 0, len(declarations))
	for identity := range declarations {
		identities = append(identities, identity)
	}
	sort.Strings(identities)
	reports := make([]SemanticDeclarationReport, 0, len(identities))
	for _, identity := range identities {
		reports = append(reports, declarations[identity])
	}
	return Snapshot{Semantic: SemanticEvidenceReport{DependencyTypeDeclarations: reports}}
}

func requireDependencyTypeDeclaration(t *testing.T, snapshot Snapshot, objectID string) SemanticDeclarationReport {
	t.Helper()
	declaration := requireDependencyTypeDeclarationReport(t, snapshot, objectID)
	if declaration.Kind != "type" || declaration.Type == nil {
		t.Fatalf("dependency declaration %s is not a type: %#v", objectID, declaration)
	}
	return declaration
}

func requireDependencyTypeDeclarationReport(t *testing.T, snapshot Snapshot, objectID string) SemanticDeclarationReport {
	t.Helper()
	if declaration, ok := findDependencyTypeDeclaration(snapshot, objectID); ok {
		return declaration
	}
	t.Fatalf("dependency declaration %s is missing", objectID)
	return SemanticDeclarationReport{}
}

func findDependencyTypeDeclaration(snapshot Snapshot, objectID string) (SemanticDeclarationReport, bool) {
	for _, declaration := range snapshot.Semantic.DependencyTypeDeclarations {
		if declaration.Object != nil && declaration.Object.ID == objectID {
			return declaration, true
		}
	}
	return SemanticDeclarationReport{}, false
}
