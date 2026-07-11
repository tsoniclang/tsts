package main

import (
	"go/ast"
	"go/parser"
	"go/token"
	"path/filepath"
	"sort"
	"strconv"
	"strings"

	"golang.org/x/tools/go/packages"
)

func pruneDeclarationOnlyImports(checker *declarationPackageChecker, metadata *packages.Package, files []*ast.File) {
	for _, file := range files {
		used := declarationIdentifierNames(file)
		keptImports := []*ast.ImportSpec{}
		keptDeclarations := make([]ast.Decl, 0, len(file.Decls))
		for _, declaration := range file.Decls {
			general, isImport := declaration.(*ast.GenDecl)
			if !isImport || general.Tok != token.IMPORT {
				keptDeclarations = append(keptDeclarations, declaration)
				continue
			}
			keptSpecifications := []ast.Spec{}
			for _, specification := range general.Specs {
				imported, ok := specification.(*ast.ImportSpec)
				if !ok {
					fatalf("Go import declaration contains unsupported specification %T", specification)
				}
				name := declarationImportName(checker, metadata, imported)
				if name == "_" || name != "." && !used[name] {
					continue
				}
				keptSpecifications = append(keptSpecifications, imported)
				keptImports = append(keptImports, imported)
			}
			if len(keptSpecifications) > 0 {
				general.Specs = keptSpecifications
				keptDeclarations = append(keptDeclarations, general)
			}
		}
		file.Decls = keptDeclarations
		file.Imports = keptImports
	}
}

func declarationIdentifierNames(file *ast.File) map[string]bool {
	used := map[string]bool{}
	for _, declaration := range file.Decls {
		if general, ok := declaration.(*ast.GenDecl); ok && general.Tok == token.IMPORT {
			continue
		}
		ast.Inspect(declaration, func(node ast.Node) bool {
			switch typed := node.(type) {
			case *ast.BlockStmt:
				return false
			case *ast.Ident:
				used[typed.Name] = true
			}
			return true
		})
	}
	return used
}

func declarationImportName(checker *declarationPackageChecker, metadata *packages.Package, imported *ast.ImportSpec) string {
	if imported.Name != nil {
		return imported.Name.Name
	}
	path, err := strconv.Unquote(imported.Path.Value)
	if err != nil {
		fatalf("invalid Go import path %s: %v", imported.Path.Value, err)
	}
	if dependency := metadata.Imports[path]; dependency != nil && dependency.Name != "" {
		return dependency.Name
	}
	if packagePathWithinModule(path, checker.modulePath) {
		return exactLocalImportPackageName(checker.root, checker.modulePath, checker.profile, path)
	}
	return checker.exactExternalImportPackageName(path)
}

func (checker *declarationPackageChecker) exactExternalImportPackageName(importPath string) string {
	if name := checker.importNames[importPath]; name != "" {
		return name
	}
	config := &packages.Config{
		Mode: packages.NeedName | packages.NeedModule,
		Dir:  checker.root, Env: semanticEnvironment(checker.profile), BuildFlags: append(semanticBuildFlags(checker.profile), "-e"),
	}
	loaded, err := packages.Load(config, importPath)
	if err != nil {
		fatalf("load exact package name for external Go import %s under %s: %v", importPath, semanticProfileKey(checker.profile), err)
	}
	names := map[string]bool{}
	for _, candidate := range loaded {
		if candidate != nil && candidate.PkgPath == importPath && candidate.Name != "" {
			names[candidate.Name] = true
		}
	}
	if len(names) != 1 {
		fatalf("external Go import %s has %d exact package names under %s: %s", importPath, len(names), semanticProfileKey(checker.profile), strings.Join(sortedBoolKeys(names), ","))
	}
	name := sortedBoolKeys(names)[0]
	checker.importNames[importPath] = name
	return name
}

func exactLocalImportPackageName(root string, modulePath string, profile semanticBuildProfile, importPath string) string {
	relative := strings.TrimPrefix(importPath, modulePath)
	if relative == importPath || relative == "" || !strings.HasPrefix(relative, "/") {
		fatalf("local Go import %s is outside module %s", importPath, modulePath)
	}
	directory := filepath.Join(root, filepath.FromSlash(strings.TrimPrefix(relative, "/")))
	entries, err := filepath.Glob(filepath.Join(directory, "*.go"))
	if err != nil {
		fatalf("enumerate local Go import %s: %v", importPath, err)
	}
	sort.Strings(entries)
	names := map[string]bool{}
	for _, filename := range entries {
		if strings.HasSuffix(filename, "_test.go") {
			continue
		}
		relativePath, ok := relativeSemanticPath(root, filename)
		if !ok || !profileMatchesFile(root, profile, relativePath) {
			continue
		}
		parsed, err := parser.ParseFile(token.NewFileSet(), filename, nil, parser.PackageClauseOnly)
		if err != nil {
			fatalf("parse package clause for local Go import %s: %v", importPath, err)
		}
		names[parsed.Name.Name] = true
	}
	if len(names) != 1 {
		fatalf("local Go import %s has %d exact package names under %s: %s", importPath, len(names), semanticProfileKey(profile), strings.Join(sortedBoolKeys(names), ","))
	}
	return sortedBoolKeys(names)[0]
}
