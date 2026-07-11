package main

import (
	"fmt"
	"go/build/constraint"
	"sort"
	"strings"
)

func semanticProfileDimensions(files []FileReport) ([]string, []string) {
	custom := map[string]bool{}
	experiments := map[string]bool{}
	knownOS, knownArch := distTagSets()
	for _, file := range files {
		if len(file.BuildTags) > 1 {
			fatalf("declaration file %s has %d canonical build constraints", file.Path, len(file.BuildTags))
		}
		for _, expressionText := range file.BuildTags {
			expression, err := constraint.Parse("//go:build " + expressionText)
			if err != nil {
				fatalf("parse semantic build constraint for %s: %v", file.Path, err)
			}
			tags := map[string]bool{}
			collectConstraintTags(expression, tags)
			for tag := range tags {
				switch {
				case tag == "race" || tag == "msan" || tag == "asan":
					custom[tag] = true
				case knownOS[tag] || knownArch[tag] || tag == "unix" || tag == "cgo" || tag == "gc" || tag == "ignore" || strings.HasPrefix(tag, "go1."):
				case tag == "gccgo":
				case tag == "boringcrypto":
					experiments["boringcrypto"] = true
				case strings.HasPrefix(tag, "goexperiment."):
					name := strings.TrimPrefix(tag, "goexperiment.")
					if name == "" {
						fatalf("declaration file %s uses empty Go experiment build tag %q", file.Path, tag)
					}
					experiments[name] = true
				case semanticKnownArchitectureFeatureTag(tag):
				case semanticArchitectureFeatureTag(tag, knownArch):
					fatalf("declaration file %s uses unknown architecture feature build tag %q; expand the exact architecture-tag model before extraction", file.Path, tag)
				default:
					custom[tag] = true
				}
			}
		}
	}
	return sortedBoolKeys(custom), sortedBoolKeys(experiments)
}

func requireNoSemanticCgo(files []FileReport) {
	requirements := semanticCgoRequirements(files)
	if len(requirements) > 0 {
		fatalf(
			"exact declaration extraction rejects cgo-dependent source because native C compiler, header, linker, and generated cgo artifact provenance is not pinned: %s",
			semanticCgoRequirementEvidence(requirements),
		)
	}
}

type semanticCgoRequirement struct {
	Path   string
	Kind   string
	Detail string
}

func semanticCgoRequirements(files []FileReport) []semanticCgoRequirement {
	requirements := []semanticCgoRequirement{}
	seen := map[string]bool{}
	add := func(path string, kind string, detail string) {
		key := path + "\x00" + kind + "\x00" + detail
		if seen[key] {
			return
		}
		seen[key] = true
		requirements = append(requirements, semanticCgoRequirement{Path: path, Kind: kind, Detail: detail})
	}
	for _, file := range files {
		for _, imported := range file.Imports {
			if imported.Path == "C" {
				add(file.Path, "import", `import "C"`)
			}
		}
		for _, expressionText := range file.BuildTags {
			expression, err := constraint.Parse("//go:build " + expressionText)
			if err != nil {
				fatalf("parse cgo constraint for %s: %v", file.Path, err)
			}
			tags := map[string]bool{}
			collectConstraintTags(expression, tags)
			if tags["cgo"] {
				add(file.Path, "build-constraint", "cgo in "+expressionText)
			}
		}
	}
	sort.Slice(requirements, func(left int, right int) bool {
		leftKey := requirements[left].Path + "\x00" + requirements[left].Kind + "\x00" + requirements[left].Detail
		rightKey := requirements[right].Path + "\x00" + requirements[right].Kind + "\x00" + requirements[right].Detail
		return leftKey < rightKey
	})
	return requirements
}

func semanticCgoRequirementEvidence(requirements []semanticCgoRequirement) string {
	evidence := make([]string, len(requirements))
	for index, requirement := range requirements {
		evidence[index] = requirement.Path + ": " + requirement.Detail + " [" + requirement.Kind + "]"
	}
	return strings.Join(evidence, "; ")
}

func semanticGccgoRequiredFiles(files []FileReport) []string {
	required := []string{}
	for _, file := range files {
		if len(file.BuildTags) == 0 {
			continue
		}
		expression, err := constraint.Parse("//go:build " + file.BuildTags[0])
		if err != nil {
			fatalf("parse compiler constraint for %s: %v", file.Path, err)
		}
		satisfiable, err := semanticConstraintSatisfiableBounded(expression, map[string]bool{"gccgo": false, "gc": true}, semanticConstraintEnumerationLimit)
		if err != nil {
			fatalf("classify exact gc compiler domain for %s: %v", file.Path, err)
		}
		if !satisfiable {
			required = append(required, file.Path)
		}
	}
	sort.Strings(required)
	return required
}

func semanticConstraintSatisfiableBounded(expression constraint.Expr, fixed map[string]bool, limit int) (bool, error) {
	tags := map[string]bool{}
	collectConstraintTags(expression, tags)
	known := map[string]bool{}
	for name, value := range fixed {
		known[name] = value
		delete(tags, name)
	}
	names := sortedBoolKeys(tags)
	if len(names) > semanticConstraintDimensionLimit {
		return false, fmt.Errorf("%d unresolved dimensions exceed hard limit %d", len(names), semanticConstraintDimensionLimit)
	}
	visited := 0
	var search func(int) (bool, error)
	search = func(index int) (bool, error) {
		visited++
		if visited > limit {
			return false, fmt.Errorf("symbolic satisfiability search exceeded bounded state limit %d", limit)
		}
		switch evaluatePartialConstraint(expression, known) {
		case constraintTrue:
			return true, nil
		case constraintFalse:
			return false, nil
		}
		if index == len(names) {
			return false, fmt.Errorf("constraint remained unresolved after exact assignment")
		}
		name := names[index]
		known[name] = false
		if result, err := search(index + 1); err != nil || result {
			delete(known, name)
			return result, err
		}
		known[name] = true
		result, err := search(index + 1)
		delete(known, name)
		return result, err
	}
	return search(0)
}

func semanticArchitectureFeatureTag(tag string, architectures map[string]bool) bool {
	prefix, _, found := strings.Cut(tag, ".")
	return found && architectures[prefix]
}

func semanticArchitectureFeatureDimensions(files []FileReport) map[string]bool {
	dimensions := map[string]bool{}
	for _, file := range files {
		for _, expressionText := range file.BuildTags {
			expression, err := constraint.Parse("//go:build " + expressionText)
			if err != nil {
				fatalf("parse architecture feature constraint for %s: %v", file.Path, err)
			}
			tags := map[string]bool{}
			collectConstraintTags(expression, tags)
			for tag := range tags {
				if semanticKnownArchitectureFeatureTag(tag) {
					goarch, _, _ := strings.Cut(tag, ".")
					dimensions[goarch] = true
				}
			}
		}
	}
	return dimensions
}

func semanticDistinctBuildTagProfiles(root string, base semanticBuildProfile, files []FileReport, customTags []string) []semanticBuildProfile {
	profiles, err := semanticDistinctBuildTagProfilesBounded(root, base, files, customTags, semanticConstraintEnumerationLimit)
	if err != nil {
		fatalf("enumerate exact custom-tag profile domain under %s: %v", semanticProfileKey(base), err)
	}
	return profiles
}

const semanticConstraintEnumerationLimit = 8192
const semanticConstraintDimensionLimit = 256

func semanticDistinctBuildTagProfilesBounded(root string, base semanticBuildProfile, files []FileReport, customTags []string, limit int) ([]semanticBuildProfile, error) {
	if limit < 1 {
		return nil, fmt.Errorf("invalid enumeration limit %d", limit)
	}
	if len(customTags) > semanticConstraintDimensionLimit {
		return nil, fmt.Errorf("%d custom build-tag dimensions exceed hard limit %d", len(customTags), semanticConstraintDimensionLimit)
	}
	known := semanticFixedConstraintTags(base, files, customTags)
	seenFileSets := map[string]bool{}
	seenStates := map[string]bool{}
	profiles := []semanticBuildProfile{}
	visited := 0
	var enumerate func(int) error
	enumerate = func(index int) error {
		visited++
		if visited > limit {
			return fmt.Errorf("symbolic custom-tag search exceeded bounded state limit %d; no profiles were emitted", limit)
		}
		states, unresolved := semanticConstraintStates(base, files, known)
		stateKey := semanticConstraintStateKey(index, states)
		if seenStates[stateKey] {
			return nil
		}
		seenStates[stateKey] = true
		if !unresolved || index == len(customTags) {
			if unresolved {
				return fmt.Errorf("Go build constraints remained unresolved after assigning %d custom tags", len(customTags))
			}
			profile := base
			profile.BuildTags = trueConstraintTags(customTags, known)
			actual := profileCoveredFileReports(root, profile, files)
			predicted := semanticTrueConstraintFiles(files, states)
			if strings.Join(actual, "\x00") != strings.Join(predicted, "\x00") {
				fatalf("in-process Go build context disagrees with exact constraint domain for %s: context=%v constraints=%v", semanticProfileKey(profile), actual, predicted)
			}
			key := strings.Join(actual, "\x00")
			if len(actual) > 0 && !seenFileSets[key] {
				if len(profiles) == limit {
					return fmt.Errorf("distinct custom-tag file sets exceed bounded profile limit %d; no profiles were emitted", limit)
				}
				seenFileSets[key] = true
				profiles = append(profiles, profile)
			}
			return nil
		}
		for index < len(customTags) {
			name := customTags[index]
			index++
			if semanticConstraintStatesUseTag(files, states, name) {
				known[name] = false
				if err := enumerate(index); err != nil {
					delete(known, name)
					return err
				}
				known[name] = true
				if err := enumerate(index); err != nil {
					delete(known, name)
					return err
				}
				delete(known, name)
				return nil
			}
		}
		return fmt.Errorf("unresolved Go build constraint has no remaining modeled custom tag")
	}
	if err := enumerate(0); err != nil {
		return nil, err
	}
	sort.Slice(profiles, func(left, right int) bool {
		return semanticProfileKey(profiles[left]) < semanticProfileKey(profiles[right])
	})
	return profiles, nil
}

func semanticConstraintStateKey(index int, states []partialConstraintValue) string {
	encoded := make([]byte, 0, len(states)+16)
	prefix := fmt.Sprintf("%d:", index)
	encoded = append(encoded, prefix...)
	for _, state := range states {
		encoded = append(encoded, byte('0'+state))
	}
	return string(encoded)
}

func semanticFixedConstraintTags(profile semanticBuildProfile, files []FileReport, customTags []string) map[string]bool {
	custom := stringSet(customTags)
	known := map[string]bool{}
	for _, file := range files {
		for _, expressionText := range file.BuildTags {
			expression, err := constraint.Parse("//go:build " + expressionText)
			if err != nil {
				fatalf("parse semantic build constraint for %s: %v", file.Path, err)
			}
			tags := map[string]bool{}
			collectConstraintTags(expression, tags)
			for tag := range tags {
				if !custom[tag] {
					known[tag] = semanticProfileTagEnabled(profile, tag)
				}
			}
		}
	}
	return known
}

func semanticConstraintStates(profile semanticBuildProfile, files []FileReport, known map[string]bool) ([]partialConstraintValue, bool) {
	states := make([]partialConstraintValue, len(files))
	unresolved := false
	for index, file := range files {
		if !semanticImplicitTagsMatch(profile, file.ImplicitBuildTags) {
			states[index] = constraintFalse
			continue
		}
		if len(file.BuildTags) == 0 {
			states[index] = constraintTrue
			continue
		}
		expression, err := constraint.Parse("//go:build " + file.BuildTags[0])
		if err != nil {
			fatalf("parse semantic build constraint for %s: %v", file.Path, err)
		}
		states[index] = evaluatePartialConstraint(expression, known)
		unresolved = unresolved || states[index] == constraintUnknown
	}
	return states, unresolved
}

func semanticConstraintStatesUseTag(files []FileReport, states []partialConstraintValue, tag string) bool {
	for index, file := range files {
		if states[index] != constraintUnknown || len(file.BuildTags) == 0 {
			continue
		}
		expression, err := constraint.Parse("//go:build " + file.BuildTags[0])
		if err != nil {
			fatalf("parse semantic build constraint for %s: %v", file.Path, err)
		}
		tags := map[string]bool{}
		collectConstraintTags(expression, tags)
		if tags[tag] {
			return true
		}
	}
	return false
}

func semanticImplicitTagsMatch(profile semanticBuildProfile, tags []string) bool {
	for _, tag := range tags {
		if !semanticProfileTagEnabled(profile, tag) {
			return false
		}
	}
	return true
}

func semanticTrueConstraintFiles(files []FileReport, states []partialConstraintValue) []string {
	paths := []string{}
	for index, state := range states {
		if state == constraintUnknown {
			fatalf("Go build constraint for %s remained unresolved after exact assignment", files[index].Path)
		}
		if state == constraintTrue {
			paths = append(paths, files[index].Path)
		}
	}
	sort.Strings(paths)
	return paths
}

func profileCoveredFileReports(root string, profile semanticBuildProfile, files []FileReport) []string {
	covered := []string{}
	for _, file := range files {
		if profileMatchesFile(root, profile, file.Path) {
			covered = append(covered, file.Path)
		}
	}
	sort.Strings(covered)
	return covered
}
