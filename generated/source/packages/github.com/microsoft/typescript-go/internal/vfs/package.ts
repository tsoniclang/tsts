import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $state } from "./state.js";
import * as fs__from_gostdlib from "@gotots/gostdlib/io/fs.js";
export function $initialize(): void {
    $state.ErrClosed = void 0;
    $state.ErrExist = void 0;
    $state.ErrInvalid = void 0;
    $state.ErrNotExist = void 0;
    $state.ErrPermission = void 0;
    $state.SkipAll = void 0;
    $state.SkipDir = void 0;
    {
        $state.ErrInvalid = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.ErrInvalid);
    }
    {
        $state.ErrPermission = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.ErrPermission);
    }
    {
        $state.ErrExist = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.ErrExist);
    }
    {
        $state.ErrNotExist = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.ErrNotExist);
    }
    {
        $state.ErrClosed = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.ErrClosed);
    }
    {
        $state.SkipAll = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipAll);
    }
    {
        $state.SkipDir = GoProviderInterfaceBridge.$from(fs__from_gostdlib.state.SkipDir);
    }
}
export { Entries, Entries$Storage, FS, FS$contract, FS$is } from "../../../../../../modules/github.com/microsoft/typescript-go/internal/vfs/vfs.js";
export { $state };
