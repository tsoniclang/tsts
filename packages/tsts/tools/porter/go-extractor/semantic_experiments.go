package main

import (
	"fmt"
	"sort"
	"strings"
)

const semanticExperimentConfigurationLimit = 1024

func semanticExperimentProfiles(bases []semanticBuildProfile, names []string) ([]semanticBuildProfile, []SemanticProfileRejectionReport) {
	settings, err := semanticExperimentSettings(names, semanticExperimentConfigurationLimit)
	if err != nil {
		fatalf("enumerate exact Go experiment profile domain: %v", err)
	}
	if len(bases) > 0 && len(settings) > semanticProfileDomainLimit/len(bases) {
		fatalf("exact Go experiment candidates exceed hard profile-domain limit %d before toolchain queries; no partial profile report was emitted", semanticProfileDomainLimit)
	}
	profiles := []semanticBuildProfile{}
	rejectionsByKey := map[string]SemanticProfileRejectionReport{}
	for _, base := range bases {
		states := map[string]semanticBuildProfile{}
		for _, setting := range settings {
			candidate := base
			candidate.ExperimentSetting = setting
			result := querySemanticExperimentTags(candidate)
			if result.err != "" {
				if setting == "" {
					fatalf("exact pinned toolchain rejected its default experiment state for %s/%s: %s", base.GOOS, base.GOARCH, result.err)
				}
				rejection := semanticExperimentRejection(candidate, result.err)
				key := base.GOOS + "/" + base.GOARCH + ":cgo=0:arch=" + semanticArchitectureSetting(base) + ":" + setting
				rejectionsByKey[key] = rejection
				continue
			}
			candidate.ExperimentTags = append([]string{}, result.tags...)
			stateKey := strings.Join(candidate.ExperimentTags, "\x00")
			if previous, ok := states[stateKey]; !ok || semanticExperimentSettingPriority(candidate.ExperimentSetting) < semanticExperimentSettingPriority(previous.ExperimentSetting) {
				states[stateKey] = candidate
			}
		}
		for _, profile := range states {
			profiles = append(profiles, profile)
		}
	}
	sort.Slice(profiles, func(left, right int) bool {
		return semanticProfileKey(profiles[left]) < semanticProfileKey(profiles[right])
	})
	rejections := make([]SemanticProfileRejectionReport, 0, len(rejectionsByKey))
	for _, rejection := range rejectionsByKey {
		rejections = append(rejections, rejection)
	}
	sort.Slice(rejections, func(left, right int) bool {
		return semanticRejectionKey(rejections[left]) < semanticRejectionKey(rejections[right])
	})
	return profiles, rejections
}

func semanticExperimentSettings(names []string, limit int) ([]string, error) {
	names = uniqueSortedStrings(names)
	if limit < 1 {
		return nil, fmt.Errorf("invalid experiment configuration limit %d", limit)
	}
	if len(names) >= 63 || (uint64(1)<<len(names))+1 > uint64(limit) {
		return nil, fmt.Errorf("%d declaration experiment dimensions require more than the bounded %d exact toolchain queries", len(names), limit)
	}
	settings := []string{""}
	assignments := 1 << len(names)
	for assignment := 0; assignment < assignments; assignment++ {
		directives := make([]string, len(names))
		for index, name := range names {
			directives[index] = "no" + name
			if assignment&(1<<index) != 0 {
				directives[index] = name
			}
		}
		if len(directives) > 0 {
			settings = append(settings, strings.Join(directives, ","))
		}
	}
	return uniqueSortedStrings(settings), nil
}

func semanticExperimentSettingPriority(setting string) string {
	if setting == "" {
		return "0"
	}
	return "1" + setting
}

func semanticExperimentRejection(profile semanticBuildProfile, detail string) SemanticProfileRejectionReport {
	return SemanticProfileRejectionReport{
		GOOS: profile.GOOS, GOARCH: profile.GOARCH, CgoEnabled: profile.CgoEnabled,
		Architecture: semanticArchitectureSetting(profile), ExperimentSetting: profile.ExperimentSetting,
		Reason: fmt.Sprintf("exact pinned toolchain rejected GOEXPERIMENT=%q: %s", profile.ExperimentSetting, detail),
	}
}

func semanticRejectionKey(rejection SemanticProfileRejectionReport) string {
	return rejection.GOOS + "/" + rejection.GOARCH + ":cgo=0:arch=" + rejection.Architecture + ":goexperiment=" + rejection.ExperimentSetting + ":" + rejection.Reason
}
