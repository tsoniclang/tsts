import { readFile } from "node:fs/promises";

export interface AstSchema {
  readonly $schema?: string;
  readonly kinds: KindSchema;
  readonly bases: Record<string, BaseDefinition>;
  readonly nodes: NodeSchema;
}

export interface KindSchema {
  readonly elements: readonly KindElement[];
  readonly markers: readonly KindMarker[];
  readonly aliases?: Record<string, readonly string[] | { readonly range: readonly [string, string] }>;
}

export type KindElement = string | {
  readonly name?: string;
  readonly comment?: string;
};

export interface KindMarker {
  readonly name: string;
  readonly value: string;
}

export interface BaseDefinition {
  readonly brand?: string;
  readonly extends?: readonly string[];
  readonly fields?: Record<string, MemberDefinition>;
}

export interface NodeSchema {
  readonly definitions: Record<string, NodeDefinition>;
  readonly aliases: Record<string, NodeAlias>;
  readonly listAliases?: Record<string, string>;
}

export type NodeAlias = readonly string[] | { readonly base: string };

export interface NodeDefinition {
  readonly kind?: string | readonly string[];
  readonly extends: readonly string[];
  readonly members?: readonly MemberDefinition[];
  readonly generateSubtreeFacts?: boolean;
  readonly arena?: boolean;
  readonly handWritten?: boolean;
  readonly handWrittenVisitor?: boolean;
  readonly typeParameters?: readonly {
    readonly name: string;
    readonly constraint: string;
    readonly default?: string;
  }[];
  readonly instantiationAliases?: Record<string, string>;
}

export interface MemberDefinition {
  readonly name: string;
  readonly type?: string | readonly string[];
  readonly optional?: boolean;
  readonly list?: "NodeList" | "ModifierList" | "raw";
  readonly visit?: string;
  readonly typeGuard?: string;
  readonly private?: boolean;
  readonly inherited?: boolean;
  readonly goOnly?: boolean;
  readonly noGo?: boolean;
  readonly noTS?: boolean;
  readonly noFactory?: boolean;
  readonly bitmask?: string;
}

export interface NormalizedKind {
  readonly name: string;
  readonly value: number;
}

export interface NormalizedNode {
  readonly name: string;
  readonly kind: string;
  readonly kindValues: readonly string[];
  readonly extends: readonly string[];
  readonly members: readonly MemberDefinition[];
  readonly handWritten: boolean;
  readonly arena: boolean;
}

export async function readAstSchema(path = "schema/tsgo/ast.json"): Promise<AstSchema> {
  const text = await readFile(path, "utf8");
  return JSON.parse(text) as AstSchema;
}

export function getKindName(element: KindElement): string | undefined {
  return typeof element === "string" ? element : element.name;
}

export function normalizeKinds(schema: AstSchema): readonly NormalizedKind[] {
  const result: NormalizedKind[] = [];
  for (const element of schema.kinds.elements) {
    const name = getKindName(element);
    if (name !== undefined) {
      result.push({ name, value: result.length });
    }
  }
  return result;
}

export function normalizeNodes(schema: AstSchema): readonly NormalizedNode[] {
  return Object.entries(schema.nodes.definitions).map(([name, definition]) => {
    const kindValues = Array.isArray(definition.kind)
      ? definition.kind
      : [definition.kind ?? name];
    return {
      name,
      kind: kindValues[0] ?? name,
      kindValues,
      extends: definition.extends,
      members: definition.members ?? [],
      handWritten: definition.handWritten === true,
      arena: definition.arena === true,
    };
  });
}
