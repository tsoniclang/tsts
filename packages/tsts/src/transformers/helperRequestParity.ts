/**
 * External helper request parity helpers.
 */

export type ExternalHelperName =
  | "extends"
  | "assign"
  | "rest"
  | "decorate"
  | "metadata"
  | "param"
  | "awaiter"
  | "asyncGenerator"
  | "asyncDelegator"
  | "asyncValues"
  | "exportStar"
  | "importStar"
  | "importDefault"
  | "makeTemplateObject"
  | "classPrivateFieldGet"
  | "classPrivateFieldSet"
  | "classPrivateFieldIn"
  | "setFunctionName"
  | "propKey"
  | "disposeResources";

export interface ExternalHelperRequest {
  readonly name: ExternalHelperName;
  readonly priority: number;
}

export interface ExternalHelperRequestSet {
  readonly requests: Map<ExternalHelperName, ExternalHelperRequest>;
}

export function createExternalHelperRequestSet(): ExternalHelperRequestSet {
  return { requests: new Map() };
}

export function requestExternalHelper(set: ExternalHelperRequestSet, name: ExternalHelperName, priority = helperPriority(name)): void {
  const existing = set.requests.get(name);
  if (existing === undefined || priority > existing.priority) set.requests.set(name, { name, priority });
}

export function helperRequestsInEmitOrder(set: ExternalHelperRequestSet): readonly ExternalHelperRequest[] {
  return [...set.requests.values()].sort((left, right) => right.priority - left.priority || left.name.localeCompare(right.name));
}

export function helperModuleImports(set: ExternalHelperRequestSet): readonly string[] {
  return helperRequestsInEmitOrder(set).map(request => `__${request.name}`);
}

export function mergeHelperRequests(target: ExternalHelperRequestSet, source: ExternalHelperRequestSet): void {
  for (const request of source.requests.values()) requestExternalHelper(target, request.name, request.priority);
}

export function helperPriority(name: ExternalHelperName): number {
  if (name === "extends") return 100;
  if (name === "decorate" || name === "metadata" || name === "param") return 90;
  if (name.startsWith("async")) return 80;
  if (name.startsWith("classPrivate")) return 70;
  if (name.startsWith("import") || name.startsWith("export")) return 60;
  return 50;
}
