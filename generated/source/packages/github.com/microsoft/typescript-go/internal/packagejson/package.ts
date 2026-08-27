import { JSONValueTypeArray$constant, JSONValueTypeBoolean$constant, JSONValueTypeNotPresent$constant, JSONValueTypeNull$constant, JSONValueTypeNumber$constant, JSONValueTypeObject$constant, JSONValueTypeString$constant } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
import { Version as Version__from_core } from "../core/package.js";
import { MustParse as MustParse__from_semver, Version as Version__from_semver } from "../semver/package.js";
import { $state } from "./state.js";
export function $initialize(): void {
    JSONValueTypeArray = JSONValueTypeArray$constant();
    JSONValueTypeBoolean = JSONValueTypeBoolean$constant();
    JSONValueTypeNotPresent = JSONValueTypeNotPresent$constant();
    JSONValueTypeNull = JSONValueTypeNull$constant();
    JSONValueTypeNumber = JSONValueTypeNumber$constant();
    JSONValueTypeObject = JSONValueTypeObject$constant();
    JSONValueTypeString = JSONValueTypeString$constant();
    $state.typeScriptVersion = Version__from_semver.$storageOf(Version__from_semver.$zero());
    {
        $state.typeScriptVersion = Version__from_semver.$storageOf(MustParse__from_semver(Version__from_core()));
    }
    {
        void 0;
    }
    {
        void 0;
    }
}
export { InfoCache, InfoCacheEntry, NewInfoCache, PackageJson, VersionPaths } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/cache.js";
export { Expected, Expected$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/expected.js";
export { ExportsOrImports, ExportsOrImports$Storage } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/exportsorimports.js";
export { JSONValue, JSONValue$Storage, JSONValueType, JSONValueTypeArray$constant, JSONValueTypeBoolean$constant, JSONValueTypeNotPresent$constant, JSONValueTypeNull$constant, JSONValueTypeNumber$constant, JSONValueTypeObject$constant, JSONValueTypeString$constant, JSONValueType_String } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/jsonvalue.js";
export { DependencyFields, Fields, HeaderFields, Parse, PathFields } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/packagejson.js";
export { TypeValidatedField, TypeValidatedField$contract, TypeValidatedField$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/packagejson/validated.js";
export let JSONValueTypeArray: ReturnType<typeof JSONValueTypeArray$constant>;
export let JSONValueTypeBoolean: ReturnType<typeof JSONValueTypeBoolean$constant>;
export let JSONValueTypeNotPresent: ReturnType<typeof JSONValueTypeNotPresent$constant>;
export let JSONValueTypeNull: ReturnType<typeof JSONValueTypeNull$constant>;
export let JSONValueTypeNumber: ReturnType<typeof JSONValueTypeNumber$constant>;
export let JSONValueTypeObject: ReturnType<typeof JSONValueTypeObject$constant>;
export let JSONValueTypeString: ReturnType<typeof JSONValueTypeString$constant>;
