export const pick = (obj: Record<string, unknown>, keys: string[]) => {
  const picked: Record<string, unknown> = {};
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
};
