import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { MarshalerTo as MarshalerTo__from_json, Marshaler as Marshaler__from_json } from "../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/_root/arshal_methods.js";
import type { Node as Node__from_ast } from "../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { TypeFlags as TypeFlags__from_checker } from "../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { ID as ID__from_jsonrpc, ResponseError as ResponseError__from_jsonrpc } from "../modules/github.com/microsoft/typescript-go/internal/jsonrpc/jsonrpc.js";
import type { ScriptElementKindModifier as ScriptElementKindModifier__from_lsutil } from "../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/symbol_display.js";
import type { $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error, $goInterface$Interface_Method_encoding$AppendText_SliceOf_byte_to_SliceOf_byte_Named_error as GoInterface } from "./interface-contracts.js";
import type { bool, gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { Value as Value__from_jsontext } from "../modules/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/value.js";
import { JSONRPCVersion as JSONRPCVersion__from_jsonrpc } from "../modules/github.com/microsoft/typescript-go/internal/jsonrpc/jsonrpc.js";
import { Method as Method__from_lsproto } from "../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class $goStruct$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(public MarshalerTo: MarshalerTo__from_json | undefined) {
    }
    static $equal($left: $goStruct$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_, $right: $goStruct$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_): bool {
        return goInterfaceEqual($left.MarshalerTo, $right.MarshalerTo);
    }
    static $hash($source: $goStruct$Struct_Embedded_MarshalerTo_Named_json$MarshalerTo_Tag__empty_): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.MarshalerTo === undefined ? 0 : $source.MarshalerTo.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(public Marshaler: Marshaler__from_json | undefined) {
    }
    static $equal($left: $goStruct$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_, $right: $goStruct$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_): bool {
        return goInterfaceEqual($left.Marshaler, $right.Marshaler);
    }
    static $hash($source: $goStruct$Struct_Embedded_Marshaler_Named_json$Marshaler_Tag__empty_): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.Marshaler === undefined ? 0 : $source.Marshaler.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(public TextAppender: GoInterface | undefined) {
    }
    static $equal($left: $goStruct$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_, $right: $goStruct$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_): bool {
        return goInterfaceEqual($left.TextAppender, $right.TextAppender);
    }
    static $hash($source: $goStruct$Struct_Embedded_TextAppender_Named_encoding$TextAppender_Tag__empty_): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.TextAppender === undefined ? 0 : $source.TextAppender.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(public TextMarshaler: $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error | undefined) {
    }
    static $equal($left: $goStruct$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_, $right: $goStruct$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_): bool {
        return goInterfaceEqual($left.TextMarshaler, $right.TextMarshaler);
    }
    static $hash($source: $goStruct$Struct_Embedded_TextMarshaler_Named_encoding$TextMarshaler_Tag__empty_): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.TextMarshaler === undefined ? 0 : $source.TextMarshaler.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_ {
    declare private readonly $goType: void;
    public constructor(public Content: tsonicTypeScriptRuntime.Location<gostring> | undefined) {
    }
    static $zero(): $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_ {
        return new $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_(void 0);
    }
    static $copy($source: $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_): $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_ {
        return new $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_($source.Content);
    }
    static $equal($left: $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_, $right: $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.Content, $right.Content);
    }
    static $hash($source: $goStruct$Struct_Field_Content_PointerTo_string_Tag_json_u3a__u22_content_u22_): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Content));
        return $hash;
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_ {
    declare private readonly $goType: void;
    public constructor(public Files: RuntimeSlice<gostring>, public Directories: RuntimeSlice<gostring>) {
    }
    static $copy($source: $goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_): $goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_ {
        return new $goStruct$Struct_Field_Files_SliceOf_string_Tag_json_u3a__u22_files_u22__Field_Directories_SliceOf_string_Tag_json_u3a__u22_directories_u22_($source.Files, $source.Directories);
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_Fragment_string_Tag__empty_$Storage = {
    Fragment: gostring;
};
export class $goStruct$Struct_Field_Fragment_string_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_Fragment_string_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_Fragment_string_Tag__empty_): $goStruct$Struct_Field_Fragment_string_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_Fragment_string_Tag__empty_$Storage): $goStruct$Struct_Field_Fragment_string_Tag__empty_ {
        return new $goStruct$Struct_Field_Fragment_string_Tag__empty_($source);
    }
    public get Fragment(): gostring {
        return this.$storage.Fragment;
    }
    public set Fragment($value: gostring) {
        this.$storage.Fragment = $value;
    }
    static $zero(): $goStruct$Struct_Field_Fragment_string_Tag__empty_ {
        return new $goStruct$Struct_Field_Fragment_string_Tag__empty_({
            Fragment: ""
        });
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_ {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion__from_jsonrpc, public ID: {
        value: ID__from_jsonrpc;
    } | undefined, public Method: Method__from_lsproto, public Params: Value__from_jsontext) {
    }
    static $zero(): $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_ {
        return new $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_(JSONRPCVersion__from_jsonrpc.$zero(), void 0, new Method__from_lsproto(""), new Value__from_jsontext(RuntimeSlice.nil<uint8>()));
    }
    static $copy($source: $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_): $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_ {
        return new $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22_(JSONRPCVersion__from_jsonrpc.$copy($source.JSONRPC), $source.ID, $source.Method, $source.Params);
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_ {
    declare private readonly $goType: void;
    public constructor(public JSONRPC: JSONRPCVersion__from_jsonrpc, public Method: Method__from_lsproto, public ID: {
        value: ID__from_jsonrpc;
    } | undefined, public Params: Value__from_jsontext, public Result: Value__from_jsontext, public Error: {
        value: ResponseError__from_jsonrpc;
    } | undefined) {
    }
    static $zero(): $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_ {
        return new $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_(JSONRPCVersion__from_jsonrpc.$zero(), new Method__from_lsproto(""), void 0, new Value__from_jsontext(RuntimeSlice.nil<uint8>()), new Value__from_jsontext(RuntimeSlice.nil<uint8>()), void 0);
    }
    static $copy($source: $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_): $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_ {
        return new $goStruct$Struct_Field_JSONRPC_Named_jsonrpc$JSONRPCVersion_Tag_json_u3a__u22_jsonrpc_u22__Field_Method_Named_lsproto$Method_Tag_json_u3a__u22_method_u22__Field_ID_PointerTo_Named_jsonrpc$ID_Tag_json_u3a__u22_id_u2c_omitzero_u22__Field_Params_Named_jsontext$Value_Tag_json_u3a__u22_params_u22__Field_Result_Named_jsontext$Value_Tag_json_u3a__u22_result_u2c_omitzero_u22__Field_Error_PointerTo_Named_jsonrpc$ResponseError_Tag_json_u3a__u22_error_u2c_omitzero_u22_(JSONRPCVersion__from_jsonrpc.$copy($source.JSONRPC), $source.Method, $source.ID, $source.Params, $source.Result, $source.Error);
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_$Storage = {
    JSX: gostring;
    IntrinsicElements: gostring;
    ElementClass: gostring;
    ElementAttributesPropertyNameContainer: gostring;
    ElementChildrenAttributeNameContainer: gostring;
    Element: gostring;
    ElementType: gostring;
    IntrinsicAttributes: gostring;
    IntrinsicClassAttributes: gostring;
    LibraryManagedAttributes: gostring;
};
export class $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_): $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_$Storage): $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_ {
        return new $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_($source);
    }
    public get JSX(): gostring {
        return this.$storage.JSX;
    }
    public set JSX($value: gostring) {
        this.$storage.JSX = $value;
    }
    public get IntrinsicElements(): gostring {
        return this.$storage.IntrinsicElements;
    }
    public set IntrinsicElements($value: gostring) {
        this.$storage.IntrinsicElements = $value;
    }
    public get ElementClass(): gostring {
        return this.$storage.ElementClass;
    }
    public set ElementClass($value: gostring) {
        this.$storage.ElementClass = $value;
    }
    public get ElementAttributesPropertyNameContainer(): gostring {
        return this.$storage.ElementAttributesPropertyNameContainer;
    }
    public set ElementAttributesPropertyNameContainer($value: gostring) {
        this.$storage.ElementAttributesPropertyNameContainer = $value;
    }
    public get ElementChildrenAttributeNameContainer(): gostring {
        return this.$storage.ElementChildrenAttributeNameContainer;
    }
    public set ElementChildrenAttributeNameContainer($value: gostring) {
        this.$storage.ElementChildrenAttributeNameContainer = $value;
    }
    public get Element(): gostring {
        return this.$storage.Element;
    }
    public set Element($value: gostring) {
        this.$storage.Element = $value;
    }
    public get ElementType(): gostring {
        return this.$storage.ElementType;
    }
    public set ElementType($value: gostring) {
        this.$storage.ElementType = $value;
    }
    public get IntrinsicAttributes(): gostring {
        return this.$storage.IntrinsicAttributes;
    }
    public set IntrinsicAttributes($value: gostring) {
        this.$storage.IntrinsicAttributes = $value;
    }
    public get IntrinsicClassAttributes(): gostring {
        return this.$storage.IntrinsicClassAttributes;
    }
    public set IntrinsicClassAttributes($value: gostring) {
        this.$storage.IntrinsicClassAttributes = $value;
    }
    public get LibraryManagedAttributes(): gostring {
        return this.$storage.LibraryManagedAttributes;
    }
    public set LibraryManagedAttributes($value: gostring) {
        this.$storage.LibraryManagedAttributes = $value;
    }
    static $zero(): $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_ {
        return new $goStruct$Struct_Field_JSX_string_Tag__empty__Field_IntrinsicElements_string_Tag__empty__Field_ElementClass_string_Tag__empty__Field_ElementAttributesPropertyNameContainer_string_Tag__empty__Field_ElementChildrenAttributeNameContainer_string_Tag__empty__Field_Element_string_Tag__empty__Field_ElementType_string_Tag__empty__Field_IntrinsicAttributes_string_Tag__empty__Field_IntrinsicClassAttributes_string_Tag__empty__Field_LibraryManagedAttributes_string_Tag__empty_({
            JSX: "",
            IntrinsicElements: "",
            ElementClass: "",
            ElementAttributesPropertyNameContainer: "",
            ElementChildrenAttributeNameContainer: "",
            Element: "",
            ElementType: "",
            IntrinsicAttributes: "",
            IntrinsicClassAttributes: "",
            LibraryManagedAttributes: ""
        });
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_$Storage = {
    L1I: int;
    L1D: int;
    L2: int;
    L3: int;
};
export class $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_): $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_$Storage): $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_ {
        return new $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_($source);
    }
    public get L1I(): int {
        return this.$storage.L1I;
    }
    public set L1I($value: int) {
        this.$storage.L1I = $value;
    }
    public get L1D(): int {
        return this.$storage.L1D;
    }
    public set L1D($value: int) {
        this.$storage.L1D = $value;
    }
    public get L2(): int {
        return this.$storage.L2;
    }
    public set L2($value: int) {
        this.$storage.L2 = $value;
    }
    public get L3(): int {
        return this.$storage.L3;
    }
    public set L3($value: int) {
        this.$storage.L3 = $value;
    }
    static $zero(): $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_ {
        return new $goStruct$Struct_Field_L1I_int_Tag__empty__Field_L1D_int_Tag__empty__Field_L2_int_Tag__empty__Field_L3_int_Tag__empty_({
            L1I: 0,
            L1D: 0,
            L2: 0,
            L3: 0
        });
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_$Storage = {
    L: uint8;
    H: uint8;
    N: uint8;
    I: uint8;
};
export class $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_): $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_$Storage): $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_ {
        return new $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_($source);
    }
    public get L(): uint8 {
        return this.$storage.L;
    }
    public set L($value: uint8) {
        this.$storage.L = $value;
    }
    public get H(): uint8 {
        return this.$storage.H;
    }
    public set H($value: uint8) {
        this.$storage.H = $value;
    }
    public get N(): uint8 {
        return this.$storage.N;
    }
    public set N($value: uint8) {
        this.$storage.N = $value;
    }
    public get I(): uint8 {
        return this.$storage.I;
    }
    public set I($value: uint8) {
        this.$storage.I = $value;
    }
    static $zero(): $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_ {
        return new $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_({
            L: 0,
            H: 0,
            N: 0,
            I: 0
        });
    }
    static $copy($source: $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_): $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_ {
        return new $goStruct$Struct_Field_L_uint8_Tag__empty__Field_H_uint8_Tag__empty__Field_N_uint8_Tag__empty__Field_I_uint8_Tag__empty_({
            L: $source.$storage.L,
            H: $source.$storage.H,
            N: $source.$storage.N,
            I: $source.$storage.I
        });
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Field_ast_u24_parent_PointerTo_Named_ast$Node_Tag__empty__Field_ast_u24_visit_PointerTo_Named_ast$Node_to_bool_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(public parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined) {
    }
    static $zero(): $goStruct$Struct_Field_ast_u24_parent_PointerTo_Named_ast$Node_Tag__empty__Field_ast_u24_visit_PointerTo_Named_ast$Node_to_bool_Tag__empty_ {
        return new $goStruct$Struct_Field_ast_u24_parent_PointerTo_Named_ast$Node_Tag__empty__Field_ast_u24_visit_PointerTo_Named_ast$Node_to_bool_Tag__empty_(void 0, void 0);
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage = {
    flag: uint32;
    name: gostring;
};
export class $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_): $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_$Storage): $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_ {
        return new $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_($source);
    }
    public get flag(): TypeFlags__from_checker {
        return this.$storage.flag;
    }
    public set flag($value: TypeFlags__from_checker) {
        this.$storage.flag = $value;
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    static $zero(): $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_ {
        return new $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_({
            flag: 0,
            name: ""
        });
    }
    static $copy($source: $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_): $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_ {
        return new $goStruct$Struct_Field_checker_u24_flag_Named_checker$TypeFlags_Tag__empty__Field_checker_u24_name_string_Tag__empty_({
            flag: $source.$storage.flag,
            name: $source.$storage.name
        });
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_$Storage = {
    primitive: gostring;
    builtin: gostring;
};
export class $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_): $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_$Storage): $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_ {
        return new $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_($source);
    }
    public get primitive(): gostring {
        return this.$storage.primitive;
    }
    public set primitive($value: gostring) {
        this.$storage.primitive = $value;
    }
    public get builtin(): gostring {
        return this.$storage.builtin;
    }
    public set builtin($value: gostring) {
        this.$storage.builtin = $value;
    }
    static $copy($source: $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_): $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_ {
        return new $goStruct$Struct_Field_checker_u24_primitive_string_Tag__empty__Field_checker_u24_builtin_string_Tag__empty_({
            primitive: $source.$storage.primitive,
            builtin: $source.$storage.builtin
        });
    }
    declare private readonly then?: never;
}
export type $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage = {
    flag: uint32;
    name: gostring;
};
export class $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage) {
    }
    public static $storageOf($source: $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_): $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage): $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_ {
        return new $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_($source);
    }
    public get flag(): ScriptElementKindModifier__from_lsutil {
        return this.$storage.flag;
    }
    public set flag($value: ScriptElementKindModifier__from_lsutil) {
        this.$storage.flag = $value;
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    declare private readonly then?: never;
}
export class $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_ {
    declare private readonly $goType: void;
    public constructor(public head: RuntimeSlice<gostring>, public tails: RuntimeSlice<RuntimeSlice<gostring>>) {
    }
    static $zero(): $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_ {
        return new $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_(RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<RuntimeSlice<gostring>>());
    }
    static $copy($source: $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_): $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_ {
        return new $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_($source.head, $source.tails);
    }
    declare private readonly then?: never;
}
