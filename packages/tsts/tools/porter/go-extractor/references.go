package main

import (
	"go/ast"
	"sort"
	"strconv"
)

func importsOf(parsed *ast.File, packageNames map[string]string, sourcePath string) []ImportReport {
	imports := []ImportReport{}
	for _, imp := range parsed.Imports {
		importPath, err := strconv.Unquote(imp.Path.Value)
		if err != nil {
			fatalf("invalid import path %s in %s: %v", imp.Path.Value, sourcePath, err)
		}
		report := ImportReport{Path: importPath, PackageName: packageNames[importPath]}
		if imp.Name != nil {
			report.Name = imp.Name.Name
		}
		if report.Name == "" && report.PackageName == "" {
			report.ResolutionError = "package name is unavailable; path-basename guessing is forbidden"
		}
		imports = append(imports, report)
	}
	sort.Slice(imports, func(left, right int) bool {
		if imports[left].Path == imports[right].Path {
			return imports[left].Name < imports[right].Name
		}
		return imports[left].Path < imports[right].Path
	})
	return imports
}

func externalRefsOf(node ast.Node, imports []ImportReport) []ExternalRefReport {
	aliases := map[string]string{}
	for _, item := range imports {
		if item.Name == "_" || item.Name == "." {
			continue
		}
		alias := item.Name
		if alias == "" {
			alias = item.PackageName
		}
		aliases[alias] = item.Path
	}
	if len(aliases) == 0 {
		return nil
	}

	refs := map[string]*ExternalRefReport{}
	record := func(packageName string, name string, role string) {
		importPath, ok := aliases[packageName]
		if !ok {
			return
		}
		key := importPath + "." + name + ":" + role
		ref := refs[key]
		if ref == nil {
			ref = &ExternalRefReport{ImportPath: importPath, Package: packageName, Name: name, Role: role}
			refs[key] = ref
		}
		ref.Count++
	}

	ast.Inspect(node, func(current ast.Node) bool {
		call, ok := current.(*ast.CallExpr)
		if !ok {
			return true
		}
		if selector := calledSelector(call.Fun); selector != nil {
			if ident, ok := selector.X.(*ast.Ident); ok {
				record(ident.Name, selector.Sel.Name, "call")
			}
		}
		return true
	})
	ast.Inspect(node, func(current ast.Node) bool {
		selector, ok := current.(*ast.SelectorExpr)
		if !ok {
			return true
		}
		if ident, ok := selector.X.(*ast.Ident); ok {
			record(ident.Name, selector.Sel.Name, "value")
		}
		return true
	})

	output := make([]ExternalRefReport, 0, len(refs))
	for _, ref := range refs {
		output = append(output, *ref)
	}
	sort.Slice(output, func(left, right int) bool {
		if output[left].ImportPath == output[right].ImportPath {
			if output[left].Name == output[right].Name {
				return output[left].Role < output[right].Role
			}
			return output[left].Name < output[right].Name
		}
		return output[left].ImportPath < output[right].ImportPath
	})
	return output
}

func calledSelector(expression ast.Expr) *ast.SelectorExpr {
	for {
		switch typed := expression.(type) {
		case *ast.ParenExpr:
			expression = typed.X
		case *ast.IndexExpr:
			expression = typed.X
		case *ast.IndexListExpr:
			expression = typed.X
		case *ast.SelectorExpr:
			return typed
		default:
			return nil
		}
	}
}
