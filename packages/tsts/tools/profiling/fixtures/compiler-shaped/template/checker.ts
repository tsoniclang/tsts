import { type BinaryExpression, type Expression, SyntaxKind } from "./ast.js";
import { type ObjectType, type Type, TypeFlags, TypeStore, type UnionType } from "./types.js";

export interface Diagnostic {
  readonly code: number;
  readonly start: number;
  readonly length: number;
  readonly message: string;
}

export interface CheckResult<T extends Type = Type> {
  readonly type: T;
  readonly diagnostics: readonly Diagnostic[];
}

export class Checker {
  readonly #store = new TypeStore();
  readonly #nodeTypes = new Map<number, Type>();
  readonly #stringType = this.#store.add({ id: 1, flags: TypeFlags.String, intrinsicName: "string" });
  readonly #numberType = this.#store.add({ id: 2, flags: TypeFlags.Number, intrinsicName: "number" });
  readonly #booleanType = this.#store.add({ id: 3, flags: TypeFlags.Boolean, intrinsicName: "boolean" });
  readonly #unknownType = this.#store.add({ id: 4, flags: TypeFlags.Unknown, intrinsicName: "unknown" });

  check(expression: Expression): CheckResult {
    const diagnostics: Diagnostic[] = [];
    const type = this.typeOf(expression, diagnostics);
    return { type, diagnostics };
  }

  private typeOf(expression: Expression, diagnostics: Diagnostic[]): Type {
    const cached = this.#nodeTypes.get(expression.pos);
    if (cached !== undefined) return cached;
    let type: Type;
    switch (expression.kind) {
      case SyntaxKind.Identifier:
        type = this.#unknownType;
        break;
      case SyntaxKind.NumericLiteral:
        type = this.#numberType;
        break;
      case SyntaxKind.StringLiteral:
        type = this.#stringType;
        break;
      case SyntaxKind.BinaryExpression:
        type = this.checkBinary(expression, diagnostics);
        break;
      case SyntaxKind.CallExpression:
        type = this.typeOf(expression.expression, diagnostics);
        break;
      case SyntaxKind.PropertyAccessExpression: {
        const target = this.typeOf(expression.expression, diagnostics);
        type = target.flags === TypeFlags.Object ? target.properties[expression.name.text] ?? this.#unknownType : this.#unknownType;
        break;
      }
    }
    this.#nodeTypes.set(expression.pos, type);
    return type;
  }

  private checkBinary(expression: BinaryExpression, diagnostics: Diagnostic[]): Type {
    const left = this.typeOf(expression.left, diagnostics);
    const right = this.typeOf(expression.right, diagnostics);
    if (expression.operator === "===") return this.#booleanType;
    if (expression.operator === "+" && (left.flags === TypeFlags.String || right.flags === TypeFlags.String)) return this.#stringType;
    if (left.flags === TypeFlags.Number && right.flags === TypeFlags.Number) return this.#numberType;
    diagnostics.push({ code: 2001, start: expression.pos, length: expression.end - expression.pos, message: "Operands are not compatible" });
    return this.#store.union(1000 + expression.pos, [left, right]);
  }

  narrow<T extends Type>(type: T, flags: TypeFlags): T | Type {
    if (type.flags !== TypeFlags.Union) return (type.flags & flags) !== 0 ? type : this.#unknownType;
    const members = type.types.filter((member) => (member.flags & flags) !== 0);
    return members.length === 1 ? members[0] : this.#store.union(2000 + type.id, members);
  }

  instantiate<T extends Type>(type: T, mapper: Readonly<Record<number, Type>>): Type {
    if (type.flags === TypeFlags.TypeParameter) return mapper[type.id] ?? type.defaultType ?? type;
    if (type.flags === TypeFlags.Union) return this.#store.union(3000 + type.id, type.types.map((member) => this.instantiate(member, mapper)));
    if (type.flags === TypeFlags.Object) return this.instantiateObject(type, mapper);
    return type;
  }

  private instantiateObject(type: ObjectType, mapper: Readonly<Record<number, Type>>): ObjectType {
    const properties: Record<string, Type> = {};
    for (const name in type.properties) properties[name] = this.instantiate(type.properties[name], mapper);
    return this.#store.add({ ...type, id: 4000 + type.id, properties });
  }
}

export type UnionMembers<T extends UnionType> = T["types"][number];
export type ObjectProperties<T extends ObjectType> = { readonly [K in keyof T["properties"]]: T["properties"][K] };
