import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { RecursionId as RecursionId__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import { asRecursionId$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/relater.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$Symbol, $goInterfaceAdapter$PointerTo_Named_checker$Type, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function asRecursionId$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RecursionId__from_checker {
    return asRecursionId$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument0);
}
export function asRecursionId$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RecursionId__from_checker {
    return asRecursionId$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ast$Symbol($argument0);
    }, $argument0);
}
export function asRecursionId$PointerTo_Named_checker$Type($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): RecursionId__from_checker {
    return asRecursionId$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_checker$Type($argument0);
    }, $argument0);
}
