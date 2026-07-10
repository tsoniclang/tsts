package main

import (
	"go/ast"
	"go/token"
	"strconv"
)

func returnFactsOf(fileSet *token.FileSet, body *ast.BlockStmt) []ReturnFactReport {
	facts := []ReturnFactReport{}
	if body == nil {
		return facts
	}
	var visit func(ast.Node) bool
	visit = func(node ast.Node) bool {
		if _, nested := node.(*ast.FuncLit); nested {
			return false
		}
		if statement, ok := node.(*ast.ReturnStmt); ok {
			results := make([]ReturnValueFactReport, 0, len(statement.Results))
			for _, result := range statement.Results {
				results = append(results, ReturnValueFactReport{Kind: goReturnValueKind(result)})
			}
			facts = append(facts, ReturnFactReport{Line: fileSet.Position(statement.Pos()).Line, Results: results})
		}
		return true
	}
	ast.Inspect(body, visit)
	return facts
}

func goReturnValueKind(expression ast.Expr) string {
	expression = unparenthesizedGoExpression(expression)
	if identifier, ok := expression.(*ast.Ident); ok && identifier.Name == "nil" {
		return "nil"
	}
	if literal, ok := expression.(*ast.CompositeLit); ok && len(literal.Elts) == 0 {
		switch typed := unparenthesizedGoExpression(literal.Type).(type) {
		case *ast.ArrayType:
			if typed.Len == nil {
				return "empty-slice"
			}
			return "empty-array"
		case *ast.MapType:
			return "empty-map"
		case *ast.StructType:
			return "empty-struct"
		}
	}
	if call, ok := expression.(*ast.CallExpr); ok && isGoBuiltin(call.Fun, "make") && len(call.Args) > 0 {
		switch typed := unparenthesizedGoExpression(call.Args[0]).(type) {
		case *ast.ArrayType:
			if typed.Len == nil && len(call.Args) > 1 && isGoIntegerZero(call.Args[1]) {
				return "make-empty-slice"
			}
		case *ast.MapType:
			return "make-empty-map"
		}
	}
	return "other"
}

func unparenthesizedGoExpression(expression ast.Expr) ast.Expr {
	for {
		parenthesized, ok := expression.(*ast.ParenExpr)
		if !ok {
			return expression
		}
		expression = parenthesized.X
	}
}

func isGoBuiltin(expression ast.Expr, name string) bool {
	identifier, ok := unparenthesizedGoExpression(expression).(*ast.Ident)
	return ok && identifier.Name == name && identifier.Obj == nil
}

func isGoIntegerZero(expression ast.Expr) bool {
	literal, ok := unparenthesizedGoExpression(expression).(*ast.BasicLit)
	if !ok || literal.Kind != token.INT {
		return false
	}
	value, err := strconv.ParseInt(literal.Value, 0, 64)
	return err == nil && value == 0
}
