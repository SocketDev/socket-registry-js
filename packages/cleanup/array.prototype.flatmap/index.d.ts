declare const {
  x: ArrayProtoFlatMap
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['flatMap']>
  ) => ReturnType<Array<T[number]>['flatMap']>) & {
    getPolyfill(): Array<any>['flatMap']
    shim(): () => Array<any>['flatMap']
  }
}
export = ArrayProtoFlatMap
