import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  changeExtension,
  changeFullExtension,
  combinePaths,
  containsIgnoredPath,
  ensureTrailingDirectorySeparator,
  extensionIsTs,
  fileExtensionIs,
  getAnyExtensionFromPath,
  getBaseFileName,
  getDeclarationEmitExtensionForPath,
  getDeclarationFileExtension,
  getDirectoryPath,
  getNormalizedAbsolutePath,
  getRootLength,
  hasExtension,
  hasTrailingDirectorySeparator,
  isDeclarationFileName,
  isRootedDiskPath,
  isUrl,
  normalizePath,
  normalizeSlashes,
  pathIsAbsolute,
  pathIsRelative,
  removeFileExtension,
  removeTrailingDirectorySeparator,
  toPath,
} from "./index.js";

export class NormalizeSlashesTests {
  normalizes_backslashes_to_forward_slashes(): void {
    Assert.Equal("a", normalizeSlashes("a"));
    Assert.Equal("a/b", normalizeSlashes("a/b"));
    Assert.Equal("a/b", normalizeSlashes("a\\b"));
    Assert.Equal("//server/path", normalizeSlashes("\\\\server\\path"));
  }
}

export class GetRootLengthTests {
  handles_posix_and_relative_paths(): void {
    Assert.Equal(0, getRootLength("a"));
    Assert.Equal(1, getRootLength("/"));
    Assert.Equal(1, getRootLength("/path"));
  }

  handles_dos_paths(): void {
    Assert.Equal(2, getRootLength("c:"));
    Assert.Equal(0, getRootLength("c:d"));
    Assert.Equal(3, getRootLength("c:/"));
    Assert.Equal(3, getRootLength("c:\\"));
  }

  handles_unc_paths(): void {
    Assert.Equal(8, getRootLength("//server"));
    Assert.Equal(9, getRootLength("//server/share"));
    Assert.Equal(8, getRootLength("\\\\server"));
    Assert.Equal(9, getRootLength("\\\\server\\share"));
  }

  handles_file_urls(): void {
    Assert.Equal(8, getRootLength("file:///"));
    Assert.Equal(8, getRootLength("file:///path"));
    Assert.Equal(10, getRootLength("file:///c:"));
    Assert.Equal(8, getRootLength("file:///c:d"));
    Assert.Equal(11, getRootLength("file:///c:/path"));
  }

  handles_http_urls(): void {
    Assert.Equal(13, getRootLength("http://server"));
    Assert.Equal(14, getRootLength("http://server/path"));
  }
}

export class PathIsAbsoluteTests {
  returns_true_for_absolute_paths(): void {
    Assert.True(pathIsAbsolute("/path/to/file.ext"));
    Assert.True(pathIsAbsolute("c:/path/to/file.ext"));
    Assert.True(pathIsAbsolute("file:///path/to/file.ext"));
  }

  returns_false_for_relative_paths(): void {
    Assert.False(pathIsAbsolute("path/to/file.ext"));
    Assert.False(pathIsAbsolute("./path/to/file.ext"));
  }
}

export class IsUrlTests {
  returns_false_for_non_url_paths(): void {
    Assert.False(isUrl("a"));
    Assert.False(isUrl("/"));
    Assert.False(isUrl("c:"));
    Assert.False(isUrl("//server"));
  }

  returns_true_for_url_paths(): void {
    Assert.True(isUrl("file:///path"));
    Assert.True(isUrl("http://server"));
    Assert.True(isUrl("file:///c:/path"));
  }
}

export class IsRootedDiskPathTests {
  returns_true_for_rooted_disk_paths_only(): void {
    Assert.True(isRootedDiskPath("/path"));
    Assert.True(isRootedDiskPath("c:/path"));
    Assert.False(isRootedDiskPath("file:///path"));
    Assert.False(isRootedDiskPath("path"));
  }
}

export class HasTrailingDirectorySeparatorTests {
  detects_trailing_separators(): void {
    Assert.True(hasTrailingDirectorySeparator("/"));
    Assert.True(hasTrailingDirectorySeparator("/path/"));
    Assert.False(hasTrailingDirectorySeparator("/path"));
    Assert.False(hasTrailingDirectorySeparator(""));
  }
}

export class CombinePathsTests {
  combines_non_absolute_paths(): void {
    Assert.Equal("path/to/file.ext", combinePaths("path", "to", "file.ext"));
  }

  does_not_simplify_dot_segments(): void {
    Assert.Equal(
      "path/dir/../to/file.ext",
      combinePaths("path", "dir", "..", "to", "file.ext")
    );
  }

  resets_on_absolute_trailing_path(): void {
    Assert.Equal("/path/to/file.ext", combinePaths("/path", "to", "file.ext"));
    Assert.Equal("/to/file.ext", combinePaths("/path", "/to", "file.ext"));
  }

  resets_on_dos_absolute_trailing_path(): void {
    Assert.Equal("c:/path/to/file.ext", combinePaths("c:/path", "to", "file.ext"));
    Assert.Equal("c:/to/file.ext", combinePaths("c:/path", "c:/to", "file.ext"));
  }
}

export class NormalizePathTests {
  collapses_dot_segments(): void {
    Assert.Equal("/path/to/file.ext", normalizePath("/path/./to/file.ext"));
    Assert.Equal("/to/file.ext", normalizePath("/path/../to/file.ext"));
  }

  converts_backslashes(): void {
    Assert.Equal("c:/path/to/file.ext", normalizePath("c:\\path\\to\\file.ext"));
  }
}

export class GetDirectoryAndBaseTests {
  returns_directory_part(): void {
    Assert.Equal("/path/to", getDirectoryPath("/path/to/file.ext"));
    Assert.Equal("file.ext", getDirectoryPath("file.ext"));
  }

  returns_base_filename(): void {
    Assert.Equal("file.ext", getBaseFileName("/path/to/file.ext"));
    Assert.Equal("file.ext", getBaseFileName("file.ext"));
    Assert.Equal("to", getBaseFileName("/path/to/"));
  }
}

export class TrailingSeparatorTests {
  removes_trailing(): void {
    Assert.Equal("/path", removeTrailingDirectorySeparator("/path/"));
    Assert.Equal("/path", removeTrailingDirectorySeparator("/path"));
  }

  ensures_trailing(): void {
    Assert.Equal("/path/", ensureTrailingDirectorySeparator("/path"));
    Assert.Equal("/path/", ensureTrailingDirectorySeparator("/path/"));
  }
}

export class PathIsRelativeTests {
  detects_relative_paths(): void {
    Assert.True(pathIsRelative("./foo"));
    Assert.True(pathIsRelative("../foo"));
    Assert.False(pathIsRelative("foo"));
    Assert.False(pathIsRelative("/foo"));
    Assert.False(pathIsRelative("c:/foo"));
  }
}

export class ExtensionTests {
  file_extension_is(): void {
    Assert.True(fileExtensionIs("foo.ts", ".ts"));
    Assert.False(fileExtensionIs("foo.tsx", ".ts"));
    Assert.True(fileExtensionIs("foo.d.ts", ".d.ts"));
  }

  has_extension(): void {
    Assert.True(hasExtension("foo.ts"));
    Assert.False(hasExtension("foo"));
  }

  extension_is_ts(): void {
    Assert.True(extensionIsTs(".ts"));
    Assert.True(extensionIsTs(".tsx"));
    Assert.True(extensionIsTs(".d.ts"));
    Assert.False(extensionIsTs(".js"));
  }

  remove_file_extension(): void {
    Assert.Equal("foo", removeFileExtension("foo.ts"));
    Assert.Equal("foo", removeFileExtension("foo.d.ts"));
    Assert.Equal("foo", removeFileExtension("foo"));
  }

  change_extension(): void {
    Assert.Equal("foo.js", changeExtension("foo.ts", ".js"));
    Assert.Equal("foo.js", changeExtension("foo.d.ts", ".js"));
  }

  change_full_extension(): void {
    Assert.Equal("foo.js", changeFullExtension("foo.d.ts", ".js"));
  }

  get_declaration_file_extension(): void {
    Assert.Equal(".d.ts", getDeclarationFileExtension("foo.d.ts"));
    Assert.Equal(".d.mts", getDeclarationFileExtension("foo.d.mts"));
    Assert.Equal("", getDeclarationFileExtension("foo.ts"));
  }

  get_declaration_emit_extension_for_path(): void {
    Assert.Equal(".d.ts", getDeclarationEmitExtensionForPath("foo.ts"));
    Assert.Equal(".d.mts", getDeclarationEmitExtensionForPath("foo.mts"));
    Assert.Equal(".d.cts", getDeclarationEmitExtensionForPath("foo.cts"));
  }

  is_declaration_file_name(): void {
    Assert.True(isDeclarationFileName("foo.d.ts"));
    Assert.False(isDeclarationFileName("foo.ts"));
  }
}

export class IgnoredPathsTests {
  contains_ignored_path_catches_common_patterns(): void {
    Assert.True(containsIgnoredPath("/project/node_modules/.bin/foo"));
    Assert.True(containsIgnoredPath("/project/.git/config"));
    Assert.True(containsIgnoredPath("/project/.#lock"));
    Assert.False(containsIgnoredPath("/project/src/foo.ts"));
  }
}

export class ToPathTests {
  normalizes_case_based_on_flag(): void {
    Assert.Equal("/base/Foo.ts", toPath("Foo.ts", "/base", true));
    Assert.Equal("/base/foo.ts", toPath("Foo.ts", "/base", false));
  }

  absolute_paths_stay_absolute(): void {
    Assert.Equal("/abs/path", toPath("/abs/path", "/base", true));
  }
}

export class GetNormalizedAbsolutePathTests {
  resolves_relative_to_current_directory(): void {
    Assert.Equal("/base/foo", getNormalizedAbsolutePath("./foo", "/base"));
    Assert.Equal("/foo", getNormalizedAbsolutePath("../foo", "/base"));
    Assert.Equal("/abs/path", getNormalizedAbsolutePath("/abs/path", "/base"));
  }
}

export class GetAnyExtensionFromPathTests {
  returns_extension_when_matching_provided_list(): void {
    Assert.Equal(".ts", getAnyExtensionFromPath("foo.ts", [".ts"], false));
    Assert.Equal("", getAnyExtensionFromPath("foo.ts", [".js"], false));
  }

  falls_back_to_last_index_of_when_no_list_provided(): void {
    Assert.Equal(".ts", getAnyExtensionFromPath("foo.ts", undefined, false));
    Assert.Equal(".ts", getAnyExtensionFromPath("foo.d.ts", undefined, false));
  }
}

A<NormalizeSlashesTests>().method((t) => t.normalizes_backslashes_to_forward_slashes).add(FactAttribute);
A<GetRootLengthTests>().method((t) => t.handles_posix_and_relative_paths).add(FactAttribute);
A<GetRootLengthTests>().method((t) => t.handles_dos_paths).add(FactAttribute);
A<GetRootLengthTests>().method((t) => t.handles_unc_paths).add(FactAttribute);
A<GetRootLengthTests>().method((t) => t.handles_file_urls).add(FactAttribute);
A<GetRootLengthTests>().method((t) => t.handles_http_urls).add(FactAttribute);
A<PathIsAbsoluteTests>().method((t) => t.returns_true_for_absolute_paths).add(FactAttribute);
A<PathIsAbsoluteTests>().method((t) => t.returns_false_for_relative_paths).add(FactAttribute);
A<IsUrlTests>().method((t) => t.returns_false_for_non_url_paths).add(FactAttribute);
A<IsUrlTests>().method((t) => t.returns_true_for_url_paths).add(FactAttribute);
A<IsRootedDiskPathTests>().method((t) => t.returns_true_for_rooted_disk_paths_only).add(FactAttribute);
A<HasTrailingDirectorySeparatorTests>().method((t) => t.detects_trailing_separators).add(FactAttribute);
A<CombinePathsTests>().method((t) => t.combines_non_absolute_paths).add(FactAttribute);
A<CombinePathsTests>().method((t) => t.does_not_simplify_dot_segments).add(FactAttribute);
A<CombinePathsTests>().method((t) => t.resets_on_absolute_trailing_path).add(FactAttribute);
A<CombinePathsTests>().method((t) => t.resets_on_dos_absolute_trailing_path).add(FactAttribute);
A<NormalizePathTests>().method((t) => t.collapses_dot_segments).add(FactAttribute);
A<NormalizePathTests>().method((t) => t.converts_backslashes).add(FactAttribute);
A<GetDirectoryAndBaseTests>().method((t) => t.returns_directory_part).add(FactAttribute);
A<GetDirectoryAndBaseTests>().method((t) => t.returns_base_filename).add(FactAttribute);
A<TrailingSeparatorTests>().method((t) => t.removes_trailing).add(FactAttribute);
A<TrailingSeparatorTests>().method((t) => t.ensures_trailing).add(FactAttribute);
A<PathIsRelativeTests>().method((t) => t.detects_relative_paths).add(FactAttribute);
A<ExtensionTests>().method((t) => t.file_extension_is).add(FactAttribute);
A<ExtensionTests>().method((t) => t.has_extension).add(FactAttribute);
A<ExtensionTests>().method((t) => t.extension_is_ts).add(FactAttribute);
A<ExtensionTests>().method((t) => t.remove_file_extension).add(FactAttribute);
A<ExtensionTests>().method((t) => t.change_extension).add(FactAttribute);
A<ExtensionTests>().method((t) => t.change_full_extension).add(FactAttribute);
A<ExtensionTests>().method((t) => t.get_declaration_file_extension).add(FactAttribute);
A<ExtensionTests>().method((t) => t.get_declaration_emit_extension_for_path).add(FactAttribute);
A<ExtensionTests>().method((t) => t.is_declaration_file_name).add(FactAttribute);
A<IgnoredPathsTests>().method((t) => t.contains_ignored_path_catches_common_patterns).add(FactAttribute);
A<ToPathTests>().method((t) => t.normalizes_case_based_on_flag).add(FactAttribute);
A<ToPathTests>().method((t) => t.absolute_paths_stay_absolute).add(FactAttribute);
A<GetNormalizedAbsolutePathTests>().method((t) => t.resolves_relative_to_current_directory).add(FactAttribute);
A<GetAnyExtensionFromPathTests>().method((t) => t.returns_extension_when_matching_provided_list).add(FactAttribute);
A<GetAnyExtensionFromPathTests>().method((t) => t.falls_back_to_last_index_of_when_no_list_provided).add(FactAttribute);
