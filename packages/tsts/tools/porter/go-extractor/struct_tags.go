package main

import (
	"fmt"
	"go/ast"
	"go/token"
	"strconv"
)

func fieldTags(field *ast.Field) (*string, []StructTagValueReport) {
	if field.Tag == nil {
		return nil, nil
	}
	decoded, err := strconv.Unquote(field.Tag.Value)
	if err != nil {
		fatalf("invalid Go struct tag %q: %v", field.Tag.Value, err)
	}
	values, err := parseStructTagValues(decoded)
	if err != nil {
		fatalf("invalid Go struct tag %q: %v", field.Tag.Value, err)
	}
	return &decoded, values
}

func parseStructTagValues(tag string) ([]StructTagValueReport, error) {
	remaining := tag
	values := []StructTagValueReport{}
	for remaining != "" {
		for len(remaining) > 0 && remaining[0] == ' ' {
			remaining = remaining[1:]
		}
		if remaining == "" {
			break
		}
		keyEnd := 0
		for keyEnd < len(remaining) && remaining[keyEnd] > ' ' && remaining[keyEnd] != ':' && remaining[keyEnd] != '"' && remaining[keyEnd] != 0x7f {
			keyEnd++
		}
		if keyEnd == 0 || keyEnd+1 >= len(remaining) || remaining[keyEnd] != ':' || remaining[keyEnd+1] != '"' {
			return nil, fmt.Errorf("malformed key/value pair at %q", remaining)
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
			return nil, fmt.Errorf("unterminated quoted value for key %q", key)
		}
		value, err := strconv.Unquote(quoted[:valueEnd+1])
		if err != nil {
			return nil, fmt.Errorf("invalid quoted value for key %q: %w", key, err)
		}
		values = append(values, StructTagValueReport{Key: key, Value: value})
		remaining = quoted[valueEnd+1:]
	}
	return values, nil
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

func structTagsOf(fileSet *token.FileSet, parsed *ast.File) []MemberReport {
	reports := []MemberReport{}
	ast.Walk(structTagVisitor{fileSet: fileSet, reports: &reports}, parsed)
	return reports
}

type structTagVisitor struct {
	fileSet *token.FileSet
	reports *[]MemberReport
	depth   int
}

func (visitor structTagVisitor) Visit(node ast.Node) ast.Visitor {
	if node == nil {
		return nil
	}
	if _, ok := node.(*ast.StructType); ok {
		visitor.depth++
		return visitor
	}
	field, ok := node.(*ast.Field)
	if !ok || field.Tag == nil {
		return visitor
	}
	structTag, tagValues := fieldTags(field)
	fieldType := printed(field.Type)
	fieldExpression := typeExpr(field.Type)
	startLine := visitor.fileSet.Position(field.Pos()).Line
	if len(field.Names) == 0 {
		*visitor.reports = append(*visitor.reports, MemberReport{Kind: "embeddedField", Name: fieldType, Exported: embeddedFieldExported(field.Type), Type: fieldType, TypeExpr: fieldExpression, StructTag: structTag, TagValues: tagValues, StartLine: startLine, StructDepth: visitor.depth})
		return visitor
	}
	for _, name := range field.Names {
		*visitor.reports = append(*visitor.reports, MemberReport{Kind: "field", Name: name.Name, Exported: ast.IsExported(name.Name), Type: fieldType, TypeExpr: fieldExpression, StructTag: structTag, TagValues: tagValues, StartLine: startLine, StructDepth: visitor.depth})
	}
	return visitor
}
