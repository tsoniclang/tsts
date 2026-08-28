import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierList$Storage as ModifierList__from_ast$Storage, NodeList$Storage as NodeList__from_ast$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ArrayTypeNode$Storage as ArrayTypeNode__from_ast$Storage, BinaryExpression$Storage as BinaryExpression__from_ast$Storage, Block$Storage as Block__from_ast$Storage, CallExpression$Storage as CallExpression__from_ast$Storage, ConditionalExpression$Storage as ConditionalExpression__from_ast$Storage, ConstructSignatureDeclaration$Storage as ConstructSignatureDeclaration__from_ast$Storage, ElementAccessExpression$Storage as ElementAccessExpression__from_ast$Storage, ExpressionStatement$Storage as ExpressionStatement__from_ast$Storage, ExpressionWithTypeArguments$Storage as ExpressionWithTypeArguments__from_ast$Storage, FunctionDeclaration$Storage as FunctionDeclaration__from_ast$Storage, FunctionTypeNode$Storage as FunctionTypeNode__from_ast$Storage, HeritageClause$Storage as HeritageClause__from_ast$Storage, Identifier$Storage as Identifier__from_ast$Storage, IfStatement$Storage as IfStatement__from_ast$Storage, ImportSpecifier$Storage as ImportSpecifier__from_ast$Storage, IndexedAccessTypeNode$Storage as IndexedAccessTypeNode__from_ast$Storage, InterfaceDeclaration$Storage as InterfaceDeclaration__from_ast$Storage, IntersectionTypeNode$Storage as IntersectionTypeNode__from_ast$Storage, JSDocDeprecatedTag$Storage as JSDocDeprecatedTag__from_ast$Storage, JSDocText$Storage as JSDocText__from_ast$Storage, JSDocUnknownTag$Storage as JSDocUnknownTag__from_ast$Storage, JSDoc$Storage as JSDoc__from_ast$Storage, KeywordExpression$Storage as KeywordExpression__from_ast$Storage, KeywordTypeNode$Storage as KeywordTypeNode__from_ast$Storage, LiteralTypeNode$Storage as LiteralTypeNode__from_ast$Storage, MethodSignatureDeclaration$Storage as MethodSignatureDeclaration__from_ast$Storage, NumericLiteral$Storage as NumericLiteral__from_ast$Storage, ParameterDeclaration$Storage as ParameterDeclaration__from_ast$Storage, ParenthesizedExpression$Storage as ParenthesizedExpression__from_ast$Storage, ParenthesizedTypeNode$Storage as ParenthesizedTypeNode__from_ast$Storage, PrefixUnaryExpression$Storage as PrefixUnaryExpression__from_ast$Storage, PropertyAccessExpression$Storage as PropertyAccessExpression__from_ast$Storage, PropertyAssignment$Storage as PropertyAssignment__from_ast$Storage, PropertySignatureDeclaration$Storage as PropertySignatureDeclaration__from_ast$Storage, ReturnStatement$Storage as ReturnStatement__from_ast$Storage, StringLiteral$Storage as StringLiteral__from_ast$Storage, Token$Storage as Token__from_ast$Storage, TypeAliasDeclaration$Storage as TypeAliasDeclaration__from_ast$Storage, TypeLiteralNode$Storage as TypeLiteralNode__from_ast$Storage, TypeOperatorNode$Storage as TypeOperatorNode__from_ast$Storage, TypeParameterDeclaration$Storage as TypeParameterDeclaration__from_ast$Storage, TypeReferenceNode$Storage as TypeReferenceNode__from_ast$Storage, UnionTypeNode$Storage as UnionTypeNode__from_ast$Storage, VariableDeclarationList$Storage as VariableDeclarationList__from_ast$Storage, VariableDeclaration$Storage as VariableDeclaration__from_ast$Storage, VariableStatement$Storage as VariableStatement__from_ast$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import type { FlowList$Storage as FlowList__from_ast$Storage, FlowNode$Storage as FlowNode__from_ast$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/flow.js";
import type { Symbol$Storage as Symbol__from_ast$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { IndexInfo$Storage as IndexInfo__from_checker$Storage, Signature$Storage as Signature__from_checker$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { commentState$Storage as commentState__from_printer$Storage, sourceMapState$Storage as sourceMapState__from_printer$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import type { Mapping$Storage as Mapping__from_sourcemap$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/sourcemap/decoder.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { ModifierList as ModifierList__from_ast, NodeList as NodeList__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import { ArrayTypeNode as ArrayTypeNode__from_ast, BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, CallExpression as CallExpression__from_ast, ConditionalExpression as ConditionalExpression__from_ast, ConstructSignatureDeclaration as ConstructSignatureDeclaration__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionStatement as ExpressionStatement__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionTypeNode as FunctionTypeNode__from_ast, HeritageClause as HeritageClause__from_ast, Identifier as Identifier__from_ast, IfStatement as IfStatement__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, InterfaceDeclaration as InterfaceDeclaration__from_ast, IntersectionTypeNode as IntersectionTypeNode__from_ast, JSDocDeprecatedTag as JSDocDeprecatedTag__from_ast, JSDocText as JSDocText__from_ast, JSDocUnknownTag as JSDocUnknownTag__from_ast, JSDoc as JSDoc__from_ast, KeywordExpression as KeywordExpression__from_ast, KeywordTypeNode as KeywordTypeNode__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, MethodSignatureDeclaration as MethodSignatureDeclaration__from_ast, NumericLiteral as NumericLiteral__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, ParenthesizedTypeNode as ParenthesizedTypeNode__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, PropertyAssignment as PropertyAssignment__from_ast, PropertySignatureDeclaration as PropertySignatureDeclaration__from_ast, ReturnStatement as ReturnStatement__from_ast, StringLiteral as StringLiteral__from_ast, Token as Token__from_ast, TypeAliasDeclaration as TypeAliasDeclaration__from_ast, TypeLiteralNode as TypeLiteralNode__from_ast, TypeOperatorNode as TypeOperatorNode__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnionTypeNode as UnionTypeNode__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast_generated.js";
import { FlowList as FlowList__from_ast, FlowNode as FlowNode__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/flow.js";
import { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import { IndexInfo as IndexInfo__from_checker, Signature as Signature__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import { Arena as Arena__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/arena.js";
import { commentState as commentState__from_printer, sourceMapState as sourceMapState__from_printer } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/printer.js";
import { Mapping as Mapping__from_sourcemap } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/sourcemap/decoder.js";
import { goSliceAddress } from "@gotots/runtime/slice.js";
export function Arena$New$Named_ast$ArrayTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ArrayTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<ArrayTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<ArrayTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ArrayTypeNode__from_ast$Storage>): RuntimeSlice<ArrayTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ArrayTypeNode__from_ast): ArrayTypeNode__from_ast => {
        return ArrayTypeNode__from_ast.$copy($argument0);
    }, ($argument0: ArrayTypeNode__from_ast$Storage): ArrayTypeNode__from_ast => {
        return ArrayTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ArrayTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ArrayTypeNode__from_ast$Storage, ArrayTypeNode__from_ast>(goSliceAddress<ArrayTypeNode__from_ast$Storage>($argument0, $argument1), ArrayTypeNode__from_ast.$fromStorage, ArrayTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ArrayTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ArrayTypeNode__from_ast): ArrayTypeNode__from_ast$Storage => {
        return ArrayTypeNode__from_ast.$storageOf($argument0);
    }, (): ArrayTypeNode__from_ast => {
        return ArrayTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$BinaryExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<BinaryExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<BinaryExpression__from_ast>($argument0, ($argument0: RuntimeSlice<BinaryExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<BinaryExpression__from_ast$Storage>): RuntimeSlice<BinaryExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: BinaryExpression__from_ast): BinaryExpression__from_ast => {
        return BinaryExpression__from_ast.$copy($argument0);
    }, ($argument0: BinaryExpression__from_ast$Storage): BinaryExpression__from_ast => {
        return BinaryExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<BinaryExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<BinaryExpression__from_ast$Storage, BinaryExpression__from_ast>(goSliceAddress<BinaryExpression__from_ast$Storage>($argument0, $argument1), BinaryExpression__from_ast.$fromStorage, BinaryExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<BinaryExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: BinaryExpression__from_ast): BinaryExpression__from_ast$Storage => {
        return BinaryExpression__from_ast.$storageOf($argument0);
    }, (): BinaryExpression__from_ast => {
        return BinaryExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$Block($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<Block__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined {
    return Arena__from_core.New$kernel<Block__from_ast>($argument0, ($argument0: RuntimeSlice<Block__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<Block__from_ast$Storage>): RuntimeSlice<Block__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: Block__from_ast): Block__from_ast => {
        return Block__from_ast.$copy($argument0);
    }, ($argument0: Block__from_ast$Storage): Block__from_ast => {
        return Block__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Block__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<Block__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<Block__from_ast$Storage, Block__from_ast>(goSliceAddress<Block__from_ast$Storage>($argument0, $argument1), Block__from_ast.$fromStorage, Block__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<Block__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Block__from_ast): Block__from_ast$Storage => {
        return Block__from_ast.$storageOf($argument0);
    }, (): Block__from_ast => {
        return Block__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$CallExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<CallExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<CallExpression__from_ast>($argument0, ($argument0: RuntimeSlice<CallExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<CallExpression__from_ast$Storage>): RuntimeSlice<CallExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: CallExpression__from_ast): CallExpression__from_ast => {
        return CallExpression__from_ast.$copy($argument0);
    }, ($argument0: CallExpression__from_ast$Storage): CallExpression__from_ast => {
        return CallExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<CallExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<CallExpression__from_ast$Storage, CallExpression__from_ast>(goSliceAddress<CallExpression__from_ast$Storage>($argument0, $argument1), CallExpression__from_ast.$fromStorage, CallExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<CallExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: CallExpression__from_ast): CallExpression__from_ast$Storage => {
        return CallExpression__from_ast.$storageOf($argument0);
    }, (): CallExpression__from_ast => {
        return CallExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ConditionalExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ConditionalExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<ConditionalExpression__from_ast>($argument0, ($argument0: RuntimeSlice<ConditionalExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ConditionalExpression__from_ast$Storage>): RuntimeSlice<ConditionalExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ConditionalExpression__from_ast): ConditionalExpression__from_ast => {
        return ConditionalExpression__from_ast.$copy($argument0);
    }, ($argument0: ConditionalExpression__from_ast$Storage): ConditionalExpression__from_ast => {
        return ConditionalExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ConditionalExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ConditionalExpression__from_ast$Storage, ConditionalExpression__from_ast>(goSliceAddress<ConditionalExpression__from_ast$Storage>($argument0, $argument1), ConditionalExpression__from_ast.$fromStorage, ConditionalExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ConditionalExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ConditionalExpression__from_ast): ConditionalExpression__from_ast$Storage => {
        return ConditionalExpression__from_ast.$storageOf($argument0);
    }, (): ConditionalExpression__from_ast => {
        return ConditionalExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ConstructSignatureDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ConstructSignatureDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<ConstructSignatureDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<ConstructSignatureDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ConstructSignatureDeclaration__from_ast$Storage>): RuntimeSlice<ConstructSignatureDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ConstructSignatureDeclaration__from_ast): ConstructSignatureDeclaration__from_ast => {
        return ConstructSignatureDeclaration__from_ast.$copy($argument0);
    }, ($argument0: ConstructSignatureDeclaration__from_ast$Storage): ConstructSignatureDeclaration__from_ast => {
        return ConstructSignatureDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ConstructSignatureDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ConstructSignatureDeclaration__from_ast$Storage, ConstructSignatureDeclaration__from_ast>(goSliceAddress<ConstructSignatureDeclaration__from_ast$Storage>($argument0, $argument1), ConstructSignatureDeclaration__from_ast.$fromStorage, ConstructSignatureDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ConstructSignatureDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ConstructSignatureDeclaration__from_ast): ConstructSignatureDeclaration__from_ast$Storage => {
        return ConstructSignatureDeclaration__from_ast.$storageOf($argument0);
    }, (): ConstructSignatureDeclaration__from_ast => {
        return ConstructSignatureDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ElementAccessExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ElementAccessExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<ElementAccessExpression__from_ast>($argument0, ($argument0: RuntimeSlice<ElementAccessExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ElementAccessExpression__from_ast$Storage>): RuntimeSlice<ElementAccessExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ElementAccessExpression__from_ast): ElementAccessExpression__from_ast => {
        return ElementAccessExpression__from_ast.$copy($argument0);
    }, ($argument0: ElementAccessExpression__from_ast$Storage): ElementAccessExpression__from_ast => {
        return ElementAccessExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ElementAccessExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ElementAccessExpression__from_ast$Storage, ElementAccessExpression__from_ast>(goSliceAddress<ElementAccessExpression__from_ast$Storage>($argument0, $argument1), ElementAccessExpression__from_ast.$fromStorage, ElementAccessExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ElementAccessExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ElementAccessExpression__from_ast): ElementAccessExpression__from_ast$Storage => {
        return ElementAccessExpression__from_ast.$storageOf($argument0);
    }, (): ElementAccessExpression__from_ast => {
        return ElementAccessExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ExpressionStatement($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ExpressionStatement__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast> | undefined {
    return Arena__from_core.New$kernel<ExpressionStatement__from_ast>($argument0, ($argument0: RuntimeSlice<ExpressionStatement__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ExpressionStatement__from_ast$Storage>): RuntimeSlice<ExpressionStatement__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ExpressionStatement__from_ast): ExpressionStatement__from_ast => {
        return ExpressionStatement__from_ast.$copy($argument0);
    }, ($argument0: ExpressionStatement__from_ast$Storage): ExpressionStatement__from_ast => {
        return ExpressionStatement__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ExpressionStatement__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ExpressionStatement__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ExpressionStatement__from_ast$Storage, ExpressionStatement__from_ast>(goSliceAddress<ExpressionStatement__from_ast$Storage>($argument0, $argument1), ExpressionStatement__from_ast.$fromStorage, ExpressionStatement__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ExpressionStatement__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ExpressionStatement__from_ast): ExpressionStatement__from_ast$Storage => {
        return ExpressionStatement__from_ast.$storageOf($argument0);
    }, (): ExpressionStatement__from_ast => {
        return ExpressionStatement__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ExpressionWithTypeArguments($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ExpressionWithTypeArguments__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined {
    return Arena__from_core.New$kernel<ExpressionWithTypeArguments__from_ast>($argument0, ($argument0: RuntimeSlice<ExpressionWithTypeArguments__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ExpressionWithTypeArguments__from_ast$Storage>): RuntimeSlice<ExpressionWithTypeArguments__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ExpressionWithTypeArguments__from_ast): ExpressionWithTypeArguments__from_ast => {
        return ExpressionWithTypeArguments__from_ast.$copy($argument0);
    }, ($argument0: ExpressionWithTypeArguments__from_ast$Storage): ExpressionWithTypeArguments__from_ast => {
        return ExpressionWithTypeArguments__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ExpressionWithTypeArguments__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ExpressionWithTypeArguments__from_ast$Storage, ExpressionWithTypeArguments__from_ast>(goSliceAddress<ExpressionWithTypeArguments__from_ast$Storage>($argument0, $argument1), ExpressionWithTypeArguments__from_ast.$fromStorage, ExpressionWithTypeArguments__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ExpressionWithTypeArguments__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ExpressionWithTypeArguments__from_ast): ExpressionWithTypeArguments__from_ast$Storage => {
        return ExpressionWithTypeArguments__from_ast.$storageOf($argument0);
    }, (): ExpressionWithTypeArguments__from_ast => {
        return ExpressionWithTypeArguments__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$FlowList($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<FlowList__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined {
    return Arena__from_core.New$kernel<FlowList__from_ast>($argument0, ($argument0: RuntimeSlice<FlowList__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<FlowList__from_ast$Storage>): RuntimeSlice<FlowList__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: FlowList__from_ast): FlowList__from_ast => {
        return FlowList__from_ast.$copy($argument0);
    }, ($argument0: FlowList__from_ast$Storage): FlowList__from_ast => {
        return FlowList__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<FlowList__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<FlowList__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<FlowList__from_ast$Storage, FlowList__from_ast>(goSliceAddress<FlowList__from_ast$Storage>($argument0, $argument1), FlowList__from_ast.$fromStorage, FlowList__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<FlowList__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: FlowList__from_ast): FlowList__from_ast$Storage => {
        return FlowList__from_ast.$storageOf($argument0);
    }, (): FlowList__from_ast => {
        return FlowList__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$FlowNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<FlowNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<FlowNode__from_ast>($argument0, ($argument0: RuntimeSlice<FlowNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<FlowNode__from_ast$Storage>): RuntimeSlice<FlowNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: FlowNode__from_ast): FlowNode__from_ast => {
        return FlowNode__from_ast.$copy($argument0);
    }, ($argument0: FlowNode__from_ast$Storage): FlowNode__from_ast => {
        return FlowNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<FlowNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<FlowNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<FlowNode__from_ast$Storage, FlowNode__from_ast>(goSliceAddress<FlowNode__from_ast$Storage>($argument0, $argument1), FlowNode__from_ast.$fromStorage, FlowNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<FlowNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: FlowNode__from_ast): FlowNode__from_ast$Storage => {
        return FlowNode__from_ast.$storageOf($argument0);
    }, (): FlowNode__from_ast => {
        return FlowNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$FunctionDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<FunctionDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<FunctionDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<FunctionDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<FunctionDeclaration__from_ast$Storage>): RuntimeSlice<FunctionDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: FunctionDeclaration__from_ast): FunctionDeclaration__from_ast => {
        return FunctionDeclaration__from_ast.$copy($argument0);
    }, ($argument0: FunctionDeclaration__from_ast$Storage): FunctionDeclaration__from_ast => {
        return FunctionDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<FunctionDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<FunctionDeclaration__from_ast$Storage, FunctionDeclaration__from_ast>(goSliceAddress<FunctionDeclaration__from_ast$Storage>($argument0, $argument1), FunctionDeclaration__from_ast.$fromStorage, FunctionDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<FunctionDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: FunctionDeclaration__from_ast): FunctionDeclaration__from_ast$Storage => {
        return FunctionDeclaration__from_ast.$storageOf($argument0);
    }, (): FunctionDeclaration__from_ast => {
        return FunctionDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$FunctionTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<FunctionTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<FunctionTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<FunctionTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<FunctionTypeNode__from_ast$Storage>): RuntimeSlice<FunctionTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: FunctionTypeNode__from_ast): FunctionTypeNode__from_ast => {
        return FunctionTypeNode__from_ast.$copy($argument0);
    }, ($argument0: FunctionTypeNode__from_ast$Storage): FunctionTypeNode__from_ast => {
        return FunctionTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<FunctionTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<FunctionTypeNode__from_ast$Storage, FunctionTypeNode__from_ast>(goSliceAddress<FunctionTypeNode__from_ast$Storage>($argument0, $argument1), FunctionTypeNode__from_ast.$fromStorage, FunctionTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<FunctionTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: FunctionTypeNode__from_ast): FunctionTypeNode__from_ast$Storage => {
        return FunctionTypeNode__from_ast.$storageOf($argument0);
    }, (): FunctionTypeNode__from_ast => {
        return FunctionTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$HeritageClause($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<HeritageClause__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined {
    return Arena__from_core.New$kernel<HeritageClause__from_ast>($argument0, ($argument0: RuntimeSlice<HeritageClause__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<HeritageClause__from_ast$Storage>): RuntimeSlice<HeritageClause__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: HeritageClause__from_ast): HeritageClause__from_ast => {
        return HeritageClause__from_ast.$copy($argument0);
    }, ($argument0: HeritageClause__from_ast$Storage): HeritageClause__from_ast => {
        return HeritageClause__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<HeritageClause__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<HeritageClause__from_ast$Storage, HeritageClause__from_ast>(goSliceAddress<HeritageClause__from_ast$Storage>($argument0, $argument1), HeritageClause__from_ast.$fromStorage, HeritageClause__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<HeritageClause__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: HeritageClause__from_ast): HeritageClause__from_ast$Storage => {
        return HeritageClause__from_ast.$storageOf($argument0);
    }, (): HeritageClause__from_ast => {
        return HeritageClause__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$Identifier($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<Identifier__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined {
    return Arena__from_core.New$kernel<Identifier__from_ast>($argument0, ($argument0: RuntimeSlice<Identifier__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<Identifier__from_ast$Storage>): RuntimeSlice<Identifier__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: Identifier__from_ast): Identifier__from_ast => {
        return Identifier__from_ast.$copy($argument0);
    }, ($argument0: Identifier__from_ast$Storage): Identifier__from_ast => {
        return Identifier__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Identifier__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<Identifier__from_ast$Storage, Identifier__from_ast>(goSliceAddress<Identifier__from_ast$Storage>($argument0, $argument1), Identifier__from_ast.$fromStorage, Identifier__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<Identifier__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Identifier__from_ast): Identifier__from_ast$Storage => {
        return Identifier__from_ast.$storageOf($argument0);
    }, (): Identifier__from_ast => {
        return Identifier__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$IfStatement($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<IfStatement__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined {
    return Arena__from_core.New$kernel<IfStatement__from_ast>($argument0, ($argument0: RuntimeSlice<IfStatement__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<IfStatement__from_ast$Storage>): RuntimeSlice<IfStatement__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: IfStatement__from_ast): IfStatement__from_ast => {
        return IfStatement__from_ast.$copy($argument0);
    }, ($argument0: IfStatement__from_ast$Storage): IfStatement__from_ast => {
        return IfStatement__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<IfStatement__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<IfStatement__from_ast$Storage, IfStatement__from_ast>(goSliceAddress<IfStatement__from_ast$Storage>($argument0, $argument1), IfStatement__from_ast.$fromStorage, IfStatement__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<IfStatement__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: IfStatement__from_ast): IfStatement__from_ast$Storage => {
        return IfStatement__from_ast.$storageOf($argument0);
    }, (): IfStatement__from_ast => {
        return IfStatement__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ImportSpecifier($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ImportSpecifier__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined {
    return Arena__from_core.New$kernel<ImportSpecifier__from_ast>($argument0, ($argument0: RuntimeSlice<ImportSpecifier__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ImportSpecifier__from_ast$Storage>): RuntimeSlice<ImportSpecifier__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ImportSpecifier__from_ast): ImportSpecifier__from_ast => {
        return ImportSpecifier__from_ast.$copy($argument0);
    }, ($argument0: ImportSpecifier__from_ast$Storage): ImportSpecifier__from_ast => {
        return ImportSpecifier__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ImportSpecifier__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ImportSpecifier__from_ast$Storage, ImportSpecifier__from_ast>(goSliceAddress<ImportSpecifier__from_ast$Storage>($argument0, $argument1), ImportSpecifier__from_ast.$fromStorage, ImportSpecifier__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ImportSpecifier__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ImportSpecifier__from_ast): ImportSpecifier__from_ast$Storage => {
        return ImportSpecifier__from_ast.$storageOf($argument0);
    }, (): ImportSpecifier__from_ast => {
        return ImportSpecifier__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$IndexedAccessTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<IndexedAccessTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<IndexedAccessTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<IndexedAccessTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<IndexedAccessTypeNode__from_ast$Storage>): RuntimeSlice<IndexedAccessTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: IndexedAccessTypeNode__from_ast): IndexedAccessTypeNode__from_ast => {
        return IndexedAccessTypeNode__from_ast.$copy($argument0);
    }, ($argument0: IndexedAccessTypeNode__from_ast$Storage): IndexedAccessTypeNode__from_ast => {
        return IndexedAccessTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<IndexedAccessTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<IndexedAccessTypeNode__from_ast$Storage, IndexedAccessTypeNode__from_ast>(goSliceAddress<IndexedAccessTypeNode__from_ast$Storage>($argument0, $argument1), IndexedAccessTypeNode__from_ast.$fromStorage, IndexedAccessTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<IndexedAccessTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: IndexedAccessTypeNode__from_ast): IndexedAccessTypeNode__from_ast$Storage => {
        return IndexedAccessTypeNode__from_ast.$storageOf($argument0);
    }, (): IndexedAccessTypeNode__from_ast => {
        return IndexedAccessTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$InterfaceDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<InterfaceDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<InterfaceDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<InterfaceDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<InterfaceDeclaration__from_ast$Storage>): RuntimeSlice<InterfaceDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: InterfaceDeclaration__from_ast): InterfaceDeclaration__from_ast => {
        return InterfaceDeclaration__from_ast.$copy($argument0);
    }, ($argument0: InterfaceDeclaration__from_ast$Storage): InterfaceDeclaration__from_ast => {
        return InterfaceDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<InterfaceDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<InterfaceDeclaration__from_ast$Storage, InterfaceDeclaration__from_ast>(goSliceAddress<InterfaceDeclaration__from_ast$Storage>($argument0, $argument1), InterfaceDeclaration__from_ast.$fromStorage, InterfaceDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<InterfaceDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: InterfaceDeclaration__from_ast): InterfaceDeclaration__from_ast$Storage => {
        return InterfaceDeclaration__from_ast.$storageOf($argument0);
    }, (): InterfaceDeclaration__from_ast => {
        return InterfaceDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$IntersectionTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<IntersectionTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<IntersectionTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<IntersectionTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<IntersectionTypeNode__from_ast$Storage>): RuntimeSlice<IntersectionTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: IntersectionTypeNode__from_ast): IntersectionTypeNode__from_ast => {
        return IntersectionTypeNode__from_ast.$copy($argument0);
    }, ($argument0: IntersectionTypeNode__from_ast$Storage): IntersectionTypeNode__from_ast => {
        return IntersectionTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<IntersectionTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<IntersectionTypeNode__from_ast$Storage, IntersectionTypeNode__from_ast>(goSliceAddress<IntersectionTypeNode__from_ast$Storage>($argument0, $argument1), IntersectionTypeNode__from_ast.$fromStorage, IntersectionTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<IntersectionTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: IntersectionTypeNode__from_ast): IntersectionTypeNode__from_ast$Storage => {
        return IntersectionTypeNode__from_ast.$storageOf($argument0);
    }, (): IntersectionTypeNode__from_ast => {
        return IntersectionTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$JSDoc($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<JSDoc__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<JSDoc__from_ast> | undefined {
    return Arena__from_core.New$kernel<JSDoc__from_ast>($argument0, ($argument0: RuntimeSlice<JSDoc__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<JSDoc__from_ast$Storage>): RuntimeSlice<JSDoc__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: JSDoc__from_ast): JSDoc__from_ast => {
        return JSDoc__from_ast.$copy($argument0);
    }, ($argument0: JSDoc__from_ast$Storage): JSDoc__from_ast => {
        return JSDoc__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<JSDoc__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<JSDoc__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<JSDoc__from_ast$Storage, JSDoc__from_ast>(goSliceAddress<JSDoc__from_ast$Storage>($argument0, $argument1), JSDoc__from_ast.$fromStorage, JSDoc__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<JSDoc__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: JSDoc__from_ast): JSDoc__from_ast$Storage => {
        return JSDoc__from_ast.$storageOf($argument0);
    }, (): JSDoc__from_ast => {
        return JSDoc__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$JSDocDeprecatedTag($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<JSDocDeprecatedTag__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag__from_ast> | undefined {
    return Arena__from_core.New$kernel<JSDocDeprecatedTag__from_ast>($argument0, ($argument0: RuntimeSlice<JSDocDeprecatedTag__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<JSDocDeprecatedTag__from_ast$Storage>): RuntimeSlice<JSDocDeprecatedTag__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: JSDocDeprecatedTag__from_ast): JSDocDeprecatedTag__from_ast => {
        return JSDocDeprecatedTag__from_ast.$copy($argument0);
    }, ($argument0: JSDocDeprecatedTag__from_ast$Storage): JSDocDeprecatedTag__from_ast => {
        return JSDocDeprecatedTag__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<JSDocDeprecatedTag__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<JSDocDeprecatedTag__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<JSDocDeprecatedTag__from_ast$Storage, JSDocDeprecatedTag__from_ast>(goSliceAddress<JSDocDeprecatedTag__from_ast$Storage>($argument0, $argument1), JSDocDeprecatedTag__from_ast.$fromStorage, JSDocDeprecatedTag__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<JSDocDeprecatedTag__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: JSDocDeprecatedTag__from_ast): JSDocDeprecatedTag__from_ast$Storage => {
        return JSDocDeprecatedTag__from_ast.$storageOf($argument0);
    }, (): JSDocDeprecatedTag__from_ast => {
        return JSDocDeprecatedTag__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$JSDocText($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<JSDocText__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<JSDocText__from_ast> | undefined {
    return Arena__from_core.New$kernel<JSDocText__from_ast>($argument0, ($argument0: RuntimeSlice<JSDocText__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<JSDocText__from_ast$Storage>): RuntimeSlice<JSDocText__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: JSDocText__from_ast): JSDocText__from_ast => {
        return JSDocText__from_ast.$copy($argument0);
    }, ($argument0: JSDocText__from_ast$Storage): JSDocText__from_ast => {
        return JSDocText__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<JSDocText__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<JSDocText__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<JSDocText__from_ast$Storage, JSDocText__from_ast>(goSliceAddress<JSDocText__from_ast$Storage>($argument0, $argument1), JSDocText__from_ast.$fromStorage, JSDocText__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<JSDocText__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: JSDocText__from_ast): JSDocText__from_ast$Storage => {
        return JSDocText__from_ast.$storageOf($argument0);
    }, (): JSDocText__from_ast => {
        return JSDocText__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$JSDocUnknownTag($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<JSDocUnknownTag__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<JSDocUnknownTag__from_ast> | undefined {
    return Arena__from_core.New$kernel<JSDocUnknownTag__from_ast>($argument0, ($argument0: RuntimeSlice<JSDocUnknownTag__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<JSDocUnknownTag__from_ast$Storage>): RuntimeSlice<JSDocUnknownTag__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: JSDocUnknownTag__from_ast): JSDocUnknownTag__from_ast => {
        return JSDocUnknownTag__from_ast.$copy($argument0);
    }, ($argument0: JSDocUnknownTag__from_ast$Storage): JSDocUnknownTag__from_ast => {
        return JSDocUnknownTag__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<JSDocUnknownTag__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<JSDocUnknownTag__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<JSDocUnknownTag__from_ast$Storage, JSDocUnknownTag__from_ast>(goSliceAddress<JSDocUnknownTag__from_ast$Storage>($argument0, $argument1), JSDocUnknownTag__from_ast.$fromStorage, JSDocUnknownTag__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<JSDocUnknownTag__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: JSDocUnknownTag__from_ast): JSDocUnknownTag__from_ast$Storage => {
        return JSDocUnknownTag__from_ast.$storageOf($argument0);
    }, (): JSDocUnknownTag__from_ast => {
        return JSDocUnknownTag__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$KeywordExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<KeywordExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<KeywordExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<KeywordExpression__from_ast>($argument0, ($argument0: RuntimeSlice<KeywordExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<KeywordExpression__from_ast$Storage>): RuntimeSlice<KeywordExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: KeywordExpression__from_ast): KeywordExpression__from_ast => {
        return KeywordExpression__from_ast.$copy($argument0);
    }, ($argument0: KeywordExpression__from_ast$Storage): KeywordExpression__from_ast => {
        return KeywordExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<KeywordExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<KeywordExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<KeywordExpression__from_ast$Storage, KeywordExpression__from_ast>(goSliceAddress<KeywordExpression__from_ast$Storage>($argument0, $argument1), KeywordExpression__from_ast.$fromStorage, KeywordExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<KeywordExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: KeywordExpression__from_ast): KeywordExpression__from_ast$Storage => {
        return KeywordExpression__from_ast.$storageOf($argument0);
    }, (): KeywordExpression__from_ast => {
        return KeywordExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$KeywordTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<KeywordTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<KeywordTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<KeywordTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<KeywordTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<KeywordTypeNode__from_ast$Storage>): RuntimeSlice<KeywordTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: KeywordTypeNode__from_ast): KeywordTypeNode__from_ast => {
        return KeywordTypeNode__from_ast.$copy($argument0);
    }, ($argument0: KeywordTypeNode__from_ast$Storage): KeywordTypeNode__from_ast => {
        return KeywordTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<KeywordTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<KeywordTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<KeywordTypeNode__from_ast$Storage, KeywordTypeNode__from_ast>(goSliceAddress<KeywordTypeNode__from_ast$Storage>($argument0, $argument1), KeywordTypeNode__from_ast.$fromStorage, KeywordTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<KeywordTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: KeywordTypeNode__from_ast): KeywordTypeNode__from_ast$Storage => {
        return KeywordTypeNode__from_ast.$storageOf($argument0);
    }, (): KeywordTypeNode__from_ast => {
        return KeywordTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$LiteralTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<LiteralTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<LiteralTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<LiteralTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<LiteralTypeNode__from_ast$Storage>): RuntimeSlice<LiteralTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: LiteralTypeNode__from_ast): LiteralTypeNode__from_ast => {
        return LiteralTypeNode__from_ast.$copy($argument0);
    }, ($argument0: LiteralTypeNode__from_ast$Storage): LiteralTypeNode__from_ast => {
        return LiteralTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<LiteralTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<LiteralTypeNode__from_ast$Storage, LiteralTypeNode__from_ast>(goSliceAddress<LiteralTypeNode__from_ast$Storage>($argument0, $argument1), LiteralTypeNode__from_ast.$fromStorage, LiteralTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<LiteralTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: LiteralTypeNode__from_ast): LiteralTypeNode__from_ast$Storage => {
        return LiteralTypeNode__from_ast.$storageOf($argument0);
    }, (): LiteralTypeNode__from_ast => {
        return LiteralTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$MethodSignatureDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<MethodSignatureDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<MethodSignatureDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<MethodSignatureDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<MethodSignatureDeclaration__from_ast$Storage>): RuntimeSlice<MethodSignatureDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: MethodSignatureDeclaration__from_ast): MethodSignatureDeclaration__from_ast => {
        return MethodSignatureDeclaration__from_ast.$copy($argument0);
    }, ($argument0: MethodSignatureDeclaration__from_ast$Storage): MethodSignatureDeclaration__from_ast => {
        return MethodSignatureDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<MethodSignatureDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<MethodSignatureDeclaration__from_ast$Storage, MethodSignatureDeclaration__from_ast>(goSliceAddress<MethodSignatureDeclaration__from_ast$Storage>($argument0, $argument1), MethodSignatureDeclaration__from_ast.$fromStorage, MethodSignatureDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<MethodSignatureDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: MethodSignatureDeclaration__from_ast): MethodSignatureDeclaration__from_ast$Storage => {
        return MethodSignatureDeclaration__from_ast.$storageOf($argument0);
    }, (): MethodSignatureDeclaration__from_ast => {
        return MethodSignatureDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ModifierList($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ModifierList__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
    return Arena__from_core.New$kernel<ModifierList__from_ast>($argument0, ($argument0: RuntimeSlice<ModifierList__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ModifierList__from_ast$Storage>): RuntimeSlice<ModifierList__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ModifierList__from_ast): ModifierList__from_ast => {
        return ModifierList__from_ast.$copy($argument0);
    }, ($argument0: ModifierList__from_ast$Storage): ModifierList__from_ast => {
        return ModifierList__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ModifierList__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ModifierList__from_ast$Storage, ModifierList__from_ast>(goSliceAddress<ModifierList__from_ast$Storage>($argument0, $argument1), ModifierList__from_ast.$fromStorage, ModifierList__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ModifierList__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ModifierList__from_ast): ModifierList__from_ast$Storage => {
        return ModifierList__from_ast.$storageOf($argument0);
    }, (): ModifierList__from_ast => {
        return ModifierList__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$NodeList($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<NodeList__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    return Arena__from_core.New$kernel<NodeList__from_ast>($argument0, ($argument0: RuntimeSlice<NodeList__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<NodeList__from_ast$Storage>): RuntimeSlice<NodeList__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: NodeList__from_ast): NodeList__from_ast => {
        return NodeList__from_ast.$copy($argument0);
    }, ($argument0: NodeList__from_ast$Storage): NodeList__from_ast => {
        return NodeList__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<NodeList__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(goSliceAddress<NodeList__from_ast$Storage>($argument0, $argument1), NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<NodeList__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: NodeList__from_ast): NodeList__from_ast$Storage => {
        return NodeList__from_ast.$storageOf($argument0);
    }, (): NodeList__from_ast => {
        return NodeList__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$NumericLiteral($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<NumericLiteral__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast> | undefined {
    return Arena__from_core.New$kernel<NumericLiteral__from_ast>($argument0, ($argument0: RuntimeSlice<NumericLiteral__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<NumericLiteral__from_ast$Storage>): RuntimeSlice<NumericLiteral__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: NumericLiteral__from_ast): NumericLiteral__from_ast => {
        return NumericLiteral__from_ast.$copy($argument0);
    }, ($argument0: NumericLiteral__from_ast$Storage): NumericLiteral__from_ast => {
        return NumericLiteral__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<NumericLiteral__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<NumericLiteral__from_ast$Storage, NumericLiteral__from_ast>(goSliceAddress<NumericLiteral__from_ast$Storage>($argument0, $argument1), NumericLiteral__from_ast.$fromStorage, NumericLiteral__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<NumericLiteral__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: NumericLiteral__from_ast): NumericLiteral__from_ast$Storage => {
        return NumericLiteral__from_ast.$storageOf($argument0);
    }, (): NumericLiteral__from_ast => {
        return NumericLiteral__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ParameterDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ParameterDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<ParameterDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<ParameterDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ParameterDeclaration__from_ast$Storage>): RuntimeSlice<ParameterDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ParameterDeclaration__from_ast): ParameterDeclaration__from_ast => {
        return ParameterDeclaration__from_ast.$copy($argument0);
    }, ($argument0: ParameterDeclaration__from_ast$Storage): ParameterDeclaration__from_ast => {
        return ParameterDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ParameterDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ParameterDeclaration__from_ast$Storage, ParameterDeclaration__from_ast>(goSliceAddress<ParameterDeclaration__from_ast$Storage>($argument0, $argument1), ParameterDeclaration__from_ast.$fromStorage, ParameterDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ParameterDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ParameterDeclaration__from_ast): ParameterDeclaration__from_ast$Storage => {
        return ParameterDeclaration__from_ast.$storageOf($argument0);
    }, (): ParameterDeclaration__from_ast => {
        return ParameterDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ParenthesizedExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ParenthesizedExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<ParenthesizedExpression__from_ast>($argument0, ($argument0: RuntimeSlice<ParenthesizedExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ParenthesizedExpression__from_ast$Storage>): RuntimeSlice<ParenthesizedExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ParenthesizedExpression__from_ast): ParenthesizedExpression__from_ast => {
        return ParenthesizedExpression__from_ast.$copy($argument0);
    }, ($argument0: ParenthesizedExpression__from_ast$Storage): ParenthesizedExpression__from_ast => {
        return ParenthesizedExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ParenthesizedExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ParenthesizedExpression__from_ast$Storage, ParenthesizedExpression__from_ast>(goSliceAddress<ParenthesizedExpression__from_ast$Storage>($argument0, $argument1), ParenthesizedExpression__from_ast.$fromStorage, ParenthesizedExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ParenthesizedExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ParenthesizedExpression__from_ast): ParenthesizedExpression__from_ast$Storage => {
        return ParenthesizedExpression__from_ast.$storageOf($argument0);
    }, (): ParenthesizedExpression__from_ast => {
        return ParenthesizedExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ParenthesizedTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ParenthesizedTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<ParenthesizedTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<ParenthesizedTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ParenthesizedTypeNode__from_ast$Storage>): RuntimeSlice<ParenthesizedTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ParenthesizedTypeNode__from_ast): ParenthesizedTypeNode__from_ast => {
        return ParenthesizedTypeNode__from_ast.$copy($argument0);
    }, ($argument0: ParenthesizedTypeNode__from_ast$Storage): ParenthesizedTypeNode__from_ast => {
        return ParenthesizedTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ParenthesizedTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ParenthesizedTypeNode__from_ast$Storage, ParenthesizedTypeNode__from_ast>(goSliceAddress<ParenthesizedTypeNode__from_ast$Storage>($argument0, $argument1), ParenthesizedTypeNode__from_ast.$fromStorage, ParenthesizedTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ParenthesizedTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ParenthesizedTypeNode__from_ast): ParenthesizedTypeNode__from_ast$Storage => {
        return ParenthesizedTypeNode__from_ast.$storageOf($argument0);
    }, (): ParenthesizedTypeNode__from_ast => {
        return ParenthesizedTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$PrefixUnaryExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<PrefixUnaryExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<PrefixUnaryExpression__from_ast>($argument0, ($argument0: RuntimeSlice<PrefixUnaryExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<PrefixUnaryExpression__from_ast$Storage>): RuntimeSlice<PrefixUnaryExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: PrefixUnaryExpression__from_ast): PrefixUnaryExpression__from_ast => {
        return PrefixUnaryExpression__from_ast.$copy($argument0);
    }, ($argument0: PrefixUnaryExpression__from_ast$Storage): PrefixUnaryExpression__from_ast => {
        return PrefixUnaryExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<PrefixUnaryExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<PrefixUnaryExpression__from_ast$Storage, PrefixUnaryExpression__from_ast>(goSliceAddress<PrefixUnaryExpression__from_ast$Storage>($argument0, $argument1), PrefixUnaryExpression__from_ast.$fromStorage, PrefixUnaryExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<PrefixUnaryExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: PrefixUnaryExpression__from_ast): PrefixUnaryExpression__from_ast$Storage => {
        return PrefixUnaryExpression__from_ast.$storageOf($argument0);
    }, (): PrefixUnaryExpression__from_ast => {
        return PrefixUnaryExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$PropertyAccessExpression($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<PropertyAccessExpression__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined {
    return Arena__from_core.New$kernel<PropertyAccessExpression__from_ast>($argument0, ($argument0: RuntimeSlice<PropertyAccessExpression__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<PropertyAccessExpression__from_ast$Storage>): RuntimeSlice<PropertyAccessExpression__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: PropertyAccessExpression__from_ast): PropertyAccessExpression__from_ast => {
        return PropertyAccessExpression__from_ast.$copy($argument0);
    }, ($argument0: PropertyAccessExpression__from_ast$Storage): PropertyAccessExpression__from_ast => {
        return PropertyAccessExpression__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<PropertyAccessExpression__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<PropertyAccessExpression__from_ast$Storage, PropertyAccessExpression__from_ast>(goSliceAddress<PropertyAccessExpression__from_ast$Storage>($argument0, $argument1), PropertyAccessExpression__from_ast.$fromStorage, PropertyAccessExpression__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<PropertyAccessExpression__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: PropertyAccessExpression__from_ast): PropertyAccessExpression__from_ast$Storage => {
        return PropertyAccessExpression__from_ast.$storageOf($argument0);
    }, (): PropertyAccessExpression__from_ast => {
        return PropertyAccessExpression__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$PropertyAssignment($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<PropertyAssignment__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined {
    return Arena__from_core.New$kernel<PropertyAssignment__from_ast>($argument0, ($argument0: RuntimeSlice<PropertyAssignment__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<PropertyAssignment__from_ast$Storage>): RuntimeSlice<PropertyAssignment__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: PropertyAssignment__from_ast): PropertyAssignment__from_ast => {
        return PropertyAssignment__from_ast.$copy($argument0);
    }, ($argument0: PropertyAssignment__from_ast$Storage): PropertyAssignment__from_ast => {
        return PropertyAssignment__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<PropertyAssignment__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<PropertyAssignment__from_ast$Storage, PropertyAssignment__from_ast>(goSliceAddress<PropertyAssignment__from_ast$Storage>($argument0, $argument1), PropertyAssignment__from_ast.$fromStorage, PropertyAssignment__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<PropertyAssignment__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: PropertyAssignment__from_ast): PropertyAssignment__from_ast$Storage => {
        return PropertyAssignment__from_ast.$storageOf($argument0);
    }, (): PropertyAssignment__from_ast => {
        return PropertyAssignment__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$PropertySignatureDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<PropertySignatureDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<PropertySignatureDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<PropertySignatureDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<PropertySignatureDeclaration__from_ast$Storage>): RuntimeSlice<PropertySignatureDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: PropertySignatureDeclaration__from_ast): PropertySignatureDeclaration__from_ast => {
        return PropertySignatureDeclaration__from_ast.$copy($argument0);
    }, ($argument0: PropertySignatureDeclaration__from_ast$Storage): PropertySignatureDeclaration__from_ast => {
        return PropertySignatureDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<PropertySignatureDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<PropertySignatureDeclaration__from_ast$Storage, PropertySignatureDeclaration__from_ast>(goSliceAddress<PropertySignatureDeclaration__from_ast$Storage>($argument0, $argument1), PropertySignatureDeclaration__from_ast.$fromStorage, PropertySignatureDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<PropertySignatureDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: PropertySignatureDeclaration__from_ast): PropertySignatureDeclaration__from_ast$Storage => {
        return PropertySignatureDeclaration__from_ast.$storageOf($argument0);
    }, (): PropertySignatureDeclaration__from_ast => {
        return PropertySignatureDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$ReturnStatement($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<ReturnStatement__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast> | undefined {
    return Arena__from_core.New$kernel<ReturnStatement__from_ast>($argument0, ($argument0: RuntimeSlice<ReturnStatement__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<ReturnStatement__from_ast$Storage>): RuntimeSlice<ReturnStatement__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: ReturnStatement__from_ast): ReturnStatement__from_ast => {
        return ReturnStatement__from_ast.$copy($argument0);
    }, ($argument0: ReturnStatement__from_ast$Storage): ReturnStatement__from_ast => {
        return ReturnStatement__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<ReturnStatement__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<ReturnStatement__from_ast$Storage, ReturnStatement__from_ast>(goSliceAddress<ReturnStatement__from_ast$Storage>($argument0, $argument1), ReturnStatement__from_ast.$fromStorage, ReturnStatement__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<ReturnStatement__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: ReturnStatement__from_ast): ReturnStatement__from_ast$Storage => {
        return ReturnStatement__from_ast.$storageOf($argument0);
    }, (): ReturnStatement__from_ast => {
        return ReturnStatement__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$StringLiteral($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<StringLiteral__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined {
    return Arena__from_core.New$kernel<StringLiteral__from_ast>($argument0, ($argument0: RuntimeSlice<StringLiteral__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<StringLiteral__from_ast$Storage>): RuntimeSlice<StringLiteral__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: StringLiteral__from_ast): StringLiteral__from_ast => {
        return StringLiteral__from_ast.$copy($argument0);
    }, ($argument0: StringLiteral__from_ast$Storage): StringLiteral__from_ast => {
        return StringLiteral__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<StringLiteral__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<StringLiteral__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<StringLiteral__from_ast$Storage, StringLiteral__from_ast>(goSliceAddress<StringLiteral__from_ast$Storage>($argument0, $argument1), StringLiteral__from_ast.$fromStorage, StringLiteral__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<StringLiteral__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: StringLiteral__from_ast): StringLiteral__from_ast$Storage => {
        return StringLiteral__from_ast.$storageOf($argument0);
    }, (): StringLiteral__from_ast => {
        return StringLiteral__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<Symbol__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return Arena__from_core.New$kernel<Symbol__from_ast>($argument0, ($argument0: RuntimeSlice<Symbol__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<Symbol__from_ast$Storage>): RuntimeSlice<Symbol__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: Symbol__from_ast): Symbol__from_ast => {
        return Symbol__from_ast.$copy($argument0);
    }, ($argument0: Symbol__from_ast$Storage): Symbol__from_ast => {
        return Symbol__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Symbol__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<Symbol__from_ast$Storage, Symbol__from_ast>(goSliceAddress<Symbol__from_ast$Storage>($argument0, $argument1), Symbol__from_ast.$fromStorage, Symbol__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<Symbol__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Symbol__from_ast): Symbol__from_ast$Storage => {
        return Symbol__from_ast.$storageOf($argument0);
    }, (): Symbol__from_ast => {
        return Symbol__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$Token($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<Token__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<Token__from_ast> | undefined {
    return Arena__from_core.New$kernel<Token__from_ast>($argument0, ($argument0: RuntimeSlice<Token__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<Token__from_ast$Storage>): RuntimeSlice<Token__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: Token__from_ast): Token__from_ast => {
        return Token__from_ast.$copy($argument0);
    }, ($argument0: Token__from_ast$Storage): Token__from_ast => {
        return Token__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Token__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<Token__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<Token__from_ast$Storage, Token__from_ast>(goSliceAddress<Token__from_ast$Storage>($argument0, $argument1), Token__from_ast.$fromStorage, Token__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<Token__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Token__from_ast): Token__from_ast$Storage => {
        return Token__from_ast.$storageOf($argument0);
    }, (): Token__from_ast => {
        return Token__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$TypeAliasDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<TypeAliasDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<TypeAliasDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<TypeAliasDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeAliasDeclaration__from_ast$Storage>): RuntimeSlice<TypeAliasDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: TypeAliasDeclaration__from_ast): TypeAliasDeclaration__from_ast => {
        return TypeAliasDeclaration__from_ast.$copy($argument0);
    }, ($argument0: TypeAliasDeclaration__from_ast$Storage): TypeAliasDeclaration__from_ast => {
        return TypeAliasDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeAliasDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeAliasDeclaration__from_ast$Storage, TypeAliasDeclaration__from_ast>(goSliceAddress<TypeAliasDeclaration__from_ast$Storage>($argument0, $argument1), TypeAliasDeclaration__from_ast.$fromStorage, TypeAliasDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<TypeAliasDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: TypeAliasDeclaration__from_ast): TypeAliasDeclaration__from_ast$Storage => {
        return TypeAliasDeclaration__from_ast.$storageOf($argument0);
    }, (): TypeAliasDeclaration__from_ast => {
        return TypeAliasDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$TypeLiteralNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<TypeLiteralNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<TypeLiteralNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<TypeLiteralNode__from_ast>($argument0, ($argument0: RuntimeSlice<TypeLiteralNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeLiteralNode__from_ast$Storage>): RuntimeSlice<TypeLiteralNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: TypeLiteralNode__from_ast): TypeLiteralNode__from_ast => {
        return TypeLiteralNode__from_ast.$copy($argument0);
    }, ($argument0: TypeLiteralNode__from_ast$Storage): TypeLiteralNode__from_ast => {
        return TypeLiteralNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeLiteralNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeLiteralNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeLiteralNode__from_ast$Storage, TypeLiteralNode__from_ast>(goSliceAddress<TypeLiteralNode__from_ast$Storage>($argument0, $argument1), TypeLiteralNode__from_ast.$fromStorage, TypeLiteralNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<TypeLiteralNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: TypeLiteralNode__from_ast): TypeLiteralNode__from_ast$Storage => {
        return TypeLiteralNode__from_ast.$storageOf($argument0);
    }, (): TypeLiteralNode__from_ast => {
        return TypeLiteralNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$TypeOperatorNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<TypeOperatorNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<TypeOperatorNode__from_ast>($argument0, ($argument0: RuntimeSlice<TypeOperatorNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeOperatorNode__from_ast$Storage>): RuntimeSlice<TypeOperatorNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: TypeOperatorNode__from_ast): TypeOperatorNode__from_ast => {
        return TypeOperatorNode__from_ast.$copy($argument0);
    }, ($argument0: TypeOperatorNode__from_ast$Storage): TypeOperatorNode__from_ast => {
        return TypeOperatorNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeOperatorNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeOperatorNode__from_ast$Storage, TypeOperatorNode__from_ast>(goSliceAddress<TypeOperatorNode__from_ast$Storage>($argument0, $argument1), TypeOperatorNode__from_ast.$fromStorage, TypeOperatorNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<TypeOperatorNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: TypeOperatorNode__from_ast): TypeOperatorNode__from_ast$Storage => {
        return TypeOperatorNode__from_ast.$storageOf($argument0);
    }, (): TypeOperatorNode__from_ast => {
        return TypeOperatorNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$TypeParameterDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<TypeParameterDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<TypeParameterDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<TypeParameterDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeParameterDeclaration__from_ast$Storage>): RuntimeSlice<TypeParameterDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: TypeParameterDeclaration__from_ast): TypeParameterDeclaration__from_ast => {
        return TypeParameterDeclaration__from_ast.$copy($argument0);
    }, ($argument0: TypeParameterDeclaration__from_ast$Storage): TypeParameterDeclaration__from_ast => {
        return TypeParameterDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeParameterDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeParameterDeclaration__from_ast$Storage, TypeParameterDeclaration__from_ast>(goSliceAddress<TypeParameterDeclaration__from_ast$Storage>($argument0, $argument1), TypeParameterDeclaration__from_ast.$fromStorage, TypeParameterDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<TypeParameterDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: TypeParameterDeclaration__from_ast): TypeParameterDeclaration__from_ast$Storage => {
        return TypeParameterDeclaration__from_ast.$storageOf($argument0);
    }, (): TypeParameterDeclaration__from_ast => {
        return TypeParameterDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$TypeReferenceNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<TypeReferenceNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<TypeReferenceNode__from_ast>($argument0, ($argument0: RuntimeSlice<TypeReferenceNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<TypeReferenceNode__from_ast$Storage>): RuntimeSlice<TypeReferenceNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: TypeReferenceNode__from_ast): TypeReferenceNode__from_ast => {
        return TypeReferenceNode__from_ast.$copy($argument0);
    }, ($argument0: TypeReferenceNode__from_ast$Storage): TypeReferenceNode__from_ast => {
        return TypeReferenceNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<TypeReferenceNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<TypeReferenceNode__from_ast$Storage, TypeReferenceNode__from_ast>(goSliceAddress<TypeReferenceNode__from_ast$Storage>($argument0, $argument1), TypeReferenceNode__from_ast.$fromStorage, TypeReferenceNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<TypeReferenceNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: TypeReferenceNode__from_ast): TypeReferenceNode__from_ast$Storage => {
        return TypeReferenceNode__from_ast.$storageOf($argument0);
    }, (): TypeReferenceNode__from_ast => {
        return TypeReferenceNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$UnionTypeNode($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<UnionTypeNode__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast> | undefined {
    return Arena__from_core.New$kernel<UnionTypeNode__from_ast>($argument0, ($argument0: RuntimeSlice<UnionTypeNode__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<UnionTypeNode__from_ast$Storage>): RuntimeSlice<UnionTypeNode__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: UnionTypeNode__from_ast): UnionTypeNode__from_ast => {
        return UnionTypeNode__from_ast.$copy($argument0);
    }, ($argument0: UnionTypeNode__from_ast$Storage): UnionTypeNode__from_ast => {
        return UnionTypeNode__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<UnionTypeNode__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<UnionTypeNode__from_ast$Storage, UnionTypeNode__from_ast>(goSliceAddress<UnionTypeNode__from_ast$Storage>($argument0, $argument1), UnionTypeNode__from_ast.$fromStorage, UnionTypeNode__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<UnionTypeNode__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: UnionTypeNode__from_ast): UnionTypeNode__from_ast$Storage => {
        return UnionTypeNode__from_ast.$storageOf($argument0);
    }, (): UnionTypeNode__from_ast => {
        return UnionTypeNode__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$VariableDeclaration($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<VariableDeclaration__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined {
    return Arena__from_core.New$kernel<VariableDeclaration__from_ast>($argument0, ($argument0: RuntimeSlice<VariableDeclaration__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<VariableDeclaration__from_ast$Storage>): RuntimeSlice<VariableDeclaration__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: VariableDeclaration__from_ast): VariableDeclaration__from_ast => {
        return VariableDeclaration__from_ast.$copy($argument0);
    }, ($argument0: VariableDeclaration__from_ast$Storage): VariableDeclaration__from_ast => {
        return VariableDeclaration__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<VariableDeclaration__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<VariableDeclaration__from_ast$Storage, VariableDeclaration__from_ast>(goSliceAddress<VariableDeclaration__from_ast$Storage>($argument0, $argument1), VariableDeclaration__from_ast.$fromStorage, VariableDeclaration__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<VariableDeclaration__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: VariableDeclaration__from_ast): VariableDeclaration__from_ast$Storage => {
        return VariableDeclaration__from_ast.$storageOf($argument0);
    }, (): VariableDeclaration__from_ast => {
        return VariableDeclaration__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$VariableDeclarationList($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<VariableDeclarationList__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined {
    return Arena__from_core.New$kernel<VariableDeclarationList__from_ast>($argument0, ($argument0: RuntimeSlice<VariableDeclarationList__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<VariableDeclarationList__from_ast$Storage>): RuntimeSlice<VariableDeclarationList__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: VariableDeclarationList__from_ast): VariableDeclarationList__from_ast => {
        return VariableDeclarationList__from_ast.$copy($argument0);
    }, ($argument0: VariableDeclarationList__from_ast$Storage): VariableDeclarationList__from_ast => {
        return VariableDeclarationList__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<VariableDeclarationList__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<VariableDeclarationList__from_ast$Storage, VariableDeclarationList__from_ast>(goSliceAddress<VariableDeclarationList__from_ast$Storage>($argument0, $argument1), VariableDeclarationList__from_ast.$fromStorage, VariableDeclarationList__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<VariableDeclarationList__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: VariableDeclarationList__from_ast): VariableDeclarationList__from_ast$Storage => {
        return VariableDeclarationList__from_ast.$storageOf($argument0);
    }, (): VariableDeclarationList__from_ast => {
        return VariableDeclarationList__from_ast.$zero();
    });
}
export function Arena$New$Named_ast$VariableStatement($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<VariableStatement__from_ast>> | undefined): tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined {
    return Arena__from_core.New$kernel<VariableStatement__from_ast>($argument0, ($argument0: RuntimeSlice<VariableStatement__from_ast$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<VariableStatement__from_ast$Storage>): RuntimeSlice<VariableStatement__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: VariableStatement__from_ast): VariableStatement__from_ast => {
        return VariableStatement__from_ast.$copy($argument0);
    }, ($argument0: VariableStatement__from_ast$Storage): VariableStatement__from_ast => {
        return VariableStatement__from_ast.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<VariableStatement__from_ast$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<VariableStatement__from_ast$Storage, VariableStatement__from_ast>(goSliceAddress<VariableStatement__from_ast$Storage>($argument0, $argument1), VariableStatement__from_ast.$fromStorage, VariableStatement__from_ast.$storageOf);
    }, ($argument0: RuntimeSlice<VariableStatement__from_ast$Storage>): int => {
        return $argument0.length;
    }, ($argument0: VariableStatement__from_ast): VariableStatement__from_ast$Storage => {
        return VariableStatement__from_ast.$storageOf($argument0);
    }, (): VariableStatement__from_ast => {
        return VariableStatement__from_ast.$zero();
    });
}
export function Arena$New$Named_checker$IndexInfo($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<IndexInfo__from_checker>> | undefined): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined {
    return Arena__from_core.New$kernel<IndexInfo__from_checker>($argument0, ($argument0: RuntimeSlice<IndexInfo__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<IndexInfo__from_checker$Storage>): RuntimeSlice<IndexInfo__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: IndexInfo__from_checker): IndexInfo__from_checker => {
        return IndexInfo__from_checker.$copy($argument0);
    }, ($argument0: IndexInfo__from_checker$Storage): IndexInfo__from_checker => {
        return IndexInfo__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<IndexInfo__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<IndexInfo__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<IndexInfo__from_checker$Storage, IndexInfo__from_checker>(goSliceAddress<IndexInfo__from_checker$Storage>($argument0, $argument1), IndexInfo__from_checker.$fromStorage, IndexInfo__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<IndexInfo__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: IndexInfo__from_checker): IndexInfo__from_checker$Storage => {
        return IndexInfo__from_checker.$storageOf($argument0);
    }, (): IndexInfo__from_checker => {
        return IndexInfo__from_checker.$zero();
    });
}
export function Arena$New$Named_checker$Signature($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<Signature__from_checker>> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined {
    return Arena__from_core.New$kernel<Signature__from_checker>($argument0, ($argument0: RuntimeSlice<Signature__from_checker$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<Signature__from_checker$Storage>): RuntimeSlice<Signature__from_checker$Storage> => {
        return $argument0;
    }, ($argument0: Signature__from_checker): Signature__from_checker => {
        return Signature__from_checker.$copy($argument0);
    }, ($argument0: Signature__from_checker$Storage): Signature__from_checker => {
        return Signature__from_checker.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Signature__from_checker$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<Signature__from_checker$Storage, Signature__from_checker>(goSliceAddress<Signature__from_checker$Storage>($argument0, $argument1), Signature__from_checker.$fromStorage, Signature__from_checker.$storageOf);
    }, ($argument0: RuntimeSlice<Signature__from_checker$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Signature__from_checker): Signature__from_checker$Storage => {
        return Signature__from_checker.$storageOf($argument0);
    }, (): Signature__from_checker => {
        return Signature__from_checker.$zero();
    });
}
export function Arena$New$Named_printer$commentState($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<commentState__from_printer>> | undefined): tsonicTypeScriptRuntime.Location<commentState__from_printer> | undefined {
    return Arena__from_core.New$kernel<commentState__from_printer>($argument0, ($argument0: RuntimeSlice<commentState__from_printer$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<commentState__from_printer$Storage>): RuntimeSlice<commentState__from_printer$Storage> => {
        return $argument0;
    }, ($argument0: commentState__from_printer): commentState__from_printer => {
        return commentState__from_printer.$copy($argument0);
    }, ($argument0: commentState__from_printer$Storage): commentState__from_printer => {
        return commentState__from_printer.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<commentState__from_printer$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<commentState__from_printer> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<commentState__from_printer$Storage, commentState__from_printer>(goSliceAddress<commentState__from_printer$Storage>($argument0, $argument1), commentState__from_printer.$fromStorage, commentState__from_printer.$storageOf);
    }, ($argument0: RuntimeSlice<commentState__from_printer$Storage>): int => {
        return $argument0.length;
    }, ($argument0: commentState__from_printer): commentState__from_printer$Storage => {
        return commentState__from_printer.$storageOf($argument0);
    }, (): commentState__from_printer => {
        return commentState__from_printer.$zero();
    });
}
export function Arena$New$Named_printer$sourceMapState($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<sourceMapState__from_printer>> | undefined): tsonicTypeScriptRuntime.Location<sourceMapState__from_printer> | undefined {
    return Arena__from_core.New$kernel<sourceMapState__from_printer>($argument0, ($argument0: RuntimeSlice<sourceMapState__from_printer$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<sourceMapState__from_printer$Storage>): RuntimeSlice<sourceMapState__from_printer$Storage> => {
        return $argument0;
    }, ($argument0: sourceMapState__from_printer): sourceMapState__from_printer => {
        return sourceMapState__from_printer.$copy($argument0);
    }, ($argument0: sourceMapState__from_printer$Storage): sourceMapState__from_printer => {
        return sourceMapState__from_printer.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<sourceMapState__from_printer$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<sourceMapState__from_printer> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<sourceMapState__from_printer$Storage, sourceMapState__from_printer>(goSliceAddress<sourceMapState__from_printer$Storage>($argument0, $argument1), sourceMapState__from_printer.$fromStorage, sourceMapState__from_printer.$storageOf);
    }, ($argument0: RuntimeSlice<sourceMapState__from_printer$Storage>): int => {
        return $argument0.length;
    }, ($argument0: sourceMapState__from_printer): sourceMapState__from_printer$Storage => {
        return sourceMapState__from_printer.$storageOf($argument0);
    }, (): sourceMapState__from_printer => {
        return sourceMapState__from_printer.$zero();
    });
}
export function Arena$New$Named_sourcemap$Mapping($argument0: tsonicTypeScriptRuntime.Location<Arena__from_core<Mapping__from_sourcemap>> | undefined): tsonicTypeScriptRuntime.Location<Mapping__from_sourcemap> | undefined {
    return Arena__from_core.New$kernel<Mapping__from_sourcemap>($argument0, ($argument0: RuntimeSlice<Mapping__from_sourcemap$Storage>): int => {
        return $argument0.capacity;
    }, ($argument0: RuntimeSlice<Mapping__from_sourcemap$Storage>): RuntimeSlice<Mapping__from_sourcemap$Storage> => {
        return $argument0;
    }, ($argument0: Mapping__from_sourcemap): Mapping__from_sourcemap => {
        return Mapping__from_sourcemap.$copy($argument0);
    }, ($argument0: Mapping__from_sourcemap$Storage): Mapping__from_sourcemap => {
        return Mapping__from_sourcemap.$fromStorage($argument0);
    }, ($argument0: RuntimeSlice<Mapping__from_sourcemap$Storage>, $argument1: int): tsonicTypeScriptRuntime.Location<Mapping__from_sourcemap> | undefined => {
        return tsonicTypeScriptRuntime.projectLocation<Mapping__from_sourcemap$Storage, Mapping__from_sourcemap>(goSliceAddress<Mapping__from_sourcemap$Storage>($argument0, $argument1), Mapping__from_sourcemap.$fromStorage, Mapping__from_sourcemap.$storageOf);
    }, ($argument0: RuntimeSlice<Mapping__from_sourcemap$Storage>): int => {
        return $argument0.length;
    }, ($argument0: Mapping__from_sourcemap): Mapping__from_sourcemap$Storage => {
        return Mapping__from_sourcemap.$storageOf($argument0);
    }, (): Mapping__from_sourcemap => {
        return Mapping__from_sourcemap.$zero();
    });
}
