import type { int } from "../../go/scalars.js";
import { Args, Exit, Stderr } from "../../go/os.js";
import { Fprintln } from "../../go/fmt.js";
import type { Writer } from "../../go/io.js";
import { Background } from "../../go/context.js";
import { NotifyContext } from "../../go/os/signal.js";
import { SIGINT, SIGTERM } from "../../go/syscall.js";
import { ApplyDebugStackLimit } from "../../internal/core/core.js";
import { CommandLine } from "../../internal/execute/tsc.js";
import { runAPI } from "./api.js";
import { newSystem, osSys_as_tsc_System } from "./sys.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/main.go::func::main","kind":"func","status":"implemented","sigHash":"951d36fc88d8e4b47cb98a3e2fe2daad7f263004100af9df82bcd02d9da90120","bodyHash":"2f9430edbb4cdc213d44c2d06f9df841c32b3c188563b434726a94b86b9c6209"}
 * @tsgo-override {"category":"runtime-representation","allow":["body"],"reason":"Go os.Exit follows a blocking watch loop. The Node host leaves live fs watchers on the event loop and sets exitCode instead of terminating the process when CommandLine returns a watch handle."}
 *
 * Go source:
 * func main() {
 * 	os.Exit(runMain())
 * }
 */
export function main(): void {
  const [status, keepAlive] = runMainWithHostLifecycle();
  if (keepAlive) {
    process.exitCode = status;
    return;
  }
  Exit(status);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/main.go::func::runMain","kind":"func","status":"implemented","sigHash":"7a440dbeaa39ecf531185f0c253125a97b7e7dd79e07179c951f6b2809023b4f","bodyHash":"3bd2c285d68f3f611a0d3e8a32047678eb112e0fa7a7829b7cb8d2c53388610b"}
 * @tsgo-override {"category":"runtime-representation","allow":["body"],"reason":"Go defers signal cancellation after the blocking CommandLine call. Node CommandLine returns a live watch handle, so the host retains the signal context until the fs watchers close; non-watch commands preserve the exact deferred cleanup."}
 *
 * Go source:
 * func runMain() int {
 * 	core.ApplyDebugStackLimit()
 * 	args := os.Args[1:]
 * 	if len(args) > 0 {
 * 		switch args[0] {
 * 		case "--lsp":
 * 			return runLSP(args[1:])
 * 		case "--api":
 * 			return runAPI(args[1:])
 * 		}
 * 	}
 * 	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
 * 	defer stop()
 * 	result := execute.CommandLine(ctx, newSystem(), args, nil)
 * 	return int(result.Status)
 * }
 */
export function runMain(): int {
  return runMainWithHostLifecycle()[0];
}

function runMainWithHostLifecycle(): [int, boolean] {
  ApplyDebugStackLimit();
  const args = Args.slice(1);
  if (args.length > 0) {
    switch (args[0]) {
      case "--lsp":
        Fprintln(Stderr as Writer, "language service mode is outside the standalone compiler scope");
        return [1 as int, false];
      case "--api":
        return [runAPI(args.slice(1)), false];
    }
  }
  const [ctx, stop] = NotifyContext(Background(), SIGINT as NodeJS.Signals, SIGTERM as NodeJS.Signals);
  const result = CommandLine(ctx, osSys_as_tsc_System(newSystem()), args, undefined);
  const keepAlive = result.Watcher !== undefined;
  if (!keepAlive) {
    stop();
  }
  return [result.Status as int, keepAlive];
}
