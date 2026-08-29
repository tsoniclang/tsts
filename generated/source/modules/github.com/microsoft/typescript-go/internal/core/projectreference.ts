import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { CombinePaths as CombinePaths__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, FileExtensionIs as FileExtensionIs__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class ProjectReference {
    declare private readonly $goType: void;
    public constructor(public Path: gostring, public OriginalPath: gostring, public Circular: bool) {
    }
    static $zero(): ProjectReference {
        return new ProjectReference("", "", false);
    }
    static $copy($source: ProjectReference): ProjectReference {
        return new ProjectReference($source.Path, $source.OriginalPath, $source.Circular);
    }
    static $equal($left: ProjectReference, $right: ProjectReference): bool {
        return $left.Path === $right.Path && $left.OriginalPath === $right.OriginalPath && $left.Circular === $right.Circular;
    }
    static $hash($source: ProjectReference): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Path));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.OriginalPath));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.Circular));
        return $hash;
    }
    declare private readonly then?: never;
    $tsonicReplace($value: ProjectReference): void {
        this.Path = $value.Path;
        this.OriginalPath = $value.OriginalPath;
        this.Circular = $value.Circular;
    }
}
export function ResolveProjectReferencePath(ref: ProjectReference | undefined): gostring {
    return ResolveConfigFileNameOfProjectReference((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path);
}
export function ResolveConfigFileNameOfProjectReference(path: gostring): gostring {
    if (FileExtensionIs__from_tspath(path, ExtensionJson$string__from_tspath)) {
        return path;
    }
    return CombinePaths__from_tspath(path, RuntimeSlice.literal<gostring>(["tsconfig.json"]));
}
