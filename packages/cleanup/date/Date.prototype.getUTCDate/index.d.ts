declare const {
  x: DateProtoGetUTCDate
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['getUTCDate']>
  ) => ReturnType<Date['getUTCDate']>) & {
    getPolyfill(): Date['getUTCDate']
    shim(): () => Date['getUTCDate']
  }
}
export = DateProtoGetUTCDate
