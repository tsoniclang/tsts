package main

import (
	"go/parser"
	"go/token"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
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

func loadPackageNames(root string, modulePath string) map[string]string {
	names := map[string]string{}
	imports := map[string]bool{}
	err := filepath.WalkDir(root, func(sourcePath string, entry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if entry.IsDir() {
			if shouldSkipDir(entry.Name(), sourcePath, root) {
				return filepath.SkipDir
			}
			return nil
		}
		if !strings.HasSuffix(entry.Name(), ".go") {
			return nil
		}
		fileSet := token.NewFileSet()
		parsed, err := parser.ParseFile(fileSet, sourcePath, nil, parser.ImportsOnly)
		if err != nil {
			return nil
		}
		rel := mustRel(root, sourcePath)
		importPath := importPathFor(modulePath, rel)
		packageName := parsed.Name.Name
		if !strings.HasSuffix(packageName, "_test") {
			if previous := names[importPath]; previous != "" && previous != packageName && previous != "main" && packageName != "main" {
				fatalf("package name drift for %s: %s vs %s", importPath, previous, packageName)
			}
			names[importPath] = packageName
		}
		for _, imported := range parsed.Imports {
			value, err := strconv.Unquote(imported.Path.Value)
			if err != nil {
				fatalf("invalid import path in %s: %v", rel, err)
			}
			if value != "C" {
				imports[value] = true
			}
		}
		return nil
	})
	if err != nil {
		fatalf("discover Go package names: %v", err)
	}

	loadGoListPackageNames(root, names, []string{"-deps", "-test", "./..."}, "", "")
	missing := make([]string, 0)
	for importPath := range imports {
		if names[importPath] == "" {
			missing = append(missing, importPath)
		}
	}
	sort.Strings(missing)
	for start := 0; start < len(missing); start += 64 {
		end := min(start+64, len(missing))
		loadGoListPackageNames(root, names, missing[start:end], "", "")
	}
	for _, target := range distTargets() {
		remaining := missing[:0]
		for _, importPath := range missing {
			if names[importPath] == "" {
				remaining = append(remaining, importPath)
			}
		}
		missing = remaining
		if len(missing) == 0 {
			break
		}
		goos, goarch, _ := strings.Cut(target, "/")
		for start := 0; start < len(missing); start += 64 {
			end := min(start+64, len(missing))
			loadGoListPackageNames(root, names, missing[start:end], goos, goarch)
		}
	}
	return names
}

func loadGoListPackageNames(root string, names map[string]string, patterns []string, goos string, goarch string) {
	arguments := []string{"list", "-e", "-f", "{{if .ImportPath}}{{.ImportPath}}\t{{.Name}}{{end}}"}
	arguments = append(arguments, patterns...)
	command := exec.Command("go", arguments...)
	command.Dir = root
	if goos != "" && goarch != "" {
		command.Env = append(os.Environ(), "GOOS="+goos, "GOARCH="+goarch, "CGO_ENABLED=0")
	}
	output, err := command.CombinedOutput()
	if err != nil {
		fatalf("resolve Go package names with %q: %v\n%s", strings.Join(patterns, " "), err, output)
	}
	for _, line := range strings.Split(strings.TrimSpace(string(output)), "\n") {
		importPath, packageName, ok := strings.Cut(line, "\t")
		if !ok || importPath == "" || packageName == "" || packageName == "<nil>" {
			continue
		}
		names[importPath] = packageName
	}
}
