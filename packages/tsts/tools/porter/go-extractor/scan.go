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

func shouldSkipDir(name string, path string, root string) bool {
	if name == ".git" || name == "node_modules" || name == "built" || name == "coverage" {
		return true
	}
	rel, err := filepath.Rel(root, path)
	if err != nil {
		return false
	}
	rel = filepath.ToSlash(rel)
	return rel == "_submodules/TypeScript/.git"
}

func scanGoFile(root string, path string, modulePath string) FileReport {
	rel := mustRel(root, path)
	source, err := os.ReadFile(path)
	if err != nil {
		return FileReport{Path: rel, ParseError: err.Error()}
	}
	lineCount := countLines(source)
	fileSet := token.NewFileSet()
	parsed, err := parser.ParseFile(fileSet, path, source, parser.ParseComments)
	report := FileReport{
		Path:              rel,
		LineCount:         lineCount,
		Generated:         isGenerated(source),
		BuildTags:         explicitBuildTags(source),
		ImplicitBuildTags: implicitBuildTags(rel),
		Imports:           []ImportReport{},
		Units:             []UnitReport{},
		NodeKindCounts:    make(map[string]int),
		FeatureCounts:     make(map[string]int),
		Metadata: map[string]string{
			"basename": filepath.Base(rel),
		},
	}
	report.ImportPath = importPathFor(modulePath, rel)
	if err != nil {
		report.ParseError = err.Error()
		return report
	}
	report.PackageName = parsed.Name.Name
	report.Imports = importsOf(parsed)
	report.NodeKindCounts = nodeCounts(parsed)
	report.FeatureCounts = featureCounts(parsed)
	report.Units = unitsOf(fileSet, parsed, source, rel, modulePath, report.Generated, report.Imports)
	return report
}

func unitsOf(fileSet *token.FileSet, parsed *ast.File, source []byte, rel string, modulePath string, generated bool, imports []ImportReport) []UnitReport {
	units := []UnitReport{}
	seenIDs := map[string]int{}
	for _, decl := range parsed.Decls {
		switch typed := decl.(type) {
		case *ast.FuncDecl:
			units = append(units, funcUnit(fileSet, typed, source, rel, modulePath, generated, seenIDs, imports))
		case *ast.GenDecl:
			units = append(units, genDeclUnit(fileSet, typed, source, rel, modulePath, generated, seenIDs, imports))
			if typed.Tok == token.TYPE {
				for _, spec := range typed.Specs {
					if typeSpec, ok := spec.(*ast.TypeSpec); ok {
						units = append(units, typeUnit(fileSet, typeSpec, source, rel, modulePath, generated, seenIDs, imports))
					}
				}
			}
		}
	}
	sort.Slice(units, func(left, right int) bool {
		if units[left].StartLine == units[right].StartLine {
			return units[left].ID < units[right].ID
		}
		return units[left].StartLine < units[right].StartLine
	})
	return units
}

func funcUnit(fileSet *token.FileSet, decl *ast.FuncDecl, source []byte, rel string, modulePath string, generated bool, seenIDs map[string]int, imports []ImportReport) UnitReport {
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
	snippet := snippetOf(fileSet, source, decl.Pos(), decl.End())
	unit := baseUnit(fileSet, decl, source, rel, modulePath, kind, name, generated, seenIDs)
	unit.Name = decl.Name.Name
	unit.QualifiedName = name
	unit.Receiver = receiver
	unit.ReceiverMode = receiverMode
	if decl.Recv != nil && len(decl.Recv.List) > 0 {
		unit.ReceiverType = typeExpr(decl.Recv.List[0].Type)
	}
	unit.Signature = signature
	unit.SigHash = hashText(signature)
	unit.BodyHash = hashText(printed(decl))
	unit.Snippet = snippet
	unit.TypeParameters = fieldNames(decl.Type.TypeParams)
	unit.TypeParameterDetails = typeParameters(decl.Type.TypeParams)
	unit.Parameters = paramsOf(decl.Type.Params)
	unit.Results = paramsOf(decl.Type.Results)
	unit.Exported = ast.IsExported(decl.Name.Name)
	unit.NodeKindCounts = nodeCounts(decl)
	unit.FeatureCounts = featureCounts(decl)
	unit.ExternalRefs = externalRefsOf(decl, imports)
	return unit
}

func genDeclUnit(fileSet *token.FileSet, decl *ast.GenDecl, source []byte, rel string, modulePath string, generated bool, seenIDs map[string]int, imports []ImportReport) UnitReport {
	name := genDeclName(decl)
	kind := strings.ToLower(decl.Tok.String()) + "Group"
	signature := decl.Tok.String() + " " + name
	unit := baseUnit(fileSet, decl, source, rel, modulePath, kind, name, generated, seenIDs)
	unit.Name = name
	unit.QualifiedName = name
	unit.Signature = signature
	unit.SigHash = hashText(signature)
	unit.BodyHash = hashText(printed(decl))
	unit.Snippet = snippetOf(fileSet, source, decl.Pos(), decl.End())
	unit.ValueSpecs = valueSpecsOf(decl)
	unit.Exported = hasExportedSpec(decl)
	unit.NodeKindCounts = nodeCounts(decl)
	unit.FeatureCounts = featureCounts(decl)
	unit.ExternalRefs = externalRefsOf(decl, imports)
	return unit
}

func typeUnit(fileSet *token.FileSet, spec *ast.TypeSpec, source []byte, rel string, modulePath string, generated bool, seenIDs map[string]int, imports []ImportReport) UnitReport {
	name := spec.Name.Name
	unit := baseUnit(fileSet, spec, source, rel, modulePath, "type", name, generated, seenIDs)
	unit.Name = name
	unit.QualifiedName = name
	unit.TypeKind = typeKind(spec)
	unit.Signature = typeSignature(spec)
	unit.SigHash = hashText(unit.Signature)
	unit.BodyHash = hashText(printed(spec))
	unit.Snippet = snippetOf(fileSet, source, spec.Pos(), spec.End())
	unit.TypeParameters = fieldNames(spec.TypeParams)
	unit.TypeParameterDetails = typeParameters(spec.TypeParams)
	unit.TypeExpression = typeExpr(spec.Type)
	unit.Members = typeMembers(spec)
	unit.Exported = ast.IsExported(name)
	unit.NodeKindCounts = nodeCounts(spec)
	unit.FeatureCounts = featureCounts(spec)
	unit.ExternalRefs = externalRefsOf(spec, imports)
	return unit
}

func baseUnit(fileSet *token.FileSet, node ast.Node, source []byte, rel string, modulePath string, kind string, name string, generated bool, seenIDs map[string]int) UnitReport {
	start := fileSet.Position(node.Pos())
	end := fileSet.Position(node.End())
	idBase := modulePath + "::" + rel + "::" + kind + "::" + name
	seenIDs[idBase]++
	id := idBase
	if seenIDs[idBase] > 1 {
		id = idBase + "::#" + strconv.Itoa(seenIDs[idBase])
	}
	return UnitReport{
		ID:             id,
		Kind:           kind,
		Generated:      generated,
		StartLine:      start.Line,
		EndLine:        end.Line,
		NodeKindCounts: make(map[string]int),
		FeatureCounts:  make(map[string]int),
		Metadata: map[string]string{
			"goPath": rel,
		},
	}
}

func funcSignatureOnly(decl *ast.FuncDecl) *ast.FuncDecl {
	copyDecl := *decl
	copyDecl.Body = nil
	return &copyDecl
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
	default:
		return printed(expr), "unknown"
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

func typeSignature(spec *ast.TypeSpec) string {
	var builder strings.Builder
	builder.WriteString("type ")
	builder.WriteString(spec.Name.Name)
	if spec.TypeParams != nil {
		builder.WriteString("[")
		for index, field := range spec.TypeParams.List {
			if index > 0 {
				builder.WriteString(", ")
			}
			var names []string
			for _, name := range field.Names {
				names = append(names, name.Name)
			}
			builder.WriteString(strings.Join(names, ", "))
			if len(names) > 0 {
				builder.WriteString(" ")
			}
			builder.WriteString(printed(field.Type))
		}
		builder.WriteString("]")
	}
	if spec.Assign.IsValid() {
		builder.WriteString(" =")
	}
	builder.WriteString(" ")
	builder.WriteString(typeKind(spec))
	return builder.String()
}

func typeMembers(spec *ast.TypeSpec) []MemberReport {
	var members []MemberReport
	switch typed := spec.Type.(type) {
	case *ast.StructType:
		if typed.Fields != nil {
			for _, field := range typed.Fields.List {
				fieldType := printed(field.Type)
				fieldExpr := typeExpr(field.Type)
				if len(field.Names) == 0 {
					members = append(members, MemberReport{Kind: "embeddedField", Name: fieldType, Type: fieldType, TypeExpr: fieldExpr})
					continue
				}
				for _, name := range field.Names {
					members = append(members, MemberReport{Kind: "field", Name: name.Name, Type: fieldType, TypeExpr: fieldExpr})
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
