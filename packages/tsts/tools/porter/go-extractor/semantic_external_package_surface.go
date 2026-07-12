package main

import (
	"go/types"
	"sort"
)

type semanticExternalPackageResolver func(packagePath string) (*types.Package, bool)

type semanticExternalPackageSurfaceProfile struct {
	declarations               map[string]SemanticDeclarationReport
	unresolvedSelections       []string
	dependencyTypeDeclarations map[string]SemanticDeclarationReport
}

func semanticExternalPackageSurfaceForProfile(
	selections []semanticExternalPackageSelection,
	resolve semanticExternalPackageResolver,
	activeTypeIDs map[string]bool,
	ordinaryDependencyTypes map[string]SemanticDeclarationReport,
) semanticExternalPackageSurfaceProfile {
	declarations := map[string]SemanticDeclarationReport{}
	unresolved := []string{}
	referencedTypes := semanticTypeObjectSet{}
	for index, selection := range selections {
		if index > 0 && selections[index-1].ObjectID >= selection.ObjectID {
			fatalf("external Go package surface selections are not strictly sorted at %s", selection.ObjectID)
		}
		pkg, available := resolve(selection.PackagePath)
		if !available {
			fatalf("selected external Go package %s is unavailable after exact export-data loading", selection.PackagePath)
		}
		if pkg == nil || pkg.Path() != selection.PackagePath {
			fatalf("external Go package surface selection %s resolved to package %v", selection.ObjectID, pkg)
		}
		object := pkg.Scope().Lookup(selection.Name)
		if object == nil {
			unresolved = append(unresolved, selection.ObjectID)
			continue
		}
		actualKind := semanticExternalPackageObjectKind(object)
		if actualKind != selection.Kind {
			fatalf("external Go package surface selection %s has kind %s, but package scope resolves %s::%s::%s", selection.ObjectID, selection.Kind, selection.PackagePath, actualKind, selection.Name)
		}
		if actual := semanticObjectID(object); actual != selection.ObjectID {
			fatalf("external Go package surface selection %s resolved to object %s", selection.ObjectID, actual)
		}
		report, references := semanticExternalPackageSurfaceDeclaration(selection, object)
		declarations[selection.ObjectID] = report
		for _, objects := range references {
			for _, referenced := range objects {
				addSemanticTypeObject(referencedTypes, referenced)
			}
		}
	}
	excludedTypeIDs := map[string]bool{}
	for objectID := range activeTypeIDs {
		excludedTypeIDs[objectID] = true
	}
	for objectID, declaration := range ordinaryDependencyTypes {
		if declaration.Kind != "type" || declaration.Object == nil || declaration.Object.ID != objectID {
			fatalf("ordinary dependency Go type %s has inconsistent declaration evidence", objectID)
		}
		excludedTypeIDs[objectID] = true
	}
	for _, selection := range selections {
		if selection.Kind == "type" {
			excludedTypeIDs[selection.ObjectID] = true
		}
	}
	dependencies := semanticDependencyTypeClosure(referencedTypes, excludedTypeIDs)
	for objectID := range dependencies {
		if excludedTypeIDs[objectID] {
			fatalf("external Go package surface dependency closure retained excluded type %s", objectID)
		}
	}
	return semanticExternalPackageSurfaceProfile{
		declarations: declarations, unresolvedSelections: unresolved, dependencyTypeDeclarations: dependencies,
	}
}

func (checker *declarationPackageChecker) resolveExternalPackageSurface(packagePath string) (*types.Package, bool) {
	if !checker.externalPackageSurfaceAvailable[packagePath] {
		return nil, false
	}
	pkg, err := checker.importExternalPackage(packagePath, "", 0)
	if err != nil {
		fatalf("import selected external Go package %s from exact export data: %v", packagePath, err)
	}
	if pkg == nil || pkg.Path() != packagePath {
		fatalf("selected external Go package %s imported as %v", packagePath, pkg)
	}
	return pkg, true
}

func semanticExternalPackageObjectKind(object types.Object) string {
	switch typed := object.(type) {
	case *types.Const:
		return "const"
	case *types.Func:
		signature, ok := typed.Type().(*types.Signature)
		if !ok || signature.Recv() != nil {
			fatalf("external Go package scope object %s is not a package function", semanticObjectID(typed))
		}
		return "func"
	case *types.TypeName:
		return "type"
	case *types.Var:
		return "var"
	default:
		fatalf("external Go package scope contains unsupported object %T", object)
		return ""
	}
}

func semanticExternalPackageSurfaceDeclaration(selection semanticExternalPackageSelection, object types.Object) (SemanticDeclarationReport, semanticTypeObjectSet) {
	encoder := newDeclarationSurfaceSemanticTypeEncoder()
	report := SemanticDeclarationReport{Kind: selection.Kind, PackagePath: selection.PackagePath, Profiles: []int{}}
	switch typed := object.(type) {
	case *types.Const:
		report.ValueSpecs = semanticExternalPackageSurfaceConstantSpecs(encoder, typed)
	case *types.Func:
		report.Signature = semanticExternalPackageSurfaceFunctionSignature(encoder, typed)
		objectReport := semanticObjectReport(encoder, typed)
		report.Object = &objectReport
	case *types.TypeName:
		report = semanticDependencyTypeDeclaration(encoder, typed)
	case *types.Var:
		report.ValueSpecs = semanticExternalPackageSurfaceVariableSpecs(encoder, typed)
	default:
		fatalf("external Go package surface selection %s resolved to unsupported object %T", selection.ObjectID, object)
	}
	reportObject := semanticExternalPackageSurfaceReportObject(report)
	if reportObject == nil || reportObject.ID != selection.ObjectID || report.PackagePath != selection.PackagePath || report.Kind != selection.Kind {
		fatalf("external Go package surface selection %s lost its exact declaration identity", selection.ObjectID)
	}
	references := semanticTypeObjectSet{}
	for _, referenced := range encoder.referencedTypes {
		addSemanticTypeObject(references, referenced)
	}
	return report, references
}

func semanticExternalPackageSurfaceReportObject(report SemanticDeclarationReport) *SemanticObjectReport {
	if report.Kind == "func" || report.Kind == "type" {
		return report.Object
	}
	if len(report.ValueSpecs) != 1 || len(report.ValueSpecs[0].Names) != 1 || report.ValueSpecs[0].Names[0].Object == nil {
		fatalf("external Go package value surface did not produce one exact object binding")
	}
	return report.ValueSpecs[0].Names[0].Object
}

func semanticExternalPackageSurfaceFunctionSignature(encoder *semanticTypeEncoder, object *types.Func) *SemanticSignatureReport {
	if object == nil {
		fatalf("cannot encode a nil external Go package function")
	}
	encoder.registerObject(object)
	signature, ok := object.Type().(*types.Signature)
	if !ok {
		fatalf("external Go function %s has non-signature type %T", semanticObjectID(object), object.Type())
	}
	if signature.Recv() != nil {
		fatalf("external Go package function %s unexpectedly has a receiver", semanticObjectID(object))
	}
	return encoder.signatureReportAt(signature, semanticObjectID(object)+"::signature", false)
}

func semanticExternalPackageSurfaceConstantSpecs(encoder *semanticTypeEncoder, object *types.Const) []SemanticValueSpecReport {
	if object == nil {
		fatalf("cannot encode a nil external Go package constant")
	}
	return semanticExternalPackageSurfaceValueSpecs(semanticObjectReport(encoder, object), semanticConstantReport(object.Val()))
}

func semanticExternalPackageSurfaceVariableSpecs(encoder *semanticTypeEncoder, object *types.Var) []SemanticValueSpecReport {
	if object == nil {
		fatalf("cannot encode a nil external Go package variable")
	}
	return semanticExternalPackageSurfaceValueSpecs(semanticObjectReport(encoder, object), nil)
}

func semanticExternalPackageSurfaceValueSpecs(object SemanticObjectReport, value *SemanticConstantReport) []SemanticValueSpecReport {
	return []SemanticValueSpecReport{{SpecIndex: 0, Names: []SemanticValueBindingReport{{
		Name: object.Name, NameIndex: 0, Type: object.Type, Object: &object, Constant: value,
	}}}}
}

func semanticExternalPackagePaths(selections []semanticExternalPackageSelection) []string {
	paths := map[string]bool{}
	for _, selection := range selections {
		paths[selection.PackagePath] = true
	}
	output := make([]string, 0, len(paths))
	for packagePath := range paths {
		output = append(output, packagePath)
	}
	sort.Strings(output)
	return output
}
