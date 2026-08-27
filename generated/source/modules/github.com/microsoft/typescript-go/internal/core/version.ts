import type { gostring } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
export function Version(): gostring {
    return $state.version;
}
export function VersionMajorMinor(): gostring {
    return $state.versionMajorMinor;
}
