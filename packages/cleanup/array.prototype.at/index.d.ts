declare const {
  x: ArrayProtoAt
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['at']>
  ) => ReturnType<Array<T[number]>['at']>) & {
    getPolyfill(): Array<any>['at']
    shim(): () => Array<any>['at']
  }
}
export = ArrayProtoAt
