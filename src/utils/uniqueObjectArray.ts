export const uniqueObjectArray = <T extends object>(
  values: T[],
  uniqueBaseKey: keyof T
) =>
  Array.from(
    new Map(values.map((value) => [uniqueBaseKey, value] as const)).values()
  );
