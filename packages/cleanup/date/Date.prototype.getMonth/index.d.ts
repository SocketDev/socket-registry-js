declare const {
  x: DateProtoGetMonth
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['getMonth']>
  ) => ReturnType<Date['getMonth']>) & {
    getPolyfill(): Date['getMonth']
    shim(): () => Date['getMonth']
  }
}
export = DateProtoGetMonth
