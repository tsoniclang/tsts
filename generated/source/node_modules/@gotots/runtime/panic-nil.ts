import { GoInterfaceValue } from "./interface-value.js";
import { GoRuntimePanicValue } from "./panic.js";
export class GoPanicNilError {
    static readonly comparable: boolean = true;
    declare private readonly $go$panicNil: undefined;
    declare private readonly then?: never;
}
export class GoPanicNilValue extends GoRuntimePanicValue {
    private constructor(public readonly $go$value: GoPanicNilError) {
        super("panic called with nil argument");
    }
    override readonly $go$type: {
        readonly comparable: boolean;
    } = GoPanicNilError;
    static create(): GoPanicNilValue {
        return new GoPanicNilValue(new GoPanicNilError);
    }
    static $is(value: GoInterfaceValue | undefined): value is GoPanicNilValue {
        return value !== undefined && value.$go$type === GoPanicNilError;
    }
}
