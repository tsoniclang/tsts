import { FlattenLevelAll$constant, FlattenLevelObjectRest$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/destructuring.js";
export function $initialize(): void {
    FlattenLevelAll = FlattenLevelAll$constant();
    FlattenLevelObjectRest = FlattenLevelObjectRest$constant();
}
export { Chain, TransformOptions } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/chain.js";
export { BindingOrAssignmentElementAssignsToName, BindingOrAssignmentElementContainsNonLiteralComputedName, CreateAssignmentCallback, FlattenDestructuringAssignment, FlattenDestructuringBinding, FlattenLevel, FlattenLevelAll$constant, FlattenLevelObjectRest$constant, GetInitializerOfBindingOrAssignmentElement } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/destructuring.js";
export { ExtractModifiers } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/modifiervisitor.js";
export { Transformer } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/transformer.js";
export { ConvertBindingPatternToAssignmentPattern, ConvertVariableDeclarationToAssignmentExpression, FindSuperStatementIndexPath, GetNonAssignmentOperatorForCompoundAssignment, GetSuperCallFromStatement, IsExportName, IsGeneratedIdentifier, IsHelperName, IsIdentifierReference, IsLocalName, IsOriginalNodeSingleLine, IsSimpleCopiableExpression, IsSimpleInlineableExpression, MoveRangePastDecorators, MoveRangePastModifiers, SingleOrMany } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/transformers/utilities.js";
export let FlattenLevelAll: ReturnType<typeof FlattenLevelAll$constant>;
export let FlattenLevelObjectRest: ReturnType<typeof FlattenLevelObjectRest$constant>;
