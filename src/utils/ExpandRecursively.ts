export type ExpandRecursively<T> = T extends infer O
  ? O extends (infer P)[]
    ? ExpandRecursively<P>[]
    : O extends object
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : O
  : never;
