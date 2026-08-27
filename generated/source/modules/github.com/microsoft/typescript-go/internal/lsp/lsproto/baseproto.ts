import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Reader as Reader__from_jsonrpc, Writer as Writer__from_jsonrpc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import type { $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { NewReader as NewReader__from_jsonrpc, NewWriter as NewWriter__from_jsonrpc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsonrpc/package.js";
import { GoMapHash } from "@gotots/runtime/map.js";
export class BaseReader {
    declare private readonly $goType: void;
    public constructor(public Reader: {
        value: Reader__from_jsonrpc;
    } | undefined) {
    }
    static $copy($source: BaseReader): BaseReader {
        return new BaseReader($source.Reader);
    }
    static $equal($left: BaseReader, $right: BaseReader): bool {
        return $left.Reader
            ===
                $right.Reader;
    }
    static $hash($source: BaseReader): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.Reader));
        return $hash;
    }
    declare private readonly then?: never;
}
export function NewBaseReader(r: GoInterface | undefined): {
    value: BaseReader;
} | undefined {
    return { value: new BaseReader(NewReader__from_jsonrpc(r)) };
}
export class BaseWriter {
    declare private readonly $goType: void;
    public constructor(public Writer: {
        value: Writer__from_jsonrpc;
    } | undefined) {
    }
    static $copy($source: BaseWriter): BaseWriter {
        return new BaseWriter($source.Writer);
    }
    static $equal($left: BaseWriter, $right: BaseWriter): bool {
        return $left.Writer
            ===
                $right.Writer;
    }
    static $hash($source: BaseWriter): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.Writer));
        return $hash;
    }
    declare private readonly then?: never;
}
export function NewBaseWriter(w: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined): {
    value: BaseWriter;
} | undefined {
    return { value: new BaseWriter(NewWriter__from_jsonrpc(w)) };
}
