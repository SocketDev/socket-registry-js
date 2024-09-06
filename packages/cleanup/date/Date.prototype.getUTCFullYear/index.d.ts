declare const {
  x: DateProtoGetUTCFullYear
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['getUTCFullYear']>
  ) => ReturnType<Date['getUTCFullYear']>) & {
    getPolyfill(): Date['getUTCFullYear']
    shim(): () => Date['getUTCFullYear']
  }
}
export = DateProtoGetUTCFullYear
