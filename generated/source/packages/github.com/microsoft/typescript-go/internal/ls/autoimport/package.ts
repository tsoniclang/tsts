import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
import { ExportSyntaxCommonJSExportsProperty$constant, ExportSyntaxCommonJSModuleExports$constant, ExportSyntaxDefaultDeclaration$constant, ExportSyntaxDefaultModifier$constant, ExportSyntaxEquals$constant, ExportSyntaxModifier$constant, ExportSyntaxNamed$constant, ExportSyntaxNone$constant, ExportSyntaxStar$constant, ExportSyntaxUMD$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import { QueryKindCaseInsensitiveMatch$constant, QueryKindExactMatch$constant, QueryKindWordPrefix$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/view.js";
import { NewSetFromItems$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetFromItems.js";
import { $state } from "./state.js";
import { GoArray } from "@gotots/runtime/array.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    ExportSyntaxCommonJSExportsProperty = ExportSyntaxCommonJSExportsProperty$constant();
    ExportSyntaxCommonJSModuleExports = ExportSyntaxCommonJSModuleExports$constant();
    ExportSyntaxDefaultDeclaration = ExportSyntaxDefaultDeclaration$constant();
    ExportSyntaxDefaultModifier = ExportSyntaxDefaultModifier$constant();
    ExportSyntaxEquals = ExportSyntaxEquals$constant();
    ExportSyntaxModifier = ExportSyntaxModifier$constant();
    ExportSyntaxNamed = ExportSyntaxNamed$constant();
    ExportSyntaxNone = ExportSyntaxNone$constant();
    ExportSyntaxStar = ExportSyntaxStar$constant();
    ExportSyntaxUMD = ExportSyntaxUMD$constant();
    QueryKindCaseInsensitiveMatch = QueryKindCaseInsensitiveMatch$constant();
    QueryKindExactMatch = QueryKindExactMatch$constant();
    QueryKindWordPrefix = QueryKindWordPrefix$constant();
    $state._ExportSyntax_index = GoArray.zero<uint8, 11>(11, 0);
    $state.knownRecursiveSearchPackages = void 0;
    {
        void 0;
    }
    {
        $state._ExportSyntax_index = GoArray.literal<uint8, 11>(11, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0, 16, 36, 53, 80, 110, 128, 143, 159, 192, 227]);
    }
    {
        $state.knownRecursiveSearchPackages = NewSetFromItems$string(RuntimeSlice.literal<gostring>(["@material-ui/core", "@material-ui/icons", "@sap/cds", "@testing-library/react-native", "ajv", "asap", "async", "aws-sdk", "braintree-web", "core-js", "core-js-pure", "crypto-js", "cypress-mochawesome-reporter", "dd-trace", "dumi", "dva", "egg-mock", "electron-log", "es-abstract", "es6-promise", "eslint-config-taro", "expo", "expo-router", "flow-remove-types", "gatsby", "glamor", "gluegun", "graphology-indices", "graphology-traversal", "graphology-utils", "jest-expo", "lodash", "lodash-es", "moment", "mz", "next", "pdfjs-dist", "protobufjs", "react-app-polyfill", "react-dev-utils", "react-devtools-inline", "recast", "semver", "stylelint-config-html", "umi", "web3-provider-engine", "webpack"]));
    }
    {
        void 0;
    }
}
export { Export, ExportID, ExportSyntax, ExportSyntaxCommonJSExportsProperty$constant, ExportSyntaxCommonJSModuleExports$constant, ExportSyntaxDefaultDeclaration$constant, ExportSyntaxDefaultModifier$constant, ExportSyntaxEquals$constant, ExportSyntaxModifier$constant, ExportSyntaxNamed$constant, ExportSyntaxNone$constant, ExportSyntaxStar$constant, ExportSyntaxUMD$constant, ModuleID, SymbolToExport } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
export { Fix } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
export { ImportAdder, ImportAdder$contract, ImportAdder$is, NewImportAdder, TryGetAutoImportableReferenceFromTypeNode, TypeNodeToAutoImportableTypeNode, TypeToAutoImportableTypeNode } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/import_adder.js";
export { Index, Index$Storage } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/index.js";
export { BucketState, BucketState$Storage, BucketStats, BucketStats$Storage, CacheStats, NewRegistry, Registry, RegistryBucket, RegistryChange, RegistryCloneHost, RegistryCloneHost$contract, RegistryCloneHost$is } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
export { FixAndExport, NewView, QueryKind, QueryKindCaseInsensitiveMatch$constant, QueryKindExactMatch$constant, QueryKindWordPrefix$constant, View } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/view.js";
export let ExportSyntaxCommonJSExportsProperty: ReturnType<typeof ExportSyntaxCommonJSExportsProperty$constant>;
export let ExportSyntaxCommonJSModuleExports: ReturnType<typeof ExportSyntaxCommonJSModuleExports$constant>;
export let ExportSyntaxDefaultDeclaration: ReturnType<typeof ExportSyntaxDefaultDeclaration$constant>;
export let ExportSyntaxDefaultModifier: ReturnType<typeof ExportSyntaxDefaultModifier$constant>;
export let ExportSyntaxEquals: ReturnType<typeof ExportSyntaxEquals$constant>;
export let ExportSyntaxModifier: ReturnType<typeof ExportSyntaxModifier$constant>;
export let ExportSyntaxNamed: ReturnType<typeof ExportSyntaxNamed$constant>;
export let ExportSyntaxNone: ReturnType<typeof ExportSyntaxNone$constant>;
export let ExportSyntaxStar: ReturnType<typeof ExportSyntaxStar$constant>;
export let ExportSyntaxUMD: ReturnType<typeof ExportSyntaxUMD$constant>;
export let QueryKindCaseInsensitiveMatch: ReturnType<typeof QueryKindCaseInsensitiveMatch$constant>;
export let QueryKindExactMatch: ReturnType<typeof QueryKindExactMatch$constant>;
export let QueryKindWordPrefix: ReturnType<typeof QueryKindWordPrefix$constant>;
