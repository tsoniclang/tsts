import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { EmitResolver as EmitResolver__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, NodeFactory as NodeFactory__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, Tristate_IsFalseOrUnknown as Tristate_IsFalseOrUnknown__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Fail as Fail__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { EmitContext as EmitContext__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetTextOfNode as GetTextOfNode__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_jsnum$Number as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class ConstEnumInliningTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public currentSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public emitResolver: EmitResolver__from_printer | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$inliners$visit(tx: ConstEnumInliningTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast(): {
                {
                    const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let parse: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_1.Transformer), node);
                    if (parse === undefined) {
                        const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_2.Transformer), node);
                    }
                    const __gotots_receiver_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).emitResolver;
                    const __gotots_argument_2 = parse;
                    let value: GoInterface | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_2).GetConstantValue(__gotots_argument_2);
                    if (!(value === undefined)) {
                        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        const __gotots_type_switch_0: GoInterface | undefined = value;
                        switch (true) {
                            case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                                let v: Number__from_jsnum = __gotots_type_switch_0.$go$value;
                                if (v.IsInf()) {
                                    if (v.Abs().$value === v.$value) {
                                        const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                        const __gotots_store_4 = (Transformer__from_transformers.Factory(__gotots_store_3.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        replacement = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), "Infinity");
                                    }
                                    else {
                                        const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                        const __gotots_store_6 = (Transformer__from_transformers.Factory(__gotots_store_5.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory");
                                        const __gotots_argument_3 = KindMinusToken$constant__from_ast();
                                        const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                        const __gotots_store_8 = (Transformer__from_transformers.Factory(__gotots_store_7.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        const __gotots_argument_4 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeFactory"), "Infinity");
                                        replacement = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4);
                                    }
                                }
                                else if (v.IsNaN()) {
                                    const __gotots_store_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_10 = (Transformer__from_transformers.Factory(__gotots_store_9.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    replacement = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), "NaN");
                                }
                                else if (v.Abs().$value === v.$value) {
                                    const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_12 = (Transformer__from_transformers.Factory(__gotots_store_11.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    replacement = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), v.String(), TokenFlagsNone$constant__from_ast());
                                }
                                else {
                                    const __gotots_store_13 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_14 = (Transformer__from_transformers.Factory(__gotots_store_13.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeFactory");
                                    const __gotots_argument_5 = KindMinusToken$constant__from_ast();
                                    const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_16 = (Transformer__from_transformers.Factory(__gotots_store_15.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    const __gotots_argument_6 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeFactory"), v.Abs().String(), TokenFlagsNone$constant__from_ast());
                                    replacement = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_4, __gotots_argument_5, __gotots_argument_6);
                                }
                                break;
                            }
                            case $goInterfaceAdapter$string.$is(__gotots_type_switch_0): {
                                let v: gostring = __gotots_type_switch_0.$go$value;
                                const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_18 = (Transformer__from_transformers.Factory(__gotots_store_17.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                replacement = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeFactory"), v, TokenFlagsNone$constant__from_ast());
                                break;
                            }
                            case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_0): {
                                let v: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_0.$go$value);
                                if (PseudoBigInt__from_jsnum.$equal(v, (new PseudoBigInt__from_jsnum(false, "")))) {
                                    const __gotots_store_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_20 = (Transformer__from_transformers.Factory(__gotots_store_19.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    replacement = NodeFactory__from_ast.NewBigIntLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), "0", TokenFlagsNone$constant__from_ast());
                                }
                                else if (!v.Negative) {
                                    const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_22 = (Transformer__from_transformers.Factory(__gotots_store_21.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    replacement = NodeFactory__from_ast.NewBigIntLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), v.Base10Value, TokenFlagsNone$constant__from_ast());
                                }
                                else {
                                    const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_24 = (Transformer__from_transformers.Factory(__gotots_store_23.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory");
                                    const __gotots_argument_7 = KindMinusToken$constant__from_ast();
                                    const __gotots_store_25 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_26 = (Transformer__from_transformers.Factory(__gotots_store_25.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    const __gotots_argument_8 = NodeFactory__from_ast.NewBigIntLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeFactory"), v.Base10Value, TokenFlagsNone$constant__from_ast());
                                    replacement = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_5, __gotots_argument_7, __gotots_argument_8);
                                }
                                break;
                            }
                        }
                        if (Tristate_IsFalseOrUnknown__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RemoveComments)) {
                            const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_27.Transformer), node);
                            if (!(original === undefined) && !NodeIsSynthesized__from_ast(original)) {
                                let originalText = GetTextOfNode__from_scanner(original);
                                let escapedText = safeMultiLineComment(originalText);
                                const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                EmitContext__from_printer.AddSyntheticTrailingComment(Transformer__from_transformers.EmitContext(__gotots_store_28.Transformer), replacement, KindMultiLineCommentTrivia$constant__from_ast(), escapedText, false);
                            }
                        }
                        return replacement;
                    }
                    const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_29.Transformer), node);
                }
                break;
            }
        }
        const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_30.Transformer), node);
    }
}
export function NewConstEnumInliningTransformer(opt: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    if (CompilerOptions__from_core.GetIsolatedModules(compilerOptions)) {
        Fail__from_debug("const enums are not inlined under isolated modules");
    }
    let tx: ConstEnumInliningTransformer | undefined = new ConstEnumInliningTransformer(Transformer__from_transformers.$zero(), compilerOptions, void 0, (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitResolver);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return ConstEnumInliningTransformer.$go$private$inliners$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = emitContext;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export function safeMultiLineComment(text: gostring): gostring {
    let b = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(text.length + 2)));
    strings__from_gostdlib.Builder.WriteByte(b, 32);
    for (;;) {
        let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(text, "*/")));
        if (i < 0) {
            break;
        }
        strings__from_gostdlib.Builder.WriteString(b, goStringSlice(text, 0, i));
        strings__from_gostdlib.Builder.WriteString(b, "*_/");
        text = goStringSlice(text, i + 2);
    }
    strings__from_gostdlib.Builder.WriteString(b, text);
    strings__from_gostdlib.Builder.WriteByte(b, 32);
    return strings__from_gostdlib.Builder.String(b);
}
