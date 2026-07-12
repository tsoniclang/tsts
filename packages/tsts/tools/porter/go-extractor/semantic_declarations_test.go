package main

import (
	"go/token"
	"go/types"
	"io/fs"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

func TestDeclarationOnlyExtractorCapturesExactGoSemantics(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "go.mod"), "module example.test/declarations\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "declarations.go"), strings.ReplaceAll(declarationFixtureSource, "__RECURSIVE_TAG__", "`json:\"tagged,omitzero\"`"))

	snapshot := declarationSnapshot(t, root, "example.test/declarations")
	for _, file := range snapshot.Files {
		for _, unit := range file.Units {
			if semanticRequiredUnitKind(unit.Kind) && len(unit.Semantic) == 0 {
				t.Fatalf("unit %s has no canonical semantic declaration", unit.ID)
			}
		}
	}

	constants := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "constGroup", "Huge+Typed+Ratio+ComplexValue")).ValueSpecs
	assertSemanticConstant(t, constants[0].Names[0], "Huge", "Int", "1267650600228229401496703205376", "untyped int")
	assertSemanticConstant(t, constants[1].Names[0], "Typed", "Int", "7", "uint16")
	assertSemanticConstant(t, constants[2].Names[0], "Ratio", "Float", "1/3", "untyped float")
	assertSemanticConstant(t, constants[3].Names[0], "ComplexValue", "Complex", "(2 + 3i)", "untyped complex")
	if !constants[0].Names[0].Type.Basic.Untyped || constants[1].Names[0].Type.Basic.Untyped {
		t.Fatalf("constant typedness = untyped:%#v typed:%#v", constants[0].Names[0], constants[1].Names[0])
	}

	sequence := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "constGroup", "Sequence0+_+Sequence2")).ValueSpecs
	blank := sequence[1].Names[0]
	if !blank.Blank || blank.Name != "_" || blank.Object != nil || blank.Type == nil {
		t.Fatalf("blank constant identity/type = %#v", blank)
	}
	if blank.Constant == nil || blank.Constant.Exact != "1" || blank.Constant.Kind != "Int" {
		t.Fatalf("blank omitted iota constant = %#v", blank.Constant)
	}
	if sequence[2].Names[0].Constant == nil || sequence[2].Names[0].Constant.Exact != "2" {
		t.Fatalf("repeated iota sequence = %#v", sequence)
	}

	variables := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "varGroup", "_+Inferred+Callback")).ValueSpecs[0].Names
	if !variables[0].Blank || variables[0].Object != nil || variables[0].Type == nil || variables[0].Type.Kind != "basic" {
		t.Fatalf("blank variable exact type = %#v", variables[0])
	}
	if variables[1].Type == nil || variables[1].Type.Kind != "map" {
		t.Fatalf("inferred map variable = %#v", variables[1])
	}
	if variables[2].Type == nil || variables[2].Type.Kind != "signature" {
		t.Fatalf("function-literal variable = %#v", variables[2])
	}

	alias := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Alias")).Type
	defined := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Defined")).Type
	if alias == nil || !alias.Alias || alias.Object.Type.Kind != "alias" || alias.RHS.Kind != "basic" {
		t.Fatalf("alias declaration = %#v", alias)
	}
	if defined == nil || defined.Alias || defined.Object.Type.Kind != "named" || defined.RHS.Kind != "basic" {
		t.Fatalf("defined declaration = %#v", defined)
	}

	recursive := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Recursive")).Type.RHS.Struct
	if recursive == nil || len(recursive.Fields) != 3 {
		t.Fatalf("recursive struct = %#v", recursive)
	}
	if !recursive.Fields[0].Variable.Embedded || recursive.Fields[0].Variable.Type.Kind != "named" {
		t.Fatalf("embedded field = %#v", recursive.Fields[0])
	}
	next := recursive.Fields[1].Variable.Type
	if next.Kind != "pointer" || next.Element.Kind != "named" || next.Element.Reference.Name != "Recursive" {
		t.Fatalf("recursive named reference = %#v", next)
	}
	if recursive.Fields[2].Tag != `json:"tagged,omitzero"` {
		t.Fatalf("exact struct tag = %q", recursive.Fields[2].Tag)
	}
	if recursive.Fields[0].Variable.ID == recursive.Fields[1].Variable.ID {
		t.Fatalf("struct field IDs are not owner/index-qualified: %#v", recursive.Fields)
	}

	constraint := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Constraint")).Type.RHS.Interface
	if constraint == nil || !constraint.Comparable || len(constraint.ExplicitMethods) != 1 || len(constraint.EmbeddedTypes) < 2 {
		t.Fatalf("constraint interface/type set = %#v", constraint)
	}
	if !containsUnionWithTilde(constraint.EmbeddedTypes) {
		t.Fatalf("constraint did not retain union terms/tilde: %#v", constraint.EmbeddedTypes)
	}

	first := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "First")).Type.RHS.Interface
	second := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Second")).Type.RHS.Interface
	if first.ExplicitMethods[0].ID == second.ExplicitMethods[0].ID || first.ExplicitMethods[0].OwnerID == second.ExplicitMethods[0].OwnerID {
		t.Fatalf("same-name interface methods lost declaring-owner identity: first=%#v second=%#v", first, second)
	}

	transform := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "func", "Transform")).Signature
	if transform == nil || len(transform.TypeParameters) != 1 || len(transform.Parameters.Variables) != 4 || !transform.Variadic {
		t.Fatalf("generic variadic signature = %#v", transform)
	}
	array := transform.Parameters.Variables[0].Type
	if array.Kind != "array" || array.Length == nil || *array.Length != "4" || array.Element.Kind != "typeParameter" {
		t.Fatalf("const-resolved generic array = %#v", array)
	}
	if transform.Parameters.Variables[1].Type.Direction != "receive" || transform.Parameters.Variables[2].Type.Direction != "send" {
		t.Fatalf("channel directions = %#v", transform.Parameters)
	}
	if transform.Parameters.Variables[3].Type.Kind != "slice" || transform.Parameters.Variables[3].Name != "rest" {
		t.Fatalf("variadic tuple shape = %#v", transform.Parameters.Variables[3])
	}

	method := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "method", "Apply")).Signature
	if method == nil || method.Receiver == nil || len(method.ReceiverTypeParameters) != 1 {
		t.Fatalf("generic receiver/method signature = %#v", method)
	}
	if method.ReceiverTypeParameters[0].Reference.Role != "receiver" {
		t.Fatalf("receiver type parameter owner = %#v", method.ReceiverTypeParameters)
	}
	if method.ReceiverTypeParameters[0].Reference.Name != "Item" || method.ReceiverTypeParameters[0].ConstraintSyntax != "Constraint" || method.Receiver.Name != "generic" || method.Receiver.NameKind != "named" || method.ReceiverMode != "value" {
		t.Fatalf("receiver source constraint/name/mode evidence = %#v", method)
	}
	constraintSource := method.ReceiverTypeParameters[0].ConstraintSource
	if constraintSource == nil || constraintSource.OwnerID != "example.test/declarations::type::Generic" || constraintSource.Role != "type" || constraintSource.Index != 0 || constraintSource.Name != "T" {
		t.Fatalf("receiver constraint source identity = %#v", constraintSource)
	}
	if transform.TypeParameters[0].ConstraintSyntax != "Constraint" || transform.Results.Variables[0].NameKind != "named" || transform.Results.Variables[1].NameKind != "named" {
		t.Fatalf("function type-parameter/result source evidence = %#v", transform)
	}

	callback := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "CallbackType")).Type.RHS
	if callback.Kind != "signature" || !callback.Signature.Variadic || len(callback.Signature.Results.Variables) != 2 {
		t.Fatalf("function type declaration = %#v", callback)
	}
}

func TestIgnoreFuncBodiesIsTheOnlyReasonPoisonedBodiesSucceed(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "go.mod"), "module example.test/poison\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "poison.go"), `package poison
var Callback = func(value int) int { return undefinedInsideLiteral(value) }
func Read(value int) int { return undefinedInsideFunction(value) }
`)
	snapshot := declarationSnapshot(t, root, "example.test/poison")
	callback := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "varGroup", "Callback")).ValueSpecs[0].Names[0]
	callbackUnit := requireSemanticUnit(t, snapshot, "varGroup", "Callback")
	readUnit := requireSemanticUnit(t, snapshot, "func", "Read")
	read := singleSemanticVariant(t, readUnit)
	if callback.Type == nil || callback.Type.Kind != "signature" || read.Signature == nil {
		t.Fatalf("declaration-only checking lost signatures: callback=%#v read=%#v", callback, read)
	}
	if strings.Contains(callbackUnit.Signature, "undefinedInsideLiteral") || strings.Contains(callbackUnit.Snippet, "undefinedInsideLiteral") || strings.Contains(readUnit.Signature, "undefinedInsideFunction") || strings.Contains(readUnit.Snippet, "undefinedInsideFunction") {
		t.Fatalf("opaque function body leaked into declaration text: callback=%q read=%q", callbackUnit.Signature, readUnit.Signature)
	}
	if callbackUnit.BodyHash == hashText("") || readUnit.BodyHash == hashText("") {
		t.Fatalf("opaque body digests were not retained: callback=%s read=%s", callbackUnit.BodyHash, readUnit.BodyHash)
	}
	if callbackUnit.EndLine != 2 || readUnit.EndLine != 3 {
		t.Fatalf("declaration ranges include opaque bodies: callback=%d read=%d", callbackUnit.EndLine, readUnit.EndLine)
	}
}

func TestBuildVariantUnitsRemainDistinctWhileLogicalObjectsStayCanonical(t *testing.T) {
	root := t.TempDir()
	writeTestFile(t, filepath.Join(root, "go.mod"), "module example.test/profiles\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "platform_linux.go"), "package profiles\nvar _, Platform = 0, [4]byte{}\n")
	writeTestFile(t, filepath.Join(root, "platform_windows.go"), "package profiles\nvar _, _, Platform = 0, 1, [4]byte{}\n")
	writeTestFile(t, filepath.Join(root, "width_386.go"), "package profiles\nvar WidthPlatform = [4]byte{}\n")
	writeTestFile(t, filepath.Join(root, "width_amd64.go"), "package profiles\nvar WidthPlatform = [8]byte{}\n")
	writeTestFile(t, filepath.Join(root, "z_common.go"), "package profiles\nconst WordBits = 32 << (^uint(0) >> 63)\nvar _ interface { Shared() }\n")
	snapshot := declarationSnapshot(t, root, "example.test/profiles")
	linux := requireSemanticUnitInFile(t, snapshot, "platform_linux.go", "varGroup", "_+Platform")
	windows := requireSemanticUnitInFile(t, snapshot, "platform_windows.go", "varGroup", "_+_+Platform")
	if linux.ID == windows.ID {
		t.Fatalf("mutually exclusive declaration units share an ID: %s", linux.ID)
	}
	linuxSemantic := singleSemanticVariant(t, linux)
	windowsSemantic := singleSemanticVariant(t, windows)
	linuxObject := linuxSemantic.ValueSpecs[0].Names[1].Object
	windowsObject := windowsSemantic.ValueSpecs[0].Names[2].Object
	if linuxObject == nil || windowsObject == nil || linuxObject.ID != windowsObject.ID {
		t.Fatalf("logical package binding should remain canonical across build variants: %#v %#v", linuxObject, windowsObject)
	}
	if len(linuxSemantic.Profiles) == 0 || len(windowsSemantic.Profiles) == 0 {
		t.Fatalf("build variant profile provenance is missing: linux=%v windows=%v", linuxSemantic.Profiles, windowsSemantic.Profiles)
	}
	common := requireSemanticUnitInFile(t, snapshot, "z_common.go", "varGroup", "_")
	commonSemantic := singleSemanticVariant(t, common)
	if commonSemantic.ValueSpecs[0].Names[0].Type.Kind != "interface" || len(commonSemantic.Profiles) < 2 {
		t.Fatalf("common blank declaration did not remain profile-stable: %#v", commonSemantic)
	}
	shared := commonSemantic.ValueSpecs[0].Names[0].Type.Interface.ExplicitMethods[0]
	if shared.OwnerID != common.ID+"::spec::0::name::0::type" {
		t.Fatalf("blank declaration provenance is not owned by its stable syntax unit: %#v", shared)
	}
	if shared.Signature.Receiver != nil {
		t.Fatalf("interface method signature exposed its implicit receiver: %#v", shared.Signature.Receiver)
	}
	wordBits := requireSemanticUnitInFile(t, snapshot, "z_common.go", "constGroup", "WordBits")
	if len(wordBits.Semantic) != 2 {
		t.Fatalf("profile-dependent common declaration variants = %#v", wordBits.Semantic)
	}
	values := []string{wordBits.Semantic[0].ValueSpecs[0].Names[0].Constant.Exact, wordBits.Semantic[1].ValueSpecs[0].Names[0].Constant.Exact}
	sort.Strings(values)
	if strings.Join(values, ",") != "32,64" {
		t.Fatalf("profile-dependent constant variants = %v", values)
	}
}

func TestInterfaceDeclarationOrderUsesSyntaxAcrossProfiles(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/interfaceorder"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "contracts.go"), `package interfaceorder
type Embedded interface {
	EmbeddedOnly(value byte) bool
}
type Ordered interface {
	Zulu(input int) string
	Embedded
	Alpha(flag bool) error
}
`)
	writeTestFile(t, filepath.Join(root, "platform_linux.go"), "package interfaceorder\nvar Platform = \"linux\"\n")
	writeTestFile(t, filepath.Join(root, "platform_windows.go"), "package interfaceorder\nvar Platform = \"windows\"\n")

	snapshot := declarationSnapshot(t, root, modulePath)
	unit := requireSemanticUnit(t, snapshot, "type", "Ordered")
	report := singleSemanticVariant(t, unit)
	if len(report.Profiles) != len(snapshot.Semantic.Profiles) || len(report.Profiles) < 2 {
		t.Fatalf("common interface did not merge deterministically across profiles: interface=%v all=%d", report.Profiles, len(snapshot.Semantic.Profiles))
	}
	for index, profile := range report.Profiles {
		if profile != index {
			t.Fatalf("interface profile indexes are not deterministic: %v", report.Profiles)
		}
	}

	wantSyntax := [][2]string{{"method", "Zulu"}, {"embeddedInterface", "Embedded"}, {"method", "Alpha"}}
	if len(unit.Members) != len(wantSyntax) {
		t.Fatalf("interface syntax members = %#v", unit.Members)
	}
	for index, want := range wantSyntax {
		if unit.Members[index].Kind != want[0] || unit.Members[index].Name != want[1] {
			t.Fatalf("interface syntax member %d = %#v, want %v", index, unit.Members[index], want)
		}
	}

	semantic := report.Type.RHS.Interface
	if semantic == nil || len(semantic.ExplicitMethods) != 2 || semantic.ExplicitMethods[0].Name != "Zulu" || semantic.ExplicitMethods[1].Name != "Alpha" {
		t.Fatalf("explicit interface methods lost syntax order: %#v", semantic)
	}
	if len(semantic.EmbeddedTypes) != 1 || semantic.EmbeddedTypes[0].Reference == nil || semantic.EmbeddedTypes[0].Reference.Name != "Embedded" {
		t.Fatalf("embedded interface type = %#v", semantic.EmbeddedTypes)
	}
	if len(semantic.EmbeddedKinds) != 1 || semantic.EmbeddedKinds[0] != "interface" {
		t.Fatalf("embedded interface classification = %#v", semantic.EmbeddedKinds)
	}
	complete := map[string]bool{}
	for _, method := range semantic.CompleteMethods {
		complete[method.Name] = true
	}
	if len(complete) != 3 || !complete["Zulu"] || !complete["Alpha"] || !complete["EmbeddedOnly"] {
		t.Fatalf("complete interface method set lost embedded methods: %#v", semantic.CompleteMethods)
	}
	zulu := semantic.ExplicitMethods[0]
	if len(zulu.Signature.Parameters.Variables) != 1 || zulu.Signature.Parameters.Variables[0].Name != "input" || zulu.Signature.Parameters.Variables[0].Type.Basic.Name != "int" || zulu.Signature.Results.Variables[0].Type.Basic.Name != "string" {
		t.Fatalf("syntax ordering did not retain the go/types method signature: %#v", zulu.Signature)
	}
}

func TestEmbeddingClassificationUsesGoTypesAndSyntaxEvidence(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/embedding"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "embedding.go"), `package embedding
type Base interface { BaseMethod() }
type Extra interface { ExtraMethod() }
type Multi interface {
	Base
	Extra
	OwnMethod()
}
type Product struct {
	Base
	Count int
}
type Constraint interface { ~int }
`)
	snapshot := declarationSnapshot(t, root, modulePath)

	multi := requireSemanticUnit(t, snapshot, "type", "Multi")
	multiSemantic := singleSemanticVariant(t, multi).Type.RHS.Interface
	if multiSemantic == nil || len(multiSemantic.EmbeddedTypes) != 2 || len(multiSemantic.EmbeddedKinds) != 2 {
		t.Fatalf("multiple interface embeddings = %#v", multiSemantic)
	}
	if multiSemantic.EmbeddedKinds[0] != "interface" || multiSemantic.EmbeddedKinds[1] != "interface" {
		t.Fatalf("multiple interface embedding classifications = %#v", multiSemantic.EmbeddedKinds)
	}
	if len(multi.Members) != 3 || multi.Members[0].Kind != "embeddedInterface" || multi.Members[1].Kind != "embeddedInterface" || multi.Members[2].Kind != "method" {
		t.Fatalf("multiple interface syntax evidence = %#v", multi.Members)
	}

	product := requireSemanticUnit(t, snapshot, "type", "Product")
	productSemantic := singleSemanticVariant(t, product).Type.RHS.Struct
	if productSemantic == nil || len(productSemantic.Fields) != 2 || !productSemantic.Fields[0].Variable.Embedded {
		t.Fatalf("embedded struct field evidence = %#v", productSemantic)
	}
	if product.Members[0].Kind != "embeddedField" || product.Members[0].TypeExpr == nil || product.Members[0].TypeExpr.Kind != "ident" {
		t.Fatalf("embedded struct syntax evidence = %#v", product.Members)
	}

	constraint := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Constraint")).Type.RHS.Interface
	if constraint == nil || len(constraint.EmbeddedKinds) != 1 || constraint.EmbeddedKinds[0] != "typeSet" {
		t.Fatalf("type-set embedding classification = %#v", constraint)
	}
}

func TestDeclarationOnlyImporterRecursesLocallyAndUsesExternalExportData(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/imports"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "base", "base.go"), `package base
type Box[T any] struct { Value T }
func New[T any](value T) Box[T] { return undefinedBaseBody(value) }
`)
	writeTestFile(t, filepath.Join(root, "consumer", "consumer.go"), `package consumer
import (
	"time"
	"example.test/imports/base"
)
type IntBox = base.Box[int]
type Duration = time.Duration
func Read(value base.Box[time.Duration]) time.Duration { return undefinedConsumerBody(value) }
`)
	snapshot := declarationSnapshot(t, root, modulePath)
	box := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "IntBox")).Type.RHS
	if box.Kind != "named" || box.Reference.PackagePath != modulePath+"/base" || box.Reference.Name != "Box" || len(box.Reference.TypeArgs) != 1 {
		t.Fatalf("module-local generic import = %#v", box)
	}
	duration := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "type", "Duration")).Type.RHS
	if duration.Kind != "named" || duration.Reference.PackagePath != "time" || duration.Reference.Name != "Duration" {
		t.Fatalf("external export-data import = %#v", duration)
	}
	read := singleSemanticVariant(t, requireSemanticUnit(t, snapshot, "func", "Read")).Signature
	if read.Parameters.Variables[0].Type.Reference.PackagePath != modulePath+"/base" || read.Results.Variables[0].Type.Reference.PackagePath != "time" {
		t.Fatalf("imported signature identities = %#v", read)
	}
}

func TestDeclarationCorrelationUsesPhysicalOffsets(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/offsets"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "offsets.go"), "package offsets\ntype worker struct{}\nfunc (worker) init() {}\nfunc init() {}; func init() {}\n//line generated.go:900\nvar _, _ = 1, 2; var _, _ = 3, 4\n")
	snapshot := declarationSnapshot(t, root, modulePath)
	file := snapshot.Files[0]
	seenOffsets := map[int]bool{}
	seenInitObjects := map[string]bool{}
	initCount := 0
	blankCount := 0
	methodCount := 0
	for _, unit := range file.Units {
		if unit.Kind != "func" && unit.Kind != "method" && unit.Kind != "varGroup" {
			continue
		}
		if seenOffsets[unit.StartOffset] {
			t.Fatalf("duplicate physical declaration offset %d: %#v", unit.StartOffset, file.Units)
		}
		seenOffsets[unit.StartOffset] = true
		if len(unit.Semantic) == 0 {
			t.Fatalf("physical-offset declaration %s has no semantic evidence", unit.ID)
		}
		if unit.Kind == "func" && unit.Name == "init" {
			initCount++
			objectID := unit.Semantic[0].Object.ID
			if seenInitObjects[objectID] {
				t.Fatalf("duplicate init object identity %s", objectID)
			}
			seenInitObjects[objectID] = true
		}
		if unit.Kind == "method" && unit.Name == "init" {
			methodCount++
			if unit.Semantic[0].Signature == nil || unit.Semantic[0].Signature.Receiver == nil {
				t.Fatalf("ordinary method named init lost its receiver: %#v", unit.Semantic[0])
			}
		}
		if unit.Kind == "varGroup" && unit.Name == "_+_" {
			blankCount++
		}
	}
	if initCount != 2 || methodCount != 1 || blankCount != 2 {
		t.Fatalf("same-line declarations were not preserved: init=%d methods=%d blanks=%d units=%#v", initCount, methodCount, blankCount, file.Units)
	}
}

func TestInternalAndExternalTestPackagesKeepExactIdentity(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/tests"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "base", "base.go"), "package base\ntype Token struct { Value int }\n")
	writeTestFile(t, filepath.Join(root, "base", "internal_test.go"), "package base\ntype InternalAlias = Token\n")
	writeTestFile(t, filepath.Join(root, "base", "external_test.go"), "package base_test\nimport \"example.test/tests/base\"\ntype ExternalAlias = base.Token\n")
	snapshot := declarationSnapshot(t, root, modulePath)
	internal := requireSemanticUnitInFile(t, snapshot, "base/internal_test.go", "type", "InternalAlias")
	external := requireSemanticUnitInFile(t, snapshot, "base/external_test.go", "type", "ExternalAlias")
	if internal.Semantic[0].PackagePath != modulePath+"/base" {
		t.Fatalf("internal test package identity = %q", internal.Semantic[0].PackagePath)
	}
	if external.Semantic[0].PackagePath != modulePath+"/base_test" {
		t.Fatalf("external test package identity = %q", external.Semantic[0].PackagePath)
	}
	if external.Semantic[0].Type.RHS.Reference.PackagePath != modulePath+"/base" {
		t.Fatalf("external test import edge = %#v", external.Semantic[0].Type.RHS.Reference)
	}
	for _, file := range snapshot.Files {
		if file.Path == "base/external_test.go" && file.ImportPath != modulePath+"/base_test" {
			t.Fatalf("external test source import path = %q", file.ImportPath)
		}
	}
}

func TestArbitraryLegalStructTagsRemainExact(t *testing.T) {
	root := t.TempDir()
	modulePath := "example.test/tags"
	writeTestFile(t, filepath.Join(root, "go.mod"), "module "+modulePath+"\n\ngo 1.26\n")
	writeTestFile(t, filepath.Join(root, "tags.go"), "package tags\ntype Weird struct {\n Prefix string `json:\"prefix\" malformed`\n Entire string `not-a-pair`\n Spaces string `json:\"spaces\"   `\n}\n")
	snapshot := declarationSnapshot(t, root, modulePath)
	unit := requireSemanticUnit(t, snapshot, "type", "Weird")
	fields := singleSemanticVariant(t, unit).Type.RHS.Struct.Fields
	if len(fields) != 3 || len(fields[0].TagValues) != 1 || fields[0].TagValues[0].Key != "json" || fields[0].TagRemainder != " malformed" {
		t.Fatalf("valid-prefix arbitrary tag = %#v", fields[0])
	}
	if len(fields[1].TagValues) != 0 || fields[1].TagRemainder != "not-a-pair" || fields[1].Tag != "not-a-pair" {
		t.Fatalf("fully arbitrary tag = %#v", fields[1])
	}
	if unit.Members[0].TagRemainder == nil || *unit.Members[0].TagRemainder != " malformed" || unit.Members[1].TagRemainder == nil || *unit.Members[1].TagRemainder != "not-a-pair" {
		t.Fatalf("syntax tag remainders = %#v", unit.Members)
	}
	if fields[2].TagRemainder != "   " || unit.Members[2].TagRemainder == nil || *unit.Members[2].TagRemainder != "   " {
		t.Fatalf("trailing-space tag remainder = semantic:%q syntax:%#v", fields[2].TagRemainder, unit.Members[2].TagRemainder)
	}
}

func TestCanonicalTypeEncoderCoversTupleVariant(t *testing.T) {
	encoder := newSemanticTypeEncoder()
	tuple := types.NewTuple(
		types.NewVar(token.NoPos, nil, "left", types.Typ[types.Int]),
		types.NewVar(token.NoPos, nil, "right", types.NewSlice(types.Typ[types.String])),
	)
	report := encoder.typeReport(tuple)
	if report.Kind != "tuple" || report.Tuple == nil || len(report.Tuple.Variables) != 2 || report.Tuple.Variables[1].Type.Kind != "slice" {
		t.Fatalf("tuple type report = %#v", report)
	}
}

func declarationSnapshot(t *testing.T, root string, modulePath string) Snapshot {
	t.Helper()
	snapshot := Snapshot{SchemaVersion: 9, SourceRoot: root, ModulePath: modulePath}
	err := filepath.WalkDir(root, func(path string, entry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".go") {
			return nil
		}
		snapshot.Files = append(snapshot.Files, scanGoFile(root, path, modulePath))
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	sort.Slice(snapshot.Files, func(left, right int) bool { return snapshot.Files[left].Path < snapshot.Files[right].Path })
	semanticFiles := map[string]bool{}
	for _, file := range snapshot.Files {
		semanticFiles[file.Path] = true
	}
	applyGoSemanticEvidence(root, modulePath, &snapshot, semanticFiles)
	return snapshot
}

func requireSemanticUnit(t *testing.T, snapshot Snapshot, kind string, name string) *UnitReport {
	t.Helper()
	for fileIndex := range snapshot.Files {
		for unitIndex := range snapshot.Files[fileIndex].Units {
			unit := &snapshot.Files[fileIndex].Units[unitIndex]
			if unit.Kind == kind && unit.Name == name {
				return unit
			}
		}
	}
	t.Fatalf("missing semantic unit %s %s", kind, name)
	return nil
}

func requireSemanticUnitInFile(t *testing.T, snapshot Snapshot, path string, kind string, name string) *UnitReport {
	t.Helper()
	for fileIndex := range snapshot.Files {
		file := &snapshot.Files[fileIndex]
		if file.Path != path {
			continue
		}
		for unitIndex := range file.Units {
			unit := &file.Units[unitIndex]
			if unit.Kind == kind && unit.Name == name {
				return unit
			}
		}
	}
	t.Fatalf("missing semantic unit %s %s in %s", kind, name, path)
	return nil
}

func singleSemanticVariant(t *testing.T, unit *UnitReport) *SemanticDeclarationReport {
	t.Helper()
	if len(unit.Semantic) != 1 {
		t.Fatalf("unit %s has %d semantic variants, want 1: %#v", unit.ID, len(unit.Semantic), unit.Semantic)
	}
	return &unit.Semantic[0]
}

func assertSemanticConstant(t *testing.T, binding SemanticValueBindingReport, name string, kind string, exact string, typeName string) {
	t.Helper()
	if binding.Name != name || binding.Constant == nil || binding.Constant.Kind != kind || binding.Constant.Exact != exact {
		t.Fatalf("constant %s = %#v", name, binding)
	}
	if binding.Type == nil || binding.Type.Kind != "basic" || binding.Type.Basic.Name != typeName {
		t.Fatalf("constant %s type = %#v", name, binding.Type)
	}
}

func containsUnionWithTilde(values []*SemanticTypeReport) bool {
	for _, value := range values {
		if value.Kind != "union" || value.Union == nil {
			continue
		}
		for _, term := range value.Union.Terms {
			if term.Tilde {
				return true
			}
		}
	}
	return false
}

const declarationFixtureSource = `package declarations

const Width = 4
const (
	Huge = 1 << 100
	Typed uint16 = 7
	Ratio = 1.0 / 3.0
	ComplexValue = 2 + 3i
)
const (
	Sequence0 = iota
	_
	Sequence2
)

var _, Inferred, Callback = 1, map[string][]byte{}, func(value int) int {
	return undefinedInsideLiteral(value)
}

type Alias = uint64
type Defined uint64
type Embedded struct{}
type Recursive struct {
	Embedded
	Next *Recursive
	Tagged string __RECURSIVE_TAG__
}
type Constraint interface {
	comparable
	~string | ~int64
	Mark()
}
type Generic[T Constraint] struct { Value T }
type First interface { Shared(value int) string }
type Second interface { Shared(value int) string }
type CallbackType func(value int, rest ...string) (bool, error)

func Transform[T Constraint](input [Width]T, receive <-chan T, send chan<- T, rest ...map[string]*T) (value T, err error) {
	return undefinedInsideFunction(input, receive, send, rest)
}

func (generic Generic[Item]) Apply(value Item) Item {
	return undefinedInsideMethod(value)
}
`
