export type Assign<T1 = object, T2 = object> = Omit<T1, keyof T2> & T2;
