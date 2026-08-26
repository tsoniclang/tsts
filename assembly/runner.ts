import "./program.js";
import { state as osState } from "@gotots/gostdlib/os.js";
import { main } from "./modules/github.com/microsoft/typescript-go/cmd/tsgo/main.js";

osState.Args = osState.Args.append("", ["--singleThreaded"]);
main();
