package main

import (
	"go/ast"
	"go/constant"
	"go/importer"
	"go/parser"
	"go/token"
	"go/types"
	"sort"
	"strings"
)

type constantDefinition struct {
	fileIndex   int
	unitIndex   int
	specIndex   int
	ordinal     int
	name        string
	expression  string
	constIndex  int
	parsed      ast.Expr
	state       uint8
	value       constant.Value
	reason      string
	integerType *integerConstantType
}

type integerConstantType struct {
	bits     uint
	unsigned bool
}

const (
	constantUnresolved uint8 = iota
	constantResolving
	constantResolved
)

func resolveSnapshotConstantValues(snapshot *Snapshot) {
	definitions := []*constantDefinition{}
	definitionsByName := map[string][]*constantDefinition{}
	packageNames := map[string]string{}
	externalConstants := map[string]resolvedExternalConstant{}

	for fileIndex := range snapshot.Files {
		file := &snapshot.Files[fileIndex]
		if !strings.HasSuffix(file.PackageName, "_test") {
			if previous, exists := packageNames[file.ImportPath]; !exists || previous == "main" {
				packageNames[file.ImportPath] = file.PackageName
			} else if previous != file.PackageName && file.PackageName != "main" {
				fatalf("package name drift for %s: %s vs %s", file.ImportPath, previous, file.PackageName)
			}
		}
	}
	integerTypes := collectIntegerConstantTypes(snapshot, packageNames)

	for fileIndex := range snapshot.Files {
		file := &snapshot.Files[fileIndex]
		for unitIndex := range file.Units {
			unit := &file.Units[unitIndex]
			if unit.Kind != "constGroup" {
				continue
			}
			for specIndex := range unit.ValueSpecs {
				spec := &unit.ValueSpecs[specIndex]
				spec.ConstantValues = make([]ConstantValueReport, len(spec.Names))
				for ordinal, name := range spec.Names {
					definition := &constantDefinition{
						fileIndex:   fileIndex,
						unitIndex:   unitIndex,
						specIndex:   specIndex,
						ordinal:     ordinal,
						name:        name,
						constIndex:  spec.ConstIndex,
						integerType: integerConstantTypeForExpression(spec.Type, file, packageNames, integerTypes),
					}
					valueIndex := ordinal
					if len(spec.Values) == 1 {
						valueIndex = 0
					}
					if valueIndex >= len(spec.Values) {
						definition.reason = "missing constant initializer"
					} else {
						definition.expression = spec.Values[valueIndex]
						parsed, err := parser.ParseExpr(definition.expression)
						if err != nil {
							definition.reason = "parse constant initializer: " + err.Error()
						} else {
							definition.parsed = parsed
						}
					}
					definitions = append(definitions, definition)
					if name != "_" {
						key := constantScopeKey(file) + "::" + name
						definitionsByName[key] = append(definitionsByName[key], definition)
					}
				}
			}
		}
	}

	var resolveDefinition func(*constantDefinition) (constant.Value, string)
	resolveDefinition = func(definition *constantDefinition) (constant.Value, string) {
		switch definition.state {
		case constantResolved:
			return definition.value, definition.reason
		case constantResolving:
			return nil, "constant dependency cycle through " + definition.name
		}
		definition.state = constantResolving
		if definition.parsed == nil {
			definition.state = constantResolved
			return nil, definition.reason
		}

		file := &snapshot.Files[definition.fileIndex]
		environment := map[string]constant.Value{}
		var inferredIntegerType *integerConstantType
		for _, reference := range constantExpressionReferences(definition.parsed) {
			importPath, name, ok := resolveConstantReference(file, packageNames, reference)
			if !ok {
				definition.reason = "unresolved constant reference " + reference
				definition.state = constantResolved
				return nil, definition.reason
			}
			candidates := definitionsByName[importPath+"::"+name]
			if len(candidates) == 0 {
				value, reason := resolveExternalConstant(importPath, name, externalConstants)
				if value == nil || value.Kind() == constant.Unknown {
					definition.reason = "unresolved constant reference " + reference + ": " + reason
					definition.state = constantResolved
					return nil, definition.reason
				}
				environment[reference] = value
				continue
			}
			var selected constant.Value
			var selectedIntegerType *integerConstantType
			selectedTypeSet := false
			for _, candidate := range candidates {
				value, reason := resolveDefinition(candidate)
				if value == nil || value.Kind() == constant.Unknown {
					definition.reason = "unresolved constant reference " + reference + ": " + reason
					definition.state = constantResolved
					return nil, definition.reason
				}
				if selected == nil {
					selected = value
				} else if !constantValuesEqual(selected, value) {
					definition.reason = "build-dependent constant reference " + reference
					definition.state = constantResolved
					return nil, definition.reason
				}
				if !selectedTypeSet {
					selectedIntegerType = candidate.integerType
					selectedTypeSet = true
				} else if !integerConstantTypesEqualNullable(selectedIntegerType, candidate.integerType) {
					definition.reason = "build-dependent constant type for " + reference
					definition.state = constantResolved
					return nil, definition.reason
				}
			}
			if selectedIntegerType != nil {
				if inferredIntegerType == nil {
					inferredIntegerType = selectedIntegerType
				} else if !integerConstantTypesEqual(inferredIntegerType, selectedIntegerType) {
					definition.reason = "conflicting typed constant operands for " + reference
					definition.state = constantResolved
					return nil, definition.reason
				}
			}
			environment[reference] = selected
		}

		definition.value, definition.reason = evaluateConstantExpression(
			definition.parsed,
			constant.MakeInt64(int64(definition.constIndex)),
			environment,
		)
		if definition.integerType == nil {
			definition.integerType = inferredIntegerType
		}
		if definition.reason == "" && definition.integerType != nil {
			definition.value, definition.reason = applyIntegerConstantType(definition.value, definition.integerType)
		}
		definition.state = constantResolved
		return definition.value, definition.reason
	}

	for _, definition := range definitions {
		value, reason := resolveDefinition(definition)
		spec := &snapshot.Files[definition.fileIndex].Units[definition.unitIndex].ValueSpecs[definition.specIndex]
		spec.ConstantValues[definition.ordinal] = constantValueReport(value, reason)
	}
}

func collectIntegerConstantTypes(snapshot *Snapshot, packageNames map[string]string) map[string]*integerConstantType {
	typesByName := map[string]*integerConstantType{}
	for pass := 0; pass <= len(snapshot.Files); pass++ {
		progress := false
		for fileIndex := range snapshot.Files {
			file := &snapshot.Files[fileIndex]
			for unitIndex := range file.Units {
				unit := &file.Units[unitIndex]
				if unit.Kind != "type" || unit.TypeExpression == nil {
					continue
				}
				key := constantScopeKey(file) + "::" + unit.Name
				if typesByName[key] != nil {
					continue
				}
				integerType := integerConstantTypeForExpression(unit.TypeExpression, file, packageNames, typesByName)
				if integerType != nil {
					typesByName[key] = integerType
					progress = true
				}
			}
		}
		if !progress {
			break
		}
	}
	return typesByName
}

func integerConstantTypeForExpression(expr *TypeExprReport, file *FileReport, packageNames map[string]string, typesByName map[string]*integerConstantType) *integerConstantType {
	if expr == nil {
		return nil
	}
	if expr.Kind == "paren" {
		return integerConstantTypeForExpression(expr.Element, file, packageNames, typesByName)
	}
	if expr.Kind == "ident" {
		if primitive := primitiveIntegerConstantType(expr.Name); primitive != nil {
			return primitive
		}
		return typesByName[constantScopeKey(file)+"::"+expr.Name]
	}
	if expr.Kind == "selector" {
		reference := expr.Package + "." + expr.Name
		importPath, name, ok := resolveConstantReference(file, packageNames, reference)
		if ok {
			return typesByName[importPath+"::"+name]
		}
	}
	return nil
}

func primitiveIntegerConstantType(name string) *integerConstantType {
	switch name {
	case "int8":
		return &integerConstantType{bits: 8}
	case "uint8", "byte":
		return &integerConstantType{bits: 8, unsigned: true}
	case "int16":
		return &integerConstantType{bits: 16}
	case "uint16":
		return &integerConstantType{bits: 16, unsigned: true}
	case "int32", "rune":
		return &integerConstantType{bits: 32}
	case "uint32":
		return &integerConstantType{bits: 32, unsigned: true}
	case "int", "int64":
		return &integerConstantType{bits: 64}
	case "uint", "uint64", "uintptr":
		return &integerConstantType{bits: 64, unsigned: true}
	default:
		return nil
	}
}

func integerConstantTypesEqual(left *integerConstantType, right *integerConstantType) bool {
	return left.bits == right.bits && left.unsigned == right.unsigned
}

func integerConstantTypesEqualNullable(left *integerConstantType, right *integerConstantType) bool {
	if left == nil || right == nil {
		return left == nil && right == nil
	}
	return integerConstantTypesEqual(left, right)
}

func applyIntegerConstantType(value constant.Value, integerType *integerConstantType) (constant.Value, string) {
	if value == nil || value.Kind() != constant.Int {
		return value, ""
	}
	modulus := constant.Shift(constant.MakeInt64(1), token.SHL, integerType.bits)
	wrapped := constant.BinaryOp(value, token.REM, modulus)
	if constant.Sign(wrapped) < 0 {
		wrapped = constant.BinaryOp(wrapped, token.ADD, modulus)
	}
	if !integerType.unsigned {
		signBoundary := constant.Shift(constant.MakeInt64(1), token.SHL, integerType.bits-1)
		if constant.Compare(wrapped, token.GEQ, signBoundary) {
			wrapped = constant.BinaryOp(wrapped, token.SUB, modulus)
		}
	}
	return wrapped, ""
}

func convertIntegerConstant(value constant.Value, integerType *integerConstantType) (constant.Value, string) {
	if value == nil || value.Kind() != constant.Int || integerType == nil {
		return nil, "integer constant conversion operand is not an integer"
	}
	var minimum constant.Value
	var maximum constant.Value
	if integerType.unsigned {
		minimum = constant.MakeInt64(0)
		maximum = constant.BinaryOp(constant.Shift(constant.MakeInt64(1), token.SHL, integerType.bits), token.SUB, constant.MakeInt64(1))
	} else {
		boundary := constant.Shift(constant.MakeInt64(1), token.SHL, integerType.bits-1)
		minimum = constant.UnaryOp(token.SUB, boundary, 0)
		maximum = constant.BinaryOp(boundary, token.SUB, constant.MakeInt64(1))
	}
	if constant.Compare(value, token.LSS, minimum) || constant.Compare(value, token.GTR, maximum) {
		return nil, "integer constant conversion overflows target type"
	}
	return value, ""
}

func constantExpressionReferences(expr ast.Expr) []string {
	seen := map[string]bool{}
	var collect func(ast.Expr)
	collect = func(current ast.Expr) {
		switch typed := current.(type) {
		case *ast.Ident:
			if typed.Name != "true" && typed.Name != "false" && typed.Name != "iota" {
				seen[typed.Name] = true
			}
		case *ast.SelectorExpr:
			seen[printed(typed)] = true
		case *ast.ParenExpr:
			collect(typed.X)
		case *ast.UnaryExpr:
			collect(typed.X)
		case *ast.BinaryExpr:
			collect(typed.X)
			collect(typed.Y)
		case *ast.CallExpr:
			for _, argument := range typed.Args {
				collect(argument)
			}
		}
	}
	collect(expr)
	references := make([]string, 0, len(seen))
	for reference := range seen {
		references = append(references, reference)
	}
	sort.Strings(references)
	return references
}

func resolveConstantReference(file *FileReport, packageNames map[string]string, reference string) (importPath string, name string, ok bool) {
	separator := strings.IndexByte(reference, '.')
	if separator < 0 {
		return constantScopeKey(file), reference, true
	}
	packageName := reference[:separator]
	name = reference[separator+1:]
	for _, imported := range file.Imports {
		alias := imported.Name
		if alias == "_" || alias == "." {
			continue
		}
		if alias == "" {
			alias = imported.PackageName
		}
		if alias == packageName {
			targetPackageName := packageNames[imported.Path]
			if targetPackageName == "" {
				targetPackageName = "<external>"
			}
			return imported.Path + "#" + targetPackageName, name, true
		}
	}
	return "", "", false
}

func constantScopeKey(file *FileReport) string {
	return file.ImportPath + "#" + file.PackageName
}

func constantValuesEqual(left constant.Value, right constant.Value) bool {
	return left.Kind() == right.Kind() && left.ExactString() == right.ExactString()
}

type resolvedExternalConstant struct {
	value  constant.Value
	reason string
}

func resolveExternalConstant(scopeKey string, name string, cache map[string]resolvedExternalConstant) (constant.Value, string) {
	importPath, _, _ := strings.Cut(scopeKey, "#")
	key := importPath + "::" + name
	if cached, ok := cache[key]; ok {
		return cached.value, cached.reason
	}
	result := resolvedExternalConstant{}
	packageInfo, err := importer.Default().Import(importPath)
	if err != nil {
		result.reason = "load imported package " + importPath + ": " + err.Error()
		cache[key] = result
		return nil, result.reason
	}
	object := packageInfo.Scope().Lookup(name)
	constantObject, ok := object.(*types.Const)
	if !ok {
		result.reason = "imported object " + importPath + "." + name + " is not a constant"
		cache[key] = result
		return nil, result.reason
	}
	result.value = constantObject.Val()
	cache[key] = result
	return result.value, ""
}
