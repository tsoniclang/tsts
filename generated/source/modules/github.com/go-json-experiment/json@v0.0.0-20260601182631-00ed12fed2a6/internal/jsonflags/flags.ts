import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NotForPublicUse as NotForPublicUse__from_internal } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/package.js";
import type { bool, uint64 } from "@gotots/runtime/scalars.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class Bools {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint64) {
    }
    declare private readonly then?: never;
    JSONOptions($0: NotForPublicUse__from_internal): void {
    }
}
export function NonBooleanFlags$constant(): Bools {
    return new Bools(369344512n);
}
export function AnyWhitespace$constant(): Bools {
    return new Bools(14336n);
}
export function AnyEscape$constant(): Bools {
    return new Bools(1536n);
}
export function CanonicalizeNumbers$constant(): Bools {
    return new Bools(192n);
}
export function TagFlags$constant(): Bools {
    return new Bools(402653184n);
}
export function AllowDuplicateNames$constant(): Bools {
    return new Bools(2n);
}
export function AllowInvalidUTF8$constant(): Bools {
    return new Bools(4n);
}
export function WithinArshalCall$constant(): Bools {
    return new Bools(8n);
}
export function OmitTopLevelNewline$constant(): Bools {
    return new Bools(16n);
}
export function PreserveRawStrings$constant(): Bools {
    return new Bools(32n);
}
export function CanonicalizeRawInts$constant(): Bools {
    return new Bools(64n);
}
export function CanonicalizeRawFloats$constant(): Bools {
    return new Bools(128n);
}
export function ReorderRawObjects$constant(): Bools {
    return new Bools(256n);
}
export function EscapeForHTML$constant(): Bools {
    return new Bools(512n);
}
export function EscapeForJS$constant(): Bools {
    return new Bools(1024n);
}
export function Multiline$constant(): Bools {
    return new Bools(2048n);
}
export function SpaceAfterColon$constant(): Bools {
    return new Bools(4096n);
}
export function SpaceAfterComma$constant(): Bools {
    return new Bools(8192n);
}
export function Indent$constant(): Bools {
    return new Bools(16384n);
}
export function IndentPrefix$constant(): Bools {
    return new Bools(32768n);
}
export function ByteLimit$constant(): Bools {
    return new Bools(65536n);
}
export function DepthLimit$constant(): Bools {
    return new Bools(131072n);
}
export function Deterministic$constant(): Bools {
    return new Bools(524288n);
}
export function FormatNilMapAsNull$constant(): Bools {
    return new Bools(1048576n);
}
export function FormatNilSliceAsNull$constant(): Bools {
    return new Bools(2097152n);
}
export function OmitZeroStructFields$constant(): Bools {
    return new Bools(4194304n);
}
export function MatchCaseInsensitiveNames$constant(): Bools {
    return new Bools(8388608n);
}
export function RejectUnknownMembers$constant(): Bools {
    return new Bools(16777216n);
}
export function Marshalers$constant(): Bools {
    return new Bools(33554432n);
}
export function Unmarshalers$constant(): Bools {
    return new Bools(67108864n);
}
export function StringTag$constant(): Bools {
    return new Bools(134217728n);
}
export function FormatTag$constant(): Bools {
    return new Bools(268435456n);
}
export function CallMethodsWithLegacySemantics$constant(): Bools {
    return new Bools(536870912n);
}
export function FormatByteArrayAsArray$constant(): Bools {
    return new Bools(1073741824n);
}
export function FormatBytesWithLegacySemantics$constant(): Bools {
    return new Bools(2147483648n);
}
export function FormatDurationAsNano$constant(): Bools {
    return new Bools(4294967296n);
}
export function MatchCaseSensitiveDelimiter$constant(): Bools {
    return new Bools(8589934592n);
}
export function MergeWithLegacySemantics$constant(): Bools {
    return new Bools(17179869184n);
}
export function OmitEmptyWithLegacySemantics$constant(): Bools {
    return new Bools(34359738368n);
}
export function ParseBytesWithLooseRFC4648$constant(): Bools {
    return new Bools(68719476736n);
}
export function ParseTimeWithLooseRFC3339$constant(): Bools {
    return new Bools(137438953472n);
}
export function ReportErrorsWithLegacySemantics$constant(): Bools {
    return new Bools(274877906944n);
}
export function StringifyWithLegacySemantics$constant(): Bools {
    return new Bools(549755813888n);
}
export function UnmarshalAnyWithRawNumber$constant(): Bools {
    return new Bools(1099511627776n);
}
export function UnmarshalArrayFromAnyLength$constant(): Bools {
    return new Bools(2199023255552n);
}
export type Flags$Storage = {
    Presence: uint64;
    Values: uint64;
};
export class Flags {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Flags$Storage) {
    }
    public static $storageOf($source: Flags): Flags$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Flags$Storage): Flags {
        return new Flags($source);
    }
    public get Presence(): uint64 {
        return this.$storage.Presence;
    }
    public set Presence($value: uint64) {
        this.$storage.Presence = $value;
    }
    public get Values(): uint64 {
        return this.$storage.Values;
    }
    public set Values($value: uint64) {
        this.$storage.Values = $value;
    }
    static $copy($source: Flags): Flags {
        return new Flags({
            Presence: $source.$storage.Presence,
            Values: $source.$storage.Values
        });
    }
    static $equal($left: Flags, $right: Flags): bool {
        return $left.$storage.Presence === $right.$storage.Presence && $left.$storage.Values === $right.$storage.Values;
    }
    static $hash($source: Flags): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.$storage.Presence));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.$storage.Values));
        return $hash;
    }
    static $zeroStorage(): Flags$Storage {
        return {
            Presence: 0n,
            Values: 0n
        };
    }
    declare private readonly then?: never;
    static Clear(fs: tsonicTypeScriptRuntime.Location<Flags> | undefined, f: Bools): void {
        let mask = ((void Bools,
            goUint64(~f.$value)) as uint64);
        const __gotots_store_3 = Flags.$storageOf(((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_3.Presence = goUint64(__gotots_store_3.Presence & mask);
        const __gotots_store_4 = Flags.$storageOf(((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_4.Values = goUint64(__gotots_store_4.Values & mask);
    }
    static Join(dst: tsonicTypeScriptRuntime.Location<Flags> | undefined, src: Flags): void {
        const __gotots_store_5 = Flags.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_5.Presence = goUint64(__gotots_store_5.Presence | Flags.$storageOf(src).Presence);
        const __gotots_store_6 = Flags.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_6.Values = goUint64(__gotots_store_6.Values & goUint64(~Flags.$storageOf(src).Presence));
        const __gotots_store_7 = Flags.$storageOf(((dst ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_7.Values = goUint64(__gotots_store_7.Values | Flags.$storageOf(src).Values);
    }
    static Set(fs: tsonicTypeScriptRuntime.Location<Flags> | undefined, f: Bools): void {
        let id = goUint64(f.$value & ~1n);
        const __gotots_store_0 = Flags.$storageOf(((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_0.Presence = goUint64(__gotots_store_0.Presence | id);
        const __gotots_store_1 = Flags.$storageOf(((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_1.Values = goUint64(__gotots_store_1.Values & goUint64(~id));
        const __gotots_store_2 = Flags.$storageOf(((fs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags>).value);
        __gotots_store_2.Values = goUint64(__gotots_store_2.Values | goUint64(((void Bools,
            goUint64(f.$value & 1n)) as uint64)
            * id));
    }
    Get(f: Bools): bool {
        return goUint64(Flags.$storageOf(this).Values & f.$value) > 0n;
    }
    Has(f: Bools): bool {
        return goUint64(Flags.$storageOf(this).Presence & f.$value) > 0n;
    }
}
