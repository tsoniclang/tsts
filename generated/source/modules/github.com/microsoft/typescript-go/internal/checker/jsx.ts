import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Type } from "./types.js";
import type { bool, int32, uint32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { Node as Node__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type JsxFlags = uint32;
export function JsxFlagsIntrinsicNamedElement$constant(): JsxFlags {
    return 1;
}
export function JsxFlagsIntrinsicIndexedElement$constant(): JsxFlags {
    return 2;
}
export type JsxReferenceKind = int32;
export function JsxReferenceKindComponent$constant(): JsxReferenceKind {
    return 0;
}
export function JsxReferenceKindFunction$constant(): JsxReferenceKind {
    return 1;
}
export function JsxReferenceKindMixed$constant(): JsxReferenceKind {
    return 2;
}
export type JsxElementLinks$Storage = {
    jsxFlags: uint32;
    resolvedJsxElementAttributesType: tsonicTypeScriptRuntime.Location<Type> | undefined;
    jsxNamespace: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    jsxImplicitImportContainer: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
};
export class JsxElementLinks implements GoContainerStoredValue<JsxElementLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: JsxElementLinks$Storage) {
    }
    public static $storageOf($source: JsxElementLinks): JsxElementLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: JsxElementLinks$Storage): JsxElementLinks {
        return new JsxElementLinks($source);
    }
    public get jsxFlags(): JsxFlags {
        return this.$storage.jsxFlags;
    }
    public set jsxFlags($value: JsxFlags) {
        this.$storage.jsxFlags = $value;
    }
    public get resolvedJsxElementAttributesType(): tsonicTypeScriptRuntime.Location<Type> | undefined {
        return this.$storage.resolvedJsxElementAttributesType;
    }
    public set resolvedJsxElementAttributesType($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
        this.$storage.resolvedJsxElementAttributesType = $value;
    }
    public get jsxNamespace(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.jsxNamespace;
    }
    public set jsxNamespace($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.jsxNamespace = $value;
    }
    public get jsxImplicitImportContainer(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.jsxImplicitImportContainer;
    }
    public set jsxImplicitImportContainer($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.jsxImplicitImportContainer = $value;
    }
    declare readonly [$goContainerStorageType]: JsxElementLinks$Storage;
    static $zero(): JsxElementLinks {
        return new JsxElementLinks({
            jsxFlags: 0,
            resolvedJsxElementAttributesType: void 0,
            jsxNamespace: void 0,
            jsxImplicitImportContainer: void 0
        });
    }
    static $copy($source: JsxElementLinks): JsxElementLinks {
        return new JsxElementLinks({
            jsxFlags: $source.$storage.jsxFlags,
            resolvedJsxElementAttributesType: $source.$storage.resolvedJsxElementAttributesType,
            jsxNamespace: $source.$storage.jsxNamespace,
            jsxImplicitImportContainer: $source.$storage.jsxImplicitImportContainer
        });
    }
    static $equal($left: JsxElementLinks, $right: JsxElementLinks): bool {
        return $left.$storage.jsxFlags === $right.$storage.jsxFlags &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.resolvedJsxElementAttributesType, $right.$storage.resolvedJsxElementAttributesType) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.jsxNamespace, $right.$storage.jsxNamespace) &&
            tsonicTypeScriptRuntime.sameLocation($left.$storage.jsxImplicitImportContainer, $right.$storage.jsxImplicitImportContainer);
    }
    static $hash($source: JsxElementLinks): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.jsxFlags));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.resolvedJsxElementAttributesType));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.jsxNamespace));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.$storage.jsxImplicitImportContainer));
        return $hash;
    }
    static $zeroStorage(): JsxElementLinks$Storage {
        return {
            jsxFlags: 0,
            resolvedJsxElementAttributesType: void 0,
            jsxNamespace: void 0,
            jsxImplicitImportContainer: void 0
        };
    }
    declare private readonly then?: never;
}
export class JsxElaborationElement {
    declare private readonly $goType: void;
    public constructor(public errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public innerExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public nameType: tsonicTypeScriptRuntime.Location<Type> | undefined, public createDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined) {
    }
    static $copy($source: JsxElaborationElement): JsxElaborationElement {
        return new JsxElaborationElement($source.errorNode, $source.innerExpression, $source.nameType, $source.createDiagnostic);
    }
    declare private readonly then?: never;
}
export function markAsSynthetic(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
    Node__from_ast.ForEachChild(node, new Visitor__from_ast(markAsSynthetic));
    return false;
}
