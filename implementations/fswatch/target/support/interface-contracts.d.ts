import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { Awaitable, gostring } from "@gotots/runtime/scalars.js";

export interface $goInterface$Interface_Method_Error_void_to_string extends GoInterfaceValue {
  Error(): Awaitable<gostring>;
}
