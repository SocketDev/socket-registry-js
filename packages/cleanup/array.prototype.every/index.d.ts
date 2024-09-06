declare const {
  x: ArrayProtoEvery
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['every']>
  ) => ReturnType<Array<T[number]>['every']>) & {
    getPolyfill(): Array<any>['every']
    shim(): () => Array<any>['every']
  }
}
export = ArrayProtoEvery
