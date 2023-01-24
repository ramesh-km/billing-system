import { stringifyIncludingBigInts } from "./amounts";

export function pick(obj: Record<string, unknown>, keys: string[]) {
  const picked: Record<string, unknown> = {};
  for (const key of keys) {
    picked[key] = obj[key];
  }
  return picked;
}

export function arrayfy<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function toJSONWithBigInts<T>(value: T) {
  return JSON.parse(JSON.stringify(value, stringifyIncludingBigInts));
}
