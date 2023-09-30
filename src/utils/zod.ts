import { Primitive, z, ZodLiteral, ZodSchema } from "zod";

const createUnion = <
  T extends Readonly<[Primitive, Primitive, ...Primitive[]]>
>(
  values: T
) => {
  const zodLiterals = values.map((value) => z.literal(value)) as unknown as [
    ZodLiteral<Primitive>,
    ZodLiteral<Primitive>,
    ...ZodLiteral<Primitive>[]
  ];
  return z.union(zodLiterals);
};

export function createUnionSchema<T extends readonly Primitive[]>(values: T) {
  if (values.length === 0) {
    return z.never();
  }

  if (values.length === 1) {
    return z.literal(values[0]);
  }

  return createUnion(
    values as unknown as Readonly<[Primitive, Primitive, ...Primitive[]]>
  );
}

export const isTypeOf =
  <S extends ZodSchema>(
    schema: S
  ): ((value: unknown) => value is z.infer<typeof schema>) =>
  (value: unknown): value is z.infer<typeof schema> => {
    const parsedData = schema.safeParse(value);
    return parsedData.success;
  };
