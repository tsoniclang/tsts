package main

import (
	"encoding/json"
	"flag"
	"io/fs"
	"os"
	"path/filepath"
	"runtime"
	"sort"
	"strings"
)

func main() {
	root := flag.String("root", "", "path to a TypeScript-Go checkout")
	modulePath := flag.String("module", "github.com/microsoft/typescript-go", "Go module path")
	revision := flag.String("revision", "", "validated Git revision of the source checkout")
	extractionRequestStdin := flag.Bool("extraction-request-stdin", false, "read the exact semantic extraction request from standard input")
	flag.Parse()

	if *root == "" {
		fatalf("missing required -root")
	}
	if len(*revision) != 40 || strings.IndexFunc(*revision, func(value rune) bool { return value < '0' || value > '9' && value < 'a' || value > 'f' }) >= 0 {
		fatalf("-revision must be a lowercase 40-character Git object id")
	}
	if !*extractionRequestStdin {
		fatalf("missing required -extraction-request-stdin")
	}
	request := readSemanticExtractionRequest(os.Stdin, *modulePath)

	absRoot, err := filepath.Abs(*root)
	if err != nil {
		fatalf("resolve root: %v", err)
	}
	if info, err := os.Stat(absRoot); err != nil || !info.IsDir() {
		fatalf("root is not a directory: %s", absRoot)
	}

	snapshot := Snapshot{
		SchemaVersion: porterSnapshotSchemaVersion,
		SourceRoot:    filepath.ToSlash(absRoot),
		ModulePath:    *modulePath,
		GitRevision:   *revision,
		Environment: Environment{
			GoVersion: runtime.Version(),
			GOOS:      runtime.GOOS,
			GOARCH:    runtime.GOARCH,
		},
		Summary: Summary{
			UnitKindCounts: make(map[string]int),
			BuildTagCounts: make(map[string]int),
			PackageCounts:  make(map[string]int),
			StructTagKeys:  make(map[string]int),
		},
	}

	importPaths := map[string]bool{}
	err = filepath.WalkDir(absRoot, func(path string, entry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		name := entry.Name()
		if entry.IsDir() {
			if shouldSkipDir(name, path, absRoot) {
				return filepath.SkipDir
			}
			return nil
		}
		snapshot.Summary.FileCount++
		if !strings.HasSuffix(name, ".go") {
			return nil
		}
		report := scanGoFile(absRoot, path, *modulePath)
		snapshot.Files = append(snapshot.Files, report)
		snapshot.Summary.GoFileCount++
		snapshot.Summary.LineCount += report.LineCount
		if report.Generated {
			snapshot.Summary.GeneratedFiles++
		}
		snapshot.Summary.PackageCounts[report.PackageName]++
		importPaths[report.ImportPath] = true
		for _, tag := range append(report.BuildTags, report.ImplicitBuildTags...) {
			snapshot.Summary.BuildTagCounts[tag]++
		}
		for _, unit := range report.Units {
			snapshot.Summary.UnitCount++
			snapshot.Summary.UnitKindCounts[unit.Kind]++
			accumulateUnitStructTags(&snapshot.Summary, unit)
		}
		return nil
	})
	if err != nil {
		fatalf("walk root: %v", err)
	}
	applyGoSemanticEvidence(absRoot, *modulePath, &snapshot, request.semanticFiles, request.externalPackageSurfaceSelections)

	sort.Slice(snapshot.Files, func(left, right int) bool {
		return snapshot.Files[left].Path < snapshot.Files[right].Path
	})
	snapshot.Summary.ImportPathCount = len(importPaths)

	encoder := json.NewEncoder(os.Stdout)
	if err := encoder.Encode(snapshot); err != nil {
		fatalf("encode snapshot: %v", err)
	}
}

func accumulateUnitStructTags(summary *Summary, unit UnitReport) {
	if len(unit.Members) > 0 {
		accumulateMemberStructTags(summary, unit.Members)
	} else {
		accumulateTypeExpressionStructTags(summary, unit.TypeExpression)
	}
	accumulateTypeExpressionStructTags(summary, unit.ReceiverType)
	for _, parameter := range append(append([]ParamReport{}, unit.Parameters...), unit.Results...) {
		accumulateTypeExpressionStructTags(summary, parameter.Type)
	}
	for _, spec := range unit.ValueSpecs {
		accumulateTypeExpressionStructTags(summary, spec.Type)
	}
}

func accumulateMemberStructTags(summary *Summary, members []MemberReport) {
	for _, member := range members {
		if member.StructTag != nil {
			summary.StructTagCount++
			for _, value := range member.TagValues {
				summary.StructTagKeys[value.Key]++
			}
		}
		accumulateTypeExpressionStructTags(summary, member.TypeExpr)
	}
}

func accumulateTypeExpressionStructTags(summary *Summary, expression *TypeExprReport) {
	if expression == nil {
		return
	}
	accumulateMemberStructTags(summary, expression.Members)
	for _, child := range []*TypeExprReport{expression.Element, expression.Key, expression.Value, expression.Left, expression.Right} {
		accumulateTypeExpressionStructTags(summary, child)
	}
	for index := range expression.TypeArgs {
		accumulateTypeExpressionStructTags(summary, &expression.TypeArgs[index])
	}
	for _, parameter := range append(append([]ParamReport{}, expression.Parameters...), expression.Results...) {
		accumulateTypeExpressionStructTags(summary, parameter.Type)
	}
}
