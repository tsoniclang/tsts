package main

import (
	"encoding/json"
	"sort"
	"strings"

	"golang.org/x/tools/go/packages"
)

func packagePathWithinModule(packagePath string, modulePath string) bool {
	return packagePath == modulePath || strings.HasPrefix(packagePath, modulePath+"/")
}

func packageBelongsToModule(pkg *packages.Package, modulePath string) bool {
	if pkg == nil || pkg.Module == nil {
		return false
	}
	return pkg.Module.Path == modulePath
}

func semanticPackageGraph(roots []*packages.Package) []*packages.Package {
	byID := map[string]*packages.Package{}
	var visit func(*packages.Package)
	visit = func(pkg *packages.Package) {
		if pkg == nil || byID[pkg.ID] != nil {
			return
		}
		byID[pkg.ID] = pkg
		importPaths := make([]string, 0, len(pkg.Imports))
		for importPath := range pkg.Imports {
			importPaths = append(importPaths, importPath)
		}
		sort.Strings(importPaths)
		for _, importPath := range importPaths {
			visit(pkg.Imports[importPath])
		}
	}
	for _, root := range roots {
		visit(root)
	}
	output := make([]*packages.Package, 0, len(byID))
	for _, pkg := range byID {
		output = append(output, pkg)
	}
	sort.Slice(output, func(left, right int) bool { return output[left].ID < output[right].ID })
	return output
}

func validateSemanticPackages(root string, modulePath string, roots []*packages.Package, graph []*packages.Package) {
	rootIDs := map[string]bool{}
	for _, root := range roots {
		if root != nil {
			rootIDs[root.ID] = true
		}
	}
	for _, pkg := range graph {
		if semanticSyntheticTestMain(root, pkg) {
			continue
		}
		for _, packageError := range pkg.Errors {
			if (rootIDs[pkg.ID] || packageBelongsToModule(pkg, modulePath)) && semanticPackageErrorAffectsDeclarations(packageError) {
				fatalf("Go semantic package %s (%s) has package error kind %d: %s", pkg.PkgPath, pkg.ID, packageError.Kind, packageError.Msg)
			}
		}
	}
}

func semanticPackageErrorAffectsDeclarations(packageError packages.Error) bool {
	return packageError.Kind != packages.ListError
}

func semanticSyntheticTestMain(root string, pkg *packages.Package) bool {
	if pkg == nil || pkg.Name != "main" || !strings.HasSuffix(pkg.PkgPath, ".test") {
		return false
	}
	for _, filename := range pkg.CompiledGoFiles {
		if _, ok := relativeSemanticPath(root, filename); ok {
			return false
		}
	}
	return true
}

func semanticPackageIDs(graph []*packages.Package, modulePath string) []string {
	output := []string{}
	for _, pkg := range graph {
		if packageBelongsToModule(pkg, modulePath) {
			output = append(output, pkg.ID)
		}
	}
	sort.Strings(output)
	return output
}

func semanticModuleGraph(graph []*packages.Package, selections map[string]exactSemanticModuleSelection, verifiedModules map[string]semanticModuleContentSeal) []SemanticModuleReport {
	byPath := map[string]SemanticModuleReport{}
	for _, pkg := range graph {
		if pkg.Module == nil {
			continue
		}
		verifySemanticModuleContent(pkg.Module, selections, verifiedModules)
		report := semanticModuleReport(pkg.Module, selections)
		if previous, ok := byPath[report.Path]; ok && canonicalSemanticModule(previous) != canonicalSemanticModule(report) {
			fatalf("Go semantic module graph contains conflicting selections for %s", report.Path)
		}
		byPath[report.Path] = report
	}
	output := make([]SemanticModuleReport, 0, len(byPath))
	for _, report := range byPath {
		output = append(output, report)
	}
	sort.Slice(output, func(left, right int) bool {
		return canonicalSemanticModule(output[left]) < canonicalSemanticModule(output[right])
	})
	return output
}

func semanticModuleReport(module *packages.Module, selections map[string]exactSemanticModuleSelection) SemanticModuleReport {
	selection, ok := selections[module.Path]
	if !ok {
		fatalf("loaded Go package module %s is absent from the exact module selection graph", module.Path)
	}
	if selection.Version != module.Version {
		fatalf("loaded Go package module %s version %q disagrees with exact selection %q", module.Path, module.Version, selection.Version)
	}
	report := SemanticModuleReport{Path: module.Path, Version: module.Version, Sum: selection.Sum}
	if !selection.Main && module.Version != "" && report.Sum == "" && module.Replace == nil {
		fatalf("loaded Go package module %s@%s has no exact content checksum", module.Path, module.Version)
	}
	if module.Replace != nil {
		if selection.Replace == nil || selection.Replace.Path != module.Replace.Path || selection.Replace.Version != module.Replace.Version {
			fatalf("loaded Go package module %s replacement disagrees with the exact module selection", module.Path)
		}
		if module.Replace.Version == "" {
			fatalf("local Go module replacement %s => %s requires an explicit pinned-source contract", module.Path, module.Replace.Path)
		}
		report.ReplacePath = module.Replace.Path
		report.ReplaceVersion = module.Replace.Version
		report.ReplaceSum = selection.Replace.Sum
		if report.ReplaceSum == "" {
			fatalf("replacement Go module %s@%s has no exact content checksum", module.Replace.Path, module.Replace.Version)
		}
	} else if selection.Replace != nil {
		fatalf("exact Go module selection for %s has an unobserved replacement", module.Path)
	}
	return report
}

func canonicalSemanticModule(module SemanticModuleReport) string {
	encoded, err := json.Marshal(module)
	if err != nil {
		panic(err)
	}
	return string(encoded)
}

func stringSet(values []string) map[string]bool {
	output := map[string]bool{}
	for _, value := range values {
		output[value] = true
	}
	return output
}

func requiredSemanticUnitIDs(snapshot *Snapshot, requiredFiles map[string]bool) map[string]bool {
	output := map[string]bool{}
	for _, file := range snapshot.Files {
		if !requiredFiles[file.Path] {
			continue
		}
		for _, unit := range file.Units {
			if semanticRequiredUnitKind(unit.Kind) {
				output[unit.ID] = true
			}
		}
	}
	return output
}

func setDifference(expected map[string]bool, actual map[string]bool) []string {
	output := []string{}
	for value := range expected {
		if !actual[value] {
			output = append(output, value)
		}
	}
	sort.Strings(output)
	return output
}
