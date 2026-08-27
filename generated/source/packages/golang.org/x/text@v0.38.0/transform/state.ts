import type { SpanningTransformer, Transformer } from "../../../../../modules/golang.org/x/text@v0.38.0/transform/transform.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
export class $PackageState {
    declare Discard: Transformer | undefined;
    declare ErrEndOfSpan: GoInterface | undefined;
    declare ErrShortDst: GoInterface | undefined;
    declare ErrShortSrc: GoInterface | undefined;
    declare Nop: SpanningTransformer | undefined;
    declare errInconsistentByteCount: GoInterface | undefined;
    declare errShortInternal: GoInterface | undefined;
    declare private readonly then?: never;
}
export const $state = new $PackageState();
