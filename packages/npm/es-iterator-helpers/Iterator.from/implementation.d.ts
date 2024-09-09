declare function from<T, R extends Iterator<T>>(object: R): R
declare function from<T>(object: IterableIterator<T>): Iterator<T>
export = from
