package main

import (
	"sort"

	"golang.org/x/tools/go/packages"
)

type semanticImportNameEvidence struct {
	sourcePath  string
	importPath  string
	packageName string
}

func semanticProfileImportNames(root string, graph []*packages.Package) []semanticImportNameEvidence {
	output := []semanticImportNameEvidence{}
	for _, metadata := range graph {
		if metadata == nil || semanticSyntheticTestMain(root, metadata) {
			continue
		}
		for _, filename := range metadata.CompiledGoFiles {
			sourcePath, ok := relativeSemanticPath(root, filename)
			if !ok {
				continue
			}
			importPaths := make([]string, 0, len(metadata.Imports))
			for importPath := range metadata.Imports {
				importPaths = append(importPaths, importPath)
			}
			sort.Strings(importPaths)
			for _, importPath := range importPaths {
				dependency := metadata.Imports[importPath]
				if dependency == nil || dependency.Name == "" {
					fatalf("exact Go import edge %s -> %s has no selected package declaration name", metadata.ID, importPath)
				}
				output = append(output, semanticImportNameEvidence{
					sourcePath: sourcePath, importPath: importPath, packageName: dependency.Name,
				})
			}
		}
	}
	sort.Slice(output, func(left, right int) bool {
		if output[left].sourcePath != output[right].sourcePath {
			return output[left].sourcePath < output[right].sourcePath
		}
		if output[left].importPath != output[right].importPath {
			return output[left].importPath < output[right].importPath
		}
		return output[left].packageName < output[right].packageName
	})
	return output
}

func mergeSemanticImportNames(target map[string]map[string]string, evidence []semanticImportNameEvidence) {
	for _, item := range evidence {
		byImport := target[item.sourcePath]
		if byImport == nil {
			byImport = map[string]string{}
			target[item.sourcePath] = byImport
		}
		if previous := byImport[item.importPath]; previous != "" && previous != item.packageName {
			fatalf("Go import %s in %s changes package declaration name across exact profiles: %s vs %s", item.importPath, item.sourcePath, previous, item.packageName)
		}
		byImport[item.importPath] = item.packageName
	}
}

func applySemanticImportNames(snapshot *Snapshot, resolved map[string]map[string]string) {
	for fileIndex := range snapshot.Files {
		file := &snapshot.Files[fileIndex]
		for importIndex := range file.Imports {
			imported := &file.Imports[importIndex]
			if imported.Path == "C" {
				continue
			}
			packageName := resolved[file.Path][imported.Path]
			if packageName == "" {
				fatalf("no exact selected package declaration name for import %s in %s", imported.Path, file.Path)
			}
			imported.PackageName = packageName
		}
	}
}
