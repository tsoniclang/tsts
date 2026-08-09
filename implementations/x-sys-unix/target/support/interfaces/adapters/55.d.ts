import type { Errno } from "@gotots/gostdlib/syscall.js";
import type { $goInterface_81c2352956c8f96f0b14 } from "../contracts/81.js";

export class $goInterfaceAdapter_559a23868120d8a3a788
  implements $goInterface_81c2352956c8f96f0b14 {
  constructor(value: Errno);
  readonly $go$type: { readonly comparable: boolean };
  readonly $go$methods: ReadonlySet<object>;
  readonly $go$formatString: boolean;
  $go$implements(contract: readonly object[]): boolean;
  $go$equal(other: $goInterface_81c2352956c8f96f0b14): boolean;
  $go$hash(): number;
  $go$format(
    verb: string,
    flags: string,
    precision: number | undefined,
  ): string;
  Error(): string;
}
