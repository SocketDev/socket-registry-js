declare const {
  x: ArrayProtoForEach
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Array<T[number]>['forEach']>
  ) => ReturnType<Array<T[number]>['forEach']>) & {
    getPolyfill(): Array<any>['forEach']
    shim(): () => Array<any>['forEach']
  }
}
export = ArrayProtoForEach
