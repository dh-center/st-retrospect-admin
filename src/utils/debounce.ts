/**
 * Debounce create a new function g,
 * which when called will delay the invocation of the original function f
 * until n milliseconds after it was last called.
 *
 * @param func - function to debounce
 * @param wait - delay in ms
 */
export function debounce<F extends(...params: unknown[]) => void>(func: F, wait = 300): F {
  let timeoutID: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/consistent-type-assertions
  return <any> function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    timeoutID = window.setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
