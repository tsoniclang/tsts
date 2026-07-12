package main

import (
	"encoding/json"
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
		return []string{}
	}
	return []string{selected.String()}
}

func implicitBuildTags(rel string) []string {
	base := strings.TrimSuffix(filepath.Base(rel), ".go")
	base = strings.TrimSuffix(base, "_test")
	parts := strings.Split(base, "_")
	if len(parts) < 2 {
		return []string{}
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
var distributionTargetDetails []distributionTarget

type distributionTarget struct {
	GOOS         string
	GOARCH       string
	CgoSupported bool
	FirstClass   bool
}

func distTagSets() (map[string]bool, map[string]bool) {
	distTagsOnce.Do(func() {
		distOperatingSystems = map[string]bool{}
		distArchitectures = map[string]bool{}
		toolchain := exactSemanticToolchain()
		profile := semanticBuildProfile{GOOS: toolchain.hostOS, GOARCH: toolchain.hostArch}
		command := exec.Command(toolchain.executable, "tool", "dist", "list", "-json")
		command.Env = semanticEnvironment(profile)
		output, err := command.CombinedOutput()
		if err != nil {
			fatalf("load exact Go distribution targets with %s: %v\n%s", toolchain.executable, err, output)
		}
		if err := json.Unmarshal(output, &distributionTargetDetails); err != nil {
			fatalf("decode pinned Go distribution targets: %v", err)
		}
		for _, target := range distributionTargetDetails {
			if target.GOOS == "" || target.GOARCH == "" {
				fatalf("invalid target from 'go tool dist list -json': %#v", target)
			}
			distOperatingSystems[target.GOOS] = true
			distArchitectures[target.GOARCH] = true
		}
	})
	return distOperatingSystems, distArchitectures
}

func distTargetReports() []distributionTarget {
	distTagSets()
	return distributionTargetDetails
}

func constraintsEquivalent(left constraint.Expr, right constraint.Expr) bool {
	difference := &constraint.OrExpr{
		X: &constraint.AndExpr{X: left, Y: &constraint.NotExpr{X: right}},
		Y: &constraint.AndExpr{X: &constraint.NotExpr{X: left}, Y: right},
	}
	_, satisfiable := findConstraintAssignment(difference, nil, nil)
	return !satisfiable
}

type partialConstraintValue uint8

const (
	constraintUnknown partialConstraintValue = iota
	constraintFalse
	constraintTrue
)

func findConstraintAssignment(expression constraint.Expr, fixed map[string]bool, accept func(map[string]bool) bool) (map[string]bool, bool) {
	tags := map[string]bool{}
	collectConstraintTags(expression, tags)
	known := map[string]bool{}
	for name, value := range fixed {
		known[name] = value
		delete(tags, name)
	}
	names := sortedBoolKeys(tags)
	var search func(int) (map[string]bool, bool)
	search = func(index int) (map[string]bool, bool) {
		value := evaluatePartialConstraint(expression, known)
		if value == constraintFalse {
			return nil, false
		}
		if index == len(names) {
			if value != constraintTrue || (accept != nil && !accept(known)) {
				return nil, false
			}
			return copyBoolMap(known), true
		}
		name := names[index]
		known[name] = false
		if assignment, ok := search(index + 1); ok {
			delete(known, name)
			return assignment, true
		}
		known[name] = true
		assignment, ok := search(index + 1)
		delete(known, name)
		return assignment, ok
	}
	return search(0)
}

func findPartialConstraintAssignment(expression constraint.Expr, assignable []string, accept func(map[string]bool) bool) (map[string]bool, bool) {
	known := map[string]bool{}
	names := append([]string{}, assignable...)
	sort.Strings(names)
	var search func(int) (map[string]bool, bool)
	search = func(index int) (map[string]bool, bool) {
		if evaluatePartialConstraint(expression, known) == constraintFalse {
			return nil, false
		}
		if index == len(names) {
			if !accept(known) {
				return nil, false
			}
			return copyBoolMap(known), true
		}
		name := names[index]
		known[name] = false
		if assignment, ok := search(index + 1); ok {
			delete(known, name)
			return assignment, true
		}
		known[name] = true
		assignment, ok := search(index + 1)
		delete(known, name)
		return assignment, ok
	}
	return search(0)
}

func evaluatePartialConstraint(expression constraint.Expr, known map[string]bool) partialConstraintValue {
	switch typed := expression.(type) {
	case *constraint.TagExpr:
		value, ok := known[typed.Tag]
		if !ok {
			return constraintUnknown
		}
		if value {
			return constraintTrue
		}
		return constraintFalse
	case *constraint.NotExpr:
		value := evaluatePartialConstraint(typed.X, known)
		if value == constraintTrue {
			return constraintFalse
		}
		if value == constraintFalse {
			return constraintTrue
		}
		return constraintUnknown
	case *constraint.AndExpr:
		left := evaluatePartialConstraint(typed.X, known)
		right := evaluatePartialConstraint(typed.Y, known)
		if left == constraintFalse || right == constraintFalse {
			return constraintFalse
		}
		if left == constraintTrue && right == constraintTrue {
			return constraintTrue
		}
		return constraintUnknown
	case *constraint.OrExpr:
		left := evaluatePartialConstraint(typed.X, known)
		right := evaluatePartialConstraint(typed.Y, known)
		if left == constraintTrue || right == constraintTrue {
			return constraintTrue
		}
		if left == constraintFalse && right == constraintFalse {
			return constraintFalse
		}
		return constraintUnknown
	default:
		fatalf("unknown build constraint expression %T", expression)
		return constraintUnknown
	}
}

func copyBoolMap(values map[string]bool) map[string]bool {
	copyValue := make(map[string]bool, len(values))
	for name, value := range values {
		copyValue[name] = value
	}
	return copyValue
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
