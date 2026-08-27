export abstract class GoInterfaceValue {
    abstract readonly $go$type: {
        readonly comparable: boolean;
    };
    abstract readonly $go$methods: ReadonlySet<object>;
    abstract $go$implements(contract: readonly object[]): boolean;
    abstract $go$equal(other: GoInterfaceValue): boolean;
    abstract $go$hash(): number;
    abstract readonly $go$formatString: boolean;
    abstract $go$format(verb: string, flags: string, precision: number | undefined): string;
    declare private readonly then?: never;
}
export const GoErrorMethodToken: object = Object.freeze({});
export const GoRuntimeErrorMethodToken: object = Object.freeze({});
export interface GoError extends GoInterfaceValue {
    Error(): string;
}
export abstract class GoProviderInterfaceBridge<T extends GoInterfaceValue> extends GoInterfaceValue {
    protected readonly $go$value: T;
    readonly $go$type: {
        readonly comparable: boolean;
    };
    readonly $go$methods: ReadonlySet<object>;
    readonly $go$formatString: boolean;
    constructor($go$value: T, methods: readonly object[]) {
        super();
        this.$go$value = $go$value;
        this.$go$type = this.$go$value.$go$type;
        this.$go$formatString = this.$go$value.$go$formatString;
        this.$go$methods = new Set<object>(methods);
    }
    $go$implements(contract: readonly object[]): boolean {
        return contract.every((token: object): boolean => this.$go$methods.has(token));
    }
    $go$equal(other: GoInterfaceValue): boolean {
        return other instanceof GoProviderInterfaceBridge && this.$go$value.$go$equal(other.$go$value);
    }
    $go$hash(): number {
        return this.$go$value.$go$hash();
    }
    $go$format(verb: string, flags: string, precision: number | undefined): string {
        return this.$go$value.$go$format(verb, flags, precision);
    }
}
export function createGoInterfaceAdapter<T>(dynamicType: {
    readonly comparable: boolean;
}, equal: (left: T, right: T) => boolean, hash: (value: T) => number, formatString: boolean, format: (value: T, verb: string, flags: string, precision: number | undefined) => string): {
    new ($go$value: T): GoInterfaceValue & {
        readonly $go$value: T;
    };
    $is(value: GoInterfaceValue | undefined): value is GoInterfaceValue & {
        readonly $go$value: T;
    };
} {
    return class Adapter extends GoInterfaceValue {
        private static readonly $go$emptyAdapterMethods: ReadonlySet<object> = new Set<object>;
        constructor(public readonly $go$value: T) {
            super();
        }
        readonly $go$type: {
            readonly comparable: boolean;
        } = dynamicType;
        static $is(value: GoInterfaceValue | undefined): value is Adapter {
            return value !== undefined && value.$go$type === dynamicType;
        }
        readonly $go$methods: ReadonlySet<object> = Adapter.$go$emptyAdapterMethods;
        $go$implements(contract: readonly object[]): boolean {
            return contract.every((token: object): boolean => this.$go$methods.has(token));
        }
        $go$equal(other: GoInterfaceValue): boolean {
            return Adapter.$is(other) && equal(this.$go$value, other.$go$value);
        }
        $go$hash(): number {
            return hash(this.$go$value);
        }
        readonly $go$formatString: boolean = formatString;
        $go$format(verb: string, flags: string, precision: number | undefined): string {
            return format(this.$go$value, verb, flags, precision);
        }
    };
}
