package main

import (
	"bufio"
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/microsoft/typescript-go/internal/api/encoder"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

const responseSchemaVersion = 2

var embeddedSourceRevision string

type request struct {
	ID       uint64 `json:"id"`
	FileName string `json:"fileName"`
	Text     string `json:"text"`
}

type diagnostic struct {
	Code int `json:"code"`
	Pos  int `json:"pos"`
	End  int `json:"end"`
}

type response struct {
	SchemaVersion          int          `json:"schemaVersion"`
	ID                     uint64       `json:"id"`
	SourceRevision         string       `json:"sourceRevision"`
	EncoderProtocolVersion uint8        `json:"encoderProtocolVersion"`
	FileName               string       `json:"fileName"`
	SourceSHA256           string       `json:"sourceSha256"`
	Data                   string       `json:"data"`
	TextStarts             []int        `json:"textStarts"`
	NoSubTemplateFlags     []int        `json:"noSubTemplateFlags"`
	Diagnostics            []diagnostic `json:"diagnostics"`
	JSDocDiagnostics       []diagnostic `json:"jsDocDiagnostics"`
}

func main() {
	revision, err := sourceRevision()
	if err != nil {
		fail("invalid build provenance: %v", err)
	}

	input := bufio.NewScanner(os.Stdin)
	input.Buffer(make([]byte, 64*1024), 256*1024*1024)
	output := json.NewEncoder(os.Stdout)
	output.SetEscapeHTML(false)
	for input.Scan() {
		value, err := decodeRequest(input.Bytes())
		if err != nil {
			fail("decode request: %v", err)
		}
		result, err := buildResponse(value, revision)
		if err != nil {
			fail("parse request %d: %v", value.ID, err)
		}
		if err := output.Encode(result); err != nil {
			fail("encode response %d: %v", value.ID, err)
		}
	}
	if err := input.Err(); err != nil {
		fail("read request: %v", err)
	}
}

func sourceRevision() (string, error) {
	if !isLowerSHA1(embeddedSourceRevision) {
		return "", fmt.Errorf("source revision must be embedded at build time as a lowercase 40-character SHA-1 object id")
	}
	return embeddedSourceRevision, nil
}

func decodeRequest(data []byte) (request, error) {
	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	var value request
	if err := decoder.Decode(&value); err != nil {
		return request{}, err
	}
	var trailing any
	if err := decoder.Decode(&trailing); err != io.EOF {
		if err == nil {
			return request{}, fmt.Errorf("request contains trailing JSON values")
		}
		return request{}, fmt.Errorf("decode trailing request data: %w", err)
	}
	if value.FileName == "" || tspath.GetEncodedRootLength(value.FileName) == 0 || value.FileName != tspath.NormalizePath(value.FileName) {
		return request{}, fmt.Errorf("fileName must be one normalized absolute path")
	}
	return value, nil
}

func buildResponse(value request, revision string) (response, error) {
	file := parseSourceFile(value.FileName, value.Text)
	data, indexes, err := encoder.EncodeSourceFile(file)
	if err != nil {
		return response{}, fmt.Errorf("encode source file: %w", err)
	}
	positionMap := file.GetPositionMap()
	textStarts := make([]int, len(indexes.Nodes))
	noSubTemplateFlags := make([]int, len(indexes.Nodes))
	for index, node := range indexes.Nodes {
		noSubTemplateFlags[index] = -1
		if node == nil || ast.NodeIsMissing(node) {
			textStarts[index] = -1
			continue
		}
		textStarts[index] = positionMap.UTF8ToUTF16(scanner.SkipTrivia(value.Text, node.Pos()))
		if node.Kind == ast.KindNoSubstitutionTemplateLiteral {
			noSubTemplateFlags[index] = int(node.AsNoSubstitutionTemplateLiteral().TemplateFlags)
		}
	}
	digest := sha256.Sum256([]byte(value.Text))
	return response{
		SchemaVersion:          responseSchemaVersion,
		ID:                     value.ID,
		SourceRevision:         revision,
		EncoderProtocolVersion: encoder.ProtocolVersion,
		FileName:               value.FileName,
		SourceSHA256:           hex.EncodeToString(digest[:]),
		Data:                   base64.StdEncoding.EncodeToString(data),
		TextStarts:             textStarts,
		NoSubTemplateFlags:     noSubTemplateFlags,
		Diagnostics:            diagnostics(file.Diagnostics(), positionMap),
		JSDocDiagnostics:       diagnostics(file.JSDocDiagnostics(), positionMap),
	}, nil
}

func parseSourceFile(fileName string, text string) *ast.SourceFile {
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{FileName: fileName}, text, core.ScriptKindTS)
	if !file.ContainsNonASCII && containsNonASCII(text) {
		file.ContainsNonASCII = true
	}
	return file
}

func containsNonASCII(value string) bool {
	for index := 0; index < len(value); index++ {
		if value[index] >= 0x80 {
			return true
		}
	}
	return false
}

func diagnostics(values []*ast.Diagnostic, positionMap *ast.PositionMap) []diagnostic {
	result := make([]diagnostic, 0, len(values))
	for _, value := range values {
		pos := value.Pos()
		end := value.End()
		if pos >= 0 {
			pos = positionMap.UTF8ToUTF16(pos)
		}
		if end >= 0 {
			end = positionMap.UTF8ToUTF16(end)
		}
		result = append(result, diagnostic{Code: int(value.Code()), Pos: pos, End: end})
	}
	return result
}

func isLowerSHA1(value string) bool {
	if len(value) != 40 {
		return false
	}
	for _, character := range value {
		if character < '0' || character > '9' && character < 'a' || character > 'f' {
			return false
		}
	}
	return true
}

func fail(format string, arguments ...any) {
	fmt.Fprintf(os.Stderr, format+"\n", arguments...)
	os.Exit(1)
}
