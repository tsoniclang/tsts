package main

import (
	"encoding/json"
	"go/types"
	"sort"
)

type semanticTypeObjectSet map[string][]*types.TypeName

func semanticDependencyTypeDeclarations(referenced semanticTypeObjectSet, activeTypeIDs map[string]bool) map[string]SemanticDeclarationReport {
	return semanticDependencyTypeClosure(referenced, activeTypeIDs)
}

func semanticDependencyTypeClosure(roots semanticTypeObjectSet, activeTypeIDs map[string]bool) map[string]SemanticDeclarationReport {
	pending := semanticTypeObjectSet{}
	for objectID, objects := range roots {
		if activeTypeIDs[objectID] {
			continue
		}
		for _, object := range objects {
			if object.Pkg() == nil {
				continue
			}
			addSemanticTypeObject(pending, object)
		}
	}
	reports := map[string]SemanticDeclarationReport{}
	canonicalReports := map[string]string{}
	processed := map[*types.TypeName]bool{}
	for {
		objectID, object := nextDependencyTypeObject(pending, processed)
		if object == nil {
			break
		}
		processed[object] = true
		encoder := newDeclarationSurfaceSemanticTypeEncoder()
		report := semanticDependencyTypeDeclaration(encoder, object)
		if report.Object == nil || report.Object.ID != objectID {
			fatalf("dependency Go type declaration %s lost its exact object identity", objectID)
		}
		canonical := canonicalSemanticDeclaration(report)
		if previous, exists := canonicalReports[objectID]; exists && previous != canonical {
			fatalf("dependency Go type %s has conflicting exact declarations in one profile", objectID)
		}
		if _, exists := reports[objectID]; !exists {
			reports[objectID] = report
			canonicalReports[objectID] = canonical
		}
		for _, referenced := range encoder.referencedTypes {
			referencedID := semanticObjectID(referenced)
			if referenced.Pkg() != nil && !activeTypeIDs[referencedID] {
				addSemanticTypeObject(pending, referenced)
			}
		}
	}
	return reports
}

func activeSemanticTypeObjectIDs(declarations map[string]SemanticDeclarationReport) map[string]bool {
	active := map[string]bool{}
	for _, declaration := range declarations {
		if declaration.Kind != "type" {
			continue
		}
		if declaration.Object == nil || declaration.Type == nil || declaration.Type.Object.ID != declaration.Object.ID {
			fatalf("active Go type report has inconsistent object evidence")
		}
		active[declaration.Object.ID] = true
	}
	return active
}

func semanticDependencyTypeDeclaration(encoder *semanticTypeEncoder, object *types.TypeName) SemanticDeclarationReport {
	if object == nil {
		fatalf("cannot encode a nil dependency Go type declaration")
	}
	if object.Pkg() == types.Unsafe && object.Type() == types.Typ[types.UnsafePointer] {
		objectReport := SemanticObjectReport{
			ID: semanticObjectID(object), Name: object.Name(), PackagePath: semanticPackagePath(object.Pkg()), Exported: object.Exported(),
			Type: encoder.typeReportAt(object.Type(), semanticObjectID(object)+"::type"),
		}
		return SemanticDeclarationReport{
			Kind: "type", PackagePath: objectReport.PackagePath, Object: &objectReport,
			Type: &SemanticTypeDeclaration{
				Alias: false, Object: objectReport, TypeParameters: []SemanticTypeParameterReport{}, RHS: objectReport.Type,
				MethodSurface: "complete", Methods: []SemanticMethodReport{}, ValueMethodSet: []SemanticMethodSelectionReport{}, PointerMethodSet: []SemanticMethodSelectionReport{},
			}, Profiles: []int{},
		}
	}
	encoder.registerObject(object)
	objectReport := semanticObjectReport(encoder, object)
	report := SemanticDeclarationReport{
		Kind: "type", PackagePath: objectReport.PackagePath, Object: &objectReport, Profiles: []int{},
	}
	methods := dependencyDeclaredMethods(object)
	valueMethodSet := types.NewMethodSet(object.Type())
	pointerMethodSet := types.NewMethodSet(types.NewPointer(object.Type()))
	registerDependencyMethods(encoder, methods, valueMethodSet, pointerMethodSet)
	report.Type = &SemanticTypeDeclaration{
		Alias: object.IsAlias(), Object: objectReport, TypeParameters: semanticDeclaredTypeParameters(encoder, object),
		RHS: encoder.typeReportAt(dependencyDeclaredTypeRHS(object), objectReport.ID+"::rhs"), MethodSurface: "complete",
		Methods:          semanticDependencyMethodReports(encoder, objectReport.ID, methods),
		ValueMethodSet:   semanticDependencyMethodSet(encoder, objectReport.ID, valueMethodSet),
		PointerMethodSet: semanticDependencyMethodSet(encoder, objectReport.ID, pointerMethodSet),
	}
	return report
}

func dependencyDeclaredTypeRHS(object *types.TypeName) types.Type {
	switch declared := object.Type().(type) {
	case *types.Named:
		if object.IsAlias() {
			fatalf("dependency Go alias %s was materialized as *types.Named", semanticObjectID(object))
		}
		return declared.Underlying()
	case *types.Alias:
		if !object.IsAlias() {
			fatalf("dependency defined Go type %s was materialized as *types.Alias", semanticObjectID(object))
		}
		return declared.Rhs()
	default:
		fatalf("dependency Go type %s has unsupported declaration type %T", semanticObjectID(object), object.Type())
		return nil
	}
}

func dependencyDeclaredMethods(object *types.TypeName) []*types.Func {
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

func registerDependencyMethods(encoder *semanticTypeEncoder, methods []*types.Func, methodSets ...*types.MethodSet) {
	registered := map[*types.Func]bool{}
	for _, method := range methods {
		registerDependencyMethodObject(encoder, registered, method)
	}
	for _, methodSet := range methodSets {
		for index := 0; index < methodSet.Len(); index++ {
			method, ok := methodSet.At(index).Obj().(*types.Func)
			if !ok {
				fatalf("dependency Go method selection resolved to %T", methodSet.At(index).Obj())
			}
			registerDependencyMethodObject(encoder, registered, dependencyDeclaredMethodObject(method))
		}
	}
}

func registerDependencyMethodObject(encoder *semanticTypeEncoder, registered map[*types.Func]bool, method *types.Func) {
	if registered[method] {
		return
	}
	registered[method] = true
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("dependency Go method %s has non-signature type %T", method.Name(), method.Type())
	}
	if signature.Recv() != nil {
		encoder.registerObject(method)
	}
}

func semanticDependencyMethodReports(encoder *semanticTypeEncoder, ownerID string, methods []*types.Func) []SemanticMethodReport {
	reports := make([]SemanticMethodReport, 0, len(methods))
	for _, method := range methods {
		reports = append(reports, semanticDependencySelectedMethodReport(encoder, ownerID, method))
	}
	return reports
}

func semanticDependencyMethodSet(encoder *semanticTypeEncoder, selectedOwnerID string, methodSet *types.MethodSet) []SemanticMethodSelectionReport {
	reports := make([]SemanticMethodSelectionReport, 0, methodSet.Len())
	for index := 0; index < methodSet.Len(); index++ {
		selection := methodSet.At(index)
		method, ok := selection.Obj().(*types.Func)
		if !ok {
			fatalf("dependency Go method selection resolved to %T", selection.Obj())
		}
		selectedSignature, ok := selection.Type().(*types.Signature)
		if !ok {
			fatalf("dependency Go method selection %s has non-signature type %T", types.Id(method.Pkg(), method.Name()), selection.Type())
		}
		identity := semanticDependencySelectedMethodIdentity(selectedOwnerID, dependencyDeclaredMethodObject(method))
		indexPath := append([]int{}, selection.Index()...)
		signature := encoder.signatureReportAt(selectedSignature, identity.ID+"::methodSetSignature", false)
		signatureID := semanticMethodSetSignatureID(identity.ID, signature)
		reports = append(reports, SemanticMethodSelectionReport{
			Key: types.Id(method.Pkg(), method.Name()), MethodID: identity.ID, MethodOwnerID: identity.OwnerID,
			Name: identity.Name, PackagePath: identity.PackagePath, Exported: identity.Exported,
			Index: indexPath, Indirect: selection.Indirect(), Promoted: len(indexPath) > 1,
			SignatureID: signatureID, Signature: signature,
		})
	}
	return reports
}

func semanticDependencySelectedMethodIdentity(selectedOwnerID string, method *types.Func) SemanticMethodReport {
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("dependency Go selected method %s has non-signature type %T", method.Name(), method.Type())
	}
	ownerID := selectedOwnerID
	if signature.Recv() != nil {
		if receiver := receiverTypeObject(signature.Recv().Type()); receiver != nil {
			ownerID = semanticObjectID(receiver)
		}
	}
	return SemanticMethodReport{
		ID: ownerID + "::method::" + method.Name(), OwnerID: ownerID, Name: method.Name(),
		PackagePath: semanticPackagePath(method.Pkg()), Exported: method.Exported(),
	}
}

func semanticMethodSetSignatureID(methodID string, signature *SemanticSignatureReport) string {
	encoded, err := json.Marshal(signature)
	if err != nil {
		fatalf("encode selected Go method signature %s: %v", methodID, err)
	}
	return methodID + "::methodSetSignature::" + hashBytes(encoded)
}

func dependencyDeclaredMethodObject(method *types.Func) *types.Func {
	signature, ok := method.Type().(*types.Signature)
	if !ok || signature.Recv() == nil {
		return method
	}
	receiver := receiverTypeObject(signature.Recv().Type())
	if receiver == nil {
		return method
	}
	named, ok := receiver.Type().(*types.Named)
	if !ok {
		return method
	}
	methodID := semanticObjectID(method)
	for index := 0; index < named.NumMethods(); index++ {
		declared := named.Method(index)
		if semanticObjectID(declared) == methodID {
			return declared
		}
	}
	if contract, ok := named.Underlying().(*types.Interface); ok {
		contract.Complete()
		for index := 0; index < contract.NumExplicitMethods(); index++ {
			declared := contract.ExplicitMethod(index)
			if declared.Name() == method.Name() && declared.Pkg() == method.Pkg() {
				return declared
			}
		}
	}
	fatalf("selected Go method %s has no declared receiver method object", methodID)
	return nil
}

func semanticDependencySelectedMethodReport(encoder *semanticTypeEncoder, selectedOwnerID string, method *types.Func) SemanticMethodReport {
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("dependency Go selected method %s has non-signature type %T", method.Name(), method.Type())
	}
	if signature.Recv() != nil {
		if receiver := receiverTypeObject(signature.Recv().Type()); receiver != nil {
			if _, ok := receiver.Type().Underlying().(*types.Interface); ok {
				methodID := semanticObjectID(method)
				return SemanticMethodReport{
					ID: methodID, OwnerID: semanticObjectID(receiver), Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
					Exported: method.Exported(), Signature: encoder.signatureReportAt(signature, methodID+"::signature", false),
				}
			}
		}
		return semanticDependencyMethodReport(encoder, method)
	}
	methodID := selectedOwnerID + "::selectedMethod::" + types.Id(method.Pkg(), method.Name())
	return SemanticMethodReport{
		ID: methodID, OwnerID: selectedOwnerID, Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
		Exported: method.Exported(), Signature: encoder.signatureReportAt(signature, methodID+"::signature", false),
	}
}

func semanticDependencyMethodReport(encoder *semanticTypeEncoder, method *types.Func) SemanticMethodReport {
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("dependency Go method %s has non-signature type %T", semanticObjectID(method), method.Type())
	}
	receiverObject := receiverTypeObject(signature.Recv().Type())
	if receiverObject == nil {
		fatalf("dependency Go method %s has no named receiver", semanticObjectID(method))
	}
	methodID := semanticObjectID(method)
	return SemanticMethodReport{
		ID: methodID, OwnerID: semanticObjectID(receiverObject), Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
		Exported: method.Exported(), Signature: encoder.signatureReportAt(signature, methodID+"::signature", true),
	}
}

func mergedDependencyTypeDeclarations(merged map[string]semanticUnitEvidence) []SemanticDeclarationReport {
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

func addSemanticTypeObject(objects semanticTypeObjectSet, object *types.TypeName) {
	if object == nil {
		fatalf("cannot add a nil dependency Go type")
	}
	objectID := semanticObjectID(object)
	for _, previous := range objects[objectID] {
		if previous != object {
			continue
		}
		return
	}
	objects[objectID] = append(objects[objectID], object)
}

func nextDependencyTypeObject(pending semanticTypeObjectSet, processed map[*types.TypeName]bool) (string, *types.TypeName) {
	identities := make([]string, 0, len(pending))
	for objectID, objects := range pending {
		for _, object := range objects {
			if !processed[object] {
				identities = append(identities, objectID)
				break
			}
		}
	}
	if len(identities) == 0 {
		return "", nil
	}
	sort.Strings(identities)
	objectID := identities[0]
	for _, object := range pending[objectID] {
		if !processed[object] {
			return objectID, object
		}
	}
	fatalf("dependency Go type queue lost unprocessed object %s", objectID)
	return "", nil
}
