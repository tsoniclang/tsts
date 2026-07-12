package main

import (
	"encoding/json"
	"fmt"
	"go/token"
	"io"
	"path/filepath"
	"sort"
	"strings"

	"golang.org/x/mod/module"
)

const semanticExtractionRequestSchemaVersion = 1

type semanticExtractionRequest struct {
	semanticFiles                    map[string]bool
	externalPackageSurfaceSelections []semanticExternalPackageSelection
}

type semanticExternalPackageSelection struct {
	ObjectID    string
	PackagePath string
	Kind        string
	Name        string
}

func readSemanticExtractionRequest(reader io.Reader, modulePath string) semanticExtractionRequest {
	request, err := decodeSemanticExtractionRequest(reader, modulePath)
	if err != nil {
		fatalf("decode exact semantic extraction request: %v", err)
	}
	return request
}

func decodeSemanticExtractionRequest(reader io.Reader, modulePath string) (semanticExtractionRequest, error) {
	decoder := json.NewDecoder(reader)
	opening, err := decoder.Token()
	if err != nil {
		return semanticExtractionRequest{}, err
	}
	if delimiter, ok := opening.(json.Delim); !ok || delimiter != '{' {
		return semanticExtractionRequest{}, fmt.Errorf("request must be one JSON object")
	}
	seen := map[string]bool{}
	schemaVersion := 0
	var semanticFiles []string
	var objectIDs []string
	for decoder.More() {
		keyToken, err := decoder.Token()
		if err != nil {
			return semanticExtractionRequest{}, err
		}
		key, ok := keyToken.(string)
		if !ok {
			return semanticExtractionRequest{}, fmt.Errorf("request contains a non-string property name")
		}
		if seen[key] {
			return semanticExtractionRequest{}, fmt.Errorf("request duplicates property %q", key)
		}
		seen[key] = true
		switch key {
		case "schemaVersion":
			err = decoder.Decode(&schemaVersion)
		case "semanticFiles":
			err = decoder.Decode(&semanticFiles)
		case "externalPackageSurfaceObjectIds":
			err = decoder.Decode(&objectIDs)
		default:
			return semanticExtractionRequest{}, fmt.Errorf("request contains unknown property %q", key)
		}
		if err != nil {
			return semanticExtractionRequest{}, fmt.Errorf("decode request property %q: %w", key, err)
		}
	}
	closing, err := decoder.Token()
	if err != nil {
		return semanticExtractionRequest{}, err
	}
	if delimiter, ok := closing.(json.Delim); !ok || delimiter != '}' {
		return semanticExtractionRequest{}, fmt.Errorf("request object is not closed")
	}
	var trailing any
	if err := decoder.Decode(&trailing); err != io.EOF {
		if err == nil {
			return semanticExtractionRequest{}, fmt.Errorf("request contains trailing JSON")
		}
		return semanticExtractionRequest{}, fmt.Errorf("decode trailing request data: %w", err)
	}
	for _, key := range []string{"schemaVersion", "semanticFiles", "externalPackageSurfaceObjectIds"} {
		if !seen[key] {
			return semanticExtractionRequest{}, fmt.Errorf("request is missing property %q", key)
		}
	}
	if schemaVersion != semanticExtractionRequestSchemaVersion {
		return semanticExtractionRequest{}, fmt.Errorf("request schemaVersion is %d, expected exactly %d", schemaVersion, semanticExtractionRequestSchemaVersion)
	}
	if semanticFiles == nil {
		return semanticExtractionRequest{}, fmt.Errorf("request semanticFiles must be an array")
	}
	if objectIDs == nil {
		return semanticExtractionRequest{}, fmt.Errorf("request externalPackageSurfaceObjectIds must be an array")
	}
	files, err := exactSemanticFiles(semanticFiles)
	if err != nil {
		return semanticExtractionRequest{}, err
	}
	selections, err := exactExternalPackageSurfaceSelections(objectIDs, modulePath)
	if err != nil {
		return semanticExtractionRequest{}, err
	}
	return semanticExtractionRequest{semanticFiles: files, externalPackageSurfaceSelections: selections}, nil
}

func exactSemanticFiles(paths []string) (map[string]bool, error) {
	if !sort.StringsAreSorted(paths) {
		return nil, fmt.Errorf("request semanticFiles is not sorted")
	}
	files := map[string]bool{}
	for _, path := range paths {
		if path == "" || filepath.IsAbs(path) || strings.Contains(path, "\\") || filepath.ToSlash(filepath.Clean(path)) != path || path == "." || strings.HasPrefix(path, "../") || !strings.HasSuffix(path, ".go") {
			return nil, fmt.Errorf("request semanticFiles contains invalid path %q", path)
		}
		if files[path] {
			return nil, fmt.Errorf("request semanticFiles duplicates %q", path)
		}
		files[path] = true
	}
	return files, nil
}

func exactExternalPackageSurfaceSelections(objectIDs []string, modulePath string) ([]semanticExternalPackageSelection, error) {
	if !sort.StringsAreSorted(objectIDs) {
		return nil, fmt.Errorf("request externalPackageSurfaceObjectIds is not sorted")
	}
	selections := make([]semanticExternalPackageSelection, 0, len(objectIDs))
	for index, objectID := range objectIDs {
		if index > 0 && objectIDs[index-1] == objectID {
			return nil, fmt.Errorf("request externalPackageSurfaceObjectIds duplicates %q", objectID)
		}
		selection, err := exactExternalPackageSurfaceSelection(objectID, modulePath)
		if err != nil {
			return nil, err
		}
		selections = append(selections, selection)
	}
	return selections, nil
}

func exactExternalPackageSurfaceSelection(objectID string, modulePath string) (semanticExternalPackageSelection, error) {
	parts := strings.Split(objectID, "::")
	if len(parts) != 3 || parts[0] == "" || parts[2] == "" {
		return semanticExternalPackageSelection{}, fmt.Errorf("external package surface object id %q must be package::(const|func|type|var)::name", objectID)
	}
	packagePath, kind, name := parts[0], parts[1], parts[2]
	if packagePath == "builtin" {
		return semanticExternalPackageSelection{}, fmt.Errorf("external package surface object id %q names the non-package builtin scope", objectID)
	}
	if err := module.CheckImportPath(packagePath); err != nil {
		return semanticExternalPackageSelection{}, fmt.Errorf("external package surface object id %q has invalid package path: %w", objectID, err)
	}
	if packagePathWithinModule(packagePath, modulePath) {
		return semanticExternalPackageSelection{}, fmt.Errorf("external package surface object id %q belongs to local module %s", objectID, modulePath)
	}
	if kind != "const" && kind != "func" && kind != "type" && kind != "var" {
		return semanticExternalPackageSelection{}, fmt.Errorf("external package surface object id %q must be package::(const|func|type|var)::name", objectID)
	}
	if name == "_" || !token.IsIdentifier(name) {
		return semanticExternalPackageSelection{}, fmt.Errorf("external package surface object id %q has invalid Go declaration name", objectID)
	}
	return semanticExternalPackageSelection{ObjectID: objectID, PackagePath: packagePath, Kind: kind, Name: name}, nil
}
