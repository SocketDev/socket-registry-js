declare const {
  x: ArrayProtoFind
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['find']>
  ) => ReturnType<Array<T[number]>['find']>) & {
    getPolyfill(): Array<any>['find']
    shim(): () => Array<any>['find']
  }
}
export = ArrayProtoFind
