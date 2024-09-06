declare const {
  x: DateProtoToUTCString
}: {
  x: (<T>(
    thisArg: T,
    ...args: Parameters<Date['toUTCString']>
  ) => ReturnType<Date['toUTCString']>) & {
    getPolyfill(): Date['toUTCString']
    shim(): () => Date['toUTCString']
  }
}
export = DateProtoToUTCString
