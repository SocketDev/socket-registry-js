declare const {
  x: DateProtoToISOString
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['toISOString']>
  ) => ReturnType<Date['toISOString']>) & {
    getPolyfill(): Date['toISOString']
    shim(): () => Date['toISOString']
  }
}
export = DateProtoToISOString
