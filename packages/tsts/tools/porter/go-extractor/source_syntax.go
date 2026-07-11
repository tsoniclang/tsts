package main

import (
	"bytes"
	"go/printer"
	"go/token"
)

func printed(node any) string {
	if node == nil {
		return ""
	}
	var buffer bytes.Buffer
	if err := printer.Fprint(&buffer, token.NewFileSet(), node); err != nil {
		fatalf("print Go syntax: %v", err)
	}
	return buffer.String()
}

func countLines(source []byte) int {
	if len(source) == 0 {
		return 0
	}
	count := bytes.Count(source, []byte{'\n'})
	if !bytes.HasSuffix(source, []byte{'\n'}) {
		count++
	}
	return count
}
