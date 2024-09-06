declare const {
  x: DateProtoToDateString
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['toDateString']>
  ) => ReturnType<Date['toDateString']>) & {
    getPolyfill(): Date['toDateString']
    shim(): () => Date['toDateString']
  }
}
export = DateProtoToDateString
