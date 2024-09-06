declare const {
  x: ArrayProtoToReversed
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['toReversed']>
  ) => ReturnType<Array<T[number]>['toReversed']>) & {
    getPolyfill(): Array<any>['toReversed']
    shim(): () => Array<any>['toReversed']
  }
}
export = ArrayProtoToReversed
