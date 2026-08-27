export declare const $goStorageType: unique symbol;
export interface GoStoredValue<S> {
    readonly [$goStorageType]: S;
}
export type GoStorage<T> = T extends GoStoredValue<infer S> ? S : T;
export declare const $goContainerStorageType: unique symbol;
export interface GoContainerStoredValue<S> {
    readonly [$goContainerStorageType]: S;
}
export type GoContainerStorage<T> = T extends GoContainerStoredValue<infer S> ? S : T;
