declare const {
  x: ArrayProtoToSorted
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['toSorted']>
  ) => ReturnType<Array<T[number]>['toSorted']>) & {
    getPolyfill(): Array<any>['toSorted']
    shim(): () => Array<any>['toSorted']
  }
}
export = ArrayProtoToSorted
