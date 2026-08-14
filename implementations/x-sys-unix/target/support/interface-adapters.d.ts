import type { Errno } from "@gotots/gostdlib/syscall.js";
import type {
  $goInterface$Interface_Method_Error_void_to_string as GoInterface,
} from "./interface-contracts.js";

export class $goInterfaceAdapter$Named_syscall$Errno implements GoInterface {
  constructor(value: Errno);
  readonly $go$type: { readonly comparable: boolean };
  readonly $go$methods: ReadonlySet<object>;
  readonly $go$formatString: boolean;
  $go$implements(contract: readonly object[]): boolean;
  $go$equal(other: GoInterface): boolean;
  $go$hash(): number;
  $go$format(
    verb: string,
    flags: string,
    precision: number | undefined,
  ): string;
  Error(): string;
}
