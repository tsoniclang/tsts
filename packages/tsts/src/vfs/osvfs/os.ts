import type { FS as VfsFS } from "../vfs.js";
import { fs, getGlobalTypingsCacheLocation } from "./osvfs.js";

export function FS(): VfsFS {
  return fs();
}

export { fs, getGlobalTypingsCacheLocation };
