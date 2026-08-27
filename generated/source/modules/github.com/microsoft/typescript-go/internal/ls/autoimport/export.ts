import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SymbolFlags as SymbolFlags__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ScriptElementKindModifier as ScriptElementKindModifier__from_lsutil, ScriptElementKind as ScriptElementKind__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { DeclarationBase as DeclarationBase__from_ast, GetSourceFileOfModule as GetSourceFileOfModule__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Checker as Checker__from_checker, IsExternalModuleSymbol as IsExternalModuleSymbol__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/state.js";
import { IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { FirstOrNil$PointerTo_Named_ast$Node, FirstOrNil$PointerTo_Named_autoimport$Export } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { _ExportSyntax_name$string } from "./export_stringer_generated.js";
import { newSymbolExtractor, symbolExtractor } from "./extract.js";
import { tryGetModuleIDAndFileNameOfModuleSymbol } from "./util.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class ModuleID {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export class ExportID {
    declare private readonly $goType: void;
    public constructor(public ModuleID: ModuleID, public ExportName: gostring) {
    }
    static $zero(): ExportID {
        return new ExportID(new ModuleID(""), "");
    }
    static $copy($source: ExportID): ExportID {
        return new ExportID($source.ModuleID, $source.ExportName);
    }
    static $equal($left: ExportID, $right: ExportID): bool {
        return $left.ModuleID.$value === $right.ModuleID.$value && $left.ExportName === $right.ExportName;
    }
    static $hash($source: ExportID): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ModuleID.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ExportName));
        return $hash;
    }
    declare private readonly then?: never;
}
export class ExportSyntax {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    String(): gostring {
        let idx = this.$value - 0;
        if (this.$value < 0 || idx >= 10) {
            return "ExportSyntax(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(this.$value)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
        }
        return goStringSlice(_ExportSyntax_name$string, $state._ExportSyntax_index.get(idx), $state._ExportSyntax_index.get(idx + 1));
    }
}
export function ExportSyntaxNone$constant(): ExportSyntax {
    return new ExportSyntax(0);
}
export function ExportSyntaxModifier$constant(): ExportSyntax {
    return new ExportSyntax(1);
}
export function ExportSyntaxNamed$constant(): ExportSyntax {
    return new ExportSyntax(2);
}
export function ExportSyntaxDefaultModifier$constant(): ExportSyntax {
    return new ExportSyntax(3);
}
export function ExportSyntaxDefaultDeclaration$constant(): ExportSyntax {
    return new ExportSyntax(4);
}
export function ExportSyntaxEquals$constant(): ExportSyntax {
    return new ExportSyntax(5);
}
export function ExportSyntaxUMD$constant(): ExportSyntax {
    return new ExportSyntax(6);
}
export function ExportSyntaxStar$constant(): ExportSyntax {
    return new ExportSyntax(7);
}
export function ExportSyntaxCommonJSModuleExports$constant(): ExportSyntax {
    return new ExportSyntax(8);
}
export function ExportSyntaxCommonJSExportsProperty$constant(): ExportSyntax {
    return new ExportSyntax(9);
}
export class Export {
    declare private readonly $goType: void;
    public constructor(public ExportID: ExportID, public ModuleFileName: gostring, public Syntax: ExportSyntax, public Flags: SymbolFlags__from_ast, public localName: gostring, public through: gostring, public Target: ExportID, public IsTypeOnly: bool, public ScriptElementKind: ScriptElementKind__from_lsutil, public ScriptElementKindModifiers: ScriptElementKindModifier__from_lsutil, public Path: Path__from_tspath, public PackageName: gostring) {
    }
    static $copy($source: Export): Export {
        return new Export(ExportID.$copy($source.ExportID), $source.ModuleFileName, $source.Syntax, $source.Flags, $source.localName, $source.through, ExportID.$copy($source.Target), $source.IsTypeOnly, $source.ScriptElementKind, $source.ScriptElementKindModifiers, $source.Path, $source.PackageName);
    }
    static $equal($left: Export, $right: Export): bool {
        return ExportID.$equal($left.ExportID, $right.ExportID) && $left.ModuleFileName === $right.ModuleFileName && $left.Syntax.$value === $right.Syntax.$value && $left.Flags === $right.Flags && $left.localName === $right.localName && $left.through === $right.through && ExportID.$equal($left.Target, $right.Target) && $left.IsTypeOnly === $right.IsTypeOnly && $left.ScriptElementKind.$value === $right.ScriptElementKind.$value && $left.ScriptElementKindModifiers === $right.ScriptElementKindModifiers && $left.Path.$value === $right.Path.$value && $left.PackageName === $right.PackageName;
    }
    static $hash($source: Export): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, ExportID.$hash($source.ExportID));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.ModuleFileName));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Syntax.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Flags));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.localName));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.through));
        $hash = GoMapHash.mix($hash, ExportID.$hash($source.Target));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.IsTypeOnly));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ScriptElementKind.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ScriptElementKindModifiers));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Path.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PackageName));
        return $hash;
    }
    declare private readonly then?: never;
    static AmbientModuleName(e: {
        value: Export;
    } | undefined): gostring {
        if (!IsExternalModuleNameRelative__from_tspath((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value)) {
            return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ModuleID.$value;
        }
        return "";
    }
    static IsRenameable(e: {
        value: Export;
    } | undefined): bool {
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName === InternalSymbolNameExportEquals$string__from_ast || (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName === InternalSymbolNameDefault$string__from_ast;
    }
    static IsUnresolvedAlias(e: {
        value: Export;
    } | undefined): bool {
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Flags === SymbolFlagsAlias$constant__from_ast();
    }
    static Name(e: {
        value: Export;
    } | undefined): gostring {
        if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName !== "") {
            return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.localName;
        }
        if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName === InternalSymbolNameExportEquals$string__from_ast) {
            return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target.ExportName;
        }
        return (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportID.ExportName;
    }
}
export function SymbolToExport(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): {
    value: Export;
} | undefined {
    if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && IsExternalModuleSymbol__from_checker(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
        {
            const __gotots_results_0 = tryGetModuleIDAndFileNameOfModuleSymbol(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent);
            let moduleID__shadow_1 = __gotots_results_0[0];
            let moduleFileName__shadow_1 = __gotots_results_0[1];
            let ok = __gotots_results_0[2];
            if (ok) {
                return extractFirstExport(__go_symbol, ch, moduleID__shadow_1, moduleFileName__shadow_1, GetSourceFileOfModule__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent));
            }
        }
        return void 0;
    }
    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstOrNil$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations);
    if (declaration === undefined) {
        return void 0;
    }
    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(declaration);
    if (DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol === undefined) {
        return void 0;
    }
    let moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol(ch, DeclarationBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol);
    let moduleID = new ModuleID(SourceFile__from_ast.Path(file).$value);
    let moduleFileName = SourceFile__from_ast.FileName(file);
    let target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetMergedSymbol(ch, Checker__from_checker.SkipAlias(ch, __go_symbol));
    {
        let __go_export: {
            value: Export;
        } | undefined = tryGetModuleExport(InternalSymbolNameDefault$string__from_ast, target, moduleSymbol, ch, moduleID, moduleFileName, file);
        if (!(__go_export === undefined)) {
            return __go_export;
        }
    }
    {
        let __go_export: {
            value: Export;
        } | undefined = tryGetModuleExport(InternalSymbolNameExportEquals$string__from_ast, target, moduleSymbol, ch, moduleID, moduleFileName, file);
        if (!(__go_export === undefined)) {
            return __go_export;
        }
    }
    return tryGetModuleExport(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, target, moduleSymbol, ch, moduleID, moduleFileName, file);
}
export function tryGetModuleExport(exportName: gostring, target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, moduleID: ModuleID, moduleFileName: gostring, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): {
    value: Export;
} | undefined {
    let exported: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.TryGetMemberInModuleExportsAndProperties(ch, exportName, moduleSymbol);
    if (!(exported === undefined) &&
        tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetMergedSymbol(ch, Checker__from_checker.SkipAlias(ch, exported)), target)) {
        return extractFirstExport(exported, ch, moduleID, moduleFileName, file);
    }
    return void 0;
}
export function extractFirstExport(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ch: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, moduleID: ModuleID, moduleFileName: gostring, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): {
    value: Export;
} | undefined {
    let exports = RuntimeSlice.nil<{
        value: Export;
    } | undefined>();
    const exports$location = tsonicTypeScriptRuntime.boundLocation({}, () => exports, exports$next => exports = exports$next);
    let extractor: symbolExtractor | undefined = newSymbolExtractor("", ch, void 0, void 0);
    symbolExtractor.$go$private$autoimport$extractFromSymbol(extractor, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol, moduleID, moduleFileName, file, exports$location);
    return FirstOrNil$PointerTo_Named_autoimport$Export(exports);
}
