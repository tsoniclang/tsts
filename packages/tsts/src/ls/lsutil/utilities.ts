import {
  Kind,
  KindNames,
  NodeFlags,
  getECMALineOfPosition,
  isKeywordKind,
  isStringLiteral,
  nodeIsSynthesized,
  sourceFileText,
  type Node,
  type SourceFile,
  type StringLiteral,
  type Symbol,
} from "../../ast/index.js";
import {
  LanguageVariant,
  Tristate,
  exclusivelyPrefixedNodeCoreModules,
  nodeCoreModules,
  type Tristate as TristateValue,
} from "../../core/index.js";
import { isIdentifierPartCodePoint, isIdentifierStartCodePoint } from "../../scanner/index.js";
import { TokenFlags } from "../../scanner/tokenFlags.js";
import { stripQuotes } from "../../stringutil/index.js";
import { getBaseFileName, removeFileExtension } from "../../tspath/index.js";
import {
  syntaxRequiresTrailingCommaOrSemicolonOrASI,
  syntaxRequiresTrailingSemicolonOrASI,
} from "./asi.js";
import { getLastToken, skipTrivia } from "./children.js";
import {
  QuotePreferenceDouble,
  QuotePreferenceSingle,
  type QuotePreference,
  type UserPreferences,
} from "./userpreferences.js";

export interface UriStyleNodeCoreModuleProgram {
  usesUriStyleNodeCoreModules(): TristateValue;
}

export function probablyUsesSemicolons(file: SourceFile): boolean {
  let withSemicolon = 0;
  let withoutSemicolon = 0;
  const nStatementsToObserve = 5;

  const visit = (node: Node): boolean | undefined => {
    if ((node.flags & NodeFlags.Reparsed) !== 0) {
      return false;
    }
    if (syntaxRequiresTrailingSemicolonOrASI(node.kind)) {
      const lastToken = getLastToken(node, file);
      if (lastToken !== undefined && lastToken.kind === Kind.SemicolonToken) {
        withSemicolon += 1;
      } else {
        withoutSemicolon += 1;
      }
    } else if (syntaxRequiresTrailingCommaOrSemicolonOrASI(node.kind)) {
      const lastToken = getLastToken(node, file);
      if (lastToken !== undefined && lastToken.kind === Kind.SemicolonToken) {
        withSemicolon += 1;
      } else if (lastToken !== undefined && lastToken.kind !== Kind.CommaToken) {
        const text = sourceFileText(file);
        const lastTokenLine = getECMALineOfPosition(file, lastToken.pos);
        const nextTokenLine = getECMALineOfPosition(file, skipTrivia(text, lastToken.end, text.length));
        if (lastTokenLine !== nextTokenLine) {
          withoutSemicolon += 1;
        }
      }
    }

    if (withSemicolon + withoutSemicolon >= nStatementsToObserve) {
      return true;
    }

    return node.forEachChild(visit);
  };

  file.forEachChild(visit);

  if (withSemicolon === 0 && withoutSemicolon <= 1) {
    return true;
  }
  if (withoutSemicolon === 0) {
    return true;
  }
  return withSemicolon * nStatementsToObserve > withoutSemicolon;
}

export function shouldUseUriStyleNodeCoreModules(
  file: SourceFile,
  program: UriStyleNodeCoreModuleProgram,
): TristateValue {
  for (const node of file.imports) {
    if (!isStringLiteral(node)) continue;
    const text = node.text;
    if (nodeCoreModules().has(text) && !exclusivelyPrefixedNodeCoreModules.has(text)) {
      if (text.startsWith("node:")) {
        return Tristate.True;
      }
      return Tristate.False;
    }
  }

  return program.usesUriStyleNodeCoreModules();
}

export function quotePreferenceFromString(str: StringLiteral): QuotePreference {
  if ((str.tokenFlags & TokenFlags.SingleQuote) !== 0) {
    return QuotePreferenceSingle;
  }
  return QuotePreferenceDouble;
}

export function getQuotePreference(sourceFile: SourceFile, preferences: UserPreferences): QuotePreference {
  if (preferences.quotePreference !== undefined && preferences.quotePreference !== "" && preferences.quotePreference !== "auto") {
    if (preferences.quotePreference === "single") {
      return QuotePreferenceSingle;
    }
    return QuotePreferenceDouble;
  }

  const firstModuleSpecifier = sourceFile.imports.find((node) => {
    if (!isStringLiteral(node)) return false;
    const parent = node.parent;
    return parent === undefined || !nodeIsSynthesized(parent);
  });

  if (firstModuleSpecifier !== undefined && isStringLiteral(firstModuleSpecifier)) {
    return quotePreferenceFromString(firstModuleSpecifier);
  }
  return QuotePreferenceDouble;
}

export function moduleSymbolToValidIdentifier(moduleSymbol: Symbol, forceCapitalize: boolean): string {
  return moduleSpecifierToValidIdentifier(stripQuotes(moduleSymbol.name ?? moduleSymbol.escapedName ?? ""), forceCapitalize);
}

export function moduleSpecifierToValidIdentifier(moduleSpecifier: string, forceCapitalize: boolean): string {
  const baseName = getBaseFileName(removeTrailingIndex(removeFileExtension(moduleSpecifier)));
  const result: string[] = [];
  let lastCharWasValid = true;
  const baseNameChars = Array.from(baseName);

  if (baseNameChars.length > 0 && isIdentifierStart(baseNameChars[0]!)) {
    if (forceCapitalize) {
      result.push(baseNameChars[0]!.toLocaleUpperCase());
    } else {
      result.push(baseNameChars[0]!);
    }
  } else {
    lastCharWasValid = false;
  }

  for (let index = 1; index < baseNameChars.length; index += 1) {
    const ch = baseNameChars[index]!;
    const isValid = isIdentifierPart(ch);
    if (isValid) {
      if (!lastCharWasValid) {
        result.push(ch.toLocaleUpperCase());
      } else {
        result.push(ch);
      }
    }
    lastCharWasValid = isValid;
  }

  const resultText = result.join("");
  if (resultText !== "" && !isNonContextualKeyword(stringToToken(resultText))) {
    return resultText;
  }
  return `_${resultText}`;
}

export function isNonContextualKeyword(token: Kind | undefined): boolean {
  return token !== undefined && isKeywordKind(token) && !isContextualKeyword(token);
}

function removeTrailingIndex(path: string): string {
  return path.endsWith("/index") ? path.slice(0, -"/index".length) : path;
}

function isIdentifierStart(ch: string): boolean {
  return isIdentifierStartCodePoint(ch.codePointAt(0) ?? -1);
}

function isIdentifierPart(ch: string): boolean {
  return isIdentifierPartCodePoint(ch.codePointAt(0) ?? -1, LanguageVariant.Standard);
}

function isContextualKeyword(kind: Kind): boolean {
  return kind >= Kind.FirstContextualKeyword && kind <= Kind.LastContextualKeyword;
}

function stringToToken(text: string): Kind | undefined {
  return keywordTokenMap().get(text);
}

let cachedKeywordTokenMap: ReadonlyMap<string, Kind> | undefined;

function keywordTokenMap(): ReadonlyMap<string, Kind> {
  if (cachedKeywordTokenMap === undefined) {
    const entries: [string, Kind][] = [];
    for (let kind = Kind.FirstKeyword; kind <= Kind.LastKeyword; kind += 1) {
      const name = KindNames[kind];
      if (name === undefined || !name.endsWith("Keyword")) continue;
      entries.push([name.slice(0, -"Keyword".length).toLowerCase(), kind]);
    }
    cachedKeywordTokenMap = new Map(entries);
  }
  return cachedKeywordTokenMap;
}
