import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { computeLSPLineStarts } from "./lineMap.js";

export class LSPLineMapTests {
  computes_line_starts_for_lf_cr_and_crlf(): void {
    const lineMap = computeLSPLineStarts("a\nb\rc\r\nd");

    Assert.Equal(4, lineMap.lineStarts.length);
    Assert.Equal(0, lineMap.lineStarts[0]);
    Assert.Equal(2, lineMap.lineStarts[1]);
    Assert.Equal(4, lineMap.lineStarts[2]);
    Assert.Equal(7, lineMap.lineStarts[3]);
    Assert.True(lineMap.asciiOnly);
  }

  tracks_non_ascii_without_treating_unicode_separators_as_lsp_line_breaks(): void {
    const lineMap = computeLSPLineStarts("α\u2028b\nc");

    Assert.Equal(2, lineMap.lineStarts.length);
    Assert.Equal(0, lineMap.lineStarts[0]);
    Assert.Equal(4, lineMap.lineStarts[1]);
    Assert.False(lineMap.asciiOnly);
  }

  maps_positions_to_previous_line_start_index(): void {
    const lineMap = computeLSPLineStarts("first\nsecond\nthird");

    Assert.Equal(0, lineMap.computeIndexOfLineStart(0));
    Assert.Equal(0, lineMap.computeIndexOfLineStart(5));
    Assert.Equal(1, lineMap.computeIndexOfLineStart(6));
    Assert.Equal(1, lineMap.computeIndexOfLineStart(8));
    Assert.Equal(2, lineMap.computeIndexOfLineStart(13));
    Assert.Equal(2, lineMap.computeIndexOfLineStart(99));
  }
}

A<LSPLineMapTests>().method((t) => t.computes_line_starts_for_lf_cr_and_crlf).add(FactAttribute);
A<LSPLineMapTests>().method((t) => t.tracks_non_ascii_without_treating_unicode_separators_as_lsp_line_breaks).add(FactAttribute);
A<LSPLineMapTests>().method((t) => t.maps_positions_to_previous_line_start_index).add(FactAttribute);
