package main

import (
	"bytes"
	"fmt"
	"go/ast"
	"go/printer"
	"go/token"
	"sort"
	"strings"
)

func importsOf(parsed *ast.File) []ImportReport {
	imports := []ImportReport{}
	for _, imp := range parsed.Imports {
		report := ImportReport{Path: strings.Trim(imp.Path.Value, `"`)}
		if imp.Name != nil {
			report.Name = imp.Name.Name
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
			alias = pathBase(item.Path)
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
		if selector, ok := call.Fun.(*ast.SelectorExpr); ok {
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

func pathBase(importPath string) string {
	index := strings.LastIndex(importPath, "/")
	if index < 0 {
		return importPath
	}
	return importPath[index+1:]
}

func nodeCounts(node ast.Node) map[string]int {
	counts := make(map[string]int)
	ast.Inspect(node, func(current ast.Node) bool {
		if current == nil {
			return true
		}
		name := fmt.Sprintf("%T", current)
		name = strings.TrimPrefix(name, "*ast.")
		counts[name]++
		return true
	})
	return counts
}

func featureCounts(node ast.Node) map[string]int {
	counts := make(map[string]int)
	ast.Inspect(node, func(current ast.Node) bool {
		switch current.(type) {
		case *ast.GoStmt:
			counts["goStmt"]++
		case *ast.DeferStmt:
			counts["deferStmt"]++
		case *ast.SelectStmt:
			counts["selectStmt"]++
		case *ast.TypeSwitchStmt:
			counts["typeSwitchStmt"]++
		case *ast.SwitchStmt:
			counts["switchStmt"]++
		case *ast.RangeStmt:
			counts["rangeStmt"]++
		case *ast.ForStmt:
			counts["forStmt"]++
		case *ast.SendStmt:
			counts["sendStmt"]++
		case *ast.ChanType:
			counts["chanType"]++
		case *ast.FuncLit:
			counts["funcLit"]++
		}
		if call, ok := current.(*ast.CallExpr); ok {
			if ident, ok := call.Fun.(*ast.Ident); ok {
				if ident.Name == "panic" {
					counts["panicCall"]++
				}
				if ident.Name == "recover" {
					counts["recoverCall"]++
				}
			}
		}
		return true
	})
	return counts
}

func printed(node any) string {
	var buffer bytes.Buffer
	if err := printer.Fprint(&buffer, token.NewFileSet(), node); err != nil {
		return fmt.Sprintf("<printer-error:%v>", err)
	}
	return strings.TrimSpace(buffer.String())
}

func snippetOf(fileSet *token.FileSet, source []byte, start token.Pos, end token.Pos) string {
	file := fileSet.File(start)
	if file == nil {
		return ""
	}
	startOffset := file.Offset(start)
	endOffset := file.Offset(end)
	if startOffset < 0 || endOffset > len(source) || startOffset > endOffset {
		return ""
	}
	return strings.TrimSpace(string(source[startOffset:endOffset]))
}

func countLines(source []byte) int {
	if len(source) == 0 {
		return 0
	}
	count := bytes.Count(source, []byte{'\n'})
	if source[len(source)-1] != '\n' {
		count++
	}
	return count
}
