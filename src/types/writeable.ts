/**
 * Removes readonly modifier from object
 */
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

// eslint-disable-next-line no-undef
export default DeepWriteable;
