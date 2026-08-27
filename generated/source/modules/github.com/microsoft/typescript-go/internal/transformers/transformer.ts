import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { NodeFactory as NodeFactory__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { NodeVisitor as NodeVisitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { EmitContext as EmitContext__from_printer, NewEmitContext as NewEmitContext__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class Transformer {
    declare private readonly $goType: void;
    public constructor(public emitContext: {
        value: EmitContext__from_printer;
    } | undefined, public factory: {
        value: NodeFactory__from_printer;
    } | undefined, public visitor: {
        value: NodeVisitor__from_ast;
    } | undefined) {
    }
    static $zero(): Transformer {
        return new Transformer(void 0, void 0, void 0);
    }
    declare private readonly then?: never;
    static EmitContext(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined): {
        value: EmitContext__from_printer;
    } | undefined {
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.emitContext;
    }
    static Factory(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined): {
        value: NodeFactory__from_printer;
    } | undefined {
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.factory;
    }
    static NewTransformer(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined, visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, emitContext: {
        value: EmitContext__from_printer;
    } | undefined): tsonicTypeScriptRuntime.Location<Transformer> | undefined {
        if (!(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.emitContext === undefined)) {
            const __gotots_argument_0 = new GoInterfaceAdapter("Transformer already initialized");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        if (emitContext === undefined) {
            emitContext = NewEmitContext__from_printer();
        }
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.emitContext = emitContext;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.factory = (emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.visitor = EmitContext__from_printer.NewNodeVisitor(emitContext, visit);
        return tx;
    }
    static TransformSourceFile(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return NodeVisitor__from_ast.VisitSourceFile(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.visitor, file);
    }
    static Visitor(tx: tsonicTypeScriptRuntime.Location<Transformer> | undefined): {
        value: NodeVisitor__from_ast;
    } | undefined {
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Transformer>).value.visitor;
    }
}
