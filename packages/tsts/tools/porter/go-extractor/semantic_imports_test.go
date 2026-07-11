package main

import "testing"

func TestSemanticImportNamesMergeExactProfiles(t *testing.T) {
	resolved := map[string]map[string]string{}
	mergeSemanticImportNames(resolved, []semanticImportNameEvidence{{sourcePath: "value.go", importPath: "example.test/dependency", packageName: "dependency"}})
	mergeSemanticImportNames(resolved, []semanticImportNameEvidence{{sourcePath: "value.go", importPath: "example.test/dependency", packageName: "dependency"}})
	if resolved["value.go"]["example.test/dependency"] != "dependency" {
		t.Fatalf("resolved import names = %#v", resolved)
	}
}

func TestApplySemanticImportNamesUsesSelectedEdges(t *testing.T) {
	snapshot := Snapshot{Files: []FileReport{{Path: "value.go", Imports: []ImportReport{{Path: "example.test/dependency", Name: "alias"}}}}}
	applySemanticImportNames(&snapshot, map[string]map[string]string{"value.go": {"example.test/dependency": "dependency"}})
	if snapshot.Files[0].Imports[0].PackageName != "dependency" || snapshot.Files[0].Imports[0].Name != "alias" {
		t.Fatalf("resolved import = %#v", snapshot.Files[0].Imports[0])
	}
}
