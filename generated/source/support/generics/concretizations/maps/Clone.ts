import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Kind as Kind__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/kind_generated.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { configFileEntry as configFileEntry__from_project, configFileNames as configFileNames__from_project } from "../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { Overlay as Overlay__from_project } from "../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SymbolTable as SymbolTable__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import { TextRange as TextRange__from_core } from "../../../../modules/github.com/microsoft/typescript-go/internal/core/text.js";
import { $goMap$MapOf_Named_ast$Kind_To_Named_core$TextRange, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../maps.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function Clone$MapOf_Named_ast$Kind_To_Named_core$TextRange$Named_ast$Kind$Named_core$TextRange($argument0: GoMapValue<Kind__from_ast, TextRange__from_core>): GoMapValue<Kind__from_ast, TextRange__from_core> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<Kind__from_ast, TextRange__from_core>, Kind__from_ast, TextRange__from_core>(($argument0: GoMapValue<Kind__from_ast, TextRange__from_core>): GoMapValue<Kind__from_ast, TextRange__from_core> => {
        return $argument0;
    }, ($argument0: GoMapValue<Kind__from_ast, TextRange__from_core>): GoMapValue<Kind__from_ast, TextRange__from_core> => {
        return $argument0;
    }, ($argument0: Kind__from_ast): Kind__from_ast => {
        return $argument0;
    }, ($argument0: TextRange__from_core): TextRange__from_core => {
        return TextRange__from_core.$copy($argument0);
    }, ($argument0: TextRange__from_core): GoMapValue<Kind__from_ast, TextRange__from_core> => {
        return $goMap$MapOf_Named_ast$Kind_To_Named_core$TextRange.make(0, []);
    }, (): TextRange__from_core => {
        return TextRange__from_core.$zero();
    }, $argument0);
}
export function Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile.make(0, []);
    }, (): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay$Named_tspath$Path$PointerTo_Named_project$Overlay($argument0: GoMapValue<Path__from_tspath, {
    value: Overlay__from_project;
} | undefined>): GoMapValue<Path__from_tspath, {
    value: Overlay__from_project;
} | undefined> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined>, Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined>(($argument0: GoMapValue<Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined>): GoMapValue<Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined>): GoMapValue<Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: Overlay__from_project;
    } | undefined): {
        value: Overlay__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Overlay__from_project;
    } | undefined): GoMapValue<Path__from_tspath, {
        value: Overlay__from_project;
    } | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$Overlay.make(0, []);
    }, (): {
        value: Overlay__from_project;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry$Named_tspath$Path$PointerTo_Named_project$configFileEntry($argument0: GoMapValue<Path__from_tspath, {
    value: configFileEntry__from_project;
} | undefined>): GoMapValue<Path__from_tspath, {
    value: configFileEntry__from_project;
} | undefined> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>, Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>(($argument0: GoMapValue<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>): GoMapValue<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>): GoMapValue<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: configFileEntry__from_project;
    } | undefined): {
        value: configFileEntry__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: configFileEntry__from_project;
    } | undefined): GoMapValue<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileEntry.make(0, []);
    }, (): {
        value: configFileEntry__from_project;
    } | undefined => {
        return void 0;
    }, $argument0);
}
export function Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: GoMapValue<Path__from_tspath, configFileNames__from_project | undefined>): GoMapValue<Path__from_tspath, configFileNames__from_project | undefined> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<Path__from_tspath, configFileNames__from_project | undefined>, Path__from_tspath, configFileNames__from_project | undefined>(($argument0: GoMapValue<Path__from_tspath, configFileNames__from_project | undefined>): GoMapValue<Path__from_tspath, configFileNames__from_project | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, configFileNames__from_project | undefined>): GoMapValue<Path__from_tspath, configFileNames__from_project | undefined> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: configFileNames__from_project | undefined): configFileNames__from_project | undefined => {
        return $argument0;
    }, ($argument0: configFileNames__from_project | undefined): GoMapValue<Path__from_tspath, configFileNames__from_project | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames.make(0, []);
    }, (): configFileNames__from_project | undefined => {
        return void 0;
    }, $argument0);
}
export function Clone$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<Path__from_tspath, GoEmptyStruct>, Path__from_tspath, GoEmptyStruct>(($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoEmptyStruct => {
        return (void GoEmptyStruct.$copy,
            $argument0);
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
    }, (): GoEmptyStruct => {
        return GoEmptyStruct.$zero();
    }, $argument0);
}
export function Clone$MapOf_string_To_Interface_void$string$Interface_void($argument0: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<gostring, GoInterface | undefined>, gostring, GoInterface | undefined>(($argument0: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoMapValue<gostring, GoInterface | undefined> => {
        return $goMap$MapOf_string_To_Interface_void.make(0, []);
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0);
}
export function Clone$MapOf_string_To_MapOf_Named_tspath$Path_To_string$string$MapOf_Named_tspath$Path_To_string($argument0: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>): GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>, gostring, GoMapValue<Path__from_tspath, gostring>>(($argument0: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>): GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>): GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> => {
        return $goMap$MapOf_string_To_MapOf_Named_tspath$Path_To_string.make(0, []);
    }, (): GoMapValue<Path__from_tspath, gostring> => {
        return $goMap$MapOf_Named_tspath$Path_To_string.nil();
    }, $argument0);
}
export function Clone$MapOf_string_To_string$string$string($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> {
    return generic_maps_kernel.MapsCloneKernel<GoMapValue<gostring, gostring>, gostring, gostring>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): GoMapValue<gostring, gostring> => {
        return GoMap__from_gotots_runtime.make<gostring, gostring>($argument0, 0, []);
    }, (): gostring => {
        return "";
    }, $argument0);
}
export function Clone$Named_ast$SymbolTable$string$PointerTo_Named_ast$Symbol($argument0: SymbolTable__from_ast): SymbolTable__from_ast {
    return generic_maps_kernel.MapsCloneKernel<SymbolTable__from_ast, gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): SymbolTable__from_ast => {
        return new SymbolTable__from_ast($argument0);
    }, ($argument0: SymbolTable__from_ast): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0.$value;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return GoMap.make(0, []);
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
