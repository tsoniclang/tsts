package main

import "go/types"

func semanticExternalPackageSurfaceFunctionSignature(encoder *semanticTypeEncoder, object *types.Func) *SemanticSignatureReport {
	if object == nil {
		fatalf("cannot encode a nil external Go package function")
	}
	encoder.registerObject(object)
	signature, ok := object.Type().(*types.Signature)
	if !ok {
		fatalf("external Go function %s has non-signature type %T", semanticObjectID(object), object.Type())
	}
	return encoder.signatureReportAt(signature, semanticObjectID(object)+"::signature", false)
}

func semanticExternalPackageSurfaceConstantSpecs(encoder *semanticTypeEncoder, object *types.Const) []SemanticValueSpecReport {
	if object == nil {
		fatalf("cannot encode a nil external Go package constant")
	}
	return semanticExternalPackageSurfaceValueSpecs(semanticObjectReport(encoder, object), semanticConstantReport(object.Val()))
}

func semanticExternalPackageSurfaceVariableSpecs(encoder *semanticTypeEncoder, object *types.Var) []SemanticValueSpecReport {
	if object == nil {
		fatalf("cannot encode a nil external Go package variable")
	}
	return semanticExternalPackageSurfaceValueSpecs(semanticObjectReport(encoder, object), nil)
}

func semanticExternalPackageSurfaceValueSpecs(object SemanticObjectReport, value *SemanticConstantReport) []SemanticValueSpecReport {
	return []SemanticValueSpecReport{{SpecIndex: 0, Names: []SemanticValueBindingReport{{
		Name: object.Name, NameIndex: 0, Type: object.Type, Object: &object, Constant: value,
	}}}}
}
