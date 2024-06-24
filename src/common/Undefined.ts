/** Static utilities for helping with `null` and `undefined`. */
export const Undefined = {
  /** Narrows `x` to a value which is either `null` or `undefined`. */
  isNotNullish,
  /** Narrows `x` to a value which is neither `null` or `undefined`. */
  isNullish,
  /**
   * Given a value which may be `undefined`, applies `f` to it if it is not
   * nullish.
   */
  map<A, B>(a: A | undefined, f: (a: A) => B): B | undefined {
    if (a === undefined) return undefined;
    return f(a);
  },
} as const;

/** Narrows `x` to a value which is neither `null` or `undefined`. */
export function isNotNullish<T>(x: T): x is NonNullable<T> {
  return x !== null && x !== undefined;
}

/** Narrows `x` to a value which is neither `null` or `undefined`. */
export function isNullish<T>(x: T | null | undefined): x is null | undefined {
  return x === null || x === undefined;
}
