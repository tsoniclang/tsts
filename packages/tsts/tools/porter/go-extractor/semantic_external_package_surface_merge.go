package main

func mergedSemanticExternalPackageSurface(
	selections []semanticExternalPackageSelection,
	profileCount int,
	declarationMerged map[string]semanticUnitEvidence,
	unresolvedMerged map[string]map[int]bool,
	dependencyMerged map[string]semanticUnitEvidence,
	ordinaryDependencyMerged map[string]semanticUnitEvidence,
	activeDeclarationMerged map[string]semanticUnitEvidence,
) SemanticExternalPackageSurfaceReport {
	selectionIDs := make([]string, 0, len(selections))
	selectionByID := map[string]semanticExternalPackageSelection{}
	for index, selection := range selections {
		if index > 0 && selections[index-1].ObjectID >= selection.ObjectID {
			fatalf("external Go package surface selections are not strictly sorted at %s", selection.ObjectID)
		}
		selectionIDs = append(selectionIDs, selection.ObjectID)
		selectionByID[selection.ObjectID] = selection
	}
	declarations := mergedDependencyTypeDeclarations(declarationMerged)
	dependencies := mergedDependencyTypeDeclarations(dependencyMerged)
	coverage := map[string]map[int]int{}
	for _, declaration := range declarations {
		declarationObject := semanticExternalPackageSurfaceReportObject(declaration)
		if declarationObject == nil {
			fatalf("selected external Go package declaration has no exact object")
		}
		selection, ok := selectionByID[declarationObject.ID]
		if !ok {
			fatalf("unrequested external Go package declaration %s was emitted", declarationObject.ID)
		}
		if declaration.Kind != selection.Kind || declaration.PackagePath != selection.PackagePath || declarationObject.Name != selection.Name {
			fatalf("selected external Go package declaration %s changed exact identity", selection.ObjectID)
		}
		markExternalPackageSurfaceCoverage(coverage, selection.ObjectID, declaration.Profiles, profileCount, "declaration")
	}
	unresolved := []SemanticExternalPackageUnresolvedReport{}
	for _, objectID := range selectionIDs {
		profiles := sortedIntKeys(unresolvedMerged[objectID])
		if len(profiles) == 0 {
			continue
		}
		markExternalPackageSurfaceCoverage(coverage, objectID, profiles, profileCount, "unresolved selection")
		unresolved = append(unresolved, SemanticExternalPackageUnresolvedReport{ObjectID: objectID, Profiles: profiles})
	}
	for objectID := range unresolvedMerged {
		if _, ok := selectionByID[objectID]; !ok {
			fatalf("unrequested external Go package selection %s was marked unresolved", objectID)
		}
	}
	for _, objectID := range selectionIDs {
		if declarationMerged[objectID].variants == nil {
			fatalf("external Go package surface selection %s is absent from every supported semantic profile", objectID)
		}
		for profileIndex := 0; profileIndex < profileCount; profileIndex++ {
			if coverage[objectID][profileIndex] != 1 {
				fatalf("external Go package surface selection %s has %d outcomes in profile %d, expected exactly one", objectID, coverage[objectID][profileIndex], profileIndex)
			}
		}
	}
	validateExternalPackageDependencyOwnership(
		dependencies, selections, mergedDependencyTypeDeclarations(ordinaryDependencyMerged), activeDeclarationMerged,
	)
	return SemanticExternalPackageSurfaceReport{
		Selections: selectionIDs, UnresolvedSelections: unresolved,
		Declarations: declarations, DependencyTypeDeclarations: dependencies,
	}
}

func markExternalPackageSurfaceCoverage(coverage map[string]map[int]int, objectID string, profiles []int, profileCount int, role string) {
	if len(profiles) == 0 {
		fatalf("external Go package surface %s %s has no semantic profiles", role, objectID)
	}
	byProfile := coverage[objectID]
	if byProfile == nil {
		byProfile = map[int]int{}
		coverage[objectID] = byProfile
	}
	previous := -1
	for _, profileIndex := range profiles {
		if profileIndex < 0 || profileIndex >= profileCount || profileIndex <= previous {
			fatalf("external Go package surface %s %s has invalid profile list %v", role, objectID, profiles)
		}
		byProfile[profileIndex]++
		previous = profileIndex
	}
}

func validateExternalPackageDependencyOwnership(
	dependencies []SemanticDeclarationReport,
	selections []semanticExternalPackageSelection,
	ordinaryDependencies []SemanticDeclarationReport,
	activeDeclarations map[string]semanticUnitEvidence,
) {
	selectedRootTypes := map[string]bool{}
	for _, selection := range selections {
		if selection.Kind == "type" {
			selectedRootTypes[selection.ObjectID] = true
		}
	}
	ordinaryOwnership := semanticTypeProfileOwnership(ordinaryDependencies, "ordinary dependency")
	activeOwnership := activeSemanticTypeProfileOwnership(activeDeclarations)
	surfaceOwnership := map[string]map[int]bool{}
	for _, declaration := range dependencies {
		if declaration.Kind != "type" || declaration.Object == nil || declaration.Type == nil {
			fatalf("external Go package surface dependency closure contains a non-type declaration")
		}
		objectID := declaration.Object.ID
		if selectedRootTypes[objectID] {
			fatalf("selected external Go package root type %s entered its dependency closure", objectID)
		}
		registerSemanticTypeProfileOwnership(surfaceOwnership, objectID, declaration.Profiles, "external package surface dependency")
		for _, profileIndex := range declaration.Profiles {
			if ordinaryOwnership[objectID][profileIndex] {
				fatalf("external Go package surface dependency %s duplicates ordinary dependency profile %d", objectID, profileIndex)
			}
			if activeOwnership[objectID][profileIndex] {
				fatalf("external Go package surface dependency %s duplicates active local type profile %d", objectID, profileIndex)
			}
		}
	}
}

func semanticTypeProfileOwnership(declarations []SemanticDeclarationReport, role string) map[string]map[int]bool {
	ownership := map[string]map[int]bool{}
	for _, declaration := range declarations {
		if declaration.Kind != "type" || declaration.Object == nil || declaration.Type == nil {
			fatalf("%s declaration collection contains non-type evidence", role)
		}
		registerSemanticTypeProfileOwnership(ownership, declaration.Object.ID, declaration.Profiles, role)
	}
	return ownership
}

func activeSemanticTypeProfileOwnership(merged map[string]semanticUnitEvidence) map[string]map[int]bool {
	ownership := map[string]map[int]bool{}
	for _, evidence := range merged {
		for _, variant := range evidence.variants {
			if variant.report.Kind != "type" {
				continue
			}
			if variant.report.Object == nil || variant.report.Type == nil {
				fatalf("active local Go type has incomplete declaration evidence")
			}
			registerSemanticTypeProfileOwnership(ownership, variant.report.Object.ID, sortedIntKeys(variant.profiles), "active local type")
		}
	}
	return ownership
}

func registerSemanticTypeProfileOwnership(ownership map[string]map[int]bool, objectID string, profiles []int, role string) {
	byProfile := ownership[objectID]
	if byProfile == nil {
		byProfile = map[int]bool{}
		ownership[objectID] = byProfile
	}
	for _, profileIndex := range profiles {
		if byProfile[profileIndex] {
			fatalf("%s %s duplicates semantic profile %d", role, objectID, profileIndex)
		}
		byProfile[profileIndex] = true
	}
}
