package main

import (
	"go/ast"
	"sort"
	"strconv"
)

func importsOf(parsed *ast.File, packageNames map[string]string, sourcePath string) []ImportReport {
	reports := []ImportReport{}
	for _, imported := range parsed.Imports {
		path, err := strconv.Unquote(imported.Path.Value)
		if err != nil {
			fatalf("invalid Go import path in %s: %v", sourcePath, err)
		}
		report := ImportReport{Path: path, PackageName: packageNames[path]}
		if imported.Name != nil {
			report.Name = imported.Name.Name
		}
		reports = append(reports, report)
	}
	sort.Slice(reports, func(left, right int) bool {
		if reports[left].Path == reports[right].Path {
			return reports[left].Name < reports[right].Name
		}
		return reports[left].Path < reports[right].Path
	})
	return reports
}
