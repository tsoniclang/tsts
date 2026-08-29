import type { CompilerOptions } from "./compileroptions.js";
import type { ProjectReference } from "./projectreference.js";
import type { TypeAcquisition } from "./typeacquisition.js";
import type { WatchOptions } from "./watchoptions.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
export class ParsedOptions {
    declare private readonly $goType: void;
    public constructor(public CompilerOptions: {
        value: CompilerOptions;
    } | undefined, public WatchOptions: {
        value: WatchOptions;
    } | undefined, public TypeAcquisition: {
        value: TypeAcquisition;
    } | undefined, public FileNames: RuntimeSlice<gostring>, public ProjectReferences: RuntimeSlice<ProjectReference | undefined>) {
    }
    static $copy($source: ParsedOptions): ParsedOptions {
        return new ParsedOptions($source.CompilerOptions, $source.WatchOptions, $source.TypeAcquisition, $source.FileNames, $source.ProjectReferences);
    }
    declare private readonly then?: never;
    $tsonicReplace($value: ParsedOptions): void {
        this.CompilerOptions = $value.CompilerOptions;
        this.WatchOptions = $value.WatchOptions;
        this.TypeAcquisition = $value.TypeAcquisition;
        this.FileNames = $value.FileNames;
        this.ProjectReferences = $value.ProjectReferences;
    }
}
