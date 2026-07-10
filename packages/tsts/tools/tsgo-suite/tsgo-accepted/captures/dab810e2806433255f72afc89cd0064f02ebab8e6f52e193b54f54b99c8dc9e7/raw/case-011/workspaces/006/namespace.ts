export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}