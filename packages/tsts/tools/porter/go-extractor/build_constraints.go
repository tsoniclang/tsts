package main

import (
	"go/build/constraint"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"sync"
)

func explicitBuildTags(source []byte, sourcePath string) []string {
	var goBuild constraint.Expr
	var plusBuild constraint.Expr
	for _, raw := range strings.Split(string(source), "\n") {
		line := strings.TrimSuffix(raw, "\r")
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "package ") {
			break
		}
		if constraint.IsGoBuild(line) {
			if goBuild != nil {
				fatalf("multiple //go:build lines in %s", sourcePath)
			}
			parsed, err := constraint.Parse(line)
			if err != nil {
				fatalf("invalid //go:build line in %s: %v", sourcePath, err)
			}
			goBuild = parsed
		}
		if constraint.IsPlusBuild(line) {
			parsed, err := constraint.Parse(line)
			if err != nil {
				fatalf("invalid // +build line in %s: %v", sourcePath, err)
			}
			if plusBuild == nil {
				plusBuild = parsed
			} else {
				plusBuild = &constraint.AndExpr{X: plusBuild, Y: parsed}
			}
		}
	}
	if goBuild != nil && plusBuild != nil && !constraintsEquivalent(goBuild, plusBuild) {
		fatalf("//go:build and // +build constraints are not equivalent in %s", sourcePath)
	}
	selected := goBuild
	if selected == nil {
		selected = plusBuild
	}
	if selected == nil {
		return nil
	}
	return []string{selected.String()}
}

func implicitBuildTags(rel string) []string {
	base := strings.TrimSuffix(filepath.Base(rel), ".go")
	base = strings.TrimSuffix(base, "_test")
	parts := strings.Split(base, "_")
	if len(parts) < 2 {
		return nil
	}
	knownOS, knownArch := distTagSets()
	last := parts[len(parts)-1]
	var tags []string
	if knownOS[last] {
		tags = append(tags, last)
	} else if knownArch[last] {
		if len(parts) >= 3 && knownOS[parts[len(parts)-2]] {
			tags = append(tags, parts[len(parts)-2])
		}
		tags = append(tags, last)
	}
	return uniqueSorted(tags)
}

var distTagsOnce sync.Once
var distOperatingSystems map[string]bool
var distArchitectures map[string]bool
var distributionTargets []string

func distTagSets() (map[string]bool, map[string]bool) {
	distTagsOnce.Do(func() {
		distOperatingSystems = map[string]bool{}
		distArchitectures = map[string]bool{}
		output, err := exec.Command("go", "tool", "dist", "list").Output()
		if err != nil {
			fatalf("load pinned Go distribution targets: %v", err)
		}
		distributionTargets = strings.Fields(string(output))
		for _, line := range distributionTargets {
			goos, goarch, ok := strings.Cut(line, "/")
			if !ok || goos == "" || goarch == "" {
				fatalf("invalid target from 'go tool dist list': %q", line)
			}
			distOperatingSystems[goos] = true
			distArchitectures[goarch] = true
		}
	})
	return distOperatingSystems, distArchitectures
}

func distTargets() []string {
	distTagSets()
	return distributionTargets
}

func constraintsEquivalent(left constraint.Expr, right constraint.Expr) bool {
	tags := map[string]bool{}
	collectConstraintTags(left, tags)
	collectConstraintTags(right, tags)
	names := make([]string, 0, len(tags))
	for name := range tags {
		names = append(names, name)
	}
	sort.Strings(names)
	if len(names) > 18 {
		fatalf("build constraint equivalence requires %d variables; refusing heuristic comparison", len(names))
	}
	for assignment := 0; assignment < 1<<len(names); assignment++ {
		value := func(tag string) bool {
			index := sort.SearchStrings(names, tag)
			return index < len(names) && names[index] == tag && assignment&(1<<index) != 0
		}
		if left.Eval(value) != right.Eval(value) {
			return false
		}
	}
	return true
}

func collectConstraintTags(expression constraint.Expr, tags map[string]bool) {
	switch typed := expression.(type) {
	case *constraint.TagExpr:
		tags[typed.Tag] = true
	case *constraint.NotExpr:
		collectConstraintTags(typed.X, tags)
	case *constraint.AndExpr:
		collectConstraintTags(typed.X, tags)
		collectConstraintTags(typed.Y, tags)
	case *constraint.OrExpr:
		collectConstraintTags(typed.X, tags)
		collectConstraintTags(typed.Y, tags)
	default:
		fatalf("unknown build constraint expression %T", expression)
	}
}
