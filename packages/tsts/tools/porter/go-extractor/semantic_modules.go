package main

import (
	"bytes"
	"encoding/json"
	"io"
	"os/exec"
)

type exactSemanticModuleSelection struct {
	Path    string                        `json:"Path"`
	Version string                        `json:"Version"`
	Sum     string                        `json:"Sum"`
	Main    bool                          `json:"Main"`
	Replace *exactSemanticModuleSelection `json:"Replace"`
}

func exactSemanticModuleSelections(root string) map[string]exactSemanticModuleSelection {
	toolchain := exactSemanticToolchain()
	profile := semanticBuildProfile{GOOS: toolchain.hostOS, GOARCH: toolchain.hostArch}
	command := exec.Command(toolchain.executable, "list", "-mod=readonly", "-m", "-json", "all")
	command.Dir = root
	command.Env = semanticEnvironment(profile)
	output, err := command.CombinedOutput()
	if err != nil {
		fatalf("load exact Go module selections with %s: %v\n%s", toolchain.executable, err, output)
	}
	decoder := json.NewDecoder(bytes.NewReader(output))
	selections := map[string]exactSemanticModuleSelection{}
	for {
		selection := exactSemanticModuleSelection{}
		if err := decoder.Decode(&selection); err != nil {
			if err == io.EOF {
				break
			}
			fatalf("decode exact Go module selections: %v", err)
		}
		if selection.Path == "" {
			fatalf("exact Go module selection omitted its path")
		}
		if _, exists := selections[selection.Path]; exists {
			fatalf("exact Go module selection duplicates %s", selection.Path)
		}
		selections[selection.Path] = selection
	}
	if len(selections) == 0 {
		fatalf("exact Go module selection command returned no modules")
	}
	return selections
}
