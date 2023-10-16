export declare function asyncMap<T, U>(array: T[], asyncCallback: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;
