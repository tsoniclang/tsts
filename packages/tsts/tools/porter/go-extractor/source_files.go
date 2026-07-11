package main

import (
	"os"
	"path/filepath"
)

func shouldSkipDir(name string, path string, root string) bool {
	if name == ".git" || name == "node_modules" || name == "built" || name == "coverage" {
		return true
	}
	if path != root {
		if _, err := os.Lstat(filepath.Join(path, ".git")); err == nil {
			return true
		}
	}
	return false
}
