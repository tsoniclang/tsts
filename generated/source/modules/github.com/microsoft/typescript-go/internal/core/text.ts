import type { bool, int, int32 } from "@gotots/runtime/scalars.js";
import { GoMapHash } from "@gotots/runtime/map.js";
export type TextPos = int32;
export type TextRange$Storage = {
    pos: int32;
    end: int32;
};
export class TextRange {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TextRange$Storage) {
    }
    public static $storageOf($source: TextRange): TextRange$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TextRange$Storage): TextRange {
        return new TextRange($source);
    }
    public get pos(): TextPos {
        return this.$storage.pos;
    }
    public set pos($value: TextPos) {
        this.$storage.pos = $value;
    }
    public get end(): TextPos {
        return this.$storage.end;
    }
    public set end($value: TextPos) {
        this.$storage.end = $value;
    }
    static $zero(): TextRange {
        return new TextRange({
            pos: 0,
            end: 0
        });
    }
    static $copy($source: TextRange): TextRange {
        return new TextRange({
            pos: $source.$storage.pos,
            end: $source.$storage.end
        });
    }
    static $equal($left: TextRange, $right: TextRange): bool {
        return $left.$storage.pos === $right.$storage.pos && $left.$storage.end === $right.$storage.end;
    }
    static $hash($source: TextRange): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.pos));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.end));
        return $hash;
    }
    declare private readonly then?: never;
    ContainedBy(t2: TextRange): bool {
        return TextRange.$storageOf(t2).pos <= TextRange.$storageOf(this).pos && TextRange.$storageOf(t2).end >= TextRange.$storageOf(this).end;
    }
    Contains(pos: int): bool {
        return pos >= this.pos && pos < this.end;
    }
    ContainsExclusive(pos: int): bool {
        return TextRange.$storageOf(this).pos < pos && pos < TextRange.$storageOf(this).end;
    }
    ContainsInclusive(pos: int): bool {
        return pos >= this.pos && pos <= this.end;
    }
    End(): int {
        return this.end;
    }
    Intersects(t2: TextRange): bool {
        let start = globalThis.Math.max(TextRange.$storageOf(this).pos, TextRange.$storageOf(t2).pos);
        let end = globalThis.Math.min(TextRange.$storageOf(this).end, TextRange.$storageOf(t2).end);
        return start <= end;
    }
    Len(): int {
        return this.end - this.pos;
    }
    Overlaps(t2: TextRange): bool {
        let start = globalThis.Math.max(TextRange.$storageOf(this).pos, TextRange.$storageOf(t2).pos);
        let end = globalThis.Math.min(TextRange.$storageOf(this).end, TextRange.$storageOf(t2).end);
        return start < end;
    }
    Pos(): int {
        return this.pos;
    }
    WithPos(pos: int): TextRange {
        return TextRange.$fromStorage({
            pos: pos | 0,
            end: TextRange.$storageOf(this).end
        });
    }
}
export function NewTextRange(pos: int, end: int): TextRange {
    return TextRange.$fromStorage({
        pos: pos | 0,
        end: end | 0
    });
}
export function UndefinedTextRange(): TextRange {
    return TextRange.$fromStorage({
        pos: -1,
        end: -1
    });
}
export function CompareTextRanges(r1: TextRange, r2: TextRange): int {
    let c = TextRange.$storageOf(r1).pos - TextRange.$storageOf(r2).pos;
    if (c !== 0) {
        return c;
    }
    return TextRange.$storageOf(r1).end - TextRange.$storageOf(r2).end;
}
