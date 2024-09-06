declare const {
  x: ArrayProtoMap
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['map']>
  ) => ReturnType<Array<T[number]>['map']>) & {
    getPolyfill(): Array<any>['map']
    shim(): () => Array<any>['map']
  }
}
export = ArrayProtoMap
