export const removeKeyFromObj = (obj: any, key: string) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};
