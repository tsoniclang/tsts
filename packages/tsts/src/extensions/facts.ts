/**
 * ExtensionFacts — the canonical sidecar fact store.
 *
 * Facts are NOT stored as physical fields on AST nodes (that would change the
 * TS-Go AST object shape and create parity/snapshot noise). Instead each fact
 * lives in an instance-keyed sidecar map owned by one Program:
 *
 *   - Node / Symbol / Type / SourceFile facts → WeakMap (GC-friendly, identity)
 *   - Program facts                            → plain Map (single program key)
 *
 * Each store is a two-level map: instance → (factKey → value). Keys are
 * `ExtensionFactKey` objects compared by reference, so namespaces never collide
 * across extensions and a re-run that re-sets a key REPLACES (never appends).
 *
 * No serialization in v1 (see spec "Fact Serialization": optional, explicit,
 * never required for normal compilation).
 */

import type { Node, SourceFile, Symbol as AstSymbol } from "../ast/index.js";
import type { Type } from "../checker/types.js";
import type { Diagnostic } from "../diagnostics/types.js";
import type { ExtensionFactKey } from "./factKeys.js";

/**
 * The sidecar fact store for one Program. Reads return `undefined` when no
 * fact was set; writes replace any prior value for that (instance, key) pair.
 */
export interface ExtensionFacts {
  getNodeFact<T>(node: Node, key: ExtensionFactKey<T>): T | undefined;
  setNodeFact<T>(node: Node, key: ExtensionFactKey<T>, value: T): void;
  hasNodeFact<T>(node: Node, key: ExtensionFactKey<T>): boolean;

  getSymbolFact<T>(symbol: AstSymbol, key: ExtensionFactKey<T>): T | undefined;
  setSymbolFact<T>(symbol: AstSymbol, key: ExtensionFactKey<T>, value: T): void;

  getTypeFact<T>(type: Type, key: ExtensionFactKey<T>): T | undefined;
  setTypeFact<T>(type: Type, key: ExtensionFactKey<T>, value: T): void;

  getSourceFileFact<T>(sourceFile: SourceFile, key: ExtensionFactKey<T>): T | undefined;
  setSourceFileFact<T>(sourceFile: SourceFile, key: ExtensionFactKey<T>, value: T): void;

  getProgramFact<T>(key: ExtensionFactKey<T>): T | undefined;
  setProgramFact<T>(key: ExtensionFactKey<T>, value: T): void;

  appendDiagnostic(diagnostic: Diagnostic): void;
  diagnostics(): readonly Diagnostic[];
}

/** Per-instance fact bucket: a fact-key → value map for one node/symbol/type/file. */
type FactBucket = Map<ExtensionFactKey<unknown>, unknown>;

function readBucketFact<T>(bucket: FactBucket | undefined, key: ExtensionFactKey<T>): T | undefined {
  if (bucket === undefined) return undefined;
  if (!bucket.has(key as ExtensionFactKey<unknown>)) return undefined;
  return bucket.get(key as ExtensionFactKey<unknown>) as T;
}

function writeWeakFact<K extends object, T>(
  store: WeakMap<K, FactBucket>,
  instance: K,
  key: ExtensionFactKey<T>,
  value: T,
): void {
  const existing = store.get(instance);
  if (existing === undefined) {
    store.set(instance, new Map<ExtensionFactKey<unknown>, unknown>([[key as ExtensionFactKey<unknown>, value]]));
    return;
  }
  // Replace-in-place semantics: a re-run overwrites the owned fact rather than
  // appending a duplicate (spec "Error Handling": hooks are idempotent).
  existing.set(key as ExtensionFactKey<unknown>, value);
}

/**
 * Build a fresh fact store. One instance is created per Program; the WeakMaps
 * keep no strong references to compiler objects so facts are collected with
 * the nodes/symbols/types/files they annotate.
 */
export function createExtensionFacts(): ExtensionFacts {
  const nodeFacts = new WeakMap<Node, FactBucket>();
  const symbolFacts = new WeakMap<AstSymbol, FactBucket>();
  const typeFacts = new WeakMap<Type, FactBucket>();
  const sourceFileFacts = new WeakMap<SourceFile, FactBucket>();
  const programFacts: FactBucket = new Map<ExtensionFactKey<unknown>, unknown>();
  const diagnosticList: Diagnostic[] = [];

  return {
    getNodeFact<T>(node: Node, key: ExtensionFactKey<T>): T | undefined {
      return readBucketFact(nodeFacts.get(node), key);
    },
    setNodeFact<T>(node: Node, key: ExtensionFactKey<T>, value: T): void {
      writeWeakFact(nodeFacts, node, key, value);
    },
    hasNodeFact<T>(node: Node, key: ExtensionFactKey<T>): boolean {
      const bucket = nodeFacts.get(node);
      return bucket !== undefined && bucket.has(key as ExtensionFactKey<unknown>);
    },

    getSymbolFact<T>(symbol: AstSymbol, key: ExtensionFactKey<T>): T | undefined {
      return readBucketFact(symbolFacts.get(symbol), key);
    },
    setSymbolFact<T>(symbol: AstSymbol, key: ExtensionFactKey<T>, value: T): void {
      writeWeakFact(symbolFacts, symbol, key, value);
    },

    getTypeFact<T>(type: Type, key: ExtensionFactKey<T>): T | undefined {
      return readBucketFact(typeFacts.get(type), key);
    },
    setTypeFact<T>(type: Type, key: ExtensionFactKey<T>, value: T): void {
      writeWeakFact(typeFacts, type, key, value);
    },

    getSourceFileFact<T>(sourceFile: SourceFile, key: ExtensionFactKey<T>): T | undefined {
      return readBucketFact(sourceFileFacts.get(sourceFile), key);
    },
    setSourceFileFact<T>(sourceFile: SourceFile, key: ExtensionFactKey<T>, value: T): void {
      writeWeakFact(sourceFileFacts, sourceFile, key, value);
    },

    getProgramFact<T>(key: ExtensionFactKey<T>): T | undefined {
      return readBucketFact(programFacts, key);
    },
    setProgramFact<T>(key: ExtensionFactKey<T>, value: T): void {
      programFacts.set(key as ExtensionFactKey<unknown>, value);
    },

    appendDiagnostic(diagnostic: Diagnostic): void {
      diagnosticList.push(diagnostic);
    },
    diagnostics(): readonly Diagnostic[] {
      return diagnosticList;
    },
  };
}
