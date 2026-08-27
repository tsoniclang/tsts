import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { cleared$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/scanner/scanner.js";
export function cleared$MapOf_string_To_string$string$string($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> {
    return cleared$kernel<GoMapValue<gostring, gostring>, gostring, gostring>(($argument0: GoMapValue<gostring, gostring>): void => {
        $argument0.clear();
    }, $argument0);
}
