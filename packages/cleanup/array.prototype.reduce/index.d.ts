declare const {
  x: ArrayProtoReduce
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['reduce']>
  ) => ReturnType<Array<T[number]>['reduce']>) & {
    getPolyfill(): Array<any>['reduce']
    shim(): () => Array<any>['reduce']
  }
}
export = ArrayProtoReduce
