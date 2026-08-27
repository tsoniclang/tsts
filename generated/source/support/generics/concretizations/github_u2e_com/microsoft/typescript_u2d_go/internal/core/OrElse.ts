import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { SymbolFlags as SymbolFlags__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbolflags.js";
import type { TypeMapper as TypeMapper__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/mapper.js";
import type { Signature as Signature__from_checker, Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { TextRange as TextRange__from_core } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/text.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/diagnostics/diagnostics.js";
import type { CompletionItemDefaults as CompletionItemDefaults__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { OrElse$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
export function OrElse$Interface_void($argument0: GoInterface | undefined, $argument1: GoInterface | undefined): GoInterface | undefined {
    return OrElse$kernel<GoInterface | undefined>(($argument0: GoInterface | undefined, $argument1: GoInterface | undefined): bool => {
        return !goInterfaceEqual($argument0, $argument1);
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$Named_ast$SymbolFlags($argument0: SymbolFlags__from_ast, $argument1: SymbolFlags__from_ast): SymbolFlags__from_ast {
    return OrElse$kernel<SymbolFlags__from_ast>(($argument0: SymbolFlags__from_ast, $argument1: SymbolFlags__from_ast): bool => {
        return !($argument0 === $argument1);
    }, (): SymbolFlags__from_ast => {
        return 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_ast$Node($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_ast$Symbol($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_checker$Signature($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_checker$Type($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_checker$TypeMapper($argument0: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined): tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<TypeMapper__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_core$TextRange($argument0: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, $argument1: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, $argument1: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_diagnostics$Message($argument0: {
    value: Message__from_diagnostics;
} | undefined, $argument1: {
    value: Message__from_diagnostics;
} | undefined): {
    value: Message__from_diagnostics;
} | undefined {
    return OrElse$kernel<{
        value: Message__from_diagnostics;
    } | undefined>(($argument0: {
        value: Message__from_diagnostics;
    } | undefined, $argument1: {
        value: Message__from_diagnostics;
    } | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, (): {
        value: Message__from_diagnostics;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_Named_lsproto$CompletionItemDefaults($argument0: {
    value: CompletionItemDefaults__from_lsproto;
} | undefined, $argument1: {
    value: CompletionItemDefaults__from_lsproto;
} | undefined): {
    value: CompletionItemDefaults__from_lsproto;
} | undefined {
    return OrElse$kernel<{
        value: CompletionItemDefaults__from_lsproto;
    } | undefined>(($argument0: {
        value: CompletionItemDefaults__from_lsproto;
    } | undefined, $argument1: {
        value: CompletionItemDefaults__from_lsproto;
    } | undefined): bool => {
        return !($argument0
            ===
                $argument1);
    }, (): {
        value: CompletionItemDefaults__from_lsproto;
    } | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$PointerTo_string($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined, $argument1: tsonicTypeScriptRuntime.Location<gostring> | undefined): tsonicTypeScriptRuntime.Location<gostring> | undefined {
    return OrElse$kernel<tsonicTypeScriptRuntime.Location<gostring> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<gostring> | undefined, $argument1: tsonicTypeScriptRuntime.Location<gostring> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, (): tsonicTypeScriptRuntime.Location<gostring> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function OrElse$bool($argument0: bool, $argument1: bool): bool {
    return OrElse$kernel<bool>(($argument0: bool, $argument1: bool): bool => {
        return !($argument0 === $argument1);
    }, (): bool => {
        return false;
    }, $argument0, $argument1);
}
