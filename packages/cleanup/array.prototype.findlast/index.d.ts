declare const {
  x: ArrayProtoFindLast
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['findLast']>
  ) => ReturnType<Array<T[number]>['findLast']>) & {
    getPolyfill(): Array<any>['findLast']
    shim(): () => Array<any>['findLast']
  }
}
export = ArrayProtoFindLast
