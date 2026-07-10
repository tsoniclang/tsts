package main

import (
	"crypto/sha1"
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

func hashBytes(value []byte) string {
	sum := sha256.Sum256(value)
	return hex.EncodeToString(sum[:])
}

func gitBlobHash(value []byte) string {
	hasher := sha1.New()
	_, _ = fmt.Fprintf(hasher, "blob %d%c", len(value), byte(0))
	_, _ = hasher.Write(value)
	return hex.EncodeToString(hasher.Sum(nil))
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
