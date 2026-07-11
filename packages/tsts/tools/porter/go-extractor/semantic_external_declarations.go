package main

import (
	"go/types"
	"sort"
	"strings"
)

func semanticExternalTypeDeclarations(modulePath string, checker *declarationPackageChecker, local map[string]SemanticDeclarationReport) map[string]SemanticDeclarationReport {
	pending := map[string]*types.TypeName{}
	for _, declaration := range local {
		collectExternalTypeReferences(declaration, modulePath, func(reference SemanticTypeReferenceReport) {
			object := resolveExternalTypeReference(checker, reference)
			setExternalTypeObject(pending, reference.ObjectID, object)
		})
	}
	reports := map[string]SemanticDeclarationReport{}
	for {
		objectID := nextExternalTypeObjectID(pending, reports)
		if objectID == "" {
			break
		}
		object := pending[objectID]
		encoder := newExternalSemanticTypeEncoder()
		report := semanticExternalTypeDeclaration(encoder, object)
		if report.Object == nil || report.Object.ID != objectID {
			fatalf("external Go type declaration %s lost its exact object identity", objectID)
		}
		reports[objectID] = report
		for referencedID, referenced := range encoder.referencedTypes {
			if externalPackagePath(referenced.Pkg(), modulePath) {
				setExternalTypeObject(pending, referencedID, referenced)
			}
		}
	}
	return reports
}

func semanticExternalTypeDeclaration(encoder *semanticTypeEncoder, object *types.TypeName) SemanticDeclarationReport {
	encoder.registerObject(object)
	methods := externalDeclaredMethods(object)
	for _, method := range methods {
		encoder.registerObject(method)
	}
	objectReport := semanticObjectReport(encoder, object)
	rhs := externalDeclaredTypeRHS(object)
	declaration := &SemanticTypeDeclaration{
		Alias:          object.IsAlias(),
		Object:         objectReport,
		TypeParameters: semanticDeclaredTypeParameters(encoder, object),
		RHS:            encoder.typeReportAt(rhs, objectReport.ID+"::rhs"),
		Methods:        semanticExternalMethodReports(encoder, objectReport.ID, methods),
	}
	return SemanticDeclarationReport{
		Kind: "type", PackagePath: objectReport.PackagePath, Object: &objectReport, Type: declaration, Profiles: []int{},
	}
}

func externalDeclaredTypeRHS(object *types.TypeName) types.Type {
	switch declared := object.Type().(type) {
	case *types.Named:
		if object.IsAlias() {
			fatalf("external Go alias %s was materialized as *types.Named", semanticObjectID(object))
		}
		return declared.Underlying()
	case *types.Alias:
		if !object.IsAlias() {
			fatalf("external defined Go type %s was materialized as *types.Alias", semanticObjectID(object))
		}
		return declared.Rhs()
	default:
		fatalf("external Go type %s has unsupported declaration type %T", semanticObjectID(object), object.Type())
		return nil
	}
}

func externalDeclaredMethods(object *types.TypeName) []*types.Func {
	named, ok := object.Type().(*types.Named)
	if !ok {
		return nil
	}
	methods := make([]*types.Func, named.NumMethods())
	for index := range methods {
		methods[index] = named.Method(index)
	}
	sort.Slice(methods, func(left, right int) bool {
		return semanticObjectID(methods[left]) < semanticObjectID(methods[right])
	})
	return methods
}

func semanticExternalMethodReports(encoder *semanticTypeEncoder, ownerID string, methods []*types.Func) []SemanticMethodReport {
	reports := make([]SemanticMethodReport, 0, len(methods))
	for _, method := range methods {
		signature, ok := method.Type().(*types.Signature)
		if !ok {
			fatalf("external Go method %s has non-signature type %T", semanticObjectID(method), method.Type())
		}
		methodID := semanticObjectID(method)
		reports = append(reports, SemanticMethodReport{
			ID: methodID, OwnerID: ownerID, Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
			Exported: method.Exported(), Signature: encoder.signatureReportAt(signature, methodID+"::signature", true),
		})
	}
	return reports
}

func collectExternalTypeReferences(declaration SemanticDeclarationReport, modulePath string, visit func(SemanticTypeReferenceReport)) {
	if declaration.Object != nil {
		visitSemanticTypeReferences(declaration.Object.Type, modulePath, visit)
	}
	if declaration.Type != nil {
		visitSemanticTypeReferences(declaration.Type.RHS, modulePath, visit)
		for _, parameter := range declaration.Type.TypeParameters {
			visitSemanticTypeReferences(parameter.Constraint, modulePath, visit)
		}
		for _, method := range declaration.Type.Methods {
			visitSemanticSignatureReferences(method.Signature, modulePath, visit)
		}
	}
	if declaration.Signature != nil {
		visitSemanticSignatureReferences(declaration.Signature, modulePath, visit)
	}
	for _, specification := range declaration.ValueSpecs {
		for _, binding := range specification.Names {
			visitSemanticTypeReferences(binding.Type, modulePath, visit)
		}
	}
}

func visitSemanticSignatureReferences(signature *SemanticSignatureReport, modulePath string, visit func(SemanticTypeReferenceReport)) {
	if signature == nil {
		return
	}
	if signature.Receiver != nil {
		visitSemanticTypeReferences(signature.Receiver.Type, modulePath, visit)
	}
	for _, parameter := range append(append([]SemanticTypeParameterReport{}, signature.ReceiverTypeParameters...), signature.TypeParameters...) {
		visitSemanticTypeReferences(parameter.Constraint, modulePath, visit)
	}
	for _, variable := range append(append([]SemanticVariableReport{}, signature.Parameters.Variables...), signature.Results.Variables...) {
		visitSemanticTypeReferences(variable.Type, modulePath, visit)
	}
}

func visitSemanticTypeReferences(value *SemanticTypeReport, modulePath string, visit func(SemanticTypeReferenceReport)) {
	if value == nil {
		return
	}
	if (value.Kind == "named" || value.Kind == "alias") && value.Reference != nil {
		if externalPackagePathText(value.Reference.PackagePath, modulePath) {
			visit(*value.Reference)
		}
		for _, argument := range value.Reference.TypeArgs {
			visitSemanticTypeReferences(argument, modulePath, visit)
		}
		return
	}
	visitSemanticTypeReferences(value.Element, modulePath, visit)
	visitSemanticTypeReferences(value.Key, modulePath, visit)
	if value.Signature != nil {
		visitSemanticSignatureReferences(value.Signature, modulePath, visit)
	}
	if value.Tuple != nil {
		for _, variable := range value.Tuple.Variables {
			visitSemanticTypeReferences(variable.Type, modulePath, visit)
		}
	}
	if value.Struct != nil {
		for _, field := range value.Struct.Fields {
			visitSemanticTypeReferences(field.Variable.Type, modulePath, visit)
		}
	}
	if value.Interface != nil {
		for _, method := range append(append([]SemanticMethodReport{}, value.Interface.ExplicitMethods...), value.Interface.CompleteMethods...) {
			visitSemanticSignatureReferences(method.Signature, modulePath, visit)
		}
		for _, embedded := range value.Interface.EmbeddedTypes {
			visitSemanticTypeReferences(embedded, modulePath, visit)
		}
	}
	if value.Union != nil {
		for _, term := range value.Union.Terms {
			visitSemanticTypeReferences(term.Type, modulePath, visit)
		}
	}
}

func resolveExternalTypeReference(checker *declarationPackageChecker, reference SemanticTypeReferenceReport) *types.TypeName {
	loaded, err := checker.importExternalPackage(reference.PackagePath, "", 0)
	if err != nil {
		fatalf("load exact external Go type %s: %v", reference.ObjectID, err)
	}
	object := loaded.Scope().Lookup(reference.Name)
	typeName, ok := object.(*types.TypeName)
	if !ok || typeName == nil {
		fatalf("external Go type reference %s does not resolve to a package type object", reference.ObjectID)
	}
	if semanticObjectID(typeName) != reference.ObjectID {
		fatalf("external Go type reference %s resolves to different object %s", reference.ObjectID, semanticObjectID(typeName))
	}
	return typeName
}

func mergedExternalSemanticDeclarations(merged map[string]semanticUnitEvidence) []SemanticDeclarationReport {
	objectIDs := make([]string, 0, len(merged))
	for objectID := range merged {
		objectIDs = append(objectIDs, objectID)
	}
	sort.Strings(objectIDs)
	reports := []SemanticDeclarationReport{}
	for _, objectID := range objectIDs {
		variants := merged[objectID].variants
		canonicalValues := make([]string, 0, len(variants))
		for canonical := range variants {
			canonicalValues = append(canonicalValues, canonical)
		}
		sort.Strings(canonicalValues)
		for _, canonical := range canonicalValues {
			variant := variants[canonical]
			variant.report.Profiles = sortedIntKeys(variant.profiles)
			reports = append(reports, variant.report)
		}
	}
	return reports
}

func nextExternalTypeObjectID(pending map[string]*types.TypeName, reports map[string]SemanticDeclarationReport) string {
	identities := []string{}
	for objectID := range pending {
		if _, done := reports[objectID]; !done {
			identities = append(identities, objectID)
		}
	}
	if len(identities) == 0 {
		return ""
	}
	sort.Strings(identities)
	return identities[0]
}

func setExternalTypeObject(objects map[string]*types.TypeName, objectID string, object *types.TypeName) {
	if object == nil || semanticObjectID(object) != objectID {
		fatalf("external Go type object %s has inconsistent go/types identity", objectID)
	}
	if previous := objects[objectID]; previous != nil && previous != object {
		fatalf("external Go type object %s resolves to multiple go/types objects in one profile", objectID)
	}
	objects[objectID] = object
}

func externalPackagePath(pkg *types.Package, modulePath string) bool {
	return pkg != nil && externalPackagePathText(pkg.Path(), modulePath)
}

func externalPackagePathText(packagePath string, modulePath string) bool {
	return packagePath != "" && packagePath != modulePath && !strings.HasPrefix(packagePath, modulePath+"/")
}
