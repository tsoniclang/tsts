import { test } from "node:test";
import assert from "node:assert/strict";
import type { GoError, GoPtr } from "../../../go/compat.js";
import { OrderedMap_Entries, OrderedMap_Set, NewOrderedMapWithSizeHint } from "../../collections/ordered_map.js";
import { Version } from "../../core/version.js";
import { TSFalse, TSTrue } from "../../core/tristate.js";
import { Unmarshal } from "../../json/json.js";
import type { Path } from "../../tspath/path.js";
import {
  BuildInfoDiagnosticsOfFile_UnmarshalJSON,
  BuildInfoEmitSignature_toEmitSignature,
  BuildInfoEmitSignature_UnmarshalJSON,
  BuildInfoFileInfo_GetFileInfo,
  BuildInfoFileInfo_UnmarshalJSON,
  BuildInfoFilePendingEmit_UnmarshalJSON,
  BuildInfo_IsValidVersion,
  BuildInfoReferenceMapEntry_UnmarshalJSON,
  BuildInfoResolvedRoot_UnmarshalJSON,
  BuildInfoRoot_UnmarshalJSON,
  BuildInfoSemanticDiagnostic_UnmarshalJSON,
  IsBuildInfoFileNameDefaultLibrary,
  NewBuildInfo,
  SerializeBuildInfo,
} from "./buildInfo.js";
import type {
  BuildInfo,
  BuildInfoDiagnostic,
  BuildInfoDiagnosticsOfFile,
  BuildInfoEmitSignature,
  BuildInfoFileInfo,
  BuildInfoFilePendingEmit,
  BuildInfoReferenceMapEntry,
  BuildInfoResolvedRoot,
  BuildInfoRoot,
  BuildInfoSemanticDiagnostic,
} from "./buildInfo.js";
import {
  FileEmitKindDts,
  FileInfo_AffectsGlobalScope,
  FileInfo_ImpliedNodeFormat,
  FileInfo_Signature,
  FileInfo_Version,
  DiagnosticsOrBuildInfoDiagnosticsWithFileName_getDiagnostics,
} from "./snapshot.js";
import { toSnapshot_toDiagnosticsOrBuildInfoDiagnosticsWithFileName } from "./buildinfotosnapshot.js";
import type { toSnapshot } from "./buildinfotosnapshot.js";
import { toBuildInfo_toBuildInfoDiagnosticsFromFileNameDiagnostics } from "./snapshottobuildinfo.js";
import type { toBuildInfo } from "./snapshottobuildinfo.js";

function diagnostic(): BuildInfoDiagnostic {
  return {
    File: 1,
    NoFile: false,
    Pos: 4,
    End: 8,
    Code: 2322,
    Category: 1,
    MessageKey: "Type_0_is_not_assignable_to_type_1_2322",
    MessageArgs: ["string", "number"],
    MessageChain: [],
    RelatedInformation: [],
    ReportsUnnecessary: true,
    ReportsDeprecated: false,
    SkippedOnNoEmit: false,
    RepopulateInfo: {
      Kind: 1,
      ModuleReference: "pkg",
      Mode: 0,
      PackageName: "",
    },
  };
}

function emptyBuildInfo(): BuildInfo {
  return {
    Version: "",
    Errors: false,
    CheckPending: false,
    Root: [],
    PackageJsons: [],
    MissingPackageJsons: [],
    FileNames: [],
    FileInfos: [],
    FileIdsList: [],
    Options: undefined,
    ReferencedMap: [],
    SemanticDiagnosticsPerFile: [],
    EmitDiagnosticsPerFile: [],
    ChangeFileSet: [],
    AffectedFilesPendingEmit: [],
    LatestChangedDtsFile: "",
    EmitSignatures: [],
    ResolvedRoot: [],
    SemanticErrors: false,
  };
}

const encodeJSONText = (text: string): number[] => Array.from(new TextEncoder().encode(text));

function errorMessage(error: GoError): string {
  if (error === undefined) {
    assert.fail("expected build-info decoding to fail");
  }
  return error.message;
}

test("BuildInfo serialization matches Go custom encodings", () => {
  const options = NewOrderedMapWithSizeHint<string, unknown>(3);
  OrderedMap_Set(options, "composite", TSTrue);
  OrderedMap_Set(options, "declarationMap", TSFalse);
  OrderedMap_Set(options, "target", 9);

  const buildInfo = emptyBuildInfo();
  buildInfo.Version = "7.1-test";
  buildInfo.CheckPending = true;
  buildInfo.Root = [
    { Start: 2, End: 4, NonIncremental: "" },
    { Start: 6, End: 0, NonIncremental: "" },
    { Start: 0, End: 0, NonIncremental: "./root.ts" },
  ];
  buildInfo.PackageJsons = ["../node_modules/pkg/package.json"];
  buildInfo.MissingPackageJsons = ["../node_modules/missing/package.json"];
  buildInfo.FileNames = ["lib.es2025.full.d.ts", "./a.ts"];
  buildInfo.FileInfos = [
    { signature: "same", noSignature: undefined, fileInfo: undefined },
    {
      signature: "",
      noSignature: { Version: "no-signature", NoSignature: true, AffectsGlobalScope: false, ImpliedNodeFormat: 0 },
      fileInfo: undefined,
    },
    {
      signature: "",
      noSignature: undefined,
      fileInfo: { Version: "default-signature", Signature: "", AffectsGlobalScope: true, ImpliedNodeFormat: 1 },
    },
    {
      signature: "",
      noSignature: undefined,
      fileInfo: { Version: "version", Signature: "signature", AffectsGlobalScope: false, ImpliedNodeFormat: 0 },
    },
  ];
  buildInfo.FileIdsList = [[1, 2]];
  buildInfo.Options = options;
  buildInfo.ReferencedMap = [{ FileId: 2, FileIdListId: 1 }];
  buildInfo.SemanticDiagnosticsPerFile = [
    { FileId: 2, Diagnostics: undefined },
    { FileId: 0, Diagnostics: { FileId: 2, Diagnostics: [diagnostic()] } },
  ];
  buildInfo.EmitDiagnosticsPerFile = [{ FileId: 2, Diagnostics: [diagnostic()] }];
  buildInfo.ChangeFileSet = [2];
  buildInfo.AffectedFilesPendingEmit = [
    { FileId: 2, EmitKind: 0 },
    { FileId: 3, EmitKind: FileEmitKindDts },
    { FileId: 4, EmitKind: 7 },
  ];
  buildInfo.LatestChangedDtsFile = "./a.d.ts";
  buildInfo.EmitSignatures = [
    { FileId: 2, Signature: "", DiffersOnlyInDtsMap: false, DiffersInOptions: false },
    { FileId: 3, Signature: "", DiffersOnlyInDtsMap: true, DiffersInOptions: false },
    { FileId: 4, Signature: "different", DiffersOnlyInDtsMap: false, DiffersInOptions: true },
    { FileId: 5, Signature: "signature", DiffersOnlyInDtsMap: false, DiffersInOptions: false },
  ];
  buildInfo.ResolvedRoot = [{ Resolved: 2, Root: 1 }];
  buildInfo.SemanticErrors = true;

  const [text, error] = SerializeBuildInfo(buildInfo);
  assert.equal(error, undefined);
  assert.equal(text, JSON.stringify({
    version: "7.1-test",
    checkPending: true,
    root: [[2, 4], 6, "./root.ts"],
    packageJsons: ["../node_modules/pkg/package.json"],
    missingPackageJsons: ["../node_modules/missing/package.json"],
    fileNames: ["lib.es2025.full.d.ts", "./a.ts"],
    fileInfos: [
      "same",
      { version: "no-signature", noSignature: true },
      { version: "default-signature", affectsGlobalScope: true, impliedNodeFormat: 1 },
      { version: "version", signature: "signature" },
    ],
    fileIdsList: [[1, 2]],
    options: { composite: true, declarationMap: false, target: 9 },
    referencedMap: [[2, 1]],
    semanticDiagnosticsPerFile: [
      2,
      [2, [{
        file: 1,
        pos: 4,
        end: 8,
        code: 2322,
        category: 1,
        messageKey: "Type_0_is_not_assignable_to_type_1_2322",
        messageArgs: ["string", "number"],
        messageChain: [],
        relatedInformation: [],
        reportsUnnecessary: true,
        repopulateInfo: { kind: 1, moduleReference: "pkg" },
      }]],
    ],
    emitDiagnosticsPerFile: [[2, [{
      file: 1,
      pos: 4,
      end: 8,
      code: 2322,
      category: 1,
      messageKey: "Type_0_is_not_assignable_to_type_1_2322",
      messageArgs: ["string", "number"],
      messageChain: [],
      relatedInformation: [],
      reportsUnnecessary: true,
      repopulateInfo: { kind: 1, moduleReference: "pkg" },
    }]]],
    changeFileSet: [2],
    affectedFilesPendingEmit: [2, [3], [4, 7]],
    latestChangedDtsFile: "./a.d.ts",
    emitSignatures: [2, [3, []], [4, ["different"]], [5, "signature"]],
    resolvedRoot: [[2, 1]],
    semanticErrors: true,
  }));
});

test("BuildInfo decoding restores compact file infos and ordered options", () => {
  const text = JSON.stringify({
    version: Version(),
    root: [2],
    fileNames: ["./a.ts", "./b.ts", "./c.ts"],
    fileInfos: [
      "same",
      { version: "without-signature", noSignature: true, affectsGlobalScope: true, impliedNodeFormat: 1 },
      { version: "version", signature: "signature", impliedNodeFormat: 1 },
    ],
    options: { composite: true, target: 9, declarationMap: false },
  });
  const buildInfo = NewBuildInfo();
  const error = Unmarshal(Array.from(new TextEncoder().encode(text)), buildInfo);

  assert.equal(error, undefined);
  assert.equal(BuildInfo_IsValidVersion(buildInfo), true);
  const optionEntries: Array<[string, unknown]> = [];
  OrderedMap_Entries(buildInfo.Options)((key, value) => {
    optionEntries.push([key, value]);
    return true;
  });
  assert.deepEqual(optionEntries, [
    ["composite", true],
    ["target", 9],
    ["declarationMap", false],
  ]);

  const fileInfos = buildInfo.FileInfos!.map(BuildInfoFileInfo_GetFileInfo);
  assert.equal(FileInfo_Version(fileInfos[0]), "same");
  assert.equal(FileInfo_Signature(fileInfos[0]), "same");
  assert.equal(FileInfo_Version(fileInfos[1]), "without-signature");
  assert.equal(FileInfo_Signature(fileInfos[1]), "");
  assert.equal(FileInfo_AffectsGlobalScope(fileInfos[1]), true);
  assert.equal(FileInfo_Version(fileInfos[2]), "version");
  assert.equal(FileInfo_Signature(fileInfos[2]), "signature");
  assert.equal(FileInfo_ImpliedNodeFormat(fileInfos[2]), 1);
  assert.equal(buildInfo.ChangeFileSet, undefined);
});

test("BuildInfo diagnostics remain lazy after snapshot conversion", () => {
  const converted = toSnapshot_toDiagnosticsOrBuildInfoDiagnosticsWithFileName(
    { filePaths: ["/a.ts"] } as toSnapshot,
    { FileId: 1, Diagnostics: [diagnostic()] },
  );
  assert.equal(converted!.diagnostics, undefined);
  assert.equal(converted!.buildInfoDiagnostics!.length, 1);
});

test("BuildInfo diagnostic nil slices remain nil after snapshot conversion", () => {
  const input = diagnostic();
  input.File = 0;
  input.MessageArgs = undefined;
  input.MessageChain = undefined;
  input.RelatedInformation = undefined;
  const converted = toSnapshot_toDiagnosticsOrBuildInfoDiagnosticsWithFileName(
    { filePaths: ["/a.ts"] } as toSnapshot,
    { FileId: 1, Diagnostics: [input] },
  );
  const output = converted!.buildInfoDiagnostics![0]!;
  assert.equal(output.messageArgs, undefined);
  assert.equal(output.messageChain, undefined);
  assert.equal(output.relatedInformation, undefined);

  const roundTripped = toBuildInfo_toBuildInfoDiagnosticsFromFileNameDiagnostics(
    {} as toBuildInfo,
    converted!.buildInfoDiagnostics,
  );
  assert.equal(roundTripped![0]!.MessageArgs, undefined);
  assert.equal(roundTripped![0]!.MessageChain, undefined);
  assert.equal(roundTripped![0]!.RelatedInformation, undefined);
});

test("BuildInfo omitzero distinguishes nil and empty slices", () => {
  const buildInfo = NewBuildInfo();
  buildInfo.Root = [];
  buildInfo.PackageJsons = undefined;

  const [text, error] = SerializeBuildInfo(buildInfo);
  assert.equal(error, undefined);
  assert.equal(text, '{"root":[]}');
});

test("BuildInfo preserves nil inner file-id lists", () => {
  const buildInfo = NewBuildInfo();
  const error = Unmarshal(
    Array.from(new TextEncoder().encode('{"fileIdsList":[null,[]]}')),
    buildInfo,
  );
  assert.equal(error, undefined);
  assert.ok(buildInfo.FileIdsList !== undefined);
  assert.equal(buildInfo.FileIdsList[0], undefined);
  assert.deepEqual(buildInfo.FileIdsList[1], []);

  const [text, serializeError] = SerializeBuildInfo(buildInfo);
  assert.equal(serializeError, undefined);
  assert.equal(text, '{"fileIdsList":[null,[]]}');
});

test("default-library build-info names exclude relative and absolute paths", () => {
  assert.equal(IsBuildInfoFileNameDefaultLibrary("lib.es2025.full.d.ts"), true);
  assert.equal(IsBuildInfoFileNameDefaultLibrary("./dependency.d.ts"), false);
  assert.equal(IsBuildInfoFileNameDefaultLibrary("../dependency.d.ts"), false);
  assert.equal(IsBuildInfoFileNameDefaultLibrary("/work/dependency.d.ts"), false);
  assert.equal(IsBuildInfoFileNameDefaultLibrary("C:/work/dependency.d.ts"), false);
});

test("nil diagnostic caches stay nil", () => {
  const cache = { diagnostics: undefined, buildInfoDiagnostics: undefined };
  const diagnostics = DiagnosticsOrBuildInfoDiagnosticsWithFileName_getDiagnostics(cache, undefined, undefined);
  assert.equal(diagnostics, undefined);
  assert.equal(cache.diagnostics, undefined);
});

test("BuildInfoFileInfo custom decoding accepts every wire encoding", () => {
  const decode = (value: unknown): BuildInfoFileInfo => {
    const result: BuildInfoFileInfo = { signature: "", noSignature: undefined, fileInfo: undefined };
    const error = BuildInfoFileInfo_UnmarshalJSON(
      result,
      Array.from(new TextEncoder().encode(JSON.stringify(value))),
    );
    assert.equal(error, undefined);
    return result;
  };
  const compact = BuildInfoFileInfo_GetFileInfo(decode("hash"));
  const noSignature = BuildInfoFileInfo_GetFileInfo(decode({
    version: "version",
    noSignature: true,
    affectsGlobalScope: true,
    impliedNodeFormat: 1,
  }));
  const withSignature = BuildInfoFileInfo_GetFileInfo(decode({
    version: "version",
    signature: "signature",
  }));

  assert.deepEqual(
    [compact, noSignature, withSignature].map((info: GoPtr<ReturnType<typeof BuildInfoFileInfo_GetFileInfo>>) => {
      assert.ok(info !== undefined);
      return [FileInfo_Version(info), FileInfo_Signature(info)];
    }),
    [["hash", "hash"], ["version", ""], ["version", "signature"]],
  );
});

test("compact build-info decoders preserve Go scalar and nil semantics", () => {
  const root: BuildInfoRoot = { Start: 0, End: 0, NonIncremental: "" };
  assert.equal(BuildInfoRoot_UnmarshalJSON(root, encodeJSONText("[1,null]")), undefined);
  assert.deepEqual(root, { Start: 1, End: 0, NonIncremental: "" });
  assert.throws(
    () => BuildInfoRoot_UnmarshalJSON(root, encodeJSONText("null")),
    /nil \*\[2\]int/,
  );

  const fileInfo: BuildInfoFileInfo = { signature: "sentinel", noSignature: undefined, fileInfo: undefined };
  assert.equal(BuildInfoFileInfo_UnmarshalJSON(fileInfo, encodeJSONText("null")), undefined);
  assert.deepEqual(fileInfo, { signature: "", noSignature: undefined, fileInfo: undefined });
  assert.equal(BuildInfoFileInfo_UnmarshalJSON(fileInfo, encodeJSONText('{"noSignature":1}')), undefined);
  assert.notEqual(fileInfo.fileInfo, undefined);

  const reference: BuildInfoReferenceMapEntry = { FileId: 0, FileIdListId: 0 };
  assert.equal(BuildInfoReferenceMapEntry_UnmarshalJSON(reference, encodeJSONText("[1,null]")), undefined);
  assert.deepEqual(reference, { FileId: 1, FileIdListId: 0 });
  assert.throws(
    () => BuildInfoReferenceMapEntry_UnmarshalJSON(reference, encodeJSONText("null")),
    /nil \*\[2\]int/,
  );

  const diagnostics: BuildInfoDiagnosticsOfFile = { FileId: 0, Diagnostics: [] };
  assert.equal(
    BuildInfoDiagnosticsOfFile_UnmarshalJSON(
      diagnostics,
      encodeJSONText('[1,[{"code":2147483647,"messageArgs":[null]}]]'),
    ),
    undefined,
  );
  assert.equal(diagnostics.Diagnostics?.[0]?.Code, 2147483647);
  assert.deepEqual(diagnostics.Diagnostics?.[0]?.MessageArgs, [""]);
  assert.equal(BuildInfoDiagnosticsOfFile_UnmarshalJSON(diagnostics, encodeJSONText("[1,null]")), undefined);
  assert.equal(diagnostics.Diagnostics, undefined);

  const semantic: BuildInfoSemanticDiagnostic = { FileId: 9, Diagnostics: diagnostics };
  assert.equal(BuildInfoSemanticDiagnostic_UnmarshalJSON(semantic, encodeJSONText("null")), undefined);
  assert.deepEqual(semantic, { FileId: 0, Diagnostics: undefined });

  const pending: BuildInfoFilePendingEmit = { FileId: 0, EmitKind: 0 };
  assert.equal(BuildInfoFilePendingEmit_UnmarshalJSON(pending, encodeJSONText("[-1,-1]")), undefined);
  assert.deepEqual(pending, { FileId: -1, EmitKind: 0xffffffff });
  assert.equal(BuildInfoFilePendingEmit_UnmarshalJSON(pending, encodeJSONText("[1,4294967296]")), undefined);
  assert.deepEqual(pending, { FileId: 1, EmitKind: 0 });

  const emitSignature: BuildInfoEmitSignature = {
    FileId: 0,
    Signature: "",
    DiffersOnlyInDtsMap: false,
    DiffersInOptions: false,
  };
  assert.equal(BuildInfoEmitSignature_UnmarshalJSON(emitSignature, encodeJSONText('[1.5,"signature"]')), undefined);
  assert.deepEqual(emitSignature, {
    FileId: 1,
    Signature: "signature",
    DiffersOnlyInDtsMap: false,
    DiffersInOptions: false,
  });

  const resolved: BuildInfoResolvedRoot = { Resolved: 9, Root: 9 };
  assert.equal(BuildInfoResolvedRoot_UnmarshalJSON(resolved, encodeJSONText("null")), undefined);
  assert.deepEqual(resolved, { Resolved: 0, Root: 0 });
});

test("every compact build-info decoder rejects malformed scalar, range, and tuple forms", () => {
  const decoders: Readonly<Record<string, (text: string) => GoError>> = {
    Root: (text) => BuildInfoRoot_UnmarshalJSON(
      { Start: 0, End: 0, NonIncremental: "" },
      encodeJSONText(text),
    ),
    FileInfo: (text) => BuildInfoFileInfo_UnmarshalJSON(
      { signature: "", noSignature: undefined, fileInfo: undefined },
      encodeJSONText(text),
    ),
    Reference: (text) => BuildInfoReferenceMapEntry_UnmarshalJSON(
      { FileId: 0, FileIdListId: 0 },
      encodeJSONText(text),
    ),
    Diagnostics: (text) => BuildInfoDiagnosticsOfFile_UnmarshalJSON(
      { FileId: 0, Diagnostics: undefined },
      encodeJSONText(text),
    ),
    Semantic: (text) => BuildInfoSemanticDiagnostic_UnmarshalJSON(
      { FileId: 0, Diagnostics: undefined },
      encodeJSONText(text),
    ),
    Pending: (text) => BuildInfoFilePendingEmit_UnmarshalJSON(
      { FileId: 0, EmitKind: 0 },
      encodeJSONText(text),
    ),
    Emit: (text) => BuildInfoEmitSignature_UnmarshalJSON(
      { FileId: 0, Signature: "", DiffersOnlyInDtsMap: false, DiffersInOptions: false },
      encodeJSONText(text),
    ),
    Resolved: (text) => BuildInfoResolvedRoot_UnmarshalJSON(
      { Resolved: 0, Root: 0 },
      encodeJSONText(text),
    ),
  };
  const malformed: ReadonlyArray<readonly [string, string, string]> = [
    ["Root", "1.0", "invalid BuildInfoRoot: 1.0"],
    ["Root", "9223372036854775808", "invalid BuildInfoRoot: 9223372036854775808"],
    ["Root", "true", "invalid BuildInfoRoot: true"],
    ["Root", "[1]", "invalid BuildInfoRoot: [1]"],
    ["FileInfo", '{"impliedNodeFormat":1.0}', 'invalid BuildInfoFileInfo: {"impliedNodeFormat":1.0}'],
    ["FileInfo", '{"impliedNodeFormat":2147483648}', 'invalid BuildInfoFileInfo: {"impliedNodeFormat":2147483648}'],
    ["FileInfo", "true", "invalid BuildInfoFileInfo: true"],
    ["Reference", "[1]", "json: cannot unmarshal JSON array into Go [2]int after offset 2: too few array elements"],
    ["Reference", "[1,2,3]", "json: cannot unmarshal JSON array into Go [2]int after offset 6: too many array elements"],
    ["Reference", "[1.0,2]", 'json: cannot unmarshal JSON number 1.0 into Go int within "/0": invalid syntax'],
    ["Reference", "true", "json: cannot unmarshal JSON boolean into Go [2]int"],
    ["Reference", "", "jsontext: unexpected EOF"],
    ["Reference", "[1,2,]", "jsontext: invalid character ',' at start of value after offset 4"],
    ["Diagnostics", "null", "invalid BuildInfoDiagnosticsOfFile: expected 2 elements, got 0"],
    ["Diagnostics", "true", "invalid BuildInfoDiagnosticsOfFile: true"],
    ["Diagnostics", "[true,[]]", "invalid fileId in BuildInfoDiagnosticsOfFile: json: cannot unmarshal JSON boolean into Go incremental.BuildInfoFileId"],
    ["Diagnostics", "[1,{}]", "invalid diagnostics in BuildInfoDiagnosticsOfFile: json: cannot unmarshal JSON object into Go []*incremental.BuildInfoDiagnostic"],
    ["Diagnostics", "[1.0,[]]", "invalid fileId in BuildInfoDiagnosticsOfFile: json: cannot unmarshal JSON number 1.0 into Go incremental.BuildInfoFileId: invalid syntax"],
    ["Diagnostics", '[1,[{"code":1.0}]]', 'invalid diagnostics in BuildInfoDiagnosticsOfFile: json: cannot unmarshal JSON number 1.0 into Go int32 within "/0/code": invalid syntax'],
    ["Diagnostics", '[1,[{"code":2147483648}]]', 'invalid diagnostics in BuildInfoDiagnosticsOfFile: json: cannot unmarshal JSON number 2147483648 into Go int32 within "/0/code": value out of range'],
    ["Semantic", "1e0", "invalid BuildInfoSemanticDiagnostic: 1e0"],
    ["Semantic", "true", "invalid BuildInfoSemanticDiagnostic: true"],
    ["Semantic", "[1]", "invalid BuildInfoSemanticDiagnostic: [1]"],
    ["Pending", "1.5", "invalid BuildInfoFilePendingEmit: 1.5"],
    ["Pending", "true", "invalid BuildInfoFilePendingEmit: true"],
    ["Pending", "[1.0,2]", "invalid BuildInfoFilePendingEmit: [1.0,2]"],
    ["Pending", "[1,2,3]", "invalid BuildInfoFilePendingEmit: expected 1 or 2 integers, got 3"],
    ["Emit", "1.0", "invalid BuildInfoEmitSignature: 1.0"],
    ["Emit", "[1]", "invalid BuildInfoEmitSignature: expected 2 elements, got 1"],
    ["Emit", '[true,"signature"]', "invalid fileId in BuildInfoEmitSignature: expected float64, got bool"],
    ["Emit", "[1,true]", "invalid signature in BuildInfoEmitSignature: expected string or []string, got bool"],
    ["Emit", "[1,null]", "invalid signature in BuildInfoEmitSignature: expected string or []string, got <nil>"],
    ["Emit", "[1,[true]]", "invalid signature in BuildInfoEmitSignature: expected string, got bool"],
    ["Emit", "[1,[null]]", "invalid signature in BuildInfoEmitSignature: expected string, got <nil>"],
    ["Emit", '[1,["a","b"]]', "invalid signature in BuildInfoEmitSignature: expected string or []string with 0 or 1 element, got 2 elements"],
    ["Resolved", "[1.0,2]", "invalid BuildInfoResolvedRoot: [1.0,2]"],
    ["Resolved", "true", "invalid BuildInfoResolvedRoot: true"],
    ["Resolved", "[1,2,3]", "invalid BuildInfoResolvedRoot: [1,2,3]"],
  ];

  for (const [decoderName, text, expected] of malformed) {
    assert.equal(errorMessage(decoders[decoderName]!(text)), expected, `${decoderName}: ${text}`);
  }
});

test("plain build-info emit signatures preserve a nil alternate-options slice", () => {
  const decoded = BuildInfoEmitSignature_toEmitSignature(
    { FileId: 1, Signature: "signature", DiffersOnlyInDtsMap: false, DiffersInOptions: false },
    "/out.d.ts" as Path,
    {},
  );
  assert.equal(decoded?.signature, "signature");
  assert.equal(decoded?.signatureWithDifferentOptions, undefined);
});

test("compact integer bounds follow Go int64 rather than JavaScript safe-integer limits", () => {
  const maximum: BuildInfoRoot = { Start: 0, End: 0, NonIncremental: "" };
  const minimum: BuildInfoRoot = { Start: 0, End: 0, NonIncremental: "" };
  assert.equal(BuildInfoRoot_UnmarshalJSON(maximum, encodeJSONText("9223372036854775807")), undefined);
  assert.equal(BuildInfoRoot_UnmarshalJSON(minimum, encodeJSONText("-9223372036854775808")), undefined);
  assert.equal(maximum.Start, Number(9223372036854775807n));
  assert.equal(minimum.Start, Number(-9223372036854775808n));
});

test("BuildInfoFileInfo fails hard on an impossible internal zero state", () => {
  assert.throws(
    () => BuildInfoFileInfo_GetFileInfo({ signature: "", noSignature: undefined, fileInfo: undefined }),
    /missing fileInfo/,
  );
});
