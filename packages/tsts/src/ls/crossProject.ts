/**
 * Cross-project language-service request orchestration.
 *
 * Port of TS-Go `internal/ls/crossproject.go`.
 */

import {
  documentUriFileName,
  type CallHierarchyIncomingCall,
  type CallHierarchyIncomingCallsResponse,
  type DocumentUri,
  type HasTextDocumentPosition,
  type ImplementationResponse,
  type Location,
  type LocationLink,
  type Position,
  type Range,
  type ReferencesResponse,
  type RenameResponse,
  type TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile,
  type TextEdit,
} from "../lsp/lsproto/index.js";
import type { Path } from "../tspath/index.js";

export interface Project {
  id(): Path;
  getProgram(): unknown | undefined;
  hasFile(fileName: string): boolean;
}

interface ProjectAndTextDocumentPosition<LanguageService> {
  readonly project: Project;
  readonly languageService?: LanguageService;
  readonly uri: DocumentUri;
  readonly position: Position;
  readonly forOriginalLocation: boolean;
}

interface CrossProjectResponse<Response> {
  complete: boolean;
  result?: Response;
  forOriginalLocation: boolean;
}

export interface SymbolEntryTransformOptions {
  readonly requireLocationsResult?: boolean;
  readonly dropOriginNodes?: boolean;
}

export interface SymbolAndEntriesData<Entry = unknown> {
  readonly originalNode?: unknown;
  readonly symbolsAndEntries?: readonly Entry[];
  readonly position?: number;
}

export interface NonLocalDefinition extends HasTextDocumentPosition {
  getSourcePosition?(): HasTextDocumentPosition | undefined;
  getGeneratedPosition?(): HasTextDocumentPosition | undefined;
}

export interface CrossProjectLanguageService<Entry = unknown> {
  provideSymbolsAndEntries(
    context: unknown,
    uri: DocumentUri,
    position: Position,
    isRename: boolean,
    implementations: boolean,
  ): readonly [SymbolAndEntriesData<Entry>, boolean];

  getNonLocalDefinition(context: unknown, entry: Entry): NonLocalDefinition | undefined;

  forEachOriginalDefinitionLocation(
    context: unknown,
    entry: Entry,
    callback: (uri: DocumentUri, position: Position) => void,
  ): void;
}

export interface CrossProjectOrchestrator<
  LanguageService extends CrossProjectLanguageService<Entry>,
  Entry = unknown,
> {
  getDefaultProject(): Project;
  getAllProjectsForInitialRequest(): readonly Project[];
  getLanguageServiceForProjectWithFile(
    context: unknown,
    project: Project,
    uri: DocumentUri,
  ): LanguageService | undefined;
  getProjectsForFile(context: unknown, uri: DocumentUri): readonly Project[];
  getProjectsLoadingProjectTree(context: unknown, requestedProjectTrees: ReadonlySet<Path>): Iterable<Project>;
}

export type SymbolAndEntriesToResponse<
  Request extends HasTextDocumentPosition,
  Response,
  Entry,
  LanguageService extends CrossProjectLanguageService<Entry>,
> = (
  languageService: LanguageService,
  context: unknown,
  params: Request,
  data: SymbolAndEntriesData<Entry>,
  options: SymbolEntryTransformOptions,
) => Response;

export function handleCrossProject<
  Request extends HasTextDocumentPosition,
  Response,
  Entry = unknown,
  LanguageService extends CrossProjectLanguageService<Entry> = CrossProjectLanguageService<Entry>,
>(
  defaultLanguageService: LanguageService,
  context: unknown,
  params: Request,
  orchestrator: CrossProjectOrchestrator<LanguageService, Entry> | undefined,
  symbolAndEntriesToResponse: SymbolAndEntriesToResponse<Request, Response, Entry, LanguageService>,
  combineResults: (results: Iterable<Response>) => Response,
  isRename: boolean,
  implementations: boolean,
  options: SymbolEntryTransformOptions,
): Response {
  if (orchestrator === undefined) {
    const [data] = defaultLanguageService.provideSymbolsAndEntries(
      context,
      params.textDocumentURI(),
      params.textDocumentPosition(),
      isRename,
      implementations,
    );
    return symbolAndEntriesToResponse(defaultLanguageService, context, params, data, options);
  }

  const defaultProject = orchestrator.getDefaultProject();
  const allProjects = orchestrator.getAllProjectsForInitialRequest();
  const results = new Map<Path, CrossProjectResponse<Response>>();
  const pending: ProjectAndTextDocumentPosition<LanguageService>[] = [];
  let defaultDefinition: NonLocalDefinition | undefined;
  let firstError: Error | undefined;

  const canSearchProject = (project: Project): boolean => !results.has(project.id());

  const enqueueItem = (item: ProjectAndTextDocumentPosition<LanguageService>): boolean => {
    const projectID = item.project.id();
    if (results.has(projectID)) return false;
    results.set(projectID, {
      complete: false,
      forOriginalLocation: item.forOriginalLocation,
    });
    pending.push(item);
    return true;
  };

  const processPending = (): void => {
    while (pending.length > 0) {
      throwIfContextCancelled(context);
      const item = pending.shift();
      if (item === undefined) return;
      const response = results.get(item.project.id());
      if (response === undefined) continue;

      const languageService = item.languageService
        ?? orchestrator.getLanguageServiceForProjectWithFile(context, item.project, item.uri);
      if (languageService === undefined) continue;

      const [data, ok] = languageService.provideSymbolsAndEntries(
        context,
        item.uri,
        item.position,
        isRename,
        implementations,
      );
      throwIfContextCancelled(context);

      if (ok) {
        const entries = data.symbolsAndEntries ?? [];
        for (const entry of entries) {
          if (item.project === defaultProject && defaultDefinition === undefined) {
            defaultDefinition = languageService.getNonLocalDefinition(context, entry);
          }
          languageService.forEachOriginalDefinitionLocation(context, entry, (uri, position) => {
            let definitionProjects: readonly Project[] = [];
            try {
              definitionProjects = orchestrator.getProjectsForFile(context, uri);
            } catch {
              return;
            }
            for (const definitionProject of definitionProjects) {
              if (canSearchProject(definitionProject)) {
                enqueueItem({
                  project: definitionProject,
                  uri,
                  position,
                  forOriginalLocation: true,
                });
              }
            }
          });
        }
      }

      try {
        response.result = symbolAndEntriesToResponse(languageService, context, params, data, options);
        response.complete = true;
        response.forOriginalLocation = item.forOriginalLocation;
      } catch (error) {
        if (firstError === undefined) {
          firstError = error instanceof Error ? error : new Error(String(error));
        }
      }
    }
  };

  enqueueItem({
    project: defaultProject,
    languageService: defaultLanguageService,
    uri: params.textDocumentURI(),
    position: params.textDocumentPosition(),
    forOriginalLocation: false,
  });
  for (const project of allProjects) {
    if (project !== defaultProject) {
      enqueueItem({
        project,
        uri: params.textDocumentURI(),
        position: params.textDocumentPosition(),
        forOriginalLocation: false,
      });
    }
  }

  while (true) {
    processPending();
    throwIfContextCancelled(context);
    if (firstError !== undefined) throw firstError;

    let hasMoreWork = false;
    if (defaultDefinition !== undefined) {
      const requestedProjectTrees = completeProjectIDs(results);
      for (const loadedProject of orchestrator.getProjectsLoadingProjectTree(context, requestedProjectTrees)) {
        throwIfContextCancelled(context);
        if (!canSearchProject(loadedProject) || loadedProject.getProgram() === undefined) continue;
        const item = itemForNonLocalDefinitionProject<LanguageService>(loadedProject, defaultDefinition);
        if (item !== undefined && enqueueItem(item)) {
          hasMoreWork = true;
        }
      }
    }

    if (!hasMoreWork) break;
  }

  const orderedResults = orderedCompleteResults(results, defaultProject, allProjects);
  if (results.size > 1) {
    return combineResults(orderedResults);
  }
  for (const result of orderedResults) {
    return result;
  }
  throw new Error("No complete cross-project response was produced");
}

function itemForNonLocalDefinitionProject<LanguageService>(
  project: Project,
  definition: NonLocalDefinition,
): ProjectAndTextDocumentPosition<LanguageService> | undefined {
  const definitionUri = definition.textDocumentURI();
  if (project.hasFile(documentUriFileName(definitionUri))) {
    return {
      project,
      uri: definitionUri,
      position: definition.textDocumentPosition(),
      forOriginalLocation: false,
    };
  }

  const sourcePosition = definition.getSourcePosition?.();
  if (sourcePosition !== undefined) {
    const sourceUri = sourcePosition.textDocumentURI();
    if (project.hasFile(documentUriFileName(sourceUri))) {
      return {
        project,
        uri: sourceUri,
        position: sourcePosition.textDocumentPosition(),
        forOriginalLocation: false,
      };
    }
  }

  const generatedPosition = definition.getGeneratedPosition?.();
  if (generatedPosition !== undefined) {
    const generatedUri = generatedPosition.textDocumentURI();
    if (project.hasFile(documentUriFileName(generatedUri))) {
      return {
        project,
        uri: generatedUri,
        position: generatedPosition.textDocumentPosition(),
        forOriginalLocation: false,
      };
    }
  }

  return undefined;
}

function completeProjectIDs<Response>(results: ReadonlyMap<Path, CrossProjectResponse<Response>>): ReadonlySet<Path> {
  const requestedProjectTrees = new Set<Path>();
  for (const [projectID, response] of results) {
    if (response.complete) {
      requestedProjectTrees.add(projectID);
    }
  }
  return requestedProjectTrees;
}

function orderedCompleteResults<Response>(
  results: ReadonlyMap<Path, CrossProjectResponse<Response>>,
  defaultProject: Project,
  allProjects: readonly Project[],
): readonly Response[] {
  const ordered: Response[] = [];
  const seenProjects = new Set<Path>();

  appendProjectResponse(ordered, seenProjects, results, defaultProject.id());
  for (const project of allProjects) {
    appendProjectResponse(ordered, seenProjects, results, project.id());
  }
  for (const [projectID, response] of results) {
    if (!response.forOriginalLocation) {
      appendProjectResponse(ordered, seenProjects, results, projectID);
    }
  }
  for (const [projectID, response] of results) {
    if (response.forOriginalLocation) {
      appendProjectResponse(ordered, seenProjects, results, projectID);
    }
  }

  return ordered;
}

function appendProjectResponse<Response>(
  ordered: Response[],
  seenProjects: Set<Path>,
  results: ReadonlyMap<Path, CrossProjectResponse<Response>>,
  projectID: Path,
): void {
  if (seenProjects.has(projectID)) return;
  seenProjects.add(projectID);
  const response = results.get(projectID);
  if (response !== undefined && response.complete && response.result !== undefined) {
    ordered.push(response.result);
  }
}

interface ContextWithError {
  readonly err?: () => Error | undefined;
}

function throwIfContextCancelled(context: unknown): void {
  if (context === undefined || context === null) return;
  const contextWithError = context as ContextWithError;
  const error = contextWithError.err?.();
  if (error !== undefined) throw error;
}

function combineLocationArray<T>(
  combined: T[],
  locations: readonly T[],
  seen: Set<string>,
  getLocation: (value: T) => Location,
): T[] {
  for (const location of locations) {
    const key = locationKey(getLocation(location));
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(location);
    }
  }
  return combined;
}

function combineResponseLocations(results: Iterable<{ readonly locations?: readonly Location[] }>): readonly Location[] {
  let combined: Location[] = [];
  const seenLocations = new Set<string>();
  for (const response of results) {
    if (response.locations !== undefined) {
      combined = combineLocationArray(combined, response.locations, seenLocations, location => location);
    }
  }
  return combined;
}

export function combineReferences(results: Iterable<ReferencesResponse>): ReferencesResponse {
  return { locations: combineResponseLocations(results) };
}

export function combineImplementations(results: Iterable<ImplementationResponse>): ImplementationResponse {
  const cachedResults = cacheIterable(results);
  for (const response of cachedResults) {
    if (response.locations !== undefined) {
      return { locations: combineResponseLocations(cachedResults) };
    }
  }

  let combined: LocationLink[] = [];
  const seenLocations = new Set<string>();
  for (const response of cachedResults) {
    if (response.definitionLinks !== undefined) {
      combined = combineLocationArray(combined, response.definitionLinks, seenLocations, locationFromLink);
    }
  }
  return { definitionLinks: combined };
}

export function combineRenameResponse(results: Iterable<RenameResponse>): RenameResponse {
  const combinedChanges: Record<string, TextEdit[]> = {};
  const seenChanges = new Map<DocumentUri, Set<string>>();
  const documentChanges: TextDocumentEditOrCreateFileOrRenameFileOrDeleteFile[] = [];
  const seenRenames = new Set<string>();
  let hasTextChanges = false;

  for (const response of results) {
    const workspaceEdit = response.workspaceEdit;
    if (workspaceEdit === undefined) continue;

    const responseDocumentChanges = workspaceEdit.documentChanges;
    if (responseDocumentChanges !== undefined) {
      for (const change of responseDocumentChanges) {
        const rename = change.renameFile;
        if (rename !== undefined) {
          const renameKey = `${rename.oldUri}\n${rename.newUri}`;
          if (!seenRenames.has(renameKey)) {
            seenRenames.add(renameKey);
            documentChanges.push(change);
          }
        } else {
          documentChanges.push(change);
        }
      }
    }

    const responseChanges = workspaceEdit.changes;
    if (responseChanges !== undefined) {
      for (const [documentUri, changes] of Object.entries(responseChanges)) {
        let seenForDocument = seenChanges.get(documentUri);
        if (seenForDocument === undefined) {
          seenForDocument = new Set<string>();
          seenChanges.set(documentUri, seenForDocument);
        }

        let changesForDocument = combinedChanges[documentUri];
        if (changesForDocument === undefined) {
          changesForDocument = [];
          combinedChanges[documentUri] = changesForDocument;
        }

        for (const change of changes) {
          const key = rangeKey(change.range);
          if (!seenForDocument.has(key)) {
            seenForDocument.add(key);
            changesForDocument.push(change);
            hasTextChanges = true;
          }
        }
      }
    }
  }

  if (documentChanges.length === 0 && !hasTextChanges) {
    return {};
  }
  if (documentChanges.length !== 0 && hasTextChanges) {
    return { workspaceEdit: { documentChanges, changes: combinedChanges } };
  }
  if (documentChanges.length !== 0) {
    return { workspaceEdit: { documentChanges } };
  }
  return { workspaceEdit: { changes: combinedChanges } };
}

export function combineIncomingCalls(
  results: Iterable<CallHierarchyIncomingCallsResponse>,
): CallHierarchyIncomingCallsResponse {
  const combined: CallHierarchyIncomingCall[] = [];
  const seenCalls = new Set<string>();
  for (const response of results) {
    const incomingCalls = response.callHierarchyIncomingCalls;
    if (incomingCalls === undefined) continue;
    for (const call of incomingCalls) {
      if (call.from === undefined) {
        throw new Error("CallHierarchyIncomingCall.from is required");
      }
      const key = locationKey({
        uri: call.from.uri,
        range: call.from.range,
      });
      if (!seenCalls.has(key)) {
        seenCalls.add(key);
        combined.push(call);
      }
    }
  }
  return { callHierarchyIncomingCalls: combined };
}

function cacheIterable<T>(results: Iterable<T>): readonly T[] {
  const cached: T[] = [];
  for (const result of results) {
    cached.push(result);
  }
  return cached;
}

function locationFromLink(link: LocationLink): Location {
  return {
    uri: link.targetUri,
    range: link.targetRange,
  };
}

function locationKey(location: Location): string {
  return `${location.uri}\n${rangeKey(location.range)}`;
}

function rangeKey(range: Range): string {
  return `${positionKey(range.start)}:${positionKey(range.end)}`;
}

function positionKey(position: Position): string {
  return `${position.line}:${position.character}`;
}
