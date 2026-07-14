import type { bool } from "../../../go/scalars.js";

import type { GoFunc } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/osvfs/reparsepoint_other.go::varGroup::isReparsePoint","kind":"varGroup","status":"implemented","sigHash":"770c45d8a0bd7a96dd0a62ba5f028b06d3adff4d54b3ab9b9dee4f1f0ea880f8"}
 *
 * Go source:
 * var isReparsePoint func(path string) bool
 */
// Only Windows has reparse points; leave this nil (undefined) for other OSes.
export let isReparsePoint: GoFunc<(path: string) => bool>;
