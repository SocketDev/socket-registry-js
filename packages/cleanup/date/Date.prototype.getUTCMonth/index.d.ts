declare const {
  x: DateProtoGetUTCMonth
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['getUTCMonth']>
  ) => ReturnType<Date['getUTCMonth']>) & {
    getPolyfill(): Date['getUTCMonth']
    shim(): () => Date['getUTCMonth']
  }
}
export = DateProtoGetUTCMonth
