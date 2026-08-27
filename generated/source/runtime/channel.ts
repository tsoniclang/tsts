import { GoPanic } from "./panic.js";
export interface GoSelectCase {
    ready(): boolean;
    commit(): boolean | object;
}
export interface GoReceiveChannel<T> {
    $length(): number;
    $capacity(): number;
    receive(): [
        T,
        boolean
    ];
    $selectReceive(accept: (value: T, ok: boolean) => void): GoSelectCase;
    $observeClose(observer: () => void): () => void;
}
export interface GoSendChannel<T> {
    $length(): number;
    $capacity(): number;
    send(value: T): void;
    close(): void;
    $selectSend(value: T): GoSelectCase;
}
export class GoChannel<T> implements GoReceiveChannel<T>, GoSendChannel<T> {
    private constructor(private readonly capacity: number, private readonly zero: () => T, private readonly copy: (value: T) => T) {
    }
    static make<T>(capacity: number | bigint, zero: () => T, copy: (value: T) => T): GoChannel<T> {
        const numericCapacity: number = globalThis.Number(capacity);
        if (!globalThis.Number.isSafeInteger(numericCapacity) || numericCapacity < 0) {
            GoPanic.raiseRuntime("makechan: size out of range");
        }
        return new GoChannel<T>(numericCapacity, zero, copy);
    }
    static send<T>(channel: GoSendChannel<T> | undefined, value: T): void {
        if (channel === undefined) {
            GoPanic.raiseRuntime("serial channel send would block");
        }
        channel.send(value);
    }
    static receive<T>(channel: GoReceiveChannel<T> | undefined): [
        T,
        boolean
    ] {
        if (channel === undefined) {
            GoPanic.raiseRuntime("serial channel receive would block");
        }
        return channel.receive();
    }
    static close<T>(channel: GoSendChannel<T> | undefined): void {
        if (channel === undefined) {
            GoPanic.raiseRuntime("close of nil channel");
        }
        channel.close();
    }
    static length<T>(channel: GoReceiveChannel<T> | GoSendChannel<T> | undefined): number {
        if (channel === undefined) {
            return 0;
        }
        return channel.$length();
    }
    static capacity<T>(channel: GoReceiveChannel<T> | GoSendChannel<T> | undefined): number {
        if (channel === undefined) {
            return 0;
        }
        return channel.$capacity();
    }
    static $selectSend<T>(channel: GoSendChannel<T> | undefined, value: T): GoSelectCase {
        if (channel === undefined) {
            return {
                ready: (): boolean => false,
                commit: (): boolean => false
            };
        }
        return channel.$selectSend(value);
    }
    static $selectReceive<T>(channel: GoReceiveChannel<T> | undefined, accept: (value: T, ok: boolean) => void): GoSelectCase {
        if (channel === undefined) {
            return {
                ready: (): boolean => false,
                commit: (): boolean => false
            };
        }
        return channel.$selectReceive(accept);
    }
    private buffer: T[] = [];
    private bufferHead: number = 0;
    private closed: boolean = false;
    private closeObservers: Set<() => void> = new Set<() => void>;
    private sendReady(): boolean {
        return this.closed || this.buffer.length - this.bufferHead < this.capacity;
    }
    private receiveReady(): boolean {
        return this.buffer.length - this.bufferHead > 0 || this.closed;
    }
    $length(): number {
        return this.buffer.length - this.bufferHead;
    }
    $capacity(): number {
        return this.capacity;
    }
    private commitPreparedSend(value: T): boolean {
        if (this.closed) {
            GoPanic.raiseRuntime("send on closed channel");
        }
        if (this.buffer.length - this.bufferHead < this.capacity) {
            this.buffer.push(value);
            return true;
        }
        return false;
    }
    private takeReceive(): [
        T,
        boolean
    ] | undefined {
        if (this.buffer.length - this.bufferHead > 0) {
            const value: T = (this.bufferHead in this.buffer ? this.buffer[this.bufferHead] : GoPanic.raiseRuntime("dense storage index is absent")) as T;
            this.bufferHead = this.bufferHead + 1;
            this.compactBuffer();
            return [value, true];
        }
        if (this.closed) {
            return [this.zero(), false];
        }
        return undefined;
    }
    send(value: T): void {
        const prepared: T = this.copy(value);
        if (!this.commitPreparedSend(prepared)) {
            GoPanic.raiseRuntime("serial channel send would block");
        }
    }
    receive(): [
        T,
        boolean
    ] {
        const immediate: [
            T,
            boolean
        ] | undefined = this.takeReceive();
        if (immediate === undefined) {
            GoPanic.raiseRuntime("serial channel receive would block");
        }
        return immediate;
    }
    close(): void {
        if (this.closed) {
            GoPanic.raiseRuntime("close of closed channel");
        }
        this.closed = true;
        for (const observer of this.closeObservers) {
            observer();
        }
        this.closeObservers.clear();
    }
    $observeClose(observer: () => void): () => void {
        if (this.closed) {
            observer();
            return (): void => undefined;
        }
        this.closeObservers.add(observer);
        return (): void => {
            this.closeObservers.delete(observer);
        };
    }
    private commitSelectSend(value: T): boolean | object {
        if (this.closed) {
            return GoPanic.createRuntime("send on closed channel");
        }
        return this.commitPreparedSend(value);
    }
    $selectSend(value: T): GoSelectCase {
        const prepared: T = this.copy(value);
        return {
            ready: (): boolean => this.sendReady(),
            commit: (): boolean | object => this.commitSelectSend(prepared)
        };
    }
    $selectReceive(accept: (value: T, ok: boolean) => void): GoSelectCase {
        return {
            ready: (): boolean => this.receiveReady(),
            commit: (): boolean => {
                const result: [
                    T,
                    boolean
                ] | undefined = this.takeReceive();
                if (result === undefined) {
                    return false;
                }
                accept(result[0], result[1]);
                return true;
            }
        };
    }
    private compactBuffer(): void {
        if (this.bufferHead === this.buffer.length) {
            this.buffer = [];
            this.bufferHead = 0;
            return;
        }
        if (this.bufferHead >= 64 && this.bufferHead * 2 >= this.buffer.length) {
            this.buffer = this.buffer.slice(this.bufferHead);
            this.bufferHead = 0;
        }
    }
    declare private readonly then?: never;
}
export function goSelectAttempt(cases: GoSelectCase[]): [
    number,
    object | undefined
] | undefined {
    const ready: number[] = [];
    for (let index: number = 0; index < cases.length; index = index + 1) {
        if (((index in cases ? cases[index] : GoPanic.raiseRuntime("dense storage index is absent")) as GoSelectCase).ready()) {
            ready.push(index);
        }
    }
    if (ready.length === 0) {
        return undefined;
    }
    const readyIndex: number = Math.floor(Math.random() * ready.length);
    const selectedIndex: number = (readyIndex in ready ? ready[readyIndex] : GoPanic.raiseRuntime("dense storage index is absent")) as number;
    const outcome: boolean | object = ((selectedIndex in cases ? cases[selectedIndex] : GoPanic.raiseRuntime("dense storage index is absent")) as GoSelectCase).commit();
    if (outcome === false) {
        return undefined;
    }
    const failure: object | undefined = outcome === true ? undefined : outcome;
    return [selectedIndex, failure];
}
export function goSelectReady(cases: GoSelectCase[]): number | undefined {
    const attempt: [
        number,
        object | undefined
    ] | undefined = goSelectAttempt(cases);
    if (attempt === undefined) {
        return undefined;
    }
    const failure: object | undefined = attempt[1];
    if (failure !== undefined) {
        GoPanic.rethrow(failure);
    }
    return attempt[0];
}
export function goSelect(cases: GoSelectCase[]): number {
    const immediate: number | undefined = goSelectReady(cases);
    if (immediate === undefined) {
        GoPanic.raiseRuntime("serial select would block");
    }
    return immediate;
}
