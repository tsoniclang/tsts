package main

import (
	"go/ast"
	"go/token"
	"go/types"
	"sort"
	"strings"
)

func semanticDeclarations(root string, modulePath string, checkedPackages []*declarationCheckedPackage, locations map[string]string, requiredFiles map[string]bool) (map[string]SemanticDeclarationReport, map[string]bool) {
	reports := map[string]SemanticDeclarationReport{}
	covered := map[string]bool{}
	for _, checked := range checkedPackages {
		if checked == nil || checked.info == nil || checked.fileSet == nil || !packageBelongsToModule(checked.metadata, modulePath) {
			continue
		}
		encoder := newSemanticTypeEncoder()
		files := semanticPackageFiles(root, checked, requiredFiles)
		for _, file := range semanticAllPackageFiles(root, checked) {
			registerSemanticTypeObjects(encoder, checked.info, file.syntax)
		}
		for _, file := range files {
			registerSemanticFunctionObjects(encoder, checked.info, checked.fileSet, file.relative, file.syntax, locations)
		}
		for _, file := range files {
			covered[file.relative] = true
			for _, declaration := range file.syntax.Decls {
				for _, item := range semanticReportsForDeclaration(encoder, checked, file.relative, declaration, locations) {
					location := semanticLocationKey(file.relative, item.kind, item.name, item.offset)
					unitID, ok := locations[location]
					if !ok {
						fatalf("go/types declaration has no syntax snapshot unit at %s", location)
					}
					if previous, exists := reports[unitID]; exists && canonicalSemanticDeclaration(previous) != canonicalSemanticDeclaration(item.report) {
						fatalf("conflicting go/types package variants for %s", unitID)
					}
					reports[unitID] = item.report
				}
			}
		}
	}
	return reports, covered
}

func semanticAllPackageFiles(root string, checked *declarationCheckedPackage) []semanticPackageFile {
	files := []semanticPackageFile{}
	for _, file := range checked.files {
		position := checked.fileSet.PositionFor(file.Pos(), false)
		relative, ok := relativeSemanticPath(root, position.Filename)
		if !ok {
			continue
		}
		files = append(files, semanticPackageFile{relative: relative, syntax: file})
	}
	sort.Slice(files, func(left, right int) bool { return files[left].relative < files[right].relative })
	return files
}

type semanticPackageFile struct {
	relative string
	syntax   *ast.File
}

func semanticPackageFiles(root string, checked *declarationCheckedPackage, requiredFiles map[string]bool) []semanticPackageFile {
	files := []semanticPackageFile{}
	for _, file := range checked.files {
		position := checked.fileSet.PositionFor(file.Pos(), false)
		relative, ok := relativeSemanticPath(root, position.Filename)
		if !ok || !requiredFiles[relative] {
			continue
		}
		files = append(files, semanticPackageFile{relative: relative, syntax: file})
	}
	sort.Slice(files, func(left, right int) bool { return files[left].relative < files[right].relative })
	return files
}

func registerSemanticTypeObjects(encoder *semanticTypeEncoder, info *types.Info, file *ast.File) {
	for _, declaration := range file.Decls {
		general, ok := declaration.(*ast.GenDecl)
		if !ok || general.Tok != token.TYPE {
			continue
		}
		for _, specification := range general.Specs {
			typeSpec, ok := specification.(*ast.TypeSpec)
			if !ok {
				fatalf("Go type declaration contains unsupported specification %T", specification)
			}
			object := requireSemanticObject(info, typeSpec.Name)
			typeName, ok := object.(*types.TypeName)
			if !ok {
				fatalf("Go type declaration %s resolved to %T", typeSpec.Name.Name, object)
			}
			encoder.registerObject(typeName)
			registerTypeParameterConstraintSyntax(encoder, declaredTypeParameters(typeName), typeSpec.TypeParams)
		}
	}
}

func registerSemanticFunctionObjects(encoder *semanticTypeEncoder, info *types.Info, fileSet *token.FileSet, relative string, file *ast.File, locations map[string]string) {
	for _, declaration := range file.Decls {
		functionDeclaration, ok := declaration.(*ast.FuncDecl)
		if !ok {
			continue
		}
		object := requireSemanticObject(info, functionDeclaration.Name)
		function, ok := object.(*types.Func)
		if !ok {
			fatalf("Go function declaration %s resolved to %T", functionDeclaration.Name.Name, object)
		}
		if functionDeclaration.Recv == nil && functionDeclaration.Name.Name == "init" {
			offset := fileSet.PositionFor(functionDeclaration.Pos(), false).Offset
			unitID, ok := locations[semanticLocationKey(relative, "func", "init", offset)]
			if !ok {
				fatalf("Go init declaration has no syntax unit in %s at byte offset %d", relative, offset)
			}
			encoder.registerObjectID(object, unitID+"::object")
		}
		encoder.registerObject(object)
		signature, ok := function.Type().(*types.Signature)
		if !ok {
			fatalf("Go function declaration %s has non-signature type %T", function.Name(), function.Type())
		}
		registerTypeParameterConstraintSyntax(encoder, signature.TypeParams(), functionDeclaration.Type.TypeParams)
		if signature.RecvTypeParams() != nil && signature.RecvTypeParams().Len() > 0 {
			receiverObject := receiverTypeObject(signature.Recv().Type())
			if receiverObject == nil {
				fatalf("generic Go method %s has no named receiver object", function.Name())
			}
			encoder.copyTypeParameterConstraintSyntax(signature.RecvTypeParams(), declaredTypeParameters(receiverObject))
		}
	}
}

func registerTypeParameterConstraintSyntax(encoder *semanticTypeEncoder, parameters *types.TypeParamList, fields *ast.FieldList) {
	count := 0
	if fields != nil {
		for _, field := range fields.List {
			constraintSyntax := printed(field.Type)
			for _, name := range field.Names {
				if parameters == nil || count >= parameters.Len() {
					fatalf("Go type-parameter syntax has more names than go/types evidence")
				}
				parameter := parameters.At(count)
				if name.Name != parameter.Obj().Name() {
					fatalf("Go type-parameter syntax name %s disagrees with go/types name %s", name.Name, parameter.Obj().Name())
				}
				encoder.registerTypeParameterConstraintSyntax(parameter, constraintSyntax)
				count++
			}
		}
	}
	if parameters != nil && count != parameters.Len() {
		fatalf("Go type-parameter syntax has %d names but go/types has %d", count, parameters.Len())
	}
}

func declaredTypeParameters(object *types.TypeName) *types.TypeParamList {
	switch declared := object.Type().(type) {
	case *types.Named:
		return declared.TypeParams()
	case *types.Alias:
		return declared.TypeParams()
	default:
		fatalf("Go type declaration %s has unsupported object type %T", object.Name(), object.Type())
		return nil
	}
}

type semanticDeclarationItem struct {
	kind   string
	name   string
	offset int
	report SemanticDeclarationReport
}

func semanticReportsForDeclaration(encoder *semanticTypeEncoder, checked *declarationCheckedPackage, relative string, declaration ast.Decl, locations map[string]string) []semanticDeclarationItem {
	info := checked.info
	fileSet := checked.fileSet
	packagePath := checked.types.Path()
	switch typed := declaration.(type) {
	case *ast.FuncDecl:
		object := requireSemanticObject(info, typed.Name)
		function, ok := object.(*types.Func)
		if !ok {
			fatalf("Go function declaration %s resolved to %T", typed.Name.Name, object)
		}
		signature, ok := function.Type().(*types.Signature)
		if !ok {
			fatalf("Go function declaration %s has non-signature type %T", typed.Name.Name, function.Type())
		}
		kind := "func"
		name := typed.Name.Name
		if typed.Recv != nil {
			kind = "method"
			receiver, _ := receiverName(typed.Recv.List[0].Type)
			name = receiver + "." + typed.Name.Name
		}
		objectReport := semanticObjectReport(encoder, function)
		return []semanticDeclarationItem{{
			kind: kind, name: name, offset: fileSet.PositionFor(typed.Pos(), false).Offset,
			report: SemanticDeclarationReport{
				Kind: kind, PackagePath: packagePath, Object: &objectReport, Signature: encoder.signatureReportAt(signature, objectReport.ID+"::signature", true), Profiles: []int{},
			},
		}}
	case *ast.GenDecl:
		switch typed.Tok {
		case token.CONST, token.VAR:
			kind := "varGroup"
			if typed.Tok == token.CONST {
				kind = "constGroup"
			}
			offset := fileSet.PositionFor(typed.Pos(), false).Offset
			name := semanticGenDeclName(typed, checked.blanks)
			unitID, ok := locations[semanticLocationKey(relative, kind, name, offset)]
			if !ok {
				fatalf("Go value declaration has no syntax snapshot unit in %s at byte offset %d", relative, offset)
			}
			return []semanticDeclarationItem{{
				kind: kind, name: name, offset: offset,
				report: SemanticDeclarationReport{
					Kind: kind, PackagePath: packagePath, ValueSpecs: semanticValueSpecs(encoder, info, typed, checked.blanks, unitID), Profiles: []int{},
				},
			}}
		case token.TYPE:
			items := []semanticDeclarationItem{}
			for _, specification := range typed.Specs {
				typeSpec, ok := specification.(*ast.TypeSpec)
				if !ok {
					fatalf("Go type declaration contains unsupported specification %T", specification)
				}
				items = append(items, semanticTypeDeclarationItem(encoder, checked, typeSpec))
			}
			return items
		case token.IMPORT:
			return nil
		default:
			fatalf("unsupported Go declaration token %s in %s", typed.Tok, relative)
		}
	default:
		fatalf("unsupported Go declaration node %T in %s", declaration, relative)
	}
	return nil
}

func semanticTypeDeclarationItem(encoder *semanticTypeEncoder, checked *declarationCheckedPackage, specification *ast.TypeSpec) semanticDeclarationItem {
	object := requireSemanticObject(checked.info, specification.Name)
	typeName, ok := object.(*types.TypeName)
	if !ok {
		fatalf("Go type declaration %s resolved to %T", specification.Name.Name, object)
	}
	rhs := checked.info.TypeOf(specification.Type)
	if rhs == nil {
		fatalf("Go type declaration %s has no go/types RHS", specification.Name.Name)
	}
	methods := externalDeclaredMethods(typeName)
	valueMethodSet := types.NewMethodSet(typeName.Type())
	pointerMethodSet := types.NewMethodSet(types.NewPointer(typeName.Type()))
	registerExternalMethods(encoder, methods, valueMethodSet, pointerMethodSet)
	objectReport := semanticObjectReport(encoder, typeName)
	declaration := &SemanticTypeDeclaration{
		Alias: typeName.IsAlias(), Object: objectReport, TypeParameters: semanticDeclaredTypeParameters(encoder, typeName),
		RHS: encoder.typeReportAt(rhs, objectReport.ID+"::rhs"), Methods: semanticExternalMethodReports(encoder, objectReport.ID, methods),
		ValueMethodSet:   semanticExternalMethodSet(encoder, objectReport.ID, "valueMethodSet", valueMethodSet),
		PointerMethodSet: semanticExternalMethodSet(encoder, objectReport.ID, "pointerMethodSet", pointerMethodSet),
	}
	return semanticDeclarationItem{
		kind: "type", name: specification.Name.Name, offset: checked.fileSet.PositionFor(specification.Pos(), false).Offset,
		report: SemanticDeclarationReport{
			Kind: "type", PackagePath: checked.types.Path(), Object: &objectReport, Type: declaration, Profiles: []int{},
		},
	}
}

func semanticDeclaredTypeParameters(encoder *semanticTypeEncoder, object *types.TypeName) []SemanticTypeParameterReport {
	return encoder.typeParameterReports(declaredTypeParameters(object))
}

func semanticValueSpecs(encoder *semanticTypeEncoder, info *types.Info, declaration *ast.GenDecl, blanks map[*ast.Ident]bool, ownerPath string) []SemanticValueSpecReport {
	reports := []SemanticValueSpecReport{}
	for specIndex, specification := range declaration.Specs {
		valueSpec, ok := specification.(*ast.ValueSpec)
		if !ok {
			fatalf("Go %s declaration contains unsupported specification %T", declaration.Tok, specification)
		}
		report := SemanticValueSpecReport{SpecIndex: specIndex, Names: []SemanticValueBindingReport{}}
		for nameIndex, identifier := range valueSpec.Names {
			blank := blanks[identifier]
			name := identifier.Name
			if blank {
				name = "_"
			}
			binding := SemanticValueBindingReport{Name: name, NameIndex: nameIndex, Blank: blank}
			object := info.Defs[identifier]
			if binding.Blank {
				if object == nil {
					fatalf("synthetic blank Go declaration identifier has no go/types object")
				}
			}
			if object == nil {
				fatalf("Go declaration identifier %s has no go/types object", identifier.Name)
			}
			switch declaration.Tok {
			case token.CONST:
				constantObject, ok := object.(*types.Const)
				if !ok {
					fatalf("Go const %s resolved to %T", identifier.Name, object)
				}
				objectReport := semanticObjectReport(encoder, constantObject)
				binding.Type = objectReport.Type
				if binding.Blank {
					binding.Type = encoder.typeReportAt(constantObject.Type(), ownerPath+"::spec::"+itoa(specIndex)+"::name::"+itoa(nameIndex)+"::type")
				}
				if !binding.Blank {
					binding.Object = &objectReport
				}
				binding.Constant = semanticConstantReport(constantObject.Val())
			case token.VAR:
				variable, ok := object.(*types.Var)
				if !ok {
					fatalf("Go var %s resolved to %T", identifier.Name, object)
				}
				objectReport := semanticObjectReport(encoder, variable)
				binding.Type = objectReport.Type
				if binding.Blank {
					binding.Type = encoder.typeReportAt(variable.Type(), ownerPath+"::spec::"+itoa(specIndex)+"::name::"+itoa(nameIndex)+"::type")
				}
				if !binding.Blank {
					binding.Object = &objectReport
				}
			default:
				fatalf("unsupported Go value declaration token %s", declaration.Tok)
			}
			report.Names = append(report.Names, binding)
		}
		reports = append(reports, report)
	}
	return reports
}

func semanticGenDeclName(declaration *ast.GenDecl, blanks map[*ast.Ident]bool) string {
	names := []string{}
	for _, specification := range declaration.Specs {
		switch typed := specification.(type) {
		case *ast.ValueSpec:
			for _, identifier := range typed.Names {
				if blanks[identifier] {
					names = append(names, "_")
				} else {
					names = append(names, identifier.Name)
				}
			}
		default:
			fatalf("unsupported semantic value specification %T", specification)
		}
	}
	if len(names) == 0 {
		return "anonymous"
	}
	return strings.Join(names, "+")
}

func requireSemanticObject(info *types.Info, identifier *ast.Ident) types.Object {
	if identifier == nil {
		fatalf("cannot resolve object for nil Go identifier")
	}
	object, exists := info.Defs[identifier]
	if !exists || object == nil {
		fatalf("Go declaration identifier %s has no exact go/types object", identifier.Name)
	}
	return object
}

func snapshotSemanticUnitLocations(snapshot *Snapshot) map[string]string {
	locations := map[string]string{}
	for _, file := range snapshot.Files {
		for _, unit := range file.Units {
			if !semanticRequiredUnitKind(unit.Kind) {
				continue
			}
			name := unit.QualifiedName
			if unit.Kind == "type" || unit.Kind == "constGroup" || unit.Kind == "varGroup" || unit.Kind == "func" {
				name = unit.Name
			}
			key := semanticLocationKey(file.Path, unit.Kind, name, unit.StartOffset)
			if previous, exists := locations[key]; exists {
				fatalf("duplicate Go syntax declaration location %s for %s and %s", key, previous, unit.ID)
			}
			locations[key] = unit.ID
		}
	}
	return locations
}

func semanticLocationKey(relative string, kind string, name string, offset int) string {
	return relative + "::" + kind + "::" + name + "::" + itoa(offset)
}

func semanticRequiredUnitKind(kind string) bool {
	return kind == "func" || kind == "method" || kind == "type" || kind == "constGroup" || kind == "varGroup"
}
