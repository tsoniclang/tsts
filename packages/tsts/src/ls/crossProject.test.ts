import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  SymbolKindFunction,
  type CallHierarchyIncomingCall,
  type DocumentUri,
  type Location,
  type LocationLink,
  type Position,
  type Range,
  type TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile,
  type TextEdit,
} from "../lsp/lsproto/index.js";
import type { Path } from "../tspath/index.js";
import {
  combineImplementations,
  combineIncomingCalls,
  combineReferences,
  combineRenameResponse,
  handleCrossProject,
  type CrossProjectLanguageService,
  type CrossProjectOrchestrator,
  type NonLocalDefinition,
  type Project,
  type SymbolAndEntriesData,
  type SymbolEntryTransformOptions,
} from "./crossProject.js";

interface TestEntry {
  readonly name: string;
}

interface TestResponse {
  readonly value: string;
}

class TestParams {
  private readonly uri: DocumentUri;
  private readonly position: Position;

  constructor(
    uri: DocumentUri,
    position: Position,
  ) {
    this.uri = uri;
    this.position = position;
  }

  textDocumentURI(): DocumentUri {
    return this.uri;
  }

  textDocumentPosition(): Position {
    return this.position;
  }
}

class TestProject implements Project {
  private readonly projectID: Path;
  private readonly fileNames: readonly string[];
  private readonly program: unknown | undefined;

  constructor(
    projectID: Path,
    fileNames: readonly string[] = [],
    program: unknown | undefined = {},
  ) {
    this.projectID = projectID;
    this.fileNames = fileNames;
    this.program = program;
  }

  id(): Path {
    return this.projectID;
  }

  getProgram(): unknown | undefined {
    return this.program;
  }

  hasFile(fileName: string): boolean {
    return this.fileNames.includes(fileName);
  }
}

class TestDefinition implements NonLocalDefinition {
  private readonly uri: DocumentUri;
  private readonly position: Position;
  private readonly sourcePosition: TestParams | undefined;
  private readonly generatedPosition: TestParams | undefined;

  constructor(
    uri: DocumentUri,
    position: Position,
    sourcePosition?: TestParams,
    generatedPosition?: TestParams,
  ) {
    this.uri = uri;
    this.position = position;
    this.sourcePosition = sourcePosition;
    this.generatedPosition = generatedPosition;
  }

  textDocumentURI(): DocumentUri {
    return this.uri;
  }

  textDocumentPosition(): Position {
    return this.position;
  }

  getSourcePosition(): TestParams | undefined {
    return this.sourcePosition;
  }

  getGeneratedPosition(): TestParams | undefined {
    return this.generatedPosition;
  }
}

class TestLanguageService implements CrossProjectLanguageService<TestEntry> {
  readonly calls: string[] = [];
  readonly originalDefinitions = new Map<string, readonly TestParams[]>();
  readonly label: string;
  readonly entries: readonly TestEntry[];
  nonLocalDefinition: NonLocalDefinition | undefined;

  constructor(
    label: string,
    entries: readonly TestEntry[],
  ) {
    this.label = label;
    this.entries = entries;
  }

  provideSymbolsAndEntries(
    _context: unknown,
    uri: DocumentUri,
    position: Position,
    _isRename: boolean,
    _implementations: boolean,
  ): readonly [SymbolAndEntriesData<TestEntry>, boolean] {
    this.calls.push(`${uri}:${position.line}:${position.character}`);
    return [{ symbolsAndEntries: this.entries, position: position.line }, true];
  }

  getNonLocalDefinition(_context: unknown, entry: TestEntry): NonLocalDefinition | undefined {
    if (entry.name === "default-def") return this.nonLocalDefinition;
    return undefined;
  }

  forEachOriginalDefinitionLocation(
    _context: unknown,
    entry: TestEntry,
    callback: (uri: DocumentUri, position: Position) => void,
  ): void {
    const originalDefinitions = this.originalDefinitions.get(entry.name);
    if (originalDefinitions === undefined) return;
    for (const definition of originalDefinitions) {
      callback(definition.textDocumentURI(), definition.textDocumentPosition());
    }
  }
}

class TestOrchestrator implements CrossProjectOrchestrator<TestLanguageService, TestEntry> {
  readonly services = new Map<Path, TestLanguageService>();
  readonly projectsByFile = new Map<DocumentUri, readonly Project[]>();
  loadedProjects: readonly Project[] = [];
  private readonly defaultProject: Project;
  private readonly initialProjects: readonly Project[];

  constructor(
    defaultProject: Project,
    initialProjects: readonly Project[],
  ) {
    this.defaultProject = defaultProject;
    this.initialProjects = initialProjects;
  }

  getDefaultProject(): Project {
    return this.defaultProject;
  }

  getAllProjectsForInitialRequest(): readonly Project[] {
    return this.initialProjects;
  }

  getLanguageServiceForProjectWithFile(
    _context: unknown,
    project: Project,
    _uri: DocumentUri,
  ): TestLanguageService | undefined {
    return this.services.get(project.id());
  }

  getProjectsForFile(_context: unknown, uri: DocumentUri): readonly Project[] {
    return this.projectsByFile.get(uri) ?? [];
  }

  getProjectsLoadingProjectTree(_context: unknown, _requestedProjectTrees: ReadonlySet<Path>): Iterable<Project> {
    return this.loadedProjects;
  }
}

function entry(name: string): TestEntry {
  return { name };
}

function position(line: number, character: number): Position {
  return { line, character };
}

function range(startLine: number, startCharacter: number, endLine: number, endCharacter: number): Range {
  return {
    start: position(startLine, startCharacter),
    end: position(endLine, endCharacter),
  };
}

function location(uri: DocumentUri, line: number): Location {
  return {
    uri,
    range: range(line, 0, line, 1),
  };
}

function locationLink(uri: DocumentUri, line: number): LocationLink {
  const targetRange = range(line, 0, line, 1);
  return {
    targetUri: uri,
    targetRange,
    targetSelectionRange: targetRange,
  };
}

function textEdit(line: number, text: string): TextEdit {
  return {
    range: range(line, 0, line, 1),
    newText: text,
  };
}

function responseForService(
  languageService: TestLanguageService,
  _context: unknown,
  _params: TestParams,
  data: SymbolAndEntriesData<TestEntry>,
  _options: SymbolEntryTransformOptions,
): TestResponse {
  const names = data.symbolsAndEntries?.map(item => item.name).join("+") ?? "";
  return { value: `${languageService.label}:${names}` };
}

function combineTestResponses(results: Iterable<TestResponse>): TestResponse {
  const values: string[] = [];
  for (const result of results) {
    values.push(result.value);
  }
  return { value: values.join(",") };
}

export class CrossProjectTests {
  default_only_request_uses_the_default_language_service(): void {
    const service = new TestLanguageService("default", [entry("symbol")]);

    const result = handleCrossProject(
      service,
      undefined,
      new TestParams("file:///main.ts", position(1, 2)),
      undefined,
      responseForService,
      combineTestResponses,
      false,
      false,
      {},
    );

    Assert.Equal("default:symbol", result.value);
    Assert.Equal("file:///main.ts:1:2", service.calls[0]);
  }

  combines_default_project_before_initial_projects(): void {
    const defaultProject = new TestProject("default");
    const projectA = new TestProject("a");
    const projectB = new TestProject("b");
    const orchestrator = new TestOrchestrator(defaultProject, [defaultProject, projectA, projectB]);
    const defaultService = new TestLanguageService("default", [entry("d")]);
    orchestrator.services.set("a", new TestLanguageService("a", [entry("a")]));
    orchestrator.services.set("b", new TestLanguageService("b", [entry("b")]));

    const result = handleCrossProject(
      defaultService,
      undefined,
      new TestParams("file:///main.ts", position(0, 0)),
      orchestrator,
      responseForService,
      combineTestResponses,
      false,
      false,
      {},
    );

    Assert.Equal("default:d,a:a,b:b", result.value);
  }

  expands_original_definition_and_project_tree_locations_in_ts_go_order(): void {
    const defaultProject = new TestProject("default", ["/main.ts"]);
    const initialProject = new TestProject("initial", ["/main.ts"]);
    const originalProject = new TestProject("original", ["/original.ts"]);
    const loadedProject = new TestProject("loaded", ["/default.ts"]);
    const orchestrator = new TestOrchestrator(defaultProject, [defaultProject, initialProject]);
    const defaultService = new TestLanguageService("default", [entry("default-def")]);
    defaultService.nonLocalDefinition = new TestDefinition("file:///default.ts", position(3, 4));
    defaultService.originalDefinitions.set("default-def", [new TestParams("file:///original.ts", position(2, 1))]);

    orchestrator.services.set("initial", new TestLanguageService("initial", [entry("i")]));
    orchestrator.services.set("original", new TestLanguageService("original", [entry("o")]));
    orchestrator.services.set("loaded", new TestLanguageService("loaded", [entry("l")]));
    orchestrator.projectsByFile.set("file:///original.ts", [originalProject]);
    orchestrator.loadedProjects = [loadedProject];

    const result = handleCrossProject(
      defaultService,
      undefined,
      new TestParams("file:///main.ts", position(0, 0)),
      orchestrator,
      responseForService,
      combineTestResponses,
      false,
      false,
      {},
    );

    Assert.Equal("default:default-def,initial:i,loaded:l,original:o", result.value);
  }

  deduplicates_reference_locations_by_uri_and_range(): void {
    const shared = location("file:///a.ts", 1);
    const response = combineReferences([
      { locations: [shared, location("file:///b.ts", 2)] },
      { locations: [shared, location("file:///a.ts", 3)] },
    ]);

    Assert.Equal(3, response.locations?.length);
    Assert.Equal("file:///a.ts", response.locations?.[0]?.uri);
    Assert.Equal(3, response.locations?.[2]?.range.start.line);
  }

  combines_implementation_links_until_any_response_uses_locations(): void {
    const linkA = locationLink("file:///a.ts", 1);
    const linkB = locationLink("file:///b.ts", 2);

    const links = combineImplementations([
      { definitionLinks: [linkA, linkB] },
      { definitionLinks: [linkA] },
    ]);
    const locations = combineImplementations([
      { definitionLinks: [linkA] },
      { locations: [location("file:///impl.ts", 4), location("file:///impl.ts", 4)] },
    ]);

    Assert.Equal(2, links.definitionLinks?.length);
    Assert.Equal(undefined, links.locations);
    Assert.Equal(undefined, locations.definitionLinks);
    Assert.Equal(1, locations.locations?.length);
    Assert.Equal("file:///impl.ts", locations.locations?.[0]?.uri);
  }

  combines_rename_edits_and_deduplicates_rename_files(): void {
    const rename: TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile = {
      renameFile: {
        kind: "rename",
        oldUri: "file:///old.ts",
        newUri: "file:///new.ts",
      },
    };
    const editA = textEdit(1, "a");
    const editB = textEdit(1, "b");
    const editC = textEdit(2, "c");

    const response = combineRenameResponse([
      { workspaceEdit: { documentChanges: [rename], changes: { "file:///a.ts": [editA, editB] } } },
      { workspaceEdit: { documentChanges: [rename], changes: { "file:///a.ts": [editC] } } },
    ]);

    Assert.Equal(1, response.workspaceEdit?.documentChanges?.length);
    Assert.Equal(2, response.workspaceEdit?.changes?.["file:///a.ts"]?.length);
    Assert.Equal("a", response.workspaceEdit?.changes?.["file:///a.ts"]?.[0]?.newText);
    Assert.Equal("c", response.workspaceEdit?.changes?.["file:///a.ts"]?.[1]?.newText);
  }

  deduplicates_incoming_calls_by_caller_location(): void {
    const callA = incomingCall("callerA", "file:///a.ts", 1);
    const callB = incomingCall("callerB", "file:///b.ts", 2);

    const response = combineIncomingCalls([
      { callHierarchyIncomingCalls: [callA, callB] },
      { callHierarchyIncomingCalls: [callA] },
    ]);

    Assert.Equal(2, response.callHierarchyIncomingCalls?.length);
    Assert.Equal("callerA", response.callHierarchyIncomingCalls?.[0]?.from?.name);
    Assert.Equal("callerB", response.callHierarchyIncomingCalls?.[1]?.from?.name);
  }
}

function incomingCall(name: string, uri: DocumentUri, line: number): CallHierarchyIncomingCall {
  const itemRange = range(line, 0, line, 3);
  return {
    from: {
      name,
      kind: SymbolKindFunction,
      uri,
      range: itemRange,
      selectionRange: itemRange,
    },
    fromRanges: [itemRange],
  };
}

A<CrossProjectTests>().method((t) => t.default_only_request_uses_the_default_language_service).add(FactAttribute);
A<CrossProjectTests>().method((t) => t.combines_default_project_before_initial_projects).add(FactAttribute);
A<CrossProjectTests>().method((t) => t.expands_original_definition_and_project_tree_locations_in_ts_go_order).add(FactAttribute);
A<CrossProjectTests>().method((t) => t.deduplicates_reference_locations_by_uri_and_range).add(FactAttribute);
A<CrossProjectTests>().method((t) => t.combines_implementation_links_until_any_response_uses_locations).add(FactAttribute);
A<CrossProjectTests>().method((t) => t.combines_rename_edits_and_deduplicates_rename_files).add(FactAttribute);
A<CrossProjectTests>().method((t) => t.deduplicates_incoming_calls_by_caller_location).add(FactAttribute);
