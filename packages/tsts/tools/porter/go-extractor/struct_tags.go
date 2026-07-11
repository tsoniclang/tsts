package main

import (
	"go/ast"
	"strconv"
)

func fieldTags(field *ast.Field) (*string, []StructTagValueReport, *string) {
	if field.Tag == nil {
		return nil, nil, nil
	}
	decoded, err := strconv.Unquote(field.Tag.Value)
	if err != nil {
		fatalf("invalid Go struct tag %q: %v", field.Tag.Value, err)
	}
	values, remainder := parseStructTagValues(decoded)
	return &decoded, values, &remainder
}

func parseStructTagValues(tag string) ([]StructTagValueReport, string) {
	remaining := tag
	values := []StructTagValueReport{}
	for remaining != "" {
		unparsed := remaining
		for len(remaining) > 0 && remaining[0] == ' ' {
			remaining = remaining[1:]
		}
		if remaining == "" {
			return values, unparsed
		}
		keyEnd := 0
		for keyEnd < len(remaining) && remaining[keyEnd] > ' ' && remaining[keyEnd] != ':' && remaining[keyEnd] != '"' && remaining[keyEnd] != 0x7f {
			keyEnd++
		}
		if keyEnd == 0 || keyEnd+1 >= len(remaining) || remaining[keyEnd] != ':' || remaining[keyEnd+1] != '"' {
			return values, unparsed
		}
		key := remaining[:keyEnd]
		quoted := remaining[keyEnd+1:]
		valueEnd := 1
		for valueEnd < len(quoted) {
			if quoted[valueEnd] == '\\' {
				valueEnd++
			} else if quoted[valueEnd] == '"' {
				break
			}
			valueEnd++
		}
		if valueEnd >= len(quoted) || quoted[valueEnd] != '"' {
			return values, unparsed
		}
		value, err := strconv.Unquote(quoted[:valueEnd+1])
		if err != nil {
			return values, unparsed
		}
		values = append(values, StructTagValueReport{Key: key, Value: value})
		remaining = quoted[valueEnd+1:]
	}
	return values, ""
}

func embeddedFieldExported(expression ast.Expr) bool {
	switch typed := expression.(type) {
	case *ast.Ident:
		return ast.IsExported(typed.Name)
	case *ast.SelectorExpr:
		return ast.IsExported(typed.Sel.Name)
	case *ast.StarExpr:
		return embeddedFieldExported(typed.X)
	case *ast.IndexExpr:
		return embeddedFieldExported(typed.X)
	case *ast.IndexListExpr:
		return embeddedFieldExported(typed.X)
	default:
		return false
	}
}
