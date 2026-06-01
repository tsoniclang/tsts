import {
  Kind,
  getCombinedModifierFlags,
  hasModifier,
  nodeName,
  type Node,
  type SourceFile,
  type Symbol,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import {
  CodeLensKindImplementations,
  CodeLensKindReferences,
  type CodeLens,
  type CodeLensKind,
  type CodeLensResponse,
  type DocumentUri,
  type ImplementationParams,
  type Location,
  type Position,
  type ReferenceParams,
} from "../lsp/lsproto/index.js";
import { skipTrivia } from "../scanner/index.js";
import {
  defaultCodeLensUserPreferences,
  type CodeLensUserPreferences,
} from "./lsutil/index.js";

export interface CodeLensConverters {
  positionToLineAndCharacter(file: SourceFile, position: number): Position;
}

export interface CodeLensLanguageService {
  readonly converters: CodeLensConverters;
  getProgramAndFile(documentUri: DocumentUri): readonly [unknown, SourceFile];
  userPreferences(): { readonly codeLens?: CodeLensUserPreferences };
}

export interface CodeLensResolver {
  provideReferences(params: ReferenceParams): readonly Location[];
  provideImplementations(params: ImplementationParams): readonly Location[];
  showLocationsCommandName?: string;
}

export function provideCodeLenses(
  service: CodeLensLanguageService,
  documentUri: DocumentUri,
): CodeLensResponse {
  const [, file] = service.getProgramAndFile(documentUri);
  const userPrefs = service.userPreferences().codeLens ?? defaultCodeLensUserPreferences();
  if (!userPrefs.referencesCodeLensEnabled.isTrue() && !userPrefs.implementationsCodeLensEnabled.isTrue()) {
    return {};
  }

  let lastSymbol: Symbol | undefined;
  const result: CodeLens[] = [];
  const visit = (node: Node): boolean | undefined => {
    const currentSymbol = node.symbol;
    if (lastSymbol !== currentSymbol) {
      lastSymbol = currentSymbol;

      if (userPrefs.referencesCodeLensEnabled.isTrue() && isValidReferenceLensNode(node, userPrefs)) {
        result.push(newCodeLensForNode(service, documentUri, file, node, CodeLensKindReferences));
      }

      if (userPrefs.implementationsCodeLensEnabled.isTrue() && isValidImplementationsCodeLensNode(node, userPrefs)) {
        result.push(newCodeLensForNode(service, documentUri, file, node, CodeLensKindImplementations));
      }
    }

    const savedLastSymbol = lastSymbol;
    node.forEachChild(visit);
    lastSymbol = savedLastSymbol;
    return false;
  };

  visit(file);

  return { codeLenses: result };
}

export function resolveCodeLens(
  resolver: CodeLensResolver,
  codeLens: CodeLens,
): CodeLens {
  const data = codeLens.data;
  if (data === undefined) {
    throw new Error("CodeLens data is required for resolution");
  }

  const textDocument = { uri: data.uri };
  let locations: readonly Location[] = [];
  let lensTitle = "";

  if (data.kind === CodeLensKindReferences) {
    locations = resolver.provideReferences({
      textDocument,
      position: codeLens.range.start,
      context: { includeDeclaration: false },
    });
    lensTitle = locations.length === 1 ? "1 reference" : `${locations.length} references`;
  } else if (data.kind === CodeLensKindImplementations) {
    locations = resolver.provideImplementations({
      textDocument,
      position: codeLens.range.start,
    });
    lensTitle = locations.length === 1 ? "1 implementation" : `${locations.length} implementations`;
  }

  const commandName = resolver.showLocationsCommandName;
  const command = commandName !== undefined && locations.length > 0
    ? {
        title: lensTitle,
        command: commandName,
        arguments: [data.uri, codeLens.range.start, locations],
      }
    : {
        title: lensTitle,
        command: "",
      };

  return {
    ...codeLens,
    command,
  };
}

export function newCodeLensForNode(
  service: Pick<CodeLensLanguageService, "converters">,
  fileUri: DocumentUri,
  file: SourceFile,
  node: Node,
  kind: CodeLensKind,
): CodeLens {
  const name = nodeName(node);
  const nodeForRange = name ?? node;
  const pos = skipTrivia(file.text, nodeForRange.pos);

  return {
    range: {
      start: service.converters.positionToLineAndCharacter(file, pos),
      end: service.converters.positionToLineAndCharacter(file, node.end),
    },
    data: {
      kind,
      uri: fileUri,
    },
  };
}

export function isValidImplementationsCodeLensNode(
  node: Node,
  userPrefs: CodeLensUserPreferences,
): boolean {
  const parent = nodeParent(node);
  switch (node.kind) {
    case Kind.InterfaceDeclaration:
      return true;

    case Kind.MethodSignature:
      return userPrefs.implementationsCodeLensShowOnInterfaceMethods.isTrue()
        && parent?.kind === Kind.InterfaceDeclaration;

    case Kind.MethodDeclaration:
      if (userPrefs.implementationsCodeLensShowOnAllClassMethods.isTrue() && parent?.kind === Kind.ClassDeclaration) {
        const name = nodeName(node);
        return !hasModifier(node, ModifierFlags.Private) && name?.kind !== Kind.PrivateIdentifier;
      }
      return hasModifier(node, ModifierFlags.Abstract);

    case Kind.ClassDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.PropertyDeclaration:
      return hasModifier(node, ModifierFlags.Abstract);
  }

  return false;
}

export function isValidReferenceLensNode(
  node: Node,
  userPrefs: CodeLensUserPreferences,
): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
      if (userPrefs.referencesCodeLensShowOnAllFunctions.isTrue()) {
        return true;
      }
      return (getCombinedModifierFlags(node) & ModifierFlags.Export) !== 0;

    case Kind.VariableDeclaration:
      return (getCombinedModifierFlags(node) & ModifierFlags.Export) !== 0;

    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.EnumMember:
      return true;

    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature: {
      const parent = nodeParent(node);
      return parent?.kind === Kind.ClassDeclaration
        || parent?.kind === Kind.InterfaceDeclaration
        || parent?.kind === Kind.TypeLiteral;
    }
  }

  return false;
}

function nodeParent(node: Node): Node | undefined {
  return node.parent === undefined ? undefined : node.parent;
}
