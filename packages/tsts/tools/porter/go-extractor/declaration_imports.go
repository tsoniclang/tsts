package main

import (
	"go/ast"
	"go/token"
	"go/types"

	"golang.org/x/tools/go/packages"
)

func pruneDeclarationOnlyImports(checker *declarationPackageChecker, metadata *packages.Package, files []*ast.File) {
	info := newDeclarationTypeInfo()
	configuration := checker.declarationTypeConfig(metadata, true)
	if _, err := configuration.Check(metadata.PkgPath, checker.fileSet, files, info); err != nil {
		fatalf("resolve declaration-only Go imports for %s (%s) under %s: %v", metadata.PkgPath, metadata.ID, semanticProfileKey(checker.profile), err)
	}
	pruneDeclarationOnlyImportsFromInfo(files, info)
}

func pruneDeclarationOnlyImportsFromInfo(files []*ast.File, info *types.Info) {
	declarationIdentifiers := declarationSyntaxIdentifiers(files)
	usedPackageNames := map[*types.PkgName]bool{}
	usedPackages := map[*types.Package]bool{}
	for identifier := range declarationIdentifiers {
		object := info.Uses[identifier]
		if object == nil {
			continue
		}
		if packageName, ok := object.(*types.PkgName); ok {
			usedPackageNames[packageName] = true
			continue
		}
		if object.Pkg() != nil {
			usedPackages[object.Pkg()] = true
		}
	}
	for _, file := range files {
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
				packageName := declarationImportObject(info, imported)
				used := usedPackageNames[packageName]
				if packageName.Name() == "." {
					used = usedPackages[packageName.Imported()]
				}
				if packageName.Name() == "_" || !used {
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

func declarationSyntaxIdentifiers(files []*ast.File) map[*ast.Ident]bool {
	identifiers := map[*ast.Ident]bool{}
	for _, file := range files {
		for _, declaration := range file.Decls {
			if general, ok := declaration.(*ast.GenDecl); ok && general.Tok == token.IMPORT {
				continue
			}
			ast.Inspect(declaration, func(node ast.Node) bool {
				switch typed := node.(type) {
				case *ast.BlockStmt:
					return false
				case *ast.Ident:
					identifiers[typed] = true
				}
				return true
			})
		}
	}
	return identifiers
}

func declarationImportObject(info *types.Info, imported *ast.ImportSpec) *types.PkgName {
	var object types.Object
	if imported.Name == nil {
		object = info.Implicits[imported]
	} else {
		object = info.Defs[imported.Name]
	}
	packageName, ok := object.(*types.PkgName)
	if !ok || packageName == nil || packageName.Imported() == nil {
		fatalf("Go import %s has no exact go/types package object", imported.Path.Value)
	}
	return packageName
}
