package main

import (
	"fmt"
	"strconv"
	"strings"
)

func semanticArchitectureSetting(profile semanticBuildProfile) string {
	toolchain := exactSemanticToolchain()
	name := semanticArchitectureVariable(profile.GOARCH)
	if name == "" {
		return ""
	}
	value := profile.ArchitectureValue
	if value == "" {
		value = toolchain.architectureDefaults[name]
	}
	return name + "=" + value
}

func semanticArchitectureVariable(goarch string) string {
	switch goarch {
	case "386":
		return "GO386"
	case "amd64":
		return "GOAMD64"
	case "arm":
		return "GOARM"
	case "arm64":
		return "GOARM64"
	case "mips", "mipsle":
		return "GOMIPS"
	case "mips64", "mips64le":
		return "GOMIPS64"
	case "ppc64", "ppc64le":
		return "GOPPC64"
	case "riscv64":
		return "GORISCV64"
	case "wasm":
		return "GOWASM"
	default:
		return ""
	}
}

func semanticKnownArchitectureFeatureTag(tag string) bool {
	for _, candidate := range []string{
		"386.sse2", "386.softfloat",
		"amd64.v1", "amd64.v2", "amd64.v3", "amd64.v4",
		"arm.5", "arm.6", "arm.7",
		"mips.hardfloat", "mips.softfloat", "mipsle.hardfloat", "mipsle.softfloat",
		"mips64.hardfloat", "mips64.softfloat", "mips64le.hardfloat", "mips64le.softfloat",
		"ppc64.power8", "ppc64.power9", "ppc64.power10", "ppc64le.power8", "ppc64le.power9", "ppc64le.power10",
		"riscv64.rva20u64", "riscv64.rva22u64", "riscv64.rva23u64", "wasm.satconv", "wasm.signext",
	} {
		if tag == candidate {
			return true
		}
	}
	if strings.HasPrefix(tag, "arm64.v8.") {
		minor, err := strconv.Atoi(strings.TrimPrefix(tag, "arm64.v8."))
		return err == nil && minor >= 0 && minor <= 9
	}
	if strings.HasPrefix(tag, "arm64.v9.") {
		minor, err := strconv.Atoi(strings.TrimPrefix(tag, "arm64.v9."))
		return err == nil && minor >= 0 && minor <= 5
	}
	return false
}

func semanticArchitectureProfileValues(goarch string, includeFeatureDomain bool) []string {
	toolchain := exactSemanticToolchain()
	name := semanticArchitectureVariable(goarch)
	if name == "" {
		return []string{""}
	}
	baseline := toolchain.architectureDefaults[name]
	if !includeFeatureDomain {
		return []string{baseline}
	}
	values := []string{baseline}
	switch goarch {
	case "386":
		values = append(values, "sse2", "softfloat")
	case "amd64":
		values = append(values, "v1", "v2", "v3", "v4")
	case "arm":
		values = append(values, "5", "6", "7")
	case "arm64":
		for major := 8; major <= 9; major++ {
			maximum := 9
			if major == 9 {
				maximum = 5
			}
			for minor := 0; minor <= maximum; minor++ {
				values = append(values, fmt.Sprintf("v%d.%d", major, minor))
			}
		}
	case "mips", "mipsle", "mips64", "mips64le":
		values = append(values, "hardfloat", "softfloat")
	case "ppc64", "ppc64le":
		values = append(values, "power8", "power9", "power10")
	case "riscv64":
		values = append(values, "rva20u64", "rva22u64", "rva23u64")
	case "wasm":
		values = append(values, "")
	default:
		fatalf("architecture feature domain requested for unsupported GOARCH %s", goarch)
	}
	return uniqueSortedStrings(values)
}

func semanticToolTags(profile semanticBuildProfile) []string {
	value := profile.ArchitectureValue
	if value == "" {
		value = exactSemanticToolchain().architectureDefaults[semanticArchitectureVariable(profile.GOARCH)]
	}
	tags := append([]string{}, semanticExperimentTags(profile)...)
	tags = append(tags, semanticArchitectureToolTags(profile.GOARCH, value)...)
	return uniqueSortedStrings(tags)
}

func semanticArchitectureToolTags(goarch string, value string) []string {
	tags := []string{}
	switch goarch {
	case "386":
		if value != "sse2" && value != "softfloat" {
			fatalf("unsupported exact GO386 setting %q", value)
		}
		return []string{"386." + value}
	case "amd64":
		level, err := strconv.Atoi(strings.TrimPrefix(value, "v"))
		if err != nil || level < 1 || level > 4 || value != "v"+strconv.Itoa(level) {
			fatalf("unsupported exact GOAMD64 setting %q", value)
		}
		for index := 1; index <= level; index++ {
			tags = append(tags, "amd64.v"+strconv.Itoa(index))
		}
	case "arm":
		versionText, _, _ := strings.Cut(value, ",")
		version, err := strconv.Atoi(versionText)
		if err != nil || version < 5 || version > 7 {
			fatalf("unsupported exact GOARM setting %q", value)
		}
		for index := 5; index <= version; index++ {
			tags = append(tags, "arm."+strconv.Itoa(index))
		}
	case "arm64":
		version, _, _ := strings.Cut(value, ",")
		var major, minor int
		if _, err := fmt.Sscanf(version, "v%d.%d", &major, &minor); err != nil || (major != 8 && major != 9) || minor < 0 || minor > 9 || major == 9 && minor > 5 {
			fatalf("unsupported exact GOARM64 setting %q", value)
		}
		for index := 0; index <= minor; index++ {
			tags = append(tags, fmt.Sprintf("arm64.v%d.%d", major, index))
		}
		if major == 9 {
			for index := 0; index <= minor+5 && index <= 9; index++ {
				tags = append(tags, fmt.Sprintf("arm64.v8.%d", index))
			}
		}
	case "mips", "mipsle", "mips64", "mips64le":
		if value != "hardfloat" && value != "softfloat" {
			fatalf("unsupported exact %s setting %q", semanticArchitectureVariable(goarch), value)
		}
		tags = append(tags, goarch+"."+value)
	case "ppc64", "ppc64le":
		level, err := strconv.Atoi(strings.TrimPrefix(value, "power"))
		if err != nil || level < 8 || level > 10 || value != "power"+strconv.Itoa(level) {
			fatalf("unsupported exact GOPPC64 setting %q", value)
		}
		for index := 8; index <= level; index++ {
			tags = append(tags, goarch+".power"+strconv.Itoa(index))
		}
	case "riscv64":
		levels := map[string]int{"rva20u64": 20, "rva22u64": 22, "rva23u64": 23}
		level := levels[value]
		if level == 0 {
			fatalf("unsupported exact GORISCV64 setting %q", value)
		}
		tags = append(tags, "riscv64.rva20u64")
		if level >= 22 {
			tags = append(tags, "riscv64.rva22u64")
		}
		if level >= 23 {
			tags = append(tags, "riscv64.rva23u64")
		}
	case "wasm":
		if value != "" {
			fatalf("non-canonical Go 1.26 GOWASM setting %q; satconv and signext are always enabled", value)
		}
		tags = append(tags, "wasm.satconv", "wasm.signext")
	}
	return tags
}
