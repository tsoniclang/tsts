package main

import (
	"go/constant"
	"go/token"
	"go/types"
	"sort"
	"strconv"
)

type semanticTypeEncoder struct {
	typeParameterOwners map[*types.TypeParam]SemanticTypeParameterRef
	objectIDs           map[types.Object]string
}

func newSemanticTypeEncoder() *semanticTypeEncoder {
	return &semanticTypeEncoder{typeParameterOwners: map[*types.TypeParam]SemanticTypeParameterRef{}, objectIDs: map[types.Object]string{}}
}

func (encoder *semanticTypeEncoder) registerObjectID(object types.Object, id string) {
	if object == nil || id == "" {
		fatalf("cannot register an empty Go object identity")
	}
	if previous := encoder.objectIDs[object]; previous != "" && previous != id {
		fatalf("Go object %s has conflicting identities %s and %s", object.Name(), previous, id)
	}
	encoder.objectIDs[object] = id
}

func (encoder *semanticTypeEncoder) objectID(object types.Object) string {
	if id := encoder.objectIDs[object]; id != "" {
		return id
	}
	return semanticObjectID(object)
}

func (encoder *semanticTypeEncoder) registerTypeParameters(ownerID string, role string, parameters *types.TypeParamList) {
	if parameters == nil {
		return
	}
	for index := 0; index < parameters.Len(); index++ {
		parameter := parameters.At(index)
		reference := SemanticTypeParameterRef{OwnerID: ownerID, Role: role, Index: index, Name: parameter.Obj().Name()}
		if previous, exists := encoder.typeParameterOwners[parameter]; exists && previous != reference {
			fatalf("Go type parameter %s has conflicting owners: %#v and %#v", parameter.Obj().Name(), previous, reference)
		}
		encoder.typeParameterOwners[parameter] = reference
	}
}

func (encoder *semanticTypeEncoder) registerObject(object types.Object) {
	switch typed := object.(type) {
	case *types.Func:
		signature, ok := typed.Type().(*types.Signature)
		if !ok {
			fatalf("Go function object %s has non-signature type %T", typed.Name(), typed.Type())
		}
		ownerID := encoder.objectID(typed)
		encoder.registerTypeParameters(ownerID, "receiver", signature.RecvTypeParams())
		encoder.registerTypeParameters(ownerID, "type", signature.TypeParams())
	case *types.TypeName:
		switch declared := typed.Type().(type) {
		case *types.Named:
			encoder.registerTypeParameters(encoder.objectID(typed), "type", declared.TypeParams())
		case *types.Alias:
			encoder.registerTypeParameters(encoder.objectID(typed), "type", declared.TypeParams())
		default:
			if typed.IsAlias() {
				fatalf("Go alias %s was not materialized as *types.Alias; exact alias reporting requires Go 1.23+ alias semantics", typed.Name())
			}
			fatalf("Go defined type %s has unsupported object type %T", typed.Name(), typed.Type())
		}
	}
}

func (encoder *semanticTypeEncoder) typeReport(value types.Type) *SemanticTypeReport {
	return encoder.typeReportAt(value, "unowned::"+semanticTypeDebug(value))
}

func (encoder *semanticTypeEncoder) typeReportAt(value types.Type, ownerPath string) *SemanticTypeReport {
	if value == nil {
		fatalf("cannot encode a nil go/types.Type at %s", ownerPath)
	}
	switch typed := value.(type) {
	case *types.Basic:
		if typed.Kind() == types.Invalid {
			fatalf("cannot encode invalid Go basic type at %s", ownerPath)
		}
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "basic", Basic: &SemanticBasicTypeReport{
			Name: typed.Name(), Untyped: typed.Info()&types.IsUntyped != 0,
		}})
	case *types.Named:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "named", Reference: encoder.typeReference(typed.Obj(), typed.TypeArgs(), ownerPath)})
	case *types.Alias:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "alias", Reference: encoder.typeReference(typed.Obj(), typed.TypeArgs(), ownerPath)})
	case *types.TypeParam:
		reference, ok := encoder.typeParameterOwners[typed]
		if !ok {
			fatalf("Go type parameter %s has no declaration owner at %s", typed.Obj().Name(), ownerPath)
		}
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "typeParameter", TypeParameter: &reference})
	case *types.Pointer:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "pointer", Element: encoder.typeReportAt(typed.Elem(), ownerPath+"::element")})
	case *types.Slice:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "slice", Element: encoder.typeReportAt(typed.Elem(), ownerPath+"::element")})
	case *types.Array:
		length := strconv.FormatInt(typed.Len(), 10)
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "array", Length: &length, Element: encoder.typeReportAt(typed.Elem(), ownerPath+"::element")})
	case *types.Map:
		return semanticTypeReport(value, &SemanticTypeReport{
			Kind: "map", Key: encoder.typeReportAt(typed.Key(), ownerPath+"::key"),
			Element: encoder.typeReportAt(typed.Elem(), ownerPath+"::element"),
		})
	case *types.Chan:
		return semanticTypeReport(value, &SemanticTypeReport{
			Kind: "channel", Direction: semanticChannelDirection(typed.Dir()),
			Element: encoder.typeReportAt(typed.Elem(), ownerPath+"::element"),
		})
	case *types.Signature:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "signature", Signature: encoder.signatureReportAt(typed, ownerPath, false)})
	case *types.Tuple:
		tuple := encoder.tupleReportAt(typed, ownerPath)
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "tuple", Tuple: &tuple})
	case *types.Struct:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "struct", Struct: encoder.structReportAt(typed, ownerPath)})
	case *types.Interface:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "interface", Interface: encoder.interfaceReportAt(typed, ownerPath)})
	case *types.Union:
		return semanticTypeReport(value, &SemanticTypeReport{Kind: "union", Union: encoder.unionReportAt(typed, ownerPath)})
	default:
		fatalf("unsupported go/types.Type implementation %T at %s", value, ownerPath)
		return nil
	}
}

func semanticTypeReport(value types.Type, report *SemanticTypeReport) *SemanticTypeReport {
	report.Nilable = types.AssignableTo(types.Typ[types.UntypedNil], value)
	return report
}

func (encoder *semanticTypeEncoder) typeReference(object *types.TypeName, arguments *types.TypeList, ownerPath string) *SemanticTypeReferenceReport {
	if object == nil {
		fatalf("Go named/alias type has no TypeName object at %s", ownerPath)
	}
	report := &SemanticTypeReferenceReport{
		ObjectID: encoder.objectID(object), PackagePath: semanticPackagePath(object.Pkg()), Name: object.Name(), TypeArgs: []*SemanticTypeReport{},
	}
	if arguments != nil {
		for index := 0; index < arguments.Len(); index++ {
			report.TypeArgs = append(report.TypeArgs, encoder.typeReportAt(arguments.At(index), ownerPath+"::typeArg::"+itoa(index)))
		}
	}
	return report
}

func (encoder *semanticTypeEncoder) signatureReportAt(signature *types.Signature, ownerPath string, includeReceiver bool) *SemanticSignatureReport {
	if signature == nil {
		fatalf("cannot encode a nil Go signature at %s", ownerPath)
	}
	report := &SemanticSignatureReport{
		ReceiverTypeParameters: encoder.typeParameterReports(signature.RecvTypeParams()),
		TypeParameters:         encoder.typeParameterReports(signature.TypeParams()),
		Parameters:             encoder.tupleReportAt(signature.Params(), ownerPath+"::parameters"),
		Results:                encoder.tupleReportAt(signature.Results(), ownerPath+"::results"),
		Variadic:               signature.Variadic(),
	}
	if includeReceiver && signature.Recv() != nil {
		receiver := encoder.variableReportAt(signature.Recv(), ownerPath+"::receiver")
		report.Receiver = &receiver
	}
	return report
}

func (encoder *semanticTypeEncoder) typeParameterReports(parameters *types.TypeParamList) []SemanticTypeParameterReport {
	reports := []SemanticTypeParameterReport{}
	if parameters == nil {
		return reports
	}
	for index := 0; index < parameters.Len(); index++ {
		parameter := parameters.At(index)
		reference, ok := encoder.typeParameterOwners[parameter]
		if !ok {
			fatalf("Go type parameter %s has no registered owner", parameter.Obj().Name())
		}
		reports = append(reports, SemanticTypeParameterReport{
			Reference:  reference,
			Constraint: encoder.typeReportAt(parameter.Constraint(), reference.OwnerID+"::"+reference.Role+"::"+itoa(reference.Index)+"::constraint"),
		})
	}
	return reports
}

func (encoder *semanticTypeEncoder) tupleReportAt(tuple *types.Tuple, ownerPath string) SemanticTupleReport {
	report := SemanticTupleReport{Variables: []SemanticVariableReport{}}
	if tuple == nil {
		return report
	}
	for index := 0; index < tuple.Len(); index++ {
		report.Variables = append(report.Variables, encoder.variableReportAt(tuple.At(index), ownerPath+"::"+itoa(index)))
	}
	return report
}

func (encoder *semanticTypeEncoder) variableReportAt(variable *types.Var, ownerPath string) SemanticVariableReport {
	if variable == nil {
		fatalf("cannot encode a nil Go variable at %s", ownerPath)
	}
	return SemanticVariableReport{
		ID: ownerPath, Name: variable.Name(), PackagePath: semanticPackagePath(variable.Pkg()), Embedded: variable.Embedded(),
		Exported: token.IsExported(variable.Name()), Type: encoder.typeReportAt(variable.Type(), ownerPath+"::type"),
	}
}

func (encoder *semanticTypeEncoder) structReportAt(structure *types.Struct, ownerPath string) *SemanticStructReport {
	report := &SemanticStructReport{Fields: []SemanticStructFieldReport{}}
	for index := 0; index < structure.NumFields(); index++ {
		tag := structure.Tag(index)
		tagValues, tagRemainder := parseStructTagValues(tag)
		report.Fields = append(report.Fields, SemanticStructFieldReport{
			Variable: encoder.variableReportAt(structure.Field(index), ownerPath+"::field::"+itoa(index)), Tag: tag, TagValues: tagValues, TagRemainder: tagRemainder,
		})
	}
	return report
}

func (encoder *semanticTypeEncoder) interfaceReportAt(value *types.Interface, ownerPath string) *SemanticInterfaceReport {
	value.Complete()
	report := &SemanticInterfaceReport{
		ExplicitMethods: []SemanticMethodReport{}, EmbeddedTypes: []*SemanticTypeReport{}, EmbeddedKinds: []string{}, CompleteMethods: []SemanticMethodReport{},
		Comparable: value.IsComparable(), Implicit: value.IsImplicit(), MethodSetOnly: value.IsMethodSet(),
	}
	for index, method := range explicitMethodsInDeclarationOrder(value) {
		report.ExplicitMethods = append(report.ExplicitMethods, encoder.methodReportAt(method, ownerPath, "explicitMethod", index))
	}
	for index := 0; index < value.NumEmbeddeds(); index++ {
		embedded := value.EmbeddedType(index)
		report.EmbeddedTypes = append(report.EmbeddedTypes, encoder.typeReportAt(embedded, ownerPath+"::embedded::"+itoa(index)))
		report.EmbeddedKinds = append(report.EmbeddedKinds, semanticInterfaceEmbeddingKind(embedded))
	}
	for index := 0; index < value.NumMethods(); index++ {
		report.CompleteMethods = append(report.CompleteMethods, encoder.methodReportAt(value.Method(index), ownerPath, "completeMethod", index))
	}
	return report
}

func semanticInterfaceEmbeddingKind(value types.Type) string {
	switch typed := value.(type) {
	case *types.Interface:
		return "interface"
	case *types.Named:
		if _, ok := typed.Underlying().(*types.Interface); ok {
			return "interface"
		}
	case *types.Alias:
		if _, ok := typed.Underlying().(*types.Interface); ok {
			return "interface"
		}
	}
	return "typeSet"
}

func explicitMethodsInDeclarationOrder(value *types.Interface) []*types.Func {
	methods := make([]*types.Func, value.NumExplicitMethods())
	for index := range methods {
		methods[index] = value.ExplicitMethod(index)
		if methods[index].Pos() == token.NoPos {
			fatalf("Go interface method %s has no syntax declaration position", methods[index].Name())
		}
	}
	sort.Slice(methods, func(left, right int) bool { return methods[left].Pos() < methods[right].Pos() })
	for index := 1; index < len(methods); index++ {
		if methods[index-1].Pos() == methods[index].Pos() {
			fatalf("Go interface methods %s and %s share syntax declaration position %d", methods[index-1].Name(), methods[index].Name(), methods[index].Pos())
		}
	}
	return methods
}

func (encoder *semanticTypeEncoder) methodReportAt(method *types.Func, ownerPath string, role string, index int) SemanticMethodReport {
	signature, ok := method.Type().(*types.Signature)
	if !ok {
		fatalf("Go interface method %s has non-signature type %T", method.Name(), method.Type())
	}
	methodID := ownerPath + "::" + role + "::" + itoa(index) + "::" + types.Id(method.Pkg(), method.Name())
	return SemanticMethodReport{
		ID: methodID, OwnerID: ownerPath, Name: method.Name(), PackagePath: semanticPackagePath(method.Pkg()),
		Exported: token.IsExported(method.Name()), Signature: encoder.signatureReportAt(signature, methodID+"::signature", false),
	}
}

func (encoder *semanticTypeEncoder) unionReportAt(union *types.Union, ownerPath string) *SemanticUnionReport {
	report := &SemanticUnionReport{Terms: []SemanticUnionTermReport{}}
	for index := 0; index < union.Len(); index++ {
		term := union.Term(index)
		report.Terms = append(report.Terms, SemanticUnionTermReport{
			Tilde: term.Tilde(), Type: encoder.typeReportAt(term.Type(), ownerPath+"::term::"+itoa(index)),
		})
	}
	return report
}

func semanticObjectReport(encoder *semanticTypeEncoder, object types.Object) SemanticObjectReport {
	if object == nil {
		fatalf("cannot encode a nil go/types.Object")
	}
	objectID := encoder.objectID(object)
	return SemanticObjectReport{
		ID: objectID, Name: object.Name(), PackagePath: semanticPackagePath(object.Pkg()),
		Exported: object.Exported(), Type: encoder.typeReportAt(object.Type(), objectID+"::type"),
	}
}

func semanticObjectID(object types.Object) string {
	if object == nil {
		fatalf("cannot identify a nil go/types.Object")
	}
	packagePath := semanticPackagePath(object.Pkg())
	prefix := packagePath
	if prefix == "" {
		prefix = "builtin"
	}
	switch typed := object.(type) {
	case *types.TypeName:
		return prefix + "::type::" + typed.Name()
	case *types.Func:
		signature, ok := typed.Type().(*types.Signature)
		if !ok {
			fatalf("Go function %s has non-signature type %T", typed.Name(), typed.Type())
		}
		if signature.Recv() == nil {
			return prefix + "::func::" + typed.Name()
		}
		if receiver := receiverTypeObject(signature.Recv().Type()); receiver != nil {
			return semanticObjectID(receiver) + "::method::" + typed.Name()
		}
		return prefix + "::method::" + typed.Name()
	case *types.Const:
		return prefix + "::const::" + typed.Name()
	case *types.Var:
		return prefix + "::var::" + typed.Name()
	default:
		fatalf("unsupported go/types.Object implementation %T", object)
		return ""
	}
}

func receiverTypeObject(value types.Type) *types.TypeName {
	switch typed := value.(type) {
	case *types.Pointer:
		return receiverTypeObject(typed.Elem())
	case *types.Named:
		return typed.Obj()
	case *types.Alias:
		return typed.Obj()
	default:
		return nil
	}
}

func semanticPackagePath(pkg *types.Package) string {
	if pkg == nil {
		return ""
	}
	return pkg.Path()
}

func semanticChannelDirection(direction types.ChanDir) string {
	switch direction {
	case types.SendOnly:
		return "send"
	case types.RecvOnly:
		return "receive"
	case types.SendRecv:
		return "bidirectional"
	default:
		fatalf("unsupported Go channel direction %d", direction)
		return ""
	}
}

func semanticConstantReport(value constant.Value) *SemanticConstantReport {
	if value == nil || value.Kind() == constant.Unknown {
		fatalf("cannot encode unresolved Go constant value")
	}
	report := &SemanticConstantReport{Kind: value.Kind().String(), Exact: value.ExactString()}
	if value.Kind() == constant.String {
		decoded := constant.StringVal(value)
		report.StringValue = &decoded
	}
	return report
}

func semanticTypeDebug(value types.Type) string {
	if value == nil {
		return "<nil>"
	}
	return types.TypeString(value, func(pkg *types.Package) string {
		if pkg == nil {
			return ""
		}
		return pkg.Path()
	})
}
