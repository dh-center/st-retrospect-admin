/**
 * Adds value to array of unique values and returns new array
 * If array contains this value, returns unchanged array
 *
 * @param array - an array for adding a value
 * @param value - a value for adding to array
 */
export default function addValueToArrayOfUniqueValues<T>(array: T[], value: T): T[] {
  if (!array.includes(value)) {
    return [...array, value];
  }

  return array;
}
