package main

import (
	"bytes"
	"fmt"
	"go/ast"
	"go/printer"
	"go/token"
	"strings"
)

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
		panic(fmt.Sprintf("Go printer failed for %T: %v", node, err))
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
