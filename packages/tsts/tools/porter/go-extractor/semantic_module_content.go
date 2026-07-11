package main

import (
	"fmt"
	"os"
	"path/filepath"

	"golang.org/x/mod/sumdb/dirhash"
	"golang.org/x/tools/go/packages"
)

type semanticModuleContentSeal struct {
	directory string
	prefix    string
	sum       string
}

func verifySemanticModuleContent(module *packages.Module, selections map[string]exactSemanticModuleSelection, verified map[string]semanticModuleContentSeal) {
	selection, ok := selections[module.Path]
	if !ok {
		fatalf("loaded Go package module %s is absent from the exact module selection graph", module.Path)
	}
	if selection.Main {
		if module.Replace != nil {
			fatalf("main Go module %s unexpectedly has replacement metadata", module.Path)
		}
		return
	}
	effective := module
	effectiveSelection := selection
	if module.Replace != nil {
		if selection.Replace == nil {
			fatalf("loaded Go package module %s replacement is absent from the exact selection graph", module.Path)
		}
		effective = module.Replace
		effectiveSelection = *selection.Replace
	}
	seal, err := semanticModuleContentSealFor(effective, effectiveSelection)
	if err != nil {
		fatalf("seal exact Go module content for %s@%s: %v", effective.Path, effective.Version, err)
	}
	key := seal.prefix + "\x00" + seal.directory
	if previous, exists := verified[key]; exists {
		if previous != seal {
			fatalf("exact Go module content identity changed for %s", seal.prefix)
		}
		return
	}
	verified[key] = seal
}

func semanticModuleContentSealFor(module *packages.Module, selection exactSemanticModuleSelection) (semanticModuleContentSeal, error) {
	if module.Path == "" || module.Version == "" || module.Dir == "" {
		return semanticModuleContentSeal{}, fmt.Errorf("versioned module path, version, and directory are required")
	}
	if selection.Path != module.Path || selection.Version != module.Version {
		return semanticModuleContentSeal{}, fmt.Errorf("loaded module %s@%s disagrees with selection %s@%s", module.Path, module.Version, selection.Path, selection.Version)
	}
	if selection.Sum == "" {
		return semanticModuleContentSeal{}, fmt.Errorf("selection has no content checksum")
	}
	directory, err := filepath.Abs(module.Dir)
	if err != nil {
		return semanticModuleContentSeal{}, fmt.Errorf("resolve module directory: %w", err)
	}
	directory, err = filepath.EvalSymlinks(directory)
	if err != nil {
		return semanticModuleContentSeal{}, fmt.Errorf("resolve module directory links: %w", err)
	}
	info, err := os.Stat(directory)
	if err != nil {
		return semanticModuleContentSeal{}, fmt.Errorf("stat module directory: %w", err)
	}
	if !info.IsDir() {
		return semanticModuleContentSeal{}, fmt.Errorf("module content path is not a directory")
	}
	prefix := module.Path + "@" + module.Version
	actual, err := dirhash.HashDir(directory, prefix, dirhash.Hash1)
	if err != nil {
		return semanticModuleContentSeal{}, fmt.Errorf("hash module directory: %w", err)
	}
	if actual != selection.Sum {
		return semanticModuleContentSeal{}, fmt.Errorf("directory hash %s does not match selected checksum %s", actual, selection.Sum)
	}
	return semanticModuleContentSeal{directory: directory, prefix: prefix, sum: selection.Sum}, nil
}

func reverifySemanticModuleContents(verified map[string]semanticModuleContentSeal) {
	for _, seal := range verified {
		actual, err := dirhash.HashDir(seal.directory, seal.prefix, dirhash.Hash1)
		if err != nil {
			fatalf("reverify exact Go module content %s: %v", seal.prefix, err)
		}
		if actual != seal.sum {
			fatalf("exact Go module content %s changed during extraction: %s, expected %s", seal.prefix, actual, seal.sum)
		}
	}
}
