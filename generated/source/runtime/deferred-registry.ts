import { GoInterfaceValue } from "./interface-value.js";
export class GoDeferredRegistry<Source extends object, Deferred, MethodDeferred> {
    private readonly $entries: WeakMap<Source, Deferred> = new WeakMap<Source, Deferred>;
    register(source: Source, deferred: Deferred): Source {
        this.$entries.set(source, deferred);
        return source;
    }
    resolve(source: Source | undefined): Deferred | undefined {
        if (source === undefined) {
            return undefined;
        }
        return this.$entries.get(source);
    }
    private readonly $methodEntries: Map<object, Map<object, MethodDeferred>> = new Map<object, Map<object, MethodDeferred>>;
    registerMethod(method: object, dynamicType: object, deferred: MethodDeferred): void {
        let entries: Map<object, MethodDeferred> | undefined = this.$methodEntries.get(method);
        if (entries === undefined) {
            entries = new Map<object, MethodDeferred>;
            this.$methodEntries.set(method, entries);
        }
        entries.set(dynamicType, deferred);
    }
    resolveMethod(method: object, receiver: GoInterfaceValue): MethodDeferred | undefined {
        const entries = this.$methodEntries.get(method);
        if (entries === undefined) {
            return undefined;
        }
        return entries.get(receiver.$go$type);
    }
    declare private readonly then?: never;
}
