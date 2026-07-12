package main

import (
	"go/types"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

func TestExternalPackageSurfaceEncodersRemainExplicitAndSeparate(t *testing.T) {
	packagePath := "example.test/catalog"
	dependency := checkSemanticFixturePackage(t, packagePath, `package catalog

type Value int
const Default Value = 1
var Current Value
func Convert(input Value) (output Value) { return input }
`)
	function, ok := dependency.Scope().Lookup("Convert").(*types.Func)
	if !ok || function == nil {
		t.Fatal("fixture Convert function is missing")
	}
	signature := semanticExternalPackageSurfaceFunctionSignature(newDeclarationSurfaceSemanticTypeEncoder(), function)
	if signature.Parameters.Variables[0].Type.Reference.ObjectID != packagePath+"::type::Value" ||
		signature.Results.Variables[0].Type.Reference.ObjectID != packagePath+"::type::Value" {
		t.Fatalf("explicit package-surface function signature = %#v", signature)
	}
	constant, ok := dependency.Scope().Lookup("Default").(*types.Const)
	if !ok || constant == nil {
		t.Fatal("fixture Default constant is missing")
	}
	constantSpecs := semanticExternalPackageSurfaceConstantSpecs(newDeclarationSurfaceSemanticTypeEncoder(), constant)
	if constantSpecs[0].Names[0].Constant == nil || constantSpecs[0].Names[0].Constant.Exact != "1" ||
		constantSpecs[0].Names[0].Type.Reference.ObjectID != packagePath+"::type::Value" {
		t.Fatalf("explicit package-surface constant evidence = %#v", constantSpecs)
	}
	variable, ok := dependency.Scope().Lookup("Current").(*types.Var)
	if !ok || variable == nil {
		t.Fatal("fixture Current variable is missing")
	}
	variableSpecs := semanticExternalPackageSurfaceVariableSpecs(newDeclarationSurfaceSemanticTypeEncoder(), variable)
	if variableSpecs[0].Names[0].Constant != nil || variableSpecs[0].Names[0].Type.Reference.ObjectID != packagePath+"::type::Value" {
		t.Fatalf("explicit package-surface variable evidence = %#v", variableSpecs)
	}
}

func TestExternalPackageSurfaceUsesOnlyExactSelectionsAndSeparateTypeClosure(t *testing.T) {
	packagePath := "example.test/catalog"
	dependency := checkSemanticFixturePackage(t, packagePath, `package catalog

type Ordinary struct{}
type Active struct{}
type Selected struct{}
type Closure struct{}
const Default = 1
var Current Closure
type Root struct {
	Ordinary Ordinary
	Active Active
	Selected Selected
	Closure Closure
}
func (Root) Echo(value Closure) Closure { return value }
func Use(value Root) Closure { return value.Closure }
`)
	selections := externalPackageSurfaceFixtureSelections(t, []string{
		packagePath + "::const::Default",
		packagePath + "::func::Missing",
		packagePath + "::func::Use",
		packagePath + "::type::Root",
		packagePath + "::type::Selected",
		packagePath + "::var::Current",
	})
	ordinaryObject, ok := dependency.Scope().Lookup("Ordinary").(*types.TypeName)
	if !ok || ordinaryObject == nil {
		t.Fatal("fixture Ordinary type is missing")
	}
	ordinary := semanticDependencyTypeDeclaration(newDeclarationSurfaceSemanticTypeEncoder(), ordinaryObject)
	profile := semanticExternalPackageSurfaceForProfile(
		selections,
		func(packageName string) (*types.Package, bool) { return dependency, packageName == packagePath },
		map[string]bool{packagePath + "::type::Active": true},
		map[string]SemanticDeclarationReport{semanticObjectID(ordinaryObject): ordinary},
	)
	if len(profile.declarations) != 5 || profile.declarations[packagePath+"::func::Use"].Signature == nil || profile.declarations[packagePath+"::type::Root"].Type == nil {
		t.Fatalf("selected external declarations = %#v", profile.declarations)
	}
	constant := profile.declarations[packagePath+"::const::Default"]
	variable := profile.declarations[packagePath+"::var::Current"]
	if constant.Object != nil || variable.Object != nil || constant.ValueSpecs[0].Names[0].Object.ID != packagePath+"::const::Default" || variable.ValueSpecs[0].Names[0].Object.ID != packagePath+"::var::Current" {
		t.Fatalf("selected external value declaration shapes = const:%#v var:%#v", constant, variable)
	}
	if len(profile.unresolvedSelections) != 1 || profile.unresolvedSelections[0] != packagePath+"::func::Missing" {
		t.Fatalf("unresolved external selections = %v", profile.unresolvedSelections)
	}
	if len(profile.dependencyTypeDeclarations) != 1 || profile.dependencyTypeDeclarations[packagePath+"::type::Closure"].Type == nil {
		t.Fatalf("external surface dependency closure = %#v", profile.dependencyTypeDeclarations)
	}
	for _, excluded := range []string{
		packagePath + "::type::Active",
		packagePath + "::type::Ordinary",
		packagePath + "::type::Root",
		packagePath + "::type::Selected",
	} {
		if profile.dependencyTypeDeclarations[excluded].Type != nil {
			t.Fatalf("excluded type %s entered external surface dependency closure", excluded)
		}
	}
	signatures := map[string]SemanticMethodSetSignatureReport{}
	collectSemanticMethodSetSignatures(profile.declarations, signatures)
	collectSemanticMethodSetSignatures(profile.dependencyTypeDeclarations, signatures)
	if len(signatures) != 1 {
		t.Fatalf("selected external method-set signatures = %#v", signatures)
	}
}

func TestExternalPackageSurfaceMergeTagsEverySelectionProfileExactlyOnce(t *testing.T) {
	packagePath := "example.test/catalog"
	dependency := checkSemanticFixturePackage(t, packagePath, `package catalog

type Dependency struct{}
func Missing(value Dependency) Dependency { return value }
func Use(value Dependency) Dependency { return value }
`)
	missingDependency := checkSemanticFixturePackage(t, packagePath, `package catalog

type Dependency struct{}
`)
	selections := externalPackageSurfaceFixtureSelections(t, []string{
		packagePath + "::func::Missing",
		packagePath + "::func::Use",
	})
	profileZero := semanticExternalPackageSurfaceForProfile(
		selections,
		func(string) (*types.Package, bool) { return dependency, true },
		map[string]bool{},
		map[string]SemanticDeclarationReport{},
	)
	profileOne := semanticExternalPackageSurfaceForProfile(
		selections,
		func(string) (*types.Package, bool) { return missingDependency, true },
		map[string]bool{},
		map[string]SemanticDeclarationReport{},
	)
	declarations := map[string]semanticUnitEvidence{}
	dependencies := map[string]semanticUnitEvidence{}
	unresolved := map[string]map[int]bool{}
	for profileIndex, profile := range []semanticExternalPackageSurfaceProfile{profileZero, profileOne} {
		for objectID, declaration := range profile.declarations {
			mergeSemanticDeclarationEvidence(declarations, objectID, declaration, profileIndex)
		}
		for objectID, declaration := range profile.dependencyTypeDeclarations {
			mergeSemanticDeclarationEvidence(dependencies, objectID, declaration, profileIndex)
		}
		for _, objectID := range profile.unresolvedSelections {
			if unresolved[objectID] == nil {
				unresolved[objectID] = map[int]bool{}
			}
			unresolved[objectID][profileIndex] = true
		}
	}
	report := mergedSemanticExternalPackageSurface(
		selections, 2, declarations, unresolved, dependencies,
		map[string]semanticUnitEvidence{}, map[string]semanticUnitEvidence{},
	)
	if len(report.Selections) != 2 || report.Selections[0] != packagePath+"::func::Missing" || report.Selections[1] != packagePath+"::func::Use" {
		t.Fatalf("merged external selections = %v", report.Selections)
	}
	if len(report.Declarations) != 2 || report.Declarations[0].Object.ID != packagePath+"::func::Missing" ||
		report.Declarations[1].Object.ID != packagePath+"::func::Use" || len(report.Declarations[0].Profiles) != 1 ||
		report.Declarations[0].Profiles[0] != 0 || len(report.Declarations[1].Profiles) != 1 || report.Declarations[1].Profiles[0] != 0 {
		t.Fatalf("merged external declarations = %#v", report.Declarations)
	}
	if len(report.UnresolvedSelections) != 2 || report.UnresolvedSelections[0].ObjectID != packagePath+"::func::Missing" ||
		len(report.UnresolvedSelections[0].Profiles) != 1 || report.UnresolvedSelections[0].Profiles[0] != 1 ||
		report.UnresolvedSelections[1].ObjectID != packagePath+"::func::Use" || len(report.UnresolvedSelections[1].Profiles) != 1 ||
		report.UnresolvedSelections[1].Profiles[0] != 1 {
		t.Fatalf("merged unresolved external selections = %#v", report.UnresolvedSelections)
	}
	if len(report.DependencyTypeDeclarations) != 1 || report.DependencyTypeDeclarations[0].Object.ID != packagePath+"::type::Dependency" || len(report.DependencyTypeDeclarations[0].Profiles) != 1 || report.DependencyTypeDeclarations[0].Profiles[0] != 0 {
		t.Fatalf("merged external dependency closure = %#v", report.DependencyTypeDeclarations)
	}
}

func TestExternalPackageSurfaceRejectsWrongObjectKind(t *testing.T) {
	if os.Getenv("TSTS_PORTER_TEST_EXTERNAL_WRONG_KIND") == "reject" {
		packagePath := "example.test/catalog"
		dependency := checkSemanticFixturePackage(t, packagePath, "package catalog\n\nfunc Use() {}\n")
		semanticExternalPackageSurfaceForProfile(
			externalPackageSurfaceFixtureSelections(t, []string{packagePath + "::var::Use"}),
			func(string) (*types.Package, bool) { return dependency, true },
			map[string]bool{},
			map[string]SemanticDeclarationReport{},
		)
		os.Exit(0)
	}
	command := exec.Command(os.Args[0], "-test.run=^TestExternalPackageSurfaceRejectsWrongObjectKind$")
	command.Env = append(os.Environ(), "TSTS_PORTER_TEST_EXTERNAL_WRONG_KIND=reject")
	output, err := command.CombinedOutput()
	if err == nil {
		t.Fatalf("wrong-kind external package surface selection did not fail hard:\n%s", output)
	}
	exitError, ok := err.(*exec.ExitError)
	if !ok || exitError.ExitCode() != 1 {
		t.Fatalf("wrong-kind selection terminated unexpectedly: error=%v output=%s", err, output)
	}
	message := string(output)
	for _, expected := range []string{"example.test/catalog::var::Use", "has kind var", "example.test/catalog::func::Use"} {
		if !strings.Contains(message, expected) {
			t.Fatalf("wrong-kind rejection %q does not contain %q", message, expected)
		}
	}
}

func TestExternalPackageSurfaceRunsThroughExactExportDataAndSchemaAssembly(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/external-surface"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "surface.go"), "package surface\n\nimport \"errors\"\n\nvar _ = errors.New\n")
	selections := externalPackageSurfaceFixtureSelections(t, []string{"errors::func::New"})
	snapshot := declarationSnapshotWithSelections(t, root, modulePath, selections)
	if snapshot.SchemaVersion != porterSnapshotSchemaVersion || snapshot.Semantic.ExternalPackageSurface.Selections[0] != "errors::func::New" {
		t.Fatalf("schema-10 external package surface = %#v", snapshot.Semantic.ExternalPackageSurface)
	}
	surface := snapshot.Semantic.ExternalPackageSurface
	if len(surface.UnresolvedSelections) != 0 || len(surface.Declarations) != 1 {
		t.Fatalf("external package surface outcomes = %#v", surface)
	}
	declaration := surface.Declarations[0]
	if declaration.Kind != "func" || declaration.Object == nil || declaration.Object.ID != "errors::func::New" || declaration.Signature == nil || len(declaration.Profiles) == 0 {
		t.Fatalf("export-data declaration evidence = %#v", declaration)
	}
	parameters := declaration.Signature.Parameters.Variables
	results := declaration.Signature.Results.Variables
	if len(parameters) != 1 || parameters[0].Type == nil || parameters[0].Type.Basic == nil || parameters[0].Type.Basic.Name != "string" ||
		len(results) != 1 || results[0].Type == nil || results[0].Type.Reference == nil || results[0].Type.Reference.ObjectID != "builtin::type::error" {
		t.Fatalf("errors.New exact signature = %#v", declaration.Signature)
	}
}

func externalPackageSurfaceFixtureSelections(t *testing.T, objectIDs []string) []semanticExternalPackageSelection {
	t.Helper()
	selections, err := exactExternalPackageSurfaceSelections(objectIDs, "example.test/local")
	if err != nil {
		t.Fatalf("build external package surface fixture selections: %v", err)
	}
	return selections
}
