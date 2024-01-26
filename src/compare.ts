export function isEqual(value1: any, value2: any): boolean {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return isArrayEqual(value1, value2);
  } else if (value1 instanceof Date || value2 instanceof Date) {
    return isDateEqual(new Date(value1), new Date(value2));
  } else {
    return value1 === value2;
  }
}

function isDateEqual(d1: Date | string, d2: Date | string) {
  return new Date(d1).getTime() === new Date(d2).getTime();
}

function isArrayEqual<T>(arr1: T[], arr2: T[]) {
  return arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]);
}
