package main

import (
	"go/ast"
)

func typeExpr(expr ast.Expr) *TypeExprReport {
	if expr == nil {
		return nil
	}
	kind, supported := typeExprKind(expr)
	if !supported {
		fatalf("unsupported Go declaration type expression %T", expr)
	}
	report := &TypeExprReport{
		Kind: kind,
		Text: printed(expr),
	}
	switch typed := expr.(type) {
	case *ast.Ident:
		report.Name = typed.Name
	case *ast.SelectorExpr:
		report.Name = typed.Sel.Name
		report.Package = printed(typed.X)
	case *ast.StarExpr:
		report.Element = typeExpr(typed.X)
	case *ast.ArrayType:
		report.Element = typeExpr(typed.Elt)
		if typed.Len != nil {
			report.Length = printed(typed.Len)
		}
	case *ast.MapType:
		report.Key = typeExpr(typed.Key)
		report.Value = typeExpr(typed.Value)
	case *ast.FuncType:
		report.Parameters = paramsOf(typed.Params)
		report.Results = paramsOf(typed.Results)
	case *ast.InterfaceType:
		report.Members = interfaceMembers(typed)
	case *ast.StructType:
		report.Members = structMembers(typed)
	case *ast.Ellipsis:
		report.Element = typeExpr(typed.Elt)
	case *ast.IndexExpr:
		report.Element = typeExpr(typed.X)
		if typed.Index != nil {
			report.TypeArgs = append(report.TypeArgs, *typeExpr(typed.Index))
		}
	case *ast.IndexListExpr:
		report.Element = typeExpr(typed.X)
		for _, index := range typed.Indices {
			report.TypeArgs = append(report.TypeArgs, *typeExpr(index))
		}
	case *ast.ParenExpr:
		report.Element = typeExpr(typed.X)
	case *ast.ChanType:
		report.Element = typeExpr(typed.Value)
		report.Direction = chanDirection(typed.Dir)
	case *ast.UnaryExpr:
		report.Op = typed.Op.String()
		report.Element = typeExpr(typed.X)
	case *ast.BinaryExpr:
		report.Op = typed.Op.String()
		report.Left = typeExpr(typed.X)
		report.Right = typeExpr(typed.Y)
	}
	return report
}

func typeExprKind(expr ast.Expr) (string, bool) {
	switch typed := expr.(type) {
	case *ast.Ident:
		return "ident", true
	case *ast.SelectorExpr:
		return "selector", true
	case *ast.StarExpr:
		return "pointer", true
	case *ast.ArrayType:
		if typed.Len == nil {
			return "slice", true
		}
		return "array", true
	case *ast.MapType:
		return "map", true
	case *ast.FuncType:
		return "func", true
	case *ast.InterfaceType:
		return "interface", true
	case *ast.StructType:
		return "struct", true
	case *ast.Ellipsis:
		return "ellipsis", true
	case *ast.IndexExpr, *ast.IndexListExpr:
		return "instantiation", true
	case *ast.ParenExpr:
		return "paren", true
	case *ast.ChanType:
		return "channel", true
	case *ast.UnaryExpr:
		return "unary", true
	case *ast.BinaryExpr:
		return "binary", true
	default:
		return "", false
	}
}

func interfaceMembers(expr *ast.InterfaceType) []MemberReport {
	if expr.Methods == nil {
		return nil
	}
	members := []MemberReport{}
	for _, field := range expr.Methods.List {
		fieldText := printed(field.Type)
		fieldExpr := typeExpr(field.Type)
		if len(field.Names) == 0 {
			members = append(members, MemberReport{Kind: "embeddedInterface", Name: fieldText, Type: fieldText, TypeExpr: fieldExpr})
			continue
		}
		for _, name := range field.Names {
			members = append(members, MemberReport{Kind: "method", Name: name.Name, Type: fieldText, TypeExpr: fieldExpr})
		}
	}
	return members
}

func structMembers(expr *ast.StructType) []MemberReport {
	if expr.Fields == nil {
		return nil
	}
	members := []MemberReport{}
	for _, field := range expr.Fields.List {
		fieldText := printed(field.Type)
		fieldExpr := typeExpr(field.Type)
		structTag, tagValues, tagRemainder := fieldTags(field)
		if len(field.Names) == 0 {
			members = append(members, MemberReport{Kind: "embeddedField", Name: fieldText, Exported: embeddedFieldExported(field.Type), Type: fieldText, TypeExpr: fieldExpr, StructTag: structTag, TagValues: tagValues, TagRemainder: tagRemainder})
			continue
		}
		for _, name := range field.Names {
			members = append(members, MemberReport{Kind: "field", Name: name.Name, Exported: ast.IsExported(name.Name), Type: fieldText, TypeExpr: fieldExpr, StructTag: structTag, TagValues: tagValues, TagRemainder: tagRemainder})
		}
	}
	return members
}

func chanDirection(direction ast.ChanDir) string {
	switch direction {
	case ast.SEND:
		return "send"
	case ast.RECV:
		return "receive"
	default:
		return "bidirectional"
	}
}

func fieldNames(fields *ast.FieldList) []string {
	if fields == nil {
		return []string{}
	}
	names := []string{}
	for _, field := range fields.List {
		for _, name := range field.Names {
			names = append(names, name.Name)
		}
	}
	return names
}
