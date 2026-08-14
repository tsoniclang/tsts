import { lstat, mkdir, realpath, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, resolve } from "node:path";

export async function validateHostUtilities(path, names) {
  const root = await realpath(resolve(path));
  for (const name of names) {
    const selected = await realpath(join(root, name));
    const info = await lstat(selected);
    if (!info.isFile() || (info.mode & 0o111) === 0) {
      throw new Error(`Host-platform utility '${name}' is not executable`);
    }
  }
  return root;
}

export async function prepareToolchainState(root) {
  for (const path of ["home", "tmp", "go-build", "npm-cache"]) {
    await mkdir(join(root, path), { recursive: true, mode: 0o700 });
  }
  await writeFile(
    join(root, "npm-user.conf"),
    "audit=false\nfund=false\nregistry=https://registry.npmjs.org/\nupdate-notifier=false\n",
    { encoding: "utf8", mode: 0o600 },
  );
  await writeFile(join(root, "npm-global.conf"), "", {
    encoding: "utf8",
    mode: 0o600,
  });
  return root;
}

export function exactBootstrapEnvironment({
  goExecutable,
  nodeExecutable,
  hostUtilityPath,
  stateRoot,
}) {
  requireAbsolutePaths({ goExecutable, nodeExecutable, hostUtilityPath, stateRoot });
  return closedBase(stateRoot, [
    dirname(nodeExecutable),
    dirname(goExecutable),
    hostUtilityPath,
  ], hostUtilityPath);
}

export function exactAuthorityEnvironment(hostUtilityPath, stateRoot) {
  requireAbsolutePaths({ hostUtilityPath, stateRoot });
  return {
    ...closedBase(stateRoot, [hostUtilityPath], hostUtilityPath),
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_OPTIONAL_LOCKS: "0",
  };
}

export function exactToolchainEnvironment({
  goRoot,
  nodeRoot,
  goModuleCache,
  stateRoot,
  profile,
  hostUtilityPath,
}) {
  requireAbsolutePaths({ goRoot, nodeRoot, goModuleCache, stateRoot });
  if (hostUtilityPath !== undefined) {
    requireAbsolutePaths({ hostUtilityPath });
  }
  validateProfile(profile);
  const artifactPaths = [join(nodeRoot, "bin"), join(goRoot, "bin")];
  const paths = hostUtilityPath === undefined
    ? artifactPaths
    : [...artifactPaths, hostUtilityPath];
  const environment = {
    ...closedBase(stateRoot, paths, hostUtilityPath),
    CGO_ENABLED: profile.cgo ? "1" : "0",
    GO111MODULE: "on",
    GOARCH: profile.goarch,
    GOAUTH: "off",
    GOCACHE: join(stateRoot, "go-build"),
    GOENV: "off",
    GOFLAGS: "-mod=readonly",
    GOINSECURE: "",
    GOMODCACHE: goModuleCache,
    GONOPROXY: "none",
    GONOSUMDB: "*",
    GOOS: profile.goos,
    GOPATH: dirname(dirname(goModuleCache)),
    GOPRIVATE: "",
    GOPROXY: "off",
    GOROOT: goRoot,
    GOSUMDB: "off",
    GOTOOLCHAIN: "local",
    GOVCS: "off",
    GOWORK: "off",
  };
  return environment;
}

export function exactGoBuildEnvironment(environment, profile) {
  validateProfile(profile);
  if (
    environment.GOOS !== profile.goos || environment.GOARCH !== profile.goarch ||
    environment.CGO_ENABLED !== (profile.cgo ? "1" : "0")
  ) {
    throw new Error("Closed Go environment differs from the selected build profile");
  }
  return environment;
}

export function replaceProcessEnvironment(environment) {
  for (const key of Object.keys(process.env)) {
    delete process.env[key];
  }
  Object.assign(process.env, environment);
}

function closedBase(stateRoot, paths, hostUtilityPath) {
  return {
    CI: "1",
    HOME: join(stateRoot, "home"),
    LANG: "C",
    LC_ALL: "C",
    NODE_OPTIONS: "",
    NODE_PATH: "",
    NO_COLOR: "1",
    NPM_CONFIG_CACHE: join(stateRoot, "npm-cache"),
    NPM_CONFIG_GLOBALCONFIG: join(stateRoot, "npm-global.conf"),
    NPM_CONFIG_USERCONFIG: join(stateRoot, "npm-user.conf"),
    PATH: paths.join(":"),
    SHELL: hostUtilityPath === undefined ? "" : join(hostUtilityPath, "sh"),
    SOURCE_DATE_EPOCH: "0",
    TEMP: join(stateRoot, "tmp"),
    TMP: join(stateRoot, "tmp"),
    TMPDIR: join(stateRoot, "tmp"),
    TZ: "UTC",
  };
}

function requireAbsolutePaths(paths) {
  for (const [name, path] of Object.entries(paths)) {
    if (
      typeof path !== "string" || !isAbsolute(path) ||
      path.includes("\n") || path.includes(":")
    ) {
      throw new Error(`Closed environment path '${name}' must be absolute`);
    }
  }
}

function validateProfile(profile) {
  if (
    typeof profile !== "object" || profile === null ||
    typeof profile.goos !== "string" || profile.goos.length === 0 ||
    typeof profile.goarch !== "string" || profile.goarch.length === 0 ||
    typeof profile.cgo !== "boolean"
  ) {
    throw new Error("Closed environment requires an exact Go build profile");
  }
}
