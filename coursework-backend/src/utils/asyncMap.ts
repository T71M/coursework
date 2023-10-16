export async function asyncMap<T, U>(
  array: T[],
  asyncCallback: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  const result: U[] = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const mappedValue = await asyncCallback(value, i, array);
    result.push(mappedValue);
  }

  return result;
}
