/**
 * Creates recursive clone of value
 *
 * @param value - value to clone
 */
export default function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
