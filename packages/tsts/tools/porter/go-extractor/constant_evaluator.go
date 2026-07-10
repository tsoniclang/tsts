package main

import (
	"fmt"
	"go/ast"
	"go/constant"
	"go/token"
	"math"
)

func constantValueReport(value constant.Value, reason string) ConstantValueReport {
	if value == nil || value.Kind() == constant.Unknown {
		return ConstantValueReport{Supported: false, Reason: reason}
	}
	switch value.Kind() {
	case constant.Bool:
		return ConstantValueReport{Supported: true, Kind: "boolean", Exact: value.ExactString()}
	case constant.String:
		return ConstantValueReport{Supported: true, Kind: "string", Exact: constant.StringVal(value)}
	case constant.Int, constant.Float:
		return ConstantValueReport{Supported: true, Kind: "number", Exact: value.ExactString()}
	case constant.Complex:
		return ConstantValueReport{Supported: true, Kind: "complex", Exact: value.ExactString()}
	default:
		return ConstantValueReport{Supported: false, Reason: "unsupported constant kind"}
	}
}

func evaluateConstantExpression(expr ast.Expr, iotaValue constant.Value, environment map[string]constant.Value) (value constant.Value, reason string) {
	if expr == nil {
		return nil, "missing initializer"
	}
	defer func() {
		if recovered := recover(); recovered != nil {
			value = nil
			reason = fmt.Sprintf("constant evaluation failed: %v", recovered)
		}
	}()
	switch typed := expr.(type) {
	case *ast.BasicLit:
		value := constant.MakeFromLiteral(typed.Value, typed.Kind, 0)
		if value.Kind() == constant.Unknown {
			return nil, "invalid literal"
		}
		return value, ""
	case *ast.Ident:
		switch typed.Name {
		case "true":
			return constant.MakeBool(true), ""
		case "false":
			return constant.MakeBool(false), ""
		case "iota":
			return iotaValue, ""
		default:
			if value, ok := environment[typed.Name]; ok {
				return value, ""
			}
			return nil, "unresolved constant identifier " + typed.Name
		}
	case *ast.SelectorExpr:
		if value, ok := environment[printed(typed)]; ok {
			return value, ""
		}
		return nil, "unresolved constant selector " + printed(typed)
	case *ast.ParenExpr:
		return evaluateConstantExpression(typed.X, iotaValue, environment)
	case *ast.UnaryExpr:
		operand, reason := evaluateConstantExpression(typed.X, iotaValue, environment)
		if operand == nil {
			return nil, reason
		}
		precision := uint(0)
		var integerType *integerConstantType
		if typed.Op == token.XOR {
			integerType = explicitIntegerConversionType(typed.X)
			if integerType != nil {
				precision = integerType.bits
			}
		}
		result := constant.UnaryOp(typed.Op, operand, precision)
		if typed.Op == token.XOR && integerType != nil {
			return applyIntegerConstantType(result, integerType)
		}
		return result, ""
	case *ast.BinaryExpr:
		left, leftReason := evaluateConstantExpression(typed.X, iotaValue, environment)
		if left == nil {
			return nil, leftReason
		}
		right, rightReason := evaluateConstantExpression(typed.Y, iotaValue, environment)
		if right == nil {
			return nil, rightReason
		}
		if typed.Op == token.SHL || typed.Op == token.SHR {
			shift, ok := constant.Uint64Val(constant.ToInt(right))
			if !ok {
				return nil, "non-uint constant shift count"
			}
			return constant.Shift(left, typed.Op, uint(shift)), ""
		}
		if isComparisonOp(typed.Op) {
			return constant.MakeBool(constant.Compare(left, typed.Op, right)), ""
		}
		if typed.Op == token.LAND || typed.Op == token.LOR {
			if left.Kind() != constant.Bool || right.Kind() != constant.Bool {
				return nil, "non-boolean logical constant"
			}
			if typed.Op == token.LAND {
				return constant.MakeBool(constant.BoolVal(left) && constant.BoolVal(right)), ""
			}
			return constant.MakeBool(constant.BoolVal(left) || constant.BoolVal(right)), ""
		}
		return constant.BinaryOp(left, typed.Op, right), ""
	case *ast.CallExpr:
		name, ok := typed.Fun.(*ast.Ident)
		if !ok || len(typed.Args) != 1 {
			return nil, "unsupported constant call"
		}
		operand, reason := evaluateConstantExpression(typed.Args[0], iotaValue, environment)
		if operand == nil {
			return nil, reason
		}
		switch name.Name {
		case "int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16", "uint32", "uint64", "uintptr", "byte", "rune":
			return convertIntegerConstant(constant.ToInt(operand), primitiveIntegerConstantType(name.Name))
		case "float32":
			value, _ := constant.Float32Val(constant.ToFloat(operand))
			if math.IsInf(float64(value), 0) {
				return nil, "float32 constant conversion overflows"
			}
			return constant.MakeFloat64(float64(value)), ""
		case "float64":
			return constant.ToFloat(operand), ""
		case "complex64":
			return nil, "complex64 constant conversion requires component rounding and is not supported"
		case "complex128":
			return constant.ToComplex(operand), ""
		case "string":
			if operand.Kind() == constant.String {
				return operand, ""
			}
			integer, ok := constant.Int64Val(constant.ToInt(operand))
			if !ok {
				return nil, "string conversion operand is not an int64"
			}
			return constant.MakeString(string(rune(integer))), ""
		default:
			return nil, "unsupported constant conversion " + name.Name
		}
	default:
		return nil, "unsupported constant expression " + fmt.Sprintf("%T", expr)
	}
}

func explicitIntegerConversionType(expr ast.Expr) *integerConstantType {
	for {
		switch typed := expr.(type) {
		case *ast.ParenExpr:
			expr = typed.X
		case *ast.CallExpr:
			if len(typed.Args) != 1 {
				return nil
			}
			name, ok := typed.Fun.(*ast.Ident)
			if !ok {
				return nil
			}
			return primitiveIntegerConstantType(name.Name)
		default:
			return nil
		}
	}
}
