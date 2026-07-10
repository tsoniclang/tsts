package main

import (
	"fmt"
	"go/ast"
	"go/token"
	"strings"
)

func inferredValueType(expr ast.Expr) *TypeExprReport {
	if expr == nil {
		return nil
	}
	switch typed := expr.(type) {
	case *ast.BasicLit:
		switch typed.Kind {
		case token.STRING:
			return identTypeExpr("string")
		case token.CHAR:
			return identTypeExpr("rune")
		case token.INT:
			return identTypeExpr("int")
		case token.FLOAT:
			return identTypeExpr("float64")
		case token.IMAG:
			return identTypeExpr("complex128")
		default:
			return nil
		}
	case *ast.Ident:
		switch typed.Name {
		case "true", "false":
			return identTypeExpr("bool")
		case "iota":
			return identTypeExpr("int")
		default:
			return nil
		}
	case *ast.ParenExpr:
		return inferredValueType(typed.X)
	case *ast.UnaryExpr:
		if typed.Op == token.AND {
			if composite, ok := typed.X.(*ast.CompositeLit); ok && composite.Type != nil {
				element := typeExpr(composite.Type)
				if element != nil {
					return &TypeExprReport{Kind: "pointer", Text: "*" + element.Text, Element: element}
				}
			}
			return nil
		}
		return inferredValueType(typed.X)
	case *ast.BinaryExpr:
		if isComparisonOp(typed.Op) {
			return identTypeExpr("bool")
		}
		left := inferredValueType(typed.X)
		right := inferredValueType(typed.Y)
		if left != nil && right != nil {
			if left.Name == "string" || right.Name == "string" {
				if typed.Op == token.ADD {
					return identTypeExpr("string")
				}
				return nil
			}
			if isNumericTypeName(left.Name) && isNumericTypeName(right.Name) {
				return widerNumericType(left.Name, right.Name)
			}
		}
		if typed.Op == token.SHL || typed.Op == token.SHR || typed.Op == token.AND || typed.Op == token.OR || typed.Op == token.XOR || typed.Op == token.AND_NOT {
			return identTypeExpr("int")
		}
		return nil
	case *ast.CompositeLit:
		return typeExpr(typed.Type)
	case *ast.FuncLit:
		return typeExpr(typed.Type)
	case *ast.CallExpr:
		if ident, ok := typed.Fun.(*ast.Ident); ok {
			switch ident.Name {
			case "make":
				if len(typed.Args) > 0 {
					return typeExpr(typed.Args[0])
				}
			case "new":
				if len(typed.Args) > 0 {
					element := typeExpr(typed.Args[0])
					if !isUsableTypeExpr(element) {
						element = inferredValueType(typed.Args[0])
					}
					if element != nil {
						return &TypeExprReport{Kind: "pointer", Text: "*" + element.Text, Element: element}
					}
				}
			case "complex":
				return identTypeExpr("complex128")
			}
			if isPrimitiveTypeName(ident.Name) {
				return identTypeExpr(ident.Name)
			}
		}
		if selector, ok := typed.Fun.(*ast.SelectorExpr); ok {
			if printed(selector.X) == "errors" && selector.Sel.Name == "New" {
				return identTypeExpr("error")
			}
		}
		return nil
	default:
		return nil
	}
}

func identTypeExpr(name string) *TypeExprReport {
	return &TypeExprReport{Kind: "ident", Text: name, Name: name}
}

func isUsableTypeExpr(expr *TypeExprReport) bool {
	if expr == nil {
		return false
	}
	if strings.HasPrefix(expr.Kind, "*ast.") {
		return false
	}
	if expr.Kind == "ident" && (expr.Name == "true" || expr.Name == "false" || expr.Name == "nil") {
		return false
	}
	return true
}

func isComparisonOp(op token.Token) bool {
	return op == token.EQL || op == token.NEQ || op == token.LSS || op == token.LEQ || op == token.GTR || op == token.GEQ
}

func isPrimitiveTypeName(name string) bool {
	switch name {
	case "any", "bool", "byte", "complex64", "complex128", "error", "float32", "float64", "int", "int8", "int16", "int32", "int64", "rune", "string", "uint", "uint8", "uint16", "uint32", "uint64", "uintptr":
		return true
	default:
		return false
	}
}

func isNumericTypeName(name string) bool {
	switch name {
	case "byte", "complex64", "complex128", "float32", "float64", "int", "int8", "int16", "int32", "int64", "rune", "uint", "uint8", "uint16", "uint32", "uint64", "uintptr":
		return true
	default:
		return false
	}
}

func widerNumericType(left string, right string) *TypeExprReport {
	ranks := map[string]int{
		"byte":       1,
		"int8":       1,
		"uint8":      1,
		"int16":      2,
		"uint16":     2,
		"int32":      3,
		"rune":       3,
		"uint32":     3,
		"int":        4,
		"uint":       4,
		"uintptr":    4,
		"int64":      5,
		"uint64":     5,
		"float32":    6,
		"float64":    7,
		"complex64":  8,
		"complex128": 9,
	}
	if ranks[right] > ranks[left] {
		return identTypeExpr(right)
	}
	return identTypeExpr(left)
}

func typeExpr(expr ast.Expr) *TypeExprReport {
	if expr == nil {
		return nil
	}
	report := &TypeExprReport{
		Kind: typeExprKind(expr),
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

func typeExprKind(expr ast.Expr) string {
	switch typed := expr.(type) {
	case *ast.Ident:
		return "ident"
	case *ast.SelectorExpr:
		return "selector"
	case *ast.StarExpr:
		return "pointer"
	case *ast.ArrayType:
		if typed.Len == nil {
			return "slice"
		}
		return "array"
	case *ast.MapType:
		return "map"
	case *ast.FuncType:
		return "func"
	case *ast.InterfaceType:
		return "interface"
	case *ast.StructType:
		return "struct"
	case *ast.Ellipsis:
		return "ellipsis"
	case *ast.IndexExpr, *ast.IndexListExpr:
		return "instantiation"
	case *ast.ParenExpr:
		return "paren"
	case *ast.ChanType:
		return "channel"
	case *ast.UnaryExpr:
		return "unary"
	case *ast.BinaryExpr:
		return "binary"
	default:
		return fmt.Sprintf("%T", expr)
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
		if len(field.Names) == 0 {
			members = append(members, MemberReport{Kind: "embeddedField", Name: fieldText, Type: fieldText, TypeExpr: fieldExpr})
			continue
		}
		for _, name := range field.Names {
			members = append(members, MemberReport{Kind: "field", Name: name.Name, Type: fieldText, TypeExpr: fieldExpr})
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
		return nil
	}
	var names []string
	for _, field := range fields.List {
		for _, name := range field.Names {
			names = append(names, name.Name)
		}
	}
	return names
}
