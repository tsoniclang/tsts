package main

import (
	"go/build"
	"go/build/constraint"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"

	"golang.org/x/mod/modfile"
	"golang.org/x/tools/go/packages"
)

type semanticBuildProfile struct {
	GOOS              string
	GOARCH            string
	CgoEnabled        bool
	ArchitectureValue string
	ExperimentSetting string
	ExperimentTags    []string
	BuildTags         []string
}

type semanticProfilePlan struct {
	Profiles            []semanticBuildProfile
	RequiredFiles       []string
	ExcludedFiles       []string
	UnsupportedProfiles []SemanticProfileRejectionReport
}

const semanticProfileDomainLimit = 65536

func semanticBuildProfiles(root string, snapshot *Snapshot, semanticFiles map[string]bool) semanticProfilePlan {
	excluded := semanticExcludedPaths(root)
	required := map[string]bool{}
	requiredReports := []FileReport{}
	excludedFiles := []string{}
	for _, file := range snapshot.Files {
		if !semanticFiles[file.Path] || semanticFileExcluded(file, excluded) {
			excludedFiles = append(excludedFiles, file.Path)
			continue
		}
		requiresSemanticProfile := len(file.Imports) > 0
		for _, unit := range file.Units {
			if semanticRequiredUnitKind(unit.Kind) {
				requiresSemanticProfile = true
				break
			}
		}
		if requiresSemanticProfile {
			required[file.Path] = true
			requiredReports = append(requiredReports, file)
		}
	}
	requiredFiles := sortedBoolKeys(required)
	requireNoSemanticCgo(requiredReports)
	customTags, experimentNames := semanticProfileDimensions(requiredReports)
	if gccgoRequired := semanticGccgoRequiredFiles(requiredReports); len(gccgoRequired) > 0 {
		fatalf("required declaration files are gccgo-only and cannot belong to the exact gc profile domain: %s", strings.Join(gccgoRequired, ", "))
	}
	bases := semanticBaseProfiles(semanticArchitectureFeatureDimensions(requiredReports))
	bases, unsupported := semanticExperimentProfiles(bases, experimentNames)
	sort.Slice(unsupported, func(left, right int) bool {
		return semanticRejectionKey(unsupported[left]) < semanticRejectionKey(unsupported[right])
	})
	selected := []semanticBuildProfile{}
	seenProfiles := map[string]bool{}
	covered := map[string]bool{}
	for _, base := range bases {
		for _, profile := range semanticDistinctBuildTagProfiles(root, base, requiredReports, customTags) {
			key := semanticProfileKey(profile)
			if seenProfiles[key] {
				continue
			}
			seenProfiles[key] = true
			if len(selected) == semanticProfileDomainLimit {
				fatalf("exact Go semantic profile domain exceeds hard limit %d; no partial profile report was emitted", semanticProfileDomainLimit)
			}
			selected = append(selected, profile)
			for _, path := range profileCoveredFiles(root, profile, required) {
				covered[path] = true
			}
		}
	}
	if missing := setDifference(required, covered); len(missing) > 0 {
		reasons := []string{}
		for _, rejection := range unsupported {
			reasons = append(reasons, rejection.GOOS+"/"+rejection.GOARCH+":cgo=0:arch="+rejection.Architecture+": "+rejection.Reason)
		}
		fatalf("exact Go semantic profile domain does not cover required declaration files: %s; unsupported profile evidence: %s", strings.Join(missing, ", "), strings.Join(reasons, " | "))
	}
	sort.Slice(selected, func(left, right int) bool {
		return semanticProfileKey(selected[left]) < semanticProfileKey(selected[right])
	})
	sort.Strings(excludedFiles)
	return semanticProfilePlan{
		Profiles: selected, RequiredFiles: requiredFiles, ExcludedFiles: excludedFiles, UnsupportedProfiles: unsupported,
	}
}

func semanticBaseProfiles(architectureDimensions map[string]bool) []semanticBuildProfile {
	toolchain := exactSemanticToolchain()
	if architectureDimensions == nil {
		architectureDimensions = map[string]bool{}
	}
	targets := append([]distributionTarget{}, distTargetReports()...)
	sort.Slice(targets, func(left, right int) bool {
		leftHost := targets[left].GOOS == toolchain.hostOS && targets[left].GOARCH == toolchain.hostArch
		rightHost := targets[right].GOOS == toolchain.hostOS && targets[right].GOARCH == toolchain.hostArch
		if leftHost != rightHost {
			return leftHost
		}
		return targets[left].GOOS+"/"+targets[left].GOARCH < targets[right].GOOS+"/"+targets[right].GOARCH
	})
	profiles := []semanticBuildProfile{}
	for _, target := range targets {
		for _, architectureValue := range semanticArchitectureProfileValues(target.GOARCH, architectureDimensions[target.GOARCH]) {
			base := semanticBuildProfile{GOOS: target.GOOS, GOARCH: target.GOARCH, ArchitectureValue: architectureValue}
			profiles = append(profiles, base)
		}
	}
	sort.Slice(profiles, func(left, right int) bool {
		return semanticProfileKey(profiles[left]) < semanticProfileKey(profiles[right])
	})
	return profiles
}

func trueConstraintTags(names []string, values map[string]bool) []string {
	output := []string{}
	for _, name := range names {
		if values[name] {
			output = append(output, name)
		}
	}
	sort.Strings(output)
	return output
}

func semanticProfileTagEnabled(profile semanticBuildProfile, tag string) bool {
	toolchain := exactSemanticToolchain()
	if tag == profile.GOOS || tag == profile.GOARCH || tag == toolchain.compiler {
		return true
	}
	if tag == "cgo" {
		return profile.CgoEnabled
	}
	if tag == "linux" && profile.GOOS == "android" || tag == "solaris" && profile.GOOS == "illumos" || tag == "darwin" && profile.GOOS == "ios" {
		return true
	}
	if tag == "unix" {
		return semanticUnixOperatingSystems()[profile.GOOS]
	}
	if tag == "ignore" || tag == "gccgo" {
		return false
	}
	if tag == "boringcrypto" {
		tag = "goexperiment.boringcrypto"
	}
	return stringSet(semanticToolTags(profile))[tag] || stringSet(toolchain.releaseTags)[tag]
}

func semanticUnixOperatingSystems() map[string]bool {
	return map[string]bool{
		"aix": true, "android": true, "darwin": true, "dragonfly": true, "freebsd": true, "hurd": true,
		"illumos": true, "ios": true, "linux": true, "netbsd": true, "openbsd": true, "solaris": true,
	}
}

func semanticProfileKey(profile semanticBuildProfile) string {
	cgo := "0"
	if profile.CgoEnabled {
		cgo = "1"
	}
	return profile.GOOS + "/" + profile.GOARCH + ":cgo=" + cgo + ":arch=" + semanticArchitectureSetting(profile) + ":compiler=gc:experiments=" + strings.Join(semanticExperimentNames(profile), ",") + ":goexperiment=" + profile.ExperimentSetting + ":tags=" + strings.Join(profile.BuildTags, ",")
}

func semanticBuildFlags(profile semanticBuildProfile) []string {
	flags := []string{"-mod=readonly"}
	if profile.CgoEnabled {
		fatalf("declaration-only profiles cannot enable cgo")
	}
	if len(profile.BuildTags) > 0 {
		flags = append(flags, "-tags="+strings.Join(profile.BuildTags, ","))
	}
	return flags
}

func verifySemanticGoResolution() {
	toolchain := exactSemanticToolchain()
	resolved, err := exec.LookPath("go")
	if err != nil || !sameExecutablePath(toolchain.executable, resolved) {
		fatalf("go/packages executable resolution drifted: resolved=%q error=%v exact=%q", resolved, err, toolchain.executable)
	}
}

func validateSemanticProfileFileSelection(root string, profile semanticBuildProfile, graph []*packages.Package, requiredFiles map[string]bool) {
	actual := map[string]bool{}
	for _, metadata := range graph {
		if metadata == nil {
			continue
		}
		for _, filename := range metadata.CompiledGoFiles {
			if relative, ok := relativeSemanticPath(root, filename); ok {
				actual[relative] = true
			}
		}
	}
	for path := range requiredFiles {
		expected := profileMatchesFile(root, profile, path)
		if actual[path] != expected {
			fatalf("go/packages and in-process build.Context disagree for %s under %s: packages=%t context=%t", path, semanticProfileKey(profile), actual[path], expected)
		}
	}
}

func profileCoveredFiles(root string, profile semanticBuildProfile, required map[string]bool) []string {
	covered := []string{}
	for relative := range required {
		if profileMatchesFile(root, profile, relative) {
			covered = append(covered, relative)
		}
	}
	sort.Strings(covered)
	return covered
}

func profileMatchesFile(root string, profile semanticBuildProfile, relative string) bool {
	context := semanticBuildContext(profile)
	matches, err := context.MatchFile(filepath.Join(root, filepath.Dir(relative)), filepath.Base(relative))
	if err != nil {
		fatalf("evaluate Go build profile %s for %s: %v", semanticProfileKey(profile), relative, err)
	}
	return matches
}

func semanticBuildContext(profile semanticBuildProfile) build.Context {
	toolchain := exactSemanticToolchain()
	context := build.Default
	context.GOOS = profile.GOOS
	context.GOARCH = profile.GOARCH
	context.GOROOT = toolchain.goRoot
	context.Compiler = toolchain.compiler
	context.CgoEnabled = profile.CgoEnabled
	context.BuildTags = append([]string{}, profile.BuildTags...)
	context.ToolTags = semanticToolTags(profile)
	context.ReleaseTags = append([]string{}, toolchain.releaseTags...)
	context.InstallSuffix = ""
	return context
}

func semanticExcludedPaths(root string) []string {
	content, err := os.ReadFile(filepath.Join(root, "go.mod"))
	if err != nil {
		fatalf("read Go module for semantic profile exclusions: %v", err)
	}
	parsed, err := modfile.Parse("go.mod", content, nil)
	if err != nil {
		fatalf("parse Go module for semantic profile exclusions: %v", err)
	}
	output := []string{}
	for _, ignored := range parsed.Ignore {
		output = append(output, filepath.ToSlash(strings.TrimPrefix(ignored.Path, "./")))
	}
	err = filepath.WalkDir(root, func(path string, entry os.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if !entry.IsDir() || path == root || entry.Name() == ".git" {
			return nil
		}
		if _, statErr := os.Stat(filepath.Join(path, "go.mod")); statErr == nil {
			relative, relErr := filepath.Rel(root, path)
			if relErr != nil {
				return relErr
			}
			output = append(output, filepath.ToSlash(relative))
			return filepath.SkipDir
		} else if !os.IsNotExist(statErr) {
			return statErr
		}
		return nil
	})
	if err != nil {
		fatalf("discover nested Go module exclusions: %v", err)
	}
	sort.Strings(output)
	return uniqueSortedStrings(output)
}

func semanticFileExcluded(file FileReport, excludedPaths []string) bool {
	if len(file.BuildTags) == 1 && semanticConstraintRequiresIgnore(file.BuildTags[0], file.Path) {
		return true
	}
	for _, excluded := range excludedPaths {
		if file.Path == excluded || strings.HasPrefix(file.Path, excluded+"/") {
			return true
		}
	}
	return false
}

func semanticConstraintRequiresIgnore(expressionText string, sourcePath string) bool {
	expression, err := constraint.Parse("//go:build " + expressionText)
	if err != nil {
		fatalf("parse ignore build constraint for %s: %v", sourcePath, err)
	}
	_, satisfiableWithoutIgnore := findConstraintAssignment(expression, map[string]bool{"ignore": false}, nil)
	return !satisfiableWithoutIgnore
}

func sortedBoolKeys(values map[string]bool) []string {
	output := make([]string, 0, len(values))
	for key := range values {
		output = append(output, key)
	}
	sort.Strings(output)
	return output
}

func uniqueSortedStrings(values []string) []string {
	if len(values) == 0 {
		return []string{}
	}
	sorted := append([]string{}, values...)
	sort.Strings(sorted)
	output := sorted[:0]
	for _, value := range sorted {
		if len(output) == 0 || output[len(output)-1] != value {
			output = append(output, value)
		}
	}
	return output
}
