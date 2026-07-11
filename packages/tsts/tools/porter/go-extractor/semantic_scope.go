package main

import (
	"encoding/json"
	"io"
	"path/filepath"
	"sort"
	"strings"
)

func readSemanticFileManifest(reader io.Reader) map[string]bool {
	decoder := json.NewDecoder(reader)
	var paths []string
	if err := decoder.Decode(&paths); err != nil {
		fatalf("decode active semantic-file manifest: %v", err)
	}
	var trailing any
	if err := decoder.Decode(&trailing); err != io.EOF {
		if err == nil {
			fatalf("active semantic-file manifest contains trailing JSON")
		}
		fatalf("decode trailing active semantic-file manifest data: %v", err)
	}
	if !sort.StringsAreSorted(paths) {
		fatalf("active semantic-file manifest is not sorted")
	}
	files := map[string]bool{}
	for _, path := range paths {
		if path == "" || filepath.IsAbs(path) || strings.Contains(path, "\\") || filepath.ToSlash(filepath.Clean(path)) != path || path == "." || strings.HasPrefix(path, "../") || !strings.HasSuffix(path, ".go") {
			fatalf("active semantic-file manifest contains invalid path %q", path)
		}
		if files[path] {
			fatalf("active semantic-file manifest duplicates %q", path)
		}
		files[path] = true
	}
	return files
}
