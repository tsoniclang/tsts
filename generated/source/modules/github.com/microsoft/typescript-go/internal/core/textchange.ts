import type { TextRange$Storage as TextRange__from_core$Storage } from "./text.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { TextRange } from "./text.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type TextChange$Storage = {
    TextRange: TextRange__from_core$Storage;
    NewText: gostring;
};
export class TextChange implements GoContainerStoredValue<TextChange$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: TextChange$Storage) {
    }
    public static $storageOf($source: TextChange): TextChange$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: TextChange$Storage): TextChange {
        return new TextChange($source);
    }
    public get TextRange(): TextRange {
        return TextRange.$fromStorage(this.$storage.TextRange);
    }
    public set TextRange($value: TextRange) {
        this.$storage.TextRange = TextRange.$storageOf($value);
    }
    public get NewText(): gostring {
        return this.$storage.NewText;
    }
    public set NewText($value: gostring) {
        this.$storage.NewText = $value;
    }
    declare readonly [$goContainerStorageType]: TextChange$Storage;
    static $zero(): TextChange {
        return new TextChange({
            TextRange: TextRange.$storageOf(TextRange.$zero()),
            NewText: ""
        });
    }
    static $copy($source: TextChange): TextChange {
        return new TextChange({
            TextRange: TextRange.$storageOf(TextRange.$copy(TextRange.$fromStorage($source.$storage.TextRange))),
            NewText: $source.$storage.NewText
        });
    }
    static $equal($left: TextChange, $right: TextChange): bool {
        return TextRange.$equal(TextRange.$fromStorage($left.$storage.TextRange), TextRange.$fromStorage($right.$storage.TextRange)) && $left.$storage.NewText === $right.$storage.NewText;
    }
    static $hash($source: TextChange): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, TextRange.$hash(TextRange.$fromStorage($source.$storage.TextRange)));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.NewText));
        return $hash;
    }
    declare private readonly then?: never;
    ApplyTo(text: gostring): gostring {
        return goStringSlice(text, 0, this.TextRange.Pos()) + this.NewText + goStringSlice(text, this.TextRange.End());
    }
}
export function ApplyBulkEdits(text: gostring, edits: RuntimeSlice<TextChange$Storage>): gostring {
    const __gotots_struct_0 = named_strings.StringsBuilderOperations.$zero();
    let b = __gotots_struct_0;
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(text.length)));
    let lastEnd = 0;
    const __gotots_range_0 = edits;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = TextChange.$copy(TextChange.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
        let e = __gotots_range_value_0;
        let start = TextRange.$fromStorage(TextChange.$storageOf(e).TextRange).Pos();
        if (start !== lastEnd) {
            strings__from_gostdlib.Builder.WriteString(b, goStringSlice(text, lastEnd, TextRange.$fromStorage(TextChange.$storageOf(e).TextRange).Pos()));
        }
        strings__from_gostdlib.Builder.WriteString(b, TextChange.$storageOf(e).NewText);
        lastEnd = TextRange.$fromStorage(TextChange.$storageOf(e).TextRange).End();
    }
    strings__from_gostdlib.Builder.WriteString(b, goStringSlice(text, lastEnd));
    return strings__from_gostdlib.Builder.String(b);
}
