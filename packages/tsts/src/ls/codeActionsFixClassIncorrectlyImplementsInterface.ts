/**
 * Code fix for classes that incorrectly implement an interface/class.
 *
 * Port of TS-Go `internal/ls/codeactions_fixclassincorrectlyimplementsinterface.go`.
 */

import {
  Kind,
  SymbolFlags,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import type { Type } from "../checker/types.js";
import { TextRange } from "../core/index.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import { formatDiagnosticMessage } from "../diagnostics/loc.generated.js";
import { ModifierFlags } from "../enums/index.js";
import type { TextEdit } from "../lsp/lsproto/index.js";
import { getAllDiagnostics } from "./diagnostics.js";
import {
  type CodeAction,
  type CodeActionLanguageService,
  type CodeActionProgram,
  type CodeActionSourceFile,
  type CodeFixContext,
  type CodeFixProvider,
  type CombinedCodeActions,
  containsErrorCode,
} from "./codeActions.js";

export const fixClassIncorrectlyImplementsInterfaceFixID = "fixClassIncorrectlyImplementsInterface";

export const fixClassIncorrectlyImplementsInterfaceErrorCodes: readonly number[] = [
  Diagnostics.Class_0_incorrectly_implements_interface_1.code,
  Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass.code,
];

export interface ImplementsInterfaceSourceFile extends CodeActionSourceFile {
  readonly root?: AstNode;
}

export interface ImplementsInterfaceChecker {
  getTypeAtLocation(node: AstNode): Type | undefined;
  getPropertiesOfType(type: Type | undefined): readonly AstSymbol[];
  getNumberIndexType?(type: Type | undefined): Type | undefined;
  getStringIndexType?(type: Type | undefined): Type | undefined;
  getNumberType?(): Type;
  getStringType?(): Type;
  getDeclarationModifierFlagsFromSymbol?(symbol: AstSymbol): ModifierFlags;
}

export interface ImplementsInterfaceProgram<TFile extends ImplementsInterfaceSourceFile = ImplementsInterfaceSourceFile>
  extends CodeActionProgram<TFile> {
  getTypeCheckerForFile?(file: TFile): readonly [ImplementsInterfaceChecker, () => void];
}

export interface ImplementsInterfaceChangeTracker<TFile extends ImplementsInterfaceSourceFile = ImplementsInterfaceSourceFile> {
  insertMemberAtStart(sourceFile: TFile, classDeclaration: AstNode, member: AstNode): void;
  insertNodeAfter(sourceFile: TFile, after: AstNode, member: AstNode): void;
  getChanges(): ReadonlyMap<string, readonly TextEdit[]> | Readonly<Record<string, readonly TextEdit[]>>;
}

export interface ImplementsInterfaceImportAdder {
  hasFixes(): boolean;
  edits(): readonly TextEdit[];
}

export interface MissingMemberFixer {
  createIndexSignatureDeclarationFromType(classDeclaration: AstNode, implementedType: Type | undefined, indexType: Type | undefined): AstNode | undefined;
  createMemberFromSymbol(symbol: AstSymbol, classDeclaration: AstNode, sourceFile: SourceFile | CodeActionSourceFile, body: AstNode | undefined): readonly AstNode[];
}

export interface ImplementsInterfaceLanguageService<
  TProgram extends ImplementsInterfaceProgram<TFile> = ImplementsInterfaceProgram,
  TFile extends ImplementsInterfaceSourceFile = ImplementsInterfaceSourceFile,
> extends CodeActionLanguageService<TProgram, TFile> {
  createChangeTracker(fixContext: CodeFixContext<TProgram, TFile>): ImplementsInterfaceChangeTracker<TFile>;
  createMissingMemberFixer(
    fixContext: CodeFixContext<TProgram, TFile>,
    changeTracker: ImplementsInterfaceChangeTracker<TFile>,
    typeChecker: ImplementsInterfaceChecker,
    importAdder: ImplementsInterfaceImportAdder | undefined,
  ): MissingMemberFixer;
  createImportAdder?(fixContext: CodeFixContext<TProgram, TFile>, typeChecker: ImplementsInterfaceChecker): ImplementsInterfaceImportAdder | undefined;
}

export const fixClassIncorrectlyImplementsInterfaceProvider:
  CodeFixProvider<ImplementsInterfaceProgram, ImplementsInterfaceSourceFile> = {
    errorCodes: fixClassIncorrectlyImplementsInterfaceErrorCodes,
    getCodeActions: getCodeActionsToFixClassIncorrectlyImplementsInterface,
    fixIds: [fixClassIncorrectlyImplementsInterfaceFixID],
    getAllCodeActions: getAllCodeActionsToFixClassIncorrectlyImplementsInterface,
  };

export function getCodeActionsToFixClassIncorrectlyImplementsInterface<
  TProgram extends ImplementsInterfaceProgram<TFile>,
  TFile extends ImplementsInterfaceSourceFile,
>(fixContext: CodeFixContext<TProgram, TFile>): readonly CodeAction[] {
  const classDeclaration = getClass(fixContext.sourceFile, fixContext.span);
  if (classDeclaration === undefined) return [];

  const implementsTypes = getImplementsTypeNodes(classDeclaration);
  const [typeChecker, done] = getTypeChecker(fixContext);
  try {
    const actions: CodeAction[] = [];
    for (const implementedTypeNode of implementsTypes) {
      const changeTracker = getImplementsLanguageService(fixContext).createChangeTracker(fixContext);
      const importAdder = createImportAdder(fixContext, typeChecker);
      addChanges(fixContext, changeTracker, importAdder, typeChecker, classDeclaration, implementedTypeNode);
      const changes = getChanges(changeTracker, importAdder, fixContext.sourceFile);
      if (changes.length === 0) continue;
      actions.push({
        description: formatDiagnosticMessage(Diagnostics.Implement_interface_0, textOfNode(implementedTypeNode)),
        changes,
        fixId: fixClassIncorrectlyImplementsInterfaceFixID,
        fixAllDescription: formatDiagnosticMessage(Diagnostics.Implement_all_unimplemented_interfaces),
      });
    }
    return actions;
  } finally {
    done();
  }
}

export function getAllCodeActionsToFixClassIncorrectlyImplementsInterface<
  TProgram extends ImplementsInterfaceProgram<TFile>,
  TFile extends ImplementsInterfaceSourceFile,
>(fixContext: CodeFixContext<TProgram, TFile>): CombinedCodeActions | undefined {
  const [typeChecker, done] = getTypeChecker(fixContext);
  try {
    const changeTracker = getImplementsLanguageService(fixContext).createChangeTracker(fixContext);
    const importAdder = createImportAdder(fixContext, typeChecker);
    const seenClassDeclarations = new Set<AstNode>();

    for (const diagnostic of getAllDiagnostics(fixContext.program, fixContext.sourceFile)) {
      if (!containsErrorCode(fixClassIncorrectlyImplementsInterfaceErrorCodes, diagnostic.code)) continue;
      const start = diagnostic.start ?? 0;
      const classDeclaration = getClass(fixContext.sourceFile, new TextRange(start, start + (diagnostic.length ?? 0)));
      if (classDeclaration === undefined || seenClassDeclarations.has(classDeclaration)) continue;
      seenClassDeclarations.add(classDeclaration);
      for (const implementedTypeNode of getImplementsTypeNodes(classDeclaration)) {
        addChanges(fixContext, changeTracker, importAdder, typeChecker, classDeclaration, implementedTypeNode);
      }
    }

    const changes = getChanges(changeTracker, importAdder, fixContext.sourceFile);
    if (changes.length === 0) return undefined;
    return {
      description: formatDiagnosticMessage(Diagnostics.Implement_all_unimplemented_interfaces),
      changes,
    };
  } finally {
    done();
  }
}

export function addChanges<
  TProgram extends ImplementsInterfaceProgram<TFile>,
  TFile extends ImplementsInterfaceSourceFile,
>(
  fixContext: CodeFixContext<TProgram, TFile>,
  changeTracker: ImplementsInterfaceChangeTracker<TFile>,
  importAdder: ImplementsInterfaceImportAdder | undefined,
  typeChecker: ImplementsInterfaceChecker,
  classDeclaration: AstNode,
  implementedTypeNode: AstNode,
): void {
  const service = getImplementsLanguageService(fixContext);
  const missingMemberFixer = service.createMissingMemberFixer(fixContext, changeTracker, typeChecker, importAdder);
  const constructor = getConstructor(classDeclaration);
  const implementedType = typeChecker.getTypeAtLocation(implementedTypeNode);
  const classType = typeChecker.getTypeAtLocation(classDeclaration);

  if (typeChecker.getNumberIndexType?.(classType) === undefined) {
    const member = missingMemberFixer.createIndexSignatureDeclarationFromType(classDeclaration, implementedType, typeChecker.getNumberType?.());
    if (member !== undefined) insertInterfaceMemberNode(changeTracker, fixContext.sourceFile, classDeclaration, constructor, member);
  }

  if (typeChecker.getStringIndexType?.(classType) === undefined) {
    const member = missingMemberFixer.createIndexSignatureDeclarationFromType(classDeclaration, implementedType, typeChecker.getStringType?.());
    if (member !== undefined) insertInterfaceMemberNode(changeTracker, fixContext.sourceFile, classDeclaration, constructor, member);
  }

  for (const member of getMissingMembers(typeChecker, classDeclaration, implementedType === undefined ? [] : [implementedType])) {
    for (const memberNode of missingMemberFixer.createMemberFromSymbol(member, classDeclaration, fixContext.sourceFile, undefined)) {
      insertInterfaceMemberNode(changeTracker, fixContext.sourceFile, classDeclaration, constructor, memberNode);
    }
  }
}

export function getChanges<TFile extends ImplementsInterfaceSourceFile>(
  changeTracker: ImplementsInterfaceChangeTracker<TFile>,
  importAdder: ImplementsInterfaceImportAdder | undefined,
  sourceFile: TFile,
): readonly TextEdit[] {
  const changes = changeTracker.getChanges();
  const fileChanges = fileChangesFor(changes, sourceFile.fileName);
  return importAdder?.hasFixes() === true ? [...fileChanges, ...importAdder.edits()] : fileChanges;
}

export function insertInterfaceMemberNode<TFile extends ImplementsInterfaceSourceFile>(
  changeTracker: ImplementsInterfaceChangeTracker<TFile>,
  sourceFile: TFile,
  classDeclaration: AstNode,
  constructor: AstNode | undefined,
  member: AstNode,
): void {
  if (constructor === undefined) {
    changeTracker.insertMemberAtStart(sourceFile, classDeclaration, member);
  } else {
    changeTracker.insertNodeAfter(sourceFile, constructor, member);
  }
}

export function getClass(sourceFile: ImplementsInterfaceSourceFile, span: TextRange | undefined): AstNode | undefined {
  if (span === undefined || sourceFile.root === undefined) return undefined;
  const token = getTokenAtPosition(sourceFile.root, span.pos);
  let current: AstNode | undefined = token;
  while (current !== undefined) {
    if (current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression) return current;
    current = current.parent;
  }
  return undefined;
}

export function getConstructor(classDeclaration: AstNode | undefined): AstNode | undefined {
  for (const member of classMembers(classDeclaration)) {
    if (member.kind === Kind.Constructor) return member;
  }
  return undefined;
}

export function getMissingMembers(
  typeChecker: ImplementsInterfaceChecker,
  classDeclaration: AstNode,
  implementedTypes: readonly Type[],
): readonly AstSymbol[] {
  const inheritedMembers = getInheritedMembers(typeChecker, classDeclaration);
  const seenMembers = new Set<string>();
  const classMembersTable = classDeclaration.symbol?.members;
  const missingMembers: AstSymbol[] = [];

  for (const implementedType of implementedTypes) {
    for (const symbol of typeChecker.getPropertiesOfType(implementedType)) {
      const name = symbolName(symbol);
      if (name === "") continue;
      if (classMembersTable?.has(name) === true) continue;
      if (inheritedMembers.has(name) || seenMembers.has(name)) continue;
      const flags = declarationModifierFlags(typeChecker, symbol);
      if ((flags & ModifierFlags.Private) === 0) {
        seenMembers.add(name);
        missingMembers.push(symbol);
      }
    }
  }
  return missingMembers;
}

export function getInheritedMembers(typeChecker: ImplementsInterfaceChecker, classDeclaration: AstNode): ReadonlyMap<string, AstSymbol> {
  const typeNode = getClassExtendsHeritageElement(classDeclaration);
  if (typeNode === undefined) return new Map<string, AstSymbol>();

  const baseType = typeChecker.getTypeAtLocation(typeNode);
  if (baseType === undefined) return new Map<string, AstSymbol>();

  const inheritedMembers = new Map<string, AstSymbol>();
  for (const symbol of typeChecker.getPropertiesOfType(baseType)) {
    const name = symbolName(symbol);
    if (name === "") continue;
    const flags = declarationModifierFlags(typeChecker, symbol);
    if ((flags & ModifierFlags.Private) === 0) inheritedMembers.set(name, symbol);
  }
  return inheritedMembers;
}

export function createImportAdder<
  TProgram extends ImplementsInterfaceProgram<TFile>,
  TFile extends ImplementsInterfaceSourceFile,
>(
  fixContext: CodeFixContext<TProgram, TFile>,
  typeChecker: ImplementsInterfaceChecker,
): ImplementsInterfaceImportAdder | undefined {
  return getImplementsLanguageService(fixContext).createImportAdder?.(fixContext, typeChecker);
}

function getImplementsLanguageService<
  TProgram extends ImplementsInterfaceProgram<TFile>,
  TFile extends ImplementsInterfaceSourceFile,
>(fixContext: CodeFixContext<TProgram, TFile>): ImplementsInterfaceLanguageService<TProgram, TFile> {
  const service = fixContext.languageService as CodeActionLanguageService<TProgram, TFile> & Partial<ImplementsInterfaceLanguageService<TProgram, TFile>>;
  if (service.createChangeTracker === undefined || service.createMissingMemberFixer === undefined) {
    throw new Error("fixClassIncorrectlyImplementsInterface requires LS change-tracker and missing-member services");
  }
  return service as ImplementsInterfaceLanguageService<TProgram, TFile>;
}

function fileChangesFor(
  changes: ReadonlyMap<string, readonly TextEdit[]> | Readonly<Record<string, readonly TextEdit[]>>,
  fileName: string,
): readonly TextEdit[] {
  if (changes instanceof Map) return changes.get(fileName) ?? [];
  const record = changes as Readonly<Record<string, readonly TextEdit[]>>;
  return record[fileName] ?? [];
}

function getTypeChecker<
  TProgram extends ImplementsInterfaceProgram<TFile>,
  TFile extends ImplementsInterfaceSourceFile,
>(fixContext: CodeFixContext<TProgram, TFile>): readonly [ImplementsInterfaceChecker, () => void] {
  const checkerLease = fixContext.program.getTypeCheckerForFile?.(fixContext.sourceFile);
  if (checkerLease === undefined) {
    throw new Error("fixClassIncorrectlyImplementsInterface requires a program type checker");
  }
  return checkerLease;
}

function getTokenAtPosition(root: AstNode, position: number): AstNode | undefined {
  let best: AstNode | undefined;
  walk(root, node => {
    if (node.pos <= position && position < node.end) {
      best = node;
      return true;
    }
    return false;
  });
  return best;
}

function walk(node: AstNode, visit: (node: AstNode) => boolean): void {
  if (!visit(node)) return;
  node.forEachChild(child => {
    walk(child, visit);
    return false;
  });
}

function classMembers(classDeclaration: AstNode | undefined): readonly AstNode[] {
  return (classDeclaration as { readonly members?: readonly AstNode[] } | undefined)?.members ?? [];
}

function getImplementsTypeNodes(classDeclaration: AstNode): readonly AstNode[] {
  const heritageClauses = (classDeclaration as { readonly heritageClauses?: readonly AstNode[] }).heritageClauses ?? [];
  const result: AstNode[] = [];
  for (const clause of heritageClauses) {
    if ((clause as { readonly token?: Kind }).token === Kind.ImplementsKeyword) {
      result.push(...((clause as { readonly types?: readonly AstNode[] }).types ?? []));
    }
  }
  return result;
}

function getClassExtendsHeritageElement(classDeclaration: AstNode): AstNode | undefined {
  const heritageClauses = (classDeclaration as { readonly heritageClauses?: readonly AstNode[] }).heritageClauses ?? [];
  for (const clause of heritageClauses) {
    if ((clause as { readonly token?: Kind }).token === Kind.ExtendsKeyword) {
      return ((clause as { readonly types?: readonly AstNode[] }).types ?? [])[0];
    }
  }
  return undefined;
}

function declarationModifierFlags(typeChecker: ImplementsInterfaceChecker, symbol: AstSymbol): ModifierFlags {
  const direct = typeChecker.getDeclarationModifierFlagsFromSymbol?.(symbol);
  if (direct !== undefined) return direct;
  let flags = ModifierFlags.None;
  for (const declaration of symbol.declarations) {
    flags |= (declaration as { readonly modifierFlags?: ModifierFlags }).modifierFlags ?? ModifierFlags.None;
  }
  return flags;
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function textOfNode(node: AstNode): string {
  return (node as { readonly text?: string }).text ?? "";
}
