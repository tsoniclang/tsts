package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"unicode"
)

func isGenerated(source []byte) bool {
	limit := string(source)
	if len(limit) > 4096 {
		limit = limit[:4096]
	}
	upper := strings.ToUpper(limit)
	return strings.Contains(limit, "Code generated") && strings.Contains(upper, "DO NOT EDIT")
}

func explicitBuildTags(source []byte) []string {
	var tags []string
	lines := strings.Split(string(source), "\n")
	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if trimmed == "" {
			continue
		}
		if !strings.HasPrefix(trimmed, "//") {
			break
		}
		if strings.HasPrefix(trimmed, "//go:build") {
			tags = append(tags, strings.TrimSpace(strings.TrimPrefix(trimmed, "//go:build")))
		}
		if strings.HasPrefix(trimmed, "// +build") {
			tags = append(tags, strings.TrimSpace(strings.TrimPrefix(trimmed, "// +build")))
		}
	}
	return uniqueSorted(tags)
}

func implicitBuildTags(rel string) []string {
	base := strings.TrimSuffix(filepath.Base(rel), ".go")
	parts := strings.Split(base, "_")
	if len(parts) < 2 {
		return nil
	}
	known := map[string]bool{
		"aix": true, "android": true, "darwin": true, "dragonfly": true, "freebsd": true,
		"hurd": true, "illumos": true, "ios": true, "js": true, "linux": true,
		"netbsd": true, "openbsd": true, "plan9": true, "solaris": true, "wasip1": true, "windows": true,
		"386": true, "amd64": true, "amd64p32": true, "arm": true, "arm64": true, "loong64": true,
		"mips": true, "mipsle": true, "mips64": true, "mips64le": true, "ppc64": true, "ppc64le": true,
		"riscv64": true, "s390x": true, "sparc64": true, "wasm": true,
	}
	var tags []string
	for _, part := range parts[1:] {
		if known[part] {
			tags = append(tags, part)
		}
	}
	return uniqueSorted(tags)
}

func uniqueSorted(values []string) []string {
	if len(values) == 0 {
		return nil
	}
	seen := map[string]bool{}
	var output []string
	for _, value := range values {
		if value == "" || seen[value] {
			continue
		}
		seen[value] = true
		output = append(output, value)
	}
	sort.Strings(output)
	return output
}

func importPathFor(modulePath string, rel string) string {
	dir := filepath.Dir(filepath.ToSlash(rel))
	if dir == "." {
		return modulePath
	}
	return modulePath + "/" + dir
}

func mustRel(root string, path string) string {
	rel, err := filepath.Rel(root, path)
	if err != nil {
		fatalf("rel path: %v", err)
	}
	return filepath.ToSlash(rel)
}

func hashText(value string) string {
	normalized := strings.ReplaceAll(value, "\r\n", "\n")
	sum := sha256.Sum256([]byte(normalized))
	return hex.EncodeToString(sum[:])
}

func gitRevision(root string) string {
	command := exec.Command("git", "-C", root, "rev-parse", "HEAD")
	out, err := command.Output()
	if err != nil {
		return ""
	}
	return strings.TrimSpace(string(out))
}

func fatalf(format string, args ...any) {
	fmt.Fprintf(os.Stderr, format+"\n", args...)
	os.Exit(1)
}

func init() {
	_ = unicode.IsUpper
}
