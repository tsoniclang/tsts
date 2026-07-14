import type { bool, int } from "../../go/scalars.js";
import type { GoError, GoPtr } from "../../go/compat.js";
import { Fprintf } from "../../go/fmt.js";
import type { Writer as Writer_155142d5 } from "../../go/io.js";
import { Exit, Getenv, Getwd, Stderr, Stdout } from "../../go/os.js";
import { Now, Since } from "../../go/time.js";
import type { Duration, Time } from "../../go/time.js";
import { GetSize, IsTerminal } from "../../go/golang.org/x/term.js";
import { WrapFS, LibPath } from "../../internal/bundled/bundled.js";
import { ExitStatusInvalidProject_OutputsSkipped } from "../../internal/execute/tsc/compile.js";
import type { System } from "../../internal/execute/tsc/compile.js";
import { NormalizePath } from "../../internal/tspath/path.js";
import { FS as osvfsFS } from "../../internal/vfs/osvfs/os.js";
import type { FS as FS_12f44eda } from "../../internal/vfs/vfs.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::type::osSys","kind":"type","status":"implemented","sigHash":"e8ab6ded0a11312a928fb2891f9a2b5ce63f513343ec46009e53a2f8256e49ac"}
 *
 * Go source:
 * osSys struct {
 * 	writer             io.Writer
 * 	fs                 vfs.FS
 * 	defaultLibraryPath string
 * 	cwd                string
 * 	start              time.Time
 * }
 */
export interface osSys {
  writer: GoInterface<Writer_155142d5>;
  fs: GoInterface<FS_12f44eda>;
  defaultLibraryPath: string;
  cwd: string;
  start: Time;
}

export function osSys_as_tsc_System(receiver: GoPtr<osSys>): System {
  return {
    Writer: (): Writer_155142d5 => osSys_Writer(receiver)!,
    FS: (): FS_12f44eda => osSys_FS(receiver)!,
    DefaultLibraryPath: (): string => osSys_DefaultLibraryPath(receiver),
    GetCurrentDirectory: (): string => osSys_GetCurrentDirectory(receiver),
    WriteOutputIsTTY: (): bool => osSys_WriteOutputIsTTY(receiver),
    GetWidthOfTerminal: (): int => osSys_GetWidthOfTerminal(receiver),
    GetEnvironmentVariable: (name: string): string => osSys_GetEnvironmentVariable(receiver, name),
    Now: (): Time => osSys_Now(receiver),
    SinceStart: (): Duration => osSys_SinceStart(receiver),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.SinceStart","kind":"method","status":"implemented","sigHash":"2c3683ac4ccdad2659ca358efa3c70ab60c54cc6c00b59ada5483db4697daaac"}
 *
 * Go source:
 * func (s *osSys) SinceStart() time.Duration {
 * 	return time.Since(s.start)
 * }
 */
export function osSys_SinceStart(receiver: GoPtr<osSys>): Duration {
  return Since(receiver!.start) as Duration;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.Now","kind":"method","status":"implemented","sigHash":"2e1bae49e29a3f0846707331e529fc2a717bac7d3b8cd642c9e8e0f0c79de271"}
 *
 * Go source:
 * func (s *osSys) Now() time.Time {
 * 	return time.Now()
 * }
 */
export function osSys_Now(receiver: GoPtr<osSys>): Time {
  return Now() as Time;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.FS","kind":"method","status":"implemented","sigHash":"6c104471fb7ee2a699c8ddeadf15911d1cee7cfbcd3cef944567191ebb40750d"}
 *
 * Go source:
 * func (s *osSys) FS() vfs.FS {
 * 	return s.fs
 * }
 */
export function osSys_FS(receiver: GoPtr<osSys>): GoInterface<FS_12f44eda> {
  return receiver!.fs;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.DefaultLibraryPath","kind":"method","status":"implemented","sigHash":"7842d329f4225aaec91a2507dc42f475bbe0b5aff334ca434fbdcd191633dcba"}
 *
 * Go source:
 * func (s *osSys) DefaultLibraryPath() string {
 * 	return s.defaultLibraryPath
 * }
 */
export function osSys_DefaultLibraryPath(receiver: GoPtr<osSys>): string {
  return receiver!.defaultLibraryPath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"b7899881747dc37ddaf3d1a8ccac92da3aacaceb243e86cf62eecf36d775c082"}
 *
 * Go source:
 * func (s *osSys) GetCurrentDirectory() string {
 * 	return s.cwd
 * }
 */
export function osSys_GetCurrentDirectory(receiver: GoPtr<osSys>): string {
  return receiver!.cwd;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.Writer","kind":"method","status":"implemented","sigHash":"0df6e068ed2fbc1affed028345ed91ca760e9ba2554e349a59f848968ce427ea"}
 *
 * Go source:
 * func (s *osSys) Writer() io.Writer {
 * 	return s.writer
 * }
 */
export function osSys_Writer(receiver: GoPtr<osSys>): GoInterface<Writer_155142d5> {
  return receiver!.writer;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.WriteOutputIsTTY","kind":"method","status":"implemented","sigHash":"ba8f951d054a1905678905eeea3db9e982699804a7e70924309482a411ffd1a1"}
 *
 * Go source:
 * func (s *osSys) WriteOutputIsTTY() bool {
 * 	return term.IsTerminal(int(os.Stdout.Fd()))
 * }
 */
export function osSys_WriteOutputIsTTY(receiver: GoPtr<osSys>): bool {
  return IsTerminal(Stdout) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.GetWidthOfTerminal","kind":"method","status":"implemented","sigHash":"fd8fb4cb459cab4fd8c6133a6a154bb21007250896c3a02e2cb8258c68b570a8"}
 *
 * Go source:
 * func (s *osSys) GetWidthOfTerminal() int {
 * 	width, _, _ := term.GetSize(int(os.Stdout.Fd()))
 * 	return width
 * }
 */
export function osSys_GetWidthOfTerminal(receiver: GoPtr<osSys>): int {
  const [width] = GetSize(Stdout) as [int, int, GoError];
  return width;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::method::osSys.GetEnvironmentVariable","kind":"method","status":"implemented","sigHash":"f932d25ead4ef8ab70ce220638a0b7308308eebc7020a76338b86e0469a83e68"}
 *
 * Go source:
 * func (s *osSys) GetEnvironmentVariable(name string) string {
 * 	return os.Getenv(name)
 * }
 */
export function osSys_GetEnvironmentVariable(receiver: GoPtr<osSys>, name: string): string {
  return Getenv(name) as string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::cmd/tsgo/sys.go::func::newSystem","kind":"func","status":"implemented","sigHash":"485297466d3892136b1b48fe12a6d73a3db7acddbe9fd344ed31902139040336"}
 *
 * Go source:
 * func newSystem() *osSys {
 * 	cwd, err := os.Getwd()
 * 	if err != nil {
 * 		fmt.Fprintf(os.Stderr, "Error getting current directory: %v\n", err)
 * 		os.Exit(int(tsc.ExitStatusInvalidProject_OutputsSkipped))
 * 	}
 * 
 * 	return &osSys{
 * 		cwd:                tspath.NormalizePath(cwd),
 * 		fs:                 bundled.WrapFS(osvfs.FS()),
 * 		defaultLibraryPath: bundled.LibPath(),
 * 		writer:             os.Stdout,
 * 		start:              time.Now(),
 * 	}
 * }
 */
export function newSystem(): GoPtr<osSys> {
  const [cwd, err] = Getwd() as [string, GoError];
  if (err !== undefined) {
    Fprintf(Stderr as Writer_155142d5, "Error getting current directory: %v\n", err);
    Exit(ExitStatusInvalidProject_OutputsSkipped);
  }
  return {
    cwd: NormalizePath(cwd),
    fs: WrapFS(osvfsFS()),
    defaultLibraryPath: LibPath(),
    writer: Stdout as Writer_155142d5,
    start: Now() as Time,
  };
}
