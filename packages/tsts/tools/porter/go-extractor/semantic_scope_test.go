package main

import (
	"strings"
	"testing"
)

func TestSemanticFileManifestRequiresExactSortedRelativeGoPaths(t *testing.T) {
	files := readSemanticFileManifest(strings.NewReader(`["a.go","internal/b.go"]`))
	if !files["a.go"] || !files["internal/b.go"] || len(files) != 2 {
		t.Fatalf("semantic file manifest = %#v", files)
	}
}
