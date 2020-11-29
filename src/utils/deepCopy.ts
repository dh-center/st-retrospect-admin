import DeepWriteable from '../types/writeable';

/**
 * Creates recursive clone of value
 *
 * @param value - value to clone
 */
export default function deepCopy<T extends object>(value: T): DeepWriteable<T> {
  return JSON.parse(JSON.stringify(value));
}
