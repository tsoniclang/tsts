package main

import (
	"go/types"
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
