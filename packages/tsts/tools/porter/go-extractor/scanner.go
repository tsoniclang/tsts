package main

import (
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

func scanGoFile(root string, path string, modulePath string, knownPackageNames ...map[string]string) FileReport {
	rel := mustRel(root, path)
	source, err := os.ReadFile(path)
	if err != nil {
		fatalf("read Go declaration source %s: %v", rel, err)
	}
	lineCount := countLines(source)
	fileSet := token.NewFileSet()
	parsed, err := parser.ParseFile(fileSet, path, source, parser.ParseComments)
	packageNames := map[string]string{}
	if len(knownPackageNames) > 0 && knownPackageNames[0] != nil {
		packageNames = knownPackageNames[0]
	}
	report := FileReport{
		Path:              rel,
		SourceHash:        hashBytes(source),
		GitBlobHash:       gitBlobHash(source),
		ByteLength:        len(source),
		LineCount:         lineCount,
		BuildTags:         explicitBuildTags(source, rel),
		ImplicitBuildTags: implicitBuildTags(rel),
		Imports:           []ImportReport{},
		Units:             []UnitReport{},
		Metadata: map[string]string{
			"basename": filepath.Base(rel),
		},
	}
	report.ImportPath = importPathFor(modulePath, rel)
	if err != nil {
		fatalf("parse Go declaration source %s: %v", rel, err)
	}
	report.PackageName = parsed.Name.Name
	report.ImportPath = sourceImportPath(modulePath, rel, report.PackageName)
	report.Generated = ast.IsGenerated(parsed)
	report.Imports = importsOf(parsed, packageNames, rel)
	report.Units = unitsOf(fileSet, parsed, rel, modulePath, report.Generated)
	return report
}

func sourceImportPath(modulePath string, relative string, packageName string) string {
	path := importPathFor(modulePath, relative)
	if strings.HasSuffix(relative, "_test.go") && strings.HasSuffix(packageName, "_test") {
		return path + "_test"
	}
	return path
}

func unitsOf(fileSet *token.FileSet, parsed *ast.File, rel string, modulePath string, generated bool) []UnitReport {
	units := []UnitReport{}
	seenIDs := map[string]int{}
	for _, decl := range parsed.Decls {
		switch typed := decl.(type) {
		case *ast.FuncDecl:
			units = append(units, funcUnit(fileSet, typed, rel, modulePath, generated, seenIDs))
		case *ast.GenDecl:
			units = append(units, genDeclUnit(fileSet, typed, rel, modulePath, generated, seenIDs))
			if typed.Tok == token.TYPE {
				for _, spec := range typed.Specs {
					typeSpec, ok := spec.(*ast.TypeSpec)
					if !ok {
						fatalf("unsupported type declaration spec %T in %s", spec, rel)
					}
					units = append(units, typeUnit(fileSet, typeSpec, rel, modulePath, generated, seenIDs))
				}
			}
		default:
			fatalf("unsupported Go declaration node %T in %s; bump the extractor snapshot schema before adding support", decl, rel)
		}
	}
	sort.Slice(units, func(left, right int) bool {
		if units[left].StartOffset == units[right].StartOffset {
			return units[left].ID < units[right].ID
		}
		return units[left].StartOffset < units[right].StartOffset
	})
	return units
}

func funcUnit(fileSet *token.FileSet, decl *ast.FuncDecl, rel string, modulePath string, generated bool, seenIDs map[string]int) UnitReport {
	name := decl.Name.Name
	kind := "func"
	receiver := ""
	receiverMode := ""
	if decl.Recv != nil && len(decl.Recv.List) > 0 {
		kind = "method"
		receiver, receiverMode = receiverName(decl.Recv.List[0].Type)
		name = receiver + "." + name
	}
	signature := printed(funcSignatureOnly(decl))
	unit := baseUnit(fileSet, decl, rel, modulePath, kind, name, generated, seenIDs)
	signatureEnd := fileSet.PositionFor(decl.Type.End(), false)
	unit.EndLine = signatureEnd.Line
	unit.EndOffset = signatureEnd.Offset
	unit.Name = decl.Name.Name
	unit.QualifiedName = name
	unit.Receiver = receiver
	unit.ReceiverMode = receiverMode
	if decl.Recv != nil && len(decl.Recv.List) > 0 {
		unit.ReceiverType = typeExpr(decl.Recv.List[0].Type)
	}
	unit.Signature = signature
	unit.SigHash = hashText(signature)
	unit.BodyHash = opaqueFunctionBodyHash(decl.Body)
	unit.Snippet = signature
	unit.TypeParameters = fieldNames(decl.Type.TypeParams)
	unit.TypeParameterDetails = typeParameters(decl.Type.TypeParams)
	unit.Parameters = paramsOf(decl.Type.Params)
	unit.Results = paramsOf(decl.Type.Results)
	unit.Exported = ast.IsExported(decl.Name.Name)
	return unit
}

func genDeclUnit(fileSet *token.FileSet, decl *ast.GenDecl, rel string, modulePath string, generated bool, seenIDs map[string]int) UnitReport {
	name := genDeclName(decl)
	kind := strings.ToLower(decl.Tok.String()) + "Group"
	signature := printed(declarationWithoutComments(decl))
	if decl.Tok == token.CONST || decl.Tok == token.VAR {
		signature = valueGroupSignature(decl)
	}
	unit := baseUnit(fileSet, decl, rel, modulePath, kind, name, generated, seenIDs)
	if decl.Tok == token.VAR {
		signatureEnd := fileSet.PositionFor(valueGroupSignatureEnd(decl), false)
		unit.EndLine = signatureEnd.Line
		unit.EndOffset = signatureEnd.Offset
	}
	unit.Name = name
	unit.QualifiedName = name
	unit.Signature = signature
	unit.SigHash = hashText(signature)
	unit.BodyHash = hashText("")
	if decl.Tok == token.VAR {
		unit.BodyHash = opaqueValueInitializersHash(decl)
	}
	unit.Snippet = signature
	unit.ValueSpecs = valueSpecsOf(decl)
	unit.Exported = hasExportedSpec(decl)
	return unit
}

func typeUnit(fileSet *token.FileSet, spec *ast.TypeSpec, rel string, modulePath string, generated bool, seenIDs map[string]int) UnitReport {
	name := spec.Name.Name
	unit := baseUnit(fileSet, spec, rel, modulePath, "type", name, generated, seenIDs)
	unit.Name = name
	unit.QualifiedName = name
	unit.TypeKind = typeKind(spec)
	unit.Signature = printed(typeSpecWithoutComments(spec))
	unit.SigHash = hashText(unit.Signature)
	unit.BodyHash = hashText("")
	unit.Snippet = unit.Signature
	unit.TypeParameters = fieldNames(spec.TypeParams)
	unit.TypeParameterDetails = typeParameters(spec.TypeParams)
	unit.TypeExpression = typeExpr(spec.Type)
	unit.Members = typeMembers(spec)
	unit.Exported = ast.IsExported(name)
	return unit
}

func valueGroupSignature(declaration *ast.GenDecl) string {
	parts := make([]string, 0, len(declaration.Specs))
	for _, specification := range declaration.Specs {
		value, ok := specification.(*ast.ValueSpec)
		if !ok {
			fatalf("Go %s declaration contains unsupported specification %T", declaration.Tok, specification)
		}
		names := make([]string, len(value.Names))
		for index, name := range value.Names {
			names[index] = name.Name
		}
		part := strings.Join(names, ", ")
		if value.Type == nil {
			part += " <inferred>"
		} else {
			part += " " + printed(value.Type)
		}
		parts = append(parts, part)
	}
	if declaration.Lparen.IsValid() {
		return declaration.Tok.String() + " (" + strings.Join(parts, "; ") + ")"
	}
	return declaration.Tok.String() + " " + strings.Join(parts, "; ")
}

func valueGroupSignatureEnd(declaration *ast.GenDecl) token.Pos {
	end := declaration.Pos()
	for _, specification := range declaration.Specs {
		value, ok := specification.(*ast.ValueSpec)
		if !ok {
			fatalf("Go %s declaration contains unsupported specification %T", declaration.Tok, specification)
		}
		for _, name := range value.Names {
			if name.End() > end {
				end = name.End()
			}
		}
		if value.Type != nil && value.Type.End() > end {
			end = value.Type.End()
		}
	}
	return end
}

func opaqueValueInitializersHash(declaration *ast.GenDecl) string {
	fragments := []string{}
	for _, specification := range declaration.Specs {
		value, ok := specification.(*ast.ValueSpec)
		if !ok {
			fatalf("Go %s declaration contains unsupported specification %T", declaration.Tok, specification)
		}
		for _, expression := range value.Values {
			text := printed(expression)
			fragments = append(fragments, strconv.Itoa(len(text))+":"+text)
		}
	}
	return hashText(strings.Join(fragments, ""))
}

func opaqueFunctionBodyHash(body *ast.BlockStmt) string {
	if body == nil {
		return hashText("")
	}
	return hashText(printed(body))
}

func baseUnit(fileSet *token.FileSet, node ast.Node, rel string, modulePath string, kind string, name string, generated bool, seenIDs map[string]int) UnitReport {
	start := fileSet.PositionFor(node.Pos(), false)
	end := fileSet.PositionFor(node.End(), false)
	idBase := modulePath + "::" + rel + "::" + kind + "::" + name
	seenIDs[idBase]++
	id := idBase
	if seenIDs[idBase] > 1 {
		id = idBase + "::#" + strconv.Itoa(seenIDs[idBase])
	}
	return UnitReport{
		ID:                   id,
		Kind:                 kind,
		Generated:            generated,
		StartLine:            start.Line,
		EndLine:              end.Line,
		StartOffset:          start.Offset,
		EndOffset:            end.Offset,
		TypeParameters:       []string{},
		TypeParameterDetails: []TypeParameterReport{},
		Parameters:           []ParamReport{},
		Results:              []ParamReport{},
		ValueSpecs:           []ValueSpecReport{},
		Members:              []MemberReport{},
		Metadata: map[string]string{
			"goPath": rel,
		},
	}
}

func funcSignatureOnly(decl *ast.FuncDecl) *ast.FuncDecl {
	copyDecl := *decl
	copyDecl.Doc = nil
	copyDecl.Body = nil
	return &copyDecl
}

func declarationWithoutComments(declaration *ast.GenDecl) *ast.GenDecl {
	copyDeclaration := *declaration
	copyDeclaration.Doc = nil
	copyDeclaration.Specs = make([]ast.Spec, len(declaration.Specs))
	for index, specification := range declaration.Specs {
		switch typed := specification.(type) {
		case *ast.ImportSpec:
			copySpecification := *typed
			copySpecification.Doc = nil
			copySpecification.Comment = nil
			copyDeclaration.Specs[index] = &copySpecification
		case *ast.TypeSpec:
			copyDeclaration.Specs[index] = typeSpecWithoutComments(typed)
		case *ast.ValueSpec:
			copySpecification := *typed
			copySpecification.Doc = nil
			copySpecification.Comment = nil
			copyDeclaration.Specs[index] = &copySpecification
		default:
			fatalf("unsupported Go declaration specification %T", specification)
		}
	}
	return &copyDeclaration
}

func typeSpecWithoutComments(specification *ast.TypeSpec) *ast.TypeSpec {
	copySpecification := *specification
	copySpecification.Doc = nil
	copySpecification.Comment = nil
	return &copySpecification
}

func genDeclName(decl *ast.GenDecl) string {
	var names []string
	for _, spec := range decl.Specs {
		switch typed := spec.(type) {
		case *ast.TypeSpec:
			names = append(names, typed.Name.Name)
		case *ast.ValueSpec:
			for _, name := range typed.Names {
				names = append(names, name.Name)
			}
		case *ast.ImportSpec:
			importName := strings.Trim(typed.Path.Value, `"`)
			if typed.Name != nil {
				importName = typed.Name.Name + ":" + importName
			}
			names = append(names, importName)
		}
	}
	if len(names) == 0 {
		return "anonymous"
	}
	return strings.Join(names, "+")
}

func hasExportedSpec(decl *ast.GenDecl) bool {
	for _, spec := range decl.Specs {
		switch typed := spec.(type) {
		case *ast.TypeSpec:
			if ast.IsExported(typed.Name.Name) {
				return true
			}
		case *ast.ValueSpec:
			for _, name := range typed.Names {
				if ast.IsExported(name.Name) {
					return true
				}
			}
		}
	}
	return false
}

func receiverName(expr ast.Expr) (string, string) {
	switch typed := expr.(type) {
	case *ast.Ident:
		return typed.Name, "value"
	case *ast.StarExpr:
		name, _ := receiverName(typed.X)
		return name, "pointer"
	case *ast.IndexExpr:
		name, mode := receiverName(typed.X)
		return name, mode
	case *ast.IndexListExpr:
		name, mode := receiverName(typed.X)
		return name, mode
	case *ast.ParenExpr:
		return receiverName(typed.X)
	default:
		fatalf("unsupported Go receiver type syntax %T", expr)
		return "", ""
	}
}

func typeKind(spec *ast.TypeSpec) string {
	if spec.Assign.IsValid() {
		return "alias"
	}
	switch spec.Type.(type) {
	case *ast.StructType:
		return "struct"
	case *ast.InterfaceType:
		return "interface"
	case *ast.FuncType:
		return "func"
	default:
		return "named"
	}
}

func typeMembers(spec *ast.TypeSpec) []MemberReport {
	members := []MemberReport{}
	switch typed := spec.Type.(type) {
	case *ast.StructType:
		if typed.Fields != nil {
			for _, field := range typed.Fields.List {
				fieldType := printed(field.Type)
				fieldExpr := typeExpr(field.Type)
				structTag, tagValues, tagRemainder := fieldTags(field)
				if len(field.Names) == 0 {
					members = append(members, MemberReport{Kind: "embeddedField", Name: fieldType, Exported: embeddedFieldExported(field.Type), Type: fieldType, TypeExpr: fieldExpr, StructTag: structTag, TagValues: tagValues, TagRemainder: tagRemainder})
					continue
				}
				for _, name := range field.Names {
					members = append(members, MemberReport{Kind: "field", Name: name.Name, Exported: ast.IsExported(name.Name), Type: fieldType, TypeExpr: fieldExpr, StructTag: structTag, TagValues: tagValues, TagRemainder: tagRemainder})
				}
			}
		}
	case *ast.InterfaceType:
		if typed.Methods != nil {
			for _, field := range typed.Methods.List {
				fieldType := printed(field.Type)
				fieldExpr := typeExpr(field.Type)
				if len(field.Names) == 0 {
					members = append(members, MemberReport{Kind: "embeddedInterface", Name: fieldType, Type: fieldType, TypeExpr: fieldExpr})
					continue
				}
				for _, name := range field.Names {
					members = append(members, MemberReport{Kind: "method", Name: name.Name, Type: fieldType, TypeExpr: fieldExpr})
				}
			}
		}
	}
	return members
}

func paramsOf(fields *ast.FieldList) []ParamReport {
	if fields == nil {
		return []ParamReport{}
	}
	params := []ParamReport{}
	for _, field := range fields.List {
		param := ParamReport{
			Type: typeExpr(field.Type),
		}
		if ellipsis, ok := field.Type.(*ast.Ellipsis); ok {
			param.Type = typeExpr(ellipsis.Elt)
			param.Variadic = true
		}
		for _, name := range field.Names {
			param.Names = append(param.Names, name.Name)
		}
		params = append(params, param)
	}
	return params
}

func typeParameters(fields *ast.FieldList) []TypeParameterReport {
	if fields == nil {
		return []TypeParameterReport{}
	}
	params := []TypeParameterReport{}
	for _, field := range fields.List {
		constraint := typeExpr(field.Type)
		for _, name := range field.Names {
			params = append(params, TypeParameterReport{Name: name.Name, Constraint: constraint})
		}
	}
	return params
}

func valueSpecsOf(decl *ast.GenDecl) []ValueSpecReport {
	if decl.Tok != token.CONST && decl.Tok != token.VAR {
		return []ValueSpecReport{}
	}
	specs := []ValueSpecReport{}
	for _, spec := range decl.Specs {
		valueSpec, ok := spec.(*ast.ValueSpec)
		if !ok {
			continue
		}
		report := ValueSpecReport{}
		for _, name := range valueSpec.Names {
			report.Names = append(report.Names, name.Name)
		}
		if valueSpec.Type != nil {
			report.Type = typeExpr(valueSpec.Type)
		}
		specs = append(specs, report)
	}
	return specs
}
