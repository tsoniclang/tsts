package main

import (
	"crypto/sha256"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"go/build"
	"hash"
	"io"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sort"
	"strings"
	"sync"
	"syscall"
	"unicode/utf8"
)

type semanticToolchainContract struct {
	executable           string
	executableHash       string
	goVersion            string
	goRoot               string
	goRootSeal           goToolchainRootSeal
	hostOS               string
	hostArch             string
	compiler             string
	architectureDefaults map[string]string
	releaseTags          []string
	baseEnvironment      []string
}

var semanticToolchainOnce sync.Once
var semanticToolchainValue semanticToolchainContract

func semanticEnvironment(profile semanticBuildProfile) []string {
	toolchain := exactSemanticToolchain()
	environment := append([]string{}, toolchain.baseEnvironment...)
	environment = append(environment, semanticEnvironmentOverrides(profile)...)
	sort.Strings(environment)
	return environment
}

func semanticEnvironmentOverrides(profile semanticBuildProfile) []string {
	toolchain := exactSemanticToolchain()
	if profile.CgoEnabled {
		fatalf("declaration-only profiles cannot enable cgo")
	}
	output := []string{
		"CGO_ENABLED=0",
		"GOARCH=" + profile.GOARCH,
		"GOEXPERIMENT=" + profile.ExperimentSetting,
		"GOOS=" + profile.GOOS,
	}
	output = append(output, "PATH="+filepath.Join(toolchain.goRoot, "bin"))
	for _, name := range semanticArchitectureVariables() {
		value := toolchain.architectureDefaults[name]
		if name == semanticArchitectureVariable(profile.GOARCH) && profile.ArchitectureValue != "" {
			value = profile.ArchitectureValue
		}
		output = append(output, name+"="+value)
	}
	sort.Strings(output)
	return output
}

func exactSemanticToolchain() semanticToolchainContract {
	semanticToolchainOnce.Do(func() {
		goRoot, err := filepath.EvalSymlinks(filepath.Clean(runtime.GOROOT()))
		if err != nil {
			fatalf("resolve exact Go runtime GOROOT: %v", err)
		}
		executableName := "go"
		if runtime.GOOS == "windows" {
			executableName += ".exe"
		}
		executable := filepath.Join(goRoot, "bin", executableName)
		executableBytes, err := os.ReadFile(executable)
		if err != nil {
			fatalf("read exact Go executable %s: %v", executable, err)
		}
		resolved, err := exec.LookPath("go")
		if err != nil {
			fatalf("resolve Go executable used by go/packages: %v", err)
		}
		if !sameExecutablePath(executable, resolved) {
			fatalf("go/packages would use %s, but the extractor runtime requires exact toolchain %s; put the runtime GOROOT/bin first on PATH", resolved, executable)
		}
		queryEnvironment := []string{
			"GOENV=off", "GOEXPERIMENT=", "GOFLAGS=", "GOTOOLCHAIN=local", "GOWORK=off",
			"HOME=" + os.Getenv("HOME"), "PATH=" + os.Getenv("PATH"),
		}
		values := queryExactGoEnvironment(executable, queryEnvironment, semanticToolchainEnvironmentKeys())
		if values["GOVERSION"] != runtime.Version() {
			fatalf("Go executable/runtime version mismatch: executable=%s runtime=%s", values["GOVERSION"], runtime.Version())
		}
		if !sameExecutablePath(values["GOROOT"], goRoot) {
			fatalf("Go executable/runtime GOROOT mismatch: executable=%s runtime=%s", values["GOROOT"], goRoot)
		}
		if values["GOHOSTOS"] != runtime.GOOS || values["GOHOSTARCH"] != runtime.GOARCH {
			fatalf("Go executable/runtime host mismatch: executable=%s/%s runtime=%s/%s", values["GOHOSTOS"], values["GOHOSTARCH"], runtime.GOOS, runtime.GOARCH)
		}
		if runtime.Compiler != "gc" {
			fatalf("unsupported Go compiler %q; Porter semantic extraction requires exact gc semantics", runtime.Compiler)
		}
		goRootSeal, err := hashGoToolchainRoot(goRoot)
		if err != nil {
			fatalf("hash exact Go GOROOT %s: %v", goRoot, err)
		}
		architectureDefaults := map[string]string{}
		for _, setting := range semanticArchitectureDefaultQueries() {
			environment := append(append([]string{}, queryEnvironment...), "GOARCH="+setting.goarch)
			architectureDefaults[setting.name] = queryExactGoEnvironment(executable, environment, []string{setting.name})[setting.name]
		}
		releaseTags := append([]string{}, build.Default.ReleaseTags...)
		sort.Strings(releaseTags)
		baseEnvironment := []string{
			"GO111MODULE=on", "GOAUTH=off", "GOBIN=", "GOCACHE=" + values["GOCACHE"], "GOCACHEPROG=", "GODEBUG=",
			"GOENV=off", "GOFIPS140=off", "GOFLAGS=", "GOINSECURE=",
			"GOMODCACHE=" + values["GOMODCACHE"], "GONOPROXY=", "GONOSUMDB=", "GOPACKAGESDRIVER=off",
			"GOPATH=" + values["GOPATH"], "GOPRIVATE=", "GOPROXY=off", "GOSUMDB=off",
			"GOROOT=" + goRoot, "GOTMPDIR=", "GOTOOLCHAIN=local", "GOVCS=off", "GOWORK=off",
		}
		sort.Strings(baseEnvironment)
		semanticToolchainValue = semanticToolchainContract{
			executable: executable, executableHash: hashBytes(executableBytes), goVersion: values["GOVERSION"], goRoot: goRoot, goRootSeal: goRootSeal,
			hostOS: values["GOHOSTOS"], hostArch: values["GOHOSTARCH"], compiler: runtime.Compiler,
			architectureDefaults: architectureDefaults, releaseTags: releaseTags, baseEnvironment: baseEnvironment,
		}
	})
	return semanticToolchainValue
}

const goToolchainRootHashDomain = "tsts-porter-goroot-tree-v1\x00"

type goToolchainRootSeal struct {
	Contract       string
	SHA256         string
	EntryCount     int
	FileCount      int
	DirectoryCount int
	SymlinkCount   int
	Bytes          int64
}

type goToolchainRootEntry struct {
	absolute   string
	relative   string
	kind       byte
	mode       uint32
	info       fs.FileInfo
	linkTarget []byte
}

type goToolchainRootInventory struct {
	rootInfo fs.FileInfo
	rootMode uint32
	entries  []goToolchainRootEntry
}

func hashGoToolchainRoot(root string) (goToolchainRootSeal, error) {
	before, err := inventoryGoToolchainRoot(root)
	if err != nil {
		return goToolchainRootSeal{}, err
	}
	digest := sha256.New()
	digest.Write([]byte(goToolchainRootHashDomain))
	writeGoToolchainUint32(digest, before.rootMode)
	writeGoToolchainUint64(digest, uint64(len(before.entries)))
	seal := goToolchainRootSeal{Contract: strings.TrimSuffix(goToolchainRootHashDomain, "\x00"), EntryCount: len(before.entries)}
	for _, entry := range before.entries {
		digest.Write([]byte{entry.kind})
		writeGoToolchainBytes(digest, []byte(entry.relative))
		writeGoToolchainUint32(digest, entry.mode)
		switch entry.kind {
		case 'D':
			seal.DirectoryCount++
			writeGoToolchainUint64(digest, 0)
		case 'L':
			seal.SymlinkCount++
			writeGoToolchainBytes(digest, entry.linkTarget)
		case 'F':
			seal.FileCount++
			if entry.info.Size() < 0 || seal.Bytes > int64(^uint64(0)>>1)-entry.info.Size() {
				return goToolchainRootSeal{}, fmt.Errorf("Go GOROOT byte count overflow at %q", entry.relative)
			}
			seal.Bytes += entry.info.Size()
			if err := hashStableGoToolchainFile(digest, entry); err != nil {
				return goToolchainRootSeal{}, err
			}
		default:
			return goToolchainRootSeal{}, fmt.Errorf("unknown Go GOROOT entry kind %q", entry.kind)
		}
	}
	after, err := inventoryGoToolchainRoot(root)
	if err != nil {
		return goToolchainRootSeal{}, err
	}
	if err := compareGoToolchainInventories(before, after); err != nil {
		return goToolchainRootSeal{}, err
	}
	seal.SHA256 = fmt.Sprintf("%x", digest.Sum(nil))
	return seal, nil
}

func inventoryGoToolchainRoot(root string) (goToolchainRootInventory, error) {
	rootInfo, err := os.Lstat(root)
	if err != nil {
		return goToolchainRootInventory{}, err
	}
	if !rootInfo.IsDir() || rootInfo.Mode()&os.ModeSymlink != 0 {
		return goToolchainRootInventory{}, fmt.Errorf("Go GOROOT must be a real directory")
	}
	rootMode, err := goToolchainPermissionMode(rootInfo, ".")
	if err != nil {
		return goToolchainRootInventory{}, err
	}
	entries := []goToolchainRootEntry{}
	err = filepath.WalkDir(root, func(absolute string, directoryEntry fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if absolute == root {
			return nil
		}
		relative, err := filepath.Rel(root, absolute)
		if err != nil {
			return err
		}
		relative, err = canonicalGoToolchainRelativePath(relative)
		if err != nil {
			return err
		}
		info, err := os.Lstat(absolute)
		if err != nil {
			return err
		}
		mode, err := goToolchainPermissionMode(info, relative)
		if err != nil {
			return err
		}
		entry := goToolchainRootEntry{absolute: absolute, relative: relative, mode: mode, info: info}
		switch {
		case info.IsDir():
			entry.kind = 'D'
		case info.Mode().IsRegular():
			entry.kind = 'F'
		case info.Mode()&os.ModeSymlink != 0:
			entry.kind = 'L'
			entry.mode = 0
			target, err := os.Readlink(absolute)
			if err != nil {
				return err
			}
			if err := requireContainedGoToolchainSymlink(root, absolute, relative); err != nil {
				return err
			}
			entry.linkTarget = []byte(target)
		default:
			return fmt.Errorf("unsupported file kind in Go GOROOT at %q", relative)
		}
		entries = append(entries, entry)
		return nil
	})
	if err != nil {
		return goToolchainRootInventory{}, err
	}
	sort.Slice(entries, func(left int, right int) bool { return entries[left].relative < entries[right].relative })
	return goToolchainRootInventory{rootInfo: rootInfo, rootMode: rootMode, entries: entries}, nil
}

func hashStableGoToolchainFile(digest hash.Hash, entry goToolchainRootEntry) error {
	file, err := os.Open(entry.absolute)
	if err != nil {
		return err
	}
	defer file.Close()
	opened, err := file.Stat()
	if err != nil {
		return err
	}
	if err := requireStableGoToolchainInfo(entry.info, opened, entry.relative); err != nil {
		return err
	}
	if opened.Size() < 0 {
		return fmt.Errorf("Go GOROOT file %q has a negative size", entry.relative)
	}
	writeGoToolchainUint64(digest, uint64(opened.Size()))
	written, err := io.CopyN(digest, file, opened.Size())
	if err != nil || written != opened.Size() {
		return fmt.Errorf("read Go GOROOT file %q: copied %d of %d bytes: %w", entry.relative, written, opened.Size(), err)
	}
	probe := []byte{0}
	count, probeErr := file.Read(probe)
	if count != 0 || probeErr != io.EOF {
		return fmt.Errorf("Go GOROOT file %q grew while hashing", entry.relative)
	}
	finalInfo, err := file.Stat()
	if err != nil {
		return err
	}
	if err := requireStableGoToolchainInfo(opened, finalInfo, entry.relative); err != nil {
		return err
	}
	pathInfo, err := os.Lstat(entry.absolute)
	if err != nil {
		return err
	}
	return requireStableGoToolchainInfo(finalInfo, pathInfo, entry.relative)
}

func compareGoToolchainInventories(before goToolchainRootInventory, after goToolchainRootInventory) error {
	if before.rootMode != after.rootMode {
		return fmt.Errorf("Go GOROOT mode changed while hashing")
	}
	if err := requireStableGoToolchainInfo(before.rootInfo, after.rootInfo, "."); err != nil {
		return err
	}
	if len(before.entries) != len(after.entries) {
		return fmt.Errorf("Go GOROOT entry set changed while hashing")
	}
	for index := range before.entries {
		left := before.entries[index]
		right := after.entries[index]
		if left.relative != right.relative || left.kind != right.kind || left.mode != right.mode || string(left.linkTarget) != string(right.linkTarget) {
			return fmt.Errorf("Go GOROOT entry changed while hashing at %q", left.relative)
		}
		if err := requireStableGoToolchainInfo(left.info, right.info, left.relative); err != nil {
			return err
		}
	}
	return nil
}

func requireStableGoToolchainInfo(before fs.FileInfo, after fs.FileInfo, relative string) error {
	beforeState, err := goToolchainStabilityState(before)
	if err != nil {
		return fmt.Errorf("read initial Go GOROOT metadata for %q: %w", relative, err)
	}
	afterState, err := goToolchainStabilityState(after)
	if err != nil {
		return fmt.Errorf("read final Go GOROOT metadata for %q: %w", relative, err)
	}
	if !os.SameFile(before, after) || beforeState != afterState {
		return fmt.Errorf("Go GOROOT entry %q changed while hashing", relative)
	}
	return nil
}

type goToolchainStableState struct {
	device, inode, mode, links, user, group, deviceType uint64
	size, modifiedSeconds, modifiedNanoseconds          int64
	changedSeconds, changedNanoseconds                  int64
}

func goToolchainStabilityState(info fs.FileInfo) (goToolchainStableState, error) {
	stat, ok := info.Sys().(*syscall.Stat_t)
	if !ok {
		return goToolchainStableState{}, fmt.Errorf("expected Linux syscall.Stat_t, got %T", info.Sys())
	}
	return goToolchainStableState{
		device: uint64(stat.Dev), inode: stat.Ino, mode: uint64(stat.Mode), links: uint64(stat.Nlink),
		user: uint64(stat.Uid), group: uint64(stat.Gid), deviceType: uint64(stat.Rdev), size: stat.Size,
		modifiedSeconds: stat.Mtim.Sec, modifiedNanoseconds: stat.Mtim.Nsec,
		changedSeconds: stat.Ctim.Sec, changedNanoseconds: stat.Ctim.Nsec,
	}, nil
}

func goToolchainPermissionMode(info fs.FileInfo, relative string) (uint32, error) {
	if info.Mode()&(os.ModeSetuid|os.ModeSetgid|os.ModeSticky) != 0 {
		return 0, fmt.Errorf("Go GOROOT entry %q uses unsupported special mode bits", relative)
	}
	return uint32(info.Mode().Perm()), nil
}

func canonicalGoToolchainRelativePath(relative string) (string, error) {
	if !utf8.ValidString(relative) || strings.Contains(relative, "\\") {
		return "", fmt.Errorf("Go GOROOT path is not canonical UTF-8: %q", relative)
	}
	normalized := filepath.ToSlash(relative)
	if normalized == "" || normalized == "." || normalized == ".." || strings.HasPrefix(normalized, "../") {
		return "", fmt.Errorf("Go GOROOT path is not a normalized relative path: %q", relative)
	}
	for _, component := range strings.Split(normalized, "/") {
		if component == "" || component == "." || component == ".." {
			return "", fmt.Errorf("Go GOROOT path has a noncanonical component: %q", relative)
		}
	}
	return normalized, nil
}

func requireContainedGoToolchainSymlink(root string, absolute string, relative string) error {
	resolved, err := filepath.EvalSymlinks(absolute)
	if err != nil {
		return fmt.Errorf("resolve Go GOROOT symlink %q: %w", relative, err)
	}
	relation, err := filepath.Rel(root, resolved)
	if err != nil || relation == ".." || strings.HasPrefix(relation, ".."+string(filepath.Separator)) || filepath.IsAbs(relation) {
		return fmt.Errorf("Go GOROOT symlink %q resolves outside the pinned root", relative)
	}
	return nil
}

func writeGoToolchainBytes(digest hash.Hash, value []byte) {
	writeGoToolchainUint64(digest, uint64(len(value)))
	digest.Write(value)
}

func writeGoToolchainUint32(digest hash.Hash, value uint32) {
	buffer := [4]byte{}
	binary.BigEndian.PutUint32(buffer[:], value)
	digest.Write(buffer[:])
}

func writeGoToolchainUint64(digest hash.Hash, value uint64) {
	buffer := [8]byte{}
	binary.BigEndian.PutUint64(buffer[:], value)
	digest.Write(buffer[:])
}

var semanticExperimentMu sync.Mutex
var semanticExperimentsByTarget = map[string]semanticExperimentQueryResult{}

type semanticExperimentQueryResult struct {
	tags []string
	err  string
}

func semanticExperimentTags(profile semanticBuildProfile) []string {
	if profile.ExperimentTags != nil {
		return append([]string{}, profile.ExperimentTags...)
	}
	result := querySemanticExperimentTags(profile)
	if result.err != "" {
		fatalf("query exact Go experiments for %s/%s with GOEXPERIMENT=%q: %s", profile.GOOS, profile.GOARCH, profile.ExperimentSetting, result.err)
	}
	return append([]string{}, result.tags...)
}

func querySemanticExperimentTags(profile semanticBuildProfile) semanticExperimentQueryResult {
	key := profile.GOOS + "/" + profile.GOARCH + ":" + profile.ExperimentSetting
	semanticExperimentMu.Lock()
	if cached, ok := semanticExperimentsByTarget[key]; ok {
		semanticExperimentMu.Unlock()
		return semanticExperimentQueryResult{tags: append([]string{}, cached.tags...), err: cached.err}
	}
	semanticExperimentMu.Unlock()
	toolchain := exactSemanticToolchain()
	tags, err := queryExactExperimentTags(toolchain.executable, semanticEnvironment(profile))
	result := semanticExperimentQueryResult{tags: tags}
	if err != nil {
		result.err = err.Error()
	}
	semanticExperimentMu.Lock()
	semanticExperimentsByTarget[key] = semanticExperimentQueryResult{tags: append([]string{}, result.tags...), err: result.err}
	semanticExperimentMu.Unlock()
	return result
}

func semanticExperimentNames(profile semanticBuildProfile) []string {
	tags := semanticExperimentTags(profile)
	names := make([]string, len(tags))
	for index, tag := range tags {
		names[index] = strings.TrimPrefix(tag, "goexperiment.")
	}
	return names
}

func queryExactExperimentTags(executable string, environment []string) ([]string, error) {
	command := exec.Command(executable, "list", "-json", "internal/goexperiment")
	command.Env = environment
	output, err := command.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("exact toolchain rejected experiment state: %v: %s", err, strings.TrimSpace(string(output)))
	}
	metadata := struct {
		GoFiles []string
	}{}
	if err := json.Unmarshal(output, &metadata); err != nil {
		return nil, fmt.Errorf("decode exact Go experiments: %w", err)
	}
	tags := []string{}
	for _, filename := range metadata.GoFiles {
		if strings.HasPrefix(filename, "exp_") && strings.HasSuffix(filename, "_on.go") {
			name := strings.TrimSuffix(strings.TrimPrefix(filename, "exp_"), "_on.go")
			if name == "" {
				return nil, fmt.Errorf("exact Go experiment file has an empty name: %s", filename)
			}
			tags = append(tags, "goexperiment."+name)
		}
	}
	return uniqueSortedStrings(tags), nil
}

func queryExactGoEnvironment(executable string, environment []string, keys []string) map[string]string {
	arguments := append([]string{"env", "-json"}, keys...)
	command := exec.Command(executable, arguments...)
	command.Env = environment
	output, err := command.CombinedOutput()
	if err != nil {
		fatalf("query exact Go toolchain %s: %v\n%s", executable, err, output)
	}
	values := map[string]string{}
	if err := json.Unmarshal(output, &values); err != nil {
		fatalf("decode exact Go toolchain environment: %v", err)
	}
	for _, key := range keys {
		if _, ok := values[key]; !ok {
			fatalf("exact Go toolchain environment omitted requested key %s", key)
		}
	}
	return values
}

func semanticToolchainEnvironmentKeys() []string {
	return []string{
		"GOCACHE", "GOMODCACHE", "GOPATH", "GOROOT", "GOVERSION", "GOHOSTOS", "GOHOSTARCH",
	}
}

type semanticArchitectureDefaultQuery struct {
	name   string
	goarch string
}

func semanticArchitectureDefaultQueries() []semanticArchitectureDefaultQuery {
	return []semanticArchitectureDefaultQuery{
		{name: "GO386", goarch: "386"}, {name: "GOAMD64", goarch: "amd64"}, {name: "GOARM", goarch: "arm"},
		{name: "GOARM64", goarch: "arm64"}, {name: "GOMIPS", goarch: "mips"}, {name: "GOMIPS64", goarch: "mips64"},
		{name: "GOPPC64", goarch: "ppc64"}, {name: "GORISCV64", goarch: "riscv64"}, {name: "GOWASM", goarch: "wasm"},
	}
}

func semanticArchitectureVariables() []string {
	queries := semanticArchitectureDefaultQueries()
	output := make([]string, len(queries))
	for index, query := range queries {
		output[index] = query.name
	}
	return output
}

func sameExecutablePath(left string, right string) bool {
	leftPath, leftErr := filepath.EvalSymlinks(left)
	rightPath, rightErr := filepath.EvalSymlinks(right)
	return leftErr == nil && rightErr == nil && filepath.Clean(leftPath) == filepath.Clean(rightPath)
}
