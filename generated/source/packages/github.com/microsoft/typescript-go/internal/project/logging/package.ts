import { $state } from "./state.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
export function $initialize(): void {
    $state.seq = named_sync_atomic.SyncAtomicUint64Operations.$zero();
    {
        void 0;
    }
    {
        void 0;
    }
}
export { Logger, Logger$contract, Logger$is, NewNopLogger } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/logging/logger.js";
export { LogTree, NewLogTree } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/logging/logtree.js";
