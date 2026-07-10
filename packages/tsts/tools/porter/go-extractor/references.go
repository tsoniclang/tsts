package main

import (
	"go/ast"
	"sort"
	"strconv"
)

type externalSelectorRole struct {
	role  string
	arity int
}

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
		return []ExternalRefReport{}
	}

	selectorRoles := map[*ast.SelectorExpr]externalSelectorRole{}
	ast.Inspect(node, func(current ast.Node) bool {
		if selector, ok := current.(*ast.SelectorExpr); ok {
			selectorRoles[selector] = externalSelectorRole{role: "value"}
		}
		return true
	})
	ast.Inspect(node, func(current ast.Node) bool {
		switch typed := current.(type) {
		case *ast.Field:
			markExternalTypeExpression(typed.Type, selectorRoles)
		case *ast.TypeSpec:
			markExternalTypeExpression(typed.Type, selectorRoles)
		case *ast.ValueSpec:
			markExternalTypeExpression(typed.Type, selectorRoles)
		case *ast.CompositeLit:
			markExternalTypeExpression(typed.Type, selectorRoles)
		case *ast.TypeAssertExpr:
			markExternalTypeExpression(typed.Type, selectorRoles)
		case *ast.CallExpr:
			markExternalCallTypeArguments(typed.Fun, selectorRoles)
		}
		return true
	})
	ast.Inspect(node, func(current ast.Node) bool {
		call, ok := current.(*ast.CallExpr)
		if !ok {
			return true
		}
		if selector := calledSelector(call.Fun); selector != nil {
			selectorRoles[selector] = externalSelectorRole{role: "call"}
		}
		return true
	})

	refs := map[string]*ExternalRefReport{}
	record := func(packageName string, name string, role string, arity int) {
		importPath, ok := aliases[packageName]
		if !ok {
			return
		}
		key := importPath + "." + name + ":" + role + ":" + strconv.Itoa(arity)
		ref := refs[key]
		if ref == nil {
			ref = &ExternalRefReport{ImportPath: importPath, Package: packageName, Name: name, Role: role, Arity: arity}
			refs[key] = ref
		}
		ref.Count++
	}
	for selector, classified := range selectorRoles {
		if ident, ok := selector.X.(*ast.Ident); ok && ident.Obj == nil {
			record(ident.Name, selector.Sel.Name, classified.role, classified.arity)
		}
	}

	output := make([]ExternalRefReport, 0, len(refs))
	for _, ref := range refs {
		output = append(output, *ref)
	}
	sort.Slice(output, func(left, right int) bool {
		if output[left].ImportPath == output[right].ImportPath {
			if output[left].Name == output[right].Name {
				if output[left].Role == output[right].Role {
					return output[left].Arity < output[right].Arity
				}
				return output[left].Role < output[right].Role
			}
			return output[left].Name < output[right].Name
		}
		return output[left].ImportPath < output[right].ImportPath
	})
	return output
}

func markExternalCallTypeArguments(expression ast.Expr, roles map[*ast.SelectorExpr]externalSelectorRole) {
	switch typed := expression.(type) {
	case *ast.ParenExpr:
		markExternalCallTypeArguments(typed.X, roles)
	case *ast.IndexExpr:
		markExternalTypeExpression(typed.Index, roles)
		markExternalCallTypeArguments(typed.X, roles)
	case *ast.IndexListExpr:
		for _, index := range typed.Indices {
			markExternalTypeExpression(index, roles)
		}
		markExternalCallTypeArguments(typed.X, roles)
	}
}

func markExternalTypeExpression(expression ast.Expr, roles map[*ast.SelectorExpr]externalSelectorRole) {
	if expression == nil {
		return
	}
	switch typed := expression.(type) {
	case *ast.Ident:
		return
	case *ast.SelectorExpr:
		roles[typed] = externalSelectorRole{role: "type"}
	case *ast.ParenExpr:
		markExternalTypeExpression(typed.X, roles)
	case *ast.StarExpr:
		markExternalTypeExpression(typed.X, roles)
	case *ast.ArrayType:
		markExternalTypeExpression(typed.Elt, roles)
	case *ast.MapType:
		markExternalTypeExpression(typed.Key, roles)
		markExternalTypeExpression(typed.Value, roles)
	case *ast.ChanType:
		markExternalTypeExpression(typed.Value, roles)
	case *ast.Ellipsis:
		markExternalTypeExpression(typed.Elt, roles)
	case *ast.FuncType:
		markExternalFieldListTypes(typed.TypeParams, roles)
		markExternalFieldListTypes(typed.Params, roles)
		markExternalFieldListTypes(typed.Results, roles)
	case *ast.InterfaceType:
		markExternalFieldListTypes(typed.Methods, roles)
	case *ast.StructType:
		markExternalFieldListTypes(typed.Fields, roles)
	case *ast.IndexExpr:
		markExternalInstantiatedType(typed.X, []ast.Expr{typed.Index}, roles)
	case *ast.IndexListExpr:
		markExternalInstantiatedType(typed.X, typed.Indices, roles)
	case *ast.UnaryExpr:
		markExternalTypeExpression(typed.X, roles)
	case *ast.BinaryExpr:
		markExternalTypeExpression(typed.X, roles)
		markExternalTypeExpression(typed.Y, roles)
	}
}

func markExternalInstantiatedType(base ast.Expr, arguments []ast.Expr, roles map[*ast.SelectorExpr]externalSelectorRole) {
	if selector, ok := base.(*ast.SelectorExpr); ok {
		roles[selector] = externalSelectorRole{role: "type", arity: len(arguments)}
	} else {
		markExternalTypeExpression(base, roles)
	}
	for _, argument := range arguments {
		markExternalTypeExpression(argument, roles)
	}
}

func markExternalFieldListTypes(fields *ast.FieldList, roles map[*ast.SelectorExpr]externalSelectorRole) {
	if fields == nil {
		return
	}
	for _, field := range fields.List {
		markExternalTypeExpression(field.Type, roles)
	}
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
