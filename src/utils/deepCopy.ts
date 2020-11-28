/**
 * Creates recursive clone of value
 *
 * @param value - value to clone
 */
export default function deepCopy<T extends object>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
