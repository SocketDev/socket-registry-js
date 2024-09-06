declare const {
  x: DateProtoGetDate
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['getDate']>
  ) => ReturnType<Date['getDate']>) & {
    getPolyfill(): Date['getDate']
    shim(): () => Date['getDate']
  }
}
export = DateProtoGetDate
