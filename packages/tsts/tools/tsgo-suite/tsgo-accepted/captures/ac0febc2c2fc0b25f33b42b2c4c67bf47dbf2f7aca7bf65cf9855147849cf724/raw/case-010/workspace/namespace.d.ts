export declare namespace ns {
    namespace internal {
        class Foo {
        }
    }
    export namespace nested {
        export import inner = internal;
    }
    export {};
}
