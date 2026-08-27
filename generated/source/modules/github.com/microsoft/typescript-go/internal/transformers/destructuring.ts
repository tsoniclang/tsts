import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, GetElementsOfBindingOrAssignmentPattern as GetElementsOfBindingOrAssignmentPattern__from_ast, GetRestIndicatorOfBindingOrAssignmentElement as GetRestIndicatorOfBindingOrAssignmentElement__from_ast, GetTargetOfBindingOrAssignmentElement as GetTargetOfBindingOrAssignmentElement__from_ast, IsAssignmentExpression as IsAssignmentExpression__from_ast, IsAssignmentPattern as IsAssignmentPattern__from_ast, IsBigIntLiteral as IsBigIntLiteral__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsDeclarationBindingElement as IsDeclarationBindingElement__from_ast, IsDestructuringAssignment as IsDestructuringAssignment__from_ast, IsEmptyArrayLiteral as IsEmptyArrayLiteral__from_ast, IsEmptyObjectLiteral as IsEmptyObjectLiteral__from_ast, IsIdentifier as IsIdentifier__from_ast, IsLiteralExpression as IsLiteralExpression__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyNameLiteral as IsPropertyNameLiteral__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsSpreadElement as IsSpreadElement__from_ast, IsStringOrNumericLiteralLike as IsStringOrNumericLiteralLike__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SubtreeContainsObjectRestOrSpread$constant as SubtreeContainsObjectRestOrSpread$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TryGetPropertyNameOfBindingOrAssignmentElement as TryGetPropertyNameOfBindingOrAssignmentElement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Every$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Transformer } from "./transformer.js";
import { IsSimpleCopiableExpression, IsSimpleInlineableExpression } from "./utilities.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class FlattenLevel {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function FlattenLevelAll$constant(): FlattenLevel {
    return new FlattenLevel(0);
}
export function FlattenLevelObjectRest$constant(): FlattenLevel {
    return new FlattenLevel(1);
}
export class CreateAssignmentCallback {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined) {
    }
    declare private readonly then?: never;
}
export function FlattenDestructuringAssignment(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, needsValue: bool, level: FlattenLevel, createAssignmentCallback: CreateAssignmentCallback): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let f: flattener | undefined = newFlattener(tx, level);
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createAssignmentCallback = createAssignmentCallback;
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hoistTempVariables = true;
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment = ($argument0: flattener | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument3: TextRange__from_core, $argument4: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        flattener.$go$private$transformers$emitAssignment($argument0, $argument1, $argument2, $argument3, $argument4);
    };
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createArrayBindingOrAssignmentPattern = ($argument0: flattener | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return flattener.$go$private$transformers$createArrayAssignmentPattern($argument0, $argument1);
    };
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createObjectBindingOrAssignmentPattern = ($argument0: flattener | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return flattener.$go$private$transformers$createObjectAssignmentPattern($argument0, $argument1);
    };
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createArrayBindingOrAssignmentElement = ($argument0: flattener | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return flattener.$go$private$transformers$createArrayAssignmentElement($argument0, $argument1);
    };
    return flattener.$go$private$transformers$flattenDestructuringAssignment(f, node, needsValue);
}
export type pendingDecl$Storage = {
    pendingExpressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    location: TextRange__from_core$Storage;
    original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class pendingDecl {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: pendingDecl$Storage) {
    }
    public static $storageOf($source: pendingDecl): pendingDecl$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: pendingDecl$Storage): pendingDecl {
        return new pendingDecl($source);
    }
    public get pendingExpressions(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return this.$storage.pendingExpressions;
    }
    public set pendingExpressions($value: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
        this.$storage.pendingExpressions = $value;
    }
    public get name(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.name;
    }
    public set name($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.name = $value;
    }
    public get value(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.value;
    }
    public set value($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.value = $value;
    }
    public get location(): TextRange__from_core {
        return TextRange__from_core.$fromStorage(this.$storage.location);
    }
    public set location($value: TextRange__from_core) {
        this.$storage.location = TextRange__from_core.$storageOf($value);
    }
    public get original(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.original;
    }
    public set original($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.original = $value;
    }
    static $zero(): pendingDecl {
        return new pendingDecl({
            pendingExpressions: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(),
            name: void 0,
            value: void 0,
            location: TextRange__from_core.$storageOf(TextRange__from_core.$zero()),
            original: void 0
        });
    }
    static $copy($source: pendingDecl): pendingDecl {
        return new pendingDecl({
            pendingExpressions: $source.$storage.pendingExpressions,
            name: $source.$storage.name,
            value: $source.$storage.value,
            location: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage($source.$storage.location))),
            original: $source.$storage.original
        });
    }
    declare private readonly then?: never;
}
export function FlattenDestructuringBinding(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, rval: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, level: FlattenLevel, hoistTempVariables: bool, skipInitializer: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let f: flattener | undefined = newFlattener(tx, level);
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hoistTempVariables = hoistTempVariables;
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment = ($argument0: flattener | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument3: TextRange__from_core, $argument4: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        flattener.$go$private$transformers$emitBinding($argument0, $argument1, $argument2, $argument3, $argument4);
    };
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createArrayBindingOrAssignmentPattern = ($argument0: flattener | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return flattener.$go$private$transformers$createArrayBindingPattern($argument0, $argument1);
    };
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createObjectBindingOrAssignmentPattern = ($argument0: flattener | undefined, $argument1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return flattener.$go$private$transformers$createObjectBindingPattern($argument0, $argument1);
    };
    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createArrayBindingOrAssignmentElement = ($argument0: flattener | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return flattener.$go$private$transformers$createArrayBindingElement($argument0, $argument1);
    };
    return flattener.$go$private$transformers$flattenDestructuringBinding(f, node, rval, skipInitializer);
}
export class flattener {
    declare private readonly $goType: void;
    public constructor(public tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined, public level: FlattenLevel, public createAssignmentCallback: CreateAssignmentCallback, public expressions: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public declarations: RuntimeSlice<pendingDecl$Storage>, public hasTransformedPriorElement: bool, public hoistTempVariables: bool, public emitBindingOrAssignment: (($0: flattener | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $3: TextRange__from_core, $4: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => void) | undefined, public createArrayBindingOrAssignmentPattern: (($0: flattener | undefined, $1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, public createObjectBindingOrAssignmentPattern: (($0: flattener | undefined, $1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, public createArrayBindingOrAssignmentElement: (($0: flattener | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$transformers$createArrayAssignmentElement(f: flattener | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return expr;
    }
    static $go$private$transformers$createArrayAssignmentPattern(f: flattener | undefined, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_0 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory");
        const __gotots_store_1 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_3 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeFactory"), elements);
        const __gotots_argument_4 = false;
        return NodeFactory__from_ast.NewArrayLiteralExpression(__gotots_receiver_0, __gotots_argument_3, __gotots_argument_4);
    }
    static $go$private$transformers$createArrayBindingElement(f: flattener | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_18 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewBindingElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), void 0, void 0, expr, void 0);
    }
    static $go$private$transformers$createArrayBindingPattern(f: flattener | undefined, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_14 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory");
        const __gotots_argument_58 = KindArrayBindingPattern$constant__from_ast();
        const __gotots_store_15 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_59 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), elements);
        return NodeFactory__from_ast.NewBindingPattern(__gotots_receiver_4, __gotots_argument_58, __gotots_argument_59);
    }
    static $go$private$transformers$createDefaultValueCheck(f: flattener | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, defaultValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        value = flattener.$go$private$transformers$ensureIdentifier(f, value, true, TextRange__from_core.$copy(location));
        const __gotots_store_5 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory");
        const __gotots_argument_17 = NodeFactory__from_printer.NewTypeCheck(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), value, "undefined");
        const __gotots_store_6 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_18 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), KindQuestionToken$constant__from_ast());
        const __gotots_argument_19 = defaultValue;
        const __gotots_store_7 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_20 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory"), KindColonToken$constant__from_ast());
        const __gotots_argument_21 = value;
        return NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_2, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
    }
    static $go$private$transformers$createDestructuringPropertyAccess(f: flattener | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsComputedPropertyName__from_ast(propertyName)) {
            let argumentExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = flattener.$go$private$transformers$ensureIdentifier(f, NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), Node__from_ast.Expression(propertyName)), false, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((propertyName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_10 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), value, void 0, argumentExpression, NodeFlagsNone$constant__from_ast());
        }
        else if (IsStringOrNumericLiteralLike__from_ast(propertyName) || IsBigIntLiteral__from_ast(propertyName)) {
            let argumentExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(propertyName, new GoInterfaceAdapter(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx)));
            const __gotots_store_11 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"), value, void 0, argumentExpression, NodeFlagsNone$constant__from_ast());
        }
        else {
            const __gotots_store_12 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), Node__from_ast.Text(propertyName));
            const __gotots_store_13 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), value, void 0, name, NodeFlagsNone$constant__from_ast());
        }
    }
    static $go$private$transformers$createObjectAssignmentPattern(f: flattener | undefined, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_2 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeFactory");
        const __gotots_store_3 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_5 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), elements);
        const __gotots_argument_6 = false;
        return NodeFactory__from_ast.NewObjectLiteralExpression(__gotots_receiver_1, __gotots_argument_5, __gotots_argument_6);
    }
    static $go$private$transformers$createObjectBindingPattern(f: flattener | undefined, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_16 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory");
        const __gotots_argument_60 = KindObjectBindingPattern$constant__from_ast();
        const __gotots_store_17 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_61 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory"), elements);
        return NodeFactory__from_ast.NewBindingPattern(__gotots_receiver_5, __gotots_argument_60, __gotots_argument_61);
    }
    static $go$private$transformers$emitAssignment(f: flattener | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: TextRange__from_core, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const location$location = tsonicTypeScriptRuntime.boundLocation({}, () => location, location$next => location = location$next);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createAssignmentCallback.$value === undefined) && IsIdentifier__from_ast(target)) {
            const __gotots_callee_0 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createAssignmentCallback.$value;
            const __gotots_argument_0 = target;
            const __gotots_argument_1 = value;
            const __gotots_argument_2 = location$location;
            expression = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        }
        else {
            expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), target), value);
            Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
        }
        EmitContext__from_printer.SetOriginal(Transformer.EmitContext((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), expression, original);
        flattener.$go$private$transformers$emitExpression(f, expression);
    }
    static $go$private$transformers$emitBinding(f: flattener | undefined, target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: TextRange__from_core, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions.length > 0) {
            value = NodeFactory__from_printer.InlineExpressions(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions.append(void 0, [value]));
            (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        const __gotots_slice_build_4 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarations;
        const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
        let __gotots_slice_build_5 = __gotots_slice_build_4;
        if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
            __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
            __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void pendingDecl.$storageOf, (void pendingDecl.$fromStorage,
                {
                    name: target,
                    value: value,
                    location: TextRange__from_core.$storageOf(TextRange__from_core.$copy(location)),
                    original: original,
                    pendingExpressions: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()
                })));
        }
        else {
            __gotots_slice_build_5 = goSliceAllocate<pendingDecl$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                __gotots_slice_build_5.set(__gotots_slice_build_7, pendingDecl.$storageOf(pendingDecl.$copy(pendingDecl.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
            }
            __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void pendingDecl.$storageOf, (void pendingDecl.$fromStorage,
                {
                    name: target,
                    value: value,
                    location: TextRange__from_core.$storageOf(TextRange__from_core.$copy(location)),
                    original: original,
                    pendingExpressions: RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()
                })));
            for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                __gotots_slice_build_5.$initialize(__gotots_slice_build_7, pendingDecl.$storageOf(pendingDecl.$zero()));
            }
        }
        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarations = __gotots_slice_build_5;
    }
    static $go$private$transformers$emitExpression(f: flattener | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions.append(void 0, [expr]);
    }
    static $go$private$transformers$ensureIdentifier(f: flattener | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, reuseIdentifierExpressions: bool, location: TextRange__from_core): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (reuseIdentifierExpressions && IsIdentifier__from_ast(value)) {
            return value;
        }
        let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx));
        if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hoistTempVariables) {
            EmitContext__from_printer.AddVariableDeclaration(Transformer.EmitContext((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), temp);
            let assign: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), temp, value);
            Node__from_ast.$storageOf(((assign ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(location));
            flattener.$go$private$transformers$emitExpression(f, assign);
        }
        else {
            const __gotots_callee_1 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
            const __gotots_argument_7 = f;
            const __gotots_argument_8 = temp;
            const __gotots_argument_9 = value;
            const __gotots_argument_10 = TextRange__from_core.$copy(location);
            const __gotots_argument_11 = void 0;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
        }
        return temp;
    }
    static $go$private$transformers$flattenArrayBindingOrAssignmentPattern(f: flattener | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: TextRange__from_core): void {
        let elements = GetElementsOfBindingOrAssignmentPattern__from_ast(pattern);
        let numElements = elements.length;
        if (numElements !== 1 && ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).level.$value < FlattenLevelObjectRest$constant().$value || numElements === 0) || Every$PointerTo_Named_ast$Node(elements, IsOmittedExpression__from_ast)) {
            let reuseIdentifierExpressions = !IsDeclarationBindingElement__from_ast(parent) || numElements !== 0;
            value = flattener.$go$private$transformers$ensureIdentifier(f, value, reuseIdentifierExpressions, TextRange__from_core.$copy(location));
        }
        let bindingElements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let restContainingElements = RuntimeSlice.nil<restIdElemPair$Storage>();
        const __gotots_range_2 = elements;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_index_2;
            const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
            let i = __gotots_range_value_3;
            let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).level.$value >= FlattenLevelObjectRest$constant().$value) {
                if (!((Node__from_ast.SubtreeFacts(element) & SubtreeContainsObjectRestOrSpread$constant__from_ast()) >>> 0 === 0) || (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasTransformedPriorElement && !isSimpleBindingOrAssignmentElement(element)) {
                    (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasTransformedPriorElement = true;
                    let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx));
                    if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hoistTempVariables) {
                        EmitContext__from_printer.AddVariableDeclaration(Transformer.EmitContext((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), temp);
                    }
                    const __gotots_slice_build_0 = restContainingElements;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void restIdElemPair.$storageOf, (void restIdElemPair.$fromStorage,
                            {
                                id: temp,
                                element: element
                            })));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<restIdElemPair$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, restIdElemPair.$storageOf(restIdElemPair.$copy(restIdElemPair.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void restIdElemPair.$storageOf, (void restIdElemPair.$fromStorage,
                            {
                                id: temp,
                                element: element
                            })));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, restIdElemPair.$storageOf(restIdElemPair.$zero()));
                        }
                    }
                    restContainingElements = __gotots_slice_build_1;
                    const __gotots_argument_45 = bindingElements;
                    const __gotots_callee_9 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createArrayBindingOrAssignmentElement;
                    const __gotots_argument_43 = f;
                    const __gotots_argument_44 = temp;
                    const __gotots_argument_46 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43, __gotots_argument_44);
                    bindingElements = __gotots_argument_45.append(void 0, [__gotots_argument_46]);
                }
                else {
                    bindingElements = bindingElements.append(void 0, [element]);
                }
            }
            else if (IsOmittedExpression__from_ast(element)) {
                continue;
            }
            else if (GetRestIndicatorOfBindingOrAssignmentElement__from_ast(element) === undefined) {
                const __gotots_store_8 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory");
                const __gotots_argument_47 = value;
                const __gotots_argument_48 = void 0;
                const __gotots_store_9 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_49 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), strconv__from_gostdlib.Itoa(BigInt.asIntN(64, goNumberToBigInt(i))), TokenFlagsNone$constant__from_ast());
                const __gotots_argument_50 = NodeFlagsNone$constant__from_ast();
                let rhsValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_3, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
                flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, element, rhsValue, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), false);
            }
            else if (i === numElements - 1) {
                let rhsValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewArraySliceCall(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), value, i);
                flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, element, rhsValue, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), false);
            }
        }
        if (bindingElements.length > 0) {
            const __gotots_callee_11 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
            const __gotots_argument_53 = f;
            const __gotots_callee_10 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createArrayBindingOrAssignmentPattern;
            const __gotots_argument_51 = f;
            const __gotots_argument_52 = bindingElements;
            const __gotots_argument_54 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51, __gotots_argument_52);
            const __gotots_argument_55 = value;
            const __gotots_argument_56 = TextRange__from_core.$copy(location);
            const __gotots_argument_57 = pattern;
            (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57);
        }
        if (restContainingElements.length > 0) {
            const __gotots_range_3 = restContainingElements;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_5 = restIdElemPair.$copy(restIdElemPair.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
                let pair = __gotots_range_value_5;
                flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, restIdElemPair.$storageOf(pair).element, restIdElemPair.$storageOf(pair).id, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((restIdElemPair.$storageOf(pair).element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), false);
            }
        }
    }
    static $go$private$transformers$flattenBindingOrAssignmentElement(f: flattener | undefined, element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: TextRange__from_core, skipInitializer: bool): void {
        let bindingTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTargetOfBindingOrAssignmentElement__from_ast(element);
        if (bindingTarget === undefined) {
            return;
        }
        if (!skipInitializer) {
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), GetInitializerOfBindingOrAssignmentElement(element));
            if (!(initializer === undefined)) {
                if (!(value === undefined)) {
                    value = flattener.$go$private$transformers$createDefaultValueCheck(f, value, initializer, TextRange__from_core.$copy(location));
                    if (!IsSimpleCopiableExpression(initializer) && (IsBindingPattern__from_ast(bindingTarget) || IsAssignmentPattern__from_ast(bindingTarget))) {
                        value = flattener.$go$private$transformers$ensureIdentifier(f, value, true, TextRange__from_core.$copy(location));
                    }
                }
                else {
                    value = initializer;
                }
            }
            else if (value === undefined) {
                value = NodeFactory__from_printer.NewVoidZeroExpression(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx));
            }
        }
        if (isObjectBindingOrAssignmentPattern(bindingTarget)) {
            flattener.$go$private$transformers$flattenObjectBindingOrAssignmentPattern(f, element, bindingTarget, value, TextRange__from_core.$copy(location));
        }
        else if (isArrayBindingOrAssignmentPattern(bindingTarget)) {
            flattener.$go$private$transformers$flattenArrayBindingOrAssignmentPattern(f, element, bindingTarget, value, TextRange__from_core.$copy(location));
        }
        else {
            const __gotots_callee_2 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
            const __gotots_argument_12 = f;
            const __gotots_argument_13 = bindingTarget;
            const __gotots_argument_14 = value;
            const __gotots_argument_15 = TextRange__from_core.$copy(location);
            const __gotots_argument_16 = element;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
        }
    }
    static $go$private$transformers$flattenDestructuringAssignment(f: flattener | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, needsValue: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let location = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
        let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsDestructuringAssignment__from_ast(node)) {
            value = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
            for (; IsEmptyArrayLiteral__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left) || IsEmptyObjectLiteral__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);) {
                if (IsDestructuringAssignment__from_ast(value)) {
                    node = value;
                    location = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
                    value = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
                }
                else {
                    return NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), value);
                }
            }
        }
        if (!(value === undefined)) {
            value = NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), value);
            if (IsIdentifier__from_ast(value) && BindingOrAssignmentElementAssignsToName(node, Node__from_ast.Text(value)) || BindingOrAssignmentElementContainsNonLiteralComputedName(node)) {
                value = flattener.$go$private$transformers$ensureIdentifier(f, value, false, TextRange__from_core.$copy(location));
            }
            else if (needsValue) {
                value = flattener.$go$private$transformers$ensureIdentifier(f, value, true, TextRange__from_core.$copy(location));
            }
            else if (NodeIsSynthesized__from_ast(node)) {
                location = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc));
            }
        }
        flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, node, value, TextRange__from_core.$copy(location), IsDestructuringAssignment__from_ast(node));
        if (!(value === undefined) && needsValue) {
            if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions.length === 0) {
                return value;
            }
            (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions.append(void 0, [value]);
        }
        let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.InlineExpressions(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions);
        if (!(res === undefined)) {
            return res;
        }
        const __gotots_store_4 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewOmittedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"));
    }
    static $go$private$transformers$flattenDestructuringBinding(f: flattener | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, rval: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, skipInitializer: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsVariableDeclaration__from_ast(node)) {
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetInitializerOfBindingOrAssignmentElement(node);
            if (!(initializer === undefined) && (IsIdentifier__from_ast(initializer) && BindingOrAssignmentElementAssignsToName(node, Node__from_ast.Text(initializer)) || BindingOrAssignmentElementContainsNonLiteralComputedName(node))) {
                initializer = flattener.$go$private$transformers$ensureIdentifier(f, NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), initializer), false, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                const __gotots_store_19 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                node = NodeFactory__from_ast.UpdateVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), Node__from_ast.AsVariableDeclaration(node), Node__from_ast.Name(node), void 0, void 0, initializer);
            }
        }
        flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, node, rval, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), skipInitializer);
        if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions.length > 0) {
            let temp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx));
            if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hoistTempVariables) {
                let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.InlineExpressions(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions);
                (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                const __gotots_callee_12 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
                const __gotots_argument_62 = f;
                const __gotots_argument_63 = temp;
                const __gotots_argument_64 = value;
                const __gotots_struct_0 = TextRange__from_core.$zero();
                const __gotots_argument_65 = __gotots_struct_0;
                const __gotots_argument_66 = void 0;
                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62, __gotots_argument_63, __gotots_argument_64, __gotots_argument_65, __gotots_argument_66);
            }
            else {
                EmitContext__from_printer.AddVariableDeclaration(Transformer.EmitContext((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), temp);
                let last: tsonicTypeScriptRuntime.Location<pendingDecl> | undefined = tsonicTypeScriptRuntime.projectLocation<pendingDecl$Storage, pendingDecl>(goSliceAddress<pendingDecl$Storage>((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarations, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarations.length - 1), ($go$storage: pendingDecl$Storage): pendingDecl => {
                    return pendingDecl.$fromStorage($go$storage);
                }, ($go$value: pendingDecl): pendingDecl$Storage => {
                    return pendingDecl.$storageOf($go$value);
                });
                pendingDecl.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<pendingDecl>).value).pendingExpressions = pendingDecl.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<pendingDecl>).value).pendingExpressions.append(void 0, [NodeFactory__from_printer.NewAssignmentExpression(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), temp, pendingDecl.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<pendingDecl>).value).value)]);
                pendingDecl.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<pendingDecl>).value).pendingExpressions = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(pendingDecl.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<pendingDecl>).value).pendingExpressions, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressions, void 0);
                pendingDecl.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<pendingDecl>).value).value = temp;
            }
        }
        let decls = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarations.length, void 0);
        const __gotots_range_4 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarations;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_6 = pendingDecl.$copy(pendingDecl.$fromStorage(__gotots_range_4.get(__gotots_range_index_4)));
            let pending = __gotots_range_value_6;
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = pendingDecl.$storageOf(pending).value;
            if (pendingDecl.$storageOf(pending).pendingExpressions.length > 0) {
                expr = NodeFactory__from_printer.InlineExpressions(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), pendingDecl.$storageOf(pending).pendingExpressions.append(void 0, [pendingDecl.$storageOf(pending).value]));
            }
            const __gotots_store_20 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), pendingDecl.$storageOf(pending).name, void 0, void 0, expr);
            Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(pendingDecl.$storageOf(pending).location)));
            if (!(pendingDecl.$storageOf(pending).original === undefined)) {
                EmitContext__from_printer.SetOriginal(Transformer.EmitContext((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), decl, pendingDecl.$storageOf(pending).original);
            }
            decls = decls.append(void 0, [decl]);
        }
        if (decls.length === 1) {
            return decls.get(0);
        }
        if (decls.length === 0) {
            return void 0;
        }
        const __gotots_store_21 = (Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), decls);
    }
    static $go$private$transformers$flattenObjectBindingOrAssignmentPattern(f: flattener | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: TextRange__from_core): void {
        let elements = GetElementsOfBindingOrAssignmentPattern__from_ast(pattern);
        let numElements = elements.length;
        if (numElements !== 1) {
            let reuseIdentifierExpressions = !IsDeclarationBindingElement__from_ast(parent) || numElements !== 0;
            value = flattener.$go$private$transformers$ensureIdentifier(f, value, reuseIdentifierExpressions, TextRange__from_core.$copy(location));
        }
        let bindingElements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let computedTempVariables = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_1 = elements;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let i = __gotots_range_value_1;
            let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            if (GetRestIndicatorOfBindingOrAssignmentElement__from_ast(element) === undefined) {
                let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetPropertyNameOfBindingOrAssignmentElement__from_ast(element);
                if ((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).level.$value >= FlattenLevelObjectRest$constant().$value && (Node__from_ast.SubtreeFacts(element) & (196608)) >>> 0 === 0 && (Node__from_ast.SubtreeFacts(GetTargetOfBindingOrAssignmentElement__from_ast(element)) & (196608)) >>> 0 === 0 && !IsComputedPropertyName__from_ast(propertyName)) {
                    bindingElements = bindingElements.append(void 0, [NodeVisitor__from_ast.VisitNode(Transformer.Visitor((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), element)]);
                }
                else {
                    if (bindingElements.length > 0) {
                        const __gotots_callee_4 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
                        const __gotots_argument_24 = f;
                        const __gotots_callee_3 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createObjectBindingOrAssignmentPattern;
                        const __gotots_argument_22 = f;
                        const __gotots_argument_23 = bindingElements;
                        const __gotots_argument_25 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22, __gotots_argument_23);
                        const __gotots_argument_26 = value;
                        const __gotots_argument_27 = TextRange__from_core.$copy(location);
                        const __gotots_argument_28 = pattern;
                        (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28);
                        bindingElements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    }
                    let rhsValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = flattener.$go$private$transformers$createDestructuringPropertyAccess(f, value, propertyName);
                    if (IsComputedPropertyName__from_ast(propertyName)) {
                        computedTempVariables = computedTempVariables.append(void 0, [ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(rhsValue) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression]);
                    }
                    flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, element, rhsValue, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), false);
                }
            }
            else if (i === numElements - 1) {
                if (bindingElements.length > 0) {
                    const __gotots_callee_6 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
                    const __gotots_argument_31 = f;
                    const __gotots_callee_5 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createObjectBindingOrAssignmentPattern;
                    const __gotots_argument_29 = f;
                    const __gotots_argument_30 = bindingElements;
                    const __gotots_argument_32 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29, __gotots_argument_30);
                    const __gotots_argument_33 = value;
                    const __gotots_argument_34 = TextRange__from_core.$copy(location);
                    const __gotots_argument_35 = pattern;
                    (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                    bindingElements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                }
                let rhsValue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewRestHelper(Transformer.Factory((f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tx), value, elements, computedTempVariables, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                flattener.$go$private$transformers$flattenBindingOrAssignmentElement(f, element, rhsValue, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), false);
            }
        }
        if (bindingElements.length > 0) {
            const __gotots_callee_8 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitBindingOrAssignment;
            const __gotots_argument_38 = f;
            const __gotots_callee_7 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).createObjectBindingOrAssignmentPattern;
            const __gotots_argument_36 = f;
            const __gotots_argument_37 = bindingElements;
            const __gotots_argument_39 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36, __gotots_argument_37);
            const __gotots_argument_40 = value;
            const __gotots_argument_41 = TextRange__from_core.$copy(location);
            const __gotots_argument_42 = pattern;
            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
        }
    }
}
export function newFlattener(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined, level: FlattenLevel): flattener | undefined {
    return new flattener(tx, level, new CreateAssignmentCallback(void 0), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<pendingDecl$Storage>(), false, false, void 0, void 0, void 0, void 0);
}
export type restIdElemPair$Storage = {
    id: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
    element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class restIdElemPair {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: restIdElemPair$Storage) {
    }
    public static $storageOf($source: restIdElemPair): restIdElemPair$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: restIdElemPair$Storage): restIdElemPair {
        return new restIdElemPair($source);
    }
    public get id(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.id;
    }
    public set id($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.id = $value;
    }
    public get element(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.element;
    }
    public set element($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.element = $value;
    }
    static $zero(): restIdElemPair {
        return new restIdElemPair({
            id: void 0,
            element: void 0
        });
    }
    static $copy($source: restIdElemPair): restIdElemPair {
        return new restIdElemPair({
            id: $source.$storage.id,
            element: $source.$storage.element
        });
    }
    declare private readonly then?: never;
}
export function BindingOrAssignmentElementAssignsToName(element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring): bool {
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTargetOfBindingOrAssignmentElement__from_ast(element);
    if (target === undefined) {
        return false;
    }
    if (IsBindingPattern__from_ast(target) || IsAssignmentPattern__from_ast(target)) {
        return bindingOrAssignmentPatternAssignsToName(target, name);
    }
    else if (IsIdentifier__from_ast(target)) {
        return Node__from_ast.Text(target) === name;
    }
    return false;
}
export function bindingOrAssignmentPatternAssignsToName(pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: gostring): bool {
    let elements = GetElementsOfBindingOrAssignmentPattern__from_ast(pattern);
    const __gotots_range_0 = elements;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (BindingOrAssignmentElementAssignsToName(element, name)) {
            return true;
        }
    }
    return false;
}
export function BindingOrAssignmentElementContainsNonLiteralComputedName(element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetPropertyNameOfBindingOrAssignmentElement__from_ast(element);
    if (!(propertyName === undefined) && IsComputedPropertyName__from_ast(propertyName) && !IsLiteralExpression__from_ast(Node__from_ast.Expression(propertyName))) {
        return true;
    }
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTargetOfBindingOrAssignmentElement__from_ast(element);
    return !(target === undefined) && (IsBindingPattern__from_ast(target) || IsAssignmentPattern__from_ast(target)) && bindingOrAssignmentPatternContainsNonLiteralComputedName(target);
}
export function bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let elements = GetElementsOfBindingOrAssignmentPattern__from_ast(pattern);
    return ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(elements, BindingOrAssignmentElementContainsNonLiteralComputedName);
}
export function GetInitializerOfBindingOrAssignmentElement(bindingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (bindingElement === undefined) {
        return void 0;
    }
    if (IsDeclarationBindingElement__from_ast(bindingElement)) {
        return Node__from_ast.Initializer(bindingElement);
    }
    if (IsPropertyAssignment__from_ast(bindingElement)) {
        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(bindingElement);
        if (IsAssignmentExpression__from_ast(initializer, true)) {
            return BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(initializer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
        }
        return void 0;
    }
    if (IsShorthandPropertyAssignment__from_ast(bindingElement)) {
        return (Node__from_ast.AsShorthandPropertyAssignment(bindingElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectAssignmentInitializer;
    }
    if (IsAssignmentExpression__from_ast(bindingElement, true)) {
        return BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(bindingElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
    }
    if (IsSpreadElement__from_ast(bindingElement)) {
        return GetInitializerOfBindingOrAssignmentElement(Node__from_ast.Expression(bindingElement));
    }
    return void 0;
}
export function isObjectBindingOrAssignmentPattern(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectBindingPattern$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast());
}
export function isArrayBindingOrAssignmentPattern(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrayBindingPattern$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrayLiteralExpression$constant__from_ast());
}
export function isSimpleBindingOrAssignmentElement(element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTargetOfBindingOrAssignmentElement__from_ast(element);
    if (target === undefined || IsOmittedExpression__from_ast(target)) {
        return true;
    }
    let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TryGetPropertyNameOfBindingOrAssignmentElement__from_ast(element);
    if (!(propertyName === undefined) && !IsPropertyNameLiteral__from_ast(propertyName)) {
        return false;
    }
    let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetInitializerOfBindingOrAssignmentElement(element);
    if (!(initializer === undefined) && !IsSimpleInlineableExpression(initializer)) {
        return false;
    }
    if (IsBindingPattern__from_ast(target) || IsAssignmentPattern__from_ast(target)) {
        return Every$PointerTo_Named_ast$Node(GetElementsOfBindingOrAssignmentPattern__from_ast(target), isSimpleBindingOrAssignmentElement);
    }
    return IsIdentifier__from_ast(target);
}
