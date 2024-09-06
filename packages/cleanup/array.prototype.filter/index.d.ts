declare const {
  x: ArrayProtoFilter
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['filter']>
  ) => ReturnType<Array<T[number]>['filter']>) & {
    getPolyfill(): Array<any>['filter']
    shim(): () => Array<any>['filter']
  }
}
export = ArrayProtoFilter
