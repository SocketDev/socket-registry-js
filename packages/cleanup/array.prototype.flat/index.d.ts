declare const {
  x: ArrayProtoFlat
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['flat']>
  ) => ReturnType<Array<T[number]>['flat']>) & {
    getPolyfill(): Array<any>['flat']
    shim(): () => Array<any>['flat']
  }
}
export = ArrayProtoFlat
