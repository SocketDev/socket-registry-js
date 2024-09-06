declare const {
  x: ArrayProtoFindLastIndex
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['findLastIndex']>
  ) => ReturnType<Array<T[number]>['findLastIndex']>) & {
    getPolyfill(): Array<any>['findLastIndex']
    shim(): () => Array<any>['findLastIndex']
  }
}
export = ArrayProtoFindLastIndex
