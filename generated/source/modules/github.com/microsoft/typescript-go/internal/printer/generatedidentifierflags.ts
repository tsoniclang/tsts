import type { bool, int } from "@gotots/runtime/scalars.js";
export class GeneratedIdentifierFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
    HasAllowNameSubstitution(): bool {
        return !(((void GeneratedIdentifierFlags,
            this.$value &
                ((void GeneratedIdentifierFlags,
                    GeneratedIdentifierFlagsAllowNameSubstitution$int) as int)) as int)
            ===
                ((void GeneratedIdentifierFlags,
                    0) as int));
    }
    IsFileLevel(): bool {
        return !(((void GeneratedIdentifierFlags,
            this.$value &
                ((void GeneratedIdentifierFlags,
                    GeneratedIdentifierFlagsFileLevel$int) as int)) as int)
            ===
                ((void GeneratedIdentifierFlags,
                    0) as int));
    }
    IsNode(): bool {
        return this.Kind().$value ===
            ((void GeneratedIdentifierFlags,
                GeneratedIdentifierFlagsNode$int) as int);
    }
    IsOptimistic(): bool {
        return !(((void GeneratedIdentifierFlags,
            this.$value &
                ((void GeneratedIdentifierFlags,
                    GeneratedIdentifierFlagsOptimistic$int) as int)) as int)
            ===
                ((void GeneratedIdentifierFlags,
                    0) as int));
    }
    IsReservedInNestedScopes(): bool {
        return !(((void GeneratedIdentifierFlags,
            this.$value &
                ((void GeneratedIdentifierFlags,
                    GeneratedIdentifierFlagsReservedInNestedScopes$int) as int)) as int)
            ===
                ((void GeneratedIdentifierFlags,
                    0) as int));
    }
    Kind(): GeneratedIdentifierFlags {
        return new GeneratedIdentifierFlags(this.$value &
            ((void GeneratedIdentifierFlags,
                GeneratedIdentifierFlagsKindMask$int) as int));
    }
}
export const GeneratedIdentifierFlagsNone$int: int = 0;
export const GeneratedIdentifierFlagsAuto$int: int = 1;
export const GeneratedIdentifierFlagsUnique$int: int = 3;
export const GeneratedIdentifierFlagsNode$int: int = 4;
export const GeneratedIdentifierFlagsKindMask$int: int = 7;
export const GeneratedIdentifierFlagsReservedInNestedScopes$int: int = 8;
export const GeneratedIdentifierFlagsOptimistic$int: int = 16;
export const GeneratedIdentifierFlagsFileLevel$int: int = 32;
export const GeneratedIdentifierFlagsAllowNameSubstitution$int: int = 64;
