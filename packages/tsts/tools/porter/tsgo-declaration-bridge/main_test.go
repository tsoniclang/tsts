package main

import (
	"encoding/base64"
	"fmt"
	"testing"

	"github.com/microsoft/typescript-go/internal/api/encoder"
)

const testRevision = "0123456789abcdef0123456789abcdef01234567"

func TestBuildResponseUsesExactTSGoEvidence(t *testing.T) {
	text := "const wide = '💚';\n/** doc */\nexport function read<T extends object>(value: T): T { return value }\n"
	result, err := buildResponse(request{ID: 7, FileName: "/fixture.ts", Text: text}, testRevision)
	if err != nil {
		t.Fatal(err)
	}
	if result.SchemaVersion != responseSchemaVersion || result.ID != 7 || result.SourceRevision != testRevision {
		t.Fatalf("unexpected response identity: %#v", result)
	}
	if result.EncoderProtocolVersion != encoder.ProtocolVersion {
		t.Fatalf("protocol version = %d, want %d", result.EncoderProtocolVersion, encoder.ProtocolVersion)
	}
	if len(result.Diagnostics) != 0 || len(result.JSDocDiagnostics) != 0 {
		t.Fatalf("unexpected diagnostics: %#v / %#v", result.Diagnostics, result.JSDocDiagnostics)
	}
	if len(result.TextStarts) == 0 || result.TextStarts[0] != -1 {
		t.Fatalf("missing exact node-index sentinel: %#v", result.TextStarts)
	}
	if _, err := base64.StdEncoding.DecodeString(result.Data); err != nil {
		t.Fatalf("invalid encoded AST: %v", err)
	}
	if result.SourceSHA256 != "7acb062a04fc890e496b36cc354bdfbef35a0e6496532017f285f1d076bd7a53" {
		t.Fatalf("source hash = %s", result.SourceSHA256)
	}
}

func TestBuildResponseReportsUTF16Diagnostics(t *testing.T) {
	result, err := buildResponse(request{ID: 8, FileName: "/unicode.ts", Text: "const wide = '💚';\nexport const broken = ;\n"}, testRevision)
	if err != nil {
		t.Fatal(err)
	}
	if len(result.Diagnostics) != 1 {
		t.Fatalf("diagnostics = %#v", result.Diagnostics)
	}
	if result.Diagnostics[0].Pos != 41 || result.Diagnostics[0].End != 42 {
		t.Fatalf("diagnostic position = %#v, want UTF-16 span [41, 42)", result.Diagnostics[0])
	}
}

func TestBuildResponsePreservesNoSubstitutionTemplateFlags(t *testing.T) {
	result, err := buildResponse(request{ID: 9, FileName: "/template.ts", Text: "export type Value = `\\u0061`;\n"}, testRevision)
	if err != nil {
		t.Fatal(err)
	}
	found := false
	for _, flags := range result.NoSubTemplateFlags {
		if flags > 0 {
			found = true
		}
	}
	if !found {
		t.Fatalf("nonzero no-substitution template flags were not preserved: %#v", result.NoSubTemplateFlags)
	}
}

func TestBridgeNormalizesNonASCIIForEncodedSpans(t *testing.T) {
	file := parseSourceFile("/unicode.ts", "const value = '💚';\n")
	if !file.ContainsNonASCII {
		t.Fatal("bridge did not mark a non-ASCII source file")
	}
	if got := file.GetPositionMap().UTF8ToUTF16(len(file.Text())); got != 20 {
		t.Fatalf("UTF-16 source end = %d, want 20", got)
	}
}

func TestDecodeRequestRejectsUnknownFields(t *testing.T) {
	if _, err := decodeRequest([]byte(`{"id":1,"fileName":"/fixture.ts","text":"","extra":true}`)); err == nil {
		t.Fatal("unknown request field was accepted")
	}
}

func TestDecodeRequestRejectsTrailingJSON(t *testing.T) {
	if _, err := decodeRequest([]byte(`{"id":1,"fileName":"/fixture.ts","text":""} {}`)); err == nil {
		t.Fatal("trailing JSON value was accepted")
	}
}

func TestDecodeRequestRejectsNonCanonicalPaths(t *testing.T) {
	for _, fileName := range []string{"relative.ts", "/one/../two.ts", "C:\\fixture.ts"} {
		data := []byte(fmt.Sprintf(`{"id":1,"fileName":%q,"text":""}`, fileName))
		if _, err := decodeRequest(data); err == nil {
			t.Fatalf("noncanonical fileName %q was accepted", fileName)
		}
	}
}

func TestSourceRevisionMustBeEmbeddedExactly(t *testing.T) {
	previous := embeddedSourceRevision
	t.Cleanup(func() { embeddedSourceRevision = previous })

	embeddedSourceRevision = ""
	if _, err := sourceRevision(); err == nil {
		t.Fatal("missing embedded source revision was accepted")
	}
	embeddedSourceRevision = "0123456789ABCDEF0123456789abcdef01234567"
	if _, err := sourceRevision(); err == nil {
		t.Fatal("non-canonical embedded source revision was accepted")
	}
	embeddedSourceRevision = testRevision
	if revision, err := sourceRevision(); err != nil || revision != testRevision {
		t.Fatalf("embedded source revision = %q, %v", revision, err)
	}
}
