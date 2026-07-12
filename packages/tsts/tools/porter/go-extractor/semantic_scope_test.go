package main

import (
	"strings"
	"testing"
)

func TestSemanticExtractionRequestRequiresExactVersionedSortedScope(t *testing.T) {
	request, err := decodeSemanticExtractionRequest(strings.NewReader(`{
		"schemaVersion":1,
		"semanticFiles":["a.go","internal/b.go"],
		"externalPackageSurfaceObjectIds":["errors::func::New","time::type::Duration"]
	}`), "example.test/local")
	if err != nil {
		t.Fatalf("decode exact extraction request: %v", err)
	}
	if !request.semanticFiles["a.go"] || !request.semanticFiles["internal/b.go"] || len(request.semanticFiles) != 2 {
		t.Fatalf("semantic files = %#v", request.semanticFiles)
	}
	selections := request.externalPackageSurfaceSelections
	if len(selections) != 2 || selections[0].ObjectID != "errors::func::New" || selections[0].PackagePath != "errors" || selections[0].Kind != "func" || selections[0].Name != "New" || selections[1].ObjectID != "time::type::Duration" {
		t.Fatalf("external package surface selections = %#v", selections)
	}
}

func TestSemanticExtractionRequestRejectsLegacyAndInexactInputs(t *testing.T) {
	for name, input := range map[string]string{
		"legacy array":      `["a.go"]`,
		"wrong schema":      `{"schemaVersion":2,"semanticFiles":[],"externalPackageSurfaceObjectIds":[]}`,
		"missing field":     `{"schemaVersion":1,"semanticFiles":[]}`,
		"unknown field":     `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":[],"legacy":true}`,
		"duplicate field":   `{"schemaVersion":1,"semanticFiles":[],"semanticFiles":[],"externalPackageSurfaceObjectIds":[]}`,
		"null files":        `{"schemaVersion":1,"semanticFiles":null,"externalPackageSurfaceObjectIds":[]}`,
		"unsorted files":    `{"schemaVersion":1,"semanticFiles":["b.go","a.go"],"externalPackageSurfaceObjectIds":[]}`,
		"unsorted objects":  `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":["time::type::Time","errors::func::New"]}`,
		"duplicate object":  `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":["errors::func::New","errors::func::New"]}`,
		"invalid kind":      `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":["errors::package::all"]}`,
		"local package":     `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":["example.test/local/sub::type::Value"]}`,
		"builtin scope":     `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":["builtin::type::error"]}`,
		"trailing document": `{"schemaVersion":1,"semanticFiles":[],"externalPackageSurfaceObjectIds":[]} {}`,
	} {
		t.Run(name, func(t *testing.T) {
			if _, err := decodeSemanticExtractionRequest(strings.NewReader(input), "example.test/local"); err == nil {
				t.Fatal("inexact extraction request was accepted")
			}
		})
	}
}

func TestPorterSnapshotSchemaVersionIncludesExternalPackageSurface(t *testing.T) {
	if porterSnapshotSchemaVersion != 10 {
		t.Fatalf("Porter snapshot schema version = %d, want 10", porterSnapshotSchemaVersion)
	}
}
