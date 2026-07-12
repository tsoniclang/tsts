package main

import (
	"encoding/json"
	"fmt"
	"go/ast"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"

	"golang.org/x/tools/go/packages"
)

type semanticUnitEvidence struct {
	variants map[string]semanticVariantEvidence
}

type semanticVariantEvidence struct {
	report   SemanticDeclarationReport
	profiles map[int]bool
}

type semanticProfileLoad struct {
	declarations               map[string]SemanticDeclarationReport
	dependencyTypeDeclarations map[string]SemanticDeclarationReport
	importNames                []semanticImportNameEvidence
	report                     SemanticProfileReport
	modules                    []SemanticModuleReport
}

type declarationCheckedPackage struct {
	metadata *packages.Package
	files    []*ast.File
	fileSet  *token.FileSet
	info     *types.Info
	types    *types.Package
	blanks   map[*ast.Ident]bool
}

type declarationPackageChecker struct {
	root             string
	modulePath       string
	profile          semanticBuildProfile
	fileSet          *token.FileSet
	localByID        map[string]*packages.Package
	exportFiles      map[string]string
	checkedByID      map[string]*declarationCheckedPackage
	checkingByID     map[string]bool
	externalImporter types.ImporterFrom
	externalByPath   map[string]*types.Package
}

func applyGoSemanticEvidence(root string, modulePath string, snapshot *Snapshot, semanticFiles map[string]bool) {
	plan := semanticBuildProfiles(root, snapshot, semanticFiles)
	locations := snapshotSemanticUnitLocations(snapshot)
	requiredFiles := stringSet(plan.RequiredFiles)
	requiredUnits := requiredSemanticUnitIDs(snapshot, requiredFiles)
	merged := map[string]semanticUnitEvidence{}
	dependencyTypeMerged := map[string]semanticUnitEvidence{}
	methodSetSignatures := map[string]SemanticMethodSetSignatureReport{}
	resolvedImportNames := map[string]map[string]string{}
	coveredFiles := map[string]bool{}
	moduleGraph := map[string]SemanticModuleReport{}
	verifiedModules := map[string]semanticModuleContentSeal{}
	profileReports := []SemanticProfileReport{}
	moduleSelections := exactSemanticModuleSelections(root)
	for profileIndex, profile := range plan.Profiles {
		loaded := loadSemanticProfile(root, modulePath, profile, locations, requiredFiles, moduleSelections, verifiedModules)
		collectSemanticMethodSetSignatures(loaded.declarations, methodSetSignatures)
		collectSemanticMethodSetSignatures(loaded.dependencyTypeDeclarations, methodSetSignatures)
		mergeSemanticImportNames(resolvedImportNames, loaded.importNames)
		profileReports = append(profileReports, loaded.report)
		for _, file := range loaded.report.CoveredFiles {
			coveredFiles[file] = true
		}
		for _, module := range loaded.modules {
			moduleGraph[canonicalSemanticModule(module)] = module
		}
		for unitID, report := range loaded.declarations {
			canonical := canonicalSemanticDeclaration(report)
			evidence := merged[unitID]
			if evidence.variants == nil {
				evidence.variants = map[string]semanticVariantEvidence{}
			}
			variant, ok := evidence.variants[canonical]
			if !ok {
				variant = semanticVariantEvidence{report: report, profiles: map[int]bool{}}
			}
			variant.profiles[profileIndex] = true
			evidence.variants[canonical] = variant
			merged[unitID] = evidence
		}
		for objectID, report := range loaded.dependencyTypeDeclarations {
			canonical := canonicalSemanticDeclaration(report)
			evidence := dependencyTypeMerged[objectID]
			if evidence.variants == nil {
				evidence.variants = map[string]semanticVariantEvidence{}
			}
			variant, ok := evidence.variants[canonical]
			if !ok {
				variant = semanticVariantEvidence{report: report, profiles: map[int]bool{}}
			}
			variant.profiles[profileIndex] = true
			evidence.variants[canonical] = variant
			dependencyTypeMerged[objectID] = evidence
		}
	}
	if missing := setDifference(requiredFiles, coveredFiles); len(missing) > 0 {
		fatalf("Go declaration package loading did not cover required files: %s", strings.Join(missing, ", "))
	}
	if missing := setDifference(requiredUnits, semanticEvidenceKeySet(merged)); len(missing) > 0 {
		fatalf("Go declaration package loading did not cover required units: %s", strings.Join(missing, ", "))
	}
	applySemanticImportNames(snapshot, resolvedImportNames, stringSet(plan.ExcludedFiles))
	for fileIndex := range snapshot.Files {
		file := &snapshot.Files[fileIndex]
		for unitIndex := range file.Units {
			unit := &file.Units[unitIndex]
			if !semanticRequiredUnitKind(unit.Kind) {
				continue
			}
			evidence, ok := merged[unit.ID]
			if !ok {
				if stringSliceContains(plan.ExcludedFiles, file.Path) {
					continue
				}
				fatalf("required Go declaration evidence disappeared for %s", unit.ID)
			}
			variantKeys := make([]string, 0, len(evidence.variants))
			for canonical := range evidence.variants {
				variantKeys = append(variantKeys, canonical)
			}
			sort.Strings(variantKeys)
			unit.Semantic = make([]SemanticDeclarationReport, 0, len(variantKeys))
			for _, canonical := range variantKeys {
				variant := evidence.variants[canonical]
				variant.report.Profiles = sortedIntKeys(variant.profiles)
				unit.Semantic = append(unit.Semantic, variant.report)
			}
		}
	}
	modules := make([]SemanticModuleReport, 0, len(moduleGraph))
	for _, module := range moduleGraph {
		modules = append(modules, module)
	}
	reverifySemanticModuleContents(verifiedModules)
	sort.Slice(modules, func(left, right int) bool {
		return canonicalSemanticModule(modules[left]) < canonicalSemanticModule(modules[right])
	})
	toolchain := exactSemanticToolchain()
	dependencyTypeDeclarations := mergedDependencyTypeDeclarations(dependencyTypeMerged)
	methodSetSignatureReports := sortedSemanticMethodSetSignatures(methodSetSignatures)
	snapshot.Semantic = SemanticEvidenceReport{
		Toolchain: toolchain.goVersion, ToolchainExecutable: toolchain.executable, ToolchainHash: toolchain.executableHash,
		GOROOT: toolchain.goRoot, GOROOTHash: toolchain.goRootSeal.SHA256,
		GOROOTHashContract: toolchain.goRootSeal.Contract, GOROOTEntryCount: toolchain.goRootSeal.EntryCount,
		GOROOTFileCount: toolchain.goRootSeal.FileCount, GOROOTDirectoryCount: toolchain.goRootSeal.DirectoryCount,
		GOROOTSymlinkCount: toolchain.goRootSeal.SymlinkCount, GOROOTBytes: toolchain.goRootSeal.Bytes,
		Compiler: toolchain.compiler, ReleaseTags: append([]string{}, toolchain.releaseTags...), ModulePath: modulePath,
		RequiredFiles: plan.RequiredFiles, CoveredFiles: sortedBoolKeys(coveredFiles), ExcludedFiles: plan.ExcludedFiles,
		Profiles: profileReports, UnsupportedProfiles: plan.UnsupportedProfiles, ModuleGraph: modules,
		MethodSetSignatures:        methodSetSignatureReports,
		DependencyTypeDeclarations: dependencyTypeDeclarations,
	}
}

func collectSemanticMethodSetSignatures(declarations map[string]SemanticDeclarationReport, collected map[string]SemanticMethodSetSignatureReport) {
	for _, declaration := range declarations {
		if declaration.Type == nil {
			continue
		}
		for _, selection := range append(append([]SemanticMethodSelectionReport{}, declaration.Type.ValueMethodSet...), declaration.Type.PointerMethodSet...) {
			if selection.Signature == nil {
				fatalf("Go method selection %s has no exact selected signature", selection.MethodID)
			}
			expectedID := semanticMethodSetSignatureID(selection.MethodID, selection.Signature)
			if selection.SignatureID != expectedID {
				fatalf("Go method selection %s has inconsistent selected signature identity", selection.MethodID)
			}
			report := SemanticMethodSetSignatureReport{ID: selection.SignatureID, MethodID: selection.MethodID, Signature: selection.Signature}
			if previous, exists := collected[report.ID]; exists {
				if canonicalMethodSetSignature(previous) != canonicalMethodSetSignature(report) {
					fatalf("Go method-set signature identity %s has conflicting exact signatures", report.ID)
				}
				continue
			}
			collected[report.ID] = report
		}
	}
}

func sortedSemanticMethodSetSignatures(collected map[string]SemanticMethodSetSignatureReport) []SemanticMethodSetSignatureReport {
	ids := make([]string, 0, len(collected))
	for id := range collected {
		ids = append(ids, id)
	}
	sort.Strings(ids)
	reports := make([]SemanticMethodSetSignatureReport, 0, len(ids))
	for _, id := range ids {
		reports = append(reports, collected[id])
	}
	return reports
}

func canonicalMethodSetSignature(report SemanticMethodSetSignatureReport) string {
	encoded, err := json.Marshal(report)
	if err != nil {
		fatalf("encode selected Go method signature %s: %v", report.ID, err)
	}
	return string(encoded)
}

func loadSemanticProfile(root string, modulePath string, profile semanticBuildProfile, locations map[string]string, requiredFiles map[string]bool, moduleSelections map[string]exactSemanticModuleSelection, verifiedModules map[string]semanticModuleContentSeal) semanticProfileLoad {
	verifySemanticGoResolution()
	buildFlags := semanticBuildFlags(profile)
	config := &packages.Config{
		Mode: packages.NeedName | packages.NeedFiles | packages.NeedCompiledGoFiles |
			packages.NeedImports | packages.NeedDeps | packages.NeedModule | packages.NeedForTest,
		Dir: root, Env: semanticEnvironment(profile), Tests: true, BuildFlags: buildFlags,
	}
	patterns := semanticPackagePatterns(root, profile, requiredFiles)
	loaded, err := packages.Load(config, patterns...)
	if err != nil {
		fatalf("load Go declaration metadata profile %s: %v", semanticProfileKey(profile), err)
	}
	graph := semanticPackageGraph(loaded)
	validateSemanticPackages(root, modulePath, loaded, graph)
	validateSemanticProfileFileSelection(root, profile, graph, requiredFiles)
	checker := newDeclarationPackageChecker(root, modulePath, profile, graph)
	checked := checker.checkRequiredPackages(requiredFiles)
	declarations, covered, referencedTypes := semanticDeclarations(root, modulePath, checked, locations, requiredFiles)
	dependencyTypeDeclarations := semanticDependencyTypeDeclarations(referencedTypes, activeSemanticTypeObjectIDs(declarations))
	return semanticProfileLoad{
		declarations:               declarations,
		dependencyTypeDeclarations: dependencyTypeDeclarations,
		importNames:                semanticProfileImportNames(root, graph),
		report: SemanticProfileReport{
			GOOS: profile.GOOS, GOARCH: profile.GOARCH, CgoEnabled: profile.CgoEnabled,
			Architecture:      semanticArchitectureSetting(profile),
			Experiments:       strings.Join(semanticExperimentNames(profile), ","),
			ExperimentSetting: profile.ExperimentSetting,
			BuildTags:         append([]string{}, profile.BuildTags...), BuildFlags: buildFlags,
			ToolTags:    semanticToolTags(profile),
			Environment: semanticEnvironment(profile),
			PackageIDs:  semanticPackageIDs(graph, modulePath), CoveredFiles: sortedBoolKeys(covered),
		},
		modules: semanticModuleGraph(graph, moduleSelections, verifiedModules),
	}
}

func newDeclarationPackageChecker(root string, modulePath string, profile semanticBuildProfile, graph []*packages.Package) *declarationPackageChecker {
	checker := &declarationPackageChecker{
		root: root, modulePath: modulePath, profile: profile, fileSet: token.NewFileSet(),
		localByID:   map[string]*packages.Package{},
		exportFiles: map[string]string{}, checkedByID: map[string]*declarationCheckedPackage{}, checkingByID: map[string]bool{},
		externalByPath: map[string]*types.Package{},
	}
	for _, metadata := range graph {
		if metadata == nil {
			continue
		}
		if semanticSyntheticTestMain(root, metadata) {
			continue
		}
		if !packageBelongsToModule(metadata, modulePath) {
			continue
		}
		checker.localByID[metadata.ID] = metadata
	}
	checker.exportFiles = loadExternalExportFiles(root, modulePath, profile, graph)
	gcImporter := importer.ForCompiler(checker.fileSet, "gc", func(path string) (io.ReadCloser, error) {
		exportFile := checker.exportFiles[path]
		if exportFile == "" {
			return nil, fmt.Errorf("no exact export data for external Go package %s", path)
		}
		return os.Open(exportFile)
	})
	importerFrom, ok := gcImporter.(types.ImporterFrom)
	if !ok {
		fatalf("Go gc export importer does not implement types.ImporterFrom")
	}
	checker.externalImporter = importerFrom
	return checker
}

func loadExternalExportFiles(root string, modulePath string, profile semanticBuildProfile, graph []*packages.Package) map[string]string {
	patterns := map[string]bool{}
	for _, metadata := range graph {
		if metadata == nil || !packageBelongsToModule(metadata, modulePath) {
			continue
		}
		for importPath, imported := range metadata.Imports {
			if importPath != "unsafe" && !packageBelongsToModule(imported, modulePath) {
				patterns[importPath] = true
			}
		}
	}
	if len(patterns) == 0 {
		return map[string]string{}
	}
	verifySemanticGoResolution()
	buildFlags := semanticBuildFlags(profile)
	config := &packages.Config{
		Mode: packages.NeedName | packages.NeedImports | packages.NeedDeps | packages.NeedExportFile | packages.NeedModule,
		Dir:  root, Env: semanticEnvironment(profile), BuildFlags: buildFlags,
	}
	loaded, err := packages.Load(config, sortedBoolKeys(patterns)...)
	if err != nil {
		fatalf("load external Go export metadata under %s: %v", semanticProfileKey(profile), err)
	}
	exports := map[string]string{}
	for _, metadata := range semanticPackageGraph(loaded) {
		for _, packageError := range metadata.Errors {
			fatalf("external Go package %s has package error kind %d: %s", metadata.PkgPath, packageError.Kind, packageError.Msg)
		}
		if metadata.PkgPath == "unsafe" {
			continue
		}
		if metadata.ExportFile == "" {
			fatalf("external Go package %s has no exact compiled export data under %s", metadata.PkgPath, semanticProfileKey(profile))
		}
		if previous := exports[metadata.PkgPath]; previous != "" && previous != metadata.ExportFile {
			fatalf("external Go package %s has conflicting export files %s and %s", metadata.PkgPath, previous, metadata.ExportFile)
		}
		exports[metadata.PkgPath] = metadata.ExportFile
	}
	return exports
}

func (checker *declarationPackageChecker) checkRequiredPackages(requiredFiles map[string]bool) []*declarationCheckedPackage {
	metadata := []*packages.Package{}
	for _, candidate := range checker.localByID {
		if declarationMetadataContainsRequiredFile(checker.root, candidate, requiredFiles) {
			metadata = append(metadata, candidate)
		}
	}
	sort.Slice(metadata, func(left, right int) bool { return metadata[left].ID < metadata[right].ID })
	checked := []*declarationCheckedPackage{}
	for _, candidate := range metadata {
		checked = append(checked, checker.check(candidate))
	}
	return checked
}

func declarationMetadataContainsRequiredFile(root string, metadata *packages.Package, requiredFiles map[string]bool) bool {
	for _, filename := range metadata.CompiledGoFiles {
		if relative, ok := relativeSemanticPath(root, filename); ok && requiredFiles[relative] {
			return true
		}
	}
	return false
}

func (checker *declarationPackageChecker) check(metadata *packages.Package) *declarationCheckedPackage {
	if checked := checker.checkedByID[metadata.ID]; checked != nil {
		return checked
	}
	if checker.checkingByID[metadata.ID] {
		fatalf("Go declaration-only import cycle reached package %s (%s)", metadata.PkgPath, metadata.ID)
	}
	checker.checkingByID[metadata.ID] = true
	defer delete(checker.checkingByID, metadata.ID)
	files := make([]*ast.File, 0, len(metadata.CompiledGoFiles))
	for _, filename := range metadata.CompiledGoFiles {
		file, err := parser.ParseFile(checker.fileSet, filename, nil, parser.ParseComments)
		if err != nil {
			fatalf("parse Go declaration file %s for profile %s: %v", filename, semanticProfileKey(checker.profile), err)
		}
		files = append(files, file)
	}
	pruneDeclarationOnlyImports(checker, metadata, files)
	blanks := renameBlankValueDeclarations(files, metadata)
	info := newDeclarationTypeInfo()
	configuration := checker.declarationTypeConfig(metadata, false)
	typedPackage, err := configuration.Check(metadata.PkgPath, checker.fileSet, files, info)
	if err != nil {
		fatalf("declaration-only Go type check failed for %s (%s) under %s: %v", metadata.PkgPath, metadata.ID, semanticProfileKey(checker.profile), err)
	}
	checked := &declarationCheckedPackage{
		metadata: metadata, files: files, fileSet: checker.fileSet, info: info, types: typedPackage, blanks: blanks,
	}
	checker.checkedByID[metadata.ID] = checked
	return checked
}

func newDeclarationTypeInfo() *types.Info {
	return &types.Info{
		Types: map[ast.Expr]types.TypeAndValue{}, Defs: map[*ast.Ident]types.Object{}, Uses: map[*ast.Ident]types.Object{},
		Implicits: map[ast.Node]types.Object{}, Instances: map[*ast.Ident]types.Instance{}, Selections: map[*ast.SelectorExpr]*types.Selection{},
	}
}

func (checker *declarationPackageChecker) declarationTypeConfig(metadata *packages.Package, disableUnusedImportCheck bool) *types.Config {
	sizes := types.SizesFor(exactSemanticToolchain().compiler, checker.profile.GOARCH)
	if sizes == nil {
		fatalf("exact Go type sizes are unavailable for compiler=%s GOARCH=%s", exactSemanticToolchain().compiler, checker.profile.GOARCH)
	}
	return &types.Config{
		GoVersion: moduleGoVersion(metadata.Module), IgnoreFuncBodies: true, DisableUnusedImportCheck: disableUnusedImportCheck,
		Importer: declarationPackageImporter{checker: checker, metadata: metadata}, Sizes: sizes,
	}
}

func moduleGoVersion(module *packages.Module) string {
	if module == nil || module.GoVersion == "" {
		return ""
	}
	return "go" + strings.TrimPrefix(module.GoVersion, "go")
}

type declarationPackageImporter struct {
	checker  *declarationPackageChecker
	metadata *packages.Package
}

func (importer declarationPackageImporter) Import(path string) (*types.Package, error) {
	return importer.ImportFrom(path, "", 0)
}

func (importer declarationPackageImporter) ImportFrom(path string, directory string, mode types.ImportMode) (*types.Package, error) {
	dependency := importer.metadata.Imports[path]
	if dependency != nil && packageBelongsToModule(dependency, importer.checker.modulePath) {
		local := importer.checker.localByID[dependency.ID]
		if local == nil {
			return nil, fmt.Errorf("exact local Go import edge %s -> %s (%s) is absent from the loaded graph", importer.metadata.ID, path, dependency.ID)
		}
		return importer.checker.check(local).types, nil
	}
	return importer.checker.importExternalPackage(path, directory, mode)
}

func (checker *declarationPackageChecker) importExternalPackage(path string, directory string, mode types.ImportMode) (*types.Package, error) {
	if path == "unsafe" {
		return types.Unsafe, nil
	}
	if loaded := checker.externalByPath[path]; loaded != nil {
		return loaded, nil
	}
	loaded, err := checker.externalImporter.ImportFrom(path, directory, mode)
	if err != nil {
		return nil, err
	}
	if loaded == nil || loaded.Path() != path {
		return nil, fmt.Errorf("external Go import %s resolved to package %v", path, loaded)
	}
	checker.externalByPath[path] = loaded
	return loaded, nil
}

func renameBlankValueDeclarations(files []*ast.File, metadata *packages.Package) map[*ast.Ident]bool {
	used := map[string]bool{}
	for _, file := range files {
		for _, imported := range file.Imports {
			if imported.Name != nil {
				if imported.Name.Name != "." && imported.Name.Name != "_" {
					used[imported.Name.Name] = true
				}
				continue
			}
			path, err := strconv.Unquote(imported.Path.Value)
			if err != nil {
				fatalf("invalid Go import path %s: %v", imported.Path.Value, err)
			}
			if dependency := metadata.Imports[path]; dependency != nil {
				used[dependency.Name] = true
			}
		}
		for _, declaration := range file.Decls {
			switch typed := declaration.(type) {
			case *ast.FuncDecl:
				used[typed.Name.Name] = true
			case *ast.GenDecl:
				for _, specification := range typed.Specs {
					switch value := specification.(type) {
					case *ast.TypeSpec:
						used[value.Name.Name] = true
					case *ast.ValueSpec:
						for _, name := range value.Names {
							used[name.Name] = true
						}
					}
				}
			}
		}
	}
	blanks := map[*ast.Ident]bool{}
	ordinal := 0
	for _, file := range files {
		for _, declaration := range file.Decls {
			general, ok := declaration.(*ast.GenDecl)
			if !ok || (general.Tok != token.CONST && general.Tok != token.VAR) {
				continue
			}
			for _, specification := range general.Specs {
				value, ok := specification.(*ast.ValueSpec)
				if !ok {
					continue
				}
				for _, name := range value.Names {
					if name.Name != "_" {
						continue
					}
					for {
						candidate := "__tstsPorterBlankDeclaration" + itoa(ordinal)
						ordinal++
						if used[candidate] {
							continue
						}
						used[candidate] = true
						name.Name = candidate
						blanks[name] = true
						break
					}
				}
			}
		}
	}
	return blanks
}

func semanticPackagePatterns(root string, profile semanticBuildProfile, requiredFiles map[string]bool) []string {
	covered := profileCoveredFiles(root, profile, requiredFiles)
	patterns := map[string]bool{}
	for _, relative := range covered {
		directory := filepath.ToSlash(filepath.Dir(relative))
		if directory == "." {
			patterns["."] = true
		} else {
			patterns["./"+directory] = true
		}
	}
	output := sortedBoolKeys(patterns)
	if len(output) == 0 {
		fatalf("declaration profile %s does not own any required Go file", semanticProfileKey(profile))
	}
	return output
}

func relativeSemanticPath(root string, filename string) (string, bool) {
	relative, err := filepath.Rel(root, filename)
	if err != nil || relative == ".." || strings.HasPrefix(relative, ".."+string(filepath.Separator)) {
		return "", false
	}
	return filepath.ToSlash(relative), true
}

func canonicalSemanticDeclaration(value SemanticDeclarationReport) string {
	copyValue := value
	copyValue.Profiles = nil
	encoded, err := json.Marshal(copyValue)
	if err != nil {
		panic(err)
	}
	return string(encoded)
}

func semanticEvidenceKeySet(values map[string]semanticUnitEvidence) map[string]bool {
	output := map[string]bool{}
	for key := range values {
		output[key] = true
	}
	return output
}

func stringSliceContains(values []string, expected string) bool {
	index := sort.SearchStrings(values, expected)
	return index < len(values) && values[index] == expected
}

func sortedIntKeys(values map[int]bool) []int {
	output := make([]int, 0, len(values))
	for key := range values {
		output = append(output, key)
	}
	sort.Ints(output)
	return output
}
