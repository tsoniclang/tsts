import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeList$Storage as NodeList__from_ast$Storage, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { ModifierList as ModifierList__from_ast, NodeFactory as NodeFactory__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory, $goInterfaceAdapter$PointerTo_Named_ast$NodeList, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$End$void_to_int, $goInterfaceMethod$Pos$void_to_int } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_printer$triviaPositionKey_To_int as GoMap } from "../../../../../../support/maps.js";
import { PrintHandlers } from "./printer.js";
import { defaultIndentSize$int, textWriter } from "./textwriter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class ChangeTrackerWriter {
    declare private readonly $goType: void;
    public constructor(public textWriter: textWriter, public lastNonTriviaPosition: int, public pos: GoMapValue<triviaPositionKey | undefined, int>, public end: GoMapValue<triviaPositionKey | undefined, int>) {
    }
    static $copy($source: ChangeTrackerWriter): ChangeTrackerWriter {
        return new ChangeTrackerWriter(textWriter.$copy($source.textWriter), $source.lastNonTriviaPosition, $source.pos, $source.end);
    }
    declare private readonly then?: never;
    static AssignPositionsToNode(ct: {
        value: ChangeTrackerWriter;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let visitor: {
            value: NodeVisitor__from_ast;
        } | undefined = void 0;
        const __gotots_field_3 = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return ChangeTrackerWriter.$go$private$printer$assignPositionsToNodeWorker(ct, n, visitor);
        };
        const __gotots_field_4 = factory;
        const __gotots_receiver_0 = ct;
        const __gotots_field_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return ChangeTrackerWriter.$go$private$printer$assignPositionsToNodeWorker(__gotots_receiver_0, $argument0, $argument1);
        };
        const __gotots_receiver_1 = ct;
        const __gotots_field_1 = ($argument0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            return ChangeTrackerWriter.$go$private$printer$assignPositionsToNodeArray(__gotots_receiver_1, $argument0, $argument1);
        };
        const __gotots_receiver_2 = ct;
        const __gotots_field_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return ChangeTrackerWriter.$go$private$printer$assignPositionsToNodeWorker(__gotots_receiver_2, $argument0, $argument1);
        };
        const __gotots_field_5 = new NodeVisitorHooks__from_ast(__gotots_field_0, __gotots_field_2, __gotots_field_1, (modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, v: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined => {
            if (!(modifiers === undefined)) {
                const __gotots_receiver_3 = ct;
                const __gotots_store_1 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                const __gotots_argument_0 = tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeList"), NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
                const __gotots_argument_1 = v;
                let newNodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = ChangeTrackerWriter.$go$private$printer$assignPositionsToNodeArray(__gotots_receiver_3, __gotots_argument_0, __gotots_argument_1);
                return NodeFactory__from_ast.NewModifierList(factory, NodeList__from_ast.$storageOf(((newNodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            }
            return modifiers;
        }, void 0, void 0, void 0, void 0, void 0);
        visitor =
            { value: new NodeVisitor__from_ast(__gotots_field_3, __gotots_field_4, __gotots_field_5) };
        return ChangeTrackerWriter.$go$private$printer$assignPositionsToNodeWorker(ct, node, visitor);
    }
    static Clear(ct: {
        value: ChangeTrackerWriter;
    } | undefined): void {
        const __gotots_store_2 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.Clear(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "textWriter"));
        (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastNonTriviaPosition = 0;
    }
    static DecreaseIndent(ct: {
        value: ChangeTrackerWriter;
    } | undefined): void {
        const __gotots_store_4 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.DecreaseIndent(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "textWriter"));
    }
    static GetColumn(ct: {
        value: ChangeTrackerWriter;
    } | undefined): UTF16Offset__from_core {
        const __gotots_store_5 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.GetColumn(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "textWriter"));
    }
    static GetIndent(ct: {
        value: ChangeTrackerWriter;
    } | undefined): int {
        const __gotots_store_6 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.GetIndent(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "textWriter"));
    }
    static GetLine(ct: {
        value: ChangeTrackerWriter;
    } | undefined): int {
        const __gotots_store_7 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.GetLine(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "textWriter"));
    }
    static GetPrintHandlers(ct: {
        value: ChangeTrackerWriter;
    } | undefined): PrintHandlers {
        return new PrintHandlers(void 0, (nodeOpt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (!(nodeOpt === undefined)) {
                ChangeTrackerWriter.$go$private$printer$setPos(ct, new GoInterfaceAdapter(nodeOpt));
            }
        }, (nodeOpt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (!(nodeOpt === undefined)) {
                ChangeTrackerWriter.$go$private$printer$setEnd(ct, new GoInterfaceAdapter(nodeOpt));
            }
        }, (nodesOpt: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): void => {
            if (!(nodesOpt === undefined)) {
                ChangeTrackerWriter.$go$private$printer$setPos(ct, new $goInterfaceAdapter$PointerTo_Named_ast$NodeList(nodesOpt));
            }
        }, (nodesOpt: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): void => {
            if (!(nodesOpt === undefined)) {
                ChangeTrackerWriter.$go$private$printer$setEnd(ct, new $goInterfaceAdapter$PointerTo_Named_ast$NodeList(nodesOpt));
            }
        }, (nodeOpt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (!(nodeOpt === undefined)) {
                ChangeTrackerWriter.$go$private$printer$setPos(ct, new GoInterfaceAdapter(nodeOpt));
            }
        }, (nodeOpt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
            if (!(nodeOpt === undefined)) {
                ChangeTrackerWriter.$go$private$printer$setEnd(ct, new GoInterfaceAdapter(nodeOpt));
            }
        });
    }
    static GetTextPos(ct: {
        value: ChangeTrackerWriter;
    } | undefined): int {
        const __gotots_store_8 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.GetTextPos(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "textWriter"));
    }
    static HasTrailingComment(ct: {
        value: ChangeTrackerWriter;
    } | undefined): bool {
        return (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.textWriter.HasTrailingComment();
    }
    static HasTrailingWhitespace(ct: {
        value: ChangeTrackerWriter;
    } | undefined): bool {
        const __gotots_store_9 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.HasTrailingWhitespace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "textWriter"));
    }
    static IncreaseIndent(ct: {
        value: ChangeTrackerWriter;
    } | undefined): void {
        const __gotots_store_10 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.IncreaseIndent(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "textWriter"));
    }
    static IsAtStartOfLine(ct: {
        value: ChangeTrackerWriter;
    } | undefined): bool {
        const __gotots_store_11 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.IsAtStartOfLine(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "textWriter"));
    }
    static RawWrite(ct: {
        value: ChangeTrackerWriter;
    } | undefined, s: gostring): void {
        const __gotots_store_12 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.RawWrite(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "textWriter"), s);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, s, false);
    }
    static String(ct: {
        value: ChangeTrackerWriter;
    } | undefined): gostring {
        const __gotots_store_3 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return textWriter.String(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "textWriter"));
    }
    static Write(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_13 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.Write(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteComment(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_14 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteComment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "textWriter"), text);
    }
    static WriteKeyword(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_15 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteKeyword(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteLine(ct: {
        value: ChangeTrackerWriter;
    } | undefined): void {
        const __gotots_store_16 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteLine(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "textWriter"));
    }
    static WriteLineForce(ct: {
        value: ChangeTrackerWriter;
    } | undefined, force: bool): void {
        const __gotots_store_17 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteLineForce(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "textWriter"), force);
    }
    static WriteLiteral(ct: {
        value: ChangeTrackerWriter;
    } | undefined, s: gostring): void {
        const __gotots_store_18 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "textWriter"), s);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, s, true);
    }
    static WriteOperator(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_19 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteOperator(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteParameter(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_20 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteParameter(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteProperty(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_21 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteProperty(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WritePunctuation(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_22 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WritePunctuation(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteSpace(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_23 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteSpace(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteStringLiteral(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_24 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteSymbol(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        const __gotots_store_25 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteSymbol(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "textWriter"), text, __go_symbol);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static WriteTrailingSemicolon(ct: {
        value: ChangeTrackerWriter;
    } | undefined, text: gostring): void {
        const __gotots_store_26 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        textWriter.WriteTrailingSemicolon(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "textWriter"), text);
        ChangeTrackerWriter.$go$private$printer$setLastNonTriviaPosition(ct, text, false);
    }
    static $go$private$printer$assignPositionsToNodeArray(ct: {
        value: ChangeTrackerWriter;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, v: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        let visited: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(v, nodes);
        if (visited === undefined) {
            return visited;
        }
        if (nodes === undefined) {
            const __gotots_argument_2 = new $goInterfaceAdapter$string("if nodes is nil, visited should not be nil");
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        }
        let nodeArray: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = visited;
        if (tsonicTypeScriptRuntime.sameLocation(visited, nodes)) {
            nodeArray = NodeList__from_ast.Clone(visited, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory));
        }
        NodeList__from_ast.$storageOf(((nodeArray ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(ChangeTrackerWriter.$go$private$printer$getPos(ct, new $goInterfaceAdapter$PointerTo_Named_ast$NodeList(nodes)), ChangeTrackerWriter.$go$private$printer$getEnd(ct, new $goInterfaceAdapter$PointerTo_Named_ast$NodeList(nodes))));
        return nodeArray;
    }
    static $go$private$printer$assignPositionsToNodeWorker(ct: {
        value: ChangeTrackerWriter;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, v: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return node;
        }
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.VisitEachChild(node, v);
        let newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = visited;
        if (!NodeIsSynthesized__from_ast(visited)) {
            newNode = Node__from_ast.Clone(visited, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory));
        }
        Node__from_ast.ForEachChild(newNode, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = newNode;
            return true;
        }));
        Node__from_ast.$storageOf(((newNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(ChangeTrackerWriter.$go$private$printer$getPos(ct, new GoInterfaceAdapter(node)), ChangeTrackerWriter.$go$private$printer$getEnd(ct, new GoInterfaceAdapter(node))));
        return newNode;
    }
    static $go$private$printer$getEnd(ct: {
        value: ChangeTrackerWriter;
    } | undefined, node: triviaPositionKey | undefined): int {
        return (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end.lookup(node);
    }
    static $go$private$printer$getPos(ct: {
        value: ChangeTrackerWriter;
    } | undefined, node: triviaPositionKey | undefined): int {
        return (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos.lookup(node);
    }
    static $go$private$printer$setEnd(ct: {
        value: ChangeTrackerWriter;
    } | undefined, node: triviaPositionKey | undefined): void {
        (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end.store(node, (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastNonTriviaPosition);
    }
    static $go$private$printer$setLastNonTriviaPosition(ct: {
        value: ChangeTrackerWriter;
    } | undefined, s: gostring, force: bool): void {
        if (force || SkipTrivia__from_scanner(s, 0) !== s.length) {
            const __gotots_store_27 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastNonTriviaPosition = textWriter.GetTextPos(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "textWriter"));
            let pos = s.length;
            for (; pos > 0;) {
                const __gotots_results_0 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(s, 0, pos));
                const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
                    int32,
                    int
                ];
                let r = __gotots_results_1[0];
                let size = __gotots_results_1[1];
                if (IsWhiteSpaceLike__from_stringutil(r)) {
                    pos = pos - size;
                }
                else {
                    break;
                }
            }
            const __gotots_store_28 = (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_28.lastNonTriviaPosition = __gotots_store_28.lastNonTriviaPosition - (s.length - pos);
        }
    }
    static $go$private$printer$setPos(ct: {
        value: ChangeTrackerWriter;
    } | undefined, node: triviaPositionKey | undefined): void {
        (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos.store(node, (ct ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastNonTriviaPosition);
    }
}
export interface triviaPositionKey extends GoInterfaceValue {
    End(): int;
    Pos(): int;
}
export const triviaPositionKey$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$End$void_to_int, $goInterfaceMethod$Pos$void_to_int]);
export function triviaPositionKey$is(value: GoInterfaceValue | undefined): value is triviaPositionKey {
    return value !== undefined && value.$go$implements(triviaPositionKey$contract);
}
export function NewChangeTrackerWriter(newline: gostring, indentSize: int): {
    value: ChangeTrackerWriter;
} | undefined {
    if (indentSize < 0) {
        indentSize = defaultIndentSize$int;
    }
    let ctw: {
        value: ChangeTrackerWriter;
    } | undefined = { value: new ChangeTrackerWriter(new textWriter(newline, indentSize, named_strings.StringsBuilderOperations.$zero(), "", 0, false, 0, 0, false), 0, GoMap.make(0, []), GoMap.make(0, [])) };
    const __gotots_store_0 = (ctw ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    textWriter.Clear(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "textWriter"));
    return ctw;
}
