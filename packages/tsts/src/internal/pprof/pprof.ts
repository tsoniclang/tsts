import type { GoError, GoPtr } from "../../go/compat.js";
import type { Writer } from "../../go/io.js";
import type { File } from "../../go/os.js";
import type { Mutex } from "../../go/sync.js";
import * as errors from "../../go/errors.js";
import * as fmt from "../../go/fmt.js";
import * as io from "../../go/io.js";
import * as os from "../../go/os.js";
import * as filepath from "../../go/path/filepath.js";
import * as runtime from "../../go/runtime.js";
import * as pprof from "../../go/runtime/pprof.js";
import * as time from "../../go/time.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::type::ProfileSession","kind":"type","status":"implemented","sigHash":"9c7b63f36067a4f2f8855292fabf046b03e3b4ab7ee006c3f944514a17a2b87a"}
 *
 * Go source:
 * ProfileSession struct {
 * 	cpuFilePath string
 * 	memFilePath string
 * 	cpuFile     *os.File
 * 	logWriter   io.Writer
 * }
 */
export interface ProfileSession {
  cpuFilePath: string;
  memFilePath: string;
  cpuFile: GoPtr<File>;
  logWriter: GoInterface<Writer>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::func::BeginProfiling","kind":"func","status":"implemented","sigHash":"5cc48d033d2af2d1a6d98e4a563cc825a7fefbdb6d112c0cbdda25d63ab64da3"}
 *
 * Go source:
 * func BeginProfiling(profileDir string, logWriter io.Writer) *ProfileSession {
 * 	if err := os.MkdirAll(profileDir, 0o755); err != nil {
 * 		panic(err)
 * 	}
 * 
 * 	pid := os.Getpid()
 * 
 * 	cpuProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-cpuprofile.pb.gz", pid))
 * 	memProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-memprofile.pb.gz", pid))
 * 	cpuFile, err := os.Create(cpuProfilePath)
 * 	if err != nil {
 * 		panic(err)
 * 	}
 * 
 * 	if err := pprof.StartCPUProfile(cpuFile); err != nil {
 * 		panic(err)
 * 	}
 * 
 * 	return &ProfileSession{
 * 		cpuFilePath: cpuProfilePath,
 * 		memFilePath: memProfilePath,
 * 		cpuFile:     cpuFile,
 * 		logWriter:   logWriter,
 * 	}
 * }
 */
export function BeginProfiling(profileDir: string, logWriter: GoInterface<Writer>): GoPtr<ProfileSession> {
  const mkdirErr = os.MkdirAll(profileDir, 0o755);
  if (mkdirErr !== undefined) {
    throw mkdirErr;
  }
  const pid = os.Getpid();
  const cpuProfilePath = filepath.Join(profileDir, fmt.Sprintf("%d-cpuprofile.pb.gz", pid));
  const memProfilePath = filepath.Join(profileDir, fmt.Sprintf("%d-memprofile.pb.gz", pid));
  const [cpuFile, createErr] = os.Create(cpuProfilePath);
  if (createErr !== undefined) {
    throw createErr;
  }
  const startErr = pprof.StartCPUProfile(cpuFile);
  if (startErr !== undefined) {
    throw startErr;
  }
  return {
    cpuFilePath: cpuProfilePath,
    memFilePath: memProfilePath,
    cpuFile,
    logWriter,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::method::ProfileSession.Stop","kind":"method","status":"implemented","sigHash":"383f6c1004cf555d9405f4764a856ab6f44a6242bcc29aeeecd00a70350fb664"}
 *
 * Go source:
 * func (p *ProfileSession) Stop() {
 * 	pprof.StopCPUProfile()
 * 	p.cpuFile.Close()
 * 
 * 	if p.memFilePath != "" {
 * 		memFile, err := os.Create(p.memFilePath)
 * 		if err != nil {
 * 			panic(err)
 * 		}
 * 		if err := pprof.Lookup("allocs").WriteTo(memFile, 0); err != nil {
 * 			panic(err)
 * 		}
 * 		memFile.Close()
 * 		fmt.Fprintf(p.logWriter, "Memory profile: %v\n", p.memFilePath)
 * 	}
 * 
 * 	fmt.Fprintf(p.logWriter, "CPU profile: %v\n", p.cpuFilePath)
 * }
 */
export function ProfileSession_Stop(receiver: GoPtr<ProfileSession>): void {
  const p = receiver!;
  pprof.StopCPUProfile();
  p.cpuFile!.Close();

  if (p.memFilePath !== "") {
    const [memFile, createErr] = os.Create(p.memFilePath);
    if (createErr !== undefined) {
      throw createErr;
    }
    const profile = pprof.Lookup("allocs");
    const writeErr = profile!.WriteTo(memFile, 0);
    if (writeErr !== undefined) {
      throw writeErr;
    }
    memFile.Close();
    fmt.Fprintf(p.logWriter!, "Memory profile: %v\n", p.memFilePath);
  }

  fmt.Fprintf(p.logWriter!, "CPU profile: %v\n", p.cpuFilePath);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::type::CPUProfiler","kind":"type","status":"implemented","sigHash":"b5e9b96d1ab1a8a93a70fb4f4a0c812766c25cf044a928ea95adae619be3ea71"}
 *
 * Go source:
 * CPUProfiler struct {
 * 	mu      sync.Mutex
 * 	session *ProfileSession
 * }
 */
export interface CPUProfiler {
  mu: Mutex;
  session: GoPtr<ProfileSession>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::method::CPUProfiler.StartCPUProfile","kind":"method","status":"implemented","sigHash":"447df6609174cd6825f7ed6c1a115139c435b95f80bf82617cba4ef277cb8b94"}
 *
 * Go source:
 * func (c *CPUProfiler) StartCPUProfile(profileDir string) error {
 * 	c.mu.Lock()
 * 	defer c.mu.Unlock()
 * 
 * 	if c.session != nil {
 * 		return errors.New("CPU profiling already in progress")
 * 	}
 * 
 * 	if err := os.MkdirAll(profileDir, 0o755); err != nil {
 * 		return fmt.Errorf("failed to create profile directory: %w", err)
 * 	}
 * 
 * 	cpuProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-%d-cpuprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()))
 * 	cpuFile, err := os.Create(cpuProfilePath)
 * 	if err != nil {
 * 		return fmt.Errorf("failed to create CPU profile file: %w", err)
 * 	}
 * 
 * 	if err := pprof.StartCPUProfile(cpuFile); err != nil {
 * 		cpuFile.Close()
 * 		os.Remove(cpuProfilePath)
 * 		return fmt.Errorf("failed to start CPU profile: %w", err)
 * 	}
 * 
 * 	c.session = &ProfileSession{
 * 		cpuFilePath: cpuProfilePath,
 * 		cpuFile:     cpuFile,
 * 		logWriter:   io.Discard,
 * 	}
 * 	return nil
 * }
 */
export function CPUProfiler_StartCPUProfile(receiver: GoPtr<CPUProfiler>, profileDir: string): GoError {
  const c = receiver!;
  c.mu.Lock();
  try {
    if (c.session !== undefined) {
      return errors.New("CPU profiling already in progress");
    }
    const mkdirErr = os.MkdirAll(profileDir, 0o755);
    if (mkdirErr !== undefined) {
      return fmt.Errorf("failed to create profile directory: %w", mkdirErr);
    }
    const cpuProfilePath = filepath.Join(profileDir, fmt.Sprintf("%d-%d-cpuprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()));
    const [cpuFile, createErr] = os.Create(cpuProfilePath);
    if (createErr !== undefined) {
      return fmt.Errorf("failed to create CPU profile file: %w", createErr);
    }
    const startErr = pprof.StartCPUProfile(cpuFile);
    if (startErr !== undefined) {
      cpuFile.Close();
      os.Remove(cpuProfilePath);
      return fmt.Errorf("failed to start CPU profile: %w", startErr);
    }
    c.session = {
      cpuFilePath: cpuProfilePath,
      memFilePath: "",
      cpuFile,
      logWriter: io.Discard,
    };
    return undefined;
  } finally {
    c.mu.Unlock();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::method::CPUProfiler.StopCPUProfile","kind":"method","status":"implemented","sigHash":"cfe94d64dfb7f2940a5e97ab4ed89b0744f1a785ad3176577507ff7b004b77c8"}
 *
 * Go source:
 * func (c *CPUProfiler) StopCPUProfile() (string, error) {
 * 	c.mu.Lock()
 * 	defer c.mu.Unlock()
 * 
 * 	if c.session == nil {
 * 		return "", errors.New("CPU profiling not in progress")
 * 	}
 * 
 * 	filePath := c.session.cpuFilePath
 * 	c.session.Stop()
 * 	c.session = nil
 * 
 * 	return filePath, nil
 * }
 */
export function CPUProfiler_StopCPUProfile(receiver: GoPtr<CPUProfiler>): [string, GoError] {
  const c = receiver!;
  c.mu.Lock();
  try {
    if (c.session === undefined) {
      return ["", new globalThis.Error("CPU profiling not in progress")];
    }

    const filePath = c.session!.cpuFilePath;
    ProfileSession_Stop(c.session);
    c.session = undefined;

    return [filePath, undefined];
  } finally {
    c.mu.Unlock();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::func::SaveHeapProfile","kind":"func","status":"implemented","sigHash":"7af3ded7ec3013976c6fbb4003ea19dc8fef7a0efe28eadd219d09663f664f62"}
 *
 * Go source:
 * func SaveHeapProfile(profileDir string) (string, error) {
 * 	if err := os.MkdirAll(profileDir, 0o755); err != nil {
 * 		return "", fmt.Errorf("failed to create profile directory: %w", err)
 * 	}
 * 
 * 	heapProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-%d-heapprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()))
 * 	heapFile, err := os.Create(heapProfilePath)
 * 	if err != nil {
 * 		return "", fmt.Errorf("failed to create heap profile file: %w", err)
 * 	}
 * 	defer heapFile.Close()
 * 
 * 	runtime.GC()
 * 	if err := pprof.Lookup("heap").WriteTo(heapFile, 0); err != nil {
 * 		os.Remove(heapProfilePath)
 * 		return "", fmt.Errorf("failed to write heap profile: %w", err)
 * 	}
 * 
 * 	return heapProfilePath, nil
 * }
 */
export function SaveHeapProfile(profileDir: string): [string, GoError] {
  const mkdirErr = os.MkdirAll(profileDir, 0o755);
  if (mkdirErr !== undefined) {
    return ["", fmt.Errorf("failed to create profile directory: %w", mkdirErr)];
  }
  const heapProfilePath = filepath.Join(profileDir, fmt.Sprintf("%d-%d-heapprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()));
  const [heapFile, createErr] = os.Create(heapProfilePath);
  if (createErr !== undefined) {
    return ["", fmt.Errorf("failed to create heap profile file: %w", createErr)];
  }
  try {
    runtime.GC();
    const profile = pprof.Lookup("heap");
    const writeErr = profile!.WriteTo(heapFile, 0);
    if (writeErr !== undefined) {
      os.Remove(heapProfilePath);
      return ["", fmt.Errorf("failed to write heap profile: %w", writeErr)];
    }
    return [heapProfilePath, undefined];
  } finally {
    heapFile.Close();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::func::SaveAllocProfile","kind":"func","status":"implemented","sigHash":"fda79ee314deaedb83d7f16c12eb7db9e6a3519ff818034155d286211d99b89b"}
 *
 * Go source:
 * func SaveAllocProfile(profileDir string) (string, error) {
 * 	if err := os.MkdirAll(profileDir, 0o755); err != nil {
 * 		return "", fmt.Errorf("failed to create profile directory: %w", err)
 * 	}
 * 
 * 	allocProfilePath := filepath.Join(profileDir, fmt.Sprintf("%d-%d-allocprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()))
 * 	allocFile, err := os.Create(allocProfilePath)
 * 	if err != nil {
 * 		return "", fmt.Errorf("failed to create alloc profile file: %w", err)
 * 	}
 * 	defer allocFile.Close()
 * 
 * 	if err := pprof.Lookup("allocs").WriteTo(allocFile, 0); err != nil {
 * 		os.Remove(allocProfilePath)
 * 		return "", fmt.Errorf("failed to write alloc profile: %w", err)
 * 	}
 * 
 * 	return allocProfilePath, nil
 * }
 */
export function SaveAllocProfile(profileDir: string): [string, GoError] {
  const mkdirErr = os.MkdirAll(profileDir, 0o755);
  if (mkdirErr !== undefined) {
    return ["", fmt.Errorf("failed to create profile directory: %w", mkdirErr)];
  }
  const allocProfilePath = filepath.Join(profileDir, fmt.Sprintf("%d-%d-allocprofile.pb.gz", os.Getpid(), time.Now().UnixMilli()));
  const [allocFile, createErr] = os.Create(allocProfilePath);
  if (createErr !== undefined) {
    return ["", fmt.Errorf("failed to create alloc profile file: %w", createErr)];
  }
  try {
    const profile = pprof.Lookup("allocs");
    const writeErr = profile!.WriteTo(allocFile, 0);
    if (writeErr !== undefined) {
      os.Remove(allocProfilePath);
      return ["", fmt.Errorf("failed to write alloc profile: %w", writeErr)];
    }
    return [allocProfilePath, undefined];
  } finally {
    allocFile.Close();
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/pprof/pprof.go::func::RunGC","kind":"func","status":"implemented","sigHash":"c87061599234ebdbddd59cee8389cfb6fbbfc62c8bbb8c4bbf3da9b5e2acaf99"}
 *
 * Go source:
 * func RunGC() {
 * 	runtime.GC()
 * }
 */
export function RunGC(): void {
  runtime.GC();
}
