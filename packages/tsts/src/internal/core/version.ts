import { IndexFunc } from "../../go/strings.js";
import type { GoRune } from "../../go/compat.js";

// Go strings are immutable UTF-8 byte sequences; `s[:i]` slices on byte offsets.
// strings.IndexFunc returns a byte offset, so we mirror that contract by operating
// over the UTF-8 byte view and converting back to a JS string at the boundary.
const utf8Encoder: TextEncoder = new globalThis.TextEncoder();
const utf8Decoder: TextDecoder = new globalThis.TextDecoder("utf-8");
const byteSlice = (s: string, start: number, end?: number): string => {
  const bytes = utf8Encoder.encode(s);
  return utf8Decoder.decode(bytes.subarray(start, end));
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/version.go::varGroup::version","kind":"varGroup","status":"implemented","sigHash":"23e677019d3517679ed624e88b85989160877044e1e9b5c0c79260d2e70b2645"}
 *
 * Go source:
 * var version = "7.0.0-dev"
 */
export let version: string = "7.0.0-dev";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/version.go::func::Version","kind":"func","status":"implemented","sigHash":"435e58b2449ff60065ece1684ead65c3df1b87879148e0860f1a39af178c5a13"}
 *
 * Go source:
 * func Version() string {
 * 	return version
 * }
 */
export function Version(): string {
  return version;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/version.go::varGroup::versionMajorMinor","kind":"varGroup","status":"implemented","sigHash":"4e4907f5a8be7a9b0fd6fcf124d10d9bb3fadcd35ecc7e1d7875ed700a692c89"}
 *
 * Go source:
 * var versionMajorMinor = func() string {
 * 	seenMajor := false
 * 	i := strings.IndexFunc(version, func(r rune) bool {
 * 		if r == '.' {
 * 			if seenMajor {
 * 				return true
 * 			}
 * 			seenMajor = true
 * 		}
 * 		return false
 * 	})
 * 	if i == -1 {
 * 		panic("invalid version string: " + version)
 * 	}
 * 	return version[:i]
 * }()
 */
export let versionMajorMinor: string = ((): string => {
  let seenMajor = false;
  const i = IndexFunc(version, (r: GoRune): boolean => {
    if (r === 0x2e /* '.' */) {
      if (seenMajor) {
        return true;
      }
      seenMajor = true;
    }
    return false;
  });
  if (i === -1) {
    throw new globalThis.Error("invalid version string: " + version);
  }
  return byteSlice(version, 0, i);
})();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/core/version.go::func::VersionMajorMinor","kind":"func","status":"implemented","sigHash":"54f3fbae55818abc6b74aa3cb73b7de994e9a3fcd7f43566c4da620e2b8735a4"}
 *
 * Go source:
 * func VersionMajorMinor() string {
 * 	return versionMajorMinor
 * }
 */
export function VersionMajorMinor(): string {
  return versionMajorMinor;
}
