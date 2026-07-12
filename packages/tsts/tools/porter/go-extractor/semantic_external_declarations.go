package main

import (
	"go/types"
	"sort"
	"strings"
)

const (
	externalRolePackageExport  = "package-export"
	externalRoleDependencyType = "dependency-type"
)

type externalSemanticObject struct {
	object types.Object
	role   string
}

func semanticExternalDeclarations(root string, modulePath string, checker *declarationPackageChecker, checkedPackages []*declarationCheckedPackage, local map[string]SemanticDeclarationReport, requiredFiles map[string]bool) map[string]SemanticDeclarationReport {
	pending := map[string]externalSemanticObject{}
	selectedPackages := map[string]*types.Package{}
	for _, declaration := range local {
		collectExternalTypeReferences(declaration, modulePath, func(reference SemanticTypeReferenceReport) {
			object := resolveExternalTypeReference(checker, reference)
			setExternalSemanticObject(pending, object, externalRoleDependencyType)
			selectedPackages[object.Pkg().Path()] = object.Pkg()
		})
	}
	for _, checked := range checkedPackages {
		for _, file := range semanticPackageFiles(root, checked, requiredFiles) {
			for _, imported := range file.syntax.Imports {
				packageName := declarationImportObject(checked.info, imported)
				if externalPackagePath(packageName.Imported(), modulePath) {
					selectedPackages[packageName.Imported().Path()] = packageName.Imported()
				}
			}
		}
	}
	for _, packagePath := range sortedPackagePaths(selectedPackages) {
		for _, object := range externalPackageExports(selectedPackages[packagePath]) {
			setExternalSemanticObject(pending, object, externalRolePackageExport)
		}
	}
	reports := map[string]SemanticDeclarationReport{}
	for {
		objectID := nextExternalObjectID(pending, reports)
		if objectID == "" {
			break
		}
		evidence := pending[objectID]
		encoder := newExternalSemanticTypeEncoder()
		report := semanticExternalDeclaration(encoder, evidence.object, evidence.role)
		if report.Object == nil || report.Object.ID != objectID {
			fatalf("external Go declaration %s lost its exact object identity", objectID)
		}
		reports[objectID] = report
		for _, referenced := range encoder.referencedTypes {
			if externalPackagePath(referenced.Pkg(), modulePath) {
				setExternalSemanticObject(pending, referenced, externalRoleDependencyType)
			}
		}
	}
	return reports
}

func semanticExternalTypeDeclaration(encoder *semanticTypeEncoder, object *types.TypeName) SemanticDeclarationReport {
	return semanticExternalDeclaration(encoder, object, externalRolePackageExport)
}

func semanticExternalDeclaration(encoder *semanticTypeEncoder, object types.Object, role string) SemanticDeclarationReport {
	validateExternalSemanticObjectRole(object, role)
	if builtin, ok := object.(*types.Builtin); ok {
		objectReport := SemanticObjectReport{
			ID: semanticObjectID(builtin), Name: builtin.Name(), PackagePath: semanticPackagePath(builtin.Pkg()), Exported: builtin.Exported(),
		}
		return SemanticDeclarationReport{
			Kind: "builtin", PackagePath: objectReport.PackagePath, ExternalRole: role, Object: &objectReport, Profiles: []int{},
		}
	}
	if typeName, ok := object.(*types.TypeName); ok && typeName.Pkg() == types.Unsafe && typeName.Type() == types.Typ[types.UnsafePointer] {
		objectReport := SemanticObjectReport{
			ID: semanticObjectID(typeName), Name: typeName.Name(), PackagePath: semanticPackagePath(typeName.Pkg()), Exported: typeName.Exported(),
			Type: encoder.typeReportAt(typeName.Type(), semanticObjectID(typeName)+"::type"),
		}
		return SemanticDeclarationReport{
			Kind: "type", PackagePath: objectReport.PackagePath, ExternalRole: role, Object: &objectReport,
			Type: &SemanticTypeDeclaration{Alias: false, Object: objectReport, TypeParameters: []SemanticTypeParameterReport{}, RHS: objectReport.Type}, Profiles: []int{},
		}
	}
	encoder.registerObject(object)
	objectReport := semanticObjectReport(encoder, object)
	report := SemanticDeclarationReport{
		PackagePath: objectReport.PackagePath, ExternalRole: role, Object: &objectReport, Profiles: []int{},
	}
	switch typed := object.(type) {
	case *types.TypeName:
		methods := externalDeclaredMethods(typed)
		valueMethodSet := types.NewMethodSet(typed.Type())
		pointerMethodSet := types.NewMethodSet(types.NewPointer(typed.Type()))
		registerExternalMethods(encoder, methods, valueMethodSet, pointerMethodSet)
		report.Kind = "type"
		report.Type = &SemanticTypeDeclaration{
			Alias: typed.IsAlias(), Object: objectReport, TypeParameters: semanticDeclaredTypeParameters(encoder, typed),
			RHS:              encoder.typeReportAt(externalDeclaredTypeRHS(typed), objectReport.ID+"::rhs"),
			Methods:          semanticExternalMethodReports(encoder, objectReport.ID, methods),
			ValueMethodSet:   semanticExternalMethodSet(encoder, objectReport.ID, "valueMethodSet", valueMethodSet),
			PointerMethodSet: semanticExternalMethodSet(encoder, objectReport.ID, "pointerMethodSet", pointerMethodSet),
		}
	case *types.Func:
		signature, ok := typed.Type().(*types.Signature)
		if !ok {
			fatalf("external Go function %s has non-signature type %T", objectReport.ID, typed.Type())
		}
		report.Kind = "func"
		report.Signature = encoder.signatureReportAt(signature, objectReport.ID+"::signature", false)
	case *types.Const:
		report.Kind = "const"
		report.ValueSpecs = externalValueSpecs(objectReport, semanticConstantReport(typed.Val()))
	case *types.Var:
		report.Kind = "var"
		report.ValueSpecs = externalValueSpecs(objectReport, nil)
	default:
		fatalf("unsupported external Go package object %T", object)
	}
	return report
}

func externalValueSpecs(object SemanticObjectReport, value *SemanticConstantReport) []SemanticValueSpecReport {
	return []SemanticValueSpecReport{{SpecIndex: 0, Names: []SemanticValueBindingReport{{
		Name: object.Name, NameIndex: 0, Type: object.Type, Object: &object, Constant: value,
	}}}}
}

func validateExternalSemanticObjectRole(object types.Object, role string) {
	switch role {
	case externalRolePackageExport:
		if !object.Exported() {
			fatalf("unexported external Go object %s cannot enter the selected package surface", semanticObjectID(object))
		}
	case externalRoleDependencyType:
		if _, ok := object.(*types.TypeName); !ok {
			fatalf("external dependency object %s is not a type", semanticObjectID(object))
		}
	default:
		fatalf("external Go object %s has unsupported role %q", semanticObjectID(object), role)
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
		return types.Id(methods[left].Pkg(), methods[left].Name()) < types.Id(methods[right].Pkg(), methods[right].Name())
	})
	return methods
}

func registerExternalMethods(encoder *semanticTypeEncoder, methods []*types.Func, methodSets ...*types.MethodSet) {
	registered := map[*types.Func]bool{}
	for _, method := range methods {
		registerExternalMethodObject(encoder, registered, method)
	}
	for _, methodSet := range methodSets {
		for index := 0; index < methodSet.Len(); index++ {
			method, ok := methodSet.At(index).Obj().(*types.Func)
			if !ok {
				fatalf("external Go method selection resolved to %T", methodSet.At(index).Obj())
			}
			registerExternalMethodObject(encoder, registered, method)
		}
	}
}

func registerExternalMethodObject(encoder *semanticTypeEncoder, registered map[*types.Func]bool, method *types.Func) {
	if registered[method] {
		return
	}
	registered[method] = true
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("external Go method %s has non-signature type %T", method.Name(), method.Type())
	}
	if signature.Recv() != nil {
		encoder.registerObject(method)
	}
}

func semanticExternalMethodReports(encoder *semanticTypeEncoder, ownerID string, methods []*types.Func) []SemanticMethodReport {
	reports := make([]SemanticMethodReport, 0, len(methods))
	for _, method := range methods {
		reports = append(reports, semanticExternalSelectedMethodReport(encoder, ownerID, method))
	}
	return reports
}

func semanticExternalMethodSet(encoder *semanticTypeEncoder, selectedOwnerID string, role string, methodSet *types.MethodSet) []SemanticMethodSelectionReport {
	reports := make([]SemanticMethodSelectionReport, 0, methodSet.Len())
	for index := 0; index < methodSet.Len(); index++ {
		selection := methodSet.At(index)
		method, ok := selection.Obj().(*types.Func)
		if !ok {
			fatalf("external Go method selection resolved to %T", selection.Obj())
		}
		selectedSignature, ok := selection.Type().(*types.Signature)
		if !ok {
			fatalf("external Go method selection %s has non-signature type %T", types.Id(method.Pkg(), method.Name()), selection.Type())
		}
		methodReport := semanticExternalSelectedMethodReport(encoder, selectedOwnerID, method)
		indexPath := append([]int{}, selection.Index()...)
		selectionPath := selectedOwnerID + "::" + role + "::" + itoa(index) + "::" + types.Id(method.Pkg(), method.Name())
		reports = append(reports, SemanticMethodSelectionReport{
			Key: types.Id(method.Pkg(), method.Name()), Method: methodReport, Index: indexPath,
			Indirect: selection.Indirect(), Promoted: len(indexPath) > 1,
			Signature: encoder.signatureReportAt(selectedSignature, selectionPath+"::signature", false),
		})
	}
	return reports
}

func semanticExternalSelectedMethodReport(encoder *semanticTypeEncoder, selectedOwnerID string, method *types.Func) SemanticMethodReport {
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("external Go selected method %s has non-signature type %T", method.Name(), method.Type())
	}
	if signature.Recv() != nil {
		return semanticExternalMethodReport(encoder, method)
	}
	methodID := selectedOwnerID + "::selectedMethod::" + types.Id(method.Pkg(), method.Name())
	return SemanticMethodReport{
		ID: methodID, OwnerID: selectedOwnerID, Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
		Exported: method.Exported(), Signature: encoder.signatureReportAt(signature, methodID+"::signature", false),
	}
}

func semanticExternalMethodReport(encoder *semanticTypeEncoder, method *types.Func) SemanticMethodReport {
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("external Go method %s has non-signature type %T", semanticObjectID(method), method.Type())
	}
	receiverObject := receiverTypeObject(signature.Recv().Type())
	if receiverObject == nil {
		fatalf("external Go method %s has no named receiver", semanticObjectID(method))
	}
	methodID := semanticObjectID(method)
	return SemanticMethodReport{
		ID: methodID, OwnerID: semanticObjectID(receiverObject), Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
		Exported: method.Exported(), Signature: encoder.signatureReportAt(signature, methodID+"::signature", true),
	}
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
		for _, selection := range append(append([]SemanticMethodSelectionReport{}, declaration.Type.ValueMethodSet...), declaration.Type.PointerMethodSet...) {
			visitSemanticSignatureReferences(selection.Method.Signature, modulePath, visit)
			visitSemanticSignatureReferences(selection.Signature, modulePath, visit)
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

func sortedPackagePaths(packages map[string]*types.Package) []string {
	paths := make([]string, 0, len(packages))
	for path := range packages {
		paths = append(paths, path)
	}
	sort.Strings(paths)
	return paths
}

func externalPackageExports(pkg *types.Package) []types.Object {
	if pkg == nil || pkg.Scope() == nil {
		fatalf("selected external Go package has no package scope")
	}
	objects := []types.Object{}
	for _, name := range pkg.Scope().Names() {
		object := pkg.Scope().Lookup(name)
		if object == nil || !object.Exported() {
			continue
		}
		switch object.(type) {
		case *types.TypeName, *types.Func, *types.Const, *types.Var, *types.Builtin:
			objects = append(objects, object)
		default:
			fatalf("exported external Go package object %s has unsupported kind %T", semanticObjectID(object), object)
		}
	}
	return objects
}

func nextExternalObjectID(pending map[string]externalSemanticObject, reports map[string]SemanticDeclarationReport) string {
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

func setExternalSemanticObject(objects map[string]externalSemanticObject, object types.Object, role string) {
	if object == nil {
		fatalf("cannot add a nil external Go object")
	}
	objectID := semanticObjectID(object)
	validateExternalSemanticObjectRole(object, role)
	if previous, exists := objects[objectID]; exists {
		if previous.object != object {
			fatalf("external Go object %s resolves to multiple go/types objects in one profile", objectID)
		}
		if previous.role == externalRolePackageExport || previous.role == role {
			return
		}
		if role != externalRolePackageExport {
			fatalf("external Go object %s has incompatible roles %q and %q", objectID, previous.role, role)
		}
	}
	objects[objectID] = externalSemanticObject{object: object, role: role}
}

func externalPackagePath(pkg *types.Package, modulePath string) bool {
	return pkg != nil && externalPackagePathText(pkg.Path(), modulePath)
}

func externalPackagePathText(packagePath string, modulePath string) bool {
	return packagePath != "" && packagePath != modulePath && !strings.HasPrefix(packagePath, modulePath+"/")
}
