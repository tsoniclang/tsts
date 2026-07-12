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
	now := requireExternalDeclaration(t, snapshot, "time::func::Now")
	nanosecond := requireExternalDeclaration(t, snapshot, "time::const::Nanosecond")
	local := requireExternalDeclaration(t, snapshot, "time::var::Local")
	if now.ExternalRole != externalRolePackageExport || now.Kind != "func" || now.Signature == nil || now.Signature.Results.Variables[0].Type.Reference.ObjectID != "time::type::Time" {
		t.Fatalf("time.Now package export = %#v", now)
	}
	if nanosecond.Kind != "const" || nanosecond.ValueSpecs[0].Names[0].Constant == nil || nanosecond.ValueSpecs[0].Names[0].Constant.Exact != "1" {
		t.Fatalf("time.Nanosecond package export = %#v", nanosecond)
	}
	if local.Kind != "var" || local.ValueSpecs[0].Names[0].Type.Kind != "pointer" || local.ValueSpecs[0].Names[0].Type.Element.Reference.ObjectID != "time::type::Location" {
		t.Fatalf("time.Local package export = %#v", local)
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
	if setSignature.ReceiverMode != "pointer" || setSignature.Receiver.Type.Kind != "pointer" ||
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

func TestExternalPackageSurfaceRetainsEveryExportAndExactDependencyEvidence(t *testing.T) {
	packagePath := "example.test/surface"
	dependency := checkExternalFixturePackage(t, packagePath, `package surface

type Alias = int
type Defined int
type hidden struct {
	private int `+"`json:\"private\" custom:\"value\" malformed`"+`
}
type Sealed interface { seal() }

type Base struct{}
func (Base) Value() int { return 0 }
func (*Base) Pointer() int { return 0 }
func (_ Base) BlankReceiver() int { return 0 }
type Outer struct { Base }

type Generic[T any] struct{}
func (Generic[Item]) Echo(value Item) Item { return value }
type GenericOuter struct { Generic[int] }

const Untyped = 1
const Typed int = 1
var Exported hidden

func Named(named int, _ string) (result hidden, _ error) { panic("body") }
func Unnamed(int, string) (hidden, error) { panic("body") }
func privateFunction() {}
`)

	exports := externalPackageExports(dependency)
	exportNames := map[string]bool{}
	declarations := map[string]SemanticDeclarationReport{}
	for _, object := range exports {
		exportNames[object.Name()] = true
		declaration := semanticExternalDeclaration(newExternalSemanticTypeEncoder(), object, externalRolePackageExport)
		declarations[object.Name()] = declaration
		if declaration.ExternalRole != externalRolePackageExport || declaration.Object == nil || !declaration.Object.Exported {
			t.Fatalf("selected external package export %s = %#v", object.Name(), declaration)
		}
	}
	for _, expected := range []string{"Alias", "Defined", "Sealed", "Base", "Outer", "Generic", "GenericOuter", "Untyped", "Typed", "Exported", "Named", "Unnamed"} {
		if !exportNames[expected] {
			t.Fatalf("selected external package surface omitted %s: %v", expected, exportNames)
		}
	}
	if exportNames["hidden"] || exportNames["privateFunction"] {
		t.Fatalf("unexported declarations entered selected package surface: %v", exportNames)
	}

	if !declarations["Alias"].Type.Alias || declarations["Defined"].Type.Alias {
		t.Fatalf("alias/defined identity = alias:%#v defined:%#v", declarations["Alias"].Type, declarations["Defined"].Type)
	}
	if !declarations["Untyped"].ValueSpecs[0].Names[0].Type.Basic.Untyped || declarations["Typed"].ValueSpecs[0].Names[0].Type.Basic.Untyped {
		t.Fatalf("typedness = untyped:%#v typed:%#v", declarations["Untyped"], declarations["Typed"])
	}

	named := declarations["Named"].Signature
	if named.Parameters.Variables[0].Name != "named" || named.Parameters.Variables[0].NameKind != "named" ||
		named.Parameters.Variables[1].Name != "_" || named.Parameters.Variables[1].NameKind != "blank" ||
		named.Results.Variables[0].Name != "result" || named.Results.Variables[0].NameKind != "named" ||
		named.Results.Variables[1].Name != "_" || named.Results.Variables[1].NameKind != "blank" {
		t.Fatalf("named/blank parameter and result evidence = %#v", named)
	}
	unnamed := declarations["Unnamed"].Signature
	for _, variable := range append(append([]SemanticVariableReport{}, unnamed.Parameters.Variables...), unnamed.Results.Variables...) {
		if variable.Name != "" || variable.NameKind != "unnamed" {
			t.Fatalf("unnamed parameter/result evidence = %#v", unnamed)
		}
	}

	hiddenObject, ok := dependency.Scope().Lookup("hidden").(*types.TypeName)
	if !ok || hiddenObject == nil {
		t.Fatal("fixture hidden type is missing")
	}
	namedEncoder := newExternalSemanticTypeEncoder()
	semanticExternalDeclaration(namedEncoder, dependency.Scope().Lookup("Named"), externalRolePackageExport)
	if namedEncoder.referencedTypes[semanticObjectID(hiddenObject)] != hiddenObject {
		t.Fatalf("exported function did not retain its unexported dependency type: %#v", namedEncoder.referencedTypes)
	}
	pending := map[string]externalSemanticObject{}
	setExternalSemanticObject(pending, hiddenObject, externalRoleDependencyType)
	if pending[semanticObjectID(hiddenObject)].role != externalRoleDependencyType {
		t.Fatalf("unexported dependency was marked as public: %#v", pending)
	}
	hidden := semanticExternalDeclaration(newExternalSemanticTypeEncoder(), hiddenObject, externalRoleDependencyType)
	field := hidden.Type.RHS.Struct.Fields[0]
	if hidden.ExternalRole != externalRoleDependencyType || hidden.Object.Exported || field.Variable.PackagePath != packagePath || field.Variable.Exported ||
		field.Tag != `json:"private" custom:"value" malformed` || field.TagRemainder != " malformed" {
		t.Fatalf("unexported dependency and struct-tag evidence = %#v", hidden)
	}

	sealed := declarations["Sealed"].Type.RHS.Interface.ExplicitMethods[0]
	if sealed.Name != "seal" || sealed.PackagePath != packagePath || sealed.Exported {
		t.Fatalf("unexported interface member package identity = %#v", sealed)
	}
	sealedMethodSet := declarations["Sealed"].Type.ValueMethodSet
	if len(sealedMethodSet) != 1 || sealedMethodSet[0].Key != packagePath+".seal" || sealedMethodSet[0].Method.Signature.Receiver != nil || sealedMethodSet[0].Signature == nil {
		t.Fatalf("interface method-set evidence = %#v", sealedMethodSet)
	}
	for _, method := range declarations["Base"].Type.Methods {
		if method.Signature.Receiver == nil {
			t.Fatalf("declared receiver evidence = %#v", declarations["Base"].Type.Methods)
		}
		if method.Name == "BlankReceiver" {
			if method.Signature.Receiver.Name != "_" || method.Signature.Receiver.NameKind != "blank" || method.Signature.ReceiverMode != "value" {
				t.Fatalf("blank receiver evidence = %#v", method)
			}
		} else if method.Signature.Receiver.Name != "" || method.Signature.Receiver.NameKind != "unnamed" {
			t.Fatalf("unnamed receiver evidence = %#v", method)
		}
	}

	outer := declarations["Outer"].Type
	if len(outer.Methods) != 0 || len(outer.ValueMethodSet) != 2 || len(outer.PointerMethodSet) != 3 {
		t.Fatalf("promoted method sets = %#v", outer)
	}
	pointerModes := map[string]string{}
	for _, selection := range append(append([]SemanticMethodSelectionReport{}, outer.ValueMethodSet...), outer.PointerMethodSet...) {
		if !selection.Promoted || len(selection.Index) < 2 || selection.Signature == nil {
			t.Fatalf("promoted selection path/signature = %#v", selection)
		}
		pointerModes[selection.Method.Name] = selection.Method.Signature.ReceiverMode
	}
	if pointerModes["Value"] != "value" || pointerModes["BlankReceiver"] != "value" || pointerModes["Pointer"] != "pointer" {
		t.Fatalf("pointer method set receiver modes = %#v", outer.PointerMethodSet)
	}

	generic := declarations["Generic"].Type.Methods[0].Signature
	constraintSource := generic.ReceiverTypeParameters[0].ConstraintSource
	if constraintSource == nil || constraintSource.OwnerID != packagePath+"::type::Generic" || constraintSource.Name != "T" || generic.ReceiverTypeParameters[0].Reference.Name != "Item" {
		t.Fatalf("generic receiver constraint source = %#v", generic.ReceiverTypeParameters)
	}
	genericSelection := declarations["GenericOuter"].Type.ValueMethodSet[0]
	if !genericSelection.Promoted || genericSelection.Method.Signature.Parameters.Variables[0].Type.Kind != "typeParameter" ||
		genericSelection.Signature.Parameters.Variables[0].Type.Basic.Name != "int" || genericSelection.Signature.Results.Variables[0].Type.Basic.Name != "int" {
		t.Fatalf("instantiated promoted method selection = %#v", genericSelection)
	}
}

func TestUnsafeBuiltinsRemainExplicitIntrinsicDeclarations(t *testing.T) {
	declarations := map[string]SemanticDeclarationReport{}
	for _, object := range externalPackageExports(types.Unsafe) {
		declarations[object.Name()] = semanticExternalDeclaration(newExternalSemanticTypeEncoder(), object, externalRolePackageExport)
	}
	alignof := declarations["Alignof"]
	if alignof.Kind != "builtin" || alignof.Object == nil || alignof.Object.ID != "unsafe::builtin::Alignof" || alignof.Object.Type != nil {
		t.Fatalf("unsafe.Alignof intrinsic declaration = %#v", alignof)
	}
	pointer := declarations["Pointer"]
	if pointer.Kind != "type" || pointer.Type == nil || pointer.Object.ID != "unsafe::type::Pointer" {
		t.Fatalf("unsafe.Pointer declaration = %#v", pointer)
	}
}

func checkExternalFixturePackage(t *testing.T, packagePath string, source string) *types.Package {
	t.Helper()
	fileSet := token.NewFileSet()
	file, err := parser.ParseFile(fileSet, "dependency.go", source, parser.AllErrors)
	if err != nil {
		t.Fatalf("parse external fixture: %v", err)
	}
	checked, err := (&types.Config{Importer: importer.Default(), GoVersion: "go1.26", IgnoreFuncBodies: true}).Check(packagePath, fileSet, []*ast.File{file}, nil)
	if err != nil {
		t.Fatalf("check external fixture: %v", err)
	}
	return checked
}

func requireExternalTypeDeclaration(t *testing.T, snapshot Snapshot, objectID string) SemanticDeclarationReport {
	t.Helper()
	declaration := requireExternalDeclaration(t, snapshot, objectID)
	if declaration.Kind != "type" || declaration.Type == nil {
		t.Fatalf("external declaration %s is not a type: %#v", objectID, declaration)
	}
	return declaration
}

func requireExternalDeclaration(t *testing.T, snapshot Snapshot, objectID string) SemanticDeclarationReport {
	t.Helper()
	for _, declaration := range snapshot.Semantic.ExternalDeclarations {
		if declaration.Object != nil && declaration.Object.ID == objectID {
			return declaration
		}
	}
	t.Fatalf("external declaration %s is missing", objectID)
	return SemanticDeclarationReport{}
}
