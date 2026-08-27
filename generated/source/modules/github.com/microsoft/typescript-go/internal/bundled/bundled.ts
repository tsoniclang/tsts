import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { libPath, wrapFS } from "./embed.js";
export function WrapFS(fs: FS__from_vfs | undefined): FS__from_vfs | undefined {
    return wrapFS(fs);
}
export function LibPath(): gostring {
    return libPath();
}
