declare const {
  x: DateProtoGetFullYear
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['getFullYear']>
  ) => ReturnType<Date['getFullYear']>) & {
    getPolyfill(): Date['getFullYear']
    shim(): () => Date['getFullYear']
  }
}
export = DateProtoGetFullYear
