import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Tristate } from "./tristate.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { noCopy } from "./compileroptions.js";
import { GoMapHash } from "@gotots/runtime/map.js";
export class BuildOptions {
    declare private readonly $goType: void;
    public constructor($blank0: noCopy, public Dry: Tristate, public Force: Tristate, public Verbose: Tristate, public Builders: tsonicTypeScriptRuntime.Location<int> | undefined, public StopBuildOnErrors: Tristate, public Clean: Tristate) {
    }
    static $zero(): BuildOptions {
        return new BuildOptions(noCopy.$zero(), 0, 0, 0, void 0, 0, 0);
    }
    static $copy($source: BuildOptions): BuildOptions {
        return new BuildOptions(noCopy.$zero(), $source.Dry, $source.Force, $source.Verbose, $source.Builders, $source.StopBuildOnErrors, $source.Clean);
    }
    static $equal($left: BuildOptions, $right: BuildOptions): bool {
        return $left.Dry === $right.Dry && $left.Force === $right.Force && $left.Verbose === $right.Verbose &&
            tsonicTypeScriptRuntime.sameLocation($left.Builders, $right.Builders) && $left.StopBuildOnErrors === $right.StopBuildOnErrors && $left.Clean === $right.Clean;
    }
    static $hash($source: BuildOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Dry));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Force));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Verbose));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Builders));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.StopBuildOnErrors));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.Clean));
        return $hash;
    }
    declare private readonly then?: never;
}
