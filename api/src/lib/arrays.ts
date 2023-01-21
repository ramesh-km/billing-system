export function getDuplicates<T>(list: T[], key: keyof T): T[] {
  const duplicates = list.filter((item, index) => {
    return list.findIndex((i) => i[key] === item[key]) !== index;
  });

  return duplicates;
}
