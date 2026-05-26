import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { KnownSymlinks } from "./index.js";
import { toPath } from "../tspath/index.js";

export class KnownSymlinksTests {
  starts_empty(): void {
    const s = new KnownSymlinks("/cwd", true);
    Assert.Equal(0, s.getDirectories().size);
    Assert.Equal(0, s.getFiles().size);
  }

  set_file_records_symlink_to_realpath_and_realpath_to_symlink_set(): void {
    const s = new KnownSymlinks("/cwd", true);
    const symlinkPath = toPath("/cwd/link.ts", "/cwd", true);
    s.setFile("/cwd/link.ts", symlinkPath, "/cwd/real/file.ts");

    Assert.Equal("/cwd/real/file.ts", s.getFiles().get(symlinkPath));
    const realPath = toPath("/cwd/real/file.ts", "/cwd", true);
    const symlinks = s.getFilesByRealpath().get(realPath);
    Assert.NotNull(symlinks);
    Assert.True(symlinks!.has("/cwd/link.ts"));
  }

  process_resolution_infers_directory_symlink_from_filename_suffix_match(): void {
    const s = new KnownSymlinks("/cwd", true);
    s.processResolution("/cwd/link/foo.ts", "/cwd/real/foo.ts");

    const linkFilePath = toPath("/cwd/link/foo.ts", "/cwd", true);
    Assert.Equal("/cwd/real/foo.ts", s.getFiles().get(linkFilePath));

    const linkDirPath = toPath("/cwd/link", "/cwd", true) + "/";
    const dirLink = s.getDirectories().get(linkDirPath as ReturnType<typeof toPath>);
    Assert.NotNull(dirLink);
    Assert.Equal("/cwd/real/", dirLink!.real);
  }

  process_resolution_ignores_empty_paths(): void {
    const s = new KnownSymlinks("/cwd", true);
    s.processResolution("", "/cwd/real/foo.ts");
    s.processResolution("/cwd/link/foo.ts", "");
    Assert.Equal(0, s.getFiles().size);
  }

  does_not_infer_a_symlink_when_filenames_differ(): void {
    const s = new KnownSymlinks("/cwd", true);
    s.processResolution("/cwd/link/foo.ts", "/cwd/real/bar.ts");
    Assert.Equal(1, s.getFiles().size);
    Assert.Equal(0, s.getDirectories().size);
  }
}

A<KnownSymlinksTests>().method((t) => t.starts_empty).add(FactAttribute);
A<KnownSymlinksTests>().method((t) => t.set_file_records_symlink_to_realpath_and_realpath_to_symlink_set).add(FactAttribute);
A<KnownSymlinksTests>().method((t) => t.process_resolution_infers_directory_symlink_from_filename_suffix_match).add(FactAttribute);
A<KnownSymlinksTests>().method((t) => t.process_resolution_ignores_empty_paths).add(FactAttribute);
A<KnownSymlinksTests>().method((t) => t.does_not_infer_a_symlink_when_filenames_differ).add(FactAttribute);
