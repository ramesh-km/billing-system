import { arrayfy } from "./util";

export function stringifyIncludingBigInts(key: string, value: unknown) {
  return typeof value === "bigint" ? value.toString() : value;
}

export function parseIncludingBigInts(bigIntKeys: string | string[]) {
  return (key: string, value: string | number) =>
    arrayfy(bigIntKeys).includes(key) ? BigInt(value) : value;
}

