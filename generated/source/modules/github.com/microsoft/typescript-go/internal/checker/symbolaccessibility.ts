import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SymbolFlags as SymbolFlags__from_ast, SymbolId as SymbolId__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, uint64 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { GetNodeId as GetNodeId__from_ast, GetSymbolId as GetSymbolId__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsModuleWithStringLiteralName as IsModuleWithStringLiteralName__from_ast, IsNamespaceExportDeclaration as IsNamespaceExportDeclaration__from_ast, IsNamespaceExport as IsNamespaceExport__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, Node as Node__from_ast, SymbolFlagsNamespace$constant as SymbolFlagsNamespace$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function hasNonGlobalAugmentationExternalModuleSymbol(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsModuleWithStringLiteralName__from_ast(declaration) || (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() && IsExternalOrCommonJSModule__from_ast(Node__from_ast.AsSourceFile(declaration)));
}
export function getQualifiedLeftMeaning(rightMeaning: SymbolFlags__from_ast): SymbolFlags__from_ast {
    if (rightMeaning === SymbolFlagsValue$constant__from_ast()) {
        return SymbolFlagsValue$constant__from_ast();
    }
    return SymbolFlagsNamespace$constant__from_ast();
}
export function hasExternalModuleSymbol(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsAmbientModule__from_ast(declaration) || (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() && IsExternalOrCommonJSModule__from_ast(Node__from_ast.AsSourceFile(declaration)));
}
export class accessibleSymbolChainContext {
    declare private readonly $goType: void;
    public constructor(public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public meaning: SymbolFlags__from_ast, public useOnlyExternalAliasing: bool, public visitedSymbolTablesMap: GoMapValue<SymbolId__from_ast, GoMapValue<symbolTableID, GoEmptyStruct>>) {
    }
    static $copy($source: accessibleSymbolChainContext): accessibleSymbolChainContext {
        return new accessibleSymbolChainContext($source.__go_symbol, $source.enclosingDeclaration, $source.meaning, $source.useOnlyExternalAliasing, $source.visitedSymbolTablesMap);
    }
    declare private readonly then?: never;
}
export class symbolTableID {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
}
export function stKindLocals$constant(): symbolTableID {
    return new symbolTableID(0n);
}
export function stKindExports$constant(): symbolTableID {
    return new symbolTableID(2305843009213693952n);
}
export function stKindMembers$constant(): symbolTableID {
    return new symbolTableID(4611686018427387904n);
}
export function stKindGlobals$constant(): symbolTableID {
    return new symbolTableID(6917529027641081856n);
}
export function stKindResolvedExports$constant(): symbolTableID {
    return new symbolTableID(9223372036854775808n);
}
export function stKindMask$constant(): symbolTableID {
    return new symbolTableID(9223372036854775808n);
}
export function symbolTableIDFromLocals(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): symbolTableID {
    return new symbolTableID(goUint64(stKindLocals$constant().$value |
        ((void symbolTableID,
            GetNodeId__from_ast(node).$value) as uint64)));
}
export function symbolTableIDFromExports(sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): symbolTableID {
    return new symbolTableID(goUint64(stKindExports$constant().$value |
        ((void symbolTableID,
            GetSymbolId__from_ast(sym).$value) as uint64)));
}
export function symbolTableIDFromResolvedExports(sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): symbolTableID {
    return new symbolTableID(goUint64(stKindResolvedExports$constant().$value |
        ((void symbolTableID,
            GetSymbolId__from_ast(sym).$value) as uint64)));
}
export function symbolTableIDFromMembers(sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): symbolTableID {
    return new symbolTableID(goUint64(stKindMembers$constant().$value |
        ((void symbolTableID,
            GetSymbolId__from_ast(sym).$value) as uint64)));
}
export function symbolTableIDFromGlobals(): symbolTableID {
    return stKindGlobals$constant();
}
export function isUMDExportSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(__go_symbol === undefined) && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0 && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0) === undefined) && IsNamespaceExportDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0));
}
export function isNamespaceReexportDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsNamespaceExport__from_ast(node) && !(Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined);
}
export function isPropertyOrMethodDeclarationSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        const __gotots_range_0 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            switch (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindPropertyDeclaration$constant__from_ast():
                case KindMethodDeclaration$constant__from_ast():
                case KindGetAccessor$constant__from_ast():
                case KindSetAccessor$constant__from_ast(): {
                    continue;
                    break;
                }
                default: {
                    return false;
                    break;
                }
            }
        }
        return true;
    }
    return false;
}
