import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Exception } from "@tsonic/dotnet/System.js";

import { encodeVLQ, Generator } from "./index.js";

export class SourcemapEncodeVLQTests {
  encodes_zero(): void {
    Assert.Equal("A", encodeVLQ(0));
  }

  encodes_small_positive(): void {
    Assert.Equal("C", encodeVLQ(1));
    Assert.Equal("E", encodeVLQ(2));
  }

  encodes_small_negative(): void {
    Assert.Equal("D", encodeVLQ(-1));
  }

  encodes_larger_values_with_multi_char_output(): void {
    const enc = encodeVLQ(100);
    Assert.True(enc.length >= 2);
  }
}

export class SourcemapGeneratorBasicsTests {
  creates_empty_source_map(): void {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const raw = gen.rawSourceMap();
    Assert.Equal(3, raw.version);
    Assert.Equal("out.js", raw.file);
    Assert.Equal<readonly string[]>([], raw.sources);
    Assert.Equal<readonly string[]>([], raw.names);
    Assert.Equal("", raw.mappings);
  }

  add_source_deduplicates(): void {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const a = gen.addSource("/output/foo.ts");
    const b = gen.addSource("/output/foo.ts");
    Assert.Equal(a, b);
    const c = gen.addSource("/output/bar.ts");
    Assert.NotEqual(a, c);
  }

  add_name_deduplicates(): void {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const a = gen.addName("foo");
    const b = gen.addName("foo");
    Assert.Equal(a, b);
    const c = gen.addName("bar");
    Assert.NotEqual(a, c);
  }

  add_source_mapping_produces_vlq_output(): void {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const src = gen.addSource("/output/foo.ts");
    gen.addSourceMapping(0, 0, src, 0, 0);
    gen.addSourceMapping(0, 5, src, 0, 5);
    const raw = gen.rawSourceMap();
    Assert.True(raw.mappings.length > 0);
    Assert.Equal(1, raw.sources.length);
    Assert.True(raw.sources[0]!.endsWith("foo.ts"));
  }

  to_base64_data_url_produces_valid_data_url(): void {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const url = gen.toBase64DataURL();
    Assert.True(url.startsWith("data:application/json;base64,"));
  }

  rejects_backtracking_generated_line(): void {
    const gen = new Generator("out.js", "", "/output", {
      currentDirectory: "/output",
      useCaseSensitiveFileNames: true,
    });
    const src = gen.addSource("/output/foo.ts");
    gen.addSourceMapping(5, 0, src, 0, 0);
    Assert.ThrowsAny<Exception>(() => { gen.addSourceMapping(3, 0, src, 0, 0); });
  }
}

A<SourcemapEncodeVLQTests>().method((t) => t.encodes_zero).add(FactAttribute);
A<SourcemapEncodeVLQTests>().method((t) => t.encodes_small_positive).add(FactAttribute);
A<SourcemapEncodeVLQTests>().method((t) => t.encodes_small_negative).add(FactAttribute);
A<SourcemapEncodeVLQTests>().method((t) => t.encodes_larger_values_with_multi_char_output).add(FactAttribute);
A<SourcemapGeneratorBasicsTests>().method((t) => t.creates_empty_source_map).add(FactAttribute);
A<SourcemapGeneratorBasicsTests>().method((t) => t.add_source_deduplicates).add(FactAttribute);
A<SourcemapGeneratorBasicsTests>().method((t) => t.add_name_deduplicates).add(FactAttribute);
A<SourcemapGeneratorBasicsTests>().method((t) => t.add_source_mapping_produces_vlq_output).add(FactAttribute);
A<SourcemapGeneratorBasicsTests>().method((t) => t.to_base64_data_url_produces_valid_data_url).add(FactAttribute);
A<SourcemapGeneratorBasicsTests>().method((t) => t.rejects_backtracking_generated_line).add(FactAttribute);
