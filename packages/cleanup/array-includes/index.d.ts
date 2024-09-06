declare const {
  x: ArrayProtoIncludes
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['includes']>
  ) => ReturnType<Array<T[number]>['includes']>) & {
    getPolyfill(): Array<any>['includes']
    shim(): () => Array<any>['includes']
  }
}
export = ArrayProtoIncludes
