import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { FileHandle as FileHandle__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { ParseCacheKey$Storage as ParseCacheKey__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/parsecache.js";
import type { refCountCacheEntry as refCountCacheEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/refcountcache.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import { ParseCacheKey as ParseCacheKey__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/parsecache.js";
import { RefCountCache as RefCountCache__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/refcountcache.js";
import { $goInterfaceAdapter$PointerTo_Named_project$refCountCacheEntryOf_PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$Named_project$ParseCacheKey as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function RefCountCache$Deref$Named_project$ParseCacheKey$PointerTo_Named_ast$SourceFile$Named_project$FileHandle($argument0: {
    value: RefCountCache__from_project<ParseCacheKey__from_project, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle__from_project | undefined>;
} | undefined, $argument1: ParseCacheKey__from_project): void {
    return RefCountCache__from_project.Deref$kernel<ParseCacheKey__from_project, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, FileHandle__from_project | undefined>($argument0, ($argument0: ParseCacheKey__from_project): ParseCacheKey__from_project => {
        return ParseCacheKey__from_project.$copy($argument0);
    }, ($argument0: {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined): {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return $argument0;
    }, ($argument0: ParseCacheKey__from_project): GoInterface | undefined => {
        return new GoInterfaceAdapter(ParseCacheKey__from_project.$copy($argument0));
    }, ($argument0: GoInterfaceValue | undefined): {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return (($value: GoInterfaceValue | undefined): {
            value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_project$refCountCacheEntryOf_PointerTo_Named_ast$SourceFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, (): {
        value: refCountCacheEntry__from_project<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    } | undefined => {
        return void 0;
    }, $argument1);
}
