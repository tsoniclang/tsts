export const enum TypeFlags {
  None = 0,
  Any = 1 << 0,
  Unknown = 1 << 1,
  Never = 1 << 2,
  String = 1 << 3,
  Number = 1 << 4,
  Boolean = 1 << 5,
  Union = 1 << 6,
  Object = 1 << 7,
  TypeParameter = 1 << 8,
}

export interface TypeBase<F extends TypeFlags = TypeFlags> {
  readonly id: number;
  readonly flags: F;
}

export interface IntrinsicType<F extends TypeFlags.Any | TypeFlags.Unknown | TypeFlags.Never | TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean> extends TypeBase<F> {
  readonly intrinsicName: string;
}

export interface UnionType extends TypeBase<TypeFlags.Union> {
  readonly types: readonly Type[];
}

export interface ObjectType extends TypeBase<TypeFlags.Object> {
  readonly properties: Readonly<Record<string, Type>>;
  readonly callSignatures: readonly Signature[];
}

export interface TypeParameter extends TypeBase<TypeFlags.TypeParameter> {
  readonly name: string;
  readonly constraint?: Type;
  readonly defaultType?: Type;
}

export interface Signature {
  readonly typeParameters: readonly TypeParameter[];
  readonly parameters: readonly SymbolInfo[];
  readonly returnType: Type;
}

export interface SymbolInfo {
  readonly id: number;
  readonly name: string;
  readonly flags: number;
  readonly type: Type;
}

export type Type = IntrinsicType<TypeFlags.Any>
  | IntrinsicType<TypeFlags.Unknown>
  | IntrinsicType<TypeFlags.Never>
  | IntrinsicType<TypeFlags.String>
  | IntrinsicType<TypeFlags.Number>
  | IntrinsicType<TypeFlags.Boolean>
  | UnionType
  | ObjectType
  | TypeParameter;

export type TypeWithFlag<F extends TypeFlags> = Extract<Type, { readonly flags: F }>;
export type PrimitiveName<T> = T extends IntrinsicType<TypeFlags.String> ? "string"
  : T extends IntrinsicType<TypeFlags.Number> ? "number"
    : T extends IntrinsicType<TypeFlags.Boolean> ? "boolean"
      : never;

export type Resolved<T> = T extends TypeParameter
  ? T["constraint"] extends Type ? Resolved<T["constraint"]> : T
  : T extends UnionType ? { readonly [K in keyof T["types"]]: T["types"][K] extends Type ? Resolved<T["types"][K]> : never }
    : T;

export class TypeStore {
  readonly #types = new Map<number, Type>();

  add<T extends Type>(type: T): T {
    this.#types.set(type.id, type);
    return type;
  }

  get<T extends Type = Type>(id: number): T | undefined {
    return this.#types.get(id) as T | undefined;
  }

  union(id: number, types: readonly Type[]): UnionType {
    const flattened = types.reduce<Type[]>((result, type) => {
      if (type.flags === TypeFlags.Union) result.push(...type.types);
      else if (type.flags !== TypeFlags.Never) result.push(type);
      return result;
    }, []);
    return this.add({ id, flags: TypeFlags.Union, types: flattened });
  }
}
