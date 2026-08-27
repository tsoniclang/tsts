import type { EmitHelper } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int32 } from "@gotots/runtime/scalars.js";
export class $PackageState {
    declare AdvancedAsyncSuperHelper: {
        value: EmitHelper;
    } | undefined;
    declare AsyncSuperHelper: {
        value: EmitHelper;
    } | undefined;
    declare addDisposableResourceHelper: {
        value: EmitHelper;
    } | undefined;
    declare asyncDelegatorHelper: {
        value: EmitHelper;
    } | undefined;
    declare asyncGeneratorHelper: {
        value: EmitHelper;
    } | undefined;
    declare asyncValuesHelper: {
        value: EmitHelper;
    } | undefined;
    declare awaitHelper: {
        value: EmitHelper;
    } | undefined;
    declare awaiterHelper: {
        value: EmitHelper;
    } | undefined;
    declare classPrivateFieldGetHelper: {
        value: EmitHelper;
    } | undefined;
    declare classPrivateFieldInHelper: {
        value: EmitHelper;
    } | undefined;
    declare classPrivateFieldSetHelper: {
        value: EmitHelper;
    } | undefined;
    declare createBindingHelper: {
        value: EmitHelper;
    } | undefined;
    declare decorateHelper: {
        value: EmitHelper;
    } | undefined;
    declare disposeResourcesHelper: {
        value: EmitHelper;
    } | undefined;
    declare emitContextPool: sync__from_gostdlib.Pool;
    declare esDecorateHelper: {
        value: EmitHelper;
    } | undefined;
    declare escapedCharsMap: GoMapValue<int32, gostring>;
    declare exportStarHelper: {
        value: EmitHelper;
    } | undefined;
    declare importDefaultHelper: {
        value: EmitHelper;
    } | undefined;
    declare importStarHelper: {
        value: EmitHelper;
    } | undefined;
    declare jsxEscapedCharsMap: GoMapValue<int32, gostring>;
    declare makeTemplateObjectHelper: {
        value: EmitHelper;
    } | undefined;
    declare metadataHelper: {
        value: EmitHelper;
    } | undefined;
    declare nextAutoGenerateId: atomic__from_gostdlib.Uint32;
    declare paramHelper: {
        value: EmitHelper;
    } | undefined;
    declare propKeyHelper: {
        value: EmitHelper;
    } | undefined;
    declare restHelper: {
        value: EmitHelper;
    } | undefined;
    declare rewriteRelativeImportExtensionsHelper: {
        value: EmitHelper;
    } | undefined;
    declare runInitializersHelper: {
        value: EmitHelper;
    } | undefined;
    declare setFunctionNameHelper: {
        value: EmitHelper;
    } | undefined;
    declare setModuleDefaultHelper: {
        value: EmitHelper;
    } | undefined;
    declare singleLineStringWriterPool: sync__from_gostdlib.Pool;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
