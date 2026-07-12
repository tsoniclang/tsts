package main

import (
	"sort"

	"golang.org/x/tools/go/packages"
)

type semanticExternalPackageExportLoad struct {
	exportFiles       map[string]string
	availablePackages map[string]bool
	graph             []*packages.Package
}

func loadExternalExportFiles(root string, modulePath string, profile semanticBuildProfile, graph []*packages.Package) map[string]string {
	patterns := map[string]bool{}
	for _, metadata := range graph {
		if metadata == nil || !packageBelongsToModule(metadata, modulePath) {
			continue
		}
		for importPath, imported := range metadata.Imports {
			if importPath != "unsafe" && !packageBelongsToModule(imported, modulePath) {
				patterns[importPath] = true
			}
		}
	}
	if len(patterns) == 0 {
		return map[string]string{}
	}
	verifySemanticGoResolution()
	buildFlags := semanticBuildFlags(profile)
	config := &packages.Config{
		Mode: packages.NeedName | packages.NeedImports | packages.NeedDeps | packages.NeedExportFile | packages.NeedModule,
		Dir:  root, Env: semanticEnvironment(profile), BuildFlags: buildFlags,
	}
	loaded, err := packages.Load(config, sortedBoolKeys(patterns)...)
	if err != nil {
		fatalf("load external Go export metadata under %s: %v", semanticProfileKey(profile), err)
	}
	exports := map[string]string{}
	for _, metadata := range semanticPackageGraph(loaded) {
		for _, packageError := range metadata.Errors {
			fatalf("external Go package %s has package error kind %d: %s", metadata.PkgPath, packageError.Kind, packageError.Msg)
		}
		if metadata.PkgPath == "unsafe" {
			continue
		}
		if metadata.ExportFile == "" {
			fatalf("external Go package %s has no exact compiled export data under %s", metadata.PkgPath, semanticProfileKey(profile))
		}
		mergeSemanticExportFile(exports, metadata.PkgPath, metadata.ExportFile)
	}
	return exports
}

func loadSemanticExternalPackageExports(root string, modulePath string, profile semanticBuildProfile, packagePaths []string) semanticExternalPackageExportLoad {
	result := semanticExternalPackageExportLoad{
		exportFiles: map[string]string{}, availablePackages: map[string]bool{}, graph: []*packages.Package{},
	}
	patterns := []string{}
	requested := map[string]bool{}
	for index, packagePath := range packagePaths {
		if index > 0 && packagePaths[index-1] >= packagePath {
			fatalf("external Go package surface paths are not strictly sorted at %s", packagePath)
		}
		requested[packagePath] = true
		if packagePath == "unsafe" {
			result.availablePackages[packagePath] = true
			continue
		}
		patterns = append(patterns, packagePath)
	}
	if len(patterns) == 0 {
		return result
	}
	verifySemanticGoResolution()
	config := &packages.Config{
		Mode: packages.NeedName | packages.NeedImports | packages.NeedDeps | packages.NeedExportFile | packages.NeedModule,
		Dir:  root, Env: semanticEnvironment(profile), BuildFlags: semanticBuildFlags(profile),
	}
	loaded, err := packages.Load(config, patterns...)
	if err != nil {
		fatalf("load selected external Go package export metadata under %s: %v", semanticProfileKey(profile), err)
	}
	roots := map[string]*packages.Package{}
	for _, metadata := range loaded {
		if metadata == nil || !requested[metadata.PkgPath] {
			continue
		}
		if previous := roots[metadata.PkgPath]; previous != nil && previous != metadata {
			fatalf("selected external Go package %s resolved to multiple package roots", metadata.PkgPath)
		}
		roots[metadata.PkgPath] = metadata
	}
	graphByID := map[string]*packages.Package{}
	for _, packagePath := range packagePaths {
		if packagePath == "unsafe" {
			continue
		}
		metadata := roots[packagePath]
		if metadata == nil {
			fatalf("selected external Go package %s did not resolve to one exact package root under %s", packagePath, semanticProfileKey(profile))
		}
		requireSemanticExternalExportGraph(metadata, profile, map[*packages.Package]bool{}, map[*packages.Package]bool{})
		if metadata.PkgPath != packagePath || packageBelongsToModule(metadata, modulePath) {
			fatalf("selected external Go package %s resolved inside local module %s", packagePath, modulePath)
		}
		result.availablePackages[packagePath] = true
		for _, dependency := range semanticPackageGraph([]*packages.Package{metadata}) {
			if previous := graphByID[dependency.ID]; previous != nil && previous != dependency {
				if previous.PkgPath != dependency.PkgPath || previous.ExportFile != dependency.ExportFile {
					fatalf("selected external Go package graph identity %s has conflicting metadata", dependency.ID)
				}
				continue
			}
			graphByID[dependency.ID] = dependency
			if dependency.PkgPath != "unsafe" {
				mergeSemanticExportFile(result.exportFiles, dependency.PkgPath, dependency.ExportFile)
			}
		}
	}
	for _, metadata := range graphByID {
		result.graph = append(result.graph, metadata)
	}
	sort.Slice(result.graph, func(left, right int) bool { return result.graph[left].ID < result.graph[right].ID })
	return result
}

func requireSemanticExternalExportGraph(metadata *packages.Package, profile semanticBuildProfile, visiting map[*packages.Package]bool, complete map[*packages.Package]bool) {
	if metadata == nil {
		fatalf("selected external Go export graph contains missing package metadata under %s", semanticProfileKey(profile))
	}
	if complete[metadata] {
		return
	}
	if visiting[metadata] {
		fatalf("selected external Go export graph contains an import cycle at %s", metadata.PkgPath)
	}
	if metadata.PkgPath == "" {
		fatalf("selected external Go export graph contains package metadata without an import path under %s", semanticProfileKey(profile))
	}
	for _, packageError := range metadata.Errors {
		fatalf("selected external Go package %s has package error kind %d under %s: %s", metadata.PkgPath, packageError.Kind, semanticProfileKey(profile), packageError.Msg)
	}
	if metadata.PkgPath != "unsafe" && metadata.ExportFile == "" {
		fatalf("selected external Go package %s has no exact compiled export data under %s", metadata.PkgPath, semanticProfileKey(profile))
	}
	visiting[metadata] = true
	importPaths := make([]string, 0, len(metadata.Imports))
	for importPath := range metadata.Imports {
		importPaths = append(importPaths, importPath)
	}
	sort.Strings(importPaths)
	for _, importPath := range importPaths {
		dependency := metadata.Imports[importPath]
		if dependency == nil || dependency.PkgPath != importPath {
			fatalf("selected external Go package %s import %s has inconsistent package metadata under %s", metadata.PkgPath, importPath, semanticProfileKey(profile))
		}
		requireSemanticExternalExportGraph(dependency, profile, visiting, complete)
	}
	delete(visiting, metadata)
	complete[metadata] = true
}

func mergeSemanticExportFiles(target map[string]string, source map[string]string) {
	for packagePath, exportFile := range source {
		mergeSemanticExportFile(target, packagePath, exportFile)
	}
}

func mergeSemanticExportFile(target map[string]string, packagePath string, exportFile string) {
	if packagePath == "" || exportFile == "" {
		fatalf("cannot register empty external Go export metadata")
	}
	if previous := target[packagePath]; previous != "" && previous != exportFile {
		fatalf("external Go package %s has conflicting export files %s and %s", packagePath, previous, exportFile)
	}
	target[packagePath] = exportFile
}
